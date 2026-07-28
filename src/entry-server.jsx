import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/**
 * Entry point used only at build time by scripts/prerender.js.
 * Renders the whole app to a static HTML string so the shipped index.html
 * carries real content for crawlers and link previews, instead of an empty
 * <div id="root">.
 */
export function render() {
  return renderToString(<App />)
}
