/**
 * South Delhi locality enrichment — the curated 8 /neet-coaching-south-delhi/[area]
 * pages that are UN-REDIRECTED and indexable (2026-07).
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
      'Ber Sarai is where serious aspirants live: the PG and hostel lanes between IIT Delhi and JNU fill every season with NEET students from Bihar, UP, Haryana, Rajasthan and the North-East who moved to Delhi for the big Kalu Sarai coaching brands. Most of them discover the same gap — in a 100-student integrated batch, Biology gets the least attention despite carrying 360 of 720 marks. That is the gap we close. Keep your integrated coaching if it is working; bring your Biology to a specialist. Our small batches are taught by AIIMS-trained faculty at the South Extension centre (15 minutes up the Ring Road) — or live online from your PG room, which most Ber Sarai students prefer on heavy-schedule days.',
  },
  'katwaria-sarai': {
    metaTitle: 'NEET Biology Coaching in Katwaria Sarai | Cerebrum Academy',
    metaDescription:
      'Katwaria Sarai NEET aspirants: specialist Biology coaching to run alongside your Kalu Sarai batch. AIIMS-trained faculty, small batches, online or at South Extension.',
    intro:
      'Katwaria Sarai has been a launchpad for competitive-exam aspirants for two decades — its hostels and PGs by the IIT main gate house NEET repeaters and droppers from across India, most enrolled in a large integrated programme nearby. What the big halls cannot give is per-student attention in Biology, the subject that decides half the NEET paper. Our answer is a specialist track that runs alongside whatever coaching you already attend: AIIMS-trained faculty, batches small enough that your name is known, weekly testing with mistake-level review, joinable live online from your room or in person at South Extension — one straight run up Aurobindo Marg.',
  },
  'andrews-ganj': {
    metaTitle: 'NEET Biology Coaching in Andrews Ganj | Walk to Our Centre | Cerebrum',
    metaDescription:
      'Andrews Ganj families: Cerebrum’s flagship NEET Biology centre at D-35 South Extension Part 2 is a short walk away. Small batches, AIIMS-trained faculty, 98% success rate.',
    intro:
      'If you live in Andrews Ganj, our flagship centre is effectively your neighbourhood classroom — D-35 South Extension Part 2 sits directly across the Ring Road, closer than any of the big-brand coaching centres. Students from Holy Child Auxilium, Modern School and DPS walk or take a two-minute auto ride and get what the marquee institutes rarely offer this close to home: AIIMS-trained faculty teaching Biology in genuinely small batches, with every student’s test data tracked week by week. For Class 11, Class 12 and droppers in Andrews Ganj, this is NEET Biology preparation without the commute tax.',
  },
  'kidwai-nagar': {
    metaTitle: 'NEET Biology Coaching in Kidwai Nagar | Near AIIMS | Cerebrum',
    metaDescription:
      'Kidwai Nagar East & West — NEET Biology coaching minutes from home. AIIMS-trained faculty, small batches at South Extension, or live online. Ideal for KV AIIMS students.',
    intro:
      'Kidwai Nagar sits in the shadow of AIIMS — many of its government-officer families see India’s best doctors at work every day, and many of their children want to be exactly that. From the redeveloped towers of Kidwai Nagar East or the older West blocks, our South Extension flagship is one stop up the Ring Road; the AIIMS and Kidwai Nagar metro stations bracket the colony. We teach NEET Biology the way toppers actually learn it — AIIMS-trained faculty, small accountable batches, NCERT-anchored notes and relentless testing — in person at South Extension or live online for students juggling KV schedules.',
  },
  'sarojini-nagar': {
    metaTitle: 'NEET Biology Coaching in Sarojini Nagar | Cerebrum Academy',
    metaDescription:
      'Sarojini Nagar & INA families: specialist NEET Biology coaching nearby — small batches, AIIMS-trained faculty at South Extension, minutes away on the Pink Line, or online.',
    intro:
      'Sarojini Nagar is far more than its famous market — behind the shopping lanes are thousands of government quarters whose families prize stable, serious education. For their NEET aspirants, most of whom study at Kendriya Vidyalaya or the Army School, the choice has been a long commute to Kalu Sarai’s crowded halls or nothing. Our South Extension centre changes that equation: it is minutes away past INA on the Ring Road, and it offers what big batches cannot — AIIMS-trained faculty who know every student, batch sizes that allow real doubt-solving, and a testing rhythm that keeps Biology marks climbing. Live online seats exist for students who prefer to study from home.',
  },
  'moti-bagh': {
    metaTitle: 'NEET Biology Coaching in Moti Bagh | Cerebrum Academy',
    metaDescription:
      'Moti Bagh — NEET Biology coaching for Air Force Bal Bharati, Army Public School & KV students. Small batches, AIIMS-trained faculty, own metro stop, online option.',
    intro:
      'Moti Bagh’s service families — from the older blocks to the New Moti Bagh towers and neighbouring Netaji Nagar, clustered around Bhikaji Cama Place with the Pink Line at their doorstep — raise disciplined students, and discipline is exactly what NEET Biology rewards. Aspirants here from Air Force Bal Bharati, Army Public School and the Kendriya Vidyalayas usually face a trek to a coaching hub; ours is the shorter trip, straight down the Ring Road to South Extension. AIIMS-trained faculty, small batches where attendance and test scores are personally tracked, and a live online option for weeks when the schedule (or a posting) makes travel hard — that is the programme, without the big-brand crowd.',
  },
  'lodhi-colony': {
    metaTitle: 'NEET Biology Coaching in Lodhi Colony | Cerebrum Academy',
    metaDescription:
      'Lodhi Colony & Khan Market area — premium NEET Biology coaching without the premium crowd. AIIMS-trained faculty, small batches at South Extension, or live online.',
    intro:
      'Lodhi Colony pairs heritage streets and art walls with some of Delhi’s most education-focused households — and it anchors the wider Khan Market catchment, from Golf Links and Jor Bagh to Sunder Nagar. Students here attend Modern School Barakhamba, St. Columba’s and Mater Dei, and their families expect teaching of the same calibre. For NEET Biology, that calibre means AIIMS-trained faculty rather than a franchise classroom: our South Extension flagship is a ten-minute drive down Lodhi Road, and our batches stay small enough that every doubt gets answered the day it appears. Prefer to skip Delhi traffic entirely? The same faculty teach the same batches live online.',
  },
  chanakyapuri: {
    metaTitle: 'NEET Biology Coaching near Chanakyapuri | Sanskriti School Students | Cerebrum',
    metaDescription:
      'Chanakyapuri & diplomatic-enclave families: specialist NEET Biology coaching for Sanskriti School, Carmel Convent & Navy Children School students. Small batches, AIIMS-trained faculty.',
    intro:
      'Chanakyapuri is unlike any other Delhi catchment — embassy and senior-officer families, green avenues, and schools like Sanskriti, Carmel Convent and Navy Children School whose students routinely aim at AIIMS-level outcomes. What the enclave lacks is serious coaching infrastructure of its own, and the trek to a Kalu Sarai hall wastes exactly the hours these students don’t have. Our South Extension flagship is a 15-minute Ring Road run — or the same AIIMS-trained faculty teach live online, which suits families who relocate on posting. Small batches, personal tracking, and Biology treated as the specialist subject it is.',
  },
  'gulmohar-park': {
    metaTitle: 'NEET Biology Coaching in Gulmohar Park | Centre In Your Colony | Cerebrum',
    metaDescription:
      'Cerebrum’s Green Park centre is at B-113 Gulmohar Park — NEET Biology coaching inside your own colony. AIIMS-trained faculty, small batches, walk from Hauz Khas & SDA.',
    intro:
      'For Gulmohar Park, this is not “coaching nearby” — our centre is inside the colony itself, at B-113 Gulmohar Park, a short walk from every block and from Neeti Bagh, SDA and Hauz Khas Enclave next door. The neighbourhood’s students — many at Sardar Patel Vidyalaya, Springdales and The Shri Ram School — get AIIMS-trained Biology faculty and small, personally tracked batches without crossing a single main road. It is the rare South Delhi arrangement where the specialist centre is closer than the school bus stop, and it is why Gulmohar Park and Neeti Bagh families treat NEET Biology as the one subject already sorted.',
  },
}

export function getSouthDelhiEnrichment(slug: string): SouthDelhiEnrichment | undefined {
  return southDelhiEnriched[slug]
}
