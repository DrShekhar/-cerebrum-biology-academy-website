import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Tuition in Surat | NEET Coaching | Cerebrum Academy',
  description:
    'Best biology tuition & NEET coaching in Surat. 98% success rate. AIIMS faculty. Adajan, Vesu, Athwa, City Light. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'biology tuition Surat, NEET coaching Surat, best biology coaching Surat, NEET classes Adajan, biology coaching Vesu, NEET preparation Gujarat, Surat biology coaching online, Class 12 biology Surat, CBSE biology tuition Surat',
  openGraph: {
    title: 'Best Biology Tuition in Surat | NEET Coaching | Cerebrum Academy',
    description:
      'Best biology tuition in Surat with 98% success rate. AIIMS faculty. Adajan, Vesu, Athwa, City Light.',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-surat',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-surat',
  },
}

export default function SuratBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
