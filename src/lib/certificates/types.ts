export type CertificateType =
  | 'COURSE_COMPLETION'
  | 'EXCELLENCE'
  | 'PARTICIPATION'
  | 'ACHIEVEMENT'
  | 'APPRECIATION'
  | 'SPECIAL_RECOGNITION'

export type CertificateStatus = 'DRAFT' | 'ISSUED' | 'REVOKED' | 'EXPIRED'

export type DesignType = 'MODERN' | 'CLASSIC' | 'PREMIUM' | 'MINIMALIST' | 'ELEGANT'

export interface CertificateData {
  studentName: string
  courseName: string
  completionDate: Date
  issueDate: Date
  grade?: string
  percentage?: number
  duration?: string
  instructorNames?: string[]
  achievements?: string[]
  certificateNumber: string
  verificationCode: string
}

export interface CertificateTemplate {
  id: string
  name: string
  description?: string
  templateType: CertificateType
  designType: DesignType
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  layout: {
    borderStyle?: string
    borderWidth?: number
    headerHeight?: number
    footerHeight?: number
    signaturePositions?: Array<{
      x: number
      y: number
      width: number
      height: number
    }>
  }
  backgroundImage?: string
  logoUrl?: string
  signatureFields: Array<{
    name: string
    title: string
    imageUrl?: string
  }>
  customFields?: Record<string, unknown>
}

export interface CertificateGenerationOptions {
  template?: CertificateTemplate
  includeQRCode?: boolean
  includeWatermark?: boolean
  format?: 'pdf' | 'png'
  quality?: 'low' | 'medium' | 'high'
}
