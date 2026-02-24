import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maharashtra HSC Biology Tuition Online | NEET + Board Prep',
  description:
    'Best Maharashtra HSC Biology tuition online. 98% success rate. AIIMS faculty. Bridge HSC syllabus with NCERT for NEET. Mumbai, Pune, Nagpur, Thane. Fee ₹24,000+. Book free demo!',
  keywords:
    'Maharashtra HSC biology tuition, Maharashtra board biology coaching, HSC biology online classes, NEET coaching Maharashtra, biology tuition Mumbai, biology coaching Pune, HSC NEET preparation, Maharashtra state board biology, 12th biology tuition Maharashtra, HSC biology teacher online',
  openGraph: {
    title: 'Maharashtra HSC Biology Tuition Online | NEET + Board Prep',
    description:
      'Best Maharashtra HSC Biology tuition with 98% success rate. AIIMS faculty. Bridge HSC-NCERT gap. Mumbai, Pune, Nagpur.',
    url: 'https://cerebrumbiologyacademy.com/maharashtra-hsc-biology-tuition',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maharashtra HSC Biology Tuition Online',
    description:
      'Best Maharashtra HSC Biology tuition online. 98% success rate. Mumbai, Pune, Nagpur, Thane.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/maharashtra-hsc-biology-tuition',
  },
}

export default function MaharashtraHSCBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
