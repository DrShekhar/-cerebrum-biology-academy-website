# Cerebrum Biology Academy Architecture

## Overview

Full-stack educational platform for NEET Biology preparation.

## Key Components

### Frontend

- Next.js 15 App Router
- React Server Components
- Tailwind CSS + Radix UI
- PWA-enabled

### Backend

- API Routes in `src/app/api/`
- Prisma ORM with Supabase PostgreSQL
- Edge-compatible middleware

### Authentication

- NextAuth v5 (AuthJS)
- Firebase Phone OTP
- Session cookies with JWT

### External Services

- Vercel (Hosting)
- Supabase (Database)
- Firebase (Phone Auth)
- Razorpay (Payments)
- Sentry (Monitoring)

## Data Flow

1. User authenticates via Firebase Phone OTP
2. Backend verifies and creates session
3. Session cookie set for subsequent requests
4. Protected routes check session middleware
