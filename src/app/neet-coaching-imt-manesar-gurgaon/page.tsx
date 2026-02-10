import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'IMT Manesar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in IMT Manesar, Gurgaon | 98% Success Rate | Cerebrum',
  description:
    'Join #1 NEET coaching in IMT Manesar, Gurgaon. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Corporate family focused coaching. Book free demo!',
  keywords: [
    'NEET coaching IMT Manesar',
    'NEET coaching Manesar',
    'biology tuition IMT Gurgaon',
    'NEET classes Dharuhera',
    'best NEET tutor Pataudi Road',
    'medical entrance IMT',
    'NEET preparation Manesar industrial hub',
  ],
  openGraph: {
    title: 'Best NEET Coaching in IMT Manesar, Gurgaon | 98% Success Rate | Cerebrum',
    description:
      'Join #1 NEET coaching in IMT Manesar, Gurgaon. Expert AIIMS faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-imt-manesar-gurgaon`,
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
    title: 'Best NEET Coaching in IMT Manesar, Gurgaon | 98% Success Rate',
    description:
      'Join #1 NEET coaching in IMT Manesar, Gurgaon. Expert AIIMS faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-imt-manesar-gurgaon`,
  },
}

export default function NEETCoachingIMTManesarPage() {
  return (
    <>
      <LocalitySchema
        locality="IMT Manesar"
        slug="neet-coaching-imt-manesar-gurgaon"
        pageTitle="Best NEET Coaching in IMT Manesar, Gurgaon"
        pageDescription="Join #1 NEET coaching in IMT Manesar, Gurgaon. Expert AIIMS faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
