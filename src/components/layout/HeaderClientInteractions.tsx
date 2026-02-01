'use client'

import { useState, useEffect, memo } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useAuth } from '@/contexts/AuthContext'

// Direct import for BurgerMenu - critical UI that must always render
// This ensures navigation works even if chunk loading fails
import { BurgerMenu } from '@/components/navigation/BurgerMenu'

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

  // Burger menu must render immediately - critical for mobile navigation
  // Check burger section BEFORE mount check to ensure it's always accessible
  if (section === 'burger') {
    return (
      <BurgerMenu
        isOpen={isBurgerMenuOpen}
        onToggle={() => setIsBurgerMenuOpen(!isBurgerMenuOpen)}
        onClose={() => setIsBurgerMenuOpen(false)}
      />
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
