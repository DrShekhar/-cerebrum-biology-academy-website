import { Metadata } from 'next'
import { SEOLandingPage } from '@/components/seo-landing'
import { neetGuideSEOPages } from '@/data/seo-landing'

const content = neetGuideSEOPages['how-to-prepare-for-neet-online']

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
  keywords: content.keywords,
  openGraph: {
    title: content.title,
    description: content.metaDescription,
    type: 'website',
    url: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: content.title,
    description: content.metaDescription,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/${content.slug}`,
  },
}

export default function Page() {
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Prepare for NEET Online from Home',
    description: 'Complete guide to prepare for NEET exam online with effective self-study strategies, time management tips, and expert guidance.',
    totalTime: 'P12M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: '25000-60000',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Set Up Your Study Environment',
        text: 'Create a dedicated study space at home free from distractions. Ensure good lighting, comfortable seating, stable internet connection, and all required study materials within reach.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Choose Quality Online Resources',
        text: 'Select reputed online coaching platforms with live classes, recorded lectures, and doubt-solving support. Cerebrum Academy offers comprehensive online NEET Biology classes with AIIMS faculty.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Create a Strict Daily Schedule',
        text: 'Allocate 8-10 hours daily for NEET preparation. Follow fixed timings like a classroom schedule. Include breaks every 45-50 minutes using the Pomodoro technique.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Master NCERT Textbooks First',
        text: 'Read NCERT thoroughly before using any other resource. 95% of Biology questions and many Physics/Chemistry concepts come directly from NCERT.',
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: 'Practice with Online Test Series',
        text: 'Take regular online mock tests to simulate exam conditions. Analyze performance reports, identify weak topics, and track improvement over time.',
      },
      {
        '@type': 'HowToStep',
        position: 6,
        name: 'Use Digital Tools for Doubt Resolution',
        text: 'Utilize online doubt-solving features, WhatsApp groups, and discussion forums. Dont let doubts accumulate - resolve them immediately.',
      },
      {
        '@type': 'HowToStep',
        position: 7,
        name: 'Stay Motivated and Connected',
        text: 'Join online study groups with fellow NEET aspirants. Attend live mentorship sessions. Maintain regular communication with teachers and peers.',
      },
      {
        '@type': 'HowToStep',
        position: 8,
        name: 'Maintain Physical and Mental Health',
        text: 'Take regular breaks, exercise daily, eat healthy meals, and sleep 7-8 hours. Online preparation can be isolating - stay connected with family and friends.',
      },
    ],
    tool: [
      { '@type': 'HowToTool', name: 'Laptop or tablet with stable internet' },
      { '@type': 'HowToTool', name: 'NCERT Textbooks (Class 11 & 12)' },
      { '@type': 'HowToTool', name: 'Online coaching subscription' },
      { '@type': 'HowToTool', name: 'Mock test series access' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(content.schema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <SEOLandingPage content={content} />
    </>
  )
}
