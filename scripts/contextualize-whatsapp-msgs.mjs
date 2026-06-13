#!/usr/bin/env node
/**
 * Sweep all generic wa.me URLs and replace the text= param with a context-aware
 * message inferred from the file's route path.
 *
 * Targets two generic strings, replacing them in-place:
 *   1. "Hi! I want to book a FREE demo class for NEET Biology. Please share available timings."
 *   2. "Hi! I want to enroll in NEET Biology coaching. Please share fee structure and enrollment details."
 *      (also the shorter "Please share details." variant)
 *
 * The route path is derived from the file path. The replacement message comes from a
 * port of getContextAwareMessage() in src/lib/whatsapp/tracking.ts, with two intents:
 *   - 'demo'   → demo class request
 *   - 'enroll' → fee/enrolment request
 *
 * Run: node scripts/contextualize-whatsapp-msgs.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'

const PROJECT_ROOT = process.cwd()
const SRC_ROOT = path.join(PROJECT_ROOT, 'src')

// === route inference ===
function fileToRoute(filePath) {
  const rel = path.relative(SRC_ROOT, filePath)
  if (!rel.startsWith('app' + path.sep)) return null
  let route = rel.slice('app'.length).replace(/\\/g, '/')
  route = route.replace(/\/(page|layout|template)\.(tsx|ts)$/, '')
  // Strip route groups: /(auth)/sign-in → /sign-in
  route = route.replace(/\/\([^)]+\)/g, '')
  // Strip dynamic segment placeholders like [city] — they'll be left as-is for inference
  if (!route) route = '/'
  return route
}

// === port of getContextAwareMessage logic, with intent ===
function extractLocalityFromPath(p) {
  let m = p.match(/\/neet-coaching-([a-z-]+)-delhi/)
  if (m) return m[1].replace(/-/g, ' ')
  m = p.match(/\/biology-tuition-south-delhi\/([a-z-]+)/)
  if (m) return m[1].replace(/-/g, ' ')
  m = p.match(/\/locations\/[^/]+\/([a-z-]+)/)
  if (m) return m[1].replace(/-/g, ' ')
  return null
}

function titleCase(s) {
  return s
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const CITY_KEYWORDS = [
  'gurugram',
  'gurgaon',
  'noida',
  'faridabad',
  'ghaziabad',
  'rohini',
  'south-delhi',
  'north-delhi',
  'east-delhi',
  'west-delhi',
  'central-delhi',
  'south-extension',
  'lajpat-nagar',
  'defence-colony',
  'kalkaji',
  'malviya-nagar',
  'greater-kailash',
  'cr-park',
  'saket',
  'green-park',
  'hauz-khas',
  'dwarka',
  'pitampura',
  'janakpuri',
  'preet-vihar',
  'mumbai',
  'bangalore',
  'bengaluru',
  'hyderabad',
  'chennai',
  'kolkata',
  'pune',
  'kota',
  'jaipur',
  'lucknow',
  'patna',
  'gwalior',
  'indore',
  'bhopal',
  'nagpur',
  'chandigarh',
  'amritsar',
  'ludhiana',
  'panchkula',
  'mohali',
  'ambala',
  'dehradun',
  'haridwar',
  'rishikesh',
  'delhi',
  'delhi-ncr',
  'greater-noida',
  // NRI cities
  'dubai',
  'abu-dhabi',
  'sharjah',
  'doha',
  'riyadh',
  'jeddah',
  'kuwait',
  'manama',
  'muscat',
  'singapore',
  'london',
  'manchester',
  'birmingham',
  'leicester',
  'new-york',
  'houston',
  'dallas',
  'chicago',
  'atlanta',
  'boston',
  'washington-dc',
  'sf-bay',
  'edison-nj',
  'toronto',
  'calgary',
  'vancouver',
  'sydney',
  'melbourne',
  'brisbane',
  'auckland',
]

function extractCityFromPath(p) {
  for (const city of CITY_KEYWORDS) {
    const re = new RegExp(`(?:^|/|-)${city}(?:/|-|$)`)
    if (re.test(p)) return city.replace(/-/g, ' ')
  }
  return null
}

const COURSE_KEYWORDS = {
  'a-level': 'A-Level Biology',
  cambridge: 'Cambridge Biology',
  'ib-biology': 'IB Biology (HL/SL)',
  'ib-bio': 'IB Biology',
  igcse: 'IGCSE Biology',
  'ap-biology': 'AP Biology',
  gcse: 'GCSE Biology',
  olympiad: 'Biology Olympiad',
  usabo: 'USABO',
  ibo: 'IBO',
  bbo: 'British Biology Olympiad',
  inbo: 'INBO',
  cnbo: 'CNBO',
  sbo: 'Singapore Biology Olympiad',
  kbo: 'KBO',
  jbo: 'JBO',
  nseb: 'NSEB Olympiad',
  asob: 'ASOB',
  dropper: 'NEET Dropper batch',
  foundation: 'Foundation Biology (Class 9/10)',
  'crash-course': 'NEET crash course',
  'mock-test': 'NEET mock test series',
  'class-9': 'Class 9 Biology',
  'class-10': 'Class 10 Biology',
  'class-11': 'Class 11 Biology',
  'class-12': 'Class 12 Biology',
  'cbse-biology': 'CBSE Biology',
  'icse-biology': 'ICSE Biology',
  'ncert-biology': 'NCERT Biology',
  'maharashtra-hsc': 'Maharashtra HSC Biology',
  'pre-neet': 'pre-NEET Biology coaching',
  'online-biology-tutor': 'online NEET Biology tutoring',
  'biology-tutor-class': 'Biology tutoring',
  'board-exam-preparation': 'Board Exam Biology preparation',
  'biology-notes': 'NEET Biology notes',
  faculty: 'Cerebrum faculty',
  'neet-coaching-institute': 'Cerebrum Biology Academy',
}

// Keyword → topic for the ~final fallback when no city/course match
function topicFromSlug(routePath) {
  const slug = routePath.replace(/^\//, '').split('/')[0] || ''
  if (!slug) return null
  // Build a human label from the slug
  const cleaned = slug
    .replace(/^(neet-|biology-|best-|affordable-|free-|how-to-|why-)/i, '')
    .replace(/-/g, ' ')
    .trim()
  if (cleaned.length === 0 || cleaned.length > 40) return null
  return cleaned
}

function extractCourseFromPath(p) {
  for (const [key, label] of Object.entries(COURSE_KEYWORDS)) {
    if (p.includes(key)) return label
  }
  return null
}

function buildMessage(routePath, intent) {
  const city = extractLocalityFromPath(routePath) || extractCityFromPath(routePath)
  const course = extractCourseFromPath(routePath)
  const cityLabel = city ? titleCase(city) : null

  const isNRI =
    /\/(nri|overseas|international|worldwide)\//.test(routePath) ||
    /^\/(nri|overseas|international|worldwide)/.test(routePath) ||
    /-nri-|-overseas/.test(routePath)

  if (intent === 'demo') {
    if (course && cityLabel) {
      return `Hi! I want to book a FREE demo class for ${course} in ${cityLabel}. Please share available timings.`
    }
    if (course) {
      return `Hi! I want to book a FREE demo class for ${course}. Please share available timings.`
    }
    if (cityLabel) {
      return `Hi! I want to book a FREE demo class for NEET Biology coaching in ${cityLabel}. Please share available timings.`
    }
    if (isNRI) {
      return `Hi! I'm an NRI student and want to book a FREE online demo class for NEET Biology. Please share available timings.`
    }
    const topic = topicFromSlug(routePath)
    if (topic) {
      return `Hi! I want to book a FREE demo class — interested in ${topic}. Please share available timings.`
    }
    return `Hi! I want to book a FREE demo class for NEET Biology. Please share available timings.`
  }

  // intent === 'enroll'
  if (course && cityLabel) {
    return `Hi! I'm interested in ${course} in ${cityLabel}. Please share fee structure and enrolment details.`
  }
  if (course) {
    return `Hi! I'm interested in ${course}. Please share fee structure and enrolment details.`
  }
  if (cityLabel) {
    return `Hi! I'm interested in NEET Biology coaching in ${cityLabel}. Please share fee structure and enrolment details.`
  }
  if (isNRI) {
    return `Hi! I'm an NRI student interested in online NEET Biology coaching. Please share fee structure and enrolment details.`
  }
  const topic = topicFromSlug(routePath)
  if (topic) {
    return `Hi! I'm interested in ${topic}. Please share fee structure and enrolment details.`
  }
  return `Hi! I want to enroll in NEET Biology coaching. Please share fee structure and enrolment details.`
}

// === sweep ===
const GENERIC_DEMO_URLENC =
  'Hi!%20I%20want%20to%20book%20a%20FREE%20demo%20class%20for%20NEET%20Biology.%20Please%20share%20available%20timings.'
const GENERIC_ENROLL_URLENC =
  'Hi!%20I%20want%20to%20enroll%20in%20NEET%20Biology%20coaching.%20Please%20share%20fee%20structure%20and%20enrollment%20details.'
const GENERIC_ENROLL_UK_URLENC =
  'Hi!%20I%20want%20to%20enroll%20in%20NEET%20Biology%20coaching.%20Please%20share%20fee%20structure%20and%20enrolment%20details.'
const GENERIC_ENROLL_SHORT_URLENC =
  'Hi!%20I%20want%20to%20enroll%20in%20NEET%20Biology%20coaching.%20Please%20share%20details.'

function listMatchingFiles() {
  const patterns = [
    GENERIC_DEMO_URLENC,
    GENERIC_ENROLL_URLENC,
    GENERIC_ENROLL_UK_URLENC,
    GENERIC_ENROLL_SHORT_URLENC,
  ]
  const all = new Set()
  for (const pattern of patterns) {
    try {
      const out = execSync(`grep -rl '${pattern}' src --include='*.tsx' --include='*.ts'`, {
        encoding: 'utf8',
      })
      out
        .split('\n')
        .filter(Boolean)
        .forEach((f) => all.add(path.join(PROJECT_ROOT, f)))
    } catch (e) {
      // grep exits 1 on no match — ignore
    }
  }
  return Array.from(all)
}

const files = listMatchingFiles()
console.log(`Listing ${files.length} candidate files…`)
console.log(`First file:`, files[0])
let totalReplacements = 0
let filesChanged = 0

for (const file of files) {
  const route = fileToRoute(file) || '/'
  const original = readFileSync(file, 'utf8')
  let modified = original

  const demoMsg = encodeURIComponent(buildMessage(route, 'demo'))
  const enrollMsg = encodeURIComponent(buildMessage(route, 'enroll'))

  // Replace demo
  const demoRegex = new RegExp(GENERIC_DEMO_URLENC.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
  const beforeDemo = (modified.match(demoRegex) || []).length
  modified = modified.replace(demoRegex, demoMsg)

  // Replace enroll (long, US spelling)
  const enrollRegex = new RegExp(GENERIC_ENROLL_URLENC.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
  const beforeEnroll = (modified.match(enrollRegex) || []).length
  modified = modified.replace(enrollRegex, enrollMsg)

  // Replace enroll (long, UK spelling — emitted by an earlier run of this script)
  const enrollUkRegex = new RegExp(
    GENERIC_ENROLL_UK_URLENC.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'g'
  )
  const beforeEnrollUk = (modified.match(enrollUkRegex) || []).length
  modified = modified.replace(enrollUkRegex, enrollMsg)

  // Replace enroll (short)
  const shortRegex = new RegExp(
    GENERIC_ENROLL_SHORT_URLENC.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    'g'
  )
  const beforeShort = (modified.match(shortRegex) || []).length
  modified = modified.replace(shortRegex, enrollMsg)

  const replacementsHere = beforeDemo + beforeEnroll + beforeEnrollUk + beforeShort
  if (replacementsHere > 0 && modified !== original) {
    writeFileSync(file, modified, 'utf8')
    totalReplacements += replacementsHere
    filesChanged++
    console.log(
      `✓ ${path.relative(PROJECT_ROOT, file)} — ${replacementsHere} replacement(s) — route: ${route}`
    )
  }
}

console.log(`\n=== Summary ===`)
console.log(`Files changed: ${filesChanged}`)
console.log(`Total replacements: ${totalReplacements}`)
