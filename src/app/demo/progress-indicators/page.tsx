'use client'

import React, { useState, useEffect } from 'react'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import StepIndicator, { Step } from '@/components/ui/StepIndicator'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Upload,
  FileText,
  Database,
  CheckCircle,
  Sparkles,
  Download,
  Play,
  RotateCcw,
} from 'lucide-react'

export default function ProgressIndicatorsDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div
          className="text-center space-y-4 animate-fadeInUp"
        >
          <h1 className="text-4xl font-bold text-slate-900">Progressive Loading Indicators</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Enhanced user feedback for multi-step operations with real-time progress tracking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TestGenerationDemo />
          <FileUploadDemo />
          <DataExportDemo />
          <BulkOperationsDemo />
        </div>

        <div className="grid grid-cols-1 gap-8">
          <VariantsShowcase />
          <StepIndicatorShowcase />
        </div>
      </div>
    </div>
  )
}

function TestGenerationDemo() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [percentage, setPercentage] = useState(0)

  const testGenerationSteps: Step[] = [
    {
      id: 'analyze',
      label: 'Analyzing Topics',
      description: 'Processing syllabus and requirements',
      status: 'pending',
    },
    {
      id: 'generate',
      label: 'Generating Questions',
      description: 'Creating questions with AI',
      status: 'pending',
    },
    {
      id: 'validate',
      label: 'Validating Quality',
      description: 'Checking difficulty and accuracy',
      status: 'pending',
    },
    {
      id: 'format',
      label: 'Formatting Test',
      description: 'Preparing final document',
      status: 'pending',
    },
  ]

  const [steps, setSteps] = useState<Step[]>(testGenerationSteps)

  useEffect(() => {
    if (!isGenerating) return

    const stepMessages = [
      'Analyzing topics and difficulty distribution...',
      'Generating questions with Claude AI...',
      'Validating quality and accuracy...',
      'Formatting test paper...',
    ]

    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          setIsGenerating(false)
          setCurrentStep(3)
          setSteps((prevSteps) =>
            prevSteps.map((s, i) => ({
              ...s,
              status: i <= 3 ? 'completed' : 'pending',
            }))
          )
          return 100
        }
        const newPercentage = prev + 2
        const newStep = Math.floor((newPercentage / 100) * 4)
        setCurrentStep(newStep)
        setSteps((prevSteps) =>
          prevSteps.map((s, i) => ({
            ...s,
            status: i < newStep ? 'completed' : i === newStep ? 'in-progress' : 'pending',
          }))
        )
        return newPercentage
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isGenerating])

  const handleStart = () => {
    setIsGenerating(true)
    setCurrentStep(0)
    setPercentage(0)
    setSteps(testGenerationSteps)
  }

  const handleReset = () => {
    setIsGenerating(false)
    setCurrentStep(0)
    setPercentage(0)
    setSteps(testGenerationSteps)
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Sparkles className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Test Generation</h2>
          <p className="text-sm text-slate-600">
            AI-powered question generation with progress tracking
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          size="md"
          color="blue"
          orientation="vertical"
        />

        {isGenerating && (
          <ProgressIndicator
            current={currentStep + 1}
            total={4}
            percentage={percentage}
            status={
              currentStep < 4
                ? [
                    'Analyzing topics and difficulty distribution...',
                    'Generating questions with Claude AI...',
                    'Validating quality and accuracy...',
                    'Formatting test paper...',
                  ][currentStep]
                : 'Complete!'
            }
            estimatedTime={Math.ceil(((100 - percentage) / 2) * 0.1)}
            variant="linear"
            size="md"
            color="blue"
            onCancel={() => setIsGenerating(false)}
          />
        )}
      </div>

      <div className="flex gap-3">
        <Button onClick={handleStart} disabled={isGenerating} className="flex-1" size="lg">
          <Play className="w-4 h-4 mr-2" />
          Start Generation
        </Button>
        <Button onClick={handleReset} variant="outline" size="lg">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

function FileUploadDemo() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStep, setUploadStep] = useState(0)

  useEffect(() => {
    if (!isUploading) return

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          setIsUploading(false)
          return 100
        }
        const newProgress = prev + 3
        setUploadStep(Math.floor((newProgress / 100) * 3))
        return newProgress
      })
    }, 80)

    return () => clearInterval(interval)
  }, [isUploading])

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)
    setUploadStep(0)
  }

  const statusMessages = [
    'Preparing file for upload...',
    'Uploading to server...',
    'Processing and validating...',
    'Upload complete!',
  ]

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 rounded-lg">
          <Upload className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">File Upload</h2>
          <p className="text-sm text-slate-600">
            Real-time upload progress with percentage tracking
          </p>
        </div>
      </div>

      {isUploading || uploadProgress > 0 ? (
        <div className="space-y-4">
          <ProgressIndicator
            current={uploadStep + 1}
            total={3}
            percentage={uploadProgress}
            status={statusMessages[uploadStep]}
            variant="linear"
            size="md"
            color="emerald"
            success={uploadProgress === 100}
            onCancel={() => setIsUploading(false)}
          />

          <ProgressIndicator
            current={uploadStep + 1}
            total={3}
            percentage={uploadProgress}
            status={statusMessages[uploadStep]}
            variant="circular"
            size="lg"
            color="emerald"
            success={uploadProgress === 100}
          />
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-green-600 transition-colors cursor-pointer">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={isUploading}
        className="w-full"
        variant="primary"
        size="lg"
      >
        <Upload className="w-4 h-4 mr-2" />
        {uploadProgress === 100 ? 'Upload Another File' : 'Start Upload'}
      </Button>
    </Card>
  )
}

function DataExportDemo() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  useEffect(() => {
    if (!isExporting) return

    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          setIsExporting(false)
          return 100
        }
        return prev + 2.5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isExporting])

  const currentStep = Math.floor((exportProgress / 100) * 5)

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Download className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Data Export</h2>
          <p className="text-sm text-slate-600">Export progress with step-by-step feedback</p>
        </div>
      </div>

      {isExporting || exportProgress > 0 ? (
        <ProgressIndicator
          current={currentStep + 1}
          total={5}
          percentage={exportProgress}
          status={
            [
              'Fetching data from database...',
              'Processing records...',
              'Formatting export file...',
              'Compressing data...',
              'Preparing download...',
              'Export complete!',
            ][currentStep]
          }
          estimatedTime={Math.ceil(((100 - exportProgress) / 2.5) * 0.1)}
          variant="compact"
          size="md"
          color="purple"
          success={exportProgress === 100}
        />
      ) : (
        <div className="text-center py-8">
          <Database className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">Ready to export your data</p>
        </div>
      )}

      <Button
        onClick={() => {
          setIsExporting(true)
          setExportProgress(0)
        }}
        disabled={isExporting}
        className="w-full"
        variant="primary"
        size="lg"
      >
        <Download className="w-4 h-4 mr-2" />
        Export Data
      </Button>
    </Card>
  )
}

function BulkOperationsDemo() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedCount, setProcessedCount] = useState(0)
  const totalItems = 150

  useEffect(() => {
    if (!isProcessing) return

    const interval = setInterval(() => {
      setProcessedCount((prev) => {
        if (prev >= totalItems) {
          setIsProcessing(false)
          return totalItems
        }
        return prev + 3
      })
    }, 50)

    return () => clearInterval(interval)
  }, [isProcessing])

  const percentage = (processedCount / totalItems) * 100

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-100 rounded-lg">
          <CheckCircle className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Bulk Operations</h2>
          <p className="text-sm text-slate-600">Process multiple items with real-time count</p>
        </div>
      </div>

      {isProcessing || processedCount > 0 ? (
        <div className="space-y-4">
          <ProgressIndicator
            current={processedCount}
            total={totalItems}
            percentage={percentage}
            status={`Processing item ${processedCount} of ${totalItems}`}
            variant="linear"
            size="md"
            color="amber"
            showSteps={false}
            success={processedCount === totalItems}
          />

          <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="p-2 sm:p-3 bg-slate-50 rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-slate-900">{processedCount}</p>
              <p className="text-xs text-slate-600">Processed</p>
            </div>
            <div className="p-2 sm:p-3 bg-slate-50 rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-slate-900">
                {totalItems - processedCount}
              </p>
              <p className="text-xs text-slate-600">Remaining</p>
            </div>
            <div className="p-2 sm:p-3 bg-slate-50 rounded-lg">
              <p className="text-lg sm:text-2xl font-bold text-slate-900">
                {Math.round(percentage)}%
              </p>
              <p className="text-xs text-slate-600">Complete</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600">150 items ready to process</p>
        </div>
      )}

      <Button
        onClick={() => {
          setIsProcessing(true)
          setProcessedCount(0)
        }}
        disabled={isProcessing}
        className="w-full"
        variant="primary"
        size="lg"
      >
        <Play className="w-4 h-4 mr-2" />
        Start Bulk Processing
      </Button>
    </Card>
  )
}

function VariantsShowcase() {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-slate-900">Progress Indicator Variants</h2>

      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Linear (Default)</h3>
          <ProgressIndicator
            current={2}
            total={4}
            percentage={50}
            status="Processing step 2 of 4..."
            variant="linear"
            size="md"
            color="blue"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Circular</h3>
          <div className="flex justify-center">
            <ProgressIndicator
              current={3}
              total={5}
              percentage={60}
              status="Analyzing content..."
              variant="circular"
              size="lg"
              color="emerald"
            />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Compact</h3>
          <ProgressIndicator
            current={1}
            total={3}
            percentage={33}
            status="Uploading files..."
            variant="compact"
            size="md"
            color="purple"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Indeterminate Mode</h3>
          <ProgressIndicator
            current={0}
            total={1}
            status="Loading..."
            mode="indeterminate"
            variant="linear"
            size="md"
            color="amber"
          />
        </div>
      </div>
    </Card>
  )
}

function StepIndicatorShowcase() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps: Step[] = [
    { id: '1', label: 'Configuration', description: 'Set up parameters', status: 'completed' },
    { id: '2', label: 'Processing', description: 'Running operation', status: 'in-progress' },
    { id: '3', label: 'Validation', description: 'Checking results', status: 'pending' },
    { id: '4', label: 'Complete', description: 'All done', status: 'pending' },
  ]

  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-bold text-slate-900">Step Indicator Variants</h2>

      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Horizontal</h3>
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            orientation="horizontal"
            size="md"
            color="blue"
          />
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-700">Vertical</h3>
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            orientation="vertical"
            size="md"
            color="emerald"
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} variant="outline">
            Previous
          </Button>
          <Button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))} variant="primary">
            Next
          </Button>
        </div>
      </div>
    </Card>
  )
}
