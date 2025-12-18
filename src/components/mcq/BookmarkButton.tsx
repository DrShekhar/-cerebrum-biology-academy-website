'use client'

import { useState, useEffect } from 'react'
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'

interface BookmarkButtonProps {
  questionId: string
  freeUserId: string | null
  className?: string
  size?: 'sm' | 'md'
}

export function BookmarkButton({
  questionId,
  freeUserId,
  className = '',
  size = 'sm',
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Check if question is bookmarked on mount
  useEffect(() => {
    if (!freeUserId) return

    const checkBookmark = async () => {
      try {
        const response = await fetch(
          `/api/mcq/bookmarks?freeUserId=${freeUserId}&questionId=${questionId}`
        )
        if (response.ok) {
          const data = await response.json()
          // Check if this specific question is in the bookmarks
          setIsBookmarked(
            data.data?.bookmarks?.some(
              (b: { questionId: string }) => b.questionId === questionId
            ) || false
          )
        }
      } catch (error) {
        console.error('Error checking bookmark:', error)
      }
    }

    checkBookmark()
  }, [questionId, freeUserId])

  const handleToggleBookmark = async () => {
    if (!freeUserId) {
      setToastMessage('Please sign in to bookmark questions')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
      return
    }

    setIsLoading(true)

    try {
      if (isBookmarked) {
        // Remove bookmark
        const response = await fetch(
          `/api/mcq/bookmarks?freeUserId=${freeUserId}&questionId=${questionId}`,
          { method: 'DELETE' }
        )

        if (response.ok) {
          setIsBookmarked(false)
          setToastMessage('Bookmark removed')
          setShowToast(true)
        }
      } else {
        // Add bookmark
        const response = await fetch('/api/mcq/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ freeUserId, questionId }),
        })

        if (response.ok) {
          setIsBookmarked(true)
          setToastMessage('Question bookmarked!')
          setShowToast(true)
        }
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      setToastMessage('Failed to update bookmark')
      setShowToast(true)
    } finally {
      setIsLoading(false)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const buttonSize = size === 'sm' ? 'p-1.5' : 'p-2'

  return (
    <div className="relative">
      <button
        onClick={handleToggleBookmark}
        disabled={isLoading}
        className={`${buttonSize} rounded-full transition-all duration-200 ${
          isBookmarked
            ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
            : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
        } ${className}`}
        title={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this question'}
      >
        {isLoading ? (
          <Loader2 className={`${iconSize} animate-spin`} />
        ) : isBookmarked ? (
          <BookmarkCheck className={iconSize} />
        ) : (
          <Bookmark className={iconSize} />
        )}
      </button>

      {/* Toast notification */}
      {showToast && (
        <div className="absolute top-full right-0 mt-2 z-50 animate-fade-in-up">
          <div className="bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  )
}
