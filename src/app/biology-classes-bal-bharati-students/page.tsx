import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-bal-bharati-students')!

export const metadata: Metadata = {
  title: 'Biology Classes for Bal Bharati Students | NEET Coaching',
  description:
    'NEET biology coaching for Bal Bharati Public School students. Multiple Delhi centers, after-school batches. 15+ years experience. Call 88264-44334.',
  keywords: [
    'biology classes bal bharati',
    'neet coaching bal bharati students',
    'bal bharati neet preparation',
    'biology tuition delhi',
    'neet coaching pitampura',
    'bal bharati biology coaching',
  ],
  openGraph: {
    title: 'Biology Classes for Bal Bharati Students | NEET Coaching',
    description:
      'NEET biology coaching for Bal Bharati Public School students. Multiple Delhi centers, after-school batches. 15+ years experience.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-bal-bharati-students',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-bal-bharati-students',
  },
}

export default function BalBharatiPage() {
  return <CityHubPage data={cityData} />
}
