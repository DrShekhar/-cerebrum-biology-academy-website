'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DailyChallenge } from '@/components/mcq/DailyChallenge'
import { LeadCaptureModal } from '@/components/mcq/LeadCaptureModal'
import type { UserStats } from '@/lib/mcq/types'

export default function DailyChallengePage() {
  const [freeUserId, setFreeUserId] = useState<string | undefined>()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [showLeadCapture, setShowLeadCapture] = useState(false)

  useEffect(() => {
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
          source: 'mcq_daily_challenge',
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
            <h1 className="text-xl font-bold text-gray-800">Daily Challenge</h1>
            {userStats && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-orange-500">🔥</span>
                  <span className="font-bold">{userStats.currentStreak}</span>
                </div>
                <span className="text-blue-600 font-bold">{userStats.totalXp} XP</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <h2 className="font-bold text-gray-800 mb-2">How Daily Challenges Work</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Complete 5 questions to earn XP</li>
            <li>• Perfect score = bonus XP</li>
            <li>• New challenge every day at midnight</li>
            <li>• Compete for top ranks on the leaderboard</li>
          </ul>
        </div>

        {/* Daily Challenge Component */}
        <DailyChallenge freeUserId={freeUserId} onRequireLogin={() => setShowLeadCapture(true)} />

        {/* Stats Section */}
        {userStats && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">Your Challenge Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {userStats.dailyChallengesTotal}
                </p>
                <p className="text-sm text-gray-500">Challenges Completed</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-blue-600">{userStats.currentStreak}</p>
                <p className="text-sm text-gray-500">Current Streak</p>
              </div>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/neet-biology-mcq/leaderboard"
            className="flex-1 py-3 px-6 bg-white text-gray-800 rounded-xl font-medium text-center shadow-md hover:shadow-lg transition-shadow"
          >
            View Leaderboard
          </Link>
          <Link
            href="/neet-biology-mcq"
            className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-medium text-center hover:bg-blue-700 transition-colors"
          >
            Free Practice
          </Link>
        </div>
      </main>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        onSubmit={handleLeadCapture}
        variant="soft"
        questionsAnswered={0}
      />
    </div>
  )
}
