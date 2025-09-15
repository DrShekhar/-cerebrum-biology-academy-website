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
        href: '/courses/dropper',
        description: 'Specialized program for NEET repeaters',
        keywords: ['dropper', 'repeater', 'gap year', 'second attempt'],
      },
      {
        id: 'foundation',
        title: 'Foundation Course',
        href: '/courses/foundation',
        description: 'Building strong fundamentals for future medical aspirants',
        keywords: ['foundation', 'fundamentals', 'basics', 'early start'],
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
        href: '/board-preparation/cbse',
        description: 'CBSE Biology preparation aligned with NEET',
        keywords: ['cbse', 'central board', 'ncert', 'board exams'],
        isPopular: true,
      },
      {
        id: 'icse',
        title: 'ICSE',
        href: '/board-preparation/icse',
        description: 'ICSE Biology curriculum with NEET focus',
        keywords: ['icse', 'council', 'indian certificate'],
      },
      {
        id: 'igcse',
        title: 'IGCSE',
        href: '/board-preparation/igcse',
        description: 'International GCSE Biology preparation',
        keywords: ['igcse', 'international', 'cambridge', 'global'],
      },
      {
        id: 'ib',
        title: 'IB (International Baccalaureate)',
        href: '/board-preparation/ib',
        description: 'IB Biology HL/SL with medical entrance focus',
        keywords: ['ib', 'international baccalaureate', 'higher level', 'standard level'],
      },
      {
        id: 'state-board',
        title: 'State Board',
        href: '/board-preparation/state-board',
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
    { title: 'Dropper Batch', href: '/courses/dropper' },
    { title: 'Foundation Course', href: '/courses/foundation' },
  ],
  services: [
    { title: 'Online Classes', href: '/services/online-classes' },
    { title: 'Classroom Teaching', href: '/services/classroom' },
    { title: 'International Students', href: '/services/international' },
    { title: 'Doubt Resolution', href: '/services/doubt-resolution' },
  ],
  resources: [
    { title: 'Free Demo', href: '/support/demo' },
    { title: 'Download Brochure', href: '/support/brochure' },
    { title: 'Mock Tests', href: '/mock-tests' },
    { title: 'Study Materials', href: '/study-materials' },
  ],
}

// Search configuration
export const searchableContent = [
  // Flatten all navigation items for search
  ...navigationConfig.flatMap(section => 
    section.items.map(item => ({
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