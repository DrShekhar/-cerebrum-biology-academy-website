import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { CONTACT_INFO } from '@/lib/constants/contactInfo'

// Register fonts (optional - uses default fonts if not specified)
// Font.register({
//   family: 'Inter',
//   src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
// })

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 3,
    borderBottomColor: '#16a34a',
    borderBottomStyle: 'solid',
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  receiptTitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  receiptNumber: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
    padding: 6,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    borderBottomStyle: 'solid',
  },
  label: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 10,
  },
  value: {
    color: '#333',
    textAlign: 'right',
    fontSize: 10,
  },
  amountSection: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: '#16a34a',
    borderTopStyle: 'solid',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  footer: {
    marginTop: 50,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#999',
    marginBottom: 4,
  },
  footerBold: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  disclaimer: {
    fontSize: 8,
    color: '#999',
    marginTop: 15,
    textAlign: 'center',
  },
})

export interface ReceiptData {
  receiptNumber: string
  date: string
  customerName: string
  customerEmail: string
  customerPhone: string
  courseName: string
  orderId: string
  paymentId: string
  amount: number
  currency: string
  paymentMethod: string
  gst: number
  subtotal: number
}

interface ReceiptPDFProps {
  data: ReceiptData
}

export const ReceiptPDF: React.FC<ReceiptPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>Cerebrum Biology Academy</Text>
          <Text style={styles.tagline}>NEET Biology Excellence Since 2020</Text>
          <Text style={styles.receiptTitle}>Payment Receipt</Text>
          <Text style={styles.receiptNumber}>Receipt No: {data.receiptNumber}</Text>
          <View>
            <Text style={styles.statusBadge}>✓ PAID</Text>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{data.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{data.customerEmail}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{data.customerPhone}</Text>
          </View>
        </View>

        {/* Course Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Course Name</Text>
            <Text style={styles.value}>{data.courseName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Enrollment Status</Text>
            <Text style={styles.value}>Active</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Date</Text>
            <Text style={styles.value}>{data.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>{data.orderId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment ID</Text>
            <Text style={styles.value}>{data.paymentId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method</Text>
            <Text style={styles.value}>{data.paymentMethod}</Text>
          </View>
        </View>

        {/* Amount Section */}
        <View style={styles.amountSection}>
          <View style={styles.amountRow}>
            <Text>Subtotal (excluding GST)</Text>
            <Text>
              ₹
              {data.subtotal.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View style={styles.amountRow}>
            <Text>GST @ 18%</Text>
            <Text>
              ₹
              {data.gst.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Total Amount Paid</Text>
            <Text>
              ₹
              {data.amount.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBold}>Cerebrum Biology Academy</Text>
          <Text style={styles.footerText}>Email: support@cerebrumbiologyacademy.com</Text>
          <Text style={styles.footerText}>Phone: {CONTACT_INFO.phone.display.hyphenated.primary}</Text>
          <Text style={styles.footerText}>Website: www.cerebrumbiologyacademy.com</Text>
          <Text style={[styles.footerText, { marginTop: 15 }]}>
            Thank you for choosing Cerebrum Biology Academy!
          </Text>
          <Text style={styles.disclaimer}>
            This is a computer-generated receipt and does not require a signature.
          </Text>
        </View>
      </Page>
    </Document>
  )
}
