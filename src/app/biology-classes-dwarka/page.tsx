import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('dwarka')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in dwarka',
    'biology coaching dwarka delhi',
    'neet biology classes dwarka',
    'best biology tuition dwarka',
    'biology classes dwarka sector 21',
    'biology coaching janakpuri',
    'class 11 biology tuition dwarka',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-dwarka`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-dwarka',
  },
}

export default function BiologyClassesDwarkaPage() {
  return <CityHubPage data={cityData} />
}
