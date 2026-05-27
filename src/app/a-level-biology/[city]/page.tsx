import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { aLevelCitySlugs, getALevelCityBySlug } from '@/data/a-level/cities'
import { ALevelBiologyCityTemplate } from '@/components/a-level/ALevelBiologyCityTemplate'

interface PageProps {
  params: Promise<{ city: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  return aLevelCitySlugs().map((city) => ({ city }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const config = getALevelCityBySlug(city)
  if (!config) return {}

  const url = `https://cerebrumbiologyacademy.com/a-level-biology/${config.slug}`
  const boardList = config.examBoards.join(', ')
  const title = `A-Level Biology Tutor ${config.cityName} | ${boardList} | Cerebrum`
  const description = `Expert A-Level Biology tutoring in ${config.cityName}, ${config.country}. ${boardList} exam boards covered. ${config.pricing.perHourText}. Timezone-matched online sessions for ${config.timezone}.`
  const hreflangLocale = `en-${config.countryCode}`

  return {
    title,
    description,
    keywords: [
      `A-Level Biology tutor ${config.cityName}`,
      `A-Level Biology tuition ${config.cityName}`,
      `A-Level Biology ${config.cityName}`,
      `A-Level Biology coaching ${config.cityName}`,
      `A-Level Biology online ${config.cityName}`,
      `${config.cityName} A-Level tutor`,
      ...config.examBoards.map((b) => `${b} Biology tutor ${config.cityName}`),
    ],
    alternates: {
      canonical: url,
      languages: {
        [hreflangLocale]: url,
        en: url,
        'x-default': url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Cerebrum Biology Academy',
      type: 'website',
      locale: hreflangLocale.replace('-', '_'),
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  }
}

export default async function ALevelBiologyCityPage({ params }: PageProps) {
  const { city } = await params
  const config = getALevelCityBySlug(city)
  if (!config) notFound()

  return <ALevelBiologyCityTemplate city={config} />
}
