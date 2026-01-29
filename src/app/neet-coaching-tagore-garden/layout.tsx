import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching Tagore Garden | Biology Classes West Delhi | Cerebrum Academy',
  description:
    'Best NEET coaching for Tagore Garden students. Biology tuition near Kohli One Westend Greens, MIG Flats Extension. Just 20 min from Rohini via metro. 97% success rate. Call 88264-44334.',
  keywords: [
    // Primary location keywords
    'NEET coaching tagore garden',
    'biology tuition tagore garden delhi',
    'NEET classes tagore garden',
    'biology coaching tagore garden',
    // Nearby area keywords
    'NEET coaching rajouri garden',
    'NEET coaching janakpuri',
    'NEET coaching punjabi bagh',
    'NEET coaching tilak nagar',
    'NEET coaching subhash nagar',
    'NEET coaching west delhi',
    // Society/locality keywords
    'NEET coaching kohli one westend greens',
    'biology tuition MIG flats tagore garden',
    'NEET classes tagore garden extension',
    // Fee/price keywords
    'NEET coaching fee tagore garden',
    'affordable NEET coaching west delhi',
    'NEET coaching fees delhi',
    // Results/proof keywords
    'NEET toppers west delhi',
    'NEET result tagore garden',
    'NEET success rate tagore garden',
    // Student type keywords
    'NEET dropper coaching tagore garden',
    'NEET foundation class 9 west delhi',
    'NEET repeater batch tagore garden',
    // Online/mode keywords
    'online NEET coaching tagore garden',
    'online NEET classes west delhi',
    // School proximity keywords
    'NEET coaching near tagore international school',
    'NEET coaching near bal bharati rajouri garden',
    'NEET coaching near DAV rajouri garden',
    // Metro keywords
    'NEET coaching near tagore garden metro',
    'NEET coaching blue line west delhi',
    'NEET coaching near rajouri garden metro',
    // Voice search keywords
    'where is best NEET coaching in tagore garden',
    'how much NEET coaching cost west delhi',
    'best NEET biology coaching near me west delhi',
  ].join(', '),
  openGraph: {
    title: 'NEET Coaching Tagore Garden | Biology Classes West Delhi | Cerebrum Academy',
    description:
      'Best NEET coaching for Tagore Garden & West Delhi students. Just 20 min from Rohini via metro. 97% success rate, AIIMS faculty.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-garden',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og-tagore-garden.jpg',
        width: 1200,
        height: 630,
        alt: 'Best NEET Coaching in Tagore Garden - Cerebrum Biology Academy',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching Tagore Garden | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching for Tagore Garden & West Delhi. 97% success rate. Rajouri Garden, Janakpuri, Punjabi Bagh covered.',
    images: ['/og-tagore-garden.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-tagore-garden',
  },
}

export default function TagoreGardenCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
