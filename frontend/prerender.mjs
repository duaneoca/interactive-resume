/**
 * Build-time prerender.
 *
 * Runs after `vite build` and `vite build --ssr`. Renders the React app to
 * static HTML and injects it into dist/index.html, so the served page contains
 * the actual resume text instead of an empty <div id="root">. Also regenerates
 * the JSON-LD Person block from resume.js so it can never drift from the site.
 *
 * Fails loudly (nonzero exit) if the output does not contain expected resume
 * content, so a broken prerender breaks the build instead of silently shipping
 * an empty page.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const distHtml = resolve(here, 'dist/index.html')
const ssrEntry = resolve(here, '.prerender/entry-server.js')

const fail = (msg) => {
  console.error(`\nprerender: ${msg}\n`)
  process.exit(1)
}

if (!existsSync(distHtml)) fail(`missing ${distHtml}. Did "vite build" run?`)
if (!existsSync(ssrEntry)) fail(`missing ${ssrEntry}. Did the --ssr build run?`)

const { render, resumeData } = await import(ssrEntry)

// ---- 1. Render the app ------------------------------------------------------
let appHtml
try {
  appHtml = render()
} catch (err) {
  fail(`renderToString threw: ${err.stack || err}`)
}
if (!appHtml || appHtml.length < 1000) {
  fail(`render produced suspiciously little HTML (${appHtml?.length ?? 0} chars)`)
}

// ---- 2. Build JSON-LD from the same data the page renders from --------------
const { name, contact, summary, skills, experience, education } = resumeData

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name,
  email: contact.email,
  url: 'https://hire-duane.org',
  sameAs: [`https://${contact.github}`, `https://${contact.linkedin}`],
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.location.split(',')[0].trim(),
    addressRegion: (contact.location.split(',')[1] || '').trim(),
    addressCountry: 'US',
  },
  jobTitle: 'Forward Deployed Engineer',
  description: summary,
  knowsAbout: skills.flatMap((group) => group.items),
  alumniOf: education.map((e) => ({
    '@type': 'CollegeOrUniversity',
    name: e.school,
  })),
  hasOccupation: experience.map((job) => ({
    '@type': 'Occupation',
    name: job.roles.split('→').pop().trim(),
    occupationLocation: { '@type': 'Organization', name: job.company },
    startDate: job.period.split('–')[0].trim(),
    endDate: (job.period.split('–')[1] || '').trim(),
  })),
}

const jsonLdBlock =
  `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n    </script>`

// ---- 3. Inject both into dist/index.html ------------------------------------
let html = readFileSync(distHtml, 'utf8')

const rootDiv = '<div id="root"></div>'
if (!html.includes(rootDiv)) fail(`could not find ${rootDiv} in dist/index.html`)
html = html.replace(rootDiv, `<div id="root">${appHtml}</div>`)

const jsonLdRe = /<script type="application\/ld\+json">[\s\S]*?<\/script>/
if (!jsonLdRe.test(html)) fail('could not find the JSON-LD block in dist/index.html')
html = html.replace(jsonLdRe, jsonLdBlock)

writeFileSync(distHtml, html)

// ---- 4. Assert the output is actually crawlable -----------------------------
const required = ['Responsys', '20+ years', 'UC Berkeley', 'Current Projects']
const missing = required.filter((s) => !html.includes(s))
if (missing.length) {
  fail(`output is missing expected content: ${missing.join(', ')}`)
}

const kb = (html.length / 1024).toFixed(1)
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)}kB of HTML, index.html now ${kb}kB`)
