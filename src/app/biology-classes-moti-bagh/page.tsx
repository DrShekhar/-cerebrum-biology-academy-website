import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('moti-bagh')!

export const metadata: Metadata = {
  title: 'Biology Classes in Moti Bagh | NEET Coaching Delhi',
  description:
    'Expert biology classes in Moti Bagh for NEET & board preparation. Near INA metro. Govt colony students welcome. Call 88264-44334 for free demo class.',
  keywords: [
    'biology classes moti bagh',
    'neet coaching moti bagh delhi',
    'biology tuition moti bagh',
    'best biology teacher moti bagh',
    'neet preparation moti bagh',
    'class 11 biology moti bagh',
    'class 12 biology coaching moti bagh',
    'cbse biology tutor moti bagh',
    'medical coaching moti bagh',
  ],
  openGraph: {
    title: 'Biology Classes in Moti Bagh | NEET Coaching Delhi',
    description:
      'Expert biology classes in Moti Bagh for NEET & board preparation. Near INA metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-moti-bagh',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-moti-bagh',
  },
}

export default function BiologyClassesMotiBaghPage() {
  return <CityHubPage data={cityData} />
}
