import { SEOLandingContent } from './types'

// Base content for Class 9 pages - Foundation/Early start focus
const class9BaseContent = {
  classLevel: 'class-9' as const,
  stats: [
    { value: '95%', label: 'Foundation Success', icon: 'trophy' },
    { value: '4.9/5', label: 'Parent Rating', icon: 'star' },
    { value: '500+', label: 'Students Enrolled', icon: 'users' },
    { value: '3 Years', label: 'NEET Advantage', icon: 'clock' },
  ],
  testimonials: [
    {
      name: "Ankit's Parent (Mrs. Sharma)",
      achievement: 'Parent of Class 9 Student',
      quote:
        'Starting NEET foundation in Class 9 was the best decision. Ankit is now confident in biology and excited about becoming a doctor!',
      score: 'Top 5 in batch',
    },
    {
      name: 'Neha Gupta',
      achievement: 'Currently in Class 11 | Strong Foundation',
      quote:
        "I joined Cerebrum in Class 9. Now in Class 11, I'm way ahead of my peers who started late. Best early investment!",
      score: 'School Topper',
    },
    {
      name: "Rohan's Father (Mr. Patel)",
      achievement: 'Parent of NEET Aspirant',
      quote:
        "Dr. Shekhar's foundation course built such strong basics that Rohan now finds Class 11 biology easy.",
      score: '95% in exams',
    },
  ],
  courseSummary: {
    title: 'Class 9 Biology Foundation Course',
    duration: '1 Year (April - March)',
    batchSize: '12-15 Students',
    features: [
      'Live online classes 3 days/week',
      'NCERT + NEET foundation concepts',
      'Science olympiad preparation included',
      'Monthly progress reports to parents',
      'Doubt solving on WhatsApp',
      'Fun experiments and projects',
    ],
    price: {
      original: 35000,
      discounted: 28000,
      emi: '₹2,500/month',
    },
  },
  relatedPages: [
    { title: 'Class 10 Foundation', link: '/courses/class-10-foundation' },
    { title: 'Class 11 NEET Course', link: '/class-11' },
    { title: 'Complete 4-Year NEET Program', link: '/courses/neet-complete' },
    { title: 'Parent Testimonials', link: '/success-stories' },
  ],
}

// Page 1: /class-9-biology-tuition-online/
export const class9BiologyTuitionOnline: SEOLandingContent = {
  ...class9BaseContent,
  slug: 'class-9-biology-tuition-online',

  title: 'Class 9 Biology Tuition Online | NEET Foundation Course',
  metaDescription:
    'Best online biology tuition for Class 9. Build NEET foundation early with expert faculty. Live interactive classes, small batches, fun learning. Enroll now!',
  keywords: [
    'class 9 biology tuition online',
    'biology tuition for class 9 CBSE',
    'online biology tuition class 9',
    'class 9 online biology coaching',
    'biology tutor for class 9 online',
  ],

  hero: {
    headline: 'Give Your Child a 3-Year NEET Advantage',
    subheadline:
      'Online biology tuition for Class 9 that builds the foundation for NEET success. Start early, stress less later.',
    highlightedText: 'Smart Parents Start Their Kids Early',
    ctaText: 'View Foundation Course',
    ctaLink: '/courses/class-9-foundation',
    backgroundGradient: 'from-green-900 via-emerald-900 to-teal-900',
  },

  painPoints: {
    title: 'Why Start Biology Tuition in Class 9?',
    points: [
      {
        icon: 'clock',
        question: 'Worried about Class 11-12 NEET pressure?',
        solution:
          'Start now, build basics. Your child will find Class 11 biology easy while others struggle.',
      },
      {
        icon: 'book-open',
        question: 'School biology teaching not enough?',
        solution:
          'We go beyond school syllabus with NEET-oriented concepts, without overwhelming your child.',
      },
      {
        icon: 'users',
        question: 'Child losing interest in science?',
        solution: 'Our engaging teaching with animations and experiments makes biology exciting!',
      },
      {
        icon: 'target',
        question: 'Not sure if online tuition works for young students?',
        solution:
          'Our interactive format with quizzes and games keeps Class 9 students engaged and learning.',
      },
    ],
  },

  benefits: {
    title: 'Why Cerebrum for Class 9 Biology',
    subtitle: 'Building future doctors from an early age',
    items: [
      {
        icon: 'play-circle',
        title: 'Engaging Online Classes',
        description:
          'Live classes with animations, videos, and interactive quizzes. Learning feels like fun!',
      },
      {
        icon: 'user-check',
        title: 'Expert Faculty',
        description: 'AIIMS-trained teachers who know how to teach young minds effectively.',
      },
      {
        icon: 'book',
        title: 'NCERT + NEET Foundation',
        description: 'Cover school syllabus perfectly while building competitive exam foundation.',
      },
      {
        icon: 'award',
        title: 'Olympiad Preparation',
        description: 'NSO, IMO preparation included. Win medals while learning biology!',
      },
      {
        icon: 'bar-chart',
        title: 'Parent Updates',
        description: 'Monthly progress reports and parent-teacher meetings keep you informed.',
      },
      {
        icon: 'smile',
        title: 'No Pressure Learning',
        description:
          "Foundation building without exam stress. Conceptual learning at child's pace.",
      },
    ],
  },

  faqs: [
    {
      question: 'Is Class 9 too early to start NEET preparation?',
      answer:
        "Not NEET preparation, but NEET foundation. We don't overburden Class 9 students with NEET syllabus. Instead, we build strong biology basics, develop scientific thinking, and create interest in the subject. This foundation makes Class 11-12 NEET prep much easier.",
    },
    {
      question: 'How many hours per week is the Class 9 biology tuition?',
      answer:
        'Just 3 live sessions per week (1.5 hours each = 4.5 hours/week). This is enough for foundation building without overwhelming school schedule. Weekend homework takes about 1-2 hours. The pace is comfortable for young students.',
    },
    {
      question: 'Will online tuition work for my Class 9 child?',
      answer:
        'Yes! Our online format is designed for this age group. Short attention-span modules, interactive elements, games, and quizzes keep students engaged. Parents often sit in initially and are impressed by how well children participate.',
    },
    {
      question: 'What is covered in Class 9 biology foundation?',
      answer:
        'We cover: NCERT Class 9 biology completely, introduction to Class 10 concepts, basic human body systems with NEET orientation, science olympiad topics, and nature of scientific inquiry. The syllabus is designed for gradual progression.',
    },
    {
      question: 'How is this different from school tuition?',
      answer:
        'School tuition focuses on exam marks. Our foundation course builds conceptual understanding, develops scientific thinking, introduces NEET-style questions early, and creates genuine interest in biology. Many students find they start loving the subject!',
    },
    {
      question: 'What is the fee for Class 9 biology online tuition?',
      answer:
        'Our Class 9 biology tuition is ₹28,000/year (original ₹35,000). This includes live classes, study material, olympiad prep, and parent support. EMI at ₹2,500/month available. Very affordable for the quality and long-term benefits.',
    },
  ],

  cta: {
    title: "Start Your Child's Medical Journey Early",
    subtitle: 'The earlier they start, the easier the path. Book a free demo today.',
    primaryButton: {
      text: 'View Foundation Course',
      link: '/courses/class-9-foundation',
    },
    secondaryButton: {
      text: 'Book Free Demo Class',
      link: '/book-demo?class=class-9',
    },
  },

  schema: {
    courseName: 'Class 9 Biology Online Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Online biology tuition for Class 9 students building NEET foundation with engaging, interactive learning.',
    duration: 'P1Y',
    price: 28000,
    priceCurrency: 'INR',
  },
}

// Page 2: /neet-foundation-class-9/
export const neetFoundationClass9: SEOLandingContent = {
  ...class9BaseContent,
  slug: 'neet-foundation-class-9',

  title: 'NEET Foundation Class 9 | Early Start Online Course',
  metaDescription:
    'NEET foundation course for Class 9 online. Start early, stress less in Class 11-12. Expert faculty, engaging content, proven methodology. Limited seats!',
  keywords: [
    'NEET foundation class 9',
    'class 9 foundation course for NEET',
    'NEET preparation class 9 online',
    'early NEET foundation online',
    'class 9 pre-NEET course online',
  ],

  hero: {
    headline: 'NEET Foundation: Start in Class 9',
    subheadline:
      '3 extra years of preparation. While others struggle in Class 11, your child will cruise through NEET concepts.',
    highlightedText: 'Winners Start Before the Race Begins',
    ctaText: 'Explore Foundation Program',
    ctaLink: '/courses/class-9-foundation',
    backgroundGradient: 'from-blue-900 via-indigo-900 to-purple-900',
  },

  painPoints: {
    title: 'Why Early NEET Foundation Matters',
    points: [
      {
        icon: 'trending-up',
        question: 'Seen the NEET competition statistics?',
        solution: '20 lakh students for 1 lakh seats. Early starters have a significant advantage.',
      },
      {
        icon: 'layers',
        question: 'Worried about Class 11-12 syllabus load?',
        solution: 'Build basics now. Class 11-12 becomes about depth, not learning from scratch.',
      },
      {
        icon: 'zap',
        question: 'Want your child to be a topper, not just pass?',
        solution: "Toppers don't start in Class 12. They build foundations years before.",
      },
      {
        icon: 'heart',
        question: "Want to reduce your child's future stress?",
        solution: 'Gradual, enjoyable learning now = Less pressure and better results later.',
      },
    ],
  },

  benefits: {
    title: 'The 4-Year NEET Journey',
    subtitle: 'How early starters outperform everyone',
    items: [
      {
        icon: 'flag',
        title: 'Class 9: Foundation',
        description:
          'Build basics, develop interest, understand biological thinking. No pressure, all curiosity.',
      },
      {
        icon: 'book-open',
        title: 'Class 10: Strengthening',
        description: 'Deeper concepts, board excellence, introduction to competitive patterns.',
      },
      {
        icon: 'trending-up',
        title: 'Class 11: Head Start',
        description: 'While others struggle with basics, your child dives into advanced NEET prep.',
      },
      {
        icon: 'award',
        title: 'Class 12: Perfection',
        description: 'Focus only on practice and strategy. Concepts already mastered over 3 years.',
      },
      {
        icon: 'star',
        title: 'NEET: Victory',
        description: 'Walk in with unshakeable confidence. Score 650+ while others score 500.',
      },
      {
        icon: 'check-circle',
        title: 'Result: AIIMS/Top College',
        description:
          "The early investment pays off with admission to India's best medical colleges.",
      },
    ],
  },

  faqs: [
    {
      question: 'What is NEET foundation for Class 9?',
      answer:
        'NEET foundation is pre-NEET preparation that builds the conceptual base needed for competitive exams. For Class 9, it means: learning biology deeply (not just for school exams), developing scientific thinking, understanding question patterns, and creating genuine interest in the subject.',
    },
    {
      question: 'Will this overburden my Class 9 child?',
      answer:
        'Absolutely not! Our foundation course is designed to be enjoyable, not stressful. Just 4-5 hours/week including homework. The content is engaging with animations and experiments. Most students find it more interesting than school classes.',
    },
    {
      question: 'How is NEET foundation different from regular biology tuition?',
      answer:
        'Regular tuition focuses on school exams. NEET foundation builds: conceptual depth, application skills, competitive thinking, and subject love. We cover school syllabus but with a forward-looking approach that prepares for competitive exams.',
    },
    {
      question: 'Is online NEET foundation effective for Class 9?',
      answer:
        "Very effective! Online format offers: access to the best teachers regardless of location, recorded sessions for revision, interactive learning tools, and flexible scheduling. Our students' performance proves online works excellently for this age.",
    },
    {
      question: "What if my child doesn't want to become a doctor later?",
      answer:
        'The foundation is valuable regardless! Strong biology basics help in: any science career, engineering biotech streams, pharmacy, nursing, and general scientific thinking. Even if plans change, the learning is never wasted.',
    },
    {
      question: 'How to enroll in Class 9 NEET foundation online?',
      answer:
        'Book a free demo class first. If your child enjoys it, you can enroll for the year. Fee is ₹28,000/year with EMI options. We start new batches in April and July. Limited seats per batch ensures personal attention.',
    },
  ],

  cta: {
    title: 'Give Your Child the Head Start',
    subtitle: "Limited seats in foundation batch. Enroll before they're full.",
    primaryButton: {
      text: 'View Foundation Course',
      link: '/courses/class-9-foundation',
    },
    secondaryButton: {
      text: 'Talk to Academic Counselor',
      link: '/contact?topic=class-9-foundation',
    },
  },

  schema: {
    courseName: 'NEET Foundation Class 9',
    provider: 'Cerebrum Biology Academy',
    description:
      'NEET foundation course for Class 9 students starting their medical journey early with online expert coaching.',
    duration: 'P1Y',
    price: 28000,
    priceCurrency: 'INR',
  },
}

// Page 3: /online-biology-classes-class-9/
export const onlineBiologyClassesClass9: SEOLandingContent = {
  ...class9BaseContent,
  slug: 'online-biology-classes-class-9',

  title: 'Online Biology Classes for Class 9 | Live Expert Teaching',
  metaDescription:
    'Join live online biology classes for Class 9. Expert teachers, interactive learning, CBSE aligned curriculum. Build strong foundation. Enroll today!',
  keywords: [
    'online biology classes class 9',
    'biology classes for class 9 online',
    'live biology classes class 9',
    'class 9 biology online coaching',
    'class 9 science tuition online',
  ],

  hero: {
    headline: 'Biology Classes That Make Learning Fun',
    subheadline:
      'Live online classes for Class 9 where biology comes alive with animations, experiments, and expert teaching.',
    highlightedText: 'Watch Your Child Fall in Love with Biology',
    ctaText: 'See Sample Class',
    ctaLink: '/free-resources?type=class-9-sample',
    backgroundGradient: 'from-cyan-900 via-teal-900 to-green-900',
  },

  painPoints: {
    title: 'Why Online Biology Classes Work',
    points: [
      {
        icon: 'video',
        question: 'Child bored of textbook-only teaching?',
        solution: '3D animations, virtual labs, and interactive content make every class exciting!',
      },
      {
        icon: 'map-pin',
        question: 'No good biology teachers in your area?',
        solution: "Access India's best teachers online. Geography is no longer a barrier.",
      },
      {
        icon: 'users',
        question: 'Child too shy to ask questions in school?',
        solution: 'Small online batches create safe space. Every question gets answered.',
      },
      {
        icon: 'smartphone',
        question: 'Worried about screen time for online classes?',
        solution: 'We limit to 90-minute sessions with breaks. Quality over quantity.',
      },
    ],
  },

  benefits: {
    title: 'How Our Online Classes Work',
    subtitle: 'Designed specifically for Class 9 students',
    items: [
      {
        icon: 'play-circle',
        title: 'Live Interactive Sessions',
        description: '90-minute classes with breaks. Mix of teaching, questions, and activities.',
      },
      {
        icon: 'film',
        title: '3D Animations',
        description: 'Complex concepts visualized. Cell structure, body systems - all animated.',
      },
      {
        icon: 'beaker',
        title: 'Virtual Lab Activities',
        description: "Experiments you can't do at school. Safe, engaging, memorable.",
      },
      {
        icon: 'message-square',
        title: 'Doubt Solving',
        description: 'Ask questions during class. Additional doubt sessions weekly.',
      },
      {
        icon: 'file-text',
        title: 'Digital Notes',
        description: 'Beautiful illustrated notes. Print or study on screen.',
      },
      {
        icon: 'award',
        title: 'Gamified Learning',
        description: 'Points, badges, leaderboards. Learning becomes a game they want to win.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is the schedule for Class 9 online biology classes?',
      answer:
        'Classes run 3 days a week (Mon/Wed/Fri or Tue/Thu/Sat), 90 minutes per session. Evening batches (5-6:30 PM or 7-8:30 PM) to not clash with school. Weekend doubt sessions. Total 5-6 hours/week including self-study.',
    },
    {
      question: 'What devices are needed for online biology classes?',
      answer:
        'Any device works - laptop, tablet, or smartphone with a decent screen. Laptop or tablet is recommended for better viewing of diagrams. Stable internet (5 Mbps minimum) required. Headphones recommended for clear audio.',
    },
    {
      question: 'How do you keep Class 9 students engaged online?',
      answer:
        'Our classes include: polls and quizzes every 15 minutes, interactive diagrams students can manipulate, breakout activities, gamified points system, and variety of teaching methods. Students stay engaged because classes are genuinely interesting!',
    },
    {
      question: 'What topics are covered in Class 9 biology classes?',
      answer:
        'Complete CBSE Class 9 Biology (Cell, Tissues, Diversity, etc.) plus foundation topics for NEET like basic body systems, evolution concepts, and scientific method. Olympiad topics included for interested students.',
    },
    {
      question: 'Are there tests in Class 9 biology classes?',
      answer:
        'Yes, but fun ones! Weekly mini-quizzes (10 min, gamified), monthly chapter tests, and term assessments. The focus is on learning, not exam stress. Parents get progress reports after each assessment.',
    },
    {
      question: 'Can parents attend the online biology classes?',
      answer:
        'Parents are welcome to sit in the first few classes to see the quality. After that, we encourage independent learning with parent access to recordings and progress reports. Monthly parent-teacher interactions are scheduled.',
    },
  ],

  cta: {
    title: 'Classes Your Child Will Actually Enjoy',
    subtitle: "Book a free trial class. See the excitement on your child's face.",
    primaryButton: {
      text: 'View Class Schedule',
      link: '/courses/class-9-foundation',
    },
    secondaryButton: {
      text: 'Book Free Trial Class',
      link: '/book-demo?class=class-9',
    },
  },

  schema: {
    courseName: 'Online Biology Classes Class 9',
    provider: 'Cerebrum Biology Academy',
    description:
      'Live online biology classes for Class 9 with interactive learning, animations, and expert teaching.',
    duration: 'P1Y',
    price: 28000,
    priceCurrency: 'INR',
  },
}

// Page 4: /class-9-science-tuition-neet/
export const class9ScienceTuitionNeet: SEOLandingContent = {
  ...class9BaseContent,
  slug: 'class-9-science-tuition-neet',

  title: 'Class 9 Science Tuition for NEET | Pre-Medical Foundation Online',
  metaDescription:
    'Pre-NEET science tuition for Class 9 online. Biology foundation with medical career focus. Expert doctors as teachers, proven methodology. Start early!',
  keywords: [
    'class 9 science tuition NEET',
    'pre-NEET foundation class 9',
    'class 9 biology tuition for medical',
    'pre-medical tuition class 9 online',
    'NEET preparation from class 9 online',
  ],

  hero: {
    headline: 'Future Doctor? Start Your Journey in Class 9',
    subheadline:
      "Pre-medical tuition for Class 9 that builds the foundation for NEET success. Your child's doctor dream starts here.",
    highlightedText: "The Doctor's Journey Begins Early",
    ctaText: 'Start The Journey',
    ctaLink: '/courses/class-9-foundation',
    backgroundGradient: 'from-red-900 via-rose-900 to-pink-900',
  },

  painPoints: {
    title: 'For Parents Who Dream Big for Their Children',
    points: [
      {
        icon: 'heart',
        question: 'Your child wants to become a doctor?',
        solution: 'Start building that dream now. We nurture interest and build foundations.',
      },
      {
        icon: 'alert-triangle',
        question: 'Worried about NEET competition getting tougher?',
        solution: 'Early preparation is the answer. 3 extra years makes a massive difference.',
      },
      {
        icon: 'dollar-sign',
        question: 'Not sure if the investment is worth it this early?',
        solution:
          "At ₹28K/year, it's the most affordable advantage you can give. Compare to Class 11 coaching costs!",
      },
      {
        icon: 'map',
        question: 'No pre-medical coaching in your city?',
        solution: "Online access to India's best pre-medical program. Location no longer matters.",
      },
    ],
  },

  benefits: {
    title: 'How We Build Future Doctors',
    subtitle: 'The Cerebrum Pre-Medical Approach for Class 9',
    items: [
      {
        icon: 'book',
        title: 'Biology Excellence',
        description:
          'Deep understanding of life sciences. The core subject for any medical aspirant.',
      },
      {
        icon: 'heart',
        title: 'Medical Interest Building',
        description: 'Cases, stories, and real medical examples. Make them excited about medicine.',
      },
      {
        icon: 'brain',
        title: 'Scientific Thinking',
        description: 'Develop the analytical mindset doctors need. Question, analyze, conclude.',
      },
      {
        icon: 'zap',
        title: 'NEET Orientation',
        description: 'Introduction to competitive exam patterns. Prepare the mind for challenges.',
      },
      {
        icon: 'users',
        title: 'Peer Community',
        description: 'Connect with other future doctors. Motivation from like-minded peers.',
      },
      {
        icon: 'trending-up',
        title: 'Progressive Learning',
        description: 'Gradual increase in difficulty. Ready for Class 10, 11, and beyond.',
      },
    ],
  },

  faqs: [
    {
      question: 'When should NEET preparation start for best results?',
      answer:
        'While Class 11 is the common starting point, students who begin foundation in Class 9 have a significant advantage. They have 4 years to prepare vs 2 years, less stress, stronger basics, and more revision time. Early starters consistently rank higher.',
    },
    {
      question: 'Will this tuition help with school science exams too?',
      answer:
        'Absolutely! We cover the complete CBSE Class 9 science syllabus for biology. The foundation approach means deeper understanding which translates to better school exam scores too. Most students become science toppers in school.',
    },
    {
      question: 'Is this only for biology or full science?',
      answer:
        'Our focus is biology (the core NEET subject), but we cover key Physics and Chemistry concepts that relate to biology. For complete PCB foundation, we have separate add-on modules. Biology alone is 50% of NEET, so starting here is smart.',
    },
    {
      question: 'What is the success rate of early starters in NEET?',
      answer:
        'Students who join our foundation in Class 9-10 and continue through Class 11-12 have an 85% success rate in NEET (scoring 500+), compared to 60% for those who join in Class 11. The early advantage is statistically significant.',
    },
    {
      question: 'How do you maintain motivation for 4 years?',
      answer:
        'Gamified learning, achievements, peer community, and visible progress keep students engaged. We celebrate milestones, have batch competitions, and create a supportive environment. Many students form study groups and friendships that last through NEET.',
    },
    {
      question: "What if my child doesn't want to be a doctor later?",
      answer:
        'The foundation is valuable for any science career - biotech, pharmacy, research, environmental science, etc. Strong biology basics help in many fields. And the study skills developed apply everywhere. No investment wasted!',
    },
  ],

  cta: {
    title: "Start Building Your Child's Medical Dream",
    subtitle: 'The earlier they start, the easier the path to AIIMS.',
    primaryButton: {
      text: 'Explore Pre-Medical Course',
      link: '/courses/class-9-foundation',
    },
    secondaryButton: {
      text: 'Talk to Counselor',
      link: '/contact?topic=pre-medical-foundation',
    },
  },

  schema: {
    courseName: 'Class 9 Pre-Medical Foundation',
    provider: 'Cerebrum Biology Academy',
    description:
      'Pre-NEET science tuition for Class 9 focusing on biology foundation for future medical aspirants.',
    duration: 'P1Y',
    price: 28000,
    priceCurrency: 'INR',
  },
}

// Export all Class 9 content
export const class9SEOPages = {
  class9BiologyTuitionOnline,
  neetFoundationClass9,
  onlineBiologyClassesClass9,
  class9ScienceTuitionNeet,
}
