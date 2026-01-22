'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth, SignupData } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

interface AuthFormProps {
  mode: 'signin' | 'signup'
  onModeChange?: (mode: 'signin' | 'signup') => void
  redirectTo?: string
  className?: string
}

export default function AuthForm({
  mode,
  onModeChange,
  redirectTo = '/dashboard',
  className = '',
}: AuthFormProps) {
  const { login, signup, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'STUDENT' as 'STUDENT' | 'PARENT',
    grade: '',
    curriculum: '',
    school: '',
    city: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
    rememberMe: false,
  })

  // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  })

  // Validate password in real-time
  useEffect(() => {
    if (mode === 'signup' && formData.password) {
      setPasswordValidation({
        minLength: formData.password.length >= 8,
        hasUppercase: /[A-Z]/.test(formData.password),
        hasLowercase: /[a-z]/.test(formData.password),
        hasNumber: /\d/.test(formData.password),
        hasSpecialChar: /[!@#$%^&*(),.?\":{}|<>]/.test(formData.password),
      })
    }
  }, [formData.password, mode])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      if (mode === 'signin') {
        const result = await login(formData.email, formData.password, formData.rememberMe)
        if (result.success) {
          setSuccess('Signed in successfully! Redirecting...')
          setTimeout(() => {
            router.push(returnUrl || redirectTo)
          }, 1000)
        } else {
          setError(result.error || 'Login failed')
        }
      } else {
        // Validate signup form
        const validation = validateSignupForm()
        if (!validation.valid) {
          setError(validation.error)
          return
        }

        const signupData: SignupData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
          role: formData.role,
          grade: formData.grade || undefined,
          curriculum: (formData.curriculum as any) || undefined,
          school: formData.school || undefined,
          city: formData.city || undefined,
          agreeToTerms: formData.agreeToTerms,
          subscribeNewsletter: formData.subscribeNewsletter,
        }

        const result = await signup(signupData)
        if (result.success) {
          setSuccess('Account created successfully! Welcome to Cerebrum Biology Academy!')
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        } else {
          setError(result.error || 'Signup failed')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const validateSignupForm = () => {
    if (!formData.name.trim()) {
      return { valid: false, error: 'Name is required' }
    }
    if (!formData.email.trim()) {
      return { valid: false, error: 'Email is required' }
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return { valid: false, error: 'Please enter a valid email address' }
    }
    if (!formData.password) {
      return { valid: false, error: 'Password is required' }
    }
    if (formData.password !== formData.confirmPassword) {
      return { valid: false, error: 'Passwords do not match' }
    }
    if (!Object.values(passwordValidation).every(Boolean)) {
      return { valid: false, error: 'Password does not meet security requirements' }
    }
    if (!formData.agreeToTerms) {
      return { valid: false, error: 'You must agree to the terms and conditions' }
    }
    return { valid: true, error: '' }
  }

  const isFormValid = () => {
    if (mode === 'signin') {
      return formData.email && formData.password
    } else {
      const validation = validateSignupForm()
      return validation.valid
    }
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-gray-600 mt-2">
            {mode === 'signin'
              ? 'Welcome back! Please sign in to your account'
              : 'Join thousands of students excelling in biology'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">I am a *</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                >
                  <option value="STUDENT">Student</option>
                  <option value="PARENT">Parent</option>
                </select>
              </div>
            </>
          )}

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {mode === 'signup' && (
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
          )}

          <div>
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {mode === 'signup' && (
            <>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Password strength indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`flex items-center ${passwordValidation.minLength ? 'text-green-600' : 'text-red-600'}`}
                    >
                      <span className="mr-1">{passwordValidation.minLength ? '✓' : '✗'}</span>
                      8+ characters
                    </div>
                    <div
                      className={`flex items-center ${passwordValidation.hasUppercase ? 'text-green-600' : 'text-red-600'}`}
                    >
                      <span className="mr-1">{passwordValidation.hasUppercase ? '✓' : '✗'}</span>
                      Uppercase letter
                    </div>
                    <div
                      className={`flex items-center ${passwordValidation.hasLowercase ? 'text-green-600' : 'text-red-600'}`}
                    >
                      <span className="mr-1">{passwordValidation.hasLowercase ? '✓' : '✗'}</span>
                      Lowercase letter
                    </div>
                    <div
                      className={`flex items-center ${passwordValidation.hasNumber ? 'text-green-600' : 'text-red-600'}`}
                    >
                      <span className="mr-1">{passwordValidation.hasNumber ? '✓' : '✗'}</span>
                      Number
                    </div>
                    <div
                      className={`flex items-center ${passwordValidation.hasSpecialChar ? 'text-green-600' : 'text-red-600'}`}
                    >
                      <span className="mr-1">{passwordValidation.hasSpecialChar ? '✓' : '✗'}</span>
                      Special character
                    </div>
                  </div>
                </div>
              )}

              {/* Additional fields for students */}
              {formData.role === 'STUDENT' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="grade">Grade/Class</Label>
                      <select
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                        className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="">Select Grade</option>
                        <option value="CLASS_9">Class 9</option>
                        <option value="CLASS_10">Class 10</option>
                        <option value="CLASS_11">Class 11</option>
                        <option value="CLASS_12">Class 12</option>
                        <option value="DROPPER">Dropper/Repeater</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="curriculum">Curriculum</Label>
                      <select
                        id="curriculum"
                        name="curriculum"
                        value={formData.curriculum}
                        onChange={handleInputChange}
                        className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                      >
                        <option value="">Select Curriculum</option>
                        <option value="NEET">NEET</option>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                        <option value="IB">IB</option>
                        <option value="IGCSE">IGCSE</option>
                        <option value="STATE_BOARD">State Board</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="school">School/Institution</Label>
                    <Input
                      id="school"
                      name="school"
                      type="text"
                      value={formData.school}
                      onChange={handleInputChange}
                      placeholder="Enter your school name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                    />
                  </div>
                </>
              )}

              {/* Terms and conditions */}
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                  I agree to the{' '}
                  <a
                    href="/terms-of-service"
                    className="text-blue-600 hover:underline"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline"
                    target="_blank" rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="subscribeNewsletter"
                  name="subscribeNewsletter"
                  type="checkbox"
                  checked={formData.subscribeNewsletter}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="subscribeNewsletter" className="ml-2 text-sm text-gray-700">
                  Subscribe to our newsletter for study tips and updates
                </label>
              </div>
            </>
          )}

          {mode === 'signin' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <Button
            type="submit"
            disabled={!isFormValid() || isLoading || authLoading}
            className="w-full"
          >
            {isLoading || authLoading ? (
              <LoadingSpinner size="sm" color="white" />
            ) : mode === 'signin' ? (
              'Sign In'
            ) : (
              'Create Account'
            )}
          </Button>
        </form>

        {onModeChange && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
                className="text-blue-600 hover:underline font-medium"
              >
                {mode === 'signin' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
