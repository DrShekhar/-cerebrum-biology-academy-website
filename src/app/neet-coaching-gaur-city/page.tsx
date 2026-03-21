import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('gaur-city')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Gaur City',
    'biology classes Gaur City',
    'NEET preparation Gaur City',
    'best biology coaching Gaur City',
    'NEET tuition Gaur City',
    'AIIMS faculty Gaur City',
    'NEET online classes Gaur City',
    'biology coaching near Gaur City',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-gaur-city`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/neet-coaching-gaur-city`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
