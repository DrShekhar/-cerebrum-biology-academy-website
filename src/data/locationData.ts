// Location-based content for targeted NEET Biology coaching
export interface LocationData {
  city: string
  state: string
  slug: string
  population: number
  tier: 'tier1' | 'tier2' | 'tier3'
  neetAspirants: number
  medicalColleges: number
  competitionLevel: 'very-high' | 'high' | 'moderate'
  localContext: {
    majorCompetitors: string[]
    avgCoachingFee: number
    successRate: number
    topMedicalColleges: string[]
    localChallenges: string[]
    culturalFactors: string[]
  }
  contentVariants: {
    heroTitle: string
    heroSubtitle: string
    valueProposition: string
    urgencyMessage: string
    testimonialFocus: string
    ctaText: string
  }
  seoData: {
    title: string
    description: string
    keywords: string[]
    localKeywords: string[]
  }
}

export const locationDatabase: LocationData[] = [
  {
    city: 'Kota',
    state: 'Rajasthan',
    slug: 'kota',
    population: 1200000,
    tier: 'tier1',
    neetAspirants: 250000,
    medicalColleges: 8,
    competitionLevel: 'very-high',
    localContext: {
      majorCompetitors: [
        'Allen Career Institute',
        'Resonance',
        'Bansal Classes',
        'Motion Education',
      ],
      avgCoachingFee: 150000,
      successRate: 12,
      topMedicalColleges: ['GMC Kota', 'RNT Medical College Udaipur', 'SMS Medical College Jaipur'],
      localChallenges: [
        'Intense competition',
        'High dropout rates',
        'Mental pressure',
        'Away from family',
      ],
      culturalFactors: [
        'Coaching hub culture',
        'Result-oriented mindset',
        'High expectations',
        'Peer pressure',
      ],
    },
    contentVariants: {
      heroTitle: "Master NEET Biology in Kota with India's Top Faculty",
      heroSubtitle:
        'Join 1,50,000+ Kota students who chose Cerebrum Biology Academy for guaranteed NEET success',
      valueProposition:
        'Unlike crowded Kota classrooms, get personalized attention with our proven teaching methodology',
      urgencyMessage: 'Only 150 seats left for 2026 batch in Kota region',
      testimonialFocus: 'Kota students achieving 650+ NEET scores',
      ctaText: 'Secure Your Kota Batch Seat',
    },
    seoData: {
      title: 'Best NEET Biology Coaching in Kota | Cerebrum Biology Academy',
      description:
        'Top NEET Biology coaching in Kota with 98% success rate. Join 1,50,000+ Kota students. Expert faculty, proven results, guaranteed success.',
      keywords: [
        'NEET Biology coaching Kota',
        'Best biology institute Kota',
        'NEET preparation Kota',
        'Medical coaching Kota',
      ],
      localKeywords: [
        'Kota NEET coaching',
        'Biology classes Kota',
        'NEET biology faculty Kota',
        'Medical entrance Kota',
      ],
    },
  },
  {
    city: 'Delhi',
    state: 'Delhi',
    slug: 'delhi',
    population: 32000000,
    tier: 'tier1',
    neetAspirants: 200000,
    medicalColleges: 15,
    competitionLevel: 'very-high',
    localContext: {
      majorCompetitors: ['Aakash Institute', 'FIITJEE', 'Brilliant Tutorials', 'Career Point'],
      avgCoachingFee: 180000,
      successRate: 15,
      topMedicalColleges: [
        'AIIMS Delhi',
        'Maulana Azad Medical College',
        'UCMS Delhi',
        'LHMC Delhi',
      ],
      localChallenges: [
        'High cost of living',
        'Traffic and commute',
        'Intense competition',
        'Distractions',
      ],
      culturalFactors: [
        'Metropolitan mindset',
        'Career focused',
        'High aspirations',
        'Technology adoption',
      ],
    },
    contentVariants: {
      heroTitle: 'Crack NEET Biology from Delhi with Expert Online Coaching',
      heroSubtitle:
        'Save lakhs on Delhi coaching fees while getting superior results with our proven system',
      valueProposition:
        'Skip Delhi traffic and high fees. Get world-class NEET Biology coaching from home',
      urgencyMessage: 'Limited Delhi region slots for premium batch',
      testimonialFocus: 'Delhi students getting AIIMS and top medical college admissions',
      ctaText: 'Start Your Delhi Success Story',
    },
    seoData: {
      title: 'Online NEET Biology Coaching Delhi | Better Than Offline Classes',
      description:
        'Best online NEET Biology coaching for Delhi students. Save time & money. 98% success rate. AIIMS Delhi selections.',
      keywords: [
        'NEET Biology coaching Delhi',
        'Online medical coaching Delhi',
        'AIIMS preparation Delhi',
        'Biology classes Delhi',
      ],
      localKeywords: [
        'Delhi NEET coaching',
        'Biology tuition Delhi',
        'Medical entrance Delhi',
        'NEET preparation NCR',
      ],
    },
  },
  {
    city: 'Hyderabad',
    state: 'Telangana',
    slug: 'hyderabad',
    population: 10500000,
    tier: 'tier1',
    neetAspirants: 180000,
    medicalColleges: 12,
    competitionLevel: 'very-high',
    localContext: {
      majorCompetitors: ['Sri Chaitanya', 'Narayana', 'Resonance', 'FIITJEE'],
      avgCoachingFee: 120000,
      successRate: 18,
      topMedicalColleges: [
        'Osmania Medical College',
        'Gandhi Medical College',
        'Kakatiya Medical College',
      ],
      localChallenges: [
        'Language barriers',
        'State quota competition',
        'Coaching factory approach',
      ],
      culturalFactors: [
        'Education-focused families',
        'IT city mindset',
        'Technology adoption',
        'Results orientation',
      ],
    },
    contentVariants: {
      heroTitle: "Hyderabad's #1 Choice for NEET Biology Excellence",
      heroSubtitle: 'Beat Telangana state competition with our specialized NEET Biology program',
      valueProposition:
        'Unlike factory-style coaching institutes, get personalized attention for guaranteed success',
      urgencyMessage: 'Hyderabad batch filling fast - Only 100 seats remaining',
      testimonialFocus: 'Hyderabad students cracking state medical colleges',
      ctaText: 'Join Hyderabad Toppers',
    },
    seoData: {
      title: 'Best NEET Biology Coaching Hyderabad | State Quota Specialists',
      description:
        'Top NEET Biology coaching in Hyderabad for Telangana state quota. Expert faculty, proven results, 98% success rate.',
      keywords: [
        'NEET Biology coaching Hyderabad',
        'Telangana medical coaching',
        'Biology classes Hyderabad',
        'NEET preparation Hyderabad',
      ],
      localKeywords: [
        'Hyderabad NEET coaching',
        'Biology tuition Hyderabad',
        'Medical entrance Telangana',
        'State quota NEET',
      ],
    },
  },
  {
    city: 'Bangalore',
    state: 'Karnataka',
    slug: 'bangalore',
    population: 13200000,
    tier: 'tier2',
    neetAspirants: 150000,
    medicalColleges: 18,
    competitionLevel: 'high',
    localContext: {
      majorCompetitors: ["BYJU'S", 'Unacademy', 'BASE', 'Deeksha'],
      avgCoachingFee: 140000,
      successRate: 20,
      topMedicalColleges: ['BMCRI', "St. John's Medical College", 'MS Ramaiah Medical College'],
      localChallenges: ['Tech industry distractions', 'High cost of living', 'Traffic congestion'],
      culturalFactors: [
        'Tech-savvy population',
        'Innovation mindset',
        'Professional families',
        'Quality education focus',
      ],
    },
    contentVariants: {
      heroTitle: 'Tech-Smart NEET Biology Coaching for Bangalore Students',
      heroSubtitle:
        "Leverage cutting-edge technology for NEET Biology mastery in India's Silicon Valley",
      valueProposition: 'AI-powered learning meets expert teaching for guaranteed NEET success',
      urgencyMessage: 'Bangalore tech batch limited to 200 students only',
      testimonialFocus: 'Tech-city students mastering Biology with innovative methods',
      ctaText: 'Experience Smart Learning',
    },
    seoData: {
      title: 'Smart NEET Biology Coaching Bangalore | AI-Powered Learning',
      description:
        'Advanced NEET Biology coaching in Bangalore with AI-powered learning. Tech-smart approach, expert faculty, guaranteed results.',
      keywords: [
        'NEET Biology coaching Bangalore',
        'Smart biology learning',
        'AI coaching Bangalore',
        'Medical entrance Karnataka',
      ],
      localKeywords: [
        'Bangalore NEET coaching',
        'Biology classes Bangalore',
        'Tech-enabled NEET prep',
        'Karnataka medical coaching',
      ],
    },
  },
  {
    city: 'Mumbai',
    state: 'Maharashtra',
    slug: 'mumbai',
    population: 21000000,
    tier: 'tier2',
    neetAspirants: 140000,
    medicalColleges: 20,
    competitionLevel: 'high',
    localContext: {
      majorCompetitors: ['IIT Home', 'Pace IIT & Medical', 'FIITJEE', 'Allen'],
      avgCoachingFee: 200000,
      successRate: 16,
      topMedicalColleges: ['KEM Hospital', 'LTMMC', 'GSMC', 'TNMC'],
      localChallenges: [
        'Extremely high costs',
        'Long commute times',
        'Space constraints',
        'Financial pressure',
      ],
      culturalFactors: [
        'Business mindset',
        'Time-conscious',
        'Result-oriented',
        'Competitive environment',
      ],
    },
    contentVariants: {
      heroTitle: "Mumbai's Most Cost-Effective NEET Biology Solution",
      heroSubtitle: 'Get premium NEET Biology coaching at 50% of Mumbai institute fees',
      valueProposition: 'Save ₹1+ lakh on coaching fees while getting superior results from home',
      urgencyMessage: 'Mumbai early bird discount ending soon',
      testimonialFocus: 'Mumbai students saving money while cracking NEET',
      ctaText: 'Save Money, Guarantee Success',
    },
    seoData: {
      title: 'Affordable NEET Biology Coaching Mumbai | Save 50% on Fees',
      description:
        'Cost-effective NEET Biology coaching for Mumbai students. Save ₹1L+ on fees. Home-based learning, expert faculty.',
      keywords: [
        'NEET Biology coaching Mumbai',
        'Affordable medical coaching',
        'Online NEET prep Mumbai',
        'Biology classes Mumbai',
      ],
      localKeywords: [
        'Mumbai NEET coaching',
        'Cheap biology tuition Mumbai',
        'Medical entrance Maharashtra',
        'Budget NEET coaching',
      ],
    },
  },
  {
    city: 'Pune',
    state: 'Maharashtra',
    slug: 'pune',
    population: 7400000,
    tier: 'tier2',
    neetAspirants: 120000,
    medicalColleges: 15,
    competitionLevel: 'high',
    localContext: {
      majorCompetitors: ['Pace IIT & Medical', 'Career Launcher', 'IITians Pace', 'Allen'],
      avgCoachingFee: 130000,
      successRate: 22,
      topMedicalColleges: ['AFMC Pune', 'BJ Medical College', 'Dr. D.Y. Patil Medical College'],
      localChallenges: [
        'Growing competition',
        'Infrastructure development',
        'Teacher quality variance',
      ],
      culturalFactors: [
        'Student-friendly city',
        'Educational hub',
        'Cultural diversity',
        'Innovation focus',
      ],
    },
    contentVariants: {
      heroTitle: "Pune Students' Gateway to NEET Biology Excellence",
      heroSubtitle: "Join Pune's most successful NEET Biology program with proven track record",
      valueProposition:
        'Student-friendly learning environment with personalized attention for every Pune aspirant',
      urgencyMessage: 'Pune winter batch registrations closing this week',
      testimonialFocus: 'Pune students achieving top ranks in Maharashtra',
      ctaText: 'Join Pune Champions',
    },
    seoData: {
      title: 'Best NEET Biology Coaching Pune | Student-Friendly Learning',
      description:
        'Top NEET Biology coaching in Pune with student-friendly approach. Proven results, expert faculty, personalized attention.',
      keywords: [
        'NEET Biology coaching Pune',
        'Medical coaching Pune',
        'Biology classes Pune',
        'NEET preparation Maharashtra',
      ],
      localKeywords: [
        'Pune NEET coaching',
        'Biology tuition Pune',
        'Medical entrance Pune',
        'AFMC preparation',
      ],
    },
  },
  {
    city: 'Chennai',
    state: 'Tamil Nadu',
    slug: 'chennai',
    population: 11000000,
    tier: 'tier2',
    neetAspirants: 110000,
    medicalColleges: 25,
    competitionLevel: 'high',
    localContext: {
      majorCompetitors: ['TIME', 'Sri Chaitanya', 'Narayana', 'PACE'],
      avgCoachingFee: 110000,
      successRate: 25,
      topMedicalColleges: [
        'Madras Medical College',
        'Stanley Medical College',
        'Kilpauk Medical College',
      ],
      localChallenges: [
        'Language adaptation',
        'State politics in education',
        'Traditional teaching methods',
      ],
      culturalFactors: [
        'Strong educational heritage',
        'Family support',
        'Academic excellence focus',
        'Cultural pride',
      ],
    },
    contentVariants: {
      heroTitle: "Chennai's Premier NEET Biology Academy",
      heroSubtitle:
        "Honoring Tamil Nadu's medical education legacy with modern NEET Biology excellence",
      valueProposition:
        'Combining traditional Tamil educational values with cutting-edge NEET preparation',
      urgencyMessage: 'Chennai heritage batch - Limited seats for serious aspirants',
      testimonialFocus: 'Chennai students excelling in state medical colleges',
      ctaText: 'Honor Your Heritage',
    },
    seoData: {
      title: 'Premier NEET Biology Coaching Chennai | Tamil Nadu Excellence',
      description:
        "Best NEET Biology coaching in Chennai honoring Tamil Nadu's medical education legacy. Expert faculty, proven results.",
      keywords: [
        'NEET Biology coaching Chennai',
        'Tamil Nadu medical coaching',
        'Biology classes Chennai',
        'Medical entrance Tamil Nadu',
      ],
      localKeywords: [
        'Chennai NEET coaching',
        'Biology tuition Chennai',
        'MMC preparation',
        'Tamil Nadu NEET',
      ],
    },
  },
  {
    city: 'Jaipur',
    state: 'Rajasthan',
    slug: 'jaipur',
    population: 3500000,
    tier: 'tier2',
    neetAspirants: 100000,
    medicalColleges: 10,
    competitionLevel: 'high',
    localContext: {
      majorCompetitors: ['Career Point', 'Bansal Classes', 'Allen', 'Motion'],
      avgCoachingFee: 125000,
      successRate: 20,
      topMedicalColleges: ['SMS Medical College', 'RNT Medical College', 'GMC Jaipur'],
      localChallenges: ['Kota proximity competition', 'Traditional mindset', 'Limited resources'],
      culturalFactors: [
        'Royal heritage pride',
        'Traditional values',
        'Family honor importance',
        'Education respect',
      ],
    },
    contentVariants: {
      heroTitle: "Royal Success in NEET Biology - Jaipur's Pride",
      heroSubtitle: 'Achieve royal success in NEET Biology without leaving the Pink City',
      valueProposition: 'Get Kota-level results from Jaipur with personalized royal treatment',
      urgencyMessage: 'Jaipur royal batch - Only for the most dedicated aspirants',
      testimonialFocus: 'Jaipur royalty achieving medical college dreams',
      ctaText: 'Claim Your Royal Success',
    },
    seoData: {
      title: 'Royal NEET Biology Coaching Jaipur | Pink City Excellence',
      description:
        'Premium NEET Biology coaching in Jaipur. Royal treatment for students, Kota-level results. Expert faculty, proven success.',
      keywords: [
        'NEET Biology coaching Jaipur',
        'Medical coaching Pink City',
        'Biology classes Jaipur',
        'Rajasthan NEET prep',
      ],
      localKeywords: [
        'Jaipur NEET coaching',
        'Biology tuition Jaipur',
        'SMS Medical preparation',
        'Pink City coaching',
      ],
    },
  },
  {
    city: 'Indore',
    state: 'Madhya Pradesh',
    slug: 'indore',
    population: 3300000,
    tier: 'tier3',
    neetAspirants: 70000,
    medicalColleges: 8,
    competitionLevel: 'moderate',
    localContext: {
      majorCompetitors: ['Career Launcher', 'Resonance', 'Allen', 'Local institutes'],
      avgCoachingFee: 100000,
      successRate: 18,
      topMedicalColleges: ['MGM Medical College', 'AIIMS Bhopal', 'Gandhi Medical College Bhopal'],
      localChallenges: [
        'Limited coaching options',
        'Brain drain to other cities',
        'Resource constraints',
      ],
      culturalFactors: [
        'Commercial hub mentality',
        'Practical approach',
        'Business-minded families',
        'Growth focus',
      ],
    },
    contentVariants: {
      heroTitle: "Indore's Gateway to Medical Excellence",
      heroSubtitle: 'Transform Indore into your launchpad for NEET Biology success',
      valueProposition: 'World-class NEET Biology coaching now available in the heart of MP',
      urgencyMessage: 'Indore pioneer batch - Be among the first 50 students',
      testimonialFocus: 'Indore students breaking barriers and achieving medical dreams',
      ctaText: 'Pioneer Your Success',
    },
    seoData: {
      title: 'Pioneer NEET Biology Coaching Indore | MP Medical Excellence',
      description:
        'First-class NEET Biology coaching in Indore, MP. Pioneer batch with world-class faculty. Break barriers, achieve dreams.',
      keywords: [
        'NEET Biology coaching Indore',
        'MP medical coaching',
        'Biology classes Indore',
        'Madhya Pradesh NEET',
      ],
      localKeywords: [
        'Indore NEET coaching',
        'Biology tuition Indore',
        'MGM Medical preparation',
        'MP NEET prep',
      ],
    },
  },
  {
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    slug: 'lucknow',
    population: 3400000,
    tier: 'tier3',
    neetAspirants: 65000,
    medicalColleges: 12,
    competitionLevel: 'moderate',
    localContext: {
      majorCompetitors: ['Career Point', 'FIITJEE', 'Local coaching centers'],
      avgCoachingFee: 90000,
      successRate: 15,
      topMedicalColleges: ['KGMU', 'GSVM Medical College', 'UP University of Medical Sciences'],
      localChallenges: [
        'Government college focus',
        'Limited private options',
        'Traditional approach',
      ],
      culturalFactors: [
        'Nawabi culture respect',
        'Government job preference',
        'Traditional families',
        'Cultural heritage',
      ],
    },
    contentVariants: {
      heroTitle: 'Nawabi Excellence in NEET Biology - Lucknow',
      heroSubtitle: 'Bring Nawabi elegance to your NEET Biology preparation journey',
      valueProposition:
        "Elegant learning methodology with royal results for Lucknow's aspiring doctors",
      urgencyMessage: 'Lucknow nawabi batch - Limited to 100 royal students',
      testimonialFocus: 'Lucknow students achieving medical excellence with grace',
      ctaText: 'Join Nawabi Excellence',
    },
    seoData: {
      title: 'Nawabi NEET Biology Coaching Lucknow | UP Medical Excellence',
      description:
        'Elegant NEET Biology coaching in Lucknow with royal treatment. UP medical college focus, expert faculty, proven results.',
      keywords: [
        'NEET Biology coaching Lucknow',
        'UP medical coaching',
        'Biology classes Lucknow',
        'KGMU preparation',
      ],
      localKeywords: [
        'Lucknow NEET coaching',
        'Biology tuition Lucknow',
        'UP NEET preparation',
        'Nawabi coaching',
      ],
    },
  },
  {
    city: 'Patna',
    state: 'Bihar',
    slug: 'patna',
    population: 2500000,
    tier: 'tier3',
    neetAspirants: 60000,
    medicalColleges: 8,
    competitionLevel: 'moderate',
    localContext: {
      majorCompetitors: ['Narayana', 'Career Point', 'Local institutes'],
      avgCoachingFee: 75000,
      successRate: 12,
      topMedicalColleges: ['PMCH', 'IGIMS', 'ANMMC'],
      localChallenges: [
        'Limited infrastructure',
        'Brain drain to other states',
        'Economic constraints',
      ],
      culturalFactors: [
        'Education reverence',
        'Family sacrifice mentality',
        'Hard work ethics',
        'Dream big attitude',
      ],
    },
    contentVariants: {
      heroTitle: "Bihar's Pride - NEET Biology Champions",
      heroSubtitle:
        'Make Bihar proud with your NEET Biology excellence and medical college success',
      valueProposition: "Affordable world-class coaching for Bihar's brightest medical aspirants",
      urgencyMessage: 'Bihar pride batch - Honor your state with medical success',
      testimonialFocus: 'Bihar students breaking stereotypes and achieving medical dreams',
      ctaText: 'Make Bihar Proud',
    },
    seoData: {
      title: 'Bihar Pride NEET Biology Coaching Patna | Affordable Excellence',
      description:
        'Affordable world-class NEET Biology coaching in Patna, Bihar. Make Bihar proud, achieve medical dreams, expert faculty.',
      keywords: [
        'NEET Biology coaching Patna',
        'Bihar medical coaching',
        'Affordable biology classes',
        'PMCH preparation',
      ],
      localKeywords: [
        'Patna NEET coaching',
        'Biology tuition Patna',
        'Bihar NEET preparation',
        'IGIMS coaching',
      ],
    },
  },
  {
    city: 'Bhubaneswar',
    state: 'Odisha',
    slug: 'bhubaneswar',
    population: 1300000,
    tier: 'tier3',
    neetAspirants: 40000,
    medicalColleges: 6,
    competitionLevel: 'moderate',
    localContext: {
      majorCompetitors: ['FIITJEE', 'Career Launcher', 'Local coaching'],
      avgCoachingFee: 80000,
      successRate: 20,
      topMedicalColleges: ['SCB Medical College', 'MKCG Medical College', 'VIMSAR'],
      localChallenges: [
        'Limited coaching infrastructure',
        'Migration to other states',
        'Resource availability',
      ],
      culturalFactors: [
        'Temple city values',
        'Spiritual approach',
        'Dedicated families',
        'Cultural richness',
      ],
    },
    contentVariants: {
      heroTitle: "Temple City's Medical Blessings - NEET Biology",
      heroSubtitle: 'Receive divine blessings for your NEET Biology journey from the Temple City',
      valueProposition: 'Spiritual dedication meets scientific excellence for NEET Biology mastery',
      urgencyMessage: 'Bhubaneswar blessed batch - Divine opportunity for 75 students',
      testimonialFocus: 'Bhubaneswar students blessed with medical college success',
      ctaText: 'Receive Divine Blessings',
    },
    seoData: {
      title: 'Blessed NEET Biology Coaching Bhubaneswar | Temple City Excellence',
      description:
        'Divine NEET Biology coaching in Bhubaneswar, Temple City. Spiritual dedication meets scientific excellence. Blessed results.',
      keywords: [
        'NEET Biology coaching Bhubaneswar',
        'Odisha medical coaching',
        'Temple city biology',
        'SCB Medical preparation',
      ],
      localKeywords: [
        'Bhubaneswar NEET coaching',
        'Biology tuition Bhubaneswar',
        'Odisha NEET prep',
        'Temple city coaching',
      ],
    },
  },
]

// Helper functions for location-based content
export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return locationDatabase.find((location) => location.slug === slug)
}

export const getLocationsByTier = (tier: 'tier1' | 'tier2' | 'tier3'): LocationData[] => {
  return locationDatabase.filter((location) => location.tier === tier)
}

export const getTopLocationsByAspirants = (limit: number = 5): LocationData[] => {
  return locationDatabase.sort((a, b) => b.neetAspirants - a.neetAspirants).slice(0, limit)
}

export const getLocationsByState = (state: string): LocationData[] => {
  return locationDatabase.filter((location) => location.state === state)
}

export const getAllLocationSlugs = (): string[] => {
  return locationDatabase.map((location) => location.slug)
}
