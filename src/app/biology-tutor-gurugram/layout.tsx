import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Tutor in Gurugram | NEET Coaching',
  description:
    'Best Biology tutor in Gurugram for NEET & Board exams. Expert coaching for DLF, Sohna Road, Golf Course Road. AIIMS faculty guidance. Offline & online classes.',
  keywords: [
    'biology tutor gurugram',
    'neet coaching gurugram',
    'biology classes gurugram',
    'biology tuition gurugram',
    'neet tutor gurugram',
    'biology coaching gurugram',
    'neet classes gurugram',
    'biology teacher gurugram',
    'neet preparation gurugram',
    'best biology coaching gurugram',
    'biology tutor gurgaon',
    'neet coaching dlf gurugram',
    'biology tutor sohna road',
  ],
  openGraph: {
    title: 'Biology Tutor in Gurugram | NEET Coaching',
    description:
      'Best Biology tutor in Gurugram for NEET & Board exams. Expert coaching by AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/biology-tutor-gurugram',
    images: [
      {
        url: `https://cerebrumbiologyacademy.com/api/og?title=${encodeURIComponent('Best Biology Tutor')}&subtitle=${encodeURIComponent('NEET & Board Exam Coaching')}&locality=${encodeURIComponent('Gurugram')}`,
        width: 1200,
        height: 630,
        alt: 'Cerebrum Biology Academy - NEET Biology Coaching in Gurugram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Tutor in Gurugram',
    description: 'Expert NEET Biology coaching in Gurugram.',
    images: [
      `https://cerebrumbiologyacademy.com/api/og?title=${encodeURIComponent('Best Biology Tutor')}&subtitle=${encodeURIComponent('NEET & Board Exam Coaching')}&locality=${encodeURIComponent('Gurugram')}`,
    ],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tutor-gurugram',
  },
}

// FAQs for structured data
const faqs = [
  {
    question: 'Is your center accessible from Gurugram?',
    answer:
      'While our center in Greater Noida is 30-40 km from Gurugram, we strongly recommend our online classes for Gurugram students. Our online platform offers the same quality with live interactive sessions, recorded lectures, and practice tests.',
  },
  {
    question: 'Why should Gurugram students choose online classes?',
    answer:
      'Online classes save 2-3 hours of daily commute time. You get the same AIIMS faculty teaching, live doubt sessions, and comprehensive study material. Many of our top performers are online students from Gurugram.',
  },
  {
    question: 'Do you have students from Gurugram?',
    answer:
      'Yes! We have many students from DLF, Golf Course Road, Sohna Road, and other Gurugram areas. They prefer our online classes for the quality and convenience. Weekend offline batches are also available for those who can travel.',
  },
  {
    question: 'What about weekend classes for Gurugram students?',
    answer:
      'We offer weekend intensive batches where students can travel once a week for offline sessions. This is combined with online classes during weekdays, giving you the best of both worlds.',
  },
]

// Structured data for SEO
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Cerebrum Biology Academy - Gurugram',
  description:
    'Best Biology Tutor for Gurugram students - NEET & Board exam preparation with online classes',
  url: 'https://cerebrumbiologyacademy.com/biology-tutor-gurugram',
  telephone: '+91-88264-44334',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Greater Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  areaServed: ['Gurugram', 'Gurgaon', 'DLF', 'Golf Course Road', 'Sohna Road', 'MG Road'],
  priceRange: '₹45,000 - ₹1,80,000',
}

export default function BiologyTutorGurugramLayout({ children }: { children: React.ReactNode }) {
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
      {children}
    </>
  )
}
