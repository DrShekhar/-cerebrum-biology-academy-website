/**
 * Standardized metrics for Cerebrum Biology Academy
 * IMPORTANT: Use these constants across all pages for consistency
 * Last verified: January 2026
 */

export const CEREBRUM_METRICS = {
  // Success metrics
  successRate: 98, // Percentage of students qualifying NEET
  successRateText: '98%',
  topScore: 695,
  topScoreTotal: 720,
  topScoreText: '695/720',

  // Student counts
  totalStudents: 150000,
  totalStudentsText: '1,50,000+',
  topRankers: 180,
  topRankersText: '180+',
  medicalSelections: 67,
  medicalSelectionsText: '67+ AIIMS Selections',

  // Reviews/Ratings (actual Google reviews)
  rating: 5.0,
  ratingText: '5.0/5',
  reviewCount: 32,
  reviewCountText: '32 reviews',

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
  'malviya-nagar': { lat: 28.535, lng: 77.21 },
  'rajendra-nagar': { lat: 28.6389, lng: 77.1867 },
  'karol-bagh': { lat: 28.6514, lng: 77.1907 },

  // Posh Areas
  'greater-kailash': { lat: 28.5504, lng: 77.2434 },
  'defence-colony': { lat: 28.5743, lng: 77.2315 },
  'vasant-vihar': { lat: 28.5581, lng: 77.1548 },
  'panchsheel-park': { lat: 28.5417, lng: 77.2167 },
  'safdarjung-enclave': { lat: 28.5622, lng: 77.2 },
  'east-of-kailash': { lat: 28.5567, lng: 77.25 },
  'civil-lines': { lat: 28.68, lng: 77.225 },

  // Ultra-Premium
  'golf-links': { lat: 28.6, lng: 77.23 },
  'jor-bagh': { lat: 28.5883, lng: 77.22 },
  'sunder-nagar': { lat: 28.595, lng: 77.24 },
  'gulmohar-park': { lat: 28.555, lng: 77.205 },

  // Govt Colonies
  'rk-puram': { lat: 28.5633, lng: 77.1755 },
  'sarojini-nagar': { lat: 28.5756, lng: 77.2 },
  'lodhi-colony': { lat: 28.585, lng: 77.22 },
  'andrews-ganj': { lat: 28.57, lng: 77.215 },
  'kidwai-nagar': { lat: 28.5717, lng: 77.2017 },
  'netaji-nagar': { lat: 28.565, lng: 77.19 },
  'moti-bagh': { lat: 28.5783, lng: 77.175 },

  // Residential
  saket: { lat: 28.5244, lng: 77.209 },
  'green-park': { lat: 28.5597, lng: 77.2067 },
  'new-friends-colony': { lat: 28.5633, lng: 77.2617 },
  'cr-park': { lat: 28.5379, lng: 77.2475 },
  'lajpat-nagar': { lat: 28.57, lng: 77.24 },
  kalkaji: { lat: 28.5367, lng: 77.2579 },
  alaknanda: { lat: 28.5317, lng: 77.2517 },
  'sukhdev-vihar': { lat: 28.5567, lng: 77.2633 },
  okhla: { lat: 28.5417, lng: 77.2717 },

  // Gated Communities
  'vasant-kunj': { lat: 28.5204, lng: 77.158 },

  // Student Hubs
  munirka: { lat: 28.5553, lng: 77.1695 },
  'ber-sarai': { lat: 28.5483, lng: 77.1867 },
  'katwaria-sarai': { lat: 28.545, lng: 77.1933 },

  // Other
  'south-extension': { lat: 28.5697, lng: 77.2267 },
}

/**
 * Gurugram Area Coordinates
 * Center: M2K Corporate Park, Sector 51, Gurugram
 * Coverage: 20km radius
 */
export const GURUGRAM_AREA_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Ultra-Premium Areas
  'golf-course-road': { lat: 28.4365, lng: 77.064 },
  'dlf-phase-1': { lat: 28.4744, lng: 77.0856 },
  'dlf-phase-2': { lat: 28.4796, lng: 77.0896 },
  'dlf-phase-3': { lat: 28.4683, lng: 77.0823 },
  'dlf-phase-4': { lat: 28.4617, lng: 77.0756 },
  'dlf-phase-5': { lat: 28.4475, lng: 77.067 },

  // Premium Gated Communities
  'sushant-lok': { lat: 28.4595, lng: 77.0724 },
  'nirvana-country': { lat: 28.4224, lng: 77.0501 },
  'south-city-1': { lat: 28.4502, lng: 77.0642 },
  'south-city-2': { lat: 28.4324, lng: 77.0558 },
  'malibu-town': { lat: 28.4127, lng: 77.0428 },

  // Sector Residential Areas (Near Center)
  'sector-51': { lat: 28.4295, lng: 77.0426 }, // Center location
  'sector-49': { lat: 28.4176, lng: 77.0389 },
  'sector-54': { lat: 28.4475, lng: 77.067 },
  'sector-55': { lat: 28.4389, lng: 77.0573 },
  'sector-56': { lat: 28.435, lng: 77.053 },
  'sector-57': { lat: 28.428, lng: 77.048 },
  'sector-45': { lat: 28.4468, lng: 77.0611 },
  'sector-43': { lat: 28.4595, lng: 77.0724 },
  'sector-14': { lat: 28.4724, lng: 77.0724 },

  // New Gurugram (Sectors 65-84)
  'new-gurugram-65-84': { lat: 28.3965, lng: 77.0256 },
  'sector-66': { lat: 28.398, lng: 77.028 },
  'sector-67': { lat: 28.392, lng: 77.031 },
  'sector-68': { lat: 28.388, lng: 77.034 },
  'sector-69': { lat: 28.384, lng: 77.037 },
  'sector-70': { lat: 28.38, lng: 77.04 },
  'sector-70a': { lat: 28.376, lng: 77.042 },
  'sector-81': { lat: 28.37, lng: 77.02 },
  'sector-82': { lat: 28.365, lng: 77.025 },
  'sector-83': { lat: 28.36, lng: 77.03 },
  'sector-84': { lat: 28.355, lng: 77.035 },

  // Commercial & IT Hubs
  'cyber-city': { lat: 28.4948, lng: 77.0889 },
  'mg-road': { lat: 28.4796, lng: 77.0826 },
  'udyog-vihar': { lat: 28.505, lng: 77.085 },
  'iffco-chowk': { lat: 28.4724, lng: 77.0724 },

  // Sohna Road Corridor
  'sohna-road': { lat: 28.405, lng: 77.047 },
  'vatika-city': { lat: 28.385, lng: 77.042 },
  'bestech-park-view': { lat: 28.4, lng: 77.045 },
  'emaar-palm-hills': { lat: 28.39, lng: 77.04 },

  // Palam Vihar & Dwarka Expressway
  'palam-vihar': { lat: 28.505, lng: 77.035 },
  'sector-110': { lat: 28.52, lng: 77.02 },
  'sector-110a': { lat: 28.515, lng: 77.015 },

  // Manesar
  manesar: { lat: 28.3567, lng: 76.9378 },
  'imt-manesar': { lat: 28.37, lng: 76.94 },

  // Other Areas
  'golf-course-extension': { lat: 28.42, lng: 77.055 },
  'sun-city': { lat: 28.41, lng: 77.038 },
  'hamilton-court': { lat: 28.458, lng: 77.06 },
  'mayfield-garden': { lat: 28.432, lng: 77.044 },

  // Metro Station Areas
  'huda-city-centre': { lat: 28.4595, lng: 77.0724 },
  sikanderpur: { lat: 28.4824, lng: 77.0896 },
}

/**
 * Faridabad Area Coordinates
 * Center: Sector 17, Faridabad
 * Coverage: 15km radius
 */
export const FARIDABAD_AREA_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Central Faridabad (Premium Sectors)
  'sector-15': { lat: 28.4108, lng: 77.3148 },
  'sector-16': { lat: 28.4069, lng: 77.3158 },
  'sector-17': { lat: 28.4089, lng: 77.3178 }, // Center location
  'sector-21': { lat: 28.4028, lng: 77.3118 },
  'sector-28': { lat: 28.4467, lng: 77.3133 },
  'sector-29': { lat: 28.4428, lng: 77.3108 },
  'sector-31': { lat: 28.4789, lng: 77.3067 },
  'sector-37': { lat: 28.4633, lng: 77.3050 },

  // NIT & Old Faridabad
  'nit-faridabad': { lat: 28.4050, lng: 77.3150 },
  'old-faridabad': { lat: 28.4200, lng: 77.3200 },
  'ballabgarh': { lat: 28.3933, lng: 77.3117 },
  ajronda: { lat: 28.4089, lng: 77.3178 },

  // Greater Faridabad (Sectors 75-89)
  'sector-75': { lat: 28.3850, lng: 77.3050 },
  'sector-76': { lat: 28.3820, lng: 77.3030 },
  'sector-77': { lat: 28.3790, lng: 77.3010 },
  'sector-78': { lat: 28.3760, lng: 77.2990 },
  'sector-79': { lat: 28.3730, lng: 77.2970 },
  'sector-84': { lat: 28.3670, lng: 77.2910 },
  'sector-85': { lat: 28.3640, lng: 77.2890 },
  'sector-86': { lat: 28.3610, lng: 77.2870 },
  'sector-87': { lat: 28.3580, lng: 77.2850 },
  'sector-88': { lat: 28.3550, lng: 77.2830 },
  'sector-89': { lat: 28.3520, lng: 77.2810 },

  // Premium Townships
  'bptp-parklands': { lat: 28.3850, lng: 77.3050 },
  'omaxe-heights': { lat: 28.3790, lng: 77.3010 },
  'rps-palms': { lat: 28.3820, lng: 77.3030 },
  'srs-residency': { lat: 28.3730, lng: 77.2970 },
  'eldeco-area': { lat: 28.3760, lng: 77.2990 },
  'crown-interiorz-faridabad': { lat: 28.3610, lng: 77.2870 },

  // Other Areas
  surajkund: { lat: 28.4333, lng: 77.2867 },
  badkhal: { lat: 28.4333, lng: 77.3167 },
  'bata-chowk-area': { lat: 28.4050, lng: 77.3150 },
  'neelam-chowk-area': { lat: 28.4089, lng: 77.3178 },
  'mewala-maharajpur-area': { lat: 28.4611, lng: 77.3100 },
}

/**
 * Faridabad Center Specific Metrics
 * Sector 17, Faridabad
 */
export const FARIDABAD_CENTER_METRICS = {
  address: 'Sector 17',
  locality: 'Faridabad',
  region: 'Haryana',
  pincode: '121002',
  coordinates: {
    latitude: 28.4089,
    longitude: 77.3178,
  },
  coverageRadiusKm: 15,
  nearbyLandmark: 'Near Bata Chowk Metro (5 min walk)',
  metroAccess: 'Bata Chowk Metro (5 min walk)',
} as const

/**
 * Gurugram Center Specific Metrics
 * M2K Corporate Park, Sector 51, Gurugram
 */
export const GURUGRAM_CENTER_METRICS = {
  address: 'Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51',
  locality: 'Gurugram',
  region: 'Haryana',
  pincode: '122018',
  coordinates: {
    latitude: 28.4295,
    longitude: 77.0426,
  },
  coverageRadiusKm: 20,
  nearbyLandmark: 'Same building as Allen Career Institute',
  metroAccess: 'Sector 55-56 Rapid Metro (5 min walk)',
} as const
