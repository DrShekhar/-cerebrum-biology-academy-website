# Mobile Optimization Guide

Complete mobile optimization for Cerebrum Biology Academy CRM with Progressive Web App (PWA) capabilities.

---

## Current Mobile Optimization Status

### ✅ Fully Implemented

1. **PWA Support**
   - Comprehensive `manifest.json` with app icons (72px to 512px)
   - App shortcuts for quick access
   - Offline capability flags
   - Installable on iOS and Android

2. **Mobile-Responsive Components**
   - Mobile navigation component
   - Responsive Tailwind CSS throughout
   - Touch-optimized buttons and inputs
   - Mobile viewport configuration

3. **Counselor CRM Mobile Features** (NEW)
   - `MobileLeadView` component with swipe gestures
   - `BottomSheet` modal for mobile UX
   - `MobileInstallPrompt` for app installation
   - Touch-friendly lead cards

4. **Mobile Meta Tags**
   - Viewport configuration for all devices
   - iOS-specific meta tags (apple-mobile-web-app-capable)
   - Android-specific tags (mobile-web-app-capable)
   - Theme color for browsers

---

## New Mobile Components

### 1. MobileLeadView Component

**Location**: `src/components/counselor/MobileLeadView.tsx`

**Features**:

- Swipeable lead cards with gestures:
  - Swipe right → Open WhatsApp
  - Swipe left → Make a call
  - Tap → View lead details
- Group leads by Stage or Priority
- Visual feedback for swipe actions
- Priority badges with color coding
- Follow-up date tracking
- Activity counts (communications, tasks)
- Fully touch-optimized

**Usage**:

```tsx
import { MobileLeadView } from '@/components/counselor/MobileLeadView'
;<MobileLeadView
  leads={filteredLeads}
  onLeadClick={(lead) => router.push(`/counselor/leads/${lead.id}`)}
  onWhatsAppClick={(lead) => window.open(`https://wa.me/${lead.phone}`)}
  onCallClick={(lead) => (window.location.href = `tel:${lead.phone}`)}
  onEmailClick={(lead) => (window.location.href = `mailto:${lead.email}`)}
/>
```

**Mobile UX Features**:

- Grouped list view (better than Kanban on mobile)
- Swipe gestures for common actions
- One-handed operation optimized
- Thumb-reach optimized button placement
- Visual hints for swipe actions
- Smooth animations with Framer Motion

---

### 2. BottomSheet Component

**Location**: `src/components/counselor/BottomSheet.tsx`

**Features**:

- Native app-like bottom sheet modal
- Drag handle for intuitive closing
- Swipe-down to dismiss
- Snap points for different heights
- Backdrop dimming
- Prevents body scroll when open
- Safe area padding for iOS

**Usage**:

```tsx
import { BottomSheet } from '@/components/counselor/BottomSheet'
;<BottomSheet
  isOpen={showDetails}
  onClose={() => setShowDetails(false)}
  title="Lead Details"
  snapPoints={[90, 50]} // 90% or 50% of screen height
  initialSnap={0}
>
  <div className="p-6">{/* Your content here */}</div>
</BottomSheet>
```

**When to Use**:

- Lead detail views on mobile
- Fee plan creation on small screens
- Task details and editing
- Any modal content on mobile devices

---

### 3. MobileInstallPrompt Component

**Location**: `src/components/counselor/MobileInstallPrompt.tsx`

**Features**:

- Detects if app is installable
- Shows prompt after 30 seconds of usage
- Respects user dismissal (7-day cooldown)
- Beautiful native-like install UI
- Lists app benefits:
  - Quick home screen access
  - Offline functionality
  - Push notifications
  - Faster than web version
- Automatic detection of already-installed state

**Usage**:

```tsx
// Add to counselor layout
import { MobileInstallPrompt } from '@/components/counselor/MobileInstallPrompt'
;<MobileInstallPrompt />
```

**Smart Behavior**:

- Only shows on mobile browsers
- Doesn't show if already installed
- Doesn't spam users (7-day cooldown after dismiss)
- Uses browser's native install event
- Tracks installation status

---

### 4. MobilePaymentView Component (NEW)

**Location**: `src/components/counselor/MobilePaymentView.tsx`

**Features**:

- Mobile-optimized payment/installment tracking
- Swipeable payment cards with gestures:
  - Swipe right → Mark as paid
  - Swipe left → Call student
  - Tap → View payment details
- Group payments by Status or Student
- Visual overdue indicators with border highlighting
- Payment statistics dashboard (total outstanding, overdue)
- Status filtering (All, Pending, Overdue, Paid)
- Reminder tracking display
- One-tap manual reminder sending
- Touch-optimized for one-handed operation

**Usage**:

```tsx
import { MobilePaymentView } from '@/components/counselor/MobilePaymentView'
;<MobilePaymentView
  payments={installments}
  onPaymentClick={(payment) => setSelectedPayment(payment)}
  onMarkAsPaid={(payment) => handleMarkAsPaid(payment)}
  onSendReminder={(payment) => handleSendReminder(payment)}
  onCallClick={(payment) => (window.location.href = `tel:${payment.feePlan.lead.phone}`)}
/>
```

**Mobile UX Features**:

- Gradient stats header showing total outstanding and overdue amounts
- Grouped list view by status or student
- Swipe gestures for quick payment actions
- Overdue highlighting with red border
- Days until/past due calculation
- Installment number tracking
- Payment reminder status display
- Empty state for no payments

**Payment Page**:

**Location**: `src/app/counselor/payments/page.tsx`

Complete mobile-responsive payments page with:

- Mobile/desktop view switching via useMediaQuery
- Status filter buttons (All/Pending/Overdue/Paid)
- Payment details bottom sheet on mobile
- Desktop grid view for larger screens
- Mark as paid functionality with transaction safety
- Send reminder integration with multi-channel support
- Loading and error states
- Real-time payment statistics

**API Endpoints**:

- GET `/api/counselor/payments` - Fetch all installments with filtering
- GET `/api/counselor/payments?status=OVERDUE` - Filter by status
- POST `/api/counselor/payments/[id]/mark-paid` - Mark installment as paid
- POST `/api/counselor/payments/reminders/send` - Send manual reminder

**Integration with Existing Services**:

- Leverages paymentReminderService for automation
- Uses BottomSheet for payment details on mobile
- Connects to existing notification system
- Transaction-safe payment operations with automatic enrollment

---

## Integration Guide

### Step 1: Update Counselor Leads Page

Add responsive view switching:

```tsx
'use client'

import { useState, useEffect } from 'react'
import { MobileLeadView } from '@/components/counselor/MobileLeadView'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const isMobile = useMediaQuery('(max-width: 768px)')

  // ... existing code ...

  return (
    <div>
      {/* Show mobile view on small screens */}
      {isMobile ? (
        <MobileLeadView
          leads={filteredLeads}
          onLeadClick={handleLeadClick}
          onWhatsAppClick={handleWhatsApp}
          onCallClick={handleCall}
          onEmailClick={handleEmail}
        />
      ) : (
        // Desktop Kanban view
        <DndContext {...dndProps}>{/* Existing drag-and-drop code */}</DndContext>
      )}
    </div>
  )
}
```

### Step 2: Add useMediaQuery Hook

Create `src/hooks/useMediaQuery.ts`:

```typescript
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}
```

### Step 3: Add Install Prompt to Layout

Update `src/app/counselor/layout.tsx`:

```tsx
import { MobileInstallPrompt } from '@/components/counselor/MobileInstallPrompt'

export default function CounselorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <MobileInstallPrompt />
    </div>
  )
}
```

### Step 4: Use BottomSheet for Modals

Replace centered modals with BottomSheet on mobile:

```tsx
import { BottomSheet } from '@/components/counselor/BottomSheet'
import { useMediaQuery } from '@/hooks/useMediaQuery'

function FeePlanModal() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <BottomSheet isOpen={isOpen} onClose={onClose} title="Create Fee Plan">
        {/* Fee plan form */}
      </BottomSheet>
    )
  }

  return <div className="fixed inset-0 flex items-center justify-center">{/* Desktop modal */}</div>
}
```

---

## Mobile Gestures

### Implemented Gestures

1. **Swipe Right (on lead card)**
   - Action: Open WhatsApp chat
   - Visual: Green background appears
   - Haptic: Vibration on action completion

2. **Swipe Left (on lead card)**
   - Action: Make phone call
   - Visual: Red background appears
   - Haptic: Vibration on action completion

3. **Swipe Down (on bottom sheet)**
   - Action: Close modal
   - Visual: Sheet follows finger
   - Haptic: Light vibration on dismiss

4. **Tap (on lead card)**
   - Action: View lead details
   - Visual: Card press animation

### Adding More Gestures

```tsx
// Example: Double-tap to mark as hot
<motion.div onTap={() => handleSingleTap()} onDoubleTap={() => markAsHot()}>
  {/* Card content */}
</motion.div>
```

---

## PWA Manifest Configuration

### Current Manifest (`public/manifest.json`)

```json
{
  "name": "Cerebrum Biology Academy - NEET Biology Excellence",
  "short_name": "Cerebrum Bio",
  "description": "India's leading Biology coaching for NEET",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2563eb",
  "orientation": "portrait-primary"
}
```

### App Shortcuts

4 quick actions available from home screen:

1. NEET Mock Tests
2. NEET Courses
3. AI Biology Tutor
4. Book Demo Class

### For Counselors (Add Custom Shortcuts)

Add to manifest.json:

```json
{
  "shortcuts": [
    {
      "name": "My Leads",
      "short_name": "Leads",
      "url": "/counselor/leads",
      "icons": [{ "src": "/icons/shortcut-leads.png", "sizes": "96x96" }]
    },
    {
      "name": "Today's Tasks",
      "short_name": "Tasks",
      "url": "/counselor/tasks?filter=today",
      "icons": [{ "src": "/icons/shortcut-tasks.png", "sizes": "96x96" }]
    }
  ]
}
```

---

## Offline Support

### Service Worker Implementation

We've implemented a comprehensive service worker with offline support for the counselor dashboard.

**Location**: `public/sw.js` (enhanced with counselor routes)

**Features**:

- Cache-first strategy for static assets (icons, images, fonts)
- Network-first strategy for API calls with offline fallback
- Stale-while-revalidate for pages
- IndexedDB queueing for offline actions
- Background sync for pending updates
- Counselor-specific route caching

**Cached Routes**:

```javascript
const CRITICAL_RESOURCES = [
  '/',
  '/counselor/leads',
  '/counselor/tasks',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]
```

### Offline Queue System

**Location**: `src/lib/offline/offlineQueue.ts`

Client-side utility for queuing actions when offline and syncing when connection is restored.

**Usage Example**:

```tsx
import { offlineQueue } from '@/lib/offline/offlineQueue'

async function updateLeadStage(leadId: string, newStage: string) {
  const action = {
    type: 'UPDATE_LEAD_STAGE',
    url: `/api/counselor/leads/${leadId}`,
    method: 'PATCH' as const,
    body: { stage: newStage },
    metadata: { leadId, newStage },
  }

  try {
    const response = await fetch(action.url, {
      method: action.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action.body),
    })

    if (!response.ok) throw new Error('Failed to update')
    return response.json()
  } catch (error) {
    if (!navigator.onLine) {
      await offlineQueue.queueAction(action)
      showToast('Offline: Changes will sync when you reconnect')
    } else {
      throw error
    }
  }
}
```

### Offline-First Data Strategy

1. **Read Operations**: Cache with stale-while-revalidate
   - Serve cached data immediately
   - Update cache in background
   - Display "offline" indicator if serving cached data

2. **Write Operations**: Queue when offline, sync when online
   - Store actions in IndexedDB
   - Automatic sync when connection restored
   - Conflict resolution on sync

3. **Background Sync**: Use Background Sync API for pending updates
   - Automatic retry on network restoration
   - Batch syncing for efficiency
   - Client notification on sync complete

### IndexedDB Queue

**Database**: `cerebrum-offline-db`
**Store**: `pending-actions`
**Indexes**: `type`, `timestamp`, `url`

**Queued Action Structure**:

```typescript
{
  id: number,           // Auto-incremented
  type: string,        // e.g., 'UPDATE_LEAD_STAGE', 'COMPLETE_TASK'
  url: string,         // API endpoint
  method: 'PATCH' | 'POST' | 'DELETE',
  body: any,           // Request payload
  headers: Record<string, string>,
  metadata: any,       // Additional context
  timestamp: number    // When queued
}
```

### Supported Offline Actions

1. **Lead Stage Updates**: Change lead status while offline
2. **Task Completion**: Mark tasks as complete offline
3. **Priority Changes**: Update lead priorities
4. **Follow-up Scheduling**: Set follow-up dates
5. **Notes Addition**: Add notes to leads

### Testing Offline Mode

1. Open Chrome DevTools → Application → Service Workers
2. Check "Offline" to simulate offline mode
3. Try updating a lead stage or completing a task
4. Observe queued action in console
5. Uncheck "Offline" to go back online
6. Service worker will automatically sync queued actions

### Monitoring Sync Status

```tsx
import { offlineQueue } from '@/lib/offline/offlineQueue'

// Listen for sync completion
offlineQueue.onSyncComplete((data) => {
  console.log('Sync completed:', data)
  showToast('All offline changes synced successfully!')
  refreshData()
})

// Check online status
const isOnline = offlineQueue.isOnline()

// Manually trigger sync
await offlineQueue.triggerSync()
```

---

## Mobile Performance Optimization

### Current Optimizations

1. **Lazy Loading**
   - Images load on scroll
   - Components code-split
   - Route-based chunking

2. **Touch Optimization**
   - 44x44px minimum touch targets
   - No hover-only interactions
   - Fast click responses (no 300ms delay)

3. **Animation Performance**
   - GPU-accelerated transforms
   - `will-change` for animations
   - RequestAnimationFrame for smooth scrolling

### Recommended Optimizations

```tsx
// Image optimization
import Image from 'next/image'
;<Image src="/lead-avatar.jpg" width={40} height={40} loading="lazy" placeholder="blur" />

// Component lazy loading
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,
})
```

---

## Testing Mobile Features

### Device Testing Checklist

- [ ] iPhone 14 Pro (iOS 17)
- [ ] Samsung Galaxy S23 (Android 14)
- [ ] iPad Pro 12.9" (iOS 17)
- [ ] OnePlus 11 (Android 13)

### Browser Testing

- [ ] Safari iOS
- [ ] Chrome Android
- [ ] Firefox Mobile
- [ ] Samsung Internet

### Feature Testing

- [ ] Install prompt appears after 30 seconds
- [ ] App installs successfully from prompt
- [ ] Swipe gestures work smoothly
- [ ] Bottom sheets open/close correctly
- [ ] No horizontal scroll on any page
- [ ] All buttons are thumb-reachable
- [ ] Forms work with mobile keyboards
- [ ] No layout shifts on input focus

### Performance Metrics

Target metrics on 4G:

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **TTI**: < 3.5s

---

## Mobile-Specific CSS

### Touch-Friendly Utilities

```css
/* Prevent text selection on touch */
.no-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* Smooth scrolling */
.smooth-scroll {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

/* Safe area padding for iOS notch */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

### Tailwind Mobile Utilities

```tsx
<div
  className="
  /* Mobile-first responsive classes */
  px-4           /* Mobile: 16px padding */
  sm:px-6        /* Tablet: 24px padding */
  lg:px-8        /* Desktop: 32px padding */

  /* Touch targets */
  min-h-[44px]   /* Minimum iOS touch target */
  min-w-[44px]

  /* Mobile typography */
  text-base      /* 16px on mobile (no zoom on input) */
  sm:text-lg     /* Larger on tablet */
"
>
  Mobile-optimized content
</div>
```

---

##Next Steps for Full Mobile Optimization

### Phase 1 (Completed)

- ✅ Mobile lead view with swipe gestures
- ✅ Bottom sheet component
- ✅ Install prompt
- ✅ PWA manifest configuration

### Phase 2 (Completed)

- ✅ Service worker for offline support
- ✅ Background sync for queued actions
- ✅ IndexedDB queue for offline actions
- ⏳ Push notification setup (pending)

### Phase 3 (In Progress)

- ✅ Mobile-optimized payment reminders UI
- 📋 Touch-friendly task management
- 📋 Mobile dashboard widgets
- 📋 Haptic feedback integration

### Phase 4 (Future)

- 📋 Native mobile app (React Native)
- 📋 Biometric authentication
- 📋 Mobile-specific analytics
- 📋 Voice commands integration

---

## Troubleshooting

### Common Issues

**1. Install prompt doesn't appear**

- Check HTTPS is enabled
- Verify manifest.json is valid
- Ensure service worker is registered
- Check browser console for errors

**2. Swipe gestures not working**

- Disable browser pull-to-refresh
- Check touch event listeners
- Verify Framer Motion is installed

**3. Bottom sheet janky**

- Use `transform` instead of `top/bottom`
- Enable hardware acceleration
- Reduce DOM complexity

**4. App doesn't work offline**

- Service worker not registered
- Cache strategy misconfigured
- API calls not being cached

---

## Best Practices

1. **Mobile-First Design**: Design for mobile, enhance for desktop
2. **Touch Targets**: Minimum 44x44px for all interactive elements
3. **Performance**: Keep bundle size < 200KB initial load
4. **Accessibility**: Support screen readers and voice control
5. **Testing**: Test on real devices, not just emulators

---

## Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Mobile UX Best Practices](https://developers.google.com/web/fundamentals/design-and-ux/principles)
- [Touch Gestures Guide](https://material.io/design/interaction/gestures.html)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

---

**Last Updated**: 11 November 2025
**Version**: 1.0.0
**Maintained by**: Cerebrum Biology Academy Development Team
