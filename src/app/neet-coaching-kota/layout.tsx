import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Biology Coaching in Kota | Talwandi, Mahaveer Nagar | Cerebrum Academy',
  description:
    "Top NEET biology coaching in Kota - India's coaching capital. 98% success rate, AIIMS faculty. Fill the Biology gap in your Kota preparation. Talwandi, Mahaveer Nagar, Rajeev Gandhi Nagar. 1,50,000+ students. Book free demo!",
  keywords:
    'NEET coaching Kota, NEET biology coaching Kota, best biology coaching Kota, NEET coaching Talwandi, NEET classes Mahaveer Nagar, biology coaching Rajeev Gandhi Nagar, NEET tuition Kunhari, online NEET coaching Kota, NEET preparation Kota, biology classes Kota, NEET biology Kota, Allen alternative Kota, Resonance alternative Kota, biology gap filler Kota, NEET biology specialist Kota',
  openGraph: {
    title: "Best NEET Biology Coaching in Kota | India's Coaching Capital | Cerebrum Academy",
    description:
      'Top NEET biology coaching in Kota with 98% success rate. AIIMS faculty, small batches. Fill the Biology gap in your Kota preparation. Join 1,50,000+ students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kota',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Biology Coaching in Kota | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Kota. 98% success rate. Talwandi, Mahaveer Nagar, Rajeev Gandhi Nagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kota',
  },
}

export default function KotaCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
