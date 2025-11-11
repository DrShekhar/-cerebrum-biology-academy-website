/**
 * Offer Letter Service
 * Business logic for generating and managing offer letter PDFs
 */

import { pdf } from '@react-pdf/renderer'
import {
  OfferLetterTemplate,
  type OfferLetterData,
} from '@/components/documents/OfferLetterTemplate'
import prisma from '@/lib/prisma'
import { createElement } from 'react'

export interface GenerateOfferLetterParams {
  leadId: string
  feePlanId: string
  offerId: string
  userId: string // Counselor generating the offer
}

export interface OfferLetterResult {
  success: boolean
  pdfBuffer?: Buffer
  pdfBase64?: string
  fileName?: string
  error?: string
}

class OfferLetterService {
  /**
   * Generate offer letter PDF for a lead and fee plan
   */
  async generateOfferLetter(params: GenerateOfferLetterParams): Promise<OfferLetterResult> {
    try {
      console.log('📄 Generating offer letter:', params)

      // Fetch lead data
      const lead = await prisma.lead.findUnique({
        where: { id: params.leadId },
        include: {
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      if (!lead) {
        return {
          success: false,
          error: 'Lead not found',
        }
      }

      // Fetch fee plan with installments
      const feePlan = await prisma.feePlan.findUnique({
        where: { id: params.feePlanId },
        include: {
          installments: {
            orderBy: { installmentNumber: 'asc' },
          },
        },
      })

      if (!feePlan) {
        return {
          success: false,
          error: 'Fee plan not found',
        }
      }

      // Fetch offer details
      const offer = await prisma.offer.findUnique({
        where: { id: params.offerId },
      })

      if (!offer) {
        return {
          success: false,
          error: 'Offer not found',
        }
      }

      // Fetch counselor data
      const counselor = await prisma.user.findUnique({
        where: { id: params.userId },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })

      if (!counselor) {
        return {
          success: false,
          error: 'Counselor not found',
        }
      }

      // Prepare offer letter data
      const offerLetterData: OfferLetterData = {
        // Lead information
        studentName: lead.studentName,
        parentName: lead.parentName || undefined,
        email: lead.email || '',
        phone: lead.phone,
        address: lead.address || undefined,

        // Offer details
        offerId: offer.id,
        offerDate: offer.createdAt,
        validUntil: offer.validUntil,
        courseName: feePlan.courseName || 'NEET Biology Coaching',
        courseDescription: feePlan.courseDescription || undefined,
        batchName: feePlan.batchName || undefined,
        startDate: feePlan.courseStartDate || undefined,

        // Fee details
        originalAmount: feePlan.originalAmount,
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        discountedAmount: feePlan.totalAmount,
        totalSavings: feePlan.discountAmount,

        // Installment details
        installmentCount: feePlan.installmentCount,
        installments: feePlan.installments.map((inst) => ({
          number: inst.installmentNumber,
          dueDate: inst.dueDate,
          amount: inst.amount,
          description:
            inst.installmentNumber === 0
              ? 'Down Payment'
              : `Installment ${inst.installmentNumber} of ${feePlan.installmentCount}`,
        })),

        // Additional details
        paymentFrequency: feePlan.frequency,
        downPaymentAmount: feePlan.downPaymentAmount || undefined,
        termsAndConditions: offer.terms ? [offer.terms] : undefined,
        specialNotes: offer.conditions || undefined,

        // Issuer details
        issuedBy: counselor.id,
        counselorName: counselor.name || 'Counselor',
        counselorEmail: counselor.email || undefined,
      }

      // Generate PDF using react-pdf/renderer
      const templateElement = createElement(OfferLetterTemplate, { data: offerLetterData })
      const pdfInstance = pdf(templateElement)
      const pdfBlob = await pdfInstance.toBlob()

      // Convert blob to buffer
      const arrayBuffer = await pdfBlob.arrayBuffer()
      const pdfBuffer = Buffer.from(arrayBuffer)

      // Convert to base64 for easier transmission
      const pdfBase64 = pdfBuffer.toString('base64')

      // Generate filename
      const fileName = `Offer_Letter_${lead.studentName.replace(/\s+/g, '_')}_${offer.id}.pdf`

      console.log('✅ Offer letter generated successfully:', fileName)

      return {
        success: true,
        pdfBuffer,
        pdfBase64,
        fileName,
      }
    } catch (error) {
      console.error('❌ Error generating offer letter:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate offer letter',
      }
    }
  }

  /**
   * Generate offer letter and save to database (for future: file storage integration)
   */
  async generateAndStoreOfferLetter(
    params: GenerateOfferLetterParams
  ): Promise<OfferLetterResult & { documentId?: string }> {
    const result = await this.generateOfferLetter(params)

    if (!result.success || !result.pdfBase64) {
      return result
    }

    try {
      // Future: Store PDF in Vercel Blob or AWS S3
      // For now, we'll just return the PDF data without storing

      // Could create a Document record in the database:
      // const document = await prisma.document.create({
      //   data: {
      //     leadId: params.leadId,
      //     type: 'OFFER_LETTER',
      //     fileName: result.fileName,
      //     fileUrl: uploadedUrl, // from storage service
      //     createdById: params.userId,
      //   },
      // })

      return {
        ...result,
        // documentId: document.id,
      }
    } catch (error) {
      console.error('❌ Error storing offer letter:', error)
      return {
        ...result,
        error: 'PDF generated but failed to store',
      }
    }
  }

  /**
   * Get offer letter data for preview (without generating PDF)
   */
  async getOfferLetterPreviewData(
    leadId: string,
    feePlanId: string,
    offerId: string
  ): Promise<{ success: boolean; data?: OfferLetterData; error?: string }> {
    try {
      // Fetch all required data
      const [lead, feePlan, offer] = await Promise.all([
        prisma.lead.findUnique({
          where: { id: leadId },
          include: {
            assignedTo: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        }),
        prisma.feePlan.findUnique({
          where: { id: feePlanId },
          include: {
            installments: {
              orderBy: { installmentNumber: 'asc' },
            },
          },
        }),
        prisma.offer.findUnique({
          where: { id: offerId },
        }),
      ])

      if (!lead || !feePlan || !offer) {
        return {
          success: false,
          error: 'Required data not found',
        }
      }

      const counselor = lead.assignedTo

      const offerLetterData: OfferLetterData = {
        studentName: lead.studentName,
        parentName: lead.parentName || undefined,
        email: lead.email || '',
        phone: lead.phone,
        address: lead.address || undefined,
        offerId: offer.id,
        offerDate: offer.createdAt,
        validUntil: offer.validUntil,
        courseName: feePlan.courseName || 'NEET Biology Coaching',
        courseDescription: feePlan.courseDescription || undefined,
        batchName: feePlan.batchName || undefined,
        startDate: feePlan.courseStartDate || undefined,
        originalAmount: feePlan.originalAmount,
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        discountedAmount: feePlan.totalAmount,
        totalSavings: feePlan.discountAmount,
        installmentCount: feePlan.installmentCount,
        installments: feePlan.installments.map((inst) => ({
          number: inst.installmentNumber,
          dueDate: inst.dueDate,
          amount: inst.amount,
          description:
            inst.installmentNumber === 0
              ? 'Down Payment'
              : `Installment ${inst.installmentNumber} of ${feePlan.installmentCount}`,
        })),
        paymentFrequency: feePlan.frequency,
        downPaymentAmount: feePlan.downPaymentAmount || undefined,
        termsAndConditions: offer.terms ? [offer.terms] : undefined,
        specialNotes: offer.conditions || undefined,
        issuedBy: counselor?.id || '',
        counselorName: counselor?.name || 'Counselor',
        counselorEmail: counselor?.email || undefined,
      }

      return {
        success: true,
        data: offerLetterData,
      }
    } catch (error) {
      console.error('❌ Error getting offer letter preview data:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get preview data',
      }
    }
  }

  /**
   * Check if offer letter can be generated for a lead
   */
  async canGenerateOfferLetter(
    leadId: string,
    feePlanId: string,
    offerId: string
  ): Promise<{ canGenerate: boolean; reason?: string }> {
    try {
      const [lead, feePlan, offer] = await Promise.all([
        prisma.lead.findUnique({ where: { id: leadId } }),
        prisma.feePlan.findUnique({ where: { id: feePlanId } }),
        prisma.offer.findUnique({ where: { id: offerId } }),
      ])

      if (!lead) {
        return { canGenerate: false, reason: 'Lead not found' }
      }

      if (!feePlan) {
        return { canGenerate: false, reason: 'Fee plan not found' }
      }

      if (!offer) {
        return { canGenerate: false, reason: 'Offer not found' }
      }

      // Check if offer is still valid
      if (offer.validUntil < new Date()) {
        return { canGenerate: false, reason: 'Offer has expired' }
      }

      // Check if offer status is appropriate
      if (offer.status === 'EXPIRED' || offer.status === 'REJECTED') {
        return { canGenerate: false, reason: `Offer is ${offer.status.toLowerCase()}` }
      }

      return { canGenerate: true }
    } catch (error) {
      console.error('❌ Error checking offer letter generation:', error)
      return {
        canGenerate: false,
        reason: error instanceof Error ? error.message : 'Failed to check eligibility',
      }
    }
  }
}

export const offerLetterService = new OfferLetterService()
