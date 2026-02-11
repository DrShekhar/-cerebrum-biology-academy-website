import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Accra, Ghana | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Accra, Ghana. Accra, Ghana's capital, hosts a growing Indian business diaspora and is establishing itself as a leading tech hub in West Africa. 98% success rate. Enroll today!',
};

export default function Page() {
  return <PageContent />;
}
