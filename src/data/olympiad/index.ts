import { BiologyOlympiadCountry } from './types'

export * from './types'

export const biologyOlympiads: BiologyOlympiadCountry[] = [
  {
    id: 'usabo',
    slug: 'usabo-coaching',
    countryCode: 'US',
    countryName: 'United States',
    olympiadName: 'USABO',
    olympiadFullName: 'USA Biology Olympiad',
    organizingBody: 'Center for Excellence in Education (CEE)',
    officialWebsite: 'https://www.usabo-trc.org/',
    currency: 'USD',
    timezone: 'America/New_York',
    examStructure: {
      rounds: [
        {
          name: 'Open Exam',
          format: '50 multiple choice questions',
          duration: '50 minutes',
          topics: ['Cell biology', 'Genetics', 'Evolution', 'Ecology', 'Physiology'],
          passRate: 'Top 10% advance',
        },
        {
          name: 'Semifinal Exam',
          format: '120 multiple choice questions',
          duration: '120 minutes',
          topics: ['All biology topics', 'Deeper conceptual understanding'],
          passRate: 'Top 500 advance',
        },
        {
          name: 'National Finals',
          format: 'Theory and practical exams',
          duration: 'Multi-day',
          topics: ['IBO-level content', 'Lab practicals'],
        },
      ],
      selectionProcess: 'Top 4 students represent USA at IBO',
      iboQualification: true,
      registrationPeriod: 'December - January',
      examMonths: ['February', 'March', 'May'],
    },
    eligibility: {
      ageLimit: 'Under 20 years old',
      citizenshipRequired: true,
      schoolLevel: 'High school students',
      otherRequirements: ['Must be enrolled in US high school'],
    },
    preparationResources: [
      'Campbell Biology textbook',
      'USABO past papers',
      'Biology Olympiad preparation courses',
    ],
    recommendedBooks: ['Campbell Biology', 'Molecular Biology of the Cell', 'Animal Physiology'],
    campbellChapterFocus: [6, 7, 9, 10, 14, 17, 22, 23, 42, 43, 48, 53],
    metaTitle: 'USABO Coaching Online | USA Biology Olympiad Preparation',
    metaDescription:
      'Expert USABO coaching online. Prepare for USA Biology Olympiad with Campbell Biology. Open exam to National Finals preparation. IBO qualification track.',
    keywords: [
      'USABO preparation',
      'USABO coaching online',
      'USA Biology Olympiad',
      'USABO tutoring',
      'biology olympiad USA',
    ],
    heroDescription:
      'Prepare for USABO with expert coaching. From Open Exam to National Finals - comprehensive preparation for IBO qualification.',
    faqs: [
      {
        question: 'What is USABO?',
        answer:
          'USABO is the USA Biology Olympiad, a national competition that selects students to represent the United States at the International Biology Olympiad (IBO).',
      },
      {
        question: 'How do I qualify for USABO National Finals?',
        answer:
          'Students must pass through the Open Exam (top 10%) and Semifinal Exam (top 500) to reach National Finals.',
      },
      {
        question: 'What topics are covered in USABO?',
        answer:
          'USABO covers all major biology topics including cell biology, genetics, evolution, ecology, plant biology, and animal physiology at an advanced level.',
      },
    ],
    whatsappMessage:
      "Hi! I'm preparing for USABO (USA Biology Olympiad). I need coaching for Open Exam and Semifinal preparation. What programs do you offer?",
  },
  {
    id: 'bbo',
    slug: 'bbo-preparation',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    olympiadName: 'BBO',
    olympiadFullName: 'British Biology Olympiad',
    organizingBody: 'Royal Society of Biology',
    officialWebsite: 'https://www.ukbiologycompetitions.org/',
    currency: 'GBP',
    timezone: 'Europe/London',
    examStructure: {
      rounds: [
        {
          name: 'Round 1',
          format: '90 multiple choice and short answer questions',
          duration: '90 minutes',
          topics: ['A-Level Biology', 'Beyond A-Level concepts'],
          passRate: 'Gold, Silver, Bronze, Highly Commended, Commended awards',
        },
        {
          name: 'Round 2',
          format: 'Theory paper',
          duration: '2 hours',
          topics: ['Advanced biology', 'Problem-solving'],
        },
      ],
      selectionProcess: 'Top performers invited to training camp, then IBO team selection',
      iboQualification: true,
      registrationPeriod: 'September - December',
      examMonths: ['January', 'February'],
    },
    eligibility: {
      citizenshipRequired: true,
      schoolLevel: 'Sixth form students (Year 12-13)',
      otherRequirements: ['Must be studying in UK'],
    },
    preparationResources: [
      'Campbell Biology',
      'A-Level Biology specifications',
      'BBO past papers',
    ],
    recommendedBooks: ['Campbell Biology', 'A-Level Biology textbooks', 'Molecular Biology of the Cell'],
    campbellChapterFocus: [6, 9, 10, 14, 17, 22, 23, 42, 43, 48, 53, 54],
    metaTitle: 'BBO Preparation Online | British Biology Olympiad Coaching',
    metaDescription:
      'Expert BBO preparation online. British Biology Olympiad coaching with Campbell Biology. Gold medal preparation for UK students.',
    keywords: [
      'BBO preparation',
      'British Biology Olympiad',
      'BBO coaching',
      'UK biology olympiad',
      'BBO tutoring',
    ],
    heroDescription:
      'Prepare for the British Biology Olympiad with expert coaching. Aim for Gold and IBO team selection.',
    faqs: [
      {
        question: 'What is BBO?',
        answer:
          'BBO is the British Biology Olympiad, organized by the Royal Society of Biology for UK sixth form students.',
      },
      {
        question: 'How difficult is BBO compared to A-Level?',
        answer:
          'BBO goes significantly beyond A-Level, testing university-level concepts and analytical thinking.',
      },
      {
        question: 'How can I prepare for BBO?',
        answer:
          'Study Campbell Biology thoroughly, practice past papers, and focus on understanding concepts beyond A-Level.',
      },
    ],
    whatsappMessage:
      "Hi! I'm a UK student preparing for BBO (British Biology Olympiad). I want to aim for Gold. What coaching do you offer?",
  },
  {
    id: 'inbo',
    slug: 'inbo-coaching',
    countryCode: 'IN',
    countryName: 'India',
    olympiadName: 'INBO',
    olympiadFullName: 'India National Biology Olympiad',
    organizingBody: 'Homi Bhabha Centre for Science Education (HBCSE)',
    officialWebsite: 'https://olympiads.hbcse.tifr.res.in/',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    examStructure: {
      rounds: [
        {
          name: 'NSEB (Stage 1)',
          format: '80 multiple choice questions',
          duration: '2 hours',
          topics: ['NCERT Biology', 'Basic concepts'],
          passRate: 'Top 300 advance',
        },
        {
          name: 'INBiO (Stage 2)',
          format: 'Theory and practical',
          duration: '3 hours theory + practical',
          topics: ['Advanced biology', 'Lab techniques'],
          passRate: 'Top 35 advance',
        },
        {
          name: 'OCSC (Stage 3)',
          format: 'Orientation cum Selection Camp',
          duration: '2 weeks',
          topics: ['IBO-level preparation', 'Practical training'],
        },
      ],
      selectionProcess: 'Top 4-6 students selected for IBO team',
      iboQualification: true,
      registrationPeriod: 'August - September',
      examMonths: ['November', 'January', 'April'],
    },
    eligibility: {
      ageLimit: 'Born on or after July 1 of the IBO year minus 20',
      citizenshipRequired: true,
      schoolLevel: 'Class 11-12 students',
      otherRequirements: ['Must be Indian citizen', 'Not enrolled in college'],
    },
    preparationResources: [
      'NCERT Biology Class 11-12',
      'Campbell Biology',
      'NSEB and INBiO past papers',
    ],
    recommendedBooks: ['Campbell Biology', 'NCERT Biology', 'Trueman Biology'],
    campbellChapterFocus: [6, 7, 9, 10, 14, 17, 18, 22, 23, 42, 43, 48, 53, 55],
    metaTitle: 'INBO Coaching Online | India Biology Olympiad Preparation',
    metaDescription:
      'Expert INBO coaching online. NSEB to OCSC preparation with Campbell Biology. India National Biology Olympiad coaching for IBO.',
    keywords: [
      'INBO preparation',
      'NSEB coaching',
      'India Biology Olympiad',
      'INBiO preparation',
      'HBCSE biology olympiad',
    ],
    heroDescription:
      'Prepare for India National Biology Olympiad from NSEB to OCSC. Expert coaching for IBO qualification.',
    faqs: [
      {
        question: 'What is INBO?',
        answer:
          'INBO is the India National Biology Olympiad program conducted by HBCSE to select students for IBO.',
      },
      {
        question: 'How do I register for NSEB?',
        answer:
          'Register through your school via the IAPT (Indian Association of Physics Teachers) portal during August-September.',
      },
      {
        question: 'Is NCERT enough for NSEB?',
        answer:
          'NCERT is the foundation, but top scorers study Campbell Biology for deeper understanding and competitive edge.',
      },
    ],
    whatsappMessage:
      "Hi! I'm an Indian student preparing for NSEB/INBO (India Biology Olympiad). I want to reach OCSC. What coaching programs do you have?",
  },
  {
    id: 'cnbo',
    slug: 'cnbo-preparation',
    countryCode: 'CN',
    countryName: 'China',
    olympiadName: 'CNBO',
    olympiadFullName: 'Chinese National Biology Olympiad',
    organizingBody: 'Chinese Association for Science and Technology',
    officialWebsite: 'http://www.czs.org.cn/',
    currency: 'CNY',
    timezone: 'Asia/Shanghai',
    examStructure: {
      rounds: [
        {
          name: 'Provincial Competition',
          format: 'Theory examination',
          duration: '3 hours',
          topics: ['High school biology', 'University-level concepts'],
        },
        {
          name: 'National Finals',
          format: 'Theory and practical exams',
          duration: 'Multi-day',
          topics: ['Advanced biology', 'Laboratory skills'],
        },
      ],
      selectionProcess: 'Top performers from National Finals selected for IBO team',
      iboQualification: true,
      examMonths: ['April-May', 'August'],
    },
    eligibility: {
      citizenshipRequired: true,
      schoolLevel: 'High school students',
    },
    preparationResources: [
      'Campbell Biology',
      'Chinese high school biology textbooks',
      'Past competition papers',
    ],
    recommendedBooks: ['Campbell Biology', 'Molecular Biology of the Cell', 'Genetics'],
    campbellChapterFocus: [6, 9, 10, 14, 17, 18, 22, 23, 42, 43, 48, 53],
    metaTitle: 'CNBO Preparation Online | Chinese Biology Olympiad Coaching',
    metaDescription:
      'Expert coaching for Chinese National Biology Olympiad. Campbell Biology preparation for provincial and national level competition.',
    keywords: [
      'CNBO preparation',
      'Chinese Biology Olympiad',
      'China biology competition',
      'biology olympiad China',
    ],
    heroDescription:
      'Prepare for Chinese National Biology Olympiad with expert English-language coaching using Campbell Biology.',
    faqs: [
      {
        question: 'What is CNBO?',
        answer:
          'CNBO is the Chinese National Biology Olympiad that selects students to represent China at IBO.',
      },
      {
        question: 'Can international students participate?',
        answer:
          'CNBO is primarily for Chinese citizens studying in China. International students should check their home country olympiad.',
      },
    ],
    whatsappMessage:
      "Hi! I'm preparing for the Chinese Biology Olympiad. I need English-language coaching with Campbell Biology. Can you help?",
  },
  {
    id: 'asob',
    slug: 'asob-preparation',
    countryCode: 'AU',
    countryName: 'Australia',
    olympiadName: 'ASOB',
    olympiadFullName: 'Australian Science Olympiad - Biology',
    organizingBody: 'Australian Science Innovations',
    officialWebsite: 'https://www.asi.edu.au/',
    currency: 'AUD',
    timezone: 'Australia/Sydney',
    examStructure: {
      rounds: [
        {
          name: 'Qualifying Exam',
          format: 'Multiple choice and short answer',
          duration: '2 hours',
          topics: ['Year 11-12 Biology', 'Extended concepts'],
        },
        {
          name: 'National Finals',
          format: 'Theory and practical exams',
          duration: 'Multi-day residential program',
          topics: ['Advanced biology', 'Laboratory practicals'],
        },
      ],
      selectionProcess: 'Top 4 students selected for IBO team',
      iboQualification: true,
      registrationPeriod: 'Term 1',
      examMonths: ['April', 'September'],
    },
    eligibility: {
      ageLimit: 'Under 20 years old',
      citizenshipRequired: false,
      schoolLevel: 'Year 11-12 students',
      otherRequirements: ['Must be studying in Australia'],
    },
    preparationResources: [
      'Campbell Biology',
      'Australian curriculum resources',
      'Past olympiad papers',
    ],
    recommendedBooks: ['Campbell Biology', 'HSC/VCE Biology resources'],
    campbellChapterFocus: [6, 9, 10, 14, 17, 22, 23, 42, 43, 48, 53, 54],
    metaTitle: 'ASOB Preparation Online | Australian Biology Olympiad Coaching',
    metaDescription:
      'Expert Australian Science Olympiad Biology preparation. Campbell Biology coaching for Australian students targeting IBO.',
    keywords: [
      'ASOB preparation',
      'Australian Biology Olympiad',
      'ASI biology',
      'Australia science olympiad',
    ],
    heroDescription:
      'Prepare for Australian Science Olympiad Biology with expert coaching. From qualifying exam to IBO team selection.',
    faqs: [
      {
        question: 'What is ASOB?',
        answer:
          'ASOB is the Australian Science Olympiad in Biology, selecting students to represent Australia at IBO.',
      },
      {
        question: 'How does Australian Olympiad selection work?',
        answer:
          'Students take a qualifying exam, top performers attend the Summer School, and final team selection follows.',
      },
    ],
    whatsappMessage:
      "Hi! I'm an Australian student preparing for Biology Olympiad (ASOB). What coaching programs do you offer?",
  },
  {
    id: 'cbo',
    slug: 'cbo-preparation',
    countryCode: 'CA',
    countryName: 'Canada',
    olympiadName: 'CBO',
    olympiadFullName: 'Canadian Biology Olympiad',
    organizingBody: 'Canadian Biology Olympiad Committee',
    officialWebsite: 'https://www.canadianbiologyolympiad.ca/',
    currency: 'CAD',
    timezone: 'America/Toronto',
    examStructure: {
      rounds: [
        {
          name: 'National Exam',
          format: 'Multiple choice and written questions',
          duration: '3 hours',
          topics: ['All biology areas', 'Problem-solving'],
        },
        {
          name: 'Training Camp',
          format: 'Intensive training and selection',
          duration: '1-2 weeks',
          topics: ['IBO-level content', 'Practical skills'],
        },
      ],
      selectionProcess: 'Top performers selected for IBO team training',
      iboQualification: true,
      registrationPeriod: 'February - March',
      examMonths: ['April'],
    },
    eligibility: {
      ageLimit: 'Under 20 years old',
      citizenshipRequired: true,
      schoolLevel: 'High school students',
      otherRequirements: ['Canadian citizen or permanent resident'],
    },
    preparationResources: [
      'Campbell Biology',
      'Canadian high school curriculum',
      'CBO past papers',
    ],
    recommendedBooks: ['Campbell Biology', 'Molecular Biology of the Cell'],
    campbellChapterFocus: [6, 9, 10, 14, 17, 22, 23, 42, 43, 48, 53],
    metaTitle: 'CBO Preparation Online | Canadian Biology Olympiad Coaching',
    metaDescription:
      'Expert Canadian Biology Olympiad preparation. Campbell Biology coaching for Canadian students targeting IBO qualification.',
    keywords: [
      'CBO preparation',
      'Canadian Biology Olympiad',
      'Canada biology competition',
      'CBO coaching',
    ],
    heroDescription:
      'Prepare for Canadian Biology Olympiad with expert coaching. Comprehensive preparation for IBO team selection.',
    faqs: [
      {
        question: 'What is CBO?',
        answer:
          'CBO is the Canadian Biology Olympiad that selects students to represent Canada at the International Biology Olympiad.',
      },
      {
        question: 'How do I register for CBO?',
        answer:
          'Registration is typically through your school or individually via the CBO website during February-March.',
      },
    ],
    whatsappMessage:
      "Hi! I'm a Canadian student preparing for CBO (Canadian Biology Olympiad). What coaching do you offer?",
  },
  {
    id: 'sbo',
    slug: 'sbo-preparation',
    countryCode: 'SG',
    countryName: 'Singapore',
    olympiadName: 'SBO',
    olympiadFullName: 'Singapore Biology Olympiad',
    organizingBody: 'Singapore National Institute of Education',
    officialWebsite: 'https://www.science.edu.sg/',
    currency: 'SGD',
    timezone: 'Asia/Singapore',
    examStructure: {
      rounds: [
        {
          name: 'Theory Round',
          format: 'Multiple choice and structured questions',
          duration: '3 hours',
          topics: ['A-Level Biology', 'Beyond syllabus content'],
        },
        {
          name: 'Practical Round',
          format: 'Laboratory practical examination',
          duration: '2-3 hours',
          topics: ['Lab techniques', 'Data analysis'],
        },
      ],
      selectionProcess: 'Top performers selected and trained for IBO',
      iboQualification: true,
      registrationPeriod: 'January - February',
      examMonths: ['March', 'April'],
    },
    eligibility: {
      ageLimit: 'Under 20 years old',
      citizenshipRequired: false,
      schoolLevel: 'JC1-JC2 or equivalent',
      otherRequirements: ['Must be studying in Singapore'],
    },
    preparationResources: [
      'Campbell Biology',
      'Singapore A-Level Biology syllabus',
      'SBO past papers',
    ],
    recommendedBooks: ['Campbell Biology', 'Molecular Biology of the Cell'],
    campbellChapterFocus: [6, 9, 10, 14, 17, 18, 22, 23, 42, 43, 48, 53],
    metaTitle: 'SBO Preparation Online | Singapore Biology Olympiad Coaching',
    metaDescription:
      'Expert Singapore Biology Olympiad preparation. Campbell Biology coaching for JC students targeting IBO qualification.',
    keywords: [
      'SBO preparation',
      'Singapore Biology Olympiad',
      'Singapore science olympiad',
      'SBO coaching',
    ],
    heroDescription:
      'Prepare for Singapore Biology Olympiad with expert coaching. From JC level to IBO qualification.',
    faqs: [
      {
        question: 'What is SBO?',
        answer:
          'SBO is the Singapore Biology Olympiad that selects students for the International Biology Olympiad.',
      },
      {
        question: 'Is SBO open to international students?',
        answer:
          'Yes, students studying in Singapore can participate regardless of citizenship.',
      },
    ],
    whatsappMessage:
      "Hi! I'm a Singapore JC student preparing for SBO (Singapore Biology Olympiad). What coaching programs do you have?",
  },
  {
    id: 'ibo-de',
    slug: 'german-biology-olympiad',
    countryCode: 'DE',
    countryName: 'Germany',
    olympiadName: 'IBO-DE',
    olympiadFullName: 'Internationale BiologieOlympiade (German Selection)',
    organizingBody: 'IPN Kiel',
    officialWebsite: 'https://www.biologieolympiade.de/',
    currency: 'EUR',
    timezone: 'Europe/Berlin',
    examStructure: {
      rounds: [
        {
          name: 'Round 1',
          format: 'Take-home theoretical tasks',
          duration: 'Several weeks',
          topics: ['Open-book research problems'],
        },
        {
          name: 'Round 2',
          format: 'Written examination',
          duration: '3 hours',
          topics: ['Advanced biology', 'Conceptual understanding'],
        },
        {
          name: 'Round 3',
          format: 'Theory and practical exams',
          duration: 'Multi-day at university',
          topics: ['University-level content', 'Lab practicals'],
        },
        {
          name: 'Round 4',
          format: 'Final selection and training',
          duration: '2 weeks',
          topics: ['IBO preparation'],
        },
      ],
      selectionProcess: 'Top 4 students represent Germany at IBO',
      iboQualification: true,
      registrationPeriod: 'Before September',
      examMonths: ['September-November', 'February', 'April', 'May'],
    },
    eligibility: {
      ageLimit: 'Under 20 years old',
      citizenshipRequired: false,
      schoolLevel: 'Gymnasium students',
      otherRequirements: ['Must be studying in Germany'],
    },
    preparationResources: [
      'Campbell Biology',
      'German Abitur biology materials',
      'Past IBO-DE tasks',
    ],
    recommendedBooks: ['Campbell Biology', 'Purves Biologie'],
    campbellChapterFocus: [6, 9, 10, 14, 17, 18, 22, 23, 42, 43, 48, 53],
    metaTitle: 'German Biology Olympiad Preparation | IBO-DE Coaching',
    metaDescription:
      'Expert German Biology Olympiad preparation. Campbell Biology coaching for Gymnasium students. All 4 rounds preparation.',
    keywords: [
      'German Biology Olympiad',
      'Biologie Olympiade',
      'IBO-DE preparation',
      'Germany biology competition',
    ],
    heroDescription:
      'Prepare for German Biology Olympiad (Internationale BiologieOlympiade) with expert English-language coaching.',
    faqs: [
      {
        question: 'What is the German Biology Olympiad structure?',
        answer:
          'It has 4 rounds: take-home tasks, written exam, practical exams, and final training camp selection.',
      },
      {
        question: 'Can I prepare in English?',
        answer:
          'Yes, Campbell Biology in English is excellent preparation as IBO is conducted in English.',
      },
    ],
    whatsappMessage:
      "Hi! I'm a German student preparing for BiologieOlympiade. I need English-language coaching. What do you offer?",
  },
  {
    id: 'kbo',
    slug: 'kbo-preparation',
    countryCode: 'KR',
    countryName: 'South Korea',
    olympiadName: 'KBO',
    olympiadFullName: 'Korean Biology Olympiad',
    organizingBody: 'Korea Science Olympiad Committee',
    officialWebsite: 'http://kast.or.kr/',
    currency: 'KRW',
    timezone: 'Asia/Seoul',
    examStructure: {
      rounds: [
        {
          name: 'Preliminary Round',
          format: 'Written examination',
          duration: '3 hours',
          topics: ['High school biology', 'Extended concepts'],
        },
        {
          name: 'Final Round',
          format: 'Theory and practical exams',
          duration: 'Multi-day',
          topics: ['Advanced biology', 'Laboratory skills'],
        },
      ],
      selectionProcess: 'Top performers selected for IBO training camp',
      iboQualification: true,
      examMonths: ['April', 'July'],
    },
    eligibility: {
      citizenshipRequired: true,
      schoolLevel: 'High school students',
    },
    preparationResources: [
      'Campbell Biology',
      'Korean high school curriculum',
      'KBO past papers',
    ],
    recommendedBooks: ['Campbell Biology', 'Korean biology textbooks'],
    campbellChapterFocus: [6, 9, 10, 14, 17, 22, 23, 42, 43, 48, 53],
    metaTitle: 'KBO Preparation Online | Korean Biology Olympiad Coaching',
    metaDescription:
      'Expert Korean Biology Olympiad preparation. Campbell Biology coaching for Korean students targeting IBO.',
    keywords: [
      'KBO preparation',
      'Korean Biology Olympiad',
      'Korea biology competition',
      'KBO coaching',
    ],
    heroDescription:
      'Prepare for Korean Biology Olympiad with expert English-language coaching using Campbell Biology.',
    faqs: [
      {
        question: 'What is KBO?',
        answer:
          'KBO is the Korean Biology Olympiad that selects students to represent South Korea at IBO.',
      },
      {
        question: 'Why study in English for KBO?',
        answer:
          'Campbell Biology provides comprehensive coverage, and IBO is conducted in English, so English preparation is valuable.',
      },
    ],
    whatsappMessage:
      "Hi! I'm a Korean student preparing for Biology Olympiad (KBO). I need English-language coaching. Can you help?",
  },
  {
    id: 'jbo',
    slug: 'jbo-preparation',
    countryCode: 'JP',
    countryName: 'Japan',
    olympiadName: 'JBO',
    olympiadFullName: 'Japan Biology Olympiad',
    organizingBody: 'Japan Biology Olympiad Committee',
    officialWebsite: 'http://www.jbo-info.jp/',
    currency: 'JPY',
    timezone: 'Asia/Tokyo',
    examStructure: {
      rounds: [
        {
          name: 'Preliminary Exam',
          format: 'Multiple choice examination',
          duration: '90 minutes',
          topics: ['High school biology', 'General knowledge'],
        },
        {
          name: 'Final Exam',
          format: 'Theory and practical exams',
          duration: 'Multi-day',
          topics: ['Advanced biology', 'Experimental skills'],
        },
      ],
      selectionProcess: 'Top 4 students selected for IBO team',
      iboQualification: true,
      registrationPeriod: 'March - May',
      examMonths: ['July', 'August'],
    },
    eligibility: {
      ageLimit: 'Under 20 years old',
      citizenshipRequired: false,
      schoolLevel: 'High school students',
      otherRequirements: ['Must be studying in Japan'],
    },
    preparationResources: [
      'Campbell Biology',
      'Japanese high school biology',
      'JBO past papers',
    ],
    recommendedBooks: ['Campbell Biology', 'Japanese biology textbooks'],
    campbellChapterFocus: [6, 9, 10, 14, 17, 22, 23, 42, 43, 48, 53],
    metaTitle: 'JBO Preparation Online | Japan Biology Olympiad Coaching',
    metaDescription:
      'Expert Japan Biology Olympiad preparation. Campbell Biology coaching for Japanese students targeting IBO qualification.',
    keywords: [
      'JBO preparation',
      'Japan Biology Olympiad',
      'Japanese biology competition',
      'JBO coaching',
    ],
    heroDescription:
      'Prepare for Japan Biology Olympiad with expert English-language coaching using Campbell Biology.',
    faqs: [
      {
        question: 'What is JBO?',
        answer:
          'JBO is the Japan Biology Olympiad that selects students to represent Japan at the International Biology Olympiad.',
      },
      {
        question: 'Is JBO difficult?',
        answer:
          'JBO is competitive. Success requires studying beyond high school curriculum using resources like Campbell Biology.',
      },
    ],
    whatsappMessage:
      "Hi! I'm a student in Japan preparing for JBO (Japan Biology Olympiad). What coaching programs do you offer?",
  },
]

// Helper functions
export function getOlympiadBySlug(slug: string): BiologyOlympiadCountry | undefined {
  return biologyOlympiads.find((o) => o.slug === slug)
}

export function getOlympiadByCountryCode(code: string): BiologyOlympiadCountry | undefined {
  return biologyOlympiads.find((o) => o.countryCode === code)
}

export function getOlympiadById(id: string): BiologyOlympiadCountry | undefined {
  return biologyOlympiads.find((o) => o.id === id)
}

export function getAllOlympiadSlugs(): string[] {
  return biologyOlympiads.map((o) => o.slug)
}

// Default IBO-focused message
export const IBO_WHATSAPP_MESSAGE =
  "Hi! I'm preparing for the International Biology Olympiad (IBO). I need coaching with Campbell Biology. What programs do you offer?"

// Get olympiads by region
export function getOlympiadsByRegion(region: 'asia' | 'europe' | 'americas' | 'oceania'): BiologyOlympiadCountry[] {
  const regionMap: Record<string, string[]> = {
    asia: ['IN', 'CN', 'SG', 'KR', 'JP'],
    europe: ['GB', 'DE'],
    americas: ['US', 'CA'],
    oceania: ['AU'],
  }
  return biologyOlympiads.filter((o) => regionMap[region]?.includes(o.countryCode))
}
