import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('mayur-vihar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in mayur vihar',
    'biology coaching mayur vihar delhi',
    'neet biology classes mayur vihar',
    'best biology tuition mayur vihar',
    'biology classes east delhi',
    'biology coaching noida border',
    'class 11 biology tuition mayur vihar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-mayur-vihar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-mayur-vihar',
  },
}

export default function BiologyClassesMayurViharPage() {
  return <CityHubPage data={cityData} />
}
