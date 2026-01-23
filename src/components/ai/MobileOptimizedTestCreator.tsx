'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Settings,
  Eye,
  Play,
  Save,
  MoreVertical,
  Clock,
  BarChart3,
  BookOpen,
  Smartphone,
  Tablet,
  Monitor,
  Check,
  AlertCircle,
  Brain,
  Download,
  Upload
} from 'lucide-react'

interface MobileTabGroup {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  tabs: MobileTab[]
  isExpanded: boolean
}

interface MobileTab {
  id: string
  name: string
  shortName: string
  icon: React.ReactNode
  content: React.ReactNode
  isCompleted: boolean
  hasErrors: boolean
}

interface TestConfiguration {
  totalQuestions: number
  totalMarks: number
  duration: number
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed'
  topics: string[]
  questionTypes: {
    mcq: number
    assertion: number
    numerical: number
    matching: number
  }
}

interface MobileOptimizedTestCreatorProps {
  onConfigurationChange: (config: TestConfiguration) => void
  onPreview: () => void
  onSave: () => void
  onGenerate: () => void
  isGenerating: boolean
}

const MobileOptimizedTestCreator: React.FC<MobileOptimizedTestCreatorProps> = ({
  onConfigurationChange,
  onPreview,
  onSave,
  onGenerate,
  isGenerating
}) => {
  const [activeTabGroup, setActiveTabGroup] = useState<string>('basic')
  const [activeTab, setActiveTab] = useState<string>('configure')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [viewMode, setViewMode] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')
  const [isSticky, setIsSticky] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)

  const [configuration, setConfiguration] = useState<TestConfiguration>({
    totalQuestions: 30,
    totalMarks: 120,
    duration: 60,
    difficulty: 'medium',
    topics: [],
    questionTypes: { mcq: 70, assertion: 20, numerical: 10, matching: 0 }
  })

  // Detect mobile device
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

  // Sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tabGroups: MobileTabGroup[] = [
    {
      id: 'basic',
      name: 'Basic Setup',
      icon: <Settings className="w-4 h-4" />,
      color: 'from-blue-500 to-blue-500',
      isExpanded: true,
      tabs: [
        {
          id: 'configure',
          name: 'Configuration',
          shortName: 'Config',
          icon: <Settings className="w-4 h-4" />,
          content: <BasicConfigurationComponent configuration={configuration} setConfiguration={setConfiguration} />,
          isCompleted: true,
          hasErrors: false
        },
        {
          id: 'topics',
          name: 'Topics & Chapters',
          shortName: 'Topics',
          icon: <BookOpen className="w-4 h-4" />,
          content: <TopicSelectionComponent configuration={configuration} setConfiguration={setConfiguration} />,
          isCompleted: false,
          hasErrors: false
        }
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Options',
      icon: <Brain className="w-4 h-4" />,
      color: 'from-purple-500 to-indigo-500',
      isExpanded: false,
      tabs: [
        {
          id: 'difficulty',
          name: 'Difficulty & Distribution',
          shortName: 'Difficulty',
          icon: <BarChart3 className="w-4 h-4" />,
          content: <DifficultyDistributionComponent configuration={configuration} setConfiguration={setConfiguration} />,
          isCompleted: false,
          hasErrors: false
        },
        {
          id: 'timing',
          name: 'Time Management',
          shortName: 'Timing',
          icon: <Clock className="w-4 h-4" />,
          content: <TimeManagementComponent configuration={configuration} setConfiguration={setConfiguration} />,
          isCompleted: false,
          hasErrors: false
        }
      ]
    },
    {
      id: 'preview',
      name: 'Review & Generate',
      icon: <Eye className="w-4 h-4" />,
      color: 'bg-green-600',
      isExpanded: false,
      tabs: [
        {
          id: 'review',
          name: 'Review Settings',
          shortName: 'Review',
          icon: <Eye className="w-4 h-4" />,
          content: <ReviewComponent configuration={configuration} />,
          isCompleted: false,
          hasErrors: false
        },
        {
          id: 'generate',
          name: 'Generate Test',
          shortName: 'Generate',
          icon: <Play className="w-4 h-4" />,
          content: <GenerateComponent onGenerate={onGenerate} isGenerating={isGenerating} />,
          isCompleted: false,
          hasErrors: false
        }
      ]
    }
  ]

  const getCurrentTab = () => {
    for (const group of tabGroups) {
      const tab = group.tabs.find(t => t.id === activeTab)
      if (tab) return tab
    }
    return tabGroups[0].tabs[0]
  }

  const getNextTab = () => {
    const allTabs = tabGroups.flatMap(group => group.tabs)
    const currentIndex = allTabs.findIndex(tab => tab.id === activeTab)
    return currentIndex < allTabs.length - 1 ? allTabs[currentIndex + 1] : null
  }

  const getPrevTab = () => {
    const allTabs = tabGroups.flatMap(group => group.tabs)
    const currentIndex = allTabs.findIndex(tab => tab.id === activeTab)
    return currentIndex > 0 ? allTabs[currentIndex - 1] : null
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    setShowMobileMenu(false)

    // Find the group containing this tab
    const group = tabGroups.find(g => g.tabs.some(t => t.id === tabId))
    if (group) {
      setActiveTabGroup(group.id)
    }
  }

  const toggleTabGroup = (groupId: string) => {
    // Toggle the expansion state (in real app, you'd update state)
    console.log('Toggle group:', groupId)
  }

  const updateConfiguration = (updates: Partial<TestConfiguration>) => {
    const newConfig = { ...configuration, ...updates }
    setConfiguration(newConfig)
    onConfigurationChange(newConfig)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className={`bg-white border-b transition-all duration-300 ${isSticky ? 'shadow-lg' : ''} ${isMobile ? 'sticky top-0 z-40' : ''}`}>
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isMobile && (
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              )}

              <div>
                <h1 className="text-lg font-semibold text-gray-800">Test Creator</h1>
                <p className="text-sm text-gray-600">{getCurrentTab().name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Device Preview Toggle */}
              {!isMobile && (
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('mobile')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('tablet')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('desktop')}
                    className={`p-1.5 rounded transition-colors ${viewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Quick Actions */}
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>3 of 6 complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '50%' }} />
            </div>
          </div>
        </div>

        {/* Quick Actions Dropdown */}
        <AnimatePresence>
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-4 top-16 bg-white border rounded-lg shadow-lg z-50 w-48"
            >
              <div className="py-2">
                <button
                  onClick={onPreview}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Eye className="w-4 h-4" />
                  Preview Test
                </button>
                <button
                  onClick={onSave}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                >
                  <Save className="w-4 h-4" />
                  Save Draft
                </button>
                <div className="border-t my-2"></div>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                  <Download className="w-4 h-4" />
                  Export Configuration
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
                  <Upload className="w-4 h-4" />
                  Import Configuration
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Navigation Sidebar */}
        <AnimatePresence>
          {(showMobileMenu || !isMobile) && (
            <motion.div
              initial={isMobile ? { x: -280 } : { x: 0 }}
              animate={{ x: 0 }}
              exit={isMobile ? { x: -280 } : { x: 0 }}
              className={`${isMobile ? 'fixed inset-y-0 left-0 z-30' : 'relative'} w-70 bg-white border-r overflow-y-auto`}
            >
              <div className="p-4 space-y-4">
                {tabGroups.map(group => (
                  <div key={group.id} className="space-y-2">
                    <button
                      onClick={() => toggleTabGroup(group.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gradient-to-r ${group.color} rounded-lg text-white`}>
                          {group.icon}
                        </div>
                        <span className="font-medium text-gray-800">{group.name}</span>
                      </div>
                      {group.isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                      {group.isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-4 space-y-1"
                        >
                          {group.tabs.map(tab => (
                            <button
                              key={tab.id}
                              onClick={() => handleTabChange(tab.id)}
                              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                                activeTab === tab.id
                                  ? 'bg-blue-50 border border-blue-200 text-blue-700'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {tab.icon}
                                <span className={`text-sm ${isMobile ? tab.shortName : tab.name}`}>
                                  {isMobile ? tab.shortName : tab.name}
                                </span>
                              </div>

                              <div className="flex items-center gap-1">
                                {tab.hasErrors && <AlertCircle className="w-4 h-4 text-red-500" />}
                                {tab.isCompleted && <Check className="w-4 h-4 text-green-600" />}
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            <div className={`p-4 ${viewMode === 'mobile' ? 'max-w-sm mx-auto' : viewMode === 'tablet' ? 'max-w-3xl mx-auto' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {getCurrentTab().content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Navigation Footer */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  const prevTab = getPrevTab()
                  if (prevTab) handleTabChange(prevTab.id)
                }}
                disabled={!getPrevTab()}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                {!isMobile && "Previous"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={onSave}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {!isMobile && "Save"}
                </button>

                {activeTab === 'generate' ? (
                  <button
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {!isMobile && "Generating..."}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        {!isMobile && "Generate"}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const nextTab = getNextTab()
                      if (nextTab) handleTabChange(nextTab.id)
                    }}
                    disabled={!getNextTab()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {!isMobile && "Next"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && showMobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-20"
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </div>
  )
}

// Component implementations for each tab
const BasicConfigurationComponent: React.FC<{
  configuration: TestConfiguration
  setConfiguration: (config: TestConfiguration) => void
}> = ({ configuration, setConfiguration }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border">
      <h3 className="text-lg font-semibold mb-4">Basic Test Configuration</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Questions
          </label>
          <input
            type="number"
            value={configuration.totalQuestions}
            onChange={(e) => setConfiguration({
              ...configuration,
              totalQuestions: parseInt(e.target.value) || 0
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Marks
          </label>
          <input
            type="number"
            value={configuration.totalMarks}
            onChange={(e) => setConfiguration({
              ...configuration,
              totalMarks: parseInt(e.target.value) || 0
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={configuration.duration}
            onChange={(e) => setConfiguration({
              ...configuration,
              duration: parseInt(e.target.value) || 0
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Level
          </label>
          <select
            value={configuration.difficulty}
            onChange={(e) => setConfiguration({
              ...configuration,
              difficulty: e.target.value as any
            })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
      </div>
    </div>
  </div>
)

const TopicSelectionComponent: React.FC<{
  configuration: TestConfiguration
  setConfiguration: (config: TestConfiguration) => void
}> = ({ configuration, setConfiguration }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border">
      <h3 className="text-lg font-semibold mb-4">Select Topics</h3>
      <p className="text-gray-600 mb-4">Choose the biology topics to include in your test</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          'Cell Biology', 'Genetics', 'Evolution', 'Ecology',
          'Human Physiology', 'Plant Physiology', 'Reproduction',
          'Biotechnology', 'Molecular Biology', 'Taxonomy'
        ].map(topic => (
          <label key={topic} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              checked={configuration.topics.includes(topic)}
              onChange={(e) => {
                if (e.target.checked) {
                  setConfiguration({
                    ...configuration,
                    topics: [...configuration.topics, topic]
                  })
                } else {
                  setConfiguration({
                    ...configuration,
                    topics: configuration.topics.filter(t => t !== topic)
                  })
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-800">{topic}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
)

const DifficultyDistributionComponent: React.FC<{
  configuration: TestConfiguration
  setConfiguration: (config: TestConfiguration) => void
}> = ({ configuration, setConfiguration }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border">
      <h3 className="text-lg font-semibold mb-4">Question Type Distribution</h3>

      <div className="space-y-4">
        {Object.entries(configuration.questionTypes).map(([type, percentage]) => (
          <div key={type} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700 capitalize">
                {type === 'mcq' ? 'Multiple Choice Questions' : type}
              </label>
              <span className="text-sm text-gray-600">{percentage}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={percentage}
              onChange={(e) => setConfiguration({
                ...configuration,
                questionTypes: {
                  ...configuration.questionTypes,
                  [type]: parseInt(e.target.value)
                }
              })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)

const TimeManagementComponent: React.FC<{
  configuration: TestConfiguration
  setConfiguration: (config: TestConfiguration) => void
}> = ({ configuration, setConfiguration }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border">
      <h3 className="text-lg font-semibold mb-4">Time Management</h3>

      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Time Analysis</span>
          </div>
          <div className="text-sm text-blue-700 space-y-1">
            <div>Total Duration: {configuration.duration} minutes</div>
            <div>Questions: {configuration.totalQuestions}</div>
            <div>Time per Question: {(configuration.duration / configuration.totalQuestions).toFixed(1)} minutes</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reading Time (minutes)
            </label>
            <input
              type="number"
              defaultValue={5}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Review Time (minutes)
            </label>
            <input
              type="number"
              defaultValue={10}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ReviewComponent: React.FC<{
  configuration: TestConfiguration
}> = ({ configuration }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border">
      <h3 className="text-lg font-semibold mb-4">Review Configuration</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-800 mb-3">Test Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Questions:</span>
              <span className="font-medium">{configuration.totalQuestions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Marks:</span>
              <span className="font-medium">{configuration.totalMarks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{configuration.duration} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Difficulty:</span>
              <span className="font-medium capitalize">{configuration.difficulty}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-3">Selected Topics</h4>
          <div className="space-y-1">
            {configuration.topics.length > 0 ? (
              configuration.topics.map(topic => (
                <div key={topic} className="text-sm text-gray-600">• {topic}</div>
              ))
            ) : (
              <div className="text-sm text-gray-500">No topics selected</div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
)

const GenerateComponent: React.FC<{
  onGenerate: () => void
  isGenerating: boolean
}> = ({ onGenerate, isGenerating }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl p-6 border text-center">
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-indigo-500 rounded-full">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
          <p className="text-gray-600">
            AI will create your customized test based on the configuration
          </p>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full bg-indigo-500 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating Test...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Generate Test
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)

export default MobileOptimizedTestCreator