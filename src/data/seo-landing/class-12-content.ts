import { SEOLandingContent } from './types'

// Base content for Class 12 pages
const class12BaseContent = {
  classLevel: 'class-12' as const,
  stats: [
    { value: '98%', label: 'Success Rate', icon: 'trophy' },
    { value: '340+', label: 'Avg NEET Score', icon: 'target' },
    { value: '3,200+', label: 'Students Trained', icon: 'users' },
    { value: '65+', label: 'AIIMS Selections', icon: 'award' },
  ],
  testimonials: [
    {
      name: 'Aditya Kumar',
      achievement: 'AIR 156 | AIIMS Delhi',
      quote:
        "Class 12 at Cerebrum was intense but perfectly paced. Dr. Shekhar's revision strategy for Genetics and Ecology helped me score 350 in NEET Biology!",
      score: '350/360',
    },
    {
      name: 'Sneha Patel',
      achievement: 'AIR 289 | MAMC Delhi',
      quote:
        'The board + NEET integrated approach was perfect. Scored 98% in boards and 342 in NEET Biology. Both dreams fulfilled!',
      score: '342/360',
    },
    {
      name: 'Vikram Reddy',
      achievement: 'AIR 445 | JIPMER',
      quote:
        'Joined Cerebrum in Class 12. The crash course plus regular batch combination helped me cover gaps and top NEET.',
      score: '338/360',
    },
  ],
  courseSummary: {
    title: 'Class 12 NEET Biology Course',
    duration: '1 Year (April - March)',
    batchSize: '10-12 Students',
    features: [
      'Live interactive classes 5 days/week',
      'Complete NCERT + NEET coverage',
      'Board exam special preparation',
      'Weekly tests & NEET mock tests',
      'Personal mentorship from Dr. Shekhar',
      'Pre-board & pre-NEET crash course included',
    ],
    price: {
      original: 95000,
      discounted: 85000,
      emi: '₹4,000/month',
    },
  },
  relatedPages: [
    { title: 'Class 11 NEET Course', link: '/class-11' },
    { title: 'NEET Dropper Course', link: '/courses/neet-dropper' },
    { title: 'Compare All Courses', link: '/courses/compare' },
    { title: 'Success Stories', link: '/success-stories' },
  ],
}

// Page 1: /neet-biology-coaching-class-12/
export const neetBiologyCoachingClass12: SEOLandingContent = {
  ...class12BaseContent,
  slug: 'neet-biology-coaching-class-12',

  title: 'NEET Biology Coaching for Class 12 | Final Year Preparation',
  metaDescription:
    "Join India's top NEET biology coaching for Class 12. Intensive preparation by AIIMS faculty, board + NEET integration, 98% success rate. Secure your seat now!",
  keywords: [
    'NEET biology coaching class 12',
    'class 12 NEET online classes',
    'NEET biology classes for class 12',
    'online NEET coaching class 12',
    'best NEET biology coaching class 12',
  ],

  hero: {
    headline: 'Class 12: Your Final Shot at NEET',
    subheadline:
      'Make every day count with intensive NEET Biology coaching. Join 3,200+ students who achieved their medical dreams.',
    highlightedText: 'The Next 12 Months Decide Your Future',
    ctaText: 'View Complete Course Details',
    ctaLink: '/class-12',
    backgroundGradient: 'from-indigo-900 to-indigo-800',
  },

  painPoints: {
    title: 'Class 12 Challenges We Solve',
    points: [
      {
        icon: 'layers',
        question: 'Overwhelmed by syllabus + boards + NEET pressure?',
        solution:
          'Our integrated approach handles all three. Strategic planning ensures nothing is missed.',
      },
      {
        icon: 'clock',
        question: 'Running out of time to cover everything?',
        solution:
          'Optimized curriculum with smart revision techniques. Complete syllabus + 3 revisions before NEET.',
      },
      {
        icon: 'target',
        question: 'Class 11 concepts still shaky?',
        solution:
          'Parallel Class 11 revision included. Strengthen foundation while covering Class 12.',
      },
      {
        icon: 'bar-chart-2',
        question: 'Mock test scores not improving?',
        solution: 'Personalized analysis after every test. Targeted improvement on weak areas.',
      },
    ],
  },

  benefits: {
    title: 'Why Cerebrum for Class 12 NEET?',
    subtitle: 'The final year that makes all the difference',
    items: [
      {
        icon: 'zap',
        title: 'Intensive 5-Day Schedule',
        description:
          'More classes, more practice, more doubt solving. Utilize Class 12 year to the fullest.',
      },
      {
        icon: 'refresh-cw',
        title: 'Class 11 Parallel Revision',
        description:
          'Dedicated sessions to revise and strengthen Class 11 topics that appear in NEET.',
      },
      {
        icon: 'file-text',
        title: 'Board + NEET Integration',
        description:
          'Score 95%+ in boards while achieving 320+ in NEET Biology. Both goals, one approach.',
      },
      {
        icon: 'bar-chart',
        title: 'Weekly Mock Tests',
        description: 'NEET pattern tests every week with detailed analysis and ranking.',
      },
      {
        icon: 'clock',
        title: 'Pre-Board Crash Course',
        description: 'Special board exam preparation included. Previous year board papers solved.',
      },
      {
        icon: 'award',
        title: 'Pre-NEET Grand Test Series',
        description: '20+ full syllabus tests in the months before NEET. AIR prediction included.',
      },
    ],
  },

  faqs: [
    {
      question: 'Is it too late to start NEET Biology coaching in Class 12?',
      answer:
        'Not at all! Many of our toppers started serious preparation in Class 12. With focused effort and proper guidance, Class 12 is enough time to crack NEET. Our intensive course is designed specifically for students starting in Class 12.',
    },
    {
      question: 'How to manage Class 12 boards and NEET preparation together?',
      answer:
        'Our course is designed for this exact challenge. We cover NCERT thoroughly (essential for boards), add NEET-level depth, and include dedicated board exam prep sessions. Most students score 90%+ in boards while preparing for NEET with us.',
    },
    {
      question: 'What is the Class 12 NEET Biology syllabus?',
      answer:
        'Class 12 NEET Biology includes: Reproduction (4-5 questions), Genetics & Evolution (8-10 questions), Biology & Human Welfare (4-5 questions), Biotechnology (4-5 questions), and Ecology (6-8 questions). This constitutes 50-55% of NEET Biology marks.',
    },
    {
      question: 'Which Class 12 Biology chapters are most important for NEET?',
      answer:
        'Genetics and Molecular Biology are the highest weightage chapters. Principles of Inheritance, Molecular Basis of Inheritance, and Human Reproduction are the most important. Ecology chapters are also high-scoring and easier to master.',
    },
    {
      question: 'How do you cover Class 11 topics in Class 12 batch?',
      answer:
        "We have dedicated Class 11 revision sessions every week. Additionally, topics like Cell Biology and Human Physiology are integrated with Class 12 topics. Separate Class 11 practice tests ensure you don't lose those marks.",
    },
    {
      question: 'What is the fee for Class 12 NEET Biology coaching?',
      answer:
        'Our Class 12 NEET Biology courses range from ₹30,000 (Pursuit) to ₹85,000 (Pinnacle) for the full year. This includes board prep, NEET prep, mock tests, and study material. EMI options starting at ₹4,000/month are available.',
    },
  ],

  cta: {
    title: 'Make Class 12 Count',
    subtitle: 'Your final year, your best chance. Join 3,200+ successful NEET qualifiers.',
    primaryButton: {
      text: 'View Course & Pricing',
      link: '/class-12',
    },
    secondaryButton: {
      text: 'Book Free Demo Class',
      link: '/book-demo?class=class-12',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Class 12 NEET Biology: High-Yield Chapters That Decide Your Rank',
        body: 'Class 12 Biology contributes approximately 50 percent of NEET Biology questions, and certain chapters carry disproportionate weight. Genetics alone, spanning Principles of Inheritance and Variation plus Molecular Basis of Inheritance, accounts for 8 to 12 questions per paper. Students must master Mendelian ratios, dihybrid crosses, sex-linked inheritance, pedigree analysis, DNA replication, transcription, translation, and the lac operon. Human Reproduction and Reproductive Health together contribute 5 to 7 questions, covering gametogenesis, embryo development, contraception, and assisted reproductive technologies. Ecology, including organisms and populations, ecosystems, and biodiversity, yields another 6 to 8 questions and is considered one of the easiest scoring sections. Biotechnology, covering both principles and applications such as recombinant DNA technology, PCR, and transgenic organisms, adds 4 to 5 questions. Understanding this weightage allows students to prioritise their revision calendar strategically.',
      },
      {
        heading: 'Integrating Class 11 Revision with Class 12 Preparation',
        body: 'A common pitfall for Class 12 NEET aspirants is neglecting Class 11 material while focusing on new chapters. This is dangerous because NEET tests both years equally, and Class 11 concepts frequently underpin Class 12 topics. For example, understanding cell division from Class 11 is essential for grasping meiosis-linked genetic variation in Class 12 Genetics. Similarly, knowledge of neural control from Class 11 Human Physiology connects directly to reproductive neuroendocrine regulation in Class 12. Effective coaching programs schedule parallel Class 11 revision sessions, typically one to two sessions per week, ensuring that previously learned material remains fresh. Weekly cumulative tests that mix Class 11 and Class 12 questions train students to switch between topics quickly, mimicking the actual NEET paper structure where questions from different chapters appear in random order.',
      },
      {
        heading: 'Evolution and Ecology: The Scoring Chapters Students Underestimate',
        body: 'Evolution and Ecology are often treated as secondary topics by students who pour all their energy into Genetics and Reproduction. This is a strategic error. Together, these chapters contribute 8 to 10 questions in NEET and are largely factual, meaning they reward thorough reading of NCERT rather than deep problem-solving. Evolution covers origin of life, adaptive radiation, Hardy-Weinberg equilibrium, and evidences of evolution. Ecology spans population attributes, ecological pyramids, nutrient cycling, succession, and biodiversity conservation. The concepts in these chapters are relatively straightforward compared to the analytical demands of Genetics, making them reliable sources of marks for students who revise them methodically. A strong coaching program treats these chapters as guaranteed-score zones and ensures students can answer related MCQs with near-perfect accuracy.',
      },
    ],
    comparisonTable: [
      { Aspect: 'NEET Questions', 'Genetics & Molecular Biology': '8-12 questions', 'Ecology & Environment': '6-8 questions', 'Reproduction': '5-7 questions' },
      { Aspect: 'Difficulty Level', 'Genetics & Molecular Biology': 'High (analytical)', 'Ecology & Environment': 'Low-Medium (factual)', 'Reproduction': 'Medium (conceptual)' },
      { Aspect: 'Study Time Needed', 'Genetics & Molecular Biology': '40-50 hours', 'Ecology & Environment': '20-25 hours', 'Reproduction': '25-30 hours' },
      { Aspect: 'Scoring Potential', 'Genetics & Molecular Biology': 'High but requires practice', 'Ecology & Environment': 'High with NCERT mastery', 'Reproduction': 'High with diagram focus' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'Class 12 NEET Biology Coaching',
    provider: 'Cerebrum Biology Academy',
    description:
      'Comprehensive NEET Biology preparation for Class 12 with board integration, intensive coaching, and proven results.',
    duration: 'P1Y',
    price: 85000,
    priceCurrency: 'INR',
  },
}

// Page 2: /class-12-biology-tuition-online/
export const class12BiologyTuitionOnline: SEOLandingContent = {
  ...class12BaseContent,
  slug: 'class-12-biology-tuition-online',

  title: 'Class 12 Biology Tuition Online | Board + NEET Integrated',
  metaDescription:
    'Expert Class 12 Biology tuition online from AIIMS faculty. Board + NEET integrated approach, live classes, complete syllabus coverage. Limited seats!',
  keywords: [
    'class 12 biology tuition online',
    'biology tuition for NEET class 12',
    'online biology tuition class 12',
    'class 12 biology coaching online',
    'biology tutor class 12 NEET',
  ],

  hero: {
    headline: 'Class 12 Biology Tuition That Covers Everything',
    subheadline:
      'Board exams + NEET + conceptual clarity. All in one comprehensive tuition program.',
    highlightedText: 'One Tuition, Two Goals Achieved',
    ctaText: 'Explore Our Approach',
    ctaLink: '/class-12',
    backgroundGradient: 'from-green-800 via-green-800 to-cyan-900',
  },

  painPoints: {
    title: 'Why You Need Expert Class 12 Tuition',
    points: [
      {
        icon: 'split',
        question: 'Separate tuition for boards and NEET?',
        solution:
          'One integrated tuition that prepares you for both. Save time, save money, get better results.',
      },
      {
        icon: 'map-pin',
        question: "Can't find quality tuition in your city?",
        solution:
          "Access India's best biology faculty online. Same quality as top Kota institutes.",
      },
      {
        icon: 'users',
        question: 'Tuition centers with 50+ students per batch?',
        solution: 'Our online batches have only 10-12 students. Personal attention guaranteed.',
      },
      {
        icon: 'x-circle',
        question: "Tutor who can't answer NEET-level questions?",
        solution: 'Learn from AIIMS alumni who understand exactly what NEET demands.',
      },
    ],
  },

  benefits: {
    title: 'The Complete Tuition Solution',
    subtitle: 'Everything Class 12 Biology demands, delivered online',
    items: [
      {
        icon: 'video',
        title: 'Live Interactive Classes',
        description:
          'Real teaching, real interaction. Not pre-recorded videos. Ask doubts in real-time.',
      },
      {
        icon: 'book',
        title: 'NCERT Line-by-Line',
        description: 'Complete NCERT coverage for boards. Every diagram, every table explained.',
      },
      {
        icon: 'trending-up',
        title: 'NEET-Level Depth',
        description: 'Go beyond NCERT for competitive edge. PYQ practice included in every topic.',
      },
      {
        icon: 'calendar',
        title: 'Exam-Aligned Schedule',
        description: 'Syllabus completion timed with school exams. Never feel left behind.',
      },
      {
        icon: 'file',
        title: 'Complete Study Material',
        description: 'Digital notes, question banks, previous year papers. All included.',
      },
      {
        icon: 'phone',
        title: 'WhatsApp Support',
        description: '24/7 doubt solving. Never stay stuck on a concept.',
      },
    ],
  },

  faqs: [
    {
      question: 'How is online tuition for Class 12 Biology structured?',
      answer:
        'Our online tuition includes 5 live sessions per week (2 hours each), covering both Class 12 syllabus and Class 11 revision. Weekly tests, monthly mocks, and daily doubt solving sessions are part of the program. Everything is scheduled to align with school academics.',
    },
    {
      question: 'What are the timings for Class 12 biology tuition?',
      answer:
        'We offer multiple batch timings: Morning (6-8 AM), Afternoon (4-6 PM), and Evening (7-9 PM). Weekend batches available for revision classes. Choose the slot that fits your school schedule.',
    },
    {
      question: 'Will this tuition help me score well in board exams?',
      answer:
        'Absolutely! Our NCERT-focused approach is perfect for board exams. Students in our tuition consistently score 90-98% in CBSE Class 12 Biology. Board exam paper solving is a dedicated part of our curriculum.',
    },
    {
      question: 'Is there separate board exam preparation?',
      answer:
        'Yes! We include pre-board crash courses, sample paper solving sessions, and chapter-wise board pattern questions. Our students are fully prepared for the CBSE board exam pattern.',
    },
    {
      question: 'How do you handle doubts in online tuition?',
      answer:
        'Multiple channels: Live doubts during class, dedicated doubt sessions twice a week, 24/7 WhatsApp group with teaching assistants, and one-on-one sessions with Dr. Shekhar for Pinnacle batch students.',
    },
    {
      question: 'What is the fee for Class 12 biology online tuition?',
      answer:
        'Our Class 12 biology tuition ranges from ₹30,000 to ₹85,000 for the full year, depending on batch type. This covers board prep, NEET prep, all study material, and test series. EMI at ₹4,000/month available.',
    },
  ],

  cta: {
    title: 'Complete Class 12 Biology Solution',
    subtitle: 'Board + NEET in one tuition. Book a free demo today.',
    primaryButton: {
      text: 'View Pricing & Batches',
      link: '/class-12',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo?class=class-12',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'How Online Tuition Solves the Class 12 Time Crunch',
        body: 'Class 12 is the most time-constrained year for any NEET aspirant. Students must complete the Class 12 syllabus, revise Class 11, prepare for board exams, and peak for NEET, all within roughly twelve months. Online tuition addresses this squeeze by eliminating commute time, typically saving students one to two hours daily that can be redirected to self-study or practice tests. Recorded sessions allow students to revisit complex topics like DNA fingerprinting or ecological succession without waiting for the next class. The flexibility to attend from any location means that even during board exam season, when students might be studying at a relative\'s home or a library, their NEET preparation does not pause. For Class 12 students, where every hour counts, the efficiency gains of online tuition compound into a measurable score advantage.',
      },
      {
        heading: 'Board and NEET Dual Preparation: The Integrated Online Approach',
        body: 'The CBSE board exam and NEET share approximately 90 percent of their Biology syllabus, both being rooted in NCERT. However, the question formats differ significantly: boards test descriptive recall and diagram drawing, while NEET tests conceptual application through MCQs. Effective online tuition teaches each chapter at two levels. The first pass covers NCERT line by line, addressing board-pattern questions like "Draw and label the structure of a human sperm" or "Explain the steps of recombinant DNA technology." The second pass layers NEET-level depth, introducing distractors, assertion-reason logic, and data-interpretation scenarios. Pre-board mock exams in January ensure students can write long-form answers, while NEET mock tests throughout the year build MCQ speed and accuracy. This layered approach means students do not sacrifice one exam for the other.',
      },
    ],
    checklist: [
      { item: 'Complete Class 12 syllabus by December', explanation: 'Leaves January for board prep and February onward for intensive NEET revision.' },
      { item: 'Schedule weekly Class 11 revision sessions', explanation: 'Prevents forgetting half the NEET syllabus while learning new Class 12 chapters.' },
      { item: 'Practise at least 50 MCQs daily from March onward', explanation: 'Builds the speed needed to attempt 90 Biology questions in the allotted time.' },
      { item: 'Take full-length NEET mock tests fortnightly', explanation: 'Simulates exam conditions and identifies weak chapters that need targeted revision.' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'Class 12 Biology Online Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete Class 12 Biology tuition online with board and NEET integrated preparation from AIIMS faculty.',
    duration: 'P1Y',
    price: 85000,
    priceCurrency: 'INR',
  },
}

// Page 3: /online-biology-classes-class-12/
export const onlineBiologyClassesClass12: SEOLandingContent = {
  ...class12BaseContent,
  slug: 'online-biology-classes-class-12',

  title: 'Online Biology Classes for Class 12 | Live NEET Coaching',
  metaDescription:
    'Join live online biology classes for Class 12. Expert AIIMS faculty, intensive NEET preparation, board exam coverage. Limited seats per batch!',
  keywords: [
    'online biology classes class 12',
    'live biology classes class 12',
    'class 12 biology online classes',
    'biology classes for NEET class 12',
    'online biology coaching class 12',
  ],

  hero: {
    headline: 'Live Biology Classes for Your Final Year',
    subheadline:
      'Intensive, interactive, and result-oriented. The online classes that get you into medical college.',
    highlightedText: 'Where NEET Dreams Come True',
    ctaText: 'See Class Schedule',
    ctaLink: '/class-12',
    backgroundGradient: 'bg-indigo-700',
  },

  painPoints: {
    title: 'Why Our Classes Stand Out',
    points: [
      {
        icon: 'wifi-off',
        question: "Pre-recorded videos that don't help?",
        solution:
          'Live classes with real-time interaction. Ask questions, get answers immediately.',
      },
      {
        icon: 'fast-forward',
        question: 'Classes too fast for complex topics?',
        solution: 'Paced teaching with topic-wise depth. Difficult chapters get extra time.',
      },
      {
        icon: 'battery-low',
        question: 'Losing motivation studying alone?',
        solution: 'Batch community, regular motivation, and visible peer progress keeps you going.',
      },
      {
        icon: 'alert-circle',
        question: 'No one to guide your overall strategy?',
        solution:
          'Personal mentorship on exam strategy, time management, and subject prioritization.',
      },
    ],
  },

  benefits: {
    title: 'Class 12 Biology Classes That Deliver',
    subtitle: 'The online classes your NEET success depends on',
    items: [
      {
        icon: 'play-circle',
        title: 'Live + Recorded',
        description:
          'Attend live for interaction, watch recordings for revision. Best of both worlds.',
      },
      {
        icon: 'layers',
        title: 'Intensive Schedule',
        description: '5 days of classes, daily practice, weekly tests. No wasted time.',
      },
      {
        icon: 'git-merge',
        title: 'Class 11 + 12 Integrated',
        description: 'Seamless coverage of both classes. No gaps in your preparation.',
      },
      {
        icon: 'award',
        title: 'Competition Simulation',
        description: 'Regular ranking, leaderboards, and mock test analysis. Stay exam-ready.',
      },
      {
        icon: 'calendar',
        title: 'Board Exam Ready',
        description: 'CBSE pattern questions, sample papers, and pre-board prep included.',
      },
      {
        icon: 'users',
        title: 'Small Batches',
        description: 'Only 10-12 students. Everyone participates, everyone improves.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is the schedule for Class 12 online biology classes?',
      answer:
        'Our Class 12 biology classes run 5 days a week, 2 hours per session. Schedule: New topics (4 days) + Doubt solving and revision (1 day). Weekend mock tests twice a month. Complete syllabus coverage by January, followed by intensive revision.',
    },
    {
      question: 'How are live classes conducted?',
      answer:
        'Classes are conducted on Zoom/Google Meet with interactive whiteboards. You can see diagrams being drawn, animations for complex topics, and participate through audio/video or chat. All sessions are recorded for later revision.',
    },
    {
      question: 'What if I miss a live class?',
      answer:
        'All classes are recorded and uploaded within 4 hours. You can watch at your convenience. However, we track attendance and strongly encourage live participation for best results. Doubt sessions can cover any missed content.',
    },
    {
      question: 'How do you prepare for both boards and NEET?',
      answer:
        "Our curriculum is designed for dual preparation. NCERT is covered thoroughly for boards. NEET-level questions are practiced for each topic. Special board prep sessions in January-February ensure you're ready for both exams.",
    },
    {
      question: 'What tests are included in the biology classes?',
      answer:
        'Weekly chapter tests, fortnightly cumulative tests, monthly mock tests, and a grand test series of 20+ tests before NEET. All tests are NEET pattern with detailed analysis, ranking, and weak area identification.',
    },
    {
      question: 'Can I join Class 12 batch if my Class 11 is weak?',
      answer:
        'Yes! We have parallel Class 11 revision sessions. Additionally, you get access to Class 11 recorded lectures and study material. Many of our successful students joined in Class 12 and still scored 320+ in NEET.',
    },
  ],

  cta: {
    title: 'Join Classes That Actually Work',
    subtitle: 'Limited seats per batch. New batches starting soon.',
    primaryButton: {
      text: 'View Class Schedule',
      link: '/class-12',
    },
    secondaryButton: {
      text: 'Attend Trial Class',
      link: '/book-demo?class=class-12',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Why Live Classes Outperform Self-Study for Class 12 NEET Biology',
        body: 'Class 12 Biology contains chapters that are deceptively simple on the surface but demand analytical depth for NEET. Genetics, for example, appears straightforward when reading about Mendel\'s laws in NCERT, but NEET questions often present complex pedigree charts, trihybrid cross ratios, or gene mapping problems that require guided practice. Live classes provide the structured problem-solving environment where a teacher can walk students through a pedigree step by step, identifying autosomal versus sex-linked patterns, dominant versus recessive traits, and carrier probabilities. Similarly, Molecular Biology topics like the lac operon or splicing mechanisms benefit enormously from animated walkthroughs that a teacher narrates in real time, pausing to explain each regulatory element. Self-study students frequently develop misconceptions in these areas that persist until exposed in a mock test, by which point valuable revision time has been lost.',
      },
      {
        heading: 'The Role of Mock Tests and Performance Analytics in Live Class Programs',
        body: 'A hallmark of effective live online biology classes is the integration of regular assessments with detailed analytics. Weekly chapter tests after completing topics like Human Reproduction or Ecosystem ensure immediate consolidation. Fortnightly cumulative tests mix chapters, training the brain to retrieve information out of sequence, just as NEET does. Monthly full-length mock tests simulate the actual 200-minute exam window. After each test, analytics dashboards show per-chapter accuracy, time spent per question, and comparison with batch peers. This data-driven feedback loop allows both the student and the teacher to identify precisely which sub-topics need reinforcement. For instance, a student scoring well on Mendelian genetics but poorly on molecular genetics can receive targeted assignments on DNA replication and transcription before the gap widens further.',
      },
      {
        heading: 'Scheduling Strategies for the Final Four Months Before NEET',
        body: 'The period from February to May is when Class 12 students transition from learning mode to exam mode. February is typically consumed by board exams, but strategic planning ensures NEET momentum is not lost. Students in live class programs receive a revision schedule that slots 30 minutes of NCERT Biology reading daily even during board season. March begins the intensive revision phase: Class 12 Genetics and Ecology in the first two weeks, Class 11 Human Physiology and Cell Biology in the next two. April is devoted to full-length mock tests, ideally three per week, with detailed error analysis after each. May focuses on weak chapter revision and NCERT re-reading for last-minute recall. Live classes during this period shift from teaching new content to conducting doubt-clearance marathons and timed MCQ drills, ensuring students enter the exam hall with both knowledge and confidence.',
      },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'Online Biology Classes Class 12',
    provider: 'Cerebrum Biology Academy',
    description:
      'Live interactive online biology classes for Class 12 with intensive NEET preparation and board exam coverage.',
    duration: 'P1Y',
    price: 85000,
    priceCurrency: 'INR',
  },
}

// Page 4: /best-biology-tutor-class-12/
export const bestBiologyTutorClass12: SEOLandingContent = {
  ...class12BaseContent,
  slug: 'best-biology-tutor-class-12',

  title: 'Best Biology Tutor for Class 12 NEET | AIIMS Faculty',
  metaDescription:
    "Learn from India's best biology tutor for Class 12. Dr. Shekhar, AIIMS alumnus with 65+ AIIMS selections, provides personalized mentorship. Join now!",
  keywords: [
    'best biology tutor class 12',
    'biology teacher for NEET class 12',
    'top biology tutor class 12 online',
    'class 12 biology teacher NEET',
    'best NEET biology teacher class 12',
  ],

  hero: {
    headline: 'The Biology Tutor Who Makes AIIMS Possible',
    subheadline:
      "Dr. Shekhar's Class 12 batches have produced 65+ AIIMS selections. Learn from someone who knows the path.",
    highlightedText: 'Your Tutor is Your Biggest Advantage',
    ctaText: 'Meet Dr. Shekhar',
    ctaLink: '/faculty',
    backgroundGradient: 'from-yellow-900 via-orange-900 to-red-900',
  },

  painPoints: {
    title: 'Why Your Choice of Tutor Matters',
    points: [
      {
        icon: 'user-x',
        question: "Tutors who haven't experienced NEET pressure?",
        solution:
          'Dr. Shekhar is an AIIMS Delhi graduate. He understands the pressure and knows how to handle it.',
      },
      {
        icon: 'shuffle',
        question: 'Multiple tutors with inconsistent teaching?',
        solution: 'One master tutor for your entire Class 12. Consistency in approach and quality.',
      },
      {
        icon: 'x-octagon',
        question: 'No guidance beyond academics?',
        solution: 'Complete mentorship including exam strategy, stress management, and motivation.',
      },
      {
        icon: 'lock',
        question: "Can't access your tutor for urgent doubts?",
        solution: 'Direct WhatsApp access. Get critical doubts solved within hours.',
      },
    ],
  },

  benefits: {
    title: 'Why Dr. Shekhar for Class 12',
    subtitle: 'The experience and expertise you need in your final year',
    items: [
      {
        icon: 'graduation-cap',
        title: 'AIIMS Delhi Graduate',
        description: 'Completed MBBS from AIIMS. Knows the medical entrance journey inside out.',
      },
      {
        icon: 'award',
        title: '65+ AIIMS Selections',
        description: 'More AIIMS selections than most coaching institutes. Proven track record.',
      },
      {
        icon: 'book-open',
        title: 'NEET Book Author',
        description: 'Published author of NEET Biology preparation books used nationwide.',
      },
      {
        icon: 'target',
        title: 'Exam Strategy Expert',
        description: 'Teaches not just biology but how to maximize marks in the exam hall.',
      },
      {
        icon: 'heart',
        title: 'Personal Mentor',
        description: 'Guides students through the stress of Class 12 and NEET preparation.',
      },
      {
        icon: 'star',
        title: '5.0/5 Rating',
        description: "Consistently rated as one of India's best biology teachers.",
      },
    ],
  },

  faqs: [
    {
      question: 'What makes Dr. Shekhar the best biology tutor for Class 12?',
      answer:
        "Dr. Shekhar combines three rare qualities: 1) He's an AIIMS graduate who understands medical entrance exams deeply, 2) He has 15+ years of teaching experience with 65+ AIIMS selections, 3) He provides personal mentorship, not just teaching. His students consistently score 330+ in NEET Biology.",
    },
    {
      question: 'Does Dr. Shekhar teach all Class 12 batches?',
      answer:
        'Dr. Shekhar personally leads the Pinnacle batch (premium) and conducts critical topic sessions for all batches. The Pinnacle batch has the smallest size (10 students) for maximum personal attention from Dr. Shekhar.',
    },
    {
      question: 'How can I get personal attention from Dr. Shekhar?',
      answer:
        'The Pinnacle batch offers maximum personal attention with direct WhatsApp access, one-on-one doubt sessions, and personal mentorship. Even in other batches, Dr. Shekhar is accessible through scheduled doubt sessions and the student WhatsApp group.',
    },
    {
      question: "What is Dr. Shekhar's teaching style?",
      answer:
        'Conceptual, visual, and exam-focused. He uses 3D animations, real-life examples, and extensive NEET PYQ practice. His teaching goes beyond just explaining - he teaches how to think like NEET setters and avoid common mistakes.',
    },
    {
      question: "How can I experience Dr. Shekhar's teaching?",
      answer:
        'Book a free demo class on our website. Dr. Shekhar personally conducts demo sessions for prospective students. You can also watch sample video lectures on our YouTube channel to get a sense of his teaching style.',
    },
    {
      question: 'What is the fee to study with Dr. Shekhar for Class 12?',
      answer:
        'The Pinnacle batch with maximum Dr. Shekhar involvement is ₹85,000/year. Other batches with his guidance range from ₹30,000-60,000. Given the results (65+ AIIMS selections), this is exceptional value.',
    },
  ],

  cta: {
    title: 'Learn From The Best',
    subtitle: 'Experience the teaching that has produced 65+ AIIMS doctors.',
    primaryButton: {
      text: "View Dr. Shekhar's Profile",
      link: '/faculty',
    },
    secondaryButton: {
      text: 'Book Free Demo Class',
      link: '/book-demo?class=class-12',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Why Expert Mentorship Matters More in Class 12 Than Any Other Year',
        body: 'Class 12 is where NEET preparation reaches its highest intensity, and the quality of the tutor becomes the most decisive variable. A tutor with clinical experience understands that when students struggle with Genetics problems, the root cause is often weak understanding of meiosis from Class 11 rather than the Genetics chapter itself. This diagnostic ability, trained through years of teaching thousands of students, allows an expert tutor to prescribe targeted remediation instead of generic re-teaching. Dr. Shekhar, having mentored students through every NEET cycle since 2010, recognises common error patterns instantly. When a student confuses codominance with incomplete dominance, or mixes up ecological pyramids of energy and biomass, he addresses the precise conceptual gap rather than re-explaining the entire chapter. This surgical approach to teaching saves weeks of study time across the year.',
      },
      {
        heading: 'The Emotional Dimension of Class 12 NEET Preparation',
        body: 'Beyond academic expertise, Class 12 students need emotional support that only an experienced mentor can provide. The year brings board exam anxiety, peer competition stress, parental expectations, and the existential weight of a single exam determining career trajectory. Students frequently experience motivation dips after poor mock test scores or comparison with coaching institute toppers. A tutor who has guided hundreds of students through this phase can normalise these feelings, share examples of past students who recovered from mid-year slumps, and adjust the preparation intensity to prevent burnout. Dr. Shekhar conducts monthly individual check-ins with each Pinnacle batch student, addressing not just academic gaps but also sleep schedules, exercise habits, and stress management techniques. This holistic mentorship is what distinguishes a tutor from a mere content deliverer.',
      },
    ],
    checklist: [
      { item: 'Ensure the tutor has a track record with Class 12 specifically, not just Class 11', explanation: 'Class 12 demands board-NEET integration expertise that differs from pure foundation teaching.' },
      { item: 'Ask how the tutor handles mid-year motivation drops', explanation: 'Academic expertise alone cannot sustain a student through the emotional highs and lows of Class 12.' },
      { item: 'Confirm access to one-on-one sessions, not just group classes', explanation: 'Individual attention for personalised weak-area analysis is critical in the final year.' },
      { item: 'Verify the tutor provides exam strategy guidance, not just subject teaching', explanation: 'Knowing which questions to attempt first, time allocation per section, and when to skip can swing 20+ marks.' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'Class 12 Biology with Expert Tutor',
    provider: 'Cerebrum Biology Academy',
    description:
      "Learn Class 12 Biology from India's top tutor Dr. Shekhar, AIIMS alumnus with 65+ AIIMS selections.",
    duration: 'P1Y',
    price: 85000,
    priceCurrency: 'INR',
  },
}

// Page 5: /neet-2025-biology-coaching/
export const neet2025BiologyCoaching: SEOLandingContent = {
  ...class12BaseContent,
  slug: 'neet-2025-biology-coaching',

  title: 'NEET 2026 Biology Coaching | Class 12 Batch Starting Now',
  metaDescription:
    "Prepare for NEET 2026 with India's top biology coaching. Class 12 intensive batch by AIIMS faculty. Early bird enrollment open. Limited seats!",
  keywords: [
    'NEET 2026 biology coaching',
    'NEET 2026 preparation class 12',
    'NEET biology coaching 2026',
    'class 12 NEET 2026 batch',
    'best NEET coaching 2026',
  ],

  hero: {
    headline: 'NEET 2026: Your Year to Become a Doctor',
    subheadline:
      'Intensive Class 12 biology coaching designed specifically for NEET 2026. Start now, peak in May.',
    highlightedText: 'Make Every Day Count Till NEET 2026',
    ctaText: 'Join NEET 2026 Batch',
    ctaLink: '/class-12',
    backgroundGradient: 'from-rose-900 via-pink-900 to-fuchsia-900',
  },

  painPoints: {
    title: 'Ready to Crack NEET 2026?',
    points: [
      {
        icon: 'calendar',
        question: 'Worried about the 12-month countdown?',
        solution:
          'Our scientifically designed schedule ensures complete preparation with 3 revisions before NEET.',
      },
      {
        icon: 'trending-down',
        question: 'Seeing others start and feeling behind?',
        solution:
          "It's not too late! Our intensive batches are designed for focused, effective preparation.",
      },
      {
        icon: 'help-circle',
        question: 'Confused about what approach to take?',
        solution:
          'Expert-guided preparation with clear milestones. Know exactly where you should be each month.',
      },
      {
        icon: 'shield',
        question: 'Scared about NEET pattern and difficulty?',
        solution: 'Train with 20+ NEET-pattern tests. Face the real exam with confidence.',
      },
    ],
  },

  benefits: {
    title: 'NEET 2026 Preparation Roadmap',
    subtitle: 'Month-by-month plan to peak at the right time',
    items: [
      {
        icon: 'play',
        title: 'Phase 1: Foundation (Apr-Jul)',
        description: 'Complete Class 12 syllabus with NEET depth. Build solid conceptual base.',
      },
      {
        icon: 'refresh-cw',
        title: 'Phase 2: Integration (Aug-Oct)',
        description: 'Class 11 revision, cross-topic connections, board exam preparation.',
      },
      {
        icon: 'clipboard',
        title: 'Phase 3: Practice (Nov-Jan)',
        description: 'Intensive question practice, mock tests begin, weakness identification.',
      },
      {
        icon: 'zap',
        title: 'Phase 4: Revision (Feb-Mar)',
        description: 'Board exam completion, rapid revision, NEET-specific preparation.',
      },
      {
        icon: 'target',
        title: 'Phase 5: Peak (Apr-May)',
        description: 'Grand test series, final revision, exam strategy and confidence building.',
      },
      {
        icon: 'award',
        title: 'NEET Day: Victory',
        description: 'Walk into NEET with complete preparation and unshakeable confidence.',
      },
    ],
  },

  faqs: [
    {
      question: 'When does NEET 2026 preparation batch start?',
      answer:
        'Our NEET 2026 batches start in April (regular) and June (late joiner batch). You can join anytime - we provide catch-up material for late joiners. The earlier you start, the more revision cycles you get.',
    },
    {
      question: 'How many months of preparation is ideal for NEET 2026?',
      answer:
        '10-12 months is ideal for Class 12 students. This gives enough time for: complete syllabus coverage (5 months), Class 11 revision (2 months), intensive practice (3 months), and final revision (2 months). Our batch is designed for this timeline.',
    },
    {
      question: 'Is NEET 2026 expected to be tougher?',
      answer:
        'NEET pattern has stabilized with increased emphasis on conceptual questions. Whether "tougher" or not, our preparation ensures you\'re ready for any level of difficulty. We train for challenging questions, not just easy ones.',
    },
    {
      question: 'What marks are needed in NEET 2026 for government medical colleges?',
      answer:
        'Typically, 600+ (out of 720) secures admission in good government colleges. Our target is to help you score 320+ in Biology (out of 360), which gives you a strong base. Combined with Physics and Chemistry, 650+ is achievable.',
    },
    {
      question: 'Do you guarantee selection in NEET 2026?',
      answer:
        'We guarantee quality teaching, personal attention, and comprehensive preparation. Our track record: 98% of students improve significantly, 85%+ score above 550, and we have 65+ AIIMS selections. Success depends on your effort combined with our guidance.',
    },
    {
      question: 'How is NEET 2026 batch different from regular Class 12 batch?',
      answer:
        "It's the same intensive program, branded for clarity. Our Class 12 batch IS the NEET 2026 batch. Everything is designed around the NEET exam date - the schedule, tests, and revision all peak at the right time.",
    },
  ],

  cta: {
    title: 'NEET 2026: Start Your Journey Today',
    subtitle: 'Early starters have the advantage. Limited seats in each batch.',
    primaryButton: {
      text: 'Enroll for NEET 2026',
      link: '/class-12',
    },
    secondaryButton: {
      text: 'Download NEET 2026 Roadmap',
      link: '/free-resources?type=neet-2025-roadmap',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'NEET 2026 Biology: What to Expect and How to Prepare',
        body: 'NEET 2026 is expected to continue the trend of increasing conceptual complexity in Biology. Recent papers have shifted away from straightforward recall questions toward assertion-reason formats, data interpretation from graphs and tables, and application of concepts to novel scenarios. For example, instead of asking students to simply name the enzyme that catalyses transcription, the paper might present a mutant cell where RNA polymerase has altered specificity and ask students to predict the downstream effect on protein synthesis. Preparing for this level of questioning requires moving beyond rote memorisation of NCERT to understanding the underlying logic of biological processes. Students aiming for 320-plus in Biology must practise extensively with NEET-pattern MCQs that test conceptual depth, not just factual breadth. A structured coaching program that begins in April and peaks in May provides the sustained, phased preparation this exam demands.',
      },
      {
        heading: 'The Five-Phase Preparation Roadmap for NEET 2026 Biology',
        body: 'Phase 1 (April to July) focuses on completing the Class 12 syllabus, prioritising high-yield chapters like Genetics, Reproduction, and Ecology. Phase 2 (August to October) integrates Class 11 revision with Class 12 consolidation, building cross-chapter connections such as linking cell division with genetic inheritance or linking photosynthesis with ecosystem energy flow. Phase 3 (November to January) shifts to intensive MCQ practice, with students solving 100-plus questions daily across both class levels. Phase 4 (February to March) accommodates board exams while maintaining NEET readiness through daily NCERT re-reading and weekend mock tests. Phase 5 (April to May) is the peaking phase, featuring three full-length mock tests per week, error log analysis, and targeted revision of the ten weakest sub-topics. Students who follow this phased roadmap arrive at NEET day having covered the syllabus three to four times, with exam-day strategy refined through 40-plus mock tests.',
      },
      {
        heading: 'Managing the Gap Between Board Exams and NEET 2026',
        body: 'The four-to-six-week gap between CBSE board exams and NEET is a critical window that can determine a student\'s final score. Many students make the mistake of taking a break after boards, losing the momentum they built over months. The optimal approach is to begin NEET-specific revision within 48 hours of the last board exam. The first week should focus on re-reading Class 11 NCERT chapters that were deprioritised during board season, particularly Human Physiology and Plant Physiology. The second and third weeks should be devoted to full-length mock tests on alternate days with detailed error analysis on intervening days. The final week before NEET should involve light revision of high-yield topics, formula sheets for Genetics ratios, and ecological data, with early sleep to ensure peak cognitive performance on exam day. Coaching programs that provide structured post-board revision schedules help students navigate this period without anxiety or wasted time.',
      },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET 2026 Biology Coaching',
    provider: 'Cerebrum Biology Academy',
    description:
      'Intensive NEET 2026 biology coaching for Class 12 students with complete preparation roadmap and expert guidance.',
    duration: 'P1Y',
    price: 85000,
    priceCurrency: 'INR',
  },
}

// Page 6: /board-neet-biology-class-12/
export const boardNeetBiologyClass12: SEOLandingContent = {
  ...class12BaseContent,
  slug: 'board-neet-biology-class-12',

  title: 'Board + NEET Biology Class 12 | Dual Exam Preparation',
  metaDescription:
    'Ace both CBSE boards and NEET with our integrated Class 12 biology coaching. Score 95%+ in boards and 320+ in NEET Biology. Expert faculty, proven results!',
  keywords: [
    'board + NEET biology coaching',
    'class 12 board exam + NEET preparation',
    'CBSE board and NEET biology',
    'integrated board NEET coaching',
    'class 12 biology dual preparation',
  ],

  hero: {
    headline: 'Boards + NEET: Master Both Exams',
    subheadline:
      'Why choose when you can excel in both? Our integrated approach ensures 95%+ in boards and 320+ in NEET.',
    highlightedText: 'Two Exams, One Perfect Preparation',
    ctaText: 'See Dual Preparation Plan',
    ctaLink: '/class-12',
    backgroundGradient: 'from-sky-900 via-blue-900 to-indigo-900',
  },

  painPoints: {
    title: 'The Dual Exam Challenge',
    points: [
      {
        icon: 'git-branch',
        question: 'Torn between board and NEET preparation?',
        solution: 'Our integrated curriculum covers both simultaneously. No either/or needed.',
      },
      {
        icon: 'calendar-x',
        question: 'Board exams just weeks before NEET?',
        solution:
          "Strategically planned schedule ensures board prep doesn't disrupt NEET momentum.",
      },
      {
        icon: 'file-question',
        question: 'Different question patterns confusing you?',
        solution:
          'We train for both patterns. NCERT depth for boards, application skills for NEET.',
      },
      {
        icon: 'trending-up',
        question: 'Parents worried about board results for backup?',
        solution:
          'Board scores are crucial for DU, BVSc, etc. We ensure excellent board performance too.',
      },
    ],
  },

  benefits: {
    title: 'The Integrated Approach',
    subtitle: 'How we prepare you for both exams simultaneously',
    items: [
      {
        icon: 'book',
        title: 'NCERT: The Common Base',
        description:
          'NCERT is essential for both exams. We cover it line-by-line with both applications.',
      },
      {
        icon: 'layers',
        title: 'Layered Learning',
        description:
          'Basic concept (boards) → Deep understanding (NEET) → Application practice (both).',
      },
      {
        icon: 'file-text',
        title: 'Dual Question Practice',
        description: 'Practice both board-pattern and NEET-pattern questions for every chapter.',
      },
      {
        icon: 'calendar',
        title: 'Strategic Timeline',
        description: 'Syllabus by December, board focus in January, back to NEET in March.',
      },
      {
        icon: 'clipboard',
        title: 'Board Mock Exams',
        description: 'Full CBSE-pattern tests with answer sheets like actual boards.',
      },
      {
        icon: 'award',
        title: 'Dual Success Track Record',
        description: 'Our students average 94% in boards and 320+ in NEET Biology.',
      },
    ],
  },

  faqs: [
    {
      question: 'Can I score well in both CBSE boards and NEET?',
      answer:
        "Absolutely! Our students regularly achieve 90-98% in boards AND 320+ in NEET Biology. The key is integrated preparation - NCERT mastery helps boards, adding depth helps NEET. We've perfected this dual approach over 15 years.",
    },
    {
      question: 'How is the syllabus for boards and NEET different?',
      answer:
        'The syllabus is 90% the same (NCERT Class 11 + 12). The difference is in approach: boards test recall and understanding, NEET tests application and reasoning. Our teaching covers both dimensions for every topic.',
    },
    {
      question: 'Which exam should I focus more on - boards or NEET?',
      answer:
        "Both are important! Boards are needed for admission eligibility, and good marks help in some state counseling. NEET is the main entrance exam. Our approach ensures you don't sacrifice one for the other.",
    },
    {
      question: 'How do you manage the board exam period (Feb-March)?',
      answer:
        'We have a strategic plan: complete syllabus by December, intensive board prep in January-February, boards in March, and back to NEET focus in March-April. Recorded NEET sessions are available during board exam period.',
    },
    {
      question: 'What if my board and NEET exam dates are very close?',
      answer:
        "We prepare for this scenario. Our revision schedule ensures you're ready for boards without losing NEET momentum. The week after boards is dedicated to rapid NEET revision to get back into competitive mode.",
    },
    {
      question: 'Do you provide separate study material for boards and NEET?',
      answer:
        'We provide integrated notes that work for both. Additionally, you get: board-specific question banks, sample papers for boards, and separate NEET PYQ practice material. Everything needed for dual success.',
    },
  ],

  cta: {
    title: 'Ace Both Exams',
    subtitle: 'Join the batch that prepares you for boards AND NEET.',
    primaryButton: {
      text: 'View Integrated Course',
      link: '/class-12',
    },
    secondaryButton: {
      text: 'Talk to Counselor',
      link: '/contact?topic=board-neet-integration',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Understanding the Overlap Between CBSE Boards and NEET Biology',
        body: 'The CBSE Class 12 Biology board exam and NEET share the same NCERT-based syllabus, but they test knowledge in fundamentally different ways. Board exams reward comprehensive written answers with diagrams, requiring students to demonstrate depth through structured paragraphs and labelled illustrations. A board question on DNA replication might ask students to describe the process with a diagram and explain the role of each enzyme. NEET, by contrast, tests the same concept through a four-option MCQ that might present an incorrect statement about Okazaki fragments and ask students to identify the error. This difference in assessment format means that a student who prepares only for boards will struggle with NEET\'s speed demands, while a student who prepares only for NEET may lose marks in boards for incomplete diagrams or poorly structured answers. Dual preparation explicitly trains both skills for each chapter.',
      },
      {
        heading: 'The Strategic Calendar for Board and NEET Success',
        body: 'Dual preparation requires a carefully orchestrated calendar. From April to November, the focus is on completing the Class 12 syllabus with NEET-level depth, solving both descriptive and MCQ questions for each chapter. December is dedicated to completing any remaining chapters and beginning cumulative revision. January shifts to board-specific preparation: practising long-answer questions, perfecting diagram drawing speed, and solving the last ten years of CBSE sample papers. February, when boards typically occur, is entirely board-focused, but students maintain NEET readiness through 30 minutes of daily MCQ practice. March marks the transition back to NEET mode, with intensive Class 11 revision and topic-wise mock tests. April and May are NEET-only territory, with full-length mocks, error analysis, and final revision. Students who follow this dual-track calendar consistently achieve 93-plus percent in boards and 310-plus in NEET Biology.',
      },
      {
        heading: 'How Strong Board Preparation Actually Boosts NEET Scores',
        body: 'Many students view board preparation as a distraction from NEET, but this is a misconception. Board exam preparation forces students to write out explanations in their own words, which deepens understanding far beyond passive recognition of MCQ options. Drawing the human female reproductive system for a board exam cements spatial relationships between ovaries, fallopian tubes, and uterus in a way that just reading about them does not. Similarly, writing a structured answer about ecological succession forces students to organise the concept sequentially, from pioneer community through seral stages to climax community, creating a mental framework that makes MCQ distractors easier to eliminate. The discipline of board preparation also builds exam stamina: students accustomed to writing for three hours adapt more easily to the three-hour-twenty-minute NEET window. Dual preparation is not a compromise but a complementary strategy.',
      },
    ],
    comparisonTable: [
      { Aspect: 'Question Format', 'CBSE Board Exam': 'Descriptive, diagram-based, structured answers', 'NEET Exam': 'Multiple-choice, assertion-reason, matching type' },
      { Aspect: 'Time per Question', 'CBSE Board Exam': '3-5 minutes (fewer questions, longer answers)', 'NEET Exam': '~1 minute (90 Biology questions in ~60 minutes)' },
      { Aspect: 'Syllabus Coverage', 'CBSE Board Exam': 'Class 12 NCERT only', 'NEET Exam': 'Class 11 + Class 12 NCERT' },
      { Aspect: 'Scoring Strategy', 'CBSE Board Exam': 'Attempt all, focus on presentation and diagrams', 'NEET Exam': 'Accuracy over speed, negative marking penalty' },
      { Aspect: 'Preparation Peak', 'CBSE Board Exam': 'January-February', 'NEET Exam': 'April-May' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'Board + NEET Biology Class 12',
    provider: 'Cerebrum Biology Academy',
    description:
      'Integrated Class 12 Biology coaching for both CBSE board exams and NEET preparation with proven dual success.',
    duration: 'P1Y',
    price: 85000,
    priceCurrency: 'INR',
  },
}

// Export all Class 12 content
export const class12SEOPages = {
  neetBiologyCoachingClass12,
  class12BiologyTuitionOnline,
  onlineBiologyClassesClass12,
  bestBiologyTutorClass12,
  neet2025BiologyCoaching,
  boardNeetBiologyClass12,
}
