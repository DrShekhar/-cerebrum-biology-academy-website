import {
  processQueue,
  executeFollowup,
  cancelQueueItem,
  skipQueueItem,
} from '@/lib/followupProcessor'
import { prisma } from '@/lib/prisma'
import { renderTemplate } from '@/lib/templateRenderer'

// Mock dependencies
jest.mock('@/lib/prisma', () => ({
  prisma: {
    followup_queue: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
    },
    followup_history: {
      create: jest.fn(),
    },
    tasks: {
      create: jest.fn(),
    },
  },
}))

jest.mock('@/lib/templateRenderer', () => ({
  renderTemplate: jest.fn(),
}))

describe('Follow-up Processor', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock console methods to reduce noise
    jest.spyOn(console, 'log').mockImplementation()
    jest.spyOn(console, 'error').mockImplementation()
    jest.spyOn(console, 'warn').mockImplementation()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('processQueue', () => {
    it('should fetch and process pending queue items', async () => {
      const mockQueueItems = [
        {
          id: 'queue-1',
          leadId: 'lead-1',
          ruleId: 'rule-1',
          scheduledFor: new Date('2025-11-24T10:00:00Z'),
          status: 'PENDING',
        },
        {
          id: 'queue-2',
          leadId: 'lead-2',
          ruleId: 'rule-2',
          scheduledFor: new Date('2025-11-24T11:00:00Z'),
          status: 'PENDING',
        },
      ]

      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue(mockQueueItems)
      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({})
      ;(prisma.followup_queue.findUnique as jest.Mock).mockImplementation((args) => {
        const item = mockQueueItems.find((i) => i.id === args.where.id)
        return Promise.resolve({
          ...item,
          attempt: 0,
          maxAttempts: 3,
          lead: {
            id: 'lead-1',
            email: 'test@example.com',
            assignedToId: 'user-1',
          },
          rule: {
            name: 'Test Rule',
            actionType: 'EMAIL',
            priority: 'WARM',
            template: {
              content: 'Test email',
            },
          },
        })
      })
      ;(prisma.followup_history.create as jest.Mock).mockResolvedValue({})
      ;(renderTemplate as jest.Mock).mockReturnValue('Rendered content')

      await processQueue()

      expect(prisma.followup_queue.findMany).toHaveBeenCalledWith({
        where: {
          scheduledFor: { lte: expect.any(Date) },
          status: 'PENDING',
        },
        include: expect.any(Object),
        take: 50,
        orderBy: { scheduledFor: 'asc' },
      })

      expect(prisma.followup_queue.update).toHaveBeenCalledTimes(4)
    })

    it('should handle empty queue gracefully', async () => {
      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue([])

      await processQueue()

      expect(prisma.followup_queue.findMany).toHaveBeenCalled()
      expect(console.log).toHaveBeenCalledWith('Processing 0 due follow-up items')
    })

    it('should throw errors for processing failures', async () => {
      ;(prisma.followup_queue.findMany as jest.Mock).mockRejectedValue(new Error('Database error'))

      await expect(processQueue()).rejects.toThrow('Database error')
      expect(console.error).toHaveBeenCalled()
    })

    it('should process up to 50 items in batch', async () => {
      const mockQueueItems = Array.from({ length: 100 }, (_, i) => ({
        id: `queue-${i}`,
        leadId: `lead-${i}`,
        ruleId: `rule-${i}`,
        scheduledFor: new Date(),
        status: 'PENDING',
      }))

      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue(mockQueueItems)

      await processQueue()

      expect(prisma.followup_queue.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          take: 50,
        })
      )
    })
  })

  describe('executeFollowup', () => {
    const mockLead = {
      id: 'lead-1',
      email: 'test@example.com',
      phone: '+1234567890',
      studentName: 'John Doe',
      assignedToId: 'user-1',
    }

    const mockRule = {
      id: 'rule-1',
      name: 'Test Rule',
      priority: 'HOT',
    }

    describe('EMAIL action', () => {
      it('should execute EMAIL action successfully', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'EMAIL',
            template: {
              content: 'Hello {{studentName}}',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockReturnValue('Hello John Doe')

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(true)
        expect(result.message).toContain('Email sent successfully')
        expect(result.deliveryId).toMatch(/^email_\d+$/)
        expect(renderTemplate).toHaveBeenCalledWith(queueItem.rule.template, mockLead)
      })
    })

    describe('WHATSAPP action', () => {
      it('should execute WHATSAPP action successfully', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'WHATSAPP',
            template: {
              content: 'Hello {{studentName}}',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockReturnValue('Hello John Doe')

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(true)
        expect(result.message).toContain('WhatsApp sent successfully')
        expect(result.deliveryId).toMatch(/^whatsapp_\d+$/)
      })
    })

    describe('SMS action', () => {
      it('should execute SMS action successfully', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'SMS',
            template: {
              content: 'Hello {{studentName}}',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockReturnValue('Hello John Doe')

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(true)
        expect(result.message).toContain('SMS sent successfully')
        expect(result.deliveryId).toMatch(/^sms_\d+$/)
      })
    })

    describe('CALL_TASK action', () => {
      it('should create call task successfully', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'CALL_TASK',
            template: {
              content: 'Call regarding {{studentName}}',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockReturnValue('Call regarding John Doe')
        ;(prisma.tasks.create as jest.Mock).mockResolvedValue({
          id: 'task-1',
          title: 'Follow-up Call: John Doe',
        })

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(true)
        expect(result.message).toContain('Call task created')
        expect(result.deliveryId).toMatch(/^task_\d+$/)
        expect(prisma.tasks.create).toHaveBeenCalledWith({
          data: {
            title: 'Follow-up Call: John Doe',
            description: 'Call regarding John Doe',
            type: 'CALL',
            priority: 'HOT',
            status: 'PENDING',
            dueDate: expect.any(Date),
            userId: 'user-1',
            leadId: 'lead-1',
          },
        })
      })

      it('should handle task creation failure', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'CALL_TASK',
            template: {
              content: 'Call task',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockReturnValue('Call task')
        ;(prisma.tasks.create as jest.Mock).mockRejectedValue(new Error('Task creation failed'))

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(false)
        expect(result.message).toContain('Task creation failed')
      })
    })

    describe('NOTIFICATION action', () => {
      it('should create notification successfully', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'NOTIFICATION',
            template: {
              content: 'Notification for {{studentName}}',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockReturnValue('Notification for John Doe')

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(true)
        expect(result.message).toContain('Notification created successfully')
        expect(result.deliveryId).toMatch(/^notification_\d+$/)
      })
    })

    describe('TASK action', () => {
      it('should create generic task successfully', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'TASK',
            template: {
              content: 'Follow up with {{studentName}}',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockReturnValue('Follow up with John Doe')
        ;(prisma.tasks.create as jest.Mock).mockResolvedValue({
          id: 'task-1',
          title: 'Follow-up: John Doe',
        })

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(true)
        expect(result.message).toContain('Task created')
        expect(result.deliveryId).toMatch(/^task_\d+$/)
        expect(prisma.tasks.create).toHaveBeenCalledWith({
          data: {
            title: 'Follow-up: John Doe',
            description: 'Follow up with John Doe',
            type: 'FOLLOW_UP',
            priority: 'HOT',
            status: 'PENDING',
            dueDate: expect.any(Date),
            userId: 'user-1',
            leadId: 'lead-1',
          },
        })
      })
    })

    describe('Error handling', () => {
      it('should return failure for missing lead', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: null,
          rule: {
            actionType: 'EMAIL',
          },
        }

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(false)
        expect(result.message).toBe('Lead or rule not found')
      })

      it('should return failure for missing rule', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: null,
        }

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(false)
        expect(result.message).toBe('Lead or rule not found')
      })

      it('should return failure for unknown action type', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'UNKNOWN_TYPE',
          },
        }

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(false)
        expect(result.message).toContain('Unknown action type')
      })

      it('should handle template rendering errors', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'EMAIL',
            template: {
              content: 'Test',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockImplementation(() => {
          throw new Error('Template rendering failed')
        })

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(false)
        expect(result.message).toBe('Template rendering failed')
      })

      it('should render template with lead data when template exists', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'EMAIL',
            template: {
              id: 'template-1',
              content: 'Hello {{studentName}}',
            },
          },
        }

        ;(renderTemplate as jest.Mock).mockReturnValue('Hello John Doe')

        await executeFollowup(queueItem)

        expect(renderTemplate).toHaveBeenCalledWith(queueItem.rule.template, mockLead)
      })

      it('should handle execution without template', async () => {
        const queueItem = {
          id: 'queue-1',
          lead: mockLead,
          rule: {
            ...mockRule,
            actionType: 'EMAIL',
            template: null,
          },
        }

        const result = await executeFollowup(queueItem)

        expect(result.success).toBe(true)
        expect(renderTemplate).not.toHaveBeenCalled()
      })
    })
  })

  describe('cancelQueueItem', () => {
    it('should cancel queue item successfully', async () => {
      const queueItemId = 'queue-1'
      const reason = 'Manual cancellation'

      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({
        id: queueItemId,
        status: 'CANCELLED',
      })

      await cancelQueueItem(queueItemId, reason)

      expect(prisma.followup_queue.update).toHaveBeenCalledWith({
        where: { id: queueItemId },
        data: {
          status: 'CANCELLED',
          errorMessage: reason,
        },
      })
      expect(console.log).toHaveBeenCalledWith(`Cancelled queue item ${queueItemId}`)
    })

    it('should use default reason when not provided', async () => {
      const queueItemId = 'queue-1'

      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({
        id: queueItemId,
        status: 'CANCELLED',
      })

      await cancelQueueItem(queueItemId)

      expect(prisma.followup_queue.update).toHaveBeenCalledWith({
        where: { id: queueItemId },
        data: {
          status: 'CANCELLED',
          errorMessage: 'Cancelled by user',
        },
      })
    })

    it('should throw errors for database failures', async () => {
      const queueItemId = 'queue-1'

      ;(prisma.followup_queue.update as jest.Mock).mockRejectedValue(new Error('Database error'))

      await expect(cancelQueueItem(queueItemId)).rejects.toThrow('Database error')
    })
  })

  describe('skipQueueItem', () => {
    it('should skip queue item successfully', async () => {
      const queueItemId = 'queue-1'
      const reason = 'Not applicable anymore'

      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({
        id: queueItemId,
        status: 'SKIPPED',
      })

      await skipQueueItem(queueItemId, reason)

      expect(prisma.followup_queue.update).toHaveBeenCalledWith({
        where: { id: queueItemId },
        data: {
          status: 'SKIPPED',
          errorMessage: reason,
        },
      })
      expect(console.log).toHaveBeenCalledWith(`Skipped queue item ${queueItemId}`)
    })

    it('should use default reason when not provided', async () => {
      const queueItemId = 'queue-1'

      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({
        id: queueItemId,
        status: 'SKIPPED',
      })

      await skipQueueItem(queueItemId)

      expect(prisma.followup_queue.update).toHaveBeenCalledWith({
        where: { id: queueItemId },
        data: {
          status: 'SKIPPED',
          errorMessage: 'Skipped by user',
        },
      })
    })

    it('should throw errors for database failures', async () => {
      const queueItemId = 'queue-1'

      ;(prisma.followup_queue.update as jest.Mock).mockRejectedValue(new Error('Database error'))

      await expect(skipQueueItem(queueItemId)).rejects.toThrow('Database error')
    })
  })

  describe('Retry Mechanism', () => {
    it('should retry failed items with attempts below max', async () => {
      const queueItem = {
        id: 'queue-1',
        leadId: 'lead-1',
        ruleId: 'rule-1',
        attempt: 1,
        maxAttempts: 3,
        lead: {
          id: 'lead-1',
          email: 'test@example.com',
        },
        rule: {
          name: 'Test Rule',
          actionType: 'EMAIL',
          template: {
            content: 'Test',
          },
        },
      }

      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue([])
      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({})
      ;(prisma.followup_queue.findUnique as jest.Mock).mockResolvedValue(queueItem)
      ;(renderTemplate as jest.Mock).mockImplementation(() => {
        throw new Error('Network error')
      })

      const result = await executeFollowup(queueItem)

      expect(result.success).toBe(false)
      expect(result.message).toBe('Network error')
    })

    it('should return failure when execution fails', async () => {
      const queueItem = {
        id: 'queue-1',
        leadId: 'lead-1',
        ruleId: 'rule-1',
        attempt: 2,
        maxAttempts: 3,
        lead: {
          id: 'lead-1',
          email: 'test@example.com',
        },
        rule: {
          name: 'Test Rule',
          actionType: 'EMAIL',
          template: {
            content: 'Test',
          },
        },
      }

      ;(renderTemplate as jest.Mock).mockImplementation(() => {
        throw new Error('Permanent failure')
      })

      const result = await executeFollowup(queueItem)

      expect(result.success).toBe(false)
      expect(result.message).toBe('Permanent failure')
    })
  })

  describe('Status Transitions', () => {
    it('should transition from PENDING to PROCESSING', async () => {
      const queueItem = {
        id: 'queue-1',
        leadId: 'lead-1',
        ruleId: 'rule-1',
        scheduledFor: new Date(),
        status: 'PENDING',
      }

      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue([queueItem])
      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({})
      ;(prisma.followup_queue.findUnique as jest.Mock).mockResolvedValue({
        id: 'queue-1',
        attempt: 0,
        maxAttempts: 3,
        leadId: 'lead-1',
        ruleId: 'rule-1',
        lead: { id: 'lead-1', email: 'test@example.com', assignedToId: 'user-1' },
        rule: { name: 'Test Rule', actionType: 'EMAIL', priority: 'WARM', template: null },
      })
      ;(prisma.followup_history.create as jest.Mock).mockResolvedValue({})

      await processQueue()

      expect(prisma.followup_queue.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'queue-1' },
          data: expect.objectContaining({
            status: 'PROCESSING',
            lastAttemptAt: expect.any(Date),
          }),
        })
      )
    })

    it('should transition from PROCESSING to COMPLETED on success', async () => {
      const queueItem = {
        id: 'queue-1',
        leadId: 'lead-1',
        ruleId: 'rule-1',
        attempt: 0,
        maxAttempts: 3,
        lead: {
          id: 'lead-1',
          email: 'test@example.com',
          assignedToId: 'user-1',
        },
        rule: {
          name: 'Test Rule',
          actionType: 'EMAIL',
          priority: 'WARM',
          template: null,
        },
      }

      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue([queueItem])
      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({})
      ;(prisma.followup_queue.findUnique as jest.Mock).mockResolvedValue(queueItem)
      ;(prisma.followup_history.create as jest.Mock).mockResolvedValue({})

      await processQueue()

      expect(prisma.followup_queue.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'queue-1' },
          data: expect.objectContaining({
            status: 'COMPLETED',
            completedAt: expect.any(Date),
          }),
        })
      )
    })

    it('should create history record after successful completion', async () => {
      const queueItem = {
        id: 'queue-1',
        leadId: 'lead-1',
        ruleId: 'rule-1',
        attempt: 0,
        maxAttempts: 3,
        lead: {
          id: 'lead-1',
          email: 'test@example.com',
          assignedToId: 'user-1',
        },
        rule: {
          id: 'rule-1',
          name: 'Welcome Email',
          actionType: 'EMAIL',
          priority: 'HOT',
          template: null,
        },
      }

      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue([queueItem])
      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({})
      ;(prisma.followup_queue.findUnique as jest.Mock).mockResolvedValue(queueItem)
      ;(prisma.followup_history.create as jest.Mock).mockResolvedValue({})

      await processQueue()

      expect(prisma.followup_history.create).toHaveBeenCalledWith({
        data: {
          leadId: 'lead-1',
          ruleId: 'rule-1',
          action: 'EMAIL',
          channel: 'EMAIL',
          content: expect.any(String),
          status: 'SENT',
          isAutomated: true,
          metadata: {
            queueItemId: 'queue-1',
            deliveryId: expect.any(String),
            ruleTriggered: 'Welcome Email',
          },
        },
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle queue item not found gracefully', async () => {
      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue([{ id: 'queue-1' }])
      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({})
      ;(prisma.followup_queue.findUnique as jest.Mock).mockResolvedValue(null)

      await processQueue()

      expect(prisma.followup_queue.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'queue-1' },
          data: expect.objectContaining({
            status: 'FAILED',
          }),
        })
      )
    })

    it('should handle very long content in templates', async () => {
      const longContent = 'A'.repeat(10000)
      const queueItem = {
        id: 'queue-1',
        lead: {
          id: 'lead-1',
          email: 'test@example.com',
        },
        rule: {
          name: 'Test Rule',
          actionType: 'EMAIL',
          template: {
            content: longContent,
          },
        },
      }

      ;(renderTemplate as jest.Mock).mockReturnValue(longContent)

      const result = await executeFollowup(queueItem)

      expect(result.success).toBe(true)
      expect(renderTemplate).toHaveBeenCalledWith(queueItem.rule.template, queueItem.lead)
    })

    it('should handle concurrent processing attempts', async () => {
      const queueItem = {
        id: 'queue-1',
        leadId: 'lead-1',
        ruleId: 'rule-1',
        attempt: 0,
        maxAttempts: 3,
        lead: { id: 'lead-1', email: 'test@example.com', assignedToId: 'user-1' },
        rule: { name: 'Test', actionType: 'EMAIL', priority: 'WARM', template: null },
      }

      ;(prisma.followup_queue.findMany as jest.Mock).mockResolvedValue([queueItem, queueItem])
      ;(prisma.followup_queue.update as jest.Mock).mockResolvedValue({})
      ;(prisma.followup_queue.findUnique as jest.Mock).mockResolvedValue(queueItem)
      ;(prisma.followup_history.create as jest.Mock).mockResolvedValue({})

      await processQueue()

      expect(prisma.followup_queue.update).toHaveBeenCalled()
    })

    it('should handle missing assignedToId gracefully', async () => {
      const queueItem = {
        id: 'queue-1',
        lead: {
          id: 'lead-1',
          email: 'test@example.com',
          assignedToId: null,
        },
        rule: {
          name: 'Test Rule',
          actionType: 'CALL_TASK',
          priority: 'WARM',
          template: null,
        },
      }

      ;(prisma.tasks.create as jest.Mock).mockResolvedValue({
        id: 'task-1',
      })

      const result = await executeFollowup(queueItem)

      expect(result.success).toBe(true)
      expect(prisma.tasks.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          userId: null,
        }),
      })
    })
  })
})
