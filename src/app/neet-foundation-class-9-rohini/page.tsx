import { Metadata } from 'next'
import NEETFoundationClass9RohiniContent from './NEETFoundationClass9RohiniContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const rohiniCenter = CONTACT_INFO.centers.rohini

export const metadata: Metadata = {
  title: 'NEET Foundation Class 9 Rohini | Early NEET Prep | Cerebrum Academy',
  description:
    'Start NEET preparation from Class 9 in Rohini. DC Chauk center, 3-year NEET journey, NCERT mastery, small batches. WhatsApp 88264-44334',
  keywords: [
    'NEET foundation class 9 rohini',
    'early NEET preparation rohini',
    'class 9 NEET coaching rohini',
    'pre-NEET foundation rohini',
    'neet foundation course class 9 rohini',
    'class 9 biology for neet rohini',
    'neet preparation from class 9 rohini',
    '3 year neet preparation rohini',
    'dc chauk neet coaching',
    'rohini west metro neet coaching',
  ],
  openGraph: {
    title: 'NEET Foundation Class 9 Rohini | 3-Year Head Start | Cerebrum Academy',
    description:
      'Start your NEET journey from Class 9 at our DC Chauk, Rohini center. Build strong foundation with expert faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-rohini',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-rohini',
  },
}

const faqs = [
  {
    question: 'Why should I start NEET preparation from Class 9 in Rohini?',
    answer:
      'Starting in Class 9 gives you a 3-year advantage for NEET. Our Rohini center at DC Chauk offers convenient access via Rohini West Metro (Red Line). You can build strong fundamentals, cover syllabus thoroughly, and reduce stress in Class 11-12. Students who start early at Cerebrum consistently score 50-100 marks higher.',
  },
  {
    question: 'What is the NEET qualification rate at Cerebrum Rohini?',
    answer:
      'Cerebrum Biology Academy has a 98% NEET qualification rate. Our notable alumni include Sadhna Sirin (695/720, LHMC Delhi), Nishita (680/720), and Aditya (672/720). Our systematic approach and small batch sizes ensure personalized attention for every student.',
  },
  {
    question: 'What is covered in NEET Foundation Class 9?',
    answer:
      'We cover Class 9 NCERT Biology thoroughly while building NEET-relevant concepts. Topics include Cell Biology, Tissues, Diversity in Living Organisms, and basic Life Processes. We introduce NEET MCQ patterns early and build scientific reasoning skills from the start.',
  },
  {
    question: 'Will this affect my board exam preparation?',
    answer:
      'No, our foundation course is designed for dual preparation. Class 9 biology has 100% overlap with NEET basics. We ensure you excel in school exams while building a strong NEET foundation simultaneously.',
  },
  {
    question: 'What is the fee structure for NEET Foundation Class 9 in Rohini?',
    answer:
      'Class IX Foundation (NEET) fees range from Rs 45,000 to Rs 90,000/year depending on the tier: Pursuit (Rs 45,000, 30-40 students), Ascent (Rs 60,000, 16-18 students), or Pinnacle (Rs 90,000, 10-12 students with personal mentorship from Dr. Shekhar).',
  },
  {
    question: 'What is the batch size and timing at Rohini center?',
    answer:
      'Batch sizes vary by tier: Pinnacle (10-12 students), Ascent (16-18 students), Pursuit (30-40 students). Weekend batches (Sat-Sun) and weekday evening batches are available to accommodate school schedules. Our DC Chauk center is easily accessible from all Rohini sectors.',
  },
  {
    question: 'How is this different from regular tuition?',
    answer:
      'Unlike regular tuition that focuses only on board exams, our foundation course builds conceptual depth required for NEET. We use NCERT as base but go beyond with application-based learning, NEET-pattern MCQs, and early introduction to competitive exam strategies.',
  },
  {
    question: 'Where is the Rohini center located?',
    answer: `Our Rohini center is at ${rohiniCenter.streetAddress}, ${rohiniCenter.addressLocality}. We are just 5 minutes from Rohini West Metro Station (Red Line). Convenient for students from Sectors 7-16, Pitampura, and nearby areas.`,
  },
  {
    question: 'What free NEET tools does Cerebrum provide?',
    answer:
      'We provide free AI-powered tools including NEET Rank Predictor, College Predictor, Biology MCQ Practice, and Study Plan Generator. These tools help students track their preparation and predict college chances from early stages.',
  },
  {
    question: 'Which schools do students come from at Rohini center?',
    answer:
      'Our Rohini center has students from DPS Rohini, Ryan International, Bal Bharati, Mount Abu Public School, Venkateshwar International, DPSG Rohini, RPVV Rohini, and many other schools in North-West Delhi.',
  },
]

export default function NEETFoundationClass9RohiniPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'NEET Foundation Class 9 - Rohini',
    description: 'Early NEET preparation program for Class 9 students in Rohini. 3-year head start with strong conceptual foundation and 98% NEET qualification rate.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: rohiniCenter.streetAddress,
        addressLocality: rohiniCenter.addressLocality,
        addressRegion: rohiniCenter.addressRegion,
        postalCode: rohiniCenter.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 9',
    teaches: ['Cell Biology', 'Tissues', 'Diversity in Living Organisms', 'Life Processes Basics', 'NEET MCQ Patterns', 'Scientific Methodology'],
    timeRequired: 'P1Y',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '245',
      bestRating: '5',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      courseWorkload: 'Weekend classes + Weekday doubt sessions',
      instructor: {
        '@type': 'Person',
        name: 'Dr. Shekhar Singh',
        description: 'AIIMS Delhi Alumni, 15+ years NEET coaching experience',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '45000',
      priceCurrency: 'INR',
      priceValidUntil: '2026-03-31',
      availability: 'https://schema.org/InStock',
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
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Rohini', item: 'https://cerebrumbiologyacademy.com/neet-coaching-rohini' },
      { '@type': 'ListItem', position: 3, name: 'NEET Foundation Class 9', item: 'https://cerebrumbiologyacademy.com/neet-foundation-class-9-rohini' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NEETFoundationClass9RohiniContent faqs={faqs} />
    </>
  )
}
