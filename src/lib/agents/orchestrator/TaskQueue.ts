/**
 * Task Queue
 *
 * Manages the queue of agent tasks with priority support
 * and dependency resolution.
 */

import type { AgentTask, TaskStatus, TaskPriority } from '../types'

export class TaskQueue {
  private queue: AgentTask[]
  private maxSize: number
  private processing: Set<string>

  constructor(maxSize: number = 100) {
    this.queue = []
    this.maxSize = maxSize
    this.processing = new Set()
  }

  /**
   * Add task to queue
   */
  enqueue(task: AgentTask): void {
    if (this.queue.length >= this.maxSize) {
      throw new Error('Task queue is full')
    }

    this.queue.push(task)
    this.sortQueue()
  }

  /**
   * Add multiple tasks to queue
   */
  enqueueBatch(tasks: AgentTask[]): void {
    for (const task of tasks) {
      this.enqueue(task)
    }
  }

  /**
   * Get next task from queue
   */
  dequeue(): AgentTask | undefined {
    // Find the first task that has all dependencies completed
    const index = this.queue.findIndex((task) => this.canExecute(task))

    if (index === -1) {
      return undefined
    }

    const task = this.queue.splice(index, 1)[0]
    this.processing.add(task.id)
    return task
  }

  /**
   * Check if a task can be executed (all dependencies completed)
   */
  private canExecute(task: AgentTask): boolean {
    if (task.dependencies.length === 0) {
      return true
    }

    // Check if all dependencies are completed
    return task.dependencies.every((depId) => {
      const dep = this.queue.find((t) => t.id === depId)
      return !dep || dep.status === 'completed'
    })
  }

  /**
   * Mark task as completed
   */
  completeTask(taskId: string): void {
    this.processing.delete(taskId)
  }

  /**
   * Mark task as failed
   */
  failTask(taskId: string): void {
    this.processing.delete(taskId)
  }

  /**
   * Sort queue by priority
   */
  private sortQueue(): void {
    const priorityOrder: Record<TaskPriority, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3,
    }

    this.queue.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    })
  }

  /**
   * Get queue size
   */
  size(): number {
    return this.queue.length
  }

  /**
   * Get processing count
   */
  processingCount(): number {
    return this.processing.size
  }

  /**
   * Check if queue is empty
   */
  isEmpty(): boolean {
    return this.queue.length === 0 && this.processing.size === 0
  }

  /**
   * Get all tasks in queue
   */
  getTasks(): AgentTask[] {
    return [...this.queue]
  }

  /**
   * Clear queue
   */
  clear(): void {
    this.queue = []
    this.processing.clear()
  }
}
