import { Metadata } from 'next'
import CerebrumVsAllenContent from './CerebrumVsAllenContent'

export const metadata: Metadata = {
  title: 'Cerebrum vs Allen NEET Coaching | Compare Biology Classes Delhi NCR',
  description:
    'Detailed comparison of Cerebrum vs Allen for NEET Biology coaching. Compare batch sizes (15-20 vs 200+), AIIMS-trained faculty, personal attention, fee structure, and success rates in Delhi NCR.',
  keywords: [
    'cerebrum vs allen',
    'cerebrum vs allen neet coaching',
    'allen alternative delhi',
    'neet biology coaching comparison',
    'small batch neet coaching delhi',
    'cerebrum biology academy vs allen',
    'best neet biology coaching delhi ncr',
    'allen coaching alternative',
    'personalized neet coaching',
    'aiims faculty neet coaching',
  ],
  openGraph: {
    title: 'Cerebrum vs Allen NEET Coaching | Which is Better for Biology?',
    description:
      'Compare Cerebrum Biology Academy with Allen Career Institute. See why students switch to smaller batches, AIIMS faculty, and personalized attention.',
    url: 'https://cerebrumbiologyacademy.com/cerebrum-vs-allen-neet-coaching',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/cerebrum-vs-allen-neet-coaching',
  },
}

const faqs = [
  {
    question: 'How is Cerebrum different from Allen for NEET Biology?',
    answer:
      'Cerebrum focuses exclusively on Biology with AIIMS-trained faculty, offering batch sizes of 15-20 students versus Allen\'s 200+ batches. This means more personal attention, daily doubt-clearing sessions, and a 98% success rate in Biology. Allen covers all subjects but with larger classes and rotating faculty.',
  },
  {
    question: 'Why do students switch from Allen to Cerebrum?',
    answer:
      'Students often switch due to: 1) Large batch sizes at Allen making personal attention difficult, 2) Difficulty getting doubts resolved quickly, 3) Wanting specialized Biology coaching from AIIMS faculty, 4) Seeking a more affordable option with better student-teacher ratio. Many students complement their Allen Physics/Chemistry with Cerebrum Biology.',
  },
  {
    question: 'Is Cerebrum better than Allen for NEET Biology specifically?',
    answer:
      'For Biology-specific preparation, Cerebrum offers advantages: specialized Biology-only focus, AIIMS alumni teaching (Dr. Shekhar), 15-20 students per batch versus 200+, daily 1-on-1 doubt sessions, and 50+ NEET-pattern mock tests. Our Biology success rate is 98% compared to Allen\'s overall ~85%.',
  },
  {
    question: 'Can I join Cerebrum along with Allen for Biology support?',
    answer:
      'Yes! Many students continue at Allen for Physics and Chemistry while joining Cerebrum specifically for Biology coaching. We offer flexible weekend batches and evening sessions designed for students enrolled elsewhere. This combination often yields the best results.',
  },
  {
    question: 'How does the fee structure compare between Cerebrum and Allen?',
    answer:
      'Cerebrum fees range from Rs 45,000 to Rs 1,56,000 per year depending on the program, while Allen typically charges Rs 1,20,000 to Rs 2,00,000. Despite lower fees, Cerebrum offers smaller batches (15-20 vs 200+) and specialized Biology coaching.',
  },
  {
    question: 'What are the success rates of Cerebrum vs Allen?',
    answer:
      'Cerebrum has a 98% success rate for Biology (students scoring 300+ in Biology section). Allen\'s overall success rate is approximately 85% across all subjects. Our focused approach ensures deeper Biology mastery. Notable success: Sadhna Sirin scored 695/720 with our Biology coaching.',
  },
]

export default function CerebrumVsAllenPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Cerebrum vs Allen NEET Coaching Comparison',
    description:
      'Detailed comparison of Cerebrum Biology Academy vs Allen Career Institute for NEET Biology preparation in Delhi NCR',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'EducationalOrganization',
          position: 1,
          name: 'Cerebrum Biology Academy',
          description: 'Specialized NEET Biology coaching with small batches (15-20 students) and AIIMS faculty',
        },
        {
          '@type': 'EducationalOrganization',
          position: 2,
          name: 'Allen Career Institute',
          description: 'Large coaching institute offering preparation for NEET, JEE, and other competitive exams',
        },
      ],
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
      { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://cerebrumbiologyacademy.com/compare' },
      { '@type': 'ListItem', position: 3, name: 'Cerebrum vs Allen', item: 'https://cerebrumbiologyacademy.com/cerebrum-vs-allen-neet-coaching' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CerebrumVsAllenContent faqs={faqs} />
    </>
  )
}
