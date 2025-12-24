import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('east-of-kailash')!

export const metadata: Metadata = {
  title: 'Biology Classes in East of Kailash | NEET Coaching South Delhi',
  description:
    'Expert biology classes in East of Kailash for NEET & board exams. Near Nehru Place metro. Proven results. Call 88264-44334 for free demo class.',
  keywords: [
    'biology classes east of kailash',
    'neet coaching east of kailash delhi',
    'biology tuition east of kailash',
    'best biology teacher east of kailash',
    'neet preparation east of kailash',
    'class 11 biology east of kailash',
    'class 12 biology coaching east of kailash',
    'cbse biology tutor east of kailash',
    'medical coaching east of kailash',
  ],
  openGraph: {
    title: 'Biology Classes in East of Kailash | NEET Coaching South Delhi',
    description:
      'Expert biology classes in East of Kailash for NEET & board exams. Near Nehru Place metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-east-of-kailash',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-east-of-kailash',
  },
}

export default function BiologyClassesEastOfKailashPage() {
  return <CityHubPage data={cityData} />
}
