import type { Metadata } from 'next'
import { getOlympiadCountry, olympiadCountrySlugs } from '@/config/olympiad-countries'

const BASE = 'https://cerebrumbiologyacademy.com/programs/biology-olympiad'

interface LayoutParams {
  params: Promise<{ country: string }>
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { country: slug } = await params
  const country = getOlympiadCountry(slug)
  if (!country) return {}

  const url = `${BASE}/${country.slug}`
  const title = `Biology Olympiad & IBO Coaching for ${country.name} | International-School Students`
  const description = `Live online Biology Olympiad and IBO coaching for international-school students in ${country.name}. AIIMSonian-led, small-batch (4–6 students), ${country.timezone} live classes. ${country.priceDisplay} per month.`

  return {
    title,
    description,
    keywords: [
      `biology olympiad coaching ${country.name.toLowerCase()}`,
      `biology olympiad tutor ${country.name.toLowerCase()}`,
      `IBO coaching ${country.name.toLowerCase()}`,
      `IBO tutor ${country.name.toLowerCase()}`,
      `biology olympiad coaching online ${country.name.toLowerCase()}`,
      `Pre-Med foundation biology ${country.name.toLowerCase()}`,
      `international school biology olympiad ${country.name.toLowerCase()}`,
      `${country.nationalOlympiad} alternative ${country.name.toLowerCase()}`,
      `AIIMS biology faculty ${country.name.toLowerCase()}`,
      `biology olympiad tutor near me ${country.name.toLowerCase()}`,
    ],
    alternates: {
      canonical: url,
      languages: {
        en: url,
        [`en-${country.iso2}`]: url,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: `en_${country.iso2}`,
      siteName: 'Cerebrum Biology Academy',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export function generateStaticParams() {
  return olympiadCountrySlugs.map((country) => ({ country }))
}

export const dynamicParams = false

export default function CountryLayout({ children }: { children: React.ReactNode }) {
  return children
}
