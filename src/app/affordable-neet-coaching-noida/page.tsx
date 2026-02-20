import { Metadata } from 'next'
import AffordableNEETCoachingNoidaContent from './AffordableNEETCoachingNoidaContent'

export const metadata: Metadata = {
  title: 'Affordable NEET Coaching in Noida | Budget-Friendly Biology Preparation',
  description:
    'Best affordable NEET coaching in Noida starting from ₹45,000/year. Quality Biology coaching with AIIMS faculty at 30-40% lower fees than Allen, Aakash. EMI options available.',
  keywords: [
    'affordable neet coaching noida',
    'cheap neet coaching noida',
    'budget neet coaching noida',
    'low cost neet preparation noida',
    'neet coaching fees noida',
    'economical neet classes noida',
    'neet coaching with emi noida',
    'best value neet coaching noida',
    'neet coaching under 50000 noida',
  ],
  openGraph: {
    title: 'Affordable NEET Coaching in Noida | Quality at Lower Cost',
    description:
      'Premium NEET Biology coaching at 30-40% lower fees than big institutes. Starting ₹45,000/year.',
    url: 'https://cerebrumbiologyacademy.com/affordable-neet-coaching-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/affordable-neet-coaching-noida',
  },
}

const faqs = [
  {
    question: 'What are the fees for NEET coaching at Cerebrum?',
    answer:
      'Our fees range from ₹45,000 to ₹1,56,000 per year depending on the program and tier. Pursuit tier: ₹45,000-70,000 (30-40 students), Ascent tier: ₹60,000-90,000 (16-18 students), Pinnacle tier: ₹90,000-1,56,000 (10-12 students with personal mentorship).',
  },
  {
    question: 'Is EMI facility available?',
    answer:
      'Yes! We offer 3, 6, and 12-month EMI options through major banks. 0% interest EMI available for 3-month plans. Contact us for personalized payment plans based on your needs.',
  },
  {
    question: 'Why is Cerebrum cheaper than Allen and Aakash?',
    answer:
      'We focus only on Biology (not all subjects), have lower overhead costs, and prioritize quality over marketing. We pass these savings to students. You get better student-teacher ratio at 30-40% lower fees.',
  },
  {
    question: 'Is the quality compromised due to lower fees?',
    answer:
      "Absolutely not! Lower fees don't mean lower quality. Our faculty is from AIIMS, we have 98% success rate, and smaller batches (10-20 students) compared to 100+ at big institutes. Quality is actually better.",
  },
  {
    question: 'Are there any scholarships available?',
    answer:
      'Yes! We offer: 1) Merit scholarships up to 50% for students scoring 90%+ in Class 10/12 boards 2) Financial hardship scholarships (need-based) 3) Sibling discounts 4) Early bird discounts.',
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

export default function AffordableNEETCoachingNoidaPage() {
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Affordable NEET Biology Coaching - Noida',
    description:
      'Budget-friendly NEET Biology preparation with AIIMS faculty, small batches, and 98% success rate',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Cerebrum Biology Academy',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'B-45, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'UP',
        postalCode: '201301',
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
        name: 'NEET Coaching Noida',
        item: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Affordable NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/affordable-neet-coaching-noida',
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
      <AffordableNEETCoachingNoidaContent faqs={faqs} />
    </>
  )
}
