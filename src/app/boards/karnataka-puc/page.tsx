import { Metadata } from 'next'
import PageContent from './PageContent'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'Karnataka PUC Biology to NEET | Cerebrum Biology Academy',
  description: 'Expert Karnataka PUC Biology coaching with seamless NEET integration. Master KCET & NEET from Pre-University Course curriculum.',
  keywords: [
    'Karnataka PUC biology coaching',
    'PUC to NEET bridge',
    'KCET biology preparation',
    'Karnataka board NEET',
    'PUC physics chemistry biology',
    'Karnataka state board coaching',
  ],
  openGraph: {
    title: 'Karnataka PUC Biology to NEET | Cerebrum Biology Academy',
    description:
      'Expert Karnataka PUC Biology coaching with seamless NEET integration. Master KCET & NEET from Pre-University Course curriculum.',
    url: `${BASE_URL}/boards/karnataka-puc`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/karnataka-puc`,
  },
}

export default function KarnatakaPUCPage() {
  return <PageContent />
}
