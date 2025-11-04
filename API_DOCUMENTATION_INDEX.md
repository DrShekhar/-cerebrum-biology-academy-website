# API Documentation Index

Welcome! This directory contains comprehensive documentation about the Cerebrum Biology Academy API architecture.

## Documents Overview

### 1. **API_ROUTES_MAPPING.md** (Main Reference)

**Size:** 500 lines | **Type:** Comprehensive Reference Guide

The most detailed document. Contains complete mapping of all 113 API endpoints organized by category.

**Sections:**

- Executive Summary
- 13 detailed sections covering all route categories
- Authentication patterns & security
- Database integration details
- External service mappings
- Routes needing database migration
- Data validation summary
- Endpoint statistics
- Flow diagrams for key operations

**Best For:**

- Understanding overall architecture
- Finding specific endpoints
- Learning data flow patterns
- Backend developers starting on project

**Key Tables:**

- All 113 endpoints with methods, purposes, and data sources
- Mock data routes list (8 endpoints)
- Real database routes (105 endpoints)
- External service integrations

---

### 2. **API_QUICK_REFERENCE.md** (Developer Guide)

**Size:** 455 lines | **Type:** Quick Reference + Implementation Guide

Focused practical guide for developers actively working with the APIs.

**Sections:**

- Mock data migration priority list (URGENT, HIGH, MEDIUM)
- Database integration checklist
- Real-time data flow examples
- Authentication & authorization patterns
- Rate limiting implementation
- Database optimization recommendations
- External service configuration
- Error handling standards
- Testing examples with curl commands
- Key files to understand
- Performance tips

**Best For:**

- Getting started quickly
- Migration planning
- Integration implementation
- Testing and debugging
- Performance optimization

**Includes:**

- Specific file paths and line numbers for migrations
- Prisma schema examples
- Configuration variables needed
- Curl command examples for testing

---

### 3. **API_ANALYSIS_SUMMARY.txt** (Executive Summary)

**Size:** 352 lines | **Type:** Strategic Overview

High-level summary perfect for stakeholders and project planning.

**Sections:**

- Key findings (statistics at a glance)
- Breakdown by category (10 categories)
- Mock data routes priority list
- Authentication & security patterns
- Data validation approach
- Database integration summary
- External service integrations
- Key strengths (6 major strengths)
- Areas for improvement (5 key areas)
- Recommended next steps (Timeline-based)

**Best For:**

- Project managers
- Technical leads
- Understanding project status
- Strategic planning
- Stakeholder updates

**Key Metrics:**

- 93% database-backed endpoints (105/113)
- 7% mock data endpoints (8/113)
- Database tables affected
- External services integrated

---

## Quick Navigation by Use Case

### "I need to understand the whole system"

1. Start with **API_ANALYSIS_SUMMARY.txt** (5-10 min read)
2. Then read **API_ROUTES_MAPPING.md** sections 1, 13, 14 (15-20 min)
3. Reference **API_QUICK_REFERENCE.md** as needed

### "I'm fixing mock data routes"

1. Go to **API_QUICK_REFERENCE.md** → "Mock Data Routes - PRIORITY MIGRATION LIST"
2. Reference **API_ROUTES_MAPPING.md** → Section 4 & 15
3. Use specific file paths and line numbers provided

### "I'm implementing a new feature"

1. Find your feature category in **API_ROUTES_MAPPING.md**
2. Review Authentication Patterns (Section 13)
3. Check Database Integration (Section 14)
4. Use **API_QUICK_REFERENCE.md** for implementation details

### "I need to optimize performance"

1. Check **API_QUICK_REFERENCE.md** → "Database Query Optimization Needs"
2. Review **API_ROUTES_MAPPING.md** → Section 14 (Database Integration)
3. Implement recommended indexes from quick reference

### "I'm debugging an issue"

1. Find the endpoint in **API_ROUTES_MAPPING.md** (Section 1-12)
2. Check error handling standards in **API_QUICK_REFERENCE.md**
3. Review the data flow diagram in **API_ROUTES_MAPPING.md**
4. Use curl testing examples from **API_QUICK_REFERENCE.md**

---

## Key Statistics

```
Total API Endpoints:        113
Database-Backed Routes:     105 (93%)
Mock Data Routes:           8 (7%)

By Category:
- Authentication:           13 routes (100% real DB)
- Testing & Assessment:     20 routes (95% real DB)
- Payments & Enrollment:    8 routes (100% real DB)
- Analytics & Reporting:    15 routes (93% real DB)
- AI & Content:             12 routes (100% real DB)
- Admin & Management:       10 routes (100% real DB)
- Demo Booking:             6 routes (100% real DB)
- Calendar & Availability:  2 routes (0% real DB - NEEDS WORK)
- Notifications:            7 routes (100% real DB)
- Utility & Monitoring:     17 routes (82% real DB)

External Services:
- Razorpay:     Payment processing
- MSG91:        SMS & WhatsApp
- Claude AI:    Content generation
- Vercel Blob:  File storage
```

---

## Priority Actions

### Week 1 (Immediate)

1. [ ] Migrate `/api/calendar/availability` to Prisma
2. [ ] Replace mock data in `/api/analytics/dashboard`

### Week 2-3

3. [ ] Add database indexes for performance
4. [ ] Move rate limiting from in-memory to Redis
5. [ ] Standardize error handling

### Month 1

6. [ ] Create OpenAPI/Swagger documentation
7. [ ] Set up API monitoring
8. [ ] Add comprehensive logging

---

## Authentication Quick Reference

```
Protected Routes Use:
- withAuth() middleware
- Session/JWT validation
- Rate limiting checks
- Zod schema validation

Authorization Roles:
- ADMIN:     Full access
- TEACHER:   Grade management
- STUDENT:   Personal data only
- PARENT:    Child's progress

Rate Limits:
- Signin:     5 attempts/hour per email+IP
- OTP:        5/hour, max 2/5min per phone
- Test:       10 creations/hour per user
- Demo:       5 bookings/15min per IP
```

---

## Database Quick Reference

```
Primary ORM:     Prisma
Database:        PostgreSQL
Key Tables:      user, testSession, question, analyticsEvent
High-Query:      user, testSession, question, demoBooking

Tables Needing Indexes:
- User.phone
- TestSession.userId
- Question.topic
- DemoBooking.createdAt
- AnalyticsEvent.userId
```

---

## Testing API Quickly

### Register New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "phone": "9876543210",
    "role": "student"
  }'
```

### Sign In

```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### Get Protected Data

```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <token_from_signin>"
```

See **API_QUICK_REFERENCE.md** for more testing examples.

---

## File Locations

```
Project Root: /Users/drshekhar/cerebrum-biology-academy-website/

Key Directories:
- src/app/api/             All API route handlers (113 files)
- src/lib/auth/            Authentication utilities
- src/lib/prisma.ts        Prisma client
- src/lib/db-admin.ts      Admin database client
- prisma/schema.prisma     Database schema

Documentation Files:
- API_ROUTES_MAPPING.md         [This folder]
- API_QUICK_REFERENCE.md        [This folder]
- API_ANALYSIS_SUMMARY.txt      [This folder]
- API_DOCUMENTATION_INDEX.md    [This folder - You are here]
```

---

## Connecting the Documents

```
API_DOCUMENTATION_INDEX.md (You are here)
    ↓
    ├─→ Need quick overview?
    │   └─→ Read API_ANALYSIS_SUMMARY.txt (10 min)
    │       • Key statistics
    │       • Mock data routes list
    │       • Next steps
    │
    ├─→ Need complete reference?
    │   └─→ Read API_ROUTES_MAPPING.md (30-40 min)
    │       • All 113 endpoints detailed
    │       • Database patterns
    │       • Security details
    │       • Flow diagrams
    │
    └─→ Need to implement/fix something?
        └─→ Use API_QUICK_REFERENCE.md (as needed)
            • Migration guides
            • Code examples
            • Configuration details
            • Testing commands
```

---

## Tips for Reading These Docs

1. **Bookmark sections** you'll reference frequently
2. **Use Ctrl+F** to search within documents
3. **Keep API_ROUTES_MAPPING.md** open as reference while developing
4. **Follow timelines** from API_ANALYSIS_SUMMARY.txt for planning
5. **Use API_QUICK_REFERENCE.md** for implementation details

---

## Questions & Common Scenarios

### Q: Where do I find a specific endpoint?

**A:** Use API_ROUTES_MAPPING.md sections 1-12, organized by category

### Q: Which routes use mock data?

**A:** See "Mock Data Routes" section in all three documents, or API_ROUTES_MAPPING.md section 4

### Q: How do I add authentication to my route?

**A:** Check Authentication Patterns in API_QUICK_REFERENCE.md or API_ROUTES_MAPPING.md section 13

### Q: What database tables should I add indexes to?

**A:** API_QUICK_REFERENCE.md "Database Query Optimization Needs" section

### Q: How do I test the API?

**A:** API_QUICK_REFERENCE.md "Testing the API" section with curl examples

### Q: What external services are integrated?

**A:** See "External Service Integration Points" in API_QUICK_REFERENCE.md

### Q: What are the migration priorities?

**A:** API_QUICK_REFERENCE.md first section lists them clearly with timelines

---

## Document Maintenance

- **Last Updated:** 2025-11-04
- **Analysis Date:** 2025-11-04
- **Total Routes Analyzed:** 113
- **Documentation Completeness:** 100% (all routes covered)
- **Next Review:** After major feature additions or architecture changes

---

## Contact & Support

For questions about these APIs:

1. Check the relevant documentation
2. Review the code at `/src/app/api/`
3. Look for inline comments in route files
4. Check `.env.example` for configuration needs

---

**Happy coding!** These documents should serve as your complete guide to the Cerebrum Biology Academy API architecture.
