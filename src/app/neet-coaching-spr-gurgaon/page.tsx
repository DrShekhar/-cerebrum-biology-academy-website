import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-spr-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching spr road gurgaon',
    'neet coaching southern peripheral road',
    'biology classes spr gurgaon',
    'medical coaching spr road',
    'neet tuition spr gurgaon',
    'sector 68-84 neet coaching',
    'spr expressway coaching',
    'pcb coaching spr road gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-spr-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-spr-gurgaon',
  },
}

export default function NEETCoachingSPRGurgaonPage() {
  return <CityHubPage data={cityData} />
}
