import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('rk-puram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in rk puram',
    'biology coaching rk puram delhi',
    'neet biology classes rk puram',
    'best biology tuition rk puram',
    'dps rk puram biology coaching',
    'biology classes rk puram sector 7',
    'neet coaching for dps rkp students',
    'class 11 biology tuition rk puram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-rk-puram`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-rk-puram',
  },
}

export default function BiologyClassesRKPuramPage() {
  return <CityHubPage data={cityData} />
}
