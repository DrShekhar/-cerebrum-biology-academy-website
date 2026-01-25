import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cerebrum vs Other NEET Coaching | Small Batch vs Large Batch Comparison 2026',
  description:
    'Compare Cerebrum Biology Academy with other NEET coaching institutes. See batch size, faculty qualifications, success rates, and fees comparison. Make an informed decision.',
  keywords: [
    'Cerebrum vs Aakash',
    'Cerebrum vs Allen',
    'small batch vs large batch NEET coaching',
    'best NEET Biology coaching comparison',
    'NEET coaching comparison Delhi',
    'Biology-only coaching vs PCB coaching',
    'specialized NEET coaching',
    'NEET coaching batch size comparison',
    'AIIMS faculty vs regular faculty',
    'NEET coaching fees comparison Delhi',
  ],
  openGraph: {
    title: 'NEET Coaching Comparison 2026 | Cerebrum vs Others',
    description:
      'Detailed comparison of NEET coaching options - batch sizes, faculty, success rates, and fees.',
    type: 'website',
  },
}

export default function ComparisonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the difference between small batch and large batch NEET coaching?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Small batch coaching (15-20 students like Cerebrum) offers personalized attention, direct faculty interaction, and customized doubt clearing. Large batch coaching (40-80 students) is more affordable but offers less individual attention. Small batches typically have 98% success rates vs 60-70% for large batches.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is Biology-only coaching better than PCB (Physics Chemistry Biology) coaching?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Biology-only coaching like Cerebrum Academy offers 100% focused preparation with specialized AIIMS faculty. Since Biology is 360/720 marks (50%) in NEET, specialized coaching can significantly boost scores. PCB coaching divides attention across subjects but offers convenience of one-stop preparation.',
                },
              },
              {
                '@type': 'Question',
                name: 'How does Cerebrum Biology Academy compare to large coaching chains?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Cerebrum Biology Academy has 15-20 students per batch (vs 40-80 in chains), AIIMS-qualified faculty (vs mixed backgrounds), 98% success rate (vs 60-70%), and 695/720 top score. Fees are comparable but personalization is significantly higher.',
                },
              },
              {
                '@type': 'Question',
                name: 'What makes AIIMS faculty better for NEET Biology coaching?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'AIIMS faculty have cleared the toughest medical entrance themselves, understand question patterns deeply, can teach clinical applications making concepts memorable, and have real medical experience. This translates to higher student scores in Biology.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'NEET Coaching Comparison 2026: Small Batch vs Large Batch',
            author: {
              '@type': 'Person',
              name: 'Dr. Shekhar C Singh',
              jobTitle: 'Founder, Cerebrum Biology Academy',
              alumniOf: 'AIIMS Delhi',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Cerebrum Biology Academy',
            },
            datePublished: '2026-01-01',
            dateModified: '2026-01-25',
          }),
        }}
      />
      {children}
    </>
  )
}
