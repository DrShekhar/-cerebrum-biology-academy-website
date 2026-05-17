import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'

const cityData = getCityData('biology-class-11-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'Class 11 Biology Gurugram tuition',
    'Class 11 Biology Gurugram coaching',
    'Class 11 Biology Gurugram classes',
    'CBSE Class 11 Biology Gurugram',
    'board exam Class 11 Biology Gurugram',
    'NCERT Class 11 Biology Gurugram',
    'biology tutor Class 11 Biology Gurugram',
    'NEET foundation Class 11 Biology Gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-class-11-gurugram`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-class-11-gurugram`,
  },
}

export default function Page() {
  return (
    <>
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="biology-class-11-gurugram" />
      <CityHubPage data={cityData} />
    </>
  )
}
