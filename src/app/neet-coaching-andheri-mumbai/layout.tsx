import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best NEET Coaching in Andheri Mumbai | Lokhandwala, Versova | Cerebrum Academy',
  description:
    'Premium NEET biology coaching in Andheri, Mumbai. 94.2% success rate, AIIMS faculty. Lokhandwala, Versova, DN Nagar, Four Bungalows. 850+ students. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Andheri, NEET biology coaching Lokhandwala, best NEET coaching Andheri Mumbai, NEET classes Versova, biology coaching DN Nagar, NEET tuition Four Bungalows, NEET coaching Andheri West, NEET coaching Andheri East, online NEET coaching Mumbai, Mithibai NEET coaching, NM College NEET prep, Podar NEET preparation',
  openGraph: {
    title: 'Best NEET Coaching in Andheri Mumbai | Commercial Hub | Cerebrum Academy',
    description:
      'Premium NEET biology coaching in Andheri with 94.2% success rate. AIIMS faculty, small batches. Lokhandwala, Versova, DN Nagar students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-andheri-mumbai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Andheri Mumbai | Cerebrum Biology Academy',
    description:
      'Premium NEET biology coaching in Andheri. 94.2% success rate. Lokhandwala, Versova, DN Nagar, Four Bungalows.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-andheri-mumbai',
  },
}

export default function AndheriMumbaiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
