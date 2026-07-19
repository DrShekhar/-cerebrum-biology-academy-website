import { Metadata } from 'next'
import NEETFoundationClass9NoidaContent from './NEETFoundationClass9NoidaContent'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 in Noida | Early NEET Preparation',
  description:
    'Start NEET preparation from Class 9 in Noida. 4-year head start, NCERT foundation, board + NEET dual prep. Live online expert faculty for Noida. Book free demo.',
  keywords: [
    'neet foundation class 9 noida',
    'class 9 neet preparation noida',
    'early neet coaching noida',
    'neet foundation course class 9',
    'class 9 biology for neet noida',
    'neet preparation from class 9',
    '4 year neet preparation noida',
    'foundation neet biology class 9',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'NEET Foundation Class 9 in Noida | 4-Year Head Start',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NEET Foundation Class 9 in Noida | Early NEET Preparation',
      },
    ],
    description:
      'Start your NEET journey from Class 9 in Noida. Build strong foundation with our expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-noida',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Foundation Class 9 in Noida | Early NEET Preparation',
    description:
      'Start NEET preparation from Class 9 in Noida. 4-year head start, NCERT foundation, board + NEET dual prep. Live online expert faculty for Noida. Book free demo.',
  },
}

const faqs = [
  {
    question: 'Why should I start NEET preparation from Class 9?',
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
      'Batch sizes vary by tier: Pinnacle (6-10 students), Ascent (12-16 students), Pursuit (20-25 students). Weekend batches (Sat-Sun) and weekday evening batches are available to accommodate school schedules.',
  },
  {
    question: 'How is this different from regular tuition?',
    answer:
      'Unlike regular tuition that focuses only on board exams, our foundation course builds conceptual depth required for NEET. We use NCERT as base but go beyond with application-based learning and early introduction to MCQ patterns.',
  },
  {
    question: 'Do you have a center in Noida?',
    answer:
      'We teach Noida students through live online classes — no travel needed. Our nearest in-person center is South Extension, New Delhi.',
  },
]

export default function NEETFoundationClass9NoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Foundation Class 9 - Noida',
    description:
      'Early NEET preparation program for Class 9 students in Noida. 4-year head start with strong conceptual foundation.',
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
      areaServed: 'Noida',
    },
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
      courseWorkload: 'Live online weekend classes + weekday doubt sessions',
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
        name: 'NEET Coaching Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'NEET Foundation Class 9',
        item: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-noida',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={['NEET Noida', 'NEET Biology Noida', 'Medical entrance coaching Noida']}
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
      <NEETFoundationClass9NoidaContent faqs={faqs} />
    </>
  )
}
