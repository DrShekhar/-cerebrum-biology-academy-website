import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Manila, Philippines - 98% Success Rate',
  description: "NEET Coaching in Manila - Philippines' premier medical entrance hub with International School Manila partnerships and business community support.",
  keywords: [
    'NEET coaching Manila',
    'medical entrance exam preparation',
    'Dr. Shekhar C Singh',
    'best NEET institute'
  ],
  openGraph: {
    title: 'NEET Coaching in Manila, Philippines - 98% Success Rate',
    description: "NEET Coaching in Manila - Philippines' premier medical entrance hub with International School Manila partnerships and business community support.",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Manila, Philippines',
    description: "NEET Coaching in Manila - Philippines' premier medical entrance hub with International School Manila partnerships and business community support."
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

export default function ManilaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
