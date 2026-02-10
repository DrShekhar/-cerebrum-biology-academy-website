import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Prahlad Nagar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Prahlad Nagar Ahmedabad | Corporate Hub | Cerebrum',
  description:
    'Join #1 NEET coaching in Prahlad Nagar, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for Satellite area families. Book free demo!',
  keywords: [
    'NEET coaching Prahlad Nagar',
    'biology tuition Prahlad Nagar Ahmedabad',
    'NEET classes Prahlad Nagar',
    'best NEET tutor Satellite area',
    'medical entrance Prahlad Nagar',
    'NEET preparation corporate hub',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Prahlad Nagar Ahmedabad | Corporate Hub | Cerebrum',
    description:
      'Join #1 NEET coaching in Prahlad Nagar, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-prahlad-nagar-ahmedabad`,
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
    title: 'Best NEET Coaching in Prahlad Nagar Ahmedabad | Corporate Hub',
    description:
      'Join #1 NEET coaching in Prahlad Nagar, Ahmedabad. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-prahlad-nagar-ahmedabad`,
  },
}

export default function NEETCoachingPrahladNagarAhmedabadPage() {
  return (
    <>
      <LocalitySchema
        locality="Prahlad Nagar"
        slug="neet-coaching-prahlad-nagar-ahmedabad"
        pageTitle="Best NEET Coaching in Prahlad Nagar"
        pageDescription="Join #1 NEET coaching in Prahlad Nagar, Ahmedabad. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
