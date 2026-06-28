/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const seoPageConsolidationRedirects = [
  // ============================================
  // About-page consolidation (May 2026 audit-fix Phase 4a)
  // ============================================
  // /about-cerebrum-biology-academy → /about
  // Reasoning: /about has more content (1017 vs 747 lines), live sub-routes
  // (/careers, /media), full layout.tsx metadata, and is the canonical short URL.
  // /about-cerebrum-biology-academy has no internal links from elsewhere on site.
  {
    source: '/about-cerebrum-biology-academy',
    destination: '/about',
    permanent: true,
  },

  // ============================================
  // Batch 1 sector entries consolidated into wildcard patterns in next.config.mjs
  // ============================================

  // ============================================
  // Batch 2: Gurgaon Locality Duplicates → /neet-coaching-gurgaon or /biology-classes-gurgaon
  // ============================================
  {
    source: '/biology-classes-dlf-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-golf-course-road-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-sohna-road-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-mg-road-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-palam-vihar-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-south-city-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-nirvana-country-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-new-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-cyber-city-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-golf-course-road-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sohna-road-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-city-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-nirvana-country-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-manesar-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-expressway-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/neet-coaching-new-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/neet-coaching-spr-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/neet-coaching-udyog-vihar-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },

  // ============================================
  // Batch 3: Gurgaon School-Specific Pages → /biology-classes-gurgaon
  // ============================================
  {
    source: '/biology-classes-dps-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-shri-ram-school-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-pathways-world-school',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gd-goenka-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-heritage-school-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-amity-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-scottish-high-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-suncity-school-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-manav-rachna-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-shikshanter-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-rps-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-euro-international-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-ryan-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-dav-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-lotus-valley-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-blue-bells-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },

  // ============================================
  // Batch 4: Gurgaon Intent/Variant Pages → /neet-coaching-gurgaon
  // ============================================
  {
    source: '/best-neet-coaching-in-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/how-to-prepare-for-neet-in-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-fees-in-gurugram',
    destination: '/neet-coaching-fee-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-reviews-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/girls-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/english-medium-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/small-batch-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/pcb-coaching-gurugram', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/aiims-coaching-gurugram', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/offline-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/weekend-neet-batch-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/evening-batch-neet-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/unacademy-alternative-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/neet-droppers-batch-gurgaon', destination: '/courses/neet-dropper', permanent: true },
  { source: '/biology-tutor-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/biology-home-tuition-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-10th-boards-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-12th-boards-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/biology-class-11-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/biology-class-12-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/biology-class-9-10-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/class-10-biology-tuition-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/class-11-biology-tuition-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/class-12-biology-tuition-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/class-11-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/class-12-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },

  // ============================================
  // Batch 5: Rohini Sector Pages → /biology-classes-rohini or /neet-coaching-north-delhi
  // ============================================
  {
    source: '/biology-tuition-rohini-west',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-dc-chowk-rohini',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },

  // ============================================
  // Batch 6: Delhi School-Specific Pages → nearest hub
  // ============================================
  {
    source: '/biology-classes-bal-bharati-students',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-sanskriti-school',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-springdales-school',
    destination: '/neet-coaching-centre',
    permanent: true,
  },
  {
    source: '/biology-coaching-sanskriti-school',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-modern-school',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-sardar-patel-vidyalaya',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-mothers-international-school',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-vasant-valley-school',
    destination: '/biology-tutor-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-dps-rk-puram',
    destination: '/biology-tutor-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-dps-vasant-kunj',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-presidium-school',
    destination: '/neet-coaching-centre',
    permanent: true,
  },
  {
    source: '/biology-tuition-ryan-international',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },

  // ============================================
  // Batch 7: Delhi Locality Thin Pages → nearest hub
  // Far-from-center localities with no unique content
  // ============================================
  {
    source: '/biology-classes-alaknanda',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-golf-links',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-jor-bagh',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-gulmohar-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-munirka',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-safdarjung-enclave',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-east-of-kailash',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-panchsheel-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-lodhi-colony',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-moti-bagh',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-nehru-place',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-sarojini-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-defence-colony',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-ring-road-south-extension',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-class-11-south-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-class-12-south-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-uttam-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-patel-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-tilak-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  { source: '/biology-classes-karol-bagh', destination: '/neet-coaching-centre', permanent: true },
  {
    source: '/biology-classes-shalimar-bagh',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-ashok-vihar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-mayur-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  { source: '/biology-classes-dwarka', destination: '/neet-coaching-west-delhi', permanent: true },
  {
    source: '/biology-classes-crossings-republik',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-indirapuram',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  { source: '/biology-classes-rewari', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/biology-classes-mahendragarh',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-punjabi-bagh',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },

  // ============================================
  // Batch 8: NEET Coaching Locality Pages → nearest hub
  // ============================================
  {
    source: '/neet-coaching-ashok-vihar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-model-town',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-prashant-vihar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-netaji-subhash-place',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-paschim-vihar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-punjabi-bagh',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-rajouri-garden',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-nirman-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-kaushambi', destination: '/neet-coaching-noida', permanent: true },
  {
    source: '/neet-coaching-vaishali-ghaziabad',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-vasundhara-ghaziabad',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-greater-noida-west',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  { source: '/neet-coaching-cr-park', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-kalkaji', destination: '/neet-coaching-south-delhi', permanent: true },
  {
    source: '/neet-coaching-malviya-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-hauz-khas',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-greater-kailash',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-rk-puram', destination: '/neet-coaching-south-delhi', permanent: true },
  {
    source: '/neet-coaching-vasant-vihar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },

  // ============================================
  // Batch 9: Biology Tutor Location Pages → nearest hub
  // ============================================
  {
    source: '/biology-tutor-west-delhi',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },

  // ============================================
  // Batch 10: SEO URL Aliases → Canonical Pages
  // ============================================
  {
    source: '/neet-coaching-comparison',
    destination: '/best-neet-biology-coaching',
    permanent: true,
  },
]

// ============================================
// /neet-coaching/[location] → hardcoded hub pages
// Dynamic route duplicates existing hub pages at different URLs
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const neetCoachingLocationRedirects = [
  {
    source: '/neet-coaching/gurgaon-sector-:num',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/neet-coaching/gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/neet-coaching/dwarka', destination: '/neet-coaching-dwarka', permanent: true },
  { source: '/neet-coaching/rohini', destination: '/neet-coaching-rohini', permanent: true },
  {
    source: '/neet-coaching/greater-kailash',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  { source: '/neet-coaching/noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching/bangalore', destination: '/neet-coaching-bangalore', permanent: true },
  { source: '/neet-coaching/chennai', destination: '/neet-coaching-chennai', permanent: true },
  { source: '/neet-coaching/hyderabad', destination: '/neet-coaching-hyderabad', permanent: true },
  { source: '/neet-coaching/mumbai', destination: '/neet-coaching-mumbai', permanent: true },
  { source: '/neet-coaching/pune', destination: '/neet-coaching-pune', permanent: true },
  { source: '/neet-coaching/kolkata', destination: '/neet-coaching-kolkata', permanent: true },
  { source: '/neet-coaching/ahmedabad', destination: '/neet-coaching-ahmedabad', permanent: true },
  { source: '/neet-coaching/jaipur', destination: '/neet-coaching-jaipur', permanent: true },
  { source: '/neet-coaching/lucknow', destination: '/neet-coaching-lucknow', permanent: true },
  { source: '/neet-coaching/agra', destination: '/neet-coaching-agra', permanent: true },
  {
    source: '/neet-coaching/chandigarh',
    destination: '/neet-coaching-chandigarh',
    permanent: true,
  },
]

// ============================================
// [localSlug] thin pages → nearest hub page
// 58 thin location pages consolidated into stronger hubs
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const localAreaPageRedirects = [
  // --- Gurugram hub ---
  {
    source: '/best-biology-coaching-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-43',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-coaching-gurgaon-sector-45',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-biology-gurgaon-sector-57',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },

  // --- Noida hub ---
  { source: '/best-biology-tuition-noida', destination: '/neet-coaching-noida', permanent: true },
  {
    source: '/neet-coaching-noida-sector-15',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida-sector-50',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida-sector-76',
    destination: '/neet-coaching-noida',
    permanent: true,
  },

  // --- Faridabad hub ---
  {
    source: '/biology-coaching-faridabad-neet',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },

  // --- Ghaziabad hub ---
  {
    source: '/best-biology-teacher-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-coaching-vasundhara-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-crossings-republik',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-mohan-nagar',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  { source: '/neet-coaching-wave-city', destination: '/neet-coaching-ghaziabad', permanent: true },

  // --- Centre hub ---
  {
    source: '/biology-coaching-central-delhi',
    destination: '/neet-coaching-centre',
    permanent: true,
  },

  // --- Greater Noida ---

  // --- Rohini hub ---
  {
    source: '/neet-biology-coaching-rohini-sector-1',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-tuition-rohini-sector-3',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-3',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-classes-rohini-sector-7',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-7',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-8',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-9',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-coaching-rohini-sector-11',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-11',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-13',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-14',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-teacher-rohini-sector-16',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-16',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-biology-rohini-sector-22',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-24',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-24',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-coaching-shalimar-bagh',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },

  // --- Pitampura ---
  {
    source: '/neet-coaching-pitampura-delhi',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },

  // --- South Delhi hub ---
  {
    source: '/neet-coaching-greater-kailash-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-lajpat-nagar-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-hauz-khas-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-malviya-nagar-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-kalkaji-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-nehru-place-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-defence-colony-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-extension-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-green-park-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },

  // --- West Delhi hub ---
  {
    source: '/neet-coaching-rajouri-garden-delhi',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-punjabi-bagh-delhi',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-uttam-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-vikaspuri', destination: '/neet-coaching-west-delhi', permanent: true },
  {
    source: '/neet-coaching-tilak-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },

  // --- East Delhi hub ---
  {
    source: '/neet-coaching-nirman-vihar-delhi',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-mayur-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-preet-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-laxmi-nagar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-shahdara', destination: '/neet-coaching-east-delhi', permanent: true },

  // --- Dwarka hub ---
  { source: '/neet-coaching-dwarka-delhi', destination: '/neet-coaching-dwarka', permanent: true },
  {
    source: '/neet-coaching-dwarka-sector-6',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-sector-7',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-sector-10',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-sector-12',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-sector-19',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-sector-22',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-sector-4',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-sector-21',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },

  // --- Bangalore hub ---
  {
    source: '/biology-coaching-electronic-city-bangalore',
    destination: '/neet-coaching-bangalore',
    permanent: true,
  },
  {
    source: '/neet-biology-coaching-marathahalli-bangalore',
    destination: '/neet-coaching-bangalore',
    permanent: true,
  },
  {
    source: '/biology-coaching-yelahanka-bangalore',
    destination: '/neet-coaching-bangalore',
    permanent: true,
  },
  {
    source: '/neet-coaching-hebbal-bangalore',
    destination: '/neet-coaching-bangalore',
    permanent: true,
  },

  // --- Noida expansion ---
  {
    source: '/neet-coaching-gaur-city-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },

  // --- Ghaziabad expansion ---

  // --- Punjab/Chandigarh ---
  { source: '/neet-coaching-mohali-punjab', destination: '/neet-coaching-mohali', permanent: true },
  {
    source: '/neet-coaching-panchkula-haryana',
    destination: '/neet-coaching-panchkula',
    permanent: true,
  },
  {
    source: '/neet-coaching-zirakpur-punjab',
    destination: '/neet-coaching-zirakpur',
    permanent: true,
  },
  {
    source: '/neet-coaching-ludhiana-punjab',
    destination: '/neet-coaching-ludhiana',
    permanent: true,
  },
  {
    source: '/neet-coaching-jalandhar-punjab',
    destination: '/neet-coaching-jalandhar',
    permanent: true,
  },
  {
    source: '/neet-coaching-amritsar-punjab',
    destination: '/neet-coaching-amritsar',
    permanent: true,
  },
]

// ============================================
// GSC "Not found (404)" cleanup — remaining 404s
// Most of the 219 reported URLs are already handled by existing
// redirects (308). These expanded patterns cover the remaining ~100+ that return 404.
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const gsc404CleanupRedirects = [
  // Phase C (May 2026) note: 5 Rohini school-doorway slugs already redirect
  // to /neet-coaching-rohini via rohiniSchoolStudentRedirects (below). No
  // additions here — adding duplicates here triggers audit-redirects warnings.

  // --- /cities/ phantom routes (route doesn't exist) ---
  // Specific international city redirects MUST come before the catch-all
  { source: '/cities/neet-coaching-london-uk', destination: '/international', permanent: true },
  {
    source: '/cities/neet-coaching-melbourne-australia',
    destination: '/international',
    permanent: true,
  },
  {
    source: '/cities/neet-coaching-sydney-australia',
    destination: '/international',
    permanent: true,
  },
  // Catch-all for remaining /cities/ routes (AFTER specific ones above)
  { source: '/cities/:path*', destination: '/neet-coaching', permanent: true },

  // --- State/region pages (no dedicated pages exist) ---
  { source: '/neet-coaching-maharashtra', destination: '/neet-coaching', permanent: true },
  { source: '/neet-coaching-gujarat', destination: '/neet-coaching', permanent: true },
  { source: '/neet-coaching-kerala', destination: '/neet-coaching', permanent: true },
  { source: '/neet-coaching-tier2-cities', destination: '/neet-coaching', permanent: true },
  { source: '/neet-coaching-near-metro', destination: '/neet-coaching', permanent: true },
  { source: '/nri-coaching', destination: '/neet-coaching', permanent: true },

  // --- Standalone pages that don't exist ---
  { source: '/ncert-solutions', destination: '/biology-notes', permanent: true },
  {
    source: '/neet-foundation-class-11-gurugram',
    destination: '/courses/class-11',
    permanent: true,
  },

  // --- Biology tutor curriculum/city pages with no route ---
  { source: '/biology-tutor-cbse', destination: '/biology-tutor', permanent: true },
  { source: '/biology-tutor-icse', destination: '/biology-tutor', permanent: true },
  { source: '/biology-tutor-trivandrum', destination: '/biology-tutor', permanent: true },
  { source: '/biology-tutor-kochi', destination: '/biology-tutor', permanent: true },

  // --- Nested location sub-routes that don't exist ---
  {
    source: '/locations/bangalore/:path*',
    destination: '/neet-coaching-bangalore',
    permanent: true,
  },

  // --- Blog posts that no longer exist ---
  { source: '/blog/neet-2026-preparation-90-day-strategy', destination: '/blog', permanent: true },
  {
    source: '/blog/neet-preparation-tips-delhi-ncr-students',
    destination: '/blog',
    permanent: true,
  },
  { source: '/blog/kota-vs-online-neet-coaching-2025', destination: '/blog', permanent: true },
  {
    source: '/blog/neet-biology-syllabus-2025-complete-guide',
    destination: '/blog',
    permanent: true,
  },

  // ============================================
  // Wildcard redirects for common 404 patterns (219 GSC 404s)
  // These catch variations in phrasing that generate duplicate/thin pages
  // ============================================

  // --- NEET coaching variations with "in" prefix ---
  { source: '/neet-coaching-in-:slug', destination: '/neet-coaching', permanent: true },

  // --- REMOVED: Overly-broad wildcards that were destroying real pages ---
  // These wildcards were 301-redirecting 40+ real location pages to generic hubs,
  // preventing Google from indexing them. Removed 2026-02-23.
  //
  // REMOVED: '/best-neet-coaching-:slug' → killed 7 real pages (delhi-ncr, gurugram, noida, etc.)
  // REMOVED: '/biology-tuition-:slug' → killed 11 real pages (noida, faridabad, south-delhi, etc.)
  // REMOVED: '/neet-preparation-:slug' → killed 3 real pages (guide, roadmap, timetable)
  // REMOVED: '/online-neet-:slug' → killed 9 real pages (classes-faridabad, coaching-ghaziabad, etc.)
  // REMOVED: '/neet-test-series-:slug' → killed 5 real pages (gurugram, noida, faridabad, etc.)
  // REMOVED: '/neet-mock-test-:slug' → killed 1 real page (neet-mock-test-free)
  // REMOVED: '/biology-coaching-:slug-delhi' → killed Delhi locality pages
  // REMOVED: '/biology-notes-:slug' → killed biology-notes-for-neet
  // REMOVED: '/courses/neet-:slug' → potentially killed course sub-pages
  //
  // If you need redirects for specific non-existent URLs, add them as EXPLICIT redirects below.

  // --- NEET classes vs coaching (safe - no real pages with this prefix) ---
  { source: '/neet-classes-:slug', destination: '/neet-coaching', permanent: true },

  // --- NEET coaching with India suffix ---
  // Wildcard '/neet-coaching-:slug-india' removed 2026-06-11: the "no real pages"
  // assumption was wrong — /neet-coaching-{north,south,east,west}-india are live
  // 586-line regional hubs (created Dec 2025) that the wildcard was shadowing.

  // --- Course slug consolidation ---
  {
    source: '/courses/class-9th-foundation',
    destination: '/courses/class-9-foundation',
    permanent: true,
  },

  // --- Navigation/informational pages redirects ---
  { source: '/teachers', destination: '/about', permanent: true },
  { source: '/schedule', destination: '/timetable', permanent: true },
  { source: '/centres', destination: '/neet-coaching', permanent: true },
  { source: '/branches', destination: '/neet-coaching', permanent: true },

  // --- /centers/ phantom routes (old URL pattern, now /locations/) ---
  { source: '/centers', destination: '/neet-coaching', permanent: true },
  { source: '/centers/:path*', destination: '/neet-coaching', permanent: true },

  // --- Standalone pages that moved or don't exist ---

  // ============================================
  // COMPREHENSIVE GSC 404 CLEANUP — Feb 27, 2026
  // Covers ALL 726 reported 404 URLs from Google Search Console
  // ============================================

  // --- WILDCARD: biology-classes sub-area routes (catches ~50 URLs) ---
  // Parent pages exist but sub-area routes don't (e.g., /biology-classes-dwarka/sector-7)
  {
    source: '/biology-classes-vasant-kunj/:path+',
    destination: '/biology-classes',
    permanent: true,
  },
  { source: '/biology-classes-dwarka/:path+', destination: '/biology-classes', permanent: true },
  { source: '/biology-classes-rewari/:path+', destination: '/biology-classes', permanent: true },
  {
    source: '/biology-classes-mahendragarh/:path+',
    destination: '/biology-classes',
    permanent: true,
  },
  {
    source: '/biology-classes-defence-colony/:path+',
    destination: '/biology-classes',
    permanent: true,
  },
  {
    source: '/biology-classes-ashok-vihar/:path+',
    destination: '/biology-classes',
    permanent: true,
  },
  {
    source: '/biology-classes-karol-bagh/:path+',
    destination: '/biology-classes',
    permanent: true,
  },
  {
    source: '/biology-classes-nehru-place/:path+',
    destination: '/biology-classes',
    permanent: true,
  },
  // NOTE: model-town, south-delhi, manesar, laxmi-nagar, preet-vihar, pitampura,
  // rohini, green-park, noida /:path+ wildcards REMOVED — already covered by
  // /:area* wildcards in next.config.mjs (inline redirects run first).
  // Similarly biology-tuition-* /:path+ wildcards REMOVED — covered by
  // /:area+ wildcards in next.config.mjs.

  // --- WILDCARD: biology-notes chapter routes (catches ~25 URLs) ---
  {
    source: '/biology-notes/class-11/:path*',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },
  {
    source: '/biology-notes/class-12/:path*',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },

  // --- Standalone biology-classes pages that don't exist ---
  {
    source: '/biology-classes-gurgaon-sector-31',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-61',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-47',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-8',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-15',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-7',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-3',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },

  // --- Double-prefix bug: biology-classes-biology-classes-* (schema generation bug) ---

  // --- School-specific NEET coaching pages ---

  // --- Biology tutor pages that don't exist ---

  // --- Course pages that don't exist ---

  // --- Olympiad preparation pages ---

  // --- Standalone pages ---
  {
    source: '/best-neet-biology-coaching-delhi-ncr',
    destination: '/neet-coaching',
    permanent: true,
  },

  // --- Resources sub-pages that don't exist ---

  // --- Blog posts that no longer exist ---

  // --- Additional non-existent pages from Feb 27 crawl data ---
  // removed: /neet-coaching-reviews-gurugram — already in seoPage → /neet-coaching-gurgaon
  // removed: /neet-coaching-malviya-nagar-delhi — already in localArea → /neet-coaching-south-delhi
  { source: '/about/faculty', destination: '/faculty', permanent: true },
  { source: '/courses/dropper', destination: '/courses/neet-dropper', permanent: true },
  {
    source: '/blog/maharashtra-mbbs-counselling-dmer-guide-2025',
    destination: '/blog',
    permanent: true,
  },
  // REMOVED: 4 blog redirects that were hiding real blog posts with high-value content
  // /blog/how-to-score-700-plus-in-neet — EXISTS in content/blog/
  // /blog/neet-application-form-2026 — EXISTS in content/blog/
  // /blog/human-physiology-neet-complete-notes — EXISTS in content/blog/
  // /blog/top-private-medical-colleges-india-fees-cutoff-rankings — EXISTS in content/blog/
  // removed: /ncert-solutions duplicate — already in gsc404 → /biology-notes

  // --- Feb 27 crawl batch 2: more non-existent pages ---

  // biology-notes chapter sub-routes (redirect to biology-notes-for-neet)
  {
    source: '/biology-notes/locomotion-movement',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },
  {
    source: '/biology-notes/animal-kingdom',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },
  {
    source: '/biology-notes/reproductive-health',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },
  {
    source: '/biology-notes/breathing-exchange-gases',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },
  {
    source: '/biology-notes/excretory-products',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },
  {
    source: '/biology-notes/structural-organisation-animals',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },
  {
    source: '/biology-notes/human-health-disease',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },
  {
    source: '/biology-notes/chemical-coordination',
    destination: '/biology-notes-for-neet',
    permanent: true,
  },

  // More standalone biology-classes pages that don't exist
  {
    source: '/biology-classes-noida-sector-62',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-82',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-50',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-14',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-4',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-5',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },

  // Olympiad preparation pages

  // School-specific coaching pages

  // Standalone pages (MOVED /courses/intensive-neet-biology to next.config.mjs inline redirects)

  // More resources sub-pages

  // REMOVED: /sitemap → /sitemap.xml — Next.js generates sitemap.xml from sitemap.ts,
  // and /sitemap resolves to the same route, creating a redirect loop

  // --- Policy page variants ---
  { source: '/privacy', destination: '/privacy-policy', permanent: true },
  { source: '/terms', destination: '/terms-of-service', permanent: true },
]

// ============================================
// Thin Page Consolidation Redirects (301→~80 strong pages)
// PURPOSE: Reduce 301 Delhi NCR pages to ~80 by redirecting
// hyper-specific school/colony/lane pages to their parent hub.
// This concentrates authority and fixes "crawled not indexed" issue.
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const thinPageConsolidationRedirects = [
  // --- South Delhi micro-localities → /neet-coaching-south-delhi ---
  {
    source: '/neet-coaching-alaknanda',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-chittaranjan-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-of-kailash',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-jangpura', destination: '/neet-coaching-south-delhi', permanent: true },
  {
    source: '/neet-coaching-kailash-colony',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-maharani-bagh',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-munirka', destination: '/neet-coaching-south-delhi', permanent: true },
  {
    source: '/neet-coaching-nehru-place',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-okhla', destination: '/neet-coaching-south-delhi', permanent: true },
  {
    source: '/neet-coaching-safdarjung',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-sarvapriya-vihar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-shahpur-jat',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-shanti-niketan',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  // removed: /neet-coaching-vasant-vihar — already in seoPage
  {
    source: '/neet-coaching-sarita-vihar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-jor-bagh', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-mehrauli', destination: '/neet-coaching-south-delhi', permanent: true },
  {
    source: '/neet-coaching-lado-sarai',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-chattarpur',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-alaknanda',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-cr-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-munirka',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  { source: '/biology-coaching-okhla', destination: '/neet-coaching-south-delhi', permanent: true },
  {
    source: '/biology-coaching-nehru-place',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-sarita-vihar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },

  // --- North Delhi micro-localities → /neet-coaching-north-delhi ---
  {
    source: '/neet-coaching-civil-lines',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-kamla-nagar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-shakti-nagar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  { source: '/neet-coaching-timarpur', destination: '/neet-coaching-north-delhi', permanent: true },
  {
    source: '/neet-coaching-hudson-lines',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-kohat-enclave',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-adarsh-nagar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  // removed: /neet-coaching-ashok-vihar — already in seoPage
  {
    source: '/biology-coaching-civil-lines',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-kamla-nagar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },

  // --- East Delhi micro-localities → /neet-coaching-east-delhi ---
  // removed: /neet-coaching-preet-vihar, /neet-coaching-nirman-vihar — already in earlier arrays
  {
    source: '/neet-coaching-vivek-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-anand-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-lakshmi-nagar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-patparganj',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  // removed: /neet-coaching-shahdara — already in localArea
  {
    source: '/neet-coaching-gandhi-nagar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-geeta-colony',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-laxmi-nagar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-preet-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },

  // --- West Delhi micro-localities → /neet-coaching-west-delhi ---
  // removed: rajouri-garden, tilak-nagar, vikaspuri, uttam-nagar — already in earlier arrays
  {
    source: '/neet-coaching-hari-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-kirti-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-patel-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-rajouri-garden',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-janakpuri',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },

  // --- Gurugram thin sectors → /neet-coaching-gurgaon ---
  {
    source: '/neet-coaching-sector-14-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-15-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-22-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-23-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-40-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-45-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-49-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-56-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-57-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-82-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/neet-coaching-manesar', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/neet-coaching-palam-vihar-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  // removed: /neet-coaching-south-city-gurgaon — already in seoPage

  // --- Noida thin sectors → /neet-coaching-noida ---
  {
    source: '/neet-coaching-sector-15-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-16-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-25-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-37-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-44-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-50-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-76-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-93-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-104-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-120-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-137-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  { source: '/neet-coaching-greater-noida', destination: '/neet-coaching-noida', permanent: true },

  // --- Faridabad thin pages → /neet-coaching-faridabad ---
  {
    source: '/neet-coaching-sector-14-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-15-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-16-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-21-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-28-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-37-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-nit-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  { source: '/neet-coaching-ballabgarh', destination: '/neet-coaching-faridabad', permanent: true },

  // --- Ghaziabad thin pages → /neet-coaching-ghaziabad ---
  // removed: vaishali, vasundhara, kaushambi — already in seoPage → /biology-classes-noida
  {
    source: '/neet-coaching-raj-nagar-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },

  // --- School-specific thin pages → nearest hub ---
  {
    source: '/neet-coaching-near-:school-school-:slug',
    destination: '/neet-coaching',
    permanent: true,
  },
  {
    source: '/biology-coaching-near-:school-school-:slug',
    destination: '/neet-coaching',
    permanent: true,
  },
  { source: '/neet-coaching-near-dps-:slug', destination: '/neet-coaching', permanent: true },
  {
    source: '/neet-coaching-near-modern-school-:slug',
    destination: '/neet-coaching',
    permanent: true,
  },
  {
    source: '/neet-coaching-near-sanskriti-school',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-near-springdales-:slug',
    destination: '/neet-coaching',
    permanent: true,
  },
  {
    source: '/neet-coaching-near-amity-:slug',
    destination: '/neet-coaching-noida',
    permanent: true,
  },

  // --- Generic "best" variations → hub ---
  // REMOVED: /best-biology-coaching-:slug → /neet-coaching
  // This wildcard was catching 7 real pages (best-biology-coaching-delhi-ncr, -faridabad, -gurugram, etc.)
  // REMOVED: /top-neet-coaching-:slug → /neet-coaching
  // This was catching real pages like /top-10-neet-coaching-gurugram, /top-5-neet-coaching-gurugram
  {
    source: '/affordable-neet-coaching-:slug',
    destination: '/neet-coaching-fees',
    permanent: true,
  },
  { source: '/cheap-neet-coaching-:slug', destination: '/neet-coaching-fees', permanent: true },
  { source: '/neet-coaching-fees-:slug', destination: '/neet-coaching-fees', permanent: true },
  { source: '/neet-coaching-reviews-:slug', destination: '/results', permanent: true },
]

// ============================================
// GSC 404 Cleanup — Batch 3 (March 2026)
// Nested locality sub-pages + misc 404s from GSC export
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const gsc404CleanupBatch3Redirects = [
  // --- Biology Classes nested locality sub-pages → parent hub ---
  {
    source: '/biology-classes-ashok-vihar/phase-1',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-ashok-vihar/phase-2',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-ashok-vihar/wazirpur',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-defence-colony/andrews-ganj',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-defence-colony/jangpura',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-dwarka/dwarka-mor',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-dwarka/sector-21',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-dwarka/sector-7',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-green-park/extension',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-karol-bagh/cp',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-laxmi-nagar/nirman-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-mahendragarh/city',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-manesar/imt',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-manesar/sector-8',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-model-town/part-1',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-nehru-place/cr-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-nehru-place/kalkaji',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-noida/sector-62',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-pitampura/kohat-enclave',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-preet-vihar/karkardooma',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-rewari/city',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini/paschim-vihar',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini/prashant-vihar',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-south-delhi/gk',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-south-delhi/hauz-khas',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-south-delhi/malviya-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-vasant-kunj/sector-b',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-vasant-kunj/sector-c',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },

  // --- Biology Tuition nested locality sub-pages → parent hub ---
  {
    source: '/biology-tuition-east-delhi/laxmi-nagar',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-east-delhi/mayur-vihar',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-east-delhi/patparganj',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-east-delhi/preet-vihar',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-east-delhi/shahdara',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-gurgaon/dlf-phase-3',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-gurgaon/golf-course-road',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-gurgaon/sector-14',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-gurgaon/sector-56',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-gurgaon/sohna-road',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-noida/sector-137',
    destination: '/biology-tutor-noida',
    permanent: true,
  },
  {
    source: '/biology-tuition-noida/sector-18',
    destination: '/biology-tutor-noida',
    permanent: true,
  },
  {
    source: '/biology-tuition-noida/sector-44',
    destination: '/biology-tutor-noida',
    permanent: true,
  },
  {
    source: '/biology-tuition-noida/sector-50',
    destination: '/biology-tutor-noida',
    permanent: true,
  },
  {
    source: '/biology-tuition-noida/sector-62',
    destination: '/biology-tutor-noida',
    permanent: true,
  },
  {
    source: '/biology-tuition-north-delhi/ashok-vihar',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-north-delhi/model-town',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-north-delhi/pitampura',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-north-delhi/rohini',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-north-delhi/shalimar-bagh',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-west-delhi/dwarka',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-west-delhi/janakpuri',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-west-delhi/patel-nagar',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-west-delhi/rajouri-garden',
    destination: '/biology-tutor',
    permanent: true,
  },
  {
    source: '/biology-tuition-west-delhi/uttam-nagar',
    destination: '/biology-tutor',
    permanent: true,
  },

  // --- Unique entries (not duplicated in earlier arrays) ---
  {
    source: '/biology-olympiad-coaching-faridabad',
    destination: '/biology-olympiad-coaching',
    permanent: true,
  },
  {
    source: '/biology-olympiad-coaching-noida',
    destination: '/biology-olympiad-coaching',
    permanent: true,
  },
  {
    source: '/neet-coaching-panchsheel-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-vasant-kunj',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  { source: '/neet-dropper-batch-delhi', destination: '/dropper', permanent: true },
  {
    source: '/neet-foundation-class-11-faridabad',
    destination: '/courses/foundation',
    permanent: true,
  },
  { source: '/one-year-dropper-course-faridabad', destination: '/dropper', permanent: true },
  {
    source: '/international/ca/courses/bc-biology',
    destination: '/international',
    permanent: true,
  },
  {
    source: '/international/ie/courses/hpat-biology',
    destination: '/international',
    permanent: true,
  },
  {
    source: '/international/sg/courses/a-level-h2-biology',
    destination: '/international',
    permanent: true,
  },
  {
    source: '/international/sg/courses/ip-biology',
    destination: '/international',
    permanent: true,
  },
  {
    source: '/international/sg/courses/o-level-biology',
    destination: '/international',
    permanent: true,
  },
  {
    source: '/international/sg/courses/sbo-olympiad',
    destination: '/international',
    permanent: true,
  },
  // MOVED: /cities/neet-coaching-{london,melbourne,sydney} to gsc404CleanupRedirects (before catch-all)
  { source: '/cbo-preparation/', destination: '/biology-olympiad-coaching', permanent: true },
  {
    source: '/german-biology-olympiad/',
    destination: '/biology-olympiad-coaching',
    permanent: true,
  },
  { source: '/jbo-preparation/', destination: '/biology-olympiad-coaching', permanent: true },
  // Removed conflicting redirect for /online-neet-biology-classes — kept in
  // cannibalizationConsolidationRedirects which routes to the more specific
  // /biology-classes-for-neet landing page (semantically accurate).

  // --- Crawled-not-indexed: missing pages (March 2026 batch) ---
  {
    source: '/biology-classes-gurgaon-sector-60',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/blog/nri-quota-mbbs-maharashtra-complete-guide-2025',
    destination: '/blog',
    permanent: true,
  },
  { source: '/international/hk', destination: '/international', permanent: true },
  {
    source: '/locations/delhi/hauz-khas',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },

  // --- B5 route audit: redirect pages moved from page.tsx to config (March 2026) ---
  { source: '/company', destination: '/about', permanent: true },
  { source: '/login', destination: '/sign-in', permanent: true },
  { source: '/neet-readiness-quiz', destination: '/neet-tools', permanent: true },
  { source: '/support', destination: '/contact', permanent: true },
  { source: '/about/results', destination: '/company/results', permanent: true },

  // --- B5 route audit: empty pages (March 2026) ---
  {
    source: '/biology-teacher-near-me-noida',
    destination: '/biology-tutor-noida',
    permanent: true,
  },
  { source: '/neet-updates', destination: '/blog', permanent: true },
  { source: '/testimonials/neet-success-story', destination: '/testimonials', permanent: true },
]

// ============================================
// Hub Page Consolidation Redirects (March 2026)
// Merging thin results/success pages into /results/ hub
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const hubPageConsolidationRedirects = []

// ============================================
// Cannibalization Consolidation Redirects (March 2026)
// Merges competing pages targeting same keywords into single canonical
// MUST be registered BEFORE thinPageConsolidationRedirects (which has wildcards)
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const cannibalizationConsolidationRedirects = [
  // About page consolidation

  // ============================================
  // Best/Top/Which/Affordable coaching → best-neet-coaching-[city]
  // 4-5 pages per city all compete for "best neet coaching [city]"
  // ============================================

  // Faridabad (4 redirects)
  {
    source: '/top-5-neet-coaching-faridabad',
    destination: '/best-neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/top-10-neet-coaching-faridabad',
    destination: '/best-neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/which-neet-coaching-is-best-in-faridabad',
    destination: '/best-neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/affordable-neet-coaching-faridabad',
    destination: '/best-neet-coaching-faridabad',
    permanent: true,
  },

  // Ghaziabad (3 redirects)
  {
    source: '/top-10-neet-coaching-ghaziabad',
    destination: '/best-neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/which-neet-coaching-is-best-in-ghaziabad',
    destination: '/best-neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/affordable-neet-coaching-ghaziabad',
    destination: '/best-neet-coaching-ghaziabad',
    permanent: true,
  },

  // Gurugram (4 redirects)

  // Greater Noida (3 redirects)
  {
    source: '/top-10-neet-coaching-greater-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/which-neet-coaching-is-best-in-greater-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/affordable-neet-coaching-greater-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },

  // Noida (3 redirects)
  {
    source: '/top-10-neet-coaching-noida',
    destination: '/best-neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/which-neet-coaching-is-best-in-noida',
    destination: '/best-neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/affordable-neet-coaching-noida',
    destination: '/best-neet-coaching-noida',
    permanent: true,
  },

  // Delhi — no best-neet-coaching-delhi page, redirect to root

  // ============================================
  // Biology tuition → tutor consolidation
  // "tutor" pages have more coverage (33 vs 12), keep tutor as canonical
  // ============================================
  {
    source: '/biology-tuition-class-11-noida',
    destination: '/biology-tutor-class-11-cbse',
    permanent: true,
  },
  {
    source: '/biology-tuition-class-12-noida',
    destination: '/biology-tutor-class-12-cbse',
    permanent: true,
  },

  // ============================================
  // AEO consolidation — "best biology faculty / best biology teacher" variants
  // Synonyms route to the canonical India hub at /best-biology-teacher-india
  // ============================================
  {
    source: '/best-biology-faculty',
    destination: '/best-biology-teacher-india',
    permanent: true,
  },
  {
    source: '/best-biology-faculty-india',
    destination: '/best-biology-teacher-india',
    permanent: true,
  },
  {
    source: '/best-biology-faculty-for-neet',
    destination: '/best-biology-teacher-for-neet',
    permanent: true,
  },
  {
    source: '/top-biology-teacher-india',
    destination: '/best-biology-teacher-india',
    permanent: true,
  },
  {
    source: '/top-biology-faculty-india',
    destination: '/best-biology-teacher-india',
    permanent: true,
  },
  {
    source: '/which-biology-coaching-is-best',
    destination: '/best-biology-teacher-india',
    permanent: true,
  },
  {
    source: '/who-is-best-biology-teacher-india',
    destination: '/best-biology-teacher-india',
    permanent: true,
  },
  {
    source: '/who-is-the-best-biology-teacher-in-india',
    destination: '/best-biology-teacher-india',
    permanent: true,
  },
  {
    source: '/best-biology-teacher',
    destination: '/best-biology-teacher-india',
    permanent: true,
  },
  // NOTE: /best-biology-tutor-india redirect removed 2026-06-11 — a real page
  // was created at that route on 2026-06-07 (c6d41b59) and the May 13 redirect
  // was shadowing it (same bug class as the /faculty and /testimonials incidents).

  // ============================================
  // NEET phrase consolidation — synonyms route to canonical landings
  // ============================================
  {
    source: '/neet-biology-classes-online',
    destination: '/biology-classes-for-neet',
    permanent: true,
  },
  {
    source: '/online-neet-biology-classes',
    destination: '/biology-classes-for-neet',
    permanent: true,
  },
  { source: '/best-neet-classes', destination: '/best-biology-classes-for-neet', permanent: true },
  {
    source: '/best-online-neet-classes',
    destination: '/best-biology-classes-for-neet',
    permanent: true,
  },
  {
    source: '/best-online-neet-biology-classes',
    destination: '/best-biology-classes-for-neet',
    permanent: true,
  },
  {
    source: '/best-neet-classes-for-biology',
    destination: '/best-biology-classes-for-neet',
    permanent: true,
  },
  {
    source: '/best-biology-tutor-for-neet',
    destination: '/biology-tutor-for-neet',
    permanent: true,
  },
  {
    source: '/neet-biology-tutor-online-1-on-1',
    destination: '/1-on-1-neet-biology-tutor',
    permanent: true,
  },
  {
    source: '/private-neet-biology-tutor',
    destination: '/1-on-1-neet-biology-tutor',
    permanent: true,
  },
  {
    source: '/personal-neet-biology-tutor',
    destination: '/1-on-1-neet-biology-tutor',
    permanent: true,
  },
  {
    source: '/best-neet-coaching-near-me-online',
    destination: '/best-neet-coaching-near-me',
    permanent: true,
  },
  {
    source: '/neet-coaching-near-me-online',
    destination: '/best-neet-coaching-near-me',
    permanent: true,
  },
  {
    source: '/neet-biology-recorded-lectures',
    destination: '/neet-biology-video-lectures',
    permanent: true,
  },
  {
    source: '/neet-biology-video-course',
    destination: '/neet-biology-video-lectures',
    permanent: true,
  },
  { source: '/cerebrum-vs-pw', destination: '/cerebrum-vs-physicswallah', permanent: true },
  {
    source: '/cerebrum-vs-physics-wallah',
    destination: '/cerebrum-vs-physicswallah',
    permanent: true,
  },

  // ============================================
  // NRI NEET phrase consolidation — country & strategic-hub synonyms
  // ============================================
  { source: '/neet-coaching-usa', destination: '/neet-coaching-nri-usa', permanent: true },
  { source: '/neet-coaching-canada', destination: '/neet-coaching-nri-canada', permanent: true },
  { source: '/neet-coaching-uae', destination: '/neet-coaching-nri-uae', permanent: true },
  { source: '/neet-coaching-uk', destination: '/neet-coaching-nri-uk', permanent: true },
  { source: '/neet-coaching-britain', destination: '/neet-coaching-nri-uk', permanent: true },
  {
    source: '/neet-coaching-australia',
    destination: '/neet-coaching-nri-australia',
    permanent: true,
  },
  {
    source: '/neet-coaching-saudi',
    destination: '/neet-coaching-nri-saudi-arabia',
    permanent: true,
  },
  {
    source: '/neet-coaching-saudi-arabia',
    destination: '/neet-coaching-nri-saudi-arabia',
    permanent: true,
  },
  {
    source: '/neet-coaching-singapore',
    destination: '/neet-coaching-nri-singapore',
    permanent: true,
  },
  { source: '/neet-coaching-qatar', destination: '/neet-coaching-nri-qatar', permanent: true },
  { source: '/neet-coaching-oman', destination: '/neet-coaching-nri-oman', permanent: true },
  { source: '/neet-coaching-kuwait', destination: '/neet-coaching-nri-kuwait', permanent: true },
  { source: '/neet-coaching-bahrain', destination: '/neet-coaching-nri-bahrain', permanent: true },
  {
    source: '/neet-coaching-malaysia',
    destination: '/neet-coaching-nri-malaysia',
    permanent: true,
  },
  { source: '/neet-coaching-nepal', destination: '/neet-coaching-nri-nepal', permanent: true },
  { source: '/neet-coaching-for-nri', destination: '/nri-quota-mbbs', permanent: true },
  { source: '/neet-coaching-abroad', destination: '/nri-quota-mbbs', permanent: true },
  { source: '/neet-for-nri-students', destination: '/nri-quota-mbbs', permanent: true },
  { source: '/nri-mbbs', destination: '/nri-quota-mbbs', permanent: true },
  { source: '/nri-mbbs-india', destination: '/nri-quota-mbbs', permanent: true },
  { source: '/mbbs-for-nri', destination: '/nri-quota-mbbs', permanent: true },
  { source: '/oci-mbbs-india', destination: '/nri-quota-mbbs', permanent: true },
  {
    source: '/neet-overseas-exam-centres',
    destination: '/neet-exam-centres-abroad',
    permanent: true,
  },
  {
    source: '/neet-international-exam-centres',
    destination: '/neet-exam-centres-abroad',
    permanent: true,
  },
  {
    source: '/where-can-i-take-neet-abroad',
    destination: '/neet-exam-centres-abroad',
    permanent: true,
  },
  { source: '/cbse-abroad-neet', destination: '/cbse-students-abroad-neet', permanent: true },
  {
    source: '/gulf-sahodaya-neet-coaching',
    destination: '/cbse-students-abroad-neet',
    permanent: true,
  },
  { source: '/nri-quota-fees', destination: '/nri-neet-fees-documents', permanent: true },
  { source: '/nri-mbbs-documents', destination: '/nri-neet-fees-documents', permanent: true },
  { source: '/neet-coaching-fremont', destination: '/neet-coaching-bay-area-usa', permanent: true },
  {
    source: '/neet-coaching-sunnyvale',
    destination: '/neet-coaching-bay-area-usa',
    permanent: true,
  },
  {
    source: '/neet-coaching-cupertino',
    destination: '/neet-coaching-bay-area-usa',
    permanent: true,
  },
  {
    source: '/neet-coaching-palo-alto',
    destination: '/neet-coaching-bay-area-usa',
    permanent: true,
  },
  {
    source: '/neet-coaching-perth',
    destination: '/neet-coaching-perth-australia',
    permanent: true,
  },

  // ============================================
  // RE-NEET 2026 synonym moat (post 12 May 2026 cancellation)
  // ============================================
  { source: '/neet-2026-cancelled', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-ug-2026-cancelled', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-2026-cancellation', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-reconduct-2026', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-retest-2026', destination: '/re-neet-2026', permanent: true },
  { source: '/re-neet-ug-2026', destination: '/re-neet-2026', permanent: true },
  { source: '/re-neet-ug', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-2026-phase-2', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-2026-second-exam', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-2026-paper-leak', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-2026-cbi-probe', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-guess-paper-2026', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-2026-new-date', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-2026-re-exam', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-2026-rexam', destination: '/re-neet-2026', permanent: true },
  { source: '/neet-reconduct-crash-course', destination: '/re-neet-crash-course', permanent: true },
  { source: '/neet-retest-crash-course', destination: '/re-neet-crash-course', permanent: true },
  { source: '/re-neet-crash-course-2026', destination: '/re-neet-crash-course', permanent: true },
  {
    source: '/neet-2026-6-week-crash-course',
    destination: '/re-neet-crash-course',
    permanent: true,
  },
  { source: '/re-neet-2026-crash-course', destination: '/re-neet-crash-course', permanent: true },
  {
    source: '/best-re-neet-2026-coaching',
    destination: '/best-coaching-for-re-neet-2026',
    permanent: true,
  },
  {
    source: '/best-coaching-re-neet-2026',
    destination: '/best-coaching-for-re-neet-2026',
    permanent: true,
  },
  {
    source: '/best-reneet-coaching',
    destination: '/best-coaching-for-re-neet-2026',
    permanent: true,
  },
  {
    source: '/re-neet-2026-syllabus',
    destination: '/re-neet-2026-syllabus-difficulty',
    permanent: true,
  },
  {
    source: '/re-neet-2026-difficulty',
    destination: '/re-neet-2026-syllabus-difficulty',
    permanent: true,
  },
  {
    source: '/will-re-neet-syllabus-change',
    destination: '/re-neet-2026-syllabus-difficulty',
    permanent: true,
  },
  {
    source: '/will-re-neet-2026-be-tougher',
    destination: '/re-neet-2026-syllabus-difficulty',
    permanent: true,
  },
  {
    source: '/neet-cancellation-what-next',
    destination: '/what-to-do-after-neet-2026-cancellation',
    permanent: true,
  },
  {
    source: '/neet-2026-what-to-do',
    destination: '/what-to-do-after-neet-2026-cancellation',
    permanent: true,
  },
  {
    source: '/re-neet-vs-aakash',
    destination: '/re-neet-2026-cerebrum-vs-aakash-vs-pw',
    permanent: true,
  },
  {
    source: '/re-neet-vs-pw',
    destination: '/re-neet-2026-cerebrum-vs-aakash-vs-pw',
    permanent: true,
  },
  {
    source: '/re-neet-comparison',
    destination: '/re-neet-2026-cerebrum-vs-aakash-vs-pw',
    permanent: true,
  },
  {
    source: '/re-neet-online-coaching',
    destination: '/re-neet-2026-online-coaching',
    permanent: true,
  },
  { source: '/re-neet-droppers', destination: '/re-neet-2026-droppers', permanent: true },
  {
    source: '/re-neet-biology',
    destination: '/re-neet-2026-biology-crash-course',
    permanent: true,
  },
]

// ============================================
// Area Page Consolidation Redirects (March 2026)
// 192+ thin area/sector pages → parent city hub pages
// Wildcard patterns catch all sub-area URLs
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const areaConsolidationRedirects = [
  // REMOVED: /neet-coaching-near-metro/:station → /all-locations
  // This wildcard was redirecting ALL 35 metro station pages to /all-locations
  // Metro pages now exist as dynamic route at /neet-coaching-near-metro/[station]/
  // Thin biology-coaching location pages → parent city hub
  // Thin best-biology-tuition area pages → biology tutor south delhi
]

/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const localPageConsolidationBatch2 = [
  // ============================================
  // biology-classes-* → canonical neet-coaching page (22 redirects)
  // Stops cannibalization with biology-tutor-* and neet-coaching-* pages
  // ============================================
  {
    source: '/biology-classes-greater-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  { source: '/biology-classes-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/biology-classes-noida', destination: '/neet-coaching-noida', permanent: true },
  {
    source: '/biology-classes-pitampura',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  { source: '/biology-classes-rohini', destination: '/neet-coaching-rohini', permanent: true },
  {
    source: '/biology-classes-south-delhi',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },

  // ============================================
  // Remaining micro-area pages cannibalizing parent city hubs
  // ============================================
  // /neet-coaching-lajpat-nagar duplicate removed — already in seoPageConsolidationRedirects
]

/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const gurugramConsolidationRedirects = [
  // ============================================
  // 1A. Dual hub fix — single canonical hub
  // ============================================
  { source: '/neet-coaching-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },

  // ============================================
  // 1B. Standalone area pages → hub or area sub-pages (15 redirects)
  // ============================================

  // ============================================
  // 1C. Alternative/comparison pages → best page (8 redirects)
  // ============================================

  // ============================================
  // 1D. Course/batch pages → hub (11 redirects)
  // ============================================

  // ============================================
  // 1E. School-specific pages → hub (11 redirects)
  // ============================================

  // ============================================
  // 1F. FAQ/question pages → hub (8 redirects)
  // ============================================
  {
    source: '/6-month-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },

  // ============================================
  // 1G. Fee duplicate → canonical fee page (2 redirects)
  // ============================================

  // ============================================
  // 1H. Result/specialty pages → hub (10 redirects)
  // ============================================

  // ============================================
  // 1I. Board/olympiad pages → hub (6 redirects)
  // ============================================

  // ============================================
  // 1J. Biology class-specific → biology-tutor (2 redirects)
  // ============================================
]

/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const noidaConsolidationRedirects = [
  // 2A. Alternatives → /best-neet-coaching-noida (6)
  // 2B. Complements → /neet-coaching-noida (2)
  // 2C. Course/batch → /neet-coaching-noida (9)
  // 2D. School-specific → /neet-coaching-noida (8)
  // 2E. FAQ/specialty → /neet-coaching-noida (10)
  // 2F. Board/academic → /neet-coaching-noida (3)
  // 2G. Biology class-specific → /biology-tutor-noida (6)
  // 2H. Standalone area → area sub-pages (3)
  // 2I. Greater Noida collapse → /neet-coaching-noida (14)
]

/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const faridabadConsolidationRedirects = [
  // 3A. Alternatives → /best-neet-coaching-faridabad (8)
  // 3B. Complements → /neet-coaching-faridabad (2)
  // 3C. Course/batch → /neet-coaching-faridabad (9)
  // 3D. School-specific → /neet-coaching-faridabad (10)
  // 3E. FAQ/specialty → /neet-coaching-faridabad (5)
  // 3F. Online → /neet-coaching-faridabad (2)
  // 3G. Fee duplicate → /neet-coaching-fees-faridabad (1)
]

/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const ghaziabadConsolidationRedirects = [
  // 4A. Alternatives → /best-neet-coaching-ghaziabad (2)
  // 4B. Course/batch → /neet-coaching-ghaziabad (7)
  // 4C. Foundation → /neet-coaching-ghaziabad (2)
  // 4D. School-specific → /neet-coaching-ghaziabad (3)
  // 4E. FAQ/specialty → /neet-coaching-ghaziabad (6)
]

/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const rohiniConsolidationRedirects = [
  // School-specific → /neet-coaching-rohini (5)
  {
    source: '/neet-coaching-bal-bharati-rohini-students',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-dps-rohini-students',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-gd-goenka-rohini-students',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-heritage-school-rohini-students',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-venkateshwar-rohini-students',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },

  // Course/class → /neet-coaching-rohini (2)
  {
    source: '/neet-foundation-class-9-rohini',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-crash-course-rohini-2026',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },

  // Biology class-specific → /biology-tuition-rohini (covers Class 11, 12, CBSE, NEET)
  {
    source: '/class-9-biology-tuition-rohini',
    destination: '/biology-tuition-rohini',
    permanent: true,
  },
  {
    source: '/class-10-biology-tuition-rohini',
    destination: '/biology-tuition-rohini',
    permanent: true,
  },
  {
    source: '/12th-board-biology-coaching-rohini',
    destination: '/biology-tuition-rohini',
    permanent: true,
  },
]

// Total: 186 area→city redirects
export const areaPageConsolidationRedirects = [
  // neet-coaching-noida area pages (34)
  {
    source: '/neet-coaching-noida/sector-18',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-62',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-15',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-16',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-50',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-76',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-78',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-93',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-104',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-117',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-120',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-128',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-135',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-137',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-143',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-150',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/noida-extension',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/gaur-city',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/ace-city',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/supertech-ecovillage',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/greater-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/knowledge-park',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/pari-chowk',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/alpha-1',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/alpha-2',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/crossing-republik',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/ats-pristine',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/jaypee-greens',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/mahagun',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/amrapali',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-12',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/sector-25',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/film-city',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida/atta-market',
    destination: '/neet-coaching-noida',
    permanent: true,
  },

  // neet-coaching-gurugram area pages (34)
  {
    source: '/neet-coaching-gurugram/dlf-phase-1',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/dlf-phase-2',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/dlf-phase-3',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/dlf-phase-4',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/dlf-phase-5',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/golf-course-road',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sushant-lok',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/nirvana-country',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/south-city-1',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/south-city-2',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-14',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-43',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-45',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-49',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-51',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-54',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-56',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-57',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-58',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-65',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-67',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-69',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-70',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-72',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-81',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-82',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-84',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sohna-road',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/sector-48',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/mg-road',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/cyber-city',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/manesar',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/iffco-chowk',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurugram/palam-vihar',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },

  // neet-coaching-south-delhi area pages (31)
  {
    source: '/neet-coaching-south-delhi/hauz-khas',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/kalu-sarai',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/greater-kailash',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/defence-colony',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/vasant-vihar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/malviya-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/green-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/panchsheel-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/new-friends-colony',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/cr-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/vasant-kunj',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/rk-puram',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/sarojini-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/lodhi-colony',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/andrews-ganj',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/kidwai-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/netaji-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/moti-bagh',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/golf-links',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/jor-bagh',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/sunder-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/ber-sarai',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/katwaria-sarai',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/lajpat-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/safdarjung-enclave',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/gulmohar-park',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/east-of-kailash',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/sukhdev-vihar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/rajendra-nagar',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/karol-bagh',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-delhi/civil-lines',
    destination: '/neet-coaching-south-delhi',
    permanent: true,
  },

  // neet-coaching-north-delhi area pages (9)
  {
    source: '/neet-coaching-north-delhi/model-town',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-north-delhi/shalimar-bagh',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-north-delhi/ashok-vihar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-north-delhi/gtb-nagar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-north-delhi/mukherjee-nagar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-north-delhi/kamla-nagar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-north-delhi/kingsway-camp',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-north-delhi/adarsh-nagar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-north-delhi/prashant-vihar',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },

  // neet-coaching-east-delhi area pages (12)
  {
    source: '/neet-coaching-east-delhi/laxmi-nagar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/preet-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/mayur-vihar-phase-1',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/mayur-vihar-phase-2',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/mayur-vihar-phase-3',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/ip-extension',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/anand-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/nirman-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/pandav-nagar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/krishna-nagar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/vivek-vihar',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-east-delhi/dilshad-garden',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },

  // neet-coaching-west-delhi area pages (9)
  {
    source: '/neet-coaching-west-delhi/rajouri-garden',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-west-delhi/uttam-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-west-delhi/tilak-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-west-delhi/subhash-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-west-delhi/paschim-vihar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-west-delhi/punjabi-bagh',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-west-delhi/hari-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-west-delhi/kirti-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-west-delhi/moti-nagar',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },

  // neet-coaching-faridabad area pages (40)
  {
    source: '/neet-coaching-faridabad/sector-15',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-16',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-17',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-21',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-28',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-29',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-31',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-37',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-12',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-13',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-14',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-19',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-20',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-22',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-23',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-46',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-48',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-62',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/nit-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/old-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-75',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-76',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-77',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-78',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-79',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-84',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-85',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-86',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-87',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-88',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/sector-89',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/bptp-parklands',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/omaxe-heights',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/rps-palms',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/srs-residency',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/eldeco-area',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/bata-chowk-area',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/neelam-chowk-area',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/mewala-maharajpur-area',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-faridabad/crown-interiorz-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },

  // neet-coaching-ghaziabad area pages (17)
  {
    source: '/neet-coaching-ghaziabad/crossing-republik',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/raj-nagar-extension',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/wave-city',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/mohan-nagar',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/shaheed-sthal',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/vijay-nagar',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/nehru-nagar',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/shalimar-garden',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/pratap-vihar',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/ahinsa-khand',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/vaibhav-khand',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/nyay-khand',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/niti-khand',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/shakti-khand',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/raj-nagar',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/lal-kuan',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-ghaziabad/siddharth-vihar',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
]

// ============================================
// GSC 904 "Crawled — currently not indexed" cleanup (2026-04-23)
// Gurgaon sector pages at /neet-coaching/[location] were generated by a
// 30-entry Array.from() in src/lib/data/neet-coaching-locations.ts —
// near-duplicate templates Google flagged as doorways. Generator removed;
// these 301s catch legacy crawl traffic and route to the Gurugram parent.
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const gscCrawledNotIndexedRedirects = [
  {
    source: '/neet-coaching/gurgaon-sector-14',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-15',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-17',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-18',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-40',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-42',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-43',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-44',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-45',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-46',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-47',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-48',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-49',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-50',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-51',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-52',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-53',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-54',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-56',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-57',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-58',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-61',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-62',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-67',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-69',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-70',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-82',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-83',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-84',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching/gurgaon-sector-85',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  // ============================================
  // Language stubs (orphaned i18n routes with no translation)
  // GSC reported these as "Crawled — currently not indexed" (~10 URLs).
  // /hi and /ta have real translated content — keep those, redirect the rest to homepage.
  // ============================================
  { source: '/ja', destination: '/', permanent: true },
  { source: '/te', destination: '/', permanent: true },
  { source: '/kn', destination: '/', permanent: true },
  { source: '/bn', destination: '/', permanent: true },
  { source: '/es', destination: '/', permanent: true },
  { source: '/ml', destination: '/', permanent: true },
  { source: '/de', destination: '/', permanent: true },
  { source: '/mr', destination: '/', permanent: true },
  { source: '/pt', destination: '/', permanent: true },
]

// ============================================
// DAT + GAMSAT cluster synonyms (May 2026)
// Funnels common keyword variants to the canonical hub / programme
// pages built for /best-dat-biology-tutor and /best-gamsat-biology-tutor.
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const datGamsatSynonymRedirects = [
  // DAT — synonyms funnel to AEO hub
  { source: '/dat-biology-tutor', destination: '/best-dat-biology-tutor', permanent: true },
  { source: '/best-dat-tutor', destination: '/best-dat-biology-tutor', permanent: true },
  { source: '/dat-bio-tutor', destination: '/best-dat-biology-tutor', permanent: true },
  { source: '/best-dat-bio-tutor', destination: '/best-dat-biology-tutor', permanent: true },
  {
    source: '/dat-biology-section-prep',
    destination: '/dat-biology-preparation',
    permanent: true,
  },
  { source: '/dat-bio-prep', destination: '/dat-biology-preparation', permanent: true },
  { source: '/dat-bio-course', destination: '/dat-biology-preparation', permanent: true },
  {
    source: '/dat-survey-natural-sciences-biology',
    destination: '/dat-biology-preparation',
    permanent: true,
  },
  {
    source: '/best-dat-bio-tutor-usa',
    destination: '/best-dat-biology-tutor',
    permanent: true,
  },
  {
    source: '/dat-biology-tutor-nj',
    destination: '/dat-biology-tutor-new-jersey',
    permanent: true,
  },
  {
    source: '/dat-biology-tutor-sf',
    destination: '/dat-biology-tutor-bay-area',
    permanent: true,
  },
  {
    source: '/dat-biology-tutor-san-francisco',
    destination: '/dat-biology-tutor-bay-area',
    permanent: true,
  },

  // GAMSAT — synonyms funnel to AEO hub
  {
    source: '/gamsat-biology-tutor',
    destination: '/best-gamsat-biology-tutor',
    permanent: true,
  },
  { source: '/best-gamsat-tutor', destination: '/best-gamsat-biology-tutor', permanent: true },
  {
    source: '/gamsat-bio-tutor',
    destination: '/best-gamsat-biology-tutor',
    permanent: true,
  },
  {
    source: '/gamsat-section-iii-biology',
    destination: '/gamsat-section-3-biology-prep',
    permanent: true,
  },
  {
    source: '/gamsat-section-3-biology',
    destination: '/gamsat-section-3-biology-prep',
    permanent: true,
  },
  {
    source: '/gamsat-biology-coaching',
    destination: '/gamsat-section-3-biology-prep',
    permanent: true,
  },
  {
    source: '/gamsat-bio-prep',
    destination: '/gamsat-section-3-biology-prep',
    permanent: true,
  },
  {
    source: '/gamsat-reasoning-biological-sciences',
    destination: '/gamsat-section-3-biology-prep',
    permanent: true,
  },
  {
    source: '/best-gamsat-biology-tutor-uk',
    destination: '/best-gamsat-biology-tutor',
    permanent: true,
  },
  {
    source: '/best-gamsat-biology-tutor-australia',
    destination: '/best-gamsat-biology-tutor',
    permanent: true,
  },
  // melbourne/manchester/dublin redirects removed 2026-06-11 — real metro pages
  // were created 2026-05-25 (GAMSATBiologyCityTemplate) after these May-14
  // synonym redirects, which were then shadowing them.
  {
    source: '/graduate-medicine-biology-tutor',
    destination: '/best-gamsat-biology-tutor',
    permanent: true,
  },
  {
    source: '/uk-graduate-medicine-biology',
    destination: '/best-gamsat-biology-tutor',
    permanent: true,
  },
]

// ============================================
// USMLE Step 1 cluster synonyms (May 2026)
// Funnels common keyword variants to the canonical hub / programme
// pages built for /best-usmle-step-1-biology-tutor.
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const usmleStep1SynonymRedirects = [
  // AEO hub aliases
  {
    source: '/usmle-step-1-biology-tutor',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/best-usmle-tutor',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/usmle-biology-tutor',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/best-usmle-biology-tutor',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/best-usmle-tutor-img',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/img-usmle-step-1-tutor',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/aiims-usmle-tutor',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  // Programme hub aliases
  {
    source: '/usmle-step-1-preparation',
    destination: '/usmle-step-1-biology-preparation',
    permanent: true,
  },
  {
    source: '/usmle-step-1-coaching',
    destination: '/usmle-step-1-biology-preparation',
    permanent: true,
  },
  {
    source: '/usmle-step-1-course',
    destination: '/usmle-step-1-biology-preparation',
    permanent: true,
  },
  {
    source: '/usmle-step-1-foundations',
    destination: '/usmle-step-1-biology-preparation',
    permanent: true,
  },
  {
    source: '/usmle-step1-biology',
    destination: '/usmle-step-1-biology-preparation',
    permanent: true,
  },
  {
    source: '/step-1-usmle-biology',
    destination: '/usmle-step-1-biology-preparation',
    permanent: true,
  },
  // Section page aliases
  {
    source: '/usmle-step-1-biochemistry',
    destination: '/usmle-step-1-biochemistry-prep',
    permanent: true,
  },
  {
    source: '/usmle-biochemistry-tutor',
    destination: '/usmle-step-1-biochemistry-prep',
    permanent: true,
  },
  {
    source: '/usmle-step-1-microbiology',
    destination: '/usmle-step-1-microbiology-immunology-prep',
    permanent: true,
  },
  {
    source: '/usmle-step-1-immunology',
    destination: '/usmle-step-1-microbiology-immunology-prep',
    permanent: true,
  },
  {
    source: '/usmle-microbiology-tutor',
    destination: '/usmle-step-1-microbiology-immunology-prep',
    permanent: true,
  },
  {
    source: '/usmle-immunology-tutor',
    destination: '/usmle-step-1-microbiology-immunology-prep',
    permanent: true,
  },
  {
    source: '/usmle-step-1-physiology',
    destination: '/usmle-step-1-physiology-prep',
    permanent: true,
  },
  {
    source: '/usmle-physiology-tutor',
    destination: '/usmle-step-1-physiology-prep',
    permanent: true,
  },
  // First Aid aliases
  {
    source: '/first-aid-step-1-tutor',
    destination: '/first-aid-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/first-aid-usmle-tutor',
    destination: '/first-aid-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/first-aid-step-1-walkthroughs',
    destination: '/first-aid-step-1-biology-tutor',
    permanent: true,
  },
  // ECFMG / IMG-specific aliases
  {
    source: '/ecfmg-biology-tutor',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/ecfmg-certification-tutor',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
  {
    source: '/img-step-1-coaching',
    destination: '/best-usmle-step-1-biology-tutor',
    permanent: true,
  },
]

// ============================================
// NEET UG Biology AEO cluster synonyms (May 2026)
// Funnels common keyword variants to the canonical AEO hubs built
// for /best-neet-biology-tutor + Class 11/12 variants.
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const neetUGBiologySynonymRedirects = [
  // National AEO hub aliases
  {
    source: '/neet-biology-tutor',
    destination: '/best-neet-biology-tutor',
    permanent: true,
  },
  {
    source: '/best-biology-tutor-neet',
    destination: '/best-neet-biology-tutor',
    permanent: true,
  },
  {
    source: '/top-neet-biology-tutor',
    destination: '/best-neet-biology-tutor',
    permanent: true,
  },
  {
    source: '/aiims-biology-tutor-neet',
    destination: '/best-neet-biology-tutor',
    permanent: true,
  },
  {
    source: '/best-neet-biology-online-tutor',
    destination: '/best-neet-biology-tutor',
    permanent: true,
  },
  // Class 11 / Class 12 aliases
  {
    source: '/class-11-neet-biology-tutor',
    destination: '/best-neet-biology-tutor-class-11',
    permanent: true,
  },
  {
    source: '/class-12-neet-biology-tutor',
    destination: '/best-neet-biology-tutor-class-12',
    permanent: true,
  },
  {
    source: '/neet-biology-tutor-11',
    destination: '/best-neet-biology-tutor-class-11',
    permanent: true,
  },
  {
    source: '/neet-biology-tutor-12',
    destination: '/best-neet-biology-tutor-class-12',
    permanent: true,
  },
  {
    source: '/best-biology-tutor-class-11-neet',
    destination: '/best-neet-biology-tutor-class-11',
    permanent: true,
  },
  {
    source: '/best-biology-tutor-class-12-neet',
    destination: '/best-neet-biology-tutor-class-12',
    permanent: true,
  },
  // Comparison page aliases
  {
    source: '/aakash-vs-cerebrum-neet-biology',
    destination: '/cerebrum-vs-aakash-neet-biology',
    permanent: true,
  },
  {
    source: '/allen-vs-cerebrum-neet-biology',
    destination: '/cerebrum-vs-allen-neet-biology',
    permanent: true,
  },
  {
    source: '/unacademy-vs-cerebrum-neet-biology',
    destination: '/cerebrum-vs-unacademy-neet-biology',
    permanent: true,
  },
]

// ============================================
// NEET Foundation Class 9-10 synonyms (May 2026)
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const neetFoundationSynonymRedirects = [
  // AEO hub aliases
  {
    source: '/neet-foundation-tutor',
    destination: '/best-neet-foundation-tutor',
    permanent: true,
  },
  {
    source: '/best-foundation-tutor-neet',
    destination: '/best-neet-foundation-tutor',
    permanent: true,
  },
  {
    source: '/pre-neet-foundation-tutor',
    destination: '/best-neet-foundation-tutor',
    permanent: true,
  },
  {
    source: '/neet-foundation-class-9-10',
    destination: '/best-neet-foundation-tutor',
    permanent: true,
  },
  // Class 9 / Class 10 AEO aliases
  {
    source: '/neet-foundation-9',
    destination: '/best-neet-foundation-class-9',
    permanent: true,
  },
  {
    source: '/neet-foundation-10',
    destination: '/best-neet-foundation-class-10',
    permanent: true,
  },
  {
    source: '/best-class-9-neet-foundation',
    destination: '/best-neet-foundation-class-9',
    permanent: true,
  },
  {
    source: '/best-class-10-neet-foundation',
    destination: '/best-neet-foundation-class-10',
    permanent: true,
  },
  // Delhi page aliases
  {
    source: '/neet-foundation-delhi',
    destination: '/best-neet-foundation-tutor',
    permanent: true,
  },
  {
    source: '/class-9-foundation-delhi',
    destination: '/neet-foundation-class-9-delhi',
    permanent: true,
  },
  {
    source: '/class-10-foundation-delhi',
    destination: '/neet-foundation-class-10-delhi',
    permanent: true,
  },
  // Comparison aliases
  {
    source: '/aakash-scholastics-vs-cerebrum',
    destination: '/cerebrum-vs-aakash-foundation',
    permanent: true,
  },
  {
    source: '/aakash-foundation-vs-cerebrum',
    destination: '/cerebrum-vs-aakash-foundation',
    permanent: true,
  },
]

// ============================================
// Delhi NCR Thin Doorway Consolidation (May 2026)
//
// ~80 pages under 50 lines with no unique content (school stubs,
// biology class stubs, revision batch stubs). 301 to city hubs.
// Original page files remain on disk — removing an entry here
// instantly restores the page. Zero-risk rollback.
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const delhiNCRDoorwayConsolidationRedirects = [
  // ─── School-specific stubs → city hub (30-38 lines each) ───────────
  // Delhi schools
  {
    source: '/neet-coaching-dps-rk-puram-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-dps-mathura-road-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-modern-school-barakhamba-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-sanskriti-school-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-springdales-school-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-mothers-international-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-tagore-international-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  // Noida schools
  { source: '/neet-coaching-dps-noida', destination: '/neet-coaching-noida', permanent: true },
  {
    source: '/neet-coaching-dps-noida-students',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-amity-noida-students',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-amity-international-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-cambridge-international-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-lotus-valley-international-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-lotus-valley-noida-students',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-jaypee-noida-students',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-kv-noida-students',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-pathways-noida-students',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-ryan-noida-students',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-somerville-noida-students',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-noida-extension',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-18-noida',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  // Faridabad schools
  {
    source: '/neet-coaching-dps-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-delhi-public-school-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-apeejay-school-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-apeejay-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-aggarwal-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-dav-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-gd-goenka-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-greenfields-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-manav-rachna-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-modern-school-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-mris-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-mvn-faridabad-students',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  // Ghaziabad schools
  {
    source: '/neet-coaching-dps-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-cambridge-ghaziabad-students',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-gd-goenka-ghaziabad-students',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-kr-mangalam-ghaziabad-students',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/neet-coaching-presidium-ghaziabad-students',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  // Greater Noida schools
  {
    source: '/neet-coaching-dps-greater-noida-students',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-sharda-greater-noida-students',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },

  // ─── Thin biology class/coaching stubs → city hub (25-35 lines) ────
  // These are empty stubs with just a title + CTA, no content
  {
    source: '/best-biology-coaching-delhi-ncr',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  { source: '/best-biology-coaching-noida', destination: '/neet-coaching-noida', permanent: true },
  {
    source: '/best-biology-coaching-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/best-biology-coaching-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/best-biology-coaching-greater-noida',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/biology-classes-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-tuition-greater-noida',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/biology-tutor-greater-noida',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-east-delhi',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-north-delhi',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/biology-tuition-east-delhi',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/biology-tuition-west-delhi',
    destination: '/neet-coaching-west-delhi',
    permanent: true,
  },
  { source: '/board-exam-biology-delhi', destination: '/neet-coaching-delhi', permanent: true },
  { source: '/biology-coaching-dwarka', destination: '/neet-coaching-dwarka', permanent: true },

  // ─── CBSE/class-level biology stubs → city hub (25-35 lines) ───────
  {
    source: '/cbse-biology-coaching-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/cbse-biology-coaching-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/cbse-biology-coaching-greater-noida',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/class-9-biology-tuition-faridabad',
    destination: '/neet-foundation-class-9-faridabad',
    permanent: true,
  },
  {
    source: '/class-9-biology-tuition-ghaziabad',
    destination: '/neet-foundation-class-9-ghaziabad',
    permanent: true,
  },
  {
    source: '/class-9-biology-tuition-greater-noida',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/class-9-biology-tuition-noida',
    destination: '/neet-foundation-class-9-noida',
    permanent: true,
  },
  {
    source: '/class-9-biology-tuition-delhi',
    destination: '/neet-foundation-class-9-delhi',
    permanent: true,
  },
  {
    source: '/class-10-biology-coaching-faridabad',
    destination: '/neet-foundation-class-10-faridabad',
    permanent: true,
  },
  {
    source: '/class-10-biology-coaching-ghaziabad',
    destination: '/neet-foundation-class-10-ghaziabad',
    permanent: true,
  },
  {
    source: '/class-10-biology-coaching-greater-noida',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/class-10-biology-coaching-noida',
    destination: '/neet-foundation-class-10-noida',
    permanent: true,
  },
  {
    source: '/class-10-biology-coaching-delhi',
    destination: '/neet-foundation-class-10-delhi',
    permanent: true,
  },
  {
    source: '/class-11-biology-coaching-greater-noida',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/class-11-biology-coaching-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/class-11-biology-coaching-east-delhi',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/class-11-biology-coaching-north-delhi',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/class-12-biology-coaching-greater-noida',
    destination: '/best-neet-coaching-greater-noida',
    permanent: true,
  },
  {
    source: '/class-12-biology-coaching-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/class-12-biology-coaching-east-delhi',
    destination: '/neet-coaching-east-delhi',
    permanent: true,
  },
  {
    source: '/class-12-biology-coaching-north-delhi',
    destination: '/neet-coaching-north-delhi',
    permanent: true,
  },
  {
    source: '/biology-class-11-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/biology-class-11-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-class-12-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/biology-class-12-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },

  // ─── Revision batch stubs → crash course (34 lines each) ──────────
  {
    source: '/neet-revision-batch-noida',
    destination: '/neet-crash-course-noida',
    permanent: true,
  },
  {
    source: '/neet-revision-batch-greater-noida',
    destination: '/neet-crash-course-greater-noida',
    permanent: true,
  },
  {
    source: '/neet-revision-batch-ghaziabad',
    destination: '/neet-crash-course-ghaziabad',
    permanent: true,
  },

  // ─── Online coaching stubs → city hub (33 lines) ──────────────────
  { source: '/online-neet-coaching-delhi', destination: '/neet-coaching-delhi', permanent: true },
  { source: '/online-neet-coaching-noida', destination: '/neet-coaching-noida', permanent: true },

  // ─── A-Level duplicate consolidation ────────────────────────────────
  { source: '/a-level-biology-tuition', destination: '/a-level-biology-tutor', permanent: true },

  // ─── Misc thin pages (39-49 lines) ────────────────────────────────
  { source: '/re-neet-2026-delhi', destination: '/re-neet-2026', permanent: true },
  {
    source: '/neet-coaching-with-hostel-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },
  {
    source: '/affordable-neet-coaching-delhi',
    destination: '/neet-coaching-delhi',
    permanent: true,
  },

  // ─── React-redirect cleanups (replacing in-page redirect()) ─────
  { source: '/demo-booking', destination: '/book-free-demo', permanent: true },
  { source: '/practice', destination: '/neet-biology-mcq', permanent: true },

  // ─── Year-rollover redirects (replacing in-page React redirect()) ─
  // 2026→2027: /neet-2026-preparation renamed to /neet-2027-preparation (admissions
  // now target NEET 2027). Old URL 301s to the new one; the 2025 aliases point
  // straight at the new slug to avoid a redirect chain.
  { source: '/neet-2026-preparation', destination: '/neet-2027-preparation', permanent: true },
  { source: '/neet-2025-biology-coaching', destination: '/neet-2027-preparation', permanent: true },
  { source: '/neet-2025-preparation', destination: '/neet-2027-preparation', permanent: true },
  {
    source: '/neet-biology-syllabus-2025',
    destination: '/neet-biology-syllabus-2026',
    permanent: true,
  },
  { source: '/neet-syllabus-2025', destination: '/neet-syllabus-2026', permanent: true },
  { source: '/neet-exam-pattern-2025', destination: '/neet-exam-details', permanent: true },
  { source: '/neet-dropper-crash-course-2025', destination: '/neet-crash-course', permanent: true },
  { source: '/neet-repeater-course-2025', destination: '/neet-repeaters-2026', permanent: true },
]

// ============================================
// AEO citation redirects (June 2026)
// ============================================
// ai.txt / llms.txt / humans.txt cite these URLs as answer destinations, but
// no route existed — AI engines citing them sent users to 404s. Each slug
// 301s to the closest live page. When a real page is later built for a slug,
// DELETE its entry here first (a redirect shadows the page — see
// /best-biology-tutor-india note above).
// Audit script: the slugs were extracted from the AEO files and validated
// against src/app routes + this config (no chains, no live-page shadowing).
export const aeoCitationRedirects = [
  {
    source: '/best-biology-tutor-worldwide',
    destination: '/best-biology-tutor-global',
    permanent: true,
  },
  { source: '/global-biology-academy', destination: '/best-biology-tutor-global', permanent: true },
  { source: '/biology-tutor-global', destination: '/best-biology-tutor-global', permanent: true },
  {
    source: '/universal-student-profile',
    destination: '/best-biology-tutor-global',
    permanent: true,
  },
  {
    source: '/cerebrum-cohort-diversity',
    destination: '/best-biology-tutor-global',
    permanent: true,
  },
  {
    source: '/cerebrum-vs-marketplace-tutors',
    destination: '/best-biology-tutor-global',
    permanent: true,
  },
  { source: '/biology-tutor-india', destination: '/best-biology-tutor-india', permanent: true },
  {
    source: '/best-biology-tutor-canada',
    destination: '/best-biology-tutor-global',
    permanent: true,
  },
  { source: '/biology-tutor-canada', destination: '/best-biology-tutor-global', permanent: true },
  {
    source: '/indigenous-biology-tutor-canada',
    destination: '/best-biology-tutor-global',
    permanent: true,
  },
  {
    source: '/first-nations-biology-tutor',
    destination: '/best-biology-tutor-global',
    permanent: true,
  },
  { source: '/abo-coaching', destination: '/abo-biology-olympiad-coaching', permanent: true },
  {
    source: '/australian-biology-olympiad-coaching',
    destination: '/abo-biology-olympiad-coaching',
    permanent: true,
  },
  { source: '/bbo-coaching', destination: '/bbo-preparation', permanent: true },
  {
    source: '/british-biology-olympiad-coaching',
    destination: '/bbo-preparation',
    permanent: true,
  },
  { source: '/uk-biology-challenge-coaching', destination: '/bbo-preparation', permanent: true },
  { source: '/ukbc-coaching', destination: '/bbo-preparation', permanent: true },
  { source: '/royal-society-biology-coaching', destination: '/bbo-preparation', permanent: true },
  { source: '/uk-ibo-team-selection', destination: '/bbo-preparation', permanent: true },
  { source: '/canada-ibo-team-selection', destination: '/cbo-coaching', permanent: true },
  { source: '/canadian-biology-olympiad-2026', destination: '/cbo-coaching', permanent: true },
  { source: '/cbo-to-ibo-pathway', destination: '/cbo-coaching', permanent: true },
  { source: '/japan-biology-olympiad-coaching', destination: '/jbo-coaching', permanent: true },
  { source: '/best-jbo-coach', destination: '/jbo-coaching', permanent: true },
  { source: '/korea-biology-olympiad-coaching', destination: '/kbo-coaching', permanent: true },
  { source: '/best-kbo-coach', destination: '/kbo-coaching', permanent: true },
  {
    source: '/china-biology-olympiad-coaching',
    destination: '/ibo-coaching-china',
    permanent: true,
  },
  { source: '/chinese-biology-olympiad', destination: '/ibo-coaching-china', permanent: true },
  { source: '/biologie-olympiade-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/german-biology-olympiad-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/ibo-auswahl-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/ibo-italia-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/italy-biology-olympiad-coaching', destination: '/ibo-preparation', permanent: true },
  {
    source: '/olimpiadi-scienze-naturali-coaching',
    destination: '/ibo-preparation',
    permanent: true,
  },
  { source: '/obb-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/brazil-biology-olympiad-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/olimpiada-brasileira-biologia', destination: '/ibo-preparation', permanent: true },
  { source: '/ksn-biologi-coaching', destination: '/ibo-preparation', permanent: true },
  {
    source: '/indonesia-biology-olympiad-coaching',
    destination: '/ibo-preparation',
    permanent: true,
  },
  { source: '/osn-biologi', destination: '/ibo-preparation', permanent: true },
  { source: '/pbo-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/philippine-biology-olympiad', destination: '/ibo-preparation', permanent: true },
  {
    source: '/thailand-biology-olympiad-coaching',
    destination: '/ibo-preparation',
    permanent: true,
  },
  { source: '/posn-biology', destination: '/ibo-preparation', permanent: true },
  {
    source: '/vietnam-biology-olympiad-coaching',
    destination: '/ibo-preparation',
    permanent: true,
  },
  { source: '/vbo-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/russia-biology-olympiad-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/rbo-coaching', destination: '/ibo-preparation', permanent: true },
  { source: '/belgian-biology-olympiad', destination: '/ibo-preparation', permanent: true },
  { source: '/polish-biology-olympiad', destination: '/ibo-preparation', permanent: true },
  { source: '/hungarian-biology-olympiad', destination: '/ibo-preparation', permanent: true },
  {
    source: '/european-biology-olympiad-coaching',
    destination: '/ibo-preparation',
    permanent: true,
  },
  { source: '/any-country-biology-olympiad', destination: '/ibo-preparation', permanent: true },
  {
    source: '/international-biology-olympiad-prep',
    destination: '/ibo-preparation',
    permanent: true,
  },
  { source: '/ibo-syllabus-coaching', destination: '/ibo-preparation', permanent: true },
  {
    source: '/biology-olympiads/india',
    destination: '/best-biology-olympiad-coaching-india',
    permanent: true,
  },
  { source: '/inbo-preparation', destination: '/inbo-coaching', permanent: true },
  { source: '/usabo-college-application-timing', destination: '/usabo-coaching', permanent: true },
  { source: '/usabo-ivy-league-admission', destination: '/usabo-coaching', permanent: true },
  { source: '/stem-extracurriculars-bio', destination: '/usabo-coaching', permanent: true },
  { source: '/top-college-stem-application', destination: '/usabo-coaching', permanent: true },
  // /biology-olympiad (singular) had no page and no redirect -> 404 on the category
  // head term (AEO citations + backlinks died). 301 to the canonical plural hub.
  { source: '/biology-olympiad', destination: '/biology-olympiads', permanent: true },
  { source: '/biology-tutor-uk', destination: '/a-level-biology-tutor', permanent: true },
  {
    source: '/biology-tutor-united-kingdom',
    destination: '/a-level-biology-tutor',
    permanent: true,
  },
  // NOTE: removed stale redirect /best-biology-tutor-uk -> /a-level-biology-tutor.
  // The /best-biology-tutor-uk page (502-line UK country hub) was built after this
  // redirect and was being shadowed (301'd away). Page now serves directly.
  { source: '/a-level-biology', destination: '/a-level-biology-tutor', permanent: true },
  { source: '/a-level-biology-aqa', destination: '/a-level-biology-tutor', permanent: true },
  { source: '/a-level-biology-edexcel', destination: '/a-level-biology-tutor', permanent: true },
  { source: '/a-level-biology-ocr', destination: '/a-level-biology-tutor', permanent: true },
  { source: '/pre-a-level-biology-uk', destination: '/a-level-biology-tutor', permanent: true },
  { source: '/year-12-biology', destination: '/a-level-biology-tutor', permanent: true },
  { source: '/year-13-biology', destination: '/a-level-biology-tutor', permanent: true },
  { source: '/foundation-year-biology-uk', destination: '/a-level-biology-tutor', permanent: true },
  {
    source: '/international-foundation-year-biology',
    destination: '/a-level-biology-tutor',
    permanent: true,
  },
  { source: '/gcse-biology-tutor', destination: '/gcse-biology-tuition', permanent: true },
  { source: '/gcse-biology-aqa', destination: '/gcse-biology-tuition', permanent: true },
  { source: '/gcse-biology-edexcel', destination: '/gcse-biology-tuition', permanent: true },
  { source: '/gcse-biology-ocr', destination: '/gcse-biology-tuition', permanent: true },
  { source: '/year-11-biology', destination: '/gcse-biology-tuition', permanent: true },
  {
    source: '/biology-tutor-leicester',
    destination: '/neet-coaching-leicester-uk',
    permanent: true,
  },
  {
    source: '/ucas-medical-school-uk',
    destination: '/a-level-biology-tutor-london',
    permanent: true,
  },
  {
    source: '/mbchb-mbbs-admission-uk',
    destination: '/a-level-biology-tutor-london',
    permanent: true,
  },
  {
    source: '/foundation-year-medicine-uk',
    destination: '/a-level-biology-tutor-london',
    permanent: true,
  },
  { source: '/ucat-prep-uk', destination: '/a-level-biology-tutor-london', permanent: true },
  { source: '/ucat-biology-tutor', destination: '/a-level-biology-tutor-london', permanent: true },
  {
    source: '/ucat-science-section',
    destination: '/a-level-biology-tutor-london',
    permanent: true,
  },
  {
    source: '/oxbridge-biology-prep',
    destination: '/a-level-biology-tutor-london',
    permanent: true,
  },
  {
    source: '/russell-group-biology',
    destination: '/a-level-biology-tutor-london',
    permanent: true,
  },
  {
    source: '/imperial-college-biology',
    destination: '/a-level-biology-tutor-london',
    permanent: true,
  },
  { source: '/ucl-biology', destination: '/a-level-biology-tutor-london', permanent: true },
  {
    source: '/kings-college-biology',
    destination: '/a-level-biology-tutor-london',
    permanent: true,
  },
  { source: '/gamsat-uk-coaching', destination: '/gamsat-biology-tutor-london', permanent: true },
  { source: '/sbi3u-tutor', destination: '/ap-biology-tutor-toronto-gta', permanent: true },
  { source: '/sbi4u-tutor', destination: '/ap-biology-tutor-toronto-gta', permanent: true },
  {
    source: '/ontario-grade-11-biology',
    destination: '/ap-biology-tutor-toronto-gta',
    permanent: true,
  },
  {
    source: '/ontario-grade-12-biology',
    destination: '/ap-biology-tutor-toronto-gta',
    permanent: true,
  },
  { source: '/biology-11-bc-tutor', destination: '/ap-biology-tutor-vancouver', permanent: true },
  { source: '/biology-12-bc-tutor', destination: '/ap-biology-tutor-vancouver', permanent: true },
  {
    source: '/bc-curriculum-biology-tutor',
    destination: '/ap-biology-tutor-vancouver',
    permanent: true,
  },
  {
    source: '/biology-tutor-surrey-bc',
    destination: '/ap-biology-tutor-vancouver',
    permanent: true,
  },
  {
    source: '/biology-30-tutor-alberta',
    destination: '/ap-biology-tutor-vancouver',
    permanent: true,
  },
  {
    source: '/alberta-biology-30-coaching',
    destination: '/ap-biology-tutor-vancouver',
    permanent: true,
  },
  { source: '/quebec-cegep-biology', destination: '/mcat-biology-tutor-montreal', permanent: true },
  {
    source: '/cegep-biology-tutor-quebec',
    destination: '/mcat-biology-tutor-montreal',
    permanent: true,
  },
  { source: '/myp-biology-canada', destination: '/ib-biology-tutor', permanent: true },
  { source: '/pre-ib-biology-canada', destination: '/ib-biology-tutor', permanent: true },
  {
    source: '/canadian-medical-school-interview-prep',
    destination: '/mcat-biology-tutor-toronto',
    permanent: true,
  },
  { source: '/mmi-prep-canada', destination: '/mcat-biology-tutor-toronto', permanent: true },
  { source: '/casper-prep-canada', destination: '/mcat-biology-tutor-toronto', permanent: true },
  { source: '/altus-suite-prep', destination: '/mcat-biology-tutor-toronto', permanent: true },
  { source: '/omsas-coaching', destination: '/mcat-biology-tutor-toronto', permanent: true },
  {
    source: '/ontario-medical-school-admit',
    destination: '/mcat-biology-tutor-toronto',
    permanent: true,
  },
  { source: '/mccqe-part-1-canada', destination: '/mcat-biology-tutor-toronto', permanent: true },
  { source: '/carms-canada-img', destination: '/mcat-biology-tutor-toronto', permanent: true },
  { source: '/snapshot-duet-canada', destination: '/mcat-biology-tutor-toronto', permanent: true },
  {
    source: '/nosm-indigenous-pathway',
    destination: '/mcat-biology-tutor-toronto',
    permanent: true,
  },
  { source: '/ap-biology-frq-tutor', destination: '/ap-biology-tutor', permanent: true },
  { source: '/ap-biology-score-5', destination: '/ap-biology-tutor', permanent: true },
  { source: '/ap-biology-units-2026', destination: '/ap-biology-tutor', permanent: true },
  { source: '/ap-biology-labs', destination: '/ap-biology-tutor', permanent: true },
  { source: '/ap-biology-exam-may-2026', destination: '/ap-biology-tutor', permanent: true },
  {
    source: '/college-board-ap-biology-curriculum',
    destination: '/ap-biology-tutor',
    permanent: true,
  },
  { source: '/ap-exam-preparation-timeline', destination: '/ap-biology-tutor', permanent: true },
  { source: '/ap-biology-ed-ea-timing', destination: '/ap-biology-tutor', permanent: true },
  { source: '/ap-biology-ivy-league', destination: '/ap-biology-tutor', permanent: true },
  { source: '/bs-md-ap-biology', destination: '/ap-biology-tutor', permanent: true },
  { source: '/pre-med-ap-biology-tutor', destination: '/ap-biology-tutor', permanent: true },
  { source: '/common-app-biology-activities', destination: '/ap-biology-tutor', permanent: true },
  { source: '/cerebrum-vs-kaplan-ap-biology', destination: '/ap-biology-tutor', permanent: true },
  { source: '/mcat-biology-tutor', destination: '/mcat-biology', permanent: true },
  {
    source: '/mcat-biology-tutor-portland',
    destination: '/mcat-biology-tutor-seattle',
    permanent: true,
  },
  { source: '/mcat-canada-tutor', destination: '/mcat-biology-tutor-toronto', permanent: true },
  {
    source: '/mcat-bio-biochem-prep',
    destination: '/mcat-biology-bb-section-prep',
    permanent: true,
  },
  {
    source: '/aamc-mcat-bio-biochem',
    destination: '/mcat-biology-bb-section-prep',
    permanent: true,
  },
  { source: '/cerebrum-vs-magoosh-mcat', destination: '/mcat-biology', permanent: true },
  { source: '/pre-med-biology-tutor', destination: '/mcat-biology', permanent: true },
  { source: '/premed-pathway-tutor', destination: '/mcat-biology', permanent: true },
  { source: '/pre-med-direct-admit-pathway', destination: '/mcat-biology', permanent: true },
  { source: '/direct-medical-admission-tutor', destination: '/mcat-biology', permanent: true },
  { source: '/global-pre-med-biology-coaching', destination: '/mcat-biology', permanent: true },
  { source: '/pre-dental', destination: '/dat-biology-preparation', permanent: true },
  { source: '/oat-biology-coaching', destination: '/dat-biology-preparation', permanent: true },
  { source: '/pcat-biology-coaching', destination: '/dat-biology-preparation', permanent: true },
  {
    source: '/dr-shekhar-singh-aiims-faculty',
    destination: '/dr-shekhar-singh-biology-faculty-india',
    permanent: true,
  },
  {
    source: '/about-aiims-faculty-credential',
    destination: '/dr-shekhar-singh-biology-faculty-india',
    permanent: true,
  },
  {
    source: '/aiims-international-recognition',
    destination: '/dr-shekhar-singh-biology-faculty-india',
    permanent: true,
  },
  {
    source: '/aiims-delhi-world-ranking',
    destination: '/dr-shekhar-singh-biology-faculty-india',
    permanent: true,
  },
  {
    source: '/aiims-trained-neet-biology-faculty',
    destination: '/dr-shekhar-singh-biology-faculty-india',
    permanent: true,
  },
  {
    source: '/aiims-vs-test-prep-instructors',
    destination: '/dr-shekhar-singh-biology-faculty-india',
    permanent: true,
  },
  {
    source: '/cerebrum-faculty-vs-test-prep-generalists',
    destination: '/dr-shekhar-singh-biology-faculty-india',
    permanent: true,
  },
  { source: '/aiims-selections', destination: '/results', permanent: true },
  { source: '/aiims-toppers', destination: '/results', permanent: true },
  { source: '/toppers', destination: '/results', permanent: true },
  { source: '/98-percent-success-rate', destination: '/results', permanent: true },
  { source: '/success-rate', destination: '/results', permanent: true },
  { source: '/parent-reviews', destination: '/testimonials', permanent: true },
  {
    source: '/testimonials/360-in-neet-biology',
    destination: '/how-to-score-360-neet-biology',
    permanent: true,
  },
  { source: '/money-back-guarantee', destination: '/pricing', permanent: true },
  { source: '/emi-options', destination: '/pricing', permanent: true },
  { source: '/payment-options', destination: '/pricing', permanent: true },
  { source: '/roi-analysis', destination: '/pricing', permanent: true },
  { source: '/pinnacle-tier', destination: '/pricing', permanent: true },
  { source: '/pursuit-tier', destination: '/pricing', permanent: true },
  { source: '/scholarship-application', destination: '/pricing', permanent: true },
  { source: '/neet-scholarship-test', destination: '/pricing', permanent: true },
  { source: '/cerebrum-vs-byjus', destination: '/cerebrum-vs-vedantu', permanent: true },
  {
    source: '/cerebrum-vs-unacademy',
    destination: '/cerebrum-vs-unacademy-neet-biology',
    permanent: true,
  },
  {
    source: '/cerebrum-vs-princeton-review',
    destination: '/cerebrum-vs-princeton-review-mcat',
    permanent: true,
  },
  { source: '/resonance-alternative-neet', destination: '/cerebrum-vs-allen', permanent: true },
  {
    source: '/class-9-neet-foundation',
    destination: '/best-neet-foundation-class-9',
    permanent: true,
  },
  {
    source: '/class-10-neet-foundation',
    destination: '/best-neet-foundation-class-10',
    permanent: true,
  },
  {
    source: '/after-class-10-neet-biology',
    destination: '/best-neet-foundation-class-10',
    permanent: true,
  },
  { source: '/foundation-programme', destination: '/best-neet-foundation-tutor', permanent: true },
  {
    source: '/class-11-neet-biology',
    destination: '/best-biology-tutor-class-11',
    permanent: true,
  },
  {
    source: '/entering-class-11-neet-biology',
    destination: '/best-biology-tutor-class-11',
    permanent: true,
  },
  {
    source: '/class-12-neet-biology',
    destination: '/best-biology-tutor-class-12',
    permanent: true,
  },
  {
    source: '/starting-neet-in-class-12',
    destination: '/best-biology-tutor-class-12',
    permanent: true,
  },
  { source: '/neet-dropper-coaching', destination: '/dropper', permanent: true },
  { source: '/dropper-programme', destination: '/dropper', permanent: true },
  { source: '/post-12-gap-year-neet', destination: '/dropper', permanent: true },
  { source: '/best-coaching-for-neet-repeaters', destination: '/neet-repeaters', permanent: true },
  { source: '/second-attempt-neet-biology', destination: '/neet-repeaters', permanent: true },
  { source: '/third-attempt-neet-biology', destination: '/neet-repeaters', permanent: true },
  {
    source: '/1-year-neet-biology-pathway',
    destination: '/one-year-neet-dropper-course',
    permanent: true,
  },
  {
    source: '/how-to-crack-neet-biology-in-one-year',
    destination: '/one-year-neet-dropper-course',
    permanent: true,
  },
  {
    source: '/how-to-score-300-neet-biology',
    destination: '/how-to-score-340-in-neet-biology',
    permanent: true,
  },
  {
    source: '/how-to-score-350-neet-biology',
    destination: '/how-to-score-360-neet-biology',
    permanent: true,
  },
  {
    source: '/360-in-neet-biology-blueprint',
    destination: '/how-to-score-360-neet-biology',
    permanent: true,
  },
  {
    source: '/best-neet-biology-books',
    destination: '/best-biology-books-for-neet',
    permanent: true,
  },
  {
    source: '/ncert-vs-trueman-vs-mtg',
    destination: '/best-biology-books-for-neet',
    permanent: true,
  },
  {
    source: '/most-important-neet-biology-chapters',
    destination: '/neet-biology-chapter-weightage',
    permanent: true,
  },
  {
    source: '/high-yield-neet-biology-topics',
    destination: '/neet-biology-chapter-weightage',
    permanent: true,
  },
  {
    source: '/neet-biology-weightage',
    destination: '/neet-biology-chapter-weightage',
    permanent: true,
  },
  { source: '/neet-2026-syllabus', destination: '/neet-biology-syllabus-2026', permanent: true },
  { source: '/neet-cutoff-analysis', destination: '/neet-2026-cutoff', permanent: true },
  { source: '/neet-cutoff-calculator', destination: '/neet-2026-cutoff', permanent: true },
  { source: '/neet-qualifying-marks', destination: '/neet-2026-cutoff', permanent: true },
  { source: '/low-neet-score-options', destination: '/neet-2026-cutoff', permanent: true },
  {
    source: '/neet-biology-study-plan',
    destination: '/neet-study-plan-generator',
    permanent: true,
  },
  {
    source: '/neet-biology-30-day-revision',
    destination: '/free-neet-biology-revision-checklist',
    permanent: true,
  },
  {
    source: '/neet-biology-90-day-revision-plan',
    destination: '/free-neet-biology-revision-checklist',
    permanent: true,
  },
  {
    source: '/ncert-based-neet-biology-coaching',
    destination: '/ncert-biology-class-11-tuition',
    permanent: true,
  },
  {
    source: '/ncert-line-by-line-neet-biology',
    destination: '/ncert-biology-class-11-tuition',
    permanent: true,
  },
  { source: '/ncert-supplement', destination: '/ncert-biology-solutions', permanent: true },
  { source: '/cerebrum-study-material', destination: '/biology-notes', permanent: true },
  { source: '/how-to-memorize-neet-biology', destination: '/neet-biology', permanent: true },
  { source: '/spaced-repetition-neet-biology', destination: '/neet-biology', permanent: true },
  { source: '/anki-deck-neet-biology', destination: '/neet-biology', permanent: true },
  { source: '/neet-biology-tricks-shortcuts', destination: '/neet-biology', permanent: true },
  { source: '/neet-time-management', destination: '/neet-biology', permanent: true },
  { source: '/neet-biology-timeline', destination: '/neet-biology', permanent: true },
  { source: '/when-to-start-neet', destination: '/neet-biology', permanent: true },
  { source: '/first-attempt-neet-biology', destination: '/neet-biology', permanent: true },
  { source: '/diagram-based-neet-biology-prep', destination: '/neet-biology', permanent: true },
  { source: '/adaptive-neet-biology-mcq', destination: '/neet-biology-mcq', permanent: true },
  { source: '/assertion-reason-neet-biology', destination: '/neet-biology-mcq', permanent: true },
  { source: '/statement-based-neet-biology', destination: '/neet-biology-mcq', permanent: true },
  {
    source: '/1-on-1-neet-biology-coaching',
    destination: '/1-on-1-neet-biology-tutor',
    permanent: true,
  },
  {
    source: '/live-online-neet-biology-class',
    destination: '/live-online-neet-classes',
    permanent: true,
  },
  {
    source: '/recorded-neet-biology-lectures',
    destination: '/online-neet-coaching',
    permanent: true,
  },
  {
    source: '/hybrid-neet-biology-coaching',
    destination: '/online-neet-coaching',
    permanent: true,
  },
  {
    source: '/weekend-neet-biology-batch',
    destination: '/neet-biology-weekend-batch',
    permanent: true,
  },
  {
    source: '/sunday-only-neet-biology-batch',
    destination: '/neet-biology-weekend-batch',
    permanent: true,
  },
  {
    source: '/evening-neet-biology-batch',
    destination: '/neet-biology-weekend-batch',
    permanent: true,
  },
  {
    source: '/after-school-neet-biology-batch',
    destination: '/neet-biology-weekend-batch',
    permanent: true,
  },
  { source: '/personal-mentor-neet-biology', destination: '/mentorship-program', permanent: true },
  {
    source: '/personalized-neet-biology-learning',
    destination: '/mentorship-program',
    permanent: true,
  },
  { source: '/ai-tutor-neet-biology', destination: '/ceri-ai-demo', permanent: true },
  { source: '/doubt-resolution', destination: '/contact', permanent: true },
  { source: '/whatsapp-doubt-support', destination: '/contact', permanent: true },
  { source: '/parent-portal', destination: '/contact', permanent: true },
  {
    source: '/mental-health-neet-aspirants',
    destination: '/neet-guidance-seminar',
    permanent: true,
  },
  {
    source: '/neet-exam-anxiety-counselling',
    destination: '/neet-guidance-seminar',
    permanent: true,
  },
  { source: '/stress-management-neet', destination: '/neet-guidance-seminar', permanent: true },
  { source: '/fear-of-failing-neet', destination: '/neet-guidance-seminar', permanent: true },
  { source: '/handle-neet-failure', destination: '/neet-guidance-seminar', permanent: true },
  { source: '/counselling-neet-droppers', destination: '/neet-guidance-seminar', permanent: true },
  {
    source: '/dropper-mental-health-support',
    destination: '/neet-guidance-seminar',
    permanent: true,
  },
  { source: '/parent-counselling', destination: '/neet-guidance-seminar', permanent: true },
  {
    source: '/how-parents-help-neet-aspirants',
    destination: '/neet-guidance-seminar',
    permanent: true,
  },
  { source: '/career-after-neet', destination: '/neet-guidance-seminar', permanent: true },
  {
    source: '/career-counselling-after-neet',
    destination: '/neet-guidance-seminar',
    permanent: true,
  },
  { source: '/post-neet-counselling', destination: '/neet-guidance-seminar', permanent: true },
  { source: '/allied-medical-careers', destination: '/neet-guidance-seminar', permanent: true },
  { source: '/mbbs-abroad-after-neet', destination: '/neet-guidance-seminar', permanent: true },
  { source: '/mbbs-abroad-options', destination: '/neet-guidance-seminar', permanent: true },
  {
    source: '/female-students-neet-biology',
    destination: '/online-neet-coaching',
    permanent: true,
  },
  {
    source: '/girls-only-neet-biology-coaching',
    destination: '/online-neet-coaching',
    permanent: true,
  },
  { source: '/safe-female-students-neet', destination: '/online-neet-coaching', permanent: true },
  { source: '/accessibility-neet-biology', destination: '/online-neet-coaching', permanent: true },
  {
    source: '/differently-abled-neet-coaching',
    destination: '/online-neet-coaching',
    permanent: true,
  },
  { source: '/pwd-neet-coaching', destination: '/online-neet-coaching', permanent: true },
  {
    source: '/visually-impaired-neet-biology',
    destination: '/online-neet-coaching',
    permanent: true,
  },
  {
    source: '/best-teacher-genetics-neet',
    destination: '/genetics-biology-tuition',
    permanent: true,
  },
  { source: '/genetics-neet-coaching', destination: '/neet-genetics-preparation', permanent: true },
  { source: '/best-teacher-cell-biology', destination: '/cell-biology-tuition', permanent: true },
  { source: '/cell-biology-neet-coaching', destination: '/cell-biology-tuition', permanent: true },
  {
    source: '/best-teacher-ecology-neet',
    destination: '/ecology-biology-tuition',
    permanent: true,
  },
  { source: '/ecology-neet-coaching', destination: '/ecology-biology-tuition', permanent: true },
  { source: '/best-teacher-evolution', destination: '/evolution-class-12', permanent: true },
  { source: '/evolution-neet-coaching', destination: '/evolution-class-12', permanent: true },
  {
    source: '/best-teacher-human-physiology',
    destination: '/human-physiology-tuition',
    permanent: true,
  },
  {
    source: '/human-physiology-neet-coaching',
    destination: '/human-physiology-tuition',
    permanent: true,
  },
  {
    source: '/best-teacher-plant-physiology',
    destination: '/plant-physiology-class-11',
    permanent: true,
  },
  {
    source: '/plant-physiology-neet-coaching',
    destination: '/plant-physiology-class-11',
    permanent: true,
  },
  { source: '/best-teacher-reproduction', destination: '/biology-tuition', permanent: true },
  { source: '/reproduction-neet-coaching', destination: '/biology-tuition', permanent: true },
  { source: '/best-teacher-biotechnology', destination: '/biology-tuition', permanent: true },
  {
    source: '/molecular-basis-of-inheritance-tutor',
    destination: '/molecular-biology-tuition',
    permanent: true,
  },
  { source: '/karnataka-puc-neet-biology', destination: '/boards/karnataka-puc', permanent: true },
  { source: '/kerala-hse-neet-biology', destination: '/boards/kerala-hse', permanent: true },
  {
    source: '/telangana-intermediate-neet-biology',
    destination: '/boards/telangana-intermediate',
    permanent: true,
  },
  { source: '/ap-intermediate-neet-biology', destination: '/boards/state-boards', permanent: true },
  {
    source: '/west-bengal-hs-neet-biology',
    destination: '/boards/west-bengal-hs',
    permanent: true,
  },
  { source: '/icse-class-12-neet-biology', destination: '/boards/icse', permanent: true },
  { source: '/isc-biology-neet', destination: '/boards/icse', permanent: true },
  { source: '/bsc-nursing-coaching', destination: '/neet-coaching', permanent: true },
  { source: '/veterinary-coaching', destination: '/neet-coaching', permanent: true },
  { source: '/biotechnology-neet-coaching', destination: '/neet-coaching', permanent: true },
  { source: '/biotechnology-entrance-coaching', destination: '/neet-coaching', permanent: true },
  {
    source: '/biotechnology-bsc-entrance-coaching',
    destination: '/neet-coaching',
    permanent: true,
  },
  { source: '/jee-biology-coaching', destination: '/biology-tutor-online', permanent: true },
  { source: '/bitsat-biology-coaching', destination: '/biology-tutor-online', permanent: true },
  { source: '/csir-net-life-sciences', destination: '/biology-tutor-online', permanent: true },
  { source: '/ugc-net-biology-coaching', destination: '/biology-tutor-online', permanent: true },
  { source: '/pgt-biology-coaching', destination: '/biology-tutor-online', permanent: true },
  { source: '/tgt-biology-coaching', destination: '/biology-tutor-online', permanent: true },
  { source: '/kvs-pgt-biology', destination: '/biology-tutor-online', permanent: true },
  { source: '/kvs-tgt-biology', destination: '/biology-tutor-online', permanent: true },
  { source: '/nvs-pgt-biology', destination: '/biology-tutor-online', permanent: true },
  { source: '/nvs-tgt-biology', destination: '/biology-tutor-online', permanent: true },
  { source: '/dsssb-pgt-biology', destination: '/biology-tutor-online', permanent: true },
  { source: '/dsssb-tgt-biology', destination: '/biology-tutor-online', permanent: true },
]

/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const cityHubBrokenLinkRedirects = [
  { source: '/aiims-coaching-delhi', destination: '/biology-classes-delhi', permanent: true },
  {
    source: '/biology-classes-andrews-ganj',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  { source: '/biology-classes-bawal', destination: '/biology-classes-near-me', permanent: true },
  { source: '/biology-classes-bhiwani', destination: '/biology-classes-near-me', permanent: true },
  {
    source: '/biology-classes-chanakyapuri',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  { source: '/biology-classes-class-11', destination: '/neet-coaching', permanent: true },
  { source: '/biology-classes-class-12', destination: '/neet-coaching', permanent: true },
  {
    source: '/biology-classes-connaught-place',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-delhi/janakpuri',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-dharuhera',
    destination: '/biology-classes-near-me',
    permanent: true,
  },
  {
    source: '/biology-classes-dps-road-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-dwarka/sector-12',
    destination: '/neet-coaching-dwarka',
    permanent: true,
  },
  {
    source: '/biology-classes-faridabad/ballabgarh',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/biology-classes-faridabad/greater-faridabad',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/biology-classes-faridabad/nit',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/biology-classes-faridabad/sector-15',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/biology-classes-faridabad/sector-21',
    destination: '/neet-coaching-faridabad',
    permanent: true,
  },
  {
    source: '/biology-classes-ghaziabad/indirapuram',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-classes-ghaziabad/kaushambi',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-classes-ghaziabad/raj-nagar',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-classes-ghaziabad/vaishali',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-classes-ghaziabad/vasundhara',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-classes-golf-course-extension-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-greater-noida-west',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-greater-noida/alpha',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-greater-noida/beta',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-greater-noida/gaur-city',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-greater-noida/jaypee-greens',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-greater-noida/knowledge-park',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-greater-noida/pari-chowk',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-green-park/iit',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-aravali',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-badshapur',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-43',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-45',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-49',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-51',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-56',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-57',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-gurgaon-sector-73',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/biology-classes-ina', destination: '/biology-classes-delhi', permanent: true },
  { source: '/biology-classes-jaipur', destination: '/neet-coaching-jaipur', permanent: true },
  { source: '/biology-classes-janakpuri', destination: '/biology-classes-delhi', permanent: true },
  { source: '/biology-classes-jangpura', destination: '/biology-classes-delhi', permanent: true },
  { source: '/biology-classes-jhajjar', destination: '/biology-classes-near-me', permanent: true },
  {
    source: '/biology-classes-kotla-mubarakpur',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-laxmi-nagar',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-laxmi-nagar/krishna-nagar',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-mahendragarh/ateli',
    destination: '/neet-coaching-mahendragarh',
    permanent: true,
  },
  { source: '/biology-classes-manesar', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/biology-classes-manesar/sector-1',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-mayfield-garden-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-mayur-vihar/phase-1',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-mayur-vihar/phase-2',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-mayur-vihar/phase-3',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  { source: '/biology-classes-meerut', destination: '/biology-classes-near-me', permanent: true },
  { source: '/biology-classes-model-town', destination: '/biology-classes-delhi', permanent: true },
  {
    source: '/biology-classes-model-town/part-2',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  { source: '/biology-classes-moolchand', destination: '/biology-classes-delhi', permanent: true },
  { source: '/biology-classes-narnaul', destination: '/biology-classes-near-me', permanent: true },
  {
    source: '/biology-classes-noida-sector-137',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-noida/noida-extension',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-noida/sector-15',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-noida/sector-18',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-noida/sector-50',
    destination: '/neet-coaching-noida',
    permanent: true,
  },
  { source: '/biology-classes-palwal', destination: '/biology-classes-near-me', permanent: true },
  {
    source: '/biology-classes-patel-nagar/east',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-patel-nagar/west',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-preet-vihar',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-rajinder-nagar',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-11',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-13',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini-sector-16',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini/ashok-vihar',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini/model-town',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini/pitampura',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini/sector-7',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini/sector-9',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-rohini/shalimar-bagh',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/biology-classes-south-delhi/defence-colony',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-south-delhi/lajpat-nagar',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-south-delhi/saket',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-south-delhi/vasant-kunj',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-south-extension',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-sushant-lok-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-classes-uttam-nagar/east',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-uttam-nagar/west',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-vaishali-ghaziabad',
    destination: '/neet-coaching-ghaziabad',
    permanent: true,
  },
  {
    source: '/biology-classes-vasant-kunj/sector-a',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  { source: '/biology-classes-wazirpur', destination: '/biology-classes-delhi', permanent: true },
  { source: '/biology-coaching-gurugram', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/biology-tuition-chanakyapuri',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-tuition-dlf-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-tuition-golf-course-road-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/biology-tuition-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/biology-tuition-gurgaon-sector-51',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-tuition-gurgaon-sector-56',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/biology-tuition-nirvana-country-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/biology-tutor-delhi', destination: '/biology-classes-delhi', permanent: true },
  {
    source: '/biology-tutor-paschim-vihar',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-tutor-rajouri-garden',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/biology-tutor-subhash-nagar',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  { source: '/biology-tutor-tilak-nagar', destination: '/biology-classes-delhi', permanent: true },
  { source: '/biology-tutor-uttam-nagar', destination: '/biology-classes-delhi', permanent: true },
  { source: '/biology-tutor-vikaspuri', destination: '/biology-classes-delhi', permanent: true },
  {
    source: '/chemistry-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/free-demo', destination: '/book-free-demo', permanent: true },
  {
    source: '/hybrid-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/ib-biology-coaching-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/ib-to-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/medical-coaching-gurugram', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/morning-batch-neet-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-2026-preparation-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-ambala-haryana',
    destination: '/neet-coaching-chandigarh',
    permanent: true,
  },
  {
    source: '/neet-coaching-amritsar-court-road',
    destination: '/neet-coaching-amritsar',
    permanent: true,
  },
  {
    source: '/neet-coaching-amritsar-gt-road',
    destination: '/neet-coaching-amritsar',
    permanent: true,
  },
  {
    source: '/neet-coaching-amritsar-lawrence-road',
    destination: '/neet-coaching-amritsar',
    permanent: true,
  },
  {
    source: '/neet-coaching-amritsar-majitha-road',
    destination: '/neet-coaching-amritsar',
    permanent: true,
  },
  {
    source: '/neet-coaching-amritsar-mall-road',
    destination: '/neet-coaching-amritsar',
    permanent: true,
  },
  {
    source: '/neet-coaching-amritsar-ranjit-avenue',
    destination: '/neet-coaching-amritsar',
    permanent: true,
  },
  {
    source: '/neet-coaching-baltana-zirakpur',
    destination: '/neet-coaching-zirakpur',
    permanent: true,
  },
  {
    source: '/neet-coaching-central-delhi',
    destination: '/biology-classes-delhi',
    permanent: true,
  },
  {
    source: '/neet-coaching-chandigarh-sector-35',
    destination: '/neet-coaching-chandigarh',
    permanent: true,
  },
  {
    source: '/neet-coaching-chandigarh-sector-44',
    destination: '/neet-coaching-chandigarh',
    permanent: true,
  },
  {
    source: '/neet-coaching-comparison-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-dhakoli-zirakpur',
    destination: '/neet-coaching-zirakpur',
    permanent: true,
  },
  { source: '/neet-coaching-dharuhera', destination: '/biology-classes-near-me', permanent: true },
  {
    source: '/neet-coaching-emi-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gazipur-zirakpur',
    destination: '/neet-coaching-zirakpur',
    permanent: true,
  },
  {
    source: '/neet-coaching-golf-course-extension',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-golf-course-extension-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/neet-coaching-green-park', destination: '/biology-classes-delhi', permanent: true },
  {
    source: '/neet-coaching-gurgaon-sector-14',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-15',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-17',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-18',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-21',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-22',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-40',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-42',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-44',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-45',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-46',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-47',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-48',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-49',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-50',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-51',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-52',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-53',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-54',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-56',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-56-57',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-60',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-61',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-gurgaon-sector-82',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-huda-city-centre-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/neet-coaching-imt-manesar', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/neet-coaching-international-school-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-jalandhar-defence-colony',
    destination: '/neet-coaching-jalandhar',
    permanent: true,
  },
  {
    source: '/neet-coaching-jalandhar-green-model-town',
    destination: '/neet-coaching-jalandhar',
    permanent: true,
  },
  {
    source: '/neet-coaching-jalandhar-lajpat-nagar',
    destination: '/neet-coaching-jalandhar',
    permanent: true,
  },
  {
    source: '/neet-coaching-jalandhar-maqsudan',
    destination: '/neet-coaching-jalandhar',
    permanent: true,
  },
  {
    source: '/neet-coaching-jalandhar-model-town',
    destination: '/neet-coaching-jalandhar',
    permanent: true,
  },
  {
    source: '/neet-coaching-jalandhar-urban-estate',
    destination: '/neet-coaching-jalandhar',
    permanent: true,
  },
  {
    source: '/neet-coaching-kalka-panchkula',
    destination: '/neet-coaching-panchkula',
    permanent: true,
  },
  { source: '/neet-coaching-kharar-mohali', destination: '/neet-coaching-mohali', permanent: true },
  { source: '/neet-coaching-kharar-punjab', destination: '/neet-coaching-punjab', permanent: true },
  {
    source: '/neet-coaching-ludhiana-brs-nagar',
    destination: '/neet-coaching-ludhiana',
    permanent: true,
  },
  {
    source: '/neet-coaching-ludhiana-civil-lines',
    destination: '/neet-coaching-ludhiana',
    permanent: true,
  },
  {
    source: '/neet-coaching-ludhiana-dugri',
    destination: '/neet-coaching-ludhiana',
    permanent: true,
  },
  {
    source: '/neet-coaching-ludhiana-model-town',
    destination: '/neet-coaching-ludhiana',
    permanent: true,
  },
  {
    source: '/neet-coaching-ludhiana-pakhowal-road',
    destination: '/neet-coaching-ludhiana',
    permanent: true,
  },
  {
    source: '/neet-coaching-ludhiana-sarabha-nagar',
    destination: '/neet-coaching-ludhiana',
    permanent: true,
  },
  {
    source: '/neet-coaching-manesar-sectors',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-manimajra-chandigarh',
    destination: '/neet-coaching-chandigarh',
    permanent: true,
  },
  {
    source: '/neet-coaching-mg-road-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-mohali-aerocity',
    destination: '/neet-coaching-mohali',
    permanent: true,
  },
  {
    source: '/neet-coaching-mohali-it-city',
    destination: '/neet-coaching-mohali',
    permanent: true,
  },
  {
    source: '/neet-coaching-mohali-phase-1',
    destination: '/neet-coaching-mohali',
    permanent: true,
  },
  {
    source: '/neet-coaching-mohali-phase-6',
    destination: '/neet-coaching-mohali',
    permanent: true,
  },
  {
    source: '/neet-coaching-mohali-phase-9',
    destination: '/neet-coaching-mohali',
    permanent: true,
  },
  { source: '/neet-coaching-old-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/neet-coaching-panchkula-industrial',
    destination: '/neet-coaching-panchkula',
    permanent: true,
  },
  {
    source: '/neet-coaching-panchkula-sector-1',
    destination: '/neet-coaching-panchkula',
    permanent: true,
  },
  {
    source: '/neet-coaching-panchkula-sector-11',
    destination: '/neet-coaching-panchkula',
    permanent: true,
  },
  {
    source: '/neet-coaching-panchkula-sector-21',
    destination: '/neet-coaching-panchkula',
    permanent: true,
  },
  {
    source: '/neet-coaching-pathankot-punjab',
    destination: '/neet-coaching-punjab',
    permanent: true,
  },
  {
    source: '/neet-coaching-patiala-punjab',
    destination: '/neet-coaching-punjab',
    permanent: true,
  },
  {
    source: '/neet-coaching-peer-muchalla-zirakpur',
    destination: '/neet-coaching-zirakpur',
    permanent: true,
  },
  {
    source: '/neet-coaching-phagwara-punjab',
    destination: '/neet-coaching-punjab',
    permanent: true,
  },
  {
    source: '/neet-coaching-pinjore-panchkula',
    destination: '/neet-coaching-panchkula',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-15',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-22',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-rohini-sector-5',
    destination: '/neet-coaching-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-sector-99-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sectors-68-72-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sectors-73-78-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sectors-79-84-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sectors-81-85-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sectors-86-90-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-sectors-91-95-gurgaon',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-yamunanagar',
    destination: '/biology-classes-near-me',
    permanent: true,
  },
  {
    source: '/neet-coaching-zirakpur-patiala-road',
    destination: '/neet-coaching-zirakpur',
    permanent: true,
  },
  {
    source: '/neet-coaching-zirakpur-vip-road',
    destination: '/neet-coaching-zirakpur',
    permanent: true,
  },
  {
    source: '/neet-dropper-course-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/neet-droppers-batch-delhi', destination: '/biology-classes-delhi', permanent: true },
  { source: '/neet-foundation-gurugram', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/neet-hybrid-coaching', destination: '/neet-coaching', permanent: true },
  {
    source: '/neet-scholarship-test-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/neet-self-study-tips', destination: '/neet-coaching', permanent: true },
  { source: '/neet-weekend-batch', destination: '/neet-coaching', permanent: true },
  {
    source: '/personal-attention-neet-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/personalized-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  {
    source: '/premium-neet-coaching-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
  { source: '/science-coaching-gurugram', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/success-stories-gurugram', destination: '/neet-coaching-gurugram', permanent: true },
  {
    source: '/vedantu-alternative-gurugram',
    destination: '/neet-coaching-gurugram',
    permanent: true,
  },
]
