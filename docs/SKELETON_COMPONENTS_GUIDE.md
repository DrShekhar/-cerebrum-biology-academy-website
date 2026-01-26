# Skeleton Components Guide

## Overview

This guide documents the comprehensive skeleton component system used throughout the Cerebrum Biology Academy platform. Skeleton screens provide visual feedback during loading states, improving perceived performance and user experience.

## Architecture

```
src/components/ui/
├── Skeleton.tsx              # Base skeleton component with variants
└── skeletons/
    └── index.tsx            # Domain-specific skeleton components
```

## Quick Start

### Basic Usage

```tsx
import { Skeleton } from '@/components/ui/Skeleton'

export function MyComponent() {
  const { data, isLoading } = useQuery()

  if (isLoading) {
    return <Skeleton className="h-4 w-full" />
  }

  return <div>{data.content}</div>
}
```

### Using Predefined Components

```tsx
import { SkeletonCard, SkeletonText } from '@/components/ui/Skeleton'

export function LoadingState() {
  return (
    <div className="space-y-4">
      <SkeletonText lines={2} />
      <SkeletonCard />
    </div>
  )
}
```

### Using Domain-Specific Components

```tsx
import { CourseGridSkeleton, DashboardStatsSkeleton } from '@/components/ui/skeletons'

export function CoursesPage() {
  const { data, isLoading } = useCourses()

  if (isLoading) {
    return <CourseGridSkeleton count={6} />
  }

  return <CourseGrid courses={data} />
}
```

## Base Skeleton Component

### Props Interface

```typescript
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'pulse' | 'wave' | 'none'
  shape?: 'rounded' | 'circular' | 'rectangular' | 'pill'
  lines?: number
  lineSpacing?: number
}
```

### Animation Variants

**Pulse** (default)

- Smooth fade in/out animation
- Best for most use cases
- Low motion, accessible

```tsx
<Skeleton variant="pulse" className="h-4 w-32" />
```

**Wave**

- Shimmer effect moving left to right
- More visually engaging
- Use sparingly for important content

```tsx
<Skeleton variant="wave" className="h-8 w-48" />
```

**None**

- Static placeholder without animation
- Use for reduced motion preferences
- Minimal visual distraction

```tsx
<Skeleton variant="none" className="h-6 w-24" />
```

### Shape Variants

**Rounded** (default)

- Standard rounded corners
- Best for cards, buttons, inputs

```tsx
<Skeleton shape="rounded" className="h-10 w-full" />
```

**Circular**

- Perfect circle shape
- Use for avatars, icons, badges

```tsx
<Skeleton shape="circular" className="h-12 w-12" />
```

**Rectangular**

- Sharp corners, no border radius
- Use for images, full-width elements

```tsx
<Skeleton shape="rectangular" className="h-64 w-full" />
```

**Pill**

- Fully rounded ends
- Use for tags, chips, status badges

```tsx
<Skeleton shape="pill" className="h-6 w-20" />
```

### Multi-Line Support

```tsx
// 3 lines of text with default spacing
<Skeleton lines={3} />

// Custom spacing between lines
<Skeleton lines={5} lineSpacing={3} />
```

## Predefined Components

### SkeletonText

For loading text content with multiple lines.

```tsx
import { SkeletonText } from '@/components/ui/Skeleton'

// Default 3 lines
<SkeletonText />

// Custom number of lines
<SkeletonText lines={5} />

// With custom styling
<SkeletonText lines={2} className="max-w-md" />
```

**Use cases**: Paragraphs, descriptions, article previews

### SkeletonCard

Pre-styled card skeleton with title, content, and action buttons.

```tsx
import { SkeletonCard } from '@/components/ui/Skeleton'

<SkeletonCard />
<SkeletonCard className="max-w-sm" />
```

**Use cases**: Blog cards, product cards, info panels

### SkeletonAvatar

User avatar placeholder with size variants.

```tsx
import { SkeletonAvatar } from '@/components/ui/Skeleton'

<SkeletonAvatar size="sm" />  // 32x32
<SkeletonAvatar size="md" />  // 40x40 (default)
<SkeletonAvatar size="lg" />  // 48x48
<SkeletonAvatar size="xl" />  // 64x64
```

**Use cases**: User profiles, comment sections, team listings

### SkeletonButton

Button-shaped skeleton.

```tsx
import { SkeletonButton } from '@/components/ui/Skeleton'

<SkeletonButton />
<SkeletonButton className="w-32" />
```

**Use cases**: Action buttons, CTAs, form submissions

### SkeletonInput

Form input placeholder.

```tsx
import { SkeletonInput } from '@/components/ui/Skeleton'

<SkeletonInput />
<SkeletonInput className="max-w-xs" />
```

**Use cases**: Form fields, search bars, text inputs

### SkeletonImage

Image placeholder with aspect ratio support.

```tsx
import { SkeletonImage } from '@/components/ui/Skeleton'

<SkeletonImage aspectRatio="square" />   // 1:1
<SkeletonImage aspectRatio="video" />    // 16:9 (default)
<SkeletonImage aspectRatio="portrait" /> // 3:4
<SkeletonImage aspectRatio="wide" />     // 21:9
```

**Use cases**: Featured images, thumbnails, galleries

### SkeletonTable

Table structure with headers and rows.

```tsx
import { SkeletonTable } from '@/components/ui/Skeleton'

<SkeletonTable rows={5} columns={4} />
<SkeletonTable rows={10} columns={6} />
```

**Use cases**: Data tables, spreadsheets, listings

### SkeletonList

Vertical list of items with optional avatars.

```tsx
import { SkeletonList } from '@/components/ui/Skeleton'

<SkeletonList items={5} />
<SkeletonList items={10} showAvatar={true} />
```

**Use cases**: User lists, notifications, activity feeds

### SkeletonForm

Complete form structure with labels and inputs.

```tsx
import { SkeletonForm } from '@/components/ui/Skeleton'

<SkeletonForm fields={4} />
<SkeletonForm fields={6} />
```

**Use cases**: Loading states for forms, settings pages

## Domain-Specific Components

### Dashboard Skeletons

**DashboardStatsSkeleton**

```tsx
import { DashboardStatsSkeleton } from '@/components/ui/skeletons'
;<DashboardStatsSkeleton />
```

4-column stat card grid for dashboard metrics.

**DashboardChartSkeleton**

```tsx
<DashboardChartSkeleton />
<DashboardChartSkeleton className="h-96" />
```

Chart placeholder with title and legend.

**DashboardActivitySkeleton**

```tsx
<DashboardActivitySkeleton items={5} />
<DashboardActivitySkeleton items={10} />
```

Activity feed with avatars and descriptions.

### Course Skeletons

**CourseCardSkeleton**

```tsx
import { CourseCardSkeleton } from '@/components/ui/skeletons'
;<CourseCardSkeleton />
```

Individual course card with image, title, description, and CTA.

**CourseGridSkeleton**

```tsx
<CourseGridSkeleton count={6} />
<CourseGridSkeleton count={9} />
```

Responsive grid of course cards (2-3 columns).

**CourseDetailSkeleton**

```tsx
<CourseDetailSkeleton />
```

Full course detail page structure with hero, video, and sidebar.

### Test & Quiz Skeletons

**QuestionCardSkeleton**

```tsx
import { QuestionCardSkeleton } from '@/components/ui/skeletons'
;<QuestionCardSkeleton />
```

Question card with number, text, and 4 options.

**TestSessionSkeleton**

```tsx
<TestSessionSkeleton />
```

Complete test interface with header, progress, question, and navigation.

### Chat Skeletons

**ChatMessageSkeleton**

```tsx
import { ChatMessageSkeleton } from '@/components/ui/skeletons'

<ChatMessageSkeleton />
<ChatMessageSkeleton isUser={true} />
```

Single chat message bubble with avatar and timestamp.

**ChatConversationSkeleton**

```tsx
<ChatConversationSkeleton messages={5} />
<ChatConversationSkeleton messages={10} />
```

Full conversation thread alternating between user and assistant.

**ChatInterfaceSkeleton**

```tsx
<ChatInterfaceSkeleton />
```

Complete chat UI with header, messages, and input box.

### Profile Skeletons

**ProfileHeaderSkeleton**

```tsx
import { ProfileHeaderSkeleton } from '@/components/ui/skeletons'
;<ProfileHeaderSkeleton />
```

User profile header with large avatar, name, bio, and stats.

**UserCardSkeleton**

```tsx
<UserCardSkeleton />
```

Compact user card with avatar and basic info.

### Analytics Skeletons

**MetricCardSkeleton**

```tsx
import { MetricCardSkeleton } from '@/components/ui/skeletons'
;<MetricCardSkeleton />
```

Analytics metric card with icon, value, and change indicator.

**AnalyticsDashboardSkeleton**

```tsx
<AnalyticsDashboardSkeleton />
```

Complete analytics dashboard with stats, charts, and table.

### Generic Skeletons

**ListItemSkeleton**

```tsx
import { ListItemSkeleton } from '@/components/ui/skeletons'
;<ListItemSkeleton />
```

Single list item with avatar, title, description, and action.

**GridSkeleton**

```tsx
<GridSkeleton items={6} columns={3} />
<GridSkeleton items={8} columns={4} />
```

Responsive card grid with 2, 3, or 4 columns.

**PageHeaderSkeleton**

```tsx
<PageHeaderSkeleton />
```

Page header with title, description, and action buttons.

**FullPageSkeleton**

```tsx
<FullPageSkeleton />
```

Complete page skeleton with header, stats, and content sections.

## Best Practices

### 1. Match Content Structure

Skeleton should mirror the actual content layout as closely as possible.

```tsx
// ✅ Good - Matches actual card structure
function CourseCard() {
  if (isLoading) {
    return (
      <div className="rounded-lg border p-4">
        <Skeleton className="mb-4 h-48 w-full" /> {/* Image */}
        <Skeleton className="mb-2 h-6 w-3/4" /> {/* Title */}
        <Skeleton lines={2} className="mb-4" /> {/* Description */}
        <Skeleton className="h-10 w-full" /> {/* Button */}
      </div>
    )
  }

  return (
    <div className="rounded-lg border p-4">
      <img src={course.image} className="mb-4 h-48 w-full" />
      <h3 className="mb-2 text-xl">{course.title}</h3>
      <p className="mb-4">{course.description}</p>
      <button className="h-10 w-full">Enroll</button>
    </div>
  )
}

// ❌ Bad - Doesn't match structure
function CourseCard() {
  if (isLoading) {
    return <Skeleton className="h-64 w-full" />
  }
  // ... actual content
}
```

### 2. Use Appropriate Dimensions

Set skeleton dimensions using Tailwind classes, not exact pixels.

```tsx
// ✅ Good - Responsive, matches design system
<Skeleton className="h-4 w-full" />
<Skeleton className="h-8 w-48" />

// ❌ Bad - Fixed dimensions, not responsive
<Skeleton style={{ height: '32px', width: '192px' }} />
```

### 3. Maintain Visual Hierarchy

Use different sizes and spacing to indicate content importance.

```tsx
// ✅ Good - Clear hierarchy
<div>
  <Skeleton className="mb-2 h-8 w-3/4" /> {/* Title - larger */}
  <Skeleton className="mb-4 h-4 w-1/2" /> {/* Subtitle - smaller */}
  <Skeleton lines={3} /> {/* Body text */}
</div>

// ❌ Bad - Everything same size
<div>
  <Skeleton className="mb-2 h-4 w-full" />
  <Skeleton className="mb-2 h-4 w-full" />
  <Skeleton className="mb-2 h-4 w-full" />
</div>
```

### 4. Consider Accessibility

Skeletons should not interfere with screen readers or keyboard navigation.

```tsx
// ✅ Good - Semantic and accessible
<div role="status" aria-label="Loading courses">
  <CourseGridSkeleton count={6} />
  <span className="sr-only">Loading courses...</span>
</div>

// ✅ Also good - With reduced motion support
<Skeleton
  variant={prefersReducedMotion ? 'none' : 'pulse'}
  className="h-4 w-full"
/>
```

### 5. Avoid Over-Animation

Don't use wave animation everywhere; reserve it for primary content.

```tsx
// ✅ Good - Pulse for most, wave for hero
<>
  <Skeleton variant="wave" className="h-96 w-full" /> {/* Hero image */}
  <Skeleton variant="pulse" className="h-4 w-full" /> {/* Body text */}
  <Skeleton variant="pulse" className="h-4 w-full" />
</>

// ❌ Bad - Wave everywhere is distracting
<>
  <Skeleton variant="wave" className="h-96 w-full" />
  <Skeleton variant="wave" className="h-4 w-full" />
  <Skeleton variant="wave" className="h-4 w-full" />
</>
```

### 6. Use Domain Components When Available

Prefer pre-built domain components over custom skeletons for consistency.

```tsx
// ✅ Good - Reuses domain component
import { CourseCardSkeleton } from '@/components/ui/skeletons'

function CoursesPage() {
  if (isLoading) return <CourseCardSkeleton />
  return <CourseCard course={data} />
}

// ❌ Bad - Custom skeleton that might drift from design
function CoursesPage() {
  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    )
  }
  return <CourseCard course={data} />
}
```

### 7. Show Count Information

When loading lists, show the expected number of items.

```tsx
// ✅ Good - Shows expected count
<CourseGridSkeleton count={courses.length || 6} />

// ❌ Bad - Random default count
<CourseGridSkeleton />
```

## Patterns & Examples

### Pattern 1: List with Pagination

```tsx
function CourseList() {
  const { data, isLoading, isFetching } = useCourses()

  if (isLoading) {
    return <CourseGridSkeleton count={9} />
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {isFetching && (
        <div className="mt-6">
          <CourseGridSkeleton count={3} />
        </div>
      )}
    </>
  )
}
```

### Pattern 2: Progressive Loading

```tsx
function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useStats()
  const { data: activity, isLoading: activityLoading } = useActivity()

  return (
    <div className="space-y-6">
      {statsLoading ? <DashboardStatsSkeleton /> : <StatsGrid stats={stats} />}

      {activityLoading ? (
        <DashboardActivitySkeleton items={5} />
      ) : (
        <ActivityFeed activities={activity} />
      )}
    </div>
  )
}
```

### Pattern 3: Suspense Boundaries

```tsx
import { Suspense } from 'react'
import { CourseGridSkeleton } from '@/components/ui/skeletons'

function CoursesPage() {
  return (
    <Suspense fallback={<CourseGridSkeleton count={6} />}>
      <CourseList />
    </Suspense>
  )
}
```

### Pattern 4: Optimistic Updates

```tsx
function CommentForm() {
  const [isPosting, setIsPosting] = useState(false)

  const handleSubmit = async (data) => {
    setIsPosting(true)
    await postComment(data)
    setIsPosting(false)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>{/* Form fields */}</form>

      {isPosting && (
        <div className="mt-4">
          <ChatMessageSkeleton isUser={true} />
        </div>
      )}
    </>
  )
}
```

### Pattern 5: Infinite Scroll

```tsx
function InfiniteCourseList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(...)

  return (
    <>
      {data.pages.map(page => (
        page.courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))
      ))}

      {isFetchingNextPage && <CourseGridSkeleton count={3} />}

      {hasNextPage && <IntersectionObserver onIntersect={fetchNextPage} />}
    </>
  )
}
```

## Dark Mode Support

All skeleton components automatically support dark mode using Tailwind's dark mode utilities.

```tsx
// Base skeleton automatically handles dark mode
<Skeleton className="h-4 w-full" />

// Renders as:
// Light: bg-gray-200
// Dark: bg-gray-700

// Custom dark mode variants
<Skeleton className="bg-gray-300 dark:bg-gray-600 h-4 w-full" />
```

## Animation Configuration

The skeleton components use Tailwind animations. Ensure your `tailwind.config.ts` includes:

```typescript
export default {
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
}
```

## Testing Skeletons

```tsx
import { render, screen } from '@testing-library/react'
import { CourseCardSkeleton } from '@/components/ui/skeletons'

describe('CourseCardSkeleton', () => {
  it('should render skeleton structure', () => {
    render(<CourseCardSkeleton />)

    // Check for proper ARIA attributes
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<CourseCardSkeleton className="custom-class" />)

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
```

## Performance Considerations

1. **Reuse Components**: Domain components are memoized and optimized
2. **Avoid Deep Nesting**: Keep skeleton DOM structure shallow
3. **Use CSS Animations**: Prefer CSS over JS for animations
4. **Lazy Load**: Don't render skeletons for off-screen content

```tsx
// ✅ Good - Lazy load skeleton
;<Suspense fallback={null}>
  <LazyComponent />
</Suspense>

// ❌ Bad - Skeleton for content that won't be seen
{
  items.map((item, i) => (i < 10 ? <Item /> : <SkeletonItem />))
}
```

## Migration Guide

### Replacing Existing Skeletons

**Before**:

```tsx
function LoadingCourses() {
  return (
    <div className="grid gap-4 grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded" />
          <div className="bg-gray-200 h-4 mt-2 rounded" />
          <div className="bg-gray-200 h-4 mt-2 rounded w-3/4" />
        </div>
      ))}
    </div>
  )
}
```

**After**:

```tsx
import { CourseGridSkeleton } from '@/components/ui/skeletons'

function LoadingCourses() {
  return <CourseGridSkeleton count={6} />
}
```

## Troubleshooting

### Issue: Skeleton doesn't match content size

**Solution**: Ensure you're using the same container classes for both skeleton and actual content.

```tsx
// ✅ Good - Same container
;<div className="max-w-4xl mx-auto">{isLoading ? <SkeletonCard /> : <Card data={data} />}</div>

// ❌ Bad - Different containers
{
  isLoading ? (
    <SkeletonCard />
  ) : (
    <div className="max-w-4xl">
      <Card />
    </div>
  )
}
```

### Issue: Wave animation not working

**Solution**: Verify `animate-shimmer` is configured in `tailwind.config.ts` (see Animation Configuration section).

### Issue: Skeleton flashes before content

**Solution**: Use Suspense or add minimum loading time.

```tsx
const [showSkeleton, setShowSkeleton] = useState(true)

useEffect(() => {
  if (!isLoading) {
    // Minimum 300ms skeleton display
    setTimeout(() => setShowSkeleton(false), 300)
  }
}, [isLoading])

return showSkeleton ? <Skeleton /> : <Content />
```

## Resources

- [Skeleton Screen Pattern](https://www.nngroup.com/articles/skeleton-screens/)
- [Tailwind CSS Animations](https://tailwindcss.com/docs/animation)
- [React Suspense](https://react.dev/reference/react/Suspense)
- [Accessibility Loading States](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
