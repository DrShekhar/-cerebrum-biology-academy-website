export interface CityData {
  name: string
  slug: string
  state: string
  topSchools: string[]
  neetCenters: string[]
  localChallenges: string[]
  whyOnline: string[]
  studentCount: string
  metaTitle: string
  metaDescription: string
  heroSubtitle: string
}

export const cities: CityData[] = [
  {
    name: 'Delhi',
    slug: 'delhi',
    state: 'Delhi NCR',
    topSchools: [
      'DPS RK Puram',
      'Modern School Barakhamba',
      'Sanskriti School',
      'The Shri Ram School',
      'Springdales School',
      'Vasant Valley School',
    ],
    neetCenters: ['Rohini', 'South Extension', 'East Delhi', 'Dwarka'],
    localChallenges: [
      'Heavy traffic wastes 2-3 hours daily commuting to coaching',
      'Air pollution affects health during exam preparation',
      'High coaching fees (₹1,50,000+) in premium areas',
      'Overcrowded batches in popular coaching centers',
    ],
    whyOnline: [
      'Save 2-3 hours daily - no commute in Delhi traffic',
      'Learn from home - avoid pollution during smog season',
      'Same AIIMS faculty at 60% lower cost',
      'Small batch sizes (max 25) vs 100+ in offline',
    ],
    studentCount: '12,000+',
    metaTitle: 'Online Biology Classes in Delhi | NEET Preparation | Cerebrum Academy',
    metaDescription:
      'Best online biology classes in Delhi for Class 11, 12 & NEET. AIIMS faculty, live classes, 98% success rate. Join 12,000+ Delhi students learning online.',
    heroSubtitle:
      "Delhi's smartest NEET aspirants are switching to online. Save time, money, and get better results.",
  },
  {
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    topSchools: [
      'Dhirubhai Ambani International School',
      'Jamnabai Narsee School',
      'Bombay Scottish School',
      'Cathedral and John Connon School',
      'Oberoi International School',
      'Podar International School',
    ],
    neetCenters: ['Andheri', 'Dadar', 'Thane', 'Navi Mumbai'],
    localChallenges: [
      'Local train commute exhausting during peak hours',
      'Best coaching concentrated in South Mumbai - far for suburbs',
      'Monsoon disrupts classes 4 months every year',
      'High rent makes quality coaching expensive',
    ],
    whyOnline: [
      'No local train struggle - study from home',
      'Access Delhi AIIMS faculty without relocating',
      'Monsoon-proof learning - never miss a class',
      'Save ₹50,000+ on coaching fees',
    ],
    studentCount: '8,500+',
    metaTitle: 'Online Biology Classes in Mumbai | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Top online biology classes in Mumbai for NEET & boards. AIIMS-trained faculty, live interactive sessions. 8,500+ Mumbai students. Start free trial!',
    heroSubtitle:
      'From Andheri to Thane, Mumbai students are choosing online. Better teaching, lower cost, no commute.',
  },
  {
    name: 'Bangalore',
    slug: 'bangalore',
    state: 'Karnataka',
    topSchools: [
      'The International School Bangalore',
      'National Public School',
      'Delhi Public School Bangalore',
      'Bishop Cotton Boys School',
      'Inventure Academy',
      'Greenwood High School',
    ],
    neetCenters: ['Koramangala', 'Jayanagar', 'Whitefield', 'Electronic City'],
    localChallenges: [
      "Bangalore traffic is India's worst - 2+ hours wasted daily",
      'Quality NEET coaching concentrated in few areas',
      'IT culture focus - fewer medical coaching options',
      'High living costs add to coaching expenses',
    ],
    whyOnline: [
      "Escape Bangalore's notorious traffic completely",
      'Access Kota/Delhi level teaching from home',
      'Tech-savvy city = perfect for online learning',
      'Flexible timing for students with multiple activities',
    ],
    studentCount: '6,200+',
    metaTitle: 'Online Biology Classes in Bangalore | NEET Preparation | Cerebrum Academy',
    metaDescription:
      'Best online biology classes in Bangalore for NEET aspirants. Live classes with AIIMS faculty. 6,200+ students. Beat the traffic, learn from home!',
    heroSubtitle:
      "Bangalore's NEET aspirants are going digital. World-class teaching without Silk Board traffic.",
  },
  {
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    topSchools: [
      'Oakridge International School',
      'The Hyderabad Public School',
      'Delhi Public School Hyderabad',
      'Chirec Public School',
      'Johnson Grammar School',
      'Meridian School',
    ],
    neetCenters: ['Ameerpet', 'Kukatpally', 'Dilsukhnagar', 'Secunderabad'],
    localChallenges: [
      'Summer heat makes travel exhausting',
      'Quality coaching concentrated in Ameerpet area',
      'Telugu medium background needs extra support',
      'Competition from Sri Chaitanya/Narayana factory model',
    ],
    whyOnline: [
      'Study in AC comfort - no heat stress',
      'Personalized attention vs factory coaching',
      'English medium with Hindi explanations available',
      'Same quality at fraction of residential coaching cost',
    ],
    studentCount: '5,800+',
    metaTitle: 'Online Biology Classes in Hyderabad | NEET Coaching | Cerebrum Academy',
    metaDescription:
      "Join Hyderabad's best online biology classes for NEET. Personal attention, AIIMS faculty, flexible timing. 5,800+ students. Not a factory - we care.",
    heroSubtitle:
      "Escape the coaching factory model. Get personalized NEET preparation from India's best faculty.",
  },
  {
    name: 'Noida',
    slug: 'noida',
    state: 'Uttar Pradesh',
    topSchools: [
      'Delhi Public School Noida',
      'Amity International School',
      'Lotus Valley International',
      'Shiv Nadar School',
      'Pathways School',
      'Step by Step School',
    ],
    neetCenters: ['Sector 18', 'Sector 62', 'Greater Noida'],
    localChallenges: [
      'DND/expressway tolls add to daily costs',
      'Delhi coaching requires crossing borders',
      'Limited quality NEET coaching in Noida',
      'Greater Noida students face long commutes',
    ],
    whyOnline: [
      'No border crossing - learn from Noida home',
      'Access Delhi AIIMS faculty without commute',
      'Save toll and travel costs (₹500+/week)',
      'Same teaching quality as best Delhi centers',
    ],
    studentCount: '4,500+',
    metaTitle: 'Online Biology Classes in Noida | NEET Preparation | Cerebrum Academy',
    metaDescription:
      'Top online biology classes for Noida students. NEET preparation with AIIMS faculty. No DND commute needed. 4,students from Noida & Greater Noida.',
    heroSubtitle: "Why cross the border when Delhi's best teaching comes to your Noida home?",
  },
  {
    name: 'Gurugram',
    slug: 'gurugram',
    state: 'Haryana',
    topSchools: [
      'The Shri Ram School Aravali',
      'GD Goenka World School',
      'Pathways World School',
      'The Heritage School',
      'Delhi Public School Gurugram',
      'Scottish High International',
    ],
    neetCenters: ['Sector 14', 'Sector 51', 'Sohna Road'],
    localChallenges: [
      'Limited medical coaching - mostly engineering focus',
      'Delhi coaching means NH-48 traffic nightmare',
      'High-rise living makes travel time unpredictable',
      'Corporate culture - parents prefer online flexibility',
    ],
    whyOnline: [
      'No Golf Course Road traffic - study at home',
      'Access medical coaching expertise rare in Gurgaon',
      'Corporate parent-friendly timings',
      'International school students get personalized attention',
    ],
    studentCount: '3,800+',
    metaTitle: 'Online Biology Classes in Gurugram | NEET Coaching | Cerebrum Academy',
    metaDescription:
      'Best online biology classes in Gurugram for NEET & boards. AIIMS faculty, flexible timing. 3,800+ students from DLF, Golf Course Road & Sohna Road areas.',
    heroSubtitle:
      "Gurugram's DLF and Golf Course Road families choose smart - online NEET coaching that works.",
  },
  {
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    topSchools: [
      "The Bishop's School",
      'Symbiosis International School',
      'Mercedes-Benz International School',
      'VIBGYOR High School',
      'Delhi Public School Pune',
      'The Orchid School',
    ],
    neetCenters: ['FC Road', 'JM Road', 'Kothrud', 'Hadapsar'],
    localChallenges: [
      'Good education city but NEET coaching limited',
      'Best teachers in Mumbai - 3+ hours away',
      'Weather is good but quality coaching is not',
      'Engineering-centric - fewer medical mentors',
    ],
    whyOnline: [
      'Get Mumbai/Delhi level teaching in Pune',
      'Pleasant weather = perfect study environment at home',
      'Access specialized NEET biology expertise',
      "Cost-effective for Pune's value-conscious families",
    ],
    studentCount: '4,200+',
    metaTitle: 'Online Biology Classes in Pune | NEET Preparation | Cerebrum Academy',
    metaDescription:
      "Join Pune's top online biology classes for NEET. AIIMS-trained teachers, live sessions. 4,200+ Pune students. Get Delhi teaching in your Pune home.",
    heroSubtitle:
      'Pune has great weather and smart students. Now get great NEET teaching too - online.',
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return cities.find((city) => city.slug === slug)
}

export function getAllCitySlugs(): string[] {
  return cities.map((city) => city.slug)
}
