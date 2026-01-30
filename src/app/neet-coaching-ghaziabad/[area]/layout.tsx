import type { Metadata } from 'next'
import {
  getAllGhaziabadAreaSlugs,
  getGhaziabadAreaBySlug,
} from '@/data/ghaziabad-areas'
import { CEREBRUM_METRICS } from '@/lib/constants/metrics'

type Props = {
  params: Promise<{ area: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area } = await params
  const areaData = getGhaziabadAreaBySlug(area)

  if (!areaData) {
    return {
      title: 'NEET Coaching in Ghaziabad | Cerebrum Biology Academy',
      description: 'Best NEET coaching in Ghaziabad with 94% success rate.',
    }
  }

  const schoolsText = areaData.schools.slice(0, 2).join(', ')
  const metroText = areaData.nearbyMetro[0] || 'Metro connectivity'

  const title = `NEET Coaching in ${areaData.name}, Ghaziabad | ${CEREBRUM_METRICS.successRateText} Success | Cerebrum Academy`
  const description = `Best NEET Biology coaching in ${areaData.name}, Ghaziabad. ${CEREBRUM_METRICS.successRateText} success rate. Students from ${schoolsText}. Near ${metroText}. Expert AIIMS faculty. Book free demo!`
  const keywords = [
    `NEET coaching ${areaData.name}`,
    `NEET coaching ${areaData.name} Ghaziabad`,
    `Best NEET coaching ${areaData.fullName}`,
    `Biology coaching ${areaData.name}`,
    `NEET tuition ${areaData.name}`,
    `Medical coaching ${areaData.name}`,
    ...areaData.schools.map((s) => `NEET coaching ${s}`),
    ...areaData.nearbyMetro.map((m) => `NEET coaching near ${m}`),
    ...areaData.societies.slice(0, 3).map((s) => `NEET coaching ${s}`),
    // AEO - Voice search phrases
    ...areaData.voiceSearchPhrases,
  ].join(', ')

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}`,
      siteName: 'Cerebrum Biology Academy',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://cerebrumbiologyacademy.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `NEET Coaching in ${areaData.name}, Ghaziabad`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://cerebrumbiologyacademy.com/neet-coaching-ghaziabad/${area}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateStaticParams() {
  return getAllGhaziabadAreaSlugs().map((area) => ({
    area,
  }))
}

export default function GhaziabadAreaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
