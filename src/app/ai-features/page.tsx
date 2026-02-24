/**
 * AI Features Hub - Unified interface for all AI capabilities
 * Created by Agent Workflow System
 * Date: October 18, 2024
 */

import AIFeaturesHub from '@/components/ai/AIFeaturesHub'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Features',
  description:
    'AI-powered study tools including ClaudeChat, Voice Training, and study analytics for NEET Biology',
  keywords: ['AI education', 'ClaudeChat', 'AI tutoring', 'voice training', 'NEET preparation'],
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ai-features',
  },
}

export default function AIFeaturesPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'AI Features', item: 'https://cerebrumbiologyacademy.com/ai-features' },
    ],
  }

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI-Powered Features - Cerebrum Biology Academy',
    description: 'AI-powered study tools including ClaudeChat, Voice Training, and study analytics for NEET Biology preparation.',
    url: 'https://cerebrumbiologyacademy.com/ai-features',
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <AIFeaturesHub />
    </>
  )
}
