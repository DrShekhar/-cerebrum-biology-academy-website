import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Mussoorie | Mall Road, Landour | Cerebrum Academy',
  description:
    'Top NEET biology coaching in Mussoorie for boarding school students. 98% success rate, AIIMS faculty. Mall Road, Landour, Library Chowk. Join from any hill station. Book free demo!',
  keywords:
    'NEET coaching Mussoorie, NEET biology coaching Mussoorie, best NEET coaching Mall Road, NEET classes Landour, biology coaching Mussoorie, NEET tuition hill station, NEET coaching boarding school, NEET preparation Uttarakhand, online NEET coaching Mussoorie, NEET biology Mussoorie, biology tuition Mussoorie, biology classes Mussoorie, online biology coaching Mussoorie, biology teacher Mussoorie, NEET biology Mussoorie',
  openGraph: {
    title: 'Best NEET Coaching in Mussoorie | Uttarakhand | Cerebrum Academy',
    description:
      'Top NEET biology coaching in Mussoorie with 98% success rate. Perfect for boarding school students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-mussoorie',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Mussoorie | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Mussoorie. 98% success rate. Mall Road, Landour. Boarding school specialists.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-mussoorie',
  },
}

export default function MussoorieCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
