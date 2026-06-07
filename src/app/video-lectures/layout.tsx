import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Video Lectures | Class 11 + 12 | Cerebrum Biology Academy',
  description:
    'Full NEET Biology video lecture library — Class 11 (22 chapters, 5 units) + Class 12 (16 chapters, 5 units). NCERT line-by-line explanations, animated diagrams, MCQ walkthroughs, chapter-end summaries. AIIMS-trained Dr. Shekhar C Singh and faculty.',
  keywords: [
    'NEET biology video lectures',
    'NEET biology video Class 11',
    'NEET biology video Class 12',
    'NCERT biology video lectures',
    'AIIMS faculty video lectures',
    'free NEET biology videos',
    'biology animation videos NEET',
    'Cerebrum video lectures',
    'NEET biology online videos',
  ].join(', '),
  alternates: { canonical: 'https://cerebrumbiologyacademy.com/video-lectures' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'NEET Biology Video Lectures | Cerebrum',
    description: 'Class 11+12 NCERT line-by-line video lectures with animations and MCQ walkthroughs.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://cerebrumbiologyacademy.com/video-lectures',
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'NEET Biology Video Lectures | Cerebrum',
    description: 'All 38 chapters NCERT line-by-line with animations.',
  },
}

export default function VideoLecturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
