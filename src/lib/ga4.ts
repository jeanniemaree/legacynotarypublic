/**
 * Loads GA4 only when VITE_GA4_MEASUREMENT_ID is a real G-… ID at build time.
 * Never invent or hardcode a Measurement ID.
 */
const MEASUREMENT_ID_RE = /^G-[A-Z0-9]+$/;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function initGa4(): void {
  const measurementId = (import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined)?.trim();
  if (!measurementId || !MEASUREMENT_ID_RE.test(measurementId)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true,
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}
