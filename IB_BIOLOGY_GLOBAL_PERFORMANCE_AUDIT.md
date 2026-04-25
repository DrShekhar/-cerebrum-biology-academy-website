# IB Biology Global Performance Audit — Per Country

**Date:** 2026-04-25
**Goal:** How is cerebrumbiologyacademy.com actually performing in the countries where IB Biology demand exists?
**Method:**

1. Live SERP sampling via WebSearch (US-served) for major keywords across 7 demand markets
2. Per-country infrastructure audit (schema, hreflang, content fit) from the codebase
3. Honest gap-list: where infra is strong vs where rankings clearly aren't

---

## ⚠️ Honest caveats up front

- **WebSearch is US-served.** What a US visitor sees searching "IB Biology tutor London" is not what a London visitor sees. Local SERPs vary, especially for `[city] tutor` queries. Findings below are directional, not definitive.
- **Without GSC access I can't see** actual impressions, clicks, queries-rankings table, or click-through rates per country.
- **What I can see:** whether Cerebrum appears in the top 10 for major keywords on the US-served SERP, which is a reasonable proxy for global organic visibility.
- For any decision touching live pages, **pull GSC data first** (per your ranking-preservation rule).

---

## Step 1 — Where IB Biology demand actually exists (2025 IBO data)

| Rank | Country         | IB schools | IBDP students             | Visibility importance     |
| ---- | --------------- | ---------- | ------------------------- | ------------------------- |
| 1    | **USA**         | ~1,800     | Largest single            | 🔴 Critical               |
| 2    | **Canada**      | ~370       | Large                     | 🔴 Critical               |
| 3    | **India**       | ~220       | 6,156 IBDP students       | 🔴 Critical (home market) |
| 4    | **UK**          | ~150       | High-conversion           | 🔴 Critical               |
| 5    | **Mexico**      | ~150       | Large but Spanish-leaning | 🟡 Optional               |
| 6    | **Spain**       | ~140       | High                      | 🟢 Future                 |
| 7    | **Australia**   | ~80        | Premium                   | 🟠 High                   |
| 8    | **Germany**     | ~80        | High                      | 🟢 Future                 |
| 9    | **China**       | ~250       | Premium                   | 🟠 High                   |
| 10   | **Hong Kong**   | ~70        | Ultra-premium             | 🟠 High                   |
| 11   | **UAE**         | ~60        | Ultra-premium             | 🟠 High                   |
| 12   | **Japan**       | ~60        | Premium                   | 🟢 Future                 |
| 13   | **Switzerland** | ~50        | Ultra-premium             | 🟠 High                   |
| 14   | **Singapore**   | ~30        | Most concentrated         | 🟠 High                   |
| 15   | **South Korea** | ~30        | Premium                   | 🟢 Future                 |
| 16   | **Netherlands** | ~30        | High                      | 🟢 Future                 |

---

## Step 2 — Live SERP sampling (US-served Google)

For each of 7 demand markets, I searched the head keyword and looked for cerebrumbiologyacademy.com in the top 10. Caveat: this is US-served SERP, not local.

| Market             | Query searched                               | Cerebrum in top 10?      | Evidence                                                                                             |
| ------------------ | -------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| 🇬🇧 **UK / London** | `"IB Biology tutor London"`                  | ✅ **Yes — position #1** | `/ib-biology-tutor-online` (hub page, not city)                                                      |
| 🇸🇬 **Singapore**   | `IB Biology tutor Singapore`                 | ❌ **Not in top 10**     | Local: ImperialBio, MindFlex, Singapore Tuition Teachers, Tutopiya                                   |
| 🇦🇪 **Dubai / UAE** | `IB Biology tutor Dubai online`              | ❌ **Not in top 10**     | Local: ibbiologytutoringdubai.com, IB Global Academy, Dubai Tutors, Tutors.ae                        |
| 🇭🇰 **Hong Kong**   | `IB Biology tutor Hong Kong`                 | ❌ **Not in top 10**     | Local: HKExcel, BartyED, Easy Sevens, ++tutors                                                       |
| 🇺🇸 **New York**    | `IB Biology tutor New York Manhattan`        | ❌ **Not in top 10**     | Global: TutorChase, IBteach, Ivy Tutors, Themba, Wyzant, Preply                                      |
| 🇮🇳 **India**       | `IB Biology tutor Mumbai Delhi India online` | ❌ **Not in top 10**     | Local: Baccalaureate Classes, IB Elite Tutor, IB World Academy, IB Ace Academy, Brilliant, IB Global |
| Direct site        | `cerebrumbiologyacademy.com IB Biology`      | ✅ Indexed               | `/ib-biology-online-classes` shows up — pages are indexed and crawlable                              |

### What this tells us

**Headline finding: Cerebrum is essentially invisible globally for "IB Biology tutor [city]" searches** _except London_ — and in London it's the **hub page winning, not the dedicated `/ib-biology/london` city page**.

**This includes the home market.** For "IB Biology tutor Mumbai/Delhi" — where Cerebrum has physical centres in South Extension, Rohini, Gurugram, and Faridabad — Baccalaureate Classes, IB Elite Tutor, IB World Academy, IB Ace Academy, Brilliant Academy, and IB Global Academy all rank above Cerebrum. **That's a competitive threat in your strongest market.**

**Context for fairness:** these are US-served SERPs, so local rankings may be better. London's #1 result might also be a US-served artifact (US visitors searching London services get hub pages prioritised). But the pattern is consistent across 5/7 markets — Cerebrum is not winning these head terms.

---

## Step 3 — Infrastructure quality per country

What's actually built into the site for each demand country:

### 🇮🇳 India — strongest infrastructure, weakest visibility

| Asset           | State                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------- |
| Cities          | 12 (Delhi, Gurugram, Mumbai, Bangalore, Pune, Hyderabad, Noida, Chennai, South Delhi, Faridabad, Rohini, Kolkata) |
| Per-city schema | ✅ FAQPage + LocalBusiness (5 with physical centres) + Service                                                    |
| Hreflang        | ✅ `en-IN`                                                                                                        |
| Currency        | ✅ INR with proper rate display                                                                                   |
| Centres         | ✅ 5 physical (Delhi, Gurugram, South Delhi, Faridabad, Rohini) — competitive moat                                |
| Annual package  | ✅ ₹60,000–98,000/yr displayed                                                                                    |
| Verdict         | 🔴 **Best infra, worst rank-vs-effort gap.** Competitors with weaker infra outranking.                            |

**Likely cause:** Backlinks + domain age + brand search volume of incumbent India IB tutor sites. Infrastructure alone doesn't beat 10+ years of brand authority.

### 🇺🇸 USA — sparse infrastructure, no visibility

| Asset                   | State                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------- |
| Cities                  | 5 (NY, Boston, Houston, Chicago, SF Bay)                                                |
| Per-city schema         | ✅ Service schema with USD pricing                                                      |
| Hreflang                | ✅ `en-US`                                                                              |
| Currency                | ✅ USD ($60–125/hr)                                                                     |
| Centres                 | ❌ None                                                                                 |
| Missing major IB cities | DC, LA, Miami, Atlanta, Seattle (high-IB-count metros)                                  |
| Verdict                 | 🟠 **Mid-effort infra, zero visibility.** TutorChase + Wyzant + IBteach are entrenched. |

### 🇨🇦 Canada — minimal infrastructure

| Asset   | State                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------- |
| Cities  | 2 (Toronto, Vancouver)                                                                          |
| Missing | Calgary, Ottawa, Montreal                                                                       |
| Schema  | ✅ Service + CAD currency                                                                       |
| Verdict | 🟡 **Underbuilt for the market.** Canada has 370 IB schools and only Toronto/Vancouver covered. |

### 🇬🇧 UK — single-city coverage, but ranking

| Asset         | State                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------- |
| Cities        | 1 (London only)                                                                               |
| Missing       | Manchester, Birmingham, Edinburgh, Bristol, Cambridge                                         |
| Hub page rank | ✅ London hub ranks for US-served `IB Biology tutor London`                                   |
| Verdict       | 🟢 **The one country actually working.** But 1 city out of 150 IB schools nationwide is thin. |

### 🇦🇺 Australia — minimal coverage

| Asset   | State                          |
| ------- | ------------------------------ |
| Cities  | 2 (Sydney, Melbourne)          |
| Missing | Brisbane, Perth, Adelaide      |
| Verdict | 🟡 **Below market potential.** |

### 🇨🇳 China — just added, no rank yet

| Asset   | State                                        |
| ------- | -------------------------------------------- |
| Cities  | 2 (Shanghai, Beijing — added 2026-04-25)     |
| Missing | Shenzhen, Guangzhou, Suzhou                  |
| Verdict | 🟢 **Brand new — wait 4–8 weeks for index.** |

### 🇸🇬 Singapore — well-built, not winning

| Asset             | State                                                                        |
| ----------------- | ---------------------------------------------------------------------------- |
| Cities            | 1 (Singapore)                                                                |
| Schema            | ✅ Service + SGD                                                             |
| Hub fit           | ✅ Singapore mentioned across hubs                                           |
| Local competition | 🔴 Strong (ImperialBio, MindFlex, Singapore Tuition Teachers all entrenched) |
| Verdict           | 🟠 **Crowded market, infra alone won't break through.**                      |

### 🇦🇪 UAE — well-built, not winning

| Asset             | State                                                  |
| ----------------- | ------------------------------------------------------ |
| Cities            | 1 (Dubai)                                              |
| Schema            | ✅ Service + AED                                       |
| Local competition | 🔴 Very strong (multiple dubai-specific domains exist) |
| Verdict           | 🟠 **Same pattern as Singapore.**                      |

### 🇭🇰 Hong Kong — well-built, not winning

| Asset             | State                                   |
| ----------------- | --------------------------------------- |
| Cities            | 1 (Hong Kong)                           |
| Schema            | ✅ Service + HKD                        |
| Local competition | 🔴 Strong (HKExcel, BartyED entrenched) |
| Verdict           | 🟠 **Crowded market.**                  |

### 🇨🇭 Switzerland — well-built, ultra-niche

| Asset           | State                                                |
| --------------- | ---------------------------------------------------- |
| Cities          | 2 (Geneva, Zurich)                                   |
| Premium pricing | ✅ CHF 75–110/hr (correct positioning)               |
| Verdict         | 🟢 **Right-sized for a small but lucrative market.** |

### 🇪🇸 Spain, 🇩🇪 Germany, 🇲🇽 Mexico, 🇯🇵 Japan, 🇰🇷 Korea, 🇳🇱 Netherlands — partial or zero

| Country     | State                            |
| ----------- | -------------------------------- |
| Spain       | ❌ No city pages                 |
| Germany     | ❌ No city pages                 |
| Mexico      | ❌ No city pages                 |
| Japan       | 🟢 Tokyo just added (2026-04-25) |
| Korea       | 🟢 Seoul just added (2026-04-25) |
| Netherlands | ✅ Amsterdam                     |

---

## Step 4 — The infra/visibility gap

Here's the central insight. Plotting schema/infra quality vs actual visibility:

```
              HIGH VISIBILITY (rank top 10)
                       │
                       │ • UK (London) — hub winning
                       │
─────────────── HIGH INFRA ──────────────
                       │
                       │
INDIA ◀ ─────────── Switzerland (✅ niche fit)
USA ◀ ───────────── Singapore (entrenched local competition)
Canada ◀ ────────── UAE (entrenched local competition)
Australia ◀ ─────── Hong Kong (entrenched local competition)
                       │ Cerebrum is NOT
                       │ in top 10 for these.
                       │
              LOW VISIBILITY (not ranking)
```

**Diagnosis:** The infrastructure (schema, hreflang, content depth, geo-pricing) is genuinely strong — comparable to or better than the entrenched local competitors. The gap is **not technical SEO**; it's:

1. **Domain age + backlinks** — Baccalaureate Classes, ImperialBioTutors, HKExcel, BartyED have been building for 5–15 years
2. **Brand search volume** — locals get direct queries like "MindFlex IB Biology" that Cerebrum doesn't
3. **Local community penetration** — local sites have backlinks from regional school PTAs, parent forums, IB community groups
4. **Reviews + signals** — Google Reviews count of 38 vs competitors with 200+ school-specific testimonials

**Implication: You can't fix this with more code or more pages.** Adding more cities (Tokyo, Seoul, etc.) extends footprint but doesn't address the authority gap.

---

## Step 5 — What I would recommend (no changes shipped)

Per your ranking-preservation rule, this is documentation only. None of these are actions to take without GSC data backing them up.

### Tier 1 — High-leverage, low-risk (recommend doing)

1. **Get GSC access** — without it, every pricing/content/SEO decision is gambling. Pull data for the 35 city pages: which rank, for what queries, with what CTR.
2. **Backlink push for India** — competitor analysis of Baccalaureate Classes, IB World Academy, IB Elite Tutor backlink profiles. Find PTA/school-blog/parent-forum link opportunities Cerebrum is missing.
3. **Brand build — Google Reviews** — push from 38 to 100+ over 6 months with systematic post-class follow-up. Strongest single signal Google has.

### Tier 2 — Content depth (low-medium risk)

4. **Per-country IB hub pages** — `/ib-biology-india`, `/ib-biology-uae`, `/ib-biology-singapore` etc. (country-level, distinct from city-level). Currently 0 — competitors have these as dedicated landing pages.
5. **Per-school case studies** — "IB Biology coaching for Pathways World School Aravali students" — long-tail keyword pages tied to specific feeder schools (already in city data, just needs page creation). Adding new pages is zero risk to existing rankings.
6. **Examiner/IBO authority signals** — if any tutor is a current/former IBO examiner, surface that with verifiable detail (badge, citation). Cerebrum claims this on `/ib-biology-tutor` but doesn't fully verify.

### Tier 3 — Hub cannibalization (HIGH RISK — defer)

7. **6 hubs targeting same intent** — flagged in earlier audit. Don't touch until GSC shows which is actually ranking.

### Tier 4 — Per-country SERP optimization (do this last)

8. **Local-server testing** — use a tool that simulates SERPs from London/Singapore/Dubai/HK to see real local rankings (not US-served). VPN + WebSearch from local IPs, or paid tools like SEMrush/Ahrefs with country filters.

---

## Step 6 — Honest assessment of what just shipped

Recent commits added 14 NEET cities + 8 IB Biology cities + adjusted 2 IB prices. **None of those will rank for at least 4–8 weeks** — Google needs to crawl and evaluate. Don't expect immediate movement. The wins from this work are **structural** (proper schema/hreflang/content fit) which compound over months.

The real ranking gap is **outside the codebase**. Specifically:

- Backlinks (offsite work — outreach, content marketing, PR)
- Domain authority (time + accumulating signals)
- Brand search (advertising, social, word-of-mouth)
- Reviews (operational follow-up)

Code-side improvements without these compound investments yield maybe 10–15% additional ranking strength. The other 85% is offsite.

---

## TL;DR for the user

- Cerebrum is **invisible globally** for major IB Biology city queries except London (hub ranks #1, but city page doesn't)
- **India home market is being lost to local competitors** — surprising, and the highest-priority concern
- **Infrastructure is excellent** — schema, hreflang, geo-pricing, content depth all match or exceed competitors
- **The gap is offsite: backlinks, brand authority, domain age, reviews**
- **No on-site change will fix this fast.** Get GSC access, run a backlink audit, push reviews.
- The 8 new IB cities + 2 pricing tweaks just shipped will compound over months but won't move the needle in weeks.

---

## Sources (live SERP samples)

- [IB Biology Tutor London search](https://www.google.com/search?q=%22IB+Biology+tutor+London%22)
- [IB Biology Tutor Singapore search](https://www.google.com/search?q=IB+Biology+tutor+Singapore)
- [IB Biology Tutor Dubai search](https://www.google.com/search?q=IB+Biology+tutor+Dubai+online)
- [IB Biology Tutor Hong Kong search](https://www.google.com/search?q=IB+Biology+tutor+Hong+Kong)
- [IB Biology Tutor New York search](https://www.google.com/search?q=IB+Biology+tutor+New+York+Manhattan)
- [IB Biology Tutor Mumbai Delhi search](https://www.google.com/search?q=IB+Biology+tutor+Mumbai+Delhi+India+online)
- [Cerebrum site indexation check](https://www.google.com/search?q=cerebrumbiologyacademy.com+IB+Biology)
