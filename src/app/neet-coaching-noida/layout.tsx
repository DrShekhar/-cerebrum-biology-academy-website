import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best NEET Coaching in Noida 2025 [1200+ Students] | Cerebrum',
  description:
    'Top NEET biology coaching in Noida & Greater Noida. AIIMS-trained faculty, 98% success rate. Sector 18, 62, 137, 150 covered. Book FREE demo class today!',
  keywords:
    'NEET coaching Noida, NEET coaching Sector 18 Noida, NEET coaching Sector 62 Noida, NEET coaching Sector 137 Noida, NEET coaching Sector 150 Noida, NEET coaching Greater Noida, NEET coaching Gaur City, biology coaching Noida, NEET classes Noida, best NEET coaching Noida, medical coaching Noida, NEET preparation Noida, NEET coaching near me Noida, online NEET coaching Noida, NEET coaching Noida Expressway, biology tuition Noida, NEET coaching near DPS Noida, NEET coaching near Amity Noida, NEET coaching near Botanical Garden metro, NEET coaching Aqua Line, top 10 NEET coaching Noida',
  openGraph: {
    title: 'Best NEET Coaching in Noida 2025 [1200+ Students]',
    description:
      'Top NEET biology coaching in Noida with 98% success rate. AIIMS faculty, small batches. Join 1,200+ students from all Noida sectors.',
    url: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: '/og-noida.jpg',
        width: 1200,
        height: 630,
        alt: 'Best NEET Coaching in Noida - Cerebrum Biology Academy',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best NEET Coaching in Noida | Cerebrum Biology Academy',
    description:
      'Top NEET biology coaching in Noida. 98% success rate. All sectors covered - Sector 18, 62, 137, 150, Greater Noida West.',
    images: ['/og-noida.jpg'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/neet-coaching-noida',
  },
}

export default function NoidaCoachingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
