import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-52')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 52 gurgaon',
    'biology classes sector 52 gurgaon',
    'neet coaching rapid metro gurgaon',
    'sector 52 gurgaon coaching',
    'medical coaching sector 52',
    'neet tuition sector 52 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-52',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-52',
  },
}

export default function NEETCoachingSector52GurgaonPage() {
  return <CityHubPage data={cityData} />
}
