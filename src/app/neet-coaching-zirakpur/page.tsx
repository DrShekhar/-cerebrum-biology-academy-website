import { Metadata } from 'next'
import PageContent from './PageContent'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

const ogImageParams = new URLSearchParams({
  title: 'NEET Biology Coaching',
  subtitle: 'Online classes with 98% success rate',
  locality: 'Zirakpur',
})

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Zirakpur | Chandigarh Satellite | Cerebrum',
  description:
    'Premium NEET coaching in Zirakpur, Punjab. AIIMS trained faculty, 98% success rate. Near Chandigarh. Rs 24,000-68,000/year with EMI. VIP Road, Baltana, Dhakoli. Book free demo!',
  keywords: [
    'NEET coaching Zirakpur',
    'online NEET classes Zirakpur',
    'biology tuition Zirakpur',
    'NEET preparation Chandigarh',
    'best biology coaching VIP Road',
    'NEET tutor Baltana',
    'medical entrance coaching Punjab',
    'NEET online classes Chandigarh tricity',
  ],
  openGraph: {
    title: 'Best NEET Coaching in Zirakpur | Near Chandigarh | Cerebrum',
    description:
      'Premium NEET coaching in Zirakpur. AIIMS faculty, 98% success rate, near Chandigarh tricity. Book free demo!',
    url: `${BASE_URL}/neet-coaching-zirakpur`,
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/api/og?${ogImageParams.toString()}`,
        width: 1200,
        height: 630,
        alt: 'NEET Coaching in Zirakpur - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Zirakpur | 98% Success Rate',
    description:
      'NEET coaching in Zirakpur near Chandigarh. AIIMS faculty, 98% success rate. Book free demo!',
    images: [`${BASE_URL}/api/og?${ogImageParams.toString()}`],
  },
  alternates: {
    canonical: `${BASE_URL}/neet-coaching-zirakpur`,
  },
}

export default function NeetCoachingZirakpurPage() {
  return <PageContent />
}
