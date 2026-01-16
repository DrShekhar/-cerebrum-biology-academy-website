'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, UserPlus, Loader2, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'

interface ReferralLink {
  id: string
  code: string
  name: string
}

export default function AddNewLead() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>([])

  const [formData, setFormData] = useState({
    studentName: '',
    phone: '',
    email: '',
    courseInterest: '',
    source: 'Direct',
    notes: '',
    referralLinkId: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch referral links for dropdown
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/consultant/links?status=active')
        const result = await response.json()
        if (result.success) {
          setReferralLinks(result.data.links)
        }
      } catch {
        // Silently fail - links are optional
      }
    }
    fetchLinks()
  }, [])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      const response = await fetch('/api/consultant/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.replace(/\s/g, ''),
          referralLinkId: formData.referralLinkId || undefined,
        }),
      })

      const result = await response.json()

      if (!result.success) {
        toast.error(result.error || 'Failed to create lead')
        return
      }

      toast.success('Lead created successfully!')
      router.push(`/consultant/leads/${result.data.id}`)
    } catch {
      toast.error('Failed to connect to server')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/consultant/leads"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leads
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Add New Lead</h1>
        <p className="text-gray-600 mt-1">Enter the student&apos;s details to create a new lead</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-5">
          {/* Student Name */}
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
              Student Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter student's full name"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.studentName ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.studentName && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.studentName}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+91</span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                maxLength={10}
                className={`w-full pl-14 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@example.com"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Course Interest */}
          <div>
            <label htmlFor="courseInterest" className="block text-sm font-medium text-gray-700 mb-1">
              Course Interest
            </label>
            <select
              id="courseInterest"
              name="courseInterest"
              value={formData.courseInterest}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="">Select a course</option>
              <option value="Pinnacle NEET Biology">Pinnacle NEET Biology (₹98,000)</option>
              <option value="Ascent NEET Biology">Ascent NEET Biology (₹75,000)</option>
              <option value="Pursuit NEET Biology">Pursuit NEET Biology (₹45,000)</option>
              <option value="Foundation Course">Foundation Course</option>
              <option value="Crash Course">Crash Course</option>
              <option value="Test Series">Test Series</option>
              <option value="Other">Other / Not Sure</option>
            </select>
          </div>

          {/* Source */}
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
              Lead Source
            </label>
            <select
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="Direct">Direct Contact</option>
              <option value="Referral">Word of Mouth Referral</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="YouTube">YouTube</option>
              <option value="Event">Event / Seminar</option>
              <option value="School">School Visit</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Referral Link */}
          {referralLinks.length > 0 && (
            <div>
              <label htmlFor="referralLinkId" className="block text-sm font-medium text-gray-700 mb-1">
                Associated Referral Link
              </label>
              <select
                id="referralLinkId"
                name="referralLinkId"
                value={formData.referralLinkId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
              >
                <option value="">None</option>
                {referralLinks.map((link) => (
                  <option key={link.id} value={link.id}>
                    {link.name} (/ref/{link.code})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Link this lead to one of your referral links for tracking
              </p>
            </div>
          )}

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional notes about this lead..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
          <Link
            href="/consultant/leads"
            className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Create Lead
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
