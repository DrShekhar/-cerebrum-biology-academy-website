# Pricing Page Implementation Plan - APPROVED

**Date:** October 28, 2025
**Status:** ✅ APPROVED - Ready to Implement
**Build:** Local first, commit after approval

---

## 📋 COMPLETE PRICING STRUCTURE (FINAL)

### **CLASS IX & X - FOUNDATION (1 Year)**

| Tier         | Batch | Academic Only | NEET + Academic | Lump Sum | 2 Inst  | 3 Inst  |
| ------------ | ----- | ------------- | --------------- | -------- | ------- | ------- |
| **PINNACLE** | 10-12 | ₹60,000       | ₹90,000         | ₹90,000  | ₹93,000 | ₹96,000 |
| **ASCENT**   | 16-18 | ₹50,000       | ₹60,000         | ₹60,000  | ₹62,000 | ₹63,000 |
| **PURSUIT**  | 30-40 | ₹40,000       | ₹45,000         | ₹45,000  | ₹47,000 | ₹48,000 |

---

### **CLASS XI (1 Year)**

| Tier         | Batch | Board Only | Board + NEET | Lump Sum | 2 Inst    | 3 Inst    |
| ------------ | ----- | ---------- | ------------ | -------- | --------- | --------- |
| **PINNACLE** | 10-12 | ₹65,000    | ₹98,000      | ₹98,000  | ₹1,04,000 | ₹1,08,000 |
| **ASCENT**   | 16-18 | ₹58,000    | ₹76,000      | ₹76,000  | ₹78,000   | ₹79,000   |
| **PURSUIT**  | 30-40 | ₹40,000    | ₹48,000      | ₹48,000  | ₹50,000   | ₹51,000   |

---

### **CLASS XII / DROPPERS (1 Year)**

| Tier         | Batch | NEET Only | Test Series | Lump Sum  | 2 Inst    | 3 Inst    |
| ------------ | ----- | --------- | ----------- | --------- | --------- | --------- |
| **PINNACLE** | 10-12 | ₹1,56,000 | +₹8,000     | ₹1,56,000 | ₹1,58,000 | ₹1,59,000 |
| **ASCENT**   | 16-18 | ₹70,000   | +₹8,000     | ₹70,000   | ₹72,000   | ₹73,000   |
| **PURSUIT**  | 30-40 | ₹70,000   | +₹8,000     | ₹70,000   | ₹72,000   | ₹75,000   |

---

### **2-YEAR COURSE (Class XI + XII Combined)**

| Tier         | Batch | Total     | Lump Sum  | 2 Inst/Year | 3 Inst/Year | Savings    |
| ------------ | ----- | --------- | --------- | ----------- | ----------- | ---------- |
| **PINNACLE** | 10-12 | ₹1,80,000 | ₹1,80,000 | ₹1,88,000   | ₹1,92,000   | Save ₹12K! |
| **ASCENT**   | 16-18 | ₹1,40,000 | ₹1,40,000 | ₹1,46,000   | ₹1,49,000   | Save ₹9K!  |
| **PURSUIT**  | 30-40 | ₹90,000   | ₹85,000   | ₹89,000     | ₹93,000     | Save ₹8K!  |

---

### **ADD-ON COURSES**

#### **Mentor Plus** (PUBLIC)

- **Price:** ₹1,50,000/year
- **Page:** `/courses/mentor-plus` (NEW - Create)
- **Description:** Weekly consultation & counseling, motivation, study accountability
- **Available with:** ANY tier (Pinnacle, Ascent, Pursuit, Foundation)
- **Display:** Show on pricing page as add-on checkbox

#### **Test Series** (PUBLIC)

- **Price:** ₹8,000/year
- **Description:** Comprehensive NEET mock test series
- **Available with:** All NEET courses
- **Display:** Show as optional add-on

#### **Intensive Program** (HIDDEN)

- **Price:** ₹3,60,000 + Pinnacle Fee (Total: ₹5.16L - ₹5.4L)
- **Page:** `/courses/intensive-program` (NEW - Create, Hidden)
- **Description:** Ultra-personalization, planning, follow-ups, task management
- **Available with:** ONLY Pinnacle tier
- **Access:** Shown only after demo class (cookie: `demo_attended=true`)
- **Display:** Teaser on pricing page: "Learn about our exclusive Intensive Program"

---

## 🎨 DESIGN REQUIREMENTS

### **CRITICAL:** Maintain Existing Design

- ✅ Keep same color scheme (blue/purple gradients)
- ✅ Keep same card layouts
- ✅ Keep same spacing and typography
- ✅ Keep same animations and hover effects
- ✅ Keep same responsive design
- ✅ Keep same comparison table styling
- ✅ Keep same FAQ section
- ✅ Keep same CTA sections

### **ONLY Update:**

- ❌ Data/content (prices, features, batch sizes)
- ❌ Logic (add class selector, tier selector)
- ❌ Add new sections (comparison tables, savings calculator)

---

## 🔨 Implementation Tasks

### **Phase 1: Update Pricing Page** (`/pricing`)

#### **Task 1.1: Add Class Selector** (30 mins)

```typescript
const [selectedClass, setSelectedClass] = useState<
  'foundation' | 'class-11' | 'class-12' | '2-year' | 'dropper'
>('2-year')
```

**UI:**

```
┌─────────────────────────────────────────────────┐
│ Select Your Class:                              │
│ ○ Class IX   ○ Class X   ○ Class XI            │
│ ○ Class XII  ○ Dropper   ● 2-Year Complete     │
└─────────────────────────────────────────────────┘
```

#### **Task 1.2: Add Course Type Toggle** (20 mins)

For Class IX, X, XI only:

```typescript
const [courseType, setCourseType] = useState<'academic' | 'neet'>('neet')
```

**UI:**

```
┌─────────────────────────────────────────────────┐
│ ○ Academic/Board Only    ● Academic + NEET     │
└─────────────────────────────────────────────────┘
```

#### **Task 1.3: Update Tier Cards** (1 hour)

- Keep existing card component
- Update data source to pull from pricing matrix
- Show correct prices based on `selectedClass` and `courseType`
- Display batch sizes per tier
- Show installment options dynamically

**Current Card Structure (Keep):**

```jsx
<div className="pricing-card">
  <h3>{tier.name}</h3>
  <div className="price">₹{tier.price}</div>
  <div className="batch-size">{tier.batchSize} students</div>
  <ul className="features">{tier.features}</ul>
  <Button>Enroll Now</Button>
</div>
```

**Just Update Data:**

```typescript
const getPricingForSelection = (class, type, tier) => {
  // Return correct pricing from matrix
}
```

#### **Task 1.4: Add Payment Mode Selector** (30 mins)

```typescript
const [paymentMode, setPaymentMode] = useState<'lump' | '2-inst' | '3-inst'>('lump')
```

**UI (Keep existing toggle design):**

```
● Lump Sum: ₹1,80,000 (SAVE ₹12,000!) ⭐
○ 2 Instalments: ₹1,88,000 (₹94K × 2)
○ 3 Instalments: ₹1,92,000 (₹64K × 3)
```

#### **Task 1.5: Add Add-ons Section** (30 mins)

After tier selection, show checkboxes:

```
Optional Add-ons:
┌─────────────────────────────────────────────────┐
│ ☐ Mentor Plus (+₹1,50,000/year)                │
│   Weekly counseling & study accountability      │
│   [Learn More →]                                │
│                                                  │
│ ☐ Test Series (+₹8,000/year)                   │
│   Comprehensive NEET mock tests                 │
│   [Learn More →]                                │
└─────────────────────────────────────────────────┘
```

#### **Task 1.6: Add Comparison Table** (1 hour)

Keep existing table styling, just add more rows:

```
| Feature | Pinnacle | Ascent | Pursuit |
|---------|----------|--------|---------|
| Batch Size | 10-12 | 16-18 | 30-40 |
| Hours/Week | 5-6 hrs | 4-5 hrs | 3-4 hrs |
| Personal Mentorship | ✅ | ❌ | ❌ |
| AI Doubt Bot | ✅ | ✅ | ✅ |
| Study Materials | ✅ | ✅ | ✅ |
| Mock Tests | 50+ | 30+ | 20+ |
| Money-back Guarantee | ✅ | ❌ | ❌ |
```

#### **Task 1.7: Add Intensive Teaser** (20 mins)

At bottom of page (before FAQ):

```jsx
<div className="intensive-teaser gradient-box">
  <SparklesIcon />
  <h3>🔥 Cerebrum Intensive Program</h3>
  <p>"Our most exclusive offering for top achievers"</p>
  <p>Ultra-personalized coaching • Available with Pinnacle</p>

  {hasDemoAccess ? (
    <Button href="/courses/intensive-program">Learn More</Button>
  ) : (
    <Button onClick={openDemoBooking}>Attend Demo to Unlock</Button>
  )}
</div>
```

**Check demo access:**

```typescript
const hasDemoAccess =
  cookies.get('demo_attended') === 'true' || searchParams.get('ref') === 'counselor'
```

---

### **Phase 2: Create Mentor Plus Page** (`/courses/mentor-plus`)

#### **Task 2.1: Create Page** (1 hour)

**Location:** `src/app/courses/mentor-plus/page.tsx`

**Sections:**

1. Hero: "Mentor Plus - Your Personal Success Coach"
2. What's Included:
   - Weekly 1-on-1 consultation sessions
   - Study accountability & tracking
   - Motivation & psychology support
   - Parent communication
   - Performance analysis
3. Who Should Enroll:
   - Students needing extra guidance
   - Parents wanting regular updates
   - Students with low motivation
4. Pricing: ₹1,50,000/year
5. How It Works: Timeline/process
6. Testimonials
7. FAQ specific to Mentor Plus
8. CTA: "Add to Your Course" or "Book Consultation"

**Design:** Match existing course pages (class-11, class-12, etc.)

---

### **Phase 3: Create Intensive Program Page** (`/courses/intensive-program`)

#### **Task 3.1: Create Hidden Page** (1.5 hours)

**Location:** `src/app/courses/intensive-program/page.tsx`

**Access Control:**

```typescript
export default function IntensiveProgramPage({ searchParams }) {
  const hasDemoAccess = cookies.get('demo_attended') === 'true' ||
                        searchParams.get('ref') === 'counselor' ||
                        searchParams.get('source') === 'email'

  if (!hasDemoAccess) {
    return <AccessDenied />
  }

  return <IntensiveProgramContent />
}
```

**AccessDenied Component:**

```jsx
<div className="access-denied">
  <LockIcon />
  <h1>This Program is Invitation Only</h1>
  <p>The Intensive Program is our most exclusive offering.</p>
  <p>To learn more, please:</p>
  <Button href="/demo-booking">Attend Demo Class</Button>
  <Button href="/contact">Speak with Counselor</Button>
</div>
```

**IntensiveProgramContent Sections:**

1. Hero: "Cerebrum Intensive - Elite Performance Program"
2. Exclusive Badge: "Most Sought After Course"
3. What Makes It Different:
   - Ultra-personalization
   - Daily follow-ups
   - Task management system
   - Weekly strategy sessions with Dr. Shekhar
   - Performance psychology
4. Who Is This For:
   - Top AIR aspirants (< 500 rank goal)
   - High achievers needing edge
   - Students who want maximum support
5. Investment: ₹3,60,000 + Pinnacle Fee (₹5.16L - ₹5.4L total)
6. Limited Seats: "Only 8-10 students per batch"
7. Success Stories: Students who achieved top ranks
8. Application Process: "Apply Now" → Counselor reviews
9. FAQ
10. CTA: "Apply for Intensive Program"

---

### **Phase 4: Update Payment Flow** (1 hour)

#### **Task 4.1: Update Enrollment Forms**

- Add tier dropdown (Pinnacle, Ascent, Pursuit)
- Add class selection
- Add course type (Academic, NEET, Board)
- Add payment mode selection
- Add add-ons checkboxes

#### **Task 4.2: Update Razorpay Integration**

- Calculate total based on selections
- Pass tier info to payment API
- Show breakdown before payment:
  ```
  Course: Pinnacle 2-Year (Board + NEET)     ₹1,80,000
  Payment: Lump Sum (Save ₹12,000!)          ₹1,80,000
  Add-on: Mentor Plus                        ₹1,50,000
  Add-on: Test Series                        ₹8,000
  ─────────────────────────────────────────────────────
  Total:                                     ₹3,38,000
  ```

---

## 📊 New Pricing Data Structure

```typescript
// src/data/pricing.ts

export interface PricingTier {
  tier: 'pinnacle' | 'ascent' | 'pursuit'
  batchSize: string
  prices: {
    lumpSum: number
    twoInstallments: number
    threeInstallments: number
  }
  features: string[]
}

export interface CoursePrice {
  class: 'foundation-9' | 'foundation-10' | 'class-11' | 'class-12' | 'dropper' | '2-year'
  types: {
    academic?: PricingTier[]
    neet?: PricingTier[]
    boardOnly?: PricingTier[]
    boardNeet?: PricingTier[]
  }
}

export const pricingData: CoursePrice[] = [
  {
    class: 'foundation-9',
    types: {
      academic: [
        {
          tier: 'pinnacle',
          batchSize: '10-12',
          prices: { lumpSum: 60000, twoInstallments: 62000, threeInstallments: 63000 },
          features: [...]
        },
        // ... ascent, pursuit
      ],
      neet: [
        {
          tier: 'pinnacle',
          batchSize: '10-12',
          prices: { lumpSum: 90000, twoInstallments: 93000, threeInstallments: 96000 },
          features: [...]
        },
        // ... ascent, pursuit
      ]
    }
  },
  // ... other classes
]

export const addOns = {
  mentorPlus: {
    price: 150000,
    name: 'Mentor Plus',
    description: 'Weekly consultation & counseling',
    availableFor: ['all']
  },
  testSeries: {
    price: 8000,
    name: 'NEET Test Series',
    description: 'Comprehensive mock tests',
    availableFor: ['neet', 'boardNeet']
  },
  intensive: {
    price: 360000,
    name: 'Intensive Program',
    description: 'Ultra-personalization',
    availableFor: ['pinnacle'],
    hidden: true
  }
}
```

---

## ✅ Testing Checklist

Before requesting approval:

### **Visual Tests:**

- [ ] Pricing page loads correctly
- [ ] Class selector works
- [ ] Course type toggle works
- [ ] Tier cards display correctly
- [ ] Payment mode updates prices
- [ ] Add-ons show/hide correctly
- [ ] Comparison table is readable
- [ ] Intensive teaser shows/hides based on demo access
- [ ] Mobile responsive (test all breakpoints)
- [ ] All colors/fonts match existing design

### **Functional Tests:**

- [ ] Calculate correct price for each combination
- [ ] Show correct batch sizes per tier
- [ ] Display installment increases correctly
- [ ] Show savings for lump sum
- [ ] Add-ons calculate correctly
- [ ] Links work (course pages, enrollment)
- [ ] Mentor Plus page accessible
- [ ] Intensive page gated correctly

### **Data Accuracy:**

- [ ] All prices match approved structure
- [ ] Installment increases correct
- [ ] Batch sizes correct per tier
- [ ] Features list accurate per tier

---

## 🚀 Deployment Process

1. **Build Locally:**

   ```bash
   npm run dev
   # Test at http://localhost:3001/pricing
   ```

2. **Share Screenshots/Video with Dr. Shekhar:**
   - Main pricing page (all class selections)
   - Mentor Plus page
   - Intensive page (locked & unlocked states)
   - Mobile views

3. **Get Approval:**
   - ✅ Design maintained?
   - ✅ Prices correct?
   - ✅ All features working?

4. **Commit Changes:**

   ```bash
   git add .
   git commit -m "feat: Update pricing with 3-tier structure and add-ons"
   git push origin main
   ```

5. **Verify Production:**
   - Check live site after deployment
   - Test payment flow end-to-end

---

## 📝 Files to Create/Modify

### **New Files:**

- `src/app/courses/mentor-plus/page.tsx`
- `src/app/courses/intensive-program/page.tsx`
- `src/data/pricing.ts`

### **Modified Files:**

- `src/app/pricing/page.tsx`
- `src/components/payment/RazorpayPayment.tsx` (add tier info)
- `src/app/api/enrollment/route.ts` (handle tier selection)

---

## 🎯 Success Criteria

- ✅ All pricing accurate per approved structure
- ✅ Design aesthetic maintained (no visual regressions)
- ✅ All class levels selectable (Foundation to 2-Year)
- ✅ Tier differentiation clear (batch sizes, features, prices)
- ✅ Installment pricing shows correctly
- ✅ Add-ons available and calculate correctly
- ✅ Intensive program properly gated
- ✅ Mentor Plus page comprehensive
- ✅ Mobile responsive
- ✅ Payment flow updated
- ✅ Dr. Shekhar approves final implementation

---

**Ready to Begin Implementation!** 🚀

**Estimated Time:** 6-8 hours total
**Build Strategy:** Local → Review → Approve → Commit
**Status:** APPROVED - Ready to code
