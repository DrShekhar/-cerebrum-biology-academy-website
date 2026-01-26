import { Metadata } from 'next'
import ICSENEETCoachingContent from './ICSENEETCoachingContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'ICSE Board NEET Coaching in Gurugram | Biology for ICSE Students',
  description:
    'Specialized NEET Biology coaching for ICSE board students in Gurugram. Bridge ICSE to NCERT syllabus, conceptual depth advantage. Perfect for Pathways, Lancers students.',
  keywords: [
    'icse neet coaching gurugram',
    'neet coaching for icse students',
    'icse biology tuition gurugram',
    'icse to ncert bridge course',
    'pathways gurugram neet coaching',
    'icse board neet preparation',
    'neet biology icse syllabus',
    'icse neet batch gurugram',
  ],
  openGraph: {
    title: 'ICSE Board NEET Coaching in Gurugram | ICSE-to-NCERT Bridge',
    description: 'NEET Biology coaching designed specifically for ICSE students. Bridge ICSE concepts to NCERT format with 95% success rate.',
    url: 'https://cerebrumbiologyacademy.com/icse-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/icse-neet-coaching-gurugram',
  },
}

const faqs = [
  {
    question: 'Is ICSE board good for NEET preparation?',
    answer:
      'ICSE provides excellent conceptual depth which is beneficial for NEET. However, since NEET is entirely NCERT-based, ICSE students need bridging support to align their knowledge with NCERT format and terminology. Our coaching provides this bridge effectively.',
  },
  {
    question: 'What is the ICSE to NCERT bridge program?',
    answer:
      'Our bridge program helps ICSE students translate their strong conceptual understanding to NCERT format. We map ICSE topics to NCERT chapters, highlight terminology differences, and ensure you can answer NEET questions in the expected format.',
  },
  {
    question: 'Which ICSE schools in Gurugram do your students come from?',
    answer:
      'We have students from top ICSE schools including Pathways World School, Lancers International, Suncity School, Presidium, Alpine Convent, Salwan Public School, and other CISCE-affiliated institutions in Gurugram.',
  },
  {
    question: 'Do ICSE students face disadvantage in NEET?',
    answer:
      'Not with proper guidance! ICSE students actually have deeper conceptual understanding. The only gap is NCERT-specific terminology and format. Our program bridges this gap, and our ICSE students score 310+ on average in NEET Biology.',
  },
  {
    question: 'What batch timings are available for ICSE school students?',
    answer:
      'We offer morning batches (6:30-8:30 AM before school), evening batches (5:00-7:00 PM after school), and weekend batches. Special timings aligned with Pathways, Lancers, and Suncity school schedules.',
  },
  {
    question: 'How much do ICSE students typically score in NEET Biology?',
    answer:
      'Our ICSE students average 310+ in NEET Biology (out of 360). With proper NCERT bridging, many score 330+ due to their strong conceptual foundation. Last year, 82% of our ICSE students cleared NEET cutoff.',
  },
  {
    question: 'What is the fee for ICSE NEET coaching?',
    answer:
      'Fees range from ₹45,000 to ₹1,56,000/year depending on the tier (Pursuit, Ascent, or Pinnacle). ICSE students also get complimentary NCERT bridge sessions in the first 2 months.',
  },
]

export default function ICSENEETCoachingGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'ICSE Board NEET Biology Coaching - Gurugram',
    description: 'Specialized NEET Biology coaching for ICSE board students with ICSE-to-NCERT bridge program',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: gurugramLocation.streetAddress,
        addressLocality: gurugramLocation.addressLocality,
        addressRegion: gurugramLocation.addressRegion,
        postalCode: gurugramLocation.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 11-12 ICSE/ISC',
    teaches: ['NCERT Biology', 'NEET Biology', 'ICSE-NCERT Bridge', 'Human Physiology', 'Genetics'],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: 'Aligned with ICSE school timings',
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cerebrumbiologyacademy.com' },
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'ICSE NEET Coaching', item: 'https://cerebrumbiologyacademy.com/icse-neet-coaching-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ICSENEETCoachingContent faqs={faqs} />
    </>
  )
}
