import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('golf-links')!

export const metadata: Metadata = {
  title: 'Biology Classes in Golf Links | NEET Coaching Lutyens Delhi',
  description:
    'Elite biology coaching in Golf Links for NEET-UG & boards. Personalized attention for Lutyens Delhi families. Premium facilities. Call 88264-44334.',
  keywords: [
    'biology classes golf links delhi',
    'neet coaching golf links',
    'biology tuition golf links',
    'best biology teacher golf links',
    'neet preparation lutyens delhi',
    'class 11 biology golf links',
    'class 12 biology coaching golf links',
    'premium biology coaching delhi',
    'medical entrance golf links',
  ],
  openGraph: {
    title: 'Biology Classes in Golf Links | NEET Coaching Lutyens Delhi',
    description:
      'Elite biology coaching in Golf Links for NEET-UG & boards. Personalized attention for Lutyens Delhi families.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-golf-links',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-golf-links',
  },
}

export default function BiologyClassesGolfLinksPage() {
  return <CityHubPage data={cityData} />
}
