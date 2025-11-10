/**
 * Offline Queue Utility
 * Provides client-side interface to queue actions when offline
 * and sync them when connection is restored
 */

export interface OfflineAction {
  type: string
  url: string
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'
  body?: any
  headers?: Record<string, string>
  metadata?: Record<string, any>
}

class OfflineQueueManager {
  private serviceWorker: ServiceWorker | null = null

  constructor() {
    this.initializeServiceWorker()
  }

  private async initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready
        this.serviceWorker = registration.active
      } catch (error) {
        console.error('Failed to initialize service worker:', error)
      }
    }
  }

  /**
   * Check if device is online
   */
  isOnline(): boolean {
    return navigator.onLine
  }

  /**
   * Queue an action for offline sync
   */
  async queueAction(action: OfflineAction): Promise<void> {
    if (!this.serviceWorker) {
      await this.initializeServiceWorker()
    }

    if (!this.serviceWorker) {
      console.error('Service worker not available. Cannot queue offline action.')
      return
    }

    // Send message to service worker to queue the action
    this.serviceWorker.postMessage({
      type: 'QUEUE_ACTION',
      action,
    })

    console.log('Offline action queued:', action.type)
  }

  /**
   * Trigger background sync
   */
  async triggerSync(): Promise<void> {
    if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
      try {
        const registration = await navigator.serviceWorker.ready
        await registration.sync.register('background-sync')
        console.log('Background sync registered')
      } catch (error) {
        console.error('Background sync failed:', error)
      }
    } else {
      console.warn('Background sync not supported')
    }
  }

  /**
   * Listen for sync completion events
   */
  onSyncComplete(callback: (data: any) => void): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SYNC_COMPLETE') {
          callback(event.data)
        }
      })
    }
  }

  /**
   * Clear all cached data
   */
  async clearCache(): Promise<void> {
    if (!this.serviceWorker) {
      await this.initializeServiceWorker()
    }

    if (!this.serviceWorker) {
      console.error('Service worker not available')
      return
    }

    return new Promise((resolve) => {
      const messageChannel = new MessageChannel()

      messageChannel.port1.onmessage = (event) => {
        if (event.data && event.data.type === 'CACHE_CLEARED') {
          console.log('Cache cleared successfully')
          resolve()
        }
      }

      this.serviceWorker!.postMessage(
        {
          type: 'CLEAR_CACHE',
        },
        [messageChannel.port2]
      )
    })
  }

  /**
   * Retry a failed API call with offline support
   */
  async retryWithOfflineSupport<T>(
    fetchFn: () => Promise<T>,
    offlineAction: OfflineAction
  ): Promise<T> {
    try {
      // Try the network request first
      return await fetchFn()
    } catch (error) {
      // If offline, queue the action
      if (!this.isOnline()) {
        await this.queueAction(offlineAction)

        throw new Error('You are offline. Your changes will be synced when you reconnect.')
      }

      // If online but failed for another reason, rethrow
      throw error
    }
  }
}

// Export singleton instance
export const offlineQueue = new OfflineQueueManager()

// Helper hook for React components
export function useOfflineQueue() {
  return {
    isOnline: offlineQueue.isOnline(),
    queueAction: (action: OfflineAction) => offlineQueue.queueAction(action),
    triggerSync: () => offlineQueue.triggerSync(),
    onSyncComplete: (callback: (data: any) => void) => offlineQueue.onSyncComplete(callback),
    retryWithOfflineSupport: <T>(fetchFn: () => Promise<T>, action: OfflineAction) =>
      offlineQueue.retryWithOfflineSupport(fetchFn, action),
  }
}

// Example usage in counselor dashboard:
/*
import { offlineQueue } from '@/lib/offline/offlineQueue'

// Update lead stage when offline
async function updateLeadStage(leadId: string, newStage: string) {
  const action = {
    type: 'UPDATE_LEAD_STAGE',
    url: `/api/counselor/leads/${leadId}`,
    method: 'PATCH' as const,
    body: { stage: newStage },
    metadata: { leadId, newStage },
  }

  try {
    const response = await fetch(action.url, {
      method: action.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.body),
    })

    if (!response.ok) throw new Error('Failed to update')
    return response.json()
  } catch (error) {
    if (!navigator.onLine) {
      await offlineQueue.queueAction(action)
      showToast('Offline: Changes will sync when you reconnect')
    } else {
      throw error
    }
  }
}

// Complete a task when offline
async function completeTask(taskId: string) {
  const action = {
    type: 'COMPLETE_TASK',
    url: `/api/counselor/tasks/${taskId}`,
    method: 'PATCH' as const,
    body: { status: 'COMPLETED', completedAt: new Date().toISOString() },
    metadata: { taskId },
  }

  return offlineQueue.retryWithOfflineSupport(
    () => fetch(action.url, {
      method: action.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.body),
    }).then(r => r.json()),
    action
  )
}

// Listen for sync completion
offlineQueue.onSyncComplete((data) => {
  console.log('Sync completed:', data)
  showToast('All offline changes synced successfully!')
  refreshData()
})
*/
