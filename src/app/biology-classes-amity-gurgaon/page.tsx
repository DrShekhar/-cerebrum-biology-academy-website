import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-classes-amity-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes amity gurgaon',
    'neet coaching amity sector 46',
    'biology tuition amity international school',
    'best neet institute near amity gurgaon',
    'biology classes amity gurugram',
    'class 11 12 biology amity school',
    'neet preparation amity students',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-amity-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-amity-gurgaon',
  },
}

export default function BiologyClassesAmityGurgaonPage() {
  return <CityHubPage data={cityData} />
}
