import { Metadata } from 'next';
import NEETCoachingPageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Brampton, Canada - 98% Success Rate',
  description: "NEET Coaching in Brampton - Canada's premier medical entrance prep in the largest Indian community with Ontario curriculum bridge.",
  keywords: [
    'NEET coaching in Brampton',
    'medical entrance exam preparation Brampton',
    'Dr. Shekhar C Singh Brampton',
    'best NEET institute Brampton',
    'NEET online coaching Canada'
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
  }
};

export default function BramptonNEETCoachingPage() {
  return <NEETCoachingPageContent />;
}
