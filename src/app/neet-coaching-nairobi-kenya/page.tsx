import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Nairobi, Kenya | Cerebrum Biology Academy',
  description: "Expert NEET coaching in Nairobi, Kenya. Nairobi, Kenya's vibrant capital, hosts the largest Indian community in East Africa with over 50,000 residents, making it a major hub for NEET coaching. 98% success rate. Enroll today!",
};

export default function Page() {
  return <PageContent />;
}
