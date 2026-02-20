import { Metadata } from 'next'
import NEETFoundationClass10NoidaContent from './NEETFoundationClass10NoidaContent'

const noidaAddress = 'B-45, Sector 62, Noida, UP 201301'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Noida | 2-Year Head Start',
  description:
    'NEET Foundation for Class 10 students in Noida. 2-year head start, 40% NEET syllabus overlap with boards. Expert faculty at Sector 62 center.',
  keywords: [
    'neet foundation class 10 noida',
    'class 10 neet preparation noida',
    '2 year neet prep noida',
    'neet foundation course class 10',
    'class 10 biology for neet noida',
    'foundation neet biology class 10',
  ],
  openGraph: {
    title: 'NEET Foundation Class 10 in Noida | 2-Year Head Start',
    description: 'Get 2-year head start for NEET from Class 10 in Noida.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-noida',
  },
}

const faqs = [
  {
    question: 'Why is Class 10 ideal for starting NEET preparation?',
    answer:
      'Class 10 is the perfect time as 40% of NEET Biology concepts are introduced here. You get a 2-year head start while the syllabus load is manageable. This builds strong fundamentals for Class 11-12.',
  },
  {
    question: 'What is the overlap between Class 10 and NEET syllabus?',
    answer:
      'About 40% of NEET Biology basics are covered in Class 10 - Life Processes, Control & Coordination, Reproduction, Heredity & Evolution. These form the foundation for Class 11-12 NEET topics.',
  },
  {
    question: 'How does this course help in board exams?',
    answer:
      'Our foundation course ensures you excel in Class 10 boards while building NEET fundamentals. The deeper understanding helps you score higher in both exams.',
  },
  {
    question: 'What is the fee structure?',
    answer:
      'Class X Foundation (NEET) fees range from ₹45,000 to ₹90,000/year depending on the tier: Pursuit (₹45,000, 30-40 students), Ascent (₹60,000-90,000, 16-18 students), or Pinnacle (₹90,000, 10-12 students with personal mentorship from Dr. Shekhar).',
  },
  {
    question: 'Where is the Noida center?',
    answer: `Located at ${noidaAddress}, near Sector 62 Metro Station (Blue Line, 5 min walk), easily accessible from all Noida areas.`,
  },
]

export default function NEETFoundationClass10NoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Foundation Class 10 - Noida',
    description: '2-year NEET preparation program for Class 10 students in Noida',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B-45, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'UP',
        postalCode: '201301',
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 10',
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
        name: 'Foundation Class 10',
        item: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-noida',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NEETFoundationClass10NoidaContent faqs={faqs} />
    </>
  )
}
