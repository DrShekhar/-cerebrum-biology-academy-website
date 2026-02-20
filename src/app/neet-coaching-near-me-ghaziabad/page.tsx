import { Metadata } from 'next'
import NEETCoachingNearMeGhaziabadContent from './NEETCoachingNearMeGhaziabadContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

export const metadata: Metadata = {
  title: 'NEET Coaching Near Me in Ghaziabad | Find Best Biology Classes Nearby',
  description:
    'Looking for NEET coaching near me in Ghaziabad? Find the best NEET Biology coaching. Sector 62 Noida center accessible via Blue Line Metro from Vaishali, Kaushambi, Indirapuram. Book free demo today.',
  keywords: [
    'neet coaching near me ghaziabad',
    'best neet coaching near me ghaziabad',
    'neet biology classes near me',
    'neet coaching centre near me',
    'neet classes near me ghaziabad',
    'biology coaching near me ghaziabad',
    'medical coaching near me ghaziabad',
    'neet preparation near me',
    'neet institute near me ghaziabad',
    'neet coaching indirapuram',
  ],
  openGraph: {
    title: 'NEET Coaching Near Me in Ghaziabad | Biology Classes Nearby',
    description:
      'Find the best NEET coaching near you in Ghaziabad. Sector 62 Noida location, accessible via Blue Line Metro from all Ghaziabad areas.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-ghaziabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-ghaziabad',
  },
}

const faqs = [
  {
    question: 'Where is the nearest NEET coaching for Ghaziabad students?',
    answer:
      'Cerebrum Biology Academy is located at B-45, Sector 62, Noida - accessible from all Ghaziabad areas via Blue Line Metro. Vaishali and Kaushambi metro stations connect directly to Sector 62 Noida within 15-20 minutes.',
  },
  {
    question: 'How far is your coaching from Ghaziabad areas?',
    answer:
      'We are easily accessible from all major Ghaziabad localities via Blue Line Metro: Vaishali: 2-3 metro stops, Kaushambi: 2-3 metro stops, Indirapuram: 20-25 min via cab, Raj Nagar Extension: 25-30 min, Vasundhara: 20-25 min, Crossings Republik: 30-35 min.',
  },
  {
    question: 'Is there parking available near the coaching center?',
    answer:
      'Yes, our Sector 62 Noida location has ample parking space for both two-wheelers and four-wheelers. The area also has designated visitor parking which students can use during class hours.',
  },
  {
    question: 'Which metro station is nearest to your coaching?',
    answer:
      'Sector 62 Metro Station on the Blue Line is the nearest, approximately a 5-minute walk. Ghaziabad students can take the Blue Line from Vaishali or Kaushambi stations directly to Sector 62.',
  },
  {
    question: 'Do you offer pick-up/drop facility for Ghaziabad students?',
    answer:
      'While we dont offer direct pick-up service, the Blue Line Metro makes the commute very convenient from Ghaziabad. We also help connect students from the same area for convenient carpooling. Online classes are available for those preferring to study from home.',
  },
  {
    question: 'What are the batch timings for students coming from Ghaziabad?',
    answer:
      'We offer flexible timings: Morning batch (6:30-8:30 AM), Evening batch (5:00-7:00 PM), and Weekend batches (full day). Students from Ghaziabad often prefer weekend batches or evening batches after metro rush hour.',
  },
  {
    question: 'Is online option available if I cant travel daily?',
    answer:
      'Yes! Our hybrid model allows you to attend some classes online and some offline. Many students from distant Ghaziabad areas like Crossings Republik and Raj Nagar Extension prefer 2 days offline + online support. Full online batches are also available.',
  },
  {
    question: 'What is the best route from Indirapuram to your center?',
    answer:
      'From Indirapuram: Take the Blue Line Metro from Vaishali or Kaushambi station to Sector 62. Alternatively, take NH-24/58 to Sector 62 Noida. Google Maps provides real-time traffic updates. Average travel time: 20-25 minutes.',
  },
  {
    question: 'What time should I leave to avoid traffic from Ghaziabad?',
    answer:
      'For morning batch (6:30 AM start), traffic is minimal. For evening batch (5 PM), the Blue Line Metro avoids road traffic entirely. Weekend batches have no traffic concerns. We share updates in our student WhatsApp group.',
  },
  {
    question: 'Is the area safe for students coming alone from Ghaziabad?',
    answer:
      'Yes, Sector 62 is a well-developed commercial area of Noida. The area has security, CCTV, and is well-lit. Many female students attend evening batches safely. Parents can wait in the lobby if preferred.',
  },
  {
    question: 'Are there food options near the coaching center?',
    answer:
      'Yes! Several cafes and restaurants within 500m including local eateries and fast food options. Students often use the break time for meals. Sector 62 market is very close with multiple food options.',
  },
  {
    question: 'What facilities are available at the coaching center?',
    answer:
      'Our center has AC classrooms, projector-based teaching, drinking water, clean washrooms, waiting area for parents, free WiFi, and a small library. We also have a doubt room where students can study after classes.',
  },
]

export default function NEETCoachingNearMeGhaziabadPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - NEET Coaching Near Me Ghaziabad',
    description:
      'Best NEET Biology coaching center. Accessible from Ghaziabad via Blue Line Metro to Sector 62 Noida.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-ghaziabad',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B-45, Sector 62',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 28.6144,
      longitude: 77.3669,
    },
    areaServed: [
      { '@type': 'City', name: 'Ghaziabad' },
      { '@type': 'City', name: 'Noida' },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.6144,
        longitude: 77.3669,
      },
      geoRadius: '20000',
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
        name: 'NEET Coaching Ghaziabad',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Near Me',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-ghaziabad',
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
      <NEETCoachingNearMeGhaziabadContent faqs={faqs} />
    </>
  )
}
