'use client'

import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

// Owner phone number - only this number gets multi-role access
const OWNER_PHONE = '+919999744334'

export function useOwnerAccess() {
  const { user, isLoaded } = useUser()
  const [isOwner, setIsOwner] = useState(false)
  const [isCheckingOwner, setIsCheckingOwner] = useState(true)

  useEffect(() => {
    if (!isLoaded) {
      setIsCheckingOwner(true)
      return
    }

    if (user) {
      const userPhone = user.primaryPhoneNumber?.phoneNumber || ''
      const normalizedPhone = userPhone.replace(/[\s\-\(\)]/g, '')

      const ownerMatch =
        normalizedPhone === OWNER_PHONE ||
        normalizedPhone === '919999744334' ||
        normalizedPhone === '+919999744334'

      setIsOwner(ownerMatch)
    } else {
      setIsOwner(false)
    }

    setIsCheckingOwner(false)
  }, [user, isLoaded])

  return { isOwner, isCheckingOwner, isLoaded }
}
