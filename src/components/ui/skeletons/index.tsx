/**
 * Domain-Specific Skeleton Components
 *
 * Pre-built skeleton loaders for specific UI patterns in the application.
 * These provide consistent loading states across different features.
 */

import React from 'react'
import { Skeleton, SkeletonAvatar, SkeletonCard, SkeletonText } from '../Skeleton'
import { cn } from '@/lib/utils'

// ============================================
// Dashboard Skeletons
// ============================================

export function DashboardStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
        >
          <Skeleton className="mb-2 h-4 w-24" />
          <Skeleton className="mb-1 h-8 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  )
}

export function DashboardChartSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800',
        className
      )}
    >
      <Skeleton className="mb-6 h-6 w-48" />
      <Skeleton className="h-64 w-full" />
      <div className="mt-4 flex items-center justify-center gap-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

export function DashboardActivitySkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-start gap-3">
          <SkeletonAvatar size="sm" />
          <div className="flex-1">
            <Skeleton className="mb-2 h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
      ))}
    </div>
  )
}

// ============================================
// Course & Content Skeletons
// ============================================

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <Skeleton className="h-48 w-full" /> {/* Image */}
      <div className="p-4">
        <Skeleton className="mb-2 h-6 w-3/4" /> {/* Title */}
        <Skeleton lines={2} className="mb-4" /> {/* Description */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-20" /> {/* Price */}
          <Skeleton className="h-4 w-24" /> {/* Rating */}
        </div>
        <Skeleton className="mt-4 h-10 w-full" /> {/* CTA Button */}
      </div>
    </div>
  )
}

export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function CourseDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero section */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" /> {/* Title */}
        <Skeleton className="h-6 w-1/2" /> {/* Subtitle */}
        <div className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>

      {/* Video/Image */}
      <Skeleton className="h-96 w-full" />

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Skeleton className="mb-4 h-8 w-48" />
          <SkeletonText lines={6} />
        </div>
        <div>
          <SkeletonCard />
        </div>
      </div>
    </div>
  )
}

// ============================================
// Test & Quiz Skeletons
// ============================================

export function QuestionCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-5 w-32" /> {/* Question number */}
        <Skeleton className="h-5 w-20" /> {/* Difficulty */}
      </div>
      <Skeleton lines={2} className="mb-6" /> {/* Question text */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" /> /* Options */
        ))}
      </div>
    </div>
  )
}

export function TestSessionSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Progress */}
      <Skeleton className="h-2 w-full" />

      {/* Question */}
      <QuestionCardSkeleton />

      {/* Navigation */}
      <div className="flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  )
}

// ============================================
// Chat & Messaging Skeletons
// ============================================

export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      <SkeletonAvatar size="sm" />
      <div className={cn('flex-1 space-y-2', isUser && 'flex items-end flex-col')}>
        <Skeleton className={cn('h-16 max-w-md', isUser && 'ml-auto')} />
        <Skeleton className="h-3 w-20" /> {/* Timestamp */}
      </div>
    </div>
  )
}

export function ChatConversationSkeleton({ messages = 5 }: { messages?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: messages }).map((_, i) => (
        <ChatMessageSkeleton key={i} isUser={i % 2 === 0} />
      ))}
    </div>
  )
}

export function ChatInterfaceSkeleton() {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <SkeletonAvatar />
          <div className="flex-1">
            <Skeleton className="mb-1 h-5 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <ChatConversationSkeleton messages={6} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 dark:border-gray-700">
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  )
}

// ============================================
// Profile & User Skeletons
// ============================================

export function ProfileHeaderSkeleton() {
  return (
    <div className="flex items-start gap-6">
      <SkeletonAvatar size="xl" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-8 w-48" /> {/* Name */}
        <Skeleton className="h-5 w-64" /> {/* Bio */}
        <div className="flex gap-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <Skeleton className="h-10 w-32" /> {/* Action button */}
    </div>
  )
}

export function UserCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="flex-1">
          <Skeleton className="mb-1 h-5 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  )
}

// ============================================
// Analytics & Data Skeletons
// ============================================

export function MetricCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton shape="circular" className="h-10 w-10" />
      </div>
      <Skeleton className="mt-4 h-10 w-24" /> {/* Value */}
      <div className="mt-2 flex items-center gap-2">
        <Skeleton className="h-4 w-12" /> {/* Change */}
        <Skeleton className="h-3 w-20" /> {/* Label */}
      </div>
    </div>
  )
}

export function AnalyticsDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardChartSkeleton />
        <DashboardChartSkeleton />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <Skeleton className="mb-4 h-6 w-48" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <SkeletonAvatar size="sm" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================
// List & Grid Skeletons
// ============================================

export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 border-b border-gray-200 py-3 dark:border-gray-700">
      <SkeletonAvatar size="sm" />
      <div className="flex-1">
        <Skeleton className="mb-1 h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  )
}

export function GridSkeleton({ items = 6, columns = 3 }: { items?: number; columns?: 2 | 3 | 4 }) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4', gridCols[columns])}>
      {Array.from({ length: items }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

// ============================================
// Page Skeletons
// ============================================

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-64" /> {/* Title */}
      <Skeleton className="h-5 w-96" /> {/* Description */}
      <div className="flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}

export function FullPageSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <PageHeaderSkeleton />
      <DashboardStatsSkeleton />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardChartSkeleton />
        </div>
        <div>
          <DashboardActivitySkeleton />
        </div>
      </div>
    </div>
  )
}
