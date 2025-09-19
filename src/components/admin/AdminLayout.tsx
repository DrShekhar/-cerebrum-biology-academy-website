'use client'

import { useState, ReactNode } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Calendar,
  Users,
  BookOpen,
  CreditCard,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  User,
  ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface AdminLayoutProps {
  children: ReactNode
}

interface NavItem {
  id: string
  name: string
  icon: any
  href: string
  badge?: number
  children?: NavItem[]
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      // Redirect to login for admin pages
      router.push('/admin/login')
    },
  })

  // Show loading state while session is loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-2">Loading...</div>
          <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (status === 'unauthenticated' || !session?.user || session.user.role !== 'admin') {
    router.push('/admin/login')
    return null
  }

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: '/admin/login',
        redirect: true,
      })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const navigation: NavItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
    },
    {
      id: 'demo-bookings',
      name: 'Demo Bookings',
      icon: Calendar,
      href: '/admin/demo-bookings',
      badge: 3, // Live count of pending bookings
    },
    {
      id: 'students',
      name: 'Students',
      icon: Users,
      href: '/admin/students',
      children: [
        { id: 'all-students', name: 'All Students', icon: Users, href: '/admin/students' },
        {
          id: 'active-students',
          name: 'Active Students',
          icon: Users,
          href: '/admin/students/active',
        },
        { id: 'leads', name: 'Leads', icon: Users, href: '/admin/students/leads' },
      ],
    },
    {
      id: 'courses',
      name: 'Courses',
      icon: BookOpen,
      href: '/admin/courses',
      children: [
        {
          id: 'course-management',
          name: 'Course Management',
          icon: BookOpen,
          href: '/admin/courses',
        },
        {
          id: 'enrollments',
          name: 'Enrollments',
          icon: BookOpen,
          href: '/admin/courses/enrollments',
        },
        {
          id: 'performance',
          name: 'Performance',
          icon: BarChart3,
          href: '/admin/courses/performance',
        },
      ],
    },
    {
      id: 'payments',
      name: 'Payments',
      icon: CreditCard,
      href: '/admin/payments',
      children: [
        { id: 'all-payments', name: 'All Payments', icon: CreditCard, href: '/admin/payments' },
        {
          id: 'pending',
          name: 'Pending',
          icon: CreditCard,
          href: '/admin/payments/pending',
          badge: 2,
        },
        { id: 'failed', name: 'Failed', icon: CreditCard, href: '/admin/payments/failed' },
        { id: 'refunds', name: 'Refunds', icon: CreditCard, href: '/admin/payments/refunds' },
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: MessageSquare,
      href: '/admin/marketing',
      children: [
        {
          id: 'campaigns',
          name: 'Campaigns',
          icon: MessageSquare,
          href: '/admin/marketing/campaigns',
        },
        {
          id: 'whatsapp',
          name: 'WhatsApp',
          icon: MessageSquare,
          href: '/admin/marketing/whatsapp',
        },
        { id: 'email', name: 'Email', icon: MessageSquare, href: '/admin/marketing/email' },
        {
          id: 'abandoned-carts',
          name: 'Abandoned Carts',
          icon: MessageSquare,
          href: '/admin/marketing/abandoned-carts',
          badge: 8,
        },
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      children: [
        { id: 'overview', name: 'Overview', icon: BarChart3, href: '/admin/analytics' },
        {
          id: 'user-behavior',
          name: 'User Behavior',
          icon: BarChart3,
          href: '/admin/analytics/behavior',
        },
        {
          id: 'conversion',
          name: 'Conversion',
          icon: BarChart3,
          href: '/admin/analytics/conversion',
        },
        { id: 'reports', name: 'Reports', icon: BarChart3, href: '/admin/analytics/reports' },
      ],
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      children: [
        { id: 'general', name: 'General', icon: Settings, href: '/admin/settings' },
        { id: 'users', name: 'Admin Users', icon: User, href: '/admin/settings/users' },
        { id: 'faculty', name: 'Faculty', icon: Users, href: '/admin/settings/faculty' },
        {
          id: 'notifications',
          name: 'Notifications',
          icon: Bell,
          href: '/admin/settings/notifications',
        },
      ],
    },
  ]

  const isActive = (href: string) => {
    return pathname === href || (href !== '/admin' && pathname?.startsWith(href))
  }

  const NavItem = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const [isOpen, setIsOpen] = useState(isActive(item.href))
    const hasChildren = item.children && item.children.length > 0
    const Icon = item.icon

    return (
      <div>
        <button
          onClick={() => {
            if (hasChildren) {
              setIsOpen(!isOpen)
            }
          }}
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
            {item.badge && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          {hasChildren && (
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </button>

        {hasChildren && (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="py-2">
                  {item.children!.map((child) => (
                    <Link key={child.id} href={child.href}>
                      <div
                        className={`flex items-center px-8 py-2 text-sm transition-colors ${
                          isActive(child.href)
                            ? 'text-primary-700 bg-primary-50 border-r-2 border-primary-600'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <child.icon className="w-4 h-4 mr-3" />
                        <span>{child.name}</span>
                        {child.badge && (
                          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {child.badge}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:relative lg:translate-x-0 lg:shadow-lg"
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
                    <div className="text-sm font-medium text-gray-900">
                      {session.user.name || 'Admin User'}
                    </div>
                    <div className="text-xs text-gray-500">{session.user.email}</div>
                  </div>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, bookings, payments..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-200 rounded-lg focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Real-time indicators */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Live</span>
              </div>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">12 online</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
