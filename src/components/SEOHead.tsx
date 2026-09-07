import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/siteConfig';

/**
 * SEOHead manages the document <title> and social meta only.
 *
 * The canonical JSON-LD structured data (@graph: WebSite + LocalBusiness/Notary
 * + FAQPage) lives ONCE in the static index.html <head> so no-JS crawlers and
 * AI agents get it in raw HTML. We intentionally do NOT re-inject it via Helmet:
 * react-helmet-async cannot dedupe arbitrary <script> tags, so a second copy
 * would create duplicate @id entities that fight the static graph. The static
 * FAQPage mirrors siteConfig.faqs exactly — keep them in sync when editing.
 */
export const SEOHead = () => {
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

      {/* JSON-LD structured data lives in static index.html (see note above) to
          avoid duplicate @id entities Helmet cannot dedupe. */}
    </Helmet>
  );
};
