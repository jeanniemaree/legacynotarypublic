import { lazy, Suspense, useEffect, useState } from 'react';

const FeeEstimatorLazy = lazy(() =>
  import('./FeeEstimator').then((m) => ({ default: m.FeeEstimator })),
);

function EstimatorPlaceholder() {
  return (
    <section
      id="estimator"
      className="py-20 bg-primary text-white relative overflow-hidden"
      aria-label="Fee calculator"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-amber-200 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Instant Fee &amp; Travel Calculator
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
            Transparent Pricing &amp; Instant Quote
          </h2>
          <p className="mt-4 text-gray-300 text-lg">
            Calculated straight from Buc-ee&apos;s Lake Jackson. Select your destination and
            services for an exact, instant estimate before booking.
          </p>
        </div>
        <p className="text-center text-amber-200 font-medium">Loading fee calculator…</p>
      </div>
    </section>
  );
}

/**
 * Placeholder for SSR + first paint; lazy-loads the heavy calculator after hydrate
 * so the main JS chunk stays smaller (mobile lab FCP/SI).
 */
export function FeeEstimatorGate() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
  }, []);

  if (!live) {
    return <EstimatorPlaceholder />;
  }

  return (
    <Suspense fallback={<EstimatorPlaceholder />}>
      <FeeEstimatorLazy />
    </Suspense>
  );
}
