/**
 * Counselor Fee Plan Service
 * Handles creation of custom fee plans, discounts, and payment links for leads
 */

import { db } from '@/lib/db'
import { RazorpayService } from '@/lib/payments/razorpayService'

interface CreateFeePlanParams {
  leadId: string
  courseName: string
  originalAmount: number
  discountPercent: number
  discountAmount: number
  finalAmount: number
  numberOfInstallments: number
  downPayment: number
  installmentFrequency: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY'
  startDate: Date
  notes?: string
  counselorId: string
}

interface CreateOfferParams {
  leadId: string
  offerName: string
  description: string
  discountType: 'PERCENTAGE' | 'FLAT' | 'BUNDLE'
  discountValue: number
  validUntil: Date
  minAmount?: number
  maxDiscount?: number
  coursesIncluded: string[]
  termsAndConditions: string
  counselorId: string
}

interface InstallmentSchedule {
  installmentNumber: number
  amount: number
  dueDate: Date
  description: string
}

export class FeePlanService {
  /**
   * Calculate installment schedule with down payment
   */
  static calculateInstallmentSchedule(params: {
    totalAmount: number
    downPayment: number
    numberOfInstallments: number
    frequency: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY'
    startDate: Date
  }): InstallmentSchedule[] {
    const { totalAmount, downPayment, numberOfInstallments, frequency, startDate } = params

    const remainingAmount = totalAmount - downPayment
    const baseInstallmentAmount = Math.floor(remainingAmount / numberOfInstallments)
    const lastInstallmentAmount =
      remainingAmount - baseInstallmentAmount * (numberOfInstallments - 1)

    const schedule: InstallmentSchedule[] = []

    // Add down payment as first installment
    schedule.push({
      installmentNumber: 0,
      amount: downPayment,
      dueDate: startDate,
      description: 'Down Payment (Due at enrollment)',
    })

    // Calculate subsequent installments
    for (let i = 0; i < numberOfInstallments; i++) {
      const dueDate = new Date(startDate)

      // Calculate due date based on frequency
      switch (frequency) {
        case 'WEEKLY':
          dueDate.setDate(dueDate.getDate() + (i + 1) * 7)
          break
        case 'MONTHLY':
          dueDate.setMonth(dueDate.getMonth() + (i + 1))
          break
        case 'QUARTERLY':
          dueDate.setMonth(dueDate.getMonth() + (i + 1) * 3)
          break
      }

      schedule.push({
        installmentNumber: i + 1,
        amount: i === numberOfInstallments - 1 ? lastInstallmentAmount : baseInstallmentAmount,
        dueDate,
        description: `Installment ${i + 1} of ${numberOfInstallments}`,
      })
    }

    return schedule
  }

  /**
   * Calculate discount amount
   */
  static calculateDiscount(params: {
    originalAmount: number
    discountType: 'PERCENTAGE' | 'FLAT'
    discountValue: number
    maxDiscount?: number
  }): { discountAmount: number; finalAmount: number } {
    const { originalAmount, discountType, discountValue, maxDiscount } = params

    let discountAmount: number

    if (discountType === 'PERCENTAGE') {
      discountAmount = (originalAmount * discountValue) / 100
      if (maxDiscount && discountAmount > maxDiscount) {
        discountAmount = maxDiscount
      }
    } else {
      discountAmount = discountValue
    }

    const finalAmount = originalAmount - discountAmount

    return { discountAmount, finalAmount }
  }

  /**
   * Create a comprehensive fee plan
   */
  static async createFeePlan(params: CreateFeePlanParams) {
    try {
      // Calculate installment schedule
      const installmentSchedule = this.calculateInstallmentSchedule({
        totalAmount: params.finalAmount,
        downPayment: params.downPayment,
        numberOfInstallments: params.numberOfInstallments,
        frequency: params.installmentFrequency,
        startDate: params.startDate,
      })

      // Create fee plan in database
      const feePlan = await db.feePlan.create({
        data: {
          leadId: params.leadId,
          courseName: params.courseName,
          originalAmount: params.originalAmount,
          discountPercent: params.discountPercent,
          discountAmount: params.discountAmount,
          finalAmount: params.finalAmount,
          downPayment: params.downPayment,
          installmentFrequency: params.installmentFrequency,
          startDate: params.startDate,
          status: 'PENDING',
          notes: params.notes,
          createdBy: params.counselorId,
        },
      })

      // Create installments
      const installments = await Promise.all(
        installmentSchedule.map((inst) =>
          db.installment.create({
            data: {
              feePlanId: feePlan.id,
              installmentNumber: inst.installmentNumber,
              amount: inst.amount,
              dueDate: inst.dueDate,
              status: 'PENDING',
              description: inst.description,
            },
          })
        )
      )

      // Create activity log
      await db.activity.create({
        data: {
          leadId: params.leadId,
          type: 'FEE_PLAN_CREATED',
          description: `Created fee plan: ${params.courseName} - ₹${params.finalAmount} (${params.numberOfInstallments + 1} installments)`,
          metadata: {
            feePlanId: feePlan.id,
            originalAmount: params.originalAmount,
            discount: params.discountAmount,
            finalAmount: params.finalAmount,
          },
          performedBy: params.counselorId,
        },
      })

      return { feePlan, installments }
    } catch (error) {
      console.error('Error creating fee plan:', error)
      throw error
    }
  }

  /**
   * Create a custom offer
   */
  static async createOffer(params: CreateOfferParams) {
    try {
      const offer = await db.offer.create({
        data: {
          leadId: params.leadId,
          offerName: params.offerName,
          description: params.description,
          discountType: params.discountType,
          discountValue: params.discountValue,
          validUntil: params.validUntil,
          minAmount: params.minAmount,
          maxDiscount: params.maxDiscount,
          coursesIncluded: params.coursesIncluded,
          termsAndConditions: params.termsAndConditions,
          status: 'ACTIVE',
          createdBy: params.counselorId,
        },
      })

      // Create activity log
      await db.activity.create({
        data: {
          leadId: params.leadId,
          type: 'OFFER_SENT',
          description: `Sent offer: ${params.offerName} - ${params.discountValue}${params.discountType === 'PERCENTAGE' ? '%' : '₹'} discount`,
          metadata: {
            offerId: offer.id,
            offerName: params.offerName,
            discount: params.discountValue,
          },
          performedBy: params.counselorId,
        },
      })

      return offer
    } catch (error) {
      console.error('Error creating offer:', error)
      throw error
    }
  }

  /**
   * Generate Razorpay payment link for installment
   */
  static async generateInstallmentPaymentLink(params: {
    installmentId: string
    studentName: string
    studentEmail: string
    studentPhone: string
  }) {
    try {
      // Get installment details
      const installment = await db.installment.findUnique({
        where: { id: params.installmentId },
        include: {
          feePlan: {
            include: {
              lead: true,
            },
          },
        },
      })

      if (!installment) {
        throw new Error('Installment not found')
      }

      // Create Razorpay order
      const order = await RazorpayService.createOrder({
        amount: installment.amount,
        receipt: `installment_${installment.id}`,
        notes: {
          installment_id: installment.id,
          fee_plan_id: installment.feePlanId,
          lead_id: installment.feePlan.leadId,
          student_name: params.studentName,
          student_email: params.studentEmail,
          student_phone: params.studentPhone,
          installment_number: installment.installmentNumber.toString(),
        },
      })

      // Store order ID in installment
      await db.installment.update({
        where: { id: installment.id },
        data: {
          razorpayOrderId: order.id,
        },
      })

      // Generate payment link
      const paymentLink = RazorpayService.generatePaymentLink(
        order.id,
        installment.amount,
        `${installment.description} - ${installment.feePlan.courseName}`
      )

      return {
        orderId: order.id,
        paymentLink,
        amount: installment.amount,
        installmentNumber: installment.installmentNumber,
      }
    } catch (error) {
      console.error('Error generating payment link:', error)
      throw error
    }
  }

  /**
   * Apply offer to create fee plan
   */
  static async applyOfferToFeePlan(params: {
    offerId: string
    courseName: string
    originalAmount: number
    numberOfInstallments: number
    downPaymentPercent: number
    installmentFrequency: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY'
    counselorId: string
  }) {
    try {
      // Get offer details
      const offer = await db.offer.findUnique({
        where: { id: params.offerId },
      })

      if (!offer || offer.status !== 'ACTIVE') {
        throw new Error('Offer is not valid or has expired')
      }

      // Check if offer is still valid
      if (new Date() > new Date(offer.validUntil)) {
        throw new Error('Offer has expired')
      }

      // Calculate discount
      const { discountAmount, finalAmount } = this.calculateDiscount({
        originalAmount: params.originalAmount,
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        maxDiscount: offer.maxDiscount || undefined,
      })

      // Calculate down payment
      const downPayment = Math.ceil((finalAmount * params.downPaymentPercent) / 100)

      // Create fee plan
      const result = await this.createFeePlan({
        leadId: offer.leadId,
        courseName: params.courseName,
        originalAmount: params.originalAmount,
        discountPercent:
          offer.discountType === 'PERCENTAGE'
            ? offer.discountValue
            : (discountAmount / params.originalAmount) * 100,
        discountAmount,
        finalAmount,
        numberOfInstallments: params.numberOfInstallments,
        downPayment,
        installmentFrequency: params.installmentFrequency,
        startDate: new Date(),
        notes: `Applied offer: ${offer.offerName}`,
        counselorId: params.counselorId,
      })

      // Update offer status
      await db.offer.update({
        where: { id: offer.id },
        data: { status: 'ACCEPTED' },
      })

      return result
    } catch (error) {
      console.error('Error applying offer:', error)
      throw error
    }
  }

  /**
   * Get fee plan with installments and payment status
   */
  static async getFeePlanDetails(feePlanId: string) {
    return db.feePlan.findUnique({
      where: { id: feePlanId },
      include: {
        installments: {
          orderBy: { installmentNumber: 'asc' },
          include: {
            payments: true,
          },
        },
        lead: {
          select: {
            id: true,
            studentName: true,
            email: true,
            phone: true,
            stage: true,
          },
        },
      },
    })
  }

  /**
   * Get all fee plans for a lead
   */
  static async getLeadFeePlans(leadId: string) {
    return db.feePlan.findMany({
      where: { leadId },
      include: {
        installments: {
          orderBy: { installmentNumber: 'asc' },
        },
        _count: {
          select: {
            installments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Get all offers for a lead
   */
  static async getLeadOffers(leadId: string) {
    return db.offer.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' },
    })
  }

  /**
   * Record installment payment
   */
  static async recordInstallmentPayment(params: {
    installmentId: string
    razorpayPaymentId: string
    razorpayOrderId: string
    amount: number
    method: string
  }) {
    try {
      // Create payment record
      const payment = await db.feePayment.create({
        data: {
          installmentId: params.installmentId,
          razorpayPaymentId: params.razorpayPaymentId,
          razorpayOrderId: params.razorpayOrderId,
          amount: params.amount,
          method: params.method,
          status: 'SUCCESS',
          paidAt: new Date(),
        },
      })

      // Update installment status
      await db.installment.update({
        where: { id: params.installmentId },
        data: {
          status: 'PAID',
          paidAt: new Date(),
        },
      })

      // Check if all installments are paid
      const installment = await db.installment.findUnique({
        where: { id: params.installmentId },
        include: {
          feePlan: {
            include: {
              installments: true,
            },
          },
        },
      })

      if (installment) {
        const allPaid = installment.feePlan.installments.every(
          (inst) => inst.status === 'PAID' || inst.id === params.installmentId
        )

        if (allPaid) {
          // Mark fee plan as completed
          await db.feePlan.update({
            where: { id: installment.feePlanId },
            data: { status: 'COMPLETED' },
          })

          // Update lead stage to ENROLLED
          await db.lead.update({
            where: { id: installment.feePlan.leadId },
            data: { stage: 'ENROLLED' },
          })
        }
      }

      return payment
    } catch (error) {
      console.error('Error recording payment:', error)
      throw error
    }
  }
}
