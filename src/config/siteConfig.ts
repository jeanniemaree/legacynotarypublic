export const siteConfig = {
  // --- Business Identity ---
  businessName: "Legacy Notary Public",
  ownerName: "Jeannie Hernandez",
  ownerTitle: "Commissioned Texas Notary Public",
  description: "Professional mobile notary serving Brazoria, Matagorda, Galveston, and Harris Counties. Travel to your home, hospital, or office. Call (979) 529-1312.",

  // --- Contact ---
  phoneDisplay: "(979) 529-1312",
  phoneE164: "+19795291312",

  // --- Location (For Local SEO) ---
  addressLocality: "Lake Jackson",
  addressRegion: "TX",
  postalCode: "77566",
  addressCountry: "US",
  
  // GeoCoordinates for Lake Jackson base
  latitude: 29.0436,
  longitude: -95.4355,

  // Serving Areas for Schema
  serviceAreaCounties: [
    "Brazoria County, TX",
    "Matagorda County, TX",
    "Galveston County, TX",
    "Harris County, TX"
  ],
  serviceAreaCities: [
    "Lake Jackson",
    "Freeport",
    "Clute",
    "Angleton",
    "Pearland",
    "League City",
    "Houston"
  ],

  // --- Domains & Branding ---
  domain: "https://legacynotarypublic.com",
  logoUrl: "https://legacynotarypublic.com/images/Headshot.jpeg",
  bookingUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeFGHvwVwHGdY4qKWPtPrZry7vl7EoU-xR6Vp96HBEdaibV_g/viewform",

  // --- External Profiles (sameAs) ---
  // Only verified entity URLs. Do NOT add Apple/Bing/Facebook until real place/page URLs exist.
  // Wrong Facebook vanity (Addison TX competitor) removed 2026-09-06.
  sameAs: [
    "https://maps.app.goo.gl/DQM6PWD8tFuKWvrZ9"
  ],

  // --- FAQ (UI + FAQPage schema must stay identical) ---
  faqs: [
    {
      question: "What documents are required for a Texas mobile notarization?",
      answer:
        "All signers must present a valid, unexpired government-issued photo ID (such as a Texas Driver License, State ID, US Passport, or Military ID). Documents must be complete with no blank pages or missing sections prior to notarization."
    },
    {
      question: "What are the notary fees set by Texas State Law?",
      answer:
        "Texas Government Code § 406.024 caps notary fees at $10 for the first signature and $1 for each additional signature on the same document. Travel and after-hours convenience fees are agreed upon in advance."
    },
    {
      question: "Do you travel to hospitals, nursing homes, and rehab centers?",
      answer:
        "Yes. Jeannie Hernandez provides compassionate bedside mobile notarizations directly in hospital rooms, assisted living facilities, and rehabilitation centers across Brazoria, Matagorda, Galveston, and Harris Counties."
    },
    {
      question: "Can a Texas notary public give legal advice or draft documents?",
      answer:
        "No. Texas Notaries Public are not licensed attorneys and are legally prohibited from giving legal advice, drafting legal documents, or advising on which document type you need."
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept Cash, Credit Cards, Debit Cards, Contactless Tap to Pay (Apple Pay, Google Pay), and Zelle upon completion of service."
    }
  ]
} as const;
