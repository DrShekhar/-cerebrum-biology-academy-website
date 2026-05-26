/**
 * Unified Pricing Tiers — Pinnacle / Ascent / Pursuit
 *
 * Single source of truth for the 3-tier model across all Cerebrum verticals.
 * Every vertical uses the same tier names, philosophy, and differentiation:
 *
 *   Pinnacle — premium, maximum personalisation (6–10 batch, weekly 1:1)
 *   Ascent   — mid-tier, balanced group + personal (12–16 batch, bi-weekly 1:1)
 *   Pursuit  — accessible, group-first (20–25 batch, monthly 1:1)
 *
 * Verticals divide into two duration types:
 *   Annual (12 months): AP Biology, IB Biology, Biology Olympiad, NEET, NEET NRI
 *   Programme (4–6 months): MCAT, DAT, GAMSAT, USMLE
 */

export type TierName = 'pinnacle' | 'ascent' | 'pursuit'

export interface PricingTier {
  id: TierName
  displayName: string
  tagline: string
  batchSize: string
  oneOnOneAccess: string
  facultyLevel: string
}

export const tierDefinitions: Record<TierName, PricingTier> = {
  pinnacle: {
    id: 'pinnacle',
    displayName: 'Pinnacle',
    tagline: 'Maximum personalisation · Weekly 1:1 · Senior faculty',
    batchSize: '6–10 students',
    oneOnOneAccess: 'Weekly 1:1 with senior faculty',
    facultyLevel: 'AIIMS-trained senior / PhD',
  },
  ascent: {
    id: 'ascent',
    displayName: 'Ascent',
    tagline: 'Balanced group + personal · Bi-weekly 1:1',
    batchSize: '12–16 students',
    oneOnOneAccess: 'Bi-weekly 1:1',
    facultyLevel: 'Senior faculty',
  },
  pursuit: {
    id: 'pursuit',
    displayName: 'Pursuit',
    tagline: 'Accessible group-first · Monthly 1:1',
    batchSize: '20–25 students',
    oneOnOneAccess: 'Monthly 1:1',
    facultyLevel: 'Experienced faculty',
  },
}

// ─── ANNUAL VERTICALS (12-month commitment) ─────────────────────────────────

export const apBiologyTiers = {
  pinnacle: { price: 7000, currency: 'USD', label: '$7,000/yr', includes: 'All 8 CED units, FRQ rubric mastery, USABO bridge, 48+ live hours, Anki decks, weekly PhD 1:1' },
  ascent:   { price: 4500, currency: 'USD', label: '$4,500/yr', includes: 'All 8 units, FRQ drilling, 36 live hours, practice exam bank, bi-weekly 1:1' },
  pursuit:  { price: 2500, currency: 'USD', label: '$2,500/yr', includes: 'All 8 units, group FRQ practice, 24 live hours, recorded library, monthly 1:1' },
}

export const ibBiologyTiers = {
  pinnacle: { price: 8000, currency: 'USD', label: '$8,000/yr', includes: 'HL+SL, IA end-to-end (topic→submission), EE supervision, Paper 1+2 mocks, weekly examiner 1:1' },
  ascent:   { price: 6000, currency: 'USD', label: '$6,000/yr', includes: 'HL+SL, IA guidance, 150+ live hours, past-paper bank, bi-weekly 1:1' },
  pursuit:  { price: 3500, currency: 'USD', label: '$3,500/yr', includes: 'HL or SL, group IA workshops, recorded library, doubt support, monthly 1:1' },
}

export const usaboTiers = {
  pinnacle: { price: 6000, currency: 'USD', label: '$6,000/yr', includes: 'Campbell + Alberts + Lehninger, national + IBO level, lab practicals, weekly 1:1, interview prep' },
  ascent:   { price: 4500, currency: 'USD', label: '$4,500/yr', includes: 'Campbell + Alberts depth, Open + Semifinal prep, monthly mocks, bi-weekly 1:1' },
  pursuit:  { price: 2500, currency: 'USD', label: '$2,500/yr', includes: 'Campbell core, Open Exam prep, weekend group sessions, recorded content, monthly 1:1' },
}

export const bboTiers = {
  pinnacle: { price: 4500, currency: 'GBP', label: '£4,500/yr', includes: 'Weekly 1:1, Gold targeting, IBO UK team pathway, cross-national paper practice' },
  ascent:   { price: 3500, currency: 'GBP', label: '£3,500/yr', includes: 'Bi-weekly 1:1, Silver/Gold targeting, monthly mock BBO papers' },
  pursuit:  { price: 2000, currency: 'GBP', label: '£2,000/yr', includes: 'Group batch, Bronze+ targeting, weekend sessions, recorded content' },
}

export const aboTiers = {
  pinnacle: { price: 6000, currency: 'AUD', label: 'A$6,000/yr', includes: 'Weekly 1:1, IBO Australia team pathway, ASI Summer School targeting' },
  ascent:   { price: 4500, currency: 'AUD', label: 'A$4,500/yr', includes: 'Bi-weekly 1:1, Summer School targeting, monthly mocks' },
  pursuit:  { price: 2500, currency: 'AUD', label: 'A$2,500/yr', includes: 'Group batch, qualifying exam targeting, weekend sessions' },
}

export const neetNriTiers = {
  usa:  { pinnacle: { price: 7000, label: '$7,000/yr' }, ascent: { price: 4500, label: '$4,500/yr' }, pursuit: { price: 2500, label: '$2,500/yr' } },
  high: { pinnacle: { price: 6000, label: '$6,000/yr' }, ascent: { price: 4000, label: '$4,000/yr' }, pursuit: { price: 2500, label: '$2,500/yr' } },
  floor: { pinnacle: { price: 5000, label: '$5,000/yr' }, ascent: { price: 3500, label: '$3,500/yr' }, pursuit: { price: 2000, label: '$2,000/yr' } },
}

// ─── PROGRAMME-BASED VERTICALS (4–6 month duration) ─────────────────────────

export const mcatTiers = {
  pinnacle: { price: 1349, currency: 'USD', label: '$1,349', duration: '4–6 months', includes: 'Campbell + Lehninger, weekly 90-min 1:1, personalised plan, unlimited WhatsApp' },
  ascent:   { price: 899,  currency: 'USD', label: '$899',  duration: '4–6 months', includes: 'Weekly 2hr live, monthly mocks, Slack channel, bi-weekly office hours' },
  pursuit:  { price: 449,  currency: 'USD', label: '$449',  duration: '4–6 months', includes: 'Async content, 300+ passages, recorded library, WhatsApp doubt, monthly check-in' },
}

export const datTiers = {
  pinnacle: { price: 1249, currency: 'USD', label: '$1,249', duration: '3–5 months', includes: 'Weekly 60-min 1:1, personalised plan, Campbell + ADA outline, unlimited WhatsApp' },
  ascent:   { price: 799,  currency: 'USD', label: '$799',  duration: '3–5 months', includes: 'Weekly 90-min live, monthly section mocks, Slack, office hours' },
  pursuit:  { price: 399,  currency: 'USD', label: '$399',  duration: '3–5 months', includes: 'Async content, 200+ questions, recorded library, WhatsApp doubt' },
}

export const gamsatTiers = {
  gbp: { pinnacle: { price: 1099, label: '£1,099' }, ascent: { price: 799, label: '£799' }, pursuit: { price: 349, label: '£349' } },
  eur: { pinnacle: { price: 1249, label: '€1,249' }, ascent: { price: 899, label: '€899' }, pursuit: { price: 399, label: '€399' } },
  aud: { pinnacle: { price: 1599, label: 'A$1,599' }, ascent: { price: 1149, label: 'A$1,149' }, pursuit: { price: 539, label: 'A$539' } },
}

export const usmleTiers = {
  usd: { pinnacle: { price: 2249, label: '$2,249' }, ascent: { price: 1449, label: '$1,449' }, pursuit: { price: 699, label: '$699' } },
  inr: { pinnacle: { price: 109999, label: '₹1,09,999' }, ascent: { price: 69999, label: '₹69,999' }, pursuit: { price: 34999, label: '₹34,999' } },
}

// ─── CONTEXTUAL WHATSAPP MESSAGES ───────────────────────────────────────────

export function buildTierWhatsAppMessage(
  tier: TierName,
  vertical: string,
  price: string,
  city?: string,
  school?: string,
): string {
  const tierName = tierDefinitions[tier].displayName
  const locationContext = school
    ? `My child is at ${school}${city ? ` in ${city}` : ''}.`
    : city
      ? `I'm based in ${city}.`
      : ''

  switch (tier) {
    case 'pinnacle':
      return `Hi — I'm interested in the *Pinnacle* ${vertical} programme (${price}). ${locationContext} Please share batch schedule, 1:1 faculty details, and next intake date.`
    case 'ascent':
      return `Hi — I'm interested in the *Ascent* ${vertical} programme (${price}). ${locationContext} Please share batch timings and how the bi-weekly 1:1 works.`
    case 'pursuit':
      return `Hi — I'm interested in the *Pursuit* ${vertical} programme (${price}). ${locationContext} Please share group batch schedule and demo class timings.`
  }
}
