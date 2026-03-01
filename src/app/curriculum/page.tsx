import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NEET Biology Curriculum Details - Complete Syllabus',
  description:
    'Detailed curriculum and syllabus for all our NEET Biology courses. Chapter-wise breakdown, learning objectives, and study materials.',
  keywords: [
    'NEET Biology curriculum',
    'Biology syllabus',
    'NEET course content',
    'chapter wise syllabus',
    'biology study plan',
  ],
  robots: { index: false, follow: true },
}

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Detailed Curriculum</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Complete curriculum details page coming soon...
        </p>
      </div>
    </div>
  )
}
