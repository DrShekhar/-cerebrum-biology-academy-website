import { Metadata } from 'next'
import NEETFoundationClass10Content from './NEETFoundationClass10Content'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'NEET Foundation Class 10 in Gurugram | 2-Year Head Start',
  description:
    'NEET Foundation for Class 10 students in Gurugram. 2-year head start, 40% NEET syllabus overlap with boards. Expert faculty at Sector 51 center.',
  keywords: [
    'neet foundation class 10 gurugram', 'class 10 neet preparation gurugram', '2 year neet prep gurugram',
    'neet foundation course class 10', 'class 10 biology for neet gurugram', 'foundation neet biology class 10',
  ],
  openGraph: {
    title: 'NEET Foundation Class 10 in Gurugram | 2-Year Head Start',
    description: 'Get 2-year head start for NEET from Class 10 in Gurugram.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-gurugram',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-gurugram' },
}

const faqs = [
  { question: 'Why is Class 10 ideal for starting NEET preparation?', answer: 'Class 10 is the perfect time as 40% of NEET Biology concepts are introduced here. You get a 2-year head start while the syllabus load is manageable. This builds strong fundamentals for Class 11-12.' },
  { question: 'What is the overlap between Class 10 and NEET syllabus?', answer: 'About 40% of NEET Biology basics are covered in Class 10 - Life Processes, Control & Coordination, Reproduction, Heredity & Evolution. These form the foundation for Class 11-12 NEET topics.' },
  { question: 'How does this course help in board exams?', answer: 'Our foundation course ensures you excel in Class 10 boards while building NEET fundamentals. The deeper understanding helps you score higher in both exams.' },
  { question: 'What is the fee structure?', answer: 'Class X Foundation (NEET) fees range from ₹45,000 to ₹90,000/year depending on the tier: Pursuit (₹45,000, 30-40 students), Ascent (₹60,000-90,000, 16-18 students), or Pinnacle (₹90,000, 10-12 students with personal mentorship from Dr. Shekhar).' },
  { question: 'Where is the Gurugram center?', answer: `Located at ${gurugramLocation.streetAddress}, same building as Allen Career Institute, easily accessible from all Gurugram areas.` },
]

export default function NEETFoundationClass10GurugramPage() {
  const courseSchema = { '@context': 'https://schema.org', '@type': 'Course', name: 'NEET Foundation Class 10 - Gurugram', description: '2-year NEET preparation program for Class 10 students', provider: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' }, educationalLevel: 'Class 10' }
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' }, { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' }, { '@type': 'ListItem', position: 3, name: 'Foundation Class 10', item: 'https://cerebrumbiologyacademy.com/neet-foundation-class-10-gurugram' }] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NEETFoundationClass10Content faqs={faqs} />
    </>
  )
}
