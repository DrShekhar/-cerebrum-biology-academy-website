import { Metadata } from 'next'
import { getBoardBySlug } from '@/lib/onlineClasses/boardData'

const board = getBoardBySlug('cbse')!

export const metadata: Metadata = {
  title: board.metaTitle,
  description: board.metaDescription,
  keywords: [
    'online biology classes CBSE',
    'CBSE biology NEET preparation',
    'NCERT biology online classes',
    'Class 11 CBSE biology online',
    'Class 12 CBSE biology online',
    'NEET coaching for CBSE students',
    'CBSE biology tutor online',
    'NCERT line by line biology',
  ],
  openGraph: {
    title: board.metaTitle,
    description: board.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/online-biology-classes-cbse',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: board.metaTitle,
    description: board.metaDescription,
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-classes-cbse',
  },
}

export default function CBSELayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
