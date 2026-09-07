import { readFileSync, writeFileSync } from 'node:fs';

const files = ['src/App.tsx'];
for (const p of files) {
  const s = readFileSync(p, 'utf8');
  const idx = s.indexOf('aria-hidden="true">');
  if (idx !== -1) {
    const end = s.indexOf('</span>', idx);
    const inner = s.slice(idx + 'aria-hidden="true">'.length, end);
    console.log(p, 'span inner codepoints:', [...inner].map((c) => c.codePointAt(0).toString(16)).join(' '));
  }
  // Find any non-ASCII sequences
  const matches = [...s.matchAll(/[^\x00-\x7F]+/g)];
  for (const m of matches) {
    console.log('  seq @', m.index, JSON.stringify(m[0]), [...m[0]].map((c) => c.codePointAt(0).toString(16)).join(' '));
  }
}
