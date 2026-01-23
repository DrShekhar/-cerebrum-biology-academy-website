import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Telangana Inter Biology Coaching Online | NEET + Board Prep | Cerebrum Academy',
  description:
    'Best Telangana Intermediate Biology coaching online. 94.2% success rate. AIIMS faculty. Bridge TSBIE syllabus with NCERT for NEET. Hyderabad, Warangal, Nizamabad. Fee ₹24,000+. Book free demo!',
  keywords:
    'Telangana inter biology coaching, TSBIE biology tuition, Telangana intermediate biology, NEET coaching Hyderabad, biology tuition Warangal, Telangana board biology, inter biology teacher online, TS inter NEET preparation, Hyderabad biology coaching, inter 2nd year biology',
  openGraph: {
    title: 'Telangana Inter Biology Coaching Online | NEET + Board Prep | Cerebrum Academy',
    description:
      'Best Telangana Intermediate Biology coaching with 94.2% success rate. Bridge TSBIE-NCERT gap. Hyderabad, Warangal.',
    url: 'https://cerebrumbiologyacademy.com/telangana-inter-biology-coaching',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/telangana-inter-biology-coaching',
  },
}

export default function TelanganaInterBiologyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
