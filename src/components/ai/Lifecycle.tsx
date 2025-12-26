'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Save,
  Send,
  Calendar,
  Copy,
  Play,
  Key,
  BookOpen,
  RotateCcw,
  FileText,
  Clock,
  Users,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  Info,
  Trash2,
  Download,
  Upload,
  Settings,
  Archive,
  Target,
  Award,
  Zap,
  RefreshCw,
  Globe,
  Lock,
  Unlock,
  Calendar as CalendarIcon,
  Timer,
  History,
  Plus,
  Minus
} from 'lucide-react'

// Types and Interfaces
interface TestLifecycle {
  id: string
  title: string
  status: 'draft' | 'published' | 'scheduled' | 'archived' | 'practice'
  version: string
  createdAt: string
  lastModified: string
  publishedAt?: string
  scheduledFor?: string
  createdBy: string
  totalQuestions: number
  totalMarks: number
  duration: number
  participants: number
  completionRate: number
  averageScore: number
}

interface DraftSettings {
  autoSave: boolean
  saveInterval: number
  versions: {
    id: string
    version: string
    timestamp: string
    changes: string
    author: string
  }[]
  collaborators: string[]
  lastSaved: string
}

interface PublishSettings {
  publishImmediately: boolean
  publishDate?: string
  publishTime?: string
  notifyStudents: boolean
  notificationMessage: string
  accessRestrictions: {
    ipWhitelist: string[]
    deviceLimit: number
    browserRequirements: string[]
  }
  securitySettings: {
    preventCopyPaste: boolean
    preventPrintScreen: boolean
    lockdownBrowser: boolean
    webcamMonitoring: boolean
  }
}

interface ScheduleSettings {
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  timezone: string
  gracePeriod: number
  autoExtensions: boolean
  reminderNotifications: {
    enabled: boolean
    intervals: number[] // days before
  }
  availabilityWindows: {
    id: string
    name: string
    start: string
    end: string
    timezone: string
    isActive: boolean
  }[]
}

interface CloneSettings {
  newTitle: string
  targetYear: string
  preserveSchedule: boolean
  updateQuestions: boolean
  resetAnalytics: boolean
  cloneType: 'exact' | 'updated' | 'template'
  questionUpdates: {
    refreshContent: boolean
    updateDifficulty: boolean
    addNewQuestions: boolean
    removeOutdated: boolean
  }
}

interface PracticeModeSettings {
  allowUnlimitedAttempts: boolean
  showAnswersImmediately: boolean
  showExplanations: boolean
  showScoreAfterEach: boolean
  enableHints: boolean
  randomizeQuestions: boolean
  timeLimit: {
    enabled: boolean
    duration: number
  }
  feedbackLevel: 'none' | 'basic' | 'detailed' | 'comprehensive'
}

interface AnswerKeySettings {
  includeExplanations: boolean
  includeReferences: boolean
  includeMarkingScheme: boolean
  format: 'pdf' | 'html' | 'word' | 'excel'
  accessLevel: 'public' | 'teachers' | 'restricted'
  watermark: string
  generateQRCode: boolean
  includeStatistics: boolean
}

interface SolutionReleaseSettings {
  releaseType: 'immediate' | 'scheduled' | 'manual'
  releaseDate?: string
  releaseTime?: string
  accessControl: {
    requireCompletion: boolean
    minimumScore: number
    waitPeriod: number // hours after completion
  }
  contentLevel: 'answers' | 'explanations' | 'detailed' | 'complete'
  distributionMethod: 'platform' | 'email' | 'download' | 'all'
}

interface RegradeOptions {
  regradeType: 'partial' | 'complete' | 'specific_questions'
  selectedQuestions: string[]
  reason: string
  notifyStudents: boolean
  preserveOriginalScores: boolean
  approvalRequired: boolean
  regradeBy: string
  deadline: string
  affectedStudents: {
    id: string
    name: string
    originalScore: number
    newScore?: number
    improvement: number
  }[]
}

const Lifecycle: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'draft' | 'publish' | 'schedule' | 'clone' | 'practice' | 'answers' | 'solutions' | 'regrade'>('draft')
  const [tests, setTests] = useState<TestLifecycle[]>([])
  const [selectedTest, setSelectedTest] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [draftSettings, setDraftSettings] = useState<DraftSettings>({
    autoSave: true,
    saveInterval: 30,
    versions: [],
    collaborators: [],
    lastSaved: new Date().toISOString()
  })

  const [publishSettings, setPublishSettings] = useState<PublishSettings>({
    publishImmediately: true,
    notifyStudents: true,
    notificationMessage: 'A new test has been published and is now available.',
    accessRestrictions: {
      ipWhitelist: [],
      deviceLimit: 1,
      browserRequirements: ['Chrome', 'Firefox', 'Safari']
    },
    securitySettings: {
      preventCopyPaste: true,
      preventPrintScreen: true,
      lockdownBrowser: false,
      webcamMonitoring: false
    }
  })

  const [scheduleSettings, setScheduleSettings] = useState<ScheduleSettings>({
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    timezone: 'UTC',
    gracePeriod: 15,
    autoExtensions: false,
    reminderNotifications: {
      enabled: true,
      intervals: [7, 3, 1]
    },
    availabilityWindows: []
  })

  const [cloneSettings, setCloneSettings] = useState<CloneSettings>({
    newTitle: '',
    targetYear: new Date().getFullYear().toString(),
    preserveSchedule: false,
    updateQuestions: true,
    resetAnalytics: true,
    cloneType: 'updated',
    questionUpdates: {
      refreshContent: true,
      updateDifficulty: false,
      addNewQuestions: true,
      removeOutdated: true
    }
  })

  const [practiceModeSettings, setPracticeModeSettings] = useState<PracticeModeSettings>({
    allowUnlimitedAttempts: true,
    showAnswersImmediately: false,
    showExplanations: true,
    showScoreAfterEach: true,
    enableHints: true,
    randomizeQuestions: true,
    timeLimit: {
      enabled: false,
      duration: 60
    },
    feedbackLevel: 'detailed'
  })

  const [answerKeySettings, setAnswerKeySettings] = useState<AnswerKeySettings>({
    includeExplanations: true,
    includeReferences: true,
    includeMarkingScheme: true,
    format: 'pdf',
    accessLevel: 'teachers',
    watermark: 'Confidential - Teacher Use Only',
    generateQRCode: true,
    includeStatistics: true
  })

  const [solutionReleaseSettings, setSolutionReleaseSettings] = useState<SolutionReleaseSettings>({
    releaseType: 'scheduled',
    accessControl: {
      requireCompletion: true,
      minimumScore: 0,
      waitPeriod: 2
    },
    contentLevel: 'complete',
    distributionMethod: 'platform'
  })

  const [regradeOptions, setRegradeOptions] = useState<RegradeOptions>({
    regradeType: 'partial',
    selectedQuestions: [],
    reason: '',
    notifyStudents: true,
    preserveOriginalScores: true,
    approvalRequired: true,
    regradeBy: 'instructor',
    deadline: '',
    affectedStudents: []
  })

  // Initialize mock data
  useEffect(() => {
    generateMockTests()
    generateMockVersions()
  }, [])

  const generateMockTests = () => {
    const mockTests: TestLifecycle[] = [
      {
        id: 'test_1',
        title: 'NEET Biology Mock Test 1',
        status: 'published',
        version: '2.1',
        createdAt: '2024-01-15T10:00:00Z',
        lastModified: '2024-01-16T14:30:00Z',
        publishedAt: '2024-01-16T15:00:00Z',
        createdBy: 'Dr. Smith',
        totalQuestions: 50,
        totalMarks: 200,
        duration: 180,
        participants: 245,
        completionRate: 87.3,
        averageScore: 68.5
      },
      {
        id: 'test_2',
        title: 'Cell Biology Quiz',
        status: 'draft',
        version: '1.0',
        createdAt: '2024-01-18T09:00:00Z',
        lastModified: '2024-01-18T16:45:00Z',
        createdBy: 'Prof. Johnson',
        totalQuestions: 25,
        totalMarks: 100,
        duration: 60,
        participants: 0,
        completionRate: 0,
        averageScore: 0
      },
      {
        id: 'test_3',
        title: 'Genetics Assessment',
        status: 'scheduled',
        version: '1.5',
        createdAt: '2024-01-10T11:00:00Z',
        lastModified: '2024-01-17T13:20:00Z',
        scheduledFor: '2024-01-25T09:00:00Z',
        createdBy: 'Dr. Patel',
        totalQuestions: 40,
        totalMarks: 160,
        duration: 120,
        participants: 0,
        completionRate: 0,
        averageScore: 0
      }
    ]
    setTests(mockTests)
    if (mockTests.length > 0) {
      setSelectedTest(mockTests[0].id)
    }
  }

  const generateMockVersions = () => {
    const mockVersions = [
      {
        id: 'v1',
        version: '2.1',
        timestamp: '2024-01-16T14:30:00Z',
        changes: 'Updated question 15, fixed typo in question 22',
        author: 'Dr. Smith'
      },
      {
        id: 'v2',
        version: '2.0',
        timestamp: '2024-01-16T10:15:00Z',
        changes: 'Added 5 new questions, revised difficulty distribution',
        author: 'Dr. Smith'
      },
      {
        id: 'v3',
        version: '1.9',
        timestamp: '2024-01-15T16:45:00Z',
        changes: 'Initial draft completion',
        author: 'Dr. Smith'
      }
    ]
    setDraftSettings(prev => ({ ...prev, versions: mockVersions }))
  }

  // Action handlers
  const saveAsDraft = () => {
    setSaving(true)
    setTimeout(() => {
      const newVersion = {
        id: `v${Date.now()}`,
        version: '2.2',
        timestamp: new Date().toISOString(),
        changes: 'Manual save triggered',
        author: 'Current User'
      }
      setDraftSettings(prev => ({
        ...prev,
        versions: [newVersion, ...prev.versions],
        lastSaved: new Date().toISOString()
      }))
      setSaving(false)
    }, 2000)
  }

  const publishTest = () => {
    setLoading(true)
    setTimeout(() => {
      setTests(prev => prev.map(test =>
        test.id === selectedTest
          ? { ...test, status: 'published', publishedAt: new Date().toISOString() }
          : test
      ))
      setLoading(false)
    }, 3000)
  }

  const scheduleTest = () => {
    setLoading(true)
    setTimeout(() => {
      const scheduleDateTime = `${scheduleSettings.startDate}T${scheduleSettings.startTime}:00Z`
      setTests(prev => prev.map(test =>
        test.id === selectedTest
          ? { ...test, status: 'scheduled', scheduledFor: scheduleDateTime }
          : test
      ))
      setLoading(false)
    }, 2000)
  }

  const cloneTest = () => {
    setLoading(true)
    setTimeout(() => {
      const originalTest = tests.find(test => test.id === selectedTest)
      if (originalTest) {
        const clonedTest: TestLifecycle = {
          ...originalTest,
          id: `test_${Date.now()}`,
          title: cloneSettings.newTitle || `${originalTest.title} (${cloneSettings.targetYear})`,
          status: 'draft',
          version: '1.0',
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          publishedAt: undefined,
          scheduledFor: undefined,
          participants: 0,
          completionRate: 0,
          averageScore: 0
        }
        setTests(prev => [...prev, clonedTest])
      }
      setLoading(false)
    }, 2500)
  }

  const convertToPractice = () => {
    setLoading(true)
    setTimeout(() => {
      setTests(prev => prev.map(test =>
        test.id === selectedTest
          ? { ...test, status: 'practice' }
          : test
      ))
      setLoading(false)
    }, 2000)
  }

  const generateAnswerKey = () => {
    setLoading(true)
    setTimeout(() => {
      // Simulate answer key generation
      const blob = new Blob(['Mock Answer Key Content'], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `answer-key-${selectedTest}.${answerKeySettings.format}`
      link.click()
      setLoading(false)
    }, 3000)
  }

  const releaseSolutions = () => {
    setLoading(true)
    setTimeout(() => {
      // Simulate solution release
      setLoading(false)
    }, 2000)
  }

  const performRegrade = () => {
    setLoading(true)
    setTimeout(() => {
      // Simulate regrade process
      const mockAffectedStudents = [
        { id: 's1', name: 'John Doe', originalScore: 75, newScore: 78, improvement: 3 },
        { id: 's2', name: 'Jane Smith', originalScore: 82, newScore: 85, improvement: 3 },
        { id: 's3', name: 'Mike Johnson', originalScore: 69, newScore: 72, improvement: 3 }
      ]
      setRegradeOptions(prev => ({ ...prev, affectedStudents: mockAffectedStudents }))
      setLoading(false)
    }, 4000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-600 bg-green-100'
      case 'draft': return 'text-gray-600 bg-gray-100'
      case 'scheduled': return 'text-blue-600 bg-blue-100'
      case 'archived': return 'text-yellow-600 bg-yellow-100'
      case 'practice': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSelectedTestData = () => {
    return tests.find(test => test.id === selectedTest)
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
          <div className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            Test Lifecycle Management
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Complete test lifecycle management from draft to publication, with scheduling, cloning, practice modes, and comprehensive grading options
        </p>
      </div>

      {/* Test Selection */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Test
              </label>
              <select
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="">Choose a test...</option>
                {tests.map(test => (
                  <option key={test.id} value={test.id}>
                    {test.title} (v{test.version})
                  </option>
                ))}
              </select>
            </div>
            {selectedTest && (
              <div className="text-sm">
                <div className="font-medium">{getSelectedTestData()?.title}</div>
                <div className="text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getSelectedTestData()?.status || '')}`}>
                    {getSelectedTestData()?.status}
                  </span>
                  <span className="ml-2">v{getSelectedTestData()?.version}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-cyan-600 text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Test
            </button>
          </div>
        </div>
      </div>

      {/* Test Overview */}
      {selectedTest && getSelectedTestData() && (
        <div className="bg-white rounded-xl p-6 border">
          <h3 className="text-lg font-semibold mb-4">Test Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">{getSelectedTestData()?.totalQuestions}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getSelectedTestData()?.totalMarks}</div>
              <div className="text-sm text-gray-600">Total Marks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{getSelectedTestData()?.duration}m</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{getSelectedTestData()?.participants}</div>
              <div className="text-sm text-gray-600">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getSelectedTestData()?.completionRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{getSelectedTestData()?.averageScore.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'draft', label: 'Draft', icon: Save },
            { id: 'publish', label: 'Publish', icon: Send },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'clone', label: 'Clone', icon: Copy },
            { id: 'practice', label: 'Practice', icon: Play },
            { id: 'answers', label: 'Answer Key', icon: Key },
            { id: 'solutions', label: 'Solutions', icon: BookOpen },
            { id: 'regrade', label: 'Regrade', icon: RotateCcw }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-cyan-600 shadow-md'
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
        {/* Save as Draft */}
        {activeTab === 'draft' && (
          <motion.div
            key="draft"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Draft Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Save className="w-5 h-5 text-gray-600" />
                Draft Management
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse" />
                    <span className="font-medium">Auto-save Status</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Last saved: {new Date(draftSettings.lastSaved).toLocaleTimeString()}
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={draftSettings.autoSave}
                      onChange={(e) => setDraftSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable auto-save</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-save interval (seconds)
                  </label>
                  <input
                    type="number"
                    value={draftSettings.saveInterval}
                    onChange={(e) => setDraftSettings(prev => ({ ...prev, saveInterval: parseInt(e.target.value) }))}
                    min="10"
                    max="300"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collaborators
                  </label>
                  <input
                    type="text"
                    placeholder="Add collaborator email..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={saveAsDraft}
                  disabled={saving}
                  className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Draft
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Version History */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-blue-600" />
                Version History
              </h3>

              <div className="space-y-3">
                {draftSettings.versions.map((version, index) => (
                  <div key={version.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">v{version.version}</span>
                        {index === 0 && (
                          <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(version.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{version.changes}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>By {version.author}</span>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">View</button>
                        <button className="text-green-600 hover:text-green-800">Restore</button>
                        <button className="text-purple-600 hover:text-purple-800">Compare</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Publish Test */}
        {activeTab === 'publish' && (
          <motion.div
            key="publish"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Publication Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Send className="w-5 h-5 text-green-600" />
                Publication Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={publishSettings.publishImmediately}
                      onChange={(e) => setPublishSettings(prev => ({ ...prev, publishImmediately: e.target.checked }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
                  </label>
                </div>

                {!publishSettings.publishImmediately && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        value={publishSettings.publishDate}
                        onChange={(e) => setPublishSettings(prev => ({ ...prev, publishDate: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Publish Time
                      </label>
                      <input
                        type="time"
                        value={publishSettings.publishTime}
                        onChange={(e) => setPublishSettings(prev => ({ ...prev, publishTime: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={publishSettings.notifyStudents}
                      onChange={(e) => setPublishSettings(prev => ({ ...prev, notifyStudents: e.target.checked }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Notify students</span>
                  </label>
                </div>

                {publishSettings.notifyStudents && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Message
                    </label>
                    <textarea
                      value={publishSettings.notificationMessage}
                      onChange={(e) => setPublishSettings(prev => ({ ...prev, notificationMessage: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Device Limit per Student
                  </label>
                  <input
                    type="number"
                    value={publishSettings.accessRestrictions.deviceLimit}
                    onChange={(e) => setPublishSettings(prev => ({
                      ...prev,
                      accessRestrictions: {
                        ...prev.accessRestrictions,
                        deviceLimit: parseInt(e.target.value)
                      }
                    }))}
                    min="1"
                    max="5"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={publishTest}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Publish Test
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Security Settings
              </h3>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={publishSettings.securitySettings.preventCopyPaste}
                      onChange={(e) => setPublishSettings(prev => ({
                        ...prev,
                        securitySettings: {
                          ...prev.securitySettings,
                          preventCopyPaste: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Prevent copy/paste</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={publishSettings.securitySettings.preventPrintScreen}
                      onChange={(e) => setPublishSettings(prev => ({
                        ...prev,
                        securitySettings: {
                          ...prev.securitySettings,
                          preventPrintScreen: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Prevent print screen</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={publishSettings.securitySettings.lockdownBrowser}
                      onChange={(e) => setPublishSettings(prev => ({
                        ...prev,
                        securitySettings: {
                          ...prev.securitySettings,
                          lockdownBrowser: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require lockdown browser</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={publishSettings.securitySettings.webcamMonitoring}
                      onChange={(e) => setPublishSettings(prev => ({
                        ...prev,
                        securitySettings: {
                          ...prev.securitySettings,
                          webcamMonitoring: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable webcam monitoring</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allowed Browsers
                  </label>
                  <div className="space-y-2">
                    {['Chrome', 'Firefox', 'Safari', 'Edge'].map(browser => (
                      <label key={browser} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={publishSettings.accessRestrictions.browserRequirements.includes(browser)}
                          onChange={(e) => {
                            const browsers = e.target.checked
                              ? [...publishSettings.accessRestrictions.browserRequirements, browser]
                              : publishSettings.accessRestrictions.browserRequirements.filter(b => b !== browser)
                            setPublishSettings(prev => ({
                              ...prev,
                              accessRestrictions: {
                                ...prev.accessRestrictions,
                                browserRequirements: browsers
                              }
                            }))
                          }}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{browser}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Security Notice</h4>
                  <p className="text-sm text-yellow-700">
                    High security settings may affect user experience. Test thoroughly before deployment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Schedule Publication */}
        {activeTab === 'schedule' && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Schedule Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Schedule Settings
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={scheduleSettings.startDate}
                      onChange={(e) => setScheduleSettings(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={scheduleSettings.startTime}
                      onChange={(e) => setScheduleSettings(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={scheduleSettings.endDate}
                      onChange={(e) => setScheduleSettings(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={scheduleSettings.endTime}
                      onChange={(e) => setScheduleSettings(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={scheduleSettings.timezone}
                    onChange={(e) => setScheduleSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                    <option value="Asia/Kolkata">India Standard Time</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grace Period (minutes)
                  </label>
                  <input
                    type="number"
                    value={scheduleSettings.gracePeriod}
                    onChange={(e) => setScheduleSettings(prev => ({ ...prev, gracePeriod: parseInt(e.target.value) }))}
                    min="0"
                    max="60"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={scheduleSettings.autoExtensions}
                      onChange={(e) => setScheduleSettings(prev => ({ ...prev, autoExtensions: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow automatic extensions</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={scheduleSettings.reminderNotifications.enabled}
                      onChange={(e) => setScheduleSettings(prev => ({
                        ...prev,
                        reminderNotifications: {
                          ...prev.reminderNotifications,
                          enabled: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Send reminder notifications</span>
                  </label>
                </div>

                <button
                  onClick={scheduleTest}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      Schedule Test
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Availability Windows */}
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Timer className="w-5 h-5 text-purple-600" />
                  Availability Windows
                </h3>
                <button className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                  Add Window
                </button>
              </div>

              <div className="space-y-4">
                {scheduleSettings.availabilityWindows.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No availability windows configured</p>
                    <p className="text-sm">Add windows to restrict test access to specific time periods</p>
                  </div>
                ) : (
                  scheduleSettings.availabilityWindows.map((window) => (
                    <div key={window.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{window.name}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${window.isActive ? 'bg-green-600' : 'bg-gray-300'}`} />
                          <button className="text-red-600 hover:text-red-800">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{window.start} - {window.end}</div>
                        <div>{window.timezone}</div>
                      </div>
                    </div>
                  ))
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Scheduling Tips</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Set grace periods for late submissions</li>
                    <li>• Use availability windows for different time zones</li>
                    <li>• Enable notifications for important reminders</li>
                    <li>• Consider automatic extensions for technical issues</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Clone for Next Year */}
        {activeTab === 'clone' && (
          <motion.div
            key="clone"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Clone Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Copy className="w-5 h-5 text-indigo-600" />
                Clone Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Test Title
                  </label>
                  <input
                    type="text"
                    value={cloneSettings.newTitle}
                    onChange={(e) => setCloneSettings(prev => ({ ...prev, newTitle: e.target.value }))}
                    placeholder="Enter new test title..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Year
                  </label>
                  <input
                    type="text"
                    value={cloneSettings.targetYear}
                    onChange={(e) => setCloneSettings(prev => ({ ...prev, targetYear: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clone Type
                  </label>
                  <select
                    value={cloneSettings.cloneType}
                    onChange={(e) => setCloneSettings(prev => ({ ...prev, cloneType: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="exact">Exact Copy</option>
                    <option value="updated">Updated Content</option>
                    <option value="template">Template Only</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cloneSettings.preserveSchedule}
                      onChange={(e) => setCloneSettings(prev => ({ ...prev, preserveSchedule: e.target.checked }))}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Preserve schedule settings</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cloneSettings.updateQuestions}
                      onChange={(e) => setCloneSettings(prev => ({ ...prev, updateQuestions: e.target.checked }))}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Update questions</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cloneSettings.resetAnalytics}
                      onChange={(e) => setCloneSettings(prev => ({ ...prev, resetAnalytics: e.target.checked }))}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Reset analytics data</span>
                  </label>
                </div>

                <button
                  onClick={cloneTest}
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Cloning...
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Clone Test
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Question Updates */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-green-600" />
                Question Updates
              </h3>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cloneSettings.questionUpdates.refreshContent}
                      onChange={(e) => setCloneSettings(prev => ({
                        ...prev,
                        questionUpdates: {
                          ...prev.questionUpdates,
                          refreshContent: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Refresh question content</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cloneSettings.questionUpdates.updateDifficulty}
                      onChange={(e) => setCloneSettings(prev => ({
                        ...prev,
                        questionUpdates: {
                          ...prev.questionUpdates,
                          updateDifficulty: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Update difficulty levels</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cloneSettings.questionUpdates.addNewQuestions}
                      onChange={(e) => setCloneSettings(prev => ({
                        ...prev,
                        questionUpdates: {
                          ...prev.questionUpdates,
                          addNewQuestions: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Add new questions</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={cloneSettings.questionUpdates.removeOutdated}
                      onChange={(e) => setCloneSettings(prev => ({
                        ...prev,
                        questionUpdates: {
                          ...prev.questionUpdates,
                          removeOutdated: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remove outdated questions</span>
                  </label>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Cloning Benefits</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Saves time creating annual tests</li>
                    <li>• Maintains consistency across years</li>
                    <li>• Allows for gradual improvements</li>
                    <li>• Preserves valuable question banks</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Clone Types</h4>
                  <div className="text-sm text-yellow-700 space-y-1">
                    <div><strong>Exact:</strong> Perfect copy with no changes</div>
                    <div><strong>Updated:</strong> Content refresh and improvements</div>
                    <div><strong>Template:</strong> Structure only, new content</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Convert to Practice Mode */}
        {activeTab === 'practice' && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Practice Mode Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-purple-600" />
                Practice Mode Configuration
              </h3>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={practiceModeSettings.allowUnlimitedAttempts}
                      onChange={(e) => setPracticeModeSettings(prev => ({ ...prev, allowUnlimitedAttempts: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow unlimited attempts</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={practiceModeSettings.showAnswersImmediately}
                      onChange={(e) => setPracticeModeSettings(prev => ({ ...prev, showAnswersImmediately: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show answers immediately</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={practiceModeSettings.showExplanations}
                      onChange={(e) => setPracticeModeSettings(prev => ({ ...prev, showExplanations: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show explanations</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={practiceModeSettings.showScoreAfterEach}
                      onChange={(e) => setPracticeModeSettings(prev => ({ ...prev, showScoreAfterEach: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show score after each question</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={practiceModeSettings.enableHints}
                      onChange={(e) => setPracticeModeSettings(prev => ({ ...prev, enableHints: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Enable hints</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={practiceModeSettings.randomizeQuestions}
                      onChange={(e) => setPracticeModeSettings(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Randomize question order</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback Level
                  </label>
                  <select
                    value={practiceModeSettings.feedbackLevel}
                    onChange={(e) => setPracticeModeSettings(prev => ({ ...prev, feedbackLevel: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="none">No Feedback</option>
                    <option value="basic">Basic (Correct/Incorrect)</option>
                    <option value="detailed">Detailed (With Explanations)</option>
                    <option value="comprehensive">Comprehensive (Full Analysis)</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={practiceModeSettings.timeLimit.enabled}
                      onChange={(e) => setPracticeModeSettings(prev => ({
                        ...prev,
                        timeLimit: { ...prev.timeLimit, enabled: e.target.checked }
                      }))}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">Set time limit</span>
                  </label>
                  {practiceModeSettings.timeLimit.enabled && (
                    <input
                      type="number"
                      value={practiceModeSettings.timeLimit.duration}
                      onChange={(e) => setPracticeModeSettings(prev => ({
                        ...prev,
                        timeLimit: { ...prev.timeLimit, duration: parseInt(e.target.value) }
                      }))}
                      placeholder="Minutes"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  )}
                </div>

                <button
                  onClick={convertToPractice}
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Convert to Practice Mode
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Practice Mode Benefits */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-orange-600" />
                Practice Mode Benefits
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-green-600">Self-Paced</div>
                    <div className="text-sm text-green-700">Learning at your own speed</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-blue-600">Immediate</div>
                    <div className="text-sm text-blue-700">Instant feedback and answers</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-purple-600">Unlimited</div>
                    <div className="text-sm text-purple-700">Retry as many times needed</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <BookOpen className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-lg font-bold text-orange-600">Educational</div>
                    <div className="text-sm text-orange-700">Focus on learning outcomes</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Practice Mode Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• No stress environment for learning</li>
                    <li>• Detailed explanations for each answer</li>
                    <li>• Progressive hint system</li>
                    <li>• Performance tracking over time</li>
                    <li>• Customizable difficulty progression</li>
                    <li>• Topic-wise practice sessions</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-2">Usage Scenarios</h4>
                  <div className="text-sm text-purple-700 space-y-1">
                    <div><strong>Pre-exam:</strong> Final preparation and revision</div>
                    <div><strong>Post-exam:</strong> Review and understand mistakes</div>
                    <div><strong>Continuous:</strong> Regular practice and skill building</div>
                    <div><strong>Remedial:</strong> Focused improvement on weak areas</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Generate Answer Key */}
        {activeTab === 'answers' && (
          <motion.div
            key="answers"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Answer Key Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-yellow-600" />
                Answer Key Configuration
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Export Format
                  </label>
                  <select
                    value={answerKeySettings.format}
                    onChange={(e) => setAnswerKeySettings(prev => ({ ...prev, format: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="html">HTML Page</option>
                    <option value="word">Word Document</option>
                    <option value="excel">Excel Spreadsheet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Level
                  </label>
                  <select
                    value={answerKeySettings.accessLevel}
                    onChange={(e) => setAnswerKeySettings(prev => ({ ...prev, accessLevel: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="public">Public Access</option>
                    <option value="teachers">Teachers Only</option>
                    <option value="restricted">Restricted Access</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    value={answerKeySettings.watermark}
                    onChange={(e) => setAnswerKeySettings(prev => ({ ...prev, watermark: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={answerKeySettings.includeExplanations}
                      onChange={(e) => setAnswerKeySettings(prev => ({ ...prev, includeExplanations: e.target.checked }))}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include explanations</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={answerKeySettings.includeReferences}
                      onChange={(e) => setAnswerKeySettings(prev => ({ ...prev, includeReferences: e.target.checked }))}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include references</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={answerKeySettings.includeMarkingScheme}
                      onChange={(e) => setAnswerKeySettings(prev => ({ ...prev, includeMarkingScheme: e.target.checked }))}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include marking scheme</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={answerKeySettings.generateQRCode}
                      onChange={(e) => setAnswerKeySettings(prev => ({ ...prev, generateQRCode: e.target.checked }))}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Generate QR code</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={answerKeySettings.includeStatistics}
                      onChange={(e) => setAnswerKeySettings(prev => ({ ...prev, includeStatistics: e.target.checked }))}
                      className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include statistics</span>
                  </label>
                </div>

                <button
                  onClick={generateAnswerKey}
                  disabled={loading}
                  className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      Generate Answer Key
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Answer Key Preview */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-600" />
                Answer Key Preview
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg min-h-64">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-lg">NEET Biology Mock Test 1</h4>
                    <p className="text-sm text-gray-600">Answer Key & Marking Scheme</p>
                    {answerKeySettings.watermark && (
                      <p className="text-xs text-gray-400 italic">{answerKeySettings.watermark}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">1. Which organelle is called the powerhouse of the cell?</span>
                        <span className="text-sm text-gray-500">2 marks</span>
                      </div>
                      <div className="text-green-600 font-medium mt-1">Answer: B) Mitochondria</div>
                      {answerKeySettings.includeExplanations && (
                        <div className="text-sm text-gray-600 mt-1">
                          Explanation: Mitochondria are called the powerhouse because they produce ATP...
                        </div>
                      )}
                    </div>

                    <div className="border-b pb-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">2. The process of photosynthesis occurs in:</span>
                        <span className="text-sm text-gray-500">2 marks</span>
                      </div>
                      <div className="text-green-600 font-medium mt-1">Answer: C) Chloroplasts</div>
                      {answerKeySettings.includeExplanations && (
                        <div className="text-sm text-gray-600 mt-1">
                          Explanation: Chloroplasts contain chlorophyll and are the site of photosynthesis...
                        </div>
                      )}
                    </div>

                    <div className="text-center text-gray-400 text-sm">
                      ... more questions ...
                    </div>
                  </div>

                  {answerKeySettings.includeStatistics && (
                    <div className="mt-4 pt-4 border-t">
                      <h5 className="font-medium mb-2">Test Statistics</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>Total Questions: 50</div>
                        <div>Total Marks: 200</div>
                        <div>Average Score: 68.5%</div>
                        <div>Pass Rate: 87.3%</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600">50</div>
                    <div className="text-sm text-blue-700">Questions</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">200</div>
                    <div className="text-sm text-green-700">Total Marks</div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Security Features</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Watermark protection</li>
                    <li>• Access level restrictions</li>
                    <li>• QR code verification</li>
                    <li>• Download tracking</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Release Solutions */}
        {activeTab === 'solutions' && (
          <motion.div
            key="solutions"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Solution Release Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Solution Release Configuration
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Release Type
                  </label>
                  <select
                    value={solutionReleaseSettings.releaseType}
                    onChange={(e) => setSolutionReleaseSettings(prev => ({ ...prev, releaseType: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="immediate">Immediate Release</option>
                    <option value="scheduled">Scheduled Release</option>
                    <option value="manual">Manual Release</option>
                  </select>
                </div>

                {solutionReleaseSettings.releaseType === 'scheduled' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Release Date
                      </label>
                      <input
                        type="date"
                        value={solutionReleaseSettings.releaseDate}
                        onChange={(e) => setSolutionReleaseSettings(prev => ({ ...prev, releaseDate: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Release Time
                      </label>
                      <input
                        type="time"
                        value={solutionReleaseSettings.releaseTime}
                        onChange={(e) => setSolutionReleaseSettings(prev => ({ ...prev, releaseTime: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Level
                  </label>
                  <select
                    value={solutionReleaseSettings.contentLevel}
                    onChange={(e) => setSolutionReleaseSettings(prev => ({ ...prev, contentLevel: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="answers">Answers Only</option>
                    <option value="explanations">With Explanations</option>
                    <option value="detailed">Detailed Solutions</option>
                    <option value="complete">Complete Analysis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distribution Method
                  </label>
                  <select
                    value={solutionReleaseSettings.distributionMethod}
                    onChange={(e) => setSolutionReleaseSettings(prev => ({ ...prev, distributionMethod: e.target.value as any }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="platform">Platform Only</option>
                    <option value="email">Email Delivery</option>
                    <option value="download">Download Link</option>
                    <option value="all">All Methods</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Access Control</h4>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={solutionReleaseSettings.accessControl.requireCompletion}
                      onChange={(e) => setSolutionReleaseSettings(prev => ({
                        ...prev,
                        accessControl: {
                          ...prev.accessControl,
                          requireCompletion: e.target.checked
                        }
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Require test completion</span>
                  </label>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Score Required (%)
                    </label>
                    <input
                      type="number"
                      value={solutionReleaseSettings.accessControl.minimumScore}
                      onChange={(e) => setSolutionReleaseSettings(prev => ({
                        ...prev,
                        accessControl: {
                          ...prev.accessControl,
                          minimumScore: parseInt(e.target.value)
                        }
                      }))}
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wait Period After Completion (hours)
                    </label>
                    <input
                      type="number"
                      value={solutionReleaseSettings.accessControl.waitPeriod}
                      onChange={(e) => setSolutionReleaseSettings(prev => ({
                        ...prev,
                        accessControl: {
                          ...prev.accessControl,
                          waitPeriod: parseInt(e.target.value)
                        }
                      }))}
                      min="0"
                      max="168"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={releaseSolutions}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Releasing...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4" />
                      Release Solutions
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Release Timeline */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Release Timeline
              </h3>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium text-green-800">Test Published</div>
                      <div className="text-sm text-green-600">January 16, 2024 at 3:00 PM</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium text-blue-800">Test Completion Deadline</div>
                      <div className="text-sm text-blue-600">January 18, 2024 at 11:59 PM</div>
                    </div>
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium text-yellow-800">Solutions Release</div>
                      <div className="text-sm text-yellow-600">January 19, 2024 at 9:00 AM</div>
                    </div>
                    <Timer className="w-5 h-5 text-yellow-600" />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">Archive Test</div>
                      <div className="text-sm text-gray-600">January 26, 2024 at 12:00 AM</div>
                    </div>
                    <Archive className="w-5 h-5 text-gray-600" />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Release Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-blue-600">Eligible Students</div>
                      <div className="font-bold">214</div>
                    </div>
                    <div>
                      <div className="text-blue-600">Access Granted</div>
                      <div className="font-bold">187</div>
                    </div>
                    <div>
                      <div className="text-blue-600">Downloaded</div>
                      <div className="font-bold">156</div>
                    </div>
                    <div>
                      <div className="text-blue-600">Viewed Online</div>
                      <div className="font-bold">201</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Content Levels</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <div><strong>Answers:</strong> Correct options only</div>
                    <div><strong>Explanations:</strong> Why the answer is correct</div>
                    <div><strong>Detailed:</strong> Step-by-step solutions</div>
                    <div><strong>Complete:</strong> Full analysis with tips</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regrade Options */}
        {activeTab === 'regrade' && (
          <motion.div
            key="regrade"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Regrade Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-red-600" />
                  Regrade Configuration
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Regrade Type
                    </label>
                    <select
                      value={regradeOptions.regradeType}
                      onChange={(e) => setRegradeOptions(prev => ({ ...prev, regradeType: e.target.value as any }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="partial">Partial Regrade</option>
                      <option value="complete">Complete Regrade</option>
                      <option value="specific_questions">Specific Questions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Regrade
                    </label>
                    <textarea
                      value={regradeOptions.reason}
                      onChange={(e) => setRegradeOptions(prev => ({ ...prev, reason: e.target.value }))}
                      rows={3}
                      placeholder="Describe the reason for regrade..."
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Regrade Deadline
                    </label>
                    <input
                      type="datetime-local"
                      value={regradeOptions.deadline}
                      onChange={(e) => setRegradeOptions(prev => ({ ...prev, deadline: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={regradeOptions.notifyStudents}
                        onChange={(e) => setRegradeOptions(prev => ({ ...prev, notifyStudents: e.target.checked }))}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Notify students</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={regradeOptions.preserveOriginalScores}
                        onChange={(e) => setRegradeOptions(prev => ({ ...prev, preserveOriginalScores: e.target.checked }))}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Preserve original scores</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={regradeOptions.approvalRequired}
                        onChange={(e) => setRegradeOptions(prev => ({ ...prev, approvalRequired: e.target.checked }))}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Require approval</span>
                    </label>
                  </div>

                  <button
                    onClick={performRegrade}
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Processing Regrade...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        Start Regrade
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  Affected Students
                </h3>

                <div className="space-y-4">
                  {regradeOptions.affectedStudents.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No regrade results yet</p>
                      <p className="text-sm">Students affected by regrade will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {regradeOptions.affectedStudents.map((student) => (
                        <div key={student.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{student.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              student.improvement > 0 ? 'bg-green-100 text-green-600' :
                              student.improvement < 0 ? 'bg-red-100 text-red-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {student.improvement > 0 ? '+' : ''}{student.improvement} points
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Original:</span>
                              <div className="font-medium">{student.originalScore}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">New:</span>
                              <div className="font-medium">{student.newScore}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Change:</span>
                              <div className={`font-medium ${
                                student.improvement > 0 ? 'text-green-600' :
                                student.improvement < 0 ? 'text-red-600' :
                                'text-gray-600'
                              }`}>
                                {student.improvement > 0 ? '+' : ''}{student.improvement}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-800 mb-2">Regrade Guidelines</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Review all affected questions carefully</li>
                      <li>• Document reasons for score changes</li>
                      <li>• Notify students of any changes</li>
                      <li>• Maintain audit trail of all modifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Regrade History */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <History className="w-5 h-5 text-gray-600" />
                Regrade History
              </h3>

              <div className="space-y-3">
                {[
                  {
                    id: 'r1',
                    date: '2024-01-17',
                    type: 'Partial Regrade',
                    questions: ['Q15', 'Q22'],
                    studentsAffected: 23,
                    averageChange: '+2.1',
                    reason: 'Ambiguous wording in questions',
                    status: 'Completed'
                  },
                  {
                    id: 'r2',
                    date: '2024-01-16',
                    type: 'Complete Regrade',
                    questions: ['All'],
                    studentsAffected: 245,
                    averageChange: '+0.8',
                    reason: 'Marking scheme update',
                    status: 'Completed'
                  }
                ].map((regrade) => (
                  <div key={regrade.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{regrade.type}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                          {regrade.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{regrade.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{regrade.reason}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Students Affected:</span>
                        <div className="font-medium">{regrade.studentsAffected}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Average Change:</span>
                        <div className="font-medium text-green-600">{regrade.averageChange}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Questions:</span>
                        <div className="font-medium">{regrade.questions.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Lifecycle