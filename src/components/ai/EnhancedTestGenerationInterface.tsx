'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Settings,
  Eye,
  Play,
  Save,
  Share2,
  Download,
  Upload,
  RefreshCw,
  Brain,
  Zap,
  Target,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Maximize2,
  Minimize2,
  Grid,
  List,
  Menu,
  Smartphone,
  Monitor,
  HelpCircle,
  Lightbulb,
  Bookmark,
  History,
  Star,
} from 'lucide-react'

// Import our enhanced components
import RealTimeQuestionPreview from './RealTimeQuestionPreview'
import BatchOperationsPanel from './BatchOperationsPanel'
import EnhancedTemplateManager from './EnhancedTemplateManager'
import MobileOptimizedTestCreator from './MobileOptimizedTestCreator'
import StreamlinedTestNavigation from './StreamlinedTestNavigation'

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
  totalQuestions: number
  topics: string[]
  questionTypes: {
    mcq: number
    assertion: number
    numerical: number
    matching: number
  }
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
}

interface UISettings {
  theme: 'light' | 'dark' | 'auto'
  sidebarCollapsed: boolean
  viewMode: 'desktop' | 'tablet' | 'mobile'
  showPreview: boolean
  enableAnimations: boolean
  showTooltips: boolean
  accessibilityMode: boolean
  fontSize: 'sm' | 'md' | 'lg'
  showMiniMap: boolean
  autoSave: boolean
}

interface NotificationItem {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

const EnhancedTestGenerationInterface: React.FC = () => {
  // Core state
  const [activeTab, setActiveTab] = useState('configure')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [testConfiguration, setTestConfiguration] = useState<TestConfiguration>({
    id: `test_${Date.now()}`,
    title: 'Untitled Test',
    description: '',
    duration: 180,
    totalMarks: 200,
    passingScore: 120,
    instructions: [],
    questions: [],
    createdDate: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    totalQuestions: 50,
    topics: [],
    questionTypes: { mcq: 70, assertion: 20, numerical: 10, matching: 0 },
    difficulty: 'medium',
  })

  // UI state
  const [uiSettings, setUISettings] = useState<UISettings>({
    theme: 'light',
    sidebarCollapsed: false,
    viewMode: 'desktop',
    showPreview: true,
    enableAnimations: true,
    showTooltips: true,
    accessibilityMode: false,
    fontSize: 'md',
    showMiniMap: false,
    autoSave: true,
  })

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (uiSettings.autoSave) {
      const timer = setInterval(() => {
        handleSave(true) // Silent save
      }, 30000) // Save every 30 seconds

      return () => clearInterval(timer)
    }
  }, [uiSettings.autoSave, testConfiguration, questions])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault()
            handleSave()
            break
          case 'p':
            e.preventDefault()
            handlePreview()
            break
          case 'g':
            e.preventDefault()
            handleGenerate()
            break
          case 'b':
            e.preventDefault()
            setUISettings((prev) => ({ ...prev, sidebarCollapsed: !prev.sidebarCollapsed }))
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Notification management
  const addNotification = (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      isRead: false,
    }

    setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 notifications
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  // Core handlers
  const handleSave = async (silent = false) => {
    try {
      // Simulate save operation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedConfig = {
        ...testConfiguration,
        questions,
        lastModified: new Date().toISOString(),
      }

      setTestConfiguration(updatedConfig)
      setLastSaved(new Date())

      if (!silent) {
        addNotification({
          type: 'success',
          title: 'Test Saved',
          message: 'Your test configuration has been saved successfully.',
        })
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Save Failed',
        message: 'Failed to save test configuration. Please try again.',
      })
    }
  }

  const handlePreview = () => {
    if (questions.length === 0) {
      addNotification({
        type: 'warning',
        title: 'No Questions',
        message: 'Generate some questions first to preview the test.',
      })
      return
    }

    setUISettings((prev) => ({ ...prev, showPreview: true }))
    addNotification({
      type: 'info',
      title: 'Preview Mode',
      message: 'Now viewing test in preview mode.',
    })
  }

  const handleGenerate = async () => {
    if (testConfiguration.topics.length === 0) {
      addNotification({
        type: 'warning',
        title: 'No Topics Selected',
        message: 'Please select at least one topic before generating questions.',
      })
      return
    }

    setIsGenerating(true)
    setGenerationProgress(0)

    try {
      // Simulate question generation with progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200))
        setGenerationProgress(i)
      }

      // Generate sample questions
      const newQuestions: Question[] = Array.from(
        { length: testConfiguration.totalQuestions },
        (_, index) => ({
          id: `generated_${Date.now()}_${index}`,
          question: `Generated question ${index + 1} about ${testConfiguration.topics[index % testConfiguration.topics.length]}`,
          type: 'mcq' as const,
          options: [
            'Option A - First choice',
            'Option B - Second choice',
            'Option C - Third choice',
            'Option D - Fourth choice',
          ],
          correctAnswer: 'Option A - First choice',
          explanation: `This is the explanation for question ${index + 1}. It covers the key concepts and reasoning behind the correct answer.`,
          difficulty: ['easy', 'medium', 'hard'][index % 3] as any,
          topic: testConfiguration.topics[index % testConfiguration.topics.length],
          subtopic: `Subtopic ${(index % 3) + 1}`,
          chapter: `Chapter ${Math.floor(index / 5) + 1}`,
          marks: 4,
          estimatedTime: 90 + (index % 3) * 30,
          bloomsLevel: ['remember', 'understand', 'apply', 'analyze'][index % 4],
          learningObjectives: [
            `Understand key concept ${index + 1}`,
            `Apply knowledge to solve problems`,
          ],
          tags: [
            testConfiguration.topics[index % testConfiguration.topics.length].toLowerCase(),
            'generated',
            'neet',
          ],
          hints: [
            `Think about the fundamental principles`,
            `Consider the relationship between concepts`,
          ],
          commonMistakes: [`Don't confuse with similar concept`, `Remember the key distinction`],
        })
      )

      setQuestions(newQuestions)

      addNotification({
        type: 'success',
        title: 'Questions Generated',
        message: `Successfully generated ${newQuestions.length} questions using AI.`,
        action: {
          label: 'Preview',
          onClick: handlePreview,
        },
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Generation Failed',
        message: 'Failed to generate questions. Please try again.',
      })
    } finally {
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  const handleBulkGenerate = async (criteria: any) => {
    setIsGenerating(true)

    try {
      // Simulate bulk generation
      await new Promise((resolve) => setTimeout(resolve, 3000))

      addNotification({
        type: 'success',
        title: 'Bulk Generation Complete',
        message: `Generated ${criteria.totalQuestions} questions across ${criteria.topics.length} topics.`,
      })
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Bulk Generation Failed',
        message: 'Failed to generate questions in bulk. Please try again.',
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleTemplateSelect = (template: any) => {
    setTestConfiguration((prev) => ({
      ...prev,
      title: template.name,
      description: template.description,
      duration: template.duration,
      totalQuestions: template.totalQuestions,
      totalMarks: template.totalMarks,
      topics: template.topics,
    }))

    addNotification({
      type: 'success',
      title: 'Template Applied',
      message: `Applied template: ${template.name}`,
    })
  }

  const handleQuestionEdit = (questionId: string) => {
    // Find and edit question
    const questionIndex = questions.findIndex((q) => q.id === questionId)
    if (questionIndex !== -1) {
      setCurrentQuestionIndex(questionIndex)
      setActiveTab('edit')
    }
  }

  const updateUISettings = (updates: Partial<UISettings>) => {
    setUISettings((prev) => ({ ...prev, ...updates }))
  }

  // Render mobile version for mobile devices
  if (isMobile) {
    return (
      <MobileOptimizedTestCreator
        onConfigurationChange={(config) => setTestConfiguration((prev) => ({ ...prev, ...config }))}
        onPreview={handlePreview}
        onSave={() => handleSave()}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />
    )
  }

  // Desktop/Tablet Layout
  return (
    <div className={`flex h-screen bg-gray-50 ${uiSettings.theme === 'dark' ? 'dark' : ''}`}>
      {/* Enhanced Navigation Sidebar */}
      <StreamlinedTestNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={uiSettings.sidebarCollapsed}
        onToggleCollapse={() =>
          updateUISettings({ sidebarCollapsed: !uiSettings.sidebarCollapsed })
        }
        showBreadcrumbs={true}
        showProgress={true}
        allowPinning={true}
        showQuickActions={true}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-semibold text-gray-800">{testConfiguration.title}</h1>
                <p className="text-sm text-gray-600">
                  {questions.length} questions • {testConfiguration.totalMarks} marks •{' '}
                  {testConfiguration.duration} minutes
                </p>
              </div>

              {lastSaved && (
                <div className="text-sm text-gray-500">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => updateUISettings({ viewMode: 'desktop' })}
                  className={`p-2 rounded transition-colors ${
                    uiSettings.viewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateUISettings({ viewMode: 'tablet' })}
                  className={`p-2 rounded transition-colors ${
                    uiSettings.viewMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => updateUISettings({ viewMode: 'mobile' })}
                  className={`p-2 rounded transition-colors ${
                    uiSettings.viewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>

              <button
                onClick={() => handleSave()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>

              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Generation Progress */}
          {isGenerating && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Generating questions with AI...</span>
                <span>{generationProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 overflow-hidden">
          <div
            className={`h-full ${uiSettings.showPreview ? 'grid grid-cols-2 gap-4 p-4' : 'p-4'}`}
          >
            {/* Primary Content Area */}
            <div className="space-y-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'configure' && (
                  <motion.div
                    key="configure"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="bg-white rounded-xl p-6 border">
                      <h3 className="text-lg font-semibold mb-4">Test Configuration</h3>
                      {/* Basic configuration form would go here */}
                      <p className="text-gray-600">
                        Configure your test settings, duration, and basic parameters.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'templates' && (
                  <motion.div
                    key="templates"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <EnhancedTemplateManager
                      onTemplateSelect={handleTemplateSelect}
                      onTemplateCreate={() => setActiveTab('configure')}
                      currentTemplate={null}
                    />
                  </motion.div>
                )}

                {activeTab === 'bank' && (
                  <motion.div
                    key="bank"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <BatchOperationsPanel
                      questions={questions}
                      onQuestionsUpdate={(updatedQuestions) => setQuestions(updatedQuestions)}
                      onBulkGenerate={handleBulkGenerate}
                      isGenerating={isGenerating}
                    />
                  </motion.div>
                )}

                {/* Add other tab content here */}
              </AnimatePresence>
            </div>

            {/* Preview Panel */}
            {uiSettings.showPreview && (
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="border-b p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Live Preview</h3>
                    <button
                      onClick={() => updateUISettings({ showPreview: false })}
                      className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="h-full overflow-y-auto">
                  <RealTimeQuestionPreview
                    questions={questions}
                    currentIndex={currentQuestionIndex}
                    onIndexChange={setCurrentQuestionIndex}
                    onQuestionEdit={handleQuestionEdit}
                    isGenerating={isGenerating}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 space-y-2 z-50"
          >
            {notifications.slice(0, 3).map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`max-w-sm bg-white border rounded-lg p-4 shadow-lg ${
                  notification.type === 'error'
                    ? 'border-red-200'
                    : notification.type === 'warning'
                      ? 'border-yellow-200'
                      : notification.type === 'success'
                        ? 'border-green-200'
                        : 'border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 ${
                      notification.type === 'error'
                        ? 'text-red-500'
                        : notification.type === 'warning'
                          ? 'text-yellow-500'
                          : notification.type === 'success'
                            ? 'text-green-500'
                            : 'text-blue-500'
                    }`}
                  >
                    {notification.type === 'error' ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : notification.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5" />
                    ) : notification.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Info className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800">{notification.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>

                    {notification.action && (
                      <button
                        onClick={notification.action.onClick}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {notification.action.label}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => markNotificationAsRead(notification.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EnhancedTestGenerationInterface
