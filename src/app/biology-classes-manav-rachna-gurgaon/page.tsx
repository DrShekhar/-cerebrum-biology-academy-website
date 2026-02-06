import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-manav-rachna-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes manav rachna',
    'neet coaching manav rachna faridabad',
    'biology tuition manav rachna school',
    'manav rachna students neet',
    'biology coaching near manav rachna',
    'neet preparation manav rachna',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-manav-rachna-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-manav-rachna-gurgaon',
  },
}

export default function BiologyClassesManavRachnaGurgaonPage() {
  return <CityHubPage data={cityData} />
}
