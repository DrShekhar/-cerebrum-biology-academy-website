import { Metadata } from 'next'
import DropperBatchTemplate from '@/components/dropper/DropperBatchTemplate'

const cityName = 'Jaipur'
const citySlug = 'jaipur'

export const metadata: Metadata = {
  title: `NEET Dropper Batch 2026-27 ${cityName} | Repeater Course Online`,
  description: `NEET Dropper Batch 2026-27 for ${cityName} students. Intensive 1-year repeater programme, AIIMS-trained Biology-specialist faculty, 100-150 mark improvement. Live online.`,
  keywords: [
    `neet dropper batch 2026-27 ${citySlug}`,
    `neet repeater course ${citySlug}`,
    `neet dropper coaching ${citySlug}`,
    `best dropper batch for neet ${citySlug}`,
    `online neet dropper batch ${citySlug}`,
  ],
  openGraph: {
    title: `NEET Dropper Batch 2026-27 ${cityName} | Repeater Course`,
    description: `Intensive 1-year NEET preparation for droppers in ${cityName}. AIIMS-trained faculty.`,
    url: `https://cerebrumbiologyacademy.com/neet-dropper-batch-${citySlug}`,
    locale: 'en_IN',
    type: 'website',
  },
  alternates: { canonical: `https://cerebrumbiologyacademy.com/neet-dropper-batch-${citySlug}` },

  twitter: { card: 'summary_large_image' as const },
}

export default function Page() {
  return (
    <DropperBatchTemplate
      cityName={cityName}
      citySlug={citySlug}
      faqs={[
        { question: `Is the dropper batch available online for ${cityName} students?`, answer: `Yes — all sessions are live online from ${cityName}. Same AIIMS-trained faculty, same biology-specialist pedagogy as Delhi NCR batches. IST evening sessions fit the ${cityName} schedule.` },
        { question: `What score improvement can droppers from ${cityName} expect?`, answer: 'Our dropper programme targets 100-150 mark improvement from the previous attempt. We start with a detailed previous-attempt analysis to identify weak chapters, then build a personalised revision + drilling plan.' },
        { question: `How does the dropper batch differ from the regular programme?`, answer: 'The dropper batch assumes you have completed the NEET syllabus once. We focus on: (1) weak-chapter re-foundation, (2) double-density mock testing, (3) NEET PYQ pattern drilling, (4) error analysis from previous attempt. Pinnacle tier includes weekly 1:1 mentor sessions.' },
        { question: `What does the dropper programme cost?`, answer: 'Same as regular NEET Biology: Pursuit ₹48,000/yr, Ascent ₹76,000/yr, Pinnacle ₹98,000/yr. Ad-hoc 1:1 available at ₹2,500-4,500/hour.' },
      ]}
    />
  )
}
