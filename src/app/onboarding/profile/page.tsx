'use client'

// Force dynamic rendering to prevent Clerk auth issues during static build
export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, BookOpen, Brain, GraduationCap, ChevronRight, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import type { UserTrack } from '@/lib/userFlow'

interface TrackOption {
  id: UserTrack
  title: string
  description: string
  icon: React.ReactNode
  goals: string[]
  color: string
}

const TRACK_OPTIONS: TrackOption[] = [
  {
    id: 'NEET',
    title: 'NEET Preparation',
    description: 'Comprehensive preparation for NEET medical entrance exam',
    icon: <Target className="w-8 h-8" />,
    goals: ['NEET 2026', 'NEET 2026', 'NEET 2027', 'NEET Dropper'],
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    id: 'REGULAR',
    title: 'Regular Studies',
    description: 'Class 11 & 12 Biology curriculum and board exam preparation',
    icon: <BookOpen className="w-8 h-8" />,
    goals: ['Class 11 Biology', 'Class 12 Biology', 'CBSE Board Exam'],
    color: 'bg-green-600',
  },
]

export default function OnboardingProfilePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [step, setStep] = useState(1)

  // Step 1: Track Selection
  const [selectedTrack, setSelectedTrack] = useState<UserTrack | null>(null)

  // Step 2: Goal & Class Selection
  const [selectedGoal, setSelectedGoal] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [city, setCity] = useState('')
  const [school, setSchool] = useState('')

  // Step 3: Target Score (NEET only)
  const [targetScore, setTargetScore] = useState(600)

  const [saving, setSaving] = useState(false)

  // Handle track selection
  const handleTrackSelect = (track: UserTrack) => {
    setSelectedTrack(track)
  }

  // Handle continue to next step
  const handleContinue = () => {
    if (step === 1 && selectedTrack) {
      setStep(2)
    } else if (step === 2 && selectedGoal && selectedClass) {
      if (selectedTrack === 'NEET') {
        setStep(3)
      } else {
        // Skip target score for regular students
        handleComplete()
      }
    } else if (step === 3) {
      handleComplete()
    }
  }

  // Handle profile completion
  const handleComplete = async () => {
    setSaving(true)

    try {
      // Save profile to API
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          profile: {
            track: selectedTrack,
            goal: selectedGoal,
            targetScore: selectedTrack === 'NEET' ? targetScore : undefined,
            class: selectedClass,
            city: city || undefined,
            school: school || undefined,
            onboardingCompleted: true,
          },
        }),
      })

      if (response.ok) {
        // Redirect based on track
        if (selectedTrack === 'NEET') {
          router.push('/dashboard') // NEET Prep Center
        } else {
          router.push('/student/dashboard') // Simple Dashboard
        }
      } else {
        console.error('Failed to save profile')
        setSaving(false)
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      setSaving(false)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if no user
  if (!user) {
    router.push('/auth/signin')
    return null
  }

  const selectedTrackOption = TRACK_OPTIONS.find((t) => t.id === selectedTrack)
  const canContinue =
    (step === 1 && selectedTrack) ||
    (step === 2 && selectedGoal && selectedClass) ||
    (step === 3 && targetScore >= 300)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-full mb-4"
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Cerebrum!</h1>
          <p className="text-gray-600">Let's personalize your learning experience</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {[1, 2, selectedTrack === 'NEET' ? 3 : null].filter(Boolean).map((stepNum, idx) => (
            <React.Fragment key={stepNum}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-semibold transition-all ${
                  step >= (stepNum || 0)
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {step > (stepNum || 0) ? <CheckCircle className="w-5 h-5" /> : stepNum}
              </div>
              {idx < 2 && selectedTrack === 'NEET' && (
                <div
                  className={`h-1 w-12 rounded ${step > (stepNum || 0) ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              )}
              {idx < 1 && selectedTrack !== 'NEET' && (
                <div
                  className={`h-1 w-12 rounded ${step > (stepNum || 0) ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Track Selection */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are you preparing for?</h2>
              <p className="text-gray-600">Choose your learning path to get started</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TRACK_OPTIONS.map((track) => (
                <motion.div key={track.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={`cursor-pointer transition-all ${
                      selectedTrack === track.id
                        ? 'ring-4 ring-blue-500 shadow-xl'
                        : 'hover:shadow-lg'
                    }`}
                    onClick={() => handleTrackSelect(track.id)}
                  >
                    <CardContent className="p-6">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${track.color} text-white mb-4`}
                      >
                        {track.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{track.title}</h3>
                      <p className="text-gray-600 mb-4">{track.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">{track.goals.length} options</div>
                        {selectedTrack === track.id && (
                          <div className="flex items-center gap-1 text-blue-600 font-medium">
                            <CheckCircle className="w-5 h-5" />
                            Selected
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Goal & Details */}
        {step === 2 && selectedTrackOption && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${selectedTrackOption.color} text-white mb-4`}
              >
                {selectedTrackOption.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us more about yourself</h2>
              <p className="text-gray-600">This helps us personalize your experience</p>
            </div>

            <Card>
              <CardContent className="p-8 space-y-6">
                {/* Goal Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Goal <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedTrackOption.goals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setSelectedGoal(goal)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedGoal === goal
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{goal}</span>
                          {selectedGoal === goal && (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Class Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your class</option>
                    <option value="CLASS_10">Class 10</option>
                    <option value="CLASS_11">Class 11</option>
                    <option value="CLASS_12">Class 12</option>
                    <option value="DROPPER">Dropper (Repeat Year)</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City (Optional)
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g., Delhi, Mumbai, Bangalore"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* School */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School (Optional)
                  </label>
                  <input
                    type="text"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    placeholder="Your school name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Target Score (NEET only) */}
        {step === 3 && selectedTrack === 'NEET' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-indigo-500 text-white mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your Target Score</h2>
              <p className="text-gray-600">We'll help you track your progress towards this goal</p>
            </div>

            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{targetScore}</div>
                  <div className="text-gray-600">out of 720</div>
                </div>

                <div>
                  <input
                    type="range"
                    min="300"
                    max="720"
                    step="10"
                    value={targetScore}
                    onChange={(e) => setTargetScore(parseInt(e.target.value))}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${((targetScore - 300) / 420) * 100}%, rgb(219, 234, 254) ${((targetScore - 300) / 420) * 100}%, rgb(219, 234, 254) 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>300</span>
                    <span>500</span>
                    <span>720</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <strong>Good to know:</strong> A score of 600+ is typically required for
                      government medical colleges. Don't worry, we'll help you get there!
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={saving}>
              Back
            </Button>
          )}

          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={!canContinue || saving}
            className="ml-auto flex items-center gap-2"
          >
            {saving ? (
              <>Saving...</>
            ) : step === 3 || (step === 2 && selectedTrack === 'REGULAR') ? (
              <>Complete Setup</>
            ) : (
              <>
                Continue
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
