'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Leaderboard } from '@/components/mcq/Leaderboard'
import { LeadCaptureModal } from '@/components/mcq/LeadCaptureModal'
import type { UserStats } from '@/lib/mcq/types'

export default function LeaderboardPage() {
  const [freeUserId, setFreeUserId] = useState<string | undefined>()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [showLeadCapture, setShowLeadCapture] = useState(false)

  useEffect(() => {
    // Check for existing user
    const storedUserId = localStorage.getItem('mcq_free_user_id')
    if (storedUserId) {
      setFreeUserId(storedUserId)
      fetchUserStats(storedUserId)
    }
  }, [])

  const fetchUserStats = async (userId: string) => {
    try {
      const response = await fetch(`/api/mcq/stats?freeUserId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setUserStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLeadCapture = async (data: { phone: string; name?: string; email?: string }) => {
    try {
      const response = await fetch('/api/free-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: data.phone,
          name: data.name || `Student_${Date.now()}`,
          email: data.email,
          source: 'mcq_leaderboard',
        }),
      })

      if (response.ok) {
        const userData = await response.json()
        setFreeUserId(userData.id)
        localStorage.setItem('mcq_free_user_id', userData.id)
        setShowLeadCapture(false)
        fetchUserStats(userData.id)
      }
    } catch (error) {
      console.error('Lead capture error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/neet-biology-mcq"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <span>←</span>
              <span>Back to Practice</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">MCQ Leaderboard</h1>
            {userStats && (
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-bold">{userStats.totalXp} XP</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* User Stats Banner */}
        {userStats && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-600">{userStats.totalXp}</p>
                <p className="text-sm text-gray-500">Total XP</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">{userStats.accuracy}%</p>
                <p className="text-sm text-gray-500">Accuracy</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-600">{userStats.currentStreak}</p>
                <p className="text-sm text-gray-500">Day Streak</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">{userStats.totalQuestions}</p>
                <p className="text-sm text-gray-500">Questions</p>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <Leaderboard freeUserId={freeUserId} onRequireLogin={() => setShowLeadCapture(true)} />

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/neet-biology-mcq"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Practice More to Climb the Ranks
          </Link>
        </div>
      </main>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        onSubmit={handleLeadCapture}
        variant="soft"
        questionsAnswered={userStats?.totalQuestions || 0}
        accuracy={userStats?.accuracy || 0}
        xpEarned={userStats?.totalXp || 0}
      />
    </div>
  )
}
