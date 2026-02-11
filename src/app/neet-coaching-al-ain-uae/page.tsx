import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Ain, UAE | Cerebrum Biology Academy',
  description: 'Expert NEET coaching in Al Ain, UAE. Al Ain, the 'Garden City of the Gulf,' is a family-friendly destination in the UAE with excellent educational infrastructure and more affordable living costs than Abu Dhabi. 98% success rate. Enroll today!',
};

export default function Page() {
  return <PageContent />;
}
