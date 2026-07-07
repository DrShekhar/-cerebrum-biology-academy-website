'use client'

import { useState, useEffect } from 'react'
import { Zap, ArrowLeft, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

type IntegrationStatus = 'configured' | 'placeholder' | 'missing'

interface IntegrationReport {
  name: string
  category: string
  status: IntegrationStatus
  envVars: { name: string; status: IntegrationStatus }[]
}

const STATUS_META: Record<
  IntegrationStatus,
  { label: string; badge: string; icon: typeof CheckCircle; iconColor: string }
> = {
  configured: {
    label: 'Configured',
    badge: 'bg-green-100 text-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-600',
  },
  placeholder: {
    label: 'Placeholder value',
    badge: 'bg-yellow-100 text-yellow-800',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600',
  },
  missing: {
    label: 'Missing',
    badge: 'bg-red-100 text-red-800',
    icon: XCircle,
    iconColor: 'text-red-500',
  },
}

export default function IntegrationsSettingsPage() {
  const [integrations, setIntegrations] = useState<IntegrationReport[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/settings/integrations')
      const json = await res.json()
      if (json.success) {
        setIntegrations(json.data.integrations)
      } else {
        setError(json.error || 'Failed to load status')
      }
    } catch {
      setError('Failed to load status')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const categories = Array.from(new Set(integrations.map((i) => i.category)))

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link
            href="/admin/settings"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Settings
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
              <p className="text-gray-600">
                Credential status for connected services. Values are set via Vercel environment
                variables, not in this UI.
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse">
                <div className="h-5 w-40 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-full bg-gray-100 rounded mb-2" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-900 font-medium mb-2">Could not load integration status</p>
            <p className="text-sm text-gray-500 mb-4">{error}</p>
            <Button variant="outline" onClick={fetchStatus}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {integrations
                    .filter((i) => i.category === category)
                    .map((integration) => {
                      const meta = STATUS_META[integration.status]
                      const Icon = meta.icon
                      return (
                        <div
                          key={integration.name}
                          className="bg-white p-6 rounded-xl border border-gray-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-5 h-5 ${meta.iconColor}`} />
                              <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                            </div>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${meta.badge}`}
                            >
                              {meta.label}
                            </span>
                          </div>
                          <ul className="space-y-1">
                            {integration.envVars.map((v) => (
                              <li
                                key={v.name}
                                className="flex items-center justify-between text-sm"
                              >
                                <code className="text-gray-600 text-xs">{v.name}</code>
                                <span
                                  className={`text-xs px-2 py-0.5 rounded-full ${STATUS_META[v.status].badge}`}
                                >
                                  {STATUS_META[v.status].label}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
