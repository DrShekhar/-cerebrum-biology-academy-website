import { Metadata } from 'next'
import { IntentLandingPage } from '@/components/seo/IntentLandingPage'
import { getIntentPageData } from '@/data/intent-seo/intent-pages-data'

const pageData = getIntentPageData('how-to-score-360-neet-biology')!

export const metadata: Metadata = {
  title: pageData.metaTitle,
  description: pageData.metaDescription,
  keywords: [
    'how to score 360 in neet biology',
    'neet biology topper strategy',
    'neet biology tips',
    'score full marks neet biology',
    'neet biology preparation strategy',
    'best way to study neet biology',
    'neet biology high score tips',
  ],
  openGraph: {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/how-to-score-360-neet-biology',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/how-to-score-360-neet-biology',
  },
}

export default function HowToScore360NEETBiologyPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Score 360/360 in NEET Biology - Expert Strategy Guide',
    description: pageData.metaDescription,
    author: {
      '@type': 'Person',
      name: 'Dr. Shekhar C Singh',
      url: 'https://cerebrumbiologyacademy.com/dr-shekhar-singh-neet-biology-faculty',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
    },
    datePublished: '2025-01-01',
    dateModified: '2026-01-27',
    mainEntityOfPage: 'https://cerebrumbiologyacademy.com/how-to-score-360-neet-biology',
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Score 360/360 in NEET Biology',
    description: 'Step-by-step strategy to achieve perfect score in NEET Biology. Expert tips from AIIMS faculty with proven results.',
    totalTime: 'P10M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '35000-65000',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Master NCERT Cover-to-Cover',
        text: 'Read NCERT Biology textbooks (Class 11 & 12) thoroughly. Memorize every diagram, example, and table. 95% NEET Biology questions come directly from NCERT. Read at least 3 times completely.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Focus on High-Weightage Chapters',
        text: 'Prioritize chapters like Human Physiology (digestive, circulatory, respiratory systems), Genetics & Evolution, Ecology, and Plant Physiology. These contribute 60%+ of Biology questions.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Create Visual Mnemonics',
        text: 'Make flowcharts, diagrams, and memory tricks for complex topics. Use acronyms for enzyme names, hormone functions, and classification systems. Visual learning improves retention by 65%.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Practice Previous Year Questions',
        text: 'Solve last 15 years NEET Biology questions chapter-wise. Analyze patterns and identify repeated concepts. This gives you 2700+ authentic practice questions.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Master Diagrams and Labeling',
        text: 'Practice all NCERT diagrams without looking - human heart, nephron, DNA replication, digestive system, reproductive organs. NEET frequently asks diagram-based questions.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Learn Scientific Names',
        text: 'Memorize scientific names of organisms mentioned in NCERT. Create lists for plants, animals, bacteria, and diseases. These are easy marks often missed by students.',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Attempt Full-Length Biology Tests',
        text: 'Take weekly Biology-only mock tests (90 questions, 180 minutes). Analyze every wrong answer. Target 85+ marks out of 90 consistently before the exam.',
      },
      {
        '@type': 'HowToStep',
        position: 8,
        name: 'Quick Revision Before Exam',
        text: 'In the last month, revise all 38 chapters systematically. Use flashcards for quick recall. Focus on weak areas identified in mock tests. Maintain confidence and health.',
      },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'NCERT Biology (Class 11 & 12)' },
      { '@type': 'HowToTool', name: 'Previous Year Question Papers' },
      { '@type': 'HowToTool', name: 'Cerebrum Biology Study Material' },
      { '@type': 'HowToTool', name: 'Mock Test Series' },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Biology', item: 'https://cerebrumbiologyacademy.com/neet-biology-coaching' },
      { '@type': 'ListItem', position: 3, name: 'Score 360 in Biology', item: 'https://cerebrumbiologyacademy.com/how-to-score-360-neet-biology' },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How to Score 360 in NEET Biology',
    description: 'Expert 8-step strategy to score full marks in NEET Biology from AIIMS faculty.',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.quick-answer', 'article h2'],
    },
    url: 'https://cerebrumbiologyacademy.com/how-to-score-360-neet-biology',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
      <IntentLandingPage data={pageData} />
    </>
  )
}
