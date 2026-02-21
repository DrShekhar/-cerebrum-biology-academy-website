import { Metadata } from 'next'
import NEETRevisionBatchFaridabadContent from './NEETRevisionBatchFaridabadContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'NEET Revision Batch in Faridabad | Final 3-Month Revision Program',
  description:
    'Join our intensive 3-month NEET Biology revision batch in Faridabad. Complete NCERT revision, high-yield topics focus, 2000+ MCQs, and mock tests. Starting ₹40,000.',
  keywords: [
    'neet revision batch faridabad',
    'neet final revision',
    'neet biology revision',
    '3 month neet revision',
    'neet revision course',
    'pre-neet revision batch',
    'neet revision classes',
    'intensive neet revision',
  ],
  openGraph: {
    title: 'NEET Revision Batch in Faridabad | 3-Month Final Revision',
    description: 'Complete NCERT revision with high-yield topic focus. 2000+ MCQs, mock tests, and expert guidance.',
    url: 'https://cerebrumbiologyacademy.com/neet-revision-batch-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-revision-batch-faridabad',
  },
}

const faqs = [
  {
    question: 'Who should join the revision batch?',
    answer:
      'The revision batch is ideal for students who have completed their syllabus once and need intensive revision before NEET. Perfect for Class 12 students after boards and droppers in their final 3 months.',
  },
  {
    question: 'How is revision batch different from regular coaching?',
    answer:
      'Revision batch focuses on rapid revision, not teaching from scratch. We cover high-yield topics, frequently asked questions, and common mistakes. The pace is faster assuming you already know the basics.',
  },
  {
    question: 'What is the duration and schedule?',
    answer:
      '3-month intensive program with 4-5 hours of daily classes. We cover complete Biology syllabus twice - first pass for concepts and second pass for MCQ practice and test taking.',
  },
  {
    question: 'What topics are given priority?',
    answer:
      'We focus on high-yield chapters: Human Physiology (35%), Genetics & Evolution (20%), Ecology (15%), Plant Physiology (15%), and Cell Biology (15%). These cover 80%+ of NEET Biology questions.',
  },
  {
    question: 'What is the fee for revision batch?',
    answer:
      'Revision batch fee is ₹40,000 for 3 months (offline) and ₹32,000 for online. This includes complete study material, 2000+ MCQ bank, 20 mock tests, and doubt clearing sessions.',
  },
  {
    question: 'When do revision batches start?',
    answer:
      'We run multiple revision batches - January batch (for May NEET), February batch (post-boards), and April batch (final 45-day revision). Contact us for exact dates.',
  },
  {
    question: 'What results can I expect?',
    answer:
      'Students typically consolidate their preparation and improve by 40-80 marks. Last year, 88% of revision batch students cleared NEET cutoff with average score of 580.',
  },
]

export default function NEETRevisionBatchFaridabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Biology Revision Batch - Faridabad',
    description: '3-month intensive NEET Biology revision program with complete NCERT revision and 2000+ MCQ practice',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: faridabadLocation.streetAddress,
        addressLocality: faridabadLocation.addressLocality,
        addressRegion: faridabadLocation.addressRegion,
        postalCode: faridabadLocation.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 12 / Dropper',
    timeRequired: 'P3M',
    teaches: ['NCERT Revision', 'High-Yield Topics', 'MCQ Practice', 'Test Strategy'],
    offers: {
      '@type': 'Offer',
      price: '40000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: '4-5 hours/day for 3 months',
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
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Faridabad', item: 'https://cerebrumbiologyacademy.com/neet-coaching-faridabad' },
      { '@type': 'ListItem', position: 3, name: 'Revision Batch', item: 'https://cerebrumbiologyacademy.com/neet-revision-batch-faridabad' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NEETRevisionBatchFaridabadContent faqs={faqs} />
    </>
  )
}
