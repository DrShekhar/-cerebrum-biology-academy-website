import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { CertificateData, DesignType } from './types'

Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
      fontWeight: 700,
    },
  ],
})

Font.register({
  family: 'Playfair Display',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDTZNLo_U2r.woff2',
      fontWeight: 700,
    },
  ],
})

const modernStyles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
  },
  container: {
    flex: 1,
    border: '4px solid #2563eb',
    padding: 40,
    position: 'relative',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  academyName: {
    fontSize: 28,
    fontWeight: 700,
    color: '#2563eb',
    marginBottom: 5,
  },
  certificateTitle: {
    fontSize: 18,
    color: '#64748b',
    letterSpacing: 2,
  },
  mainContent: {
    alignItems: 'center',
    marginVertical: 40,
  },
  presentedTo: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 10,
  },
  studentName: {
    fontSize: 36,
    fontWeight: 700,
    color: '#1e293b',
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    maxWidth: 400,
    lineHeight: 1.6,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#2563eb',
    marginVertical: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 10,
    color: '#94a3b8',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1e293b',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  signature: {
    alignItems: 'center',
    flex: 1,
  },
  signatureLine: {
    width: 150,
    borderBottom: '2px solid #cbd5e1',
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 700,
    color: '#1e293b',
  },
  signatureTitle: {
    fontSize: 10,
    color: '#64748b',
  },
  qrCodeContainer: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    alignItems: 'center',
  },
  qrCode: {
    width: 60,
    height: 60,
  },
  verificationText: {
    fontSize: 8,
    color: '#94a3b8',
    marginTop: 5,
  },
  certificateNumber: {
    position: 'absolute',
    bottom: 10,
    left: 40,
    fontSize: 8,
    color: '#cbd5e1',
  },
})

const classicStyles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#fefce8',
    fontFamily: 'Playfair Display',
  },
  container: {
    flex: 1,
    border: '8px double #ca8a04',
    padding: 50,
    position: 'relative',
    backgroundColor: '#ffffff',
  },
  innerBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: '2px solid #eab308',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  seal: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  academyName: {
    fontSize: 32,
    fontWeight: 700,
    color: '#854d0e',
    marginBottom: 10,
  },
  certificateTitle: {
    fontSize: 24,
    color: '#ca8a04',
    letterSpacing: 4,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#a16207',
    letterSpacing: 1,
  },
  mainContent: {
    alignItems: 'center',
    marginVertical: 40,
  },
  presentedTo: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#78716c',
    marginBottom: 15,
  },
  studentName: {
    fontSize: 42,
    fontWeight: 700,
    color: '#292524',
    marginBottom: 25,
    borderBottom: '3px solid #ca8a04',
    paddingBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#57534e',
    textAlign: 'center',
    maxWidth: 450,
    lineHeight: 1.8,
    fontFamily: 'Inter',
  },
  courseName: {
    fontSize: 20,
    fontWeight: 700,
    color: '#854d0e',
    marginVertical: 15,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    marginVertical: 30,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#a8a29e',
    marginBottom: 5,
    fontFamily: 'Inter',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 700,
    color: '#44403c',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  signature: {
    alignItems: 'center',
  },
  signatureLine: {
    width: 180,
    borderBottom: '2px solid #ca8a04',
    marginBottom: 8,
  },
  signatureName: {
    fontSize: 14,
    fontWeight: 700,
    color: '#292524',
  },
  signatureTitle: {
    fontSize: 11,
    color: '#78716c',
    fontFamily: 'Inter',
  },
  certificateNumber: {
    position: 'absolute',
    bottom: 15,
    left: 50,
    fontSize: 9,
    color: '#d6d3d1',
  },
})

const premiumStyles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#0f172a',
    fontFamily: 'Inter',
  },
  container: {
    flex: 1,
    padding: 60,
    position: 'relative',
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  },
  decorativeCorner: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTop: '3px solid #60a5fa',
    borderLeft: '3px solid #60a5fa',
  },
  topRight: {
    top: 0,
    right: 0,
    borderTop: '3px solid #60a5fa',
    borderRight: '3px solid #60a5fa',
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottom: '3px solid #60a5fa',
    borderLeft: '3px solid #60a5fa',
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottom: '3px solid #60a5fa',
    borderRight: '3px solid #60a5fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  academyName: {
    fontSize: 30,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 8,
  },
  certificateTitle: {
    fontSize: 20,
    color: '#60a5fa',
    letterSpacing: 3,
  },
  mainContent: {
    alignItems: 'center',
    marginVertical: 50,
  },
  presentedTo: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  studentName: {
    fontSize: 40,
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: 30,
    textShadow: '0px 2px 8px rgba(96, 165, 250, 0.3)',
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    maxWidth: 420,
    lineHeight: 1.7,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 700,
    color: '#60a5fa',
    marginVertical: 15,
  },
  achievementBadge: {
    backgroundColor: '#1e40af',
    padding: 10,
    borderRadius: 8,
    marginVertical: 20,
  },
  achievementText: {
    fontSize: 12,
    color: '#dbeafe',
    textAlign: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 35,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 6,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: 700,
    color: '#e2e8f0',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  signature: {
    alignItems: 'center',
    flex: 1,
  },
  signatureLine: {
    width: 160,
    borderBottom: '2px solid #334155',
    marginBottom: 6,
  },
  signatureName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#f1f5f9',
  },
  signatureTitle: {
    fontSize: 10,
    color: '#94a3b8',
  },
  certificateNumber: {
    position: 'absolute',
    bottom: 20,
    left: 60,
    fontSize: 9,
    color: '#334155',
  },
})

interface CertificateDocumentProps {
  data: CertificateData
  designType: DesignType
  qrCodeDataUrl?: string
  logoUrl?: string
}

export const ModernCertificate: React.FC<CertificateDocumentProps> = ({
  data,
  qrCodeDataUrl,
  logoUrl,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={modernStyles.page}>
      <View style={modernStyles.container}>
        <View style={modernStyles.header}>
          {logoUrl && <Image src={logoUrl} style={modernStyles.logo} />}
          <Text style={modernStyles.academyName}>Cerebrum Biology Academy</Text>
          <Text style={modernStyles.certificateTitle}>CERTIFICATE OF COMPLETION</Text>
        </View>

        <View style={modernStyles.mainContent}>
          <Text style={modernStyles.presentedTo}>This is to certify that</Text>
          <Text style={modernStyles.studentName}>{data.studentName}</Text>
          <Text style={modernStyles.description}>has successfully completed the course</Text>
          <Text style={modernStyles.courseName}>{data.courseName}</Text>
          {data.grade && (
            <Text style={modernStyles.description}>
              with {data.grade} grade
              {data.percentage && ` (${data.percentage}%)`}
            </Text>
          )}
        </View>

        <View style={modernStyles.detailsContainer}>
          <View style={modernStyles.detailItem}>
            <Text style={modernStyles.detailLabel}>COMPLETION DATE</Text>
            <Text style={modernStyles.detailValue}>
              {data.completionDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
          {data.duration && (
            <View style={modernStyles.detailItem}>
              <Text style={modernStyles.detailLabel}>DURATION</Text>
              <Text style={modernStyles.detailValue}>{data.duration}</Text>
            </View>
          )}
          <View style={modernStyles.detailItem}>
            <Text style={modernStyles.detailLabel}>ISSUE DATE</Text>
            <Text style={modernStyles.detailValue}>
              {data.issueDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={modernStyles.footer}>
          {data.instructorNames?.map((instructor, index) => (
            <View key={index} style={modernStyles.signature}>
              <View style={modernStyles.signatureLine} />
              <Text style={modernStyles.signatureName}>{instructor}</Text>
              <Text style={modernStyles.signatureTitle}>Instructor</Text>
            </View>
          ))}
        </View>

        {qrCodeDataUrl && (
          <View style={modernStyles.qrCodeContainer}>
            <Image src={qrCodeDataUrl} style={modernStyles.qrCode} />
            <Text style={modernStyles.verificationText}>Verify Online</Text>
          </View>
        )}

        <Text style={modernStyles.certificateNumber}>Certificate No: {data.certificateNumber}</Text>
      </View>
    </Page>
  </Document>
)

export const ClassicCertificate: React.FC<CertificateDocumentProps> = ({
  data,
  qrCodeDataUrl,
  logoUrl,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={classicStyles.page}>
      <View style={classicStyles.container}>
        <View style={classicStyles.innerBorder} />

        <View style={classicStyles.header}>
          {logoUrl && <Image src={logoUrl} style={classicStyles.seal} />}
          <Text style={classicStyles.academyName}>Cerebrum Biology Academy</Text>
          <Text style={classicStyles.certificateTitle}>CERTIFICATE</Text>
          <Text style={classicStyles.subtitle}>OF ACHIEVEMENT</Text>
        </View>

        <View style={classicStyles.mainContent}>
          <Text style={classicStyles.presentedTo}>This Certificate is Proudly Presented to</Text>
          <Text style={classicStyles.studentName}>{data.studentName}</Text>
          <Text style={classicStyles.description}>
            For successfully completing the comprehensive course in
          </Text>
          <Text style={classicStyles.courseName}>{data.courseName}</Text>
          {data.grade && (
            <Text style={classicStyles.description}>
              Achieving {data.grade} grade with {data.percentage}% marks
            </Text>
          )}
        </View>

        <View style={classicStyles.detailsContainer}>
          <View style={classicStyles.detailItem}>
            <Text style={classicStyles.detailLabel}>Date of Completion</Text>
            <Text style={classicStyles.detailValue}>
              {data.completionDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
          {data.duration && (
            <View style={classicStyles.detailItem}>
              <Text style={classicStyles.detailLabel}>Course Duration</Text>
              <Text style={classicStyles.detailValue}>{data.duration}</Text>
            </View>
          )}
        </View>

        <View style={classicStyles.footer}>
          <View style={classicStyles.signature}>
            <View style={classicStyles.signatureLine} />
            <Text style={classicStyles.signatureName}>Dr. Shekhar C Singh</Text>
            <Text style={classicStyles.signatureTitle}>Director & Chief Instructor</Text>
          </View>
          {data.instructorNames?.[0] && data.instructorNames[0] !== 'Dr. Shekhar C Singh' && (
            <View style={classicStyles.signature}>
              <View style={classicStyles.signatureLine} />
              <Text style={classicStyles.signatureName}>{data.instructorNames[0]}</Text>
              <Text style={classicStyles.signatureTitle}>Course Instructor</Text>
            </View>
          )}
        </View>

        <Text style={classicStyles.certificateNumber}>
          Certificate No: {data.certificateNumber}
        </Text>
      </View>
    </Page>
  </Document>
)

export const PremiumCertificate: React.FC<CertificateDocumentProps> = ({
  data,
  qrCodeDataUrl,
  logoUrl,
}) => (
  <Document>
    <Page size="A4" orientation="landscape" style={premiumStyles.page}>
      <View style={premiumStyles.container}>
        <View style={[premiumStyles.decorativeCorner, premiumStyles.topLeft]} />
        <View style={[premiumStyles.decorativeCorner, premiumStyles.topRight]} />
        <View style={[premiumStyles.decorativeCorner, premiumStyles.bottomLeft]} />
        <View style={[premiumStyles.decorativeCorner, premiumStyles.bottomRight]} />

        <View style={premiumStyles.header}>
          {logoUrl && <Image src={logoUrl} style={premiumStyles.logo} />}
          <Text style={premiumStyles.academyName}>CEREBRUM BIOLOGY ACADEMY</Text>
          <Text style={premiumStyles.certificateTitle}>CERTIFICATE OF EXCELLENCE</Text>
        </View>

        <View style={premiumStyles.mainContent}>
          <Text style={premiumStyles.presentedTo}>This is to certify that</Text>
          <Text style={premiumStyles.studentName}>{data.studentName}</Text>

          {data.achievements && data.achievements.length > 0 && (
            <View style={premiumStyles.achievementBadge}>
              <Text style={premiumStyles.achievementText}>{data.achievements.join(' • ')}</Text>
            </View>
          )}

          <Text style={premiumStyles.description}>
            has successfully completed the advanced course
          </Text>
          <Text style={premiumStyles.courseName}>{data.courseName}</Text>
          {data.grade && (
            <Text style={premiumStyles.description}>
              with exceptional performance - {data.grade} ({data.percentage}%)
            </Text>
          )}
        </View>

        <View style={premiumStyles.detailsContainer}>
          <View style={premiumStyles.detailItem}>
            <Text style={premiumStyles.detailLabel}>COMPLETION DATE</Text>
            <Text style={premiumStyles.detailValue}>
              {data.completionDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
          {data.duration && (
            <View style={premiumStyles.detailItem}>
              <Text style={premiumStyles.detailLabel}>DURATION</Text>
              <Text style={premiumStyles.detailValue}>{data.duration}</Text>
            </View>
          )}
          <View style={premiumStyles.detailItem}>
            <Text style={premiumStyles.detailLabel}>CERTIFICATE ID</Text>
            <Text style={premiumStyles.detailValue}>{data.certificateNumber}</Text>
          </View>
        </View>

        <View style={premiumStyles.footer}>
          <View style={premiumStyles.signature}>
            <View style={premiumStyles.signatureLine} />
            <Text style={premiumStyles.signatureName}>Dr. Shekhar C Singh</Text>
            <Text style={premiumStyles.signatureTitle}>Founder & Director</Text>
          </View>
          {data.instructorNames?.[0] && data.instructorNames[0] !== 'Dr. Shekhar C Singh' && (
            <View style={premiumStyles.signature}>
              <View style={premiumStyles.signatureLine} />
              <Text style={premiumStyles.signatureName}>{data.instructorNames[0]}</Text>
              <Text style={premiumStyles.signatureTitle}>Lead Instructor</Text>
            </View>
          )}
        </View>

        <Text style={premiumStyles.certificateNumber}>
          Verification Code: {data.verificationCode}
        </Text>
      </View>
    </Page>
  </Document>
)
