import { Metadata } from 'next';
import NEETCoachingPageContent from './neet-coaching-jakarta-indonesia/PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Jakarta, Indonesia - 98% Success Rate | Cerebrum Academy',
  description: "NEET Coaching in Jakarta - Asia's emerging Indian expat hub with Gandhi Memorial School partnerships and IB curriculum bridge.",
  keywords: [
    'NEET coaching in Jakarta',
    'medical entrance exam preparation Jakarta',
    'Dr. Shekhar C Singh Jakarta',
    'best NEET institute Jakarta',
    'NEET online coaching Indonesia'
  ],
  openGraph: {
    title: 'NEET Coaching in Jakarta, Indonesia - 98% Success Rate | Cerebrum Academy',
    description: "NEET Coaching in Jakarta - Asia's emerging Indian expat hub with Gandhi Memorial School partnerships and IB curriculum bridge.",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Jakarta, Indonesia',
    description: "NEET Coaching in Jakarta - Asia's emerging Indian expat hub with Gandhi Memorial School partnerships and IB curriculum bridge."
  }
};

export default function JakartaNEETCoachingPage() {
  return <NEETCoachingPageContent />;
}
