import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NTSE Online Classes | Online NTSE Coaching',
  description:
    'Best NTSE online classes with live interactive sessions. Online NTSE coaching for Stage 1 & 2 preparation. Expert faculty, recorded lectures, mock tests. Study from home across India!',
  keywords: [
    'ntse online classes',
    'online ntse coaching',
    'ntse preparation online',
    'ntse classes online',
    'ntse online coaching',
    'online classes for ntse',
    'ntse online course',
    'ntse sat mat online classes',
    'ntse stage 1 online coaching',
    'ntse stage 2 online classes',
  ],
  openGraph: {
    title: 'NTSE Online Classes | Live Online NTSE Coaching',
    description:
      'Expert NTSE online classes with live sessions, recorded lectures, and mock tests. Comprehensive preparation for Stage 1 & 2. Study from anywhere in India.',
    url: 'https://cerebrumbiologyacademy.com/ntse-online-classes',
    siteName: 'Cerebrum Biology Academy',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'NTSE Online Classes',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NTSE Online Classes',
    description:
      'Live NTSE online coaching with expert faculty. Complete preparation for Stage 1 & 2 from home.',
    images: ['https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&h=630&fit=crop'],
  },
  alternates: {
    canonical: 'https://cerebrumbiologyacademy.com/ntse-online-classes',
  },
}

export default function NTSEOnlineClassesLayout({ children }: { children: React.ReactNode }) {
  return children
}
