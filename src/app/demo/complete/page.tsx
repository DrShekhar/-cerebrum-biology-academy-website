'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DemoCompletePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6 text-7xl"
        >
          🎉
        </motion.div>

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
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-4xl transition hover:opacity-80"
                onClick={() => {
                  // TODO: Track feedback
                  alert(`Thank you for your feedback! Rating: ${index + 1}/4`)
                }}
              >
                {emoji}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8 space-y-4">
          <h3 className="font-semibold text-gray-800">Ready to start your NEET journey?</h3>

          <div className="grid gap-3">
            <Link
              href="/courses/neet-biology-pinnacle"
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 sm:px-6 py-3 font-semibold text-white transition hover:bg-blue-700 min-h-[48px] text-sm sm:text-base"
            >
              <span>🚀</span> <span className="truncate">Explore Our Courses</span>
            </Link>

            <a
              href="https://wa.me/918826444334?text=Hi!%20I%20just%20attended%20a%20demo%20class%20and%20want%20to%20know%20more%20about%20enrollment."
              className="flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 sm:px-6 py-3 font-semibold text-white transition hover:bg-green-600 min-h-[48px] text-sm sm:text-base"
            >
              <span>📱</span> <span className="truncate">Chat with Us on WhatsApp</span>
            </a>

            <Link
              href="/demo"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-gray-200 px-4 sm:px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 min-h-[48px] text-sm sm:text-base"
            >
              <span>📅</span> <span className="truncate">Book Another Demo</span>
            </Link>
          </div>
        </div>

        {/* Special Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 p-6"
        >
          <p className="mb-2 text-sm font-medium text-yellow-800">🎁 DEMO ATTENDEE SPECIAL</p>
          <p className="text-xl font-bold text-yellow-900">Get 15% OFF on Course Enrollment</p>
          <p className="mt-1 text-sm text-yellow-700">Valid for 48 hours • Use code: DEMO15</p>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">Questions about enrollment?</p>
          <p className="mt-1 font-medium text-gray-700">
            📞 +91 88264 44334 • 📧 info@cerebrumbiologyacademy.com
          </p>
        </div>
      </motion.div>
    </div>
  )
}
