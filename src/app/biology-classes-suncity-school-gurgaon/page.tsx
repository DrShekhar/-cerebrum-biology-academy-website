import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-classes-suncity-school-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes suncity school gurgaon',
    'neet coaching suncity sector 54',
    'biology tuition suncity world school',
    'best neet institute near suncity school',
    'biology classes suncity gurugram',
    'class 11 12 biology suncity school',
    'neet preparation suncity students',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-suncity-school-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-suncity-school-gurgaon',
  },
}

export default function BiologyClassesSuncitySchoolGurgaonPage() {
  return <CityHubPage data={cityData} />
}
