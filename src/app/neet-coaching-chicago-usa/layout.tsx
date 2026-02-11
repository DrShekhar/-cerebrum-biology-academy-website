import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Chicago, USA - 98% Success Rate',
  description: 'NEET Coaching in Chicago - Leading medical entrance exam preparation in Illinois with expert guidance from Dr. Shekhar C Singh.',
  keywords: [
    'NEET coaching Chicago',
    'medical entrance exam preparation',
    'Dr. Shekhar C Singh',
    'best NEET institute'
  ],
  openGraph: {
    title: 'NEET Coaching in Chicago, USA - 98% Success Rate',
    description: 'NEET Coaching in Chicago - Leading medical entrance exam preparation in Illinois with expert guidance from Dr. Shekhar C Singh.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Chicago, USA',
    description: 'NEET Coaching in Chicago - Leading medical entrance exam preparation in Illinois with expert guidance from Dr. Shekhar C Singh.'
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

export default function ChicagoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
