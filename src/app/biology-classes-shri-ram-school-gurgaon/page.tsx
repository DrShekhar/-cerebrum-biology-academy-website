import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-shri-ram-school-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes shri ram school gurgaon',
    'neet coaching tsrs aravali',
    'neet coaching tsrs moulsari',
    'biology tuition shri ram school gurugram',
    'best neet institute for tsrs students',
    'biology classes the shri ram school',
    'class 11 12 biology tsrs gurgaon',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-shri-ram-school-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-shri-ram-school-gurgaon',
  },
}

export default function BiologyClassesShriRamSchoolGurgaonPage() {
  return <CityHubPage data={cityData} />
}
