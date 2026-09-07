import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep lucide in the SSR bundle so prerender does not need node_modules resolution at import time
  ssr: {
    noExternal: ['lucide-react'],
  },
})
