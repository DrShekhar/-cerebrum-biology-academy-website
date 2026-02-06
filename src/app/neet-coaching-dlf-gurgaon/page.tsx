import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-dlf-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching dlf gurgaon',
    'neet classes dlf phase 1 2 3 4 5',
    'neet coaching cyber city gurgaon',
    'best neet institute dlf gurugram',
    'neet preparation dlf city',
    'neet biology coaching dlf gurgaon',
    'class 11 12 neet coaching dlf phase',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dlf-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dlf-gurgaon',
  },
}

export default function NEETCoachingDLFGurgaonPage() {
  return <CityHubPage data={cityData} />
}
