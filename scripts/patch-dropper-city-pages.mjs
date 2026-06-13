#!/usr/bin/env node
/**
 * Patch already-generated dropper city pages:
 *   1. Add `languages: { 'en-IN': url, en: url }` to metadata.alternates
 *   2. Add `cityContext` paragraph passed to the shared template
 *
 * Idempotent — safe to re-run.
 */

import { readFileSync, writeFileSync } from 'fs'

const CITIES = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    cityContext: `Mumbai droppers face a specific cocktail of pressures: a long commute culture, intense parental and peer expectations, and a coaching market dominated by all-subjects giants like Aakash Andheri, Allen Bandra-Kurla, and Resonance Vile Parle. Most of those institutes are excellent for physics and chemistry — but biology is where droppers actually lose marks (typically 30–40 marks per attempt), and biology is where Cerebrum's specialisation matters.

We see a recurring profile: a student who scored 480–540 on the first attempt, with biology dragging the total down because the chapter coverage was too quick and the question practice was too generic. A focused 1-year biology programme — 2 hours a day of live classes calibrated to the IST evening — typically lifts that biology score by 30–50 marks in itself. Combine that with disciplined physics-chemistry self-study and most students cross the 600 mark.

Our Mumbai cohort skews toward Andheri, Bandra, Powai, Thane, Navi Mumbai, and Vashi students who prefer online over the daily 2-hour commute to coaching. Printed study material ships pan-Maharashtra at no extra cost.`,
  },
  {
    slug: 'bangalore',
    name: 'Bangalore',
    cityContext: `The Bangalore NEET dropper market has grown fast in the last 5 years, reflecting the city's expanding Indian-American return population and a strong tech-family preference for subject-specialist coaching over generalist big-batch institutes. Local dropper options range from Sri Chaitanya, Narayana, Aakash Jayanagar, and Allen Bangalore down to dozens of smaller neighbourhood coaching centres.

The recurring dropper profile we see in Bangalore: a student from Koramangala, Indiranagar, Whitefield, Electronic City, HSR Layout, or Jayanagar who scored 500–560 on attempt one — strong in physics/chemistry from a CBSE/ICSE background but weaker in NCERT-line-by-line biology depth. Bangalore students are also more likely to ask about online over offline (commute time across the city is real), so the live online format works well — recordings cover the case where Bangalore traffic delays your evening.

Many Bangalore droppers also sit additional Karnataka medical-college-specific exams; our biology preparation maps cleanly to those because the Karnataka state medical syllabus follows NCERT.`,
  },
  {
    slug: 'hyderabad',
    name: 'Hyderabad',
    cityContext: `Hyderabad and Secunderabad together produce one of the densest NEET dropper markets in India — driven heavily by the strong tradition of Telangana and Andhra Pradesh students aiming for Telangana, AP, and central India medical seats. The local coaching market is dominated by Sri Chaitanya, Narayana, FIITJEE, and Aakash Hyderabad, all running large multi-subject batches.

The recurring dropper profile we see: a student from Banjara Hills, Jubilee Hills, Madhapur, Hitec City, Kukatpally, or Secunderabad with a strong physics/chemistry foundation but inconsistent biology depth — particularly on plant physiology and human anatomy where Sri Chaitanya / Narayana cohorts often skim. A focused 1-year biology specialist programme adds the depth that closes the 30–50 mark biology gap most droppers carry into attempt two.

Telugu-medium students from rural Telangana / AP frequently transition to English-medium NEET preparation in Hyderabad; our Hindi/English bilingual study material support is available on request.`,
  },
  {
    slug: 'pune',
    name: 'Pune',
    cityContext: `Pune's NEET dropper market sits in the shadow of Mumbai but has its own distinct character: a strong Maharashtra-state-medical-seat ecosystem, dense engineering/pharma/biotech parental influence, and a growing Indian-American return population in Hinjewadi and Kharadi. Local options include Aakash JM Road, Allen Pune, Resonance, and a long tail of neighbourhood institutes.

We see two recurring dropper profiles in Pune: (1) the Maharashtra state-medical aspirant who needs ~590+ for a Government Medical College seat, dragged down by biology weakness; and (2) the Hinjewadi/Kharadi tech-family student aiming for AIIMS or top central-pool seats, where every biology mark counts. Both benefit from biology specialisation in different ways — the first needs depth at NCERT level done thoroughly; the second needs Campbell-tier depth on the high-yield chapters.

Live online classes calibrated for IST evenings work well for Pune students because weekday traffic between Hinjewadi/Kharadi and central Pune coaching centres can eat 60+ minutes each way.`,
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    cityContext: `Chennai's NEET dropper market is shaped by the strong Tamil Nadu state medical seat ecosystem (the TN state cutoff regularly demands 600+) and a deeply biology-strong student base — Tamil Nadu state-board syllabus has historically over-prepared biology relative to physics and chemistry. The local coaching market is led by Aakash T Nagar, Sri Chaitanya Chennai, FIITJEE, and a strong network of neighbourhood specialist tutors.

The recurring dropper profile we see in Chennai: a student from T. Nagar, Adyar, Velachery, Anna Nagar, OMR, or further south who has a fundamentally strong biology base from state-board prep but whose biology score on attempt one was hurt by NEET-specific question style — the 720-mark NEET paper rewards rapid-recall NCERT detail differently from how Tamil Nadu state board tests it. We focus on bridging that style gap: same biology depth, but NEET-shaped question discipline.

Many Chennai droppers are also strong in Tamil-medium content; we provide Hindi/English bilingual material on request.`,
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    cityContext: `Kolkata's NEET dropper market is smaller in absolute volume than Mumbai or Bangalore but distinguished by historical academic depth — a strong tradition of biology-strong students from Bengali-medium and English-medium schools alike. Local options are led by Aakash Kolkata, FIITJEE, and the neighbourhood tutor network around Park Street, Salt Lake, and New Town.

The recurring dropper profile we see: a student from South Kolkata, Salt Lake, New Town, Behala, or Howrah who scored 480–540 on attempt one with biology underweighted in their preparation. West Bengal state-board students often have strong fundamentals but need NCERT-line-by-line discipline; CBSE/ICSE Kolkata students often have the discipline but need more depth and question-style adaptation.

We see strong demand in Kolkata for a 6-day-a-week intensive online format. Printed material ships to all major Kolkata neighbourhoods at no extra cost.`,
  },
  {
    slug: 'kota',
    name: 'Kota',
    cityContext: `Kota is unique. Most students reading this page are already in town, already enrolled in Allen / Aakash / Resonance / Motion / Vibrant for the dropper year, and looking for something to add to their preparation rather than replace it. We don't compete with the Kota physics-chemistry juggernaut — Allen-Kota's PCM teaching is genuinely excellent — but we know from years of working with Kota dropper alumni that biology is consistently the soft spot.

The recurring profile: a Kota dropper who is on track to score 90+ in physics and chemistry by mid-batch but is sitting at 65–70 in biology and can't see how to push it past 80. The reason is structural — large-batch Kota coaching can't give the per-question discussion time that biology depth requires, and most Kota droppers don't have an extra 4 hours a day for self-study because their physics/chemistry workload is already maximal.

Our Kota integration runs as 6 hours a week of live online biology — early morning before main batches start, or late-evening slots after Allen/Aakash class hours. Specifically designed not to disrupt your existing Kota schedule.`,
  },
]

let count = 0

for (const city of CITIES) {
  const path = `src/app/neet-dropper-batch-${city.slug}/page.tsx`
  const original = readFileSync(path, 'utf8')
  let content = original

  // 1. Add languages to alternates if missing (check inside the alternates block)
  if (!/alternates:\s*\{[^}]*languages:/m.test(content)) {
    content = content.replace(
      /alternates:\s*\{\s*canonical:\s*url,?\s*\}/,
      `alternates: {
    canonical: url,
    languages: {
      en: url,
      'en-IN': url,
      'x-default': url,
    },
  }`
    )
  }

  // 2. Add OG locale if missing
  if (!content.match(/locale:\s*'en_IN'/)) {
    content = content.replace(/openGraph:\s*\{[\s\S]*?type:\s*'website',?\s*\},/m, (match) =>
      match.replace(
        /type:\s*'website',?\s*/,
        `type: 'website',
    locale: 'en_IN',
    `
      )
    )
  }

  // 3. Inject cityContext prop into the <DropperBatchTemplate ... /> call
  if (!content.includes('cityContext={cityContext}')) {
    // First, declare the const above the schemas if not present
    if (!content.includes('const cityContext =')) {
      const escaped = JSON.stringify(city.cityContext)
      content = content.replace(
        /export default function NEETDropperBatch[A-Za-z0-9]+Page\(\) \{/,
        (match) => `const cityContext = ${escaped}

${match}`
      )
    }

    // Then add the prop in the JSX
    content = content.replace(/<DropperBatchTemplate/, `<DropperBatchTemplate`)
    content = content.replace(
      /faqs={faqs}\s*\/>/,
      `cityContext={cityContext}
        faqs={faqs}
      />`
    )
  }

  if (content !== original) {
    writeFileSync(path, content, 'utf8')
    count++
    console.log(`✓ Patched ${path}`)
  } else {
    console.log(`⊘ No change: ${path}`)
  }
}

console.log(`\nPatched ${count} files`)
