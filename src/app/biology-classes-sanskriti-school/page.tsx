import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-sanskriti-school')!

export const metadata: Metadata = {
  title: 'Biology Classes for Sanskriti School Students | NEET Coaching',
  description:
    'NEET biology coaching for Sanskriti School students. South Delhi centers near Chanakyapuri. Expert faculty, flexible timings. Call 88264-44334.',
  keywords: [
    'biology classes sanskriti school',
    'neet coaching sanskriti school',
    'sanskriti school neet preparation',
    'biology tuition chanakyapuri',
    'neet coaching south delhi',
    'sanskriti school biology coaching',
  ],
  openGraph: {
    title: 'Biology Classes for Sanskriti School Students | NEET Coaching',
    description:
      'NEET biology coaching for Sanskriti School students. South Delhi centers near Chanakyapuri. Expert faculty, flexible timings.',
    url: 'https://cerebrumbiologyacademy.com/biology-classes-sanskriti-school',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-sanskriti-school',
  },
}

export default function SanskritiSchoolPage() {
  return <CityHubPage data={cityData} />
}
