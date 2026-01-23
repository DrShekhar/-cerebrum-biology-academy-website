'use client'

// Force dynamic rendering to prevent auth issues during static build
export const dynamic = 'force-dynamic'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  Brain,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Target,
  Users,
  CheckCircle,
  Settings,
  Zap,
  ChevronDown,
  ChevronRight,
  Save,
  Eye,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  class11Chapters,
  class12Chapters,
  phase1PriorityTopics,
} from '@/data/ncertBiologyContentDatabase'
import { authenticQuestionBank } from '@/data/authenticQuestions'

type Step = 'basic' | 'questions' | 'assign' | 'review'

interface TestConfig {
  title: string
  description: string
  class: 'class-11' | 'class-12' | 'dropper' | null
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  duration: number
  totalQuestions: number
  totalMarks: number
  negativeMarking: boolean
  shuffleQuestions: boolean
  showResults: 'immediately' | 'after_deadline' | 'manual'
  selectedChapters: string[]
  selectedTopics: string[]
  dueDate: string
  dueTime: string
  assignTo: {
    type: 'ALL' | 'CLASS' | 'BATCH' | 'INDIVIDUAL'
    classId?: string
    batchId?: string
    studentIds?: string[]
  }
  useAI: boolean
}

export default function CreateTestAssignmentPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('basic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const [config, setConfig] = useState<TestConfig>({
    title: '',
    description: '',
    class: null,
    difficulty: 'medium',
    duration: 60,
    totalQuestions: 30,
    totalMarks: 120,
    negativeMarking: true,
    shuffleQuestions: true,
    showResults: 'after_deadline',
    selectedChapters: [],
    selectedTopics: [],
    dueDate: '',
    dueTime: '18:00',
    assignTo: {
      type: 'ALL',
    },
    useAI: false,
  })

  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set())
  const [availableChapters, setAvailableChapters] = useState<any[]>([])
  const [classes, setClasses] = useState([
    { id: 'class-11-a', name: 'Class 11 - A', studentCount: 45 },
    { id: 'class-11-b', name: 'Class 11 - B', studentCount: 42 },
    { id: 'class-12-a', name: 'Class 12 - A', studentCount: 38 },
    { id: 'class-12-b', name: 'Class 12 - B', studentCount: 40 },
  ])

  useEffect(() => {
    if (!authLoading && (!isAuthenticated || user?.role !== 'TEACHER')) {
      window.location.href = '/sign-in'
      return
    }
  }, [authLoading, isAuthenticated, user])

  useEffect(() => {
    if (config.class) {
      const chapters =
        config.class === 'class-11'
          ? class11Chapters
          : config.class === 'class-12'
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
          .flatMap((topic) => topic.subtopics.map((subtopic) => ({ name: subtopic }))),
      }))

      setAvailableChapters(formattedChapters)
    }
  }, [config.class])

  const steps: { id: Step; label: string; icon: React.ReactNode }[] = [
    { id: 'basic', label: 'Basic Info', icon: <Settings className="w-4 h-4" /> },
    { id: 'questions', label: 'Questions', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'assign', label: 'Assign', icon: <Users className="w-4 h-4" /> },
    { id: 'review', label: 'Review', icon: <Eye className="w-4 h-4" /> },
  ]

  const handleChapterToggle = (chapterId: string) => {
    const newSelected = new Set(config.selectedChapters)
    if (newSelected.has(chapterId)) {
      newSelected.delete(chapterId)
    } else {
      newSelected.add(chapterId)
    }
    setConfig((prev) => ({ ...prev, selectedChapters: Array.from(newSelected) }))
  }

  const handleTopicToggle = (topic: string) => {
    const newSelected = new Set(config.selectedTopics)
    if (newSelected.has(topic)) {
      newSelected.delete(topic)
    } else {
      newSelected.add(topic)
    }
    setConfig((prev) => ({ ...prev, selectedTopics: Array.from(newSelected) }))
  }

  const getAvailableQuestionCount = () => {
    if (!config.class) return 0
    const questions = authenticQuestionBank[config.class] || []
    return questions.length
  }

  const handleCreateTest = async (asDraft: boolean = false) => {
    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setGenerationProgress(i)
      }

      const response = await fetch('/api/teacher/test-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          status: asDraft ? 'DRAFT' : 'PUBLISHED',
        }),
      })

      if (response.ok) {
        router.push('/teacher/test-assignment')
      } else {
        router.push('/teacher/test-assignment')
      }
    } catch (error) {
      console.error('Error creating test:', error)
      router.push('/teacher/test-assignment')
    } finally {
      setIsGenerating(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 'basic':
        return config.title && config.class && config.duration > 0
      case 'questions':
        return config.selectedChapters.length > 0 || config.selectedTopics.length > 0
      case 'assign':
        return config.dueDate && config.assignTo.type
      case 'review':
        return true
      default:
        return false
    }
  }

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/teacher/test-assignment">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  Create Test Assignment
                </h1>
                <p className="text-gray-600">Set up a new MCQ test for your students</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-6 gap-2">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setCurrentStep(step.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                    currentStep === step.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-500 hover:bg-gray-100'
                  )}
                >
                  {step.icon}
                  <span className="font-medium">{step.label}</span>
                </button>
                {index < steps.length - 1 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'basic' && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Title *
                  </label>
                  <Input
                    value={config.title}
                    onChange={(e) => setConfig((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Cell Biology Mid-Term Test"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={config.description}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Brief description of what this test covers..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Class *
                    </label>
                    <select
                      value={config.class || ''}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          class: e.target.value as any,
                          selectedChapters: [],
                          selectedTopics: [],
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select Class</option>
                      <option value="class-11">Class 11</option>
                      <option value="class-12">Class 12</option>
                      <option value="dropper">Dropper (Both)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select
                      value={config.difficulty}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, difficulty: e.target.value as any }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes) *
                    </label>
                    <Input
                      type="number"
                      min={10}
                      max={180}
                      value={config.duration}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, duration: parseInt(e.target.value) }))
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Questions
                    </label>
                    <Input
                      type="number"
                      min={5}
                      max={100}
                      value={config.totalQuestions}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          totalQuestions: parseInt(e.target.value),
                          totalMarks: parseInt(e.target.value) * 4,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={config.negativeMarking}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, negativeMarking: e.target.checked }))
                      }
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm">Negative Marking (-1)</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={config.shuffleQuestions}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, shuffleQuestions: e.target.checked }))
                      }
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm">Shuffle Questions</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-purple-200 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100">
                    <input
                      type="checkbox"
                      checked={config.useAI}
                      onChange={(e) => setConfig((prev) => ({ ...prev, useAI: e.target.checked }))}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">AI Selection</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'questions' && (
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Select Topics & Chapters</h2>
                <div className="text-sm text-gray-600">
                  Available: {getAvailableQuestionCount()} questions
                </div>
              </div>

              {!config.class ? (
                <div className="text-center py-12 text-gray-500">
                  Please select a target class in the previous step first.
                </div>
              ) : (
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
                            checked={config.selectedChapters.includes(chapter.id)}
                            onChange={() => handleChapterToggle(chapter.id)}
                            className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="text-left">
                            <h3 className="font-semibold text-gray-900">{chapter.name}</h3>
                            <p className="text-sm text-gray-600">
                              Class {chapter.class} | {chapter.unit} | {chapter.weightage}%
                              weightage
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-gray-400 transition-transform',
                            expandedChapters.has(chapter.id) ? 'rotate-180' : ''
                          )}
                        />
                      </button>

                      {expandedChapters.has(chapter.id) && chapter.topics.length > 0 && (
                        <div className="px-6 pb-4">
                          <div className="grid md:grid-cols-2 gap-2">
                            {chapter.topics.map((topic: { name: string }) => (
                              <label
                                key={topic.name}
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={config.selectedTopics.includes(topic.name)}
                                  onChange={() => handleTopicToggle(topic.name)}
                                  className="w-4 h-4 text-purple-600 rounded"
                                />
                                <span className="text-sm text-gray-700">{topic.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-purple-900">Selection Summary</h4>
                    <p className="text-sm text-purple-700">
                      {config.selectedChapters.length} chapters, {config.selectedTopics.length}{' '}
                      topics selected
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-900">
                      {config.totalQuestions} questions
                    </p>
                    <p className="text-sm text-purple-700">{config.totalMarks} marks total</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'assign' && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-6">Assignment Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Due Date *
                    </label>
                    <Input
                      type="date"
                      value={config.dueDate}
                      onChange={(e) => setConfig((prev) => ({ ...prev, dueDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Time</label>
                    <Input
                      type="time"
                      value={config.dueTime}
                      onChange={(e) => setConfig((prev) => ({ ...prev, dueTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['ALL', 'CLASS', 'BATCH', 'INDIVIDUAL'].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setConfig((prev) => ({
                            ...prev,
                            assignTo: { ...prev.assignTo, type: type as any },
                          }))
                        }
                        className={cn(
                          'p-3 border rounded-lg text-center transition-all',
                          config.assignTo.type === type
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <span className="text-sm font-medium">
                          {type === 'ALL'
                            ? 'All Students'
                            : type === 'CLASS'
                              ? 'By Class'
                              : type === 'BATCH'
                                ? 'By Batch'
                                : 'Individual'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {config.assignTo.type === 'CLASS' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Class
                    </label>
                    <select
                      value={config.assignTo.classId || ''}
                      onChange={(e) =>
                        setConfig((prev) => ({
                          ...prev,
                          assignTo: { ...prev.assignTo, classId: e.target.value },
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a class</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                          {cls.name} ({cls.studentCount} students)
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Show Results
                  </label>
                  <select
                    value={config.showResults}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, showResults: e.target.value as any }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="immediately">Immediately after submission</option>
                    <option value="after_deadline">After due date</option>
                    <option value="manual">Manually release</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 'review' && (
          <Card>
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-6">Review Test Assignment</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-900">{config.totalQuestions}</p>
                    <p className="text-sm text-blue-700">Questions</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-900">{config.duration}</p>
                    <p className="text-sm text-green-700">Minutes</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-900">{config.totalMarks}</p>
                    <p className="text-sm text-purple-700">Total Marks</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg text-center">
                    <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-900">
                      {config.assignTo.type === 'ALL'
                        ? 'All'
                        : config.assignTo.type === 'CLASS'
                          ? classes.find((c) => c.id === config.assignTo.classId)?.studentCount || 0
                          : '-'}
                    </p>
                    <p className="text-sm text-orange-700">Students</p>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg divide-y">
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-600">Title</span>
                    <span className="font-medium">{config.title || '-'}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-600">Target Class</span>
                    <span className="font-medium">{config.class || '-'}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-600">Difficulty</span>
                    <span className="font-medium capitalize">{config.difficulty}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-600">Due Date</span>
                    <span className="font-medium">
                      {config.dueDate ? `${config.dueDate} at ${config.dueTime}` : '-'}
                    </span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-600">Chapters Selected</span>
                    <span className="font-medium">{config.selectedChapters.length}</span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-600">Negative Marking</span>
                    <span className="font-medium">
                      {config.negativeMarking ? 'Yes (-1)' : 'No'}
                    </span>
                  </div>
                  <div className="p-4 flex justify-between">
                    <span className="text-gray-600">AI Selection</span>
                    <span className="font-medium">{config.useAI ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => {
              const stepOrder: Step[] = ['basic', 'questions', 'assign', 'review']
              const currentIndex = stepOrder.indexOf(currentStep)
              if (currentIndex > 0) {
                setCurrentStep(stepOrder[currentIndex - 1])
              }
            }}
            disabled={currentStep === 'basic'}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-3">
            {currentStep === 'review' ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleCreateTest(true)}
                  disabled={isGenerating}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
                <Button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => handleCreateTest(false)}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>Generating... {generationProgress}%</>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Create & Publish
                    </>
                  )}
                </Button>
              </>
            ) : (
              <Button
                className="bg-indigo-500 hover:bg-indigo-600 text-white"
                onClick={() => {
                  const stepOrder: Step[] = ['basic', 'questions', 'assign', 'review']
                  const currentIndex = stepOrder.indexOf(currentStep)
                  if (currentIndex < stepOrder.length - 1) {
                    setCurrentStep(stepOrder[currentIndex + 1])
                  }
                }}
                disabled={!canProceed()}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
