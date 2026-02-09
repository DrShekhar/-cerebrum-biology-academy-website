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
        'Best to join by June-July 2025 for maximum preparation time. Late joiners (up to September) can also catch up with our accelerated track. Earlier you join, better your preparation.',
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

// Page: /neet-repeaters-2026/
export const neetRepeaters2026: SEOLandingContent = {
  ...dropperBaseContent,
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
        question: 'Disappointed with NEET 2025 result?',
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
          'Detailed analysis of your 2025 attempt to identify exactly what needs fixing.',
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

  testimonials: [
    {
      name: 'Vikram Malhotra',
      achievement: 'AIR 456 | AIIMS Delhi (2nd Attempt)',
      quote:
        '2024: 512 marks. 2025: 658 marks. The gap year with Cerebrum was the best decision. Dr. Shekhar helped me identify why I was stuck and fixed it systematically.',
      score: '658/720 (146 improvement)',
    },
    {
      name: 'Kavitha Nair',
      achievement: 'AIR 823 | JIPMER (Repeater)',
      quote:
        'Taking a drop was emotionally hard. But Cerebrum community kept me motivated. The weekly tests built my confidence. Now I am a JIPMERite!',
      score: '624/720',
    },
    {
      name: 'Arjun Patel',
      achievement: 'AIR 1,250 | GMC Ahmedabad (2nd Attempt)',
      quote:
        'First attempt: Missed cutoff by 10 marks. Second attempt: Government college secured. The personalized attention in small batches made all the difference.',
      score: '598/720',
    },
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
        'Key differences: Faster syllabus coverage (you have seen it once), more focus on practice and tests (less theory repetition), psychological support for drop year challenges, peer group of serious repeaters only, and personalized gap analysis based on your 2025 attempt.',
    },
    {
      question: 'What marks improvement can I expect as a repeater?',
      answer:
        'Our repeater students typically improve by 80-150 marks. Average improvement is 120 marks. Students who follow our schedule completely have seen up to 180 marks improvement. Your improvement depends on your effort and following our strategy.',
    },
    {
      question: 'When does the NEET 2026 repeaters batch start?',
      answer:
        'Main batch starts June 2025 (right after NEET 2025 results). We also have July batch for students who decide later. Earlier you join, more revision cycles you complete. Registration opens April 2025.',
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
    duration: '12 Months (June 2025 - May 2026)',
    batchSize: '10-12 Students per batch',
    features: [
      'Diagnostic assessment of 2025 attempt',
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
  neetRepeaterCourse2025,
  neetDropperBiologyCoaching,
  bestCoachingNeetDroppers,
  oneYearNeetDropperCourse,
  neetRepeaters2026,
}
