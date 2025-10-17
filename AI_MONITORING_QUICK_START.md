# AI Monitoring Dashboard - Quick Start Guide

## What Was Created

### 1. Main Dashboard Component

**File**: `/src/components/ai/AIMonitoringDashboard.tsx`

- Comprehensive AI monitoring interface
- Real-time metrics with auto-refresh (30 seconds)
- Admin-only access protection
- Mobile responsive design
- Data export capabilities (JSON/CSV)

### 2. Admin API Route

**File**: `/src/app/api/admin/ai-metrics/route.ts`

- Comprehensive metrics API for administrators
- Actions: dashboard, cost-breakdown, provider-performance, alerts, export, health-check
- Admin verification (needs integration with actual auth system)
- Budget management and alert handling

### 3. Admin Page

**File**: `/src/app/admin/ai-monitoring/page.tsx`

- Simple Next.js page wrapper
- SEO metadata configured
- Route: `/admin/ai-monitoring`

### 4. Documentation

**Files**:

- `AI_MONITORING_DASHBOARD.md` - Comprehensive documentation
- `AI_MONITORING_QUICK_START.md` - This file

## Quick Access

### View the Dashboard

```
URL: https://yourdomain.com/admin/ai-monitoring
```

### Requirements

- Admin role in the system
- Valid authentication session
- Working API endpoints (`/api/ai/performance`)

## Key Features Summary

### 1. Metrics Tracked

- ✅ Total AI requests (daily/weekly/monthly)
- ✅ Success rate and error rate
- ✅ Average response time (P50, P95, P99)
- ✅ Total cost and cost per request
- ✅ Cache hit rate and savings
- ✅ Provider health status
- ✅ Circuit breaker states
- ✅ Quality scores

### 2. Provider Monitoring

- **Anthropic (Claude)**: Health, requests, cost
- **OpenAI (GPT)**: Health, requests, cost
- **Google (Gemini)**: Health, requests, cost

### 3. Visualizations

- 📊 Metric cards with trend indicators
- 🥧 Provider cost distribution
- 📈 Hourly activity chart
- 📉 Response time bars
- 🎯 Error analysis table

### 4. Data Export

- JSON format for programmatic analysis
- CSV format for spreadsheet analysis
- Filtered exports by provider/date

### 5. Auto-Refresh

- Refreshes every 30 seconds (default on)
- Toggle on/off via UI
- Manual refresh button available

## Integration Points

### Existing AI Infrastructure

The dashboard integrates with:

1. `/lib/ai/performanceMonitor.ts` - Performance tracking
2. `/lib/ai/CostOptimizationDashboard.ts` - Cost tracking
3. `/lib/ai/gateway/PerformanceMonitor.ts` - Gateway metrics
4. `/lib/ai/gateway/CacheManager.ts` - Cache statistics
5. `/api/ai/performance` - Performance API endpoint

### Authentication

Uses the existing AuthContext:

```tsx
import { useAuth } from '@/contexts/AuthContext'

const { user, hasRole } = useAuth()
const isAdmin = hasRole('ADMIN')
```

## Next Steps

### 1. Test the Dashboard

```bash
# Start development server
npm run dev

# Navigate to
http://localhost:3000/admin/ai-monitoring
```

### 2. Verify API Endpoints

```bash
# Test performance API
curl http://localhost:3000/api/ai/performance?action=stats

# Test admin metrics API (requires auth)
curl http://localhost:3000/api/admin/ai-metrics?action=dashboard
```

### 3. Customize (Optional)

- Update budget thresholds in `CostOptimizationDashboard.ts`
- Modify refresh interval (default: 30 seconds)
- Adjust color schemes in component
- Add custom metrics or charts

### 4. Production Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## API Endpoints Reference

### Performance API (`/api/ai/performance`)

```
GET ?action=stats        - Full statistics
GET ?action=realtime     - Real-time metrics
GET ?action=export       - Export metrics
POST action=cleanup      - Clean up old data
POST action=reset        - Reset all metrics
```

### Admin Metrics API (`/api/admin/ai-metrics`)

```
GET ?action=dashboard            - Dashboard data
GET ?action=cost-breakdown       - Cost analysis
GET ?action=provider-performance - Provider metrics
GET ?action=alerts               - Active alerts
GET ?action=export               - Export data
GET ?action=health-check         - System health
POST action=acknowledge-alert    - Acknowledge alert
POST action=update-budget        - Update budget
POST action=reset-metrics        - Reset metrics
POST action=cleanup              - Cleanup data
```

## Time Range Filters

The dashboard supports three time ranges:

- **Today**: Current day metrics
- **Week**: Last 7 days
- **Month**: Last 30 days

Toggle between them using the buttons in the header.

## Color-Coded Indicators

### Health Status

- 🟢 Green: Healthy, operational
- 🔴 Red: Degraded, issues detected

### Performance

- 🟢 Green: < 500ms (excellent)
- 🟡 Yellow: 500-1000ms (moderate)
- 🔴 Red: > 1000ms (poor)

### Circuit Breaker

- 🟢 Closed: Active, accepting requests
- 🟡 Half-Open: Testing, limited requests
- 🔴 Open: Tripped, blocking requests

## Metrics Explained

### Total Requests

Number of AI requests in selected time range

- Daily: Requests today
- Weekly: Requests this week
- Monthly: Requests this month

### Total Cost

Cumulative cost across all AI providers

- Includes cached and fresh requests
- Provider breakdown available
- Cost per request calculated

### Cache Hit Rate

Percentage of requests served from cache

- L1: In-memory (5 min TTL)
- L2: Redis short-term (30 min TTL)
- L3: Redis long-term (24 hr TTL)
- Higher is better (cost savings)

### Response Time

AI request processing time

- P50: Median (typical)
- P95: 95th percentile
- P99: 99th percentile
- Lower is better

### Success Rate

Percentage of successful requests

- Green: > 95%
- Yellow: 90-95%
- Red: < 90%

### Quality Score

AI response quality assessment

- Based on educational value
- Biology-specific metrics
- Trend tracking (improving/stable/declining)

## Troubleshooting

### Dashboard Not Loading

1. Check admin role: `hasRole('ADMIN')`
2. Verify API endpoint: `/api/ai/performance`
3. Check browser console for errors
4. Ensure Redis is running

### Metrics Show Zero

1. Generate some AI requests first
2. Check `performanceMonitor.getStats()`
3. Verify data is being tracked
4. Check time range filter

### Export Not Working

1. Check browser download permissions
2. Verify API returns data
3. Check network tab for errors
4. Ensure data exists for filter

### Auto-Refresh Not Working

1. Check toggle is enabled (green)
2. Verify no JavaScript errors
3. Check network connectivity
4. Refresh interval is 30 seconds

## Best Practices

### Monitoring

- Check dashboard daily
- Review cost trends weekly
- Optimize based on recommendations
- Set up budget alerts

### Performance

- Aim for > 70% cache hit rate
- Keep P95 latency < 1000ms
- Maintain > 95% success rate
- Monitor error patterns

### Cost Optimization

- Use cheaper models for simple tasks
- Increase cache TTL for stable content
- Batch similar requests
- Monitor provider costs

### Maintenance

- Export data monthly for analysis
- Clean up old metrics regularly
- Review and acknowledge alerts
- Update budget thresholds

## Support

For issues or questions:

- **Email**: admin@cerebrumbiologyacademy.com
- **Phone**: +91 88264 44334
- **Docs**: AI_MONITORING_DASHBOARD.md

## Version History

- **v1.0.0** (2024-10-17): Initial release
  - Dashboard component
  - Admin API routes
  - Comprehensive documentation

---

**Ready to Use!** Navigate to `/admin/ai-monitoring` to start monitoring your AI infrastructure.
