import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Sector 22 Chandigarh | Commercial Hub | Cerebrum Academy',
  description: 'Best NEET coaching for Sector 22 Chandigarh students. 94.2% success rate, AIIMS faculty. Online classes - skip Sector 34 crowd. 95+ students. Fee ₹24,000+. Book free demo!',
  keywords: 'NEET coaching Sector 22 Chandigarh, biology classes Sector 22, NEET preparation Commercial Hub Chandigarh, online NEET coaching Sector 22, best biology tuition Sector 22',
  openGraph: {
    title: 'NEET Coaching in Sector 22 Chandigarh | Commercial Hub | Cerebrum Academy',
    description: 'Best NEET coaching for Sector 22 Chandigarh. 94.2% success rate, AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-chandigarh-sector-22',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-chandigarh-sector-22' },
}

export default function Sector22Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
