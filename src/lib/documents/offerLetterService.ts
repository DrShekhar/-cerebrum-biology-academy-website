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
      const lead = await prisma.leads.findUnique({
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
      const feePlan = await prisma.fee_plans.findUnique({
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
      const offer = await prisma.offers.findUnique({
        where: { id: params.offerId },
      })

      if (!offer) {
        return {
          success: false,
          error: 'Offer not found',
        }
      }

      // Fetch counselor data
      const counselor = await prisma.users.findUnique({
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

      const originalPrice = Number(offer.originalPrice)
      const discountValue = Number(offer.discountValue)
      const finalPrice = Number(offer.finalPrice)
      const discountAmount = originalPrice - finalPrice

      const defaultTerms = [
        'This offer is valid only until the date specified above',
        'Payment schedule must be followed as per the installment plan',
        'All fees are non-refundable once the course commences',
        'Students must maintain 75% attendance to remain enrolled',
        'Any changes to the fee structure must be approved in writing',
      ]

      const offerLetterData: OfferLetterData = {
        offerId: offer.id,
        offerCode: offer.offerCode,
        validUntil: offer.validUntil.toISOString(),
        student: {
          name: lead.studentName,
          email: lead.email || '',
          phone: lead.phone,
        },
        course: {
          name: offer.courseName,
        },
        fees: {
          originalPrice,
          discountType: offer.discountType,
          discountValue,
          discountAmount,
          finalPrice,
        },
        installments: feePlan.installments.map((inst) => ({
          installmentNumber: inst.installmentNumber,
          description:
            inst.installmentNumber === 0
              ? 'Down Payment (Due at enrollment)'
              : `Installment ${inst.installmentNumber} of ${feePlan.numberOfInstallments}`,
          dueDate: inst.dueDate.toISOString(),
          amount: Number(inst.amount),
        })),
        terms: offer.termsConditions ? offer.termsConditions.split('\n') : defaultTerms,
        counselor: {
          name: counselor.name || 'Counselor',
        },
        generatedDate: new Date().toISOString(),
      }

      // Generate PDF using react-pdf/renderer
      const pdfInstance = pdf(createElement(OfferLetterTemplate, { data: offerLetterData }) as any)
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
        prisma.leads.findUnique({
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
        prisma.fee_plans.findUnique({
          where: { id: feePlanId },
          include: {
            installments: {
              orderBy: { installmentNumber: 'asc' },
            },
          },
        }),
        prisma.offers.findUnique({
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

      const originalPrice = Number(offer.originalPrice)
      const discountValue = Number(offer.discountValue)
      const finalPrice = Number(offer.finalPrice)
      const discountAmount = originalPrice - finalPrice

      const defaultTerms = [
        'This offer is valid only until the date specified above',
        'Payment schedule must be followed as per the installment plan',
        'All fees are non-refundable once the course commences',
        'Students must maintain 75% attendance to remain enrolled',
        'Any changes to the fee structure must be approved in writing',
      ]

      const offerLetterData: OfferLetterData = {
        offerId: offer.id,
        offerCode: offer.offerCode,
        validUntil: offer.validUntil.toISOString(),
        student: {
          name: lead.studentName,
          email: lead.email || '',
          phone: lead.phone,
        },
        course: {
          name: offer.courseName,
        },
        fees: {
          originalPrice,
          discountType: offer.discountType,
          discountValue,
          discountAmount,
          finalPrice,
        },
        installments: feePlan.installments.map((inst) => ({
          installmentNumber: inst.installmentNumber,
          description:
            inst.installmentNumber === 0
              ? 'Down Payment (Due at enrollment)'
              : `Installment ${inst.installmentNumber} of ${feePlan.numberOfInstallments}`,
          dueDate: inst.dueDate.toISOString(),
          amount: Number(inst.amount),
        })),
        terms: offer.termsConditions ? offer.termsConditions.split('\n') : defaultTerms,
        counselor: {
          name: counselor?.name || 'Counselor',
        },
        generatedDate: new Date().toISOString(),
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
        prisma.leads.findUnique({ where: { id: leadId } }),
        prisma.fee_plans.findUnique({ where: { id: feePlanId } }),
        prisma.offers.findUnique({ where: { id: offerId } }),
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
      if (offer.status === 'EXPIRED' || offer.status === 'CANCELLED') {
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
