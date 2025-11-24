import { evaluateRule, processLeadRules, processTimeTriggers } from '@/lib/followupEngine'
import { prisma } from '@/lib/prisma'

// Mock Prisma client
jest.mock('@/lib/prisma', () => ({
  prisma: {
    leads: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    followup_rules: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    followup_queue: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}))

describe('Follow-up Engine', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('evaluateRule', () => {
    const mockLeadBase = {
      id: 'lead-123',
      studentName: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      stage: 'DEMO_COMPLETED',
      score: 85,
      priority: 'HOT',
      createdAt: new Date('2025-11-01'),
      lastContactedAt: new Date('2025-11-15'),
      assignedToId: 'counselor-1',
      crm_communications: [],
      tasks: [],
      activities: [],
      demo_bookings: [],
      offers: [],
    }

    it('should return false if lead is not found', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(null)
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
        id: 'rule-1',
        isActive: true,
        triggerType: 'STAGE_CHANGE',
        triggerConditions: { targetStage: 'DEMO_COMPLETED' },
      })

      const result = await evaluateRule('lead-123', 'rule-1')

      expect(result).toBe(false)
    })

    it('should return false if rule is not found', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await evaluateRule('lead-123', 'rule-1')

      expect(result).toBe(false)
    })

    it('should return false if rule is not active', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
        id: 'rule-1',
        isActive: false,
        triggerType: 'STAGE_CHANGE',
        triggerConditions: { targetStage: 'DEMO_COMPLETED' },
      })

      const result = await evaluateRule('lead-123', 'rule-1')

      expect(result).toBe(false)
    })

    describe('STAGE_CHANGE trigger', () => {
      it('should trigger when lead stage matches targetStage', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'STAGE_CHANGE',
          triggerConditions: { targetStage: 'DEMO_COMPLETED' },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should not trigger when lead stage does not match targetStage', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'STAGE_CHANGE',
          triggerConditions: { targetStage: 'NEW_LEAD' },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })

      it('should trigger when lead stage is in targetStages array', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'STAGE_CHANGE',
          triggerConditions: {
            targetStages: ['DEMO_SCHEDULED', 'DEMO_COMPLETED', 'OFFER_SENT'],
          },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should trigger when stage matches toStage from fromStage transition', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'STAGE_CHANGE',
          triggerConditions: {
            fromStage: 'DEMO_SCHEDULED',
            toStage: 'DEMO_COMPLETED',
          },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })
    })

    describe('TIME_BASED trigger', () => {
      it('should trigger when days since creation meets threshold', async () => {
        const pastDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // 8 days ago
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          createdAt: pastDate,
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'TIME_BASED',
          triggerConditions: { timePeriodDays: 7 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should not trigger when days since creation is below threshold', async () => {
        const recentDate = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          createdAt: recentDate,
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'TIME_BASED',
          triggerConditions: { timePeriodDays: 7 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })

      it('should return false when timePeriodDays is not specified', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'TIME_BASED',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })
    })

    describe('SCORE_THRESHOLD trigger', () => {
      it('should trigger when score is greater than threshold with GREATER_THAN operator', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'SCORE_THRESHOLD',
          triggerConditions: {
            scoreThreshold: 80,
            scoreOperator: 'GREATER_THAN',
          },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should trigger when score is less than threshold with LESS_THAN operator', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          score: 50,
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'SCORE_THRESHOLD',
          triggerConditions: {
            scoreThreshold: 60,
            scoreOperator: 'LESS_THAN',
          },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should trigger when score equals threshold with EQUALS operator', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          score: 75,
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'SCORE_THRESHOLD',
          triggerConditions: {
            scoreThreshold: 75,
            scoreOperator: 'EQUALS',
          },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should use default >= comparison when operator not specified', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'SCORE_THRESHOLD',
          triggerConditions: { scoreThreshold: 85 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should return false when lead has no score', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          score: null,
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'SCORE_THRESHOLD',
          triggerConditions: { scoreThreshold: 80 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })
    })

    describe('INACTIVITY trigger', () => {
      it('should trigger when days since last contact exceeds threshold', async () => {
        const pastContactDate = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          crm_communications: [{ sentAt: pastContactDate }],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'INACTIVITY',
          triggerConditions: { inactivityDays: 7 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should trigger when lead has no communications', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          crm_communications: [],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'INACTIVITY',
          triggerConditions: { inactivityDays: 7 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should not trigger when recent contact exists', async () => {
        const recentContactDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          crm_communications: [{ sentAt: recentContactDate }],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'INACTIVITY',
          triggerConditions: { inactivityDays: 7 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })
    })

    describe('DEMO_NO_SHOW trigger', () => {
      it('should trigger when demo status is NO_SHOW', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          demo_bookings: [
            {
              status: 'NO_SHOW',
              scheduledAt: new Date('2025-11-20'),
            },
          ],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'DEMO_NO_SHOW',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should trigger when scheduled demo time passed by 2+ hours', async () => {
        const pastDemoTime = new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          demo_bookings: [
            {
              status: 'SCHEDULED',
              scheduledAt: pastDemoTime,
            },
          ],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'DEMO_NO_SHOW',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should not trigger when demo is scheduled in future', async () => {
        const futureDemoTime = new Date(Date.now() + 24 * 60 * 60 * 1000)
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          demo_bookings: [
            {
              status: 'SCHEDULED',
              scheduledAt: futureDemoTime,
            },
          ],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'DEMO_NO_SHOW',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })

      it('should return false when no demo bookings exist', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          demo_bookings: [],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'DEMO_NO_SHOW',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })
    })

    describe('DEMO_COMPLETED trigger', () => {
      it('should trigger when latest demo status is COMPLETED', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          demo_bookings: [
            {
              status: 'COMPLETED',
              scheduledAt: new Date('2025-11-20'),
            },
          ],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'DEMO_COMPLETED',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should not trigger when demo is not completed', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          demo_bookings: [
            {
              status: 'SCHEDULED',
              scheduledAt: new Date('2025-11-20'),
            },
          ],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'DEMO_COMPLETED',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })

      it('should return false when no demo bookings exist', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          demo_bookings: [],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'DEMO_COMPLETED',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })
    })

    describe('OFFER_SENT trigger', () => {
      it('should trigger when days since offer meets threshold', async () => {
        const pastOfferDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          offers: [
            {
              createdAt: pastOfferDate,
              totalAmount: 15000,
            },
          ],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'OFFER_SENT',
          triggerConditions: { timePeriodDays: 2 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should use default 1 day when timePeriodDays not specified', async () => {
        const pastOfferDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          offers: [{ createdAt: pastOfferDate }],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'OFFER_SENT',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(true)
      })

      it('should return false when no offers exist', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
          ...mockLeadBase,
          offers: [],
        })
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'OFFER_SENT',
          triggerConditions: { timePeriodDays: 1 },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })
    })

    describe('CUSTOM trigger', () => {
      it('should return false for custom conditions (stub implementation)', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'CUSTOM',
          triggerConditions: { customCondition: 'lead.score > 80 && lead.stage === "HOT"' },
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })

      it('should return false when customCondition is not provided', async () => {
        ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
        ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
          id: 'rule-1',
          isActive: true,
          triggerType: 'CUSTOM',
          triggerConditions: {},
        })

        const result = await evaluateRule('lead-123', 'rule-1')

        expect(result).toBe(false)
      })
    })

    it('should return false for unknown trigger types', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(mockLeadBase)
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
        id: 'rule-1',
        isActive: true,
        triggerType: 'UNKNOWN_TRIGGER',
        triggerConditions: {},
      })

      const result = await evaluateRule('lead-123', 'rule-1')

      expect(result).toBe(false)
    })

    it('should handle errors gracefully and return false', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

      const result = await evaluateRule('lead-123', 'rule-1')

      expect(result).toBe(false)
    })
  })

  describe('processLeadRules', () => {
    it('should process all active rules for a lead', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
        id: 'lead-123',
        assignedToId: 'counselor-1',
      })
      ;(prisma.followup_rules.findMany as jest.Mock).mockResolvedValue([
        {
          id: 'rule-1',
          name: 'Welcome Email',
          isActive: true,
          triggerType: 'STAGE_CHANGE',
          triggerConditions: { targetStage: 'NEW_LEAD' },
          delayMinutes: 0,
        },
        {
          id: 'rule-2',
          name: 'Follow-up SMS',
          isActive: true,
          triggerType: 'TIME_BASED',
          triggerConditions: { timePeriodDays: 7 },
          delayMinutes: 60,
        },
      ])
      ;(prisma.followup_queue.findFirst as jest.Mock).mockResolvedValue(null)
      ;(prisma.followup_queue.create as jest.Mock).mockResolvedValue({})

      // Mock evaluateRule to return true for first rule, false for second
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'lead-123',
        stage: 'NEW_LEAD',
        crm_communications: [],
        tasks: [],
        activities: [],
        demo_bookings: [],
        offers: [],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      })
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValueOnce({
        id: 'rule-1',
        isActive: true,
        triggerType: 'STAGE_CHANGE',
        triggerConditions: { targetStage: 'NEW_LEAD' },
      })

      await processLeadRules('lead-123')

      expect(prisma.followup_rules.findMany).toHaveBeenCalledWith({
        where: { isActive: true },
      })
    })

    it('should not create duplicate queue items', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
        id: 'lead-123',
        assignedToId: 'counselor-1',
        stage: 'NEW_LEAD',
        crm_communications: [],
        tasks: [],
        activities: [],
        demo_bookings: [],
        offers: [],
      })
      ;(prisma.followup_rules.findMany as jest.Mock).mockResolvedValue([
        {
          id: 'rule-1',
          name: 'Welcome Email',
          isActive: true,
          triggerType: 'STAGE_CHANGE',
          triggerConditions: { targetStage: 'NEW_LEAD' },
          delayMinutes: 0,
        },
      ])
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
        id: 'rule-1',
        isActive: true,
        triggerType: 'STAGE_CHANGE',
        triggerConditions: { targetStage: 'NEW_LEAD' },
      })
      // Existing queue item found
      ;(prisma.followup_queue.findFirst as jest.Mock).mockResolvedValue({
        id: 'queue-1',
        leadId: 'lead-123',
        ruleId: 'rule-1',
        status: 'PENDING',
      })

      await processLeadRules('lead-123')

      expect(prisma.followup_queue.create).not.toHaveBeenCalled()
    })

    it('should handle lead not found gracefully', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue(null)

      await expect(processLeadRules('lead-123')).resolves.not.toThrow()
    })

    it('should throw errors for other failures', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'))

      await expect(processLeadRules('lead-123')).rejects.toThrow('Database error')
    })
  })

  describe('processTimeTriggers', () => {
    it('should process all time-based rules', async () => {
      ;(prisma.followup_rules.findMany as jest.Mock).mockResolvedValue([
        {
          id: 'rule-1',
          name: 'Weekly Follow-up',
          isActive: true,
          triggerType: 'TIME_BASED',
          triggerConditions: { timePeriodDays: 7 },
          delayMinutes: 0,
        },
      ])
      ;(prisma.leads.findMany as jest.Mock).mockResolvedValue([{ id: 'lead-1' }, { id: 'lead-2' }])
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
        id: 'lead-1',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        stage: 'NEW_LEAD',
        crm_communications: [],
        tasks: [],
        activities: [],
        demo_bookings: [],
        offers: [],
      })
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
        id: 'rule-1',
        isActive: true,
        triggerType: 'TIME_BASED',
        triggerConditions: { timePeriodDays: 7 },
      })
      ;(prisma.followup_queue.findFirst as jest.Mock).mockResolvedValue(null)
      ;(prisma.followup_queue.create as jest.Mock).mockResolvedValue({})

      await processTimeTriggers()

      expect(prisma.followup_rules.findMany).toHaveBeenCalledWith({
        where: {
          isActive: true,
          triggerType: 'TIME_BASED',
        },
      })
      expect(prisma.leads.findMany).toHaveBeenCalled()
    })

    it('should use default timePeriodDays of 7 when not specified', async () => {
      ;(prisma.followup_rules.findMany as jest.Mock).mockResolvedValue([
        {
          id: 'rule-1',
          isActive: true,
          triggerType: 'TIME_BASED',
          triggerConditions: {},
        },
      ])
      ;(prisma.leads.findMany as jest.Mock).mockResolvedValue([])

      await processTimeTriggers()

      // Should calculate cutoff date using 7 days
      expect(prisma.leads.findMany).toHaveBeenCalled()
    })

    it('should exclude completed and lost leads', async () => {
      ;(prisma.followup_rules.findMany as jest.Mock).mockResolvedValue([
        {
          id: 'rule-1',
          isActive: true,
          triggerType: 'TIME_BASED',
          triggerConditions: { timePeriodDays: 7 },
        },
      ])
      ;(prisma.leads.findMany as jest.Mock).mockResolvedValue([])

      await processTimeTriggers()

      expect(prisma.leads.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            stage: { notIn: ['ENROLLED', 'ACTIVE_STUDENT', 'LOST'] },
          }),
        })
      )
    })

    it('should handle errors gracefully', async () => {
      ;(prisma.followup_rules.findMany as jest.Mock).mockRejectedValue(new Error('Database error'))

      await expect(processTimeTriggers()).rejects.toThrow('Database error')
    })
  })

  describe('Edge Cases', () => {
    it('should handle zero score correctly', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
        id: 'lead-123',
        score: 0,
        crm_communications: [],
        tasks: [],
        activities: [],
        demo_bookings: [],
        offers: [],
      })
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
        id: 'rule-1',
        isActive: true,
        triggerType: 'SCORE_THRESHOLD',
        triggerConditions: {
          scoreThreshold: 0,
          scoreOperator: 'EQUALS',
        },
      })

      const result = await evaluateRule('lead-123', 'rule-1')

      expect(result).toBe(true)
    })

    it('should handle very old leads correctly', async () => {
      const veryOldDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
        id: 'lead-123',
        createdAt: veryOldDate,
        crm_communications: [],
        tasks: [],
        activities: [],
        demo_bookings: [],
        offers: [],
      })
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
        id: 'rule-1',
        isActive: true,
        triggerType: 'TIME_BASED',
        triggerConditions: { timePeriodDays: 30 },
      })

      const result = await evaluateRule('lead-123', 'rule-1')

      expect(result).toBe(true)
    })

    it('should handle null/undefined fields gracefully', async () => {
      ;(prisma.leads.findUnique as jest.Mock).mockResolvedValue({
        id: 'lead-123',
        stage: null,
        score: null,
        createdAt: null,
        crm_communications: null,
        demo_bookings: null,
        offers: null,
      })
      ;(prisma.followup_rules.findUnique as jest.Mock).mockResolvedValue({
        id: 'rule-1',
        isActive: true,
        triggerType: 'STAGE_CHANGE',
        triggerConditions: { targetStage: 'NEW_LEAD' },
      })

      const result = await evaluateRule('lead-123', 'rule-1')

      expect(result).toBe(false)
    })
  })
})
