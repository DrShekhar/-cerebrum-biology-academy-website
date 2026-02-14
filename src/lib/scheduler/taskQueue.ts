import { logger } from '@/lib/utils/logger'

// Dynamic imports to avoid bundler warnings with BullMQ
// BullMQ uses dynamic requires for worker processes which triggers webpack warnings
type BullMQTypes = typeof import('bullmq')
let bullmq: BullMQTypes | null = null

const getBullMQ = async (): Promise<BullMQTypes | null> => {
  if (bullmq) return bullmq
  if (typeof window !== 'undefined') return null // Don't load on client
  try {
    bullmq = await import('bullmq')
    return bullmq
  } catch {
    return null
  }
}

const isRedisEnabled = process.env.REDIS_ENABLED === 'true' && process.env.REDIS_URL

interface DemoBookingReminderPayload {
  bookingId: string
  name: string
  phone: string
  preferredDate: string
  preferredTime: string
  type: 'confirmation' | 'reminder'
}

interface TaskPayload {
  demoBookingReminder?: DemoBookingReminderPayload
}

export class TaskScheduler {
  private static queue: InstanceType<BullMQTypes['Queue']> | null = null
  private static worker: InstanceType<BullMQTypes['Worker']> | null = null
  private static queueEvents: InstanceType<BullMQTypes['QueueEvents']> | null = null
  private static fallbackTasks: Map<string, NodeJS.Timeout> = new Map()

  static async initialize() {
    if (!isRedisEnabled) {
      logger.info('Task scheduler initialized in fallback mode (no Redis)')
      return
    }

    const bullmqModule = await getBullMQ()
    if (!bullmqModule) {
      logger.info('Task scheduler initialized in fallback mode (BullMQ not available)')
      return
    }

    const { Queue, Worker, QueueEvents } = bullmqModule

    try {
      const connection = {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
      }

      this.queue = new Queue('cerebrum-tasks', {
        connection,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: {
            age: 24 * 3600,
            count: 1000,
          },
          removeOnFail: {
            age: 7 * 24 * 3600,
          },
        },
      })

      this.queueEvents = new QueueEvents('cerebrum-tasks', { connection })

      this.queueEvents.on('completed', ({ jobId }) => {
        logger.info('Task completed', { jobId })
      })

      this.queueEvents.on('failed', ({ jobId, failedReason }) => {
        logger.error('Task failed', { jobId, failedReason })
      })

      this.worker = new Worker(
        'cerebrum-tasks',
        async (job) => {
          return await this.processTask(job as any)
        },
        {
          connection,
          concurrency: 10,
          limiter: {
            max: 100,
            duration: 1000,
          },
        }
      )

      this.worker.on('completed', (job) => {
        logger.info('Worker completed task', { jobId: job.id, name: job.name })
      })

      this.worker.on('failed', (job, error) => {
        logger.error('Worker failed task', { jobId: job?.id, error: error.message })
      })

      logger.info('Task scheduler initialized with Redis/BullMQ')
    } catch (error) {
      logger.error('Failed to initialize task scheduler, using fallback mode', error)
      this.queue = null
      this.worker = null
    }
  }

  static async scheduleTask(
    name: string,
    payload: TaskPayload,
    options: { delay?: number; scheduledTime?: Date } = {}
  ): Promise<string> {
    const taskId = `${name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    if (!isRedisEnabled || !this.queue) {
      return this.scheduleFallbackTask(taskId, name, payload, options)
    }

    try {
      const jobOptions: any = {}

      if (options.delay) {
        jobOptions.delay = options.delay
      } else if (options.scheduledTime) {
        const now = new Date().getTime()
        const scheduledTime = options.scheduledTime.getTime()
        jobOptions.delay = Math.max(0, scheduledTime - now)
      }

      const job = await this.queue.add(name, payload, jobOptions)

      logger.info('Task scheduled', {
        taskId: job.id,
        name,
        delay: jobOptions.delay,
        scheduledTime: options.scheduledTime,
      })

      return job.id || taskId
    } catch (error) {
      logger.error('Failed to schedule task with queue, using fallback', error)
      return this.scheduleFallbackTask(taskId, name, payload, options)
    }
  }

  private static scheduleFallbackTask(
    taskId: string,
    name: string,
    payload: TaskPayload,
    options: { delay?: number; scheduledTime?: Date }
  ): string {
    let delay = options.delay || 0

    if (options.scheduledTime) {
      const now = new Date().getTime()
      const scheduledTime = options.scheduledTime.getTime()
      delay = Math.max(0, scheduledTime - now)
    }

    const timeout = setTimeout(async () => {
      try {
        await this.processTask({ name, data: payload })
      } catch (error) {
        logger.error('Fallback task execution failed', { taskId, name, error })
      } finally {
        // ALWAYS cleanup task from Map, regardless of success or failure
        // This prevents memory leaks from accumulating failed tasks
        this.fallbackTasks.delete(taskId)
      }
    }, delay)

    this.fallbackTasks.set(taskId, timeout)

    logger.info('Task scheduled (fallback mode)', {
      taskId,
      name,
      delay,
      scheduledTime: options.scheduledTime,
    })

    return taskId
  }

  private static async processTask(job: { name: string; data: TaskPayload }): Promise<any> {
    const { name, data } = job

    logger.info('Processing task', { name, data })

    switch (name) {
      case 'demo-booking-confirmation':
        return await this.processDemoBookingReminder(data.demoBookingReminder!)
      case 'demo-booking-reminder':
        return await this.processDemoBookingReminder(data.demoBookingReminder!)
      default:
        logger.warn('Unknown task type', { name })
        return { status: 'skipped', reason: 'unknown task type' }
    }
  }

  private static async processDemoBookingReminder(
    payload: DemoBookingReminderPayload
  ): Promise<any> {
    const { bookingId, name, phone, preferredDate, preferredTime, type } = payload

    logger.info('Processing demo booking reminder', { bookingId, type })

    try {
      const prisma = (await import('@/lib/prisma')).default

      const booking = await prisma.demo_bookings.findUnique({
        where: { id: bookingId },
      })

      if (!booking) {
        logger.warn('Demo booking not found', { bookingId })
        return { status: 'skipped', reason: 'booking not found' }
      }

      if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
        logger.info('Demo booking already processed', { bookingId, status: booking.status })
        return { status: 'skipped', reason: 'booking already processed' }
      }

      if (type === 'confirmation') {
        const message = `Hi ${name}! This is a confirmation call for your demo class on ${preferredDate} at ${preferredTime}. Our team will reach out to you shortly on ${phone}. Thank you!`
        logger.info('Confirmation call scheduled', { bookingId, phone, message })
      } else if (type === 'reminder') {
        const message = `Hi ${name}! This is a reminder that your demo class is scheduled for tomorrow (${preferredDate}) at ${preferredTime}. See you soon!`
        logger.info('Reminder call scheduled', { bookingId, phone, message })
      }

      await prisma.demo_bookings.update({
        where: { id: bookingId },
        data: {
          metadata: {
            ...(booking.metadata as any),
            [`${type}Sent`]: new Date().toISOString(),
          },
        },
      })

      return { status: 'success', bookingId, type }
    } catch (error) {
      logger.error('Failed to process demo booking reminder', { bookingId, type, error })
      throw error
    }
  }

  static async cancelTask(taskId: string): Promise<boolean> {
    if (!isRedisEnabled || !this.queue) {
      const timeout = this.fallbackTasks.get(taskId)
      if (timeout) {
        clearTimeout(timeout)
        this.fallbackTasks.delete(taskId)
        logger.info('Fallback task cancelled', { taskId })
        return true
      }
      return false
    }

    try {
      const job = await this.queue.getJob(taskId)
      if (job) {
        await job.remove()
        logger.info('Task cancelled', { taskId })
        return true
      }
      return false
    } catch (error) {
      logger.error('Failed to cancel task', { taskId, error })
      return false
    }
  }

  static async shutdown(): Promise<void> {
    logger.info('Shutting down task scheduler')

    this.fallbackTasks.forEach((timeout) => clearTimeout(timeout))
    this.fallbackTasks.clear()

    if (this.worker) {
      await this.worker.close()
    }

    if (this.queue) {
      await this.queue.close()
    }

    if (this.queueEvents) {
      await this.queueEvents.close()
    }

    logger.info('Task scheduler shutdown complete')
  }
}

export async function scheduleDemoBookingTasks(bookingData: {
  id: string
  name: string
  phone: string
  preferredDate: string
  preferredTime: string
}) {
  const now = new Date()
  const preferredDate = new Date(bookingData.preferredDate)

  const confirmationTime = new Date(now.getTime() + 2 * 60 * 60 * 1000)

  const reminderTime = new Date(preferredDate.getTime() - 24 * 60 * 60 * 1000)

  const confirmationPayload: DemoBookingReminderPayload = {
    bookingId: bookingData.id,
    name: bookingData.name,
    phone: bookingData.phone,
    preferredDate: bookingData.preferredDate,
    preferredTime: bookingData.preferredTime,
    type: 'confirmation',
  }

  const reminderPayload: DemoBookingReminderPayload = {
    bookingId: bookingData.id,
    name: bookingData.name,
    phone: bookingData.phone,
    preferredDate: bookingData.preferredDate,
    preferredTime: bookingData.preferredTime,
    type: 'reminder',
  }

  const confirmationTaskId = await TaskScheduler.scheduleTask(
    'demo-booking-confirmation',
    { demoBookingReminder: confirmationPayload },
    { scheduledTime: confirmationTime }
  )

  const reminderTaskId = await TaskScheduler.scheduleTask(
    'demo-booking-reminder',
    { demoBookingReminder: reminderPayload },
    { scheduledTime: reminderTime }
  )

  logger.info('Demo booking tasks scheduled', {
    bookingId: bookingData.id,
    confirmationTaskId,
    reminderTaskId,
    confirmationTime,
    reminderTime,
  })

  return {
    confirmationTaskId,
    reminderTaskId,
  }
}
