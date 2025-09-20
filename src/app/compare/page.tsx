import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Compare NEET Biology Courses - Side by Side | Cerebrum Biology Academy',
  description:
    'Compare our NEET Biology courses side by side. Features, pricing, success rates, and curriculum details to help you choose the perfect program.',
  keywords: [
    'NEET course comparison',
    'compare biology courses',
    'course features comparison',
    'NEET program comparison',
    'coaching comparison',
  ],
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Compare All Courses</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Detailed comparison page coming soon...
        </p>
      </div>
    </div>
  )
}
