# Progress Indicators - Quick Reference

## Components

### ProgressIndicator

Multi-purpose progress indicator with 3 variants and 2 modes.

```tsx
import ProgressIndicator from '@/components/ui/ProgressIndicator'

// Linear progress bar
<ProgressIndicator
  current={2}
  total={5}
  percentage={40}
  status="Processing..."
  variant="linear"
  color="blue"
/>

// Circular progress
<ProgressIndicator
  current={3}
  total={4}
  status="Almost done..."
  variant="circular"
  size="lg"
  color="emerald"
/>

// Compact inline
<ProgressIndicator
  current={1}
  total={3}
  status="Uploading..."
  variant="compact"
  size="sm"
  color="purple"
/>
```

### StepIndicator

Step-by-step progress visualization.

```tsx
import StepIndicator, { Step } from '@/components/ui/StepIndicator'

const steps: Step[] = [
  { id: '1', label: 'Setup', status: 'completed' },
  { id: '2', label: 'Processing', status: 'in-progress' },
  { id: '3', label: 'Complete', status: 'pending' },
]

<StepIndicator
  steps={steps}
  currentStep={1}
  orientation="horizontal"
  color="blue"
/>
```

## Key Features

- **3 Visual Variants**: Linear, Circular, Compact
- **2 Progress Modes**: Determinate (known) and Indeterminate (unknown)
- **Animated Transitions**: Smooth Framer Motion animations
- **Estimated Time**: Automatic time formatting and display
- **Cancellation Support**: Built-in cancel functionality
- **Error Handling**: Error states and messages
- **Success States**: Visual feedback for completion
- **Responsive**: Works on all screen sizes
- **Accessible**: ARIA labels and keyboard support

## Color Themes

- **blue**: General operations, default choice
- **emerald**: Success, uploads, data processing
- **purple**: Exports, transformations, analytics
- **amber**: Warnings, bulk operations

## Demo

View live demo at: `/demo/progress-indicators`

## Examples

Integration examples available at:
- `/components/examples/TestGenerationWithProgress.tsx`
- `/components/examples/FileUploadWithProgress.tsx`
- `/components/examples/BulkOperationsWithProgress.tsx`

## Full Documentation

See `/docs/PROGRESS_INDICATORS_GUIDE.md` for complete documentation.
