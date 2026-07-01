import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BestNeetCoachingTemplate from '@/components/seo/BestNeetCoachingTemplate'
import { NEAR_ME_CITY_BY_SLUG } from '@/data/locality-content/near-me-cities'

const SLUG = 'kota'
const city = NEAR_ME_CITY_BY_SLUG[SLUG]
const PAGE_URL = `https://cerebrumbiologyacademy.com/best-neet-coaching-${SLUG}`

export const metadata: Metadata = city
  ? {
      title: `Best NEET Coaching in ${city.displayName} 2026-27 | Biology Specialist · Cerebrum`,
      description: `Best NEET coaching in ${city.displayName} (${city.state}) compared — and why biology (360/720) decides your rank. AIIMS-trained biology-specialist faculty, 10-40 student batches, live online, targeting ${city.stateQuotaCollege}. Transparent fees.`,
      keywords: [
        `best neet coaching ${city.displayName}`,
        `best neet coaching in ${city.displayName}`,
        `top neet coaching ${city.displayName}`,
        `best neet biology coaching ${city.displayName}`,
        `neet coaching ${city.displayName}`,
        `best neet coaching ${city.state}`,
        ...(city.altNames ?? []).map((n) => `best neet coaching ${n}`),
      ],
      alternates: { canonical: PAGE_URL },
      openGraph: {
        title: `Best NEET Coaching in ${city.displayName} 2026-27 · Cerebrum`,
        description: `Biology-specialist NEET coaching for ${city.displayName} aspirants. AIIMS faculty, small batches.`,
        url: PAGE_URL,
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image' as const,
        title: `Best NEET Coaching in ${city.displayName} · Cerebrum`,
        description: `Biology-specialist NEET coaching for ${city.displayName}.`,
      },
      robots: 'index, follow',
    }
  : { title: 'City not found' }

export default function Page() {
  if (!city) notFound()
  return <BestNeetCoachingTemplate city={city} />
}
