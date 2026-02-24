import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Dehradun | Rajpur Road, Clock Tower',
  description:
    'Top NEET biology coaching in Dehradun for Uttarakhand students. 98% success rate, AIIMS faculty. Rajpur Road, Clock Tower, Prem Nagar, Clement Town. 1,800+ students. Book free demo!',
  keywords:
    'NEET coaching Dehradun, NEET biology coaching Dehradun, best NEET coaching Rajpur Road, NEET classes Clock Tower, biology coaching Prem Nagar, NEET tuition Clement Town, NEET coaching Race Course, NEET preparation Uttarakhand, online NEET coaching Dehradun, NEET biology Dehradun, Uttarakhand Board NEET prep, biology tuition Dehradun, biology classes Dehradun, online biology coaching Dehradun, biology teacher Dehradun, NEET biology Dehradun',
  openGraph: {
    title: 'Best NEET Coaching in Dehradun | Uttarakhand',
    description:
      'Top NEET biology coaching in Dehradun with 98% success rate. AIIMS faculty, small batches. Join 1,800+ Uttarakhand students.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-dehradun',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Dehradun',
    description:
      'Top NEET biology coaching in Dehradun. 98% success rate. Rajpur Road, Clock Tower, Prem Nagar.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-dehradun',
  },
}

export default function DehradunCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
