import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-home-tuition-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology home tuition gurgaon',
    'home tutor biology gurugram',
    'biology tuition near me gurgaon',
    'private biology classes gurgaon',
    'biology coaching at home',
    'best biology home tutor',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-home-tuition-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-home-tuition-gurgaon',
  },
}

export default function BiologyHomeTuitionGurgaonPage() {
  return <CityHubPage data={cityData} />
}
