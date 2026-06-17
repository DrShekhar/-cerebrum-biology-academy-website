// Series Data with Plan A/B/C Structure

export interface Plan {
  id: 'A' | 'B' | 'C'
  name: string
  duration: string
  price: number
  features: string[]
  popular?: boolean
  description: string
  detailedFeatures: {
    liveClasses: number
    recordedLectures: number
    mockTests: number
    studyMaterial: string[]
    mentoring: string
    batchSize: number
    duration: string
  }
}

export interface Series {
  id: string
  name: string
  description: string
  icon: string
  color: string
  batchSize: number
  weeklyHours: number
  plans: Plan[]
}

// Plan A/B/C pricing and features for each series
const createPlans = (seriesType: 'pinnacle' | 'ascent' | 'pursuit'): Plan[] => {
  const basePrices = {
    pinnacle: { A: 150000, B: 120000, C: 98000 },
    ascent: { A: 98000, B: 76000, C: 58000 },
    pursuit: { A: 78000, B: 58000, C: 48000 },
  }

  return [
    {
      id: 'A',
      name: 'Comprehensive',
      duration: '24 months',
      price: basePrices[seriesType].A,
      popular: seriesType === 'ascent', // Ascent Plan A is most popular
      features: [
        '✅ Complete NEET Coverage (100% syllabus)',
        '👨‍🏫 Personal AIIMS Faculty Mentor',
        '📊 Unlimited Mock Tests + Analysis',
        '📚 Premium Study Materials (₹15K value)',
        '🔥 Weekly 1-on-1 Doubt Clearing',
      ],
      description: '🎆 Maximum NEET success guarantee • Personal mentor • Small batch advantage',
      detailedFeatures: {
        liveClasses: 300,
        recordedLectures: 500,
        mockTests: 50,
        studyMaterial: [
          'Printed Books',
          'Digital Notes',
          'Previous Year Papers',
          'Practice Sheets',
        ],
        mentoring: 'Weekly 1-on-1 sessions',
        batchSize: seriesType === 'pinnacle' ? 12 : seriesType === 'ascent' ? 20 : 25,
        duration: '24 months with 6 months revision',
      },
    },
    {
      id: 'B',
      name: 'Focused',
      duration: '20 months',
      price: basePrices[seriesType].B,
      features: [
        '🎯 Core NEET Topics (80% weightage)',
        '👥 Expert Group Mentoring',
        '📈 Weekly Performance Analysis',
        '📱 Digital Learning Materials',
        '⚡ 24/7 Doubt Support WhatsApp',
      ],
      description: '🔥 Most popular choice • Perfect balance • Proven track record',
      detailedFeatures: {
        liveClasses: 250,
        recordedLectures: 400,
        mockTests: 35,
        studyMaterial: ['Digital Notes', 'Previous Year Papers', 'Practice Sheets'],
        mentoring: 'Bi-weekly group sessions',
        batchSize: seriesType === 'pinnacle' ? 15 : seriesType === 'ascent' ? 25 : 30,
        duration: '20 months with 4 months revision',
      },
    },
    {
      id: 'C',
      name: 'Foundation',
      duration: '18 months',
      price: basePrices[seriesType].C,
      features: [
        '💯 Essential NEET Topics (70% weightage)',
        '📅 Monthly Progress Tracking',
        '📝 Bi-weekly Practice Tests',
        '📚 Comprehensive Study Notes',
        '📞 Online Faculty Support',
      ],
      description: '💰 Best value for money • Complete coverage • Smart investment',
      detailedFeatures: {
        liveClasses: 200,
        recordedLectures: 300,
        mockTests: 25,
        studyMaterial: ['Digital Notes', 'Basic Practice Sheets'],
        mentoring: 'Monthly group sessions',
        batchSize: seriesType === 'pinnacle' ? 20 : seriesType === 'ascent' ? 30 : 35,
        duration: '18 months with 3 months revision',
      },
    },
  ]
}

// Series data for each class
export const COURSE_SERIES: Record<string, Series[]> = {
  '9th': [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description:
        '💎 AIIMS Faculty-led program • 12-student batches • Guaranteed NEET rank improvement or fee refund',
      icon: '👑',
      color: 'purple',
      batchSize: 12,
      weeklyHours: 8,
      plans: createPlans('pinnacle'),
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description:
        '🥇 Most Popular Choice • 98% NEET success rate • Perfect balance of price and results',
      icon: '🎯',
      color: 'blue',
      batchSize: 20,
      weeklyHours: 6,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        '🎯 Affordable Excellence • Complete NEET coverage • Ideal for budget-conscious families',
      icon: '🌟',
      color: 'green',
      batchSize: 25,
      weeklyHours: 4,
      plans: createPlans('pursuit'),
    },
  ],
  '10th': [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description:
        '🚀 Fast-track to NEET success • Ultra-premium coaching • 2-year ahead advantage',
      icon: '👑',
      color: 'purple',
      batchSize: 12,
      weeklyHours: 10,
      plans: createPlans('pinnacle'),
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description:
        '⭐ Bridge to NEET mastery • Proven foundation builder • 90%+ students crack NEET on first attempt',
      icon: '🎯',
      color: 'green',
      batchSize: 20,
      weeklyHours: 8,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        '💪 Smart preparation start • Strong fundamentals • Sets you up for NEET success',
      icon: '🌟',
      color: 'blue',
      batchSize: 25,
      weeklyHours: 6,
      plans: createPlans('pursuit'),
    },
  ],
  '11th': [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description:
        '👑 Elite 12-student batches • Personal AIIMS mentor • Guaranteed top 1000 NEET rank strategy',
      icon: '👑',
      color: 'purple',
      batchSize: 12,
      weeklyHours: 12,
      plans: createPlans('pinnacle'),
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description:
        '🎯 #1 Choice of NEET toppers • Perfect study-practice balance • 600+ NEET score achievers',
      icon: '🎯',
      color: 'green',
      batchSize: 20,
      weeklyHours: 10,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        '✅ Complete NEET syllabus • Affordable excellence • 450+ score guarantee program',
      icon: '🌟',
      color: 'blue',
      batchSize: 25,
      weeklyHours: 8,
      plans: createPlans('pursuit'),
    },
  ],
  '12th': [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description:
        '🔥 Final sprint to NEET victory • Maximum support • Advanced exam strategies • Top rank guaranteed',
      icon: '👑',
      color: 'purple',
      batchSize: 12,
      weeklyHours: 15,
      plans: createPlans('pinnacle'),
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description: '⚡ NEET 2027 mission mode • Weekly assessments • Rank prediction accuracy 98%+',
      icon: '🎯',
      color: 'green',
      batchSize: 20,
      weeklyHours: 12,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        '🎯 Final year focus • Core syllabus mastery • Consistent practice • Affordable excellence',
      icon: '🌟',
      color: 'blue',
      batchSize: 25,
      weeklyHours: 10,
      plans: createPlans('pursuit'),
    },
  ],
  Dropper: [
    {
      id: 'pinnacle',
      name: 'Pinnacle',
      description:
        '💯 Rank improvement specialist • Personal strategy • 200+ rank jump average • Second chance success',
      icon: '👑',
      color: 'purple',
      batchSize: 10,
      weeklyHours: 18,
      plans: createPlans('pinnacle'),
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description:
        '🚀 Most chosen by droppers • Systematic rank improvement • 85% achieve target college',
      icon: '🎯',
      color: 'green',
      batchSize: 15,
      weeklyHours: 15,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        '⚡ Complete syllabus restart • Intensive practice • Affordable second chance at NEET dreams',
      icon: '🌟',
      color: 'blue',
      batchSize: 20,
      weeklyHours: 12,
      plans: createPlans('pursuit'),
    },
  ],
}

// Get series for a specific class
export const getSeriesForClass = (classLevel: string): Series[] => {
  return COURSE_SERIES[classLevel] || []
}

// Get specific series details
export const getSeriesDetails = (classLevel: string, seriesId: string): Series | null => {
  const series = COURSE_SERIES[classLevel]?.find((s) => s.id === seriesId)
  return series || null
}

// Get specific plan details
export const getPlanDetails = (
  classLevel: string,
  seriesId: string,
  planId: string
): Plan | null => {
  const series = getSeriesDetails(classLevel, seriesId)
  const plan = series?.plans.find((p) => p.id === planId)
  return plan || null
}
