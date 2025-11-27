'use client'

import Link from 'next/link'
import { Clock, Bell, ArrowLeft, Home } from 'lucide-react'

interface ComingSoonPageProps {
  title?: string
  description?: string
  expectedDate?: string
}

export function ComingSoonPage({
  title = 'Coming Soon',
  description = 'We are working hard to bring you this feature. Stay tuned for updates!',
  expectedDate,
}: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Clock className="w-10 h-10 text-blue-600" />
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600">{description}</p>
            {expectedDate && (
              <p className="text-sm text-blue-600 font-medium">Expected: {expectedDate}</p>
            )}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-blue-800 justify-center">
              <Bell className="w-4 h-4" />
              <span className="text-sm font-medium">Want to be notified when this launches?</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">Contact us to get early access</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => typeof window !== 'undefined' && window.history.back()}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Have questions?{' '}
          <Link href="/contact" className="text-blue-600 hover:underline">
            Get in touch
          </Link>
        </p>
      </div>
    </div>
  )
}
