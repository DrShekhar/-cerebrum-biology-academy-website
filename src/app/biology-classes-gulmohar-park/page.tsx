import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('gulmohar-park')!

export const metadata: Metadata = {
  title: 'Biology Classes in Gulmohar Park | NEET Coaching South Delhi',
  description:
    'Expert biology classes in Gulmohar Park for NEET-UG & boards. Near Green Park metro. Proven track record. Call 88264-44334 for free demo class.',
  keywords: [
    'biology classes gulmohar park',
    'neet coaching gulmohar park delhi',
    'biology tuition gulmohar park',
    'best biology teacher gulmohar park',
    'neet preparation gulmohar park',
    'class 11 biology gulmohar park',
    'class 12 biology coaching gulmohar park',
    'cbse biology tutor gulmohar park',
    'medical coaching gulmohar park',
  ],
  openGraph: {
    title: 'Biology Classes in Gulmohar Park | NEET Coaching South Delhi',
    description:
      'Expert biology classes in Gulmohar Park for NEET-UG & boards. Near Green Park metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-gulmohar-park',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gulmohar-park',
  },
}

export default function BiologyClassesGulmoharParkPage() {
  return <CityHubPage data={cityData} />
}
