'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Bell, CheckCheck, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useStaffInbox, type StaffNotification } from '@/hooks/staff/useStaffInbox'

function timeAgo(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

/**
 * The staff notification bell: live unread badge (15s poll via
 * StaffInboxProvider) + dropdown feed with mark-read and deep links.
 * surface controls where lead links point (admin vs counselor lead detail).
 */
export function StaffNotificationBell({ surface }: { surface: 'admin' | 'counselor' | 'teacher' }) {
  const { counts, fetchNotifications, markNotificationsRead } = useStaffInbox()
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<StaffNotification[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [loadingList, setLoadingList] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const unread = counts.notificationUnread
  const badge = unread > 9 ? '9+' : String(unread)

  const loadList = useCallback(
    async (before?: string) => {
      setLoadingList(true)
      try {
        const result = await fetchNotifications(before)
        setItems((prev) => (before ? [...prev, ...result.notifications] : result.notifications))
        setHasMore(result.hasMore)
      } finally {
        setLoadingList(false)
      }
    },
    [fetchNotifications]
  )

  useEffect(() => {
    if (open) void loadList()
  }, [open, loadList])

  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [open])

  const hrefFor = (n: StaffNotification): string | null => {
    if (n.leadId) {
      if (surface === 'admin') return `/admin/students/leads/${n.leadId}`
      if (surface === 'counselor') return `/counselor/leads/${n.leadId}`
      // Teachers have no lead-detail surface — show the notification body
      // in the dropdown, don't navigate somewhere they'd be bounced from.
      return null
    }
    if (n.channelId) return `/${surface}/team-chat`
    // Announcements: only the admin surface has a notices page.
    if (surface === 'admin') return n.href
    return null
  }

  const handleClick = (n: StaffNotification) => {
    if (!n.isRead) void markNotificationsRead([n.id])
    const href = hrefFor(n)
    if (href) {
      setOpen(false)
      router.push(href)
    }
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg touch-manipulation"
        aria-label={unread > 0 ? `Notifications (${unread} unread)` : 'Notifications'}
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-semibold text-gray-900 text-sm">Notifications</span>
            {unread > 0 && (
              <button
                onClick={() => {
                  void markNotificationsRead('all')
                  setItems((prev) => prev.map((n) => ({ ...n, isRead: true })))
                }}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loadingList && items.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-gray-400">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            ) : items.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">
                No notifications yet. Mentions and replies will show up here.
              </div>
            ) : (
              <>
                {items.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleClick(n)}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 ${
                      n.isRead ? 'bg-white' : 'bg-blue-50/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">{n.title}</p>
                      {!n.isRead && (
                        <span className="mt-1 w-2 h-2 bg-blue-600 rounded-full shrink-0" />
                      )}
                    </div>
                    {n.body && <p className="text-xs text-gray-600 mt-1 line-clamp-2">{n.body}</p>}
                    <p className="text-xs text-gray-400 mt-1">{timeAgo(n.createdAt)}</p>
                  </button>
                ))}
                {hasMore && (
                  <button
                    onClick={() => void loadList(items[items.length - 1]?.createdAt)}
                    disabled={loadingList}
                    className="w-full py-2 text-xs text-blue-600 hover:bg-gray-50"
                  >
                    {loadingList ? 'Loading…' : 'Load older'}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
