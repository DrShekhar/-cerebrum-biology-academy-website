'use client'

import React, { useState } from 'react'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import StepIndicator, { Step } from '@/components/ui/StepIndicator'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function QuickStartExample() {
  const [progress, setProgress] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const startOperation = async () => {
    setIsRunning(true)
    setProgress(0)

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setProgress(i)
    }

    setIsRunning(false)
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Quick Start Example</h3>

      <ProgressIndicator
        current={progress}
        total={100}
        percentage={progress}
        status={isRunning ? 'Processing...' : 'Ready'}
        variant="linear"
        color="blue"
        success={progress === 100 && !isRunning}
      />

      <Button onClick={startOperation} disabled={isRunning}>
        {isRunning ? 'Running...' : 'Start'}
      </Button>
    </Card>
  )
}

export function MultiStepWorkflowExample() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const steps: Step[] = [
    { id: '1', label: 'Initialize', description: 'Setting up', status: 'pending' },
    { id: '2', label: 'Process', description: 'Running task', status: 'pending' },
    { id: '3', label: 'Finalize', description: 'Cleaning up', status: 'pending' },
  ]

  const [stepStates, setStepStates] = useState<Step[]>(steps)

  const runWorkflow = async () => {
    setIsProcessing(true)
    setCurrentStep(0)

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      setStepStates((prev) =>
        prev.map((s, idx) => ({
          ...s,
          status: idx < i ? 'completed' : idx === i ? 'in-progress' : 'pending',
        }))
      )

      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    setStepStates((prev) => prev.map((s) => ({ ...s, status: 'completed' })))
    setIsProcessing(false)
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Multi-Step Workflow</h3>

      <StepIndicator
        steps={stepStates}
        currentStep={currentStep}
        orientation="horizontal"
        color="emerald"
      />

      <Button onClick={runWorkflow} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Run Workflow'}
      </Button>
    </Card>
  )
}

export function FileUploadMockExample() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const mockUpload = async () => {
    setUploading(true)
    setProgress(0)

    const uploadPhase = async (start: number, end: number, duration: number) => {
      const steps = 50
      const increment = (end - start) / steps

      for (let i = 0; i < steps; i++) {
        await new Promise((resolve) => setTimeout(resolve, duration / steps))
        setProgress(start + increment * (i + 1))
      }
    }

    await uploadPhase(0, 70, 2000)
    await uploadPhase(70, 100, 800)

    setUploading(false)
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">File Upload Mock</h3>

      {uploading || progress > 0 ? (
        <div className="space-y-3">
          <ProgressIndicator
            current={Math.floor(progress)}
            total={100}
            percentage={progress}
            status={
              progress < 70 ? 'Uploading file...' : progress < 100 ? 'Processing...' : 'Complete!'
            }
            variant="circular"
            color="emerald"
            size="lg"
            success={progress === 100}
          />

          {uploading && (
            <Button onClick={() => setUploading(false)} variant="outline" className="w-full">
              Cancel Upload
            </Button>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
          <p className="text-slate-600 mb-4">Click to simulate file upload</p>
          <Button onClick={mockUpload}>Upload File</Button>
        </div>
      )}
    </Card>
  )
}

export function BulkOperationMockExample() {
  const [processing, setProcessing] = useState(false)
  const [processed, setProcessed] = useState(0)
  const total = 50

  const runBulkOperation = async () => {
    setProcessing(true)
    setProcessed(0)

    for (let i = 0; i <= total; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80))
      setProcessed(i)
    }

    setProcessing(false)
  }

  const percentage = (processed / total) * 100

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Bulk Operation Mock</h3>

      {processing || processed > 0 ? (
        <div className="space-y-3">
          <ProgressIndicator
            current={processed}
            total={total}
            percentage={percentage}
            status={`Processing item ${processed} of ${total}`}
            variant="linear"
            color="amber"
            showSteps={false}
            success={processed === total && !processing}
          />

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 rounded p-3 text-center">
              <p className="text-2xl font-bold text-slate-900">{processed}</p>
              <p className="text-xs text-slate-600">Processed</p>
            </div>
            <div className="bg-slate-50 rounded p-3 text-center">
              <p className="text-2xl font-bold text-slate-900">{total - processed}</p>
              <p className="text-xs text-slate-600">Remaining</p>
            </div>
            <div className="bg-slate-50 rounded p-3 text-center">
              <p className="text-2xl font-bold text-slate-900">{Math.round(percentage)}%</p>
              <p className="text-xs text-slate-600">Complete</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-slate-600 mb-4">Ready to process {total} items</p>
          <Button onClick={runBulkOperation}>Start Processing</Button>
        </div>
      )}
    </Card>
  )
}

export function CompactProgressExample() {
  const [items, setItems] = useState([
    { id: '1', name: 'Document.pdf', progress: 0, status: 'pending' },
    { id: '2', name: 'Image.png', progress: 0, status: 'pending' },
    { id: '3', name: 'Video.mp4', progress: 0, status: 'pending' },
  ])

  const startUploads = async () => {
    for (let i = 0; i < items.length; i++) {
      setItems((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, status: 'uploading' } : item))
      )

      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setItems((prev) => prev.map((item, idx) => (idx === i ? { ...item, progress } : item)))
      }

      setItems((prev) =>
        prev.map((item, idx) => (idx === i ? { ...item, status: 'complete' } : item))
      )
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Compact Progress List</h3>
        <Button
          onClick={startUploads}
          size="sm"
          disabled={items.some((item) => item.status === 'uploading')}
        >
          Upload All
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-slate-50 rounded-lg p-3">
            <ProgressIndicator
              current={item.progress}
              total={100}
              percentage={item.progress}
              status={item.name}
              variant="compact"
              size="sm"
              color="purple"
              showSteps={false}
              cancelable={false}
              success={item.status === 'complete'}
            />
          </div>
        ))}
      </div>
    </Card>
  )
}

export function IndeterminateExample() {
  const [loading, setLoading] = useState(false)

  const startLoading = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setLoading(false)
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-bold">Indeterminate Progress</h3>

      {loading ? (
        <ProgressIndicator
          current={0}
          total={1}
          status="Loading data from server..."
          mode="indeterminate"
          variant="linear"
          color="blue"
          showSteps={false}
          showPercentage={false}
        />
      ) : (
        <div className="text-center">
          <p className="text-slate-600 mb-4">Simulate loading with unknown duration</p>
          <Button onClick={startLoading}>Start Loading</Button>
        </div>
      )}
    </Card>
  )
}

export default function ProgressIntegrationExamples() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Integration Examples</h1>
        <p className="text-slate-600">Copy-paste ready examples for common use cases</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickStartExample />
        <MultiStepWorkflowExample />
        <FileUploadMockExample />
        <BulkOperationMockExample />
        <CompactProgressExample />
        <IndeterminateExample />
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold mb-4">Usage Tips</h3>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <p>
              <strong className="text-slate-900">Update intervals:</strong> Use 50-100ms intervals
              for smooth progress updates
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <p>
              <strong className="text-slate-900">Status messages:</strong> Keep them concise and
              specific to current operation
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <p>
              <strong className="text-slate-900">Variant selection:</strong> Linear for main
              content, Circular for modals, Compact for lists
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <p>
              <strong className="text-slate-900">Error handling:</strong> Always provide error prop
              with clear message
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
            <p>
              <strong className="text-slate-900">Cleanup:</strong> Clear intervals and reset state
              when component unmounts
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
