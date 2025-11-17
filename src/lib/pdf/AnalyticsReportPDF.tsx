import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { ExportData } from '@/lib/types/analytics'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: '#3B82F6',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 3,
  },
  summarySection: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  summaryLabel: {
    fontWeight: 'bold',
    width: 120,
    color: '#374151',
  },
  summaryValue: {
    color: '#6B7280',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    padding: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 9,
  },
  tableCellSection: {
    flex: 2,
    fontSize: 9,
    color: '#374151',
  },
  tableCellMetric: {
    flex: 3,
    fontSize: 9,
    color: '#4B5563',
  },
  tableCellValue: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 8,
    borderTop: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
  },
  chartNote: {
    fontSize: 9,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 10,
  },
})

export interface AnalyticsReportPDFProps {
  data: ExportData
  reportTitle?: string
}

export const AnalyticsReportPDF: React.FC<AnalyticsReportPDFProps> = ({
  data,
  reportTitle = 'Performance Analytics Report',
}) => {
  // Group data by section
  const groupedData = data.data.reduce(
    (acc, row) => {
      if (!acc[row.section]) {
        acc[row.section] = []
      }
      acc[row.section].push(row)
      return acc
    },
    {} as Record<string, typeof data.data>
  )

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{reportTitle}</Text>
          <Text style={styles.subtitle}>Cerebrum Biology Academy - NEET Preparation Platform</Text>
          <Text style={styles.subtitle}>
            Generated: {data.summary.generatedAt.toLocaleString()}
          </Text>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Report Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Records:</Text>
            <Text style={styles.summaryValue}>{data.summary.totalRecords}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date Range:</Text>
            <Text style={styles.summaryValue}>{data.summary.dateRange}</Text>
          </View>
        </View>

        {/* Data Sections */}
        {Object.entries(groupedData).map(([sectionName, sectionData], sectionIndex) => (
          <View key={sectionIndex} style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{sectionName}</Text>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={[styles.tableCell, { flex: 3 }]}>Metric</Text>
                <Text style={[styles.tableCell, { flex: 1, textAlign: 'right' }]}>Value</Text>
              </View>

              {/* Table Rows */}
              {sectionData.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { flex: 3 }]}>{row.metric}</Text>
                  <Text
                    style={[styles.tableCell, { flex: 1, textAlign: 'right', fontWeight: 'bold' }]}
                  >
                    {row.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Charts Note */}
        {data.charts && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.chartNote}>
              Note: Charts and visualizations are available in the online dashboard for interactive
              analysis.
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Cerebrum Biology Academy | NEET Biology Excellence Since 2020</Text>
          <Text>This report is confidential and intended for authorized use only.</Text>
        </View>
      </Page>
    </Document>
  )
}
