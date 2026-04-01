'use client'

import { Suspense, memo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

// PERFORMANCE: Inline SVGs instead of lucide-react to eliminate icon library from critical path (~50KB)
const TrophyIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 9V2h12v7a6 6 0 01-12 0zm6 13v-4m-4 4h8M4 4h2m12 0h2M4 4a2 2 0 00-2 2v1a2 2 0 002 2m16-5a2 2 0 012 2v1a2 2 0 01-2 2"
    />
  </svg>
)

const GraduationCapIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
    />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const MonitorIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
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
      className="bg-white shadow-md sticky top-0 z-[100] border-b border-gray-100"
      role="banner"
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
            <Link
              href="/"
              className="inline-flex items-center gap-2 sm:gap-3 group"
              style={{ WebkitBackfaceVisibility: 'hidden' }}
            >
              <Image
                src="/brain-logo.webp"
                alt="Cerebrum Biology Academy"
                width={40}
                height={40}
                sizes="(max-width: 640px) 32px, 40px"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl shadow-md border border-green-100"
                priority
              />
              <div>
                <span className="block text-lg sm:text-2xl font-bold text-slate-900 leading-none tracking-tight">
                  Cerebrum
                </span>
                <span className="block text-[10px] sm:text-sm text-slate-600 font-medium tracking-wide leading-tight">
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
              href="/pricing"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <GraduationCapIcon />
              <span>Courses</span>
            </Link>
            <Link
              href="/online-neet-biology-coaching"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <MonitorIcon />
              <span>Online</span>
            </Link>
            <Link
              href="/faculty"
              className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
            >
              <UsersIcon />
              <span>Faculty</span>
            </Link>
            {/* Centers link removed from nav — kept as SEO page only */}
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

            {/* Desktop CTAs - tracked WhatsApp with desktop QR modal */}
            <div className="hidden lg:flex items-center gap-6">
              <Suspense fallback={null}>
                <HeaderClientInteractions section="cta-demo" />
              </Suspense>
              <Suspense fallback={null}>
                <HeaderClientInteractions section="cta-enroll" />
              </Suspense>
              <FirebaseAuthButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Note: Auth buttons are now handled by FirebaseAuthButtons component above */}
    </header>
  )
})
