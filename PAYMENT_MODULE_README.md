# Payment History & Invoices Module

## Overview

Comprehensive payment tracking and invoice management system for students in the Cerebrum Biology Academy application.

## Features Implemented

### 1. Database Schema

- Utilizes existing `payments` table for enrollment-based payments
- Utilizes existing `fee_payments` and `installments` tables for fee plan payments
- Supports both direct enrollment payments and fee plan-based installment payments

### 2. API Endpoints

#### `/api/student/payments` (GET)

Fetches all payments for the logged-in student including:

- Enrollment-based payments
- Fee plan payments
- Payment summary (total paid, pending, overdue)
- Payment statistics
- Recent payment history

**Query Parameters:**

- `status`: Filter by payment status (ALL, COMPLETED, PAID, PENDING, PROCESSING, FAILED, CANCELLED)
- `paymentMethod`: Filter by payment method (ALL, RAZORPAY_UPI, RAZORPAY_CARD, etc.)
- `dateFrom`: Filter payments from date
- `dateTo`: Filter payments to date
- `search`: Search by course name or transaction ID

#### `/api/student/payments/upcoming` (GET)

Fetches upcoming and overdue installments:

- Upcoming installments within specified days
- Overdue installments
- Next payment due

**Query Parameters:**

- `daysAhead`: Number of days to look ahead (default: 30)

#### `/api/student/payments/[id]/invoice` (GET)

Generates and returns invoice HTML for a specific payment:

- Professional invoice template
- Student and course details
- Payment information
- Transaction ID
- Academy branding

**Query Parameters:**

- `format`: Response format (html, json)

### 3. UI Components

#### PaymentStatusBadge

- Visual status indicator for payments
- Supports: COMPLETED, PAID, PENDING, PROCESSING, FAILED, CANCELLED, REFUNDED, OVERDUE
- Customizable size and styling
- Animated icons for processing state

#### PaymentHistoryCard

- Individual payment card display
- Shows course, amount, date, payment method, transaction ID
- Invoice download action for completed payments
- Installment information
- Failure reason display for failed payments

#### InvoiceDownloadButton

- Download/view invoice button
- Opens invoice in new tab
- Supports both download and preview
- Loading states and error handling

#### UpcomingPaymentsWidget

- Dashboard widget for upcoming payments
- Displays overdue installments prominently
- Shows days until payment due
- Quick pay action buttons
- Empty state when no payments due

#### PaymentHistoryList

- Complete payment history with filtering
- Search by course name or transaction ID
- Filter by status, payment method, date range
- Export to CSV functionality
- Pagination and result count
- Responsive design

### 4. Main Payment Page (`/student/payments`)

Comprehensive payment management page featuring:

- Payment statistics dashboard
  - Total paid
  - Pending payments
  - Overdue amount
  - Last payment date
- Payment history list with filters
- Upcoming payments widget
- Payment progress tracking
- Quick access to support
- Responsive layout

### 5. Invoice PDF Generation

- Professional HTML invoice template
- Academy branding and details
- Student information
- Course details
- Payment breakdown
- Transaction tracking
- Print-friendly design
- Browser-based PDF generation (via print dialog)

## File Structure

```
src/
├── types/
│   └── payment.ts                          # TypeScript type definitions
├── lib/
│   └── pdf/
│       └── invoiceGenerator.ts             # Invoice HTML generation
├── app/
│   ├── api/
│   │   └── student/
│   │       └── payments/
│   │           ├── route.ts                # Main payments API
│   │           ├── upcoming/
│   │           │   └── route.ts            # Upcoming payments API
│   │           └── [id]/
│   │               └── invoice/
│   │                   └── route.ts        # Invoice generation API
│   └── student/
│       └── payments/
│           └── page.tsx                    # Main payments page
└── components/
    └── student/
        ├── PaymentStatusBadge.tsx          # Status indicator
        ├── PaymentHistoryCard.tsx          # Payment card
        ├── InvoiceDownloadButton.tsx       # Invoice download
        ├── UpcomingPaymentsWidget.tsx      # Upcoming payments
        └── PaymentHistoryList.tsx          # Payment list with filters
```

## Integration Points

### Authentication

- Uses `getServerSession` with `authOptions` from `@/lib/auth`
- Requires authenticated user for all endpoints
- User email used to fetch fee plan payments through leads

### Database

- Uses Prisma Client from `@/lib/prisma`
- Queries `payments`, `fee_payments`, `installments` tables
- Includes relations for enrollments, courses, and fee plans

### Existing Utilities

- `showToast` from `@/lib/toast` for notifications
- `cn` from `@/lib/utils` for className merging
- Motion animations from `framer-motion`
- UI components from `@/components/ui/`

### Payment Gateway

- Razorpay integration (existing)
- Transaction IDs and payment links supported
- Multiple payment methods tracked

## Usage

### For Students

1. Navigate to `/student/payments`
2. View payment history and statistics
3. Filter and search transactions
4. Download invoices for completed payments
5. Track upcoming installments
6. Export payment history to CSV

### For Developers

```typescript
// Fetch all payments
const response = await fetch('/api/student/payments')
const data = await response.json()

// Fetch upcoming payments
const upcoming = await fetch('/api/student/payments/upcoming?daysAhead=30')
const upcomingData = await upcoming.json()

// Download invoice
window.open(`/api/student/payments/${paymentId}/invoice`, '_blank')
```

## TypeScript Types

All types are defined in `/src/types/payment.ts`:

- `StudentPayment`
- `FeePayment`
- `PaymentInstallment`
- `PaymentSummary`
- `PaymentStats`
- `InvoiceData`
- `PaymentFilter`
- And more...

## Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Collapsible filters on mobile
- Grid layouts adapt to screen size

## Error Handling

- Comprehensive try-catch blocks
- User-friendly error messages
- Toast notifications for feedback
- Loading states for async operations
- Graceful fallbacks for missing data

## Security

- Server-side authentication checks
- User-specific data filtering
- SQL injection prevention (Prisma)
- No sensitive data exposure
- Rate limiting ready (through Next.js)

## Performance

- Efficient database queries with Prisma
- Indexed queries for fast retrieval
- Pagination support
- Lazy loading of components
- Optimized re-renders with React hooks

## Future Enhancements

- PDF download (server-side generation with puppeteer/playwright)
- Email invoice delivery
- Payment reminders via email/WhatsApp
- Recurring payment setup
- Payment method management
- Multiple invoice templates
- Bulk invoice download
- Payment analytics charts
- Auto-pay setup for installments

## Testing

To test the module:

1. Log in as a student with payment history
2. Navigate to `/student/payments`
3. Test filtering and search
4. Download invoices
5. View upcoming payments
6. Export CSV

## Dependencies

- Next.js 14+ (App Router)
- React 18+
- Prisma (existing)
- NextAuth (existing)
- Framer Motion (existing)
- Lucide Icons (existing)
- React Hot Toast (existing)
- TailwindCSS (existing)

## Notes

- Invoice generation uses HTML for browser-based PDF conversion
- Students can print invoices using browser print dialog (Ctrl+P / Cmd+P)
- All amounts are in INR by default
- Dates are formatted in Indian locale
- Transaction IDs from Razorpay are tracked
- Both enrollment and fee plan payments are supported
