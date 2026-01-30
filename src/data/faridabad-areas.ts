/**
 * Faridabad Area Data for SEO Landing Pages
 * Covers 15km radius from our center at Sector 17, Faridabad
 * Target audience: Students from top schools, premium societies, Greater Faridabad townships
 */

export interface FaridabadAreaDetails {
  name: string
  fullName: string
  description: string
  heroDescription: string
  nearbyMetro: string[]
  landmarks: string[]
  schools: string[]
  societies: string[] // Gated communities and societies
  highlights: string[]
  type: 'premium' | 'residential' | 'old-city' | 'greater-faridabad' | 'commercial' | 'industrial'
  pincode: string
  distanceFromCenter: string // Distance from Sector 17, Faridabad center
}

export const faridabadAreaDetails: Record<string, FaridabadAreaDetails> = {
  // CENTRAL FARIDABAD (Premium Sectors)
  'sector-15': {
    name: 'Sector 15',
    fullName: 'Sector 15, Faridabad',
    description: 'Established premium sector with quality apartments and schools',
    heroDescription:
      'Sector 15 is one of Faridabad\'s most established premium sectors with well-planned infrastructure. Home to families from DAV School and Crown Heights, students here seek quality NEET Biology coaching nearby.',
    nearbyMetro: ['Neelam Chowk Ajronda Metro'],
    landmarks: ['Neelam Chowk', 'Sector 15 Market', 'Crown Heights Plaza'],
    schools: ['DAV Public School Sec 15', 'Crown Heights School', 'Aggarwal Public School'],
    societies: ['Sector 15 Apartments', 'Neelam Apartments', 'Crown Heights Towers'],
    highlights: ['Established Area', 'Top Schools', 'Metro Connected', 'Premium Location'],
    type: 'premium',
    pincode: '121007',
    distanceFromCenter: '2 km',
  },
  'sector-16': {
    name: 'Sector 16',
    fullName: 'Sector 16, Faridabad',
    description: 'Premium residential sector adjacent to our center',
    heroDescription:
      'Sector 16 is directly adjacent to our Sector 17 center, making it the most convenient location for NEET aspirants. Students from St. John\'s School and nearby residential floors enjoy easy access to daily classes.',
    nearbyMetro: ['Bata Chowk Metro', 'Neelam Chowk Ajronda Metro'],
    landmarks: ['Sector 16 Market', 'St. John\'s Hospital', 'HUDA Gymkhana Club'],
    schools: ['St. John\'s School', 'Aggarwal Public School', 'Modern School Faridabad'],
    societies: ['Sector 16A Floors', 'Sector 16 HUDA Apartments', 'Private Builder Floors'],
    highlights: ['Adjacent to Center', 'Walk-in Access', 'Top Schools', 'Established Sector'],
    type: 'premium',
    pincode: '121002',
    distanceFromCenter: '1 km',
  },
  'sector-17': {
    name: 'Sector 17',
    fullName: 'Sector 17, Faridabad (Our Location)',
    description: 'Our center location - Heart of Faridabad',
    heroDescription:
      'Sector 17 is home to our Faridabad center, located in the heart of the city near HUDA Complex. This is Faridabad\'s administrative hub with excellent connectivity. Students from this sector enjoy the most convenient access to our NEET Biology coaching.',
    nearbyMetro: ['Bata Chowk Metro'],
    landmarks: ['HUDA Complex', 'Sector 17 Market', 'Mini Secretariat', 'Bata Chowk'],
    schools: ['Modern Vidya Niketan', 'DAV Sector 17', 'Ryan International'],
    societies: ['HUDA Colony', 'Sector 17 Floors', 'Government Housing'],
    highlights: ['Our Center', 'Heart of Faridabad', 'Most Convenient', 'Walk-in Access'],
    type: 'commercial',
    pincode: '121002',
    distanceFromCenter: '0 km',
  },
  'sector-21': {
    name: 'Sector 21',
    fullName: 'Sector 21, Faridabad',
    description: 'Premium sector with well-established infrastructure',
    heroDescription:
      'Sector 21 is a premium residential area in Faridabad with excellent schools and infrastructure. Families here prioritize quality education and seek specialized NEET Biology coaching for their medical aspirants.',
    nearbyMetro: ['Badkhal Mor Metro', 'Bata Chowk Metro'],
    landmarks: ['Sector 21 Market', 'MVN School Campus', 'Sector 21 Park'],
    schools: ['MVN School Sector 21', 'DAV Public School', 'Greenfields School'],
    societies: ['Sector 21 Premium Floors', 'Private Societies', 'HUDA Plots'],
    highlights: ['Premium Sector', 'Good Schools', 'Well-Planned', 'Central Location'],
    type: 'premium',
    pincode: '121001',
    distanceFromCenter: '3 km',
  },
  'sector-28': {
    name: 'Sector 28',
    fullName: 'Sector 28, Faridabad',
    description: 'Commercial hub with metro connectivity',
    heroDescription:
      'Sector 28 is Faridabad\'s major commercial hub with excellent metro connectivity via Sector 28 Metro Station. Students from nearby sectors and working families find our center easily accessible from this area.',
    nearbyMetro: ['Sector 28 Metro'],
    landmarks: ['Sector 28 Metro Station', 'Commercial Complex', 'Sector 28 Market'],
    schools: ['Ryan International School', 'DAV Sector 28', 'Modern School'],
    societies: ['Sector 28 Apartments', 'Metro View Apartments', 'Commercial Residences'],
    highlights: ['Metro Hub', 'Commercial Center', 'Easy Commute', 'Central Location'],
    type: 'commercial',
    pincode: '121008',
    distanceFromCenter: '4 km',
  },
  'sector-29': {
    name: 'Sector 29',
    fullName: 'Sector 29, Faridabad',
    description: 'Established residential area near metro',
    heroDescription:
      'Sector 29 is a well-established residential area in Faridabad with good metro connectivity. Students from this sector can easily reach our center via Sector 28 Metro Station.',
    nearbyMetro: ['Sector 28 Metro', 'Badkhal Mor Metro'],
    landmarks: ['Sector 29 Market', 'Badkhal Road', 'Sector 29 Park'],
    schools: ['DAV Sector 29', 'St. Mary\'s School', 'Local Schools'],
    societies: ['Sector 29 Floors', 'Established Apartments', 'HUDA Housing'],
    highlights: ['Established Area', 'Metro Access', 'Good Connectivity', 'Residential'],
    type: 'residential',
    pincode: '121008',
    distanceFromCenter: '5 km',
  },
  'sector-31': {
    name: 'Sector 31',
    fullName: 'Sector 31, Faridabad',
    description: 'NHPC Colony and residential area',
    heroDescription:
      'Sector 31 houses the prestigious NHPC Colony along with other residential societies. Students from NHPC families and nearby areas seek quality NEET coaching with convenient metro access.',
    nearbyMetro: ['NHPC Chowk Metro'],
    landmarks: ['NHPC Chowk', 'NHPC Colony', 'Sector 31 Market'],
    schools: ['NHPC DAV School', 'Local Schools', 'Aravali School'],
    societies: ['NHPC Colony', 'Sector 31 Apartments', 'Government Housing'],
    highlights: ['NHPC Colony', 'Metro Connected', 'PSU Families', 'Good Schools'],
    type: 'residential',
    pincode: '121003',
    distanceFromCenter: '6 km',
  },
  'sector-37': {
    name: 'Sector 37',
    fullName: 'Sector 37, Faridabad',
    description: 'Industrial and commercial hub',
    heroDescription:
      'Sector 37 is Faridabad\'s industrial hub with many offices and factories. Students from families working in this area prefer our centrally located coaching center for convenient access.',
    nearbyMetro: ['Sector 28 Metro', 'NHPC Chowk Metro'],
    landmarks: ['Industrial Area', 'Sector 37 Market', 'Mathura Road'],
    schools: ['DAV Sector 37', 'Industrial Area Schools', 'Local Schools'],
    societies: ['Sector 37 Residences', 'Worker Housing', 'Industrial Flats'],
    highlights: ['Industrial Hub', 'Affordable', 'Working Class', 'Accessible'],
    type: 'industrial',
    pincode: '121003',
    distanceFromCenter: '7 km',
  },

  // NIT & OLD FARIDABAD
  'nit-faridabad': {
    name: 'NIT Faridabad',
    fullName: 'NIT Faridabad (New Industrial Township)',
    description: 'Established industrial township with residential areas',
    heroDescription:
      'NIT Faridabad is one of the oldest planned townships in Faridabad with established infrastructure. Students from NIT Colony families, many from industrial and business backgrounds, seek quality NEET coaching.',
    nearbyMetro: ['Old Faridabad Metro', 'Neelam Chowk Ajronda Metro'],
    landmarks: ['NIT Complex', 'NIT Market', 'Railway Station'],
    schools: ['NIT DAV School', 'Aggarwal Public School', 'Local Schools'],
    societies: ['NIT Colony', 'NIT Apartments', 'Industrial Housing'],
    highlights: ['Industrial Township', 'Established', 'Business Families', 'Central'],
    type: 'industrial',
    pincode: '121001',
    distanceFromCenter: '3 km',
  },
  'old-faridabad': {
    name: 'Old Faridabad',
    fullName: 'Old Faridabad',
    description: 'Historic heart of Faridabad with metro connectivity',
    heroDescription:
      'Old Faridabad is the historic heart of the city with a vibrant business community. Students from trader and business families here seek quality NEET coaching with convenient metro access via Old Faridabad Metro Station.',
    nearbyMetro: ['Old Faridabad Metro'],
    landmarks: ['Old Faridabad Railway Station', 'Main Market', 'Bus Stand'],
    schools: ['Aggarwal Public School', 'DAV Old Faridabad', 'Local Schools'],
    societies: ['Old City Mohallas', 'Market Area Residences', 'Traditional Homes'],
    highlights: ['Historic Area', 'Business Families', 'Metro Connected', 'Central'],
    type: 'old-city',
    pincode: '121001',
    distanceFromCenter: '2 km',
  },
  'ballabgarh': {
    name: 'Ballabgarh',
    fullName: 'Ballabgarh, Faridabad',
    description: 'Largest suburb of Faridabad with growing population',
    heroDescription:
      'Ballabgarh is Faridabad\'s largest suburb with a growing population and emerging educational infrastructure. Students from Asavari, MVN Ballabgarh, and other schools travel to our Sector 17 center for quality NEET coaching.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Ballabgarh Railway Station', 'Asavari Road', 'Ballabgarh Market'],
    schools: ['MVN School Ballabgarh', 'DAV Ballabgarh', 'Asavari International'],
    societies: ['Asavari Society', 'Old Town Ballabgarh', 'New Ballabgarh'],
    highlights: ['Largest Suburb', 'Growing Area', 'Major Schools', 'Developing'],
    type: 'old-city',
    pincode: '121004',
    distanceFromCenter: '8 km',
  },
  'ajronda': {
    name: 'Ajronda',
    fullName: 'Ajronda, Faridabad',
    description: 'Central locality with Neelam Chowk metro',
    heroDescription:
      'Ajronda, near Neelam Chowk, is a central locality in Faridabad with excellent metro connectivity. Students from Apeejay School and surrounding areas find our center easily accessible.',
    nearbyMetro: ['Neelam Chowk Ajronda Metro'],
    landmarks: ['Neelam Chowk Ajronda Metro', 'Apeejay School', 'Crown Plaza'],
    schools: ['Apeejay School Faridabad', 'Crown Public School', 'Local Schools'],
    societies: ['Ajronda Residences', 'Neelam Apartments', 'Middle Class Housing'],
    highlights: ['Metro Station', 'Central Location', 'Good Schools', 'Accessible'],
    type: 'residential',
    pincode: '121003',
    distanceFromCenter: '2 km',
  },

  // GREATER FARIDABAD (Premium Townships - Sectors 75-89)
  'sector-75': {
    name: 'Sector 75',
    fullName: 'Sector 75, Greater Faridabad',
    description: 'BPTP Parklands premium township',
    heroDescription:
      'Sector 75 houses the prestigious BPTP Parklands township, one of Faridabad\'s most premium gated communities. Elite families here invest in quality education and seek specialized NEET Biology coaching.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['BPTP Parklands', 'Sector 75 Market', 'Greater Faridabad'],
    schools: ['DAV Greater Faridabad', 'Ryan International', 'Internal Township Schools'],
    societies: ['BPTP Parklands', 'Premium Villas', 'High-Rise Apartments'],
    highlights: ['BPTP Parklands', 'Ultra-Premium', 'Gated Township', 'Elite Families'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '10 km',
  },
  'sector-76': {
    name: 'Sector 76',
    fullName: 'Sector 76, Greater Faridabad',
    description: 'RPS Palms premium township',
    heroDescription:
      'Sector 76 features the RPS Palms township, a premium residential community in Greater Faridabad. Families from this exclusive township seek quality NEET coaching for their children\'s medical aspirations.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['RPS Palms', 'Sector 76 Junction', 'Greater Faridabad Road'],
    schools: ['DPS Greater Faridabad', 'Ryan International', 'Local Schools'],
    societies: ['RPS Palms', 'RPS Savana', 'Premium Floors'],
    highlights: ['RPS Palms', 'Premium Township', 'Growing Area', 'Quality Housing'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '11 km',
  },
  'sector-77': {
    name: 'Sector 77',
    fullName: 'Sector 77, Greater Faridabad',
    description: 'Omaxe Heights premium township',
    heroDescription:
      'Sector 77 is home to Omaxe Heights, one of Greater Faridabad\'s most sought-after townships. Premium families here prioritize education and seek specialized NEET coaching for their children.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Omaxe Heights', 'Sector 77 Market', 'Greater Faridabad Bypass'],
    schools: ['MVN Sector 88', 'Greater Faridabad Schools', 'Local Schools'],
    societies: ['Omaxe Heights', 'Omaxe Floors', 'Premium Apartments'],
    highlights: ['Omaxe Heights', 'Premium Township', 'Growing Area', 'Family Oriented'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '12 km',
  },
  'sector-78': {
    name: 'Sector 78',
    fullName: 'Sector 78, Greater Faridabad',
    description: 'Eldeco Saubhagyam premium township',
    heroDescription:
      'Sector 78 features Eldeco Saubhagyam, a premium residential complex in Greater Faridabad. Families from this township seek quality NEET coaching with convenient access and expert faculty.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Eldeco Saubhagyam', 'Sector 78 Road', 'Greater Faridabad'],
    schools: ['Modern School', 'Greater Faridabad Schools', 'Local Schools'],
    societies: ['Eldeco Saubhagyam', 'Eldeco Floors', 'Premium Housing'],
    highlights: ['Eldeco Township', 'Premium Living', 'Growing Area', 'Quality Homes'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '13 km',
  },
  'sector-79': {
    name: 'Sector 79',
    fullName: 'Sector 79, Greater Faridabad',
    description: 'SRS Royal Hills township',
    heroDescription:
      'Sector 79 houses SRS Royal Hills, a developing premium township in Greater Faridabad. Young families moving here need quality NEET coaching for their children\'s medical entrance preparation.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['SRS Royal Hills', 'Sector 79 Junction', 'Greater Faridabad Bypass'],
    schools: ['Local Schools', 'Greater Faridabad Schools', 'Upcoming Schools'],
    societies: ['SRS Royal Hills', 'SRS Residency', 'Developing Housing'],
    highlights: ['SRS Township', 'Developing Area', 'Young Families', 'Affordable'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '14 km',
  },
  'sector-84': {
    name: 'Sector 84',
    fullName: 'Sector 84, Greater Faridabad',
    description: 'Omaxe New Heights premium township',
    heroDescription:
      'Sector 84 features Omaxe New Heights, a premium residential project in Greater Faridabad. Families here invest in quality education and seek specialized NEET Biology coaching.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Omaxe New Heights', 'Sector 84 Market', 'Greater Faridabad'],
    schools: ['Greater Faridabad Schools', 'MVN School', 'Local Schools'],
    societies: ['Omaxe New Heights', 'Premium Floors', 'High-Rise Apartments'],
    highlights: ['Omaxe Township', 'Premium Living', 'Growing Area', 'Modern Housing'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '15 km',
  },
  'sector-85': {
    name: 'Sector 85',
    fullName: 'Sector 85, Greater Faridabad',
    description: 'Ansal Aquapolis premium township',
    heroDescription:
      'Sector 85 is home to Ansal Aquapolis, one of Greater Faridabad\'s unique water-themed townships. Premium families here seek quality NEET coaching for their children\'s medical dreams.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Ansal Aquapolis', 'Sector 85 Road', 'Water Park Area'],
    schools: ['Internal Schools', 'Greater Faridabad Schools', 'Local Schools'],
    societies: ['Ansal Aquapolis', 'Premium Villas', 'Aqua Towers'],
    highlights: ['Ansal Aquapolis', 'Unique Township', 'Premium Living', 'Family Oriented'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '15 km',
  },
  'sector-86': {
    name: 'Sector 86',
    fullName: 'Sector 86, Greater Faridabad',
    description: 'Crown Interiorz Mall and premium residences',
    heroDescription:
      'Sector 86 is known for Crown Interiorz Mall and surrounding premium residences. This commercial-residential hub attracts families seeking quality NEET coaching nearby.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Crown Interiorz Mall', 'Sector 86 Market', 'Greater Faridabad'],
    schools: ['MVN School', 'Ryan International', 'Local Schools'],
    societies: ['Crown Plaza Residences', 'Premium Apartments', 'Mall Area Housing'],
    highlights: ['Crown Mall', 'Commercial Hub', 'Premium Area', 'Growing'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '14 km',
  },
  'sector-87': {
    name: 'Sector 87',
    fullName: 'Sector 87, Greater Faridabad',
    description: 'Sunshine Helios premium township',
    heroDescription:
      'Sector 87 features Sunshine Helios, a developing premium township in Greater Faridabad. Young families moving here need quality NEET coaching with expert guidance.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Sunshine Helios', 'Sector 87 Junction', 'Greater Faridabad Road'],
    schools: ['New Schools', 'Greater Faridabad Schools', 'Upcoming Institutions'],
    societies: ['Sunshine Helios', 'Premium Floors', 'New Developments'],
    highlights: ['Sunshine Township', 'New Development', 'Young Families', 'Potential'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '15 km',
  },
  'sector-88': {
    name: 'Sector 88',
    fullName: 'Sector 88, Greater Faridabad',
    description: 'MVN Campus area with educational focus',
    heroDescription:
      'Sector 88 is home to MVN University Campus, making it an education-focused area. Students from MVN and surrounding areas seek specialized NEET Biology coaching to complement their academic pursuits.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['MVN University', 'Sector 88 Campus', 'Greater Faridabad'],
    schools: ['MVN School Sector 88', 'MVN University', 'Local Schools'],
    societies: ['Campus Housing', 'Faculty Residences', 'Student Housing'],
    highlights: ['MVN Campus', 'Education Hub', 'Student Community', 'Academic Focus'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '16 km',
  },
  'sector-89': {
    name: 'Sector 89',
    fullName: 'Sector 89, Greater Faridabad',
    description: 'Latest development in Greater Faridabad',
    heroDescription:
      'Sector 89 represents the latest development phase in Greater Faridabad. New families moving here need accessible quality NEET coaching for their children\'s medical aspirations.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['New Developments', 'Sector 89 Road', 'Greater Faridabad Extension'],
    schools: ['Upcoming Schools', 'Greater Faridabad Schools', 'Local Schools'],
    societies: ['New Housing Projects', 'Developing Townships', 'Upcoming Societies'],
    highlights: ['New Development', 'Growing Area', 'Future Potential', 'Affordable'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '17 km',
  },

  // PREMIUM TOWNSHIPS (Named)
  'bptp-parklands': {
    name: 'BPTP Parklands',
    fullName: 'BPTP Parklands, Sector 75-76, Faridabad',
    description: 'Ultra-premium gated township with world-class amenities',
    heroDescription:
      'BPTP Parklands is Faridabad\'s most prestigious gated community spanning Sectors 75-76. Elite families in this township demand the best NEET coaching for their children. Our expert faculty and personalized attention match their expectations.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['BPTP Parklands Gate', 'Parklands Club', 'Premium Villas'],
    schools: ['DAV Greater Faridabad', 'Ryan International', 'Premium Schools'],
    societies: ['BPTP Parklands Villas', 'BPTP Independent Floors', 'BPTP Towers'],
    highlights: ['Most Exclusive', 'Gated Community', 'Elite Families', 'Premium Amenities'],
    type: 'premium',
    pincode: '121004',
    distanceFromCenter: '10 km',
  },
  'omaxe-heights': {
    name: 'Omaxe Heights',
    fullName: 'Omaxe Heights, Sector 77-78, Faridabad',
    description: 'Premium township by Omaxe Group',
    heroDescription:
      'Omaxe Heights is a premium township in Greater Faridabad known for quality construction and amenities. Families here prioritize education and seek specialized NEET Biology coaching.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Omaxe Heights Main Gate', 'Omaxe Club', 'Community Center'],
    schools: ['Greater Faridabad Schools', 'Premium Schools', 'Local Schools'],
    societies: ['Omaxe Heights Towers', 'Omaxe Floors', 'Premium Apartments'],
    highlights: ['Omaxe Brand', 'Premium Township', 'Quality Housing', 'Family Oriented'],
    type: 'premium',
    pincode: '121004',
    distanceFromCenter: '12 km',
  },
  'rps-palms': {
    name: 'RPS Palms',
    fullName: 'RPS Palms, Sector 76, Faridabad',
    description: 'Premium residential township with green spaces',
    heroDescription:
      'RPS Palms in Sector 76 offers premium living with extensive green spaces. Families in this township seek quality NEET coaching that matches their lifestyle expectations.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['RPS Palms Gate', 'Palm Residences', 'RPS Club'],
    schools: ['DPS Greater Faridabad', 'Premium Schools', 'Local Schools'],
    societies: ['RPS Palms Towers', 'RPS Villas', 'Premium Floors'],
    highlights: ['Green Township', 'Premium Living', 'Quality Amenities', 'Growing'],
    type: 'premium',
    pincode: '121004',
    distanceFromCenter: '11 km',
  },
  'srs-residency': {
    name: 'SRS Residency',
    fullName: 'SRS Residency, Greater Faridabad',
    description: 'Affordable premium township in Greater Faridabad',
    heroDescription:
      'SRS Residency offers affordable premium housing in Greater Faridabad. Middle-class families here seek quality NEET coaching at reasonable fees for their children\'s medical dreams.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['SRS Residency Gate', 'SRS Complex', 'Greater Faridabad Road'],
    schools: ['Local Schools', 'Greater Faridabad Schools', 'Affordable Schools'],
    societies: ['SRS Royal Hills', 'SRS Pearl Floors', 'SRS Towers'],
    highlights: ['Affordable Premium', 'Good Value', 'Growing Community', 'Family Housing'],
    type: 'greater-faridabad',
    pincode: '121004',
    distanceFromCenter: '14 km',
  },
  'eldeco-area': {
    name: 'Eldeco Area',
    fullName: 'Eldeco Saubhagyam, Sector 78, Faridabad',
    description: 'Premium Eldeco township with modern amenities',
    heroDescription:
      'Eldeco Saubhagyam in Sector 78 is a premium residential complex by the trusted Eldeco group. Families here seek quality NEET coaching to complement the premium lifestyle.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Eldeco Main Gate', 'Community Center', 'Eldeco Park'],
    schools: ['Modern School', 'Premium Schools', 'Local Schools'],
    societies: ['Eldeco Saubhagyam Towers', 'Eldeco Floors', 'Premium Apartments'],
    highlights: ['Eldeco Brand', 'Modern Living', 'Quality Construction', 'Premium'],
    type: 'premium',
    pincode: '121004',
    distanceFromCenter: '13 km',
  },

  // RESIDENTIAL & OTHER AREAS
  'surajkund': {
    name: 'Surajkund',
    fullName: 'Surajkund, Faridabad',
    description: 'Tourist area with upscale residences',
    heroDescription:
      'Surajkund is known for its historical lake, annual crafts mela, and upscale farmhouses. Families from this scenic area seek quality NEET coaching in centrally located Sector 17.',
    nearbyMetro: ['Badkhal Mor Metro', 'Old Faridabad Metro'],
    landmarks: ['Surajkund Lake', 'Mela Ground', 'Surajkund Road'],
    schools: ['Local Schools', 'Nearby Schools', 'Private Schools'],
    societies: ['Surajkund Farmhouses', 'Upscale Residences', 'Village Housing'],
    highlights: ['Tourist Area', 'Scenic Location', 'Upscale Housing', 'Natural Beauty'],
    type: 'residential',
    pincode: '121009',
    distanceFromCenter: '6 km',
  },
  'badkhal': {
    name: 'Badkhal',
    fullName: 'Badkhal, Faridabad',
    description: 'Residential area near Badkhal Lake',
    heroDescription:
      'Badkhal is a residential area near the famous Badkhal Lake. Students from DAV, Ryan, and other schools in this area travel to our Sector 17 center for quality NEET Biology coaching.',
    nearbyMetro: ['Badkhal Mor Metro'],
    landmarks: ['Badkhal Lake', 'Badkhal Village', 'Badkhal Road'],
    schools: ['DAV Badkhal', 'Ryan International', 'Local Schools'],
    societies: ['Badkhal Village', 'New Housing', 'Residential Colonies'],
    highlights: ['Lake Area', 'Natural Setting', 'Growing Area', 'Affordable'],
    type: 'residential',
    pincode: '121001',
    distanceFromCenter: '5 km',
  },

  // METRO-CONNECTED AREAS
  'bata-chowk-area': {
    name: 'Bata Chowk Area',
    fullName: 'Bata Chowk Area, Faridabad',
    description: 'Prime location with closest metro to our center',
    heroDescription:
      'Bata Chowk is the closest metro station to our Sector 17 center - just 5 minutes walk! Students from all over Faridabad use this metro station to access our NEET Biology coaching classes.',
    nearbyMetro: ['Bata Chowk Metro'],
    landmarks: ['Bata Chowk Metro Station', 'Bata Factory', 'NIT Faridabad'],
    schools: ['NIT Schools', 'Sector 16 Schools', 'Nearby Schools'],
    societies: ['NIT Colony', 'Sector 16 Area', 'Metro Vicinity Housing'],
    highlights: ['Metro Station', '5 min to Center', 'Most Convenient', 'Central'],
    type: 'commercial',
    pincode: '121001',
    distanceFromCenter: '1 km',
  },
  'neelam-chowk-area': {
    name: 'Neelam Chowk Area',
    fullName: 'Neelam Chowk Ajronda Area, Faridabad',
    description: 'Metro-connected central locality',
    heroDescription:
      'Neelam Chowk Ajronda area is a central locality with excellent metro connectivity. Students from Crown Heights, Apeejay School, and nearby areas easily access our center.',
    nearbyMetro: ['Neelam Chowk Ajronda Metro'],
    landmarks: ['Neelam Chowk Metro', 'Crown Plaza', 'Ajronda Junction'],
    schools: ['Apeejay School', 'Crown Public School', 'Local Schools'],
    societies: ['Neelam Apartments', 'Crown Heights', 'Local Housing'],
    highlights: ['Metro Station', 'Central Location', 'Good Schools', 'Accessible'],
    type: 'commercial',
    pincode: '121003',
    distanceFromCenter: '3 km',
  },
  'mewala-maharajpur-area': {
    name: 'Mewala Maharajpur',
    fullName: 'Mewala Maharajpur, Faridabad',
    description: 'Metro-connected area near Sector 27-28',
    heroDescription:
      'Mewala Maharajpur metro area serves Sectors 27 and 28. Students from this industrial-residential zone access our Sector 17 center via convenient metro connectivity.',
    nearbyMetro: ['Mewala Maharajpur Metro'],
    landmarks: ['Mewala Maharajpur Metro', 'Sector 27', 'Industrial Area'],
    schools: ['Local Schools', 'Sector 28 Schools', 'Industrial Area Schools'],
    societies: ['Worker Housing', 'Sector 27 Residences', 'Local Colonies'],
    highlights: ['Metro Connected', 'Industrial Area', 'Affordable', 'Accessible'],
    type: 'industrial',
    pincode: '121003',
    distanceFromCenter: '5 km',
  },

  // CROWN INTERIORZ / MALL AREA
  'crown-interiorz-faridabad': {
    name: 'Crown Interiorz Mall Area',
    fullName: 'Crown Interiorz Mall, Sector 86, Faridabad',
    description: 'Premium mall area with upscale residences',
    heroDescription:
      'Crown Interiorz Mall in Sector 86 is Greater Faridabad\'s premier shopping destination surrounded by upscale residences. Families in this area seek quality NEET coaching matching their lifestyle.',
    nearbyMetro: ['Escorts Mujesar Metro'],
    landmarks: ['Crown Interiorz Mall', 'Sector 86 Market', 'Premium Hotels'],
    schools: ['MVN School', 'Ryan International', 'Premium Schools'],
    societies: ['Crown Plaza Residences', 'Mall Area Apartments', 'Premium Housing'],
    highlights: ['Premium Mall', 'Upscale Area', 'Modern Living', 'Commercial Hub'],
    type: 'premium',
    pincode: '121004',
    distanceFromCenter: '14 km',
  },
}

// Course options for Faridabad
export const faridabadCourseOptions = [
  {
    name: 'Class 11 Foundation',
    duration: '2 Years',
    fee: '₹60,000/year',
    features: ['NCERT Mastery', 'Weekly Tests', 'Doubt Sessions', 'Study Material'],
  },
  {
    name: 'Class 12 Intensive',
    duration: '1 Year',
    fee: '₹75,000/year',
    features: ['Board + NEET Integration', 'Daily Practice', 'Mock Tests', 'Personal Mentoring'],
  },
  {
    name: 'Dropper Batch',
    duration: '1 Year',
    fee: '₹65,000/year',
    features: ['Full Syllabus Revision', 'Daily Tests', '1-on-1 Mentoring', 'Result Oriented'],
  },
]

// Helper functions
export function getFaridabadAreaBySlug(slug: string): FaridabadAreaDetails | undefined {
  return faridabadAreaDetails[slug]
}

export function getAllFaridabadAreaSlugs(): string[] {
  return Object.keys(faridabadAreaDetails)
}

export function getFaridabadAreasByType(type: FaridabadAreaDetails['type']): string[] {
  return Object.entries(faridabadAreaDetails)
    .filter(([_, area]) => area.type === type)
    .map(([slug]) => slug)
}

// Get nearby areas based on type and proximity
export function getNearbyFaridabadAreas(currentSlug: string): string[] {
  const current = faridabadAreaDetails[currentSlug]
  if (!current) return []

  const typeMapping: Record<string, string[]> = {
    premium: [
      'sector-15',
      'sector-16',
      'bptp-parklands',
      'omaxe-heights',
      'rps-palms',
      'eldeco-area',
      'crown-interiorz-faridabad',
    ],
    residential: ['sector-29', 'sector-31', 'surajkund', 'badkhal', 'ajronda'],
    'old-city': ['old-faridabad', 'ballabgarh', 'nit-faridabad'],
    'greater-faridabad': [
      'sector-75',
      'sector-76',
      'sector-77',
      'sector-78',
      'sector-79',
      'sector-84',
      'sector-85',
      'sector-86',
      'sector-87',
      'sector-88',
      'sector-89',
      'srs-residency',
    ],
    commercial: ['sector-17', 'sector-28', 'bata-chowk-area', 'neelam-chowk-area'],
    industrial: ['nit-faridabad', 'sector-37', 'mewala-maharajpur-area'],
  }

  const sameType = typeMapping[current.type] || []
  return sameType.filter((slug) => slug !== currentSlug && faridabadAreaDetails[slug]).slice(0, 4)
}
