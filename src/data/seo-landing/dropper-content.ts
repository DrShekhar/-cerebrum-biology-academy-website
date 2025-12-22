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
  slug: 'neet-dropper-batch-online',

  title: 'NEET Dropper Batch Online | Year-Long Intensive Course 2025',
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
    backgroundGradient: 'from-red-900 via-orange-900 to-amber-900',
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
export const neetRepeaterCourse2025: SEOLandingContent = {
  ...dropperBaseContent,
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
    backgroundGradient: 'from-violet-900 via-purple-900 to-fuchsia-900',
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
        'Best to join by June-July 2024 for maximum preparation time. Late joiners (up to September) can also catch up with our accelerated track. Earlier you join, better your preparation.',
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
    backgroundGradient: 'from-green-900 via-emerald-900 to-teal-900',
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
    backgroundGradient: 'from-yellow-900 via-amber-900 to-orange-900',
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
          "Look at results: 85+ AIIMS selections, 4.9/5 rating, 15+ years experience. That's us.",
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

// Export all Dropper content
export const dropperSEOPages = {
  neetDropperBatchOnline,
  neetRepeaterCourse2025,
  neetDropperBiologyCoaching,
  bestCoachingNeetDroppers,
  oneYearNeetDropperCourse,
}
