'use client'

import { useEffect, useRef } from 'react'

// Global ref counter to track how many modals have locked scroll
// This prevents race conditions when multiple modals are open
let lockCount = 0

/**
 * Hook to lock body scroll when modals are open.
 * Uses a ref counter to handle multiple overlapping modals correctly.
 *
 * @param isLocked - Whether this component wants scroll locked
 */
export function useScrollLock(isLocked: boolean): void {
  // Track if this instance has already locked scroll
  const hasLockedRef = useRef(false)

  useEffect(() => {
    if (isLocked && !hasLockedRef.current) {
      // Lock scroll
      hasLockedRef.current = true
      lockCount++

      if (lockCount === 1) {
        // First lock - actually disable scroll
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
        document.body.style.overflow = 'hidden'
        // Prevent layout shift from scrollbar disappearing
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    } else if (!isLocked && hasLockedRef.current) {
      // Unlock scroll
      hasLockedRef.current = false
      lockCount = Math.max(0, lockCount - 1)

      if (lockCount === 0) {
        // Last unlock - restore scroll
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }

    // Cleanup on unmount
    return () => {
      if (hasLockedRef.current) {
        hasLockedRef.current = false
        lockCount = Math.max(0, lockCount - 1)

        if (lockCount === 0) {
          document.body.style.overflow = ''
          document.body.style.paddingRight = ''
        }
      }
    }
  }, [isLocked])
}

export default useScrollLock
