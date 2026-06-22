import type { Metadata } from 'next'
import GradebookClient from './GradebookClient'

export const metadata: Metadata = {
  title: 'Gradebook | Cerebrum Biology Academy',
  robots: 'noindex, nofollow',
}

export default function GradebookPage() {
  return (
    <main className="min-h-screen bg-white">
      <GradebookClient />
    </main>
  )
}
