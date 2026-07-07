'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { formatMention } from '@/lib/staff/mentions'

interface StaffUser {
  id: string
  name: string | null
  role: string
}

/**
 * Textarea with @mention autocomplete over /api/staff/users/search.
 * Typing "@" + ≥1 char opens a keyboard-navigable staff picker; selection
 * inserts @[Name](userId) markup (rendered as @Name by MessageBody).
 */
export function MentionTextarea({
  value,
  onChange,
  placeholder,
  rows = 3,
  disabled,
  className,
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  disabled?: boolean
  className?: string
}) {
  const [suggestions, setSuggestions] = useState<StaffUser[]>([])
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [mentionStart, setMentionStart] = useState<number | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeSuggestions = useCallback(() => {
    setSuggestions([])
    setMentionStart(null)
    setHighlightIndex(0)
  }, [])

  const detectMention = useCallback(
    (text: string, caret: number) => {
      // Find an "@word" fragment immediately before the caret.
      const upToCaret = text.slice(0, caret)
      const match = upToCaret.match(/(^|\s)@(\w[\w ]{0,30})$/)
      if (!match || match[2].length < 1) {
        closeSuggestions()
        return
      }
      const query = match[2]
      const start = caret - query.length - 1 // position of '@'
      setMentionStart(start)
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch(`/api/staff/users/search?q=${encodeURIComponent(query)}`)
          const json = await res.json()
          if (json.success) {
            setSuggestions(json.data.users)
            setHighlightIndex(0)
          }
        } catch {
          closeSuggestions()
        }
      }, 200)
    },
    [closeSuggestions]
  )

  const insertMention = (user: StaffUser) => {
    const textarea = textareaRef.current
    if (!textarea || mentionStart === null) return
    const caret = textarea.selectionStart
    const mention = formatMention(user.name || 'Teammate', user.id)
    const next = `${value.slice(0, mentionStart)}${mention} ${value.slice(caret)}`
    onChange(next)
    closeSuggestions()
    requestAnimationFrame(() => {
      const pos = mentionStart + mention.length + 1
      textarea.focus()
      textarea.setSelectionRange(pos, pos)
    })
  }

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
  })

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          detectMention(e.target.value, e.target.selectionStart)
        }}
        onKeyDown={(e) => {
          if (suggestions.length === 0) return
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setHighlightIndex((i) => (i + 1) % suggestions.length)
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setHighlightIndex((i) => (i - 1 + suggestions.length) % suggestions.length)
          } else if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault()
            insertMention(suggestions[highlightIndex])
          } else if (e.key === 'Escape') {
            closeSuggestions()
          }
        }}
        onBlur={() => {
          // Delay so a click on a suggestion still lands.
          setTimeout(closeSuggestions, 150)
        }}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={
          className ||
          'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
        }
      />
      {suggestions.length > 0 && (
        <div className="absolute left-0 bottom-full mb-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {suggestions.map((user, i) => (
            <button
              key={user.id}
              onMouseDown={(e) => {
                e.preventDefault()
                insertMention(user)
              }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between ${
                i === highlightIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
            >
              <span className="font-medium text-gray-900">{user.name || 'Unnamed'}</span>
              <span className="text-xs text-gray-500">{user.role}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
