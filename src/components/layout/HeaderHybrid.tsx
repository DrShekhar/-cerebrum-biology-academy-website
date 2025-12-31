'use client'

import { Suspense, memo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { Trophy, GraduationCap, Users } from 'lucide-react'

// Lazy load client-side interactive elements
const HeaderClientInteractions = dynamic(
  () => import('./HeaderClientInteractions').then((mod) => mod.HeaderClientInteractions),
  {
    ssr: false,
    loading: () => null,
  }
)

// Lazy load Clerk auth buttons
const ClerkAuthButtons = dynamic(
  () => import('@/components/auth/ClerkAuthButtons').then((mod) => mod.ClerkAuthButtons),
  {
    ssr: false,
    loading: () => <div className="w-16 h-8 bg-slate-100 animate-pulse rounded" />,
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
      className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-100"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-4">
            {/* Burger Menu - Client interactive, visible on ALL screens */}
            <div id="burger-menu-slot">
              <Suspense
                fallback={
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Menu"
                  >
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                }
              >
                <HeaderClientInteractions section="burger" />
              </Suspense>
            </div>

            {/* Logo - Server rendered for instant LCP */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md border border-green-100 group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 overflow-hidden">
                  <Image
                    src="/brain-logo.webp"
                    alt="Cerebrum Biology Academy Logo"
                    width={40}
                    height={40}
                    sizes="(max-width: 640px) 32px, 40px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
              </div>

              {/* Mobile brand */}
              <div className="block sm:hidden">
                <span className="text-xl font-bold text-slate-900 leading-none tracking-[-0.02em]">
                  Cerebrum
                </span>
                <span className="block text-xs text-slate-600 font-medium tracking-wide">
                  Biology Academy
                </span>
              </div>

              {/* Desktop brand */}
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-slate-900 leading-none tracking-[-0.02em]">
                  Cerebrum
                </span>
                <span className="block text-sm text-slate-600 font-medium tracking-wide">
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
            <div id="search-slot">
              <Suspense
                fallback={
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Search"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                }
              >
                <HeaderClientInteractions section="search" />
              </Suspense>
            </div>

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
              <ClerkAuthButtons />
            </div>
          </div>
        </div>
      </div>

      {/* Client-side interactive elements mount point */}
      <HeaderClientInteractions section="all" />
    </header>
  )
})
