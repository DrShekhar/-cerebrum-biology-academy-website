import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

export const metadata: Metadata = {
  title: 'NEET Coaching in Dammam, Saudi Arabia | Online Biology Classes for NRI Students',
  description:
    'Online NEET Biology coaching for Indian students in Dammam and Al Khobar. AIIMS-led faculty, AST-friendly live classes, NRI quota MBBS guidance.',
  openGraph: {
    title: 'NEET Coaching in Dammam, Saudi Arabia — Online Biology Classes',
    description:
      'NEET Biology coaching for Indian students in Dammam / Al Khobar. AST live classes, Riyadh exam centre support.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dammam-saudi-arabia',
    locale: 'en_SA',
    type: 'website',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-dammam-saudi-arabia.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dammam-saudi-arabia',
    languages: {
      'en-SA': 'https://cerebrumbiologyacademy.com/neet-coaching-dammam-saudi-arabia',
      'en-IN': 'https://cerebrumbiologyacademy.com/neet-coaching-dammam-saudi-arabia',
    },
  },
}

export default async function Page() {
  const localityData = {
    name: 'Dammam, Saudi Arabia',
    latitude: 26.3927,
    longitude: 49.9777,
    address: 'Dammam, Saudi Arabia',
  }

  return (
    <>
      <LocalitySchema
        data={{
          ...localityData,
          phone: '+918826444334',
          email: 'info@cerebrumbiologyacademy.com',
          website: 'https://cerebrumbiologyacademy.com',
          doctor: 'Dr. Shekhar C Singh',
        }}
      />
      <PageContent city="Dammam" country="Saudi Arabia" />
      <NEETNRIPricingTiers />
    </>
  )
}
