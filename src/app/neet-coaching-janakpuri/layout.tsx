import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Janakpuri | Biology Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching in Janakpuri, West Delhi — biology-only specialist serving Janakpuri A / B / C / D blocks, Tilak Nagar, Hari Nagar, Subhash Nagar, Dabri. AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, weekly 1:1 doubt slots. Easy access via Janakpuri West (Magenta + Blue) and Tilak Nagar (Blue) metros. 98% qualification rate.',
  keywords: [
    'NEET coaching Janakpuri',
    'NEET coaching Janakpuri West',
    'biology coaching Janakpuri',
    'NEET tutor Janakpuri',
    'best NEET coaching Janakpuri',
    'NEET dropper coaching Janakpuri',
    'NEET classes Janakpuri',
    'NEET coaching West Delhi',
    'NEET coaching Tilak Nagar',
    'NEET coaching near Janakpuri metro',
    'AIIMS faculty Janakpuri',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-janakpuri' },
  openGraph: {
    title: 'NEET Coaching in Janakpuri | Cerebrum Biology Academy',
    description: 'Biology specialist serving Janakpuri + West Delhi. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-janakpuri',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Janakpuri | Cerebrum',
    description: 'West Delhi biology specialist. AIIMS faculty.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
