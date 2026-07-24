import type { Metadata } from 'next'
import NEETCoachingNearMeContent from './NEETCoachingNearMeContent'

const CANONICAL = 'https://cerebrumbiologyacademy.com/neet-coaching-near-me-gurugram'

export const metadata: Metadata = {
  title: 'NEET Biology Coaching Near Me in Gurugram | Sector 51 Centre · Cerebrum',
  description:
    'Looking for NEET Biology coaching near you in Gurugram? Our Sector 51 centre (M2K Corporate Park, Mayfield Garden) is central to DLF, Sohna Road, Golf Course Road and MG Road, minutes from the metro — with live online classes for New Gurugram sectors. AIIMS-trained faculty, small batches.',
  keywords: [
    'NEET coaching near me Gurugram',
    'biology coaching near me Gurugram',
    'NEET biology tutor near me Gurugram',
    'NEET coaching near me Gurgaon',
    'biology classes near me Gurugram Sector 51',
    'NEET coaching DLF Sohna Road Golf Course Road',
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: 'NEET Biology Coaching Near Me in Gurugram · Cerebrum Biology Academy',
    description:
      'Central Sector 51 centre near HUDA City Centre metro, plus live online classes across Gurugram. AIIMS-trained faculty, small batches, biology-only focus.',
    url: CANONICAL,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Coaching Near Me in Gurugram · Cerebrum',
    description:
      'Sector 51 centre central to DLF, Sohna Road and Golf Course Road, plus online across Gurugram.',
  },
  robots: 'index, follow, max-image-preview:large',
}

const faqs = [
  {
    question: 'Where exactly is your Gurugram NEET coaching centre?',
    answer:
      'Our centre is at Unit 17, M2K Corporate Park, Mayfield Garden, Sector 51, Gurugram 122018 — central to DLF, Sohna Road, Golf Course Road and MG Road, with free parking in the building.',
  },
  {
    question: 'How do I reach the Sector 51 centre by metro?',
    answer:
      'The nearest metro is Sector 53-54 on the Rapid Metro (about 2 km away). The centre is also easily reached from HUDA City Centre and MG Road metro stations, and directly off NH-48 and Sohna Road by road.',
  },
  {
    question: 'I live in a New Gurugram sector far from Sector 51. What are my options?',
    answer:
      'If you are in the newer sectors (Sohna Road belt, Sectors 80s-110s) or Manesar, you can join the same small-batch NEET Biology programme through live online classes with the same AIIMS-trained faculty — and come to the Sector 51 centre for full-length tests and doubt sessions when you want.',
  },
  {
    question: 'Which areas do your Gurugram students come from?',
    answer:
      'Students travel in from DLF Phases 1-5, Golf Course Road, Sohna Road, Sushant Lok, South City, Nirvana Country, MG Road and the New Gurugram sectors — most reach the Sector 51 centre within 10-20 minutes.',
  },
  {
    question: 'Do you teach only Biology, or all NEET subjects?',
    answer:
      'We are a Biology-only specialist. Many students keep their existing Physics and Chemistry coaching and add Cerebrum for Biology depth, in small batches with weekly testing and per-student review.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <NEETCoachingNearMeContent faqs={faqs} />
    </>
  )
}
