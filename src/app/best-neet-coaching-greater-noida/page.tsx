import { Metadata } from 'next'
import BestNEETCoachingContent from './BestNEETCoachingContent'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Greater Noida 2026 | Top Institutes Compared',
  description:
    'Compare the best NEET coaching institutes for Greater Noida students for 2026. Fees, faculty, success rates, batch sizes compared. Only biology-specialist coaching serving Greater Noida with online + hybrid model.',
  keywords: [
    'best neet coaching greater noida',
    'best neet coaching in greater noida',
    'top neet coaching greater noida',
    'neet coaching comparison greater noida',
    'best biology coaching greater noida',
    'neet coaching institutes greater noida',
    'neet coaching fees greater noida',
    'best neet faculty greater noida',
    'aiims coaching greater noida',
    'neet coaching gaur city',
    'neet coaching knowledge park',
    'neet coaching pari chowk',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Greater Noida 2026 | Top Institutes Compared',
    description:
      'Compare top NEET coaching institutes for Greater Noida students. Fees, faculty, results compared.',
    url: 'https://cerebrumbiologyacademy.com/best-neet-coaching-greater-noida',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-neet-coaching-greater-noida',
  },
}

const faqs = [
  {
    question: 'Which is the best NEET coaching institute for Greater Noida students?',
    answer:
      'For Biology-focused NEET preparation, Cerebrum Biology Academy stands out with AIIMS-trained faculty (Dr. Shekhar Singh), 98% success rate, small batch sizes (15-20 students), and 15+ years of experience. Greater Noida students attend via online/hybrid or visit our Sector 62 Noida center (accessible via Aqua Line Metro). For Physics-Chemistry focused, students also consider Allen and Aakash.',
  },
  {
    question: 'What are the fees for NEET coaching for Greater Noida students?',
    answer:
      'NEET coaching fees range from ₹60,000 to ₹2,00,000+ per year. Budget options like Cerebrum start at ₹60,000/year with AIIMS faculty. Premium institutes like Allen and Aakash charge ₹1,50,000-2,00,000/year. Online options start at ₹45,000. Greater Noida students often prefer online/hybrid for convenience.',
  },
  {
    question: 'Is it better to join coaching in Noida or Greater Noida?',
    answer:
      'Greater Noida students can easily reach our Sector 62 Noida center via the Aqua Line Metro (connects to Blue Line). Alternatively, our online + hybrid classes provide the same quality experience without commute. Cerebrum offers the same AIIMS faculty quality without travel hassle.',
  },
  {
    question: 'What factors should I consider when choosing NEET coaching?',
    answer:
      'Key factors: (1) Faculty qualifications - AIIMS/top medical college alumni, (2) Batch size - smaller is better for personalized attention, (3) Success rate - verified results, (4) Location convenience or online availability, (5) Study material quality, (6) Doubt-clearing support, (7) Fee structure.',
  },
  {
    question: 'Does Cerebrum Biology Academy cover all NEET subjects?',
    answer:
      'Cerebrum specializes in Biology (Botany + Zoology), which is 360/720 marks in NEET - the highest weightage subject. For Physics and Chemistry, we provide guidance, study materials, and recommend partner institutes. Many students join us exclusively for Biology excellence.',
  },
  {
    question: 'What is the batch size at top NEET coaching centers for Greater Noida?',
    answer:
      'Batch sizes vary significantly: Large institutes like Aakash/Allen have 60-100+ students per batch. Cerebrum maintains 15-20 students per batch for personalized attention. Smaller batches allow faculty to track individual progress and provide targeted support.',
  },
  {
    question: 'Can I switch from another coaching to Cerebrum mid-year?',
    answer:
      'Yes, we accept lateral entries with prorated fees. Many students switch to Cerebrum for Biology after realizing they need specialized coaching. We offer catch-up sessions to help you align with the current batch. Contact us for evaluation.',
  },
  {
    question: 'Do coaching institutes offer online NEET classes for Greater Noida students?',
    answer:
      'Yes, Cerebrum provides live Zoom classes with recording access, digital study material, and online doubt sessions - ideal for Greater Noida students. Online + hybrid classes are specifically designed for students who prefer learning from home. Fees are typically 30-40% lower than offline.',
  },
  {
    question: 'What is the best time to start NEET coaching?',
    answer:
      'Ideally, start from Class 11 for a strong foundation. However, Class 12 students can join 1-year intensive programs. Droppers should start immediately after results. Early starters at Cerebrum show 25% higher average scores than late joiners.',
  },
  {
    question: 'Are dropper batches available for Greater Noida students?',
    answer:
      'Yes, Cerebrum has dedicated dropper batches with intensive daily classes (6+ hours). Online and hybrid options are available for Greater Noida students. These batches focus on weak area improvement, regular mock tests, and personalized mentoring for better results.',
  },
  {
    question: 'Can I take a demo class before enrolling?',
    answer:
      'Cerebrum offers free demo classes - experience our teaching style before committing. Greater Noida students can attend demo online. Demo classes help you assess faculty quality, batch environment, and teaching methodology firsthand.',
  },
  {
    question: 'How do coaching institutes keep parents updated on progress?',
    answer:
      'Cerebrum provides monthly parent-teacher meetings, regular test score reports, and WhatsApp updates. Smaller batch sizes at Cerebrum allow more personalized feedback on student performance and areas needing improvement.',
  },
]

export default function BestNEETCoachingGreaterNoidaPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best NEET Coaching in Greater Noida 2026 - Complete Comparison Guide',
    description:
      'Comprehensive comparison of top NEET coaching institutes for Greater Noida students with fees, faculty details, and success rates.',
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
        name: 'Best NEET Coaching',
        item: 'https://cerebrumbiologyacademy.com/best-neet-coaching-greater-noida',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BestNEETCoachingContent faqs={faqs} />
    </>
  )
}
