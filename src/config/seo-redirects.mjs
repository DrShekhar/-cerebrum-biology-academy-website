/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const seoPageConsolidationRedirects = [
  // ============================================
  // Batch 1 sector entries consolidated into wildcard patterns in next.config.mjs
  // ============================================

  // ============================================
  // Batch 2: Gurgaon Locality Duplicates → /neet-coaching-gurgaon or /biology-classes-gurgaon
  // ============================================
  {
    source: '/biology-classes-dlf-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-golf-course-road-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-sohna-road-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-mg-road-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-palam-vihar-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-south-city-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-nirvana-country-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-new-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-cyber-city-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  { source: '/neet-coaching-dlf-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  {
    source: '/neet-coaching-golf-course-road-gurgaon',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/neet-coaching-sohna-road-gurgaon',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/neet-coaching-south-city-gurgaon',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/neet-coaching-nirvana-country-gurgaon',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/neet-coaching-manesar-gurgaon',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/neet-coaching-dwarka-expressway-gurgaon',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  { source: '/neet-coaching-new-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-spr-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  {
    source: '/neet-coaching-udyog-vihar-gurgaon',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },

  // ============================================
  // Batch 3: Gurgaon School-Specific Pages → /biology-classes-gurgaon
  // ============================================
  {
    source: '/biology-classes-dps-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-shri-ram-school-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-pathways-world-school',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-gd-goenka-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-heritage-school-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-amity-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-scottish-high-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-suncity-school-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-manav-rachna-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-shikshanter-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-rps-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-euro-international-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-ryan-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-dav-gurgaon',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-lotus-valley-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-classes-blue-bells-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },

  // ============================================
  // Batch 4: Gurgaon Intent/Variant Pages → /neet-coaching-gurgaon
  // ============================================
  {
    source: '/best-neet-coaching-in-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/how-to-prepare-for-neet-in-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/neet-coaching-fees-in-gurugram',
    destination: '/neet-coaching-fee-gurugram',
    permanent: true,
  },
  {
    source: '/neet-coaching-reviews-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/girls-neet-coaching-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/english-medium-neet-coaching-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/small-batch-neet-coaching-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  { source: '/pcb-coaching-gurugram', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/aiims-coaching-gurugram', destination: '/neet-coaching-gurgaon', permanent: true },
  {
    source: '/offline-neet-coaching-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/6-month-neet-coaching-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/weekend-neet-batch-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/evening-batch-neet-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/unacademy-alternative-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  { source: '/neet-droppers-batch-gurgaon', destination: '/courses/neet-dropper', permanent: true },
  // DUPLICATE REMOVED: { source: '/biology-tuition-gurgaon', destination: '/biology-classes-gurgaon', permanent: true },
  { source: '/biology-tutor-gurgaon', destination: '/biology-classes-gurgaon', permanent: true },
  {
    source: '/biology-home-tuition-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-10th-boards-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/biology-12th-boards-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  { source: '/biology-class-11-gurgaon', destination: '/biology-classes-gurgaon', permanent: true },
  { source: '/biology-class-12-gurgaon', destination: '/biology-classes-gurgaon', permanent: true },
  {
    source: '/biology-class-9-10-gurgaon',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/class-10-biology-tuition-gurugram',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/class-11-biology-tuition-gurugram',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/class-12-biology-tuition-gurugram',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/class-11-neet-coaching-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },
  {
    source: '/class-12-neet-coaching-gurugram',
    destination: '/neet-coaching-gurgaon',
    permanent: true,
  },

  // ============================================
  // Batch 5: Rohini Sector Pages → /biology-classes-rohini or /neet-coaching-north-delhi
  // ============================================
  {
    source: '/biology-tuition-rohini-west',
    destination: '/biology-classes-rohini',
    permanent: true,
  },
  {
    source: '/neet-coaching-dc-chowk-rohini',
    destination: '/biology-classes-rohini',
    permanent: true,
  },

  // ============================================
  // Batch 6: Delhi School-Specific Pages → nearest hub
  // ============================================
  {
    source: '/biology-classes-bal-bharati-students',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-sanskriti-school',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-springdales-school',
    destination: '/neet-coaching-centre',
    permanent: true,
  },
  {
    source: '/biology-coaching-sanskriti-school',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-modern-school',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-sardar-patel-vidyalaya',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-mothers-international-school',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-vasant-valley-school',
    destination: '/best-biology-tuition-vasant-vihar',
    permanent: true,
  },
  {
    source: '/biology-coaching-dps-rk-puram',
    destination: '/best-biology-tuition-rk-puram',
    permanent: true,
  },
  {
    source: '/biology-coaching-dps-vasant-kunj',
    destination: '/biology-classes-vasant-kunj',
    permanent: true,
  },
  {
    source: '/neet-coaching-pathways-school',
    destination: '/biology-classes-gurgaon',
    permanent: true,
  },
  {
    source: '/neet-coaching-presidium-school',
    destination: '/neet-coaching-centre',
    permanent: true,
  },
  {
    source: '/biology-tuition-ryan-international',
    destination: '/biology-classes-rohini',
    permanent: true,
  },

  // ============================================
  // Batch 7: Delhi Locality Thin Pages → nearest hub
  // Far-from-center localities with no unique content
  // ============================================
  {
    source: '/biology-classes-alaknanda',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-golf-links',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-jor-bagh',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-gulmohar-park',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-munirka',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-safdarjung-enclave',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-east-of-kailash',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-panchsheel-park',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-lodhi-colony',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-moti-bagh',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-nehru-place',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-sarojini-nagar',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-classes-defence-colony',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-ring-road-south-extension',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-class-11-south-delhi',
    destination: '/biology-classes-south-delhi',
    permanent: true,
  },
  {
    source: '/biology-coaching-class-12-south-delhi',
    destination: '/biology-classes-south-delhi',
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
    source: '/biology-classes-pitampura',
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
    destination: '/biology-classes-noida',
    permanent: true,
  },
  {
    source: '/biology-classes-indirapuram',
    destination: '/biology-classes-noida',
    permanent: true,
  },
  { source: '/biology-classes-ghaziabad', destination: '/biology-classes-noida', permanent: true },
  { source: '/biology-classes-rewari', destination: '/biology-classes-gurgaon', permanent: true },
  {
    source: '/biology-classes-mahendragarh',
    destination: '/biology-classes-gurgaon',
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
    source: '/neet-coaching-pitampura',
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
  { source: '/neet-coaching-kaushambi', destination: '/biology-classes-noida', permanent: true },
  {
    source: '/neet-coaching-vaishali-ghaziabad',
    destination: '/biology-classes-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-vasundhara-ghaziabad',
    destination: '/biology-classes-noida',
    permanent: true,
  },
  {
    source: '/neet-coaching-greater-noida-west',
    destination: '/biology-classes-noida',
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
    source: '/neet-coaching-lajpat-nagar',
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
  { source: '/neet-coaching/gurgaon-sector-:num', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/neet-coaching/gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/neet-coaching/dwarka', destination: '/neet-coaching-dwarka', permanent: true },
  { source: '/neet-coaching/rohini', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/neet-coaching/greater-kailash', destination: '/neet-coaching-south-delhi', permanent: true },
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
  { source: '/neet-coaching/chandigarh', destination: '/neet-coaching-chandigarh', permanent: true },
]

// ============================================
// [localSlug] thin pages → nearest hub page
// 58 thin location pages consolidated into stronger hubs
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const localAreaPageRedirects = [
  // --- Gurugram hub ---
  { source: '/best-biology-coaching-gurgaon', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/neet-coaching-gurgaon-sector-43', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/biology-coaching-gurgaon-sector-45', destination: '/neet-coaching-gurugram', permanent: true },
  { source: '/neet-biology-gurgaon-sector-57', destination: '/neet-coaching-gurugram', permanent: true },

  // --- Noida hub ---
  { source: '/best-biology-tuition-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-noida-sector-15', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-noida-sector-50', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-noida-sector-76', destination: '/neet-coaching-noida', permanent: true },

  // --- Faridabad hub ---
  { source: '/biology-coaching-faridabad-neet', destination: '/neet-coaching-faridabad', permanent: true },

  // --- Ghaziabad hub ---
  { source: '/best-biology-teacher-ghaziabad', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/biology-coaching-vasundhara-ghaziabad', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/neet-coaching-raj-nagar-extension', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/neet-coaching-crossings-republik', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/neet-coaching-mohan-nagar', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/neet-coaching-wave-city', destination: '/neet-coaching-ghaziabad', permanent: true },

  // --- Centre hub ---
  { source: '/biology-coaching-central-delhi', destination: '/neet-coaching-centre', permanent: true },

  // --- Rohini hub ---
  { source: '/neet-coaching-rohini-sector-3', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/neet-coaching-rohini-sector-7', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/neet-coaching-rohini-sector-8', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/neet-coaching-rohini-sector-9', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/neet-coaching-rohini-sector-11', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/neet-coaching-rohini-sector-13', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/neet-coaching-rohini-sector-16', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/neet-coaching-rohini-sector-24', destination: '/neet-coaching-rohini', permanent: true },
  { source: '/biology-coaching-shalimar-bagh', destination: '/neet-coaching-rohini', permanent: true },

  // --- Pitampura ---
  { source: '/neet-coaching-pitampura-delhi', destination: '/neet-coaching-pitampura', permanent: true },

  // --- South Delhi hub ---
  { source: '/neet-coaching-greater-kailash-delhi', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-lajpat-nagar-delhi', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-hauz-khas-delhi', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-malviya-nagar-delhi', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-kalkaji-delhi', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-nehru-place-delhi', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-defence-colony-delhi', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-south-extension-delhi', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-green-park-delhi', destination: '/neet-coaching-south-delhi', permanent: true },

  // --- West Delhi hub ---
  { source: '/neet-coaching-rajouri-garden-delhi', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/biology-coaching-punjabi-bagh-delhi', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-uttam-nagar', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-vikaspuri', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-tilak-nagar', destination: '/neet-coaching-west-delhi', permanent: true },

  // --- East Delhi hub ---
  { source: '/neet-coaching-nirman-vihar-delhi', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-mayur-vihar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-preet-vihar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-laxmi-nagar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-shahdara', destination: '/neet-coaching-east-delhi', permanent: true },

  // --- Dwarka hub ---
  { source: '/neet-coaching-dwarka-delhi', destination: '/neet-coaching-dwarka', permanent: true },
  { source: '/neet-coaching-dwarka-sector-7', destination: '/neet-coaching-dwarka', permanent: true },
  { source: '/neet-coaching-dwarka-sector-19', destination: '/neet-coaching-dwarka', permanent: true },

  // --- Bangalore hub ---
  { source: '/biology-coaching-electronic-city-bangalore', destination: '/neet-coaching-bangalore', permanent: true },
  { source: '/neet-biology-coaching-marathahalli-bangalore', destination: '/neet-coaching-bangalore', permanent: true },
  { source: '/biology-coaching-yelahanka-bangalore', destination: '/neet-coaching-bangalore', permanent: true },
  { source: '/neet-coaching-hebbal-bangalore', destination: '/neet-coaching-bangalore', permanent: true },

  // --- Punjab/Chandigarh ---
  { source: '/neet-coaching-mohali-punjab', destination: '/neet-coaching-mohali', permanent: true },
  { source: '/neet-coaching-panchkula-haryana', destination: '/neet-coaching-panchkula', permanent: true },
  { source: '/neet-coaching-zirakpur-punjab', destination: '/neet-coaching-zirakpur', permanent: true },
  { source: '/neet-coaching-ludhiana-punjab', destination: '/neet-coaching-ludhiana', permanent: true },
  { source: '/neet-coaching-jalandhar-punjab', destination: '/neet-coaching-jalandhar', permanent: true },
  { source: '/neet-coaching-amritsar-punjab', destination: '/neet-coaching-amritsar', permanent: true },
]

// ============================================
// GSC "Not found (404)" cleanup — remaining 404s
// Most of the 219 reported URLs are already handled by existing
// redirects (308). These expanded patterns cover the remaining ~100+ that return 404.
// ============================================
/** @type {Array<{source: string, destination: string, permanent: true}>} */
export const gsc404CleanupRedirects = [
  // --- /cities/ phantom routes (route doesn't exist) ---
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
  { source: '/neet-foundation-class-11-gurugram', destination: '/courses/class-11', permanent: true },

  // --- Biology tutor curriculum/city pages with no route ---
  { source: '/biology-tutor-cbse', destination: '/biology-tutor', permanent: true },
  { source: '/biology-tutor-icse', destination: '/biology-tutor', permanent: true },
  { source: '/biology-tutor-trivandrum', destination: '/biology-tutor', permanent: true },
  { source: '/biology-tutor-kochi', destination: '/biology-tutor', permanent: true },

  // --- Nested location sub-routes that don't exist ---
  { source: '/locations/bangalore/:path*', destination: '/neet-coaching-bangalore', permanent: true },

  // --- Blog posts that no longer exist ---
  { source: '/blog/neet-2026-preparation-90-day-strategy', destination: '/blog', permanent: true },
  { source: '/blog/neet-preparation-tips-delhi-ncr-students', destination: '/blog', permanent: true },
  { source: '/blog/kota-vs-online-neet-coaching-2025', destination: '/blog', permanent: true },
  { source: '/blog/neet-biology-syllabus-2025-complete-guide', destination: '/blog', permanent: true },

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

  // --- NEET coaching with India suffix (safe - only neet-coaching-:slug-india pattern) ---
  { source: '/neet-coaching-:slug-india', destination: '/neet-coaching', permanent: true },

  // --- Navigation/informational pages redirects ---
  { source: '/testimonials', destination: '/results', permanent: true },
  { source: '/success-stories', destination: '/results', permanent: true },
  { source: '/faculty', destination: '/about', permanent: true },
  { source: '/teachers', destination: '/about', permanent: true },
  { source: '/schedule', destination: '/courses', permanent: true },
  { source: '/timetable', destination: '/courses', permanent: true },
  { source: '/locations', destination: '/neet-coaching', permanent: true },
  { source: '/centres', destination: '/neet-coaching', permanent: true },
  { source: '/branches', destination: '/neet-coaching', permanent: true },

  // --- /centers/ phantom routes (old URL pattern, now /locations/) ---
  { source: '/centers', destination: '/neet-coaching', permanent: true },
  { source: '/centers/:path*', destination: '/neet-coaching', permanent: true },

  // --- Standalone pages that moved or don't exist ---
  { source: '/scholarships', destination: '/scholarship', permanent: true },
  { source: '/test-series', destination: '/test-series-schedule', permanent: true },
  { source: '/boards/state', destination: '/boards/state-boards', permanent: true },
  { source: '/parent-guide', destination: '/about', permanent: true },

  // --- Sitemap variants ---
  { source: '/sitemap', destination: '/sitemap.xml', permanent: true },

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
  { source: '/neet-coaching-alaknanda', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-chittaranjan-park', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-east-of-kailash', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-jangpura', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-kailash-colony', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-maharani-bagh', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-munirka', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-nehru-place', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-okhla', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-safdarjung', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-sarvapriya-vihar', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-shahpur-jat', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-shanti-niketan', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-vasant-vihar', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-sarita-vihar', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-jor-bagh', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-mehrauli', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-lado-sarai', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-chattarpur', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-alaknanda', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-cr-park', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-munirka', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-okhla', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-nehru-place', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/biology-coaching-sarita-vihar', destination: '/neet-coaching-south-delhi', permanent: true },

  // --- North Delhi micro-localities → /neet-coaching-north-delhi ---
  { source: '/neet-coaching-civil-lines', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/neet-coaching-kamla-nagar', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/neet-coaching-shakti-nagar', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/neet-coaching-timarpur', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/neet-coaching-hudson-lines', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/neet-coaching-kohat-enclave', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/neet-coaching-adarsh-nagar', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/neet-coaching-wazirpur', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/neet-coaching-ashok-vihar', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/biology-coaching-civil-lines', destination: '/neet-coaching-north-delhi', permanent: true },
  { source: '/biology-coaching-kamla-nagar', destination: '/neet-coaching-north-delhi', permanent: true },

  // --- East Delhi micro-localities → /neet-coaching-east-delhi ---
  { source: '/neet-coaching-preet-vihar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-nirman-vihar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-vivek-vihar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-anand-vihar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-lakshmi-nagar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-patparganj', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-shahdara', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-gandhi-nagar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/neet-coaching-geeta-colony', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/biology-coaching-laxmi-nagar', destination: '/neet-coaching-east-delhi', permanent: true },
  { source: '/biology-coaching-preet-vihar', destination: '/neet-coaching-east-delhi', permanent: true },

  // --- West Delhi micro-localities → /neet-coaching-west-delhi ---
  { source: '/neet-coaching-rajouri-garden', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-tilak-nagar', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-vikaspuri', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-uttam-nagar', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-hari-nagar', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-tagore-garden', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-kirti-nagar', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/neet-coaching-patel-nagar', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/biology-coaching-rajouri-garden', destination: '/neet-coaching-west-delhi', permanent: true },
  { source: '/biology-coaching-janakpuri', destination: '/neet-coaching-west-delhi', permanent: true },

  // --- Gurugram thin sectors → /neet-coaching-gurgaon ---
  { source: '/neet-coaching-sector-14-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-15-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-22-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-23-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-40-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-45-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-49-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-56-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-57-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-sector-82-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-manesar', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-palam-vihar-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },
  { source: '/neet-coaching-south-city-gurgaon', destination: '/neet-coaching-gurgaon', permanent: true },

  // --- Noida thin sectors → /neet-coaching-noida ---
  { source: '/neet-coaching-sector-15-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-16-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-18-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-25-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-37-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-44-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-50-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-76-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-93-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-104-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-120-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-sector-137-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-greater-noida', destination: '/neet-coaching-noida', permanent: true },
  { source: '/neet-coaching-noida-extension', destination: '/neet-coaching-noida', permanent: true },

  // --- Faridabad thin pages → /neet-coaching-faridabad ---
  { source: '/neet-coaching-sector-14-faridabad', destination: '/neet-coaching-faridabad', permanent: true },
  { source: '/neet-coaching-sector-15-faridabad', destination: '/neet-coaching-faridabad', permanent: true },
  { source: '/neet-coaching-sector-16-faridabad', destination: '/neet-coaching-faridabad', permanent: true },
  { source: '/neet-coaching-sector-21-faridabad', destination: '/neet-coaching-faridabad', permanent: true },
  { source: '/neet-coaching-sector-28-faridabad', destination: '/neet-coaching-faridabad', permanent: true },
  { source: '/neet-coaching-sector-37-faridabad', destination: '/neet-coaching-faridabad', permanent: true },
  { source: '/neet-coaching-nit-faridabad', destination: '/neet-coaching-faridabad', permanent: true },
  { source: '/neet-coaching-ballabgarh', destination: '/neet-coaching-faridabad', permanent: true },
  { source: '/neet-coaching-surajkund', destination: '/neet-coaching-faridabad', permanent: true },

  // --- Ghaziabad thin pages → /neet-coaching-ghaziabad ---
  { source: '/neet-coaching-vaishali-ghaziabad', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/neet-coaching-raj-nagar-ghaziabad', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/neet-coaching-vasundhara-ghaziabad', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/neet-coaching-crossing-republik', destination: '/neet-coaching-ghaziabad', permanent: true },
  { source: '/neet-coaching-kaushambi', destination: '/neet-coaching-ghaziabad', permanent: true },

  // --- School-specific thin pages → nearest hub ---
  { source: '/neet-coaching-near-:school-school-:slug', destination: '/neet-coaching', permanent: true },
  { source: '/biology-coaching-near-:school-school-:slug', destination: '/neet-coaching', permanent: true },
  { source: '/neet-coaching-near-dps-:slug', destination: '/neet-coaching', permanent: true },
  { source: '/neet-coaching-near-modern-school-:slug', destination: '/neet-coaching', permanent: true },
  { source: '/neet-coaching-near-sanskriti-school', destination: '/neet-coaching-south-delhi', permanent: true },
  { source: '/neet-coaching-near-springdales-:slug', destination: '/neet-coaching', permanent: true },
  { source: '/neet-coaching-near-amity-:slug', destination: '/neet-coaching-noida', permanent: true },

  // --- Generic "best" variations → hub ---
  { source: '/best-biology-coaching-:slug', destination: '/neet-coaching', permanent: true },
  { source: '/top-neet-coaching-:slug', destination: '/neet-coaching', permanent: true },
  { source: '/affordable-neet-coaching-:slug', destination: '/neet-coaching-fees', permanent: true },
  { source: '/cheap-neet-coaching-:slug', destination: '/neet-coaching-fees', permanent: true },
  { source: '/neet-coaching-fees-:slug', destination: '/neet-coaching-fees', permanent: true },
  { source: '/neet-coaching-reviews-:slug', destination: '/results', permanent: true },
]
