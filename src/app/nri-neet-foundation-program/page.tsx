import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: "NRI NEET Foundation Class 9-10 - Early Preparation Program",
  description: "Early preparation program for Class 9-10 NRI students planning for NEET. Build strong biological concepts.",
  keywords: "NRI NEET foundation program, Class 9 10 NEET preparation, NEET early preparation",
  path: "/nri-neet-foundation-program"
});

export default function Page() {
  return <PageContent />;
}
