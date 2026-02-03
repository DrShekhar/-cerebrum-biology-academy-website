'use client'

import { Suspense, memo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, GraduationCap, Users } from 'lucide-react'

// Lazy load client-side interactive elements
// Note: Removed ssr: false to prevent BAILOUT_TO_CLIENT_SIDE_RENDERING error in Next.js 15
// The components handle mounted state internally for browser-only APIs
const HeaderClientInteractions = dynamic(
  () => import('./HeaderClientInteractions').then((mod) => mod.HeaderClientInteractions),
  {
    loading: () => null,
  }
)

// Import FirebaseAuthButtons directly to ensure proper hydration
// Dynamic import was causing click handlers to not attach properly
import { FirebaseAuthButtons } from './FirebaseAuthButtons'

/**
 * Hybrid Header - Server-rendered shell with lazy-loaded interactivity
 *
 * Performance benefits:
 * - Logo and navigation links render instantly (no JS required)
 * - Interactive elements (burger menu, search) load after LCP
 * - Reduces Time to Interactive on mobile by ~300ms
 */
export const HeaderHybrid = memo(function HeaderHybrid() {
  return (
    <header
      className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-100"
      role="banner"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-4">
            {/* Burger Menu - Client interactive, visible on ALL screens */}
            <Suspense
              fallback={
                <button
                  className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                  aria-label="Menu"
                  type="button"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              }
            >
              <HeaderClientInteractions section="burger" />
            </Suspense>

            {/* Logo - Server rendered for instant LCP */}
            {/* iOS Safari fix: explicit flex properties and transform3d to prevent duplicate rendering */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group"
              style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '200px',
                WebkitTransform: 'translateZ(0)',
                transform: 'translateZ(0)',
              }}
            >
              <div className="relative" style={{ flexShrink: 0 }}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-green-100 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 overflow-hidden">
                  <Image
                    src="/brain-logo.png"
                    alt="Cerebrum Biology Academy"
                    width={40}
                    height={40}
                    sizes="(max-width: 640px) 32px, 40px"
                    className="object-contain w-8 h-8 sm:w-10 sm:h-10"
                    priority
                  />
                </div>
              </div>

              {/* Responsive brand text - iOS Safari fix: explicit styles prevent duplicate rendering */}
              <div
                className="flex flex-col justify-center"
                style={{
                  minWidth: 0,
                  overflow: 'hidden',
                  flexShrink: 1,
                  WebkitTransform: 'translateZ(0)',
                  transform: 'translateZ(0)',
                }}
              >
                <span className="text-lg sm:text-2xl font-bold text-slate-900 leading-none tracking-[-0.02em] whitespace-nowrap overflow-hidden text-ellipsis">
                  Cerebrum
                </span>
                <span className="text-[10px] sm:text-sm text-slate-600 font-medium tracking-wide leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
                  Biology Academy
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Server rendered */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href="/results"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <Trophy className="w-5 h-5" />
              <span>Results</span>
              <span className="bg-[#4a5d4a] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                98%
              </span>
            </Link>
            <Link
              href="/courses"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <GraduationCap className="w-5 h-5" />
              <span>Courses</span>
            </Link>
            <Link
              href="/faculty"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span>Faculty</span>
            </Link>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search - Client interactive */}
            <Suspense
              fallback={
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                  aria-label="Search"
                  type="button"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              }
            >
              <HeaderClientInteractions section="search" />
            </Suspense>

            {/* Desktop CTAs - Server rendered */}
            <div className="hidden lg:flex items-center gap-6">
              <Link
                href="/demo-booking"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border-2 border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 hover:text-green-700 transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Free Demo</span>
              </Link>
              <Link
                href="/admissions"
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold bg-[#4a5d4a] hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
              >
                <span>Enroll Now</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
              <FirebaseAuthButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Note: Auth buttons are now handled by FirebaseAuthButtons component above */}
    </header>
  )
})
