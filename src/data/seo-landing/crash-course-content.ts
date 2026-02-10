// Phase 3C: Crash Course & Duration SEO Pages
import { SEOLandingContent } from './types'

// Common tools CTA for crash course pages
const crashCourseToolsCTA = {
  title: 'Free Tools to Boost Your Preparation',
  tools: [
    {
      name: 'NEET MCQ Practice',
      description: 'Practice chapter-wise MCQs for quick revision',
      link: '/tools/neet-mcq',
      icon: 'mcq' as const,
    },
    {
      name: 'NEET Rank Predictor',
      description: 'Predict your NEET rank based on expected score',
      link: '/tools/rank-predictor',
      icon: 'rank' as const,
    },
    {
      name: 'College Predictor',
      description: 'Find colleges based on your NEET score',
      link: '/tools/college-predictor',
      icon: 'college' as const,
    },
  ],
}

// Common contact buttons
const defaultContactButtons = {
  whatsapp: {
    number: '918826444334',
    message: 'Hi, I want to know more about NEET Biology crash course at Cerebrum Biology Academy',
  },
  phone: '+918826444334',
}

export const crashCourseSEOPages: Record<string, SEOLandingContent> = {
  'neet-biology-crash-course': {
    slug: 'neet-biology-crash-course',
    classLevel: 'universal',
    title: 'NEET Biology Crash Course 2026 | Last Minute Preparation Online',
    metaDescription:
      'Intensive NEET Biology crash course for last-minute preparation. Complete syllabus revision in 45-60 days with expert faculty. Limited batch size for personal attention.',
    keywords: [
      'neet biology crash course',
      'neet crash course 2026',
      'neet biology last minute preparation',
      'neet revision course',
      'neet biology quick revision',
    ],
    hero: {
      headline: 'NEET Biology Crash Course 2026',
      subheadline:
        'Complete your NEET Biology syllabus revision in 45-60 days. Intensive crash course designed for last-minute preparation with expert AIIMS faculty.',
      highlightedText: '45-60 Days',
      ctaText: 'Join Crash Course',
      ctaLink: '/courses/crash-course',
    },
    painPoints: {
      title: 'Is This You?',
      points: [
        {
          icon: '⏰',
          question: 'Running out of time for NEET preparation?',
          solution: 'Our 45-60 day crash course covers the complete syllabus efficiently',
        },
        {
          icon: '📚',
          question: 'Unable to revise the entire syllabus?',
          solution: 'Focused revision strategy targeting high-weightage chapters',
        },
        {
          icon: '🎯',
          question: 'Need quick score improvement?',
          solution: 'Strategic approach to maximize marks in minimum time',
        },
      ],
    },
    benefits: {
      title: 'Crash Course Features',
      subtitle: 'Maximum preparation in minimum time',
      items: [
        {
          icon: '⚡',
          title: 'Intensive Daily Sessions',
          description: '4-5 hours of focused learning every day',
        },
        {
          icon: '📋',
          title: 'Complete Syllabus Coverage',
          description: 'All chapters covered with priority to high-weightage topics',
        },
        {
          icon: '📝',
          title: 'Daily Tests & Analysis',
          description: 'Chapter-wise tests with detailed performance analysis',
        },
        {
          icon: '🎯',
          title: 'PYQ Focus',
          description: 'Extensive practice with previous year NEET questions',
        },
      ],
    },
    stats: [
      { value: '45-60', label: 'Days Duration', icon: '📅' },
      { value: '360+', label: 'Hours Teaching', icon: '⏰' },
      { value: '3000+', label: 'MCQs Covered', icon: '📝' },
      { value: '15', label: 'Students/Batch', icon: '👥' },
    ],
    testimonials: [
      {
        name: 'Rahul Verma',
        achievement: 'NEET 2024 - 650/720',
        quote:
          'Joined crash course 2 months before NEET. The focused approach helped me improve 100+ marks from my mock test scores!',
        score: '650/720',
      },
      {
        name: 'Sneha Patel',
        achievement: 'NEET 2024 - 628/720',
        quote:
          'The revision strategy was perfect. High-weightage chapters were covered in detail with PYQ practice.',
        score: '628/720',
      },
    ],
    faqs: [
      {
        question: 'How long is the NEET Biology crash course?',
        answer:
          'Our crash course is 45-60 days long, covering the complete NEET Biology syllabus with intensive daily sessions of 4-5 hours.',
      },
      {
        question: 'Can I join the crash course if I have weak basics?',
        answer:
          'Yes, our crash course includes concept clarity sessions. However, having basic knowledge of all chapters helps you benefit more from the crash course.',
      },
      {
        question: 'What is covered in the crash course?',
        answer:
          'Complete NCERT syllabus revision, high-weightage chapter focus, previous year questions, daily tests, and doubt-solving sessions.',
      },
      {
        question: 'Is the crash course available online?',
        answer:
          'Yes, our crash course is fully online with live interactive sessions. Recordings are also provided for revision.',
      },
    ],
    courseSummary: {
      title: 'NEET Biology Crash Course 2026',
      duration: '45-60 days',
      batchSize: '10-15 students',
      features: [
        '360+ hours of intensive teaching',
        'Complete syllabus coverage',
        'Daily tests with analysis',
        'PYQ practice & discussion',
        'Personal doubt-solving',
        'Study material included',
      ],
      price: {
        original: 25000,
        discounted: 19999,
        emi: '₹6,666/month',
      },
    },
    cta: {
      title: 'Limited Seats Available!',
      subtitle: 'Join our intensive NEET Biology crash course',
      primaryButton: {
        text: 'Enroll Now',
        link: '/courses/crash-course',
      },
      secondaryButton: {
        text: 'Book Free Demo',
        link: '/book-demo',
      },
    },
    toolsCTA: crashCourseToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET 2026 Preparation', link: '/neet-preparation-guide' },
      { title: 'NEET Dropper Course', link: '/neet-dropper-batch-online' },
      { title: 'NEET Biology Notes', link: '/neet-biology-notes-pdf' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Crash Course 2026',
      provider: 'Cerebrum Biology Academy',
      description: 'Intensive NEET Biology crash course for last-minute preparation',
      duration: '45-60 days',
      price: 19999,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-45-day-course': {
    slug: 'neet-biology-45-day-course',
    classLevel: 'universal',
    title: 'NEET Biology 45 Day Course | Complete Revision in 45 Days',
    metaDescription:
      'Complete NEET Biology revision in 45 days. Fast-track course covering all chapters with focus on high-weightage topics. Expert faculty and daily tests.',
    keywords: [
      'neet biology 45 day course',
      '45 day neet preparation',
      'neet biology revision 45 days',
      'fast track neet course',
      'neet short term course',
    ],
    hero: {
      headline: '45-Day NEET Biology Course',
      subheadline:
        'Master NEET Biology in just 45 days! Intensive course with complete syllabus coverage, daily tests, and expert guidance.',
      highlightedText: '45 Days',
      ctaText: 'Start 45-Day Journey',
      ctaLink: '/courses/45-day-course',
    },
    painPoints: {
      title: 'Perfect For You If...',
      points: [
        {
          icon: '📅',
          question: 'Only 45 days left for NEET?',
          solution: 'Structured 45-day plan covering entire syllabus',
        },
        {
          icon: '🎯',
          question: 'Need focused preparation?',
          solution: 'High-yield topics prioritized for maximum marks',
        },
        {
          icon: '📈',
          question: 'Want guaranteed improvement?',
          solution: 'Proven strategy that helped 500+ students improve 50+ marks',
        },
      ],
    },
    benefits: {
      title: 'Course Structure',
      subtitle: 'Day-by-day preparation plan',
      items: [
        {
          icon: '📚',
          title: 'Week 1-2: Botany',
          description: 'Plant diversity, morphology, anatomy, physiology',
        },
        {
          icon: '🧬',
          title: 'Week 2-3: Zoology',
          description: 'Animal diversity, human physiology, reproduction',
        },
        {
          icon: '🔬',
          title: 'Week 4-5: Cell & Genetics',
          description: 'Cell biology, genetics, molecular biology',
        },
        {
          icon: '🌿',
          title: 'Week 5-6: Ecology + Revision',
          description: 'Ecology, biotechnology, full syllabus revision',
        },
      ],
    },
    stats: [
      { value: '45', label: 'Days', icon: '📅' },
      { value: '200+', label: 'Hours', icon: '⏰' },
      { value: '2000+', label: 'MCQs', icon: '📝' },
      { value: '45', label: 'Daily Tests', icon: '✅' },
    ],
    testimonials: [
      {
        name: 'Amit Sharma',
        achievement: 'NEET 2024 - 635/720',
        quote:
          'The 45-day plan was perfect. Every day was structured for maximum learning. Improved from 520 to 635!',
        score: '635/720',
      },
      {
        name: 'Priya Menon',
        achievement: 'NEET 2024 - 610/720',
        quote:
          'Daily tests and immediate feedback helped me identify and fix my weak areas quickly.',
        score: '610/720',
      },
    ],
    faqs: [
      {
        question: 'Can I really complete the syllabus in 45 days?',
        answer:
          'Yes! Our structured approach focuses on efficient learning with 4-5 hours of daily study. High-weightage topics are prioritized.',
      },
      {
        question: 'What is the daily schedule like?',
        answer:
          '4-5 hours of live classes covering 2-3 topics, followed by a daily test and doubt-solving session.',
      },
      {
        question: 'Are recordings available if I miss a class?',
        answer:
          'Yes, all sessions are recorded and available for 24 hours. However, live attendance is strongly recommended.',
      },
      {
        question: 'Is study material provided?',
        answer:
          'Yes, concise notes, chapter summaries, and MCQ booklets are provided for all topics.',
      },
    ],
    courseSummary: {
      title: '45-Day NEET Biology Course',
      duration: '45 days',
      batchSize: '15-20 students',
      features: [
        '200+ hours of teaching',
        'Day-wise structured plan',
        '45 daily chapter tests',
        'Complete notes provided',
        'Previous year questions',
        'Live doubt solving',
      ],
      price: {
        original: 20000,
        discounted: 14999,
        emi: '₹5,000/month',
      },
    },
    cta: {
      title: 'Start Your 45-Day Journey',
      subtitle: 'Transform your NEET score in 45 days',
      primaryButton: {
        text: 'Enroll Now',
        link: '/courses/45-day-course',
      },
      secondaryButton: {
        text: 'View Schedule',
        link: '/courses/45-day-course#schedule',
      },
    },
    toolsCTA: crashCourseToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Crash Course', link: '/neet-biology-crash-course' },
      { title: '90-Day Course', link: '/neet-biology-90-day-course' },
      { title: 'NEET Quick Revision', link: '/neet-biology-revision-notes' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology 45-Day Course',
      provider: 'Cerebrum Biology Academy',
      description: 'Complete NEET Biology revision in 45 days',
      duration: '45 days',
      price: 14999,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-90-day-course': {
    slug: 'neet-biology-90-day-course',
    classLevel: 'universal',
    title: 'NEET Biology 90 Day Course | 3-Month Intensive Preparation',
    metaDescription:
      'Comprehensive NEET Biology preparation in 90 days. Balanced approach with concept building, practice, and revision. Ideal for focused 3-month preparation.',
    keywords: [
      'neet biology 90 day course',
      '3 month neet preparation',
      'neet biology 90 days plan',
      'neet intensive course 90 days',
      'neet 3 month course',
    ],
    hero: {
      headline: '90-Day NEET Biology Course',
      subheadline:
        'The perfect balance of depth and speed. Complete NEET Biology preparation in 3 months with thorough concept building and extensive practice.',
      highlightedText: '90 Days',
      ctaText: 'Join 90-Day Course',
      ctaLink: '/courses/90-day-course',
    },
    painPoints: {
      title: 'Why 90 Days?',
      points: [
        {
          icon: '⚖️',
          question: 'Need balanced preparation?',
          solution: '90 days allows thorough learning without rushing',
        },
        {
          icon: '🔄',
          question: 'Want concepts + practice?',
          solution: 'Time for both concept clarity and extensive MCQ practice',
        },
        {
          icon: '📊',
          question: 'Looking for consistent improvement?',
          solution: 'Gradual learning curve with regular assessments',
        },
      ],
    },
    benefits: {
      title: 'Course Structure',
      subtitle: 'Comprehensive 3-month plan',
      items: [
        {
          icon: '📖',
          title: 'Month 1: Class 11 Syllabus',
          description: 'Diversity, cell biology, plant physiology, biomolecules',
        },
        {
          icon: '🧬',
          title: 'Month 2: Class 12 Syllabus',
          description: 'Reproduction, genetics, evolution, ecology, biotechnology',
        },
        {
          icon: '📝',
          title: 'Month 3: Revision & Practice',
          description: 'Full syllabus revision, mock tests, PYQ analysis',
        },
        {
          icon: '🎯',
          title: 'Weekly Assessments',
          description: 'Weekly tests to track progress and identify weak areas',
        },
      ],
    },
    stats: [
      { value: '90', label: 'Days', icon: '📅' },
      { value: '400+', label: 'Hours', icon: '⏰' },
      { value: '5000+', label: 'MCQs', icon: '📝' },
      { value: '12', label: 'Mock Tests', icon: '🎯' },
    ],
    testimonials: [
      {
        name: 'Karthik Iyer',
        achievement: 'NEET 2024 - 680/720',
        quote:
          '3 months of dedicated preparation with this course changed everything. Concepts were crystal clear!',
        score: '680/720',
      },
      {
        name: 'Ananya Singh',
        achievement: 'NEET 2024 - 662/720',
        quote:
          'The monthly structure helped me complete syllabus systematically. Mock tests built my confidence.',
        score: '662/720',
      },
    ],
    faqs: [
      {
        question: 'Is 90 days enough for complete NEET preparation?',
        answer:
          'For focused students with basic knowledge, 90 days is ideal. The course covers everything from concepts to extensive practice.',
      },
      {
        question: 'How is this different from the crash course?',
        answer:
          '90-day course provides more time for concept building and practice. Crash course is for quick revision when you have less time.',
      },
      {
        question: 'What if I need more time on certain topics?',
        answer:
          'Extra doubt-solving sessions are available. Recordings allow you to re-study any topic as many times as needed.',
      },
      {
        question: 'Are mock tests included?',
        answer:
          'Yes, 12 full-length mock tests (weekly from month 2 onwards) with detailed analysis and discussion.',
      },
    ],
    courseSummary: {
      title: '90-Day NEET Biology Course',
      duration: '90 days (3 months)',
      batchSize: '15-20 students',
      features: [
        '400+ hours of comprehensive teaching',
        'Month-wise structured syllabus',
        'Weekly assessments',
        '12 full-length mock tests',
        'Complete study material',
        'Personal mentorship',
      ],
      price: {
        original: 35000,
        discounted: 27999,
        emi: '₹9,333/month',
      },
    },
    cta: {
      title: 'Join the 90-Day Success Journey',
      subtitle: 'Comprehensive preparation with the right pace',
      primaryButton: {
        text: 'Enroll Now',
        link: '/courses/90-day-course',
      },
      secondaryButton: {
        text: 'Download Brochure',
        link: '/courses/90-day-course#brochure',
      },
    },
    toolsCTA: crashCourseToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: '45-Day Course', link: '/neet-biology-45-day-course' },
      { title: 'Crash Course', link: '/neet-biology-crash-course' },
      { title: 'Full Year Course', link: '/neet-biology-online-coaching' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology 90-Day Course',
      provider: 'Cerebrum Biology Academy',
      description: 'Comprehensive NEET Biology preparation in 90 days',
      duration: '90 days',
      price: 27999,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-6-month-course': {
    slug: 'neet-biology-6-month-course',
    classLevel: 'universal',
    title: 'NEET Biology 6 Month Course | Complete Preparation Program',
    metaDescription:
      'Comprehensive 6-month NEET Biology course for thorough preparation. Includes concept building, extensive practice, mock tests, and personal mentorship.',
    keywords: [
      'neet biology 6 month course',
      'neet 6 month preparation',
      'neet biology course duration',
      'neet biology coaching 6 months',
      'neet half yearly course',
    ],
    hero: {
      headline: '6-Month NEET Biology Course',
      subheadline:
        'The ideal duration for serious NEET aspirants. Complete preparation with thorough concept building, extensive practice, and multiple revision cycles.',
      highlightedText: '6 Months',
      ctaText: 'Start 6-Month Course',
      ctaLink: '/courses/6-month-course',
    },
    painPoints: {
      title: 'Why 6 Months?',
      points: [
        {
          icon: '📚',
          question: 'Want thorough understanding?',
          solution: 'Enough time for deep concept learning and multiple revisions',
        },
        {
          icon: '🔄',
          question: 'Need multiple practice rounds?',
          solution: '3 complete revision cycles with increasing difficulty',
        },
        {
          icon: '🏆',
          question: 'Targeting 650+ score?',
          solution: 'Comprehensive approach that consistently produces high scorers',
        },
      ],
    },
    benefits: {
      title: 'Course Structure',
      subtitle: '6-month comprehensive plan',
      items: [
        {
          icon: '📖',
          title: 'Month 1-2: Foundation',
          description: 'Complete Class 11 syllabus with strong concept building',
        },
        {
          icon: '🧬',
          title: 'Month 3-4: Completion',
          description: 'Complete Class 12 syllabus with integrated revision',
        },
        {
          icon: '📝',
          title: 'Month 5: Intensive Practice',
          description: 'MCQ practice, PYQ analysis, weak area strengthening',
        },
        {
          icon: '🎯',
          title: 'Month 6: Mock Tests & Revision',
          description: 'Full-length tests, final revision, exam strategy',
        },
      ],
    },
    stats: [
      { value: '6', label: 'Months', icon: '📅' },
      { value: '600+', label: 'Hours', icon: '⏰' },
      { value: '10000+', label: 'MCQs', icon: '📝' },
      { value: '24', label: 'Mock Tests', icon: '🎯' },
    ],
    testimonials: [
      {
        name: 'Vikram Reddy',
        achievement: 'NEET 2024 - 698/720',
        quote:
          '6 months of structured learning with this course helped me score in the top 100. Concepts were built from ground up!',
        score: '698/720',
      },
      {
        name: 'Meera Krishnan',
        achievement: 'NEET 2024 - 685/720',
        quote:
          'The multiple revision cycles and mock tests built my confidence. Got MBBS in AIIMS Delhi!',
        score: '685/720',
      },
    ],
    faqs: [
      {
        question: 'Is 6 months the ideal duration for NEET preparation?',
        answer:
          'For most students, 6 months is ideal for thorough preparation. It allows time for concepts, practice, multiple revisions, and mock tests.',
      },
      {
        question: 'Can I join if I have weak basics?',
        answer:
          'Yes! The 6-month course starts from basics and builds concepts gradually. Perfect for students needing foundation strengthening.',
      },
      {
        question: 'How many mock tests are included?',
        answer:
          '24 full-length mock tests - weekly tests in the last 2 months, plus chapter-wise tests throughout.',
      },
      {
        question: 'Is there personal mentorship?',
        answer:
          'Yes, every student is assigned a mentor who tracks progress, provides guidance, and helps with strategy.',
      },
    ],
    courseSummary: {
      title: '6-Month NEET Biology Course',
      duration: '6 months',
      batchSize: '15-20 students',
      features: [
        '600+ hours of comprehensive teaching',
        'Personal mentorship included',
        '24 full-length mock tests',
        '10,000+ MCQ practice',
        'Complete study material',
        'AIIMS/JIPMER level preparation',
      ],
      price: {
        original: 55000,
        discounted: 45000,
        emi: '₹7,500/month',
      },
    },
    cta: {
      title: 'Begin Your 6-Month Journey',
      subtitle: 'Comprehensive preparation for NEET excellence',
      primaryButton: {
        text: 'Enroll Now',
        link: '/courses/6-month-course',
      },
      secondaryButton: {
        text: 'Talk to Counselor',
        link: '/book-demo',
      },
    },
    toolsCTA: crashCourseToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: '90-Day Course', link: '/neet-biology-90-day-course' },
      { title: 'Full Year Course', link: '/neet-biology-online-coaching' },
      { title: 'NEET Dropper Batch', link: '/neet-dropper-batch-online' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology 6-Month Course',
      provider: 'Cerebrum Biology Academy',
      description: 'Comprehensive 6-month NEET Biology preparation',
      duration: '6 months',
      price: 45000,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-1-year-course': {
    slug: 'neet-biology-1-year-course',
    classLevel: 'universal',
    title: 'NEET Biology 1 Year Course | Complete Annual Program 2025-26',
    metaDescription:
      'Comprehensive 1-year NEET Biology course for Class 11 & 12 students. Complete preparation with board integration, mock tests, and personal mentorship.',
    keywords: [
      'neet biology 1 year course',
      'neet one year preparation',
      'neet biology annual course',
      'neet 12 month course',
      'neet biology coaching 1 year',
    ],
    hero: {
      headline: '1-Year NEET Biology Course',
      subheadline:
        'The gold standard for NEET preparation. Complete 1-year program covering everything from basics to advanced concepts with board + NEET integration.',
      highlightedText: '1 Year',
      ctaText: 'Join Annual Program',
      ctaLink: '/courses/1-year-course',
    },
    painPoints: {
      title: 'Why Choose 1-Year Course?',
      points: [
        {
          icon: '🎓',
          question: 'Preparing alongside board exams?',
          solution: 'Integrated curriculum that covers both boards and NEET',
        },
        {
          icon: '🏆',
          question: 'Targeting top medical colleges?',
          solution: 'Comprehensive preparation for AIIMS, JIPMER, and top government colleges',
        },
        {
          icon: '📈',
          question: 'Want consistent learning?',
          solution: 'Regular pace with no last-minute rush',
        },
      ],
    },
    benefits: {
      title: 'Course Structure',
      subtitle: 'Complete annual curriculum',
      items: [
        {
          icon: '📖',
          title: 'Q1: Class 11 Part 1',
          description: 'Diversity in living world, plant biology',
        },
        {
          icon: '🧬',
          title: 'Q2: Class 11 Part 2',
          description: 'Cell biology, human physiology basics',
        },
        {
          icon: '🔬',
          title: 'Q3: Class 12 Syllabus',
          description: 'Reproduction, genetics, ecology, biotechnology',
        },
        {
          icon: '🎯',
          title: 'Q4: Revision & Mock Tests',
          description: '3 months of intensive revision and testing',
        },
      ],
    },
    stats: [
      { value: '12', label: 'Months', icon: '📅' },
      { value: '1000+', label: 'Hours', icon: '⏰' },
      { value: '15000+', label: 'MCQs', icon: '📝' },
      { value: '36', label: 'Mock Tests', icon: '🎯' },
    ],
    testimonials: [
      {
        name: 'Aditya Verma',
        achievement: 'NEET 2024 - 705/720',
        quote:
          'The 1-year course gave me time to master every concept. No rushing, just thorough learning. AIR 89!',
        score: '705/720',
      },
      {
        name: 'Divya Patel',
        achievement: 'NEET 2024 - 692/720',
        quote:
          'Board + NEET integrated approach was perfect. Scored 95% in boards and got into AIIMS!',
        score: '692/720',
      },
    ],
    faqs: [
      {
        question: 'Is 1-year course suitable for Class 11 students?',
        answer:
          'Yes! The 1-year course is ideal for students starting in Class 11 or at the beginning of Class 12. It provides comprehensive preparation.',
      },
      {
        question: 'Does it cover board exam preparation too?',
        answer:
          'Yes, our curriculum integrates board and NEET preparation. The same concepts are taught with both perspectives.',
      },
      {
        question: 'How is progress tracked?',
        answer:
          'Monthly assessments, quarterly tests, and regular mentor meetings track progress. Parents receive monthly reports.',
      },
      {
        question: 'What if I need to take a break?',
        answer:
          'We provide recorded sessions and flexible catch-up options. Your mentor will help you stay on track after any breaks.',
      },
    ],
    courseSummary: {
      title: '1-Year NEET Biology Course',
      duration: '12 months',
      batchSize: '15-20 students',
      features: [
        '1000+ hours of comprehensive teaching',
        'Board + NEET integrated curriculum',
        '36 full-length mock tests',
        '15,000+ MCQ practice',
        'Personal mentorship throughout',
        'Parent progress reports',
      ],
      price: {
        original: 85000,
        discounted: 75000,
        emi: '₹6,250/month',
      },
    },
    cta: {
      title: 'Begin Your Year-Long Journey',
      subtitle: 'The most comprehensive NEET preparation',
      primaryButton: {
        text: 'Enroll Now',
        link: '/courses/1-year-course',
      },
      secondaryButton: {
        text: 'Schedule Counseling',
        link: '/book-demo',
      },
    },
    toolsCTA: crashCourseToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: '6-Month Course', link: '/neet-biology-6-month-course' },
      { title: 'Class 11 NEET', link: '/class-11-biology-tuition-online' },
      { title: 'Class 12 NEET', link: '/class-12-biology-tuition-online' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology 1-Year Course',
      provider: 'Cerebrum Biology Academy',
      description: 'Comprehensive 1-year NEET Biology preparation',
      duration: '12 months',
      price: 75000,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-weekend-batch': {
    slug: 'neet-biology-weekend-batch',
    classLevel: 'universal',
    title: 'NEET Biology Weekend Batch | Saturday-Sunday Classes Online',
    metaDescription:
      'NEET Biology coaching on weekends only. Perfect for students with school commitments. Saturday-Sunday live classes with weekly tests and doubt solving.',
    keywords: [
      'neet biology weekend batch',
      'neet weekend classes',
      'saturday sunday neet coaching',
      'neet biology weekend course',
      'part time neet coaching',
    ],
    hero: {
      headline: 'NEET Biology Weekend Batch',
      subheadline:
        'Balance school and NEET preparation! Comprehensive NEET Biology coaching on Saturdays and Sundays with no compromise on quality.',
      highlightedText: 'Weekends Only',
      ctaText: 'Join Weekend Batch',
      ctaLink: '/courses/weekend-batch',
    },
    painPoints: {
      title: 'Perfect For You If...',
      points: [
        {
          icon: '🏫',
          question: 'Busy with school on weekdays?',
          solution: 'All classes on Saturday and Sunday only',
        },
        {
          icon: '⏰',
          question: 'Need flexible timing?',
          solution: 'Weekend mornings or afternoons as per convenience',
        },
        {
          icon: '📚',
          question: 'Want quality without daily commitment?',
          solution: 'Same curriculum compressed into weekends',
        },
      ],
    },
    benefits: {
      title: 'Weekend Batch Features',
      subtitle: 'Complete preparation on weekends',
      items: [
        {
          icon: '📅',
          title: 'Saturday Classes',
          description: '4-5 hours covering new topics with concept building',
        },
        {
          icon: '📝',
          title: 'Sunday Classes',
          description: 'Practice sessions, tests, and doubt solving',
        },
        {
          icon: '🎥',
          title: 'Weekday Support',
          description: 'Recorded sessions and online doubt forum',
        },
        {
          icon: '📊',
          title: 'Weekly Tests',
          description: 'Assessment every Sunday to track progress',
        },
      ],
    },
    stats: [
      { value: '8-10', label: 'Hours/Week', icon: '⏰' },
      { value: '52', label: 'Weekends', icon: '📅' },
      { value: '50+', label: 'Tests', icon: '📝' },
      { value: '15', label: 'Students/Batch', icon: '👥' },
    ],
    testimonials: [
      {
        name: 'Rohan Gupta',
        achievement: 'NEET 2024 - 645/720',
        quote:
          'Weekend batch was perfect for me. Could focus on school during week and NEET on weekends. Best decision!',
        score: '645/720',
      },
      {
        name: 'Shreya Nair',
        achievement: 'NEET 2024 - 628/720',
        quote:
          "The Sunday doubt-solving sessions were amazing. All my week's doubts got cleared every Sunday.",
        score: '628/720',
      },
    ],
    faqs: [
      {
        question: 'Is weekend-only preparation sufficient for NEET?',
        answer:
          'Yes, if you follow the study plan and complete assignments during the week. The weekend classes cover all essential content.',
      },
      {
        question: 'What are the class timings?',
        answer:
          'Saturday: 9 AM - 2 PM (with breaks), Sunday: 9 AM - 1 PM. Evening batches also available on request.',
      },
      {
        question: 'Is there support on weekdays?',
        answer:
          'Yes, doubt forum is active 24/7. You can post doubts and get responses within 24 hours. Recorded sessions are also available.',
      },
      {
        question: 'Can I switch to regular batch later?',
        answer:
          'Yes, you can switch to weekday batch anytime. The difference in fee (if any) will be adjusted.',
      },
    ],
    courseSummary: {
      title: 'NEET Biology Weekend Batch',
      duration: '12 months (weekends only)',
      batchSize: '15 students',
      features: [
        '8-10 hours of teaching per weekend',
        'Saturday: Concept building',
        'Sunday: Practice & tests',
        'Weekday doubt support',
        'Recorded sessions access',
        'Weekly assessments',
      ],
      price: {
        original: 65000,
        discounted: 55000,
        emi: '₹4,583/month',
      },
    },
    cta: {
      title: 'Join the Weekend Batch',
      subtitle: 'Quality NEET preparation for busy students',
      primaryButton: {
        text: 'Enroll Now',
        link: '/courses/weekend-batch',
      },
      secondaryButton: {
        text: 'View Schedule',
        link: '/courses/weekend-batch#schedule',
      },
    },
    toolsCTA: crashCourseToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: '1-Year Course', link: '/neet-biology-1-year-course' },
      { title: 'Class 11 NEET', link: '/class-11-biology-tuition-online' },
      { title: 'Class 12 NEET', link: '/class-12-biology-tuition-online' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology Weekend Batch',
      provider: 'Cerebrum Biology Academy',
      description: 'NEET Biology coaching on weekends only',
      duration: '12 months',
      price: 55000,
      priceCurrency: 'INR',
    },
  },

  'neet-crash-course': {
    slug: 'neet-crash-course',
    classLevel: 'universal',
    title: 'NEET Crash Course 2026 | Intensive Last-Minute Preparation',
    metaDescription:
      'Enroll in NEET Crash Course 2026 for intensive last-minute preparation. Complete syllabus in 45-90 days with expert AIIMS faculty. Limited batch size, proven results.',
    keywords: [
      'neet crash course',
      'neet crash course 2026',
      'neet intensive course',
      'neet last minute preparation',
      'neet quick revision course',
      'neet 45 day course',
      'neet 90 day course',
    ],
    hero: {
      headline: 'NEET Crash Course 2026',
      subheadline:
        'Intensive preparation program designed for students who need to cover maximum syllabus in minimum time. Expert faculty, proven strategies, guaranteed improvement.',
      highlightedText: 'Limited Seats Available',
      ctaText: 'Join Crash Course Now',
      ctaLink: '/courses/crash-course',
    },
    painPoints: {
      title: 'Is This Your Situation?',
      points: [
        {
          icon: '⏰',
          question: 'Only a few months left for NEET?',
          solution:
            'Our crash course covers complete syllabus in 45-90 days with strategic prioritization',
        },
        {
          icon: '📊',
          question: 'Mock test scores not improving?',
          solution:
            'Intensive practice with daily tests and personalized feedback to identify weak areas',
        },
        {
          icon: '🎯',
          question: 'Need structured last-minute revision?',
          solution: 'Scientifically designed schedule focusing on high-weightage chapters first',
        },
        {
          icon: '📚',
          question: 'Overwhelmed by the syllabus?',
          solution:
            'Chapter-wise prioritization based on NEET weightage and your current preparation level',
        },
      ],
    },
    benefits: {
      title: 'Why Our Crash Course Works',
      subtitle: 'Proven methodology for rapid score improvement',
      items: [
        {
          icon: '⚡',
          title: 'Intensive Daily Sessions',
          description: '5-6 hours of focused live classes every day covering high-yield topics',
        },
        {
          icon: '📋',
          title: 'Strategic Syllabus Coverage',
          description: 'Priority-based teaching focusing on chapters with maximum NEET weightage',
        },
        {
          icon: '📝',
          title: 'Daily Practice Tests',
          description: 'Chapter-wise and full-length mock tests with detailed analysis',
        },
        {
          icon: '🎯',
          title: '10 Years PYQ Analysis',
          description: 'Complete previous year question practice with pattern recognition',
        },
        {
          icon: '👨‍🏫',
          title: 'Expert AIIMS Faculty',
          description: 'Learn from doctors who have cracked NEET and understand exam psychology',
        },
        {
          icon: '💬',
          title: '24/7 Doubt Support',
          description: 'Instant doubt resolution through WhatsApp and dedicated doubt sessions',
        },
      ],
    },
    stats: [
      { value: '45-90', label: 'Days Duration', icon: '📅' },
      { value: '500+', label: 'Hours Teaching', icon: '⏰' },
      { value: '5000+', label: 'MCQs Covered', icon: '📝' },
      { value: '12', label: 'Students/Batch', icon: '👥' },
    ],
    testimonials: [
      {
        name: 'Aditya Sharma',
        achievement: 'NEET 2024 - 678/720',
        quote:
          'Joined the 90-day crash course with just 520 in my mocks. The intensive schedule and focused approach helped me score 678. Best decision I made!',
        score: '678/720 (158 marks improvement)',
      },
      {
        name: 'Priya Reddy',
        achievement: 'NEET 2024 - 645/720',
        quote:
          'Was struggling with Biology despite studying for 2 years. The crash course strategy for high-weightage chapters made all the difference.',
        score: '645/720',
      },
      {
        name: 'Harsh Gupta',
        achievement: 'NEET 2024 - 612/720',
        quote:
          "Last 60 days before NEET, I was panicking. Dr. Shekhar's crash course calmed me down and gave me a clear roadmap. Got into my dream college!",
        score: '612/720',
      },
    ],
    faqs: [
      {
        question: 'How long is the NEET crash course?',
        answer:
          'We offer flexible crash course options: 45-day intensive for students who have completed syllabus once, 60-day comprehensive for moderate preparation level, and 90-day complete for students who need thorough revision. Choose based on your current preparation status.',
      },
      {
        question: 'Can I join the crash course if my basics are weak?',
        answer:
          'Yes, but we recommend the 90-day program. It includes concept-building sessions for fundamental topics before moving to advanced practice. For very weak basics, consider our regular 6-month program instead.',
      },
      {
        question: 'What is the daily schedule in crash course?',
        answer:
          'Typical day includes: 3-4 hours of live concept classes, 1-2 hours of doubt-solving, 2 hours of supervised practice, and daily chapter tests. Total 7-8 hours of structured preparation daily.',
      },
      {
        question: 'How much improvement can I expect?',
        answer:
          'Average improvement in our crash course is 80-120 marks. Students who follow the schedule diligently and complete all assignments typically see 100+ marks improvement. Some have improved by 150+ marks.',
      },
      {
        question: 'Is the crash course available online?',
        answer:
          'Yes, our crash course is fully online with live interactive sessions. You get recorded lectures for revision, digital study materials, online test series, and 24/7 WhatsApp doubt support.',
      },
      {
        question: 'What is the fee for NEET crash course?',
        answer:
          '45-day crash course: ₹19,999, 60-day crash course: ₹24,999, 90-day crash course: ₹34,999. All include complete study materials, test series, and doubt support. EMI options available.',
      },
    ],
    courseSummary: {
      title: 'NEET Crash Course 2026',
      duration: '45-90 days (flexible)',
      batchSize: '10-12 students',
      features: [
        '500+ hours of intensive teaching',
        'Complete NCERT coverage',
        'Daily tests with analysis',
        '5000+ MCQs practice',
        'Previous year questions focus',
        'Personal doubt-solving',
        'Printed study materials',
        '24/7 WhatsApp support',
      ],
      price: {
        original: 40000,
        discounted: 34999,
        emi: '₹11,666/month',
      },
    },
    cta: {
      title: 'Start Your Crash Course Today',
      subtitle: 'Limited seats available. Transform your NEET preparation in the final stretch.',
      primaryButton: {
        text: 'Enroll Now',
        link: '/courses/crash-course',
      },
      secondaryButton: {
        text: 'Book Free Strategy Session',
        link: '/book-demo?type=crash-course',
      },
    },
    toolsCTA: crashCourseToolsCTA,
    contactButtons: defaultContactButtons,
    relatedPages: [
      { title: 'NEET Dropper Course', link: '/neet-repeaters-2026' },
      { title: 'NEET Biology Notes', link: '/neet-biology-notes-pdf' },
      { title: '6-Month NEET Course', link: '/neet-biology-6-month-course' },
      { title: 'Free NEET MCQ Practice', link: '/tools/neet-mcq' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Crash Course 2026',
      provider: 'Cerebrum Biology Academy',
      description:
        'Intensive NEET crash course for last-minute preparation with complete syllabus coverage',
      duration: '45-90 days',
      price: 34999,
      priceCurrency: 'INR',
    },
  },
}
