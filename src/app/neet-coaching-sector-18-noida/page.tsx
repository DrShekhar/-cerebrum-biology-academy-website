import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('sector-18-noida')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Sector 18 Noida',
    'biology classes Sector 18 Noida',
    'NEET preparation Sector 18 Noida',
    'best biology coaching Sector 18 Noida',
    'NEET tuition Sector 18 Noida',
    'AIIMS faculty Sector 18 Noida',
    'NEET online classes Sector 18 Noida',
    'biology coaching near Sector 18 Noida',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-sector-18-noida`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/neet-coaching-sector-18-noida`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
