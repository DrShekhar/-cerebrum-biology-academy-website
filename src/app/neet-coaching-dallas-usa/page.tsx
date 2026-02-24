import { Metadata } from 'next';
import NEETCoachingPageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Dallas, USA - 98% Success Rate',
  description: "NEET Coaching in Dallas - Growing Indian tech hub's premier medical entrance prep with Texas CBSE school partnerships.",
  keywords: [
    'NEET coaching in Dallas',
    'medical entrance exam preparation Dallas',
    'Dr. Shekhar C Singh Dallas',
    'best NEET institute Dallas',
    'NEET online coaching USA'
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
  }
};

export default function DallasNEETCoachingPage() {
  return <NEETCoachingPageContent />;
}
