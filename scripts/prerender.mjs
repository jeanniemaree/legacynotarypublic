/**
 * Build-time SSG: SSR-render App into dist/index.html #root so LCP text,
 * landmarks, FAQ, and NAP exist in the first HTML byte stream and match hydration.
 */
import { build as viteBuild } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { rm } from 'node:fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')
const ssrOutDir = path.join(root, 'dist-ssr')

async function prerender() {
  console.log('[prerender] SSR bundle…')
  await viteBuild({
    configFile: path.join(root, 'vite.config.ts'),
    build: {
      ssr: path.join(root, 'src/entry-server.tsx'),
      outDir: ssrOutDir,
      emptyOutDir: true,
      minify: false,
    },
  })

  const entryCandidates = [
    path.join(ssrOutDir, 'entry-server.js'),
    path.join(ssrOutDir, 'entry-server.mjs'),
  ]
  const entryPath = entryCandidates.find((p) => fs.existsSync(p))
  if (!entryPath) {
    const listing = fs.existsSync(ssrOutDir) ? fs.readdirSync(ssrOutDir).join(', ') : '(missing)'
    throw new Error(`[prerender] SSR entry not found. dist-ssr contains: ${listing}`)
  }

  const { render } = await import(pathToFileURL(entryPath).href)
  if (typeof render !== 'function') {
    throw new Error('[prerender] entry-server must export render()')
  }

  const appHtml = render()
  const indexPath = path.join(distDir, 'index.html')
  if (!fs.existsSync(indexPath)) {
    throw new Error('[prerender] dist/index.html missing — run vite build first')
  }

  let html = fs.readFileSync(indexPath, 'utf8')
  const rootEmpty = '<div id="root"></div>'
  if (!html.includes(rootEmpty)) {
    // Tolerate whitespace variants from prior templates
    const replaced = html.replace(
      /<div id="root"\s*>\s*<\/div>/,
      `<div id="root">${appHtml}</div>`,
    )
    if (replaced === html) {
      throw new Error(
        '[prerender] Could not find empty <div id="root"></div> in dist/index.html',
      )
    }
    html = replaced
  } else {
    html = html.replace(rootEmpty, `<div id="root">${appHtml}</div>`)
  }

  fs.writeFileSync(indexPath, html, 'utf8')
  await rm(ssrOutDir, { recursive: true, force: true })
  console.log(`[prerender] Injected ${appHtml.length} chars into #root`)
}

prerender().catch((err) => {
  console.error(err)
  process.exit(1)
})
