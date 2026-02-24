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
    title: 'NEET Biology Chapter-wise Weightage Analysis 2026',
    description:
      'Get the exclusive chapter-wise analysis of last 10 years NEET Biology questions. Know exactly which topics to focus on for maximum marks.',
    type: 'pdf',
    value: '₹2,999 Value - FREE',
    ctaText: 'Download Free Analysis Report',
    downloadText: 'Get Your Free Weightage Analysis',
    fileName: 'NEET_Biology_Weightage_2026.pdf',
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
    id: 'neet-biology-pyq-collection',
    title: 'NEET Biology Previous Year Questions (2020-2025)',
    description:
      'Chapter-wise collection of 60 important NEET Biology PYQs with detailed answers and explanations. Perfect for targeted revision.',
    type: 'pdf',
    value: '₹1,999 Value - FREE',
    ctaText: 'Download Free PYQ Collection',
    downloadText: 'Get Your PYQ Collection',
    fileName: 'NEET_Biology_PYQ_2020_2025.pdf',
    targetAreas: ['all'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Chapter-wise organized PYQs',
      'Detailed answer explanations',
      'Understand NEET exam patterns',
      'Quick revision answer key',
      'Expert tips from Dr. Shekhar',
    ],
    socialProof: 'Downloaded by 12,000+ NEET aspirants',
  },
  {
    id: 'local-neet-success-strategy',
    title: '[AREA] NEET Success Strategy Guide 2027',
    description:
      'Discover how students from [AREA] are cracking NEET with our proven local strategy. Includes area-specific study tips and coaching center comparison.',
    type: 'pdf',
    value: 'Exclusive Local Guide - FREE',
    ctaText: 'Get [AREA] Strategy Guide',
    downloadText: 'Download Your Local Success Guide',
    fileName: '[AREA]_NEET_Strategy_Guide_2027.pdf',
    targetAreas: ['gurgaon', 'noida', 'faridabad', 'ghaziabad', 'greater-noida', 'delhi-central'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Local transport and timing optimization',
      'Best study cafes and libraries in [AREA]',
      'Peer group formation strategies',
      'Local coaching comparison matrix',
      'Area-specific parent guidance tips',
    ],
    socialProof: 'Trusted by 1,50,000+ students for NEET preparation',
  },
  {
    id: 'biology-memory-techniques',
    title: 'Top 50 Biology Mnemonics for NEET 2026',
    description:
      'Master biology with 50 proven mnemonics used by AIIMS toppers. Covers taxonomy, cell biology, genetics, physiology, ecology and reproduction.',
    type: 'pdf',
    value: '₹4,999 Value - FREE',
    ctaText: 'Download Free Mnemonics PDF',
    downloadText: 'Get Your Mnemonics Collection',
    fileName: 'Biology_Mnemonics_NEET_2026.pdf',
    targetAreas: ['all'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      '50 proven biology mnemonics',
      'Remember complex diagrams easily',
      'Score 40+ more marks in biology',
      'Reduce revision time by 60%',
      'Confidence in biology section',
    ],
    socialProof: 'Downloaded by 8,000+ NEET aspirants',
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
    socialProof: 'Taken by 21,50,000+ students with 98% accuracy rate',
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
    fileName: 'NEET_Dropper_Year_Planning_2027.pdf',
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
    title: '[AREA] NEET Coaching Comparison Report 2027',
    description:
      'Unbiased comparison of all NEET coaching centers in [AREA]. Includes fees, faculty, results, and our exclusive recommendation.',
    type: 'pdf',
    value: 'Insider Report - FREE',
    ctaText: 'Get Coaching Comparison Report',
    downloadText: 'Download Comparison Report',
    fileName: '[AREA]_Coaching_Comparison_2027.pdf',
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
    fileName: 'Class_11_NEET_Headstart_2027.pdf',
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
  // ===== CHANDIGARH TRICITY & PUNJAB LEAD MAGNETS =====
  {
    id: 'chandigarh-neet-strategy-guide',
    title: 'Chandigarh Tricity NEET Strategy Guide 2026',
    description:
      'Comprehensive NEET preparation guide for Chandigarh, Mohali, and Panchkula students. Includes coaching comparison, cutoff analysis, and local success stories.',
    type: 'pdf',
    value: '₹2,999 Guide - FREE',
    ctaText: 'Download Chandigarh Strategy Guide',
    downloadText: 'Get Your Free Tricity Guide',
    fileName: 'Chandigarh_Tricity_NEET_Strategy_2026.pdf',
    targetAreas: ['chandigarh', 'chandigarh-sector-34', 'chandigarh-sector-17', 'mohali', 'panchkula', 'zirakpur'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Sector 34 coaching center comparison matrix',
      'PGIMER & GMCH cutoff analysis 2020-2025',
      'Online vs offline coaching cost-benefit analysis',
      'Tricity transport time calculator',
      'Success stories from 780+ Tricity students',
    ],
    socialProof: 'Downloaded by 1,50,000+ Chandigarh Tricity students',
  },
  {
    id: 'pgimer-gmch-roadmap',
    title: 'PGIMER & GMCH Chandigarh Admission Roadmap 2026',
    description:
      'Complete guide to securing admission in PGIMER and GMCH Chandigarh. Cutoff trends, counselling process, seat matrix, and preparation strategy.',
    type: 'pdf',
    value: '₹3,999 Value - FREE',
    ctaText: 'Get PGIMER/GMCH Roadmap',
    downloadText: 'Download Admission Roadmap',
    fileName: 'PGIMER_GMCH_Chandigarh_Roadmap_2026.pdf',
    targetAreas: ['chandigarh', 'chandigarh-sector-34', 'chandigarh-sector-17', 'mohali', 'panchkula', 'zirakpur'],
    targetStudents: ['class-12', 'dropper'],
    conversionBenefits: [
      'PGIMER cutoff trends 2020-2025',
      'GMCH Chandigarh counselling process explained',
      'State quota vs All India quota strategy',
      'Month-wise preparation timeline',
      'Interview tips for PGIMER',
    ],
    socialProof: '15+ Cerebrum students secured PGIMER/GMCH admission',
  },
  {
    id: 'punjab-medical-colleges-analysis',
    title: 'Punjab Medical Colleges Cutoff & Seat Matrix 2026',
    description:
      'Complete analysis of all Punjab medical colleges including DMC Ludhiana, GMC Patiala, GMC Amritsar. State quota strategy and cutoff predictions.',
    type: 'pdf',
    value: '₹2,499 Report - FREE',
    ctaText: 'Get Punjab Medical Colleges Report',
    downloadText: 'Download Punjab Analysis',
    fileName: 'Punjab_Medical_Colleges_Analysis_2026.pdf',
    targetAreas: ['mohali', 'ludhiana', 'jalandhar', 'amritsar', 'chandigarh', 'panchkula', 'zirakpur'],
    targetStudents: ['class-12', 'dropper'],
    conversionBenefits: [
      'All 8 Punjab medical colleges covered',
      'Category-wise cutoff trends',
      'Punjab state quota eligibility criteria',
      'Fee structure comparison (Govt vs Private)',
      'NRI quota and management seats info',
    ],
    socialProof: 'Helped thousands of Punjab students make college decisions',
  },
  {
    id: 'sector-34-vs-online-comparison',
    title: 'Sector 34 vs Online Coaching: Honest Comparison 2026',
    description:
      'Unbiased comparison of Chandigarh Sector 34 coaching centers (Allen, Aakash, PW) with online alternatives. Includes cost analysis and success rate data.',
    type: 'pdf',
    value: 'Insider Report - FREE',
    ctaText: 'Get Sector 34 Comparison Report',
    downloadText: 'Download Comparison Report',
    fileName: 'Sector_34_vs_Online_Coaching_2026.pdf',
    targetAreas: ['chandigarh', 'chandigarh-sector-34', 'mohali', 'panchkula', 'zirakpur'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Allen vs Aakash vs PW vs Online comparison',
      'Hidden costs revealed (transport, food, PG)',
      'Batch size and faculty qualification analysis',
      'Success rate data with verification',
      'Annual cost savings calculator',
    ],
    socialProof: 'Parents saved Rs 2+ lakhs using this report',
  },
  {
    id: 'chandigarh-neet-mock-test',
    title: 'Free NEET Biology Mock Test - Chandigarh Edition',
    description:
      'Take our comprehensive 45-question mock test designed for Chandigarh Tricity students. Get instant score analysis and improvement suggestions.',
    type: 'assessment',
    value: '₹499 Test - FREE',
    ctaText: 'Take Free Mock Test',
    downloadText: 'Start Mock Test Now',
    targetAreas: ['chandigarh', 'chandigarh-sector-34', 'chandigarh-sector-17', 'mohali', 'panchkula', 'zirakpur'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      '45 NEET-pattern biology questions',
      'Instant score and rank among Tricity students',
      'Chapter-wise performance analysis',
      'Comparison with PGIMER cutoff',
      'Free counselling call with expert',
    ],
    socialProof: 'Taken by 3,000+ Tricity students',
  },
  {
    id: 'punjab-neet-success-strategy',
    title: 'Punjab NEET Success Strategy Guide 2026',
    description:
      'Comprehensive guide for Punjab students covering DMC Ludhiana, GMC Amritsar, GMC Patiala strategies. No need to relocate to Chandigarh or Kota!',
    type: 'pdf',
    value: '₹2,999 Guide - FREE',
    ctaText: 'Get Punjab Strategy Guide',
    downloadText: 'Download Punjab Success Guide',
    fileName: 'Punjab_NEET_Success_Strategy_2026.pdf',
    targetAreas: ['ludhiana', 'jalandhar', 'amritsar', 'mohali'],
    targetStudents: ['class-11', 'class-12', 'dropper'],
    conversionBenefits: [
      'Study from home strategy (no relocation)',
      'Punjab state quota maximization tips',
      'Online coaching vs Chandigarh coaching comparison',
      'Cost savings analysis (Rs 2-3 lakhs saved)',
      'Success stories of Punjab students',
    ],
    socialProof: 'Used by 800+ Punjab students preparing from home',
  },
  {
    id: 'haryana-medical-colleges-guide',
    title: 'Haryana Medical Colleges Guide for Panchkula Students',
    description:
      'Complete guide to Haryana state quota medical colleges for Panchkula residents. PGIMS Rohtak, BPS GMC Khanpur, and private college strategies.',
    type: 'pdf',
    value: '₹1,999 Guide - FREE',
    ctaText: 'Get Haryana Colleges Guide',
    downloadText: 'Download Haryana Guide',
    fileName: 'Haryana_Medical_Colleges_Panchkula_2026.pdf',
    targetAreas: ['panchkula'],
    targetStudents: ['class-12', 'dropper'],
    conversionBenefits: [
      'Haryana domicile eligibility explained',
      'PGIMS Rohtak admission strategy',
      'BPS GMC Khanpur cutoff analysis',
      'Private vs Govt college comparison',
      'Haryana counselling process step-by-step',
    ],
    socialProof: 'Trusted by 300+ Panchkula families',
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
