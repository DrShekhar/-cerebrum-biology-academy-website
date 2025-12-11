import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A-Level Biology Tutor | Cambridge, Edexcel & AQA Expert | 92% A*/A Rate',
  description:
    'Expert A-Level Biology tutoring for Cambridge (9700), Edexcel (IAL), AQA & OCR. 92% A*/A rate, 400+ students. AS & A2 Level preparation, past papers, university guidance.',
  keywords: [
    'a level biology tutor',
    'alevel biology tutor',
    'a-level biology tutoring',
    'cambridge a level biology',
    'edexcel a level biology',
    'aqa a level biology',
    'ocr a level biology',
    'as level biology tutor',
    'a2 level biology tutor',
    'international a level biology',
    'a level biology past papers',
    'a level biology online tutor',
  ],
  openGraph: {
    title: 'A-Level Biology Tutor | Cambridge, Edexcel & AQA Expert | 92% A*/A Rate',
    description:
      'Expert A-Level Biology tutoring for all exam boards. 92% A*/A rate, 400+ students. AS & A2 Level, past papers, university preparation.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cerebrumbiologyacademy.com/a-level-biology-tutor',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-Level Biology Tutor | 92% A*/A Rate',
    description:
      'Expert A-Level Biology tutoring for Cambridge, Edexcel, AQA & OCR. 400+ students achieving top grades.',
  },
  alternates: {
    canonical: 'https://www.cerebrumbiologyacademy.com/a-level-biology-tutor',
  },
}

export default function ALevelBiologyTutorLayout({ children }: { children: React.ReactNode }) {
  return children
}
