import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'

export const metadata: Metadata = {
  title: 'NEET Coaching in Kathmandu, Nepal',
  description:
    'Expert NEET coaching in Kathmandu, Nepal. 98% success rate, expert faculty, comprehensive study materials. Join 5000+ successful students. Enroll now!',
  keywords:
    'NEET coaching Kathmandu, NEET exam center Kathmandu, best NEET classes Kathmandu, NEET preparation Nepal',
  openGraph: {
    title: 'NEET Coaching in Kathmandu, Nepal | 98% Success Rate',
    description:
      'Premium NEET coaching center in Kathmandu. Dr. Shekhar C Singh & expert faculty. Start your medical journey today.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kathmandu-nepal',
    type: 'website',
    images: [
      {
        url: 'https://cerebrumbiologyacademy.com/og-neet-coaching-kathmandu-nepal.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kathmandu-nepal',
  },

  twitter: { card: 'summary_large_image' as const },
}

export default async function Page() {
  const localityData = {
    name: 'Kathmandu, Nepal',
    latitude: 27.7172,
    longitude: 85.324,
    address: 'Kathmandu, Nepal',
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
        skipCourseList
      />
      <PageContent city="Kathmandu" country="Nepal" />
      <NEETNRIPricingTiers />
    </>
  )
}
