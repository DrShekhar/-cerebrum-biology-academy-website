import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DropperBatchTemplate from '@/components/dropper/DropperBatchTemplate'
import { NEAR_ME_CITY_BY_SLUG } from '@/data/locality-content/near-me-cities'

const SLUG = 'bangalore'
const city = NEAR_ME_CITY_BY_SLUG[SLUG]

export const metadata: Metadata = city
  ? {
      title: `NEET Dropper Batch 2026-27 ${city.displayName} | Biology Specialist Repeater Programme · Cerebrum`,
      description: `NEET Dropper Batch 2026-27 for ${city.displayName} (${city.state}) students. Biology-specialist coaching for repeaters targeting ${city.stateQuotaCollege}${city.otherStateMedicalColleges?.length ? ' or ' + city.otherStateMedicalColleges[0] : ''}. AIIMS-trained faculty, 10-40 student batches, live online + study material shipped to ${city.majorAreas.slice(0, 3).join(', ')}. Pair with your existing ${city.localCoachingPresence.split(',')[0].trim().replace(/\\(.*\\)/, '').trim()} for PCM.`,
      keywords: [
        `neet dropper batch ${city.displayName}`,
        `neet dropper batch ${SLUG}`,
        `neet repeater coaching ${city.displayName}`,
        `neet dropper coaching ${city.displayName}`,
        `neet second attempt ${city.displayName}`,
        `best dropper batch for neet ${city.displayName}`,
        `online neet dropper batch ${city.displayName}`,
        `neet biology dropper ${city.displayName}`,
        `neet dropper ${city.state}`,
        ...city.feederSchools.map((s) => `NEET dropper for ${s} alumni`),
        ...(city.altNames ?? []).map((n) => `neet dropper batch ${n}`),
      ],
      alternates: {
        canonical: `https://cerebrumbiologyacademy.com/neet-dropper-batch-${SLUG}`,
      },
      openGraph: {
        title: `NEET Dropper Batch 2026-27 ${city.displayName} · Cerebrum Biology Academy`,
        description: `Biology-specialist NEET repeater programme for ${city.displayName} students targeting ${city.stateQuotaCollege}.`,
        url: `https://cerebrumbiologyacademy.com/neet-dropper-batch-${SLUG}`,
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: `NEET Coaching in ${city.displayName} · Cerebrum Biology Academy`,
        description: `Best NEET Biology coaching for ${city.displayName} students at Cerebrum.`,
      },
      robots: 'index, follow, max-image-preview:large',
    }
  : { title: 'City not found' }

export default function Page() {
  if (!city) notFound()
  const localCoaching = city.localCoachingPresence
    .split(',')[0]
    .trim()
    .replace(/\(.*\)/, '')
    .trim()
  return (
    <DropperBatchTemplate
      cityName={city.displayName}
      citySlug={SLUG}
      faqs={[
        {
          question: `What does the NEET dropper batch in ${city.displayName} include?`,
          answer: `Biology-specialist 1-year repeater programme targeting +25-40 marks on biology. Live online via Zoom (IST evenings Mon/Wed/Fri + weekend mocks), printed material shipped to ${city.majorAreas.slice(0, 3).join(', ')}, weekly chapter tests with per-MCQ review, direct Dr. Shekhar mentorship in Pinnacle tier. Pair with ${localCoaching} for PCM.`,
        },
        {
          question: `What's the realistic mark improvement for a ${city.displayName} dropper?`,
          answer: `Cohort average: +25-40 marks biology over 10 months. Research-backed (Karpicke & Roediger 2008 retrieval practice + Dunlosky 2013 testing effect). Some students gain +50+ marks if biology was below 250.`,
        },
        {
          question: `Target college for a ${city.displayName} aspirant?`,
          answer: `Most achievable via ${city.state} state quota: ${city.stateQuotaCollege}. Also realistic: ${(city.otherStateMedicalColleges ?? []).join(', ') || 'AIIMS Delhi via all-India quota'}.`,
        },
        {
          question: `Is online dropper coaching from ${city.displayName} as good as relocating to Kota?`,
          answer: `For biology specifically — yes. Kota PCM is unmatched but biology batches are 150-200 students. Cerebrum batches are 10-40 with per-MCQ review. Saves Rs 2-3L hostel cost.`,
        },
        {
          question: `Schools like ${city.feederSchools.slice(0, 2).join(' or ')} alumni — fit?`,
          answer: `Yes — we've worked with droppers from ${city.feederSchools.slice(0, 3).join(', ')}. Strong PCM foundation but biology stagnant 270-290 is the consistent pattern. Our 10-month plan moves that to 320+/360.`,
        },
        {
          question: `Pricing for ${city.displayName} dropper?`,
          answer: `Pursuit Rs 48,000/yr; Ascent Rs 76,000/yr; Pinnacle ZA Rs 98,000/yr. EMI available. Shipping included.`,
        },
        {
          question: `Schedule alongside local PCM coaching?`,
          answer: `Biology 6-8 hours/week (Mon/Wed/Fri evening + Sunday morning test). PCM at ${localCoaching} during the day, Cerebrum biology in the evening.`,
        },
      ]}
    />
  )
}
