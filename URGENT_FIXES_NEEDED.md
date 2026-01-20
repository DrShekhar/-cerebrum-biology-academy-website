# Urgent Fixes Needed - Aria & Ceri Issues

## Issue 1: Aria Showing Raw JSON Output ❌

**Screenshot Evidence:** Aria is displaying:
```
BOOKING_COMPLETE__:{"date":"2026-01-21","time":"Wed, Jan 21","timeSlot":"afternoon","phone":"882644334","name":""}
```

### Root Cause Analysis:

The current `SalesAgentWidget.tsx` component is **NOT using the AI API** at all! It's a hardcoded rule-based chatbot using pattern matching and KNOWLEDGE_BASE dictionary.

**Evidence:**
- File: `src/components/sales-agent/SalesAgentWidget.tsx`
- Lines 273-364: `sendMessage()` function uses hardcoded responses
- Line 298: `const knowledgeResponse = findResponse(content)` - pattern matching only
- No fetch calls to `/api/aria/chat` anywhere in the component

**However, the API exists:**
- File: `src/app/api/aria/chat/route.ts`
- Uses Claude 3.5 Haiku
- Streaming responses
- IP-based rate limiting

### Why the Raw JSON is Appearing:

One of two scenarios:
1. Someone manually tried calling the API endpoint directly, and the AI response is being displayed without parsing
2. There's a separate Aria implementation somewhere that's using the API but not parsing responses

### Fix Required:

**Option A: Connect SalesAgentWidget to AI API**
- Replace hardcoded `findResponse()` with actual API call to `/api/aria/chat`
- Add streaming response parser
- Handle function calls like `BOOKING_COMPLETE__` properly

**Option B: Fix Response Parser**
- If already connected somewhere, add parser for `BOOKING_COMPLETE__:` format
- Convert JSON to user-friendly message like: "Great! Your demo is booked for Wed, Jan 21 afternoon"

**Recommended: Option A**
The widget should use the actual AI for better conversations, not hardcoded responses.

---

## Issue 2: Ceri Giving Same Answer in Loop on Homepage ❌

**Reported:** "home page ceri button giving same answer in loop"

### Investigation Needed:

1. **Where is the Ceri button on homepage?**
   - Not found in `src/app/page.tsx`
   - Not found in `src/app/(marketing)/page.tsx`
   - Possibly in a component like `AIFeaturesHub` or `AIEducationDashboard`

2. **What's causing the loop?**
   - Could be caching issue (Upstash Redis)
   - Could be session management problem
   - Could be state not resetting between messages

### Files to Check:

- `src/components/ceri-ai/mobile/MobileChatInterface.tsx`
- `src/app/api/ceri-ai/stream/route.ts`
- `src/lib/ceri-ai/` (if exists)

### Likely Causes:

1. **Caching Problem:**
   - Ceri uses Upstash Redis for caching
   - If cache key is same for all requests, returns same response
   - File: `src/app/api/ceri-ai/stream/route.ts`

2. **Session ID Issue:**
   - If session ID not being generated properly
   - All messages might be treated as same conversation
   - Causes AI to repeat itself

3. **Context Not Clearing:**
   - Conversation history not being managed properly
   - AI keeps seeing same context and repeats answer

### Fix Required:

1. Find the exact location of Ceri button on homepage
2. Check if it's using proper session management
3. Verify cache keys are unique per user/session
4. Add `sessionId` or `userId` to API calls
5. Clear conversation history between sessions

---

## Action Items:

### Priority 1: Aria Raw JSON Fix
- [ ] Replace SalesAgentWidget hardcoded responses with AI API calls
- [ ] Add response parser for function calls like `BOOKING_COMPLETE__`
- [ ] Test booking flow end-to-end
- [ ] Ensure graceful fallback if API fails

### Priority 2: Ceri Loop Fix
- [ ] Locate Ceri button on homepage (provide screenshot if possible)
- [ ] Check session/cache key implementation
- [ ] Add unique session IDs per conversation
- [ ] Test that different questions get different answers
- [ ] Verify cache isn't serving stale responses

---

## Testing Checklist:

### Aria Testing:
- [ ] User asks "What are your courses?"
- [ ] User says "Book a demo"
- [ ] User enters name, phone, class
- [ ] Verify booking confirmation message (NOT raw JSON)
- [ ] Check that data is saved to database

### Ceri Testing:
- [ ] Open homepage, click Ceri button
- [ ] Ask Question 1: "What is photosynthesis?"
- [ ] Ask Question 2: "Explain Krebs cycle"
- [ ] Ask Question 3: "What is DNA replication?"
- [ ] Verify: All 3 answers are DIFFERENT and relevant
- [ ] Verify: No repeated/looped responses

---

## Deployment Status:

✅ **Completed:**
- Conditional display for Aria (public pages only)
- Conditional display for Ceri (authenticated pages only)
- WhatsApp FloatingCTA on all pages
- All 9 SEO landing pages live

❌ **Pending:**
- Aria AI integration
- Ceri loop fix

---

**Last Updated:** 2026-01-20
**Status:** 🔴 URGENT - Blocking production launch
