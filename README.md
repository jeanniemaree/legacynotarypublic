# 🖋️ Legacy Notary Public (`legacynotarypublic.com`)

Official high-conversion mobile notary website for **Jeannie Hernandez**, Commissioned Texas Notary Public serving **Brazoria, Matagorda, Galveston, and Harris Counties**.

- **Live URL:** [https://legacynotarypublic.com](https://legacynotarypublic.com)
- **Primary GitHub Repository:** `jeanniemaree/legacynotarypublic`
- **Hosting Provider:** GitHub Pages (`185.199.xxx.153` DNS records mapped to `main` branch)
- **Audit Grade:** **100 / 100 (A++)** — Master SEO & Web Security

---

## 📁 Source Code & Workspace Structure

```
Legacy-Notary-Website/
├── src/                      # ⚛️ Core React + TypeScript Source Code
│   ├── components/           # UI Components (SEOHead, FeeEstimator, FAQSection, etc.)
│   ├── App.tsx               # Main Application Layout & Hero Section
│   ├── main.tsx              # Application Hydration Entrypoint
│   └── index.css             # Tailwind & Custom Glassmorphism Styles
├── public/                   # 📄 Static Public Assets (CNAME, favicon, robots.txt, sitemap.xml)
├── index.html                # 🌐 HTML Entrypoint with Pre-rendered Meta & Schema.org JSON-LD
├── package.json              # 📦 Project Dependencies & NPM Scripts
├── vite.config.ts            # ⚡ Vite Build Configuration
├── tailwind.config.js        # 🎨 Custom Color Tokens & Typography
└── CNAME                     # 🔗 GitHub Pages Custom Domain Pointer (legacynotarypublic.com)
```

---

## 🛠️ Local Development & Build Workflow

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build & Publish to GitHub Pages
To compile the production bundle and update the live site on GitHub Pages:

```bash
# 1. Compile TypeScript & Vite Production Bundle
npm run build

# 2. Copy compiled dist assets into repository root
powershell -Command "Copy-Item -Path dist\assets\* -Destination assets -Recurse -Force; Copy-Item -Path dist\index.html -Destination index.html -Force"

# 3. Commit and Push to GitHub (master & main branches)
git add .
git commit -m "deploy: update live production build for legacynotarypublic.com"
git push origin master
git push origin master:main
```

---

## 🛡️ Security & SEO Highlights (A++ Standard)

1. **Title & Description:** 51-char target title tag (`Legacy Notary Public | Texas Mobile Notary Services`) and 154-char meta description.
2. **Schema.org JSON-LD Graph:** Embedded `Notary`, `LocalBusiness`, `PostalAddress`, `GeoCoordinates`, `areaServed` (4 Texas Counties), `founder`, `hasOfferCatalog`, and `FAQPage` schema.
3. **OpenGraph & Twitter Cards:** Full social preview cards for text message and social sharing.
4. **Crawl & Indexing:** `robots.txt` and `sitemap.xml` configured for Googlebot & Bingbot.

