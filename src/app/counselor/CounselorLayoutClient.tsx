'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { KeyboardShortcutsModal } from '@/components/counselor/KeyboardShortcutsModal'
import {
  Keyboard,
  Menu,
  X,
  LayoutDashboard,
  Users,
  ListTodo,
  MessageSquare,
  CreditCard,
  BarChart3,
  Calendar,
  Bell,
} from 'lucide-react'
import Link from 'next/link'
import { useOwnerAccess } from '@/hooks/useOwnerAccess'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'

const navItems = [
  { href: '/counselor/leads', label: 'Pipeline', icon: Users, shortcut: 'gl' },
  { href: '/counselor/schedule', label: 'Schedule', icon: Calendar, shortcut: 'gs' },
  { href: '/counselor/tasks', label: 'Tasks', icon: ListTodo, shortcut: 'gt' },
  { href: '/counselor/messages', label: 'Messages', icon: MessageSquare, shortcut: 'gm' },
  { href: '/counselor/payments', label: 'Payments', icon: CreditCard, shortcut: 'gp' },
  { href: '/counselor/analytics', label: 'Analytics', icon: BarChart3, shortcut: 'ga' },
]

function CounselorAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, user } = useFirebaseSession()
  const router = useRouter()
  const pathname = usePathname()
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isOwner, isCheckingOwner } = useOwnerAccess()
  const [isCounselor, setIsCounselor] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (user) {
      const userRole = user.role
      setIsCounselor(userRole === 'COUNSELOR')
      setIsAdmin(userRole === 'ADMIN' || isOwner)
    }
  }, [user, isOwner])

  const hasCounselorAccess = isOwner || isCounselor || isAdmin

  useEffect(() => {
    if (isLoading || isCheckingOwner) return
    if (!isAuthenticated) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(pathname)}`)
      return
    }
    if (!hasCounselorAccess) {
      router.push('/dashboard?error=counselor_required')
      return
    }
  }, [isLoading, isAuthenticated, isCheckingOwner, hasCounselorAccess, router, pathname])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        setShowShortcuts(true)
      }
      if (e.key === 'g' || e.key === 'G') {
        const nextKey = new Promise<string>((resolve) => {
          const handler = (ev: KeyboardEvent) => {
            window.removeEventListener('keydown', handler)
            resolve(ev.key)
          }
          window.addEventListener('keydown', handler)
        })
        nextKey.then((key) => {
          switch (key) {
            case 'l': router.push('/counselor/leads'); break
            case 's': router.push('/counselor/schedule'); break
            case 't': router.push('/counselor/tasks'); break
            case 'p': router.push('/counselor/payments'); break
            case 'a': router.push('/counselor/analytics'); break
            case 'm': router.push('/counselor/messages'); break
          }
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  if (isLoading || isCheckingOwner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Checking counselor access...
          </div>
          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !hasCounselorAccess) return null

  const userInitial =
    user?.fullName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'C'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Top Nav ─── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-8">
              <Link href="/counselor/leads" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-bold">C</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg font-bold text-gray-900">Cerebrum</span>
                  <span className="text-gray-300 mx-1.5">|</span>
                  <span className="text-sm font-medium text-indigo-600">Counselor</span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowShortcuts(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Keyboard Shortcuts (?)"
              >
                <Keyboard className="w-4 h-4 text-gray-500" />
              </button>

              <a
                href="https://wa.me/918826444334"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#166534] hover:bg-[#14532d] text-white rounded-lg text-sm font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>

              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-500" />
              </button>

              <button className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userInitial}
                </div>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white pb-3 px-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* ─── Main Content ─── */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <Toaster position="top-right" />
    </div>
  )
}

export default function CounselorLayoutClient({ children }: { children: React.ReactNode }) {
  return <CounselorAuthWrapper>{children}</CounselorAuthWrapper>
}
