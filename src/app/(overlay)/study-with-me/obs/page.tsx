import { Metadata } from 'next'
import { StudyWithMePage } from '@/components/study-with-me/StudyWithMePage'

export const metadata: Metadata = {
  title: 'Study With Me OBS Overlay | Cerebrum Biology Academy',
  description:
    'OBS streaming overlay for NEET Biology study sessions. Clean 1920x1080 layout with timer and student count.',
  robots: 'noindex, nofollow',
}

interface PageProps {
  searchParams: Promise<{
    bg?: string
  }>
}

export default async function OBSPage({ searchParams }: PageProps) {
  const params = await searchParams

  // Check for transparent background option
  const transparentBg = params.bg === 'transparent'

  return <StudyWithMePage mode="obs" transparentBg={transparentBg} />
}
