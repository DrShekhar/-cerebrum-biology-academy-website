import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'
import { GurgaonGurugramAreaSchema } from '@/components/seo/GurgaonGurugramAreaSchema'

const cityData = getCityData('biology-classes-gurugram')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-gurugram`,
  },
  alternates: {
    canonical: `https://cerebrumbiologyacademy.com/biology-classes-gurugram`,
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function Page() {
  return (
    <>
      <GurgaonGurugramAreaSchema spelling="gurugram" pageSlug="biology-classes-gurugram" />
      <CityHubPage data={cityData} />
    </>
  )
}
