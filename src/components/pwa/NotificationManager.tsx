'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, BellOff, Clock, BookOpen, Target, Settings, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Switch } from '@/components/ui/switch'
import pwaService from '@/lib/pwa/pwaService'

interface NotificationManagerProps {
  className?: string
}

interface StudyReminderSettings {
  enabled: boolean
  morningTime: string
  eveningTime: string
  classReminders: boolean
  testReminders: boolean
  studyStreaks: boolean
}

export function NotificationManager({ className = '' }: NotificationManagerProps) {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [showSettings, setShowSettings] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [settings, setSettings] = useState<StudyReminderSettings>({
    enabled: false,
    morningTime: '08:00',
    eveningTime: '19:00',
    classReminders: true,
    testReminders: true,
    studyStreaks: false,
  })

  useEffect(() => {
    // Check current permission status
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('notification-settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const requestPermission = async () => {
    setIsRequesting(true)

    try {
      const newPermission = await pwaService.requestNotificationPermission()
      setPermission(newPermission)

      if (newPermission === 'granted') {
        // Enable notifications by default
        const newSettings = { ...settings, enabled: true }
        setSettings(newSettings)
        localStorage.setItem('notification-settings', JSON.stringify(newSettings))

        // Setup study reminders
        pwaService.setupStudyReminders(newSettings)

        // Show test notification
        pwaService.scheduleNotification(
          {
            title: '🎉 Notifications Enabled!',
            body: "You'll now receive study reminders and important updates.",
            type: 'announcement',
            url: '/',
          },
          2000
        )

        // Track permission granted
        if (window.gtag) {
          window.gtag('event', 'notification_permission_granted', {
            event_category: 'Notifications',
            event_label: 'Permission Request',
          })
        }
      }
    } catch (error) {
      console.error('Notification permission request failed:', error)
    } finally {
      setIsRequesting(false)
    }
  }

  const updateSettings = (newSettings: Partial<StudyReminderSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem('notification-settings', JSON.stringify(updatedSettings))

    // Update PWA service with new settings
    if (updatedSettings.enabled && permission === 'granted') {
      pwaService.setupStudyReminders(updatedSettings)
    }
  }

  const testNotification = () => {
    if (permission === 'granted') {
      pwaService.scheduleNotification({
        title: '📚 Test Notification',
        body: 'This is how your study reminders will look!',
        type: 'study-reminder',
        url: '/study-materials',
      })

      // Track test notification
      if (window.gtag) {
        window.gtag('event', 'notification_test_sent', {
          event_category: 'Notifications',
          event_label: 'Test Notification',
        })
      }
    }
  }

  const getPermissionStatus = () => {
    switch (permission) {
      case 'granted':
        return { color: 'green', text: 'Enabled', icon: Bell }
      case 'denied':
        return { color: 'red', text: 'Blocked', icon: BellOff }
      default:
        return { color: 'yellow', text: 'Not Set', icon: Bell }
    }
  }

  const status = getPermissionStatus()

  return (
    <div className={className}>
      {/* Notification Status Card */}
      <Card className="border-2 border-gray-200 hover:border-primary/30 transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <status.icon className={`w-5 h-5 text-${status.color}-600`} />
              <span>Study Notifications</span>
            </div>
            <Badge
              className={`bg-${status.color}-100 text-${status.color}-800 border-${status.color}-200`}
            >
              {status.text}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {permission === 'default' && (
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Enable notifications to receive study reminders, class alerts, and important updates
                for your NEET preparation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="w-5 h-5 text-blue-600 mb-2" />
                  <h4 className="font-medium text-blue-900 text-sm">Study Reminders</h4>
                  <p className="text-xs text-blue-700">Daily study time alerts</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <BookOpen className="w-5 h-5 text-green-600 mb-2" />
                  <h4 className="font-medium text-green-900 text-sm">Class Alerts</h4>
                  <p className="text-xs text-green-700">Live class notifications</p>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <Target className="w-5 h-5 text-purple-600 mb-2" />
                  <h4 className="font-medium text-purple-900 text-sm">Test Reminders</h4>
                  <p className="text-xs text-purple-700">Mock test availability</p>
                </div>
              </div>

              <Button
                onClick={requestPermission}
                disabled={isRequesting}
                className="w-full bg-primary hover:bg-primary/90"
              >
                {isRequesting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Requesting Permission...
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Enable Notifications
                  </>
                )}
              </Button>
            </div>
          )}

          {permission === 'granted' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Study Reminders</span>
                <Switch
                  checked={settings.enabled}
                  onCheckedChange={(enabled) => updateSettings({ enabled })}
                />
              </div>

              {settings.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-3 p-4 bg-gray-50 rounded-lg border"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-600">Morning Reminder</label>
                      <input
                        type="time"
                        value={settings.morningTime}
                        onChange={(e) => updateSettings({ morningTime: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">Evening Reminder</label>
                      <input
                        type="time"
                        value={settings.eveningTime}
                        onChange={(e) => updateSettings({ eveningTime: e.target.value })}
                        className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Class Reminders</span>
                      <Switch
                        checked={settings.classReminders}
                        onCheckedChange={(classReminders) => updateSettings({ classReminders })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Test Reminders</span>
                      <Switch
                        checked={settings.testReminders}
                        onCheckedChange={(testReminders) => updateSettings({ testReminders })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Study Streak Alerts</span>
                      <Switch
                        checked={settings.studyStreaks}
                        onCheckedChange={(studyStreaks) => updateSettings({ studyStreaks })}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={testNotification} className="flex-1">
                  Test Notification
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {permission === 'denied' && (
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-800 mb-2">
                  Notifications are blocked. To enable them:
                </p>
                <ol className="text-xs text-red-700 space-y-1 ml-4 list-decimal">
                  <li>Click the lock icon in your browser's address bar</li>
                  <li>Change notification permission to "Allow"</li>
                  <li>Refresh this page</li>
                </ol>
              </div>

              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full border-red-300 text-red-700 hover:bg-red-50"
              >
                Refresh Page
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Examples */}
      <AnimatePresence>
        {showSettings && permission === 'granted' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  Notification Examples
                  <Button variant="ghost" size="sm" onClick={() => setShowSettings(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Example notifications */}
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 text-sm">
                        Morning Biology Revision 🌅
                      </h4>
                      <p className="text-xs text-blue-700">
                        Start your day with NEET Biology concepts!
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Daily at {settings.morningTime}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg border border-green-200 flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-green-900 text-sm">
                        Live Class Starting Soon!
                      </h4>
                      <p className="text-xs text-green-700">
                        Your Cell Biology class starts in 15 minutes
                      </p>
                      <p className="text-xs text-green-600 mt-1">Before live classes</p>
                    </div>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-purple-900 text-sm">
                        New Mock Test Available
                      </h4>
                      <p className="text-xs text-purple-700">
                        New Genetics mock test is now available
                      </p>
                      <p className="text-xs text-purple-600 mt-1">When new tests are published</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Quick notification permission request component
export function QuickNotificationRequest() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)

      // Show after user has been on site for a while
      if (Notification.permission === 'default') {
        const timer = setTimeout(() => {
          setIsVisible(true)
        }, 60000) // Show after 1 minute

        return () => clearTimeout(timer)
      }
    }
  }, [])

  const handleRequest = async () => {
    const newPermission = await pwaService.requestNotificationPermission()
    setPermission(newPermission)
    setIsVisible(false)

    if (newPermission === 'granted') {
      // Show welcome notification
      pwaService.scheduleNotification(
        {
          title: '🎉 Welcome to Cerebrum Biology!',
          body: "You'll now receive study reminders and important updates.",
          type: 'announcement',
        },
        1000
      )
    }
  }

  if (!isVisible || permission !== 'default') {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 right-6 z-40 max-w-sm"
    >
      <Card className="border-2 border-primary/20 shadow-lg bg-white">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm mb-1">
                Stay on track with your studies
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Get daily reminders and never miss a class or test.
              </p>
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleRequest} className="text-xs px-3 py-1">
                  <Check className="w-3 h-3 mr-1" />
                  Enable
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsVisible(false)}
                  className="text-xs px-3 py-1"
                >
                  <X className="w-3 h-3 mr-1" />
                  Later
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
