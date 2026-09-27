// QA baseline runner for simplecare-physician-portal-v2.html.
// Usage: node product/tests/harness/run.mjs <outDir>   (serve the repo on :8765 first)
// Runs: JS parse check, deep links, design-rule scan, and the automated steps of each UC script
// in product/tests/. Writes <outDir>/results.json and screenshots under <outDir>/shots/.
// Clock: America/Vancouver, pinned to 26 Sep 2026 10:30 (inside the 10:00-2:00 window) so window-
// dependent screens repeat. Real clock behaviour is out of scope for this run.
import { launch } from './cdp.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = '/Users/aniharutyunyan/Desktop/SCDEMO';
const FILE = 'simplecare-physician-portal-v2.html';
const BASE = 'http://localhost:8765/' + FILE;
const OUT = process.argv[2]; mkdirSync(OUT + '/shots', { recursive: true });
const NOW = '2026-09-26T10:30:00';
const SCAN = readFileSync(new URL('./scan.js', import.meta.url), 'utf8');
const R = []; // results
// expect: 'built' = the use case or requirement says it works (a fail is a defect or regression);
//         'gap'   = documented as not built (a fail is expected; a pass means the gap closed).
const check = (suite, id, name, reqs, ok, evidence, expect = 'built') => {
  const status = ok ? 'pass' : 'fail';
  R.push({ suite, id, name, reqs, status, expect, evidence });
  console.log(`${status.toUpperCase().padEnd(4)} ${expect.padEnd(5)} ${suite} ${id} ${name}`);
};
const isFavicon = l => /favicon\.ico/.test(l.url || '') || /favicon\.ico/.test(l.text || '');
const pageErrors = log => log.filter(l => !isFavicon(l));

// ---------- 1. JS parse check ----------
{
  const src = readFileSync(`${ROOT}/${FILE}`, 'utf8');
  const blocks = [...src.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  const ext = [...src.matchAll(/<script[^>]*\bsrc=[^>]*>/g)].length;
  const stamp = (src.match(/class="build-stamp">([^<]*)</) || [])[1] || 'none';
  let fails = [];
  blocks.forEach((b, i) => { const f = `${OUT}/script-${i}.js`; writeFileSync(f, b); try { execFileSync('node', ['--check', f], { stdio: 'pipe' }); } catch (e) { fails.push(`block ${i}: ` + String(e.stderr).split('\n').slice(0, 4).join(' ')); } });
  check('parse', 'P-1', 'Every inline <script> block parses (node --check)', [], fails.length === 0, { blocks: blocks.length, bytes: blocks.map(b => b.length), externalScripts: ext, buildStamp: stamp, fails });
}

const b = await launch({ profile: OUT + '/profile', port: 9335, fakeNow: NOW });
const E = expr => b.eval(expr);
const click = sel => E(`(()=>{var e=document.querySelector(${JSON.stringify(sel)}); if(!e) return false; e.click(); return true})()`);
const text = sel => E(`(()=>{var e=document.querySelector(${JSON.stringify(sel)}); return e ? e.innerText.replace(/\\s+/g,' ').trim() : null})()`);
const visible = sel => E(`(()=>{var e=document.querySelector(${JSON.stringify(sel)}); return !!(e && e.getClientRects().length && e.checkVisibility())})()`);
const active = () => E(`[...document.querySelectorAll('.screen.active')].map(s=>s.id)`);
const toastText = () => E(`(()=>{var t=[...document.querySelectorAll('#toast,.toast')].map(x=>x.innerText.trim()).filter(Boolean); return t.join(' | ')})()`);

try {
  // ---------- 2. Deep links ----------
  const nQ = 8, nIx = 4;
  const links = [['#today', 'screen-today'], ['#inbox', 'screen-inbox']];
  for (let i = 0; i < nIx; i++) links.push([`#inbox:review:${i}`, 'screen-review']);
  for (let i = 0; i < nQ; i++) links.push([`#chart:${i}`, 'screen-patientchart']);
  const favicon = [];
  for (const [h, want] of links) {
    const log = await b.open(BASE + h, 1000);
    if (log.some(isFavicon)) favicon.push(h);
    const errs = pageErrors(log);
    const act = await active();
    let right = act.length === 1 && act[0] === want, detail = {};
    if (h.startsWith('#inbox:review:')) {
      const i = +h.split(':')[2];
      detail = await E(`({want: INBOX_ITEMS[${i}].panel, got: document.getElementById('rv-panel').textContent, rvI: RV_I, samePatient: document.getElementById('rv-title').textContent === INBOX_ITEMS[${i}].patient})`);
      right = right && detail.want === detail.got && detail.rvI === i && detail.samePatient;
    }
    if (h.startsWith('#chart:')) {
      const i = +h.split(':')[1];
      detail = await E(`({row:${i}, concern: QUEUE_DATA[${i}].concern, same: PC_CURRENT === QUEUE_DATA[${i}].name})`);
      right = right && detail.same;
    }
    const top = await E(`(()=>{var t=document.querySelector('.topbar'); return t ? t.innerText.replace(/\\s+/g,' ').trim() : ''})()`);
    detail.clockAndWindow = /\d{1,2}:\d{2}\s?(AM|PM)/.test(top) && /(left|closed|opens|open)/i.test(top);
    detail.topbar = top.replace(/Dr\. [A-Z][a-z]+/, 'Dr. <name>');
    const shot = await b.shot(`${OUT}/shots/deeplink-${h.slice(1).replace(/:/g, '-')}.png`);
    check('deeplink', h, `${h} opens ${want} with no console errors`, [], right && errs.length === 0, { active: act, errors: errs, ...detail, shot });
  }
  check('deeplink', 'favicon', 'No failed request for /favicon.ico (logged as a console error on every load)', [], favicon.length === 0, { linksAffected: favicon.length, note: 'the page has no <link rel="icon">; Chrome requests /favicon.ico and logs the 404 as an error' });
  // clock and window state on every screen (REQ-HQ-02), read from the deep-link runs
  {
    const dl = R.filter(r => r.suite === 'deeplink' && r.evidence && 'clockAndWindow' in r.evidence);
    const miss = dl.filter(r => !r.evidence.clockAndWindow).map(r => r.id);
    check('UC-01', '01-4', 'Clock and window state are in the top bar on every deep-linked screen', ['REQ-HQ-02'], miss.length === 0, { screens: dl.length, missing: miss, sample: dl[0] && dl[0].evidence.topbar });
  }
  // a hash change inside an open page (a link clicked in the same tab)
  {
    await b.open(BASE + '#today', 800);
    await E(`location.hash = '#inbox'`); await b.sleep(500);
    const a1 = await active();
    await E(`location.hash = '#chart:3'`); await b.sleep(500);
    const a2 = await active();
    check('deeplink', 'hashchange', 'Changing the hash in an open tab (#today → #inbox → #chart:3) follows the link', [], a1[0] === 'screen-inbox' && a2[0] === 'screen-patientchart', { afterInbox: a1, afterChart3: a2, note: 'the handler runs once, on DOMContentLoaded; there is no hashchange listener' });
  }
  // out-of-range links must not throw
  {
    const errs = [];
    for (const h of ['#chart:8', '#inbox:review:99', '#nosuchscreen']) { const log = pageErrors(await b.open(BASE + h, 700)); errs.push({ h, errors: log, active: await active() }); }
    check('deeplink', 'out-of-range', 'Out-of-range links (#chart:8, #inbox:review:99, #nosuchscreen) load without errors', [], errs.every(e => e.errors.length === 0 && e.active.length === 1), errs);
  }

  // ---------- 3. Design-rule scan ----------
  const scans = {};
  for (const [label, h] of [['Home', '#today'], ['Inbox', '#inbox'], ['Review (High, item 0)', '#inbox:review:0'], ['Review (Critical, item 2)', '#inbox:review:2'], ['Chart (row 5, renewal)', '#chart:5']]) {
    await b.open(BASE + h, 1000);
    const s = await E(SCAN);
    s.shot = await b.shot(`${OUT}/shots/scan-${h.slice(1).replace(/:/g, '-')}-full.png`, true);
    scans[label] = s;
  }
  const rules = [
    ['D-1', 'No text under 14px', 'small'], ['D-2', 'No button under 44px tall', 'buttons'], ['D-3', 'No uppercase styling', 'upper'],
    ['D-4', 'No coloured text except --crit-text on a critical value', 'colour'], ['D-5', 'No stroked tags', 'stroked'],
    ['D-6', 'Tags are 15px/500, 40px tall', 'tagspec'], ['D-7', 'No reading-text line longer than 66ch', 'measure']];
  for (const [id, name, key] of rules) {
    for (const [label, s] of Object.entries(scans)) {
      let items = s[key].filter(x => !x.demo);
      if (key === 'colour') items = items.filter(x => !(x.kind === 'crit-text' && x.looksLikeValue) && x.kind !== 'current-state');
      const demoItems = s[key].filter(x => x.demo);
      check('design', `${id} ${label}`, `${name} — ${label}`, ['REQ-UI-01', 'REQ-UI-02'].filter(() => key === 'colour'), items.length === 0,
        { count: items.length, items: items.slice(0, 40), allowed: key === 'colour' ? s.colour.filter(x => x.kind === 'current-state' || (x.kind === 'crit-text' && x.looksLikeValue)).map(x => x.kind + ': ' + x.el + ' "' + x.text + '"') : undefined, stretchedButtonsOk: key === 'buttons' ? (s.stretched || 0) : undefined, more: Math.max(0, items.length - 40), demoChrome: demoItems.slice(0, 5), demoChromeCount: demoItems.length, shot: s.shot, vars: key === 'colour' ? s.vars : undefined });
    }
  }

  // ---------- 4. Use-case checks ----------
  // UC-01 Start the day on Home
  {
    let log = await b.open(BASE, 1000);
    check('UC-01', '01-1', 'The portal opens on Home with no hash', ['REQ-HQ-11'], (await active())[0] === 'screen-today' && pageErrors(log).length === 0, { active: await active(), errors: pageErrors(log) });
    const order = await E(`(()=>{var a=document.getElementById('alerts-box'), q=document.getElementById('work-queue'); return {attn: !!(a&&a.checkVisibility()), attnTop: a&&Math.round(a.getBoundingClientRect().top), queueTop: q&&Math.round(q.getBoundingClientRect().top)}})()`);
    check('UC-01', '01-2', 'Needs your attention sits above the Live queue', ['REQ-HQ-11', 'REQ-HQ-12'], order.attn && order.attnTop < order.queueTop, order);
    const rows = await E(`[...document.querySelectorAll('#crit-list > .al-row')].map(r=>({patient: (r.querySelector('b,strong,.al-name')||r).innerText.split('\\n')[0].trim(), hasValue: /\\d/.test(r.innerText), buttons:[...r.querySelectorAll('button')].map(x=>x.innerText.trim())}))`);
    const pts = rows.map(r => r.patient);
    check('UC-01', '01-3', 'One attention row per patient, each naming the finding with its value', ['REQ-HQ-11'], rows.length > 0 && new Set(pts).size === pts.length && rows.every(r => r.hasValue), { rows: rows.length, unique: new Set(pts).size, buttons: rows.map(r => r.buttons) });
    const win = await E(`(()=>{var bs=[...document.querySelectorAll('#qwin button')]; return {windows: bs.filter(x=>/\\d:\\d\\d/.test(x.innerText)).map(x=>x.innerText.trim()), marked: bs.filter(x=>x.querySelector('.qwin-now') && /\\d:\\d\\d/.test(x.innerText)).map(x=>x.innerText.trim())}})()`);
    check('UC-01', '01-5', 'Four call windows show, and the running one (10:00–2:00 at 10:30) is marked', ['REQ-HQ-01'], win.windows.length === 4 && win.marked.length === 1 && /10:00/.test(win.marked[0]), win);
    const cnt = await E(`(()=>{var rows=[...document.querySelectorAll('#queue-body tr')].filter(r=>!r.classList.contains('q-sep') && r.checkVisibility()); return {header: document.getElementById('wt-queue-count').textContent.trim(), rowsShown: rows.length}})()`);
    check('UC-01', '01-6', 'The Live queue count matches the rows shown', ['REQ-HQ-15'], +cnt.header === cnt.rowsShown, cnt, 'gap');
    const pii = await E(`(()=>{var t=[...document.querySelectorAll('#queue-body tr, #crit-list')].map(r=>r.innerText).join(' '); return {phn: /\\b\\d{4} \\d{3} \\d{3}\\b/.test(t), dob: /\\b\\d{2}-\\d{2}-\\d{4}\\b|\\bDOB\\b/.test(t), phnWord: /\\bPHN\\b/.test(t)}})()`);
    check('UC-01', '01-7', 'No DOB or PHN on queue or attention rows', ['REQ-HQ-10', 'REQ-ID-02'], !pii.phn && !pii.dob && !pii.phnWord, pii);
    await b.shot(`${OUT}/shots/uc01-home.png`);
  }

  // UC-06 Renew a prescription by fax (row 5, "Rx renewal")
  {
    let log = await b.open(BASE + '#chart:5', 1000);
    const card = await E(`(()=>{var c=document.getElementById('rx-card'); var l=document.querySelector('#rx-lines'); return {shown: !!(c && c.checkVisibility()), lines: l ? l.innerText.replace(/\\s+/g,' ').trim() : '', seg: [...document.querySelectorAll('#rx-seg button')].map(x=>x.innerText.trim()+(x.classList.contains('on')?' [on]':'')), to: (document.getElementById('rx-to')||{}).innerText, pharmHeader: (()=>{var p=document.getElementById('vc-pharm-name'); return !!(p && p.checkVisibility() && p.closest('.vc-banner') && p.textContent.trim())})(), also: [...document.querySelectorAll('#rx-also button')].length}})()`);
    check('UC-06', '06-1', 'A renewal row opens the chart with the renewal card showing', ['REQ-RX-01'], card.shown, { shown: card.shown, errors: pageErrors(log) });
    check('UC-06', '06-2', 'The pharmacy is in the chart header', ['REQ-RX-01'], card.pharmHeader, { pharmacyInsideChartBanner: card.pharmHeader });
    check('UC-06', '06-3', 'The intake drug is preselected at the last plan\'s dose, and the card says so', ['REQ-RX-03'], /Metoprolol/.test(card.lines) && /50 mg/.test(card.lines + (await E(`[...document.querySelectorAll('#rx-lines input')].map(i=>i.value).join(' ')`))) && /Dose from the Jun 24 plan \(list says 25 mg\)/.test(card.lines), { lines: card.lines.slice(0, 160) });
    check('UC-06', '06-4', 'Supply defaults to 3 months, and the quantity is directions × days (twice daily × 90 = 180)', ['REQ-RX-02'], card.seg.some(s => /3 months · 180 tablets \[on\]/.test(s)), { seg: card.seg });
    check('UC-06', '06-5', 'Other active medications are offered with "Renew too"', ['REQ-RX-06'], card.also >= 2, { renewToo: card.also });
    const eq = await E(`(()=>{var a=document.getElementById('rx-send'), m=document.getElementById('rx-moa'); var f=e=>{var c=getComputedStyle(e); return {bg:c.backgroundColor, color:c.color, border:c.borderTopWidth+' '+c.borderTopColor, h:Math.round(e.getBoundingClientRect().height), weight:c.fontWeight, cls:e.className}}; return {send: a && f(a), moa: m && f(m), sendText: a && a.innerText.trim(), moaText: m && m.innerText.trim()}})()`);
    const same = eq.send && eq.moa && eq.send.bg === eq.moa.bg && eq.send.color === eq.moa.color && eq.send.border === eq.moa.border && eq.send.h === eq.moa.h;
    check('UC-06', '06-6', '"Send it myself" and "Ask <MOA> to send" carry equal weight at rest', ['REQ-RX-10'], !!same, eq);
    const fav = await E(`(()=>{var b=document.getElementById('rx-favbtn'); if(!b) return {btn:false}; b.click(); var l=document.getElementById('rx-favlist'); return {btn:true, listShown: !!(l && l.checkVisibility()), items: l ? [...l.querySelectorAll('button')].map(x=>x.innerText.trim()).slice(0,6) : []}})()`);
    check('UC-06', '06-7', 'Favourites open a list of pre-populated scripts on the renewal card', ['REQ-RX-11'], fav.btn && fav.listShown && fav.items.length > 0, fav);
    await b.open(BASE + '#chart:5', 1000);
    await click('#rx-send'); await b.sleep(300);
    const rv = await E(`(()=>{var r=document.getElementById('rx-review'); var c=document.getElementById('rx-confirm'); return {shown: !!(r && r.checkVisibility()), text: r ? r.innerText.replace(/\\s+/g,' ').trim() : '', confirm: c ? c.innerText.trim() : null}})()`);
    check('UC-06', '06-8', '"Check before it goes" lists drug, dose, directions, quantity, days and last dispensed', ['REQ-RX-04', 'REQ-RX-08'], rv.shown && /Check before it goes/.test(rv.text) && /Metoprolol tartrate 50 mg/.test(rv.text) && /twice daily/.test(rv.text) && /180 tablets/.test(rv.text) && /90 days/.test(rv.text) && /last dispensed/.test(rv.text), { text: rv.text.slice(0, 260) });
    check('UC-06', '06-9', 'The confirm press reads as a sign-off', ['REQ-UI-06'], /sign/i.test(rv.confirm || ''), { confirm: rv.confirm });
    await click('#rx-confirm'); await b.sleep(400);
    const st1 = await text('#rx-status');
    const note1 = await E(`document.getElementById('vc-note-input').value`);
    await b.sleep(5600);
    const st2 = await text('#rx-status');
    check('UC-06', '06-10', 'Fax status goes "Sending to …" then "Delivered to … · patient copy sent"', ['REQ-RX-05'], /Sending to/.test(st1 || '') && /Delivered to .* patient copy sent/.test(st2 || ''), { at400ms: st1, at6s: (st2 || '').slice(0, 200) });
    check('UC-06', '06-11', 'The note gets the renewal line, and the record says "Signed off by Dr. …" with a time', ['REQ-UI-06', 'REQ-RX-01'], /Rx renewal: .*Signed off by Dr\. \w+ \d{1,2}:\d{2}/.test(note1) && /Signed off by Dr\./.test(st2 || ''), { noteHasLine: /Rx renewal/.test(note1), statusStamp: /Signed off by/.test(st2 || '') });
    await b.shot(`${OUT}/shots/uc06-after-fax.png`);
    // MOA route
    await b.open(BASE + '#chart:5', 1000);
    await click('#rx-moa'); await b.sleep(300);
    const cm = await text('#rx-confirm');
    await click('#rx-confirm'); await b.sleep(400);
    const m1 = await text('#rx-status'); await b.sleep(7400); const m2 = await text('#rx-status');
    const task = await E(`(DOC_TASKS[0]||{}).title + ' → ' + (DOC_TASKS[0]||{}).to`);
    check('UC-06', '06-12', '"Ask <MOA> to send" files one task and shows "Picked up by <MOA>"', ['REQ-RX-07', 'REQ-TK-03', 'REQ-TK-04'], /Sent to .*waiting/.test(m1 || '') && /Picked up by/.test(m2 || '') && /Fax renewal/.test(task), { confirmLabel: cm, first: m1, after7s: (m2 || '').slice(0, 120), task: task.replace(/→ .*/, '→ <MOA>') });
  }

  // UC-07 Follow-up where the last plan sets the renewal (row 5: plan titrated the dose)
  {
    await b.open(BASE + '#chart:5', 1000);
    const slv = await E(`(()=>{var s=document.getElementById('slv'); var t=s? s.innerText:''; return {shown: !!(s && s.checkVisibility()), plan: /(Plan|Last note)/.test(t), ask: /Ask about/i.test(t), pending: /Pending/i.test(t), head: t.replace(/\\s+/g,' ').slice(0,120)}})()`);
    check('UC-07', '07-1', 'A follow-up opens on "Since last visit" with the last plan, Ask about and Pending', ['REQ-CH-01'], slv.shown && slv.plan && slv.ask && slv.pending, slv);
    const order = await E(`(()=>{var n=document.getElementById('vc-note-input'); var s=document.getElementById('slv'); var cp=[...document.querySelectorAll('h4')].find(h=>/Care plan/.test(h.innerText)); var y=e=>e?Math.round(e.getBoundingClientRect().top+scrollY):null; return {slvTop:y(s), slvBottom: s?Math.round(s.getBoundingClientRect().bottom+scrollY):null, noteTop:y(n), carePlanHeadTop:y(cp), slvHasCarePlan: !!(s && /care plan/i.test(s.innerText)), slvHasLastNote: !!(s && /Last note/.test(s.innerText)), viewport: innerHeight}})()`);
    check('UC-07', '07-2', 'The care plan and the last-note summary are above today\'s note and readable without scrolling', ['REQ-CH-31'], order.slvTop < order.noteTop && order.slvHasCarePlan && order.slvHasLastNote && order.slvBottom <= order.viewport, order);
    const rd = await E(`(()=>{var b=[...document.querySelectorAll('#slv button')].find(x=>/Read the/.test(x.innerText)); if(!b) return {btn:false}; b.click(); var n=document.getElementById('slv-note'); var ed=document.getElementById('vc-note-input'); return {btn:true, open: !!(n && n.checkVisibility()), readOnlyInPlace: !!(n && !n.querySelector('textarea:not([readonly])')), editorStillToday: ed.value.indexOf('Home readings mostly')===-1, editorVisible: ed.checkVisibility()}})()`);
    check('UC-07', '07-3', '"Read the <date> note" opens it read-only in place; today\'s editor never holds the old note', ['REQ-CH-02', 'REQ-CH-03'], rd.btn && rd.open && rd.readOnlyInPlace && rd.editorStillToday && rd.editorVisible, rd);
    const sc = await E(`(()=>{var s=document.getElementById('screen-patientchart'); var list=[...s.querySelectorAll('*')].filter(e=>{var c=getComputedStyle(e); return /(auto|scroll)/.test(c.overflowY) && e.scrollHeight > e.clientHeight + 4 && e.clientHeight > 60 && e.checkVisibility()}).map(e=>(e.id?'#'+e.id:e.tagName.toLowerCase()+'.'+[...e.classList].slice(0,1).join('.'))+' '+e.clientHeight+'/'+e.scrollHeight); return list})()`);
    check('UC-07', '07-4', 'The chart has one scroll region (no nested scrolling box with overflow)', ['REQ-CH-02'], sc.length === 0, { nestedScrollers: sc });
    const grow = await E(`(()=>{var n=document.getElementById('vc-note-input'); var h0=n.getBoundingClientRect().height; n.value=Array(40).fill('A line of history the patient gave on the call.').join('\\n'); n.dispatchEvent(new Event('input',{bubbles:true})); var h1=n.getBoundingClientRect().height; return {h0:Math.round(h0), h1:Math.round(h1), innerScroll: n.scrollHeight > n.clientHeight + 4}})()`);
    check('UC-07', '07-5', 'The note box grows with its text instead of scrolling', ['REQ-CH-02'], grow.h1 > grow.h0 && !grow.innerScroll, grow);
    const fin = await text('#vc-finalize');
    check('UC-07', '07-6', 'The finalize button names what it finalizes and reads as a sign-off', ['REQ-CH-03', 'REQ-CH-06', 'REQ-UI-06'], /sign off/i.test(fin || '') && /today/i.test(fin || ''), { label: fin, note: 'REQ-CH-03 names "Finalize today\'s visit"; REQ-UI-06 asks for sign-off wording' });
    const tick = await E(`!!document.querySelector('#screen-patientchart input[type=checkbox][data-ask], #slv input[type=checkbox], .slv-tick')`);
    check('UC-07', '07-7', 'The plan\'s "Ask about" items can be ticked into today\'s note', ['REQ-CH-08'], tick, { found: tick }, 'gap');
    await b.shot(`${OUT}/shots/uc07-chart5.png`, true);
  }

  // UC-08 History across several notes (row 3: several pending items, one waiting on a result)
  {
    await b.open(BASE + '#chart:3', 1000);
    const em = await E(`(()=>{var n=document.getElementById('vc-note-input'); var ph=n.placeholder||''; return {value:n.value, placeholder: ph.slice(0,80), earPain: /ear/i.test(ph+n.value), stamp: /documented at/i.test(document.getElementById('screen-patientchart').innerText)}})()`);
    check('UC-08', '08-1', 'An empty note looks empty: no invented example, no "documented at" stamp', ['REQ-CH-05'], !em.earPain && !em.stamp, em);
    await click('#vc-finalize'); await b.sleep(300);
    const w1 = await E(`(()=>{var w=document.getElementById('vc-finwarn'); var r=QUEUE_DATA[3]; return {warn: !!(w && !w.hidden && w.checkVisibility()), text: w ? w.innerText.replace(/\\s+/g,' ').trim() : '', signed: !!r.signed, problemList: !!document.querySelector('.cond-modal.open, #cond-modal.open, [id*=cond][class*=open]')}})()`);
    check('UC-08', '08-2', 'On a freshly opened chart (nothing typed), one press of Finalize asks first and does not sign', ['REQ-CH-07', 'REQ-CH-05'], w1.warn && !w1.signed, { ...w1, noteAtPress: em.value, note: 'the note is prefilled with the intake reason, so the empty-note guard never sees an empty note' });
    await b.open(BASE + '#chart:3', 1000);
    await E(`(()=>{var n=document.getElementById('vc-note-input'); n.value=''; n.dispatchEvent(new Event('input',{bubbles:true}))})()`);
    await click('#vc-finalize'); await b.sleep(300);
    const w1b = await E(`(()=>{var w=document.getElementById('vc-finwarn'); return {warn: !!(w && !w.hidden && w.checkVisibility()), text: w ? w.innerText.replace(/\\s+/g,' ').trim() : '', signed: !!QUEUE_DATA[3].signed}})()`);
    check('UC-08', '08-2b', 'With the note cleared to empty, Finalize asks first and does not sign', ['REQ-CH-07'], w1b.warn && /empty/i.test(w1b.text) && !w1b.signed, w1b);
    await b.open(BASE + '#chart:3', 1000);
    await E(`(()=>{var n=document.getElementById('vc-note-input'); n.value='S: tired. O: [document findings including reducibility]. A: iron deficiency. P: continue.'; n.dispatchEvent(new Event('input',{bubbles:true}))})()`);
    await click('#vc-finalize'); await b.sleep(300);
    const w2 = await E(`(()=>{var w=document.getElementById('vc-finwarn'); return {warn: !!(w && !w.hidden && w.checkVisibility()), text: w ? w.innerText.replace(/\\s+/g,' ').trim().slice(0,160) : '', signed: !!QUEUE_DATA[3].signed}})()`);
    check('UC-08', '08-3', 'Finalize with bracketed template text quotes the line and asks first', ['REQ-CH-07'], w2.warn && /\[document findings/.test(w2.text) && !w2.signed, w2);
    const force = await E(`(()=>{finalizeVisit(true); var r=QUEUE_DATA[3]; var n=document.getElementById('vc-note-input'); var s=document.getElementById('vc-signed'); return {status: r.status, readOnly: n.readOnly, stamp: s ? s.innerText.replace(/\\s+/g,' ').trim() : ''}})()`);
    check('UC-08', '08-4', 'After "Sign off anyway": the row is Completed, the note is read-only, stamped "Signed off by Dr. … · <time>"', ['REQ-CH-06', 'REQ-UI-06'], force.status === 'done' && force.readOnly && /Signed off by Dr\. \w+ · today \d{1,2}:\d{2}/.test(force.stamp), { status: force.status, readOnly: force.readOnly, stamp: force.stamp.replace(/Dr\. \w+/, 'Dr. <name>') });
    await b.open(BASE + '#chart:3', 1000);
    const pend = await E(`(()=>{var s=document.getElementById('slv'); var t=s?s.innerText:''; return {waiting: /waiting on/i.test(t), states: (t.match(/(not drawn|not booked|waiting on[^\\n]*|report not back)/gi)||[]).slice(0,5)}})()`);
    check('UC-08', '08-5', 'Outstanding requests carry a status, including "waiting on …"', ['REQ-CH-10'], pend.waiting, pend);
    const copy = await E(`/Copy to today/i.test(document.getElementById('screen-patientchart').innerText) || (()=>{var b=[...document.querySelectorAll('#slv button')].find(x=>/Read the/.test(x.innerText)); if(b) b.click(); return /Copy to today/i.test(document.getElementById('screen-patientchart').innerText)})()`);
    check('UC-08', '08-6', '"Copy to today\'s note" on each section of an older note', ['REQ-CH-04'], copy, { found: copy }, 'gap');
    const multi = await E(`Object.values(PT_LAST).every(v => !Array.isArray(v))`);
    check('UC-08', '08-7', '"Since last visit" can follow today\'s reason back past the latest note', ['REQ-CH-20'], !multi, { onePreviousVisitPerPatient: multi }, 'gap');
    await b.shot(`${OUT}/shots/uc08-chart3.png`, true);
  }

  // UC-26 New problem, read through lab results (rows 5 and 4: readings and results with sources)
  {
    await b.open(BASE + '#chart:5', 1000);
    const pr = await E(`(()=>{var p=document.getElementById('vc-pr'); var t=p? p.innerText.replace(/\\s+/g,' '):''; return {shown: !!(p && p.checkVisibility()), reportedBy: /Reported by patient/.test(t), bmi: /BMI/.test(t), weight: /Weight/.test(t), text: t.slice(0,160)}})()`);
    check('UC-26', '26-1', 'Weight and BP show patient-reported readings with dates, marked "Reported by patient"', ['REQ-CH-32', 'REQ-CH-21'], pr.shown && pr.reportedBy, pr);
    check('UC-26', '26-2', 'Weight shows with BMI', ['REQ-CH-21'], pr.bmi, { bmi: pr.bmi }, 'gap');
    await click('#vc-pr .pr-add'); await b.sleep(200);
    const saved = await E(`(()=>{var i=document.getElementById('pr-val'); if(!i) return {form:false}; i.value='128/82'; prSave(); var n=document.getElementById('vc-note-input').value; var p=document.getElementById('vc-pr').innerText; return {form:true, note: /Patient-reported BP 128\\/82/.test(n), shows: /128\\/82/.test(p)}})()`);
    check('UC-26', '26-3', 'A reading given on the call is saved once: it lands in the trend and in today\'s note', ['REQ-CH-32'], saved.form && saved.note && saved.shows, saved);
    await E(`vcPane('results')`); await b.sleep(300);
    const rs = await E(`(()=>{var p=document.getElementById('vcp-results'); var t=p?p.innerText.replace(/\\s+/g,' '):''; return {shown: !!(p&&p.checkVisibility()), rows: p?p.querySelectorAll('.rs-row').length:0, before: /Before:/.test(t), source: /(From \\w+ \\(direct\\)|Uploaded by patient)/.test(t), expected: /Expected/.test(t), text: t.slice(0,200)}})()`);
    check('UC-26', '26-4', 'Results read by test, with the latest value, earlier values and dates, and the source of each', ['REQ-CH-22', 'REQ-IN-13'], rs.shown && rs.rows > 0 && rs.before && rs.source, rs);
    const age = await E(`/(over a year|year old|months old|\\d+ months ago)/i.test(document.getElementById('vcp-results').innerText)`);
    check('UC-26', '26-5', 'The age of the latest relevant results is stated when over a year old', ['REQ-CH-25'], age, { found: age }, 'gap');
    await b.open(BASE + '#chart:4', 1000);
    const first = await E(`(()=>{var s=document.getElementById('slv'); return {slvShown: !!(s && s.checkVisibility()), text: s? s.innerText.replace(/\\s+/g,' ').slice(0,100):''}})()`);
    check('UC-26', '26-6', 'When no earlier note touches today\'s reason, "Since last visit" says so ("First visit for …")', ['REQ-CH-20'], /first visit for/i.test(first.text), first, 'gap');
    // stale search (REQ-HQ-17)
    await b.open(BASE + '#today', 800);
    await E(`(()=>{var i=document.getElementById('queue-search'); i.value='Greg'; i.dispatchEvent(new Event('input',{bubbles:true}))})()`); await b.sleep(200);
    await E(`openChart(QUEUE_DATA[5].name)`); await b.sleep(300);
    await click('#screen-patientchart .pc-back'); await b.sleep(400);
    const stale = await E(`(()=>{var i=document.getElementById('queue-search'); var rows=[...document.querySelectorAll('#queue-body tr')].filter(r=>!r.classList.contains('q-sep') && r.checkVisibility()).length; return {screen: document.querySelector('.screen.active').id, search: i.value, rowsShown: rows}})()`);
    check('UC-26', '26-7', 'Back on Home after a chart, the queue search is cleared (or shows as a filter chip)', ['REQ-HQ-17'], stale.search === '' && stale.rowsShown === 8, stale, 'gap');
  }

  // UC-27 New patient after a hospital stay (row 7: no previous visit on file)
  {
    await b.open(BASE + '#chart:7', 1000);
    const nf = await E(`(()=>{var s=document.getElementById('slv'); return {slvHidden: !(s && s.checkVisibility()), firstVisit: /first visit/i.test(document.getElementById('screen-patientchart').innerText)}})()`);
    check('UC-27', '27-1', 'With no previous visit on file, "Since last visit" is hidden', ['REQ-CH-01'], nf.slvHidden, nf);
    check('UC-27', '27-1b', 'The chart marks a new patient (first visit) versus a returning one', ['REQ-CH-16', 'REQ-ID-05'], nf.firstVisit, nf, 'gap');
    await click('#vc-medrail .mx-add'); await b.sleep(200);
    const mx = await E(`(()=>{var g=id=>document.getElementById(id); if(!g('mx-drug')) return {form:false}; g('mx-drug').value='aspirin'; g('mx-dose').value='81 mg'; g('mx-when').value='Aug 2026'; mxSave(); var rail=g('vc-medrail').innerText.replace(/\\s+/g,' '); var note=g('vc-note-input').value; return {form:true, onList: /Aspirin 81 mg/.test(rail), source: /hospital/i.test(rail), note: /Medication started elsewhere: Aspirin 81 mg/.test(note)}})()`);
    check('UC-27', '27-2', 'A medication started elsewhere is added during the call, with where and when, and noted', ['REQ-CH-27'], mx.form && mx.onList && mx.source && mx.note, mx);
    await E(`vcPane('results')`); await b.sleep(200);
    await click('#vcp-results .rs-addexp'); await b.sleep(200);
    const ex = await E(`(()=>{var g=id=>document.getElementById(id); if(!g('rs-what')) return {form:false}; g('rs-what').value='Lipid panel'; g('rs-when').value='Oct 3'; g('rs-by').value='the hospital'; rsSaveExp(); var p=g('vcp-results').innerText; var s=g('slv'); var tasksBefore = DOC_TASKS.length; return {form:true, expected: /Lipid panel/.test(p) && /waiting for the result/.test(p), inSinceLast: !!(s && s.checkVisibility() && /Lipid panel/.test(s.innerText)), note: /Expected result: Lipid panel/.test(g('vc-note-input').value)}})()`);
    check('UC-27', '27-3', 'An expected outside result is tracked ("waiting for the result") and noted, with no task made', ['REQ-CH-29'], ex.form && ex.expected && ex.note, ex);
    check('UC-27', '27-4', 'At a first visit, the expected result also shows under Pending in "Since last visit"', ['REQ-CH-29'], ex.inSinceLast, { inSinceLast: ex.inSinceLast, note: 'renderSinceLast hides the block when there is no previous visit' }, 'gap');
    const norx = await E(`/No renewal today/i.test(document.getElementById('screen-patientchart').innerHTML)`);
    check('UC-27', '27-5', '"No renewal today" with a reason and a supply-until date', ['REQ-RX-09'], norx, { found: norx }, 'gap');
    await E(`(()=>{var c=[...document.querySelectorAll('#vc-chips button')].find(x=>/Renew prescription/.test(x.innerText)); if(c) c.click()})()`); await b.sleep(300);
    const rxNew = await E(`(()=>{var c=document.getElementById('rx-card'); var t=c? c.innerText.replace(/\\s+/g,' '):''; return {shown: !!(c && c.checkVisibility()), hasAspirin: /Aspirin/.test(t), text: t.slice(0,140)}})()`);
    check('UC-27', '27-6', 'For a new patient, the renewal card offers the medication just added from elsewhere', ['REQ-RX-01', 'REQ-CH-27'], rxNew.shown && rxNew.hasAspirin, rxNew);
    const cont = await E(`/continuing with/i.test(document.getElementById('screen-patientchart').innerText)`);
    check('UC-27', '27-7', 'A new patient taking up ongoing care can be marked as continuing with the doctor', ['REQ-ID-06'], cont, { found: cont }, 'gap');
    await b.shot(`${OUT}/shots/uc27-chart7.png`, true);
  }

  // UC-13 Clear routine results and sign off (Inbox)
  {
    await b.open(BASE + '#inbox', 1000);
    const tabs = await E(`[...document.querySelectorAll('#ixt-recv,#ixt-rev,#ixt-done')].map(t=>t.innerText.replace(/\\s+/g,' ').trim())`);
    check('UC-13', '13-1', 'Tabs: Needs review / Awaiting sign-off / Signed off', ['REQ-IN-01'], tabs.length === 3 && /Needs review/.test(tabs[0]) && /Awaiting sign-off/.test(tabs[1]) && /Signed off/.test(tabs[2]), { tabs });
    const bands = await E(`(()=>{var out=[]; document.querySelectorAll('#inbox-received .ix-secttl').forEach(h=>out.push(h.innerText.replace(/\\s+\\d+$/,'').trim())); return out})()`);
    check('UC-13', '13-2', 'Bands in order Critical, High, Routine', ['REQ-IN-03'], JSON.stringify(bands) === JSON.stringify(['Critical', 'High', 'Routine']), { bands });
    const fifo = await E(`(()=>{var rows=[...document.querySelectorAll('#inbox-received .ix-open')].map(b=>{var i=+(b.getAttribute('onclick').match(/\\d+/)||[])[0]; return {i, t: INBOX_ITEMS[i].received, tier: labTier(INBOX_ITEMS[i])||'routine'}}); var mins=s=>{var m=String(s).match(/(\\d+):(\\d+)\\s*(AM|PM)/); if(!m) return null; var h=+m[1]%12+(m[3]==='PM'?12:0); var d=/Yesterday/.test(s)?-1440:(/Today/.test(s)?0:-2880); return d+h*60+ +m[2]}; var bad=[]; for(var k=1;k<rows.length;k++){ if(rows[k].tier===rows[k-1].tier){ var a=mins(rows[k-1].t), b=mins(rows[k].t); if(a!==null && b!==null && b<a) bad.push(rows[k-1].t+' before '+rows[k].t+' ('+rows[k].tier+')'); } } return {rows: rows.length, outOfOrder: bad, sample: rows.slice(0,6).map(r=>r.tier+' '+r.t)}})()`);
    check('UC-13', '13-3', 'Oldest first (FIFO by received time) inside each band', ['REQ-IN-03', 'REQ-IN-04'], fifo.outOfOrder.length === 0, fifo);
    const rowTxt = await E(`[...document.querySelectorAll('#inbox-received .ix-row, #inbox-received li, #inbox-received article')].map(r=>r.innerText).join('\\n') || document.getElementById('inbox-received').innerText`);
    check('UC-13', '13-4', 'Rows show the clinic received time and no relative age ("2h", "hours ago")', ['REQ-IN-04', 'REQ-IN-05'], /Today, \d{1,2}:\d{2} (AM|PM)/.test(rowTxt) && !/\b\d+\s?(h|hr|hrs|hours?|min|m) ago\b|\b\d+h\b/.test(rowTxt), { receivedTime: /Today, \d{1,2}:\d{2}/.test(rowTxt), relative: (rowTxt.match(/\b\d+\s?(h|hr|hrs|hours?) ago\b|\b\d+h\b/g) || []).slice(0, 3) });
    check('UC-13', '13-5', 'Rows show the patient\'s name only (no age, sex, PHN or DOB)', ['REQ-IN-06', 'REQ-ID-02'], !/\b\d{4} \d{3} \d{3}\b/.test(rowTxt) && !/\b\d{2}-\d{2}-\d{4}\b/.test(rowTxt) && !/\b\d{1,3}[MF]\b/.test(rowTxt), { phn: /\b\d{4} \d{3} \d{3}\b/.test(rowTxt), dob: /\b\d{2}-\d{2}-\d{4}\b/.test(rowTxt), ageSex: (rowTxt.match(/\b\d{1,3}[MF]\b/g) || []).slice(0, 3) });
    // open the first Routine row from the inbox, No follow-up, see where it lands
    const flow = await E(`(()=>{var rows=[...document.querySelectorAll('#inbox-received .ix-open')].map(b=>+(b.getAttribute('onclick').match(/\\d+/)||[])[0]); var routine=rows.filter(i=>!labTier(INBOX_ITEMS[i])); return {displayOrder: rows, first: routine[0], expectedNext: routine[1]}})()`);
    await E(`document.querySelector('#inbox-received .ix-open[onclick="openReview(${flow.first})"]').click()`); await b.sleep(300);
    const onRv = (await active())[0];
    await click('#rv-no'); await b.sleep(500);
    const after = await E(`({screen: document.querySelector('.screen.active').id, rvI: RV_I, status: INBOX_ITEMS[${flow.first}].status, tierOfNext: labTier(INBOX_ITEMS[RV_I]) || 'routine'})`);
    check('UC-13', '13-6', 'A routine "No follow-up" opened from the Inbox records it and lands on the next result', ['REQ-IN-11'], onRv === 'screen-review' && after.status === 'reviewed' && after.screen === 'screen-review' && after.rvI !== flow.first, { opened: flow.first, landedOn: after.rvI, status: after.status });
    check('UC-13', '13-7', '"The next result" is the next row in the Inbox\'s own order (band, then oldest first)', ['REQ-IN-03', 'REQ-IN-11'], after.rvI === flow.expectedNext, { displayOrder: flow.displayOrder, expectedNext: flow.expectedNext, landedOn: after.rvI, tierOfLanded: after.tierOfNext, note: 'rvDone picks the first "received" item in array order' });
    await E(`showScreen('inbox'); ixTab('rev')`); await b.sleep(300);
    const aw = await E(`(()=>{var p=document.getElementById('ixp-rev')||document.querySelector('.ix-tabpanel:not([hidden])'); var btns=[...document.querySelectorAll('.ix-sign')].filter(x=>x.checkVisibility()); return {count: document.getElementById('inbox-rev-count').textContent.trim(), signButtons: btns.length, has: btns.some(x=>x.getAttribute('onclick')==='signOffInbox(${flow.first})')}})()`);
    check('UC-13', '13-8', 'The reviewed result waits in Awaiting sign-off with a Sign off button; reviewed is not signed off', ['REQ-IN-01', 'REQ-UI-06'], aw.has, aw);
    await E(`document.querySelector('.ix-sign[onclick="signOffInbox(${flow.first})"]').click()`); await b.sleep(300);
    const so = await E(`(()=>{ixTab('done'); var it=INBOX_ITEMS[${flow.first}]; var p=document.getElementById('ixp-done'); var t=p? p.innerText : document.getElementById('screen-inbox').innerText; return {status: it.status, stamp: /Signed off by Dr\\. \\w+ · \\d{1,2}:\\d{2}/.test(t), doneCount: document.getElementById('signedoff-count').textContent.trim()}})()`);
    const tt = await toastText();
    check('UC-13', '13-9', 'Sign off moves it to Signed off, and the row reads "Signed off by Dr. … · <time>"', ['REQ-IN-01', 'REQ-UI-06'], so.status === 'signed-off' && so.stamp, { ...so, toast: tt.replace(/Dr\. \w+ — .*/, 'Dr. <name> — <patient>') });
    await b.shot(`${OUT}/shots/uc13-signed-off.png`);
  }

  // UC-12 Review a critical result (item 2: critical, patient in today's queue)
  {
    await b.open(BASE + '#inbox:review:2', 1000);
    const d = await E(`(()=>{var g=id=>document.getElementById(id); var v=id=>!!(g(id)&&g(id).checkVisibility()); return {tier: (g('rv-facts').innerText.match(/Critical[^\\n]*/)||[''])[0].slice(0,60), draft: v('rv-draft'), action: g('rv-d-action').value.length, plan: g('rv-d-plan').value.length, contact: g('rv-d-contact').value.length, accept: v('rv-accept'), callNow: v('rv-callnow'), others: /other results? waiting|also waiting|Also in the inbox/i.test(g('screen-review').innerText)}})()`);
    check('UC-12', '12-1', 'A Critical result opens on a drafted follow-up: action, plan and contact, all editable', ['REQ-RV-01'], d.draft && d.action > 0 && d.plan > 0 && d.contact > 0, d);
    check('UC-12', '12-2', 'The patient is in today\'s queue, so "Call now" shows beside Accept & assign', ['REQ-RV-07'], d.accept && d.callNow, { accept: d.accept, callNow: d.callNow });
    check('UC-12', '12-3', 'The review shows the patient\'s other waiting results', ['REQ-RV-06'], d.others, { found: d.others });
    await click('#rv-no'); await b.sleep(300);
    const two = await E(`({screen: document.querySelector('.screen.active').id, status: INBOX_ITEMS[2].status})`);
    check('UC-12', '12-4', 'Closing a Critical result without follow-up takes a second, deliberate step', ['REQ-RV-02'], two.screen === 'screen-review' && two.status === 'received', two);
    await b.open(BASE + '#inbox:review:2', 1000);
    const n0 = await E(`DOC_TASKS.length`);
    await click('#rv-accept'); await b.sleep(400);
    const acc = await E(`({tasks: DOC_TASKS.length, src: (DOC_TASKS[0].source||{}).kind, prio: DOC_TASKS[0].prio, status: INBOX_ITEMS[2].status, screen: document.querySelector('.screen.active').id, attnRows: document.querySelectorAll('#crit-list > .al-row').length})`);
    check('UC-12', '12-5', 'Accept & assign files one MOA task linked to the source, and marks the result reviewed', ['REQ-RV-01', 'REQ-TK-10', 'REQ-TK-01'], acc.tasks === n0 + 1 && acc.src === 'inbox' && acc.status === 'reviewed', { ...acc, tasksBefore: n0 });
    await b.open(BASE + '#chart:0', 1000);
    const al = await E(`(()=>{var s=document.getElementById('screen-patientchart'); var b=[...s.querySelectorAll('button')].find(x=>/Review result/.test(x.innerText)&&x.checkVisibility()); return {reviewBtn: !!b, text: b ? b.closest('div').innerText.replace(/\\s+/g,' ').slice(0,100) : ''}})()`);
    check('UC-12', '12-6', 'The critical result sits at the top of that patient\'s chart with "Review result"', ['REQ-CH-13'], al.reviewBtn, { reviewBtn: al.reviewBtn });
  }
} finally {
  await b.close();
}
writeFileSync(`${OUT}/results.json`, JSON.stringify(R, null, 1));
const tally = (f) => R.filter(f).length;
console.log(`\nTOTAL ${R.length} · pass ${tally(r => r.status === 'pass')} · fail ${tally(r => r.status === 'fail')} (of which known gaps ${tally(r => r.status === 'fail' && r.expect === 'gap')}) · gaps closed ${tally(r => r.status === 'pass' && r.expect === 'gap')}`);
