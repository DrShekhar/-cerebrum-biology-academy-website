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
        'Complete NEET Coverage',
        'Personal Mentoring',
        'Unlimited Mock Tests',
        'Printed + Digital Materials',
        'One-on-One Doubt Sessions',
      ],
      description: 'Our most comprehensive plan with maximum support and personalization',
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
        'Core NEET Topics',
        'Group Mentoring',
        'Weekly Mock Tests',
        'Digital Materials',
        'Doubt Clearing Sessions',
      ],
      description: 'Focused preparation covering all essential topics with regular support',
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
        'Essential NEET Topics',
        'Monthly Mentoring',
        'Bi-weekly Mock Tests',
        'Basic Study Materials',
        'Online Doubt Support',
      ],
      description: 'Foundation plan covering core concepts with basic support',
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
        'Premium foundation program with personalized attention and advanced learning methodologies',
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
        'Comprehensive foundation program balancing depth and accessibility for strong preparation',
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
        'Essential foundation program focusing on core concepts and fundamental understanding',
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
      description: 'Advanced pre-NEET program with intensive preparation and elite-level mentoring',
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
        'Comprehensive pre-NEET program building strong conceptual foundation for NEET success',
      icon: '🎯',
      color: 'blue',
      batchSize: 20,
      weeklyHours: 8,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        'Essential pre-NEET program covering fundamental concepts for NEET preparation readiness',
      icon: '🌟',
      color: 'green',
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
        'Elite NEET preparation with ultra-small batches and intensive personalized coaching',
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
        'Comprehensive NEET preparation balancing depth, practice, and personal attention',
      icon: '🎯',
      color: 'blue',
      batchSize: 20,
      weeklyHours: 10,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        'Structured NEET preparation covering essential topics with regular practice and support',
      icon: '🌟',
      color: 'green',
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
        'Intensive final year NEET preparation with maximum support and advanced strategies',
      icon: '👑',
      color: 'purple',
      batchSize: 12,
      weeklyHours: 15,
      plans: createPlans('pinnacle'),
    },
    {
      id: 'ascent',
      name: 'Ascent',
      description:
        'Complete final year NEET preparation with comprehensive coverage and regular assessment',
      icon: '🎯',
      color: 'blue',
      batchSize: 20,
      weeklyHours: 12,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        'Focused final year NEET preparation covering core syllabus with consistent practice',
      icon: '🌟',
      color: 'green',
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
        'Intensive dropper program with personalized strategy and comprehensive rank improvement plan',
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
        'Complete dropper program with focused preparation and systematic rank improvement approach',
      icon: '🎯',
      color: 'blue',
      batchSize: 15,
      weeklyHours: 15,
      plans: createPlans('ascent'),
    },
    {
      id: 'pursuit',
      name: 'Pursuit',
      description:
        'Essential dropper program covering complete syllabus with intensive practice and revision',
      icon: '🌟',
      color: 'green',
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
