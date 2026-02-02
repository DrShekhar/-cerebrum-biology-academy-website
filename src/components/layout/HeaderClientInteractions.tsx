'use client'

import { useState, useEffect, memo } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAuth } from '@/contexts/AuthContext'

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
  section: 'burger' | 'search' | 'all'
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
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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

  if (section === 'search') {
    return (
      <SearchMenu
        isOpen={isSearchOpen}
        onToggle={() => setIsSearchOpen(!isSearchOpen)}
        onClose={() => setIsSearchOpen(false)}
      />
    )
  }

  // section === 'all' is deprecated - auth buttons are now handled by FirebaseAuthButtons
  // This prevents duplicate dashboard buttons from rendering
  return null
})
