import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Varanasi | Lanka, Sigra, Bhelupur',
  description:
    'Top NEET biology coaching in Varanasi (Banaras) for UP students. IMS BHU focused preparation! 98% success rate, AIIMS faculty. Lanka, Sigra, Bhelupur, Assi, Godowlia. 3,500+ students. Book free demo!',
  keywords:
    'NEET coaching Varanasi, NEET biology coaching Varanasi, best NEET coaching Lanka, NEET classes Sigra, biology coaching Bhelupur, NEET tuition Assi, NEET coaching Godowlia, NEET preparation UP, online NEET coaching Varanasi, NEET coaching Banaras, NEET biology Varanasi, UP Board NEET prep, IMS BHU preparation, biology tuition Varanasi, biology classes Varanasi, online biology coaching Varanasi, biology teacher Varanasi, NEET biology Varanasi',
  openGraph: {
    title: 'Best NEET Coaching in Varanasi | Uttar Pradesh',
    description:
      'Top NEET biology coaching in Varanasi with 98% success rate. IMS BHU focused preparation! AIIMS faculty, small batches. Join 3,500+ UP students from Lanka, Sigra, Bhelupur.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-varanasi',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Varanasi',
    description:
      'Top NEET biology coaching in Varanasi. IMS BHU focused! 98% success rate. Lanka, Sigra, Bhelupur, Assi, Godowlia.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-varanasi',
  },
}

export default function VaranasiCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
