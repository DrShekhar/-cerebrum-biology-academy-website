import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('dlf-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes dlf gurgaon',
    'neet coaching dlf phase 1 2 3 4 5',
    'biology tuition dlf city gurgaon',
    'best biology teacher dlf gurgaon',
    'class 11 biology coaching dlf gurugram',
    'class 12 biology tuition dlf phase',
    'neet biology classes cyber city gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-dlf-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-dlf-gurgaon',
  },
}

export default function BiologyClassesDLFGurgaonPage() {
  return <CityHubPage data={cityData} />
}
