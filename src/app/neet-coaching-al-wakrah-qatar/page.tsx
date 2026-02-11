import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Al Wakrah, Qatar | Cerebrum Biology Academy',
  description: "Expert NEET coaching in Al Wakrah, Qatar. Al Wakrah, Qatar's growing satellite city south of Doha, offers modern educational infrastructure and competitive NEET coaching options. 98% success rate. Enroll today!",
};

export default function Page() {
  return <PageContent />;
}
