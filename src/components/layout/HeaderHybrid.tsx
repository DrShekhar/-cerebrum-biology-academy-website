'use client'

import { Suspense, memo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

// PERFORMANCE: Inline SVGs instead of lucide-react to eliminate icon library from critical path (~50KB)
const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9V2h12v7a6 6 0 01-12 0zm6 13v-4m-4 4h8M4 4h2m12 0h2M4 4a2 2 0 00-2 2v1a2 2 0 002 2m16-5a2 2 0 012 2v1a2 2 0 01-2 2" />
  </svg>
)

const GraduationCapIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
)

const PenIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
  </svg>
)

const CheckListIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
)

// Lazy load client-side interactive elements
// Note: Removed ssr: false to prevent BAILOUT_TO_CLIENT_SIDE_RENDERING error in Next.js 15
// The components handle mounted state internally for browser-only APIs
const HeaderClientInteractions = dynamic(
  () => import('./HeaderClientInteractions').then((mod) => mod.HeaderClientInteractions),
  {
    loading: () => null,
  }
)

// PERFORMANCE: Lazy load FirebaseAuthButtons - defers auth context init (~100KB)
const FirebaseAuthButtons = dynamic(
  () => import('./FirebaseAuthButtons').then((mod) => mod.FirebaseAuthButtons),
  {
    loading: () => <div className="hidden lg:block w-16 h-8" />,
  }
)

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
      className="bg-white shadow-md sticky top-0 z-[999] border-b border-gray-100"
      role="banner"
      style={{
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 999,
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
              <TrophyIcon />
              <span>Results</span>
              <span className="bg-[#4a5d4a] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                98%
              </span>
            </Link>
            <Link
              href="/courses"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <GraduationCapIcon />
              <span>Courses</span>
            </Link>
            <Link
              href="/faculty"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <UsersIcon />
              <span>Faculty</span>
            </Link>
            <Link
              href="/biology-notes"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <BookIcon />
              <span>Notes</span>
            </Link>
            <Link
              href="/blog"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <PenIcon />
              <span>Blog</span>
            </Link>
            <Link
              href="/neet-biology-mcq"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <CheckListIcon />
              <span>MCQ Practice</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                FREE
              </span>
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

            {/* Desktop CTAs - WhatsApp redirects for lead capture */}
            <div className="hidden lg:flex items-center gap-6">
              <a
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20book%20a%20FREE%20Demo%20Class%20for%20NEET%20Biology.%0A%0AMy%20details%3A%0A%E2%80%A2%20Name%3A%20%0A%E2%80%A2%20Class%3A%20(11th%2F12th%2FDropper)%0A%E2%80%A2%20Preferred%20Day%3A%20%0A%E2%80%A2%20Preferred%20Time%3A%20%0A%0APlease%20confirm%20my%20demo%20slot!"
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
              <a
                href="https://wa.me/918826444334?text=Hi!%20I%20want%20to%20ENROLL%20in%20NEET%20Biology%20Coaching.%0A%0AMy%20details%3A%0A%E2%80%A2%20Name%3A%20%0A%E2%80%A2%20Class%3A%20(11th%2F12th%2FDropper)%0A%E2%80%A2%20Board%3A%20(CBSE%2FICSE%2FState)%0A%E2%80%A2%20City%3A%20%0A%0APlease%20share%20course%20details%20and%20fee%20structure!"
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
              <FirebaseAuthButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Note: Auth buttons are now handled by FirebaseAuthButtons component above */}
    </header>
  )
})
