import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IB & IGCSE Biology Tutor Delhi | Cambridge Biology Coaching',
  description:
    'Expert IB Biology and IGCSE Biology tutoring in Delhi NCR. IB DP HL/SL, IGCSE, Cambridge, A-Level Biology coaching. International school students. Vasant Vihar, Defence Colony. Book demo!',
  keywords: [
    'IB Biology tutor Delhi',
    'IGCSE Biology coaching Delhi',
    'IB DP Biology tuition',
    'IB Biology HL tutor',
    'IB Biology SL tutor',
    'IGCSE Biology tutor Gurgaon',
    'Cambridge Biology coaching',
    'A Level Biology tutor Delhi',
    'IB MYP Biology tutor',
    'International school Biology tutor',
    'IB Biology Vasant Vihar',
    'IGCSE Biology Defence Colony',
    'IB Biology home tutor Delhi',
    'IGCSE Biology online tutor',
    'IB Biology IA help Delhi',
    'IGCSE Biology past papers coaching',
    'IB Internal Assessment Biology help',
    'Cambridge IGCSE Biology tuition',
  ],
  openGraph: {
    title: 'IB & IGCSE Biology Tutor Delhi | International Board Coaching',
    description:
      'Expert tutoring for IB DP, IGCSE, Cambridge, A-Level Biology. Specialized coaching for international school students in Delhi NCR.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/courses/ib-igcse-biology',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IB & IGCSE Biology Tutor Delhi | Cambridge Biology Coaching',
    description: 'Expert IB Biology and IGCSE Biology tutoring in Delhi NCR. IB DP HL/SL, IGCSE, Cambridge, A-Level Biology coaching.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/ib-igcse-biology',
  },
}

function IBIGCSESchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'IB & IGCSE Biology Coaching Program',
    description:
      'Specialized Biology coaching for international curriculum students. Covers IB Diploma HL/SL, IB MYP, IGCSE, Cambridge, and A-Level Biology with expert tutors.',
    provider: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: ['IB Diploma', 'IGCSE', 'A-Level'],
    teaches: ['IB Biology HL', 'IB Biology SL', 'IGCSE Biology', 'A-Level Biology'],
    availableLanguage: 'English',
    offers: {
      '@type': 'Offer',
      price: '75000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'offline',
        location: {
          '@type': 'Place',
          name: 'South Extension Center',
          address: 'D 35, South Extension Part 2, New Delhi',
        },
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
      },
    ],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'student',
      audienceType: 'International school students',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default function IBIGCSEBiologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IBIGCSESchema />
      {children}
    </>
  )
}
