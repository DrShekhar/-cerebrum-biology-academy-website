'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Pause,
  Play,
  RotateCcw,
  Accessibility,
  ZoomIn,
  ZoomOut,
  Hand,
} from 'lucide-react'
interface AccessibilitySettings {
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  screenReader: boolean
  voiceNavigation: boolean
  largeClickTargets: boolean
  colorBlindFriendly: boolean
  audioDescriptions: boolean
  captions: boolean
  focusIndicators: boolean
}

interface MobileAccessibilityFeaturesProps {
  onSettingsChange?: (settings: AccessibilitySettings) => void
  className?: string
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  screenReader: false,
  voiceNavigation: false,
  largeClickTargets: false,
  colorBlindFriendly: false,
  audioDescriptions: false,
  captions: false,
  focusIndicators: true,
}

export function MobileAccessibilityFeatures({
  onSettingsChange,
  className = '',
}: MobileAccessibilityFeaturesProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS)
  const [showPanel, setShowPanel] = useState(false)
  const [isReading, setIsReading] = useState(false)
  const [currentFocus, setCurrentFocus] = useState<HTMLElement | null>(null)
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility_settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
      } catch (error) {
        console.error('Failed to load accessibility settings:', error)
      }
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis
    }

    // Check for user preferences
    checkUserPreferences()
  }, [])

  // Apply settings when they change
  useEffect(() => {
    applySettings(settings)
    localStorage.setItem('accessibility_settings', JSON.stringify(settings))
    onSettingsChange?.(settings)
  }, [settings, onSettingsChange])

  const checkUserPreferences = () => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings((prev) => ({ ...prev, reducedMotion: true }))
    }

    // Check for high contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setSettings((prev) => ({ ...prev, highContrast: true }))
    }

    // Check for color scheme preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setSettings((prev) => ({ ...prev, highContrast: true }))
    }
  }

  const applySettings = (newSettings: AccessibilitySettings) => {
    const root = document.documentElement

    // Apply font size
    root.style.setProperty('--base-font-size', `${newSettings.fontSize}px`)

    // Apply high contrast
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

    // Apply large click targets
    if (newSettings.largeClickTargets) {
      root.classList.add('large-click-targets')
    } else {
      root.classList.remove('large-click-targets')
    }

    // Apply color blind friendly mode
    if (newSettings.colorBlindFriendly) {
      root.classList.add('color-blind-friendly')
    } else {
      root.classList.remove('color-blind-friendly')
    }

    // Apply enhanced focus indicators
    if (newSettings.focusIndicators) {
      root.classList.add('enhanced-focus')
    } else {
      root.classList.remove('enhanced-focus')
    }
  }

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const readPageContent = () => {
    if (!speechSynthesisRef.current) return

    if (isReading) {
      speechSynthesisRef.current.cancel()
      setIsReading(false)
      return
    }

    // Get main content
    const mainContent = document.querySelector('main') || document.body
    const textContent = extractTextContent(mainContent)

    if (textContent) {
      const utterance = new SpeechSynthesisUtterance(textContent)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onstart = () => setIsReading(true)
      utterance.onend = () => setIsReading(false)
      utterance.onerror = () => setIsReading(false)

      utteranceRef.current = utterance
      speechSynthesisRef.current.speak(utterance)
    }
  }

  const extractTextContent = (element: Element): string => {
    // Extract meaningful text content while ignoring navigation, ads, etc.
    const skipSelectors = ['nav', '.ad', '.advertisement', 'header', 'footer', 'aside']
    const clonedElement = element.cloneNode(true) as Element

    // Remove skipped elements
    skipSelectors.forEach((selector) => {
      const elements = clonedElement.querySelectorAll(selector)
      elements.forEach((el) => el.remove())
    })

    return clonedElement.textContent?.trim() || ''
  }

  const readElement = (element: HTMLElement) => {
    if (!speechSynthesisRef.current || !settings.screenReader) return

    const text =
      element.textContent || element.getAttribute('aria-label') || element.getAttribute('title')
    if (!text) return

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 0.8

    speechSynthesisRef.current.speak(utterance)
  }

  const enhanceFocus = (element: HTMLElement) => {
    setCurrentFocus(element)

    // Add visual focus indicator
    element.style.outline = '3px solid #3b82f6'
    element.style.outlineOffset = '2px'

    // Read content if screen reader is enabled
    if (settings.screenReader) {
      readElement(element)
    }

    // Scroll into view
    element.scrollIntoView({
      behavior: settings.reducedMotion ? 'auto' : 'smooth',
      block: 'center',
    })
  }

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS)
  }

  // Keyboard navigation enhancement
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt + A to open accessibility panel
      if (event.altKey && event.key === 'a') {
        event.preventDefault()
        setShowPanel(!showPanel)
      }

      // Alt + R to start/stop reading
      if (event.altKey && event.key === 'r') {
        event.preventDefault()
        readPageContent()
      }

      // Enhanced tab navigation
      if (event.key === 'Tab' && settings.focusIndicators) {
        setTimeout(() => {
          const focused = document.activeElement as HTMLElement
          if (focused && focused !== document.body) {
            enhanceFocus(focused)
          }
        }, 10)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showPanel, settings.focusIndicators, settings.screenReader])

  return (
    <>
      {/* Accessibility Floating Button */}
      <button
        className={`fixed bottom-20 right-4 z-40 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg md:bottom-6 ${className}`}
        onClick={() => setShowPanel(true)}
        aria-label="Open accessibility options"
        title="Accessibility Options (Alt + A)"
      >
        <Accessibility className="w-6 h-6 mx-auto" />
      </button>

      {/* Accessibility Panel */}
{showPanel && (
          <div
            className="fixed inset-0 z-50 animate-fadeInUp"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowPanel(false)}
            />
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto animate-fadeInUp"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Accessibility className="w-6 h-6 mr-2" />
                    Accessibility Options
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetSettings}
                      className="text-red-600"
                    >
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setShowPanel(false)}>
                      <EyeOff className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button
                    variant={isReading ? 'primary' : 'outline'}
                    onClick={readPageContent}
                    className="flex items-center justify-center h-12"
                  >
                    {isReading ? (
                      <Pause className="w-5 h-5 mr-2" />
                    ) : (
                      <Play className="w-5 h-5 mr-2" />
                    )}
                    {isReading ? 'Stop Reading' : 'Read Page'}
                  </Button>
                  <Button
                    variant={settings.screenReader ? 'primary' : 'outline'}
                    onClick={() => updateSetting('screenReader', !settings.screenReader)}
                    className="flex items-center justify-center h-12"
                  >
                    {settings.screenReader ? (
                      <Volume2 className="w-5 h-5 mr-2" />
                    ) : (
                      <VolumeX className="w-5 h-5 mr-2" />
                    )}
                    Screen Reader
                  </Button>
                </div>

                {/* Font Size Control */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Font Size: {settings.fontSize}px
                  </label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSetting('fontSize', Math.max(12, settings.fontSize - 2))}
                      disabled={settings.fontSize <= 12}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${((settings.fontSize - 12) / (24 - 12)) * 100}%`,
                        }}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSetting('fontSize', Math.min(24, settings.fontSize + 2))}
                      disabled={settings.fontSize >= 24}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Visual Settings */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Visual Settings
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">High Contrast Mode</span>
                      <input
                        type="checkbox"
                        checked={settings.highContrast}
                        onChange={(e) => updateSetting('highContrast', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Color Blind Friendly</span>
                      <input
                        type="checkbox"
                        checked={settings.colorBlindFriendly}
                        onChange={(e) => updateSetting('colorBlindFriendly', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Enhanced Focus Indicators</span>
                      <input
                        type="checkbox"
                        checked={settings.focusIndicators}
                        onChange={(e) => updateSetting('focusIndicators', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* Motor Settings */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Hand className="w-4 h-4 mr-2" />
                    Motor & Interaction
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Large Click Targets</span>
                      <input
                        type="checkbox"
                        checked={settings.largeClickTargets}
                        onChange={(e) => updateSetting('largeClickTargets', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Reduced Motion</span>
                      <input
                        type="checkbox"
                        checked={settings.reducedMotion}
                        onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* Audio Settings */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium text-gray-900 flex items-center">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Audio Settings
                  </h3>

                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Audio Descriptions</span>
                      <input
                        type="checkbox"
                        checked={settings.audioDescriptions}
                        onChange={(e) => updateSetting('audioDescriptions', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Captions</span>
                      <input
                        type="checkbox"
                        checked={settings.captions}
                        onChange={(e) => updateSetting('captions', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>

                    <label className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Voice Navigation</span>
                      <input
                        type="checkbox"
                        checked={settings.voiceNavigation}
                        onChange={(e) => updateSetting('voiceNavigation', e.target.checked)}
                        className="w-5 h-5 text-blue-600 rounded"
                      />
                    </label>
                  </div>
                </div>

                {/* Keyboard Shortcuts */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Keyboard Shortcuts</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div>Alt + A: Open accessibility panel</div>
                    <div>Alt + R: Start/stop reading page</div>
                    <div>Tab: Navigate between elements</div>
                    <div>Enter/Space: Activate buttons</div>
                    <div>Esc: Close modals/panels</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
{/* Skip Links */}
      <div className="sr-only focus:not-sr-only">
        <a
          href="#main-content"
          className="fixed top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[9999] font-medium"
        >
          Skip to main content
        </a>
        <a
          href="#navigation"
          className="fixed top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-[9999] font-medium"
        >
          Skip to navigation
        </a>
      </div>

      {/* Live Region for Screen Reader Announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="accessibility-announcements"
      />
    </>
  )
}

// Hook for using accessibility features
export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility_settings')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('Failed to load accessibility settings:', error)
      }
    }
  }, [])

  const announceToScreenReader = (message: string) => {
    const announcements = document.getElementById('accessibility-announcements')
    if (announcements) {
      announcements.textContent = message
      // Clear after announcement
      setTimeout(() => {
        announcements.textContent = ''
      }, 1000)
    }
  }

  return {
    settings,
    announceToScreenReader,
  }
}
