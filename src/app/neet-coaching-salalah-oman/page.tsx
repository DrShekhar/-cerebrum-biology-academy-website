import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Salalah, Oman | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Salalah, Oman. Salalah, Oman's second-largest city, offers a unique educational experience with personalized coaching and a growing Indian community. 98% success rate. Enroll today!',
};

export default function Page() {
  return <PageContent />;
}
