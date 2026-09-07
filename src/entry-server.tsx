import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

// Build-time prerender entry. Produces the static HTML that is injected into
// #root of dist/index.html so the hero/nav/services/FAQ/NAP exist in the
// initial response and match the post-hydration DOM exactly.
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
