import { Metadata } from 'next'
import PageContent from './PageContent'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'Kerala HSE Biology to NEET & KEAM',
  description: 'Expert Kerala HSE Biology coaching for NEET and KEAM entrance exams. Known for producing high NEET scorers from Kerala board curriculum.',
  keywords: [
    'Kerala HSE biology coaching',
    'KEAM preparation',
    'Kerala NEET coaching',
    'HSE to NEET bridge',
    'Kerala board biology',
    'Kerala high score NEET',
  ],
  openGraph: {
    title: 'Kerala HSE Biology to NEET & KEAM',
    description: 'Expert Kerala HSE Biology coaching with NEET and KEAM integration for maximum success.',
    url: `${BASE_URL}/boards/kerala-hse`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/kerala-hse`,
  },
}

export default function KeralaHSEPage() {
  return <PageContent />
}
