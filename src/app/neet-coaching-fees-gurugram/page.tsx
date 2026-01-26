import { Metadata } from 'next'
import NEETCoachingFeesContent from './NEETCoachingFeesContent'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

const gurugramLocation = CONTACT_INFO.location.gurugram

export const metadata: Metadata = {
  title: 'NEET Coaching Fees in Gurugram 2026 | Fee Comparison | ₹45K-2L',
  description:
    'Compare NEET coaching fees in Gurugram for 2026. Aakash, Allen, Cerebrum fees compared. Scholarships, EMI options. Find affordable NEET coaching in Gurgaon.',
  keywords: [
    'neet coaching fees gurugram',
    'neet coaching fees gurgaon',
    'cheap neet coaching gurugram',
    'affordable neet coaching gurgaon',
    'low fee neet coaching',
    'neet coaching scholarship gurugram',
    'neet coaching emi gurugram',
    'aakash fees gurugram',
    'allen fees gurgaon',
    'best value neet coaching',
    'neet coaching cost gurugram 2026',
  ],
  openGraph: {
    title: 'NEET Coaching Fees in Gurugram 2026 | Fee Comparison',
    description: 'Compare fees of top NEET institutes in Gurugram. Find scholarships, EMI options.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-fees-gurugram',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-fees-gurugram',
  },
}

const faqs = [
  {
    question: 'What is the average fee for NEET coaching in Gurugram?',
    answer:
      'NEET coaching fees in Gurugram range from ₹45,000 to ₹2,00,000+ per year. Budget options like Cerebrum start at ₹60,000/year. Premium institutes like Aakash and Allen charge ₹1.5-2 lakh/year. Online-only options start at ₹45,000.',
  },
  {
    question: 'Which is the most affordable NEET coaching in Gurugram?',
    answer:
      'Cerebrum Biology Academy offers the best value at ₹60,000-75,000/year with AIIMS faculty and 15-20 student batches. This is 50-60% lower than Aakash/Allen while maintaining 98% success rate.',
  },
  {
    question: 'Are scholarships available for NEET coaching?',
    answer:
      'Yes! Cerebrum offers merit-based scholarships up to 50% based on school marks and entrance test. Aakash and Allen also have scholarship tests. Apply early for best scholarship opportunities.',
  },
  {
    question: 'Can I pay NEET coaching fees in EMI?',
    answer:
      'Most institutes including Cerebrum offer EMI options. We provide 0% interest EMI for 3-6 months. Some banks offer education loans for coaching fees. Contact us for payment plans.',
  },
  {
    question: 'Why is Cerebrum cheaper than Aakash/Allen?',
    answer:
      'We focus exclusively on Biology (not all subjects), have smaller batches (lower overhead), no expensive marketing, and operate from corporate parks (not malls). Lower costs = lower fees for students.',
  },
  {
    question: 'What is included in NEET coaching fees?',
    answer:
      'At Cerebrum, fees include: live classes, complete study material, test series (30+ tests), doubt clearing sessions, parent counseling, and online access. No hidden charges.',
  },
  {
    question: 'Is there a registration or admission fee?',
    answer:
      'Cerebrum has no separate registration fee - just the course fee. Some institutes charge ₹5,000-10,000 registration. Always ask for complete fee breakdown before joining.',
  },
  {
    question: 'What is the fee for online NEET classes?',
    answer:
      'Online NEET classes at Cerebrum cost ₹45,000/year - about 25% less than offline. Same faculty, same material, same test series. Great option for students who prefer studying from home.',
  },
  {
    question: 'Are there different fees for Class 11 and Class 12?',
    answer:
      'Yes. Class 11 (2-year program): ₹60,000-70,000/year. Class 12 (1-year intensive): ₹70,000-85,000. Dropper batch: ₹75,000-90,000. Early enrollment discounts available.',
  },
  {
    question: 'Is NEET coaching worth the fees?',
    answer:
      'Good coaching can improve scores by 100-150 marks, making the difference between government and private medical college (saving ₹50-70 lakh in fees). ROI on quality coaching is excellent.',
  },
  {
    question: 'Can I get a refund if I want to discontinue?',
    answer:
      'Cerebrum offers prorated refunds within first month. After that, transfer to another batch or online mode is possible. Check refund policy before enrolling anywhere.',
  },
  {
    question: 'What payment methods are accepted?',
    answer:
      'We accept: UPI, bank transfer, credit/debit cards, cheque, and cash. EMI through credit cards (0% for 3-6 months) and education loans are also available.',
  },
]

export default function NEETCoachingFeesGurugramPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'NEET Coaching Fees in Gurugram 2026 - Complete Fee Comparison Guide',
    description: 'Comprehensive comparison of NEET coaching fees in Gurugram with scholarships, EMI options, and value analysis.',
    author: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerebrum Biology Academy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cerebrumbiologyacademy.com/logo.png',
      },
    },
    datePublished: '2025-01-01',
    dateModified: '2026-01-26',
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
      { '@type': 'ListItem', position: 2, name: 'NEET Coaching Gurugram', item: 'https://cerebrumbiologyacademy.com/neet-coaching-gurugram' },
      { '@type': 'ListItem', position: 3, name: 'Fees Comparison', item: 'https://cerebrumbiologyacademy.com/neet-coaching-fees-gurugram' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <NEETCoachingFeesContent faqs={faqs} />
    </>
  )
}
