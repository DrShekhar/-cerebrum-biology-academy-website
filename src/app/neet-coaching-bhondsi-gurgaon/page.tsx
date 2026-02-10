import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Bhondsi'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Bhondsi, Gurgaon | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in Bhondsi, Gurgaon. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Personalized batches & doubt clearing for growing Gurgaon residential area. Book free demo!',
  keywords: [
    'NEET coaching Bhondsi',
    'NEET coaching Sohna Road',
    'biology tuition Bhondsi Gurgaon',
    'NEET classes Badshahpur',
    'best NEET tutor Gurgaon border',
    'medical entrance Bhondsi',
    'NEET preparation Gurgaon Faridabad',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Bhondsi, Gurgaon | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in Bhondsi, Gurgaon. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-bhondsi-gurgaon`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: `NEET Coaching in ${locality} - Cerebrum Biology Academy`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Bhondsi, Gurgaon | 98% Success Rate',
    description:
      'Join #1 NEET coaching in Bhondsi, Gurgaon. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-bhondsi-gurgaon`,
  },
}

export default function NEETCoachingBhondsiPage() {
  return (
    <>
      <LocalitySchema
        locality="Bhondsi"
        slug="neet-coaching-bhondsi-gurgaon"
        pageTitle="Best NEET Coaching in Bhondsi, Gurgaon"
        pageDescription="Join #1 NEET coaching in Bhondsi, Gurgaon. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
