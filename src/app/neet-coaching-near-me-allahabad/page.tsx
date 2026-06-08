import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NEAR_ME_CITY_BY_SLUG } from '@/data/locality-content/near-me-cities'
import { NearMeCityTemplate } from '@/components/locality/NearMeCityTemplate'

const SLUG = 'allahabad'
const city = NEAR_ME_CITY_BY_SLUG[SLUG]

export const metadata: Metadata = city
  ? {
      title: `NEET Coaching Near Me in ${city.displayName} | Online Biology Specialist · Cerebrum`,
      description: `Online NEET biology coaching for ${city.displayName} students. AIIMS-trained faculty, small batches (10-40), live Zoom classes from any neighbourhood (${city.majorAreas.slice(0, 3).join(', ')}), printed study material shipped. Target: ${city.stateQuotaCollege}. Pair with your existing PCM coaching.`,
      keywords: [
        `NEET coaching near me ${city.displayName}`,
        `NEET coaching near me ${SLUG}`,
        `NEET biology coaching ${city.displayName}`,
        `online NEET coaching ${city.displayName}`,
        `best NEET coaching ${city.displayName}`,
        `NEET coaching ${city.state}`,
        `NEET biology tutor ${city.displayName}`,
        `AIIMS faculty NEET ${city.displayName}`,
        ...city.feederSchools.map((s) => `NEET coaching for ${s} students`),
        ...(city.altNames ?? []).map((n) => `NEET coaching near me ${n}`),
      ],
      alternates: {
        canonical: `https://cerebrumbiologyacademy.com/neet-coaching-near-me-${SLUG}`,
        languages: {
          en: `https://cerebrumbiologyacademy.com/neet-coaching-near-me-${SLUG}`,
          'en-IN': `https://cerebrumbiologyacademy.com/neet-coaching-near-me-${SLUG}`,
        },
      },
      openGraph: {
        title: `NEET Coaching Near Me in ${city.displayName} · Cerebrum Biology Academy`,
        description: `Live online NEET Biology coaching for ${city.displayName} aspirants targeting ${city.stateQuotaCollege}. AIIMS-trained faculty, NCERT-line-by-line.`,
        url: `https://cerebrumbiologyacademy.com/neet-coaching-near-me-${SLUG}`,
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
  return <NearMeCityTemplate city={city} />
}
