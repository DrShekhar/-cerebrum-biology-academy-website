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
      "Dr. Shekhar Sir's unique teaching methods helped me achieve perfection in Biology. His conceptual approach made complex topics simple.",
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
      "Scored full marks in Biology thanks to Dr. Shekhar Sir's focused teaching and strategic preparation methods.",
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
    quote: 'The rigorous preparation and personal mentoring at Cerebrum helped me crack AFMC.',
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
    quote: 'The intensive program transformed my Biology preparation completely in just 6 months.',
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
      'From struggling with Biology to scoring 672 - Cerebrum made it possible. The dropper batch gave me a second chance at my dream.',
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
    quote: 'The personalized attention and doubt-clearing sessions were game-changers for me.',
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
