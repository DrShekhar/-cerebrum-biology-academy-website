'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Link,
  QrCode,
  Mail,
  MessageSquare,
  BookOpen,
  Code,
  Download,
  Printer,
  Copy,
  Share2,
  Send,
  Globe,
  Smartphone,
  Monitor,
  WifiOff,
  FileText,
  Image,
  Clock,
  Eye,
  Plus,
  Package,
  Zap,
  Target,
  BarChart3,
} from 'lucide-react'

// Types and Interfaces
interface TestDistribution {
  id: string
  testId: string
  testTitle: string
  distributionType: 'online' | 'qr' | 'email' | 'sms' | 'lms' | 'embed' | 'offline' | 'print'
  url?: string
  qrCode?: string
  recipients: string[]
  subject?: string
  message?: string
  scheduleDate?: string
  expiryDate?: string
  accessCount: number
  status: 'draft' | 'active' | 'scheduled' | 'expired' | 'paused'
  createdAt: string
  lastAccessed?: string
  analytics: {
    views: number
    starts: number
    completions: number
    averageScore: number
  }
}

interface LMSIntegration {
  id: string
  name: string
  type: 'moodle' | 'canvas' | 'blackboard' | 'google-classroom' | 'custom'
  apiKey: string
  baseUrl: string
  isConnected: boolean
  lastSync: string
  courseCount: number
}

interface EmbedOptions {
  width: string
  height: string
  showHeader: boolean
  showFooter: boolean
  customCSS: string
  theme: 'light' | 'dark' | 'custom'
  autoStart: boolean
  responsiveMode: boolean
}

interface PrintOptions {
  paperSize: 'A4' | 'A3' | 'Letter' | 'Legal'
  orientation: 'portrait' | 'landscape'
  includeAnswerKey: boolean
  includeInstructions: boolean
  questionsPerPage: number
  fontSize: 'small' | 'medium' | 'large'
  margins: string
  watermark: string
  headerFooter: boolean
}

const Distribution: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'online' | 'qr' | 'email' | 'sms' | 'lms' | 'embed' | 'offline' | 'print'
  >('online')
  const [distributions, setDistributions] = useState<TestDistribution[]>([])
  const [lmsIntegrations, setLmsIntegrations] = useState<LMSIntegration[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedTest, setSelectedTest] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [qrCodeData, setQrCodeData] = useState('')
  const [embedCode, setEmbedCode] = useState('')

  const [emailSettings, setEmailSettings] = useState({
    recipients: '',
    subject: 'You have been invited to take a test',
    message: 'Please click the link below to access your test.',
    scheduleDate: '',
    sendCopy: true,
  })

  const [smsSettings, setSmsSettings] = useState({
    recipients: '',
    message: 'You have been invited to take a test. Click: ',
    scheduleDate: '',
    provider: 'twilio',
  })

  const [embedOptions, setEmbedOptions] = useState<EmbedOptions>({
    width: '100%',
    height: '600px',
    showHeader: true,
    showFooter: true,
    customCSS: '',
    theme: 'light',
    autoStart: false,
    responsiveMode: true,
  })

  const [printOptions, setPrintOptions] = useState<PrintOptions>({
    paperSize: 'A4',
    orientation: 'portrait',
    includeAnswerKey: true,
    includeInstructions: true,
    questionsPerPage: 5,
    fontSize: 'medium',
    margins: '1in',
    watermark: '',
    headerFooter: true,
  })

  // Mock data initialization
  useEffect(() => {
    generateMockData()
  }, [])

  const generateMockData = () => {
    const mockDistributions: TestDistribution[] = [
      {
        id: 'dist_1',
        testId: 'test_001',
        testTitle: 'NEET Biology Mock Test 1',
        distributionType: 'online',
        url: 'https://app.cerebrumbiologyacademy.com/test/neet-bio-001',
        recipients: ['student1@example.com', 'student2@example.com'],
        status: 'active',
        accessCount: 45,
        createdAt: '2024-01-15',
        lastAccessed: '2024-01-16',
        analytics: {
          views: 120,
          starts: 95,
          completions: 78,
          averageScore: 85.4,
        },
      },
      {
        id: 'dist_2',
        testId: 'test_002',
        testTitle: 'Cell Biology Quiz',
        distributionType: 'qr',
        qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI...',
        recipients: [],
        status: 'active',
        accessCount: 23,
        createdAt: '2024-01-14',
        analytics: {
          views: 67,
          starts: 58,
          completions: 45,
          averageScore: 78.2,
        },
      },
    ]

    const mockLMS: LMSIntegration[] = [
      {
        id: 'lms_1',
        name: 'Moodle - Main Campus',
        type: 'moodle',
        apiKey: 'moodle_api_key_123',
        baseUrl: 'https://lms.university.edu',
        isConnected: true,
        lastSync: '2024-01-16T10:30:00Z',
        courseCount: 15,
      },
      {
        id: 'lms_2',
        name: 'Google Classroom',
        type: 'google-classroom',
        apiKey: 'google_api_key_456',
        baseUrl: 'https://classroom.google.com',
        isConnected: false,
        lastSync: '2024-01-10T15:20:00Z',
        courseCount: 8,
      },
    ]

    setDistributions(mockDistributions)
    setLmsIntegrations(mockLMS)
  }

  // Online Test Link Generation
  const generateOnlineLink = () => {
    setLoading(true)
    setTimeout(() => {
      const testId = `test_${Date.now()}`
      const link = `https://app.cerebrumbiologyacademy.com/test/${testId}`
      setGeneratedLink(link)

      const newDistribution: TestDistribution = {
        id: `dist_${Date.now()}`,
        testId,
        testTitle: selectedTest || 'New Test',
        distributionType: 'online',
        url: link,
        recipients: [],
        status: 'active',
        accessCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        analytics: {
          views: 0,
          starts: 0,
          completions: 0,
          averageScore: 0,
        },
      }

      setDistributions((prev) => [newDistribution, ...prev])
      setLoading(false)
    }, 1000)
  }

  // QR Code Generation
  const generateQRCode = () => {
    setLoading(true)
    setTimeout(() => {
      // Mock QR code generation
      const qrData = `https://app.cerebrumbiologyacademy.com/test/qr_${Date.now()}`
      setQrCodeData(qrData)

      const newDistribution: TestDistribution = {
        id: `dist_qr_${Date.now()}`,
        testId: `test_qr_${Date.now()}`,
        testTitle: selectedTest || 'QR Test',
        distributionType: 'qr',
        qrCode: qrData,
        recipients: [],
        status: 'active',
        accessCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        analytics: {
          views: 0,
          starts: 0,
          completions: 0,
          averageScore: 0,
        },
      }

      setDistributions((prev) => [newDistribution, ...prev])
      setLoading(false)
    }, 1000)
  }

  // Email Invitations
  const sendEmailInvitations = () => {
    setLoading(true)
    setTimeout(() => {
      const emailCount = emailSettings.recipients.split(',').length

      const newDistribution: TestDistribution = {
        id: `dist_email_${Date.now()}`,
        testId: `test_email_${Date.now()}`,
        testTitle: selectedTest || 'Email Test',
        distributionType: 'email',
        recipients: emailSettings.recipients.split(',').map((email) => email.trim()),
        subject: emailSettings.subject,
        message: emailSettings.message,
        scheduleDate: emailSettings.scheduleDate,
        status: emailSettings.scheduleDate ? 'scheduled' : 'active',
        accessCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        analytics: {
          views: 0,
          starts: 0,
          completions: 0,
          averageScore: 0,
        },
      }

      setDistributions((prev) => [newDistribution, ...prev])
      setLoading(false)
    }, 1500)
  }

  // SMS Notifications
  const sendSMSNotifications = () => {
    setLoading(true)
    setTimeout(() => {
      const smsCount = smsSettings.recipients.split(',').length

      const newDistribution: TestDistribution = {
        id: `dist_sms_${Date.now()}`,
        testId: `test_sms_${Date.now()}`,
        testTitle: selectedTest || 'SMS Test',
        distributionType: 'sms',
        recipients: smsSettings.recipients.split(',').map((phone) => phone.trim()),
        message: smsSettings.message,
        scheduleDate: smsSettings.scheduleDate,
        status: smsSettings.scheduleDate ? 'scheduled' : 'active',
        accessCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
        analytics: {
          views: 0,
          starts: 0,
          completions: 0,
          averageScore: 0,
        },
      }

      setDistributions((prev) => [newDistribution, ...prev])
      setLoading(false)
    }, 1500)
  }

  // Generate Embed Code
  const generateEmbedCode = () => {
    const embedHtml = `<iframe
  src="https://app.cerebrumbiologyacademy.com/embed/test/${Date.now()}"
  width="${embedOptions.width}"
  height="${embedOptions.height}"
  style="border: none; ${embedOptions.responsiveMode ? 'max-width: 100%;' : ''}"
  ${embedOptions.autoStart ? 'data-autostart="true"' : ''}
  data-theme="${embedOptions.theme}"
  ${embedOptions.showHeader ? '' : 'data-hide-header="true"'}
  ${embedOptions.showFooter ? '' : 'data-hide-footer="true"'}
></iframe>

${embedOptions.customCSS ? `<style>\n${embedOptions.customCSS}\n</style>` : ''}`

    setEmbedCode(embedHtml)
  }

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'scheduled':
        return 'text-blue-600 bg-blue-100'
      case 'expired':
        return 'text-red-600 bg-red-100'
      case 'paused':
        return 'text-yellow-600 bg-yellow-100'
      case 'draft':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  // Get distribution type icon
  const getDistributionIcon = (type: string) => {
    switch (type) {
      case 'online':
        return Link
      case 'qr':
        return QrCode
      case 'email':
        return Mail
      case 'sms':
        return MessageSquare
      case 'lms':
        return BookOpen
      case 'embed':
        return Code
      case 'offline':
        return Download
      case 'print':
        return Printer
      default:
        return Globe
    }
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
          <div className="p-3 bg-green-600 rounded-xl">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-green-600 bg-clip-text text-transparent">
            Test Distribution
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive test distribution system with multiple delivery methods, analytics tracking,
          and integration capabilities
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'online', label: 'Online Link', icon: Link },
            { id: 'qr', label: 'QR Code', icon: QrCode },
            { id: 'email', label: 'Email', icon: Mail },
            { id: 'sms', label: 'SMS', icon: MessageSquare },
            { id: 'lms', label: 'LMS', icon: BookOpen },
            { id: 'embed', label: 'Embed', icon: Code },
            { id: 'offline', label: 'Offline', icon: Download },
            { id: 'print', label: 'Print', icon: Printer },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-green-600 shadow-md'
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
        {/* Online Test Link Generation */}
        {activeTab === 'online' && (
          <motion.div
            key="online"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Link Generation */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Link className="w-5 h-5 text-green-600" />
                Generate Online Test Link
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Test
                  </label>
                  <select
                    value={selectedTest}
                    onChange={(e) => setSelectedTest(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="">Choose a test...</option>
                    <option value="NEET Biology Mock Test 1">NEET Biology Mock Test 1</option>
                    <option value="Cell Biology Quiz">Cell Biology Quiz</option>
                    <option value="Genetics Assessment">Genetics Assessment</option>
                    <option value="Human Physiology Test">Human Physiology Test</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Access Limit
                    </label>
                    <input
                      type="number"
                      placeholder="Unlimited"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={generateOnlineLink}
                  disabled={loading || !selectedTest}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4" />
                      Generate Link
                    </>
                  )}
                </button>

                {generatedLink && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-green-700 font-medium">Generated Link:</p>
                        <p className="text-green-700 font-mono text-sm break-all">
                          {generatedLink}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(generatedLink)}
                        className="ml-2 p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Links */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Active Online Links
              </h3>

              <div className="space-y-3">
                {distributions
                  .filter((d) => d.distributionType === 'online')
                  .map((dist) => (
                    <div
                      key={dist.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-800">{dist.testTitle}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dist.status)}`}
                            >
                              {dist.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 font-mono">{dist.url}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                            <span>{dist.analytics.views} views</span>
                            <span>{dist.analytics.starts} starts</span>
                            <span>{dist.analytics.completions} completions</span>
                            <span>Created: {dist.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(dist.url || '')}
                            className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* QR Code Generation */}
        {activeTab === 'qr' && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* QR Code Generator */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <QrCode className="w-5 h-5 text-purple-600" />
                Generate QR Code
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Test
                  </label>
                  <select
                    value={selectedTest}
                    onChange={(e) => setSelectedTest(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Choose a test...</option>
                    <option value="NEET Biology Mock Test 1">NEET Biology Mock Test 1</option>
                    <option value="Cell Biology Quiz">Cell Biology Quiz</option>
                    <option value="Genetics Assessment">Genetics Assessment</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      QR Code Size
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="200">200x200px</option>
                      <option value="300">300x300px</option>
                      <option value="400">400x400px</option>
                      <option value="500">500x500px</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="png">PNG</option>
                      <option value="svg">SVG</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Include test title in QR code
                    </span>
                  </label>
                </div>

                <button
                  onClick={generateQRCode}
                  disabled={loading || !selectedTest}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-4 h-4" />
                      Generate QR Code
                    </>
                  )}
                </button>

                {qrCodeData && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg text-center">
                    <div className="w-48 h-48 bg-white border-2 border-purple-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-purple-400" />
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* QR Code Gallery */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Image className="w-5 h-5 text-indigo-600" />
                QR Code Gallery
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {distributions
                  .filter((d) => d.distributionType === 'qr')
                  .map((dist) => (
                    <div
                      key={dist.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-sm text-gray-800 mb-1">{dist.testTitle}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{dist.analytics.views} scans</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dist.status)}`}
                        >
                          {dist.status}
                        </span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <button className="flex-1 px-2 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors min-h-[44px]">
                          <Download className="w-3 h-3 inline mr-1" />
                          Download
                        </button>
                        <button className="flex-1 px-2 py-2 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors min-h-[44px]">
                          <Eye className="w-3 h-3 inline mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Email Invitations */}
        {activeTab === 'email' && (
          <motion.div
            key="email"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Email Composer */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                Send Email Invitations
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients (comma-separated emails)
                  </label>
                  <textarea
                    value={emailSettings.recipients}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, recipients: e.target.value })
                    }
                    placeholder="student1@example.com, student2@example.com"
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={emailSettings.subject}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, subject: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={emailSettings.message}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule Send (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={emailSettings.scheduleDate}
                      onChange={(e) =>
                        setEmailSettings({ ...emailSettings, scheduleDate: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={emailSettings.sendCopy}
                        onChange={(e) =>
                          setEmailSettings({ ...emailSettings, sendCopy: e.target.checked })
                        }
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Send copy to me</span>
                    </label>
                  </div>
                </div>

                <button
                  onClick={sendEmailInvitations}
                  disabled={loading || !emailSettings.recipients.trim()}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {emailSettings.scheduleDate ? 'Schedule Emails' : 'Send Emails'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Email History */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-600" />
                Email Campaign History
              </h3>

              <div className="space-y-3">
                {distributions
                  .filter((d) => d.distributionType === 'email')
                  .map((dist) => (
                    <div key={dist.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{dist.testTitle}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dist.status)}`}
                        >
                          {dist.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{dist.subject}</p>
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Recipients:</span> {dist.recipients.length}
                        </div>
                        <div>
                          <span className="font-medium">Sent:</span> {dist.createdAt}
                        </div>
                        <div>
                          <span className="font-medium">Opens:</span> {dist.analytics.views}
                        </div>
                        <div>
                          <span className="font-medium">Clicks:</span> {dist.analytics.starts}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                          View Details
                        </button>
                        <button className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                          Resend
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* SMS Notifications */}
        {activeTab === 'sms' && (
          <motion.div
            key="sms"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* SMS Composer */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                Send SMS Notifications
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Numbers (comma-separated)
                  </label>
                  <textarea
                    value={smsSettings.recipients}
                    onChange={(e) => setSmsSettings({ ...smsSettings, recipients: e.target.value })}
                    placeholder="+1234567890, +0987654321"
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (160 characters max)
                  </label>
                  <textarea
                    value={smsSettings.message}
                    onChange={(e) => setSmsSettings({ ...smsSettings, message: e.target.value })}
                    rows={3}
                    maxLength={160}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {smsSettings.message.length}/160 characters
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMS Provider
                    </label>
                    <select
                      value={smsSettings.provider}
                      onChange={(e) => setSmsSettings({ ...smsSettings, provider: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    >
                      <option value="twilio">Twilio</option>
                      <option value="aws-sns">AWS SNS</option>
                      <option value="textlocal">TextLocal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule Send (Optional)
                    </label>
                    <input
                      type="datetime-local"
                      value={smsSettings.scheduleDate}
                      onChange={(e) =>
                        setSmsSettings({ ...smsSettings, scheduleDate: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Cost Estimate</h4>
                  <div className="text-sm text-blue-700">
                    <p>
                      Recipients: {smsSettings.recipients.split(',').filter((r) => r.trim()).length}
                    </p>
                    <p>Cost per SMS: $0.02</p>
                    <p className="font-medium">
                      Total: $
                      {(
                        smsSettings.recipients.split(',').filter((r) => r.trim()).length * 0.02
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={sendSMSNotifications}
                  disabled={loading || !smsSettings.recipients.trim()}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {smsSettings.scheduleDate ? 'Schedule SMS' : 'Send SMS'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* SMS History */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-600" />
                SMS Campaign History
              </h3>

              <div className="space-y-3">
                {distributions
                  .filter((d) => d.distributionType === 'sms')
                  .map((dist) => (
                    <div key={dist.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-800">{dist.testTitle}</h4>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dist.status)}`}
                        >
                          {dist.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{dist.message}</p>
                      <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                        <div>
                          <span className="font-medium">Recipients:</span> {dist.recipients.length}
                        </div>
                        <div>
                          <span className="font-medium">Sent:</span> {dist.createdAt}
                        </div>
                        <div>
                          <span className="font-medium">Delivered:</span> {dist.analytics.views}
                        </div>
                        <div>
                          <span className="font-medium">Clicks:</span> {dist.analytics.starts}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* LMS Integration */}
        {activeTab === 'lms' && (
          <motion.div
            key="lms"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* LMS Connections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  LMS Integrations
                </h3>

                <div className="space-y-4">
                  {lmsIntegrations.map((lms) => (
                    <div key={lms.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${lms.isConnected ? 'bg-green-600' : 'bg-red-500'}`}
                          />
                          <h4 className="font-medium text-gray-800">{lms.name}</h4>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {lms.type}
                          </span>
                        </div>
                        <button
                          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                            lms.isConnected
                              ? 'bg-red-100 text-red-600 hover:bg-red-200'
                              : 'bg-green-100 text-green-600 hover:bg-green-200'
                          }`}
                        >
                          {lms.isConnected ? 'Disconnect' : 'Connect'}
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>URL: {lms.baseUrl}</p>
                        <p>Courses: {lms.courseCount}</p>
                        <p>Last Sync: {new Date(lms.lastSync).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}

                  <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add New LMS Integration
                  </button>
                </div>
              </div>

              {/* Test Distribution to LMS */}
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  Distribute to LMS
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select LMS
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Choose LMS...</option>
                      {lmsIntegrations
                        .filter((lms) => lms.isConnected)
                        .map((lms) => (
                          <option key={lms.id} value={lms.id}>
                            {lms.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Course
                    </label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option value="">Choose course...</option>
                      <option value="bio-101">Biology 101</option>
                      <option value="bio-advanced">Advanced Biology</option>
                      <option value="neet-prep">NEET Preparation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Test Availability
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="datetime-local"
                        placeholder="Start date"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <input
                        type="datetime-local"
                        placeholder="End date"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Sync grades back to LMS</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Send completion notifications
                      </span>
                    </label>
                  </div>

                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Deploy to LMS
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Embed in Website */}
        {activeTab === 'embed' && (
          <motion.div
            key="embed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Embed Options */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-green-600" />
                Embed Configuration
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
                    <input
                      type="text"
                      value={embedOptions.width}
                      onChange={(e) => setEmbedOptions({ ...embedOptions, width: e.target.value })}
                      placeholder="100%"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <input
                      type="text"
                      value={embedOptions.height}
                      onChange={(e) => setEmbedOptions({ ...embedOptions, height: e.target.value })}
                      placeholder="600px"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                  <select
                    value={embedOptions.theme}
                    onChange={(e) =>
                      setEmbedOptions({ ...embedOptions, theme: e.target.value as any })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={embedOptions.showHeader}
                      onChange={(e) =>
                        setEmbedOptions({ ...embedOptions, showHeader: e.target.checked })
                      }
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show header</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={embedOptions.showFooter}
                      onChange={(e) =>
                        setEmbedOptions({ ...embedOptions, showFooter: e.target.checked })
                      }
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Show footer</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={embedOptions.autoStart}
                      onChange={(e) =>
                        setEmbedOptions({ ...embedOptions, autoStart: e.target.checked })
                      }
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Auto-start test</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={embedOptions.responsiveMode}
                      onChange={(e) =>
                        setEmbedOptions({ ...embedOptions, responsiveMode: e.target.checked })
                      }
                      className="rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Responsive mode</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom CSS</label>
                  <textarea
                    value={embedOptions.customCSS}
                    onChange={(e) =>
                      setEmbedOptions({ ...embedOptions, customCSS: e.target.value })
                    }
                    placeholder="/* Custom CSS styles */"
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent font-mono text-sm"
                  />
                </div>

                <button
                  onClick={generateEmbedCode}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Code className="w-4 h-4" />
                  Generate Embed Code
                </button>
              </div>
            </div>

            {/* Generated Embed Code */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-blue-600" />
                Generated Embed Code
              </h3>

              {embedCode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      HTML Embed Code
                    </label>
                    <div className="relative">
                      <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto font-mono">
                        <code>{embedCode}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(embedCode)}
                        className="absolute top-2 right-2 p-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Integration Instructions</h4>
                    <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                      <li>Copy the embed code above</li>
                      <li>Paste it into your website's HTML</li>
                      <li>Customize the styling as needed</li>
                      <li>Test the integration</li>
                    </ol>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Code className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>
                    Configure your embed options and click "Generate Embed Code" to get started.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Offline Test Package */}
        {activeTab === 'offline' && (
          <motion.div
            key="offline"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Offline Package Creator */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-600" />
                Create Offline Package
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Name
                  </label>
                  <input
                    type="text"
                    placeholder="NEET Biology Offline Test"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Type
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option value="standalone">Standalone Application</option>
                    <option value="browser">Browser-based (HTML)</option>
                    <option value="mobile">Mobile App Package</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                    <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option value="windows">Windows</option>
                      <option value="macos">macOS</option>
                      <option value="linux">Linux</option>
                      <option value="android">Android</option>
                      <option value="ios">iOS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include answer key</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow multiple attempts</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Generate results report</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Password protect</span>
                  </label>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-medium text-orange-800 mb-2">Package Contents</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Test application executable</li>
                    <li>• Question database (encrypted)</li>
                    <li>• Installation instructions</li>
                    <li>• User manual</li>
                    <li>• Results export utility</li>
                  </ul>
                </div>

                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <Package className="w-4 h-4" />
                  Create Package
                </button>
              </div>
            </div>

            {/* Package History */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <WifiOff className="w-5 h-5 text-gray-600" />
                Offline Packages
              </h3>

              <div className="space-y-4">
                {[
                  {
                    name: 'NEET Biology Mock Test 1',
                    platform: 'Windows',
                    size: '45.2 MB',
                    downloads: 23,
                    created: '2024-01-15',
                  },
                  {
                    name: 'Cell Biology Quiz',
                    platform: 'Android',
                    size: '32.1 MB',
                    downloads: 12,
                    created: '2024-01-14',
                  },
                ].map((pkg, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{pkg.name}</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">
                        Ready
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-3">
                      <div>
                        <span className="font-medium">Platform:</span> {pkg.platform}
                      </div>
                      <div>
                        <span className="font-medium">Size:</span> {pkg.size}
                      </div>
                      <div>
                        <span className="font-medium">Downloads:</span> {pkg.downloads}
                      </div>
                      <div>
                        <span className="font-medium">Created:</span> {pkg.created}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 px-3 py-2 bg-orange-600 text-white text-xs rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                      <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-600 text-xs rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                        <Copy className="w-3 h-3" />
                        Copy Link
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Print-Friendly Version */}
        {activeTab === 'print' && (
          <motion.div
            key="print"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Print Configuration */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Printer className="w-5 h-5 text-gray-600" />
                Print Configuration
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paper Size
                    </label>
                    <select
                      value={printOptions.paperSize}
                      onChange={(e) =>
                        setPrintOptions({ ...printOptions, paperSize: e.target.value as any })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="A4">A4</option>
                      <option value="A3">A3</option>
                      <option value="Letter">Letter</option>
                      <option value="Legal">Legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Orientation
                    </label>
                    <select
                      value={printOptions.orientation}
                      onChange={(e) =>
                        setPrintOptions({ ...printOptions, orientation: e.target.value as any })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="portrait">Portrait</option>
                      <option value="landscape">Landscape</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Questions per Page
                    </label>
                    <input
                      type="number"
                      value={printOptions.questionsPerPage}
                      onChange={(e) =>
                        setPrintOptions({
                          ...printOptions,
                          questionsPerPage: parseInt(e.target.value),
                        })
                      }
                      min="1"
                      max="20"
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Size
                    </label>
                    <select
                      value={printOptions.fontSize}
                      onChange={(e) =>
                        setPrintOptions({ ...printOptions, fontSize: e.target.value as any })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Margins</label>
                  <input
                    type="text"
                    value={printOptions.margins}
                    onChange={(e) => setPrintOptions({ ...printOptions, margins: e.target.value })}
                    placeholder="1in"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Watermark Text
                  </label>
                  <input
                    type="text"
                    value={printOptions.watermark}
                    onChange={(e) =>
                      setPrintOptions({ ...printOptions, watermark: e.target.value })
                    }
                    placeholder="CONFIDENTIAL"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={printOptions.includeAnswerKey}
                      onChange={(e) =>
                        setPrintOptions({ ...printOptions, includeAnswerKey: e.target.checked })
                      }
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include answer key</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={printOptions.includeInstructions}
                      onChange={(e) =>
                        setPrintOptions({ ...printOptions, includeInstructions: e.target.checked })
                      }
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include instructions</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={printOptions.headerFooter}
                      onChange={(e) =>
                        setPrintOptions({ ...printOptions, headerFooter: e.target.checked })
                      }
                      className="rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Include header and footer</span>
                  </label>
                </div>

                <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Generate Print Version
                </button>
              </div>
            </div>

            {/* Print Preview */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-600" />
                Print Preview
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-100 p-6 rounded-lg min-h-96">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-center mb-4">
                      <h4 className="font-bold text-lg">NEET Biology Mock Test 1</h4>
                      <p className="text-sm text-gray-600">Time: 3 hours | Total Marks: 200</p>
                    </div>

                    <div className="space-y-4">
                      <div className="border-b pb-2">
                        <p className="font-medium">
                          1. Which of the following is the powerhouse of the cell?
                        </p>
                        <div className="ml-4 space-y-1 text-sm">
                          <p>a) Nucleus</p>
                          <p>b) Mitochondria</p>
                          <p>c) Chloroplast</p>
                          <p>d) Ribosome</p>
                        </div>
                      </div>

                      <div className="border-b pb-2">
                        <p className="font-medium">2. The process of photosynthesis occurs in:</p>
                        <div className="ml-4 space-y-1 text-sm">
                          <p>a) Mitochondria</p>
                          <p>b) Nucleus</p>
                          <p>c) Chloroplast</p>
                          <p>d) Vacuole</p>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 text-center">
                        ... more questions ...
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button className="flex-1 px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Distribution Analytics Overview */}
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Distribution Analytics Overview
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{distributions.length}</div>
            <div className="text-sm text-blue-600">Total Distributions</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">
              {distributions.reduce((sum, d) => sum + d.analytics.views, 0)}
            </div>
            <div className="text-sm text-green-600">Total Views</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">
              {distributions.reduce((sum, d) => sum + d.analytics.starts, 0)}
            </div>
            <div className="text-sm text-purple-600">Test Starts</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">
              {distributions.reduce((sum, d) => sum + d.analytics.completions, 0)}
            </div>
            <div className="text-sm text-orange-600">Completions</div>
          </div>
        </div>

        <div className="space-y-3">
          {distributions.slice(0, 5).map((dist) => {
            const Icon = getDistributionIcon(dist.distributionType)
            return (
              <div
                key={dist.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-800">{dist.testTitle}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dist.status)}`}
                      >
                        {dist.status}
                      </span>
                      <span>{dist.distributionType}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-gray-800 font-medium">{dist.analytics.views} views</div>
                  <div className="text-gray-500">{dist.analytics.completions} completed</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Distribution
