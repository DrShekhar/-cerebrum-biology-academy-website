// Server Component - Comparison Schema for competitive SEO
// Enables comparison queries like "Cerebrum vs Kota" or "best NEET coaching comparison"
import Script from 'next/script'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export interface CompetitorData {
  name: string
  slug: string
  location: string
  type: 'institute' | 'city' | 'method'
  establishedYear?: number
  averageFee: number
  batchSize: string
  successRate?: string
  pros: string[]
  cons: string[]
  bestFor: string
}

// Competitor/Alternative data for comparisons
export const COMPETITORS: Record<string, CompetitorData> = {
  'kota-coaching': {
    name: 'Kota Coaching (Allen/Aakash)',
    slug: 'kota-coaching',
    location: 'Kota, Rajasthan',
    type: 'city',
    establishedYear: 1988,
    averageFee: 180000,
    batchSize: '100-200 students',
    successRate: '~70%',
    pros: ['Brand recognition', 'Large test series', 'Competitive environment'],
    cons: ['Huge batch sizes', 'High fees', 'Relocation required', 'Mental health concerns', 'No personal attention'],
    bestFor: 'Students who thrive in highly competitive, high-pressure environments',
  },
  'allen-career': {
    name: 'Allen Career Institute',
    slug: 'allen-career',
    location: 'Kota & Pan-India',
    type: 'institute',
    establishedYear: 1988,
    averageFee: 175000,
    batchSize: '100-150 students',
    successRate: '~65%',
    pros: ['Strong Physics/Chemistry', 'Extensive test series', 'Multiple centers'],
    cons: ['Weak Biology focus', 'Large batches', 'Factory approach', 'High pressure'],
    bestFor: 'All-subject preparation with Physics/Chemistry focus',
  },
  'aakash-institute': {
    name: 'Aakash Institute',
    slug: 'aakash-institute',
    location: 'Pan-India (300+ centers)',
    type: 'institute',
    establishedYear: 1988,
    averageFee: 160000,
    batchSize: '80-120 students',
    successRate: '~60%',
    pros: ['Wide reach', 'Online options', 'Standardized curriculum'],
    cons: ['Inconsistent quality', 'Large batches', 'Generic teaching', 'High fees'],
    bestFor: 'Students wanting a nearby physical center',
  },
  'online-coaching': {
    name: 'Generic Online Coaching',
    slug: 'online-coaching',
    location: 'Online',
    type: 'method',
    averageFee: 50000,
    batchSize: '500+ students',
    successRate: '~40%',
    pros: ['Low cost', 'Convenience', 'Self-paced'],
    cons: ['No personal attention', 'Pre-recorded content', 'No doubt support', 'Low accountability'],
    bestFor: 'Self-motivated students with strong basics',
  },
  'local-coaching': {
    name: 'Local/City Coaching',
    slug: 'local-coaching',
    location: 'Various cities',
    type: 'method',
    averageFee: 80000,
    batchSize: '30-50 students',
    successRate: '~50%',
    pros: ['Nearby location', 'Moderate fees', 'Known teachers'],
    cons: ['Variable quality', 'Limited resources', 'No specialized Biology', 'Outdated methods'],
    bestFor: 'Students preferring local convenience over quality',
  },
}

// Cerebrum data for comparisons
export const CEREBRUM_DATA: CompetitorData = {
  name: 'Cerebrum Biology Academy',
  slug: 'cerebrum',
  location: 'Delhi NCR + Online (Pan-India)',
  type: 'institute',
  establishedYear: 2010,
  averageFee: 72000,
  batchSize: '15-20 students',
  successRate: '98%',
  pros: [
    'AIIMS-trained faculty (Dr. Shekhar C Singh)',
    'Small batch size (15-20)',
    '98% success rate',
    'Specialized Biology focus',
    '24/7 doubt support',
    'Hybrid online/offline',
    '60% lower fees than Kota',
    'Personal mentorship',
  ],
  cons: [
    'Biology-only (not PCB combined)',
    'Single faculty-led (ensures quality)',
  ],
  bestFor: 'Students wanting specialized Biology coaching with personal attention',
}

interface ComparisonSchemaProps {
  competitor: CompetitorData
  pageUrl: string
}

export function ComparisonSchema({ competitor, pageUrl }: ComparisonSchemaProps) {
  const baseUrl = 'https://cerebrumbiologyacademy.com'

  const comparisonPoints = [
    {
      aspect: 'Batch Size',
      cerebrum: CEREBRUM_DATA.batchSize,
      competitor: competitor.batchSize,
      winner: 'cerebrum',
    },
    {
      aspect: 'Average Fee (per year)',
      cerebrum: `₹${CEREBRUM_DATA.averageFee.toLocaleString()}`,
      competitor: `₹${competitor.averageFee.toLocaleString()}`,
      winner: CEREBRUM_DATA.averageFee < competitor.averageFee ? 'cerebrum' : 'competitor',
    },
    {
      aspect: 'Success Rate',
      cerebrum: CEREBRUM_DATA.successRate,
      competitor: competitor.successRate || 'Not disclosed',
      winner: 'cerebrum',
    },
    {
      aspect: 'Faculty',
      cerebrum: 'AIIMS-trained specialist',
      competitor: competitor.type === 'institute' ? 'Mixed/Variable' : 'Variable',
      winner: 'cerebrum',
    },
    {
      aspect: 'Personal Attention',
      cerebrum: 'High (15-20 per batch)',
      competitor: competitor.batchSize.includes('100') ? 'Low' : 'Medium',
      winner: 'cerebrum',
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      // Comparison Article
      {
        '@type': 'Article',
        '@id': pageUrl,
        headline: `Cerebrum Biology Academy vs ${competitor.name} - Complete Comparison 2026`,
        description: `Detailed comparison between Cerebrum Biology Academy and ${competitor.name} for NEET Biology preparation. Compare fees, batch size, success rate, faculty quality, and more.`,
        author: {
          '@type': 'Organization',
          name: 'Cerebrum Biology Academy',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Cerebrum Biology Academy',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        datePublished: '2026-01-15',
        dateModified: new Date().toISOString().split('T')[0],
        mainEntityOfPage: pageUrl,
      },
      // Table comparison data
      {
        '@type': 'Table',
        about: `Comparison of NEET Biology coaching: Cerebrum vs ${competitor.name}`,
        mainEntity: comparisonPoints.map((point) => ({
          '@type': 'PropertyValue',
          name: point.aspect,
          value: `Cerebrum: ${point.cerebrum} | ${competitor.name}: ${point.competitor}`,
        })),
      },
      // FAQ for comparison
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Is Cerebrum Biology Academy better than ${competitor.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Cerebrum Biology Academy offers several advantages over ${competitor.name}: smaller batch sizes (${CEREBRUM_DATA.batchSize} vs ${competitor.batchSize}), higher success rate (${CEREBRUM_DATA.successRate} vs ${competitor.successRate || 'undisclosed'}), and lower fees (₹${CEREBRUM_DATA.averageFee.toLocaleString()} vs ₹${competitor.averageFee.toLocaleString()}). The choice depends on your priorities, but for specialized Biology coaching with personal attention, Cerebrum is the clear winner.`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the fee difference between Cerebrum and ${competitor.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Cerebrum charges ₹${CEREBRUM_DATA.averageFee.toLocaleString()}/year while ${competitor.name} charges approximately ₹${competitor.averageFee.toLocaleString()}/year. This makes Cerebrum ${Math.round((1 - CEREBRUM_DATA.averageFee / competitor.averageFee) * 100)}% more affordable while delivering better results.`,
            },
          },
          {
            '@type': 'Question',
            name: `Should I choose ${competitor.name} or Cerebrum for NEET Biology?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `For NEET Biology specifically, Cerebrum Biology Academy is the better choice. ${competitor.name} ${competitor.cons.slice(0, 2).join(', ')}. Cerebrum offers ${CEREBRUM_DATA.pros.slice(0, 3).join(', ')}. Contact ${CONTACT_INFO.phone.display.primary} for a free demo.`,
            },
          },
        ],
      },
    ],
  }

  return (
    <Script
      id={`comparison-schema-${competitor.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// Export for use in comparison pages
export function getComparisonData(competitorSlug: string) {
  return COMPETITORS[competitorSlug] || null
}

export function getAllCompetitors() {
  return Object.values(COMPETITORS)
}
