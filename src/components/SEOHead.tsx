import { Helmet } from 'react-helmet-async';

export const SEOHead = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Legacy Notary Public",
    "image": "https://legacynotarypublic.com/images/Headshot.jpeg",
    "description": "Professional mobile notary services serving Brazoria, Matagorda, Galveston, and Harris Counties. I travel to your home, office, hospital, nursing facility, correctional facility, or another mutually agreed location.",
    "url": "https://legacynotarypublic.com/",
    "telephone": "+19795291312",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "TX",
      "addressCountry": "US"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Brazoria County" },
      { "@type": "AdministrativeArea", "name": "Matagorda County" },
      { "@type": "AdministrativeArea", "name": "Galveston County" },
      { "@type": "AdministrativeArea", "name": "Harris County" }
    ],
    "founder": {
      "@type": "Person",
      "name": "Jeannie Hernandez"
    }
  };

  return (
    <Helmet>
      <title>Legacy Notary Public | Mobile Notary Services</title>
      <meta name="description" content="Professional mobile notary serving Brazoria, Matagorda, Galveston, and Harris Counties. We travel to you. Book an appointment with Jeannie Hernandez today." />
      <meta property="og:title" content="Legacy Notary Public | Mobile Notary Services" />
      <meta property="og:description" content="Professional mobile notary serving Brazoria, Matagorda, Galveston, and Harris Counties. We travel to you." />
      <meta property="og:image" content="https://legacynotarypublic.com/images/Headshot.jpeg" />
      <meta property="og:url" content="https://legacynotarypublic.com/" />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
