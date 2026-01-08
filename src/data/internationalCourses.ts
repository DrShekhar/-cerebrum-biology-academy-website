// International Biology Coaching Course Catalog
// Comprehensive course offerings for 10 international markets

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface InternationalCourse {
  id: string
  name: string
  examSystem: string
  duration: string
  level: CourseLevel
  targetAudience: string
  features: string[]
  priceUSD: number
  originalPriceUSD: number
  badge?: 'popular' | 'recommended' | 'premium' | 'best_value'
  successRate?: number
}

export interface CountryCourseCatalog {
  countryCode: string
  countryName: string
  flag: string
  currency: string
  currencySymbol: string
  exchangeRate: number
  timezone: string
  examBoards: string[]
  courses: InternationalCourse[]
  popularExams: string[]
  academicCalendar: {
    schoolYearStart: string
    schoolYearEnd: string
    examSeason: string
  }
}

export const internationalCourseCatalog: Record<string, CountryCourseCatalog> = {
  // ==========================================
  // UNITED STATES
  // ==========================================
  us: {
    countryCode: 'us',
    countryName: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    currencySymbol: '$',
    exchangeRate: 1,
    timezone: 'EST/PST (GMT-5 to GMT-8)',
    examBoards: ['College Board', 'ACT', 'IB', 'USABO'],
    popularExams: ['AP Biology', 'SAT Biology', 'MCAT', 'ACT Science', 'USABO'],
    academicCalendar: {
      schoolYearStart: 'August/September',
      schoolYearEnd: 'May/June',
      examSeason: 'May (AP), Year-round (SAT/ACT), January-April (MCAT)',
    },
    courses: [
      {
        id: 'us-ap-biology-mastery',
        name: 'AP Biology Mastery Program',
        examSystem: 'AP Biology',
        duration: '9 months',
        level: 'Advanced',
        targetAudience: 'High school juniors and seniors taking AP Biology for college credit',
        features: [
          'Complete College Board AP Biology curriculum coverage',
          'Lab investigation skills and experimental design',
          'Free Response Question (FRQ) intensive training',
          'Multiple choice strategy and time management',
          'Practice with released AP exam questions',
        ],
        priceUSD: 1499,
        originalPriceUSD: 1799,
        badge: 'popular',
        successRate: 94,
      },
      {
        id: 'us-sat-biology-prep',
        name: 'SAT Biology Subject Test Prep',
        examSystem: 'SAT Biology E/M',
        duration: '4 months',
        level: 'Intermediate',
        targetAudience: 'High school students preparing for SAT Biology Subject Test',
        features: [
          'Ecological Biology (E) and Molecular Biology (M) tracks',
          'Comprehensive content review aligned with College Board',
          'Full-length practice tests with detailed analysis',
          'Strategic test-taking techniques',
          'Score improvement guarantee methodology',
        ],
        priceUSD: 899,
        originalPriceUSD: 1099,
        badge: 'best_value',
        successRate: 91,
      },
      {
        id: 'us-mcat-biology-intensive',
        name: 'MCAT Biology & Biochemistry Intensive',
        examSystem: 'MCAT',
        duration: '6 months',
        level: 'Advanced',
        targetAudience: 'Pre-med students preparing for MCAT Biological Sciences section',
        features: [
          'AAMC MCAT content outline comprehensive coverage',
          'Biochemistry integration with biological systems',
          'Passage-based reasoning and critical analysis',
          'High-yield topics for Biological and Biochemical Foundations',
          'Full-length MCAT practice with CARS integration',
        ],
        priceUSD: 2499,
        originalPriceUSD: 2999,
        badge: 'premium',
        successRate: 96,
      },
      {
        id: 'us-act-science-boost',
        name: 'ACT Science Section Booster',
        examSystem: 'ACT Science',
        duration: '3 months',
        level: 'Intermediate',
        targetAudience: 'High school students targeting 30+ on ACT Science section',
        features: [
          'Data representation and research summary analysis',
          'Conflicting viewpoints passage strategies',
          'Scientific reasoning and interpretation skills',
          'Time management for 40 questions in 35 minutes',
          'Integration with Biology concepts tested on ACT',
        ],
        priceUSD: 699,
        originalPriceUSD: 849,
        successRate: 89,
      },
      {
        id: 'us-ib-biology-complete',
        name: 'IB Biology HL/SL Complete',
        examSystem: 'IB Biology',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'IB Diploma students taking Biology at Higher or Standard Level',
        features: [
          'Complete IB Biology syllabus (SL and HL topics)',
          'Internal Assessment (IA) guidance and support',
          'Extended Essay mentorship for Biology',
          'Paper 1, 2, and 3 exam preparation',
          'Data-based questions and practical skills',
        ],
        priceUSD: 1799,
        originalPriceUSD: 2199,
        badge: 'recommended',
        successRate: 93,
      },
      {
        id: 'us-usabo-olympiad',
        name: 'USABO Olympiad Excellence',
        examSystem: 'USA Biology Olympiad',
        duration: '8 months',
        level: 'Advanced',
        targetAudience: 'Top biology students aiming for USABO semifinals and finals',
        features: [
          'Open Exam and Semifinal preparation strategies',
          'Advanced topics beyond AP Biology curriculum',
          'Campbell Biology deep dive with university-level content',
          'Practical and theoretical biology integration',
          'National finals preparation and IBO pathway',
        ],
        priceUSD: 1999,
        originalPriceUSD: 2499,
        badge: 'premium',
        successRate: 87,
      },
    ],
  },

  // ==========================================
  // UNITED KINGDOM
  // ==========================================
  uk: {
    countryCode: 'uk',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    currencySymbol: '£',
    exchangeRate: 0.79,
    timezone: 'GMT/BST (GMT+0 to GMT+1)',
    examBoards: ['AQA', 'OCR', 'Edexcel', 'WJEC', 'Cambridge', 'IB'],
    popularExams: ['GCSE Biology', 'A-Level Biology', 'BMAT', 'UCAT', 'BBO'],
    academicCalendar: {
      schoolYearStart: 'September',
      schoolYearEnd: 'July',
      examSeason: 'May-June (GCSE/A-Level), October-January (BMAT/UCAT)',
    },
    courses: [
      {
        id: 'uk-gcse-biology-foundation',
        name: 'GCSE Biology Excellence',
        examSystem: 'GCSE Biology',
        duration: '10 months',
        level: 'Intermediate',
        targetAudience: 'Year 10-11 students preparing for GCSE Biology exams',
        features: [
          'Complete AQA, OCR, and Edexcel syllabus coverage',
          'Required practical skills and investigations',
          'Paper 1 and Paper 2 comprehensive preparation',
          'Higher and Foundation tier differentiation',
          'Grade 7-9 targeting strategies',
        ],
        priceUSD: 1199,
        originalPriceUSD: 1399,
        badge: 'popular',
        successRate: 92,
      },
      {
        id: 'uk-alevel-biology-mastery',
        name: 'A-Level Biology Mastery',
        examSystem: 'A-Level Biology',
        duration: '18 months',
        level: 'Advanced',
        targetAudience: 'Year 12-13 students pursuing A-Level Biology for university admission',
        features: [
          'Complete A-Level specification (AQA/OCR/Edexcel)',
          'Practical endorsement preparation and skills',
          'Extended response and essay writing techniques',
          'Mathematical skills in biology context',
          'Synoptic assessment and evaluation questions',
        ],
        priceUSD: 1899,
        originalPriceUSD: 2299,
        badge: 'recommended',
        successRate: 95,
      },
      {
        id: 'uk-bmat-biology-intensive',
        name: 'BMAT Section 2 Biology Intensive',
        examSystem: 'BMAT',
        duration: '4 months',
        level: 'Advanced',
        targetAudience: 'Students applying to Oxford, Cambridge, Imperial for Medicine',
        features: [
          'Scientific Knowledge and Applications (Section 2)',
          'Biology content beyond GCSE level',
          'Multiple choice under time pressure',
          'Integration with Chemistry and Physics',
          'Oxford/Cambridge interview preparation',
        ],
        priceUSD: 999,
        originalPriceUSD: 1299,
        badge: 'premium',
        successRate: 88,
      },
      {
        id: 'uk-ucat-preparation',
        name: 'UCAT Complete Preparation',
        examSystem: 'UCAT',
        duration: '3 months',
        level: 'Intermediate',
        targetAudience: 'Medical school applicants to UK universities requiring UCAT',
        features: [
          'All 5 UCAT subtests comprehensive coverage',
          'Situational Judgement Test strategies',
          'Abstract Reasoning pattern recognition',
          'Verbal and Quantitative Reasoning techniques',
          'Decision Making under pressure',
        ],
        priceUSD: 799,
        originalPriceUSD: 999,
        badge: 'best_value',
        successRate: 90,
      },
      {
        id: 'uk-ib-biology-complete',
        name: 'IB Biology Complete Programme',
        examSystem: 'IB Biology',
        duration: '24 months',
        level: 'Advanced',
        targetAudience: 'IB Diploma students in UK international schools',
        features: [
          'Higher Level and Standard Level full coverage',
          'Internal Assessment (IA) research and writing',
          'Extended Essay in Biology supervision',
          'Option topics (Neurobiology, Ecology, etc.)',
          'Paper 1, 2, and 3 exam strategies',
        ],
        priceUSD: 2199,
        originalPriceUSD: 2599,
        successRate: 94,
      },
      {
        id: 'uk-bbo-olympiad',
        name: 'British Biology Olympiad Prep',
        examSystem: 'BBO',
        duration: '6 months',
        level: 'Advanced',
        targetAudience: 'High-achieving A-Level students competing in BBO',
        features: [
          'Advanced biology beyond A-Level syllabus',
          'Competition paper practice and timing',
          'University-level concepts introduction',
          'Gold, Silver, Bronze medal targeting',
          'International Biology Olympiad pathway',
        ],
        priceUSD: 1499,
        originalPriceUSD: 1799,
        badge: 'premium',
        successRate: 85,
      },
    ],
  },

  // ==========================================
  // CANADA
  // ==========================================
  canada: {
    countryCode: 'ca',
    countryName: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    currencySymbol: 'C$',
    exchangeRate: 1.36,
    timezone: 'EST to PST (GMT-5 to GMT-8)',
    examBoards: ['Provincial Curricula', 'IB', 'AP'],
    popularExams: ['Provincial Diplomas', 'AP Biology', 'IB Biology', 'MCAT'],
    academicCalendar: {
      schoolYearStart: 'September',
      schoolYearEnd: 'June',
      examSeason: 'January and June (Provincial), May (AP/IB)',
    },
    courses: [
      {
        id: 'ca-grade12-biology',
        name: 'Grade 12 Biology Excellence',
        examSystem: 'Provincial High School Biology',
        duration: '10 months',
        level: 'Advanced',
        targetAudience: 'Grade 12 students in Ontario, BC, Alberta provincial systems',
        features: [
          'Provincial curriculum alignment (Ontario SBI4U, BC Biology 12)',
          'University preparation focus',
          'Lab skills and scientific inquiry',
          'Critical thinking and analysis development',
          'Provincial exam preparation where applicable',
        ],
        priceUSD: 1299,
        originalPriceUSD: 1499,
        badge: 'popular',
        successRate: 93,
      },
      {
        id: 'ca-premed-biology',
        name: 'Pre-Med Biology Foundation',
        examSystem: 'Pre-Medical Track',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'Students preparing for Canadian medical school applications',
        features: [
          'MCAT Biology and Biochemistry preparation',
          'CASPer test preparation for med school',
          'Research experience guidance',
          'GPA optimization strategies',
          'Canadian medical school application support',
        ],
        priceUSD: 1999,
        originalPriceUSD: 2399,
        badge: 'premium',
        successRate: 91,
      },
      {
        id: 'ca-ib-ap-biology',
        name: 'IB/AP Biology Dual Track',
        examSystem: 'IB/AP Biology',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'Students in Canadian IB or AP programs seeking top scores',
        features: [
          'Complete IB HL/SL and AP Biology coverage',
          'Internal Assessment and lab portfolio',
          'College Board and IBO exam strategies',
          'University credit maximization',
          'Competitive edge for US/Canadian universities',
        ],
        priceUSD: 1699,
        originalPriceUSD: 1999,
        badge: 'recommended',
        successRate: 94,
      },
      {
        id: 'ca-provincial-exam-prep',
        name: 'Provincial Diploma Exam Prep',
        examSystem: 'Provincial Exams',
        duration: '4 months',
        level: 'Intermediate',
        targetAudience: 'Grade 12 students in Alberta preparing for Biology 30 diploma',
        features: [
          'Alberta Biology 30 curriculum mastery',
          'Diploma exam format and strategies',
          'Multiple choice and written response prep',
          'Science process skills development',
          'Achievement standard excellence targeting',
        ],
        priceUSD: 799,
        originalPriceUSD: 999,
        badge: 'best_value',
        successRate: 90,
      },
    ],
  },

  // ==========================================
  // AUSTRALIA
  // ==========================================
  australia: {
    countryCode: 'au',
    countryName: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    currencySymbol: 'A$',
    exchangeRate: 1.53,
    timezone: 'AEST/AWST (GMT+8 to GMT+11)',
    examBoards: ['ATAR', 'VCE', 'HSC', 'QCE', 'WACE', 'IB'],
    popularExams: ['HSC Biology', 'VCE Biology', 'ATAR Biology', 'IB Biology'],
    academicCalendar: {
      schoolYearStart: 'February',
      schoolYearEnd: 'December',
      examSeason: 'October-November',
    },
    courses: [
      {
        id: 'au-year11-biology',
        name: 'Year 11 Biology Foundation',
        examSystem: 'Year 11 Biology',
        duration: '10 months',
        level: 'Intermediate',
        targetAudience: 'Year 11 students beginning senior Biology studies',
        features: [
          'State curriculum alignment (NSW, VIC, QLD, WA)',
          'Cells as basis of life and organisation',
          'Ecosystem dynamics introduction',
          'Scientific investigation skills',
          'Foundation for Year 12 success',
        ],
        priceUSD: 1099,
        originalPriceUSD: 1299,
        badge: 'best_value',
        successRate: 91,
      },
      {
        id: 'au-year12-hsc-biology',
        name: 'HSC Biology Excellence (NSW)',
        examSystem: 'HSC Biology',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'Year 12 NSW students targeting Band 6 in HSC Biology',
        features: [
          'Complete NSW HSC Biology syllabus',
          'Heredity and Genetic Change modules',
          'Infectious Disease and Non-infectious Disease',
          'Depth studies and scientific investigation',
          'HSC exam technique and past paper practice',
        ],
        priceUSD: 1499,
        originalPriceUSD: 1799,
        badge: 'popular',
        successRate: 94,
      },
      {
        id: 'au-vce-biology',
        name: 'VCE Biology Units 3 & 4',
        examSystem: 'VCE Biology',
        duration: '10 months',
        level: 'Advanced',
        targetAudience: 'Year 12 Victorian students pursuing high ATAR via VCE Biology',
        features: [
          'Units 3 and 4 comprehensive coverage',
          'SAC preparation and performance',
          'Exam technique for written examination',
          'Study score optimization strategies',
          'Cellular processes to evolution',
        ],
        priceUSD: 1399,
        originalPriceUSD: 1699,
        badge: 'recommended',
        successRate: 93,
      },
      {
        id: 'au-atar-biology-intensive',
        name: 'ATAR Biology Intensive',
        examSystem: 'ATAR Preparation',
        duration: '6 months',
        level: 'Advanced',
        targetAudience: 'Year 12 students targeting 90+ ATAR with Biology',
        features: [
          'Cross-state ATAR strategy alignment',
          'High-stakes exam preparation',
          'Extended response mastery',
          'Data analysis and interpretation',
          'Last-minute revision and consolidation',
        ],
        priceUSD: 999,
        originalPriceUSD: 1199,
        successRate: 89,
      },
      {
        id: 'au-ib-biology-complete',
        name: 'IB Biology HL Complete',
        examSystem: 'IB Biology',
        duration: '24 months',
        level: 'Advanced',
        targetAudience: 'IB students in Australian international schools',
        features: [
          'Higher Level complete syllabus',
          'Internal Assessment research project',
          'Extended Essay supervision',
          'External assessment preparation',
          'TOK integration with Biology',
        ],
        priceUSD: 2099,
        originalPriceUSD: 2499,
        badge: 'premium',
        successRate: 95,
      },
    ],
  },

  // ==========================================
  // SINGAPORE
  // ==========================================
  singapore: {
    countryCode: 'sg',
    countryName: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    currencySymbol: 'S$',
    exchangeRate: 1.34,
    timezone: 'SGT (GMT+8)',
    examBoards: ['Cambridge', 'MOE', 'IB'],
    popularExams: ['O-Level Biology', 'A-Level Biology', 'H2 Biology', 'IB Biology'],
    academicCalendar: {
      schoolYearStart: 'January',
      schoolYearEnd: 'November',
      examSeason: 'October-November',
    },
    courses: [
      {
        id: 'sg-olevel-biology',
        name: 'O-Level Biology Excellence',
        examSystem: 'Cambridge O-Level Biology',
        duration: '10 months',
        level: 'Intermediate',
        targetAudience: 'Secondary 3-4 students preparing for O-Level Biology',
        features: [
          'Complete Cambridge O-Level syllabus (5090)',
          'Paper 1 Multiple Choice strategies',
          'Paper 2 Theory and data analysis',
          'Practical skills and Paper 3/6 preparation',
          'A1 grade targeting methodology',
        ],
        priceUSD: 1299,
        originalPriceUSD: 1499,
        badge: 'popular',
        successRate: 93,
      },
      {
        id: 'sg-alevel-h2-biology',
        name: 'H2 Biology A-Level Mastery',
        examSystem: 'Cambridge A-Level H2 Biology',
        duration: '18 months',
        level: 'Advanced',
        targetAudience: 'JC1-JC2 students taking H2 Biology for university admission',
        features: [
          'Complete H2 Biology syllabus (9744)',
          'Cellular function to ecology coverage',
          'Paper 1, 2, 3, and 4 exam preparation',
          'Practical assessment skills',
          'University science course preparation',
        ],
        priceUSD: 1999,
        originalPriceUSD: 2399,
        badge: 'recommended',
        successRate: 95,
      },
      {
        id: 'sg-ip-biology',
        name: 'IP Biology Programme',
        examSystem: 'Integrated Programme',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'IP school students in top Singapore schools',
        features: [
          'Advanced content beyond O-Level',
          'Research methodology and skills',
          'Independent investigation projects',
          'Critical thinking development',
          'Seamless transition to JC H2 Biology',
        ],
        priceUSD: 1699,
        originalPriceUSD: 1999,
        badge: 'premium',
        successRate: 94,
      },
      {
        id: 'sg-biology-olympiad',
        name: 'Singapore Biology Olympiad Prep',
        examSystem: 'Singapore Biology Olympiad',
        duration: '8 months',
        level: 'Advanced',
        targetAudience: 'Top biology students competing in national and international olympiads',
        features: [
          'Advanced university-level biology',
          'Singapore Biology Olympiad (SBO) preparation',
          'International Biology Olympiad pathway',
          'Theoretical and practical components',
          'Gold medal targeting strategies',
        ],
        priceUSD: 1799,
        originalPriceUSD: 2199,
        successRate: 82,
      },
    ],
  },

  // ==========================================
  // UAE (UNITED ARAB EMIRATES)
  // ==========================================
  uae: {
    countryCode: 'ae',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    currency: 'AED',
    currencySymbol: 'د.إ',
    exchangeRate: 3.67,
    timezone: 'GST (GMT+4)',
    examBoards: ['Cambridge', 'Edexcel', 'IB', 'American', 'MOE'],
    popularExams: ['IGCSE Biology', 'A-Level Biology', 'IB Biology', 'AP Biology'],
    academicCalendar: {
      schoolYearStart: 'September',
      schoolYearEnd: 'June',
      examSeason: 'May-June (IGCSE/A-Level/IB), Various (American)',
    },
    courses: [
      {
        id: 'uae-igcse-biology',
        name: 'IGCSE Biology Complete',
        examSystem: 'Cambridge IGCSE Biology',
        duration: '12 months',
        level: 'Intermediate',
        targetAudience: 'Year 10-11 students in IGCSE schools across UAE',
        features: [
          'Complete Cambridge IGCSE syllabus (0610)',
          'Extended and Core tier preparation',
          'Practical skills and Alternative to Practical',
          'Past paper practice from all variants',
          'A* grade achievement strategies',
        ],
        priceUSD: 1399,
        originalPriceUSD: 1599,
        badge: 'popular',
        successRate: 94,
      },
      {
        id: 'uae-alevel-biology',
        name: 'A-Level Biology UAE Edition',
        examSystem: 'Cambridge/Edexcel A-Level',
        duration: '18 months',
        level: 'Advanced',
        targetAudience: 'Year 12-13 students preparing for A-Level Biology',
        features: [
          'Complete A-Level syllabus (9700/Edexcel)',
          'Practical endorsement and skills',
          'Extended response and essay techniques',
          'UAE university admission alignment',
          'UK university application support',
        ],
        priceUSD: 1899,
        originalPriceUSD: 2299,
        badge: 'recommended',
        successRate: 93,
      },
      {
        id: 'uae-ib-biology-full',
        name: 'IB Biology Full Programme',
        examSystem: 'IB Biology',
        duration: '24 months',
        level: 'Advanced',
        targetAudience: 'IB Diploma students in UAE international schools',
        features: [
          'Higher Level and Standard Level coverage',
          'Internal Assessment guidance',
          'Extended Essay mentorship',
          'Group 4 project collaboration',
          'University worldwide preparation',
        ],
        priceUSD: 2199,
        originalPriceUSD: 2599,
        badge: 'premium',
        successRate: 95,
      },
      {
        id: 'uae-american-biology',
        name: 'American Curriculum Biology',
        examSystem: 'American System',
        duration: '10 months',
        level: 'Intermediate',
        targetAudience: 'Students in American curriculum schools preparing for AP or SAT',
        features: [
          'American High School Biology curriculum',
          'AP Biology preparation pathway',
          'SAT Biology Subject Test readiness',
          'College application portfolio building',
          'US university admission alignment',
        ],
        priceUSD: 1299,
        originalPriceUSD: 1499,
        badge: 'best_value',
        successRate: 91,
      },
      {
        id: 'uae-premed-foundation',
        name: 'Pre-Medical Foundation UAE',
        examSystem: 'Pre-Medical Track',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'UAE students aspiring to medical schools in UAE, UK, or US',
        features: [
          'UCAT/BMAT preparation',
          'UAE medical school entry requirements',
          'EmSAT Biology alignment',
          'Medical school interview preparation',
          'Personal statement guidance',
        ],
        priceUSD: 1799,
        originalPriceUSD: 2099,
        successRate: 89,
      },
    ],
  },

  // ==========================================
  // IRELAND
  // ==========================================
  ireland: {
    countryCode: 'ie',
    countryName: 'Ireland',
    flag: '🇮🇪',
    currency: 'EUR',
    currencySymbol: '€',
    exchangeRate: 0.92,
    timezone: 'GMT/IST (GMT+0 to GMT+1)',
    examBoards: ['SEC', 'IB'],
    popularExams: ['Junior Cycle Biology', 'Leaving Certificate Biology', 'HPAT', 'IB Biology'],
    academicCalendar: {
      schoolYearStart: 'September',
      schoolYearEnd: 'June',
      examSeason: 'June (State Exams), February (HPAT)',
    },
    courses: [
      {
        id: 'ie-junior-cycle-biology',
        name: 'Junior Cycle Science - Biology',
        examSystem: 'Junior Cycle',
        duration: '10 months',
        level: 'Beginner',
        targetAudience: 'Junior Cycle students (1st-3rd year) studying Biology',
        features: [
          'Complete Junior Cycle Science specification',
          'Biological World strand coverage',
          'Classroom-Based Assessments preparation',
          'Investigation skills development',
          'Foundation for Leaving Cert Biology',
        ],
        priceUSD: 999,
        originalPriceUSD: 1199,
        badge: 'best_value',
        successRate: 92,
      },
      {
        id: 'ie-leaving-cert-biology',
        name: 'Leaving Certificate Biology',
        examSystem: 'Leaving Certificate Biology',
        duration: '18 months',
        level: 'Advanced',
        targetAudience: '5th and 6th year students taking Leaving Cert Biology',
        features: [
          'Complete LC Biology syllabus',
          'Higher Level targeting for H1',
          'Mandatory experiments and practicals',
          'Extended response and experiment questions',
          'CAO points optimization strategies',
        ],
        priceUSD: 1599,
        originalPriceUSD: 1899,
        badge: 'popular',
        successRate: 94,
      },
      {
        id: 'ie-hpat-preparation',
        name: 'HPAT-Ireland Complete Prep',
        examSystem: 'HPAT-Ireland',
        duration: '4 months',
        level: 'Advanced',
        targetAudience: 'Students applying to Irish medical schools requiring HPAT',
        features: [
          'All 3 HPAT sections comprehensive coverage',
          'Logical Reasoning and Problem Solving',
          'Interpersonal Understanding',
          'Non-verbal Reasoning patterns',
          'Irish medical school application guidance',
        ],
        priceUSD: 899,
        originalPriceUSD: 1099,
        badge: 'recommended',
        successRate: 88,
      },
      {
        id: 'ie-ib-biology-ireland',
        name: 'IB Biology for Irish Students',
        examSystem: 'IB Biology',
        duration: '24 months',
        level: 'Advanced',
        targetAudience: 'IB Diploma students in Irish schools',
        features: [
          'Complete IB Biology HL/SL',
          'IA and Extended Essay support',
          'Irish university recognition guidance',
          'CAO points equivalent understanding',
          'International university pathway',
        ],
        priceUSD: 1999,
        originalPriceUSD: 2399,
        badge: 'premium',
        successRate: 93,
      },
    ],
  },

  // ==========================================
  // HONG KONG
  // ==========================================
  hongkong: {
    countryCode: 'hk',
    countryName: 'Hong Kong',
    flag: '🇭🇰',
    currency: 'HKD',
    currencySymbol: 'HK$',
    exchangeRate: 7.82,
    timezone: 'HKT (GMT+8)',
    examBoards: ['HKEAA', 'Cambridge', 'IB'],
    popularExams: ['HKDSE Biology', 'IGCSE Biology', 'A-Level Biology', 'IB Biology'],
    academicCalendar: {
      schoolYearStart: 'September',
      schoolYearEnd: 'July',
      examSeason: 'April-May (HKDSE), May-June (IGCSE/A-Level/IB)',
    },
    courses: [
      {
        id: 'hk-hkdse-biology',
        name: 'HKDSE Biology Excellence',
        examSystem: 'HKDSE Biology',
        duration: '18 months',
        level: 'Advanced',
        targetAudience: 'Secondary 5-6 students preparing for HKDSE Biology',
        features: [
          'Complete HKDSE Biology curriculum',
          'Compulsory and Elective Part coverage',
          'School-based Assessment preparation',
          'Level 5** targeting strategies',
          'JUPAS admission optimization',
        ],
        priceUSD: 1699,
        originalPriceUSD: 1999,
        badge: 'popular',
        successRate: 94,
      },
      {
        id: 'hk-igcse-biology',
        name: 'IGCSE Biology Hong Kong',
        examSystem: 'Cambridge IGCSE Biology',
        duration: '12 months',
        level: 'Intermediate',
        targetAudience: 'International school students taking IGCSE Biology',
        features: [
          'Complete Cambridge IGCSE syllabus',
          'Extended and Core tier options',
          'Practical assessment preparation',
          'A* grade achievement focus',
          'A-Level preparation pathway',
        ],
        priceUSD: 1399,
        originalPriceUSD: 1699,
        badge: 'recommended',
        successRate: 93,
      },
      {
        id: 'hk-alevel-biology',
        name: 'A-Level Biology HK',
        examSystem: 'Cambridge A-Level Biology',
        duration: '18 months',
        level: 'Advanced',
        targetAudience: 'A-Level students in Hong Kong international schools',
        features: [
          'Complete A-Level Biology (9700)',
          'Practical endorsement skills',
          'UK and HK university preparation',
          'UCAS application support',
          'Medical school entry alignment',
        ],
        priceUSD: 1899,
        originalPriceUSD: 2299,
        badge: 'premium',
        successRate: 95,
      },
      {
        id: 'hk-ib-ap-biology',
        name: 'IB/AP Biology Programme',
        examSystem: 'IB/AP Biology',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'Students in IB or American curriculum schools in Hong Kong',
        features: [
          'IB HL/SL or AP Biology choice',
          'Internal Assessment and lab support',
          'Extended Essay mentorship',
          'US/UK university preparation',
          'Score maximization strategies',
        ],
        priceUSD: 1799,
        originalPriceUSD: 2099,
        successRate: 94,
      },
    ],
  },

  // ==========================================
  // NEW ZEALAND
  // ==========================================
  newzealand: {
    countryCode: 'nz',
    countryName: 'New Zealand',
    flag: '🇳🇿',
    currency: 'NZD',
    currencySymbol: 'NZ$',
    exchangeRate: 1.64,
    timezone: 'NZST/NZDT (GMT+12 to GMT+13)',
    examBoards: ['NZQA', 'Cambridge', 'IB'],
    popularExams: ['NCEA Biology', 'Scholarship Biology', 'Cambridge Biology', 'IB Biology'],
    academicCalendar: {
      schoolYearStart: 'February',
      schoolYearEnd: 'December',
      examSeason: 'November (NCEA), October-November (Cambridge/IB)',
    },
    courses: [
      {
        id: 'nz-ncea-level1-biology',
        name: 'NCEA Level 1 Biology',
        examSystem: 'NCEA Level 1',
        duration: '10 months',
        level: 'Beginner',
        targetAudience: 'Year 11 students beginning NCEA Biology',
        features: [
          'Complete Level 1 Biology standards',
          'Internal and External assessments',
          'Achievement Standard preparation',
          'Merit/Excellence endorsement targeting',
          'Foundation for Level 2 success',
        ],
        priceUSD: 999,
        originalPriceUSD: 1199,
        badge: 'best_value',
        successRate: 91,
      },
      {
        id: 'nz-ncea-level2-biology',
        name: 'NCEA Level 2 Biology',
        examSystem: 'NCEA Level 2',
        duration: '10 months',
        level: 'Intermediate',
        targetAudience: 'Year 12 students pursuing NCEA Level 2 Biology',
        features: [
          'Complete Level 2 Biology standards',
          'Gene expression and cellular processes',
          'Ecological concepts',
          'Excellence endorsement strategies',
          'University Entrance preparation',
        ],
        priceUSD: 1199,
        originalPriceUSD: 1399,
        badge: 'popular',
        successRate: 92,
      },
      {
        id: 'nz-ncea-level3-biology',
        name: 'NCEA Level 3 Biology',
        examSystem: 'NCEA Level 3',
        duration: '10 months',
        level: 'Advanced',
        targetAudience: 'Year 13 students completing NCEA Level 3 Biology',
        features: [
          'Complete Level 3 Biology standards',
          'Human evolution and trends in populations',
          'Homeostasis and responses',
          'Excellence endorsement and Rank Score',
          'NZ university course selection guidance',
        ],
        priceUSD: 1399,
        originalPriceUSD: 1699,
        badge: 'recommended',
        successRate: 93,
      },
      {
        id: 'nz-scholarship-biology',
        name: 'Scholarship Biology Excellence',
        examSystem: 'NZ Scholarship Biology',
        duration: '8 months',
        level: 'Advanced',
        targetAudience: 'Top Year 13 students competing for Scholarship Biology',
        features: [
          'Advanced biology beyond Level 3',
          'Critical thinking and analysis',
          'Extended response writing',
          'Scholarship exam strategies',
          'Outstanding Scholarship targeting',
        ],
        priceUSD: 1599,
        originalPriceUSD: 1899,
        badge: 'premium',
        successRate: 78,
      },
      {
        id: 'nz-ib-cambridge-biology',
        name: 'IB/Cambridge Biology NZ',
        examSystem: 'IB/Cambridge Biology',
        duration: '24 months',
        level: 'Advanced',
        targetAudience: 'Students in NZ international schools taking IB or Cambridge',
        features: [
          'IB HL/SL or A-Level Biology',
          'Complete syllabus coverage',
          'Internal Assessment support',
          'Extended Essay mentorship',
          'International university preparation',
        ],
        priceUSD: 1999,
        originalPriceUSD: 2399,
        successRate: 94,
      },
    ],
  },

  // ==========================================
  // SOUTH AFRICA
  // ==========================================
  southafrica: {
    countryCode: 'za',
    countryName: 'South Africa',
    flag: '🇿🇦',
    currency: 'ZAR',
    currencySymbol: 'R',
    exchangeRate: 18.5,
    timezone: 'SAST (GMT+2)',
    examBoards: ['DBE', 'IEB', 'Cambridge', 'IB'],
    popularExams: ['NSC Life Sciences', 'IEB Life Sciences', 'Cambridge Biology', 'IB Biology'],
    academicCalendar: {
      schoolYearStart: 'January',
      schoolYearEnd: 'December',
      examSeason: 'October-November (Matric), October-November (Cambridge/IB)',
    },
    courses: [
      {
        id: 'za-matric-life-sciences',
        name: 'Matric Life Sciences (NSC)',
        examSystem: 'Matric NSC Life Sciences',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'Grade 12 students preparing for NSC Life Sciences exam',
        features: [
          'Complete NSC Life Sciences curriculum',
          'Paper 1 and Paper 2 preparation',
          'Practical investigation skills',
          'Level 7 (80%+) targeting strategies',
          'University admission points optimization',
        ],
        priceUSD: 1199,
        originalPriceUSD: 1399,
        badge: 'popular',
        successRate: 93,
      },
      {
        id: 'za-ieb-life-sciences',
        name: 'IEB Life Sciences Excellence',
        examSystem: 'IEB Life Sciences',
        duration: '12 months',
        level: 'Advanced',
        targetAudience: 'IEB school students in private schools across South Africa',
        features: [
          'Complete IEB Life Sciences syllabus',
          'Higher Order Thinking development',
          'Scientific investigation skills',
          'A symbol (80%+) achievement focus',
          'Elite university preparation',
        ],
        priceUSD: 1399,
        originalPriceUSD: 1699,
        badge: 'recommended',
        successRate: 94,
      },
      {
        id: 'za-cambridge-biology',
        name: 'Cambridge IGCSE/A-Level Biology',
        examSystem: 'Cambridge Biology',
        duration: '18 months',
        level: 'Advanced',
        targetAudience: 'Students in Cambridge schools in South Africa',
        features: [
          'IGCSE and A-Level Biology coverage',
          'International qualification pathway',
          'Practical skills development',
          'A* grade targeting',
          'UK and SA university preparation',
        ],
        priceUSD: 1599,
        originalPriceUSD: 1899,
        badge: 'premium',
        successRate: 92,
      },
      {
        id: 'za-ib-biology-sa',
        name: 'IB Biology South Africa',
        examSystem: 'IB Biology',
        duration: '24 months',
        level: 'Advanced',
        targetAudience: 'IB Diploma students in SA international schools',
        features: [
          'Complete IB Biology HL/SL syllabus',
          'Internal Assessment research',
          'Extended Essay supervision',
          'Theory of Knowledge integration',
          'Global university admissions',
        ],
        priceUSD: 1899,
        originalPriceUSD: 2299,
        successRate: 93,
      },
    ],
  },
}

// Utility functions
export const getCountryByCode = (code: string): CountryCourseCatalog | undefined => {
  return internationalCourseCatalog[code.toLowerCase()]
}

export const getAllCountries = (): CountryCourseCatalog[] => {
  return Object.values(internationalCourseCatalog)
}

export const getCoursesByExamSystem = (examSystem: string): InternationalCourse[] => {
  const courses: InternationalCourse[] = []
  Object.values(internationalCourseCatalog).forEach((country) => {
    country.courses.forEach((course) => {
      if (course.examSystem.toLowerCase().includes(examSystem.toLowerCase())) {
        courses.push(course)
      }
    })
  })
  return courses
}

export const convertPriceToLocal = (
  priceUSD: number,
  countryCode: string
): { amount: number; formatted: string } => {
  const country = internationalCourseCatalog[countryCode.toLowerCase()]
  if (!country) {
    return { amount: priceUSD, formatted: `$${priceUSD}` }
  }
  const localAmount = Math.round(priceUSD * country.exchangeRate)
  return {
    amount: localAmount,
    formatted: `${country.currencySymbol}${localAmount.toLocaleString()}`,
  }
}

export const getCoursesByLevel = (level: CourseLevel): InternationalCourse[] => {
  const courses: InternationalCourse[] = []
  Object.values(internationalCourseCatalog).forEach((country) => {
    country.courses.forEach((course) => {
      if (course.level === level) {
        courses.push(course)
      }
    })
  })
  return courses
}

export const getPopularCourses = (): InternationalCourse[] => {
  const courses: InternationalCourse[] = []
  Object.values(internationalCourseCatalog).forEach((country) => {
    country.courses.forEach((course) => {
      if (course.badge === 'popular' || course.badge === 'recommended') {
        courses.push(course)
      }
    })
  })
  return courses
}

export const internationalCountryList = Object.keys(internationalCourseCatalog)

export const internationalRegions = {
  'North America': ['us', 'ca'],
  Europe: ['uk', 'ie'],
  'Asia Pacific': ['sg', 'hk', 'au', 'nz'],
  'Middle East': ['uae'],
  Africa: ['za'],
}
