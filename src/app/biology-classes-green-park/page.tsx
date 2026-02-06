import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('green-park')!

export const metadata: Metadata = {
  title: 'Biology Classes in Green Park | NEET Coaching South Delhi',
  description:
    'Expert biology classes in Green Park for NEET & board exams. Near Green Park metro. Quality coaching with proven results. Call 88264-44334 for free demo class.',
  keywords: [
    'biology classes green park',
    'neet coaching green park delhi',
    'biology tuition green park',
    'best biology teacher green park',
    'neet preparation green park',
    'class 11 biology green park',
    'class 12 biology coaching green park',
    'cbse biology tutor green park',
    'medical coaching green park delhi',
  ],
  openGraph: {
    title: 'Biology Classes in Green Park | NEET Coaching South Delhi',
    description:
      'Expert biology classes in Green Park for NEET & board exams. Near Green Park metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-green-park',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-green-park',
  },
}

export default function BiologyClassesGreenParkPage() {
  return <CityHubPage data={cityData} />
}
