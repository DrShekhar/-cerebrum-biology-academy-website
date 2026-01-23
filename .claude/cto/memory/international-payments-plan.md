# International Payments Architecture Plan

**Created**: 2026-01-24
**Status**: Planning
**Priority**: P1 (High - enables international student market)

---

## Current State

- **Payment Provider**: Razorpay (India-only)
- **Currency**: INR hardcoded
- **Location**: `src/app/api/payments/`
- **Types**: `src/types/payment.ts`

---

## International Payment Strategy

### Option A: Razorpay International (Recommended)

**Pros:**
- Same integration, minimal code changes
- Supports 100+ currencies
- Auto currency conversion to INR for settlement
- Familiar dashboard
- Lower integration effort

**Cons:**
- Settlement in INR only
- 2% international card fees
- Limited to Razorpay supported countries

**Implementation:**
1. Enable International Payments in Razorpay Dashboard
2. Update `create-order` to accept currency parameter
3. Add currency detection based on user location
4. Show prices in user's currency

### Option B: Stripe (Secondary International)

**Pros:**
- Best for US/EU markets
- Native multi-currency settlement
- Superior fraud detection
- Apple Pay, Google Pay support
- PaymentIntents API is modern

**Cons:**
- Separate integration effort
- Two dashboards to manage
- Need Stripe Atlas for Indian business

**Use Case:** NRI students in US/UK/Canada/Australia

### Option C: PayPal (Optional)

**Pros:**
- Trusted by international users
- PayPal balance payments
- Popular in US market

**Cons:**
- Higher fees (4.4% + fixed fee)
- Holds/disputes more common
- Dated integration pattern

---

## Recommended Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Payment Gateway                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌───────────────┐  ┌───────────────┐  ┌─────────────┐ │
│  │   Razorpay    │  │    Stripe     │  │   PayPal    │ │
│  │  (Primary)    │  │ (Int'l USD)   │  │  (Future)   │ │
│  └───────┬───────┘  └───────┬───────┘  └──────┬──────┘ │
│          │                  │                  │        │
│          └────────┬─────────┴──────────────────┘        │
│                   │                                      │
│         ┌─────────▼─────────┐                           │
│         │ Payment Selector  │                           │
│         │  (by location/    │                           │
│         │   currency)       │                           │
│         └─────────┬─────────┘                           │
│                   │                                      │
│         ┌─────────▼─────────┐                           │
│         │  Unified Payment  │                           │
│         │      Service      │                           │
│         └───────────────────┘                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Razorpay International (Week 1-2)

**Tasks:**
1. [ ] Enable International on Razorpay Dashboard
2. [ ] Update `create-order/route.ts` to support multiple currencies
3. [ ] Add geo-location detection (via IP or user profile)
4. [ ] Create currency selector component
5. [ ] Update payment types to include currency
6. [ ] Test with test international cards

**Code Changes:**

```typescript
// src/app/api/payments/create-order/route.ts
const SUPPORTED_CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD', 'AED']

export async function POST(request: NextRequest) {
  const { amount, currency = 'INR', ...rest } = await request.json()

  // Validate currency
  if (!SUPPORTED_CURRENCIES.includes(currency)) {
    return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })
  }

  // Amount conversion handled by Razorpay
  const order = await razorpay.orders.create({
    amount: Math.round(amount * 100), // Smallest currency unit
    currency,
    ...rest
  })
}
```

### Phase 2: Stripe Integration (Week 3-4)

**For NRI students in US/UK/Australia**

**Tasks:**
1. [ ] Set up Stripe account (via Stripe Atlas if needed)
2. [ ] Install Stripe SDK: `npm install stripe @stripe/stripe-js`
3. [ ] Create Stripe API routes
4. [ ] Add payment method selection UI
5. [ ] Implement Stripe webhooks
6. [ ] Update database schema for Stripe IDs

**New Files:**
```
src/lib/payments/stripeService.ts
src/app/api/payments/stripe/create-intent/route.ts
src/app/api/payments/stripe/webhook/route.ts
src/components/payments/PaymentMethodSelector.tsx
```

### Phase 3: Unified Payment Service (Week 5)

**Tasks:**
1. [ ] Create abstract PaymentProvider interface
2. [ ] Implement Razorpay adapter
3. [ ] Implement Stripe adapter
4. [ ] Payment routing based on currency/location
5. [ ] Unified payment status tracking
6. [ ] Dashboard for multi-provider reporting

---

## Currency Detection Strategy

```typescript
// src/lib/payments/currencyDetection.ts

export async function detectUserCurrency(request: NextRequest): Promise<string> {
  // 1. Check user profile setting (if logged in)
  const session = await auth()
  if (session?.user?.preferredCurrency) {
    return session.user.preferredCurrency
  }

  // 2. Geo-IP detection
  const country = request.headers.get('cf-ipcountry') // Cloudflare
    || request.headers.get('x-vercel-ip-country') // Vercel

  const currencyMap: Record<string, string> = {
    'IN': 'INR',
    'US': 'USD',
    'GB': 'GBP',
    'EU': 'EUR',
    'AU': 'AUD',
    'CA': 'CAD',
    'AE': 'AED',
    'SG': 'SGD',
  }

  return currencyMap[country] || 'USD' // Default to USD for international
}
```

---

## Pricing Strategy

| Course | INR | USD | EUR | GBP |
|--------|-----|-----|-----|-----|
| Intensive NEET Biology | ₹99,000 | $1,199 | €1,099 | £949 |
| Foundation Course | ₹49,000 | $599 | €549 | £479 |
| Crash Course | ₹29,000 | $349 | €329 | £289 |

**Pricing Logic:**
- INR: Base price
- USD: ~1.2% premium (covers forex + fees)
- EUR: ~10% premium
- GBP: ~15% premium

Store prices in database per course per currency.

---

## Database Schema Updates

```prisma
// Add to schema.prisma

model CoursePricing {
  id        String   @id @default(cuid())
  courseId  String
  currency  String   // INR, USD, EUR, GBP
  amount    Int      // In smallest unit (paise, cents)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  course    Course   @relation(fields: [courseId], references: [id])

  @@unique([courseId, currency])
}

model Payment {
  // Existing fields...
  currency          String    @default("INR")
  originalAmount    Int?      // Amount in original currency
  originalCurrency  String?   // Original currency code
  exchangeRate      Float?    // Exchange rate at time of payment
  stripePaymentId   String?   // For Stripe payments
  paymentProvider   String    @default("razorpay") // razorpay | stripe | paypal
}
```

---

## Security Considerations

1. **PCI Compliance**: Both Razorpay and Stripe handle card data (PCI DSS compliant)
2. **Webhook Verification**: Validate signatures for all providers
3. **Rate Limiting**: Already implemented (20 requests/hour)
4. **Currency Validation**: Whitelist supported currencies
5. **Amount Validation**: Server-side price verification

---

## Tax & Compliance

### India (GST)
- 18% GST on educational services
- Already included in INR pricing
- GSTIN displayed on invoices

### International
- No GST for exports of services
- Check local tax requirements for:
  - US: No federal sales tax on digital services
  - EU: VAT may apply (consider MOSS registration)
  - UK: VAT on digital services to consumers

---

## Testing Checklist

- [ ] Razorpay test mode with international cards
- [ ] Stripe test mode with various card types
- [ ] Currency conversion accuracy
- [ ] Webhook delivery and processing
- [ ] Refund flow for each provider
- [ ] Failed payment handling
- [ ] Edge cases (currency mismatch, timeout)

---

## Rollout Plan

1. **Alpha**: Internal testing with test credentials
2. **Beta**: Enable for select international leads (manual)
3. **GA**: Full launch with currency auto-detection

---

## Estimated Timeline

| Phase | Duration | Outcome |
|-------|----------|---------|
| Phase 1 (Razorpay Int'l) | 2 weeks | Multi-currency via Razorpay |
| Phase 2 (Stripe) | 2 weeks | USD/EUR via Stripe |
| Phase 3 (Unified) | 1 week | Single payment service |
| Testing & QA | 1 week | Production ready |

**Total: 6 weeks to full international payments**

---

## Next Steps

1. Enable Razorpay International in dashboard
2. Update `create-order` API to accept currency
3. Add pricing table with multi-currency support
4. Create payment method selector component
