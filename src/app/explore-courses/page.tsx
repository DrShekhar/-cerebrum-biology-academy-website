import { Metadata } from 'next'
import { ExploratoryFlow } from '@/components/conversion/ExploratoryFlow'

export const metadata: Metadata = {
  title: 'Explore NEET Biology Courses - Compare & Choose | Cerebrum Biology Academy',
  description:
    'Take your time to explore our comprehensive NEET Biology courses. Compare features, read success stories, and book free counseling. 94.2% success rate, 247 AIIMS selections.',
  keywords: [
    'NEET Biology course exploration',
    'compare NEET courses',
    'NEET Biology course comparison',
    'detailed course information',
    'NEET success stories',
    'Biology coaching comparison',
    'course selection guide',
    'NEET preparation courses',
  ],
  openGraph: {
    title: 'Explore & Compare NEET Biology Courses',
    description:
      'Detailed exploration of our NEET Biology courses with comparisons, success stories, and free counseling. Make an informed decision for your medical career.',
    images: [
      {
        url: '/api/placeholder/1200/630',
        width: 1200,
        height: 630,
        alt: 'Course Exploration - Cerebrum Biology Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore & Compare NEET Biology Courses',
    description:
      'Detailed course exploration with success stories and expert counseling. 94.2% success rate.',
  },
}

export default function ExplorePage() {
  return (
    <div className="min-h-screen">
      <ExploratoryFlow />
    </div>
  )
}
