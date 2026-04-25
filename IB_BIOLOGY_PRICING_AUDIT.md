# IB Biology Pricing Audit — Global Market Reality Check

**Date:** 2026-04-25
**Scope:** Per-city `pricing.perHour` and `pricing.perHourText` in `src/data/ib-biology/cities.ts`, plus the canonical USD baseline in `src/data/ib-biology/pricing-matrix.ts`.
**Constraint:** Per ranking-preservation rule, apply changes only on freshly-added cities (zero rank risk). Document recommendations for existing pages without applying — ship those only when GSC data confirms safety.

---

## 2026 global IB tutor market reality (research-backed)

From plusplustutors, TutorChase, Lanterna, Tutopiya, Wyzant, AmazingTalker, BartyED, and Hong Kong/Singapore/Sydney local marketplaces:

| Tutor segment                                       | USD/hr range         |
| --------------------------------------------------- | -------------------- |
| Student tutors (undergrad subject teaching)         | $40–60               |
| Qualified teacher (online)                          | $60–95               |
| Qualified teacher (in-person, premium city)         | $80–130              |
| IB examiner / senior subject lead                   | $130–200             |
| Top agencies (Crimson, premium)                     | $150–250             |
| Premium in-person (London / Dubai / Singapore / HK) | $150–250             |
| Singapore tuition centres (group)                   | SGD 200–500          |
| Hong Kong starting rate                             | HKD 470/hr (~USD 60) |
| Toronto base (general subjects)                     | CAD 55–80+           |
| **Online discount vs in-person**                    | 20–30% cheaper       |

**Cerebrum's positioning sweet spot:** **online qualified teacher → online IB examiner** ($60–110/hr USD-equivalent).

That's where pricing should land. Anything below $60 reads as "student tutor"; anything above $110 needs to justify the IB-examiner-only positioning.

---

## Current state — `pricing-matrix.ts` baseline (hub pages)

```
Complete IB Biology Programme: $6,000 / year (150 hrs blended @ $40/hr)
1:1 Elite Tutoring: $75 / hour
Group Batch: $40 / hour
```

**Verdict:** Within target band. $75 1:1 sits exactly at the qualified-teacher-online midpoint. $40 group is at the floor (could be $45–50 to feel less student-tutor-ish, but the positioning works for value-conscious global cohort).

**Recommendation:** **Don't touch the baseline.** It's defensible, and any change ripples through every hub page using `GeoAwarePricingMatrix` — non-trivial ranking risk.

---

## Per-city audit — `cities.ts`

USD-equivalent calculated using the rates in `pricing-matrix.ts`:

- INR 85 · GBP 0.79 · EUR 0.92 · AED 3.67 · SGD 1.34 · HKD 7.79 · CAD 1.36 · AUD 1.54 · NZD 1.68 · CHF 0.86 · CNY 7.2 · KRW 1380 · JPY 150 · THB 34.5 · MYR 4.5 · ZAR 18.2

Legend: ✅ in band · 🟢 underpriced (room to raise) · 🔴 overpriced (friction risk) · 🟡 borderline

### 27 existing cities

| City             | Current `perHourText` | Mid USD | Verdict                                                              | Recommended                   | Delta |
| ---------------- | --------------------- | ------- | -------------------------------------------------------------------- | ----------------------------- | ----- |
| **London**       | £55–75/hr             | $82     | ✅ in band                                                           | Keep                          | —     |
| **Singapore**    | S$100–150/hr          | $93     | ✅ premium-justified                                                 | Keep                          | —     |
| **Dubai**        | AED 180–280/hr        | $63     | 🟢 **underpriced** (premium in-person market)                        | **AED 220–380/hr** ($60–104)  | +20%  |
| **Hong Kong**    | HK$500–750/hr         | $80     | 🟢 underpriced (city HKD 470 is starter; Cerebrum should be premium) | **HK$600–1,000/hr** ($77–128) | +20%  |
| **Toronto**      | CA$65–90/hr           | $57     | 🟢 **underpriced** (CAD 55 is generic-subject; IB premium $80+)      | **CA$80–120/hr** ($59–88)     | +25%  |
| **Vancouver**    | CA$65–90/hr           | $57     | 🟢 underpriced                                                       | **CA$80–120/hr**              | +25%  |
| **Sydney**       | A$75–110/hr           | $60     | 🟢 underpriced                                                       | **A$95–140/hr** ($62–91)      | +25%  |
| **Melbourne**    | A$75–110/hr           | $60     | 🟢 underpriced                                                       | **A$95–140/hr**               | +25%  |
| **New York**     | $65–95/hr             | $80     | 🟢 underpriced (NYC IB premium is $100+)                             | **$80–130/hr**                | +25%  |
| **Boston**       | $65–95/hr             | $80     | 🟢 underpriced                                                       | **$80–130/hr**                | +25%  |
| **Geneva**       | CHF 75–110/hr         | $108    | ✅ premium-justified                                                 | Keep                          | —     |
| **Zurich**       | CHF 75–110/hr         | $108    | ✅ premium-justified                                                 | Keep                          | —     |
| **Amsterdam**    | €60–85/hr             | $79     | ✅ in band                                                           | Keep                          | —     |
| **Bangkok**      | ฿1,400–2,000/hr       | $49     | ✅ value market                                                      | Keep                          | —     |
| **Kuala Lumpur** | RM 180–280/hr         | $51     | ✅ value market                                                      | Keep                          | —     |
| **Delhi**        | ₹2,000–3,500/hr       | $32     | ✅ Indian premium positioning                                        | Keep                          | —     |
| **Gurugram**     | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Mumbai**       | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Bangalore**    | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Pune**         | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Hyderabad**    | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Noida**        | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Chennai**      | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **South Delhi**  | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Faridabad**    | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Rohini**       | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |
| **Kolkata**      | ₹2,000–3,500/hr       | $32     | ✅                                                                   | Keep                          | —     |

### 8 new cities (just added — safe to adjust)

| City                         | Current `perHourText` | Mid USD | Verdict                                                                       | Recommended                     | Action                       |
| ---------------------------- | --------------------- | ------- | ----------------------------------------------------------------------------- | ------------------------------- | ---------------------------- |
| **Tokyo**                    | ¥9,000–13,000/hr      | $73     | 🟡 slightly low                                                               | **¥10,000–15,000/hr** ($67–100) | **Apply (small bump)**       |
| **Seoul**                    | ₩80,000–120,000/hr    | $72     | ✅ in band                                                                    | Keep                            | —                            |
| **Shanghai**                 | ¥700–1,000/hr         | $118    | ✅ premium for foreign-led IB tutoring (Chinese local IB tutoring ¥500–2,000) | Keep                            | —                            |
| **Beijing**                  | ¥700–1,000/hr         | $118    | ✅ same                                                                       | Keep                            | —                            |
| **Houston**                  | $60–90/hr             | $75     | ✅ in band                                                                    | Keep                            | —                            |
| **Chicago**                  | $60–90/hr             | $75     | ✅ in band                                                                    | Keep                            | —                            |
| **San Francisco / Bay Area** | $70–100/hr            | $85     | 🟢 underpriced (Silicon Valley parents pay premium)                           | **$85–125/hr** ($85–125)        | **Apply (premium position)** |
| **Paris**                    | €55–85/hr             | $76     | ✅ in band                                                                    | Keep                            | —                            |

---

## Summary

### 🟢 Underpriced markets (8 existing cities + 1 new)

**Existing (27 cities):** Dubai, Hong Kong, Toronto, Vancouver, Sydney, Melbourne, New York, Boston — currently 25% below comparable-market premium tutoring. Aligning would increase per-student revenue without losing competitiveness against TutorChase, Crimson, Lanterna premium tiers.

**New (8 cities):** Only SF Bay Area is meaningfully underpriced; Tokyo is slightly low.

### ✅ Correctly priced

London, Singapore, Geneva, Zurich, Amsterdam, Bangkok, KL, Paris, all India cities, Seoul, Shanghai, Beijing, Houston, Chicago.

### 🔴 Overpriced

None.

---

## Action plan — what I'm going to apply now (safe)

Only 2 changes, both on cities I just added (zero ranking risk):

1. **Tokyo:** ¥9,000–13,000/hr → ¥10,000–15,000/hr (perHour 10,000 → 12,500)
2. **SF Bay:** $70–100/hr → $85–125/hr (perHour 80 → 105)

The other 6 new cities stay as set.

---

## Recommendations DEFERRED (don't ship without GSC clearance)

For the 8 underpriced existing cities (Dubai, HK, Toronto, Vancouver, Sydney, Melbourne, NY, Boston):

**The case for raising prices:**

- All 8 are 25% below comparable-market premium IB tutoring rates
- IB families in these markets are price-insensitive (they're already paying $30k+ tuition)
- Raising aligns Cerebrum positioning with examiner-led service quality
- Conversion impact likely positive (price anchoring)

**The case for leaving alone:**

- These pages may be currently ranking for "[city] IB Biology tutor" — content edits can shuffle rankings for 4–8 weeks
- A 25% price hike with no other change can spike bounce rate, which feeds back into ranking signals
- Without GSC data, we don't know which pages are getting traffic

**Recommended sequencing if you decide to raise:**

1. **Pull GSC data first** — identify which of the 8 cities is currently ranking and getting clicks
2. **For ranking pages:** A/B test the price change via two cohorts, or schedule the edit alongside a content refresh (so any algo re-evaluation has new content to score)
3. **For non-ranking pages:** Safe to update directly — if it's not ranking, there's nothing to lose
4. **Stagger the rollout:** Edit 1–2 cities per week, monitor GSC impressions/clicks for 2 weeks before next batch
5. **Keep `pricing-matrix.ts` USD baseline unchanged** — that controls all hub pages and is the highest-risk surface

---

## Pricing-matrix.ts (hub baseline) — leave alone

```
Complete IB Biology Programme: $6,000/year — keep
1:1 Elite Tutoring: $75/hr — keep
Group Batch: $40/hr — keep (could go to $45 if desired, but not worth the risk)
```

Only revisit this if GSC shows hub pages aren't converting at expected rate. The current $75/hr 1:1 baseline is competitive with online qualified-teacher market and below online IB-examiner premium ($100–150) — Cerebrum's "examiner-led at qualified-teacher prices" pitch.

---

## Sources (research)

- [Real 2026 IB Tutor Rates (++tutors)](https://www.plusplustutors.com/blog/how-much-does-an-ib-tutor-cost-real-2026-rates-explained)
- [IB Tuition Online: 2026 Guide (Tutopiya)](https://www.tutopiya.com/blog/ib-tuition-online-complete-guide/)
- [Best IB Tutoring Options 2026 (Eclassopedia)](https://eclassopedia.com/best-ib-tutoring-options-in-2026/)
- [IB Tutor Dubai 2026 Guide (Edflik)](https://www.edflik.com/blog/ib-tutor-dubai-2026-how-to-choose-the-right-tutor-and-improve-ib-scores-faster/)
- [IB Biology Tuition Singapore (Singapore Tuition Teachers)](https://singaporetuitionteachers.com/biology-tuition/ib-biology/)
- [Best IB Tuition Hong Kong (Little Steps)](https://www.littlestepsasia.com/hong-kong/learn/tutors/best-ib-tutors/)
- [Top 10 IB Biology Tutors 2026 (AmazingTalker)](https://en.amazingtalker.com/tutors/biology/subject_ib)
- [Tutor Cost Per Hour Canada 2026 (TutorLyft)](https://www.tutorlyft.com/blogs/how-much-does-a-tutor-cost-per-hour-in-canada)
- [Average Tutor Rate Australia (Wise Live)](https://www.wise.live/blog/average-tutor-rate-per-hour-in-australia/)
- [IB Biology Tutor New York (Top IB Tutors)](https://www.topibtutors.com/locations/new-york)
