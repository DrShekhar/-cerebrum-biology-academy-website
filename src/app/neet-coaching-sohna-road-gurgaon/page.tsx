import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('neet-coaching-sohna-road-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching sohna road gurgaon',
    'neet classes central park gurgaon',
    'neet coaching vatika city gurugram',
    'best neet institute sohna road',
    'neet preparation bptp bestech gurgaon',
    'neet biology coaching sohna road',
    'neet classes m3m merlin gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-sohna-road-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-sohna-road-gurgaon',
  },
}

export default function NEETCoachingSohnaRoadGurgaonPage() {
  return <CityHubPage data={cityData} />
}
