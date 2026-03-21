import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-class-12-faridabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'Class 12 Biology Faridabad tuition',
    'Class 12 Biology Faridabad coaching',
    'Class 12 Biology Faridabad classes',
    'CBSE Class 12 Biology Faridabad',
    'board exam Class 12 Biology Faridabad',
    'NCERT Class 12 Biology Faridabad',
    'biology tutor Class 12 Biology Faridabad',
    'NEET foundation Class 12 Biology Faridabad',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-class-12-faridabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-class-12-faridabad`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
