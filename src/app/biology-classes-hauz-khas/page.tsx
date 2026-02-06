import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('hauz-khas')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in hauz khas',
    'biology coaching hauz khas delhi',
    'neet biology classes hauz khas',
    'best biology tuition hauz khas',
    'biology classes near iit delhi',
    'biology coaching kalu sarai',
    'neet coaching hauz khas',
    'class 11 biology tuition hauz khas',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-hauz-khas`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-hauz-khas',
  },
}

export default function BiologyClassesHauzKhasPage() {
  return <CityHubPage data={cityData} />
}
