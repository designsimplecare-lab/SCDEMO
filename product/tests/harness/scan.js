/* Design-rule scan, run inside the page (QA engineer role, .claude/agents/qa-engineer.md; rules from
   .claude/agents/ux-designer.md "Design rules"). Scans visible elements of the whole viewport-rendered
   document: the active screen plus the shell (sidebar, top bar). Demo-only chrome (demo dock, design
   switcher, build stamp, toasts) is reported separately, never hidden.
   Returns a plain object; nothing on the page is changed except a temporary probe span. */
(function () {
  var out = { small: [], buttons: [], upper: [], colour: [], stroked: [], tagspec: [], measure: [], vars: {} };
  var vis = function (e) {
    if (!e.getClientRects().length) return false;
    if (e.checkVisibility && !e.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    var r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0;
  };
  var demo = function (e) { return !!e.closest('#demo-dock,#dsw,#dsw-fab,.build-stamp,#toast,.toast,.toast-wrap'); };
  var inSvg = function (e) { return !!e.closest('svg'); };
  var sel = function (e) {
    var s = e.tagName.toLowerCase();
    if (e.id) return s + '#' + e.id;
    var c = [].slice.call(e.classList, 0, 2).join('.'); if (c) s += '.' + c;
    var p = e.parentElement, hop = 0;
    while (p && !p.id && hop < 6) { p = p.parentElement; hop++; }
    return (p && p.id ? '#' + p.id + ' ' : '') + s;
  };
  var own = function (e) {
    var t = ''; for (var i = 0; i < e.childNodes.length; i++) if (e.childNodes[i].nodeType === 3) t += e.childNodes[i].textContent;
    return t.replace(/\s+/g, ' ').trim();
  };
  var rgba = function (c) { var m = String(c).match(/rgba?\(([^)]+)\)/); if (!m) return null; var p = m[1].split(/[ ,/]+/).filter(Boolean).map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  var chroma = function (c) { return Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b); };
  var same = function (a, b) { return a && b && Math.abs(a.r - b.r) < 6 && Math.abs(a.g - b.g) < 6 && Math.abs(a.b - b.b) < 6; };
  var probe = document.createElement('span'); document.body.appendChild(probe);
  var varColour = function (v) { probe.style.color = ''; probe.style.color = 'var(' + v + ')'; return getComputedStyle(probe).color; };
  var crit = rgba(varColour('--crit-text')), accent = rgba(varColour('--accent')), accentInk = rgba(varColour('--accent-ink'));
  out.vars = { '--crit-text': varColour('--crit-text'), '--accent': varColour('--accent'), '--accent-ink': varColour('--accent-ink'), '--ink': varColour('--ink') };
  probe.remove();

  var all = [].slice.call(document.querySelectorAll('body *')).filter(function (e) {
    return !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|BR|svg|path|g|circle|rect|line|polyline|polygon|use)$/i.test(e.tagName) && !inSvg(e) && vis(e);
  });
  var rec = function (arr, e, extra) { var o = { el: sel(e), text: (own(e) || (e.innerText || e.value || e.placeholder || '')).replace(/\s+/g, ' ').trim().slice(0, 60), demo: demo(e) }; for (var k in extra) o[k] = extra[k]; arr.push(o); };

  all.forEach(function (e) {
    var cs = getComputedStyle(e), t = own(e);
    var isField = /^(INPUT|TEXTAREA|SELECT)$/.test(e.tagName) && e.type !== 'hidden' && e.type !== 'checkbox' && e.type !== 'radio';
    var fs = parseFloat(cs.fontSize);
    /* 1. text under 14px */
    if ((t || isField) && fs < 13.95) rec(out.small, e, { px: +fs.toFixed(2) });
    /* 3. uppercase styling */
    if (t && (cs.textTransform === 'uppercase' || /small-caps/.test(cs.fontVariantCaps || cs.fontVariant))) rec(out.upper, e, { tt: cs.textTransform, fv: cs.fontVariantCaps });
    /* 4. coloured text: anything with chroma that is not ink. --crit-text is allowed on a critical value only */
    if (t) {
      var c = rgba(cs.color);
      if (c && c.a > 0.3 && chroma(c) > 40) {
        var blue = c.b > c.r + 60 && c.b > c.g + 60;
        var cur = e.closest('.active,.on,[aria-selected="true"],[aria-pressed="true"],[aria-current]:not([aria-current="false"])');
        var current = blue && !!cur && !cur.classList.contains('screen') && !cur.classList.contains('pcv');
        /* the rule allows brand blue for "primary actions and the current state"; a selected tab or nav item is the current state */
        var kind = same(c, crit) ? 'crit-text' : (current ? 'current-state' : (same(c, accent) || same(c, accentInk) || blue ? 'accent' : 'other'));
        rec(out.colour, e, { color: cs.color, kind: kind, looksLikeValue: /\d/.test(t) && t.length < 30 });
      }
    }
    /* 5. stroked tags, and the one tag spec (15px/500, 40px tall) */
    var cls = typeof e.className === 'string' ? e.className : '';
    if (/(^|[\s_-])(tag|tags|pill|chip|badge|lozenge)(?=$|[\s_-])/i.test(cls) || /(^|\s)[a-z]+-(pill|chip|tag|badge)(\s|$)/i.test(cls)) {
      var sides = ['Top', 'Right', 'Bottom', 'Left'].filter(function (s) {
        var bc = rgba(cs['border' + s + 'Color']);
        return parseFloat(cs['border' + s + 'Width']) > 0 && cs['border' + s + 'Style'] !== 'none' && bc && bc.a > 0.05;
      });
      var ring = /inset/.test(cs.boxShadow) || (/\b0px 0px 0px [1-9]/.test(cs.boxShadow));
      var r = e.getBoundingClientRect();
      if (sides.length || ring) rec(out.stroked, e, { border: sides.length ? cs.borderTopWidth + ' ' + cs.borderTopStyle + ' ' + cs.borderTopColor : '', ring: ring ? cs.boxShadow.slice(0, 60) : '' });
      var spec = { px: +fs.toFixed(2), weight: cs.fontWeight, h: +r.height.toFixed(1) };
      var bg = rgba(cs.backgroundColor), filled = (bg && bg.a > 0.02) || sides.length;
      /* the tag spec applies to a drawn tag (a fill or a stroke); a clickable tag is held to the button rule (D-2) instead,
         and a status written as plain text (no fill) is not a tag */
      if (filled && !e.matches('button, [role=button]') && (Math.abs(fs - 15) > 0.3 || String(cs.fontWeight) !== '500' || Math.abs(r.height - 40) > 1)) rec(out.tagspec, e, spec);
    }
    /* 2. buttons under 44px */
    if (e.matches('button, [role=button], input[type=button], input[type=submit], a.btn, .btn')) {
      var b = e.getBoundingClientRect(), hit = b, via = '';
      /* a stretched-link button: an absolutely placed ::after with inset 0 makes the positioned ancestor the target */
      var af = getComputedStyle(e, '::after');
      if (af.content !== 'none' && af.position === 'absolute' && af.top === '0px' && af.bottom === '0px') {
        var cb = e; while (cb && getComputedStyle(cb).position === 'static') cb = cb.parentElement;
        if (cb) { hit = cb.getBoundingClientRect(); via = '::after → ' + sel(cb); }
      }
      if (hit.height < 43.5) rec(out.buttons, e, { h: +hit.height.toFixed(1), w: +hit.width.toFixed(1), via: via });
      else if (via) out.stretched = (out.stretched || 0) + 1;
    }
  });

  /* 6. lines longer than 66ch in reading text: measure rendered line boxes of each text node */
  var chPx = function (e) {
    var s = document.createElement('span'); s.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;width:66ch;padding:0;border:0';
    e.appendChild(s); var w = s.getBoundingClientRect().width; s.remove(); return w;
  };
  all.forEach(function (e) {
    if (e.tagName === 'TEXTAREA') {
      var cs = getComputedStyle(e), w = e.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var lim = chPx(e.parentElement || document.body);
      if (w > lim + 2) rec(out.measure, e, { kind: 'textarea box', widthPx: Math.round(w), limitPx: Math.round(lim), ratio: +(w / lim).toFixed(2) });
      return;
    }
    /* a text block: it has its own text and every child element is inline, so its line boxes are its lines */
    if (!own(e)) return;
    var inlineOnly = [].every.call(e.children, function (c) { return /^inline/.test(getComputedStyle(c).display) || getComputedStyle(c).display === 'none'; });
    if (!inlineOnly) return;
    var t = (e.innerText || '').replace(/\s+/g, ' ').trim(); if (t.length < 67) return;
    var lim66 = chPx(e), lines = {};
    var rg = document.createRange(); rg.selectNodeContents(e);
    [].forEach.call(rg.getClientRects(), function (q) { if (q.width < 1) return; var k = Math.round(q.bottom / 6); lines[k] = lines[k] || [1e9, -1e9]; lines[k][0] = Math.min(lines[k][0], q.left); lines[k][1] = Math.max(lines[k][1], q.right); });
    var max = 0; Object.keys(lines).forEach(function (k) { max = Math.max(max, lines[k][1] - lines[k][0]); });
    if (max > lim66 + 2) rec(out.measure, e, { kind: 'text line', lineWidthPx: Math.round(max), limitPx: Math.round(lim66), ratio: +(max / lim66).toFixed(2) });
  });
  return out;
})()
