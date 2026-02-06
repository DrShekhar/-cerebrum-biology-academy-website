import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-dav-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes dav public school',
    'neet coaching dav school gurgaon',
    'biology tuition dav students',
    'dav public school neet prep',
    'biology coaching near dav gurgaon',
    'neet preparation dav school',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-dav-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-dav-gurgaon',
  },
}

export default function BiologyClassesDAVGurgaonPage() {
  return <CityHubPage data={cityData} />
}
