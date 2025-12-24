import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('panchsheel-park')!

export const metadata: Metadata = {
  title: 'Biology Classes in Panchsheel Park | NEET Coaching South Delhi',
  description:
    'Premium biology classes in Panchsheel Park for NEET-UG & boards. Near Hauz Khas metro. Small batch coaching. Call 88264-44334 for enrollment.',
  keywords: [
    'biology classes panchsheel park',
    'neet coaching panchsheel park delhi',
    'biology tuition panchsheel park',
    'best biology teacher panchsheel park',
    'neet preparation panchsheel park',
    'class 11 biology panchsheel park',
    'class 12 biology coaching panchsheel park',
    'cbse biology tutor panchsheel park',
    'medical entrance panchsheel park',
  ],
  openGraph: {
    title: 'Biology Classes in Panchsheel Park | NEET Coaching South Delhi',
    description:
      'Premium biology classes in Panchsheel Park for NEET-UG & boards. Near Hauz Khas metro.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-panchsheel-park',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-panchsheel-park',
  },
}

export default function BiologyClassesPanchsheelParkPage() {
  return <CityHubPage data={cityData} />
}
