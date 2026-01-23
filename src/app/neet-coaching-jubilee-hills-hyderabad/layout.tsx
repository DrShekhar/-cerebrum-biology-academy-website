import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in Jubilee Hills Hyderabad | Banjara Hills, Film Nagar | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Jubilee Hills, Hyderabad for elite schools. 94.2% success rate, AIIMS faculty. Jubilee Hills, Banjara Hills, Film Nagar, Road No. 36. Chirec, Oakridge students. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Jubilee Hills, NEET biology coaching Jubilee Hills Hyderabad, best NEET coaching Banjara Hills, NEET classes Film Nagar, biology coaching Road 36, NEET tuition Panjagutta, premium NEET coaching Hyderabad, international school NEET prep, IB biology NEET Hyderabad, IGCSE NEET preparation, Chirec NEET coaching, Oakridge NEET prep, Glendale Academy NEET',
  openGraph: {
    title: 'Best NEET Coaching in Jubilee Hills Hyderabad | Premium Education | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Jubilee Hills with 94.2% success rate. AIIMS faculty, small batches. International school specialists. Chirec, Oakridge, Glendale students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-jubilee-hills-hyderabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Jubilee Hills Hyderabad | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Jubilee Hills. 94.2% success rate. Jubilee Hills, Banjara Hills, Film Nagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-jubilee-hills-hyderabad',
  },
}

export default function JubileeHillsHyderabadCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
