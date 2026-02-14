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
    destination: '/biology-classes-gurgaon',
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
    destination: '/neet-coaching-centre',
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
