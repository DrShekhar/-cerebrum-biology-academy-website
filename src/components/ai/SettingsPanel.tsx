'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Sun,
  Moon,
  Bell,
  User,
  Palette,
  Type,
  Calendar,
  Target,
  Upload,
  Mail,
  Smartphone,
  Clock,
  FileText,
  Shield,
  Trash2,
  Save,
  AlertCircle,
  ChevronRight,
} from 'lucide-react'
import { useToast } from '../ui/Toast'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface SettingsState {
  theme: {
    mode: 'light' | 'dark'
    colorScheme: 'purple' | 'blue' | 'green' | 'orange'
    fontSize: 'small' | 'medium' | 'large'
  }
  notifications: {
    email: boolean
    push: boolean
    studyReminders: boolean
    testReminders: boolean
    reminderTime: string
  }
  profile: {
    displayName: string
    avatar: string
    studyGoal: number
    targetExamDate: string
  }
  privacy: {
    dataSharing: boolean
    analytics: boolean
  }
}

const defaultSettings: SettingsState = {
  theme: {
    mode: 'light',
    colorScheme: 'purple',
    fontSize: 'medium',
  },
  notifications: {
    email: true,
    push: true,
    studyReminders: true,
    testReminders: true,
    reminderTime: '09:00',
  },
  profile: {
    displayName: 'NEET Student',
    avatar: '',
    studyGoal: 4,
    targetExamDate: '',
  },
  privacy: {
    dataSharing: false,
    analytics: true,
  },
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { showToast } = useToast()
  const [settings, setSettings] = useState<SettingsState>(defaultSettings)
  const [activeSection, setActiveSection] = useState<
    'theme' | 'notifications' | 'profile' | 'privacy'
  >('theme')
  const [hasChanges, setHasChanges] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>('')

  useEffect(() => {
    const savedSettings = localStorage.getItem('cerebrum-settings')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (settings.profile.avatar) {
      setAvatarPreview(settings.profile.avatar)
    }
  }, [settings.profile.avatar])

  const handleSaveSettings = () => {
    try {
      localStorage.setItem('cerebrum-settings', JSON.stringify(settings))
      setHasChanges(false)
      showToast('success', 'Settings Saved', 'Your preferences have been updated successfully!')

      if (settings.theme.mode === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      document.documentElement.style.fontSize =
        settings.theme.fontSize === 'small'
          ? '14px'
          : settings.theme.fontSize === 'large'
            ? '18px'
            : '16px'
    } catch (error) {
      showToast('error', 'Save Failed', 'Failed to save settings. Please try again.')
    }
  }

  const handleResetSettings = () => {
    setSettings(defaultSettings)
    setHasChanges(true)
    showToast('info', 'Settings Reset', 'All settings have been reset to defaults.')
  }

  const handleDeleteAccount = () => {
    if (
      window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
    ) {
      localStorage.removeItem('cerebrum-settings')
      showToast(
        'success',
        'Account Deleted',
        'Your account and data have been removed from this device.'
      )
      setTimeout(onClose, 2000)
    }
  }

  const updateSettings = (
    section: keyof SettingsState,
    key: string,
    value: string | boolean | number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select an image under 2MB.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setAvatarPreview(result)
        updateSettings('profile', 'avatar', result)
      }
      reader.readAsDataURL(file)
    }
  }

  const sections = [
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ]

  const colorSchemes = [
    { id: 'purple', label: 'Purple', color: 'from-purple-500 to-indigo-500' },
    { id: 'blue', label: 'Blue', color: 'from-blue-500 to-blue-500' },
    { id: 'green', label: 'Green', color: 'bg-green-600' },
    { id: 'orange', label: 'Orange', color: 'bg-orange-600' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow-2xl z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Settings</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    aria-label="Close settings"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                        activeSection === section.id
                          ? 'bg-white text-purple-600 shadow-lg'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      <span>{section.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeSection === 'theme' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Sun className="w-5 h-5 mr-2 text-yellow-500" />
                        Display Mode
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => updateSettings('theme', 'mode', 'light')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            settings.theme.mode === 'light'
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                          <p className="text-sm font-medium">Light</p>
                        </button>
                        <button
                          onClick={() => updateSettings('theme', 'mode', 'dark')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            settings.theme.mode === 'dark'
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <Moon className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                          <p className="text-sm font-medium">Dark</p>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Palette className="w-5 h-5 mr-2 text-purple-500" />
                        Color Scheme
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {colorSchemes.map((scheme) => (
                          <button
                            key={scheme.id}
                            onClick={() => updateSettings('theme', 'colorScheme', scheme.id)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              settings.theme.colorScheme === scheme.id
                                ? 'border-purple-500 ring-2 ring-purple-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div
                              className={`h-8 rounded-md bg-gradient-to-r ${scheme.color} mb-2`}
                            />
                            <p className="text-sm font-medium">{scheme.label}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Type className="w-5 h-5 mr-2 text-blue-500" />
                        Font Size
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        {['small', 'medium', 'large'].map((size) => (
                          <button
                            key={size}
                            onClick={() => updateSettings('theme', 'fontSize', size)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                              settings.theme.fontSize === size
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <p
                              className={`font-medium mb-1 ${
                                size === 'small'
                                  ? 'text-sm'
                                  : size === 'large'
                                    ? 'text-lg'
                                    : 'text-base'
                              }`}
                            >
                              Aa
                            </p>
                            <p className="text-xs text-gray-600 capitalize">{size}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'notifications' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Bell className="w-5 h-5 mr-2 text-blue-500" />
                        Notification Channels
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-800">Email Notifications</p>
                              <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              updateSettings(
                                'notifications',
                                'email',
                                !settings.notifications.email
                              )
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings.notifications.email ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                settings.notifications.email ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-800">Push Notifications</p>
                              <p className="text-sm text-gray-500">Get alerts on your device</p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              updateSettings('notifications', 'push', !settings.notifications.push)
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings.notifications.push ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                settings.notifications.push ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-500" />
                        Reminders
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-800">Study Reminders</p>
                              <p className="text-sm text-gray-500">Daily study session alerts</p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              updateSettings(
                                'notifications',
                                'studyReminders',
                                !settings.notifications.studyReminders
                              )
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings.notifications.studyReminders ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                settings.notifications.studyReminders
                                  ? 'translate-x-7'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <AlertCircle className="w-5 h-5 text-gray-600" />
                            <div>
                              <p className="font-medium text-gray-800">Test Reminders</p>
                              <p className="text-sm text-gray-500">Mock test and quiz alerts</p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              updateSettings(
                                'notifications',
                                'testReminders',
                                !settings.notifications.testReminders
                              )
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings.notifications.testReminders ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                settings.notifications.testReminders
                                  ? 'translate-x-7'
                                  : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="p-3 bg-gray-50 rounded-lg">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Reminder Time
                          </label>
                          <input
                            type="time"
                            value={settings.notifications.reminderTime}
                            onChange={(e) =>
                              updateSettings('notifications', 'reminderTime', e.target.value)
                            }
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'profile' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2 text-purple-500" />
                        Personal Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Display Name
                          </label>
                          <input
                            type="text"
                            value={settings.profile.displayName}
                            onChange={(e) =>
                              updateSettings('profile', 'displayName', e.target.value)
                            }
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                            placeholder="Enter your name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Avatar
                          </label>
                          <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center overflow-hidden">
                              {avatarPreview ? (
                                <img
                                  src={avatarPreview}
                                  alt="Your profile avatar"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="w-10 h-10 text-white" />
                              )}
                            </div>
                            <label className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors cursor-pointer">
                              <Upload className="w-4 h-4" />
                              <span className="text-sm font-medium">Upload Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">Max size: 2MB</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-blue-500" />
                        Study Goals
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Daily Study Goal (hours)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="12"
                            value={settings.profile.studyGoal}
                            onChange={(e) =>
                              updateSettings('profile', 'studyGoal', parseInt(e.target.value))
                            }
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                          />
                          <div className="mt-2 flex items-center space-x-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-500 transition-all"
                                style={{
                                  width: `${(settings.profile.studyGoal / 12) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {settings.profile.studyGoal}h
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Exam Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="date"
                              value={settings.profile.targetExamDate}
                              onChange={(e) =>
                                updateSettings('profile', 'targetExamDate', e.target.value)
                              }
                              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'privacy' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-green-600" />
                        Data & Privacy
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">Data Sharing</p>
                            <p className="text-sm text-gray-500">
                              Share anonymized data to improve AI features
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              updateSettings(
                                'privacy',
                                'dataSharing',
                                !settings.privacy.dataSharing
                              )
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings.privacy.dataSharing ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                settings.privacy.dataSharing ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">Analytics</p>
                            <p className="text-sm text-gray-500">
                              Help us improve by collecting usage analytics
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              updateSettings('privacy', 'analytics', !settings.privacy.analytics)
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              settings.privacy.analytics ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                settings.privacy.analytics ? 'translate-x-7' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Trash2 className="w-5 h-5 mr-2 text-red-500" />
                        Danger Zone
                      </h3>
                      <div className="space-y-3">
                        <button
                          onClick={handleResetSettings}
                          className="w-full px-4 py-3 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors font-medium text-left flex items-center justify-between"
                        >
                          <span>Reset All Settings</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="w-full px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium text-left flex items-center justify-between"
                        >
                          <span>Delete Account Data</span>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        These actions cannot be undone. Please proceed with caution.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="bg-white border-t border-gray-200 p-4">
                {hasChanges && (
                  <div className="mb-3 flex items-center space-x-2 text-sm text-yellow-600 bg-amber-50 px-3 py-2 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    <span>You have unsaved changes</span>
                  </div>
                )}
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSettings}
                    disabled={!hasChanges}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                      hasChanges
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SettingsPanel
