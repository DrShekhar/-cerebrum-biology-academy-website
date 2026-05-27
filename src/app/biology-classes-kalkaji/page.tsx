import { Metadata } from 'next'
import { CityHubPage } from '@/components/seo/CityHubPage'
import { getCityData } from '@/data/city-seo/cities'

const cityData = getCityData('kalkaji')!

export const metadata: Metadata = {
  title: cityData.metaTitle,
  description: cityData.metaDescription,
  keywords: [
    'biology classes in kalkaji',
    'biology coaching kalkaji delhi',
    'neet biology classes kalkaji',
    'best biology tuition kalkaji',
    'biology classes near lotus temple',
    'biology coaching govind puri',
    'class 11 biology tuition kalkaji',
  ],
  openGraph: {
    locale: 'en_IN',
    title: cityData.metaTitle,
    description: cityData.metaDescription,
    url: `https://cerebrumbiologyacademy.com/biology-classes-kalkaji`,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-classes-kalkaji',
  },

  twitter: { card: 'summary_large_image' as const },
}

export const revalidate = 86400

export default function BiologyClassesKalkajiPage() {
  return <CityHubPage data={cityData} />
}
