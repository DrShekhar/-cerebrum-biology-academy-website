import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in Jaipur | Vaishali Nagar, Mansarovar | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Jaipur - Kota alternative! 94.2% success rate, AIIMS faculty. Vaishali Nagar, Mansarovar, Malviya Nagar, C-Scheme. 3,500+ Rajasthan students. Book free demo!',
  keywords:
    'NEET coaching Jaipur, NEET biology coaching Jaipur, best NEET coaching Vaishali Nagar, NEET classes Mansarovar, biology coaching Malviya Nagar, NEET tuition Raja Park, NEET coaching C-Scheme, NEET preparation Rajasthan, online NEET coaching Jaipur, NEET coaching Tonk Road, NEET coaching Jagatpura, NEET biology Jaipur, RBSE NEET prep, SMS Medical College preparation, Kota alternative',
  openGraph: {
    title: 'Best NEET Coaching in Jaipur | Rajasthan | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Jaipur - Kota alternative! 94.2% success rate. AIIMS faculty, small batches. Join 3,500+ Rajasthan students from Vaishali Nagar, Mansarovar.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-jaipur',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Jaipur | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Jaipur. Kota alternative! 94.2% success rate. Vaishali Nagar, Mansarovar, Malviya Nagar, C-Scheme.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-jaipur',
  },
}

export default function JaipurCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
