'use client'

import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
type TaskType =
  | 'FOLLOW_UP'
  | 'DEMO_REMINDER'
  | 'PAYMENT_REMINDER'
  | 'OFFER_EXPIRY'
  | 'DOCUMENT_COLLECTION'
  | 'OTHER'

interface Task {
  id: string
  title: string
  description?: string | null
  type: TaskType
  priority: TaskPriority
  status: TaskStatus
  dueDate: Date | string
  completedAt?: Date | string | null
  createdAt: Date | string
  lead?: {
    id: string
    studentName: string
    phone: string
    email: string
    stage: string
    priority: string
  } | null
}

interface TaskCardProps {
  task: Task
  onUpdate: (taskId: string, updates: { status?: TaskStatus }) => Promise<void>
  onDelete?: (taskId: string) => Promise<void>
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [updating, setUpdating] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const priorityStyles = {
    LOW: 'bg-gray-100 text-gray-800 border-gray-200',
    MEDIUM: 'bg-blue-100 text-blue-800 border-blue-200',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
    URGENT: 'bg-red-100 text-red-800 border-red-200',
  }

  const priorityIcons = {
    LOW: '📋',
    MEDIUM: '📌',
    HIGH: '⚡',
    URGENT: '🔥',
  }

  const typeLabels = {
    FOLLOW_UP: 'Follow-up',
    DEMO_REMINDER: 'Demo Reminder',
    PAYMENT_REMINDER: 'Payment Reminder',
    OFFER_EXPIRY: 'Offer Expiry',
    DOCUMENT_COLLECTION: 'Documents',
    OTHER: 'Other',
  }

  const statusColors = {
    TODO: 'bg-gray-100 text-gray-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700',
  }

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (updating) return
    try {
      setUpdating(true)
      await onUpdate(task.id, { status: newStatus })
    } catch (error) {
      console.error('Error updating task:', error)
    } finally {
      setUpdating(false)
    }
  }

  const handleDelete = async () => {
    if (!onDelete || updating) return
    if (!confirm('Are you sure you want to delete this task?')) return

    try {
      setUpdating(true)
      await onDelete(task.id)
    } catch (error) {
      console.error('Error deleting task:', error)
    } finally {
      setUpdating(false)
    }
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'COMPLETED'

  return (
    <div
      className={`
        bg-white rounded-lg border p-4 transition-all duration-200
        ${task.status === 'COMPLETED' ? 'opacity-60' : 'hover:shadow-md'}
        ${isOverdue && task.status !== 'COMPLETED' ? 'border-red-300 bg-red-50' : 'border-gray-200'}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${priorityStyles[task.priority]}`}
            >
              <span>{priorityIcons[task.priority]}</span>
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">{typeLabels[task.type]}</span>
          </div>
          <h3
            className={`font-semibold text-gray-900 ${task.status === 'COMPLETED' ? 'line-through' : ''}`}
          >
            {task.title}
          </h3>
        </div>

        {/* Status Dropdown */}
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
          disabled={updating}
          className={`text-xs font-medium px-2 py-1 rounded-md border-0 ${statusColors[task.status]} ${updating ? 'opacity-50' : 'cursor-pointer hover:opacity-80'}`}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Lead Info */}
      {task.lead && (
        <div className="mb-2 p-2 bg-indigo-50 rounded border border-indigo-100">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-900">{task.lead.studentName}</span>
            <span className="text-xs text-indigo-600">{task.lead.phone}</span>
          </div>
        </div>
      )}

      {/* Description (collapsible) */}
      {task.description && (
        <div className="mb-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
          >
            <svg
              className={`w-3 h-3 transition-transform ${expanded ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            {expanded ? 'Hide' : 'Show'} details
          </button>
          {expanded && (
            <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{task.description}</p>
          )}
        </div>
      )}

      {/* Due Date */}
      <div className="flex items-center gap-4 text-xs mb-3">
        <div
          className={`flex items-center gap-1 ${isOverdue ? 'text-red-600 font-semibold' : 'text-gray-600'}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Due {formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}</span>
          {isOverdue && <span className="ml-1 font-bold">⚠️ OVERDUE</span>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        {task.status !== 'COMPLETED' && (
          <button
            onClick={() => handleStatusChange('COMPLETED')}
            disabled={updating}
            className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Mark Complete
          </button>
        )}

        {task.status !== 'IN_PROGRESS' && task.status !== 'COMPLETED' && (
          <button
            onClick={() => handleStatusChange('IN_PROGRESS')}
            disabled={updating}
            className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Start
          </button>
        )}

        {onDelete && (
          <button
            onClick={handleDelete}
            disabled={updating}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded transition-colors disabled:opacity-50"
            title="Delete task"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
