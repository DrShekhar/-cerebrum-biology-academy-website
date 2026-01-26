# LCP Performance Fix Implementation Plan

## Executive Summary

This plan addresses the LCP (Largest Contentful Paint) issue affecting 54 URLs on mobile, where LCP exceeds 2.5 seconds. The root cause is heavy third-party embeds (YouTube iframes, Google Maps) loading synchronously and blocking the main thread.

**Expected improvement: 1-3 seconds reduction in LCP across all affected pages**

---

## Phase 1: Create Lazy Loading Components (Already Done ✅)

### 1.1 LazyVideo Component
- **File**: `src/components/performance/LazyVideo.tsx` ✅
- **Purpose**: Lazy load native video elements with poster image facade

### 1.2 LazyYouTubeEmbed Component
- **File**: `src/components/performance/LazyYouTubeEmbed.tsx` ✅
- **Purpose**: Facade pattern for YouTube - shows thumbnail, loads iframe on click

---

## Phase 2: Create LazyGoogleMap Component (New)

### 2.1 Create Component
- **File**: `src/components/performance/LazyGoogleMap.tsx`
- **Purpose**: Facade pattern for Google Maps - shows static map image, loads interactive map on click/hover

**Implementation approach:**
```tsx
// Shows a static Google Maps image initially
// On user interaction (click/hover), loads the full interactive iframe
// Uses Intersection Observer to preload when near viewport
```

**Key features:**
- Static map thumbnail from Google Static Maps API (or placeholder)
- "Click to interact" overlay
- Loads iframe only when user wants to interact
- Preserves all existing props (coordinates, title, etc.)

---

## Phase 3: Update YouTube Components

### 3.1 YouTubeChannel.tsx
- **File**: `src/components/media/YouTubeChannel.tsx`
- **Change**: Replace modal iframe with `LazyYouTubeEmbed`
- **Lines affected**: 314-325 (modal section)

**Before:**
```tsx
<iframe
  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
  ...
/>
```

**After:**
```tsx
<LazyYouTubeEmbed
  videoId={selectedVideo.id}
  title={selectedVideo.title}
  thumbnailUrl={selectedVideo.thumbnail}
  autoplay={true}
/>
```

### 3.2 RealStudentTestimonials.tsx
- **File**: `src/components/testimonials/RealStudentTestimonials.tsx`
- **Change**: Replace modal iframe with `LazyYouTubeEmbed`
- **Lines affected**: 234-245 (modal section)

**Before:**
```tsx
<iframe
  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
  ...
/>
```

**After:**
```tsx
<LazyYouTubeEmbed
  videoId={selectedVideo.youtubeId}
  title={`${selectedVideo.studentName} testimonial`}
  autoplay={true}
/>
```

---

## Phase 4: Update Video Components

### 4.1 AuthenticTestimonials.tsx
- **File**: `src/components/trust/AuthenticTestimonials.tsx`
- **Change**: Replace `<video autoPlay>` in modal with `LazyVideo`
- **Lines affected**: 413-418

**Before:**
```tsx
<video
  className="w-full rounded-xl"
  controls
  autoPlay
  src={testimonialData.find((t) => t.id === showVideo)?.videoUrl}
/>
```

**After:**
```tsx
<LazyVideo
  src={testimonialData.find((t) => t.id === showVideo)?.videoUrl || ''}
  poster={testimonialData.find((t) => t.id === showVideo)?.photoUrl || ''}
  controls
  autoPlay
  className="w-full rounded-xl"
/>
```

---

## Phase 5: Update Google Maps Embeds (13 Files)

### Strategy
Replace all direct `<iframe>` Google Maps embeds with the new `<LazyGoogleMap>` component.

### Files to Update

| # | File Path | Priority |
|---|-----------|----------|
| 1 | `src/app/neet-coaching-gurgaon/page.tsx` | HIGH (line ~680) |
| 2 | `src/app/neet-coaching-gurugram/page.tsx` | HIGH |
| 3 | `src/app/neet-coaching-noida/page.tsx` | HIGH |
| 4 | `src/app/neet-coaching-faridabad/page.tsx` | HIGH |
| 5 | `src/app/neet-coaching-rohini/page.tsx` | HIGH |
| 6 | `src/app/neet-coaching-south-delhi/PageContent.tsx` | HIGH |
| 7 | `src/app/locations/gurugram/GurugramLocationContent.tsx` | MEDIUM |
| 8 | `src/app/locations/green-park/page.tsx` | MEDIUM |
| 9 | `src/app/locations/south-extension/page.tsx` | MEDIUM |
| 10 | `src/app/locations/rohini/page.tsx` | MEDIUM |
| 11 | `src/app/locations/noida/page.tsx` | MEDIUM |
| 12 | `src/app/locations/faridabad/page.tsx` | MEDIUM |
| 13 | `src/app/contact/page.tsx` | HIGH |

### Example Transformation

**Before:**
```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18..."
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
```

**After:**
```tsx
<LazyGoogleMap
  embedUrl="https://www.google.com/maps/embed?pb=!1m18..."
  title="NEET Coaching Center Location"
  height={400}
  placeholder={{
    lat: 28.5696,
    lng: 77.2144,
    address: "South Extension, New Delhi"
  }}
/>
```

---

## Phase 6: Update Index Exports

### 6.1 Update Performance Components Index
- **File**: `src/components/performance/index.ts`
- **Change**: Add `LazyGoogleMap` export

---

## Implementation Order

1. **Create LazyGoogleMap.tsx** - New component
2. **Update YouTubeChannel.tsx** - HIGH impact, used on multiple pages
3. **Update RealStudentTestimonials.tsx** - Used on homepage
4. **Update AuthenticTestimonials.tsx** - Trust section
5. **Update HIGH priority map pages** (6 files)
6. **Update MEDIUM priority map pages** (7 files)
7. **Update index exports**
8. **Test build**

---

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Breaking existing functionality | Each component maintains same props interface |
| SEO impact | Schema markup preserved, thumbnail images indexed |
| User experience change | Clear "click to play/interact" affordances |
| Mobile performance | Components optimized for mobile-first |

---

## Verification Steps

After implementation:
1. Run `npm run build` to verify no type errors
2. Run Lighthouse audit on key pages
3. Check PageSpeed Insights for LCP metric
4. Monitor Google Search Console for Core Web Vitals improvement (24-48 hours)

---

## Files Changed Summary

### New Files (1)
- `src/components/performance/LazyGoogleMap.tsx`

### Modified Files (17)
- `src/components/performance/index.ts`
- `src/components/media/YouTubeChannel.tsx`
- `src/components/testimonials/RealStudentTestimonials.tsx`
- `src/components/trust/AuthenticTestimonials.tsx`
- `src/app/neet-coaching-gurgaon/page.tsx`
- `src/app/neet-coaching-gurugram/page.tsx`
- `src/app/neet-coaching-noida/page.tsx`
- `src/app/neet-coaching-faridabad/page.tsx`
- `src/app/neet-coaching-rohini/page.tsx`
- `src/app/neet-coaching-south-delhi/PageContent.tsx`
- `src/app/locations/gurugram/GurugramLocationContent.tsx`
- `src/app/locations/green-park/page.tsx`
- `src/app/locations/south-extension/page.tsx`
- `src/app/locations/rohini/page.tsx`
- `src/app/locations/noida/page.tsx`
- `src/app/locations/faridabad/page.tsx`
- `src/app/contact/page.tsx`

---

## Estimated Time

- Phase 2 (LazyGoogleMap): ~15 minutes
- Phase 3 (YouTube updates): ~10 minutes
- Phase 4 (Video updates): ~5 minutes
- Phase 5 (Maps updates): ~30 minutes
- Phase 6 (Exports): ~2 minutes
- Testing: ~10 minutes

**Total: ~1 hour 15 minutes**
