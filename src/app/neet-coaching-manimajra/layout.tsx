import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Manimajra Chandigarh | Growing Hub | Cerebrum Academy',
  description: 'Best NEET coaching for Manimajra Chandigarh students. 98% success rate, AIIMS faculty. Online classes - no travel to Sector 34. 60+ students. Fee ₹24,000+. Book free demo!',
  keywords: 'NEET coaching Manimajra, biology classes Manimajra Chandigarh, NEET preparation Manimajra, online NEET coaching Manimajra, best biology tuition Manimajra',
  openGraph: {
    title: 'NEET Coaching in Manimajra Chandigarh | Growing Hub | Cerebrum Academy',
    description: 'Best NEET coaching for Manimajra students. 98% success rate, AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-manimajra',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Manimajra Chandigarh | Growing Hub | Cerebrum Academy',
    description: 'Best NEET coaching for Manimajra Chandigarh students. 98% success rate, AIIMS faculty.',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-manimajra' },
}

export default function ManimajraLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
