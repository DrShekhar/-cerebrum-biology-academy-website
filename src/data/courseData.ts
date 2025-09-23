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
    name: 'IX, X, Foundation NEET & Olympiads',
    series: 'Foundation',
    targetClass: ['Class IX', 'Class X'],
    duration: '1 Year',
    batchSize: 15,
    weeklyHours: 'Online/Offline/Hybrid',
    currentPrice: 50000,
    originalPrice: 60000,
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
        downPayment: 50000,
        monthlyAmount: 50000,
        duration: 1,
        additionalCost: 0,
        savings: 10000,
      },
      {
        type: 'two',
        downPayment: 25000,
        monthlyAmount: 13500,
        duration: 2,
        additionalCost: 2000,
        savings: 8000,
      },
    ],
  },

  // 🎯 Pursuit Series - Comprehensive NEET Preparation
  {
    id: 'pursuit-neet-plan-a',
    name: 'Pursuit NEET Plan A',
    series: 'Pursuit',
    targetClass: ['Class XI', 'Class XII'],
    duration: '1 Year',
    batchSize: 20,
    weeklyHours: '18 hours/week',
    currentPrice: 80000,
    originalPrice: 95000,
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
        downPayment: 80000,
        monthlyAmount: 80000,
        duration: 1,
        additionalCost: 0,
        savings: 15000,
      },
      {
        type: 'two',
        downPayment: 40000,
        monthlyAmount: 21000,
        duration: 2,
        additionalCost: 2000,
        savings: 13000,
      },
      {
        type: 'three',
        downPayment: 30000,
        monthlyAmount: 18000,
        duration: 3,
        additionalCost: 4000,
        savings: 11000,
      },
    ],
  },

  // 🚀 Ascent Series - Advanced NEET Preparation
  {
    id: 'ascent-neet-plan-b',
    name: 'Ascent NEET Plan B',
    series: 'Ascent',
    targetClass: ['Class XII', 'Dropper'],
    duration: '1 Year',
    batchSize: 12,
    weeklyHours: '25 hours/week',
    currentPrice: 120000,
    originalPrice: 140000,
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
        downPayment: 120000,
        monthlyAmount: 120000,
        duration: 1,
        additionalCost: 0,
        savings: 20000,
      },
      {
        type: 'two',
        downPayment: 60000,
        monthlyAmount: 32000,
        duration: 2,
        additionalCost: 4000,
        savings: 16000,
      },
      {
        type: 'three',
        downPayment: 45000,
        monthlyAmount: 27000,
        duration: 3,
        additionalCost: 6000,
        savings: 14000,
      },
    ],
  },

  // 🏆 Pinnacle Series - Elite NEET Preparation
  {
    id: 'pinnacle-neet-elite',
    name: 'Pinnacle NEET Elite',
    series: 'Pinnacle',
    targetClass: ['Class XII', 'Dropper'],
    duration: '18 Months',
    batchSize: 8,
    weeklyHours: '30 hours/week',
    currentPrice: 180000,
    originalPrice: 220000,
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
        downPayment: 180000,
        monthlyAmount: 180000,
        duration: 1,
        additionalCost: 0,
        savings: 40000,
      },
      {
        type: 'two',
        downPayment: 90000,
        monthlyAmount: 47000,
        duration: 2,
        additionalCost: 4000,
        savings: 36000,
      },
      {
        type: 'three',
        downPayment: 70000,
        monthlyAmount: 40000,
        duration: 3,
        additionalCost: 10000,
        savings: 30000,
      },
    ],
  },

  // 🔥 Intensive Series - Crash Course
  {
    id: 'intensive-crash-course',
    name: 'Intensive NEET Crash Course',
    series: 'Intensive',
    targetClass: ['Class XII', 'Dropper'],
    duration: '6 Months',
    batchSize: 25,
    weeklyHours: '35 hours/week',
    currentPrice: 546000,
    originalPrice: 600000,
    badge: 'popular',
    successRate: 89,
    enrollmentCount: 3200,
    rating: 4.7,
    description: 'Intensive crash course for last-minute NEET preparation with proven results',
    highlights: [
      'Rapid NEET preparation',
      'Intensive study schedule',
      'Last-minute revision',
      'Quick concept building',
      'Fast-track success',
    ],
    features: [
      'Intensive Daily Classes',
      'Rapid Revision Techniques',
      'Quick Problem Solving',
      'Daily Tests',
      'Instant Doubt Resolution',
      'Time Management Training',
      'Exam Strategy',
      'Stress Management',
      'Quick Notes',
      'Last Minute Tips',
    ],
    installmentOptions: [
      {
        type: 'single',
        downPayment: 546000,
        monthlyAmount: 546000,
        duration: 1,
        additionalCost: 0,
        savings: 54000,
      },
      {
        type: 'two',
        downPayment: 300000,
        monthlyAmount: 130000,
        duration: 2,
        additionalCost: 14000,
        savings: 40000,
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
      color: 'bg-amber-100 text-amber-800',
      textColor: 'text-amber-600',
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
      color: 'bg-green-500',
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
