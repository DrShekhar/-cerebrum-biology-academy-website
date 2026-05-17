import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'

const cityData = getCityData('dlf-gurgaon')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'neet coaching DLF gurgaon',
    'biology coaching DLF phase',
    'NEET preparation DLF gurugram',
    'medical coaching gurgaon',
    'biology tuition DLF',
    'NEET classes gurgaon haryana',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dlf-gurgaon',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dlf-gurgaon',
  },
}

export default function NEETCoachingDLFGurgaon() {
  return (
    <>
      <GurgaonGurugramAreaSchema
        spelling="gurgaon"
        pageSlug="neet-coaching-dlf-gurgaon"
        subArea="DLF"
      />
      <CityHubPage data={cityData} />
    </>
  )
}
