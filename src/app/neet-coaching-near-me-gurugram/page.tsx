import { Metadata } from 'next'
import NEETCoachingNearMeContent from './NEETCoachingNearMeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'NEET Coaching Near Me in Gurugram | Find Best Biology Classes Nearby',
  description:
    'Looking for NEET coaching near me in Gurugram? Find the best NEET Biology coaching within 5km. Sector 51 location accessible from DLF, Sohna Road, Golf Course Road. Book free demo today.',
  keywords: [
    'neet coaching near me gurugram',
    'neet coaching near me gurgaon',
    'best neet coaching near me',
    'neet biology classes near me',
    'neet coaching centre near me',
    'neet classes near me gurugram',
    'biology coaching near me gurgaon',
    'medical coaching near me gurugram',
    'neet preparation near me',
    'neet institute near me gurgaon',
  ],
  openGraph: {
    title: 'NEET Coaching Near Me in Gurugram | Biology Classes Nearby',
    description: 'Find the best NEET coaching near you in Gurugram. Central Sector 51 location, accessible from all major areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-gurugram',
  },
}

const faqs = [
  {
    question: 'Where is the nearest NEET coaching in Gurugram?',
    answer:
      'Cerebrum Biology Academy is located at M2K Corporate Park, Sector 51, Gurugram - centrally positioned and accessible from all major areas including DLF Phases, Golf Course Road, Sohna Road, and MG Road within 15-20 minutes.',
  },
  {
    question: 'How far is your coaching from my area?',
    answer:
      'We are within 5-10 km from most Gurugram localities. DLF Phase 1-5: 8-12 km, Golf Course Road: 5-8 km, Sohna Road: 3-7 km, MG Road: 10-12 km, Nirvana Country: 4-6 km. Use Google Maps for exact distance from your location.',
  },
  {
    question: 'Is there parking available near the coaching center?',
    answer:
      'Yes, M2K Corporate Park has ample parking space for both two-wheelers and four-wheelers. The building also has designated visitor parking which students can use during class hours.',
  },
  {
    question: 'Which metro station is nearest to your coaching?',
    answer:
      'Sector 53-54 Metro Station on the Yellow Line is the nearest, approximately 2 km away. We also provide route guidance from HUDA City Centre, Guru Dronacharya, and MG Road metro stations.',
  },
  {
    question: 'Do you offer pick-up/drop facility?',
    answer:
      'While we dont offer direct pick-up service, many students arrange shared cabs or carpools. We help connect students from the same area for convenient commuting. Online classes are also available for those preferring to study from home.',
  },
  {
    question: 'What are the batch timings for students coming from far areas?',
    answer:
      'We offer flexible timings: Morning batch (6:30-8:30 AM), Evening batch (5:00-7:00 PM), and Weekend batches (full day). Students from distant areas often prefer weekend batches to minimize travel.',
  },
  {
    question: 'Is online option available if I cant travel daily?',
    answer:
      'Yes! Our hybrid model allows you to attend some classes online and some offline. Many students from Manesar, Pataudi, and Sohna prefer 2 days offline + online support. Full online batches are also available.',
  },
]

export default function NEETCoachingNearMeGurugramPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - NEET Coaching Near Me Gurugram',
    description: 'Best NEET Biology coaching center in Gurugram. Centrally located in Sector 51, accessible from all major areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-gurugram',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: gurugramLocation.streetAddress,
      addressLocality: gurugramLocation.addressLocality,
      addressRegion: gurugramLocation.addressRegion,
      postalCode: gurugramLocation.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4595,
      longitude: 77.0266,
    },
    areaServed: [
      { '@type': 'City', name: 'Gurugram' },
      { '@type': 'City', name: 'Gurgaon' },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.4595,
        longitude: 77.0266,
      },
      geoRadius: '15000',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'Near Me', item: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NEETCoachingNearMeContent faqs={faqs} />
    </>
  )
}
