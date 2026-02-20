import { Metadata } from 'next'
import AffordableNEETCoachingContent from './AffordableNEETCoachingContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const noidaLocation = CONTACT_INFO.centers.noida

export const metadata: Metadata = {
  title: 'Affordable NEET Coaching in Greater Noida | Budget-Friendly Biology Preparation',
  description:
    'Best affordable NEET coaching for Greater Noida students starting from ₹45,000/year. Quality Biology coaching with AIIMS faculty at 30-40% lower fees than Aakash Greater Noida (₹1.36L+). Online + hybrid classes available. EMI options available.',
  keywords: [
    'affordable neet coaching greater noida',
    'cheap neet coaching greater noida',
    'budget neet coaching greater noida',
    'low cost neet preparation greater noida',
    'neet coaching fees greater noida',
    'economical neet classes greater noida',
    'neet coaching with emi greater noida',
    'best value neet coaching greater noida',
    'neet coaching under 50000 greater noida',
    'online neet coaching greater noida',
  ],
  openGraph: {
    title: 'Affordable NEET Coaching in Greater Noida | Quality at Lower Cost',
    description:
      'Premium NEET Biology coaching at 30-40% lower fees than Aakash Greater Noida. Starting ₹45,000/year. Online + hybrid available.',
    url: 'https://cerebrumbiologyacademy.com/affordable-neet-coaching-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/affordable-neet-coaching-greater-noida',
  },
}

const faqs = [
  {
    question: 'What are the fees for NEET coaching at Cerebrum for Greater Noida students?',
    answer:
      'Our fees range from ₹45,000 to ₹1,56,000 per year depending on the program and tier. Pursuit tier: ₹45,000-70,000 (30-40 students), Ascent tier: ₹60,000-90,000 (16-18 students), Pinnacle tier: ₹90,000-1,56,000 (10-12 students with personal mentorship). Online + hybrid classes available for Greater Noida students.',
  },
  {
    question: 'Is EMI facility available?',
    answer:
      'Yes! We offer 3, 6, and 12-month EMI options through major banks. 0% interest EMI available for 3-month plans. Contact us for personalized payment plans based on your needs.',
  },
  {
    question: 'Why is Cerebrum cheaper than Aakash Greater Noida?',
    answer:
      'We focus only on Biology (not all subjects), have lower overhead costs, and prioritize quality over marketing. Aakash Greater Noida charges ₹1.36L+, while Cerebrum starts at ₹45,000. You get better student-teacher ratio at 30-40% lower fees.',
  },
  {
    question: 'Is the quality compromised due to lower fees?',
    answer:
      "Absolutely not! Lower fees don't mean lower quality. Our faculty is from AIIMS, we have 98% success rate, and smaller batches (10-20 students) compared to 100+ at big institutes. Quality is actually better.",
  },
  {
    question: 'Are there any scholarships available for Greater Noida students?',
    answer:
      'Yes! We offer: 1) Merit scholarships up to 50% for students scoring 90%+ in Class 10/12 boards 2) Financial hardship scholarships (need-based) 3) Sibling discounts 4) Early bird discounts. Online students from Greater Noida are eligible.',
  },
  {
    question: 'What is included in the fees?',
    answer:
      'Complete Biology syllabus coverage, study materials, 50+ mock tests, doubt clearing sessions, performance tracking, parent updates, and access to AI-powered preparation tools. No hidden charges.',
  },
  {
    question: 'Can I pay in installments without EMI?',
    answer:
      'Yes, we offer flexible payment options. Pay 50% upfront and rest in 2 installments. Or pay monthly with a small convenience fee. We work with families to find suitable arrangements.',
  },
]

export default function AffordableNEETCoachingGreaterNoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Affordable NEET Biology Coaching - Greater Noida',
    description:
      'Budget-friendly NEET Biology preparation with AIIMS faculty, small batches, and 98% success rate. Online + hybrid classes for Greater Noida students.',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: noidaLocation.streetAddress,
        addressLocality: noidaLocation.addressLocality,
        addressRegion: noidaLocation.addressRegion,
        postalCode: noidaLocation.postalCode,
        addressCountry: 'IN',
      },
    },
    educationalLevel: 'Class 11-12, Droppers',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: '45000',
      priceValidUntil: '2026-12-31',
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
        name: 'Affordable NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/affordable-neet-coaching-greater-noida',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AffordableNEETCoachingContent faqs={faqs} />
    </>
  )
}
