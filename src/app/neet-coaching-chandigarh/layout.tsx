import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Chandigarh | Biology Classes | Cerebrum Academy',
  description:
    'Best NEET biology coaching in Chandigarh. 98% success rate. AIIMS faculty. Sector 17, 22, 35, Panchkula, Mohali. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Chandigarh, best NEET biology coaching Chandigarh, biology tuition Chandigarh, NEET classes Sector 17, biology coaching Panchkula, NEET preparation Mohali, Chandigarh NEET coaching online, Class 12 biology Chandigarh, CBSE biology tuition Chandigarh',
  openGraph: {
    title: 'Best NEET Coaching in Chandigarh | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET biology coaching in Chandigarh with 98% success rate. AIIMS faculty. Sector 17, 22, Panchkula, Mohali.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-chandigarh',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-chandigarh',
  },
}

export default function ChandigarhCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
