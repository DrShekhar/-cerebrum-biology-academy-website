import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Rajinder Nagar | Biology Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching in Rajinder Nagar — Central Delhi\'s coaching epicenter where Old Rajinder Nagar hosts dozens of UPSC + NEET coaching institutes. Biology-only specialist, AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, weekly 1:1 doubt slots. Karol Bagh metro / Rajendra Place metro access. 98% qualification rate. Online + offline options for Rajinder Nagar droppers / repeaters.',
  keywords: [
    'NEET coaching Rajinder Nagar',
    'NEET coaching Old Rajinder Nagar',
    'biology coaching Rajinder Nagar',
    'NEET tutor Rajinder Nagar',
    'best NEET coaching Rajinder Nagar',
    'NEET dropper coaching Rajinder Nagar',
    'NEET classes Rajinder Nagar',
    'biology classes Rajinder Nagar',
    'NEET coaching Central Delhi',
    'NEET coaching Karol Bagh metro',
    'AIIMS faculty Rajinder Nagar',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-rajinder-nagar' },
  openGraph: {
    title: 'NEET Coaching in Rajinder Nagar | Cerebrum Biology Academy',
    description: 'Biology-only specialist in Old Rajinder Nagar coaching epicenter. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-rajinder-nagar',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Rajinder Nagar | Cerebrum',
    description: 'Old Rajinder Nagar coaching epicenter. Biology specialist.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
