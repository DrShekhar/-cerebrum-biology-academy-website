import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-rps-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes rps international',
    'neet coaching rps school gurgaon',
    'biology tuition rps students',
    'rps international neet prep',
    'biology coaching near rps',
    'neet preparation rps gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-rps-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-rps-gurgaon',
  },
}

export default function BiologyClassesRPSGurgaonPage() {
  return <CityHubPage data={cityData} />
}
