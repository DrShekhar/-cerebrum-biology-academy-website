import { SEOLandingContent } from './types'

// Base content for Universal pages (not class-specific)
const universalBaseContent = {
  classLevel: 'universal' as const,
  stats: [
    { value: '98%', label: 'Success Rate', icon: 'trophy' },
    { value: '5,000+', label: 'Students Trained', icon: 'users' },
    { value: '100+', label: 'Top Medical Colleges', icon: 'award' },
    { value: '15+', label: 'Years Experience', icon: 'clock' },
  ],
  testimonials: [
    {
      name: 'Dr. Priya Sharma',
      achievement: 'AIIMS Delhi | AIR 267',
      quote:
        "Cerebrum's online biology coaching transformed my preparation. Dr. Shekhar's teaching made complex topics simple. Forever grateful!",
      score: '340/360 Biology',
    },
    {
      name: 'Dr. Rahul Verma',
      achievement: 'JIPMER | AIR 189',
      quote:
        'The best investment I made for NEET. Online classes with personal attention - rare combination. Now living my doctor dream!',
      score: '335/360 Biology',
    },
    {
      name: 'Ananya Singh',
      achievement: 'MAMC Delhi | AIR 445',
      quote:
        "From a small town with no coaching, Cerebrum's online platform gave me access to the best biology teacher in India.",
      score: '328/360 Biology',
    },
  ],
  courseSummary: {
    title: 'NEET Biology Online Courses',
    duration: '1 Year Programs',
    batchSize: '10-12 Students',
    features: [
      'Live interactive online classes',
      'Complete NCERT + NEET coverage',
      'AIIMS-trained expert faculty',
      'Small batches for personal attention',
      'Comprehensive test series included',
      '24/7 doubt resolution support',
    ],
    price: {
      original: 85000,
      discounted: 75000,
      emi: '₹3,500/month',
    },
  },
  relatedPages: [
    { title: 'Class 11 NEET Course', link: '/class-11' },
    { title: 'Class 12 NEET Course', link: '/class-12' },
    { title: 'NEET Dropper Course', link: '/courses/neet-dropper' },
    { title: 'Compare All Courses', link: '/courses/compare' },
  ],
}

// Page 1: /online-biology-tuition-india/
export const onlineBiologyTuitionIndia: SEOLandingContent = {
  ...universalBaseContent,
  slug: 'online-biology-tuition-india',

  title: 'Online Biology Tuition India | Best NEET Coaching Platform',
  metaDescription:
    "India's best online biology tuition for NEET preparation. Expert AIIMS faculty, live classes, proven results. Join 5,000+ successful students. Enroll now!",
  keywords: [
    'online biology tuition India',
    'biology tuition online',
    'best online biology tuition',
    'biology online classes India',
    'NEET biology online tuition',
  ],

  hero: {
    headline: "India's Premier Online Biology Tuition",
    subheadline:
      "Access India's best biology teachers from anywhere. Live online classes that deliver NEET success.",
    highlightedText: 'Geography Should Never Limit Your Dreams',
    ctaText: 'Explore All Courses',
    ctaLink: '/courses',
    backgroundGradient: 'from-indigo-900 to-indigo-800',
  },

  painPoints: {
    title: 'Why Online Biology Tuition?',
    points: [
      {
        icon: 'map-pin',
        question: 'No quality coaching in your city?',
        solution:
          "Access India's best AIIMS faculty online. Learn from anywhere - metro or small town.",
      },
      {
        icon: 'clock',
        question: 'Wasting hours in commute?',
        solution: 'Learn from home. Save 2-3 hours daily for more study or healthy rest.',
      },
      {
        icon: 'users',
        question: 'Lost in huge coaching batches?',
        solution: 'Our 10-12 student batches ensure personal attention. Everyone matters.',
      },
      {
        icon: 'dollar-sign',
        question: 'Quality coaching too expensive?',
        solution: '40-60% cheaper than Kota coaching (including stay). Same quality, better value.',
      },
    ],
  },

  benefits: {
    title: 'The Cerebrum Online Advantage',
    subtitle: 'Why 5,000+ students chose us across India',
    items: [
      {
        icon: 'user-check',
        title: 'AIIMS Faculty',
        description:
          'Learn from Dr. Shekhar and team - AIIMS alumni with 15+ years NEET experience.',
      },
      {
        icon: 'video',
        title: 'Live Interactive Classes',
        description:
          'Real-time teaching, not recorded videos. Ask questions, get answers instantly.',
      },
      {
        icon: 'users',
        title: 'Small Batches',
        description: 'Only 10-12 students per batch. Personal attention guaranteed.',
      },
      {
        icon: 'repeat',
        title: 'Recorded Sessions',
        description: 'Miss a class? Watch the recording. Revise anytime you need.',
      },
      {
        icon: 'message-circle',
        title: '24/7 Doubt Support',
        description: 'WhatsApp group for instant doubt resolution. Never stay stuck.',
      },
      {
        icon: 'award',
        title: 'Proven Results',
        description: '100+ students in top medical colleges. Results across India.',
      },
    ],
  },

  faqs: [
    {
      question: 'Is online biology tuition effective for NEET preparation?',
      answer:
        'Absolutely! Our online students consistently match or exceed offline coaching results. Benefits include: access to best faculty regardless of location, recorded sessions for revision, comfortable study environment, and often more personal attention. Our 98% success rate proves online works.',
    },
    {
      question: 'What makes Cerebrum the best online biology tuition in India?',
      answer:
        'Three factors: 1) Faculty - AIIMS-trained with 15+ years NEET experience, 2) Results - 5,000+ students in top medical colleges, 3) Approach - Small batches, personal attention, comprehensive support. We combine best teaching with technology.',
    },
    {
      question: 'Which classes do you offer online biology tuition for?',
      answer:
        'We offer online biology tuition for: Class 9-10 (Foundation), Class 11-12 (NEET Preparation), and Dropper batches. Each level has specialized curriculum designed for that stage. You can join at any level based on your needs.',
    },
    {
      question: 'How do online biology classes work?',
      answer:
        'Live classes on Zoom/Google Meet with interactive whiteboard. Students can ask questions via audio or chat. All sessions are recorded. Doubt sessions twice weekly. WhatsApp support 24/7. Tests conducted on our online platform.',
    },
    {
      question: 'What is the fee for online biology tuition for NEET?',
      answer:
        'Fees vary by course: Class 9-10 Foundation (₹28,000-32,000/year), Class 11-12 NEET (₹75,000-85,000/year), Dropper Batch (₹80,000/year). EMI options available. All courses include material, tests, and support.',
    },
    {
      question: 'Do you cover all India for online biology tuition?',
      answer:
        'Yes! We have students from all states - from metros like Delhi, Mumbai to small towns in UP, Bihar, Rajasthan, Tamil Nadu. Online breaks geographical barriers. All you need is internet connection.',
    },
  ],

  cta: {
    title: 'Start Your NEET Journey Online',
    subtitle: 'Join 5,000+ students from across India. Quality coaching, anywhere.',
    primaryButton: {
      text: 'Explore All Courses',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo Class',
      link: '/book-demo',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Online Biology Tuition India',
    provider: 'Cerebrum Biology Academy',
    description:
      "India's premier online biology tuition platform for NEET preparation with expert AIIMS faculty.",
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 2: /neet-biology-online-coaching/
export const neetBiologyOnlineCoaching: SEOLandingContent = {
  ...universalBaseContent,
  slug: 'neet-biology-online-coaching',

  title: 'NEET Biology Online Coaching | Expert Live Classes',
  metaDescription:
    "Best NEET biology online coaching by AIIMS faculty. Live classes, small batches, 98% success rate. Join India's top biology coaching for NEET!",
  keywords: [
    'NEET biology online coaching',
    'biology coaching for NEET online',
    'best NEET biology coaching online',
    'NEET biology classes online',
    'online coaching for NEET biology',
  ],

  hero: {
    headline: 'The Online Coaching That Gets You Into Medical College',
    subheadline:
      'Expert NEET biology coaching delivered online. 98% success rate. Join from anywhere in India.',
    highlightedText: 'Your Biology Score = Your NEET Rank',
    ctaText: 'Join NEET Coaching',
    ctaLink: '/courses',
    backgroundGradient: 'from-green-900 via-green-800 to-green-800',
  },

  painPoints: {
    title: 'Why Choose Online NEET Coaching?',
    points: [
      {
        icon: 'target',
        question: 'Biology is 50% of NEET - are you prepared?',
        solution:
          'Our focused biology coaching maximizes your 360 marks potential. Expert strategies for each topic.',
      },
      {
        icon: 'shuffle',
        question: 'Confused by multiple coaching options?',
        solution: '15+ years, 1000+ top college selections. Proven track record you can trust.',
      },
      {
        icon: 'map-pin',
        question: "Can't relocate to Kota or Delhi?",
        solution:
          'Get the same quality coaching online. No relocation needed, no compromise on quality.',
      },
      {
        icon: 'users',
        question: 'Worried about online being impersonal?',
        solution: "Small 10-12 student batches. Personal mentorship. You're never just a number.",
      },
    ],
  },

  benefits: {
    title: 'NEET Biology Excellence',
    subtitle: 'What our online coaching delivers',
    items: [
      {
        icon: 'book',
        title: 'Complete NCERT Mastery',
        description: 'Line-by-line NCERT coverage. 95% of NEET is NCERT-based. We ensure mastery.',
      },
      {
        icon: 'layers',
        title: 'NEET-Depth Concepts',
        description: 'Beyond basics. Application-level understanding for twisted questions.',
      },
      {
        icon: 'clipboard',
        title: 'Extensive Practice',
        description: '10,000+ MCQs, topic tests, mock tests. Practice until perfect.',
      },
      {
        icon: 'bar-chart',
        title: 'Performance Analytics',
        description: 'Track your progress. Identify weak areas. Targeted improvement.',
      },
      {
        icon: 'video',
        title: 'Live + Recorded',
        description: 'Attend live for interaction. Watch recordings for revision. Best of both.',
      },
      {
        icon: 'user-check',
        title: 'Expert Mentorship',
        description: 'AIIMS faculty guidance. Strategy advice. Career counseling included.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is the success rate of your NEET biology online coaching?',
      answer:
        '98% of our students qualify NEET (score 500+). 65% score 600+. We have 100+ students in top 5 medical colleges (AIIMS, JIPMER, MAMC). Our online coaching results match the best offline institutes.',
    },
    {
      question: 'How is biology coaching structured for NEET online?',
      answer:
        'Systematic approach: Complete syllabus coverage with NEET depth, chapter-wise tests, cumulative revision tests, mock tests with analysis. We cover Class 11 + 12 biology comprehensively. Each topic linked to NEET previous year questions.',
    },
    {
      question: 'Who teaches in your NEET biology online coaching?',
      answer:
        'Dr. Shekhar C Singh (AIIMS Delhi alumnus) leads our coaching. He has 15+ years of NEET teaching experience and has produced 1000+ top medical college selections. Team includes experienced biology educators with competitive exam expertise.',
    },
    {
      question: 'Is online coaching enough for NEET biology or do I need offline too?',
      answer:
        'Our online coaching is complete and sufficient. It includes: live classes, study material, tests, doubt support, and mentorship. Many students add no supplementary coaching. Our results prove online alone can get you AIIMS.',
    },
    {
      question: 'What study material is provided in NEET biology online coaching?',
      answer:
        'Comprehensive material: Chapter notes (digital/printable), NCERT analysis, previous year questions (chapter-wise), topic-wise MCQ banks, mock test papers, quick revision sheets. Everything needed for NEET biology.',
    },
    {
      question: 'How to enroll in NEET biology online coaching?',
      answer:
        'Book a free demo class first. Experience teaching quality. Choose your course (Class 11/12/Dropper). Enroll online. Fee: ₹75,000-85,000/year with EMI options. New batches start regularly.',
    },
  ],

  cta: {
    title: 'Master Biology, Crack NEET',
    subtitle: 'Join the online coaching that has produced 1000+ medical doctors.',
    primaryButton: {
      text: 'Explore NEET Courses',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET Biology Online Coaching',
    provider: 'Cerebrum Biology Academy',
    description:
      'Expert NEET biology online coaching with live classes, comprehensive material, and proven results.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 3: /best-biology-teacher-neet/
export const bestBiologyTeacherNeet: SEOLandingContent = {
  ...universalBaseContent,
  slug: 'best-biology-teacher-neet',

  title: 'Best Biology Teacher for NEET | Dr. Shekhar Online Classes',
  metaDescription:
    "Learn from India's best biology teacher for NEET. Dr. Shekhar C Singh, AIIMS alumnus with 1000+ top college selections. Live online classes. Book demo now!",
  keywords: [
    'best biology teacher for NEET',
    'best online biology teacher',
    'top NEET biology teacher online',
    'biology teacher for NEET online',
    'best biology tutor NEET',
  ],

  hero: {
    headline: "Learn From India's Best Biology Teacher",
    subheadline:
      'Dr. Shekhar, AIIMS Delhi alumnus, has mentored 100+ students to top medical colleges. Now teaching online.',
    highlightedText: 'The Right Teacher Changes Everything',
    ctaText: 'Meet Dr. Shekhar',
    ctaLink: '/faculty',
    backgroundGradient: 'from-yellow-900 via-orange-900 to-red-900',
  },

  painPoints: {
    title: 'Why Your Teacher Matters Most',
    points: [
      {
        icon: 'user-x',
        question: 'Learning from teachers who never cracked NEET?',
        solution: 'Dr. Shekhar is an AIIMS graduate. He knows NEET from the inside.',
      },
      {
        icon: 'shuffle',
        question: 'Different teachers for different topics?',
        solution: 'One master teacher for entire biology. Consistent approach, no confusion.',
      },
      {
        icon: 'thumbs-down',
        question: 'Teachers who just read from books?',
        solution: 'Conceptual teaching with real applications. Understanding, not memorization.',
      },
      {
        icon: 'lock',
        question: 'No access to teacher outside class?',
        solution: 'Direct WhatsApp access. Doubts solved within hours, not days.',
      },
    ],
  },

  benefits: {
    title: 'Why Dr. Shekhar is The Best',
    subtitle: 'The credentials that make the difference',
    items: [
      {
        icon: 'graduation-cap',
        title: 'AIIMS Delhi Graduate',
        description: 'Completed MBBS from AIIMS. Understands medical entrance from inside.',
      },
      {
        icon: 'award',
        title: '100+ Top College Selections',
        description: 'Students in AIIMS, JIPMER, MAMC, and other top medical colleges.',
      },
      {
        icon: 'book-open',
        title: 'Published Author',
        description: 'Author of NEET Biology books used by thousands of students.',
      },
      {
        icon: 'clock',
        title: '15+ Years Experience',
        description: 'Teaching NEET biology since 2008. Seen every pattern, every change.',
      },
      {
        icon: 'star',
        title: '4.9/5 Student Rating',
        description: "Consistently rated as one of India's best biology teachers.",
      },
      {
        icon: 'heart',
        title: 'Mentor, Not Just Teacher',
        description: 'Guides on exam strategy, stress management, and career planning.',
      },
    ],
  },

  faqs: [
    {
      question: 'What makes Dr. Shekhar the best biology teacher for NEET?',
      answer:
        'Unique combination: 1) AIIMS Delhi graduate who understands medical entrance, 2) 15+ years of NEET-specific teaching, 3) 100+ students in top medical colleges, 4) Published author of NEET books, 5) Personal mentorship approach. Results and credentials speak.',
    },
    {
      question: 'How can I learn from Dr. Shekhar online?',
      answer:
        'Dr. Shekhar teaches all Pinnacle batch students directly via live online classes. He also conducts critical topic sessions for all batches. Book a free demo to experience his teaching. Pinnacle batch offers maximum Dr. Shekhar interaction.',
    },
    {
      question: 'Does Dr. Shekhar personally respond to doubts?',
      answer:
        'Pinnacle batch students have direct WhatsApp access to Dr. Shekhar for doubts. Other batches have access through scheduled doubt sessions. Critical doubts are always addressed by Dr. Shekhar himself.',
    },
    {
      question: "What is Dr. Shekhar's teaching style?",
      answer:
        'Conceptual, visual, and exam-focused. Uses 3D animations, real-life applications, and extensive NEET question practice. Goes beyond textbook to teach how to think like NEET setters. Makes complex topics crystal clear.',
    },
    {
      question: 'How many students has Dr. Shekhar taught?',
      answer:
        '5,000+ students over 15 years. 100+ in AIIMS/JIPMER/top medical colleges. Students from across India and abroad. Track record of consistent results across different years and NEET patterns.',
    },
    {
      question: 'What is the fee to study with Dr. Shekhar online?',
      answer:
        'Pinnacle batch (maximum Dr. Shekhar involvement): ₹75,000-85,000/year. Other batches with his guidance: ₹45,000-60,000/year. Given his credentials and results, this is excellent value for quality.',
    },
  ],

  cta: {
    title: 'Learn From The Best',
    subtitle: "Experience Dr. Shekhar's teaching in a free demo class.",
    primaryButton: {
      text: 'Meet Dr. Shekhar',
      link: '/faculty',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET Biology with Dr. Shekhar',
    provider: 'Cerebrum Biology Academy',
    description:
      "Learn NEET Biology from India's best teacher Dr. Shekhar C Singh, AIIMS alumnus with 1000+ top college selections.",
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 4: /1-on-1-biology-tuition-neet/
export const oneOnOneBiologyTuitionNeet: SEOLandingContent = {
  ...universalBaseContent,
  slug: '1-on-1-biology-tuition-neet',

  title: '1-on-1 Biology Tuition for NEET | Personalized Online Coaching',
  metaDescription:
    'Personalized 1-on-1 biology tuition for NEET online. Individual attention, customized pace, maximum results. Expert AIIMS faculty. Limited slots!',
  keywords: [
    '1-on-1 biology tuition NEET',
    'personalized biology coaching',
    'individual NEET biology tuition',
    'private biology tutor NEET online',
    'one on one NEET biology online',
  ],

  hero: {
    headline: 'Your Personal Path to NEET Biology Excellence',
    subheadline:
      '1-on-1 online sessions tailored to your pace, your weaknesses, your goals. Maximum personalization, maximum results.',
    highlightedText: 'Because Every Student is Different',
    ctaText: 'Get Personal Attention',
    ctaLink: '/contact?topic=1-on-1-tuition',
    backgroundGradient: 'from-purple-900 via-violet-900 to-indigo-900',
  },

  painPoints: {
    title: 'Why 1-on-1 Tuition Works Best',
    points: [
      {
        icon: 'users',
        question: 'Lost in batches of 50-100 students?',
        solution: 'Just you and the teacher. 100% attention on your learning, your doubts.',
      },
      {
        icon: 'fast-forward',
        question: 'Class moving too fast or too slow?',
        solution: 'Pace customized to you. Fast-track what you know, deep-dive where needed.',
      },
      {
        icon: 'help-circle',
        question: 'Shy to ask doubts in group?',
        solution: 'Private sessions = no hesitation. Ask anything, anytime during your class.',
      },
      {
        icon: 'target',
        question: 'Generic teaching not addressing your gaps?',
        solution: 'Curriculum designed around YOUR weak areas. Targeted improvement.',
      },
    ],
  },

  benefits: {
    title: '1-on-1 Advantages',
    subtitle: 'The ultimate personalized learning experience',
    items: [
      {
        icon: 'user',
        title: '100% Individual Attention',
        description: 'No sharing teacher time. Every minute focused on your learning.',
      },
      {
        icon: 'sliders',
        title: 'Customized Curriculum',
        description: 'Study plan based on your diagnostic. Focus where you need most.',
      },
      {
        icon: 'clock',
        title: 'Flexible Scheduling',
        description: 'Classes at your convenient time. Reschedule when needed.',
      },
      {
        icon: 'zap',
        title: 'Faster Progress',
        description: 'No waiting for others. Cover syllabus at optimal pace for you.',
      },
      {
        icon: 'message-circle',
        title: 'Unlimited Doubt Solving',
        description: 'Ask as many questions as you need. No time limit on understanding.',
      },
      {
        icon: 'trending-up',
        title: 'Maximum Improvement',
        description: 'Students report 50-100+ marks improvement with 1-on-1 coaching.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is included in 1-on-1 NEET biology tuition?',
      answer:
        'Personalized package: Diagnostic assessment, customized study plan, 1-on-1 live online sessions (2-3/week), personal doubt solving, customized tests, progress tracking, and direct mentor access. Everything tailored to your needs.',
    },
    {
      question: 'Who teaches 1-on-1 sessions?',
      answer:
        'Senior faculty members with 5+ years NEET experience. For premium package, Dr. Shekhar personally conducts some sessions. All teachers are vetted for 1-on-1 effectiveness - teaching one student is different from batch teaching.',
    },
    {
      question: 'How many hours per week is 1-on-1 tuition?',
      answer:
        'Flexible based on your needs: Standard (4 hours/week), Intensive (6 hours/week), or Custom. We recommend 4-6 hours of 1-on-1 plus self-study. Quality over quantity - focused sessions are more effective than long ones.',
    },
    {
      question: 'Is 1-on-1 tuition worth the extra cost?',
      answer:
        'For students who need personalized attention - absolutely. 1-on-1 students typically improve 50-100+ marks more than batch students. If your gaps are specific or you learn better individually, the investment pays off in results.',
    },
    {
      question: 'Can I combine 1-on-1 with batch classes?',
      answer:
        'Yes! Many students take batch classes for regular coverage and add 1-on-1 for weak areas. This hybrid approach is cost-effective while getting personalized help where needed. We recommend based on your assessment.',
    },
    {
      question: 'What is the fee for 1-on-1 biology tuition online?',
      answer:
        '1-on-1 tuition: ₹1,500-3,000 per hour depending on teacher level. Monthly packages available at better rates. Premium package with Dr. Shekhar involvement: ₹2,50,000/year. Contact us for customized quote based on your needs.',
    },
  ],

  cta: {
    title: 'Get Personal Attention for Your NEET Journey',
    subtitle: 'Limited 1-on-1 slots available. Book consultation now.',
    primaryButton: {
      text: 'Enquire About 1-on-1',
      link: '/contact?topic=1-on-1-tuition',
    },
    secondaryButton: {
      text: 'Book Free Assessment',
      link: '/book-demo?type=1-on-1-assessment',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: '1-on-1 NEET Biology Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Personalized 1-on-1 online biology tuition for NEET with customized curriculum and maximum individual attention.',
    duration: 'P1Y',
    price: 150000,
    priceCurrency: 'INR',
  },
}

// Page 5: /live-biology-classes-neet/
export const liveBiologyClassesNeet: SEOLandingContent = {
  ...universalBaseContent,
  slug: 'live-biology-classes-neet',

  title: 'Live Biology Classes for NEET | Interactive Online Coaching',
  metaDescription:
    'Join live interactive biology classes for NEET. Real-time teaching, instant doubt solving, engaging format. Expert AIIMS faculty. Enroll in live batches!',
  keywords: [
    'live biology classes NEET',
    'online biology classes with doubt solving',
    'live NEET biology coaching',
    'interactive biology classes online',
    'real-time NEET biology classes',
  ],

  hero: {
    headline: 'Live Classes That Actually Feel Live',
    subheadline:
      'Not pre-recorded videos. Real teachers, real interaction, real-time doubt solving. The online classes that work.',
    highlightedText: 'Because Biology Needs Discussion, Not Just Lectures',
    ctaText: 'Join Live Classes',
    ctaLink: '/courses',
    backgroundGradient: 'from-cyan-900 via-blue-900 to-indigo-900',
  },

  painPoints: {
    title: 'Why Live Classes Beat Recorded Videos',
    points: [
      {
        icon: 'video-off',
        question: 'Bored of watching pre-recorded videos?',
        solution: 'Live classes with real interaction. Ask questions, participate, stay engaged.',
      },
      {
        icon: 'help-circle',
        question: 'Doubts pile up while watching recordings?',
        solution: "Instant doubt solving in live classes. Question answered before it's forgotten.",
      },
      {
        icon: 'calendar-x',
        question: 'No discipline with self-paced courses?',
        solution: 'Scheduled live classes create routine. Consistency leads to results.',
      },
      {
        icon: 'users',
        question: 'Miss the classroom energy?',
        solution: 'Batch interaction, polls, discussions. Online but feels like classroom.',
      },
    ],
  },

  benefits: {
    title: 'The Live Class Experience',
    subtitle: 'What makes our live classes engaging',
    items: [
      {
        icon: 'play-circle',
        title: 'Real-Time Teaching',
        description:
          'Teachers present live. See them draw diagrams, explain concepts in real-time.',
      },
      {
        icon: 'message-square',
        title: 'Instant Interaction',
        description: 'Ask questions via audio or chat. Get answers immediately, not later.',
      },
      {
        icon: 'activity',
        title: 'Engaging Elements',
        description:
          'Polls, quizzes, discussions break the monotony. Active learning, not passive watching.',
      },
      {
        icon: 'users',
        title: 'Batch Community',
        description: 'Learn with peers. Healthy competition and mutual motivation.',
      },
      {
        icon: 'repeat',
        title: 'Recordings Available',
        description: 'Miss a class? No problem. All live classes are recorded for later viewing.',
      },
      {
        icon: 'calendar',
        title: 'Structured Schedule',
        description: 'Fixed timings create discipline. Know exactly when to study what.',
      },
    ],
  },

  faqs: [
    {
      question: 'How do live biology classes for NEET work?',
      answer:
        'Classes conducted on Zoom/Google Meet at scheduled times. Teacher shares screen with whiteboard, diagrams, and presentations. Students can ask questions via audio (unmuting) or chat. Polls and quizzes keep engagement high. All sessions recorded.',
    },
    {
      question: 'Are live classes really better than recorded courses?',
      answer:
        'For most students, yes. Live classes offer: scheduled discipline, instant doubt solving, peer interaction, and higher engagement. Studies show live class students have 40% better retention than video-only learners. You also get recordings as backup!',
    },
    {
      question: 'What if I miss a live class?',
      answer:
        'All live classes are recorded and available within 4 hours. You can watch at your convenience. However, we track attendance and encourage live participation - the interaction is what makes live classes effective.',
    },
    {
      question: 'How interactive are the live biology classes?',
      answer:
        'Very interactive! We use: real-time Q&A (audio + chat), polls every 15 minutes, quick quizzes, breakout discussions for complex topics, and live annotation of diagrams. With 10-12 students per batch, everyone participates.',
    },
    {
      question: 'What timings are live classes offered?',
      answer:
        'Multiple batch timings: Morning (6-8 AM), Afternoon (4-6 PM), Evening (7-9 PM). Weekend batches available. Choose the slot that fits your schedule. You can switch timing with notice if needed.',
    },
    {
      question: 'What technology do I need for live classes?',
      answer:
        'Any device with internet: laptop, tablet, or smartphone (laptop recommended for better viewing). Stable internet (5+ Mbps), headphones for clear audio. Webcam optional but recommended for full engagement.',
    },
  ],

  cta: {
    title: 'Experience Real Online Learning',
    subtitle: 'Book a free trial live class. Feel the difference.',
    primaryButton: {
      text: 'View Live Class Schedule',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Attend Free Trial Class',
      link: '/book-demo?type=live-trial',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Live Biology Classes for NEET',
    provider: 'Cerebrum Biology Academy',
    description:
      'Interactive live online biology classes for NEET with real-time teaching and instant doubt solving.',
    duration: 'P1Y',
    price: 75000,
    priceCurrency: 'INR',
  },
}

// Page 6: /private-school-biology-tuition/
export const privateSchoolBiologyTuition: SEOLandingContent = {
  ...universalBaseContent,
  slug: 'private-school-biology-tuition',

  title: 'Private School Biology Tuition | Elite School NEET Coaching',
  metaDescription:
    "Premium biology tuition for students from India's top private schools - DPS, Modern School, Shri Ram, Sanskriti, Heritage. Bridge IB/IGCSE to NEET. Expert AIIMS faculty.",
  keywords: [
    'private school biology tuition',
    'elite school NEET coaching',
    'DPS biology tuition',
    'Modern School biology coaching',
    'Shri Ram School NEET',
    'international school biology coaching',
    'IB to NEET biology',
    'IGCSE to NEET transition',
    'premium biology tuition India',
    'top school biology coaching',
  ],

  hero: {
    headline: 'Elite Biology Coaching for Top Private Schools',
    subheadline:
      "Specialized NEET Biology preparation designed for students from India's premier private and international schools. Bridge the gap between school curriculum and NEET.",
    highlightedText: 'DPS • Modern • Shri Ram • Sanskriti • Heritage',
    ctaText: 'View Premium Courses',
    ctaLink: '/courses',
    backgroundGradient: 'from-slate-900 to-purple-900',
  },

  painPoints: {
    title: 'Why Private School Students Need Specialized NEET Coaching',
    points: [
      {
        icon: 'book-open',
        question: 'IB/IGCSE curriculum not aligned with NEET?',
        solution:
          'Our specialized curriculum bridges international syllabi (IB HL, IGCSE, Cambridge) with NCERT requirements. We map your existing knowledge to NEET topics.',
      },
      {
        icon: 'target',
        question: 'School focuses on conceptual learning, not MCQ practice?',
        solution:
          'Private schools build strong concepts but lack NEET-specific MCQ training. We add exam strategy while preserving your conceptual advantage.',
      },
      {
        icon: 'clock',
        question: 'Heavy school schedule leaves little time?',
        solution:
          "Flexible timings for students with demanding academic calendars. Weekend intensives and late evening batches designed for elite schools' schedules.",
      },
      {
        icon: 'users',
        question: 'Regular coaching too basic after advanced school curriculum?',
        solution:
          "Our premium batches maintain intellectual rigor. No dumbing down - we build on your school's strong foundation.",
      },
    ],
  },

  benefits: {
    title: 'The Premium Advantage',
    subtitle: 'Why elite school toppers choose Cerebrum',
    items: [
      {
        icon: 'award',
        title: 'IB/IGCSE Bridge Program',
        description:
          'Specialized modules for IB Biology HL, IGCSE students. We know exactly what gaps to fill for NEET success.',
      },
      {
        icon: 'user-check',
        title: 'AIIMS Faculty with Global Exposure',
        description:
          'Dr. Shekhar and team understand both Indian and international curricula. Teaching style suits private school learners.',
      },
      {
        icon: 'briefcase',
        title: 'School Coordinator Support',
        description:
          'We work with your school schedule. Coordination with school counselors for integrated preparation.',
      },
      {
        icon: 'zap',
        title: 'Accelerated Learning',
        description:
          'Private school students often learn faster. Our premium batches maintain challenging pace without repeating basics.',
      },
      {
        icon: 'users',
        title: 'Peer Group of Equals',
        description:
          'Study with similarly bright students from top schools. Maintain healthy competition and collaboration.',
      },
      {
        icon: 'globe',
        title: 'Beyond NEET Options',
        description:
          'Guidance for UK medicine (UCAT/BMAT), US pre-med, Singapore opportunities alongside NEET prep.',
      },
    ],
  },

  stats: [
    { value: '500+', label: 'Elite School Students', icon: 'users' },
    { value: '92%', label: 'Private School Success Rate', icon: 'trophy' },
    { value: '50+', label: 'Partner Schools', icon: 'building' },
    { value: '15+', label: 'Years Experience', icon: 'clock' },
  ],

  testimonials: [
    {
      name: 'Arjun Mehta',
      achievement: 'DPS RK Puram → AIIMS Delhi',
      quote:
        "Coming from IB Biology HL, I needed coaching that wouldn't bore me with basics but fill NEET gaps. Cerebrum understood exactly what I needed. Now at AIIMS!",
      score: '345/360 Biology',
    },
    {
      name: 'Ishita Khanna',
      achievement: 'Shri Ram School → MAMC Delhi',
      quote:
        'My school gave me great concepts but zero NEET practice. Cerebrum bridged that gap perfectly while respecting my time constraints.',
      score: '338/360 Biology',
    },
    {
      name: 'Vikram Singh',
      achievement: 'Modern School → KGMC Lucknow',
      quote:
        "Elite school coaching is different - they don't treat you like you know nothing. Finally found coaching that matched my school's intellectual level.",
      score: '330/360 Biology',
    },
  ],

  faqs: [
    {
      question: 'Is the coaching suitable for IB Biology HL students?',
      answer:
        'Absolutely! We have a specialized IB-to-NEET bridge program. IB HL covers many NEET topics deeply (genetics, ecology) but misses others (Indian-specific flora/fauna, certain NCERT specifics). We identify your gaps and focus only on what you need. Most IB students need 6-8 months of targeted prep.',
    },
    {
      question: 'How does IGCSE Biology preparation differ from NEET?',
      answer:
        "IGCSE provides excellent conceptual foundation but NEET requires: 1) Deeper coverage of certain topics (human physiology, plant biology), 2) NCERT-specific terminology, 3) MCQ solving strategy. We've trained 200+ IGCSE students and know exactly where to focus.",
    },
    {
      question: 'Can coaching be scheduled around heavy school commitments?',
      answer:
        'Yes! We offer flexible scheduling specifically for private school students: Sunday intensive batches, late evening slots (8-10 PM), recorded sessions for busy weeks, and exam-break intensives. We coordinate with school calendars for optimal scheduling.',
    },
    {
      question: 'My school already prepares for SAT/AP. How do you coordinate?',
      answer:
        "Our premium batches consider students pursuing multiple exams. AP Biology overlaps 60% with NEET content, so we leverage that. For SAT Subject Test takers, we ensure timing doesn't clash. Many of our students have successfully balanced SAT/AP with NEET prep.",
    },
    {
      question: "Do you work with school counselors for students' schedules?",
      answer:
        'Yes, for partnered schools (DPS, Modern, Shri Ram, etc.), we coordinate directly with school counselors. We provide progress reports if needed and adjust coaching intensity during school exams. Your school and coaching work as partners, not competitors.',
    },
    {
      question: "What if I'm considering medicine abroad along with NEET?",
      answer:
        'We support dual-track preparation. Many elite school students explore UK (UCAT/BMAT required) or Singapore options alongside NEET. Our biology prep builds foundation for all. We provide separate guidance sessions for international medicine pathways.',
    },
  ],

  cta: {
    title: 'Premium Coaching for Premium Aspirations',
    subtitle:
      'Join elite school students who chose quality over quantity. Limited seats in premium batches.',
    primaryButton: {
      text: 'View Premium Courses',
      link: '/courses',
    },
    secondaryButton: {
      text: 'Book Counseling Session',
      link: '/book-demo?type=elite-counseling',
    },
  },

  courseSummary: {
    title: 'Elite School NEET Biology Program',
    duration: '1 Year Comprehensive',
    batchSize: '8-10 Students (Premium Small Batch)',
    features: [
      'IB/IGCSE to NEET bridge curriculum',
      'Flexible scheduling for school students',
      'Premium small batches (8-10 max)',
      'AIIMS faculty with international exposure',
      'School coordinator support',
      'Dual-track guidance (NEET + abroad)',
    ],
    price: {
      original: 95000,
      discounted: 85000,
      emi: '₹4,000/month',
    },
  },

  relatedPages: [
    { title: 'IB Biology to NEET', link: '/ib-biology-tutor' },
    { title: 'IGCSE Biology Coaching', link: '/igcse-biology-tuition' },
    { title: 'Class 11 NEET Course', link: '/class-11' },
    { title: 'Class 12 NEET Course', link: '/class-12' },
  ],

  schema: {
    '@type': 'Course',
    courseName: 'Elite School NEET Biology Program',
    provider: 'Cerebrum Biology Academy',
    description:
      "Specialized NEET Biology coaching for students from India's top private schools including DPS, Modern School, Shri Ram, and international curriculum schools.",
    duration: 'P1Y',
    price: 85000,
    priceCurrency: 'INR',
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 487,
      bestRating: 5,
      worstRating: 1,
    },
    coursePrerequisites: 'Class 11 or 12 science stream from private/international school',
    educationalLevel: 'Intermediate',
    numberOfLessons: 200,
  },
}

// Export all Universal content
export const universalSEOPages = {
  onlineBiologyTuitionIndia,
  neetBiologyOnlineCoaching,
  bestBiologyTeacherNeet,
  oneOnOneBiologyTuitionNeet,
  liveBiologyClassesNeet,
  privateSchoolBiologyTuition,
}
