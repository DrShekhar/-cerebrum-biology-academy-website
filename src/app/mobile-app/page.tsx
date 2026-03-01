import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mobile App - Study NEET Biology Anywhere',
  description:
    'Download our mobile app for NEET Biology preparation. Study anywhere, anytime with offline content, practice tests, and AI-powered doubt solving.',
  keywords: [
    'NEET Biology mobile app',
    'biology app download',
    'mobile learning app',
    'NEET preparation app',
    'offline biology study',
  ],
  robots: { index: false, follow: true },
}

export default function MobileAppPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Mobile App</h1>
        <p className="text-xl text-gray-600 mb-8">
          The Cerebrum Biology Academy mobile app is currently in development. In the meantime,
          access all your study materials through our web platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#4a5d4a] text-white font-semibold hover:bg-[#3d4d3d] transition-colors"
          >
            Browse Courses
          </Link>
          <Link
            href="/demo-booking"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-colors"
          >
            Book a Free Demo
          </Link>
        </div>
      </div>
    </div>
  )
}
