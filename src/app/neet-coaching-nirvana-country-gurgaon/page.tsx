import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-nirvana-country-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching nirvana country gurgaon',
    'neet classes the close south gurgaon',
    'neet coaching the close north gurugram',
    'best neet institute nirvana country',
    'neet preparation sector 50 gurgaon',
    'neet biology coaching nirvana country',
    'class 11 12 neet nirvana country',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-nirvana-country-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-nirvana-country-gurgaon',
  },
}

export default function NEETCoachingNirvanaCountryGurgaonPage() {
  return <CityHubPage data={cityData} />
}
