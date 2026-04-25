import { Metadata } from 'next'
import PageContent from './PageContent'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching for NRI Students in Kuwait | Online Biology Classes',
  description:
    'Online NEET Biology coaching for ~1M Indian community in Kuwait. CBSE/ICSE friendly, AST live classes, Kuwait City NEET exam centre, NRI quota MBBS guidance.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-nri-kuwait`,
    languages: {
      'en-KW': `${BASE_URL}/neet-coaching-nri-kuwait`,
      'en-IN': `${BASE_URL}/neet-coaching-nri-kuwait`,
    },
  },
  openGraph: {
    title: 'NEET Coaching for NRI Students in Kuwait',
    description:
      'Online NEET Biology coaching for Indian students across Kuwait City, Salmiya, Jabriya, Hawalli. Kuwait City NEET exam centre. NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-nri-kuwait`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_KW',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-kuwait.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Kuwait — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching for NRI Students in Kuwait',
    description: 'Online NEET Biology coaching for Indian students in Kuwait. Book free demo.',
    creator: '@cerebrumbiology',
    images: [`${BASE_URL}/og-neet-coaching-kuwait.jpg`],
  },
}

export default function Page() {
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Cerebrum Biology Academy',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        sameAs: [
          'https://www.facebook.com/cerebrumbiology',
          'https://www.youtube.com/cerebrumbiology',
          'https://www.instagram.com/cerebrumbiology',
        ],
        foundingDate: '2014',
        description: 'Online NEET Biology coaching for Indian students in Kuwait (~1M diaspora).',
        telephone: '+918826444334',
        areaServed: { '@type': 'Country', name: 'Kuwait' },
        offers: {
          '@type': 'EducationalOccupationalProgram',
          name: 'NEET Biology Coaching',
          description:
            'Online NEET-UG Biology preparation for Indian students in Kuwait City, Salmiya, Jabriya, Hawalli, Fahaheel and other Kuwait areas.',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is there a NEET exam centre in Kuwait?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Kuwait City is one of the 14 official NTA overseas NEET exam centres. Kuwait-based candidates can sit NEET-UG locally without travelling to India or another GCC country.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why would an Indian student in Kuwait take NEET?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'NEET qualifies students for MBBS/BDS admission in Indian medical colleges, including the 15% NRI quota seats. Indian families in Kuwait commonly pursue this pathway for their children to access medical education in India.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are typical class timings for Kuwait students?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Live classes run on AST (UTC+3), typically 5:00–7:30 PM Kuwait time — after school hours. Every session is recorded. Weekend doubt-clearing sessions also available.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which schools in Kuwait do you support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "CBSE and ICSE students from Indian Central School (ICSK), Indian Community School Kuwait, Carmel School, Don Bosco, Bhavan's SIS, United Indian School, Jabriya Indian School, and all Indian-curriculum schools across Kuwait.",
            },
          },
          {
            '@type': 'Question',
            name: 'Do you provide visa or immigration services?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. We are an academic coaching institute only. We do not provide visa, immigration, or legal documentation services. Visa matters should be handled by your family, school, or licensed immigration consultants.',
            },
          },
          {
            '@type': 'Question',
            name: 'What about the NRI quota for Indian MBBS admissions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '15% of seats at eligible Indian medical colleges are reserved for NRI/OCI candidates. We help you understand which colleges offer NRI seats, typical NEET cut-offs, and broad admission timelines. We are not an admissions consultancy.',
            },
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'NRI Coaching',
            item: `${BASE_URL}/nri-coaching`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'NEET Coaching in Kuwait',
            item: `${BASE_URL}/neet-coaching-nri-kuwait`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <PageContent />
    </>
  )
}
