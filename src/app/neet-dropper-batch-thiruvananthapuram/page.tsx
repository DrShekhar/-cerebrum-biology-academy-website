import { Metadata } from 'next'
import DropperBatchTemplate from '@/components/dropper/DropperBatchTemplate'

const cityName = 'Thiruvananthapuram'
const citySlug = 'thiruvananthapuram'

export const metadata: Metadata = {
  title: `NEET Dropper Batch 2026-27 ${cityName} | Repeater Course Online`,
  description: `NEET Dropper Batch 2026-27 for ${cityName} students. Intensive 1-year repeater programme, AIIMS-trained Biology-specialist faculty. Live online.`,
  keywords: ['neet dropper batch thiruvananthapuram', 'neet repeater course thiruvananthapuram', 'best dropper batch neet thiruvananthapuram'],
  alternates: { canonical: `https://cerebrumbiologyacademy.com/neet-dropper-batch-thiruvananthapuram` },
  openGraph: { title: `NEET Dropper Batch 2026-27 ${cityName}`, url: `https://cerebrumbiologyacademy.com/neet-dropper-batch-thiruvananthapuram`, locale: 'en_IN', type: 'website' },

  twitter: { card: 'summary_large_image' as const },
}

export default function Page() {
  return (
    <DropperBatchTemplate
      cityName={cityName}
      citySlug={citySlug}
      faqs={[
        { question: `Is the dropper batch available online for ${cityName}?`, answer: 'Yes — all sessions live online. Same AIIMS-trained faculty. IST evening sessions.' },
        { question: 'What score improvement can droppers expect?', answer: 'Target 100-150 mark improvement from previous attempt.' },
        { question: 'What does it cost?', answer: 'Pursuit Rs 48,000/yr. Ascent Rs 76,000/yr. Pinnacle Rs 98,000/yr.' },
      ]}
    />
  )
}
