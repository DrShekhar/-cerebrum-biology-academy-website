import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cerebrum Biology Academy',
  description: 'NEET Biology Coaching',
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Cerebrum Biology Academy
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-lg mx-auto">
            Expert NEET Biology Preparation with proven results
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View Courses
            </a>
            <a
              href="/contact"
              className="bg-white text-gray-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-md border border-gray-200 hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
