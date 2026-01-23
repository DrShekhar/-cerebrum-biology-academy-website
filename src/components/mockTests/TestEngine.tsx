'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { MockTest, TestResponse } from '@/types/mockTest'
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  SkipForward,
  Pause,
  Play,
  CheckCircle,
  AlertCircle,
  Maximize,
  X,
  BookOpen,
  Target,
  Timer,
  BarChart3,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TestEngineProps {
  test: MockTest
  userClass: 'class-11' | 'class-12' | 'dropper'
  onTestComplete: (responses: TestResponse[], timeTaken: number) => void
  onTestExit: () => void
}

export function TestEngine({ test, userClass, onTestComplete, onTestExit }: TestEngineProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Map<number, TestResponse>>(new Map())
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(test.duration * 60) // Convert to seconds
  const [isTestStarted, setIsTestStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now())
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showQuestionPalette, setShowQuestionPalette] = useState(false)
  const [confidence, setConfidence] = useState<'high' | 'medium' | 'low'>('medium')
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const testContainerRef = useRef<HTMLDivElement>(null)
  
  // Get questions based on user class
  const questions = test.adaptiveSettings.enableAdaptive 
    ? test.questions.filter(q => test.adaptiveSettings.questionPoolByClass[userClass].includes(q.id))
    : test.questions

  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  // Timer management
  useEffect(() => {
    if (isTestStarted && !isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTestSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTestStarted, isPaused, timeRemaining])

  // Format time display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle question navigation
  const handleQuestionChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < totalQuestions) {
      setCurrentQuestionIndex(newIndex)
      setQuestionStartTime(Date.now())
    }
  }

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000)
    const isCorrect = optionId === currentQuestion.correctAnswer
    
    const response: TestResponse = {
      questionId: currentQuestion.id,
      selectedAnswer: optionId,
      isCorrect,
      timeTaken,
      isMarkedForReview: markedForReview.has(currentQuestionIndex),
      confidence
    }
    
    setResponses(prev => new Map(prev.set(currentQuestionIndex, response)))
  }

  // Toggle mark for review
  const toggleMarkForReview = () => {
    const newMarked = new Set(markedForReview)
    if (newMarked.has(currentQuestionIndex)) {
      newMarked.delete(currentQuestionIndex)
    } else {
      newMarked.add(currentQuestionIndex)
    }
    setMarkedForReview(newMarked)
  }

  // Start test
  const handleStartTest = () => {
    setIsTestStarted(true)
    setShowInstructions(false)
    setQuestionStartTime(Date.now())
  }

  // Pause/Resume test
  const handlePauseResume = () => {
    setIsPaused(!isPaused)
  }

  // Submit test
  const handleTestSubmit = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    const totalTimeTaken = (test.duration * 60) - timeRemaining
    const finalResponses = Array.from(responses.values())
    
    onTestComplete(finalResponses, totalTimeTaken)
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      testContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Question status indicators
  const getQuestionStatus = (index: number) => {
    const hasResponse = responses.has(index)
    const isMarked = markedForReview.has(index)
    
    if (index === currentQuestionIndex) return 'current'
    if (hasResponse && isMarked) return 'answered-marked'
    if (hasResponse) return 'answered'
    if (isMarked) return 'marked'
    return 'not-visited'
  }

  // Question palette colors
  const getQuestionStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-blue-600 text-white'
      case 'answered': return 'bg-green-600 text-white'
      case 'answered-marked': return 'bg-purple-500 text-white'
      case 'marked': return 'bg-yellow-500 text-white'
      case 'not-visited': return 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      default: return 'bg-gray-200 text-gray-700'
    }
  }

  // Instructions screen
  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          className="bg-white rounded-3xl shadow-xl max-w-4xl w-full p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{test.title}</h1>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-blue-50 rounded-2xl p-4">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{test.duration} min</div>
                <div className="text-gray-600">Duration</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-4">
                <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
                <div className="text-gray-600">Questions</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-4">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{test.totalMarks}</div>
                <div className="text-gray-600">Total Marks</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Instructions</h2>
            <ul className="space-y-3">
              {test.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Important Notes:</h3>
                <ul className="text-yellow-800 space-y-1 text-sm">
                  <li>• Once started, the timer cannot be paused</li>
                  <li>• You can navigate between questions freely</li>
                  <li>• Mark questions for review if unsure</li>
                  <li>• Auto-submit when time expires</li>
                  <li>• Ensure stable internet connection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" onClick={onTestExit}>
              <X className="w-5 h-5 mr-2" />
              Exit Test
            </Button>
            <Button variant="primary" size="lg" onClick={handleStartTest}>
              <Play className="w-5 h-5 mr-2" />
              Start Test
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div 
      ref={testContainerRef}
      className={`min-h-screen bg-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-semibold truncate">{test.title}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Timer className="w-5 h-5 mr-2" />
                <span className={`font-mono text-lg ${timeRemaining < 600 ? 'text-red-400' : ''}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePauseResume}
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuestionPalette(!showQuestionPalette)}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Questions
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <Maximize className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onTestExit}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Question Palette Sidebar */}
        <AnimatePresence>
          {showQuestionPalette && (
            <motion.div
              className="w-80 bg-gray-50 border-r border-gray-200 p-6 overflow-y-auto"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-bold text-gray-900 mb-4">Question Palette</h3>
              
              {/* Legend */}
              <div className="mb-6 space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-green-600 rounded mr-3"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded mr-3"></div>
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-500 rounded mr-3"></div>
                  <span>Answered & Marked</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                  <span>Current</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
                  <span>Not Visited</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: totalQuestions }, (_, index) => {
                  const status = getQuestionStatus(index)
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionChange(index)}
                      className={`w-10 h-10 rounded font-semibold text-sm transition-colors ${getQuestionStatusColor(status)}`}
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Answered:</span>
                    <span className="font-semibold">{responses.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marked:</span>
                    <span className="font-semibold">{markedForReview.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className="font-semibold">{totalQuestions - responses.size}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Question Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Question Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                  <span className="text-gray-600">
                    {currentQuestion.marks} marks • {Math.floor(currentQuestion.timeAllocated / 60)} min
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleMarkForReview}
                  className={markedForReview.has(currentQuestionIndex) ? 'bg-yellow-100 text-yellow-800' : ''}
                >
                  <Flag className="w-4 h-4 mr-2" />
                  {markedForReview.has(currentQuestionIndex) ? 'Marked' : 'Mark for Review'}
                </Button>
              </div>

              {/* Question */}
              <motion.div
                key={currentQuestionIndex}
                className="bg-white rounded-2xl border border-gray-200 p-8 mb-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <p className="text-lg text-gray-900 leading-relaxed">
                    {currentQuestion.questionText}
                  </p>
                  {currentQuestion.questionImage && (
                    <div className="mt-4 relative">
                      <Image
                        src={currentQuestion.questionImage}
                        alt="Question diagram"
                        width={600}
                        height={400}
                        className="max-w-full h-auto rounded-lg"
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    </div>
                  )}
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = responses.get(currentQuestionIndex)?.selectedAnswer === option.id
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                            isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                          <span className="text-gray-900">{option.text}</span>
                        </div>
                        {option.image && (
                          <div className="mt-3 ml-10 relative">
                            <Image
                              src={option.image}
                              alt={`Option ${option.id}`}
                              width={400}
                              height={300}
                              className="max-w-full h-auto rounded"
                              style={{ width: 'auto', height: 'auto' }}
                            />
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Confidence Level */}
                {responses.has(currentQuestionIndex) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3">How confident are you?</p>
                    <div className="flex space-x-3">
                      {(['high', 'medium', 'low'] as const).map((level) => (
                        <button
                          key={level}
                          onClick={() => setConfidence(level)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            confidence === level
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
                >
                  <SkipForward className="w-5 h-5 mr-2" />
                  Skip
                </Button>
                
                {currentQuestionIndex === totalQuestions - 1 ? (
                  <Button variant="primary" onClick={handleTestSubmit}>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Submit Test
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}