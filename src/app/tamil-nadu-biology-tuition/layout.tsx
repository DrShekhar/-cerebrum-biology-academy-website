import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tamil Nadu State Board Biology Tuition Online | NEET + Board Prep | Cerebrum Academy',
  description:
    'Best Tamil Nadu State Board Biology tuition online. 94.2% success rate. AIIMS faculty. Bridge TN syllabus with NCERT for NEET. Chennai, Coimbatore, Madurai. Fee ₹24,000+. Book free demo!',
  keywords:
    'Tamil Nadu biology tuition, TN state board biology coaching, Tamil Nadu biology online classes, NEET coaching Chennai, biology tuition Coimbatore, biology coaching Madurai, TN NEET preparation, Tamil Nadu board biology, 12th biology tuition Tamil Nadu, TN biology teacher online',
  openGraph: {
    title: 'Tamil Nadu State Board Biology Tuition Online | NEET + Board Prep | Cerebrum Academy',
    description:
      'Best Tamil Nadu Biology tuition with 94.2% success rate. AIIMS faculty. Bridge TN-NCERT gap. Chennai, Coimbatore, Madurai.',
    url: 'https://cerebrumbiologyacademy.com/tamil-nadu-biology-tuition',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamil Nadu Biology Tuition Online | Cerebrum Biology Academy',
    description:
      'Best Tamil Nadu Biology tuition online. 94.2% success rate. Chennai, Coimbatore, Madurai.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/tamil-nadu-biology-tuition',
  },
}

export default function TamilNaduBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
