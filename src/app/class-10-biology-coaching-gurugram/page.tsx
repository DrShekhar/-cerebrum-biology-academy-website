import { Metadata } from 'next'
import Class10BiologyCoachingContent from './Class10BiologyCoachingContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'Class 10 Biology Coaching in Gurugram | Board Exam Preparation',
  description:
    'Best Class 10 Biology coaching in Gurugram for CBSE & ICSE boards. Expert teachers, diagram mastery, practical focus at Sector 51 center.',
  keywords: [
    'class 10 biology coaching gurugram', 'class 10 biology tuition gurugram', '10th biology coaching gurugram',
    'cbse class 10 biology gurugram', 'icse class 10 biology gurugram', 'board exam biology gurugram',
  ],
  openGraph: {
    title: 'Class 10 Biology Coaching in Gurugram | Board Exam Excellence',
    description: 'Expert Class 10 Biology coaching for board exams in Gurugram.',
    url: 'https://cerebrumbiologyacademy.com/class-10-biology-coaching-gurugram',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/class-10-biology-coaching-gurugram' },
}

const faqs = [
  { question: 'How do you help score high in Class 10 Biology boards?', answer: 'We focus on NCERT mastery, diagram practice, and answering techniques. Regular mock tests and board-pattern papers help students score 90+ in Biology.' },
  { question: 'What is covered in Class 10 Biology?', answer: 'Complete NCERT: Life Processes, Control & Coordination, How Do Organisms Reproduce, Heredity & Evolution, Our Environment, and Management of Natural Resources.' },
  { question: 'Is this coaching good for NEET foundation too?', answer: 'Yes! 40% of NEET concepts are introduced in Class 10. Our coaching builds both board exam skills and NEET foundation.' },
  { question: 'What is the fee structure?', answer: 'Class X Foundation (Board-only) fees range from ₹40,000 to ₹60,000/year depending on the tier: Pursuit (₹40,000, 30-40 students), Ascent (₹50,000, 16-18 students), or Pinnacle (₹60,000, 10-12 students). All tiers include comprehensive study materials and mock tests.' },
  { question: 'Where is the Gurugram center?', answer: `At ${gurugramLocation.streetAddress}, same building as Allen Career Institute.` },
]

export default function Class10BiologyCoachingGurugramPage() {
  const courseSchema = { '@context': 'https://schema.org', '@type': 'Course', name: 'Class 10 Biology Coaching - Gurugram', description: 'CBSE & ICSE Class 10 Biology coaching for board exams', provider: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' }, educationalLevel: 'Class 10' }
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' }, { '@type': 'ListItem', position: 2, name: 'Biology Coaching', item: 'https://cerebrumbiologyacademy.com/biology-coaching' }, { '@type': 'ListItem', position: 3, name: 'Class 10 Gurugram', item: 'https://cerebrumbiologyacademy.com/class-10-biology-coaching-gurugram' }] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Class10BiologyCoachingContent faqs={faqs} />
    </>
  )
}
