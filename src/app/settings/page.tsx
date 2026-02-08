import { Metadata } from 'next'
import { NotificationManager } from '@/components/pwa/NotificationManager'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import {
  Settings as SettingsIcon,
  Bell,
  Smartphone,
  Download,
  Wifi,
  Shield,
  Eye,
  Globe,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Settings - Cerebrum Biology Academy',
  description:
    'Manage your app settings, notifications, and preferences for the best NEET Biology learning experience.',
  robots: 'noindex, nofollow',
}

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <SettingsIcon className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">App Settings</h1>
          <p className="text-lg text-gray-600">Customize your NEET Biology learning experience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Quick Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Notifications</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">PWA Mode</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Available</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">Offline Mode</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">Ready</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Sync Status</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200">Online</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-primary" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NotificationManager />
              </CardContent>
            </Card>

            {/* PWA Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-primary" />
                  Progressive Web App
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2">App Installation</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Install Cerebrum Biology Academy as an app on your device for better performance
                    and offline access.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 text-sm text-blue-800">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Faster loading times</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-800">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Offline functionality</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-800">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Home screen shortcut</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-800">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span>Native app experience</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-medium text-gray-900 mb-2">Installation Status</h4>
                  <p className="text-sm text-gray-600">
                    Check your browser's address bar for an install prompt, or look for "Add to Home
                    Screen" in your browser menu.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Data Collection</h4>
                      <p className="text-sm text-gray-600">Learning progress and preferences</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Minimal</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Analytics</h4>
                      <p className="text-sm text-gray-600">Usage statistics for improvement</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">Anonymous</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Third-party Cookies</h4>
                      <p className="text-sm text-gray-600">External service integration</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Limited
                    </Badge>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">🔒 Your Privacy Matters</h4>
                  <p className="text-sm text-green-700">
                    We collect only essential data to improve your learning experience. Your
                    personal information is never sold or shared with third parties.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Accessibility Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-primary" />
                  Accessibility & Display
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">High Contrast Mode</h4>
                      <p className="text-sm text-gray-600">Better visibility for reading</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">Auto-detect</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Font Size</h4>
                      <p className="text-sm text-gray-600">Adjust text readability</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      System Default
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Reduced Motion</h4>
                      <p className="text-sm text-gray-600">Minimize animations</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      Respects System
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-primary" />
                  Language & Region
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Interface Language</h4>
                      <p className="text-sm text-gray-600">App display language</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      English (India)
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Time Zone</h4>
                      <p className="text-sm text-gray-600">Class schedules and reminders</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      IST (UTC+5:30)
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Number Format</h4>
                      <p className="text-sm text-gray-600">Scores and statistics</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                      Indian (1,00,000)
                    </Badge>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">
                    🌏 Multi-language Support
                  </h4>
                  <p className="text-sm text-blue-700">
                    Hindi and regional language support is being developed for better accessibility.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Settings are saved locally and synced across your devices when signed in.
          </p>
        </div>
      </div>
    </div>
  )
}
