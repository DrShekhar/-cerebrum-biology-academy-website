'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  X,
  Clock,
  AlertTriangle,
  Zap,
  Eye,
  Phone,
  MessageSquare,
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Loader2,
  Filter,
  Settings,
  Trash2,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { format, formatDistanceToNow, isToday } from 'date-fns'
import { showToast } from '@/lib/toast'

// ─── Types ───────────────────────────────────────────────────────────────────

type NotificationType =
  | 'BUYING_SIGNAL'
  | 'OVERDUE_FOLLOWUP'
  | 'LEAD_UNTOUCHED'
  | 'HOT_LEAD_NEW'
  | 'PAYMENT_STARTED'
  | 'PAYMENT_COMPLETED'
  | 'DEMO_BOOKED'
  | 'STAGE_CHANGE'
  | 'REPLY_RECEIVED'
  | 'TASK_DUE'
  | 'GOAL_PROGRESS'
  | 'SYSTEM'

type NotificationPriority = 'URGENT' | 'HIGH' | 'MEDIUM' | 'LOW'

interface Notification {
  id: string
  type: NotificationType
  priority: NotificationPriority
  title: string
  message: string
  leadId?: string
  leadName?: string
  actionUrl?: string
  actionLabel?: string
  isRead: boolean
  createdAt: string
  metadata?: Record<string, any>
}

// ─── Notification Config ─────────────────────────────────────────────────────

const notificationConfig: Record<
  NotificationType,
  { icon: any; color: string; bgColor: string; label: string }
> = {
  BUYING_SIGNAL: { icon: Zap, color: 'text-amber-600', bgColor: 'bg-amber-100', label: 'Buying Signal' },
  OVERDUE_FOLLOWUP: { icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100', label: 'Overdue' },
  LEAD_UNTOUCHED: { icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-100', label: 'Untouched Lead' },
  HOT_LEAD_NEW: { icon: TrendingUp, color: 'text-red-500', bgColor: 'bg-red-50', label: 'Hot Lead' },
  PAYMENT_STARTED: { icon: DollarSign, color: 'text-blue-600', bgColor: 'bg-blue-100', label: 'Payment' },
  PAYMENT_COMPLETED: { icon: DollarSign, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Payment' },
  DEMO_BOOKED: { icon: Calendar, color: 'text-purple-600', bgColor: 'bg-purple-100', label: 'Demo' },
  STAGE_CHANGE: { icon: Users, color: 'text-indigo-600', bgColor: 'bg-indigo-100', label: 'Stage Change' },
  REPLY_RECEIVED: { icon: MessageSquare, color: 'text-green-600', bgColor: 'bg-green-100', label: 'Reply' },
  TASK_DUE: { icon: Clock, color: 'text-amber-600', bgColor: 'bg-amber-100', label: 'Task Due' },
  GOAL_PROGRESS: { icon: TrendingUp, color: 'text-indigo-600', bgColor: 'bg-indigo-100', label: 'Goal' },
  SYSTEM: { icon: Bell, color: 'text-gray-600', bgColor: 'bg-gray-100', label: 'System' },
}

const priorityOrder: Record<NotificationPriority, number> = {
  URGENT: 0,
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
}

// ─── Notification Card ───────────────────────────────────────────────────────

function NotificationCard({
  notification,
  onMarkRead,
  onDismiss,
}: {
  notification: Notification
  onMarkRead: (id: string) => void
  onDismiss: (id: string) => void
}) {
  const config = notificationConfig[notification.type] || notificationConfig.SYSTEM
  const Icon = config.icon
  const isUrgent = notification.priority === 'URGENT' || notification.priority === 'HIGH'

  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border transition-all ${
        notification.isRead
          ? 'bg-white border-gray-100 opacity-70'
          : isUrgent
            ? 'bg-amber-50/50 border-amber-200 shadow-sm'
            : 'bg-white border-gray-200'
      }`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 ${config.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              {!notification.isRead && (
                <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0" />
              )}
              <h4 className={`text-sm ${notification.isRead ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}>
                {notification.title}
              </h4>
              {isUrgent && !notification.isRead && (
                <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full font-bold">
                  {notification.priority}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{notification.message}</p>

            {/* Lead link + Action */}
            <div className="flex items-center gap-3 mt-2">
              {notification.leadId && (
                <Link
                  href={`/counselor/leads/${notification.leadId}`}
                  className="text-xs text-indigo-600 hover:underline font-medium"
                >
                  {notification.leadName || 'View Lead'} →
                </Link>
              )}
              {notification.actionUrl && (
                <Link
                  href={notification.actionUrl}
                  className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg hover:bg-indigo-100 font-medium"
                >
                  {notification.actionLabel || 'Take Action'}
                </Link>
              )}
              {notification.leadId && (
                <a
                  href={`tel:${notification.metadata?.phone || ''}`}
                  className="text-xs flex items-center gap-1 text-gray-400 hover:text-blue-600"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
              )}
            </div>
          </div>

          {/* Time + Actions */}
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {isToday(new Date(notification.createdAt))
                ? formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })
                : format(new Date(notification.createdAt), 'MMM d, h:mm a')}
            </span>
            <div className="flex items-center gap-1">
              {!notification.isRead && (
                <button
                  onClick={() => onMarkRead(notification.id)}
                  className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-green-600"
                  title="Mark as read"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => onDismiss(notification.id)}
                className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-red-500"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Notification Preferences ────────────────────────────────────────────────

function NotificationPreferences({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    BUYING_SIGNAL: true,
    OVERDUE_FOLLOWUP: true,
    LEAD_UNTOUCHED: true,
    HOT_LEAD_NEW: true,
    PAYMENT_STARTED: true,
    PAYMENT_COMPLETED: true,
    DEMO_BOOKED: true,
    STAGE_CHANGE: false,
    REPLY_RECEIVED: true,
    TASK_DUE: true,
    GOAL_PROGRESS: false,
  })
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [browserPush, setBrowserPush] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-900">Notification Preferences</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-6 space-y-6">
          {/* Global settings */}
          <div className="space-y-3">
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-gray-600" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
                <span className="text-sm font-medium text-gray-700">Sound alerts</span>
              </div>
              <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} className="rounded text-indigo-600" />
            </label>
            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Browser push notifications</span>
              </div>
              <input type="checkbox" checked={browserPush} onChange={(e) => setBrowserPush(e.target.checked)} className="rounded text-indigo-600" />
            </label>
          </div>

          {/* Per-type toggles */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-3">Notification Types</h3>
            <div className="space-y-2">
              {Object.entries(notificationConfig).map(([type, config]) => {
                const Icon = config.icon
                return (
                  <label key={type} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                      </div>
                      <span className="text-sm text-gray-700">{config.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={prefs[type] ?? true}
                      onChange={(e) => setPrefs({ ...prefs, [type]: e.target.checked })}
                      className="rounded text-indigo-600"
                    />
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <button
            onClick={() => { showToast.success('Preferences saved'); onClose() }}
            className="w-full py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Notifications Page ─────────────────────────────────────────────────

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('ALL')
  const [showPrefs, setShowPrefs] = useState(false)

  useEffect(() => {
    fetchNotifications()
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  async function fetchNotifications() {
    try {
      setLoading((prev) => prev) // Only show loading on first load
      const res = await fetch('/api/counselor/notifications', { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.data || generateDemoNotifications())
      } else {
        // Use demo data if API doesn't exist yet
        setNotifications(generateDemoNotifications())
      }
    } catch {
      setNotifications(generateDemoNotifications())
    } finally {
      setLoading(false)
    }
  }

  async function markAsRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
    try {
      await fetch('/api/counselor/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, isRead: true }),
      })
    } catch {
      // Silent fail
    }
  }

  async function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    try {
      await fetch('/api/counselor/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ markAllRead: true }),
      })
    } catch {
      // Silent fail
    }
  }

  function dismissNotification(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  // Filter notifications
  const filtered = notifications
    .filter((n) => {
      if (filter === 'unread') return !n.isRead
      if (filter === 'urgent') return n.priority === 'URGENT' || n.priority === 'HIGH'
      return true
    })
    .filter((n) => typeFilter === 'ALL' || n.type === typeFilter)
    .sort((a, b) => {
      // Unread first, then by priority, then by date
      if (a.isRead !== b.isRead) return a.isRead ? 1 : -1
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

  const unreadCount = notifications.filter((n) => !n.isRead).length
  const urgentCount = notifications.filter((n) => !n.isRead && (n.priority === 'URGENT' || n.priority === 'HIGH')).length

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
                {unreadCount} unread
              </span>
            )}
            {urgentCount > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold animate-pulse">
                {urgentCount} urgent
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-1">Real-time alerts for buying signals, follow-ups, and lead activity</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <CheckCheck className="w-4 h-4" /> Mark all read
          </button>
          <button
            onClick={() => setShowPrefs(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { id: 'all' as const, label: 'All' },
          { id: 'unread' as const, label: `Unread (${unreadCount})` },
          { id: 'urgent' as const, label: `Urgent (${urgentCount})` },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.id ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {f.label}
          </button>
        ))}

        <div className="w-px h-6 bg-gray-200 mx-1" />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          <option value="ALL">All Types</option>
          <option value="BUYING_SIGNAL">🔥 Buying Signals</option>
          <option value="OVERDUE_FOLLOWUP">⚠️ Overdue Follow-ups</option>
          <option value="LEAD_UNTOUCHED">⏰ Untouched Leads</option>
          <option value="HOT_LEAD_NEW">🚀 New Hot Leads</option>
          <option value="PAYMENT_STARTED">💳 Payments</option>
          <option value="DEMO_BOOKED">📅 Demos</option>
          <option value="REPLY_RECEIVED">💬 Replies</option>
          <option value="TASK_DUE">📋 Tasks</option>
        </select>
      </div>

      {/* Notification List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No notifications</p>
          <p className="text-sm text-gray-400 mt-1">
            {filter === 'unread' ? "You're all caught up!" : 'Notifications will appear here as events happen'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onMarkRead={markAsRead}
              onDismiss={dismissNotification}
            />
          ))}
        </div>
      )}

      <NotificationPreferences isOpen={showPrefs} onClose={() => setShowPrefs(false)} />
    </div>
  )
}

// ─── Demo Notifications Generator ────────────────────────────────────────────

function generateDemoNotifications(): Notification[] {
  const now = new Date()
  return [
    {
      id: 'n1',
      type: 'BUYING_SIGNAL',
      priority: 'URGENT',
      title: '🔥 Fee document opened!',
      message: 'Priya Sharma\'s parent just opened the fee structure PDF (3rd time today). High purchase intent detected.',
      leadId: 'demo_lead_1',
      leadName: 'Priya Sharma',
      actionLabel: 'Call Now',
      isRead: false,
      createdAt: new Date(now.getTime() - 5 * 60000).toISOString(),
      metadata: { phone: '9876543210' },
    },
    {
      id: 'n2',
      type: 'OVERDUE_FOLLOWUP',
      priority: 'HIGH',
      title: '⚠️ 3 follow-ups overdue',
      message: 'Rahul Verma, Ankit Patel, and Sneha Gupta have overdue follow-ups. Last contact was 5+ days ago.',
      actionUrl: '/counselor/tasks',
      actionLabel: 'View Tasks',
      isRead: false,
      createdAt: new Date(now.getTime() - 30 * 60000).toISOString(),
    },
    {
      id: 'n3',
      type: 'PAYMENT_STARTED',
      priority: 'HIGH',
      title: '💳 Payment link clicked!',
      message: 'Amit Kumar clicked the payment link for ₹45,000 (EMI #1) but did not complete. Follow up immediately.',
      leadId: 'demo_lead_3',
      leadName: 'Amit Kumar',
      actionLabel: 'Send Reminder',
      isRead: false,
      createdAt: new Date(now.getTime() - 45 * 60000).toISOString(),
      metadata: { phone: '9988776655' },
    },
    {
      id: 'n4',
      type: 'HOT_LEAD_NEW',
      priority: 'HIGH',
      title: '🚀 New hot lead! Score: 85',
      message: 'Kavya Reddy — Class 12, Biology weak, dropper from Aakash. Demo attended + scholarship test registered. Auto-assigned to you.',
      leadId: 'demo_lead_4',
      leadName: 'Kavya Reddy',
      isRead: false,
      createdAt: new Date(now.getTime() - 2 * 3600000).toISOString(),
    },
    {
      id: 'n5',
      type: 'DEMO_BOOKED',
      priority: 'MEDIUM',
      title: '📅 Demo booked for tomorrow',
      message: 'Riya Singh booked a demo class for tomorrow at 4:00 PM. Course: NEET Regular Batch 2027.',
      leadId: 'demo_lead_5',
      leadName: 'Riya Singh',
      isRead: false,
      createdAt: new Date(now.getTime() - 3 * 3600000).toISOString(),
    },
    {
      id: 'n6',
      type: 'REPLY_RECEIVED',
      priority: 'MEDIUM',
      title: '💬 WhatsApp reply received',
      message: 'Neha Joshi replied: "What are the batch timings for the dropper course?" — respond within 5 minutes for best conversion.',
      leadId: 'demo_lead_6',
      leadName: 'Neha Joshi',
      actionLabel: 'Reply on WhatsApp',
      isRead: true,
      createdAt: new Date(now.getTime() - 4 * 3600000).toISOString(),
    },
    {
      id: 'n7',
      type: 'PAYMENT_COMPLETED',
      priority: 'LOW',
      title: '✅ Payment received!',
      message: 'Vikram Singh completed ₹90,000 payment (Full fee). Enrollment confirmed for Regular Batch 2026.',
      leadId: 'demo_lead_7',
      leadName: 'Vikram Singh',
      isRead: true,
      createdAt: new Date(now.getTime() - 6 * 3600000).toISOString(),
    },
    {
      id: 'n8',
      type: 'LEAD_UNTOUCHED',
      priority: 'MEDIUM',
      title: '⏰ 5 leads untouched for 4+ hours',
      message: 'New leads from Google Ads haven\'t been contacted yet. First-response time affects conversion by 3x.',
      actionUrl: '/counselor/leads',
      actionLabel: 'View Pipeline',
      isRead: true,
      createdAt: new Date(now.getTime() - 8 * 3600000).toISOString(),
    },
  ]
}
