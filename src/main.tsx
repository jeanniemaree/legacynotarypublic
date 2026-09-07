import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import App from './App.tsx'
import { initGa4 } from './lib/ga4'
import './index.css'

initGa4()

// The #root markup is prerendered at build time (see scripts/prerender.mjs),
// so we hydrate the existing DOM rather than replacing it. This keeps the LCP
// hero text in the initial HTML with near-zero element render delay and never
// flashes an empty #root.
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <App />
  </StrictMode>,
)
