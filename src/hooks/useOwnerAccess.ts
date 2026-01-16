'use client'

import { useFirebaseSession } from '@/hooks/useFirebaseSession'
import { useState, useEffect } from 'react'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// Owner phone number - only this number gets multi-role access
const OWNER_PHONE = CONTACT_INFO.phone.owner

export function useOwnerAccess() {
  const { user, isLoading } = useFirebaseSession()
  const [isOwner, setIsOwner] = useState(false)
  const [isCheckingOwner, setIsCheckingOwner] = useState(true)

  useEffect(() => {
    if (isLoading) {
      setIsCheckingOwner(true)
      return
    }

    if (user) {
      const userPhone = user.phone || ''
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
  }, [user, isLoading])

  return { isOwner, isCheckingOwner, isLoaded: !isLoading }
}
