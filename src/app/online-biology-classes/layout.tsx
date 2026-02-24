import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Biology Classes | Learn Biology Online',
  description:
    'Join the best online biology classes for Class 9-12. Learn biology online with AIIMS-trained faculty, live interactive sessions, recorded lectures & NEET preparation. 1,50,000+ students, 98% success rate.',
  keywords: [
    'online biology classes',
    'online biology classes for class 11',
    'learn biology online',
    'biology online classes',
    'online biology course',
    'biology classes online india',
    'best online biology classes',
    'online biology tuition',
    'biology video lectures',
    'NEET biology online',
  ],
  openGraph: {
    title: "Online Biology Classes - Learn from India's Best Faculty",
    description:
      'Join 1,50,000+ students learning biology online. Live classes, 500+ video hours, AIIMS faculty, NEET preparation. Start your free demo today!',
    url: 'https://cerebrumbiologyacademy.com/online-biology-classes',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Online Biology Classes - Student Learning',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online Biology Classes',
    description:
      'Learn biology online with AIIMS faculty. Live classes, video lectures, NEET preparation.',
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/online-biology-classes',
  },
}

export default function OnlineBiologyClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
