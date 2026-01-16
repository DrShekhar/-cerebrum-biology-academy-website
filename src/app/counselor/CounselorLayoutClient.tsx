'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { KeyboardShortcutsModal } from '@/components/counselor/KeyboardShortcutsModal'
import { Keyboard } from 'lucide-react'
import Link from 'next/link'
import { useOwnerAccess } from '@/hooks/useOwnerAccess'
import { useFirebaseSession } from '@/hooks/useFirebaseSession'

function CounselorAuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated, user } = useFirebaseSession()
  const router = useRouter()
  const pathname = usePathname()
  const [showShortcuts, setShowShortcuts] = useState(false)
  const { isOwner, isCheckingOwner } = useOwnerAccess()
  const [isCounselor, setIsCounselor] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // DEV MODE: Skip authentication check if bypass is enabled
  const isBypassEnabled = process.env.NEXT_PUBLIC_BYPASS_CRM_AUTH === 'true'

  useEffect(() => {
    if (isBypassEnabled) {
      setIsCounselor(true)
      setIsAdmin(true)
      return
    }

    if (user) {
      const userRole = user.role?.toLowerCase()
      setIsCounselor(userRole === 'counselor')
      setIsAdmin(userRole === 'admin' || userRole === 'owner')
    }
  }, [user, isBypassEnabled])

  // Allow access if owner OR counselor/admin role
  const hasCounselorAccess = isOwner || isCounselor || isAdmin

  useEffect(() => {
    if (isBypassEnabled) {
      console.log('[DEV MODE] Bypassing counselor layout authentication')
      return
    }

    if (isLoading || isCheckingOwner) return

    if (!isAuthenticated) {
      router.push(`/sign-in?redirect_url=${encodeURIComponent(pathname)}`)
      return
    }

    if (!hasCounselorAccess) {
      router.push('/dashboard?error=counselor_required')
      return
    }
  }, [isLoading, isAuthenticated, isCheckingOwner, hasCounselorAccess, router, pathname, isBypassEnabled])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show shortcuts modal
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        setShowShortcuts(true)
      }

      // Navigation shortcuts
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
            case 'l':
              router.push('/counselor/leads')
              break
            case 't':
              router.push('/counselor/tasks')
              break
            case 'p':
              router.push('/counselor/payments')
              break
            case 'a':
              router.push('/counselor/analytics')
              break
            case 'm':
              router.push('/counselor/messages')
              break
          }
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  if (!isBypassEnabled && (isLoading || isCheckingOwner)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-white rounded-full animate-pulse" />
          </div>
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Checking counselor access...
          </div>
          <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!isBypassEnabled && (!isAuthenticated || !hasCounselorAccess)) {
    return null
  }

  // Get user initials for avatar
  const userInitial = isBypassEnabled
    ? 'D'
    : user?.fullName?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'C'

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-indigo-600">Cerebrum</span>
                <span className="text-gray-400">|</span>
                <span className="text-lg font-semibold text-gray-900">Counselor</span>
              </div>

              <div className="hidden md:flex items-center gap-1">
                <Link
                  href="/counselor/leads"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  Pipeline
                </Link>
                <Link
                  href="/counselor/tasks"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  Tasks
                </Link>
                <Link
                  href="/counselor/messages"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  Messages
                </Link>
                <Link
                  href="/counselor/payments"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  Payments
                </Link>
                <Link
                  href="/counselor/analytics"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  Analytics
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowShortcuts(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Keyboard Shortcuts"
              >
                <Keyboard className="w-5 h-5 text-gray-600" />
              </button>

              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#166534] hover:bg-[#14532d] text-white rounded-lg font-medium text-sm transition-colors shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Quick WhatsApp
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {userInitial}
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>

      <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />
      <Toaster position="top-right" />
    </div>
  )
}

export default function CounselorLayoutClient({ children }: { children: React.ReactNode }) {
  return <CounselorAuthWrapper>{children}</CounselorAuthWrapper>
}
