'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock,
  Eye,
  Copy,
  MousePointer,
  RotateCcw,
  Camera,
  Video,
  Search,
  Timer,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Monitor,
  Fingerprint,
  Activity,
  Bell,
  Play,
  Pause,
  Square,
  Download,
  Upload,
  Trash2,
  Edit3,
  Plus,
  Zap,
  Target,
  Brain
} from 'lucide-react'

// Types and Interfaces
interface BrowserLockdownSettings {
  enabled: boolean
  fullScreenMode: boolean
  disableDevTools: boolean
  disableExtensions: boolean
  blockNewTabs: boolean
  preventNavigation: boolean
  disableShortcuts: boolean
  kioskMode: boolean
  customBlockList: string[]
}

interface CopyPasteSettings {
  enabled: boolean
  disableCopy: boolean
  disablePaste: boolean
  disableCut: boolean
  disableSelect: boolean
  allowTextInput: boolean
  detectClipboardAccess: boolean
  logViolations: boolean
}

interface RightClickSettings {
  enabled: boolean
  disableContextMenu: boolean
  disableInspectElement: boolean
  disableViewSource: boolean
  disablePrintScreen: boolean
  customMessage: string
  showWarning: boolean
  logAttempts: boolean
}

interface TabSwitchSettings {
  enabled: boolean
  detectFocusLoss: boolean
  detectVisibilityChange: boolean
  warningThreshold: number
  autoSubmitOnViolation: boolean
  allowedSwitches: number
  gracePeriod: number
  notificationSound: boolean
}

interface WebcamSettings {
  enabled: boolean
  recordingEnabled: boolean
  facialRecognition: boolean
  multiplePersonDetection: boolean
  eyeTrackingEnabled: boolean
  attentionTracking: boolean
  captureInterval: number
  storageLocation: 'local' | 'cloud'
  encryptionEnabled: boolean
  autoAnalysis: boolean
}

interface ScreenRecordingSettings {
  enabled: boolean
  fullScreenRecording: boolean
  applicationSpecific: boolean
  audioRecording: boolean
  compressionLevel: 'low' | 'medium' | 'high'
  resolution: '720p' | '1080p' | '4K'
  frameRate: 15 | 30 | 60
  storageLimit: number
  automaticUpload: boolean
}

interface PlagiarismSettings {
  enabled: boolean
  realTimeChecking: boolean
  similarityThreshold: number
  databaseSources: string[]
  aiDetection: boolean
  patternAnalysis: boolean
  behaviorAnalysis: boolean
  generateReport: boolean
  flagSuspiciousActivity: boolean
}

interface TimeTrackingSettings {
  enabled: boolean
  perQuestionTiming: boolean
  idleTimeDetection: boolean
  speedAnalysis: boolean
  pauseDetection: boolean
  timeWarnings: boolean
  adaptiveTimeouts: boolean
  detailedReporting: boolean
  behaviorProfiling: boolean
}

interface SecurityConfiguration {
  browserLockdown: BrowserLockdownSettings
  copyPaste: CopyPasteSettings
  rightClick: RightClickSettings
  tabSwitch: TabSwitchSettings
  webcam: WebcamSettings
  screenRecording: ScreenRecordingSettings
  plagiarism: PlagiarismSettings
  timeTracking: TimeTrackingSettings
}

interface SecurityEvent {
  id: string
  type: 'browser' | 'copy_paste' | 'right_click' | 'tab_switch' | 'webcam' | 'screen' | 'plagiarism' | 'time'
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  timestamp: string
  studentId?: string
  evidence?: string
  action: string
}

const SecurityFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'browser' | 'copy' | 'rightclick' | 'tabswitch' | 'webcam' | 'screen' | 'plagiarism' | 'tracking'>('browser')
  const [configuration, setConfiguration] = useState<SecurityConfiguration>({
    browserLockdown: {
      enabled: false,
      fullScreenMode: true,
      disableDevTools: true,
      disableExtensions: true,
      blockNewTabs: true,
      preventNavigation: true,
      disableShortcuts: true,
      kioskMode: false,
      customBlockList: []
    },
    copyPaste: {
      enabled: false,
      disableCopy: true,
      disablePaste: true,
      disableCut: true,
      disableSelect: false,
      allowTextInput: true,
      detectClipboardAccess: true,
      logViolations: true
    },
    rightClick: {
      enabled: false,
      disableContextMenu: true,
      disableInspectElement: true,
      disableViewSource: true,
      disablePrintScreen: true,
      customMessage: 'Right-click is disabled during the test',
      showWarning: true,
      logAttempts: true
    },
    tabSwitch: {
      enabled: false,
      detectFocusLoss: true,
      detectVisibilityChange: true,
      warningThreshold: 3,
      autoSubmitOnViolation: false,
      allowedSwitches: 2,
      gracePeriod: 5,
      notificationSound: true
    },
    webcam: {
      enabled: false,
      recordingEnabled: false,
      facialRecognition: false,
      multiplePersonDetection: true,
      eyeTrackingEnabled: false,
      attentionTracking: true,
      captureInterval: 30,
      storageLocation: 'cloud',
      encryptionEnabled: true,
      autoAnalysis: false
    },
    screenRecording: {
      enabled: false,
      fullScreenRecording: true,
      applicationSpecific: false,
      audioRecording: false,
      compressionLevel: 'medium',
      resolution: '1080p',
      frameRate: 30,
      storageLimit: 1000,
      automaticUpload: true
    },
    plagiarism: {
      enabled: false,
      realTimeChecking: true,
      similarityThreshold: 80,
      databaseSources: ['internet', 'academic_papers', 'previous_submissions'],
      aiDetection: true,
      patternAnalysis: true,
      behaviorAnalysis: true,
      generateReport: true,
      flagSuspiciousActivity: true
    },
    timeTracking: {
      enabled: true,
      perQuestionTiming: true,
      idleTimeDetection: true,
      speedAnalysis: true,
      pauseDetection: true,
      timeWarnings: true,
      adaptiveTimeouts: false,
      detailedReporting: true,
      behaviorProfiling: false
    }
  })

  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [systemStatus, setSystemStatus] = useState<'ready' | 'active' | 'warning' | 'error'>('ready')

  // Simulate security events for demonstration
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        // Simulate random security events
        const eventTypes = ['browser', 'copy_paste', 'right_click', 'tab_switch', 'webcam', 'screen', 'plagiarism', 'time']
        const severities = ['low', 'medium', 'high', 'critical']
        const randomEvent: SecurityEvent = {
          id: `event_${Date.now()}`,
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)] as any,
          severity: severities[Math.floor(Math.random() * severities.length)] as any,
          description: 'Simulated security event for demonstration',
          timestamp: new Date().toISOString(),
          studentId: 'student_123',
          action: 'logged'
        }

        setSecurityEvents(prev => [randomEvent, ...prev.slice(0, 19)]) // Keep last 20 events
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isMonitoring])

  // Event Handlers
  const startMonitoring = () => {
    setIsMonitoring(true)
    setSystemStatus('active')
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    setSystemStatus('ready')
  }

  const clearEvents = () => {
    setSecurityEvents([])
  }

  const exportConfiguration = () => {
    const dataStr = JSON.stringify(configuration, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `security-config-${Date.now()}.json`
    link.click()
  }

  const getActiveSecurityFeatures = (): number => {
    return Object.values(configuration).filter(config => config.enabled).length
  }

  const getSecurityScore = (): number => {
    const activeFeatures = getActiveSecurityFeatures()
    return Math.round((activeFeatures / 8) * 100)
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
          <div className="p-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Security Features
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Advanced security monitoring and proctoring features for test integrity,
          including browser lockdown, copy-paste detection, webcam monitoring, and plagiarism checking
        </p>
      </div>

      {/* Security Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              systemStatus === 'active' ? 'bg-green-100' :
              systemStatus === 'warning' ? 'bg-yellow-100' :
              systemStatus === 'error' ? 'bg-red-100' : 'bg-gray-100'
            }`}>
              <Activity className={`w-5 h-5 ${
                systemStatus === 'active' ? 'text-green-600' :
                systemStatus === 'warning' ? 'text-yellow-600' :
                systemStatus === 'error' ? 'text-red-600' : 'text-gray-600'
              }`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">System Status</p>
              <p className="font-semibold capitalize">{systemStatus}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Security Score</p>
              <p className="font-semibold">{getSecurityScore()}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Features</p>
              <p className="font-semibold">{getActiveSecurityFeatures()}/8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Bell className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Events Today</p>
              <p className="font-semibold">{securityEvents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monitoring Controls */}
      <div className="flex justify-between items-center bg-white rounded-xl p-4 border">
        <div className="flex items-center gap-4">
          <button
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isMonitoring
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isMonitoring ? (
              <>
                <Square className="w-4 h-4" />
                Stop Monitoring
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Monitoring
              </>
            )}
          </button>

          <button
            onClick={clearEvents}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Events
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isMonitoring ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
          }`}>
            {isMonitoring ? '● Monitoring Active' : '○ Monitoring Inactive'}
          </span>

          <button
            onClick={exportConfiguration}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Config
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'browser', label: 'Browser', icon: Lock },
            { id: 'copy', label: 'Copy/Paste', icon: Copy },
            { id: 'rightclick', label: 'Right Click', icon: MousePointer },
            { id: 'tabswitch', label: 'Tab Switch', icon: RotateCcw },
            { id: 'webcam', label: 'Webcam', icon: Camera },
            { id: 'screen', label: 'Screen Rec', icon: Video },
            { id: 'plagiarism', label: 'Plagiarism', icon: Search },
            { id: 'tracking', label: 'Time Track', icon: Timer }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-red-600 shadow-md'
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
        {/* Browser Lockdown */}
        {activeTab === 'browser' && (
          <motion.div
            key="browser"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Browser Lockdown Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Browser Lockdown
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Browser Lockdown</label>
                    <p className="text-xs text-gray-500">Restrict browser functionality during test</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      browserLockdown: { ...prev.browserLockdown, enabled: !prev.browserLockdown.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.browserLockdown.enabled ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.browserLockdown.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.browserLockdown.enabled && (
                  <div className="space-y-3">
                    {[
                      { key: 'fullScreenMode', label: 'Full Screen Mode', desc: 'Force full screen during test' },
                      { key: 'disableDevTools', label: 'Disable Dev Tools', desc: 'Block F12 and developer tools' },
                      { key: 'disableExtensions', label: 'Disable Extensions', desc: 'Block browser extensions' },
                      { key: 'blockNewTabs', label: 'Block New Tabs', desc: 'Prevent opening new tabs' },
                      { key: 'preventNavigation', label: 'Prevent Navigation', desc: 'Block back/forward buttons' },
                      { key: 'disableShortcuts', label: 'Disable Shortcuts', desc: 'Block keyboard shortcuts' },
                      { key: 'kioskMode', label: 'Kiosk Mode', desc: 'Run in secure kiosk mode' }
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700">{label}</span>
                          <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            browserLockdown: { ...prev.browserLockdown, [key]: !prev.browserLockdown[key as keyof BrowserLockdownSettings] }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.browserLockdown[key as keyof BrowserLockdownSettings] ? 'bg-red-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.browserLockdown[key as keyof BrowserLockdownSettings] ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Security Impact */}
            {configuration.browserLockdown.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Security Impact
                </h3>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Enhanced Security</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Prevents access to external resources</li>
                      <li>• Blocks unauthorized tool usage</li>
                      <li>• Maintains test environment integrity</li>
                      <li>• Reduces cheating opportunities</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">User Experience</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• May require user permission for full screen</li>
                      <li>• Some features may affect accessibility</li>
                      <li>• Consider providing instructions to students</li>
                      <li>• Test on different browsers before deployment</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Technical Requirements</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Modern browser with JavaScript enabled</li>
                      <li>• Screen resolution minimum 1024x768</li>
                      <li>• Stable internet connection required</li>
                      <li>• Administrator privileges may be needed</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Copy/Paste Protection */}
        {activeTab === 'copy' && (
          <motion.div
            key="copy"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Copy/Paste Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Copy className="w-5 h-5 text-blue-600" />
                Copy/Paste Protection
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Copy/Paste Protection</label>
                    <p className="text-xs text-gray-500">Prevent copying and pasting content</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      copyPaste: { ...prev.copyPaste, enabled: !prev.copyPaste.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.copyPaste.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.copyPaste.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.copyPaste.enabled && (
                  <div className="space-y-3">
                    {[
                      { key: 'disableCopy', label: 'Disable Copy (Ctrl+C)', desc: 'Prevent copying text' },
                      { key: 'disablePaste', label: 'Disable Paste (Ctrl+V)', desc: 'Prevent pasting content' },
                      { key: 'disableCut', label: 'Disable Cut (Ctrl+X)', desc: 'Prevent cutting text' },
                      { key: 'disableSelect', label: 'Disable Text Selection', desc: 'Prevent text selection' },
                      { key: 'allowTextInput', label: 'Allow Text Input', desc: 'Allow typing in answer fields' },
                      { key: 'detectClipboardAccess', label: 'Detect Clipboard Access', desc: 'Monitor clipboard usage' },
                      { key: 'logViolations', label: 'Log Violations', desc: 'Record copy/paste attempts' }
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700">{label}</span>
                          <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            copyPaste: { ...prev.copyPaste, [key]: !prev.copyPaste[key as keyof CopyPasteSettings] }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.copyPaste[key as keyof CopyPasteSettings] ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.copyPaste[key as keyof CopyPasteSettings] ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Violation Detection */}
            {configuration.copyPaste.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  Violation Monitoring
                </h3>

                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-3">Detection Methods</h4>
                    <div className="space-y-2 text-sm text-yellow-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Keyboard shortcut monitoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Context menu interception</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Clipboard API monitoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selection event tracking</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-3">Violation Actions</h4>
                    <div className="space-y-2 text-sm text-red-700">
                      <div>• Warning notifications to student</div>
                      <div>• Automatic logging with timestamp</div>
                      <div>• Screenshot capture (if enabled)</div>
                      <div>• Potential auto-submission after threshold</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Today's Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Copy attempts:</span>
                        <span className="font-medium ml-2">0</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Paste attempts:</span>
                        <span className="font-medium ml-2">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Right Click Protection */}
        {activeTab === 'rightclick' && (
          <motion.div
            key="rightclick"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Right Click Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MousePointer className="w-5 h-5 text-purple-600" />
                Right Click Protection
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Right Click Protection</label>
                    <p className="text-xs text-gray-500">Disable context menu and inspect tools</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      rightClick: { ...prev.rightClick, enabled: !prev.rightClick.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.rightClick.enabled ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.rightClick.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.rightClick.enabled && (
                  <>
                    <div className="space-y-3">
                      {[
                        { key: 'disableContextMenu', label: 'Disable Context Menu', desc: 'Block right-click menu' },
                        { key: 'disableInspectElement', label: 'Disable Inspect Element', desc: 'Block element inspection' },
                        { key: 'disableViewSource', label: 'Disable View Source', desc: 'Block source code viewing' },
                        { key: 'disablePrintScreen', label: 'Disable Print Screen', desc: 'Block screenshot shortcuts' },
                        { key: 'showWarning', label: 'Show Warning Message', desc: 'Display warning on attempts' },
                        { key: 'logAttempts', label: 'Log Attempts', desc: 'Record right-click attempts' }
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-700">{label}</span>
                            <p className="text-xs text-gray-500">{desc}</p>
                          </div>
                          <button
                            onClick={() => setConfiguration(prev => ({
                              ...prev,
                              rightClick: { ...prev.rightClick, [key]: !prev.rightClick[key as keyof RightClickSettings] }
                            }))}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              configuration.rightClick[key as keyof RightClickSettings] ? 'bg-purple-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                configuration.rightClick[key as keyof RightClickSettings] ? 'translate-x-5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Warning Message
                      </label>
                      <textarea
                        value={configuration.rightClick.customMessage}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          rightClick: { ...prev.rightClick, customMessage: e.target.value }
                        }))}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter message to show when right-click is attempted"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Warning Preview */}
            {configuration.rightClick.enabled && configuration.rightClick.showWarning && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-orange-600" />
                  Warning Preview
                </h3>

                <div className="space-y-4">
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                      <h4 className="text-lg font-semibold text-red-800">Access Restricted</h4>
                    </div>
                    <p className="text-red-700 mb-4">
                      {configuration.rightClick.customMessage || 'Right-click is disabled during the test'}
                    </p>
                    <div className="flex gap-2">
                      <button className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700">
                        OK
                      </button>
                      <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-400">
                        Report Issue
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Protection Coverage</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>✓ Context menu blocking</li>
                      <li>✓ Developer tools prevention</li>
                      <li>✓ Source code protection</li>
                      <li>✓ Screenshot prevention</li>
                      <li>✓ Image saving protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Tab Switch Detection */}
        {activeTab === 'tabswitch' && (
          <motion.div
            key="tabswitch"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Tab Switch Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-green-600" />
                Tab Switch Detection
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Tab Switch Detection</label>
                    <p className="text-xs text-gray-500">Monitor when student leaves test tab</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      tabSwitch: { ...prev.tabSwitch, enabled: !prev.tabSwitch.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.tabSwitch.enabled ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.tabSwitch.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.tabSwitch.enabled && (
                  <>
                    <div className="space-y-3">
                      {[
                        { key: 'detectFocusLoss', label: 'Detect Focus Loss', desc: 'Monitor window focus changes' },
                        { key: 'detectVisibilityChange', label: 'Detect Visibility Change', desc: 'Monitor tab visibility' },
                        { key: 'autoSubmitOnViolation', label: 'Auto Submit on Violation', desc: 'Submit test after threshold' },
                        { key: 'notificationSound', label: 'Warning Sound', desc: 'Play sound on tab switch' }
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-700">{label}</span>
                            <p className="text-xs text-gray-500">{desc}</p>
                          </div>
                          <button
                            onClick={() => setConfiguration(prev => ({
                              ...prev,
                              tabSwitch: { ...prev.tabSwitch, [key]: !prev.tabSwitch[key as keyof TabSwitchSettings] }
                            }))}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              configuration.tabSwitch[key as keyof TabSwitchSettings] ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                configuration.tabSwitch[key as keyof TabSwitchSettings] ? 'translate-x-5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Warning Threshold
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={configuration.tabSwitch.warningThreshold}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            tabSwitch: { ...prev.tabSwitch, warningThreshold: parseInt(e.target.value) || 1 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Allowed Switches
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={configuration.tabSwitch.allowedSwitches}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            tabSwitch: { ...prev.tabSwitch, allowedSwitches: parseInt(e.target.value) || 0 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grace Period (seconds)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value={configuration.tabSwitch.gracePeriod}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          tabSwitch: { ...prev.tabSwitch, gracePeriod: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Switch Monitoring */}
            {configuration.tabSwitch.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-600" />
                  Switch Monitoring
                </h3>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-3">Detection Policy</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• Warnings after {configuration.tabSwitch.warningThreshold} violations</div>
                      <div>• Allowed switches: {configuration.tabSwitch.allowedSwitches}</div>
                      <div>• Grace period: {configuration.tabSwitch.gracePeriod} seconds</div>
                      <div>• Auto submit: {configuration.tabSwitch.autoSubmitOnViolation ? 'Enabled' : 'Disabled'}</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">Current Session</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white rounded p-3 border">
                        <div className="text-2xl font-bold text-green-600">0</div>
                        <div className="text-gray-600">Tab Switches</div>
                      </div>
                      <div className="bg-white rounded p-3 border">
                        <div className="text-2xl font-bold text-yellow-600">0</div>
                        <div className="text-gray-600">Warnings</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">Important Notes</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• System notifications may trigger false positives</li>
                      <li>• Network interruptions are automatically excluded</li>
                      <li>• Emergency contacts can override restrictions</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Webcam Proctoring */}
        {activeTab === 'webcam' && (
          <motion.div
            key="webcam"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Webcam Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-indigo-600" />
                Webcam Proctoring
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Webcam Proctoring</label>
                    <p className="text-xs text-gray-500">Monitor student via webcam</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      webcam: { ...prev.webcam, enabled: !prev.webcam.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.webcam.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.webcam.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.webcam.enabled && (
                  <>
                    <div className="space-y-3">
                      {[
                        { key: 'recordingEnabled', label: 'Video Recording', desc: 'Record entire session' },
                        { key: 'facialRecognition', label: 'Facial Recognition', desc: 'Verify student identity' },
                        { key: 'multiplePersonDetection', label: 'Multiple Person Detection', desc: 'Detect additional people' },
                        { key: 'eyeTrackingEnabled', label: 'Eye Tracking', desc: 'Monitor eye movement' },
                        { key: 'attentionTracking', label: 'Attention Tracking', desc: 'Monitor focus levels' },
                        { key: 'encryptionEnabled', label: 'Encryption', desc: 'Encrypt recorded data' },
                        { key: 'autoAnalysis', label: 'Auto Analysis', desc: 'AI-powered behavior analysis' }
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-700">{label}</span>
                            <p className="text-xs text-gray-500">{desc}</p>
                          </div>
                          <button
                            onClick={() => setConfiguration(prev => ({
                              ...prev,
                              webcam: { ...prev.webcam, [key]: !prev.webcam[key as keyof WebcamSettings] }
                            }))}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              configuration.webcam[key as keyof WebcamSettings] ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                configuration.webcam[key as keyof WebcamSettings] ? 'translate-x-5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Capture Interval (seconds)
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="300"
                          value={configuration.webcam.captureInterval}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            webcam: { ...prev.webcam, captureInterval: parseInt(e.target.value) || 30 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Storage Location
                        </label>
                        <select
                          value={configuration.webcam.storageLocation}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            webcam: { ...prev.webcam, storageLocation: e.target.value as 'local' | 'cloud' }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="local">Local Storage</option>
                          <option value="cloud">Cloud Storage</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Privacy & Compliance */}
            {configuration.webcam.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Privacy & Compliance
                </h3>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Privacy Protection</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Data encrypted at rest and in transit</li>
                      <li>• Automatic deletion after retention period</li>
                      <li>• GDPR and CCPA compliant</li>
                      <li>• Student consent required</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Technical Requirements</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Webcam with minimum 720p resolution</li>
                      <li>• Adequate lighting conditions</li>
                      <li>• Stable internet connection (2+ Mbps)</li>
                      <li>• Modern browser with camera permissions</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">Student Guidelines</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Face must be clearly visible throughout test</li>
                      <li>• No other persons in the room</li>
                      <li>• Good lighting and stable positioning</li>
                      <li>• Avoid covering camera or moving excessively</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Session Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Frames captured:</span>
                        <span className="font-medium ml-2">0</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Anomalies detected:</span>
                        <span className="font-medium ml-2">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Screen Recording */}
        {activeTab === 'screen' && (
          <motion.div
            key="screen"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Screen Recording Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-indigo-600" />
                Screen Recording
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Screen Recording</label>
                    <p className="text-xs text-gray-500">Record student's screen activity</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      screenRecording: { ...prev.screenRecording, enabled: !prev.screenRecording.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.screenRecording.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.screenRecording.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.screenRecording.enabled && (
                  <>
                    <div className="space-y-3">
                      {[
                        { key: 'fullScreenRecording', label: 'Full Screen Recording', desc: 'Record entire screen' },
                        { key: 'applicationSpecific', label: 'Application Specific', desc: 'Record only test application' },
                        { key: 'audioRecording', label: 'Audio Recording', desc: 'Include microphone audio' },
                        { key: 'automaticUpload', label: 'Automatic Upload', desc: 'Upload recordings automatically' }
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-700">{label}</span>
                            <p className="text-xs text-gray-500">{desc}</p>
                          </div>
                          <button
                            onClick={() => setConfiguration(prev => ({
                              ...prev,
                              screenRecording: { ...prev.screenRecording, [key]: !prev.screenRecording[key as keyof ScreenRecordingSettings] }
                            }))}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              configuration.screenRecording[key as keyof ScreenRecordingSettings] ? 'bg-indigo-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                configuration.screenRecording[key as keyof ScreenRecordingSettings] ? 'translate-x-5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Compression Level
                        </label>
                        <select
                          value={configuration.screenRecording.compressionLevel}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            screenRecording: { ...prev.screenRecording, compressionLevel: e.target.value as 'low' | 'medium' | 'high' }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="low">Low (Better Quality)</option>
                          <option value="medium">Medium (Balanced)</option>
                          <option value="high">High (Smaller Files)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resolution
                        </label>
                        <select
                          value={configuration.screenRecording.resolution}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            screenRecording: { ...prev.screenRecording, resolution: e.target.value as '720p' | '1080p' | '4K' }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="720p">720p (Standard)</option>
                          <option value="1080p">1080p (HD)</option>
                          <option value="4K">4K (Ultra HD)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Frame Rate (FPS)
                        </label>
                        <select
                          value={configuration.screenRecording.frameRate}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            screenRecording: { ...prev.screenRecording, frameRate: parseInt(e.target.value) as 15 | 30 | 60 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="15">15 FPS (Low)</option>
                          <option value="30">30 FPS (Standard)</option>
                          <option value="60">60 FPS (Smooth)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Storage Limit (MB)
                        </label>
                        <input
                          type="number"
                          min="100"
                          max="10000"
                          value={configuration.screenRecording.storageLimit}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            screenRecording: { ...prev.screenRecording, storageLimit: parseInt(e.target.value) || 1000 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Recording Analysis */}
            {configuration.screenRecording.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  Recording Analysis
                </h3>

                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 mb-2">AI Analysis Features</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Application usage monitoring</li>
                      <li>• Suspicious activity detection</li>
                      <li>• Tab switching behavior analysis</li>
                      <li>• Time spent on different sections</li>
                      <li>• Copy-paste activity tracking</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">Recording Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resolution:</span>
                        <span className="font-medium">{configuration.screenRecording.resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Frame Rate:</span>
                        <span className="font-medium">{configuration.screenRecording.frameRate} FPS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compression:</span>
                        <span className="font-medium capitalize">{configuration.screenRecording.compressionLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Storage Limit:</span>
                        <span className="font-medium">{configuration.screenRecording.storageLimit} MB</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Storage Information</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Estimated file size: ~{Math.round(configuration.screenRecording.storageLimit * 0.7)} MB per hour</div>
                      <div>• Retention period: 90 days (configurable)</div>
                      <div>• Encryption: AES-256 standard</div>
                      <div>• Backup: Automatic cloud backup enabled</div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2">Important Notes</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Requires screen sharing permission</li>
                      <li>• May impact system performance</li>
                      <li>• Student consent required by law</li>
                      <li>• Review local privacy regulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Plagiarism Check */}
        {activeTab === 'plagiarism' && (
          <motion.div
            key="plagiarism"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Plagiarism Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-green-600" />
                Plagiarism Detection
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Plagiarism Detection</label>
                    <p className="text-xs text-gray-500">Check for copied content and AI usage</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      plagiarism: { ...prev.plagiarism, enabled: !prev.plagiarism.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.plagiarism.enabled ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.plagiarism.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.plagiarism.enabled && (
                  <>
                    <div className="space-y-3">
                      {[
                        { key: 'realTimeChecking', label: 'Real-time Checking', desc: 'Check content as student types' },
                        { key: 'aiDetection', label: 'AI Content Detection', desc: 'Detect AI-generated text' },
                        { key: 'patternAnalysis', label: 'Pattern Analysis', desc: 'Analyze writing patterns' },
                        { key: 'behaviorAnalysis', label: 'Behavior Analysis', desc: 'Monitor typing behavior' },
                        { key: 'generateReport', label: 'Generate Reports', desc: 'Create detailed plagiarism reports' },
                        { key: 'flagSuspiciousActivity', label: 'Flag Suspicious Activity', desc: 'Auto-flag potential violations' }
                      ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-700">{label}</span>
                            <p className="text-xs text-gray-500">{desc}</p>
                          </div>
                          <button
                            onClick={() => setConfiguration(prev => ({
                              ...prev,
                              plagiarism: { ...prev.plagiarism, [key]: !prev.plagiarism[key as keyof PlagiarismSettings] }
                            }))}
                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                              configuration.plagiarism[key as keyof PlagiarismSettings] ? 'bg-green-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                                configuration.plagiarism[key as keyof PlagiarismSettings] ? 'translate-x-5' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Similarity Threshold (%)
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={configuration.plagiarism.similarityThreshold}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          plagiarism: { ...prev.plagiarism, similarityThreshold: parseInt(e.target.value) }
                        }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>10%</span>
                        <span className="font-medium">{configuration.plagiarism.similarityThreshold}%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Database Sources
                      </label>
                      <div className="space-y-2">
                        {['internet', 'academic_papers', 'previous_submissions', 'textbooks', 'journals'].map(source => (
                          <label key={source} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={configuration.plagiarism.databaseSources.includes(source)}
                              onChange={(e) => {
                                const sources = configuration.plagiarism.databaseSources
                                if (e.target.checked) {
                                  setConfiguration(prev => ({
                                    ...prev,
                                    plagiarism: {
                                      ...prev.plagiarism,
                                      databaseSources: [...sources, source]
                                    }
                                  }))
                                } else {
                                  setConfiguration(prev => ({
                                    ...prev,
                                    plagiarism: {
                                      ...prev.plagiarism,
                                      databaseSources: sources.filter(s => s !== source)
                                    }
                                  }))
                                }
                              }}
                              className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                            />
                            <span className="text-sm text-gray-700 capitalize">{source.replace('_', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Detection Results */}
            {configuration.plagiarism.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-blue-600" />
                  Detection Analysis
                </h3>

                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-700 mb-2">Detection Methods</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>✓ Text similarity analysis</li>
                      <li>✓ Semantic content matching</li>
                      <li>✓ AI-generated text patterns</li>
                      <li>✓ Typing behavior analysis</li>
                      <li>✓ Cross-reference database checking</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3">Current Thresholds</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Similarity threshold:</span>
                        <span className="font-medium">{configuration.plagiarism.similarityThreshold}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active databases:</span>
                        <span className="font-medium">{configuration.plagiarism.databaseSources.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Real-time checking:</span>
                        <span className="font-medium">{configuration.plagiarism.realTimeChecking ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Session Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white rounded p-3 border">
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <div className="text-gray-600">Checks Performed</div>
                      </div>
                      <div className="bg-white rounded p-3 border">
                        <div className="text-2xl font-bold text-red-600">0</div>
                        <div className="text-gray-600">Violations Found</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium text-yellow-800 mb-2">AI Detection</h4>
                    <div className="text-sm text-yellow-700 space-y-1">
                      <div>• GPT-style writing pattern detection</div>
                      <div>• Unusual vocabulary consistency analysis</div>
                      <div>• Sentence structure pattern recognition</div>
                      <div>• Response time correlation analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Time Tracking */}
        {activeTab === 'tracking' && (
          <motion.div
            key="tracking"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Time Tracking Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Timer className="w-5 h-5 text-blue-600" />
                Time Tracking
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Time Tracking</label>
                    <p className="text-xs text-gray-500">Monitor detailed time usage patterns</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      timeTracking: { ...prev.timeTracking, enabled: !prev.timeTracking.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.timeTracking.enabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.timeTracking.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.timeTracking.enabled && (
                  <div className="space-y-3">
                    {[
                      { key: 'perQuestionTiming', label: 'Per Question Timing', desc: 'Track time spent on each question' },
                      { key: 'idleTimeDetection', label: 'Idle Time Detection', desc: 'Detect when student is inactive' },
                      { key: 'speedAnalysis', label: 'Speed Analysis', desc: 'Analyze answering speed patterns' },
                      { key: 'pauseDetection', label: 'Pause Detection', desc: 'Detect unusually long pauses' },
                      { key: 'timeWarnings', label: 'Time Warnings', desc: 'Warn students about time limits' },
                      { key: 'adaptiveTimeouts', label: 'Adaptive Timeouts', desc: 'Adjust timeouts based on behavior' },
                      { key: 'detailedReporting', label: 'Detailed Reporting', desc: 'Generate comprehensive time reports' },
                      { key: 'behaviorProfiling', label: 'Behavior Profiling', desc: 'Build student behavior profiles' }
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-700">{label}</span>
                          <p className="text-xs text-gray-500">{desc}</p>
                        </div>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            timeTracking: { ...prev.timeTracking, [key]: !prev.timeTracking[key as keyof TimeTrackingSettings] }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.timeTracking[key as keyof TimeTrackingSettings] ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.timeTracking[key as keyof TimeTrackingSettings] ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Analytics Dashboard */}
            {configuration.timeTracking.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Time Analytics
                </h3>

                <div className="space-y-4">
                  <div className="bg-blue-50 border border-cyan-200 rounded-lg p-4">
                    <h4 className="font-medium text-cyan-800 mb-3">Tracking Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white rounded p-3 border">
                        <div className="text-2xl font-bold text-blue-600">0s</div>
                        <div className="text-gray-600">Avg per Question</div>
                      </div>
                      <div className="bg-white rounded p-3 border">
                        <div className="text-2xl font-bold text-orange-600">0s</div>
                        <div className="text-gray-600">Total Idle Time</div>
                      </div>
                      <div className="bg-white rounded p-3 border">
                        <div className="text-2xl font-bold text-purple-600">0</div>
                        <div className="text-gray-600">Long Pauses</div>
                      </div>
                      <div className="bg-white rounded p-3 border">
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <div className="text-gray-600">Efficiency Score</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2">Behavior Analysis</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Consistent pacing throughout test</li>
                      <li>• Normal pause patterns detected</li>
                      <li>• No suspicious speed variations</li>
                      <li>• Time usage within expected range</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Warning Thresholds</h4>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>• Idle time warning: &gt;30 seconds</div>
                      <div>• Speed anomaly: &gt;3x average speed</div>
                      <div>• Long pause alert: &gt;2 minutes</div>
                      <div>• Time remaining warning: 15, 5, 1 minutes</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Export Options</h4>
                    <div className="flex gap-2">
                      <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700">
                        <Download className="w-4 h-4 inline mr-1" />
                        CSV Report
                      </button>
                      <button className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700">
                        <Download className="w-4 h-4 inline mr-1" />
                        PDF Summary
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Events Log */}
      {securityEvents.length > 0 && (
        <div className="bg-white rounded-xl p-6 border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-600" />
              Recent Security Events
            </h3>
            <span className="text-sm text-gray-500">Last 20 events</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {securityEvents.map((event) => (
              <div key={event.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      event.severity === 'critical' ? 'bg-red-100 text-red-700' :
                      event.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                      event.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {event.severity}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium capitalize">
                      {event.type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mb-1">{event.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Student: {event.studentId}</span>
                  <span>Action: {event.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SecurityFeatures