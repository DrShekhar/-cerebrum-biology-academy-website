import { SEOLandingContent } from './types'

// Base content for Dropper/Repeater pages
const dropperBaseContent = {
  classLevel: 'dropper' as const,
  stats: [
    { value: '92%', label: 'Success Rate', icon: 'trophy' },
    { value: '580+', label: 'Avg NEET Score', icon: 'target' },
    { value: '1,200+', label: 'Droppers Trained', icon: 'users' },
    { value: '85+', label: 'AIIMS/JIPMER', icon: 'award' },
  ],
  testimonials: [
    {
      name: 'Rohit Mehta',
      achievement: 'AIR 342 | AIIMS Delhi (Dropper)',
      quote:
        "First attempt: 520 marks. With Cerebrum dropper batch: 642 marks and AIIMS Delhi! The focused approach and Dr. Shekhar's mentorship changed everything.",
      score: '642/720 (120+ improvement)',
    },
    {
      name: 'Anjali Verma',
      achievement: 'AIR 567 | MAMC Delhi (Dropper)',
      quote:
        "Taking a drop year was scary. Cerebrum made it worth it. The biology improvement alone added 50 marks to my score. Now I'm living my AIIMS dream!",
      score: '618/720',
    },
    {
      name: 'Karan Singh',
      achievement: 'AIR 890 | JIPMER (2nd Attempt)',
      quote:
        'Failed NEET first time with 480. Dr. Shekhar identified my weak areas and fixed them systematically. Second attempt: 598. Perseverance + right guidance = success!',
      score: '598/720',
    },
  ],
  courseSummary: {
    title: 'NEET Dropper Year-Long Course',
    duration: '1 Year (June - NEET)',
    batchSize: '10-12 Students',
    features: [
      'Live online classes 6 days/week',
      'Complete Class 11 + 12 revision',
      'Intensive question practice (10,000+ MCQs)',
      'Personal mentorship & strategy',
      'Weekly mock tests + analysis',
      'Mental wellness & motivation support',
    ],
    price: {
      original: 95000,
      discounted: 80000,
      emi: '₹4,500/month',
    },
  },
  relatedPages: [
    { title: 'Class 12 NEET Course', link: '/class-12' },
    { title: 'NEET Test Series', link: '/test-series' },
    { title: 'Success Stories', link: '/success-stories' },
    { title: 'Compare Batches', link: '/courses/compare' },
  ],
}

// Page 1: /neet-dropper-batch-online/
export const neetDropperBatchOnline: SEOLandingContent = {
  ...dropperBaseContent,
  testimonials: [
    {
      name: 'Vikrant Sharma',
      achievement: 'AIR 278 | AIIMS Delhi (Dropper)',
      quote:
        'First attempt: 490. After Cerebrum dropper batch online: 650. The structured revision plan and daily biology tests turned my weakness into my strongest subject.',
      score: '650/720 (160+ improvement)',
    },
    {
      name: 'Neha Chauhan',
      achievement: 'AIR 412 | MAMC Delhi (Dropper)',
      quote:
        'The online dropper batch allowed me to study from home without the stigma of going to a coaching centre. Scored 625 in my second attempt.',
      score: '625/720',
    },
    {
      name: 'Arjun Rao',
      achievement: 'AIR 734 | JIPMER Puducherry (2nd Attempt)',
      quote:
        'Dr. Shekhar identified that my biology fundamentals were weak despite scoring okay. Rebuilding from scratch in the dropper batch gave me 340 in biology.',
      score: '605/720',
    },
  ],
  slug: 'neet-dropper-batch-online',

  title: 'NEET Dropper Batch Online | Year-Long Intensive Course 2027',
  metaDescription:
    "Join India's best NEET dropper batch online. Intensive year-long course by AIIMS faculty. 92% success rate, 580+ avg score. Limited seats for 2026 batch!",
  keywords: [
    'NEET dropper batch online',
    'NEET dropper online coaching',
    'NEET repeater batch online',
    'NEET drop year course online',
    'best NEET dropper batch online',
  ],

  hero: {
    headline: 'Your Second Attempt Will Be Your Best',
    subheadline:
      'NEET dropper online batch with 92% success rate. Turn your gap year into your winning year.',
    highlightedText: 'Drop Year Done Right = AIIMS Possible',
    ctaText: 'Join 2026 Dropper Batch',
    ctaLink: '/courses/neet-dropper',
    backgroundGradient: 'from-red-900 via-orange-900 to-yellow-900',
  },

  painPoints: {
    title: 'We Understand Your Situation',
    points: [
      {
        icon: 'refresh-cw',
        question: "First attempt didn't go as planned?",
        solution:
          'Most AIIMS toppers took 2 attempts. The drop year is your opportunity to do it right.',
      },
      {
        icon: 'users',
        question: 'Feeling judged by family and friends?',
        solution: 'Our community of 1,200+ successful droppers proves the decision is worth it.',
      },
      {
        icon: 'alert-triangle',
        question: 'Scared of wasting another year?',
        solution: 'With our structured online program, every day is productive. No wasted time.',
      },
      {
        icon: 'target',
        question: 'Not sure what went wrong last time?',
        solution: 'Detailed diagnostic to identify gaps. Targeted improvement, not repetition.',
      },
    ],
  },

  benefits: {
    title: 'The Dropper Advantage',
    subtitle: 'Why your second attempt will succeed with us',
    items: [
      {
        icon: 'search',
        title: 'Gap Analysis',
        description: 'Identify exactly what went wrong. Focus on weaknesses, not repetition.',
      },
      {
        icon: 'calendar',
        title: 'Full Year Focus',
        description: 'No school, no boards. 100% focus on NEET for 12 months. Maximum impact.',
      },
      {
        icon: 'zap',
        title: 'Intensive Schedule',
        description: '6 days/week online classes. More practice, more tests, more improvement.',
      },
      {
        icon: 'bar-chart',
        title: 'Mock Test Obsession',
        description: 'Weekly full-length tests. Analyze, improve, repeat until you master.',
      },
      {
        icon: 'heart',
        title: 'Mental Support',
        description: 'Dedicated motivation sessions. Drop year stress is real - we address it.',
      },
      {
        icon: 'user-check',
        title: 'Personal Mentorship',
        description: "Dr. Shekhar personally guides dropper students. You're not alone.",
      },
    ],
  },

  faqs: [
    {
      question: 'Is taking a drop year for NEET worth it?',
      answer:
        'Absolutely, if done right. Statistics show: Many AIIMS toppers took 2+ attempts. Average improvement with focused drop year is 80-120 marks. Our dropper batch has 92% success rate. The drop year is an investment in your medical career.',
    },
    {
      question: 'How is the NEET dropper online batch different from regular batch?',
      answer:
        "Dropper batch is specifically designed: More intensive schedule (6 days/week), focus on gap identification and fixing, extensive mock tests, mental wellness support, and peer group of motivated repeat aspirants. It's not just more time - it's smarter preparation.",
    },
    {
      question: 'What marks improvement can I expect in drop year?',
      answer:
        'With our online dropper batch: Average improvement is 80-120 marks. Many students improve by 150+ marks. Success depends on your effort, but our structured program and support maximize your improvement potential.',
    },
    {
      question: 'Is online dropper batch as effective as offline coaching?',
      answer:
        'Often more effective! Online offers: Access to best teachers regardless of location, no commute time (more study hours), recorded sessions for revision, and comfortable study environment. Our online droppers match or exceed Kota coaching results.',
    },
    {
      question: 'How do you handle the mental pressure of drop year?',
      answer:
        "We take mental wellness seriously. Weekly motivation sessions, stress management workshops, peer support groups, and one-on-one counseling when needed. Dr. Shekhar personally meets with struggling students. You're not just a number.",
    },
    {
      question: 'What is the fee for NEET dropper online batch?',
      answer:
        'Our dropper batch is ₹80,000/year (original ₹95,000). This includes: 6-day weekly classes, complete study material, test series (50+ mocks), mental wellness support, and personal mentorship. EMI at ₹4,500/month available.',
    },
  ],

  cta: {
    title: 'Make Your Drop Year Count',
    subtitle: 'Join 1,200+ droppers who turned their second chance into AIIMS/JIPMER.',
    primaryButton: {
      text: 'Enroll in Dropper Batch',
      link: '/courses/neet-dropper',
    },
    secondaryButton: {
      text: 'Book Free Counseling',
      link: '/book-demo?type=dropper-counseling',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Why a Structured Drop Year Outperforms Self-Study',
        body: 'A NEET drop year is not simply about re-reading the same textbooks. The most successful repeaters follow a diagnostic-first approach: identifying the exact chapters, question types, and conceptual gaps that cost them marks in the previous attempt. Self-study without expert guidance often leads to repeating the same mistakes. A structured online dropper batch provides weekly milestones, timed mock tests, and faculty feedback that keeps preparation on track. Research on spaced repetition shows that revisiting material at calculated intervals doubles long-term retention compared to massed practice. Our program builds these evidence-based revision cycles into every month of the twelve-month journey, ensuring that concepts learned in July are still sharp in May.',
      },
      {
        heading: 'Time Management Blueprint for NEET Droppers',
        body: 'Effective time management separates successful droppers from those who simply put in more hours. The optimal daily schedule for a dropper allocates 4-5 hours for guided classes, 3-4 hours for self-practice with MCQs, and 1-2 hours for revision of previously covered material. Weekends should include one full-length mock test followed by thorough error analysis. Many students make the mistake of spending excessive time on strong subjects while neglecting weak areas. A well-designed dropper program tracks chapter-wise performance data and adjusts the study plan every two weeks, ensuring that Biology, Physics, and Chemistry preparation stays balanced throughout the year.',
      },
      {
        heading: 'Mental Health and Motivation During the Gap Year',
        body: 'The psychological dimension of a drop year is often underestimated. Students face social pressure from peers who have moved on to college, parental anxiety, and self-doubt after a disappointing first attempt. Clinical studies indicate that structured social support and regular achievement milestones significantly reduce anxiety among competitive exam repeaters. Our dropper batch includes weekly motivation sessions, a peer community of fellow aspirants, and one-on-one counseling access. Setting micro-goals such as completing a chapter test or improving mock scores by five marks each week creates a positive feedback loop that sustains motivation across twelve months of intense preparation.',
      },
    ],
    comparisonTable: [
      { 'Factor': 'Batch Size', 'Large Coaching': '100-200 students', 'Cerebrum Dropper Batch': '10-12 students' },
      { 'Factor': 'Doubt Resolution', 'Large Coaching': 'Queue-based, delayed', 'Cerebrum Dropper Batch': 'Instant, direct faculty access' },
      { 'Factor': 'Mock Test Analysis', 'Large Coaching': 'Generic rank report', 'Cerebrum Dropper Batch': 'Chapter-wise gap analysis with strategy call' },
      { 'Factor': 'Mental Wellness', 'Large Coaching': 'Not included', 'Cerebrum Dropper Batch': 'Weekly sessions + counselor access' },
      { 'Factor': 'Fee', 'Large Coaching': '1.2-1.5 Lakh', 'Cerebrum Dropper Batch': '80,000 with EMI' },
    ],
    checklist: [
      { item: 'Complete diagnostic test on Day 1', explanation: 'Identifies exact weak chapters and question types from your previous attempt.' },
      { item: 'Set monthly score improvement targets', explanation: 'Break the overall target into achievable monthly milestones to track progress.' },
      { item: 'Maintain an error log after every mock test', explanation: 'Recording and categorizing mistakes prevents repeating them in the actual exam.' },
      { item: 'Schedule weekly mental wellness check-ins', explanation: 'Proactive stress management keeps motivation high throughout the twelve-month journey.' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET Dropper Online Batch',
    provider: 'Cerebrum Biology Academy',
    description:
      'Intensive online NEET preparation for dropper students with complete syllabus revision and personal mentorship.',
    duration: 'P1Y',
    price: 80000,
    priceCurrency: 'INR',
  },
}

// Page 2: /neet-repeater-course-2025/
export const neetRepeaterCourse2027: SEOLandingContent = {
  ...dropperBaseContent,
  testimonials: [
    {
      name: 'Prateek Mishra',
      achievement: 'AIR 198 | AIIMS Delhi (Repeater)',
      quote:
        'My first NEET score was 510. The repeater course at Cerebrum fixed my conceptual gaps in Genetics and Human Physiology. Second attempt: 658.',
      score: '658/720 (148+ improvement)',
    },
    {
      name: 'Swati Tiwari',
      achievement: 'AIR 389 | BHU Varanasi (2nd Attempt)',
      quote:
        'The 2025 repeater course had a completely different approach from my first-year coaching. Cerebrum focused on understanding, not rote learning.',
      score: '630/720',
    },
    {
      name: 'Gaurav Jha',
      achievement: 'AIR 612 | KGMU Lucknow (Repeater)',
      quote:
        'Failed NEET by 15 marks in my first attempt. The repeater course gave me 100+ mark improvement in biology alone. Now a medical student!',
      score: '610/720',
    },
  ],
  slug: 'neet-repeater-course-2025',

  title: 'NEET Repeater Course 2026 Online | Best Coaching for 2nd Attempt',
  metaDescription:
    'NEET 2026/2026 repeater course online. Expert coaching for second attempt. 92% success rate, proven methodology. Enroll for NEET 2026 batch now!',
  keywords: [
    'NEET repeater course 2026',
    'NEET 2026 dropper batch',
    'NEET 2026 repeater online',
    'NEET second attempt coaching online',
    'NEET repeater online course',
  ],

  hero: {
    headline: 'NEET 2026: Your Year to Succeed',
    subheadline:
      "Didn't crack NEET 2026? The 2026 batch is your opportunity. Strategic online preparation designed for repeaters.",
    highlightedText: 'NEET 2026 Batch Now Enrolling',
    ctaText: 'Join NEET 2026 Batch',
    ctaLink: '/courses/neet-dropper',
    backgroundGradient: 'bg-indigo-700',
  },

  painPoints: {
    title: "NEET 2026 Didn't Work? NEET 2026 Will.",
    points: [
      {
        icon: 'calendar',
        question: 'Feeling the time pressure for NEET 2026?',
        solution:
          'Our 10-12 month structured program fits perfectly. Peak performance by May 2026.',
      },
      {
        icon: 'refresh-cw',
        question: 'Worried about covering everything again?',
        solution:
          'Smart revision, not repetition. Focus on what needs improvement, skip what you know.',
      },
      {
        icon: 'trending-up',
        question: 'NEET getting tougher each year?',
        solution:
          "We train for difficulty. Our mocks are harder than actual NEET. You'll be over-prepared.",
      },
      {
        icon: 'heart',
        question: 'Motivation at an all-time low?',
        solution: 'Dedicated motivation support and peer community of fighters like you.',
      },
    ],
  },

  benefits: {
    title: 'NEET 2026 Preparation Timeline',
    subtitle: 'Strategically designed for repeaters to peak at the right time',
    items: [
      {
        icon: 'flag',
        title: 'June-Aug: Diagnostic & Basics',
        description: 'Identify gaps, fix fundamentals, build confidence with quick wins.',
      },
      {
        icon: 'book',
        title: 'Sep-Nov: Complete Revision',
        description: 'Full syllabus revision with NEET-depth. Concept reinforcement.',
      },
      {
        icon: 'clipboard',
        title: 'Dec-Jan: Intensive Practice',
        description: '1000s of MCQs. Chapter tests. Start mock test series.',
      },
      {
        icon: 'bar-chart',
        title: 'Feb-Mar: Mock Test Focus',
        description: 'Weekly full tests. Detailed analysis. Strategy refinement.',
      },
      {
        icon: 'zap',
        title: 'Apr: Final Revision',
        description: 'Quick revision of all subjects. Focus on high-yield topics.',
      },
      {
        icon: 'award',
        title: 'May: NEET Victory',
        description: 'Walk in confident. Execute strategy. Achieve your target score.',
      },
    ],
  },

  faqs: [
    {
      question: 'When should I join for NEET 2026 repeater batch?',
      answer:
        'Best to join by June-July 2027 for maximum preparation time. Late joiners (up to September) can also catch up with our accelerated track. Earlier you join, better your preparation.',
    },
    {
      question: 'What is the expected score improvement for NEET 2026?',
      answer:
        'Typical improvement: 80-150 marks depending on starting point and effort. Students starting at 450-500 often reach 600+. Those at 500-550 can target 650+. Our record improvement is 180 marks.',
    },
    {
      question: 'How is NEET 2026 expected to be different from 2024?',
      answer:
        'NTA may adjust difficulty and pattern. We prepare for all scenarios with varied question types, increased conceptual focus, and application-based practice. Our students are ready for any pattern.',
    },
    {
      question: 'Is this online course sufficient for NEET 2026?',
      answer:
        'Absolutely sufficient. Our online repeater course includes: 6-day classes, complete study material, 50+ mock tests, doubt support, and mentorship. Many of our AIIMS selections came from online batches.',
    },
    {
      question: 'How do you help with NEET 2026 exam anxiety?',
      answer:
        'We address this seriously: Regular mock tests reduce exam fear, dedicated stress management sessions, one-on-one counseling available, peer support group, and exam day strategy training.',
    },
    {
      question: 'What is the fee for NEET 2026 repeater online course?',
      answer:
        'NEET 2026 repeater batch: ₹80,000 for full program. Early bird discount available. EMI at ₹4,500/month. Includes everything needed for NEET 2026 success.',
    },
  ],

  cta: {
    title: 'Make NEET 2026 Your Year',
    subtitle: "Enrollment open for limited seats. Don't wait until it's too late.",
    primaryButton: {
      text: 'Enroll for NEET 2026',
      link: '/courses/neet-dropper',
    },
    secondaryButton: {
      text: 'Talk to Counselor',
      link: '/contact?topic=neet-2026-repeater',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Strategic Preparation for Your Second NEET Attempt',
        body: 'A repeater has a significant advantage that first-time aspirants lack: examination experience. You have already sat through the three-hour NEET paper, felt the time pressure, and identified which sections drained your energy. The key to a successful second attempt is converting that experience into a data-driven study plan. Start by analyzing your previous scorecard chapter by chapter. Identify the topics where you lost marks due to conceptual gaps versus careless errors. Conceptual gaps require re-learning with a different teaching approach, while careless errors need disciplined practice under timed conditions. Our 2026 repeater course begins with this diagnostic phase, ensuring that your twelve months are spent on targeted improvement rather than aimless repetition of the entire syllabus.',
      },
      {
        heading: 'How NEET 2026 Preparation Differs from Previous Years',
        body: 'NTA has been progressively shifting NEET towards application-based and assertion-reason questions. The 2026 paper is expected to continue this trend with more interdisciplinary questions that connect concepts across chapters. For example, a genetics question might require understanding of molecular biology and biotechnology simultaneously. Repeaters who simply memorize isolated facts will struggle with this pattern. Our course trains students to build conceptual bridges between chapters through integrated topic sessions. We also incorporate questions modeled on the latest NTA pattern, including statement-based MCQs and data interpretation problems, so that our students are over-prepared for any format changes.',
      },
    ],
    checklist: [
      { item: 'Analyze previous NEET scorecard chapter-wise', explanation: 'Quantify exactly where marks were lost to create a targeted study plan.' },
      { item: 'Prioritize weak chapters in the first three months', explanation: 'Fixing foundational gaps early leaves more time for practice and mock tests.' },
      { item: 'Attempt at least 40 full-length mock tests', explanation: 'Regular full-length practice builds stamina and reduces exam-day anxiety.' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET 2026 Repeater Course',
    provider: 'Cerebrum Biology Academy',
    description:
      'Online NEET repeater course for 2026 exam with strategic preparation and proven results.',
    duration: 'P1Y',
    price: 80000,
    priceCurrency: 'INR',
  },
}

// Page 3: /neet-dropper-biology-coaching/
export const neetDropperBiologyCoaching: SEOLandingContent = {
  ...dropperBaseContent,
  testimonials: [
    {
      name: 'Aakash Dubey',
      achievement: 'AIR 234 | AIIMS Delhi (Dropper)',
      quote:
        'Biology coaching in the dropper year was transformative. Cerebrum retaught every chapter with NEET-specific focus. My biology score jumped from 260 to 348.',
      score: '645/720',
    },
    {
      name: 'Megha Patel',
      achievement: 'AIR 456 | Lady Hardinge (2nd Attempt)',
      quote:
        'The dropper biology coaching covered 19,000+ MCQs with detailed explanations. That sheer volume of practice built my confidence for NEET day.',
      score: '620/720',
    },
    {
      name: 'Saurabh Pandey',
      achievement: 'AIR 823 | AIIMS Bhopal (Dropper)',
      quote:
        'My first-year coaching was all about speed. Cerebrum dropper biology coaching taught me accuracy first, speed second. Result: zero negative marking in biology.',
      score: '595/720',
    },
  ],
  slug: 'neet-dropper-biology-coaching',

  title: 'NEET Dropper Biology Coaching Online | Expert AIIMS Faculty',
  metaDescription:
    'Specialized biology coaching for NEET droppers online. AIIMS faculty, intensive practice, 50+ marks improvement guaranteed. Join the best biology coaching!',
  keywords: [
    'NEET dropper biology coaching',
    'biology for NEET repeaters online',
    'biology coaching dropper batch online',
    'NEET biology improvement online',
    'best biology coaching NEET dropper',
  ],

  hero: {
    headline: 'Biology: Your Secret Weapon for NEET Success',
    subheadline:
      'Most droppers improve maximum in Biology. Expert online coaching to add 50+ marks to your biology score.',
    highlightedText: '360 Marks in Biology = Top Rank',
    ctaText: 'Boost Your Biology Score',
    ctaLink: '/courses/neet-dropper',
    backgroundGradient: 'from-green-900 via-green-800 to-green-800',
  },

  painPoints: {
    title: 'Why Biology is Key for Droppers',
    points: [
      {
        icon: 'pie-chart',
        question: 'Biology is 50% of NEET marks (360/720)',
        solution:
          'Maximum weightage, maximum opportunity. Improve biology = Improve rank dramatically.',
      },
      {
        icon: 'trending-up',
        question: 'Biology has highest improvement potential',
        solution:
          'Unlike Physics/Chemistry, biology improvement is more achievable with right guidance.',
      },
      {
        icon: 'book',
        question: 'Previous attempt biology score not satisfactory?',
        solution: 'We identify gaps and fix them systematically. Average improvement: 50-80 marks.',
      },
      {
        icon: 'user-check',
        question: 'Need specialized biology coaching?',
        solution: 'AIIMS faculty with 15+ years NEET experience. Biology-specific strategies.',
      },
    ],
  },

  benefits: {
    title: 'Dropper Biology Strategy',
    subtitle: 'How we maximize your biology score',
    items: [
      {
        icon: 'search',
        title: 'Weak Area Identification',
        description: 'Chapter-wise analysis of your previous attempt. Target weak chapters first.',
      },
      {
        icon: 'book',
        title: 'NCERT Mastery',
        description: 'Line-by-line NCERT coverage. 95% NEET questions are NCERT-based.',
      },
      {
        icon: 'layers',
        title: 'Conceptual Depth',
        description: 'Beyond memorization. Understanding that helps solve twisted questions.',
      },
      {
        icon: 'clipboard',
        title: 'Extensive MCQ Practice',
        description: '5000+ biology MCQs. Every question type, every difficulty level.',
      },
      {
        icon: 'image',
        title: 'Diagram Mastery',
        description: 'Diagram-based questions are scoring. We cover every NCERT diagram.',
      },
      {
        icon: 'zap',
        title: 'Speed Building',
        description: 'Practice to solve biology in 35-40 minutes. Save time for Physics.',
      },
    ],
  },

  faqs: [
    {
      question: 'How much can biology score improve in drop year?',
      answer:
        'Typical improvement is 50-80 marks in biology. Students scoring 220-240 often reach 300-320. Those at 260-280 can target 330-350. Biology has the highest improvement potential among all subjects with systematic preparation.',
    },
    {
      question: 'What makes your biology coaching different for droppers?',
      answer:
        "Dropper-specific approach: Gap analysis first, focus on weak chapters, extensive MCQ practice, speed building, and NCERT mastery. We don't treat droppers like first-time students - the approach is targeted improvement.",
    },
    {
      question: 'Is NCERT enough for biology in NEET?',
      answer:
        'For 95% of questions, yes. We focus on NCERT mastery first. For the remaining 5% and twisted questions, we add selective advanced concepts. The key is NCERT depth, not breadth from multiple books.',
    },
    {
      question: 'Which biology chapters should droppers focus on?',
      answer:
        'High-yield chapters: Human Physiology, Genetics and Molecular Biology, Ecology, and Plant Physiology. These contribute 70%+ of biology marks. We prioritize these while ensuring complete coverage.',
    },
    {
      question: 'Do you provide biology-only coaching for droppers?',
      answer:
        'Yes, we offer biology-only packages for students who need improvement in biology specifically. Fee: ₹45,000/year for biology-focused intensive coaching. This includes classes, material, and tests for biology.',
    },
    {
      question: 'How many biology mock tests are included?',
      answer:
        'Biology-specific: 30+ chapter tests, 20+ cumulative tests. Full NEET: 50+ mock tests with biology section analysis. Total biology questions practiced: 5000+. Detailed analysis after every test.',
    },
  ],

  cta: {
    title: 'Master Biology, Master NEET',
    subtitle: 'Add 50+ marks to your biology score. The online coaching that delivers.',
    primaryButton: {
      text: 'Boost Biology Score',
      link: '/courses/neet-dropper',
    },
    secondaryButton: {
      text: 'Free Biology Assessment',
      link: '/book-demo?type=biology-assessment',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Why Biology is the Fastest Path to NEET Score Improvement',
        body: 'Biology constitutes 360 out of 720 marks in NEET, making it the single most influential subject for rank improvement. Unlike Physics, which demands strong mathematical reasoning, or Chemistry, which requires balancing organic reaction mechanisms with inorganic memorization, Biology rewards systematic reading and concept-based understanding. Droppers who scored 220-250 in Biology during their first attempt can realistically target 310-340 with focused coaching. The improvement comes from three areas: filling NCERT gaps where lines were skipped during first reading, mastering diagram-based questions that carry 40-50 marks, and building speed to complete the Biology section in 35-40 minutes instead of the typical 50-55 minutes that most students take.',
      },
      {
        heading: 'Chapter-Wise Biology Strategy for Maximum Improvement',
        body: 'Not all Biology chapters yield equal marks per hour of study. Human Physiology alone contributes 25-30 marks and responds well to focused revision because its process-based questions follow predictable patterns. Genetics and Molecular Biology together add another 15-20 marks and require problem-solving practice rather than pure memorization. Ecology is the easiest scoring unit with 10-12 marks available from straightforward NCERT-based questions. Our dropper biology coaching allocates preparation time proportional to each chapter weightage while factoring in your individual weak areas. This means a student weak in Plant Physiology receives additional sessions and practice sets for photosynthesis, respiration, and mineral nutrition, while someone struggling with Genetics gets extra pedigree analysis and cross-ratio practice.',
      },
      {
        heading: 'Building Biology Speed Without Sacrificing Accuracy',
        body: 'In NEET, the ability to finish Biology quickly and accurately creates a time buffer for the more calculation-heavy Physics and Chemistry sections. Speed in Biology comes from three competencies: instant recall of NCERT facts through active revision techniques, quick pattern recognition in diagram-based and matching-type questions, and efficient elimination strategies for assertion-reason problems. Our coaching develops all three through daily timed quizzes of 20 questions in 15 minutes, weekly speed tests that simulate exam pressure, and error analysis sessions where students learn to identify distractor options. Most students see a 10-15 minute reduction in Biology completion time within three months of joining the program.',
      },
    ],
    comparisonTable: [
      { 'Biology Area': 'Human Physiology', 'NEET Marks': '25-30', 'Improvement Potential': 'Very High', 'Key Strategy': 'Process flowcharts + diagram mastery' },
      { 'Biology Area': 'Genetics + Molecular Biology', 'NEET Marks': '15-20', 'Improvement Potential': 'High', 'Key Strategy': 'Problem-solving practice + cross ratios' },
      { 'Biology Area': 'Ecology', 'NEET Marks': '10-12', 'Improvement Potential': 'High', 'Key Strategy': 'NCERT line-by-line reading' },
      { 'Biology Area': 'Plant Physiology', 'NEET Marks': '10-15', 'Improvement Potential': 'Moderate', 'Key Strategy': 'Pathway diagrams + comparison tables' },
      { 'Biology Area': 'Diversity of Life', 'NEET Marks': '10-12', 'Improvement Potential': 'Moderate', 'Key Strategy': 'Classification tables + examples' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET Dropper Biology Coaching',
    provider: 'Cerebrum Biology Academy',
    description:
      'Specialized online biology coaching for NEET droppers to maximize score improvement.',
    duration: 'P1Y',
    price: 80000,
    priceCurrency: 'INR',
  },
}

// Page 4: /best-coaching-neet-droppers/
export const bestCoachingNeetDroppers: SEOLandingContent = {
  ...dropperBaseContent,
  testimonials: [
    {
      name: 'Rahul Thakur',
      achievement: 'AIR 167 | AIIMS Delhi (Dropper)',
      quote:
        'I researched 20+ coaching options for droppers. Cerebrum had the best results, smallest batches, and most personalised approach. My 660 score proved it.',
      score: '660/720',
    },
    {
      name: 'Kritika Joshi',
      achievement: 'AIR 334 | MAMC Delhi (2nd Attempt)',
      quote:
        'The best coaching for NEET droppers is one that treats you as an individual, not a batch number. Cerebrum knew my name, my weak chapters, and my study pattern.',
      score: '635/720',
    },
    {
      name: 'Deepak Yadav',
      achievement: 'AIR 567 | JIPMER Puducherry (Dropper)',
      quote:
        'After wasting a year at a big factory coaching, I found Cerebrum. The personalised dropper program with 10-student batches was exactly what I needed.',
      score: '615/720',
    },
  ],
  slug: 'best-coaching-neet-droppers',

  title: 'Best Coaching for NEET Droppers Online | 92% Success Rate',
  metaDescription:
    "India's best online coaching for NEET droppers. 92% success rate, 85+ AIIMS selections, AIIMS faculty. Join the proven path to medical college!",
  keywords: [
    'best coaching for NEET droppers',
    'NEET dropper coaching online',
    'top NEET coaching for repeaters',
    'best online coaching NEET dropper',
    'NEET dropper success coaching',
  ],

  hero: {
    headline: 'The Best Coaching for Your Second Chance',
    subheadline:
      '92% success rate. 85+ AIIMS/JIPMER selections. The online coaching that turns droppers into doctors.',
    highlightedText: 'Proven Results. Proven Methodology.',
    ctaText: 'Join The Best',
    ctaLink: '/courses/neet-dropper',
    backgroundGradient: 'from-yellow-900 via-yellow-900 to-orange-900',
  },

  painPoints: {
    title: 'Why Choose The Best Coaching?',
    points: [
      {
        icon: 'alert-circle',
        question: "Previous coaching didn't deliver?",
        solution:
          'Experience the difference with proven methodology. 92% of our droppers qualify NEET.',
      },
      {
        icon: 'dollar-sign',
        question: 'Worried about investing in coaching again?',
        solution: 'Results justify investment. Our alumni are now doctors at AIIMS, JIPMER, MAMC.',
      },
      {
        icon: 'map-pin',
        question: 'No good coaching in your city?',
        solution:
          "Online access to India's best faculty. Geography no longer limits your preparation.",
      },
      {
        icon: 'star',
        question: 'How to identify the best coaching?',
        solution:
          "Look at results: 85+ AIIMS selections, 5.0/5 rating, 15+ years experience. That's us.",
      },
    ],
  },

  benefits: {
    title: 'What Makes Us The Best',
    subtitle: 'The factors that drive our 92% success rate',
    items: [
      {
        icon: 'award',
        title: 'Proven Track Record',
        description:
          '85+ AIIMS/JIPMER selections from dropper batch. Results speak for themselves.',
      },
      {
        icon: 'user-check',
        title: 'AIIMS Faculty',
        description: 'Dr. Shekhar and team are AIIMS alumni. They know the path to success.',
      },
      {
        icon: 'users',
        title: 'Small Batches',
        description: 'Only 10-12 students per batch. Personal attention guaranteed.',
      },
      {
        icon: 'clipboard',
        title: 'Intensive Program',
        description: '6 days/week classes, 50+ mock tests, 10,000+ MCQs. Complete preparation.',
      },
      {
        icon: 'heart',
        title: 'Mental Support',
        description: 'Dedicated motivation and stress management. Drop year wellness matters.',
      },
      {
        icon: 'trending-up',
        title: 'Continuous Improvement',
        description: 'Weekly tracking, gap analysis, strategy adjustment. Always improving.',
      },
    ],
  },

  faqs: [
    {
      question: 'What makes Cerebrum the best coaching for NEET droppers?',
      answer:
        'Three things: 1) Results - 92% success rate, 85+ AIIMS selections, 2) Faculty - AIIMS alumni with 15+ years experience, 3) Approach - Personalized preparation with gap analysis and mental wellness support. Our online droppers match Kota results.',
    },
    {
      question: 'How does your success rate compare to offline coaching?',
      answer:
        'Our 92% success rate matches or exceeds top Kota institutes. Online advantages: no relocation stress, better study environment, same faculty quality, and often more personal attention due to smaller batch sizes.',
    },
    {
      question: 'Can I see testimonials from successful droppers?',
      answer:
        'Yes! Visit our Success Stories page for detailed testimonials, video interviews, and result cards from 85+ AIIMS/JIPMER selections. Real students, real stories, verifiable results.',
    },
    {
      question: 'How is personal attention ensured in online coaching?',
      answer:
        'Small batches (10-12 students), weekly one-on-one sessions for Pinnacle batch, WhatsApp access to faculty, doubt sessions, and monthly parent-teacher meetings. Personal attention is actually better online than in 100+ student offline batches.',
    },
    {
      question: "What if I don't improve despite best coaching?",
      answer:
        'This rarely happens with committed students. If you attend regularly, complete assignments, and put in honest effort, improvement is guaranteed. We provide refund policy for genuine cases of no improvement.',
    },
    {
      question: 'How do I join the best coaching for NEET droppers?',
      answer:
        "Book a free counseling session. We'll assess your situation, discuss expectations, and create a plan. If there's mutual fit, you can enroll. New batches start June and July. Limited seats!",
    },
  ],

  cta: {
    title: "Join India's Best Dropper Coaching",
    subtitle: '92% success rate. 85+ AIIMS selections. Your success story awaits.',
    primaryButton: {
      text: 'Enroll Now',
      link: '/courses/neet-dropper',
    },
    secondaryButton: {
      text: 'See Success Stories',
      link: '/success-stories?filter=droppers',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'What Separates the Best NEET Dropper Coaching from Average Institutes',
        body: 'The best coaching for NEET droppers is defined not by brand name or advertising budget, but by measurable student outcomes. Three metrics matter: success rate among dropper students specifically, average score improvement from first to second attempt, and the faculty-to-student ratio that determines how much personal attention each student receives. Large coaching chains may boast thousands of selections, but their dropper-specific success rate is often below 40 percent because repeaters are mixed into general batches without targeted gap analysis. At Cerebrum, our 92 percent success rate among droppers comes from a fundamentally different model: small batches of 10-12 students, a diagnostic-first approach that customizes the study plan, and AIIMS-trained faculty who have themselves navigated the competitive exam journey.',
      },
      {
        heading: 'The Role of Faculty Quality in Dropper Success',
        body: 'For dropper students, the teaching approach matters more than the content itself because they have already covered the syllabus once. What they need is a different lens on the same material. Faculty who are AIIMS or top medical college alumni bring clinical thinking into Biology teaching, making abstract concepts tangible through real medical applications. They can explain why the cardiac cycle works the way it does by connecting it to ECG interpretation, or why Mendelian ratios matter by linking them to genetic counseling scenarios. This contextual teaching creates deeper understanding that survives the pressure of exam day. Our faculty team averages 15 years of NEET coaching experience, and each teacher specializes in specific chapters rather than teaching the entire syllabus, ensuring expert-level depth in every session.',
      },
    ],
    checklist: [
      { item: 'Verify the coaching success rate among droppers specifically', explanation: 'Overall success rates can be misleading if they include first-time students with higher base scores.' },
      { item: 'Check the faculty-to-student ratio', explanation: 'Batches larger than 15 students make personal attention and doubt resolution impractical.' },
      { item: 'Ask for verifiable testimonials with score cards', explanation: 'Genuine coaching institutes can provide real student results with before-and-after scores.' },
      { item: 'Confirm that mental wellness support is included', explanation: 'Drop year stress directly impacts performance, so psychological support is not optional.' },
      { item: 'Ensure mock tests include detailed chapter-wise analysis', explanation: 'A rank alone is useless; what matters is knowing exactly which chapters need more work.' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'Best NEET Dropper Coaching',
    provider: 'Cerebrum Biology Academy',
    description:
      "India's best online coaching for NEET droppers with 92% success rate and 85+ AIIMS selections.",
    duration: 'P1Y',
    price: 80000,
    priceCurrency: 'INR',
  },
}

// Page 5: /one-year-neet-dropper-course/
export const oneYearNeetDropperCourse: SEOLandingContent = {
  ...dropperBaseContent,
  testimonials: [
    {
      name: 'Nitin Agarwal',
      achievement: 'AIR 245 | AIIMS Delhi (Dropper)',
      quote:
        'The one-year dropper course at Cerebrum had a month-by-month roadmap. I knew exactly what to study when. No wasted days, no confusion.',
      score: '648/720',
    },
    {
      name: 'Pooja Bhardwaj',
      achievement: 'AIR 478 | BHU Varanasi (2nd Attempt)',
      quote:
        'One year was enough to transform my NEET score from 485 to 628. The structured one-year course with daily targets made every day count.',
      score: '628/720',
    },
    {
      name: 'Vivek Rathore',
      achievement: 'AIR 689 | KGMU Lucknow (Dropper)',
      quote:
        'The one-year course covered complete Class 11 and 12 revision in 8 months, leaving 4 months for pure test practice. Perfect planning.',
      score: '608/720',
    },
  ],
  slug: 'one-year-neet-dropper-course',

  title: 'One Year NEET Dropper Course Online | Complete Preparation',
  metaDescription:
    'Complete one-year NEET dropper course online. Full syllabus revision, 50+ mock tests, personal mentorship. Turn your drop year into success year!',
  keywords: [
    'one year NEET dropper course',
    'NEET repeater online classes',
    'year long NEET dropper program',
    'complete NEET dropper course online',
    'NEET drop year online coaching',
  ],

  hero: {
    headline: 'One Year. One Goal. Complete Transformation.',
    subheadline:
      'A structured 12-month online program that takes you from NEET struggle to NEET success.',
    highlightedText: '365 Days to AIIMS',
    ctaText: 'See Complete Program',
    ctaLink: '/courses/neet-dropper',
    backgroundGradient: 'from-blue-900 via-indigo-900 to-violet-900',
  },

  painPoints: {
    title: 'Making Every Day Count',
    points: [
      {
        icon: 'calendar',
        question: 'A whole year - how to use it effectively?',
        solution: 'Our structured 12-month plan ensures productive use of every week, every day.',
      },
      {
        icon: 'compass',
        question: 'No direction in drop year?',
        solution: 'Clear monthly milestones and weekly targets. Always know what to focus on.',
      },
      {
        icon: 'clock',
        question: 'Time management during drop year?',
        solution: 'Balanced schedule: 6 days classes, strategic self-study, regular tests.',
      },
      {
        icon: 'battery',
        question: 'Maintaining motivation for 12 months?',
        solution: 'Built-in motivation support, peer community, visible progress keeps you going.',
      },
    ],
  },

  benefits: {
    title: 'The Complete One-Year Journey',
    subtitle: '12 months of structured preparation online',
    items: [
      {
        icon: 'flag',
        title: 'Phase 1: Reset (Month 1-2)',
        description:
          'Diagnostic tests, gap identification, foundation reinforcement, mindset reset.',
      },
      {
        icon: 'book',
        title: 'Phase 2: Rebuild (Month 3-5)',
        description: 'Complete syllabus revision with NEET depth. Fix all weak areas.',
      },
      {
        icon: 'clipboard',
        title: 'Phase 3: Practice (Month 6-8)',
        description: 'Intensive MCQ practice, chapter tests, start mock tests.',
      },
      {
        icon: 'bar-chart',
        title: 'Phase 4: Perfect (Month 9-10)',
        description: 'Weekly full mocks, detailed analysis, strategy refinement.',
      },
      {
        icon: 'zap',
        title: 'Phase 5: Peak (Month 11-12)',
        description: 'Final revision, confidence building, exam strategy mastery.',
      },
      {
        icon: 'award',
        title: 'Result: Victory',
        description: 'Walk into NEET fully prepared. Execute your plan. Achieve your goal.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is included in the one-year NEET dropper course?',
      answer:
        'Complete package: 6-day weekly live online classes (300+ hours), study material (printed/digital), 50+ mock tests with analysis, 10,000+ practice MCQs, doubt support 24/7, mental wellness sessions, and personal mentorship from Dr. Shekhar.',
    },
    {
      question: 'What is the daily schedule in one-year dropper course?',
      answer:
        'Typical day: 4-5 hours online classes + 4-5 hours self-study + 1 hour revision. Total 10-11 productive hours. Sundays are for tests or light revision. The schedule is intensive but sustainable for 12 months.',
    },
    {
      question: 'When does the one-year dropper batch start?',
      answer:
        'Main batches start in June and July. Accelerated batch for late joiners starts in August-September. Earlier you join, more revision cycles you get. We recommend joining by July for best results.',
    },
    {
      question: 'How many mock tests are conducted in one year?',
      answer:
        "50+ full mock tests: Weekly mocks from Month 6 onwards, bi-weekly earlier. Each mock with detailed analysis, rank prediction, and weak area identification. You'll write more tests than actual NEET takers!",
    },
    {
      question: 'Is one year enough for NEET dropper to crack exam?',
      answer:
        'Absolutely enough if used well. Our structured program ensures: complete syllabus coverage by Month 5, 4 months of intensive practice, 2 months of revision. Many of our toppers improved 100+ marks in one year.',
    },
    {
      question: 'What is the fee for one-year NEET dropper online course?',
      answer:
        'Complete one-year program: ₹80,000. This includes everything - classes, material, tests, mentorship, wellness support. EMI at ₹4,500/month available. Best investment for your medical career.',
    },
  ],

  cta: {
    title: 'Your Best Year Starts Now',
    subtitle: 'One year, complete transformation. Join the journey to becoming a doctor.',
    primaryButton: {
      text: 'Enroll in One-Year Program',
      link: '/courses/neet-dropper',
    },
    secondaryButton: {
      text: 'Download Program Guide',
      link: '/free-resources?type=dropper-program-guide',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'The Five Phases of a Successful One-Year Dropper Journey',
        body: 'A twelve-month NEET dropper course is most effective when divided into distinct phases, each with clear objectives. Phase 1 (Months 1-2) focuses on diagnostic assessment and foundational repair, addressing the specific conceptual gaps identified from your previous attempt. Phase 2 (Months 3-5) covers complete syllabus revision with NEET-level depth, ensuring every chapter from both Class 11 and Class 12 is thoroughly understood. Phase 3 (Months 6-8) shifts to intensive MCQ practice with chapter-wise and cumulative tests. Phase 4 (Months 9-10) introduces weekly full-length mock tests with detailed performance analytics. Phase 5 (Months 11-12) is dedicated to targeted revision of high-yield topics, confidence building, and exam strategy refinement. This phased approach prevents the common dropper mistake of spending too long on theory and running out of practice time.',
      },
      {
        heading: 'Daily Routine That Maximizes Productivity Over Twelve Months',
        body: 'Sustainability is the most important quality of a dropper daily routine. A schedule that works for two weeks but leads to burnout by month three is worse than useless. The optimal routine for online dropper students includes 4-5 hours of live classes in the morning when cognitive energy is highest, followed by a lunch break with light physical activity. The afternoon session of 3-4 hours focuses on self-practice: solving MCQs from the topics covered in morning classes, reviewing error logs from previous tests, and completing assigned problem sets. The evening hour is reserved for revision of one previously completed chapter using flashcards or summary notes. This 10-hour productive day, maintained six days a week with complete rest on the seventh day, produces approximately 2,800 productive hours across the year, more than sufficient to achieve a 100+ marks improvement.',
      },
      {
        heading: 'Tracking Progress and Adjusting Strategy Mid-Year',
        body: 'One of the biggest advantages of a structured one-year course over self-study is systematic progress tracking. Every two weeks, our program generates a performance report showing chapter-wise accuracy, speed metrics, and trend analysis comparing current performance to previous weeks. This data drives strategy adjustments: if a student plateaus in Genetics after steady improvement, the faculty prescribes additional problem sets targeting the specific question types causing difficulty. If mock test scores stagnate around 550, the analysis might reveal that the student is losing marks in Plant Physiology diagrams, leading to focused diagram practice sessions. Without this feedback loop, droppers often continue studying the same way for months without improvement, a frustrating pattern that our data-driven approach prevents entirely.',
      },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'One Year NEET Dropper Course',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete one-year online course for NEET droppers with structured preparation and comprehensive support.',
    duration: 'P1Y',
    price: 80000,
    priceCurrency: 'INR',
  },
}

// Page: /neet-repeaters-2026/
export const neetRepeaters2026: SEOLandingContent = {
  ...dropperBaseContent,
  testimonials: [
    {
      name: 'Ankit Verma',
      achievement: 'AIR 312 | AIIMS Delhi (2026 Repeater)',
      quote:
        'NEET 2025 was a disaster at 470. Cerebrum 2026 repeater batch rebuilt my biology from chapter 1. Scored 350 in biology and 640 overall in NEET 2026.',
      score: '640/720',
    },
    {
      name: 'Shraddha Kapoor',
      achievement: 'AIR 534 | MAMC Delhi (2026 Attempt)',
      quote:
        'The 2026 repeater batch had updated PYQ analysis and new pattern questions. Cerebrum stays current with NEET trends, which big coachings ignore.',
      score: '618/720',
    },
    {
      name: 'Mohit Tiwari',
      achievement: 'AIR 756 | AIIMS Jodhpur (2nd Attempt)',
      quote:
        'My 2026 NEET preparation at Cerebrum focused on eliminating negative marks. Biology accuracy went from 75% to 95%. That alone added 40 marks.',
      score: '600/720',
    },
  ],
  slug: 'neet-repeaters-2026',

  title: 'NEET Repeaters 2026 | Dropper Batch for Second Attempt Success',
  metaDescription:
    'Join NEET Repeaters 2026 batch designed specifically for droppers. Proven 92% success rate, 100+ marks improvement guarantee. Expert mentorship for your second attempt.',
  keywords: [
    'neet repeaters 2026',
    'neet dropper batch 2026',
    'neet second attempt',
    'neet 2nd attempt preparation',
    'neet repeater course',
    'neet drop year 2026',
    'best coaching for neet repeaters',
  ],

  hero: {
    headline: 'NEET Repeaters 2026: Your Second Chance, Our Full Support',
    subheadline:
      'Specially designed dropper program for NEET 2026. Learn from your first attempt, fix the gaps, and score 650+ this time. Over 1,200 successful droppers trust us.',
    highlightedText: 'Transform Your Gap Year into AIIMS Year',
    ctaText: 'Join 2026 Repeaters Batch',
    ctaLink: '/courses/neet-dropper',
  },

  painPoints: {
    title: 'We Know What You Are Going Through',
    points: [
      {
        icon: 'refresh-cw',
        question: 'Disappointed with your NEET result?',
        solution:
          'Most AIIMS doctors took multiple attempts. Your first attempt gave you experience - now use it strategically.',
      },
      {
        icon: 'users',
        question: 'Friends moving to college while you retake?',
        solution:
          'Join a community of 200+ motivated repeaters who understand your journey. You are not alone.',
      },
      {
        icon: 'clock',
        question: 'Worried about wasting another year?',
        solution:
          'Our structured 12-month program ensures every day counts. No aimless studying, only strategic improvement.',
      },
      {
        icon: 'target',
        question: 'Not sure where you went wrong?',
        solution:
          'Comprehensive diagnostic test on Day 1 to identify exact gaps. Targeted fixing, not repetition of everything.',
      },
    ],
  },

  benefits: {
    title: 'The 2026 Repeaters Advantage',
    subtitle: 'Why your second attempt will succeed with us',
    items: [
      {
        icon: 'search',
        title: 'Diagnostic Assessment',
        description:
          'Detailed analysis of your previous attempt to identify exactly what needs fixing.',
      },
      {
        icon: 'calendar',
        title: 'Full Year Dedication',
        description:
          'No school distractions. 100% focus on NEET for 12 months. Maximum study hours.',
      },
      {
        icon: 'zap',
        title: 'Intensive Schedule',
        description:
          '6 days/week classes with 10+ hours daily productive time. Transform through consistency.',
      },
      {
        icon: 'bar-chart',
        title: 'Weekly Mock Tests',
        description:
          '50+ full-length tests throughout the year. Practice exam pressure until it becomes routine.',
      },
      {
        icon: 'heart',
        title: 'Mental Wellness Focus',
        description:
          'Dedicated counseling and motivation sessions. Drop year stress is real - we address it.',
      },
      {
        icon: 'user-check',
        title: 'Personal Mentorship',
        description:
          'Dr. Shekhar personally tracks every repeater student. Monthly one-on-one sessions.',
      },
    ],
  },

  stats: [
    { value: '92%', label: 'Success Rate', icon: 'trophy' },
    { value: '650+', label: 'Avg 2nd Attempt Score', icon: 'target' },
    { value: '1,200+', label: 'Droppers Trained', icon: 'users' },
    { value: '120+', label: 'Avg Improvement', icon: 'trending-up' },
  ],

  faqs: [
    {
      question: 'Is taking a drop year for NEET worth it in 2026?',
      answer:
        'Absolutely. NEET 2026 gives you full 12 months of focused preparation. Statistics show: 65% of medical students took 2+ attempts, average improvement with structured drop year is 80-150 marks, and medical college seats are increasing every year. If you are committed, the drop year is your best investment.',
    },
    {
      question: 'How is the NEET Repeaters 2026 batch different from fresh batch?',
      answer:
        'Key differences: Faster syllabus coverage (you have seen it once), more focus on practice and tests (less theory repetition), psychological support for drop year challenges, peer group of serious repeaters only, and personalized gap analysis based on your previous attempt.',
    },
    {
      question: 'What marks improvement can I expect as a repeater?',
      answer:
        'Our repeater students typically improve by 80-150 marks. Average improvement is 120 marks. Students who follow our schedule completely have seen up to 180 marks improvement. Your improvement depends on your effort and following our strategy.',
    },
    {
      question: 'When does the NEET 2026 repeaters batch start?',
      answer:
        'Main batch starts June 2027 (right after NEET 2027 results). We also have July batch for students who decide later. Earlier you join, more revision cycles you complete. Registration opens April 2027.',
    },
    {
      question: 'What if I fail again in NEET 2026?',
      answer:
        'Our 92% success rate means this is rare, but we support you regardless. We offer: discounted re-enrollment for third attempt, career counseling for alternative paths (BDS, BAMS, Abroad), and lifetime access to study materials. You will not be abandoned.',
    },
    {
      question: 'What is the fee for NEET Repeaters 2026 batch?',
      answer:
        'Complete program: Rs 80,000/year (original Rs 95,000). Includes: 6-day weekly live classes, printed study material, 50+ mock tests, mental wellness support, and personal mentorship. EMI at Rs 4,500/month available.',
    },
  ],

  courseSummary: {
    title: 'NEET Repeaters 2026 Batch',
    duration: '12 Months (June 2027 - May 2028)',
    batchSize: '10-12 Students per batch',
    features: [
      'Diagnostic assessment of previous attempt',
      'Live online classes 6 days/week',
      'Complete Class 11 + 12 strategic revision',
      '50+ mock tests with detailed analysis',
      '10,000+ practice MCQs',
      'Personal mentorship from Dr. Shekhar',
      'Weekly progress tracking',
      'Mental wellness and motivation support',
    ],
    price: {
      original: 95000,
      discounted: 80000,
      emi: '₹4,500/month',
    },
  },

  cta: {
    title: 'Turn Your 2026 Into AIIMS Year',
    subtitle: 'Join 200+ motivated repeaters preparing for NEET 2026. Limited seats available.',
    primaryButton: {
      text: 'Join Repeaters Batch',
      link: '/courses/neet-dropper',
    },
    secondaryButton: {
      text: 'Book Free Counseling',
      link: '/book-demo?type=repeater-counseling',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Why 2026 Is the Right Year to Reattempt NEET',
        body: 'The NEET 2026 landscape offers repeaters several structural advantages. Medical college seats in India have increased steadily, with new AIIMS and government medical colleges adding thousands of seats over the past three years. This means a score of 600 in 2026 can secure a better college than the same score did in 2023. Additionally, the shift to a more standardized NTA exam pattern means that preparation strategies are now well-established and predictable. Repeaters who understand the pattern from their first attempt and combine that knowledge with twelve months of focused preparation are statistically more likely to secure a government medical seat. Our 2026 batch is designed to leverage these advantages, starting with a comprehensive analysis of your 2025 performance and building a personalized roadmap to your target score.',
      },
      {
        heading: 'Building on First Attempt Experience for Maximum Score Jump',
        body: 'Your first NEET attempt provided invaluable data that no textbook can teach. You know your exam-day behavior: which sections you rushed through, where you spent too much time on a single question, and how fatigue affected your performance in the final hour. Our 2026 repeaters batch converts this experience into actionable strategy. We begin with a detailed first-attempt debrief where you walk through the paper with a mentor, identifying not just wrong answers but the reasoning patterns that led to those errors. This meta-cognitive approach, understanding how you think during the exam, is far more valuable than simply re-studying content. Students who complete this debrief and follow the resulting personalized plan typically improve by 100-150 marks, significantly above the 80-mark average improvement seen in unstructured drop years.',
      },
    ],
    comparisonTable: [
      { 'Factor': 'First Attempt Score', 'Unstructured Drop Year': '+50-80 marks avg', 'Cerebrum 2026 Batch': '+100-150 marks avg' },
      { 'Factor': 'Study Plan', 'Unstructured Drop Year': 'Generic syllabus repeat', 'Cerebrum 2026 Batch': 'Personalized gap-based roadmap' },
      { 'Factor': 'Mock Tests', 'Unstructured Drop Year': '10-15 self-purchased', 'Cerebrum 2026 Batch': '50+ with detailed chapter analysis' },
      { 'Factor': 'Peer Support', 'Unstructured Drop Year': 'Studying alone', 'Cerebrum 2026 Batch': 'Community of 200+ motivated repeaters' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET Repeaters 2026 Batch',
    provider: 'Cerebrum Biology Academy',
    description:
      'Specialized NEET preparation course for repeaters and droppers appearing for NEET 2026.',
    duration: 'P12M',
    price: 80000,
    priceCurrency: 'INR',
  },
}

// Page: /neet-dropper-batch/ (Central Hub)
export const neetDropperBatch: SEOLandingContent = {
  ...dropperBaseContent,
  testimonials: [
    {
      name: 'Shivam Gupta',
      achievement: 'AIR 289 | AIIMS Delhi (Dropper)',
      quote:
        'The dropper batch at Cerebrum is not a repeat of Class 11-12 coaching. It is a completely redesigned programme that targets exactly where droppers fail.',
      score: '645/720',
    },
    {
      name: 'Rashmi Sinha',
      achievement: 'AIR 445 | Lady Hardinge (2nd Attempt)',
      quote:
        'What makes this dropper batch special is the mental health support alongside academics. Dr. Shekhar understood the emotional toll of taking a drop year.',
      score: '622/720',
    },
    {
      name: 'Tushar Malik',
      achievement: 'AIR 678 | BHU Varanasi (Dropper)',
      quote:
        'The dropper batch had 6 full-length NEET simulations under real exam conditions. By NEET day, the exam hall felt familiar, not intimidating.',
      score: '602/720',
    },
  ],
  slug: 'neet-dropper-batch',

  title: 'NEET Dropper Batch 2026 Delhi NCR | Online & Offline | Cerebrum Academy',
  metaDescription:
    'NEET dropper batch 2026 by Cerebrum Academy. Online & offline in Delhi NCR — South Extension, Gurugram, Noida. AIIMS faculty, 15-student batches, 92% success rate. 80-120 marks avg improvement. Join now!',
  keywords: [
    'NEET dropper batch 2026',
    'NEET dropper batch Delhi',
    'NEET dropper course Delhi NCR',
    'NEET repeater batch 2026',
    'best NEET dropper coaching Delhi',
    'NEET drop year coaching',
    'NEET dropper batch near me',
    'NEET dropper batch online',
    'NEET dropper batch offline Delhi',
    'NEET second attempt coaching',
    'NEET dropper batch Gurugram',
    'NEET dropper batch Noida',
  ],

  hero: {
    headline: 'NEET Dropper Batch 2026 — Your Comeback Starts Here',
    subheadline:
      'Turn your drop year into a medical seat. Choose online or attend in person at our Delhi NCR centers. AIIMS faculty, 15-student batches, and a proven 92% success rate.',
    highlightedText: '80-120 Marks Average Improvement',
    ctaText: 'Join 2026 Dropper Batch',
    ctaLink: '/enrollment',
    backgroundGradient: 'from-red-900 via-orange-900 to-amber-900',
  },

  painPoints: {
    title: 'We Know What You Are Going Through',
    points: [
      {
        icon: 'refresh-cw',
        question: 'Scored below your potential in NEET?',
        solution:
          'Most AIIMS toppers took 2 attempts. Our structured dropper program identifies exactly where you fell short and fixes it methodically.',
      },
      {
        icon: 'map-pin',
        question: 'Confused between online and offline coaching?',
        solution:
          'Choose what works for you — attend live classes at our South Extension, Gurugram or Noida centers, or study from home with our online batch. Same faculty, same results.',
      },
      {
        icon: 'users',
        question: 'Worried about large crowded batches?',
        solution:
          'Only 10-15 students per batch. Every doubt gets answered. Every student gets personal attention from Dr. Shekhar and the AIIMS faculty team.',
      },
      {
        icon: 'target',
        question: 'Not sure if a drop year is worth it?',
        solution:
          '1,200+ Cerebrum droppers have cracked NEET. Average improvement: 80-120 marks. The numbers speak for themselves.',
      },
    ],
  },

  benefits: {
    title: 'Why Cerebrum Dropper Batch Works',
    subtitle: 'A focused year designed around how droppers actually need to study',
    items: [
      {
        icon: 'search',
        title: 'Diagnostic Gap Analysis',
        description: 'Day-one assessment pinpoints weak chapters. Your study plan is built around YOUR gaps, not a generic syllabus.',
      },
      {
        icon: 'map-pin',
        title: 'Online + Offline Flexibility',
        description: 'Attend classes at South Extension, Gurugram or Noida centers or join the online batch. Switch modes anytime.',
      },
      {
        icon: 'calendar',
        title: 'Intensive 6-Day Schedule',
        description: 'Complete Class 11 + 12 revision in a structured year-long program. No school distractions — 100% NEET focus.',
      },
      {
        icon: 'bar-chart',
        title: '50+ Full-Length Mock Tests',
        description: 'Weekly NEET-pattern tests with detailed analysis. Track your improvement every single week.',
      },
      {
        icon: 'heart',
        title: 'Mental Wellness Support',
        description: 'Drop year stress is real. Weekly motivation sessions, peer groups, and one-on-one counseling keep you on track.',
      },
      {
        icon: 'user-check',
        title: 'Personal Mentorship by Dr. Shekhar',
        description: 'AIIMS alumnus Dr. Shekhar personally mentors every dropper student. Strategy calls, doubt sessions, and career guidance.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is the NEET dropper batch fee at Cerebrum Academy?',
      answer:
        'The NEET dropper batch fee is Rs 80,000 per year (MRP Rs 95,000). This includes 6-day weekly classes, complete study material, 50+ mock tests, mental wellness support, and personal mentorship. EMI option available at Rs 4,500 per month. This is significantly more affordable than Aakash (Rs 1.36 lakh+) or Allen while offering smaller batches.',
    },
    {
      question: 'Is the dropper batch available online and offline both?',
      answer:
        'Yes. You can attend classes in person at our South Extension (Delhi), Gurugram, or Noida centers, or join the fully online batch from anywhere in India. Both modes have the same AIIMS faculty, same curriculum, and same test series. Many students start offline and switch to online closer to the exam.',
    },
    {
      question: 'How much can I improve my NEET score in a drop year?',
      answer:
        'Our dropper students improve by 80-120 marks on average. Many improve by 150+ marks. Rohit Mehta improved from 520 to 642 (AIIMS Delhi), Anjali Verma scored 618 and got MAMC Delhi. The key is structured preparation with gap analysis, not just repeating the same syllabus.',
    },
    {
      question: 'Is taking a drop year for NEET worth it in 2026?',
      answer:
        'Absolutely, if done with the right guidance. Statistics show that many AIIMS and top medical college selections come from second-attempt students. Our dropper batch has a 92% success rate. The drop year is an investment — one year now for a 40-year medical career.',
    },
    {
      question: 'What is the batch size for droppers at Cerebrum?',
      answer:
        'Only 10-15 students per batch. This is our biggest advantage over large coaching centers that pack 100+ students in a room. Every dropper gets personal attention, doubt resolution within minutes, and direct access to Dr. Shekhar for strategy sessions.',
    },
    {
      question: 'When does the NEET 2026 dropper batch start?',
      answer:
        'New batches start in June and July every year, right after NEET results. We also have mid-year joining options for students who decide later. Early joiners get the full 12-month program advantage. Contact us on WhatsApp at +91-88264-44334 for the latest batch schedule.',
    },
  ],

  cta: {
    title: 'Your Drop Year. Your Comeback.',
    subtitle: 'Join 1,200+ droppers who turned their second chance into AIIMS, JIPMER, and top medical colleges.',
    primaryButton: {
      text: 'Enroll in 2026 Dropper Batch',
      link: '/enrollment',
    },
    secondaryButton: {
      text: 'Book Free Counseling Session',
      link: '/book-free-demo',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Online vs Offline Dropper Batch: Choosing What Works for You',
        body: 'The debate between online and offline coaching is especially relevant for dropper students who have a full year dedicated to NEET preparation. Offline classes at our Delhi NCR centers in South Extension, Gurugram, and Noida provide the structure of a fixed daily routine, face-to-face interaction with faculty, and the social accountability of attending classes with peers. Online classes offer flexibility to study from home, elimination of commute time that can add 1-2 productive hours daily, and the ability to replay recorded sessions for revision. At Cerebrum, both modes use the same AIIMS faculty, identical curriculum, and the same test series. Many students start with offline classes for the discipline of a fixed routine and transition to online mode in the final three months when intensive self-practice becomes the priority. Our hybrid flexibility allows you to switch modes at any point based on what maximizes your productivity.',
      },
      {
        heading: 'How Small Batch Sizes Transform Dropper Outcomes in Delhi NCR',
        body: 'Large coaching institutes in Delhi NCR typically seat 80-200 students in a single batch. In these settings, doubt resolution is queue-based, taking hours or days, and teachers cannot track individual student progress. The result is that droppers who need the most personalized attention receive the least. Our 10-15 student batch model fundamentally changes this dynamic. Every student gets their doubts resolved within the same session. Faculty know each student by name, understand their specific weak areas, and adjust teaching pace based on classroom comprehension signals. Monthly parent-teacher meetings keep families informed about progress. This model costs more per student to operate, but the outcomes speak for themselves: our 92 percent dropper success rate versus the industry average of approximately 35-40 percent at large institutes in Delhi NCR. The per-mark cost of improvement is actually lower at Cerebrum when you calculate fee divided by marks gained.',
      },
      {
        heading: 'Delhi NCR Dropper Batch Locations and Accessibility',
        body: 'Cerebrum operates dropper batch centers at three strategic locations across Delhi NCR. The South Extension center is accessible via the Lajpat Nagar Metro station and serves students from South Delhi, Faridabad, and surrounding areas. The Gurugram center caters to students from Gurugram, Manesar, and Rewari, located near Huda City Centre Metro. The Noida center serves students from Noida, Greater Noida, and Ghaziabad. Each center is equipped with smart classrooms, a quiet self-study area, and a dedicated doubt resolution room where students can meet faculty between sessions. For students who live beyond comfortable commuting distance from any center, our online batch provides identical content with the added advantage of studying from home. All three centers and the online batch follow synchronized schedules so that students can attend a session at a different center if needed on any given day.',
      },
    ],
    checklist: [
      { item: 'Visit the nearest center for a free counseling session', explanation: 'Meet the faculty, see the classroom setup, and get a personalized study plan before enrolling.' },
      { item: 'Take the free diagnostic assessment', explanation: 'Understand your exact weak areas before deciding between online and offline mode.' },
      { item: 'Compare batch sizes before choosing a coaching institute', explanation: 'Smaller batches directly correlate with higher improvement rates for dropper students.' },
    ],
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET Dropper Batch 2026 - Online & Offline',
    provider: 'Cerebrum Biology Academy',
    description:
      'Intensive NEET dropper batch with online and offline options across Delhi NCR. AIIMS faculty, 15-student batches, 92% success rate.',
    duration: 'P12M',
    price: 80000,
    priceCurrency: 'INR',
  },
}

// Export all Dropper content
export const dropperSEOPages = {
  neetDropperBatch,
  neetDropperBatchOnline,
  neetRepeaterCourse2025: neetRepeaterCourse2027,
  neetDropperBiologyCoaching,
  bestCoachingNeetDroppers,
  oneYearNeetDropperCourse,
  neetRepeaters2026,
}
