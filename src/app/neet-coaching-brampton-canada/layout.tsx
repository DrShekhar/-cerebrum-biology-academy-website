import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NEET Coaching in Brampton, Canada - 98% Success Rate',
  description: "NEET Coaching in Brampton - Canada's premier medical entrance prep in the largest Indian community with Ontario curriculum bridge.",
  keywords: [
    'NEET coaching Brampton',
    'medical entrance exam preparation',
    'Dr. Shekhar C Singh',
    'best NEET institute'
  ],
  openGraph: {
    title: 'NEET Coaching in Brampton, Canada - 98% Success Rate',
    description: "NEET Coaching in Brampton - Canada's premier medical entrance prep in the largest Indian community with Ontario curriculum bridge.",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Brampton, Canada',
    description: "NEET Coaching in Brampton - Canada's premier medical entrance prep in the largest Indian community with Ontario curriculum bridge."
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

export default function BramptonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
