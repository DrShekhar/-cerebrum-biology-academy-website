import { NextRequest, NextResponse } from 'next/server'
import { exportService } from '@/lib/analytics/exportService'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, options, userId, testAttemptId, grade } = body

    if (!type || !options) {
      return NextResponse.json({ error: 'Export type and options are required' }, { status: 400 })
    }

    let exportData

    switch (type) {
      case 'user_performance':
        if (!userId) {
          return NextResponse.json({ error: 'User ID is required for user performance export' }, { status: 400 })
        }
        exportData = await exportService.exportUserPerformance(userId, options)
        break

      case 'test_session':
        if (!testAttemptId) {
          return NextResponse.json({ error: 'Test attempt ID is required for test session export' }, { status: 400 })
        }
        exportData = await exportService.exportTestSession(testAttemptId, options)
        break

      case 'class_analytics':
        if (!grade) {
          return NextResponse.json({ error: 'Grade is required for class analytics export' }, { status: 400 })
        }
        exportData = await exportService.exportClassAnalytics(grade, options)
        break

      default:
        return NextResponse.json({ error: 'Invalid export type' }, { status: 400 })
    }

    // Generate the appropriate format
    let responseData
    let contentType
    let filename

    switch (options.format) {
      case 'csv':
        responseData = exportService.generateCSV(exportData)
        contentType = 'text/csv'
        filename = `${type}_${new Date().toISOString().split('T')[0]}.csv`
        break

      case 'xlsx':
        responseData = exportService.generateExcel(exportData)
        contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        filename = `${type}_${new Date().toISOString().split('T')[0]}.xlsx`
        break

      case 'pdf':
        responseData = await exportService.generatePDFReport(exportData)
        contentType = 'application/pdf'
        filename = `${type}_${new Date().toISOString().split('T')[0]}.pdf`
        break

      default:
        // Return JSON data for preview
        return NextResponse.json({
          success: true,
          data: exportData
        })
    }

    // Return file download response
    return new NextResponse(responseData, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })

  } catch (error) {
    console.error('Error exporting data:', error)
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    )
  }
}