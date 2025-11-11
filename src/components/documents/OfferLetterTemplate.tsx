/**
 * Offer Letter PDF Template
 * Professional offer letter template with Cerebrum Biology Academy branding
 * Uses @react-pdf/renderer for PDF generation
 */

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { format } from 'date-fns'

// Define styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #4f46e5',
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 40,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 8,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 4,
  },
  text: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1f2937',
  },
  detailsGrid: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: '35%',
    fontSize: 10,
    color: '#6b7280',
  },
  detailValue: {
    width: '65%',
    fontSize: 11,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  table: {
    marginTop: 10,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    borderBottom: '2 solid #4f46e5',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1 solid #e5e7eb',
  },
  tableCol1: {
    width: '10%',
    fontSize: 10,
  },
  tableCol2: {
    width: '30%',
    fontSize: 10,
  },
  tableCol3: {
    width: '30%',
    fontSize: 10,
    textAlign: 'right',
  },
  tableCol4: {
    width: '30%',
    fontSize: 10,
    textAlign: 'right',
  },
  summaryBox: {
    backgroundColor: '#f0f9ff',
    border: '2 solid #4f46e5',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#374151',
  },
  summaryValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: '2 solid #4f46e5',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  highlight: {
    backgroundColor: '#fef3c7',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
  },
  highlightText: {
    fontSize: 10,
    color: '#92400e',
    fontWeight: 'bold',
  },
  termsBox: {
    backgroundColor: '#f9fafb',
    border: '1 solid #d1d5db',
    borderRadius: 4,
    padding: 12,
    marginTop: 15,
  },
  termsList: {
    marginTop: 5,
  },
  termItem: {
    fontSize: 9,
    color: '#4b5563',
    marginBottom: 6,
    paddingLeft: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1 solid #e5e7eb',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#9ca3af',
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
  },
  signatureLine: {
    borderTop: '1 solid #374151',
    marginTop: 40,
    paddingTop: 8,
  },
  signatureLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
})

export interface OfferLetterData {
  // Lead information
  studentName: string
  parentName?: string
  email: string
  phone: string
  address?: string

  // Offer details
  offerId: string
  offerDate: Date
  validUntil: Date
  courseName: string
  courseDescription?: string
  batchName?: string
  startDate?: Date

  // Fee details
  originalAmount: number
  discountType: 'PERCENTAGE' | 'FLAT' | 'BUNDLE' | 'NONE'
  discountValue: number
  discountedAmount: number
  totalSavings: number

  // Installment details
  installmentCount: number
  installments: Array<{
    number: number
    dueDate: Date
    amount: number
    description: string
  }>

  // Additional details
  paymentFrequency: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ONE_TIME'
  downPaymentAmount?: number
  termsAndConditions?: string[]
  specialNotes?: string

  // Issuer details
  issuedBy: string
  counselorName: string
  counselorEmail?: string
}

export function OfferLetterTemplate({ data }: { data: OfferLetterData }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return format(new Date(date), 'dd MMM yyyy')
  }

  const getPaymentFrequencyText = (frequency: string) => {
    const map: Record<string, string> = {
      WEEKLY: 'Weekly',
      MONTHLY: 'Monthly',
      QUARTERLY: 'Quarterly',
      ONE_TIME: 'One-time',
    }
    return map[frequency] || frequency
  }

  const defaultTerms = [
    'This offer is valid until the date mentioned above and will expire automatically thereafter.',
    'Admission is subject to availability of seats and completion of the enrollment process.',
    'Fee once paid is non-refundable. However, adjustments can be made for future batches.',
    'Installment payments must be made on or before the due dates mentioned in the fee plan.',
    'Late payment may attract additional charges and affect class access.',
    'Students must maintain 75% attendance to remain enrolled in the course.',
    'Cerebrum Biology Academy reserves the right to modify course schedules with prior notice.',
    'Students are expected to follow the code of conduct and respect academy policies.',
  ]

  const terms = data.termsAndConditions || defaultTerms

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>CEREBRUM BIOLOGY ACADEMY</Text>
          <Text style={styles.tagline}>Excellence in NEET Biology Coaching</Text>
          <Text style={styles.contactInfo}>
            Phone: +91-88264-44334 | Email: info@cerebrumbiologyacademy.com
          </Text>
          <Text style={styles.contactInfo}>Website: www.cerebrumbiologyacademy.com</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Course Offer Letter</Text>

        {/* Offer Details */}
        <View style={styles.section}>
          <View style={styles.detailsGrid}>
            <Text style={styles.detailLabel}>Offer ID:</Text>
            <Text style={styles.detailValue}>{data.offerId}</Text>
          </View>
          <View style={styles.detailsGrid}>
            <Text style={styles.detailLabel}>Issue Date:</Text>
            <Text style={styles.detailValue}>{formatDate(data.offerDate)}</Text>
          </View>
          <View style={styles.detailsGrid}>
            <Text style={styles.detailLabel}>Valid Until:</Text>
            <Text style={styles.detailValue}>{formatDate(data.validUntil)}</Text>
          </View>
        </View>

        {/* Validity Warning */}
        <View style={styles.highlight}>
          <Text style={styles.highlightText}>
            ⚠️ This offer is valid until {formatDate(data.validUntil)}. Please complete enrollment
            before this date.
          </Text>
        </View>

        {/* Student Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Details</Text>
          <View style={styles.detailsGrid}>
            <Text style={styles.detailLabel}>Student Name:</Text>
            <Text style={styles.detailValue}>{data.studentName}</Text>
          </View>
          {data.parentName && (
            <View style={styles.detailsGrid}>
              <Text style={styles.detailLabel}>Parent Name:</Text>
              <Text style={styles.detailValue}>{data.parentName}</Text>
            </View>
          )}
          <View style={styles.detailsGrid}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{data.email}</Text>
          </View>
          <View style={styles.detailsGrid}>
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailValue}>{data.phone}</Text>
          </View>
          {data.address && (
            <View style={styles.detailsGrid}>
              <Text style={styles.detailLabel}>Address:</Text>
              <Text style={styles.detailValue}>{data.address}</Text>
            </View>
          )}
        </View>

        {/* Course Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Details</Text>
          <View style={styles.detailsGrid}>
            <Text style={styles.detailLabel}>Course Name:</Text>
            <Text style={styles.detailValue}>{data.courseName}</Text>
          </View>
          {data.courseDescription && <Text style={styles.text}>{data.courseDescription}</Text>}
          {data.batchName && (
            <View style={styles.detailsGrid}>
              <Text style={styles.detailLabel}>Batch:</Text>
              <Text style={styles.detailValue}>{data.batchName}</Text>
            </View>
          )}
          {data.startDate && (
            <View style={styles.detailsGrid}>
              <Text style={styles.detailLabel}>Start Date:</Text>
              <Text style={styles.detailValue}>{formatDate(data.startDate)}</Text>
            </View>
          )}
        </View>

        {/* Fee Structure */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fee Structure</Text>

          <View style={styles.summaryBox}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Original Course Fee:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(data.originalAmount)}</Text>
            </View>

            {data.discountValue > 0 && (
              <>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>
                    Discount (
                    {data.discountType === 'PERCENTAGE' ? `${data.discountValue}%` : 'Special'}):
                  </Text>
                  <Text style={[styles.summaryValue, { color: '#16a34a' }]}>
                    - {formatCurrency(data.totalSavings)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Discounted Fee:</Text>
                  <Text style={styles.summaryValue}>{formatCurrency(data.discountedAmount)}</Text>
                </View>
              </>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Payable Amount:</Text>
              <Text style={styles.totalValue}>{formatCurrency(data.discountedAmount)}</Text>
            </View>
          </View>

          {data.installmentCount > 1 && (
            <>
              <Text style={styles.text}>
                <Text style={styles.boldText}>Payment Plan: </Text>
                {getPaymentFrequencyText(data.paymentFrequency)} installments (
                {data.installmentCount} installments)
              </Text>

              {/* Installment Table */}
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableCol1, styles.boldText]}>#</Text>
                  <Text style={[styles.tableCol2, styles.boldText]}>Description</Text>
                  <Text style={[styles.tableCol3, styles.boldText]}>Due Date</Text>
                  <Text style={[styles.tableCol4, styles.boldText]}>Amount</Text>
                </View>
                {data.installments.map((installment) => (
                  <View key={installment.number} style={styles.tableRow}>
                    <Text style={styles.tableCol1}>{installment.number}</Text>
                    <Text style={styles.tableCol2}>{installment.description}</Text>
                    <Text style={styles.tableCol3}>{formatDate(installment.dueDate)}</Text>
                    <Text style={styles.tableCol4}>{formatCurrency(installment.amount)}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>

        {/* Special Notes */}
        {data.specialNotes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Notes</Text>
            <Text style={styles.text}>{data.specialNotes}</Text>
          </View>
        )}

        {/* Terms and Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms and Conditions</Text>
          <View style={styles.termsList}>
            {terms.map((term, index) => (
              <Text key={index} style={styles.termItem}>
                {index + 1}. {term}
              </Text>
            ))}
          </View>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine}>
              <Text style={styles.boldText}>Student/Parent Signature</Text>
              <Text style={styles.signatureLabel}>Date: ______________</Text>
            </View>
          </View>
          <View style={styles.signatureBox}>
            <View style={styles.signatureLine}>
              <Text style={styles.boldText}>Authorized Signatory</Text>
              <Text style={styles.signatureLabel}>{data.counselorName}</Text>
              <Text style={styles.signatureLabel}>Cerebrum Biology Academy</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generated on {formatDate(new Date())} | Offer ID: {data.offerId}
          </Text>
          <Text style={styles.footerText}>Page 1 of 1</Text>
        </View>
      </Page>
    </Document>
  )
}
