import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-classes-pathways-world-school')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes pathways world school',
    'neet coaching pathways aravali',
    'ib biology neet preparation',
    'biology tuition pathways gurgaon',
    'best neet institute for ib students',
    'biology classes pathways school gurugram',
    'ib to neet biology coaching',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/biology-classes-pathways-world-school',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-pathways-world-school',
  },
}

export default function BiologyClassesPathwaysWorldSchoolPage() {
  return <CityHubPage data={cityData} />
}
