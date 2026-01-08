import { Metadata } from 'next'
import { getBoardBySlug } from '@/lib/onlineClasses/boardData'

const board = getBoardBySlug('icse')!

export const metadata: Metadata = {
  title: board.metaTitle,
  description: board.metaDescription,
  keywords: [
    'online biology classes ICSE',
    'ICSE biology NEET preparation',
    'ICSE to NCERT bridge course',
    'ISC biology online classes',
    'NEET coaching for ICSE students',
    'ICSE biology tutor online',
    'Selina to NCERT mapping',
    'ICSE NEET gap syllabus',
  ],
  openGraph: {
    title: board.metaTitle,
    description: board.metaDescription,
    url: 'https://cerebrumbiologyacademy.com/online-biology-classes-icse',
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
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-classes-icse',
  },
}

export default function ICSELayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
