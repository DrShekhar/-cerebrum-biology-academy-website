import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best Biology Coaching for Class 11 | NEET Foundation | Online & Offline | Cerebrum Academy',
  description:
    'Top Class 11 biology coaching for NEET preparation. Expert AIIMS faculty, comprehensive NCERT coverage. Botany, Zoology, Cell Biology. 98% success rate. Ghaziabad, Noida, Faridabad, Delhi NCR. Book free demo!',
  keywords:
    'biology coaching class 11, class 11 biology tuition, NEET biology class 11, class 11 NCERT biology, biology tutor class 11, class 11 biology online, biology coaching for NEET class 11, class 11 botany coaching, class 11 zoology tuition, biology classes for 11th, 11th biology coaching near me, online biology class 11',
  openGraph: {
    title: 'Best Class 11 Biology Coaching | NEET Foundation | Cerebrum Academy',
    description:
      'Expert Class 11 biology coaching for NEET. AIIMS faculty, complete NCERT + NEET level preparation. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-class-11',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Class 11 Biology Coaching | Cerebrum Biology Academy',
    description: 'Top Class 11 biology coaching for NEET. AIIMS faculty, 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-class-11',
  },
}

export default function BiologyClass11Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
