// Cerebrum Biology Academy - Complete Pricing Structure
// Based on approved pricing from October 28, 2025

export type ClassLevel =
  | 'foundation-9'
  | 'foundation-10'
  | 'class-11'
  | 'class-12'
  | 'dropper'
  | '2-year'

export type TierLevel = 'pinnacle' | 'ascent' | 'pursuit'

export type CourseType = 'academic' | 'neet' | 'board-only' | 'board-neet'

export interface PricingTier {
  tier: TierLevel
  batchSize: string
  hours: string
  prices: {
    lumpSum: number
    twoInstallments: number
    threeInstallments: number
  }
  features: {
    pinnacle: string[]
    ascent: string[]
    pursuit: string[]
  }[TierLevel]
}

export interface ClassPricing {
  class: ClassLevel
  displayName: string
  duration: string
  description: string
  availableCourseTypes: CourseType[]
  tiers: {
    [key in CourseType]?: PricingTier[]
  }
}

// Common features by tier
const commonFeaturesByTier = {
  pinnacle: {
    batch: '10-12 students per batch',
    hours: '10-12 hours/week',
    mentorship: 'Personal mentorship from Dr. Shekhar (AIIMS)',
    aiims: 'AIIMS faculty teaching',
    materials: 'Comprehensive study materials & notes',
    doubt: 'Weekly 1-on-1 doubt clearing sessions',
    tests: 'Premium mock test series',
    analytics: 'Detailed performance analytics',
    recordings: 'Lifetime access to recorded lectures',
    parentMeet: 'Monthly parent-teacher meetings',
    guarantee: 'Money-back guarantee',
    priority: 'Priority support & assistance',
  },
  ascent: {
    batch: '16-18 students per batch',
    hours: '8 hours/week',
    aiims: 'AIIMS faculty teaching',
    materials: 'Complete study materials & notes',
    doubt: 'Weekly group doubt sessions',
    tests: 'Standard mock test series',
    analytics: 'Performance tracking dashboard',
    recordings: 'Access to recorded lectures',
    support: 'Regular support & guidance',
  },
  pursuit: {
    batch: '30-40 students per batch',
    hours: '6 hours/week',
    aiims: 'AIIMS faculty teaching',
    materials: 'Essential study materials',
    doubt: 'Bi-weekly group doubt sessions',
    tests: 'Basic mock test series',
    recordings: 'Access to recorded lectures',
    support: 'Standard support',
  },
}

//=============================================================================
// FOUNDATION COURSES (Class IX & X)
//=============================================================================

const foundationPinnacleFeatures = [
  commonFeaturesByTier.pinnacle.batch,
  commonFeaturesByTier.pinnacle.hours,
  commonFeaturesByTier.pinnacle.mentorship,
  'Complete NCERT coverage + Advanced concepts',
  'Foundation for competitive exams',
  '5,000+ practice questions',
  '20+ full-length tests',
  commonFeaturesByTier.pinnacle.materials,
  commonFeaturesByTier.pinnacle.doubt,
  'AI-powered doubt bot (24/7)',
  commonFeaturesByTier.pinnacle.analytics,
  commonFeaturesByTier.pinnacle.recordings,
  commonFeaturesByTier.pinnacle.parentMeet,
  'Conceptual clarity focus',
  commonFeaturesByTier.pinnacle.guarantee,
]

const foundationAscentFeatures = [
  commonFeaturesByTier.ascent.batch,
  commonFeaturesByTier.ascent.hours,
  commonFeaturesByTier.ascent.aiims,
  'NCERT + State board syllabus',
  'Foundation building approach',
  '3,000+ practice questions',
  '15+ chapter & full-length tests',
  commonFeaturesByTier.ascent.materials,
  commonFeaturesByTier.ascent.doubt,
  'AI-powered doubt bot',
  commonFeaturesByTier.ascent.analytics,
  commonFeaturesByTier.ascent.recordings,
  'Concept-focused teaching',
]

const foundationPursuitFeatures = [
  commonFeaturesByTier.pursuit.batch,
  commonFeaturesByTier.pursuit.hours,
  commonFeaturesByTier.pursuit.aiims,
  'NCERT syllabus coverage',
  '2,000+ practice questions',
  '10+ tests',
  commonFeaturesByTier.pursuit.materials,
  commonFeaturesByTier.pursuit.doubt,
  'AI doubt bot access',
  commonFeaturesByTier.pursuit.recordings,
  'Affordable quality coaching',
]

const foundation9: ClassPricing = {
  class: 'foundation-9',
  displayName: 'Class IX Foundation',
  duration: '1 Year',
  description: 'Building strong fundamentals for future success',
  availableCourseTypes: ['academic', 'neet', 'board-neet'],
  tiers: {
    academic: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 60000, twoInstallments: 62000, threeInstallments: 63000 },
        features: foundationPinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 50000, twoInstallments: 52000, threeInstallments: 53000 },
        features: foundationAscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 40000, twoInstallments: 42000, threeInstallments: 43000 },
        features: foundationPursuitFeatures,
      },
    ],
    neet: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 90000, twoInstallments: 93000, threeInstallments: 96000 },
        features: [
          ...foundationPinnacleFeatures,
          'NEET foundation preparation',
          'Early competitive exam exposure',
        ],
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 60000, twoInstallments: 62000, threeInstallments: 63000 },
        features: [...foundationAscentFeatures, 'NEET foundation preparation'],
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 45000, twoInstallments: 47000, threeInstallments: 48000 },
        features: [...foundationPursuitFeatures, 'Basic NEET preparation'],
      },
    ],
    'board-neet': [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 90000, twoInstallments: 93000, threeInstallments: 96000 },
        features: [
          ...foundationPinnacleFeatures,
          'NEET + Academic combined preparation',
          'Comprehensive board exam focus',
        ],
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 90000, twoInstallments: 93000, threeInstallments: 96000 },
        features: [...foundationAscentFeatures, 'NEET + Academic combined preparation'],
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 45000, twoInstallments: 47000, threeInstallments: 48000 },
        features: [...foundationPursuitFeatures, 'NEET + Academic combined preparation'],
      },
    ],
  },
}

const foundation10: ClassPricing = {
  class: 'foundation-10',
  displayName: 'Class X Foundation',
  duration: '1 Year',
  description: 'Preparing for Board exams & competitive exam foundation',
  availableCourseTypes: ['board-only', 'neet', 'board-neet'],
  tiers: {
    'board-only': [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 60000, twoInstallments: 62000, threeInstallments: 63000 },
        features: foundationPinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 50000, twoInstallments: 52000, threeInstallments: 53000 },
        features: foundationAscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 40000, twoInstallments: 42000, threeInstallments: 43000 },
        features: foundationPursuitFeatures,
      },
    ],
    neet: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 90000, twoInstallments: 93000, threeInstallments: 96000 },
        features: [
          ...foundationPinnacleFeatures,
          'NEET foundation preparation',
          'Early competitive exam exposure',
        ],
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 60000, twoInstallments: 62000, threeInstallments: 63000 },
        features: [...foundationAscentFeatures, 'NEET foundation preparation'],
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 45000, twoInstallments: 47000, threeInstallments: 48000 },
        features: [...foundationPursuitFeatures, 'Basic NEET preparation'],
      },
    ],
    'board-neet': [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 90000, twoInstallments: 93000, threeInstallments: 96000 },
        features: [
          ...foundationPinnacleFeatures,
          'NEET + Board combined preparation',
          'Comprehensive board exam focus',
        ],
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 90000, twoInstallments: 93000, threeInstallments: 96000 },
        features: [...foundationAscentFeatures, 'NEET + Board combined preparation'],
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 45000, twoInstallments: 47000, threeInstallments: 48000 },
        features: [...foundationPursuitFeatures, 'NEET + Board combined preparation'],
      },
    ],
  },
}

//=============================================================================
// CLASS XI
//=============================================================================

const class11PinnacleFeatures = [
  commonFeaturesByTier.pinnacle.batch,
  commonFeaturesByTier.pinnacle.hours,
  commonFeaturesByTier.pinnacle.mentorship,
  'Complete NCERT + PYQs coverage',
  'NEET-focused curriculum',
  '7,000+ practice questions',
  '30+ mock tests (chapter-wise + full-length)',
  '24/7 AI-powered doubt bot',
  commonFeaturesByTier.pinnacle.materials,
  commonFeaturesByTier.pinnacle.doubt,
  commonFeaturesByTier.pinnacle.analytics,
  'Weekly strategy sessions',
  commonFeaturesByTier.pinnacle.recordings,
  commonFeaturesByTier.pinnacle.parentMeet,
  commonFeaturesByTier.pinnacle.guarantee,
]

const class11AscentFeatures = [
  commonFeaturesByTier.ascent.batch,
  commonFeaturesByTier.ascent.hours,
  commonFeaturesByTier.ascent.aiims,
  'NCERT + State board coverage',
  '5,000+ practice questions',
  '20+ mock tests',
  'AI doubt resolution',
  commonFeaturesByTier.ascent.materials,
  commonFeaturesByTier.ascent.doubt,
  commonFeaturesByTier.ascent.analytics,
  commonFeaturesByTier.ascent.recordings,
]

const class11PursuitFeatures = [
  commonFeaturesByTier.pursuit.batch,
  commonFeaturesByTier.pursuit.hours,
  commonFeaturesByTier.pursuit.aiims,
  'NCERT syllabus',
  '3,000+ practice questions',
  '15+ tests',
  commonFeaturesByTier.pursuit.materials,
  commonFeaturesByTier.pursuit.doubt,
  commonFeaturesByTier.pursuit.recordings,
  'Affordable NEET coaching',
]

const class11: ClassPricing = {
  class: 'class-11',
  displayName: 'Class XI',
  duration: '1 Year',
  description: 'Foundation for NEET & Board exams',
  availableCourseTypes: ['academic', 'neet', 'board-neet'],
  tiers: {
    academic: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 98000, twoInstallments: 102000, threeInstallments: 105000 },
        features: class11PinnacleFeatures.filter((f) => !f.includes('NEET')),
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 58000, twoInstallments: 60000, threeInstallments: 61000 },
        features: class11AscentFeatures.filter((f) => !f.includes('NEET')),
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 40000, twoInstallments: 42000, threeInstallments: 43000 },
        features: class11PursuitFeatures.filter((f) => !f.includes('NEET')),
      },
    ],
    neet: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 98000, twoInstallments: 102000, threeInstallments: 105000 },
        features: class11PinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 76000, twoInstallments: 78000, threeInstallments: 79000 },
        features: class11AscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 48000, twoInstallments: 50000, threeInstallments: 51000 },
        features: class11PursuitFeatures,
      },
    ],
    'board-neet': [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 98000, twoInstallments: 104000, threeInstallments: 108000 },
        features: class11PinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 76000, twoInstallments: 78000, threeInstallments: 79000 },
        features: class11AscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 48000, twoInstallments: 50000, threeInstallments: 51000 },
        features: class11PursuitFeatures,
      },
    ],
  },
}

//=============================================================================
// CLASS XII / DROPPERS
//=============================================================================

const class12PinnacleFeatures = [
  commonFeaturesByTier.pinnacle.batch,
  commonFeaturesByTier.pinnacle.hours,
  commonFeaturesByTier.pinnacle.mentorship,
  'Intensive NEET preparation',
  'Complete syllabus coverage (11th + 12th)',
  '15,000+ practice questions',
  '50+ full-length mock tests',
  '24/7 AI-powered doubt bot',
  commonFeaturesByTier.pinnacle.materials,
  'Daily doubt clearing sessions',
  'Personalized weak area analysis',
  'NEET strategy & time management',
  'Exam psychology sessions',
  commonFeaturesByTier.pinnacle.analytics,
  commonFeaturesByTier.pinnacle.recordings,
  'NEET counseling assistance',
  commonFeaturesByTier.pinnacle.guarantee,
]

const class12AscentFeatures = [
  commonFeaturesByTier.ascent.batch,
  commonFeaturesByTier.ascent.hours,
  commonFeaturesByTier.ascent.aiims,
  'Focused NEET preparation',
  '8,000+ practice questions',
  '30+ mock tests',
  'AI doubt resolution',
  commonFeaturesByTier.ascent.materials,
  commonFeaturesByTier.ascent.doubt,
  'NEET strategy sessions',
  commonFeaturesByTier.ascent.analytics,
  commonFeaturesByTier.ascent.recordings,
]

const class12PursuitFeatures = [
  commonFeaturesByTier.pursuit.batch,
  commonFeaturesByTier.pursuit.hours,
  commonFeaturesByTier.pursuit.aiims,
  'NEET syllabus coverage',
  '5,000+ practice questions',
  '20+ mock tests',
  commonFeaturesByTier.pursuit.materials,
  commonFeaturesByTier.pursuit.doubt,
  commonFeaturesByTier.pursuit.recordings,
  'Affordable NEET preparation',
]

const class12: ClassPricing = {
  class: 'class-12',
  displayName: 'Class XII',
  duration: '1 Year',
  description: 'Final year NEET preparation',
  availableCourseTypes: ['board-only', 'neet', 'board-neet'],
  tiers: {
    'board-only': [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 60000, twoInstallments: 62000, threeInstallments: 63000 },
        features: class12PinnacleFeatures.filter((f) => !f.includes('NEET')),
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 58000, twoInstallments: 60000, threeInstallments: 61000 },
        features: class12AscentFeatures.filter((f) => !f.includes('NEET')),
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 40000, twoInstallments: 42000, threeInstallments: 43000 },
        features: class12PursuitFeatures.filter((f) => !f.includes('NEET')),
      },
    ],
    neet: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 156000, twoInstallments: 158000, threeInstallments: 159000 },
        features: class12PinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 76000, twoInstallments: 78000, threeInstallments: 79000 },
        features: class12AscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 70000, twoInstallments: 72000, threeInstallments: 75000 },
        features: class12PursuitFeatures,
      },
    ],
    'board-neet': [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 98000, twoInstallments: 102000, threeInstallments: 105000 },
        features: class12PinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 76000, twoInstallments: 78000, threeInstallments: 79000 },
        features: class12AscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 70000, twoInstallments: 72000, threeInstallments: 75000 },
        features: class12PursuitFeatures,
      },
    ],
  },
}

const dropper: ClassPricing = {
  class: 'dropper',
  displayName: 'Dropper/Repeater Batch',
  duration: '1 Year',
  description: 'Intensive preparation for NEET retakers',
  availableCourseTypes: ['neet'],
  tiers: {
    neet: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 156000, twoInstallments: 158000, threeInstallments: 159000 },
        features: class12PinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 90000, twoInstallments: 92000, threeInstallments: 94000 },
        features: class12AscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 70000, twoInstallments: 72000, threeInstallments: 75000 },
        features: class12PursuitFeatures,
      },
    ],
  },
}

//=============================================================================
// 2-YEAR COURSE
//=============================================================================

const twoYearPinnacleFeatures = [
  commonFeaturesByTier.pinnacle.batch,
  commonFeaturesByTier.pinnacle.hours,
  commonFeaturesByTier.pinnacle.mentorship,
  '720+ hours of live classes (2 years)',
  'Complete Class 11 + 12 syllabus',
  'NCERT + AIIMS/NEET PYQs coverage',
  '20,000+ practice questions',
  '100+ mock tests (2 years)',
  '24/7 AI-powered doubt bot',
  commonFeaturesByTier.pinnacle.materials,
  'Weekly 1-on-1 doubt sessions',
  'Personalized study roadmap',
  'Performance analytics & tracking',
  commonFeaturesByTier.pinnacle.recordings,
  commonFeaturesByTier.pinnacle.parentMeet,
  'NEET counseling assistance',
  commonFeaturesByTier.pinnacle.guarantee,
  'Comprehensive 2-year support',
]

const twoYearAscentFeatures = [
  commonFeaturesByTier.ascent.batch,
  commonFeaturesByTier.ascent.hours,
  commonFeaturesByTier.ascent.aiims,
  '600+ hours of live classes (2 years)',
  'Complete Class 11 + 12 coverage',
  '15,000+ practice questions',
  '60+ mock tests (2 years)',
  'AI doubt resolution',
  commonFeaturesByTier.ascent.materials,
  commonFeaturesByTier.ascent.doubt,
  commonFeaturesByTier.ascent.analytics,
  commonFeaturesByTier.ascent.recordings,
  'Steady 2-year preparation',
]

const twoYearPursuitFeatures = [
  commonFeaturesByTier.pursuit.batch,
  commonFeaturesByTier.pursuit.hours,
  commonFeaturesByTier.pursuit.aiims,
  '480+ hours of classes (2 years)',
  'Complete NEET syllabus',
  '10,000+ practice questions',
  '40+ mock tests (2 years)',
  commonFeaturesByTier.pursuit.materials,
  commonFeaturesByTier.pursuit.doubt,
  commonFeaturesByTier.pursuit.recordings,
  'Affordable 2-year coaching',
]

const twoYear: ClassPricing = {
  class: '2-year',
  displayName: '2-Year Complete',
  duration: '2 Years',
  description: 'Class 11 + 12 Biology (Complete NEET preparation)',
  availableCourseTypes: ['academic', 'neet', 'board-neet'],
  tiers: {
    academic: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 120000, twoInstallments: 125000, threeInstallments: 128000 },
        features: twoYearPinnacleFeatures.filter((f) => !f.includes('NEET')),
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 100000, twoInstallments: 104000, threeInstallments: 107000 },
        features: twoYearAscentFeatures.filter((f) => !f.includes('NEET')),
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 70000, twoInstallments: 73000, threeInstallments: 76000 },
        features: twoYearPursuitFeatures.filter((f) => !f.includes('NEET')),
      },
    ],
    neet: [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 180000, twoInstallments: 188000, threeInstallments: 192000 },
        features: twoYearPinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 140000, twoInstallments: 146000, threeInstallments: 149000 },
        features: twoYearAscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 85000, twoInstallments: 89000, threeInstallments: 93000 },
        features: twoYearPursuitFeatures,
      },
    ],
    'board-neet': [
      {
        tier: 'pinnacle',
        batchSize: '10-12',
        hours: '10-12 hrs/week',
        prices: { lumpSum: 180000, twoInstallments: 188000, threeInstallments: 192000 },
        features: twoYearPinnacleFeatures,
      },
      {
        tier: 'ascent',
        batchSize: '16-18',
        hours: '8 hrs/week',
        prices: { lumpSum: 140000, twoInstallments: 146000, threeInstallments: 149000 },
        features: twoYearAscentFeatures,
      },
      {
        tier: 'pursuit',
        batchSize: '30-40',
        hours: '6 hrs/week',
        prices: { lumpSum: 85000, twoInstallments: 89000, threeInstallments: 93000 },
        features: twoYearPursuitFeatures,
      },
    ],
  },
}

//=============================================================================
// ADD-ON COURSES
//=============================================================================

export interface AddOnCourse {
  id: string
  name: string
  displayName: string
  price: number
  duration: string
  description: string
  shortDescription: string
  features: string[]
  availableWith: TierLevel[] | 'all'
  isHidden: boolean
  requiresDemoAccess?: boolean
  slug: string
}

export const addOnCourses: AddOnCourse[] = [
  {
    id: 'test-series',
    name: 'NEET Test Series',
    displayName: 'NEET Test Series',
    price: 8000,
    duration: '1 Year',
    description: 'Comprehensive NEET mock test series with detailed analysis',
    shortDescription: 'Comprehensive mock tests',
    features: [
      '50+ full-length NEET mock tests',
      'Chapter-wise topic tests',
      'Previous year question papers',
      'Detailed performance analysis',
      'All India rank prediction',
      'Time management practice',
      'Weak area identification',
      'Solutions & explanations',
    ],
    availableWith: 'all',
    isHidden: false,
    slug: '/courses/test-series',
  },
  {
    id: 'mentor-plus',
    name: 'Mentor Plus',
    displayName: 'Mentor Plus Program',
    price: 150000,
    duration: '1 Year',
    description: 'Weekly consultation & counseling for personalized guidance',
    shortDescription: 'Weekly counseling & accountability',
    features: [
      'Weekly 1-on-1 consultation sessions',
      'Personalized study schedule',
      'Motivation & psychology support',
      'Study accountability tracking',
      'Performance monitoring',
      'Parent communication & updates',
      'Goal setting & achievement tracking',
      'Stress management techniques',
      'Career guidance & counseling',
    ],
    availableWith: 'all',
    isHidden: false,
    slug: '/courses/mentor-plus',
  },
  {
    id: 'intensive',
    name: 'Intensive Program',
    displayName: 'Cerebrum Intensive Program',
    price: 360000,
    duration: '1 Year',
    description: 'Ultra-personalized coaching for top achievers (Most sought after course)',
    shortDescription: 'Ultra-personalization & elite coaching',
    features: [
      'Ultra-personalized learning plan',
      'Daily progress tracking & follow-ups',
      'Task management system',
      'Weekly strategy sessions with Dr. Shekhar',
      'Performance psychology coaching',
      'Dedicated mentor assignment',
      'Priority doubt resolution',
      'Advanced concept mastery',
      'Exam strategy & time optimization',
      'Comprehensive parent involvement',
      'Limited to 8-10 students per batch',
      'Exclusive access to premium resources',
    ],
    availableWith: ['pinnacle'], // Only available with Pinnacle tier
    isHidden: true, // Not shown on main pricing page
    requiresDemoAccess: true, // Only visible after demo class
    slug: '/courses/intensive-program',
  },
]

//=============================================================================
// EXPORT ALL PRICING DATA
//=============================================================================

export const allClassPricing: ClassPricing[] = [
  foundation9,
  foundation10,
  class11,
  class12,
  dropper,
  twoYear,
]

// Helper function to get pricing for specific class and course type
export function getPricingForClass(
  classLevel: ClassLevel,
  courseType: CourseType
): PricingTier[] | undefined {
  const classPricing = allClassPricing.find((c) => c.class === classLevel)
  return classPricing?.tiers[courseType]
}

// Helper function to calculate savings
export function calculateSavings(lumpSum: number, installments: number): number {
  return installments - lumpSum
}

// Helper function to get tier details
export function getTierDetails(tier: TierLevel) {
  return {
    pinnacle: {
      name: 'Pinnacle',
      subtitle: 'Premium - Personal Attention',
      popular: false,
      color: 'blue',
    },
    ascent: {
      name: 'Ascent',
      subtitle: 'Most Popular - Best Value',
      popular: true,
      color: 'purple',
    },
    pursuit: {
      name: 'Pursuit',
      subtitle: 'Budget-Friendly Quality',
      popular: false,
      color: 'green',
    },
  }[tier]
}
