import { Metadata } from 'next';
import PageContent from './PageContent';

export const metadata: Metadata = {
  title: 'NEET Coaching in Dar es Salaam, Tanzania',
  description: "Expert NEET coaching in Dar es Salaam, Tanzania. Dar es Salaam, Tanzania's largest city and former capital, has a historic and thriving Indian community, particularly in the Kariyakoo market area. 98% success rate. Enroll today!",
};

export default function Page() {
  return <PageContent />;
}
