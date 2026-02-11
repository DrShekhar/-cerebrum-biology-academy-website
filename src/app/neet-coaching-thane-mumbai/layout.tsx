import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Thane Mumbai | Biology Classes | Cerebrum Academy',
  description:
    'Best NEET biology coaching in Thane Mumbai. 98% success rate. AIIMS faculty. Thane West, Ghodbunder Road, Hiranandani, Majiwada. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Thane, best NEET biology coaching Thane Mumbai, biology tuition Thane West, NEET classes Ghodbunder Road, biology coaching Hiranandani Thane, NEET preparation Mumbai, Thane NEET coaching online, Maharashtra HSC NEET coaching, biology tuition Thane, biology classes Thane Mumbai, online biology coaching Thane, biology teacher Thane, NEET biology Thane',
  openGraph: {
    title: 'Best NEET Coaching in Thane Mumbai | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET biology coaching in Thane Mumbai with 98% success rate. AIIMS faculty. Thane West, Ghodbunder Road, Hiranandani.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-thane-mumbai',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Thane Mumbai | Biology Classes | Cerebrum Academy',
    description: 'Best NEET biology coaching in Thane Mumbai. 98% success rate. AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-thane-mumbai',
  },
}

export default function ThaneCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
