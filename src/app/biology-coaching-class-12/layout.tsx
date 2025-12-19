import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Best Biology Coaching for Class 12 | NEET Preparation | Online & Offline | Cerebrum Academy',
  description:
    'Top Class 12 biology coaching for NEET 2026. Expert AIIMS faculty, complete NCERT + advanced NEET prep. Genetics, Reproduction, Ecology, Biotechnology. 98% success rate. Book free demo!',
  keywords:
    'biology coaching class 12, class 12 biology tuition, NEET biology class 12, class 12 NCERT biology, biology tutor class 12, class 12 biology online, biology coaching for NEET class 12, class 12 genetics coaching, class 12 ecology tuition, biology classes for 12th, 12th biology coaching near me, online biology class 12, class 12 reproduction chapter',
  openGraph: {
    title: 'Best Class 12 Biology Coaching | NEET Preparation | Cerebrum Academy',
    description:
      'Expert Class 12 biology coaching for NEET. AIIMS faculty, complete NCERT + advanced NEET preparation. Book free demo!',
    url: 'https://cerebrumbiologyacademy.com/biology-coaching-class-12',
    siteName: 'Cerebrum Biology Academy',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Class 12 Biology Coaching | Cerebrum Biology Academy',
    description: 'Top Class 12 biology coaching for NEET. AIIMS faculty, 98% success rate.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/biology-coaching-class-12',
  },
}

export default function BiologyClass12Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
