# Client Off-Page SEO Checklist — Jeannie Hernandez / Legacy Notary Public

Your website code only lists **verified** profile URLs in `sameAs`. The wrong Facebook page (Addison TX) and placeholder Apple/Bing homepage links were removed.

Complete these steps, then send Michael the **public profile URLs** so we can paste them into `src/config/siteConfig.ts`.

---

### 0. One Google account + email + GA4 (do this first)

**Goal:** One Google login she owns that runs GBP, Analytics, Search Console, Maps, and the booking form. GitHub stays separate (no mailbox there).

#### Email choice (pick one)

| Option | Cost | When to use |
|--------|------|-------------|
| **A — Personal Gmail only** | Free | Fine to start; use for GA4 + GBP now |
| **B — Domain email → Gmail (recommended cheap)** | Free (Cloudflare Email Routing) | Want `info@legacynotarypublic.com` that lands in her Gmail |
| **C — Google Workspace** | ~$7+/mo | Want full Gmail for `@legacynotarypublic.com` (send + receive in Google apps) |

**Recommendation for Legacy Notary:** Start with **A or B**. Buy Workspace later only if she needs branded send/receive every day. **GA4 does not require Workspace.**

**If B (Cloudflare Email Routing):**
1. Domain DNS must be on Cloudflare (or add MX/TXT records Cloudflare gives you).
2. Email Routing → create address `info@legacynotarypublic.com` (and/or her name) → forward to her personal Gmail.
3. Optional: in Gmail → Settings → Accounts → “Send mail as” that address (needs SPF/DKIM from Cloudflare).

#### Create / confirm the Google account
1. Use (or create) a Google account **she** controls — preferably tied to the inbox she’ll check for the business.
2. Sign into the same account for: [business.google.com](https://business.google.com/), [analytics.google.com](https://analytics.google.com/), [search.google.com/search-console](https://search.google.com/search-console).
3. Optional: add Michael as Admin/Editor later — do **not** share her password; use Google “Manage users” / property access.

#### Create GA4 (free)
1. Open https://analytics.google.com/ → **Admin** (gear) → **Create property**.
2. Property name: `Legacy Notary Public`
3. Time zone: **United States – Central** · Currency: **USD**
4. Create a **Web** data stream → URL: `https://legacynotarypublic.com` · Stream name: `Legacy Notary Website`
5. Copy the **Measurement ID** (`G-XXXXXXXXXX`) and text it to Michael.
6. Michael will put it in `.env` as `VITE_GA4_MEASUREMENT_ID`, rebuild, and push (with her GitHub login).

#### Google Search Console (same day as GA4)
1. https://search.google.com/search-console → Add property → URL prefix `https://legacynotarypublic.com/`
2. Verify (HTML tag or DNS TXT). Michael can help with the tag if needed.
3. Optional: link GA4 ↔ Search Console in GA4 Admin → Product links.

---

### 1. Google Business Profile (already live — confirm ownership)
1. Open: https://business.google.com/
2. Sign in with the Google account that manages **Legacy Mobile Notary Public** / Legacy Notary Public.
3. Confirm phone `(979) 529-1312` and website `https://legacynotarypublic.com/`.
4. Add hours + photos if missing.
5. Public Maps link already on the site: https://maps.app.goo.gl/DQM6PWD8tFuKWvrZ9

---

### 2. Bing Places for Business (needs claim) — do this next
**Claim / sync link:** https://www.bingplaces.com/

**Fastest path (recommended):**
1. Go to https://www.bingplaces.com/
2. Sign in with a Microsoft account (Outlook/Hotmail/Xbox — create one if needed).
3. Choose **Sync with Google** / **Import from Google Business Profile** when offered.
4. Select the same Google listing used above so Bing, Yahoo, and Copilot get matching NAP data.
5. After approval, open the listing → **Share** / Maps view and copy the **Bing Maps URL that includes your business** (not just `bing.com/maps`).
6. Text that URL to Michael.

**If Google sync is unavailable:** create the listing manually with:
- Name: **Legacy Notary Public** (match Google exactly if possible)
- Phone: `(979) 529-1312`
- Website: `https://legacynotarypublic.com/`
- Service area: Brazoria, Matagorda, Galveston, Harris Counties (Lake Jackson base)

---

### 3. Apple Business Connect
1. Open: https://businessconnect.apple.com/
2. Sign in with an Apple ID.
3. Claim or create **Legacy Notary Public** with the same phone/website as Google.
4. After it appears on Apple Maps, send Michael the **Apple Maps place link** (not the Business Connect homepage).

---

### 4. Facebook — do **not** use the old vanity URL
`facebook.com/legacynotarypublic` belongs to a **different** Addison TX notary.  
If you want Facebook later, create a **new** Page for *your* Lake Jackson / Brazoria County business and send that URL.

---

### 5. After you send Apple + Bing URLs
Send Michael the **public place/profile URLs only** (Apple Maps place link + Bing Maps business link). Do not send the Business Connect or Bing Places dashboard homepage.

Michael will add those URLs to `sameAs` (Google Maps stays) and push the site update (using your GitHub login or collaborator access). Until then, the live site lists **Google Maps only** — no Apple/Bing/Facebook placeholders.
