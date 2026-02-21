import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('greater-noida')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in greater noida',
    'biology coaching greater noida',
    'neet biology classes greater noida',
    'best biology tuition greater noida',
    'biology classes near me greater noida',
    'class 11 biology coaching greater noida',
    'class 12 biology tuition greater noida',
    'online biology classes greater noida',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-greater-noida`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-greater-noida',
  },
}

export default function BiologyClassesGreaterNoidaPage() {
  return <CityHubPage data={cityData} />
}
