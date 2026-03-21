import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('biology-class-11-faridabad')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'Class 11 Biology Faridabad tuition',
    'Class 11 Biology Faridabad coaching',
    'Class 11 Biology Faridabad classes',
    'CBSE Class 11 Biology Faridabad',
    'board exam Class 11 Biology Faridabad',
    'NCERT Class 11 Biology Faridabad',
    'biology tutor Class 11 Biology Faridabad',
    'NEET foundation Class 11 Biology Faridabad',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-class-11-faridabad`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-class-11-faridabad`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
