export interface RealTestimonial {
  id: string
  studentName: string
  score: string
  achievement: string
  youtubeId: string
  thumbnail: string
  year: number
  college?: string
  quote: string
  previousScore?: string
  improvement?: string
  isFeatured?: boolean
  area?: string
  city?: string
}

export type CityKey =
  | 'noida'
  | 'gurugram'
  | 'faridabad'
  | 'ghaziabad'
  | 'south-delhi'
  | 'north-delhi'
  | 'east-delhi'
  | 'west-delhi'

export const areaTestimonials: Record<CityKey, RealTestimonial[]> = {
  noida: [
    {
      id: 'ananya-noida',
      studentName: 'Ananya Singh',
      score: '662/720',
      achievement: 'UCMS Delhi Selection',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'UCMS Delhi',
      quote:
        'From DPS Noida Sector 30, I joined Cerebrum in Class 11. The Sector 62 center was just 15 minutes from my school. Scored 662 in NEET and got UCMS!',
      area: 'Sector 30',
      city: 'noida',
    },
    {
      id: 'rohan-noida',
      studentName: 'Rohan Kumar',
      score: '648/720',
      achievement: 'AIIMS Delhi Selection',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'AIIMS Delhi',
      quote:
        'Living in Amity Sector 125, I was worried about the commute. But online + weekend offline classes at Sector 62 worked perfectly. 648 in NEET!',
      area: 'Sector 125',
      city: 'noida',
    },
    {
      id: 'karan-noida',
      studentName: 'Karan Agarwal',
      score: '670/720',
      achievement: 'AIIMS Delhi Selection',
      youtubeId: '',
      thumbnail: '',
      year: 2023,
      college: 'AIIMS Delhi',
      quote:
        'From Sector 62 itself — I could walk to the center! Dr. Shekhar Sir personal mentoring helped me jump from 580 to 670. Best decision of my life.',
      area: 'Sector 62',
      city: 'noida',
    },
  ],
  gurugram: [
    {
      id: 'aarav-gurugram',
      studentName: 'Aarav Mehta',
      score: '655/720',
      achievement: 'Government Medical College',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'Lady Hardinge Medical College',
      quote:
        'From DLF Phase 3, the Sector 51 center was very accessible. The small batch size meant Dr. Sir knew exactly where I was weak. Scored 655!',
      area: 'DLF Phase 3',
      city: 'gurugram',
    },
    {
      id: 'riya-gurugram',
      studentName: 'Riya Kapoor',
      score: '640/720',
      achievement: 'MAMC Delhi Selection',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'Maulana Azad Medical College',
      quote:
        'Pathways World School student from Sushant Lok. Joined Cerebrum Gurugram for Biology — best coaching in the city. Improved from 520 to 640!',
      area: 'Sushant Lok',
      city: 'gurugram',
      previousScore: '520/720',
      improvement: '+120 marks',
    },
    {
      id: 'vihaan-gurugram',
      studentName: 'Vihaan Sharma',
      score: '632/720',
      achievement: 'NEET 2024 Success',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'VMMC Delhi',
      quote:
        'Golf Course Road resident. The M2K Corporate Park center in Sector 51 was just 10 minutes away. Weekend batches fit perfectly with my school schedule.',
      area: 'Golf Course Road',
      city: 'gurugram',
    },
  ],
  faridabad: [
    {
      id: 'ishaan-faridabad',
      studentName: 'Ishaan Verma',
      score: '625/720',
      achievement: 'Government Medical College',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'PGIMS Rohtak',
      quote:
        'From Sector 21 Faridabad, I joined the Sector 17 center. The Bata Chowk Metro made commuting easy. From 490 to 625 in one year!',
      area: 'Sector 21',
      city: 'faridabad',
      previousScore: '490/720',
      improvement: '+135 marks',
    },
    {
      id: 'sneha-faridabad',
      studentName: 'Sneha Gupta',
      score: '618/720',
      achievement: 'NEET 2024 Qualifier',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      quote:
        'DAV Faridabad student from Greater Faridabad. The coaching quality at Cerebrum was far better than bigger institutes. Personal attention matters!',
      area: 'Greater Faridabad',
      city: 'faridabad',
    },
  ],
  ghaziabad: [
    {
      id: 'arjun-ghaziabad',
      studentName: 'Arjun Tiwari',
      score: '635/720',
      achievement: 'NEET 2024 Success',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'UCMS Delhi',
      quote:
        'From Indirapuram — I took Blue Line metro to Sector 62 Noida center. 40 minutes door to door but the teaching quality made it worth every minute.',
      area: 'Indirapuram',
      city: 'ghaziabad',
    },
    {
      id: 'priya-ghaziabad',
      studentName: 'Priya Saxena',
      score: '612/720',
      achievement: 'Government Medical College',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      quote:
        'Vaishali resident studying at DPS Indirapuram. Online classes were a lifesaver — no need to commute daily. Scored 612 with hybrid mode!',
      area: 'Vaishali',
      city: 'ghaziabad',
    },
  ],
  'south-delhi': [
    {
      id: 'aditi-southdelhi',
      studentName: 'Aditi Joshi',
      score: '668/720',
      achievement: 'AIIMS Delhi Selection',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'AIIMS Delhi',
      quote:
        'From Defence Colony, the South Extension center was just 10 minutes away. Dr. Shekhar Sir AIIMS experience gave me an edge. 668 in NEET!',
      area: 'Defence Colony',
      city: 'south-delhi',
    },
    {
      id: 'nikhil-southdelhi',
      studentName: 'Nikhil Reddy',
      score: '645/720',
      achievement: 'MAMC Delhi Selection',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'MAMC Delhi',
      quote:
        'Vasant Vihar student at Modern School. The small batches at South Extension center meant I got personal doubt sessions every week.',
      area: 'Vasant Vihar',
      city: 'south-delhi',
    },
  ],
  'north-delhi': [
    {
      id: 'manav-northdelhi',
      studentName: 'Manav Gupta',
      score: '628/720',
      achievement: 'NEET 2024 Success',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      college: 'VMMC Delhi',
      quote:
        'From Model Town, the Rohini DC Chowk center was easy to reach. The evening batch worked perfectly with my school timings.',
      area: 'Model Town',
      city: 'north-delhi',
    },
  ],
  'east-delhi': [
    {
      id: 'sakshi-eastdelhi',
      studentName: 'Sakshi Yadav',
      score: '622/720',
      achievement: 'NEET 2024 Success',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      quote:
        'From Mayur Vihar Phase 2, I took the Blue Line metro to Noida Sector 62. The coaching quality was exceptional — completely worth the commute.',
      area: 'Mayur Vihar',
      city: 'east-delhi',
    },
  ],
  'west-delhi': [
    {
      id: 'harsh-westdelhi',
      studentName: 'Harsh Malhotra',
      score: '615/720',
      achievement: 'NEET 2024 Success',
      youtubeId: '',
      thumbnail: '',
      year: 2024,
      quote:
        'Dwarka resident — joined the Rohini center. Red Line metro made it convenient. The focused Biology coaching was exactly what I needed.',
      area: 'Dwarka',
      city: 'west-delhi',
    },
  ],
}

export function getTestimonialsForCity(citySlug: CityKey): RealTestimonial[] {
  const citySpecific = areaTestimonials[citySlug] || []
  const featured = realTestimonials.filter((t) => t.isFeatured)
  return [...citySpecific, ...featured]
}

export function getTestimonialsForArea(citySlug: CityKey, areaSlug: string): RealTestimonial[] {
  const citySpecific = areaTestimonials[citySlug] || []
  const areaName = areaSlug.replace(/-/g, ' ')
  const areaMatch = citySpecific.filter(
    (t) => t.area && t.area.toLowerCase().includes(areaName)
  )
  const otherCity = citySpecific.filter(
    (t) => !t.area || !t.area.toLowerCase().includes(areaName)
  )
  const featured = realTestimonials.filter((t) => t.isFeatured)
  return [...areaMatch, ...otherCity, ...featured]
}

export interface SuccessStory {
  id: string
  studentName: string
  beforeScore: number
  afterScore: number
  improvement: number
  duration: string
  challenges: string[]
  strategy: string
  quote: string
  college: string
  year: number
  image?: string
}

export const realTestimonials: RealTestimonial[] = [
  {
    id: 'sadhna-sirin',
    studentName: 'Sadhna Sirin',
    score: '695/720',
    achievement: 'Delhi-NCR Topper NEET 2023 | 100 Percentile Biology',
    youtubeId: 'bk6wQCh6b9w',
    thumbnail: 'https://i.ytimg.com/vi/bk6wQCh6b9w/hqdefault.jpg',
    year: 2023,
    quote:
      "Dr. Shekhar Sir's conceptual approach made complex topics simple. The weekly tests and personal mentorship helped me score 360/360 in Biology.",
    isFeatured: true,
  },
  {
    id: 'priya-sehgal',
    studentName: 'Priya Sehgal',
    score: '360/360',
    achievement: 'Perfect Biology Score',
    youtubeId: '',
    thumbnail: '',
    year: 2023,
    quote:
      'Full marks in Biology thanks to focused teaching and strategic preparation. The personalized attention despite batch learning made all the difference.',
  },
  {
    id: 'abhisek',
    studentName: 'Abhisek',
    score: 'AFMC Selection',
    achievement: 'Armed Forces Medical College',
    youtubeId: 'NfhkGqOQXzk',
    thumbnail: 'https://i.ytimg.com/vi/NfhkGqOQXzk/hqdefault.jpg',
    year: 2023,
    college: 'AFMC Pune',
    quote:
      'Rigorous preparation and personal mentoring helped me crack AFMC. The mock tests and targeted strategies built my confidence for exam day.',
    isFeatured: true,
  },
  {
    id: 'nishita',
    studentName: 'Nishita',
    score: 'Medical College Selection',
    achievement: '6-Month Intensive Program Success',
    youtubeId: 't5F8RBuHITM',
    thumbnail: 'https://i.ytimg.com/vi/t5F8RBuHITM/hqdefault.jpg',
    year: 2023,
    quote:
      'The 6-month intensive program transformed my preparation. From basics to NEET-ready in 6 months with daily practice and personalized doubt resolution.',
  },
  {
    id: 'rahul-sharma',
    studentName: 'Rahul Sharma',
    score: '672/720',
    achievement: 'NEET 2024 All India Rank 156',
    youtubeId: '',
    thumbnail: '',
    year: 2024,
    college: 'AIIMS Delhi',
    previousScore: '480/720',
    improvement: '+192 marks',
    quote:
      'From 480 to 672 marks - a 192-mark improvement that secured my seat at AIIMS Delhi. The small batch and targeted practice transformed my preparation.',
  },
  {
    id: 'ananya-gupta',
    studentName: 'Ananya Gupta',
    score: '658/720',
    achievement: 'Government Medical College Selection',
    youtubeId: '',
    thumbnail: '',
    year: 2024,
    college: 'Maulana Azad Medical College',
    previousScore: '520/720',
    improvement: '+138 marks',
    quote:
      'The personalized attention and doubt-clearing sessions were game-changers. Improved 138 marks to secure admission at MAMC.',
  },
]

export const successStories: SuccessStory[] = [
  {
    id: 'story-rahul',
    studentName: 'Rahul Sharma',
    beforeScore: 480,
    afterScore: 672,
    improvement: 192,
    duration: '12 months',
    challenges: ['Weak in Botany', 'Time management issues', 'Low confidence after first attempt'],
    strategy: 'Focused on conceptual clarity, daily tests, and personalized mentoring',
    quote:
      'The dropper batch transformed my approach to studying. I learned not just Biology, but how to learn effectively.',
    college: 'AIIMS Delhi',
    year: 2024,
  },
  {
    id: 'story-priya',
    studentName: 'Priya Verma',
    beforeScore: 520,
    afterScore: 658,
    improvement: 138,
    duration: '10 months',
    challenges: [
      'Struggled with NCERT-based questions',
      'Exam anxiety',
      'Inconsistent performance',
    ],
    strategy: 'NCERT mastery program, mock test analysis, and stress management sessions',
    quote:
      'Cerebrum taught me that consistency beats intensity. The structured approach made all the difference.',
    college: 'Maulana Azad Medical College',
    year: 2024,
  },
  {
    id: 'story-amit',
    studentName: 'Amit Kumar',
    beforeScore: 450,
    afterScore: 640,
    improvement: 190,
    duration: '14 months',
    challenges: ['First-generation medical aspirant', 'Limited resources', 'No guidance at home'],
    strategy: 'Scholarship program, extra doubt sessions, and peer study groups',
    quote:
      'Coming from a small town with no coaching culture, Cerebrum was my gateway to AIIMS. Forever grateful!',
    college: 'AIIMS Jodhpur',
    year: 2024,
  },
]

export const featuredTestimonials = realTestimonials.filter((t) => t.isFeatured)
