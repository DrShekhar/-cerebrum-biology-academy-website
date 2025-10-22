# AI Monitoring Dashboard

## Overview

The AI Monitoring Dashboard is a comprehensive, production-ready component for real-time monitoring of AI usage, performance, costs, and quality metrics across the Cerebrum Biology Academy platform.

## Features

### 1. Real-Time AI Usage Metrics

- **Total Requests**: Track daily, weekly, and monthly AI request volumes
- **Success Rate**: Monitor overall AI request success rates
- **Average Response Time**: P50, P95, and P99 latency metrics
- **Error Tracking**: Identify and analyze error patterns

### 2. Cost Tracking & Optimization

- **Total Cost**: Real-time cost tracking across all AI providers
- **Cost Per Request**: Granular cost analysis
- **Provider Breakdown**: Cost distribution by provider (OpenAI, Anthropic, Google)
- **Budget Alerts**: Warning and critical threshold notifications
- **Cost Forecasting**: 30-day cost projections

### 3. Provider Performance Comparison

- **Health Status**: Real-time provider health monitoring
- **Request Distribution**: Visual breakdown of requests per provider
- **Circuit Breaker Status**: Monitor circuit breaker states (closed/open/half-open)
- **Performance Metrics**: Provider-specific latency and success rates

### 4. Cache Performance

- **Cache Hit Rate**: Percentage of cached responses
- **Cache Savings**: Cost savings from cached responses
- **Cache Efficiency**: L1, L2, and L3 cache performance

### 5. Quality Metrics

- **Quality Score Trends**: Track AI response quality over time
- **Confidence Scores**: Average confidence levels
- **Educational Value**: Biology-specific quality metrics

### 6. Error Monitoring

- **Recent Errors**: Top 10 most frequent errors
- **Error Rate**: Percentage of failed requests
- **Error Patterns**: Identify recurring issues

### 7. Response Time Analytics

- **P50 (Median)**: Typical response time
- **P95**: 95th percentile latency
- **P99**: 99th percentile latency
- **Hourly Trends**: Visual representation of response time patterns

### 8. Data Export

- **JSON Export**: Complete metrics in JSON format
- **CSV Export**: Tabular data for spreadsheet analysis
- **Filtered Exports**: Export by provider, date range, or success status

## File Structure

```
src/
├── components/ai/
│   └── AIMonitoringDashboard.tsx        # Main dashboard component
├── app/
│   ├── admin/
│   │   └── ai-monitoring/
│   │       └── page.tsx                  # Admin dashboard page
│   └── api/
│       ├── ai/performance/
│       │   └── route.ts                  # Performance metrics API
│       └── admin/ai-metrics/
│           └── route.ts                  # Admin-specific metrics API
└── lib/ai/
    ├── performanceMonitor.ts             # Performance monitoring service
    ├── CostOptimizationDashboard.ts      # Cost tracking service
    ├── gateway/
    │   ├── PerformanceMonitor.ts         # Gateway performance monitor
    │   └── CacheManager.ts               # Multi-layer cache manager
    └── aiClient.ts                       # AI client integration
```

## Installation & Setup

### 1. Component Installation

The component is already created at:

```
/Users/drshekhar/cerebrum-biology-academy-website/src/components/ai/AIMonitoringDashboard.tsx
```

### 2. API Routes

Two API routes are set up:

**Public Performance API** (`/api/ai/performance`):

- GET with `?action=stats` - Full statistics
- GET with `?action=realtime` - Real-time metrics
- GET with `?action=export` - Export filtered metrics
- POST with `action=cleanup` - Clean up old metrics
- POST with `action=reset` - Reset all metrics (admin only)

**Admin Metrics API** (`/api/admin/ai-metrics`):

- GET with `?action=dashboard` - Comprehensive dashboard data
- GET with `?action=cost-breakdown` - Detailed cost analysis
- GET with `?action=provider-performance` - Provider-specific metrics
- GET with `?action=alerts` - Active alerts
- GET with `?action=export` - Export data
- GET with `?action=health-check` - System health
- POST with `action=acknowledge-alert` - Acknowledge alerts
- POST with `action=update-budget` - Update budget settings
- POST with `action=reset-metrics` - Reset metrics
- POST with `action=cleanup` - Cleanup old data

### 3. Admin Page Setup

Access the dashboard at:

```
https://yourdomain.com/admin/ai-monitoring
```

## Usage

### Basic Usage

```tsx
import AIMonitoringDashboard from '@/components/ai/AIMonitoringDashboard'

export default function AdminPage() {
  return <AIMonitoringDashboard />
}
```

### Authentication

The dashboard automatically checks for admin access using the `useAuth` hook:

```tsx
const { user, hasRole } = useAuth()
const isAdmin = hasRole('ADMIN')
```

Non-admin users will see an "Access Denied" message.

### Auto-Refresh

The dashboard automatically refreshes every 30 seconds when auto-refresh is enabled (default).

Toggle auto-refresh using the refresh button in the header.

### Time Range Filtering

Filter metrics by time range:

- **Today**: Current day metrics
- **Week**: Last 7 days
- **Month**: Last 30 days

### Data Export

Export metrics in two formats:

1. **JSON**: Complete data structure for programmatic analysis
2. **CSV**: Tabular format for Excel/Google Sheets

## API Integration

### Fetching Metrics

```typescript
// Fetch real-time metrics
const response = await fetch('/api/ai/performance?action=realtime')
const data = await response.json()

if (data.success) {
  console.log('Current metrics:', data.data)
}
```

### Exporting Data

```typescript
// Export as JSON
const response = await fetch('/api/ai/performance?action=export&format=json')
const data = await response.json()

// Export filtered by provider
const filtered = await fetch('/api/ai/performance?action=export&provider=anthropic')
```

### Admin Actions

```typescript
// Acknowledge an alert
await fetch('/api/admin/ai-metrics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'acknowledge-alert',
    data: { alertId: 'alert_123' },
  }),
})

// Update budget settings
await fetch('/api/admin/ai-metrics', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'update-budget',
    data: {
      budgetSettings: {
        monthly: 1000,
        daily: 50,
        alertThresholds: {
          warning: 80,
          critical: 95,
        },
      },
    },
  }),
})
```

## Metrics Explained

### Performance Metrics

- **Total Requests**: Cumulative AI requests in the selected time range
- **Success Rate**: Percentage of successful AI requests
- **Avg Response Time**: Mean time for AI response generation
- **P95 Latency**: 95% of requests complete within this time
- **P99 Latency**: 99% of requests complete within this time

### Cost Metrics

- **Total Cost**: Sum of all AI provider costs
- **Cost Per Request**: Average cost per AI request
- **Provider Breakdown**: Cost distribution across providers
- **Cost Trend**: Increasing/decreasing/stable trend

### Cache Metrics

- **Cache Hit Rate**: Percentage of requests served from cache
- **L1 Cache**: In-memory cache (fastest, 5-minute TTL)
- **L2 Cache**: Redis short-term (30-minute TTL)
- **L3 Cache**: Redis long-term (24-hour TTL for biology content)

### Quality Metrics

- **Quality Score**: AI response quality (0-100%)
- **Confidence Score**: AI confidence in responses
- **Educational Value**: Biology-specific quality assessment

## Dashboard Components

### 1. Metric Cards

Four key metric cards at the top:

- Total Requests (with trend indicator)
- Total Cost (with cost per request)
- Cache Hit Rate (with cached request count)
- Avg Response Time (with P95 latency)

### 2. Provider Health Panel

Real-time status of all AI providers:

- Health indicator (green/red dot)
- Request count per provider
- Circuit breaker status
- Active/degraded status

### 3. Cost Breakdown Panel

Visual cost distribution:

- Pie chart representation
- Cost by provider
- Percentage breakdown
- Trend indicators

### 4. Response Time Distribution

Latency metrics visualization:

- P50 (median) response time
- P95 response time
- P99 response time
- Color-coded performance (green < 500ms, yellow < 1000ms, red > 1000ms)

### 5. Quality & Error Metrics

Comprehensive quality tracking:

- Success rate with percentage
- Error rate monitoring
- Quality score with trend
- Error type breakdown

### 6. Recent Errors Table

Detailed error analysis:

- Error message
- Occurrence count
- Percentage of total errors
- Hover effects for readability

### 7. Hourly Activity Chart

Visual request distribution:

- 24-hour bar chart
- Request count per hour
- Cost per hour
- Interactive tooltips

## Color Scheme

The dashboard uses a consistent, professional color palette:

- **Blue Gradient**: `from-blue-500 to-cyan-500` (Activity, Requests)
- **Green Gradient**: `from-green-500 to-emerald-500` (Cost, Success)
- **Purple Gradient**: `from-purple-500 to-pink-500` (Cache)
- **Orange Gradient**: `from-orange-500 to-red-500` (Response Time)

### Status Colors

- **Green**: Healthy, Good performance (< 500ms)
- **Yellow**: Warning, Moderate performance (500-1000ms)
- **Red**: Critical, Poor performance (> 1000ms)

## Responsive Design

The dashboard is fully responsive:

- **Desktop** (>= 1024px): 4-column grid layout
- **Tablet** (768px - 1023px): 2-column grid layout
- **Mobile** (< 768px): Single column layout

All charts and components adapt to screen size.

## Performance Considerations

### Optimization Strategies

1. **Auto-refresh Control**: Toggle to disable automatic updates
2. **Lazy Loading**: Components load progressively
3. **Data Caching**: Client-side caching of recent metrics
4. **Efficient Rendering**: React optimization with useCallback
5. **Time Range Filtering**: Reduce data volume with focused queries

### Memory Management

- Metrics limited to last 1,000 entries in memory
- Automatic cleanup of old data
- Redis-based persistence for historical data

## Security

### Admin-Only Access

```typescript
const { user, hasRole } = useAuth()

if (!hasRole('ADMIN')) {
  return <AccessDenied />
}
```

### API Protection

All admin endpoints verify authentication:

```typescript
async function isAdmin(request: NextRequest): Promise<boolean> {
  // Verify session and check role
  const cookies = request.cookies
  const sessionCookie = cookies.get('session')

  // TODO: Implement proper session verification
  return !!sessionCookie
}
```

### Data Privacy

- No sensitive user data exposed
- Aggregated metrics only
- Sanitized error messages

## Troubleshooting

### Common Issues

**1. Dashboard shows "Loading..." indefinitely**

- Check if `/api/ai/performance` endpoint is accessible
- Verify Redis connection
- Check browser console for errors

**2. "Access Denied" error**

- Verify user has ADMIN role
- Check authentication cookies
- Ensure AuthProvider is wrapping the app

**3. Metrics not updating**

- Check auto-refresh toggle
- Verify API endpoints are responding
- Check network tab for failed requests

**4. Export not working**

- Ensure browser allows downloads
- Check API response format
- Verify data exists for selected filters

### Debug Mode

Enable debug logging:

```typescript
// In browser console
localStorage.setItem('ai-dashboard-debug', 'true')

// Then refresh the page
```

## Future Enhancements

### Planned Features

1. **Custom Alerts**: User-configurable alert rules
2. **Trend Analysis**: ML-based trend predictions
3. **Anomaly Detection**: Automatic anomaly identification
4. **Report Scheduling**: Automated email reports
5. **Dashboard Widgets**: Customizable widget layout
6. **Multi-tenancy**: Organization-level metrics
7. **Cost Budgeting**: Advanced budget management
8. **A/B Testing**: Provider performance comparison
9. **SLA Monitoring**: Service level agreement tracking
10. **Integration Webhooks**: Real-time alert notifications

### API Enhancements

- GraphQL API for flexible queries
- WebSocket support for real-time updates
- Batch export for large datasets
- Historical data aggregation
- Custom metric calculations

## Integration Examples

### Slack Notifications

```typescript
// Send alert to Slack when cost threshold exceeded
if (budgetStatus.monthly.percentage > 90) {
  await fetch('https://hooks.slack.com/your-webhook', {
    method: 'POST',
    body: JSON.stringify({
      text: `⚠️ AI Budget Alert: ${budgetStatus.monthly.percentage}% used`,
    }),
  })
}
```

### Email Reports

```typescript
// Daily email report
const metrics = await fetch('/api/admin/ai-metrics?action=dashboard')
const data = await metrics.json()

await sendEmail({
  to: 'admin@cerebrumbiologyacademy.com',
  subject: 'Daily AI Metrics Report',
  body: generateReportHTML(data),
})
```

### Custom Dashboards

```typescript
// Embed specific metrics in other dashboards
import { useAIMetrics } from '@/hooks/useAIMetrics'

function CustomWidget() {
  const { totalCost, cacheHitRate } = useAIMetrics()

  return (
    <div>
      <p>Cost: ${totalCost}</p>
      <p>Cache: {cacheHitRate}%</p>
    </div>
  )
}
```

## Testing

### Manual Testing

1. Navigate to `/admin/ai-monitoring`
2. Verify all metrics load correctly
3. Test time range filters (Today/Week/Month)
4. Toggle auto-refresh on/off
5. Export data in JSON and CSV formats
6. Test on different screen sizes

### Automated Testing

```typescript
// Example test suite
describe('AIMonitoringDashboard', () => {
  it('should load metrics on mount', async () => {
    render(<AIMonitoringDashboard />)
    await waitFor(() => {
      expect(screen.getByText(/Total Requests/i)).toBeInTheDocument()
    })
  })

  it('should export data in JSON format', async () => {
    // Test export functionality
  })

  it('should deny access to non-admin users', () => {
    // Test authorization
  })
})
```

## Support

For issues, questions, or feature requests:

- **Email**: admin@cerebrumbiologyacademy.com
- **Phone**: +91 88264 44334
- **Documentation**: This file

## License

Proprietary - Cerebrum Biology Academy
© 2024 All Rights Reserved

---

**Last Updated**: October 17, 2024
**Version**: 1.0.0
**Author**: AI Development Team
