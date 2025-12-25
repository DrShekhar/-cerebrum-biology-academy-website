'use client'

import dynamic from 'next/dynamic'
import { Play, Star } from 'lucide-react'

const HeroClientInteractive = dynamic(
  () => import('./HeroClientInteractive').then((mod) => mod.HeroClientInteractive),
  {
    ssr: false,
    loading: () => <HeroPlaceholder />,
  }
)

function HeroPlaceholder() {
  return (
    <>
      {/* Static CTA buttons - identical styling, work as links before JS loads */}
      <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 mb-8 xs:mb-12">
        <a
          href="/demo-booking"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl shadow-xl hover:shadow-green-500/30 transition-all duration-300 text-sm xs:text-base md:text-lg border border-green-400/30"
        >
          <Play className="h-5 xs:h-6 w-5 xs:w-6" />
          Book Free Demo
        </a>
        <a
          href="/success-stories"
          className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-semibold py-3 xs:py-4 px-6 xs:px-8 rounded-lg xs:rounded-xl transition-all duration-300 text-sm xs:text-base md:text-lg"
        >
          <Star className="h-5 xs:h-6 w-5 xs:w-6" />
          See Success Stories
        </a>
      </div>

      {/* Static Stats Grid - shows final values immediately */}
      <div className="grid grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-2xl mb-6 xs:mb-8">
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">
            695
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Sadhna&apos;s Score</div>
          <div className="text-xs text-green-300 mt-0.5">100 Percentile</div>
        </div>
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">
            98%
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Success Rate</div>
          <div className="text-xs text-yellow-300 mt-0.5">NEET Qualified</div>
        </div>
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">
            2500+
          </div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Students</div>
          <div className="text-xs text-purple-300 mt-0.5">And Counting</div>
        </div>
      </div>

      {/* Static urgency banner */}
      <div className="inline-flex items-center bg-red-500/20 backdrop-blur-sm border border-red-300/30 px-3 xs:px-4 py-2 xs:py-3 rounded-lg">
        <span className="text-red-100 text-xs xs:text-sm sm:text-base">
          Next Batch Starting: <span className="font-bold">January 15, 2026</span> • Limited Seats
        </span>
      </div>
    </>
  )
}

export function HeroInteractiveWrapper() {
  return <HeroClientInteractive />
}
