import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kerala Biology Tuition & Coaching Online | NEET + Board Prep',
  description:
    'Best Kerala State Board Biology tuition online. 98% success rate. AIIMS faculty. Bridge Kerala HSE syllabus with NCERT for NEET. Kochi, Trivandrum, Calicut. Fee ₹24,000+. Book free demo!',
  keywords:
    'Kerala biology tuition, Kerala HSE biology coaching, SCERT Kerala biology, NEET coaching Kerala, biology tuition Kochi, biology coaching Trivandrum, Kerala board NEET preparation, plus two biology tuition Kerala, biology teacher online Kerala, Ernakulam biology coaching',
  openGraph: {
    title: 'Kerala Biology Tuition & Coaching Online | NEET + Board Prep',
    description:
      'Best Kerala Biology tuition with 98% success rate. Bridge Kerala HSE-NCERT gap. Kochi, Trivandrum, Calicut.',
    url: 'https://cerebrumbiologyacademy.com/kerala-biology-tuition-coaching',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kerala Biology Tuition & Coaching Online | NEET + Board Prep',
    description: 'Best Kerala State Board Biology tuition online. 98% success rate. AIIMS faculty.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/kerala-biology-tuition-coaching',
  },
}

export default function KeralaBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
