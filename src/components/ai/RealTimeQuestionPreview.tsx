'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Maximize2,
  Minimize2,
  Settings,
  Clock,
  Target,
  BookOpen,
  Zap,
  RefreshCw,
  Edit3,
  X
} from 'lucide-react'

interface Question {
  id: string
  question: string
  type: 'mcq' | 'assertion' | 'numerical' | 'matching'
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  topic: string
  subtopic: string
  chapter: string
  marks: number
  estimatedTime: number
  bloomsLevel: string
  tags: string[]
  hints: string[]
}

interface PreviewConfiguration {
  showAnswers: boolean
  showExplanations: boolean
  showHints: boolean
  showTimer: boolean
  viewMode: 'student' | 'teacher' | 'review'
  layout: 'compact' | 'detailed' | 'mobile'
  autoAdvance: boolean
  previewSpeed: number
}

interface RealTimeQuestionPreviewProps {
  questions: Question[]
  currentIndex: number
  onIndexChange: (index: number) => void
  onQuestionEdit: (questionId: string) => void
  isGenerating: boolean
}

const RealTimeQuestionPreview: React.FC<RealTimeQuestionPreviewProps> = ({
  questions,
  currentIndex,
  onIndexChange,
  onQuestionEdit,
  isGenerating
}) => {
  const [config, setConfig] = useState<PreviewConfiguration>({
    showAnswers: false,
    showExplanations: false,
    showHints: false,
    showTimer: true,
    viewMode: 'student',
    layout: 'detailed',
    autoAdvance: false,
    previewSpeed: 3000
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [showConfig, setShowConfig] = useState(false)

  const currentQuestion = questions[currentIndex]

  // Auto-advance functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && config.autoAdvance && questions.length > 0) {
      interval = setInterval(() => {
        if (currentIndex < questions.length - 1) {
          onIndexChange(currentIndex + 1)
        } else {
          setIsPlaying(false)
        }
      }, config.previewSpeed)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentIndex, questions.length, config.autoAdvance, config.previewSpeed, onIndexChange])

  // Timer functionality
  useEffect(() => {
    if (currentQuestion && config.showTimer) {
      setTimeRemaining(currentQuestion.estimatedTime)
      let interval: NodeJS.Timeout
      if (isPlaying) {
        interval = setInterval(() => {
          setTimeRemaining(prev => Math.max(0, prev - 1))
        }, 1000)
      }
      return () => clearInterval(interval)
    }
  }, [currentQuestion, config.showTimer, isPlaying])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      onIndexChange(currentIndex + 1)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50 border-green-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'hard': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  if (isGenerating) {
    return (
      <div className="bg-white rounded-xl p-8 border">
        <div className="text-center space-y-4">
          <RefreshCw className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
          <h3 className="text-xl font-semibold text-gray-800">Generating Questions...</h3>
          <p className="text-gray-600">AI is creating your test questions. Preview will appear here.</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    )
  }

  if (!currentQuestion || questions.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 border">
        <div className="text-center space-y-4 text-gray-500">
          <Eye className="w-12 h-12 mx-auto" />
          <h3 className="text-xl font-semibold">No Questions to Preview</h3>
          <p>Generate some questions to see the live preview here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-4 z-50 bg-white p-6 rounded-xl shadow-2xl overflow-y-auto' : ''}`}>
      {/* Preview Header */}
      <div className="bg-white rounded-xl p-4 border">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Live Question Preview</h3>
              <p className="text-sm text-gray-600">
                Question {currentIndex + 1} of {questions.length} • {config.viewMode} mode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Timer Display */}
            {config.showTimer && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-600">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}

            {/* Playback Controls */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="p-2 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlayPause}
                className="p-2 rounded hover:bg-white transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="p-2 rounded hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* View Controls */}
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Configuration Panel */}
        <AnimatePresence>
          {showConfig && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t pt-4"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">View Mode</label>
                  <select
                    value={config.viewMode}
                    onChange={(e) => setConfig(prev => ({ ...prev, viewMode: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="student">Student View</option>
                    <option value="teacher">Teacher View</option>
                    <option value="review">Review Mode</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Layout</label>
                  <select
                    value={config.layout}
                    onChange={(e) => setConfig(prev => ({ ...prev, layout: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="compact">Compact</option>
                    <option value="detailed">Detailed</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Auto Advance</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={config.autoAdvance}
                      onChange={(e) => setConfig(prev => ({ ...prev, autoAdvance: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Every {config.previewSpeed / 1000}s</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Show Elements</label>
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={config.showAnswers}
                        onChange={(e) => setConfig(prev => ({ ...prev, showAnswers: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Answers
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={config.showExplanations}
                        onChange={(e) => setConfig(prev => ({ ...prev, showExplanations: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Explanations
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={config.showHints}
                        onChange={(e) => setConfig(prev => ({ ...prev, showHints: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      Hints
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Question Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl p-6 border"
        >
          {/* Question Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Q{currentIndex + 1}
              </span>
              <span className={`px-2 py-1 rounded border text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500">
                {currentQuestion.topic} • {currentQuestion.marks} marks
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuestionEdit(currentQuestion.id)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Content */}
          <div className="space-y-6">
            <div className="prose max-w-none">
              <div className="text-lg text-gray-800 leading-relaxed">
                {currentQuestion.question}
              </div>
            </div>

            {/* Options for MCQ */}
            {currentQuestion.type === 'mcq' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label
                    key={index}
                    className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      config.showAnswers && option === currentQuestion.correctAnswer
                        ? 'bg-green-50 border-green-300'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question_${currentQuestion.id}`}
                      value={option}
                      className="text-blue-600 focus:ring-blue-500"
                      disabled={config.viewMode !== 'student'}
                    />
                    <span className="text-gray-800">{option}</span>
                    {config.showAnswers && option === currentQuestion.correctAnswer && (
                      <span className="ml-auto text-green-600 text-sm font-medium">✓ Correct</span>
                    )}
                  </label>
                ))}
              </div>
            )}

            {/* Answer Input for Numerical */}
            {currentQuestion.type === 'numerical' && config.viewMode === 'student' && (
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Enter your answer"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Teacher/Review Mode Information */}
            {(config.viewMode === 'teacher' || config.viewMode === 'review') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Question Details</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Type: {currentQuestion.type.toUpperCase()}</div>
                    <div>Chapter: {currentQuestion.chapter}</div>
                    <div>Subtopic: {currentQuestion.subtopic}</div>
                    <div>Bloom's Level: {currentQuestion.bloomsLevel}</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">Assessment Info</h5>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Estimated Time: {Math.round(currentQuestion.estimatedTime / 60)} min</div>
                    <div>Difficulty: {currentQuestion.difficulty}</div>
                    <div>Tags: {currentQuestion.tags.join(', ')}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Correct Answer Display */}
            {config.showAnswers && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Correct Answer
                </h5>
                <p className="text-green-700 font-medium">{currentQuestion.correctAnswer}</p>
              </div>
            )}

            {/* Explanation */}
            {config.showExplanations && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Explanation
                </h5>
                <p className="text-blue-700">{currentQuestion.explanation}</p>
              </div>
            )}

            {/* Hints */}
            {config.showHints && currentQuestion.hints.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h5 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Hints
                </h5>
                <ul className="text-yellow-700 space-y-1">
                  {currentQuestion.hints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">•</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SkipBack className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {currentIndex + 1} / {questions.length}
              </span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Question Overview Strip */}
      <div className="bg-white rounded-xl p-4 border">
        <h4 className="font-medium text-gray-800 mb-3">Question Overview</h4>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {questions.map((question, index) => (
            <button
              key={question.id}
              onClick={() => onIndexChange(index)}
              className={`flex-shrink-0 w-12 h-12 rounded-lg border-2 transition-all ${
                index === currentIndex
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${
                question.difficulty === 'easy' ? 'bg-green-50' :
                question.difficulty === 'medium' ? 'bg-yellow-50' :
                'bg-red-50'
              }`}
            >
              <span className="text-sm font-medium text-gray-700">{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RealTimeQuestionPreview