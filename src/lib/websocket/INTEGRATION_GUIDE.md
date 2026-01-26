# WebSocket Integration Guide

Quick start guide for integrating WebSocket functionality into Cerebrum Biology Academy.

## Quick Start (5 minutes)

### 1. Import and Use

```tsx
import { useWebSocket } from '@/hooks/useWebSocket'

function MyComponent() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true, // Start with mock mode
    debug: true,
  })

  return (
    <div>
      Status: {socket.status}
      {socket.isConnected ? ' ✅' : ' 🔴'}
    </div>
  )
}
```

### 2. View Examples

Import the dashboard to see all features:

```tsx
import { WebSocketDashboard } from '@/lib/websocket/examples'

export default function DashboardPage() {
  return <WebSocketDashboard />
}
```

## Integration Points

### 1. Student Dashboard - Live Study Metrics

**File:** `/src/app/student/dashboard/page.tsx`

```tsx
'use client'

import { useWebSocket, useWebSocketMessage } from '@/hooks/useWebSocket'
import { StudyMetricsPayload } from '@/lib/websocket/types'
import { useState } from 'react'

export default function StudentDashboard() {
  const [metrics, setMetrics] = useState<StudyMetricsPayload | null>(null)

  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true,
    debug: process.env.NODE_ENV === 'development',
  })

  useWebSocketMessage<StudyMetricsPayload>(socket as any, 'study_metrics_update', (data) => {
    setMetrics(data)
  })

  return (
    <div>
      <h1>Student Dashboard</h1>
      {metrics && (
        <div>
          <p>Study Hours: {metrics.studyHours}</p>
          <p>Progress: {metrics.progress}%</p>
          <p>Streak: {metrics.streak} days</p>
        </div>
      )}
    </div>
  )
}
```

### 2. Study Rooms - Collaborative Sessions

**File:** `/src/app/study-rooms/[id]/page.tsx`

```tsx
'use client'

import { useWebSocket, useWebSocketMessage } from '@/hooks/useWebSocket'
import { CollaborativeSessionPayload } from '@/lib/websocket/types'
import { useState } from 'react'

export default function StudyRoom({ params }: { params: { id: string } }) {
  const [session, setSession] = useState<CollaborativeSessionPayload | null>(null)

  const socket = useWebSocket({
    url: `wss://api.cerebrumbiologyacademy.com/ws/rooms/${params.id}`,
    enableMockMode: true,
  })

  useWebSocketMessage<CollaborativeSessionPayload>(
    socket as any,
    'collaborative_session_update',
    (data) => {
      setSession(data)
    }
  )

  return (
    <div>
      <h1>{session?.topic || 'Study Room'}</h1>
      <p>{session?.activeUsers || 0} students online</p>
      {session?.participants.map((p) => (
        <div key={p.userId}>{p.userName}</div>
      ))}
    </div>
  )
}
```

### 3. Notifications - Real-time Alerts

**File:** `/src/components/NotificationBell.tsx`

```tsx
'use client'

import { useWebSocket, useWebSocketMessage } from '@/hooks/useWebSocket'
import { NotificationPayload } from '@/lib/websocket/types'
import { useState } from 'react'

export function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationPayload[]>([])

  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true,
  })

  useWebSocketMessage<NotificationPayload>(socket as any, 'notification', (notification) => {
    setNotifications((prev) => [notification, ...prev].slice(0, 10))
  })

  return (
    <div className="relative">
      <button className="relative">
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white">
            {notifications.length}
          </span>
        )}
      </button>
    </div>
  )
}
```

### 4. Header - Connection Status

**File:** `/src/components/Header.tsx`

```tsx
'use client'

import { useWebSocket } from '@/hooks/useWebSocket'

export function Header() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true,
  })

  return (
    <header>
      <div className="connection-status">
        {socket.isConnected ? (
          <span className="text-green-600">● Live</span>
        ) : (
          <span className="text-gray-400">○ Offline</span>
        )}
        {socket.latency > 0 && <span className="text-xs text-gray-500"> {socket.latency}ms</span>}
      </div>
    </header>
  )
}
```

## Environment Configuration

Add to `.env.local`:

```bash
# WebSocket Configuration
NEXT_PUBLIC_WS_URL=wss://api.cerebrumbiologyacademy.com/ws
NEXT_PUBLIC_WS_ENABLE_MOCK=true
NEXT_PUBLIC_WS_DEBUG=true
```

Usage:

```tsx
const socket = useWebSocket({
  url: process.env.NEXT_PUBLIC_WS_URL || 'wss://fallback.com/ws',
  enableMockMode: process.env.NEXT_PUBLIC_WS_ENABLE_MOCK === 'true',
  debug: process.env.NEXT_PUBLIC_WS_DEBUG === 'true',
})
```

## Production Deployment Checklist

- [ ] Set `NEXT_PUBLIC_WS_URL` to production WebSocket server
- [ ] Set `NEXT_PUBLIC_WS_ENABLE_MOCK=false`
- [ ] Set `NEXT_PUBLIC_WS_DEBUG=false`
- [ ] Implement authentication in WebSocket connection
- [ ] Set up WebSocket server (see Server Setup below)
- [ ] Configure load balancer for WebSocket
- [ ] Set up monitoring for WebSocket connections
- [ ] Test reconnection behavior
- [ ] Test with multiple concurrent users

## Server Setup

### Option 1: Separate WebSocket Server

```bash
npm install ws @types/ws
```

Create `server/websocket.ts`:

```typescript
import { WebSocketServer } from 'ws'
import { createServer } from 'http'

const server = createServer()
const wss = new WebSocketServer({ server })

wss.on('connection', (ws) => {
  console.log('Client connected')

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())

    if (message.type === 'ping') {
      ws.send(
        JSON.stringify({
          type: 'pong',
          payload: message.payload,
          timestamp: Date.now(),
          messageId: generateId(),
        })
      )
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
})

server.listen(8080, () => {
  console.log('WebSocket server running on ws://localhost:8080')
})
```

### Option 2: Next.js Custom Server

Modify `package.json`:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "next build",
    "start": "NODE_ENV=production node server.js"
  }
}
```

Create `server.js`:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { WebSocketServer } = require('ws')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    await handle(req, res, parsedUrl)
  })

  const wss = new WebSocketServer({ server, path: '/ws' })

  wss.on('connection', (ws) => {
    console.log('Client connected')
    // Handle WebSocket logic
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> WebSocket on ws://${hostname}:${port}/ws`)
  })
})
```

## Testing Strategy

### 1. Development (Mock Mode)

```tsx
const socket = useWebSocket({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  enableMockMode: true,
  debug: true,
})
```

### 2. Staging (Real Server)

```tsx
const socket = useWebSocket({
  url: 'wss://staging-api.cerebrumbiologyacademy.com/ws',
  enableMockMode: false,
  debug: true,
})
```

### 3. Production

```tsx
const socket = useWebSocket({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  enableMockMode: false,
  debug: false,
})
```

## Monitoring

Add analytics to track WebSocket health:

```tsx
const socket = useWebSocket({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  onConnect: () => {
    console.log('WebSocket connected')
    trackEvent('websocket_connected', {
      timestamp: Date.now(),
    })
  },
  onDisconnect: (reason) => {
    console.log('WebSocket disconnected:', reason)
    trackEvent('websocket_disconnected', {
      reason,
      timestamp: Date.now(),
    })
  },
  onError: (error) => {
    console.error('WebSocket error:', error)
    trackEvent('websocket_error', {
      error: error.message,
      timestamp: Date.now(),
    })
  },
})
```

## Performance Tips

1. **Use Mock Mode in Development** - Faster development without server
2. **Throttle Updates** - Don't update UI on every message
3. **Lazy Load** - Only connect when component mounts
4. **Cleanup** - Hook automatically disconnects on unmount
5. **Connection Pooling** - Reuse connections across components

## Troubleshooting

### Mock Mode Not Working

```tsx
// ✅ Correct
const socket = useWebSocket({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  enableMockMode: true, // Enable mock
  debug: true, // See console logs
})

// ❌ Wrong
const socket = useWebSocket({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  // enableMockMode missing
})
```

### Connection Not Establishing

1. Check console for errors (`debug: true`)
2. Verify WebSocket server is running
3. Check firewall/proxy settings
4. Ensure URL uses `wss://` (not `ws://`) in production

### High Latency

1. Check `socket.latency` value
2. Reduce `heartbeatInterval`
3. Check server load
4. Verify network conditions

## Next Steps

1. **Enable Mock Mode** - Start with `enableMockMode: true`
2. **View Examples** - Check `/src/lib/websocket/examples.tsx`
3. **Integrate** - Add to your components
4. **Test** - Verify in development
5. **Deploy Server** - Set up production WebSocket server
6. **Go Live** - Disable mock mode in production

## Support

- See `/src/lib/websocket/README.md` for full documentation
- Check `/src/lib/websocket/examples.tsx` for working examples
- Review types in `/src/lib/websocket/types.ts`

## Migration from Polling

If you're currently using polling:

```tsx
// ❌ Old (Polling)
useEffect(() => {
  const interval = setInterval(async () => {
    const data = await fetch('/api/metrics')
    setMetrics(await data.json())
  }, 5000)
  return () => clearInterval(interval)
}, [])

// ✅ New (WebSocket)
const socket = useWebSocket({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  enableMockMode: true,
})

useWebSocketMessage<StudyMetricsPayload>(socket as any, 'study_metrics_update', (metrics) =>
  setMetrics(metrics)
)
```

Benefits:

- Real-time updates (no 5-second delay)
- Lower server load
- Better user experience
- Bidirectional communication
