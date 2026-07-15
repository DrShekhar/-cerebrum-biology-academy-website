import { Metadata } from 'next'
import { PageContent } from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const city = NRI_INTERNATIONAL_CITIES['dammam-saudi-arabia']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in Dammam, Saudi Arabia | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Eastern Province Indian-origin Class 11-12 students in Dammam (Saudi Arabia\'s oil + petrochem hub, 600K+ Indian community). Flagship feeder school: International Indian School Dammam (IISD) with 6,000+ students. Also Bhavan\'s, IISR Dammam branch, Manarat Al Sharqiya. AST 3-5:30 PM batch (after-IISD-dismissal slot). Ramadan schedule adjustments. NRI quota for AIIMS / JIPMER / Manipal / KMC. 98% success rate.`,
  keywords: [
    'NEET coaching Dammam',
    'NEET coaching Eastern Province Saudi',
    'NEET coaching Saudi Arabia',
    'online NEET coaching Dammam',
    'NEET tutor Dammam',
    'International Indian School Dammam NEET',
    'IISD NEET',
    'IISR Dammam NEET',
    'Bhavans Saudi NEET',
    'Manarat Al Sharqiya NEET',
    'NRI quota AIIMS Dammam',
    'biology tutor Dammam',
    'Ramadan NEET schedule',
    ...city.indianSchools.map((s) => `${s} NEET`),
  ].join(', '),
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
        alt: 'Neet Coaching Dammam Saudi Arabia — Cerebrum Biology Academy',
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

  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Coaching in Dammam, Saudi Arabia | Cerebrum',
    description:
      'Live online NEET Biology coaching for Eastern Province Indian-origin Class 11-12 students. IISD flagship feeder, AST evening batch, NRI quota.',
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
        country="SA"
        data={{
          ...localityData,
          phone: '+918826444334',
          email: 'shekharcsingh57@gmail.com',
          website: 'https://cerebrumbiologyacademy.com',
          doctor: 'Dr. Shekhar C Singh',
        }}
        skipCourseList
      />
      <PageContent city="Dammam" country="Saudi Arabia" />
      <NEETNRIPricingTiers />
    </>
  )
}
