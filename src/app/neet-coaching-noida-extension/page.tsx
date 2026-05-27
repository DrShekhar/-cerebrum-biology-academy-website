import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('noida-extension')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Noida Extension',
    'biology classes Noida Extension',
    'NEET preparation Noida Extension',
    'best biology coaching Noida Extension',
    'NEET tuition Noida Extension',
    'AIIMS faculty Noida Extension',
    'NEET online classes Noida Extension',
    'biology coaching near Noida Extension',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-noida-extension`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/neet-coaching-noida-extension`,
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function Page() {
  return <CityHubPage data={cityData} />
}
