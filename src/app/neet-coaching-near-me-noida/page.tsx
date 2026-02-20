import { Metadata } from 'next'
import NEETCoachingNearMeNoidaContent from './NEETCoachingNearMeNoidaContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const noidaLocation = CONTACT_INFO.location.noida

export const metadata: Metadata = {
  title: 'NEET Coaching Near Me in Noida | Find Best Biology Classes Nearby',
  description:
    'Looking for NEET coaching near me in Noida? Find the best NEET Biology coaching within 5km. Sector 62 location accessible from Sector 18, 44, 50, 76, Indirapuram, Vaishali. Book free demo today.',
  keywords: [
    'neet coaching near me noida',
    'best neet coaching near me noida',
    'neet biology classes near me',
    'neet coaching centre near me',
    'neet classes near me noida',
    'biology coaching near me noida',
    'medical coaching near me noida',
    'neet preparation near me',
    'neet institute near me noida',
  ],
  openGraph: {
    title: 'NEET Coaching Near Me in Noida | Biology Classes Nearby',
    description:
      'Find the best NEET coaching near you in Noida. Central Sector 62 location, accessible from all major areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-noida',
  },
}

const faqs = [
  {
    question: 'Where is the nearest NEET coaching in Noida?',
    answer:
      'Cerebrum Biology Academy is located in Sector 62, Noida - centrally positioned and accessible from all major areas including Sector 18, 44, 50, 76, 78, Indirapuram, Vaishali, and Greater Noida West within 15-20 minutes.',
  },
  {
    question: 'How far is your coaching from my area?',
    answer:
      'We are within 5-10 km from most Noida localities. Sector 62: 1-3 km, Sector 50: 4-6 km, Sector 44: 5-8 km, Indirapuram: 8-12 km, Greater Noida West: 10-14 km. Use Google Maps for exact distance from your location.',
  },
  {
    question: 'Is there parking available near the coaching center?',
    answer:
      'Yes, our Sector 62 location has ample parking space for both two-wheelers and four-wheelers. The area also has designated visitor parking which students can use during class hours.',
  },
  {
    question: 'Which metro station is nearest to your coaching?',
    answer:
      'Sector 62 Metro Station on the Blue Line is the nearest, approximately a 5-minute walk. We also provide route guidance from Sector 59, Sector 61, and Noida City Centre metro stations.',
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
      'Yes! Our hybrid model allows you to attend some classes online and some offline. Many students from Indirapuram, Vaishali, and Greater Noida West prefer 2 days offline + online support. Full online batches are also available.',
  },
  {
    question: 'What is the best route from Sector 18 Noida?',
    answer:
      'From Sector 18: Take the Blue Line metro to Sector 62 Metro Station. Alternatively, drive via Sector 18 to Sector 62 via the expressway. Google Maps provides real-time traffic updates. Average travel time: 10-15 minutes.',
  },
  {
    question: 'What time should I leave to avoid traffic?',
    answer:
      'For morning batch (6:30 AM start), traffic is minimal. For evening batch (5 PM), leave 20 minutes early from Sector 18/44 area. Weekend batches have no traffic concerns. We share traffic updates in our student WhatsApp group.',
  },
  {
    question: 'Is the area safe for students coming alone?',
    answer:
      'Yes, Sector 62 is a well-developed IT and commercial area of Noida. The area has security, CCTV, and is well-lit. Many female students attend evening batches safely. Parents can wait in the lobby if preferred.',
  },
  {
    question: 'Are there food options near the coaching center?',
    answer:
      'Yes! Several cafes and restaurants within 500m including local eateries and fast food options. Students often use the break time for meals. Sector 62 market area is very close with multiple food options.',
  },
  {
    question: 'What facilities are available at the coaching center?',
    answer:
      'Our center has AC classrooms, projector-based teaching, drinking water, clean washrooms, waiting area for parents, free WiFi, and a small library. We also have a doubt room where students can study after classes.',
  },
]

export default function NEETCoachingNearMeNoidaPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - NEET Coaching Near Me Noida',
    description:
      'Best NEET Biology coaching center in Noida. Centrally located in Sector 62, accessible from all major areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-noida',
    telephone: '+919953643938',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-45, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'UP',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6271,
      longitude: 77.3683,
    },
    areaServed: [{ '@type': 'City', name: 'Noida' }],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.6271,
        longitude: 77.3683,
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Near Me',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-noida',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NEETCoachingNearMeNoidaContent faqs={faqs} />
    </>
  )
}
