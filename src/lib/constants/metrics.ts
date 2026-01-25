/**
 * Standardized metrics for Cerebrum Biology Academy
 * IMPORTANT: Use these constants across all pages for consistency
 * Last verified: January 2026
 */

export const CEREBRUM_METRICS = {
  // Success metrics
  successRate: 94, // Percentage of students qualifying NEET
  successRateText: '94%',
  topScore: 695,
  topScoreTotal: 720,
  topScoreText: '695/720',

  // Student counts
  totalStudents: 2500,
  totalStudentsText: '2,500+',
  topRankers: 180,
  topRankersText: '180+',
  medicalSelections: 500,
  medicalSelectionsText: '500+',

  // Reviews/Ratings
  rating: 4.9,
  ratingText: '4.9/5',
  reviewCount: 847,
  reviewCountText: '847+ reviews',

  // Batch info
  batchSizeMin: 15,
  batchSizeMax: 20,
  batchSizeText: '15-20 students',

  // Faculty info
  facultyExperience: 15,
  facultyExperienceText: '15+ years',

  // Fee structure (annual)
  feeClass11: 60000,
  feeClass12: 75000,
  feeDropper: 65000,
  feeCrashCourse: 25000,

  // Contact
  phone: '+91-8826444334',
  phoneDisplay: '+91-88264-44334',
  email: 'info@cerebrumbiologyacademy.com',

  // Location
  mainAddress: 'Kalu Sarai, Near IIT Delhi, South Delhi',
  pincode: '110016',
  coordinates: {
    latitude: 28.5459,
    longitude: 77.1926,
  },
} as const

export const AREA_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Coaching Hubs
  'hauz-khas': { lat: 28.5494, lng: 77.2001 },
  'kalu-sarai': { lat: 28.5459, lng: 77.1926 },
  'malviya-nagar': { lat: 28.5350, lng: 77.2100 },
  'rajendra-nagar': { lat: 28.6389, lng: 77.1867 },
  'karol-bagh': { lat: 28.6514, lng: 77.1907 },

  // Posh Areas
  'greater-kailash': { lat: 28.5504, lng: 77.2434 },
  'defence-colony': { lat: 28.5743, lng: 77.2315 },
  'vasant-vihar': { lat: 28.5581, lng: 77.1548 },
  'panchsheel-park': { lat: 28.5417, lng: 77.2167 },
  'safdarjung-enclave': { lat: 28.5622, lng: 77.2000 },
  'east-of-kailash': { lat: 28.5567, lng: 77.2500 },
  'civil-lines': { lat: 28.6800, lng: 77.2250 },

  // Ultra-Premium
  'golf-links': { lat: 28.6000, lng: 77.2300 },
  'jor-bagh': { lat: 28.5883, lng: 77.2200 },
  'sunder-nagar': { lat: 28.5950, lng: 77.2400 },
  'gulmohar-park': { lat: 28.5550, lng: 77.2050 },

  // Govt Colonies
  'rk-puram': { lat: 28.5633, lng: 77.1755 },
  'sarojini-nagar': { lat: 28.5756, lng: 77.2000 },
  'lodhi-colony': { lat: 28.5850, lng: 77.2200 },
  'andrews-ganj': { lat: 28.5700, lng: 77.2150 },
  'kidwai-nagar': { lat: 28.5717, lng: 77.2017 },
  'netaji-nagar': { lat: 28.5650, lng: 77.1900 },
  'moti-bagh': { lat: 28.5783, lng: 77.1750 },

  // Residential
  saket: { lat: 28.5244, lng: 77.2090 },
  'green-park': { lat: 28.5597, lng: 77.2067 },
  'new-friends-colony': { lat: 28.5633, lng: 77.2617 },
  'cr-park': { lat: 28.5379, lng: 77.2475 },
  'lajpat-nagar': { lat: 28.5700, lng: 77.2400 },
  kalkaji: { lat: 28.5367, lng: 77.2579 },
  alaknanda: { lat: 28.5317, lng: 77.2517 },
  'sukhdev-vihar': { lat: 28.5567, lng: 77.2633 },
  okhla: { lat: 28.5417, lng: 77.2717 },

  // Gated Communities
  'vasant-kunj': { lat: 28.5204, lng: 77.1580 },

  // Student Hubs
  munirka: { lat: 28.5553, lng: 77.1695 },
  'ber-sarai': { lat: 28.5483, lng: 77.1867 },
  'katwaria-sarai': { lat: 28.5450, lng: 77.1933 },

  // Other
  'south-extension': { lat: 28.5697, lng: 77.2267 },
}
