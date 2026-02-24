import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best Biology Tuition for Class 9 & 10 | NEET Foundation | Early Preparation | Cerebrum Academy',
  description:
    'Top Class 9 & 10 biology tuition for early NEET foundation. Build strong basics, excel in boards. NCERT mastery, conceptual learning. Expert faculty. Delhi NCR. Book free demo!',
  keywords:
    'biology tuition class 9, biology tuition class 10, class 9 biology coaching, class 10 biology coaching, NEET foundation class 9, NEET foundation class 10, biology tutor class 9, biology tutor class 10, early NEET preparation, class 9 10 biology, biology classes for class 9, biology classes for class 10, CBSE biology tuition, foundation biology course',
  openGraph: {
    title: 'Best Class 9 & 10 Biology Tuition | NEET Foundation',
    description:
      'Early NEET foundation biology tuition for Class 9 & 10. Strong basics, board exam excellence. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-tuition-class-9-10',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Class 9 & 10 Biology Tuition',
    description: 'Foundation biology tuition for Class 9 & 10. Early NEET preparation.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-tuition-class-9-10',
  },
}

export default function BiologyClass910Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
