import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Secunderabad Hyderabad | Biology Classes | Cerebrum Academy',
  description:
    'Best NEET biology coaching in Secunderabad Hyderabad. 94.2% success rate. AIIMS faculty. Begumpet, Trimulgherry, Alwal, Malkajgiri. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Secunderabad, best NEET biology coaching Secunderabad Hyderabad, biology tuition Begumpet, NEET classes Trimulgherry, biology coaching Malkajgiri, NEET preparation Telangana, Secunderabad NEET coaching online, TSBIE NEET coaching, biology tuition Secunderabad, biology classes Secunderabad Hyderabad, online biology coaching Secunderabad, biology teacher Secunderabad, NEET biology Secunderabad',
  openGraph: {
    title: 'Best NEET Coaching in Secunderabad Hyderabad | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET biology coaching in Secunderabad Hyderabad with 94.2% success rate. AIIMS faculty. Begumpet, Trimulgherry, Alwal.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-secunderabad-hyderabad',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-secunderabad-hyderabad',
  },
}

export default function SecunderabadCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
