import { Metadata } from 'next'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import HUDACityCentreMetroContent from './HUDACityCentreMetroContent'

const metroData = {
  name: 'HUDA City Centre',
  slug: 'huda-city-centre',
  lines: ['Yellow Line'],
  lineColors: ['yellow'],
  area: 'Gurugram',
  description:
    'HUDA City Centre is the terminal station of the Yellow Line in Gurugram, serving as the primary gateway from Delhi Metro to Gurugram. Located near Cyber City, DLF Phase 1-5, and MG Road, it connects students from premium Gurugram localities to quality NEET coaching. This is the most convenient metro access point for Gurugram residents seeking NEET preparation.',
  studentCount: '400+',
  coordinates: { lat: '28.4595', lng: '77.0726' },
  nearbyAreas: [
    'Cyber City',
    'DLF Phase 1',
    'DLF Phase 2',
    'DLF Phase 3',
    'DLF Phase 4',
    'DLF Phase 5',
    'MG Road Gurugram',
    'Sector 29',
    'Sector 43',
    'Golf Course Road',
    'Sohna Road',
    'South City',
  ],
  nearestCenter: {
    name: 'Online Classes',
    distance: 'Live from Home',
    line: 'No commute needed',
  },
  commuteDetails: [
    { destination: 'Rajiv Chowk (Central Delhi)', time: '45 min', line: 'Yellow Line Direct' },
    { destination: 'Hauz Khas (South Delhi)', time: '35 min', line: 'Yellow Line Direct' },
    { destination: 'Green Park Center', time: '30 min', line: 'Yellow Line Direct' },
  ],
  faqs: [
    {
      question: 'Is there NEET coaching near HUDA City Centre Metro Station?',
      answer:
        'Yes! Cerebrum Biology Academy offers excellent NEET coaching for students near HUDA City Centre Metro. For Gurugram students, we recommend our online live classes (most popular) or hybrid mode with weekend offline sessions at our Delhi centers. 400+ students from Cyber City, DLF Phases, MG Road, and Golf Course Road area are enrolled with outstanding results.',
    },
    {
      question: 'Which is the best NEET coaching for Gurugram students near HUDA City Centre?',
      answer:
        'Cerebrum Biology Academy is highly rated by Gurugram students. Our online live classes are designed for maximum convenience - study from home without the long Delhi commute. We offer AIIMS faculty teaching, WhatsApp doubt support (7 AM - 11 PM), recorded lectures, and weekly mock tests. 80% of our Gurugram students prefer online mode to save commute time.',
    },
    {
      question: 'What is the fee for NEET coaching for HUDA City Centre area students?',
      answer:
        'NEET Biology coaching fees for Gurugram students: Online classes - Rs 48,000/year (most popular choice for Gurugram). Hybrid mode (online + weekend offline at Green Park center) - Rs 58,000/year. Full offline - Rs 68,000/year. EMI options and scholarships available for deserving students.',
    },
    {
      question: 'Can working professionals from Cyber City join NEET preparation?',
      answer:
        'Absolutely! We have a dedicated evening batch (7-9 PM) perfect for working professionals. Our online mode is ideal for busy IT professionals from Cyber City, DLF Cyber Hub, and MG Road corporate parks. Attend live classes, watch recordings anytime, and get doubt support via WhatsApp. Many working professionals from Gurugram corporate sector successfully prepare for NEET with us.',
    },
    {
      question: 'How do students from DLF areas reach NEET coaching via HUDA City Centre?',
      answer:
        'Students from DLF Phase 1-5 can easily reach HUDA City Centre Metro by auto/cab (5-15 min depending on phase). However, 85% of our DLF area students prefer 100% online mode - live classes from home with same quality teaching. For offline preference, take Yellow Line to Green Park (30 min) for our South Delhi center.',
    },
    {
      question: 'Is there NEET coaching for Golf Course Road and Sohna Road students?',
      answer:
        'Yes! Students from Golf Course Road, Sohna Road, and South City can access HUDA City Centre via cab/auto. We strongly recommend online classes for these areas to save commute time. Our live online batches, recorded lectures, and 24/7 doubt support make quality NEET coaching accessible from home.',
    },
  ],
}

export const metadata: Metadata = {
  title: 'NEET Coaching Near HUDA City Centre Metro | Biology Classes Gurugram',
  description: `NEET Biology coaching near HUDA City Centre Metro Station, Gurugram. ${metroData.studentCount} students enrolled from Cyber City, DLF, MG Road, Golf Course Road. Yellow Line terminal. Online & Offline. AIIMS faculty. Call ${CONTACT_INFO.phone.display.primary}`,
  keywords: [
    'neet coaching near huda city centre metro',
    'neet coaching gurugram cyber city',
    'biology classes gurugram dlf',
    'neet preparation mg road gurgaon',
    'best neet coaching near cyber hub gurugram',
    'neet classes yellow line metro gurugram',
    'neet coaching golf course road gurugram',
    'biology tuition dlf phase gurugram',
    'neet coaching sohna road gurgaon',
    'medical coaching gurugram',
    'online neet coaching gurugram',
    'neet coaching for working professionals gurugram',
  ],
  openGraph: {
    title: 'NEET Coaching Near HUDA City Centre Metro | Cerebrum Biology Academy',
    description: `Online & Offline NEET Biology classes for students near HUDA City Centre Metro. ${metroData.studentCount} students from Gurugram enrolled. Yellow Line gateway to Delhi centers.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-huda-city-centre-metro',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-huda-city-centre-metro',
  },
}

export default function NEETCoachingHUDACityCentreMetroPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: metroData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Near HUDA City Centre Metro',
    description: metroData.description,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-huda-city-centre-metro',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'South Extension Part 2',
      addressLocality: 'New Delhi',
      addressRegion: 'Delhi',
      postalCode: '110049',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: metroData.coordinates.lat,
      longitude: metroData.coordinates.lng,
    },
    areaServed: metroData.nearbyAreas.map((area) => ({
      '@type': 'Place',
      name: area,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '950',
      bestRating: '5',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Gurugram',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'HUDA City Centre Metro',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-huda-city-centre-metro',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HUDACityCentreMetroContent metroData={metroData} />
    </>
  )
}
