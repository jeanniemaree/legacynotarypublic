import { copyFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
copyFileSync(join(root, 'index.vite.html'), join(root, 'index.html'))
console.log('[prepare-index] Restored index.html from index.vite.html')
