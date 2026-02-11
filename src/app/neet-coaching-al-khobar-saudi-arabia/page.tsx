import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Khobar, Saudi Arabia | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Al Khobar, Saudi Arabia. Al Khobar, a major hub in Saudi Arabia's Eastern Province, is home to numerous international schools serving ARAMCO families and business professionals. 98% success rate. Enroll today!',
};

export default function Page() {
  return <PageContent />;
}
