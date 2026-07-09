'use client'

import { useState, useEffect, ReactNode } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useOwnerAccess } from '@/hooks/useOwnerAccess'
const getFirebaseSignOut = () => import('@/lib/firebase/phone-auth').then((mod) => mod.signOut)
import { BookOpen, Menu, X, LogOut, User, ChevronDown, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Toaster } from '@/components/ui/Toaster'
import { StaffInboxProvider } from '@/hooks/staff/useStaffInbox'
import { StaffNotificationBell } from '@/components/staff/StaffNotificationBell'
import { ADMIN_NAV, type AdminNavItem, type NavBadgeKey } from '@/config/adminNav'

interface AdminChromeProps {
  children: ReactNode
}

const NAV_COUNTS_POLL_MS = 60_000

export function AdminChrome({ children }: AdminChromeProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [navCounts, setNavCounts] = useState<Partial<Record<NavBadgeKey, number>>>({})
  const pathname = usePathname()
  const { user } = useAuth()
  const { isOwner } = useOwnerAccess()

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [sidebarOpen])

  // Live sidebar badge counts (replaces the old hardcoded literals).
  useEffect(() => {
    let cancelled = false
    const fetchCounts = async () => {
      try {
        const res = await fetch('/api/admin/nav-counts')
        const json = await res.json()
        if (!cancelled && json.success) setNavCounts(json.data)
      } catch {
        // keep previous counts
      }
    }
    void fetchCounts()
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') void fetchCounts()
    }, NAV_COUNTS_POLL_MS)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [])

  const badgeFor = (item: AdminNavItem): number | undefined => {
    const count = item.badgeKey ? navCounts[item.badgeKey] : undefined
    return count && count > 0 ? count : undefined
  }

  // NOTE: no auth guard here — AdminLayoutClient (mounted by the /admin route
  // layout) is the single admin guard (ADMIN role OR owner). This component is
  // pure chrome: sidebar, topbar, user menu.

  const handleLogout = async () => {
    try {
      const firebaseSignOut = await getFirebaseSignOut()
      await firebaseSignOut()
      // Force hard refresh to clear all client-side state
      window.location.href = '/select-role'
    } catch (error) {
      console.error('Logout error:', error)
      // Even on error, force redirect
      window.location.href = '/select-role'
    }
  }

  // Get display name from Firebase user
  const displayName =
    user?.fullName || user?.name || (isOwner ? 'Dr. Shekhar (Owner)' : 'Admin User')
  const displayEmail = user?.email || (isOwner ? 'Owner Access' : '')

  const navigation = ADMIN_NAV

  const isActive = (href: string) => {
    return pathname === href || (href !== '/admin' && pathname?.startsWith(href))
  }

  const NavItem = ({ item, depth = 0 }: { item: AdminNavItem; depth?: number }) => {
    const [isOpen, setIsOpen] = useState(isActive(item.href))
    const hasChildren = item.children && item.children.length > 0
    const Icon = item.icon

    return (
      <div>
        {hasChildren ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              depth === 0 ? 'mb-1' : 'mb-0.5 ml-4'
            } ${
              isActive(item.href)
                ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <Icon className={`${depth === 0 ? 'w-5 h-5' : 'w-4 h-4'} mr-3`} />
              <span>{item.name}</span>
              {badgeFor(item) && (
                <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {badgeFor(item)}
                </span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <Link href={item.href} onClick={() => setSidebarOpen(false)}>
            <div
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                depth === 0 ? 'mb-1' : 'mb-0.5 ml-4'
              } ${
                isActive(item.href)
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <Icon className={`${depth === 0 ? 'w-5 h-5' : 'w-4 h-4'} mr-3`} />
                <span>{item.name}</span>
                {badgeFor(item) && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {badgeFor(item)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        )}

        {hasChildren && isOpen && (
          <div className="overflow-hidden animate-fadeInUp">
            <div className="py-2">
              {item.children!.map((child) => (
                <Link key={child.id} href={child.href} onClick={() => setSidebarOpen(false)}>
                  <div
                    className={`flex items-center px-8 py-2 text-sm transition-colors ${
                      isActive(child.href)
                        ? 'text-primary-700 bg-primary-50 border-r-2 border-primary-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <child.icon className="w-4 h-4 mr-3" />
                    <span>{child.name}</span>
                    {badgeFor(child) && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {badgeFor(child)}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <StaffInboxProvider>
      <Toaster />
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeInUp"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:shadow-lg ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">Cerebrum</div>
                  <div className="text-xs text-gray-500">Admin Panel</div>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 overflow-y-auto">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </div>
            </nav>

            {/* User menu */}
            <div className="p-4 border-t border-gray-200">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">{displayName}</div>
                      <div className="text-xs text-gray-500">{displayEmail}</div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {userMenuOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 animate-fadeInUp">
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </button>
                    <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top bar */}
          <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg touch-manipulation"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
              <StaffNotificationBell surface="admin" />
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 min-w-0 overflow-x-auto">{children}</main>
        </div>
      </div>
    </StaffInboxProvider>
  )
}
