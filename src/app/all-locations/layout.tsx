import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Classes Near You | Cerebrum Biology Academy Centers',
  description:
    'Find Cerebrum Biology Academy coaching centers near you. 6 offline centers in Delhi NCR — South Extension, Rohini, Gurugram, Faridabad, Noida, Ghaziabad. Online classes for all India & NRI students.',
  keywords: [
    'biology classes near me',
    'NEET coaching centers Delhi NCR',
    'biology tuition near me',
    'Cerebrum Biology Academy locations',
    'NEET coaching South Extension',
    'NEET coaching Rohini',
    'NEET coaching Gurugram',
    'biology coaching centers',
  ],
  openGraph: {
    title: 'Biology Classes Near You | Cerebrum Biology Academy Centers',
    description:
      'Find Cerebrum Biology Academy coaching centers near you. 6 offline centers in Delhi NCR.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Classes Near You | Cerebrum Biology Academy Centers',
    description: 'Find Cerebrum Biology Academy coaching centers near you.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/all-locations',
  },
}

export default function AllLocationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
