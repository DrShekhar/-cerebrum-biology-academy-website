import { SEOLandingContent } from './types'

// Base content for Class 11 pages - each page will customize from this
const class11BaseContent = {
  classLevel: 'class-11' as const,
  stats: [
    { value: '98%', label: 'Success Rate', icon: 'trophy' },
    { value: '330+', label: 'Avg NEET Score', icon: 'target' },
    { value: '15,000+', label: 'Students Trained', icon: 'users' },
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
  testimonials: [
    {
      name: 'Ishita Malhotra',
      achievement: 'AIR 189 | AIIMS Delhi',
      quote:
        'NEET biology coaching at Cerebrum transformed my understanding of Botany and Zoology. Dr. Shekhar breaks down every NCERT line for NEET relevance.',
      score: '348/360',
    },
    {
      name: 'Devansh Tiwari',
      achievement: 'AIR 374 | KGMU Lucknow',
      quote:
        'The coaching methodology here is unmatched. Weekly tests and personal feedback helped me improve from 280 to 348 in biology within 8 months.',
      score: '342/360',
    },
    {
      name: 'Sanya Kapoor',
      achievement: 'AIR 621 | BHU Varanasi',
      quote:
        'Joined Cerebrum for Class 11 NEET coaching and never looked back. The small batch meant I could ask unlimited doubts without hesitation.',
      score: '330/360',
    },
  ],
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
      "Join 15,000+ successful students who scored 330+ in NEET Biology with Dr. Shekhar's proven methodology",
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
    subtitle: 'The earlier you start, the higher you score. Join 15,000+ successful students.',
    primaryButton: {
      text: 'View Course & Pricing',
      link: '/class-11',
    },
    secondaryButton: {
      text: 'Book Free Demo Class',
      link: '/book-demo?class=class-11',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Class 11 Biology Syllabus: The Backbone of NEET Success',
        body: 'Class 11 Biology is divided into five units that together contribute roughly 50% of the NEET paper. Unit 1 (Diversity in the Living World) lays the taxonomic framework students need for every subsequent chapter, covering biological classification from Monera through Animalia. Unit 2 (Structural Organisation in Animals and Plants) introduces morphology and anatomy, training students to compare organ systems across species. Unit 3 (Cell: Structure and Function) is arguably the most concept-dense section, spanning cell theory, biomolecules, the cell cycle, and enzyme kinetics. Units 4 and 5 address Plant Physiology and Human Physiology respectively, where transport mechanisms, photosynthesis, respiration, and neural control form recurring NEET themes. A coaching program that treats these five units as an integrated story rather than isolated chapters gives students the conceptual map they need to tackle application-based MCQs confidently.',
      },
      {
        heading: 'Why Plant Kingdom and Animal Kingdom Deserve Extra Attention',
        body: 'Among the most question-rich chapters in NEET Biology are Plant Kingdom and Animal Kingdom. These chapters demand not just rote recall of phyla and divisions but genuine understanding of evolutionary relationships. Students must recognise diagnostic features of algae versus bryophytes, differentiate between coelomate and pseudocoelomate body plans, and trace the progression from chordates to mammals. Effective coaching employs mnemonic strategies alongside phylogenetic diagrams so that learners retain the comparative tables NCERT provides. In recent NEET papers, examiners have shifted toward assertion-reason and matching-type questions drawn directly from these classification chapters. Building fluency here during Class 11 prevents the last-minute panic that derails many aspirants in their final revision month.',
      },
      {
        heading: 'Cell Biology and Biomolecules: Conceptual Foundations That Recur Across Units',
        body: 'Cell Biology is a thread that runs through nearly every NEET topic. Understanding membrane transport in Class 11 directly supports comprehension of renal physiology and synaptic transmission. Biomolecules such as carbohydrates, proteins, lipids, and nucleic acids reappear in genetics, biotechnology, and ecology. Students who master the lock-and-key model of enzyme action, the fluid mosaic model of the plasma membrane, and the stages of mitosis and meiosis during Class 11 find Class 12 chapters on molecular biology and inheritance far more accessible. Coaching that emphasises diagram-based learning for organelle structure, flowcharts for metabolic pathways, and NCERT exemplar-level practice questions builds the depth required for a 320-plus biology score in NEET.',
      },
    ],
    comparisonTable: [
      { Aspect: 'Syllabus Weight in NEET', 'Class 11': '~50% of Biology questions', 'Class 12': '~50% of Biology questions' },
      { Aspect: 'Key High-Yield Units', 'Class 11': 'Human Physiology, Cell Biology', 'Class 12': 'Genetics, Ecology' },
      { Aspect: 'Difficulty Level', 'Class 11': 'Concept-heavy, visual diagrams', 'Class 12': 'Application-heavy, data interpretation' },
      { Aspect: 'Study Approach', 'Class 11': 'Build strong conceptual base', 'Class 12': 'Integrate and apply across topics' },
    ],
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
  testimonials: [
    {
      name: 'Ritu Agarwal',
      achievement: 'AIR 298 | MAMC Delhi',
      quote:
        'Online biology tuition from Cerebrum gave me flexibility without compromising quality. The recorded sessions were lifesavers during revision.',
      score: '338/360',
    },
    {
      name: 'Aryan Joshi',
      achievement: 'AIR 475 | AIIMS Jodhpur',
      quote:
        'Class 11 biology tuition here covers NCERT line-by-line plus PYQs. I felt completely prepared for every NEET biology question pattern.',
      score: '332/360',
    },
    {
      name: 'Nandini Rao',
      achievement: 'AIR 710 | JIPMER Puducherry',
      quote:
        'The diagrams and mnemonics taught in Class 11 tuition stayed with me till NEET day. Scored 326 in biology with zero last-minute panic.',
      score: '326/360',
    },
  ],
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
    subtitle: "Why 15,000+ parents trust us with their child's NEET dreams",
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

  deepContent: {
    paragraphs: [
      {
        heading: 'How Online Learning Transforms Class 11 Biology Preparation',
        body: 'Online biology tuition removes the geographical barrier that has long limited students to whatever coaching centre happens to exist in their town. For Class 11 students, this means access to AIIMS-trained faculty, research-grade 3D animations of cellular processes, and digital whiteboards that can overlay diagrams in real time. Studies consistently show that students who can pause, rewind, and rewatch recorded sessions retain factual details of topics like biomolecule structures and transport across membranes significantly better than those relying on a single classroom explanation. The online model also eliminates two to three hours of daily commute, time that can be redirected toward NCERT revision or solving previous-year NEET questions. For families in tier-2 and tier-3 cities, where quality NEET faculty is scarce, online tuition has effectively levelled the playing field.',
      },
      {
        heading: 'Personalised Attention in Small Online Batches',
        body: 'One of the biggest criticisms of online education is the impersonal feel of large webinars. Cerebrum addresses this with batches of just 10 to 12 students, ensuring that every learner participates in live discussions rather than passively watching a screen. During a typical Class 11 session on, say, photosynthesis or neural coordination, each student is expected to answer at least two directed questions. This Socratic approach forces active recall, which cognitive science identifies as the most effective memorisation technique. Additionally, small batches allow the tutor to customise homework based on individual weak areas, whether a student struggles with organic chemistry linkages in biomolecules or confuses phloem loading mechanisms in plant physiology. The result is a learning trajectory that adapts to the student rather than forcing the student to adapt to a rigid syllabus delivery pace.',
      },
    ],
    checklist: [
      { item: 'Stable internet connection (5 Mbps or above)', explanation: 'Prevents buffering during live diagram demonstrations and 3D animations.' },
      { item: 'Dedicated quiet study space', explanation: 'Minimises distractions so students can focus during 2-hour interactive sessions.' },
      { item: 'Notebook for handwritten notes', explanation: 'Writing key diagrams and pathways by hand improves retention beyond typed notes.' },
      { item: 'NCERT textbook open during class', explanation: 'Allows real-time cross-referencing of concepts the tutor is explaining.' },
      { item: 'Weekly self-assessment log', explanation: 'Tracking chapters covered and weak areas helps the tutor personalise feedback.' },
    ],
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
  testimonials: [
    {
      name: 'Tanvi Mehta',
      achievement: 'AIR 412 | Lady Hardinge Medical College',
      quote:
        'Live online classes at Cerebrum felt like sitting in a personal classroom. Every concept was explained until the entire batch understood it.',
      score: '336/360',
    },
    {
      name: 'Sahil Pandey',
      achievement: 'AIR 567 | KGMU Lucknow',
      quote:
        'The interactive biology classes with quizzes after every topic kept me engaged. I never missed a single online session in Class 11.',
      score: '330/360',
    },
    {
      name: 'Meghna Iyer',
      achievement: 'AIR 834 | Government Medical College Chandigarh',
      quote:
        'Coming from a small town, online biology classes gave me access to teaching quality I could never find locally. Best decision ever.',
      score: '322/360',
    },
  ],
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
          '65+ AIIMS selections, 15,000+ successful students. Results speak for themselves.',
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

  deepContent: {
    paragraphs: [
      {
        heading: 'Live Classes vs Recorded Lectures: Why Interaction Matters for Biology',
        body: 'Biology is a subject where a single misunderstood term can cascade into confusion across multiple chapters. Consider the concept of osmotic pressure: if a student confuses it with turgor pressure during a recorded lecture, the error may persist through plant physiology, kidney function, and even ecology topics like xerophytic adaptations. Live classes solve this by enabling immediate correction. When a teacher draws the nephron on a digital whiteboard and asks a student to label the Loop of Henle, any hesitation is caught and addressed in real time. Interactive polls embedded into live sessions also provide instant feedback to the instructor about which concepts need re-explanation. This bidirectional flow of information is something recorded courses fundamentally cannot replicate, making live classes the superior choice for conceptually dense subjects like Class 11 NEET Biology.',
      },
      {
        heading: 'Interactive Tools That Bring Class 11 Biology to Life',
        body: 'Modern online biology classes leverage tools that were unavailable even five years ago. Three-dimensional models of the human heart allow students to rotate, zoom, and trace blood flow through chambers and valves, building spatial understanding that flat textbook diagrams cannot convey. Virtual dissection simulations let learners explore frog anatomy without ethical concerns, reinforcing comparative vertebrate anatomy concepts tested in NEET. Annotation tools allow both teacher and student to mark up NCERT diagrams collaboratively, highlighting the difference between xylem tracheids and vessels or between striated and smooth muscle fibres. Gamified quizzes at the end of each session convert passive listeners into active participants, with leaderboard rankings that motivate consistent effort. These technologies transform Class 11 biology from a memorisation grind into an engaging exploration of living systems.',
      },
      {
        heading: 'Building a Consistent Study Rhythm Through Scheduled Online Sessions',
        body: 'One underappreciated benefit of live online classes is the discipline they impose. Self-paced recorded courses suffer from high dropout rates because students lack external accountability. A fixed 4-day-per-week schedule with attendance tracking creates a rhythm that mirrors the regularity needed for NEET preparation. Each week typically covers one or two NCERT chapters, with dedicated slots for doubt resolution and weekly tests. This cadence ensures that by February, the entire Class 11 syllabus is complete, leaving March for cumulative revision. Students who follow this structured timeline consistently outperform those who binge-watch recorded content in the final months before the exam.',
      },
    ],
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
  testimonials: [
    {
      name: 'Kavya Bansal',
      achievement: 'AIR 156 | AIIMS New Delhi',
      quote:
        'Dr. Shekhar is hands down the best biology tutor for NEET. His way of connecting Class 11 concepts to clinical medicine made biology unforgettable.',
      score: '350/360',
    },
    {
      name: 'Rohan Saxena',
      achievement: 'AIR 345 | Maulana Azad Medical College',
      quote:
        'Finding the right biology tutor changed my NEET journey. The personal mentorship and study plan customised for my weak areas made all the difference.',
      score: '340/360',
    },
    {
      name: 'Aditi Choudhary',
      achievement: 'AIR 678 | AIIMS Rishikesh',
      quote:
        'My Class 11 biology tutor at Cerebrum taught me how to think like a biologist, not just memorise. That approach got me into AIIMS.',
      score: '325/360',
    },
  ],
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
        title: '5.0/5 Student Rating',
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

  deepContent: {
    paragraphs: [
      {
        heading: 'What Separates a Great Class 11 Biology Tutor from an Average One',
        body: 'The difference between a good and a great biology tutor lies in clinical experience combined with pedagogical skill. A tutor who has studied medicine understands why the countercurrent mechanism in the kidney matters, not just as an exam question but as a physiological reality. This depth translates into explanations that stick. When Dr. Shekhar explains the sliding filament theory of muscle contraction, he draws from actual clinical scenarios, making abstract sarcomere mechanics tangible. Great tutors also recognise that Class 11 students are encountering many biological concepts for the first time, so they layer complexity gradually: starting with a simple overview, then adding molecular detail, and finally connecting the topic to NEET-pattern MCQs. They avoid the common trap of teaching at a level that impresses parents but confuses students.',
      },
      {
        heading: 'The Role of Mentorship Beyond Subject Knowledge',
        body: 'NEET preparation is a marathon, and Class 11 is the first half. A great tutor functions as a mentor who manages not just academic progress but emotional resilience. Students at this stage face choice anxiety about career paths, peer pressure from friends pursuing engineering, and the daunting realisation that NEET is two years away. Effective mentorship includes regular one-on-one check-ins to assess motivation, personalised study plans that account for school workload, and honest feedback about mock test performance without discouragement. Dr. Shekhar assigns each Pinnacle batch student a monthly mentorship call where academic doubts, time management, and stress levels are all discussed. This holistic approach is why students who learn under a dedicated mentor perform significantly better than those who simply attend lectures.',
      },
      {
        heading: 'How to Evaluate a Biology Tutor Before Enrolling',
        body: 'Parents and students should assess a potential biology tutor on five dimensions before committing. First, academic credentials: has the tutor actually cleared a competitive medical entrance exam? Second, teaching track record: how many students have scored above 300 in NEET Biology under their guidance? Third, teaching methodology: does the tutor rely on rote dictation or use conceptual diagrams, 3D animations, and application-based practice? Fourth, accessibility: can students reach the tutor for doubts outside class hours, or is support limited to scheduled sessions? Fifth, batch size: a batch of 50 students makes individual attention impossible. Attending a free demo class is the most reliable way to assess all five dimensions simultaneously, and any credible tutor will welcome this evaluation rather than shy away from it.',
      },
    ],
    checklist: [
      { item: 'Verify the tutor holds a medical degree or competitive exam qualification', explanation: 'Ensures the tutor has first-hand understanding of what NEET demands.' },
      { item: 'Ask for verifiable student results (names, AIRs, scores)', explanation: 'Claims of "toppers produced" should be backed by actual evidence.' },
      { item: 'Attend a full demo class, not just an introductory talk', explanation: 'A demo class reveals teaching pace, clarity, and interaction style.' },
      { item: 'Check doubt-resolution channels and response time', explanation: '24/7 WhatsApp access differs vastly from email-only support.' },
      { item: 'Confirm batch size in writing before payment', explanation: 'Some institutes advertise small batches but merge them after enrolment.' },
    ],
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
  testimonials: [
    {
      name: 'Pranav Deshmukh',
      achievement: 'AIR 223 | AIIMS Delhi',
      quote:
        'Starting NEET preparation in Class 11 online with Cerebrum was the smartest move. Two full years of structured biology prep gave me a massive edge.',
      score: '345/360',
    },
    {
      name: 'Shruti Nair',
      achievement: 'AIR 489 | JIPMER Puducherry',
      quote:
        'The Class 11 NEET preparation covered every NCERT concept with PYQ mapping. I knew exactly which topics carry maximum weightage.',
      score: '334/360',
    },
    {
      name: 'Aakash Gupta',
      achievement: 'AIR 756 | BHU Medical',
      quote:
        'Online NEET preparation from Class 11 meant I could balance school and competitive prep perfectly. Cerebrum made both manageable.',
      score: '320/360',
    },
  ],
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

  deepContent: {
    paragraphs: [
      {
        heading: 'The Two-Year NEET Strategy: Why Class 11 Is the Starting Line',
        body: 'Students who begin NEET preparation in Class 11 effectively double their preparation runway compared to those who wait until Class 12. This additional year allows a fundamentally different study approach: concepts can be absorbed gradually, with time for multiple revision cycles before the exam. The Class 11 syllabus introduces five core units, and each unit contains chapters that directly feed into Class 12 topics. For instance, understanding cell division in Class 11 is prerequisite to comprehending meiosis-linked genetic variation in Class 12 Genetics. Similarly, Plant Physiology topics like photosynthesis and mineral nutrition establish metabolic principles that resurface in Ecology. A two-year strategy divides NEET preparation into four phases: foundation building (Class 11), integration (early Class 12), intensive practice (mid Class 12), and revision with mock tests (final three months). This phased approach prevents the burnout that afflicts students who try to compress two years of content into eight months.',
      },
      {
        heading: 'Month-by-Month Class 11 NEET Roadmap',
        body: 'A well-structured Class 11 plan begins in April with The Living World and Biological Classification, easing students into taxonomy before progressing to the more demanding Plant and Animal Kingdom chapters by June. July through September covers Cell Biology, including the cell cycle and biomolecules, topics that carry high NEET weightage. October and November are devoted to Plant Physiology, where photosynthesis, respiration, and mineral nutrition require careful conceptual layering. December through February tackles Human Physiology, the single highest-scoring unit in NEET from Class 11. March is reserved for cumulative revision and full-length mock tests covering all five units. Each month includes weekly topic tests and fortnightly cumulative assessments, ensuring that earlier material is not forgotten as new chapters are introduced. Students who adhere to this timeline enter Class 12 with Class 11 already locked in, freeing cognitive bandwidth for the new and equally demanding Class 12 syllabus.',
      },
    ],
    comparisonTable: [
      { Aspect: 'Starting Point', 'Start in Class 11': 'April of Class 11 (24 months before NEET)', 'Start in Class 12': 'April of Class 12 (12 months before NEET)' },
      { Aspect: 'Revision Cycles', 'Start in Class 11': '3-4 full revisions possible', 'Start in Class 12': '1-2 revisions at most' },
      { Aspect: 'Daily Study Load', 'Start in Class 11': '2-3 hours of Biology', 'Start in Class 12': '4-5 hours of Biology' },
      { Aspect: 'Stress Level', 'Start in Class 11': 'Moderate and manageable', 'Start in Class 12': 'High with frequent burnout risk' },
      { Aspect: 'Average NEET Biology Score', 'Start in Class 11': '300-340 (with consistent effort)', 'Start in Class 12': '260-300 (with consistent effort)' },
    ],
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
  testimonials: [
    {
      name: 'Divya Mishra',
      achievement: 'AIR 310 | AIIMS Delhi',
      quote:
        'NCERT is the bible for NEET biology, and Cerebrum taught me how to read it properly. Every line, every diagram, every activity was covered.',
      score: '344/360',
    },
    {
      name: 'Nikhil Sharma',
      achievement: 'AIR 502 | MAMC Delhi',
      quote:
        'The NCERT-focused Class 11 biology tuition ensured I never needed any other book. Pure NCERT mastery got me 332 in biology.',
      score: '332/360',
    },
    {
      name: 'Pooja Kumari',
      achievement: 'AIR 890 | KGMU Lucknow',
      quote:
        'I used to struggle with Class 11 NCERT biology chapters. After Cerebrum tuition, I could explain every concept from memory.',
      score: '318/360',
    },
  ],
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
    subtitle: 'Join 15,000+ students who built their NEET foundation on NCERT.',
    primaryButton: {
      text: 'See NCERT-Based Curriculum',
      link: '/class-11',
    },
    secondaryButton: {
      text: 'Download Free NCERT Notes',
      link: '/free-resources?subject=biology&class=11',
    },
  },

  deepContent: {
    paragraphs: [
      {
        heading: 'Why NCERT Is the Single Most Important Resource for NEET Biology',
        body: 'The National Testing Agency has repeatedly confirmed that NCERT textbooks form the basis of the NEET syllabus. Analysis of the past ten years of NEET papers reveals that 90 to 95 percent of Biology questions can be answered directly or indirectly from NCERT. This includes not just the main text but also figure captions, tables, boxed information, and even the questions at the end of each chapter. Many students make the mistake of spending time on reference books like Trueman or Pradeep before thoroughly mastering NCERT. The result is superficial familiarity with many sources rather than deep command of the one source that matters most. Effective NCERT tuition involves reading each chapter at least three times: once for overview, once with detailed note-taking, and once for connecting ideas across chapters. Only after this foundation is solid should supplementary material be introduced for additional MCQ practice.',
      },
      {
        heading: 'Chapter-Wise NEET Weightage from Class 11 NCERT',
        body: 'Understanding where the marks lie helps students allocate study time wisely. Human Physiology (Unit 5) is the highest-yield unit from Class 11, contributing 8 to 10 questions per NEET paper, particularly from digestion, breathing, circulation, and neural control. Cell Structure and Function (Unit 3) follows closely with 6 to 8 questions, especially from biomolecules and the cell cycle. Plant Physiology (Unit 4) contributes 5 to 7 questions, with photosynthesis and mineral nutrition being perennial favourites. Diversity in Living World (Unit 1), including the classification chapters, yields 4 to 6 questions. Structural Organisation (Unit 2) typically contributes 3 to 4 questions but is considered easy scoring because the content is largely factual. A smart preparation strategy allocates more hours to Human Physiology and Cell Biology while ensuring that the easier classification chapters are thoroughly revised for guaranteed marks.',
      },
      {
        heading: 'Mastering NCERT Diagrams and Tables for Maximum NEET Marks',
        body: 'NEET frequently tests diagram-based understanding, making NCERT illustrations non-negotiable study material. The diagram of the human heart with its labelled chambers and valves, the cross-section of a dicot stem versus a monocot stem, and the Z-scheme of photosynthesis are all recurring exam elements. Students should practise drawing these diagrams from memory and labelling every structure NCERT mentions. Equally important are the comparison tables scattered throughout the textbook, such as the differences between mitosis and meiosis, arteries and veins, or C3 and C4 pathways. These tables translate directly into matching-type and assertion-reason MCQs in NEET. Our tuition approach involves students creating their own summary tables and diagram flash cards after each chapter, which serves as both a learning exercise and a ready-made revision resource for the final months before the exam.',
      },
    ],
    checklist: [
      { item: 'Read each NCERT chapter at least three times before moving on', explanation: 'First read for overview, second for detailed notes, third for inter-chapter connections.' },
      { item: 'Practise drawing all NCERT diagrams from memory', explanation: 'Diagram-based MCQs are common in NEET and rely on accurate labelling skills.' },
      { item: 'Memorise every NCERT comparison table', explanation: 'Tables on differences (e.g., mitosis vs meiosis) directly map to matching-type questions.' },
      { item: 'Solve NCERT back-exercise and exemplar questions', explanation: 'NEET setters often rephrase NCERT exercise questions as MCQs.' },
      { item: 'Highlight figure captions and boxed text', explanation: 'These overlooked sections frequently appear as distractors or correct options in NEET.' },
    ],
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
