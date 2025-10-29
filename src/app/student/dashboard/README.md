# Student Dashboard - Developer Guide

## Quick Start

```bash
# Navigate to the dashboard
http://localhost:3000/student/dashboard
```

## File Location

`/src/app/student/dashboard/page.tsx`

## Component Overview

### Main Component: `StudentDashboard`

The primary dashboard page that students see after login.

### Features

1. **Welcome Header** - Personalized greeting with date and motivational quote
2. **Quick Stats** - 4 metric cards (tests, scores, streak, next class)
3. **Today's Focus** - 3 recommended actions
4. **Performance Snapshot** - 7-day visual progress chart
5. **Quick Actions** - 4 navigation buttons
6. **Recent Activity** - Feed of last 5 activities

## Data Flow

```typescript
// On component mount:
1. Check authentication (useAuth)
2. Get or create freeUserId for guests
3. Fetch test attempts from API
4. Calculate statistics
5. Build UI data structures
6. Render dashboard

// API Endpoints Used:
- GET /api/test-attempts?freeUserId={userId}
- GET /api/test-sessions?freeUserId={userId}
```

## Key State Variables

```typescript
const [isLoading, setIsLoading] = useState(true)
const [freeUserId, setFreeUserId] = useState<string | null>(null)
const [testAttempts, setTestAttempts] = useState<TestAttempt[]>([])
const [quickStats, setQuickStats] = useState<QuickStat[]>([])
const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
const [currentDate, setCurrentDate] = useState(new Date())
```

## Helper Components

### `FocusCard`

Displays a recommended action with icon, title, description, and CTA.

**Props:**

- `icon`: React.ReactNode
- `title`: string
- `description`: string
- `action`: string (button text)
- `href`: string (navigation link)
- `color`: string (Tailwind bg class)

### `ActionButton`

Quick action button with icon and gradient background.

**Props:**

- `icon`: React.ReactNode
- `title`: string
- `description`: string
- `href`: string
- `color`: string (Tailwind gradient classes)

### `ActivityItem`

Single row in recent activity feed.

**Props:**

- `activity`: RecentActivity object

### `LoadingSkeleton`

Loading state placeholder UI.

## Styling

### Responsive Breakpoints

```css
/* Mobile: default (< 640px) */
/* Tablet: sm: (≥ 640px) */
/* Desktop: md: (≥ 768px) */
/* Large: lg: (≥ 1024px) */
```

### Color Scheme

```typescript
Blue: #3B82F6 (Tests/Analytics)
Green: #10B981 (Success/High scores)
Purple: #8B5CF6 (AI/Intelligence)
Orange: #F97316 (Warnings/Focus areas)
Teal: #14B8A6 (Brand primary)
```

## Adding New Features

### Add a New Stat Card

1. Update QuickStat interface if needed
2. Add to stats array in `fetchDashboardData()`:

```typescript
const stats: QuickStat[] = [
  // ... existing stats
  {
    label: 'Your New Stat',
    value: calculatedValue,
    icon: <YourIcon className="w-5 h-5" />,
    color: 'text-color-600 bg-color-50',
    trend: trendValue // optional
  }
]
```

### Add a New Quick Action

```typescript
<ActionButton
  icon={<YourIcon className="w-6 h-6" />}
  title="Your Action"
  description="Description text"
  href="/your/path"
  color="from-color-500 to-color-600"
/>
```

### Add a New Focus Card

```typescript
<FocusCard
  icon={<YourIcon className="w-5 h-5 text-color-600" />}
  title="Your Title"
  description="Your description"
  action="Button Text"
  href="/your/path"
  color="bg-color-50"
/>
```

## API Integration

### Current Integration

```typescript
// Fetches test attempts
const attemptsResponse = await fetch(`/api/test-attempts?freeUserId=${userId}`)
```

### Adding New Data Sources

```typescript
// In fetchDashboardData():
const [attempts, enrollments, classes] = await Promise.all([
  fetch(`/api/test-attempts?freeUserId=${userId}`),
  fetch(`/api/enrollments?userId=${userId}`),
  fetch(`/api/classes?userId=${userId}`),
])
```

## Common Tasks

### Change Motivational Quotes

Edit the `motivationalQuotes` array (line ~73):

```typescript
const motivationalQuotes = [
  'Your quote 1',
  'Your quote 2',
  // Add more...
]
```

### Modify 7-Day Chart Data

Currently uses mock data. To use real data, replace (line ~322):

```typescript
// Replace this:
{[85, 72, 90, 78, 88, 92, 95].map((score, index) => (
  // ...
))}

// With dynamic data:
{last7DaysScores.map((score, index) => (
  // ...
))}
```

### Update Next Class Time

Currently mock data (line ~123). To use real data:

```typescript
// Fetch from API
const classesResponse = await fetch(`/api/classes/next?userId=${userId}`)
const classData = await classesResponse.json()
const nextClassHours = calculateHoursUntil(classData.scheduledAt)
```

## Performance Tips

### Optimize Re-renders

- Use React.memo for heavy components
- Memoize expensive calculations with useMemo
- Use useCallback for event handlers

### Reduce Bundle Size

- Dynamic imports for heavy components
- Code splitting at route level
- Tree-shake unused Lucide icons

### Improve Load Time

- Implement skeleton UI (already done ✅)
- Use React Suspense for data fetching
- Add service worker for offline support

## Troubleshooting

### Dashboard Shows Empty State

**Problem:** No data displayed even after taking tests.
**Solution:** Check browser console for API errors. Verify userId/freeUserId is correct.

### Animations Stuttering

**Problem:** Animations not smooth.
**Solution:** Check device performance. Disable animations if needed with `prefers-reduced-motion`.

### Stats Not Updating

**Problem:** Stats don't refresh.
**Solution:** Data is fetched on mount only. Add refresh button or implement polling:

```typescript
// Add polling every 30 seconds
useEffect(() => {
  const interval = setInterval(() => {
    fetchDashboardData()
  }, 30000)
  return () => clearInterval(interval)
}, [user?.id, freeUserId])
```

### Mobile Layout Issues

**Problem:** Layout breaks on small screens.
**Solution:** Check Tailwind responsive classes. Use Chrome DevTools mobile view to debug.

## Testing

### Manual Testing Checklist

```bash
□ Load dashboard as guest user
□ Load dashboard as authenticated user
□ Verify all stats display correctly
□ Click all navigation links
□ Test on mobile (320px width)
□ Test on tablet (768px width)
□ Test on desktop (1024px+ width)
□ Check animations work smoothly
□ Verify empty state for new users
□ Test loading skeleton appearance
```

### Browser Testing

- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Code Style Guide

### TypeScript

- Use strict types, avoid `any`
- Define interfaces for data structures
- Use type inference where obvious

### Components

- Keep components small and focused
- Use functional components with hooks
- Extract reusable logic to custom hooks

### Styling

- Use Tailwind utility classes
- Use `cn()` helper for conditional classes
- Follow existing color scheme

### Naming

- Components: PascalCase
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE
- Interfaces: PascalCase with 'I' prefix optional

## Resources

### Related Files

- Analytics Dashboard: `/src/app/dashboard/student/page.tsx`
- Personalized Dashboard: `/src/components/dashboard/PersonalizedStudentDashboard.tsx`
- My Enrollments: `/src/components/student/MyEnrollments.tsx`

### External Documentation

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Support

For questions or issues:

1. Check this README
2. Review the main component code
3. Check related components in `/src/components/`
4. Consult TASK_001_COMPLETION.md for detailed implementation notes

---

**Last Updated:** 2025-10-29
**Maintainer:** Development Team
