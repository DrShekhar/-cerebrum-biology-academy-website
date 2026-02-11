import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Ho Chi Minh City, Vietnam - 98% Success Rate',
  description: "NEET Coaching in Ho Chi Minh City - Vietnam's emerging medical entrance destination with international school partnerships.",
  keywords: [
    'NEET coaching Ho Chi Minh City',
    'medical entrance exam preparation',
    'Dr. Shekhar C Singh',
    'best NEET institute'
  ],
  openGraph: {
    title: 'NEET Coaching in Ho Chi Minh City, Vietnam - 98% Success Rate',
    description: "NEET Coaching in Ho Chi Minh City - Vietnam's emerging medical entrance destination with international school partnerships.",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Ho Chi Minh City, Vietnam',
    description: "NEET Coaching in Ho Chi Minh City - Vietnam's emerging medical entrance destination with international school partnerships."
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

export default function HoChiMinhCityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
