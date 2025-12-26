/**
 * AI Study Buddy - Intelligent companion with adaptive personality
 * Provides emotional support, motivation, and personalized learning assistance
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Brain,
  Heart,
  Target,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Volume2,
  Smile,
  Zap,
  BookOpen,
  Award,
  Clock,
  Flame,
  Star,
} from 'lucide-react'

interface EmotionalState {
  motivation: number // 0-1
  confidence: number // 0-1
  stress: number // 0-1
  engagement: number // 0-1
  frustration: number // 0-1
}

interface PersonalityProfile {
  id: 'motivational-coach' | 'study-partner' | 'exam-warrior'
  name: string
  traits: {
    enthusiasm: number
    patience: number
    authority: number
    friendliness: number
    competitiveness: number
  }
  voiceStyle: {
    speed: number
    pitch: number
    warmth: number
  }
  messages: {
    greeting: string[]
    encouragement: string[]
    celebration: string[]
    support: string[]
    tips: string[]
  }
}

interface StudyRecommendation {
  type: 'break' | 'topic-switch' | 'review' | 'practice' | 'motivation'
  message: string
  action: string
  priority: 'low' | 'medium' | 'high'
  reasoning: string
}

interface AIStudyBuddyProps {
  studentId: string
  currentTopic?: string
  studyDuration: number // minutes
  onPersonalityChange?: (personality: string) => void
  onRecommendation?: (recommendation: StudyRecommendation) => void
}

export function AIStudyBuddy({
  studentId,
  currentTopic,
  studyDuration,
  onPersonalityChange,
  onRecommendation,
}: AIStudyBuddyProps) {
  const [currentPersonality, setCurrentPersonality] = useState<
    'motivational-coach' | 'study-partner' | 'exam-warrior'
  >('study-partner')
  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    motivation: 0.8,
    confidence: 0.7,
    stress: 0.3,
    engagement: 0.9,
    frustration: 0.2,
  })
  const [isActive, setIsActive] = useState(true)
  const [currentMessage, setCurrentMessage] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showPersonalitySelector, setShowPersonalitySelector] = useState(false)
  const [studyStreak, setStudyStreak] = useState(7)
  const [dailyGoal, setDailyGoal] = useState(120) // minutes
  const [progressToday, setProgressToday] = useState(45) // minutes

  const messageIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const emotionAnalysisRef = useRef<NodeJS.Timeout | null>(null)

  // Personality profiles
  const personalities: Record<string, PersonalityProfile> = {
    'motivational-coach': {
      id: 'motivational-coach',
      name: 'Motivational Coach',
      traits: {
        enthusiasm: 0.95,
        patience: 0.8,
        authority: 0.9,
        friendliness: 0.85,
        competitiveness: 0.9,
      },
      voiceStyle: {
        speed: 1.1,
        pitch: 0.1,
        warmth: 0.9,
      },
      messages: {
        greeting: [
          '🔥 Ready to DOMINATE Biology today, champion?',
          "⚡ Let's turn your dreams into REALITY! Biology mastery starts NOW!",
          "🚀 Today's the day you become UNSTOPPABLE in Biology!",
        ],
        encouragement: [
          "🎯 You're absolutely CRUSHING it! Keep that energy!",
          '💪 Every question you ask makes you STRONGER!',
          '⭐ I see greatness in you! Push harder!',
          '🏆 Champions are made in moments like these!',
        ],
        celebration: [
          "🎉 BOOM! That's how champions learn!",
          "🔥 You're on FIRE! Nothing can stop you now!",
          '⚡ INCREDIBLE! You just leveled up!',
          '🚀 To the moon and back! Amazing work!',
        ],
        support: [
          "💪 Tough moments build CHAMPIONS! You've got this!",
          "🎯 Remember your WHY! You're destined for greatness!",
          '⚡ Every struggle is building your SUCCESS story!',
          '🔥 Pressure creates DIAMONDS! Shine bright!',
        ],
        tips: [
          '🧠 Pro tip: Visualize success before every study session!',
          '⚡ Winners review their wins - celebrate every small victory!',
          '🎯 Make every question count - quality over quantity!',
          '🚀 Your future self will thank you for this dedication!',
        ],
      },
    },
    'study-partner': {
      id: 'study-partner',
      name: 'Study Partner',
      traits: {
        enthusiasm: 0.7,
        patience: 0.95,
        authority: 0.6,
        friendliness: 0.95,
        competitiveness: 0.5,
      },
      voiceStyle: {
        speed: 1.0,
        pitch: 0.0,
        warmth: 0.95,
      },
      messages: {
        greeting: [
          '📚 Hey buddy! Ready to explore Biology together?',
          "😊 Hi there! Let's make learning fun today!",
          "🤝 I'm here to learn alongside you! What shall we discover?",
        ],
        encouragement: [
          "🌟 You're doing really well! I'm proud of your progress!",
          '📖 I love how curious you are about Biology!',
          "😊 Your questions show you're thinking deeply!",
          "💡 That's a great insight! Keep going!",
        ],
        celebration: [
          '🎈 Yay! We did it together!',
          '😄 High five! That was awesome!',
          '🌟 Great job! I knew you could do it!',
          "📚 Another concept mastered! We're a great team!",
        ],
        support: [
          "🤗 It's okay to feel confused sometimes. We'll figure it out together!",
          "💙 Remember, every expert was once a beginner. You're growing!",
          "🌱 Learning takes time, and you're doing great!",
          "🤝 I'm here with you every step of the way!",
        ],
        tips: [
          '💡 Try connecting this to something you already know!',
          '📝 Writing notes in your own words helps retention!',
          '🔄 Regular review is the secret to long-term memory!',
          '🎯 Break big topics into smaller, manageable pieces!',
        ],
      },
    },
    'exam-warrior': {
      id: 'exam-warrior',
      name: 'Exam Warrior',
      traits: {
        enthusiasm: 0.8,
        patience: 0.7,
        authority: 0.95,
        friendliness: 0.7,
        competitiveness: 0.95,
      },
      voiceStyle: {
        speed: 1.05,
        pitch: -0.05,
        warmth: 0.7,
      },
      messages: {
        greeting: [
          "⚔️ Time for battle! Let's conquer NEET Biology!",
          '🎯 Mission: NEET Excellence. Status: Ready to execute!',
          '🏆 Today we train like champions. Tomorrow we WIN!',
        ],
        encouragement: [
          "⚡ Strategic thinking! That's how toppers approach problems!",
          '🎯 Precision and focus - exactly what NEET demands!',
          "🏆 You're building the skills that separate winners from the rest!",
          '⚔️ Disciplined approach! This is how legends are made!',
        ],
        celebration: [
          '🏆 VICTORY! Another concept in your arsenal!',
          "⚡ Flawless execution! You're ready for battle!",
          '🎯 Target acquired and destroyed! Excellent work!',
          "⚔️ That's how warriors learn! Unstoppable!",
        ],
        support: [
          '⚔️ Warriors face challenges head-on! Regroup and attack!',
          '🎯 Every setback is intel for your next victory!',
          '🏆 Champions are forged in difficulty! Keep fighting!',
          '⚡ Tactical pause! Analyze, adapt, and advance!',
        ],
        tips: [
          '🎯 NEET strategy: Master high-yield topics first!',
          '⚔️ Time management is your secret weapon!',
          "🏆 Practice like you'll perform - under pressure!",
          '⚡ Know your enemy: analyze previous year questions!',
        ],
      },
    },
  }

  // Initialize personality and start monitoring
  useEffect(() => {
    initializeStudyBuddy()
    startEmotionalMonitoring()

    return () => {
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current)
      if (emotionAnalysisRef.current) clearInterval(emotionAnalysisRef.current)
    }
  }, [])

  // Initialize study buddy
  const initializeStudyBuddy = () => {
    const personality = personalities[currentPersonality]
    const greeting =
      personality.messages.greeting[
        Math.floor(Math.random() * personality.messages.greeting.length)
      ]
    setCurrentMessage(greeting)

    // Send initial message after a short delay
    setTimeout(() => {
      speakMessage(greeting)
    }, 2000)

    // Schedule regular check-ins
    schedulePeriodicMessages()
  }

  // Start emotional monitoring
  const startEmotionalMonitoring = () => {
    emotionAnalysisRef.current = setInterval(() => {
      analyzeEmotionalState()
    }, 30000) // Every 30 seconds
  }

  // Schedule periodic messages
  const schedulePeriodicMessages = () => {
    messageIntervalRef.current = setInterval(() => {
      if (isActive) {
        sendContextualMessage()
      }
    }, 300000) // Every 5 minutes
  }

  // Analyze emotional state based on study patterns
  const analyzeEmotionalState = () => {
    const newState = { ...emotionalState }

    // Analyze study duration
    if (studyDuration > 60) {
      newState.stress = Math.min(1, newState.stress + 0.1)
      newState.engagement = Math.max(0, newState.engagement - 0.05)
    }

    if (studyDuration > 90) {
      recommendBreak()
    }

    // Analyze progress
    const progressRatio = progressToday / dailyGoal
    if (progressRatio > 0.8) {
      newState.motivation = Math.min(1, newState.motivation + 0.1)
      newState.confidence = Math.min(1, newState.confidence + 0.05)
    }

    setEmotionalState(newState)

    // Generate recommendations based on emotional state
    generateRecommendations(newState)
  }

  // Send contextual message based on current state
  const sendContextualMessage = () => {
    const personality = personalities[currentPersonality]
    let messageCategory = 'encouragement'

    // Determine message type based on emotional state
    if (emotionalState.stress > 0.7) {
      messageCategory = 'support'
    } else if (emotionalState.motivation < 0.5) {
      messageCategory = 'encouragement'
    } else if (emotionalState.confidence > 0.8) {
      messageCategory = 'celebration'
    }

    const messages = personality.messages[messageCategory as keyof typeof personality.messages]
    const message = messages[Math.floor(Math.random() * messages.length)]

    setCurrentMessage(message)
    speakMessage(message)
  }

  // Generate AI recommendations
  const generateRecommendations = (state: EmotionalState) => {
    const recommendations: StudyRecommendation[] = []

    if (state.stress > 0.7) {
      recommendations.push({
        type: 'break',
        message: 'Take a 10-minute break to recharge',
        action: 'start_break_timer',
        priority: 'high',
        reasoning: 'High stress levels detected',
      })
    }

    if (state.motivation < 0.5) {
      recommendations.push({
        type: 'motivation',
        message: 'Watch a success story for inspiration',
        action: 'show_success_stories',
        priority: 'medium',
        reasoning: 'Low motivation detected',
      })
    }

    if (studyDuration > 45 && state.engagement < 0.6) {
      recommendations.push({
        type: 'topic-switch',
        message: 'Try a different Biology topic to re-engage',
        action: 'suggest_topic_change',
        priority: 'medium',
        reasoning: 'Prolonged study with low engagement',
      })
    }

    // Send the highest priority recommendation
    if (recommendations.length > 0) {
      const highestPriority = recommendations.sort((a, b) => {
        const priorities = { high: 3, medium: 2, low: 1 }
        return priorities[b.priority] - priorities[a.priority]
      })[0]

      onRecommendation?.(highestPriority)
    }
  }

  // Recommend break
  const recommendBreak = () => {
    const personality = personalities[currentPersonality]
    const breakMessage =
      personality.id === 'motivational-coach'
        ? '⚡ Champions know when to recharge! Take a power break!'
        : personality.id === 'exam-warrior'
          ? '⚔️ Strategic rest! Even warriors need to recharge their energy!'
          : "🌿 Hey buddy, let's take a little break together!"

    setCurrentMessage(breakMessage)
    speakMessage(breakMessage)
  }

  // Speak message using TTS
  const speakMessage = async (message: string) => {
    try {
      setIsSpeaking(true)

      const personality = personalities[currentPersonality]
      const cleanMessage = message.replace(/[🔥⚡🎯💪⭐🏆🎉🚀🧠📚😊🤝🌟💡🤗💙🌱📝🔄⚔️🏆]/g, '') // Remove emojis for TTS

      const response = await fetch('/api/claudechat/voice-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          concept: 'Study Buddy Message',
          description: cleanMessage,
          neetRelevance: 'Motivational support',
          voice: 'ai-study-buddy',
          language: 'english',
          emotion: 'encouraging',
        }),
      })

      const { audioUrl } = await response.json()

      const audio = new Audio(audioUrl)
      audio.onended = () => setIsSpeaking(false)
      await audio.play()
    } catch (error) {
      console.error('TTS failed:', error)
      setIsSpeaking(false)
    }
  }

  // Change personality
  const changePersonality = (
    newPersonality: 'motivational-coach' | 'study-partner' | 'exam-warrior'
  ) => {
    setCurrentPersonality(newPersonality)
    onPersonalityChange?.(newPersonality)

    const personality = personalities[newPersonality]
    const greeting =
      personality.messages.greeting[
        Math.floor(Math.random() * personality.messages.greeting.length)
      ]
    setCurrentMessage(greeting)
    speakMessage(greeting)

    setShowPersonalitySelector(false)
  }

  // Get emotional state color
  const getEmotionalColor = (value: number, inverted = false): string => {
    if (inverted) value = 1 - value

    if (value > 0.7) return 'text-green-600'
    if (value > 0.4) return 'text-yellow-600'
    return 'text-red-600'
  }

  const currentPersonalityData = personalities[currentPersonality]

  return (
    <div className="ai-study-buddy bg-indigo-50 rounded-2xl border border-purple-200 overflow-hidden shadow-lg">
      {/* Header */}
      <div className="p-6 bg-indigo-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{currentPersonalityData.name}</h3>
              <p className="opacity-90">Your AI Study Companion</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPersonalitySelector(!showPersonalitySelector)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`p-2 rounded-lg transition-colors ${
                isActive ? 'bg-green-600' : 'bg-gray-500'
              }`}
            >
              {isActive ? '🟢' : '⭕'}
            </button>
          </div>
        </div>
      </div>

      {/* Personality Selector */}
      {showPersonalitySelector && (
        <div className="p-6 bg-white border-b">
          <h4 className="font-medium text-gray-900 mb-4">Choose Your AI Personality</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(personalities).map((personality) => (
              <button
                key={personality.id}
                onClick={() => changePersonality(personality.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  currentPersonality === personality.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{personality.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {personality.messages.greeting[0].replace(
                    /[🔥⚡🎯💪⭐🏆🎉🚀🧠📚😊🤝🌟💡🤗💙🌱📝🔄⚔️]/g,
                    ''
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Interface */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Message */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Current Message</span>
                </h4>
                {isSpeaking && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Volume2 className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">Speaking...</span>
                  </div>
                )}
              </div>
              <div className="text-gray-700 p-3 bg-gray-50 rounded-lg">{currentMessage}</div>
              <button
                onClick={() => speakMessage(currentMessage)}
                disabled={isSpeaking}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50"
              >
                🔊 Hear Message
              </button>
            </div>

            {/* Study Progress */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3">📊 Today's Progress</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Study Time</span>
                    <span>
                      {progressToday}/{dailyGoal} min
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${Math.min(100, (progressToday / dailyGoal) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{studyStreak}</div>
                    <div className="text-sm text-gray-600">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-gray-600">Focus Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emotional State */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Emotional Intelligence</span>
              </h4>
              <div className="space-y-3">
                {[
                  { label: 'Motivation', value: emotionalState.motivation, icon: Flame },
                  { label: 'Confidence', value: emotionalState.confidence, icon: Star },
                  { label: 'Engagement', value: emotionalState.engagement, icon: Zap },
                  {
                    label: 'Stress',
                    value: emotionalState.stress,
                    icon: TrendingUp,
                    inverted: true,
                  },
                ].map(({ label, value, icon: Icon, inverted }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </div>
                      <span className={getEmotionalColor(value, inverted)}>
                        {Math.round(value * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          inverted
                            ? value > 0.7
                              ? 'bg-red-500'
                              : value > 0.4
                                ? 'bg-yellow-500'
                                : 'bg-green-600'
                            : value > 0.7
                              ? 'bg-green-600'
                              : value > 0.4
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                        }`}
                        style={{ width: `${value * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-3">⚡ Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => sendContextualMessage()}
                  className="p-3 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                >
                  💬 Get Motivation
                </button>
                <button
                  onClick={() => recommendBreak()}
                  className="p-3 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100 transition-colors"
                >
                  ☕ Take Break
                </button>
                <button className="p-3 bg-purple-50 text-purple-700 rounded-lg text-sm hover:bg-purple-100 transition-colors">
                  🎯 Set Goal
                </button>
                <button className="p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm hover:bg-yellow-100 transition-colors">
                  📊 View Stats
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIStudyBuddy
