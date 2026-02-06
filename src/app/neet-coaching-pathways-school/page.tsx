import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('neet-coaching-pathways-school')!

export const metadata: Metadata = {
  title: 'NEET Coaching for Pathways School Students | Cerebrum Biology Academy',
  description:
    'NEET biology coaching for Pathways School Gurgaon students. IB & CBSE curriculum support. Sector 51 center. Call 88264-44334.',
  keywords: [
    'neet coaching pathways school',
    'biology classes pathways school gurgaon',
    'pathways school neet preparation',
    'ib biology coaching gurgaon',
    'neet coaching aravali gurgaon',
    'pathways school biology coaching',
  ],
  openGraph: {
    title: 'NEET Coaching for Pathways School Students | Cerebrum Biology Academy',
    description:
      'NEET biology coaching for Pathways School Gurgaon students. IB & CBSE curriculum support. Sector 51 center.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-pathways-school',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-pathways-school',
  },
}

export default function PathwaysSchoolPage() {
  return <CityHubPage data={cityData} />
}
