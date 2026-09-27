// Minimal Chrome DevTools Protocol driver for the QA baseline. No dependencies (Node >= 22).
// Launches headless Chrome, opens one page, records console errors, exceptions and failed requests.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

export const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function launch({ port = 9333, profile, width = 1440, height = 900, tz = 'America/Vancouver', fakeNow = null }) {
  mkdirSync(profile, { recursive: true });
  const proc = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    `--window-size=${width},${height}`, '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
    '--force-device-scale-factor=1', 'about:blank'], { stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 50; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (targets.find(t => t.type === 'page')) break; } catch {}
    await sleep(200);
  }
  const page = targets.find(t => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pending = new Map(); const listeners = [];
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }
    else if (m.method) listeners.forEach(l => l(m));
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const log = [];
  listeners.push(m => {
    if (m.method === 'Runtime.exceptionThrown') { const d = m.params.exceptionDetails; log.push({ kind: 'exception', text: (d.exception && d.exception.description) || d.text, line: d.lineNumber, col: d.columnNumber }); }
    if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning', 'assert'].includes(m.params.type)) log.push({ kind: 'console.' + m.params.type, text: m.params.args.map(a => a.value ?? a.description ?? '').join(' ') });
    if (m.method === 'Log.entryAdded' && ['error', 'warning'].includes(m.params.entry.level)) log.push({ kind: 'log.' + m.params.entry.level, text: m.params.entry.text, url: m.params.entry.url });
  });
  await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  // A BC doctor's clock. fakeNow pins the wall clock (ISO string, local to tz) so window-dependent screens are repeatable;
  // time still advances from that point, so the demo's timers run.
  await send('Emulation.setTimezoneOverride', { timezoneId: tz });
  if (fakeNow) await send('Page.addScriptToEvaluateOnNewDocument', { source: `(()=>{const R=Date,off=new R(${JSON.stringify(fakeNow)}).getTime()-R.now();
    function D(...a){ if(!new.target) return new D().toString(); return a.length ? new R(...a) : new R(R.now()+off); }
    D.now=()=>R.now()+off; D.parse=R.parse; D.UTC=R.UTC; D.prototype=R.prototype; window.Date=D;})();` });
  const waitEvent = (method, timeout = 10000) => new Promise(res => { const t = setTimeout(() => res(null), timeout); const l = m => { if (m.method === method) { clearTimeout(t); listeners.splice(listeners.indexOf(l), 1); res(m); } }; listeners.push(l); });
  const api = {
    send, log,
    async open(url, settle = 900) {
      await send('Page.navigate', { url: 'about:blank' }); await sleep(150);
      log.length = 0;
      const loaded = waitEvent('Page.loadEventFired');
      await send('Page.navigate', { url }); await loaded; await sleep(settle);
      return log.slice();
    },
    async eval(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error('eval: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
      return r.result.value;
    },
    async shot(path, full = false) {
      let clip;
      if (full) { const m = await send('Page.getLayoutMetrics'); clip = { x: 0, y: 0, width: m.cssContentSize.width, height: Math.min(m.cssContentSize.height, 6000), scale: 1 }; }
      const r = await send('Page.captureScreenshot', { format: 'png', ...(clip ? { clip, captureBeyondViewport: true } : {}) });
      writeFileSync(path, Buffer.from(r.data, 'base64')); return path;
    },
    sleep,
    async close() { try { await send('Browser.close'); } catch {} try { ws.close(); } catch {} await sleep(300); try { proc.kill('SIGKILL'); } catch {} }
  };
  return api;
}
