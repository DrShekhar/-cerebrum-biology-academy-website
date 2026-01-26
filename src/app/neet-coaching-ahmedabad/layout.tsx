import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Ahmedabad | Satellite, SG Highway, Bopal | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Ahmedabad for Gujarat students. 94.2% success rate, AIIMS faculty. Satellite, SG Highway, Bopal, Prahlad Nagar, Gandhinagar. 3,500+ students. Book free demo!',
  keywords:
    'NEET coaching Ahmedabad, NEET biology coaching Ahmedabad, best NEET coaching Satellite, NEET classes SG Highway, biology coaching Bopal, NEET tuition Prahlad Nagar, NEET coaching Gandhinagar, NEET preparation Gujarat, online NEET coaching Ahmedabad, NEET coaching Vastrapur, NEET coaching Navrangpura, NEET biology Ahmedabad, GSEB NEET prep, BJ Medical College preparation',
  openGraph: {
    title: 'Best NEET Coaching in Ahmedabad | Gujarat | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Ahmedabad with 94.2% success rate. AIIMS faculty, small batches. Join 3,500+ Gujarat students from Satellite, SG Highway, Bopal.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-ahmedabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Ahmedabad | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Ahmedabad. 94.2% success rate. Satellite, SG Highway, Bopal, Prahlad Nagar, Gandhinagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-ahmedabad',
  },
}

export default function AhmedabadCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
