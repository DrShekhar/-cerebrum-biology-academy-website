'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Calendar,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ScoreData {
  biology: number
  chemistry: number
  physics: number
  total: number
}

interface ScoreComparisonProps {
  studentName: string
  beforeScore: ScoreData
  afterScore: ScoreData
  timeframe: string
  rank?: {
    before?: number
    after: number
  }
  percentile?: number
  studyHours?: number
  mockTests?: number
  animated?: boolean
}

export function ScoreComparison({
  studentName,
  beforeScore,
  afterScore,
  timeframe,
  rank,
  percentile,
  studyHours,
  mockTests,
  animated = true,
}: ScoreComparisonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 500)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(true)
    }
  }, [animated])

  const improvements = {
    biology: afterScore.biology - beforeScore.biology,
    chemistry: afterScore.chemistry - beforeScore.chemistry,
    physics: afterScore.physics - beforeScore.physics,
    total: afterScore.total - beforeScore.total,
  }

  const improvementPercentage = {
    biology: ((improvements.biology / beforeScore.biology) * 100).toFixed(1),
    chemistry: ((improvements.chemistry / beforeScore.chemistry) * 100).toFixed(1),
    physics: ((improvements.physics / beforeScore.physics) * 100).toFixed(1),
    total: ((improvements.total / beforeScore.total) * 100).toFixed(1),
  }

  const subjects = [
    { name: 'Biology', key: 'biology' as keyof ScoreData, color: 'green', maxScore: 180 },
    { name: 'Chemistry', key: 'chemistry' as keyof ScoreData, color: 'blue', maxScore: 180 },
    { name: 'Physics', key: 'physics' as keyof ScoreData, color: 'purple', maxScore: 180 },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      green: {
        bg: 'bg-green-50',
        text: 'text-green-900',
        accent: 'text-green-600',
        bar: 'bg-green-500',
        light: 'bg-green-100',
      },
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-900',
        accent: 'text-blue-600',
        bar: 'bg-blue-500',
        light: 'bg-blue-100',
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-900',
        accent: 'text-purple-600',
        bar: 'bg-purple-500',
        light: 'bg-purple-100',
      },
    }
    return colors[color as keyof typeof colors]
  }

  const AnimatedNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      if (!isVisible) return

      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setDisplayValue(Math.floor(progress * value))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, [value, duration, isVisible])

    return <span>{displayValue}</span>
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
        <h2 className="text-2xl font-bold mb-2">{studentName}&apos;s Score Transformation</h2>
        <p className="text-indigo-100">Preparation Duration: {timeframe}</p>
      </div>

      {/* Main Comparison */}
      <div className="p-8">
        {/* Total Score Comparison */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Total NEET Score</h3>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Before Score */}
            <div className="text-center">
              <div className="text-red-600 text-sm font-medium mb-2">BEFORE</div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <AnimatedNumber value={beforeScore.total} />
                <span className="text-lg text-gray-600">/720</span>
              </div>
              <div className="text-gray-600 text-sm">
                {rank?.before && `Rank: ${rank.before.toLocaleString()}`}
              </div>
            </div>

            {/* Arrow & Improvement */}
            <div className="text-center">
              <motion.div
                className="flex items-center justify-center mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <ArrowRight className="w-8 h-8 text-green-500" />
              </motion.div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold inline-block">
                +<AnimatedNumber value={improvements.total} /> marks
              </div>
              <div className="text-green-600 text-sm mt-1">
                {improvementPercentage.total}% improvement
              </div>
            </div>

            {/* After Score */}
            <div className="text-center">
              <div className="text-green-600 text-sm font-medium mb-2">AFTER</div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <AnimatedNumber value={afterScore.total} />
                <span className="text-lg text-gray-600">/720</span>
              </div>
              <div className="text-gray-600 text-sm">
                {rank?.after && `Rank: ${rank.after.toLocaleString()}`}
              </div>
            </div>
          </div>

          {/* Percentile & Stats */}
          {(percentile || studyHours || mockTests) && (
            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {percentile && (
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      <AnimatedNumber value={percentile} />%
                    </div>
                    <div className="text-gray-600 text-sm">Percentile</div>
                  </div>
                )}
                {studyHours && (
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      <AnimatedNumber value={studyHours} />h
                    </div>
                    <div className="text-gray-600 text-sm">Daily Study</div>
                  </div>
                )}
                {mockTests && (
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      <AnimatedNumber value={mockTests} />
                    </div>
                    <div className="text-gray-600 text-sm">Mock Tests</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Subject-wise Breakdown */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
            Subject-wise Performance
          </h3>

          {subjects.map((subject, index) => {
            const colors = getColorClasses(subject.color)
            const beforePercent = (beforeScore[subject.key] / subject.maxScore) * 100
            const afterPercent = (afterScore[subject.key] / subject.maxScore) * 100

            return (
              <motion.div
                key={subject.key}
                className={`${colors.bg} rounded-2xl p-6`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className={`text-lg font-bold ${colors.text}`}>{subject.name}</h4>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Before</div>
                      <div className={`font-bold ${colors.accent}`}>
                        <AnimatedNumber value={beforeScore[subject.key]} />/{subject.maxScore}
                      </div>
                    </div>
                    <ArrowRight className={`w-5 h-5 ${colors.accent}`} />
                    <div className="text-right">
                      <div className="text-sm text-gray-600">After</div>
                      <div className={`font-bold ${colors.accent}`}>
                        <AnimatedNumber value={afterScore[subject.key]} />/{subject.maxScore}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Before</span>
                      <span>{beforePercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gray-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: isVisible ? `${beforePercent}%` : 0 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>After</span>
                      <span>{afterPercent.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`${colors.bar} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: isVisible ? `${afterPercent}%` : 0 }}
                        transition={{ duration: 1, delay: 1 + index * 0.2 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Improvement Stats */}
                <div className="mt-4 flex items-center justify-between">
                  <div className={`${colors.light} px-3 py-1 rounded-full`}>
                    <span className={`text-sm font-semibold ${colors.accent}`}>
                      {improvements[subject.key] >= 0 ? '+' : ''}
                      {improvements[subject.key]} marks
                    </span>
                  </div>
                  <div className="flex items-center">
                    {improvements[subject.key] >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        improvements[subject.key] >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {improvementPercentage[subject.key]}%
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Achievement Badges */}
        {rank && (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-2xl p-6 text-center">
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h4 className="font-bold text-yellow-900 mb-2">NEET Rank Achievement</h4>
              <div className="text-2xl font-bold text-yellow-600">
                #{rank.after.toLocaleString()}
              </div>
              {rank.before && (
                <div className="text-sm text-yellow-700 mt-1">
                  Improved from #{rank.before.toLocaleString()}
                </div>
              )}
            </div>

            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-bold text-green-900 mb-2">Overall Improvement</h4>
              <div className="text-2xl font-bold text-green-600">+{improvements.total} marks</div>
              <div className="text-sm text-green-700 mt-1">
                {improvementPercentage.total}% better performance
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
