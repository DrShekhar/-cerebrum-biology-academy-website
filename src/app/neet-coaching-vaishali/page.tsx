import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('vaishali-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Vaishali Ghaziabad',
    'biology tuition Vaishali',
    'NEET preparation Vaishali',
    'best biology coaching Vaishali Ghaziabad',
    'NEET classes Vaishali',
    'AIIMS faculty Vaishali',
    'NEET online classes Vaishali Ghaziabad',
    'biology classes near Vaishali',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-vaishali`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-vaishali',
  },
}

export default function NEETCoachingVaishaliPage() {
  return <CityHubPage data={cityData} />
}
