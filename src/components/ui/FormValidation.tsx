'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

// Validation Rules
export interface ValidationRule {
  pattern?: RegExp
  message: string
  validateOnType?: boolean
  validateOnBlur?: boolean
  required?: boolean
  minLength?: number
  maxLength?: number
  custom?: (value: string) => boolean | string
}

export interface ValidationRules {
  [fieldName: string]: ValidationRule
}

// Default validation patterns for Indian context
export const FormValidation = {
  phone: {
    pattern: /^[6-9]\d{9}$/,
    message: 'Enter 10-digit mobile number',
    validateOnType: true,
    required: true,
  },

  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter valid email',
    validateOnBlur: true,
    required: true,
  },

  name: {
    pattern: /^[a-zA-Z\s]{2,50}$/,
    message: 'Enter valid name (2-50 characters)',
    validateOnBlur: true,
    required: true,
  },

  class: {
    pattern: /^(11|12|dropper)$/i,
    message: 'Select your class',
    required: true,
  },

  pincode: {
    pattern: /^[1-9][0-9]{5}$/,
    message: 'Enter valid 6-digit PIN code',
    validateOnType: true,
  },

  age: {
    pattern: /^(1[4-9]|[2-3][0-9])$/,
    message: 'Age must be between 14-39',
    validateOnType: true,
  },

  // Custom validation for course selection
  courseSelection: {
    custom: (value: string) => {
      const validCourses = ['basic', 'premium', 'ultimate']
      return validCourses.includes(value) || 'Please select a valid course'
    },
    message: 'Please select a course',
    required: true,
  },
}

// Validation hook for form fields
export function useFormValidation(rules: ValidationRules) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const errorRefs = useRef<Record<string, HTMLElement | null>>({})

  const validateField = (name: string, value: string): string => {
    const rule = rules[name]
    if (!rule) return ''

    // Required field validation
    if (rule.required && (!value || value.trim() === '')) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    }

    // Skip other validations if field is empty and not required
    if (!value && !rule.required) return ''

    // Pattern validation
    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message
    }

    // Length validation
    if (rule.minLength && value.length < rule.minLength) {
      return `Minimum ${rule.minLength} characters required`
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `Maximum ${rule.maxLength} characters allowed`
    }

    // Custom validation
    if (rule.custom) {
      const result = rule.custom(value)
      if (typeof result === 'string') return result
      if (!result) return rule.message
    }

    return ''
  }

  const setValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))

    const rule = rules[name]
    if (rule?.validateOnType) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const setFieldTouched = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))

    const rule = rules[name]
    if (rule?.validateOnBlur) {
      const error = validateField(name, values[name] || '')
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {}
    let isValid = true

    Object.keys(rules).forEach((name) => {
      const error = validateField(name, values[name] || '')
      newErrors[name] = error
      if (error) isValid = false
    })

    setErrors(newErrors)
    setTouched(Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {}))

    return isValid
  }

  const scrollToFirstError = () => {
    const firstErrorField = Object.keys(errors).find((key) => errors[key])
    if (firstErrorField && errorRefs.current[firstErrorField]) {
      errorRefs.current[firstErrorField]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
      errorRefs.current[firstErrorField]?.focus()
    }
  }

  const beforeSubmit = (): boolean => {
    const isValid = validateAll()

    if (!isValid) {
      setTimeout(() => scrollToFirstError(), 100)
      return false
    }

    return true
  }

  const getFieldProps = (name: string) => ({
    value: values[name] || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValue(name, e.target.value),
    onBlur: () => setFieldTouched(name),
    error: touched[name] ? errors[name] : '',
    ref: (el: HTMLElement | null) => {
      errorRefs.current[name] = el
    },
  })

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    setValue,
    setTouched: setFieldTouched,
    validateAll,
    beforeSubmit,
    scrollToFirstError,
    getFieldProps,
    isValid: Object.keys(errors).every((key) => !errors[key]),
  }
}

// Validated Input Component
interface ValidatedInputProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  error?: string
  required?: boolean
  className?: string
  icon?: React.ReactNode
}

export function ValidatedInput({
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
  className = '',
  icon,
}: ValidatedInputProps) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const hasError = error && error.length > 0
  const isValid = hasValue && !hasError

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => {
            setFocused(false)
            onBlur()
          }}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${
              hasError
                ? 'border-red-300 bg-red-50'
                : isValid
                  ? 'border-green-400 bg-green-50'
                  : focused
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-gray-300'
            }
            ${
              hasError
                ? 'focus:ring-red-500'
                : isValid
                  ? 'focus:ring-green-600'
                  : 'focus:ring-purple-500'
            }
            focus:ring-2 focus:ring-opacity-20 focus:border-transparent
          `}
        />

        {/* Validation Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <AnimatePresence mode="wait">
            {hasError && (
              <motion.div
                key="error"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
              </motion.div>
            )}
            {isValid && (
              <motion.div
                key="success"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-1 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Validated Select Component
interface ValidatedSelectProps {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur: () => void
  error?: string
  required?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}

export function ValidatedSelect({
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  options,
  placeholder = 'Select an option',
  className = '',
}: ValidatedSelectProps) {
  const hasError = error && error.length > 0
  const isValid = value.length > 0 && !hasError

  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-200 appearance-none
            ${
              hasError
                ? 'border-red-300 bg-red-50'
                : isValid
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300'
            }
            ${
              hasError
                ? 'focus:ring-red-500'
                : isValid
                  ? 'focus:ring-green-600'
                  : 'focus:ring-purple-500'
            }
            focus:ring-2 focus:ring-opacity-20 focus:border-transparent
          `}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Validation Icons */}
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
          <AnimatePresence mode="wait">
            {hasError && (
              <motion.div
                key="error"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
              </motion.div>
            )}
            {isValid && (
              <motion.div
                key="success"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-1 text-sm text-red-600"
          >
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Error Summary Component
interface ErrorSummaryProps {
  errors: Record<string, string>
  isVisible: boolean
  onClose: () => void
  title?: string
}

export function ErrorSummary({
  errors,
  isVisible,
  onClose,
  title = 'Please fix the following errors:',
}: ErrorSummaryProps) {
  const errorList = Object.entries(errors).filter(([_, error]) => error)

  if (!isVisible || errorList.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
      >
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-medium text-red-800">{title}</h3>
              </div>
              <ul className="space-y-1">
                {errorList.map(([field, error]) => (
                  <li key={field} className="text-sm text-red-700 flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    <span className="capitalize">
                      {field.replace(/([A-Z])/g, ' $1')}: {error}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={onClose}
              className="ml-3 text-red-400 hover:text-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

// Form Container with validation
interface ValidatedFormProps {
  children: React.ReactNode
  onSubmit: (values: Record<string, string>) => Promise<void> | void
  validationRules: ValidationRules
  className?: string
  showErrorSummary?: boolean
}

export function ValidatedForm({
  children,
  onSubmit,
  validationRules,
  className = '',
  showErrorSummary = true,
}: ValidatedFormProps) {
  const [showErrors, setShowErrors] = useState(false)
  const validation = useFormValidation(validationRules)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validation.beforeSubmit()) {
      setShowErrors(true)
      setTimeout(() => setShowErrors(false), 5000)
      return
    }

    validation.setIsSubmitting(true)
    try {
      await onSubmit(validation.values)
    } finally {
      validation.setIsSubmitting(false)
    }
  }

  return (
    <>
      {showErrorSummary && (
        <ErrorSummary
          errors={validation.errors}
          isVisible={showErrors}
          onClose={() => setShowErrors(false)}
        />
      )}

      <form onSubmit={handleSubmit} className={className} noValidate>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const props = child.props as Record<string, any>
            if ('name' in props && typeof props.name === 'string') {
              const fieldProps = validation.getFieldProps(props.name)
              return React.cloneElement(child, fieldProps as any)
            }
          }
          return child
        })}
      </form>
    </>
  )
}

export default FormValidation
