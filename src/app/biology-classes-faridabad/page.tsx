import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('faridabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in faridabad',
    'biology coaching faridabad',
    'neet biology classes faridabad',
    'best biology tuition faridabad',
    'biology classes sector 15 faridabad',
    'class 11 biology coaching faridabad',
    'class 12 biology tuition faridabad',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-faridabad`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-faridabad',
  },
}

export default function BiologyClassesFaridabadPage() {
  return <CityHubPage data={cityData} />
}
