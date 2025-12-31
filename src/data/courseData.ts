// 🏆 World-Class Course Data for Cerebrum Biology Academy
// Built with Harvard-level academic rigor and Silicon Valley design excellence

export interface Course {
  id: string
  name: string
  series: 'Foundation' | 'Pursuit' | 'Ascent' | 'Pinnacle' | 'Intensive'
  targetClass: string[]
  duration: string
  batchSize: number
  weeklyHours: string
  currentPrice: number
  originalPrice: number
  features: string[]
  description: string
  highlights: string[]
  installmentOptions: InstallmentOption[]
  coursePlans?: CoursePlan[]
  badge?: 'recommended' | 'premium' | 'best_value' | 'popular'
  successRate: number
  enrollmentCount: number
  rating?: number
}

export interface InstallmentOption {
  type: 'single' | 'two' | 'three'
  downPayment: number
  monthlyAmount: number
  duration: number
  additionalCost?: number
  savings?: number
}

export interface CoursePlan {
  planId: string
  name: string
  focus: string
  basePrice: number
  features: string[]
}

export const courses: Course[] = [
  // 🏗️ Foundation Series - Building Strong Fundamentals
  {
    id: 'foundation-class-ix-x',
    name: 'Class IX & X Foundation',
    series: 'Foundation',
    targetClass: ['Class IX', 'Class X'],
    duration: '1 Year',
    batchSize: 12,
    weeklyHours: 'Online/Offline/Hybrid',
    currentPrice: 90000,
    originalPrice: 100000,
    badge: 'best_value',
    successRate: 92,
    enrollmentCount: 1200,
    rating: 4.8,
    description:
      'Build unshakeable Biology foundations for future NEET success with expert AIIMS faculty',
    highlights: [
      'Early NEET preparation advantage',
      'Strong academic board exam foundation',
      'Olympiad training for competitive edge',
      'Small batch personalized attention',
      'AIIMS expert faculty guidance',
    ],
    features: [
      'Classroom Teaching by AIIMS Faculty',
      'Recorded Video Classes',
      'Test Series for NEET Foundation',
      'Subjective Tests - Academic/Boards',
      'Multiple Revisions',
      'Printed Notes & Study Materials',
      'Interactive Worksheets',
      'Summary Sheets for Quick Revision',
      'Regular Quizzes & Assessments',
      'Memory Tips & Tricks',
      'Flexible Class Modes (Online/Offline/Hybrid)',
      'Previous Year Questions (PYQ)',
      'Personal Mentoring & Guidance',
    ],
    installmentOptions: [
      {
        type: 'single',
        downPayment: 90000,
        monthlyAmount: 90000,
        duration: 1,
        additionalCost: 0,
        savings: 10000,
      },
      {
        type: 'two',
        downPayment: 47000,
        monthlyAmount: 23500,
        duration: 2,
        additionalCost: 4000,
        savings: 6000,
      },
    ],
  },

  // 🎯 Pursuit Series - Value NEET Preparation
  {
    id: 'pursuit-neet-plan-a',
    name: 'Pursuit NEET',
    series: 'Pursuit',
    targetClass: ['Class XI', 'Class XII'],
    duration: '1 Year',
    batchSize: 30,
    weeklyHours: '6 hours/week',
    currentPrice: 48000,
    originalPrice: 55000,
    badge: 'recommended',
    successRate: 94,
    enrollmentCount: 2500,
    rating: 4.9,
    description:
      'Comprehensive NEET preparation with expert faculty and proven teaching methodologies',
    highlights: [
      'Complete NEET syllabus coverage',
      'Regular mock tests and assessments',
      'Expert faculty guidance',
      'Small batch personal attention',
      '94% success rate',
    ],
    features: [
      'Live Classes by AIIMS Faculty',
      'Recorded Video Classes',
      'Complete Test Series',
      'Doubt Resolution Sessions',
      'Study Materials',
      'Mock Tests',
      'Performance Analysis',
      'Regular Assessments',
      'Parent-Teacher Meetings',
      'Career Counseling',
    ],
    installmentOptions: [
      {
        type: 'single',
        downPayment: 48000,
        monthlyAmount: 48000,
        duration: 1,
        additionalCost: 0,
        savings: 7000,
      },
      {
        type: 'two',
        downPayment: 25000,
        monthlyAmount: 12500,
        duration: 2,
        additionalCost: 2000,
        savings: 5000,
      },
      {
        type: 'three',
        downPayment: 17000,
        monthlyAmount: 11000,
        duration: 3,
        additionalCost: 3000,
        savings: 4000,
      },
    ],
  },

  // 🚀 Ascent Series - Popular NEET Preparation
  {
    id: 'ascent-neet-plan-b',
    name: 'Ascent NEET',
    series: 'Ascent',
    targetClass: ['Class XI', 'Class XII', 'Dropper'],
    duration: '1 Year',
    batchSize: 20,
    weeklyHours: '8 hours/week',
    currentPrice: 76000,
    originalPrice: 85000,
    badge: 'premium',
    successRate: 96,
    enrollmentCount: 1800,
    rating: 4.9,
    description: 'Advanced NEET preparation for serious aspirants targeting top medical colleges',
    highlights: [
      'Intensive preparation program',
      'Top medical college focus',
      'Advanced problem solving',
      'Regular assessments',
      '96% success rate',
    ],
    features: [
      'Intensive Live Classes',
      'Advanced Problem Sets',
      'Weekly Tests',
      'Detailed Performance Analysis',
      'One-on-One Mentoring',
      'Study Planner',
      'Revision Classes',
      'Mock Tests',
      'Interview Preparation',
      'Scholarship Guidance',
    ],
    installmentOptions: [
      {
        type: 'single',
        downPayment: 76000,
        monthlyAmount: 76000,
        duration: 1,
        additionalCost: 0,
        savings: 9000,
      },
      {
        type: 'two',
        downPayment: 40000,
        monthlyAmount: 20000,
        duration: 2,
        additionalCost: 4000,
        savings: 5000,
      },
      {
        type: 'three',
        downPayment: 28000,
        monthlyAmount: 17000,
        duration: 3,
        additionalCost: 5000,
        savings: 4000,
      },
    ],
  },

  // 🏆 Pinnacle Series - Elite NEET Preparation
  {
    id: 'pinnacle-neet-elite',
    name: 'Pinnacle NEET Elite',
    series: 'Pinnacle',
    targetClass: ['Class XI', 'Class XII', 'Dropper'],
    duration: '1 Year',
    batchSize: 12,
    weeklyHours: '10-12 hours/week',
    currentPrice: 156000,
    originalPrice: 175000,
    badge: 'premium',
    successRate: 98,
    enrollmentCount: 800,
    rating: 5.0,
    description:
      'Elite NEET preparation program for top 1% aspirants targeting AIIMS and top medical colleges',
    highlights: [
      'Elite preparation program',
      'AIIMS faculty mentorship',
      'Guaranteed admission support',
      'Ultra-small batch size',
      '98% success rate',
    ],
    features: [
      'Personal Mentorship',
      'Advanced Research Methods',
      'Olympiad Training',
      'Interview Skills',
      'Research Project Guidance',
      'Publication Opportunities',
      'Networking Events',
      'Alumni Mentorship',
      'Scholarship Support',
      'Career Planning',
    ],
    installmentOptions: [
      {
        type: 'single',
        downPayment: 156000,
        monthlyAmount: 156000,
        duration: 1,
        additionalCost: 0,
        savings: 19000,
      },
      {
        type: 'two',
        downPayment: 80000,
        monthlyAmount: 42000,
        duration: 2,
        additionalCost: 6000,
        savings: 13000,
      },
      {
        type: 'three',
        downPayment: 56000,
        monthlyAmount: 36000,
        duration: 3,
        additionalCost: 8000,
        savings: 11000,
      },
    ],
  },

  // 🔥 Intensive Series - 2-Year Complete
  {
    id: 'intensive-2-year-complete',
    name: '2-Year Complete NEET Program',
    series: 'Intensive',
    targetClass: ['Class XI'],
    duration: '2 Years',
    batchSize: 12,
    weeklyHours: '12 hours/week',
    currentPrice: 180000,
    originalPrice: 200000,
    badge: 'popular',
    successRate: 98,
    enrollmentCount: 3200,
    rating: 4.9,
    description:
      'Complete 2-year NEET preparation starting from Class 11 for the best possible results',
    highlights: [
      'Complete 2-year preparation',
      'From Class 11 to NEET',
      'Systematic syllabus coverage',
      'Multiple revision cycles',
      'Top rank potential',
    ],
    features: [
      'Complete Syllabus Coverage',
      'Multiple Revision Cycles',
      'Weekly Tests & Assessments',
      'Daily Practice Sessions',
      'Expert Faculty Guidance',
      'Personal Mentorship',
      'Study Material Included',
      'Doubt Resolution',
      'Performance Tracking',
      'Medical Counseling Support',
    ],
    installmentOptions: [
      {
        type: 'single',
        downPayment: 180000,
        monthlyAmount: 180000,
        duration: 1,
        additionalCost: 0,
        savings: 20000,
      },
      {
        type: 'two',
        downPayment: 95000,
        monthlyAmount: 47000,
        duration: 2,
        additionalCost: 9000,
        savings: 11000,
      },
    ],
  },
]

// 🏆 Utility Functions for World-Class Experience
export const getSeriesInfo = (series: string) => {
  const seriesData = {
    Foundation: {
      name: 'Foundation Series',
      description: 'Building strong fundamentals for Class IX & X',
      color: 'bg-blue-100 text-blue-800',
      textColor: 'text-blue-600',
      icon: '🏗️',
      priority: 5,
    },
    Pursuit: {
      name: 'Pursuit Series',
      description: 'Comprehensive preparation with proven results',
      color: 'bg-green-100 text-green-800',
      textColor: 'text-green-600',
      icon: '🎯',
      priority: 4,
    },
    Ascent: {
      name: 'Ascent Series',
      description: 'Enhanced learning with smaller batches',
      color: 'bg-purple-100 text-purple-800',
      textColor: 'text-purple-600',
      icon: '📈',
      priority: 3,
    },
    Pinnacle: {
      name: 'Pinnacle Series',
      description: 'Premium education with maximum personalization',
      color: 'bg-amber-100 text-yellow-800',
      textColor: 'text-yellow-600',
      icon: '👑',
      priority: 2,
    },
    Intensive: {
      name: 'Intensive Programs',
      description: 'Elite specialized training for toppers',
      color: 'bg-red-100 text-red-800',
      textColor: 'text-red-600',
      icon: '🔥',
      priority: 1,
    },
  }

  return seriesData[series as keyof typeof seriesData] || seriesData.Pursuit
}

export const getBadgeInfo = (badge: string) => {
  const badgeData = {
    recommended: {
      text: 'Recommended',
      color: 'bg-green-600',
      icon: '⭐',
    },
    premium: {
      text: 'Premium',
      color: 'bg-purple-500',
      icon: '👑',
    },
    best_value: {
      text: 'Best Value',
      color: 'bg-blue-500',
      icon: '💰',
    },
    popular: {
      text: 'Popular',
      color: 'bg-orange-500',
      icon: '🔥',
    },
  }

  return badgeData[badge as keyof typeof badgeData]
}
