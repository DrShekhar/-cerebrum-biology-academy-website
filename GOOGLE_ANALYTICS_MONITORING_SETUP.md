# GOOGLE ANALYTICS MONITORING SETUP

**For:** Cerebrum Biology Academy - Month 1 Phase 1 New Pages
**Generated:** 2025-11-10

---

## OVERVIEW

Monitor performance of 31 new pages:

- 16 Mumbai location pages
- 13 Bangalore location pages
- 2 Comparison pages

---

## STEP 1: SET UP CUSTOM EVENTS (Optional but Recommended)

If you're using Google Analytics 4 (GA4), you can track specific interactions:

### Event Tracking Code (Already in place via Next.js)

Your Next.js app should already have GA4 tracking. Verify by checking:

1. Go to Google Analytics dashboard
2. Navigate to **Admin** → **Data Streams**
3. Confirm tracking ID is installed (should be in `.env.local` or `.env.production`)

---

## STEP 2: CREATE CUSTOM SEGMENTS

### Segment 1: Mumbai Traffic

**Purpose:** Track all Mumbai page visitors

1. Go to GA4 → **Explore** → **Create Custom Segment**
2. Name: "Mumbai Pages Traffic"
3. Condition: **Page path** contains `/locations/mumbai`
4. Save

### Segment 2: Bangalore Traffic

**Purpose:** Track all Bangalore page visitors

1. Create Custom Segment
2. Name: "Bangalore Pages Traffic"
3. Condition: **Page path** contains `/locations/bangalore`
4. Save

### Segment 3: Comparison Pages Traffic

**Purpose:** Track conversion-intent visitors

1. Create Custom Segment
2. Name: "Comparison Pages Traffic"
3. Condition: **Page path** contains `/compare/`
4. Save

---

## STEP 3: CREATE CUSTOM DASHBOARD

### Dashboard: "Month 1 SEO Expansion Performance"

**Widgets to Add:**

1. **Widget: Page Views by Location**
   - Metric: Page views
   - Dimension: Page path
   - Filter: Page path contains `/locations/mumbai` OR `/locations/bangalore`
   - Date range: Last 30 days
   - Chart type: Line graph

2. **Widget: Top Performing Localities**
   - Metric: Page views
   - Dimension: Page path
   - Filter: Page path regex `/locations/(mumbai|bangalore)/.+`
   - Sort: Descending by page views
   - Chart type: Table

3. **Widget: Comparison Page Engagement**
   - Metrics: Page views, Avg. engagement time, Bounce rate
   - Dimension: Page path
   - Filter: Page path contains `/compare/`
   - Chart type: Scorecard

4. **Widget: New vs. Returning Visitors (Mumbai/Bangalore)**
   - Metric: Users
   - Dimension: User type
   - Filter: Page path contains `/locations/mumbai` OR `/locations/bangalore`
   - Chart type: Pie chart

5. **Widget: Traffic Source (New Pages)**
   - Metric: Sessions
   - Dimension: Source/Medium
   - Filter: Landing page contains `/locations/mumbai` OR `/locations/bangalore` OR `/compare/`
   - Chart type: Bar chart

---

## STEP 4: SET UP CONVERSION GOALS

### Goal 1: Demo Booking from Location Pages

**Event name:** `demo_booking_click`
**Conditions:**

- Page path contains: `/locations/mumbai` OR `/locations/bangalore`
- Button click: "Book Free Demo"

**Setup in GA4:**

1. Go to **Admin** → **Events** → **Create Event**
2. Name: `location_page_demo_click`
3. Matching conditions: `event_name = click` AND `page_location` contains `locations/(mumbai|bangalore)`
4. Mark as **Conversion**

### Goal 2: Kota Comparison CTA Click

**Event name:** `kota_comparison_cta`
**Conditions:**

- Page path: `/compare/kota-vs-online`
- Button click: CTA button

**Setup:**

1. Create Event: `kota_comparison_cta_click`
2. Mark as Conversion

---

## STEP 5: SET UP ALERTS

### Alert 1: Traffic Spike Detection

**Purpose:** Get notified when Mumbai/Bangalore pages get unusual traffic

1. Go to **Admin** → **Custom Alerts**
2. Alert name: "New Location Pages Traffic Spike"
3. Condition: Daily page views for `/locations/mumbai*` OR `/locations/bangalore*` increases by >100%
4. Email notification: ON

### Alert 2: Zero Traffic Warning

**Purpose:** Detect if pages aren't getting any traffic (possible indexing issue)

1. Create Alert: "Zero Traffic to New Pages"
2. Condition: Daily page views for `/locations/mumbai` OR `/locations/bangalore` = 0
3. Active after: 7 days from deployment
4. Email notification: ON

---

## STEP 6: CREATE WEEKLY REPORT

### Automated Report: "SEO Expansion Weekly Summary"

**Schedule:** Every Monday at 9 AM
**Recipients:** Your email

**Include:**

1. **Page Performance Table**
   - Columns: Page path, Page views, Unique visitors, Avg. time on page, Bounce rate
   - Filter: Mumbai, Bangalore, Comparison pages
   - Date range: Last 7 days vs. Previous 7 days

2. **Top Traffic Sources**
   - For new location pages
   - Top 10 sources

3. **Conversion Summary**
   - Demo bookings from location pages
   - CTA clicks from comparison pages

---

## KEY METRICS TO TRACK

### Week 1-2 (Indexing Phase)

- **Impressions in Search Console:** Should start appearing
- **Clicks:** 0-50 per week (expected)
- **Direct traffic:** From social media/ads
- **Goal:** Verify pages are indexed

### Week 3-4 (Initial Rankings)

- **Organic impressions:** 500-1,000 per week
- **Organic clicks:** 10-30 per week
- **Average position:** 20-40
- **Goal:** Start ranking for long-tail keywords

### Month 2 (Ranking Improvement)

- **Organic impressions:** 2,000-4,000 per week
- **Organic clicks:** 50-100 per week
- **Average position:** 10-20
- **Goal:** Top 20 for target keywords

### Month 3+ (Traffic Growth)

- **Organic impressions:** 5,000-8,000 per week
- **Organic clicks:** 150-300 per week
- **Average position:** 5-15
- **Goal:** First page for main keywords

---

## BENCHMARK COMPARISONS

### Compare Against Delhi NCR Pages

Create a comparison report:

**Report name:** "Location Page Performance Comparison"

| Metric            | Delhi NCR (Baseline) | Mumbai (New) | Bangalore (New) |
| ----------------- | -------------------- | ------------ | --------------- |
| Weekly Page Views | Track current        | Track new    | Track new       |
| Avg. Time on Page | Track current        | Track new    | Track new       |
| Bounce Rate       | Track current        | Track new    | Track new       |
| Demo Clicks       | Track current        | Track new    | Track new       |

**Expected:** New pages should reach 50% of Delhi performance by Month 2

---

## QUICK ACCESS LINKS

Save these for easy monitoring:

1. **All Location Pages Traffic:**
   - GA4 → Reports → Engagement → Pages and screens
   - Filter: Page path contains `/locations/`

2. **Search Console Performance:**
   - https://search.google.com/search-console
   - Filter by: Mumbai, Bangalore, Comparison pages

3. **Vercel Analytics:**
   - https://vercel.com/dashboard
   - Filter by: New pages

---

## TROUBLESHOOTING

### If no traffic after 7 days:

1. ✅ Check Google Search Console - Are pages indexed?
2. ✅ Verify sitemap submission
3. ✅ Check robots.txt - Are pages blocked?
4. ✅ Test page load speed - Are pages loading correctly?

### If high bounce rate (>70%):

1. Check mobile responsiveness
2. Verify page load speed
3. Review content quality
4. Check CTA placement

### If low engagement time (<30 seconds):

1. Review content structure
2. Add more engaging visuals
3. Improve internal linking
4. Add video content

---

## EXPECTED RESULTS

### Month 1:

- **Impressions:** 2,000-4,000
- **Clicks:** 50-100
- **Average CTR:** 2-3%
- **Conversion Rate:** 0.5-1%

### Month 2:

- **Impressions:** 8,000-12,000
- **Clicks:** 200-400
- **Average CTR:** 2.5-3.5%
- **Conversion Rate:** 1-2%

### Month 3:

- **Impressions:** 20,000-30,000
- **Clicks:** 600-1,000
- **Average CTR:** 3-4%
- **Conversion Rate:** 2-3%

---

## REVENUE IMPACT TRACKING

From 80-page strategy document projections:

**Mumbai (Target: 200 students by Year 1)**

- Monthly goal: ~17 new students
- Fee per student: ₹24,000/year = ₹2,000/month
- Target monthly revenue: ₹34,000 from Mumbai traffic

**Bangalore (Target: 150 students by Year 1)**

- Monthly goal: ~13 new students
- Fee per student: ₹24,000/year = ₹2,000/month
- Target monthly revenue: ₹26,000 from Bangalore traffic

**Total Monthly Target:** ₹60,000 additional revenue
**Year 1 Target:** ₹84L additional annual revenue

Track in GA4 using **Enhanced Ecommerce** or custom events for enrollment conversions.
