import { Metadata } from 'next'
import DropperBatchTemplate from '@/components/dropper/DropperBatchTemplate'
const cityName = 'Karnal'
const citySlug = 'karnal'
export const metadata: Metadata = {
  title: `NEET Dropper Batch 2026-27 ${cityName} | Repeater Course Online`,
  description: `NEET Dropper Batch 2026-27 for ${cityName} students. AIIMS-trained Biology-specialist faculty. Live online.`,
  keywords: ['neet dropper batch karnal', 'neet repeater karnal'],
  alternates: { canonical: `https://cerebrumbiologyacademy.com/neet-dropper-batch-karnal` },
  openGraph: { title: `NEET Dropper Batch 2026-27 ${cityName}`, url: `https://cerebrumbiologyacademy.com/neet-dropper-batch-karnal`, locale: 'en_IN', type: 'website' },
}
export default function Page() {
  return <DropperBatchTemplate cityName={cityName} citySlug={citySlug} faqs={[
    { question: `Dropper batch online for ${cityName}?`, answer: 'Yes — live online, AIIMS faculty, IST evenings.' },
    { question: 'Cost?', answer: 'Pursuit Rs 48,000/yr. Ascent Rs 76,000/yr. Pinnacle Rs 98,000/yr.' },
  ]} />
}
