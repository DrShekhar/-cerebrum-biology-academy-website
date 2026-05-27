import { Metadata } from 'next'
import DropperBatchTemplate from '@/components/dropper/DropperBatchTemplate'

const cityName = 'Madurai'
const citySlug = 'madurai'

export const metadata: Metadata = {
  title: `NEET Dropper Batch 2026-27 ${cityName} | Repeater Course Online`,
  description: `NEET Dropper Batch 2026-27 for ${cityName} students. Intensive 1-year repeater programme, AIIMS-trained Biology-specialist faculty. Live online.`,
  keywords: ['neet dropper batch madurai', 'neet repeater course madurai', 'best dropper batch neet madurai'],
  alternates: { canonical: `https://cerebrumbiologyacademy.com/neet-dropper-batch-madurai` },
  openGraph: { title: `NEET Dropper Batch 2026-27 ${cityName}`, url: `https://cerebrumbiologyacademy.com/neet-dropper-batch-madurai`, locale: 'en_IN', type: 'website' },
}

export default function Page() {
  return (
    <DropperBatchTemplate
      cityName={cityName}
      citySlug={citySlug}
      faqs={[
        { question: `Is the dropper batch available online for ${cityName}?`, answer: 'Yes — all sessions live online. Same AIIMS-trained faculty as Delhi NCR. IST evening sessions.' },
        { question: 'What score improvement can droppers expect?', answer: 'Target 100-150 mark improvement. Previous-attempt analysis + personalised weak-chapter drilling.' },
        { question: 'What does it cost?', answer: 'Pursuit Rs 48,000/yr. Ascent Rs 76,000/yr. Pinnacle Rs 98,000/yr.' },
      ]}
    />
  )
}
