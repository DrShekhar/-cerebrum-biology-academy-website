/**
 * Centralized Routes Configuration
 * Single source of truth for all application routes
 */

export const routes = {
  // Main Pages
  home: '/',
  about: '/about',
  contact: '/contact',

  // Courses
  courses: {
    main: '/courses',
    class11: '/courses/class-11',
    class12: '/courses/class-12',
    neetDropper: '/courses/neet-dropper',
    foundation: '/courses/foundation',
    class9Foundation: '/courses/class-9-foundation',
    class10Foundation: '/courses/class-10-foundation',
  },

  // Board Preparation
  boards: {
    cbse: '/boards/cbse',
    icse: '/boards/icse',
    igcse: '/boards/igcse',
    ib: '/boards/ib',
    stateBoards: '/boards/state-boards',
  },

  // Services
  services: {
    onlineClasses: '/services/online-classes',
    classroom: '/services/classroom',
    international: '/services/international',
    boardPrep: '/services/board-prep',
    doubtResolution: '/services/doubt-resolution',
  },

  // Company
  company: {
    drShekharSingh: '/dr-shekhar-singh',
    faculty: '/faculty',
    testimonials: '/testimonials',
    results: '/results',
    gallery: '/gallery',
    blog: '/blog',
  },

  // Support
  support: {
    demo: '/support/demo',
    demoBooking: '/demo-booking',
    help: '/help',
  },

  // Admissions
  admissions: '/admissions',

  // Resources
  mockTests: '/mock-tests',
  aiEducation: '/ai-education-demo',
  biologyNotes: '/biology-notes',

  // Legal
  legal: {
    privacyPolicy: '/privacy-policy',
    termsOfService: '/terms-of-service',
    refundPolicy: '/refund-policy',
    disclaimer: '/disclaimer',
  },

  // External Links
  external: {
    facebook: 'https://www.facebook.com/people/Cerebrum-Biology-Academy/100063640374134/',
    instagram: 'https://www.instagram.com/cerebrumbiologyacademy/',
    youtube: 'https://www.youtube.com/channel/UCzTybzV6CmTuestvWo2bRQw',
    twitter: 'https://twitter.com/shekharsingh',
    whatsapp: (message?: string) =>
      `https://wa.me/918826444334${message ? `?text=${encodeURIComponent(message)}` : ''}`,
    telegram: 'https://t.me/cerebrumbiologyacademy',
  },

  // Contact
  phone: {
    primary: 'tel:+918826444334',
    secondary: 'tel:+918826444334',
  },

  email: 'mailto:info@cerebrumbiologyacademy.com',
} as const

/**
 * Helper function to build dynamic routes
 */
export const buildRoute = {
  locality: (city: string, locality: string) => `/locations/${city}/${locality}`,
  blogPost: (slug: string) => `/blog/${slug}`,
  courseDetail: (courseId: string) => `/courses/${courseId}`,
  biologyNote: (slug: string) => `/biology-notes/${slug}`,
} as const

/**
 * Navigation menu structure for consistent navigation across components
 */
export const navigationMenus = {
  main: [
    { label: 'Home', href: routes.home },
    { label: 'Courses', href: routes.courses.main },
    { label: 'About', href: routes.about },
    { label: 'Contact', href: routes.contact },
  ],

  courses: [
    { label: 'Class 11th Biology', href: routes.courses.class11 },
    { label: 'Class 12th Biology', href: routes.courses.class12 },
    { label: 'NEET Dropper Program', href: routes.courses.neetDropper },
    { label: 'Foundation Course (9th-10th)', href: routes.courses.foundation },
    { label: 'Class 9th Foundation', href: routes.courses.class9Foundation },
    { label: 'Class 10th Foundation', href: routes.courses.class10Foundation },
  ],

  boards: [
    { label: 'CBSE Biology', href: routes.boards.cbse },
    { label: 'ICSE Biology', href: routes.boards.icse },
    { label: 'IGCSE Biology', href: routes.boards.igcse },
    { label: 'IB Biology', href: routes.boards.ib },
    { label: 'State Board Biology', href: routes.boards.stateBoards },
  ],

  services: [
    { label: 'Online Live Classes', href: routes.services.onlineClasses },
    { label: 'Classroom Programs', href: routes.services.classroom },
    { label: 'NEET Mock Tests', href: routes.mockTests },
    { label: 'Ceri AI', href: routes.aiEducation },
    { label: 'International Students', href: routes.services.international },
    { label: 'Board Exam Preparation', href: routes.services.boardPrep },
    { label: 'Doubt Resolution', href: routes.services.doubtResolution },
  ],

  company: [
    { label: 'About Us', href: routes.about },
    { label: 'Dr. Shekhar Singh', href: routes.company.drShekharSingh },
    { label: 'Our Faculty', href: routes.company.faculty },
    { label: 'Success Stories', href: routes.company.testimonials },
    { label: 'Results', href: routes.company.results },
    { label: 'Photo Gallery', href: routes.company.gallery },
    { label: 'Blog', href: routes.company.blog },
    { label: 'Careers', href: routes.contact },
  ],

  support: [
    { label: 'Contact Us', href: routes.contact },
    { label: 'Help Center', href: routes.support.help },
    { label: 'Book Demo Class', href: routes.support.demoBooking },
    { label: 'Download Brochure', href: routes.contact },
    { label: 'Fee Structure', href: routes.courses.main },
    { label: 'Admission Process', href: routes.admissions },
  ],

  legal: [
    { label: 'Privacy Policy', href: routes.legal.privacyPolicy },
    { label: 'Terms of Service', href: routes.legal.termsOfService },
    { label: 'Refund Policy', href: routes.legal.refundPolicy },
    { label: 'Disclaimer', href: routes.legal.disclaimer },
  ],

  social: [
    { label: 'Facebook', href: routes.external.facebook, icon: 'Facebook' },
    { label: 'Instagram', href: routes.external.instagram, icon: 'Instagram' },
    { label: 'YouTube', href: routes.external.youtube, icon: 'Youtube' },
    { label: 'Twitter', href: routes.external.twitter, icon: 'Twitter' },
    {
      label: 'WhatsApp',
      href: routes.external.whatsapp("Hi, I'm interested in NEET Biology coaching"),
      icon: 'MessageCircle',
    },
    { label: 'Telegram', href: routes.external.telegram, icon: 'Send' },
  ],
} as const

/**
 * Type helper to ensure route consistency
 */
export type Route = typeof routes
export type NavigationMenus = typeof navigationMenus
