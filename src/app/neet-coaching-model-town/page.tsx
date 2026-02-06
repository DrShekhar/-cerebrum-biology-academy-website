import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('model-town')!

export const metadata: Metadata = {
  title: 'NEET Coaching Model Town | Biology Classes Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching in Model Town. Near Rohini DC Chauk center, Yellow Line metro access. AIIMS faculty, 98% success rate. WhatsApp 88264-44334!',
  keywords: [
    'NEET coaching Model Town',
    'biology classes Model Town',
    'biology tuition Model Town',
    'NEET preparation Model Town',
    'best biology coaching Model Town',
    'NEET classes Model Town Delhi',
    'medical entrance coaching Model Town',
    'biology teacher Model Town',
  ],
  openGraph: {
    title: 'NEET Coaching Model Town | Biology Classes Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching in Model Town. Near Rohini DC Chauk center, Yellow Line metro access. AIIMS faculty, 98% success rate. WhatsApp 88264-44334!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-model-town',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-model-town',
  },
}

export default function ModelTownPage() {
  return <CityHubPage data={cityData} />
}
