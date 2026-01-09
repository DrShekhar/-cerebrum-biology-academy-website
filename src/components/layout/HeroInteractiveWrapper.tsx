'use client'

import dynamic from 'next/dynamic'
import { Play, Star, Clock, Sparkles, GraduationCap, MessageCircle } from 'lucide-react'

const HeroClientInteractive = dynamic(
  () => import('./HeroClientInteractive').then((mod) => mod.HeroClientInteractive),
  {
    loading: () => <HeroPlaceholder />,
  }
)

/**
 * PERFORMANCE: HeroPlaceholder must exactly match HeroClientInteractive layout
 * to prevent Cumulative Layout Shift (CLS) when JS hydrates.
 * All dimensions, spacing, and element counts must be identical.
 */
function HeroPlaceholder() {
  return (
    <>
      {/* CTAs - Must match HeroClientInteractive exactly (3 buttons) */}
      <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 mb-4">
        <a
          href="/demo-booking"
          className="inline-flex items-center justify-center gap-2 bg-[#ea4335] text-white font-bold py-3 xs:py-4 px-5 xs:px-6 rounded-lg xs:rounded-xl shadow-xl text-sm xs:text-base md:text-lg border border-red-400/30"
        >
          <Play className="h-5 xs:h-6 w-5 xs:w-6 flex-shrink-0" />
          BOOK DEMO
        </a>
        <a
          href="https://wa.me/919999999999"
          className="inline-flex items-center justify-center gap-2 bg-[#166534] text-white font-bold py-3 xs:py-4 px-5 xs:px-6 rounded-lg xs:rounded-xl shadow-xl text-sm xs:text-base md:text-lg border border-green-400/30"
        >
          <MessageCircle className="h-5 xs:h-6 w-5 xs:w-6 flex-shrink-0" />
          WhatsApp
        </a>
        <a
          href="/success-stories"
          className="inline-flex items-center justify-center gap-2 bg-yellow-800 text-white font-bold py-3 xs:py-4 px-5 xs:px-6 rounded-lg xs:rounded-xl shadow-xl text-sm xs:text-base md:text-lg border border-yellow-600/30"
        >
          <Star className="h-5 xs:h-6 w-5 xs:w-6 flex-shrink-0" />
          Success Stories
        </a>
      </div>

      {/* Micro Social Proof - Must match HeroClientInteractive */}
      <div className="flex items-center gap-2 mb-8 xs:mb-12">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold">S</div>
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold">R</div>
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold">A</div>
          <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white/30 flex items-center justify-center text-white text-xs font-bold">+</div>
        </div>
        <span className="text-blue-100 text-xs xs:text-sm">
          <span className="text-green-300 font-semibold">127+ students</span> booked demos this week
        </span>
      </div>

      {/* Stats Grid - Must match HeroClientInteractive */}
      <div className="grid grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-2xl mb-6 xs:mb-8">
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-green-400">695</div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Sadhna&apos;s Score</div>
          <div className="text-xs text-green-300 mt-0.5">100 Percentile</div>
        </div>
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">98%</div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Success Rate</div>
          <div className="text-xs text-yellow-300 mt-0.5">NEET Qualified</div>
        </div>
        <div className="text-center bg-white/5 backdrop-blur-sm rounded-lg xs:rounded-xl p-3 xs:p-4 border border-white/10">
          <div className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-purple-400">2500+</div>
          <div className="text-xs sm:text-sm text-blue-200 mt-1">Students</div>
          <div className="text-xs text-purple-300 mt-0.5">And Counting</div>
        </div>
      </div>

      {/* Urgency Banner with countdown placeholder - Must match HeroClientInteractive */}
      <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-red-500/20 backdrop-blur-sm border border-red-300/30 px-3 xs:px-4 py-2 xs:py-3 rounded-lg">
        <div className="flex items-center">
          <Clock className="w-4 xs:w-5 h-4 xs:h-5 mr-2 text-red-300 flex-shrink-0" />
          <span className="text-red-100 text-xs xs:text-sm sm:text-base">Next Batch Starting:</span>
        </div>
        <div className="flex items-center gap-1 xs:gap-2 font-mono">
          <div className="bg-white/20 px-2 py-1 rounded text-center">
            <span className="text-white font-bold text-sm xs:text-base">--</span>
            <span className="text-red-200 text-xs ml-0.5">d</span>
          </div>
          <span className="text-red-200">:</span>
          <div className="bg-white/20 px-2 py-1 rounded text-center">
            <span className="text-white font-bold text-sm xs:text-base">--</span>
            <span className="text-red-200 text-xs ml-0.5">h</span>
          </div>
          <span className="text-red-200">:</span>
          <div className="bg-white/20 px-2 py-1 rounded text-center">
            <span className="text-white font-bold text-sm xs:text-base">--</span>
            <span className="text-red-200 text-xs ml-0.5">m</span>
          </div>
          <span className="text-red-200">:</span>
          <div className="bg-white/20 px-2 py-1 rounded text-center min-w-[40px]">
            <span className="text-white font-bold text-sm xs:text-base">--</span>
            <span className="text-red-200 text-xs ml-0.5">s</span>
          </div>
        </div>
        <span className="text-yellow-300 font-bold text-xs xs:text-sm">• Only 12 seats left!</span>
      </div>

      {/* Early Bird section - Must match HeroClientInteractive */}
      <div className="mt-6 xs:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-yellow-200">
          <Sparkles className="w-4 xs:w-5 h-4 xs:h-5" />
          <span className="text-xs xs:text-sm sm:text-base">
            Join in the next -- days and get 15% early bird discount
          </span>
        </div>
        <a
          href="/neet-2026-preparation"
          className="inline-flex items-center gap-2 bg-orange-700 hover:bg-orange-800 text-white text-xs xs:text-sm font-bold px-4 py-2.5 min-h-[40px] rounded-full shadow-lg"
        >
          <GraduationCap className="w-4 h-4" />
          NEET 2026
        </a>
      </div>
    </>
  )
}

export function HeroInteractiveWrapper() {
  return (
    <div className="min-h-[380px] xs:min-h-[350px] sm:min-h-[320px]">
      <HeroClientInteractive />
    </div>
  )
}
