'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Palette,
  Type,
  Eye,
  FileText,
  Image,
  MessageSquare,
  BarChart3,
  Upload,
  Download,
  Save,
  RefreshCw,
  Monitor,
  Smartphone,
  Tablet,
  Settings,
  Zap,
  Copy,
  Check,
  X,
  Plus,
  Trash2,
  Edit3,
  Sun,
  Moon,
  Contrast,
  Paintbrush,
  Layout,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline
} from 'lucide-react'

// Types and Interfaces
interface ThemeSettings {
  id: string
  name: string
  description: string
  primaryColor: string
  secondaryColor: string
  backgroundColor: string
  textColor: string
  accentColor: string
  borderRadius: string
  fontFamily: string
  isDark: boolean
  preview: string
}

interface FontSettings {
  family: string
  size: {
    small: string
    medium: string
    large: string
    xlarge: string
  }
  weight: string
  lineHeight: string
  letterSpacing: string
}

interface DifficultyColors {
  easy: {
    background: string
    text: string
    border: string
  }
  medium: {
    background: string
    text: string
    border: string
  }
  hard: {
    background: string
    text: string
    border: string
  }
}

interface CustomInstructions {
  id: string
  title: string
  content: string
  position: 'top' | 'bottom' | 'sidebar'
  style: 'info' | 'warning' | 'success' | 'error'
  isActive: boolean
}

interface BrandingSettings {
  logo: {
    url: string
    width: string
    height: string
    position: 'top-left' | 'top-center' | 'top-right'
  }
  organizationName: string
  tagline: string
  favicon: string
  watermark: {
    text: string
    opacity: string
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  }
  customCSS: string
}

interface StatusMessages {
  success: {
    title: string
    message: string
    icon: string
    color: string
  }
  failure: {
    title: string
    message: string
    icon: string
    color: string
  }
  timeout: {
    title: string
    message: string
    icon: string
    color: string
  }
  submission: {
    title: string
    message: string
    icon: string
    color: string
  }
}

interface ProgressBarSettings {
  style: 'thin' | 'thick' | 'rounded' | 'gradient'
  color: string
  backgroundColor: string
  animation: 'none' | 'pulse' | 'glow' | 'slide'
  showPercentage: boolean
  showTimeRemaining: boolean
  position: 'top' | 'bottom' | 'sidebar'
  height: string
}

interface UICustomizationData {
  themes: ThemeSettings[]
  selectedTheme: string
  fontSettings: FontSettings
  difficultyColors: DifficultyColors
  customInstructions: CustomInstructions[]
  brandingSettings: BrandingSettings
  statusMessages: StatusMessages
  progressBarSettings: ProgressBarSettings
}

const UICustomization: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'themes' | 'fonts' | 'colors' | 'instructions' | 'branding' | 'messages' | 'progress'>('themes')
  const [customizationData, setCustomizationData] = useState<UICustomizationData | null>(null)
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // Initialize customization data
  useEffect(() => {
    generateMockCustomization()
  }, [])

  const generateMockCustomization = () => {
    const mockData: UICustomizationData = {
      themes: [
        {
          id: 'modern-light',
          name: 'Modern Light',
          description: 'Clean and professional light theme',
          primaryColor: '#3B82F6',
          secondaryColor: '#10B981',
          backgroundColor: '#FFFFFF',
          textColor: '#1F2937',
          accentColor: '#F59E0B',
          borderRadius: '0.5rem',
          fontFamily: 'Inter',
          isDark: false,
          preview: 'light-preview.jpg'
        },
        {
          id: 'modern-dark',
          name: 'Modern Dark',
          description: 'Elegant dark theme for reduced eye strain',
          primaryColor: '#60A5FA',
          secondaryColor: '#34D399',
          backgroundColor: '#1F2937',
          textColor: '#F9FAFB',
          accentColor: '#FBBF24',
          borderRadius: '0.5rem',
          fontFamily: 'Inter',
          isDark: true,
          preview: 'dark-preview.jpg'
        },
        {
          id: 'academic',
          name: 'Academic',
          description: 'Traditional academic style theme',
          primaryColor: '#7C3AED',
          secondaryColor: '#059669',
          backgroundColor: '#F8FAFC',
          textColor: '#374151',
          accentColor: '#DC2626',
          borderRadius: '0.25rem',
          fontFamily: 'Georgia',
          isDark: false,
          preview: 'academic-preview.jpg'
        },
        {
          id: 'vibrant',
          name: 'Vibrant',
          description: 'Colorful and engaging theme',
          primaryColor: '#EC4899',
          secondaryColor: '#8B5CF6',
          backgroundColor: '#FFFFFF',
          textColor: '#111827',
          accentColor: '#F97316',
          borderRadius: '1rem',
          fontFamily: 'Poppins',
          isDark: false,
          preview: 'vibrant-preview.jpg'
        }
      ],
      selectedTheme: 'modern-light',
      fontSettings: {
        family: 'Inter',
        size: {
          small: '14px',
          medium: '16px',
          large: '18px',
          xlarge: '20px'
        },
        weight: '400',
        lineHeight: '1.5',
        letterSpacing: '0'
      },
      difficultyColors: {
        easy: {
          background: '#DCFCE7',
          text: '#166534',
          border: '#BBF7D0'
        },
        medium: {
          background: '#FEF3C7',
          text: '#92400E',
          border: '#FDE68A'
        },
        hard: {
          background: '#FEE2E2',
          text: '#DC2626',
          border: '#FECACA'
        }
      },
      customInstructions: [
        {
          id: 'welcome',
          title: 'Welcome Instructions',
          content: 'Welcome to the NEET Biology Test. Please read all questions carefully before answering.',
          position: 'top',
          style: 'info',
          isActive: true
        },
        {
          id: 'time-warning',
          title: 'Time Warning',
          content: 'You have 15 minutes remaining. Please manage your time accordingly.',
          position: 'top',
          style: 'warning',
          isActive: true
        }
      ],
      brandingSettings: {
        logo: {
          url: '/logo-cerebrum.png',
          width: '150px',
          height: '50px',
          position: 'top-left'
        },
        organizationName: 'Cerebrum Biology Academy',
        tagline: 'Excellence in Biology Education',
        favicon: '/favicon.ico',
        watermark: {
          text: 'Cerebrum Academy',
          opacity: '0.1',
          position: 'center'
        },
        customCSS: '/* Custom styles */'
      },
      statusMessages: {
        success: {
          title: 'Test Completed Successfully!',
          message: 'Congratulations! You have completed the test. Your results will be available shortly.',
          icon: '🎉',
          color: '#10B981'
        },
        failure: {
          title: 'Test Incomplete',
          message: 'Unfortunately, you were unable to complete the test. Please contact your instructor.',
          icon: '😞',
          color: '#EF4444'
        },
        timeout: {
          title: 'Time\'s Up!',
          message: 'The test time has expired. Your responses have been automatically submitted.',
          icon: '⏰',
          color: '#F59E0B'
        },
        submission: {
          title: 'Submitting Your Test',
          message: 'Please wait while we process your responses...',
          icon: '📤',
          color: '#3B82F6'
        }
      },
      progressBarSettings: {
        style: 'rounded',
        color: '#3B82F6',
        backgroundColor: '#E5E7EB',
        animation: 'glow',
        showPercentage: true,
        showTimeRemaining: true,
        position: 'top',
        height: '8px'
      }
    }

    setCustomizationData(mockData)
  }

  const updateTheme = (themeId: string) => {
    if (!customizationData) return
    setCustomizationData({
      ...customizationData,
      selectedTheme: themeId
    })
  }

  const updateFontSettings = (newFontSettings: Partial<FontSettings>) => {
    if (!customizationData) return
    setCustomizationData({
      ...customizationData,
      fontSettings: {
        ...customizationData.fontSettings,
        ...newFontSettings
      }
    })
  }

  const updateDifficultyColors = (difficulty: keyof DifficultyColors, colorType: keyof DifficultyColors['easy'], value: string) => {
    if (!customizationData) return
    setCustomizationData({
      ...customizationData,
      difficultyColors: {
        ...customizationData.difficultyColors,
        [difficulty]: {
          ...customizationData.difficultyColors[difficulty],
          [colorType]: value
        }
      }
    })
  }

  const addCustomInstruction = () => {
    if (!customizationData) return
    const newInstruction: CustomInstructions = {
      id: `instruction_${Date.now()}`,
      title: 'New Instruction',
      content: 'Enter your custom instruction here...',
      position: 'top',
      style: 'info',
      isActive: true
    }
    setCustomizationData({
      ...customizationData,
      customInstructions: [...customizationData.customInstructions, newInstruction]
    })
  }

  const updateCustomInstruction = (id: string, updates: Partial<CustomInstructions>) => {
    if (!customizationData) return
    setCustomizationData({
      ...customizationData,
      customInstructions: customizationData.customInstructions.map(instruction =>
        instruction.id === id ? { ...instruction, ...updates } : instruction
      )
    })
  }

  const deleteCustomInstruction = (id: string) => {
    if (!customizationData) return
    setCustomizationData({
      ...customizationData,
      customInstructions: customizationData.customInstructions.filter(instruction => instruction.id !== id)
    })
  }

  const updateBrandingSettings = (updates: Partial<BrandingSettings>) => {
    if (!customizationData) return
    setCustomizationData({
      ...customizationData,
      brandingSettings: {
        ...customizationData.brandingSettings,
        ...updates
      }
    })
  }

  const updateStatusMessages = (messageType: keyof StatusMessages, updates: Partial<StatusMessages['success']>) => {
    if (!customizationData) return
    setCustomizationData({
      ...customizationData,
      statusMessages: {
        ...customizationData.statusMessages,
        [messageType]: {
          ...customizationData.statusMessages[messageType],
          ...updates
        }
      }
    })
  }

  const updateProgressBarSettings = (updates: Partial<ProgressBarSettings>) => {
    if (!customizationData) return
    setCustomizationData({
      ...customizationData,
      progressBarSettings: {
        ...customizationData.progressBarSettings,
        ...updates
      }
    })
  }

  const saveCustomization = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      // Show success message or handle save
    }, 2000)
  }

  const exportCustomization = () => {
    if (!customizationData) return
    const dataStr = JSON.stringify(customizationData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'ui-customization.json'
    link.click()
  }

  const getStyleColor = (style: string) => {
    switch (style) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPreviewSize = () => {
    switch (previewMode) {
      case 'mobile': return 'w-80 h-96'
      case 'tablet': return 'w-96 h-80'
      case 'desktop': return 'w-full h-96'
      default: return 'w-full h-96'
    }
  }

  if (!customizationData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Loading customization options...</p>
          </div>
        </div>
      </div>
    )
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
          <div className="p-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            UI Customization
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive interface customization with themes, fonts, colors, branding, and personalized user experience settings
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Preview Mode:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white shadow text-pink-600' : 'text-gray-600'}`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-white shadow text-pink-600' : 'text-gray-600'}`}
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white shadow text-pink-600' : 'text-gray-600'}`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showPreview}
                onChange={(e) => setShowPreview(e.target.checked)}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show Live Preview</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCustomization}
              className="px-4 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={saveCustomization}
              disabled={saving}
              className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'themes', label: 'Themes', icon: Palette },
            { id: 'fonts', label: 'Fonts', icon: Type },
            { id: 'colors', label: 'Colors', icon: Eye },
            { id: 'instructions', label: 'Instructions', icon: FileText },
            { id: 'branding', label: 'Branding', icon: Image },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'progress', label: 'Progress', icon: BarChart3 }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-pink-600 shadow-md'
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Customization Panel */}
        <div className="xl:col-span-2">
          <AnimatePresence mode="wait">
            {/* Theme Selection */}
            {activeTab === 'themes' && (
              <motion.div
                key="themes"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-xl p-6 border"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-600" />
                  Theme Selection
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customizationData.themes.map((theme) => (
                    <div
                      key={theme.id}
                      onClick={() => updateTheme(theme.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        customizationData.selectedTheme === theme.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{theme.name}</h4>
                        {customizationData.selectedTheme === theme.id && (
                          <Check className="w-5 h-5 text-pink-600" />
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{theme.description}</p>

                      {/* Theme Preview */}
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <div
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: theme.primaryColor }}
                            title="Primary Color"
                          />
                          <div
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: theme.secondaryColor }}
                            title="Secondary Color"
                          />
                          <div
                            className="w-6 h-6 rounded-full border"
                            style={{ backgroundColor: theme.accentColor }}
                            title="Accent Color"
                          />
                        </div>

                        <div
                          className="p-3 rounded border"
                          style={{
                            backgroundColor: theme.backgroundColor,
                            color: theme.textColor,
                            borderRadius: theme.borderRadius,
                            fontFamily: theme.fontFamily
                          }}
                        >
                          <div className="text-sm">Sample Question Text</div>
                          <div className="mt-2 flex gap-2">
                            <button
                              className="px-3 py-1 text-xs rounded"
                              style={{ backgroundColor: theme.primaryColor, color: 'white' }}
                            >
                              Option A
                            </button>
                            <button
                              className="px-3 py-1 text-xs rounded border"
                              style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
                            >
                              Option B
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                        <span>{theme.fontFamily}</span>
                        <span>•</span>
                        <span>{theme.isDark ? 'Dark' : 'Light'}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Custom Theme</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Create your own theme by customizing colors and typography in other tabs.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Create Custom Theme
                  </button>
                </div>
              </motion.div>
            )}

            {/* Font Settings */}
            {activeTab === 'fonts' && (
              <motion.div
                key="fonts"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-xl p-6 border"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5 text-blue-600" />
                  Font Settings
                </h3>

                <div className="space-y-6">
                  {/* Font Family */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Family
                    </label>
                    <select
                      value={customizationData.fontSettings.family}
                      onChange={(e) => updateFontSettings({ family: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Inter">Inter (Modern Sans-serif)</option>
                      <option value="Roboto">Roboto (Google Fonts)</option>
                      <option value="Open Sans">Open Sans (Friendly)</option>
                      <option value="Poppins">Poppins (Rounded)</option>
                      <option value="Lato">Lato (Humanist)</option>
                      <option value="Georgia">Georgia (Serif)</option>
                      <option value="Times New Roman">Times New Roman (Classical)</option>
                      <option value="Courier New">Courier New (Monospace)</option>
                    </select>
                  </div>

                  {/* Font Sizes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Font Sizes
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(customizationData.fontSettings.size).map(([size, value]) => (
                        <div key={size}>
                          <label className="block text-xs text-gray-600 mb-1 capitalize">
                            {size}
                          </label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateFontSettings({
                              size: { ...customizationData.fontSettings.size, [size]: e.target.value }
                            })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="16px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Font Weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Weight
                    </label>
                    <select
                      value={customizationData.fontSettings.weight}
                      onChange={(e) => updateFontSettings({ weight: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="300">Light (300)</option>
                      <option value="400">Normal (400)</option>
                      <option value="500">Medium (500)</option>
                      <option value="600">Semi-bold (600)</option>
                      <option value="700">Bold (700)</option>
                    </select>
                  </div>

                  {/* Line Height and Letter Spacing */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Line Height
                      </label>
                      <input
                        type="text"
                        value={customizationData.fontSettings.lineHeight}
                        onChange={(e) => updateFontSettings({ lineHeight: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Letter Spacing
                      </label>
                      <input
                        type="text"
                        value={customizationData.fontSettings.letterSpacing}
                        onChange={(e) => updateFontSettings({ letterSpacing: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0px"
                      />
                    </div>
                  </div>

                  {/* Typography Preview */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Typography Preview</h4>
                    <div
                      style={{
                        fontFamily: customizationData.fontSettings.family,
                        fontWeight: customizationData.fontSettings.weight,
                        lineHeight: customizationData.fontSettings.lineHeight,
                        letterSpacing: customizationData.fontSettings.letterSpacing
                      }}
                    >
                      <div
                        className="mb-2"
                        style={{ fontSize: customizationData.fontSettings.size.xlarge }}
                      >
                        Question Title (Extra Large)
                      </div>
                      <div
                        className="mb-2"
                        style={{ fontSize: customizationData.fontSettings.size.large }}
                      >
                        Question Content (Large)
                      </div>
                      <div
                        className="mb-2"
                        style={{ fontSize: customizationData.fontSettings.size.medium }}
                      >
                        Answer Options (Medium)
                      </div>
                      <div
                        style={{ fontSize: customizationData.fontSettings.size.small }}
                      >
                        Instructions and Help Text (Small)
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Difficulty Colors */}
            {activeTab === 'colors' && (
              <motion.div
                key="colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-xl p-6 border"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-green-600" />
                  Difficulty Color Coding
                </h3>

                <div className="space-y-6">
                  {Object.entries(customizationData.difficultyColors).map(([difficulty, colors]) => (
                    <div key={difficulty} className="space-y-4">
                      <h4 className="font-medium capitalize flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors.background }}
                        />
                        {difficulty} Questions
                      </h4>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Background</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={colors.background}
                              onChange={(e) => updateDifficultyColors(difficulty as keyof DifficultyColors, 'background', e.target.value)}
                              className="w-12 h-10 border rounded-lg cursor-pointer"
                            />
                            <input
                              type="text"
                              value={colors.background}
                              onChange={(e) => updateDifficultyColors(difficulty as keyof DifficultyColors, 'background', e.target.value)}
                              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Text</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={colors.text}
                              onChange={(e) => updateDifficultyColors(difficulty as keyof DifficultyColors, 'text', e.target.value)}
                              className="w-12 h-10 border rounded-lg cursor-pointer"
                            />
                            <input
                              type="text"
                              value={colors.text}
                              onChange={(e) => updateDifficultyColors(difficulty as keyof DifficultyColors, 'text', e.target.value)}
                              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Border</label>
                          <div className="flex gap-2">
                            <input
                              type="color"
                              value={colors.border}
                              onChange={(e) => updateDifficultyColors(difficulty as keyof DifficultyColors, 'border', e.target.value)}
                              className="w-12 h-10 border rounded-lg cursor-pointer"
                            />
                            <input
                              type="text"
                              value={colors.border}
                              onChange={(e) => updateDifficultyColors(difficulty as keyof DifficultyColors, 'border', e.target.value)}
                              className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div
                          className="inline-block px-4 py-2 rounded-lg border-2 font-medium"
                          style={{
                            backgroundColor: colors.background,
                            color: colors.text,
                            borderColor: colors.border
                          }}
                        >
                          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Question Sample
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Color Guidelines</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Use high contrast ratios for accessibility (4.5:1 minimum)</li>
                      <li>• Green typically represents easy, yellow/orange for medium, red for hard</li>
                      <li>• Consider colorblind users - use additional visual cues</li>
                      <li>• Test colors in different lighting conditions</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Custom Instructions */}
            {activeTab === 'instructions' && (
              <motion.div
                key="instructions"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-xl p-6 border"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    Custom Instructions
                  </h3>
                  <button
                    onClick={addCustomInstruction}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Instruction
                  </button>
                </div>

                <div className="space-y-4">
                  {customizationData.customInstructions.map((instruction) => (
                    <div key={instruction.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <input
                          type="text"
                          value={instruction.title}
                          onChange={(e) => updateCustomInstruction(instruction.id, { title: e.target.value })}
                          className="font-medium text-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2"
                        />
                        <div className="flex items-center gap-2">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={instruction.isActive}
                              onChange={(e) => updateCustomInstruction(instruction.id, { isActive: e.target.checked })}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Active</span>
                          </label>
                          <button
                            onClick={() => deleteCustomInstruction(instruction.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <textarea
                        value={instruction.content}
                        onChange={(e) => updateCustomInstruction(instruction.id, { content: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3"
                        placeholder="Enter instruction content..."
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Position</label>
                          <select
                            value={instruction.position}
                            onChange={(e) => updateCustomInstruction(instruction.id, { position: e.target.value as any })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="sidebar">Sidebar</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Style</label>
                          <select
                            value={instruction.style}
                            onChange={(e) => updateCustomInstruction(instruction.id, { style: e.target.value as any })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="info">Info</option>
                            <option value="warning">Warning</option>
                            <option value="success">Success</option>
                            <option value="error">Error</option>
                          </select>
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="mt-3">
                        <div className={`p-3 rounded-lg border ${getStyleColor(instruction.style)}`}>
                          <div className="font-medium mb-1">{instruction.title}</div>
                          <div className="text-sm">{instruction.content}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Branding Settings */}
            {activeTab === 'branding' && (
              <motion.div
                key="branding"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-xl p-6 border"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Image className="w-5 h-5 text-indigo-600" />
                  Branding & Logo
                </h3>

                <div className="space-y-6">
                  {/* Logo Settings */}
                  <div>
                    <h4 className="font-medium mb-3">Logo Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Logo URL</label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={customizationData.brandingSettings.logo.url}
                            onChange={(e) => updateBrandingSettings({
                              logo: { ...customizationData.brandingSettings.logo, url: e.target.value }
                            })}
                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="https://example.com/logo.png"
                          />
                          <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Position</label>
                        <select
                          value={customizationData.brandingSettings.logo.position}
                          onChange={(e) => updateBrandingSettings({
                            logo: { ...customizationData.brandingSettings.logo, position: e.target.value as any }
                          })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="top-left">Top Left</option>
                          <option value="top-center">Top Center</option>
                          <option value="top-right">Top Right</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Width</label>
                        <input
                          type="text"
                          value={customizationData.brandingSettings.logo.width}
                          onChange={(e) => updateBrandingSettings({
                            logo: { ...customizationData.brandingSettings.logo, width: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="150px"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Height</label>
                        <input
                          type="text"
                          value={customizationData.brandingSettings.logo.height}
                          onChange={(e) => updateBrandingSettings({
                            logo: { ...customizationData.brandingSettings.logo, height: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="50px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Organization Info */}
                  <div>
                    <h4 className="font-medium mb-3">Organization Information</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Organization Name</label>
                        <input
                          type="text"
                          value={customizationData.brandingSettings.organizationName}
                          onChange={(e) => updateBrandingSettings({ organizationName: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Your Organization"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Tagline</label>
                        <input
                          type="text"
                          value={customizationData.brandingSettings.tagline}
                          onChange={(e) => updateBrandingSettings({ tagline: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Your tagline here"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Watermark Settings */}
                  <div>
                    <h4 className="font-medium mb-3">Watermark Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Text</label>
                        <input
                          type="text"
                          value={customizationData.brandingSettings.watermark.text}
                          onChange={(e) => updateBrandingSettings({
                            watermark: { ...customizationData.brandingSettings.watermark, text: e.target.value }
                          })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Watermark text"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Opacity</label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={customizationData.brandingSettings.watermark.opacity}
                          onChange={(e) => updateBrandingSettings({
                            watermark: { ...customizationData.brandingSettings.watermark, opacity: e.target.value }
                          })}
                          className="w-full"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {(parseFloat(customizationData.brandingSettings.watermark.opacity) * 100).toFixed(0)}%
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Position</label>
                        <select
                          value={customizationData.brandingSettings.watermark.position}
                          onChange={(e) => updateBrandingSettings({
                            watermark: { ...customizationData.brandingSettings.watermark, position: e.target.value as any }
                          })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="top-left">Top Left</option>
                          <option value="top-right">Top Right</option>
                          <option value="bottom-left">Bottom Left</option>
                          <option value="bottom-right">Bottom Right</option>
                          <option value="center">Center</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Custom CSS */}
                  <div>
                    <h4 className="font-medium mb-3">Custom CSS</h4>
                    <textarea
                      value={customizationData.brandingSettings.customCSS}
                      onChange={(e) => updateBrandingSettings({ customCSS: e.target.value })}
                      rows={6}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                      placeholder="/* Add your custom CSS here */"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Status Messages */}
            {activeTab === 'messages' && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-xl p-6 border"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  Success/Failure Messages
                </h3>

                <div className="space-y-6">
                  {Object.entries(customizationData.statusMessages).map(([messageType, message]) => (
                    <div key={messageType} className="space-y-4">
                      <h4 className="font-medium capitalize">{messageType} Message</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Title</label>
                          <input
                            type="text"
                            value={message.title}
                            onChange={(e) => updateStatusMessages(messageType as keyof StatusMessages, { title: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Icon</label>
                          <input
                            type="text"
                            value={message.icon}
                            onChange={(e) => updateStatusMessages(messageType as keyof StatusMessages, { icon: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="🎉"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Message</label>
                        <textarea
                          value={message.message}
                          onChange={(e) => updateStatusMessages(messageType as keyof StatusMessages, { message: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-2">Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={message.color}
                            onChange={(e) => updateStatusMessages(messageType as keyof StatusMessages, { color: e.target.value })}
                            className="w-12 h-10 border rounded-lg cursor-pointer"
                          />
                          <input
                            type="text"
                            value={message.color}
                            onChange={(e) => updateStatusMessages(messageType as keyof StatusMessages, { color: e.target.value })}
                            className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono"
                          />
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div
                          className="p-4 rounded-lg border-l-4 bg-white"
                          style={{ borderLeftColor: message.color }}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{message.icon}</span>
                            <h5 className="font-medium" style={{ color: message.color }}>
                              {message.title}
                            </h5>
                          </div>
                          <p className="text-gray-700">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Progress Bar Settings */}
            {activeTab === 'progress' && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-xl p-6 border"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-teal-600" />
                  Progress Bar Style
                </h3>

                <div className="space-y-6">
                  {/* Style and Position */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Style</label>
                      <select
                        value={customizationData.progressBarSettings.style}
                        onChange={(e) => updateProgressBarSettings({ style: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="thin">Thin</option>
                        <option value="thick">Thick</option>
                        <option value="rounded">Rounded</option>
                        <option value="gradient">Gradient</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Position</label>
                      <select
                        value={customizationData.progressBarSettings.position}
                        onChange={(e) => updateProgressBarSettings({ position: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="sidebar">Sidebar</option>
                      </select>
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Progress Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customizationData.progressBarSettings.color}
                          onChange={(e) => updateProgressBarSettings({ color: e.target.value })}
                          className="w-12 h-10 border rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customizationData.progressBarSettings.color}
                          onChange={(e) => updateProgressBarSettings({ color: e.target.value })}
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Background Color</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={customizationData.progressBarSettings.backgroundColor}
                          onChange={(e) => updateProgressBarSettings({ backgroundColor: e.target.value })}
                          className="w-12 h-10 border rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={customizationData.progressBarSettings.backgroundColor}
                          onChange={(e) => updateProgressBarSettings({ backgroundColor: e.target.value })}
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Settings */}
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Height</label>
                    <input
                      type="text"
                      value={customizationData.progressBarSettings.height}
                      onChange={(e) => updateProgressBarSettings({ height: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="8px"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Animation</label>
                    <select
                      value={customizationData.progressBarSettings.animation}
                      onChange={(e) => updateProgressBarSettings({ animation: e.target.value as any })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="none">None</option>
                      <option value="pulse">Pulse</option>
                      <option value="glow">Glow</option>
                      <option value="slide">Slide</option>
                    </select>
                  </div>

                  {/* Display Options */}
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={customizationData.progressBarSettings.showPercentage}
                        onChange={(e) => updateProgressBarSettings({ showPercentage: e.target.checked })}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Show percentage</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={customizationData.progressBarSettings.showTimeRemaining}
                        onChange={(e) => updateProgressBarSettings({ showTimeRemaining: e.target.checked })}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Show time remaining</span>
                    </label>
                  </div>

                  {/* Preview */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-3">Progress Bar Preview</h5>
                    <div className="space-y-3">
                      <div
                        className="w-full rounded-full"
                        style={{
                          backgroundColor: customizationData.progressBarSettings.backgroundColor,
                          height: customizationData.progressBarSettings.height
                        }}
                      >
                        <div
                          className={`h-full rounded-full transition-all ${
                            customizationData.progressBarSettings.animation === 'pulse' ? 'animate-pulse' :
                            customizationData.progressBarSettings.animation === 'glow' ? 'shadow-lg' : ''
                          }`}
                          style={{
                            backgroundColor: customizationData.progressBarSettings.color,
                            width: '65%'
                          }}
                        />
                      </div>
                      {(customizationData.progressBarSettings.showPercentage || customizationData.progressBarSettings.showTimeRemaining) && (
                        <div className="flex justify-between text-sm text-gray-600">
                          {customizationData.progressBarSettings.showPercentage && <span>65% Complete</span>}
                          {customizationData.progressBarSettings.showTimeRemaining && <span>35 minutes remaining</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Preview Panel */}
        {showPreview && (
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl p-6 border sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                <div className="flex items-center gap-2">
                  <Monitor className={`w-4 h-4 ${previewMode === 'desktop' ? 'text-pink-600' : 'text-gray-400'}`} />
                  <Tablet className={`w-4 h-4 ${previewMode === 'tablet' ? 'text-pink-600' : 'text-gray-400'}`} />
                  <Smartphone className={`w-4 h-4 ${previewMode === 'mobile' ? 'text-pink-600' : 'text-gray-400'}`} />
                </div>
              </div>

              <div className={`mx-auto bg-gray-100 rounded-lg overflow-hidden ${getPreviewSize()}`}>
                <div
                  className="h-full p-4"
                  style={{
                    fontFamily: customizationData.fontSettings.family,
                    fontSize: customizationData.fontSettings.size.medium,
                    fontWeight: customizationData.fontSettings.weight,
                    lineHeight: customizationData.fontSettings.lineHeight
                  }}
                >
                  {/* Preview Content */}
                  <div className="bg-white rounded-lg p-4 h-full overflow-y-auto">
                    <div className="mb-4">
                      <h4 className="font-bold mb-2" style={{ fontSize: customizationData.fontSettings.size.large }}>
                        Sample Biology Question
                      </h4>
                      <div
                        className="inline-block px-3 py-1 rounded-full text-sm"
                        style={{
                          backgroundColor: customizationData.difficultyColors.medium.background,
                          color: customizationData.difficultyColors.medium.text,
                          border: `1px solid ${customizationData.difficultyColors.medium.border}`
                        }}
                      >
                        Medium
                      </div>
                    </div>

                    <p className="mb-4">Which of the following is the powerhouse of the cell?</p>

                    <div className="space-y-2 mb-4">
                      {['A) Nucleus', 'B) Mitochondria', 'C) Ribosome', 'D) Golgi Body'].map((option, index) => (
                        <div key={index} className="p-2 border rounded hover:bg-gray-50 cursor-pointer">
                          {option}
                        </div>
                      ))}
                    </div>

                    {/* Progress Bar Preview */}
                    <div className="mb-4">
                      <div
                        className="w-full rounded-full mb-2"
                        style={{
                          backgroundColor: customizationData.progressBarSettings.backgroundColor,
                          height: customizationData.progressBarSettings.height
                        }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: customizationData.progressBarSettings.color,
                            width: '40%'
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500">Question 2 of 5</div>
                    </div>

                    {/* Status Message Preview */}
                    <div
                      className="p-3 rounded-lg border-l-4 bg-blue-50"
                      style={{ borderLeftColor: customizationData.statusMessages.success.color }}
                    >
                      <div className="flex items-center gap-2">
                        <span>{customizationData.statusMessages.success.icon}</span>
                        <span className="font-medium" style={{ color: customizationData.statusMessages.success.color }}>
                          {customizationData.statusMessages.success.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UICustomization