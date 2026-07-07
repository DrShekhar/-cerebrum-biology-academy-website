'use client'

import { useState, useEffect } from 'react'
import { Lock, ArrowLeft, RefreshCw, ShieldCheck, Users } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface SecuritySummary {
  auth: {
    provider: string
    sessionMaxAge: string
    accessTokenMaxAge: string
    passwordHashing: string
    passwordMinLength: number
    twoFactorAuth: boolean
  }
  staffCounts: { role: string; count: number }[]
  recentStaff: {
    id: string
    name: string | null
    email: string | null
    role: string
    lastActiveAt: string | null
  }[]
}

export default function SecuritySettingsPage() {
  const [summary, setSummary] = useState<SecuritySummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/settings/security')
      const json = await res.json()
      if (json.success) {
        setSummary(json.data)
      } else {
        setError(json.error || 'Failed to load security summary')
      }
    } catch {
      setError('Failed to load security summary')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSummary()
  }, [])

  return (
    <AdminLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin/settings"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Settings
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-red-100 text-red-600">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Security</h1>
              <p className="text-gray-600">
                Read-only summary of authentication and staff account state
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
                <div className="h-5 w-48 bg-gray-200 rounded mb-4" />
                <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : error || !summary ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-900 font-medium mb-2">Could not load security summary</p>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <Button variant="outline" onClick={fetchSummary}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-900">Authentication</h2>
              </div>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Provider</dt>
                  <dd className="font-medium text-gray-900">{summary.auth.provider}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Session lifetime</dt>
                  <dd className="font-medium text-gray-900">{summary.auth.sessionMaxAge}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Access token lifetime</dt>
                  <dd className="font-medium text-gray-900">{summary.auth.accessTokenMaxAge}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Password hashing</dt>
                  <dd className="font-medium text-gray-900">{summary.auth.passwordHashing}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Password minimum length</dt>
                  <dd className="font-medium text-gray-900">
                    {summary.auth.passwordMinLength} characters
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Two-factor authentication</dt>
                  <dd className="font-medium text-gray-900">
                    {summary.auth.twoFactorAuth ? 'Enabled' : 'Not implemented'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Staff Accounts</h2>
              </div>
              <div className="flex gap-4 mb-6">
                {summary.staffCounts.map((s) => (
                  <div key={s.role} className="bg-gray-50 rounded-lg px-4 py-3 text-center">
                    <p className="text-2xl font-bold text-gray-900">{s.count}</p>
                    <p className="text-xs text-gray-600">{s.role}</p>
                  </div>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600 border-b border-gray-200">
                      <th className="pb-2 font-medium">Name</th>
                      <th className="pb-2 font-medium">Email</th>
                      <th className="pb-2 font-medium">Role</th>
                      <th className="pb-2 font-medium">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.recentStaff.map((s) => (
                      <tr key={s.id} className="border-b border-gray-100">
                        <td className="py-2 text-gray-900">{s.name || '—'}</td>
                        <td className="py-2 text-gray-600">{s.email || '—'}</td>
                        <td className="py-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                            {s.role}
                          </span>
                        </td>
                        <td className="py-2 text-gray-600">
                          {s.lastActiveAt ? new Date(s.lastActiveAt).toLocaleString() : 'Never'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
