import { SEOLandingContent } from './types'

// Base content for NCERT-specific pages
const ncertBaseContent = {
  stats: [
    { value: '95%', label: 'NEET from NCERT', icon: 'book' },
    { value: '5,000+', label: 'Students Trained', icon: 'users' },
    { value: '98%', label: 'Success Rate', icon: 'trophy' },
    { value: '15+', label: 'Years Experience', icon: 'clock' },
  ],
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      achievement: 'AIIMS Delhi | AIR 267',
      quote:
        "NCERT mastery was the key to my success. Cerebrum's line-by-line NCERT approach made complex concepts crystal clear!",
      score: '340/360 Biology',
    },
    {
      name: 'Aditya Kumar',
      achievement: 'MAMC Delhi | AIR 445',
      quote:
        'Every NEET topper says NCERT is enough - but Cerebrum taught me HOW to read NCERT properly. Game changer!',
      score: '332/360 Biology',
    },
    {
      name: 'Dr. Meera Reddy',
      achievement: 'JIPMER | AIR 312',
      quote:
        'The NCERT-focused teaching helped me score 340+ in biology. Best coaching for NCERT mastery!',
      score: '345/360 Biology',
    },
  ],
  courseSummary: {
    title: 'NCERT Biology Mastery Course',
    duration: '1 Year Program',
    batchSize: '10-12 Students',
    features: [
      'Line-by-line NCERT explanation',
      'NCERT diagrams & flowcharts mastery',
      'NCERT-based MCQ practice',
      'Chapter-wise NCERT tests',
      'NCERT exemplar problem solving',
      'Doubt resolution for NCERT queries',
    ],
    price: {
      original: 75000,
      discounted: 67500,
      emi: '₹3,200/month',
    },
  },
  relatedPages: [
    { title: 'Class 11 Biology', link: '/class-11' },
    { title: 'Class 12 Biology', link: '/class-12' },
    { title: 'NEET Preparation', link: '/courses' },
    { title: 'Free Study Material', link: '/resources' },
  ],
}

// Page 1: /ncert-biology-class-11/
export const ncertBiologyClass11: SEOLandingContent = {
  ...ncertBaseContent,
  slug: 'ncert-biology-class-11',
  classLevel: 'class-11',

  title: 'NCERT Biology Class 11 | Complete NEET Preparation Course',
  metaDescription:
    'Master NCERT Biology Class 11 for NEET. Line-by-line NCERT coverage, expert faculty, proven results. Join the best NCERT 11th biology coaching!',
  keywords: [
    'ncert biology class 11',
    'ncert 11th biology',
    'bio ncert class 11',
    'class 11 ncert biology',
    'ncert biology class 11 for neet',
    '11th biology ncert',
  ],

  hero: {
    headline: 'NCERT Biology Class 11 - Your NEET Foundation',
    subheadline:
      '50% of NEET Biology comes from Class 11. Master every NCERT line, diagram, and concept with expert guidance.',
    highlightedText: '95% of NEET Questions Are NCERT-Based',
    ctaText: 'Start Class 11 Course',
    ctaLink: '/courses?class=class-11',
    backgroundGradient: 'from-green-800 via-green-900 to-green-800',
  },

  painPoints: {
    title: 'Struggling with NCERT Class 11 Biology?',
    points: [
      {
        icon: 'book-open',
        question: 'NCERT language too complex to understand?',
        solution:
          'Our line-by-line NCERT explanation simplifies every concept. No confusion, pure clarity.',
      },
      {
        icon: 'layers',
        question: 'Too many chapters, dont know where to start?',
        solution:
          'Systematic chapter-wise approach. Build concepts progressively, never feel overwhelmed.',
      },
      {
        icon: 'target',
        question: 'Reading NCERT but not retaining?',
        solution: 'Memory techniques, flowcharts, mnemonics. We teach you HOW to remember NCERT.',
      },
      {
        icon: 'help-circle',
        question: 'Diagrams in NCERT confusing you?',
        solution:
          'Visual explanations for every diagram. Learn to draw and label perfectly for NEET.',
      },
    ],
  },

  benefits: {
    title: 'NCERT Class 11 Biology Mastery',
    subtitle: 'What makes our NCERT teaching different',
    items: [
      {
        icon: 'book',
        title: 'Line-by-Line Coverage',
        description: 'Every sentence of NCERT explained. Nothing is assumed, everything is taught.',
      },
      {
        icon: 'image',
        title: 'Diagram Mastery',
        description: 'NCERT diagrams decoded. Learn to draw, label, and explain each diagram.',
      },
      {
        icon: 'list',
        title: 'Important Points Highlighted',
        description: 'Know exactly what NEET asks. We highlight exam-relevant portions.',
      },
      {
        icon: 'repeat',
        title: 'Revision Techniques',
        description: 'Flowcharts, mind maps, summary sheets. Multiple revision formats.',
      },
      {
        icon: 'clipboard',
        title: 'NCERT-Based MCQs',
        description: 'Practice questions extracted from every NCERT line. Complete coverage.',
      },
      {
        icon: 'award',
        title: 'Proven Results',
        description: 'Our students consistently score 330+ in biology. NCERT mastery works!',
      },
    ],
  },

  faqs: [
    {
      question: 'Is NCERT Biology Class 11 enough for NEET?',
      answer:
        'Yes! 95% of NEET Biology questions are directly from NCERT. Class 11 NCERT covers fundamental topics like Cell Biology, Plant Physiology, and Human Physiology that form 50% of NEET biology. Master NCERT first, then supplement with reference books only if needed.',
    },
    {
      question: 'Which chapters in Class 11 NCERT Biology are most important for NEET?',
      answer:
        'High-weightage Class 11 NCERT chapters: 1) Cell Structure and Function (3-4 questions), 2) Plant Physiology - Photosynthesis, Respiration (4-5 questions), 3) Biological Classification (2-3 questions), 4) Anatomy of Flowering Plants (2-3 questions). We cover all with NEET focus.',
    },
    {
      question: 'How do you teach NCERT Biology Class 11 differently?',
      answer:
        'Our approach: 1) Line-by-line reading with explanation, 2) Diagram drawing sessions, 3) Memory techniques for complex terms, 4) Chapter-end MCQ practice, 5) Doubt resolution. We dont just read NCERT - we help you understand and remember it.',
    },
    {
      question: 'Do you provide NCERT Class 11 Biology notes?',
      answer:
        'Yes! We provide comprehensive NCERT-based notes with: simplified explanations, labeled diagrams, flowcharts, comparison tables, and important points highlighted. These notes are designed for quick revision before exams.',
    },
    {
      question: 'How long does it take to complete NCERT Biology Class 11?',
      answer:
        'Our structured course covers Class 11 NCERT Biology in 5-6 months with thorough understanding. This includes all 22 chapters, diagram practice, MCQ solving, and revision. Rush courses may complete faster but sacrifice depth.',
    },
    {
      question: 'Is online NCERT Biology teaching effective?',
      answer:
        'Absolutely! Our online sessions use digital whiteboard for diagrams, screen sharing for NCERT pages, and interactive Q&A. Many students prefer online as they can replay recordings for revision. 98% of our online students recommend our NCERT teaching.',
    },
  ],

  cta: {
    title: 'Master NCERT Class 11 Biology',
    subtitle: 'Build your NEET foundation right. Expert NCERT guidance awaits.',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses?class=class-11',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free NCERT Resources',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT Biology Class 11 for NEET',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NCERT Biology Class 11 course for NEET preparation with line-by-line explanation and expert guidance.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 2: /ncert-biology-class-12/
export const ncertBiologyClass12: SEOLandingContent = {
  ...ncertBaseContent,
  slug: 'ncert-biology-class-12',
  classLevel: 'class-12',

  title: 'NCERT Biology Class 12 | Complete NEET Preparation',
  metaDescription:
    'Master NCERT Biology Class 12 for NEET success. Genetics, Evolution, Ecology - all NCERT chapters covered. Expert coaching for 12th biology NCERT!',
  keywords: [
    'ncert biology class 12',
    '12 biology ncert',
    'class 12 ncert biology',
    'ncert biology class 12 for neet',
    '12th biology ncert',
    'ncert class 12 biology',
  ],

  hero: {
    headline: 'NCERT Biology Class 12 - The Scoring Chapters',
    subheadline:
      'Genetics, Evolution, Biotechnology - Class 12 NCERT has the most scoring topics. Master them for 340+ in Biology.',
    highlightedText: 'Class 12 NCERT = Highest Weightage in NEET',
    ctaText: 'Start Class 12 Course',
    ctaLink: '/courses?class=class-12',
    backgroundGradient: 'from-indigo-900 to-indigo-800',
  },

  painPoints: {
    title: 'Class 12 NCERT Biology Challenges?',
    points: [
      {
        icon: 'dna',
        question: 'Genetics too complex to grasp?',
        solution:
          'Step-by-step genetics teaching with practice problems. Mendelian to molecular - made simple.',
      },
      {
        icon: 'clock',
        question: 'Board exams + NEET prep overwhelming?',
        solution: 'Our teaching covers both. Same NCERT, optimized for boards AND NEET success.',
      },
      {
        icon: 'trending-up',
        question: 'Evolution and Ecology seem abstract?',
        solution:
          'Visual explanations, real examples, memory techniques. Abstract becomes concrete.',
      },
      {
        icon: 'flask',
        question: 'Biotechnology concepts unclear?',
        solution: 'Step-by-step process explanations with diagrams. Every technique demystified.',
      },
    ],
  },

  benefits: {
    title: 'Class 12 NCERT Biology Excellence',
    subtitle: 'Scoring chapters, expert teaching',
    items: [
      {
        icon: 'dna',
        title: 'Genetics Mastery',
        description:
          'From Mendel to molecular genetics. Complete understanding with problem-solving skills.',
      },
      {
        icon: 'flask',
        title: 'Biotechnology Made Easy',
        description: 'rDNA, PCR, applications - all techniques explained visually and simply.',
      },
      {
        icon: 'globe',
        title: 'Evolution & Ecology',
        description:
          'Theory of evolution, ecological concepts - made memorable with real examples.',
      },
      {
        icon: 'heart',
        title: 'Human Biology',
        description: 'Reproduction, health chapters - complete NCERT coverage for NEET.',
      },
      {
        icon: 'clipboard',
        title: 'Board + NEET Focus',
        description: 'One preparation for both exams. Score high in boards and NEET together.',
      },
      {
        icon: 'award',
        title: 'High Scoring Potential',
        description:
          'Class 12 has most scoring topics. Our students average 170+ from Class 12 portion.',
      },
    ],
  },

  faqs: [
    {
      question: 'How important is Class 12 NCERT for NEET Biology?',
      answer:
        'Class 12 NCERT is crucial! It covers approximately 50% of NEET Biology syllabus including high-weightage topics like Genetics (8-10 questions), Evolution (3-4 questions), Biotechnology (5-6 questions), Ecology (6-8 questions), and Human Reproduction (4-5 questions).',
    },
    {
      question: 'Which Class 12 NCERT chapters are most important for NEET?',
      answer:
        'Top priority chapters: 1) Principles of Inheritance and Variation, 2) Molecular Basis of Inheritance, 3) Biotechnology Principles and Applications, 4) Organisms and Populations, 5) Ecosystem. These 5 chapters alone can give 20+ questions in NEET.',
    },
    {
      question: 'How do you teach Genetics from NCERT Class 12?',
      answer:
        'Our genetics teaching: 1) Mendelian genetics with problem practice, 2) Linkage and crossing over explained visually, 3) Molecular genetics step-by-step, 4) Human genetics and disorders, 5) 100+ genetics problems for practice. We make genetics scoring, not scary.',
    },
    {
      question: 'Can I prepare for boards and NEET together with Class 12 NCERT?',
      answer:
        'Absolutely! NCERT is the common source for both exams. Our teaching style covers NCERT in a way that prepares you for descriptive board questions AND NEET MCQs. Same content, dual preparation.',
    },
    {
      question: 'Do you cover NCERT Exemplar for Class 12 Biology?',
      answer:
        'Yes! NCERT Exemplar problems are included in our practice sets. Exemplar questions are excellent for NEET-level difficulty practice. We solve selected exemplar problems in class and provide complete solutions.',
    },
    {
      question: 'How long to complete Class 12 NCERT Biology for NEET?',
      answer:
        'Thorough coverage: 5-6 months including practice. If already familiar with basics, revision-focused course: 3-4 months. We recommend starting Class 12 preparation along with school for best results.',
    },
  ],

  cta: {
    title: 'Ace Class 12 NCERT Biology',
    subtitle: 'Score 170+ from Class 12 portion. Expert guidance starts here.',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses?class=class-12',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Class 12 Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT Biology Class 12 for NEET',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NCERT Biology Class 12 course for NEET with genetics, evolution, biotechnology, and ecology mastery.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 3: /ncert-fingertips-biology/
export const ncertFingertipsBiology: SEOLandingContent = {
  ...ncertBaseContent,
  slug: 'ncert-fingertips-biology',
  classLevel: 'universal',

  title: 'NCERT at Your Fingertips Biology | Complete NEET MCQ Practice',
  metaDescription:
    'NCERT at Your Fingertips Biology approach for NEET. Every NCERT line converted to MCQs. Comprehensive practice for complete NCERT mastery!',
  keywords: [
    'ncert fingertips biology',
    'ncert at your fingertips biology',
    'biology at your fingertips',
    'ncert fingertips for neet',
    'mtg fingertips biology',
    'fingertips biology pdf',
  ],

  hero: {
    headline: 'NCERT at Your Fingertips - Biology MCQ Mastery',
    subheadline:
      'Every NCERT line, every diagram - converted to MCQs. Practice until perfection. Score 340+ in NEET Biology.',
    highlightedText: 'Complete NCERT MCQ Coverage',
    ctaText: 'Start Practicing',
    ctaLink: '/courses',
    backgroundGradient: 'from-purple-900 via-violet-900 to-indigo-900',
  },

  painPoints: {
    title: 'Reading NCERT But Not Scoring?',
    points: [
      {
        icon: 'book',
        question: 'Read NCERT but cant answer MCQs?',
        solution: 'Our line-by-line MCQ approach converts reading into answering skills.',
      },
      {
        icon: 'target',
        question: 'Dont know if your NCERT prep is complete?',
        solution: 'Comprehensive MCQs from every chapter. Cover every possible question.',
      },
      {
        icon: 'brain',
        question: 'Forget NCERT content quickly?',
        solution: 'MCQ practice reinforces memory. Active recall beats passive reading.',
      },
      {
        icon: 'clock',
        question: 'Running out of practice questions?',
        solution: '10,000+ NCERT-based MCQs. Unlimited practice until perfect.',
      },
    ],
  },

  benefits: {
    title: 'NCERT MCQ Mastery',
    subtitle: 'From reading to scoring',
    items: [
      {
        icon: 'list',
        title: '10,000+ MCQs',
        description: 'Questions from every NCERT line. Complete coverage guaranteed.',
      },
      {
        icon: 'image',
        title: 'Diagram-Based MCQs',
        description: 'NCERT diagram questions. Practice labeling and identification.',
      },
      {
        icon: 'check-circle',
        title: 'Statement-Based MCQs',
        description: 'True/False, assertion-reason. NEET-pattern questions.',
      },
      {
        icon: 'bar-chart',
        title: 'Topic-Wise Analysis',
        description: 'Track your performance. Identify and fix weak areas.',
      },
      {
        icon: 'repeat',
        title: 'Spaced Repetition',
        description: 'Smart revision schedule. Remember NCERT permanently.',
      },
      {
        icon: 'trophy',
        title: 'Mock Tests',
        description: 'Full-length NCERT-based mocks. Simulate NEET experience.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is NCERT at Your Fingertips approach?',
      answer:
        'NCERT at Your Fingertips means converting every line, fact, and diagram of NCERT into answerable MCQs. This approach ensures complete NCERT coverage and trains you to answer any question from the textbook. We follow this philosophy in our teaching and practice materials.',
    },
    {
      question: 'How many MCQs do you provide from NCERT Biology?',
      answer:
        'We provide 10,000+ MCQs covering both Class 11 and Class 12 NCERT Biology. This includes: statement-based MCQs from every chapter, diagram-based questions, assertion-reason questions, and previous year NEET questions mapped to NCERT. Complete coverage!',
    },
    {
      question: 'Is NCERT at Your Fingertips book necessary if I join your course?',
      answer:
        'Our course includes comprehensive MCQ practice that follows the Fingertips philosophy. However, having the book for additional self-practice is beneficial. We focus on quality MCQs with explanations, not just quantity.',
    },
    {
      question: 'How do I practice NCERT MCQs effectively?',
      answer:
        'Effective practice: 1) Read NCERT chapter first, 2) Attempt MCQs without looking at answers, 3) Review wrong answers with NCERT, 4) Retry wrong questions after 3 days, 5) Take chapter tests. This active recall method ensures retention.',
    },
    {
      question: 'Do your MCQs cover all NCERT diagrams?',
      answer:
        'Yes! Every important NCERT diagram is covered with MCQs on: labeling, structure identification, function questions, comparison questions. Diagrams are crucial for NEET - we ensure complete practice.',
    },
    {
      question: 'Are your MCQs updated for latest NEET pattern?',
      answer:
        'Absolutely! Our MCQ bank is updated annually based on latest NEET trends. We analyze each years paper and add similar pattern questions. Statement-based, assertion-reason, and matching questions - all current patterns included.',
    },
  ],

  cta: {
    title: 'Get NCERT at Your Fingertips',
    subtitle: 'Complete MCQ practice. Complete NCERT mastery.',
    primaryButton: {
      text: 'Start MCQ Practice',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Free Demo MCQs',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free MCQ Samples',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT at Your Fingertips Biology',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NCERT Biology MCQ practice with 10,000+ questions covering every line and diagram.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 4: /ncert-exemplar-biology/
export const ncertExemplarBiology: SEOLandingContent = {
  ...ncertBaseContent,
  slug: 'ncert-exemplar-biology',
  classLevel: 'universal',

  title: 'NCERT Exemplar Biology for NEET | Advanced Problem Practice',
  metaDescription:
    'NCERT Exemplar Biology solutions and practice for NEET. Higher-order thinking questions solved by experts. Elevate your NEET preparation!',
  keywords: [
    'ncert exemplar biology',
    'ncert exemplar for neet',
    'ncert exemplar biology class 11',
    'ncert exemplar biology class 12',
    'biology exemplar solutions',
    'exemplar problems biology',
  ],

  hero: {
    headline: 'NCERT Exemplar Biology - Beyond Basic NCERT',
    subheadline:
      'Master higher-order thinking questions. NCERT Exemplar trains you for the toughest NEET questions.',
    highlightedText: 'Exemplar = NEET Difficulty Level',
    ctaText: 'Master Exemplar',
    ctaLink: '/courses',
    backgroundGradient: 'from-orange-900 via-red-900 to-rose-900',
  },

  painPoints: {
    title: 'Basic NCERT Not Enough?',
    points: [
      {
        icon: 'trending-up',
        question: 'Scoring 280-300 but stuck there?',
        solution: 'Exemplar questions build higher-order thinking. Break the 300 barrier.',
      },
      {
        icon: 'help-circle',
        question: 'Tricky NEET questions confusing you?',
        solution: 'Exemplar trains you for application-based questions. No more confusion.',
      },
      {
        icon: 'layers',
        question: 'Need advanced practice beyond basic MCQs?',
        solution: 'Exemplar provides challenging problems that match NEET difficulty.',
      },
      {
        icon: 'target',
        question: 'Want to score 340+ in Biology?',
        solution: 'Top scorers practice Exemplar. Join them with our guided approach.',
      },
    ],
  },

  benefits: {
    title: 'NCERT Exemplar Mastery',
    subtitle: 'Advanced practice for advanced scores',
    items: [
      {
        icon: 'book',
        title: 'Complete Solutions',
        description: 'Every Exemplar problem solved with detailed explanations.',
      },
      {
        icon: 'brain',
        title: 'Higher-Order Thinking',
        description: 'Application-based questions that train analytical skills.',
      },
      {
        icon: 'check-circle',
        title: 'Assertion-Reason Practice',
        description: 'Master A-R questions with Exemplar-style problems.',
      },
      {
        icon: 'layers',
        title: 'Match the Following',
        description: 'Complex matching questions for thorough understanding.',
      },
      {
        icon: 'bar-chart',
        title: 'Case-Based Questions',
        description: 'Data interpretation and case study questions.',
      },
      {
        icon: 'award',
        title: 'NEET-Level Difficulty',
        description: 'Questions that match actual NEET paper difficulty.',
      },
    ],
  },

  faqs: [
    {
      question: 'Is NCERT Exemplar necessary for NEET Biology?',
      answer:
        'NCERT Exemplar is highly recommended for students targeting 300+ in Biology. While basic NCERT covers fundamentals, Exemplar provides higher-order thinking practice essential for tricky NEET questions. Its a must for serious aspirants.',
    },
    {
      question: 'How difficult is NCERT Exemplar compared to NCERT?',
      answer:
        'NCERT Exemplar is significantly more challenging. While NCERT MCQs test recall, Exemplar tests application and analysis. Many Exemplar questions require understanding multiple concepts together. This is exactly what NEET demands.',
    },
    {
      question: 'Do you provide NCERT Exemplar solutions?',
      answer:
        'Yes! We provide complete, detailed solutions for all NCERT Exemplar Biology questions. Each solution explains the concept, the approach, common mistakes to avoid, and related NCERT references. Video solutions available for complex problems.',
    },
    {
      question: 'When should I start NCERT Exemplar practice?',
      answer:
        'Start Exemplar after completing basic NCERT for each unit. For example, after studying Cell Biology from NCERT, attempt Exemplar questions. Dont wait to finish entire syllabus. Topic-wise Exemplar practice is more effective.',
    },
    {
      question: 'How many questions are in NCERT Exemplar Biology?',
      answer:
        'NCERT Exemplar Biology has approximately 400+ questions across Class 11 and 12. This includes MCQs, short answer, and long answer questions. For NEET, focus on MCQs and short answer questions that can be converted to MCQ format.',
    },
    {
      question: 'Are Exemplar questions asked directly in NEET?',
      answer:
        'While exact questions may not appear, Exemplar-style questions frequently appear in NEET. The thinking pattern, complexity level, and application-based approach of Exemplar matches NEET. Practicing Exemplar prepares you for similar NEET questions.',
    },
  ],

  cta: {
    title: 'Master NCERT Exemplar Biology',
    subtitle: 'Elevate your preparation. Score 340+ in Biology.',
    primaryButton: {
      text: 'Join Advanced Course',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Exemplar Solutions',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT Exemplar Biology for NEET',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NCERT Exemplar Biology solutions and practice for advanced NEET preparation.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 5: /ncert-biology-notes-class-11/
export const ncertBiologyNotesClass11: SEOLandingContent = {
  ...ncertBaseContent,
  slug: 'ncert-biology-notes-class-11',
  classLevel: 'class-11',

  title: 'NCERT Biology Notes Class 11 | Best Study Material for NEET',
  metaDescription:
    'Download Class 11 NCERT Biology notes for NEET. Chapter-wise notes with diagrams, flowcharts, and key points. Free and comprehensive!',
  keywords: [
    'ncert biology notes class 11',
    'biology notes class 11',
    'class 11 biology notes for neet',
    '11th biology notes',
    'ncert notes biology class 11',
    'class 11 bio notes',
  ],

  hero: {
    headline: 'Class 11 Biology Notes - Complete NCERT Coverage',
    subheadline:
      'Simplified notes with diagrams, flowcharts, and key points. Perfect for revision and quick learning.',
    highlightedText: 'NCERT Simplified, Made Memorable',
    ctaText: 'Access Notes Course',
    ctaLink: '/courses?class=class-11',
    backgroundGradient: 'from-cyan-900 via-green-800 to-green-800',
  },

  painPoints: {
    title: 'Struggling with Class 11 NCERT?',
    points: [
      {
        icon: 'book',
        question: 'NCERT text too long and complex?',
        solution: 'Our notes simplify every chapter into digestible points with clarity.',
      },
      {
        icon: 'clock',
        question: 'No time for lengthy revision?',
        solution: 'Quick revision notes cover entire chapter in 15-20 minutes.',
      },
      {
        icon: 'image',
        question: 'Cant draw NCERT diagrams accurately?',
        solution: 'Step-by-step diagram guides with labeled illustrations.',
      },
      {
        icon: 'brain',
        question: 'Forgetting what you studied?',
        solution: 'Memory techniques, mnemonics, and flowcharts for permanent retention.',
      },
    ],
  },

  benefits: {
    title: 'What Our Class 11 Notes Include',
    subtitle: 'Complete NCERT, simplified format',
    items: [
      {
        icon: 'file-text',
        title: 'Chapter Summaries',
        description: 'Every chapter condensed into key points without losing important details.',
      },
      {
        icon: 'image',
        title: 'All NCERT Diagrams',
        description: 'Every important diagram redrawn with labels and explanations.',
      },
      {
        icon: 'git-branch',
        title: 'Flowcharts',
        description: 'Complex processes simplified into easy-to-follow flowcharts.',
      },
      {
        icon: 'table',
        title: 'Comparison Tables',
        description: 'Differences and comparisons in tabular format for easy memory.',
      },
      {
        icon: 'star',
        title: 'Key Points Highlighted',
        description: 'Important facts, definitions, and exam-relevant points marked.',
      },
      {
        icon: 'download',
        title: 'PDF Downloads',
        description: 'All notes available for download. Study offline anytime.',
      },
    ],
  },

  faqs: [
    {
      question: 'Are your Class 11 Biology notes based on latest NCERT?',
      answer:
        'Yes! Our notes are updated for the latest NCERT Biology Class 11 textbook. Any changes in NCERT syllabus or content are immediately reflected. We ensure 100% alignment with current NCERT.',
    },
    {
      question: 'Do notes cover all 22 chapters of Class 11 Biology?',
      answer:
        'Absolutely! All 22 chapters from Unit 1 (Diversity of Living Organisms) to Unit 5 (Plant Physiology) are covered. Each chapter has dedicated notes with all important concepts, diagrams, and key points.',
    },
    {
      question: 'Can I prepare for NEET using only these notes?',
      answer:
        'Notes are excellent for revision and quick understanding. However, we recommend reading NCERT first, then using notes for revision. For complete NEET prep, join our course which includes notes, MCQ practice, and live teaching.',
    },
    {
      question: 'Do you provide free Biology notes for Class 11?',
      answer:
        'Yes! Sample notes for select chapters are available free on our resources page. Complete chapter-wise notes are part of our course package. Free sample gives you an idea of our notes quality.',
    },
    {
      question: 'How are your notes different from others available online?',
      answer:
        'Our notes are: 1) Written by NEET experts (not just teachers), 2) Include NEET-specific important points, 3) Have properly drawn diagrams (not copied images), 4) Updated for latest patterns, 5) Include memory techniques unique to our teaching.',
    },
    {
      question: 'Can I get printed notes or only PDF?',
      answer:
        'We provide digital PDF notes that you can print yourself. Digital format allows easy updates and searchability. Course students also get access to our notes app for mobile studying.',
    },
  ],

  cta: {
    title: 'Get Class 11 Biology Notes',
    subtitle: 'Complete NCERT notes with diagrams and flowcharts.',
    primaryButton: {
      text: 'Join Full Course',
      link: '/courses?class=class-11',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Sample Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT Biology Notes Class 11',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete Class 11 NCERT Biology notes with diagrams, flowcharts, and key points for NEET preparation.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 6: /ncert-biology-notes-class-12/
export const ncertBiologyNotesClass12: SEOLandingContent = {
  ...ncertBaseContent,
  slug: 'ncert-biology-notes-class-12',
  classLevel: 'class-12',

  title: 'NCERT Biology Notes Class 12 | Complete NEET Study Material',
  metaDescription:
    'Class 12 NCERT Biology notes with genetics, evolution, ecology. Complete notes with diagrams for NEET and board exams!',
  keywords: [
    'ncert biology notes class 12',
    'biology notes class 12',
    '12th biology notes',
    'class 12 biology notes for neet',
    'ncert notes biology class 12',
    'class 12 bio notes pdf',
  ],

  hero: {
    headline: 'Class 12 Biology Notes - Score 170+ in NEET',
    subheadline:
      'Genetics, Evolution, Biotechnology, Ecology - all high-weightage chapters simplified with expert notes.',
    highlightedText: 'Class 12 = 50% of NEET Biology',
    ctaText: 'Access Class 12 Notes',
    ctaLink: '/courses?class=class-12',
    backgroundGradient: 'bg-indigo-700',
  },

  painPoints: {
    title: 'Class 12 Biology Challenges?',
    points: [
      {
        icon: 'dna',
        question: 'Genetics chapters overwhelming?',
        solution: 'Our notes simplify inheritance, molecular biology with clear explanations.',
      },
      {
        icon: 'clock',
        question: 'Boards + NEET revision impossible?',
        solution: 'Same notes work for both! Board-pattern + NEET-focus combined.',
      },
      {
        icon: 'globe',
        question: 'Ecology seems too factual?',
        solution: 'Structured notes make ecology memorable with diagrams and examples.',
      },
      {
        icon: 'flask',
        question: 'Biotechnology processes confusing?',
        solution: 'Step-by-step flowcharts for every technique. Crystal clear.',
      },
    ],
  },

  benefits: {
    title: 'Class 12 Notes Features',
    subtitle: 'High-scoring chapters, perfect notes',
    items: [
      {
        icon: 'dna',
        title: 'Genetics Simplified',
        description: 'Inheritance patterns, molecular genetics - all with solved examples.',
      },
      {
        icon: 'flask',
        title: 'Biotechnology Flowcharts',
        description: 'Every technique in flowchart format. Easy to understand and remember.',
      },
      {
        icon: 'trending-up',
        title: 'Evolution Made Clear',
        description: 'Theory, evidence, mechanisms - organized for quick revision.',
      },
      {
        icon: 'globe',
        title: 'Ecology Structured',
        description: 'Population, ecosystem, biodiversity - tabulated and diagrammed.',
      },
      {
        icon: 'heart',
        title: 'Human Biology',
        description: 'Reproduction, health - complete coverage with diagrams.',
      },
      {
        icon: 'file-text',
        title: 'Board Exam Ready',
        description: 'Notes format suitable for descriptive board answers too.',
      },
    ],
  },

  faqs: [
    {
      question: 'Do Class 12 notes cover both boards and NEET?',
      answer:
        'Yes! Our Class 12 Biology notes are designed for dual purpose. They cover all NCERT content required for boards and include additional NEET-specific points, MCQ-oriented facts, and diagrams. One notes set, two exam preparations.',
    },
    {
      question: 'Which Class 12 chapters have maximum NEET weightage?',
      answer:
        'High-weightage chapters: 1) Genetics (10-12 questions), 2) Biotechnology (5-6 questions), 3) Ecology (6-8 questions), 4) Evolution (3-4 questions). Our notes give extra depth to these scoring chapters.',
    },
    {
      question: 'Are genetics problem solutions included in notes?',
      answer:
        'Yes! Our genetics notes include solved examples for all types of problems - monohybrid, dihybrid, linkage, pedigree analysis. Step-by-step solutions help you understand the approach.',
    },
    {
      question: 'Do you have separate notes for Biology Investigatory Project?',
      answer:
        'Our notes focus on theory for NEET. However, course students get guidance on investigatory projects. The ecology and biotechnology chapters notes can help with project research.',
    },
    {
      question: 'When should I start using Class 12 Biology notes?',
      answer:
        'Start from Day 1 of Class 12! Use notes alongside school teaching. After each chapter in school, revise from our notes. This keeps you NEET-ready throughout the year.',
    },
    {
      question: 'Are Class 12 notes available chapter-wise?',
      answer:
        'Yes! Notes are organized unit-wise and chapter-wise. You can study chapters in any order based on your school syllabus. Each chapter is complete and self-contained.',
    },
  ],

  cta: {
    title: 'Get Class 12 Biology Notes',
    subtitle: 'Complete notes for boards and NEET success.',
    primaryButton: {
      text: 'Join Full Course',
      link: '/courses?class=class-12',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Sample Notes',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT Biology Notes Class 12',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete Class 12 NCERT Biology notes with genetics, evolution, biotechnology, and ecology for NEET.',
    duration: 'P6M',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 7: /ncert-biology-solutions/
export const ncertBiologySolutions: SEOLandingContent = {
  ...ncertBaseContent,
  slug: 'ncert-biology-solutions',
  classLevel: 'universal',

  title: 'NCERT Biology Solutions | Complete Textbook Answers for NEET',
  metaDescription:
    'NCERT Biology solutions for Class 11 & 12. All exercise questions answered with detailed explanations. NCERT nichod biology approach!',
  keywords: [
    'ncert biology solutions',
    'ncert solutions biology',
    'ncert nichod biology',
    'biology ncert solutions class 11',
    'biology ncert solutions class 12',
    'ncert biology answers',
  ],

  hero: {
    headline: 'NCERT Biology Solutions - Every Question Answered',
    subheadline:
      'Complete solutions for all NCERT textbook questions. Understand the "why" behind every answer.',
    highlightedText: 'NCERT Nichod - Extract Every Mark',
    ctaText: 'Access All Solutions',
    ctaLink: '/courses',
    backgroundGradient: 'from-yellow-900 via-orange-900 to-red-900',
  },

  painPoints: {
    title: 'Stuck on NCERT Questions?',
    points: [
      {
        icon: 'help-circle',
        question: 'NCERT exercise questions seem tough?',
        solution: 'Every question solved with step-by-step explanation. No confusion.',
      },
      {
        icon: 'book',
        question: 'In-text questions left unsolved?',
        solution: 'We cover all in-text questions too. Complete chapter coverage.',
      },
      {
        icon: 'check-circle',
        question: 'Not sure if your answers are correct?',
        solution: 'Compare with model answers. Learn the right way to frame responses.',
      },
      {
        icon: 'award',
        question: 'Want board-perfect answers?',
        solution: 'Our solutions are written for maximum marks. Learn the scoring format.',
      },
    ],
  },

  benefits: {
    title: 'Complete NCERT Solutions',
    subtitle: 'Every question, perfect answer',
    items: [
      {
        icon: 'check-circle',
        title: 'All Exercises Solved',
        description: 'Every back-of-chapter question answered comprehensively.',
      },
      {
        icon: 'file-text',
        title: 'In-Text Questions',
        description: 'Questions within chapters also solved. Nothing left out.',
      },
      {
        icon: 'image',
        title: 'Diagram-Based Answers',
        description: 'Questions requiring diagrams answered with proper illustrations.',
      },
      {
        icon: 'clipboard',
        title: 'Board Exam Format',
        description: 'Answers formatted for maximum marks in board exams.',
      },
      {
        icon: 'lightbulb',
        title: 'Concept Explanations',
        description: 'Not just answers - explanations help understand concepts.',
      },
      {
        icon: 'link',
        title: 'NEET Connections',
        description: 'MCQs from these concepts highlighted for NEET awareness.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is NCERT Nichod approach?',
      answer:
        'NCERT Nichod (extracting essence of NCERT) means understanding every line, solving every question, and mastering every concept from NCERT. Our solutions follow this philosophy - complete coverage, deep understanding, maximum marks.',
    },
    {
      question: 'Do you provide solutions for both Class 11 and 12 NCERT Biology?',
      answer:
        'Yes! Complete solutions for all chapters of Class 11 (22 chapters) and Class 12 (16 chapters) NCERT Biology. Both in-text and exercise questions covered for each chapter.',
    },
    {
      question: 'Are NCERT solutions enough for NEET preparation?',
      answer:
        'NCERT solutions build conceptual foundation and help in boards. For NEET, you also need MCQ practice. Our course combines NCERT solutions with extensive MCQ practice for complete preparation.',
    },
    {
      question: 'How are your solutions different from free online solutions?',
      answer:
        'Our solutions: 1) Written by NEET experts, 2) Include exam-focused points, 3) Have properly drawn diagrams, 4) Show NEET-relevant concepts, 5) Updated for latest NCERT. Quality and accuracy guaranteed.',
    },
    {
      question: 'Do solutions include diagram answers?',
      answer:
        'Yes! All questions requiring diagrams have properly drawn, labeled illustrations. We show step-by-step how to draw each diagram for maximum marks in exams.',
    },
    {
      question: 'Can I use these solutions for board exam preparation?',
      answer:
        'Absolutely! Our solutions are formatted for board exam answer writing. They include all points expected in descriptive answers. Perfect for both understanding and exam preparation.',
    },
  ],

  cta: {
    title: 'Get Complete NCERT Solutions',
    subtitle: 'Every question answered. Every concept explained.',
    primaryButton: {
      text: 'Access All Solutions',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Sample Solutions',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT Biology Solutions',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NCERT Biology solutions for Class 11 and 12 with detailed explanations and diagrams.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Page 8: /ncert-punch-biology/
export const ncertPunchBiology: SEOLandingContent = {
  ...ncertBaseContent,
  slug: 'ncert-punch-biology',
  classLevel: 'universal',

  title: 'NCERT Punch Biology | High-Yield Facts for NEET',
  metaDescription:
    'NCERT Punch Biology - Important facts, one-liners, and high-yield points for NEET. Quick revision material for Biology toppers!',
  keywords: [
    'ncert punch biology',
    'ncert punch pw',
    'biology punch for neet',
    'ncert one liners biology',
    'high yield facts biology neet',
    'ncert punch notes',
  ],

  hero: {
    headline: 'NCERT Punch - High-Yield Biology Facts',
    subheadline:
      'Important one-liners, facts, and punch points that appear repeatedly in NEET. Quick revision, maximum marks.',
    highlightedText: 'Punch Points = Sure-Shot Questions',
    ctaText: 'Get Punch Material',
    ctaLink: '/courses',
    backgroundGradient: 'from-rose-900 via-pink-900 to-fuchsia-900',
  },

  painPoints: {
    title: 'Last-Minute Revision Panic?',
    points: [
      {
        icon: 'clock',
        question: 'No time to revise entire NCERT?',
        solution: 'Punch points cover all important facts in minimum time.',
      },
      {
        icon: 'target',
        question: 'Dont know what to focus on?',
        solution: 'High-yield points that appear repeatedly in NEET identified.',
      },
      {
        icon: 'brain',
        question: 'Too many facts to remember?',
        solution: 'Organized punch lists make memorization systematic and easy.',
      },
      {
        icon: 'award',
        question: 'Want to score those extra marks?',
        solution: 'Factual questions need instant recall. Punch prep ensures it.',
      },
    ],
  },

  benefits: {
    title: 'NCERT Punch Features',
    subtitle: 'High-yield points for high scores',
    items: [
      {
        icon: 'zap',
        title: 'Quick Facts',
        description: 'One-liner facts from every chapter. Perfect for rapid revision.',
      },
      {
        icon: 'list',
        title: 'Organized by Chapter',
        description: 'Topic-wise punch points for systematic revision.',
      },
      {
        icon: 'repeat',
        title: 'NEET Repeated Facts',
        description: 'Facts that appeared multiple times in previous years marked.',
      },
      {
        icon: 'star',
        title: 'High-Yield Points',
        description: 'Most important facts prioritized based on exam analysis.',
      },
      {
        icon: 'file-text',
        title: 'Printable Format',
        description: 'Compact format perfect for carrying and last-minute revision.',
      },
      {
        icon: 'check-circle',
        title: 'Self-Test Lists',
        description: 'Checklist format to test yourself before exam.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is NCERT Punch in Biology?',
      answer:
        'NCERT Punch refers to high-yield, important facts and one-liners extracted from NCERT that frequently appear in NEET. These are the "punch points" that can make or break your Biology score. Quick to revise, easy to remember, maximum marks!',
    },
    {
      question: 'How many punch points do you provide?',
      answer:
        'We provide 1000+ carefully curated punch points covering both Class 11 and 12 NCERT Biology. Each point is selected based on NEET previous year analysis and importance in the syllabus.',
    },
    {
      question: 'When should I use NCERT Punch material?',
      answer:
        'Use punch material for: 1) Quick revision before tests, 2) Last 30 days before NEET, 3) Between subjects during exam day prep, 4) Regular revision to retain facts. Not for first-time learning - use after completing NCERT.',
    },
    {
      question: 'Is NCERT Punch PW same as your punch material?',
      answer:
        'While concept is similar, our punch material is independently curated by our NEET expert faculty. We focus on facts that actually appear in NEET based on our 15+ years of paper analysis.',
    },
    {
      question: 'Do punch points cover diagrams?',
      answer:
        'Yes! We include diagram-related facts like: labeling points, structural facts, functional facts from diagrams. These are high-yield because many NEET questions test diagram knowledge.',
    },
    {
      question: 'Can I score 300+ just with punch revision?',
      answer:
        'Punch material is for revision, not learning. You need conceptual understanding first (from NCERT + our teaching), then punch points help in quick revision and fact retention. Combined approach gives 300+!',
    },
  ],

  cta: {
    title: 'Get NCERT Punch Biology',
    subtitle: '1000+ high-yield facts for NEET success.',
    primaryButton: {
      text: 'Join Full Course',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
    tertiaryButton: {
      text: 'Free Punch Samples',
      link: '/resources',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT Punch Biology',
    provider: 'Cerebrum Biology Academy',
    description:
      'High-yield NCERT Biology facts and one-liners for quick NEET revision and maximum marks.',
    duration: 'P1Y',
    price: 67500,
    priceCurrency: 'INR',
  },
}

// Export all NCERT pages
export const ncertSEOPages: Record<string, SEOLandingContent> = {
  'ncert-biology-class-11': ncertBiologyClass11,
  'ncert-biology-class-12': ncertBiologyClass12,
  'ncert-fingertips-biology': ncertFingertipsBiology,
  'ncert-exemplar-biology': ncertExemplarBiology,
  'ncert-biology-notes-class-11': ncertBiologyNotesClass11,
  'ncert-biology-notes-class-12': ncertBiologyNotesClass12,
  'ncert-biology-solutions': ncertBiologySolutions,
  'ncert-punch-biology': ncertPunchBiology,
}
