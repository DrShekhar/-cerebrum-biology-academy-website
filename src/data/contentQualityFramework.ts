/**
 * Content Quality Framework for NEET Biology Test Generator
 * Comprehensive quality standards and validation mechanisms
 */

export interface ContentStandard {
  id: string
  category: 'accuracy' | 'alignment' | 'pedagogy' | 'technical'
  title: string
  description: string
  criteria: QualityCriterion[]
  weight: number // percentage weight in overall quality score
  minimumThreshold: number // minimum score to pass
}

export interface QualityCriterion {
  id: string
  name: string
  description: string
  checkpoints: string[]
  scoringRubric: ScoringLevel[]
  validationMethod: 'manual' | 'automated' | 'peer-review'
}

export interface ScoringLevel {
  score: number
  label: 'Excellent' | 'Good' | 'Satisfactory' | 'Needs Improvement' | 'Poor'
  description: string
  examples?: string[]
}

export interface QualityValidationResult {
  questionId: string
  overallScore: number
  categoryScores: { [category: string]: number }
  criterionScores: { [criterionId: string]: number }
  validationStatus: 'approved' | 'needs-revision' | 'rejected'
  recommendations: string[]
  reviewerNotes?: string
  validatedAt: Date
  validatedBy: string
}

// Content Quality Standards
export const contentQualityStandards: ContentStandard[] = [
  {
    id: 'cqs-001',
    category: 'accuracy',
    title: 'Scientific Accuracy',
    description: 'Ensures factual correctness and up-to-date scientific information',
    weight: 30,
    minimumThreshold: 85,
    criteria: [
      {
        id: 'acc-001',
        name: 'Factual Correctness',
        description: 'Question content is scientifically accurate and error-free',
        checkpoints: [
          'Facts align with current scientific understanding',
          'No contradictions with established principles',
          'Terminology used correctly',
          'Units and measurements are accurate',
        ],
        scoringRubric: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All facts are accurate and current',
            examples: ['Perfect alignment with latest research', 'No factual errors'],
          },
          {
            score: 80,
            label: 'Good',
            description: "Minor inaccuracies that don't affect understanding",
            examples: ['Slight outdated terminology', 'Non-critical missing details'],
          },
          {
            score: 60,
            label: 'Satisfactory',
            description: 'Generally accurate with some errors',
            examples: ['Few factual mistakes', 'Some confusion in terminology'],
          },
          {
            score: 40,
            label: 'Needs Improvement',
            description: 'Several accuracy issues present',
            examples: ['Multiple factual errors', 'Outdated information'],
          },
          {
            score: 20,
            label: 'Poor',
            description: 'Significant accuracy problems',
            examples: ['Major scientific errors', 'Misleading information'],
          },
        ],
        validationMethod: 'peer-review',
      },
      {
        id: 'acc-002',
        name: 'NCERT Alignment',
        description: 'Content strictly follows NCERT guidelines and curriculum',
        checkpoints: [
          'Directly based on NCERT textbook content',
          'Uses NCERT terminology and conventions',
          'Maintains curriculum scope and sequence',
          'Includes proper chapter references',
        ],
        scoringRubric: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Perfect NCERT alignment with proper references',
            examples: ['Direct NCERT content adaptation', 'Accurate page references'],
          },
          {
            score: 80,
            label: 'Good',
            description: 'Strong alignment with minor deviations',
            examples: ['Follows NCERT spirit', 'Slight presentation differences'],
          },
          {
            score: 60,
            label: 'Satisfactory',
            description: 'Generally aligned with some gaps',
            examples: ['Most content follows NCERT', 'Some missing references'],
          },
          {
            score: 40,
            label: 'Needs Improvement',
            description: 'Partial alignment with notable deviations',
            examples: ['Significant content differences', 'Inconsistent terminology'],
          },
          {
            score: 20,
            label: 'Poor',
            description: 'Poor alignment with NCERT standards',
            examples: ['Major deviations from curriculum', 'Inappropriate content level'],
          },
        ],
        validationMethod: 'manual',
      },
    ],
  },
  {
    id: 'cqs-002',
    category: 'alignment',
    title: 'NEET Pattern Alignment',
    description: 'Questions follow NEET exam patterns and difficulty progression',
    weight: 25,
    minimumThreshold: 80,
    criteria: [
      {
        id: 'align-001',
        name: 'Question Pattern Compliance',
        description: 'Questions follow established NEET patterns and formats',
        checkpoints: [
          'Matches previous year question styles',
          'Appropriate difficulty distribution',
          'Correct question type format',
          'Suitable time allocation',
        ],
        scoringRubric: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Perfect match with NEET patterns',
            examples: ['Exact format compliance', 'Appropriate difficulty level'],
          },
          {
            score: 80,
            label: 'Good',
            description: 'Strong pattern alignment',
            examples: ['Minor format variations', 'Suitable complexity'],
          },
          {
            score: 60,
            label: 'Satisfactory',
            description: 'Generally follows patterns',
            examples: ['Acceptable format', 'Reasonable difficulty'],
          },
          {
            score: 40,
            label: 'Needs Improvement',
            description: 'Some pattern deviations',
            examples: ['Format inconsistencies', 'Difficulty misalignment'],
          },
          {
            score: 20,
            label: 'Poor',
            description: 'Poor pattern compliance',
            examples: ['Wrong format', 'Inappropriate difficulty'],
          },
        ],
        validationMethod: 'automated',
      },
      {
        id: 'align-002',
        name: 'Weightage Distribution',
        description: 'Topic coverage matches NEET weightage patterns',
        checkpoints: [
          'High-weightage topics get more questions',
          'Balanced coverage across units',
          'Appropriate chapter representation',
          'Class 11/12 distribution is correct',
        ],
        scoringRubric: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Perfect weightage distribution',
            examples: ['Matches historical NEET patterns', 'Balanced topic coverage'],
          },
          {
            score: 80,
            label: 'Good',
            description: 'Good distribution with minor gaps',
            examples: ['Mostly accurate weightage', 'Minor imbalances'],
          },
          {
            score: 60,
            label: 'Satisfactory',
            description: 'Acceptable distribution',
            examples: ['Reasonable coverage', 'Some weightage issues'],
          },
          {
            score: 40,
            label: 'Needs Improvement',
            description: 'Notable distribution problems',
            examples: ['Significant imbalances', 'Missed important topics'],
          },
          {
            score: 20,
            label: 'Poor',
            description: 'Poor weightage distribution',
            examples: ['Major gaps', 'Incorrect focus areas'],
          },
        ],
        validationMethod: 'automated',
      },
    ],
  },
  {
    id: 'cqs-003',
    category: 'pedagogy',
    title: 'Educational Effectiveness',
    description: 'Questions promote effective learning and understanding',
    weight: 25,
    minimumThreshold: 75,
    criteria: [
      {
        id: 'ped-001',
        name: 'Conceptual Clarity',
        description: 'Questions test understanding rather than memorization',
        checkpoints: [
          'Tests conceptual understanding',
          'Promotes critical thinking',
          'Avoids trick questions',
          'Clear learning objectives',
        ],
        scoringRubric: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Excellent conceptual focus',
            examples: ['Deep understanding tested', 'Clear concept application'],
          },
          {
            score: 80,
            label: 'Good',
            description: 'Good conceptual clarity',
            examples: ['Mostly concept-based', 'Some application required'],
          },
          {
            score: 60,
            label: 'Satisfactory',
            description: 'Adequate conceptual content',
            examples: ['Basic concepts tested', 'Some memorization required'],
          },
          {
            score: 40,
            label: 'Needs Improvement',
            description: 'Limited conceptual focus',
            examples: ['Mostly factual recall', 'Unclear concepts'],
          },
          {
            score: 20,
            label: 'Poor',
            description: 'Poor conceptual clarity',
            examples: ['Pure memorization', 'Confusing concepts'],
          },
        ],
        validationMethod: 'peer-review',
      },
      {
        id: 'ped-002',
        name: 'Explanation Quality',
        description: 'Explanations are clear, comprehensive, and educational',
        checkpoints: [
          'Clear step-by-step reasoning',
          'Addresses common misconceptions',
          'Provides additional learning insights',
          'Uses appropriate language level',
        ],
        scoringRubric: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Outstanding explanations with insights',
            examples: ['Clear reasoning', 'Educational value added'],
          },
          {
            score: 80,
            label: 'Good',
            description: 'Good explanations with clarity',
            examples: ['Well-structured reasoning', 'Helpful insights'],
          },
          {
            score: 60,
            label: 'Satisfactory',
            description: 'Adequate explanations',
            examples: ['Basic reasoning provided', 'Sufficient clarity'],
          },
          {
            score: 40,
            label: 'Needs Improvement',
            description: 'Weak explanations',
            examples: ['Unclear reasoning', 'Missing details'],
          },
          {
            score: 20,
            label: 'Poor',
            description: 'Poor or missing explanations',
            examples: ['No clear reasoning', 'Confusing explanations'],
          },
        ],
        validationMethod: 'manual',
      },
    ],
  },
  {
    id: 'cqs-004',
    category: 'technical',
    title: 'Technical Quality',
    description: 'Questions meet technical standards for digital delivery',
    weight: 20,
    minimumThreshold: 80,
    criteria: [
      {
        id: 'tech-001',
        name: 'Language and Grammar',
        description: 'Questions use correct grammar, spelling, and language',
        checkpoints: [
          'Perfect grammar and spelling',
          'Clear and concise language',
          'Appropriate vocabulary level',
          'Consistent terminology',
        ],
        scoringRubric: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Perfect language quality',
            examples: ['No errors', 'Clear expression'],
          },
          {
            score: 80,
            label: 'Good',
            description: 'Good language with minor issues',
            examples: ['Very few errors', 'Generally clear'],
          },
          {
            score: 60,
            label: 'Satisfactory',
            description: 'Acceptable language quality',
            examples: ['Some errors', 'Mostly understandable'],
          },
          {
            score: 40,
            label: 'Needs Improvement',
            description: 'Notable language issues',
            examples: ['Multiple errors', 'Unclear expression'],
          },
          {
            score: 20,
            label: 'Poor',
            description: 'Poor language quality',
            examples: ['Many errors', 'Confusing language'],
          },
        ],
        validationMethod: 'automated',
      },
      {
        id: 'tech-002',
        name: 'Format and Structure',
        description: 'Questions follow consistent format and structure standards',
        checkpoints: [
          'Consistent question formatting',
          'Proper option labeling',
          'Correct metadata tagging',
          'Appropriate media integration',
        ],
        scoringRubric: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Perfect format compliance',
            examples: ['Consistent formatting', 'All metadata present'],
          },
          {
            score: 80,
            label: 'Good',
            description: 'Good format with minor issues',
            examples: ['Mostly consistent', 'Minor format variations'],
          },
          {
            score: 60,
            label: 'Satisfactory',
            description: 'Acceptable format',
            examples: ['Basic compliance', 'Some inconsistencies'],
          },
          {
            score: 40,
            label: 'Needs Improvement',
            description: 'Format issues present',
            examples: ['Inconsistent formatting', 'Missing metadata'],
          },
          {
            score: 20,
            label: 'Poor',
            description: 'Poor format compliance',
            examples: ['Major format problems', 'Incorrect structure'],
          },
        ],
        validationMethod: 'automated',
      },
    ],
  },
]

// Quality Validation Process
export const validationProcess = {
  stages: [
    {
      id: 'stage-1',
      name: 'Automated Validation',
      description: 'Initial automated checks for format, grammar, and basic compliance',
      criteria: ['tech-001', 'tech-002', 'align-001', 'align-002'],
      passingThreshold: 75,
      estimatedTime: '5 minutes per question',
    },
    {
      id: 'stage-2',
      name: 'Subject Matter Expert Review',
      description: 'Expert review for scientific accuracy and NCERT alignment',
      criteria: ['acc-001', 'acc-002', 'ped-001'],
      passingThreshold: 80,
      estimatedTime: '15 minutes per question',
    },
    {
      id: 'stage-3',
      name: 'Pedagogical Review',
      description: 'Educational effectiveness and explanation quality review',
      criteria: ['ped-002'],
      passingThreshold: 75,
      estimatedTime: '10 minutes per question',
    },
    {
      id: 'stage-4',
      name: 'Final Quality Assurance',
      description: 'Comprehensive final review and approval',
      criteria: 'all',
      passingThreshold: 80,
      estimatedTime: '5 minutes per question',
    },
  ],
  reviewerRoles: [
    {
      role: 'Subject Matter Expert',
      qualifications: [
        'PhD in Biology/Life Sciences',
        '5+ years teaching experience',
        'NEET coaching background',
      ],
      responsibilities: [
        'Scientific accuracy validation',
        'NCERT alignment verification',
        'Concept clarity assessment',
      ],
    },
    {
      role: 'Educational Reviewer',
      qualifications: ['M.Ed or equivalent', '3+ years curriculum design', 'Assessment expertise'],
      responsibilities: [
        'Pedagogical effectiveness review',
        'Explanation quality assessment',
        'Learning objective alignment',
      ],
    },
    {
      role: 'Technical Reviewer',
      qualifications: [
        'Technical background',
        'Platform familiarity',
        'Quality assurance experience',
      ],
      responsibilities: [
        'Format validation',
        'Technical implementation review',
        'Metadata verification',
      ],
    },
  ],
}

// Content Development Workflow
export const contentDevelopmentWorkflow = {
  phases: [
    {
      phase: 'Content Planning',
      duration: '1 week',
      activities: [
        'Topic prioritization based on NEET weightage',
        'Question distribution planning',
        'Content calendar creation',
        'Resource allocation',
      ],
      deliverables: ['Content roadmap', 'Question matrix', 'Resource plan'],
    },
    {
      phase: 'Content Creation',
      duration: '4-6 weeks',
      activities: [
        'Question drafting by subject experts',
        'Initial self-review by creators',
        'Explanation and metadata addition',
        'Internal team review',
      ],
      deliverables: ['Draft question bank', 'Explanation library', 'Metadata database'],
    },
    {
      phase: 'Quality Validation',
      duration: '2-3 weeks',
      activities: [
        'Automated validation execution',
        'Expert review process',
        'Feedback incorporation',
        'Final approval workflow',
      ],
      deliverables: ['Validated question bank', 'Quality reports', 'Approval certificates'],
    },
    {
      phase: 'Platform Integration',
      duration: '1 week',
      activities: [
        'Question bank upload',
        'Platform testing',
        'User acceptance testing',
        'Performance optimization',
      ],
      deliverables: ['Live question bank', 'Test reports', 'Performance metrics'],
    },
  ],
}

// Quality Metrics and KPIs
export const qualityMetrics = {
  overallQuality: {
    target: 85,
    measurement: 'Average quality score across all standards',
    reportingFrequency: 'Weekly',
  },
  scientificAccuracy: {
    target: 90,
    measurement: 'Average score for accuracy category',
    reportingFrequency: 'Daily',
  },
  neetAlignment: {
    target: 85,
    measurement: 'Average score for alignment category',
    reportingFrequency: 'Weekly',
  },
  reviewEfficiency: {
    target: 30, // minutes per question
    measurement: 'Average time for complete review process',
    reportingFrequency: 'Weekly',
  },
  approvalRate: {
    target: 75, // percentage
    measurement: 'Percentage of questions approved on first review',
    reportingFrequency: 'Weekly',
  },
}

export default {
  contentQualityStandards,
  validationProcess,
  contentDevelopmentWorkflow,
  qualityMetrics,
}
