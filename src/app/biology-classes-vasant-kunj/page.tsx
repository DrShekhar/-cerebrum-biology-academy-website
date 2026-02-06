import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('vasant-kunj')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in vasant kunj',
    'biology coaching vasant kunj delhi',
    'neet biology classes vasant kunj',
    'best biology tuition vasant kunj',
    'biology classes south delhi',
    'biology coaching saket',
    'class 11 biology tuition vasant kunj',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-vasant-kunj`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-vasant-kunj',
  },
}

export default function BiologyClassesVasantKunjPage() {
  return <CityHubPage data={cityData} />
}
