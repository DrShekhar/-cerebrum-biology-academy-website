import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Karnataka PUC Biology Coaching Online | NEET + Board Prep | Cerebrum Academy',
  description:
    'Best Karnataka PUC Biology coaching online. 98% success rate. AIIMS faculty. Bridge KSEEB syllabus with NCERT for NEET. Bangalore, Mysore, Mangalore. Fee ₹24,000+. Book free demo!',
  keywords:
    'Karnataka PUC biology coaching, KSEEB biology tuition, PUC biology online classes, NEET coaching Karnataka, biology tuition Bangalore, biology coaching Mysore, PUC NEET preparation, Karnataka state board biology, 2nd PUC biology tuition, PUC biology teacher online',
  openGraph: {
    title: 'Karnataka PUC Biology Coaching Online | NEET + Board Prep | Cerebrum Academy',
    description:
      'Best Karnataka PUC Biology coaching with 98% success rate. AIIMS faculty. Bridge PUC-NCERT gap. Bangalore, Mysore, Mangalore.',
    url: 'https://cerebrumbiologyacademy.com/karnataka-puc-biology-coaching',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karnataka PUC Biology Coaching Online | Cerebrum Biology Academy',
    description:
      'Best Karnataka PUC Biology coaching online. 98% success rate. Bangalore, Mysore, Mangalore.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/karnataka-puc-biology-coaching',
  },
}

export default function KarnatakaPUCBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
