import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DropperBatchTemplate from '@/components/dropper/DropperBatchTemplate'
import { NEAR_ME_CITY_BY_SLUG } from '@/data/locality-content/near-me-cities'

const SLUG = 'mangalore'
const city = NEAR_ME_CITY_BY_SLUG[SLUG]

export const metadata: Metadata = city
  ? {
      title: `NEET Dropper Batch 2027 ${city.displayName} | Biology Specialist Repeater Programme · Cerebrum`,
      description: `NEET Dropper Batch 2027 for ${city.displayName} (${city.state}) students. Biology-specialist coaching for repeaters targeting ${city.stateQuotaCollege}${city.otherStateMedicalColleges?.length ? ' or ' + city.otherStateMedicalColleges[0] : ''}. AIIMS-trained faculty, 10-40 student batches, live online + study material shipped to ${city.majorAreas.slice(0, 3).join(', ')}. Pair with your existing ${city.localCoachingPresence
        .split(',')[0]
        .trim()
        .replace(/\\(.*\\)/, '')
        .trim()} for PCM.`,
      keywords: [
        `neet dropper batch ${city.displayName}`,
        `neet dropper batch ${SLUG}`,
        `neet repeater coaching ${city.displayName}`,
        `neet dropper coaching ${city.displayName}`,
        `neet second attempt ${city.displayName}`,
        `neet repeater batch ${city.displayName}`,
        `best dropper batch for neet ${city.displayName}`,
        `online neet dropper batch ${city.displayName}`,
        `neet biology dropper ${city.displayName}`,
        `neet dropper ${city.state}`,
        ...city.feederSchools.map((s) => `NEET dropper for ${s} alumni`),
        ...(city.altNames ?? []).map((n) => `neet dropper batch ${n}`),
      ],
      alternates: {
        canonical: `https://cerebrumbiologyacademy.com/neet-dropper-batch-${SLUG}`,
        languages: {
          en: `https://cerebrumbiologyacademy.com/neet-dropper-batch-${SLUG}`,
          'en-IN': `https://cerebrumbiologyacademy.com/neet-dropper-batch-${SLUG}`,
        },
      },
      openGraph: {
        title: `NEET Dropper Batch 2027 ${city.displayName} · Cerebrum Biology Academy`,
        description: `Biology-specialist NEET repeater programme for ${city.displayName} students targeting ${city.stateQuotaCollege}. AIIMS-trained faculty.`,
        url: `https://cerebrumbiologyacademy.com/neet-dropper-batch-${SLUG}`,
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: `NEET Coaching in ${city.displayName} · Cerebrum Biology Academy`,
        description: `Best NEET Biology coaching for ${city.displayName} students at Cerebrum.`,
      },
      // noindex 2026-06 (doorway consolidation Tier C): this intent page shares
      // ~96% of its rendered copy with its city siblings — Google's scaled-content
      // policy territory. Page stays fully live for visitors and internal links
      // (follow); the city's near-me page + city hub carry the indexable signal.
      // Reversible: restore 'index, follow' when the page gets >=40% unique copy.
      robots: 'noindex, follow',
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
          question: `What does the NEET dropper batch in ${city.displayName} actually include?`,
          answer: `Biology-specialist 1-year repeater programme designed to add 100-150 marks on biology alone. Live online via Zoom in IST evenings (5:30-8 PM Mon/Wed/Fri + weekend mocks), printed study material shipped to your ${city.displayName} address (${city.majorAreas.slice(0, 3).join(', ')} all covered), weekly chapter tests with per-MCQ review, and direct Dr. Shekhar mentorship in the Pinnacle tier. We don't teach physics or chemistry — pair us with your existing ${localCoaching} (or any local PCM source) for the full package.`,
        },
        {
          question: `What's the realistic mark improvement for a ${city.displayName} dropper?`,
          answer: `Average across our dropper cohorts: +25 to +40 marks in biology alone over 10 months. That's the largest subject-level improvement we see — biology has the most ground to gain because most droppers have unrefined recall, not weak fundamentals. The mechanism is research-backed (Karpicke & Roediger 2008 spaced retrieval + Dunlosky 2013 testing effect) — exactly what our weekly cycle delivers.`,
        },
        {
          question: `Which medical college is realistic for a ${city.displayName} aspirant after the dropper year?`,
          answer: `Most achievable via ${city.state} state quota: ${city.stateQuotaCollege}. Also realistic: ${(city.otherStateMedicalColleges ?? []).join(', ') || 'AIIMS Delhi via all-India quota'}. We calibrate biology score targets to your specific college aspiration.`,
        },
        {
          question: `Is online dropper coaching from ${city.displayName} as good as relocating to Kota?`,
          answer: `For biology specifically — yes. Kota's PCM teaching is unmatched, but their biology batches are 150-200 students. Cerebrum biology batches are 10-40 with per-MCQ review weekly. Many ${city.displayName} families pair us with a local Allen or Aakash for PCM and save the ₹2-3L Kota hostel cost while keeping the family support system intact.`,
        },
        {
          question: `How do ${city.displayName} dropper batches handle schools like ${city.feederSchools.slice(0, 2).join(' or ')}?`,
          answer: `School completion before dropper year, so school-side rhythm doesn't apply. We've worked with droppers from ${city.feederSchools.slice(0, 3).join(', ')}, and the consistent pattern is: strong PCM foundation but biology score stuck at 270-290. Our 10-month plan moves that to 320+/360.`,
        },
        {
          question: `What's the pricing for the ${city.displayName} dropper programme?`,
          answer: `Pricing is the same nationally — Pursuit (30-40 students) ₹40,000–₹75,000/yr; Ascent (16-25 students with weekly 1:1 doubt slot) ₹58,000–₹90,000/yr; Pinnacle ZA (10-12 students with direct Dr. Shekhar weekly mentor calls) ₹1,20,000–₹1,56,000/yr. EMI options available. Shipping of printed material included.`,
        },
        {
          question: `Schedule for a ${city.displayName} dropper while doing local Allen / Aakash?`,
          answer: `Dropper batch is intensive but fits alongside local PCM coaching. Live online biology 6-8 hours/week (Mon/Wed/Fri evening + Sunday morning test). Most droppers do PCM at ${localCoaching} during the day and Cerebrum biology in the evening. Recordings available for any session missed due to Allen / Aakash scheduling clash.`,
        },
      ]}
    />
  )
}
