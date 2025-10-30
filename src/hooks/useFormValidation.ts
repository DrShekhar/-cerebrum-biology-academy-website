import { useState, useCallback } from 'react'

export interface ValidationResult {
  isValid: boolean
  error?: string
  suggestion?: string
}

export interface FieldValidationState {
  isValidating: boolean
  isValid: boolean
  error?: string
  suggestion?: string
}

const emailDomainSuggestions: Record<string, string> = {
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'yahoo.con': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'hotmail.con': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'outlook.con': 'outlook.com',
  'outlook.co': 'outlook.com',
}

export function useFormValidation() {
  const [validationStates, setValidationStates] = useState<Record<string, FieldValidationState>>({})

  const validateEmail = useCallback((email: string): ValidationResult => {
    if (!email) {
      return { isValid: false, error: 'Email is required' }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email format' }
    }

    const [, domain] = email.split('@')
    const lowerDomain = domain?.toLowerCase()

    if (lowerDomain && emailDomainSuggestions[lowerDomain]) {
      return {
        isValid: false,
        error: 'Possible typo detected',
        suggestion: email.replace(domain, emailDomainSuggestions[lowerDomain]),
      }
    }

    return { isValid: true }
  }, [])

  const validatePhone = useCallback((phone: string): ValidationResult => {
    if (!phone) {
      return { isValid: false, error: 'Phone number is required' }
    }

    const cleanPhone = phone.replace(/\D/g, '')

    if (cleanPhone.length < 10) {
      return { isValid: false, error: 'Phone number must be at least 10 digits' }
    }

    if (cleanPhone.length > 12) {
      return { isValid: false, error: 'Phone number is too long' }
    }

    if (cleanPhone.startsWith('91') && cleanPhone.length !== 12) {
      return { isValid: false, error: 'Invalid Indian phone number' }
    }

    return { isValid: true }
  }, [])

  const validateName = useCallback((name: string): ValidationResult => {
    if (!name) {
      return { isValid: false, error: 'Name is required' }
    }

    const trimmedName = name.trim()

    if (trimmedName.length < 2) {
      return { isValid: false, error: 'Name must be at least 2 characters' }
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      return { isValid: false, error: 'Name should only contain letters' }
    }

    return { isValid: true }
  }, [])

  const formatPhone = useCallback((phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')

    if (cleaned.length === 0) return ''

    if (cleaned.length <= 2) {
      return cleaned.startsWith('91') ? '+91 ' : cleaned
    }

    if (cleaned.startsWith('91')) {
      const rest = cleaned.slice(2)
      if (rest.length <= 5) {
        return `+91 ${rest}`
      }
      return `+91 ${rest.slice(0, 5)}-${rest.slice(5, 10)}`
    }

    if (cleaned.length <= 5) {
      return cleaned
    }
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 10)}`
  }, [])

  const capitalizeName = useCallback((name: string): string => {
    return name
      .trim()
      .replace(/\s+/g, ' ')
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }, [])

  const validateField = useCallback(
    (fieldName: string, value: string, fieldType: 'email' | 'phone' | 'name') => {
      setValidationStates((prev) => ({
        ...prev,
        [fieldName]: { isValidating: true, isValid: false },
      }))

      setTimeout(() => {
        let result: ValidationResult

        switch (fieldType) {
          case 'email':
            result = validateEmail(value)
            break
          case 'phone':
            result = validatePhone(value)
            break
          case 'name':
            result = validateName(value)
            break
          default:
            result = { isValid: true }
        }

        setValidationStates((prev) => ({
          ...prev,
          [fieldName]: {
            isValidating: false,
            isValid: result.isValid,
            error: result.error,
            suggestion: result.suggestion,
          },
        }))
      }, 300)
    },
    [validateEmail, validatePhone, validateName]
  )

  const clearValidation = useCallback((fieldName: string) => {
    setValidationStates((prev) => {
      const newStates = { ...prev }
      delete newStates[fieldName]
      return newStates
    })
  }, [])

  const isFieldValid = useCallback(
    (fieldName: string): boolean => {
      return validationStates[fieldName]?.isValid ?? false
    },
    [validationStates]
  )

  return {
    validationStates,
    validateField,
    clearValidation,
    isFieldValid,
    formatPhone,
    capitalizeName,
    validateEmail,
    validatePhone,
    validateName,
  }
}
