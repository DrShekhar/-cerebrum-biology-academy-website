import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in San Jose, USA - 98% Success Rate',
  description: "NEET Coaching in San Jose - Premium medical entrance prep in Silicon Valley's heart with highest Indian-American concentration.",
  keywords: [
    'NEET coaching San Jose',
    'medical entrance exam preparation',
    'Dr. Shekhar C Singh',
    'best NEET institute'
  ],
  openGraph: {
    title: 'NEET Coaching in San Jose, USA - 98% Success Rate',
    description: "NEET Coaching in San Jose - Premium medical entrance prep in Silicon Valley's heart with highest Indian-American concentration.",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in San Jose, USA',
    description: "NEET Coaching in San Jose - Premium medical entrance prep in Silicon Valley's heart with highest Indian-American concentration."
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

export default function SanJoseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
