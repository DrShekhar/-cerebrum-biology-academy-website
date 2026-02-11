import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Kharar Punjab | Near Mohali | Cerebrum Academy',
  description: 'Best NEET coaching for Kharar Punjab students. 98% success rate, AIIMS faculty. Online classes - no travel to Chandigarh. Near Mohali. Fee ₹24,000+. Book free demo!',
  keywords: 'NEET coaching Kharar, biology classes Kharar Punjab, NEET preparation Kharar, online NEET coaching Kharar, best biology tuition Kharar, Kharar NEET classes near Mohali',
  openGraph: {
    title: 'NEET Coaching in Kharar Punjab | Near Mohali | Cerebrum Academy',
    description: 'Best NEET coaching for Kharar students. 98% success rate, AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-kharar',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-kharar' },
  other: { 'geo.region': 'IN-PB', 'geo.placename': 'Kharar' },
}

export default function KhararLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
