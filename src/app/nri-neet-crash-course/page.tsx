import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: "NRI NEET Crash Course - Last 3-6 Months Intensive Program",
  description: "Last-minute intensive 3-6 month program for NRI students before NEET. Focus on high-yield topics, daily mock tests, and NCERT revision.",
  keywords: "NRI NEET crash course, NEET last minute preparation, NRI NEET intensive program",
  path: "/nri-neet-crash-course"
});

export default function Page() {
  return <PageContent />;
}
