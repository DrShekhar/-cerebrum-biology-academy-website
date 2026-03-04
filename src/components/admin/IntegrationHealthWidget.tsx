'use client'

import { useState, useEffect } from 'react'
import { Activity, CheckCircle, XCircle, RefreshCw } from 'lucide-react'

interface IntegrationStatus {
  name: string
  configured: boolean
  envVar: string
  category: 'messaging' | 'email' | 'payments' | 'infrastructure' | 'sms'
}

interface HealthData {
  summary: { configured: number; total: number; percentage: number }
  integrations: IntegrationStatus[]
}

const categoryLabels: Record<string, string> = {
  messaging: 'Messaging',
  email: 'Email',
  payments: 'Payments',
  sms: 'SMS',
  infrastructure: 'Infrastructure',
}

export function IntegrationHealthWidget() {
  const [data, setData] = useState<HealthData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHealth = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/health/integrations')
      const json = await res.json()
      if (json.success) {
        setData(json)
      } else {
        setError(json.error || 'Failed to fetch')
      }
    } catch {
      setError('Failed to connect')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHealth()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Integrations
          </h3>
          <button onClick={fetchHealth} className="p-1 hover:bg-gray-100 rounded">
            <RefreshCw className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <p className="text-sm text-red-600">{error || 'No data'}</p>
      </div>
    )
  }

  const grouped = data.integrations.reduce<Record<string, IntegrationStatus[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fadeInUp">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Integration Health
        </h3>
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              data.summary.percentage === 100
                ? 'bg-green-100 text-green-700'
                : data.summary.percentage >= 50
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
            }`}
          >
            {data.summary.configured}/{data.summary.total}
          </span>
          <button onClick={fetchHealth} className="p-1 hover:bg-gray-100 rounded" title="Refresh">
            <RefreshCw className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              {categoryLabels[category] || category}
            </p>
            <div className="space-y-1">
              {items.map((item) => (
                <div key={item.name} className="flex items-center justify-between py-1">
                  <span className="text-sm text-gray-700">{item.name}</span>
                  {item.configured ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
