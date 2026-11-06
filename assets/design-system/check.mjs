#!/usr/bin/env node
// SimpleCare design system: lists what an HTML page draws by hand instead of
// taking from the design system. Copied next to the exported design system
// (check.mjs) by `npm run export:html`. No dependencies.
//
//   node assets/design-system/check.mjs simplecare-physician-portal-v2.html
//   node assets/design-system/check.mjs page.html --screen inbox     one screen only
//   node assets/design-system/check.mjs page.html --all              every finding, not the top 15
//   node assets/design-system/check.mjs page.html --json             machine-readable
//   node assets/design-system/check.mjs page.html --baseline b.json  fail if any count went up
//                                                (--write-baseline b.json records today's counts)
//
// What it flags:
//   colour     hex / rgb() / hsl() in CSS (rule, inline style), with the variable to use instead
//   font       a font-family other than inherit / var(--font-sans) / a monospace stack
//   radius     a border-radius in px instead of var(--radius-…)
//   icon       an <svg> written into the page instead of SC.icon() / <sc-icon>
//   component  hand-built buttons, tags, pills, chips, badges and avatars (use <sc-button>, <sc-tag>,
//              <sc-chip>, <sc-badge>, <sc-avatar> or SC.html)
//
// Leave something on purpose (a printed prescription pad that must look like
// paper) by putting /* sc-allow: why */ in that CSS rule, or pass --allow
// "<regex on the selector>".
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const files = args.filter((a, i) => !a.startsWith('--') && !['--screen', '--allow', '--baseline', '--write-baseline'].includes(args[i - 1]));
if (!files.length) {
  console.log(readFileSync(fileURLToPath(import.meta.url), 'utf8').split('\n').slice(1, 26).map((l) => l.replace(/^\/\/ ?/, '')).join('\n'));
  process.exit(1);
}
const onlyScreen = option('--screen');
const allow = option('--allow') ? new RegExp(option('--allow')) : null;
const here = dirname(fileURLToPath(import.meta.url));

/* -- colours: what each design-system variable is, to suggest replacements ---- */
const hexToRgb = (h) => {
  h = h.replace('#', '');
  if (h.length <= 4) h = [...h].map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const oklab = ([r, g, b]) => {
  [r, g, b] = [r, g, b].map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
};
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

// Light values of the tokens (simplecare-tokens.css, :root only), resolving var() chains.
const tokensFile = resolve(here, 'simplecare-tokens.css');
const tokenValue = {};
if (existsSync(tokensFile)) {
  const root = readFileSync(tokensFile, 'utf8').split(/^\.dark,/m)[0];
  for (const [, name, value] of root.matchAll(/(--color-[\w-]+)\s*:\s*([^;]+);/g)) tokenValue[name] = value.trim();
}
const resolveToken = (v, depth = 0) => {
  const m = /^var\((--[\w-]+)\)$/.exec(v);
  return m && depth < 8 ? resolveToken(tokenValue[m[1]] ?? '', depth + 1) : v;
};
// The portal's own variables, as the bridge maps them (preferred in suggestions).
const bridgeFile = resolve(here, 'portal-bridge.css');
const pageVars = {};
if (existsSync(bridgeFile)) {
  const root = /:root\s*\{([^}]*)\}/.exec(readFileSync(bridgeFile, 'utf8'))?.[1] ?? '';
  for (const [, name, value] of root.matchAll(/(--[\w-]+)\s*:\s*(var\(--color-[\w-]+\))\s*;/g)) pageVars[name] = resolveToken(value);
}
const candidates = [];
for (const [name, hex] of Object.entries(pageVars)) if (/^#[0-9a-f]{6}$/i.test(hex)) candidates.push({ name, hex, lab: oklab(hexToRgb(hex)), page: true });
for (const [name, raw] of Object.entries(tokenValue)) {
  const hex = resolveToken(raw);
  // Semantic and palette tokens; page variables win ties.
  if (/^#[0-9a-f]{6}$/i.test(hex) && /^--color-(navy|grey|error|success|warning|info|teal|pink|surface|text|border|icon)-/.test(name)) {
    candidates.push({ name, hex, lab: oklab(hexToRgb(hex)), page: false });
  }
}
function suggest(literal) {
  let rgb, alpha = 1;
  const hex = /^#([0-9a-f]{3,8})$/i.exec(literal);
  if (hex) {
    let h = hex[1];
    if (h.length === 4 || h.length === 8) {
      alpha = parseInt(h.length === 4 ? h[3] + h[3] : h.slice(6), 16) / 255;
      h = h.length === 4 ? h.slice(0, 3) : h.slice(0, 6);
    }
    rgb = hexToRgb(h);
  } else {
    const n = /rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.]+%?))?/i.exec(literal);
    if (!n) return '';
    rgb = [n[1], n[2], n[3]].map(Number);
    if (n[4]) alpha = n[4].endsWith('%') ? parseFloat(n[4]) / 100 : Number(n[4]);
  }
  if (!candidates.length) return '';
  const lab = oklab(rgb);
  const best = candidates
    .map((c) => ({ ...c, d: dist(lab, c.lab) - (c.page ? 0.004 : 0) }))
    .sort((a, b) => a.d - b.d)[0];
  const v = `var(${best.name})`;
  const close = best.d < 0.03 ? '' : ' (nearest; check by eye)';
  return alpha < 1 ? `color-mix(in srgb, ${v} ${Math.round(alpha * 100)}%, transparent)${close}` : `${v}${close}`;
}

/** Suggestion by role first (shadows, text on fills), then by nearest colour. */
function suggestFor(prop, literal) {
  if (/shadow/.test(prop)) return 'var(--shadow-card), or var(--shadow-elevation-1 | 2 | 3) for things that float';
  if (prop === 'color' && /^(#fff(fff)?|rgba?\(\s*255[\s,]+255[\s,]+255[\s,]*(1|1\.0)?\s*\))$/i.test(literal)) {
    return 'var(--color-text-primary-default) (text on a filled button or chip)';
  }
  return suggest(literal);
}

/* -- scanning ------------------------------------------------------------------- */
const COLOUR = /#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3,4}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/g;
const FONT_OK = /^(inherit|initial|unset|var\(--font-sans\)|var\(--mono[^)]*\)|ui-monospace.*|.*monospace\s*)$/i;
const COMPONENT_CLASS = [
  [/(^|[-_])(btn|button)([-_]|$)|^btn$/, 'button', '<sc-button>'],
  [/(^|[-_])(pill|chip)s?([-_]|$)/, 'chip / pill', '<sc-chip> or <sc-tag>'],
  [/(^|[-_])tags?([-_]|$)/, 'tag', '<sc-tag>'],
  [/(^|[-_])badge([-_]|$)/, 'badge', '<sc-badge>'],
  [/avatar|(^|[-_])av([-_]|$)/, 'avatar', '<sc-avatar>'],
];

function lineAt(text, index) {
  let line = 1;
  for (let i = text.indexOf('\n'); i !== -1 && i < index; i = text.indexOf('\n', i + 1)) line++;
  return line;
}
const screenOf = (selector) => /#screen-([\w-]+)/.exec(selector)?.[1] ?? 'global';

function scan(file) {
  const text = readFileSync(file, 'utf8');
  const findings = [];
  const add = (f) => {
    if (onlyScreen && f.screen !== onlyScreen) return;
    findings.push(f);
  };

  // CSS in <style> blocks.
  for (const style of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
    const css = style[1];
    const base = style.index + style[0].indexOf(css);
    for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selector = rule[1].replace(/\/\*[\s\S]*?\*\//g, '').trim().replace(/\s+/g, ' ');
      const body = rule[2];
      if (/sc-allow/.test(body) || /^@|^(from|to|\d+%)$/.test(selector) || (allow && allow.test(selector))) continue;
      const at = base + rule.index + rule[1].length;
      const screen = screenOf(selector);
      for (const decl of body.matchAll(/([\w-]+)\s*:\s*([^;]+)/g)) {
        const [, prop, value] = decl;
        const line = lineAt(text, at + decl.index);
        if (prop.startsWith('--')) continue; // defining a variable is how colours should be set
        for (const c of value.matchAll(COLOUR)) {
          if (/^url\(/.test(value.trim())) continue;
          add({ kind: 'colour', line, screen, where: selector, detail: `${prop}: ${c[0]}`, fix: suggestFor(prop, c[0]) });
        }
        if (prop === 'font-family' && !FONT_OK.test(value.trim())) {
          add({ kind: 'font', line, screen, where: selector, detail: `font-family: ${value.trim().slice(0, 60)}`, fix: 'inherit, or var(--font-sans)' });
        }
        if (prop === 'font' && /,/.test(value) && !/var\(--font-sans\)|inherit/.test(value)) {
          add({ kind: 'font', line, screen, where: selector, detail: `font: ${value.trim().slice(0, 60)}`, fix: 'font: inherit, then the size' });
        }
        if (prop.startsWith('border') && prop.endsWith('radius') && /\d+px/.test(value) && !/var\(/.test(value)) {
          add({ kind: 'radius', line, screen, where: selector, detail: `${prop}: ${value.trim()}`, fix: 'var(--radius-control) for controls, var(--radius-xs) for cards, var(--radius-avatar) for photos' });
        }
      }
    }
  }

  // Markup and script strings.
  const outsideStyles = text.replace(/<style[^>]*>[\s\S]*?<\/style>/g, (m) => m.replace(/[^\n]/g, ' '));
  for (const svg of outsideStyles.matchAll(/<svg\b/g)) {
    add({ kind: 'icon', line: lineAt(text, svg.index), screen: 'markup', where: '<svg>', detail: 'an inline <svg>', fix: "SC.icon('name') or <sc-icon name=\"…\">" });
  }
  for (const attr of outsideStyles.matchAll(/style\s*=\s*["']([^"']*)["']/g)) {
    for (const c of attr[1].matchAll(COLOUR)) {
      add({ kind: 'colour', line: lineAt(text, attr.index), screen: 'markup', where: 'style=""', detail: c[0], fix: suggestFor('', c[0]) });
    }
  }
  const classUse = new Map();
  for (const cls of outsideStyles.matchAll(/class(?:Name)?\s*=\s*\\?["']([^"'\\]+)\\?["']/g)) {
    for (const name of cls[1].split(/\s+/)) {
      for (const [re, kind, fix] of COMPONENT_CLASS) {
        if (re.test(name) && !name.startsWith('sv-')) {
          const key = `${kind}|${name}`;
          const entry = classUse.get(key) ?? { kind, name, fix, count: 0, line: lineAt(text, cls.index) };
          entry.count++;
          classUse.set(key, entry);
          break;
        }
      }
    }
  }
  for (const e of classUse.values()) {
    add({ kind: 'component', line: e.line, screen: 'markup', where: `.${e.name}`, detail: `${e.kind} built by hand (${e.count}×)`, fix: e.fix, weight: e.count });
  }
  return findings;
}

/* -- report --------------------------------------------------------------------- */
const KINDS = ['colour', 'font', 'radius', 'icon', 'component'];
const result = {};
for (const file of files) {
  const findings = scan(file);
  const counts = Object.fromEntries(KINDS.map((k) => [k, findings.filter((f) => f.kind === k).reduce((n, f) => n + (f.weight ?? 1), 0)]));
  const byScreen = {};
  for (const f of findings) {
    byScreen[f.screen] ??= Object.fromEntries(KINDS.map((k) => [k, 0]));
    byScreen[f.screen][f.kind] += f.weight ?? 1;
  }
  result[file] = { counts, byScreen, findings };
}

if (flag('--json')) {
  console.log(JSON.stringify(result, null, 2));
} else {
  for (const [file, { counts, byScreen, findings }] of Object.entries(result)) {
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    console.log(`\n${file}: ${total} things drawn by hand${onlyScreen ? ` on #screen-${onlyScreen}` : ''}`);
    console.log('  ' + KINDS.map((k) => `${k} ${counts[k]}`).join(' · '));
    const screens = Object.entries(byScreen).sort((a, b) => Object.values(b[1]).reduce((x, y) => x + y) - Object.values(a[1]).reduce((x, y) => x + y));
    console.log('\n  By screen (CSS rules scoped to #screen-…; "global" and "markup" are page-wide):');
    for (const [screen, c] of screens) console.log(`    ${screen.padEnd(16)} ${KINDS.map((k) => `${k} ${c[k]}`).join(' · ')}`);
    for (const kind of KINDS) {
      const list = findings.filter((f) => f.kind === kind).sort((a, b) => (b.weight ?? 1) - (a.weight ?? 1) || a.line - b.line);
      if (!list.length) continue;
      console.log(`\n  ${kind} (${counts[kind]}):`);
      for (const f of flag('--all') ? list : list.slice(0, 15)) {
        console.log(`    line ${String(f.line).padEnd(6)} ${f.where.slice(0, 60).padEnd(60)} ${f.detail}`);
        if (f.fix) console.log(`    ${''.padEnd(11)}→ ${f.fix}`);
      }
      if (!flag('--all') && list.length > 15) console.log(`    … ${list.length - 15} more (--all)`);
    }
  }
}

const baselineOut = option('--write-baseline');
if (baselineOut) {
  writeFileSync(baselineOut, JSON.stringify(Object.fromEntries(Object.entries(result).map(([f, r]) => [f, r.counts])), null, 2) + '\n');
  console.log(`\nWrote today's counts to ${baselineOut}.`);
}
const baselineIn = option('--baseline');
if (baselineIn) {
  const base = JSON.parse(readFileSync(baselineIn, 'utf8'));
  const worse = [];
  for (const [file, r] of Object.entries(result)) {
    for (const k of KINDS) if (base[file] && r.counts[k] > (base[file][k] ?? 0)) worse.push(`${file}: ${k} ${base[file][k]} → ${r.counts[k]}`);
  }
  if (worse.length) {
    console.error(`\nMore things drawn by hand than the baseline:\n  ${worse.join('\n  ')}`);
    process.exit(1);
  }
  console.log('\nNo count went up against the baseline.');
}
