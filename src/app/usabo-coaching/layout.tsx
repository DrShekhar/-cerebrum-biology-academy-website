import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'USABO Coaching Online | USA Biology Olympiad Preparation - Cerebrum',
  description:
    'Expert USABO coaching for Open Exam, Semifinals & National Finals. 1:1 tutoring and small batch options with IBO-trained faculty. US timezone friendly scheduling. Book free consultation!',
  keywords: [
    'usabo coaching',
    'usa biology olympiad',
    'usabo tutoring online',
    'biology olympiad usa',
    'usabo preparation',
    'usabo open exam prep',
    'usabo semifinals coaching',
    'biology olympiad tutoring',
    'ibo preparation usa',
    'usabo online classes',
  ],
  openGraph: {
    title: 'USABO Coaching | USA Biology Olympiad Preparation - Cerebrum',
    description:
      'Prepare for USABO (Open → Semifinals → Finals → IBO) with expert coaching. 1:1 tutoring and small batch programs with flexible US timezone scheduling.',
    url: 'https://cerebrumbiologyacademy.com/usabo-coaching',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'USABO Coaching - USA Biology Olympiad Preparation',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USABO Coaching | USA Biology Olympiad Preparation',
    description:
      'Expert coaching for USA Biology Olympiad. Open Exam → Semifinals → Finals → IBO pathway.',
    images: ['https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/usabo-coaching',
  },
}

export default function USABOCoachingLayout({ children }: { children: React.ReactNode }) {
  return children
}
