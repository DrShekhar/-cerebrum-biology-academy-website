import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('how-to-prepare-for-neet-in-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'how to prepare for neet in gurugram',
    'neet preparation tips gurugram',
    'neet study plan gurugram',
    'neet preparation guide gurgaon',
    'how to crack neet gurugram',
    'neet preparation strategy',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
  },
}

export default function HowToPrepareForNEETInGurugramPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Prepare for NEET in Gurugram - Complete Guide 2026',
    description: cityData.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
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
    mainEntityOfPage: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Prepare for NEET in Gurugram',
    description: 'Step-by-step guide to prepare for NEET exam while studying in Gurugram. Expert strategy from AIIMS faculty.',
    totalTime: 'P12M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '45000-85000',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Understand NEET Syllabus & Pattern',
        text: 'Familiarize yourself with NEET syllabus covering Physics, Chemistry, and Biology. Biology has 90 questions (360 marks), Physics 45 questions (180 marks), Chemistry 45 questions (180 marks). Total 720 marks.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Master NCERT Textbooks',
        text: 'NCERT is the Bible for NEET. Read Class 11 and 12 NCERT Biology, Physics, and Chemistry thoroughly. 95% of Biology questions come directly from NCERT.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Join Quality Coaching',
        text: 'Enroll in a reputed NEET coaching institute in Gurugram with small batch sizes (15-20 students), experienced faculty, and proven track record. Cerebrum Academy offers specialized Biology coaching.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Create Study Schedule',
        text: 'Dedicate 6-8 hours daily for NEET preparation. Allocate time based on subject weightage: Biology 50%, Physics 25%, Chemistry 25%. Include revision time.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Practice Previous Year Questions',
        text: 'Solve last 10 years NEET papers chapter-wise. Understand question patterns and important topics. This gives you 1800+ authentic practice questions.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Take Regular Mock Tests',
        text: 'Attempt full-length mock tests weekly. Analyze mistakes, identify weak areas, and improve time management. Target 50+ mock tests before exam.',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Revise Regularly',
        text: 'Revise completed chapters every week. Make short notes and flashcards for quick revision. Focus on diagrams, reactions, and formulas.',
      },
      {
        '@type': 'HowToStep',
        position: 8,
        name: 'Stay Healthy & Focused',
        text: 'Maintain good health with proper sleep (7-8 hours), exercise, and balanced diet. Avoid stress through meditation or hobbies. Mental health is crucial for NEET success.',
      },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'NCERT Textbooks (Class 11 & 12)' },
      { '@type': 'HowToTool', name: 'Reference Books (MTG, Trueman)' },
      { '@type': 'HowToTool', name: 'Previous Year Question Papers' },
      { '@type': 'HowToTool', name: 'Mock Test Series' },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'How to Prepare for NEET', item: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram' },
    ],
  }

  const speakableSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'How to Prepare for NEET in Gurugram',
    description: 'Step-by-step NEET preparation guide for Gurugram students with 8 proven strategies.',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.quick-answer', 'article h2'],
    },
    url: 'https://cerebrumbiologyacademy.com/how-to-prepare-for-neet-in-gurugram',
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
      <CityHubPage data={cityData} />
    </>
  )
}
