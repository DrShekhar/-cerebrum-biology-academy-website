import { ComingSoonPage } from '@/components/ui/ComingSoonPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Course Finder - Coming Soon | Cerebrum Biology Academy',
  description: 'Find the perfect NEET Biology course based on your requirements and goals.',
}

export default function CourseFinderPage() {
  return (
    <ComingSoonPage
      title="Course Finder"
      description="Our intelligent course finder will recommend the best program based on your academic level, goals, and schedule preferences. This feature is under development."
    />
  )
}
