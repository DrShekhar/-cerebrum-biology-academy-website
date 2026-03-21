import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('raj-nagar-extension')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'NEET coaching Raj Nagar Extension',
    'biology classes Raj Nagar Extension',
    'NEET preparation Raj Nagar Extension',
    'best biology coaching Raj Nagar Extension',
    'NEET tuition Raj Nagar Extension',
    'AIIMS faculty Raj Nagar Extension',
    'NEET online classes Raj Nagar Extension',
    'biology coaching near Raj Nagar Extension',
  ],
  openGraph: {
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/neet-coaching-raj-nagar-extension`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/neet-coaching-raj-nagar-extension`,
  },
}

export default function Page() {
  return <CityHubPage data={cityData} />
}
