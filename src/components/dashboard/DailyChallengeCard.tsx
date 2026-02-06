'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Flame,
  CheckCircle,
  ArrowRight,
  Loader2,
  Sparkles,
  Users,
} from 'lucide-react'

interface ChallengeData {
  id: string
  date: string
  topic?: string
  questionCount: number
  difficulty?: string
  xpReward: number
  participantCount: number
  avgScore?: number
  userCompletion?: {
    completed: boolean
  }
}

export function DailyChallengeCard() {
  const [challenge, setChallenge] = useState<ChallengeData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const freeUserId = localStorage.getItem('freeUserId')

    const fetchChallenge = async () => {
      try {
        const url = freeUserId
          ? `/api/mcq/daily-challenge?freeUserId=${freeUserId}`
          : '/api/mcq/daily-challenge'
        const res = await fetch(url)
        if (!res.ok) return
        const json = await res.json()
        if (json) {
          setChallenge(json)
        }
      } catch {
        // Supplementary widget
      } finally {
        setLoading(false)
      }
    }

    fetchChallenge()
  }, [])

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-xl p-4 sm:p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5" />
          <h3 className="text-base sm:text-lg font-bold">Daily Challenge</h3>
        </div>
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-white/60" />
        </div>
      </div>
    )
  }

  if (!challenge) return null

  const isCompleted = challenge.userCompletion?.completed

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-xl p-4 sm:p-5 text-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base sm:text-lg font-bold">Daily Challenge</h3>
              <span className="flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 font-medium">
                <Sparkles className="w-2.5 h-2.5" />
                Today
              </span>
            </div>
            {challenge.topic && (
              <p className="text-xs text-white/70">{challenge.topic}</p>
            )}
          </div>
        </div>
        {isCompleted && (
          <div className="flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Done</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1 text-xs text-white/80">
          <span className="font-medium text-white">{challenge.questionCount}</span> questions
        </div>
        {challenge.difficulty && (
          <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full capitalize">
            {challenge.difficulty}
          </span>
        )}
        <div className="flex items-center gap-1 text-xs text-white/80">
          <Sparkles className="w-3 h-3" />
          <span className="font-medium text-white">+{challenge.xpReward}</span> XP
        </div>
        {challenge.participantCount > 0 && (
          <div className="flex items-center gap-1 text-xs text-white/80 ml-auto">
            <Users className="w-3 h-3" />
            {challenge.participantCount}
          </div>
        )}
      </div>

      <Link
        href="/neet-biology-mcq/daily-challenge"
        className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
          isCompleted
            ? 'bg-white/20 hover:bg-white/30 text-white'
            : 'bg-white text-orange-600 hover:bg-white/90'
        }`}
      >
        {isCompleted ? 'View Results' : "Start Today's Challenge"}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
