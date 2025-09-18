import React from 'react'

// Mock next-auth/react
export const useSession = jest.fn(() => ({
  data: null,
  status: 'unauthenticated',
}))

export const signIn = jest.fn()
export const signOut = jest.fn()

export const SessionProvider = ({ children }: { children: React.ReactNode }) => children

export default {
  useSession,
  signIn,
  signOut,
  SessionProvider,
}
