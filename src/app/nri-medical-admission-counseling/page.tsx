import { Metadata } from 'next';
import { PageContent } from './PageContent';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: "NRI Medical Admission Guide - 15% NRI Quota Counseling",
  description: "Comprehensive counseling for NRI families navigating Indian medical admissions.",
  keywords: "NRI medical admission counseling, NRI quota medical colleges, Indian medical admission",
  path: "/nri-medical-admission-counseling"
});

export default function Page() {
  return <PageContent />;
}
