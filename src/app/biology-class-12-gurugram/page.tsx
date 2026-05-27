import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'

const cityData = getCityData('biology-class-12-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'Class 12 Biology Gurugram tuition',
    'Class 12 Biology Gurugram coaching',
    'Class 12 Biology Gurugram classes',
    'CBSE Class 12 Biology Gurugram',
    'board exam Class 12 Biology Gurugram',
    'NCERT Class 12 Biology Gurugram',
    'biology tutor Class 12 Biology Gurugram',
    'NEET foundation Class 12 Biology Gurugram',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-class-12-gurugram`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-class-12-gurugram`,
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function Page() {
  return (
    <>
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="biology-class-12-gurugram" />
      <CityHubPage data={cityData} />
    </>
  )
}
