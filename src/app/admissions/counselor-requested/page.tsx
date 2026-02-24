import { CheckCircle2, Phone, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Counselor Request Received',
  robots: { index: false, follow: false },
}

export default function CounselorRequestedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Counselor Request Received!
        </h1>
        <p className="text-slate-600 mb-6">
          Our admission counselor will contact you shortly to help you with the enrollment
          process and answer any questions you may have.
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-blue-700 font-medium mb-2">
            <Clock className="w-5 h-5" />
            Expected Response Time
          </div>
          <p className="text-blue-600 text-sm">
            Within 2 hours during business hours (9 AM - 7 PM IST)
          </p>
        </div>

        <div className="space-y-3">
          <a
            href="tel:+918826444334"
            className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call Now: +91 88264 44334
          </a>

          <Link
            href="/courses"
            className="flex items-center justify-center gap-2 w-full border border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Browse Courses
          </Link>

          <Link
            href="/"
            className="block text-sm text-slate-500 hover:text-slate-700 mt-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
