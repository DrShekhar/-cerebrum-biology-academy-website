import { renderToStream } from '@react-pdf/renderer'
import QRCode from 'qrcode'
import { nanoid } from 'nanoid'
import crypto from 'crypto'
import { CertificateData, CertificateGenerationOptions, DesignType } from './types'
import { ModernCertificate, ClassicCertificate, PremiumCertificate } from './certificateTemplates'

export class CertificateGenerator {
  private static readonly VERIFICATION_BASE_URL =
    process.env.NEXT_PUBLIC_APP_URL || 'https://cerebrumbiologyacademy.com'

  static async generateCertificateNumber(): Promise<string> {
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    const uniqueId = nanoid(8).toUpperCase()
    return `CBA-${year}${month}-${uniqueId}`
  }

  static async generateVerificationCode(): Promise<string> {
    const randomBytes = crypto.randomBytes(16)
    const hash = crypto.createHash('sha256').update(randomBytes).digest('hex')
    return hash.substring(0, 16).toUpperCase()
  }

  static async generateQRCode(verificationCode: string): Promise<string> {
    const verificationUrl = `${this.VERIFICATION_BASE_URL}/verify-certificate/${verificationCode}`

    try {
      const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
        width: 200,
        margin: 1,
        color: {
          dark: '#1e293b',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      })
      return qrCodeDataUrl
    } catch (error) {
      console.error('Error generating QR code:', error)
      throw new Error('Failed to generate QR code')
    }
  }

  static async generateCertificatePDF(
    data: CertificateData,
    options: CertificateGenerationOptions = {}
  ): Promise<NodeJS.ReadableStream> {
    const { template, includeQRCode = true, includeWatermark = false, format = 'pdf' } = options

    const designType: DesignType = template?.designType || 'MODERN'

    let qrCodeDataUrl: string | undefined
    if (includeQRCode) {
      qrCodeDataUrl = await this.generateQRCode(data.verificationCode)
    }

    const logoUrl = template?.logoUrl || `${this.VERIFICATION_BASE_URL}/images/logo-certificate.png`

    let CertificateComponent
    switch (designType) {
      case 'CLASSIC':
        CertificateComponent = ClassicCertificate
        break
      case 'PREMIUM':
      case 'ELEGANT':
        CertificateComponent = PremiumCertificate
        break
      case 'MODERN':
      case 'MINIMALIST':
      default:
        CertificateComponent = ModernCertificate
        break
    }

    const certificateDoc = CertificateComponent({
      data,
      designType,
      qrCodeDataUrl,
      logoUrl,
    })

    return await renderToStream(certificateDoc)
  }

  static async generateCertificateBuffer(
    data: CertificateData,
    options: CertificateGenerationOptions = {}
  ): Promise<Buffer> {
    const stream = await this.generateCertificatePDF(data, options)

    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = []
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
      stream.on('end', () => resolve(Buffer.concat(chunks)))
      stream.on('error', reject)
    })
  }

  static async uploadCertificate(buffer: Buffer, certificateNumber: string): Promise<string> {
    if (process.env.VERCEL_BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob')

      const blob = await put(`certificates/${certificateNumber}.pdf`, buffer, {
        access: 'public',
        contentType: 'application/pdf',
      })

      return blob.url
    } else {
      const fs = await import('fs/promises')
      const path = await import('path')

      const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'certificates')
      await fs.mkdir(uploadsDir, { recursive: true })

      const filePath = path.join(uploadsDir, `${certificateNumber}.pdf`)
      await fs.writeFile(filePath, buffer)

      return `/uploads/certificates/${certificateNumber}.pdf`
    }
  }

  static async generateAndUploadCertificate(
    data: CertificateData,
    options: CertificateGenerationOptions = {}
  ): Promise<{ pdfUrl: string; qrCodeUrl?: string }> {
    const buffer = await this.generateCertificateBuffer(data, options)

    const pdfUrl = await this.uploadCertificate(buffer, data.certificateNumber)

    let qrCodeUrl: string | undefined
    if (options.includeQRCode) {
      qrCodeUrl = await this.generateQRCode(data.verificationCode)
    }

    return { pdfUrl, qrCodeUrl }
  }

  static getVerificationUrl(verificationCode: string): string {
    return `${this.VERIFICATION_BASE_URL}/verify-certificate/${verificationCode}`
  }

  static async validateCertificateData(
    data: Partial<CertificateData>
  ): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = []

    if (!data.studentName || data.studentName.trim().length === 0) {
      errors.push('Student name is required')
    }

    if (!data.courseName || data.courseName.trim().length === 0) {
      errors.push('Course name is required')
    }

    if (!data.completionDate) {
      errors.push('Completion date is required')
    } else if (data.completionDate > new Date()) {
      errors.push('Completion date cannot be in the future')
    }

    if (!data.certificateNumber || data.certificateNumber.trim().length === 0) {
      errors.push('Certificate number is required')
    }

    if (!data.verificationCode || data.verificationCode.trim().length === 0) {
      errors.push('Verification code is required')
    }

    if (data.percentage !== undefined) {
      if (data.percentage < 0 || data.percentage > 100) {
        errors.push('Percentage must be between 0 and 100')
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    }
  }

  static calculateGrade(percentage: number): string {
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C'
    if (percentage >= 40) return 'D'
    return 'F'
  }

  static determineAchievements(percentage?: number, completionDays?: number): string[] {
    const achievements: string[] = []

    if (percentage !== undefined) {
      if (percentage >= 95) {
        achievements.push('Outstanding Performance')
      } else if (percentage >= 90) {
        achievements.push('Excellent Achievement')
      } else if (percentage >= 80) {
        achievements.push('High Distinction')
      } else if (percentage >= 70) {
        achievements.push('Distinction')
      }
    }

    if (completionDays !== undefined) {
      if (completionDays <= 30) {
        achievements.push('Fast Learner')
      } else if (completionDays <= 60) {
        achievements.push('Dedicated Student')
      }
    }

    return achievements
  }
}

export default CertificateGenerator
