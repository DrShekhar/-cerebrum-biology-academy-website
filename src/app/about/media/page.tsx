import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media Coverage & Press - Cerebrum Biology Academy',
  description:
    'Read about Cerebrum Biology Academy in the news. Media coverage, press releases, and recognition in education sector.',
  keywords: [
    'media coverage',
    'press releases',
    'news articles',
    'education news',
    'coaching institute news',
  ],
}

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Media Coverage</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Media coverage and press page coming soon...
        </p>
      </div>
    </div>
  )
}
