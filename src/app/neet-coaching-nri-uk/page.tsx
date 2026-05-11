import { Metadata } from 'next'
import PageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'NEET Coaching for NRI Students in UK | Online Biology Classes',
  description:
    'Online NEET Biology coaching for ~1.9M Indian-origin students in the UK. A-Level + NEET dual prep, GMT/BST-friendly batches, NRI quota MBBS guidance.',
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-nri-uk`,
    languages: {
      'en-GB': `${BASE_URL}/neet-coaching-nri-uk`,
      'en-IN': `${BASE_URL}/neet-coaching-nri-uk`,
    },
  },
  openGraph: {
    title: 'NEET Coaching for NRI Students in UK',
    description:
      'Online NEET Biology coaching for Indian-origin students across UK. A-Level + NEET dual prep. NRI quota MBBS guidance.',
    url: `${BASE_URL}/neet-coaching-nri-uk`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-uk.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in UK — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching for NRI Students in UK',
    description: 'Online NEET Biology coaching for Indian-origin students in UK. Book free demo.',
    creator: '@cerebrumbiology',
    images: [`${BASE_URL}/og-neet-coaching-uk.jpg`],
  },
}

export default async function Page() {
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
        description:
          'Online NEET Biology coaching for Indian-origin students in the UK (~1.9M diaspora).',
        telephone: '+918826444334',
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
        offers: {
          '@type': 'EducationalOccupationalProgram',
          name: 'NEET Biology Coaching',
          description:
            'Online NEET-UG Biology preparation for Indian-origin students across London, Leicester, Birmingham, Manchester, Glasgow and other UK cities.',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can NEET get me into a UK medical school?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. UK medical schools (UCAS) use A-Levels plus UCAT or BMAT for admissions. NEET is not part of the UK med-school process. NEET is the Indian medical entrance exam, used for MBBS/BDS admissions in India, including the 15% NRI quota at eligible Indian medical colleges.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the realistic pathway from NEET to the NHS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It is multi-step: (1) qualify NEET-UG and complete an MBBS degree in India (typically 5.5 years), (2) return to the UK, (3) pass the UKMLA (UK Medical Licensing Assessment) to register with the GMC, (4) apply for UK Foundation training to enter NHS practice. NEET alone does not lead to NHS — it opens the Indian MBBS route, which is one option to eventually practise in the UK.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there a NEET exam centre in the UK?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The NTA does not operate a NEET exam centre in the UK. The nearest overseas centres are Dubai, Abu Dhabi, Sharjah, Manama, Muscat and Doha — most UK candidates fly to one of these, or to India, to sit NEET-UG. We help enrolled students plan registration and exam travel.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I prepare for NEET while doing A-Levels or IGCSE?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Many UK students run A-Level Biology and NEET prep in parallel — the concepts overlap significantly. Our Biology curriculum is NCERT-aligned and adds the NEET-specific depth beyond A-Level syllabus. We work around your school exam calendar.',
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
              text: '15% of seats at eligible Indian medical colleges are reserved for NRI/OCI candidates. We help you understand which colleges offer NRI seats, typical NEET cut-offs for those seats, and broad admission timelines. We are not an admissions consultancy.',
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
            name: 'NEET Coaching in UK',
            item: `${BASE_URL}/neet-coaching-nri-uk`,
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
      <NEETNRIPricingTiers />
    </>
  )
}
