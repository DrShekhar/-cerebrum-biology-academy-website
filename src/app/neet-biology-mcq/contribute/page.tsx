'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { QuestionSubmitForm } from '@/components/mcq/QuestionSubmitForm'
import { LeadCaptureModal } from '@/components/mcq/LeadCaptureModal'
import type { UserStats, CommunityQuestion } from '@/lib/mcq/types'
import { getContributorRankDetails } from '@/lib/mcq/gamification'

export default function ContributePage() {
  const [freeUserId, setFreeUserId] = useState<string | undefined>()
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [submissions, setSubmissions] = useState<Partial<CommunityQuestion>[]>([])
  const [showLeadCapture, setShowLeadCapture] = useState(false)
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit')

  useEffect(() => {
    const storedUserId = localStorage.getItem('mcq_free_user_id')
    if (storedUserId) {
      setFreeUserId(storedUserId)
      fetchUserData(storedUserId)
    }
  }, [])

  const fetchUserData = async (userId: string) => {
    try {
      const [statsRes, submissionsRes] = await Promise.all([
        fetch(`/api/mcq/stats?freeUserId=${userId}`),
        fetch(`/api/mcq/community/submit?freeUserId=${userId}`),
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setUserStats(statsData)
      }

      if (submissionsRes.ok) {
        const submissionsData = await submissionsRes.json()
        setSubmissions(submissionsData.questions || [])
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handleLeadCapture = async (data: { phone: string; name?: string; email?: string }) => {
    try {
      const response = await fetch('/api/free-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: data.phone,
          name: data.name || `Contributor_${Date.now()}`,
          email: data.email,
          source: 'mcq_contribute',
        }),
      })

      if (response.ok) {
        const userData = await response.json()
        setFreeUserId(userData.id)
        localStorage.setItem('mcq_free_user_id', userData.id)
        setShowLeadCapture(false)
        fetchUserData(userData.id)
      }
    } catch (error) {
      console.error('Lead capture error:', error)
    }
  }

  const contributorRank = userStats?.questionsApproved
    ? getContributorRankDetails(
        userStats.questionsApproved >= 50
          ? 'EXPERT'
          : userStats.questionsApproved >= 20
            ? 'GOLD'
            : userStats.questionsApproved >= 10
              ? 'SILVER'
              : userStats.questionsApproved >= 3
                ? 'BRONZE'
                : null
      )
    : null

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-700'
      case 'REJECTED':
        return 'bg-red-100 text-red-700'
      case 'AI_APPROVED':
        return 'bg-blue-100 text-blue-700'
      case 'AI_REJECTED':
        return 'bg-orange-100 text-orange-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
            <h1 className="text-xl font-bold text-gray-800">Contribute Questions</h1>
            {contributorRank && (
              <div className="flex items-center gap-2">
                <span>{contributorRank.icon}</span>
                <span className="text-sm font-medium" style={{ color: contributorRank.color }}>
                  {contributorRank.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Contributor Stats */}
        {userStats && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="font-bold text-gray-800 mb-4">Your Contribution Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{userStats.questionsSubmitted}</p>
                <p className="text-sm text-gray-500">Submitted</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{userStats.questionsApproved}</p>
                <p className="text-sm text-gray-500">Approved</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {userStats.questionsApproved * 100}
                </p>
                <p className="text-sm text-gray-500">XP Earned</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-600">
                  {contributorRank ? contributorRank.icon : '🎯'}
                </p>
                <p className="text-sm text-gray-500">
                  {contributorRank ? contributorRank.name.split(' ')[0] : 'Contributor'}
                </p>
              </div>
            </div>

            {/* Progress to next rank */}
            {userStats.questionsApproved < 50 && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress to next rank</span>
                  <span>
                    {userStats.questionsApproved}/
                    {userStats.questionsApproved < 3
                      ? 3
                      : userStats.questionsApproved < 10
                        ? 10
                        : userStats.questionsApproved < 20
                          ? 20
                          : 50}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600"
                    style={{
                      width: `${
                        (userStats.questionsApproved /
                          (userStats.questionsApproved < 3
                            ? 3
                            : userStats.questionsApproved < 10
                              ? 10
                              : userStats.questionsApproved < 20
                                ? 20
                                : 50)) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('submit')}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-colors ${
              activeTab === 'submit'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Submit Question
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-6 rounded-xl font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            My Submissions ({submissions.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'submit' ? (
          freeUserId ? (
            <QuestionSubmitForm
              freeUserId={freeUserId}
              onSuccess={() => fetchUserData(freeUserId)}
              onRequireLogin={() => setShowLeadCapture(true)}
            />
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-6xl mb-4">✍️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Join Our Community</h2>
              <p className="text-gray-600 mb-6">
                Register to start contributing questions and earn XP rewards!
              </p>
              <button
                onClick={() => setShowLeadCapture(true)}
                className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors"
              >
                Register to Contribute
              </button>
            </div>
          )
        ) : (
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">No Submissions Yet</h2>
                <p className="text-gray-600 mb-4">
                  Start contributing questions to help fellow NEET aspirants!
                </p>
                <button
                  onClick={() => setActiveTab('submit')}
                  className="text-green-600 font-medium hover:underline"
                >
                  Submit your first question
                </button>
              </div>
            ) : (
              submissions.map((submission) => (
                <div key={submission.id} className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-800 font-medium line-clamp-2">
                        {submission.question}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">{submission.topic}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                            submission.status || 'PENDING'
                          )}`}
                        >
                          {submission.status?.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    {submission.status === 'APPROVED' && (
                      <div className="text-right">
                        <span className="text-green-600 font-bold">
                          +{submission.contributorXpAwarded || 100} XP
                        </span>
                      </div>
                    )}
                  </div>

                  {submission.status === 'REJECTED' && submission.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Reason:</span> {submission.rejectionReason}
                      </p>
                    </div>
                  )}

                  {submission.aiScore && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-gray-500">AI Score:</span>
                      <span
                        className={`text-xs font-medium ${
                          submission.aiScore >= 80
                            ? 'text-green-600'
                            : submission.aiScore >= 60
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {submission.aiScore}%
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 mt-2">
                    Submitted{' '}
                    {submission.createdAt
                      ? new Date(submission.createdAt).toLocaleDateString()
                      : 'recently'}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Rank Info */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4">Contributor Ranks</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🥉', name: 'Bronze', min: 3 },
              { icon: '🥈', name: 'Silver', min: 10 },
              { icon: '🥇', name: 'Gold', min: 20 },
              { icon: '💫', name: 'Expert', min: 50 },
            ].map((rank) => (
              <div
                key={rank.name}
                className={`text-center p-4 rounded-xl ${
                  (userStats?.questionsApproved || 0) >= rank.min
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50'
                }`}
              >
                <span className="text-3xl">{rank.icon}</span>
                <p className="font-medium text-gray-800 mt-1">{rank.name}</p>
                <p className="text-xs text-gray-500">{rank.min}+ approved</p>
              </div>
            ))}
          </div>
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
