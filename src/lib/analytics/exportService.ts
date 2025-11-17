import { prisma as db } from '@/lib/database'
import type { ExportOptions, ExportData, ChartData } from '@/lib/types/analytics'
import { performanceAnalytics } from './performanceService'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { AnalyticsReportPDF } from '@/lib/pdf/AnalyticsReportPDF'
import ExcelJS from 'exceljs'

export class ExportService {
  /**
   * Export user performance report
   */
  async exportUserPerformance(userId: string, options: ExportOptions): Promise<ExportData> {
    const performanceData = await performanceAnalytics.getUserPerformanceData(
      userId,
      options.timeRange
    )

    const summary = {
      totalRecords: performanceData.totalTests,
      dateRange: `${options.timeRange.from.toLocaleDateString()} - ${options.timeRange.to.toLocaleDateString()}`,
      generatedAt: new Date(),
    }

    // Prepare data for export
    const data = [
      {
        section: 'Overview',
        metric: 'Total Tests',
        value: performanceData.totalTests,
      },
      {
        section: 'Overview',
        metric: 'Completed Tests',
        value: performanceData.completedTests,
      },
      {
        section: 'Overview',
        metric: 'Average Score (%)',
        value: Math.round(performanceData.averageScore * 100) / 100,
      },
      {
        section: 'Overview',
        metric: 'Total Study Time (minutes)',
        value: Math.round(performanceData.totalStudyTime / 60),
      },
      {
        section: 'Overview',
        metric: 'Current Streak (days)',
        value: performanceData.currentStreak,
      },
      {
        section: 'Overview',
        metric: 'Total Points',
        value: performanceData.totalPoints,
      },
    ]

    // Add topic performance data
    performanceData.topicPerformance.forEach((topic) => {
      data.push({
        section: 'Topic Performance',
        metric: `${topic.topic} - Accuracy (%)`,
        value: Math.round(topic.accuracy * 100) / 100,
      })
      data.push({
        section: 'Topic Performance',
        metric: `${topic.topic} - Questions Attempted`,
        value: topic.totalQuestions,
      })
      data.push({
        section: 'Topic Performance',
        metric: `${topic.topic} - Average Time (seconds)`,
        value: Math.round(topic.averageTime),
      })
    })

    // Add achievements
    performanceData.achievements.forEach((achievement) => {
      data.push({
        section: 'Achievements',
        metric: achievement.title,
        value: achievement.earnedAt ? 1 : 0,
      })
    })

    let charts: ExportData['charts'] = undefined

    if (options.includeCharts) {
      charts = {
        progressTrend: {
          type: 'line',
          data: this.prepareProgressTrendChart(performanceData.progressTrend),
          options: {
            title: 'Performance Progress Over Time',
            xAxis: 'Date',
            yAxis: 'Score (%)',
          },
        },
        topicPerformance: {
          type: 'bar',
          data: this.prepareTopicPerformanceChart(performanceData.topicPerformance),
          options: {
            title: 'Topic-wise Performance',
            xAxis: 'Topics',
            yAxis: 'Accuracy (%)',
          },
        },
      }
    }

    return {
      summary,
      data,
      charts,
    }
  }

  /**
   * Export test session analytics
   */
  async exportTestSession(testAttemptId: string, options: ExportOptions): Promise<ExportData> {
    const sessionData = await performanceAnalytics.getTestSessionAnalytics(testAttemptId)

    const summary = {
      totalRecords: sessionData.questionAnalysis.length,
      dateRange: `Test completed on ${sessionData.submittedAt?.toLocaleDateString() || 'N/A'}`,
      generatedAt: new Date(),
    }

    const data = [
      {
        section: 'Test Overview',
        metric: 'Test Title',
        value: sessionData.title,
      },
      {
        section: 'Test Overview',
        metric: 'Total Questions',
        value: sessionData.totalQuestions,
      },
      {
        section: 'Test Overview',
        metric: 'Correct Answers',
        value: sessionData.correctAnswers,
      },
      {
        section: 'Test Overview',
        metric: 'Accuracy (%)',
        value: Math.round(sessionData.accuracy * 100) / 100,
      },
      {
        section: 'Test Overview',
        metric: 'Score',
        value: `${sessionData.score}/${sessionData.totalMarks}`,
      },
      {
        section: 'Test Overview',
        metric: 'Percentage (%)',
        value: Math.round(sessionData.percentage * 100) / 100,
      },
      {
        section: 'Test Overview',
        metric: 'Time Spent (minutes)',
        value: Math.round(sessionData.timeSpent / 60),
      },
    ]

    // Add question-wise analysis
    sessionData.questionAnalysis.forEach((question, index) => {
      data.push({
        section: 'Question Analysis',
        metric: `Q${index + 1} - Topic`,
        value: question.topic,
      })
      data.push({
        section: 'Question Analysis',
        metric: `Q${index + 1} - Difficulty`,
        value: question.difficulty,
      })
      data.push({
        section: 'Question Analysis',
        metric: `Q${index + 1} - Result`,
        value: question.isCorrect ? 'Correct' : 'Incorrect',
      })
      data.push({
        section: 'Question Analysis',
        metric: `Q${index + 1} - Time Spent (seconds)`,
        value: question.timeSpent,
      })
    })

    // Add topic breakdown
    sessionData.topicBreakdown.forEach((topic) => {
      data.push({
        section: 'Topic Breakdown',
        metric: `${topic.topic} - Correct/Total`,
        value: `${topic.correct}/${topic.total}`,
      })
      data.push({
        section: 'Topic Breakdown',
        metric: `${topic.topic} - Accuracy (%)`,
        value: Math.round((topic.correct / topic.total) * 100),
      })
    })

    let charts: ExportData['charts'] = undefined

    if (options.includeCharts) {
      charts = {
        topicBreakdown: {
          type: 'pie',
          data: this.prepareTopicBreakdownChart(sessionData.topicBreakdown),
          options: {
            title: 'Topic-wise Question Distribution',
            showLabels: true,
          },
        },
        difficultyAnalysis: {
          type: 'bar',
          data: this.prepareDifficultyChart(sessionData.questionAnalysis),
          options: {
            title: 'Performance by Difficulty Level',
            xAxis: 'Difficulty',
            yAxis: 'Accuracy (%)',
          },
        },
      }
    }

    return {
      summary,
      data,
      charts,
    }
  }

  /**
   * Export class analytics (for teachers)
   */
  async exportClassAnalytics(grade: string, options: ExportOptions): Promise<ExportData> {
    const students = await db.freeUser.findMany({
      where: {
        grade,
        ...(options.filters?.grade && { grade: options.filters.grade }),
      },
      include: {
        testAttempts: {
          where: {
            status: 'COMPLETED',
            submittedAt: {
              gte: options.timeRange.from,
              lte: options.timeRange.to,
            },
          },
        },
      },
    })

    const summary = {
      totalRecords: students.length,
      dateRange: `${options.timeRange.from.toLocaleDateString()} - ${options.timeRange.to.toLocaleDateString()}`,
      generatedAt: new Date(),
    }

    const data: any[] = []

    // Class overview
    const totalTests = students.reduce((sum, student) => sum + student.testAttempts.length, 0)
    const totalScore = students.reduce(
      (sum, student) =>
        sum + student.testAttempts.reduce((testSum, test) => testSum + test.percentage, 0),
      0
    )
    const classAverage = totalTests > 0 ? totalScore / totalTests : 0

    data.push(
      {
        section: 'Class Overview',
        metric: 'Total Students',
        value: students.length,
      },
      {
        section: 'Class Overview',
        metric: 'Total Tests Completed',
        value: totalTests,
      },
      {
        section: 'Class Overview',
        metric: 'Class Average (%)',
        value: Math.round(classAverage * 100) / 100,
      }
    )

    // Student-wise performance
    students.forEach((student) => {
      const studentTests = student.testAttempts
      const studentAverage =
        studentTests.length > 0
          ? studentTests.reduce((sum, test) => sum + test.percentage, 0) / studentTests.length
          : 0

      data.push({
        section: 'Student Performance',
        metric: `${student.name || 'Anonymous'} - Tests Completed`,
        value: studentTests.length,
      })
      data.push({
        section: 'Student Performance',
        metric: `${student.name || 'Anonymous'} - Average Score (%)`,
        value: Math.round(studentAverage * 100) / 100,
      })
    })

    let charts: ExportData['charts'] = undefined

    if (options.includeCharts) {
      charts = {
        classDistribution: {
          type: 'bar',
          data: this.prepareClassDistributionChart(students),
          options: {
            title: 'Score Distribution',
            xAxis: 'Score Range',
            yAxis: 'Number of Students',
          },
        },
        studentProgress: {
          type: 'line',
          data: this.prepareStudentProgressChart(students),
          options: {
            title: 'Student Progress Over Time',
            xAxis: 'Date',
            yAxis: 'Average Score (%)',
          },
        },
      }
    }

    return {
      summary,
      data,
      charts,
    }
  }

  /**
   * Generate PDF report
   */
  async generatePDFReport(exportData: ExportData, reportTitle?: string): Promise<Buffer> {
    // Generate PDF using @react-pdf/renderer
    const pdfBuffer = await renderToBuffer(
      React.createElement(AnalyticsReportPDF, {
        data: exportData,
        reportTitle,
      }) as React.ReactElement<any>
    )

    return pdfBuffer as unknown as Buffer
  }

  /**
   * Generate CSV data
   */
  generateCSV(exportData: ExportData): string {
    const headers = ['Section', 'Metric', 'Value']
    const rows = [headers]

    exportData.data.forEach((row) => {
      rows.push([row.section, row.metric, String(row.value)])
    })

    return rows.map((row) => row.join(',')).join('\n')
  }

  /**
   * Generate Excel data
   */
  async generateExcel(exportData: ExportData): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook()

    workbook.creator = 'Cerebrum Biology Academy'
    workbook.created = new Date()
    workbook.modified = new Date()
    workbook.lastPrinted = new Date()

    // Create Summary sheet
    const summarySheet = workbook.addWorksheet('Summary')

    // Style header
    summarySheet.columns = [
      { header: 'Field', key: 'field', width: 25 },
      { header: 'Value', key: 'value', width: 40 },
    ]

    // Add header row styling
    summarySheet.getRow(1).font = { bold: true, size: 12 }
    summarySheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF3B82F6' },
    }
    summarySheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true }

    // Add summary data
    summarySheet.addRow({ field: 'Total Records', value: exportData.summary.totalRecords })
    summarySheet.addRow({ field: 'Date Range', value: exportData.summary.dateRange })
    summarySheet.addRow({
      field: 'Generated At',
      value: exportData.summary.generatedAt.toLocaleString(),
    })

    // Create Performance Data sheet
    const dataSheet = workbook.addWorksheet('Performance Data')

    dataSheet.columns = [
      { header: 'Section', key: 'section', width: 25 },
      { header: 'Metric', key: 'metric', width: 40 },
      { header: 'Value', key: 'value', width: 20 },
    ]

    // Add header row styling
    dataSheet.getRow(1).font = { bold: true, size: 12 }
    dataSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF3B82F6' },
    }
    dataSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true }

    // Add data rows
    exportData.data.forEach((row) => {
      dataSheet.addRow({
        section: row.section,
        metric: row.metric,
        value: row.value,
      })
    })

    // Add alternating row colors
    dataSheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1 && rowNumber % 2 === 0) {
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF3F4F6' },
        }
      }
    })

    // Group data by section and create separate sheets for major sections
    const groupedData = exportData.data.reduce(
      (acc, row) => {
        if (!acc[row.section]) {
          acc[row.section] = []
        }
        acc[row.section].push(row)
        return acc
      },
      {} as Record<string, typeof exportData.data>
    )

    // Create sheets for major sections with more than 5 rows
    Object.entries(groupedData).forEach(([sectionName, sectionData]) => {
      if (sectionData.length > 5) {
        const sectionSheet = workbook.addWorksheet(sectionName.substring(0, 30)) // Excel sheet name limit

        sectionSheet.columns = [
          { header: 'Metric', key: 'metric', width: 40 },
          { header: 'Value', key: 'value', width: 20 },
        ]

        // Header styling
        sectionSheet.getRow(1).font = { bold: true, size: 12 }
        sectionSheet.getRow(1).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF3B82F6' },
        }
        sectionSheet.getRow(1).font = { color: { argb: 'FFFFFFFF' }, bold: true }

        // Add data
        sectionData.forEach((row) => {
          sectionSheet.addRow({
            metric: row.metric,
            value: row.value,
          })
        })

        // Alternating row colors
        sectionSheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1 && rowNumber % 2 === 0) {
            row.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFF3F4F6' },
            }
          }
        })
      }
    })

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  }

  // Chart preparation methods
  private prepareProgressTrendChart(progressData: any[]): any {
    return {
      labels: progressData.map((point) => point.date.toLocaleDateString()),
      datasets: [
        {
          label: 'Score (%)',
          data: progressData.map((point) => Math.round(point.score * 100) / 100),
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
        },
      ],
    }
  }

  private prepareTopicPerformanceChart(topicData: any[]): any {
    return {
      labels: topicData.map((topic) => topic.topic),
      datasets: [
        {
          label: 'Accuracy (%)',
          data: topicData.map((topic) => Math.round(topic.accuracy * 100) / 100),
          backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6',
            '#06B6D4',
            '#84CC16',
            '#F97316',
            '#EC4899',
            '#6366F1',
          ],
        },
      ],
    }
  }

  private prepareTopicBreakdownChart(topicData: any[]): any {
    return {
      labels: topicData.map((topic) => topic.topic),
      datasets: [
        {
          label: 'Questions',
          data: topicData.map((topic) => topic.total),
          backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F59E0B',
            '#EF4444',
            '#8B5CF6',
            '#06B6D4',
            '#84CC16',
            '#F97316',
            '#EC4899',
            '#6366F1',
          ],
        },
      ],
    }
  }

  private prepareDifficultyChart(questionData: any[]): any {
    const difficultyStats = {
      Easy: { correct: 0, total: 0 },
      Medium: { correct: 0, total: 0 },
      Hard: { correct: 0, total: 0 },
    }

    questionData.forEach((question) => {
      const difficulty = question.difficulty as keyof typeof difficultyStats
      if (difficultyStats[difficulty]) {
        difficultyStats[difficulty].total++
        if (question.isCorrect) {
          difficultyStats[difficulty].correct++
        }
      }
    })

    return {
      labels: Object.keys(difficultyStats),
      datasets: [
        {
          label: 'Accuracy (%)',
          data: Object.values(difficultyStats).map((stats) =>
            stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
          ),
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
        },
      ],
    }
  }

  private prepareClassDistributionChart(students: any[]): any {
    const scoreRanges = {
      '0-20': 0,
      '21-40': 0,
      '41-60': 0,
      '61-80': 0,
      '81-100': 0,
    }

    students.forEach((student) => {
      if (student.testAttempts.length === 0) return

      const average =
        student.testAttempts.reduce((sum: number, test: any) => sum + test.percentage, 0) /
        student.testAttempts.length

      if (average <= 20) scoreRanges['0-20']++
      else if (average <= 40) scoreRanges['21-40']++
      else if (average <= 60) scoreRanges['41-60']++
      else if (average <= 80) scoreRanges['61-80']++
      else scoreRanges['81-100']++
    })

    return {
      labels: Object.keys(scoreRanges),
      datasets: [
        {
          label: 'Students',
          data: Object.values(scoreRanges),
          backgroundColor: '#3B82F6',
        },
      ],
    }
  }

  private prepareStudentProgressChart(students: any[]): any {
    // Simplified version - would need more complex logic for actual implementation
    const dates = this.getLast30Days()

    return {
      labels: dates.map((date) => date.toLocaleDateString()),
      datasets: [
        {
          label: 'Class Average (%)',
          data: dates.map(() => Math.random() * 100), // Placeholder data
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
        },
      ],
    }
  }

  private getLast30Days(): Date[] {
    const dates = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      dates.push(date)
    }
    return dates
  }

  private generateHTMLReport(exportData: ExportData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Performance Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .summary { background: #f5f5f5; padding: 15px; margin-bottom: 20px; }
          .section { margin-bottom: 30px; }
          .section h2 { color: #333; border-bottom: 2px solid #3B82F6; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Performance Report</h1>
          <p>Generated on: ${exportData.summary.generatedAt.toLocaleString()}</p>
        </div>

        <div class="summary">
          <h2>Summary</h2>
          <p><strong>Total Records:</strong> ${exportData.summary.totalRecords}</p>
          <p><strong>Date Range:</strong> ${exportData.summary.dateRange}</p>
        </div>

        <div class="section">
          <h2>Performance Data</h2>
          <table>
            <thead>
              <tr>
                <th>Section</th>
                <th>Metric</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              ${exportData.data
                .map(
                  (row) => `
                <tr>
                  <td>${row.section}</td>
                  <td>${row.metric}</td>
                  <td>${row.value}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `
  }
}

export const exportService = new ExportService()
