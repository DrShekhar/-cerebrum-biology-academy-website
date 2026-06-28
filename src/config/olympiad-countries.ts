/**
 * Biology Olympiad — Country Configuration
 *
 * Single source of truth for /programs/biology-olympiad and its 27 country pages.
 * Pricing is the small-group tier (4–6 students, 6 hrs/week + weekly mentor call),
 * premium-positioned in each market. 1-on-1 elite tier exists but is offered on
 * inquiry only — not displayed publicly.
 *
 * Audience positioning: international-school students who are NOT eligible for
 * their host-country National Biology Olympiad (USABO requires US-school
 * enrolment, BBO requires UK sixth-form enrolment, etc.). For native-eligible
 * students we banner-link to the dedicated hubs (/usabo-coaching,
 * /bbo-preparation, /cbo-coaching, /sbo-coaching, /asob-coaching).
 */

export interface OlympiadTestimonial {
  /** Student first name + last initial (privacy). */
  name: string
  /** "Grade 11 — Dubai International Academy" etc. */
  context: string
  /** Verbatim quote. */
  quote: string
  /** Outcome line — "USABO Semifinalist 2024" / "Pre-Med entry to McGill" / etc. */
  outcome?: string
}

export interface OlympiadFAQ {
  question: string
  answer: string
}

export interface OlympiadCountry {
  /** URL slug — lowercase, hyphenated. */
  slug: string
  /** Display name — "United States", "United Arab Emirates" etc. */
  name: string
  /** Country flag emoji. */
  flag: string
  /** ISO-3166-1 alpha-2 — used for hreflang + Vercel geo header check. */
  iso2: string
  /** Local national olympiad name — informational only. */
  nationalOlympiad: string
  /** Time-zone label shown on the page. */
  timezone: string
  /** ISO-4217 currency code. */
  currency: string
  /** Monthly price in local currency, integer. */
  priceMonthlyLocal: number
  /** Monthly price equivalent in INR, integer. */
  priceMonthlyINR: number
  /** Display string — "$599", "AED 2,190" etc. */
  priceDisplay: string
  /** One-paragraph hero-pitch tailored to international-school families in this country. */
  heroAngle: string
  /** If set, the country has a canonical Cerebrum hub for native-eligible students.
   * The new page banners this URL prominently for visitors who attend a host-country
   * school. Avoids cannibalisation with /usabo-coaching, /bbo-preparation etc. */
  canonicalHubUrl?: string
  /** If set, the canonical hub's display label for the banner. */
  canonicalHubLabel?: string
  /** 4–6 country-specific FAQs. */
  faqs: OlympiadFAQ[]
  /** 2–3 testimonial placeholders. Real ones supplied later by the founder. */
  testimonials: OlympiadTestimonial[]
}

// No placeholder testimonials are shipped. Rendering stub/fabricated quotes
// (even visually de-weighted) publishes fake social proof to users and Google —
// the same policy class as the self-serving review schema stripped sitewide on
// Jun 11. Until the founder supplies REAL, opt-in country testimonials, this
// returns [] so CountryTestimonials renders nothing (it returns null on empty).
// To go live for a country, replace this with verified quotes for that market.
function placeholderTestimonials(_country: string): OlympiadTestimonial[] {
  return []
}

// Common FAQs shared across markets — country-specific FAQs override below.
function commonFaqs(country: OlympiadCountry): OlympiadFAQ[] {
  return [
    {
      question: `Who is this programme for in ${country.name}?`,
      answer: `This programme is built for international-school students in ${country.name} — typically IB, IGCSE / A-Level, AP, or American-curriculum students whose schools do not enrol them in ${country.nationalOlympiad}. We deliver an Olympiad-grade biology curriculum (NBO-tier depth + IBO syllabus mapping) plus a Pre-Med foundation that supports later UCAT / MCAT / NEET-equivalent applications.`,
    },
    {
      question: `What is the schedule like for ${country.name} students?`,
      answer: `Live online classes scheduled in ${country.timezone}. Typical batch is 6 hours per week — two weekday evenings + one Sunday slot — calibrated to fit alongside a normal IB / AP / A-Level academic load. Recordings are available if a student misses a session.`,
    },
    {
      question: `How much does it cost?`,
      answer: `${country.priceDisplay} per month for the small-batch tier (4–6 students, 6 hrs/week, weekly 1-on-1 mentor call, full study material). 1-on-1 Elite coaching with Dr. Shekhar is available on enquiry only. EMI / quarterly billing supported.`,
    },
    {
      question: `Are the faculty actually AIIMS-trained?`,
      answer: `Yes. Cerebrum is "An AIIMSonian's Initiative" — taught personally by Dr. Shekhar (AIIMS) alongside biology specialists trained in the same institutional tradition. We teach biology only, to olympiad depth, in the small-batch faculty-led model that has produced Indian top-rankers for over 15 years.`,
    },
    {
      question: `My child is at a ${country.name} host-country school (not international curriculum). Should I still consider this?`,
      answer: country.canonicalHubUrl
        ? `If your child is enrolled in a ${country.name} host-country school, our dedicated ${country.canonicalHubLabel} programme at ${country.canonicalHubUrl} is the better fit — it specifically targets ${country.nationalOlympiad} eligibility and pathway. This page is for international-school students who don't have access to ${country.nationalOlympiad}.`
        : `Yes — the curriculum is designed to be useful both for international-curriculum students and for host-country-school students who want olympiad-grade biology depth alongside their school programme. ${country.nationalOlympiad} eligibility specifics are best discussed in your free counselling call.`,
    },
  ]
}

const COUNTRIES_BASE: Omit<OlympiadCountry, 'faqs'>[] = [
  // ===== Tier 1: countries with existing canonical Cerebrum hubs =====
  {
    slug: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    iso2: 'US',
    nationalOlympiad: 'USABO',
    timezone: 'ET / CT / PT (Eastern / Central / Pacific)',
    currency: 'USD',
    priceMonthlyLocal: 599,
    priceMonthlyINR: 52000,
    priceDisplay: '$599',
    heroAngle:
      'For international-school students in the United States — ASA / IB / British / French curriculum families whose schools do not enrol students for USABO. We deliver Olympiad-grade biology + Pre-Med foundation, taught by AIIMS-trained faculty in your local US time zone.',
    canonicalHubUrl: '/usabo-coaching',
    canonicalHubLabel: 'USABO',
    testimonials: placeholderTestimonials('USA'),
  },
  {
    slug: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    iso2: 'GB',
    nationalOlympiad: 'BBO',
    timezone: 'GMT / BST',
    currency: 'GBP',
    priceMonthlyLocal: 479,
    priceMonthlyINR: 53000,
    priceDisplay: '£479',
    heroAngle:
      'For international-curriculum sixth-formers in the UK — IB Diploma, French-system, American-school families whose schools do not enter students for BBO. Olympiad-grade biology + Pre-Med foundation supporting UCAT / BMAT preparation, taught by AIIMS-trained faculty in GMT / BST.',
    canonicalHubUrl: '/bbo-preparation',
    canonicalHubLabel: 'BBO',
    testimonials: placeholderTestimonials('UK'),
  },
  {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    iso2: 'CA',
    nationalOlympiad: 'CBO',
    timezone: 'ET / CT / MT / PT',
    currency: 'CAD',
    priceMonthlyLocal: 749,
    priceMonthlyINR: 48000,
    priceDisplay: 'C$749',
    heroAngle:
      'For international-school students in Canada — IB, French-immersion, British-curriculum, American-school families whose schools do not enrol for CBO. Olympiad-grade biology + Pre-Med foundation supporting UofT / McGill / UBC Life-Sciences applications. Live classes in Canadian time zones.',
    canonicalHubUrl: '/cbo-coaching',
    canonicalHubLabel: 'CBO',
    testimonials: placeholderTestimonials('Canada'),
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    iso2: 'SG',
    nationalOlympiad: 'SBO',
    timezone: 'SGT (UTC+8)',
    currency: 'SGD',
    priceMonthlyLocal: 749,
    priceMonthlyINR: 49000,
    priceDisplay: 'S$749',
    heroAngle:
      "For international-school students in Singapore — IB, IGCSE, French-system, German-school families whose schools don't enter students for SBO. Olympiad-grade biology + Pre-Med foundation, calibrated to NUS / NTU / Imperial / Oxbridge science applications.",
    canonicalHubUrl: '/sbo-coaching',
    canonicalHubLabel: 'SBO',
    testimonials: placeholderTestimonials('Singapore'),
  },
  {
    slug: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    iso2: 'AU',
    nationalOlympiad: 'ASOB',
    timezone: 'AEST / AEDT (UTC+10/+11)',
    currency: 'AUD',
    priceMonthlyLocal: 819,
    priceMonthlyINR: 46000,
    priceDisplay: 'A$819',
    heroAngle:
      "For international-school students in Australia — IB, IGCSE, French-system, American-school families whose schools don't enter students for ASOB. Olympiad-grade biology + Pre-Med foundation, supporting University of Melbourne / Monash / UNSW Medicine applications.",
    canonicalHubUrl: '/asob-coaching',
    canonicalHubLabel: 'ASOB',
    testimonials: placeholderTestimonials('Australia'),
  },

  // ===== Tier 1: GCC + Gulf =====
  {
    slug: 'uae',
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    iso2: 'AE',
    nationalOlympiad: 'IBO selection (no host-country NBO)',
    timezone: 'GST (UTC+4)',
    currency: 'AED',
    priceMonthlyLocal: 2190,
    priceMonthlyINR: 53000,
    priceDisplay: 'AED 2,190',
    heroAngle:
      'For international-school families in Dubai, Abu Dhabi, Sharjah, and across the UAE — Indian, British, American, IB, French curriculum students. UAE has no native national biology olympiad, so most olympiad-aspirant students need an external programme. Olympiad-grade biology + Pre-Med foundation supporting UCAT / MCAT / NEET-equivalent applications.',
    testimonials: placeholderTestimonials('UAE'),
  },
  {
    slug: 'saudi-arabia',
    name: 'Saudi Arabia',
    flag: '🇸🇦',
    iso2: 'SA',
    nationalOlympiad: 'IBO selection (Mawhiba pathway available)',
    timezone: 'AST (UTC+3)',
    currency: 'SAR',
    priceMonthlyLocal: 2199,
    priceMonthlyINR: 51000,
    priceDisplay: 'SAR 2,199',
    heroAngle:
      'For international-school families in Riyadh, Jeddah, Dhahran, and across Saudi Arabia. Olympiad-grade biology + Pre-Med foundation, taught by AIIMS-trained faculty in GMT+3. Strong fit for KSA Mawhiba pathway candidates and for IB / American-curriculum students aiming at US / UK medical-track applications.',
    testimonials: placeholderTestimonials('Saudi Arabia'),
  },
  {
    slug: 'qatar',
    name: 'Qatar',
    flag: '🇶🇦',
    iso2: 'QA',
    nationalOlympiad: 'IBO selection (no host-country NBO)',
    timezone: 'AST (UTC+3)',
    currency: 'QAR',
    priceMonthlyLocal: 2199,
    priceMonthlyINR: 53000,
    priceDisplay: 'QAR 2,199',
    heroAngle:
      'For international-school students in Doha. IB, British, American, Indian, French-curriculum families. Olympiad-grade biology + Pre-Med foundation supporting Weill Cornell-Qatar, Imperial, Oxbridge, and US medical-track applications.',
    testimonials: placeholderTestimonials('Qatar'),
  },
  {
    slug: 'oman',
    name: 'Oman',
    flag: '🇴🇲',
    iso2: 'OM',
    nationalOlympiad: 'IBO selection (no host-country NBO)',
    timezone: 'GST (UTC+4)',
    currency: 'OMR',
    priceMonthlyLocal: 229,
    priceMonthlyINR: 52000,
    priceDisplay: 'OMR 229',
    heroAngle:
      'For international-school students in Muscat, Salalah, and across Oman. Olympiad-grade biology + Pre-Med foundation, in GMT+4 evening live classes. Indian, IB, British-curriculum families served.',
    testimonials: placeholderTestimonials('Oman'),
  },
  {
    slug: 'bahrain',
    name: 'Bahrain',
    flag: '🇧🇭',
    iso2: 'BH',
    nationalOlympiad: 'IBO selection (no host-country NBO)',
    timezone: 'AST (UTC+3)',
    currency: 'BHD',
    priceMonthlyLocal: 219,
    priceMonthlyINR: 50000,
    priceDisplay: 'BHD 219',
    heroAngle:
      'For international-school families in Manama and across Bahrain. Olympiad-grade biology + Pre-Med foundation, AIIMS-trained faculty, GMT+3 live classes.',
    testimonials: placeholderTestimonials('Bahrain'),
  },
  {
    slug: 'kuwait',
    name: 'Kuwait',
    flag: '🇰🇼',
    iso2: 'KW',
    nationalOlympiad: 'IBO selection (no host-country NBO)',
    timezone: 'AST (UTC+3)',
    currency: 'KWD',
    priceMonthlyLocal: 179,
    priceMonthlyINR: 51000,
    priceDisplay: 'KWD 179',
    heroAngle:
      'For international-school families in Kuwait City and across Kuwait — IB, British, American, Indian-curriculum students. Olympiad-grade biology + Pre-Med foundation, taught in GMT+3.',
    testimonials: placeholderTestimonials('Kuwait'),
  },

  // ===== Tier 1: APAC =====
  {
    slug: 'malaysia',
    name: 'Malaysia',
    flag: '🇲🇾',
    iso2: 'MY',
    nationalOlympiad: 'IBO selection (national process)',
    timezone: 'MYT (UTC+8)',
    currency: 'MYR',
    priceMonthlyLocal: 2699,
    priceMonthlyINR: 51000,
    priceDisplay: 'RM 2,699',
    heroAngle:
      'For international-school students in Kuala Lumpur, Penang, Johor, and across Malaysia — IB, IGCSE, Australian, American, Chinese-curriculum families. Olympiad-grade biology + Pre-Med foundation supporting UM / Monash Malaysia / IMU applications.',
    testimonials: placeholderTestimonials('Malaysia'),
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    iso2: 'TH',
    nationalOlympiad: 'IBO selection (POSN olympiad pathway)',
    timezone: 'ICT (UTC+7)',
    currency: 'THB',
    priceMonthlyLocal: 19900,
    priceMonthlyINR: 50000,
    priceDisplay: '฿19,900',
    heroAngle:
      'For international-school students in Bangkok, Chiang Mai, and across Thailand. IB, IGCSE, French, American, German-curriculum families. Olympiad-grade biology + Pre-Med foundation, AIIMS-trained faculty, GMT+7 live classes.',
    testimonials: placeholderTestimonials('Thailand'),
  },
  {
    slug: 'philippines',
    name: 'Philippines',
    flag: '🇵🇭',
    iso2: 'PH',
    nationalOlympiad: 'IBO selection (PBO national pathway)',
    timezone: 'PHT (UTC+8)',
    currency: 'PHP',
    priceMonthlyLocal: 31900,
    priceMonthlyINR: 48000,
    priceDisplay: '₱31,900',
    heroAngle:
      'For international-school students in Manila, Cebu, and across the Philippines. IB, American, Chinese-curriculum families. Olympiad-grade biology + Pre-Med foundation supporting UP / Ateneo / international medical-track applications.',
    testimonials: placeholderTestimonials('Philippines'),
  },
  {
    slug: 'indonesia',
    name: 'Indonesia',
    flag: '🇮🇩',
    iso2: 'ID',
    nationalOlympiad: 'IBO selection (national OSN olympiad)',
    timezone: 'WIB (UTC+7)',
    currency: 'IDR',
    priceMonthlyLocal: 8800000,
    priceMonthlyINR: 31000,
    priceDisplay: 'IDR 8,800,000',
    heroAngle:
      'For international-school students in Jakarta, Bali, Surabaya, and across Indonesia — IB, IGCSE, American, Australian-curriculum families. Olympiad-grade biology + Pre-Med foundation, AIIMS-trained faculty, GMT+7 live classes.',
    testimonials: placeholderTestimonials('Indonesia'),
  },
  {
    slug: 'vietnam',
    name: 'Vietnam',
    flag: '🇻🇳',
    iso2: 'VN',
    nationalOlympiad: 'IBO selection (national process)',
    timezone: 'ICT (UTC+7)',
    currency: 'VND',
    priceMonthlyLocal: 14200000,
    priceMonthlyINR: 31000,
    priceDisplay: 'VND 14,200,000',
    heroAngle:
      'For international-school students in Ho Chi Minh City, Hanoi, and across Vietnam. IB, American, French-curriculum families. Olympiad-grade biology + Pre-Med foundation, GMT+7 live classes.',
    testimonials: placeholderTestimonials('Vietnam'),
  },
  {
    slug: 'hong-kong',
    name: 'Hong Kong',
    flag: '🇭🇰',
    iso2: 'HK',
    nationalOlympiad: 'IBO selection (HK olympiad selection)',
    timezone: 'HKT (UTC+8)',
    currency: 'HKD',
    priceMonthlyLocal: 4590,
    priceMonthlyINR: 50000,
    priceDisplay: 'HK$4,590',
    heroAngle:
      'For international-school students in Hong Kong — ESF, English Schools Foundation, German Swiss, French, American-curriculum families. Olympiad-grade biology + Pre-Med foundation, supporting HKU / CUHK / Imperial / Oxbridge applications.',
    testimonials: placeholderTestimonials('Hong Kong'),
  },

  // ===== Tier 2: NZ + Europe =====
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    iso2: 'NZ',
    nationalOlympiad: 'NZIBO',
    timezone: 'NZST / NZDT (UTC+12/+13)',
    currency: 'NZD',
    priceMonthlyLocal: 919,
    priceMonthlyINR: 48000,
    priceDisplay: 'NZ$919',
    heroAngle:
      'For international-school students in Auckland, Wellington, Christchurch, and across New Zealand. IB, Cambridge / IGCSE, American-curriculum families. Olympiad-grade biology + Pre-Med foundation, AIIMS-trained faculty.',
    testimonials: placeholderTestimonials('New Zealand'),
  },
  {
    slug: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    iso2: 'DE',
    nationalOlympiad: 'IBO selection (BiologieOlympiade)',
    timezone: 'CET / CEST (UTC+1/+2)',
    currency: 'EUR',
    priceMonthlyLocal: 549,
    priceMonthlyINR: 52000,
    priceDisplay: '€549',
    heroAngle:
      'For international-school students in Berlin, Munich, Frankfurt, and across Germany — IB, British, American, French international-curriculum families. Olympiad-grade biology + Pre-Med foundation, supporting NC-Medizin / TestAS / international medical-track applications.',
    testimonials: placeholderTestimonials('Germany'),
  },
  {
    slug: 'netherlands',
    name: 'Netherlands',
    flag: '🇳🇱',
    iso2: 'NL',
    nationalOlympiad: 'IBO selection (Dutch national process)',
    timezone: 'CET / CEST (UTC+1/+2)',
    currency: 'EUR',
    priceMonthlyLocal: 549,
    priceMonthlyINR: 52000,
    priceDisplay: '€549',
    heroAngle:
      'For international-school students in Amsterdam, The Hague, Rotterdam, and across the Netherlands. IB, British, American, German international-curriculum families. Olympiad-grade biology + Pre-Med foundation, AIIMS-trained faculty, CET live classes.',
    testimonials: placeholderTestimonials('Netherlands'),
  },

  // ===== Tier 2: Africa =====
  {
    slug: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    iso2: 'ZA',
    nationalOlympiad: 'IBO selection (national process)',
    timezone: 'SAST (UTC+2)',
    currency: 'ZAR',
    priceMonthlyLocal: 10900,
    priceMonthlyINR: 51000,
    priceDisplay: 'R 10,900',
    heroAngle:
      'For international-school students in Johannesburg, Cape Town, Durban, and across South Africa — IB, IEB, British / Cambridge, American-curriculum families. Olympiad-grade biology + Pre-Med foundation, GMT+2 live classes.',
    testimonials: placeholderTestimonials('South Africa'),
  },
  {
    slug: 'nigeria',
    name: 'Nigeria',
    flag: '🇳🇬',
    iso2: 'NG',
    nationalOlympiad: 'IBO selection (national process)',
    timezone: 'WAT (UTC+1)',
    currency: 'NGN',
    priceMonthlyLocal: 920000,
    priceMonthlyINR: 34000,
    priceDisplay: 'NGN 920,000',
    heroAngle:
      'For international-school students in Lagos, Abuja, Port Harcourt, and across Nigeria. British, American, IB-curriculum families. Olympiad-grade biology + Pre-Med foundation, supporting UCL / Imperial / Howard / international medical-track applications.',
    testimonials: placeholderTestimonials('Nigeria'),
  },
  {
    slug: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    iso2: 'KE',
    nationalOlympiad: 'IBO selection (national process)',
    timezone: 'EAT (UTC+3)',
    currency: 'KES',
    priceMonthlyLocal: 75000,
    priceMonthlyINR: 34000,
    priceDisplay: 'KES 75,000',
    heroAngle:
      'For international-school students in Nairobi and across Kenya — British / Cambridge, IB, American-curriculum families. Olympiad-grade biology + Pre-Med foundation, supporting University of Nairobi / international medical-track applications. GMT+3 live classes.',
    testimonials: placeholderTestimonials('Kenya'),
  },
  {
    slug: 'mauritius',
    name: 'Mauritius',
    flag: '🇲🇺',
    iso2: 'MU',
    nationalOlympiad: 'IBO selection (national process)',
    timezone: 'MUT (UTC+4)',
    currency: 'MUR',
    priceMonthlyLocal: 26900,
    priceMonthlyINR: 52000,
    priceDisplay: 'MUR 26,900',
    heroAngle:
      'For international-school students in Mauritius — French-system, British / Cambridge, IB-curriculum families. Olympiad-grade biology + Pre-Med foundation, AIIMS-trained faculty, GMT+4 live classes.',
    testimonials: placeholderTestimonials('Mauritius'),
  },

  // ===== Tier 2: South Asia (non-India) =====
  {
    slug: 'nepal',
    name: 'Nepal',
    flag: '🇳🇵',
    iso2: 'NP',
    nationalOlympiad: 'IBO selection (national process)',
    timezone: 'NPT (UTC+5:45)',
    currency: 'NPR',
    priceMonthlyLocal: 33500,
    priceMonthlyINR: 21000,
    priceDisplay: 'NPR 33,500',
    heroAngle:
      'For international-school and high-aspiration students in Kathmandu, Pokhara, and across Nepal. Olympiad-grade biology + Pre-Med foundation supporting MBBS-Nepal entrance / international medical-track applications. AIIMS-trained faculty.',
    testimonials: placeholderTestimonials('Nepal'),
  },
  {
    slug: 'bangladesh',
    name: 'Bangladesh',
    flag: '🇧🇩',
    iso2: 'BD',
    nationalOlympiad: 'BdBO',
    timezone: 'BST (UTC+6)',
    currency: 'BDT',
    priceMonthlyLocal: 28500,
    priceMonthlyINR: 21000,
    priceDisplay: 'BDT 28,500',
    heroAngle:
      'For international-school and high-aspiration students in Dhaka, Chittagong, and across Bangladesh. Olympiad-grade biology + Pre-Med foundation, supporting Bangladesh medical-college entrance + international medical-track applications.',
    testimonials: placeholderTestimonials('Bangladesh'),
  },
  {
    slug: 'sri-lanka',
    name: 'Sri Lanka',
    flag: '🇱🇰',
    iso2: 'LK',
    nationalOlympiad: 'IBO selection (national process)',
    timezone: 'IST (UTC+5:30)',
    currency: 'LKR',
    priceMonthlyLocal: 70000,
    priceMonthlyINR: 21000,
    priceDisplay: 'LKR 70,000',
    heroAngle:
      'For international-school and high-aspiration students in Colombo, Kandy, and across Sri Lanka. Olympiad-grade biology + Pre-Med foundation, supporting University of Colombo / international medical-track applications.',
    testimonials: placeholderTestimonials('Sri Lanka'),
  },
]

// Inject FAQs (computed from country data) once.
export const olympiadCountries: OlympiadCountry[] = COUNTRIES_BASE.map((c) => {
  const full = { ...c, faqs: [] } as OlympiadCountry
  full.faqs = commonFaqs(full)
  return full
})

export function getOlympiadCountry(slug: string): OlympiadCountry | undefined {
  return olympiadCountries.find((c) => c.slug === slug)
}

export const olympiadCountrySlugs = olympiadCountries.map((c) => c.slug)
