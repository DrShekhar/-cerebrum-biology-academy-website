import { Metadata } from 'next'
import NEETFoundationClass10Content from './NEETFoundationClass10Content'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Faridabad | 2-Year Head Start',
  description:
    'NEET Foundation for Class 10 students in Faridabad. 2-year head start, 40% NEET syllabus overlap with boards. Expert faculty at Sector 17 center.',
  keywords: [
    'neet foundation class 10 faridabad',
    'class 10 neet preparation faridabad',
    '2 year neet prep faridabad',
    'neet foundation course class 10',
    'class 10 biology for neet faridabad',
    'foundation neet biology class 10',
  ],
  openGraph: {
    title: 'NEET Foundation Class 10 in Faridabad | 2-Year Head Start',
    description: 'Get 2-year head start for NEET from Class 10 in Faridabad.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-faridabad',
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
    question: 'Where is the Faridabad center?',
    answer: `Located at ${faridabadLocation.streetAddress}, near Bata Chowk Metro (5 min walk), easily accessible from all Faridabad areas.`,
  },
]

export default function NEETFoundationClass10FaridabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Foundation Class 10 - Faridabad',
    description: '2-year NEET preparation program for Class 10 students',
    provider: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' },
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
        name: 'NEET Coaching Faridabad',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Foundation Class 10',
        item: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-faridabad',
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
      <NEETFoundationClass10Content faqs={faqs} />
    </>
  )
}
