import { ComingSoonPage } from '@/components/ui/ComingSoonPage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare Courses - Coming Soon | Cerebrum Biology Academy',
  description:
    'Compare different NEET Biology courses and choose the best fit for your preparation.',
}

export default function CourseComparePage() {
  return (
    <ComingSoonPage
      title="Course Comparison"
      description="Our course comparison tool will help you compare different programs side-by-side to find the perfect fit for your NEET preparation needs. Coming soon."
    />
  )
}
