'use client'

import Link from 'next/link'
import {
  Globe,
  Home,
  Accessibility,
  Building2,
  IndianRupee,
  Search,
  ArrowRight,
  BookOpen,
} from 'lucide-react'

interface ExploreSectionProps {
  onCollegeSearchClick: () => void
}

export function QuotaExplanationSection() {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Understanding NEET Quotas
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">All India Quota (15%)</h3>
            <p className="text-sm text-gray-600">
              15% seats in government colleges are filled through MCC counselling. Open to students
              from any state. AIIMS, JIPMER & Central universities have 100% AIQ.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
              <Home className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">State Quota (85%)</h3>
            <p className="text-sm text-gray-600">
              85% seats reserved for state domicile holders. Counselling by respective state
              authorities. Cutoffs are generally more relaxed than AIQ.
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <Accessibility className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">PwD Reservation (5%)</h3>
            <p className="text-sm text-gray-600">
              5% horizontal reservation across all categories for candidates with 40%+ benchmark
              disability. Cutoffs are relaxed for PwD candidates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function DataSourceSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-xl bg-gray-50 p-8">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">About Our Data</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Data Source:</strong> AIQ cutoffs are based on NEET 2024 MCC counselling Round
              3 closing ranks. State quota cutoffs are estimated based on historical patterns.
            </p>
            <p>
              <strong>Coverage:</strong> 470+ medical colleges including all 20 AIIMS, JIPMER, ESIC,
              top government and private/deemed universities with both AIQ and State Quota data.
            </p>
            <p>
              <strong>PwD Data:</strong> PwD cutoffs are calculated based on 5% horizontal
              reservation policy across all categories.
            </p>
            <p>
              <strong>Disclaimer:</strong> This tool provides predictions based on historical data.
              Actual cutoffs may vary. Always verify with official MCC/State counselling portals.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function ExploreSection({ onCollegeSearchClick }: ExploreSectionProps) {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900 md:text-3xl">
          Explore Medical Colleges
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600">
          Browse curated lists of medical colleges by category
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/neet-college-predictor/government-medical-colleges"
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              Government Medical Colleges
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Complete list of 324+ government medical colleges in India with fees under ₹1
              lakh/year
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
              View All <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/neet-college-predictor/low-fees-medical-colleges"
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
              <IndianRupee className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-green-600">
              Low Fees Medical Colleges
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Affordable MBBS options with annual fees under ₹5 lakh including private colleges
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
              View All <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <button
            onClick={onCollegeSearchClick}
            className="group rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-purple-600">
              Search by College Name
            </h3>
            <p className="mb-4 text-sm text-gray-600">
              Find specific colleges by name and view detailed cutoffs, fees, and seat information
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-purple-600">
              Search Now <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href="/neet-rank-predictor"
            className="text-gray-600 underline-offset-2 hover:text-blue-600 hover:underline"
          >
            NEET Rank Predictor
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/neet-tools"
            className="text-gray-600 underline-offset-2 hover:text-blue-600 hover:underline"
          >
            All NEET Tools
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="/neet-coaching-fees-comparison"
            className="text-gray-600 underline-offset-2 hover:text-blue-600 hover:underline"
          >
            Coaching Fees Comparison
          </Link>
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="bg-blue-600 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-3xl font-bold">Need Help with NEET Preparation?</h2>
        <p className="mb-8 text-lg text-blue-100">
          Join Cerebrum Biology Academy for expert NEET Biology guidance
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/neet-tools"
            className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            <BookOpen className="h-5 w-5" />
            Explore All NEET Tools
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Contact Us
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
