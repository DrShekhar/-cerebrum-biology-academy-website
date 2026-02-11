import { Metadata } from 'next'
import PageContent from './PageContent'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'Biology Tuition',
  subtitle: 'Premium biology tuition with 98% success rate',
  locality: 'Surat',
})

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Surat | 98% Success Rate | Cerebrum',
  description:
    'Premium Biology tuition & NEET coaching for Surat students. AIIMS faculty, 98% success rate. Adajan, Vesu, Athwa, City Light. Rs 24,000-68,000/year. Book free demo!',
  keywords: [
    'biology tuition Surat',
    'online biology classes Surat',
    'NEET coaching Surat',
    'NEET preparation Surat Gujarat',
    'best biology tutor Adajan',
    'biology tuition Vesu Athwa',
    'medical entrance coaching Surat',
    'NEET online classes Gujarat',
  ],
  openGraph: {
    title: 'Best Biology Tuition in Surat | Cerebrum Biology Academy',
    description:
      'Premium biology tuition in Surat. AIIMS trained faculty, 98% success rate, 680+ Surat students. Book free demo!',
    url: `${BASE_URL}/biology-tuition-surat`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'Biology Tuition in Surat - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Tuition in Surat | 98% Success Rate',
    description:
      'Biology tuition in Surat for Gujarat students. AIIMS faculty, 98% success rate. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/biology-tuition-surat`,
  },
}

export default function BiologyTuitionSuratPage() {
  return <PageContent />
}
