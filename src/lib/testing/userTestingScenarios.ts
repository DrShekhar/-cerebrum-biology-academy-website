export interface UserPersona {
  id: string
  name: string
  age: number
  background: {
    currentClass: string
    previousScore?: number
    familyIncome: string
    location: {
      city: string
      state: string
      tier: 1 | 2 | 3
    }
    parentEducation: string
    coachingExperience: string
  }
  goals: {
    targetScore: number
    preferredRank: number
    targetCollege: string[]
    timeline: string
  }
  constraints: {
    budget: number
    timeAvailable: number
    transportLimitations: boolean
    familyPressure: string
  }
  personality: {
    decisionMakingStyle: 'analytical' | 'intuitive' | 'consensus' | 'impulsive'
    techSavviness: 'high' | 'medium' | 'low'
    stressLevel: 'low' | 'medium' | 'high'
    motivationLevel: 'high' | 'medium' | 'low'
  }
  painPoints: string[]
  behaviors: {
    researchHabits: string[]
    devicePreference: 'mobile' | 'desktop' | 'tablet'
    socialMediaUsage: string[]
    informationSources: string[]
  }
}

export interface TestingScenario {
  id: string
  personaId: string
  scenarioName: string
  description: string
  objectives: string[]
  tasks: TestingTask[]
  expectedBehaviors: string[]
  successCriteria: {
    primary: string[]
    secondary: string[]
  }
  testEnvironment: {
    device: string
    browser: string
    networkCondition: string
    timeOfDay: string
  }
  dataToCollect: string[]
  estimatedDuration: string
}

export interface TestingTask {
  id: string
  description: string
  instructions: string
  startingPoint: string
  expectedOutcome: string
  observationPoints: string[]
  failurePoints: string[]
  assistanceLevel: 'none' | 'minimal' | 'guided'
}

// Detailed user personas for NEET aspirants
export const USER_PERSONAS: UserPersona[] = [
  {
    id: 'ambitious-achiever',
    name: 'Priya Sharma - The Ambitious Achiever',
    age: 17,
    background: {
      currentClass: 'Class 12',
      previousScore: 520,
      familyIncome: '₹8-12L/year',
      location: {
        city: 'Mumbai',
        state: 'Maharashtra',
        tier: 1,
      },
      parentEducation: 'Both parents are engineers',
      coachingExperience: 'Previous offline coaching for 1 year',
    },
    goals: {
      targetScore: 650,
      preferredRank: 500,
      targetCollege: ['AIIMS Delhi', 'AFMC Pune', 'JIPMER'],
      timeline: '6 months intensive preparation',
    },
    constraints: {
      budget: 80000,
      timeAvailable: 8,
      transportLimitations: false,
      familyPressure: 'High - family expects medical career',
    },
    personality: {
      decisionMakingStyle: 'analytical',
      techSavviness: 'high',
      stressLevel: 'high',
      motivationLevel: 'high',
    },
    painPoints: [
      "Previous coaching didn't provide personalized attention",
      'Difficulty balancing school and NEET prep',
      'Overwhelming amount of study material',
      'Performance anxiety during tests',
    ],
    behaviors: {
      researchHabits: [
        'Reads reviews extensively',
        'Compares multiple options',
        'Seeks expert opinions',
      ],
      devicePreference: 'mobile',
      socialMediaUsage: [
        'Instagram for motivation',
        'YouTube for study tips',
        'WhatsApp study groups',
      ],
      informationSources: [
        'Teacher recommendations',
        'Senior student experiences',
        'Online forums',
      ],
    },
  },

  {
    id: 'budget-conscious-student',
    name: 'Rahul Kumar - The Budget-Conscious Student',
    age: 18,
    background: {
      currentClass: 'Dropper (Gap year)',
      previousScore: 420,
      familyIncome: '₹3-5L/year',
      location: {
        city: 'Patna',
        state: 'Bihar',
        tier: 3,
      },
      parentEducation: 'Father - government clerk, Mother - homemaker',
      coachingExperience: 'Self-study with online resources',
    },
    goals: {
      targetScore: 550,
      preferredRank: 2000,
      targetCollege: ['State medical colleges', 'Deemed universities'],
      timeline: '12 months comprehensive preparation',
    },
    constraints: {
      budget: 30000,
      timeAvailable: 10,
      transportLimitations: true,
      familyPressure: 'Medium - family supportive but financial constraints',
    },
    personality: {
      decisionMakingStyle: 'consensus',
      techSavviness: 'medium',
      stressLevel: 'medium',
      motivationLevel: 'high',
    },
    painPoints: [
      'Limited budget for quality coaching',
      'No access to good coaching in hometown',
      'Lack of guidance and mentorship',
      'Limited study resources',
    ],
    behaviors: {
      researchHabits: [
        'Price comparison is priority',
        'Looks for free trials',
        'Seeks value for money',
      ],
      devicePreference: 'mobile',
      socialMediaUsage: ['YouTube for free content', 'Telegram study channels'],
      informationSources: ['Online research', 'Local school teachers', 'Peer recommendations'],
    },
  },

  {
    id: 'confused-explorer',
    name: 'Ananya Patel - The Confused Explorer',
    age: 16,
    background: {
      currentClass: 'Class 11',
      familyIncome: '₹5-8L/year',
      location: {
        city: 'Indore',
        state: 'Madhya Pradesh',
        tier: 2,
      },
      parentEducation: 'Mixed - one parent doctor, other business',
      coachingExperience: 'No formal NEET coaching yet',
    },
    goals: {
      targetScore: 600,
      preferredRank: 1000,
      targetCollege: ['Unsure - exploring options'],
      timeline: 'Just starting NEET preparation',
    },
    constraints: {
      budget: 60000,
      timeAvailable: 6,
      transportLimitations: false,
      familyPressure: 'Medium - parents want medical career but supportive',
    },
    personality: {
      decisionMakingStyle: 'intuitive',
      techSavviness: 'medium',
      stressLevel: 'low',
      motivationLevel: 'medium',
    },
    painPoints: [
      'Overwhelmed by coaching options',
      'Unsure about NEET exam pattern',
      'Difficulty understanding course differences',
      'Need guidance on study planning',
    ],
    behaviors: {
      researchHabits: ['Casual browsing', 'Easily distracted', 'Needs clear explanations'],
      devicePreference: 'mobile',
      socialMediaUsage: ['Instagram', 'TikTok', 'YouTube'],
      informationSources: ['Parents', 'School counselors', 'Online ads'],
    },
  },

  {
    id: 'time-pressed-achiever',
    name: 'Arjun Singh - The Time-Pressed Achiever',
    age: 17,
    background: {
      currentClass: 'Class 12',
      previousScore: 580,
      familyIncome: '₹15-20L/year',
      location: {
        city: 'Bangalore',
        state: 'Karnataka',
        tier: 1,
      },
      parentEducation: 'Both parents IT professionals',
      coachingExperience: 'Currently enrolled elsewhere but unsatisfied',
    },
    goals: {
      targetScore: 680,
      preferredRank: 200,
      targetCollege: ['AIIMS Delhi', 'CMC Vellore', 'MAMC Delhi'],
      timeline: '4 months rapid improvement',
    },
    constraints: {
      budget: 120000,
      timeAvailable: 4,
      transportLimitations: false,
      familyPressure: 'High - high achiever family',
    },
    personality: {
      decisionMakingStyle: 'impulsive',
      techSavviness: 'high',
      stressLevel: 'high',
      motivationLevel: 'high',
    },
    painPoints: [
      'Current coaching not delivering results',
      'Limited time due to school commitments',
      'Need rapid score improvement',
      'Quality over quantity approach needed',
    ],
    behaviors: {
      researchHabits: ['Quick decisions', 'Trusts premium brands', 'Values efficiency'],
      devicePreference: 'desktop',
      socialMediaUsage: ['LinkedIn for networking', 'YouTube for quick tips'],
      informationSources: ['Professional networks', 'Premium content', 'Expert recommendations'],
    },
  },

  {
    id: 'parent-driven-student',
    name: 'Sneha Gupta - The Parent-Driven Student',
    age: 16,
    background: {
      currentClass: 'Class 11',
      familyIncome: '₹10-15L/year',
      location: {
        city: 'Delhi',
        state: 'Delhi',
        tier: 1,
      },
      parentEducation: 'Both parents doctors',
      coachingExperience: 'Parents researching options',
    },
    goals: {
      targetScore: 630,
      preferredRank: 800,
      targetCollege: ['AIIMS Delhi', 'UCMS Delhi', 'VMMC Delhi'],
      timeline: '18 months comprehensive preparation',
    },
    constraints: {
      budget: 100000,
      timeAvailable: 7,
      transportLimitations: false,
      familyPressure: 'Very high - parents are doctors',
    },
    personality: {
      decisionMakingStyle: 'consensus',
      techSavviness: 'medium',
      stressLevel: 'medium',
      motivationLevel: 'medium',
    },
    painPoints: [
      'Parents making most decisions',
      'Pressure to follow family profession',
      'Limited autonomy in course selection',
      'Need to satisfy parent expectations',
    ],
    behaviors: {
      researchHabits: [
        'Parents do primary research',
        'Seeks approval from parents',
        'Values reputation',
      ],
      devicePreference: 'tablet',
      socialMediaUsage: ['YouTube', 'Instagram', 'Study-focused content'],
      informationSources: ['Parent recommendations', 'Family doctor network', 'School counselors'],
    },
  },
]

// Comprehensive testing scenarios for each persona
export const TESTING_SCENARIOS: TestingScenario[] = [
  {
    id: 'ambitious-achiever-complete-journey',
    personaId: 'ambitious-achiever',
    scenarioName: 'Complete Course Selection Journey',
    description:
      'Priya wants to find a high-quality NEET coaching that can help her achieve 650+ score within her budget',
    objectives: [
      'Complete the entire course selection process',
      'Evaluate decision-making at each step',
      'Test response to urgency and social proof',
      'Assess mobile user experience',
    ],
    tasks: [
      {
        id: 'landing-exploration',
        description: 'Explore the landing page and understand course offerings',
        instructions:
          "You've heard about Cerebrum from a friend. Visit the website and understand what they offer.",
        startingPoint: 'Homepage',
        expectedOutcome: 'Navigate to course selector or course pages',
        observationPoints: [
          'Time spent on hero section',
          'Scroll behavior',
          'Click patterns',
          'Social proof interaction',
        ],
        failurePoints: ['Leaves without engagement', 'Confused by navigation', 'Mobile UX issues'],
        assistanceLevel: 'none',
      },
      {
        id: 'course-selector-flow',
        description: 'Complete the course selection wizard',
        instructions:
          'Find the best course for your 650 target score and ₹80,000 budget. Take your time to provide accurate information.',
        startingPoint: 'Course selector entry point',
        expectedOutcome: 'Complete all steps and receive course recommendations',
        observationPoints: [
          'Step completion time',
          'Input accuracy',
          'Help-seeking behavior',
          'Drop-off points',
        ],
        failurePoints: [
          'Abandons mid-flow',
          'Provides inaccurate information',
          'Gets stuck on any step',
        ],
        assistanceLevel: 'minimal',
      },
      {
        id: 'recommendation-evaluation',
        description: 'Evaluate and compare recommended courses',
        instructions: 'Review your recommendations and compare different course options.',
        startingPoint: 'Recommendations page',
        expectedOutcome: 'Select a preferred course or request more information',
        observationPoints: [
          'Comparison behavior',
          'Feature importance',
          'Price sensitivity',
          'Trust indicators usage',
        ],
        failurePoints: ['Analysis paralysis', 'Dismisses all options', 'Seeks external validation'],
        assistanceLevel: 'minimal',
      },
      {
        id: 'conversion-decision',
        description: 'Make final enrollment decision',
        instructions:
          "You've found a course you like. Decide whether to enroll, consult, or continue researching.",
        startingPoint: 'Course details page',
        expectedOutcome: 'Initiate enrollment or consultation process',
        observationPoints: [
          'Hesitation points',
          'Information seeking',
          'Response to offers',
          'Exit intent behavior',
        ],
        failurePoints: [
          'Abandons without action',
          'Seeks external consultation',
          'Price objections',
        ],
        assistanceLevel: 'none',
      },
    ],
    expectedBehaviors: [
      'Thorough information consumption',
      'Analytical comparison of options',
      'Seeks detailed course information',
      'Responds to quality indicators',
      'Values expert credentials',
    ],
    successCriteria: {
      primary: [
        'Completes course selection',
        'Initiates enrollment or consultation',
        'Finds suitable match',
      ],
      secondary: [
        'Spends adequate time on each step',
        'Provides quality information',
        'Shows intent to purchase',
      ],
    },
    testEnvironment: {
      device: 'iPhone 13 (Mobile)',
      browser: 'Safari',
      networkCondition: '4G',
      timeOfDay: 'Evening (7-9 PM)',
    },
    dataToCollect: [
      'Step completion rates',
      'Time per step',
      'Input quality scores',
      'Feature interaction frequency',
      'Conversion funnel metrics',
      'Mobile UX pain points',
    ],
    estimatedDuration: '25-35 minutes',
  },

  {
    id: 'budget-conscious-value-assessment',
    personaId: 'budget-conscious-student',
    scenarioName: 'Value Assessment and Budget Optimization',
    description:
      'Rahul needs to find affordable yet effective NEET coaching within his ₹30,000 budget',
    objectives: [
      'Test budget constraint handling',
      'Evaluate scholarship/discount response',
      'Assess value proposition communication',
      'Test financial assistance options',
    ],
    tasks: [
      {
        id: 'budget-exploration',
        description: 'Explore courses within budget constraints',
        instructions:
          'You have a budget of ₹30,000 for NEET coaching. Find options that fit your budget.',
        startingPoint: 'Course selector with budget constraints',
        expectedOutcome: 'Identify budget-friendly options or financial assistance',
        observationPoints: [
          'Budget filter usage',
          'Price comparison behavior',
          'Scholarship interest',
          'EMI option evaluation',
        ],
        failurePoints: ['No suitable options found', 'Overwhelmed by prices', 'Exits due to cost'],
        assistanceLevel: 'minimal',
      },
      {
        id: 'value-proposition-test',
        description: 'Evaluate value for money',
        instructions: 'Compare what you get for your investment. Is it worth the cost?',
        startingPoint: 'Course comparison page',
        expectedOutcome: 'Clear understanding of value proposition',
        observationPoints: [
          'Feature importance ranking',
          'ROI calculation attempts',
          'Peer comparison interest',
          'Success story engagement',
        ],
        failurePoints: [
          'Cannot justify cost',
          'Unclear value proposition',
          'Seeks cheaper alternatives',
        ],
        assistanceLevel: 'minimal',
      },
      {
        id: 'financial-assistance-flow',
        description: 'Explore financial assistance options',
        instructions:
          "You like a course but it's slightly above budget. See if there are any assistance options.",
        startingPoint: 'Course details with pricing',
        expectedOutcome: 'Apply for scholarship or use discount offer',
        observationPoints: [
          'Scholarship form completion',
          'Documentation willingness',
          'EMI calculation usage',
          'Discount code application',
        ],
        failurePoints: [
          'Complex application process',
          'Insufficient assistance',
          'Gives up on process',
        ],
        assistanceLevel: 'guided',
      },
    ],
    expectedBehaviors: [
      'Price-first evaluation approach',
      'Seeks maximum value for investment',
      'Interested in financial assistance',
      'Compares cost per feature',
      'Looks for peer recommendations',
    ],
    successCriteria: {
      primary: [
        'Finds affordable option',
        'Applies for financial assistance',
        'Understands value proposition',
      ],
      secondary: [
        'Completes budget-focused journey',
        'Shows willingness to invest in quality',
        'Engages with support options',
      ],
    },
    testEnvironment: {
      device: 'Android phone (Mid-range)',
      browser: 'Chrome',
      networkCondition: '3G',
      timeOfDay: 'Afternoon (2-4 PM)',
    },
    dataToCollect: [
      'Price sensitivity metrics',
      'Financial assistance conversion',
      'Budget constraint workarounds',
      'Value perception scores',
      'EMI/payment plan usage',
    ],
    estimatedDuration: '20-30 minutes',
  },

  {
    id: 'confused-explorer-guidance',
    personaId: 'confused-explorer',
    scenarioName: 'Guided Discovery and Education',
    description:
      'Ananya is new to NEET preparation and needs guidance on course selection and exam understanding',
    objectives: [
      'Test educational content effectiveness',
      'Evaluate guidance system performance',
      'Assess clarity of course differentiation',
      'Test consultation system',
    ],
    tasks: [
      {
        id: 'neet-education',
        description: 'Learn about NEET exam and preparation requirements',
        instructions:
          "You're just starting NEET preparation. Understand what the exam involves and what kind of preparation you need.",
        startingPoint: 'Educational content section',
        expectedOutcome: 'Clear understanding of NEET requirements',
        observationPoints: [
          'Content engagement time',
          'Information seeking patterns',
          'Help feature usage',
          'Educational video interaction',
        ],
        failurePoints: [
          'Information overload',
          'Still confused after reading',
          'Exits without clarity',
        ],
        assistanceLevel: 'guided',
      },
      {
        id: 'course-differentiation',
        description: 'Understand different course options',
        instructions:
          'There are multiple course series available. Understand the differences and which might be right for you.',
        startingPoint: 'Course comparison page',
        expectedOutcome: 'Clear understanding of course differences',
        observationPoints: [
          'Comparison tool usage',
          'Feature explanation views',
          'Help text interaction',
          'Q&A section engagement',
        ],
        failurePoints: [
          'Cannot differentiate courses',
          'Analysis paralysis',
          'Seeks external help',
        ],
        assistanceLevel: 'guided',
      },
      {
        id: 'consultation-booking',
        description: 'Seek expert guidance through consultation',
        instructions:
          "You're still unsure about course selection. Book a consultation to get expert advice.",
        startingPoint: 'Consultation booking page',
        expectedOutcome: 'Successfully book a consultation session',
        observationPoints: [
          'Consultation value perception',
          'Booking process ease',
          'Preference selection accuracy',
          'Time slot flexibility',
        ],
        failurePoints: [
          'Complex booking process',
          'Unclear value proposition',
          'Technical difficulties',
        ],
        assistanceLevel: 'minimal',
      },
    ],
    expectedBehaviors: [
      'Seeks detailed explanations',
      'Uses help features frequently',
      'Prefers guided experience',
      'Values expert advice',
      'Needs reassurance at decision points',
    ],
    successCriteria: {
      primary: [
        'Gains clear understanding',
        'Successfully books consultation',
        'Makes informed decision',
      ],
      secondary: [
        'Engages with educational content',
        'Uses guidance features',
        'Shows confidence improvement',
      ],
    },
    testEnvironment: {
      device: 'iPad (Tablet)',
      browser: 'Safari',
      networkCondition: 'WiFi',
      timeOfDay: 'Morning (10-12 PM)',
    },
    dataToCollect: [
      'Educational content engagement',
      'Help feature usage patterns',
      'Confusion resolution metrics',
      'Consultation booking rates',
      'Learning progression tracking',
    ],
    estimatedDuration: '30-40 minutes',
  },

  {
    id: 'time-pressed-efficiency',
    personaId: 'time-pressed-achiever',
    scenarioName: 'Quick Decision Making for High Achievers',
    description:
      'Arjun needs rapid score improvement and wants to quickly find the best intensive coaching option',
    objectives: [
      'Test rapid decision-making flow',
      'Evaluate premium option presentation',
      'Assess efficiency of user experience',
      'Test urgency-based features',
    ],
    tasks: [
      {
        id: 'rapid-assessment',
        description: 'Quickly assess coaching options for intensive preparation',
        instructions:
          'You need rapid improvement in 4 months. Quickly find the best intensive course option.',
        startingPoint: 'Express entry for time-pressed students',
        expectedOutcome: 'Identify premium intensive options quickly',
        observationPoints: [
          'Speed of navigation',
          'Premium feature attraction',
          'Intensive program identification',
          'Quick comparison behavior',
        ],
        failurePoints: [
          'Gets bogged down in details',
          'Cannot find intensive options',
          'Process takes too long',
        ],
        assistanceLevel: 'none',
      },
      {
        id: 'premium-evaluation',
        description: 'Evaluate premium coaching features',
        instructions: 'Compare premium features and assess if they justify the higher investment.',
        startingPoint: 'Premium course details',
        expectedOutcome: 'Quick decision on premium features value',
        observationPoints: [
          'Premium feature engagement',
          'ROI calculation speed',
          'Success story relevance',
          'Expert credential importance',
        ],
        failurePoints: ['Unclear premium value', 'Price shock', 'Feature complexity'],
        assistanceLevel: 'minimal',
      },
      {
        id: 'instant-enrollment',
        description: 'Quick enrollment with minimal friction',
        instructions: "You've decided on a course. Complete the enrollment as quickly as possible.",
        startingPoint: 'Enrollment page',
        expectedOutcome: 'Complete enrollment efficiently',
        observationPoints: [
          'Form completion speed',
          'Payment process efficiency',
          'Auto-fill feature usage',
          'Express checkout behavior',
        ],
        failurePoints: ['Complex enrollment process', 'Payment friction', 'Too many steps'],
        assistanceLevel: 'none',
      },
    ],
    expectedBehaviors: [
      'Rapid scanning behavior',
      'Premium option preference',
      'Efficiency-focused navigation',
      'Quick decision making',
      'Values time-saving features',
    ],
    successCriteria: {
      primary: [
        'Completes journey in <15 minutes',
        'Successfully enrolls',
        'Finds intensive options',
      ],
      secondary: [
        'Uses express features',
        'Engages with premium content',
        'Shows satisfaction with speed',
      ],
    },
    testEnvironment: {
      device: 'MacBook Pro (Desktop)',
      browser: 'Chrome',
      networkCondition: 'High-speed WiFi',
      timeOfDay: 'Late evening (9-11 PM)',
    },
    dataToCollect: [
      'Task completion speed',
      'Premium feature adoption',
      'Express pathway usage',
      'Conversion velocity metrics',
      'Efficiency satisfaction scores',
    ],
    estimatedDuration: '15-20 minutes',
  },

  {
    id: 'parent-driven-validation',
    personaId: 'parent-driven-student',
    scenarioName: 'Parent-Student Collaborative Decision Making',
    description:
      'Sneha and her parents need to jointly evaluate and select NEET coaching with shared decision making',
    objectives: [
      'Test collaborative features',
      'Evaluate parent-focused content',
      'Assess information sharing capabilities',
      'Test validation and approval flows',
    ],
    tasks: [
      {
        id: 'parent-information-gathering',
        description: 'Gather comprehensive information for parent review',
        instructions:
          'Your parents want detailed information about the coaching. Collect comprehensive details they would need.',
        startingPoint: 'Parent information section',
        expectedOutcome: 'Compile comprehensive information package',
        observationPoints: [
          'Parent-focused content engagement',
          'Information download behavior',
          'Detailed comparison creation',
          'Credential verification interest',
        ],
        failurePoints: [
          'Insufficient detail level',
          'Cannot find parent-relevant info',
          'Complex information structure',
        ],
        assistanceLevel: 'guided',
      },
      {
        id: 'collaborative-evaluation',
        description: 'Evaluate options with parent input simulation',
        instructions:
          'Simulate discussing options with parents. What questions would they ask? What information do they need?',
        startingPoint: 'Course comparison with parent perspective',
        expectedOutcome: 'Identify parent concerns and required information',
        observationPoints: [
          'Parent FAQ engagement',
          'Success story relevance',
          'Faculty credential interest',
          'Safety and support feature focus',
        ],
        failurePoints: [
          'Cannot address parent concerns',
          'Missing critical information',
          'Unclear value proposition for parents',
        ],
        assistanceLevel: 'minimal',
      },
      {
        id: 'approval-workflow',
        description: 'Seek approval and confirmation',
        instructions:
          "You've selected a course but need parent approval. How would you get their buy-in?",
        startingPoint: 'Selected course with approval needed',
        expectedOutcome: 'Generate approval-supporting documentation',
        observationPoints: [
          'Approval feature usage',
          'Information sharing methods',
          'Consultation booking for parents',
          'Validation-seeking behavior',
        ],
        failurePoints: [
          'No clear approval path',
          'Insufficient parent engagement',
          'Cannot generate buy-in',
        ],
        assistanceLevel: 'guided',
      },
    ],
    expectedBehaviors: [
      'Detailed information gathering',
      'Seeks validation and approval',
      'Parent-perspective evaluation',
      'Conservative decision making',
      'Values institutional credibility',
    ],
    successCriteria: {
      primary: [
        'Gathers comprehensive information',
        'Addresses parent concerns',
        'Creates approval pathway',
      ],
      secondary: [
        'Engages with parent-focused content',
        'Uses collaborative features',
        'Shows confidence in recommendation',
      ],
    },
    testEnvironment: {
      device: 'iPad Pro (Tablet)',
      browser: 'Safari',
      networkCondition: 'WiFi',
      timeOfDay: 'Weekend morning (10-12 PM)',
    },
    dataToCollect: [
      'Parent-focused content engagement',
      'Information gathering patterns',
      'Collaborative feature usage',
      'Approval workflow metrics',
      'Parent-student interaction simulation',
    ],
    estimatedDuration: '35-45 minutes',
  },
]

// Testing task templates for reusability
export const TASK_TEMPLATES = {
  landing_page_exploration: {
    description: 'Explore and understand the landing page',
    observationPoints: [
      'Time to understand value proposition',
      'Navigation behavior',
      'CTA engagement',
    ],
    successCriteria: ['Understands offering within 30 seconds', 'Engages with primary CTA'],
  },

  course_selector_completion: {
    description: 'Complete the course selection wizard',
    observationPoints: ['Step completion rate', 'Input accuracy', 'Drop-off points'],
    successCriteria: ['Completes all required steps', 'Provides accurate information'],
  },

  price_evaluation: {
    description: 'Evaluate pricing and value proposition',
    observationPoints: [
      'Price comparison behavior',
      'Feature evaluation time',
      'ROI consideration',
    ],
    successCriteria: ['Understands value proposition', 'Makes informed price decision'],
  },

  consultation_booking: {
    description: 'Book a consultation session',
    observationPoints: ['Booking process ease', 'Time slot selection', 'Information accuracy'],
    successCriteria: ['Successfully books consultation', 'Provides accurate contact information'],
  },

  enrollment_completion: {
    description: 'Complete the enrollment process',
    observationPoints: ['Form completion speed', 'Payment flow ease', 'Error recovery'],
    successCriteria: ['Completes enrollment', 'No critical errors encountered'],
  },
}

// Test execution framework
export interface TestExecution {
  sessionId: string
  participantId: string
  personaId: string
  scenarioId: string
  startTime: Date
  endTime?: Date
  status: 'in_progress' | 'completed' | 'abandoned'
  taskResults: TaskResult[]
  overallMetrics: {
    satisfactionScore: number
    difficultyScore: number
    completionRate: number
    taskSuccessRate: number
  }
  observerNotes: string[]
  technicalIssues: string[]
  recommendations: string[]
}

export interface TaskResult {
  taskId: string
  status: 'completed' | 'failed' | 'abandoned'
  startTime: Date
  endTime?: Date
  duration?: number
  successCriteriaMet: boolean[]
  observationData: { [key: string]: any }
  participantFeedback: string
  observerNotes: string[]
  errors: string[]
}

// User testing execution helper
export class UserTestingExecutor {
  private currentExecution: TestExecution | null = null

  startTest(participantId: string, personaId: string, scenarioId: string): TestExecution {
    this.currentExecution = {
      sessionId: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      participantId,
      personaId,
      scenarioId,
      startTime: new Date(),
      status: 'in_progress',
      taskResults: [],
      overallMetrics: {
        satisfactionScore: 0,
        difficultyScore: 0,
        completionRate: 0,
        taskSuccessRate: 0,
      },
      observerNotes: [],
      technicalIssues: [],
      recommendations: [],
    }

    return this.currentExecution
  }

  recordTaskResult(taskResult: TaskResult): void {
    if (this.currentExecution) {
      this.currentExecution.taskResults.push(taskResult)
      this.updateMetrics()
    }
  }

  completeTest(finalMetrics: Partial<TestExecution['overallMetrics']>): TestExecution | null {
    if (this.currentExecution) {
      this.currentExecution.endTime = new Date()
      this.currentExecution.status = 'completed'
      this.currentExecution.overallMetrics = {
        ...this.currentExecution.overallMetrics,
        ...finalMetrics,
      }
    }

    return this.currentExecution
  }

  private updateMetrics(): void {
    if (!this.currentExecution) return

    const completedTasks = this.currentExecution.taskResults.filter((t) => t.status === 'completed')
    const totalTasks = this.currentExecution.taskResults.length

    this.currentExecution.overallMetrics.completionRate =
      totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0
    this.currentExecution.overallMetrics.taskSuccessRate =
      completedTasks.length > 0
        ? (completedTasks.reduce(
            (acc, task) =>
              acc + task.successCriteriaMet.filter(Boolean).length / task.successCriteriaMet.length,
            0
          ) /
            completedTasks.length) *
          100
        : 0
  }

  exportResults(): string {
    if (!this.currentExecution) return ''

    return JSON.stringify(this.currentExecution, null, 2)
  }
}
