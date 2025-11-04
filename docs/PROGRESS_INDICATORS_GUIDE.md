# Progressive Loading Indicators Guide

## Overview

This guide covers the implementation and usage of progressive loading indicators for multi-step operations. These components provide real-time feedback to users during long-running operations like test generation, file uploads, data exports, and bulk operations.

## Components

### 1. ProgressIndicator

A versatile progress indicator component that supports multiple variants and modes.

#### Props

```typescript
interface ProgressIndicatorProps {
  current: number              // Current step number
  total: number                // Total number of steps
  percentage?: number          // Override calculated percentage
  status?: string             // Status message to display
  estimatedTime?: number      // Estimated time remaining in seconds
  onCancel?: () => void       // Cancel callback
  cancelable?: boolean        // Show cancel button (default: true)
  mode?: 'determinate' | 'indeterminate'  // Progress mode
  variant?: 'linear' | 'circular' | 'compact'  // Visual variant
  size?: 'sm' | 'md' | 'lg'   // Component size
  color?: 'blue' | 'emerald' | 'purple' | 'amber'  // Color theme
  showPercentage?: boolean    // Show percentage (default: true)
  showSteps?: boolean         // Show step counter (default: true)
  showEstimatedTime?: boolean // Show time remaining (default: true)
  className?: string          // Additional CSS classes
  error?: string             // Error message
  success?: boolean          // Success state
}
```

#### Variants

**Linear (Default)**
- Horizontal progress bar
- Best for operations with known duration
- Shows percentage, steps, and estimated time

```tsx
<ProgressIndicator
  current={2}
  total={5}
  percentage={40}
  status="Generating questions..."
  variant="linear"
  size="md"
  color="blue"
/>
```

**Circular**
- Circular progress ring
- Great for centered layouts and modal dialogs
- Prominent percentage display

```tsx
<ProgressIndicator
  current={3}
  total={4}
  percentage={75}
  status="Almost done..."
  variant="circular"
  size="lg"
  color="emerald"
/>
```

**Compact**
- Inline progress indicator
- Perfect for list items and notifications
- Minimal space usage

```tsx
<ProgressIndicator
  current={1}
  total={3}
  percentage={33}
  status="Uploading..."
  variant="compact"
  size="sm"
  color="purple"
/>
```

#### Modes

**Determinate**
- Shows specific progress percentage
- Use when you can calculate progress
- Better user experience with known duration

```tsx
<ProgressIndicator
  current={50}
  total={100}
  mode="determinate"
  status="Processing items..."
/>
```

**Indeterminate**
- Animated loading without specific percentage
- Use when duration is unknown
- Shows continuous animation

```tsx
<ProgressIndicator
  current={0}
  total={1}
  mode="indeterminate"
  status="Loading..."
/>
```

### 2. StepIndicator

A step-by-step progress indicator for multi-phase operations.

#### Props

```typescript
interface Step {
  id: string
  label: string
  description?: string
  status?: 'pending' | 'in-progress' | 'completed' | 'error'
  error?: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  size?: 'sm' | 'md' | 'lg'
  color?: 'blue' | 'emerald' | 'purple' | 'amber'
  variant?: 'numbered' | 'icon' | 'minimal'
  showConnectors?: boolean
  animated?: boolean
  className?: string
  onStepClick?: (index: number) => void
  clickable?: boolean
}
```

#### Usage Examples

**Horizontal Layout**

```tsx
const steps: Step[] = [
  { id: 'validate', label: 'Validation', status: 'completed' },
  { id: 'process', label: 'Processing', status: 'in-progress' },
  { id: 'verify', label: 'Verification', status: 'pending' },
  { id: 'complete', label: 'Complete', status: 'pending' },
]

<StepIndicator
  steps={steps}
  currentStep={1}
  orientation="horizontal"
  size="md"
  color="blue"
/>
```

**Vertical Layout**

```tsx
<StepIndicator
  steps={steps}
  currentStep={2}
  orientation="vertical"
  size="md"
  color="emerald"
  showConnectors={true}
/>
```

## Integration Examples

### Test Generation

```tsx
import { useState } from 'react'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import StepIndicator, { Step } from '@/components/ui/StepIndicator'

function TestGeneration() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [percentage, setPercentage] = useState(0)

  const steps: Step[] = [
    { id: '1', label: 'Analyzing Topics', status: 'pending' },
    { id: '2', label: 'Generating Questions', status: 'pending' },
    { id: '3', label: 'Quality Check', status: 'pending' },
    { id: '4', label: 'Formatting', status: 'pending' },
  ]

  const handleGenerate = async () => {
    setIsGenerating(true)

    // Simulate generation process
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i)
      // Update progress, steps status, etc.
      await processStep(i)
    }

    setIsGenerating(false)
  }

  return (
    <div>
      <StepIndicator
        steps={steps}
        currentStep={currentStep}
        orientation="horizontal"
      />

      {isGenerating && (
        <ProgressIndicator
          current={currentStep + 1}
          total={steps.length}
          percentage={percentage}
          status="Generating test..."
          estimatedTime={30}
          onCancel={() => setIsGenerating(false)}
        />
      )}
    </div>
  )
}
```

### File Upload

```tsx
function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('idle')

  const handleUpload = async (file: File) => {
    setUploadStatus('uploading')

    // Simulate upload with progress
    const formData = new FormData()
    formData.append('file', file)

    const xhr = new XMLHttpRequest()

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100
        setUploadProgress(progress)
      }
    })

    xhr.addEventListener('load', () => {
      setUploadStatus('complete')
    })

    xhr.open('POST', '/api/upload')
    xhr.send(formData)
  }

  return (
    <div>
      <ProgressIndicator
        current={uploadProgress}
        total={100}
        percentage={uploadProgress}
        status={
          uploadStatus === 'uploading'
            ? 'Uploading file...'
            : 'Upload complete!'
        }
        variant="linear"
        color="emerald"
        success={uploadStatus === 'complete'}
      />
    </div>
  )
}
```

### Bulk Operations

```tsx
function BulkOperations() {
  const [processedCount, setProcessedCount] = useState(0)
  const totalItems = 150

  const processBatch = async (items: any[]) => {
    for (const item of items) {
      await processItem(item)
      setProcessedCount(prev => prev + 1)
    }
  }

  const percentage = (processedCount / totalItems) * 100

  return (
    <div>
      <ProgressIndicator
        current={processedCount}
        total={totalItems}
        percentage={percentage}
        status={`Processing item ${processedCount} of ${totalItems}`}
        variant="linear"
        color="amber"
        showSteps={false}
      />

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Processed" value={processedCount} />
        <Stat label="Remaining" value={totalItems - processedCount} />
        <Stat label="Progress" value={`${Math.round(percentage)}%`} />
      </div>
    </div>
  )
}
```

### Data Export

```tsx
function DataExport() {
  const [exportProgress, setExportProgress] = useState(0)
  const [exportStep, setExportStep] = useState(0)

  const exportSteps = [
    'Fetching data...',
    'Processing records...',
    'Formatting file...',
    'Preparing download...',
  ]

  const handleExport = async () => {
    for (let i = 0; i < exportSteps.length; i++) {
      setExportStep(i)
      await performExportStep(i)
      setExportProgress((i + 1) / exportSteps.length * 100)
    }
  }

  return (
    <ProgressIndicator
      current={exportStep + 1}
      total={exportSteps.length}
      percentage={exportProgress}
      status={exportSteps[exportStep]}
      variant="compact"
      color="purple"
    />
  )
}
```

## Best Practices

### 1. Choose the Right Variant

- **Linear**: Best for most use cases, especially full-width layouts
- **Circular**: Use in modals, dialogs, or centered content
- **Compact**: Perfect for inline progress in lists or notifications

### 2. Provide Meaningful Status Messages

```tsx
// Good - Specific and actionable
status="Generating question 25 of 50..."

// Bad - Generic
status="Loading..."
```

### 3. Show Estimated Time for Long Operations

```tsx
<ProgressIndicator
  current={2}
  total={5}
  estimatedTime={45}  // Show time for operations > 10s
  status="Generating test..."
/>
```

### 4. Handle Errors Gracefully

```tsx
<ProgressIndicator
  current={3}
  total={5}
  error="Failed to generate questions. Please try again."
  color="blue"
/>
```

### 5. Support Cancellation

```tsx
<ProgressIndicator
  current={2}
  total={5}
  cancelable={true}
  onCancel={() => {
    // Cleanup and stop operation
    stopGeneration()
  }}
/>
```

### 6. Use Step Indicators for Complex Workflows

```tsx
// For operations with distinct phases
<StepIndicator
  steps={[
    { id: '1', label: 'Setup', status: 'completed' },
    { id: '2', label: 'Processing', status: 'in-progress' },
    { id: '3', label: 'Verification', status: 'pending' },
  ]}
  currentStep={1}
/>
```

## Color Usage

Choose colors based on operation type:

- **Blue**: General operations, default choice
- **Emerald**: Success states, file uploads, data processing
- **Purple**: Data exports, transformations, analytics
- **Amber**: Warnings, bulk operations, deletions

## Accessibility

All components include:

- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color schemes
- Clear visual indicators
- Descriptive status messages

## Performance Tips

1. **Batch Updates**: Update progress in reasonable intervals (50-100ms)
2. **Debounce Status**: Don't update status too frequently
3. **Use Mode Wisely**: Indeterminate mode is cheaper for unknown durations
4. **Cleanup**: Cancel timers and intervals when component unmounts

```tsx
useEffect(() => {
  if (!isProcessing) return

  const interval = setInterval(() => {
    setProgress(prev => prev + 1)
  }, 100)

  return () => clearInterval(interval)  // Cleanup
}, [isProcessing])
```

## Demo Pages

Live examples available at:

- `/demo/progress-indicators` - Main showcase with all variants
- `/components/examples/TestGenerationWithProgress` - Test generation example
- `/components/examples/FileUploadWithProgress` - File upload example
- `/components/examples/BulkOperationsWithProgress` - Bulk operations example

## API Reference

### Time Formatting

The component automatically formats estimated time:

- < 60 seconds: "45s"
- >= 60 seconds: "2m 30s"
- >= 3600 seconds: "1h 15m"

### Percentage Calculation

When `percentage` prop is not provided, it's automatically calculated:

```typescript
percentage = (current / total) * 100
```

### Status Updates

Status messages should be:
- Descriptive but concise
- Present tense ("Generating..." not "Generated")
- Specific when possible ("Processing item 10 of 50")

## Troubleshooting

### Progress Not Updating

```tsx
// Wrong - Not triggering re-render
let progress = 0
progress = 50

// Correct - Using state
const [progress, setProgress] = useState(0)
setProgress(50)
```

### Animation Stuttering

```tsx
// Use larger update intervals
setInterval(() => updateProgress(), 100)  // Good
setInterval(() => updateProgress(), 10)   // Too frequent
```

### Cancel Not Working

```tsx
// Ensure proper cleanup
const handleCancel = () => {
  setIsProcessing(false)
  cancelOperation()     // Clean up operation
  resetProgress()       // Reset state
}
```

## Browser Support

- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+
- Mobile browsers: Full support

## Dependencies

- React 18+
- Framer Motion 10+
- Tailwind CSS 3+
- Lucide React icons
