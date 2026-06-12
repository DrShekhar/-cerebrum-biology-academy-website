// Detect broken internal links in city-hub-data.ts and map each to its real
// city/region hub (prospect-safe: a relevant landing page, never a 404).
import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

const ROOT = process.cwd()
const APP = join(ROOT, 'src/app')

// --- 1. Static + dynamic app routes ---
const staticRoutes = new Set()
const dynamicRoutes = []
function walk(dir, parts) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (!statSync(full).isDirectory()) continue
    if (entry.startsWith('(') && entry.endsWith(')')) {
      walk(full, parts)
      continue
    }
    if (entry.startsWith('@')) continue
    walk(full, [...parts, entry])
  }
  const hasPage = readdirSync(dir).some((f) => /^page\.(tsx|jsx|ts|js|mdx)$/.test(f))
  if (hasPage) {
    const p = parts.filter((x) => !(x.startsWith('(') && x.endsWith(')')))
    if (p.some((x) => x.includes('['))) {
      const rx = p
        .map((s) => (s.includes('[') ? '[^/]+' : s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
        .join('/')
      dynamicRoutes.push(new RegExp('^/' + rx + '/?$'))
    } else staticRoutes.add('/' + p.join('/'))
  }
}
walk(APP, [])
staticRoutes.add('/')

// --- 2. Existing redirect sources ---
const redirectSrc = readFileSync(join(ROOT, 'src/config/seo-redirects.mjs'), 'utf8')
const redirectSources = new Set()
for (const m of redirectSrc.matchAll(/source:\s*'([^']+)'/g)) redirectSources.add(m[1])

// --- 3. Broken url: values ---
const hub = readFileSync(join(ROOT, 'src/data/city-seo/city-hub-data.ts'), 'utf8')
const urls = new Set()
for (const m of hub.matchAll(/url:\s*'([^']+)'/g)) if (m[1].startsWith('/')) urls.add(m[1])
const exists = (u) =>
  staticRoutes.has(u) || redirectSources.has(u) || dynamicRoutes.some((rx) => rx.test(u))
const broken = [...urls].filter((u) => !exists(u)).sort()

// --- 4. Ordered keyword -> real hub map (first match wins; specific first) ---
const OVERRIDES = {
  '/free-demo': '/book-free-demo',
  '/biology-classes-class-11': '/neet-coaching',
  '/biology-classes-class-12': '/neet-coaching',
  '/neet-hybrid-coaching': '/neet-coaching',
  '/neet-self-study-tips': '/neet-coaching',
  '/neet-weekend-batch': '/neet-coaching',
}
const RULES = [
  [['dwarka'], '/neet-coaching-dwarka'],
  [['mahendragarh'], '/neet-coaching-mahendragarh'],
  [['rohini'], '/neet-coaching-rohini'],
  [['amritsar'], '/neet-coaching-amritsar'],
  [['jalandhar'], '/neet-coaching-jalandhar'],
  [['ludhiana'], '/neet-coaching-ludhiana'],
  [['mohali', 'kharar-mohali'], '/neet-coaching-mohali'],
  [['zirakpur'], '/neet-coaching-zirakpur'],
  [['panchkula', 'pinjore', 'kalka'], '/neet-coaching-panchkula'],
  [['chandigarh', 'ambala', 'manimajra'], '/neet-coaching-chandigarh'],
  [['pathankot', 'patiala', 'phagwara', 'kharar-punjab', '-punjab'], '/neet-coaching-punjab'],
  [['jaipur'], '/neet-coaching-jaipur'],
  [['ghaziabad'], '/neet-coaching-ghaziabad'],
  [['noida'], '/neet-coaching-noida'],
  [['faridabad'], '/neet-coaching-faridabad'],
  [['manesar', 'golf-course', 'gurgaon', 'gurugram'], '/neet-coaching-gurugram'],
  [
    ['meerut', 'bhiwani', 'jhajjar', 'palwal', 'narnaul', 'bawal', 'dharuhera', 'yamunanagar'],
    '/biology-classes-near-me',
  ],
  [
    [
      '-delhi',
      'connaught-place',
      'janakpuri',
      'laxmi-nagar',
      'preet-vihar',
      'rajinder-nagar',
      'south-extension',
      'wazirpur',
      'paschim-vihar',
      'rajouri-garden',
      'subhash-nagar',
      'tilak-nagar',
      'uttam-nagar',
      'green-park',
      'andrews-ganj',
      'chanakyapuri',
      '-ina',
      'jangpura',
      'kotla-mubarakpur',
      'model-town',
      'moolchand',
      'vikaspuri',
      'mayur-vihar',
      'patel-nagar',
      'vasant',
      'aiims-coaching',
    ],
    '/biology-classes-delhi',
  ],
]
function target(u) {
  if (OVERRIDES[u]) return OVERRIDES[u]
  for (const [keys, dest] of RULES) if (keys.some((k) => u.includes(k))) return dest
  return '/biology-classes-near-me' // safe, relevant generic fallback
}

const mapped = broken.map((u) => ({ source: u, destination: target(u) }))
// sanity: every destination must be a real route AND not itself a redirect
// source (would create a double-hop chain).
const badTargets = mapped.filter(
  (m) =>
    !(staticRoutes.has(m.destination) || dynamicRoutes.some((rx) => rx.test(m.destination))) ||
    redirectSources.has(m.destination)
)
const nearMe = mapped.filter((m) => m.destination === '/biology-classes-near-me')

console.log(`BROKEN: ${broken.length}`)
console.log(`bad/unreachable destinations: ${badTargets.length}`)
badTargets.forEach((m) => console.log('  BAD ->', m.source, m.destination))
console.log(`mapped to generic /biology-classes-near-me (review these): ${nearMe.length}`)
nearMe.forEach((m) => console.log('  ', m.source))
// destination distribution
const dist = {}
for (const m of mapped) dist[m.destination] = (dist[m.destination] || 0) + 1
console.log('\nDestination distribution:')
Object.entries(dist)
  .sort((a, b) => b[1] - a[1])
  .forEach(([d, n]) => console.log(`  ${n}  ${d}`))

// --- 5. Emit redirect array file ---
const lines = mapped.map(
  (m) => `  { source: '${m.source}', destination: '${m.destination}', permanent: true },`
)
const out = `/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const cityHubBrokenLinkRedirects = [
${lines.join('\n')}
]
`
writeFileSync('/tmp/links/cityHubBrokenLinkRedirects.mjs', out)
console.log('\nWrote /tmp/links/cityHubBrokenLinkRedirects.mjs with', mapped.length, 'redirects')
