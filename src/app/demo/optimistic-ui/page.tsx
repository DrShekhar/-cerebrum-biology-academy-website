'use client'

import { ToastProvider } from '@/components/ui/Toast'
import { OptimisticProgressCard } from '@/components/optimistic/OptimisticProgressCard'
import { OptimisticActivityFeed } from '@/components/optimistic/OptimisticActivityFeed'
import { OptimisticSettingsToggle } from '@/components/optimistic/OptimisticSettingsToggle'
import { OptimisticTestSubmission } from '@/components/optimistic/OptimisticTestSubmission'
import { OptimisticVoteButton } from '@/components/optimistic/OptimisticVoteButton'
import { Zap, Code, CheckCircle, ArrowRight } from 'lucide-react'

export default function OptimisticUIDemo() {
  const mockUserId = 'demo_user_123'

  const mockActivities = [
    {
      id: '1',
      type: 'enrollment' as const,
      message: 'Rajesh K. enrolled in NEET Dropper Program',
      location: 'Delhi',
      time: '2 min ago',
    },
    {
      id: '2',
      type: 'success' as const,
      message: 'Priya S. scored 95% in Biology test',
      location: 'Mumbai',
      time: '5 min ago',
    },
    {
      id: '3',
      type: 'demo' as const,
      message: 'Amit K. booked a demo class',
      location: 'Online',
      time: '10 min ago',
    },
  ]

  const mockAnswers = [
    { questionId: 'q1', selectedOption: 2, timeTaken: 45 },
    { questionId: 'q2', selectedOption: 1, timeTaken: 30 },
    { questionId: 'q3', selectedOption: 3, timeTaken: 60 },
    { questionId: 'q4', selectedOption: 0, timeTaken: 40 },
    { questionId: 'q5', selectedOption: 2, timeTaken: 50 },
  ]

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Optimistic UI Updates Demo
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Experience instant feedback with optimistic UI patterns - updates appear
                  immediately while syncing in the background
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-semibold text-green-900">
                      Response Time: &lt;50ms
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <Code className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-900">
                      Auto Rollback on Error
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Introduction */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Instant Update</h3>
                <p className="text-sm text-gray-600">
                  UI updates immediately when you interact, no waiting for the server
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Background Sync</h3>
                <p className="text-sm text-gray-600">
                  Your changes sync to the server in the background with visual indicators
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Error Handling</h3>
                <p className="text-sm text-gray-600">
                  If something fails, changes rollback automatically with retry options
                </p>
              </div>
            </div>
          </div>

          {/* Demo Sections */}
          <div className="space-y-12">
            {/* Section 1: Progress Updates */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">1. Progress Updates</h2>
                <p className="text-gray-600">
                  Study progress updates instantly when you complete sessions. Try clicking the
                  button below.
                </p>
              </div>
              <OptimisticProgressCard
                userId={mockUserId}
                initialProgress={{
                  score: 75,
                  improvement: 5,
                  sessionsCompleted: 12,
                  lastUpdated: new Date().toISOString(),
                }}
              />
            </section>

            {/* Section 2: Activity Feed */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">2. Live Activity Feed</h2>
                <p className="text-gray-600">
                  New activities appear instantly before server confirms. Click "Add Activity" to
                  see it in action.
                </p>
              </div>
              <OptimisticActivityFeed initialActivities={mockActivities} />
            </section>

            {/* Section 3: Settings */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">3. Settings & Preferences</h2>
                <p className="text-gray-600">
                  Settings apply immediately and sync in the background. Toggle any setting to see
                  the effect.
                </p>
              </div>
              <OptimisticSettingsToggle
                userId={mockUserId}
                initialSettings={{
                  notifications: true,
                  darkMode: false,
                  accessibility: false,
                  soundEffects: true,
                }}
              />
            </section>

            {/* Section 4: Vote Buttons */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">4. Vote & Like Actions</h2>
                <p className="text-gray-600">
                  Button states change instantly when you vote or like. Try all three variants
                  below.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Thumbs Up/Down</h4>
                  <div className="flex justify-center">
                    <OptimisticVoteButton
                      contentId="demo_1"
                      userId={mockUserId}
                      initialVotes={{ upvotes: 42, downvotes: 3, userVote: null }}
                      variant="thumbs"
                      size="lg"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Heart / Like</h4>
                  <div className="flex justify-center">
                    <OptimisticVoteButton
                      contentId="demo_2"
                      userId={mockUserId}
                      initialVotes={{ upvotes: 127, downvotes: 0, userVote: null }}
                      variant="heart"
                      size="lg"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Star / Favorite</h4>
                  <div className="flex justify-center">
                    <OptimisticVoteButton
                      contentId="demo_3"
                      userId={mockUserId}
                      initialVotes={{ upvotes: 89, downvotes: 0, userVote: null }}
                      variant="star"
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Test Submission */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">5. Test Submission</h2>
                <p className="text-gray-600">
                  Test appears as "submitted" immediately while results process in the background.
                </p>
              </div>
              <OptimisticTestSubmission
                testId="demo_test_123"
                userId={mockUserId}
                answers={mockAnswers}
              />
            </section>
          </div>

          {/* Documentation Link */}
          <div className="mt-12 bg-indigo-500 rounded-2xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
            <p className="text-blue-100 text-lg mb-6">
              Check out our comprehensive documentation for implementation details, API patterns,
              and testing strategies.
            </p>
            <a
              href="/docs/OPTIMISTIC_UI_IMPLEMENTATION.md"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <span>View Documentation</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </ToastProvider>
  )
}
