// Comprehensive Course System Data for Cerebrum Biology Academy

import { CourseSystem, CourseTier, CourseCategory, CourseProgram, CourseFeatures, PaymentOptions } from '@/types/courseSystem'

// Define the three tiers based on biologyforneetug.com structure
export const courseTiers: CourseTier[] = [
  {
    series: 'pinnacle',
    name: 'Pinnacle Series',
    description: 'Premium tier with maximum personalization and comprehensive support',
    batchSize: 12,
    priceRange: { min: 98000, max: 180000 },
    features: {
      liveClasses: true,
      recordedVideos: true,
      personalMentoring: true,
      doubtSessions: true,
      printedMaterials: true,
      digitalNotes: true,
      worksheets: true,
      previousYearPapers: true,
      weeklyTests: true,
      testSeries: true,
      mockTests: true,
      performanceTracking: true,
      allIndiaRanking: true,
      parentCounseling: true,
      careerGuidance: true,
      regularFeedback: true,
      studyPlanning: true,
      revisionSessions: true,
    },
    highlights: [
      'Ultra-small batch size (12 students)',
      'Dedicated personal mentor',
      'Weekly one-on-one sessions',
      'Customized study plans',
      'Parent-teacher meetings',
      'Priority doubt resolution',
      'Unlimited test attempts',
      'Free crash course access',
    ],
  },
  {
    series: 'ascent',
    name: 'Ascent Series',
    description: 'Standard tier with balanced features and regular mentoring',
    batchSize: 20,
    priceRange: { min: 58000, max: 76000 },
    features: {
      liveClasses: true,
      recordedVideos: true,
      personalMentoring: false,
      doubtSessions: true,
      printedMaterials: true,
      digitalNotes: true,
      worksheets: true,
      previousYearPapers: true,
      weeklyTests: true,
      testSeries: true,
      mockTests: true,
      performanceTracking: true,
      allIndiaRanking: true,
      parentCounseling: false,
      careerGuidance: true,
      regularFeedback: true,
      studyPlanning: false,
      revisionSessions: true,
    },
    highlights: [
      'Optimal batch size (20 students)',
      'Regular doubt clearing sessions',
      'Comprehensive test series',
      'Digital learning resources',
      'Performance analytics',
      'Revision workshops',
      'Faculty interaction time',
      'Study material updates',
    ],
  },
  {
    series: 'pursuit',
    name: 'Pursuit Series',
    description: 'Value tier with essential features and self-paced learning support',
    batchSize: 25,
    priceRange: { min: 48000, max: 88000 },
    features: {
      liveClasses: true,
      recordedVideos: true,
      personalMentoring: false,
      doubtSessions: false,
      printedMaterials: true,
      digitalNotes: true,
      worksheets: false,
      previousYearPapers: true,
      weeklyTests: true,
      testSeries: false,
      mockTests: true,
      performanceTracking: true,
      allIndiaRanking: false,
      parentCounseling: false,
      careerGuidance: false,
      regularFeedback: false,
      studyPlanning: false,
      revisionSessions: true,
    },
    highlights: [
      'Affordable pricing',
      'Self-paced learning',
      'Essential study materials',
      'Regular assessments',
      'Basic performance tracking',
      'Group study sessions',
      'Foundation building focus',
      'Flexible scheduling',
    ],
  },
]

// Helper function to calculate payment options
const calculatePaymentOptions = (basePrice: number): PaymentOptions => {
  const oneTimeDiscount = 0.05 // 5% discount
  const discountedAmount = Math.round(basePrice * (1 - oneTimeDiscount))
  
  return {
    oneTime: {
      amount: basePrice,
      discount: oneTimeDiscount * 100,
      discountedAmount,
    },
    installment: {
      totalAmount: basePrice,
      installments: [
        {
          amount: Math.round(basePrice * 0.4),
          dueDate: 'At enrollment',
          description: 'Initial payment (40%)',
        },
        {
          amount: Math.round(basePrice * 0.3),
          dueDate: 'After 3 months',
          description: 'Second installment (30%)',
        },
        {
          amount: Math.round(basePrice * 0.3),
          dueDate: 'After 6 months',
          description: 'Final installment (30%)',
        },
      ],
    },
  }
}

// Course Programs Data
export const coursePrograms: CourseProgram[] = [
  // Class 9th Foundation Courses
  {
    id: 'class-9-foundation-biology',
    name: 'Class 9th Foundation Biology',
    description: 'Strong foundation in biology concepts to prepare for advanced NEET studies. Focus on building conceptual clarity and scientific temperament.',
    targetClass: '9th',
    duration: '1 year',
    teachingHours: 6,
    learningMode: ['Online', 'Offline', 'Hybrid'],
    tiers: {
      pinnacle: {
        price: 98000,
        batchSize: 12,
        features: courseTiers[0].features,
        payment: calculatePaymentOptions(98000),
        additionalBenefits: [
          'Personal academic counselor',
          'Monthly parent meetings',
          'Customized practice sheets',
          'Career guidance sessions',
        ],
        enrollmentBonus: [
          'Free biology lab kit',
          'Complimentary microscope set',
          'Study abroad counseling',
        ],
      },
      ascent: {
        price: 58000,
        batchSize: 20,
        features: courseTiers[1].features,
        payment: calculatePaymentOptions(58000),
        additionalBenefits: [
          'Regular progress reports',
          'Group study sessions',
          'Online resource access',
        ],
      },
      pursuit: {
        price: 48000,
        batchSize: 25,
        features: courseTiers[2].features,
        payment: calculatePaymentOptions(48000),
        additionalBenefits: [
          'Basic study materials',
          'Self-assessment tools',
        ],
      },
    },
    curriculum: {
      totalModules: 8,
      totalHours: 240,
      practicalHours: 60,
      testCount: 24,
      modules: [
        {
          id: 'mod-1',
          title: 'Fundamental Unit of Life',
          description: 'Cell structure, organelles, and basic functions',
          duration: 30,
          topics: ['Cell theory', 'Plant and animal cells', 'Cell organelles', 'Cell division'],
          learningObjectives: ['Understand cell structure', 'Identify organelles', 'Compare plant and animal cells'],
          practicalWork: ['Microscopy', 'Cell observation', 'Staining techniques'],
        },
        {
          id: 'mod-2',
          title: 'Tissues',
          description: 'Plant and animal tissue systems',
          duration: 30,
          topics: ['Meristematic tissues', 'Permanent tissues', 'Animal tissues', 'Tissue functions'],
          learningObjectives: ['Classify tissue types', 'Understand tissue functions', 'Relate structure to function'],
          practicalWork: ['Tissue identification', 'Microscopic studies'],
        },
        // Additional modules would be defined similarly...
      ],
    },
    schedule: {
      daysPerWeek: 3,
      hoursPerDay: 2,
      timing: ['4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'],
      flexibility: 'Flexible timing available',
      makeupClasses: true,
      holidaySchedule: 'No classes on major holidays',
    },
    faculty: [
      {
        id: 'fac-001',
        name: 'Dr. Priya Sharma',
        qualification: ['M.Sc Biology', 'Ph.D Botany'],
        experience: '8 years',
        specialization: ['Cell Biology', 'Plant Sciences', 'Foundation Teaching'],
        rating: 4.8,
        teachingExperience: '8 years in NEET foundation',
        achievementHighlights: ['100+ students qualified NEET', 'Research publications in plant biology'],
      },
    ],
    prerequisites: ['Basic science knowledge', 'Interest in biology'],
    learningOutcomes: [
      'Strong foundation in biology concepts',
      'Scientific thinking development',
      'Preparation for advanced NEET studies',
      'Laboratory skills development',
    ],
    testimonials: [],
    faq: [
      {
        id: 'faq-1',
        question: 'Is this course suitable for beginners?',
        answer: 'Yes, this course is specifically designed for Class 9th students starting their biology journey.',
        category: 'general',
        order: 1,
      },
    ],
    isPopular: true,
  },

  // Class 10th Foundation Courses
  {
    id: 'class-10-foundation-biology',
    name: 'Class 10th Foundation Biology',
    description: 'Advanced foundation course building upon Class 9th concepts. Prepares students for Class 11th NEET courses with strong conceptual base.',
    targetClass: '10th',
    duration: '1 year',
    teachingHours: 8,
    learningMode: ['Online', 'Offline', 'Hybrid'],
    tiers: {
      pinnacle: {
        price: 110000,
        batchSize: 12,
        features: courseTiers[0].features,
        payment: calculatePaymentOptions(110000),
        additionalBenefits: [
          'Advanced lab experiments',
          'Research project guidance',
          'Science fair preparation',
          'College counseling',
        ],
        enrollmentBonus: [
          'Advanced biology lab kit',
          'Digital microscope access',
          'Online library subscription',
        ],
      },
      ascent: {
        price: 68000,
        batchSize: 20,
        features: courseTiers[1].features,
        payment: calculatePaymentOptions(68000),
        additionalBenefits: [
          'Enhanced study materials',
          'Practical lab sessions',
          'Regular assessments',
        ],
      },
      pursuit: {
        price: 56000,
        batchSize: 25,
        features: courseTiers[2].features,
        payment: calculatePaymentOptions(56000),
        additionalBenefits: [
          'Standard study materials',
          'Basic lab access',
        ],
      },
    },
    curriculum: {
      totalModules: 10,
      totalHours: 320,
      practicalHours: 80,
      testCount: 30,
      modules: [
        {
          id: 'mod-1',
          title: 'Life Processes - Nutrition',
          description: 'Understanding nutrition in plants and animals',
          duration: 32,
          topics: ['Autotrophic nutrition', 'Heterotrophic nutrition', 'Digestive system', 'Photosynthesis'],
          learningObjectives: ['Understand nutrition types', 'Explain digestive processes', 'Analyze photosynthesis'],
          practicalWork: ['Photosynthesis experiments', 'Digestive enzyme tests'],
        },
        // Additional modules...
      ],
    },
    schedule: {
      daysPerWeek: 4,
      hoursPerDay: 2,
      timing: ['4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'],
      flexibility: 'Multiple batch options',
      makeupClasses: true,
      holidaySchedule: 'Special revision sessions during holidays',
    },
    faculty: [
      {
        id: 'fac-002',
        name: 'Dr. Rajesh Kumar',
        qualification: ['M.Sc Zoology', 'Ph.D Animal Physiology'],
        experience: '12 years',
        specialization: ['Animal Physiology', 'Life Processes', 'NEET Foundation'],
        rating: 4.9,
        teachingExperience: '12 years in biology teaching',
        achievementHighlights: ['300+ NEET qualifiers', 'Excellence in teaching award'],
      },
    ],
    prerequisites: ['Completion of Class 9th biology', 'Basic chemistry and physics knowledge'],
    learningOutcomes: [
      'Advanced biology concepts mastery',
      'Readiness for Class 11th NEET preparation',
      'Strong analytical skills',
      'Laboratory technique proficiency',
    ],
    testimonials: [],
    faq: [],
    isFeatured: true,
  },

  // Class 11th NEET Courses
  {
    id: 'class-11-neet-comprehensive',
    name: 'Class 11th NEET Comprehensive',
    description: 'Complete NEET preparation for Class 11th students. Covers entire syllabus with intensive practice and conceptual mastery.',
    targetClass: '11th',
    duration: '2 years',
    teachingHours: 12,
    learningMode: ['Online', 'Offline', 'Hybrid'],
    tiers: {
      pinnacle: {
        price: 180000,
        batchSize: 12,
        features: courseTiers[0].features,
        payment: calculatePaymentOptions(180000),
        additionalBenefits: [
          'Elite faculty access',
          'IIT/AIIMS alumni mentoring',
          'Research internship opportunities',
          'Medical college visits',
        ],
        enrollmentBonus: [
          'Tablet with preloaded content',
          'Premium study room access',
          'Medical entrance book library',
        ],
      },
      ascent: {
        price: 76000,
        batchSize: 20,
        features: courseTiers[1].features,
        payment: calculatePaymentOptions(76000),
        additionalBenefits: [
          'Comprehensive test series',
          'Regular faculty interaction',
          'Peer study groups',
        ],
      },
      pursuit: {
        price: 88000,
        batchSize: 25,
        features: courseTiers[2].features,
        payment: calculatePaymentOptions(88000),
        additionalBenefits: [
          'Core curriculum focus',
          'Essential test practice',
        ],
      },
    },
    curriculum: {
      totalModules: 15,
      totalHours: 480,
      practicalHours: 120,
      testCount: 50,
      modules: [
        {
          id: 'mod-1',
          title: 'Diversity in Living World',
          description: 'Classification and biodiversity concepts',
          duration: 32,
          topics: ['Taxonomy', 'Classification systems', 'Biodiversity', 'Conservation'],
          learningObjectives: ['Master taxonomic principles', 'Understand biodiversity importance'],
          practicalWork: ['Species identification', 'Herbarium preparation'],
        },
        // Additional modules for complete Class 11th syllabus...
      ],
    },
    schedule: {
      daysPerWeek: 6,
      hoursPerDay: 2,
      timing: ['9:00 AM - 11:00 AM', '4:00 PM - 6:00 PM', '6:00 PM - 8:00 PM'],
      flexibility: 'Multiple batch timings available',
      makeupClasses: true,
      holidaySchedule: 'Intensive revision during holidays',
    },
    faculty: [
      {
        id: 'fac-003',
        name: 'Dr. Meena Patel',
        qualification: ['M.Sc Botany', 'Ph.D Plant Taxonomy', 'CSIR-NET'],
        experience: '15 years',
        specialization: ['Plant Biology', 'Taxonomy', 'NEET Biology'],
        rating: 4.95,
        teachingExperience: '15 years NEET coaching',
        achievementHighlights: ['500+ NEET selections', 'AIIMS toppers mentor'],
      },
    ],
    prerequisites: ['Class 10th completion', 'Strong foundation in science'],
    learningOutcomes: [
      'Complete NEET biology mastery',
      'Top 1% NEET score potential',
      'Medical college readiness',
      'Research aptitude development',
    ],
    testimonials: [],
    faq: [],
    isPopular: true,
    isFeatured: true,
  },

  // Class 12th NEET Courses
  {
    id: 'class-12-neet-intensive',
    name: 'Class 12th NEET Intensive',
    description: 'Final year intensive NEET preparation. Dual focus on board exams and NEET with strategic time management.',
    targetClass: '12th',
    duration: '1 year',
    teachingHours: 15,
    learningMode: ['Online', 'Offline', 'Hybrid'],
    tiers: {
      pinnacle: {
        price: 150000,
        batchSize: 12,
        features: courseTiers[0].features,
        payment: calculatePaymentOptions(150000),
        additionalBenefits: [
          'Board + NEET dual preparation',
          'Time management coaching',
          'Stress management sessions',
          'Final sprint preparation',
        ],
        enrollmentBonus: [
          'Complete question bank access',
          'Personal success coach',
          'Medical counseling support',
        ],
      },
      ascent: {
        price: 72000,
        batchSize: 20,
        features: courseTiers[1].features,
        payment: calculatePaymentOptions(72000),
        additionalBenefits: [
          'Integrated board preparation',
          'Regular mock tests',
          'Performance optimization',
        ],
      },
      pursuit: {
        price: 65000,
        batchSize: 25,
        features: courseTiers[2].features,
        payment: calculatePaymentOptions(65000),
        additionalBenefits: [
          'Essential NEET preparation',
          'Board exam support',
        ],
      },
    },
    curriculum: {
      totalModules: 12,
      totalHours: 480,
      practicalHours: 100,
      testCount: 60,
      modules: [
        {
          id: 'mod-1',
          title: 'Human Physiology',
          description: 'Detailed study of human body systems',
          duration: 40,
          topics: ['Digestive system', 'Respiratory system', 'Circulatory system', 'Excretory system'],
          learningObjectives: ['Master human physiology', 'Understand system interactions'],
          practicalWork: ['Physiological experiments', 'System studies'],
        },
        // Additional modules for Class 12th...
      ],
    },
    schedule: {
      daysPerWeek: 6,
      hoursPerDay: 2.5,
      timing: ['Early morning', 'Evening', 'Weekend intensive'],
      flexibility: 'Board exam adjusted schedule',
      makeupClasses: true,
      holidaySchedule: 'Final revision bootcamps',
    },
    faculty: [
      {
        id: 'fac-004',
        name: 'Dr. Anil Singh',
        qualification: ['M.Sc Zoology', 'Ph.D Human Physiology', 'Medical College Faculty'],
        experience: '18 years',
        specialization: ['Human Physiology', 'Medical Entrance', 'Board Preparation'],
        rating: 4.92,
        teachingExperience: '18 years medical entrance coaching',
        achievementHighlights: ['AIIMS toppers producer', '95% success rate'],
      },
    ],
    prerequisites: ['Class 11th completion', 'NEET foundation knowledge'],
    learningOutcomes: [
      'NEET top rank achievement',
      'Excellent board scores',
      'Medical college admission',
      'Time management mastery',
    ],
    testimonials: [],
    faq: [],
    isFeatured: true,
  },
]

// Course Categories
export const courseCategories: CourseCategory[] = [
  {
    id: 'foundation-9th',
    name: 'Class 9th Foundation Courses',
    description: 'Building strong fundamentals for future NEET success',
    targetClass: ['9th'],
    icon: 'BookOpen',
    courses: coursePrograms.filter(course => course.targetClass === '9th'),
  },
  {
    id: 'foundation-10th',
    name: 'Class 10th Foundation Courses',
    description: 'Advanced foundation preparing for NEET journey',
    targetClass: ['10th'],
    icon: 'GraduationCap',
    courses: coursePrograms.filter(course => course.targetClass === '10th'),
  },
  {
    id: 'neet-11th',
    name: 'Class 11th NEET Courses',
    description: 'Comprehensive NEET preparation starting from Class 11th',
    targetClass: ['11th'],
    icon: 'Target',
    courses: coursePrograms.filter(course => course.targetClass === '11th'),
  },
  {
    id: 'neet-12th',
    name: 'Class 12th NEET Courses',
    description: 'Final year intensive NEET preparation with board integration',
    targetClass: ['12th'],
    icon: 'Award',
    courses: coursePrograms.filter(course => course.targetClass === '12th'),
  },
]

// Complete Course System
export const cerebrumCourseSystem: CourseSystem = {
  categories: courseCategories,
  tiers: courseTiers,
  generalFeatures: {
    commonFeatures: [
      'Expert faculty with proven track records',
      'Small batch sizes for personalized attention',
      'Regular parent-teacher interactions',
      'Continuous assessment and feedback',
      'State-of-the-art learning facilities',
      'Digital learning platform access',
      'Library and study room facilities',
      'Career counseling and guidance',
    ],
    supportServices: [
      '24/7 doubt resolution support',
      'Mental health and counseling services',
      'Time management workshops',
      'Study skills development',
      'Peer learning opportunities',
      'Alumni mentorship programs',
      'Regular motivational sessions',
      'Stress management techniques',
    ],
    facilities: [
      'Air-conditioned classrooms',
      'Advanced laboratory equipment',
      'Digital library access',
      'High-speed internet connectivity',
      'Comfortable seating arrangements',
      'Audio-visual learning aids',
      'Cafeteria and refreshment facilities',
      'Safe and secure campus environment',
    ],
    policies: {
      refund: 'Full refund within 15 days of enrollment if not satisfied',
      attendance: 'Minimum 75% attendance required for all features',
      makeupClasses: 'Free makeup classes for valid absences',
      materialPolicy: 'All study materials included in course fee',
    },
  },
}

// Export individual components for flexible usage
export { calculatePaymentOptions }
export default cerebrumCourseSystem