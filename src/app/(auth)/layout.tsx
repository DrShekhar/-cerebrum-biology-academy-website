'use client'

import { Suspense, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

/**
 * Auth Layout
 * Wraps sign-in and sign-up pages with consistent styling
 * Adds body class to hide main navigation and footer from root layout
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Add auth-page class to body to trigger CSS hiding of header/footer
  useEffect(() => {
    document.body.classList.add('auth-page')
    return () => {
      document.body.classList.remove('auth-page')
    }
  }, [])

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-white mx-auto mb-4" />
            <p className="text-slate-300">Loading...</p>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
