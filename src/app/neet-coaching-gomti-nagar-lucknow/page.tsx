import { Metadata } from 'next'
import PageContent from './PageContent'
import { LocalitySchema } from '@/components/seo/LocalitySchema'

const BASE_URL = 'https://cerebrumbiologyacademy.com'
const locality = 'Gomti Nagar'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Expert coaching with 98% success rate',
  locality: locality,
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Gomti Nagar Lucknow | Top Premium | Cerebrum',
  description:
    'Join #1 NEET coaching in Gomti Nagar, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score. Premium coaching for bureaucrat families. Book free demo!',
  keywords: [
    'NEET coaching Gomti Nagar',
    'biology tuition Gomti Nagar Lucknow',
    'NEET classes Gomti Nagar',
    'best NEET tutor Lucknow',
    'medical entrance Gomti Nagar',
    'NEET preparation premium Lucknow',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Gomti Nagar Lucknow | Top Premium | Cerebrum',
    description:
      'Join #1 NEET coaching in Gomti Nagar, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score. Book free demo!',
    url: `${BASE_URL}/neet-coaching-gomti-nagar-lucknow`,
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
    title: 'Best NEET Coaching in Gomti Nagar Lucknow | Top Premium',
    description:
      'Join #1 NEET coaching in Gomti Nagar, Lucknow. Expert faculty. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-gomti-nagar-lucknow`,
  },
}

export default function NEETCoachingGomtiNagarLucknowPage() {
  return (
    <>
      <LocalitySchema
        locality="Gomti Nagar"
        slug="neet-coaching-gomti-nagar-lucknow"
        pageTitle="Best NEET Coaching in Gomti Nagar"
        pageDescription="Join #1 NEET coaching in Gomti Nagar, Lucknow. Expert faculty, proven 98% success rate, 695/720 top score."
        pageType="coaching"
      />
      <PageContent />
    </>
  )
}
