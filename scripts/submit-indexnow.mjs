#!/usr/bin/env node

/**
 * Submit URLs to IndexNow API for faster indexing by Bing/Yandex.
 *
 * Usage:
 *   INDEXNOW_API_SECRET=your-secret node scripts/submit-indexnow.mjs
 *   INDEXNOW_API_SECRET=your-secret node scripts/submit-indexnow.mjs --dry-run
 *
 * Set INDEXNOW_API_SECRET in .env.local or pass as env var.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://cerebrumbiologyacademy.com'
const API_URL = `${SITE_URL}/api/seo/indexnow`

// Top priority pages to submit for reindexing
const TOP_PRIORITY_URLS = [
  // Tier 1: Core pages
  '/',
  '/courses',
  '/demo-booking',
  '/about',
  '/contact',
  '/results',
  '/success-stories',
  '/all-locations',
  '/board-exam-preparation',

  // Tier 2: Location hubs
  '/locations/south-extension',
  '/locations/rohini',
  '/locations/gurugram',
  '/locations/faridabad',
  '/locations/noida',
  '/locations/ghaziabad',
  '/locations/green-park',
  '/locations/delhi',

  // Tier 2: Best NEET coaching canonical pages
  '/best-neet-coaching',
  '/best-neet-coaching-faridabad',
  '/best-neet-coaching-ghaziabad',
  '/best-neet-coaching-gurugram',
  '/best-neet-coaching-greater-noida',
  '/best-neet-coaching-noida',
  '/best-neet-coaching-india',

  // Tier 2: Major city NEET coaching
  '/neet-coaching',
  '/neet-coaching-noida',
  '/neet-coaching-gurgaon',
  '/neet-coaching-faridabad',
  '/neet-coaching-ghaziabad',
  '/neet-coaching-south-delhi',

  // Tier 3: Biology tutor canonical pages
  '/biology-tutor',
  '/biology-tutor-noida',
  '/biology-tutor-ghaziabad',
  '/biology-tutor-faridabad',
  '/biology-tutor-south-delhi',
  '/biology-tutor-gurugram',
  '/biology-tutors-near-me',
]

const isDryRun = process.argv.includes('--dry-run')
const secret = process.env.INDEXNOW_API_SECRET

if (!secret && !isDryRun) {
  console.error('Error: INDEXNOW_API_SECRET environment variable is required')
  console.error('Set it in .env.local or pass as: INDEXNOW_API_SECRET=xxx node scripts/submit-indexnow.mjs')
  process.exit(1)
}

async function main() {
  console.log(`Submitting ${TOP_PRIORITY_URLS.length} URLs to IndexNow...`)
  console.log(`API: ${API_URL}`)
  console.log('')

  if (isDryRun) {
    console.log('DRY RUN — URLs that would be submitted:')
    TOP_PRIORITY_URLS.forEach((url) => console.log(`  ${SITE_URL}${url}`))
    console.log(`\nTotal: ${TOP_PRIORITY_URLS.length} URLs`)
    return
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({ urls: TOP_PRIORITY_URLS }),
    })

    const result = await response.json()

    if (response.ok) {
      console.log(`Submitted ${result.submitted} URLs successfully`)
      console.log('Results:', JSON.stringify(result.results, null, 2))
    } else {
      console.error('Error:', result.error)
      process.exit(1)
    }
  } catch (error) {
    console.error('Failed to submit:', error.message)
    process.exit(1)
  }
}

main()
