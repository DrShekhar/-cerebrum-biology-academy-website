'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import StepIndicator, { Step } from '@/components/ui/StepIndicator'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Database,
  FileText,
  Users,
  Mail,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react'

interface BulkItem {
  id: string
  name: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  error?: string
}

type OperationType = 'email' | 'export' | 'update' | 'delete'

interface OperationConfig {
  type: OperationType
  totalItems: number
  batchSize: number
}

export default function BulkOperationsWithProgress() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [processedCount, setProcessedCount] = useState(0)
  const [successCount, setSuccessCount] = useState(0)
  const [errorCount, setErrorCount] = useState(0)
  const [currentBatch, setCurrentBatch] = useState(0)
  const [operationType, setOperationType] = useState<OperationType>('email')

  const totalItems = 150
  const batchSize = 10
  const totalBatches = Math.ceil(totalItems / batchSize)

  const operationDetails = {
    email: {
      title: 'Bulk Email Send',
      description: 'Send course notifications to all enrolled students',
      icon: Mail,
      color: 'blue',
    },
    export: {
      title: 'Data Export',
      description: 'Export student records and performance data',
      icon: Database,
      color: 'emerald',
    },
    update: {
      title: 'Batch Update',
      description: 'Update course materials for all enrolled students',
      icon: FileText,
      color: 'purple',
    },
    delete: {
      title: 'Cleanup Operation',
      description: 'Archive old records and free up storage',
      icon: Users,
      color: 'amber',
    },
  }

  const currentOperation = operationDetails[operationType]

  const processingSteps: Step[] = [
    {
      id: 'prepare',
      label: 'Preparation',
      description: 'Loading data and validating',
      status: processedCount === 0 ? 'in-progress' : 'completed',
    },
    {
      id: 'process',
      label: 'Processing',
      description: `${processedCount}/${totalItems} items`,
      status:
        processedCount === 0
          ? 'pending'
          : processedCount < totalItems
            ? 'in-progress'
            : 'completed',
    },
    {
      id: 'verify',
      label: 'Verification',
      description: 'Checking results',
      status: processedCount < totalItems ? 'pending' : 'in-progress',
    },
    {
      id: 'complete',
      label: 'Complete',
      description: 'All done',
      status: processedCount < totalItems ? 'pending' : 'completed',
    },
  ]

  const simulateOperation = async () => {
    setIsProcessing(true)
    setProcessedCount(0)
    setSuccessCount(0)
    setErrorCount(0)
    setCurrentBatch(0)

    for (let batch = 0; batch < totalBatches; batch++) {
      if (!isProcessing) break

      while (isPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      setCurrentBatch(batch + 1)

      const batchStart = batch * batchSize
      const batchEnd = Math.min(batchStart + batchSize, totalItems)
      const itemsInBatch = batchEnd - batchStart

      for (let i = 0; i < itemsInBatch; i++) {
        await new Promise((resolve) => setTimeout(resolve, 50))

        const success = Math.random() > 0.05

        setProcessedCount((prev) => prev + 1)
        if (success) {
          setSuccessCount((prev) => prev + 1)
        } else {
          setErrorCount((prev) => prev + 1)
        }
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsProcessing(false)
  }

  const handleStart = () => {
    simulateOperation()
  }

  const handlePause = () => {
    setIsPaused(!isPaused)
  }

  const handleReset = () => {
    setIsProcessing(false)
    setIsPaused(false)
    setProcessedCount(0)
    setSuccessCount(0)
    setErrorCount(0)
    setCurrentBatch(0)
  }

  const percentage = (processedCount / totalItems) * 100
  const estimatedTimeRemaining = Math.ceil(((totalItems - processedCount) / totalItems) * 7.5)
  const successRate =
    processedCount > 0 ? ((successCount / processedCount) * 100).toFixed(1) : '0.0'

  const OperationIcon = currentOperation.icon

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <Card className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-3 bg-${currentOperation.color}-100 rounded-xl`}>
            <OperationIcon className={`w-8 h-8 text-${currentOperation.color}-600`} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">{currentOperation.title}</h1>
            <p className="text-slate-600">{currentOperation.description}</p>
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-700 mb-3">Operation Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.keys(operationDetails) as OperationType[]).map((type) => {
              const details = operationDetails[type]
              const Icon = details.icon
              return (
                <button
                  key={type}
                  onClick={() => !isProcessing && setOperationType(type)}
                  disabled={isProcessing}
                  className={`
                    p-4 rounded-lg border-2 transition-all text-left
                    ${operationType === type ? `border-${details.color}-500 bg-${details.color}-50` : 'border-slate-200 hover:border-slate-300'}
                    ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <Icon
                    className={`w-5 h-5 mb-2 ${operationType === type ? `text-${details.color}-600` : 'text-slate-400'}`}
                  />
                  <p
                    className={`text-sm font-medium ${operationType === type ? `text-${details.color}-900` : 'text-slate-700'}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isProcessing && processedCount === 0 && (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-slate-900">Operation Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">{totalItems}</p>
                    <p className="text-xs text-slate-600">Total Items</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">{batchSize}</p>
                    <p className="text-xs text-slate-600">Batch Size</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">{totalBatches}</p>
                    <p className="text-xs text-slate-600">Total Batches</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg">
                    <p className="text-2xl font-bold text-slate-900">~8s</p>
                    <p className="text-xs text-slate-600">Est. Time</p>
                  </div>
                </div>
              </div>

              <Button onClick={handleStart} size="lg" className="w-full" variant="primary">
                <Play className="w-5 h-5 mr-2" />
                Start Operation
              </Button>
            </motion.div>
          )}

          {(isProcessing || processedCount > 0) && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <StepIndicator
                steps={processingSteps}
                currentStep={processedCount === 0 ? 0 : processedCount < totalItems ? 1 : 2}
                orientation="horizontal"
                size="md"
                color={currentOperation.color as any}
              />

              <div className="space-y-4">
                <ProgressIndicator
                  current={processedCount}
                  total={totalItems}
                  percentage={percentage}
                  status={
                    isPaused
                      ? 'Operation paused'
                      : isProcessing
                        ? `Processing batch ${currentBatch} of ${totalBatches}...`
                        : 'Operation complete!'
                  }
                  estimatedTime={isProcessing ? estimatedTimeRemaining : undefined}
                  variant="linear"
                  size="lg"
                  color={currentOperation.color as any}
                  success={!isProcessing && processedCount === totalItems}
                  showSteps={false}
                />

                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className={`bg-${currentOperation.color}-50 rounded-lg p-4 text-center`}>
                    <p className={`text-2xl font-bold text-${currentOperation.color}-600`}>
                      {processedCount}
                    </p>
                    <p className={`text-xs text-${currentOperation.color}-800 font-medium`}>
                      Processed
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{successCount}</p>
                    <p className="text-xs text-green-700 font-medium">Success</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                    <p className="text-xs text-red-800 font-medium">Errors</p>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-slate-900">{successRate}%</p>
                    <p className="text-xs text-slate-600 font-medium">Success Rate</p>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-slate-900">
                      {totalItems - processedCount}
                    </p>
                    <p className="text-xs text-slate-600 font-medium">Remaining</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {isProcessing && (
                  <Button onClick={handlePause} variant="outline" size="lg" className="flex-1">
                    <Pause className="w-5 h-5 mr-2" />
                    {isPaused ? 'Resume' : 'Pause'}
                  </Button>
                )}
                <Button onClick={handleReset} variant="outline" size="lg" className="flex-1">
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Reset
                </Button>
              </div>

              {processedCount === totalItems && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-green-800 mb-1">
                        Operation Complete!
                      </h3>
                      <p className="text-green-700 mb-3">
                        Successfully processed {successCount} out of {totalItems} items
                        {errorCount > 0 && ` with ${errorCount} error${errorCount > 1 ? 's' : ''}`}
                      </p>
                      {errorCount > 0 && (
                        <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>
                            Some items failed to process. Check the error log for details.
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Batch Processing Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Real-time Progress</p>
              <p className="text-slate-600">Track progress for each batch with live updates</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Pause & Resume</p>
              <p className="text-slate-600">
                Pause operation and resume later without losing progress
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Error Tracking</p>
              <p className="text-slate-600">Monitor success and failure rates in real-time</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-900">Estimated Time</p>
              <p className="text-slate-600">See remaining time based on current processing speed</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
