import { Metadata } from 'next'
import NEETCoachingNearMeContent from './NEETCoachingNearMeContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'NEET Coaching Near Me in Faridabad | Find Best Biology Classes Nearby',
  description:
    'Looking for NEET coaching near me in Faridabad? Find the best NEET Biology coaching within 5km. Sector 17 location accessible from NIT, Old Faridabad, Greater Faridabad. Book free demo today.',
  keywords: [
    'neet coaching near me faridabad',
    'neet coaching near me faridabad',
    'best neet coaching near me',
    'neet biology classes near me',
    'neet coaching centre near me',
    'neet classes near me faridabad',
    'biology coaching near me faridabad',
    'medical coaching near me faridabad',
    'neet preparation near me',
    'neet institute near me faridabad',
  ],
  openGraph: {
    title: 'NEET Coaching Near Me in Faridabad | Biology Classes Nearby',
    description:
      'Find the best NEET coaching near you in Faridabad. Central Sector 17 location, accessible from all major areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-faridabad',
  },
}

const faqs = [
  {
    question: 'Where is the nearest NEET coaching in Faridabad?',
    answer:
      'Cerebrum Biology Academy is located in Sector 17, Faridabad - centrally positioned and accessible from all major areas including NIT Faridabad, Old Faridabad, Greater Faridabad, and Ballabgarh within 15-20 minutes.',
  },
  {
    question: 'How far is your coaching from my area?',
    answer:
      'We are within 5-10 km from most Faridabad localities. Sector 15-17: 1-3 km, NIT Faridabad: 4-6 km, Old Faridabad: 5-8 km, Greater Faridabad: 8-12 km, Ballabgarh: 10-14 km. Use Google Maps for exact distance from your location.',
  },
  {
    question: 'Is there parking available near the coaching center?',
    answer:
      'Yes, our Sector 17 location has ample parking space for both two-wheelers and four-wheelers. The area also has designated visitor parking which students can use during class hours.',
  },
  {
    question: 'Which metro station is nearest to your coaching?',
    answer:
      'Bata Chowk Metro Station on the Violet Line is the nearest, approximately a 5-minute walk. We also provide route guidance from Neelam Chowk Ajronda, Old Faridabad, and Badkhal Mor metro stations.',
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
      'Yes! Our hybrid model allows you to attend some classes online and some offline. Many students from Ballabgarh, Greater Faridabad, and Palwal prefer 2 days offline + online support. Full online batches are also available.',
  },
  {
    question: 'What is the best route from NIT Faridabad?',
    answer:
      'From NIT Faridabad: Take the main road towards Sector 17 via Mathura Road. Alternatively, use Bata Chowk Metro (Violet Line). Google Maps provides real-time traffic updates. Average travel time: 10-15 minutes.',
  },
  {
    question: 'What time should I leave to avoid traffic?',
    answer:
      'For morning batch (6:30 AM start), traffic is minimal. For evening batch (5 PM), leave 20 minutes early from NIT/Old Faridabad area. Weekend batches have no traffic concerns. We share traffic updates in our student WhatsApp group.',
  },
  {
    question: 'Is the area safe for students coming alone?',
    answer:
      'Yes, Sector 17 is a well-developed commercial area of Faridabad. The area has security, CCTV, and is well-lit. Many female students attend evening batches safely. Parents can wait in the lobby if preferred.',
  },
  {
    question: 'Are there food options near the coaching center?',
    answer:
      'Yes! Several cafes and restaurants within 500m including local eateries and fast food options. Students often use the break time for meals. Sector 17 market is very close with multiple food options.',
  },
  {
    question: 'What facilities are available at the coaching center?',
    answer:
      'Our center has AC classrooms, projector-based teaching, drinking water, clean washrooms, waiting area for parents, free WiFi, and a small library. We also have a doubt room where students can study after classes.',
  },
]

export default function NEETCoachingNearMeFaridabadPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - NEET Coaching Near Me Faridabad',
    description:
      'Best NEET Biology coaching center in Faridabad. Centrally located in Sector 17, accessible from all major areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-faridabad',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: faridabadLocation.streetAddress,
      addressLocality: faridabadLocation.addressLocality,
      addressRegion: faridabadLocation.addressRegion,
      postalCode: faridabadLocation.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.4089,
      longitude: 77.3178,
    },
    areaServed: [{ '@type': 'City', name: 'Faridabad' }],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.4089,
        longitude: 77.3178,
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
        name: 'NEET Coaching Faridabad',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Near Me',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-faridabad',
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
      <NEETCoachingNearMeContent faqs={faqs} />
    </>
  )
}
