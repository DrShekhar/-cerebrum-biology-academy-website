import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Viman Nagar Pune | Biology Classes',
  description:
    'Best NEET biology coaching in Viman Nagar Pune. 98% success rate. AIIMS faculty. Kalyani Nagar, Kharadi, Wadgaon Sheri. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Viman Nagar, best NEET biology coaching Viman Nagar Pune, biology tuition Kalyani Nagar, NEET classes Kharadi, biology coaching Wadgaon Sheri, NEET preparation Pune, Viman Nagar NEET coaching online, international school NEET coaching Pune, biology tuition Viman Nagar, biology classes Viman Nagar Pune, online biology coaching Viman Nagar, biology teacher Viman Nagar, NEET biology Viman Nagar',
  openGraph: {
    title: 'Best NEET Coaching in Viman Nagar Pune | Biology Classes',
    description:
      'Best NEET biology coaching in Viman Nagar Pune with 98% success rate. AIIMS faculty. Kalyani Nagar, Kharadi, Wadgaon Sheri.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-viman-nagar-pune',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Viman Nagar Pune | Biology Classes',
    description: 'Best NEET biology coaching in Viman Nagar Pune. 98% success rate. AIIMS faculty. Kalyani Nagar, Kharadi, Wadgaon Sheri.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-viman-nagar-pune',
  },
}

export default function VimanNagarCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
