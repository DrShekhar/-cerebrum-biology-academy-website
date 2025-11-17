import { TaskScheduler } from './taskQueue'
import { logger } from '@/lib/utils/logger'

let initialized = false

export async function initializeTaskScheduler() {
  if (initialized) {
    logger.info('Task scheduler already initialized')
    return
  }

  try {
    await TaskScheduler.initialize()
    initialized = true
    logger.info('Task scheduler initialization complete')

    if (typeof process !== 'undefined') {
      process.on('SIGTERM', async () => {
        logger.info('SIGTERM received, shutting down task scheduler')
        await TaskScheduler.shutdown()
        process.exit(0)
      })

      process.on('SIGINT', async () => {
        logger.info('SIGINT received, shutting down task scheduler')
        await TaskScheduler.shutdown()
        process.exit(0)
      })
    }
  } catch (error) {
    logger.error('Failed to initialize task scheduler', error)
    throw error
  }
}

export function isTaskSchedulerInitialized(): boolean {
  return initialized
}
