import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: "NRI NEET Dropper Program 2026 | Second-Attempt Biology Coaching for Overseas Indian Students | Cerebrum",
  description: "Dedicated 10-12 month NEET 2026 dropper Biology programme for NRI students in UAE, USA, UK, Canada, Singapore, Saudi, Qatar, Africa. Diagnostic-led gap-fill, AIIMS faculty, weekly 1:1 doubt slots, NRI-quota cut-off targeting (330-355/360 for AIIMS Delhi, JIPMER, Manipal, KMC, JSS Mysuru). 89% repeater qualify rate.",
  keywords: "NRI NEET dropper program, NEET repeater coaching NRI, NRI dropper program 2026, NEET improvement program overseas, NRI NEET second attempt, NRI NEET retake biology, dropper biology coaching abroad, NEET 2026 dropper Dubai, NEET 2026 dropper Singapore, NRI gap year NEET, NRI medical college 2nd attempt, NRI quota cut-off NEET",
  path: "/nri-neet-dropper-program"
});

export default function Page() {
  return <PageContent />;
}
