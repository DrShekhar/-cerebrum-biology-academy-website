'use client'

import { motion } from 'framer-motion'
import { ThumbsUp, ThumbsDown, Heart, Star, Loader2 } from 'lucide-react'
import { useOptimisticUpdate } from '@/hooks/useOptimisticUpdate'
import { useToast } from '@/components/ui/Toast'

interface VoteData {
  upvotes: number
  downvotes: number
  userVote: 'up' | 'down' | null
}

interface OptimisticVoteButtonProps {
  contentId: string
  userId: string
  initialVotes: VoteData
  variant?: 'thumbs' | 'heart' | 'star'
  size?: 'sm' | 'md' | 'lg'
}

export function OptimisticVoteButton({
  contentId,
  userId,
  initialVotes,
  variant = 'thumbs',
  size = 'md',
}: OptimisticVoteButtonProps) {
  const { showToast } = useToast()

  const { data, update, isLoading, isOptimistic } = useOptimisticUpdate<VoteData>(initialVotes, {
    onSuccess: () => {
      // Silent success - no toast for votes
    },
    onError: (error) => {
      showToast('error', 'Vote Failed', 'Could not register your vote. Please try again.')
    },
  })

  const handleVote = async (voteType: 'up' | 'down') => {
    await update(
      (current) => {
        let newUpvotes = current.upvotes
        let newDownvotes = current.downvotes
        let newUserVote: 'up' | 'down' | null = voteType

        if (current.userVote === voteType) {
          newUserVote = null
          if (voteType === 'up') newUpvotes--
          else newDownvotes--
        } else {
          if (current.userVote === 'up') newUpvotes--
          if (current.userVote === 'down') newDownvotes--

          if (voteType === 'up') newUpvotes++
          else newDownvotes++
        }

        return {
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          userVote: newUserVote,
        }
      },
      async () => {
        const response = await fetch('/api/votes/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contentId,
            userId,
            voteType: data.userVote === voteType ? null : voteType,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to register vote')
        }

        return response.json()
      }
    )
  }

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  if (variant === 'heart') {
    return (
      <motion.button
        onClick={() => handleVote('up')}
        disabled={isLoading}
        className={`${sizeClasses[size]} rounded-full transition-all disabled:opacity-50 ${
          data.userVote === 'up'
            ? 'bg-red-100 text-red-600'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } ${isOptimistic ? 'ring-2 ring-red-300' : ''}`}
        whileTap={{ scale: 0.9 }}
        animate={
          isOptimistic
            ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.3 },
              }
            : {}
        }
      >
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
          ) : (
            <Heart
              className={iconSizes[size]}
              fill={data.userVote === 'up' ? 'currentColor' : 'none'}
            />
          )}
          <span className="font-semibold">{data.upvotes}</span>
        </div>
      </motion.button>
    )
  }

  if (variant === 'star') {
    return (
      <motion.button
        onClick={() => handleVote('up')}
        disabled={isLoading}
        className={`${sizeClasses[size]} rounded-full transition-all disabled:opacity-50 ${
          data.userVote === 'up'
            ? 'bg-yellow-100 text-yellow-600'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } ${isOptimistic ? 'ring-2 ring-yellow-300' : ''}`}
        whileTap={{ scale: 0.9 }}
        animate={
          isOptimistic
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, 20, 0],
                transition: { duration: 0.4 },
              }
            : {}
        }
      >
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
          ) : (
            <Star
              className={iconSizes[size]}
              fill={data.userVote === 'up' ? 'currentColor' : 'none'}
            />
          )}
          <span className="font-semibold">{data.upvotes}</span>
        </div>
      </motion.button>
    )
  }

  return (
    <div
      className={`flex items-center space-x-2 ${isOptimistic ? 'bg-blue-50 rounded-full p-1' : ''}`}
    >
      <motion.button
        onClick={() => handleVote('up')}
        disabled={isLoading}
        className={`${sizeClasses[size]} rounded-lg transition-all disabled:opacity-50 ${
          data.userVote === 'up'
            ? 'bg-green-100 text-green-600'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        whileTap={{ scale: 0.9 }}
        animate={
          isOptimistic && data.userVote === 'up'
            ? {
                y: [-2, 0],
                transition: { duration: 0.2 },
              }
            : {}
        }
      >
        <div className="flex items-center space-x-1">
          {isLoading && data.userVote === 'up' ? (
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
          ) : (
            <ThumbsUp
              className={iconSizes[size]}
              fill={data.userVote === 'up' ? 'currentColor' : 'none'}
            />
          )}
          <span className="font-semibold">{data.upvotes}</span>
        </div>
      </motion.button>

      <motion.button
        onClick={() => handleVote('down')}
        disabled={isLoading}
        className={`${sizeClasses[size]} rounded-lg transition-all disabled:opacity-50 ${
          data.userVote === 'down'
            ? 'bg-red-100 text-red-600'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
        whileTap={{ scale: 0.9 }}
        animate={
          isOptimistic && data.userVote === 'down'
            ? {
                y: [2, 0],
                transition: { duration: 0.2 },
              }
            : {}
        }
      >
        <div className="flex items-center space-x-1">
          {isLoading && data.userVote === 'down' ? (
            <Loader2 className={`${iconSizes[size]} animate-spin`} />
          ) : (
            <ThumbsDown
              className={iconSizes[size]}
              fill={data.userVote === 'down' ? 'currentColor' : 'none'}
            />
          )}
          <span className="font-semibold">{data.downvotes}</span>
        </div>
      </motion.button>
    </div>
  )
}
