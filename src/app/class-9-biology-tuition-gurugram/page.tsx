import { Metadata } from 'next'
import Class9BiologyTuitionContent from './Class9BiologyTuitionContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'Class 9 Biology Tuition in Gurugram | CBSE, ICSE Coaching',
  description:
    'Best Class 9 Biology tuition in Gurugram for CBSE & ICSE boards. Experienced teachers, small batches, complete NCERT coverage at Sector 51 center.',
  keywords: [
    'class 9 biology tuition gurugram', 'class 9 biology coaching gurugram', '9th biology tuition gurugram',
    'cbse class 9 biology gurugram', 'icse class 9 biology gurugram', 'biology tuition near me gurugram',
  ],
  openGraph: {
    title: 'Class 9 Biology Tuition in Gurugram | CBSE, ICSE',
    description: 'Expert Class 9 Biology tuition for CBSE & ICSE boards in Gurugram.',
    url: 'https://cerebrumbiologyacademy.com/class-9-biology-tuition-gurugram',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/class-9-biology-tuition-gurugram' },
}

const faqs = [
  { question: 'Do you offer CBSE and ICSE Class 9 Biology tuition?', answer: 'Yes, we offer tuition for both CBSE and ICSE Class 9 Biology. Our teachers are experienced with both board patterns and ensure complete syllabus coverage.' },
  { question: 'What topics are covered in Class 9 Biology?', answer: 'We cover all NCERT topics: Cell - The Fundamental Unit of Life, Tissues, Diversity in Living Organisms, Why Do We Fall Ill, Natural Resources, and Improvement in Food Resources.' },
  { question: 'What is the fee for Class 9 Biology tuition?', answer: 'Class IX Foundation (Academic) fees range from ₹40,000 to ₹60,000/year depending on the tier: Pursuit (₹40,000, 30-40 students), Ascent (₹50,000, 16-18 students), or Pinnacle (₹60,000, 10-12 students). All tiers include study materials, worksheets, and doubt clearing sessions.' },
  { question: 'What is the batch size and timing?', answer: 'Small batches of maximum 15 students. Weekend and weekday evening batches available to suit school schedules.' },
  { question: 'Where is your Gurugram center?', answer: `Located at ${gurugramLocation.streetAddress}, same building as Allen Career Institute.` },
]

export default function Class9BiologyTuitionGurugramPage() {
  const courseSchema = { '@context': 'https://schema.org', '@type': 'Course', name: 'Class 9 Biology Tuition - Gurugram', description: 'CBSE & ICSE Class 9 Biology tuition', provider: { '@type': 'EducationalOrganization', name: 'Cerebrum Biology Academy' }, educationalLevel: 'Class 9' }
  const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) }
  const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' }, { '@type': 'ListItem', position: 2, name: 'Biology Tuition', item: 'https://cerebrumbiologyacademy.com/biology-tuition' }, { '@type': 'ListItem', position: 3, name: 'Class 9 Gurugram', item: 'https://cerebrumbiologyacademy.com/class-9-biology-tuition-gurugram' }] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Class9BiologyTuitionContent faqs={faqs} />
    </>
  )
}
