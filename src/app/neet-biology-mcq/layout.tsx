import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free NEET Biology MCQ Practice 2025 | 7000+ NCERT Questions & PYQs',
  description:
    'Practice 7000+ free NEET Biology MCQs online. NCERT-based questions, Previous Year Questions (2018-2024), diagram-based questions. Chapter-wise practice with instant feedback, explanations & XP rewards. Start practicing now!',
  keywords: [
    'NEET Biology MCQ',
    'free NEET Biology questions',
    'NCERT Biology MCQ',
    'NEET PYQ Biology',
    'Biology MCQ practice online',
    'NEET 2026 Biology',
    'NEET 2026 Biology preparation',
    'chapter-wise Biology MCQ',
    'Human Physiology MCQ NEET',
    'Ecology MCQ NEET',
    'Genetics MCQ NEET',
    'free NEET Biology test',
    'NEET Biology quiz',
    'Biology practice questions',
    'NCERT based NEET questions',
    'diagram based Biology questions',
    'NEET Biology previous year questions',
    'NEET botany MCQ',
    'NEET zoology MCQ',
    'Reproduction MCQ NEET',
    'Cell Biology MCQ',
    'Plant Physiology MCQ',
  ],
  openGraph: {
    title: 'Free NEET Biology MCQ Practice | 7000+ Questions',
    description:
      'Practice 7000+ free NEET Biology MCQs. NCERT-based questions, PYQs (2018-2024), diagram questions. Unlimited free practice with instant feedback!',
    url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq',
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
    images: [
      {
        url: '/api/og?title=NEET+Biology+MCQ+Practice&subtitle=7000%2B+Free+Questions+%E2%80%A2+NCERT+%26+PYQs',
        width: 1200,
        height: 630,
        alt: 'Free NEET Biology MCQ Practice - 7000+ Questions with NCERT & PYQs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free NEET Biology MCQ Practice | 7000+ Questions',
    description:
      'Practice 7000+ free NEET Biology MCQs. NCERT-based, PYQs, diagram questions. Unlimited free practice!',
    images: ['/api/og?title=NEET+Biology+MCQ+Practice&subtitle=7000%2B+Free+Questions'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-biology-mcq',
  },
  robots: 'index, follow, max-image-preview:large',
}

// Comprehensive structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    // WebPage schema
    {
      '@type': 'WebPage',
      '@id': 'https://cerebrumbiologyacademy.com/neet-biology-mcq#webpage',
      url: 'https://cerebrumbiologyacademy.com/neet-biology-mcq',
      name: 'Free NEET Biology MCQ Practice 2025 | 7000+ NCERT Questions & PYQs',
      description:
        'Practice 7000+ free NEET Biology MCQs online. NCERT-based questions, PYQs, diagram-based questions with instant feedback.',
      isPartOf: {
        '@id': 'https://cerebrumbiologyacademy.com/#website',
      },
      breadcrumb: {
        '@id': 'https://cerebrumbiologyacademy.com/neet-biology-mcq#breadcrumb',
      },
      mainEntity: {
        '@id': 'https://cerebrumbiologyacademy.com/neet-biology-mcq#quiz',
      },
    },
    // BreadcrumbList schema
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://cerebrumbiologyacademy.com/neet-biology-mcq#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://cerebrumbiologyacademy.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'NEET Biology MCQ Practice',
          item: 'https://cerebrumbiologyacademy.com/neet-biology-mcq',
        },
      ],
    },
    // Quiz/LearningResource schema
    {
      '@type': 'Quiz',
      '@id': 'https://cerebrumbiologyacademy.com/neet-biology-mcq#quiz',
      name: 'Free NEET Biology MCQ Practice',
      description:
        'Free unlimited NEET Biology MCQ practice with 7000+ questions including 3375+ NCERT-based questions, 500+ Previous Year Questions (2018-2024), and 248+ diagram-based questions.',
      educationalLevel: 'High School (Class 11-12)',
      educationalUse: ['Practice', 'Self Assessment'],
      learningResourceType: 'Quiz',
      interactivityType: 'active',
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'NEET Aspirants',
      },
      about: [
        { '@type': 'Thing', name: 'NEET Biology' },
        { '@type': 'Thing', name: 'NCERT Biology Class 11' },
        { '@type': 'Thing', name: 'NCERT Biology Class 12' },
        { '@type': 'Thing', name: 'Medical Entrance Examination' },
      ],
      provider: {
        '@type': 'Organization',
        name: 'Cerebrum Biology Academy',
        url: 'https://cerebrumbiologyacademy.com',
        logo: 'https://cerebrumbiologyacademy.com/logo.png',
      },
      isAccessibleForFree: true,
      inLanguage: 'en',
    },
    // FAQPage schema
    {
      '@type': 'FAQPage',
      '@id': 'https://cerebrumbiologyacademy.com/neet-biology-mcq#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many free NEET Biology MCQs are available for practice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer 7000+ free NEET Biology MCQs including 3375+ NCERT-based questions organized chapter-wise, 500+ authentic Previous Year Questions (PYQs) from NEET 2018-2024, and 248+ diagram-based questions. All questions are completely free with unlimited practice.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are these MCQs aligned with NEET 2026 syllabus?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, all our MCQs are aligned with the latest NEET 2026 syllabus and NCERT textbooks for Class 11 and 12 Biology. Questions are organized chapter-wise matching the official NCERT curriculum and include NEET weightage indicators.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I practice NEET Biology Previous Year Questions (PYQs)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! We have 500+ authentic Previous Year Questions from NEET 2018-2024. You can filter by specific year to practice questions from any particular NEET exam and understand the exam pattern.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this NEET Biology MCQ practice completely free?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely! Our NEET Biology MCQ practice is 100% free with no limits, no hidden charges, and no mandatory registration. Practice unlimited questions, track your progress with XP and levels, compete on leaderboards, and build daily streaks - all completely free!',
          },
        },
        {
          '@type': 'Question',
          name: 'What Biology topics are covered in the MCQ practice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We cover all 5 units of NEET Biology syllabus: Unit 1 - Diversity in Living World, Unit 2 - Structural Organization in Plants & Animals, Unit 3 - Cell Structure and Function, Unit 4 - Plant Physiology, Unit 5 - Human Physiology (Class 11), and Reproduction, Genetics & Evolution, Biology in Human Welfare, Biotechnology, Ecology (Class 12).',
          },
        },
        {
          '@type': 'Question',
          name: 'How many questions are asked from Biology in NEET?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'NEET has 90 questions from Biology (45 from Botany and 45 from Zoology). Biology carries 360 marks out of 720 total marks, making it the highest-scoring subject in NEET. Regular MCQ practice is essential for scoring well.',
          },
        },
      ],
    },
    // SoftwareApplication schema for the practice tool
    {
      '@type': 'SoftwareApplication',
      name: 'NEET Biology MCQ Practice Tool',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'INR',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        ratingCount: '38',
        bestRating: '5',
        worstRating: '1',
      },
    },
  ],
}

export default function NEETBiologyMCQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {children}
    </>
  )
}
