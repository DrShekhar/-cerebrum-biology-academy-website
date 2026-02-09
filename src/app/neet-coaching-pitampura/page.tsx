import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('pitampura')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Pitampura',
    'biology coaching Pitampura Delhi',
    'NEET preparation north Delhi',
    'best NEET classes Pitampura',
    'biology tuition Pitampura',
    'NEET coaching near Pitampura',
    'AIIMS faculty Pitampura',
    'NEET online classes Pitampura',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-pitampura`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pitampura',
  },
}

export default function NEETCoachingPitampuraPage() {
  return <CityHubPage data={cityData} />
}
