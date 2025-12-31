'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  GraduationCap,
  CheckCircle2,
  Calculator,
  Clock,
  BarChart3,
  PieChart,
  BookOpen,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  Download,
  Share2,
  Settings,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Maximize,
  Minimize,
  RefreshCw,
  Target,
  Award,
  TrendingUp,
  Users,
  FileText,
  Search,
  Zap,
  Brain,
  Shield,
  Timer,
  Edit3,
  Save,
  X,
  Plus,
  Minus
} from 'lucide-react'

// Types and Interfaces
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
  learningObjectives: string[]
  tags: string[]
  hints: string[]
  commonMistakes: string[]
}

interface TestConfiguration {
  id: string
  title: string
  description: string
  duration: number
  totalMarks: number
  passingScore: number
  instructions: string[]
  questions: Question[]
  createdDate: string
  lastModified: string
}

interface ReviewMetrics {
  totalQuestions: number
  totalMarks: number
  estimatedDuration: number
  difficultyDistribution: {
    easy: number
    medium: number
    hard: number
  }
  topicCoverage: {
    [topic: string]: number
  }
  bloomsDistribution: {
    [level: string]: number
  }
  averageTimePerQuestion: number
  markDistribution: {
    [marks: number]: number
  }
}

interface QualityIssue {
  id: string
  type: 'grammar' | 'spelling' | 'content' | 'formatting' | 'difficulty' | 'time' | 'marks'
  severity: 'low' | 'medium' | 'high' | 'critical'
  questionId?: string
  description: string
  suggestion: string
  autoFixable: boolean
}

interface PreviewMode {
  role: 'student' | 'teacher'
  currentQuestion: number
  showAnswers: boolean
  showExplanations: boolean
  showHints: boolean
  timer: boolean
  fullScreen: boolean
}

const TestReview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'answers' | 'calculation' | 'timing' | 'difficulty' | 'coverage' | 'quality'>('student')
  const [previewMode, setPreviewMode] = useState<PreviewMode>({
    role: 'student',
    currentQuestion: 0,
    showAnswers: false,
    showExplanations: false,
    showHints: false,
    timer: true,
    fullScreen: false
  })

  // Sample test data for demonstration
  const [testConfig] = useState<TestConfiguration>({
    id: 'test_001',
    title: 'NEET Biology Mock Test - Cell Biology & Genetics',
    description: 'Comprehensive test covering cell biology, genetics, and molecular biology topics',
    duration: 180,
    totalMarks: 200,
    passingScore: 120,
    instructions: [
      'Read all questions carefully before attempting',
      'Each question carries equal marks unless specified',
      'No negative marking for wrong answers',
      'Use of calculator is not permitted',
      'Submit your answers before time expires'
    ],
    questions: [
      {
        id: 'q1',
        question: 'Which of the following organelles is responsible for protein synthesis in eukaryotic cells?',
        type: 'mcq',
        options: ['Mitochondria', 'Ribosomes', 'Golgi apparatus', 'Lysosomes'],
        correctAnswer: 'Ribosomes',
        explanation: 'Ribosomes are the cellular organelles responsible for protein synthesis. They translate mRNA into proteins through the process of translation.',
        difficulty: 'easy',
        topic: 'Cell Biology',
        subtopic: 'Cell Organelles',
        chapter: 'The Cell',
        marks: 4,
        estimatedTime: 90,
        bloomsLevel: 'remember',
        learningObjectives: ['Identify cellular organelles and their functions'],
        tags: ['cell biology', 'organelles', 'protein synthesis'],
        hints: ['Think about where translation occurs', 'Consider the organelle that reads mRNA'],
        commonMistakes: ['Confusing with mitochondria which produces ATP', 'Mixing up with ER which modifies proteins']
      },
      {
        id: 'q2',
        question: 'In Mendel\'s law of segregation, when two heterozygous individuals (Aa) are crossed, what is the probability of obtaining a homozygous recessive offspring?',
        type: 'mcq',
        options: ['1/4', '1/2', '3/4', '1/1'],
        correctAnswer: '1/4',
        explanation: 'In a cross between two heterozygous individuals (Aa × Aa), the Punnett square shows: AA, Aa, Aa, aa. The probability of aa (homozygous recessive) is 1/4 or 25%.',
        difficulty: 'medium',
        topic: 'Genetics',
        subtopic: 'Mendelian Genetics',
        chapter: 'Principles of Inheritance',
        marks: 4,
        estimatedTime: 120,
        bloomsLevel: 'apply',
        learningObjectives: ['Apply Mendel\'s laws to genetic crosses'],
        tags: ['genetics', 'mendel', 'probability'],
        hints: ['Draw a Punnett square', 'Count the genotype ratios'],
        commonMistakes: ['Confusing phenotype with genotype ratios', 'Not understanding the 1:2:1 ratio']
      }
    ],
    createdDate: new Date().toISOString(),
    lastModified: new Date().toISOString()
  })

  const [reviewMetrics, setReviewMetrics] = useState<ReviewMetrics>({
    totalQuestions: 0,
    totalMarks: 0,
    estimatedDuration: 0,
    difficultyDistribution: { easy: 0, medium: 0, hard: 0 },
    topicCoverage: {},
    bloomsDistribution: {},
    averageTimePerQuestion: 0,
    markDistribution: {}
  })

  const [qualityIssues, setQualityIssues] = useState<QualityIssue[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Calculate review metrics
  useEffect(() => {
    const questions = testConfig.questions
    const metrics: ReviewMetrics = {
      totalQuestions: questions.length,
      totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
      estimatedDuration: questions.reduce((sum, q) => sum + q.estimatedTime, 0),
      difficultyDistribution: { easy: 0, medium: 0, hard: 0 },
      topicCoverage: {},
      bloomsDistribution: {},
      averageTimePerQuestion: 0,
      markDistribution: {}
    }

    // Calculate distributions
    questions.forEach(q => {
      metrics.difficultyDistribution[q.difficulty]++
      metrics.topicCoverage[q.topic] = (metrics.topicCoverage[q.topic] || 0) + 1
      metrics.bloomsDistribution[q.bloomsLevel] = (metrics.bloomsDistribution[q.bloomsLevel] || 0) + 1
      metrics.markDistribution[q.marks] = (metrics.markDistribution[q.marks] || 0) + 1
    })

    metrics.averageTimePerQuestion = metrics.estimatedDuration / metrics.totalQuestions

    setReviewMetrics(metrics)
  }, [testConfig])

  // Simulate quality analysis
  const analyzeQuality = async () => {
    setIsAnalyzing(true)

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const issues: QualityIssue[] = [
      {
        id: 'issue1',
        type: 'grammar',
        severity: 'medium',
        questionId: 'q1',
        description: 'Minor grammatical issue in question stem',
        suggestion: 'Consider rephrasing "Which of the following organelles is" to "Which organelle is"',
        autoFixable: true
      },
      {
        id: 'issue2',
        type: 'difficulty',
        severity: 'low',
        description: 'Slight imbalance in difficulty distribution',
        suggestion: 'Consider adding more hard-level questions for better assessment',
        autoFixable: false
      },
      {
        id: 'issue3',
        type: 'time',
        severity: 'medium',
        description: 'Estimated time may be insufficient for some questions',
        suggestion: 'Review time allocation for complex questions',
        autoFixable: false
      }
    ]

    setQualityIssues(issues)
    setIsAnalyzing(false)
  }

  // Navigation functions
  const nextQuestion = () => {
    setPreviewMode(prev => ({
      ...prev,
      currentQuestion: Math.min(prev.currentQuestion + 1, testConfig.questions.length - 1)
    }))
  }

  const prevQuestion = () => {
    setPreviewMode(prev => ({
      ...prev,
      currentQuestion: Math.max(prev.currentQuestion - 1, 0)
    }))
  }

  const toggleFullScreen = () => {
    setPreviewMode(prev => ({ ...prev, fullScreen: !prev.fullScreen }))
  }

  const getCurrentQuestion = (): Question => {
    return testConfig.questions[previewMode.currentQuestion] || testConfig.questions[0]
  }

  const exportTestPreview = () => {
    const data = {
      testConfig,
      reviewMetrics,
      qualityIssues,
      exportDate: new Date().toISOString()
    }

    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `test-review-${testConfig.id}.json`
    link.click()
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3"
        >
          <div className="p-3 bg-indigo-500 rounded-xl">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-indigo-500 bg-clip-text text-transparent">
            Test Review & Preview
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive test review with student/teacher preview modes, quality analysis,
          and verification tools for perfect test deployment
        </p>
      </div>

      {/* Test Overview */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{testConfig.title}</h2>
            <p className="text-gray-600 mb-4">{testConfig.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportTestPreview}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-600">{reviewMetrics.totalQuestions}</div>
            <div className="text-sm text-blue-800">Questions</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-600">{reviewMetrics.totalMarks}</div>
            <div className="text-sm text-green-800">Total Marks</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(reviewMetrics.estimatedDuration / 60)}</div>
            <div className="text-sm text-purple-800">Minutes</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-600">{Object.keys(reviewMetrics.topicCoverage).length}</div>
            <div className="text-sm text-yellow-800">Topics</div>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-600">{qualityIssues.length}</div>
            <div className="text-sm text-red-800">Issues Found</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'student', label: 'Student Preview', icon: Users },
            { id: 'teacher', label: 'Teacher Preview', icon: GraduationCap },
            { id: 'answers', label: 'Answer Key', icon: CheckCircle2 },
            { id: 'calculation', label: 'Marks Calc', icon: Calculator },
            { id: 'timing', label: 'Time Check', icon: Clock },
            { id: 'difficulty', label: 'Difficulty', icon: BarChart3 },
            { id: 'coverage', label: 'Coverage', icon: PieChart },
            { id: 'quality', label: 'Quality Check', icon: Search }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Student Preview */}
        {activeTab === 'student' && (
          <motion.div
            key="student"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Preview Controls */}
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Student View Preview
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleFullScreen}
                    className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                  >
                    {previewMode.fullScreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                    {previewMode.fullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={prevQuestion}
                  disabled={previewMode.currentQuestion === 0}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <SkipBack className="w-4 h-4" />
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Question {previewMode.currentQuestion + 1} of {testConfig.questions.length}
                </span>

                <button
                  onClick={nextQuestion}
                  disabled={previewMode.currentQuestion === testConfig.questions.length - 1}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next
                  <SkipForward className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 ml-auto">
                  <Timer className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {Math.round(getCurrentQuestion().estimatedTime / 60)} min remaining
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={previewMode.showHints}
                    onChange={(e) => setPreviewMode(prev => ({ ...prev, showHints: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Show Hints
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={previewMode.timer}
                    onChange={(e) => setPreviewMode(prev => ({ ...prev, timer: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Show Timer
                </label>
              </div>
            </div>

            {/* Question Display */}
            <div className={`bg-white rounded-xl p-6 border ${previewMode.fullScreen ? 'fixed inset-4 z-50 overflow-y-auto' : ''}`}>
              {previewMode.fullScreen && (
                <button
                  onClick={toggleFullScreen}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              )}

              <div className="space-y-6">
                {/* Question Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Q{previewMode.currentQuestion + 1}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        getCurrentQuestion().difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        getCurrentQuestion().difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {getCurrentQuestion().difficulty}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getCurrentQuestion().topic} • {getCurrentQuestion().marks} marks
                      </span>
                    </div>
                  </div>
                  {previewMode.timer && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <div className="text-lg font-bold text-red-600">15:30</div>
                      <div className="text-xs text-red-800">Time Left</div>
                    </div>
                  )}
                </div>

                {/* Question Content */}
                <div className="space-y-4">
                  <div className="text-lg text-gray-800 leading-relaxed">
                    {getCurrentQuestion().question}
                  </div>

                  {/* Options for MCQ */}
                  {getCurrentQuestion().type === 'mcq' && getCurrentQuestion().options && (
                    <div className="space-y-3">
                      {getCurrentQuestion().options.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="radio"
                            name={`question_${getCurrentQuestion().id}`}
                            value={option}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-800">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Answer Input for Numerical */}
                  {getCurrentQuestion().type === 'numerical' && (
                    <div className="space-y-3">
                      <input
                        type="number"
                        placeholder="Enter your answer"
                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* Hints */}
                  {previewMode.showHints && getCurrentQuestion().hints.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Hints
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {getCurrentQuestion().hints.map((hint, index) => (
                          <li key={index}>• {hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t">
                  <button
                    onClick={prevQuestion}
                    disabled={previewMode.currentQuestion === 0}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <SkipBack className="w-4 h-4" />
                    Previous
                  </button>

                  <div className="flex gap-3">
                    <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                      Mark for Review
                    </button>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      Save & Next
                    </button>
                  </div>

                  <button
                    onClick={nextQuestion}
                    disabled={previewMode.currentQuestion === testConfig.questions.length - 1}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    Next
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Teacher Preview */}
        {activeTab === 'teacher' && (
          <motion.div
            key="teacher"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Teacher Controls */}
            <div className="bg-white rounded-xl p-4 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  Teacher View Preview
                </h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={previewMode.showAnswers}
                      onChange={(e) => setPreviewMode(prev => ({ ...prev, showAnswers: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    Show Answers
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={previewMode.showExplanations}
                      onChange={(e) => setPreviewMode(prev => ({ ...prev, showExplanations: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    Show Explanations
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={prevQuestion}
                  disabled={previewMode.currentQuestion === 0}
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <SkipBack className="w-4 h-4" />
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Question {previewMode.currentQuestion + 1} of {testConfig.questions.length}
                </span>

                <button
                  onClick={nextQuestion}
                  disabled={previewMode.currentQuestion === testConfig.questions.length - 1}
                  className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next
                  <SkipForward className="w-4 h-4" />
                </button>

                <button className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit Question
                </button>
              </div>
            </div>

            {/* Detailed Question View */}
            <div className="bg-white rounded-xl p-6 border">
              <div className="space-y-6">
                {/* Question Metadata */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-3">Question Metadata</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium ml-2">{getCurrentQuestion().id}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium ml-2 uppercase">{getCurrentQuestion().type}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Difficulty:</span>
                      <span className={`font-medium ml-2 capitalize ${
                        getCurrentQuestion().difficulty === 'easy' ? 'text-green-600' :
                        getCurrentQuestion().difficulty === 'medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {getCurrentQuestion().difficulty}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Marks:</span>
                      <span className="font-medium ml-2">{getCurrentQuestion().marks}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium ml-2">{Math.round(getCurrentQuestion().estimatedTime / 60)} min</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Bloom's:</span>
                      <span className="font-medium ml-2 capitalize">{getCurrentQuestion().bloomsLevel}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Topic:</span>
                      <span className="font-medium ml-2">{getCurrentQuestion().topic}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Chapter:</span>
                      <span className="font-medium ml-2">{getCurrentQuestion().chapter}</span>
                    </div>
                  </div>
                </div>

                {/* Question Content */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Question</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-800">{getCurrentQuestion().question}</p>
                  </div>
                </div>

                {/* Options and Answer */}
                {getCurrentQuestion().type === 'mcq' && getCurrentQuestion().options && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Options</h4>
                    <div className="space-y-2">
                      {getCurrentQuestion().options.map((option, index) => (
                        <div
                          key={index}
                          className={`p-3 border rounded-lg ${
                            previewMode.showAnswers && option === getCurrentQuestion().correctAnswer
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-600">{String.fromCharCode(65 + index)}.</span>
                            <span className="text-gray-800">{option}</span>
                            {previewMode.showAnswers && option === getCurrentQuestion().correctAnswer && (
                              <CheckCircle2 className="w-5 h-5 text-green-600 ml-auto" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Correct Answer */}
                {previewMode.showAnswers && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Correct Answer</h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium">{getCurrentQuestion().correctAnswer}</p>
                    </div>
                  </div>
                )}

                {/* Explanation */}
                {previewMode.showExplanations && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Explanation</h4>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800">{getCurrentQuestion().explanation}</p>
                    </div>
                  </div>
                )}

                {/* Learning Objectives */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Learning Objectives</h4>
                  <ul className="space-y-1">
                    {getCurrentQuestion().learningObjectives.map((objective, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <Target className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Common Mistakes */}
                {getCurrentQuestion().commonMistakes.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Common Mistakes</h4>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <ul className="space-y-1">
                        {getCurrentQuestion().commonMistakes.map((mistake, index) => (
                          <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {getCurrentQuestion().tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Answer Key Verification */}
        {activeTab === 'answers' && (
          <motion.div
            key="answers"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Answer Key Verification
              </h3>

              <div className="space-y-4">
                {testConfig.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                          Q{index + 1}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                          question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {question.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">{question.marks} marks</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-800 mb-3 line-clamp-2">{question.question}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Correct Answer</h5>
                        <div className="bg-green-50 border border-green-200 rounded p-2">
                          <span className="text-green-800 font-medium">{question.correctAnswer}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Topic & Chapter</h5>
                        <div className="text-sm text-gray-600">
                          <div>{question.topic} → {question.subtopic}</div>
                          <div>Chapter: {question.chapter}</div>
                        </div>
                      </div>
                    </div>

                    {question.type === 'mcq' && question.options && (
                      <div className="mt-3">
                        <h5 className="font-medium text-gray-700 mb-2">Options</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 text-sm rounded border ${
                                option === question.correctAnswer
                                  ? 'bg-green-50 border-green-200 text-green-800'
                                  : 'bg-gray-50 border-gray-200 text-gray-700'
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                              {option === question.correctAnswer && (
                                <CheckCircle2 className="w-4 h-4 inline ml-2 text-green-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Verification Summary</h4>
                </div>
                <div className="text-sm text-green-700">
                  <div>✓ All questions have correct answers specified</div>
                  <div>✓ Answer formats are consistent</div>
                  <div>✓ No duplicate or conflicting answers found</div>
                  <div>✓ All MCQ options are properly formatted</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Total Marks Calculation */}
        {activeTab === 'calculation' && (
          <motion.div
            key="calculation"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Total Marks Calculation
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Marks Breakdown */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Marks Distribution</h4>
                  <div className="space-y-3">
                    {Object.entries(reviewMetrics.markDistribution).map(([marks, count]) => (
                      <div key={marks} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{marks} mark questions</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{count} questions</span>
                          <span className="text-blue-600 font-bold">{parseInt(marks) * count} marks</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-blue-800">Total Marks</span>
                      <span className="text-2xl font-bold text-blue-600">{reviewMetrics.totalMarks}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-blue-700">Total Questions</span>
                      <span className="font-medium text-blue-800">{reviewMetrics.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Average Marks per Question</span>
                      <span className="font-medium text-blue-800">
                        {(reviewMetrics.totalMarks / reviewMetrics.totalQuestions).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Grading Scale */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Suggested Grading Scale</h4>
                  <div className="space-y-3">
                    {[
                      { grade: 'A+', range: '90-100%', marks: `${Math.round(reviewMetrics.totalMarks * 0.9)}-${reviewMetrics.totalMarks}`, color: 'green' },
                      { grade: 'A', range: '80-89%', marks: `${Math.round(reviewMetrics.totalMarks * 0.8)}-${Math.round(reviewMetrics.totalMarks * 0.89)}`, color: 'green' },
                      { grade: 'B+', range: '70-79%', marks: `${Math.round(reviewMetrics.totalMarks * 0.7)}-${Math.round(reviewMetrics.totalMarks * 0.79)}`, color: 'blue' },
                      { grade: 'B', range: '60-69%', marks: `${Math.round(reviewMetrics.totalMarks * 0.6)}-${Math.round(reviewMetrics.totalMarks * 0.69)}`, color: 'blue' },
                      { grade: 'C', range: '50-59%', marks: `${Math.round(reviewMetrics.totalMarks * 0.5)}-${Math.round(reviewMetrics.totalMarks * 0.59)}`, color: 'yellow' },
                      { grade: 'D', range: '40-49%', marks: `${Math.round(reviewMetrics.totalMarks * 0.4)}-${Math.round(reviewMetrics.totalMarks * 0.49)}`, color: 'orange' },
                      { grade: 'F', range: '0-39%', marks: `0-${Math.round(reviewMetrics.totalMarks * 0.39)}`, color: 'red' }
                    ].map((grade) => {
                      const bgClass = grade.color === 'green' ? 'bg-green-50' :
                        grade.color === 'blue' ? 'bg-blue-50' :
                        grade.color === 'yellow' ? 'bg-yellow-50' :
                        grade.color === 'orange' ? 'bg-orange-50' :
                        grade.color === 'red' ? 'bg-red-50' : 'bg-gray-50'

                      const borderClass = grade.color === 'green' ? 'border-green-200' :
                        grade.color === 'blue' ? 'border-blue-200' :
                        grade.color === 'yellow' ? 'border-yellow-200' :
                        grade.color === 'orange' ? 'border-orange-200' :
                        grade.color === 'red' ? 'border-red-200' : 'border-gray-200'

                      const textClass = grade.color === 'green' ? 'text-green-800' :
                        grade.color === 'blue' ? 'text-blue-800' :
                        grade.color === 'yellow' ? 'text-yellow-800' :
                        grade.color === 'orange' ? 'text-orange-800' :
                        grade.color === 'red' ? 'text-red-800' : 'text-gray-800'

                      const textSecondaryClass = grade.color === 'green' ? 'text-green-700' :
                        grade.color === 'blue' ? 'text-blue-700' :
                        grade.color === 'yellow' ? 'text-yellow-700' :
                        grade.color === 'orange' ? 'text-orange-700' :
                        grade.color === 'red' ? 'text-red-700' : 'text-gray-700'

                      return (
                        <div key={grade.grade} className={`flex justify-between items-center p-3 ${bgClass} border ${borderClass} rounded-lg`}>
                          <div className="flex items-center gap-3">
                            <span className={`font-bold ${textClass} w-8`}>{grade.grade}</span>
                            <span className={textSecondaryClass}>{grade.range}</span>
                          </div>
                          <span className={`font-medium ${textClass}`}>{grade.marks} marks</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-2">Passing Criteria</h5>
                    <div className="text-sm text-purple-700 space-y-1">
                      <div>• Minimum passing score: {testConfig.passingScore} marks ({Math.round((testConfig.passingScore / reviewMetrics.totalMarks) * 100)}%)</div>
                      <div>• Recommended for NEET: 60% ({Math.round(reviewMetrics.totalMarks * 0.6)} marks)</div>
                      <div>• Excellence threshold: 85% ({Math.round(reviewMetrics.totalMarks * 0.85)} marks)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Question-wise Marks */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-4">Question-wise Marks Verification</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Question</th>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Difficulty</th>
                        <th className="text-left p-2">Topic</th>
                        <th className="text-center p-2">Marks</th>
                        <th className="text-center p-2">Time (min)</th>
                        <th className="text-center p-2">Marks/Min</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testConfig.questions.map((question, index) => (
                        <tr key={question.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">Q{index + 1}</td>
                          <td className="p-2 uppercase">{question.type}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                              question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {question.difficulty}
                            </span>
                          </td>
                          <td className="p-2">{question.topic}</td>
                          <td className="p-2 text-center font-medium">{question.marks}</td>
                          <td className="p-2 text-center">{Math.round(question.estimatedTime / 60)}</td>
                          <td className="p-2 text-center">{(question.marks / (question.estimatedTime / 60)).toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Time Estimation Check */}
        {activeTab === 'timing' && (
          <motion.div
            key="timing"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Time Estimation Analysis
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Time Summary */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Time Allocation Summary</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-blue-700">Total Estimated Time</span>
                        <span className="text-xl font-bold text-blue-600">
                          {Math.round(reviewMetrics.estimatedDuration / 60)} minutes
                        </span>
                      </div>
                      <div className="text-sm text-blue-600">
                        {Math.round(reviewMetrics.estimatedDuration / 3600)} hours {Math.round((reviewMetrics.estimatedDuration % 3600) / 60)} minutes
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-green-700">Allocated Duration</span>
                        <span className="text-xl font-bold text-green-600">{testConfig.duration} minutes</span>
                      </div>
                      <div className="text-sm text-green-600">
                        {Math.round(testConfig.duration / 60)} hours {testConfig.duration % 60} minutes
                      </div>
                    </div>

                    <div className={`p-4 border rounded-lg ${
                      reviewMetrics.estimatedDuration / 60 <= testConfig.duration
                        ? 'bg-green-50 border-green-200'
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className={reviewMetrics.estimatedDuration / 60 <= testConfig.duration ? 'text-green-700' : 'text-red-700'}>
                          Time Buffer
                        </span>
                        <span className={`text-xl font-bold ${
                          reviewMetrics.estimatedDuration / 60 <= testConfig.duration ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {Math.round(testConfig.duration - (reviewMetrics.estimatedDuration / 60))} minutes
                        </span>
                      </div>
                      <div className={`text-sm ${
                        reviewMetrics.estimatedDuration / 60 <= testConfig.duration ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {reviewMetrics.estimatedDuration / 60 <= testConfig.duration
                          ? 'Adequate time allocation'
                          : 'Time allocation may be insufficient'
                        }
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-700">Average Time per Question</span>
                        <span className="text-xl font-bold text-purple-600">
                          {Math.round(reviewMetrics.averageTimePerQuestion / 60)} min
                        </span>
                      </div>
                      <div className="text-sm text-purple-600">
                        {Math.round(reviewMetrics.averageTimePerQuestion)} seconds per question
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Distribution */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Time Distribution by Difficulty</h4>
                  <div className="space-y-3">
                    {Object.entries(reviewMetrics.difficultyDistribution).map(([difficulty, count]) => {
                      const avgTime = testConfig.questions
                        .filter(q => q.difficulty === difficulty)
                        .reduce((sum, q) => sum + q.estimatedTime, 0) / (count || 1)

                      return (
                        <div key={difficulty} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className={`font-medium capitalize ${
                              difficulty === 'easy' ? 'text-green-700' :
                              difficulty === 'medium' ? 'text-yellow-700' :
                              'text-red-700'
                            }`}>
                              {difficulty} Questions
                            </span>
                            <span className="text-gray-600">{count} questions</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Avg time per question</span>
                            <span className="font-medium">{Math.round(avgTime / 60)} min</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total time for category</span>
                            <span className="font-medium">{Math.round((avgTime * count) / 60)} min</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h5 className="font-medium text-yellow-800 mb-2">Time Allocation Recommendations</h5>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Easy questions: 1-2 minutes each</li>
                      <li>• Medium questions: 2-3 minutes each</li>
                      <li>• Hard questions: 3-5 minutes each</li>
                      <li>• Reserve 15-20% buffer time for review</li>
                      <li>• Consider 2-3 minutes for reading instructions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Question-wise Time Analysis */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-4">Question-wise Time Analysis</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Question</th>
                        <th className="text-left p-2">Difficulty</th>
                        <th className="text-center p-2">Estimated Time</th>
                        <th className="text-center p-2">Recommended Time</th>
                        <th className="text-center p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testConfig.questions.map((question, index) => {
                        const recommendedTime =
                          question.difficulty === 'easy' ? 90 :
                          question.difficulty === 'medium' ? 150 :
                          240

                        const status =
                          question.estimatedTime <= recommendedTime ? 'optimal' :
                          question.estimatedTime <= recommendedTime * 1.2 ? 'acceptable' :
                          'review'

                        return (
                          <tr key={question.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">Q{index + 1}</td>
                            <td className="p-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {question.difficulty}
                              </span>
                            </td>
                            <td className="p-2 text-center">{Math.round(question.estimatedTime / 60)} min</td>
                            <td className="p-2 text-center">{Math.round(recommendedTime / 60)} min</td>
                            <td className="p-2 text-center">
                              <span className={`px-2 py-1 rounded text-xs ${
                                status === 'optimal' ? 'bg-green-100 text-green-700' :
                                status === 'acceptable' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Difficulty Balance Check */}
        {activeTab === 'difficulty' && (
          <motion.div
            key="difficulty"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-600" />
                Difficulty Balance Analysis
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Difficulty Distribution */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Current Distribution</h4>
                  <div className="space-y-4">
                    {Object.entries(reviewMetrics.difficultyDistribution).map(([difficulty, count]) => {
                      const percentage = (count / reviewMetrics.totalQuestions) * 100

                      return (
                        <div key={difficulty} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`font-medium capitalize ${
                              difficulty === 'easy' ? 'text-green-700' :
                              difficulty === 'medium' ? 'text-yellow-700' :
                              'text-red-700'
                            }`}>
                              {difficulty} Questions
                            </span>
                            <span className="text-gray-600">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                difficulty === 'easy' ? 'bg-green-600' :
                                difficulty === 'medium' ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-2">Distribution Summary</h5>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>Total Questions: {reviewMetrics.totalQuestions}</div>
                      <div>Easy: {reviewMetrics.difficultyDistribution.easy} ({((reviewMetrics.difficultyDistribution.easy / reviewMetrics.totalQuestions) * 100).toFixed(1)}%)</div>
                      <div>Medium: {reviewMetrics.difficultyDistribution.medium} ({((reviewMetrics.difficultyDistribution.medium / reviewMetrics.totalQuestions) * 100).toFixed(1)}%)</div>
                      <div>Hard: {reviewMetrics.difficultyDistribution.hard} ({((reviewMetrics.difficultyDistribution.hard / reviewMetrics.totalQuestions) * 100).toFixed(1)}%)</div>
                    </div>
                  </div>
                </div>

                {/* Recommended Distribution */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Recommended Distribution</h4>
                  <div className="space-y-4">
                    {[
                      { level: 'Easy', recommended: 30, color: 'green' },
                      { level: 'Medium', recommended: 50, color: 'yellow' },
                      { level: 'Hard', recommended: 20, color: 'red' }
                    ].map((item) => {
                      const current = reviewMetrics.difficultyDistribution[item.level.toLowerCase() as keyof typeof reviewMetrics.difficultyDistribution]
                      const currentPercentage = (current / reviewMetrics.totalQuestions) * 100
                      const difference = currentPercentage - item.recommended

                      return (
                        <div key={item.level} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`font-medium ${
                              item.color === 'green' ? 'text-green-700' :
                              item.color === 'yellow' ? 'text-yellow-700' :
                              item.color === 'red' ? 'text-red-700' : 'text-gray-700'
                            }`}>
                              {item.level} (Recommended: {item.recommended}%)
                            </span>
                            <span className={`font-medium ${
                              Math.abs(difference) <= 5 ? 'text-green-600' :
                              Math.abs(difference) <= 10 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {difference > 0 ? '+' : ''}{difference.toFixed(1)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                item.color === 'green' ? 'bg-green-600' :
                                item.color === 'yellow' ? 'bg-yellow-500' :
                                item.color === 'red' ? 'bg-red-500' : 'bg-gray-500'
                              }`}
                              style={{ width: `${item.recommended}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-600">
                            Current: {currentPercentage.toFixed(1)}% | Target: {item.recommended}%
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h6 className="font-medium text-green-800 mb-1">Easy Questions (30%)</h6>
                      <p className="text-sm text-green-700">Build confidence, test basic recall</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h6 className="font-medium text-yellow-800 mb-1">Medium Questions (50%)</h6>
                      <p className="text-sm text-yellow-700">Core assessment, application skills</p>
                    </div>
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h6 className="font-medium text-red-800 mb-1">Hard Questions (20%)</h6>
                      <p className="text-sm text-red-700">Distinguish top performers, critical thinking</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloom's Taxonomy Distribution */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-4">Bloom's Taxonomy Distribution</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Object.entries(reviewMetrics.bloomsDistribution).map(([level, count]) => {
                    const percentage = (count / reviewMetrics.totalQuestions) * 100
                    const colors = {
                      remember: 'blue',
                      understand: 'green',
                      apply: 'yellow',
                      analyze: 'orange',
                      evaluate: 'red',
                      create: 'purple'
                    }
                    const color = colors[level as keyof typeof colors] || 'gray'

                    const bgClass = color === 'blue' ? 'bg-blue-50' :
                      color === 'green' ? 'bg-green-50' :
                      color === 'yellow' ? 'bg-yellow-50' :
                      color === 'orange' ? 'bg-orange-50' :
                      color === 'red' ? 'bg-red-50' :
                      color === 'purple' ? 'bg-purple-50' : 'bg-gray-50'

                    const borderClass = color === 'blue' ? 'border-blue-200' :
                      color === 'green' ? 'border-green-200' :
                      color === 'yellow' ? 'border-yellow-200' :
                      color === 'orange' ? 'border-orange-200' :
                      color === 'red' ? 'border-red-200' :
                      color === 'purple' ? 'border-purple-200' : 'border-gray-200'

                    const textBoldClass = color === 'blue' ? 'text-blue-600' :
                      color === 'green' ? 'text-green-600' :
                      color === 'yellow' ? 'text-yellow-600' :
                      color === 'orange' ? 'text-orange-600' :
                      color === 'red' ? 'text-red-600' :
                      color === 'purple' ? 'text-purple-600' : 'text-gray-600'

                    const textClass = color === 'blue' ? 'text-blue-800' :
                      color === 'green' ? 'text-green-800' :
                      color === 'yellow' ? 'text-yellow-800' :
                      color === 'orange' ? 'text-orange-800' :
                      color === 'red' ? 'text-red-800' :
                      color === 'purple' ? 'text-purple-800' : 'text-gray-800'

                    return (
                      <div key={level} className={`p-3 ${bgClass} border ${borderClass} rounded-lg text-center`}>
                        <div className={`text-2xl font-bold ${textBoldClass}`}>{count}</div>
                        <div className={`text-sm ${textClass} capitalize`}>{level}</div>
                        <div className={`text-xs ${textBoldClass}`}>{percentage.toFixed(1)}%</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Balance Analysis */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Balance Analysis & Recommendations</h4>
                <div className="space-y-2 text-sm">
                  {(() => {
                    const easyPercentage = (reviewMetrics.difficultyDistribution.easy / reviewMetrics.totalQuestions) * 100
                    const mediumPercentage = (reviewMetrics.difficultyDistribution.medium / reviewMetrics.totalQuestions) * 100
                    const hardPercentage = (reviewMetrics.difficultyDistribution.hard / reviewMetrics.totalQuestions) * 100

                    const recommendations = []

                    if (easyPercentage < 25) recommendations.push("⚠️ Consider adding more easy questions to build student confidence")
                    if (easyPercentage > 40) recommendations.push("⚠️ Too many easy questions may not adequately assess students")
                    if (mediumPercentage < 40) recommendations.push("⚠️ Add more medium-difficulty questions for better assessment")
                    if (mediumPercentage > 60) recommendations.push("⚠️ Consider balancing with more easy and hard questions")
                    if (hardPercentage < 15) recommendations.push("⚠️ Add challenging questions to distinguish top performers")
                    if (hardPercentage > 30) recommendations.push("⚠️ Too many hard questions may discourage students")

                    if (recommendations.length === 0) {
                      recommendations.push("✅ Difficulty distribution is well-balanced")
                    }

                    return recommendations.map((rec, index) => (
                      <div key={index} className="text-gray-700">{rec}</div>
                    ))
                  })()}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Topic Coverage Analysis */}
        {activeTab === 'coverage' && (
          <motion.div
            key="coverage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-green-600" />
                Topic Coverage Analysis
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Topic Distribution */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Current Topic Coverage</h4>
                  <div className="space-y-3">
                    {Object.entries(reviewMetrics.topicCoverage).map(([topic, count]) => {
                      const percentage = (count / reviewMetrics.totalQuestions) * 100

                      return (
                        <div key={topic} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-700">{topic}</span>
                            <span className="text-gray-600">{count} questions ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-green-600"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-2">Coverage Summary</h5>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>Total Topics Covered: {Object.keys(reviewMetrics.topicCoverage).length}</div>
                      <div>Questions Distribution: {Object.values(reviewMetrics.topicCoverage).join(', ')}</div>
                      <div>Most Covered: {Object.entries(reviewMetrics.topicCoverage).sort(([,a], [,b]) => b - a)[0]?.[0]}</div>
                      <div>Least Covered: {Object.entries(reviewMetrics.topicCoverage).sort(([,a], [,b]) => a - b)[0]?.[0]}</div>
                    </div>
                  </div>
                </div>

                {/* NEET Biology Syllabus Coverage */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">NEET Biology Syllabus Coverage</h4>
                  <div className="space-y-3">
                    {[
                      { topic: 'Cell Biology', weight: 15, covered: reviewMetrics.topicCoverage['Cell Biology'] || 0 },
                      { topic: 'Genetics', weight: 20, covered: reviewMetrics.topicCoverage['Genetics'] || 0 },
                      { topic: 'Human Physiology', weight: 25, covered: reviewMetrics.topicCoverage['Human Physiology'] || 0 },
                      { topic: 'Plant Physiology', weight: 15, covered: reviewMetrics.topicCoverage['Plant Physiology'] || 0 },
                      { topic: 'Evolution', weight: 10, covered: reviewMetrics.topicCoverage['Evolution'] || 0 },
                      { topic: 'Ecology', weight: 10, covered: reviewMetrics.topicCoverage['Ecology'] || 0 },
                      { topic: 'Biotechnology', weight: 5, covered: reviewMetrics.topicCoverage['Biotechnology'] || 0 }
                    ].map((item) => {
                      const recommendedQuestions = Math.round((item.weight / 100) * reviewMetrics.totalQuestions)
                      const coverageRatio = item.covered / (recommendedQuestions || 1)

                      return (
                        <div key={item.topic} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700">{item.topic}</span>
                            <span className={`text-sm font-medium ${
                              coverageRatio >= 0.8 ? 'text-green-600' :
                              coverageRatio >= 0.5 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {item.covered}/{recommendedQuestions} questions
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>NEET Weight: {item.weight}%</span>
                            <span>Coverage: {((item.covered / recommendedQuestions) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                coverageRatio >= 0.8 ? 'bg-green-600' :
                                coverageRatio >= 0.5 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${Math.min((item.covered / recommendedQuestions) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Chapter-wise Analysis */}
              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-4">Chapter-wise Question Distribution</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Chapter</th>
                        <th className="text-left p-2">Topic</th>
                        <th className="text-center p-2">Questions</th>
                        <th className="text-center p-2">Marks</th>
                        <th className="text-center p-2">Difficulty Mix</th>
                        <th className="text-center p-2">Coverage Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const chapterData = testConfig.questions.reduce((acc, q) => {
                          const key = `${q.chapter}-${q.topic}`
                          if (!acc[key]) {
                            acc[key] = {
                              chapter: q.chapter,
                              topic: q.topic,
                              questions: 0,
                              marks: 0,
                              difficulties: { easy: 0, medium: 0, hard: 0 }
                            }
                          }
                          acc[key].questions++
                          acc[key].marks += q.marks
                          acc[key].difficulties[q.difficulty]++
                          return acc
                        }, {} as any)

                        return Object.values(chapterData).map((data: any) => (
                          <tr key={`${data.chapter}-${data.topic}`} className="border-b hover:bg-gray-50">
                            <td className="p-2 font-medium">{data.chapter}</td>
                            <td className="p-2">{data.topic}</td>
                            <td className="p-2 text-center">{data.questions}</td>
                            <td className="p-2 text-center">{data.marks}</td>
                            <td className="p-2 text-center">
                              <div className="flex gap-1 justify-center">
                                {data.difficulties.easy > 0 && (
                                  <span className="bg-green-100 text-green-700 px-1 rounded text-xs">
                                    E:{data.difficulties.easy}
                                  </span>
                                )}
                                {data.difficulties.medium > 0 && (
                                  <span className="bg-yellow-100 text-yellow-700 px-1 rounded text-xs">
                                    M:{data.difficulties.medium}
                                  </span>
                                )}
                                {data.difficulties.hard > 0 && (
                                  <span className="bg-red-100 text-red-700 px-1 rounded text-xs">
                                    H:{data.difficulties.hard}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-2 text-center">
                              <span className={`px-2 py-1 rounded text-xs ${
                                data.questions >= 3 ? 'bg-green-100 text-green-700' :
                                data.questions >= 2 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {data.questions >= 3 ? 'Good' : data.questions >= 2 ? 'Fair' : 'Low'}
                              </span>
                            </td>
                          </tr>
                        ))
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Coverage Recommendations */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-3">Coverage Recommendations</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>✅ Current test covers {Object.keys(reviewMetrics.topicCoverage).length} major topics</div>
                  <div>📊 Question distribution varies from {Math.min(...Object.values(reviewMetrics.topicCoverage))} to {Math.max(...Object.values(reviewMetrics.topicCoverage))} per topic</div>
                  <div>🎯 For balanced assessment, aim for 2-4 questions per topic</div>
                  <div>📚 Consider adding questions for under-represented chapters</div>
                  <div>⚖️ Ensure all major NEET topics are adequately covered</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grammar/Spell Check */}
        {activeTab === 'quality' && (
          <motion.div
            key="quality"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-600" />
                  Quality Assurance Check
                </h3>
                <button
                  onClick={analyzeQuality}
                  disabled={isAnalyzing}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Run Quality Check
                    </>
                  )}
                </button>
              </div>

              {/* Quality Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {qualityIssues.filter(i => i.severity === 'low').length}
                  </div>
                  <div className="text-sm text-green-800">Low Priority</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {qualityIssues.filter(i => i.severity === 'medium').length}
                  </div>
                  <div className="text-sm text-yellow-800">Medium Priority</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {qualityIssues.filter(i => i.severity === 'high').length}
                  </div>
                  <div className="text-sm text-orange-800">High Priority</div>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {qualityIssues.filter(i => i.severity === 'critical').length}
                  </div>
                  <div className="text-sm text-red-800">Critical</div>
                </div>
              </div>

              {/* Quality Issues */}
              {qualityIssues.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-800">Quality Issues Found</h4>
                  {qualityIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`border rounded-lg p-4 ${
                        issue.severity === 'critical' ? 'border-red-200 bg-red-50' :
                        issue.severity === 'high' ? 'border-orange-200 bg-orange-50' :
                        issue.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                        'border-green-200 bg-green-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            issue.severity === 'critical' ? 'bg-red-100 text-red-700' :
                            issue.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                            issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {issue.severity}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium capitalize">
                            {issue.type}
                          </span>
                          {issue.questionId && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {issue.questionId}
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {issue.autoFixable && (
                            <button className="text-green-600 hover:text-green-800 text-sm">
                              Auto Fix
                            </button>
                          )}
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            Review
                          </button>
                        </div>
                      </div>

                      <p className={`mb-2 ${
                        issue.severity === 'critical' ? 'text-red-800' :
                        issue.severity === 'high' ? 'text-orange-800' :
                        issue.severity === 'medium' ? 'text-yellow-800' :
                        'text-green-800'
                      }`}>
                        {issue.description}
                      </p>

                      <div className={`text-sm ${
                        issue.severity === 'critical' ? 'text-red-700' :
                        issue.severity === 'high' ? 'text-orange-700' :
                        issue.severity === 'medium' ? 'text-yellow-700' :
                        'text-green-700'
                      }`}>
                        <strong>Suggestion:</strong> {issue.suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No quality analysis performed yet</p>
                  <p className="text-sm">Click "Run Quality Check" to analyze the test</p>
                </div>
              )}

              {/* Quality Checklist */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">Quality Checklist</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Grammar and spelling check</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Question clarity and readability</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Answer key verification</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Consistent formatting</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Appropriate difficulty progression</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Time allocation validation</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Topic coverage balance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">No ambiguous questions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auto-fix Options */}
              {qualityIssues.some(i => i.autoFixable) && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">Auto-fix Available</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    {qualityIssues.filter(i => i.autoFixable).length} issues can be automatically fixed.
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Apply Auto-fixes
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final Actions */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Test Review Complete</h3>
            <p className="text-gray-600">
              Review all sections and resolve any issues before deploying the test
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4" />
              Deploy Test
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestReview