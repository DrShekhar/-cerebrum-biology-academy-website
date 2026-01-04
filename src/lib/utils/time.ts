/**
 * Relative time formatting utilities for chat and real-time displays
 */

/**
 * Formats a date to a human-readable relative time string
 * Examples: "Just now", "2m ago", "1h ago", "Yesterday"
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const target = typeof date === 'string' ? new Date(date) : date
  const diffMs = now.getTime() - target.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)

  if (diffSec < 30) {
    return 'Just now'
  }

  if (diffSec < 60) {
    return `${diffSec}s ago`
  }

  if (diffMin < 60) {
    return `${diffMin}m ago`
  }

  if (diffHour < 24) {
    return `${diffHour}h ago`
  }

  if (diffDay === 1) {
    return 'Yesterday'
  }

  if (diffDay < 7) {
    return `${diffDay}d ago`
  }

  return target.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Formats a time for display in chat (HH:MM format)
 */
export function formatChatTime(date: Date | string): string {
  const target = typeof date === 'string' ? new Date(date) : date
  return target.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}
