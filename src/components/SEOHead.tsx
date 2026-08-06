import { Helmet } from 'react-helmet-async';

export const SEOHead = () => {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Notary"],
        "@id": "https://legacynotarypublic.com/#notary",
        "name": "Legacy Notary Public",
        "image": "https://legacynotarypublic.com/images/Headshot.jpeg",
        "description": "Professional mobile notary services serving Brazoria, Matagorda, Galveston, and Harris Counties. Traveling to your home, office, hospital, nursing facility, or agreed location.",
        "url": "https://legacynotarypublic.com/",
        "telephone": "+19795291312",
        "priceRange": "$$",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Tap to Pay", "Zelle"],
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "TX",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 29.0436,
          "longitude": -95.4355
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Brazoria County, TX" },
          { "@type": "AdministrativeArea", "name": "Matagorda County, TX" },
          { "@type": "AdministrativeArea", "name": "Galveston County, TX" },
          { "@type": "AdministrativeArea", "name": "Harris County, TX" }
        ],
        "founder": {
          "@type": "Person",
          "name": "Jeannie Hernandez",
          "jobTitle": "Commissioned Texas Notary Public"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Mobile Notary Services Catalog",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Real Estate Closings & Loan Signings",
                "description": "Purchase, refinance, HELOC, seller packages, and mobile loan signings."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "General Notary Work",
                "description": "Affidavits, powers of attorney, wills, acknowledgments, and jurats."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hospital & Healthcare Notarizations",
                "description": "Compassionate mobile notarizations directly in hospital rooms and care facilities."
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://legacynotarypublic.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What identification is required for a Texas notarization?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All signers must present a valid, unexpired government-issued photo ID such as a Texas Driver License, State ID card, US Passport, or Military ID."
            }
          },
          {
            "@type": "Question",
            "name": "What are the notary fees in Texas?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Texas state law sets notary fees at $10 for the first signature and $1 for each additional signature. Travel and after-hours convenience fees are separate."
            }
          },
          {
            "@type": "Question",
            "name": "Do you travel to hospitals and nursing homes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Legacy Notary Public specializes in mobile hospital and nursing facility visits across Brazoria, Matagorda, Galveston, and Harris Counties."
            }
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      <title>Legacy Notary Public | Texas Mobile Notary Services</title>
      <meta name="description" content="Professional mobile notary serving Brazoria, Matagorda, Galveston, and Harris Counties. We travel to your home, office, hospital, or facility. Call (979) 529-1312." />
      <link rel="canonical" href="https://legacynotarypublic.com/" />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:title" content="Legacy Notary Public | Mobile Notary Services" />
      <meta property="og:description" content="Professional mobile notary serving Brazoria, Matagorda, Galveston, and Harris Counties. We travel to you." />
      <meta property="og:image" content="https://legacynotarypublic.com/images/Headshot.jpeg" />
      <meta property="og:url" content="https://legacynotarypublic.com/" />
      <meta property="og:type" content="website" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Legacy Notary Public | Mobile Notary Services" />
      <meta name="twitter:description" content="Professional mobile notary serving Brazoria, Matagorda, Galveston, and Harris Counties." />
      <meta name="twitter:image" content="https://legacynotarypublic.com/images/Headshot.jpeg" />

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
};
