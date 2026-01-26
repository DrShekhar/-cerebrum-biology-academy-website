'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bell,
  Trophy,
  Flame,
  Target,
  Zap,
  Star,
  Medal,
  TrendingUp,
  X,
  Check,
  CheckCheck,
  Clock,
  ChevronRight,
} from 'lucide-react'

type NotificationType =
  | 'BADGE_EARNED'
  | 'LEVEL_UP'
  | 'STREAK_MILESTONE'
  | 'STREAK_AT_RISK'
  | 'STREAK_BROKEN'
  | 'GOAL_COMPLETED'
  | 'DAILY_CHALLENGE'
  | 'LEADERBOARD_CHANGE'
  | 'XP_MILESTONE'

type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'

interface GamificationNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  metadata: Record<string, unknown>
  isRead: boolean
  priority: NotificationPriority
  createdAt: string
}

interface NotificationPopoverProps {
  notifications: GamificationNotification[]
  unreadCount: number
  onMarkAsRead?: (id: string) => Promise<void>
  onMarkAllAsRead?: () => Promise<void>
  onDismiss?: (id: string) => Promise<void>
  onLoadMore?: () => void
  hasMore?: boolean
  isLoading?: boolean
  className?: string
}

const NOTIFICATION_CONFIG: Record<
  NotificationType,
  {
    icon: React.ComponentType<{ className?: string }>
    color: string
    bgColor: string
  }
> = {
  BADGE_EARNED: {
    icon: Medal,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
  },
  LEVEL_UP: {
    icon: Star,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  STREAK_MILESTONE: {
    icon: Flame,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
  STREAK_AT_RISK: {
    icon: Flame,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
  },
  STREAK_BROKEN: {
    icon: Flame,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
  },
  GOAL_COMPLETED: {
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  DAILY_CHALLENGE: {
    icon: Zap,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  LEADERBOARD_CHANGE: {
    icon: TrendingUp,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
  },
  XP_MILESTONE: {
    icon: Trophy,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
  },
}

function getTimeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(dateString).toLocaleDateString()
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDismiss,
}: {
  notification: GamificationNotification
  onMarkAsRead?: (id: string) => Promise<void>
  onDismiss?: (id: string) => Promise<void>
}) {
  const config = NOTIFICATION_CONFIG[notification.type]
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        !notification.isRead ? 'bg-blue-50/50' : ''
      }`}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${config.bgColor}`}
        >
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4
                className={`font-semibold text-gray-900 ${!notification.isRead ? 'font-bold' : ''}`}
              >
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mt-0.5 line-clamp-2">{notification.message}</p>
            </div>

            {/* Dismiss button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDismiss?.(notification.id)
              }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-400 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {getTimeAgo(notification.createdAt)}
            </span>

            {!notification.isRead && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMarkAsRead?.(notification.id)
                }}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                <Check className="w-3 h-3 mr-1" />
                Mark read
              </button>
            )}
          </div>

          {/* Priority indicator */}
          {notification.priority === 'HIGH' ||
            (notification.priority === 'URGENT' && (
              <div
                className={`mt-2 text-xs font-medium ${
                  notification.priority === 'URGENT' ? 'text-red-600' : 'text-orange-600'
                }`}
              >
                {notification.priority === 'URGENT' ? '⚡ Urgent' : '❗ Important'}
              </div>
            ))}
        </div>

        {/* Unread indicator */}
        {!notification.isRead && <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full" />}
      </div>
    </motion.div>
  )
}

export function NotificationPopover({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onLoadMore,
  hasMore = false,
  isLoading = false,
  className = '',
}: NotificationPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={popoverRef} className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <h3 className="font-bold">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-sm text-white/90 hover:text-white flex items-center"
                  >
                    <CheckCheck className="w-4 h-4 mr-1" />
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No notifications yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    You'll see achievements, streaks, and more here
                  </p>
                </div>
              ) : (
                <AnimatePresence>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={onMarkAsRead}
                      onDismiss={onDismiss}
                    />
                  ))}
                </AnimatePresence>
              )}

              {/* Load More */}
              {hasMore && (
                <button
                  onClick={onLoadMore}
                  disabled={isLoading}
                  className="w-full p-3 text-center text-sm text-blue-600 hover:bg-blue-50 font-medium transition-colors"
                >
                  {isLoading ? 'Loading...' : 'Load more'}
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 p-3">
              <button
                onClick={() => {
                  setIsOpen(false)
                  // Navigate to full notifications page
                  window.location.href = '/student/notifications'
                }}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center justify-center"
              >
                View all notifications
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
