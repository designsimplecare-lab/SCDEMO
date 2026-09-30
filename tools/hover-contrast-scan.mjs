// Hover contrast scan (WCAG AA 4.5:1) for simplecare-physician-portal-v2.html.
// Usage:
//   1. python3 -m http.server 8765   (from the repo root)
//   2. Chrome --headless=new --remote-debugging-port=9340 --user-data-dir=<tmp> about:blank
//   3. [DARK=1] node tools/hover-contrast-scan.mjs "#today" "#inbox" "#chart:0"
// It forces :hover on every visible button and prints the ones below 4.5:1.
// Force :hover on every visible button/link and measure text-vs-background contrast (WCAG).
const port=9340, base='http://localhost:8765/simplecare-physician-portal-v2.html';
const routes=process.argv.slice(2);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function ws(url){const w=new WebSocket(url);await new Promise(r=>w.onopen=r);let id=0;const pend={};w.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend[m.id]){pend[m.id](m);delete pend[m.id];}};return {send:(method,params={})=>new Promise(r=>{const i=++id;pend[i]=r;w.send(JSON.stringify({id:i,method,params}));}),close:()=>w.close()};}
const t=await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`,{method:'PUT'})).json();
const c=await ws(t.webSocketDebuggerUrl);
await c.send('DOM.enable');await c.send('CSS.enable');await c.send('Runtime.enable');await c.send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
const fn=`(function(){function rgb(s){const m=s.match(/[\\d.]+/g);return m?m.map(Number):null}
function lum(c){const a=c.slice(0,3).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*a[0]+.7152*a[1]+.0722*a[2]}
function bg(el){while(el){const b=rgb(getComputedStyle(el).backgroundColor);if(b&&(b.length<4||b[3]>0.5))return b;el=el.parentElement}return [255,255,255]}
const e=window.__el;const cs=getComputedStyle(e);const fg=rgb(cs.color),b=bg(e);const L1=lum(fg),L2=lum(b);const cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
return JSON.stringify({t:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,30),cr:Math.round(cr*100)/100,fg:cs.color,bg:'rgb('+b.slice(0,3).join(',')+')'})})()`;
const out=[];let n=0;const samp=[];const dark=process.env.DARK==="1";
for(const r of routes){
  await c.send('Page.navigate',{url:base+'?h='+Date.now()+r});await sleep(2500); if(dark){await c.send("Runtime.evaluate",{expression:"document.documentElement.setAttribute(\"data-theme\",\"dark\")"}); await sleep(300);}
  const doc=await c.send('DOM.getDocument',{depth:-1});
  const q=await c.send('DOM.querySelectorAll',{nodeId:doc.result.root.nodeId,selector:'.screen.active button, .screen.active a.btn, .topbar button'});
  for(const nodeId of q.result.nodeIds.slice(0,400)){
    const vis=await c.send('DOM.resolveNode',{nodeId});const oid=vis.result.object.objectId;
    const v=await c.send('Runtime.callFunctionOn',{objectId:oid,functionDeclaration:'function(){const r=this.getBoundingClientRect();const s=getComputedStyle(this);return r.width>0&&r.height>0&&s.visibility!=="hidden"&&(this.innerText||"").trim().length>0}',returnByValue:true});
    if(!v.result.result.value) continue;
    await c.send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:['hover']});
    await c.send('Runtime.callFunctionOn',{objectId:oid,functionDeclaration:'function(){window.__el=this}'});
    const m=await c.send('Runtime.evaluate',{expression:fn,returnByValue:true});
    await c.send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:[]});
    const o=JSON.parse(m.result.result.value); o.route=r; n++; if(o.cr<4.5) out.push(o);
  }
}
console.log(JSON.stringify({scanned:n,failures:out,samples:samp.slice(0,4)})); c.close(); process.exit(0);
