import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Coaching for NEET Droppers | Repeater Batch 2025 | Cerebrum Academy',
  description:
    'Top NEET dropper biology coaching. Intensive revision, gap analysis, complete NCERT line-by-line. Expert AIIMS faculty, 98% success rate. Previous year papers, test series. Book free demo!',
  keywords:
    'NEET dropper coaching, biology coaching for droppers, NEET repeater batch, dropper batch biology, NEET second attempt coaching, NEET 2025 dropper, biology tuition for droppers, NEET dropper course, repeater biology coaching, NEET dropper online coaching, biology for NEET repeaters, gap year NEET coaching',
  openGraph: {
    title: 'Best NEET Dropper Biology Coaching | Repeater Batch | Cerebrum Academy',
    description:
      'Intensive biology coaching for NEET droppers. Complete revision, gap analysis, test series. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-droppers',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Dropper Biology Coaching | Cerebrum Biology Academy',
    description: 'Top biology coaching for NEET droppers. 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-droppers',
  },
}

export default function BiologyDroppersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
