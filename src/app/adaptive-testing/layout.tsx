import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adaptive Testing | AI-Powered Assessment | Cerebrum Biology Academy',
  description:
    'AI-powered adaptive testing for NEET Biology preparation. Personalized assessments that adjust to your level for maximum learning efficiency.',
  openGraph: {
    title: 'Adaptive Testing | NEET Practice Tests',
    description:
      'AI-powered adaptive testing for NEET Biology preparation. Practice with personalized question difficulty.',
    type: 'website',
    url: 'https://cerebrumbiologyacademy.com/adaptive-testing',
    siteName: 'Cerebrum Biology Academy',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/adaptive-testing',
  },
}

export default function AdaptiveTestingLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'Adaptive Testing', item: 'https://cerebrumbiologyacademy.com/adaptive-testing' },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Adaptive Testing - Cerebrum Biology Academy',
    description: 'AI-powered adaptive testing for NEET Biology. Personalized assessments that adjust difficulty to your level.',
    url: 'https://cerebrumbiologyacademy.com/adaptive-testing',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
    },
  }

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Cerebrum Adaptive Testing System',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    description: 'AI-powered adaptive testing platform for NEET Biology preparation with personalized difficulty adjustment.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Free for enrolled students',
    },
    creator: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      {children}
    </>
  )
}
