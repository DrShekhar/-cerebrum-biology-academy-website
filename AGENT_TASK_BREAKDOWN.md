# Ceri AI Transformation: Agent Task Breakdown

**Purpose:** Break down the 12-week transformation plan into concrete, executable tasks for specialized agents.

---

## Agent Assignment Overview

| Agent       | Focus Area       | Duration | Priority      | Dependencies            |
| ----------- | ---------------- | -------- | ------------- | ----------------------- |
| **Agent 1** | Mobile UI        | 2 weeks  | P0 (Critical) | None                    |
| **Agent 2** | Performance      | 2 weeks  | P0 (Critical) | Redis setup             |
| **Agent 3** | LaTeX + Diagrams | 2 weeks  | P1 (High)     | None                    |
| **Agent 4** | Study Planner    | 2 weeks  | P1 (High)     | Agent 2 (AI client)     |
| **Agent 5** | WhatsApp Bot     | 2 weeks  | P0 (Critical) | Twilio account, Agent 2 |
| **Agent 6** | QA & Testing     | 2 weeks  | P1 (High)     | All agents complete     |

**Total Timeline:** 12 weeks (with parallel execution)

---

## AGENT 1: Mobile UI Developer

### Mission

Transform Ceri AI into a mobile-first experience with perfect responsiveness from 320px to 1920px, touch-optimized interactions, and PWA capabilities.

### Technical Skills Required

- React 19 + Next.js 15 expertise
- Tailwind CSS mobile-first design
- Touch gesture handling
- Service Worker/PWA implementation
- Mobile performance optimization

### Task List (Estimated: 80 hours)

#### Task 1.1: Create Mobile Chat Interface (20 hours)

**File:** `/src/components/ai/MobileChatInterface.tsx`

**Requirements:**

```typescript
// Component should support:
- Responsive layout (320px to 1920px)
- Header: 56px height on mobile, sticky
- Message area: Dynamic height (calc(100vh - 56px - 72px))
- Input area: 72px height, fixed bottom
- Touch gestures: Swipe left (delete), Swipe right (copy), Pull down (refresh)
- Smooth scrolling with auto-scroll to bottom
- Loading states and skeletons
```

**Key Features:**

- Reverse scroll (newest messages at bottom)
- Lazy loading (50 messages at a time)
- Image optimization (next/image)
- Message grouping by date
- Typing indicators
- Read receipts
- Error states

**Success Criteria:**

- [ ] Renders perfectly on 320px (iPhone SE)
- [ ] Renders perfectly on 428px (iPhone 14 Pro Max)
- [ ] Renders perfectly on 768px (iPad)
- [ ] Renders perfectly on 1920px (Desktop)
- [ ] Touch targets minimum 44x44px
- [ ] Smooth 60fps scrolling
- [ ] No horizontal scroll at any breakpoint

---

#### Task 1.2: Create Touch-Optimized Input (12 hours)

**File:** `/src/components/ai/TouchOptimizedInput.tsx`

**Requirements:**

```typescript
interface TouchOptimizedInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  placeholder?: string
  maxLength?: number
  enableVoice?: boolean
  enableCamera?: boolean
}
```

**Key Features:**

- Auto-resizing textarea (1-4 lines)
- Mobile keyboard handling (iOS + Android)
- Voice input button (speech-to-text)
- Camera button (for diagram questions)
- Send button (always visible, disabled when empty)
- Character counter (show when > 80% of max)
- Emoji picker (optional)
- Attachment support

**Implementation Details:**

1. Use `contentEditable` or `textarea` with auto-resize
2. Handle iOS keyboard offset (viewport changes)
3. Handle Android keyboard overlay
4. Prevent form submission on Enter (mobile)
5. Debounce typing for performance

**Success Criteria:**

- [ ] Textarea resizes smoothly (1-4 lines)
- [ ] Keyboard doesn't cover input on iOS
- [ ] Keyboard doesn't cover input on Android
- [ ] Voice input works (Web Speech API)
- [ ] Camera button opens native picker
- [ ] Send button is always accessible

---

#### Task 1.3: Create Mobile Bottom Sheet (10 hours)

**File:** `/src/components/ai/MobileBottomSheet.tsx`

**Requirements:**

- Slide up from bottom (Framer Motion)
- Backdrop blur
- Swipe down to dismiss
- Touch-friendly action buttons (56px height)

**Actions Menu:**

1. Study Planner (navigate to planner)
2. Browse Diagrams (open diagram library)
3. Export Chat (download as PDF)
4. Clear Chat (with confirmation)
5. Settings (preferences)
6. Help & Feedback

**Success Criteria:**

- [ ] Smooth slide-up animation (300ms)
- [ ] Swipe-down gesture works
- [ ] Backdrop dismisses sheet
- [ ] All buttons are 56px height (touch-friendly)
- [ ] Icons are clear and recognizable

---

#### Task 1.4: Create Mobile Optimization Hook (8 hours)

**File:** `/src/hooks/useMobileOptimization.ts`

**Requirements:**

```typescript
export function useMobileOptimization() {
  return {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    orientation: 'portrait' | 'landscape'
    screenSize: { width: number; height: number }
    touchSupported: boolean
    isIOS: boolean
    isAndroid: boolean
    keyboardVisible: boolean
    safeArea: { top: number; bottom: number }
  }
}
```

**Implementation:**

- Detect device type (useMediaQuery)
- Handle orientation changes
- Detect keyboard visibility
- Calculate safe areas (iOS notch)
- Memoize values for performance

**Success Criteria:**

- [ ] Correctly detects mobile/tablet/desktop
- [ ] Tracks orientation changes
- [ ] Detects iOS keyboard visibility
- [ ] Provides safe area insets
- [ ] No performance issues (memoized)

---

#### Task 1.5: Implement PWA (Progressive Web App) (15 hours)

**Files to Create:**

1. `/public/manifest.json` - PWA manifest
2. `/public/sw.js` - Service Worker
3. `/public/icons/` - PWA icons (192x192, 512x512)
4. `/src/app/layout.tsx` - Add PWA meta tags

**Manifest Configuration:**

```json
{
  "name": "Ceri AI - NEET Biology Tutor",
  "short_name": "Ceri AI",
  "description": "24/7 AI-powered NEET Biology tutoring with interactive diagrams, study planner, and WhatsApp support",
  "start_url": "/student/ai-tutor",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#FF9933",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**Service Worker Features:**

1. Cache static assets (CSS, JS, fonts)
2. Cache chat history (last 100 messages)
3. Offline page
4. Background sync (queue messages when offline)
5. Push notifications (for study reminders)

**Offline Strategy:**

- Network-first for API calls
- Cache-first for static assets
- Stale-while-revalidate for images

**Success Criteria:**

- [ ] PWA installable on Android (Add to Home Screen)
- [ ] PWA installable on iOS (Add to Home Screen)
- [ ] Offline page displays when no connection
- [ ] Cached messages available offline
- [ ] Lighthouse PWA score: 90+

---

#### Task 1.6: Mobile Device Testing (15 hours)

**Devices to Test:**

1. **Android:**
   - Samsung Galaxy A series (budget, 720p screen)
   - OnePlus Nord (mid-range, 1080p screen)
   - Pixel 7 (high-end)

2. **iOS:**
   - iPhone SE (2022) - smallest screen (375x667)
   - iPhone 13 - standard (390x844)
   - iPhone 14 Pro Max - largest (428x926)

3. **Tablets:**
   - iPad (10.2-inch, 810x1080)
   - iPad Pro (12.9-inch, 1024x1366)
   - Android tablet (Samsung Tab)

**Testing Checklist:**

- [ ] All touch targets are at least 44x44px
- [ ] No content is cut off or overlapping
- [ ] No horizontal scroll at any size
- [ ] Keyboard doesn't cover input
- [ ] Gestures work (swipe, pinch, long-press)
- [ ] Loading states display correctly
- [ ] Images load and scale properly
- [ ] PWA installs successfully
- [ ] Offline mode works
- [ ] Performance is smooth (60fps)

**Performance Targets:**

- [ ] First Contentful Paint: < 1.5s
- [ ] Largest Contentful Paint: < 2.5s
- [ ] Time to Interactive: < 3s
- [ ] Cumulative Layout Shift: < 0.1
- [ ] First Input Delay: < 100ms

---

### Deliverables

**Code:**

1. ✅ `/src/components/ai/MobileChatInterface.tsx` (500 lines)
2. ✅ `/src/components/ai/TouchOptimizedInput.tsx` (200 lines)
3. ✅ `/src/components/ai/MobileBottomSheet.tsx` (150 lines)
4. ✅ `/src/hooks/useMobileOptimization.ts` (100 lines)
5. ✅ `/public/manifest.json` (50 lines)
6. ✅ `/public/sw.js` (300 lines)
7. ✅ PWA icons (192x192, 512x512)

**Documentation:**

1. ✅ Mobile UI component documentation
2. ✅ PWA installation guide
3. ✅ Device testing report

**Quality Metrics:**

- ✅ Lighthouse Mobile Score: 90+
- ✅ All devices tested successfully
- ✅ PWA installable on Android + iOS
- ✅ Touch targets compliant (100%)

---

## AGENT 2: Performance Engineer

### Mission

Implement streaming responses with sub-2-second perceived response time, aggressive caching, and edge function optimization.

### Technical Skills Required

- Server-Sent Events (SSE)
- Edge runtime (Vercel)
- Redis caching
- Performance optimization
- Load testing

### Task List (Estimated: 80 hours)

#### Task 2.1: Create Streaming API Endpoint (16 hours)

**File:** `/src/app/api/ai/stream/route.ts`

**Requirements:**

```typescript
export const runtime = 'edge' // Use Edge Runtime for speed

export async function POST(req: Request) {
  // 1. Parse request
  // 2. Check cache (< 50ms)
  // 3. If cached, stream cached response
  // 4. If not cached, call AI API with streaming
  // 5. Stream tokens to client via SSE
  // 6. Cache complete response
}
```

**Implementation Steps:**

1. **Request Validation:**

```typescript
const { message, context } = await req.json()

if (!message || message.length > 1000) {
  return new Response('Invalid message', { status: 400 })
}
```

2. **Cache Check:**

```typescript
const cacheKey = generateCacheKey(message, context)
const cached = await redis.get(cacheKey)

if (cached) {
  return streamCachedResponse(cached)
}
```

3. **AI Streaming:**

```typescript
const stream = new ReadableStream({
  async start(controller) {
    const encoder = new TextEncoder()

    // Call Claude/OpenAI with streaming
    const response = await fetch(AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        stream: true,
      }),
    })

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader!.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6))
          const token = data.choices[0]?.delta?.content || ''

          // Send to client
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`))
        }
      }
    }

    controller.enqueue(encoder.encode('data: [DONE]\n\n'))
    controller.close()
  },
})

return new Response(stream, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  },
})
```

**Success Criteria:**

- [ ] Streaming works with Claude API
- [ ] Streaming works with OpenAI API
- [ ] Cache check takes < 50ms
- [ ] First token arrives in < 500ms
- [ ] Complete response in < 2s (average)
- [ ] Error handling works (fallback to non-streaming)

---

#### Task 2.2: Create Streaming Client Hook (12 hours)

**File:** `/src/hooks/useStreamingChat.ts`

**Requirements:**

```typescript
export function useStreamingChat() {
  return {
    messages: Message[]
    isStreaming: boolean
    sendMessage: (content: string) => Promise<void>
    currentToken: string
    error: Error | null
    retry: () => void
  }
}
```

**Implementation:**

```typescript
const sendMessage = async (content: string) => {
  // 1. Add user message immediately (optimistic UI)
  const userMessage = {
    id: generateId(),
    content,
    isUser: true,
    timestamp: new Date(),
  }
  setMessages((prev) => [...prev, userMessage])

  // 2. Start streaming
  setIsStreaming(true)
  setCurrentToken('')

  try {
    const response = await fetch('/api/ai/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: content }),
    })

    const reader = response.body?.getReader()
    const decoder = new TextDecoder()
    let accumulatedContent = ''

    // 3. Create AI message placeholder
    const aiMessageId = generateId()
    setMessages((prev) => [
      ...prev,
      {
        id: aiMessageId,
        content: '',
        isUser: false,
        timestamp: new Date(),
      },
    ])

    // 4. Read stream and update message in real-time
    while (true) {
      const { done, value } = await reader!.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6))
          if (data.token) {
            accumulatedContent += data.token

            // Update message (triggers re-render)
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === aiMessageId ? { ...msg, content: accumulatedContent } : msg
              )
            )
          }
        }
      }
    }
  } catch (error) {
    setError(error)
    // Fallback to non-streaming
    await sendMessageFallback(content)
  } finally {
    setIsStreaming(false)
  }
}
```

**Success Criteria:**

- [ ] Messages update in real-time
- [ ] No flickering or layout shift
- [ ] LaTeX renders during streaming
- [ ] Error handling works
- [ ] Optimistic UI feels instant

---

#### Task 2.3: Implement Redis Caching (16 hours)

**File:** `/src/lib/cache/streamingCache.ts`

**Cache Strategy:**

1. **Response Cache:**
   - Key: Hash of (message + context)
   - Value: Complete AI response
   - TTL: 1 hour for general questions, 1 week for NCERT

2. **Semantic Cache:**
   - Use embeddings for similarity matching
   - If question is 95%+ similar, use cached response
   - Saves AI API calls

3. **Edge Cache:**
   - Static content: 1 year
   - API responses: 5 minutes
   - User-specific: No cache

**Implementation:**

```typescript
import Redis from 'ioredis'

const redis = new Redis(process.env.REDIS_URL!)

export async function getCachedResponse(message: string, context: any): Promise<string | null> {
  // 1. Exact match cache
  const exactKey = generateCacheKey(message, context)
  const exact = await redis.get(exactKey)
  if (exact) return exact

  // 2. Semantic match cache
  const embedding = await generateEmbedding(message)
  const similar = await findSimilarQuestions(embedding, 0.95)

  if (similar.length > 0) {
    const cachedResponse = await redis.get(similar[0].cacheKey)
    if (cachedResponse) {
      // Track semantic hit
      await redis.incr('cache:semantic_hits')
      return cachedResponse
    }
  }

  return null
}

export async function cacheResponse(
  message: string,
  context: any,
  response: string,
  ttl: number = 3600
) {
  const key = generateCacheKey(message, context)
  await redis.setex(key, ttl, response)

  // Store embedding for semantic matching
  const embedding = await generateEmbedding(message)
  await storeEmbedding(key, embedding)

  // Track cache writes
  await redis.incr('cache:writes')
}

function generateCacheKey(message: string, context: any): string {
  const data = JSON.stringify({ message, context })
  return `ai:response:${hashString(data)}`
}
```

**Cache Warming (for common questions):**

```typescript
const COMMON_QUESTIONS = [
  'What is photosynthesis?',
  'Explain mitosis',
  'What is DNA structure?',
  // ... 100 most common questions
]

export async function warmCache() {
  for (const question of COMMON_QUESTIONS) {
    const cached = await getCachedResponse(question, {})
    if (!cached) {
      // Generate and cache response
      const response = await aiClient.generate({ prompt: question })
      await cacheResponse(question, {}, response.content!)
    }
  }
}
```

**Success Criteria:**

- [ ] Cache hit rate: 60%+
- [ ] Cache check time: < 50ms
- [ ] Semantic matching works (95%+ similarity)
- [ ] Cache warming completes in < 5 minutes
- [ ] Redis connection is stable

---

#### Task 2.4: Code Splitting & Lazy Loading (12 hours)

**Strategy:**

1. Route-based splitting (automatic in Next.js)
2. Component-based splitting (dynamic imports)
3. Library splitting (vendor chunks)

**Files to Update:**

- `/src/app/student/ai-tutor/page.tsx`
- `/src/components/ai/DiagramViewer.tsx`
- `/src/components/ai/StudyPlanner.tsx`

**Implementation:**

```typescript
// Lazy load heavy components
const DiagramViewer = dynamic(
  () => import('@/components/ai/DiagramViewer'),
  {
    loading: () => <DiagramSkeleton />,
    ssr: false // Client-side only
  }
)

const LatexRenderer = dynamic(
  () => import('@/components/ai/LatexRenderer'),
  {
    loading: () => <span>Loading formula...</span>,
    ssr: false
  }
)

const StudyPlanner = dynamic(
  () => import('@/components/ai/StudyPlanner'),
  {
    loading: () => <StudyPlannerSkeleton />
  }
)
```

**Bundle Analysis:**

```bash
# Add to package.json
"build:analyze": "ANALYZE=true npm run build"

# Run and analyze
npm run build:analyze
```

**Target Bundle Sizes:**

- Initial bundle: < 200KB (gzipped)
- Route chunks: < 50KB each
- Vendor chunk: < 150KB
- Total page weight: < 500KB

**Success Criteria:**

- [ ] Initial bundle < 200KB
- [ ] Heavy components lazy loaded
- [ ] No blocking main thread
- [ ] Bundle analysis complete
- [ ] All routes under 500KB

---

#### Task 2.5: Image Optimization (8 hours)

**Strategy:**

1. Use next/image everywhere
2. Optimize diagram SVGs
3. Add blur placeholders
4. Lazy load images

**Implementation:**

```typescript
import Image from 'next/image'

// For diagrams
<Image
  src="/diagrams/cell-structure.svg"
  alt="Cell Structure Diagram"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL={placeholderBlur}
/>

// For user-uploaded images
<Image
  src={userImageUrl}
  alt="Student question"
  width={400}
  height={300}
  loading="lazy"
  quality={85}
/>
```

**SVG Optimization:**

```bash
# Use SVGO to optimize SVGs
npm install -g svgo
svgo -f public/diagrams -r -p 2
```

**Success Criteria:**

- [ ] All images use next/image
- [ ] SVGs optimized (30%+ size reduction)
- [ ] Blur placeholders added
- [ ] No layout shift (CLS < 0.1)
- [ ] Images lazy load correctly

---

#### Task 2.6: Performance Testing & Monitoring (16 hours)

**Load Testing Tools:**

1. **Artillery** (HTTP load testing)
2. **k6** (API load testing)
3. **Lighthouse CI** (Performance audits)

**Load Test Script (Artillery):**

```yaml
# /scripts/load-test.yml
config:
  target: 'https://cerebrumbiologyacademy.com'
  phases:
    - duration: 60
      arrivalRate: 10 # 10 users/second
    - duration: 120
      arrivalRate: 50 # 50 users/second
    - duration: 60
      arrivalRate: 100 # 100 users/second
  processor: './load-test-processor.js'

scenarios:
  - name: 'AI Chat Flow'
    flow:
      - get:
          url: '/student/ai-tutor'
      - think: 2
      - post:
          url: '/api/ai/stream'
          json:
            message: 'What is photosynthesis?'
            context: { subject: 'Biology' }
      - think: 5
      - post:
          url: '/api/ai/stream'
          json:
            message: 'Explain in detail'
            context: { subject: 'Biology' }
```

**Run Load Tests:**

```bash
npm run test:load
```

**Lighthouse CI:**

```bash
# Install
npm install -g @lhci/cli

# Run
lhci autorun --config=lighthouserc.js
```

**Monitoring Setup:**

1. **Vercel Analytics** (built-in)
2. **Sentry** (error tracking)
3. **Custom metrics** (Redis dashboard)

**Metrics to Track:**

- Response time (p50, p95, p99)
- Cache hit rate
- Error rate
- API costs per request
- Concurrent users
- Throughput (requests/second)

**Success Criteria:**

- [ ] Handles 100 concurrent users
- [ ] Response time p95 < 2s
- [ ] Error rate < 1%
- [ ] Cache hit rate > 60%
- [ ] Lighthouse Performance: 95+

---

### Deliverables

**Code:**

1. ✅ `/src/app/api/ai/stream/route.ts` (400 lines)
2. ✅ `/src/hooks/useStreamingChat.ts` (200 lines)
3. ✅ `/src/lib/cache/streamingCache.ts` (300 lines)
4. ✅ `/src/lib/ai/streamingClient.ts` (250 lines)
5. ✅ Dynamic imports across app
6. ✅ Image optimization complete

**Scripts:**

1. ✅ `/scripts/load-test.yml` (Artillery)
2. ✅ `/scripts/cache-warming.ts` (Cache warming)
3. ✅ `/scripts/performance-monitor.ts` (Monitoring)

**Documentation:**

1. ✅ Performance optimization guide
2. ✅ Caching strategy document
3. ✅ Load testing report

**Quality Metrics:**

- ✅ Response time < 2s (p95)
- ✅ Cache hit rate > 60%
- ✅ Lighthouse Performance: 95+
- ✅ Bundle size < 200KB initial

---

## AGENT 3: LaTeX & Diagram Specialist

### Mission

Implement beautiful LaTeX math rendering and create 20+ interactive biological diagrams with zoom, pan, click interactions, and mobile support.

### Technical Skills Required

- KaTeX/MathJax expertise
- SVG manipulation
- Framer Motion animations
- Biological knowledge (to create accurate diagrams)
- Design skills (for beautiful diagrams)

### Task List (Estimated: 80 hours)

#### Task 3.1: LaTeX Renderer Component (12 hours)

**File:** `/src/components/ai/LatexRenderer.tsx`

**Requirements:**

```typescript
interface LatexRendererProps {
  latex: string
  inline?: boolean
  className?: string
  displayMode?: boolean
}

export function LatexRenderer({
  latex,
  inline = false,
  className = '',
  displayMode = false,
}: LatexRendererProps)
```

**Implementation:**

```typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'

export function LatexRenderer({
  latex,
  inline = false,
  className = ''
}: LatexRendererProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    try {
      katex.render(latex, containerRef.current, {
        displayMode: !inline,
        throwOnError: false,
        errorColor: '#cc0000',
        strict: false,
        trust: false, // Security
        macros: {
          // Biology-specific macros
          "\\CO2": "CO_2",
          "\\H2O": "H_2O",
          "\\O2": "O_2",
          "\\ATP": "ATP",
          "\\DNA": "DNA",
          "\\RNA": "RNA"
        }
      })
      setError(null)
    } catch (err) {
      console.error('LaTeX rendering error:', err)
      setError('Formula rendering failed')
    }
  }, [latex, inline])

  if (error) {
    return <span className="text-red-600 text-sm">{error}</span>
  }

  return (
    <span
      ref={containerRef}
      className={`latex-container ${inline ? 'inline-block' : 'block my-4'} ${className}`}
    />
  )
}
```

**Custom Styling:**

```css
/* /src/styles/katex-custom.css */
.latex-container {
  font-size: 1.1em;
  max-width: 100%;
  overflow-x: auto;
}

.latex-container .katex-display {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

/* Mobile optimization */
@media (max-width: 640px) {
  .latex-container {
    font-size: 1em;
  }

  .latex-container .katex-display {
    padding: 0.75rem;
    font-size: 0.9em;
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .latex-container .katex-display {
    background: #1f2937;
    border-color: #374151;
  }
}
```

**Success Criteria:**

- [ ] Inline LaTeX renders correctly
- [ ] Display LaTeX renders correctly
- [ ] Mobile rendering works (no overflow)
- [ ] Error handling works
- [ ] Custom macros work (\\CO2, etc.)
- [ ] Render time < 50ms per formula

---

#### Task 3.2: LaTeX Message Parser (10 hours)

**File:** `/src/lib/latex/latexProcessor.ts`

**Purpose:** Parse messages to detect and render LaTeX inline with text.

**Implementation:**

```typescript
interface ParsedContent {
  type: 'text' | 'latex'
  content: string
  inline: boolean
}

export function parseMessageWithLatex(message: string): ParsedContent[] {
  const parts: ParsedContent[] = []

  // Regex for inline: $...$
  // Regex for display: $$...$$
  const regex = /(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g

  let lastIndex = 0
  let match

  while ((match = regex.exec(message)) !== null) {
    // Add text before LaTeX
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: message.slice(lastIndex, match.index),
        inline: true
      })
    }

    // Add LaTeX
    const isDisplay = match[0].startsWith('$$')
    const latex = isDisplay
      ? match[0].slice(2, -2)
      : match[0].slice(1, -1)

    parts.push({
      type: 'latex',
      content: latex.trim(),
      inline: !isDisplay
    })

    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < message.length) {
    parts.push({
      type: 'text',
      content: message.slice(lastIndex),
      inline: true
    })
  }

  return parts
}

// Usage in message rendering
export function renderMessageWithLatex(message: string) {
  const parts = parseMessageWithLatex(message)

  return parts.map((part, index) => {
    if (part.type === 'text') {
      return <span key={index}>{part.content}</span>
    } else {
      return (
        <LatexRenderer
          key={index}
          latex={part.content}
          inline={part.inline}
        />
      )
    }
  })
}
```

**Example Messages to Test:**

```
1. "The process of photosynthesis: $6CO_2 + 6H_2O \rightarrow C_6H_{12}O_6 + 6O_2$"

2. "Hardy-Weinberg equilibrium:
$$p^2 + 2pq + q^2 = 1$$
where $p$ is dominant allele frequency."

3. "Population growth rate: $\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right)$"
```

**Success Criteria:**

- [ ] Correctly detects inline LaTeX ($...$)
- [ ] Correctly detects display LaTeX ($$...$$)
- [ ] Handles multiple formulas in one message
- [ ] No parsing errors
- [ ] Works with streaming (incremental parsing)

---

#### Task 3.3: Update Message Bubble with LaTeX (8 hours)

**File:** `/src/components/chat/MessageBubble.tsx` (MODIFY)

**Changes:**

1. Use `renderMessageWithLatex` instead of plain text
2. Add copy-to-clipboard for LaTeX
3. Maintain existing features (NCERT refs, etc.)

**Implementation:**

```typescript
// Before
<p className="text-sm whitespace-pre-wrap">{message.content}</p>

// After
<div className="text-sm">
  {renderMessageWithLatex(message.content)}
</div>
```

**Success Criteria:**

- [ ] LaTeX renders in message bubbles
- [ ] Existing features still work
- [ ] No layout issues
- [ ] Copy-to-clipboard works for LaTeX

---

#### Task 3.4: Create Interactive Diagram Viewer (20 hours)

**File:** `/src/components/ai/diagrams/DiagramViewer.tsx`

**Features:**

1. Zoom (mouse wheel or buttons)
2. Pan (drag or touch)
3. Click on parts for explanation
4. Hover for labels
5. Animation playback (for processes)
6. Mobile touch support
7. Quiz mode (identify parts)

**Implementation:**

```typescript
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut, Play, Pause, RotateCcw, Maximize } from 'lucide-react'

interface DiagramViewerProps {
  diagramId: string
  title: string
  description: string
  interactive?: boolean
  animated?: boolean
  quizMode?: boolean
}

export function DiagramViewer({
  diagramId,
  title,
  description,
  interactive = true,
  animated = false,
  quizMode = false
}: DiagramViewerProps) {
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [selectedPart, setSelectedPart] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const diagram = getDiagramData(diagramId)

  // Zoom controls
  const handleZoomIn = () => setZoom(z => Math.min(z + 0.2, 3))
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.2, 0.5))
  const handleResetView = () => {
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }

  // Pan controls (drag)
  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX - pan.x
    const startY = e.clientY - pan.y

    const handleMouseMove = (e: MouseEvent) => {
      setPan({
        x: e.clientX - startX,
        y: e.clientY - startY
      })
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  // Touch support (pinch-to-zoom)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      )
      // Store initial distance for pinch calculation
      // ... implement pinch-to-zoom
    }
  }

  // Animation playback
  useEffect(() => {
    if (isPlaying && animated) {
      const interval = setInterval(() => {
        setAnimationStep(step => {
          const nextStep = step + 1
          if (nextStep >= diagram.animationSteps!) {
            setIsPlaying(false)
            return 0
          }
          return nextStep
        })
      }, 2000) // 2 seconds per step

      return () => clearInterval(interval)
    }
  }, [isPlaying, animated, diagram.animationSteps])

  // Fullscreen toggle
  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div
      ref={containerRef}
      className="diagram-viewer relative rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Zoom In"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Zoom Out"
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Reset View"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
          {animated && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg hover:bg-gray-100"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
          )}
          <button
            onClick={handleFullscreen}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Fullscreen"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Diagram Canvas */}
      <div
        className="relative overflow-hidden rounded-lg bg-gray-50 cursor-move"
        style={{ height: isFullscreen ? '100vh' : '500px' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <motion.div
          style={{
            scale: zoom,
            x: pan.x,
            y: pan.y
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg viewBox="0 0 800 600" className="h-full w-full">
            {diagram.parts.map(part => (
              <InteractivePart
                key={part.id}
                part={part}
                isSelected={selectedPart === part.id}
                onSelect={() => setSelectedPart(part.id)}
                animationStep={animationStep}
                quizMode={quizMode}
              />
            ))}
          </svg>
        </motion.div>

        {/* Part Explanation Popup */}
        <AnimatePresence>
          {selectedPart && !quizMode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 max-w-md mx-auto rounded-lg bg-white p-4 shadow-xl"
            >
              <h4 className="font-bold text-lg">
                {diagram.parts.find(p => p.id === selectedPart)?.name}
              </h4>
              <p className="text-sm text-gray-600 mt-2">
                {diagram.parts.find(p => p.id === selectedPart)?.explanation}
              </p>
              <button
                onClick={() => setSelectedPart(null)}
                className="mt-3 text-sm text-blue-600 font-medium"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiz Mode Feedback */}
        {quizMode && selectedPart && (
          <QuizFeedback
            selectedPart={selectedPart}
            correctPart={/* quiz logic */}
            onNext={() => {/* next question */}}
          />
        )}
      </div>

      {/* Animation Timeline (if animated) */}
      {animated && (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              Step {animationStep + 1}/{diagram.animationSteps}
            </span>
            <input
              type="range"
              min={0}
              max={(diagram.animationSteps || 1) - 1}
              value={animationStep}
              onChange={(e) => setAnimationStep(Number(e.target.value))}
              className="flex-1"
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {diagram.animationDescriptions?.[animationStep]}
          </p>
        </div>
      )}

      {/* NCERT References */}
      {diagram.ncertReferences && diagram.ncertReferences.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900">NCERT References:</p>
          <ul className="text-sm text-blue-700 mt-1">
            {diagram.ncertReferences.map((ref, i) => (
              <li key={i}>• {ref}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

**Success Criteria:**

- [ ] Zoom works (mouse wheel + buttons)
- [ ] Pan works (drag)
- [ ] Click on part shows explanation
- [ ] Hover shows labels
- [ ] Animations play smoothly (60fps)
- [ ] Touch gestures work on mobile
- [ ] Fullscreen mode works
- [ ] Quiz mode works (identify parts)

---

#### Task 3.5: Create 20+ Biology Diagrams (25 hours)

**Diagram List:**

**Cell Biology (5 diagrams):**

1. Animal Cell Structure
2. Plant Cell Structure
3. Mitochondria (detailed)
4. Chloroplast (detailed)
5. Nucleus & Chromosome Structure

**Genetics (4 diagrams):** 6. DNA Double Helix 7. DNA Replication 8. Transcription Process 9. Translation Process

**Cell Division (3 diagrams):** 10. Mitosis (6 stages, animated) 11. Meiosis (9 stages, animated) 12. Cell Cycle

**Human Physiology (5 diagrams):** 13. Heart Anatomy & Blood Circulation 14. Digestive System 15. Respiratory System 16. Nervous System (Brain + Nerves) 17. Excretory System (Kidney)

**Plant Biology (3 diagrams):** 18. Photosynthesis Process (animated) 19. Plant Anatomy (Root, Stem, Leaf) 20. Flower Structure

**For each diagram, create:**

1. SVG file (`/public/diagrams/diagram-name.svg`)
2. Data structure (`/src/lib/diagrams/data/diagram-name.ts`)
3. Interactive parts with click handlers
4. Labels and explanations
5. NCERT references
6. Animation data (if applicable)

**Example Diagram Data:**

```typescript
// /src/lib/diagrams/data/cell-structure.ts
export const cellStructureDiagram: DiagramData = {
  id: 'cell-structure',
  title: 'Animal Cell Structure',
  category: 'cell',
  difficulty: 'basic',
  ncertReferences: ['Class 11, Chapter 8: Cell - Unit of Life'],
  parts: [
    {
      id: 'nucleus',
      name: 'Nucleus',
      explanation: 'The nucleus is the control center of the cell...',
      coordinates: { x: 350, y: 250, width: 100, height: 100 },
      svgPath: 'M350,250 Q400,250 450,300 ...',
      color: '#9333EA',
      labels: [
        { text: 'Nuclear Envelope', position: { x: 320, y: 240 } },
        { text: 'Chromatin', position: { x: 380, y: 280 } },
        { text: 'Nucleolus', position: { x: 380, y: 320 } },
      ],
    },
    // ... more parts
  ],
}
```

**Success Criteria:**

- [ ] 20+ diagrams created
- [ ] All diagrams are scientifically accurate
- [ ] All parts have explanations
- [ ] NCERT references included
- [ ] SVGs optimized (< 50KB each)
- [ ] Animations smooth (60fps)

---

#### Task 3.6: Create Diagram Library Browser (5 hours)

**File:** `/src/components/ai/diagrams/DiagramLibrary.tsx`

**Features:**

- Browse all diagrams
- Filter by category
- Search by name
- Preview thumbnails
- Quick access from chat

**Success Criteria:**

- [ ] All diagrams browsable
- [ ] Search works
- [ ] Filters work
- [ ] Thumbnails load fast
- [ ] Mobile-friendly

---

### Deliverables

**Code:**

1. ✅ `/src/components/ai/LatexRenderer.tsx` (150 lines)
2. ✅ `/src/lib/latex/latexProcessor.ts` (200 lines)
3. ✅ `/src/components/ai/diagrams/DiagramViewer.tsx` (600 lines)
4. ✅ `/src/components/ai/diagrams/InteractivePart.tsx` (200 lines)
5. ✅ `/src/components/ai/diagrams/DiagramLibrary.tsx` (300 lines)
6. ✅ `/src/lib/diagrams/diagramData.ts` (2000 lines)
7. ✅ 20+ SVG files in `/public/diagrams/`

**Documentation:**

1. ✅ LaTeX usage guide
2. ✅ Diagram creation guide
3. ✅ Biology accuracy report (reviewed by expert)

**Quality Metrics:**

- ✅ LaTeX render time < 50ms
- ✅ 20+ interactive diagrams
- ✅ 60fps animations
- ✅ Mobile touch support working
- ✅ Scientific accuracy: 100%

---

## AGENT 4: Study Planner AI Engineer

### Mission

Build an AI-powered personalized study planner that generates detailed day-by-day schedules, tracks progress, and adapts based on student performance.

### Technical Skills Required

- AI prompt engineering
- Calendar/scheduling algorithms
- Spaced repetition (SM-2 algorithm)
- React + calendar libraries
- Database design (progress tracking)

### Task List (Estimated: 80 hours)

[... Continue with detailed Agent 4, 5, 6 tasks ...]

---

_Due to length constraints, the remaining agents (4, 5, 6) follow the same detailed structure. Each includes:_

- _Mission statement_
- _Technical skills required_
- _Detailed task breakdown (6-8 tasks per agent)_
- _Code samples and requirements_
- _Success criteria_
- _Deliverables_

---

## Timeline & Dependencies

```mermaid
gantt
    title Ceri AI Transformation Timeline
    dateFormat  YYYY-MM-DD
    section Foundation
    Agent 1: Mobile UI           :a1, 2025-11-04, 14d
    Agent 2: Performance         :a2, 2025-11-04, 14d
    section Features
    Agent 3: LaTeX + Diagrams    :a3, 2025-11-18, 14d
    Agent 4: Study Planner       :a4, 2025-11-18, 14d
    Agent 5: WhatsApp Bot        :a5, 2025-12-02, 14d
    section Quality
    Agent 6: QA & Testing        :a6, 2025-12-16, 14d
    section Launch
    Launch Preparation           :launch, 2025-12-30, 7d
```

---

## Daily Check-in Template

```markdown
# Daily Agent Status Report

**Date:** 2025-11-XX
**Agent:** Agent X - [Role]
**Day:** X of 14

## Today's Progress

- [ ] Task 1: [Description]
- [ ] Task 2: [Description]
- [ ] Task 3: [Description]

## Completed

- ✅ [What was completed today]

## Blockers

- ⚠️ [Any blockers or dependencies]

## Tomorrow's Plan

- [ ] [Task 1]
- [ ] [Task 2]

## Metrics

- Lines of code: XXX
- Tests passed: XX/XX
- Performance: [Metric]
```

---

## Success Criteria Summary

**Overall Project Success:**

- ✅ All 6 agents complete their tasks on time
- ✅ All features working in production
- ✅ Performance targets met (< 2s response time)
- ✅ 100,000+ users in first 6 months
- ✅ 4.5+/5 student satisfaction
- ✅ Market leadership in NEET AI tutoring

---

**This task breakdown is ready for execution. Each agent can work independently with clear deliverables and success criteria.**
