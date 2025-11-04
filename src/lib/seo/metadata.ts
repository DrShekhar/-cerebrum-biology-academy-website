export interface PageMetadata {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

export const seoConfig = {
  siteName: 'Cerebrum Biology Academy',
  siteUrl: 'https://www.cerebrumbiologyacademy.com',
  defaultTitle: 'Cerebrum Biology Academy - NEET Biology Coaching | AI-Powered Learning',
  defaultDescription:
    'Expert NEET biology coaching with AI-powered personalized learning. Join 10,000+ students achieving 95% success rate. Start your free 15-day trial today!',
  defaultOgImage: '/images/og-default.jpg',
  twitterHandle: '@CerebrumBio',
  locale: 'en_IN',
  type: 'website',
}

export const pageMetadata: Record<string, PageMetadata> = {
  home: {
    title: 'Cerebrum Biology Academy - NEET Biology Coaching | AI-Powered Learning',
    description:
      'Expert NEET biology coaching with AI-powered personalized learning. 10,000+ students, 95% success rate, personalized study plans. Start your free 15-day trial today!',
    keywords: [
      'NEET biology coaching',
      'NEET preparation',
      'biology online classes',
      'NEET biology course',
      'AI learning platform',
      'biology tutor',
      'NEET study material',
      'biology test series',
      'NEET mock tests',
      'biology coaching institute',
    ],
    canonical: '/',
  },
  aiEducation: {
    title: 'AI-Powered NEET Biology Learning | Personalized Study Plans',
    description:
      'Experience AI-powered personalized NEET biology learning. Adaptive assessments, instant doubt resolution, topic-wise analysis. Try free demo now!',
    keywords: [
      'AI biology learning',
      'personalized NEET preparation',
      'adaptive learning',
      'AI tutor',
      'intelligent assessment',
      'smart learning platform',
      'AI-powered education',
    ],
    canonical: '/ai-education-demo',
  },
  courses: {
    title: 'NEET Biology Courses - Comprehensive Syllabus Coverage',
    description:
      'Complete NEET biology courses covering all topics: Diversity, Cell Biology, Genetics, Ecology, Human Physiology. Expert faculty, 1000+ practice questions.',
    keywords: [
      'NEET biology syllabus',
      'biology course',
      'NEET curriculum',
      'biology chapters',
      'NEET topics',
      'botany course',
      'zoology course',
      'NEET class 11 biology',
      'NEET class 12 biology',
    ],
    canonical: '/courses',
  },
  about: {
    title: 'About Us - Cerebrum Biology Academy | Expert NEET Faculty',
    description:
      'Learn about Cerebrum Biology Academy - 10+ years of NEET coaching excellence, expert faculty, proven track record of 95% success rate.',
    keywords: [
      'about cerebrum',
      'NEET coaching institute',
      'biology faculty',
      'NEET teachers',
      'coaching center history',
      'academy background',
    ],
    canonical: '/about',
  },
  contact: {
    title: 'Contact Us - Cerebrum Biology Academy | Admissions & Support',
    description:
      'Contact Cerebrum Biology Academy for admissions, course details, or support. Available 24/7 to help you achieve your NEET dreams.',
    keywords: [
      'contact cerebrum',
      'NEET admission',
      'biology coaching support',
      'course inquiry',
      'contact details',
      'academy address',
    ],
    canonical: '/contact',
  },
  enrollment: {
    title: 'Enroll Now - NEET Biology Courses | Cerebrum Academy',
    description:
      'Enroll in NEET biology courses today! Flexible plans starting from ₹999/month. 15-day free trial, no credit card required.',
    keywords: [
      'NEET enrollment',
      'biology course admission',
      'online coaching registration',
      'NEET course fees',
      'admission process',
      'enroll now',
    ],
    canonical: '/enrollment',
  },
  pricing: {
    title: 'NEET Biology Course Fees & Pricing | Affordable Plans',
    description:
      'Transparent pricing for NEET biology courses. Choose from flexible monthly, quarterly, or annual plans. EMI options available. Compare all features.',
    keywords: [
      'NEET course fees',
      'biology coaching cost',
      'course pricing',
      'affordable coaching',
      'EMI options',
      'course plans',
    ],
    canonical: '/pricing',
  },
  resources: {
    title: 'Free NEET Biology Study Materials & Resources',
    description:
      'Access free NEET biology study materials, notes, practice questions, and mock tests. Download PDFs, watch video lectures, and prepare effectively.',
    keywords: [
      'NEET study material',
      'biology notes',
      'free resources',
      'practice questions',
      'NEET PDF',
      'study guides',
    ],
    canonical: '/resources',
  },
  mockTests: {
    title: 'NEET Biology Mock Tests | Practice Test Series',
    description:
      'Take NEET biology mock tests designed by experts. Instant results, detailed solutions, performance analysis. Practice 5000+ NEET pattern questions.',
    keywords: [
      'NEET mock tests',
      'biology test series',
      'practice tests',
      'NEET questions',
      'online test',
      'mock exam',
    ],
    canonical: '/mock-tests',
  },
  testimonials: {
    title: 'Student Success Stories | NEET Toppers Testimonials',
    description:
      'Read success stories from NEET toppers who studied at Cerebrum Biology Academy. Real student reviews, AIR ranks, and achievement testimonials.',
    keywords: [
      'NEET success stories',
      'student testimonials',
      'toppers reviews',
      'student feedback',
      'success rate',
      'NEET results',
    ],
    canonical: '/testimonials',
  },
  faculty: {
    title: 'Expert NEET Biology Faculty | AIIMS Qualified Teachers',
    description:
      'Meet our expert NEET biology faculty team. AIIMS qualified, 10+ years experience, proven track record. Learn from the best in the field.',
    keywords: [
      'NEET faculty',
      'biology teachers',
      'AIIMS faculty',
      'expert teachers',
      'qualified instructors',
      'teaching staff',
    ],
    canonical: '/faculty',
  },
}

export function generateMetadata(pageKey: string): PageMetadata {
  return (
    pageMetadata[pageKey] || {
      title: seoConfig.defaultTitle,
      description: seoConfig.defaultDescription,
      keywords: [],
      canonical: '/',
    }
  )
}

export function generatePageMetadata(pageKey: string) {
  const meta = generateMetadata(pageKey)

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${seoConfig.siteUrl}${meta.canonical}`,
      siteName: seoConfig.siteName,
      images: [
        {
          url: `${seoConfig.siteUrl}${meta.ogImage || seoConfig.defaultOgImage}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: seoConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      site: seoConfig.twitterHandle,
      images: [`${seoConfig.siteUrl}${meta.ogImage || seoConfig.defaultOgImage}`],
    },
    robots: {
      index: !meta.noindex,
      follow: !meta.noindex,
      googleBot: {
        index: !meta.noindex,
        follow: !meta.noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}${meta.canonical}`,
    },
  }
}
