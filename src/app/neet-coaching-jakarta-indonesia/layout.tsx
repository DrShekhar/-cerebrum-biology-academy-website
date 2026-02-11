import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Jakarta, Indonesia - 98% Success Rate',
  description: 'NEET Coaching in Jakarta - Asia's emerging Indian expat hub with Gandhi Memorial School partnerships and IB curriculum bridge.',
  keywords: [
    'NEET coaching Jakarta',
    'medical entrance exam preparation',
    'Dr. Shekhar C Singh',
    'best NEET institute'
  ],
  openGraph: {
    title: 'NEET Coaching in Jakarta, Indonesia - 98% Success Rate',
    description: 'NEET Coaching in Jakarta - Asia's emerging Indian expat hub with Gandhi Memorial School partnerships and IB curriculum bridge.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Jakarta, Indonesia',
    description: 'NEET Coaching in Jakarta - Asia's emerging Indian expat hub with Gandhi Memorial School partnerships and IB curriculum bridge.'
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
};

export default function JakartaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
