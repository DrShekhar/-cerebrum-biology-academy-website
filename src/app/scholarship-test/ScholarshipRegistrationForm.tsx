'use client'

/**
 * Scholarship test registration — public, no account needed. On success the
 * student goes straight to the exam link (resume-safe: re-registering with the
 * same phone returns the same attempt).
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, GraduationCap } from 'lucide-react'

const CLASS_OPTIONS = [
  { value: 'CLASS_11', label: 'Class 11' },
  { value: 'CLASS_12', label: 'Class 12' },
  { value: 'DROPPER', label: 'Dropper / Repeater' },
]

export function ScholarshipRegistrationForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [classLevel, setClassLevel] = useState('CLASS_12')
  const [city, setCity] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/scholarship/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          classLevel,
          city: city || undefined,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        setError(json.error || 'Registration failed. Please try again.')
        return
      }
      const token = json.data.token
      if (json.data.completed) {
        router.push(`/scholarship-test/result/${token}`)
      } else {
        router.push(`/scholarship-test/exam/${token}`)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
      id="register"
    >
      <h3 className="text-lg font-bold text-gray-900">Register free — start instantly</h3>
      <p className="mt-1 text-sm text-gray-500">
        No account needed. Your exam link starts right after registration.
      </p>

      <div className="mt-4 space-y-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength={2}
          placeholder="Student name"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          type="tel"
          minLength={8}
          placeholder="WhatsApp number (for your scorecard)"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email (optional)"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
        />
        <div className="grid grid-cols-2 gap-3">
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-600 focus:outline-none"
          >
            {CLASS_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City (optional)"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
          />
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white hover:bg-green-700 disabled:opacity-60"
      >
        {submitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <GraduationCap className="h-5 w-5" />
        )}
        Start my scholarship test
      </button>
      <p className="mt-3 text-center text-xs text-gray-400">
        One attempt per student. By registering you agree to be contacted by our admissions team
        about your result.
      </p>
    </form>
  )
}
