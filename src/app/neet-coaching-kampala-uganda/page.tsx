import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Kampala, Uganda | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Kampala, Uganda. Kampala, Uganda's capital, is home to a historic Indian community with strong educational institutions and business presence. 98% success rate. Enroll today!',
};

export default function Page() {
  return <PageContent />;
}
