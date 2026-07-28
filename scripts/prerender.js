// Injects a statically rendered copy of the app into dist/index.html.
//
// The site is a client-rendered SPA, so the HTML Vite emits contains only an
// empty <div id="root">. Crawlers, link-preview bots and anything else that
// reads the page without executing JavaScript therefore saw nothing. This step
// renders the same React tree to a string at build time and drops it into the
// root element, so the served HTML already contains the name, role, experience
// and projects. The client bundle still boots normally and re-renders on top.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')
const ssrDir = resolve(root, '.prerender')

const { render } = await import(resolve(ssrDir, 'entry-server.js'))
const appHtml = render()

const html = await readFile(htmlPath, 'utf8')
const marker = '<div id="root"></div>'

if (!html.includes(marker)) {
  throw new Error(`prerender: could not find ${marker} in dist/index.html`)
}

await writeFile(htmlPath, html.replace(marker, `<div id="root">${appHtml}</div>`), 'utf8')
await rm(ssrDir, { recursive: true, force: true })

console.log(`prerendered ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`)
