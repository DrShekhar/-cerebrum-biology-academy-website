'use client'

import { useState } from 'react'
import {
  User,
  Mail,
  GraduationCap,
  Users,
  Phone,
  School,
  MapPin,
  MessageSquare,
  Loader2,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface SignupFormProps {
  userId: string
  phone: string
  onComplete: (userRole?: string) => void
}

export function SignupForm({ userId, phone, onComplete }: SignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    class: '12th' as '10th' | '11th' | '12th' | 'Dropper',
    parentName: '',
    parentPhone: '',
    schoolName: '',
    city: '',
    referralSource: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/complete-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete registration')
      }

      // Store updated user data
      localStorage.setItem('user', JSON.stringify(data.user))

      // Call onComplete to redirect to dashboard with user's role
      onComplete(data.user.role)
    } catch (err: any) {
      setError(err.message || 'Failed to complete registration. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div
      className="w-full max-w-2xl mx-auto animate-fadeInUp"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Registration</h2>
        <p className="text-gray-600">Phone verified: {phone}</p>
        <p className="text-sm text-gray-500 mt-2">
          Please fill in your details to complete registration
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Class/Grade */}
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="w-4 h-4 inline mr-2" />
            Current Class/Grade *
          </label>
          <select
            id="class"
            name="class"
            required
            value={formData.class}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="10th">Class 10th</option>
            <option value="11th">Class 11th</option>
            <option value="12th">Class 12th</option>
            <option value="Dropper">NEET Dropper/Repeater</option>
          </select>
        </div>

        {/* Parent's Name */}
        <div>
          <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-2" />
            Parent/Guardian Name
          </label>
          <input
            id="parentName"
            name="parentName"
            type="text"
            value={formData.parentName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Enter parent/guardian name"
          />
        </div>

        {/* Parent's Phone */}
        <div>
          <label htmlFor="parentPhone" className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Parent/Guardian Phone
          </label>
          <input
            id="parentPhone"
            name="parentPhone"
            type="tel"
            value={formData.parentPhone}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="+91 98765 43210"
          />
        </div>

        {/* School Name */}
        <div>
          <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
            <School className="w-4 h-4 inline mr-2" />
            School/College Name
          </label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            value={formData.schoolName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Enter your school/college name"
          />
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-2" />
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
            placeholder="Enter your city"
          />
        </div>

        {/* How did you hear about us */}
        <div>
          <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="w-4 h-4 inline mr-2" />
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            value={formData.referralSource}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
          >
            <option value="">Select an option</option>
            <option value="Google Search">Google Search</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="Friend/Family">Friend or Family Referral</option>
            <option value="School/Teacher">School or Teacher</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          className="w-full bg-green-600 hover:bg-green-700 py-4 text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Completing Registration...
            </>
          ) : (
            'Complete Registration & Continue'
          )}
        </Button>
      </form>

      <p className="text-xs text-center text-gray-500 mt-6">
        * Required fields. Your information is secure and will not be shared.
      </p>
    </div>
  )
}
