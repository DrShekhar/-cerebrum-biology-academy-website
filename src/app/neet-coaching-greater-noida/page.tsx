import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('greater-noida-west')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Greater Noida',
    'biology coaching Greater Noida',
    'NEET classes Greater Noida',
    'best NEET preparation Greater Noida',
    'biology tuition Greater Noida West',
    'NEET online classes Greater Noida',
    'AIIMS faculty coaching Greater Noida',
    'NEET guidance Greater Noida',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-greater-noida`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-greater-noida',
  },
}

export default function NEETCoachingGreaterNoidaPage() {
  return <CityHubPage data={cityData} />
}
