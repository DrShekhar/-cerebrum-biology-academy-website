import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Biology Tutor for NEET Droppers | Repeater Course',
  description:
    'Best online biology tutor for NEET droppers. Intensive 1-year program with personalized attention. Learn from Dr. Shekhar C Singh, AIIMS Alumnus. Book FREE demo!',
  keywords: [
    'online biology tutor for droppers',
    'neet dropper online biology coaching',
    'online biology classes for repeaters',
    'neet repeater biology online tutor',
    'dropper batch online biology',
    'online biology tuition for neet droppers',
    'best online coaching for neet droppers biology',
    'neet 2026 dropper online classes',
  ],
  openGraph: {
    title: 'Online Biology Tutor for NEET Droppers',
    description: 'Intensive dropper program online. Personalized attention, proven results!',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/online-biology-tutor-droppers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Biology Tutor for Droppers',
    description: 'Intensive NEET dropper program, live online classes!',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-tutor-droppers',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
