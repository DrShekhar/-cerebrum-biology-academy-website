import { Metadata } from 'next';
import NEETCoachingPageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Manila, Philippines - 98% Success Rate | Cerebrum Academy',
  description: "NEET Coaching in Manila - Philippines' premier medical entrance hub with International School Manila partnerships and business community support.",
  keywords: [
    'NEET coaching in Manila',
    'medical entrance exam preparation Manila',
    'Dr. Shekhar C Singh Manila',
    'best NEET institute Manila',
    'NEET online coaching Philippines'
  ],
  openGraph: {
    title: 'NEET Coaching in Manila, Philippines - 98% Success Rate | Cerebrum Academy',
    description: "NEET Coaching in Manila - Philippines' premier medical entrance hub with International School Manila partnerships and business community support.",
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEET Coaching in Manila, Philippines',
    description: "NEET Coaching in Manila - Philippines' premier medical entrance hub with International School Manila partnerships and business community support."
  }
};

export default function ManilaNEETCoachingPage() {
  return <NEETCoachingPageContent />;
}
