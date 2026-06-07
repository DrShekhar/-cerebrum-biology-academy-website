import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Tagore Garden | Biology Specialist | Cerebrum Biology Academy',
  description:
    'NEET Biology coaching in Tagore Garden, West Delhi — adjacent to Subhash Nagar, Rajouri Garden, Tilak Nagar, Janakpuri. Biology-only specialist, AIIMS-trained Dr. Shekhar C Singh, NCERT line-by-line, weekly 1:1 doubt slots. Direct Tagore Garden metro access (Blue Line). 98% qualification rate. Online + offline options for West Delhi droppers / repeaters.',
  keywords: [
    'NEET coaching Tagore Garden',
    'biology coaching Tagore Garden',
    'NEET tutor Tagore Garden',
    'best NEET coaching Tagore Garden',
    'NEET classes Tagore Garden',
    'NEET coaching West Delhi',
    'NEET coaching Rajouri Garden',
    'NEET coaching Subhash Nagar',
    'NEET coaching near Tagore Garden metro',
    'AIIMS faculty Tagore Garden',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-garden' },
  openGraph: {
    title: 'NEET Coaching in Tagore Garden | Cerebrum Biology Academy',
    description: 'Biology specialist serving Tagore Garden + Rajouri Garden + Subhash Nagar. AIIMS faculty.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-garden',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Coaching in Tagore Garden | Cerebrum',
    description: 'West Delhi biology specialist.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
