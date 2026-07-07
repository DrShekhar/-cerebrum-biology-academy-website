'use client'

import { segmentContent } from '@/lib/staff/mentions'

/**
 * Renders message/comment content with @[Name](userId) markup as highlighted
 * mention chips. selfId gets a stronger highlight.
 */
export function MessageBody({ content, selfId }: { content: string; selfId?: string }) {
  const segments = segmentContent(content)
  return (
    <span className="whitespace-pre-wrap break-words">
      {segments.map((seg, i) =>
        seg.type === 'text' ? (
          <span key={i}>{seg.value}</span>
        ) : (
          <span
            key={i}
            className={`inline-block px-1 rounded font-medium ${
              selfId && seg.userId === selfId
                ? 'bg-yellow-100 text-yellow-900'
                : 'bg-blue-50 text-blue-700'
            }`}
          >
            @{seg.name}
          </span>
        )
      )}
    </span>
  )
}
