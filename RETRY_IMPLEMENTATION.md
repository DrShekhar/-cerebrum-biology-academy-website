# Retry Mechanisms Implementation for Failed API Requests

## Overview

This document outlines the implementation of automatic retry logic for API calls across the Cerebrum Biology Academy application. The retry mechanism ensures resilience against transient failures, network issues, and temporary service outages.

## Implementation Strategy

### Retry Configuration
- **Max Retries:** 3 attempts
- **Backoff Strategy:** Exponential (1s, 2s, 4s)
- **Retry Conditions:**
  - 5xx errors (Server errors)
  - 429 errors (Rate limiting)
  - Network errors (ECONNRESET, ETIMEDOUT)
  - Connection timeouts
- **Non-Retry Conditions:**
  - 4xx errors (except 429)
  - Client errors (400, 401, 403, 404)
  - Abort signals

## Files Modified

### 1. Core Retry Utilities

#### `/src/lib/utils/fetchWithRetry.ts`
Server-side retry utility for Next.js API routes and server components.

**Key Features:**
- Exponential backoff with configurable delays
- Customizable retry conditions
- Callback hooks for retry events
- Support for timeout configurations
- TypeScript type safety

**Usage Example:**
```typescript
import { fetchWithRetry } from '@/lib/utils/fetchWithRetry'

const response = await fetchWithRetry('https://api.example.com/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: 'example' }),
  retryOptions: {
    maxRetries: 3,
    initialDelayMs: 1000,
    onRetry: (attempt, error) => {
      console.log(`Retry attempt ${attempt}:`, error)
    },
  },
})
```

#### `/src/lib/utils/clientFetchWithRetry.ts`
Client-side retry utility for React components and browser-based requests.

**Key Features:**
- React-friendly API
- Custom hook support
- Error boundary integration
- User-facing error handling

**Usage Example:**
```typescript
import { clientFetchWithRetry } from '@/lib/utils/clientFetchWithRetry'

// In a React component
const response = await clientFetchWithRetry('/api/ai/tutor', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: 'What is photosynthesis?' }),
  retryOptions: {
    maxRetries: 3,
    onRetry: (attempt, error) => {
      console.log(`Retrying request (${attempt}/3)...`)
    },
    onError: (error) => {
      console.error('Request failed after retries:', error)
    },
  },
})
```

### 2. AI API Routes Updated

#### `/src/app/api/ceri-ai/stream/route.ts`
**Status:** ✅ Updated with retry logic

**Implementation:**
- Added `createStreamWithRetry` function for Anthropic streaming API
- Retry logic wraps the initial stream creation
- Handles stream connection failures with exponential backoff
- Logs retry attempts for debugging

**Changes:**
- Wrapped `anthropic.messages.stream()` with retry logic
- Added retry configuration to `StreamOptions` interface
- Implemented exponential backoff for stream creation failures

#### `/src/app/api/ai/image-analysis/route.ts`
**Status:** ✅ Updated with retry logic

**Implementation:**
- Integrated `fetchWithRetry` for OpenAI Vision API calls
- 3 retry attempts with 1s, 2s, 4s delays
- Comprehensive error logging

**Changes:**
```typescript
// Before
const response = await fetch('https://api.openai.com/v1/chat/completions', {...})

// After
const response = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
  ...options,
  retryOptions: {
    maxRetries: 3,
    initialDelayMs: 1000,
    onRetry: (attempt, error) => {
      console.log(`[Image Analysis] Retry attempt ${attempt}/3:`, error)
    },
  },
})
```

#### `/src/app/api/ai/tutor/route.ts`
**Status:** ✅ Updated with retry logic

**Implementation:**
- Custom retry wrapper for Anthropic SDK calls
- Retries on 5xx errors, 429 rate limits, and network failures
- Recursive retry implementation with exponential backoff

**Changes:**
```typescript
const createMessageWithRetry = async (attempt = 1, maxRetries = 3): Promise<any> => {
  try {
    return await anthropic.messages.create({...})
  } catch (error: any) {
    const isRetryable =
      error?.status >= 500 ||
      error?.status === 429 ||
      error?.code === 'ECONNRESET' ||
      error?.code === 'ETIMEDOUT'

    if (isRetryable && attempt < maxRetries) {
      const delayMs = 1000 * Math.pow(2, attempt - 1)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
      return createMessageWithRetry(attempt + 1, maxRetries)
    }
    throw error
  }
}
```

#### `/src/app/api/ai/voice-processing/route.ts`
**Status:** ✅ Updated with retry logic

**Implementation:**
- Retry logic for all OpenAI API calls:
  - Speech-to-text (Whisper API)
  - Chat completion (GPT-4)
  - Text-to-speech (TTS API)
- Each API call has independent retry configuration
- Graceful degradation for TTS failures

**Changes:**
- Wrapped Whisper transcription API with `fetchWithRetry`
- Wrapped GPT-4 chat API with `fetchWithRetry`
- Wrapped TTS API with `fetchWithRetry`
- Added retry logging for each service

#### `/src/lib/ceri-ai/streaming/streamHandler.ts`
**Status:** ✅ Updated with retry logic

**Implementation:**
- Retry logic for Anthropic streaming API initialization
- Separate retry function for stream creation
- Configurable retry options via `StreamOptions`

**Changes:**
- Added `createStreamWithRetry` helper function
- Extended `StreamOptions` with `maxRetries` and `retryDelayMs`
- Implemented retry logic for stream connection failures

## API Endpoints Summary

| Endpoint | Status | External Service | Retry Strategy |
|----------|--------|------------------|----------------|
| `/api/ceri-ai/stream` | ✅ Implemented | Anthropic Claude | Stream creation retry (3x, exponential) |
| `/api/ai/image-analysis` | ✅ Implemented | OpenAI Vision | Standard retry (3x, 1s/2s/4s) |
| `/api/ai/tutor` | ✅ Implemented | Anthropic Claude | Custom retry (3x, exponential) |
| `/api/ai/voice-processing` | ✅ Implemented | OpenAI Whisper/GPT-4/TTS | Standard retry (3x, 1s/2s/4s) |
| `/api/ai/unified-chat` | ⚠️ Fallback mode | None | No external calls currently |
| `/api/ai/question-generator` | ⚠️ Disabled | None | Service in upgrade mode |

## Testing Recommendations

### 1. Unit Tests
Create tests for retry utilities:

```typescript
// Test exponential backoff
test('should retry with exponential backoff', async () => {
  let attempts = 0
  const mockFetch = jest.fn(() => {
    attempts++
    if (attempts < 3) throw new Error('Network error')
    return Promise.resolve({ ok: true })
  })

  await fetchWithRetry('https://api.example.com', {
    retryOptions: { maxRetries: 3 },
  })

  expect(attempts).toBe(3)
})

// Test retry on 5xx errors
test('should retry on 500 errors', async () => {
  const mockFetch = jest.fn()
    .mockResolvedValueOnce({ ok: false, status: 500 })
    .mockResolvedValueOnce({ ok: true, status: 200 })

  const response = await fetchWithRetry('https://api.example.com')
  expect(response.ok).toBe(true)
})

// Test no retry on 4xx errors
test('should not retry on 400 errors', async () => {
  const mockFetch = jest.fn()
    .mockResolvedValue({ ok: false, status: 400 })

  await expect(fetchWithRetry('https://api.example.com')).rejects.toThrow()
  expect(mockFetch).toHaveBeenCalledTimes(1)
})
```

### 2. Integration Tests
Test API endpoints with simulated failures:

```typescript
// Test image analysis retry
test('image analysis should retry on OpenAI failures', async () => {
  // Mock OpenAI API to fail twice then succeed
  mockOpenAI
    .mockRejectedValueOnce(new Error('Service unavailable'))
    .mockRejectedValueOnce(new Error('Service unavailable'))
    .mockResolvedValueOnce({ choices: [{ message: { content: 'Analysis' } }] })

  const response = await fetch('/api/ai/image-analysis', {
    method: 'POST',
    body: formData,
  })

  expect(response.ok).toBe(true)
})
```

### 3. Manual Testing Scenarios

#### Test Case 1: Network Interruption
1. Start a chat session
2. Disable network connection
3. Send a message
4. Re-enable network within retry window
5. **Expected:** Message should eventually send successfully

#### Test Case 2: Rate Limiting
1. Send multiple rapid requests to `/api/ai/tutor`
2. **Expected:** 429 errors should trigger retries with backoff
3. **Expected:** Requests should eventually succeed after backoff

#### Test Case 3: Service Outage
1. Temporarily block requests to OpenAI/Anthropic (e.g., using hosts file)
2. Send a request
3. Unblock before max retries exceeded
4. **Expected:** Request should succeed after retries

#### Test Case 4: Timeout Handling
1. Simulate slow API responses (>30s)
2. **Expected:** Request should timeout and retry
3. **Expected:** Max retries should be respected

### 4. Load Testing
Test retry behavior under high load:

```bash
# Use artillery or similar load testing tool
artillery quick --count 100 --num 10 https://your-app.com/api/ai/tutor

# Monitor:
# - Retry rates
# - Success rates after retries
# - Response times
# - Error rates
```

### 5. Monitoring and Observability

#### Metrics to Track
- **Retry Rate:** Percentage of requests requiring retries
- **Retry Success Rate:** Percentage of retried requests that eventually succeed
- **Backoff Duration:** Average time spent in retry backoff
- **Error Types:** Distribution of errors triggering retries

#### Logging
All retry implementations include structured logging:
```typescript
console.log(`[Service Name] Retry attempt ${attempt}/${maxRetries}:`, error.message)
```

Monitor logs for:
- High retry rates (may indicate service issues)
- Frequent max retry failures (may need higher limits)
- Specific error patterns (may need custom handling)

## Performance Considerations

### Latency Impact
- **No Failures:** No additional latency
- **Single Retry:** +1s to +2s (depending on backoff)
- **Max Retries:** +7s total (1s + 2s + 4s)

### Cost Implications
- Retried requests consume additional API quota
- Monitor retry rates to optimize costs
- Consider implementing circuit breakers for persistent failures

### User Experience
- Implement loading states during retries
- Display retry progress to users
- Provide fallback options after max retries

## Best Practices

1. **Always Log Retries:** Track retry attempts for debugging and monitoring
2. **Set Reasonable Timeouts:** Don't let requests hang indefinitely
3. **Implement Circuit Breakers:** For persistent failures, fail fast after detection
4. **Monitor Retry Rates:** High retry rates indicate underlying issues
5. **User Communication:** Inform users when retries are happening
6. **Graceful Degradation:** Provide fallback functionality when retries fail

## Future Enhancements

### 1. Circuit Breaker Pattern
Implement circuit breaker to prevent cascading failures:
```typescript
class CircuitBreaker {
  private failureCount = 0
  private lastFailureTime = 0
  private state: 'closed' | 'open' | 'half-open' = 'closed'

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > 60000) {
        this.state = 'half-open'
      } else {
        throw new Error('Circuit breaker is open')
      }
    }

    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess() {
    this.failureCount = 0
    this.state = 'closed'
  }

  private onFailure() {
    this.failureCount++
    this.lastFailureTime = Date.now()
    if (this.failureCount >= 5) {
      this.state = 'open'
    }
  }
}
```

### 2. Retry Queue
Implement persistent retry queue for failed requests:
- Store failed requests in IndexedDB/localStorage
- Retry in background when connection restored
- Notify users of queued requests

### 3. Adaptive Retry Strategy
Adjust retry parameters based on success rates:
- Increase backoff for consistently failing endpoints
- Decrease retries for consistently successful endpoints
- Implement jitter to prevent thundering herd

### 4. Request Deduplication
Prevent duplicate retries for identical requests:
- Hash request parameters
- Check for in-flight requests
- Return cached promise for duplicates

## Conclusion

The retry mechanism implementation significantly improves the reliability and resilience of the Cerebrum Biology Academy application. By automatically handling transient failures, the system provides a better user experience and reduces the need for manual intervention.

All critical AI API endpoints now have comprehensive retry logic that:
- Handles network failures gracefully
- Respects API rate limits
- Provides detailed logging for debugging
- Maintains type safety with TypeScript
- Follows Next.js best practices

For questions or issues, refer to the implementation files or contact the development team.
