import { MetadataRoute } from 'next'
import { getAllPosts, blogCategories, getAllTags } from '@/lib/blog/mdx'
import { getAllSEOSlugs } from '@/data/seo-landing/slugs-static'
import { allChapters } from '@/data/campbell-biology'
import { campbellUnits } from '@/data/campbell-biology/units'
import { citySlugs as ibBiologyCitySlugs } from '@/data/ib-biology/cities'
import { aLevelCitySlugs } from '@/data/a-level/cities'
import { ibBiologySchoolSlugs } from '@/data/ib-biology/schools'
import { mcatMetroSlugs } from '@/data/mcat/metros'
import { datMetroSlugs } from '@/data/dat/metros'
import { BRAIN_BEE_CITIES } from '@/data/brain-bee/brainBeeCities'
import { IBO_COUNTRIES } from '@/data/ibo/iboCountries'
import { A_LEVEL_BOARDS } from '@/data/a-level/boards'
import { GLOBAL_EXAMS } from '@/data/global-exams/exams'
import { gamsatMetroSlugs } from '@/data/gamsat/metros'
import { usmleMetroSlugs } from '@/data/usmle-step-1/metros'
import { getAllLocationSlugs } from '@/lib/data/neet-coaching-locations'
import { detailedCourses } from '@/data/detailedCourses'
import { SUPPORTED_COUNTRIES } from '@/lib/international/countries'
import { nriCountriesList } from '@/data/nriCountries'
import { getAllLocalities } from '@/data/localities'
import { biologyDefinitions } from '@/data/biology-definitions'
// INDIAN_STATES import removed — state pages noindexed and excluded from sitemap
import { COMPETITORS } from '@/components/seo/ComparisonSchema'
import { facultyMembers } from '@/data/faculty'
// Area slug imports removed — area pages redirected to city hubs
import { successStoriesData } from '@/data/successStories'
import { mockTests } from '@/data/mockTests'
// localAreas import removed — [localSlug] pages now redirect to city hubs
import collegesData from '@/data/colleges.json'
import fs from 'fs'
import path from 'path'
import * as redirectModule from '@/config/seo-redirects.mjs'

// Collect EVERY exported redirect array dynamically so this filter can never
// go stale when a new array is added to seo-redirects.mjs (a hardcoded list
// here previously missed 7 of the 23 arrays next.config.mjs applies, putting
// ~50 redirecting URLs into the sitemap).
const seoRedirectSources = (Object.values(redirectModule) as unknown[])
  .filter((v): v is Array<{ source: string }> => Array.isArray(v))
  .flat()
  .map((r) => r.source)

// Also extract the inline redirect sources defined directly in
// next.config.mjs (blog-post redirects, /services, /locations/mumbai, ...).
// Reading the file at build time keeps the two in sync automatically.
function readNextConfigRedirectSources(): string[] {
  try {
    const text = fs.readFileSync(path.join(process.cwd(), 'next.config.mjs'), 'utf8')
    // Slice strictly to the redirects() body — headers() further down declares
    // catch-all sources like '/:path*' that would otherwise match every URL
    // and empty the whole sitemap.
    const start = text.indexOf('async redirects()')
    const end = text.indexOf('async headers()')
    if (start === -1 || end === -1 || end <= start) return []
    return Array.from(text.slice(start, end).matchAll(/source:\s*'([^']+)'/g)).map((m) => m[1])
  } catch {
    return []
  }
}

const allRedirectSources = [...seoRedirectSources, ...readNextConfigRedirectSources()]

const exactRedirects = new Set(allRedirectSources.filter((s) => !s.includes(':')))
// Convert path-to-regexp style wildcard sources to RegExps. The previous
// prefix-only logic assumed params always follow a '/', silently missing
// patterns like '/neet-coaching-fees-:slug' (dash-param) — which let 47
// redirecting fees URLs into the sitemap.
const wildcardRegexes = allRedirectSources
  .filter((s) => s.includes(':'))
  .map(
    (s) =>
      new RegExp(
        '^' +
          s
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .replace(/\\:[A-Za-z0-9_]+\\\*/g, '(?:.*)?')
            .replace(/:[A-Za-z0-9_]+\+/g, '.+')
            .replace(/:[A-Za-z0-9_]+\*/g, '.*')
            .replace(/:[A-Za-z0-9_]+/g, '[^/]+') +
          '$'
      )
  )

// A sitemap must only list URLs that return 200. For hand-maintained slug
// arrays that have drifted from the filesystem (batch-4 city loop emitted 3
// URLs with no page), verify the route directory actually exists at build.
function pageExists(slug: string): boolean {
  return fs.existsSync(path.join(process.cwd(), 'src', 'app', slug, 'page.tsx'))
}

// Inline redirect patterns from next.config.mjs that aren't in seo-redirects.mjs
const inlineRedirectPatterns: RegExp[] = [
  /^\/biology-tuition-gurgaon(\/|$)/,
  /^\/biology-tuition-south-delhi(\/|$)/,
  /^\/biology-topics\/[^/]+$/,
  /^\/biology-classes-gurgaon-sector-\d+$/,
  /^\/biology-classes-rohini-sector-\d+$/,
  /^\/biology-classes-noida-sector-\d+$/,
  /^\/biology-classes-laxmi-nagar(\/|$)/,
  /^\/biology-classes-manesar(\/|$)/,
  /^\/biology-classes-model-town(\/|$)/,
  /^\/biology-classes-preet-vihar(\/|$)/,
  /^\/neet-coaching-rohini-sector-\d+$/,
  /^\/neet-coaching-gurgaon-sector-(4[359]|49|51|56|61|82)$/,
  /^\/biology-tutor-pitampura$/,
  /^\/biology-tutor-laxmi-nagar$/,
  /^\/biology-tutor-delhi$/,
  /^\/biology-tutor-greater-noida$/,
  /^\/biology-tutor-gurgaon$/,
  /^\/biology-tutor-west-delhi$/,
  /^\/neet-biology-tutor-class-11$/,
  /^\/neet-biology-tutor-class-12$/,
  /^\/neet-biology-tutor-droppers$/,
  /^\/laxmi-nagar$/,
  /^\/demo$/,
  /^\/ai-education-demo$/,
  /^\/support\/demo$/,
  // Phase 2 GSC wildcards (2026-04-23) — metro [area] sub-pages,
  // locations/[city]/[locality], and school/metro-station sub-routes
  // are all 301'd to parent in next.config.mjs. Filter sitemap too.
  /^\/neet-coaching-south-delhi\/[^/]+$/,
  /^\/neet-coaching-north-delhi\/[^/]+$/,
  /^\/neet-coaching-east-delhi\/[^/]+$/,
  /^\/neet-coaching-west-delhi\/[^/]+$/,
  /^\/neet-coaching-noida\/[^/]+$/,
  /^\/neet-coaching-ghaziabad\/[^/]+$/,
  /^\/neet-coaching-faridabad\/[^/]+$/,
  /^\/neet-coaching-gurugram\/[^/]+$/,
  /^\/neet-coaching-near-metro\/[^/]+$/,
  /^\/neet-coaching-near\/[^/]+$/,
  /^\/locations\/[^/]+\/[^/]+$/,
]

// Doorway-consolidation Tier C (2026-06): the city-template intent pages
// (neet-dropper-batch-{city}, online-neet-coaching-{city}) are noindexed —
// they stay live for visitors but must not be submitted to Google
// ("Submitted URL marked noindex"). Hand-written family members that remain
// indexed are allowlisted here.
const NOINDEXED_FAMILY_ALLOWLIST = new Set([
  '/neet-dropper-batch-2025-26-gurugram',
  '/neet-dropper-batch-online',
  '/online-neet-coaching-faridabad',
  '/online-neet-coaching-ghaziabad',
  '/online-neet-coaching-greater-noida',
  '/online-neet-coaching-india',
  '/online-neet-coaching-pcb',
  // Priority dropper metros promoted back to index (2026-06): each now carries a
  // city-unique "local roadmap" body (real target colleges, feeder schools,
  // delivery areas) + 7 city-specific FAQs — well past the doorway-uniqueness bar.
  // Distinct major markets (different state-quota colleges). Expand this set as
  // GSC confirms healthy indexing of these first.
  '/neet-dropper-batch-mumbai',
  '/neet-dropper-batch-bangalore',
  '/neet-dropper-batch-hyderabad',
  '/neet-dropper-batch-pune',
  '/neet-dropper-batch-chennai',
  '/neet-dropper-batch-kolkata',
  '/neet-dropper-batch-kota',
])
const NOINDEXED_FAMILY_PATTERNS = [
  /^\/neet-dropper-batch-[a-z-]+$/,
  /^\/online-neet-coaching-[a-z-]+$/,
]

function isNoindexedDoorway(urlPath: string): boolean {
  if (NOINDEXED_FAMILY_ALLOWLIST.has(urlPath)) return false
  return NOINDEXED_FAMILY_PATTERNS.some((re) => re.test(urlPath))
}

function isRedirectedPath(urlPath: string): boolean {
  if (exactRedirects.has(urlPath)) return true
  if (wildcardRegexes.some((re) => re.test(urlPath))) return true
  return inlineRedirectPatterns.some((pattern) => pattern.test(urlPath))
}

/**
 * Normalize sitemap priorities based on URL patterns.
 * When everything is 0.85+, Google ignores priority entirely.
 * This applies a tiered system so Google knows what matters.
 */
function normalizePriority(path: string, currentPriority: number): number {
  // Tier 1 (1.0): Core conversion pages — keep as-is
  if (
    path === '/' ||
    path === '/courses' ||
    path === '/about' ||
    path === '/success-stories' ||
    path === '/results' ||
    path === '/contact' ||
    // RE-NEET 2026 reconduct article — time-sensitive top-of-funnel
    // lead magnet. Surface at priority 1.0 until the re-exam concludes.
    path === '/re-neet-2026' ||
    // Dedicated crash-course product landing page for the RE-NEET
    // window. Same priority tier as the news article above.
    path === '/re-neet-crash-course' ||
    // Master entity page — Dr. Shekhar C Singh all-vertical authority hub.
    // Citation target for AI grounding (Perplexity / ChatGPT / Claude /
    // Gemini), sameAs anchor, and the canonical "Best Biology Teacher
    // in India" entity page spanning NEET + IB + AP + CBSE + Olympiads.
    path === '/dr-shekhar-singh-biology-faculty-india'
  ) {
    return 1.0
  }

  // AP Biology hub + cornerstone content: highest priority within the
  // AP cluster. Hub `/ap-biology-tutor` is the canonical for the
  // entire cluster; cornerstone pages (FRQ rubric, score-5 guide,
  // anki deck, USABO past papers) carry the pedagogy authority.
  // The India-NRI hub also sits at 0.9 — top of its own funnel.
  if (
    path === '/ap-biology-tutor' ||
    path === '/ap-biology-online-tutor' ||
    path === '/ap-biology-frq-rubric-mastery' ||
    path === '/ap-biology-score-5-study-guide' ||
    path === '/ap-biology-anki-deck' ||
    path === '/usabo-past-papers-archive' ||
    path === '/ap-biology-vs-college-bio-mcat-bridge' ||
    path === '/ap-biology-tutor-india-for-us-college-admissions' ||
    // MCAT Biology hub — bio-only specialist wedge vs other generalist test-prep brands/Princeton.
    // Canonical entry point for the MCAT cluster.
    path === '/mcat-biology'
  ) {
    return 0.9
  }

  // AP Biology metro pages — `/ap-biology-tutor-{metro}`. Targets
  // "AP Biology tutor [city]" — high-intent queries (US + intl).
  if (
    path === '/ap-biology-tutor-new-york' ||
    path === '/ap-biology-tutor-bay-area' ||
    path === '/ap-biology-tutor-boston' ||
    path === '/ap-biology-tutor-northern-virginia-dc' ||
    path === '/ap-biology-tutor-chicago' ||
    path === '/ap-biology-tutor-los-angeles' ||
    path === '/ap-biology-tutor-houston-dallas' ||
    path === '/ap-biology-tutor-seattle' ||
    path === '/ap-biology-tutor-atlanta' ||
    path === '/ap-biology-tutor-new-jersey' ||
    path === '/ap-biology-tutor-dubai' ||
    path === '/ap-biology-tutor-abu-dhabi' ||
    path === '/ap-biology-tutor-mumbai' ||
    path === '/ap-biology-tutor-delhi-ncr' ||
    path === '/ap-biology-tutor-gurugram' ||
    path === '/ap-biology-tutor-noida' ||
    path === '/ap-biology-tutor-faridabad' ||
    path === '/ap-biology-tutor-ghaziabad' ||
    path === '/ap-biology-tutor-bangalore' ||
    path === '/ap-biology-tutor-hyderabad' ||
    path === '/ap-biology-tutor-vancouver' ||
    path === '/ap-biology-tutor-toronto-gta' ||
    path === '/ap-biology-tutor-brampton-mississauga' ||
    path === '/ap-biology-tutor-singapore' ||
    path === '/ap-biology-tutor-hong-kong'
  ) {
    return 0.8
  }

  // AP Biology per-school feeder pages — `/ap-biology-tutor-{school}`.
  // Long-tail "AP Biology tutor near {school}" intent.
  if (
    path === '/ap-biology-tutor-tjhsst' ||
    path === '/ap-biology-tutor-stuyvesant' ||
    path === '/ap-biology-tutor-bronx-science' ||
    path === '/ap-biology-tutor-harker' ||
    path === '/ap-biology-tutor-phillips-exeter' ||
    path === '/ap-biology-tutor-andover' ||
    path === '/ap-biology-tutor-mission-san-jose' ||
    path === '/ap-biology-tutor-gunn-palo-alto' ||
    path === '/ap-biology-tutor-walter-payton' ||
    path === '/ap-biology-tutor-hunter-college-hs' ||
    // IB Biology per-school feeder pages — same tier as AP schools.
    // Dynamically checked against ibBiologySchoolSlugs from schools.ts
    ibBiologySchoolSlugs.some((slug) => path === `/ib-biology-tutor-${slug}`)
  ) {
    return 0.7
  }

  // IB Biology pre-exam crash courses + TOK essay guide — high-intent
  // April-May search window for HL/SL; year-round for TOK essay help.
  if (
    path === '/ib-biology-hl-crash-course' ||
    path === '/ib-biology-sl-crash-course' ||
    path === '/ib-biology-tok-essay-guide'
  ) {
    return 0.85
  }

  // MCAT Biology — section-specific pages + cornerstone content
  // sit at 0.85 (high-intent biology-section specialist wedge).
  // City pages (NJ, Bay Area, Houston, Atlanta, Boston) sit at 0.8.
  if (
    path === '/mcat-biology-bb-section-prep' ||
    path === '/mcat-biochemistry-prep' ||
    path === '/mcat-biology-passage-strategy' ||
    path === '/aamc-content-outline-mapped-campbell-chapters' ||
    path === '/mcat-biology-high-yield-topics-2026' ||
    path === '/mcat-bb-passage-strategy-guide' ||
    path === '/mcat-biology-vs-neet-biology'
  ) {
    return 0.85
  }
  if (
    path === '/mcat-biology-tutor-new-jersey' ||
    path === '/mcat-biology-tutor-bay-area' ||
    path === '/mcat-biology-tutor-houston' ||
    path === '/mcat-biology-tutor-atlanta' ||
    path === '/mcat-biology-tutor-boston' ||
    mcatMetroSlugs.some((slug) => path === `/mcat-biology-tutor-${slug}`)
  ) {
    return 0.8
  }

  // DAT cluster (US/Canada pre-dental). Programme hub at 0.85,
  // city pages at 0.8. AEO hub /best-dat-biology-tutor handled at 0.92.
  if (
    path === '/dat-biology-preparation' ||
    path === '/dat-biology-organic-chem-prep' ||
    path === '/dat-perceptual-ability-biology'
  ) {
    return 0.85
  }
  if (
    path === '/dat-biology-tutor-new-jersey' ||
    path === '/dat-biology-tutor-bay-area' ||
    datMetroSlugs.some((slug) => path === `/dat-biology-tutor-${slug}`)
  ) {
    return 0.8
  }

  // GAMSAT cluster (UK / Ireland / Australia graduate medicine).
  // Programme hub at 0.85, specialty + city pages at 0.8.
  if (path === '/gamsat-section-3-biology-prep') {
    return 0.85
  }
  if (
    path === '/gamsat-section-3-study-guide' ||
    path === '/gamsat-score-breakdown-biology' ||
    path === '/gamsat-biology-topics-2026' ||
    path === '/gamsat-biology-tutor-london' ||
    path === '/gamsat-biology-tutor-sydney' ||
    gamsatMetroSlugs.some((slug) => path === `/gamsat-biology-tutor-${slug}`)
  ) {
    return 0.8
  }

  // USMLE Step 1 cluster (US medical licensing + IMG ECFMG).
  // Programme hub + section pages at 0.85; AEO hub at 0.92 (handled
  // in the canonical-service-hubs block). First Aid walkthrough is
  // cornerstone authority content.
  if (
    path === '/usmle-step-1-biology-preparation' ||
    path === '/usmle-step-1-biochemistry-prep' ||
    path === '/usmle-step-1-microbiology-immunology-prep' ||
    path === '/usmle-step-1-physiology-prep' ||
    path === '/first-aid-step-1-biology-tutor'
  ) {
    return 0.85
  }

  // India biology olympiad — hubs at 0.9 (NSEB / INBO are highest-tier
  // national-pathway content), cornerstone content at 0.85, per-school
  // pages at 0.7 matching the AP / IB school tier.
  if (path === '/nseb-coaching' || path === '/inbo-coaching') {
    return 0.9
  }
  if (
    path === '/ocsc-orientation-cum-selection-camp-prep' ||
    path === '/india-ibo-team-selection-guide'
  ) {
    return 0.85
  }
  if (
    path === '/biology-olympiad-tutor-dps-rk-puram' ||
    path === '/biology-olympiad-tutor-modern-school-barakhamba' ||
    path === '/biology-olympiad-tutor-sanskriti-school-delhi' ||
    path === '/biology-olympiad-tutor-vasant-valley-school' ||
    path === '/biology-olympiad-tutor-mothers-international-school' ||
    path === '/biology-olympiad-tutor-sardar-patel-vidyalaya' ||
    path === '/biology-olympiad-tutor-pathways-world-school-aravali' ||
    path === '/biology-olympiad-tutor-shri-ram-school-aravali' ||
    path === '/biology-olympiad-tutor-heritage-xperiential-learning-school' ||
    path === '/biology-olympiad-tutor-dais-mumbai-olympiad' ||
    path === '/biology-olympiad-tutor-cathedral-school-mumbai-olympiad' ||
    path === '/biology-olympiad-tutor-asb-mumbai-olympiad' ||
    path === '/biology-olympiad-tutor-stonehill-bangalore-olympiad' ||
    path === '/biology-olympiad-tutor-inventure-bangalore-olympiad' ||
    path === '/biology-olympiad-tutor-nps-bangalore-olympiad'
  ) {
    return 0.7
  }

  // ============================================================
  // P2-1 recalibration (May 2026)
  // Lifted commercial-intent clusters above template/data tiers so
  // Google crawl budget favours conversion pages over thin variants.
  // ============================================================

  // Tier 1.5 (0.95): RE-NEET 2026 time-sensitive cluster + canonical
  // "best biology teacher India" hub + best-coaching-for-re-neet-2026.
  // Should crawl daily during the May–July reconduct window.
  if (
    path === '/best-biology-teacher-india' ||
    path === '/best-coaching-for-re-neet-2026' ||
    path === '/re-neet-2026-biology-crash-course' ||
    path === '/re-neet-2026-syllabus-difficulty' ||
    path === '/what-to-do-after-neet-2026-cancellation' ||
    path === '/re-neet-2026-online-coaching' ||
    path === '/re-neet-2026-droppers' ||
    path === '/re-neet-2026-cerebrum-vs-aakash-vs-pw' ||
    path.startsWith('/re-neet-2026-')
  ) {
    return 0.95
  }

  // Tier 1.7 (0.92): Canonical service hubs for high-intent queries
  // (Best X tutor / coach pages — top-of-funnel commercial intent).
  if (
    path === '/best-ib-biology-tutor' ||
    path === '/best-ap-biology-tutor-usa' ||
    path === '/best-mcat-biology-tutor' ||
    path === '/best-dat-biology-tutor' ||
    path === '/best-gamsat-biology-tutor' ||
    path === '/best-usmle-step-1-biology-tutor' ||
    path === '/best-neet-biology-tutor' ||
    path === '/best-neet-biology-tutor-class-11' ||
    path === '/best-neet-biology-tutor-class-12' ||
    path === '/best-neet-foundation-tutor' ||
    path === '/best-neet-foundation-class-9' ||
    path === '/best-neet-foundation-class-10' ||
    path === '/best-usabo-coach' ||
    path === '/best-inbo-coach' ||
    path === '/best-ibo-preparation' ||
    path === '/best-cbo-coach' ||
    path === '/best-bbo-coach' ||
    path === '/best-neet-coaching-near-me' ||
    path === '/neet-biology-tutor-near-me' ||
    path === '/1-on-1-neet-biology-tutor' ||
    path === '/biology-tutor-for-neet' ||
    path === '/biology-classes-for-neet' ||
    path === '/best-biology-classes-for-neet' ||
    path === '/best-biology-teacher-for-neet' ||
    path === '/best-neet-biology-coaching-india' ||
    path === '/neet-coaching-delhi'
  ) {
    return 0.92
  }

  // Tier 1.8 (0.88): NRI country hubs (12 countries) + strategic
  // NRI documentation pages. Lower volume but high commercial intent.
  // Previously underranked at 0.7 — recalibrated up.
  if (
    path === '/neet-coaching-nri-usa' ||
    path === '/neet-coaching-nri-uae' ||
    path === '/neet-coaching-nri-canada' ||
    path === '/neet-coaching-nri-uk' ||
    path === '/neet-coaching-nri-australia' ||
    path === '/neet-coaching-nri-saudi-arabia' ||
    path === '/neet-coaching-nri-singapore' ||
    path === '/neet-coaching-nri-qatar' ||
    path === '/neet-coaching-nri-oman' ||
    path === '/neet-coaching-nri-kuwait' ||
    path === '/neet-coaching-nri-bahrain' ||
    path === '/neet-coaching-nri-malaysia' ||
    path === '/neet-coaching-nri-nepal' ||
    path === '/nri-quota-mbbs' ||
    path === '/neet-exam-centres-abroad' ||
    path === '/cbse-students-abroad-neet' ||
    path === '/nri-neet-fees-documents' ||
    path === '/neet-coaching-bay-area-usa' ||
    path === '/neet-coaching-perth-australia'
  ) {
    return 0.88
  }

  // Tier 1.9 (0.85): Competitor comparison pages — high-conversion
  // mid-funnel content with strong informational + commercial intent.
  if (
    path === '/cerebrum-vs-allen-neet-coaching' ||
    path === '/cerebrum-vs-aakash-neet-coaching' ||
    path === '/cerebrum-vs-physicswallah' ||
    path === '/cerebrum-vs-vedantu' ||
    path === '/cerebrum-vs-career-point'
  ) {
    return 0.85
  }

  // Tier 1.95 (0.8): Delhi NCR feeder-school pages (15 schools).
  // Long-tail school-name intent ("biology coaching for [school]")
  // recalibrated from 0.5 (sitemap-default for path pattern) up to 0.8
  // since these are the mid-funnel pages that capture parent search
  // and Aakash and Allen currently dominate.
  if (
    path === '/neet-coaching-dps-rk-puram-delhi' ||
    path === '/neet-coaching-sanskriti-school-delhi' ||
    path === '/neet-coaching-modern-school-barakhamba-delhi' ||
    path === '/neet-coaching-springdales-school-delhi' ||
    path === '/neet-coaching-mothers-international-delhi' ||
    path === '/neet-coaching-gd-goenka-gurugram' ||
    path === '/neet-coaching-suncity-school-gurugram' ||
    path === '/neet-coaching-shriram-school-aravali-gurugram' ||
    path === '/neet-coaching-pathways-world-aravali-gurugram' ||
    path === '/neet-coaching-dps-noida' ||
    path === '/neet-coaching-cambridge-international-noida' ||
    path === '/neet-coaching-amity-international-noida' ||
    path === '/neet-coaching-apeejay-school-faridabad' ||
    path === '/neet-coaching-delhi-public-school-faridabad' ||
    path === '/neet-coaching-dps-ghaziabad' ||
    // P2-3 May 2026 — 5 additional Delhi NCR feeder-school pages
    path === '/neet-coaching-dps-mathura-road-delhi' ||
    path === '/neet-coaching-tagore-international-delhi' ||
    path === '/neet-coaching-heritage-xperiential-gurugram' ||
    path === '/neet-coaching-dps-sector-45-gurugram' ||
    path === '/neet-coaching-lotus-valley-international-noida'
  ) {
    return 0.8
  }

  // Tier 2 (0.8): High-intent landing pages
  if (
    path.startsWith('/locations/') ||
    path.startsWith('/best-neet-coaching') ||
    path === '/neet-coaching' ||
    path === '/neet-coaching-noida' ||
    path === '/neet-coaching-gurugram' ||
    path === '/neet-coaching-faridabad' ||
    path === '/neet-coaching-ghaziabad' ||
    path === '/all-locations' ||
    path === '/board-exam-preparation'
  ) {
    return 0.8
  }

  // Tier 2.5 (0.7): Courses, blog, important content
  if (
    path.startsWith('/courses/') ||
    path.startsWith('/blog') ||
    path.startsWith('/compare/') ||
    path.startsWith('/neet-') ||
    path.startsWith('/online-neet-') ||
    path.startsWith('/biology-notes')
  ) {
    return Math.min(currentPriority, 0.7)
  }

  // Tier 3 (0.6): Local SEO pages with unique content (previously 0.5;
  // recalibrated up because these have meaningful per-city differentiation
  // and shouldn't compete with template Tier 4 pages for crawl budget).
  if (
    path.startsWith('/neet-coaching-') ||
    path.startsWith('/biology-tutor-') ||
    path.startsWith('/biology-tuition-')
  ) {
    return 0.6
  }

  // Tier 4 (0.4): Template/data-driven local pages
  if (
    path.startsWith('/biology-classes-') ||
    path.startsWith('/biology-coaching-') ||
    path.startsWith('/best-biology-tuition-')
  ) {
    return 0.4
  }

  // Tier 5 (0.3): Low-value supplementary pages
  if (
    path.startsWith('/states/') ||
    path.startsWith('/neet-college-predictor/') ||
    path.startsWith('/biology-definitions/')
  ) {
    return 0.3
  }

  // Everything else: cap at 0.6 to prevent inflation
  return Math.min(currentPriority, 0.6)
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Use non-www URL to match middleware redirect behavior
  const baseUrl = 'https://cerebrumbiologyacademy.com'
  // Use a stable date for static pages so Google can distinguish actual content updates
  // from mere redeployments. Update this date when site content meaningfully changes.
  // 2026-06-08: massive SEO refresh — ~895 Twitter cards, ~100 openGraph locales,
  // 47 NRI international city pages, 14 hreflang additions, 16 noindex cleanups,
  // ~30 layout enrichments, 9 React-redirects → 301s.
  const lastUpdated = new Date('2026-06-08')

  // Dynamically generate blog post URLs from MDX files
  const blogPosts = getAllPosts()
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  // Dynamically generate SEO landing page URLs
  const seoSlugs = getAllSEOSlugs()
  const seoLandingRoutes: MetadataRoute.Sitemap = seoSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    // RE-NEET 2026 — time-sensitive article + crash-course lead magnet.
    // Updated daily until the official re-exam date is notified by NTA.
    // Priority 1.0 + daily change frequency to maximise crawl frequency
    // during the news window.
    {
      url: `${baseUrl}/re-neet-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    // RE-NEET 2026 Crash Course — dedicated product landing page with
    // concrete pricing (₹14,500 / ₹24,500 / ₹49,500 across 3 tiers),
    // Course schema with hasCourseInstance per tier, and conversion
    // funnel separate from the news article above. Paid-ads landing
    // surface during the news window.
    {
      url: `${baseUrl}/re-neet-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    // REMOVED: /ai-education-demo — blocked by middleware in production (302 → /)
    {
      url: `${baseUrl}/courses`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/enrollment`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-neet-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-coaching-fees`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/online-neet-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/biology-notes-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-previous-year-questions`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mock-tests`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/free-resources`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/school-career-seminar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faculty`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/hi`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/ta`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    // Blog posts are dynamically generated above
    ...blogRoutes,
    // SEO landing pages for keyword targeting
    ...seoLandingRoutes,
    {
      url: `${baseUrl}/gallery`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/results`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/all-locations`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/board-exam-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/success-stories`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Free Resources & Lead Gen Pages
    {
      url: `${baseUrl}/free-neet-biology-lectures`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/biology-definitions`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/online-neet-test-series`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-tips-strategy`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    {
      url: `${baseUrl}/neet-preparation-timetable`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    },
    // Class-wise Tuition & NEET Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/class-11-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-12-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-coaching-delhi-ncr`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/neet-coaching-west-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-south-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Delhi NCR Physical Centers - High Priority Local SEO
    {
      url: `${baseUrl}/locations/south-extension`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/locations/green-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Areas We Serve - Secondary pages
    {
      url: `${baseUrl}/locations/delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations/south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Premium Areas - High ROI Location Pages
    {
      url: `${baseUrl}/locations/greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/defence-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/gulmohar-park`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/new-friends-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/panchsheel`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Phase 2 Premium Areas
    {
      url: `${baseUrl}/locations/saket`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/jor-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/sundar-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Phase 3 Premium Areas - Ultra-Premium & High Volume
    {
      url: `${baseUrl}/locations/golf-links`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/shanti-niketan`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/anand-niketan`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Phase 4 Premium Areas - P2 Expansion
    {
      url: `${baseUrl}/locations/maharani-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/neeti-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/westend`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/locations/safdarjung-enclave`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Comparison Pages - AEO/GEO Optimized
    {
      url: `${baseUrl}/compare/neet-coaching-comparison`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/class-9-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-10-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/early-neet-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-foundation-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dropper`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // ===== /programs/biology-olympiad — international-school programme + 27 country pages =====
    {
      url: `${baseUrl}/programs/biology-olympiad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    ...[
      'usa',
      'uk',
      'uae',
      'singapore',
      'canada',
      'australia',
      'saudi-arabia',
      'qatar',
      'oman',
      'bahrain',
      'kuwait',
      'malaysia',
      'thailand',
      'philippines',
      'indonesia',
      'vietnam',
      'south-africa',
      'nigeria',
      'kenya',
      'new-zealand',
      'germany',
      'netherlands',
      'hong-kong',
      'mauritius',
      'nepal',
      'bangladesh',
      'sri-lanka',
    ].map((slug) => ({
      url: `${baseUrl}/programs/biology-olympiad/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85 as const,
    })),
    {
      url: `${baseUrl}/neet-repeaters`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/study-materials`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/video-lectures`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/compare/kota-vs-online`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare/class-9-vs-class-10-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // NEET Year-specific Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-2027-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.98,
    },
    // NEET 2027 SEO Pages - HIGH TRAFFIC KEYWORDS
    {
      url: `${baseUrl}/neet-2026-exam-date`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.98,
    },
    {
      url: `${baseUrl}/neet-2026-cutoff`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/neet-biology-syllabus-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.96,
    },
    // NEET Free Tools - HIGH ENGAGEMENT
    {
      url: `${baseUrl}/neet-rank-predictor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/neet-college-predictor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/neet-biology-mcq`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.96,
    },
    // MCQ Landing Pages - Class 11, Class 12, Olympiad
    {
      url: `${baseUrl}/class-11-biology-mcq`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/class-12-biology-mcq`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/biology-olympiad-mcq`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // NEET Biology MCQ Topic Pages - HIGH ENGAGEMENT
    {
      url: `${baseUrl}/neet-biology-mcq/ecology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/genetics-evolution`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/human-physiology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/reproduction`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/daily-challenge`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/leaderboard`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    // Regional Online Service Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-north-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-south-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-east-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-west-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-overseas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // NEET Coaching SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/best-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-centre`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-institute`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-biology-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Pan-India SEO Landing Pages - High Priority
    {
      url: `${baseUrl}/online-neet-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-neet-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-biology-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/online-medical-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Delhi NCR Key Localities - High Priority
    // Gurugram Canonical Pages
    {
      url: `${baseUrl}/neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-fee-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // E-E-A-T Authority Pages
    // Master entity page (all verticals: NEET + IB + AP + CBSE + Olympiads)
    // Priority 1.0 enforced by normalizePriority — this is the citation target
    // for LLM grounding and the sameAs anchor across all schemas.
    {
      url: `${baseUrl}/dr-shekhar-singh-biology-faculty-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // 2026 Top Biology Faculty list — ItemList schema with Dr. Shekhar
    // at position 1. AEO surface for "best/top biology teacher India" queries.
    {
      url: `${baseUrl}/top-biology-faculty-india-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // Awards & Credentials — EducationalOccupationalCredential + Award schema
    // with verified outcomes. AI grounding for "qualifications of Dr. Shekhar".
    {
      url: `${baseUrl}/dr-shekhar-singh-awards-credentials`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dr-shekhar-singh-neet-biology-faculty`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/media-mentions-press-coverage`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // NEW Premium Gurugram Localities (Based on Market Research)
    // Phase 3 Gurugram Localities - Ultra Premium & Dwarka Expressway
    {
      url: `${baseUrl}/course-finder`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    // Noida SEO Landing Pages - HIGH PRIORITY (area sub-pages now dynamic)
    {
      url: `${baseUrl}/neet-coaching-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Noida + Greater Noida satellite pages (49 — audit fix May 2026)
    ...[
      'best-neet-coaching-noida',
      'best-neet-coaching-greater-noida',
      'neet-coaching-fee-noida',
      'neet-coaching-fees-greater-noida',
      'neet-coaching-near-me-noida',
      'neet-coaching-near-me-greater-noida',
      'neet-test-series-noida',
      'neet-test-series-greater-noida',
      'neet-crash-course-noida',
      'neet-crash-course-greater-noida',
      'neet-dropper-batch-noida',
      'neet-dropper-batch-greater-noida',
      'neet-foundation-class-9-noida',
      'neet-foundation-class-9-greater-noida',
      'neet-foundation-class-10-noida',
      'neet-foundation-class-10-greater-noida',
      'neet-evening-batch-noida',
      'neet-weekend-batch-noida',
      'neet-scholarship-noida',
      'neet-scholarship-greater-noida',
      '1-year-neet-course-noida',
      '2-year-neet-course-noida',
      'allen-alternative-noida',
      'aakash-alternative-noida',
      'aakash-alternative-greater-noida',
      'complement-allen-coaching-noida',
      'complement-aakash-coaching-noida',
      'fiitjee-alternative-noida',
      'narayana-alternative-noida',
      'physics-wallah-alternative-noida',
      'which-is-better-aakash-or-allen-noida',
      'neet-coaching-noida-vs-kota',
      'is-coaching-necessary-for-neet-noida',
      'how-to-prepare-neet-noida',
      'free-neet-demo-class-noida',
      'free-neet-demo-class-greater-noida',
      'online-neet-coaching-greater-noida',
      'online-neet-classes-noida',
      'online-biology-tuition-noida',
      'parents-guide-neet-coaching-noida',
      'best-biology-tutor-noida',
      'biology-tuition-noida',
      'biology-tutor-noida-sector-18',
      'home-biology-tutor-noida',
      'biology-class-11-noida',
      'biology-class-12-noida',
      'cbse-biology-coaching-noida',
      'ncert-biology-coaching-noida',
      'class-12-board-biology-noida',
      'neet-toppers-noida',
      'neet-coaching-ats-pristine-noida',
      'neet-coaching-jaypee-greens-noida',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // Biology Topics Hub - sub-pages redirect via /biology-topics/:topic pattern
    {
      url: `${baseUrl}/biology-topics`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // REMOVED: /biology-topics/{biotechnology,cell-biology,ecology-environment,genetics-evolution,human-physiology,plant-physiology}
    // — these redirect to /biology-topics via next.config.mjs wildcard
    // Ghaziabad SEO Landing Pages (area sub-pages now dynamic)
    {
      url: `${baseUrl}/neet-coaching-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Ghaziabad satellite pages (17 — audit fix May 2026)
    ...[
      'best-neet-coaching-ghaziabad',
      'neet-coaching-fees-ghaziabad',
      'neet-coaching-near-me-ghaziabad',
      'neet-test-series-ghaziabad',
      'neet-crash-course-ghaziabad',
      'neet-dropper-batch-ghaziabad',
      'neet-foundation-class-9-ghaziabad',
      'neet-foundation-class-10-ghaziabad',
      'neet-evening-batch-ghaziabad',
      'neet-weekend-batch-ghaziabad',
      'neet-scholarship-ghaziabad',
      '1-year-neet-course-ghaziabad',
      '2-year-neet-course-ghaziabad',
      'aakash-alternative-ghaziabad',
      'allen-alternative-ghaziabad',
      'free-neet-demo-class-ghaziabad',
      'online-neet-coaching-ghaziabad',
      'is-coaching-necessary-for-neet-ghaziabad',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Faridabad SEO Landing Pages (area sub-pages now dynamic)
    {
      url: `${baseUrl}/neet-coaching-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Faridabad satellite pages (32 — audit fix May 2026)
    ...[
      'best-neet-coaching-faridabad',
      'neet-coaching-fees-faridabad',
      'neet-coaching-near-me-faridabad',
      'neet-test-series-faridabad',
      'neet-crash-course-faridabad',
      'neet-dropper-batch-faridabad',
      'neet-foundation-class-9-faridabad',
      'neet-foundation-class-10-faridabad',
      'neet-evening-batch-faridabad',
      'neet-weekend-batch-faridabad',
      'neet-revision-batch-faridabad',
      'neet-scholarship-faridabad',
      '1-year-neet-course-faridabad',
      '2-year-neet-course-faridabad',
      'allen-alternative-faridabad',
      'aakash-alternative-faridabad',
      'complement-allen-coaching-faridabad',
      'complement-aakash-coaching-faridabad',
      'fiitjee-alternative-faridabad',
      'narayana-alternative-faridabad',
      'physics-wallah-alternative-faridabad',
      'velocity-alternative-faridabad',
      'yvs-alternative-faridabad',
      'which-is-better-aakash-or-allen-faridabad',
      'how-much-fees-for-neet-coaching-faridabad',
      'is-coaching-necessary-for-neet-faridabad',
      'free-neet-demo-class-faridabad',
      'online-neet-coaching-faridabad',
      'online-neet-classes-faridabad',
      'parents-guide-neet-coaching-faridabad',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Biology Tuition & Coaching Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/biology-tuition-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-tuition-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-coaching-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-coaching-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-tuition-class-9-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Delhi NCR Standalone Location Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Tier-2 Delhi locality pages — closes coverage gap on major
    // catchments that previously had zero or 1 generic landing page.
    {
      url: `${baseUrl}/neet-coaching-dwarka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-karol-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-connaught-place`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-cr-park-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-defence-colony-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-green-park-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-saket-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-vasant-kunj-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/biology-coaching-vasant-vihar-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // South Delhi SEO Landing Pages - HIGH PRIORITY
    {
      url: `${baseUrl}/neet-coaching-south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Government Officer Colonies - South Delhi
    // Ultra-Premium Lutyens Delhi
    // Student Hub Areas
    // Premium Residential Areas
    // Central Delhi Coaching Hubs
    // Near School SEO Pages - HIGH INTENT
    {
      url: `${baseUrl}/neet-coaching-near`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // REMOVED: /biology-tuition-south-delhi + 16 area sub-pages
    // — no page.tsx exists, added redirect /biology-tuition-south-delhi/:area* → /biology-tutor-south-delhi
    // Biology Tutor SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutors-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-home-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-11-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-12-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-11-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-12-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-state-boards`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Biology Teacher SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/biology-teacher`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-teacher-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-ib-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/best-ap-biology-tutor-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/best-mcat-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/best-usabo-coach`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-inbo-coach`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-ibo-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...IBO_COUNTRIES.map((c) => ({
      url: `${baseUrl}/ibo-coaching-${c.slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.82,
    })),
    {
      url: `${baseUrl}/brain-bee-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...BRAIN_BEE_CITIES.map((c) => ({
      url: `${baseUrl}/brain-bee-coaching/${c.slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.78,
    })),
    {
      url: `${baseUrl}/biology-tutor-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-classes-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-biology-classes-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-neet-coaching-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-biology-tutor-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/1-on-1-neet-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/neet-biology-video-lectures`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/cerebrum-vs-physicswallah`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cerebrum-vs-vedantu`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cerebrum-vs-career-point`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Phase 3 MCAT + AP comparison pages (4)
    {
      url: `${baseUrl}/cerebrum-vs-kaplan-mcat`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cerebrum-vs-princeton-review-mcat`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cerebrum-vs-blueprint-mcat`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cerebrum-vs-khan-academy-ap-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-uae`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/neet-coaching-bay-area-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/neet-coaching-perth-australia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nri-quota-mbbs`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-exam-centres-abroad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/cbse-students-abroad-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/nri-neet-fees-documents`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // CBO Canadian Biology Olympiad hub (P0 May 2026)
    {
      url: `${baseUrl}/best-cbo-coach`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // BBO British Biology Olympiad hub (P1 May 2026)
    {
      url: `${baseUrl}/best-bbo-coach`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // Online NEET coaching city pages (P1-1 May 2026)
    {
      url: `${baseUrl}/online-neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/online-neet-coaching-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/online-neet-coaching-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/online-neet-coaching-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/online-neet-coaching-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/online-neet-coaching-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // Delhi NCR canonical hub (P0 fix May 2026)
    {
      url: `${baseUrl}/neet-coaching-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.97,
    },
    // Delhi NCR feeder-school landing pages (P1.7 — May 2026)
    {
      url: `${baseUrl}/neet-coaching-gd-goenka-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-suncity-school-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-shriram-school-aravali-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-pathways-world-aravali-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // P2-3 May 2026: 5 additional Delhi NCR feeder-school pages
    {
      url: `${baseUrl}/neet-coaching-heritage-xperiential-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-dps-sector-45-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // RE-NEET 2026 cluster (high-priority time-sensitive May 2026)
    {
      url: `${baseUrl}/best-coaching-for-re-neet-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/re-neet-2026-syllabus-difficulty`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/what-to-do-after-neet-2026-cancellation`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/re-neet-2026-online-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/re-neet-2026-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/re-neet-2026-biology-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/re-neet-2026-cerebrum-vs-aakash-vs-pw`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/re-neet-2026-kota`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/re-neet-2026-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/re-neet-2026-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'daily' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/best-biology-teacher-class-11-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-class-12-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-class-11-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-teacher-class-12-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Biology Classes SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/biology-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-classes-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/home-tuition-for-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tuition-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tuition-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-neet-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/pcb-tuition-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tuition-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Zoology Teacher SEO Pages
    {
      url: `${baseUrl}/zoology-teacher`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/zoology-teacher-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-zoology-teacher-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/zoology-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Botany Teacher SEO Pages
    {
      url: `${baseUrl}/botany-teacher`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/botany-teacher-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-botany-teacher-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/botany-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Online NEET Coaching SEO Pages
    {
      url: `${baseUrl}/online-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-online-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-online-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Online Biology SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/online-biology-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-biology-teacher-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-online-biology-teacher-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-tutor-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Online Biology Tutor Pages - Phase 1 SEO Enhancement
    {
      url: `${baseUrl}/online-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/online-biology-tutor-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/online-biology-tutor-class-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/online-biology-tutor-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/online-biology-tutor-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/online-biology-tutor-worldwide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    ...[
      'biology-homework-help',
      'find-biology-tutor',
      'affordable-biology-tutor-online',
      'cbse-biology-coaching',
      'icse-biology-coaching',
      'mentorship-program',
      'test-series',
      'cambridge-biology-tutor',
      'gujarat-biology-tuition',
      'rajasthan-biology-tuition',
      'west-bengal-biology-tuition',
      'bihar-biology-tuition',
      'uttar-pradesh-biology-tuition',
      'madhya-pradesh-biology-tuition',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/online-biology-tutor-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/online-biology-tutor-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/neet-biology-tutor-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // NEET Biology Tutor Pages - Phase 1 SEO Enhancement
    // Delhi NCR Biology Tutor Locality Pages - Phase 2 SEO Enhancement
    {
      url: `${baseUrl}/biology-tutor-east-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-north-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-south-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/biology-tutor-dwarka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/biology-tutor-rohini`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    {
      url: `${baseUrl}/biology-tutor-janakpuri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91,
    },
    // Noida Biology Tutor Locality Pages - Phase 2 SEO Enhancement
    {
      url: `${baseUrl}/biology-tutor-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-noida-sector-62`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // Ghaziabad Biology Tutor Locality Pages - Phase 2 SEO Enhancement
    {
      url: `${baseUrl}/biology-tutor-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-indirapuram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/biology-tutor-vaishali`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // Faridabad & Haryana Biology Tutor Locality Pages - Phase 2 SEO Enhancement
    {
      url: `${baseUrl}/biology-tutor-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-ballabhgarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/biology-tutor-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Class 9 Biology SEO Pages
    {
      url: `${baseUrl}/biology-tutor-class-9-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // Class 10 Biology SEO Pages
    {
      url: `${baseUrl}/biology-tutor-class-10-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-tutor-class-9-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/class-9-science-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // NEET Foundation SEO Pages
    {
      url: `${baseUrl}/neet-foundation-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/pre-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // NTSE Preparation SEO Pages
    {
      url: `${baseUrl}/ntse-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/ntse-online-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // Olympiad Preparation SEO Pages
    {
      url: `${baseUrl}/biology-olympiads`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-olympiad-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/olympiad-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // ===== USABO city/region pages (Apr 2026) =====
    {
      url: `${baseUrl}/usabo-coaching-northern-virginia-dc`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/usabo-coaching-bay-area`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/usabo-coaching-new-york`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/usabo-coaching-boston`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/usabo-coaching-houston`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // Phase 3 USABO cities
    {
      url: `${baseUrl}/usabo-coaching-los-angeles`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-new-jersey`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-chicago`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-seattle`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-dallas-austin`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-atlanta`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    // Phase 6 USABO gap-fill (3)
    {
      url: `${baseUrl}/usabo-coaching-philadelphia`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-miami`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-portland`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-san-diego`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-denver`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-phoenix`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-twin-cities`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/usabo-coaching-research-triangle`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    // ===== USABO content cluster (Apr 2026) =====
    {
      url: `${baseUrl}/ap-biology-vs-usabo`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // ===== Cross-vertical comparison pages (May 2026) =====
    {
      url: `${baseUrl}/ap-biology-vs-ib-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/a-level-biology-vs-igcse-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gamsat-vs-mcat-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dat-vs-mcat-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/bbo-vs-usabo-biology-olympiad`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usabo-6-month-prep-plan`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usabo-2026-results`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usabo-past-papers`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usabo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/bbo-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/inbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/ibo-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    {
      url: `${baseUrl}/cbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/cbo-coaching-toronto`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/cbo-coaching-vancouver`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/asob-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/sbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/cnbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/kbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/jbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // Olympiad — NSEB national hub
    {
      url: `${baseUrl}/nseb-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // India biology olympiad cornerstone content — OCSC (Stage 3) and
    // the full NSEB→INBO→OCSC→IBO funnel narrative. Authority pages
    // with Article schema + Dr. Shekhar author byline.
    {
      url: `${baseUrl}/ocsc-orientation-cum-selection-camp-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/india-ibo-team-selection-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // India olympiad per-school feeder pages — "Biology Olympiad tutor
    // {School}" long-tail intent. Schools span Delhi NCR (DPS RK Puram,
    // Modern School, Sanskriti, Vasant Valley, Mother's International,
    // Sardar Patel Vidyalaya, Pathways Aravali, Shri Ram Aravali,
    // Heritage Xperiential), Mumbai (DAIS, Cathedral, ASB), Bangalore
    // (Stonehill, Inventure, NPS). Distinct slug namespace from
    // /ib-biology-tutor-* and /ap-biology-tutor-* to prevent cluster
    // collision.
    {
      url: `${baseUrl}/biology-olympiad-tutor-dps-rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-modern-school-barakhamba`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-sanskriti-school-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-vasant-valley-school`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-mothers-international-school`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-sardar-patel-vidyalaya`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-pathways-world-school-aravali`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-shri-ram-school-aravali`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-heritage-xperiential-learning-school`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-dais-mumbai-olympiad`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-cathedral-school-mumbai-olympiad`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-asb-mumbai-olympiad`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-stonehill-bangalore-olympiad`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-inventure-bangalore-olympiad`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-nps-bangalore-olympiad`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Class 11 Biology — cross-board hub + AP Class 11 feeder
    {
      url: `${baseUrl}/class-11-biology-by-curriculum`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/ap-biology-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Olympiad — cross-curriculum transition / parallel-prep guides
    {
      url: `${baseUrl}/cbse-to-olympiad-transition`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/ib-biology-olympiad-parallel-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.86,
    },
    // Olympiad — country dynamic pages (English-speaking markets)
    // Olympiad — India city pages (metro cluster)
    // Olympiad — India regional (Gurugram cluster)
    {
      url: `${baseUrl}/nseb-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/biology-olympiad-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/ibo-preparation-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // NCERT Biology Books SEO Pages - High Traffic Keywords
    {
      url: `${baseUrl}/ncert-biology-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ncert-biology-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ncert-fingertips-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/trueman-biology-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/best-biology-books-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // International Curriculum Biology SEO Pages
    {
      url: `${baseUrl}/igcse-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/ap-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // AP Biology US metro pages — built from APBiologyCityTemplate +
    // src/data/ap-biology/metros.ts. Priority 0.8 via normalizePriority.
    {
      url: `${baseUrl}/ap-biology-tutor-new-york`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-bay-area`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // AP metro expansion (Jun 2026, Phase 5) — MCAT metros auto-include via mcatMetroSlugs
    ...[
      'ap-biology-tutor-philadelphia',
      'ap-biology-tutor-long-island',
      'ap-biology-tutor-connecticut',
      'ap-biology-tutor-columbus',
      'ap-biology-tutor-ann-arbor',
      'ap-biology-tutor-nashville',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/ap-biology-tutor-boston`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-northern-virginia-dc`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-chicago`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-los-angeles`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-houston-dallas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-seattle`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-atlanta`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-new-jersey`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Phase 3 AP gap-fill metros (6)
    {
      url: `${baseUrl}/ap-biology-tutor-miami`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-phoenix`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-san-diego`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-denver`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-austin`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-portland`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-twin-cities`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-research-triangle`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // AP Biology international metros — UAE + India. Targets non-US
    // AP-Biology demand (GEMS DAA, ASB, AES Delhi, Pathways, Oakridge,
    // CHIREC, etc.). Schemas pass en-AE / en-IN inLanguage so Google
    // attributes regional traffic correctly.
    {
      url: `${baseUrl}/ap-biology-tutor-dubai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-abu-dhabi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-delhi-ncr`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-faridabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // India NRI hub: "AP Biology for Indian Students Applying to US
    // Colleges" — top-of-funnel page for the India NRI audience that
    // routes into the 4 city metros above.
    {
      url: `${baseUrl}/ap-biology-tutor-india-for-us-college-admissions`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // AP Biology Tier 2 international metros — Canada + APAC. Targets
    // BC + Ontario AP cohorts (Indo-Canadian heavy in BC + Brampton)
    // plus SAS/SAIS Singapore and HKIS Hong Kong.
    {
      url: `${baseUrl}/ap-biology-tutor-vancouver`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-toronto-gta`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-brampton-mississauga`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-singapore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-hong-kong`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // AP Biology US per-school feeder pages — built from
    // APBiologySchoolTemplate + src/data/ap-biology/schools.ts.
    // Priority 0.7 via normalizePriority. Long-tail "AP Biology
    // tutor near {school}" intent.
    {
      url: `${baseUrl}/ap-biology-tutor-tjhsst`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-stuyvesant`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-bronx-science`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-harker`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-phillips-exeter`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-andover`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-mission-san-jose`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-gunn-palo-alto`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-walter-payton`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-hunter-college-hs`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // AP Biology cornerstone content — pedagogy moat. Priority 0.9 via
    // normalizePriority (high-authority content spokes that link out
    // to all 20 metro/school pages).
    {
      url: `${baseUrl}/ap-biology-frq-rubric-mastery`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-biology-score-5-study-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-biology-anki-deck`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/usabo-past-papers-archive`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-biology-vs-college-bio-mcat-bridge`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/a-level-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // A-Level per-exam-board hubs (AQA / OCR / Edexcel / WJEC-Eduqas / Cambridge International)
    ...A_LEVEL_BOARDS.map((b) => ({
      url: `${baseUrl}/${b.routeSlug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    })),
    // A-Level city pages (P2 UK)
    {
      url: `${baseUrl}/a-level-biology-tutor-london`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-level-biology-tutor-manchester`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/a-level-biology-tutor-birmingham`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // A-Level Biology dynamic city pages — sourced from
    // src/data/a-level/cities.ts so future additions automatically
    // register in the sitemap.
    ...aLevelCitySlugs().map((city) => ({
      url: `${baseUrl}/a-level-biology/${city}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // Fee comparison pages (5 verticals)
    {
      url: `${baseUrl}/mcat-biology-pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dat-biology-pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gamsat-biology-pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usmle-step-1-biology-pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-pricing`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-online-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/international-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // International Country Landing Pages - Hub & Country Pages
    {
      url: `${baseUrl}/international`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biology-major-courses`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // Critical Conversion & Feature Pages
    // REMOVED: /demo — blocked by middleware in production (302 → /)
    {
      url: `${baseUrl}/help`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/ai-features`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/interactive-learning`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mobile-app`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scholarship`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-scholarship-test`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/dr-shekhar-singh`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/referral`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/adaptive-testing`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learning-path`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/curriculum`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/offline`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/explore-courses`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // About Sub-Pages
    {
      url: `${baseUrl}/about/careers`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/media`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    // Boards Hub and Pages
    {
      url: `${baseUrl}/boards`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/boards/cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/ib`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/igcse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/boards/state-boards`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Major City NEET Coaching Pages
    {
      url: `${baseUrl}/neet-coaching-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Metro & Coaching Hub City Pages - NEW EXPANSION
    {
      url: `${baseUrl}/neet-coaching-kota`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.96, // India's coaching capital - highest priority
    },
    {
      url: `${baseUrl}/neet-coaching-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // 15M population metro
    },
    {
      url: `${baseUrl}/neet-coaching-ahmedabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // 8M population metro
    },
    {
      url: `${baseUrl}/neet-coaching-patna`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Major coaching hub with high aspirant density
    },
    {
      url: `${baseUrl}/neet-coaching-lucknow`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // UP capital, major coaching center
    },
    {
      url: `${baseUrl}/neet-coaching-jaipur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Rajasthan capital, Kota alternative
    },
    {
      url: `${baseUrl}/best-neet-coaching-delhi-ncr`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.96,
    },
    {
      url: `${baseUrl}/top-10-biology-coaching-delhi-ncr`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/top-biology-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.98,
    },
    {
      url: `${baseUrl}/top-ib-biology-coaching-global`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/top-ap-biology-coaching-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/top-ap-biology-coaching-global`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/top-usabo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/top-ibo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/top-cbo-coaching-canada`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/top-bbo-coaching-uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/top-sbo-coaching-singapore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dse-biology-tutor-hong-kong`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-biology-tutor-shanghai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/hkbo-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Phase 6 national olympiad hubs (UK + Australia)
    {
      url: `${baseUrl}/bbo-biology-olympiad-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/abo-biology-olympiad-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ibo-coaching-china`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // ─── P3 China cluster — city pages (Shenzhen + AP Beijing) ───
    // IB school-feeder pages now generated dynamically from ibBiologySchoolSlugs
    {
      url: `${baseUrl}/ap-biology-tutor-beijing`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // Delhi Area NEET Coaching Pages
    {
      url: `${baseUrl}/neet-coaching-north-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-east-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-west-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-gtb-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-kalu-sarai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-mukherjee-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-rajinder-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-janakpuri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // NEET Content Hub Pages
    {
      url: `${baseUrl}/neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-2025-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ncert-biology-solutions`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/second-chance-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-notes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-coaching-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // NEET Biology Coaching Hub Page - CRITICAL
    {
      url: `${baseUrl}/neet-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Course Sub-Pages
    {
      url: `${baseUrl}/courses/class-9-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/class-10-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/intensive-neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/neet-complete`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/neet-dropper`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/neet-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/compare`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses/finder`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Board-Specific Course Pages
    {
      url: `${baseUrl}/courses/class-9-10-biology-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/cbse-biology-class-11-12`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/icse-isc-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/ib-igcse-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // International & Competitive Exam Courses
    {
      url: `${baseUrl}/courses/ap-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/courses/ntse-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Company Pages
    {
      url: `${baseUrl}/company/careers`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/company/results`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Services Sub-Pages
    {
      url: `${baseUrl}/services/classroom`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/doubt-resolution`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/international`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/online-classes`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Support Pages
    {
      url: `${baseUrl}/support/admission`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/support/brochure`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    // REMOVED: /support/demo — blocked by middleware in production (302 → /)
    {
      url: `${baseUrl}/support/fees`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Test Platform
    {
      url: `${baseUrl}/tests`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Thank You Page
    {
      url: `${baseUrl}/thank-you`,
      lastModified: lastUpdated,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    // ========================================
    // Additional SEO Pages (326 missing pages)
    // ========================================
    // 1-on-1 & Premium Coaching
    {
      url: `${baseUrl}/1-on-1-biology-tuition-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // NEET Notes Pages
    {
      url: `${baseUrl}/anatomy-flowering-plants-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/animal-kingdom-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/animal-kingdom-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/animal-tissues-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ap-biology-online-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Best Biology Teacher/Tuition Pages
    {
      url: `${baseUrl}/best-biology-teacher-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-hauz-khas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tuition-vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tutor-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-biology-tutor-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/best-coaching-neet-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-neet-biology-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-neet-biology-tutor-delhi-ncr`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/best-online-biology-tutor-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Class & Topic Pages
    {
      url: `${baseUrl}/biodiversity-conservation-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biodiversity-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biological-classification-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // Biology Classes Location Pages
    {
      url: `${baseUrl}/biology-classes-cr-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-greater-kailash`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-green-park`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // NOTE: Gurugram sector sub-page URLs (sector-49, 51, 55, 56, 57, 60, 73)
    // were removed — those pages do not exist and the inline regex on line 68
    // already strips them from the final sitemap. Removing them here prevents
    // dead code and keeps the audit-sitemap-404s.mjs report clean.
    {
      url: `${baseUrl}/biology-classes-hauz-khas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-kalkaji`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-lajpat-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-malviya-nagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-rk-puram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-saket`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-vasant-kunj`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-classes-vasant-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Biology Coaching School-Specific Pages
    {
      url: `${baseUrl}/biology-coaching-cbse-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Biology Tuition & Tutor Pages
    {
      url: `${baseUrl}/biology-olympiad-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-central-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-noida-extension`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-saket`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/biology-tutor-vasant-kunj`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Topic-Specific Notes & Class Pages
    {
      url: `${baseUrl}/biomolecules-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biomolecules-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/biotechnology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/board-neet-biology-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/botany-zoology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/campbell-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cell-biology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cell-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Online Class Pages
    {
      url: `${baseUrl}/class-10-biology-tuition-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/class-10-board-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/class-11-biology-tuition-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/class-11-neet-preparation-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/class-12-biology-tuition-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/class-9-biology-tuition-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/class-9-science-tuition-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dna-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ecology-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ecology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evolution-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evolution-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // International/Board Specific Pages
    {
      url: `${baseUrl}/gcse-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gcse-biology-tutor-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/genetics-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/genetics-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-score-360-neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-prepare-for-neet-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/human-physiology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/human-physiology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ib-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ap-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mcat-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ib-biology-ia-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ib-biology-ia-topics`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-ia-rubric-2025`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-ia-examples`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ib-biology-ia-troubleshooting`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ib-biology-2025-syllabus`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ib-biology-past-papers`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ib-biology-paper-1-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-paper-2-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-extended-essay`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ib-biology-ee-topics`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-ee-examples`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // IB Biology pre-exam crash courses — April-May high-intent window.
    // Distinct primary keywords ("HL crash course", "SL crash course")
    // not targeted by any other IB page.
    {
      url: `${baseUrl}/ib-biology-hl-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-sl-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // TOK essay through Biology lens — zero competing pages on the
    // site target "IB Biology TOK essay" today.
    {
      url: `${baseUrl}/ib-biology-tok-essay-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // IB Biology per-school feeder pages — dynamically generated from
    // ibBiologySchoolSlugs so new schools are automatically included.
    ...ibBiologySchoolSlugs.map((slug) => ({
      url: `${baseUrl}/ib-biology-tutor-${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/ib-extended-essay-vs-ia`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ib-biology-hl-vs-sl`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/how-to-score-7-ib-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // IB Biology city pages — sourced dynamically from
    // src/data/ib-biology/cities.ts so future additions to citySlugs()
    // automatically register in the sitemap (no risk of orphaned
    // pages drifting from the data layer).
    ...ibBiologyCitySlugs().map((city) => ({
      url: `${baseUrl}/ib-biology/${city}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/ib-biology-tutors`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    ...[
      'dr-shekhar-singh',
      'dr-priya-menon',
      'mr-james-hartley',
      'ms-aditi-rao',
      'mr-daniel-carter',
      'dr-sofia-alvarez',
      'ms-ishita-bose',
      'mr-arjun-patel',
    ].map((tutor) => ({
      url: `${baseUrl}/ib-biology-tutors/${tutor}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    {
      url: `${baseUrl}/ib-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ib-biology-tutor-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/igcse-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/is-coaching-necessary-for-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/live-biology-classes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/living-world-ncert`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mcat-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // MCAT section-specific landing pages — each targets a distinct
    // query intent (B/B section, biochem-only, passage strategy).
    {
      url: `${baseUrl}/mcat-biology-bb-section-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mcat-biochemistry-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mcat-biology-passage-strategy`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // MCAT city-level Indian-American hubs — long-tail "MCAT Biology
    // tutor {City}" intent. Mirrors AP Biology US metro pattern.
    {
      url: `${baseUrl}/mcat-biology-tutor-new-jersey`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mcat-biology-tutor-bay-area`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mcat-biology-tutor-houston`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mcat-biology-tutor-atlanta`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mcat-biology-tutor-boston`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // MCAT city pages from metros.ts (Phase 1 expansion — 7 new metros)
    ...mcatMetroSlugs.map((slug) => ({
      url: `${baseUrl}/mcat-biology-tutor-${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // MCAT cornerstone content — informational authority pages with
    // Article schema + Dr. Shekhar author byline.
    {
      url: `${baseUrl}/aamc-content-outline-mapped-campbell-chapters`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mcat-biology-high-yield-topics-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mcat-bb-passage-strategy-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/mcat-biology-vs-neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // DAT cluster (US/Canada pre-dental) — AEO hub at 0.92 (handled
    // via normalizePriority), programme + section pages at 0.85, city
    // pages at 0.8.
    {
      url: `${baseUrl}/best-dat-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/dat-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dat-biology-organic-chem-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dat-perceptual-ability-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/dat-biology-tutor-new-jersey`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dat-biology-tutor-bay-area`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // DAT city pages from metros.ts (Phase 2 expansion)
    ...datMetroSlugs.map((slug) => ({
      url: `${baseUrl}/dat-biology-tutor-${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // GAMSAT cluster (UK / Ireland / Australia graduate medicine).
    {
      url: `${baseUrl}/best-gamsat-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/gamsat-section-3-biology-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gamsat-section-3-study-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gamsat-score-breakdown-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gamsat-biology-topics-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gamsat-biology-tutor-london`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gamsat-biology-tutor-sydney`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // GAMSAT city pages from metros.ts (Phase 2 expansion)
    ...gamsatMetroSlugs.map((slug) => ({
      url: `${baseUrl}/gamsat-biology-tutor-${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // USMLE Step 1 cluster (US medical licensing + IMG ECFMG). AEO hub
    // at 0.92, programme hub + section + cornerstone at 0.85.
    {
      url: `${baseUrl}/best-usmle-step-1-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/usmle-step-1-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usmle-step-1-biochemistry-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usmle-step-1-microbiology-immunology-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/usmle-step-1-physiology-prep`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // USMLE Step 1 city pages from metros.ts (Phase 4 — 3 US + 3 India)
    ...usmleMetroSlugs.map((slug) => ({
      url: `${baseUrl}/usmle-step-1-tutor-${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/first-aid-step-1-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // NEET UG Biology AEO cluster (national hubs + Class 11/12 specific
    // + biology-specific competitor comparisons). AEO hubs at 0.92.
    {
      url: `${baseUrl}/best-neet-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/best-neet-biology-tutor-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/best-neet-biology-tutor-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/cerebrum-vs-aakash-neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cerebrum-vs-allen-neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cerebrum-vs-unacademy-neet-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // NEET Foundation Class 9 & 10 cluster — AEO hubs + Delhi city
    // pages + Allen Scholastics comparison.
    {
      url: `${baseUrl}/best-neet-foundation-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/best-neet-foundation-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/best-neet-foundation-class-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-foundation-class-9-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/cerebrum-vs-aakash-foundation`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Metro Foundation pages — Mumbai, Bangalore, Hyderabad (Class 9 + 10).
    // Pan-India online live delivery; same priority tier as Delhi
    // Foundation city pages (0.85) for parity with the Delhi cluster.
    {
      url: `${baseUrl}/neet-foundation-class-9-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-9-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-9-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Metro Foundation expansion — Chennai, Pune, Kolkata (Class 9 + 10).
    {
      url: `${baseUrl}/neet-foundation-class-9-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-9-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-9-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-foundation-class-10-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/molecular-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/morphology-flowering-plants-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // NCERT Pages
    {
      url: `${baseUrl}/ncert-based-neet-questions`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-biology-class-11-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-biology-notes-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-biology-notes-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-exemplar-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ncert-punch-biology`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // NEET Coaching & Course Pages
    // neet-2025-biology-coaching → redirects to /neet-2027-preparation
    {
      url: `${baseUrl}/neet-application-form-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-biology-1-year-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-45-day-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-6-month-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-90-day-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-chapter-weightage`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-coaching-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-coaching-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-diagrams`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-formulas`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-important-questions`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-mcq-practice`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-notes-pdf`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-online-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-pyq-chapter-wise`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-revision-notes`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // neet-biology-syllabus-2025 → redirects to /neet-biology-syllabus-2026
    {
      url: `${baseUrl}/neet-biology-tutor-for-droppers`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-biology-weekend-batch`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-botany-syllabus`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    // NEET Coaching Location Pages
    {
      url: `${baseUrl}/neet-coaching-dlf-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-fees-comparison`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // REMOVED: /neet-coaching-gurgaon-sector-{43,45,49,51,56,61,82}
    // — no page exists for "gurgaon" spelling; real pages use /neet-coaching-gurugram/[area]
    // Added redirect /neet-coaching-gurgaon-sector-:num → /neet-coaching-gurugram
    {
      url: `${baseUrl}/neet-coaching-pathways-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-pitampura`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-success-rate-comparison`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-with-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-working-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // NEET Info & Guide Pages
    {
      url: `${baseUrl}/neet-counselling-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-dropper-batch-online`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-dropper-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // June 2026 — biology-specialist dropper wedge + cornerstone revision plan
    {
      url: `${baseUrl}/neet-dropper-biology-specialist-2027`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-revision-plan-neet-dropper`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // June 2026 — SEO-only landing for broad "online NEET coaching"
    // cluster targeting India + NRI / global searchers. Honest biology-
    // specialist positioning, no pricing displayed. NOT in nav.
    {
      url: `${baseUrl}/online-neet-coaching-pcb`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // June 2026 — olympiad cornerstone pages. Captures broad "best
    // biology olympiad coaching india" + "biology olympiad tutor india"
    // head terms. Cross-links to existing NSEB / INBO / USABO / BBO /
    // CBO / SBO pathway-specific pages.
    {
      url: `${baseUrl}/best-biology-olympiad-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/biology-olympiad-tutor-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // June 2026 — master "best biology coaching" head-term cornerstones.
    // Designed to dominate the broadest aggregation searches across
    // NEET + IB + AP + MCAT + Olympiads. Cross-links to specialty pages.
    {
      url: `${baseUrl}/best-biology-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.97,
    },
    {
      url: `${baseUrl}/best-ibo-coaching-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    {
      url: `${baseUrl}/biology-coaching-english-medium-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // Tutor + classes head-term variants — complete the trio with
    // /best-biology-coaching-india
    {
      url: `${baseUrl}/best-biology-tutor-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-biology-classes-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Global hub — international audience anchor (Phase 3 of global repositioning)
    {
      url: `${baseUrl}/best-biology-tutor-global`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-biology-tutor-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/best-biology-tutor-uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Global exam hubs (universal, all-nationalities) — AP/MCAT/Olympiad/IB/A-Level/NEET
    ...GLOBAL_EXAMS.map((e) => ({
      url: `${baseUrl}/${e.routeSlug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    {
      url: `${baseUrl}/honors-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/college-biology-tutor`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    // College / intro-biology by-course pages + high-school EOC/NGSS + USABO/MCAT
    // cornerstone guides (Jun 2026 USA gap-build, Phases 2-3)
    ...[
      'biology-101-tutor',
      'anatomy-and-physiology-tutor',
      'genetics-tutor',
      'microbiology-tutor',
      'cell-and-molecular-biology-tutor',
      'biology-eoc-exam-prep',
      'ngss-biology-help',
      'how-to-qualify-for-usabo',
      'usabo-syllabus',
      'best-usabo-books',
      'mcat-biology-score-guide',
      'best-mcat-biology-books',
      'cerebrum-vs-dat-bootcamp',
      'cerebrum-vs-uworld-step-1',
      'cerebrum-vs-kaplan-ap-biology',
      'cerebrum-vs-biolympiads',
      'brain-bee-study-guide',
      'brain-bee-neuroanatomy-guide',
      'how-to-make-us-ibo-team',
      'is-usabo-worth-it',
      'is-ap-biology-worth-taking',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    // IBO (Team USA) coaching hub — standalone, not covered by GLOBAL_EXAMS.
    // (The six *-tutor-global hubs are already emitted by the GLOBAL_EXAMS map
    // above, so they are intentionally not repeated here.)
    {
      url: `${baseUrl}/ibo-coaching-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // Global brand home — the international front door (/ stays India-NEET)
    {
      url: `${baseUrl}/global`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Primary demo money page — was missing while the sitemap listed
    // /book-demo, which 301s here.
    {
      url: `${baseUrl}/book-free-demo`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // neet-dropper-crash-course-2025 → redirects to /neet-crash-course
    // ===== City-specific dropper batch pages (Apr 2026 expansion) =====
    {
      url: `${baseUrl}/neet-dropper-batch-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-dropper-batch-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-dropper-batch-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-dropper-batch-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-dropper-batch-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-dropper-batch-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-dropper-batch-kota`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-eligibility-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-eligibility-criteria`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-exam-countdown`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-exam-date-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-exam-details`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // neet-exam-pattern-2025 → redirects to /neet-exam-details
    {
      url: `${baseUrl}/neet-guidance-seminar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-mock-test-free`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-official-resources`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-preparation-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-registration-guide`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // neet-repeater-course-2025 → redirects to /neet-repeaters-2026
    {
      url: `${baseUrl}/neet-repeaters-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-result-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-result-analysis`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-study-plan-generator`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // neet-syllabus-2025 → redirects to /neet-syllabus-2026
    {
      url: `${baseUrl}/neet-syllabus-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-tools`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-zoology-syllabus`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/nri-students`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // NRI Country-Specific Pages
    // New NRI Country Pages (Western & Additional Countries)
    // West Delhi Location Pages (Critical Gap Coverage)
    // Ghaziabad Expansion Pages
    {
      url: `${baseUrl}/neet-coaching-raj-nagar-extension`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-indirapuram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Noida canonical pages (area/thin pages now redirected, ghosts removed)
    {
      url: `${baseUrl}/neet-coaching-fee-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // East Delhi Expansion Pages
    // Premium Coaching Pages
    {
      url: `${baseUrl}/one-to-one-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/one-year-neet-dropper-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Online Biology Classes
    {
      url: `${baseUrl}/online-biology-classes-cbse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-class-10`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-class-12`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-class-9`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-icse`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-international`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-classes-nri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-biology-tuition-india`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/online-vs-offline-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // Plant & Topic Pages
    {
      url: `${baseUrl}/plant-kingdom-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plant-kingdom-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plant-physiology-class-11`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/plant-physiology-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quick-enroll`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reproduction-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/should-i-join-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/structural-organisation-animals-notes-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/teacher`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/timetable`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-choose-cerebrum-academy`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Premium Metro Area Pages - HIGH PRIORITY (₹24,000+ Fee Demographics)
    // Mumbai Premium Areas
    {
      url: `${baseUrl}/neet-coaching-bandra-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94, // Ultra-premium international school area
    },
    {
      url: `${baseUrl}/neet-coaching-powai-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT/Tech hub with Hiranandani
    },
    {
      url: `${baseUrl}/neet-coaching-andheri-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Commercial hub, large population
    },
    {
      url: `${baseUrl}/neet-coaching-south-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94, // SoBo ultra-premium - Colaba, Malabar Hill
    },
    // Hyderabad Premium Areas
    {
      url: `${baseUrl}/neet-coaching-jubilee-hills-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Premium residential & school hub
    },
    {
      url: `${baseUrl}/neet-coaching-gachibowli-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT Financial District
    },
    {
      url: `${baseUrl}/neet-coaching-hitech-city-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT corridor - Madhapur, Kukatpally
    },
    // Bangalore Premium Areas
    {
      url: `${baseUrl}/neet-coaching-koramangala-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Startup hub, premium schools
    },
    {
      url: `${baseUrl}/neet-coaching-indiranagar-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // East Bangalore premium
    },
    {
      url: `${baseUrl}/neet-coaching-hsr-layout-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // South Bangalore IT hub
    },
    // Chennai Premium Areas
    {
      url: `${baseUrl}/neet-coaching-adyar-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Educational hub - IIT Madras adjacent
    },
    {
      url: `${baseUrl}/neet-coaching-anna-nagar-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // North Chennai premium
    },
    {
      url: `${baseUrl}/neet-coaching-omr-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // IT corridor
    },
    // Pune Premium Areas
    {
      url: `${baseUrl}/neet-coaching-koregaon-park-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // East Pune premium - international schools
    },
    {
      url: `${baseUrl}/neet-coaching-baner-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // West Pune IT corridor
    },
    {
      url: `${baseUrl}/neet-coaching-viman-nagar-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // IT corridor - international schools
    },
    // Additional Metro Premium Areas
    {
      url: `${baseUrl}/neet-coaching-whitefield-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT hub - ITPL, international schools
    },
    {
      url: `${baseUrl}/neet-coaching-thane-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Mumbai suburban premium - Hiranandani
    },
    {
      url: `${baseUrl}/neet-coaching-secunderabad-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Twin city - Begumpet, defence area
    },
    {
      url: `${baseUrl}/neet-coaching-t-nagar-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Central Chennai premium - PSBB hub
    },
    // State Board Pages - English Medium NEET Preparation
    {
      url: `${baseUrl}/maharashtra-hsc-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // High population state
    },
    {
      url: `${baseUrl}/karnataka-puc-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // IT hub state
    },
    {
      url: `${baseUrl}/tamil-nadu-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Strong NEET aspirant base
    },
    {
      url: `${baseUrl}/telangana-inter-biology-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Hyderabad hub
    },
    {
      url: `${baseUrl}/kerala-biology-tuition-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Best NCERT alignment
    },
    // Tier-2 City Pages - Emerging Markets
    {
      url: `${baseUrl}/neet-coaching-chandigarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Union Territory - high income
    },
    // ===== CHANDIGARH TRICITY & PUNJAB EXPANSION (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-chandigarh-sector-34`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Main coaching hub of Chandigarh
    },
    {
      url: `${baseUrl}/neet-coaching-punjab`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Punjab state hub page
    },
    {
      url: `${baseUrl}/cerebrum-vs-allen-chandigarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88, // Comparison page - Aakash
    },
    {
      url: `${baseUrl}/cerebrum-vs-aakash-chandigarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88, // Comparison page - Allen
    },
    // ===== CHANDIGARH TRICITY EXPANSION PHASE 2 (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-mohali`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Mohali dedicated page - IT City, Phases
    },
    {
      url: `${baseUrl}/neet-coaching-panchkula`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Panchkula dedicated page - Haryana
    },
    {
      url: `${baseUrl}/neet-coaching-zirakpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Zirakpur dedicated page - VIP Road
    },
    {
      url: `${baseUrl}/neet-coaching-chandigarh-sector-17`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89, // Sector 17 - City Center
    },
    {
      url: `${baseUrl}/neet-coaching-chandigarh-sector-22`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88, // Sector 22 - Commercial Hub
    },
    {
      url: `${baseUrl}/neet-coaching-manimajra`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87, // Manimajra - Growing area
    },
    {
      url: `${baseUrl}/neet-coaching-kharar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87, // Kharar - Untapped market near Mohali
    },
    // ===== PUNJAB-HARYANA REGIONAL EXPANSION PHASE 3 (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-ambala`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Ambala - Haryana gateway, Cantonment area
    },
    {
      url: `${baseUrl}/neet-coaching-ludhiana`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Ludhiana - Punjab largest city, industrial hub
    },
    {
      url: `${baseUrl}/neet-coaching-jalandhar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Jalandhar - Doaba region education center
    },
    {
      url: `${baseUrl}/neet-coaching-patiala`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Patiala - Royal city, GMC Patiala hometown
    },
    {
      url: `${baseUrl}/neet-coaching-karnal`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Karnal - KCGMC hometown, Haryana education hub
    },
    // ===== HIMACHAL PRADESH EXPANSION (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-shimla`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Shimla - HP capital, IGMC Shimla, hill station
    },
    {
      url: `${baseUrl}/neet-coaching-dharamshala`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Dharamshala - Kangra district, RPGMC Tanda nearby, tourist hub
    },
    {
      url: `${baseUrl}/neet-coaching-mandi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Mandi - SLBSGMC Nerchowk in district, Sadar region
    },
    {
      url: `${baseUrl}/neet-coaching-hamirpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Hamirpur - HP education hub, 59+ coaching institutes, AIIMS Bilaspur nearby
    },
    {
      url: `${baseUrl}/neet-coaching-solan`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Solan - MMMC 150 seats, gateway to HP, near Chandigarh
    },
    // ===== MAHARASHTRA EXPANSION (Jan 2026) =====
    {
      url: `${baseUrl}/neet-coaching-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Mumbai - Financial capital, Seth GS/KEM, Grant Medical, 5125 MH MBBS seats
    },
    {
      url: `${baseUrl}/neet-coaching-bhopal`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // MP capital - AIIMS Bhopal
    },
    {
      url: `${baseUrl}/neet-coaching-indore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // MP coaching hub
    },
    {
      url: `${baseUrl}/biology-tuition-surat`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Gujarat diamond city
    },
    // Tier-2/3 City NEET Coaching Pages - Full 30/30 SEO/GEO/AEO (Feb 2026)
    {
      url: `${baseUrl}/neet-coaching-nagpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // AIIMS Nagpur - Maharashtra
    },
    {
      url: `${baseUrl}/neet-coaching-surat`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // Gujarat - Diamond City
    },
    // India Tier 2 depth — dropper + foundation pages (May 2026)
    ...[
      'neet-dropper-batch-surat',
      'neet-dropper-batch-dehradun',
      'neet-dropper-batch-bhopal',
      'neet-dropper-batch-indore',
      'neet-dropper-batch-coimbatore',
      'neet-dropper-batch-lucknow',
      'neet-dropper-batch-jaipur',
      'neet-dropper-batch-patna',
      'neet-foundation-class-9-surat',
      'neet-foundation-class-10-surat',
      'neet-foundation-class-9-dehradun',
      'neet-foundation-class-10-dehradun',
      'neet-foundation-class-9-bhopal',
      'neet-foundation-class-10-bhopal',
      'neet-foundation-class-9-indore',
      'neet-foundation-class-10-indore',
      'neet-foundation-class-9-coimbatore',
      'neet-foundation-class-10-coimbatore',
      'neet-foundation-class-9-patna',
      'neet-foundation-class-10-patna',
      // South India + Kerala + Punjab + NE + Uttarakhand + Haryana + J&K (May 2026)
      'neet-coaching-kochi',
      'neet-coaching-kozhikode',
      'neet-coaching-thrissur',
      'neet-coaching-allahabad',
      'neet-coaching-rajkot',
      'neet-coaching-aurangabad',
      'neet-coaching-vijayawada',
      'neet-coaching-tiruchirappalli',
      'neet-coaching-pondicherry',
      'neet-coaching-ludhiana',
      'neet-coaching-amritsar',
      'neet-coaching-jalandhar',
      'neet-coaching-haridwar',
      'neet-coaching-haldwani',
      'neet-coaching-shillong',
      'neet-coaching-imphal',
      'neet-coaching-karnal',
      'neet-coaching-ambala',
      'neet-coaching-jammu',
      // Depth pages for all new cities
      ...[
        'kochi',
        'kozhikode',
        'thrissur',
        'thiruvananthapuram',
        'visakhapatnam',
        'mangalore',
        'mysore',
        'madurai',
        'ludhiana',
        'amritsar',
        'jalandhar',
        'haridwar',
        'haldwani',
        'shillong',
        'imphal',
        'karnal',
        'ambala',
        'jammu',
        'allahabad',
        'rajkot',
        'aurangabad',
        'vijayawada',
        'tiruchirappalli',
        'pondicherry',
        'varanasi',
        'kanpur',
        'ranchi',
        'bhubaneswar',
        'guwahati',
        'raipur',
        'vadodara',
        'nashik',
        'meerut',
        // June 2026 — 8 major metros added (batch 4 of city data)
        'mumbai',
        'bangalore',
        'chennai',
        'hyderabad',
        'kolkata',
        'pune',
        'delhi',
        'ahmedabad',
      ].flatMap((c) =>
        [
          `neet-dropper-batch-${c}`,
          `online-neet-coaching-${c}`,
          `neet-coaching-fees-${c}`,
          `neet-coaching-near-me-${c}`,
        ].filter(pageExists)
      ),
      // Foundation pages for Kerala + new cities
      ...[
        'kochi',
        'kozhikode',
        'thrissur',
        'thiruvananthapuram',
        'visakhapatnam',
        'mangalore',
        'mysore',
        'madurai',
      ]
        .flatMap((c) => [`neet-foundation-class-9-${c}`, `neet-foundation-class-10-${c}`])
        .filter(pageExists),
      // May 2026 city builds that were missing from the sitemap entirely —
      // the batch-4 loop above covers different cities than were built.
      ...[
        ...[
          'bhopal',
          'chandigarh',
          'coimbatore',
          'jaipur',
          'kochi',
          'lucknow',
          'mangalore',
          'patna',
          'surat',
          'visakhapatnam',
        ].map((c) => `nseb-coaching-${c}`),
        ...[
          'bhopal',
          'chandigarh',
          'coimbatore',
          'indore',
          'jaipur',
          'kota',
          'lucknow',
          'patna',
          'surat',
        ].flatMap((c) => [`neet-coaching-near-me-${c}`, `online-neet-coaching-${c}`]),
        ...['chandigarh', 'kota'].flatMap((c) => [
          `neet-foundation-class-9-${c}`,
          `neet-foundation-class-10-${c}`,
        ]),
        'neet-dropper-batch-chandigarh',
      ].filter(pageExists),
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/neet-coaching-thiruvananthapuram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Kerala capital
    },
    {
      url: `${baseUrl}/neet-coaching-goa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Goa Medical College
    },
    {
      url: `${baseUrl}/neet-coaching-kochi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Kerala commercial hub
    },
    {
      url: `${baseUrl}/neet-coaching-visakhapatnam`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Andhra Pradesh port city
    },
    {
      url: `${baseUrl}/neet-coaching-coimbatore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Tamil Nadu education hub
    },
    {
      url: `${baseUrl}/neet-coaching-madurai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Tamil Nadu heritage city
    },
    {
      url: `${baseUrl}/neet-coaching-nashik`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Maharashtra wine capital
    },
    {
      url: `${baseUrl}/neet-coaching-trivandrum`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Kerala - Trivandrum alias
    },
    {
      url: `${baseUrl}/neet-coaching-bhubaneswar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Odisha capital - AIIMS Bhubaneswar
    },
    {
      url: `${baseUrl}/neet-coaching-cuttack`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89, // Odisha SCB Medical
    },
    {
      url: `${baseUrl}/neet-coaching-gandhinagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89, // Gujarat capital
    },
    {
      url: `${baseUrl}/neet-coaching-vadodara`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // Gujarat Cultural Capital
    },
    {
      url: `${baseUrl}/biology-coaching-nagpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.91, // AIIMS Nagpur - Central India
    },
    // Rohini Area SEO Pages - Gated Societies & Premium Localities (Jan 2026)
    {
      url: `${baseUrl}/neet-coaching-saraswati-vihar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94, // Largest colony in Pitampura
    },
    {
      url: `${baseUrl}/neet-coaching-pushpanjali-enclave`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93, // Co-op Housing Society Pitampura
    },
    {
      url: `${baseUrl}/neet-coaching-meera-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94, // Ultra-premium Paschim Vihar
    },
    {
      url: `${baseUrl}/neet-coaching-civil-lines-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95, // Ultra-premium Delhi
    },
    {
      url: `${baseUrl}/neet-coaching-vikas-puri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // West Delhi hub
    },
    {
      url: `${baseUrl}/neet-coaching-tagore-garden`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // West Delhi
    },
    {
      url: `${baseUrl}/neet-coaching-wazirpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92, // Near Rohini
    },
    // School-Specific SEO Pages - Rohini Area (Jan 2026)
    // Comparison Pages - AEO/GEO Optimized (Jan 2026)
    {
      url: `${baseUrl}/cerebrum-vs-allen-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // High-intent comparison
    },
    {
      url: `${baseUrl}/cerebrum-vs-aakash-neet-coaching`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9, // High-intent comparison
    },
    // MCQ Chapter Pages (Jan 2026 - Week 1 Priority)
    {
      url: `${baseUrl}/neet-biology-mcq/cell-unit-of-life`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/biomolecules`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/principles-inheritance`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/molecular-inheritance`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/plant-kingdom`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/animal-kingdom`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/biological-classification`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/human-health-disease`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/biotechnology-principles`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-biology-mcq/human-reproduction`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    // NEET Score Calculator Tool
    {
      url: `${baseUrl}/neet-score-calculator`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    // Dwarka Coaching Hub + Sector Pages
    {
      url: `${baseUrl}/neet-coaching-dwarka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.94,
    },
    // University Area Page
    {
      url: `${baseUrl}/neet-coaching-du-north-campus`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.93,
    },
    // Metro Station Pages
    {
      url: `${baseUrl}/neet-coaching-rajiv-chowk-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-hauz-khas-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-kashmere-gate-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-botanical-garden-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-huda-city-centre-metro`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },

    // === Missing pages added for complete sitemap coverage ===
    {
      url: `${baseUrl}/a-level-to-neet-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/cbse-abroad-neet-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/ib-to-neet-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/igcse-to-neet-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.92,
    },
    {
      url: `${baseUrl}/neet-coaching-cairo-egypt`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-colombo-sri-lanka`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-dhaka-bangladesh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-doha-qatar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-jeddah-saudi-arabia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-lahore-pakistan`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-muscat-oman`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-riyadh-saudi-arabia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-ballygunge-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-banjara-hills-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-bellandur-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-bodakdev-ahmedabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-c-scheme-jaipur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-colaba-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-electronic-city-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-gomti-nagar-lucknow`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-goregaon-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-hinjewadi-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-hiranandani-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-jayanagar-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-juhu-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-kalyani-nagar-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-kondapur-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-lodha-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-madhapur-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-malviya-nagar-jaipur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-mylapore-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-navi-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-new-town-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-nungambakkam-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-park-street-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-prahlad-nagar-ahmedabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-salt-lake-kolkata`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-sarjapur-road-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-satellite-ahmedabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-sg-highway-ahmedabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-vaishali-nagar-jaipur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-velachery-chennai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-versova-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-bhondsi-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-chandni-chowk-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-connaught-place-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-dilshad-garden-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-imt-manesar-gurgaon`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-lal-kuan-ghaziabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-shahdara-east-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-yamuna-vihar-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-amity-international`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-bishops-school-pune`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-cathedral-school-mumbai`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-chirec-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-dps-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-dps-chandigarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-heritage-xperiential`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-la-martiniere`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-mallya-aditi-bangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-modern-school-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-oakridge-hyderabad`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-sanskriti-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-st-columbas-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-vasant-valley-school`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/private-school-biology-tuition`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/most-important-chapters-neet-biology-2026`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-biology-important-diagrams-pdf`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-biology-preparation-3-months`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-biology-preparation-tips`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-biology-resources`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-biology-study-material`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    // /about-cerebrum-biology-academy removed — 301 → /about (Phase 4a, May 2026)
    {
      url: `${baseUrl}/cbse-biology-coaching-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/cbse-neet-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/class-10-biology-coaching-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/class-12-board-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/class-9-biology-tuition-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-agra`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-aliganj-lucknow`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-amritsar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-crossing-republik`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-dehradun`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    // Dehradun/Mussoorie depth — boarding school pages + depth
    ...[
      'neet-coaching-fees-dehradun',
      'neet-coaching-near-me-dehradun',
      'online-neet-coaching-dehradun',
      'neet-coaching-doon-school-dehradun',
      'neet-coaching-welham-boys-dehradun',
      'neet-coaching-welham-girls-dehradun',
      'neet-coaching-woodstock-mussoorie',
    ].map((slug) => ({
      url: `${baseUrl}/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    })),
    {
      url: `${baseUrl}/neet-coaching-dlf-phase-1-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-faq`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-fees-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-57`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-62`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-gurgaon-sector-67`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-guwahati`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-gwalior`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-hazratganj-lucknow`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-jammu`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-jodhpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-kanpur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-mahendragarh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-manali`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-mangalore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-meerut`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-mussoorie`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-mysore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-near-me`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/neet-coaching-near-me-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    ...[
      'green-park-metro',
      'iit-delhi-metro',
      'aiims-metro',
      'greater-kailash-metro',
      'saket-metro',
      'malviya-nagar-metro',
      'rk-puram-metro',
      'munirka-metro',
      'kalkaji-mandir-metro',
      'nehru-place-metro',
      'lajpat-nagar-metro',
      'huda-city-centre-metro',
      'iffco-chowk-metro',
      'mg-road-metro',
      'sikanderpur-metro',
      'guru-dronacharya-metro',
      'sector-54-chowk-rapid-metro',
      'sector-55-56-rapid-metro',
      'sector-42-43-rapid-metro',
      'phase-1-rapid-metro',
      'phase-2-rapid-metro',
      'phase-3-rapid-metro',
      'cyber-city-rapid-metro',
      'belvedere-towers-rapid-metro',
      'moulsari-avenue-rapid-metro',
      'bata-chowk-metro',
      'neelam-chowk-metro',
      'old-faridabad-metro',
      'escorts-mujesar-metro',
      'badkhal-mor-metro',
      'sector-28-metro',
      'nhpc-chowk-metro',
      'mewala-maharajpur-metro',
      'badarpur-border-metro',
    ].map((slug) => ({
      url: `${baseUrl}/neet-coaching-near-metro/${slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/neet-coaching-new-friends-colony`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-nirvana-country-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-noida-society`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-omicron-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-panchsheel-park-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-prayagraj`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-raipur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-ranchi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-safdarjung-enclave-delhi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-saket`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-sector-62-noida`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-shalimar-bagh`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-siliguri`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-south-city-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-south-extension`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-srinagar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-surajkund`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-sushant-lok-gurugram`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-udaipur`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-vaishali`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-varanasi`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/online-biology-tuition-neet`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },

    // NRI Hub Pages
    {
      url: `${baseUrl}/neet-coaching-nri-canada`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-australia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-east-africa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-west-africa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },

    // Gulf City Pages
    {
      url: `${baseUrl}/neet-coaching-dubai-uae`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-abu-dhabi-uae`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-sharjah-uae`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-kuwait-city`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },

    // Thailand City Pages
    {
      url: `${baseUrl}/neet-coaching-bangkok-thailand`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-pattaya-thailand`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-chiang-mai-thailand`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },

    // ══════════════════════════════════════════════════════
    // NEW INTERNATIONAL PAGES — Phase 1-4 (Feb 2026)
    // ══════════════════════════════════════════════════════

    // Phase 1A: Country Hub Pages (8)
    {
      url: `${baseUrl}/neet-coaching-nri-saudi-arabia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-qatar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-oman`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-singapore`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-malaysia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-nepal`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },

    // Phase 1B: NEET Exam Center City Pages (5)
    {
      url: `${baseUrl}/neet-coaching-kathmandu-nepal`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-singapore-city`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-kuala-lumpur-malaysia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-lagos-nigeria`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-dammam-saudi-arabia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },

    // Phase 1C: Board-to-NEET Bridge Pages (2)
    {
      url: `${baseUrl}/ap-biology-to-neet-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/edexcel-to-neet-biology-preparation`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },

    // Phase 2A: Top NRI City Pages (7)
    {
      url: `${baseUrl}/neet-coaching-london-uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-toronto-canada`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-vancouver-canada`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-sydney-australia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-melbourne-australia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-new-york-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },
    {
      url: `${baseUrl}/neet-coaching-houston-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.89,
    },

    // Phase 2B: NRI Student Segment Pages (4)
    {
      url: `${baseUrl}/nri-neet-dropper-program`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/nri-neet-crash-course`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/nri-neet-foundation-program`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/nri-medical-admission-counseling`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },

    // Phase 3A: US/Canada City Pages (4)
    {
      url: `${baseUrl}/neet-coaching-chicago-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-san-jose-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-brampton-canada`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-dallas-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },

    // Sprint 1 (Apr 2026): 5 new US/UK city pages filling GSC gaps
    {
      url: `${baseUrl}/neet-coaching-leicester-uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-edison-nj-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-atlanta-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-washington-dc-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-boston-usa`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },

    // Sprint 2 (Apr 2026): 7 new city pages + 2 NRI hubs
    {
      url: `${baseUrl}/neet-coaching-ajman-uae`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-salmiya-kuwait`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-birmingham-uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-manchester-uk`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-calgary-canada`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    // P1 Canada NRI expansion
    {
      url: `${baseUrl}/neet-coaching-edmonton-canada`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-ottawa-canada`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/neet-coaching-brisbane-australia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-auckland-new-zealand`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-kuwait`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },
    {
      url: `${baseUrl}/neet-coaching-nri-bahrain`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    },

    // Phase 3B: Southeast Asian City Pages (3)
    {
      url: `${baseUrl}/neet-coaching-jakarta-indonesia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-ho-chi-minh-vietnam`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },
    {
      url: `${baseUrl}/neet-coaching-manila-philippines`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.87,
    },

    // Phase 4A: African City Pages (4)
    {
      url: `${baseUrl}/neet-coaching-nairobi-kenya`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-dar-es-salaam-tanzania`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-accra-ghana`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-kampala-uganda`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },

    // Phase 4B: Middle East Satellite City Pages (4)
    {
      url: `${baseUrl}/neet-coaching-al-ain-uae`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-salalah-oman`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-al-khobar-saudi-arabia`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },
    {
      url: `${baseUrl}/neet-coaching-al-wakrah-qatar`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.86,
    },

    // Lead Magnet Landing Pages
    {
      url: `${baseUrl}/free-neet-biology-chapter-weightage`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-mnemonics`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-pyq-analysis`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-ncert-notes`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-study-planner`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-diagram-collection`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-formula-sheet`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-mock-test`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-last-60-days-plan`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-error-log-template`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-neet-biology-revision-checklist`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
  ]

  // ============================================
  // Pages added 2026-02-23 — were missing from sitemap
  // ============================================
  const missingPages: string[] = [
    // Competitor comparison (non-city)
    'cerebrum-vs-aakash',
    'cerebrum-vs-allen',
    // Canonical best pages (kept — thin redirects point here)
    'best-neet-coaching-faridabad',
    'best-neet-coaching-ghaziabad',
    'best-neet-coaching-gurugram',
    'best-neet-coaching-noida',
    'best-online-coaching-neet-biology',
    // Canonical fee pages
    'neet-coaching-fees-faridabad',
    'neet-coaching-fees-ghaziabad',
    // Non-city batch/content pages
    'neet-dropper-batch',
    'test-series-schedule',
    'is-coaching-necessary-for-neet-biology',
    'is-online-neet-coaching-effective',
    // Content pages
    'neet-ecology-important-questions',
    'neet-genetics-preparation',
    'neet-human-physiology-guide',
    'neet-preparation-roadmap',
    'how-to-score-340-in-neet-biology',
    'neet-ug-2026',
    // Other
    'dr-shekhar-youtube-channel',
    'neet-coaching',
    // School-specific pages not yet consolidated
    // Board-specific pages
    'boards/west-bengal-hs',
    'boards/up-intermediate',
    'boards/gujarat-hsc',
    'boards/rajasthan-board',
    'boards/tamil-nadu-hsc',
    'boards/maharashtra-hsc',
    'boards/kerala-hse',
    'boards/telangana-intermediate',
    'boards/karnataka-puc',
    // Testimonial sub-pages
    'testimonials/sadhna-sirin-neet-2023-topper',
    // College predictor sub-pages
    'neet-college-predictor/government-medical-colleges',
    'neet-college-predictor/low-fees-medical-colleges',
    // Index/directory pages
    'states',
    'batch-types',
    // Language pages
    'hi',
    'ta',
    // Public tools
    'book-demo',
    'calculator',
    'whatsapp-course-selector',
    'neet-tools/omr-checker',
    'neet-tools/olympiad-practice',
    'neet-tools/quiz-competition',
    'neet-tools/quiz-competition/create',
    // Resources sub-pages
    'resources/test-generator',
    'resources/free',
    'resources/mock-tests',
    'resources/notes',
    'resources/doubt',
    'resources/questions',
    // MCQ sub-pages
    'neet-biology-mcq/pyq-2024',
    'neet-biology-mcq/analytics',
    'neet-biology-mcq/contribute',
    // Support
    // Study tools
    'study-with-me',
    // Landing pages
    'lp/neet-demo',
    // Seminar
    'neet-guidance-seminar/thank-you',
    // Company
  ]

  const missingPageRoutes: MetadataRoute.Sitemap = missingPages.map((page) => ({
    url: `${baseUrl}/${page}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Parent-guide pages — high-intent decision-stage content. Aimed at the
  // searcher who is actively comparing institutes for their child. Shipped
  // as NCR cluster (Gurugram + Delhi + Noida + Faridabad).
  const parentsGuidePages = [
    'parents-guide-neet-coaching-gurugram',
    'parents-guide-neet-coaching-delhi',
    'parents-guide-neet-coaching-noida',
    'parents-guide-neet-coaching-faridabad',
  ]
  const parentsGuideRoutes: MetadataRoute.Sitemap = parentsGuidePages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  // === Dynamic Route Generation ===

  // Campbell Biology chapters (56 chapters)
  const campbellChapterRoutes: MetadataRoute.Sitemap = allChapters.map((chapter) => ({
    url: `${baseUrl}/campbell-biology/${chapter.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Campbell Biology units (8 units)
  const campbellUnitRoutes: MetadataRoute.Sitemap = campbellUnits.map((unit) => ({
    url: `${baseUrl}/campbell-biology/unit/${unit.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // NEET coaching location pages
  const locationRoutes: MetadataRoute.Sitemap = getAllLocationSlugs().map((slug) => ({
    url: `${baseUrl}/neet-coaching/${slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // NOTE: Area sub-pages for gurugram, noida, faridabad, ghaziabad are now
  // generated dynamically above. Metro station and society pages redirect to city hubs.

  // Course detail pages
  const courseRoutes: MetadataRoute.Sitemap = detailedCourses.map((course) => ({
    url: `${baseUrl}/courses/${course.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // International country pages (main + courses sub-page)
  const internationalRoutes: MetadataRoute.Sitemap = SUPPORTED_COUNTRIES.flatMap((country) => [
    {
      url: `${baseUrl}/international/${country}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/international/${country}/courses`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ])

  // NRI student country pages
  const nriRoutes: MetadataRoute.Sitemap = nriCountriesList.map((country) => ({
    url: `${baseUrl}/nri-students/${country}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Location pages (city + city/locality)
  const allLocalities = getAllLocalities()
  const uniqueCities = [...new Set(allLocalities.map((loc) => loc.citySlug))]
  const cityRoutes: MetadataRoute.Sitemap = uniqueCities.map((city) => ({
    url: `${baseUrl}/locations/${city}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))
  const localityRoutes: MetadataRoute.Sitemap = allLocalities.map((loc) => ({
    url: `${baseUrl}/locations/${loc.citySlug}/${loc.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Biology definitions pages
  const definitionRoutes: MetadataRoute.Sitemap = biologyDefinitions.map((def) => ({
    url: `${baseUrl}/biology-definitions/${def.slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Blog category and tag pages
  const categoryRoutes: MetadataRoute.Sitemap = Object.keys(blogCategories).map((slug) => ({
    url: `${baseUrl}/blog/category/${slug}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  const tagRoutes: MetadataRoute.Sitemap = getAllTags()
    .filter(({ count }) => count >= 3)
    .map(({ tag }) => ({
      url: `${baseUrl}/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: lastUpdated,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    }))

  // State pages — noindexed (thin content), excluded from sitemap
  const stateRoutes: MetadataRoute.Sitemap = []

  // Competitor comparison pages
  const compareRoutes: MetadataRoute.Sitemap = Object.keys(COMPETITORS).map((competitor) => ({
    url: `${baseUrl}/compare/${competitor}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Local area SEO pages removed — all 72 [localSlug] routes now 301 redirect to parent city hubs

  // Biology notes for NEET chapter pages
  const biologyNotesChapters = [
    'molecular-basis-of-inheritance',
    'principles-of-inheritance-and-variation',
    'human-physiology',
    'evolution',
    'ecology',
    'cell-the-unit-of-life',
    'biomolecules',
    'cell-cycle-and-cell-division',
    'reproduction',
    'biotechnology',
    'biological-classification',
    'the-living-world',
    'plant-kingdom',
    'animal-kingdom',
    'morphology-of-flowering-plants',
    'anatomy-of-flowering-plants',
    'structural-organisation-in-animals',
    'plant-physiology',
  ]
  const biologyNotesRoutes: MetadataRoute.Sitemap = biologyNotesChapters.map((chapter) => ({
    url: `${baseUrl}/biology-notes-for-neet/${chapter}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Online biology classes pages
  const onlineCities = ['delhi', 'mumbai', 'bangalore', 'hyderabad', 'noida', 'gurugram', 'pune']
  const onlineCityRoutes: MetadataRoute.Sitemap = onlineCities.map((city) => ({
    url: `${baseUrl}/online-biology-classes-in/${city}`,
    lastModified: lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // International curriculum pages
  const curriculums = ['a-level', 'ib', 'ap', 'igcse']
  const curriculumRoutes: MetadataRoute.Sitemap = curriculums.map((curriculum) => ({
    url: `${baseUrl}/online-biology-classes-international/${curriculum}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // College predictor pages (tier 1 & 2 colleges)
  const collegeSlugify = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  const topColleges = (collegesData as { name: string; tier: number }[]).filter(
    (c) => c.tier === 1 || c.tier === 2
  )
  const collegeRoutes: MetadataRoute.Sitemap = topColleges.map((college) => ({
    url: `${baseUrl}/neet-college-predictor/college/${collegeSlugify(college.name)}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const facultyRoutes: MetadataRoute.Sitemap = facultyMembers.map((f) => ({
    url: `${baseUrl}/faculty/${f.id}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const successStoryRoutes: MetadataRoute.Sitemap = successStoriesData.map((s) => ({
    url: `${baseUrl}/success-stories/${s.id}`,
    lastModified: lastUpdated,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const mockTestRoutes: MetadataRoute.Sitemap = mockTests
    .filter((t) => t.isActive && t.slug)
    .map((t) => ({
      url: `${baseUrl}/mock-tests/${t.subject.toLowerCase()}/${t.slug}`,
      lastModified: lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  // Area sub-pages — all redirected to city hubs, excluded from sitemap
  const gurugramAreaRoutes: MetadataRoute.Sitemap = []
  const noidaAreaRoutes: MetadataRoute.Sitemap = []
  const faridabadAreaRoutes: MetadataRoute.Sitemap = []
  const ghaziabadAreaRoutes: MetadataRoute.Sitemap = []
  const southDelhiAreaRoutes: MetadataRoute.Sitemap = []
  const northDelhiAreaRoutes: MetadataRoute.Sitemap = []
  const eastDelhiAreaRoutes: MetadataRoute.Sitemap = []
  const westDelhiAreaRoutes: MetadataRoute.Sitemap = []

  // Combine all routes and deduplicate by URL
  const allRoutes = [
    ...campbellChapterRoutes,
    ...campbellUnitRoutes,
    ...locationRoutes,
    ...courseRoutes,
    ...internationalRoutes,
    ...nriRoutes,
    ...cityRoutes,
    ...localityRoutes,
    ...definitionRoutes,
    ...categoryRoutes,
    // tagRoutes removed 2026-06-11: /blog/tag/* pages are noindexed
    // (blog/tag/[slug]/page.tsx sets robots index:false) — submitting them
    // produced 67 "Submitted URL marked noindex" errors in GSC.
    ...stateRoutes,
    ...compareRoutes,
    // localAreaRoutes removed — redirected to parent city hubs
    ...gurugramAreaRoutes,
    ...noidaAreaRoutes,
    ...faridabadAreaRoutes,
    ...ghaziabadAreaRoutes,
    ...southDelhiAreaRoutes,
    ...northDelhiAreaRoutes,
    ...eastDelhiAreaRoutes,
    ...westDelhiAreaRoutes,
    ...biologyNotesRoutes,
    ...onlineCityRoutes,
    ...curriculumRoutes,
    ...collegeRoutes,
    ...facultyRoutes,
    ...successStoryRoutes,
    ...mockTestRoutes,
    ...routes,
    ...blogRoutes,
    ...seoLandingRoutes,
    ...missingPageRoutes,
    ...parentsGuideRoutes,
  ]

  // Deduplicate: later entries (hardcoded routes) take priority over dynamic ones
  const urlMap = new Map<string, MetadataRoute.Sitemap[0]>()
  for (const route of allRoutes) {
    urlMap.set(route.url, route)
  }

  // Remove URLs that are being 301 redirected — these waste crawl budget
  // Then normalize priorities so Google sees a meaningful hierarchy
  return Array.from(urlMap.values())
    .filter((route) => {
      const path = route.url.replace(baseUrl, '')
      return !isRedirectedPath(path) && !isNoindexedDoorway(path)
    })
    .map((route) => {
      const path = route.url.replace(baseUrl, '')
      return {
        ...route,
        priority: normalizePriority(path, route.priority ?? 0.5),
      }
    })
}
