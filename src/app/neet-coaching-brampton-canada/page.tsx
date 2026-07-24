import { Metadata } from 'next'
import NEETCoachingPageContent from './PageContent'
import { NEETNRIPricingTiers } from '@/components/neet-nri/NEETNRIPricingTiers'
import { NRI_INTERNATIONAL_CITIES } from '@/data/locality-content/nri-international-cities'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const city = NRI_INTERNATIONAL_CITIES['brampton-canada']!

export const metadata: Metadata = {
  title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum (Live Online)`,
  description: `Live online NEET Biology coaching for Brampton Indian-origin Class 11-12 students — North America\'s most Indian city (52% Indian-origin, ~600K). Schools we serve: Turner Fenton, Mayfield, Heart Lake, Bramalea, Chinguacousy. EST 7-9:30 AM batch matches IST evening cleanly. NRI quota guidance for AIIMS / JIPMER / Manipal / KMC. 98% success rate. Cerebrum\'s largest GTA student concentration.`,
  keywords: [
    'NEET coaching Brampton',
    'NEET coaching Peel Region',
    'NEET coaching Canada',
    'NEET coaching Mississauga',
    'NEET tutor Brampton',
    'Turner Fenton Secondary NEET',
    'Mayfield Secondary NEET',
    'Heart Lake Secondary NEET',
    'Bramalea Secondary NEET',
    'Chinguacousy NEET',
    'NRI quota AIIMS Brampton',
    'biology tutor Brampton',
    'Indian MBBS pathway Brampton',
    'NEET Punjabi Sikh community',
    'Brampton Indian community NEET',
    'McMaster MD vs NEET Brampton',
  ].join(', '),
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-brampton-canada`,
    languages: {
      'en-CA': `${BASE_URL}/neet-coaching-brampton-canada`,
      'en-IN': `${BASE_URL}/neet-coaching-brampton-canada`,
    },
  },
  openGraph: {
    title: `NEET Biology Coaching in ${city.city}, ${city.country} | Cerebrum`,
    description: `EST 7-9:30 AM batch + Saturday live. Largest GTA student concentration. NRI quota pathway.`,
    url: `${BASE_URL}/neet-coaching-brampton-canada`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_CA',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-neet-coaching-brampton-canada.jpg`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Brampton — Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `NEET Biology Coaching in ${city.city}, ${city.country}`,
    description: `For Turner Fenton / Mayfield / Heart Lake students. Largest GTA student base.`,
    images: [`${BASE_URL}/og-neet-coaching-brampton-canada.jpg`],
  },
}

export default async function BramptonNEETCoachingPage() {
  return (
    <>
      <NEETCoachingPageContent />
      <NEETNRIPricingTiers />
    </>
  )
}
