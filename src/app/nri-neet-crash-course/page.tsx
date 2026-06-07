import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: "NRI NEET Crash Course | 3-6 Month Biology Intensive for Overseas Indian Students | Cerebrum",
  description: "Intensive 3-6 month NEET Biology crash course for NRI students in UAE, USA, UK, Canada, Singapore, Saudi, Qatar, Oman. NCERT line-by-line revision, daily MCQ drills, weekly full-length mocks, high-yield Class 11+12 topics, NRI quota cut-off calibration for AIIMS / JIPMER / Manipal / KMC. AIIMS faculty, time-zone-aligned batches.",
  keywords: "NRI NEET crash course, NEET last minute preparation NRI, NRI NEET intensive program, NEET crash course Dubai, NEET crash course Singapore, NEET crash course UK, NEET crash course UAE, NRI biology revision course, NCERT revision NRI, NEET final 3 months overseas, last-minute NEET coaching abroad, NRI NEET fast track",
  path: "/nri-neet-crash-course"
});

export default function Page() {
  return <PageContent />;
}
