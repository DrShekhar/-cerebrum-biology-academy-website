import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-53')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 53 gurgaon',
    'biology classes sector 53 gurgaon',
    'neet coaching golf course extension',
    'sector 53 gurgaon coaching',
    'medical coaching sector 53',
    'neet tuition sector 53 gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-53',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-53',
  },
}

export default function NEETCoachingSector53GurgaonPage() {
  return <CityHubPage data={cityData} />
}
