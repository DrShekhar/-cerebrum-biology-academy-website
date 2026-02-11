import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Gwalior | City Centre, Lashkar | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Gwalior for MP students. GRMC Gwalior focused! 98% success rate, AIIMS faculty. City Centre, Lashkar, Morar. 1,800+ students. Book free demo!',
  keywords:
    'NEET coaching Gwalior, NEET biology coaching Gwalior, best NEET coaching City Centre, NEET classes Lashkar, biology coaching Morar, NEET tuition Gwalior, NEET coaching Thatipur, NEET preparation MP, online NEET coaching Gwalior, GRMC Gwalior preparation, NEET biology Gwalior, biology tuition Gwalior, biology classes Gwalior, online biology coaching Gwalior, biology teacher Gwalior, NEET biology Gwalior',
  openGraph: {
    title: 'Best NEET Coaching in Gwalior | Madhya Pradesh | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Gwalior with 98% success rate. GRMC Gwalior focused! AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-gwalior',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Gwalior | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Gwalior. GRMC focused! 98% success rate. City Centre, Lashkar, Morar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-gwalior',
  },
}

export default function GwaliorCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
