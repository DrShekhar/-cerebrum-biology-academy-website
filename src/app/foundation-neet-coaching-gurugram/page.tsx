import { Metadata } from 'next'
import FoundationNeetGurugramContent from './FoundationNeetGurugramContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'Foundation NEET Coaching in Gurugram | Class 9 & 10 Early Prep',
  description:
    'Foundation NEET coaching in Gurugram (Gurgaon) for Class 9 & 10. Build a strong NCERT biology base, board + NEET dual prep, small batches at our Sector 51 center. Book a free demo.',
  keywords: [
    'foundation neet coaching gurugram',
    'neet foundation course gurugram',
    'foundation biology coaching gurugram',
    'class 9 10 neet foundation gurugram',
    'early neet preparation gurugram',
    'neet foundation classes gurgaon',
    'pre neet coaching gurugram',
    'foundation coaching sector 51 gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Foundation NEET Coaching in Gurugram | Class 9 & 10 Early Prep',
    description:
      'Give your child a head start with Foundation NEET coaching in Gurugram. Class 9 & 10 programs, NCERT-strong, board + NEET dual prep at our Sector 51 center.',
    url: 'https://cerebrumbiologyacademy.com/foundation-neet-coaching-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/foundation-neet-coaching-gurugram',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Foundation NEET Coaching in Gurugram | Class 9 & 10 Early Prep',
    description:
      'Foundation NEET coaching in Gurugram for Class 9 & 10. NCERT-strong, board + NEET dual prep, small batches at our Sector 51 center.',
  },
}

const faqs = [
  {
    question: 'What is Foundation NEET coaching and who is it for?',
    answer:
      'Foundation NEET coaching is early medical-entrance preparation for Class 9 and Class 10 students. Instead of starting NEET prep in Class 11, students build a deep NCERT biology base years earlier — so Class 11-12 becomes revision and application rather than first exposure. It suits any Gurugram student aiming for medical college who wants a calmer, stronger runway.',
  },
  {
    question: 'When should my child start — Class 9 or Class 10?',
    answer:
      'Class 9 gives the longest runway (a 4-year head start) and is ideal if your child is already medicine-inclined. Class 10 (a 3-year plan) is the most popular entry point and still leaves ample time to master fundamentals before Class 11. We run separate, age-appropriate batches for each — start with whichever class your child is in now.',
  },
  {
    question: 'Will foundation coaching clash with board exam preparation?',
    answer:
      'No — the programs are designed for dual preparation. Class 9-10 biology overlaps almost entirely with NEET fundamentals, so your child excels in school exams while quietly building the NEET base. We align teaching with the CBSE/ICSE syllabus and add competitive depth on top.',
  },
  {
    question: 'What are the fees for the foundation program in Gurugram?',
    answer:
      'Class IX and X Foundation fees range from ₹45,000 to ₹90,000/year depending on the tier: Pursuit (₹45,000, larger batch), Ascent (₹60,000, 12-16 students), or Pinnacle (₹90,000, 6-10 students with personal mentorship from Dr. Shekhar). Book a free demo for a tier recommendation.',
  },
  {
    question: 'Is the coaching offline at the Gurugram center or online?',
    answer: `Both. Classes run at our Gurugram center — ${gurugramLocation.streetAddress}, ${gurugramLocation.addressLocality} — with online support (recordings, doubt sessions, tests) included. Fully online foundation batches are also available for students who prefer to study from home.`,
  },
  {
    question: 'How is this different from regular school tuition?',
    answer:
      'Regular tuition targets only board marks. Our foundation program builds the conceptual depth NEET demands — using NCERT as the base but going beyond with application-based learning, early MCQ practice, and scientific reasoning, all in small batches for personal attention.',
  },
  {
    question: 'Where exactly is the Gurugram center located?',
    answer: `Our center is at ${gurugramLocation.streetAddress}, ${gurugramLocation.addressLocality} — ${gurugramLocation.postalCode}. It is close to HUDA City Centre Metro and easily reachable from all major Gurugram sectors and schools.`,
  },
]

export default function FoundationNeetCoachingGurugramPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Foundation NEET Coaching (Class 9 & 10) - Gurugram',
    description:
      'Early NEET preparation program for Class 9 and Class 10 students in Gurugram. Strong NCERT biology foundation with board + NEET dual preparation.',
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
    educationalLevel: 'Class 9-10',
    teaches: [
      'Cell Biology',
      'Tissues',
      'Diversity in Living Organisms',
      'Life Processes',
      'Control and Coordination',
      'Heredity and Evolution basics',
    ],
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Blended',
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
        name: 'NEET Coaching Gurugram',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Foundation NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/foundation-neet-coaching-gurugram',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET Foundation Gurugram',
          'Class 9 NEET Biology Gurugram',
          'Class 10 NEET Biology Gurugram',
          'Early medical entrance coaching Gurugram',
        ]}
      />
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="foundation-neet-coaching-gurugram" />
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
      <FoundationNeetGurugramContent faqs={faqs} />
    </>
  )
}
