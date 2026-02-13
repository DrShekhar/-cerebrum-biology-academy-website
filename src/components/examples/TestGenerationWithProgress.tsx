'use client'

import React, { useState } from 'react'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import StepIndicator, { Step } from '@/components/ui/StepIndicator'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Sparkles, Download, CheckCircle2, AlertCircle } from 'lucide-react'

interface TestGenerationConfig {
  topics: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  numQuestions: number
  includeExplanations: boolean
}

export default function TestGenerationWithProgress() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [generatedTest, setGeneratedTest] = useState<any>(null)

  const generationSteps: Step[] = [
    {
      id: 'validate',
      label: 'Validating Input',
      description: 'Checking topics and configuration',
      status: 'pending',
    },
    {
      id: 'analyze',
      label: 'Analyzing Topics',
      description: 'Processing syllabus requirements',
      status: 'pending',
    },
    {
      id: 'generate',
      label: 'Generating Questions',
      description: 'Creating questions with AI',
      status: 'pending',
    },
    {
      id: 'quality',
      label: 'Quality Check',
      description: 'Validating accuracy and difficulty',
      status: 'pending',
    },
    {
      id: 'format',
      label: 'Formatting',
      description: 'Preparing final document',
      status: 'pending',
    },
  ]

  const [steps, setSteps] = useState<Step[]>(generationSteps)

  const simulateTestGeneration = async (config: TestGenerationConfig) => {
    setIsGenerating(true)
    setCurrentStep(0)
    setPercentage(0)
    setError(null)
    setGeneratedTest(null)

    const stepDurations = [1000, 2000, 3000, 2000, 1500]
    const totalDuration = stepDurations.reduce((a, b) => a + b, 0)

    try {
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStep(i)
        setSteps((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx < i ? 'completed' : idx === i ? 'in-progress' : 'pending',
          }))
        )

        const stepStartPercentage =
          (stepDurations.slice(0, i).reduce((a, b) => a + b, 0) / totalDuration) * 100
        const stepEndPercentage =
          (stepDurations.slice(0, i + 1).reduce((a, b) => a + b, 0) / totalDuration) * 100

        const stepDuration = stepDurations[i]
        const updateInterval = 50
        const steps = stepDuration / updateInterval

        for (let j = 0; j < steps; j++) {
          await new Promise((resolve) => setTimeout(resolve, updateInterval))
          const progress =
            stepStartPercentage + ((stepEndPercentage - stepStartPercentage) * (j + 1)) / steps
          setPercentage(progress)
        }
      }

      setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })))
      setGeneratedTest({
        id: 'test-' + Date.now(),
        title: 'Biology Practice Test',
        questions: config.numQuestions,
        topics: config.topics,
      })
    } catch (err) {
      setError('Failed to generate test. Please try again.')
      setSteps((prev) =>
        prev.map((s, idx) => ({
          ...s,
          status: idx === currentStep ? 'error' : s.status,
          error: idx === currentStep ? 'Generation failed' : undefined,
        }))
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStartGeneration = () => {
    const config: TestGenerationConfig = {
      topics: ['Cell Biology', 'Genetics', 'Ecology'],
      difficulty: 'medium',
      numQuestions: 50,
      includeExplanations: true,
    }

    simulateTestGeneration(config)
  }

  const handleCancel = () => {
    setIsGenerating(false)
    setSteps(generationSteps)
    setPercentage(0)
    setCurrentStep(0)
  }

  const handleDownload = () => {
    console.log('Downloading test:', generatedTest)
  }

  const estimatedTimeRemaining = Math.ceil(((100 - percentage) / 100) * 9.5)

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <Card className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-indigo-500 rounded-xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Test Generation</h1>
            <p className="text-slate-600">
              Generate custom biology tests with real-time progress tracking
            </p>
          </div>
        </div>
{!isGenerating && !generatedTest && (
            <div
              key="start"
              className="space-y-6 animate-fadeInUp"
            >
              <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-slate-900">Test Configuration</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Topics:</span>
                    <span className="ml-2 font-medium">Cell Biology, Genetics, Ecology</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Questions:</span>
                    <span className="ml-2 font-medium">50</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Difficulty:</span>
                    <span className="ml-2 font-medium">Medium</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Est. Time:</span>
                    <span className="ml-2 font-medium">10 seconds</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleStartGeneration}
                size="lg"
                className="w-full"
                variant="primary"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Generation
              </Button>
            </div>
          )}

          {isGenerating && (
            <div
              key="generating"
              className="space-y-8 animate-fadeInUp"
            >
              <StepIndicator
                steps={steps}
                currentStep={currentStep}
                orientation="horizontal"
                size="md"
                color="blue"
                animated
              />

              <div className="space-y-6">
                <ProgressIndicator
                  current={currentStep + 1}
                  total={generationSteps.length}
                  percentage={percentage}
                  status={steps[currentStep]?.description || 'Processing...'}
                  estimatedTime={estimatedTimeRemaining}
                  variant="linear"
                  size="lg"
                  color="blue"
                  onCancel={handleCancel}
                  error={error || undefined}
                />

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{currentStep + 1}</p>
                    <p className="text-xs text-blue-800 font-medium">Current Step</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{Math.round(percentage)}%</p>
                    <p className="text-xs text-green-700 font-medium">Progress</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{estimatedTimeRemaining}s</p>
                    <p className="text-xs text-yellow-800 font-medium">Remaining</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {generatedTest && !isGenerating && (
            <div
              key="success"
              className="space-y-6 animate-fadeInUp"
            >
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
                <div
                  className="inline-flex p-4 bg-green-100 rounded-full mb-4 animate-fadeInUp"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>

                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  Test Generated Successfully!
                </h2>
                <p className="text-green-700 mb-6">
                  Your test with {generatedTest.questions} questions is ready to download
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleDownload} size="lg" variant="primary">
                    <Download className="w-5 h-5 mr-2" />
                    Download Test
                  </Button>
                  <Button
                    onClick={() => {
                      setGeneratedTest(null)
                      setSteps(generationSteps)
                      setPercentage(0)
                      setCurrentStep(0)
                    }}
                    size="lg"
                    variant="outline"
                  >
                    Generate Another
                  </Button>
                </div>
              </div>
            </div>
          )}

          {error && !isGenerating && (
            <div
              key="error"
              className="space-y-6 animate-fadeInUp"
            >
              <div className="bg-gradient-to-br bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
                <div className="inline-flex p-4 bg-red-100 rounded-full mb-4">
                  <AlertCircle className="w-12 h-12 text-red-600" />
                </div>

                <h2 className="text-2xl font-bold text-red-900 mb-2">Generation Failed</h2>
                <p className="text-red-700 mb-6">{error}</p>

                <Button
                  onClick={() => {
                    setError(null)
                    setSteps(generationSteps)
                  }}
                  size="lg"
                  variant="primary"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
</Card>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Generation Process</h3>
        <div className="space-y-3 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-blue-600">1</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Input Validation</p>
              <p>Verifies topics exist in the syllabus and configuration is valid</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-blue-600">2</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Topic Analysis</p>
              <p>Analyzes syllabus coverage, difficulty distribution, and learning objectives</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-blue-600">3</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">AI Generation</p>
              <p>Uses Claude AI to generate questions based on the configuration</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-blue-600">4</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Quality Assurance</p>
              <p>Validates question accuracy, difficulty levels, and educational standards</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-semibold text-blue-600">5</span>
            </div>
            <div>
              <p className="font-medium text-slate-900">Formatting</p>
              <p>Prepares the final test document with proper formatting and structure</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
