import { SEOLandingContent } from './types'

// Base content for Class 11 pages - each page will customize from this
const class11BaseContent = {
  classLevel: 'class-11' as const,
  stats: [
    { value: '98%', label: 'Success Rate', icon: 'trophy' },
    { value: '330+', label: 'Avg NEET Score', icon: 'target' },
    { value: '2,500+', label: 'Students Trained', icon: 'users' },
    { value: '45+', label: 'AIIMS Selections', icon: 'award' },
  ],
  testimonials: [
    {
      name: 'Priya Sharma',
      achievement: 'AIR 267 | AIIMS Delhi',
      quote:
        'Class 11 foundation at Cerebrum was the turning point. Dr. Shekhar made complex topics like Cell Biology crystal clear. I scored 340 in NEET Biology!',
      score: '340/360',
    },
    {
      name: 'Rahul Verma',
      achievement: 'AIR 512 | MAMC Delhi',
      quote:
        'Starting early in Class 11 gave me 2 years to master NEET biology. The small batch size meant every doubt was addressed immediately.',
      score: '335/360',
    },
    {
      name: 'Ananya Singh',
      achievement: 'AIR 891 | Lady Hardinge',
      quote:
        'The 3D animations for Human Physiology chapters helped me visualize what textbooks could never show. Worth every rupee!',
      score: '328/360',
    },
  ],
  courseSummary: {
    title: 'Class 11 NEET Biology Course',
    duration: '1 Year (April - March)',
    batchSize: '10-12 Students',
    features: [
      'Live interactive classes 4 days/week',
      'Complete NCERT + NEET coverage',
      'Weekly tests & performance tracking',
      'Personal mentorship from Dr. Shekhar',
      '24/7 doubt resolution on WhatsApp',
      'Recorded sessions for revision',
    ],
    price: {
      original: 85000,
      discounted: 75000,
      emi: '₹3,500/month',
    },
  },
  relatedPages: [
    { title: 'Class 12 NEET Course', link: '/class-12' },
    { title: 'NEET Complete 2-Year Program', link: '/courses/neet-complete' },
    { title: 'Compare All Courses', link: '/courses/compare' },
    { title: 'Success Stories', link: '/success-stories' },
  ],
}

// Page 1: /neet-biology-coaching-class-11/
export const neetBiologyCoachingClass11: SEOLandingContent = {
  ...class11BaseContent,
  slug: 'neet-biology-coaching-class-11',

  // SEO
  title: 'NEET Biology Coaching for Class 11 | Expert Online Classes',
  metaDescription:
    "Join India's top NEET biology coaching for Class 11. Live classes by AIIMS faculty, 10-12 student batches, 98% success rate. Start your medical journey now!",
  keywords: [
    'NEET biology coaching class 11',
    'class 11 NEET online classes',
    'NEET biology classes for class 11',
    'online NEET coaching class 11',
    'best NEET biology coaching',
  ],

  // Hero
  hero: {
    headline: 'Class 11 is Where NEET Dreams Begin',
    subheadline:
      "Join 2,500+ successful students who scored 330+ in NEET Biology with Dr. Shekhar's proven methodology",
    highlightedText: "Don't Leave Your Medical Dreams to Chance",
    ctaText: 'View Complete Course Details',
    ctaLink: '/class-11',
    backgroundGradient: 'from-indigo-900 to-indigo-800',
  },

  // Pain Points
  painPoints: {
    title: 'Are You Facing These Challenges?',
    points: [
      {
        icon: 'book-open',
        question: 'Struggling with NCERT concepts that seem endless?',
        solution:
          'Our structured approach breaks down complex chapters into digestible modules with visual learning aids.',
      },
      {
        icon: 'git-branch',
        question: 'Confused between Board prep and NEET prep?',
        solution: 'We integrate both seamlessly - ace your boards while building NEET-level depth.',
      },
      {
        icon: 'eye',
        question: 'Finding it hard to visualize complex diagrams?',
        solution: '3D animations and interactive models make even Human Physiology crystal clear.',
      },
      {
        icon: 'clock',
        question: 'Worried about starting NEET prep this early?',
        solution: 'Class 11 contributes 50% to NEET! Early start = less pressure in Class 12.',
      },
    ],
  },

  // Benefits
  benefits: {
    title: 'Why Cerebrum for Class 11 NEET Prep?',
    subtitle: 'The foundation you build now decides your NEET rank',
    items: [
      {
        icon: 'user-check',
        title: 'AIIMS-Trained Faculty',
        description:
          'Learn from doctors who cracked NEET themselves and understand exactly what it takes.',
      },
      {
        icon: 'users',
        title: 'Small Batches (10-12 Students)',
        description: 'Every student gets personal attention. No doubt goes unanswered.',
      },
      {
        icon: 'video',
        title: '3D Animations & Visual Learning',
        description:
          'Complex topics like Cell Biology become memorable through interactive visuals.',
      },
      {
        icon: 'bar-chart',
        title: 'Weekly Progress Tracking',
        description: 'Regular tests and parent reports keep everyone aligned on your progress.',
      },
      {
        icon: 'message-circle',
        title: '24/7 Doubt Resolution',
        description: 'WhatsApp support means you never stay stuck on a concept overnight.',
      },
      {
        icon: 'book',
        title: 'Board + NEET Integration',
        description: 'Score 95%+ in boards while building deep NEET conceptual understanding.',
      },
    ],
  },

  // FAQs
  faqs: [
    {
      question: 'Is Class 11 important for NEET preparation?',
      answer:
        'Absolutely! Class 11 Biology contributes approximately 50% of the NEET syllabus. Topics like Human Physiology, Plant Physiology, and Cell Biology are crucial for NEET. Starting early in Class 11 gives you ample time to build strong fundamentals and reduces pressure in Class 12.',
    },
    {
      question: 'How many hours should a Class 11 student study for NEET Biology?',
      answer:
        'We recommend 2-3 hours of focused Biology study daily for Class 11 students. Our course includes 4 live sessions per week (8-10 hours), plus self-study time for assignments and revision. Quality matters more than quantity - focused, conceptual learning beats rote memorization.',
    },
    {
      question: 'Can I prepare for school boards and NEET together in Class 11?',
      answer:
        "Yes! In fact, that's our approach. NEET Biology is largely based on NCERT, so strong NCERT understanding helps both. Our course covers NCERT thoroughly with NEET-level depth, helping you score 95%+ in boards while building competitive exam readiness.",
    },
    {
      question: 'What is the batch size for Class 11 NEET Biology classes?',
      answer:
        "Our Pinnacle batch has only 10-12 students, ensuring every student gets personal attention. This small batch size allows Dr. Shekhar to track each student's progress and address individual weaknesses.",
    },
    {
      question: 'What topics are covered in Class 11 NEET Biology coaching?',
      answer:
        'We cover all 5 units of Class 11 NCERT Biology: Diversity in Living World, Structural Organization, Cell Structure and Function, Plant Physiology, and Human Physiology. Each topic is taught with NEET-level application and previous year question practice.',
    },
    {
      question: 'How do online NEET Biology classes work for Class 11?',
      answer:
        "Our live interactive classes run on Zoom/Google Meet with real-time doubt solving. You get recorded sessions for revision, weekly tests on our platform, and 24/7 WhatsApp support. Parents receive monthly progress reports. It's like classroom coaching but from the comfort of your home.",
    },
  ],

  // CTA
  cta: {
    title: 'Start Your NEET Journey in Class 11',
    subtitle: 'The earlier you start, the higher you score. Join 2,500+ successful students.',
    primaryButton: {
      text: 'View Course & Pricing',
      link: '/class-11',
    },
    secondaryButton: {
      text: 'Book Free Demo Class',
      link: '/book-demo?class=class-11',
    },
  },

  // Schema
  schema: {
    '@type': 'Course',
    courseName: 'Class 11 NEET Biology Coaching',
    provider: 'Cerebrum Biology Academy',
    description:
      'Comprehensive NEET Biology preparation course for Class 11 students with live online classes, personal mentorship, and proven results.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 2: /class-11-biology-tuition-online/
export const class11BiologyTuitionOnline: SEOLandingContent = {
  ...class11BaseContent,
  slug: 'class-11-biology-tuition-online',

  title: 'Class 11 Biology Tuition Online | Live NEET Preparation',
  metaDescription:
    'Get expert Class 11 Biology tuition online from AIIMS faculty. Live interactive classes, small batches, complete NCERT coverage for NEET & Boards. Enroll now!',
  keywords: [
    'class 11 biology tuition online',
    'biology tuition for NEET class 11',
    'online biology tuition class 11',
    'class 11 biology coaching online',
    'biology tutor class 11',
  ],

  hero: {
    headline: 'Expert Biology Tuition for Class 11',
    subheadline:
      'Live online classes from AIIMS faculty. Master NCERT Biology while building NEET-level expertise.',
    highlightedText: 'Small Batches. Personal Attention. Proven Results.',
    ctaText: 'Explore Our Teaching Approach',
    ctaLink: '/class-11',
    backgroundGradient: 'from-green-800 via-green-800 to-cyan-900',
  },

  painPoints: {
    title: 'Why Choose Online Biology Tuition?',
    points: [
      {
        icon: 'map-pin',
        question: 'No quality coaching centers near your location?',
        solution:
          "Access India's best biology faculty from anywhere. Learn from home with the same quality as top Kota institutes.",
      },
      {
        icon: 'clock',
        question: 'Wasting time in commute to tuition?',
        solution:
          'Save 2-3 hours daily. Use that time for self-study or rest. No traffic, no stress.',
      },
      {
        icon: 'users',
        question: 'Lost in huge batches of 50-100 students?',
        solution:
          "Our 10-12 student batches mean you're never just another face. Every doubt gets addressed.",
      },
      {
        icon: 'repeat',
        question: "Missed a class and can't catch up?",
        solution: 'All sessions are recorded. Revise anytime, at your own pace. Never fall behind.',
      },
    ],
  },

  benefits: {
    title: 'The Cerebrum Advantage',
    subtitle: "Why 2,500+ parents trust us with their child's NEET dreams",
    items: [
      {
        icon: 'video',
        title: 'Live Interactive Sessions',
        description:
          'Real-time teaching with instant doubt solving. Not pre-recorded videos, but live classes.',
      },
      {
        icon: 'user-check',
        title: 'Verified Expert Faculty',
        description:
          'Dr. Shekhar and team are AIIMS alumni with 15+ years of NEET coaching experience.',
      },
      {
        icon: 'smartphone',
        title: 'Learn From Any Device',
        description: 'Attend from laptop, tablet, or phone. All you need is internet connection.',
      },
      {
        icon: 'bar-chart',
        title: 'Parent Dashboard',
        description:
          "Track your child's attendance, test scores, and progress. Complete transparency.",
      },
      {
        icon: 'file-text',
        title: 'Premium Study Material',
        description:
          'Digital notes, chapter PDFs, and exclusive question banks included in course.',
      },
      {
        icon: 'headphones',
        title: '24/7 Support',
        description: 'WhatsApp group for doubts, academic counseling, and motivation support.',
      },
    ],
  },

  faqs: [
    {
      question: 'How is online biology tuition different from offline coaching?',
      answer:
        "Our online biology tuition offers the same quality as top offline coaching but with added benefits: recorded sessions for revision, no commute time, learn from anywhere, and access to India's best faculty regardless of your location. Many students find they learn better online due to fewer distractions.",
    },
    {
      question: 'What are the timings for Class 11 biology tuition?',
      answer:
        'We offer multiple batch timings - morning (7-9 AM), afternoon (4-6 PM), and evening (7-9 PM) IST. Weekend batches are also available. You can choose the slot that fits your school schedule.',
    },
    {
      question: 'What devices do I need for online biology tuition?',
      answer:
        'Any device with a camera, microphone, and stable internet works - laptop, desktop, tablet, or smartphone. We recommend a laptop or tablet for better viewing of diagrams and animations. Minimum 5 Mbps internet is sufficient.',
    },
    {
      question: 'Will I get study materials for Class 11 biology tuition?',
      answer:
        'Yes! You receive comprehensive digital study materials including chapter notes, diagram sheets, previous year NEET questions, weekly practice sheets, and access to our question bank. All materials are included in the course fee.',
    },
    {
      question: 'How do you track student progress in online tuition?',
      answer:
        'We conduct weekly tests, surprise quizzes, and monthly assessments. Parents receive detailed progress reports. Our dashboard shows attendance, test scores, assignment completion, and areas needing improvement.',
    },
    {
      question: 'What is the fee for Class 11 biology online tuition?',
      answer:
        'Our Class 11 biology tuition ranges from ₹25,000 to ₹75,000 depending on the batch type (Pursuit, Ascent, or Pinnacle). EMI options starting at ₹3,500/month are available. Book a free demo to understand which batch suits you best.',
    },
  ],

  cta: {
    title: 'Experience the Best Online Biology Tuition',
    subtitle: 'Book a free demo class. See the difference quality teaching makes.',
    primaryButton: {
      text: 'View Pricing & Batches',
      link: '/class-11',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo?class=class-11',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Class 11 Biology Online Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Live online biology tuition for Class 11 students with AIIMS faculty, small batches, and comprehensive NEET preparation.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 3: /online-biology-classes-class-11/
export const onlineBiologyClassesClass11: SEOLandingContent = {
  ...class11BaseContent,
  slug: 'online-biology-classes-class-11',

  title: 'Online Biology Classes for Class 11 | Live NEET Coaching',
  metaDescription:
    'Join live online biology classes for Class 11. Expert AIIMS faculty, interactive sessions, complete NCERT & NEET coverage. Limited seats per batch!',
  keywords: [
    'online biology classes class 11',
    'live biology classes class 11',
    'class 11 biology online classes',
    'biology classes for NEET class 11',
    'online biology coaching class 11',
  ],

  hero: {
    headline: 'Live Biology Classes That Make NEET Simple',
    subheadline:
      'Interactive online sessions with real-time doubt solving. Class 11 Biology has never been this engaging.',
    highlightedText: 'Learn Concepts, Not Just Answers',
    ctaText: 'See How Our Classes Work',
    ctaLink: '/class-11',
    backgroundGradient: 'bg-indigo-700',
  },

  painPoints: {
    title: 'Tired of Boring Biology Classes?',
    points: [
      {
        icon: 'zap-off',
        question: 'Classes that put you to sleep?',
        solution:
          'Our sessions use 3D animations, case studies, and interactive quizzes. Biology becomes exciting!',
      },
      {
        icon: 'help-circle',
        question: 'Hesitant to ask doubts in large batches?',
        solution: 'With only 10-12 students, everyone participates. No judgment, just learning.',
      },
      {
        icon: 'calendar-x',
        question: 'Inconsistent teaching quality?',
        solution:
          'Dr. Shekhar personally leads classes. Same expert, every session. No substitute teachers.',
      },
      {
        icon: 'file-x',
        question: "Generic study material that doesn't help?",
        solution:
          'Our material is crafted specifically for NEET pattern, updated with latest trends.',
      },
    ],
  },

  benefits: {
    title: 'What Makes Our Classes Different',
    subtitle: 'The biology classes your NEET prep deserves',
    items: [
      {
        icon: 'play-circle',
        title: 'Visual Learning',
        description:
          '3D animations for complex topics. Cell division, human physiology - all come alive.',
      },
      {
        icon: 'message-square',
        title: 'Interactive Sessions',
        description:
          'Ask questions in real-time. Participate in polls and quizzes. Stay engaged throughout.',
      },
      {
        icon: 'calendar',
        title: 'Structured Curriculum',
        description:
          'Well-planned schedule covering all Class 11 topics with time for revision and tests.',
      },
      {
        icon: 'target',
        title: 'NEET-Focused Approach',
        description:
          'Every concept taught with NEET application. Previous year questions integrated in teaching.',
      },
      {
        icon: 'refresh-cw',
        title: 'Unlimited Revision',
        description: 'Recorded sessions available for 1 year. Watch any class any number of times.',
      },
      {
        icon: 'award',
        title: 'Proven Results',
        description:
          '65+ AIIMS selections, 1,50,000+ successful students. Results speak for themselves.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is the schedule for online biology classes for Class 11?',
      answer:
        'Our Class 11 biology classes run 4 days a week, 2 hours per session. We cover 1-2 topics per week with dedicated doubt-solving sessions on weekends. The entire Class 11 syllabus is completed by February, leaving time for revision.',
    },
    {
      question: 'Are live classes better than recorded video courses?',
      answer:
        'Yes! Live classes offer real-time interaction, immediate doubt resolution, and scheduled discipline. Unlike recorded courses, you can ask questions as they arise. Our classes are also recorded, so you get both benefits.',
    },
    {
      question: 'How interactive are the online biology classes?',
      answer:
        'Very interactive! We use polls, quick quizzes, breakout discussions, and live annotations. Students can unmute to ask questions or type in chat. The small batch size ensures everyone participates.',
    },
    {
      question: 'What if I miss a live class?',
      answer:
        'All classes are recorded and available within 4 hours of the session ending. You can watch at your convenience. However, we track attendance and encourage regular participation for best results.',
    },
    {
      question: 'Do you conduct tests after online classes?',
      answer:
        'Yes! Weekly topic tests, fortnightly chapter tests, and monthly mock tests are part of the program. All tests are conducted on our online platform with detailed analytics and ranking.',
    },
    {
      question: 'Can I join online biology classes in the middle of the year?',
      answer:
        "Yes, we offer mid-year joining with catch-up material. You'll get access to all previous recorded sessions. Our team will create a personalized plan to help you catch up with the batch.",
    },
  ],

  cta: {
    title: 'Join Biology Classes That Actually Work',
    subtitle: "Limited seats per batch. Don't miss the new batch starting soon.",
    primaryButton: {
      text: 'View Class Schedule',
      link: '/class-11',
    },
    secondaryButton: {
      text: 'Attend Free Trial Class',
      link: '/book-demo?class=class-11',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Online Biology Classes for Class 11',
    provider: 'Cerebrum Biology Academy',
    description:
      'Live interactive online biology classes for Class 11 with NEET preparation focus, expert faculty, and comprehensive curriculum.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 4: /best-biology-tutor-class-11/
export const bestBiologyTutorClass11: SEOLandingContent = {
  ...class11BaseContent,
  slug: 'best-biology-tutor-class-11',

  title: 'Best Biology Tutor for Class 11 | AIIMS Faculty',
  metaDescription:
    "Learn from India's best biology tutor for Class 11. Dr. Shekhar C Singh, AIIMS alumnus with 15+ years experience, has mentored 65+ AIIMS selections. Book demo now!",
  keywords: [
    'best biology tutor class 11',
    'biology teacher for NEET class 11',
    'top biology tutor online',
    'class 11 biology teacher',
    'best NEET biology teacher',
  ],

  hero: {
    headline: 'Learn From The Best Biology Tutor in India',
    subheadline:
      'Dr. Shekhar C Singh, AIIMS alumnus with 15+ years of experience, has personally mentored 65+ AIIMS selections.',
    highlightedText: 'Your Teacher Decides Your Rank',
    ctaText: 'Meet Dr. Shekhar',
    ctaLink: '/faculty',
    backgroundGradient: 'from-yellow-900 via-orange-900 to-red-900',
  },

  painPoints: {
    title: 'Why Your Biology Tutor Matters',
    points: [
      {
        icon: 'user-x',
        question: 'Learning from tutors who never cracked competitive exams?',
        solution:
          "Dr. Shekhar is an AIIMS alumnus. He knows exactly what NEET demands because he's been there.",
      },
      {
        icon: 'shuffle',
        question: 'Different teachers for different topics?',
        solution:
          'One expert tutor for the entire course. Consistent teaching style, no confusion.',
      },
      {
        icon: 'thumbs-down',
        question: 'Tutors who just read from textbooks?',
        solution:
          'Experience conceptual teaching with real-life applications and NEET-pattern questions.',
      },
      {
        icon: 'x-circle',
        question: 'No access to your tutor outside class hours?',
        solution:
          'Direct WhatsApp access to Dr. Shekhar. Get your doubts solved within hours, not days.',
      },
    ],
  },

  benefits: {
    title: 'Why Students Choose Dr. Shekhar',
    subtitle: '15+ years of NEET teaching excellence',
    items: [
      {
        icon: 'graduation-cap',
        title: 'AIIMS Delhi Graduate',
        description:
          'Completed MBBS from AIIMS Delhi. Understands medical entrance exams from the inside.',
      },
      {
        icon: 'award',
        title: '65+ AIIMS Selections',
        description: 'Personally mentored 65+ students to AIIMS and 1000+ to top medical colleges.',
      },
      {
        icon: 'book-open',
        title: 'Author of 3 NEET Books',
        description:
          'Published author with books on Biology for NEET used by thousands of students.',
      },
      {
        icon: 'star',
        title: '4.9/5 Student Rating',
        description:
          'Consistently rated as one of the best biology teachers by students and parents.',
      },
      {
        icon: 'clock',
        title: '15+ Years Experience',
        description: 'Over 15 years of teaching NEET Biology. Seen every type of question pattern.',
      },
      {
        icon: 'heart',
        title: 'Mentor, Not Just Teacher',
        description: 'Guides students on exam strategy, stress management, and career counseling.',
      },
    ],
  },

  faqs: [
    {
      question: 'Who is the best biology tutor for NEET Class 11?',
      answer:
        'The best biology tutor is someone who has cracked competitive medical exams themselves and has proven teaching results. Dr. Shekhar C Singh, our lead faculty, is an AIIMS Delhi alumnus with 65+ AIIMS selections and 15+ years of NEET coaching experience. His students consistently score 320+ in NEET Biology.',
    },
    {
      question: 'How to find a good biology tutor for Class 11?',
      answer:
        'Look for: 1) Educational background (preferably medical college alumni), 2) Teaching experience specifically for NEET, 3) Track record of student results, 4) Teaching style (conceptual vs rote learning), and 5) Accessibility for doubt solving. Always attend a demo class before deciding.',
    },
    {
      question: 'What qualifications should a Class 11 biology tutor have?',
      answer:
        'Ideal qualifications include: MBBS or equivalent degree, experience in teaching NEET Biology, understanding of NEET exam pattern, ability to simplify complex topics, and good communication skills. At Cerebrum, all our faculty are medical professionals with competitive exam experience.',
    },
    {
      question: 'Is online biology tutor as effective as offline?',
      answer:
        'Yes, often more effective! Online tutoring offers: access to the best tutors regardless of location, recorded sessions for revision, no commute time, comfortable learning environment, and same interactive teaching with screen sharing. Our students score equally well as any top coaching institute students.',
    },
    {
      question: 'How much does a good biology tutor charge for Class 11?',
      answer:
        'Quality biology tutors for NEET Class 11 typically charge ₹2,000-8,000 per month for group classes and ₹1,000-3,000 per hour for 1-on-1 sessions. Our comprehensive yearly course ranges from ₹25,000-75,000 depending on batch size and features.',
    },
    {
      question: 'Can I learn directly from Dr. Shekhar?',
      answer:
        'Yes! Our Pinnacle batch students get direct teaching from Dr. Shekhar in small batches of 10-12 students. This includes personal mentorship, direct WhatsApp access, and one-on-one doubt sessions. Book a demo to experience his teaching style.',
    },
  ],

  cta: {
    title: 'Learn From The Best',
    subtitle: "Experience Dr. Shekhar's teaching in a free demo class.",
    primaryButton: {
      text: "View Dr. Shekhar's Profile",
      link: '/faculty',
    },
    secondaryButton: {
      text: 'Book Free Demo Class',
      link: '/book-demo?class=class-11',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Class 11 Biology with Expert Tutor',
    provider: 'Cerebrum Biology Academy',
    description:
      "Learn Class 11 Biology from India's top tutor Dr. Shekhar C Singh, AIIMS alumnus with 65+ AIIMS selections and 15+ years experience.",
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 5: /class-11-neet-preparation-online/
export const class11NeetPreparationOnline: SEOLandingContent = {
  ...class11BaseContent,
  slug: 'class-11-neet-preparation-online',

  title: 'Class 11 NEET Preparation Online | Complete Biology Course',
  metaDescription:
    'Start your NEET preparation in Class 11 with expert online coaching. 50% of NEET comes from Class 11. Build strong foundation with AIIMS faculty. Enroll now!',
  keywords: [
    'class 11 NEET preparation online',
    'NEET coaching for class 11',
    'class 11 NEET biology online',
    'NEET foundation class 11',
    'early NEET preparation class 11',
  ],

  hero: {
    headline: 'Start Your NEET Preparation in Class 11',
    subheadline:
      '50% of NEET syllabus comes from Class 11. The earlier you start, the higher you score.',
    highlightedText: '2 Years of Preparation = 2X Better Results',
    ctaText: 'Start My NEET Journey',
    ctaLink: '/class-11',
    backgroundGradient: 'from-cyan-900 via-blue-900 to-indigo-900',
  },

  painPoints: {
    title: 'Why Start NEET Prep in Class 11?',
    points: [
      {
        icon: 'pie-chart',
        question: 'Did you know 50% of NEET comes from Class 11?',
        solution:
          'Topics like Human Physiology, Plant Physiology, and Cell Biology are heavily weighted in NEET.',
      },
      {
        icon: 'trending-down',
        question: 'Worried about Class 12 pressure?',
        solution:
          'Start now, build concepts slowly. Less cramming in Class 12, better board results too.',
      },
      {
        icon: 'target',
        question: 'Not sure if online prep works for NEET?',
        solution:
          'Our students score 330+ consistently. Many with AIR under 1000. Results prove it works.',
      },
      {
        icon: 'dollar-sign',
        question: 'Thinking of waiting and joining Kota in Class 12?',
        solution: 'Get the same quality teaching online at 1/3rd the cost. No relocation stress.',
      },
    ],
  },

  benefits: {
    title: '2-Year NEET Advantage',
    subtitle: 'Why Class 11 starters consistently outperform',
    items: [
      {
        icon: 'clock',
        title: 'More Time, Less Stress',
        description: 'Spread 2 years of syllabus over 2 years instead of cramming in one.',
      },
      {
        icon: 'layers',
        title: 'Deeper Understanding',
        description: 'Time to understand concepts deeply. Not just memorize, but truly learn.',
      },
      {
        icon: 'repeat',
        title: 'Multiple Revisions',
        description: 'Complete Class 11 in Class 11, revise it again in Class 12 for perfection.',
      },
      {
        icon: 'trending-up',
        title: 'Gradual Score Improvement',
        description: 'Start with basics, build up. See consistent improvement in mock tests.',
      },
      {
        icon: 'book',
        title: 'Board Exam Excellence',
        description: 'Strong NEET prep = Strong board prep. Score 95%+ in both.',
      },
      {
        icon: 'shield',
        title: 'Backup Time',
        description: 'If some topics need extra work, you have time. No last-minute panic.',
      },
    ],
  },

  faqs: [
    {
      question: 'Is Class 11 too early to start NEET preparation?',
      answer:
        'Not at all! In fact, Class 11 is the ideal time. 50% of NEET Biology comes from Class 11 syllabus. Students who start in Class 11 typically score 20-30 marks higher than those who start in Class 12. Early preparation builds strong fundamentals and reduces stress.',
    },
    {
      question: 'What is the NEET syllabus from Class 11?',
      answer:
        'Class 11 NEET Biology syllabus includes: Unit 1 - Diversity of Living World (Biological Classification, Plant & Animal Kingdom), Unit 2 - Structural Organization, Unit 3 - Cell Structure & Function, Unit 4 - Plant Physiology, Unit 5 - Human Physiology. These contribute approximately 45-50% of NEET Biology questions.',
    },
    {
      question: 'How to balance Class 11 school and NEET preparation?',
      answer:
        'Our course is designed for this balance. We follow the school academic calendar, cover NCERT thoroughly (which helps both board and NEET), and schedule classes to not clash with school exams. Students typically spend 2-3 hours daily on NEET prep alongside school.',
    },
    {
      question: 'Is online NEET coaching effective for Class 11?',
      answer:
        "Highly effective! Our Class 11 students score on par with top coaching institute students. Benefits include: learn from India's best faculty, no commute, recorded sessions for revision, and personalized attention in small batches. Many AIIMS selections in 2024 were from our online batches.",
    },
    {
      question: 'What is the fee for Class 11 NEET preparation online?',
      answer:
        'Our Class 11 NEET courses range from ₹25,000 (Pursuit batch) to ₹75,000 (Pinnacle batch) for the full year. The difference is batch size and features. EMI options available at ₹3,500/month. This is 40-60% cheaper than offline Kota coaching with the same quality.',
    },
    {
      question: 'Should I join Class 11 NEET batch or the 2-year program?',
      answer:
        'Both options are available. The 2-year integrated program offers continuity, planned curriculum, and often better pricing. However, you can also join Class 11 now and continue with Class 12 next year. Book a counseling session to discuss what suits your needs.',
    },
  ],

  cta: {
    title: "Don't Wait for Class 12",
    subtitle: 'Start today. Get 2 years of preparation. Score better in NEET.',
    primaryButton: {
      text: 'Explore Class 11 Courses',
      link: '/class-11',
    },
    secondaryButton: {
      text: 'Talk to Academic Counselor',
      link: '/contact?topic=class-11-neet',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Class 11 NEET Preparation Course',
    provider: 'Cerebrum Biology Academy',
    description:
      'Comprehensive online NEET preparation starting from Class 11 with complete Biology coverage, expert faculty, and proven results.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 6: /ncert-biology-class-11-tuition/
export const ncertBiologyClass11Tuition: SEOLandingContent = {
  ...class11BaseContent,
  slug: 'ncert-biology-class-11-tuition',

  title: 'NCERT Biology Class 11 Tuition | Complete CBSE Coverage',
  metaDescription:
    'Master NCERT Biology Class 11 with expert tuition. Line-by-line NCERT coverage with NEET application. Perfect for CBSE boards & competitive exams. Join now!',
  keywords: [
    'NCERT biology class 11 tuition',
    'class 11 biology CBSE coaching',
    'NCERT biology coaching class 11',
    'class 11 CBSE biology tuition',
    'NCERT based NEET biology',
  ],

  hero: {
    headline: 'Master NCERT Biology in Class 11',
    subheadline:
      'Line-by-line NCERT coverage with NEET-level depth. Score 95%+ in boards while building competitive exam foundation.',
    highlightedText: 'NCERT is the Bible of NEET',
    ctaText: 'See Our NCERT Approach',
    ctaLink: '/class-11',
    backgroundGradient: 'from-green-900 via-green-800 to-green-800',
  },

  painPoints: {
    title: 'Why NCERT Mastery is Critical',
    points: [
      {
        icon: 'book',
        question: 'Confused by reference books and notes?',
        solution:
          'We focus on NCERT first. 95% of NEET questions are NCERT-based. Master it, ace NEET.',
      },
      {
        icon: 'search',
        question: 'Not understanding NCERT fully?',
        solution: 'Our line-by-line analysis covers every diagram, table, and statement in NCERT.',
      },
      {
        icon: 'check-square',
        question: 'Worried about board exam pattern?',
        solution:
          'CBSE boards test NCERT. Our teaching covers both board and NEET pattern questions.',
      },
      {
        icon: 'book-open',
        question: 'Which edition of NCERT to follow?',
        solution: 'We cover the latest edition and highlight all recent changes and additions.',
      },
    ],
  },

  benefits: {
    title: 'The NCERT-First Approach',
    subtitle: 'Why we prioritize NCERT for both boards and NEET',
    items: [
      {
        icon: 'book',
        title: 'Line-by-Line Coverage',
        description:
          'Every line of NCERT explained. No skipping, no assumptions. Complete coverage.',
      },
      {
        icon: 'image',
        title: 'Diagram Mastery',
        description:
          'Learn to draw and label every NCERT diagram. Diagram-based questions made easy.',
      },
      {
        icon: 'list',
        title: 'Table & Comparison Focus',
        description:
          'All NCERT tables and comparisons memorized and understood. Scoring topics covered.',
      },
      {
        icon: 'file-text',
        title: 'NCERT Exemplar Practice',
        description:
          'NCERT Exemplar questions solved and explained. Higher-order thinking developed.',
      },
      {
        icon: 'link',
        title: 'NEET PYQ Connection',
        description:
          'Every NCERT concept linked to NEET previous year questions. See the application.',
      },
      {
        icon: 'check-circle',
        title: 'Board Exam Ready',
        description: 'Score 95%+ in CBSE boards with our NCERT-focused preparation.',
      },
    ],
  },

  faqs: [
    {
      question: 'How important is NCERT for NEET Biology Class 11?',
      answer:
        'Extremely important! 90-95% of NEET Biology questions are directly or indirectly from NCERT. NEET authorities have confirmed that NCERT is the syllabus for NEET. Our teaching covers every line, diagram, and table in NCERT Class 11 Biology textbook.',
    },
    {
      question: 'Is NCERT enough for Class 11 Biology boards?',
      answer:
        'Yes, NCERT is completely sufficient for CBSE Class 11 Biology exams. In fact, CBSE question papers are designed based on NCERT. Our course ensures thorough NCERT coverage that prepares you for both boards and NEET.',
    },
    {
      question: 'Should I study reference books for Class 11 Biology?',
      answer:
        'Master NCERT first, then use reference books for additional practice questions. We recommend completing NCERT thoroughly before touching any reference material. Our course provides supplementary questions without needing reference books.',
    },
    {
      question: 'How to study NCERT Biology effectively for Class 11?',
      answer:
        'Our approach: 1) Read topic from NCERT, 2) Watch our explanatory video/class, 3) Re-read NCERT with notes, 4) Practice NCERT examples & exercises, 5) Solve NCERT Exemplar, 6) Practice NEET PYQs from that topic. This 6-step approach ensures complete mastery.',
    },
    {
      question: 'Which chapters are most important in NCERT Class 11 Biology?',
      answer:
        'For NEET: Unit 5 (Human Physiology) is highest weightage, followed by Unit 4 (Plant Physiology) and Unit 3 (Cell Biology). For boards, all units are equally important. We give appropriate weightage to all topics.',
    },
    {
      question: 'Do you provide NCERT-based study material?',
      answer:
        'Yes! Our study material is built around NCERT. It includes: NCERT line-by-line notes, diagram practice sheets, table summaries for quick revision, NCERT Exemplar solutions, and NEET PYQs organized chapter-wise. All materials align with the latest NCERT edition.',
    },
  ],

  cta: {
    title: 'Master NCERT, Ace NEET',
    subtitle: 'Join 1,50,000+ students who built their NEET foundation on NCERT.',
    primaryButton: {
      text: 'See NCERT-Based Curriculum',
      link: '/class-11',
    },
    secondaryButton: {
      text: 'Download Free NCERT Notes',
      link: '/free-resources?subject=biology&class=11',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NCERT Biology Class 11 Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Complete NCERT Biology Class 11 tuition with line-by-line coverage for CBSE boards and NEET preparation.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Export all Class 11 content
export const class11SEOPages = {
  neetBiologyCoachingClass11,
  class11BiologyTuitionOnline,
  onlineBiologyClassesClass11,
  bestBiologyTutorClass11,
  class11NeetPreparationOnline,
  ncertBiologyClass11Tuition,
}
