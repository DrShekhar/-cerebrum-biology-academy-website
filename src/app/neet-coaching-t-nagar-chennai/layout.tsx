import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in T Nagar Chennai | Biology Classes | Cerebrum Academy',
  description:
    'Best NEET biology coaching in T Nagar Chennai. 94.2% success rate. AIIMS faculty. Nungambakkam, Kodambakkam, Vadapalani, Teynampet. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching T Nagar, best NEET biology coaching T Nagar Chennai, biology tuition Nungambakkam, NEET classes Kodambakkam, biology coaching Vadapalani, NEET preparation Tamil Nadu, T Nagar NEET coaching online, Samacheer Kalvi NEET coaching, biology tuition T Nagar, biology classes T Nagar Chennai, online biology coaching T Nagar, biology teacher T Nagar, NEET biology T Nagar',
  openGraph: {
    title: 'Best NEET Coaching in T Nagar Chennai | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET biology coaching in T Nagar Chennai with 94.2% success rate. AIIMS faculty. Nungambakkam, Kodambakkam, Vadapalani.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-t-nagar-chennai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-t-nagar-chennai',
  },
}

export default function TNagarCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
