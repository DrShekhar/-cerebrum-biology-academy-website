'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type TriggerType =
  | 'STAGE_CHANGE'
  | 'TIME_BASED'
  | 'SCORE_THRESHOLD'
  | 'INACTIVITY'
  | 'DEMO_NO_SHOW'
  | 'DEMO_COMPLETED'
  | 'OFFER_SENT'
  | 'CUSTOM'

type ActionType = 'EMAIL' | 'WHATSAPP' | 'SMS' | 'CALL_TASK' | 'NOTIFICATION' | 'TASK'

interface FollowupRule {
  id: string
  name: string
  description: string | null
  triggerType: TriggerType
  triggerCondition: any
  actionType: ActionType
  isActive: boolean
  priority: 'HOT' | 'WARM' | 'COLD'
  template: {
    id: string
    name: string
    channel: string
  } | null
  user: {
    id: string
    name: string | null
    email: string
  }
  stats?: {
    total: number
    pending: number
    completed: number
    failed: number
  }
  createdAt: Date
  updatedAt: Date
}

export default function FollowupRulesPage() {
  const [rules, setRules] = useState<FollowupRule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterTrigger, setFilterTrigger] = useState<TriggerType | 'ALL'>('ALL')
  const [filterAction, setFilterAction] = useState<ActionType | 'ALL'>('ALL')
  const [filterActive, setFilterActive] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    fetchRules()
  }, [])

  async function fetchRules() {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filterTrigger !== 'ALL') params.append('triggerType', filterTrigger)
      if (filterAction !== 'ALL') params.append('actionType', filterAction)
      if (filterActive === 'ACTIVE') params.append('isActive', 'true')
      if (filterActive === 'INACTIVE') params.append('isActive', 'false')
      if (searchTerm) params.append('search', searchTerm)

      const response = await fetch(`/api/counselor/followup/rules?${params}`, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch rules')
      }

      const data = await response.json()
      setRules(data.data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching rules:', err)
    } finally {
      setLoading(false)
    }
  }

  async function toggleRuleStatus(ruleId: string, currentStatus: boolean) {
    try {
      const response = await fetch(`/api/counselor/followup/rules/${ruleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to update rule')
      }

      fetchRules()
    } catch (err) {
      console.error('Error updating rule:', err)
    }
  }

  async function deleteRule(ruleId: string) {
    if (!confirm('Are you sure you want to delete this rule? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/counselor/followup/rules/${ruleId}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to delete rule')
      }

      fetchRules()
    } catch (err) {
      console.error('Error deleting rule:', err)
      alert('Failed to delete rule. It may be in use.')
    }
  }

  const getTriggerTypeLabel = (type: TriggerType) => {
    const labels = {
      STAGE_CHANGE: 'Stage Change',
      TIME_BASED: 'Time-Based',
      SCORE_THRESHOLD: 'Score Threshold',
      INACTIVITY: 'Inactivity',
      DEMO_NO_SHOW: 'Demo No-Show',
      DEMO_COMPLETED: 'Demo Completed',
      OFFER_SENT: 'Offer Sent',
      CUSTOM: 'Custom',
    }
    return labels[type] || type
  }

  const getActionTypeLabel = (type: ActionType) => {
    const labels = {
      EMAIL: 'Email',
      WHATSAPP: 'WhatsApp',
      SMS: 'SMS',
      CALL_TASK: 'Call Task',
      NOTIFICATION: 'Notification',
      TASK: 'Task',
    }
    return labels[type] || type
  }

  const getActionIcon = (type: ActionType) => {
    const icons = {
      EMAIL: '📧',
      WHATSAPP: '💬',
      SMS: '📱',
      CALL_TASK: '📞',
      NOTIFICATION: '🔔',
      TASK: '✓',
    }
    return icons[type] || '📋'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading follow-up rules...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-gray-900 font-semibold mb-2">Error Loading Rules</p>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchRules}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Follow-up Rules</h1>
          <p className="text-gray-600 mt-1">Manage automated follow-up rules for your leads</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          + Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Rules</p>
              <p className="text-2xl font-bold text-gray-900">{rules.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Rules</p>
              <p className="text-2xl font-bold text-gray-900">
                {rules.filter((r) => r.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Actions</p>
              <p className="text-2xl font-bold text-gray-900">
                {rules.reduce((sum, rule) => sum + (rule.stats?.pending || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {rules.reduce((sum, rule) => sum + (rule.stats?.completed || 0), 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search rules by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={filterTrigger}
              onChange={(e) => setFilterTrigger(e.target.value as TriggerType | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="ALL">All Triggers</option>
              <option value="STAGE_CHANGE">Stage Change</option>
              <option value="TIME_BASED">Time-Based</option>
              <option value="SCORE_THRESHOLD">Score Threshold</option>
              <option value="INACTIVITY">Inactivity</option>
              <option value="DEMO_NO_SHOW">Demo No-Show</option>
              <option value="DEMO_COMPLETED">Demo Completed</option>
              <option value="OFFER_SENT">Offer Sent</option>
              <option value="CUSTOM">Custom</option>
            </select>

            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value as ActionType | 'ALL')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="ALL">All Actions</option>
              <option value="EMAIL">Email</option>
              <option value="WHATSAPP">WhatsApp</option>
              <option value="SMS">SMS</option>
              <option value="CALL_TASK">Call Task</option>
              <option value="NOTIFICATION">Notification</option>
              <option value="TASK">Task</option>
            </select>

            <select
              value={filterActive}
              onChange={(e) => setFilterActive(e.target.value as 'ALL' | 'ACTIVE' | 'INACTIVE')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active Only</option>
              <option value="INACTIVE">Inactive Only</option>
            </select>

            <button
              onClick={fetchRules}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rules.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Follow-up Rules Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first automated follow-up rule to start engaging with leads automatically.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Create Your First Rule
            </button>
          </div>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                    {rule.isActive ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                        Inactive
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        rule.priority === 'HOT'
                          ? 'bg-red-100 text-red-800'
                          : rule.priority === 'WARM'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {rule.priority}
                    </span>
                  </div>

                  {rule.description && <p className="text-gray-600 mb-3">{rule.description}</p>}

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Trigger:</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded font-medium">
                        {getTriggerTypeLabel(rule.triggerType)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Action:</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-medium">
                        {getActionIcon(rule.actionType)} {getActionTypeLabel(rule.actionType)}
                      </span>
                    </div>

                    {rule.template && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Template:</span>
                        <span className="text-gray-900 font-medium">{rule.template.name}</span>
                      </div>
                    )}
                  </div>

                  {rule.stats && (
                    <div className="mt-4 flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <span className="ml-2 font-semibold text-gray-900">{rule.stats.total}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Pending:</span>
                        <span className="ml-2 font-semibold text-purple-600">
                          {rule.stats.pending}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Completed:</span>
                        <span className="ml-2 font-semibold text-green-600">
                          {rule.stats.completed}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Failed:</span>
                        <span className="ml-2 font-semibold text-red-600">{rule.stats.failed}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleRuleStatus(rule.id, rule.isActive)}
                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                      rule.isActive
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                    title={rule.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {rule.isActive ? 'Pause' : 'Activate'}
                  </button>

                  <Link
                    href={`/counselor/followup/rules/${rule.id}`}
                    className="px-3 py-2 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 font-medium transition-colors"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteRule(rule.id)}
                    className="px-3 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 font-medium transition-colors"
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Follow-up Rule</h2>
            <p className="text-gray-600 mb-4">
              Rule creation form will be implemented here. For now, please use the API directly or
              contact support.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
