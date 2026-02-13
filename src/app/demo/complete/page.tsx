'use client'

import Link from 'next/link'
import { trackAndOpenWhatsApp } from '@/lib/whatsapp/tracking'

export default function DemoCompletePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div
        className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl animate-fadeInUp"
      >
        <div
          className="mb-6 text-7xl animate-fadeInUp"
        >
          🎉
        </div>

        <h1 className="mb-4 text-3xl font-bold text-gray-900">Demo Class Completed!</h1>

        <p className="mb-6 text-lg text-gray-600">
          Thank you for attending the NEET Biology demo class with Cerebrum Biology Academy. We hope
          you found it valuable!
        </p>

        {/* Feedback Section */}
        <div className="mb-8 rounded-xl bg-gray-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">How was your experience?</h2>
          <div className="flex justify-center gap-4">
            {['😐', '🙂', '😊', '🤩'].map((emoji, index) => (
              <button
                key={index}
                className="text-4xl transition hover:opacity-80 animate-fadeInUp"
                onClick={() => {
                  // TODO: Track feedback
                  alert(`Thank you for your feedback! Rating: ${index + 1}/4`)
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8 space-y-4">
          <h3 className="font-semibold text-gray-800">Ready to start your NEET journey?</h3>

          <div className="grid gap-3">
            <Link
              href="/courses/neet-complete"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 sm:px-6 py-3 font-semibold text-white transition hover:bg-blue-700 min-h-[48px] text-sm sm:text-base"
            >
              <span>🚀</span> <span className="truncate">Explore Our Courses</span>
            </Link>

            <button
              onClick={async () => {
                await trackAndOpenWhatsApp({
                  source: 'demo-complete-page',
                  message:
                    'Hi! I just attended a demo class and want to know more about enrollment.',
                  campaign: 'demo-complete',
                })
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 sm:px-6 py-3 font-semibold text-white transition hover:bg-green-700 min-h-[48px] text-sm sm:text-base cursor-pointer"
            >
              <span>📱</span> <span className="truncate">Chat with Us on WhatsApp</span>
            </button>

            <Link
              href="/demo"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-200 px-4 sm:px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 min-h-[48px] text-sm sm:text-base"
            >
              <span>📅</span> <span className="truncate">Book Another Demo</span>
            </Link>
          </div>
        </div>

        {/* Special Offer */}
        <div
          className="rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 p-6 animate-fadeInUp"
        >
          <p className="mb-2 text-sm font-medium text-yellow-800">🎁 DEMO ATTENDEE SPECIAL</p>
          <p className="text-xl font-bold text-yellow-900">Get 15% OFF on Course Enrollment</p>
          <p className="mt-1 text-sm text-yellow-700">Valid for 48 hours • Use code: DEMO15</p>
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">Questions about enrollment?</p>
          <p className="mt-1 font-medium text-gray-700">
            📞 +91 88264 44334 • 📧 info@cerebrumbiologyacademy.com
          </p>
        </div>
      </div>
    </div>
  )
}
