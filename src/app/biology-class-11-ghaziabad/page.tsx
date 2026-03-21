import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-class-11-ghaziabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'Class 11 Biology Ghaziabad tuition',
    'Class 11 Biology Ghaziabad coaching',
    'Class 11 Biology Ghaziabad classes',
    'CBSE Class 11 Biology Ghaziabad',
    'board exam Class 11 Biology Ghaziabad',
    'NCERT Class 11 Biology Ghaziabad',
    'biology tutor Class 11 Biology Ghaziabad',
    'NEET foundation Class 11 Biology Ghaziabad',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-class-11-ghaziabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-class-11-ghaziabad`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
