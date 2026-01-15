export interface AreaDetails {
  name: string
  fullName: string
  description: string
  heroDescription: string
  nearbyMetro: string[]
  landmarks: string[]
  schools: string[]
  highlights: string[]
  pincode: string
}

export const areaDetails: Record<string, AreaDetails> = {
  'hauz-khas': {
    name: 'Hauz Khas',
    fullName: 'Hauz Khas, South Delhi',
    description: 'Premier coaching hub near IIT Delhi campus',
    heroDescription:
      "Hauz Khas is South Delhi's premier education hub. Students from nearby areas seek quality biology tuition here for board exams and NEET foundation.",
    nearbyMetro: ['Hauz Khas Metro', 'Green Park Metro', 'IIT Delhi Metro'],
    landmarks: ['Hauz Khas Village', 'IIT Delhi', 'Deer Park'],
    schools: ['DPS RK Puram', 'Sardar Patel Vidyalaya', 'Mount Carmel School'],
    highlights: ['Near IIT Delhi', 'Coaching Hub', 'Metro Connected', 'Cultural Center'],
    pincode: '110016',
  },
  'kalu-sarai': {
    name: 'Kalu Sarai',
    fullName: 'Kalu Sarai, Near IIT Delhi',
    description: 'The coaching capital of Delhi near IIT Gate',
    heroDescription:
      "Kalu Sarai is Delhi's coaching capital. Serious students from across Delhi NCR come here for quality biology tuition and competitive exam preparation.",
    nearbyMetro: ['IIT Delhi Metro', 'Hauz Khas Metro'],
    landmarks: ['IIT Delhi Main Gate', 'SDA Market', 'JNU'],
    schools: ['DPS RK Puram', 'Kendriya Vidyalaya JNU'],
    highlights: ['Coaching Capital', 'Near IIT Gate', 'Study Environment', 'Affordable'],
    pincode: '110016',
  },
  'greater-kailash': {
    name: 'Greater Kailash',
    fullName: 'Greater Kailash (GK-I & GK-II), South Delhi',
    description: 'Premium residential area with top schools',
    heroDescription:
      "Greater Kailash (GK) is one of South Delhi's most prestigious localities. Students from DPS GK and other top schools seek quality biology tuition here.",
    nearbyMetro: ['Greater Kailash Metro', 'Nehru Place Metro', 'Kailash Colony Metro'],
    landmarks: ['M Block Market', 'N Block Market', 'GK-II M Block'],
    schools: ['DPS Greater Kailash', 'Springdales GK', 'The Indian School'],
    highlights: ['Premium Locality', 'DPS Students', 'High Quality', 'Affluent Area'],
    pincode: '110048',
  },
  'defence-colony': {
    name: 'Defence Colony',
    fullName: 'Defence Colony, South Delhi',
    description: 'Prestigious colony with educated families',
    heroDescription:
      'Defence Colony is home to educated families seeking quality education. Biology tuition here focuses on both board excellence and NEET preparation.',
    nearbyMetro: ['Lajpat Nagar Metro', 'Moolchand Metro'],
    landmarks: ['Defence Colony Market', 'Lajpat Nagar Central Market'],
    schools: ['Modern School Barakhamba', 'Delhi Public School'],
    highlights: ['Prestigious Colony', 'Educated Families', 'Metro Access', 'Central Location'],
    pincode: '110024',
  },
  'vasant-vihar': {
    name: 'Vasant Vihar',
    fullName: 'Vasant Vihar, South Delhi',
    description: 'Ultra-premium locality with top schools',
    heroDescription:
      'Vasant Vihar is home to students from elite schools like DPS Vasant Vihar, Modern School, and Vasant Valley. Premium biology tuition for all boards.',
    nearbyMetro: ['Vasant Vihar Metro'],
    landmarks: ['Priya Complex', 'DPS Vasant Vihar', 'American Embassy School'],
    schools: ['DPS Vasant Vihar', 'Modern School', 'Vasant Valley School'],
    highlights: ['Ultra Premium', 'Top Schools', 'Elite Students', 'Embassy Area'],
    pincode: '110057',
  },
  'rk-puram': {
    name: 'RK Puram',
    fullName: 'RK Puram (All Sectors), South Delhi',
    description: 'Govt officers colony with DPS RKP',
    heroDescription:
      "RK Puram is home to DPS RK Puram - one of Delhi's top schools. Students from all sectors (1-13) seek quality biology tuition for boards and NEET.",
    nearbyMetro: ['RK Puram Metro', 'Munirka Metro', 'IIT Delhi Metro'],
    landmarks: ['DPS RK Puram', 'Sector Markets', 'Bhikaji Cama Place'],
    schools: ['DPS RK Puram', 'Army Public School', 'Kendriya Vidyalaya'],
    highlights: ['DPS RKP Students', 'All Sectors', 'Govt Colony', 'Metro Access'],
    pincode: '110022',
  },
  'sarojini-nagar': {
    name: 'Sarojini Nagar',
    fullName: 'Sarojini Nagar, South Delhi',
    description: 'Govt quarters with affordable options',
    heroDescription:
      'Sarojini Nagar houses thousands of students from govt families. Affordable biology tuition for Classes 9-12 with NEET foundation.',
    nearbyMetro: ['Sarojini Nagar Metro', 'INA Metro'],
    landmarks: ['Sarojini Nagar Market', 'DDA Flats', 'INA Market'],
    schools: ['Kendriya Vidyalaya', 'Sarvodaya Vidyalaya', 'Army School'],
    highlights: ['Affordable', 'Govt Quarters', 'Metro Connected', 'Student Friendly'],
    pincode: '110023',
  },
  'lodhi-colony': {
    name: 'Lodhi Colony',
    fullName: 'Lodhi Colony, New Delhi',
    description: 'Premium area for senior officials',
    heroDescription:
      'Lodhi Colony is an exclusive area near Lodhi Gardens. Biology tuition here caters to students from top schools seeking personalized attention.',
    nearbyMetro: ['Jor Bagh Metro', 'Khan Market Metro'],
    landmarks: ['Lodhi Gardens', 'Khan Market', 'India Habitat Centre'],
    schools: ['Modern School', "St. Columba's School", 'Mater Dei School'],
    highlights: ['Premium Location', 'Near Lodhi Gardens', 'Personalized', 'Elite Families'],
    pincode: '110003',
  },
  saket: {
    name: 'Saket',
    fullName: 'Saket, South Delhi',
    description: 'Modern area with metro connectivity',
    heroDescription:
      'Saket is a modern, developing area with excellent metro connectivity. Growing demand for quality biology tuition for all classes.',
    nearbyMetro: ['Saket Metro', 'Malviya Nagar Metro', 'Hauz Khas Metro'],
    landmarks: ['Select City Walk', 'DLF Place', 'Saket District Centre'],
    schools: ['Salwan Public School', 'Ryan International'],
    highlights: ['Modern Area', 'Metro Hub', 'Growing Demand', 'Well Connected'],
    pincode: '110017',
  },
  'malviya-nagar': {
    name: 'Malviya Nagar',
    fullName: 'Malviya Nagar, South Delhi',
    description: 'Affordable coaching with metro access',
    heroDescription:
      'Malviya Nagar is a popular choice for students seeking affordable biology tuition with excellent metro connectivity.',
    nearbyMetro: ['Malviya Nagar Metro'],
    landmarks: ['Malviya Nagar Market', 'Shivalik', 'Panchshila Club'],
    schools: ['Apeejay School', 'DAV Public School'],
    highlights: ['Affordable', 'Student Area', 'Metro Access', 'Budget Friendly'],
    pincode: '110017',
  },
  'green-park': {
    name: 'Green Park',
    fullName: 'Green Park, South Delhi',
    description: 'Central location with easy access',
    heroDescription:
      'Green Park offers central access to coaching centers. Students from nearby areas find it convenient for biology tuition.',
    nearbyMetro: ['Green Park Metro'],
    landmarks: ['Green Park Market', 'Aurobindo Market', 'Green Park Extension'],
    schools: ['Sardar Patel Vidyalaya', 'Springdales School'],
    highlights: ['Central Location', 'Metro Connected', 'Easy Access', 'Residential'],
    pincode: '110016',
  },
  'cr-park': {
    name: 'CR Park',
    fullName: 'Chittaranjan Park, South Delhi',
    description: 'Academic community with education focus',
    heroDescription:
      "CR Park is known for its academic culture. Biology tuition here caters to the community's strong focus on quality education.",
    nearbyMetro: ['Kalkaji Mandir Metro', 'Govind Puri Metro'],
    landmarks: ['CR Park Market', 'Durga Puja Pandals', 'Kalkaji Temple'],
    schools: ['DAV Public School', 'Sarvodaya Vidyalaya'],
    highlights: ['Academic Culture', 'Education Focus', 'Community', 'Quality Students'],
    pincode: '110019',
  },
  munirka: {
    name: 'Munirka',
    fullName: 'Munirka, South Delhi',
    description: 'Student hub near JNU',
    heroDescription:
      'Munirka is a vibrant student area near JNU. Affordable biology tuition options for students from various backgrounds.',
    nearbyMetro: ['Munirka Metro', 'RK Puram Metro'],
    landmarks: ['JNU Campus', 'Munirka Village', 'Nelson Mandela Marg'],
    schools: ['Kendriya Vidyalaya JNU', 'Sarvodaya Vidyalaya'],
    highlights: ['Student Hub', 'Near JNU', 'Affordable', 'Study Environment'],
    pincode: '110067',
  },
  'lajpat-nagar': {
    name: 'Lajpat Nagar',
    fullName: 'Lajpat Nagar, South Delhi',
    description: 'Commercial hub with metro access',
    heroDescription:
      'Lajpat Nagar is a commercial and residential hub with excellent metro connectivity. Students from Defence Colony and GK access tuition here.',
    nearbyMetro: ['Lajpat Nagar Metro', 'Moolchand Metro'],
    landmarks: ['Central Market', 'Defence Colony Flyover', 'Amar Colony'],
    schools: ['Delhi Public School', 'Modern School', 'Bal Bharati'],
    highlights: ['Metro Hub', 'Central Location', 'Easy Access', 'Commercial Area'],
    pincode: '110024',
  },
  kalkaji: {
    name: 'Kalkaji',
    fullName: 'Kalkaji, South Delhi',
    description: 'Residential area near Nehru Place',
    heroDescription:
      'Kalkaji is a well-established residential area near Nehru Place. Students from CR Park, GK, and Okhla access biology tuition here.',
    nearbyMetro: ['Kalkaji Mandir Metro', 'Nehru Place Metro'],
    landmarks: ['Kalkaji Temple', 'Nehru Place', 'Lotus Temple'],
    schools: ['DAV Public School', 'Sarvodaya Vidyalaya', 'Ryan International'],
    highlights: ['Near Nehru Place', 'Temple Area', 'Established', 'Good Schools'],
    pincode: '110019',
  },
  'east-of-kailash': {
    name: 'East of Kailash',
    fullName: 'East of Kailash (EOK), South Delhi',
    description: 'Premium area with DPS EOK',
    heroDescription:
      'East of Kailash is home to DPS EOK students. Premium biology tuition for Classes 9-12 with board and NEET focus.',
    nearbyMetro: ['Kailash Colony Metro', 'Nehru Place Metro'],
    landmarks: ['DPS East of Kailash', 'EOK Market', 'GK-I M Block'],
    schools: ['DPS East of Kailash', 'Bal Bharati', 'Mount Carmel'],
    highlights: ['DPS EOK Students', 'Near GK', 'Premium Area', 'Quality Education'],
    pincode: '110065',
  },
}

export const classOptions = [
  { class: 'Class 9', duration: '12 Months', fee: '₹60,000/year' },
  { class: 'Class 10', duration: '12 Months', fee: '₹72,000/year' },
  { class: 'Class 11', duration: '12 Months', fee: '₹96,000/year' },
  { class: 'Class 12', duration: '12 Months', fee: '₹1,20,000/year' },
]

export function getAreaData(slug: string): AreaDetails | undefined {
  return areaDetails[slug]
}

export function getAllAreaSlugs(): string[] {
  return Object.keys(areaDetails)
}
