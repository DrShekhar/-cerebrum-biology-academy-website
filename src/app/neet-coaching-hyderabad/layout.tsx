import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Coaching in Hyderabad | Online Biology Classes by Cerebrum Academy',
  description:
    'Best online NEET biology coaching for Hyderabad students. AIIMS-trained faculty, live interactive classes, 98% success rate. Join Cerebrum Academy from Hyderabad!',
  openGraph: {
    title: 'NEET Coaching in Hyderabad | Online Biology Classes by Cerebrum Academy',
    description:
      'Best online NEET biology coaching for Hyderabad students. AIIMS-trained faculty, live interactive classes, 98% success rate. Join Cerebrum Academy from Hyderabad!',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-hyderabad',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-hyderabad',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
