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
      'Intensive NEET Biology crash course for last-minute preparation. Complete syllabus revision in 30-45 days with expert faculty. Limited batch size for personal attention.',
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
        'Complete your NEET Biology syllabus revision in 30-45 days. Intensive crash course designed for last-minute preparation with expert AIIMS faculty.',
      highlightedText: '30-45 Days',
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
          'Our crash course is 30-45 days long, covering the complete NEET Biology syllabus with intensive daily sessions of 4-5 hours.',
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
      duration: '30-45 days',
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
      duration: '30-45 days',
      price: 19999,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-45-day-course': {
    slug: 'neet-biology-45-day-course',
    classLevel: 'universal',
    title: 'NEET Biology 45-Day Course | Starting Now | Exam May 2, 2026',
    metaDescription:
      'NEET 2026 is May 2. Our 45-day crash course starting now — complete syllabus revision, 15 mock exams, AIIMS faculty, 12-student batches. ₹34,999. Also available: 30-day Sprint (₹14,999).',
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
      ctaLink: '/courses/neet-crash-course',
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
          solution: 'Proven strategy that helped thousands of students improve 50+ marks',
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
        link: '/courses/neet-crash-course',
      },
      secondaryButton: {
        text: 'View Schedule',
        link: '/courses/neet-crash-course#schedule',
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
    title: 'NEET Biology 1 Year Course | Complete Annual Program 2026-27',
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
      'Enroll in NEET Crash Course 2026 for intensive last-minute preparation. Complete syllabus in 30-45 days with expert AIIMS faculty. Limited batch size, proven results.',
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
            'Our crash course covers complete syllabus in 30-45 days with strategic prioritization',
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
      duration: '30-45 days (flexible)',
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
      duration: '30-45 days',
      price: 34999,
      priceCurrency: 'INR',
    },
  },

  'best-neet-crash-course': {
    slug: 'best-neet-crash-course',
    classLevel: 'universal',
    title: 'Best NEET Crash Course 2026 | #1 Rated Biology Crash Course Delhi NCR',
    metaDescription:
      'Ranked #1 NEET Biology crash course in Delhi NCR. 92% success rate, AIIMS faculty Dr. Shekhar Singh, 12-student batches. Compare fees, results & features. ₹14,999-34,999.',
    keywords: [
      'best neet crash course',
      'best neet crash course delhi',
      'best neet crash course delhi ncr',
      'top neet crash course',
      'best crash course for neet biology',
      'neet crash course ranking',
      'best neet biology crash course online',
    ],
    hero: {
      headline: 'Best NEET Crash Course 2026 — Only 42 Days Until May 2 Exam',
      subheadline:
        'NEET is May 2, 2026. 500+ students chose Cerebrum\'s crash course over Aakash, Allen & PW: 12-student batches, AIIMS faculty, 92% success rate. 30-day (₹14,999) and 45-day (₹34,999) batches starting NOW.',
      highlightedText: '#1 Rated',
      ctaText: 'Claim Your Seat',
      ctaLink: '/admissions',
    },
    painPoints: {
      title: 'Choosing the Wrong Crash Course Costs You a Year',
      points: [
        {
          icon: '🚫',
          question: 'Large batch crash courses (60-100 students) where you are just a number?',
          solution: 'Cerebrum: Max 12 students per batch. Your teacher knows your weak chapters by name.',
        },
        {
          icon: '💸',
          question: 'Paying ₹50,000-80,000 for a crash course with generic teaching?',
          solution: 'Cerebrum: ₹14,999-34,999 with AIIMS faculty. 40-60% less than competitors.',
        },
        {
          icon: '📉',
          question: 'Crash courses that cover syllabus but don\'t improve scores?',
          solution: 'Cerebrum: Average improvement of 80-120 marks. We focus on exam strategy, not just content.',
        },
      ],
    },
    benefits: {
      title: 'Why Cerebrum\'s Crash Course Ranks #1',
      subtitle: 'What makes us different from every other crash course',
      items: [
        {
          icon: '👨‍⚕️',
          title: 'AIIMS Faculty — Not Just "Experienced Teachers"',
          description: 'Dr. Shekhar Singh (Ph.D Botany, AIIMS-trained) teaches every batch personally. No junior faculty substitutions.',
        },
        {
          icon: '🎯',
          title: '12-Student Micro-Batches',
          description: 'While Aakash/Allen run 60-100 student crash batches, we cap at 12. Every student gets daily doubt resolution.',
        },
        {
          icon: '📊',
          title: '92% Success Rate (Verified)',
          description: 'Of 500+ crash course students over 3 years, 460+ scored above 550/720. Results verifiable with student names.',
        },
        {
          icon: '🧪',
          title: 'Biology-Only Specialization',
          description: 'We don\'t teach Physics or Chemistry. 100% of our 4-5 daily hours go to Biology — your highest scoring subject.',
        },
      ],
    },
    stats: [
      { value: '92%', label: 'Success Rate', icon: '🏆' },
      { value: '500+', label: 'Students Coached', icon: '👥' },
      { value: '12', label: 'Max Batch Size', icon: '🎯' },
      { value: '80-120', label: 'Avg Marks Improvement', icon: '📈' },
    ],
    testimonials: [
      {
        name: 'Aditya Sharma',
        achievement: 'NEET 2024 - 678/720 (45-Day Course)',
        quote: 'I tried Allen\'s crash course first — 80 students, zero personal attention. Switched to Cerebrum with 45 days left. Dr. Shekhar identified my weak areas in Day 1 and created a custom plan. Jumped from 520 to 678.',
        score: '678/720',
      },
      {
        name: 'Pooja Gupta',
        achievement: 'NEET 2024 - 642/720 (90-Day Course)',
        quote: 'Compared 5 crash courses before choosing Cerebrum. The 12-student batch and daily PYQ practice made the difference. My Biology went from 130 to 172/180.',
        score: '642/720',
      },
      {
        name: 'Vikram Reddy',
        achievement: 'NEET 2025 - 615/720 (60-Day Course)',
        quote: 'As a dropper, I needed a crash course that understood my gaps. Cerebrum didn\'t just repeat the syllabus — they pinpointed exactly which 15 chapters needed work and hammered them.',
        score: '615/720',
      },
    ],
    faqs: [
      {
        question: 'What makes Cerebrum\'s crash course the best for NEET Biology?',
        answer: 'Three things: (1) AIIMS faculty teaching every batch personally — not junior teachers, (2) 12-student micro-batches where your teacher knows your weak chapters, and (3) 92% verified success rate over 500+ students. No other crash course in Delhi NCR offers all three.',
      },
      {
        question: 'How does Cerebrum compare to Aakash and Allen crash courses?',
        answer: 'Aakash/Allen crash courses run 60-100 student batches, cost ₹40,000-80,000, and teach all 3 subjects (Physics, Chemistry, Biology). Cerebrum: 12-student batches, ₹14,999-34,999, Biology-only with 4-5 hours daily dedicated Biology teaching. Result: our students improve 80-120 marks vs 30-50 marks at chain coaching.',
      },
      {
        question: 'Which crash course duration should I choose?',
        answer: 'NEET 2026 is on May 2. With ~40 days left, we offer: 30-day Sprint (₹14,999) if you have completed syllabus and need high-yield revision + mock exams. 45-day Intensive (₹34,999) if you need gap-filling + comprehensive revision with more personal attention. Book a free assessment — we\'ll recommend the right duration.',
      },
      {
        question: 'Is the crash course available online?',
        answer: 'Yes, fully online with live interactive sessions (not recorded). Same AIIMS faculty, same 12-student batch, same daily tests. 70% of our crash course students are online. Recordings provided for revision. WhatsApp doubt support 7 AM - 11 PM.',
      },
      {
        question: 'What is the fee for the best NEET crash course?',
        answer: '30-day Sprint: ₹14,999. 45-day Intensive: ₹34,999. Both include study material, daily tests, mock exams, PYQ booklet, and WhatsApp doubt support. EMI available. Compare this to Aakash (₹45,000-60,000) or private tutors (₹1,500-3,000/hour). NEET is May 2 — enroll now.',
      },
      {
        question: 'Can I join if my basics are weak?',
        answer: 'Yes, but we recommend the 90-day course. It includes a 2-week foundation bridge covering critical Class 11 concepts before intensive Class 12 + NEET revision. For very weak students, our 6-month program (₹45,000) is more suitable than a crash course.',
      },
    ],
    courseSummary: {
      title: 'Best NEET Crash Course — 30-Day or 45-Day | NEET May 2, 2026',
      duration: '30 / 45 days',
      batchSize: '12 students max',
      features: [
        '30-Day Sprint: ₹14,999 (starting now) — for revision-ready students',
        '45-Day Intensive: ₹34,999 (starting now) — for gap-filling + revision',
        'AIIMS faculty Dr. Shekhar Singh teaches every batch',
        '12-student micro-batches (not 60-100 like chains)',
        '92% verified success rate across 500+ students',
        'Biology-only: 4-5 hours/day of pure Biology',
      ],
      price: {
        original: 25000,
        discounted: 14999,
        emi: '₹6,500/month',
      },
    },
    cta: {
      title: 'Only 12 Seats Per Batch — Don\'t Wait',
      description: 'New batches start every week. Book your free assessment call to find the right crash course duration for your current preparation level.',
      buttonText: 'Book Free Assessment',
      buttonLink: '/admissions',
    },
    contactButtons: defaultContactButtons,
    toolsCTA: crashCourseToolsCTA,
    relatedPages: [
      { title: '45-Day Crash Course', link: '/neet-biology-45-day-course' },
      { title: '90-Day Crash Course', link: '/neet-biology-90-day-course' },
      { title: 'Crash Course Fees Comparison', link: '/neet-crash-course-fees' },
      { title: 'Crash Course vs Full Course', link: '/neet-crash-course-comparison' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'Best NEET Biology Crash Course 2026',
      provider: 'Cerebrum Biology Academy',
      description: 'Ranked #1 NEET Biology crash course with 92% success rate, AIIMS faculty, and 12-student micro-batches',
      duration: '30-45 days',
      price: 14999,
      priceCurrency: 'INR',
    },
  },

  'neet-crash-course-comparison': {
    slug: 'neet-crash-course-comparison',
    classLevel: 'universal',
    title: 'NEET Crash Course Comparison | 30 vs 45 Day — Which Is Best for May 2026?',
    metaDescription:
      'NEET 2026 is May 2. Compare 30-day vs 45-day crash course: fees, syllabus coverage, results. Only 42 days left — choose the right duration now. Free assessment.',
    keywords: [
      'neet crash course comparison',
      'neet 45 day vs 90 day course',
      'which neet crash course duration',
      'neet crash course vs full course',
      'best crash course duration neet',
      'should i do neet crash course',
      'is neet crash course enough',
    ],
    hero: {
      headline: 'NEET May 2, 2026 — 30-Day or 45-Day Crash Course?',
      subheadline:
        'Only ~42 days left until NEET 2026. Every day counts. The 30-day Sprint is for revision-ready students. The 45-day Intensive fills gaps AND revises. Take our free 10-minute assessment to find your perfect fit.',
      highlightedText: '30 vs 45 Days',
      ctaText: 'Take Free Assessment',
      ctaLink: '/contact',
    },
    painPoints: {
      title: 'The Duration Dilemma — We Get It',
      points: [
        {
          icon: '🤔',
          question: 'Will 45 days be enough to cover everything?',
          solution: 'If you\'ve covered 80%+ syllabus: YES. Our 45-day plan focuses on high-weightage chapters (60% of marks from 15 chapters) + intensive PYQ practice.',
        },
        {
          icon: '⏳',
          question: 'Is 90 days too long for a crash course?',
          solution: 'If starting from scratch or with weak basics: NO. Month 1 covers foundations, Month 2 full revision, Month 3 mock tests + exam strategy. Each day is purposeful.',
        },
        {
          icon: '💰',
          question: 'Should I pay more for a longer course?',
          solution: 'Depends on your level. A 30-day sprint (₹14,999) with strong basics can be enough. If you have gaps, the 45-day intensive (₹34,999) gives deeper coverage. Take our free assessment to know your level.',
        },
      ],
    },
    benefits: {
      title: 'Side-by-Side: 45 vs 60 vs 90 Day NEET Crash Course',
      subtitle: 'Complete comparison to help you decide',
      items: [
        {
          icon: '⚡',
          title: '30-Day Sprint (₹14,999) — Starting Now',
          description: 'Best for: Syllabus done, need revision + mock exams. Covers: Top 15 high-weightage chapters (60% of marks), daily PYQs, 10 full mocks. Result: Avg 50-80 marks improvement.',
        },
        {
          icon: '🎯',
          title: '45-Day Intensive (₹34,999) — Starting Now',
          description: 'Best for: 60-80% syllabus done, gaps in 5-8 chapters. Covers: Complete syllabus revision, gap-filling, 15 mocks. Result: Avg 80-120 marks improvement.',
        },
        {
          icon: '📊',
          title: 'What About 60 or 90 Day Courses?',
          description: 'With NEET on May 2, 2026, longer courses are no longer viable. If you have not covered the syllabus at all, join the 45-day batch immediately — it includes a foundation bridge in Week 1.',
        },
        {
          icon: '🏆',
          title: 'Not Sure? Free 10-Min Assessment',
          description: 'Call us now. We\'ll test your current level in 10 minutes and recommend 30-day or 45-day. Every day you wait = 1 less day of preparation.',
        },
      ],
    },
    stats: [
      { value: '45-90', label: 'Days Options', icon: '📅' },
      { value: '₹14,999', label: 'Starting Price', icon: '💰' },
      { value: '80-150', label: 'Avg Marks Improvement', icon: '📈' },
      { value: '92%', label: 'Success Rate', icon: '🏆' },
    ],
    testimonials: [
      {
        name: 'Neha Yadav (45-Day)',
        achievement: 'NEET 2024 - 638/720',
        quote: 'I had good basics from school. The 45-day course was perfect — no wasted time on concepts I already knew. Pure revision + PYQ practice. Improved from 560 to 638.',
        score: '638/720',
      },
      {
        name: 'Rohit Kumar (90-Day)',
        achievement: 'NEET 2024 - 612/720',
        quote: 'I was a dropper with weak Class 11 basics. Needed the 90-day course to rebuild from scratch. Worth every rupee — went from 380 to 612. The first month of foundation was crucial.',
        score: '612/720',
      },
    ],
    faqs: [
      {
        question: 'How do I know which duration is right for me?',
        answer: 'Take our free 10-minute assessment. We\'ll evaluate your current Biology knowledge (Class 11 + 12), identify weak chapters, and recommend the optimal duration. 45-day if 80%+ prepared, 60-day if 60-80%, 90-day if below 60% or starting fresh.',
      },
      {
        question: 'Can I switch from 45-day to 90-day mid-course?',
        answer: 'Yes! If you realize you need more time after starting a shorter course, you can upgrade by paying the difference. We\'ll seamlessly extend your program without restarting.',
      },
      {
        question: 'Is 45 days really enough to crack NEET?',
        answer: 'If your foundation is solid (Class 11 + 12 syllabus covered once), yes. Our 45-day plan focuses on: (1) High-weightage 15 chapters = 60% marks, (2) Daily PYQ practice, (3) Exam strategy and time management. Students with good basics average 60-80 marks improvement.',
      },
      {
        question: 'What if I have 6 months — should I still do a crash course?',
        answer: 'No. With 6 months, our regular 6-month program (₹45,000) is better — it covers everything at a sustainable pace. Crash courses are designed for students with less than 3 months remaining. Don\'t rush if you have time.',
      },
      {
        question: 'Do all durations have the same faculty?',
        answer: 'Yes. Dr. Shekhar Singh (AIIMS-trained, Ph.D Botany) teaches all crash course batches personally. Same quality of teaching across 45, 60, and 90-day programs. The only difference is depth and pace of coverage.',
      },
      {
        question: 'What is included in each crash course?',
        answer: 'All durations include: live interactive classes (4-5 hrs/day), study material, daily chapter tests, full-length mock exams, PYQ booklet (10 years), WhatsApp doubt support (7 AM - 11 PM), and recorded class backup. Longer durations get more mock exams and revision cycles.',
      },
    ],
    courseSummary: {
      title: 'NEET 2026 Crash Course — Only 30 & 45 Day Options Left',
      duration: '30 / 45 days',
      batchSize: '12 students max',
      features: [
        '30-Day Sprint: ₹14,999 — revision + 10 mock exams (starting now)',
        '45-Day Intensive: ₹34,999 — gap-filling + complete revision (starting now)',
        'NEET exam: May 2, 2026 — every day counts',
        'AIIMS faculty, 12-student micro-batches',
        'Free 10-minute assessment to find your level',
        'Daily 5-hour sessions + WhatsApp doubt support',
      ],
      price: {
        original: 35000,
        discounted: 14999,
        emi: '₹5,000/month',
      },
    },
    cta: {
      title: 'Not Sure Which Duration? Take Our Free Assessment',
      description: 'A 10-minute call with our academic counselor. We\'ll test your current level and recommend the perfect crash course duration. No pressure, no sales pitch.',
      buttonText: 'Book Free Assessment',
      buttonLink: '/contact',
    },
    contactButtons: defaultContactButtons,
    toolsCTA: crashCourseToolsCTA,
    relatedPages: [
      { title: '45-Day Crash Course', link: '/neet-biology-45-day-course' },
      { title: '90-Day Crash Course', link: '/neet-biology-90-day-course' },
      { title: 'Best NEET Crash Course', link: '/best-neet-crash-course' },
      { title: 'Crash Course Fees', link: '/neet-crash-course-fees' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Crash Course Comparison — 45 vs 60 vs 90 Days',
      provider: 'Cerebrum Biology Academy',
      description: 'Compare NEET crash course durations side-by-side: fees, coverage, results, and who should choose which',
      duration: '30-45 days',
      price: 14999,
      priceCurrency: 'INR',
    },
  },

  'neet-biology-60-day-course': {
    slug: 'neet-biology-60-day-course',
    classLevel: 'universal',
    title: 'NEET Crash Course 2026 | 30 & 45-Day Options | Exam May 2',
    metaDescription:
      'NEET 2026 is May 2 — only 30-day (₹14,999) and 45-day (₹34,999) crash courses available now. AIIMS faculty, 12 students/batch. Enroll today, start immediately.',
    keywords: [
      'neet 60 day course',
      'neet 60 day crash course',
      'neet 2 month course',
      'neet biology 60 day preparation',
      'neet 60 day revision plan',
      '60 day neet crash course online',
    ],
    hero: {
      headline: 'NEET 2026 Crash Course — 30 & 45 Day Batches Starting Now',
      subheadline:
        'NEET exam is May 2, 2026. With ~42 days left, we now offer 30-day Sprint (₹14,999) and 45-day Intensive (₹14,999) batches. Both starting immediately with AIIMS faculty and 12-student micro-batches.',
      highlightedText: 'Starts Now',
      ctaText: 'Enroll Today',
      ctaLink: '/admissions',
    },
    painPoints: {
      title: 'Why 60 Days Is the Sweet Spot',
      points: [
        {
          icon: '🎯',
          question: 'Covered most of the syllabus but have gaps in 5-8 chapters?',
          solution: 'Week 1-2: Identify and fill specific gaps. Week 3-6: Full revision at NEET depth. Week 7-8: Mock exams + exam strategy.',
        },
        {
          icon: '⏰',
          question: 'Only 2 months left but need significant improvement?',
          solution: '60 days = 300+ hours of focused teaching. That\'s equivalent to 6 months of part-time coaching, compressed into daily 5-hour sessions.',
        },
        {
          icon: '📈',
          question: 'Scoring 450-550 and need 600+?',
          solution: 'Our 60-day course is designed for exactly this range. Average improvement: 80-100 marks. We\'ve seen students jump from 480 to 610.',
        },
      ],
    },
    benefits: {
      title: '60-Day Course Structure — Week by Week',
      subtitle: 'Every day has a purpose. No wasted time.',
      items: [
        {
          icon: '🔍',
          title: 'Week 1-2: Gap Analysis + Foundation Repair',
          description: 'Diagnostic test on Day 1. Identify weak chapters. Intensive coverage of Class 11 gaps (Cell Biology, Plant Anatomy, Biomolecules).',
        },
        {
          icon: '📚',
          title: 'Week 3-4: Class 11 Complete Revision',
          description: 'All Class 11 chapters at NEET depth. Daily chapter tests. Focus on Diversity, Plant Physiology, Human Physiology basics.',
        },
        {
          icon: '📋',
          title: 'Week 5-6: Class 12 Complete Revision',
          description: 'Genetics, Ecology, Reproduction, Biotechnology, Evolution. High-weightage chapter deep dives. Daily 100-MCQ practice.',
        },
        {
          icon: '🏆',
          title: 'Week 7-8: Mock Exams + Strategy',
          description: '8 full-length mock exams (NEET pattern). Detailed analysis after each mock. Time management training. Last-day strategy.',
        },
      ],
    },
    stats: [
      { value: '60', label: 'Days Duration', icon: '📅' },
      { value: '300+', label: 'Hours Teaching', icon: '⏰' },
      { value: '4000+', label: 'MCQs Covered', icon: '📝' },
      { value: '8', label: 'Full Mock Exams', icon: '📊' },
    ],
    testimonials: [
      {
        name: 'Ishita Banerjee',
        achievement: 'NEET 2024 - 625/720 (60-Day Course)',
        quote: 'The 60-day course was perfect for me. I had covered syllabus once in school but had gaps in Genetics and Ecology. Dr. Shekhar fixed those gaps in week 1-2, then the revision was smooth sailing. Went from 510 to 625.',
        score: '625/720',
      },
      {
        name: 'Kartik Mehta',
        achievement: 'NEET 2025 - 598/720 (60-Day Course)',
        quote: 'I was confused between 45 and 90 days. The counselor recommended 60 after my assessment. Best decision — not too rushed, not too slow. Every day counted. Biology score: 162/180.',
        score: '598/720',
      },
    ],
    faqs: [
      {
        question: 'Who is the 60-day crash course ideal for?',
        answer: 'Students who: (1) Have covered 60-80% of the syllabus at least once, (2) Score 450-550 in mock tests, (3) Have specific weak chapters (not completely blank). If you\'re scoring below 400, consider the 90-day course. If above 550, the 45-day may suffice.',
      },
      {
        question: 'What is the daily schedule in the 60-day course?',
        answer: 'Morning: 3-hour concept class (theory + diagrams). Afternoon: 1-hour PYQ practice session. Evening: 1-hour daily test + doubt clearing. Total: 5 hours of structured learning. Plus 2-3 hours of self-study with our material.',
      },
      {
        question: 'How much improvement can I expect in 60 days?',
        answer: 'Based on 200+ students who took our 60-day course: Average improvement is 80-100 marks. Top performers improve 120-150 marks. Key factors: daily attendance, completing daily tests, and following the study plan. Students who attend 90%+ of classes improve the most.',
      },
      {
        question: 'What is the fee for the 60-day crash course?',
        answer: '₹19,999 (MRP ₹25,000). Includes: 300+ hours live teaching, study material, 4000+ MCQ bank, 8 mock exams, PYQ booklet, WhatsApp doubt support. EMI: ₹6,666/month for 3 months. Scholarship available for 85%+ scorers.',
      },
      {
        question: 'Is the 60-day course available online?',
        answer: 'Yes, fully online with live interactive sessions. Same faculty, same batch size (12 students), same daily tests. 75% of our 60-day students choose online mode. Recordings provided for revision.',
      },
      {
        question: 'Can I start mid-month or do I need to wait for a batch?',
        answer: 'New batches start every 2 weeks. You don\'t need to wait months. Contact us to know the next batch start date — usually within 3-7 days.',
      },
    ],
    courseSummary: {
      title: 'NEET Biology 60-Day Crash Course',
      duration: '60 days (8 weeks)',
      batchSize: '12 students max',
      features: [
        '300+ hours of intensive Biology teaching',
        'Gap analysis on Day 1 — personalized weak-area plan',
        'Week-by-week structured curriculum',
        '4,000+ MCQs + 10-year PYQ bank',
        '8 full-length NEET mock exams',
        'Daily tests with performance tracking',
      ],
      price: {
        original: 25000,
        discounted: 19999,
        emi: '₹6,666/month',
      },
    },
    cta: {
      title: 'Next 60-Day Batch Starts This Week',
      description: 'Only 12 seats per batch. Book your free diagnostic assessment to confirm the 60-day duration is right for your current level.',
      buttonText: 'Join 60-Day Course',
      buttonLink: '/admissions',
    },
    contactButtons: defaultContactButtons,
    toolsCTA: crashCourseToolsCTA,
    relatedPages: [
      { title: '45-Day Course (Shorter)', link: '/neet-biology-45-day-course' },
      { title: '90-Day Course (Longer)', link: '/neet-biology-90-day-course' },
      { title: 'Compare All Durations', link: '/neet-crash-course-comparison' },
      { title: 'Best NEET Crash Course', link: '/best-neet-crash-course' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Biology 60-Day Crash Course 2026',
      provider: 'Cerebrum Biology Academy',
      description: '60-day intensive NEET Biology crash course — the most popular duration for gap-filling and exam preparation',
      duration: '60 days',
      price: 19999,
      priceCurrency: 'INR',
    },
  },

  'neet-crash-course-fees': {
    slug: 'neet-crash-course-fees',
    classLevel: 'universal',
    title: 'NEET Crash Course Fees 2026 | ₹14,999 for 30-Day | May 2 Exam',
    metaDescription:
      'NEET crash course fees: ₹14,999 (30-day) to ₹34,999 (45-day) at Cerebrum vs ₹40,000-80,000 at Aakash/Allen. NEET May 2 — enroll now. EMI, scholarships available.',
    keywords: [
      'neet crash course fees',
      'neet crash course price',
      'neet crash course cost',
      'affordable neet crash course',
      'neet crash course fees comparison',
      'cheapest neet crash course',
      'neet crash course emi',
      'neet crash course scholarship',
    ],
    hero: {
      headline: 'NEET Crash Course Fees — ₹14,999 for 30-Day | NEET May 2, 2026',
      subheadline:
        'Only ~42 days until NEET 2026. Our 30-day crash course starts at ₹14,999 — 70% less than Aakash/Allen. 45-day option at ₹34,999 for students who need deeper coverage. Both include AIIMS faculty and 12-student batches.',
      highlightedText: 'From ₹14,999',
      ctaText: 'View Pricing Plans',
      ctaLink: '#pricing',
    },
    painPoints: {
      title: 'Why NEET Crash Courses Shouldn\'t Break the Bank',
      points: [
        {
          icon: '💸',
          question: 'Paying ₹50,000-80,000 for a crash course that promises no guarantees?',
          solution: 'Cerebrum: ₹14,999-34,999 with 92% verified success rate. We prove ROI with student results, not marketing.',
        },
        {
          icon: '🔒',
          question: 'Hidden costs — registration fee, material fee, test series fee charged separately?',
          solution: 'Our price includes EVERYTHING: classes, material, tests, mock exams, doubt support. Zero hidden charges.',
        },
        {
          icon: '💳',
          question: 'Can\'t afford full payment upfront?',
          solution: 'EMI from ₹5,000/month. No credit card needed. No-cost EMI for 3-month split. Scholarship test for additional 10-30% discount.',
        },
      ],
    },
    benefits: {
      title: 'Fee Comparison: Cerebrum vs Competitors',
      subtitle: 'Transparent side-by-side pricing',
      items: [
        {
          icon: '🟢',
          title: 'Cerebrum 30-Day Sprint: ₹14,999 (Starting Now)',
          description: 'Includes: 150+ hrs teaching, study material, 30 daily tests, 10 full mocks, PYQs, doubt support. Batch: 12 students. Faculty: AIIMS-trained.',
        },
        {
          icon: '🟢',
          title: 'Cerebrum 45-Day Intensive: ₹34,999 (Starting Now)',
          description: 'Includes: 225+ hrs, 15 mock exams, 3000+ MCQs, gap analysis, complete syllabus revision. Batch: 12 students.',
        },
        {
          icon: '🟡',
          title: 'No More 60/90 Day Options',
          description: 'NEET 2026 is May 2. With 42 days left, only 30-day and 45-day courses are available. Don\'t waste time on courses that end after the exam.',
        },
        {
          icon: '🔴',
          title: 'Aakash/Allen Crash: ₹45,000-80,000',
          description: 'All 3 subjects (Biology gets 1/3 time). Batch: 60-100 students. Material extra. No personal attention.',
        },
      ],
    },
    stats: [
      { value: '₹14,999', label: 'Starting Price (30-Day)', icon: '💰' },
      { value: '70%', label: 'Cheaper Than Aakash', icon: '📉' },
      { value: '42', label: 'Days Left Until NEET', icon: '⏰' },
      { value: '30%', label: 'Max Scholarship', icon: '🎓' },
    ],
    testimonials: [
      {
        name: 'Aman Singh (Parent)',
        achievement: 'Son scored 635/720 in 90-Day Course',
        quote: 'We spent ₹4.5 lakhs at Aakash for 2 years with average results. Cerebrum\'s 90-day crash course at ₹27,999 gave better results. My son improved 180 marks. Cost per mark improvement: ₹155 at Cerebrum vs ₹2,500 at Aakash.',
        score: '635/720',
      },
      {
        name: 'Shruti Pandey',
        achievement: 'NEET 2024 - 618/720 (45-Day Course)',
        quote: 'I chose the 45-day course — honestly, I was skeptical that such quality was possible at this price. But it was unmatched. 12 students, AIIMS faculty, daily tests. Best investment of my NEET journey.',
        score: '618/720',
      },
    ],
    faqs: [
      {
        question: 'Why is Cerebrum\'s crash course cheaper than Aakash and Allen?',
        answer: 'Three reasons: (1) We teach only Biology, not all 3 subjects — lower infrastructure cost, (2) We don\'t spend on TV ads and billboards — savings passed to students, (3) We run online classes — no massive real estate costs. Lower cost ≠ lower quality. Our 92% success rate is higher than most ₹80,000 crash courses.',
      },
      {
        question: 'What is included in the crash course fee?',
        answer: 'Everything: live classes (4-5 hrs/day), printed study material, daily chapter tests, full-length mock exams, 10-year PYQ booklet, WhatsApp doubt support (7 AM-11 PM), recorded class backup, performance reports. No registration fee, no material fee, no hidden charges.',
      },
      {
        question: 'Do you offer EMI for the crash course?',
        answer: 'Yes. 45-day: ₹5,000/month for 3 months. 60-day: ₹6,666/month for 3 months. 90-day: ₹9,333/month for 3 months. No credit card required. No interest. Simple bank transfer EMI.',
      },
      {
        question: 'Is there a scholarship for the crash course?',
        answer: 'Yes. Take our scholarship test (free, 30 minutes). Score 80%+: 10% off. Score 90%+: 20% off. Score 95%+: 30% off. The test covers basic Class 11+12 Biology concepts. Available before every batch start.',
      },
      {
        question: 'Can I get a refund if I am not satisfied?',
        answer: 'We offer a 7-day satisfaction guarantee. Attend classes for 7 days — if you are not satisfied with the teaching quality, we refund 100% of your fee. No questions asked. We are that confident in our crash course.',
      },
      {
        question: 'Is the online crash course fee the same as offline?',
        answer: 'Yes, same fee for online and offline. Same faculty, same batch size, same material. Online students get additional benefit of recorded class backup. Most students (70%) prefer online as it saves commute time and cost.',
      },
    ],
    courseSummary: {
      title: 'NEET 2026 Crash Course Fees — May 2 Exam',
      duration: '30 / 45 days',
      batchSize: '12 students max',
      features: [
        '30-Day Sprint: ₹14,999 — High-yield revision + 10 mocks (starting now)',
        '45-Day Intensive: ₹34,999 — Complete revision + 15 mocks (starting now)',
        'Both include: material, daily tests, PYQs, doubt support',
        'Scholarship test: up to 30% off',
        '7-day money-back guarantee',
        'NEET May 2, 2026 — don\'t delay enrollment',
      ],
      price: {
        original: 35000,
        discounted: 14999,
        emi: '₹5,000/month',
      },
    },
    cta: {
      title: 'Best Value NEET Crash Course — Starting ₹14,999',
      description: 'Quality doesn\'t mean expensive. Book a free counseling call to discuss the right plan for your budget and preparation level.',
      buttonText: 'Get Fee Details',
      buttonLink: '/contact',
    },
    contactButtons: defaultContactButtons,
    toolsCTA: crashCourseToolsCTA,
    relatedPages: [
      { title: 'Best NEET Crash Course', link: '/best-neet-crash-course' },
      { title: 'Compare Durations', link: '/neet-crash-course-comparison' },
      { title: '60-Day Crash Course', link: '/neet-biology-60-day-course' },
      { title: 'NEET Scholarship Test', link: '/neet-scholarship-noida' },
    ],
    schema: {
      '@type': 'Course',
      courseName: 'NEET Crash Course — Affordable Pricing Plans',
      provider: 'Cerebrum Biology Academy',
      description: 'NEET crash course fees starting ₹14,999. Compare pricing with Aakash, Allen. EMI available, scholarship up to 30%.',
      duration: '30-45 days',
      price: 14999,
      priceCurrency: 'INR',
    },
  },
}
