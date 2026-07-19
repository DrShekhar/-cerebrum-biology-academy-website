import { Metadata } from 'next'
import NEETFoundationClass9GreaterNoidaContent from './NEETFoundationClass9GreaterNoidaContent'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Greater Noida | Early NEET Preparation',
  description:
    'Start NEET preparation from Class 9 in Greater Noida. 4-year head start, NCERT foundation, board + NEET dual prep. Live online classes. Expert faculty. Book free demo.',
  keywords: [
    'neet foundation class 9 greater noida',
    'class 9 neet preparation greater noida',
    'early neet coaching greater noida',
    'neet foundation course class 9 greater noida',
    'class 9 biology for neet greater noida',
    'neet preparation from class 9 greater noida',
    '4 year neet preparation greater noida',
    'foundation neet biology class 9 greater noida',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Foundation Class 9 in Greater Noida | 4-Year Head Start',
    description:
      'Start your NEET journey from Class 9 in Greater Noida. Live online classes with expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-greater-noida',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 9 in Greater Noida | Early NEET Preparation',
    description:
      'Start NEET preparation from Class 9 in Greater Noida. 4-year head start, NCERT foundation, board + NEET dual prep. Live online classes. Expert faculty. Book free demo.',
  },
}

const faqs = [
  {
    question: 'Why should I start NEET preparation from Class 9 in Greater Noida?',
    answer:
      'Starting in Class 9 gives you a 4-year head start. You can build strong fundamentals, cover syllabus without rushing, reduce stress in Class 11-12, and have more time for revision and practice. Students who start early consistently score 50-100 marks higher.',
  },
  {
    question: 'What is covered in NEET Foundation Class 9?',
    answer:
      'We cover Class 9 NCERT Biology thoroughly while introducing NEET-relevant concepts. Topics include Cell Biology, Tissues, Diversity in Living Organisms, and basic Life Processes. We also build scientific thinking and problem-solving skills.',
  },
  {
    question: 'Will this affect my board exam preparation?',
    answer:
      'No, our foundation course is designed for dual preparation. Class 9 biology has 100% overlap with NEET basics. We ensure you excel in school exams while building NEET foundation simultaneously.',
  },
  {
    question: 'What is the fee structure?',
    answer:
      'Class IX Foundation (NEET) fees range from ₹45,000 to ₹90,000/year depending on the tier: Pursuit (₹45,000, 20-25 students), Ascent (₹60,000, 12-16 students), or Pinnacle (₹90,000, 6-10 students with personal mentorship from Dr. Shekhar).',
  },
  {
    question: 'What is the batch size and timing?',
    answer:
      'Batch sizes vary by tier: Pinnacle (6-10 students), Ascent (12-16 students), Pursuit (20-25 students). Weekend batches (Sat-Sun) and weekday evening batches are available to accommodate school schedules. All classes are live online for Greater Noida students.',
  },
  {
    question: 'How is this different from regular tuition?',
    answer:
      'Unlike regular tuition that focuses only on board exams, our foundation course builds conceptual depth required for NEET. We use NCERT as base but go beyond with application-based learning and early introduction to MCQ patterns.',
  },
  {
    question: 'How do Greater Noida Class 9 students attend the classes?',
    answer:
      'Greater Noida students attend live online classes from home - no travel needed, which is ideal for Class 9. For anyone who prefers in-person coaching, our nearest walk-in center is South Extension, New Delhi.',
  },
]

export default function NEETFoundationClass9GreaterNoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Foundation Class 9 - Greater Noida',
    description:
      'Early NEET preparation program for Class 9 students in Greater Noida. 4-year head start with strong conceptual foundation. Live online classes.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'D 35, South Extension Part 2',
        addressLocality: 'New Delhi',
        addressRegion: 'Delhi',
        postalCode: '110049',
        addressCountry: 'IN',
      },
    },
    areaServed: 'Greater Noida',
    educationalLevel: 'Class 9',
    teaches: [
      'Cell Biology',
      'Tissues',
      'Diversity in Living Organisms',
      'Life Processes Basics',
      'Scientific Methodology',
    ],
    timeRequired: 'P1Y',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'Weekend classes + Weekday doubt sessions',
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
        name: 'NEET Foundation Class 9',
        item: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-greater-noida',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Greater Noida',
          'NEET Biology Greater Noida',
          'Medical entrance coaching Greater Noida',
        ]}
      />
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
      <NEETFoundationClass9GreaterNoidaContent faqs={faqs} />
    </>
  )
}
