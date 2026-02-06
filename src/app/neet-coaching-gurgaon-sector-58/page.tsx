import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-gurgaon-sector-58')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sector 58 gurgaon',
    'biology classes sector 58 gurgaon',
    'sector 58 gurgaon coaching',
    'medical coaching sector 58',
    'neet tuition sector 58 gurgaon',
    'new gurgaon neet coaching',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-58',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gurgaon-sector-58',
  },
}

export default function NEETCoachingSector58GurgaonPage() {
  return <CityHubPage data={cityData} />
}
