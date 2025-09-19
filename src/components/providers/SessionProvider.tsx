'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface SessionProviderProps {
  children: ReactNode
  session?: any
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      session={session}
      refetchInterval={0} // Disable automatic refetching completely
      refetchOnWindowFocus={false} // Don't refetch when window gets focus
      refetchWhenOffline={false} // Don't refetch when going offline
      basePath="/api/auth" // Explicit base path
      baseUrl={process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_SITE_URL} // Explicit base URL
    >
      {children}
    </NextAuthSessionProvider>
  )
}
