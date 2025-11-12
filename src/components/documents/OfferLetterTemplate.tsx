import React from 'react'
import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer'

Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
})

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    fontSize: 11,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    padding: 20,
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    borderRadius: 8,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtext: {
    fontSize: 12,
    color: '#e0e7ff',
    textAlign: 'center',
  },
  offerIdBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#fef3c7',
    borderRadius: 6,
    borderLeft: '4px solid #f59e0b',
  },
  offerIdText: {
    fontSize: 10,
    color: '#92400e',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 10,
    paddingBottom: 6,
    borderBottom: '2px solid #e0e7ff',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingVertical: 4,
  },
  detailLabel: {
    width: '40%',
    fontSize: 10,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  detailValue: {
    width: '60%',
    fontSize: 10,
    color: '#1f2937',
  },
  feeBox: {
    backgroundColor: '#f0fdf4',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    border: '1px solid #86efac',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  feeLabel: {
    fontSize: 11,
    color: '#166534',
    fontWeight: 'bold',
  },
  feeValue: {
    fontSize: 11,
    color: '#166534',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTop: '2px solid #86efac',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#15803d',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#15803d',
  },
  table: {
    marginTop: 12,
    border: '1px solid #e5e7eb',
    borderRadius: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderBottom: '2px solid #d1d5db',
  },
  tableHeaderCell: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottom: '1px solid #e5e7eb',
  },
  tableCell: {
    fontSize: 9,
    color: '#4b5563',
  },
  col1: { width: '10%' },
  col2: { width: '35%' },
  col3: { width: '30%' },
  col4: { width: '25%', textAlign: 'right' },
  termsBox: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    border: '1px solid #fecaca',
  },
  termsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#991b1b',
    marginBottom: 10,
  },
  termItem: {
    fontSize: 9,
    color: '#7f1d1d',
    marginBottom: 6,
    paddingLeft: 12,
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
  },
  signatureLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 30,
  },
  signatureLine: {
    borderTop: '1px solid #9ca3af',
    marginBottom: 4,
  },
  signatureName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    paddingTop: 16,
    borderTop: '1px solid #e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#9ca3af',
  },
  validityWarning: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 6,
    marginTop: 16,
    border: '1px solid #fbbf24',
  },
  validityText: {
    fontSize: 9,
    color: '#92400e',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export interface OfferLetterData {
  offerId: string
  offerCode: string
  validUntil: string
  student: {
    name: string
    email: string
    phone: string
    parentName?: string
  }
  course: {
    name: string
    batch?: string
    startDate?: string
  }
  fees: {
    originalPrice: number
    discountType: string
    discountValue: number
    discountAmount: number
    finalPrice: number
  }
  installments: Array<{
    installmentNumber: number
    description: string
    dueDate: string
    amount: number
  }>
  terms: string[]
  counselor: {
    name: string
  }
  generatedDate: string
}

const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const OfferLetterTemplate: React.FC<{ data: OfferLetterData }> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>CEREBRUM BIOLOGY ACADEMY</Text>
          <Text style={styles.headerSubtext}>Offer Letter - Exclusive Education Package</Text>
        </View>

        <View style={styles.offerIdBox}>
          <Text style={styles.offerIdText}>
            Offer ID: {data.offerCode} | Valid Until: {formatDate(data.validUntil)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Student Name:</Text>
            <Text style={styles.detailValue}>{data.student.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{data.student.email || 'N/A'}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailValue}>{data.student.phone}</Text>
          </View>
          {data.student.parentName && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Parent Name:</Text>
              <Text style={styles.detailValue}>{data.student.parentName}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Course:</Text>
            <Text style={styles.detailValue}>{data.course.name}</Text>
          </View>
          {data.course.batch && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Batch:</Text>
              <Text style={styles.detailValue}>{data.course.batch}</Text>
            </View>
          )}
          {data.course.startDate && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Start Date:</Text>
              <Text style={styles.detailValue}>{formatDate(data.course.startDate)}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fee Structure</Text>
          <View style={styles.feeBox}>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>Original Course Fee:</Text>
              <Text style={styles.feeValue}>{formatCurrency(data.fees.originalPrice)}</Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel}>
                Discount (
                {data.fees.discountType === 'PERCENTAGE' ? `${data.fees.discountValue}%` : 'Flat'}):
              </Text>
              <Text style={styles.feeValue}>- {formatCurrency(data.fees.discountAmount)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount Payable:</Text>
              <Text style={styles.totalValue}>{formatCurrency(data.fees.finalPrice)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Schedule</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.col1]}>#</Text>
              <Text style={[styles.tableHeaderCell, styles.col2]}>Description</Text>
              <Text style={[styles.tableHeaderCell, styles.col3]}>Due Date</Text>
              <Text style={[styles.tableHeaderCell, styles.col4]}>Amount</Text>
            </View>
            {data.installments.map((installment, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.col1]}>{installment.installmentNumber}</Text>
                <Text style={[styles.tableCell, styles.col2]}>{installment.description}</Text>
                <Text style={[styles.tableCell, styles.col3]}>
                  {formatDate(installment.dueDate)}
                </Text>
                <Text style={[styles.tableCell, styles.col4]}>
                  {formatCurrency(installment.amount)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.termsBox}>
          <Text style={styles.termsTitle}>Terms & Conditions</Text>
          {data.terms.map((term, index) => (
            <Text key={index} style={styles.termItem}>
              {index + 1}. {term}
            </Text>
          ))}
        </View>

        <View style={styles.validityWarning}>
          <Text style={styles.validityText}>
            ⚠️ This offer is valid until {formatDate(data.validUntil)}. Please confirm your
            enrollment before the expiry date.
          </Text>
        </View>

        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Student Signature</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{data.student.name}</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Counselor</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{data.counselor.name}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Generated: {formatDate(data.generatedDate)}</Text>
          <Text style={styles.footerText}>Offer ID: {data.offerCode}</Text>
        </View>
      </Page>
    </Document>
  )
}
