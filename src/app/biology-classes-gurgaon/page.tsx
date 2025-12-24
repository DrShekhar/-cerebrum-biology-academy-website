import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in gurgaon',
    'biology coaching gurugram',
    'neet biology classes gurgaon',
    'best biology tuition gurgaon',
    'biology classes sector 51 gurgaon',
    'class 11 biology coaching gurgaon',
    'class 12 biology tuition gurugram',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-gurgaon`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-gurgaon',
  },
}

export default function BiologyClassesGurgaonPage() {
  return <CityHubPage data={cityData} />
}
