import { Metadata } from 'next'
import Board12BiologyRohiniContent from './Board12BiologyRohiniContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const rohiniLocation = CONTACT_INFO.centers.rohini

export const metadata: Metadata = {
  title: '12th Board Biology Coaching Rohini | CBSE Board + NEET | Cerebrum Academy',
  description:
    'Expert 12th board biology coaching in Rohini. Dual prep for CBSE boards + NEET. DC Chauk center, small batches. WhatsApp 88264-44334',
  keywords: [
    '12th board biology Rohini',
    'CBSE biology class 12 coaching',
    'board NEET preparation Rohini',
    'class 12 biology tuition Rohini',
    '12th CBSE biology coaching Delhi',
    'board exam biology coaching Rohini',
    'NEET biology class 12 Rohini',
  ],
  openGraph: {
    title: '12th Board Biology Coaching Rohini | CBSE Board + NEET',
    description:
      'Expert 12th board biology coaching in Rohini with dual preparation for CBSE boards and NEET at DC Chauk center.',
    url: 'https://cerebrumbiologyacademy.com/12th-board-biology-coaching-rohini',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/12th-board-biology-coaching-rohini' },
}

const faqs = [
  {
    question: 'How do you balance 12th Board and NEET preparation together?',
    answer:
      'Our integrated curriculum covers NCERT thoroughly for boards while adding NEET-level depth. 70% of NEET Biology is from Class 12, so board preparation naturally aligns with NEET. We use concept-first teaching, board-pattern tests, and NEET MCQs to ensure dual success.',
  },
  {
    question: 'What topics are covered in Class 12 Biology for boards and NEET?',
    answer:
      'We cover all NCERT chapters: Human Physiology (Reproduction, Genetics, Evolution), Biotechnology & its Applications, Biology in Human Welfare, and Ecology. Each topic is taught at board level first, then extended to NEET difficulty with diagrams and MCQ practice.',
  },
  {
    question: 'What is the fee for 12th Board + NEET Biology coaching in Rohini?',
    answer:
      'The Class XII Board + NEET program fee is Rs. 72,200 per year. This includes comprehensive study materials, weekly board-pattern tests, NEET MCQ booklets, doubt clearing sessions, and practical/lab coaching support.',
  },
  {
    question: 'Do you provide practical and lab coaching for Class 12 Biology?',
    answer:
      'Yes, we provide complete practical and lab coaching for CBSE Class 12 Biology. This includes hands-on practice for all prescribed experiments, viva preparation, practical file guidance, and tips for scoring full marks in the practical exam.',
  },
  {
    question: 'What is the batch size and schedule?',
    answer:
      'We maintain small batches of maximum 15-18 students for personalized attention. Weekday evening and weekend batches are available. Special intensive batches are offered before board pre-board and final exams.',
  },
  {
    question: 'Where is your Rohini center located?',
    answer: `Our Rohini center is located at ${rohiniLocation.streetAddress}, ${rohiniLocation.addressLocality}. It is near Rohini West Metro Station (Red Line) and DC Chowk market.`,
  },
  {
    question: 'How does your coaching help students from nearby schools?',
    answer:
      'We have students from DPS Rohini, Ryan International, Bal Bharati, Venkateshwar International, and other top schools. Our faculty is familiar with school exam patterns and provides school-specific support alongside board and NEET preparation.',
  },
  {
    question: 'What results have your Class 12 students achieved?',
    answer:
      'Our Class 12 students consistently score 90%+ in board exams. Many have secured NEET ranks under 10,000 while also excelling in boards. We focus on conceptual clarity that benefits both exams simultaneously.',
  },
]

export default function Board12BiologyCoachingRohiniPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: '12th Board Biology Coaching - Rohini',
    description: 'CBSE Class 12 Board Biology coaching with integrated NEET preparation in Rohini, Delhi',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      sameAs: 'https://cerebrumbiologyacademy.com',
    },
    educationalLevel: 'Class 12',
    coursePrerequisites: 'Class 11 Biology',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      location: {
        '@type': 'Place',
        name: rohiniLocation.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: rohiniLocation.streetAddress,
          addressLocality: rohiniLocation.addressLocality,
          addressRegion: rohiniLocation.addressRegion,
          postalCode: rohiniLocation.postalCode,
          addressCountry: rohiniLocation.addressCountry,
        },
      },
    },
    offers: {
      '@type': 'Offer',
      price: '72200',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
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
        name: 'Biology Coaching',
        item: 'https://cerebrumbiologyacademy.com/biology-coaching',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: '12th Board Biology Rohini',
        item: 'https://cerebrumbiologyacademy.com/12th-board-biology-coaching-rohini',
      },
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Rohini',
    description: 'Expert 12th Board Biology coaching with NEET preparation in Rohini, Delhi',
    url: 'https://cerebrumbiologyacademy.com/12th-board-biology-coaching-rohini',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: rohiniLocation.streetAddress,
      addressLocality: rohiniLocation.addressLocality,
      addressRegion: rohiniLocation.addressRegion,
      postalCode: rohiniLocation.postalCode,
      addressCountry: rohiniLocation.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: rohiniLocation.geo.latitude,
      longitude: rohiniLocation.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '07:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: 'Rs. 72,200/year',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Board12BiologyRohiniContent faqs={faqs} />
    </>
  )
}
