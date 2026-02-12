'use client'

import Link from 'next/link'
import { Link2, ArrowLeft } from 'lucide-react'

export default function CreateReferralLinkPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <Link2 className="w-16 h-16 text-teal-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Referral Link</h1>
        <p className="text-gray-600 mb-6">
          Referral link creation tool is coming soon.
        </p>
        <Link
          href="/consultant/dashboard"
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}
