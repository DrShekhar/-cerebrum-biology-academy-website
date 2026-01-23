import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Indore | Biology Classes | Cerebrum Academy',
  description:
    'Best NEET biology coaching in Indore. 94.2% success rate. AIIMS faculty. Vijay Nagar, Palasia, Rau, Bhawarkua. Online live classes. Fee ₹24,000+. Book free demo!',
  keywords:
    'NEET coaching Indore, best NEET biology coaching Indore, biology tuition Indore, NEET classes Vijay Nagar, biology coaching Palasia, NEET preparation MP, Indore NEET coaching online, Class 12 biology Indore, CBSE biology tuition Indore',
  openGraph: {
    title: 'Best NEET Coaching in Indore | Biology Classes | Cerebrum Academy',
    description:
      'Best NEET biology coaching in Indore with 94.2% success rate. AIIMS faculty. Vijay Nagar, Palasia, Rau.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-indore',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-indore',
  },
}

export default function IndoreCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
