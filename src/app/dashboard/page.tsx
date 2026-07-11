'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BookOpen, LogIn, UserPlus, Brain } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// Owner phone number — only this number gets multi-role access.
const OWNER_PHONE = CONTACT_INFO.phone.owner

/**
 * /dashboard is a ROLE ROUTER, not a dashboard. Every role has ONE canonical
 * home; this page reads the session and forwards there. This ends the old
 * "two parallel student dashboards" confusion — students land on
 * /student/dashboard — and fixes the bug where non-student roles
 * (teacher/parent/counselor) were shown a student's personalized dashboard.
 */

function normalizePhone(phone: string) {
  return phone.replace(/[+\s\-()]/g, '')
}

function roleHome(role: string | undefined | null): string {
  switch (role) {
    case 'TEACHER':
      return '/teacher'
    case 'PARENT':
      return '/parent/dashboard'
    case 'COUNSELOR':
      return '/counselor'
    case 'ADMIN':
      return '/admin'
    default:
      // STUDENT or no role → the canonical student home.
      return '/student/dashboard'
  }
}

function AuthRequiredMessage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center animate-fadeInUp">
        <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <BookOpen className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
        <p className="text-gray-600 mb-8">
          Please sign in to access your personalized NEET Biology dashboard with AI-powered learning
          paths.
        </p>
        <div className="space-y-4">
          <Link href="/sign-in">
            <Button variant="primary" size="lg" className="w-full">
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" size="lg" className="w-full">
              <UserPlus className="w-5 h-5 mr-2" />
              Create Account
            </Button>
          </Link>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            New to Cerebrum Biology Academy?{' '}
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Learn more about our courses
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-600">Loading your dashboard...</p>
        <p className="text-xs text-gray-400 mt-2">Please wait...</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // Wait for mount before touching auth (prevents hydration mismatch).
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isLoading || !user) return
    // Owner (multi-role) chooses a role each session.
    if (normalizePhone(user.phone || '') === normalizePhone(OWNER_PHONE)) {
      router.replace('/select-role')
      return
    }
    router.replace(roleHome(user.role))
  }, [mounted, isLoading, user, router])

  if (!mounted || isLoading) return <LoadingState />
  if (!isAuthenticated || !user) return <AuthRequiredMessage />
  // Authenticated → a redirect is in flight.
  return <LoadingState />
}
