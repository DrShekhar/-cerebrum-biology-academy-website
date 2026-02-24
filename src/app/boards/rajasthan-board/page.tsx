import { Metadata } from 'next'
import PageContent from './PageContent'

const BASE_URL = 'https://cerebrumbiologyacademy.com'

export const metadata: Metadata = {
  title: 'Rajasthan Board (RBSE) Biology to NEET',
  description: 'Expert RBSE Biology coaching for Rajasthan students. NEET-integrated preparation from Kota, Jaipur, Jodhpur and across Rajasthan.',
  keywords: [
    'Rajasthan board biology',
    'RBSE biology coaching',
    'Kota NEET coaching',
    'Jaipur NEET coaching',
    'Rajasthan NEET preparation',
    'RBSE to NEET bridge',
  ],
  openGraph: {
    title: 'Rajasthan Board (RBSE) Biology to NEET',
    description: 'Expert RBSE Biology coaching for Rajasthan students with seamless NEET integration.',
    url: `${BASE_URL}/boards/rajasthan-board`,
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/boards/rajasthan-board`,
  },
}

export default function RajasthanBoardPage() {
  return <PageContent />
}
