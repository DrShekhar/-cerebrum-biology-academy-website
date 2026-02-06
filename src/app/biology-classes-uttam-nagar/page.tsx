import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('uttam-nagar')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in uttam nagar',
    'biology coaching uttam nagar delhi',
    'neet biology classes uttam nagar',
    'best biology tuition uttam nagar',
    'biology classes west delhi',
    'biology coaching dwarka',
    'class 11 biology tuition uttam nagar',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-uttam-nagar`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-uttam-nagar',
  },
}

export default function BiologyClassesUttamNagarPage() {
  return <CityHubPage data={cityData} />
}
