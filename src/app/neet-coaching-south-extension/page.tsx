import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { LocalityCues } from '@/components/seo/LocalityCues'
import { delhiNCRLocalityCues } from '@/data/delhi-ncr-locality-cues'

const cityData = getCityData('south-delhi')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching south extension',
    'NEET coaching south extension delhi',
    'biology coaching south extension',
    'best NEET tuition south ext',
    'NEET classes near south extension market',
    'medical coaching south delhi',
    'NEET preparation south extension part 2',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-south-extension',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-south-extension',
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function NEETCoachingSouthExtensionPage() {
  return (
    <>
      <CityHubPage data={cityData} />
      <LocalityCues {...delhiNCRLocalityCues['south-extension']} />
    </>
  )
}
