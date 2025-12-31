import { SEOLandingContent } from './types'

// Base content for Class 10 pages - Board + Foundation focus
const class10BaseContent = {
  classLevel: 'class-10' as const,
  stats: [
    { value: '96%', label: 'Board Success Rate', icon: 'trophy' },
    { value: '95%+', label: 'Avg Board Score', icon: 'star' },
    { value: '800+', label: 'Students Enrolled', icon: 'users' },
    { value: '2 Years', label: 'NEET Head Start', icon: 'clock' },
  ],
  testimonials: [
    {
      name: 'Kavya Sharma',
      achievement: 'Currently Class 11 | 98% in Class 10 Boards',
      quote:
        'Cerebrum made Class 10 science so clear. Scored 98% in boards and now Class 11 biology feels easy because of the strong foundation!',
      score: '98% in Boards',
    },
    {
      name: "Arjun's Mother",
      achievement: 'Parent of Class 10 Student',
      quote:
        'We were worried about boards and NEET together. Cerebrum handled both perfectly. Arjun is confident and prepared for Class 11 now.',
      score: 'School Topper',
    },
    {
      name: 'Priyanka Gupta',
      achievement: 'Class 10 to NEET Journey',
      quote:
        "Started in Class 10 with Cerebrum. Now in Class 12, I'm consistently scoring 320+ in NEET mocks. Early start was everything!",
      score: 'NEET Mock: 325/360',
    },
  ],
  courseSummary: {
    title: 'Class 10 Biology Foundation Course',
    duration: '1 Year (April - March)',
    batchSize: '12-15 Students',
    features: [
      'Live online classes 3 days/week',
      'Complete Class 10 science coverage',
      'Board exam focused preparation',
      'NEET foundation concepts introduced',
      'Pre-board tests and sample papers',
      '24/7 doubt solving support',
    ],
    price: {
      original: 40000,
      discounted: 32000,
      emi: '₹2,800/month',
    },
  },
  relatedPages: [
    { title: 'Class 11 NEET Course', link: '/class-11' },
    { title: 'Class 9 Foundation', link: '/courses/class-9-foundation' },
    { title: 'Complete 3-Year Program', link: '/courses/neet-complete' },
    { title: 'Success Stories', link: '/success-stories' },
  ],
}

// Page 1: /class-10-biology-tuition-online/
export const class10BiologyTuitionOnline: SEOLandingContent = {
  ...class10BaseContent,
  slug: 'class-10-biology-tuition-online',

  title: 'Class 10 Biology Tuition Online | Board + NEET Foundation',
  metaDescription:
    'Expert online biology tuition for Class 10. Score 95%+ in boards while building NEET foundation. Live classes, expert faculty, proven results. Enroll now!',
  keywords: [
    'class 10 biology tuition online',
    'biology tuition for class 10 online',
    'online biology tuition class 10',
    'class 10 board biology tuition',
    'class 10 science tuition online',
  ],

  hero: {
    headline: 'Class 10: Ace Boards, Build NEET Foundation',
    subheadline:
      'Online biology tuition that prepares you for board exams AND gives you a 2-year head start for NEET.',
    highlightedText: 'The Year That Shapes Your Medical Career',
    ctaText: 'View Foundation Course',
    ctaLink: '/courses/class-10-foundation',
    backgroundGradient: 'from-blue-900 via-indigo-900 to-violet-900',
  },

  painPoints: {
    title: 'Class 10: The Critical Year',
    points: [
      {
        icon: 'file-text',
        question: 'Worried about Class 10 board exams?',
        solution:
          'We ensure 95%+ in boards with focused preparation, sample papers, and pre-boards.',
      },
      {
        icon: 'clock',
        question: 'Thinking NEET prep can wait till Class 11?',
        solution: 'Class 11 syllabus is heavy. Start foundations now and cruise through later.',
      },
      {
        icon: 'book-open',
        question: 'School teaching not preparing for boards properly?',
        solution: 'Complete syllabus coverage with board exam patterns and marking scheme focus.',
      },
      {
        icon: 'target',
        question: 'Want to join science stream with confidence?',
        solution: 'Build strong biology base now. Enter Class 11 as a science topper.',
      },
    ],
  },

  benefits: {
    title: 'Why Cerebrum for Class 10',
    subtitle: 'Board excellence meets NEET foundation',
    items: [
      {
        icon: 'award',
        title: '95%+ Board Results',
        description: 'Our students consistently score 95%+ in Class 10 science boards.',
      },
      {
        icon: 'video',
        title: 'Live Online Classes',
        description: 'Interactive sessions with real-time doubt solving. Not recorded videos.',
      },
      {
        icon: 'layers',
        title: 'Dual Preparation',
        description: 'Board exam focus + NEET concepts. Two goals, one smart approach.',
      },
      {
        icon: 'file',
        title: 'Board Pattern Practice',
        description: 'CBSE pattern questions, sample papers, and marking scheme analysis.',
      },
      {
        icon: 'trending-up',
        title: 'Class 11 Ready',
        description: 'Enter Class 11 with strong foundation. Be ahead of your peers.',
      },
      {
        icon: 'phone',
        title: '24/7 Doubt Support',
        description: 'WhatsApp group for instant doubt solving. Never stay stuck.',
      },
    ],
  },

  faqs: [
    {
      question: 'How is Class 10 biology important for NEET?',
      answer:
        'Class 10 biology introduces fundamental concepts (Life Processes, Control and Coordination, Heredity, Evolution) that form the base for Class 11-12 NEET syllabus. Understanding these now makes Human Physiology, Genetics, and Evolution in NEET much easier.',
    },
    {
      question: 'Will this tuition help score well in Class 10 boards?',
      answer:
        'Absolutely! Board preparation is our primary focus for Class 10. We cover NCERT thoroughly, practice board pattern questions, conduct pre-boards, and analyze sample papers. Our students average 95%+ in Class 10 science boards.',
    },
    {
      question: 'How many classes per week for Class 10 online tuition?',
      answer:
        '3 live sessions per week (1.5 hours each) for biology. Total 4.5 hours of live classes. Additional doubt sessions and revision classes before boards. Self-study time: 3-4 hours/week recommended.',
    },
    {
      question: 'Is online tuition effective for Class 10 board preparation?',
      answer:
        'Yes! Online tuition offers: access to best teachers, recorded sessions for revision, no travel time, comfortable learning environment. Our online students consistently match or exceed offline coaching results in boards.',
    },
    {
      question: 'What study material is provided for Class 10?',
      answer:
        'You receive: Chapter notes aligned with NCERT, board pattern question banks, sample papers (last 10 years), pre-board test series, and quick revision sheets for last-minute prep. All materials are digital and printable.',
    },
    {
      question: 'What is the fee for Class 10 biology online tuition?',
      answer:
        "Our Class 10 biology tuition is ₹32,000/year (original ₹40,000). This includes board prep, NEET foundation, all study material, and test series. EMI at ₹2,800/month available. Best investment for your child's science future!",
    },
  ],

  cta: {
    title: 'Excel in Boards, Prepare for NEET',
    subtitle: 'The smart approach to Class 10 science. Book a free demo today.',
    primaryButton: {
      text: 'View Complete Course',
      link: '/courses/class-10-foundation',
    },
    secondaryButton: {
      text: 'Book Free Demo Class',
      link: '/book-demo?class=class-10',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Class 10 Biology Online Tuition',
    provider: 'Cerebrum Biology Academy',
    description:
      'Online biology tuition for Class 10 with board exam focus and NEET foundation building.',
    duration: 'P1Y',
    price: 32000,
    priceCurrency: 'INR',
  },
}

// Page 2: /neet-foundation-class-10/
export const neetFoundationClass10: SEOLandingContent = {
  ...class10BaseContent,
  slug: 'neet-foundation-class-10',

  title: 'NEET Foundation Class 10 | Pre-Medical Online Course',
  metaDescription:
    'NEET foundation course for Class 10 online. Build strong base for NEET while acing boards. 2-year head start, expert faculty. Limited seats!',
  keywords: [
    'NEET foundation class 10',
    'class 10 NEET foundation course',
    'NEET preparation from class 10 online',
    'class 10 pre-medical course online',
    'class 10 NEET online coaching',
  ],

  hero: {
    headline: 'NEET Foundation: The Class 10 Advantage',
    subheadline:
      '2 extra years of preparation while your peers are just waking up. Start your NEET journey in Class 10.',
    highlightedText: 'Early Starters Become Toppers',
    ctaText: 'Join Foundation Batch',
    ctaLink: '/courses/class-10-foundation',
    backgroundGradient: 'from-purple-900 via-violet-900 to-indigo-900',
  },

  painPoints: {
    title: 'Why Start NEET Foundation in Class 10?',
    points: [
      {
        icon: 'calendar',
        question: 'Class 11 just 1 year away?',
        solution: 'Prepare now. Enter Class 11 NEET batches as a prepared student, not a beginner.',
      },
      {
        icon: 'trending-up',
        question: 'Want to be ahead of the competition?',
        solution:
          "While others start fresh in Class 11, you'll have 1 year of concepts already mastered.",
      },
      {
        icon: 'layers',
        question: 'Worried about Class 11 syllabus being too heavy?',
        solution:
          'Foundation concepts from Class 10 make Class 11 topics much easier to understand.',
      },
      {
        icon: 'target',
        question: 'Serious about medical career?',
        solution: 'Serious aspirants start early. Show your commitment to becoming a doctor.',
      },
    ],
  },

  benefits: {
    title: 'The Foundation Advantage',
    subtitle: 'What early starters gain over others',
    items: [
      {
        icon: 'clock',
        title: '2 Extra Years',
        description: 'More time to understand concepts deeply. No last-minute cramming.',
      },
      {
        icon: 'layers',
        title: 'Layered Learning',
        description: 'Build concepts gradually. Each layer adds to the foundation.',
      },
      {
        icon: 'smile',
        title: 'Stress-Free Learning',
        description: 'Learn at comfortable pace. No exam pressure in foundation year.',
      },
      {
        icon: 'book',
        title: 'Strong NCERT Base',
        description: 'Master NCERT thoroughly. NCERT is the Bible for NEET.',
      },
      {
        icon: 'users',
        title: 'Like-Minded Peers',
        description: 'Learn with other serious aspirants. Motivation from peer community.',
      },
      {
        icon: 'award',
        title: 'Board + NEET Ready',
        description: 'Foundation helps both exams. Excel in boards while building NEET base.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is NEET foundation for Class 10?',
      answer:
        'NEET foundation is pre-competitive preparation that builds the conceptual base needed for NEET. For Class 10, it means: completing board syllabus with depth, introducing Class 11 concepts early, developing competitive thinking, and building strong biology fundamentals.',
    },
    {
      question: 'How is Class 10 NEET foundation different from regular tuition?',
      answer:
        'Regular tuition focuses only on board marks. NEET foundation adds: competitive exam thinking, Class 11 concept introduction, NCERT mastery beyond board level, and development of application skills. You get board excellence PLUS NEET readiness.',
    },
    {
      question: 'Will board preparation suffer if I focus on NEET foundation?',
      answer:
        'Not at all! NEET foundation actually helps boards. We cover NCERT more thoroughly than board-only tuition. Our students consistently score 95%+ in boards because foundation means deeper understanding, which helps both exams.',
    },
    {
      question: 'What Class 11 topics are introduced in Class 10 foundation?',
      answer:
        'We introduce: basic cell biology concepts, introduction to human physiology, fundamentals of genetics, and scientific method. These are taught at a level appropriate for Class 10, making Class 11 versions much easier later.',
    },
    {
      question: 'Is Class 10 online NEET foundation effective?',
      answer:
        'Very effective! Online format offers: best teachers regardless of location, interactive learning tools, recorded sessions for revision, and comfortable learning. Our foundation students consistently outperform in Class 11-12.',
    },
    {
      question: 'What is the fee for Class 10 NEET foundation online?',
      answer:
        'Our Class 10 NEET foundation is ₹32,000/year (original ₹40,000). This includes: board preparation, NEET foundation, study material, test series, and doubt support. EMI at ₹2,800/month. Great value for 2-year head start!',
    },
  ],

  cta: {
    title: 'Start Your NEET Journey in Class 10',
    subtitle: 'Limited seats in foundation batch. Early starters get the advantage.',
    primaryButton: {
      text: 'Join Foundation Batch',
      link: '/courses/class-10-foundation',
    },
    secondaryButton: {
      text: 'Talk to Counselor',
      link: '/contact?topic=class-10-foundation',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'NEET Foundation Class 10',
    provider: 'Cerebrum Biology Academy',
    description:
      'NEET foundation course for Class 10 students building pre-medical base with online expert coaching.',
    duration: 'P1Y',
    price: 32000,
    priceCurrency: 'INR',
  },
}

// Page 3: /online-biology-classes-class-10/
export const onlineBiologyClassesClass10: SEOLandingContent = {
  ...class10BaseContent,
  slug: 'online-biology-classes-class-10',

  title: 'Online Biology Classes for Class 10 | Live Expert Teaching',
  metaDescription:
    'Join live online biology classes for Class 10. Expert AIIMS faculty, board exam focus, NEET foundation. Interactive learning, small batches. Enroll now!',
  keywords: [
    'online biology classes class 10',
    'biology classes for class 10 online',
    'live biology classes class 10',
    'class 10 biology online coaching',
    'class 10 science classes online',
  ],

  hero: {
    headline: 'Biology Classes That Prepare You for Everything',
    subheadline:
      'Live online classes for Class 10 covering boards, NEET foundation, and beyond. Expert teaching, engaging format.',
    highlightedText: 'Board Topper + NEET Ready',
    ctaText: 'See Class Schedule',
    ctaLink: '/courses/class-10-foundation',
    backgroundGradient: 'from-green-800 via-cyan-900 to-blue-900',
  },

  painPoints: {
    title: 'Why Choose Our Online Classes',
    points: [
      {
        icon: 'video',
        question: 'Tired of boring school classes?',
        solution: 'Engaging live sessions with animations, discussions, and interactive elements.',
      },
      {
        icon: 'map-pin',
        question: 'No quality teachers in your area?',
        solution: 'Access AIIMS-trained faculty online. Best teaching regardless of location.',
      },
      {
        icon: 'file-text',
        question: 'Not confident about board exam preparation?',
        solution: 'Structured curriculum with board-pattern practice and pre-board tests.',
      },
      {
        icon: 'clock',
        question: 'Wasting time traveling to tuition?',
        solution: 'Learn from home. Save 1-2 hours daily for more study or rest.',
      },
    ],
  },

  benefits: {
    title: 'What Our Classes Offer',
    subtitle: 'The complete Class 10 biology solution',
    items: [
      {
        icon: 'play-circle',
        title: 'Live Interactive Sessions',
        description: 'Real-time teaching with question-answer. Not pre-recorded boring videos.',
      },
      {
        icon: 'user-check',
        title: 'Expert Faculty',
        description: 'AIIMS-trained teachers who know how to make biology interesting.',
      },
      {
        icon: 'file',
        title: 'Board Focus',
        description: 'CBSE pattern questions, marking schemes, and sample paper practice.',
      },
      {
        icon: 'trending-up',
        title: 'NEET Foundation',
        description: 'Introduction to competitive exam concepts for head start.',
      },
      {
        icon: 'repeat',
        title: 'Recorded Sessions',
        description: 'Miss a class? Watch the recording. Revise anytime you want.',
      },
      {
        icon: 'users',
        title: 'Small Batches',
        description: 'Only 12-15 students. Everyone gets attention and can ask questions.',
      },
    ],
  },

  faqs: [
    {
      question: 'What is the schedule for Class 10 online biology classes?',
      answer:
        'Classes run 3 days a week (1.5 hours each), typically in evening slots (5-6:30 PM or 7-8:30 PM) to not clash with school. Weekend revision sessions before exams. Total 5-6 hours/week including self-study.',
    },
    {
      question: 'How are online classes conducted for Class 10?',
      answer:
        'Live classes on Zoom/Google Meet with interactive whiteboard, screen sharing for diagrams, and real-time Q&A. Teachers can see students (optional) and interact throughout. Classes are engaging, not lecture-style.',
    },
    {
      question: 'Can I ask doubts during online classes?',
      answer:
        "Yes! You can ask questions by unmuting or typing in chat. With only 12-15 students, there's ample time for everyone's doubts. Additional doubt sessions are scheduled twice weekly.",
    },
    {
      question: 'What if I miss a live class?',
      answer:
        'All classes are recorded and available within a few hours. You can watch at your convenience. However, we encourage live attendance for interactive learning. Attendance is tracked and shared with parents.',
    },
    {
      question: 'What devices do I need for online biology classes?',
      answer:
        'Any device with internet works - laptop, tablet, or smartphone. Laptop/tablet recommended for better viewing. Stable internet (5+ Mbps) and headphones for clear audio. Optional: webcam for interactive sessions.',
    },
    {
      question: 'How do I enroll for Class 10 online biology classes?',
      answer:
        'Book a free demo class first. Experience the teaching quality. If satisfied, enroll for the year. Fee: ₹32,000/year (EMI available). New batches start in April and July. Limited seats per batch!',
    },
  ],

  cta: {
    title: 'Join Classes That Actually Work',
    subtitle: 'Book a free demo and experience the difference.',
    primaryButton: {
      text: 'View Class Schedule',
      link: '/courses/class-10-foundation',
    },
    secondaryButton: {
      text: 'Book Free Demo',
      link: '/book-demo?class=class-10',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Online Biology Classes Class 10',
    provider: 'Cerebrum Biology Academy',
    description:
      'Live online biology classes for Class 10 with board exam focus and NEET foundation.',
    duration: 'P1Y',
    price: 32000,
    priceCurrency: 'INR',
  },
}

// Page 4: /class-10-board-neet-coaching/
export const class10BoardNeetCoaching: SEOLandingContent = {
  ...class10BaseContent,
  slug: 'class-10-board-neet-coaching',

  title: 'Class 10 Board + NEET Coaching Online | Dual Preparation',
  metaDescription:
    'Class 10 coaching for both board exams and NEET foundation online. Score 95%+ in boards while building pre-medical base. Expert online coaching. Join now!',
  keywords: [
    'class 10 board + NEET preparation',
    'pre-medical foundation class 10',
    'class 10 board NEET coaching online',
    'class 10 science coaching for NEET',
    'integrated class 10 coaching online',
  ],

  hero: {
    headline: 'Boards + NEET: The Smart Class 10 Strategy',
    subheadline:
      'Why choose between board marks and NEET preparation? Our online coaching delivers both in one program.',
    highlightedText: '95%+ in Boards, NEET Ready for Class 11',
    ctaText: 'See Our Dual Approach',
    ctaLink: '/courses/class-10-foundation',
    backgroundGradient: 'from-orange-900 via-yellow-900 to-yellow-900',
  },

  painPoints: {
    title: 'The Class 10 Dilemma We Solve',
    points: [
      {
        icon: 'git-branch',
        question: 'Board prep vs NEET prep - which to focus on?',
        solution:
          'Both! Our integrated online approach ensures excellence in boards AND NEET foundation.',
      },
      {
        icon: 'alert-triangle',
        question: 'Parents worried about board results?',
        solution:
          'We guarantee board focus first. 95%+ is the target, and we consistently achieve it.',
      },
      {
        icon: 'clock',
        question: 'Class 11 starting soon, feeling unprepared?',
        solution: 'Our foundation ensures you enter Class 11 with solid base, not as a beginner.',
      },
      {
        icon: 'dollar-sign',
        question: 'Separate coaching for boards and NEET foundation?',
        solution: 'One integrated program = One fee. Better results, better value.',
      },
    ],
  },

  benefits: {
    title: 'Dual Preparation Approach',
    subtitle: 'How we make both goals achievable online',
    items: [
      {
        icon: 'book',
        title: 'NCERT Mastery',
        description: 'NCERT is common to both. We cover it deeply for both boards and NEET base.',
      },
      {
        icon: 'file-text',
        title: 'Board Pattern Focus',
        description: 'CBSE question patterns, marking schemes, and sample paper practice.',
      },
      {
        icon: 'layers',
        title: 'NEET Concepts Intro',
        description: 'Key Class 11 concepts introduced at Class 10 level. Head start for NEET.',
      },
      {
        icon: 'calendar',
        title: 'Strategic Timeline',
        description: 'Board prep intensifies before exams. NEET foundation throughout the year.',
      },
      {
        icon: 'bar-chart',
        title: 'Regular Assessments',
        description: 'Board-pattern and foundation tests to track progress on both fronts.',
      },
      {
        icon: 'video',
        title: 'Online Convenience',
        description:
          'All benefits of online learning: no travel, recorded sessions, flexible timing.',
      },
    ],
  },

  faqs: [
    {
      question: 'Can Class 10 students really prepare for both boards and NEET?',
      answer:
        "Yes! At Class 10 level, NEET preparation means foundation building, not full syllabus coverage. The Class 10 NCERT chapters (Life Processes, Genetics, Evolution) directly relate to NEET topics. By mastering these for boards, you're also building NEET foundation.",
    },
    {
      question: 'How do you balance board preparation and NEET foundation?',
      answer:
        "Boards are primary focus. We cover NCERT thoroughly for board excellence. NEET foundation comes through: deeper conceptual understanding, introduction to advanced topics, and competitive thinking development. It's additive, not distracting.",
    },
    {
      question: 'Will NEET foundation distract from board exam focus?',
      answer:
        'No! NEET foundation actually helps boards. Understanding concepts deeply (NEET approach) means better answers in boards. Our students who do foundation score higher in boards because they understand topics, not just memorize.',
    },
    {
      question: 'What board scores do your Class 10 students achieve?',
      answer:
        'Our Class 10 students average 93-95% in CBSE science boards. Many score 98-100% in biology sections. The foundation approach creates deeper understanding which translates to excellent board performance.',
    },
    {
      question: 'How does this online coaching prepare for Class 11?',
      answer:
        'By the end of Class 10 with us, students: understand cell biology basics, know human physiology fundamentals, grasp genetics concepts, and have developed scientific thinking. They enter Class 11 as prepared students, not beginners.',
    },
    {
      question: 'What is the investment for board + NEET foundation coaching?',
      answer:
        '₹32,000/year for integrated online coaching. This covers: board preparation, NEET foundation, study material, test series, and doubt support. One fee for dual benefits. EMI at ₹2,800/month available. Exceptional value!',
    },
  ],

  cta: {
    title: 'Ace Boards. Prepare for NEET.',
    subtitle: 'The integrated approach smart students choose. Join online now.',
    primaryButton: {
      text: 'Explore Dual Program',
      link: '/courses/class-10-foundation',
    },
    secondaryButton: {
      text: 'Talk to Counselor',
      link: '/contact?topic=class-10-dual-prep',
    },
  },

  schema: {
    '@type': 'Course',
    courseName: 'Class 10 Board + NEET Foundation',
    provider: 'Cerebrum Biology Academy',
    description:
      'Integrated online coaching for Class 10 covering board exam preparation and NEET foundation building.',
    duration: 'P1Y',
    price: 32000,
    priceCurrency: 'INR',
  },
}

// Export all Class 10 content
export const class10SEOPages = {
  class10BiologyTuitionOnline,
  neetFoundationClass10,
  onlineBiologyClassesClass10,
  class10BoardNeetCoaching,
}
