# MISSION CONTROL — Legacy Notary Public (Jeannie Hernandez)

**Client:** Sister-in-law Jeannie Hernandez · Lake Jackson / Brazoria County TX  
**Live:** https://legacynotarypublic.com/  
**Updated:** 2026-09-06 (Perf → 100 code pass — DONE in src)

---

## Status this session

| Item | Status |
|------|--------|
| Remove wrong Facebook from `sameAs` | **DONE** |
| Remove Apple/Bing placeholder URLs from `sameAs` | **DONE** |
| FAQ UI + schema SSOT (`siteConfig.faqs`) | **DONE** |
| FAQ answers stay in DOM + aria-controls | **DONE** |
| Maps: no hardcoded key; load on address focus | **DONE** |
| Bing claim handoff for Jeannie | **DONE** — see `SEO_CLIENT_CHECKLIST.md` |
| Restore Vite `index.html` entry (`/src/main.tsx`) | **DONE** |
| Perf: slim Inter weights (400;700) | **DONE** |
| Perf: remove expensive blur orbs | **DONE** |
| Perf: single LCP fetchPriority | **DONE** |
| Perf: soften fake-rating copy → Google Maps link | **DONE** |
| Perf: drop unused `react-router-dom` | **DONE** (`package.json` + lock) |
| Build + push live | **WAITING** on Jeannie GitHub login / collaborator |

---

## Perf code shipped (this pass)

1. `index.html` — Inter `wght@400;700` + `display=swap`
2. `App.tsx` / `FeeEstimator.tsx` — radial gradients instead of `blur-[100/120px]` orbs; dropped heavy backdrop-blur on estimator cards
3. `App.tsx` — mobile about headshot sole `fetchPriority="high"`; desktop hero `loading="lazy"`
4. Maps — focus-only (`mapsRequested`); env key only
5. Removed unused `react-router-dom`
6. “See Google reviews” → `siteConfig.sameAs[0]` (no AggregateRating schema)
7. `index.css` / `MobileCallBar` — removed backdrop-filter glass cost

**Do not:** invent GA4 IDs; invent Apple/Bing `sameAs`.

---

## Remains for lab Perf 100 (post-deploy)

1. Rebuild + deploy so live assets match `src`
2. Re-run PSI mobile on https://legacynotarypublic.com/
3. If LCP still soft: convert `/images/Headshot.jpeg` → WebP/AVIF + responsive sizes; consider preloading the LCP image
4. Optional: self-host Inter (or system stack) to cut Google Fonts RTT
5. Confirm unused `node_modules/react-router*` cleaned after local `npm install` (Drive may leave orphans)

---

## Send Jeannie this Bing claim link

**https://www.bingplaces.com/**

Best path: sign in → **Sync with Google** using her GBP → copy the real Bing Maps business URL back to Michael.

Full steps: `SEO_CLIENT_CHECKLIST.md`

---

## Push when she gives GitHub access

```powershell
npm install
npm run build
powershell -Command "Copy-Item -Path dist\assets\* -Destination assets -Recurse -Force; Copy-Item -Path dist\index.html -Destination index.html -Force"
git add .
git commit -m "fix: PageSpeed perf — slim fonts, kill blur orbs, single LCP"
git push origin master
git push origin master:main
```

---

## Still open (after deploy)

1. Confirm GBP ownership + hours/photos  
2. Claim Bing + paste entity URL into `sameAs`  
3. Claim Apple Business Connect + paste Apple Maps place URL  
4. Optional new Facebook Page (never reuse Addison vanity)  
5. Re-run PSI mobile lab after deploy (target Perf 100)
