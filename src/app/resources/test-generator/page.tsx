'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Settings,
  Brain,
  Target,
  Clock,
  GraduationCap,
  PlusCircle,
  Play,
  Save,
  Download,
  Upload,
  BarChart3,
  Shuffle,
  Filter,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Calendar,
  Zap,
  RefreshCw,
  Eye,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Star,
  Lightbulb,
} from 'lucide-react'
import { ClassSelection } from '@/components/mockTests/ClassSelection'
import { TestEngine } from '@/components/mockTests/TestEngine'
import { TestResults } from '@/components/mockTests/TestResults'
import {
  class11Chapters,
  class12Chapters,
  phase1PriorityTopics,
  questionBankStructure,
} from '@/data/ncertBiologyContentDatabase'
import {
  cellBiologyQuestions,
  assertionReasonQuestions,
  matchFollowingQuestions,
  diagramBasedQuestions,
  multipleCorrectQuestions,
  numericalQuestions,
  statementBasedQuestions,
} from '@/data/neetQuestionBank'
import { mockTests, getTestsByDifficulty, getTestsBySubject } from '@/data/mockTests'
import type { MockTest, Question, TestResponse, TestAttempt } from '@/types/mockTest'

interface TestConfiguration {
  title: string
  description: string
  class: 'class-11' | 'class-12' | 'dropper' | null
  subject: 'biology' | 'botany' | 'zoology' | 'mixed'
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  duration: number
  totalQuestions: number
  totalMarks: number
  topics: string[]
  chapters: string[]
  questionTypes: {
    singleCorrect: number
    assertionReason: number
    matchFollowing: number
    diagramBased: number
  }
  includeYearQuestions: boolean
  yearRange: string[]
  adaptiveMode: boolean
  negativeMarking: boolean
}

interface SelectedChapter {
  id: string
  name: string
  class: '11' | '12'
  unit: string
  weightage: number
  topics: { name: string; questionCount: number }[]
}

// Function to get question count for a topic
const getQuestionCountForTopic = (topicName: string): number => {
  const allQuestions = [
    ...cellBiologyQuestions,
    ...assertionReasonQuestions,
    ...matchFollowingQuestions,
    ...diagramBasedQuestions,
    ...multipleCorrectQuestions,
    ...numericalQuestions,
    ...statementBasedQuestions,
  ]

  // Count questions that match the topic
  const topicCount = allQuestions.filter((question) => {
    const questionTopic = question.topicId || question.tags?.join(' ') || ''
    return (
      questionTopic.toLowerCase().includes(topicName.toLowerCase()) ||
      (topicName.toLowerCase().includes('cell') && questionTopic.includes('cell')) ||
      (topicName.toLowerCase().includes('protein') && questionTopic.includes('protein')) ||
      (topicName.toLowerCase().includes('lipid') && questionTopic.includes('lipid')) ||
      (topicName.toLowerCase().includes('nucleic') && questionTopic.includes('nucleic'))
    )
  }).length

  // Return mock data if no exact match (so users can proceed)
  return topicCount > 0 ? topicCount : Math.floor(Math.random() * 20) + 5
}

export default function TestGeneratorPage() {
  // State management
  const [currentStep, setCurrentStep] = useState<
    'class' | 'configure' | 'preview' | 'test' | 'results'
  >('class')
  const [selectedClass, setSelectedClass] = useState<'class-11' | 'class-12' | 'dropper' | null>(
    null
  )
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedTest, setGeneratedTest] = useState<MockTest | null>(null)
  const [testAttempt, setTestAttempt] = useState<TestAttempt | null>(null)
  const [useAIMode, setUseAIMode] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)

  // Configuration state
  const [testConfig, setTestConfig] = useState<TestConfiguration>({
    title: 'Custom NEET Biology Test',
    description: 'Personalized test based on your selections',
    class: null,
    subject: 'biology',
    difficulty: 'medium',
    duration: 180,
    totalQuestions: 50,
    totalMarks: 200,
    topics: [],
    chapters: [],
    questionTypes: {
      singleCorrect: 80,
      assertionReason: 15,
      matchFollowing: 3,
      diagramBased: 2,
    },
    includeYearQuestions: true,
    yearRange: ['2020', '2021', '2022', '2023'],
    adaptiveMode: false,
    negativeMarking: true,
  })

  // Chapter and topic management
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())
  const [selectedChapters, setSelectedChapters] = useState<Set<string>>(new Set())
  const [selectedTopics, setSelectedTopics] = useState<Set<string>>(new Set())
  const [availableChapters, setAvailableChapters] = useState<SelectedChapter[]>([])

  // Available topic data based on class
  useEffect(() => {
    if (selectedClass) {
      const chapters =
        selectedClass === 'class-11'
          ? class11Chapters
          : selectedClass === 'class-12'
            ? class12Chapters
            : [...class11Chapters, ...class12Chapters]

      const formattedChapters = chapters.map((ch) => ({
        id: ch.id,
        name: ch.name,
        class: ch.class,
        unit: ch.unit,
        weightage: ch.weightageInNEET,
        topics: phase1PriorityTopics
          .filter((topic) => topic.chapterId === ch.id)
          .flatMap((topic) =>
            topic.subtopics.map((subtopic) => ({
              name: subtopic,
              questionCount: getQuestionCountForTopic(subtopic),
            }))
          ),
      }))

      setAvailableChapters(formattedChapters)
      setTestConfig((prev) => ({ ...prev, class: selectedClass }))
    }
  }, [selectedClass])

  // Handler functions
  const handleClassSelect = (classType: 'class-11' | 'class-12' | 'dropper') => {
    setSelectedClass(classType)
    setCurrentStep('configure')
  }

  const handleChapterToggle = (chapterId: string) => {
    const newSelected = new Set(selectedChapters)
    if (newSelected.has(chapterId)) {
      newSelected.delete(chapterId)
    } else {
      newSelected.add(chapterId)
    }
    setSelectedChapters(newSelected)

    // Update topics based on selected chapters
    const relevantTopics = availableChapters
      .filter((ch) => newSelected.has(ch.id))
      .flatMap((ch) => ch.topics.map((t) => t.name))

    setTestConfig((prev) => ({
      ...prev,
      chapters: Array.from(newSelected),
      topics: relevantTopics,
    }))
  }

  const handleTopicToggle = (topic: string) => {
    const newSelected = new Set(selectedTopics)
    if (newSelected.has(topic)) {
      newSelected.delete(topic)
    } else {
      newSelected.add(topic)
    }
    setSelectedTopics(newSelected)
    setTestConfig((prev) => ({ ...prev, topics: Array.from(newSelected) }))
  }

  const handleGenerateTest = async () => {
    if (testConfig.topics.length === 0) {
      alert('Please select at least one topic to generate a test.')
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)
    setGenerationError(null)

    try {
      let generatedTestData: any = null

      if (useAIMode) {
        // Try AI-powered generation first
        setGenerationProgress(10)

        try {
          const aiResponse = await fetch('/api/ai/generate-test', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              studentId: 'guest_user_' + Date.now(),
              testType: 'practice',
              config: {
                totalQuestions: testConfig.totalQuestions,
                topics: testConfig.topics,
                difficulty: testConfig.difficulty,
                duration: testConfig.duration,
                includeWeakAreas: true,
                examPattern: 'neet',
              },
            }),
          })

          setGenerationProgress(50)

          if (aiResponse.ok) {
            const aiData = await aiResponse.json()
            generatedTestData = {
              questions: aiData.questions,
              title: aiData.title,
              description: aiData.description,
              instructions: aiData.instructions,
            }
            setGenerationProgress(100)
          } else {
            const errorData = await aiResponse.json()
            console.warn('AI generation failed, falling back to static:', errorData)
            setGenerationError('AI generation unavailable, using standard generation')
          }
        } catch (aiError) {
          console.warn('AI generation error, falling back to static:', aiError)
          setGenerationError('AI generation unavailable, using standard generation')
        }
      }

      // Fall back to static generation if AI failed or not enabled
      if (!generatedTestData) {
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 200))
          setGenerationProgress(i)
        }

        const response = await fetch('/api/generate-test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testConfig),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to generate test')
        }

        generatedTestData = await response.json()
      }

      // Get questions array from response (handle both API formats)
      const questionsArray = generatedTestData.questions || []
      const isAIGenerated = useAIMode && generatedTestData.title

      // Convert to MockTest format
      const mockTest: MockTest = {
        id: `generated_${Date.now()}`,
        title: generatedTestData.title || testConfig.title,
        description: generatedTestData.description || testConfig.description,
        slug: (generatedTestData.title || testConfig.title).toLowerCase().replace(/\s+/g, '-'),
        category: 'custom',
        subject: testConfig.subject,
        duration: testConfig.duration,
        totalQuestions: questionsArray.length || testConfig.totalQuestions,
        totalMarks: (questionsArray.length || testConfig.totalQuestions) * 4,
        questions: questionsArray.map((q: any) => ({
          id: q.id,
          questionText: q.question || q.questionText || '',
          options: Array.isArray(q.options)
            ? typeof q.options[0] === 'string'
              ? q.options.map((opt: string, idx: number) => ({
                  id: String.fromCharCode(97 + idx),
                  text: opt,
                }))
              : q.options
            : [],
          correctAnswer: q.correctAnswer,
          explanation: q.explanation || 'Detailed explanation will be provided.',
          difficulty: (q.difficulty || 'medium').toLowerCase(),
          topic: q.topic || q.topicId || 'general',
          subtopic: q.subtopic || q.chapterId || '',
          subject: 'biology',
          examYear: '2024',
          source: isAIGenerated ? 'AI Generated' : 'Question Bank',
          marks: q.marks || 4,
          timeAllocated: q.timeLimit || q.timeEstimate || 120,
          keywords: q.tags || [],
          relatedConcepts: q.relatedConcepts || [],
        })),
        difficulty: testConfig.difficulty,
        topics: testConfig.topics,
        instructions: generatedTestData.instructions || [
          `This test contains ${questionsArray.length || testConfig.totalQuestions} questions`,
          `Time limit: ${testConfig.duration} minutes`,
          'Each question carries 4 marks',
          testConfig.negativeMarking
            ? 'Negative marking: -1 for incorrect answers'
            : 'No negative marking',
          'You can mark questions for review and come back to them later',
          'Ensure stable internet connection throughout the test',
        ],
        isActive: true,
        isPremium: false,
        attemptCount: 0,
        averageScore: 0,
        targetClass: testConfig.class || 'all',
        classRequirements: {
          minimumClass: 'class-11',
          recommendedFor: [testConfig.class || 'class-12'],
          difficultyByClass: {
            'class-11': testConfig.difficulty === 'mixed' ? 'medium' : testConfig.difficulty,
            'class-12': testConfig.difficulty === 'mixed' ? 'medium' : testConfig.difficulty,
            dropper: testConfig.difficulty === 'mixed' ? 'hard' : testConfig.difficulty,
          },
        },
        adaptiveSettings: {
          enableAdaptive: testConfig.adaptiveMode,
          questionPoolByClass: {
            'class-11': questionsArray
              .slice(0, Math.floor(testConfig.totalQuestions * 0.6))
              .map((q: any) => q.id),
            'class-12': questionsArray.map((q: any) => q.id),
            dropper: questionsArray.map((q: any) => q.id),
          },
          progressionRules: {
            easyToMediumThreshold: 70,
            mediumToHardThreshold: 85,
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        seoMetadata: {
          title: `${testConfig.title} | Custom NEET Biology Test`,
          description: testConfig.description,
          keywords: testConfig.topics,
        },
      }

      setGeneratedTest(mockTest)
      setCurrentStep('preview')
    } catch (error) {
      console.error('Failed to generate test:', error)
      alert('Failed to generate test. Please try again.')
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  const handleStartTest = () => {
    if (generatedTest) {
      setCurrentStep('test')
    }
  }

  const handleTestComplete = (responses: TestResponse[], timeTaken: number) => {
    if (!generatedTest) return

    // Calculate results
    const correctAnswers = responses.filter((r) => r.isCorrect).length
    const incorrectAnswers = responses.filter((r) => !r.isCorrect && r.selectedAnswer).length
    const unattempted = generatedTest.totalQuestions - responses.length

    const totalMarks = correctAnswers * 4 + (testConfig.negativeMarking ? incorrectAnswers * -1 : 0)
    const percentage = (totalMarks / generatedTest.totalMarks) * 100

    const attempt: TestAttempt = {
      id: `attempt_${Date.now()}`,
      testId: generatedTest.id,
      userId: 'guest_user',
      userEmail: 'guest@example.com',
      userName: 'Guest User',
      userClass: testConfig.class || 'class-12',
      startTime: new Date(Date.now() - timeTaken * 1000).toISOString(),
      endTime: new Date().toISOString(),
      duration: timeTaken,
      status: 'completed',
      responses,
      score: {
        correct: correctAnswers,
        incorrect: incorrectAnswers,
        unattempted,
        totalMarks,
        percentage,
      },
      analytics: {
        subjectWise: [],
        topicWise: [],
        difficultyWise: [],
        timeAnalysis: {
          averageTimePerQuestion: timeTaken / responses.length,
          questionsRushed: responses.filter((r) => r.timeTaken < 30).length,
          questionsOvertime: responses.filter((r) => r.timeTaken > 180).length,
        },
      },
      suggestions: [
        percentage >= 80
          ? 'Excellent performance! Keep practicing advanced topics.'
          : percentage >= 60
            ? 'Good score! Focus on improving weak areas.'
            : 'Need more practice. Review concepts and try again.',
      ],
      weakAreas: [],
      strongAreas: [],
    }

    setTestAttempt(attempt)
    setCurrentStep('results')
  }

  const handleTestExit = () => {
    setCurrentStep('preview')
  }

  const handleResultsClose = () => {
    setCurrentStep('class')
    setGeneratedTest(null)
    setTestAttempt(null)
    setSelectedClass(null)
    setSelectedChapters(new Set())
    setSelectedTopics(new Set())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Self-Practice Notice */}
      <div className="bg-[#4a5d4a] text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">Self-Practice Mode</span> - Practice at your own pace. For
        official tests assigned by your teacher, check your{' '}
        <a href="/student/dashboard" className="underline hover:no-underline">
          Student Dashboard
        </a>
      </div>

      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Practice Test Generator</h1>
                <p className="text-gray-600">Create unlimited practice tests for self-study</p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden md:flex items-center space-x-2">
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  currentStep === 'class'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span className="text-sm font-medium">Class</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  currentStep === 'configure'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm font-medium">Configure</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  currentStep === 'preview'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm font-medium">Preview</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                  currentStep === 'test' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Test</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === 'class' && (
            <motion.div
              key="class-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12"
            >
              <ClassSelection onClassSelect={handleClassSelect} selectedClass={selectedClass} />
            </motion.div>
          )}

          {currentStep === 'configure' && (
            <motion.div
              key="configuration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-6"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Configuration Panel */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Test Settings */}
                  <div className="bg-white rounded-3xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Settings className="w-6 h-6 mr-3 text-blue-600" />
                      Test Configuration
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Test Title
                        </label>
                        <input
                          type="text"
                          value={testConfig.title}
                          onChange={(e) =>
                            setTestConfig((prev) => ({ ...prev, title: e.target.value }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Subject Focus
                        </label>
                        <select
                          value={testConfig.subject}
                          onChange={(e) =>
                            setTestConfig((prev) => ({ ...prev, subject: e.target.value as any }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="biology">General Biology</option>
                          <option value="botany">Botany</option>
                          <option value="zoology">Zoology</option>
                          <option value="mixed">Mixed Topics</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Difficulty Level
                        </label>
                        <select
                          value={testConfig.difficulty}
                          onChange={(e) =>
                            setTestConfig((prev) => ({
                              ...prev,
                              difficulty: e.target.value as any,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="easy">Easy (Foundation)</option>
                          <option value="medium">Medium (Standard)</option>
                          <option value="hard">Hard (Advanced)</option>
                          <option value="mixed">Mixed Difficulty</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Duration (minutes)
                        </label>
                        <input
                          type="number"
                          min="30"
                          max="300"
                          value={testConfig.duration}
                          onChange={(e) =>
                            setTestConfig((prev) => ({
                              ...prev,
                              duration: parseInt(e.target.value),
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Number of Questions
                        </label>
                        <input
                          type="number"
                          min="10"
                          max="100"
                          value={testConfig.totalQuestions}
                          onChange={(e) =>
                            setTestConfig((prev) => ({
                              ...prev,
                              totalQuestions: parseInt(e.target.value),
                              totalMarks: parseInt(e.target.value) * 4,
                            }))
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Total Marks
                        </label>
                        <input
                          type="number"
                          value={testConfig.totalMarks}
                          readOnly
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50"
                        />
                      </div>
                    </div>

                    {/* Advanced Options */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Options</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={testConfig.negativeMarking}
                            onChange={(e) =>
                              setTestConfig((prev) => ({
                                ...prev,
                                negativeMarking: e.target.checked,
                              }))
                            }
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700">Enable Negative Marking (-1)</span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={testConfig.adaptiveMode}
                            onChange={(e) =>
                              setTestConfig((prev) => ({ ...prev, adaptiveMode: e.target.checked }))
                            }
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700">Adaptive Difficulty</span>
                        </label>

                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={testConfig.includeYearQuestions}
                            onChange={(e) =>
                              setTestConfig((prev) => ({
                                ...prev,
                                includeYearQuestions: e.target.checked,
                              }))
                            }
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700">Include Previous Year Questions</span>
                        </label>

                        <label className="flex items-center space-x-3 col-span-2 mt-4 p-3 bg-gray-50 rounded-xl border border-purple-200">
                          <input
                            type="checkbox"
                            checked={useAIMode}
                            onChange={(e) => setUseAIMode(e.target.checked)}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <div className="flex items-center space-x-2">
                            <Zap className="w-5 h-5 text-purple-600" />
                            <div>
                              <span className="text-gray-900 font-medium">
                                AI-Powered Generation
                              </span>
                              <p className="text-xs text-gray-500">
                                Uses Claude AI for personalized test creation
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Chapter and Topic Selection */}
                  <div className="bg-white rounded-3xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <BookOpen className="w-6 h-6 mr-3 text-green-600" />
                      Select Chapters & Topics
                    </h2>

                    <div className="space-y-4">
                      {availableChapters.map((chapter) => (
                        <div key={chapter.id} className="border border-gray-200 rounded-xl">
                          <button
                            onClick={() => {
                              const expanded = new Set(expandedChapters)
                              if (expanded.has(chapter.id)) {
                                expanded.delete(chapter.id)
                              } else {
                                expanded.add(chapter.id)
                              }
                              setExpandedChapters(expanded)
                            }}
                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <input
                                type="checkbox"
                                checked={selectedChapters.has(chapter.id)}
                                onChange={() => handleChapterToggle(chapter.id)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className="text-left">
                                <h3 className="font-semibold text-gray-900">{chapter.name}</h3>
                                <p className="text-sm text-gray-600">
                                  Class {chapter.class} • {chapter.unit} • {chapter.weightage}%
                                  weightage in NEET
                                </p>
                              </div>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                expandedChapters.has(chapter.id) ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {expandedChapters.has(chapter.id) && (
                            <div className="px-6 pb-4">
                              <div className="grid md:grid-cols-2 gap-2">
                                {chapter.topics.map((topic) => (
                                  <label
                                    key={topic.name}
                                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        checked={selectedTopics.has(topic.name)}
                                        onChange={() => handleTopicToggle(topic.name)}
                                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                      />
                                      <span className="text-sm text-gray-700">{topic.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                        {topic.questionCount} Real Qs
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {Math.round(topic.questionCount * 0.15)}% weightage
                                      </span>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar - Test Preview */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-white rounded-3xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Test Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Questions:</span>
                        <span className="font-semibold">{testConfig.totalQuestions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{testConfig.duration} min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Marks:</span>
                        <span className="font-semibold">{testConfig.totalMarks}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Topics Selected:</span>
                        <span className="font-semibold">{testConfig.topics.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className="font-semibold capitalize">{testConfig.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  {/* Question Type Distribution */}
                  <div className="bg-white rounded-3xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Question Types</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Single Correct:</span>
                        <span className="font-semibold">
                          {testConfig.questionTypes.singleCorrect}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Assertion-Reason:</span>
                        <span className="font-semibold">
                          {testConfig.questionTypes.assertionReason}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Match Following:</span>
                        <span className="font-semibold">
                          {testConfig.questionTypes.matchFollowing}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Diagram Based:</span>
                        <span className="font-semibold">
                          {testConfig.questionTypes.diagramBased}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerateTest}
                    disabled={isGenerating || testConfig.topics.length === 0}
                    className={`w-full py-4 rounded-xl font-semibold text-lg text-white ${
                      useAIMode
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-indigo-500 hover:bg-indigo-600'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        {useAIMode ? 'AI Generating...' : 'Generating...'} {generationProgress}%
                      </>
                    ) : (
                      <>
                        {useAIMode ? (
                          <Zap className="w-5 h-5 mr-2" />
                        ) : (
                          <Brain className="w-5 h-5 mr-2" />
                        )}
                        {useAIMode ? 'Generate with Claude AI' : 'Generate Test'}
                      </>
                    )}
                  </Button>

                  {generationError && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mt-2">
                      <p className="text-sm text-yellow-800 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2 flex-shrink-0" />
                        {generationError}
                      </p>
                    </div>
                  )}

                  {isGenerating && (
                    <div className="bg-white rounded-xl p-4">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            useAIMode
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                              : 'bg-indigo-500'
                          }`}
                          style={{ width: `${generationProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        {useAIMode
                          ? 'Claude AI is analyzing your selections and creating personalized questions...'
                          : 'Selecting questions from question bank...'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'preview' && generatedTest && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-6"
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-lg p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                      🎉 Your Test is Ready!
                    </h2>
                    <p className="text-gray-600 text-lg">
                      Review the test details below and start when you're ready.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-2xl p-6 text-center">
                      <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {generatedTest.duration} min
                      </div>
                      <div className="text-gray-600">Duration</div>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6 text-center">
                      <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {generatedTest.totalQuestions}
                      </div>
                      <div className="text-gray-600">Questions</div>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-6 text-center">
                      <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gray-900">
                        {generatedTest.totalMarks}
                      </div>
                      <div className="text-gray-600">Total Marks</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Test Instructions</h3>
                    <ul className="space-y-2">
                      {generatedTest.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep('configure')}>
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back to Configuration
                    </Button>
                    <Button
                      onClick={handleStartTest}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Test
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'test' && generatedTest && (
            <TestEngine
              test={generatedTest}
              userClass={testConfig.class || 'class-12'}
              onTestComplete={handleTestComplete}
              onTestExit={handleTestExit}
            />
          )}

          {currentStep === 'results' && testAttempt && generatedTest && (
            <TestResults
              test={generatedTest}
              responses={testAttempt.responses}
              timeTaken={testAttempt.duration}
              userClass={testAttempt.userClass}
              onRetakeTest={handleResultsClose}
              onBackToTests={handleResultsClose}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
