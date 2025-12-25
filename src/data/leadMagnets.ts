export interface LeadMagnet {
  id: string
  title: string
  description: string
  type: 'pdf' | 'video' | 'webinar' | 'assessment' | 'checklist' | 'strategy-session'
  value: string
  ctaText: string
  downloadText: string
  fileName?: string
  targetAreas: string[]
  targetStudents: ('class-11' | 'class-12' | 'dropper' | 'cbse' | 'state-board')[]
  conversionBenefits: string[]
  socialProof?: string
}

export const localLeadMagnets: LeadMagnet[] = [
  {
    id: 'neet-biology-chapterwise-weightage',
    title: 'NEET Biology Chapter-wise Weightage Analysis 2025',
    description:
      'Get the exclusive chapter-wise analysis of last 10 years NEET Biology questions. Know exactly which topics to focus on for maximum marks.',
    type: 'pdf',
    value: '₹2,999 Value - FREE',
    ctaText: 'Download Free Analysis Report',
    downloadText: 'Get Your Free Weightage Analysis',
    fileName: 'NEET_Biology_Weightage_Analysis_2025.pdf',
    targetAreas: ['all'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Save 200+ hours of study time',
      'Focus on high-scoring chapters only',
      'Avoid low-weightage topics that waste time',
      'Strategic preparation plan included',
      'Previous year analysis of trends',
    ],
    socialProof: 'Downloaded by 5,000+ NEET aspirants in Delhi NCR',
  },
  {
    id: 'local-neet-success-strategy',
    title: '[AREA] NEET Success Strategy Guide 2025',
    description:
      'Discover how students from [AREA] are cracking NEET with our proven local strategy. Includes area-specific study tips and coaching center comparison.',
    type: 'pdf',
    value: 'Exclusive Local Guide - FREE',
    ctaText: 'Get [AREA] Strategy Guide',
    downloadText: 'Download Your Local Success Guide',
    fileName: '[AREA]_NEET_Strategy_Guide_2025.pdf',
    targetAreas: ['gurgaon', 'noida', 'faridabad', 'ghaziabad', 'greater-noida', 'delhi-central'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Local transport and timing optimization',
      'Best study cafes and libraries in [AREA]',
      'Peer group formation strategies',
      'Local coaching comparison matrix',
      'Area-specific parent guidance tips',
    ],
    socialProof: 'Helped 500+ students from [AREA] crack NEET',
  },
  {
    id: 'biology-memory-techniques',
    title: '15 Memory Techniques for Biology - Never Forget Again!',
    description:
      'Master biology with proven memory techniques used by AIIMS toppers. Includes mnemonics for anatomy, taxonomy, and biochemistry.',
    type: 'video',
    value: '₹4,999 Masterclass - FREE',
    ctaText: 'Watch Free Memory Masterclass',
    downloadText: 'Start Watching Now',
    targetAreas: ['all'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      '15 proven memory techniques',
      'Remember complex diagrams easily',
      'Score 40+ more marks in biology',
      'Reduce revision time by 60%',
      'Confidence in biology section',
    ],
    socialProof: 'Watched by 1,50,000+ NEET students with 95% improvement rate',
  },
  {
    id: 'free-neet-biology-assessment',
    title: 'Free NEET Biology Readiness Assessment',
    description:
      'Take our comprehensive biology assessment and get a personalized study plan. Know your exact preparation level and improvement areas.',
    type: 'assessment',
    value: '₹1,999 Assessment - FREE',
    ctaText: 'Take Free Assessment',
    downloadText: 'Start Your Assessment',
    targetAreas: ['all'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Know your exact NEET readiness level',
      'Personalized study plan created',
      'Identify weak topics instantly',
      'Get improvement timeline',
      'Compare with other NEET aspirants',
    ],
    socialProof: 'Taken by 25,000+ students with 98% accuracy rate',
  },
  {
    id: 'dropper-year-planning',
    title: 'NEET Dropper Year Planning Checklist',
    description:
      'Complete month-by-month planning guide for NEET droppers. Avoid common mistakes and stay motivated throughout your preparation year.',
    type: 'checklist',
    value: 'Expert Guidance - FREE',
    ctaText: 'Get Dropper Planning Guide',
    downloadText: 'Download Planning Checklist',
    fileName: 'NEET_Dropper_Year_Planning_2025.pdf',
    targetAreas: ['all'],
    targetStudents: ['dropper'],
    conversionBenefits: [
      'Month-by-month preparation timeline',
      'Motivation and mental health tips',
      'Mock test schedule planning',
      'Revision strategy for droppers',
      'Parents guidance included',
    ],
    socialProof: 'Used by 3,000+ successful NEET droppers',
  },
  {
    id: 'free-strategy-session',
    title: 'Free 20-Minute NEET Strategy Session',
    description:
      'Get personalized NEET preparation strategy from our AIIMS expert faculty. Discuss your goals, challenges, and get a custom study plan.',
    type: 'strategy-session',
    value: '₹2,500 Consultation - FREE',
    ctaText: 'Book Free Strategy Session',
    downloadText: 'Schedule Your Session',
    targetAreas: ['all'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'One-on-one session with AIIMS faculty',
      'Personalized study strategy',
      'Career guidance and counseling',
      'Course recommendation based on needs',
      'Parent involvement encouraged',
    ],
    socialProof: 'Over 1,000 successful strategy sessions completed',
  },
  {
    id: 'local-coaching-comparison',
    title: '[AREA] NEET Coaching Comparison Report 2025',
    description:
      'Unbiased comparison of all NEET coaching centers in [AREA]. Includes fees, faculty, results, and our exclusive recommendation.',
    type: 'pdf',
    value: 'Insider Report - FREE',
    ctaText: 'Get Coaching Comparison Report',
    downloadText: 'Download Comparison Report',
    fileName: '[AREA]_Coaching_Comparison_2025.pdf',
    targetAreas: ['gurgaon', 'noida', 'faridabad', 'ghaziabad'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Unbiased comparison matrix',
      'Faculty qualification analysis',
      'Fee structure breakdown',
      'Results and success rate data',
      'Hidden costs revealed',
    ],
    socialProof: 'Helped 2,000+ families make informed decisions',
  },
  {
    id: 'class-11-headstart-guide',
    title: 'Class 11 NEET Head-Start Guide',
    description:
      'Start your NEET preparation right from Class 11. Complete roadmap to build strong foundation and ace both boards and NEET.',
    type: 'pdf',
    value: '₹1,999 Guide - FREE',
    ctaText: 'Get Class 11 Head-Start Guide',
    downloadText: 'Download Foundation Guide',
    fileName: 'Class_11_NEET_Headstart_2025.pdf',
    targetAreas: ['all'],
    targetStudents: ['class-11'],
    conversionBenefits: [
      '2-year strategic preparation plan',
      'Board + NEET integration tips',
      'Foundation building techniques',
      'Time management for Class 11',
      'Early preparation advantages',
    ],
    socialProof: 'Downloaded by 8,000+ Class 11 students',
  },
]

export const getLeadMagnetsByArea = (areaId: string): LeadMagnet[] => {
  return localLeadMagnets.filter(
    (magnet) => magnet.targetAreas.includes('all') || magnet.targetAreas.includes(areaId)
  )
}

export const getLeadMagnetsByStudent = (studentType: string): LeadMagnet[] => {
  return localLeadMagnets.filter((magnet) =>
    magnet.targetStudents.includes(
      studentType as 'class-11' | 'class-12' | 'dropper' | 'cbse' | 'state-board'
    )
  )
}
