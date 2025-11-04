'use client'

import { motion } from 'framer-motion'
import { Bell, Moon, Eye, Volume2, Loader2, Check } from 'lucide-react'
import { useOptimisticUpdate } from '@/hooks/useOptimisticUpdate'
import { useToast } from '@/components/ui/Toast'

interface SettingsData {
  notifications: boolean
  darkMode: boolean
  accessibility: boolean
  soundEffects: boolean
}

interface OptimisticSettingsToggleProps {
  userId: string
  initialSettings: SettingsData
}

export function OptimisticSettingsToggle({
  userId,
  initialSettings,
}: OptimisticSettingsToggleProps) {
  const { showToast } = useToast()

  const { data, update, isLoading, isOptimistic } = useOptimisticUpdate<SettingsData>(
    initialSettings,
    {
      onSuccess: () => {
        showToast('success', 'Settings Saved', 'Your preferences have been updated')
      },
      onError: (error) => {
        showToast('error', 'Failed to Save', 'Could not save settings. Please try again.')
      },
    }
  )

  const handleToggle = async (setting: keyof SettingsData) => {
    await update(
      (current) => ({
        ...current,
        [setting]: !current[setting],
      }),
      async () => {
        const response = await fetch('/api/settings/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            settings: {
              ...data,
              [setting]: !data[setting],
            },
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to update settings')
        }

        return response.json()
      }
    )
  }

  const settings = [
    {
      key: 'notifications' as keyof SettingsData,
      label: 'Push Notifications',
      description: 'Receive updates about courses and progress',
      icon: Bell,
      color: 'blue',
    },
    {
      key: 'darkMode' as keyof SettingsData,
      label: 'Dark Mode',
      description: 'Switch to dark theme for better visibility',
      icon: Moon,
      color: 'purple',
    },
    {
      key: 'accessibility' as keyof SettingsData,
      label: 'High Contrast',
      description: 'Increase contrast for better readability',
      icon: Eye,
      color: 'green',
    },
    {
      key: 'soundEffects' as keyof SettingsData,
      label: 'Sound Effects',
      description: 'Play sounds for interactions',
      icon: Volume2,
      color: 'orange',
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Settings</h3>
          <p className="text-sm text-gray-600">
            {isOptimistic ? 'Saving changes...' : 'Changes save automatically'}
          </p>
        </div>
        {isLoading && (
          <div className="flex items-center space-x-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">Syncing</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {settings.map((setting) => {
          const Icon = setting.icon
          const isEnabled = data[setting.key]
          const colors = {
            blue: 'bg-blue-600',
            purple: 'bg-purple-600',
            green: 'bg-green-600',
            orange: 'bg-orange-600',
          }

          return (
            <motion.div
              key={setting.key}
              className={`p-4 border-2 rounded-xl transition-all ${
                isOptimistic ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
              }`}
              animate={
                isOptimistic
                  ? {
                      scale: [1, 1.01, 1],
                      transition: { duration: 0.2 },
                    }
                  : {}
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 ${colors[setting.color as keyof typeof colors]} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(setting.key)}
                  disabled={isLoading}
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                    isEnabled ? colors[setting.color as keyof typeof colors] : 'bg-gray-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <motion.div
                    className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
                    animate={{
                      x: isEnabled ? 24 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    {isEnabled && <Check className="w-4 h-4 text-green-600" />}
                  </motion.div>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-start space-x-3">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">Instant Updates</h4>
            <p className="text-sm text-green-700 mt-1">
              Your settings are applied immediately and synced in the background. No need to wait!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
