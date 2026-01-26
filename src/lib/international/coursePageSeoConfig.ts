/**
 * International Course Page SEO Configuration
 * SEO strategy for country-specific course pages at /international/[country]/courses/
 *
 * 10 Target Markets: US, UK, Canada, Australia, Singapore, UAE, Ireland, Hong Kong, New Zealand, South Africa
 *
 * Generated: January 2025
 */

export interface KeywordWithIntent {
  keyword: string
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  monthlyVolume?: string
  difficulty?: 'low' | 'medium' | 'high'
}

export interface CoursePageSEO {
  countryCode: string
  countryName: string
  spellingVariant: 'american' | 'british'
  primaryKeywords: KeywordWithIntent[]
  longTailKeywords: string[]
  metaTitle: string
  metaDescription: string
  h1: string
  examTerminology: ExamSystem[]
  localSearchTerms: {
    tutorTerm: string
    classTerm: string
    preparationTerm: string
  }
  geographicModifiers: string[]
  competitorKeywords: string[]
  seasonalKeywords: string[]
  structuredDataKeywords: string[]
}

export interface ExamSystem {
  name: string
  abbreviation: string
  level: 'secondary' | 'high-school' | 'pre-university' | 'university-entrance'
  keywords: string[]
  popularTopics: string[]
}

export const COURSE_PAGE_SEO_CONFIG: Record<string, CoursePageSEO> = {
  us: {
    countryCode: 'us',
    countryName: 'United States',
    spellingVariant: 'american',
    primaryKeywords: [
      {
        keyword: 'online biology tutor USA',
        intent: 'transactional',
        monthlyVolume: '2,400',
        difficulty: 'medium',
      },
      {
        keyword: 'AP Biology tutor online',
        intent: 'commercial',
        monthlyVolume: '3,600',
        difficulty: 'high',
      },
      {
        keyword: 'MCAT biology prep course',
        intent: 'commercial',
        monthlyVolume: '5,400',
        difficulty: 'high',
      },
      {
        keyword: 'biology tutoring services USA',
        intent: 'transactional',
        monthlyVolume: '1,900',
        difficulty: 'medium',
      },
      {
        keyword: 'pre-med biology classes online',
        intent: 'commercial',
        monthlyVolume: '2,100',
        difficulty: 'medium',
      },
      {
        keyword: 'biology olympiad coaching USA',
        intent: 'commercial',
        monthlyVolume: '720',
        difficulty: 'low',
      },
      {
        keyword: 'IB biology tutor America',
        intent: 'transactional',
        monthlyVolume: '1,300',
        difficulty: 'medium',
      },
    ],
    longTailKeywords: [
      'best online AP biology tutor for high school students',
      'MCAT biology section preparation course online',
      'affordable biology tutoring for college prep USA',
      'one-on-one biology tutor for USABO olympiad',
      'biology classes for pre-med students online',
      'SAT biology subject test preparation tutor',
      'summer biology course for high school students USA',
    ],
    metaTitle: 'Biology Courses USA | AP, MCAT & IB Prep',
    metaDescription:
      'Expert biology courses for AP, MCAT & IB students in USA. Online tutoring with 89% success rate. Flexible scheduling for EST/PST. Start your free trial today.',
    h1: 'Biology Courses for Students in the United States',
    examTerminology: [
      {
        name: 'AP Biology',
        abbreviation: 'AP Bio',
        level: 'high-school',
        keywords: [
          'AP biology exam prep',
          'AP bio tutor',
          'College Board biology',
          'AP biology review course',
        ],
        popularTopics: [
          'Cell Biology',
          'Genetics',
          'Evolution',
          'Ecology',
          'Free Response Questions',
        ],
      },
      {
        name: 'MCAT Biology',
        abbreviation: 'MCAT',
        level: 'university-entrance',
        keywords: [
          'MCAT bio/biochem',
          'MCAT prep course',
          'medical school entrance biology',
          'AAMC practice',
        ],
        popularTopics: [
          'Biochemistry',
          'Cell Biology',
          'Molecular Biology',
          'Organ Systems',
          'Genetics',
        ],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'high-school',
        keywords: ['IB biology HL', 'IB biology SL', 'IB DP biology', 'IB internal assessment'],
        popularTopics: ['HL Topics', 'SL Topics', 'IA Help', 'Extended Essay Biology'],
      },
      {
        name: 'Biology Olympiad',
        abbreviation: 'USABO',
        level: 'high-school',
        keywords: [
          'USABO prep',
          'biology olympiad coaching',
          'USA biology olympiad',
          'competitive biology',
        ],
        popularTopics: [
          'Open Exam Prep',
          'Semifinal Topics',
          'National Competition',
          'Advanced Biology',
        ],
      },
      {
        name: 'ACT Science',
        abbreviation: 'ACT',
        level: 'high-school',
        keywords: [
          'ACT science section',
          'ACT biology questions',
          'ACT science prep',
          'ACT test prep',
        ],
        popularTopics: [
          'Data Interpretation',
          'Research Summaries',
          'Conflicting Viewpoints',
          'Biology Passages',
        ],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'class',
      preparationTerm: 'prep',
    },
    geographicModifiers: [
      'USA',
      'United States',
      'America',
      'online',
      'EST timezone',
      'PST timezone',
    ],
    competitorKeywords: [
      'Khan Academy biology alternative',
      'Varsity Tutors biology',
      'Princeton Review MCAT',
      'Kaplan biology',
    ],
    seasonalKeywords: [
      'summer biology course',
      'AP exam prep spring',
      'MCAT summer intensive',
      'back to school biology',
    ],
    structuredDataKeywords: [
      'biology education',
      'online learning',
      'test preparation',
      'college prep',
      'pre-med',
    ],
  },

  uk: {
    countryCode: 'uk',
    countryName: 'United Kingdom',
    spellingVariant: 'british',
    primaryKeywords: [
      {
        keyword: 'online biology tutor UK',
        intent: 'transactional',
        monthlyVolume: '2,900',
        difficulty: 'medium',
      },
      {
        keyword: 'A-Level biology tutor',
        intent: 'commercial',
        monthlyVolume: '4,400',
        difficulty: 'high',
      },
      {
        keyword: 'GCSE biology tutor online',
        intent: 'commercial',
        monthlyVolume: '3,600',
        difficulty: 'high',
      },
      {
        keyword: 'biology tutoring UK',
        intent: 'transactional',
        monthlyVolume: '2,400',
        difficulty: 'medium',
      },
      {
        keyword: 'BMAT biology preparation',
        intent: 'commercial',
        monthlyVolume: '1,600',
        difficulty: 'medium',
      },
      {
        keyword: 'medical school biology tutor UK',
        intent: 'commercial',
        monthlyVolume: '880',
        difficulty: 'medium',
      },
      {
        keyword: 'IB biology tutor London',
        intent: 'transactional',
        monthlyVolume: '720',
        difficulty: 'medium',
      },
    ],
    longTailKeywords: [
      'best A-Level biology tutor for AQA syllabus',
      'GCSE biology revision tutor online UK',
      'one-to-one biology lessons for medical school',
      'biology tutor for Edexcel specification',
      'OCR A-Level biology tutoring online',
      'BMAT section 2 biology preparation course',
      'British Biology Olympiad coaching UK',
    ],
    metaTitle: 'Biology Courses UK | GCSE, A-Level & BMAT',
    metaDescription:
      'Expert biology courses for GCSE, A-Level & medical school prep in UK. AQA, OCR, Edexcel aligned. Online lessons with qualified tutors. Book your free lesson.',
    h1: 'Biology Courses for Students in the United Kingdom',
    examTerminology: [
      {
        name: 'GCSE Biology',
        abbreviation: 'GCSE',
        level: 'secondary',
        keywords: [
          'GCSE biology tutor',
          'GCSE biology revision',
          'GCSE combined science biology',
          'GCSE triple science',
        ],
        popularTopics: [
          'Cell Biology',
          'Organisation',
          'Infection',
          'Bioenergetics',
          'Homeostasis',
          'Inheritance',
          'Ecology',
        ],
      },
      {
        name: 'A-Level Biology',
        abbreviation: 'A-Level',
        level: 'pre-university',
        keywords: [
          'A-Level biology tutor',
          'A2 biology',
          'AS biology',
          'A-Level biology coursework',
        ],
        popularTopics: [
          'Biological Molecules',
          'Cells',
          'Exchange',
          'Genetics',
          'Energy Transfers',
          'Ecosystems',
        ],
      },
      {
        name: 'BMAT',
        abbreviation: 'BMAT',
        level: 'university-entrance',
        keywords: [
          'BMAT biology',
          'BMAT section 2',
          'BMAT preparation',
          'Cambridge medicine entry',
        ],
        popularTopics: [
          'Section 2 Biology',
          'Scientific Knowledge',
          'Problem Solving',
          'Critical Thinking',
        ],
      },
      {
        name: 'UCAT',
        abbreviation: 'UCAT',
        level: 'university-entrance',
        keywords: [
          'UCAT preparation',
          'UCAT biology knowledge',
          'UK medical school entry',
          'UCAT verbal reasoning',
        ],
        popularTopics: [
          'Verbal Reasoning',
          'Decision Making',
          'Quantitative Reasoning',
          'Abstract Reasoning',
        ],
      },
      {
        name: 'Biology Olympiad',
        abbreviation: 'BBO',
        level: 'high-school',
        keywords: [
          'British Biology Olympiad',
          'BBO preparation',
          'biology olympiad UK',
          'advanced biology competition',
        ],
        popularTopics: [
          'Advanced Cell Biology',
          'Biochemistry',
          'Physiology',
          'Ecology',
          'Evolution',
        ],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'lesson',
      preparationTerm: 'revision',
    },
    geographicModifiers: ['UK', 'United Kingdom', 'Britain', 'London', 'online', 'GMT'],
    competitorKeywords: [
      'MyTutor biology',
      'Tutorful biology',
      'Superprof biology UK',
      'First Tutors biology',
    ],
    seasonalKeywords: [
      'January mock exam prep',
      'summer A-Level revision',
      'September GCSE start',
      'Easter revision course',
    ],
    structuredDataKeywords: [
      'biology education',
      'GCSE tutoring',
      'A-Level teaching',
      'UK curriculum',
      'exam board',
    ],
  },

  ca: {
    countryCode: 'ca',
    countryName: 'Canada',
    spellingVariant: 'american',
    primaryKeywords: [
      {
        keyword: 'online biology tutor Canada',
        intent: 'transactional',
        monthlyVolume: '1,600',
        difficulty: 'medium',
      },
      {
        keyword: 'MCAT biology prep Canada',
        intent: 'commercial',
        monthlyVolume: '2,400',
        difficulty: 'high',
      },
      {
        keyword: 'biology tutor Toronto',
        intent: 'transactional',
        monthlyVolume: '1,300',
        difficulty: 'medium',
      },
      {
        keyword: 'high school biology tutoring Canada',
        intent: 'commercial',
        monthlyVolume: '1,100',
        difficulty: 'medium',
      },
      {
        keyword: 'IB biology tutor Vancouver',
        intent: 'transactional',
        monthlyVolume: '590',
        difficulty: 'low',
      },
      {
        keyword: 'Ontario biology tutor',
        intent: 'commercial',
        monthlyVolume: '720',
        difficulty: 'medium',
      },
      {
        keyword: 'AP biology tutor Canada',
        intent: 'commercial',
        monthlyVolume: '880',
        difficulty: 'medium',
      },
    ],
    longTailKeywords: [
      'best MCAT biology prep course Canada online',
      'Ontario Grade 12 biology SBI4U tutor',
      'BC Biology 12 exam preparation tutor',
      'Alberta biology 30 tutoring online',
      'biology tutor for Canadian medical school prep',
      'IB biology HL tutor Toronto Vancouver',
      'university biology course help Canada',
    ],
    metaTitle: 'Biology Courses Canada | MCAT & Provincial',
    metaDescription:
      'Expert biology courses for Canadian students. MCAT prep, Ontario SBI4U, BC Biology 12, Alberta 30. Online tutoring EST/PST. 91% success rate. Free trial.',
    h1: 'Biology Courses for Students in Canada',
    examTerminology: [
      {
        name: 'Ontario Biology',
        abbreviation: 'SBI3U/SBI4U',
        level: 'high-school',
        keywords: ['Ontario biology', 'SBI4U tutor', 'SBI3U biology', 'Grade 12 biology Ontario'],
        popularTopics: [
          'Biochemistry',
          'Metabolic Processes',
          'Molecular Genetics',
          'Homeostasis',
          'Population Dynamics',
        ],
      },
      {
        name: 'BC Biology',
        abbreviation: 'Bio 12',
        level: 'high-school',
        keywords: [
          'BC Biology 12',
          'British Columbia biology',
          'BC curriculum biology',
          'provincial exam biology',
        ],
        popularTopics: ['Cell Biology', 'Human Physiology', 'Evolution', 'Ecology'],
      },
      {
        name: 'MCAT Biology',
        abbreviation: 'MCAT',
        level: 'university-entrance',
        keywords: [
          'MCAT Canada',
          'Canadian medical school',
          'MCAT prep Canada',
          'AAMC MCAT Canada',
        ],
        popularTopics: [
          'Biological Foundations',
          'Biochemistry',
          'Organ Systems',
          'Critical Analysis',
        ],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'high-school',
        keywords: [
          'IB biology Canada',
          'IB DP biology',
          'IB biology Toronto',
          'IB biology Vancouver',
        ],
        popularTopics: ['HL Extension', 'SL Core', 'Internal Assessment', 'Extended Essay'],
      },
      {
        name: 'AP Biology',
        abbreviation: 'AP',
        level: 'high-school',
        keywords: ['AP biology Canada', 'Advanced Placement biology', 'AP bio prep Canada'],
        popularTopics: ['Unit 1-8 Review', 'Free Response', 'Lab Skills'],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'class',
      preparationTerm: 'prep',
    },
    geographicModifiers: ['Canada', 'Toronto', 'Vancouver', 'Ontario', 'BC', 'Alberta', 'online'],
    competitorKeywords: [
      'Wyzant biology Canada',
      'Varsity Tutors Canada',
      'TutorOcean biology',
      'Prep101 biology',
    ],
    seasonalKeywords: [
      'September back to school',
      'January exam prep',
      'summer MCAT course',
      'provincial exam June',
    ],
    structuredDataKeywords: [
      'Canadian education',
      'provincial curriculum',
      'MCAT preparation',
      'medical school',
      'online tutoring',
    ],
  },

  au: {
    countryCode: 'au',
    countryName: 'Australia',
    spellingVariant: 'british',
    primaryKeywords: [
      {
        keyword: 'online biology tutor Australia',
        intent: 'transactional',
        monthlyVolume: '1,900',
        difficulty: 'medium',
      },
      {
        keyword: 'HSC biology tutor',
        intent: 'commercial',
        monthlyVolume: '2,400',
        difficulty: 'high',
      },
      {
        keyword: 'VCE biology tutor',
        intent: 'commercial',
        monthlyVolume: '1,600',
        difficulty: 'high',
      },
      {
        keyword: 'ATAR biology preparation',
        intent: 'commercial',
        monthlyVolume: '1,300',
        difficulty: 'medium',
      },
      {
        keyword: 'biology tutoring Sydney',
        intent: 'transactional',
        monthlyVolume: '1,100',
        difficulty: 'medium',
      },
      {
        keyword: 'biology tutoring Melbourne',
        intent: 'transactional',
        monthlyVolume: '1,000',
        difficulty: 'medium',
      },
      {
        keyword: 'IB biology tutor Australia',
        intent: 'commercial',
        monthlyVolume: '590',
        difficulty: 'medium',
      },
    ],
    longTailKeywords: [
      'best HSC biology tutor for Band 6 Sydney',
      'VCE biology study score improvement tutor',
      'QCE biology Unit 3 and 4 tutoring',
      'WACE biology ATAR exam preparation',
      'SACE biology Stage 2 tutor Adelaide',
      'Year 12 biology tutoring online Australia',
      'IB biology tutor Melbourne Sydney',
    ],
    metaTitle: 'Biology Courses Australia | HSC, VCE & ATAR',
    metaDescription:
      'Expert biology courses for Australian students. HSC Band 6 prep, VCE study scores, ATAR success. State-aligned curriculum. Online lessons AEST. Book now.',
    h1: 'Biology Courses for Students in Australia',
    examTerminology: [
      {
        name: 'HSC Biology',
        abbreviation: 'HSC',
        level: 'pre-university',
        keywords: ['HSC biology', 'NSW biology', 'HSC biology tutor', 'Band 6 biology'],
        popularTopics: [
          'Heredity',
          'Genetic Change',
          'Infectious Disease',
          'Non-Infectious Disease',
        ],
      },
      {
        name: 'VCE Biology',
        abbreviation: 'VCE',
        level: 'pre-university',
        keywords: ['VCE biology', 'Victoria biology', 'VCE study score', 'Unit 3/4 biology'],
        popularTopics: [
          'Cellular Processes',
          'Inheritance',
          'Regulation of Gene Expression',
          'Continuity of Life',
        ],
      },
      {
        name: 'QCE Biology',
        abbreviation: 'QCE',
        level: 'pre-university',
        keywords: ['QCE biology', 'Queensland biology', 'QCE Unit 3 4', 'ATAR biology QLD'],
        popularTopics: ['Biodiversity and Ecosystems', 'Cell Biology', 'Heredity', 'Evolution'],
      },
      {
        name: 'WACE Biology',
        abbreviation: 'WACE',
        level: 'pre-university',
        keywords: ['WACE biology', 'WA biology', 'Western Australia biology', 'ATAR biology WA'],
        popularTopics: ['Science Inquiry', 'Ecosystems', 'Heredity', 'Human Biology'],
      },
      {
        name: 'SACE Biology',
        abbreviation: 'SACE',
        level: 'pre-university',
        keywords: ['SACE biology', 'South Australia biology', 'Stage 2 biology', 'ATAR biology SA'],
        popularTopics: ['DNA and Proteins', 'Cells', 'Homeostasis', 'Evolution'],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'pre-university',
        keywords: [
          'IB biology Australia',
          'IB DP biology',
          'IB biology Sydney',
          'IB biology Melbourne',
        ],
        popularTopics: ['HL Topics', 'SL Topics', 'Internal Assessment', 'Extended Essay'],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'lesson',
      preparationTerm: 'preparation',
    },
    geographicModifiers: [
      'Australia',
      'Sydney',
      'Melbourne',
      'Brisbane',
      'Perth',
      'Adelaide',
      'online',
      'AEST',
    ],
    competitorKeywords: [
      'Cluey Learning biology',
      'Tutoring for Excellence',
      'Matrix Education biology',
      'Art of Smart biology',
    ],
    seasonalKeywords: [
      'Term 1 biology prep',
      'trial HSC preparation',
      'VCE November exam',
      'summer holiday tutoring',
    ],
    structuredDataKeywords: [
      'Australian curriculum',
      'ATAR preparation',
      'state education',
      'Year 12',
      'tertiary entrance',
    ],
  },

  sg: {
    countryCode: 'sg',
    countryName: 'Singapore',
    spellingVariant: 'british',
    primaryKeywords: [
      {
        keyword: 'online biology tutor Singapore',
        intent: 'transactional',
        monthlyVolume: '1,300',
        difficulty: 'medium',
      },
      {
        keyword: 'A-Level biology tutor Singapore',
        intent: 'commercial',
        monthlyVolume: '1,600',
        difficulty: 'high',
      },
      {
        keyword: 'O-Level biology tutor',
        intent: 'commercial',
        monthlyVolume: '1,900',
        difficulty: 'high',
      },
      {
        keyword: 'H2 biology tuition Singapore',
        intent: 'commercial',
        monthlyVolume: '1,100',
        difficulty: 'high',
      },
      {
        keyword: 'biology tuition centre Singapore',
        intent: 'transactional',
        monthlyVolume: '880',
        difficulty: 'medium',
      },
      {
        keyword: 'IP biology tutor',
        intent: 'commercial',
        monthlyVolume: '720',
        difficulty: 'medium',
      },
      {
        keyword: 'IB biology tutor Singapore',
        intent: 'commercial',
        monthlyVolume: '590',
        difficulty: 'medium',
      },
    ],
    longTailKeywords: [
      'best H2 biology tuition for A-Level Singapore',
      'O-Level combined science biology tutor',
      'biology olympiad coaching Singapore SBO',
      'integrated programme biology tuition',
      'JC biology tutor for H1 H2',
      'private biology tuition Singapore online',
      'secondary school biology tutor Singapore',
    ],
    metaTitle: 'Biology Courses Singapore | O/A-Level & H2',
    metaDescription:
      'Expert biology tuition for Singapore students. O-Level, A-Level H1/H2, IP & IB programmes. SEAB syllabus aligned. 92% success rate. Book trial lesson.',
    h1: 'Biology Courses for Students in Singapore',
    examTerminology: [
      {
        name: 'GCE O-Level Biology',
        abbreviation: 'O-Level',
        level: 'secondary',
        keywords: [
          'O-Level biology',
          'Sec 4 biology',
          'combined science biology',
          'pure biology O-Level',
        ],
        popularTopics: [
          'Cell Structure',
          'Movement of Substances',
          'Nutrition',
          'Transport',
          'Respiration',
          'Reproduction',
        ],
      },
      {
        name: 'GCE A-Level Biology',
        abbreviation: 'A-Level H1/H2',
        level: 'pre-university',
        keywords: [
          'A-Level biology Singapore',
          'H2 biology',
          'H1 biology',
          'JC biology',
          'H3 biology',
        ],
        popularTopics: [
          'Cell Biology',
          'Molecular Genetics',
          'Cell Division',
          'Evolution',
          'Ecology',
        ],
      },
      {
        name: 'IP Biology',
        abbreviation: 'IP',
        level: 'secondary',
        keywords: [
          'integrated programme biology',
          'IP biology tuition',
          'IP school biology',
          'through-train biology',
        ],
        popularTopics: [
          'Advanced Cell Biology',
          'Genetics',
          'Research Skills',
          'Independent Study',
        ],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'pre-university',
        keywords: [
          'IB biology Singapore',
          'IB DP biology',
          'international school biology',
          'IB biology HL',
        ],
        popularTopics: ['HL Extension', 'SL Core', 'IA', 'Extended Essay'],
      },
      {
        name: 'Biology Olympiad',
        abbreviation: 'SBO',
        level: 'high-school',
        keywords: [
          'Singapore Biology Olympiad',
          'SBO preparation',
          'IBO Singapore',
          'biology competition',
        ],
        popularTopics: ['Biochemistry', 'Cell Biology', 'Genetics', 'Ecology', 'Physiology'],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'lesson',
      preparationTerm: 'tuition',
    },
    geographicModifiers: ['Singapore', 'SG', 'online', 'SGT', 'central', 'east', 'west'],
    competitorKeywords: [
      'The Science Academy biology',
      'Learners Lodge biology',
      'Ace JC Tuition biology',
      'Focus Chemistry biology',
    ],
    seasonalKeywords: [
      'prelim exam prep',
      'June holiday intensive',
      'November A-Level prep',
      'March holiday revision',
    ],
    structuredDataKeywords: [
      'Singapore education',
      'SEAB syllabus',
      'MOE curriculum',
      'tuition centre',
      'JC',
    ],
  },

  ae: {
    countryCode: 'ae',
    countryName: 'United Arab Emirates',
    spellingVariant: 'british',
    primaryKeywords: [
      {
        keyword: 'online biology tutor UAE',
        intent: 'transactional',
        monthlyVolume: '880',
        difficulty: 'medium',
      },
      {
        keyword: 'IGCSE biology tutor Dubai',
        intent: 'commercial',
        monthlyVolume: '1,300',
        difficulty: 'medium',
      },
      {
        keyword: 'A-Level biology tutor UAE',
        intent: 'commercial',
        monthlyVolume: '720',
        difficulty: 'medium',
      },
      {
        keyword: 'biology tutoring Dubai',
        intent: 'transactional',
        monthlyVolume: '1,100',
        difficulty: 'medium',
      },
      {
        keyword: 'IB biology tutor Abu Dhabi',
        intent: 'commercial',
        monthlyVolume: '480',
        difficulty: 'low',
      },
      {
        keyword: 'CBSE biology tutor UAE',
        intent: 'commercial',
        monthlyVolume: '590',
        difficulty: 'medium',
      },
      {
        keyword: 'AP biology tutor Dubai',
        intent: 'commercial',
        monthlyVolume: '390',
        difficulty: 'low',
      },
    ],
    longTailKeywords: [
      'best IGCSE biology tutor for CIE syllabus Dubai',
      'A-Level biology preparation UAE online',
      'IB biology HL tutor Abu Dhabi Sharjah',
      'American curriculum biology tutor Dubai',
      'CBSE Class 12 biology tutor UAE online',
      'biology tutor for Indian curriculum UAE',
      'weekend biology classes Dubai Abu Dhabi',
    ],
    metaTitle: 'Biology Courses UAE | IGCSE, A-Level & IB',
    metaDescription:
      'Expert biology courses in UAE. IGCSE, A-Level, IB, CBSE & American curriculum. Dubai & Abu Dhabi online classes. KHDA approved. Book your trial today.',
    h1: 'Biology Courses for Students in the UAE',
    examTerminology: [
      {
        name: 'IGCSE Biology',
        abbreviation: 'IGCSE',
        level: 'secondary',
        keywords: [
          'IGCSE biology UAE',
          'Cambridge IGCSE biology',
          'CIE biology',
          'Edexcel IGCSE biology',
        ],
        popularTopics: [
          'Characteristics of Living Organisms',
          'Cells',
          'Enzymes',
          'Nutrition',
          'Transport',
          'Respiration',
        ],
      },
      {
        name: 'A-Level Biology',
        abbreviation: 'A-Level',
        level: 'pre-university',
        keywords: [
          'A-Level biology Dubai',
          'Cambridge A-Level biology',
          'AS biology UAE',
          'A2 biology',
        ],
        popularTopics: [
          'Cell Structure',
          'Biological Molecules',
          'Transport',
          'Genetics',
          'Ecology',
        ],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'pre-university',
        keywords: [
          'IB biology UAE',
          'IB DP biology Dubai',
          'IB biology HL SL',
          'IB school biology',
        ],
        popularTopics: ['Core Topics', 'HL Extension', 'Internal Assessment', 'Extended Essay'],
      },
      {
        name: 'CBSE Biology',
        abbreviation: 'CBSE',
        level: 'high-school',
        keywords: [
          'CBSE biology UAE',
          'Class 11 12 biology',
          'Indian school biology UAE',
          'NCERT biology',
        ],
        popularTopics: [
          'Diversity in Living World',
          'Structural Organisation',
          'Cell Biology',
          'Plant/Human Physiology',
        ],
      },
      {
        name: 'American Curriculum',
        abbreviation: 'AP/SAT',
        level: 'high-school',
        keywords: [
          'American school biology UAE',
          'AP biology Dubai',
          'US curriculum biology',
          'honors biology',
        ],
        popularTopics: ['AP Biology Topics', 'SAT Biology', 'Honors Course'],
      },
      {
        name: 'MCAT Biology',
        abbreviation: 'MCAT',
        level: 'university-entrance',
        keywords: ['MCAT prep UAE', 'MCAT Dubai', 'medical school prep UAE'],
        popularTopics: ['Bio/Biochem Section', 'CARS', 'Practice Tests'],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'class',
      preparationTerm: 'preparation',
    },
    geographicModifiers: ['UAE', 'Dubai', 'Abu Dhabi', 'Sharjah', 'online', 'GST'],
    competitorKeywords: [
      'Tutorpedia biology',
      'Tutoring Club Dubai',
      'Kip McGrath UAE',
      'Emirates Tutor biology',
    ],
    seasonalKeywords: [
      'Ramadan flexible schedule',
      'summer intensive course',
      'October half-term prep',
      'mock exam preparation',
    ],
    structuredDataKeywords: [
      'UAE education',
      'international curriculum',
      'Dubai schools',
      'KHDA',
      'expat education',
    ],
  },

  ie: {
    countryCode: 'ie',
    countryName: 'Ireland',
    spellingVariant: 'british',
    primaryKeywords: [
      {
        keyword: 'biology grinds Ireland',
        intent: 'transactional',
        monthlyVolume: '1,300',
        difficulty: 'medium',
      },
      {
        keyword: 'Leaving Cert biology tutor',
        intent: 'commercial',
        monthlyVolume: '1,900',
        difficulty: 'high',
      },
      {
        keyword: 'online biology grinds',
        intent: 'transactional',
        monthlyVolume: '880',
        difficulty: 'medium',
      },
      {
        keyword: 'LC biology tutor Dublin',
        intent: 'commercial',
        monthlyVolume: '720',
        difficulty: 'medium',
      },
      {
        keyword: 'Junior Cycle science tutor',
        intent: 'commercial',
        monthlyVolume: '590',
        difficulty: 'medium',
      },
      {
        keyword: 'HPAT biology preparation',
        intent: 'commercial',
        monthlyVolume: '480',
        difficulty: 'medium',
      },
      {
        keyword: 'biology teacher Ireland',
        intent: 'transactional',
        monthlyVolume: '390',
        difficulty: 'low',
      },
    ],
    longTailKeywords: [
      'best Leaving Cert biology grinds for H1',
      'online biology grinds Higher Level Ireland',
      'biology grinds teacher Dublin Cork Galway',
      'Junior Cycle science grinds online',
      'HPAT section 3 biology preparation',
      'CAO points biology preparation Ireland',
      'Leaving Cert biology exam preparation intensive',
    ],
    metaTitle: 'Biology Grinds Ireland | Leaving Cert & JC',
    metaDescription:
      'Expert biology grinds in Ireland. Leaving Cert Higher Level, Junior Cycle & HPAT prep. SEC syllabus aligned. H1 specialists. Book your free grind today.',
    h1: 'Biology Courses for Students in Ireland',
    examTerminology: [
      {
        name: 'Leaving Certificate Biology',
        abbreviation: 'LC',
        level: 'pre-university',
        keywords: [
          'Leaving Cert biology',
          'LC biology',
          'Higher Level biology',
          'Ordinary Level biology',
        ],
        popularTopics: [
          'Cell Biology',
          'Genetics',
          'Ecology',
          'Human Biology',
          'Experiments',
          'Coursework',
        ],
      },
      {
        name: 'Junior Cycle Science',
        abbreviation: 'JC',
        level: 'secondary',
        keywords: [
          'Junior Cycle science',
          'Junior Cert biology',
          'JC science',
          'first year science',
        ],
        popularTopics: ['Biological World', 'Physical World', 'Chemical World', 'Earth and Space'],
      },
      {
        name: 'HPAT',
        abbreviation: 'HPAT',
        level: 'university-entrance',
        keywords: [
          'HPAT Ireland',
          'HPAT preparation',
          'medical school entry Ireland',
          'HPAT section 3',
        ],
        popularTopics: ['Logical Reasoning', 'Interpersonal Understanding', 'Non-verbal Reasoning'],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'pre-university',
        keywords: [
          'IB biology Ireland',
          'IB DP biology Dublin',
          'international school biology',
          'IB biology HL',
        ],
        popularTopics: ['Core Topics', 'HL Extension', 'IA', 'EE'],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'grinds teacher',
      classTerm: 'grinds',
      preparationTerm: 'preparation',
    },
    geographicModifiers: ['Ireland', 'Dublin', 'Cork', 'Galway', 'Limerick', 'online', 'IST'],
    competitorKeywords: [
      'Grind School biology',
      'The Institute of Education',
      'Ashfield College biology',
      'Bruce College biology',
    ],
    seasonalKeywords: [
      'mock exam preparation January',
      'Easter revision course',
      'pre-exam June intensive',
      'September back to school',
    ],
    structuredDataKeywords: [
      'Irish education',
      'SEC syllabus',
      'CAO points',
      'Leaving Certificate',
      'grinds',
    ],
  },

  hk: {
    countryCode: 'hk',
    countryName: 'Hong Kong',
    spellingVariant: 'british',
    primaryKeywords: [
      {
        keyword: 'online biology tutor Hong Kong',
        intent: 'transactional',
        monthlyVolume: '880',
        difficulty: 'medium',
      },
      {
        keyword: 'HKDSE biology tutor',
        intent: 'commercial',
        monthlyVolume: '1,600',
        difficulty: 'high',
      },
      {
        keyword: 'biology tutor HK',
        intent: 'transactional',
        monthlyVolume: '1,300',
        difficulty: 'medium',
      },
      {
        keyword: 'IGCSE biology tutor Hong Kong',
        intent: 'commercial',
        monthlyVolume: '720',
        difficulty: 'medium',
      },
      {
        keyword: 'A-Level biology tutor HK',
        intent: 'commercial',
        monthlyVolume: '590',
        difficulty: 'medium',
      },
      {
        keyword: 'IB biology tutor Hong Kong',
        intent: 'commercial',
        monthlyVolume: '480',
        difficulty: 'medium',
      },
      {
        keyword: 'DSE bio tutor',
        intent: 'commercial',
        monthlyVolume: '1,100',
        difficulty: 'high',
      },
    ],
    longTailKeywords: [
      'best HKDSE biology tutor for 5** Hong Kong',
      'IGCSE biology private tutor HK online',
      'GCE A-Level biology tuition Hong Kong',
      'IB biology HL tutor international school HK',
      'AP biology tutor Hong Kong online',
      'biology olympiad preparation Hong Kong',
      'Form 4-6 biology tutor DSE preparation',
    ],
    metaTitle: 'Biology Courses Hong Kong | DSE & IGCSE',
    metaDescription:
      'Expert biology courses in Hong Kong. HKDSE 5**, IGCSE, A-Level & IB prep. HKEAA syllabus aligned. Online & in-person. Book your trial lesson today.',
    h1: 'Biology Courses for Students in Hong Kong',
    examTerminology: [
      {
        name: 'HKDSE Biology',
        abbreviation: 'DSE',
        level: 'pre-university',
        keywords: ['HKDSE biology', 'DSE bio', 'DSE biology 5**', 'Form 6 biology'],
        popularTopics: [
          'Cells and Molecules of Life',
          'Genetics',
          'Organisms and Environment',
          'Health and Diseases',
        ],
      },
      {
        name: 'IGCSE Biology',
        abbreviation: 'IGCSE',
        level: 'secondary',
        keywords: [
          'IGCSE biology Hong Kong',
          'Cambridge IGCSE bio',
          'international school IGCSE',
          'CIE biology',
        ],
        popularTopics: [
          'Characteristics of Life',
          'Cells',
          'Enzymes',
          'Nutrition',
          'Transport',
          'Respiration',
        ],
      },
      {
        name: 'GCE A-Level Biology',
        abbreviation: 'A-Level',
        level: 'pre-university',
        keywords: [
          'A-Level biology HK',
          'GCE biology',
          'Cambridge A-Level bio',
          'international school A-Level',
        ],
        popularTopics: [
          'Biological Molecules',
          'Cells',
          'Organisms',
          'Genetics',
          'Control Systems',
        ],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'pre-university',
        keywords: [
          'IB biology Hong Kong',
          'IB DP biology',
          'IB biology HL SL',
          'international school IB',
        ],
        popularTopics: ['Core Topics', 'HL Extension', 'IA', 'EE'],
      },
      {
        name: 'AP Biology',
        abbreviation: 'AP',
        level: 'high-school',
        keywords: [
          'AP biology Hong Kong',
          'American school biology HK',
          'AP bio tutor',
          'College Board AP',
        ],
        popularTopics: ['AP Units 1-8', 'Free Response', 'Lab Skills'],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'lesson',
      preparationTerm: 'preparation',
    },
    geographicModifiers: ['Hong Kong', 'HK', 'Kowloon', 'Central', 'online', 'HKT'],
    competitorKeywords: [
      'Beacon College biology',
      'Modern Education biology',
      "King's Glory biology",
      'DSE tutor HK',
    ],
    seasonalKeywords: [
      'DSE April preparation',
      'mock exam March prep',
      'summer intensive course',
      'September Form 6 start',
    ],
    structuredDataKeywords: [
      'Hong Kong education',
      'HKEAA',
      'DSE examination',
      'international curriculum',
      'tuition',
    ],
  },

  nz: {
    countryCode: 'nz',
    countryName: 'New Zealand',
    spellingVariant: 'british',
    primaryKeywords: [
      {
        keyword: 'online biology tutor New Zealand',
        intent: 'transactional',
        monthlyVolume: '590',
        difficulty: 'low',
      },
      {
        keyword: 'NCEA biology tutor',
        intent: 'commercial',
        monthlyVolume: '880',
        difficulty: 'medium',
      },
      {
        keyword: 'biology tutor Auckland',
        intent: 'transactional',
        monthlyVolume: '720',
        difficulty: 'medium',
      },
      {
        keyword: 'Level 3 biology tutor NZ',
        intent: 'commercial',
        monthlyVolume: '480',
        difficulty: 'medium',
      },
      {
        keyword: 'biology tutoring Wellington',
        intent: 'transactional',
        monthlyVolume: '390',
        difficulty: 'low',
      },
      {
        keyword: 'IB biology tutor New Zealand',
        intent: 'commercial',
        monthlyVolume: '320',
        difficulty: 'low',
      },
      {
        keyword: 'scholarship biology tutor NZ',
        intent: 'commercial',
        monthlyVolume: '260',
        difficulty: 'low',
      },
    ],
    longTailKeywords: [
      'best NCEA Level 3 biology tutor for Excellence',
      'online biology tutor for NCEA internals',
      'scholarship biology preparation New Zealand',
      'Year 13 biology tutor Auckland Wellington',
      'Cambridge biology tutor New Zealand online',
      'IB biology HL tutor NZ international school',
      'NCEA biology external exam preparation',
    ],
    metaTitle: 'Biology Courses NZ | NCEA Level 1-3',
    metaDescription:
      'Expert biology courses in New Zealand. NCEA Level 1-3 Excellence, Scholarship & IB prep. NZQA aligned curriculum. Online tutoring NZST. Book trial today.',
    h1: 'Biology Courses for Students in New Zealand',
    examTerminology: [
      {
        name: 'NCEA Level 1 Biology',
        abbreviation: 'L1',
        level: 'secondary',
        keywords: ['NCEA Level 1 biology', 'Year 11 biology NZ', 'L1 biology internals'],
        popularTopics: ['Life Processes', 'Diversity of Life', 'Ecology', 'Genetics Introduction'],
      },
      {
        name: 'NCEA Level 2 Biology',
        abbreviation: 'L2',
        level: 'high-school',
        keywords: ['NCEA Level 2 biology', 'Year 12 biology NZ', 'L2 biology externals'],
        popularTopics: ['Cell Biology', 'Gene Expression', 'Adaptation', 'Ecological Communities'],
      },
      {
        name: 'NCEA Level 3 Biology',
        abbreviation: 'L3',
        level: 'pre-university',
        keywords: [
          'NCEA Level 3 biology',
          'Year 13 biology NZ',
          'UE biology',
          'L3 biology externals',
        ],
        popularTopics: [
          'Homeostasis',
          'Evolution',
          'Human Evolution',
          'Speciation',
          'Socio-scientific Issues',
        ],
      },
      {
        name: 'Scholarship Biology',
        abbreviation: 'Scholarship',
        level: 'pre-university',
        keywords: [
          'scholarship biology NZ',
          'biology scholarship exam',
          'NCEA scholarship biology',
          'outstanding scholarship',
        ],
        popularTopics: [
          'Complex Biological Concepts',
          'Critical Analysis',
          'Extended Response',
          'Research Skills',
        ],
      },
      {
        name: 'Cambridge Biology',
        abbreviation: 'CIE',
        level: 'pre-university',
        keywords: [
          'Cambridge biology NZ',
          'CIE biology New Zealand',
          'IGCSE biology NZ',
          'A-Level biology NZ',
        ],
        popularTopics: ['IGCSE Topics', 'AS Level', 'A2 Level'],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'pre-university',
        keywords: [
          'IB biology New Zealand',
          'IB DP biology NZ',
          'international school biology',
          'IB biology Auckland',
        ],
        popularTopics: ['Core Topics', 'HL Extension', 'IA', 'EE'],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'lesson',
      preparationTerm: 'preparation',
    },
    geographicModifiers: [
      'New Zealand',
      'NZ',
      'Auckland',
      'Wellington',
      'Christchurch',
      'online',
      'NZST',
    ],
    competitorKeywords: [
      'Cluey Learning NZ',
      'MyTutor NZ',
      'Crimson Education biology',
      'StudyTime biology',
    ],
    seasonalKeywords: [
      'NCEA external exam November',
      'scholarship exam prep',
      'Term 1 biology start',
      'mock exam preparation',
    ],
    structuredDataKeywords: [
      'New Zealand education',
      'NZQA',
      'NCEA standards',
      'university entrance',
      'credits',
    ],
  },

  za: {
    countryCode: 'za',
    countryName: 'South Africa',
    spellingVariant: 'british',
    primaryKeywords: [
      {
        keyword: 'online biology tutor South Africa',
        intent: 'transactional',
        monthlyVolume: '720',
        difficulty: 'low',
      },
      {
        keyword: 'Life Sciences tutor',
        intent: 'commercial',
        monthlyVolume: '1,600',
        difficulty: 'medium',
      },
      {
        keyword: 'Matric biology tutor',
        intent: 'commercial',
        monthlyVolume: '1,300',
        difficulty: 'medium',
      },
      {
        keyword: 'NSC Life Sciences tutoring',
        intent: 'commercial',
        monthlyVolume: '590',
        difficulty: 'medium',
      },
      {
        keyword: 'biology tutor Johannesburg',
        intent: 'transactional',
        monthlyVolume: '480',
        difficulty: 'low',
      },
      {
        keyword: 'IEB biology tutor',
        intent: 'commercial',
        monthlyVolume: '390',
        difficulty: 'low',
      },
      {
        keyword: 'Cambridge biology tutor South Africa',
        intent: 'commercial',
        monthlyVolume: '320',
        difficulty: 'low',
      },
    ],
    longTailKeywords: [
      'best Matric Life Sciences tutor for distinction',
      'online NSC biology tutoring South Africa',
      'IEB Life Sciences exam preparation tutor',
      'Cambridge AS/A-Level biology tutor SA',
      'Grade 12 Life Sciences tutoring online',
      'biology tutor for NBT preparation',
      'IB biology tutor Johannesburg Cape Town',
    ],
    metaTitle: 'Biology Courses South Africa | Matric & IEB',
    metaDescription:
      'Expert Life Sciences courses in South Africa. Matric NSC, IEB & Cambridge prep. CAPS aligned curriculum. Online tutoring SAST. Book your free trial today.',
    h1: 'Biology Courses for Students in South Africa',
    examTerminology: [
      {
        name: 'NSC Life Sciences',
        abbreviation: 'NSC',
        level: 'pre-university',
        keywords: [
          'NSC Life Sciences',
          'Matric biology',
          'Grade 12 Life Sciences',
          'CAPS Life Sciences',
        ],
        popularTopics: [
          'Meiosis',
          'Reproduction',
          'Genetics',
          'Evolution',
          'Human Impact',
          'Homeostasis',
        ],
      },
      {
        name: 'IEB Life Sciences',
        abbreviation: 'IEB',
        level: 'pre-university',
        keywords: [
          'IEB Life Sciences',
          'IEB biology',
          'IEB Matric biology',
          'private school biology SA',
        ],
        popularTopics: [
          'Diversity',
          'Life at Molecular Level',
          'Life Processes',
          'Environmental Studies',
        ],
      },
      {
        name: 'Cambridge Biology',
        abbreviation: 'CIE',
        level: 'pre-university',
        keywords: [
          'Cambridge biology South Africa',
          'IGCSE biology SA',
          'AS Level biology SA',
          'A-Level biology SA',
        ],
        popularTopics: ['IGCSE Topics', 'AS Level', 'A2 Level'],
      },
      {
        name: 'IB Biology',
        abbreviation: 'IB',
        level: 'pre-university',
        keywords: [
          'IB biology South Africa',
          'IB DP biology SA',
          'international school biology SA',
          'IB biology Johannesburg',
        ],
        popularTopics: ['Core Topics', 'HL Extension', 'IA', 'EE'],
      },
    ],
    localSearchTerms: {
      tutorTerm: 'tutor',
      classTerm: 'lesson',
      preparationTerm: 'preparation',
    },
    geographicModifiers: [
      'South Africa',
      'SA',
      'Johannesburg',
      'Cape Town',
      'Pretoria',
      'Durban',
      'online',
      'SAST',
    ],
    competitorKeywords: [
      'Advantage Learn Life Sciences',
      'Radmaste biology',
      'Via Afrika Life Sciences',
      'Mindset Learn biology',
    ],
    seasonalKeywords: [
      'Matric final exam October',
      'prelim exam preparation',
      'June exam prep',
      'January new year start',
    ],
    structuredDataKeywords: [
      'South African education',
      'CAPS curriculum',
      'DBE syllabus',
      'Matric',
      'National Senior Certificate',
    ],
  },
}

/**
 * Generate complete meta tags for a course page
 */
export function generateCoursePageMeta(countryCode: string): {
  title: string
  description: string
  keywords: string[]
  openGraph: {
    title: string
    description: string
    locale: string
  }
} | null {
  const config = COURSE_PAGE_SEO_CONFIG[countryCode.toLowerCase()]
  if (!config) return null

  const allKeywords = [
    ...config.primaryKeywords.map((k) => k.keyword),
    ...config.longTailKeywords.slice(0, 5),
    ...config.examTerminology.flatMap((e) => e.keywords.slice(0, 2)),
  ]

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: allKeywords,
    openGraph: {
      title: `${config.metaTitle} | Cerebrum Biology Academy`,
      description: config.metaDescription,
      locale: config.spellingVariant === 'american' ? 'en_US' : 'en_GB',
    },
  }
}

/**
 * Get exam-specific keywords for a country
 */
export function getExamKeywords(countryCode: string, examAbbreviation: string): string[] {
  const config = COURSE_PAGE_SEO_CONFIG[countryCode.toLowerCase()]
  if (!config) return []

  const exam = config.examTerminology.find(
    (e) => e.abbreviation.toLowerCase() === examAbbreviation.toLowerCase()
  )
  return exam ? exam.keywords : []
}

/**
 * Get all primary keywords for a country with search intent
 */
export function getPrimaryKeywordsByIntent(
  countryCode: string,
  intent: KeywordWithIntent['intent']
): KeywordWithIntent[] {
  const config = COURSE_PAGE_SEO_CONFIG[countryCode.toLowerCase()]
  if (!config) return []

  return config.primaryKeywords.filter((k) => k.intent === intent)
}

/**
 * Generate structured data for course page
 */
export function generateCourseStructuredData(countryCode: string): object | null {
  const config = COURSE_PAGE_SEO_CONFIG[countryCode.toLowerCase()]
  if (!config) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `Biology Courses - ${config.countryName}`,
    description: config.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: config.examTerminology.map((e) => e.name),
    teaches: config.structuredDataKeywords,
    inLanguage: 'en',
    availableLanguage: ['English'],
    courseMode: ['online', 'blended'],
    hasCourseInstance: config.examTerminology.map((exam) => ({
      '@type': 'CourseInstance',
      name: `${exam.name} Preparation`,
      courseMode: 'online',
      courseWorkload: 'PT2H',
    })),
  }
}

/**
 * Get local search terms for natural language integration
 */
export function getLocalSearchTerms(countryCode: string): {
  tutorTerm: string
  classTerm: string
  preparationTerm: string
} | null {
  const config = COURSE_PAGE_SEO_CONFIG[countryCode.toLowerCase()]
  return config ? config.localSearchTerms : null
}

/**
 * Get all supported country codes
 */
export function getSupportedCountryCodes(): string[] {
  return Object.keys(COURSE_PAGE_SEO_CONFIG)
}

/**
 * Check if a country code is valid
 */
export function isValidCountryCode(code: string): boolean {
  return code.toLowerCase() in COURSE_PAGE_SEO_CONFIG
}
