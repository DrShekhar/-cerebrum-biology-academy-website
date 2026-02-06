import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biology Notes for NEET 2026 | Chapter-wise Notes by AIIMS Faculty | Cerebrum',
  description:
    'Free NEET Biology notes for all 38 chapters. Chapter-wise notes with diagrams, mnemonics, PYQ analysis and PDF download. Written by Dr. Shekhar (AIIMS). Updated for NEET 2026 syllabus.',
  keywords:
    'biology notes for NEET, NEET biology notes, NEET biology notes PDF, chapter wise biology notes NEET, biology notes class 11 NEET, biology notes class 12 NEET, NCERT biology notes for NEET, NEET biology revision notes, free NEET biology notes',
  openGraph: {
    title: 'Biology Notes for NEET 2026 | Free Chapter-wise Notes',
    description:
      'Complete NEET Biology notes for all 38 chapters. Diagrams, mnemonics, PYQ analysis. Written by AIIMS faculty. Free PDF download.',
    url: 'https://cerebrumbiologyacademy.com/biology-notes-for-neet',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Biology Notes for NEET 2026 | Free Chapter-wise Notes',
    description:
      'Complete NEET Biology notes for all 38 chapters by AIIMS faculty. Free PDF download.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-notes-for-neet',
  },
}

export default function BiologyNotesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
