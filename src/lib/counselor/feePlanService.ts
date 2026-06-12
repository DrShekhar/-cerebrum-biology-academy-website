/**
 * Counselor Fee Plan Service
 * Handles creation of custom fee plans, discounts, and payment links for leads
 */

import { prisma } from '@/lib/prisma'
import { RazorpayService } from '@/lib/payments/razorpayService'

function genId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

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
      const feePlan = await prisma.fee_plans.create({
        data: {
          id: genId('feeplan'),
          leadId: params.leadId,
          courseName: params.courseName,
          baseFee: params.originalAmount,
          discount: params.discountAmount,
          discountType: 'PERCENTAGE',
          totalFee: params.finalAmount,
          amountPaid: 0,
          amountDue: params.finalAmount,
          planType: params.installmentFrequency,
          numberOfInstallments: params.numberOfInstallments,
          status: 'PENDING',
          createdById: params.counselorId,
          updatedAt: new Date(),
        },
      })

      // Create installments
      const installments = await Promise.all(
        installmentSchedule.map((inst) =>
          prisma.installments.create({
            data: {
              id: genId('inst'),
              feePlanId: feePlan.id,
              installmentNumber: inst.installmentNumber,
              amount: inst.amount,
              dueDate: inst.dueDate,
              status: 'PENDING',
              updatedAt: new Date(),
            },
          })
        )
      )

      // Create activity log
      await prisma.activities.create({
        data: {
          id: genId('act'),
          leadId: params.leadId,
          userId: params.counselorId,
          action: 'FEE_PLAN_CREATED',
          description: `Created fee plan: ${params.courseName} - ₹${params.finalAmount} (${params.numberOfInstallments + 1} installments)`,
          metadata: {
            feePlanId: feePlan.id,
            originalAmount: params.originalAmount,
            discount: params.discountAmount,
            finalAmount: params.finalAmount,
          },
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
      const originalPrice = params.minAmount ?? 0
      const offer = await prisma.offers.create({
        data: {
          id: genId('offer'),
          leadId: params.leadId,
          offerCode: `OFR-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
          offerName: params.offerName,
          courseName: params.coursesIncluded[0] || 'NEET Biology Course',
          originalPrice,
          discountType: params.discountType === 'PERCENTAGE' ? 'PERCENTAGE' : 'FIXED_AMOUNT',
          discountValue: params.discountValue,
          finalPrice:
            params.discountType === 'PERCENTAGE'
              ? originalPrice - (originalPrice * params.discountValue) / 100
              : Math.max(0, originalPrice - params.discountValue),
          validUntil: params.validUntil,
          termsConditions: params.termsAndConditions,
          status: 'SENT',
          isActive: true,
          createdById: params.counselorId,
        },
      })

      // Create activity log
      await prisma.activities.create({
        data: {
          id: genId('act'),
          leadId: params.leadId,
          userId: params.counselorId,
          action: 'OFFER_SENT',
          description: `Sent offer: ${params.offerName} - ${params.discountValue}${params.discountType === 'PERCENTAGE' ? '%' : '₹'} discount`,
          metadata: {
            offerId: offer.id,
            offerName: params.offerName,
            discount: params.discountValue,
          },
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
      const installment = await prisma.installments.findUnique({
        where: { id: params.installmentId },
        include: {
          fee_plans: {
            include: {
              leads: true,
            },
          },
        },
      })

      if (!installment) {
        throw new Error('Installment not found')
      }

      const amount = Number(installment.amount)

      // Create Razorpay order
      const order = await RazorpayService.createOrder({
        amount,
        receipt: `installment_${installment.id}`,
        notes: {
          installment_id: installment.id,
          fee_plan_id: installment.feePlanId,
          lead_id: installment.fee_plans.leadId,
          student_name: params.studentName,
          student_email: params.studentEmail,
          student_phone: params.studentPhone,
          installment_number: installment.installmentNumber.toString(),
        },
      })

      // Store order ID in installment
      await prisma.installments.update({
        where: { id: installment.id },
        data: {
          razorpayOrderId: order.id,
        },
      })

      // Generate payment link
      const paymentLink = RazorpayService.generatePaymentLink(
        order.id,
        amount,
        `Installment ${installment.installmentNumber} - ${installment.fee_plans.courseName}`
      )

      return {
        orderId: order.id,
        paymentLink,
        amount,
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
      const offer = await prisma.offers.findUnique({
        where: { id: params.offerId },
      })

      if (!offer || !offer.isActive || offer.status === 'EXPIRED' || offer.status === 'CANCELLED') {
        throw new Error('Offer is not valid or has expired')
      }

      // Check if offer is still valid
      if (new Date() > new Date(offer.validUntil)) {
        throw new Error('Offer has expired')
      }

      // Calculate discount
      const { discountAmount, finalAmount } = this.calculateDiscount({
        originalAmount: params.originalAmount,
        discountType: offer.discountType === 'PERCENTAGE' ? 'PERCENTAGE' : 'FLAT',
        discountValue: Number(offer.discountValue),
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
            ? Number(offer.discountValue)
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
      await prisma.offers.update({
        where: { id: offer.id },
        data: { status: 'ACCEPTED', acceptedAt: new Date() },
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
    return prisma.fee_plans.findUnique({
      where: { id: feePlanId },
      include: {
        installments: {
          orderBy: { installmentNumber: 'asc' },
        },
        fee_payments: true,
        leads: {
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
    return prisma.fee_plans.findMany({
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
    return prisma.offers.findMany({
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
      // Resolve the parent fee plan (fee_payments.feePlanId is required)
      const target = await prisma.installments.findUnique({
        where: { id: params.installmentId },
        select: { feePlanId: true },
      })
      if (!target) {
        throw new Error('Installment not found')
      }

      // Create payment record
      const payment = await prisma.fee_payments.create({
        data: {
          id: genId('pay'),
          feePlanId: target.feePlanId,
          installmentId: params.installmentId,
          razorpayPaymentId: params.razorpayPaymentId,
          razorpayOrderId: params.razorpayOrderId,
          amount: params.amount,
          paymentMethod: params.method,
          status: 'SUCCESS',
          paidAt: new Date(),
        },
      })

      // Update installment status
      await prisma.installments.update({
        where: { id: params.installmentId },
        data: {
          status: 'PAID',
          paidAt: new Date(),
          paidAmount: params.amount,
        },
      })

      // Check if all installments are paid
      const installment = await prisma.installments.findUnique({
        where: { id: params.installmentId },
        include: {
          fee_plans: {
            include: {
              installments: true,
            },
          },
        },
      })

      if (installment) {
        const allPaid = installment.fee_plans.installments.every(
          (inst) => inst.status === 'PAID' || inst.id === params.installmentId
        )

        if (allPaid) {
          // Mark fee plan as completed
          await prisma.fee_plans.update({
            where: { id: installment.feePlanId },
            data: { status: 'COMPLETED' },
          })

          // Update lead stage to ENROLLED
          await prisma.leads.update({
            where: { id: installment.fee_plans.leadId },
            data: { stage: 'ENROLLED', updatedAt: new Date() },
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
