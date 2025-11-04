'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Download,
  Upload,
  FileText,
  File,
  Database,
  Copy,
  Archive,
  Trash2,
  CloudDownload,
  CloudUpload,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Edit3,
  Eye,
  Share2,
  Settings,
  Plus,
  X,
  Folder,
  FolderOpen,
  Tag,
  Star,
  Grid,
  List,
  SortAsc,
  SortDesc,
  ArrowRight,
  ExternalLink,
  Zap,
  Shield,
  Activity,
  Target,
  BookOpen,
  Users,
  Play,
  Pause,
  Square,
  SkipForward,
  Info,
  Bookmark,
  Flag,
  MessageSquare,
  Bell,
  Lock,
  Unlock
} from 'lucide-react'

// Types and Interfaces
interface ExportFormat {
  id: string
  name: string
  extension: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  fileSize: string
  compatibility: string[]
}

interface ExportJob {
  id: string
  format: string
  testId: string
  testName: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  startedAt: string
  completedAt?: string
  downloadUrl?: string
  fileSize?: string
  error?: string
}

interface BackupSettings {
  autoBackup: boolean
  frequency: 'daily' | 'weekly' | 'monthly'
  retention: number
  compression: boolean
  encryption: boolean
  location: 'local' | 'cloud' | 'both'
  includeMedia: boolean
  includeAnalytics: boolean
}

interface Backup {
  id: string
  name: string
  type: 'manual' | 'automatic'
  size: string
  createdAt: string
  testCount: number
  questionCount: number
  status: 'completed' | 'partial' | 'failed'
  location: string
  encrypted: boolean
  downloadUrl?: string
}

interface ImportJob {
  id: string
  fileName: string
  fileSize: string
  format: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  questionsImported: number
  questionsTotal: number
  errors: string[]
  warnings: string[]
  startedAt: string
  completedAt?: string
}

interface TestItem {
  id: string
  name: string
  description: string
  type: 'test' | 'question_bank' | 'template'
  status: 'active' | 'draft' | 'archived' | 'deleted'
  createdAt: string
  updatedAt: string
  createdBy: string
  questionCount: number
  totalMarks: number
  duration: number
  tags: string[]
  category: string
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  usageCount: number
  lastUsed?: string
  size: string
  version: number
  isPublic: boolean
  collaborators: number
}

interface ArchiveRule {
  id: string
  name: string
  condition: 'age' | 'usage' | 'status' | 'size'
  value: string
  action: 'archive' | 'delete' | 'backup'
  enabled: boolean
  lastRun?: string
  itemsProcessed: number
}

const DataManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'backup' | 'duplicate' | 'archive' | 'bulk' | 'qti' | 'settings'>('export')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'usage'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTests, setSelectedTests] = useState<string[]>([])

  // Sample data for demonstration
  const [exportFormats] = useState<ExportFormat[]>([
    {
      id: 'pdf',
      name: 'PDF Document',
      extension: '.pdf',
      description: 'Professional PDF format for printing and sharing',
      icon: FileText,
      features: ['Print-ready', 'Answer keys', 'Layouts', 'Watermarks'],
      fileSize: '2-5 MB',
      compatibility: ['Adobe Reader', 'Web browsers', 'Mobile devices']
    },
    {
      id: 'docx',
      name: 'Microsoft Word',
      extension: '.docx',
      description: 'Editable Word document format',
      icon: File,
      features: ['Editable text', 'Custom formatting', 'Comments', 'Track changes'],
      fileSize: '1-3 MB',
      compatibility: ['Microsoft Word', 'Google Docs', 'LibreOffice']
    },
    {
      id: 'xlsx',
      name: 'Excel Spreadsheet',
      extension: '.xlsx',
      description: 'Structured data format for analysis',
      icon: Database,
      features: ['Data analysis', 'Formulas', 'Charts', 'Pivot tables'],
      fileSize: '500 KB - 2 MB',
      compatibility: ['Microsoft Excel', 'Google Sheets', 'LibreOffice Calc']
    },
    {
      id: 'qti',
      name: 'QTI Standard',
      extension: '.xml',
      description: 'Industry standard for assessment interoperability',
      icon: ExternalLink,
      features: ['LMS compatible', 'Standard format', 'Metadata', 'Interoperable'],
      fileSize: '1-10 MB',
      compatibility: ['Moodle', 'Canvas', 'Blackboard', 'D2L Brightspace']
    }
  ])

  const [exportJobs, setExportJobs] = useState<ExportJob[]>([
    {
      id: 'exp1',
      format: 'PDF',
      testId: 'test1',
      testName: 'NEET Biology Mock Test 1',
      status: 'completed',
      progress: 100,
      startedAt: new Date(Date.now() - 3600000).toISOString(),
      completedAt: new Date(Date.now() - 3300000).toISOString(),
      downloadUrl: '/downloads/test1.pdf',
      fileSize: '3.2 MB'
    },
    {
      id: 'exp2',
      format: 'Excel',
      testId: 'test2',
      testName: 'Cell Biology Questions',
      status: 'processing',
      progress: 65,
      startedAt: new Date(Date.now() - 300000).toISOString()
    }
  ])

  const [importJobs, setImportJobs] = useState<ImportJob[]>([
    {
      id: 'imp1',
      fileName: 'biology_questions_batch1.xlsx',
      fileSize: '2.1 MB',
      format: 'Excel',
      status: 'completed',
      progress: 100,
      questionsImported: 150,
      questionsTotal: 150,
      errors: [],
      warnings: ['3 questions missing difficulty levels'],
      startedAt: new Date(Date.now() - 7200000).toISOString(),
      completedAt: new Date(Date.now() - 6900000).toISOString()
    }
  ])

  const [backups, setBackups] = useState<Backup[]>([
    {
      id: 'backup1',
      name: 'Daily Backup - December 2024',
      type: 'automatic',
      size: '45.2 MB',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      testCount: 25,
      questionCount: 1250,
      status: 'completed',
      location: 'Cloud Storage',
      encrypted: true,
      downloadUrl: '/backups/daily_backup_dec_2024.zip'
    },
    {
      id: 'backup2',
      name: 'Manual Backup - Before Update',
      type: 'manual',
      size: '38.7 MB',
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      testCount: 20,
      questionCount: 980,
      status: 'completed',
      location: 'Local Storage',
      encrypted: false
    }
  ])

  const [testItems, setTestItems] = useState<TestItem[]>([
    {
      id: 'test1',
      name: 'NEET Biology Mock Test 1',
      description: 'Comprehensive test covering all NEET biology topics',
      type: 'test',
      status: 'active',
      createdAt: new Date(Date.now() - 2592000000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
      createdBy: 'Dr. Sarah Johnson',
      questionCount: 50,
      totalMarks: 200,
      duration: 180,
      tags: ['NEET', 'Biology', 'Mock Test'],
      category: 'Competitive Exam',
      subject: 'Biology',
      difficulty: 'medium',
      usageCount: 245,
      lastUsed: new Date(Date.now() - 86400000).toISOString(),
      size: '2.3 MB',
      version: 3,
      isPublic: true,
      collaborators: 3
    },
    {
      id: 'test2',
      name: 'Cell Biology Quick Assessment',
      description: 'Short assessment for cell biology concepts',
      type: 'test',
      status: 'draft',
      createdAt: new Date(Date.now() - 1296000000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
      createdBy: 'Prof. Michael Chen',
      questionCount: 20,
      totalMarks: 80,
      duration: 60,
      tags: ['Cell Biology', 'Quick Test'],
      category: 'Chapter Test',
      subject: 'Biology',
      difficulty: 'easy',
      usageCount: 89,
      size: '1.1 MB',
      version: 1,
      isPublic: false,
      collaborators: 1
    },
    {
      id: 'test3',
      name: 'Genetics Advanced Problems',
      description: 'Advanced genetics problems for NEET preparation',
      type: 'test',
      status: 'archived',
      createdAt: new Date(Date.now() - 7776000000).toISOString(),
      updatedAt: new Date(Date.now() - 2592000000).toISOString(),
      createdBy: 'Dr. Emily Rodriguez',
      questionCount: 35,
      totalMarks: 140,
      duration: 120,
      tags: ['Genetics', 'Advanced', 'NEET'],
      category: 'Topic Test',
      subject: 'Biology',
      difficulty: 'hard',
      usageCount: 156,
      lastUsed: new Date(Date.now() - 2592000000).toISOString(),
      size: '1.8 MB',
      version: 2,
      isPublic: true,
      collaborators: 2
    }
  ])

  const [backupSettings, setBackupSettings] = useState<BackupSettings>({
    autoBackup: true,
    frequency: 'daily',
    retention: 30,
    compression: true,
    encryption: true,
    location: 'cloud',
    includeMedia: true,
    includeAnalytics: false
  })

  const [archiveRules, setArchiveRules] = useState<ArchiveRule[]>([
    {
      id: 'rule1',
      name: 'Archive old drafts',
      condition: 'age',
      value: '90 days',
      action: 'archive',
      enabled: true,
      lastRun: new Date(Date.now() - 86400000).toISOString(),
      itemsProcessed: 12
    },
    {
      id: 'rule2',
      name: 'Delete unused tests',
      condition: 'usage',
      value: 'No usage in 1 year',
      action: 'delete',
      enabled: false,
      itemsProcessed: 0
    }
  ])

  // Event Handlers
  const handleExport = (format: string, testIds: string[]) => {
    const newJob: ExportJob = {
      id: `exp_${Date.now()}`,
      format,
      testId: testIds[0],
      testName: testItems.find(t => t.id === testIds[0])?.name || 'Unknown Test',
      status: 'processing',
      progress: 0,
      startedAt: new Date().toISOString()
    }

    setExportJobs(prev => [newJob, ...prev])

    // Simulate export progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 20
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setExportJobs(prev => prev.map(job =>
          job.id === newJob.id
            ? {
                ...job,
                status: 'completed',
                progress: 100,
                completedAt: new Date().toISOString(),
                downloadUrl: `/downloads/${job.testName.toLowerCase().replace(/\s+/g, '_')}.${format.toLowerCase()}`,
                fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`
              }
            : job
        ))
      } else {
        setExportJobs(prev => prev.map(job =>
          job.id === newJob.id ? { ...job, progress: Math.round(progress) } : job
        ))
      }
    }, 500)
  }

  const handleBulkImport = (file: File) => {
    const newJob: ImportJob = {
      id: `imp_${Date.now()}`,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      format: file.name.split('.').pop()?.toUpperCase() || 'Unknown',
      status: 'processing',
      progress: 0,
      questionsImported: 0,
      questionsTotal: Math.floor(Math.random() * 200) + 50,
      errors: [],
      warnings: [],
      startedAt: new Date().toISOString()
    }

    setImportJobs(prev => [newJob, ...prev])

    // Simulate import progress
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setImportJobs(prev => prev.map(job =>
          job.id === newJob.id
            ? {
                ...job,
                status: 'completed',
                progress: 100,
                questionsImported: job.questionsTotal,
                completedAt: new Date().toISOString(),
                warnings: ['2 questions missing explanations', '1 duplicate question skipped']
              }
            : job
        ))
      } else {
        setImportJobs(prev => prev.map(job =>
          job.id === newJob.id
            ? {
                ...job,
                progress: Math.round(progress),
                questionsImported: Math.round((progress / 100) * job.questionsTotal)
              }
            : job
        ))
      }
    }, 800)
  }

  const createBackup = (name: string) => {
    const newBackup: Backup = {
      id: `backup_${Date.now()}`,
      name: name || `Manual Backup - ${new Date().toLocaleDateString()}`,
      type: 'manual',
      size: `${(Math.random() * 50 + 10).toFixed(1)} MB`,
      createdAt: new Date().toISOString(),
      testCount: testItems.filter(t => t.status === 'active').length,
      questionCount: testItems.reduce((sum, t) => sum + t.questionCount, 0),
      status: 'completed',
      location: backupSettings.location === 'cloud' ? 'Cloud Storage' : 'Local Storage',
      encrypted: backupSettings.encryption,
      downloadUrl: `/backups/${name.toLowerCase().replace(/\s+/g, '_')}.zip`
    }

    setBackups(prev => [newBackup, ...prev])
  }

  const duplicateTest = (testId: string) => {
    const originalTest = testItems.find(t => t.id === testId)
    if (!originalTest) return

    const newTest: TestItem = {
      ...originalTest,
      id: `test_${Date.now()}`,
      name: `${originalTest.name} (Copy)`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usageCount: 0,
      lastUsed: undefined,
      version: 1,
      collaborators: 1
    }

    setTestItems(prev => [newTest, ...prev])
  }

  const archiveTest = (testId: string) => {
    setTestItems(prev => prev.map(test =>
      test.id === testId
        ? { ...test, status: 'archived', updatedAt: new Date().toISOString() }
        : test
    ))
  }

  const restoreTest = (testId: string) => {
    setTestItems(prev => prev.map(test =>
      test.id === testId
        ? { ...test, status: 'active', updatedAt: new Date().toISOString() }
        : test
    ))
  }

  const deleteTest = (testId: string) => {
    setTestItems(prev => prev.filter(test => test.id !== testId))
  }

  const getFilteredTests = () => {
    let filtered = testItems.filter(test =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case 'date':
          aValue = new Date(a.updatedAt).getTime()
          bValue = new Date(b.updatedAt).getTime()
          break
        case 'size':
          aValue = parseFloat(a.size)
          bValue = parseFloat(b.size)
          break
        case 'usage':
          aValue = a.usageCount
          bValue = b.usageCount
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'green',
      draft: 'yellow',
      archived: 'gray',
      deleted: 'red',
      pending: 'yellow',
      processing: 'blue',
      completed: 'green',
      failed: 'red',
      partial: 'orange'
    }
    return colors[status as keyof typeof colors] || 'gray'
  }

  const getStatusBgClass = (status: string) => {
    const color = getStatusColor(status)
    return color === 'green' ? 'bg-green-100' :
      color === 'yellow' ? 'bg-yellow-100' :
      color === 'gray' ? 'bg-gray-100' :
      color === 'red' ? 'bg-red-100' :
      color === 'blue' ? 'bg-blue-100' :
      color === 'orange' ? 'bg-orange-100' : 'bg-gray-100'
  }

  const getStatusTextClass = (status: string) => {
    const color = getStatusColor(status)
    return color === 'green' ? 'text-green-700' :
      color === 'yellow' ? 'text-yellow-700' :
      color === 'gray' ? 'text-gray-700' :
      color === 'red' ? 'text-red-700' :
      color === 'blue' ? 'text-blue-700' :
      color === 'orange' ? 'text-orange-700' : 'text-gray-700'
  }

  const getStatusProgressClass = (status: string) => {
    const color = getStatusColor(status)
    return color === 'green' ? 'bg-green-500' :
      color === 'yellow' ? 'bg-yellow-500' :
      color === 'gray' ? 'bg-gray-500' :
      color === 'red' ? 'bg-red-500' :
      color === 'blue' ? 'bg-blue-500' :
      color === 'orange' ? 'bg-orange-500' : 'bg-gray-500'
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      test: BookOpen,
      question_bank: Database,
      template: Copy
    }
    return icons[type as keyof typeof icons] || BookOpen
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
          <div className="p-3 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Data Management
          </h1>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive data management with export, import, backup, and archival capabilities
          for complete test lifecycle management
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border text-center">
          <div className="text-2xl font-bold text-blue-600">{testItems.filter(t => t.status === 'active').length}</div>
          <div className="text-sm text-blue-800">Active Tests</div>
        </div>
        <div className="bg-white rounded-xl p-4 border text-center">
          <div className="text-2xl font-bold text-green-600">{exportJobs.filter(j => j.status === 'completed').length}</div>
          <div className="text-sm text-green-800">Exports Complete</div>
        </div>
        <div className="bg-white rounded-xl p-4 border text-center">
          <div className="text-2xl font-bold text-purple-600">{backups.length}</div>
          <div className="text-sm text-purple-800">Backups Available</div>
        </div>
        <div className="bg-white rounded-xl p-4 border text-center">
          <div className="text-2xl font-bold text-orange-600">{testItems.filter(t => t.status === 'archived').length}</div>
          <div className="text-sm text-orange-800">Archived Items</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'export', label: 'Export', icon: Download },
            { id: 'import', label: 'Import', icon: Upload },
            { id: 'backup', label: 'Backup', icon: HardDrive },
            { id: 'duplicate', label: 'Duplicate', icon: Copy },
            { id: 'archive', label: 'Archive', icon: Archive },
            { id: 'bulk', label: 'Bulk Ops', icon: Database },
            { id: 'qti', label: 'QTI Export', icon: ExternalLink },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === id
                  ? 'bg-white text-teal-600 shadow-md'
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
        {/* Export to PDF/Word/Excel */}
        {activeTab === 'export' && (
          <motion.div
            key="export"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Export Formats */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Download className="w-5 h-5 text-teal-600" />
                Export Formats
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {exportFormats.map((format) => {
                  const IconComponent = format.icon
                  return (
                    <div key={format.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <IconComponent className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{format.name}</h4>
                          <p className="text-sm text-gray-500">{format.extension}</p>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{format.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="text-xs text-gray-500">Features:</div>
                        <div className="flex flex-wrap gap-1">
                          {format.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                          {format.features.length > 2 && (
                            <span className="text-xs text-gray-400">+{format.features.length - 2}</span>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mb-3">
                        Size: {format.fileSize}
                      </div>

                      <button
                        onClick={() => handleExport(format.name, selectedTests.length > 0 ? selectedTests : ['test1'])}
                        className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                      >
                        Export as {format.name}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Export Queue */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Export Queue ({exportJobs.length})
              </h3>

              <div className="space-y-4">
                {exportJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{job.testName}</h4>
                        <p className="text-sm text-gray-600">{job.format} export</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgClass(job.status)} ${getStatusTextClass(job.status)}`}>
                          {job.status}
                        </span>
                        {job.status === 'completed' && job.downloadUrl && (
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatusProgressClass(job.status)} transition-all duration-300`}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Started: {new Date(job.startedAt).toLocaleString()}</span>
                      {job.completedAt && (
                        <span>Completed: {new Date(job.completedAt).toLocaleString()}</span>
                      )}
                      {job.fileSize && (
                        <span>Size: {job.fileSize}</span>
                      )}
                    </div>

                    {job.error && (
                      <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                        Error: {job.error}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {exportJobs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Download className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No exports in progress</p>
                  <p className="text-sm">Select a format above to start exporting</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Bulk Import Questions */}
        {activeTab === 'import' && (
          <motion.div
            key="import"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Import Options */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-600" />
                Bulk Import Questions
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Area */}
                <div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                    <CloudUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h4 className="text-lg font-medium text-gray-700 mb-2">Upload Question File</h4>
                    <p className="text-sm text-gray-500 mb-4">
                      Drag and drop your file here, or click to browse
                    </p>
                    <input
                      type="file"
                      accept=".xlsx,.csv,.json,.xml"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleBulkImport(file)
                      }}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors cursor-pointer inline-block"
                    >
                      Choose File
                    </label>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Supported formats: Excel (.xlsx), CSV (.csv), JSON (.json)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Maximum file size: 50 MB</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Automatic duplicate detection</span>
                    </div>
                  </div>
                </div>

                {/* Import Template */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Import Template</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Download our template to ensure your questions are formatted correctly
                  </p>

                  <div className="space-y-3">
                    <button className="w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2">
                      <File className="w-4 h-4" />
                      Download Excel Template
                    </button>
                    <button className="w-full bg-green-100 text-green-700 py-3 px-4 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Download CSV Template
                    </button>
                    <button className="w-full bg-purple-100 text-purple-700 py-3 px-4 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      View Format Guide
                    </button>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <h5 className="font-medium text-amber-800 mb-2">Required Fields</h5>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Question text</li>
                      <li>• Question type (MCQ, True/False, etc.)</li>
                      <li>• Correct answer</li>
                      <li>• Difficulty level</li>
                      <li>• Topic/Subject</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Import History */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Import History
              </h3>

              <div className="space-y-4">
                {importJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{job.fileName}</h4>
                        <p className="text-sm text-gray-600">{job.format} • {job.fileSize}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgClass(job.status)} ${getStatusTextClass(job.status)}`}>
                        {job.status}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress: {job.questionsImported}/{job.questionsTotal} questions</span>
                        <span>{job.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatusProgressClass(job.status)} transition-all duration-300`}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Warnings/Errors */}
                    {job.warnings.length > 0 && (
                      <div className="mb-2">
                        <div className="text-sm font-medium text-yellow-800 mb-1">Warnings:</div>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          {job.warnings.map((warning, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <AlertCircle className="w-3 h-3 mt-1 flex-shrink-0" />
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {job.errors.length > 0 && (
                      <div className="mb-2">
                        <div className="text-sm font-medium text-red-800 mb-1">Errors:</div>
                        <ul className="text-sm text-red-700 space-y-1">
                          {job.errors.map((error, index) => (
                            <li key={index} className="flex items-start gap-1">
                              <X className="w-3 h-3 mt-1 flex-shrink-0" />
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Started: {new Date(job.startedAt).toLocaleString()}</span>
                      {job.completedAt && (
                        <span>Completed: {new Date(job.completedAt).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {importJobs.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No imports yet</p>
                  <p className="text-sm">Upload your first question file to get started</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Backup Test Data */}
        {activeTab === 'backup' && (
          <motion.div
            key="backup"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Create Backup */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-blue-600" />
                Create Backup
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Manual Backup</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Create an immediate backup of all your test data
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Backup Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter backup name..."
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Include test data
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Include media files
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Include analytics data
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Compress backup
                      </label>
                    </div>

                    <button
                      onClick={() => createBackup('Manual Backup - ' + new Date().toLocaleDateString())}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
                    >
                      <HardDrive className="w-4 h-4" />
                      Create Backup Now
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-3">Backup Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Auto Backup</span>
                        <p className="text-xs text-gray-500">Automatically create backups</p>
                      </div>
                      <button
                        onClick={() => setBackupSettings(prev => ({ ...prev, autoBackup: !prev.autoBackup }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          backupSettings.autoBackup ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            backupSettings.autoBackup ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {backupSettings.autoBackup && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Frequency
                          </label>
                          <select
                            value={backupSettings.frequency}
                            onChange={(e) => setBackupSettings(prev => ({ ...prev, frequency: e.target.value as any }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Retention Period (days)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="365"
                            value={backupSettings.retention}
                            onChange={(e) => setBackupSettings(prev => ({ ...prev, retention: parseInt(e.target.value) || 30 }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Storage Location
                          </label>
                          <select
                            value={backupSettings.location}
                            onChange={(e) => setBackupSettings(prev => ({ ...prev, location: e.target.value as any }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="local">Local Storage</option>
                            <option value="cloud">Cloud Storage</option>
                            <option value="both">Both</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Backup History */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Archive className="w-5 h-5 text-green-600" />
                Backup History ({backups.length})
              </h3>

              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800 flex items-center gap-2">
                          {backup.name}
                          {backup.encrypted && <Lock className="w-4 h-4 text-green-600" />}
                        </h4>
                        <p className="text-sm text-gray-600">{backup.location} • {backup.size}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgClass(backup.status)} ${getStatusTextClass(backup.status)}`}>
                          {backup.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          backup.type === 'automatic' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {backup.type}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">{backup.testCount}</span> tests
                      </div>
                      <div>
                        <span className="font-medium">{backup.questionCount}</span> questions
                      </div>
                      <div>
                        Created: {new Date(backup.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        {backup.encrypted ? (
                          <>
                            <Lock className="w-3 h-3 text-green-600" />
                            <span className="text-green-600">Encrypted</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3 h-3 text-yellow-600" />
                            <span className="text-yellow-600">Unencrypted</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {backup.downloadUrl && (
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          <Download className="w-4 h-4 inline mr-1" />
                          Download
                        </button>
                      )}
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        <RefreshCw className="w-4 h-4 inline mr-1" />
                        Restore
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        <Trash2 className="w-4 h-4 inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {backups.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <HardDrive className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No backups available</p>
                  <p className="text-sm">Create your first backup to secure your data</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Test Duplication */}
        {activeTab === 'duplicate' && (
          <motion.div
            key="duplicate"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Search and Filter */}
            <div className="bg-white rounded-xl p-6 border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Copy className="w-5 h-5 text-purple-600" />
                  Test Duplication ({getFilteredTests().length})
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="name">Name</option>
                    <option value="date">Date</option>
                    <option value="size">Size</option>
                    <option value="usage">Usage</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Test Items */}
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {getFilteredTests().map((test) => {
                  const TypeIcon = getTypeIcon(test.type)
                  return (
                    <div key={test.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                      viewMode === 'list' ? 'flex items-center gap-4' : ''
                    }`}>
                      <div className={viewMode === 'list' ? 'flex-1' : ''}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <TypeIcon className="w-5 h-5 text-purple-600" />
                            <h4 className="font-medium text-gray-800 truncate">{test.name}</h4>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgClass(test.status)} ${getStatusTextClass(test.status)}`}>
                            {test.status}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{test.description}</p>

                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <div>{test.questionCount} questions</div>
                          <div>{test.totalMarks} marks</div>
                          <div>{test.duration} min</div>
                          <div>v{test.version}</div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {test.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                          <span>By {test.createdBy}</span>
                          <span>{new Date(test.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-col' : ''}`}>
                        <button
                          onClick={() => duplicateTest(test.id)}
                          className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          Duplicate
                        </button>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {getFilteredTests().length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Copy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No tests found</p>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Archive Old Tests */}
        {activeTab === 'archive' && (
          <motion.div
            key="archive"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Archive Rules */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Archive className="w-5 h-5 text-orange-600" />
                Archive Rules
              </h3>

              <div className="space-y-4">
                {archiveRules.map((rule) => (
                  <div key={rule.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{rule.name}</h4>
                        <p className="text-sm text-gray-600">
                          {rule.condition === 'age' ? 'Archive items older than' :
                           rule.condition === 'usage' ? 'Archive items with' :
                           rule.condition === 'status' ? 'Archive items with status' :
                           'Archive items larger than'} {rule.value}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setArchiveRules(prev => prev.map(r =>
                            r.id === rule.id ? { ...r, enabled: !r.enabled } : r
                          ))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            rule.enabled ? 'bg-orange-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              rule.enabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>
                        Action: <span className="font-medium capitalize">{rule.action}</span>
                      </span>
                      {rule.lastRun && (
                        <span>Last run: {new Date(rule.lastRun).toLocaleDateString()}</span>
                      )}
                      <span>{rule.itemsProcessed} items processed</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Archive Rule
              </button>
            </div>

            {/* Archived Tests */}
            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Folder className="w-5 h-5 text-gray-600" />
                Archived Tests ({testItems.filter(t => t.status === 'archived').length})
              </h3>

              <div className="space-y-4">
                {testItems.filter(t => t.status === 'archived').map((test) => {
                  const TypeIcon = getTypeIcon(test.type)
                  return (
                    <div key={test.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="w-5 h-5 text-gray-500" />
                          <h4 className="font-medium text-gray-700">{test.name}</h4>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => restoreTest(test.id)}
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            <RefreshCw className="w-4 h-4 inline mr-1" />
                            Restore
                          </button>
                          <button
                            onClick={() => deleteTest(test.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            <Trash2 className="w-4 h-4 inline mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{test.description}</p>

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Archived: {new Date(test.updatedAt).toLocaleDateString()}</span>
                        <span>{test.questionCount} questions • {test.size}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {testItems.filter(t => t.status === 'archived').length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Archive className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No archived tests</p>
                  <p className="text-sm">Tests will appear here when archived</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* QTI Standard Export & Bulk Operations - Additional tabs would go here */}
        {(activeTab === 'bulk' || activeTab === 'qti' || activeTab === 'settings') && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-xl p-6 border"
          >
            <div className="text-center py-12 text-gray-500">
              <Settings className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">{activeTab === 'bulk' ? 'Bulk Operations' : activeTab === 'qti' ? 'QTI Export' : 'Settings'}</p>
              <p className="text-sm">This feature is coming soon</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Data Management Tools</h3>
            <p className="text-gray-600">
              Comprehensive tools for managing your test data lifecycle
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Quick Export
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <HardDrive className="w-4 h-4" />
              Quick Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataManagement