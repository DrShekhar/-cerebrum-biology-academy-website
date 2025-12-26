'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  UserPreferences,
  type PersonalizationContext,
  CourseRecommendation,
  UserPreferenceManager,
} from '@/lib/personalization/userPreferences'

const PersonalizationContextInstance = createContext<PersonalizationContext | undefined>(undefined)

export function usePersonalization() {
  const context = useContext(PersonalizationContextInstance)
  if (!context) {
    throw new Error('usePersonalization must be used within PersonalizationProvider')
  }
  return context
}

interface PersonalizationProviderProps {
  children: React.ReactNode
}

export function PersonalizationProvider({ children }: PersonalizationProviderProps) {
  const [preferences, setPreferences] = useState<UserPreferences>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize preferences from localStorage
    const stored = UserPreferenceManager.getPreferences()
    setPreferences(stored)

    // Auto-detect user information
    detectUserInfo()

    setIsLoading(false)
  }, [])

  const detectUserInfo = async () => {
    const updates: Partial<UserPreferences> = {}

    // Detect device type
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent
      if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        updates.deviceType = /iPad|Tablet/i.test(userAgent) ? 'tablet' : 'mobile'
      } else {
        updates.deviceType = 'desktop'
      }

      // Detect timezone
      updates.location = {
        ...preferences.location,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }

      // Track visit count
      const visitCount = (preferences.visitCount || 0) + 1
      updates.visitCount = visitCount

      // Track last visit
      updates.lastVisit = new Date().toISOString()

      // Detect referral source
      if (document.referrer) {
        const referrerDomain = new URL(document.referrer).hostname
        if (referrerDomain.includes('google')) {
          updates.referralSource = 'google'
        } else if (referrerDomain.includes('facebook')) {
          updates.referralSource = 'facebook'
        } else if (referrerDomain.includes('youtube')) {
          updates.referralSource = 'youtube'
        } else {
          updates.referralSource = 'referral'
        }
      } else {
        updates.referralSource = 'direct'
      }

      // PERFORMANCE: Skip geolocation on initial load to avoid blocking
      // Geolocation request is deferred and only triggered on user interaction
      // This reduces initial JS execution time by avoiding permission prompts

      updatePreferences(updates)
    }
  }

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    const updated = UserPreferenceManager.updatePreferences(updates)
    setPreferences(updated)

    // Track the preference update
    UserPreferenceManager.trackBehavior('preferences_updated', updates)

    // Send to analytics if enabled
    if (updated.allowAnalytics && typeof window !== 'undefined' && 'gtag' in window) {
      ;(window as any).gtag('event', 'personalization_update', {
        event_category: 'personalization',
        event_label: Object.keys(updates).join(','),
        custom_map: updates,
      })
    }
  }

  const resetPreferences = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cerebrum_user_preferences')
      localStorage.removeItem('cerebrum_user_behavior')
    }
    setPreferences({})
    UserPreferenceManager.trackBehavior('preferences_reset')
  }

  const getRecommendations = (): CourseRecommendation[] => {
    return UserPreferenceManager.generateRecommendations(preferences)
  }

  const getPersonalizedContent = (contentType: string): any => {
    return UserPreferenceManager.getPersonalizedContent(contentType, preferences)
  }

  const trackBehavior = (action: string, data?: any): void => {
    UserPreferenceManager.trackBehavior(action, data)

    // Update behavioral preferences
    const behaviorUpdates: Partial<UserPreferences> = {}

    // Maximum items to keep in arrays to prevent localStorage growth
    const MAX_ARRAY_ITEMS = 50

    // Track page visits
    if (action === 'page_visit') {
      const currentPages = preferences.pagesVisited || []
      if (!currentPages.includes(data?.path)) {
        const updatedPages = [...currentPages, data?.path]
        // Keep only last 50 items
        behaviorUpdates.pagesVisited = updatedPages.slice(-MAX_ARRAY_ITEMS)
      }
    }

    // Track form submissions
    if (action === 'form_submit') {
      const currentForms = preferences.formsSubmitted || []
      const updatedForms = [...currentForms, data?.formType]
      // Keep only last 50 items
      behaviorUpdates.formsSubmitted = updatedForms.slice(-MAX_ARRAY_ITEMS)
    }

    // Track demo bookings
    if (action === 'demo_booking') {
      behaviorUpdates.demosBooked = (preferences.demosBooked || 0) + 1
    }

    // Track call requests
    if (action === 'call_request') {
      behaviorUpdates.callsRequested = (preferences.callsRequested || 0) + 1
    }

    // Track material downloads
    if (action === 'material_download') {
      const currentMaterials = preferences.materialsDownloaded || []
      const updatedMaterials = [...currentMaterials, data?.materialId]
      // Keep only last 50 items
      behaviorUpdates.materialsDownloaded = updatedMaterials.slice(-MAX_ARRAY_ITEMS)
    }

    // Track video watches
    if (action === 'video_watch') {
      const currentVideos = preferences.videosWatched || []
      const updatedVideos = [...currentVideos, data?.videoId]
      // Keep only last 50 items
      behaviorUpdates.videosWatched = updatedVideos.slice(-MAX_ARRAY_ITEMS)
    }

    if (Object.keys(behaviorUpdates).length > 0) {
      updatePreferences(behaviorUpdates)
    }
  }

  const value: PersonalizationContext = {
    preferences,
    updatePreferences,
    resetPreferences,
    getRecommendations,
    getPersonalizedContent,
    trackBehavior,
  }

  return (
    <PersonalizationContextInstance.Provider value={value}>
      {children}
    </PersonalizationContextInstance.Provider>
  )
}

// Personalized content components
export function PersonalizedHeroMessage() {
  const { getPersonalizedContent } = usePersonalization()
  const message = getPersonalizedContent('hero_message')

  return message ? (
    <div className="bg-gray-50 border border-blue-200 rounded-xl p-4 mb-6">
      <p className="text-blue-800 font-medium text-center">{message}</p>
    </div>
  ) : null
}

export function PersonalizedCourseRecommendations() {
  const { getRecommendations, trackBehavior } = usePersonalization()
  const recommendations = getRecommendations()

  if (recommendations.length === 0) return null

  const handleRecommendationClick = (courseId: string) => {
    trackBehavior('recommendation_click', { courseId })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Recommended for You</h3>
      <div className="space-y-4">
        {recommendations.slice(0, 3).map((rec) => (
          <div
            key={rec.courseId}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleRecommendationClick(rec.courseId)}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900">{rec.courseName}</h4>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                {rec.match}% match
              </span>
            </div>
            {rec.customMessage && (
              <p className="text-blue-600 font-medium text-sm mb-2">{rec.customMessage}</p>
            )}
            <div className="flex flex-wrap gap-1 mb-2">
              {rec.reasons.map((reason, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                  {reason}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function UserPreferenceModal() {
  const { preferences, updatePreferences } = usePersonalization()
  const [isOpen, setIsOpen] = useState(false)
  const [localPrefs, setLocalPrefs] = useState(preferences)

  const handleSave = () => {
    updatePreferences(localPrefs)
    setIsOpen(false)
  }

  const handleFieldChange = (field: string, value: any) => {
    setLocalPrefs((prev) => ({ ...prev, [field]: value }))
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        ⚙️
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Personalize Your Experience</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Class</label>
              <select
                value={localPrefs.currentClass || ''}
                onChange={(e) => handleFieldChange('currentClass', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Class</option>
                <option value="11">Class 11th</option>
                <option value="12">Class 12th</option>
                <option value="dropper">Dropper</option>
                <option value="foundation">Foundation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Exam</label>
              <select
                value={localPrefs.targetExam || ''}
                onChange={(e) => handleFieldChange('targetExam', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Exam</option>
                <option value="neet">NEET</option>
                <option value="aiims">AIIMS</option>
                <option value="jipmer">JIPMER</option>
                <option value="state-cet">State CET</option>
                <option value="multiple">Multiple Exams</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Learning Style</label>
              <select
                value={localPrefs.learningStyle || ''}
                onChange={(e) => handleFieldChange('learningStyle', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Style</option>
                <option value="visual">Visual Learner</option>
                <option value="auditory">Auditory Learner</option>
                <option value="kinesthetic">Hands-on Learner</option>
                <option value="reading">Reading/Writing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Mode</label>
              <select
                value={localPrefs.preferredMode || ''}
                onChange={(e) => handleFieldChange('preferredMode', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Mode</option>
                <option value="online">Online Classes</option>
                <option value="offline">Offline Classes</option>
                <option value="hybrid">Hybrid (Both)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
              <select
                value={localPrefs.budgetRange || ''}
                onChange={(e) => handleFieldChange('budgetRange', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Budget</option>
                <option value="budget">Budget-friendly</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
