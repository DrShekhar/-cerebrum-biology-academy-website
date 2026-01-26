import { Metadata } from 'next'
import BiologyOlympiadGurugramContent from './BiologyOlympiadGurugramContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { CEREBRUM_METRICS, GURUGRAM_CENTER_METRICS } from '@/lib/constants/metrics'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'Biology Olympiad Coaching in Gurugram | NSEB, IBO, INBO Preparation',
  description:
    'Expert Biology Olympiad coaching in Gurugram for NSEB, INBO, and IBO preparation. Experienced faculty, comprehensive syllabus coverage, practical training. Join our Sector 51 center.',
  keywords: [
    'biology olympiad coaching gurugram',
    'olympiad preparation gurugram',
    'NSEB coaching gurugram',
    'IBO preparation gurugram',
    'INBO coaching gurugram',
    'science olympiad biology gurugram',
    'biology olympiad classes gurugram',
    'olympiad biology tuition gurugram',
    'national biology olympiad gurugram',
    'international biology olympiad gurugram',
  ],
  openGraph: {
    title: 'Biology Olympiad Coaching in Gurugram | NSEB, IBO, INBO',
    description:
      'Expert Biology Olympiad coaching for NSEB, INBO, IBO preparation in Gurugram. Comprehensive syllabus, practical training, experienced mentors.',
    url: 'https://cerebrumbiologyacademy.com/biology-olympiad-coaching-gurugram',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Olympiad Coaching in Gurugram',
    description:
      'Expert NSEB, INBO, IBO preparation in Gurugram. Comprehensive coaching with practical training.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-olympiad-coaching-gurugram',
  },
}

const faqs = [
  {
    question: 'What Biology Olympiads can I prepare for at your Gurugram center?',
    answer:
      'At our Gurugram center, we offer comprehensive coaching for NSEB (National Standard Examination in Biology), INBO (Indian National Biology Olympiad), and IBO (International Biology Olympiad). Our program covers all stages from initial screening to international competition.',
  },
  {
    question: 'What is the eligibility for Biology Olympiad coaching?',
    answer:
      'Students from Class 9 to 12 can join our Olympiad coaching. For NSEB, you must be an Indian citizen studying in an Indian school. Early preparation from Class 9-10 gives the best results for competitive olympiads.',
  },
  {
    question: 'How is Olympiad coaching different from NEET preparation?',
    answer:
      'Olympiad coaching goes beyond NCERT and requires understanding at university level using Campbell Biology. It includes practical/laboratory components, research paper analysis, and problem-solving skills. Many concepts overlap with NEET but at a deeper level.',
  },
  {
    question: 'What is the NSEB to IBO pathway?',
    answer:
      'The pathway is: NSEB (Stage 1, November) → INBO (Stage 2, February) → IBO Training Camp → Team Selection → IBO (July). Top 300 NSEB qualifiers appear for INBO, top 35 attend training camp, and 4 students represent India at IBO.',
  },
  {
    question: 'Do you provide practical/laboratory training for Olympiads?',
    answer:
      'Yes, we provide comprehensive practical training covering microscopy, biochemical assays, molecular biology techniques, and anatomical studies. IBO has 40% weightage for practicals, so hands-on experience is crucial.',
  },
  {
    question: 'What textbooks are used for Olympiad preparation?',
    answer:
      'Campbell Biology (12th edition) is the primary reference. Additional resources include Molecular Biology of the Cell (Alberts), Lehninger Biochemistry, and specialized texts for plant/animal physiology. We provide structured study materials.',
  },
  {
    question: 'Where is your Gurugram center located for Olympiad coaching?',
    answer: `Our center is at ${gurugramLocation.streetAddress}, ${gurugramLocation.addressLocality}. We are in the same building as Allen Career Institute, easily accessible from all parts of Gurugram.`,
  },
]

export default function BiologyOlympiadCoachingGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Biology Olympiad Coaching Program - Gurugram',
    description:
      'Comprehensive Biology Olympiad preparation for NSEB, INBO, and IBO at our Gurugram center. Expert faculty, practical training, proven results.',
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
    educationalLevel: 'High School',
    about: [
      'NSEB - National Standard Examination in Biology',
      'INBO - Indian National Biology Olympiad',
      'IBO - International Biology Olympiad',
    ],
    teaches: [
      'Cell Biology & Biochemistry',
      'Molecular Biology & Genetics',
      'Plant Biology',
      'Animal Anatomy & Physiology',
      'Ecology & Evolution',
      'Practical Laboratory Skills',
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      location: {
        '@type': 'Place',
        name: 'Cerebrum Biology Academy Gurugram',
        address: gurugramLocation.streetAddress,
      },
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

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Cerebrum Biology Academy - Biology Olympiad Coaching Gurugram',
    description:
      'Expert Biology Olympiad coaching center in Gurugram offering NSEB, INBO, and IBO preparation with comprehensive practical training.',
    url: 'https://cerebrumbiologyacademy.com/biology-olympiad-coaching-gurugram',
    telephone: CONTACT_INFO.phone.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: gurugramLocation.streetAddress,
      addressLocality: gurugramLocation.addressLocality,
      addressRegion: gurugramLocation.addressRegion,
      postalCode: gurugramLocation.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: gurugramLocation.geo.latitude,
      longitude: gurugramLocation.geo.longitude,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: GURUGRAM_CENTER_METRICS.coordinates.latitude,
        longitude: GURUGRAM_CENTER_METRICS.coordinates.longitude,
      },
      geoRadius: '20000',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: CEREBRUM_METRICS.rating,
      bestRating: 5,
      ratingCount: CEREBRUM_METRICS.reviewCount,
    },
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
        name: 'Biology Olympiad Preparation',
        item: 'https://cerebrumbiologyacademy.com/biology-olympiad-preparation',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Gurugram',
        item: 'https://cerebrumbiologyacademy.com/biology-olympiad-coaching-gurugram',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BiologyOlympiadGurugramContent faqs={faqs} />
    </>
  )
}
