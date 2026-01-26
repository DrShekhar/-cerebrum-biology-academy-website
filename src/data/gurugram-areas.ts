/**
 * Gurugram Area Data for SEO Landing Pages
 * Covers 20km radius from our center at M2K Corporate Park, Sector 51
 * Target audience: Students from top private schools, gated communities
 */

export interface GurugramAreaDetails {
  name: string
  fullName: string
  description: string
  heroDescription: string
  nearbyMetro: string[]
  landmarks: string[]
  schools: string[]
  societies: string[] // Gated communities and societies
  highlights: string[]
  type: 'ultra-premium' | 'premium' | 'gated' | 'residential' | 'commercial' | 'new-gurugram'
  pincode: string
  distanceFromCenter: string // Distance from M2K Corporate Park, Sector 51
}

export const gurugramAreaDetails: Record<string, GurugramAreaDetails> = {
  // ULTRA-PREMIUM AREAS (DLF Phases, Golf Course Road)
  'dlf-phase-1': {
    name: 'DLF Phase 1',
    fullName: 'DLF Phase 1, Gurugram',
    description: 'Elite DLF township with premium amenities',
    heroDescription:
      "DLF Phase 1 is Gurugram's first planned township, home to executives, entrepreneurs, and families from top corporate backgrounds. Students from DPS Gurugram, Pathways, and Heritage seek quality NEET coaching here.",
    nearbyMetro: ['Guru Dronacharya Metro', 'Sikanderpur Metro'],
    landmarks: ['DLF Galleria', 'Qutab Plaza', 'MG Road'],
    schools: ['DPS Gurugram', 'Heritage School', 'Pathways World School'],
    societies: ['DLF Phase 1 Villas', 'Magnolias', 'Beverly Park'],
    highlights: ['Elite Township', 'Top Schools', 'Corporate Families', 'Premium Location'],
    type: 'ultra-premium',
    pincode: '122002',
    distanceFromCenter: '8 km',
  },
  'dlf-phase-2': {
    name: 'DLF Phase 2',
    fullName: 'DLF Phase 2, Gurugram',
    description: 'Premium residential area near Cyber City',
    heroDescription:
      "DLF Phase 2 offers premium living adjacent to Cyber City. Home to IT professionals and business families who want their children to crack NEET with personalized coaching.",
    nearbyMetro: ['Sikanderpur Metro', 'Guru Dronacharya Metro'],
    landmarks: ['Cyber Hub', 'Ambience Mall', 'DLF Cyber City'],
    schools: ['Scottish High', 'GD Goenka', 'Amity International'],
    societies: ['DLF Carlton Estate', 'DLF Aralias', 'DLF Hamilton Court'],
    highlights: ['Near Cyber City', 'IT Families', 'Premium Homes', 'Metro Connected'],
    type: 'ultra-premium',
    pincode: '122002',
    distanceFromCenter: '9 km',
  },
  'dlf-phase-3': {
    name: 'DLF Phase 3',
    fullName: 'DLF Phase 3, Gurugram',
    description: 'Established DLF locality with excellent schools',
    heroDescription:
      "DLF Phase 3 is a mature residential area with well-established infrastructure. Parents here prioritize quality education and seek specialized NEET Biology coaching for their children.",
    nearbyMetro: ['Sikanderpur Metro', 'MG Road Metro'],
    landmarks: ['Sahara Mall', 'Phase 3 Market', 'MG Road'],
    schools: ['The Shri Ram School', 'Suncity School', 'Blue Bells'],
    societies: ['DLF Phase 3 Floors', 'DLF Trinity Towers', 'DLF Icon'],
    highlights: ['Established Area', 'Good Schools', 'Family Oriented', 'Central Location'],
    type: 'premium',
    pincode: '122002',
    distanceFromCenter: '8 km',
  },
  'dlf-phase-4': {
    name: 'DLF Phase 4',
    fullName: 'DLF Phase 4, Gurugram',
    description: 'Premium locality with luxury apartments',
    heroDescription:
      "DLF Phase 4 features some of Gurugram's most luxurious apartments and villas. Families here invest in premium education including specialized NEET Biology coaching.",
    nearbyMetro: ['Phase 3 Rapid Metro', 'Sikanderpur Metro'],
    landmarks: ['Galleria Market DLF 4', 'SuperMart 1', 'Leisure Valley Road'],
    schools: ['Pathways World School', 'Scottish High', 'Heritage School'],
    societies: ['DLF The Magnolias', 'DLF The Aralias', 'DLF Park Place'],
    highlights: ['Luxury Living', 'High Income', 'Top Schools', 'Gated Communities'],
    type: 'ultra-premium',
    pincode: '122009',
    distanceFromCenter: '7 km',
  },
  'dlf-phase-5': {
    name: 'DLF Phase 5',
    fullName: 'DLF Phase 5, Gurugram',
    description: 'Ultra-premium area with world-class amenities',
    heroDescription:
      "DLF Phase 5 hosts Gurugram's most exclusive residences including The Camellias and The Aralias. Elite families here demand the best NEET coaching for their children.",
    nearbyMetro: ['Sector 54 Chowk Rapid Metro', 'Golf Course Metro'],
    landmarks: ['DLF Golf Course', 'The Camellias', 'Galleria Market'],
    schools: ['The Shri Ram School', 'Pathways World School', 'Scottish High'],
    societies: ['DLF The Camellias', 'DLF Crest', 'The Aralias'],
    highlights: ['Most Exclusive', 'Golf Course', 'Ultra-Luxury', 'Elite Families'],
    type: 'ultra-premium',
    pincode: '122009',
    distanceFromCenter: '6 km',
  },
  'golf-course-road': {
    name: 'Golf Course Road',
    fullName: 'Golf Course Road, Gurugram',
    description: "Gurugram's most prestigious address",
    heroDescription:
      "Golf Course Road is Gurugram's most sought-after address, lined with ultra-luxury condominiums and corporate headquarters. Students here attend the best schools and need specialized NEET coaching.",
    nearbyMetro: ['Sector 54 Chowk Rapid Metro', 'Golf Course Metro'],
    landmarks: ['Central Plaza', 'One Horizon Centre', 'Palm Spring Plaza'],
    schools: ['Pathways World School', 'Heritage School', 'GD Goenka'],
    societies: ['Ireo Grand Arch', 'DLF Park Place', 'Central Park 2', 'Belaire'],
    highlights: ['Prime Location', 'Corporate HQs', 'Luxury Living', 'Premium Schools'],
    type: 'ultra-premium',
    pincode: '122002',
    distanceFromCenter: '5 km',
  },
  'sushant-lok': {
    name: 'Sushant Lok',
    fullName: 'Sushant Lok Phase 1, Gurugram',
    description: 'Premium residential area with excellent connectivity',
    heroDescription:
      "Sushant Lok is one of Gurugram's first planned residential areas with excellent schools and metro connectivity. Popular among professionals who want quality NEET coaching for their children.",
    nearbyMetro: ['HUDA City Centre Metro', 'IFFCO Chowk Metro'],
    landmarks: ['Sushant Lok Market', 'Galaxy Hotel', 'Sector 43 Metro Station'],
    schools: ['DPS Gurugram', 'Amity International', 'Blue Bells'],
    societies: ['Sushant Lok 1', 'Sushant Lok 2', 'Sushant Lok 3'],
    highlights: ['Established Area', 'Good Schools', 'Metro Connected', 'Family Friendly'],
    type: 'premium',
    pincode: '122002',
    distanceFromCenter: '6 km',
  },
  'nirvana-country': {
    name: 'Nirvana Country',
    fullName: 'Nirvana Country, Sector 50, Gurugram',
    description: 'Exclusive gated township with premium villas',
    heroDescription:
      "Nirvana Country is an exclusive gated township in Sector 50 featuring premium villas and low-rise apartments. Elite families here seek personalized NEET coaching for their children.",
    nearbyMetro: ['Sector 55-56 Rapid Metro', 'HUDA City Centre Metro'],
    landmarks: ['Nirvana Courtyard', 'Sector 50 Market', 'Golf Course Extension'],
    schools: ['The Shri Ram School', 'Suncity School', 'Pathways World School'],
    societies: ['Nirvana Country Floors', 'Nirvana Country Villas', 'Unitech South City 2'],
    highlights: ['Gated Township', 'Exclusive Living', 'Premium Villas', 'Elite Community'],
    type: 'ultra-premium',
    pincode: '122018',
    distanceFromCenter: '3 km',
  },
  'south-city-1': {
    name: 'South City 1',
    fullName: 'South City 1, Gurugram',
    description: 'Well-planned residential area with good infrastructure',
    heroDescription:
      "South City 1 is a well-planned residential township with excellent infrastructure and schools. Parents here prioritize quality education and seek specialized NEET Biology coaching.",
    nearbyMetro: ['HUDA City Centre Metro', 'Sector 42-43 Rapid Metro'],
    landmarks: ['South City 1 Market', 'MGF Mega City Mall', 'Unitech Cyber Park'],
    schools: ['DPS Gurugram', 'Amity International', 'GD Goenka'],
    societies: ['South City 1 Floors', 'Unitech South City 1', 'Vipul World'],
    highlights: ['Planned Township', 'Good Schools', 'Metro Access', 'Family Area'],
    type: 'premium',
    pincode: '122001',
    distanceFromCenter: '5 km',
  },
  'south-city-2': {
    name: 'South City 2',
    fullName: 'South City 2, Sector 49, Gurugram',
    description: 'Premium residential area near Sector 49',
    heroDescription:
      "South City 2 in Sector 49 offers premium living with excellent connectivity to our center in Sector 51. Ideal for students seeking personalized NEET coaching nearby.",
    nearbyMetro: ['Sector 55-56 Rapid Metro', 'HUDA City Centre Metro'],
    landmarks: ['Sector 49 Market', 'Nirvana Country', 'South City 1'],
    schools: ['Suncity School', 'The Shri Ram School', 'Pathways World School'],
    societies: ['Unitech South City 2', 'DLF Gardencity', 'Emaar Gurgaon Greens'],
    highlights: ['Near Our Center', 'Premium Housing', 'Good Schools', 'Convenient Location'],
    type: 'premium',
    pincode: '122018',
    distanceFromCenter: '2 km',
  },

  // SECTORS (Core Gurugram)
  'sector-14': {
    name: 'Sector 14',
    fullName: 'Sector 14, Gurugram',
    description: 'Old Gurugram with established infrastructure',
    heroDescription:
      "Sector 14 is part of Old Gurugram with well-established infrastructure and schools. Students from this area benefit from convenient access to quality NEET coaching.",
    nearbyMetro: ['IFFCO Chowk Metro', 'MG Road Metro'],
    landmarks: ['Sector 14 Market', 'Civil Hospital', 'Old DLF Colony'],
    schools: ['DAV Gurugram', 'Ryan International', 'St. Xavier\'s High School'],
    societies: ['Sector 14 DDA', 'Ansals Palam Vihar'],
    highlights: ['Old Gurugram', 'Established Area', 'Central Location', 'Good Connectivity'],
    type: 'residential',
    pincode: '122001',
    distanceFromCenter: '7 km',
  },
  'sector-43': {
    name: 'Sector 43',
    fullName: 'Sector 43, Gurugram',
    description: 'Metro-connected sector near HUDA City Centre',
    heroDescription:
      "Sector 43 enjoys excellent metro connectivity being close to HUDA City Centre. Students from top schools here seek quality NEET Biology coaching with convenient access.",
    nearbyMetro: ['Sector 42-43 Rapid Metro', 'HUDA City Centre Metro'],
    landmarks: ['Sector 43 Market', 'HUDA City Centre Metro', 'Sushant Lok'],
    schools: ['Blue Bells', 'Amity International', 'DPS Gurugram'],
    societies: ['Sector 43 Floors', 'HUDA Flats', 'Private Builder Floors'],
    highlights: ['Metro Connected', 'Central Location', 'Good Schools', 'Convenient'],
    type: 'residential',
    pincode: '122002',
    distanceFromCenter: '4 km',
  },
  'sector-45': {
    name: 'Sector 45',
    fullName: 'Sector 45, Gurugram',
    description: 'Commercial sector with office complexes',
    heroDescription:
      "Sector 45 is a mixed commercial-residential area with many corporate offices. Families working nearby prefer quality NEET coaching close to their workplace.",
    nearbyMetro: ['HUDA City Centre Metro', 'Sector 42-43 Rapid Metro'],
    landmarks: ['Sector 45 Market', 'Corporate Towers', 'M2K Corporate Park nearby'],
    schools: ['The Shri Ram School', 'Heritage School', 'Amity International'],
    societies: ['Sector 45 Floors', 'Unitech Palm Villas', 'Vipul Belmonte'],
    highlights: ['Corporate Area', 'Near Offices', 'Convenient Commute', 'Mixed Use'],
    type: 'commercial',
    pincode: '122003',
    distanceFromCenter: '3 km',
  },
  'sector-49': {
    name: 'Sector 49',
    fullName: 'Sector 49, Gurugram',
    description: 'Premium sector adjacent to South City 2',
    heroDescription:
      "Sector 49 is a premium residential area adjacent to South City 2 and very close to our center in Sector 51. Students here enjoy easy access to NEET coaching.",
    nearbyMetro: ['Sector 55-56 Rapid Metro', 'HUDA City Centre Metro'],
    landmarks: ['Sector 49 Market', 'South City 2', 'Nirvana Country'],
    schools: ['Suncity School', 'The Shri Ram School', 'Pathways World School'],
    societies: ['Emaar Gurgaon Greens', 'Unitech South City 2', 'DLF Gardencity'],
    highlights: ['Very Close', 'Premium Area', 'Good Schools', 'Easy Access'],
    type: 'premium',
    pincode: '122018',
    distanceFromCenter: '2 km',
  },
  'sector-51': {
    name: 'Sector 51',
    fullName: 'Sector 51, Gurugram (Our Location)',
    description: 'Our center location - M2K Corporate Park',
    heroDescription:
      "Sector 51 is home to our Gurugram center at M2K Corporate Park (same building as Allen). Students from nearby sectors enjoy the most convenient access to our NEET Biology coaching.",
    nearbyMetro: ['Sector 55-56 Rapid Metro', 'HUDA City Centre Metro'],
    landmarks: ['M2K Corporate Park', 'Allen Career Institute', 'Mayfield Garden'],
    schools: ['Suncity School', 'The Shri Ram School', 'Heritage School'],
    societies: ['Mayfield Garden', 'Sector 51 Floors', 'Emaar Imperial Garden'],
    highlights: ['Our Center', 'Same Building as Allen', 'Most Convenient', 'Walk-in Access'],
    type: 'commercial',
    pincode: '122018',
    distanceFromCenter: '0 km',
  },
  'sector-54': {
    name: 'Sector 54',
    fullName: 'Sector 54, Gurugram',
    description: 'Premium sector on Golf Course Road',
    heroDescription:
      "Sector 54 lies on the prestigious Golf Course Road with ultra-premium residential options. Elite families here seek the best NEET coaching for their children.",
    nearbyMetro: ['Sector 54 Chowk Rapid Metro', 'Golf Course Metro'],
    landmarks: ['Sector 54 Chowk', 'Golf Course Road', 'DLF Golf Course'],
    schools: ['Pathways World School', 'The Shri Ram School', 'Scottish High'],
    societies: ['DLF Park Place', 'Ireo Grand Arch', 'Central Park 2'],
    highlights: ['Golf Course Road', 'Ultra Premium', 'Elite Families', 'Luxury Living'],
    type: 'ultra-premium',
    pincode: '122002',
    distanceFromCenter: '5 km',
  },
  'sector-56': {
    name: 'Sector 56',
    fullName: 'Sector 56, Gurugram',
    description: 'Residential sector near HUDA City Centre',
    heroDescription:
      "Sector 56 is a well-developed residential area near HUDA City Centre Metro. Excellent for students who want metro-convenient access to quality NEET coaching.",
    nearbyMetro: ['HUDA City Centre Metro', 'Sector 55-56 Rapid Metro'],
    landmarks: ['Sector 56 Market', 'HUDA City Centre', 'Raheja Mall'],
    schools: ['DPS Gurugram', 'Amity International', 'GD Goenka'],
    societies: ['Sector 56 Floors', 'Tulip Orange', 'Emaar Emerald Estate'],
    highlights: ['HUDA City Centre', 'Metro Connected', 'Good Schools', 'Convenient'],
    type: 'residential',
    pincode: '122011',
    distanceFromCenter: '4 km',
  },
  'sector-57': {
    name: 'Sector 57',
    fullName: 'Sector 57, Gurugram',
    description: 'Premium sector with luxury apartments',
    heroDescription:
      "Sector 57 features premium residential towers and excellent schools. Students here benefit from quality NEET coaching with convenient metro access.",
    nearbyMetro: ['Sector 55-56 Rapid Metro', 'HUDA City Centre Metro'],
    landmarks: ['Sector 57 Market', 'One Horizon Centre', 'Bestech Business Towers'],
    schools: ['The Shri Ram School', 'Suncity School', 'Heritage School'],
    societies: ['Bestech Park View', 'Ireo Uptown', 'M3M Merlin'],
    highlights: ['Premium Living', 'Good Schools', 'Business Hub', 'Luxury Apartments'],
    type: 'premium',
    pincode: '122011',
    distanceFromCenter: '3 km',
  },
  'sector-58': {
    name: 'Sector 58',
    fullName: 'Sector 58, Gurugram',
    description: 'Residential sector on Sohna Road',
    heroDescription:
      "Sector 58 on Sohna Road offers a mix of residential and commercial spaces. Students here seek quality NEET coaching conveniently located nearby.",
    nearbyMetro: ['Sector 55-56 Rapid Metro', 'Golf Course Extension Road'],
    landmarks: ['Sector 58 Market', 'Vatika Business Park', 'Sohna Road Junction'],
    schools: ['GD Goenka', 'Amity International', 'Ryan International'],
    societies: ['Vatika City', 'Emaar Palm Hills', 'M3M Woodshire'],
    highlights: ['Sohna Road', 'Growing Area', 'Good Value', 'Accessible'],
    type: 'residential',
    pincode: '122011',
    distanceFromCenter: '4 km',
  },

  // NEW GURUGRAM (Sectors 65+)
  'sector-65': {
    name: 'Sector 65',
    fullName: 'Sector 65, New Gurugram',
    description: 'Developing sector in New Gurugram',
    heroDescription:
      "Sector 65 is part of the rapidly developing New Gurugram belt. Young families moving here need quality NEET coaching for their children's medical aspirations.",
    nearbyMetro: ['Golf Course Extension Road'],
    landmarks: ['Sector 65 Market', 'Badshahpur Road', 'Golf Course Extension'],
    schools: ['GD Goenka', 'DPS Gurugram Sector 67', 'Heritage School'],
    societies: ['Raheja Atharva', 'CHD Vann', 'Ansal API Sector 65'],
    highlights: ['New Gurugram', 'Developing Area', 'Young Families', 'Good Connectivity'],
    type: 'new-gurugram',
    pincode: '122101',
    distanceFromCenter: '7 km',
  },
  'sector-67': {
    name: 'Sector 67',
    fullName: 'Sector 67, New Gurugram',
    description: 'Premium sector in New Gurugram',
    heroDescription:
      "Sector 67 hosts premium residential projects in New Gurugram. Families here invest in quality education including specialized NEET Biology coaching.",
    nearbyMetro: ['Golf Course Extension Road'],
    landmarks: ['Sector 67 Market', 'DPS Gurugram Sec 67', 'Badshahpur'],
    schools: ['DPS Gurugram Sector 67', 'Heritage School', 'Pathways World School'],
    societies: ['Tata Primanti', 'Ireo Victory Valley', 'M3M Golf Estate'],
    highlights: ['Premium Projects', 'Good Schools', 'Peaceful Area', 'Modern Living'],
    type: 'premium',
    pincode: '122101',
    distanceFromCenter: '8 km',
  },
  'sector-69': {
    name: 'Sector 69',
    fullName: 'Sector 69, New Gurugram',
    description: 'Residential sector near SPR Road',
    heroDescription:
      "Sector 69 is a developing residential area near SPR Road. Students from this growing community seek quality NEET coaching for their medical entrance preparation.",
    nearbyMetro: ['SPR Road', 'Golf Course Extension'],
    landmarks: ['Sector 69 Market', 'SPR Road', 'Badshahpur'],
    schools: ['Heritage School', 'GD Goenka', 'Amity International'],
    societies: ['Ashiana Anmol', 'BPTP Park Serene', 'Signature Global'],
    highlights: ['Growing Area', 'Affordable', 'New Development', 'Good Potential'],
    type: 'new-gurugram',
    pincode: '122101',
    distanceFromCenter: '9 km',
  },
  'sector-70': {
    name: 'Sector 70',
    fullName: 'Sector 70, New Gurugram',
    description: 'Emerging residential area in New Gurugram',
    heroDescription:
      "Sector 70 is an emerging residential area in New Gurugram with many new housing projects. Families here need accessible quality NEET coaching.",
    nearbyMetro: ['SPR Road', 'Golf Course Extension'],
    landmarks: ['Sector 70 Market', 'SPR Road Junction'],
    schools: ['DPS Gurugram', 'GD Goenka', 'Heritage School'],
    societies: ['Experion Windchants', 'Paras Dews', 'Sobha City'],
    highlights: ['Emerging Area', 'New Projects', 'Young Families', 'Developing'],
    type: 'new-gurugram',
    pincode: '122101',
    distanceFromCenter: '10 km',
  },
  'sector-72': {
    name: 'Sector 72',
    fullName: 'Sector 72, New Gurugram',
    description: 'Affordable residential sector',
    heroDescription:
      "Sector 72 offers affordable housing in New Gurugram. Middle-class families here seek quality NEET coaching at reasonable fees for their children.",
    nearbyMetro: ['SPR Road', 'NH-8'],
    landmarks: ['Sector 72 Market', 'BPTP Terra', 'NH-8'],
    schools: ['DPS Gurugram', 'Ryan International', 'DAV Gurugram'],
    societies: ['BPTP Terra', 'ROF Atulyas', 'Signature Global'],
    highlights: ['Affordable', 'Middle Class', 'Good Value', 'Growing'],
    type: 'new-gurugram',
    pincode: '122004',
    distanceFromCenter: '12 km',
  },
  'sector-81': {
    name: 'Sector 81',
    fullName: 'Sector 81, New Gurugram',
    description: 'Developing sector near NH-8',
    heroDescription:
      "Sector 81 is a developing area near NH-8 with upcoming residential projects. Students here can access quality NEET coaching via good road connectivity.",
    nearbyMetro: ['NH-8', 'Dwarka Expressway'],
    landmarks: ['Sector 81 Market', 'NH-8 Junction', 'Dwarka Expressway'],
    schools: ['GD Goenka', 'Ryan International', 'DPS Gurugram'],
    societies: ['Godrej Aria', 'Sobha International City', 'Vatika INXT'],
    highlights: ['Near NH-8', 'Good Connectivity', 'Affordable', 'Developing'],
    type: 'new-gurugram',
    pincode: '122004',
    distanceFromCenter: '15 km',
  },
  'sector-82': {
    name: 'Sector 82',
    fullName: 'Sector 82, New Gurugram',
    description: 'Residential sector on Dwarka Expressway',
    heroDescription:
      "Sector 82 is located on the Dwarka Expressway with excellent connectivity to Delhi. Students here travel to our center via the expressway for NEET coaching.",
    nearbyMetro: ['Dwarka Expressway', 'NH-8'],
    landmarks: ['Dwarka Expressway', 'Sector 82 Market', 'Hero Honda Chowk'],
    schools: ['DPS Dwarka', 'GD Goenka', 'Ryan International'],
    societies: ['Vatika Turning Point', 'Experion Heart Song', 'ATS Destinaire'],
    highlights: ['Dwarka Expressway', 'Delhi Connected', 'Good Roads', 'Growing'],
    type: 'new-gurugram',
    pincode: '122004',
    distanceFromCenter: '16 km',
  },
  'sector-84': {
    name: 'Sector 84',
    fullName: 'Sector 84, New Gurugram',
    description: 'Affordable housing sector',
    heroDescription:
      "Sector 84 offers affordable housing options in New Gurugram. Students from this area seek accessible quality NEET coaching with EMI options.",
    nearbyMetro: ['Dwarka Expressway', 'NH-8'],
    landmarks: ['Sector 84 Market', 'Dwarka Expressway Junction'],
    schools: ['DPS Gurugram', 'Ryan International', 'GD Goenka'],
    societies: ['ROF Amaltas', 'Signature Global Signum', 'Trehan Luxury Floors'],
    highlights: ['Affordable Housing', 'Good Value', 'Young Families', 'Accessible'],
    type: 'new-gurugram',
    pincode: '122004',
    distanceFromCenter: '17 km',
  },

  // SOHNA ROAD & SOUTHERN GURUGRAM
  'sohna-road': {
    name: 'Sohna Road',
    fullName: 'Sohna Road, Gurugram',
    description: 'Major arterial road with premium developments',
    heroDescription:
      "Sohna Road is a major arterial road in Gurugram with numerous premium residential projects. Students from societies along Sohna Road access our center conveniently.",
    nearbyMetro: ['Golf Course Extension', 'SPR Road'],
    landmarks: ['Subhash Chowk', 'Vatika Business Park', 'Omaxe City'],
    schools: ['GD Goenka', 'Pathways World School', 'Heritage School'],
    societies: ['Emaar Palm Gardens', 'Vatika India Next', 'CHD Avenue 71'],
    highlights: ['Major Road', 'Many Projects', 'Good Connectivity', 'Growing Area'],
    type: 'residential',
    pincode: '122018',
    distanceFromCenter: '5 km',
  },
  'sector-48': {
    name: 'Sector 48',
    fullName: 'Sector 48 (Sohna Road), Gurugram',
    description: 'Prime location on Sohna Road',
    heroDescription:
      "Sector 48 is strategically located on Sohna Road near Golf Course Extension. Students here enjoy easy access to our center for quality NEET Biology coaching.",
    nearbyMetro: ['Sohna Road', 'Golf Course Extension'],
    landmarks: ['Sohna Road Junction', 'Sector 48 Market', 'AIPL Business Club'],
    schools: ['Suncity School', 'GD Goenka', 'Pathways World School'],
    societies: ['Emaar MGF Palm Gardens', 'Tata Raisina Residency', 'BPTP Park Centra'],
    highlights: ['Sohna Road', 'Golf Course Extension', 'Prime Location', 'Easy Access'],
    type: 'premium',
    pincode: '122018',
    distanceFromCenter: '3 km',
  },

  // MG ROAD & CYBER CITY
  'mg-road': {
    name: 'MG Road',
    fullName: 'MG Road, Gurugram',
    description: 'Commercial hub with metro connectivity',
    heroDescription:
      "MG Road is Gurugram's main commercial artery with excellent metro connectivity. Professionals working here prefer nearby NEET coaching for their children.",
    nearbyMetro: ['MG Road Metro', 'IFFCO Chowk Metro', 'Sikanderpur Metro'],
    landmarks: ['Sahara Mall', 'MGF Metropolis', 'MG Road Metro Station'],
    schools: ['DPS Gurugram', 'Heritage School', 'Amity International'],
    societies: ['MG Road Apartments', 'DLF Phase 1 adjacent'],
    highlights: ['Commercial Hub', 'Metro Connected', 'Central Location', 'Business Area'],
    type: 'commercial',
    pincode: '122002',
    distanceFromCenter: '7 km',
  },
  'cyber-city': {
    name: 'Cyber City',
    fullName: 'DLF Cyber City, Gurugram',
    description: "Gurugram's IT hub with corporate offices",
    heroDescription:
      "DLF Cyber City is Gurugram's premier IT hub housing Fortune 500 companies. Executives working here want quality NEET coaching for their children near their workplace.",
    nearbyMetro: ['Sikanderpur Metro', 'Guru Dronacharya Metro'],
    landmarks: ['DLF Cyber Hub', 'Building 5', 'Horizon Tower'],
    schools: ['DPS Gurugram', 'The Shri Ram School', 'Scottish High'],
    societies: ['DLF Phase 2 nearby', 'Sushant Lok nearby'],
    highlights: ['IT Hub', 'Corporate Area', 'Metro Connected', 'Premium Location'],
    type: 'commercial',
    pincode: '122002',
    distanceFromCenter: '9 km',
  },

  // MANESAR & EXTENDED AREAS
  'manesar': {
    name: 'Manesar',
    fullName: 'Manesar, Gurugram',
    description: 'Industrial township with residential areas',
    heroDescription:
      "Manesar is an industrial township with growing residential areas. Students from this far end of Gurugram travel to our center for quality NEET coaching.",
    nearbyMetro: ['NH-8', 'Manesar Road'],
    landmarks: ['Manesar IMT', 'Hero Honda Plant', 'Maruti Factory'],
    schools: ['GD Goenka Manesar', 'Ryan International', 'DAV Manesar'],
    societies: ['Orris Carnation Residency', 'BPTP Park Grandeura', 'Trehan Iris Broadway'],
    highlights: ['Industrial Area', 'Affordable Housing', 'Growing', 'Far End'],
    type: 'residential',
    pincode: '122051',
    distanceFromCenter: '18 km',
  },

  // IFFCO CHOWK AREA
  'iffco-chowk': {
    name: 'IFFCO Chowk',
    fullName: 'IFFCO Chowk, Gurugram',
    description: 'Major intersection with metro connectivity',
    heroDescription:
      "IFFCO Chowk is a major intersection in Gurugram with excellent metro connectivity. Students from nearby areas easily access coaching centers via this hub.",
    nearbyMetro: ['IFFCO Chowk Metro'],
    landmarks: ['IFFCO Chowk Metro', 'Signature Tower', 'JMD Megapolis'],
    schools: ['DPS Gurugram', 'Amity International', 'Blue Bells'],
    societies: ['JMD Gardens', 'Signature Tower Residences', 'IFFCO Colony'],
    highlights: ['Metro Hub', 'Central Junction', 'Good Access', 'Commercial Area'],
    type: 'commercial',
    pincode: '122001',
    distanceFromCenter: '6 km',
  },

  // ADDITIONAL AREAS FOR 20KM COVERAGE
  'palam-vihar': {
    name: 'Palam Vihar',
    fullName: 'Palam Vihar, Gurugram',
    description: 'Established residential area near Dwarka',
    heroDescription:
      "Palam Vihar is an established residential area close to Dwarka with good connectivity. Students here can access both Delhi and Gurugram coaching centers.",
    nearbyMetro: ['Dwarka Expressway', 'NH-8'],
    landmarks: ['Palam Vihar Market', 'Ansals Palam Vihar'],
    schools: ['DPS Palam Vihar', 'Ryan International', 'Amity International'],
    societies: ['Ansals Palam Vihar', 'Palam Vihar Floors'],
    highlights: ['Near Dwarka', 'Established', 'Good Schools', 'Residential'],
    type: 'residential',
    pincode: '122017',
    distanceFromCenter: '12 km',
  },
}

// Course options for Gurugram
export const gurugramCourseOptions = [
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
export function getGurugramAreaBySlug(slug: string): GurugramAreaDetails | undefined {
  return gurugramAreaDetails[slug]
}

export function getAllGurugramAreaSlugs(): string[] {
  return Object.keys(gurugramAreaDetails)
}

export function getGurugramAreasByType(type: GurugramAreaDetails['type']): string[] {
  return Object.entries(gurugramAreaDetails)
    .filter(([_, area]) => area.type === type)
    .map(([slug]) => slug)
}

// Get nearby areas based on distance
export function getNearbyGurugramAreas(currentSlug: string): string[] {
  const current = gurugramAreaDetails[currentSlug]
  if (!current) return []

  const typeMapping: Record<string, string[]> = {
    'ultra-premium': ['dlf-phase-1', 'dlf-phase-4', 'dlf-phase-5', 'golf-course-road', 'nirvana-country', 'sector-54'],
    'premium': ['sushant-lok', 'south-city-1', 'south-city-2', 'sector-49', 'sector-57', 'sector-67'],
    'gated': ['nirvana-country', 'south-city-2', 'dlf-phase-5'],
    'residential': ['sector-56', 'sector-58', 'sector-14', 'sohna-road', 'palam-vihar'],
    'commercial': ['mg-road', 'cyber-city', 'sector-45', 'sector-51', 'iffco-chowk'],
    'new-gurugram': ['sector-65', 'sector-67', 'sector-69', 'sector-70', 'sector-72', 'sector-81', 'sector-82', 'sector-84'],
  }

  const sameType = typeMapping[current.type] || []
  return sameType.filter(slug => slug !== currentSlug && gurugramAreaDetails[slug]).slice(0, 4)
}
