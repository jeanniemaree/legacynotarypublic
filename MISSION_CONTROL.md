# MISSION CONTROL — Legacy Notary Public (Jeannie Hernandez)

**Client:** Sister-in-law Jeannie Hernandez · Lake Jackson / Brazoria County TX  
**Live:** https://legacynotarypublic.com/  
**Updated:** 2026-09-06 (Gate 100 SSG prerender)

---

## Task: Gate 100 — SSG prerender (ACTIVE)

### Implementation
1. [DONE] `src/entry-server.tsx` + `scripts/prerender.mjs` — full App SSR into `#root`
2. [DONE] `src/main.tsx` — `hydrateRoot` (no empty `#root` wipe)
3. [DONE] `index.vite.html` — Vite source template; build restores then prerenders
4. [DONE] Remove conflicting `#prerender-hero` / `#static-shell` duplicate trees
5. [DONE] Landmarks: `header` > `nav`, `main`, `footer`; static `<title>`
6. [DONE] Select labels (`city-preset-select`, `appointment-time-select`)
7. [DONE] FAQ answers stay in DOM; `sameAs` Maps-only; no GA4 invent
8. [NEXT] Push `master` + `master:main` as jeanniemaree
9. [NEXT] PSI / Lighthouse Gate 100 verify

### Scores target
Perf 100 · A11y 100 · BP 100 · SEO 100 · Agentic full

---

## Do not
- Invent GA4 IDs
- Invent Apple/Bing `sameAs` placeholders
