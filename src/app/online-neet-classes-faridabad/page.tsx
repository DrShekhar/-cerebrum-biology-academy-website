import { Metadata } from 'next'
import OnlineNEETClassesFaridabadContent from './OnlineNEETClassesFaridabadContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const faridabadLocation = CONTACT_INFO.location.faridabad

export const metadata: Metadata = {
  title: 'Online NEET Classes in Faridabad | Live Biology Classes from Home',
  description:
    'Join online NEET Biology classes from Faridabad. Live interactive sessions, recorded lectures, doubt clearing. Same AIIMS faculty as offline. Starting ₹45,000/year.',
  keywords: [
    'online neet classes faridabad',
    'online neet coaching faridabad',
    'neet online classes faridabad',
    'online biology classes faridabad',
    'neet live classes faridabad',
    'online neet preparation faridabad',
    'neet video lectures faridabad',
    'online medical coaching faridabad',
    'neet online course faridabad',
    'home neet coaching faridabad',
  ],
  openGraph: {
    title: 'Online NEET Classes in Faridabad | Live Interactive Sessions',
    description: 'Premium online NEET Biology coaching for Faridabad students. Live classes, recordings, doubt support.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-classes-faridabad',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-classes-faridabad',
  },
}

const faqs = [
  {
    question: 'How do online NEET classes work?',
    answer:
      'Our online classes are live interactive sessions conducted via Zoom/Google Meet. You can see the teacher, ask questions in real-time, and participate in discussions. All classes are recorded for revision. We also have a dedicated app for practice tests and doubt clearing.',
  },
  {
    question: 'Is the faculty same as offline classes?',
    answer:
      'Yes! Dr. Shekhar Singh (AIIMS alumnus) teaches both online and offline batches. You get the same quality of teaching, study materials, and test series. The only difference is the medium of delivery.',
  },
  {
    question: 'What if I miss a live class?',
    answer:
      'All live sessions are recorded and uploaded within 2 hours. You can watch recordings unlimited times for 1 year. We also provide chapter-wise video library with 500+ hours of content.',
  },
  {
    question: 'How is doubt clearing done online?',
    answer:
      'Multiple channels: 1) Live doubts during class, 2) WhatsApp doubt group with 4-hour response time, 3) Weekly doubt clearing sessions (live), 4) One-on-one video calls for complex doubts.',
  },
  {
    question: 'What technology/equipment do I need?',
    answer:
      'Basic requirements: Laptop/tablet/smartphone with camera, stable internet (5 Mbps+), headphones. We provide a tablet on deposit basis if needed. Our platform works on all devices.',
  },
  {
    question: 'Can I switch between online and offline?',
    answer:
      'Yes! Our hybrid model allows flexibility. Many students attend 2-3 days offline at our Sector 17, Faridabad center and rest online. You can switch modes based on your convenience with prior notice.',
  },
  {
    question: 'What is the fee for online classes?',
    answer:
      'Online-only batches start at ₹45,000/year (vs ₹60,000 offline). This includes live classes, recordings, study material (PDF), test series, and doubt support. Hybrid option available at ₹55,000.',
  },
  {
    question: 'What are the class timings for online batches?',
    answer:
      'We offer flexible timing: Morning batch (7-9 AM before school), Evening batch (5-7 PM after school), and Weekend batch (4-hour sessions). You can choose the slot that best fits your school schedule.',
  },
  {
    question: 'How can parents monitor my progress in online classes?',
    answer:
      'Parents receive weekly progress reports via WhatsApp/email, including attendance, test scores, and teacher feedback. We also conduct monthly parent-teacher video calls and provide access to our parent portal for real-time tracking.',
  },
  {
    question: 'Are online classes as effective as offline coaching?',
    answer:
      'Our data shows online students achieve comparable results to offline students. In NEET 2024, 42% of our 650+ qualifiers were online students. The key is active participation, regular attendance, and completing all assignments.',
  },
  {
    question: 'How are tests conducted in online mode?',
    answer:
      'Weekly chapter tests are conducted via our online platform with AI-proctoring. Monthly full-length mock tests simulate actual NEET conditions. All tests include detailed analysis, rank prediction, and personalized improvement suggestions.',
  },
  {
    question: 'What if I face technical issues during live class?',
    answer:
      'We have a dedicated tech support team available during all class hours. Classes are also recorded, so you never miss content. Our platform has low-bandwidth mode for areas with internet issues. Support: tech@cerebrumbiologyacademy.com',
  },
]

export default function OnlineNEETClassesFaridabadPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online NEET Biology Classes - Faridabad',
    description: 'Live interactive online NEET Biology coaching for Faridabad students with AIIMS faculty',
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
    educationalLevel: 'Class 11-12 / Dropper',
    courseMode: 'Online',
    teaches: ['NEET Biology', 'Live Classes', 'Recorded Lectures', 'Online Tests'],
    offers: {
      '@type': 'Offer',
      price: '45000',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'Live classes + recordings + doubt support',
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
      { '@type': 'ListItem', position: 3, name: 'Online Classes', item: 'https://cerebrumbiologyacademy.com/online-neet-classes-faridabad' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <OnlineNEETClassesFaridabadContent faqs={faqs} />
    </>
  )
}
