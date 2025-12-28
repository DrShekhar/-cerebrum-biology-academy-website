'use client'

import Link from 'next/link'
import { Building2, Globe, Accessibility, TrendingUp } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-blue-600 pt-16 pb-24 text-white md:pt-24 md:pb-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/neet-tools" className="hover:underline">
            NEET Tools
          </Link>
          <span className="mx-2">/</span>
          <span>College Predictor</span>
        </nav>

        <h1 className="mb-4 text-3xl font-bold md:text-5xl">NEET College Predictor 2026</h1>
        <p className="mb-6 max-w-2xl text-lg text-blue-100 md:text-xl">
          India&apos;s most comprehensive NEET college predictor with 470+ medical colleges. Now
          with <strong>All India Quota & State Quota</strong> cutoffs and{' '}
          <strong>PwD reservation</strong> support.
        </p>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
            <Building2 className="h-5 w-5" />
            <span className="font-semibold">470+ Colleges</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
            <Globe className="h-5 w-5" />
            <span className="font-semibold">AIQ + State Quota</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
            <Accessibility className="h-5 w-5" />
            <span className="font-semibold">PwD Cutoffs</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">2024 Data</span>
          </div>
        </div>
      </div>
    </section>
  )
}
