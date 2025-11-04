# Skeleton Loaders Implementation Guide

## Overview

This guide demonstrates how to integrate skeleton loaders for all data-heavy components in the AI Education Dashboard.

## Created Skeleton Components

### 1. Progress Card Skeletons

**Location**: `/src/components/ai/skeletons/ProgressCardSkeleton.tsx`

**Components**:

- `ProgressCardSkeleton` - Single progress card loader
- `ProgressCardsGridSkeleton` - Grid of 4 progress cards

**Usage**:

```tsx
import { ProgressCardSkeleton, ProgressCardsGridSkeleton } from '@/components/ai/skeletons'
import {
  SyllabusCard,
  StudyHoursCard,
  TestScoreCard,
  StreakCard,
} from '@/components/ai/ProgressCard'

function ProgressSection() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  if (loading) {
    return <ProgressCardsGridSkeleton />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <SyllabusCard completed={data.completed} total={data.total} />
      <StudyHoursCard hours={data.hours} target={data.target} />
      <TestScoreCard score={data.score} maxScore={data.maxScore} />
      <StreakCard days={data.days} bestStreak={data.bestStreak} />
    </div>
  )
}
```

### 2. Activity Feed Skeletons

**Location**: `/src/components/ai/skeletons/ActivitySkeleton.tsx`

**Components**:

- `ActivityItemSkeleton` - Single activity item loader
- `ActivityFeedSkeleton` - Complete activity feed with 4 items
- `LiveActivitySkeleton` - Real-time activity feed loader

**Usage**:

```tsx
import { ActivityFeedSkeleton } from '@/components/ai/skeletons'

function RecentActivity() {
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])

  if (loading) {
    return <ActivityFeedSkeleton />
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Activity items */}
    </div>
  )
}
```

### 3. AI Predictions Skeletons

**Location**: `/src/components/ai/skeletons/PredictionsSkeleton.tsx`

**Components**:

- `PredictionCardSkeleton` - Single prediction card loader
- `PredictionsSkeleton` - Complete predictions section with 3 cards + quick actions

**Usage**:

```tsx
import { PredictionsSkeleton } from '@/components/ai/skeletons'

function AIPredictions() {
  const [loading, setLoading] = useState(true)
  const [predictions, setPredictions] = useState(null)

  if (loading) {
    return <PredictionsSkeleton />
  }

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 sm:p-6 lg:p-8">
      {/* Prediction cards */}
    </div>
  )
}
```

### 4. Analytics Dashboard Skeletons

**Location**: `/src/components/ai/skeletons/AnalyticsSkeleton.tsx`

**Components**:

- `AnalyticsChartSkeleton` - Single chart loader
- `AnalyticsMetricSkeleton` - Single metric card loader
- `AnalyticsDashboardSkeleton` - Complete analytics dashboard

**Usage**:

```tsx
import { AnalyticsDashboardSkeleton } from '@/components/ai/skeletons'

function Analytics() {
  const [loading, setLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState(null)

  if (loading) {
    return <AnalyticsDashboardSkeleton />
  }

  return <div className="space-y-6">{/* Analytics content */}</div>
}
```

### 5. Real-Time Metrics Skeletons

**Location**: `/src/components/ai/skeletons/MetricsSkeleton.tsx`

**Components**:

- `MetricCardSkeleton` - Single metric card loader
- `SystemHealthSkeleton` - System health panel loader
- `RealTimeMetricsSkeleton` - Complete real-time metrics dashboard

**Usage**:

```tsx
import { RealTimeMetricsSkeleton } from '@/components/ai/skeletons'

function RealTimeMetrics() {
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState(null)

  if (loading) {
    return <RealTimeMetricsSkeleton />
  }

  return <div className="space-y-6">{/* Metrics content */}</div>
}
```

## Integration Examples

### Example 1: AIEducationDashboard Overview Tab

```tsx
// Before
{
  activeTab === 'overview' && (
    <motion.div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <SyllabusCard
          completed={progressData.syllabus.completed}
          total={progressData.syllabus.total}
        />
        {/* ... more cards */}
      </div>
    </motion.div>
  )
}

// After
{
  activeTab === 'overview' && (
    <motion.div className="space-y-8">
      {isLoadingProgress ? (
        <ProgressCardsGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <SyllabusCard
            completed={progressData.syllabus.completed}
            total={progressData.syllabus.total}
          />
          {/* ... more cards */}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {isLoadingPredictions ? (
          <div className="lg:col-span-2">
            <PredictionsSkeleton />
          </div>
        ) : (
          <div className="lg:col-span-2">{/* AI Predictions content */}</div>
        )}

        {isLoadingActivity ? <ActivityFeedSkeleton /> : <div>{/* Recent Activity content */}</div>}
      </div>
    </motion.div>
  )
}
```

### Example 2: Analytics Tab with Loading States

```tsx
import { AnalyticsDashboardSkeleton } from '@/components/ai/skeletons'

{
  activeTab === 'analytics' && (
    <motion.div>
      {isLoadingAnalytics ? <AnalyticsDashboardSkeleton /> : <Analytics data={analyticsData} />}
    </motion.div>
  )
}
```

### Example 3: Metrics Tab with Loading States

```tsx
import { RealTimeMetricsSkeleton } from '@/components/ai/skeletons'

{
  activeTab === 'metrics' && (
    <motion.div>{isLoadingMetrics ? <RealTimeMetricsSkeleton /> : <RealTimeMetrics />}</motion.div>
  )
}
```

## Features

### Shimmer Animation

All skeleton loaders use a smooth shimmer effect using Framer Motion:

- 2-second animation cycle
- Linear easing for consistent movement
- Infinite repeat
- Gradient colors matching the design system

### Responsive Design

All skeleton components are fully responsive:

- Mobile-first approach
- Tailwind breakpoints (sm, md, lg)
- Flexible layouts that match actual components

### Accessibility

All skeleton components include:

- `role="status"` for screen readers
- `aria-label` describing the loading state
- `sr-only` text for additional context
- Proper semantic structure

### Color Scheme

Consistent neutral gray palette:

- Base: `#f3f4f6` (gray-100)
- Highlight: `#e5e7eb` (gray-200)
- Matches the existing design system

## Best Practices

### 1. Match Actual Component Dimensions

Skeleton loaders should match the actual component's layout and spacing:

```tsx
// ✓ Good - Matches actual component
<div className="rounded-2xl p-4 sm:p-6 lg:p-8">
  {/* Skeleton content with same padding/spacing */}
</div>

// ✗ Bad - Different dimensions
<div className="rounded-xl p-2">
  {/* Won't match actual component */}
</div>
```

### 2. Use Appropriate Loading States

Show skeletons only when data is being fetched:

```tsx
// ✓ Good - Clear loading state
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  fetchData().then(() => setIsLoading(false))
}, [])

// ✗ Bad - No loading state management
const [data, setData] = useState(null)
```

### 3. Group Related Skeletons

Use composite skeleton components for related content:

```tsx
// ✓ Good - Single skeleton for entire section
<ProgressCardsGridSkeleton />

// ✗ Bad - Multiple individual skeletons
<ProgressCardSkeleton />
<ProgressCardSkeleton />
<ProgressCardSkeleton />
<ProgressCardSkeleton />
```

### 4. Maintain Consistency

Keep skeleton timing consistent across the app:

```tsx
// ✓ Good - Standard 2-second animation
const shimmerAnimation = {
  transition: { duration: 2 },
}

// ✗ Bad - Varying speeds
const shimmerAnimation = {
  transition: { duration: 5 },
}
```

## Performance Considerations

1. **Lazy Loading**: Skeleton components are lightweight and can be rendered immediately
2. **Animation Performance**: Uses CSS transforms (hardware-accelerated)
3. **Memory Efficiency**: Reuses animation configurations
4. **Bundle Size**: Minimal impact (~5KB for all skeleton components)

## Testing

### Visual Testing Checklist

- [ ] Skeleton matches actual component dimensions
- [ ] Animation is smooth and doesn't cause layout shift
- [ ] Responsive behavior matches actual component
- [ ] Accessibility labels are present and accurate
- [ ] Color scheme matches design system

### Integration Testing

```tsx
// Test loading state
it('shows skeleton while loading', () => {
  const { getByLabelText } = render(<ProgressSection />)
  expect(getByLabelText('Loading progress cards')).toBeInTheDocument()
})

// Test loaded state
it('shows content after loading', async () => {
  const { getByText, queryByLabelText } = render(<ProgressSection />)

  await waitFor(() => {
    expect(queryByLabelText('Loading progress cards')).not.toBeInTheDocument()
    expect(getByText('Syllabus Coverage')).toBeInTheDocument()
  })
})
```

## Migration Guide

### Step 1: Import Skeletons

```tsx
import {
  ProgressCardsGridSkeleton,
  ActivityFeedSkeleton,
  PredictionsSkeleton,
  AnalyticsDashboardSkeleton,
  RealTimeMetricsSkeleton,
} from '@/components/ai/skeletons'
```

### Step 2: Add Loading States

```tsx
const [isLoadingProgress, setIsLoadingProgress] = useState(true)
const [isLoadingActivity, setIsLoadingActivity] = useState(true)
const [isLoadingPredictions, setIsLoadingPredictions] = useState(true)
```

### Step 3: Replace Loading Logic

```tsx
// Before
{
  isInitialLoading ? <DashboardSkeleton /> : <DashboardContent />
}

// After
{
  isLoadingProgress ? <ProgressCardsGridSkeleton /> : <ProgressCards />
}
{
  isLoadingActivity ? <ActivityFeedSkeleton /> : <ActivityFeed />
}
{
  isLoadingPredictions ? <PredictionsSkeleton /> : <Predictions />
}
```

### Step 4: Update Data Fetching

```tsx
useEffect(() => {
  setIsLoadingProgress(true)
  fetchProgressData()
    .then((data) => setProgressData(data))
    .finally(() => setIsLoadingProgress(false))
}, [])
```

## Conclusion

The skeleton loader system provides:

- ✓ Improved perceived performance
- ✓ Better user experience during data loading
- ✓ Consistent loading states across the application
- ✓ Accessible and responsive design
- ✓ Easy integration with existing components

For questions or issues, refer to the component files in `/src/components/ai/skeletons/`.
