'use client'

import { useState } from 'react'

interface CreateLeadModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateLeadModal({ isOpen, onClose, onSuccess }: CreateLeadModalProps) {
  const [studentName, setStudentName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [courseInterest, setCourseInterest] = useState('')
  const [source, setSource] = useState('')
  const [priority, setPriority] = useState<'HOT' | 'WARM' | 'COLD'>('WARM')
  const [studentClass, setStudentClass] = useState('')
  const [notes, setNotes] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleCreate = async () => {
    // Validate required fields
    if (!studentName.trim()) {
      setError('Student name is required')
      return
    }
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    if (!phone.trim()) {
      setError('Phone number is required')
      return
    }
    if (!courseInterest.trim()) {
      setError('Course interest is required')
      return
    }

    try {
      setCreating(true)
      setError(null)

      const response = await fetch('/api/counselor/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          email,
          phone,
          courseInterest,
          source: source.trim() || 'MANUAL_ENTRY',
          priority,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create lead')
      }

      // Reset form
      setStudentName('')
      setEmail('')
      setPhone('')
      setCourseInterest('')
      setSource('')
      setPriority('WARM')
      setStudentClass('')
      setNotes('')

      onSuccess?.()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create lead')
    } finally {
      setCreating(false)
    }
  }

  const handleClose = () => {
    if (!creating) {
      setError(null)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-xl">Create New Lead</h2>
            <p className="text-sm opacity-90">Add a new student lead manually</p>
          </div>
          <button
            onClick={handleClose}
            disabled={creating}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g., Raj Kumar"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={creating}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., raj@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={creating}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., +919876543210"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={creating}
              />
              <p className="text-xs text-gray-500 mt-1">
                Include country code (e.g., +91 for India)
              </p>
            </div>

            {/* Course Interest */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Interest <span className="text-red-500">*</span>
              </label>
              <select
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={creating}
              >
                <option value="">Select a course</option>
                <option value="NEET Dropper 2025">NEET Dropper 2025</option>
                <option value="NEET 11th Foundation">NEET 11th Foundation</option>
                <option value="NEET 12th">NEET 12th</option>
                <option value="NEET Crash Course">NEET Crash Course</option>
                <option value="Foundation Course">Foundation Course</option>
                <option value="Advanced Biology">Advanced Biology</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPriority('HOT')}
                  disabled={creating}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    priority === 'HOT'
                      ? 'bg-red-100 text-red-700 border-2 border-red-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  🔥 Hot
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('WARM')}
                  disabled={creating}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    priority === 'WARM'
                      ? 'bg-orange-100 text-orange-700 border-2 border-orange-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  ⚡ Warm
                </button>
                <button
                  type="button"
                  onClick={() => setPriority('COLD')}
                  disabled={creating}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                    priority === 'COLD'
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  ❄️ Cold
                </button>
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={creating}
              >
                <option value="MANUAL_ENTRY">Manual Entry</option>
                <option value="WALK_IN">Walk-in</option>
                <option value="PHONE_CALL">Phone Call</option>
                <option value="REFERRAL">Referral</option>
                <option value="WHATSAPP">WhatsApp</option>
                <option value="EMAIL">Email</option>
                <option value="SOCIAL_MEDIA">Social Media</option>
                <option value="WEBSITE">Website</option>
                <option value="ADVERTISEMENT">Advertisement</option>
                <option value="EVENT">Event</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Student Class (Optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Class (Optional)
              </label>
              <select
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                disabled={creating}
              >
                <option value="">Select class</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Dropper">Dropper</option>
                <option value="Class 9">Class 9</option>
                <option value="Class 10">Class 10</option>
              </select>
            </div>

            {/* Notes (Optional) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information about the lead..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                disabled={creating}
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-sm text-indigo-800">
                <p className="font-medium mb-1">What happens next:</p>
                <ul className="space-y-1 text-indigo-700">
                  <li>• Lead will be created in the NEW_LEAD stage</li>
                  <li>• An initial follow-up task will be auto-created</li>
                  <li>• Lead will be assigned to you</li>
                  <li>• Activity will be logged for audit trail</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800 flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}
          <div className="flex gap-3 justify-end">
            <button
              onClick={handleClose}
              disabled={creating}
              className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={creating || !studentName || !email || !phone || !courseInterest}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {creating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Lead...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Lead
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
