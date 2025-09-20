import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mobile App - Study NEET Biology Anywhere | Cerebrum Biology Academy',
  description:
    'Download our mobile app for NEET Biology preparation. Study anywhere, anytime with offline content, practice tests, and AI-powered doubt solving.',
  keywords: [
    'NEET Biology mobile app',
    'biology app download',
    'mobile learning app',
    'NEET preparation app',
    'offline biology study',
  ],
}

export default function MobileAppPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Mobile App</h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Mobile app details and download page coming soon...
        </p>
      </div>
    </div>
  )
}
