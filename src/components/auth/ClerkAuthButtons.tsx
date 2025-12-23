'use client'

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function ClerkAuthButtons() {
  return (
    <>
      <SignedOut>
        <Link
          href="/sign-in"
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span>Login</span>
        </Link>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-9 h-9',
                userButtonPopoverCard: 'shadow-xl border border-slate-200',
                userButtonPopoverActionButton:
                  'text-slate-700 hover:text-blue-600 hover:bg-blue-50',
                userButtonPopoverActionButtonText: 'font-medium',
                userButtonPopoverFooter: 'hidden',
              },
            }}
            afterSignOutUrl="/"
          />
        </div>
      </SignedIn>
    </>
  )
}

export function ClerkAuthButtonsMobile() {
  return (
    <>
      <SignedOut>
        <SignInButton mode="redirect">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-lg">
          <UserButton
            appearance={{
              elements: {
                avatarBox: 'w-10 h-10',
              },
            }}
            afterSignOutUrl="/"
          />
          <Link
            href="/dashboard"
            className="flex-1 text-sm font-medium text-slate-700 hover:text-blue-600"
          >
            Go to Dashboard
          </Link>
        </div>
      </SignedIn>
    </>
  )
}
