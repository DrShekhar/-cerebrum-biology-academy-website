'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Link2,
  Menu,
  X,
  LogOut,
  Bell,
} from 'lucide-react'

const navItems = [
  { href: '/consultant/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/consultant/leads', label: 'Leads', icon: Users },
  { href: '/consultant/commissions', label: 'Commissions', icon: DollarSign },
  { href: '/consultant/links', label: 'Referral Links', icon: Link2 },
]

function ConsultantAuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isConsultant, setIsConsultant] = useState(false)

  useEffect(() => {
    if (session?.user) {
      const userRole = session.user.role?.toLowerCase()
      setIsConsultant(
        userRole === 'consultant' || userRole === 'admin' || userRole === 'owner'
      )
    }
  }, [session])

  useEffect(() => {
    if (status === 'loading') return

    if (status === 'unauthenticated') {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(pathname)}`)
      return
    }

    if (status === 'authenticated' && !isConsultant && session?.user?.role) {
      router.push('/dashboard?error=consultant_required')
      return
    }
  }, [status, isConsultant, router, pathname, session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Checking consultant access...
          </div>
          <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated' || !isConsultant) {
    return null
  }

  const userInitial =
    session?.user?.name?.charAt(0).toUpperCase() ||
    session?.user?.email?.charAt(0).toUpperCase() ||
    'C'

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50">
      {/* Desktop Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-teal-600">Cerebrum</span>
                <span className="text-gray-400">|</span>
                <span className="text-lg font-semibold text-gray-900">Consultant</span>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'text-teal-600 bg-teal-50'
                          : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>

              {/* User Avatar */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userInitial}
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                  {session?.user?.name || session?.user?.email}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="hidden sm:flex p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
              <hr className="my-2" />
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>

      <Toaster position="top-right" />
    </div>
  )
}

export default function ConsultantLayoutClient({ children }: { children: React.ReactNode }) {
  return <ConsultantAuthWrapper>{children}</ConsultantAuthWrapper>
}
