import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Sector 17 Chandigarh | City Center | Cerebrum Academy',
  description: 'Best NEET coaching for Sector 17 Chandigarh students. 94.2% success rate, AIIMS faculty. Online classes - no travel to Sector 34. Near Rose Garden, Sukhna Lake. Fee ₹24,000+. Book free demo!',
  keywords: 'NEET coaching Sector 17 Chandigarh, biology classes Sector 17, NEET preparation City Center Chandigarh, Rose Garden area NEET coaching, Sukhna Lake NEET classes, online NEET coaching Sector 17, best biology tuition Sector 17 Chandigarh',
  openGraph: {
    title: 'NEET Coaching in Sector 17 Chandigarh | City Center | Cerebrum Academy',
    description: 'Best NEET coaching for Sector 17 Chandigarh. 94.2% success rate. Skip crowded Sector 34 coaching!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-chandigarh-sector-17',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-chandigarh-sector-17',
  },
}

export default function Sector17Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
