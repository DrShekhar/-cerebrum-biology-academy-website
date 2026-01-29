import { Metadata } from 'next'
import { CONTACT_INFO, getPhoneLink, getDisplayPhone } from '@/lib/constants/contactInfo'
import BotanicalGardenMetroContent from './BotanicalGardenMetroContent'

const metroData = {
  name: 'Botanical Garden',
  slug: 'botanical-garden',
  lines: ['Blue Line', 'Magenta Line'],
  lineColors: ['blue', 'magenta'],
  area: 'Noida',
  description:
    'Botanical Garden Metro is a major interchange station connecting the Blue Line and Magenta Line. Located at the gateway to Noida from Delhi, it serves students from Noida Sector 18, Sector 16, Amity University area, and provides easy access to Greater Noida. It is the perfect hub for Noida students and working professionals preparing for NEET.',
  studentCount: '450+',
  coordinates: { lat: '28.5648', lng: '77.3340' },
  nearbyAreas: [
    'Noida Sector 18',
    'Noida Sector 16',
    'Noida City Centre',
    'Amity University Area',
    'Sector 37 Noida',
    'Sector 38 Noida',
    'Greater Noida West',
    'Noida Extension',
    'Film City Noida',
  ],
  nearestCenter: {
    name: 'Online Classes',
    distance: 'Live from Home',
    line: 'No commute needed',
  },
  commuteDetails: [
    { destination: 'Rajiv Chowk (Central Delhi)', time: '35 min', line: 'Blue Line' },
    { destination: 'Hauz Khas (South Delhi)', time: '45 min', line: 'Blue Line via Magenta' },
    { destination: 'Janakpuri West', time: '55 min', line: 'Blue Line' },
  ],
  faqs: [
    {
      question: 'Is there NEET coaching near Botanical Garden Metro Station?',
      answer:
        'Yes! Cerebrum Biology Academy offers NEET coaching easily accessible from Botanical Garden Metro. For Noida students, we primarily recommend our online live classes (most popular) or hybrid mode with weekend offline sessions. 450+ students from Noida Sector 18, Sector 16, Amity University area, and Greater Noida are enrolled with excellent results.',
    },
    {
      question: 'Which is the best NEET coaching for Noida students near Botanical Garden?',
      answer:
        'Cerebrum Biology Academy is highly rated by Noida students. Our online live classes are designed for convenience - study from home without the commute. We offer AIIMS faculty teaching, WhatsApp doubt support (7 AM - 11 PM), recorded lectures, and weekly mock tests. 85% of our Noida students prefer online mode.',
    },
    {
      question: 'What is the fee for NEET coaching for Botanical Garden Metro area students?',
      answer:
        'NEET Biology coaching fees for Noida students: Online classes - Rs 48,000/year (most popular choice). Hybrid mode (online + weekend offline at South Extension) - Rs 58,000/year. Full offline - Rs 68,000/year. EMI options and scholarships available for deserving students.',
    },
    {
      question: 'Can working professionals near Noida Sector 18 join NEET preparation?',
      answer:
        'Absolutely! We have a dedicated evening batch (7-9 PM) perfect for working professionals. Our online mode is ideal for busy schedules - attend live classes, watch recordings anytime, and get doubt support via WhatsApp. Many working professionals from Noida IT sector successfully prepare for NEET with us.',
    },
    {
      question: 'How do students from Amity University area reach NEET coaching?',
      answer:
        'Students from Amity University area have excellent metro connectivity via Botanical Garden station. However, 80% of our Amity area students prefer 100% online mode - live classes from home with same quality teaching. For offline preference, our South Extension center is reachable via Blue Line to Mandi House, then Yellow Line (45 min total).',
    },
    {
      question: 'Is there NEET coaching for Greater Noida students near Botanical Garden Metro?',
      answer:
        'Yes! Greater Noida students can easily connect to Botanical Garden via the Aqua Line extension. We recommend online classes for Greater Noida students to save commute time. Our live online batches, recorded lectures, and 24/7 doubt support make quality NEET coaching accessible from home.',
    },
  ],
}

export const metadata: Metadata = {
  title: 'NEET Coaching Near Botanical Garden Metro | Biology Classes Noida',
  description: `NEET Biology coaching near Botanical Garden Metro Station, Noida. ${metroData.studentCount} students enrolled from Sector 18, Sector 16, Amity area. Blue Line connectivity. Online & Offline. AIIMS faculty. Call ${CONTACT_INFO.phone.display.primary}`,
  keywords: [
    'neet coaching near botanical garden metro',
    'neet coaching noida sector 18',
    'biology classes noida',
    'neet preparation noida city centre',
    'best neet coaching near amity university noida',
    'neet classes blue line metro noida',
    'neet coaching greater noida',
    'biology tuition noida sector 16',
    'neet coaching noida extension',
    'medical coaching noida',
    'online neet coaching noida',
    'neet coaching for working professionals noida',
  ],
  openGraph: {
    title: 'NEET Coaching Near Botanical Garden Metro | Cerebrum Biology Academy',
    description: `Online & Offline NEET Biology classes for students near Botanical Garden Metro. ${metroData.studentCount} students from Noida enrolled. Blue Line connectivity to Delhi centers.`,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-botanical-garden-metro',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-botanical-garden-metro',
  },
}

export default function NEETCoachingBotanicalGardenMetroPage() {
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
    name: 'Cerebrum Biology Academy - Near Botanical Garden Metro',
    description: metroData.description,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-botanical-garden-metro',
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
      reviewCount: '1100',
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
        name: 'Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Botanical Garden Metro',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-botanical-garden-metro',
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
      <BotanicalGardenMetroContent metroData={metroData} />
    </>
  )
}
