'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CTAContextType {
  activeCTA: string | null
  registerCTA: (id: string) => void
  unregisterCTA: (id: string) => void
}

const CTAContext = createContext<CTAContextType | undefined>(undefined)

export function CTAProvider({ children }: { children: ReactNode }) {
  const [activeCTA, setActiveCTA] = useState<string | null>(null)

  const registerCTA = (id: string) => {
    setActiveCTA(id)
  }

  const unregisterCTA = (id: string) => {
    if (activeCTA === id) {
      setActiveCTA(null)
    }
  }

  return (
    <CTAContext.Provider value={{ activeCTA, registerCTA, unregisterCTA }}>
      {children}
    </CTAContext.Provider>
  )
}

export function useCTA() {
  const context = useContext(CTAContext)
  if (context === undefined) {
    throw new Error('useCTA must be used within a CTAProvider')
  }
  return context
}
