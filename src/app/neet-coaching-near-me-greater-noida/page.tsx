import { Metadata } from 'next'
import NEETCoachingNearMeGreaterNoidaContent from './NEETCoachingNearMeGreaterNoidaContent'

export const metadata: Metadata = {
  title: 'NEET Coaching Near Me in Greater Noida | Find Best Biology Classes Nearby',
  description:
    'Looking for NEET coaching near me in Greater Noida? Find the best NEET Biology coaching. Gaur City, Knowledge Park, Pari Chowk, Jaypee Greens — all covered. Online + hybrid classes. Book free demo today.',
  keywords: [
    'neet coaching near me greater noida',
    'best neet coaching near me greater noida',
    'neet biology classes near me greater noida',
    'neet coaching centre near me greater noida',
    'neet classes near me greater noida',
    'biology coaching near me greater noida',
    'medical coaching near me greater noida',
    'neet preparation near me greater noida',
    'neet institute near me greater noida',
  ],
  openGraph: {
    title: 'NEET Coaching Near Me in Greater Noida | Biology Classes Nearby',
    description:
      'Find the best NEET coaching near you in Greater Noida. Online + hybrid classes available. Nearest center: Sector 62, Noida.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-greater-noida',
  },
}

const faqs = [
  {
    question: 'Where is the nearest NEET coaching for Greater Noida students?',
    answer:
      'Cerebrum Biology Academy is located in Sector 62, Noida — accessible from Greater Noida via Aqua Line Metro to Noida Sector 52, then Blue Line to Sector 62. Online + hybrid classes are also available for Greater Noida students who prefer to study from home.',
  },
  {
    question: 'How far is your coaching from Greater Noida?',
    answer:
      'By road, we are approximately 30-45 minutes from most Greater Noida areas via the Noida-Greater Noida Expressway. By metro, it takes 45-60 minutes via Aqua Line + Blue Line. Most Greater Noida students prefer our online or hybrid mode to avoid daily travel.',
  },
  {
    question: 'Is there parking available near the coaching center?',
    answer:
      'Yes, our Sector 62 location has ample parking space for both two-wheelers and four-wheelers. The area also has designated visitor parking which students can use during class hours.',
  },
  {
    question: 'Which metro station is nearest to your coaching?',
    answer:
      'Sector 62 Metro Station on the Blue Line is the nearest, approximately a 5-minute walk. Greater Noida students can take the Aqua Line Metro to Noida (Sector 52 or City Centre), then transfer to the Blue Line for Sector 62.',
  },
  {
    question: 'Do you offer online classes for Greater Noida students?',
    answer:
      'Yes! Online + hybrid classes are available specifically for Greater Noida students. Online mode means zero travel time. Hybrid mode combines online weekday classes with occasional offline visits to our Sector 62, Noida center. Most Greater Noida students prefer online or hybrid.',
  },
  {
    question: 'What are the batch timings for Greater Noida students?',
    answer:
      'We offer flexible timings: Morning batch (6:30-8:30 AM online), Evening batch (5:00-7:00 PM online or offline), and Weekend batches (full day offline or online). Greater Noida students usually prefer evening or weekend online batches.',
  },
  {
    question: 'What are the nearby areas of Greater Noida that you serve?',
    answer:
      'We serve all Greater Noida areas including Gaur City, Knowledge Park (I, II, III, IV, V), Pari Chowk, Jaypee Greens, Greater Noida West, Alpha, Beta, Gamma, Delta sectors, Surajpur, and Kasna. Online classes available for all these areas.',
  },
  {
    question: 'How do I join the coaching from Gaur City Greater Noida?',
    answer:
      'Gaur City students can join online classes directly from home (most popular choice), or take the Aqua Line Metro and transfer to Blue Line to reach our Sector 62, Noida center. Contact us on WhatsApp at +91-99536-43938 to get started.',
  },
  {
    question: 'What is the best route from Knowledge Park Greater Noida?',
    answer:
      'From Knowledge Park: Take the Aqua Line Metro to Noida Sector 52, then Blue Line to Sector 62 (total 50-60 min). By road via NH58/Noida-Greater Noida Expressway takes 35-45 minutes depending on traffic. Online classes are available to avoid travel.',
  },
  {
    question: 'Is the area safe for students from Greater Noida coming alone?',
    answer:
      'Yes, Sector 62 is a well-developed IT and commercial area of Noida. The area has security, CCTV, and is well-lit. Many Greater Noida students who attend offline classes travel safely by metro.',
  },
]

export default function NEETCoachingNearMeGreaterNoidaPage() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - NEET Coaching Near Me Greater Noida',
    description:
      'Best NEET Biology coaching center serving Greater Noida students. Located in Sector 62, Noida. Online + hybrid classes available.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-greater-noida',
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
    areaServed: [
      { '@type': 'City', name: 'Greater Noida' },
      { '@type': 'City', name: 'Noida' },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 28.4744,
        longitude: 77.5040,
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
        name: 'NEET Coaching Greater Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Near Me',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-greater-noida',
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
      <NEETCoachingNearMeGreaterNoidaContent faqs={faqs} />
    </>
  )
}
