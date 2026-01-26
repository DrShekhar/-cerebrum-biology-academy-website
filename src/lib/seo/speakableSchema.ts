// src/lib/seo/speakableSchema.ts
// Speakable Property for Voice Search Optimization (AEO)

interface SpeakablePageData {
  headline: string
  description: string
  url: string
  speakableSections?: string[] // CSS selectors for speakable content
  speakableXpath?: string[] // XPath selectors (alternative)
}

/**
 * Generate WebPage schema with Speakable property
 * Optimizes content for voice assistants (Google Assistant, Alexa, Siri)
 */
export function generateSpeakableWebPageSchema(page: SpeakablePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.headline,
    description: page.description,
    url: page.url,
    speakable: {
      '@type': 'SpeakableSpecification',
      ...(page.speakableSections && { cssSelector: page.speakableSections }),
      ...(page.speakableXpath && { xpath: page.speakableXpath }),
    },
    mainEntity: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
    },
  }
}

// Article with speakable content (for blog posts)
interface SpeakableArticleData {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified?: string
  author: string
  image?: string
  speakableSections?: string[]
}

/**
 * Generate Article schema with Speakable property
 * For blog posts optimized for voice search
 */
export function generateSpeakableArticleSchema(article: SpeakableArticleData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://cerebrumbiologyacademy.com/faculty',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/brain-logo.png',
      },
    },
    image: article.image || 'https://cerebrumbiologyacademy.com/images/blog/default.jpg',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: article.speakableSections || [
        '.article-headline',
        '.article-summary',
        '.key-points',
      ],
    },
  }
}

// Pre-configured speakable pages
export const speakablePages = {
  home: {
    headline: 'Best NEET Biology Coaching in Delhi NCR',
    description:
      'Cerebrum Biology Academy offers top NEET Biology coaching with 98% success rate. AIIMS faculty, small batches, 5 centers in Delhi NCR.',
    url: 'https://cerebrumbiologyacademy.com',
    speakableSections: ['.hero-headline', '.hero-subheadline', '.trust-signals', '.faq-section'],
  },
  courses: {
    headline: 'NEET Biology Courses - Class 9 to Dropper',
    description:
      'Comprehensive NEET Biology courses for Class 9, 10, 11, 12 and droppers. Foundation to advanced programs with expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/courses',
    speakableSections: ['.course-overview', '.course-features', '.pricing-section'],
  },
  faculty: {
    headline: 'AIIMS-Trained Faculty at Cerebrum Biology Academy',
    description:
      'Learn from Dr. Shekhar C Singh, AIIMS alumnus with 14+ years experience and our team of expert Biology teachers.',
    url: 'https://cerebrumbiologyacademy.com/faculty',
    speakableSections: ['.faculty-intro', '.faculty-credentials'],
  },
  results: {
    headline: 'NEET 2023 Results - 98% Success Rate',
    description:
      'Our students scored up to 695/720 in NEET 2023. 500+ medical college selections including AIIMS, JIPMER, and state medical colleges.',
    url: 'https://cerebrumbiologyacademy.com/results',
    speakableSections: ['.results-summary', '.top-scorers', '.success-statistics'],
  },
}

/**
 * Generate all speakable schemas for main pages
 */
export function generateAllSpeakableSchemas() {
  return Object.values(speakablePages).map((page) => generateSpeakableWebPageSchema(page))
}

/**
 * Generate FAQ schema with Speakable - Optimized for voice assistants
 */
export function generateSpeakableFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.faq-question', '.faq-answer'],
    },
  }
}

// Common FAQs optimized for voice search
export const voiceOptimizedFAQs = [
  {
    question: 'What is the success rate of Cerebrum Biology Academy?',
    answer:
      'Cerebrum Biology Academy has a 98% NEET qualification rate. In NEET 2023, our top student Sadhna Sirin scored 695 out of 720, achieving 100 percentile in Biology.',
  },
  {
    question: 'Who teaches at Cerebrum Biology Academy?',
    answer:
      'The academy is led by Dr. Shekhar C Singh, an AIIMS New Delhi alumnus with 14 years of teaching experience. Our faculty includes PhD holders and medical doctors.',
  },
  {
    question: 'What is the fee for NEET Biology coaching?',
    answer:
      'Course fees range from 58,000 rupees for foundation courses to 78,000 rupees for NEET crash courses. We offer installment options and scholarships for deserving students.',
  },
  {
    question: 'Where is Cerebrum Biology Academy located?',
    answer:
      'We have 5 centers in Delhi NCR: South Extension, Rohini, Gurugram, Green Park, and Faridabad. We also offer online classes for students outside Delhi.',
  },
  {
    question: 'Is there a free demo class available?',
    answer:
      'Yes, we offer free demo classes every week. You can book a slot through our website or WhatsApp to experience our teaching methodology before enrolling.',
  },
  {
    question: 'What is the batch size at Cerebrum Biology Academy?',
    answer:
      'We maintain a maximum batch size of 25 students to ensure personal attention and effective doubt resolution for every student.',
  },
  {
    question: 'Does Cerebrum Biology Academy offer online classes?',
    answer:
      'Yes, we offer live online classes with weekend batches for students outside Delhi NCR. Online courses include recorded lectures, live doubt sessions, and online tests.',
  },
  {
    question: 'What is the best time to start NEET preparation?',
    answer:
      'We recommend starting in Class 11 for comprehensive 2-year preparation. However, our foundation courses for Class 9-10 help build strong fundamentals early.',
  },
]
