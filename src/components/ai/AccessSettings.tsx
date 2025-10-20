'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Users,
  UserCheck,
  Lock,
  Globe,
  Smartphone,
  RotateCcw,
  Timer,
  Calendar,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle2,
  Plus,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Save,
  Download,
  Copy
} from 'lucide-react'

// Types and Interfaces
interface ScheduleSettings {
  startDateTime: string
  endDateTime: string
  timezone: string
  autoStart: boolean
  autoEnd: boolean
  gracePeriod: number
  bufferTime: number
}

interface StudentGroup {
  id: string
  name: string
  description: string
  studentCount: number
  students: string[]
  createdDate: string
  lastModified: string
}

interface IndividualAssignment {
  studentId: string
  studentName: string
  email: string
  customSettings: {
    timeLimit?: number
    attempts?: number
    accessCode?: string
    ipRestrictions?: string[]
  }
  assignedDate: string
  status: 'pending' | 'active' | 'completed' | 'expired'
}

interface PasswordProtection {
  enabled: boolean
  accessCode: string
  codeType: 'simple' | 'complex' | 'time-based'
  expiryTime?: string
  maxAttempts: number
  lockoutDuration: number
  showHints: boolean
  hints: string[]
}

interface IPRestriction {
  id: string
  label: string
  ipAddress: string
  range?: string
  type: 'allow' | 'block'
  description: string
  isActive: boolean
}

interface DeviceLimitation {
  enabled: boolean
  maxDevices: number
  deviceTracking: boolean
  blockMultipleLogins: boolean
  sessionTimeout: number
  browserRestrictions: string[]
  operatingSystemRestrictions: string[]
  deviceFingerprinting: boolean
}

interface AttemptLimits {
  enabled: boolean
  maxAttempts: number
  resetPeriod: '24h' | '7d' | '30d' | 'never'
  gracePeriodMinutes: number
  lockoutBehavior: 'block' | 'reduce_time' | 'warning'
  progressSaving: boolean
  resumeEnabled: boolean
}

interface GracePeriodSettings {
  enabled: boolean
  beforeStart: number
  afterEnd: number
  lateSubmissionPenalty: number
  autoGradePenalty: boolean
  notificationSettings: {
    beforeStart: number[]
    beforeEnd: number[]
    afterEnd: number[]
  }
  emergencyExtension: {
    enabled: boolean
    maxExtension: number
    requiresApproval: boolean
  }
}

interface AccessConfiguration {
  schedule: ScheduleSettings
  studentGroups: StudentGroup[]
  individualAssignments: IndividualAssignment[]
  passwordProtection: PasswordProtection
  ipRestrictions: IPRestriction[]
  deviceLimitation: DeviceLimitation
  attemptLimits: AttemptLimits
  gracePeriod: GracePeriodSettings
}

const AccessSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'groups' | 'individual' | 'password' | 'ip' | 'device' | 'attempts' | 'grace'>('schedule')
  const [configuration, setConfiguration] = useState<AccessConfiguration>({
    schedule: {
      startDateTime: '',
      endDateTime: '',
      timezone: 'Asia/Kolkata',
      autoStart: true,
      autoEnd: true,
      gracePeriod: 5,
      bufferTime: 10
    },
    studentGroups: [],
    individualAssignments: [],
    passwordProtection: {
      enabled: false,
      accessCode: '',
      codeType: 'simple',
      maxAttempts: 3,
      lockoutDuration: 15,
      showHints: false,
      hints: []
    },
    ipRestrictions: [],
    deviceLimitation: {
      enabled: false,
      maxDevices: 2,
      deviceTracking: true,
      blockMultipleLogins: true,
      sessionTimeout: 120,
      browserRestrictions: [],
      operatingSystemRestrictions: [],
      deviceFingerprinting: false
    },
    attemptLimits: {
      enabled: false,
      maxAttempts: 1,
      resetPeriod: 'never',
      gracePeriodMinutes: 5,
      lockoutBehavior: 'block',
      progressSaving: true,
      resumeEnabled: false
    },
    gracePeriod: {
      enabled: true,
      beforeStart: 15,
      afterEnd: 10,
      lateSubmissionPenalty: 5,
      autoGradePenalty: false,
      notificationSettings: {
        beforeStart: [24, 2, 0.5],
        beforeEnd: [30, 10, 5],
        afterEnd: [5, 15]
      },
      emergencyExtension: {
        enabled: false,
        maxExtension: 30,
        requiresApproval: true
      }
    }
  })

  const [isValidating, setIsValidating] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])

  // Validation Functions
  const validateSchedule = (): string[] => {
    const errors: string[] = []
    const { schedule } = configuration

    if (!schedule.startDateTime) {
      errors.push('Start date and time is required')
    }

    if (!schedule.endDateTime) {
      errors.push('End date and time is required')
    }

    if (schedule.startDateTime && schedule.endDateTime) {
      const start = new Date(schedule.startDateTime)
      const end = new Date(schedule.endDateTime)

      if (start >= end) {
        errors.push('End time must be after start time')
      }

      if (start < new Date()) {
        errors.push('Start time cannot be in the past')
      }

      const duration = (end.getTime() - start.getTime()) / (1000 * 60)
      if (duration < 30) {
        errors.push('Test duration should be at least 30 minutes')
      }
    }

    return errors
  }

  const validateConfiguration = (): boolean => {
    setIsValidating(true)
    const errors: string[] = []

    // Schedule validation
    errors.push(...validateSchedule())

    // Password validation
    if (configuration.passwordProtection.enabled && !configuration.passwordProtection.accessCode) {
      errors.push('Access code is required when password protection is enabled')
    }

    // Student assignment validation
    if (configuration.studentGroups.length === 0 && configuration.individualAssignments.length === 0) {
      errors.push('At least one student group or individual assignment is required')
    }

    // Device limitation validation
    if (configuration.deviceLimitation.enabled && configuration.deviceLimitation.maxDevices < 1) {
      errors.push('Maximum devices must be at least 1')
    }

    setValidationErrors(errors)
    setIsValidating(false)
    return errors.length === 0
  }

  // Event Handlers
  const addStudentGroup = () => {
    const newGroup: StudentGroup = {
      id: `group_${Date.now()}`,
      name: 'New Group',
      description: '',
      studentCount: 0,
      students: [],
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }

    setConfiguration(prev => ({
      ...prev,
      studentGroups: [...prev.studentGroups, newGroup]
    }))
  }

  const addIndividualAssignment = () => {
    const newAssignment: IndividualAssignment = {
      studentId: `student_${Date.now()}`,
      studentName: '',
      email: '',
      customSettings: {},
      assignedDate: new Date().toISOString(),
      status: 'pending'
    }

    setConfiguration(prev => ({
      ...prev,
      individualAssignments: [...prev.individualAssignments, newAssignment]
    }))
  }

  const addIPRestriction = () => {
    const newRestriction: IPRestriction = {
      id: `ip_${Date.now()}`,
      label: 'New IP Rule',
      ipAddress: '',
      type: 'allow',
      description: '',
      isActive: true
    }

    setConfiguration(prev => ({
      ...prev,
      ipRestrictions: [...prev.ipRestrictions, newRestriction]
    }))
  }

  const generateAccessCode = () => {
    const { codeType } = configuration.passwordProtection
    let code = ''

    switch (codeType) {
      case 'simple':
        code = Math.random().toString(36).substring(2, 8).toUpperCase()
        break
      case 'complex':
        code = Math.random().toString(36).substring(2, 12) + Math.random().toString(10).substring(2, 6)
        break
      case 'time-based':
        code = Date.now().toString(36).toUpperCase()
        break
    }

    setConfiguration(prev => ({
      ...prev,
      passwordProtection: {
        ...prev.passwordProtection,
        accessCode: code
      }
    }))
  }

  const exportConfiguration = () => {
    const dataStr = JSON.stringify(configuration, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `access-settings-${Date.now()}.json`
    link.click()
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
          <div className="p-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Access Settings
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Configure comprehensive access controls including scheduling, security, student management,
          and advanced authentication options for your tests
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'groups', label: 'Groups', icon: Users },
            { id: 'individual', label: 'Individual', icon: UserCheck },
            { id: 'password', label: 'Password', icon: Lock },
            { id: 'ip', label: 'IP Control', icon: Globe },
            { id: 'device', label: 'Devices', icon: Smartphone },
            { id: 'attempts', label: 'Attempts', icon: RotateCcw },
            { id: 'grace', label: 'Grace Period', icon: Timer }
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

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-red-800">Configuration Errors</h4>
          </div>
          <ul className="space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-red-700 text-sm flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0" />
                {error}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Schedule Settings */}
        {activeTab === 'schedule' && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Basic Schedule */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Test Schedule
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={configuration.schedule.startDateTime}
                    onChange={(e) => setConfiguration(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, startDateTime: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={configuration.schedule.endDateTime}
                    onChange={(e) => setConfiguration(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, endDateTime: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={configuration.schedule.timezone}
                    onChange={(e) => setConfiguration(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, timezone: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                    <option value="Australia/Sydney">Australia/Sydney (AEST)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Advanced Schedule Options */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Advanced Options
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Auto Start</label>
                    <p className="text-xs text-gray-500">Automatically start test at scheduled time</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, autoStart: !prev.schedule.autoStart }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.schedule.autoStart ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.schedule.autoStart ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Auto End</label>
                    <p className="text-xs text-gray-500">Automatically end test at scheduled time</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, autoEnd: !prev.schedule.autoEnd }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.schedule.autoEnd ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.schedule.autoEnd ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grace Period (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={configuration.schedule.gracePeriod}
                    onChange={(e) => setConfiguration(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, gracePeriod: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buffer Time (minutes)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={configuration.schedule.bufferTime}
                    onChange={(e) => setConfiguration(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule, bufferTime: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Student Groups */}
        {activeTab === 'groups' && (
          <motion.div
            key="groups"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Student Groups ({configuration.studentGroups.length})
                </h3>
                <button
                  onClick={addStudentGroup}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Group
                </button>
              </div>

              {configuration.studentGroups.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No student groups created yet</p>
                  <p className="text-sm">Create groups to organize your students</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {configuration.studentGroups.map((group, index) => (
                    <div key={group.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-800">{group.name}</h4>
                        <div className="flex gap-1">
                          <button className="text-gray-500 hover:text-blue-600">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{group.description || 'No description'}</p>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">{group.studentCount} students</span>
                        <span className="text-gray-400">{new Date(group.createdDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Individual Assignments */}
        {activeTab === 'individual' && (
          <motion.div
            key="individual"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                  Individual Assignments ({configuration.individualAssignments.length})
                </h3>
                <button
                  onClick={addIndividualAssignment}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Assignment
                </button>
              </div>

              {configuration.individualAssignments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No individual assignments created yet</p>
                  <p className="text-sm">Assign tests to specific students with custom settings</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {configuration.individualAssignments.map((assignment, index) => (
                    <div key={assignment.studentId} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium text-gray-800">{assignment.studentName || 'Unnamed Student'}</p>
                          <p className="text-sm text-gray-500">{assignment.email}</p>
                        </div>

                        <div className="text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            assignment.status === 'active' ? 'bg-green-100 text-green-700' :
                            assignment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {assignment.status}
                          </span>
                        </div>

                        <div className="text-sm text-gray-500">
                          Assigned: {new Date(assignment.assignedDate).toLocaleDateString()}
                        </div>

                        <div className="flex gap-2 justify-end">
                          <button className="text-gray-500 hover:text-blue-600">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Password Protection */}
        {activeTab === 'password' && (
          <motion.div
            key="password"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Password Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-red-600" />
                Password Protection
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Password Protection</label>
                    <p className="text-xs text-gray-500">Require access code to start test</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      passwordProtection: { ...prev.passwordProtection, enabled: !prev.passwordProtection.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.passwordProtection.enabled ? 'bg-red-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.passwordProtection.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.passwordProtection.enabled && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code Type
                      </label>
                      <select
                        value={configuration.passwordProtection.codeType}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          passwordProtection: { ...prev.passwordProtection, codeType: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="simple">Simple (6 characters)</option>
                        <option value="complex">Complex (12+ characters)</option>
                        <option value="time-based">Time-based</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Access Code
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={configuration.passwordProtection.accessCode}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            passwordProtection: { ...prev.passwordProtection, accessCode: e.target.value }
                          }))}
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Enter access code"
                        />
                        <button
                          onClick={generateAccessCode}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          Generate
                        </button>
                        <button
                          onClick={() => navigator.clipboard.writeText(configuration.passwordProtection.accessCode)}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Max Attempts
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={configuration.passwordProtection.maxAttempts}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            passwordProtection: { ...prev.passwordProtection, maxAttempts: parseInt(e.target.value) || 1 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lockout Duration (minutes)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="120"
                          value={configuration.passwordProtection.lockoutDuration}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            passwordProtection: { ...prev.passwordProtection, lockoutDuration: parseInt(e.target.value) || 1 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Password Preview */}
            {configuration.passwordProtection.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600" />
                  Access Code Preview
                </h3>

                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-mono font-bold text-gray-800 mb-2 tracking-wider">
                    {configuration.passwordProtection.accessCode || 'NO CODE SET'}
                  </div>
                  <p className="text-sm text-gray-600">
                    Students will need this code to access the test
                  </p>

                  <div className="mt-4 text-xs text-gray-500 space-y-1">
                    <p>Type: {configuration.passwordProtection.codeType}</p>
                    <p>Max attempts: {configuration.passwordProtection.maxAttempts}</p>
                    <p>Lockout: {configuration.passwordProtection.lockoutDuration} minutes</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* IP Restrictions */}
        {activeTab === 'ip' && (
          <motion.div
            key="ip"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-600" />
                  IP Restrictions ({configuration.ipRestrictions.length})
                </h3>
                <button
                  onClick={addIPRestriction}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add IP Rule
                </button>
              </div>

              {configuration.ipRestrictions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Globe className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No IP restrictions configured</p>
                  <p className="text-sm">Control access based on IP addresses or ranges</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {configuration.ipRestrictions.map((restriction, index) => (
                    <div key={restriction.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        <div>
                          <p className="font-medium text-gray-800">{restriction.label}</p>
                          <p className="text-sm text-gray-500">{restriction.description}</p>
                        </div>

                        <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {restriction.ipAddress}
                        </div>

                        <div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            restriction.type === 'allow' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {restriction.type}
                          </span>
                        </div>

                        <div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            restriction.isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {restriction.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>

                        <div className="flex gap-2 justify-end">
                          <button className="text-gray-500 hover:text-blue-600">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Device Limitations */}
        {activeTab === 'device' && (
          <motion.div
            key="device"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Device Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-purple-600" />
                Device Limitations
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Device Restrictions</label>
                    <p className="text-xs text-gray-500">Limit test access by device type</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      deviceLimitation: { ...prev.deviceLimitation, enabled: !prev.deviceLimitation.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.deviceLimitation.enabled ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.deviceLimitation.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.deviceLimitation.enabled && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Devices per Student
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={configuration.deviceLimitation.maxDevices}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          deviceLimitation: { ...prev.deviceLimitation, maxDevices: parseInt(e.target.value) || 1 }
                        }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Device Tracking</span>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            deviceLimitation: { ...prev.deviceLimitation, deviceTracking: !prev.deviceLimitation.deviceTracking }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.deviceLimitation.deviceTracking ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.deviceLimitation.deviceTracking ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Block Multiple Logins</span>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            deviceLimitation: { ...prev.deviceLimitation, blockMultipleLogins: !prev.deviceLimitation.blockMultipleLogins }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.deviceLimitation.blockMultipleLogins ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.deviceLimitation.blockMultipleLogins ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Device Fingerprinting</span>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            deviceLimitation: { ...prev.deviceLimitation, deviceFingerprinting: !prev.deviceLimitation.deviceFingerprinting }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.deviceLimitation.deviceFingerprinting ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.deviceLimitation.deviceFingerprinting ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        min="30"
                        max="480"
                        value={configuration.deviceLimitation.sessionTimeout}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          deviceLimitation: { ...prev.deviceLimitation, sessionTimeout: parseInt(e.target.value) || 30 }
                        }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Browser & OS Restrictions */}
            {configuration.deviceLimitation.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Platform Restrictions
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allowed Browsers
                    </label>
                    <div className="space-y-2">
                      {['Chrome', 'Firefox', 'Safari', 'Edge'].map(browser => (
                        <label key={browser} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={configuration.deviceLimitation.browserRestrictions.includes(browser)}
                            onChange={(e) => {
                              const browsers = configuration.deviceLimitation.browserRestrictions
                              if (e.target.checked) {
                                setConfiguration(prev => ({
                                  ...prev,
                                  deviceLimitation: {
                                    ...prev.deviceLimitation,
                                    browserRestrictions: [...browsers, browser]
                                  }
                                }))
                              } else {
                                setConfiguration(prev => ({
                                  ...prev,
                                  deviceLimitation: {
                                    ...prev.deviceLimitation,
                                    browserRestrictions: browsers.filter(b => b !== browser)
                                  }
                                }))
                              }
                            }}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">{browser}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allowed Operating Systems
                    </label>
                    <div className="space-y-2">
                      {['Windows', 'macOS', 'Linux', 'iOS', 'Android'].map(os => (
                        <label key={os} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={configuration.deviceLimitation.operatingSystemRestrictions.includes(os)}
                            onChange={(e) => {
                              const systems = configuration.deviceLimitation.operatingSystemRestrictions
                              if (e.target.checked) {
                                setConfiguration(prev => ({
                                  ...prev,
                                  deviceLimitation: {
                                    ...prev.deviceLimitation,
                                    operatingSystemRestrictions: [...systems, os]
                                  }
                                }))
                              } else {
                                setConfiguration(prev => ({
                                  ...prev,
                                  deviceLimitation: {
                                    ...prev.deviceLimitation,
                                    operatingSystemRestrictions: systems.filter(s => s !== os)
                                  }
                                }))
                              }
                            }}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">{os}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Attempt Limits */}
        {activeTab === 'attempts' && (
          <motion.div
            key="attempts"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Attempt Configuration */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-teal-600" />
                Attempt Limits
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Attempt Limits</label>
                    <p className="text-xs text-gray-500">Restrict number of test attempts</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      attemptLimits: { ...prev.attemptLimits, enabled: !prev.attemptLimits.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.attemptLimits.enabled ? 'bg-teal-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.attemptLimits.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.attemptLimits.enabled && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maximum Attempts
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={configuration.attemptLimits.maxAttempts}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          attemptLimits: { ...prev.attemptLimits, maxAttempts: parseInt(e.target.value) || 1 }
                        }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reset Period
                      </label>
                      <select
                        value={configuration.attemptLimits.resetPeriod}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          attemptLimits: { ...prev.attemptLimits, resetPeriod: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="24h">24 Hours</option>
                        <option value="7d">7 Days</option>
                        <option value="30d">30 Days</option>
                        <option value="never">Never</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lockout Behavior
                      </label>
                      <select
                        value={configuration.attemptLimits.lockoutBehavior}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          attemptLimits: { ...prev.attemptLimits, lockoutBehavior: e.target.value as any }
                        }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="block">Block Access</option>
                        <option value="reduce_time">Reduce Time</option>
                        <option value="warning">Warning Only</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Save Progress</span>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            attemptLimits: { ...prev.attemptLimits, progressSaving: !prev.attemptLimits.progressSaving }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.attemptLimits.progressSaving ? 'bg-teal-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.attemptLimits.progressSaving ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Allow Resume</span>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            attemptLimits: { ...prev.attemptLimits, resumeEnabled: !prev.attemptLimits.resumeEnabled }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.attemptLimits.resumeEnabled ? 'bg-teal-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.attemptLimits.resumeEnabled ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Attempt Summary */}
            {configuration.attemptLimits.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Attempt Policy Summary
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">Policy Overview</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Students can attempt the test {configuration.attemptLimits.maxAttempts} time(s)</li>
                      <li>• Attempts reset {configuration.attemptLimits.resetPeriod === 'never' ? 'never' : `every ${configuration.attemptLimits.resetPeriod}`}</li>
                      <li>• When limit reached: {configuration.attemptLimits.lockoutBehavior.replace('_', ' ')}</li>
                      <li>• Progress saving: {configuration.attemptLimits.progressSaving ? 'Enabled' : 'Disabled'}</li>
                      <li>• Resume capability: {configuration.attemptLimits.resumeEnabled ? 'Enabled' : 'Disabled'}</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <h5 className="text-sm font-medium text-amber-800">Important Notes</h5>
                    </div>
                    <ul className="text-xs text-amber-700 space-y-1">
                      <li>• Attempt counting starts when student begins the test</li>
                      <li>• Technical failures may not count as attempts (configurable)</li>
                      <li>• Administrators can reset individual student attempts</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Grace Period */}
        {activeTab === 'grace' && (
          <motion.div
            key="grace"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Grace Period Settings */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Timer className="w-5 h-5 text-indigo-600" />
                Grace Period Settings
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Enable Grace Period</label>
                    <p className="text-xs text-gray-500">Allow flexibility in test timing</p>
                  </div>
                  <button
                    onClick={() => setConfiguration(prev => ({
                      ...prev,
                      gracePeriod: { ...prev.gracePeriod, enabled: !prev.gracePeriod.enabled }
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      configuration.gracePeriod.enabled ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        configuration.gracePeriod.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {configuration.gracePeriod.enabled && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Before Start (minutes)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="60"
                          value={configuration.gracePeriod.beforeStart}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            gracePeriod: { ...prev.gracePeriod, beforeStart: parseInt(e.target.value) || 0 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          After End (minutes)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="60"
                          value={configuration.gracePeriod.afterEnd}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            gracePeriod: { ...prev.gracePeriod, afterEnd: parseInt(e.target.value) || 0 }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Late Submission Penalty (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={configuration.gracePeriod.lateSubmissionPenalty}
                        onChange={(e) => setConfiguration(prev => ({
                          ...prev,
                          gracePeriod: { ...prev.gracePeriod, lateSubmissionPenalty: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Auto Grade Penalty</span>
                        <p className="text-xs text-gray-500">Automatically apply penalty to late submissions</p>
                      </div>
                      <button
                        onClick={() => setConfiguration(prev => ({
                          ...prev,
                          gracePeriod: { ...prev.gracePeriod, autoGradePenalty: !prev.gracePeriod.autoGradePenalty }
                        }))}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                          configuration.gracePeriod.autoGradePenalty ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                            configuration.gracePeriod.autoGradePenalty ? 'translate-x-5' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Emergency Extension */}
            {configuration.gracePeriod.enabled && (
              <div className="bg-white rounded-xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Emergency Extension
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Enable Emergency Extension</span>
                      <p className="text-xs text-gray-500">Allow emergency time extensions</p>
                    </div>
                    <button
                      onClick={() => setConfiguration(prev => ({
                        ...prev,
                        gracePeriod: {
                          ...prev.gracePeriod,
                          emergencyExtension: {
                            ...prev.gracePeriod.emergencyExtension,
                            enabled: !prev.gracePeriod.emergencyExtension.enabled
                          }
                        }
                      }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        configuration.gracePeriod.emergencyExtension.enabled ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          configuration.gracePeriod.emergencyExtension.enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {configuration.gracePeriod.emergencyExtension.enabled && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum Extension (minutes)
                        </label>
                        <input
                          type="number"
                          min="5"
                          max="120"
                          value={configuration.gracePeriod.emergencyExtension.maxExtension}
                          onChange={(e) => setConfiguration(prev => ({
                            ...prev,
                            gracePeriod: {
                              ...prev.gracePeriod,
                              emergencyExtension: {
                                ...prev.gracePeriod.emergencyExtension,
                                maxExtension: parseInt(e.target.value) || 5
                              }
                            }
                          }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Requires Approval</span>
                        <button
                          onClick={() => setConfiguration(prev => ({
                            ...prev,
                            gracePeriod: {
                              ...prev.gracePeriod,
                              emergencyExtension: {
                                ...prev.gracePeriod.emergencyExtension,
                                requiresApproval: !prev.gracePeriod.emergencyExtension.requiresApproval
                              }
                            }
                          }))}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            configuration.gracePeriod.emergencyExtension.requiresApproval ? 'bg-red-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              configuration.gracePeriod.emergencyExtension.requiresApproval ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-blue-800 mb-2">Grace Period Summary</h5>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• Early access: {configuration.gracePeriod.beforeStart} minutes before start</li>
                      <li>• Late submission: {configuration.gracePeriod.afterEnd} minutes after end</li>
                      <li>• Late penalty: {configuration.gracePeriod.lateSubmissionPenalty}% reduction</li>
                      <li>• Emergency extension: up to {configuration.gracePeriod.emergencyExtension.maxExtension} minutes</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-between items-center bg-white rounded-xl p-6 border">
        <div className="flex gap-3">
          <button
            onClick={validateConfiguration}
            disabled={isValidating}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isValidating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Validate Configuration
              </>
            )}
          </button>

          <button
            onClick={exportConfiguration}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Settings
          </button>
        </div>

        <div className="text-sm text-gray-500">
          {validationErrors.length === 0 ? (
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Configuration Valid
            </span>
          ) : (
            <span className="text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.length} Error(s) Found
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccessSettings