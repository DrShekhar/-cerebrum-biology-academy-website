import { Metadata } from 'next'
import { StudyWithMePage } from '@/components/study-with-me/StudyWithMePage'
import type { DisplayMode } from '@/lib/study-with-me/types'

export const metadata: Metadata = {
  title: 'Study With Me',
  description:
    'Join our live NEET Biology study session. Focus timer, Pomodoro technique, ambient music, and motivational quotes to boost your preparation.',
  keywords: ['NEET Biology', 'Study With Me', 'Pomodoro', 'Focus Timer', 'NEET Preparation'],
  openGraph: {
    title: 'Study With Me',
    description: 'Join our live NEET Biology study session with Pomodoro timer and focus tools.',
    type: 'website',
  },
}

interface PageProps {
  searchParams: Promise<{
    mode?: string
    bg?: string
  }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams

  // Determine display mode from query parameter
  const mode: DisplayMode = params.mode === 'obs' ? 'obs' : 'web'

  // Check for transparent background option (OBS mode)
  const transparentBg = params.bg === 'transparent'

  return <StudyWithMePage mode={mode} transparentBg={transparentBg} />
}
