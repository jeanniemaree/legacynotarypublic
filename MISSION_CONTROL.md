# MISSION CONTROL — Legacy Notary Public (Jeannie Hernandez)

**Client:** Sister-in-law Jeannie Hernandez · Lake Jackson / Brazoria County TX  
**Live:** https://legacynotarypublic.com/  
**Updated:** 2026-09-06 (A11y residuals + LCP prerender)

---

## Task: A11y residuals → PSI 100

| Item | Status |
|------|--------|
| Nav `hover:text-secondary` → `hover:text-amber-200` | **DONE** (already) |
| Service card icons: keep `text-primary`; hover white on purple fill | **DONE** |
| Modal close `gray-400` → `gray-600` | **DONE** |
| FAQ `aria-controls` / ids + answers CSS-`hidden` in DOM | **DONE** (already) |
| Prerender hero white text on `#3b0764` | **DONE** |

---

## Task: Gate 100 / Perf — kill SPA LCP render delay

**Root cause:** LCP is hero TEXT with ~2677ms element render delay — empty `#root` until React JS runs + Google Fonts Inter blocking + `animate-fade-in-up` starts at opacity 0.

### Implementation plan
1. [DONE] `index.html` — remove Google Fonts; inline critical CSS; visible `#prerender-hero` inside `#root`; restore `/src/main.tsx`; keep SEO/JSON-LD/skip/static-shell/noscript
2. [DONE] `src/index.css` + `tailwind.config.js` — system font stack (drop Inter)
3. [DONE] `src/App.tsx` — remove `animate-fade-in-up` from hero
4. [NEXT] Rebuild + deploy so dist HTML retains prerender shell for lab scores
5. [NEXT] Re-run PSI mobile / Gate 100 on live URL

### Status this session

| Item | Status |
|------|--------|
| Remove Google Fonts (preconnect/link) | **DONE** |
| Inline critical ATF CSS | **DONE** |
| Visible prerender hero in `#root` | **DONE** |
| System font stack (css + tailwind) | **DONE** |
| Remove hero `animate-fade-in-up` | **DONE** |
| Keep Maps-only sameAs / no GA4 invent | **DONE** |
| Build + push live | **WAITING** on Jeannie GitHub login / collaborator |

---

## Do not
- Invent GA4 IDs
- Invent Apple/Bing `sameAs` placeholders

---

## Remains for lab Perf 100 (post-deploy)

1. Rebuild + deploy so live `index.html` includes prerender hero (Vite leaves shell until React replaces `#root`)
2. Re-run PSI mobile on https://legacynotarypublic.com/
3. Confirm LCP element is prerender/hero text with near-zero render delay
4. Confirm GBP ownership + Bing claim (see `SEO_CLIENT_CHECKLIST.md`)

---

## Push when she gives GitHub access

```powershell
npm install
npm run build
powershell -Command "Copy-Item -Path dist\assets\* -Destination assets -Recurse -Force; Copy-Item -Path dist\index.html -Destination index.html -Force"
git add .
git commit -m "fix: Gate 100 LCP — prerender hero, system fonts, drop Inter"
git push origin master
git push origin master:main
```
