'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { TestResponse, MockTest } from '@/types/mockTest'
import {
  Trophy,
  TrendingUp,
  Clock,
  Target,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Share2,
  Download,
  RotateCcw,
  ArrowRight,
  BarChart3,
  Award,
  Brain,
  Lightbulb,
  Users,
  BookOpen,
  Eye,
} from 'lucide-react'
import { motion } from 'framer-motion'

interface TestResultsProps {
  test: MockTest
  responses: TestResponse[]
  timeTaken: number
  userClass: 'class-11' | 'class-12' | 'dropper'
  onRetakeTest: () => void
  onBackToTests: () => void
}

export function TestResults({ 
  test, 
  responses, 
  timeTaken, 
  userClass,
  onRetakeTest, 
  onBackToTests 
}: TestResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'solutions'>('overview')
  const [showAnswer, setShowAnswer] = useState<Set<string>>(new Set())

  // Calculate scores and analytics
  const totalQuestions = responses.length
  const correctAnswers = responses.filter(r => r.isCorrect).length
  const incorrectAnswers = responses.filter(r => !r.isCorrect && r.selectedAnswer).length
  const unattempted = test.questions.length - responses.length
  const totalMarks = correctAnswers * 4 - incorrectAnswers * 1 // NEET marking scheme
  const percentage = Math.round((correctAnswers / test.questions.length) * 100)
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
  
  // Estimated rank (mock calculation)
  const estimatedRank = Math.max(1, Math.floor(100000 * (1 - percentage / 100)))
  const percentile = Math.round((1 - estimatedRank / 1600000) * 100)

  // Time analysis
  const averageTimePerQuestion = Math.round(timeTaken / totalQuestions)
  const totalTimeMinutes = Math.round(timeTaken / 60)
  const timeEfficiency = Math.round((timeTaken / (test.duration * 60)) * 100)

  // Subject-wise analysis
  const subjectAnalysis = [
    {
      subject: 'Cell Biology',
      attempted: 5,
      correct: 4,
      percentage: 80,
      color: 'bg-green-600',
    },
    {
      subject: 'Genetics',
      attempted: 3,
      correct: 2,
      percentage: 67,
      color: 'bg-yellow-500',
    },
    {
      subject: 'Physiology',
      attempted: 4,
      correct: 3,
      percentage: 75,
      color: 'bg-blue-500',
    },
  ]

  // Performance insights
  const insights = [
    {
      type: 'strength',
      icon: Trophy,
      title: 'Strong Areas',
      description: 'Cell Biology, Plant Physiology',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      type: 'improvement',
      icon: Target,
      title: 'Focus Areas',
      description: 'Genetics, Molecular Biology',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      type: 'time',
      icon: Clock,
      title: 'Time Management',
      description: 'Good pacing, room for improvement',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      type: 'confidence',
      icon: Brain,
      title: 'Confidence Level',
      description: 'High confidence matches accuracy',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ]

  // Recommendations
  const recommendations = [
    {
      icon: BookOpen,
      title: 'Study NCERT Chapter 8',
      description: 'Focus on cell division and chromosomes',
      actionText: 'View Resources',
    },
    {
      icon: Target,
      title: 'Practice Genetics Problems',
      description: 'Take topic-specific test on genetics',
      actionText: 'Take Test',
    },
    {
      icon: Clock,
      title: 'Speed Enhancement',
      description: 'Practice time-bound questions daily',
      actionText: 'Start Practice',
    },
  ]

  const toggleAnswer = (questionId: string) => {
    const newSet = new Set(showAnswer)
    if (newSet.has(questionId)) {
      newSet.delete(questionId)
    } else {
      newSet.add(questionId)
    }
    setShowAnswer(newSet)
  }

  const getPerformanceMessage = () => {
    if (percentage >= 85) return { text: "Outstanding Performance!", color: "text-green-600", icon: Trophy }
    if (percentage >= 70) return { text: "Great Job!", color: "text-blue-600", icon: Star }
    if (percentage >= 50) return { text: "Good Effort!", color: "text-yellow-600", icon: Target }
    return { text: "Keep Practicing!", color: "text-orange-600", icon: TrendingUp }
  }

  const performanceMessage = getPerformanceMessage()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'detailed', label: 'Detailed Analysis', icon: Brain },
    { id: 'solutions', label: 'Solutions', icon: Eye },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-indigo-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <performanceMessage.icon className={`w-12 h-12 ${performanceMessage.color} mr-3`} />
              <h1 className="text-4xl font-bold">{performanceMessage.text}</h1>
            </div>
            <p className="text-xl text-blue-100 mb-8">Test completed successfully</p>
            
            {/* Score Card */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{percentage}%</div>
                <div className="text-blue-100">Score</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{correctAnswers}/{test.questions.length}</div>
                <div className="text-blue-100">Correct</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{estimatedRank.toLocaleString()}</div>
                <div className="text-blue-100">Est. Rank</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">{totalTimeMinutes} min</div>
                <div className="text-blue-100">Time Taken</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Performance Summary */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-600">{correctAnswers}</span>
                </div>
                <h3 className="font-semibold text-gray-900">Correct Answers</h3>
                <p className="text-gray-600 text-sm">Out of {test.questions.length} questions</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <XCircle className="w-8 h-8 text-red-500" />
                  <span className="text-2xl font-bold text-red-600">{incorrectAnswers}</span>
                </div>
                <h3 className="font-semibold text-gray-900">Incorrect Answers</h3>
                <p className="text-gray-600 text-sm">Negative marking applied</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                  <span className="text-2xl font-bold text-yellow-600">{unattempted}</span>
                </div>
                <h3 className="font-semibold text-gray-900">Unattempted</h3>
                <p className="text-gray-600 text-sm">Questions not answered</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <span className="text-2xl font-bold text-blue-600">{averageTimePerQuestion}s</span>
                </div>
                <h3 className="font-semibold text-gray-900">Avg. Time/Question</h3>
                <p className="text-gray-600 text-sm">Time efficiency: {timeEfficiency}%</p>
              </div>
            </motion.div>

            {/* Performance Insights */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Insights</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {insights.map((insight, index) => (
                  <div key={index} className={`${insight.bgColor} rounded-2xl p-6`}>
                    <insight.icon className={`w-8 h-8 ${insight.color} mb-4`} />
                    <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                    <p className="text-gray-700 text-sm">{insight.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Subject-wise Analysis */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Subject-wise Performance</h2>
              <div className="space-y-6">
                {subjectAnalysis.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                        <span className="text-sm text-gray-600">
                          {subject.correct}/{subject.attempted} ({subject.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                          className={`h-3 rounded-full ${subject.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${subject.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personalized Recommendations</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <rec.icon className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                    <Button variant="outline" size="sm">
                      {rec.actionText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Detailed Analysis Tab */}
        {activeTab === 'detailed' && (
          <div className="space-y-8">
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Performance Analysis</h2>
              
              {/* Time Distribution */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Distribution</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-2xl p-6 text-center">
                    <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">{totalTimeMinutes} min</div>
                    <div className="text-gray-600">Total Time Used</div>
                  </div>
                  <div className="bg-green-50 rounded-2xl p-6 text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">{averageTimePerQuestion}s</div>
                    <div className="text-gray-600">Average per Question</div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-6 text-center">
                    <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900">{timeEfficiency}%</div>
                    <div className="text-gray-600">Time Efficiency</div>
                  </div>
                </div>
              </div>

              {/* Confidence vs Accuracy */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Confidence vs Accuracy</h3>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <p className="text-gray-700">
                    Your confidence levels generally match your accuracy, indicating good self-assessment skills.
                    Continue building confidence through regular practice.
                  </p>
                </div>
              </div>

              {/* Rank Comparison */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rank Estimation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 rounded-2xl p-6">
                    <Award className="w-8 h-8 text-yellow-600 mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">{estimatedRank.toLocaleString()}</div>
                    <div className="text-gray-600 mb-4">Estimated All India Rank</div>
                    <p className="text-sm text-gray-700">
                      Based on current performance and historical data
                    </p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <Users className="w-8 h-8 text-blue-600 mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-2">{percentile}%ile</div>
                    <div className="text-gray-600 mb-4">Percentile Score</div>
                    <p className="text-sm text-gray-700">
                      You performed better than {percentile}% of test takers
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Solutions Tab */}
        {activeTab === 'solutions' && (
          <div className="space-y-6">
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Solutions</h2>
              
              {test.questions.map((question, index) => {
                const response = responses.find(r => r.questionId === question.id)
                const isCorrect = response?.isCorrect ?? false
                const userAnswer = response?.selectedAnswer
                
                return (
                  <div key={question.id} className="border-b border-gray-200 pb-8 mb-8 last:border-b-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-semibold">
                          Q{index + 1}
                        </span>
                        {isCorrect ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : userAnswer ? (
                          <XCircle className="w-6 h-6 text-red-500" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-yellow-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          isCorrect ? 'text-green-600' : userAnswer ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {isCorrect ? 'Correct' : userAnswer ? 'Incorrect' : 'Unattempted'}
                        </span>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAnswer(question.id)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        {showAnswer.has(question.id) ? 'Hide' : 'Show'} Solution
                      </Button>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-900 mb-4">{question.questionText}</p>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {question.options.map((option) => (
                          <div
                            key={option.id}
                            className={`p-3 rounded-lg border ${
                              option.id === question.correctAnswer
                                ? 'border-green-600 bg-green-50'
                                : option.id === userAnswer && userAnswer !== question.correctAnswer
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="font-medium mr-3">({option.id.toUpperCase()})</span>
                              <span>{option.text}</span>
                              {option.id === question.correctAnswer && (
                                <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                              )}
                              {option.id === userAnswer && userAnswer !== question.correctAnswer && (
                                <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {showAnswer.has(question.id) && (
                      <motion.div
                        className="bg-blue-50 rounded-2xl p-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="font-semibold text-blue-900 mb-3">
                          <Lightbulb className="w-5 h-5 inline mr-2" />
                          Explanation
                        </h4>
                        <p className="text-blue-800">{question.explanation}</p>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </motion.div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={onRetakeTest}>
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Test
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="w-5 h-5 mr-2" />
              Share Results
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Report
            </Button>
            <Button variant="primary" size="lg" onClick={onBackToTests}>
              <ArrowRight className="w-5 h-5 mr-2" />
              Take More Tests
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}