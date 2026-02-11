import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Dallas, USA - 98% Success Rate',
  description: "NEET Coaching in Dallas - Growing Indian tech hub's premier medical entrance prep with Texas CBSE school partnerships.",
  keywords: [
    'NEET coaching Dallas',
    'medical entrance exam preparation',
    'Dr. Shekhar C Singh',
    'best NEET institute'
  ],
  openGraph: {
    title: 'NEET Coaching in Dallas, USA - 98% Success Rate',
    description: "NEET Coaching in Dallas - Growing Indian tech hub's premier medical entrance prep with Texas CBSE school partnerships.",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Dallas, USA',
    description: "NEET Coaching in Dallas - Growing Indian tech hub's premier medical entrance prep with Texas CBSE school partnerships."
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

export default function DallasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
