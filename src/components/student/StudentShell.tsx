'use client'

/**
 * Student portal shell — persistent navigation for every /student/* page.
 * Desktop: sticky top bar with the full destination set. Mobile: 5-tab
 * bottom bar + the remaining destinations under the top bar's scroll row.
 * Pages keep their own headers; this only adds the connective tissue that
 * was missing (video hub, flashcards, CBT etc. were unreachable).
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboard,
  GraduationCap,
  PlaySquare,
  Target,
  MonitorCheck,
  Layers,
  Grid3x3,
  Users,
  MessageCircle,
  CalendarClock,
  FolderOpen,
  Award,
  Bell,
  LogOut,
  LogIn,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
  { label: 'My Courses', href: '/student/courses', icon: GraduationCap },
  { label: 'Videos', href: '/student/videos', icon: PlaySquare },
  { label: 'Practice', href: '/mock-tests', icon: Target },
  { label: 'NEET Simulator', href: '/cbt', icon: MonitorCheck },
  { label: 'Flashcards', href: '/flashcards', icon: Layers },
  { label: 'Syllabus', href: '/student/syllabus', icon: Grid3x3 },
  { label: 'My Batch', href: '/student/batch', icon: Users },
  { label: 'Doubts', href: '/student/doubts', icon: MessageCircle },
  { label: 'Mentor Session', href: '/student/mentor', icon: CalendarClock },
  { label: 'Materials', href: '/student/materials', icon: FolderOpen },
  { label: 'Certificates', href: '/student/certificates', icon: Award },
]

const MOBILE_TABS = NAV_ITEMS.filter((i) =>
  [
    '/student/dashboard',
    '/student/courses',
    '/student/videos',
    '/mock-tests',
    '/student/doubts',
  ].includes(i.href)
)

function isActive(pathname: string, href: string) {
  if (href === '/student/dashboard') return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function StudentShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ''
  const { isAuthenticated, logout } = useAuth()

  return (
    <div className="pb-16 md:pb-0">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/student/dashboard"
            className="flex shrink-0 items-center gap-2 py-3 text-sm font-bold text-gray-900"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-green-700 text-xs font-black text-white">
              C
            </span>
            <span className="hidden lg:inline">Cerebrum</span>
          </Link>
          <nav className="scrollbar-hide -mb-px flex flex-1 items-center gap-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 py-3.5 text-sm font-medium transition-colors',
                    active
                      ? 'border-green-700 text-green-800'
                      : 'border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
          <Link
            href="/student/notices"
            aria-label="Notifications"
            className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <Bell className="h-5 w-5" />
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => void logout()}
              aria-label="Sign out"
              title="Sign out"
              className="shrink-0 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
            </button>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-green-700 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-green-800"
            >
              <LogIn className="h-4 w-4" /> Sign in
            </Link>
          )}
        </div>
      </header>

      {children}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white md:hidden">
        <div className="flex justify-around">
          {MOBILE_TABS.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex min-w-0 flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors active:scale-95',
                  active ? 'text-green-700' : 'text-gray-500'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="truncate">
                  {item.label === 'My Courses' ? 'Courses' : item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
