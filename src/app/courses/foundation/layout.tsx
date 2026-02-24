import { Metadata } from 'next'

export const metadata: Metadata = {
  title:
    'Online Biology Tuition for Class 9, 10, 11 & 12 | NEET Biology Coaching | Cerebrum Biology Academy',
  description:
    'Online Biology tuition for Class 9-12 and NEET with AIIMS-trained faculty. Live classes, NCERT coaching, chapter-wise preparation. Book a free demo today!',
  keywords: [
    'online biology tutor',
    'online biology tuition',
    'online biology classes',
    'biology tutor for class 11',
    'biology tutor for class 12',
    'NEET biology coaching',
    'NEET biology tutor online',
    'online biology classes for NEET',
    'NCERT biology for NEET',
    'class 11 biology tuition',
    'class 12 biology tuition',
    'best biology tutor for NEET',
    'online NEET coaching',
    'biology coaching for NEET 2026',
    'NEET biology syllabus 2026',
    'human physiology NEET',
    'genetics NEET preparation',
    'plant physiology NEET',
    'biology foundation course',
    'class 9 biology tuition',
    'class 10 biology tuition',
    'online biology teacher',
    'NEET biology mock test',
    'NEET biology PYQ',
    'Cerebrum Biology Academy',
    'biology classes in Delhi',
    'biology tuition in Delhi NCR',
    'biology coaching in Gurugram',
    'NEET coaching Delhi',
    'biology tutor Gurugram',
    'offline biology classes Delhi',
    'biology institute Delhi NCR',
    'NEET biology coaching Gurugram',
    'biology coaching near me Delhi',
    'best biology tutor in Delhi',
  ],
  openGraph: {
    title: 'Online Biology Tuition for Class 9-12 | NEET Biology Coaching',
    description:
      'Expert online Biology tutor for NEET 2026 preparation. Live online Biology classes for Class 9, 10, 11 & 12 students with AIIMS-trained faculty.',
    url: 'https://cerebrumbiologyacademy.com/courses/foundation',
    siteName: 'Cerebrum Biology Academy',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Biology Tuition for NEET',
    description:
      'Best online Biology tutor for Class 9-12 NEET aspirants. Expert NCERT Biology coaching with live classes.',
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/courses/foundation',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function FoundationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
