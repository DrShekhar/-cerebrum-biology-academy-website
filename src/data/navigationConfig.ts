export interface NavigationItem {
  id: string
  title: string
  href: string
  description?: string
  icon?: string
  children?: NavigationItem[]
  isNew?: boolean
  isPopular?: boolean
  keywords?: string[]
}

export interface NavigationSection {
  id: string
  title: string
  items: NavigationItem[]
  icon?: string
}

export const navigationConfig: NavigationSection[] = [
  {
    id: 'courses',
    title: 'Courses',
    icon: 'GraduationCap',
    items: [
      {
        id: 'class-11',
        title: 'Class 11th Foundation',
        href: '/courses/class-11',
        description: 'Early preparation for NEET with strong biology foundation',
        keywords: ['class 11', 'foundation', 'early preparation', 'biology basics'],
        isPopular: true,
      },
      {
        id: 'class-12',
        title: 'Class 12th Intensive',
        href: '/courses/class-12',
        description: 'Comprehensive NEET preparation for Class 12 students',
        keywords: ['class 12', 'intensive', 'neet preparation', 'final year'],
        isPopular: true,
      },
      {
        id: 'dropper',
        title: 'Dropper Batch',
        href: '/courses/neet-dropper',
        description: 'Specialized program for NEET repeaters',
        keywords: ['dropper', 'repeater', 'gap year', 'second attempt'],
      },
      {
        id: 'foundation',
        title: 'Foundation Course',
        href: '/courses/foundation',
        description: 'Building strong fundamentals for future medical aspirants',
        keywords: ['foundation', 'fundamentals', 'basics', 'early start'],
        children: [
          {
            id: 'class-9-foundation',
            title: 'Class 9th Foundation',
            href: '/courses/class-9-foundation',
            description: 'Age-appropriate Biology learning for 13-14 year olds',
            keywords: ['class 9', 'foundation', 'early learning', 'age appropriate'],
          },
          {
            id: 'class-10-foundation',
            title: 'Class 10th Foundation',
            href: '/courses/class-10-foundation',
            description: 'Advanced foundation with board exam excellence',
            keywords: ['class 10', 'foundation', 'board exams', 'neet preparation'],
          },
        ],
      },
      {
        id: 'timetable',
        title: 'Batch Timetable',
        href: '/timetable',
        description: 'View all batch schedules and timings for every location',
        keywords: [
          'timetable',
          'batch',
          'schedule',
          'timing',
          'class schedule',
          'online',
          'offline',
        ],
        isNew: true,
      },
    ],
  },
  {
    id: 'neet-tools',
    title: 'NEET Tools',
    icon: 'Calculator',
    items: [
      {
        id: 'exam-countdown',
        title: 'NEET Exam Countdown',
        href: '/neet-exam-countdown',
        description: 'Live countdown to NEET 2026 with study tracker',
        keywords: ['countdown', 'neet countdown', 'days left', 'exam timer', 'study tracker'],
        isNew: true,
      },
      {
        id: 'college-predictor',
        title: 'NEET College Predictor',
        href: '/neet-college-predictor',
        description: 'Find your college based on NEET score & rank',
        keywords: ['college predictor', 'neet colleges', 'admission predictor', 'counselling'],
        isPopular: true,
      },
      {
        id: 'rank-predictor',
        title: 'NEET Rank Predictor',
        href: '/neet-rank-predictor',
        description: 'Predict your NEET rank based on expected score',
        keywords: ['rank predictor', 'neet rank', 'score to rank'],
        isPopular: true,
      },
      {
        id: 'cutoff',
        title: 'NEET 2026 Cutoff',
        href: '/neet-2026-cutoff',
        description: 'Expected cutoff scores for medical colleges',
        keywords: ['cutoff', 'neet cutoff', 'category wise cutoff', 'college cutoff'],
      },
      {
        id: 'exam-date',
        title: 'NEET 2026 Exam Date',
        href: '/neet-2026-exam-date',
        description: 'Important dates and exam schedule',
        keywords: ['exam date', 'neet schedule', 'important dates', 'neet 2026'],
      },
      {
        id: 'syllabus',
        title: 'NEET Biology Syllabus',
        href: '/neet-biology-syllabus-2026',
        description: 'Complete NEET Biology syllabus chapter-wise',
        keywords: ['syllabus', 'neet syllabus', 'biology topics', 'chapter wise'],
      },
      {
        id: 'mcq-practice',
        title: 'NEET Biology MCQ',
        href: '/neet-biology-mcq',
        description: 'Practice MCQs topic-wise with explanations',
        keywords: ['mcq', 'practice questions', 'biology mcq', 'neet questions'],
        isNew: true,
      },
      {
        id: 'omr-checker',
        title: 'OMR Sheet Checker',
        href: '/neet-tools/omr-checker',
        description: 'Scan and evaluate OMR sheets with AI',
        keywords: ['omr', 'answer sheet', 'scanner', 'evaluation', 'grading'],
        isNew: true,
      },
      {
        id: 'quiz-competition',
        title: 'Quiz Competition',
        href: '/neet-tools/quiz-competition',
        description: 'Conduct live team-based quizzes in the classroom',
        keywords: ['quiz', 'competition', 'classroom', 'team quiz', 'scoreboard', 'live'],
        isNew: true,
      },
      {
        id: 'test-series-schedule',
        title: 'Test Series Schedule',
        href: '/test-series-schedule',
        description: 'NEET 2026 Premium Test Series - 31 tests schedule',
        keywords: ['test series', 'schedule', 'neet test', 'mock test', 'test dates', 'premium'],
        isNew: true,
      },
    ],
  },
  {
    id: 'blog',
    title: 'Blog',
    icon: 'FileText',
    items: [
      {
        id: 'all-posts',
        title: 'All Articles',
        href: '/blog',
        description: 'All NEET preparation tips and guides',
        keywords: ['blog', 'articles', 'neet tips', 'preparation guides'],
      },
      {
        id: 'neet-preparation',
        title: 'NEET Preparation Tips',
        href: '/blog/category/neet-preparation',
        description: 'Expert strategies for NEET success',
        keywords: ['preparation tips', 'study tips', 'neet strategy'],
        isPopular: true,
      },
      {
        id: 'biology-concepts',
        title: 'Biology Concepts',
        href: '/blog/category/biology-concepts',
        description: 'Deep dive into important biology topics',
        keywords: ['biology concepts', 'ncert biology', 'topic explanation'],
      },
      {
        id: 'success-stories',
        title: 'Success Stories',
        href: '/success-stories',
        description: 'Inspiring stories from our top rankers',
        keywords: ['success stories', 'toppers', 'neet results', 'inspiration'],
        isPopular: true,
      },
    ],
  },
  {
    id: 'board-preparation',
    title: 'Board Preparation',
    icon: 'BookOpen',
    items: [
      {
        id: 'cbse',
        title: 'CBSE',
        href: '/boards/cbse',
        description: 'CBSE Biology preparation aligned with NEET',
        keywords: ['cbse', 'central board', 'ncert', 'board exams'],
        isPopular: true,
      },
      {
        id: 'icse',
        title: 'ICSE',
        href: '/boards/icse',
        description: 'ICSE Biology curriculum with NEET focus',
        keywords: ['icse', 'council', 'indian certificate'],
      },
      {
        id: 'igcse',
        title: 'IGCSE',
        href: '/boards/igcse',
        description: 'International GCSE Biology preparation',
        keywords: ['igcse', 'international', 'cambridge', 'global'],
      },
      {
        id: 'ib',
        title: 'IB (International Baccalaureate)',
        href: '/boards/ib',
        description: 'IB Biology HL/SL with medical entrance focus',
        keywords: ['ib', 'international baccalaureate', 'higher level', 'standard level'],
      },
      {
        id: 'state-board',
        title: 'State Board',
        href: '/boards/state-boards',
        description: 'State board biology preparation for NEET',
        keywords: ['state board', 'regional', 'local curriculum'],
      },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    icon: 'Users',
    items: [
      {
        id: 'online-classes',
        title: 'Online Classes',
        href: '/services/online-classes',
        description: 'Live interactive online biology classes',
        keywords: ['online', 'live classes', 'virtual', 'remote learning'],
        isNew: true,
      },
      {
        id: 'classroom',
        title: 'Classroom Teaching',
        href: '/services/classroom',
        description: 'Traditional classroom learning experience',
        keywords: ['classroom', 'offline', 'physical', 'in-person'],
        isPopular: true,
      },
      {
        id: 'international',
        title: 'International Students',
        href: '/services/international',
        description: 'Special programs for international students',
        keywords: ['international', 'overseas', 'foreign students', 'global'],
      },
      {
        id: 'doubt-resolution',
        title: 'Doubt Resolution',
        href: '/services/doubt-resolution',
        description: '24/7 doubt clearing and academic support',
        keywords: ['doubt clearing', 'support', 'help', 'academic assistance'],
      },
      {
        id: 'adaptive-testing',
        title: 'Adaptive Testing',
        href: '/adaptive-testing',
        description: 'AI-powered personalized assessment system',
        keywords: ['adaptive', 'testing', 'assessment', 'ai', 'personalized', 'practice'],
        isNew: true,
      },
      {
        id: 'free-resources',
        title: 'Free Resources',
        href: '/free-resources',
        description: 'Free study materials, timetables, and announcements',
        keywords: ['free', 'resources', 'study materials', 'timetables', 'announcements', 'notes'],
        isNew: true,
      },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    icon: 'Building',
    items: [
      {
        id: 'results',
        title: 'Results & Achievements',
        href: '/company/results',
        description: 'Student success stories and NEET results',
        keywords: ['results', 'success stories', 'achievements', 'toppers'],
        isPopular: true,
      },
      {
        id: 'careers',
        title: 'Careers',
        href: '/company/careers',
        description: 'Join our team of passionate educators',
        keywords: ['careers', 'jobs', 'faculty positions', 'employment'],
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    icon: 'HelpCircle',
    items: [
      {
        id: 'help-center',
        title: 'Help Center',
        href: '/support/help-center',
        description: 'Frequently asked questions and support',
        keywords: ['help', 'faq', 'support', 'assistance'],
      },
      {
        id: 'demo',
        title: 'Free Demo',
        href: '/support/demo',
        description: 'Experience our teaching methodology',
        keywords: ['demo', 'trial', 'free class', 'sample'],
        isNew: true,
      },
      {
        id: 'brochure',
        title: 'Download Brochure',
        href: '/support/brochure',
        description: 'Detailed information about our courses',
        keywords: ['brochure', 'download', 'information', 'course details'],
      },
      {
        id: 'fees',
        title: 'Fees Structure',
        href: '/support/fees',
        description: 'Transparent fee structure and payment options',
        keywords: ['fees', 'cost', 'payment', 'pricing'],
      },
      {
        id: 'admission',
        title: 'Admission Process',
        href: '/support/admission',
        description: 'How to enroll in our courses',
        keywords: ['admission', 'enrollment', 'registration', 'join'],
      },
    ],
  },
]

export const footerNavigationConfig = {
  quickLinks: [
    { title: 'About Us', href: '/about' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'Privacy Policy', href: '/privacy-policy' },
    { title: 'Terms of Service', href: '/terms' },
    { title: 'Refund Policy', href: '/refund-policy' },
    { title: 'Disclaimer', href: '/disclaimer' },
  ],
  courses: [
    { title: 'Class 11th Foundation', href: '/courses/class-11' },
    { title: 'Class 12th Intensive', href: '/courses/class-12' },
    { title: 'NEET Dropper Program', href: '/courses/neet-dropper' },
    { title: 'Foundation Course', href: '/courses/foundation' },
    { title: 'Class 9th Foundation', href: '/courses/class-9-foundation' },
    { title: 'Class 10th Foundation', href: '/courses/class-10-foundation' },
  ],
  services: [
    { title: 'Online Classes', href: '/services/online-classes' },
    { title: 'Classroom Teaching', href: '/services/classroom' },
    { title: 'International Students', href: '/services/international' },
    { title: 'Doubt Resolution', href: '/services/doubt-resolution' },
  ],
  resources: [
    { title: 'Free Resources', href: '/free-resources' },
    { title: 'Free Demo', href: '/support/demo' },
    { title: 'Download Brochure', href: '/support/brochure' },
    { title: 'Mock Tests', href: '/mock-tests' },
    { title: 'Study Materials', href: '/study-materials' },
  ],
}

// Search configuration
export const searchableContent = [
  // Flatten all navigation items for search
  ...navigationConfig.flatMap((section) =>
    section.items.map((item) => ({
      id: item.id,
      title: item.title,
      href: item.href,
      description: item.description || '',
      category: section.title,
      keywords: item.keywords || [],
      isNew: item.isNew,
      isPopular: item.isPopular,
    }))
  ),
  // Add additional searchable content
  {
    id: 'mock-tests',
    title: 'Mock Tests',
    href: '/mock-tests',
    description: 'Practice NEET mock tests and analyze performance',
    category: 'Resources',
    keywords: ['mock tests', 'practice', 'test series', 'neet simulation'],
  },
  {
    id: 'study-materials',
    title: 'Study Materials',
    href: '/study-materials',
    description: 'Comprehensive study materials for NEET Biology',
    category: 'Resources',
    keywords: ['study materials', 'notes', 'books', 'resources'],
  },
  {
    id: 'faculty',
    title: 'Faculty',
    href: '/faculty',
    description: 'Meet our experienced biology teachers',
    category: 'About',
    keywords: ['faculty', 'teachers', 'instructors', 'staff'],
  },
  {
    id: 'testimonials',
    title: 'Student Testimonials',
    href: '/testimonials',
    description: 'Success stories from our students',
    category: 'About',
    keywords: ['testimonials', 'reviews', 'student feedback', 'success stories'],
  },
  {
    id: 'class-9-foundation',
    title: 'Class 9th Foundation Biology',
    href: '/courses/class-9-foundation',
    description: 'Age-appropriate Biology learning for 13-14 year olds',
    category: 'Courses',
    keywords: ['class 9', 'foundation', 'early learning', 'age appropriate', 'teenagers'],
  },
  {
    id: 'class-10-foundation',
    title: 'Class 10th Foundation Biology',
    href: '/courses/class-10-foundation',
    description: 'Advanced foundation with board exam excellence',
    category: 'Courses',
    keywords: ['class 10', 'foundation', 'board exams', 'neet preparation', 'advanced'],
  },
  {
    id: 'intensive-neet-biology',
    title: 'Intensive NEET Biology Course',
    href: '/courses/intensive-neet-biology',
    description: 'Premium intensive course for serious NEET aspirants',
    category: 'Courses',
    keywords: ['intensive', 'premium', 'neet biology', 'exclusive', 'high-ticket'],
  },
  {
    id: 'adaptive-testing',
    title: 'Adaptive Testing',
    href: '/adaptive-testing',
    description: 'AI-powered personalized assessment that adapts to your skill level',
    category: 'Services',
    keywords: [
      'adaptive testing',
      'ai assessment',
      'personalized tests',
      'practice',
      'smart testing',
    ],
    isNew: true,
  },
  {
    id: 'free-resources',
    title: 'Free Resources',
    href: '/free-resources',
    description: 'Free study materials, timetables, announcements, and notes',
    category: 'Resources',
    keywords: [
      'free resources',
      'free study materials',
      'timetables',
      'announcements',
      'free notes',
      'free pdfs',
    ],
    isNew: true,
  },
  {
    id: 'omr-checker',
    title: 'OMR Sheet Checker',
    href: '/neet-tools/omr-checker',
    description: 'Scan and evaluate OMR answer sheets with AI-powered grading',
    category: 'NEET Tools',
    keywords: [
      'omr checker',
      'answer sheet scanner',
      'omr evaluation',
      'automatic grading',
      'neet omr',
    ],
    isNew: true,
  },
  {
    id: 'quiz-competition',
    title: 'Quiz Competition',
    href: '/neet-tools/quiz-competition',
    description: 'Conduct live team-based quizzes in your classroom with real-time scoring',
    category: 'NEET Tools',
    keywords: [
      'quiz competition',
      'classroom quiz',
      'team quiz',
      'live scoreboard',
      'quiz game',
      'biology quiz',
    ],
    isNew: true,
  },
  {
    id: 'timetable',
    title: 'Batch Timetable',
    href: '/timetable',
    description: 'View all batch schedules with timings, locations, and online options',
    category: 'Courses',
    keywords: [
      'timetable',
      'batch schedule',
      'class timing',
      'batch timing',
      'online batch',
      'offline batch',
      'gurugram',
      'south delhi',
      'rohini',
    ],
    isNew: true,
  },
]

export const socialLinks = [
  {
    platform: 'Instagram',
    href: 'https://instagram.com/cerebrumbiologyacademy',
    icon: 'Instagram',
  },
  {
    platform: 'YouTube',
    href: 'https://youtube.com/cerebrumbiologyacademy',
    icon: 'YouTube',
  },
  {
    platform: 'Facebook',
    href: 'https://facebook.com/cerebrumbiologyacademy',
    icon: 'Facebook',
  },
  {
    platform: 'Twitter',
    href: 'https://twitter.com/cerebrumbiology',
    icon: 'Twitter',
  },
]
