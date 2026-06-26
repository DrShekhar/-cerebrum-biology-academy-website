import { Metadata } from 'next'
import USABOCityTemplate from '@/components/usabo/USABOCityTemplate'

const cityName = 'Portland & Oregon'
const citySlug = 'usabo-coaching-portland'
const region = 'Portland Metro + Lake Oswego + Beaverton'
const timezone = 'PT (Pacific)'

export const metadata: Metadata = {
  title: `USABO Coaching Portland | Lincoln, Catlin Gabel & PNW Batches`,
  description: `USABO + IBO coaching for Portland's Lincoln HS, Catlin Gabel and the Beaverton corridor. AIIMS-trained faculty, PT live sessions, multi-city Pacific batches with Seattle and Bay Area peers.`,
  keywords: [
    'USABO coaching portland & oregon',
    'USABO portland & oregon',
    'USA Biology Olympiad portland & oregon',
    'IBO preparation portland & oregon',
    'biology olympiad coaching portland & oregon',
    'USABO tutor portland & oregon',
    'USABO online coaching portland & oregon',
    'AP Biology to USABO portland & oregon',
    'USABO coaching for Lincoln HS students',
    'USABO coaching for Catlin Gabel students',
    'USABO coaching for Oregon Episcopal students',
    'USABO tutor near me',
  ],
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/${citySlug}`,
    languages: {
      en: `https://cerebrumbiologyacademy.com/${citySlug}`,
      'en-US': `https://cerebrumbiologyacademy.com/${citySlug}`,
      'x-default': `https://cerebrumbiologyacademy.com/${citySlug}`,
    },
  },
  openGraph: {
    title: `USABO Coaching for ${cityName} | Cerebrum Biology Academy`,
    description: `USA Biology Olympiad coaching for ${cityName} — AIIMS-trained faculty, ${timezone} live sessions, Open + Semifinal + Finals pathway.`,
    url: `https://cerebrumbiologyacademy.com/${citySlug}`,
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: `USABO Coaching for ${cityName} Students · Cerebrum`,
    description: `USA Biology Olympiad (USABO + IBO) coaching for ${cityName} high school students. Live ${timezone} classes, AIIMS-trained biology specialist faculty.`,
  },
}

const schools = [
  'Lincoln HS',
  'Catlin Gabel School',
  'Oregon Episcopal School',
  'Lake Oswego HS',
  'Sunset HS (Beaverton)',
  'Westview HS (Beaverton)',
  'Jesuit HS',
]

const faqs = [
  {
    question: 'Lincoln or Catlin Gabel students — what level should they start at?',
    answer:
      "Lincoln is Portland's top public STEM programme; Catlin Gabel is the leading independent school. Both provide strong AP Biology foundations for USABO. Start in October for the February Open.",
  },
  {
    question: 'Beaverton / Hillsboro families — planning conversation?',
    answer:
      'The Intel/Nike corridor has growing USABO demand. We discuss: target level, AP Biology bridge, PT evening scheduling, and whether to join multi-city PT batches (with Seattle and Bay Area students).',
  },
  {
    question: 'Can Portland students join Bay Area or Seattle small batches?',
    answer:
      'Yes — all in PT timezone. Multi-city batches provide broader peer interaction and exposure to question-discussion patterns from multiple school systems.',
  },
  {
    question: 'How does USABO coaching complement AP Biology?',
    answer:
      'USABO Open overlaps ~70% with AP Biology. The Semifinal requires Alberts-level depth beyond AP. We build on the AP foundation.',
  },
  {
    question: 'What does USABO coaching cost?',
    answer:
      'Three tiers: Foundation $2,500, Complete Olympiad Year $4,500, and Elite 1:1 Mentoring $6,000 (per USABO cycle).',
  },
]

export default function Page() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
        name: 'USABO Coaching',
        item: 'https://cerebrumbiologyacademy.com/usabo-coaching',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `USABO Coaching — ${cityName}`,
        item: `https://cerebrumbiologyacademy.com/${citySlug}`,
      },
    ],
  }

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `USABO Coaching — ${cityName}`,
    description: `USA Biology Olympiad (USABO Open + Semifinal + National Finals) preparation for high school students in ${region}. AIIMS-trained, biology-only faculty. Live online classes in ${timezone}.`,
    url: `https://cerebrumbiologyacademy.com/${citySlug}`,
    inLanguage: 'en-US',
    educationalLevel: 'High School',
    about: 'USABO - USA Biology Olympiad',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      url: 'https://cerebrumbiologyacademy.com',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: region,
        containedInPlace: { '@type': 'Country', name: 'United States' },
        address: { '@type': 'PostalAddress', addressRegion: 'OR', addressCountry: 'US' },
      },
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <USABOCityTemplate
        cityName={cityName}
        region={region}
        timezone={timezone}
        citySlug={citySlug}
        schools={schools}
        apBiologyCitySlug="portland"
        heroBlurb="Portland's USABO ecosystem centres on Lincoln HS, Catlin Gabel, and Oregon Episcopal — the top STEM programmes in the Pacific Northwest south of Seattle. The Beaverton/Hillsboro corridor (Intel, Nike) adds Indian-American olympiad demand. The smaller PNW cohort means ambitious students benefit from our multi-city small batches."
        rigourBlurb="Portland students share the PT timezone with Seattle and Bay Area, enabling multi-city small-batch sessions for richer peer interaction. OHSU proximity provides research-access opportunities. Our PT evening sessions fit the Oregon school schedule."
        faqs={faqs}
      />
    </>
  )
}
