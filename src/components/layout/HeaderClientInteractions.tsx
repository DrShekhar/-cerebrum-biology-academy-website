'use client'

import { useState, useEffect, memo } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

// Direct import for BurgerMenu - critical UI that must always render
// This ensures navigation works even if chunk loading fails
import { BurgerMenu } from '@/components/navigation/BurgerMenu'

// Lazy load search menu (less critical)
const SearchMenu = dynamic(
  () => import('@/components/navigation/SearchMenu').then((mod) => mod.SearchMenu),
  { ssr: false }
)

interface HeaderClientInteractionsProps {
  section: 'burger' | 'search' | 'all'
}

/**
 * Client-side interactive header elements
 * Loaded after initial paint to not block LCP
 */
export const HeaderClientInteractions = memo(function HeaderClientInteractions({ section }: HeaderClientInteractionsProps) {
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

  // Render auth-dependent desktop buttons (replaces server-rendered placeholders)
  if (section === 'all' && isAuthenticated) {
    return (
      <div className="hidden lg:flex items-center gap-6 absolute right-6 top-1/2 -translate-y-1/2">
        <Link
          href={
            user?.role === 'ADMIN'
              ? '/admin'
              : user?.role === 'COUNSELOR'
                ? '/counselor/leads'
                : user?.role === 'TEACHER'
                  ? '/teacher/assignments'
                  : '/student/dashboard'
          }
          className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold bg-[#4a5d4a] hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span>
            {user?.role === 'ADMIN'
              ? 'Admin Panel'
              : user?.role === 'COUNSELOR'
                ? 'CRM Dashboard'
                : user?.role === 'TEACHER'
                  ? 'Teacher Portal'
                  : 'My Dashboard'}
          </span>
        </Link>
      </div>
    )
  }

  return null
})
