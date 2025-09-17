'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, User, Target, BookOpen, Brain, Clock, Gift } from 'lucide-react'
import { UserProfileService } from '@/lib/profiling/userProfileService'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface ProgressiveProfilingWidgetProps {
  className?: string
  showDelay?: number
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center'
}

export function ProgressiveProfilingWidget({
  className = '',
  showDelay = 10000, // Show after 10 seconds
  position = 'bottom-right',
}: ProgressiveProfilingWidgetProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<any>(null)
  const [isAnswering, setIsAnswering] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    // Load user profile
    const profile = UserProfileService.getProfile()
    setUserProfile(profile)

    // Check if we should show progressive profiling
    const shouldShow = shouldShowProfiling(profile)

    if (shouldShow) {
      const timer = setTimeout(() => {
        const question = UserProfileService.getNextProfilingQuestion()
        if (question) {
          setCurrentQuestion(question)
          setIsVisible(true)
        }
      }, showDelay)

      return () => clearTimeout(timer)
    }
  }, [showDelay])

  const shouldShowProfiling = (profile: any): boolean => {
    // Don't show if user has already provided core information
    if (
      profile.preferences.class &&
      profile.preferences.targetScore &&
      profile.preferences.currentLevel
    ) {
      return false
    }

    // Show to engaged users (multiple visits or time spent)
    if (profile.visitCount > 1 || profile.behavior.timeOnSite.length > 0) {
      return true
    }

    // Show if user has interacted with content
    if (profile.behavior.ctaClicked.length > 0 || profile.behavior.videosWatched.length > 0) {
      return true
    }

    return false
  }

  const handleAnswer = (answer: string) => {
    if (!currentQuestion) return

    setIsAnswering(true)

    // Process the answer based on question category
    switch (currentQuestion.category) {
      case 'class':
        const classMap: { [key: string]: '11' | '12' | 'dropper' | 'foundation' } = {
          'Class 11': '11',
          'Class 12': '12',
          'Dropper/Gap Year': 'dropper',
          'Foundation (9th/10th)': 'foundation',
        }
        UserProfileService.updatePreference('class', classMap[answer] || null)
        break

      case 'target':
        const scoreMap: { [key: string]: number } = {
          '600+': 650,
          '550-600': 575,
          '500-550': 525,
          '450-500': 475,
          'Not sure': 500,
        }
        UserProfileService.updatePreference('targetScore', scoreMap[answer] || null)
        break

      case 'level':
        const levelMap: { [key: string]: 'beginner' | 'intermediate' | 'advanced' } = {
          Beginner: 'beginner',
          Intermediate: 'intermediate',
          Advanced: 'advanced',
        }
        UserProfileService.updatePreference('currentLevel', levelMap[answer] || null)
        break

      case 'learning':
        const styleMap: { [key: string]: 'visual' | 'reading' | 'auditory' | 'kinesthetic' } = {
          'Visual (videos, diagrams)': 'visual',
          'Reading (notes, books)': 'reading',
          'Interactive (discussions)': 'auditory',
          'Mixed approach': 'visual',
        }
        UserProfileService.updatePreference('learningStyle', styleMap[answer] || null)
        break
    }

    // Track the interaction
    UserProfileService.trackCTAClick('progressive_profiling_answer', currentQuestion.category)

    // Show reward animation
    setShowReward(true)

    setTimeout(() => {
      setIsAnswering(false)
      setShowReward(false)

      // Check for next question
      const nextQuestion = UserProfileService.getNextProfilingQuestion()
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion)
      } else {
        // All done, hide widget
        setIsVisible(false)
      }
    }, 2000)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    UserProfileService.trackCTAClick(
      'progressive_profiling_dismiss',
      currentQuestion?.category || 'unknown'
    )
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-6 right-6'
      case 'bottom-left':
        return 'bottom-6 left-6'
      case 'top-right':
        return 'top-6 right-6'
      case 'top-left':
        return 'top-6 left-6'
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
      default:
        return 'bottom-6 right-6'
    }
  }

  const getQuestionIcon = (category: string) => {
    switch (category) {
      case 'class':
        return <User className="w-5 h-5" />
      case 'target':
        return <Target className="w-5 h-5" />
      case 'level':
        return <BookOpen className="w-5 h-5" />
      case 'learning':
        return <Brain className="w-5 h-5" />
      default:
        return <User className="w-5 h-5" />
    }
  }

  const getRewardMessage = (category: string) => {
    switch (category) {
      case 'class':
        return "Great! We'll customize content for your class level."
      case 'target':
        return "Perfect! We'll help you achieve this target score."
      case 'level':
        return "Excellent! We'll match content to your level."
      case 'learning':
        return "Awesome! We'll adapt to your learning style."
      default:
        return 'Thank you for helping us personalize your experience!'
    }
  }

  return (
    <AnimatePresence>
      {isVisible && currentQuestion && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className={`fixed ${getPositionClasses()} z-50 max-w-sm ${className}`}
        >
          <Card className="border-2 border-primary/20 shadow-xl bg-white">
            {showReward ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Gift className="w-8 h-8 text-green-600" />
                </motion.div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">Thank You!</h3>
                <p className="text-sm text-green-600">
                  {getRewardMessage(currentQuestion.category)}
                </p>
                <Badge className="mt-3 bg-gold-100 text-gold-800 border-gold-200">
                  <Gift className="w-3 h-3 mr-1" />
                  Unlocked Personalized Content
                </Badge>
              </motion.div>
            ) : (
              <>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {getQuestionIcon(currentQuestion.category)}
                      </div>
                      <CardTitle className="text-lg">Quick Question</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDismiss}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      30 seconds
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">Personalization</Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-gray-900 font-medium mb-4">{currentQuestion.question}</p>

                  <div className="space-y-2">
                    {currentQuestion.options.map((option: string, index: number) => (
                      <motion.div
                        key={option}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-between hover:border-primary/50 hover:bg-primary/5 text-left"
                          onClick={() => handleAnswer(option)}
                          disabled={isAnswering}
                        >
                          <span className="text-sm">{option}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                      Help us personalize your NEET Biology experience
                    </p>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for accessing user profile in components
export function useUserProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any>(null)

  useEffect(() => {
    const userProfile = UserProfileService.getProfile()
    const userRecommendations = UserProfileService.getRecommendations()

    setProfile(userProfile)
    setRecommendations(userRecommendations)
  }, [])

  const updateProfile = (updates: any) => {
    Object.keys(updates).forEach((key) => {
      if (key in updates) {
        UserProfileService.updatePreference(key as any, updates[key])
      }
    })

    // Refresh profile and recommendations
    const updatedProfile = UserProfileService.getProfile()
    const updatedRecommendations = UserProfileService.getRecommendations()

    setProfile(updatedProfile)
    setRecommendations(updatedRecommendations)
  }

  return {
    profile,
    recommendations,
    updateProfile,
    segment: profile ? UserProfileService.getUserSegment() : null,
  }
}
