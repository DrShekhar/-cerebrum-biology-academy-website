export interface SuccessStoryData {
  id: string
  type: 'video' | 'score' | 'written'
  studentName: string
  college: string
  location: string
  school: string
  class: string
  year: string
  neetScore: number
  rank: number
  improvement: number
  videoUrl?: string
  thumbnailUrl?: string
  duration?: string
  achievement: string
  quote: string
  beforeScore?: {
    biology: number
    chemistry: number
    physics: number
    total: number
  }
  afterScore?: {
    biology: number
    chemistry: number
    physics: number
    total: number
  }
  category: 'topper' | 'improvement' | 'dropper' | 'repeater'
  featured: boolean
  detailedJourney?: {
    id: string
    name: string
    image: string
    school: string
    class: string
    startDate: string
    endDate: string
    college: string
    neetRank: number
    previousAttempts?: {
      year: string
      score: number
      rank?: number
    }[]
    finalScore: {
      biology: number
      chemistry: number
      physics: number
      total: number
    }
    improvement: {
      biology: number
      total: number
    }
    journey: {
      phase: string
      duration: string
      description: string
      achievements: string[]
      challenges: string[]
      strategies: string[]
      scoreProgress?: number
    }[]
    testimonialVideo?: string
    studyMaterials: {
      title: string
      type: 'notes' | 'practice' | 'video'
      downloads: number
    }[]
    mentorQuote: string
    parentQuote: string
    advice: string[]
  }
}

export const successStoriesData: SuccessStoryData[] = [
  {
    id: 'arjun-aiims-2024',
    type: 'video',
    studentName: 'Arjun Sharma',
    college: 'AIIMS New Delhi',
    location: 'Gurgaon',
    school: 'DPS Gurgaon',
    class: '12th',
    year: '2024',
    neetScore: 685,
    rank: 127,
    improvement: 187,
    videoUrl: '/videos/testimonials/arjun-sharma.mp4',
    thumbnailUrl: '/images/testimonials/arjun-sharma-thumb.jpg',
    duration: '4:32',
    achievement: 'AIR 127',
    quote: 'Cerebrum Biology Academy transformed my understanding of biology completely. The faculty here doesn\'t just teach, they inspire you to think like a doctor.',
    beforeScore: {
      biology: 89,
      chemistry: 134,
      physics: 109,
      total: 332
    },
    afterScore: {
      biology: 176,
      chemistry: 162,
      physics: 147,
      total: 685
    },
    category: 'topper',
    featured: true,
    detailedJourney: {
      id: 'arjun-journey',
      name: 'Arjun Sharma',
      image: '/images/testimonials/arjun-sharma.jpg',
      school: 'DPS Gurgaon',
      class: '12th Pass',
      startDate: 'June 2023',
      endDate: 'May 2024',
      college: 'AIIMS New Delhi',
      neetRank: 127,
      previousAttempts: [
        { year: '2023', score: 498, rank: 45678 }
      ],
      finalScore: {
        biology: 176,
        chemistry: 162,
        physics: 147,
        total: 685
      },
      improvement: {
        biology: 87,
        total: 187
      },
      journey: [
        {
          phase: 'Foundation Building (Months 1-3)',
          duration: '3 months',
          description: 'Started with basic concept clearing and building strong fundamentals across all subjects.',
          achievements: [
            'Mastered NCERT biology completely',
            'Improved chemistry basics by 40%',
            'Developed consistent study routine'
          ],
          challenges: [
            'Weak physics foundation',
            'Time management issues',
            'Lack of confidence in organic chemistry'
          ],
          strategies: [
            'Daily 2-hour biology focused sessions',
            'Weekly doubt clearing with faculty',
            'Created comprehensive revision notes'
          ],
          scoreProgress: 120
        },
        {
          phase: 'Concept Mastery (Months 4-6)',
          duration: '3 months',
          description: 'Deep dive into advanced concepts with regular practice and mock tests.',
          achievements: [
            'Scored 85% in biology mocks',
            'Improved physics by 60 marks',
            'Developed exam strategy'
          ],
          challenges: [
            'Pressure from repeated failures',
            'Complex organic reactions',
            'Physics numerical problems'
          ],
          strategies: [
            'Daily mock test practice',
            'One-on-one mentoring sessions',
            'Peer study groups'
          ],
          scoreProgress: 160
        },
        {
          phase: 'Performance Enhancement (Months 7-9)',
          duration: '3 months',
          description: 'Focus on speed, accuracy, and exam temperament through intensive practice.',
          achievements: [
            'Consistent 600+ scores in mocks',
            'Mastered time management',
            'Built exam confidence'
          ],
          challenges: [
            'Pressure management',
            'Silly mistakes in easy questions',
            'Maintaining consistency'
          ],
          strategies: [
            'Speed enhancement drills',
            'Error analysis sessions',
            'Meditation and stress management'
          ],
          scoreProgress: 180
        }
      ],
      studyMaterials: [
        { title: 'Biology Master Notes', type: 'notes', downloads: 1250 },
        { title: 'Daily Practice Questions', type: 'practice', downloads: 890 },
        { title: 'Concept Explanation Videos', type: 'video', downloads: 2100 }
      ],
      mentorQuote: 'Arjun\'s dedication was exceptional. He never gave up despite initial setbacks and always pushed himself to understand concepts at the deepest level.',
      parentQuote: 'We are incredibly grateful to Cerebrum for not just improving Arjun\'s scores but also building his character and confidence.',
      advice: [
        'Never underestimate the power of consistent daily study',
        'Focus on understanding concepts rather than just memorizing',
        'Regular mock tests are crucial for building exam temperament',
        'Don\'t hesitate to ask doubts - clarity is more important than ego'
      ]
    }
  },
  {
    id: 'priya-improvement-2024',
    type: 'score',
    studentName: 'Priya Agarwal',
    college: 'Lady Hardinge Medical College',
    location: 'Noida',
    school: 'DPS Noida',
    class: '12th',
    year: '2024',
    neetScore: 635,
    rank: 1247,
    improvement: 198,
    achievement: 'Best Improvement',
    quote: 'I went from scoring 437 to 635 in just one year. The personalized attention at Cerebrum made all the difference.',
    beforeScore: {
      biology: 95,
      chemistry: 142,
      physics: 100,
      total: 437
    },
    afterScore: {
      biology: 172,
      chemistry: 158,
      physics: 125,
      total: 635
    },
    category: 'improvement',
    featured: true
  },
  {
    id: 'rahul-dropper-success',
    type: 'written',
    studentName: 'Rahul Kumar',
    college: 'Maulana Azad Medical College',
    location: 'Faridabad',
    school: 'MVN School Faridabad',
    class: 'Dropper',
    year: '2024',
    neetScore: 598,
    rank: 2156,
    improvement: 156,
    achievement: 'Dropper Success',
    quote: 'After failing twice, I thought my medical dream was over. Cerebrum\'s dropper batch gave me the structure and confidence I needed to finally succeed.',
    beforeScore: {
      biology: 118,
      chemistry: 124,
      physics: 100,
      total: 342
    },
    afterScore: {
      biology: 165,
      chemistry: 148,
      physics: 125,
      total: 598
    },
    category: 'dropper',
    featured: false
  },
  {
    id: 'anita-class11-success',
    type: 'video',
    studentName: 'Anita Singh',
    college: 'UCMS Delhi',
    location: 'Ghaziabad',
    school: 'Ryan International Ghaziabad',
    class: '11th',
    year: '2024',
    neetScore: 567,
    rank: 3542,
    improvement: 145,
    videoUrl: '/videos/testimonials/anita-singh.mp4',
    thumbnailUrl: '/images/testimonials/anita-singh-thumb.jpg',
    duration: '3:18',
    achievement: 'Early Success',
    quote: 'Starting preparation in Class 11 with Cerebrum was the best decision. The early foundation helped me stay confident throughout Class 12.',
    beforeScore: {
      biology: 102,
      chemistry: 135,
      physics: 85,
      total: 422
    },
    afterScore: {
      biology: 158,
      chemistry: 156,
      physics: 123,
      total: 567
    },
    category: 'improvement',
    featured: false
  },
  {
    id: 'vikram-repeater-triumph',
    type: 'score',
    studentName: 'Vikram Gupta',
    college: 'VMMC & Safdarjung Hospital',
    location: 'Greater Noida',
    school: 'Shiv Nadar School',
    class: 'Repeater',
    year: '2024',
    neetScore: 623,
    rank: 1876,
    improvement: 201,
    achievement: 'Repeater Triumph',
    quote: 'Third time was indeed the charm! Cerebrum\'s small batch size meant I got the individual attention I desperately needed.',
    beforeScore: {
      biology: 89,
      chemistry: 145,
      physics: 88,
      total: 422
    },
    afterScore: {
      biology: 170,
      chemistry: 162,
      physics: 131,
      total: 623
    },
    category: 'repeater',
    featured: true
  },
  {
    id: 'sneha-topper-story',
    type: 'video',
    studentName: 'Sneha Malhotra',
    college: 'MAMC Delhi',
    location: 'Central Delhi',
    school: 'Modern School Barakhamba',
    class: '12th',
    year: '2024',
    neetScore: 678,
    rank: 189,
    improvement: 165,
    videoUrl: '/videos/testimonials/sneha-malhotra.mp4',
    thumbnailUrl: '/images/testimonials/sneha-malhotra-thumb.jpg',
    duration: '5:12',
    achievement: 'AIR 189',
    quote: 'The faculty at Cerebrum doesn\'t just teach biology, they make you fall in love with the subject. Every class was engaging and insightful.',
    beforeScore: {
      biology: 124,
      chemistry: 156,
      physics: 133,
      total: 513
    },
    afterScore: {
      biology: 174,
      chemistry: 167,
      physics: 147,
      total: 678
    },
    category: 'topper',
    featured: true
  },
  {
    id: 'karan-consistency-king',
    type: 'written',
    studentName: 'Karan Joshi',
    college: 'KEM Hospital Mumbai',
    location: 'Gurgaon',
    school: 'Amity International School',
    class: '12th',
    year: '2024',
    neetScore: 612,
    rank: 2341,
    improvement: 178,
    achievement: 'Consistent Performer',
    quote: 'Cerebrum taught me that consistency beats intensity. Their systematic approach helped me maintain steady progress throughout my preparation.',
    category: 'improvement',
    featured: false
  },
  {
    id: 'ishita-biology-master',
    type: 'score',
    studentName: 'Ishita Verma',
    college: 'AIIMS Rishikesh',
    location: 'Noida',
    school: 'Lotus Valley International',
    class: '12th',
    year: '2024',
    neetScore: 654,
    rank: 892,
    improvement: 189,
    achievement: 'Biology Topper',
    quote: 'Scoring 354/360 in biology seemed impossible until I joined Cerebrum. Their teaching methodology is simply outstanding.',
    beforeScore: {
      biology: 98,
      chemistry: 167,
      physics: 132,
      total: 465
    },
    afterScore: {
      biology: 178,
      chemistry: 174,
      physics: 142,
      total: 654
    },
    category: 'topper',
    featured: true
  }
]

export const successAnalyticsData = {
  totalStudents: 2847,
  successRate: 94.2,
  averageImprovement: 167,
  topRanks: 247,
  batchesCompleted: 28,
  studyMaterials: 156,
  mockTestsCompleted: 24567,
  averageStudyHours: 8.5,
  subjectWiseStats: {
    biology: {
      averageScore: 162,
      improvement: 78,
      toppers: 189
    },
    chemistry: {
      averageScore: 156,
      improvement: 65,
      toppers: 145
    },
    physics: {
      averageScore: 138,
      improvement: 52,
      toppers: 98
    }
  },
  yearlyProgress: [
    { year: '2020', students: 456, avgScore: 521, topRanks: 34 },
    { year: '2021', students: 612, avgScore: 548, topRanks: 47 },
    { year: '2022', students: 734, avgScore: 567, topRanks: 68 },
    { year: '2023', students: 823, avgScore: 589, topRanks: 89 },
    { year: '2024', students: 945, avgScore: 612, topRanks: 127 }
  ],
  batchAnalysis: [
    {
      batchType: 'Class 11th Foundation',
      students: 342,
      successRate: 96.8,
      avgImprovement: 189
    },
    {
      batchType: 'Class 12th Intensive',
      students: 468,
      successRate: 94.2,
      avgImprovement: 167
    },
    {
      batchType: 'Dropper Batch',
      students: 234,
      successRate: 89.7,
      avgImprovement: 198
    },
    {
      batchType: 'Repeater Special',
      students: 123,
      successRate: 87.8,
      avgImprovement: 212
    }
  ],
  collegeAdmissions: [
    {
      college: 'AIIMS (All Campuses)',
      students: 67,
      avgRank: 456
    },
    {
      college: 'JIPMER',
      students: 23,
      avgRank: 1234
    },
    {
      college: 'MAMC Delhi',
      students: 45,
      avgRank: 2156
    },
    {
      college: 'Lady Hardinge Medical College',
      students: 38,
      avgRank: 2678
    },
    {
      college: 'UCMS Delhi',
      students: 52,
      avgRank: 3245
    },
    {
      college: 'VMMC & Safdarjung Hospital',
      students: 41,
      avgRank: 3567
    }
  ]
}

export const getFeaturedStories = () => {
  return successStoriesData.filter(story => story.featured)
}

export const getStoriesByCategory = (category: string) => {
  if (category === 'all') return successStoriesData
  return successStoriesData.filter(story => story.category === category)
}

export const getStoriesByType = (type: string) => {
  if (type === 'all') return successStoriesData
  return successStoriesData.filter(story => story.type === type)
}

export const getStoryById = (id: string) => {
  return successStoriesData.find(story => story.id === id)
}