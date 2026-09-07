import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/siteConfig';

export const SEOHead = () => {
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.domain}/#website`,
        "url": `${siteConfig.domain}/`,
        "name": siteConfig.businessName,
        "description": siteConfig.description,
        "publisher": {
          "@id": `${siteConfig.domain}/#notary`
        }
      },
      {
        "@type": ["LocalBusiness", "Notary"],
        "@id": `${siteConfig.domain}/#notary`,
        "name": siteConfig.businessName,
        "image": siteConfig.logoUrl,
        "logo": siteConfig.logoUrl,
        "description": siteConfig.description,
        "url": `${siteConfig.domain}/`,
        "telephone": siteConfig.phoneE164,
        "priceRange": "$$",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Tap to Pay", "Zelle"],
        "sameAs": siteConfig.sameAs,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": siteConfig.addressLocality,
          "addressRegion": siteConfig.addressRegion,
          "postalCode": siteConfig.postalCode,
          "addressCountry": siteConfig.addressCountry
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": siteConfig.latitude,
          "longitude": siteConfig.longitude
        },
        "areaServed": [
          ...siteConfig.serviceAreaCounties.map(county => ({
            "@type": "AdministrativeArea",
            "name": county
          })),
          ...siteConfig.serviceAreaCities.map(city => ({
            "@type": "City",
            "name": city
          }))
        ],
        "founder": {
          "@type": "Person",
          "name": siteConfig.ownerName,
          "jobTitle": siteConfig.ownerTitle
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
        "@id": `${siteConfig.domain}/#faq`,
        "mainEntity": siteConfig.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <Helmet>
      <title>{siteConfig.businessName} | Texas Mobile Notary Services</title>
      <meta name="description" content={siteConfig.description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={`${siteConfig.domain}/`} />
      
      {/* OpenGraph / Facebook */}
      <meta property="og:title" content={`${siteConfig.businessName} | Texas Mobile Notary Services`} />
      <meta property="og:description" content={siteConfig.description} />
      <meta property="og:image" content={siteConfig.logoUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteConfig.ownerName} - ${siteConfig.ownerTitle}`} />
      <meta property="og:url" content={`${siteConfig.domain}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.businessName} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${siteConfig.businessName} | Texas Mobile Notary Services`} />
      <meta name="twitter:description" content={siteConfig.description} />
      <meta name="twitter:image" content={siteConfig.logoUrl} />

      {/* Structured Data JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaGraph)}
      </script>
    </Helmet>
  );
};
