import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Biology Teacher Online | Best Online Biology Teacher - Cerebrum Biology Academy',
  description:
    "Learn from India's best biology teacher online. AIIMS-trained Dr. Shekhar with 15+ years experience, 67+ AIIMS selections. Live interactive classes, personalized mentoring. Join 1,50,000+ students!",
  keywords: [
    'best biology teacher online',
    'best online biology teacher',
    'best online teacher for biology',
    'top biology teacher online',
    'online biology faculty',
    'biology expert online',
    'AIIMS biology teacher',
    'best biology mentor online',
    'online biology coaching teacher',
  ],
  openGraph: {
    title: 'Best Biology Teacher Online - AIIMS Faculty | Cerebrum',
    description:
      "Learn from India's best online biology teacher. AIIMS-trained, 15+ years experience, 67+ AIIMS selections. Book your free demo today!",
    url: 'https://cerebrumbiologyacademy.com/best-biology-teacher-online',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Best Biology Teacher Online',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Biology Teacher Online | Cerebrum Biology Academy',
    description: 'AIIMS-trained biology teacher with 15+ years experience. 67+ AIIMS selections.',
    images: ['https://images.unsplash.com/photo-1544717305-2782549b5136?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-biology-teacher-online',
  },
}

export default function BestBiologyTeacherOnlineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
