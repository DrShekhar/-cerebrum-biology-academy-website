# Real-Time WebSocket Integration

Complete WebSocket implementation for real-time features in Cerebrum Biology Academy.

## Features

- **Live Study Metrics** - Real-time updates of study hours, progress, and streaks
- **Collaborative Study Sessions** - See other students studying the same topic
- **Live Notifications** - Instant alerts for messages, achievements, and updates
- **System Status** - Real-time system health monitoring
- **Automatic Reconnection** - Handles disconnections with exponential backoff
- **Heartbeat/Ping-Pong** - Connection health monitoring with latency tracking
- **Message Queue** - Offline message buffering
- **Mock Mode** - Demo functionality without real WebSocket server

## Installation

All required dependencies are already included:

- `ws` - WebSocket implementation
- `@types/ws` - TypeScript definitions

## Usage

### Basic Connection

```tsx
import { useWebSocket } from '@/hooks/useWebSocket'

function MyComponent() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    reconnect: true,
    heartbeat: 30000,
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    debug: true,
  })

  return (
    <div>
      <p>Status: {socket.status}</p>
      <p>Connected: {socket.isConnected ? 'Yes' : 'No'}</p>
      <p>Latency: {socket.latency}ms</p>
    </div>
  )
}
```

### Demo Mode (Without Server)

```tsx
const socket = useWebSocket({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  enableMockMode: true, // Enable mock mode
  debug: true,
})
```

In mock mode, the client will:

- Simulate connection status
- Generate realistic mock data every 5 seconds
- Fire all event handlers as if real data was received

### Listening to Messages

```tsx
import { useWebSocket, useWebSocketMessage } from '@/hooks/useWebSocket'
import { StudyMetricsPayload } from '@/lib/websocket/types'

function StudyMetrics() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
    enableMockMode: true,
  })

  useWebSocketMessage<StudyMetricsPayload>(socket, 'study_metrics_update', (metrics) => {
    console.log('Study hours:', metrics.studyHours)
    console.log('Progress:', metrics.progress)
    console.log('Streak:', metrics.streak)
  })

  return <div>Study metrics component</div>
}
```

### Sending Messages

```tsx
function MyComponent() {
  const socket = useWebSocket({
    url: 'wss://api.cerebrumbiologyacademy.com/ws',
  })

  const handleStudyStart = () => {
    socket.send('study_session_start', {
      userId: 'user-123',
      topic: 'Cell Biology',
      timestamp: Date.now(),
    })
  }

  return <button onClick={handleStudyStart}>Start Study Session</button>
}
```

### Using WebSocket Client Directly

```tsx
import { WebSocketClient } from '@/lib/websocket/client'

const client = new WebSocketClient({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  enableMockMode: true,
  debug: true,
})

client.connect()

// Listen to specific message types
const unsubscribe = client.on('notification', (message) => {
  console.log('Notification:', message.payload)
})

// Send a message
client.send('study_session_start', {
  userId: 'user-123',
  topic: 'Genetics',
})

// Cleanup
unsubscribe()
client.disconnect()
```

## Configuration Options

```typescript
interface WebSocketConfig {
  url: string // WebSocket server URL
  reconnect?: boolean // Auto-reconnect on disconnect (default: true)
  reconnectAttempts?: number // Max reconnect attempts (default: 5)
  reconnectInterval?: number // Initial reconnect delay in ms (default: 3000)
  heartbeatInterval?: number // Ping interval in ms (default: 30000)
  connectionTimeout?: number // Connection timeout in ms (default: 10000)
  enableQueue?: boolean // Queue messages when offline (default: true)
  enableMockMode?: boolean // Enable demo mode (default: false)
  debug?: boolean // Enable console logging (default: false)
  onConnect?: () => void // Connection callback
  onDisconnect?: (reason?: string) => void // Disconnection callback
  onError?: (error: Error) => void // Error callback
  onMessage?: (message: WebSocketMessage) => void // Message callback
}
```

## Message Types

### Study Metrics Update

```typescript
{
  type: 'study_metrics_update',
  payload: {
    userId: string
    studyHours: number
    progress: number
    currentTopic?: string
    sessionDuration: number
    streak: number
  }
}
```

### Collaborative Session Update

```typescript
{
  type: 'collaborative_session_update',
  payload: {
    sessionId: string
    topic: string
    participants: Array<{
      userId: string
      userName: string
      avatarUrl?: string
      joinedAt: number
    }>
    activeUsers: number
  }
}
```

### Notification

```typescript
{
  type: 'notification',
  payload: {
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    priority: 'low' | 'medium' | 'high'
    actionUrl?: string
    actionText?: string
  }
}
```

### System Status

```typescript
{
  type: 'system_status',
  payload: {
    status: 'operational' | 'degraded' | 'maintenance' | 'outage'
    services: {
      api: boolean
      database: boolean
      cache: boolean
      storage: boolean
    }
    uptime: number
    lastCheck: number
  }
}
```

## Connection Management

### Status Types

- `connecting` - Initial connection attempt
- `connected` - Successfully connected
- `disconnected` - Not connected
- `reconnecting` - Attempting to reconnect
- `error` - Connection error occurred

### Automatic Reconnection

The client automatically attempts to reconnect with exponential backoff:

- Attempt 1: 3 seconds
- Attempt 2: 4.5 seconds
- Attempt 3: 6.75 seconds
- Attempt 4: 10.125 seconds
- Attempt 5: 15.1875 seconds

### Manual Control

```tsx
const socket = useWebSocket({ url: 'wss://...' })

// Force reconnect
socket.reconnect()

// Disconnect
socket.disconnect()

// Check queued messages
const queued = socket.getQueuedMessages()
console.log('Queued messages:', queued.length)

// Clear queue
socket.clearQueue()
```

## Examples

See `/src/lib/websocket/examples.tsx` for complete working examples:

- Live Study Metrics Dashboard
- Collaborative Study Sessions
- Real-time Notifications
- System Status Monitor
- Complete WebSocket Dashboard

## Server Implementation

### Next.js API Route (Future)

```typescript
// /src/app/api/websocket/route.ts
import { Server } from 'ws'

export function GET(request: Request) {
  // WebSocket server implementation
  // This would handle upgrades and message routing
}
```

### External WebSocket Server

You can use any WebSocket server that supports the message format:

```javascript
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const message = JSON.parse(data)

    // Handle ping/pong
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

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: 'study_metrics_update',
            payload: {
              /* ... */
            },
            timestamp: Date.now(),
            messageId: generateId(),
          })
        )
      }
    })
  })
})
```

## Testing

### Mock Mode

Use mock mode for development and testing:

```tsx
const socket = useWebSocket({
  url: 'wss://api.cerebrumbiologyacademy.com/ws',
  enableMockMode: true,
  debug: true,
})
```

Mock mode will generate realistic data every 5 seconds including:

- Random study metrics
- Collaborative session updates
- Various notifications
- System status updates

### Integration Testing

```tsx
import { WebSocketClient } from '@/lib/websocket/client'

test('WebSocket connection', () => {
  const client = new WebSocketClient({
    url: 'ws://localhost:8080',
    debug: true,
  })

  const messages: any[] = []
  client.on('study_metrics_update', (msg) => {
    messages.push(msg)
  })

  client.connect()

  // Wait for messages
  // Assert expectations
})
```

## Performance

- **Heartbeat**: Default 30 seconds (configurable)
- **Reconnect Delay**: 3-15 seconds with exponential backoff
- **Message Queue**: Max 100 messages
- **Connection Timeout**: 10 seconds
- **Latency Tracking**: Real-time via ping/pong

## Security Considerations

1. **Use WSS** (WebSocket Secure) in production
2. **Authentication**: Include auth tokens in connection URL or initial message
3. **Rate Limiting**: Implement on server side
4. **Message Validation**: Validate all incoming messages
5. **Error Handling**: Never expose sensitive error details to client

## Files Structure

```
src/
├── lib/
│   └── websocket/
│       ├── types.ts          # TypeScript types and interfaces
│       ├── client.ts         # WebSocket client implementation
│       ├── examples.tsx      # Example components
│       └── README.md         # This file
└── hooks/
    └── useWebSocket.ts       # React hook for WebSocket
```

## Troubleshooting

### Connection Issues

- Check that WebSocket server is running
- Verify URL is correct (ws:// or wss://)
- Check firewall/proxy settings
- Enable debug mode to see detailed logs

### Mock Mode Not Working

- Ensure `enableMockMode: true` is set
- Check console for mock data logs
- Verify message handlers are properly registered

### High Latency

- Check network connection
- Reduce heartbeat interval
- Verify server is not overloaded
- Check for network proxy issues

## Future Enhancements

- [ ] Add JWT authentication support
- [ ] Implement compression (permessage-deflate)
- [ ] Add binary message support
- [ ] Implement message acknowledgment
- [ ] Add room/channel support
- [ ] Implement presence tracking
- [ ] Add TypeScript strict mode support
- [ ] Create server-side implementation
- [ ] Add Redux/Zustand integration
- [ ] Implement message encryption

## License

Part of Cerebrum Biology Academy website.
