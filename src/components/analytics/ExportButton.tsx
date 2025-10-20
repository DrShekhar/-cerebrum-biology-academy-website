'use client'

import React, { useState } from 'react'
import { Download, FileText, Table, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ExportButtonProps {
  exportType: 'user_performance' | 'test_session' | 'class_analytics'
  userId?: string
  testAttemptId?: string
  grade?: string
  timeRange?: {
    from: Date
    to: Date
  }
  className?: string
}

export function ExportButton({
  exportType,
  userId,
  testAttemptId,
  grade,
  timeRange,
  className
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const exportData = async (format: 'pdf' | 'csv') => {
    setIsExporting(true)
    try {
      const exportOptions = {
        format,
        timeRange: timeRange || {
          from: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
          to: new Date()
        },
        filters: {
          userId,
          grade,
          testAttemptId
        },
        includeCharts: format === 'pdf',
        includeRawData: true
      }

      const requestBody: any = {
        type: exportType,
        options: exportOptions
      }

      if (userId) requestBody.userId = userId
      if (testAttemptId) requestBody.testAttemptId = testAttemptId
      if (grade) requestBody.grade = grade

      const response = await fetch('/api/analytics/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url

        // Generate filename
        const timestamp = new Date().toISOString().split('T')[0]
        const filename = `${exportType.replace('_', '-')}-${timestamp}.${format}`
        a.download = filename

        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)

        setShowOptions(false)
      } else {
        throw new Error('Export failed')
      }
    } catch (error) {
      console.error('Error exporting data:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  if (showOptions) {
    return (
      <div className={`relative ${className}`}>
        <div className="absolute right-0 top-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 space-y-2 min-w-48">
          <Button
            onClick={() => exportData('pdf')}
            disabled={isExporting}
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <FileText className="w-4 h-4 mr-2" />
            )}
            Export as PDF
          </Button>
          <Button
            onClick={() => exportData('csv')}
            disabled={isExporting}
            variant="outline"
            size="sm"
            className="w-full justify-start"
          >
            {isExporting ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Table className="w-4 h-4 mr-2" />
            )}
            Export as CSV
          </Button>
          <Button
            onClick={() => setShowOptions(false)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button
      onClick={() => setShowOptions(true)}
      variant="outline"
      className={`flex items-center gap-2 ${className}`}
      disabled={isExporting}
    >
      <Download className="w-4 h-4" />
      Export
    </Button>
  )
}

interface BulkExportButtonProps {
  exports: Array<{
    type: 'user_performance' | 'test_session' | 'class_analytics'
    label: string
    userId?: string
    testAttemptId?: string
    grade?: string
  }>
  timeRange?: {
    from: Date
    to: Date
  }
  className?: string
}

export function BulkExportButton({ exports, timeRange, className }: BulkExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [currentExport, setCurrentExport] = useState<string | null>(null)

  const exportAll = async (format: 'pdf' | 'csv') => {
    setIsExporting(true)

    try {
      for (const exportItem of exports) {
        setCurrentExport(exportItem.label)

        const exportOptions = {
          format,
          timeRange: timeRange || {
            from: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
            to: new Date()
          },
          filters: {
            userId: exportItem.userId,
            grade: exportItem.grade,
            testAttemptId: exportItem.testAttemptId
          },
          includeCharts: format === 'pdf',
          includeRawData: true
        }

        const requestBody: any = {
          type: exportItem.type,
          options: exportOptions
        }

        if (exportItem.userId) requestBody.userId = exportItem.userId
        if (exportItem.testAttemptId) requestBody.testAttemptId = exportItem.testAttemptId
        if (exportItem.grade) requestBody.grade = exportItem.grade

        const response = await fetch('/api/analytics/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })

        if (response.ok) {
          const blob = await response.blob()
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url

          const timestamp = new Date().toISOString().split('T')[0]
          const filename = `${exportItem.label.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.${format}`
          a.download = filename

          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)

          // Small delay between downloads
          await new Promise(resolve => setTimeout(resolve, 1000))
        } else {
          throw new Error(`Export failed for ${exportItem.label}`)
        }
      }
    } catch (error) {
      console.error('Error in bulk export:', error)
      alert('Some exports may have failed. Please check your downloads.')
    } finally {
      setIsExporting(false)
      setCurrentExport(null)
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        onClick={() => exportAll('pdf')}
        disabled={isExporting}
        variant="outline"
        className="flex items-center gap-2"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {currentExport && <span className="text-sm">Exporting {currentExport}...</span>}
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            Export All PDF
          </>
        )}
      </Button>
      <Button
        onClick={() => exportAll('csv')}
        disabled={isExporting}
        variant="outline"
        className="flex items-center gap-2"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {currentExport && <span className="text-sm">Exporting {currentExport}...</span>}
          </>
        ) : (
          <>
            <Table className="w-4 h-4" />
            Export All CSV
          </>
        )}
      </Button>
    </div>
  )
}

interface QuickExportProps {
  type: 'performance' | 'progress' | 'topics' | 'comparison'
  data: any
  fileName?: string
  className?: string
}

export function QuickExport({ type, data, fileName, className }: QuickExportProps) {
  const [isExporting, setIsExporting] = useState(false)

  const quickExportCSV = () => {
    setIsExporting(true)
    try {
      let csvContent = ''

      switch (type) {
        case 'performance':
          csvContent = generatePerformanceCSV(data)
          break
        case 'progress':
          csvContent = generateProgressCSV(data)
          break
        case 'topics':
          csvContent = generateTopicsCSV(data)
          break
        case 'comparison':
          csvContent = generateComparisonCSV(data)
          break
        default:
          csvContent = JSON.stringify(data)
      }

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName || `${type}-export-${new Date().toISOString().split('T')[0]}.csv`

      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Quick export error:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button
      onClick={quickExportCSV}
      disabled={isExporting || !data}
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 ${className}`}
    >
      {isExporting ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Download className="w-3 h-3" />
      )}
      Quick Export
    </Button>
  )
}

// Helper functions for CSV generation
function generatePerformanceCSV(data: any): string {
  const headers = ['Metric', 'Value']
  const rows = [
    ['Total Tests', data.totalTests || 0],
    ['Average Score', data.averageScore || 0],
    ['Total Study Time', data.totalStudyTime || 0],
    ['Current Streak', data.currentStreak || 0],
    ['Total Points', data.totalPoints || 0]
  ]

  return [headers, ...rows].map(row => row.join(',')).join('\n')
}

function generateProgressCSV(data: any[]): string {
  const headers = ['Date', 'Score', 'Accuracy', 'Tests Completed', 'Study Time']
  const rows = data.map(point => [
    point.date.toLocaleDateString(),
    point.score,
    point.accuracy,
    point.testsCompleted,
    point.studyTime
  ])

  return [headers, ...rows].map(row => row.join(',')).join('\n')
}

function generateTopicsCSV(data: any[]): string {
  const headers = ['Topic', 'Total Questions', 'Correct Answers', 'Accuracy', 'Average Time']
  const rows = data.map(topic => [
    topic.topic,
    topic.totalQuestions,
    topic.correctAnswers,
    topic.accuracy,
    topic.averageTime
  ])

  return [headers, ...rows].map(row => row.join(',')).join('\n')
}

function generateComparisonCSV(data: any): string {
  const headers = ['Metric', 'User Value', 'Class Average', 'Difference']
  const rows = [
    ['Score', data.user.score, data.class.averageScore, data.comparison.scoreComparison],
    ['Tests Taken', data.user.testsTaken, data.class.averageTestsTaken, data.comparison.testsComparison],
    ['Study Time', data.user.studyTime, data.class.averageStudyTime, data.comparison.timeComparison]
  ]

  return [headers, ...rows].map(row => row.join(',')).join('\n')
}