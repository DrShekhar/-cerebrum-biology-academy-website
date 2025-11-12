/**
 * Counselor Task Service
 * Handles task creation, automation, reminders, and tracking
 */

import { prisma } from '@/lib/prisma'
import type { LeadStage } from '@/generated/prisma'

type TaskType =
  | 'FOLLOW_UP'
  | 'DEMO_REMINDER'
  | 'PAYMENT_REMINDER'
  | 'OFFER_EXPIRY'
  | 'DOCUMENT_COLLECTION'
  | 'OTHER'

type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

interface CreateTaskParams {
  leadId?: string
  title: string
  description?: string
  type: TaskType
  priority: TaskPriority
  dueDate: Date
  assignedToId: string
}

interface TaskAutomationRule {
  stage: LeadStage
  taskTemplate: {
    title: string
    description: string
    type: TaskType
    priority: TaskPriority
    daysUntilDue: number
  }
}

export class TaskService {
  /**
   * Task automation rules based on lead stage
   */
  static readonly AUTOMATION_RULES: TaskAutomationRule[] = [
    {
      stage: 'NEW_LEAD',
      taskTemplate: {
        title: 'Initial Follow-up Call',
        description:
          'Call the lead to introduce yourself, understand their needs, and schedule a demo if interested.',
        type: 'FOLLOW_UP',
        priority: 'HIGH',
        daysUntilDue: 1,
      },
    },
    {
      stage: 'CONTACTED',
      taskTemplate: {
        title: 'Schedule Demo Class',
        description: 'Coordinate with the student to schedule a convenient demo class time.',
        type: 'DEMO_REMINDER',
        priority: 'HIGH',
        daysUntilDue: 2,
      },
    },
    {
      stage: 'DEMO_SCHEDULED',
      taskTemplate: {
        title: 'Send Demo Reminder',
        description:
          'Send WhatsApp reminder 1 day before demo with Zoom link and preparation instructions.',
        type: 'DEMO_REMINDER',
        priority: 'URGENT',
        daysUntilDue: 1,
      },
    },
    {
      stage: 'DEMO_COMPLETED',
      taskTemplate: {
        title: 'Send Course Offer',
        description:
          'Create and send personalized fee plan and offer to the student via WhatsApp/Email.',
        type: 'OFFER_EXPIRY',
        priority: 'HIGH',
        daysUntilDue: 1,
      },
    },
    {
      stage: 'OFFER_SENT',
      taskTemplate: {
        title: 'Follow-up on Offer',
        description: 'Call to discuss the offer, answer questions, and address any concerns.',
        type: 'FOLLOW_UP',
        priority: 'HIGH',
        daysUntilDue: 2,
      },
    },
    {
      stage: 'NEGOTIATING',
      taskTemplate: {
        title: 'Finalize Fee Plan',
        description:
          'Work with the student to finalize payment terms and prepare enrollment documents.',
        type: 'DOCUMENT_COLLECTION',
        priority: 'URGENT',
        daysUntilDue: 1,
      },
    },
    {
      stage: 'PAYMENT_PENDING',
      taskTemplate: {
        title: 'Payment Reminder',
        description: 'Send payment link and remind about down payment to confirm enrollment.',
        type: 'PAYMENT_REMINDER',
        priority: 'URGENT',
        daysUntilDue: 1,
      },
    },
  ]

  /**
   * Create a manual task
   */
  static async createTask(params: CreateTaskParams) {
    try {
      const task = await prisma.task.create({
        data: {
          leadId: params.leadId,
          title: params.title,
          description: params.description,
          type: params.type,
          priority: params.priority,
          dueDate: params.dueDate,
          assignedToId: params.assignedToId,
          status: 'TODO',
        },
        include: {
          lead: {
            select: {
              id: true,
              studentName: true,
              phone: true,
              email: true,
            },
          },
        },
      })

      if (params.leadId) {
        await prisma.activity.create({
          data: {
            leadId: params.leadId,
            type: 'TASK_CREATED',
            description: `Created task: ${params.title}`,
            performedBy: params.assignedToId,
          },
        })
      }

      return task
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  }

  /**
   * Automatically create task when lead stage changes
   */
  static async createAutomatedTask(params: {
    leadId: string
    newStage: LeadStage
    counselorId: string
  }) {
    try {
      const rule = this.AUTOMATION_RULES.find((r) => r.stage === params.newStage)

      if (!rule) {
        return null
      }

      const lead = await prisma.lead.findUnique({
        where: { id: params.leadId },
        select: { studentName: true },
      })

      if (!lead) {
        throw new Error('Lead not found')
      }

      const dueDate = new Date()
      dueDate.setDate(dueDate.getDate() + rule.taskTemplate.daysUntilDue)

      const task = await this.createTask({
        leadId: params.leadId,
        title: rule.taskTemplate.title,
        description: `${rule.taskTemplate.description}\n\nStudent: ${lead.studentName}`,
        type: rule.taskTemplate.type,
        priority: rule.taskTemplate.priority,
        dueDate,
        assignedToId: params.counselorId,
      })

      console.log(`✅ Auto-created task for stage ${params.newStage}:`, task.title)

      return task
    } catch (error) {
      console.error('Error creating automated task:', error)
      throw error
    }
  }

  /**
   * Update task status
   */
  static async updateTask(
    taskId: string,
    updates: Partial<CreateTaskParams> & { status?: TaskStatus }
  ) {
    try {
      const updateData: any = { ...updates }

      if (updates.status === 'COMPLETED') {
        updateData.completedAt = new Date()
      }

      const task = await prisma.task.update({
        where: { id: taskId },
        data: updateData,
        include: {
          lead: {
            select: {
              id: true,
              studentName: true,
            },
          },
        },
      })

      if (task.leadId) {
        await prisma.activity.create({
          data: {
            leadId: task.leadId,
            type: 'TASK_UPDATED',
            description: `Updated task: ${task.title} - Status: ${task.status}`,
            performedBy: task.assignedToId,
          },
        })
      }

      return task
    } catch (error) {
      console.error('Error updating task:', error)
      throw error
    }
  }

  /**
   * Mark task as completed
   */
  static async completeTask(taskId: string, counselorId: string) {
    return this.updateTask(taskId, { status: 'COMPLETED' })
  }

  /**
   * Delete task
   */
  static async deleteTask(taskId: string) {
    try {
      await prisma.task.delete({
        where: { id: taskId },
      })
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    }
  }

  /**
   * Get tasks for counselor
   */
  static async getTasks(params: {
    counselorId: string
    status?: TaskStatus
    leadId?: string
    overdue?: boolean
  }) {
    try {
      const where: any = {
        assignedToId: params.counselorId,
      }

      if (params.status) {
        where.status = params.status
      }

      if (params.leadId) {
        where.leadId = params.leadId
      }

      if (params.overdue) {
        where.dueDate = {
          lt: new Date(),
        }
        where.status = {
          notIn: ['COMPLETED', 'CANCELLED'],
        }
      }

      const tasks = await prisma.task.findMany({
        where,
        include: {
          lead: {
            select: {
              id: true,
              studentName: true,
              phone: true,
              email: true,
              stage: true,
              priority: true,
            },
          },
        },
        orderBy: [{ priority: 'desc' }, { dueDate: 'asc' }],
      })

      return tasks
    } catch (error) {
      console.error('Error fetching tasks:', error)
      throw error
    }
  }

  /**
   * Get overdue tasks count
   */
  static async getOverdueTasksCount(counselorId: string): Promise<number> {
    try {
      const count = await prisma.task.count({
        where: {
          assignedToId: counselorId,
          dueDate: {
            lt: new Date(),
          },
          status: {
            notIn: ['COMPLETED', 'CANCELLED'],
          },
        },
      })

      return count
    } catch (error) {
      console.error('Error counting overdue tasks:', error)
      return 0
    }
  }

  /**
   * Get due today tasks count
   */
  static async getDueTodayTasksCount(counselorId: string): Promise<number> {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const count = await prisma.task.count({
        where: {
          assignedToId: counselorId,
          dueDate: {
            gte: today,
            lt: tomorrow,
          },
          status: {
            notIn: ['COMPLETED', 'CANCELLED'],
          },
        },
      })

      return count
    } catch (error) {
      console.error('Error counting due today tasks:', error)
      return 0
    }
  }

  /**
   * Get task statistics
   */
  static async getTaskStats(counselorId: string) {
    try {
      const [total, todo, inProgress, completed, overdue, dueToday] = await Promise.all([
        prisma.task.count({
          where: { assignedToId: counselorId },
        }),
        prisma.task.count({
          where: { assignedToId: counselorId, status: 'TODO' },
        }),
        prisma.task.count({
          where: { assignedToId: counselorId, status: 'IN_PROGRESS' },
        }),
        prisma.task.count({
          where: { assignedToId: counselorId, status: 'COMPLETED' },
        }),
        this.getOverdueTasksCount(counselorId),
        this.getDueTodayTasksCount(counselorId),
      ])

      return {
        total,
        todo,
        inProgress,
        completed,
        overdue,
        dueToday,
      }
    } catch (error) {
      console.error('Error fetching task stats:', error)
      throw error
    }
  }

  /**
   * Create payment reminder tasks for due installments
   */
  static async createPaymentReminderTasks(counselorId: string) {
    try {
      const threeDaysFromNow = new Date()
      threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3)

      const dueInstallments = await prisma.installment.findMany({
        where: {
          status: 'PENDING',
          dueDate: {
            lte: threeDaysFromNow,
          },
          feePlan: {
            lead: {
              assignedToId: counselorId,
            },
          },
        },
        include: {
          feePlan: {
            include: {
              lead: {
                select: {
                  id: true,
                  studentName: true,
                  assignedToId: true,
                },
              },
            },
          },
        },
      })

      const createdTasks = []

      for (const installment of dueInstallments) {
        const existingTask = await prisma.task.findFirst({
          where: {
            leadId: installment.feePlan.leadId,
            type: 'PAYMENT_REMINDER',
            status: {
              notIn: ['COMPLETED', 'CANCELLED'],
            },
            description: {
              contains: `Installment ${installment.installmentNumber}`,
            },
          },
        })

        if (!existingTask) {
          const task = await this.createTask({
            leadId: installment.feePlan.leadId,
            title: `Payment Reminder - ${installment.feePlan.courseName}`,
            description: `Installment ${installment.installmentNumber} of ₹${installment.amount.toLocaleString('en-IN')} is due on ${installment.dueDate.toLocaleDateString()}. Send payment link to ${installment.feePlan.lead.studentName}.`,
            type: 'PAYMENT_REMINDER',
            priority: 'URGENT',
            dueDate: new Date(installment.dueDate),
            assignedToId: installment.feePlan.lead.assignedToId || counselorId,
          })

          createdTasks.push(task)
        }
      }

      console.log(`✅ Created ${createdTasks.length} payment reminder tasks`)

      return createdTasks
    } catch (error) {
      console.error('Error creating payment reminder tasks:', error)
      throw error
    }
  }

  /**
   * Create offer expiry reminder tasks
   */
  static async createOfferExpiryTasks(counselorId: string) {
    try {
      const twoDaysFromNow = new Date()
      twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2)

      const expiringOffers = await prisma.offer.findMany({
        where: {
          status: 'ACTIVE',
          validUntil: {
            lte: twoDaysFromNow,
          },
          lead: {
            assignedToId: counselorId,
          },
        },
        include: {
          lead: {
            select: {
              id: true,
              studentName: true,
              assignedToId: true,
            },
          },
        },
      })

      const createdTasks = []

      for (const offer of expiringOffers) {
        const existingTask = await prisma.task.findFirst({
          where: {
            leadId: offer.leadId,
            type: 'OFFER_EXPIRY',
            status: {
              notIn: ['COMPLETED', 'CANCELLED'],
            },
            description: {
              contains: offer.offerName,
            },
          },
        })

        if (!existingTask) {
          const task = await this.createTask({
            leadId: offer.leadId,
            title: `Offer Expiring Soon - ${offer.offerName}`,
            description: `The offer "${offer.offerName}" for ${offer.lead.studentName} expires on ${offer.validUntil.toLocaleDateString()}. Follow up to encourage enrollment.`,
            type: 'OFFER_EXPIRY',
            priority: 'HIGH',
            dueDate: new Date(offer.validUntil),
            assignedToId: offer.lead.assignedToId || counselorId,
          })

          createdTasks.push(task)
        }
      }

      console.log(`✅ Created ${createdTasks.length} offer expiry tasks`)

      return createdTasks
    } catch (error) {
      console.error('Error creating offer expiry tasks:', error)
      throw error
    }
  }

  /**
   * Run all automated task creation jobs
   */
  static async runAutomation(counselorId: string) {
    try {
      const [paymentTasks, offerTasks] = await Promise.all([
        this.createPaymentReminderTasks(counselorId),
        this.createOfferExpiryTasks(counselorId),
      ])

      return {
        paymentReminders: paymentTasks.length,
        offerExpiries: offerTasks.length,
        total: paymentTasks.length + offerTasks.length,
      }
    } catch (error) {
      console.error('Error running task automation:', error)
      throw error
    }
  }
}
