'use client'

import React, { useState, useEffect, useContext, createContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Type,
  Palette,
  Mouse,
  Keyboard,
  Headphones,
  Languages,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Contrast,
  Focus,
  Timer,
  Brain,
  Heart,
  Lightbulb,
  Users,
  MessageSquare,
  Book,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  HelpCircle,
  Accessibility,
  Hand,
  Navigation,
} from 'lucide-react'

interface AccessibilitySettings {
  // Visual
  highContrast: boolean
  largeText: boolean
  fontSize: number
  colorScheme: 'default' | 'high-contrast' | 'dark' | 'light'
  reducedMotion: boolean
  focusIndicators: boolean
  magnification: number

  // Audio
  audioDescriptions: boolean
  audioSpeed: number
  audioVolume: number
  soundEffects: boolean
  voiceGender: 'male' | 'female' | 'neutral'
  backgroundMusic: boolean

  // Motor/Navigation
  keyboardNavigation: boolean
  stickyKeys: boolean
  mouseDelay: number
  clickHold: boolean
  gestureNavigation: boolean

  // Cognitive
  simplifiedInterface: boolean
  extendedTimeouts: boolean
  distractionReduction: boolean
  memoryAids: boolean
  cognitiveSupport: boolean

  // Language & Communication
  primaryLanguage: 'english' | 'hindi' | 'regional'
  translationSupport: boolean
  signLanguage: boolean
  easyRead: boolean
  pictorialSupport: boolean

  // Learning Support
  dyslexiaSupport: boolean
  adhd_support: boolean
  autismSupport: boolean
  learningDisabilitySupport: boolean
}

interface AccessibilityProfile {
  id: string
  name: string
  description: string
  settings: Partial<AccessibilitySettings>
  targetConditions: string[]
  icon: React.ReactNode
}

interface LearningAccommodation {
  id: string
  title: string
  description: string
  type: 'visual' | 'auditory' | 'motor' | 'cognitive' | 'communication'
  implementation: string
  benefits: string[]
}

// Create Accessibility Context
const AccessibilityContext = createContext<{
  settings: AccessibilitySettings
  updateSettings: (settings: Partial<AccessibilitySettings>) => void
  applyProfile: (profile: AccessibilityProfile) => void
} | null>(null)

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

const AccessibilityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'profiles' | 'settings' | 'support' | 'testing' | 'guide'
  >('profiles')
  const [settings, setSettings] = useState<AccessibilitySettings>({
    // Visual defaults
    highContrast: false,
    largeText: false,
    fontSize: 16,
    colorScheme: 'default',
    reducedMotion: false,
    focusIndicators: true,
    magnification: 1,

    // Audio defaults
    audioDescriptions: false,
    audioSpeed: 1,
    audioVolume: 0.8,
    soundEffects: true,
    voiceGender: 'neutral',
    backgroundMusic: false,

    // Motor/Navigation defaults
    keyboardNavigation: true,
    stickyKeys: false,
    mouseDelay: 0,
    clickHold: false,
    gestureNavigation: true,

    // Cognitive defaults
    simplifiedInterface: false,
    extendedTimeouts: false,
    distractionReduction: false,
    memoryAids: false,
    cognitiveSupport: false,

    // Language & Communication defaults
    primaryLanguage: 'english',
    translationSupport: false,
    signLanguage: false,
    easyRead: false,
    pictorialSupport: false,

    // Learning Support defaults
    dyslexiaSupport: false,
    adhd_support: false,
    autismSupport: false,
    learningDisabilitySupport: false,
  })

  const [activeProfile, setActiveProfile] = useState<string | null>(null)
  const [isScreenReaderActive, setIsScreenReaderActive] = useState(false)
  const [isTestingMode, setIsTestingMode] = useState(false)

  // Predefined accessibility profiles
  const accessibilityProfiles: AccessibilityProfile[] = [
    {
      id: 'visual-impairment',
      name: 'Visual Impairment Support',
      description: 'Enhanced support for users with low vision or blindness',
      icon: <Eye className="w-6 h-6" />,
      targetConditions: ['Low Vision', 'Blindness', 'Color Blindness'],
      settings: {
        highContrast: true,
        largeText: true,
        fontSize: 20,
        audioDescriptions: true,
        keyboardNavigation: true,
        focusIndicators: true,
        soundEffects: true,
        voiceGender: 'neutral',
      },
    },
    {
      id: 'hearing-impairment',
      name: 'Hearing Impairment Support',
      description: 'Visual alternatives for audio content',
      icon: <VolumeX className="w-6 h-6" />,
      targetConditions: ['Deafness', 'Hard of Hearing'],
      settings: {
        signLanguage: true,
        pictorialSupport: true,
        audioDescriptions: false,
        soundEffects: false,
        backgroundMusic: false,
        focusIndicators: true,
        translationSupport: true,
      },
    },
    {
      id: 'motor-impairment',
      name: 'Motor Impairment Support',
      description: 'Alternative navigation and interaction methods',
      icon: <Hand className="w-6 h-6" />,
      targetConditions: ['Limited Mobility', 'Tremor', 'Paralysis'],
      settings: {
        keyboardNavigation: true,
        stickyKeys: true,
        mouseDelay: 500,
        clickHold: true,
        gestureNavigation: false,
        extendedTimeouts: true,
        simplifiedInterface: true,
      },
    },
    {
      id: 'dyslexia',
      name: 'Dyslexia Support',
      description: 'Reading and comprehension assistance',
      icon: <Type className="w-6 h-6" />,
      targetConditions: ['Dyslexia', 'Reading Difficulties'],
      settings: {
        dyslexiaSupport: true,
        fontSize: 18,
        audioDescriptions: true,
        reducedMotion: true,
        simplifiedInterface: true,
        memoryAids: true,
        pictorialSupport: true,
        easyRead: true,
      },
    },
    {
      id: 'adhd',
      name: 'ADHD Support',
      description: 'Focus and attention enhancement',
      icon: <Focus className="w-6 h-6" />,
      targetConditions: ['ADHD', 'Attention Difficulties'],
      settings: {
        adhd_support: true,
        distractionReduction: true,
        simplifiedInterface: true,
        extendedTimeouts: true,
        reducedMotion: true,
        backgroundMusic: false,
        memoryAids: true,
        cognitiveSupport: true,
      },
    },
    {
      id: 'autism',
      name: 'Autism Support',
      description: 'Sensory and communication accommodations',
      icon: <Brain className="w-6 h-6" />,
      targetConditions: ['Autism Spectrum Disorder', 'Sensory Processing'],
      settings: {
        autismSupport: true,
        reducedMotion: true,
        simplifiedInterface: true,
        pictorialSupport: true,
        distractionReduction: true,
        soundEffects: false,
        backgroundMusic: false,
        cognitiveSupport: true,
        memoryAids: true,
      },
    },
    {
      id: 'elderly',
      name: 'Senior-Friendly',
      description: 'Age-appropriate interface adjustments',
      icon: <Heart className="w-6 h-6" />,
      targetConditions: ['Age-Related Changes', 'Technology Comfort'],
      settings: {
        largeText: true,
        fontSize: 18,
        simplifiedInterface: true,
        extendedTimeouts: true,
        mouseDelay: 300,
        highContrast: true,
        reducedMotion: true,
        audioDescriptions: true,
      },
    },
  ]

  // Learning accommodations
  const accommodations: LearningAccommodation[] = [
    {
      id: 'text-to-speech',
      title: 'Text-to-Speech',
      description: 'Converts all text content to spoken audio',
      type: 'auditory',
      implementation: 'Screen reader integration with natural voice synthesis',
      benefits: [
        'Supports visual impairments',
        'Aids reading difficulties',
        'Multisensory learning',
      ],
    },
    {
      id: 'visual-indicators',
      title: 'Enhanced Visual Indicators',
      description: 'High-contrast focus indicators and navigation cues',
      type: 'visual',
      implementation: 'CSS-based focus rings, color coding, and visual feedback',
      benefits: ['Keyboard navigation support', 'Better visual tracking', 'Reduced cognitive load'],
    },
    {
      id: 'simplified-navigation',
      title: 'Simplified Navigation',
      description: 'Streamlined interface with essential elements only',
      type: 'cognitive',
      implementation: 'Adaptive UI that hides secondary features and reduces complexity',
      benefits: ['Reduces distractions', 'Easier decision making', 'Better focus'],
    },
    {
      id: 'memory-aids',
      title: 'Memory Aids',
      description: 'Visual and audio reminders for learning progress',
      type: 'cognitive',
      implementation: 'Progress trackers, bookmarks, and learning path visualization',
      benefits: ['Supports working memory', 'Progress tracking', 'Learning reinforcement'],
    },
    {
      id: 'multi-language',
      title: 'Multi-language Support',
      description: 'Content available in multiple Indian languages',
      type: 'communication',
      implementation: 'Real-time translation with context-aware biology terminology',
      benefits: ['Language accessibility', 'Cultural relevance', 'Broader reach'],
    },
  ]

  useEffect(() => {
    // Check for system preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setSettings((prev) => ({ ...prev, reducedMotion: true }))
    }

    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    if (contrastQuery.matches) {
      setSettings((prev) => ({ ...prev, highContrast: true }))
    }

    // Detect screen reader
    const screenReaderDetected =
      window.navigator.userAgent.includes('NVDA') ||
      window.navigator.userAgent.includes('JAWS') ||
      !!window.speechSynthesis
    setIsScreenReaderActive(screenReaderDetected)

    // Apply settings to document
    applySettingsToDocument(settings)
  }, [])

  useEffect(() => {
    applySettingsToDocument(settings)
  }, [settings])

  const applySettingsToDocument = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement

    // Apply font size
    root.style.setProperty('--base-font-size', `${newSettings.fontSize}px`)

    // Apply color scheme
    if (newSettings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Apply reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Apply magnification
    root.style.setProperty('--magnification', newSettings.magnification.toString())

    // Apply dyslexia-friendly font
    if (newSettings.dyslexiaSupport) {
      root.classList.add('dyslexia-friendly')
    } else {
      root.classList.remove('dyslexia-friendly')
    }

    // Store settings in localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings))
  }

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const applyProfile = (profile: AccessibilityProfile) => {
    setSettings((prev) => ({ ...prev, ...profile.settings }))
    setActiveProfile(profile.id)
  }

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      // Reset to defaults
      highContrast: false,
      largeText: false,
      fontSize: 16,
      colorScheme: 'default',
      reducedMotion: false,
      focusIndicators: true,
      magnification: 1,
      audioDescriptions: false,
      audioSpeed: 1,
      audioVolume: 0.8,
      soundEffects: true,
      voiceGender: 'neutral',
      backgroundMusic: false,
      keyboardNavigation: true,
      stickyKeys: false,
      mouseDelay: 0,
      clickHold: false,
      gestureNavigation: true,
      simplifiedInterface: false,
      extendedTimeouts: false,
      distractionReduction: false,
      memoryAids: false,
      cognitiveSupport: false,
      primaryLanguage: 'english',
      translationSupport: false,
      signLanguage: false,
      easyRead: false,
      pictorialSupport: false,
      dyslexiaSupport: false,
      adhd_support: false,
      autismSupport: false,
      learningDisabilitySupport: false,
    }
    setSettings(defaultSettings)
    setActiveProfile(null)
  }

  const testAccessibilityFeature = (featureId: string) => {
    setIsTestingMode(true)
    // Simulate testing the feature
    setTimeout(() => {
      setIsTestingMode(false)
    }, 3000)
  }

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, applyProfile }}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
              <Accessibility className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Accessibility Hub
            </h1>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Customize your learning experience with comprehensive accessibility features. We support
            diverse learning needs and abilities.
          </p>
        </motion.div>

        {/* Quick Access Toolbar */}
        <div className="bg-white rounded-xl p-4 border">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Quick Access:</span>
              <button
                onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  settings.highContrast ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Contrast className="w-4 h-4" />
                High Contrast
              </button>
              <button
                onClick={() => updateSettings({ fontSize: settings.fontSize === 16 ? 20 : 16 })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  settings.fontSize > 16 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Type className="w-4 h-4" />
                Large Text
              </button>
              <button
                onClick={() => updateSettings({ audioDescriptions: !settings.audioDescriptions })}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  settings.audioDescriptions
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                Audio
              </button>
            </div>
            <button
              onClick={resetSettings}
              className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
            {[
              { id: 'profiles', label: 'Profiles', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'support', label: 'Support', icon: Lightbulb },
              { id: 'testing', label: 'Testing', icon: Target },
              { id: 'guide', label: 'Guide', icon: Book },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === id
                    ? 'bg-white text-indigo-600 shadow-md'
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
          {/* Profiles Tab */}
          {activeTab === 'profiles' && (
            <motion.div
              key="profiles"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Accessibility Profiles</h3>
                <p className="text-gray-600 mb-6">
                  Choose a pre-configured profile that matches your accessibility needs, or
                  customize individual settings below.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {accessibilityProfiles.map((profile) => (
                    <motion.div
                      key={profile.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => applyProfile(profile)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        activeProfile === profile.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`p-2 rounded-lg ${
                            activeProfile === profile.id ? 'bg-indigo-100' : 'bg-gray-100'
                          }`}
                        >
                          {profile.icon}
                        </div>
                        <h4 className="font-semibold text-gray-800">{profile.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{profile.description}</p>
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-gray-700">Supports:</span>
                        {profile.targetConditions.map((condition, index) => (
                          <span
                            key={index}
                            className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded mr-1 mb-1"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Visual Settings */}
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Visual Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">High Contrast Mode</label>
                    <button
                      onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.highContrast ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size: {settings.fontSize}px
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={settings.fontSize}
                      onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Magnification: {settings.magnification}x
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.1"
                      value={settings.magnification}
                      onChange={(e) =>
                        updateSettings({ magnification: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Reduced Motion</label>
                    <button
                      onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.reducedMotion ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Enhanced Focus Indicators
                    </label>
                    <button
                      onClick={() => updateSettings({ focusIndicators: !settings.focusIndicators })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.focusIndicators ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.focusIndicators ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Audio Settings */}
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-green-600" />
                  Audio Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Audio Descriptions</label>
                    <button
                      onClick={() =>
                        updateSettings({ audioDescriptions: !settings.audioDescriptions })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.audioDescriptions ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.audioDescriptions ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Audio Speed: {settings.audioSpeed}x
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={settings.audioSpeed}
                      onChange={(e) => updateSettings({ audioSpeed: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Volume: {Math.round(settings.audioVolume * 100)}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.audioVolume}
                      onChange={(e) => updateSettings({ audioVolume: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Voice Gender
                    </label>
                    <select
                      value={settings.voiceGender}
                      onChange={(e) => updateSettings({ voiceGender: e.target.value as any })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="neutral">Neutral</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Sound Effects</label>
                    <button
                      onClick={() => updateSettings({ soundEffects: !settings.soundEffects })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.soundEffects ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.soundEffects ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Cognitive Settings */}
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Cognitive Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Simplified Interface
                    </label>
                    <button
                      onClick={() =>
                        updateSettings({ simplifiedInterface: !settings.simplifiedInterface })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.simplifiedInterface ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.simplifiedInterface ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Extended Timeouts</label>
                    <button
                      onClick={() =>
                        updateSettings({ extendedTimeouts: !settings.extendedTimeouts })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.extendedTimeouts ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.extendedTimeouts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Distraction Reduction
                    </label>
                    <button
                      onClick={() =>
                        updateSettings({ distractionReduction: !settings.distractionReduction })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.distractionReduction ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.distractionReduction ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Memory Aids</label>
                    <button
                      onClick={() => updateSettings({ memoryAids: !settings.memoryAids })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.memoryAids ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.memoryAids ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Dyslexia Support</label>
                    <button
                      onClick={() => updateSettings({ dyslexiaSupport: !settings.dyslexiaSupport })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.dyslexiaSupport ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.dyslexiaSupport ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">ADHD Support</label>
                    <button
                      onClick={() => updateSettings({ adhd_support: !settings.adhd_support })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.adhd_support ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.adhd_support ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Language & Communication */}
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-orange-600" />
                  Language & Communication
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Language
                    </label>
                    <select
                      value={settings.primaryLanguage}
                      onChange={(e) => updateSettings({ primaryLanguage: e.target.value as any })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="regional">Regional Languages</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Translation Support</label>
                    <button
                      onClick={() =>
                        updateSettings({ translationSupport: !settings.translationSupport })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.translationSupport ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.translationSupport ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Sign Language Support
                    </label>
                    <button
                      onClick={() => updateSettings({ signLanguage: !settings.signLanguage })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.signLanguage ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.signLanguage ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Easy Read Format</label>
                    <button
                      onClick={() => updateSettings({ easyRead: !settings.easyRead })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.easyRead ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.easyRead ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Pictorial Support</label>
                    <button
                      onClick={() =>
                        updateSettings({ pictorialSupport: !settings.pictorialSupport })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.pictorialSupport ? 'bg-indigo-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.pictorialSupport ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <motion.div
              key="support"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Learning Accommodations</h3>
                <div className="grid gap-4">
                  {accommodations.map((accommodation) => (
                    <motion.div
                      key={accommodation.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-800">{accommodation.title}</h4>
                          <p className="text-sm text-gray-600">{accommodation.description}</p>
                        </div>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {accommodation.type}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium text-gray-700">Implementation:</span>
                          <p className="text-sm text-gray-600">{accommodation.implementation}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-700">Benefits:</span>
                          <ul className="text-sm text-gray-600 list-disc list-inside">
                            {accommodation.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Support Resources */}
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Support Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">📞 Accessibility Helpline</h4>
                    <p className="text-sm text-blue-700">
                      Get immediate assistance with accessibility features
                    </p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                      Contact Support
                    </button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">📖 User Guide</h4>
                    <p className="text-sm text-green-700">
                      Comprehensive guide to all accessibility features
                    </p>
                    <button className="mt-2 text-sm text-green-600 hover:text-green-800">
                      Download Guide
                    </button>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-800 mb-2">🎥 Video Tutorials</h4>
                    <p className="text-sm text-purple-700">Step-by-step video instructions</p>
                    <button className="mt-2 text-sm text-purple-600 hover:text-purple-800">
                      Watch Videos
                    </button>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800 mb-2">💬 Community Forum</h4>
                    <p className="text-sm text-orange-700">
                      Connect with other users and share tips
                    </p>
                    <button className="mt-2 text-sm text-orange-600 hover:text-orange-800">
                      Join Forum
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Testing Tab */}
          {activeTab === 'testing' && (
            <motion.div
              key="testing"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4">Accessibility Testing Suite</h3>
                <p className="text-gray-600 mb-6">
                  Test your current accessibility settings and discover areas for improvement.
                </p>

                <div className="grid gap-4">
                  {[
                    {
                      id: 'contrast',
                      name: 'Color Contrast Test',
                      description: 'Check if text is readable with current settings',
                    },
                    {
                      id: 'keyboard',
                      name: 'Keyboard Navigation Test',
                      description: 'Verify all elements are accessible via keyboard',
                    },
                    {
                      id: 'screen-reader',
                      name: 'Screen Reader Test',
                      description: 'Test compatibility with screen reading software',
                    },
                    {
                      id: 'font-size',
                      name: 'Font Size Test',
                      description: 'Ensure text is large enough to read comfortably',
                    },
                    {
                      id: 'motion',
                      name: 'Motion Sensitivity Test',
                      description: 'Check for potentially problematic animations',
                    },
                  ].map((test) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800">{test.name}</h4>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                      <button
                        onClick={() => testAccessibilityFeature(test.id)}
                        disabled={isTestingMode}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                      >
                        {isTestingMode ? 'Testing...' : 'Run Test'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Indicator */}
        {isScreenReaderActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Screen Reader Detected</span>
            </div>
          </motion.div>
        )}
      </div>
    </AccessibilityContext.Provider>
  )
}

export default AccessibilityHub
