# Cerebrum Biology Academy - SEO Implementation Plan

**Created:** December 5, 2025
**Status:** In Progress
**Priority:** HIGH

---

## Executive Summary

This document outlines the comprehensive SEO implementation plan based on the audit conducted on December 5, 2025. The plan focuses on local SEO expansion, AI recommendation optimization, and filling content gaps to improve Google search rankings and visibility.

---

## 1. Current SEO Status

### Strengths

- 24 published blog posts covering high-weightage NEET Biology topics
- 104 locality pages across 8 cities
- LocalBusiness schema on all location pages
- Comprehensive XML sitemap with 1,250+ URLs
- Strong technical SEO foundation

### Weaknesses

- 6 blog posts short of 30-post target
- Missing location-specific blog posts (Laxmi Nagar, Noida, Dwarka)
- Google Site Verification not configured
- No embedded Google Maps on locality pages
- Limited coverage of Ghaziabad areas (Indirapuram, Vaishali)

---

## 2. Target Areas - 60km Radius from South Extension

### Tier 1: High Priority (0-15 km)

| Area                   | Distance | Status       | Action            |
| ---------------------- | -------- | ------------ | ----------------- |
| Greater Kailash I & II | 3-5 km   | ✅ Done      | Maintain          |
| Defence Colony         | 2-3 km   | ✅ Done      | Maintain          |
| Hauz Khas              | 3-5 km   | ✅ Done      | Maintain          |
| Saket                  | 4-6 km   | ✅ Done      | Maintain          |
| South Extension        | 0 km     | ✅ Done      | Maintain          |
| Green Park             | 1-2 km   | ✅ Done      | Maintain          |
| Lajpat Nagar           | 3-4 km   | ✅ Done      | Add blog          |
| Laxmi Nagar            | 10-12 km | ⚠️ Page only | **Add blog post** |

### Tier 2: Medium-High Priority (15-25 km)

| Area             | Distance | Status       | Action            |
| ---------------- | -------- | ------------ | ----------------- |
| Dwarka           | 18-22 km | ⚠️ Page only | **Add blog post** |
| Noida Sector 18  | 18-20 km | ⚠️ Page only | **Add blog post** |
| DLF Phase 1-5    | 19-25 km | ✅ Done      | Maintain          |
| Golf Course Road | 22-26 km | ✅ Done      | Maintain          |
| Sushant Lok      | 20-24 km | ✅ Done      | Maintain          |

### Tier 3: Medium Priority (25-40 km)

| Area              | Distance | Status       | Action                |
| ----------------- | -------- | ------------ | --------------------- |
| Indirapuram       | 28-32 km | ❌ Missing   | **Add locality page** |
| Vaishali          | 25-30 km | ❌ Missing   | **Add locality page** |
| Noida Sector 93A  | 28-30 km | ❌ Missing   | **Add locality page** |
| Noida Sector 137  | 35-38 km | ⚠️ Page only | Add blog              |
| Crossing Republik | 35-40 km | ❌ Missing   | Add locality page     |

### Premium Gated Societies (Priority Targets)

| Society            | Location           | Distance | Status     | Action           |
| ------------------ | ------------------ | -------- | ---------- | ---------------- |
| Nirvana Country    | Sector 50, Gurgaon | 24 km    | ❌ Missing | **Add locality** |
| ATS Greens Village | Sector 93A, Noida  | 28-30 km | ❌ Missing | **Add locality** |
| DLF Magnolias      | Sector 42, Gurgaon | 22-26 km | ⚠️ Limited | Enhance          |
| Vatika City        | Sector 49, Gurgaon | 24-28 km | ❌ Missing | Add locality     |

---

## 3. Implementation Tasks

### Phase 1: Critical Content (Week 1)

#### Task 1.1: Create Location Blog Posts

**Files to modify:** `src/data/blog.ts`

| Blog Post                    | Target Keywords                                     | Word Count | Status       |
| ---------------------------- | --------------------------------------------------- | ---------- | ------------ |
| NEET Coaching in Laxmi Nagar | NEET coaching Laxmi Nagar, NEET classes Laxmi Nagar | 1,500+     | ✅ Completed |
| NEET Coaching in Noida       | NEET coaching Noida, best NEET coaching Noida       | 2,000+     | ✅ Completed |
| NEET Coaching in Dwarka      | NEET coaching Dwarka, NEET classes Dwarka           | 1,500+     | ✅ Completed |

#### Task 1.2: Fix Google Site Verification

**File:** `src/app/layout.tsx`

- Replace placeholder `your-google-verification-code` with actual verification code
- Status: ⏳ Pending (requires Google Search Console access)

### Phase 2: Local SEO Expansion (Week 2)

#### Task 2.1: Add Missing Locality Pages

**File to modify:** `src/data/localities.ts`

| Locality                | City      | State         | Priority |
| ----------------------- | --------- | ------------- | -------- |
| Indirapuram             | Ghaziabad | Uttar Pradesh | HIGH     |
| Vaishali                | Ghaziabad | Uttar Pradesh | HIGH     |
| Raj Nagar Extension     | Ghaziabad | Uttar Pradesh | MEDIUM   |
| Crossing Republik       | Ghaziabad | Uttar Pradesh | MEDIUM   |
| Sector 93A (ATS Greens) | Noida     | Uttar Pradesh | HIGH     |
| Nirvana Country         | Gurgaon   | Haryana       | HIGH     |

#### Task 2.2: Add Google Maps Embed

**Files to create/modify:**

- `src/components/maps/GoogleMapEmbed.tsx` - New component
- `src/app/locations/[city]/[locality]/page.tsx` - Add map integration

### Phase 3: Technical SEO (Week 3)

#### Task 3.1: Web Vitals Tracking

- Add `web-vitals` package
- Integrate with Google Analytics 4

#### Task 3.2: Schema Enhancements

- Add dynamic ratings per locality
- Implement review collection system

---

## 4. Blog Post Content Specifications

### 4.1 Laxmi Nagar Blog Post

**Title:** NEET Coaching in Laxmi Nagar: East Delhi's Premier Biology Academy Guide 2025

**Target Keywords:**

- Primary: NEET coaching Laxmi Nagar, NEET classes Laxmi Nagar
- Secondary: best NEET coaching East Delhi, NEET Biology coaching Laxmi Nagar
- Long-tail: NEET preparation in Laxmi Nagar for medical entrance

**Content Structure:**

1. Introduction - Why Laxmi Nagar for NEET Preparation
2. Education Hub Analysis - Schools and coaching landscape
3. Metro Connectivity - Blue Line advantages
4. Our Academy Features - Small batches, AIIMS faculty
5. Success Stories from East Delhi Students
6. Batch Timings and Fee Structure
7. How to Reach (from Preet Vihar, Mayur Vihar, IP Extension)
8. FAQ Section (5-6 questions)
9. CTA - Book Free Demo Class

**Nearby Areas to Mention:**

- Preet Vihar, Mayur Vihar, IP Extension, Shakarpur, Krishna Nagar

---

### 4.2 Noida Blog Post

**Title:** Best NEET Coaching in Noida 2025: Sector-wise Complete Guide

**Target Keywords:**

- Primary: NEET coaching Noida, best NEET coaching Noida
- Secondary: NEET Biology coaching Noida, NEET classes Sector 18 Noida
- Long-tail: NEET preparation in Noida for medical entrance 2025

**Content Structure:**

1. Introduction - Noida's Growing Education Hub
2. Sector-wise Analysis (18, 62, 137, Greater Noida)
3. Why Students from Noida Choose Our Academy
4. Metro Connectivity - Aqua Line & Blue Line
5. Our Noida Success Stories
6. Online + Offline Hybrid Options
7. Fee Comparison with Local Institutes
8. FAQ Section (6-7 questions)
9. CTA - Book Free Demo Class

**Sectors to Cover:**

- Sector 18 (main hub), Sector 62, Sector 137, Sector 93A, Sector 150, Greater Noida

---

### 4.3 Dwarka Blog Post

**Title:** NEET Coaching in Dwarka 2025: West Delhi's Trusted Choice for Medical Aspirants

**Target Keywords:**

- Primary: NEET coaching Dwarka, NEET classes Dwarka
- Secondary: best NEET coaching West Delhi, NEET Biology coaching Dwarka
- Long-tail: NEET preparation in Dwarka for AIIMS entrance

**Content Structure:**

1. Introduction - Dwarka's Residential Advantage
2. Sector-wise Student Demographics
3. Metro Connectivity - Blue Line Direct Access
4. Why Choose Our Academy over Local Options
5. Success Stories from Dwarka Students
6. Weekend Batch Options for School Students
7. How to Reach (from Janakpuri, Najafgarh, Airport)
8. FAQ Section (5-6 questions)
9. CTA - Book Free Demo Class

**Areas to Cover:**

- Dwarka Sectors 1-23, Janakpuri, Uttam Nagar, Najafgarh

---

## 5. Locality Data Specifications

### 5.1 Indirapuram, Ghaziabad

```typescript
{
  name: "Indirapuram",
  slug: "indirapuram",
  city: "Ghaziabad",
  state: "Uttar Pradesh",
  pincode: "201014",
  coordinates: { lat: 28.6315, lng: 77.3580 },
  population: "500000+",
  demographics: {
    affluenceLevel: "Upper-Middle to Premium",
    studentPopulation: "Very High",
    neetAspirantDensity: "Very High"
  },
  nearbyLocalities: ["Vaishali", "Crossing Republik", "Vasundhara", "Kaushambi"],
  metro: "Blue Line - Vaishali",
  schools: ["DPS Indirapuram", "Ryan International", "Cambridge School"],
  competition: ["Smart Achievers", "Studygrad Institute", "NEET Fifty Institute"]
}
```

### 5.2 Vaishali, Ghaziabad

```typescript
{
  name: "Vaishali",
  slug: "vaishali",
  city: "Ghaziabad",
  state: "Uttar Pradesh",
  pincode: "201010",
  coordinates: { lat: 28.6419, lng: 77.3368 },
  population: "200000+",
  demographics: {
    affluenceLevel: "Upper-Middle",
    studentPopulation: "High",
    neetAspirantDensity: "Very High"
  },
  nearbyLocalities: ["Indirapuram", "Kaushambi", "Vasundhara", "Sahibabad"],
  metro: "Blue Line - Vaishali Terminal",
  schools: ["Cambridge School", "DPS Indirapuram nearby"],
  competition: ["Smart Achievers", "Gyanmudra"]
}
```

### 5.3 Nirvana Country, Sector 50, Gurgaon

```typescript
{
  name: "Nirvana Country",
  slug: "nirvana-country",
  city: "Gurgaon",
  state: "Haryana",
  pincode: "122018",
  coordinates: { lat: 28.4177, lng: 77.0447 },
  population: "15000+ (1000+ villa families)",
  demographics: {
    affluenceLevel: "Premium",
    studentPopulation: "High",
    neetAspirantDensity: "High"
  },
  societyType: "Gated Community - Villas",
  nearbyLocalities: ["Sector 49", "Sector 50", "Sector 56", "Sushant Lok"],
  schools: ["Shalom Hills", "The Sylvan Trails", "Tagore International", "Ryan International", "DAV Public School"],
  amenities: ["Clubhouse", "Swimming Pool", "Tennis Courts", "Security"]
}
```

---

## 6. Expected Outcomes

### Traffic Metrics (3-Month Projection)

| Metric                | Current  | Target      |
| --------------------- | -------- | ----------- |
| Organic Traffic       | Baseline | +50%        |
| Location Page Traffic | -        | +40%        |
| Blog Traffic          | -        | +75%        |
| Top 10 Keywords       | -        | 15 keywords |

### Conversion Metrics

| Metric                  | Current  | Target        |
| ----------------------- | -------- | ------------- |
| Demo Bookings (Organic) | Baseline | +30%          |
| WhatsApp Inquiries      | Baseline | +40%          |
| Location-specific Leads | -        | +25% per area |

### Local SEO Metrics

| Metric                       | Current | Target                 |
| ---------------------------- | ------- | ---------------------- |
| Google Local Pack Visibility | Limited | Top 3 for target areas |
| GMB Click-through Rate       | -       | >5%                    |
| Direction Requests           | -       | +50%                   |

---

## 7. Maintenance Schedule

### Weekly Tasks

- Monitor Google Search Console for errors
- Check keyword rankings for top 20 terms
- Review analytics for location page performance

### Monthly Tasks

- Update blog posts with fresh content
- Add new testimonials to location pages
- Review and respond to Google reviews
- Update FAQ sections based on common queries

### Quarterly Tasks

- Comprehensive SEO audit
- Competitor analysis
- Content gap analysis
- Schema markup validation

---

## 8. Technical Checklist

### Immediate Actions

- [x] Create SEO Implementation Plan document
- [x] Add 3 location blog posts (Laxmi Nagar, Noida, Dwarka) - **Completed Dec 5, 2025**
- [x] Add 3 new locality pages (Indirapuram, Vaishali, Nirvana Country) - **Already existed**
- [ ] Fix Google Site Verification placeholder (requires GSC access)
- [x] Add Google Maps embed to locality pages - **Completed Dec 5, 2025**

### Short-Term Actions

- [ ] Implement Web Vitals tracking
- [ ] Add BreadcrumbList schema to blog posts
- [ ] Create location-specific testimonials mapping
- [ ] Set up automated sitemap submission

### Long-Term Actions

- [ ] Build backlink profile (target: 150 links in 6 months)
- [ ] Create Hindi versions of top 5 blog posts
- [ ] Implement review collection system
- [ ] Launch guest posting campaign

---

## Appendix A: Keyword Research Summary

### High-Volume Keywords (Monthly Searches)

| Keyword                   | Volume  | Difficulty | Current Rank |
| ------------------------- | ------- | ---------- | ------------ |
| NEET coaching             | 50,000+ | High       | -            |
| NEET Biology coaching     | 10,000+ | Medium     | -            |
| NEET coaching Delhi       | 5,000+  | Medium     | -            |
| NEET coaching Noida       | 2,000+  | Low        | -            |
| NEET coaching Gurgaon     | 1,500+  | Low        | -            |
| NEET coaching Laxmi Nagar | 500+    | Low        | -            |
| NEET coaching Dwarka      | 500+    | Low        | -            |

### Long-Tail Keywords (Target in Blog Posts)

- "best NEET Biology coaching in Delhi NCR 2025"
- "NEET preparation for Class 11 students in Noida"
- "online NEET coaching with AIIMS faculty"
- "small batch NEET coaching near me"
- "NEET dropper batch in Gurgaon"

---

## Appendix B: Competitor Analysis

### Top Competitors by Location

| Area        | Competitors                       | Our Advantage                |
| ----------- | --------------------------------- | ---------------------------- |
| South Delhi | Aakash, Allen, BYJU's             | Small batches, AIIMS faculty |
| Noida       | Allen, Akash, Physics Wallah      | Personalized attention       |
| Gurgaon     | Allen, Aakash, local institutes   | Premium experience, results  |
| Ghaziabad   | Smart Achievers, local institutes | Online + offline hybrid      |

---

**Document Version:** 1.0
**Last Updated:** December 5, 2025
**Next Review:** December 15, 2025
