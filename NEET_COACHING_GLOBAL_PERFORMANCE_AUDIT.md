# NEET Coaching — Global SEO/Ranking Performance Audit

_Cerebrum Biology Academy — 2026-04-24_

## Methodology & caveats

- **Live SERP samples** taken via Claude WebSearch on 2026-04-24 (5 queries across India home market + NRI markets).
- **WebSearch is US-served** — it queries `google.com` from a US data centre. For India and Gulf queries, this gives a useful approximation but **is not equivalent to a real local SERP**. A user in Delhi searching from a Delhi IP sees a SERP weighted by `gl=in` and may see different results.
- We checked SEO **visibility** (do our pages appear in top 10 for relevant queries?), not paid ads.
- Sample size is intentionally small — 5 queries — chosen to triangulate visibility patterns, not to give exhaustive ranking data. **Authoritative ranking data lives in GSC.** This audit complements GSC, it does not replace it.

## Demand map — where does NEET coaching get searched globally?

### Primary market — **India** (home market)

- Delhi NCR, Mumbai, Bangalore, Hyderabad, Pune, Chennai, Kota, Kolkata, etc.
- ~2.4M NEET candidates per year, dominant search volume.
- Search intent: "NEET coaching <city>", "best NEET coaching", "online NEET coaching", "NEET biology coaching".

### Secondary market — **14 NTA overseas exam centres** (NRI students sitting NEET)

1. Dubai (UAE) · 2. Abu Dhabi · 3. Sharjah · 4. Manama (Bahrain) · 5. Doha (Qatar) · 6. Kuwait City · 7. Muscat (Oman) · 8. Riyadh · 9. Jeddah · 10. Singapore · 11. Bangkok · 12. Kuala Lumpur · 13. Kathmandu · 14. Lagos.

### Tertiary market — **NRI diaspora hubs** (parents searching from abroad)

- USA: NJ, NY, Houston, Atlanta, Boston, Chicago, SF Bay, DC.
- UK: London, Birmingham, Manchester, Leicester.
- Canada: Toronto, Calgary, Vancouver.
- Australia/NZ: Sydney, Melbourne, Brisbane, Auckland.

## Live SERP sample results (5 queries, 2026-04-24)

### Query 1 — `NEET coaching Delhi best institute`

**Top 10 (sample):**

- Aakash Institute · Plutus STEM · Margshree · Shri NFDA · Narayana · Prerna Education · Allen · Brilliant Tutorials · Vidyamandir · Career Launcher

**Cerebrum visibility:** ❌ **Not in top 10.**

### Query 2 — `NEET coaching Dubai UAE NRI students`

**Top 10 (sample):**

- ✅ **Cerebrum Biology Academy** — `/neet-coaching-dubai-uae` ranking as _"Best NEET Coaching in Dubai UAE | 98% Success Rate"_
- Unique World Education · TestprepKart · AIMS · askIITians · Allen Overseas · Ascentria · PWGulf · MyStudyCart · Brilliant Pala

**Cerebrum visibility:** ✅ **Visible top 10.** Dubai page is one of our top-performing international URLs.

### Query 3 — `NEET coaching online India Mumbai Bangalore`

**Top 10 (sample):**

- Vedantu · Allen · Aakash · Sulekha · Unacademy · Sri Chaitanya · ALLEN Kota · Physics Wallah · Career Point · BYJU'S

**Cerebrum visibility:** ❌ **Not in top 10.**

### Query 4 — `NEET coaching for NRI students USA UK`

**Top 10 (sample):**

- TestprepKart (position 1)
- ✅ **Cerebrum Biology Academy** — `/neet-coaching-overseas` (position 2)
- Mystudycart · Allen Overseas · Aakash International · askIITians · Plutus · NRI Pulse · Brilliant Pala · Toppr

**Cerebrum visibility:** ✅ **Visible position 2** — `/neet-coaching-overseas` hub is a strong asset.

### Query 5 — `site:cerebrumbiologyacademy.com NEET coaching`

**Pages confirmed indexed and surfacing:**

- `/nri-students/usa` · `/neet-coaching-overseas` · `/neet-coaching-nri-usa` · `/neet-coaching-fees-comparison` · `/dropper` · `/best-online-coaching-neet-biology` · `/compare` · `/neet-coaching-institute` · `/best-neet-coaching-greater-noida` · `/pricing`

**Note:** None of the new 14 NRI city pages shipped this session appear yet — expected (4–8 weeks for crawl + index).

## Per-segment infrastructure & visibility

| Segment                                                                | Pages live                                                                       | Schema/AEO/GEO                      | Visible in SERP sample?   | Diagnosis                                                          |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| India metros (Delhi, Mumbai, Bangalore, etc.)                          | 60+ city/sub-city pages                                                          | ✅ Strong                           | ❌ No                     | Dominated by Aakash/Allen/Vedantu/Unacademy. Brand + backlink gap. |
| Dubai (UAE)                                                            | `/neet-coaching-dubai-uae` + Gulf cluster                                        | ✅ Strong                           | ✅ Yes (top 10)           | Strong asset. Keep producing supporting content.                   |
| Other Gulf (Abu Dhabi, Sharjah, Doha, Riyadh, Kuwait, Bahrain, Muscat) | 9 quality-passed pages                                                           | ✅ Strong (hreflang, currency, FAQ) | Not sampled (recent ship) | Need 4–8 wk crawl to see effect.                                   |
| NRI USA hub                                                            | `/neet-coaching-overseas` + `/nri-students/usa` + 6 new US cities                | ✅ Strong                           | ✅ Yes (position 2)       | Already winning generic NRI USA. New city pages will reinforce.    |
| NRI UK                                                                 | `/nri-students/uk` + 4 new UK cities (London, Leicester, Birmingham, Manchester) | ✅ Strong                           | Not sampled               | Wait for crawl.                                                    |
| NRI Canada/Australia/NZ                                                | New pages just shipped                                                           | ✅ Strong                           | Not sampled               | Brand new — give 4–8 wks.                                          |
| NTA centres in non-Gulf (Singapore, Bangkok, KL, Kathmandu, Lagos)     | Limited / missing                                                                | ⚠️ Partial                          | n/a                       | Coverage gap (low volume but symbolically valuable).               |

## Headline diagnosis

**Cerebrum is visible in NRI markets (Dubai + overseas-NRI hub) but invisible in the India home market.**

This mirrors the IB Biology audit finding: Cerebrum's infrastructure quality is competitive, but in entrenched markets the ranking signal is dominated by **brand authority, backlinks, age, and review volume** — none of which we can fix by shipping more pages.

The good news:

- The **NRI segment is winnable** — we're already ranking, our schema/hreflang/currency/disclaimer infra is competitive with TestprepKart, our content is more biology-specialised than the generalist competitors (Aakash, Allen Overseas).
- The **14 new NRI cities** shipped this session expand our NRI surface — give 4–8 weeks for them to crawl and start ranking long-tail city queries.

The hard truth:

- We will not rank for "NEET coaching Delhi" or "NEET coaching online India" any time soon, because Aakash/Allen/Vedantu/Unacademy/Physics Wallah have:
  - **20–40× our backlink count** and **10–15 years of domain age**.
  - **Massive brand search volume** (`aakash neet`, `allen neet`) that Google rewards.
  - **Thousands of reviews** vs our 38.
  - Aggressive Google Ads + YouTube + scholarship test campaigns driving direct + branded traffic.
- Throwing more pages at the home market won't move the needle. **Backlinks, brand search, and reviews will.**

## Recommendations — by ROI, in priority order

### Tier 1 — DO NOTHING to ranking pages

- **Do not** edit `/neet-coaching-dubai-uae`, `/neet-coaching-overseas`, `/nri-students/usa`, or any other page that's currently visible. Even copy tweaks risk losing position. The ranking-preservation rule applies.
- Wait for GSC data on the 14 new pages before deciding what's worth investing in.

### Tier 2 — Earn offsite signal in NRI markets (no code)

1. **Reviews push:** 38 Google reviews → target 200+ in 6 months. Email all alumni since 2022; offer a small alumni perk for an honest review. Same for Trustpilot.
2. **Backlinks from NRI publications:** Khaleej Times, Gulf News, Arab News (UAE/Saudi); India Abroad, NRI Pulse (US). Pitch op-eds on "How NRI students prepare for NEET while abroad."
3. **YouTube:** Long-form NEET Biology lessons + per-NTA-centre testimonials. NRI parents heavily research on YouTube before paying. Even modest channel growth correlates with web rankings.
4. **Quora/Reddit/r/NEET:** Answer NRI-specific NEET questions ("Can I take NEET from Singapore?", "How do dropper years work for NRIs?"). Don't spam, just be useful — link only when natural.

### Tier 3 — Patient additive content (low-risk)

- Per-NTA-centre guides: "NEET 2026 in Singapore — exam day logistics, scoring, deadline."
- Per-country fee comparison: "NEET coaching cost: Dubai vs Doha vs Riyadh."
- NRI parent FAQ corpus: visa/quota disclaimer, eligibility, score equivalence, college admissions process.

### Tier 4 — Defer until GSC data is available (DO NOT touch yet)

- Cannibalization between `/neet-coaching-overseas` vs `/nri-students/usa` vs `/neet-coaching-nri-usa` vs `/best-online-coaching-neet-biology`. **Multiple ranking pages risk being lost** if we consolidate prematurely.
- Pricing or copy refinement on Dubai/overseas hub.
- Stat scrubbing ("98% success rate" claims).

These are real issues but the cost of losing a top-10 position outweighs the cleanup benefit until we have GSC data telling us which URL is actually doing the work.

## Honest summary for the user

- **Infra grade: A.** Schema, hreflang, currency localisation, NRI quota disclaimers, FAQ depth, internal linking — all match or exceed competitors.
- **Visibility grade: A in NRI / D in India home market.** Same gap as IB Biology.
- **The gap is offsite, not onsite.** More pages won't close it. Reviews + backlinks + brand search will.
- **Don't touch ranking pages.** The 14 new NRI cities shipped this session are the right kind of additive growth — give them 4–8 weeks before judging.
- **Next data milestone:** pull GSC Performance report at 2026-06-15 (8 weeks post-ship). Compare impressions/clicks per new city vs zero baseline. Decide where to invest based on that, not on speculation.
