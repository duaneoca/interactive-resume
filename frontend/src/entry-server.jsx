import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { resumeData } from './data/resume'

// Server entry used only at build time by prerender.mjs.
// It renders the app to static HTML so the deployed index.html contains the
// real resume text, rather than an empty root div that only a JS-executing
// browser can fill in. Crawlers, link previews, and AI agents read this.
export function render() {
  return renderToString(<App />)
}

// Re-exported so prerender.mjs can generate the JSON-LD from the same source
// the page renders from, instead of a hand-maintained copy in index.html.
export { resumeData }
