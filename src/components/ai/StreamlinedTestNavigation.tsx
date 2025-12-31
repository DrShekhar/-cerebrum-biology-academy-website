'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Settings,
  FileText,
  BarChart3,
  Target,
  Clock,
  Shield,
  Users,
  Database,
  Library,
  Share2,
  LineChart,
  Palette,
  RefreshCw,
  Play,
  CheckCircle2,
  Eye,
  Brain,
  Zap,
  BookOpen,
  AlertTriangle,
  Info,
  Star,
  Filter,
  Search,
  Grid,
  List,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Pin,
  PinOff,
  ArrowLeft,
  ArrowRight,
  Home,
  Bookmark,
  History,
  HelpCircle
} from 'lucide-react'

interface NavigationTab {
  id: string
  name: string
  shortName?: string
  icon: React.ReactNode
  description?: string
  isCompleted: boolean
  hasErrors: boolean
  hasWarnings: boolean
  isRequired: boolean
  estimatedTime?: string
  completionPercentage?: number
}

interface NavigationGroup {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  tabs: NavigationTab[]
  isExpanded: boolean
  isRequired: boolean
  completionPercentage: number
  estimatedTime: string
}

interface BreadcrumbItem {
  id: string
  name: string
  href?: string
}

interface StreamlinedTestNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  showBreadcrumbs?: boolean
  showProgress?: boolean
  allowPinning?: boolean
  showQuickActions?: boolean
}

const StreamlinedTestNavigation: React.FC<StreamlinedTestNavigationProps> = ({
  activeTab,
  onTabChange,
  isCollapsed,
  onToggleCollapse,
  showBreadcrumbs = true,
  showProgress = true,
  allowPinning = true,
  showQuickActions = true
}) => {
  const [pinnedTabs, setPinnedTabs] = useState<string[]>(['configure', 'templates', 'generate'])
  const [recentTabs, setRecentTabs] = useState<string[]>(['configure', 'templates', 'sections'])
  const [favoriteGroups, setFavoriteGroups] = useState<string[]>(['essential'])
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [groupStates, setGroupStates] = useState<Record<string, boolean>>({
    essential: true,
    content: false,
    advanced: false,
    review: false
  })

  const searchInputRef = useRef<HTMLInputElement>(null)

  const navigationGroups: NavigationGroup[] = [
    {
      id: 'essential',
      name: 'Essential',
      description: 'Core configuration and templates',
      icon: <Star className="w-4 h-4" />,
      color: 'from-blue-500 to-blue-500',
      isExpanded: true,
      isRequired: true,
      completionPercentage: 75,
      estimatedTime: '5 min',
      tabs: [
        {
          id: 'configure',
          name: 'Configuration',
          shortName: 'Config',
          icon: <Settings className="w-4 h-4" />,
          description: 'Basic test settings and parameters',
          isCompleted: true,
          hasErrors: false,
          hasWarnings: false,
          isRequired: true,
          estimatedTime: '2 min',
          completionPercentage: 100
        },
        {
          id: 'templates',
          name: 'Templates',
          icon: <FileText className="w-4 h-4" />,
          description: 'Choose from pre-built test templates',
          isCompleted: true,
          hasErrors: false,
          hasWarnings: false,
          isRequired: false,
          estimatedTime: '2 min',
          completionPercentage: 100
        },
        {
          id: 'generate',
          name: 'Generate',
          icon: <Play className="w-4 h-4" />,
          description: 'Generate your test with AI',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: true,
          estimatedTime: '1 min',
          completionPercentage: 0
        }
      ]
    },
    {
      id: 'content',
      name: 'Content & Structure',
      description: 'Question bank and test structure',
      icon: <BookOpen className="w-4 h-4" />,
      color: 'bg-green-600',
      isExpanded: false,
      isRequired: false,
      completionPercentage: 40,
      estimatedTime: '8 min',
      tabs: [
        {
          id: 'sections',
          name: 'Sections',
          icon: <BarChart3 className="w-4 h-4" />,
          description: 'Configure test sections and distribution',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: true,
          isRequired: false,
          estimatedTime: '3 min',
          completionPercentage: 60
        },
        {
          id: 'bank',
          name: 'Question Bank',
          shortName: 'Q-Bank',
          icon: <Library className="w-4 h-4" />,
          description: 'Manage and select questions',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: false,
          estimatedTime: '5 min',
          completionPercentage: 20
        }
      ]
    },
    {
      id: 'advanced',
      name: 'Advanced Features',
      description: 'Security, collaboration, and customization',
      icon: <Zap className="w-4 h-4" />,
      color: 'from-purple-500 to-indigo-500',
      isExpanded: false,
      isRequired: false,
      completionPercentage: 0,
      estimatedTime: '12 min',
      tabs: [
        {
          id: 'adaptive',
          name: 'Adaptive',
          icon: <Target className="w-4 h-4" />,
          description: 'AI-powered adaptive testing features',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: false,
          estimatedTime: '4 min',
          completionPercentage: 0
        },
        {
          id: 'security',
          name: 'Security',
          icon: <Shield className="w-4 h-4" />,
          description: 'Security settings and anti-cheating',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: false,
          estimatedTime: '3 min',
          completionPercentage: 0
        },
        {
          id: 'collaborate',
          name: 'Collaboration',
          shortName: 'Collab',
          icon: <Users className="w-4 h-4" />,
          description: 'Team collaboration features',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: false,
          estimatedTime: '2 min',
          completionPercentage: 0
        },
        {
          id: 'ui',
          name: 'UI Customization',
          shortName: 'UI/UX',
          icon: <Palette className="w-4 h-4" />,
          description: 'Customize test interface and branding',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: false,
          estimatedTime: '3 min',
          completionPercentage: 0
        }
      ]
    },
    {
      id: 'review',
      name: 'Review & Deploy',
      description: 'Quality check and distribution',
      icon: <Eye className="w-4 h-4" />,
      color: 'bg-orange-600',
      isExpanded: false,
      isRequired: true,
      completionPercentage: 0,
      estimatedTime: '6 min',
      tabs: [
        {
          id: 'review',
          name: 'Review',
          icon: <CheckCircle2 className="w-4 h-4" />,
          description: 'Preview and validate test',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: true,
          estimatedTime: '3 min',
          completionPercentage: 0
        },
        {
          id: 'distribute',
          name: 'Distribution',
          shortName: 'Distribute',
          icon: <Share2 className="w-4 h-4" />,
          description: 'Deploy and share test',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: true,
          estimatedTime: '2 min',
          completionPercentage: 0
        },
        {
          id: 'analytics',
          name: 'Analytics',
          icon: <LineChart className="w-4 h-4" />,
          description: 'Performance tracking and insights',
          isCompleted: false,
          hasErrors: false,
          hasWarnings: false,
          isRequired: false,
          estimatedTime: '1 min',
          completionPercentage: 0
        }
      ]
    }
  ]

  // Get current active group and tab info
  const getCurrentGroup = () => {
    return navigationGroups.find(group =>
      group.tabs.some(tab => tab.id === activeTab)
    )
  }

  const getCurrentTab = () => {
    for (const group of navigationGroups) {
      const tab = group.tabs.find(t => t.id === activeTab)
      if (tab) return { group, tab }
    }
    return null
  }

  // Generate breadcrumbs
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const current = getCurrentTab()
    if (!current) return []

    return [
      { id: 'home', name: 'Test Creator' },
      { id: current.group.id, name: current.group.name },
      { id: current.tab.id, name: current.tab.name }
    ]
  }

  // Filter tabs based on search
  const getFilteredGroups = () => {
    if (!searchQuery) return navigationGroups

    return navigationGroups.map(group => ({
      ...group,
      tabs: group.tabs.filter(tab =>
        tab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tab.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(group => group.tabs.length > 0)
  }

  // Toggle group expansion
  const toggleGroup = (groupId: string) => {
    setGroupStates(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }))
  }

  // Pin/unpin tab
  const togglePinTab = (tabId: string) => {
    setPinnedTabs(prev =>
      prev.includes(tabId)
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId].slice(0, 5) // Limit to 5 pinned tabs
    )
  }

  // Add to recent tabs
  const addToRecent = (tabId: string) => {
    setRecentTabs(prev => {
      const filtered = prev.filter(id => id !== tabId)
      return [tabId, ...filtered].slice(0, 8)
    })
  }

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    onTabChange(tabId)
    addToRecent(tabId)
    setShowSearch(false)
    setSearchQuery('')
  }

  // Get next/previous tab for navigation
  const getAdjacentTab = (direction: 'next' | 'prev') => {
    const allTabs = navigationGroups.flatMap(group => group.tabs)
    const currentIndex = allTabs.findIndex(tab => tab.id === activeTab)

    if (direction === 'next') {
      return currentIndex < allTabs.length - 1 ? allTabs[currentIndex + 1] : null
    } else {
      return currentIndex > 0 ? allTabs[currentIndex - 1] : null
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault()
            setShowSearch(true)
            break
          case 'ArrowLeft':
            e.preventDefault()
            const prevTab = getAdjacentTab('prev')
            if (prevTab) handleTabChange(prevTab.id)
            break
          case 'ArrowRight':
            e.preventDefault()
            const nextTab = getAdjacentTab('next')
            if (nextTab) handleTabChange(nextTab.id)
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTab])

  // Focus search input when opened
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [showSearch])

  const getStatusIcon = (tab: NavigationTab) => {
    if (tab.hasErrors) return <AlertTriangle className="w-3 h-3 text-red-500" />
    if (tab.hasWarnings) return <AlertTriangle className="w-3 h-3 text-yellow-500" />
    if (tab.isCompleted) return <CheckCircle2 className="w-3 h-3 text-green-600" />
    return null
  }

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-600'
    if (percentage >= 70) return 'bg-blue-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-gray-300'
  }

  return (
    <div className={`flex flex-col h-full bg-white border-r transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-gray-800">Test Creator</h2>
              <p className="text-sm text-gray-600">AI-powered test generation</p>
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {!isCollapsed && (
          <>
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search tabs... (Ctrl+K)</span>
              </button>

              <AnimatePresence>
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50"
                  >
                    <div className="p-3">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Type to search tabs..."
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') {
                            setShowSearch(false)
                            setSearchQuery('')
                          }
                        }}
                      />
                    </div>

                    {searchQuery && (
                      <div className="border-t max-h-64 overflow-y-auto">
                        {getFilteredGroups().map(group => (
                          <div key={group.id}>
                            {group.tabs.map(tab => (
                              <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
                              >
                                {tab.icon}
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm">{tab.name}</div>
                                  <div className="text-xs text-gray-500 truncate">
                                    {group.name} • {tab.description}
                                  </div>
                                </div>
                                {getStatusIcon(tab)}
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Breadcrumbs */}
            {showBreadcrumbs && (
              <div className="mt-3 flex items-center gap-1 text-sm text-gray-600">
                {getBreadcrumbs().map((item, index) => (
                  <React.Fragment key={item.id}>
                    {index > 0 && <ChevronRight className="w-3 h-3" />}
                    <span className={index === getBreadcrumbs().length - 1 ? 'font-medium text-gray-800' : ''}>
                      {item.name}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Navigation */}
      {!isCollapsed && (
        <div className="p-4 border-b space-y-3">
          {/* Pinned Tabs */}
          {pinnedTabs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Pin className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Pinned
                </span>
              </div>
              <div className="space-y-1">
                {pinnedTabs.map(tabId => {
                  const tabInfo = getCurrentTab()
                  const tab = navigationGroups.flatMap(g => g.tabs).find(t => t.id === tabId)
                  if (!tab) return null

                  return (
                    <button
                      key={tabId}
                      onClick={() => handleTabChange(tabId)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                        activeTab === tabId
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      <span className="flex-1 text-left truncate">{tab.shortName || tab.name}</span>
                      {getStatusIcon(tab)}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Recent Tabs */}
          {recentTabs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <History className="w-3 h-3 text-gray-400" />
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Recent
                </span>
              </div>
              <div className="space-y-1">
                {recentTabs.slice(0, 3).map(tabId => {
                  const tab = navigationGroups.flatMap(g => g.tabs).find(t => t.id === tabId)
                  if (!tab) return null

                  return (
                    <button
                      key={tabId}
                      onClick={() => handleTabChange(tabId)}
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                        activeTab === tabId
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {tab.icon}
                      <span className="flex-1 text-left truncate">{tab.shortName || tab.name}</span>
                      {getStatusIcon(tab)}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-2">
          {navigationGroups.map(group => (
            <div key={group.id} className="space-y-1">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`p-1.5 bg-gradient-to-r ${group.color} rounded-lg text-white`}>
                    {group.icon}
                  </div>

                  {!isCollapsed && (
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">{group.name}</span>
                        {group.isRequired && (
                          <span className="text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>

                      {showProgress && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${getCompletionColor(group.completionPercentage)}`}
                              style={{ width: `${group.completionPercentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{group.estimatedTime}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {!isCollapsed && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">
                      {group.tabs.length}
                    </span>
                    {groupStates[group.id] ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                )}
              </button>

              {/* Group Tabs */}
              <AnimatePresence>
                {(groupStates[group.id] || isCollapsed) && (
                  <motion.div
                    initial={!isCollapsed ? { height: 0, opacity: 0 } : { opacity: 1 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={!isCollapsed ? { height: 0, opacity: 0 } : { opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={isCollapsed ? 'space-y-1' : 'ml-4 space-y-1'}>
                      {group.tabs.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors group relative ${
                            activeTab === tab.id
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'hover:bg-gray-50'
                          }`}
                          title={isCollapsed ? `${tab.name} - ${tab.description}` : undefined}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {tab.icon}

                            {!isCollapsed && (
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium truncate">{tab.name}</span>
                                  {tab.isRequired && (
                                    <span className="text-xs text-red-600">*</span>
                                  )}
                                  {getStatusIcon(tab)}
                                </div>

                                {tab.description && (
                                  <div className="text-xs text-gray-500 truncate mt-0.5">
                                    {tab.description}
                                  </div>
                                )}

                                {showProgress && tab.completionPercentage !== undefined && (
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex-1 bg-gray-200 rounded-full h-1">
                                      <div
                                        className={`h-1 rounded-full transition-all ${getCompletionColor(tab.completionPercentage)}`}
                                        style={{ width: `${tab.completionPercentage}%` }}
                                      />
                                    </div>
                                    <span className="text-xs text-gray-500">{tab.estimatedTime}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {!isCollapsed && allowPinning && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                togglePinTab(tab.id)
                              }}
                              className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                                pinnedTabs.includes(tab.id)
                                  ? 'text-blue-600'
                                  : 'text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              {pinnedTabs.includes(tab.id) ? (
                                <Pin className="w-3 h-3" />
                              ) : (
                                <PinOff className="w-3 h-3" />
                              )}
                            </button>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Quick Actions */}
      {!isCollapsed && showQuickActions && (
        <div className="p-4 border-t">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Play className="w-4 h-4" />
                Generate
              </button>
              <button className="p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+K</kbd>
              <span>to search</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StreamlinedTestNavigation