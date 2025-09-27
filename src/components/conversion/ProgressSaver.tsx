'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Save,
  Cloud,
  Check,
  AlertCircle,
  RefreshCw,
  Download,
  Upload,
  Shield,
  Clock,
  Smartphone,
  Monitor,
  Wifi,
  WifiOff,
} from 'lucide-react'

interface ProgressSaverProps {
  data: any
  stepIndex: number
  totalSteps: number
  isOnline?: boolean
  autoSaveInterval?: number
  showCloudSync?: boolean
  showProgressIndicator?: boolean
}

interface SaveState {
  status: 'idle' | 'saving' | 'saved' | 'error' | 'syncing'
  lastSaved: Date | null
  error?: string
  cloudSynced: boolean
  localSize: number
  conflictResolution?: 'local' | 'cloud' | 'merge'
}

const ProgressSaver: React.FC<ProgressSaverProps> = ({
  data,
  stepIndex,
  totalSteps,
  isOnline = true,
  autoSaveInterval = 5000,
  showCloudSync = true,
  showProgressIndicator = true,
}) => {
  const [saveState, setSaveState] = useState<SaveState>({
    status: 'idle',
    lastSaved: null,
    cloudSynced: false,
    localSize: 0,
  })

  const [showSaveNotification, setShowSaveNotification] = useState(false)
  const [showConflictDialog, setShowConflictDialog] = useState(false)
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    deviceName: 'Unknown Device',
  })

  // Detect device information
  useEffect(() => {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
    const deviceName = isMobile ? 'Mobile Device' : 'Desktop'

    setDeviceInfo({ isMobile, deviceName })
  }, [])

  // Auto-save functionality
  useEffect(() => {
    if (!data || Object.keys(data).length === 0) return

    const autoSaveTimer = setTimeout(() => {
      saveProgress('auto')
    }, autoSaveInterval)

    return () => clearTimeout(autoSaveTimer)
  }, [data, autoSaveInterval])

  // Save progress to localStorage and cloud
  const saveProgress = useCallback(
    async (saveType: 'auto' | 'manual' = 'auto') => {
      setSaveState((prev) => ({ ...prev, status: 'saving' }))

      try {
        // Calculate data size
        const dataString = JSON.stringify(data)
        const sizeInBytes = new Blob([dataString]).size
        const sizeInKB = Math.round((sizeInBytes / 1024) * 100) / 100

        // Save to localStorage
        const saveData = {
          data,
          stepIndex,
          totalSteps,
          timestamp: new Date().toISOString(),
          deviceInfo,
          version: '2.0',
          saveType,
          checksum: generateChecksum(dataString),
        }

        localStorage.setItem('course-selector-progress', JSON.stringify(saveData))

        // Simulate cloud save delay
        await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000))

        // Mock cloud sync
        let cloudSynced = false
        if (isOnline && showCloudSync) {
          // Simulate cloud save
          await mockCloudSave(saveData)
          cloudSynced = true
        }

        setSaveState({
          status: 'saved',
          lastSaved: new Date(),
          cloudSynced,
          localSize: sizeInKB,
          error: undefined,
        })

        if (saveType === 'manual') {
          setShowSaveNotification(true)
          setTimeout(() => setShowSaveNotification(false), 3000)
        }

        // Auto-transition back to idle
        setTimeout(() => {
          setSaveState((prev) => ({ ...prev, status: 'idle' }))
        }, 2000)
      } catch (error) {
        setSaveState((prev) => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to save progress',
        }))
      }
    },
    [data, stepIndex, totalSteps, deviceInfo, isOnline, showCloudSync]
  )

  // Load progress from storage
  const loadProgress = useCallback(async () => {
    try {
      const savedData = localStorage.getItem('course-selector-progress')
      if (!savedData) return null

      const parsed = JSON.parse(savedData)

      // Verify checksum
      const dataString = JSON.stringify(parsed.data)
      const currentChecksum = generateChecksum(dataString)

      if (parsed.checksum !== currentChecksum) {
        throw new Error('Data integrity check failed')
      }

      // Check for cloud conflicts
      if (isOnline && showCloudSync) {
        const cloudData = await mockCloudLoad()
        if (cloudData && cloudData.timestamp !== parsed.timestamp) {
          setShowConflictDialog(true)
          return { local: parsed, cloud: cloudData }
        }
      }

      return parsed
    } catch (error) {
      console.error('Failed to load progress:', error)
      return null
    }
  }, [isOnline, showCloudSync])

  // Generate simple checksum for data integrity
  const generateChecksum = (data: string): string => {
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return hash.toString(36)
  }

  // Mock cloud save function
  const mockCloudSave = async (data: any): Promise<void> => {
    // Simulate network delay and potential failure
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    if (Math.random() < 0.1) {
      // 10% chance of failure
      throw new Error('Cloud sync failed - please try again')
    }

    // Mock successful cloud save
    sessionStorage.setItem('mock-cloud-data', JSON.stringify(data))
  }

  // Mock cloud load function
  const mockCloudLoad = async (): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const cloudData = sessionStorage.getItem('mock-cloud-data')
    return cloudData ? JSON.parse(cloudData) : null
  }

  // Manual save trigger
  const handleManualSave = () => {
    saveProgress('manual')
  }

  // Export progress data
  const exportProgress = () => {
    const exportData = {
      courseSelector: data,
      stepIndex,
      totalSteps,
      exportedAt: new Date().toISOString(),
      version: '2.0',
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `course-selector-progress-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Import progress data
  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        if (imported.courseSelector && imported.version) {
          // Validate and restore data
          localStorage.setItem(
            'course-selector-progress',
            JSON.stringify({
              data: imported.courseSelector,
              stepIndex: imported.stepIndex || 0,
              totalSteps: imported.totalSteps || totalSteps,
              timestamp: new Date().toISOString(),
              deviceInfo,
              version: imported.version,
              saveType: 'import',
            })
          )

          setSaveState((prev) => ({
            ...prev,
            status: 'saved',
            lastSaved: new Date(),
          }))

          // Trigger page reload to restore state
          window.location.reload()
        }
      } catch (error) {
        setSaveState((prev) => ({
          ...prev,
          status: 'error',
          error: 'Invalid import file',
        }))
      }
    }
    reader.readAsText(file)
  }

  const getStatusIcon = () => {
    switch (saveState.status) {
      case 'saving':
        return <RefreshCw className="w-4 h-4 animate-spin" />
      case 'saved':
        return <Check className="w-4 h-4 text-green-600" />
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case 'syncing':
        return <Cloud className="w-4 h-4 animate-pulse" />
      default:
        return <Save className="w-4 h-4" />
    }
  }

  const getStatusText = () => {
    switch (saveState.status) {
      case 'saving':
        return 'Saving...'
      case 'saved':
        return 'Saved'
      case 'error':
        return 'Error'
      case 'syncing':
        return 'Syncing...'
      default:
        return 'Save'
    }
  }

  const formatLastSaved = () => {
    if (!saveState.lastSaved) return 'Never'

    const now = new Date()
    const diff = now.getTime() - saveState.lastSaved.getTime()
    const minutes = Math.floor(diff / (1000 * 60))

    if (minutes === 0) return 'Just now'
    if (minutes === 1) return '1 minute ago'
    if (minutes < 60) return `${minutes} minutes ago`

    const hours = Math.floor(minutes / 60)
    if (hours === 1) return '1 hour ago'
    if (hours < 24) return `${hours} hours ago`

    return saveState.lastSaved.toLocaleDateString()
  }

  const progressPercentage = Math.round((stepIndex / (totalSteps - 1)) * 100)

  return (
    <>
      {/* Main Progress Saver Component */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-600" />
            <span className="font-medium text-gray-900">Progress Saved</span>
            {!isOnline && <WifiOff className="w-4 h-4 text-orange-500" />}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualSave}
              disabled={saveState.status === 'saving'}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
            >
              {getStatusIcon()}
              {getStatusText()}
            </button>
          </div>
        </div>

        {showProgressIndicator && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <span>
                Step {stepIndex + 1} of {totalSteps}
              </span>
              <span>{progressPercentage}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-emerald-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Last saved: {formatLastSaved()}</span>
          </div>

          <div className="flex items-center gap-1">
            {deviceInfo.isMobile ? (
              <Smartphone className="w-3 h-3" />
            ) : (
              <Monitor className="w-3 h-3" />
            )}
            <span>{deviceInfo.deviceName}</span>
          </div>

          {showCloudSync && (
            <div className="flex items-center gap-1">
              {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              <span>{saveState.cloudSynced ? 'Cloud synced' : 'Local only'}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Save className="w-3 h-3" />
            <span>{saveState.localSize} KB saved</span>
          </div>
        </div>

        {saveState.error && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            <div className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              <span>{saveState.error}</span>
            </div>
          </div>
        )}

        {/* Advanced Options */}
        <details className="mt-3">
          <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
            Advanced Options
          </summary>
          <div className="mt-2 pt-2 border-t border-gray-100 space-y-2">
            <div className="flex gap-2">
              <button
                onClick={exportProgress}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                <Download className="w-3 h-3" />
                Export
              </button>

              <label className="flex items-center gap-1 px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors cursor-pointer">
                <Upload className="w-3 h-3" />
                Import
                <input type="file" accept=".json" onChange={importProgress} className="hidden" />
              </label>
            </div>

            <div className="text-xs text-gray-500">
              Data is automatically saved every {autoSaveInterval / 1000} seconds and when you
              navigate between steps.
            </div>
          </div>
        </details>
      </div>

      {/* Save Success Notification */}
      <AnimatePresence>
        {showSaveNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span className="font-medium">Progress saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conflict Resolution Dialog */}
      <AnimatePresence>
        {showConflictDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-500" />
                <h3 className="text-lg font-semibold">Sync Conflict Detected</h3>
              </div>

              <p className="text-gray-600 mb-6">
                We found different versions of your progress. Which one would you like to keep?
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSaveState((prev) => ({ ...prev, conflictResolution: 'local' }))
                    setShowConflictDialog(false)
                  }}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium">Keep Local Version</div>
                  <div className="text-sm text-gray-500">
                    Last modified on this device: {formatLastSaved()}
                  </div>
                </button>

                <button
                  onClick={() => {
                    setSaveState((prev) => ({ ...prev, conflictResolution: 'cloud' }))
                    setShowConflictDialog(false)
                  }}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="font-medium">Use Cloud Version</div>
                  <div className="text-sm text-gray-500">Synced from another device</div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProgressSaver
