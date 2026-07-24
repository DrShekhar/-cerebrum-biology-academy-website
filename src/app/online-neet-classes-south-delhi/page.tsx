import { Metadata } from 'next'
import OnlineNEETClassesContent from './OnlineNEETClassesContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'
import { DelhiAreaSchema } from '@/components/seo/DelhiAreaSchema'
import { CerebrumPersonSchema } from '@/components/seo/CerebrumPersonSchema'

const flagshipCenter = CONTACT_INFO.centers.southExtension

export const metadata: Metadata = {
  title: 'Online NEET Classes in South Delhi | Live Biology Classes from Home',
  description:
    'Join online NEET Biology classes from South Delhi. Live interactive sessions, recorded lectures, doubt clearing. Same AIIMS-trained faculty as our South Extension centre. Starting ₹45,000/year.',
  keywords: [
    'online neet classes south delhi',
    'online neet coaching south delhi',
    'neet online classes south delhi',
    'online biology classes south delhi',
    'neet live classes south delhi',
    'online neet preparation south delhi',
    'neet video lectures south delhi',
    'online medical coaching south delhi',
    'neet online course south delhi',
    'home neet coaching south delhi',
  ],
  openGraph: {
    locale: 'en_IN',
    title: 'Online NEET Classes in South Delhi | Live Interactive Sessions',
    description:
      'Premium online NEET Biology coaching for South Delhi students. Live classes, recordings, doubt support.',
    url: 'https://cerebrumbiologyacademy.com/online-neet-classes-south-delhi',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-neet-classes-south-delhi',
  },

  twitter: {
    card: 'summary_large_image' as const,
    title: 'Online NEET Classes in South Delhi | Live Biology Classes from Home',
    description:
      'Join online NEET Biology classes from South Delhi. Live interactive sessions, recorded lectures, doubt clearing. Same AIIMS-trained faculty as our South Extension centre. Starting ₹45,000/year.',
  },
}

const faqs = [
  {
    question: 'How do online NEET classes work?',
    answer:
      'Our online classes are live interactive sessions conducted via Zoom/Google Meet. You can see the teacher, ask questions in real-time, and participate in discussions. All classes are recorded for revision. We also have a dedicated app for practice tests and doubt clearing.',
  },
  {
    question: 'Is the faculty same as the South Extension and Gulmohar Park centres?',
    answer:
      'Yes! Dr. Shekhar C Singh (AIIMS alumnus) teaches both online and offline batches. You get the same AIIMS-trained faculty as our South Extension flagship centre (D-35, South Extension Part 2) and Gulmohar Park (B-113) centre — same teaching, study materials, and test series. The only difference is the medium of delivery.',
  },
  {
    question: 'Who are online classes best suited for in South Delhi?',
    answer:
      'Three groups choose online: students who want to skip the commute across South Delhi traffic, students at school-heavy institutions like DPS RK Puram, Modern School, Sanskriti, Vasant Valley, and Shri Ram whose schedules leave little travel time, and families living outside the centre catchment. Outstation students in Ber Sarai and Katwaria Sarai PGs also join evening online biology alongside their integrated coaching.',
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
    question: 'Can I switch between online and the South Delhi centres?',
    answer:
      'Yes! Our hybrid model allows flexibility. Many South Delhi students attend online on weekdays and come to the South Extension or Gulmohar Park centre on weekends. You can switch modes based on your convenience with prior notice.',
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

export default function OnlineNEETClassesSouthDelhiPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Online NEET Biology Classes - South Delhi',
    description:
      'Live interactive online NEET Biology coaching for South Delhi students with AIIMS faculty',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: flagshipCenter.streetAddress,
        addressLocality: flagshipCenter.addressLocality,
        addressRegion: flagshipCenter.addressRegion,
        postalCode: flagshipCenter.postalCode,
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
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cerebrumbiologyacademy.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'NEET Coaching South Delhi',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-south-delhi',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Online Classes',
        item: 'https://cerebrumbiologyacademy.com/online-neet-classes-south-delhi',
      },
    ],
  }

  return (
    <>
      <CerebrumPersonSchema
        knowsAbout={[
          'NEET South Delhi',
          'NEET Biology South Delhi',
          'Medical entrance coaching South Delhi',
        ]}
      />
      <DelhiAreaSchema
        pageSlug="online-neet-classes-south-delhi"
        subRegion="south"
        serviceName="Online NEET Biology Classes South Delhi"
        description="Live online NEET Biology classes for South Delhi students taught by the same AIIMS-trained faculty as Cerebrum Biology Academy's South Extension flagship and Gulmohar Park centres. Hybrid online + weekend centre option available."
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
      <OnlineNEETClassesContent faqs={faqs} />
    </>
  )
}
