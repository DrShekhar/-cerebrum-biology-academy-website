/**
 * South Delhi locality enrichment — the curated 10 /neet-coaching-south-delhi/[area]
 * pages that are UN-REDIRECTED and indexable (2026-07).
 *
 * Intro VOICE (owner-approved 2026-07-24): direct second-person address
 * ("If you live in…"), never third-person audience description. Keep every
 * local fact; speak TO the student/parent.
 *
 * South Delhi is the ONLY NCR family whose enriched file was missing — all 31
 * area pages were consolidated to the hub, which left the flagship's own
 * catchment (D-35 South Extension Part 2) with zero indexable locality pages.
 * The 8 below are chosen because they have NO standalone twin page (verified
 * against src/app — localities like hauz-khas / greater-kailash / kalu-sarai /
 * new-friends-colony DO have standalone pages and stay consolidated here to
 * avoid cannibalisation):
 *
 * - ber-sarai, katwaria-sarai — the IIT-gate PG/hostel belt where outstation
 *   NEET aspirants live while attending the big Kalu Sarai coaching brands.
 * - andrews-ganj, kidwai-nagar, sarojini-nagar, moti-bagh, lodhi-colony —
 *   govt-colony catchment ringing the South Extension flagship / AIIMS.
 * - gulmohar-park — our Green Park centre's OWN colony (B-113 Gulmohar Park).
 *
 * SOURCE OF TRUTH — keep in sync with:
 * - src/config/seo-redirects.mjs (these 8 must NOT appear in any redirect list)
 * - next.config.mjs (the /neet-coaching-south-delhi/:area catch-all must stay removed)
 * - southDelhiAreaRoutes in src/app/sitemap.ts
 */

export const INDEXABLE_SOUTH_DELHI_LOCALITIES = [
  'ber-sarai',
  'katwaria-sarai',
  'andrews-ganj',
  'kidwai-nagar',
  'sarojini-nagar',
  'moti-bagh',
  'lodhi-colony',
  'gulmohar-park',
  'chanakyapuri',
  'rajendra-nagar',
] as const

export interface SouthDelhiEnrichment {
  metaTitle: string
  metaDescription: string
  intro: string
}

export const southDelhiEnriched: Record<string, SouthDelhiEnrichment> = {
  'ber-sarai': {
    metaTitle: 'NEET Biology Coaching in Ber Sarai (Near IIT Delhi) | Cerebrum',
    metaDescription:
      'Living in a Ber Sarai PG for NEET? Add a biology specialist to your prep — small batches, AIIMS-trained faculty, at our South Extension centre 15 minutes away or live online.',
    intro:
      'If you’ve taken a PG in Ber Sarai for your NEET attempt — like thousands of aspirants from Bihar, UP, Haryana, Rajasthan and the North-East who move into the lanes between IIT Delhi and JNU every season — you already know the problem: in a 100-student integrated batch at the big Kalu Sarai brands, Biology gets the least attention despite carrying 360 of 720 marks. Keep your integrated coaching if it’s working for you; bring your Biology to a specialist. You’ll get small batches taught by AIIMS-trained faculty at our South Extension centre, 15 minutes up the Ring Road — or join the same batches live online from your PG room, the way most Ber Sarai students do on heavy-schedule days.',
  },
  'katwaria-sarai': {
    metaTitle: 'NEET Biology Coaching in Katwaria Sarai | Cerebrum Academy',
    metaDescription:
      'Katwaria Sarai NEET aspirants: specialist Biology coaching to run alongside your Kalu Sarai batch. AIIMS-trained faculty, small batches, online or at South Extension.',
    intro:
      'If you’re preparing from a Katwaria Sarai hostel or PG by the IIT main gate — as NEET repeaters and droppers from across India have for two decades — you’re probably enrolled in a large integrated programme nearby. What that big hall can’t give you is per-student attention in Biology, the subject that decides half your NEET paper. Run a specialist track alongside whatever coaching you already attend: AIIMS-trained faculty, batches small enough that your name is known, weekly testing with mistake-level review of YOUR errors — live online from your room, or in person at South Extension, one straight run up Aurobindo Marg.',
  },
  'andrews-ganj': {
    metaTitle: 'NEET Biology Coaching in Andrews Ganj | Walk to Our Centre | Cerebrum',
    metaDescription:
      'Andrews Ganj families: Cerebrum’s flagship NEET Biology centre at D-35 South Extension Part 2 is a short walk away. Small batches, AIIMS-trained faculty, 98% success rate.',
    intro:
      'If you live in Andrews Ganj, our flagship centre is effectively your neighbourhood classroom — D-35 South Extension Part 2 sits directly across the Ring Road, closer than any of the big-brand coaching centres. Whether you’re at Holy Child Auxilium, Modern School or DPS, you can walk or take a two-minute auto ride and get what the marquee institutes rarely offer this close to home: AIIMS-trained faculty teaching Biology in genuinely small batches, with your test data tracked week by week. For Class 11, Class 12 or your dropper year, this is NEET Biology preparation without the commute tax.',
  },
  'kidwai-nagar': {
    metaTitle: 'NEET Biology Coaching in Kidwai Nagar | Near AIIMS | Cerebrum',
    metaDescription:
      'Kidwai Nagar East & West — NEET Biology coaching minutes from home. AIIMS-trained faculty, small batches at South Extension, or live online. Ideal for KV AIIMS students.',
    intro:
      'If your family lives in Kidwai Nagar — the redeveloped East towers or the older West blocks — you see India’s best doctors at work every day in the AIIMS campus next door, and maybe you want to be exactly that. Our South Extension flagship is one stop up the Ring Road, with the AIIMS and Kidwai Nagar metro stations bracketing your colony. You’ll learn NEET Biology the way toppers actually learn it — AIIMS-trained faculty, small accountable batches, NCERT-anchored notes and relentless testing — in person at South Extension, or live online if you’re juggling a KV schedule.',
  },
  'sarojini-nagar': {
    metaTitle: 'NEET Biology Coaching in Sarojini Nagar | Cerebrum Academy',
    metaDescription:
      'Sarojini Nagar & INA families: specialist NEET Biology coaching nearby — small batches, AIIMS-trained faculty at South Extension, minutes away on the Pink Line, or online.',
    intro:
      'If you live in the government quarters behind Sarojini Nagar’s famous market — studying at Kendriya Vidyalaya, the Army School or nearby — your NEET options have usually meant a long commute to Kalu Sarai’s crowded halls, or nothing. Our South Extension centre changes that: it’s minutes away past INA on the Ring Road, and it gives you what big batches can’t — AIIMS-trained faculty who know you by name, batch sizes that allow real doubt-solving, and a testing rhythm that keeps your Biology marks climbing. Prefer studying from home? Live online seats run on the same batches.',
  },
  'moti-bagh': {
    metaTitle: 'NEET Biology Coaching in Moti Bagh | Cerebrum Academy',
    metaDescription:
      'Moti Bagh — NEET Biology coaching for Air Force Bal Bharati, Army Public School & KV students. Small batches, AIIMS-trained faculty, own metro stop, online option.',
    intro:
      'If you’re from a Moti Bagh service family — the older blocks, the New Moti Bagh towers or neighbouring Netaji Nagar — you already have the discipline NEET Biology rewards; what you need is teaching that matches it. Whether you’re at Air Force Bal Bharati, Army Public School or a Kendriya Vidyalaya, skip the trek to a coaching hub: our South Extension centre is the shorter trip, straight down the Ring Road, with the Pink Line at your doorstep. Small batches where your attendance and test scores are personally tracked, AIIMS-trained faculty — and a live online option for the weeks when a posting or schedule makes travel hard.',
  },
  'lodhi-colony': {
    metaTitle: 'NEET Biology Coaching in Lodhi Colony | Cerebrum Academy',
    metaDescription:
      'Lodhi Colony & Khan Market area — premium NEET Biology coaching without the premium crowd. AIIMS-trained faculty, small batches at South Extension, or live online.',
    intro:
      'If you live in Lodhi Colony — or anywhere in the Khan Market belt, from Golf Links and Jor Bagh to Sunder Nagar — you’re used to a certain standard, whether at Modern School Barakhamba, St. Columba’s or Mater Dei. Your NEET Biology teaching should match it: AIIMS-trained faculty rather than a franchise classroom, batches small enough that your doubt gets answered the day it appears, and our South Extension flagship just ten minutes down Lodhi Road. Prefer to skip Delhi traffic entirely? The same faculty teach the same batches live online.',
  },
  'rajendra-nagar': {
    metaTitle: 'NEET Biology Coaching in Old Rajinder Nagar | Cerebrum Academy',
    metaDescription:
      'Old Rajinder Nagar aspirants: add a NEET Biology specialist alongside your coaching. Small batches, AIIMS-trained faculty — live online from your PG, or at our South Extension centre.',
    intro:
      'If you’ve taken a PG in Old Rajinder Nagar — Delhi’s second great aspirant colony, best known for UPSC but home to plenty of NEET droppers drawn by the Karol Bagh–Pusa Road coaching corridor next door — you already live inside a batch-factory ecosystem. What you’re missing is per-student attention in Biology, the subject worth 360 of NEET’s 720 marks. Our small-batch classes fit PG life: live online sessions taught by AIIMS-trained faculty that slot around your institute’s timetable, weekly tests with mistake-level review of your errors — and an in-person option at the South Extension flagship, a direct Metro run away, when you want centre discipline on weekends.',
  },
  chanakyapuri: {
    metaTitle: 'NEET Biology Coaching near Chanakyapuri | Sanskriti School Students | Cerebrum',
    metaDescription:
      'Chanakyapuri & diplomatic-enclave families: specialist NEET Biology coaching for Sanskriti School, Carmel Convent & Navy Children School students. Small batches, AIIMS-trained faculty.',
    intro:
      'If your family is posted in Chanakyapuri — embassy, ministry or services — and you’re at Sanskriti, Carmel Convent or Navy Children School aiming at an AIIMS-level outcome, you’ve probably noticed the enclave has no serious coaching of its own, and the trek to a Kalu Sarai hall wastes exactly the hours you don’t have. Our South Extension flagship is a 15-minute Ring Road run — or the same AIIMS-trained faculty teach you live online, which suits families who relocate on posting. Small batches, personal tracking, and Biology treated as the specialist subject it is.',
  },
  'gulmohar-park': {
    metaTitle: 'NEET Biology Coaching in Gulmohar Park | Centre In Your Colony | Cerebrum',
    metaDescription:
      'Cerebrum’s Green Park centre is at B-113 Gulmohar Park — NEET Biology coaching inside your own colony. AIIMS-trained faculty, small batches, walk from Hauz Khas & SDA.',
    intro:
      'If you live in Gulmohar Park — or next door in Neeti Bagh, SDA or Hauz Khas Enclave — this isn’t “coaching nearby”: our centre is inside your colony, at B-113 Gulmohar Park, a short walk from every block. Whether you’re at Sardar Patel Vidyalaya, Springdales or The Shri Ram School, you get AIIMS-trained Biology faculty and small, personally tracked batches without crossing a single main road. It’s the rare South Delhi arrangement where the specialist centre is closer than your school bus stop — which is why your neighbours already treat NEET Biology as the one subject sorted.',
  },
}

export function getSouthDelhiEnrichment(slug: string): SouthDelhiEnrichment | undefined {
  return southDelhiEnriched[slug]
}
