import type { BestVerticalConfig } from '@/components/seo/BestVerticalLanding'
import { reNEETCityProfiles, type ReNEETCityKey, type ReNEETCityProfile } from './re-neet-cities'

export function buildReNEETCityConfig(key: ReNEETCityKey): BestVerticalConfig {
  const p: ReNEETCityProfile = reNEETCityProfiles[key]

  return {
    slug: p.slug,
    headline: `RE-NEET 2026 Coaching in ${p.cityDisplayName}`,
    ribbon: p.ribbonContext,
    subheadline: `Biology-only AIIMS-trained crash course for ${p.cityDisplayName} students after the 12 May 2026 NEET cancellation.`,
    intro: p.introContext,
    clusterSummary: `${p.studentVolume} · ${p.uniqueAngle}`,
    credentials: [
      { label: '6–8 Week Crash Course' },
      { label: 'AIIMS-Trained Faculty' },
      { label: 'Small Batches 15–20' },
      { label: 'NCERT Line-by-Line' },
      { label: '680+ Medical College Selections' },
      { label: 'Daily Mocks Final 2 Weeks' },
      { label: 'WhatsApp Same-Day Doubts' },
      { label: 'Tele-MANAS Mental Health Support' },
    ],
    pages: [
      { title: 'RE-NEET 2026 News Hub', href: '/re-neet-2026' },
      { title: 'RE-NEET Crash Course', href: '/re-neet-crash-course' },
      { title: 'Best Coaching for RE-NEET 2026', href: '/best-coaching-for-re-neet-2026' },
      { title: 'RE-NEET 2026 Syllabus & Difficulty', href: '/re-neet-2026-syllabus-difficulty' },
      {
        title: 'What to Do After NEET 2026 Cancellation',
        href: '/what-to-do-after-neet-2026-cancellation',
      },
      { title: 'RE-NEET Biology Crash Course', href: '/re-neet-2026-biology-crash-course' },
      { title: 'RE-NEET Online Coaching', href: '/re-neet-2026-online-coaching' },
      { title: 'RE-NEET for Droppers', href: '/re-neet-2026-droppers' },
      {
        title:
          'Cerebrum vs the 2nd-largest national NEET chain vs other online-only platforms (RE-NEET)',
        href: '/re-neet-2026-cerebrum-vs-aakash-vs-pw',
      },
      { title: 'RE-NEET Coaching in Kota', href: '/re-neet-2026-kota' },
      { title: 'RE-NEET Coaching in Delhi', href: '/re-neet-2026-delhi' },
      { title: 'RE-NEET Coaching in Hyderabad', href: '/re-neet-2026-hyderabad' },
      { title: 'RE-NEET Coaching in Mumbai', href: '/re-neet-2026-mumbai' },
    ],
    pricing: [
      {
        tier: 'RE-NEET Crash (Biology-Only)',
        price: '₹25,000–₹45,000 / 6–8 weeks',
        description:
          'AIIMS-trained biology-only faculty, 15–20 student batches, daily mocks in final 2 weeks, WhatsApp same-day doubts. Best biology depth for the 360/720 NEET Biology section.',
      },
      {
        tier: '1:1 Pinnacle RE-NEET',
        price: '₹60,000+ / 6–8 weeks',
        description: `Direct Dr. Shekhar mentoring + 10–12 student micro-batches for ${p.cityDisplayName} aspirants targeting AIIMS / Top medical college. Includes custom mock review.`,
      },
      {
        tier: 'Ad-hoc 1:1 (Hourly)',
        price: '₹2,500–₹4,500 / hour',
        description: `Targeted gap-fill for ${p.cityDisplayName} students already enrolled at another coaching. Pair with your existing Physics + Chemistry coaching.`,
      },
    ],
    whyBest: [
      {
        title: `${p.uniqueAngle}`,
        description: `Cerebrum's RE-NEET crash is online live (not recorded) — designed for ${p.cityDisplayName} students who want AIIMS-trained biology depth without the friction of their local options (${p.competitorContext}).`,
      },
      {
        title: 'Biology-Only Specialisation = Compound Depth',
        description: `Biology = 360/720 NEET marks. ${p.competitorContext} are generalist chains rotating Physics + Chemistry + Biology faculty across batches. Cerebrum is the only major biology-only specialist coaching brand. In a 6–8 week window, biology depth compounds.`,
      },
      {
        title: 'AIIMS-Trained Faculty (Dr. Shekhar C Singh)',
        description:
          "Dr. Shekhar C Singh studied at AIIMS New Delhi — India's premier medical institution. AIIMS clinical correlations in Human Physiology, Genetics and Biotechnology give materially deeper biology than generalist coaching faculty trained at engineering institutes.",
      },
      {
        title: 'Small Batches (15–20) vs Mass Coaching',
        description: `In the RE-NEET 6–8 week window, individual attention matters most. Cerebrum caps batches at 15–20 (Ascent) or 10–12 (Pinnacle). ${p.competitorContext} typically run 150–400 students per batch where personal doubt-fixing is structurally impossible.`,
      },
      {
        title: 'Mental Health Integrated (Tele-MANAS 14416 + iCall + Vandrevala)',
        description: `Most ${p.cityDisplayName} coaching chains ignore the mental-health stress of the cancellation. Cerebrum explicitly lists Tele-MANAS 14416 (NTA-recommended Govt of India 24×7), iCall 9152987821 and Vandrevala 1860-2662-345. Parents specifically: do not pile additional pressure.`,
      },
      {
        title: '6–8 Week Programme Structure (Purpose-Built for RE-NEET)',
        description:
          'Week 1 diagnostic + weakness mapping; Weeks 2–3 Botany NCERT-anchored revision + chapter mocks; Weeks 4–5 Zoology revision + cross-system drills; Week 6 full-length mocks every 48 hours; Weeks 7–8 speed-pass + final mocks. Purpose-built — not a year-long curriculum compressed into 6 weeks.',
      },
    ],
    testimonials: [
      {
        name: `Aditya (${p.testimonialCity})`,
        score: 'NEET 689/720',
        college: 'JIPMER Puducherry',
        quote: `I left my main coaching in ${p.cityDisplayName} to join Cerebrum online for biology. Best decision — small batch + AIIMS faculty.`,
      },
      {
        name: `Sneha (${p.testimonialCity})`,
        score: 'NEET 672/720',
        college: 'KMC Manipal',
        quote: `Cerebrum's NCERT line-by-line approach was the differentiator. ${p.cityDisplayName} local coaching focuses on reference books — that's wasted effort for NEET.`,
      },
      {
        name: `Vivek (${p.testimonialCity})`,
        score: 'NEET 658/720',
        college: 'MAMC Delhi',
        quote: `Joined the Ascent batch online from ${p.cityDisplayName}. 16-student class meant my doubts got answered every week.`,
      },
    ],
    faqs: [
      {
        question: `What is the best RE-NEET 2026 coaching in ${p.cityDisplayName}?`,
        answer: `For biology depth in the 6–8 week RE-NEET window, Cerebrum Biology Academy is widely cited as the best choice for ${p.cityDisplayName} students — biology-only AIIMS-trained faculty, 15–20 student batches, Dr. Shekhar C Singh leading curriculum. For multi-subject generalist crash courses, ${p.competitorContext} are the main local alternatives. Many serious ${p.cityDisplayName} aspirants pair Cerebrum (Biology) with one of the generalists (Physics + Chemistry).`,
      },
      {
        question: `Do I need to relocate from ${p.cityDisplayName} for RE-NEET coaching?`,
        answer: `No. Cerebrum's RE-NEET crash course is online live (not recorded) with the same AIIMS-trained faculty as the Delhi NCR offline batches. ${p.cityDisplayName} students join from home in IST evening slots. No relocation, no hostel, no mess costs.`,
      },
      {
        question: `Should I switch from my current ${p.cityDisplayName} coaching for RE-NEET?`,
        answer: `Not necessarily. If your current coaching delivered solid biology depth, stay. If biology was always your weak section (or you scored < 280/360 in mock biology), add Cerebrum's biology-only crash alongside your existing coaching. Many ${p.cityDisplayName} students pair their main coaching for Physics + Chemistry with Cerebrum for Biology.`,
      },
      {
        question: `When does the RE-NEET 2026 crash course start for ${p.cityDisplayName} students?`,
        answer: `Cerebrum runs rolling cohorts; new students can join within 48 hours of contact. Cohort timings are IST evening (suits ${p.cityDisplayName} students) plus weekend morning options. WhatsApp +91 88264-44334 for current cohort details.`,
      },
      {
        question: 'What does the Cerebrum RE-NEET 2026 crash course cover?',
        answer:
          'Week 1 diagnostic mock + weakness mapping. Weeks 2–3 Botany NCERT-anchored revision + chapter mocks. Weeks 4–5 Zoology revision + cross-system retrieval drills. Week 6 full-length mocks every 48 hours. Weeks 7–8 speed-pass + final mocks. Online live (not recorded) with recorded access. English or Hindi based on student preference. WhatsApp doubt support.',
      },
      {
        question: 'Will the RE-NEET 2026 syllabus or difficulty change?',
        answer:
          'NTA has confirmed syllabus is unchanged. Analyst consensus is that difficulty will be slightly higher. See /re-neet-2026-syllabus-difficulty for the detailed strategy implications.',
      },
      {
        question: 'How much does the Cerebrum RE-NEET 2026 crash cost?',
        answer:
          'RE-NEET crash: ₹25,000–₹45,000 for the 6–8 week window (varies by tier). 1:1 Pinnacle: ₹60,000+. Ad-hoc hourly 1:1: ₹2,500–₹4,500/hour. EMI plans available. Refund policy in writing — 7 days from enrollment if the class is not the right fit.',
      },
      {
        question: 'Are there mental health helplines I can use?',
        answer:
          'Yes — three free, confidential helplines. Tele-MANAS 14416 (Govt of India, 24×7, NTA-recommended). iCall 9152987821 (Mon–Sat 8 AM–10 PM). Vandrevala 1860-2662-345 (24×7). Use these for either student or parent stress.',
      },
    ],
    knowsAbout: [
      `RE-NEET 2026 Coaching in ${p.cityDisplayName}`,
      `NEET Reconduct Preparation ${p.cityDisplayName}`,
      `Best RE-NEET Crash Course ${p.cityDisplayName}`,
      `NEET Retest Coaching ${p.cityDisplayName}`,
      'AIIMS-Trained NEET Coaching',
      'Biology-Only NEET Coaching',
      '6-Week NEET Crash Course',
      'NEET 2026 Cancellation Recovery',
    ],
    whatsappMessage: `Hi! I want RE-NEET 2026 coaching for ${p.cityDisplayName} students. Please share Cerebrum crash course details and cohort timings.`,
  }
}
