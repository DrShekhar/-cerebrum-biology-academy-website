import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/city-hub-data'

const cityData = getCityData('biology-classes-heritage-school-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes heritage school gurgaon',
    'neet coaching heritage sector 62',
    'biology tuition heritage xperiential learning',
    'best neet institute near heritage school',
    'biology classes heritage gurugram',
    'class 11 12 biology heritage school',
    'neet preparation heritage students',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-heritage-school-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-heritage-school-gurgaon',
  },
}

export default function BiologyClassesHeritageSchoolGurgaonPage() {
  return <CityHubPage data={cityData} />
}
