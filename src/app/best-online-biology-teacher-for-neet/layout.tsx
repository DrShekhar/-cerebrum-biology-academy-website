import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Best Online Biology Teacher for NEET 2025 [2500+ Selections] | Cerebrum',
  description:
    'Learn NEET Biology online from AIIMS-trained faculty. 2500+ selections, 98% success rate. Complete syllabus with PYQ analysis. Book FREE demo today!',
  keywords: [
    'best biology teacher for neet online',
    'best online biology teacher for neet',
    'best online teacher for neet biology',
    'neet biology teacher online',
    'online neet biology faculty',
    'top neet biology teacher',
    'biology expert for neet online',
    'neet biology coaching online',
  ],
  openGraph: {
    title: 'Best Online Biology Teacher for NEET | 2500+ Selections',
    description:
      'AIIMS-trained NEET biology teacher with 2500+ selections. 90 questions, 360 marks - master NEET Biology online.',
    url: 'https://cerebrumbiologyacademy.com/best-online-biology-teacher-for-neet',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Best Online Biology Teacher for NEET',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Online Biology Teacher for NEET | Cerebrum',
    description: '2500+ NEET selections. Master Biology (360 marks) with AIIMS faculty online.',
    images: ['https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/best-online-biology-teacher-for-neet',
  },
}

export default function BestOnlineBiologyTeacherNEETLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
