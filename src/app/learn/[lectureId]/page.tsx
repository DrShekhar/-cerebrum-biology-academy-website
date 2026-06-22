import type { Metadata } from 'next'
import LecturePlayerClient from './LecturePlayerClient'

// Enrolled-student video lecture player. Auth + enrollment are enforced
// server-side by /api/lms/videos; this route just hosts the player surface.
export const metadata: Metadata = {
  title: 'Lecture | Cerebrum Biology Academy',
  robots: 'noindex, nofollow',
}

export default async function LecturePage({
  params,
}: {
  params: Promise<{ lectureId: string }>
}) {
  const { lectureId } = await params
  return (
    <main className="min-h-screen bg-white">
      <LecturePlayerClient lectureId={lectureId} />
    </main>
  )
}
