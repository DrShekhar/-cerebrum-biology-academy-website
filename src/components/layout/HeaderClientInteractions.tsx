'use client'

import { useState, useEffect, memo, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAuth } from '@/contexts/AuthContext'
import { trackAndOpenWhatsApp, WHATSAPP_MESSAGES } from '@/lib/whatsapp/tracking'

// PERFORMANCE: Lazy load BurgerMenu to defer framer-motion (~1MB) until interaction
// The burger icon itself is rendered with CSS - framer-motion only loads when menu opens
const BurgerMenu = dynamic(
  () => import('@/components/navigation/BurgerMenu').then((mod) => mod.BurgerMenu),
  { loading: () => null }
)

// Lazy load search menu (less critical)
// Note: Removed ssr: false to prevent SSR bailout
const SearchMenu = dynamic(
  () => import('@/components/navigation/SearchMenu').then((mod) => mod.SearchMenu),
  { loading: () => null }
)

interface HeaderClientInteractionsProps {
  section: 'burger' | 'search' | 'cta-demo' | 'cta-enroll' | 'all'
}

/**
 * Client-side interactive header elements
 * Loaded after initial paint to not block LCP
 */
export const HeaderClientInteractions = memo(function HeaderClientInteractions({
  section,
}: HeaderClientInteractionsProps) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuth()

  // Only render after mount to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsBurgerMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // PERFORMANCE: Render lightweight CSS burger icon, lazy-load full menu on click
  // This defers ~1MB framer-motion bundle until user interacts with menu
  if (section === 'burger') {
    return (
      <>
        {/* CSS-only burger icon for instant render */}
        <button
          onClick={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isBurgerMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isBurgerMenuOpen}
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isBurgerMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isBurgerMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isBurgerMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            />
          </div>
        </button>
        {/* Full menu loads only when opened */}
        {isBurgerMenuOpen && (
          <BurgerMenu
            isOpen={isBurgerMenuOpen}
            onToggle={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
            onClose={() => setIsBurgerMenuOpen(false)}
          />
        )}
      </>
    )
  }

  // Other sections wait for mount to avoid hydration issues
  if (!mounted) return null

  // PERFORMANCE: Only load SearchMenu when search is opened to defer framer-motion
  if (section === 'search') {
    return (
      <>
        <button
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
          aria-label={isSearchOpen ? 'Close search' : 'Open search'}
          aria-expanded={isSearchOpen}
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
        {isSearchOpen && (
          <SearchMenu
            isOpen={isSearchOpen}
            onToggle={() => setIsSearchOpen(!isSearchOpen)}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
      </>
    )
  }

  if (section === 'cta-demo') {
    return (
      <button
        onClick={async () => {
          await trackAndOpenWhatsApp({
            source: 'header-free-demo',
            message: WHATSAPP_MESSAGES.demo,
            campaign: 'header-cta',
          })
        }}
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
      </button>
    )
  }

  if (section === 'cta-enroll') {
    return (
      <button
        onClick={async () => {
          await trackAndOpenWhatsApp({
            source: 'header-enroll-now',
            message: WHATSAPP_MESSAGES.courseEnquiry,
            campaign: 'header-cta',
          })
        }}
        className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold bg-[#4a5d4a] hover:bg-[#3d4d3d] text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group"
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
      </button>
    )
  }

  // section === 'all' is deprecated - auth buttons are now handled by FirebaseAuthButtons
  return null
})
