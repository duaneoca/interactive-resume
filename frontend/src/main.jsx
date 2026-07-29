import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build prerenders the app into #root (see prerender.mjs), so
// hydrate that markup rather than throwing it away. In dev the container is
// empty, so fall back to a fresh render.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
