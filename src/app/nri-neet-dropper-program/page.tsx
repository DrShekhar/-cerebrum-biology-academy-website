import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: "NRI NEET Dropper Program - Focused Repeater Coaching",
  description: "Specialized dropper program for NRI students who scored 300-550 in NEET and need 600+ for NRI quota. 10-12 months intensive coaching.",
  keywords: "NRI NEET dropper program, NEET repeater coaching, NRI dropper program, NEET improvement program",
  path: "/nri-neet-dropper-program"
});

export default function Page() {
  return <PageContent />;
}
