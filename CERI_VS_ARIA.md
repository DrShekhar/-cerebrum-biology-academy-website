# Ceri AI vs Aria: Chat System Comparison

## Overview

Cerebrum Biology Academy has TWO different AI-powered chat systems serving distinct purposes. Both use Claude AI (Anthropic API) but have different roles, interfaces, and use cases.

---

## Quick Comparison

| Feature                | **Ceri AI**                                      | **Aria**                                          |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------- |
| **Purpose**            | Educational AI Tutor                             | Sales & Admission Agent                           |
| **Target User**        | Students (registered/logged in)                  | Leads & Prospects (anonymous)                     |
| **Primary Use**        | Biology doubts, study help, concept explanations | Course inquiries, demo booking, admission queries |
| **AI Model**           | Claude 3.5 Sonnet (Anthropic)                    | Claude 3.5 Haiku (Anthropic)                      |
| **API Endpoint**       | `/api/ceri-ai/stream/route.ts`                   | `/api/aria/chat/route.ts`                         |
| **Authentication**     | Required (JWT session)                           | Not required (IP-based rate limiting)             |
| **Interface Location** | Dashboard, dedicated `/ai-education-demo` page   | Embedded widget on landing pages                  |
| **Streaming**          | Yes (SSE streaming)                              | Yes (streaming responses)                         |
| **Caching**            | Upstash Redis (edge-compatible)                  | None                                              |
| **Runtime**            | Edge runtime                                     | Node.js runtime                                   |
| **Rate Limiting**      | 50 requests/hour per user                        | 50 requests/hour per IP                           |
| **Multi-language**     | No (English only)                                | Yes (English, Hindi, Spanish)                     |
| **Context Awareness**  | Yes (user profile, learning history)             | Yes (current page, lead stage)                    |

---

## Ceri AI (Educational Tutor)

### What is Ceri?

**Ceri** = **C**erebrum **E**ducational **R**esearch **I**ntelligence

An AI-powered biology tutor designed to help students with:

- Doubts in NEET Biology topics
- Concept explanations (Botany, Zoology, Human Physiology)
- Practice question solving
- Study strategy and time management
- Exam preparation tips

### Key Features

- **Personalized Learning**: Adapts to student's learning pace and style
- **Topic-wise Help**: Covers all NEET Biology chapters
- **Visual Learning**: Can explain diagrams, processes, and mechanisms
- **Multi-modal Input**: Text, image upload (for diagrams), voice input
- **Study Tracker**: Tracks topics covered and weak areas
- **Mock Test Integration**: Can generate practice questions

### Technical Details

```typescript
// Location
src/app/api/ceri-ai/stream/route.ts
src/components/ceri-ai/
src/lib/ceri-ai/

// AI Model
Claude 3.5 Sonnet (Anthropic)

// Authentication
Required - Uses JWT session validation
Only logged-in students can access

// Caching
Uses Upstash Redis for response caching (reduces API costs)

// System Prompt Focus
- NEET Biology curriculum expert
- Conceptual understanding over rote learning
- Diagrams and visual explanations
- NCERT textbook alignment
```

### Where is Ceri Used?

1. **Student Dashboard** (`/dashboard`)
2. **AI Demo Page** (`/ai-education-demo`)
3. **Mobile App** (iOS/Android)
4. **Course Pages** (for enrolled students)

### User Experience

```
Student: "Explain Krebs cycle with diagram"

Ceri: [Provides detailed explanation with ASCII diagram]
"The Krebs cycle (Citric Acid Cycle) occurs in the mitochondrial matrix...
[Step-by-step breakdown with molecular structures]
[Practice questions at the end]"
```

---

## Aria (Sales Agent)

### What is Aria?

**Aria** = **A**utomated **R**esponsive **I**nquiry **A**ssistant

An AI sales agent designed to convert website visitors into leads by:

- Answering course inquiries
- Providing fee structure and batch information
- Booking demo classes
- Collecting contact information
- Qualifying leads

### Key Features

- **24/7 Availability**: Always online to respond to inquiries
- **Multi-language**: Supports English, Hindi, Spanish
- **Context-Aware**: Knows which page user is browsing
- **Lead Qualification**: Asks qualifying questions (class, goals, location)
- **Demo Booking**: Can directly book demo class slots
- **Instant Responses**: Fast, conversational replies

### Technical Details

```typescript
// Location
src/app/api/aria/chat/route.ts
src/components/sales-agent/
src/lib/aria/

// AI Model
Claude 3.5 Haiku (Anthropic) - Faster, more cost-effective

// Authentication
Not required - Open to all visitors
IP-based rate limiting (50 requests/hour per IP)

// System Prompt Focus
- Sales & admission queries
- Course features and benefits
- Fee structure and payment options
- Demo class booking
- Lead data collection (name, phone, email, class)
```

### Where is Aria Used?

1. **Landing Pages** (all SEO pages)
2. **Homepage** (embedded widget)
3. **Pricing Page**
4. **Course Pages** (for non-logged-in visitors)

### User Experience

```
Visitor: "What is the fee for NEET coaching?"

Aria: "Great question! Our NEET Biology coaching starts at ₹15,000/month
for Class 11-12. Would you like to:

1. Book a FREE demo class
2. Download detailed course brochure
3. Talk to our counselor

What's your current class? 📚"
```

---

## Why Two Separate Systems?

### 1. **Different User Journeys**

- **Ceri**: Serves students AFTER enrollment (retention, learning)
- **Aria**: Serves prospects BEFORE enrollment (acquisition, conversion)

### 2. **Cost Optimization**

- **Ceri**: Uses Sonnet (more powerful, better for complex topics) with caching
- **Aria**: Uses Haiku (faster, cheaper, good for sales queries)

### 3. **Security & Privacy**

- **Ceri**: Authenticated access (protects student data, learning history)
- **Aria**: Public access (no sensitive data, just lead generation)

### 4. **Specialization**

- **Ceri**: Trained on NEET Biology curriculum, NCERT textbooks
- **Aria**: Trained on course catalog, pricing, admission process

---

## Do We Need Both?

### ✅ YES - Keep Both Systems

**Reasons:**

1. **Different Objectives**
   - Ceri = Education (value delivery)
   - Aria = Sales (lead generation)

2. **Different User Contexts**
   - Ceri = Logged-in students (known users)
   - Aria = Anonymous visitors (unknown prospects)

3. **Cost Control**
   - Separating allows different rate limits and caching strategies
   - Ceri can have aggressive caching (biology concepts don't change often)
   - Aria needs real-time pricing/availability info

4. **Compliance & Privacy**
   - Ceri handles student PII (protected under EdTech regulations)
   - Aria only collects lead data (GDPR/marketing consent)

### ❌ What NOT to Do

**Don't merge them because:**

- Sales conversations mixed with educational content confuses AI
- Students would get sales pitches during study sessions (bad UX)
- Prospects would see curriculum content they can't access (paywall frustration)
- Different rate limits and caching needs would conflict

---

## Current Issues (From Screenshots)

### Issue 1: Floating CTA Overlap

**Problem**: StickyCTA (bottom bar, z-50) overlaps with FloatingCTA (WhatsApp button, z-70)

**Solution Implemented**:

- Reduced StickyCTA z-index to z-40
- Adjusted mobile FloatingCTA position: `bottom-20` instead of `bottom-24`
- Added desktop spacing: `lg:mr-[280px]` to StickyCTA to avoid FloatingCTA

### Issue 2: Confusion About Chat Buttons

**Problem**: Users see multiple chat entry points:

1. FloatingCTA (green WhatsApp button - NOT AI)
2. Aria widget (sales chat - AI)
3. Ceri button (if logged in - educational AI)

**Clarification**:

- **WhatsApp Button** (FloatingCTA) = Direct human contact (not AI)
- **Aria Chat Widget** = AI sales agent (for prospects)
- **Ceri Button** = AI educational tutor (for students)

---

## API Usage & Costs

### Ceri AI (Sonnet)

```
Cost: ~$0.015 per request (with caching)
Requests: ~500/day (logged-in students only)
Monthly Cost: ~$225
```

### Aria (Haiku)

```
Cost: ~$0.003 per request (no caching)
Requests: ~2,000/day (all website visitors)
Monthly Cost: ~$180
```

**Total AI Cost**: ~$405/month (both systems)

---

## Recommendations

### 1. **Branding Clarity**

Add visual differentiation:

- **Ceri**: Blue/purple brain icon, "Your AI Tutor"
- **Aria**: Green chat icon, "Ask About Courses"

### 2. **Conditional Display**

- Show **only Aria** on public pages (landing, pricing, courses)
- Show **only Ceri** on authenticated pages (dashboard, tests, videos)
- Show **WhatsApp** everywhere (direct human contact fallback)

### 3. **Usage Tracking**

Implement analytics to track:

- Ceri: Doubt resolution rate, topics asked, student satisfaction
- Aria: Lead conversion rate, demo bookings, qualified leads

### 4. **Future Integration**

Consider a "handoff" flow:

```
Prospect → Aria (sales) → Books Demo → Enrolls → Ceri (education)
```

---

## Summary

| Question                   | Answer                                             |
| -------------------------- | -------------------------------------------------- |
| **Why two chat buttons?**  | Different purposes: Ceri = Education, Aria = Sales |
| **Which uses AI API?**     | **Both** use Claude (Anthropic API)                |
| **What's the difference?** | Ceri = Student tutor, Aria = Sales agent           |
| **Do we need both?**       | **Yes** - different user journeys and objectives   |
| **What about WhatsApp?**   | That's **not AI** - direct human contact           |

---

## Contact

For questions about:

- **Ceri AI**: Check `/src/lib/ceri-ai/` documentation
- **Aria**: Check `/src/lib/aria/` documentation
- **API Issues**: Contact DevOps team

**Last Updated**: January 2026
