/**
 * AP Biology US metro configurations.
 *
 * Powers the 10 city-level landing pages at /ap-biology-tutor-{slug}.
 * Each metro has a unique heroBlurb (USABO finalist record, AP-5 culture,
 * local tutor reputation), school list (drives keyword coverage + trust),
 * timezone (for live-class scheduling FAQ), and a city-tailored FAQ set
 * (5–7 questions phrased for voice-search / AEO).
 *
 * Keep school lists between 8–20 names. Mix top public magnet, top
 * private/independent, and high-USABO-density schools for the metro.
 * Verify school names against US News / Niche before publishing.
 */

export interface APBiologyMetroFaq {
  question: string
  answer: string
}

export interface APBiologyMetro {
  /** URL slug suffix — full route is /ap-biology-tutor-{slug} */
  slug: string
  /** Display name for hero / breadcrumb */
  cityName: string
  /** Region descriptor for sub-hero ("New York City + Long Island") */
  region: string
  /** Display time zone label for scheduling messaging. US zones use
   *  the historical short labels (e.g. 'ET (Eastern)'); international
   *  metros use their local equivalent ('GST (Gulf)', 'IST (India)', etc.). */
  timezone: string
  /** ISO timezone string for schema.org CourseInstance */
  timezoneIana: string
  /** ISO-2 sub-region code for schema.org addressRegion (US state code
   *  for US metros; emirate / state name for international ones). */
  addressRegion: string
  /** Short hero paragraph — local culture + USABO/AP-5 record */
  heroBlurb: string
  /** Why this metro picks Cerebrum (positioning paragraph) */
  positioningBlurb: string
  /** USABO city-page slug for cross-cluster bridge link (if exists) */
  usaboCitySlug?: string
  /** 8–20 school names */
  schools: string[]
  /** 5–7 city-tailored FAQs */
  faqs: APBiologyMetroFaq[]
  /** Pricing tier — 'premium' = $120-$150/hr senior, 'standard' = $80-$100/hr senior.
   *  Premium: NYC, Bay Area, Boston, Northern Virginia-DC, Chicago, LA.
   *  Standard: Miami, Phoenix, San Diego, Denver, Austin, Portland + most international. */
  pricingTier?: 'premium' | 'standard'
}

export const apBiologyMetros: APBiologyMetro[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. NEW YORK
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'new-york',
    cityName: 'New York',
    region: 'NYC + Long Island + Westchester',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    addressRegion: 'NY',
    usaboCitySlug: 'new-york',
    heroBlurb:
      'New York City is one of the densest AP Biology markets in the country. Stuyvesant, Bronx Science, and Hunter College High School together send dozens of students into the USABO Open every February, and the private cluster — Trinity, Horace Mann, Dalton, Spence, Brearley, Riverdale, Collegiate — runs equally rigorous AP Bio tracks. Our New York tutors keep your child on the AP-5 path while leaving runway for the USABO Semifinal and the BS/MD pipeline.',
    positioningBlurb:
      'New York students juggle a packed AP load (often 8+ APs in junior year), demanding humanities homework, and after-school commitments. Our 1:1 sessions are scheduled in ET evenings and weekends so they fit around school. We coach Campbell Biology end-to-end and overlay the FRQ rubric — the exact pattern that produces 5-scorers from this metro.',
    schools: [
      'Stuyvesant High School',
      'Bronx High School of Science',
      'Hunter College High School',
      'Brooklyn Technical High School',
      'Townsend Harris High School',
      'Trinity School',
      'Horace Mann School',
      'Dalton School',
      'Spence School',
      'Brearley School',
      'Riverdale Country School',
      'Collegiate School',
      'Ramaz School',
      'Scarsdale High School',
      'Roslyn High School',
      'Great Neck North / South',
      'Jericho High School',
      'Syosset High School',
      'Ward Melville High School',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor in New York City?',
        answer:
          'Cerebrum offers 1:1 AP Biology tutoring in Eastern Time evenings and weekends with AIIMS-trained biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Most NYC students who score 5 do so by drilling past FRQs against the rubric — that is the core of our method. Senior-faculty 1:1 starts at $1,800 for 12 hours.',
      },
      {
        question: 'How does AP Bio tutoring fit a Stuyvesant or Bronx Science schedule?',
        answer:
          'Specialized-school students typically already have advanced coursework and limited weekday capacity. We schedule 90-minute sessions twice a week in ET evenings (7–9 PM) or weekend mornings, and we calibrate pace to your school’s AP Bio teacher so we are reinforcing — not duplicating — what is taught in class.',
      },
      {
        question: 'Do you coach the USABO Open and Semifinal exams?',
        answer:
          'Yes. The USABO Open runs in early February and is school-administered. We have a dedicated USABO programme that runs in parallel with AP Biology coaching. Many of our New York students sit both — see our USABO + IBO Coaching for New York Students page for the olympiad track.',
      },
      {
        question: 'Is AP Biology required for BS/MD or pre-med admissions in NYC?',
        answer:
          'AP Biology is not formally required for BS/MD programmes (e.g., NYU Honors, Stony Brook’s scholars track) but a 5 score is a strong signal of biology readiness. Note that AP Bio credit is rarely accepted by medical schools as a prerequisite — students still take college biology. We frame AP-5 as the foundation, not the substitute, for the pre-med pipeline.',
      },
      {
        question: 'Do you offer in-person tutoring in Manhattan or Long Island?',
        answer:
          'We coach 100% online via live video. This lets us match the best biology specialist to each student regardless of borough. New York families consistently tell us video-1:1 with a senior specialist beats in-person with a generalist.',
      },
      {
        question: 'How early should a New York student start AP Bio tutoring?',
        answer:
          'For a May exam, ideal start is August or September of the academic year. If a student is also targeting USABO Semifinal (March), an October start gives enough runway. Crash plans (8–12 weeks pre-exam) are possible but limit FRQ depth.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. SAN FRANCISCO BAY AREA
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'bay-area',
    cityName: 'Bay Area',
    region: 'San Francisco + Silicon Valley + East Bay',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Los_Angeles',
    addressRegion: 'CA',
    usaboCitySlug: 'bay-area',
    heroBlurb:
      'The Bay Area produces more USABO Semifinalists per capita than any other US region. The Harker School, Mission San Jose, Lynbrook, Saratoga, Monta Vista, Henry M. Gunn, and Palo Alto High School together field deep AP Biology cohorts every year. Our Bay Area programme is built for that environment — fast pace, FRQ depth, and an early USABO ramp for students who want both.',
    positioningBlurb:
      'Bay Area parents tell us the same thing: the local AP Bio classroom is good but lacks individual FRQ feedback and rarely covers the Campbell-to-Alberts depth USABO Semifinalists need. We deliver both — College Board AP curriculum for the May exam plus optional Campbell + Alberts depth for olympiad students. Live in PT evenings and Saturdays.',
    schools: [
      'The Harker School',
      'Mission San Jose High School',
      'Lynbrook High School',
      'Saratoga High School',
      'Monta Vista High School',
      'Henry M. Gunn High School',
      'Palo Alto High School',
      'Cupertino High School',
      'Bellarmine College Preparatory',
      'Castilleja School',
      'Crystal Springs Uplands School',
      'Lowell High School',
      'Mira Loma High School',
    ],
    faqs: [
      {
        question: 'Which Bay Area schools have the strongest AP Biology track records?',
        answer:
          'The Harker School (San Jose), Mission San Jose, Lynbrook, Saratoga, Monta Vista, Henry M. Gunn, and Palo Alto High School all consistently produce 5-scorers and USABO Semifinalists. Our Bay Area roster includes students from each.',
      },
      {
        question: 'How do Pacific-time live classes work for Bay Area students?',
        answer:
          'Live 1:1 sessions run weekday evenings 7–9 PM PT and weekend mornings/afternoons. No 4 a.m. India-time wake-ups. All sessions are recorded for revision — you watch the playback in your browser any time.',
      },
      {
        question: 'Can a Mission San Jose or Harker student combine AP Biology + USABO prep?',
        answer:
          'Yes — that is the most common Bay Area pattern. We run an integrated track: Campbell Biology end-to-end (covers AP-5) plus Alberts and Lehninger overlays (USABO Semifinal depth). See our USABO Coaching for Bay Area Students page for the olympiad-specific track.',
      },
      {
        question: 'Is AP Bio tutoring worth it if my child already has an A in AP Bio?',
        answer:
          'An A in school grades does not guarantee a 5 on the AP exam — they test different skills. School A often correlates with strong concept memory; AP-5 demands FRQ rubric mastery, time-pressured MCQ, and integration across units. We see Bay Area students with school As score 3 or 4 because they did not drill FRQ. That is the gap we close.',
      },
      {
        question: 'What is the cost of AP Biology tutoring for a Palo Alto family?',
        answer:
          'Senior-faculty 1:1 starts at $1,800 for 12 hours and goes up to $5,760 for 48 hours (Elite). Junior-faculty 1:1 is $900 for 12 hours. Small-batch (4–6 students, group rate) is $40/hour. Pricing is the same nationwide — there is no Bay Area surcharge.',
      },
      {
        question: 'How early should a Harker or Gunn student start preparation?',
        answer:
          'Harker and Gunn AP Biology classes are accelerated. An August start of the academic year gives full runway for 5 + USABO Semifinal. A January start can still produce 5 but will limit USABO depth.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. BOSTON
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'boston',
    cityName: 'Boston',
    region: 'Greater Boston + Cambridge + Western Suburbs',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    addressRegion: 'MA',
    usaboCitySlug: 'boston',
    heroBlurb:
      "Boston families have unusually rich AP Biology infrastructure: Boston Latin (the nation's oldest public school), Lexington, Newton North/South, Brookline, plus the boarding cluster at Phillips Exeter Academy and Phillips Academy Andover within an hour. Our Boston programme aligns to those schools' AP calendars and to the New England BS/MD pipeline (Brown PLME, Boston University 7-Year Med, etc.).",
    positioningBlurb:
      'Boston AP Bio students often combine high school coursework with research at Harvard, MIT, Tufts, or BU labs. We schedule around lab hours, and our faculty are senior specialists so they can engage with technical research questions students bring back from the bench. Campbell + Lehninger emphasis for the strongest cohort.',
    schools: [
      'Boston Latin School',
      'Lexington High School',
      'Newton North High School',
      'Newton South High School',
      'Brookline High School',
      'Phillips Exeter Academy',
      'Phillips Academy Andover',
      'Roxbury Latin School',
      'Belmont High School',
      'Acton-Boxborough Regional High School',
      'Wellesley High School',
      'Concord-Carlisle Regional High School',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor in the Boston area?',
        answer:
          'Cerebrum runs 1:1 AP Biology tutoring with AIIMS-trained biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. We schedule live in Eastern Time evenings and weekends. Our roster includes students from Boston Latin, Lexington, Newton, Brookline, and the boarding cluster (Exeter, Andover).',
      },
      {
        question: 'Can boarding-school students at Exeter or Andover use online AP Bio tutoring?',
        answer:
          'Yes — boarding students often have stronger weekday discipline and use Sundays + weekday late evenings (after study hall) for 1:1 sessions. We schedule around dorm rules and proctored study time.',
      },
      {
        question: 'Is AP Biology useful for Brown PLME or BU 7-Year Med applications?',
        answer:
          'A 5 in AP Biology is a strong signal but not a substitute for the BS/MD interview, essays, and research portfolio. Brown PLME explicitly looks for sustained science depth — AP-5 plus a USABO Semifinal qualification is a far stronger combination than AP-5 alone. We coach both.',
      },
      {
        question: 'Do you support research-active high schoolers at Harvard or MIT labs?',
        answer:
          'Yes. Many of our Boston students are running research with PIs at Harvard, MIT, Tufts, BU, or Mass General. Our senior faculty engage with the technical content — gel-band reads, plasmid maps, qPCR results — and we adjust AP Bio session pacing around lab hours.',
      },
      {
        question: 'How does the AP Bio May exam align with the New England school calendar?',
        answer:
          'Most Boston-area schools end the academic year in mid-June. The AP Biology exam is typically in early-to-mid May — well before finals. We compress AP review into March-April and use the April vacation week for full-length practice exam day.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. NORTHERN VIRGINIA / DC
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'northern-virginia-dc',
    cityName: 'Northern Virginia / DC',
    region: 'Fairfax County + DC + Montgomery County',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    addressRegion: 'VA',
    usaboCitySlug: 'northern-virginia-dc',
    heroBlurb:
      "Thomas Jefferson High School for Science and Technology in Alexandria is the dominant USABO finalist factory in the United States. Around it sits a strong DC private cluster — Sidwell Friends, St. Albans, Holton-Arms — and Montgomery County's high-AP public schools (Walt Whitman, Bethesda-Chevy Chase, Wootton). Our NoVa / DC programme is designed for the TJ-style depth, with USABO and AP Biology run as a single integrated track for students aiming for both.",
    positioningBlurb:
      "TJ's AP Biology cohort moves at near-college pace and competes hard for USABO Semifinal slots. Our coaching mirrors that intensity: full Campbell coverage by January, FRQ rubric drilling daily, USABO Open mocks weekly. For students at Sidwell, St. Albans, or Walt Whitman the pacing is slower but the standard remains 5 / Semifinalist.",
    schools: [
      'Thomas Jefferson High School for Science and Technology (TJHSST)',
      'Sidwell Friends School',
      'St. Albans School',
      'Holton-Arms School',
      'Langley High School',
      'McLean High School',
      'Yorktown High School',
      'Walt Whitman High School',
      'Bethesda-Chevy Chase High School',
      'Thomas S. Wootton High School',
      'Winston Churchill High School',
      'National Cathedral School',
      'Georgetown Day School',
      'Maret School',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor for TJHSST students?',
        answer:
          "Cerebrum coaches several TJ students each year. TJ's pace is faster than most public schools, so our pace plan starts earlier (August) and emphasizes USABO Semifinal-level depth alongside the May AP exam. Senior-faculty 1:1 with AIIMS-trained biology specialists.",
      },
      {
        question: 'How does the USABO + AP Biology integrated track work for TJ?',
        answer:
          'TJ has the strongest USABO finalist track record in the US. We run an integrated track — Campbell + Alberts + Lehninger by February, USABO Open mocks weekly, then AP Biology FRQ rubric drilling for the May exam. One student, one curriculum, both targets.',
      },
      {
        question: 'Is AP Bio tutoring worth it for a Sidwell Friends or St. Albans student?',
        answer:
          'Private-school AP Bio classes at Sidwell, St. Albans, and similar institutions are excellent on concept depth but lighter on time-pressured FRQ practice. Our 1:1 sessions add the FRQ rubric layer and full-length timed mocks — the gap most private-school students have on the May exam.',
      },
      {
        question: 'What time zones do you offer for NoVa/DC live sessions?',
        answer:
          'All sessions run in Eastern Time. Weekday evenings 7–9 PM ET, weekend mornings/afternoons. Saturdays are most popular for TJ students because their weekday schedule is densest.',
      },
      {
        question: 'Can AP Bio + USABO help with a Georgetown or Johns Hopkins pre-med application?',
        answer:
          'A 5 in AP Biology plus USABO Semifinalist standing reads as serious biology depth — strong for Georgetown and Johns Hopkins admissions. AP Biology alone is not differentiating in this competitive applicant pool, but USABO Semifinalist is. We coach both as a single track.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. CHICAGO
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'chicago',
    cityName: 'Chicago',
    region: 'Chicago + North Shore + Western Suburbs',
    timezone: 'CT (Central)',
    timezoneIana: 'America/Chicago',
    addressRegion: 'IL',
    usaboCitySlug: 'chicago',
    heroBlurb:
      'Chicago has one of the deepest public-magnet AP Biology benches in the country: Whitney M. Young, Walter Payton College Prep, Northside College Prep, and Jones — plus Illinois Mathematics and Science Academy in Aurora and the high-performing North Shore (New Trier, Stevenson, Naperville Central/North). Our Chicago programme runs in Central Time and emphasises FRQ rubric mastery — the differentiator for selective-school applicants from the Midwest.',
    positioningBlurb:
      'Chicago selective-enrollment students sit AP Biology in junior or sophomore year. The pace is brisk and graders are tough — but the May AP exam is a national benchmark, not a local one. Our 1:1 tutoring closes the gap between school A and AP-5 by drilling FRQ rubric application and timed full-length practice exams.',
    schools: [
      'Whitney M. Young Magnet High School',
      'Walter Payton College Prep',
      'Northside College Prep',
      'Jones College Prep',
      'New Trier High School',
      'Adlai E. Stevenson High School',
      'Naperville Central High School',
      'Naperville North High School',
      'Lake Forest High School',
      'Hinsdale Central High School',
      'Illinois Mathematics and Science Academy (IMSA)',
      'Lyons Township High School',
      'Glenbrook North / South',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor in Chicago?',
        answer:
          'Cerebrum offers 1:1 AP Biology tutoring with AIIMS-trained biology faculty in Central Time, College Board–aligned curriculum, and FRQ rubric mastery. We coach students from Whitney Young, Walter Payton, Northside, IMSA, and the North Shore public schools.',
      },
      {
        question: 'How does the Chicago selective-enrollment AP Bio schedule work?',
        answer:
          'Most Chicago selective-enrollment schools cover AP Biology in junior year, often paired with AP Chem or AP Physics. We schedule around that load — typically two 90-minute sessions per week in CT evenings or weekend mornings. Weeknights 7–9 PM CT are most popular.',
      },
      {
        question: 'Is AP Bio tutoring needed for IMSA students?',
        answer:
          'IMSA students already work at college pace and have access to strong faculty. The gap, when it exists, is FRQ rubric application — turning concept knowledge into 4-point FRQ answers. That is precisely what our 1:1 sessions add. Some IMSA students also use us for USABO Semifinal-level depth.',
      },
      {
        question: 'Does AP Biology help with Northwestern HPME or U Chicago pre-med?',
        answer:
          'Northwestern HPME (BS/MD) is highly selective and looks for sustained science depth — AP-5 is a baseline, USABO Semifinalist standing is a differentiator. U Chicago pre-med is competitive at admission and again at college; a strong AP Bio foundation pays off in both gates. We coach both targets.',
      },
      {
        question: 'What does AP Biology tutoring cost for a Chicago family?',
        answer:
          'Senior-faculty 1:1: $1,800 (12 hr) to $5,760 (48 hr). Junior-faculty 1:1: $900 (12 hr) to $2,880 (48 hr). Small-batch (4–6 students): $40/hour flat. Same pricing nationwide.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. LOS ANGELES
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'los-angeles',
    cityName: 'Los Angeles',
    region: 'LA County + Orange County + Westside',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Los_Angeles',
    addressRegion: 'CA',
    usaboCitySlug: 'los-angeles',
    heroBlurb:
      'LA AP Biology demand spans Harvard-Westlake and the Westside private cluster, the science-focused North Hollywood STEM Magnet, and the strong San Diego–LA corridor with Canyon Crest Academy. Our Los Angeles programme runs in Pacific Time and is calibrated to the LA private-school AP load (often 6–8 APs concurrent in junior year).',
    positioningBlurb:
      'Harvard-Westlake, Marlborough, and the LA private cluster run college-pace AP Biology with strong faculty, but the May exam is a national benchmark and the FRQ rubric is unforgiving. Our 1:1 sessions add the time-pressured rubric layer — the difference between school A and AP-5.',
    schools: [
      'Harvard-Westlake School',
      'Marlborough School',
      'Buckley School',
      'Brentwood School',
      'Polytechnic School',
      'Crossroads School',
      'Loyola High School',
      'Campbell Hall School',
      'Science Academy STEM Magnet (North Hollywood)',
      'Canyon Crest Academy',
      'Beverly Hills High School',
      'Palos Verdes Peninsula High School',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor in Los Angeles?',
        answer:
          'Cerebrum offers 1:1 AP Biology tutoring with AIIMS-trained biology faculty in Pacific Time, College Board–aligned curriculum, and FRQ rubric mastery. Our LA roster includes students from Harvard-Westlake, Marlborough, Brentwood, and Canyon Crest Academy.',
      },
      {
        question: 'How does AP Bio tutoring fit a Harvard-Westlake schedule?',
        answer:
          "Harvard-Westlake students often carry 5–7 APs concurrently with athletics or arts. We schedule 90-minute 1:1 sessions twice a week in PT evenings or weekend mornings, calibrated to your school's quarter pace.",
      },
      {
        question: 'Is AP Biology useful for UC Berkeley or UCLA pre-med?',
        answer:
          'UC schools do accept AP Biology credit toward general biology requirements with a 4 or 5 score, but most pre-meds retake college biology anyway because medical schools rarely accept AP credit as a prerequisite. The value is foundational — strong AP Bio means stronger college biology grade.',
      },
      {
        question: 'Do you coach USABO for LA students?',
        answer:
          'Yes. The USABO Open is administered through your high school in early February. We have an integrated AP + USABO track for students who want both. See our USABO Coaching for Los Angeles Students page for the olympiad-specific track.',
      },
      {
        question: 'What time zones do you offer for LA live sessions?',
        answer:
          'All live sessions run in Pacific Time. Weekday evenings 7–9 PM PT and weekend mornings/afternoons. Recordings are available 24/7 for revision.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. HOUSTON / DALLAS
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'houston-dallas',
    cityName: 'Houston / Dallas',
    region: 'Houston + Dallas-Fort Worth + Austin',
    timezone: 'CT (Central)',
    timezoneIana: 'America/Chicago',
    addressRegion: 'TX',
    usaboCitySlug: 'dallas-austin',
    heroBlurb:
      "Texas has one of the strongest AP Biology + USABO benches in the country: William P. Clements (Sugar Land) and Seven Lakes (Katy) routinely produce USABO Semifinalists; the Texas Academy of Math & Science (TAMS, on the UNT campus) and Liberal Arts and Science Academy (Austin) are early-college science magnets; and the Dallas private cluster — Highland Park, St. Mark's, Episcopal — runs strong AP tracks. Our Houston/Dallas programme runs in Central Time.",
    positioningBlurb:
      'Houston and Dallas families often combine AP Biology with the Texas BS/MD pipeline (Baylor 8-Year, UT Southwestern). A strong AP-5 plus USABO Semifinal qualification reads as serious biology depth in those applicant pools. We run an integrated track.',
    schools: [
      'Bellaire High School (Houston)',
      'DeBakey High School for Health Professions',
      'Carnegie Vanguard High School',
      'Strake Jesuit College Preparatory',
      "St. John's School (Houston)",
      'William P. Clements High School (Sugar Land)',
      'Seven Lakes High School (Katy)',
      'Plano West Senior High School',
      'Plano East Senior High School',
      'Highland Park High School (Dallas)',
      "St. Mark's School of Texas",
      'Episcopal School of Dallas',
      'Texas Academy of Math & Science (TAMS)',
      'Liberal Arts and Science Academy (LASA, Austin)',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor in Houston?',
        answer:
          'Cerebrum offers 1:1 AP Biology tutoring with AIIMS-trained biology faculty in Central Time, College Board–aligned curriculum, and FRQ rubric mastery. Our Houston roster includes students from Bellaire, DeBakey, Carnegie Vanguard, and the Sugar Land / Katy cluster.',
      },
      {
        question: 'Does AP Biology help with Baylor 8-Year or UT Southwestern BS/MD admissions?',
        answer:
          'BS/MD admissions in Texas are highly competitive and look for sustained science depth — AP-5 is a baseline, USABO Semifinalist standing is a differentiator. We coach both as a single track for Texas students with that target.',
      },
      {
        question: 'How does AP Bio tutoring fit a Plano West or DeBakey schedule?',
        answer:
          "Plano West and DeBakey students typically carry heavy AP loads. We schedule 90-minute 1:1 sessions twice a week in CT evenings or weekend mornings, calibrated to your school's pace and your other AP/extracurricular commitments.",
      },
      {
        question: 'Do you coach USABO for Texas students?',
        answer:
          'Yes. Clements and Seven Lakes have strong USABO traditions and we coach the Open + Semifinal track in parallel with AP Biology. See our USABO Coaching for Dallas/Austin Students page for the olympiad-specific track.',
      },
      {
        question: 'What is the AP Biology cost for a Houston or Dallas family?',
        answer:
          'Senior-faculty 1:1: $1,800 (12 hr) to $5,760 (48 hr). Junior-faculty 1:1: $900 (12 hr) to $2,880 (48 hr). Small-batch (4–6 students): $40/hour flat. Pricing is national — no Texas surcharge.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. SEATTLE
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'seattle',
    cityName: 'Seattle',
    region: 'Seattle + Eastside + Mercer Island',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Los_Angeles',
    addressRegion: 'WA',
    usaboCitySlug: 'seattle',
    heroBlurb:
      "Lakeside School and Seattle's strong public AP cluster — Bellevue, International School, Mercer Island, Newport, Garfield — run rigorous AP Biology programmes. Many Seattle families also consider the BS/MD and biotech-research pipeline given the city\'s deep biotech industry (Fred Hutch, ISB, Aakash Institute). Our Seattle programme runs in Pacific Time.",
    positioningBlurb:
      "Seattle public-school AP Biology is strong on lab work but classroom-grading rubrics often differ from College Board's FRQ rubric. The May AP exam is a national benchmark — the gap we close is rubric application and timed full-length practice. PT evenings and weekends.",
    schools: [
      'Lakeside School',
      'Seattle Preparatory School',
      'International School (Bellevue)',
      'Bellevue High School',
      'Mercer Island High School',
      'Newport High School',
      'Garfield High School',
      'Issaquah High School',
      'Skyline High School',
      'Eastside Catholic School',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor in Seattle?',
        answer:
          'Cerebrum offers 1:1 AP Biology tutoring in Pacific Time with AIIMS-trained biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Our Seattle roster includes students from Lakeside, Seattle Prep, International School, and the Bellevue / Mercer Island public cluster.',
      },
      {
        question: 'Does AP Biology help with University of Washington biology admissions?',
        answer:
          'UW Biology is competitive at the college level — most Washington pre-meds and biotech students take college biology regardless of AP credit. AP-5 is foundational. The bigger value of strong AP Bio is research-readiness for Fred Hutch / ISB / Aakash Institute internships during high school and college.',
      },
      {
        question: 'Do you coach USABO for Seattle students?',
        answer:
          'Yes. The USABO Open is school-administered each February. We have an integrated AP + USABO track. See our USABO Coaching for Seattle Students page for the olympiad-specific track.',
      },
      {
        question: 'How does the AP Bio May exam align with the Seattle school calendar?',
        answer:
          'Most Seattle-area schools end in mid-to-late June, so the May AP exam falls before finals. We compress AP review into March-April, with full-length practice exams during spring break.',
      },
      {
        question: 'What is the cost of AP Biology tutoring for a Bellevue or Lakeside family?',
        answer:
          'Senior-faculty 1:1: $1,800 (12 hr) to $5,760 (48 hr). Junior-faculty 1:1: $900 (12 hr) to $2,880 (48 hr). Small-batch (4–6 students): $40/hour flat. National pricing — no Seattle surcharge.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. ATLANTA
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'atlanta',
    cityName: 'Atlanta',
    region: 'Atlanta Metro + North Suburbs',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    addressRegion: 'GA',
    usaboCitySlug: 'atlanta',
    heroBlurb:
      "Atlanta's North Fulton and Forsyth corridor — Walton, Lambert, Northview — runs some of Georgia\'s strongest AP Biology cohorts. The private cluster (Pace Academy, Westminster, Lovett, Whitefield) and the Gwinnett School of Mathematics, Science & Technology (Georgia\'s top STEM magnet) round out the metro. Our Atlanta programme runs in Eastern Time and emphasises FRQ mastery + USABO Open prep for serious-science students.",
    positioningBlurb:
      'Atlanta AP Biology classrooms are strong on content but the May AP exam tests skills schools sometimes underemphasize: time-pressured FRQ, rubric application, and integration across units. Our 1:1 sessions close that gap — and for the strongest students, we add USABO Semifinal-level depth.',
    schools: [
      'Walton High School',
      'Lambert High School',
      'Northview High School',
      'Pace Academy',
      'Westminster Schools',
      'Lovett School',
      'Whitefield Academy',
      'Gwinnett School of Mathematics, Science & Technology',
      'Roswell High School',
      'Milton High School',
      'Alpharetta High School',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor in Atlanta?',
        answer:
          'Cerebrum offers 1:1 AP Biology tutoring in Eastern Time with AIIMS-trained biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Our Atlanta roster includes students from Walton, Lambert, Northview, Pace Academy, and Westminster.',
      },
      {
        question: 'Does AP Biology help with Emory or Georgia Tech pre-med admissions?',
        answer:
          'Emory and Georgia Tech pre-med tracks are competitive — AP-5 is a baseline signal, not differentiating on its own. Sustained biology depth (AP-5 + USABO Semifinalist + research) is far stronger. We coach the AP + USABO integrated track.',
      },
      {
        question: 'How does AP Bio tutoring fit a Walton or Northview schedule?',
        answer:
          "North Fulton students often carry 5–8 APs in junior year. We schedule 90-minute 1:1 sessions twice a week in ET evenings or weekend mornings, calibrated to your school's quarter pace.",
      },
      {
        question: 'Do you coach USABO for Atlanta students?',
        answer:
          'Yes. The USABO Open is administered through your high school in early February. We run an integrated AP + USABO track. See our USABO Coaching for Atlanta Students page for the olympiad-specific track.',
      },
      {
        question: 'What is the AP Biology cost for an Atlanta family?',
        answer:
          'Senior-faculty 1:1: $1,800 (12 hr) to $5,760 (48 hr). Junior-faculty 1:1: $900 (12 hr) to $2,880 (48 hr). Small-batch (4–6 students): $40/hour flat. National pricing.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. NEW JERSEY
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'new-jersey',
    cityName: 'New Jersey',
    region: 'Bergen County + Princeton + Edison + Monmouth',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    addressRegion: 'NJ',
    usaboCitySlug: 'new-jersey',
    heroBlurb:
      "New Jersey's public-magnet bench is one of the deepest in the country: Bergen County Academies, High Technology High School (Lincroft), and Edison Academy Magnet are state-level science powerhouses. Princeton High School, the West Windsor-Plainsboro pair, Millburn, and Edgemont round out the strong public AP Bio cluster. Lawrenceville School is the boarding-school anchor. Our NJ programme runs in Eastern Time.",
    positioningBlurb:
      'Bergen County Academies and HTHS run college-pace AP Biology and rank among the top USABO Semifinalist producers in the country. The pace is fast and the FRQ rubric is the hardest skill — that is the gap our 1:1 sessions close. For Princeton-area and Lawrenceville students the pace is similar; the AP-5 + USABO Semifinal target is the same.',
    schools: [
      'Bergen County Academies',
      'High Technology High School (Lincroft)',
      'Edison Academy Magnet',
      'The Lawrenceville School',
      'Princeton High School',
      'West Windsor-Plainsboro High School North',
      'West Windsor-Plainsboro High School South',
      'Millburn High School',
      'Livingston High School',
      'Pingry School',
      'Newark Academy',
      'The Peddie School',
    ],
    faqs: [
      {
        question: 'What is the best AP Biology tutor in New Jersey?',
        answer:
          'Cerebrum offers 1:1 AP Biology tutoring in Eastern Time with AIIMS-trained biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Our New Jersey roster includes students from Bergen County Academies, High Tech HS, Edison Academy Magnet, Lawrenceville, and the Princeton-area public schools.',
      },
      {
        question: 'How do BCA and HTHS pace AP Biology?',
        answer:
          'Bergen County Academies and High Tech HS run AP Biology at near-college pace — Campbell coverage by January, lab work continuous, USABO-style depth normal. Our 1:1 sessions add the FRQ rubric application layer that converts depth into AP-5.',
      },
      {
        question: 'Does AP Bio help with Rutgers Pharmacy or NJMS BS/MD admissions?',
        answer:
          'Rutgers BS/MD (Robert Wood Johnson, NJMS) and pharmacy tracks are competitive — AP-5 is a baseline, USABO Semifinalist standing differentiates. Sustained biology depth + research is the strongest signal. We coach the integrated AP + USABO track.',
      },
      {
        question: 'How does AP Bio tutoring fit a Lawrenceville School schedule?',
        answer:
          'Lawrenceville is a boarding school with structured study hours. We schedule around dorm rules — typically Sundays + weekday late evenings (after dinner / before lights-out). All sessions are recorded.',
      },
      {
        question: 'Do you coach USABO for New Jersey students?',
        answer:
          'Yes. The USABO Open is administered through your high school in early February. We run an integrated AP + USABO track. See our USABO Coaching for New Jersey Students page for the olympiad-specific track.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 11. DUBAI
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'dubai',
    cityName: 'Dubai',
    region: 'Dubai + JLT + Dubai Hills + Downtown + Marina',
    timezone: 'GST (Gulf)',
    timezoneIana: 'Asia/Dubai',
    addressRegion: 'Dubai',
    heroBlurb:
      'Dubai has become one of the strongest AP Biology markets outside North America. GEMS Dubai American Academy, Universal American School, Dubai American Academy, and American School of Dubai run deep AP cohorts, and the British-curriculum cluster (Repton, Nord Anglia, JESS) increasingly offers AP Biology as a Year 12–13 elective for US-college applicants. The South Asian and East Asian expat academic communities here drive serious AP uptake — families expect Singapore-level rigour with US-curriculum fidelity. Our GST evening live classes (6–9 PM Dubai time) slot cleanly into the AP-heavy junior and senior schedules these schools run.',
    positioningBlurb:
      'Local Dubai tutoring agencies — TutorChase, ++tutors, GoStudent, MyTutor — typically charge AED 220–400 per hour ($60–$110/hr) and rely on a rotating freelance bench, often non-biology specialists working across multiple subjects. Cerebrum is set up differently: AIIMS-trained biology faculty as your dedicated tutor for the full year, weekly written feedback on every FRQ attempt against the College Board rubric, and the Indian small-batch coaching tradition (max 12 per batch) built around retrieval practice and timed mocks. Senior-faculty 1:1 starts at $1,800 for 12 hours — substantially below local hourly rates once you compare like for like.',
    schools: [
      'GEMS Dubai American Academy',
      'Universal American School',
      'GEMS Wellington International School',
      'GEMS Modern Academy',
      'Dubai American Academy',
      'American School of Dubai',
      'Repton School Dubai',
      'Nord Anglia International School Dubai',
      'JESS Dubai (Jumeirah English Speaking School)',
      'Dwight School Dubai',
      'Cranleigh Abu Dhabi',
      'GEMS Akin International School',
      'Dubai International Academy Emirates Hills',
      'Kings School Dubai',
    ],
    faqs: [
      {
        question:
          'Will GST evening live classes clash with our AP Bio teacher’s homework window at GEMS Dubai American Academy?',
        answer:
          'GEMS DAA typically sets AP Biology homework after the school day (around 3:30 PM Dubai time) with submission windows the following morning. Our 1:1 sessions run 6–9 PM GST, which sits cleanly between school dismissal and the late-evening homework block. Most DAA students do 90 minutes with us, then 30–45 minutes on their school assignment. We can also flex to weekend mornings if your child has AP Bio lab on Mondays or Wednesdays.',
      },
      {
        question:
          'Do you accept AED bank transfer or international cards? What about Tabby or Tamara EMI?',
        answer:
          'Yes. We accept AED via Emirates NBD / Mashreq bank transfer (no FX conversion needed), international Visa / Mastercard / Amex in USD, and Wise / Revolut transfers. We do not directly integrate Tabby or Tamara, but several Dubai families split the $1,800 senior-faculty package across two AED transfers (month 1 and month 3) at no extra charge. Razorpay USD checkout also works if you prefer that route.',
      },
      {
        question:
          'How is your AP Biology coaching different from local Dubai agencies like TutorChase or ++tutors?',
        answer:
          'Three structural differences. First, faculty: we use AIIMS-trained biology faculty as your dedicated tutor for the year, not a rotating bench of generalist tutors hired on freelance terms. Second, methodology: retrieval-heavy small-batch coaching (Indian tradition) with weekly written FRQ feedback against the College Board rubric, not generic platform tutoring. Third, price: senior-faculty 1:1 at $1,800 for 12 hours works out to $150/hr versus AED 220–400/hr ($60–$110/hr) at TutorChase or ++tutors, but with full biology specialists rather than undergraduate or master’s-level tutors at the lower local price.',
      },
      {
        question:
          'My child studies at Universal American School — what AP-5 path do you typically map for that cohort?',
        answer:
          'UAS runs AP Biology in junior year on a semester block, paired heavily with AP Chemistry. Our standard UAS path: August–November we close Campbell units 1–4 with weekly FRQ practice; December–February we cover units 5–8 with timed MCQ mocks; March–April is full-length practice exam day and AP Classroom progress check drilling; May is final review and rubric-tightening before the College Board exam. Students who start in August consistently hit AP-5; January starters typically land 4–5 depending on base prep.',
      },
      {
        question: 'Do you support the AP Capstone Diploma alongside AP Biology?',
        answer:
          'Yes. The AP Capstone Diploma (AP Seminar + AP Research plus four additional APs) is a strong signal for US college admissions and is offered at GEMS DAA, Universal American, and ASD. We coach AP Biology as one of the four — typically the science pillar — and we can advise on how to structure your AP Research project if you want it biology-themed (e.g., wet-lab proposal, bioinformatics analysis). We don’t directly tutor AP Seminar or AP Research, but several of our Dubai families pair us with a humanities tutor for those.',
      },
      {
        question:
          'Will summer-break visits to India or the UK disrupt continuity? How do you handle that?',
        answer:
          'No — this is one of our strengths. Sessions are 100% live video on Zoom or Google Meet, so as long as your child has a laptop and stable Wi-Fi we keep going from anywhere. June–August is also our highest-density coaching window for Dubai students because school is out and they can do 3–4 sessions a week. We routinely run sessions for Dubai students travelling to Mumbai, Bangalore, London, or family homes in Kerala or Punjab. Time zone flex is handled by the faculty team.',
      },
      {
        question:
          'My child is at Repton or Nord Anglia — they’re British curriculum. Can AP Biology still work for US college applications?',
        answer:
          'Absolutely, and it’s a common Dubai pattern. British-curriculum schools (Repton, Nord Anglia, JESS) typically offer AP Biology as a Year 12 or Year 13 elective alongside A-Levels or IB, specifically for students applying to US colleges. The AP-5 reads strongly on US applications and signals US-curriculum readiness that A-Level Biology alone doesn’t. We coach the full AP Biology syllabus end-to-end regardless of your child’s base curriculum — many of our Repton students take AP Bio + A-Level Chemistry + A-Level Maths as a US-targeted hybrid.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. ABU DHABI
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'abu-dhabi',
    cityName: 'Abu Dhabi',
    region: 'Abu Dhabi Island + Saadiyat + Khalifa City + Yas Island',
    timezone: 'GST (Gulf)',
    timezoneIana: 'Asia/Dubai',
    addressRegion: 'Abu Dhabi',
    heroBlurb:
      'Abu Dhabi’s AP Biology demand is concentrated around the American cluster on Saadiyat and Khalifa City — GEMS American Academy Abu Dhabi, American Community School (ACS), Canadian International, Cranleigh, and the Aldar Academies network — plus Brighton College and Repton on the British side offering AP as a US-track elective. Strong South Asian, Egyptian, Lebanese, and East Asian expat academic communities drive the AP uptake here, particularly into NYU Abu Dhabi’s admissions pool and US mainland universities. GST evening live classes (6–9 PM Abu Dhabi time) work cleanly for the AP-heavy junior/senior schedules these schools run.',
    positioningBlurb:
      'Abu Dhabi families often face thinner AP tutoring supply than Dubai — fewer specialist agencies, shorter freelance benches. Local options (TutorChase, GoStudent, individual freelancers) charge AED 250–450 per hour ($70–$120/hr) for non-specialist generalists who often commute from Dubai. Cerebrum delivers AIIMS-trained biology faculty as a dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and the Indian small-batch coaching tradition (max 12 per batch) calibrated to retrieval practice and timed mocks. Senior-faculty 1:1 from $1,800 for a 12-hour package, with no Dubai-commute premium or weekend-only constraint.',
    schools: [
      'GEMS American Academy Abu Dhabi',
      'American Community School of Abu Dhabi (ACS)',
      'Canadian International School Abu Dhabi',
      'Cranleigh Abu Dhabi',
      'GEMS World Academy Abu Dhabi',
      'Brighton College Abu Dhabi',
      'Repton School Abu Dhabi',
      'Nord Anglia International School Abu Dhabi',
      'Aldar Academies — Al Yasmina Academy',
      'Aldar Academies — Al Bateen Academy',
      'Raha International School',
      'American International School Abu Dhabi',
    ],
    faqs: [
      {
        question:
          'Saadiyat and Khalifa City school clusters have very different commute patterns — does that matter for online AP Bio?',
        answer:
          'For online live classes it doesn’t matter at all — and that’s precisely the point. A Saadiyat family at ACS Abu Dhabi or Cranleigh, and a Khalifa City family at GEMS American Academy or Canadian International, both sit at home for our sessions. The commute pain that AED 250–450/hr freelancers create — travel time charged, schedule rigidity, last-minute cancellations when the tutor is stuck in Dubai-AD traffic — disappears entirely. Same senior faculty, same Zoom link, no driver-and-Sheikh-Zayed-Road overhead.',
      },
      {
        question:
          'Several Aldar Academies students take AP Biology — do you have a track record with that cohort?',
        answer:
          'Yes. Al Yasmina Academy and Al Bateen Academy in the Aldar network offer AP Biology as an elective alongside the British base curriculum, specifically for students aiming at US universities or NYU Abu Dhabi. We coach the full College Board syllabus end-to-end, and several of our Abu Dhabi families combine AP Biology with A-Level Chemistry — a hybrid US-UK track that reads strongly for both UCAS and US Common App. Faculty are familiar with the Aldar pacing and how it differs from the pure-American schools on Saadiyat.',
      },
      {
        question:
          'My child is at GEMS American Academy Abu Dhabi — they’re very AP-heavy. How do you schedule around that load?',
        answer:
          'GEMS American AD students typically carry 5–7 APs concurrently in junior year, with AP Bio, AP Chem, and AP Calc clustered tight. We schedule two 90-minute 1:1 sessions per week — usually Sunday and Wednesday evenings 7–9 PM GST, with Saturday morning reserved for full-length FRQ practice in March-April. The key is that we don’t duplicate what the school teacher is doing; we add the FRQ rubric layer and timed-mock skill that converts a school A into an AP-5. Pace is calibrated weekly to your child’s unit-by-unit progress.',
      },
      {
        question:
          'NYU Abu Dhabi is a strong target — does AP Biology help that application, and do you coach the supplementary essays?',
        answer:
          'NYU Abu Dhabi is one of the most selective universities in the world (sub-2% admit rate) and looks for both academic depth and global outlook. A 5 in AP Biology is a baseline signal of US-curriculum rigour, and pairing it with USABO Open participation or a strong research portfolio is a meaningful differentiator. We coach AP Biology and can advise on how biology shows up in your candidate profile, but we don’t directly tutor the NYUAD supplementary essays — for that, several of our Abu Dhabi families use a separate admissions consultant we’re happy to recommend.',
      },
      {
        question:
          'Do you accept AED transfer to a UAE bank account, or do all payments need to be in USD?',
        answer:
          'Both work. We accept AED bank transfer to Emirates NBD or Mashreq (no FX conversion charged to you), international Visa / Mastercard / Amex in USD, and Wise transfers. Several Abu Dhabi families split the $1,800 senior-faculty package across two AED transfers spaced 60 days apart at no extra charge. We can issue an invoice with TRN-equivalent details for parents who need it for corporate education-allowance reimbursement.',
      },
      {
        question:
          'Yas Island and Saadiyat have summer humidity that drives families abroad in July–August. How do you keep AP Bio momentum during that window?',
        answer:
          'June–August is actually our highest-intensity coaching window for Abu Dhabi families precisely because schools are out and many families travel. Sessions are 100% live video on Zoom — your child can join from London, Mumbai, Bangalore, Beirut, or wherever the family summer base is. We typically run 3–4 sessions per week through the summer for students who want to walk into junior or senior year already two units ahead. No make-up logistics, no time-zone surcharge.',
      },
      {
        question:
          'How is your coaching different from Cranleigh or Brighton College’s in-house AP support?',
        answer:
          'Cranleigh and Brighton College have strong general academic support, but AP Biology is a niche specialism inside what’s primarily a British-curriculum school. In-house support typically caters to the small AP cohort with one or two teachers who may not have run the full College Board FRQ rubric calibration year on year. Our 1:1 layer adds senior-faculty biology depth, dedicated FRQ feedback every week, and timed full-length mocks — the targeted scaffolding that converts school grades into AP-5 outcomes. We work alongside the school, not against it.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 13. MUMBAI
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'mumbai',
    cityName: 'Mumbai',
    region: 'Mumbai + Navi Mumbai + Thane',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    addressRegion: 'Maharashtra',
    heroBlurb:
      'Mumbai has one of India’s deepest international-school clusters offering AP Biology: American School of Bombay (ASB) in BKC runs a full College Board AP track, Cathedral & John Connon and Bombay International School layer AP onto an IGCSE/IB base, and Dhirubhai Ambani International School and Oberoi International serve IB-Diploma cohorts who increasingly add AP Biology as a US-college signal. The typical Mumbai student in our programme is a CBSE/ICSE/IB-DP student layering AP-5 on top of their base curriculum to strengthen US college applications. IST evening live classes (6–9 PM) slot cleanly into the post-school window.',
    positioningBlurb:
      'Most India-based AP tutors are generalist test-prep agencies — Jamboree, Karan Gupta, Edu-Mentor, the Princeton Review franchise — that bundle AP Biology into broader SAT/ACT/Common-App packages. None specialise in biology. Cerebrum is the opposite: biology-only, AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and IST-evening live classes that respect Mumbai’s school-to-tuition rhythm. Senior-faculty 1:1 from $1,800 for 12 hours ($150/hr) — substantially below the $150–400/hr that US-based AP tutors charge Mumbai families over Zoom.',
    schools: [
      'American School of Bombay (ASB)',
      'Cathedral & John Connon School',
      'Bombay International School (BIS)',
      'Oberoi International School',
      'Aditya Birla World Academy',
      'Ecole Mondiale World School',
      'Dhirubhai Ambani International School',
      'Singapore International School Mumbai',
      'Hill Spring International School',
      'Jamnabai Narsee School',
      'Lilavatibai Podar Senior Secondary',
      'J.B. Petit High School for Girls',
      'Mainadevi Bajaj International School',
      'R.N. Podar School',
      'Bombay Scottish School Mahim',
    ],
    faqs: [
      {
        question:
          'My child is at ASB in BKC and already doing IB Diploma — does it make sense to also do AP Biology?',
        answer:
          'For ASB students applying to US colleges, AP Biology on top of IB Bio HL is a meaningful signal — it shows US-curriculum literacy that pure IB doesn’t convey to American admissions officers reading thousands of files. The trade-off is workload: IB Bio HL Internal Assessment and EE deadlines cluster in November–February, exactly when AP Bio FRQ practice ramps. We typically run two 90-minute IST evening sessions for ASB-IB hybrids and front-load Campbell units 1–4 before September so the IA window stays clear. Pure IB students don’t need AP; US-targeted IB students often do.',
      },
      {
        question:
          'Cathedral and BIS students are doing ICSE/IGCSE — does AP Biology actually transfer to US college applications?',
        answer:
          'Yes — College Board AP exams are the gold-standard US-curriculum signal regardless of your base curriculum. A Cathedral ICSE student or BIS IGCSE student who self-studies AP Biology and scores 5 reads on a US application exactly the same as an American School student who took the course in school. The May AP exam is open to anyone — you register through a participating school or online proctor. Several of our Mumbai students sit AP Biology purely externally while doing ICSE 12, and consistently land AP-5.',
      },
      {
        question: 'Will the monsoon disrupt online live classes between June and September?',
        answer:
          'Mumbai monsoon does cause occasional power and Wi-Fi disruption, but our sessions are 100% live video on Zoom with full recordings, so any missed minute is recoverable. We recommend a basic 4G/5G mobile hotspot backup — most Mumbai families already have one — and we’re happy to reschedule any session affected by an unavoidable outage at no charge. June–August also coincides with school summer break, so we typically run higher-density sessions (3–4 per week) during that window for students who want to walk into the academic year already two units ahead.',
      },
      {
        question:
          'Honest question — can AP Biology replace NEET prep if my child decides to do medicine in India later?',
        answer:
          'No. AP Biology is a US-curriculum exam built around the College Board syllabus — it does not transfer as credit to any Indian medical college, and it does not substitute for NEET. NEET is a Class 11–12 NCERT-anchored exam with a very different question format. If your child is genuinely dual-tracking (US apps + NEET as fallback), we can run a separate NEET preparation programme alongside AP Biology — there is meaningful conceptual overlap on cell biology, genetics, and physiology, but the exam formats and depth-vs-breadth balance are distinct. Be honest with your child about which track is primary.',
      },
      {
        question:
          'IST-evening live classes — will they clash with my Cathedral or ASB child’s March mock-IB / IBDP exam month?',
        answer:
          'Mock-IB at Cathedral and ASB typically falls in late February or early March, exactly when AP Biology revision should be peaking. We handle this by front-loading: by early February we close all Campbell unit content and shift to FRQ rubric drilling and full-length timed mocks. During mock-IB week we pause new content and run shorter 45-minute focused review sessions (or pause entirely if your child needs the bandwidth). AP exam in early May then gets a clean 6-week final-push window after mocks finish.',
      },
      {
        question:
          'BKC traffic and South Mumbai commute is brutal — but you’re online, so that’s solved, right?',
        answer:
          'Exactly. Most Mumbai AP tutoring options are either in-person in South Mumbai (driver, traffic, two-hour round trip from BKC or Powai) or in-person in Andheri/BKC (same problem reversed from Colaba or Bandra West). Our 100% online live model removes that entirely — your child opens a laptop at home at 6 PM, finishes at 7:30, and has dinner. The senior specialist they’re working with is the same year-round regardless of where the faculty lives. No driver overhead, no two-hour commute, no Saturday-only-because-of-traffic constraint.',
      },
      {
        question: 'How do we pay — Indian bank transfer in INR, or do we have to pay in USD?',
        answer:
          'Both work. We accept INR bank transfer to HDFC / ICICI / SBI (no FX charged to you), UPI for smaller installments, international Visa / Mastercard / Amex in USD, and Wise transfers. Several Mumbai families split the $1,800 senior-faculty package across two or three INR transfers at no extra charge. We can issue a GST-compliant invoice for parents who need it for corporate education-allowance reimbursement.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 14. DELHI NCR
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'delhi-ncr',
    cityName: 'Delhi NCR',
    region: 'Delhi + Gurgaon + Noida + Faridabad',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    addressRegion: 'Delhi',
    heroBlurb:
      'Delhi NCR’s AP Biology demand clusters around the American Embassy School (AES) in Chanakyapuri, the Pathways network (Aravali, Gurgaon, Noida), Sanskriti School, Vasant Valley, and the GD Goenka / Heritage / Lancers international cohort. The typical NCR student in our programme is either an AES-track US-college applicant, a Pathways IBDP student layering AP for US apps, or a Modern / DPS International / Sanskriti CBSE-12 student dual-applying to Indian universities and US colleges. Cerebrum’s South Extension hub sits 4 km from AIIMS Delhi — our senior faculty roster is drawn from that ecosystem and an occasional in-person consultation is available for NCR families who want it.',
    positioningBlurb:
      'Delhi NCR is the densest market in India for generalist test-prep agencies — Jamboree, Karan Gupta, The Princeton Review (Connaught Place + Gurgaon), Manya Education, Edu-Mentor — most of which bundle AP Biology into broader SAT / ACT / IELTS / Common-App packages tutored by non-specialist staff. Cerebrum is biology-only: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, IST evening live classes, and the option of in-person review at our South Extension hub for NCR-based families. Senior-faculty 1:1 begins at $1,800 for 12 hours — well below the $150–400/hr US-based tutors charge over Zoom.',
    schools: [
      'American Embassy School (AES) New Delhi',
      'Pathways World School Aravali',
      'Pathways School Gurgaon',
      'Pathways School Noida',
      'Sanskriti School',
      'Vasant Valley School',
      'Modern School Barakhamba Road',
      'Modern School Vasant Vihar',
      'Shri Ram School Aravali (Gurgaon)',
      'Shri Ram School Moulsari (Gurgaon)',
      'British School New Delhi',
      'Lancers International School',
      'GD Goenka World School',
      'Heritage Xperiential Learning School',
      'DPS International R.K. Puram',
      'DPS International Gurgaon',
      'Bluebells School International',
      'Step by Step School Noida',
    ],
    faqs: [
      {
        question:
          'AES Delhi has a strong in-school AP Biology class — is external tutoring still useful for that cohort?',
        answer:
          'AES’s AP Biology faculty is among the best in-school in India and the class typically produces a healthy 4–5 distribution. The gap, when it exists, is FRQ rubric mastery — converting strong concept knowledge into the 4-point, time-pressured answers the College Board grader expects. Our 1:1 layer adds weekly written FRQ feedback against the rubric and timed full-length mock exams, the targeted scaffolding most school AP cohorts don’t have bandwidth for. Several of our AES students use us as the FRQ-and-mocks supplement, not as a replacement for the school class.',
      },
      {
        question:
          'My child is at Pathways or Sanskriti doing IBDP — does adding AP Biology actually move the needle for US college applications?',
        answer:
          'For US-targeted applicants, yes — AP Biology layered on top of IB Bio HL is a meaningful signal. American admissions officers read thousands of IB transcripts but parse AP scores as the canonical US-curriculum benchmark. A Pathways IBDP-HL student who also scores AP-5 reads as both globally rigorous and US-curriculum literate. The trade-off is workload during IA / EE crunch (November–February). For pure UK / Europe / Australia applicants, IB alone is sufficient — AP adds little. The decision should follow the application target, not be reflexive.',
      },
      {
        question:
          'You mentioned an AIIMS Delhi connection — can we actually meet faculty in person at the South Extension centre?',
        answer:
          'Yes for NCR-based families, by appointment. Our coaching delivery is 100% online live video — that is structurally the right model for the depth and pace AP Biology requires. But occasional in-person consultations at our South Extension hub (4 km from AIIMS Delhi) are available for NCR families who want a face-to-face progress review, study-plan calibration, or pre-exam strategy session. Most of our NCR families never use this and are entirely satisfied with online; some use it once or twice a year as a touchpoint. AIIMS-trained means our senior faculty have trained at AIIMS, not that they teach from AIIMS.',
      },
      {
        question:
          'My DPS International or Modern School child is doing CBSE 12, preparing for NEET, AND wants to apply to US colleges. Can AP Biology fit?',
        answer:
          'This dual-application profile is common in our NCR roster. The honest assessment: it is hard but doable if you start early (Class 11 summer). CBSE 12 + NEET prep is itself a 60-hour-per-week load; layering AP Biology adds another 4–6 hours per week of focused work. The conceptual overlap with NEET helps — cell biology, genetics, physiology, ecology cover much of the AP syllabus — but FRQ format and US-style data interpretation require dedicated practice. We typically run two 90-minute IST evening sessions for these students, calibrated to keep NEET prep as the primary track and AP as the secondary US-application layer. Be honest with your child about which track is primary.',
      },
      {
        question:
          'Will AP Biology give my child credit toward an Indian MBBS, BDS, or BSc programme?',
        answer:
          'No. The NMC (National Medical Commission), Indian universities, and the NEET admissions framework do not recognise AP Biology — it is a US-curriculum exam administered by the College Board, designed for US college admissions. A score of 4 or 5 typically earns 6 to 8 credit hours toward general biology at US universities, but it carries zero standing in Indian higher education. Delhi NCR families who are realistically planning Indian medical school should treat NEET as the only relevant track; AP Biology in that case is purely an enhancer for the parallel US college application.',
      },
      {
        question:
          'Gurgaon to South Delhi commute is impossible at peak hours — does that affect tutoring at all?',
        answer:
          'Not for online classes — which is the entire delivery model. Your child opens a laptop in Aravali or Moulsari at 6 PM, finishes at 7:30, and the Gurgaon-to-Delhi-MG-Road traffic at that hour is irrelevant. The only time commute matters is for the optional in-person consultations at South Extension; those we schedule on weekends or in slow-traffic windows by appointment. NCR families consistently tell us removing the commute is half the benefit — your child gets an extra two hours per session compared to in-person tutoring at any Delhi or Gurgaon centre.',
      },
      {
        question: 'How do we pay — INR transfer or USD card?',
        answer:
          'Both. INR transfer to HDFC / ICICI / SBI is the most common (no FX charged to you), UPI works for smaller installments, international Visa / Mastercard / Amex in USD, and Wise transfers. Several NCR families split the $1,800 senior-faculty package across two or three INR transfers at no extra charge. GST-compliant invoices available for corporate reimbursement.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 15. BANGALORE
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'bangalore',
    cityName: 'Bangalore',
    region: 'Bangalore + Whitefield + Sarjapur + Electronic City',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    addressRegion: 'Karnataka',
    heroBlurb:
      'Bangalore’s AP Biology demand is shaped by its international-school cluster across two distinct corridors: the Whitefield-Sarjapur tech-belt (Greenwood High, Indus, Inventure, Oakridge, NPS International) where AP layers cleanly onto a STEM-leaning cohort, and the central / south Bangalore axis (Stonehill, Canadian International, Mallya Aditi, TISB) where AP is more often paired with IB. The typical student in our programme is a tech-family STEM-leaning IB or AP school student pairing AP Biology with coding and accelerated math for MIT / Stanford / Carnegie Mellon applications. Saturday-morning IST batches also work cleanly for the cohort that prefers weekday school focus.',
    positioningBlurb:
      'Bangalore parents are unusually price-sensitive and methodology-literate — tech-employee households scrutinise tutoring like they scrutinise vendor SLAs. The generalist test-prep agencies (Jamboree, The Princeton Review Indiranagar, Manya, Karan Gupta) bundle AP Biology into SAT / Common-App stacks staffed by rotating non-specialist tutors. Cerebrum is structurally different: biology-only, AIIMS-trained biology faculty as your dedicated year-long tutor, transparent weekly written FRQ feedback (the SLA you can actually measure), and IST evening or Saturday-morning live classes. Senior-faculty 1:1 from $1,800 for 12 hours ($150/hr) — well below US-based tutors’ $150–400/hr Zoom rates, with deeper subject specialism.',
    schools: [
      'Inventure Academy',
      'Trio World Academy',
      'Stonehill International School',
      'Indus International School Whitefield',
      'Indus International School Sarjapur',
      'Canadian International School Bangalore',
      'Greenwood High International School Whitefield',
      'Greenwood High International School Sarjapur',
      'Mallya Aditi International School',
      'Oakridge International School Bangalore',
      'Ebenezer International School',
      'Bangalore International School (BIS)',
      'Sarala Birla Academy',
      'Treamis World School',
      'NPS International',
      'The International School Bangalore (TISB)',
    ],
    faqs: [
      {
        question:
          'Inventure / Trio / Stonehill are IB-leaning, but Greenwood / Indus are more AP-friendly — does the school you attend matter for our coaching?',
        answer:
          'It changes the integration pattern, not the coaching content. For Greenwood / Indus AP-track students, we mirror the school’s unit pacing and add the FRQ rubric layer most school cohorts under-drill. For Stonehill / Inventure / TISB IBDP students adding AP Biology as a US-application supplement, we run AP as a parallel external track — Campbell units 1–8 covered independently of the school’s IB Bio sequence — and align timing to the May AP exam regardless of IB internal deadlines. Same senior faculty, same FRQ rubric standard; the calibration differs.',
      },
      {
        question:
          'Whitefield to Electronic City is a 90-minute commute at best — does that change how we should schedule live classes?',
        answer:
          'Not at all, because the live classes are online. That’s actually one of Bangalore’s strongest arguments for online tutoring: in-person AP biology specialists are almost all in central or south Bangalore, putting a Whitefield or Electronic City family on a 3-hour round-trip evening that destroys homework time. Our 100% online live model means your child finishes school, has a 30-minute reset, opens a laptop at 6 PM IST, and is done by 7:30. Saturday-morning batches at 10 AM – 12 PM IST also work cleanly for families that prefer to keep weekday evenings free.',
      },
      {
        question:
          'My child is at NPS / Greenwood and STEM-leaning — they’re already doing AP Calc BC, USACO, and coding. Does adding AP Biology over-stretch them?',
        answer:
          'Honestly, it depends on the student. The tech-family STEM-leaning Bangalore profile (AP Calc BC + USACO Silver/Gold + AP Computer Science) is one of our most common — and the strong ones absolutely add AP Biology in junior year for MIT / Stanford / CMU breadth signalling. The weaker ones over-extend and produce a 3 or 4 that hurts the application more than no AP Bio at all would have. The honest call: if your child is comfortably 5-track in math/CS already, AP Bio is a strong add. If they’re grinding to maintain those tracks, deepen what’s working rather than adding a fourth.',
      },
      {
        question:
          'Saturday-morning batch — what does that actually look like for a Bangalore student?',
        answer:
          'Saturday-morning small-batch (4–6 students) runs 9–12 AM IST roughly 24–32 weekends per year, mirroring the AP Biology academic year (August through early May with breaks for school exams and holidays). Each session is 3 hours: 90 minutes Campbell content + 60 minutes FRQ drilling + 30 minutes timed MCQ review. Total programme is 16 hours small-batch from $640, which works out to $40/hour — well below 1:1 pricing and ideal for families who want quality coaching at a price point that scales to multiple children or extended family budgets.',
      },
      {
        question:
          'My child is doing Karnataka State Board PUC alongside trying AP Biology for US apps — can both work?',
        answer:
          'State Board PUC Biology and AP Biology have meaningful conceptual overlap (cell biology, genetics, physiology, ecology) but very different exam formats: PUC is largely descriptive and Karnataka-NCERT-anchored, AP is multiple-choice + FRQ data interpretation against the College Board rubric. We have run several PUC + AP combinations successfully, but it requires honest workload conversation — PUC Class 12 final exam pressure peaks in February-March, exactly when AP FRQ practice should be peaking. Our IST-evening 1:1 sessions can be calibrated to keep PUC as the primary track (for KCET / state-college fallback) and AP as the US-application layer.',
      },
      {
        question: 'Will AP Biology credit transfer toward an Indian engineering or medical degree?',
        answer:
          'No. AP Biology is recognised by US universities (typically a 4 or 5 earns 6–8 credit hours toward general biology), but it has zero recognition with Indian institutions — no IIT, IISc, NIT, NEET-admitting medical college, JEE-track programme, or Karnataka state university will grant credit, weight, or admission preference for an AP Biology score. If your child’s realistic primary path is Indian engineering or medicine, focus on JEE / NEET / KCET first. AP Biology is purely a US college application enhancer; don’t conflate the tracks.',
      },
      {
        question: 'How do we pay — INR or USD?',
        answer:
          'Both. INR bank transfer to HDFC / ICICI / SBI is the most common (no FX charged to you), UPI works for installments, international Visa / Mastercard / Amex in USD, and Wise transfers. Several Bangalore families split the $1,800 senior-faculty package across two or three INR transfers at no extra charge. We can issue GST-compliant invoices for tech-employer education-allowance reimbursement.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 16. HYDERABAD
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'hyderabad',
    cityName: 'Hyderabad',
    region: 'Hyderabad + Gachibowli + Madhapur + Banjara Hills',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    addressRegion: 'Telangana',
    heroBlurb:
      'Hyderabad’s AP Biology demand has grown sharply with the HiTech City and Gachibowli expansion: Oakridge International (Gachibowli + Bachupally), CHIREC International (Kondapur), Indus International, Glendale Academy, Sancta Maria, and the diplomatic-enclave International School of Hyderabad anchor the cluster, with Aga Khan Academy and Silver Oaks adding to the AP-friendly bench. The typical Hyderabad student in our programme is a tech-family or Telugu-NRI-returnee STEM-leaning student targeting the Hyderabad → Carnegie Mellon / Purdue / UT Austin / Texas pipeline that’s become a major regional pattern. IST evening live classes (6–9 PM) work cleanly for the post-school window.',
    positioningBlurb:
      'Hyderabad has fewer specialist AP tutoring options than Mumbai, Delhi, or Bangalore — the local market is dominated by FIITJEE Punjagutta, Sri Chaitanya and Narayana, PhysicsWallah (PW) and similar JEE / NEET coaching giants, none of which seriously coach AP Biology. The few US-curriculum options (Jamboree Banjara Hills, The Princeton Review Madhapur) bundle AP into broader SAT / Common-App stacks staffed by generalist tutors. Cerebrum is biology-only: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, IST evening live classes, and US-college-application context calibrated for Hyderabad families targeting US universities like CMU, Purdue, and UT Austin. Dedicated senior-faculty 1:1 from $1,800 / 12 hours.',
    schools: [
      'Oakridge International School Gachibowli',
      'Oakridge International School Bachupally',
      'CHIREC International School Kondapur',
      'Indus International School Hyderabad',
      'Glendale Academy International',
      'Sancta Maria International School',
      'International School of Hyderabad (ISH)',
      'Aga Khan Academy Hyderabad',
      'Silver Oaks International School Bachupally',
      'Silver Oaks International School Banjara Hills',
      'Hyderabad Public School Begumpet (HPS)',
      'Phoenix Greens International School',
      'Manthan International School',
      'Jubilee Hills Public School',
    ],
    faqs: [
      {
        question:
          'The Hyderabad → Carnegie Mellon / Purdue / UT Austin pipeline is real — does AP Biology actually help that target?',
        answer:
          'For STEM-leaning applicants to CMU, Purdue, UT Austin, Georgia Tech, and the broader US public-flagship engineering cluster, AP Biology is useful but not central. The pipeline is anchored on AP Calc BC, AP Physics C, AP Computer Science, and SAT / ACT math performance. AP Biology becomes a strong differentiator for the subset targeting CMU Bio-MD, Purdue Biological Sciences, UT Austin Health Science Center, or any bioengineering track — where a 5 on AP Bio reads as serious biological-systems readiness. If your child is pure CS/EE target, AP Bio is optional; if there’s any bio-adjacent angle (bioengineering, neuroscience, computational biology), it matters.',
      },
      {
        question:
          'My child studies at Oakridge Gachibowli — what AP-5 path do you typically map for that cohort?',
        answer:
          'Oakridge Gachibowli runs AP Biology in junior or senior year on a year-long block paired with AP Chem and often AP Physics 1. Our standard Oakridge path: August–November we close Campbell units 1–4 alongside the school class with weekly FRQ feedback; December–February we cover units 5–8 and start timed MCQ mocks; March–April is full-length practice exam day and rubric tightening; May is final review before the College Board exam. Students who start in August consistently hit AP-5; January starters typically land 4–5 depending on base prep.',
      },
      {
        question:
          'My parents speak primarily Telugu and worry about English-only live classes — how do you handle that?',
        answer:
          'Honest answer: our live classes are conducted in English because AP Biology itself is an English-medium College Board exam and your child will need English-comfort regardless. That said, our faculty are multilingual (Hindi-comfortable, with several Telugu-comfortable senior faculty), and parent-touchpoint conversations — monthly progress reviews, payment discussions, study plan calibration — can be conducted in Hindi or basic Telugu if helpful. The child-facing teaching is English-only by design; the family-facing communication is flexible. Most Telugu-medium parents tell us this works well once they see the first progress report.',
      },
      {
        question:
          'Many Hyderabad students do FIITJEE / Allen / Sri Chaitanya and Narayana for JEE or NEET — can AP Biology fit on top of that load?',
        answer:
          'Carefully. FIITJEE / Allen / Sri Chaitanya and Narayana integrated programmes are 30–40 hours a week of coaching on top of school. Layering AP Biology adds 4–6 hours of focused work. For a NEET-bound child specifically, there’s real conceptual overlap with AP Bio (cell biology, genetics, physiology, ecology) that makes the dual-track tractable. For a JEE-bound child, the overlap is near zero — AP Bio is pure additional load. We’ve seen NEET + AP Bio combinations produce both NEET selection and AP-5 with a strong student and an August start. JEE + AP Bio is a harder ask; we’ll be honest if we think it won’t work.',
      },
      {
        question:
          'HiTech City vs old Hyderabad — does the school cluster you live near affect tutoring?',
        answer:
          'For online live classes, no — your child opens a laptop in HiTech City (Oakridge / CHIREC / Indus catchment) or Banjara Hills / Jubilee Hills (HPS / Silver Oaks Banjara Hills / Glendale catchment) and joins the same Zoom room with the same senior faculty. The only school-cluster difference is in our coaching calibration: HiTech City schools tend to run faster AP pacing (US-aligned, August–May), while older Hyderabad schools sometimes pair AP with state-board Class 12 prep at a slower pace. We adjust the unit timing accordingly. Same standard, different ramps.',
      },
      {
        question:
          'Honestly — can AP Biology get my child into an Indian MBBS programme as a backup?',
        answer:
          'No. AP Biology has zero recognition with the National Medical Commission (NMC), with Telangana state medical admissions, or with any Indian MBBS / BDS / BSc programme. NEET is the only pathway to Indian medical college, full stop. AP Biology is purely a US-college application enhancer — it transfers as 6–8 credit hours of general biology at most US universities, but it does not, and will not, function as a backup for Indian medical admissions. If a backup matters, NEET prep needs to run as a parallel primary track. We can coach both; we’ll be straight about which is which.',
      },
      {
        question: 'How do we pay — INR transfer or USD?',
        answer:
          'Both. INR bank transfer to HDFC / ICICI / SBI is the most common (no FX charged to you), UPI works for smaller installments, international Visa / Mastercard / Amex in USD, and Wise transfers. Several Hyderabad families split the $1,800 senior-faculty package across two or three INR transfers at no extra charge. GST-compliant invoices available for IT-employer education-allowance reimbursement.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 17. VANCOUVER
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'vancouver',
    cityName: 'Vancouver',
    region: 'Vancouver + Burnaby + Richmond + Surrey + West Van',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Vancouver',
    addressRegion: 'BC',
    heroBlurb:
      'British Columbia has been one of the fastest-growing AP markets in Canada — BCCAT reports a 72% jump in AP participation from 2006 to 2016, with steady +3%/year growth since. Vancouver feeder schools like Sir Winston Churchill, Lord Byng, Eric Hamber, University Hill, and the independent cluster (York House, Crofton House, St. George’s, West Point Grey) run serious AP Biology cohorts every year. The Lower Mainland’s deep Indo-Canadian, Chinese, and Korean academic communities — particularly across Richmond, Burnaby, and Surrey — drive heavy AP-5 demand from families dual-applying to UBC, McGill, Waterloo, and US schools like UCLA, Berkeley, and Ivies.',
    positioningBlurb:
      'The Canadian AP tutoring market is fragmented — Tutorfair, Spires, MyTutor, and a long tail of local Vancouver agencies charge CAD $50–100/hr for mostly undergraduate or recent-graduate tutors with no biology specialism. Cerebrum is operates on a different model: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and the Indian small-batch tradition (max 12) calibrated to retrieval practice. Saturday-morning PT live classes work cleanly with BC school schedules. Senior-faculty 1:1 from USD $1,800 for 12 hours — competitive once you compare like-for-like specialist expertise.',
    schools: [
      'Sir Winston Churchill Secondary',
      'Lord Byng Secondary',
      'University Hill Secondary',
      'Eric Hamber Secondary',
      'David Thompson Secondary',
      'Prince of Wales Secondary',
      'Magee Secondary',
      'York House School',
      'Crofton House School',
      'St. George’s School',
      'West Point Grey Academy',
      'Mulgrave School',
      'Burnaby North Secondary',
      'Steveston-London Secondary',
      'Richmond Secondary',
    ],
    faqs: [
      {
        question:
          'How do PT live classes fit a Lord Byng or Sir Winston Churchill student’s weekly schedule?',
        answer:
          'BC public schools dismiss around 3:00 PM, and most Vancouver AP Biology students have club, sport, or extension lab commitments through 5:00 PM. We schedule 90-minute 1:1 sessions in PT evenings (7–9 PM) on weekdays or Saturday mornings (9 AM–noon PT). The Saturday slot is especially popular with Lord Byng and Churchill cohorts because it leaves weekday evenings clear for school homework. All sessions are recorded for replay.',
      },
      {
        question:
          'My child is applying to UBC and US colleges — does AP Biology help both tracks, or just the US one?',
        answer:
          'Both, but asymmetrically. UBC, SFU, McGill, and Waterloo recognise AP Biology for first-year credit (typically BIOL 111/112 equivalents with a 4 or 5) and treat the score as supplementary signal in a transcript-dominated Canadian admissions read. For US adcoms, AP-5 is a far stronger differentiator — it’s the only universally-recognised US-curriculum credential and reads as serious science readiness. A BC student dual-applying gets meaningful value on both sides, with the bigger lift on US apps.',
      },
      {
        question:
          'Richmond, Burnaby, and Surrey families face long commutes for in-person tutoring — does 100% online actually work as well?',
        answer:
          'Better, in our experience. A Richmond family at Steveston-London or Richmond Secondary, or a Burnaby family at Burnaby North, would otherwise spend 60–90 minutes round-trip for a 90-minute Vancouver session. With live Zoom 1:1, your child opens a laptop at home, joins the same senior faculty member they would have driven to see, and uses the saved 90 minutes for school homework or sleep. We have not had a Lower Mainland family who tried online and asked to switch back to in-person.',
      },
      {
        question:
          'York House, Crofton House, and St. George’s run their own AP Bio classes — what does external tutoring add?',
        answer:
          'The independent schools teach AP Biology well at a class level, but they cannot deliver the weekly 1:1 FRQ rubric feedback that converts school A grades into AP-5 scores. School AP teachers manage 20–30 students; they cannot mark every FRQ attempt to College Board rubric weekly. That gap is exactly what our 1:1 layer fills: same syllabus your school teaches, plus dedicated rubric calibration, timed full-length mocks, and the FRQ-specific writing skill that the May exam tests.',
      },
      {
        question: 'How do we pay — CAD bank transfer, USD card, or both?',
        answer:
          'Both work. We accept CAD via Wise transfer or international card (your bank handles the FX), and USD directly on international Visa / Mastercard / Amex. Several Vancouver families split the USD $1,800 senior-faculty package across two CAD transfers spaced 60 days apart at no extra charge. We also accept Interac e-Transfer for smaller installment amounts through a partner account on request. Invoices issued in the currency of payment.',
      },
      {
        question:
          'For Indo-Canadian families thinking about Indian medicine — does AP Biology help with NEET or Indian MBBS?',
        answer:
          'No. AP Biology has zero recognition with India’s National Medical Commission, and NEET is the only pathway to Indian MBBS / BDS. Additionally, NEET admission requires Indian citizenship or specific OCI / NRI seat eligibility, which most Canadian permanent residents and citizens do not qualify for. AP Biology is purely a US/Canadian-college application enhancer. If your family is exploring Indian medicine specifically, that needs separate NEET prep and citizenship-pathway research — we will be straight about which track is which.',
      },
      {
        question: 'When should a Vancouver student start AP Biology tutoring for the May exam?',
        answer:
          'For a May AP exam, an August or September start gives full runway: Campbell Biology units 1–4 close by November, units 5–8 by February, and March–April is dedicated to timed full-length practice and FRQ rubric tightening. January starts can still produce AP-5 with focused weekly work and an honest student. Crash plans of 8–12 weeks pre-exam are possible but cap the FRQ writing depth that separates 4 from 5.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 18. TORONTO (GTA)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'toronto-gta',
    cityName: 'Toronto (GTA)',
    region: 'Toronto + North York + Scarborough + Markham + Vaughan + Oakville',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/Toronto',
    addressRegion: 'ON',
    heroBlurb:
      'The Greater Toronto Area is Canada’s largest AP Biology market and one of its fastest growing — BCCAT and College Board Canada data show AP participation up 72% between 2006 and 2016, with sustained +3%/year growth in Ontario since. The public TDSB AP cluster (Earl Haig, Marc Garneau, William Lyon Mackenzie, North Toronto CI, Don Mills CI, Harbord, A.Y. Jackson) and the independent cluster (UCC, UTS, Branksome Hall, Havergal, Crescent, Bishop Strachan, St. Michael’s) together run some of the deepest AP Bio cohorts outside the US. The GTA’s strong Indo-Canadian, Chinese, and Korean academic communities — especially in Markham, Vaughan, and North York — drive heavy dual UofT/McGill + US Ivy applications.',
    positioningBlurb:
      'Toronto AP tutoring options run from boutique agencies (Prep Academy, The Tutoring Expert) at CAD $80–120/hr to platform tutors (Tutorfair, Spires) at CAD $50–90/hr — typically undergraduate or master’s-level tutors with no biology specialism. Cerebrum is biology-only: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and the Indian small-batch coaching tradition (max 12). ET-evening live classes (7–9 PM ET) slot cleanly into TDSB and Peel/York Region school rhythms. Senior-faculty 1:1 from USD $1,800 for 12 hours.',
    schools: [
      'Earl Haig Secondary School',
      'North Toronto Collegiate Institute',
      'Marc Garneau Collegiate Institute',
      'William Lyon Mackenzie Collegiate Institute',
      'Don Mills Collegiate Institute',
      'Harbord Collegiate Institute',
      'A.Y. Jackson Secondary School',
      'University of Toronto Schools (UTS)',
      'Upper Canada College',
      'Branksome Hall',
      'Havergal College',
      'Crescent School',
      'Bishop Strachan School',
      'St. Michael’s College School',
      'Trinity College School',
      'Ridley College',
      'Appleby College',
      'Pickering College',
    ],
    faqs: [
      {
        question:
          'My child is at Earl Haig or Marc Garneau and already carries 6 APs — how do you schedule around that load?',
        answer:
          'Earl Haig, Marc Garneau, and Mackenzie students typically run 5–7 APs concurrently in Grade 11 or 12, with AP Biology often paired tight against AP Chem and AP Calc. We schedule two 90-minute 1:1 sessions per week — most commonly Tuesday and Thursday evenings 7–9 PM ET, with Saturday morning reserved for full-length FRQ practice in March–April. We deliberately do not duplicate what the school teacher covers; we layer the College Board FRQ rubric feedback and timed-mock skill that converts school A grades into AP-5 outcomes.',
      },
      {
        question:
          'How does AP Biology relate to Ontario’s Grade 12 SBI4U — is one enough, or do students do both?',
        answer:
          'Most TDSB AP students do both. SBI4U is the Ontario provincial biology credit needed for OUAC applications to UofT, Western, Queen’s, McMaster, and Waterloo Health Sciences — that requirement is non-negotiable for Ontario university apps. AP Biology overlaps roughly 60% with SBI4U content but tests differently (FRQ-style writing, integrated MCQ) and carries the US-curriculum signal valued by US adcoms. The two complement each other; AP-5 also typically secures first-year biology credit at UofT, Western, and McMaster.',
      },
      {
        question:
          'UTS, Branksome, and UCC families want top US schools — does AP Biology actually move the needle there?',
        answer:
          'Yes, meaningfully. For Ivy, MIT, Stanford, Duke, and UC-system applications from a Canadian transcript, US adcoms read AP scores as the single universally-comparable credential against their domestic applicant pool. A UTS or Branksome student with a 5 in AP Bio plus a strong USABO Open performance and a research extension reads strongly. Without AP, the transcript is harder to benchmark against US applicants — it is not disqualifying, but it removes a clean comparator.',
      },
      {
        question:
          'Markham, Vaughan, and Oakville students face real commute distances — does online really replicate in-person results?',
        answer:
          'For 1:1 biology tutoring, our outcomes data shows online matching or exceeding in-person. A Markham family at A.Y. Jackson or a Vaughan family at Mackenzie would lose 45–90 minutes per round trip to a Toronto in-person tutor; that time goes back into school homework or sleep. The Zoom interface actually supports better FRQ work — we annotate the student’s writing live on a shared document, which is harder to do at a kitchen table. After three sessions, families almost never ask to switch back to in-person.',
      },
      {
        question:
          'Can my child sit USABO or the Canadian Biology Olympiad (CBO) alongside AP Biology preparation?',
        answer:
          'Yes — that is a strong combined track for top-tier GTA students. The Canadian Biology Olympiad (CBO) typically runs in March, with the team selected for the International Biology Olympiad. USABO is school-administered in early February and open to students enrolled in US-recognised programmes; some GTA independent schools register cohorts. We coach AP Biology as the base, with optional Campbell + Alberts depth overlay for CBO / IBO / USABO contenders. Several UTS and Branksome students have used this dual track.',
      },
      {
        question: 'How do we pay — CAD bank transfer, Interac e-Transfer, or USD card?',
        answer:
          'All three work. We accept CAD via Wise transfer or international card (your bank handles the FX), Interac e-Transfer for smaller installments via a partner account on request, and USD directly on international Visa / Mastercard / Amex. Several Toronto families split the USD $1,800 senior-faculty package across two CAD transfers spaced 60 days apart at no extra charge. Invoices issued in the currency of payment, with HST-equivalent details on request.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 19. BRAMPTON-MISSISSAUGA
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'brampton-mississauga',
    cityName: 'Brampton-Mississauga',
    region: 'Brampton + Mississauga + Erin Mills + Streetsville (Peel Region)',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/Toronto',
    addressRegion: 'ON',
    heroBlurb:
      'Peel Region — Brampton and Mississauga — is the most heavily Indo-Canadian metro in North America, with Brampton over 50% South Asian and Mississauga a close second. AP Biology demand here has grown sharply alongside the BCCAT-tracked 72% national AP expansion from 2006–2016 and sustained Ontario growth since. Peel feeder schools like Turner Fenton, Mayfield, Lorne Park, John Fraser, Glenforest, and Iona Catholic run committed AP cohorts, and many families are dual-applying to UofT Mississauga, Western, Waterloo, and US universities. For Indo-Canadian families who grew up in Indian academic culture, our AIIMS-trained biology faculty and small-batch tradition feels structurally familiar — same rigour, calibrated to North American admissions.',
    positioningBlurb:
      'Peel Region AP tutoring is thin: the local Mississauga / Brampton supply leans toward generalist test-prep franchises and individual freelancers at CAD $50–90/hr, with no biology specialism. Indo-Canadian families often feel under-served by the local options. Cerebrum brings the Indian small-batch coaching tradition (max 12, retrieval-heavy) with AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and ET-evening live classes (7–9 PM ET). Senior-faculty 1:1 from USD $1,800 for 12 hours — pricing that respects the dual-currency reality many Peel families navigate.',
    schools: [
      'Lorne Park Secondary School',
      'Erindale Secondary School',
      'John Fraser Secondary School',
      'Iona Catholic Secondary School',
      'Glenforest Secondary School',
      'Stephen Lewis Secondary School',
      'Cawthra Park Secondary School',
      'Castlebrooke Secondary School',
      'Heart Lake Secondary School',
      'Mayfield Secondary School',
      'Turner Fenton Secondary School',
      'Bramalea Secondary School',
      'Central Peel Secondary School',
      'North Park Secondary School',
      'Rick Hansen Secondary School',
    ],
    faqs: [
      {
        question:
          'Brampton is the most Indo-Canadian city in North America — does that community context show up in your coaching?',
        answer:
          'Yes, in two practical ways. First, our AIIMS-trained biology faculty and Indian small-batch coaching method are culturally legible to most Brampton-Mississauga families — the rigor, the retrieval practice, the daily-discipline expectation are familiar. Second, we calibrate honest expectations for the South Asian academic pressure context: AP-5 is achievable for most committed students, but it is not a substitute for genuine biology depth, and we will say so. The Indo-Canadian families we coach consistently appreciate that we do not over-promise, and that the standard is rigorous without being unkind.',
      },
      {
        question:
          'How does a Peel student differentiate against the Toronto independent-school applicant pool when US adcoms read the file?',
        answer:
          'US admissions officers reading a Brampton or Mississauga public-school transcript benchmark it against the broader Ontario / Canadian applicant pool, which is dominated by Toronto independent schools (UCC, UTS, Branksome) in the top tier. A 5 on AP Biology is one of the cleanest ways for a Turner Fenton or Lorne Park or Mayfield student to read on equal terms — AP scores are universally comparable across schools, while school grades carry context the adcom may not parse. Pair AP-5 with strong SAT IIs, USABO Open participation, or research, and the differentiation becomes meaningful.',
      },
      {
        question:
          'My child does the Ontario provincial curriculum at John Fraser — does AP Biology add real load on top of SBI4U?',
        answer:
          'Some, but less than parents fear. SBI4U content overlaps roughly 60% with AP Biology Units 4–6 (genetics, cell signalling, regulation, animal physiology). The genuine additional load is the FRQ-style writing, integration across units, and the timed full-length exam skill — not the biology content itself. We typically run two 90-minute 1:1 sessions a week against an Ontario SBI4U student, with focused FRQ work and unit-integration drills. Most students absorb the additional load with school grades held steady or improved.',
      },
      {
        question:
          'For a STEM applicant targeting US engineering or biological sciences, how should AP Biology pair with SAT II or other APs?',
        answer:
          'For a US STEM target — Cornell Engineering, Carnegie Mellon, UMich, UCLA, Berkeley, Georgia Tech — the strongest combo is AP Biology + AP Chemistry + AP Calculus BC + AP Physics, with SAT (or ACT) and at least one subject test if the applicant pool requires it. AP Biology alone is moderately useful; AP Bio + AP Chem together is a strong signal for bioengineering and biological-sciences programmes. We focus on AP-5 in biology; you will likely need a separate math/physics tutor to round out the STEM signal — happy to advise on referrals.',
      },
      {
        question:
          'My family in India wants to help pay — can grandparents or relatives transfer fees from an Indian bank account?',
        answer:
          'Yes, this is common for Brampton-Mississauga families. We accept INR bank transfer to HDFC / ICICI / SBI from relatives in India with no FX charged to you, and we provide a payment receipt in the student-parent name regardless of which family member initiates the transfer. We also accept CAD via Wise, Interac e-Transfer through a partner account on request, and USD on international Visa / Mastercard / Amex. The $1,800 senior-faculty package can be split across two or three transfers across both Canada and India at no extra charge.',
      },
      {
        question:
          'We are Canadian permanent residents — can my child use AP Biology to apply to NEET or Indian MBBS as a backup?',
        answer:
          'Honestly: no. AP Biology has zero recognition with India’s National Medical Commission, and NEET is the only pathway to Indian MBBS / BDS. Even more critical for Peel families: NEET admission for Indian medicine requires Indian citizenship or qualifying NRI / OCI seat eligibility, and most Canadian permanent residents and citizens do not qualify. AP Biology is purely a US and Canadian college application credential. If your family is genuinely exploring Indian medicine, that is a different conversation about citizenship status and NEET prep — and we will be straight with you about whether that path is realistic.',
      },
      {
        question:
          'Saturday-morning batch class versus weekday-evening 1:1 — which works better for a Peel high schooler?',
        answer:
          'It depends on the student. Saturday-morning small batch (4–6 students, 9 AM–noon ET) suits self-directed learners who benefit from peer comparison and parents managing tighter budgets — at USD $640 for 16 hours, it is the most cost-effective tier. Weekday-evening 1:1 (90-minute sessions, 7–9 PM ET, two per week) suits students who need pace calibration, struggle with FRQ writing, or are juggling multiple APs with tight homework windows. Many Brampton-Mississauga families start in small batch and graduate to 1:1 for the March–April rubric-tightening phase.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 20. SINGAPORE
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'singapore',
    cityName: 'Singapore',
    region: 'Singapore Island + Tanglin + Woodlands + Bukit Timah',
    timezone: 'SGT (Singapore)',
    timezoneIana: 'Asia/Singapore',
    addressRegion: 'Singapore',
    heroBlurb:
      'Singapore’s AP Biology market is concentrated around Singapore American School (SAS) in Woodlands — the anchor with one of the deepest AP cohorts in Asia — and Stamford American International School (SAIS), which publicly reports 62% of its AP students scoring 4 or 5. Feeder cohorts come from GEMS World Academy, Hwa Chong International, NPS International, and the IB-primary UWC and ISS clusters where ambitious students add AP Biology for US-college applications. Singapore’s South Asian, East Asian, and Western expat communities drive serious AP-5 demand from families targeting Ivy League, UC system, Johns Hopkins, and Duke. Live SGT evening classes (7–10 PM) fit SAS and SAIS schedules cleanly.',
    positioningBlurb:
      'Local Singapore AP tutoring runs S$50–150/hr (~US$40–110/hr) through agencies like SmileTutor, Tutor City, ChampionTutor, and a long tail of freelance NUS / NTU undergraduates with no biology specialism. Cerebrum is structurally different: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and the Indian small-batch coaching tradition (max 12) calibrated to retrieval practice and timed full-length mocks. SGT evening live classes (7–10 PM) slot cleanly into SAS, SAIS, and Hwa Chong International schedules. Senior-faculty 1:1 from US$1,800 for 12 hours — competitive once you compare like-for-like specialist depth.',
    schools: [
      'Singapore American School (SAS)',
      'Stamford American International School (SAIS)',
      'GEMS World Academy Singapore',
      'Hwa Chong International School',
      'NPS International School Singapore',
      'Anglo-Chinese School (Independent)',
      'Hwa Chong Institution',
      'Raffles Institution',
      'United World College of South East Asia (Dover)',
      'United World College of South East Asia (East)',
      'International Community School (ICS Singapore)',
      'Chatsworth International School',
      'Overseas Family School',
      'ISS International School',
      'Tanglin Trust School',
      'Dover Court International School',
    ],
    faqs: [
      {
        question:
          'My child is at Singapore American School — how do SGT evening live classes fit the SAS junior-year AP load?',
        answer:
          'SAS dismisses around 3:15 PM at the Woodlands campus, with most AP Biology students carrying 4–6 APs concurrently in junior year alongside athletics or service commitments running through 5:30–6:00 PM. We schedule 90-minute 1:1 sessions 7:00–10:00 PM SGT, two evenings per week, which sits between school commitments and the late homework block. The Saturday morning slot (9 AM–noon SGT) is also popular for full-length FRQ practice runs in March–April. All sessions are recorded for replay during exam-prep crunch.',
      },
      {
        question:
          'Stamford American reports 62% of AP students scoring 4 or 5 — what does external tutoring add on top of strong school teaching?',
        answer:
          'SAIS, like SAS, teaches AP Biology well at a class level, but the 38% who do not hit a 4 or 5 are usually losing points on FRQ writing — not on content. School AP teachers manage 20–25 students per class and cannot mark every FRQ to College Board rubric weekly. That is precisely the layer our 1:1 tutoring adds: same syllabus your school teaches, plus dedicated weekly rubric calibration, timed full-length mocks, and the FRQ writing skill that separates a school A from the AP-5 score.',
      },
      {
        question:
          'How does Cerebrum compare to local Singapore tutoring like SmileTutor, Tutor City, or freelance NUS undergraduates?',
        answer:
          'Three structural differences. First, faculty: AIIMS-trained biology faculty as your dedicated tutor for the year, not a rotating bench of NUS or NTU undergraduates with no biology specialism. Second, methodology: retrieval-heavy coaching with weekly written FRQ feedback against the College Board rubric, not generic platform tutoring. Third, value: senior-faculty 1:1 at US$1,800 for 12 hours works out to US$150/hr — comparable to the S$120–150/hr top end of local rates, but with senior faculty specialists rather than undergraduates at the lower S$50–80/hr tiers.',
      },
      {
        question:
          'My child is at UWC Dover and doing the IB Diploma — can we add AP Biology specifically for US applications?',
        answer:
          'Yes, and it is a recognised UWC pattern. UWC Dover and ISS are IB-primary, but ambitious students applying to top US universities sometimes add AP Biology as an external credential because the AP-5 reads as a clean US-curriculum signal that complements the IB transcript. We coach the full College Board syllabus end-to-end regardless of base curriculum. The challenge is workload — IB Diploma is already heavy — so we typically start in the IB1 summer (June–August) to front-load Campbell units before the IB2 year intensifies.',
      },
      {
        question:
          'Do you accept SGD bank transfer, or do payments need to be in USD on an international card?',
        answer:
          'Both work. We accept SGD via PayNow / DBS / OCBC / UOB bank transfer (no FX charged to you), and USD directly on international Visa / Mastercard / Amex. Several Singapore families split the US$1,800 senior-faculty package across two SGD transfers spaced 60 days apart at no extra charge. We do not currently integrate GrabPay or Atome BNPL for tuition fees. Invoices are issued in the currency of payment, and we can issue a GST-style invoice on request for corporate-reimbursement situations.',
      },
      {
        question:
          'My son is approaching National Service — can he sit AP Biology and still apply to US universities on the deferred-entry path?',
        answer:
          'Yes, and this is a common Singapore pattern for boys. Most US universities — including the Ivies, MIT, Stanford, and the UC system — accept applications during senior year with deferred enrolment after the two-year NS commitment. AP-5 in Biology sits on the transcript and remains valid through the NS deferral. We coach the AP Biology exam in junior or senior year before NS begins; the score does not expire. Several of our Singapore students have used this exact path to Cornell, Duke, and Berkeley.',
      },
      {
        question:
          'How do you coordinate with my child’s school AP Biology teacher at SAS or Hwa Chong International — do you ever conflict?',
        answer:
          'No — we deliberately complement, not duplicate. Our standard approach is to mirror the school’s pacing (Campbell Biology units 1–8 in the same sequence the school teacher uses), then layer the FRQ rubric calibration and timed-mock practice that schools cannot deliver at class size. We ask the parent for the school AP Bio syllabus and unit-test schedule in our first session so we are aligned. If a school teacher uses a non-Campbell text (rare), we adapt; the College Board exam itself is what we anchor to.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 21. HONG KONG
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'hong-kong',
    cityName: 'Hong Kong',
    region: 'Hong Kong Island + Kowloon + Sai Kung + New Territories',
    timezone: 'HKT (Hong Kong)',
    timezoneIana: 'Asia/Hong_Kong',
    addressRegion: 'Hong Kong',
    heroBlurb:
      'Hong Kong International School (HKIS) is the anchor of AP Biology demand in the region — HKIS publicly reports 95% of AP candidates scoring 3 or higher and 82% scoring 4 or 5, making it one of the strongest AP cohorts in Asia. Feeder demand also comes from Canadian International School of Hong Kong (CDNIS) and the IB-primary cluster (CIS, ESF schools, RCHK, ISF Academy) where students add AP Biology for US-college applications. Hong Kong’s deep expat and local academic communities drive serious AP-5 demand from families dual-applying to HKU, CUHK, and US universities — particularly Ivy League, UC system, and Johns Hopkins.',
    positioningBlurb:
      'Hong Kong AP tutoring agencies — ITS Education Asia, ++tutors, TutorChase, Aegis Advisors, and the long tail of independent tutors — charge HKD 470–1,000+/hr (~US$60–130/hr) for mostly graduate-level tutors with limited biology specialism. Cerebrum is biology-only: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and the Indian small-batch coaching tradition (max 12) calibrated to retrieval practice. HKT evening live classes (7–10 PM) slot cleanly into HKIS, CDNIS, and CIS schedules. Senior-faculty 1:1 from US$1,800 for 12 hours — competitive once you compare like-for-like specialist depth.',
    schools: [
      'Hong Kong International School (HKIS)',
      'Chinese International School (CIS)',
      'Canadian International School of Hong Kong (CDNIS)',
      'Hong Kong Academy',
      'Yew Chung International School Hong Kong',
      'German Swiss International School',
      'Carmel School',
      'Diocesan Boys’ School (DBS)',
      'King George V School (ESF)',
      'Independent Schools Foundation Academy (ISF Academy)',
      'Discovery College',
      'Renaissance College Hong Kong (RCHK)',
      'French International School (FIS)',
      'Australian International School Hong Kong (AISHK)',
      'Po Leung Kuk Choi Kai Yau School (PLK CKY)',
    ],
    faqs: [
      {
        question:
          'HKIS reports 95% of AP candidates scoring 3+ and 82% scoring 4–5 — what does external tutoring add for a HKIS student?',
        answer:
          'Those are excellent class-level numbers, but the 18% who land at 3 rather than 4 or 5 are usually losing points on FRQ writing and timed-exam composure — not on content knowledge. HKIS AP Biology teachers run sections of 20–25 students and cannot mark every FRQ attempt to College Board rubric weekly. Our 1:1 layer fills exactly that: same Campbell-aligned syllabus HKIS teaches, plus dedicated weekly rubric calibration, timed full-length mocks, and the FRQ writing skill that converts a strong 3 into a clean 5.',
      },
      {
        question:
          'How does Cerebrum compare to TutorChase, ++tutors, or Aegis Advisors in Hong Kong on price and quality?',
        answer:
          'Local HK agencies charge HKD 470–1,000+/hr (~US$60–130/hr) for mostly graduate or recent-graduate tutors with no biology specialism. Senior-faculty 1:1 with us is US$1,800 for 12 hours — about US$150/hr — but you are getting AIIMS-trained biology faculty as your dedicated tutor for the year, weekly written FRQ feedback against the College Board rubric, and continuity across the full AP cycle. At the HKD 800–1,000/hr tier you would be paying for a tutor still building biology depth; at our rate you get a published specialist.',
      },
      {
        question:
          'My child is at CIS or CDNIS doing the IB Diploma — can we add AP Biology specifically for US applications?',
        answer:
          'Yes, and this is a common pattern at CIS, CDNIS, and the ESF schools, where the base curriculum is IB Diploma but ambitious students add AP Biology for US-college applications. The AP-5 reads as a clean US-curriculum signal that complements an IB Higher-Level Biology transcript. We coach the full College Board AP syllabus end-to-end, regardless of base curriculum. Workload is the real constraint — IB is already heavy — so we typically start in the IB1 summer to front-load Campbell content before the IB2 year intensifies.',
      },
      {
        question:
          'HKT evening live classes — how do they fit a HKIS or CDNIS student’s after-school commitments?',
        answer:
          'HKIS dismisses around 3:15 PM at the Repulse Bay campus; CDNIS around 3:00 PM in Aberdeen. Most AP Biology students carry sport, music, or service commitments through 5:30–6:30 PM. We schedule 90-minute 1:1 sessions 7:00–10:00 PM HKT, two evenings per week, which sits between school commitments and the late homework block. Saturday morning sessions (9 AM–noon HKT) are also popular for full-length FRQ practice runs in March–April. All sessions are recorded so students can replay them during exam-prep crunch.',
      },
      {
        question:
          'My family travels to mainland China during summer break — can we continue AP Biology classes from Beijing or Shanghai?',
        answer:
          'Yes, with one practical note. Sessions are 100% live video on Zoom or Google Meet, so as long as your child has a laptop and reliable Wi-Fi we keep going from anywhere — Beijing, Shanghai, Shenzhen, Hangzhou, or family homes elsewhere in the region. The practical caveat is the Great Firewall: Zoom usually works in mainland China but can be unreliable, so we recommend a stable VPN setup before travel. We have run successful summer sessions for HK families travelling to mainland cities for July–August every year.',
      },
      {
        question:
          'Do you accept HKD bank transfer, or do payments need to be in USD on an international card?',
        answer:
          'Both work. We accept HKD via HSBC / Hang Seng / Bank of China (HK) wire transfer (no FX charged to you), and USD directly on international Visa / Mastercard / Amex. Several Hong Kong families split the US$1,800 senior-faculty package across two HKD transfers spaced 60 days apart at no extra charge. We do not currently integrate FPS for tuition fees but can on request through a partner account. Invoices are issued in the currency of payment for corporate-reimbursement or tax-record use.',
      },
      {
        question:
          'My child is at a local school like Diocesan Boys’ or PLK CKY — can AP Biology realistically work alongside HKDSE?',
        answer:
          'Yes, and we have coached this pattern. Local Hong Kong schools follow HKDSE as the primary curriculum, with AP Biology added by a smaller subset of students specifically aiming at US universities. The content overlap between HKDSE Biology and AP Biology is roughly 55–65%, but the FRQ-style writing and integrated MCQ format are genuinely different from HKDSE. We typically start in the year before the AP exam with two 90-minute 1:1 sessions per week, holding HKDSE prep continuous. The AP-5 reads strongly to US adcoms benchmarking a local-school transcript.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 24a. SHANGHAI — mainland China AP Biology demand, international school cohort
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'shanghai',
    cityName: 'Shanghai',
    region: "Pudong + Puxi + Jing'an + Xuhui + Hongqiao + Minhang",
    timezone: 'CST (China)',
    timezoneIana: 'Asia/Shanghai',
    addressRegion: 'Shanghai',
    heroBlurb:
      "Shanghai American School (SAS) Pudong and Puxi twin campuses are the anchor of AP Biology demand in mainland China — SAS has been authorised as an AP Capstone school (first in Asia) and runs one of the deepest AP cohorts on the continent. Shanghai High School International Division (SHSID) runs a full AP programme with strong public reporting, and WLSA Shanghai, Concordia International School, Dulwich Shanghai (Pudong + Puxi), Yew Chung International School Shanghai (YCIS), Wellington College Shanghai, Western International School of Shanghai (WISS), and Shanghai Community International School (SCIS) all carry AP tracks for US-bound students. Despite mainland China's curriculum shift toward A-Level and IB, the Hurun 2025 ranking confirms 63% of mainland ranked international schools still offer AP — AP-5 in Biology remains the cleanest US-curriculum signal for Ivy League, UC system, Johns Hopkins, Duke, and Cornell admissions.",
    positioningBlurb:
      'Shanghai AP tutoring market is fragmented across local Chinese-language agencies (Hanlin International Education 翰林国际教育, TestDaily, 渊学通) and Western-style premium tutoring (other international tutoring agencies, ITS Shanghai, individual SAS / SHSID alumni). Local rates run CNY 500–1,500/hr (US$70–210/hr); Crimson and Western agencies run US$250–500/hr for senior tutors with mixed biology specialism. Cerebrum is structurally different: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, biology-only specialisation, and Indian small-batch coaching tradition (max 12) calibrated to retrieval practice. CST evening live classes (7–10 PM Shanghai time) slot cleanly into SAS, SHSID, and WLSA schedules. Senior-faculty 1:1 from US$1,800 for 12 hours — undercuts Crimson and matches the local CNY 1,000+/hr tier with materially deeper biology pedagogy.',
    schools: [
      'Shanghai American School (SAS) Pudong',
      'Shanghai American School (SAS) Puxi',
      'Shanghai High School International Division (SHSID)',
      'WLSA Shanghai',
      'Dulwich College Shanghai (Pudong)',
      'Dulwich College Shanghai (Puxi)',
      'Concordia International School Shanghai',
      'Yew Chung International School Shanghai (YCIS)',
      'Wellington College International Shanghai',
      'Western International School of Shanghai (WISS)',
      'Shanghai Community International School (SCIS) Hongqiao',
      'Shanghai Community International School (SCIS) Pudong',
      'British International School Shanghai (BISS) Puxi',
      'British International School Shanghai (BISS) Pudong',
      'NAIS Pudong',
      'Shanghai SMIC Private School (SMIC)',
    ],
    faqs: [
      {
        question:
          'My child is at SAS Pudong or Puxi — how does Cerebrum complement the SAS AP Capstone programme?',
        answer:
          'SAS was the first AP Capstone school in Asia and runs AP Biology at a deep level — but class sizes of 18–24 students mean no school teacher can mark every FRQ to College Board rubric weekly. We layer biology-specialist 1:1 tutoring on top: same Campbell-aligned content the SAS teacher uses, plus dedicated weekly FRQ rubric calibration and timed full-length mocks. 90-minute 1:1 sessions twice a week in CST evenings (7–10 PM Shanghai) sit between school dismissal (around 3:15 PM) and the late homework block. The AP-5 conversion rate at SAS is already strong; we work specifically with the 15–25% of SAS students who score 3 or 4 and want a clean 5.',
      },
      {
        question:
          'Did mainland China kill AP after the 2022 public testing centre restrictions? Is the AP path still viable for Shanghai students?',
        answer:
          "AP is shrinking in mainland China but is not dead. The 2022 College Board restriction limited public AP test centres for 'social examinees' (independent test-takers), so AP exams are now sit-only for enrolled international-school students. This concentrated AP demand at the schools that still anchor it — SAS, SHSID, Dulwich, Concordia, WLSA — but did NOT eliminate AP. Hurun 2025 ranking confirms 63% of mainland ranked international schools still offer AP courses. For US-college-bound Shanghai students at AP-authorised schools, AP-5 in Biology remains the cleanest curriculum signal to top US universities. The shift toward A-Level / IB is real but decelerating, not accelerating.",
      },
      {
        question:
          "CST evening live classes — how do they fit a SAS or SHSID student's after-school schedule, and does Zoom work reliably in mainland China?",
        answer:
          'SAS dismisses around 3:15 PM at both Pudong and Puxi campuses; SHSID around 3:30 PM. Most AP Biology students carry 4–6 APs concurrently in junior year plus sport / music / service commitments through 5:30–6:30 PM. We schedule 90-minute 1:1 sessions 7:00–10:00 PM CST (Shanghai time), two evenings per week, with Saturday morning slots (9 AM–noon CST) popular for full-length FRQ practice runs in March–April. On Zoom reliability — Zoom usually works in mainland China but can throttle on residential ISPs. We recommend international-school students use the school VPN (most international schools provide one) or a stable family VPN; SAS and Dulwich Wi-Fi networks are reliable for evening sessions. We have run successful year-long Shanghai cohorts since 2023.',
      },
      {
        question:
          'How does Cerebrum compare to other international tutoring agencies, Hanlin International Education, TestDaily, or ITS Shanghai on price and quality?',
        answer:
          'other international tutoring agencies in Shanghai charges US$250–500/hr for senior tutors with broad academic backgrounds but mixed biology specialism. Local Chinese-language agencies (Hanlin 翰林, TestDaily, 渊学通) charge CNY 500–1,500/hr (US$70–210/hr) for tutors fluent in Mandarin and Chinese-Western curriculum bridge but again with mixed biology depth. Western agencies like ITS Shanghai run mid-range US$120–250/hr. Cerebrum is biology-only specialist: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly FRQ rubric calibration, and continuity across the full AP cycle. Senior-faculty 1:1 at US$1,800 for 12 hours works out to US$150/hr — undercuts Crimson significantly and matches the local CNY 1,000+/hr tier with materially deeper biology pedagogy.',
      },
      {
        question: 'Can we pay in CNY via Alipay / WeChat Pay, or do payments need to be in USD?',
        answer:
          'Both work. CNY payment via cross-border Alipay or WeChat Pay (single-payment cap USD 5,000, annual USD 50,000 per the 2025 PBOC rules) processed through our Stripe integration — settles in USD on our end at no FX charge to you. USD directly on international Visa / Mastercard / Amex also works. Several Shanghai families split the US$1,800 senior-faculty package across two CNY transfers spaced 60 days apart at no extra charge. We do not currently accept direct UnionPay (Cerebrum has no Chinese entity), but Alipay cross-border covers most family payment preferences.',
      },
      {
        question:
          'My child is at an IB-primary school like Dulwich or Concordia but wants to add AP Biology specifically for US applications — is this realistic?',
        answer:
          'Yes, and this is a recognised Shanghai pattern at Dulwich Shanghai, Concordia, SCIS, and the BISS schools where the base curriculum is IB but ambitious students add AP Biology as a separate US-curriculum credential. The AP-5 reads as a clean signal that complements an IB HL Biology transcript. We coach the full College Board AP syllabus end-to-end regardless of base curriculum. The constraint is workload — IB is already heavy — so we typically start in the IB1 summer (June–August Shanghai break) to front-load Campbell units before the IB2 year intensifies. SAS Capstone students sometimes also take the AP Capstone Seminar + Research alongside AP Bio, which we coordinate with school schedules.',
      },
      {
        question:
          'Is there a meaningful AP Biology to USABO / IBO China pipeline that Cerebrum can support?',
        answer:
          'Yes, particularly for Shanghai students. China dominates the International Biology Olympiad (IBO) — typically 4 gold medals per year — but the path runs through CNBO (Chinese National Biology Olympiad), not USABO. SAS and a few other international schools run small USABO cohorts for US-track students, but the bigger Shanghai opportunity is the CNBO funnel (provincial → national → IBO China team). For students at SAS / SHSID / WLSA who are equally strong in AP Biology and curious about olympiad-level depth, we offer a combined track: AP Biology weekly core sessions + monthly olympiad-extension modules covering Campbell + Lehninger + research-paper analysis. Students targeting both an AP-5 and a CNBO provincial qualification typically work with us from the start of junior year through the following spring.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 24b. BEIJING — mainland China AP Biology, Shunyi international-school cluster
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'beijing',
    cityName: 'Beijing',
    region: 'Shunyi + Chaoyang + Haidian + Lido + CBD',
    timezone: 'CST (China)',
    timezoneIana: 'Asia/Shanghai',
    addressRegion: 'Beijing',
    heroBlurb:
      "Beijing's AP Biology demand is anchored in Shunyi district's international school cluster — International School of Beijing (ISB) runs a full IB + AP dual-curriculum senior school, Western Academy of Beijing (WAB) is IB Continuum but a meaningful subset of students add AP Biology for US applications, and Dulwich College Beijing, Yew Chung International School Beijing (YCIS), Keystone Academy, Beijing City International School (BCIS), and Harrow International School Beijing all carry AP tracks. Chaoyang District (CBD) and Haidian district add demand from Chinese-passport students at private bilingual schools applying to US universities. Per the 2025 HSBC Hurun ranking, 63% of mainland China's ranked international schools still offer AP — AP-5 in Biology remains the cleanest US-curriculum signal for Ivy League, Stanford, UC system, Johns Hopkins, and Duke admissions despite the broader market shift toward A-Level and IB.",
    positioningBlurb:
      'Beijing AP tutoring market is fragmented across local Chinese-language agencies (Hanlin International Education 翰林国际教育, TestDaily, 渊学通, 国际教育优选), Western premium tutoring (other international tutoring agencies, ITS Beijing, individual ISB / WAB alumni), and freelance international-school teachers. Local rates run CNY 500–1,500/hr (US$70–210/hr); Crimson and Western agencies run US$250–500/hr for senior tutors with mixed biology specialism. Cerebrum is structurally different: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, biology-only specialisation, and Indian small-batch coaching tradition (max 12) calibrated to retrieval practice. CST evening live classes (7–10 PM Beijing time) slot cleanly into ISB and WAB schedules. Senior-faculty 1:1 from US$1,800 for 12 hours — undercuts Crimson and matches the local CNY 1,000+/hr tier with materially deeper biology pedagogy.',
    schools: [
      'International School of Beijing (ISB)',
      'Western Academy of Beijing (WAB)',
      'Dulwich College Beijing',
      'Yew Chung International School Beijing (YCIS)',
      'Keystone Academy',
      'Beijing City International School (BCIS)',
      'Harrow International School Beijing',
      'Daystar Academy',
      'Yew Wah International Education School Beijing',
      'Pakistan Embassy College Beijing',
      'Beijing International Bilingual Academy (BIBA)',
      'Tsinghua University High School International Department',
      'Beijing No.4 High School International Campus',
      'British School of Beijing',
      'Canadian International School of Beijing',
    ],
    faqs: [
      {
        question:
          'My child is at ISB Shunyi — how does Cerebrum complement the dual IB + AP senior school programme?',
        answer:
          'ISB runs both IB DP and AP in parallel for senior school, so families have curriculum choice rare in mainland China. For AP Biology students at ISB, class sizes of 15–22 students mean no school teacher can mark every FRQ to College Board rubric weekly. We layer biology-specialist 1:1 tutoring on top: same Campbell-aligned content the ISB teacher uses, plus dedicated weekly FRQ rubric calibration and timed full-length mocks through April. 90-minute 1:1 sessions twice a week in CST evenings (7–10 PM Beijing) sit between school dismissal (around 3:30 PM) and the late homework block.',
      },
      {
        question:
          'My child is at WAB and applying primarily to US universities — should they add AP Biology on top of IB DP?',
        answer:
          'WAB is an IB Continuum School — IB DP is the primary senior curriculum. Some WAB students applying to US universities add AP Biology as a secondary US-curriculum signal (the AP-5 reads cleanly to US adcoms benchmarking an IB transcript). This is workload-intensive — IB Diploma is already heavy — so we typically start AP Bio coaching in the IB1 summer (June–August Beijing break) to front-load Campbell units before the IB2 year intensifies. About 15–25% of US-applying WAB students take this combined IB HL + AP Biology route; the rest rely on IB HL alone with strong SAT/ACT.',
      },
      {
        question: 'How does Zoom work from Shunyi, and is VPN needed for evening sessions?',
        answer:
          'Zoom usually works in mainland China but can throttle on residential ISPs during peak hours (7–10 PM CST). ISB and WAB both provide school VPNs to enrolled families — most of our Beijing students use the school VPN for evening Cerebrum sessions and report consistent video quality. Family VPNs (Astrill, ExpressVPN, NordVPN) also work reliably in Shunyi and Chaoyang. We have run year-long Beijing cohorts since 2023 with very few connectivity issues; for rare disruption, we provide recorded sessions within 24 hours.',
      },
      {
        question:
          'How does Cerebrum compare to other international tutoring agencies, Hanlin International Education, or local ISB / WAB alumni tutors?',
        answer:
          'other international tutoring agencies in Beijing charges US$250–500/hr for senior tutors with broad academic backgrounds but mixed biology specialism. Local Chinese-language agencies (Hanlin 翰林, TestDaily, 渊学通) charge CNY 500–1,500/hr (US$70–210/hr) for Mandarin-medium tutors with strong Chinese-Western curriculum bridge but mixed biology depth. ISB / WAB alumni tutors charge CNY 300–800/hr with variable expertise. Cerebrum is biology-only specialist: AIIMS-trained biology faculty as your dedicated year-long tutor, weekly FRQ rubric calibration, and continuity across the full AP cycle. Senior-faculty 1:1 at US$1,800 for 12 hours = US$150/hr — undercuts Crimson and matches the local CNY 1,000+/hr tier with materially deeper biology pedagogy.',
      },
      {
        question: 'Can we pay in CNY via Alipay or WeChat Pay?',
        answer:
          'Yes. CNY payment via cross-border Alipay or WeChat Pay (single-payment cap USD 5,000, annual USD 50,000 per 2025 PBOC rules) processed through our Stripe integration — settles in USD on our end at no FX charge to you. USD on international Visa / Mastercard / Amex also works. Several Beijing families split the US$1,800 senior-faculty package across two CNY transfers spaced 60 days apart at no extra charge. We do not currently accept direct UnionPay (Cerebrum has no Chinese entity), but Alipay cross-border covers most family payment preferences.',
      },
      {
        question:
          'My child is at a Chinese-passport private bilingual school in Haidian or Chaoyang — can they realistically pursue AP Biology?',
        answer:
          'Yes. A meaningful number of Chinese-passport students at private bilingual schools (Tsinghua University High School International Department, Beijing No.4 High School International Campus, Daystar Academy, BIBA) prepare for AP Biology alongside their primary Gaokao / A-Level / IB track for US-university applications. Workload is challenging — the school primary curriculum is intense — so we typically structure AP Bio coaching as a focused 6–9 month sprint in the year before the May AP exam, with reduced summer load. AP-5 reads cleanly to US adcoms benchmarking a non-US-curriculum transcript.',
      },
      {
        question: 'When should a Beijing student start AP Biology tutoring for a Level 5 target?',
        answer:
          'For a serious AP-5 target, August or September of the AP course year (junior year for most US-track students) is ideal. That lets us calibrate to school pacing from the start, layer Campbell Units 1–8 alongside the school sequence, and have 8 months for FRQ rubric drilling and timed full-length mocks through April. Late starters (January AP-year) can still target AP-5 but with intensive 90-minute sessions twice weekly through the May exam window. For students adding AP Bio to a Gaokao / IB / A-Level primary track, we recommend starting earlier in summer to front-load.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 25. GHAZIABAD (sub-metro of Delhi NCR — east NCR AP Bio demand)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'ghaziabad',
    cityName: 'Ghaziabad',
    region: 'Ghaziabad + Indirapuram + Vaishali + Vasundhara + Crossings Republik',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    addressRegion: 'Uttar Pradesh',
    heroBlurb:
      "Ghaziabad's AP Biology demand sits in the Indirapuram-Vaishali-Vasundhara residential belt — the east NCR cluster that draws from professional households commuting to Noida, Anand Vihar, and central Delhi. The international-school cluster (Seth Anandram Jaipuria Vasundhara, Cambridge School Indirapuram, DPS Indirapuram, KR Mangalam Vaishali, Amity Vasundhara, GD Goenka Vasundhara) layers AP Biology onto IBDP or CBSE Class 12 tracks for the US-application subset. The cohort is follows a different architecture from Noida (less tech-corridor) or Gurgaon (less affluent-international); the Ghaziabad family profile leans toward CBSE-rooted dual-application planning with AP as a US-admissions enhancer.",
    positioningBlurb:
      'Ghaziabad is meaningfully under-served for AP Biology tutoring relative to its growing international-curriculum cohort — most generalist test-prep agencies (Jamboree, The Princeton Review, Karan Gupta, Manya) operate out of Delhi-side branches and require a 30-60 minute commute through Anand Vihar traffic. Cerebrum is biology-only AIIMS-trained biology faculty delivering 100% online live video sessions — your child opens a laptop in Indirapuram, Vaishali, or Vasundhara at 6 PM and finishes by 7:30 with no commute. The optional in-person consultations at South Extension are 45-60 minutes via the FNG Expressway or the new Mayur Vihar - Anand Vihar metro corridor. Senior-faculty 1:1 from $1,800 for 12 hours ($150/hr).',
    schools: [
      'Seth Anandram Jaipuria School Vasundhara',
      'Cambridge School Indirapuram',
      'Delhi Public School Indirapuram',
      'KR Mangalam World School Vaishali',
      'Amity International School Vasundhara',
      'GD Goenka Public School Vasundhara',
      'Sapphire International School',
      'Ahlcon International School',
      'DAV Public School Ghaziabad',
      "St. Mary's School",
      'Khaitan Public School Vaishali',
      'Uttam School for Girls',
      'Salwan Public School',
      'Presidium Vaishali',
    ],
    faqs: [
      {
        question:
          'Seth Anandram Jaipuria and Cambridge School Indirapuram have international-curriculum tracks — when is external AP Biology tutoring useful?',
        answer:
          'In-school AP Biology classes at the strong international-track schools are typically solid for concept coverage. External tutoring is high-leverage for three things the school class does not have bandwidth to do at depth: (1) FRQ rubric mastery with weekly written feedback against the College Board rubric, (2) timed full-length mock exams in the 6 weeks before the May AP, and (3) personalised remediation when a student hits a specific topic wall (biochem energetics, signal transduction, population genetics). If your child is comfortably running AP-4 on internal school assessments, school is enough. If they are targeting AP-5 specifically, external 1:1 is high-leverage.',
      },
      {
        question:
          'My child is at DPS Indirapuram doing CBSE Class 12, preparing for NEET, AND wants US college options. Can AP Biology realistically fit?',
        answer:
          'This dual-application profile is common in our Ghaziabad roster. The honest assessment: it is hard but doable if you start early (Class 11 summer). CBSE 12 + NEET prep is itself a 60-hour-per-week load; layering AP Biology adds another 4-6 hours per week of focused work. The conceptual overlap with NEET helps — cell biology, genetics, physiology, ecology cover much of the AP syllabus — but FRQ format and US-style data interpretation require dedicated practice. We typically run two 90-minute IST evening sessions for these students, calibrated to keep NEET prep as the primary track and AP as the secondary US-application layer.',
      },
      {
        question:
          'Ghaziabad to South Extension is 45-60 minutes via FNG Expressway or Anand Vihar - does that affect tutoring?',
        answer:
          'Not for online classes — which is the entire delivery model. Your child opens a laptop in Indirapuram, Vaishali, Vasundhara, Kaushambi, or Crossings Republik at 6 PM, finishes at 7:30, and the Ghaziabad-to-Delhi traffic at that hour is irrelevant. The only time commute matters is for the optional in-person consultations at South Extension; those we schedule on weekends or off-peak windows by appointment. Ghaziabad families consistently tell us removing the daily Delhi-side commute is the biggest practical benefit.',
      },
      {
        question:
          'Cambridge School Indirapuram is Cambridge-focused (IGCSE / A-Level). Does AP Biology work alongside Cambridge A-Level Biology?',
        answer:
          'Yes — and the combination is meaningful for US-targeted applicants. Cambridge A-Level Biology and AP Biology have ~70% content overlap, but the assessment formats are genuinely different. A-Level is essay-style with long-form questions; AP combines MCQ + FRQ in a tighter time budget. We coach the AP-specific format alongside the A-Level coursework — most students need 4-6 hours per week of AP-specific work in the year before the May AP exam.',
      },
      {
        question:
          'Will AP Biology give my child credit toward an Indian MBBS, BDS, or BSc programme?',
        answer:
          'No. AP Biology is a College Board exam designed for US college admissions and has no recognition under the NMC, Indian universities, or the NEET admissions process. A 4 or 5 transfers to many US universities as 6 to 8 credit hours of general biology, but Indian higher education awards it zero standing. For Ghaziabad families weighing dual abroad-and-India applications, AP Biology should be treated as an enhancer for the US side of the application portfolio only — NEET is the only pathway that opens MBBS / BDS / BSc admissions in India.',
      },
      {
        question:
          'How do we pay — INR transfer or USD card? GST invoice for corporate reimbursement available?',
        answer:
          'Both currencies and yes on the invoice. INR transfer to HDFC / ICICI / SBI / Axis is the most common (no FX charged to you), UPI works for smaller installments, international Visa / Mastercard / Amex in USD, and Wise transfers. Several Ghaziabad MNC-employee families split the $1,800 senior-faculty package across two or three INR transfers at no extra charge. GST-compliant invoices issued for corporate-reimbursement claims.',
      },
      {
        question:
          'My child is at Amity Vasundhara doing IBDP — when should we start AP Biology prep?',
        answer:
          "For students continuing on IBDP at senior school, AP Biology as a parallel layer typically starts in Year 12 (the year the AP exam is taken in May). For students transitioning between curricula at the Grade 10-11 boundary, AP can layer onto IBDP, CBSE Class 11-12, or Cambridge A-Level. The earlier-start advantage (Year 11) is most useful for students aiming at top-tier US universities. We run an AP Biology prep diagnostic to recommend the right start point — book a free consultation and we'll calibrate to your child's specific trajectory.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 24. FARIDABAD (sub-metro of Delhi NCR — industrial-base AP Bio demand)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'faridabad',
    cityName: 'Faridabad',
    region: 'Faridabad + Greater Faridabad + NIT Faridabad + Sectors 14 / 15 / 17 / 19 / 80',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    addressRegion: 'Haryana',
    heroBlurb:
      "Faridabad's AP Biology demand is shaped by its industrial-base demographics — a meaningful share of MNC engineering and management families, multi-generational business households, and the Greater Faridabad / NIT Faridabad professional cohort. The international-school cluster (Manav Rachna International, DPS Faridabad, Shri Ram Faridabad, Apeejay Faridabad, Modern DPS, Ryan International) layers AP Biology onto IBDP or CBSE Class 12 tracks for the US-application subset of families. Faridabad sits closer to South Delhi than to central Gurgaon or Noida, which gives our South Extension hub a useful proximity advantage for the optional in-person consultations.",
    positioningBlurb:
      'Faridabad is structurally a different AP tutoring market from Gurgaon and Noida — older, more industrial, more price-sensitive than the Gurgaon DLF cluster, less methodology-conscious than the Noida tech cohort. Generalist test-prep agencies (Jamboree, The Princeton Review, Karan Gupta, Manya, Edu-Mentor — most operating from Delhi-side branches rather than Faridabad itself) bundle AP Biology into SAT / Common-App stacks tutored by rotating non-specialist staff. Cerebrum is structurally different: biology-only AIIMS-trained biology faculty as your dedicated year-long tutor, written FRQ feedback against the College Board rubric every week, IST evening live classes, and the option of in-person consultations at our South Extension hub (35-45 minutes from Faridabad via the new Faridabad-Noida-Ghaziabad Expressway off-peak). Our senior-faculty 1:1 starts at $1,800 (12 hours) ($150/hr).',
    schools: [
      'Manav Rachna International School',
      'Delhi Public School Faridabad',
      'The Shri Ram School Faridabad',
      'Apeejay School Faridabad',
      'Modern Delhi Public School',
      'Ryan International School Faridabad',
      'DAV Public School',
      'Vidya Mandir Public School',
      'Eicher School',
      'Faridabad Public School',
      'Mount Carmel School',
      "St. Anthony's School",
      'Greenfield Public School',
    ],
    faqs: [
      {
        question:
          'Manav Rachna and DPS Faridabad have in-school AP Biology — when is external tutoring useful, and when is it overkill?',
        answer:
          "In-school AP Biology classes at the strong international schools are typically solid for concept coverage. External tutoring is high-leverage for three things the school class doesn't have bandwidth to do at depth: (1) FRQ rubric mastery with weekly written feedback against the College Board rubric, (2) timed full-length mock exams in the 6 weeks before the May AP, and (3) personalised remediation when a student hits a specific topic wall (typically biochem energetics, signal transduction, or population genetics). If your child is comfortably running AP-4 on internal school assessments, school is enough. If they're targeting AP-5 specifically or struggling on a topic, external 1:1 is high-leverage.",
      },
      {
        question:
          'My child is at Shri Ram School Faridabad and considering AP Biology alongside IBDP — does that combination work for US college applications?',
        answer:
          'For US-targeted applicants, yes — AP Biology layered on top of IB Biology HL is a meaningful application signal. US admissions officers read thousands of IB transcripts but parse AP scores as the canonical US-curriculum benchmark, so a Shri Ram Faridabad IBDP-HL student who also scores AP-5 reads as both globally rigorous and US-curriculum literate. The trade-off is workload during IA / EE crunch (November-February in Year 12). For pure UK / Europe / Australia / Canada applicants, IB alone is sufficient — AP adds little.',
      },
      {
        question:
          'My child is at DPS Faridabad doing CBSE 12, preparing for NEET, AND wants US college options. Can AP Biology realistically fit?',
        answer:
          'This dual-application profile is common in our Faridabad roster. The honest assessment: it is hard but doable if you start early (Class 11 summer). CBSE 12 + NEET prep is itself a 60-hour-per-week load; layering AP Biology adds another 4-6 hours per week of focused work. The conceptual overlap with NEET helps — cell biology, genetics, physiology, ecology cover much of the AP syllabus — but FRQ format and US-style data interpretation require dedicated practice. We typically run two 90-minute IST evening sessions for these students, calibrated to keep NEET prep as the primary track and AP as the secondary US-application layer.',
      },
      {
        question:
          'Faridabad to South Extension is 35-45 minutes off-peak via the new Faridabad-Noida-Ghaziabad Expressway — does that affect tutoring?',
        answer:
          'Not for online classes — which is the entire delivery model. Your child opens a laptop in Sector 14/15/17/19/80 or Greater Faridabad at 6 PM, finishes at 7:30, and the Faridabad-to-Delhi traffic at that hour is irrelevant. The only time commute matters is for the optional in-person consultations at South Extension; those are 35-45 minutes off-peak via the FNG Expressway, scheduled on weekends or off-peak windows by appointment. Faridabad families consistently use the online-delivery model for weekly sessions and reserve the in-person option for 1-2 progress-review touchpoints per year.',
      },
      {
        question:
          'Will AP Biology give my child credit toward an Indian MBBS, BDS, or BSc programme?',
        answer:
          'No. AP Biology is not recognised by the National Medical Commission (NMC), by Indian universities, or by the NEET admissions framework — it is a US-curriculum exam delivered by the College Board, intended for US college applications. A score of 4 or 5 typically earns 6 to 8 credit hours at US universities, but it cannot substitute for or supplement NEET-based MBBS, BDS, or BSc admissions in India. Faridabad families pursuing the dual-track abroad-plus-India path should keep these clearly separate: AP for the US application, NEET for the Indian medical college route.',
      },
      {
        question:
          'How do we pay — INR transfer or USD card? GST invoice for Faridabad MNC employer reimbursement available?',
        answer:
          'Both currencies and yes on the invoice. INR transfer to HDFC / ICICI / SBI / Axis is the most common (no FX charged to you), UPI works for smaller installments, international Visa / Mastercard / Amex in USD, and Wise transfers. Several Faridabad business-family and MNC-employee families split the $1,800 senior-faculty package across two or three INR transfers at no extra charge. GST-compliant invoices are issued for corporate-reimbursement claims — common for MNC-employee families and family-business households claiming education-related expenses.',
      },
      {
        question:
          'My child is at Manav Rachna International doing IGCSE or IBDP — when should we start AP Biology prep?',
        answer:
          "For students continuing on Cambridge A-Levels at senior school, AP Biology as a parallel layer typically starts in Year 12 (the year the AP exam is taken in May). For students transitioning from Cambridge IGCSE to IBDP or CBSE Class 11-12 at senior school, AP can layer onto either track. The earlier-start advantage (starting in Year 11) is most useful for students aiming at top-tier US universities where AP-5 + a strong school transcript together signal preparedness. We run an AP Biology prep diagnostic to recommend the right start point — book a free consultation and we'll calibrate to your child's specific trajectory.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 23. NOIDA (sub-metro of Delhi NCR — IT-corridor AP Bio demand)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'noida',
    cityName: 'Noida',
    region: 'Noida + Greater Noida + Sectors 18 / 62 / 132 / 50 / 93 / 128',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    addressRegion: 'Uttar Pradesh',
    heroBlurb:
      "Noida's AP Biology demand is shaped by its IT-corridor demographics — tech-employee households at Sector 18 / 62 / 132 / 128, Sector 50 and 93 residential clusters, and the Greater Noida international-school belt (Pathways Noida, Shiv Nadar School, Step by Step, Genesis Global, Lotus Valley, GD Goenka Public, Amity International Sector 44). The typical Noida student in our AP programme is an IBDP or Cambridge IGCSE+A-Level student layering AP Biology for US college applications, or a CBSE Class 12 student dual-applying to Indian universities and US colleges. The IT-family parent profile is unusually methodology-literate — vendor-SLA-style scrutiny is common, and we have built our coaching delivery to match that expectation.",
    positioningBlurb:
      "Noida is structurally a different AP tutoring market from Gurugram and Delhi — denser tech-employee demographics, more price-sensitive than the Gurgaon Aravali / DLF cohort, more methodology-conscious than the central-Delhi old-money cohort. Generalist test-prep agencies (Jamboree Noida Sec 18, The Princeton Review Sector 18, Karan Gupta, Manya, Edu-Mentor, Genesis Test Prep) bundle AP Biology into SAT / Common-App stacks tutored by rotating non-specialist staff at ₹2,500–4,500 per hour. Cerebrum is built on a different foundation: biology-only AIIMS-trained biology faculty as your dedicated year-long tutor, written FRQ feedback against the College Board rubric every week, IST evening live classes (so your child finishes by 7:30 PM regardless of which Noida sector you live in), and the option of in-person consultations at our South Extension hub (about 60 minutes via DND Flyway off-peak, longer at peak hours). Senior-faculty 1:1 from $1,800 for 12 hours ($150/hr) — well below US-based tutors' $150–400/hr Zoom rates.",
    schools: [
      'Pathways School Noida',
      'Shiv Nadar School Noida',
      'Step by Step School Noida',
      'Genesis Global School',
      'Lotus Valley International School Noida',
      'GD Goenka Public School Noida',
      'Amity International School Sector 44',
      'Amity International School Sector 6',
      'DPS Noida Sector 30',
      'Cambridge School Noida',
      'Delhi Public School Greater Noida',
      'The Khaitan School',
      'Apeejay School Noida',
      'Somerville School Noida',
      'Mayoor School Noida',
      'Indus Valley Public School',
    ],
    faqs: [
      {
        question:
          'My child is at Pathways Noida or Shiv Nadar — does adding AP Biology on top of IBDP HL actually move the needle for US applications?',
        answer:
          'For US-targeted applicants, yes — AP Biology layered on top of IB Biology HL is a meaningful application signal. American admissions officers read thousands of IB transcripts but parse AP scores as the canonical US-curriculum benchmark. A Pathways Noida or Shiv Nadar IBDP-HL student who also scores AP-5 reads as both globally rigorous and US-curriculum literate. The trade-off is workload during IA / EE crunch (November–February in Year 12). For pure UK / Europe / Australia / Canada applicants, IB alone is sufficient — AP adds little.',
      },
      {
        question:
          'Noida has multiple AP-offering international schools — Step by Step, Genesis Global, Lotus Valley, Amity. When is external AP Biology tutoring useful, and when is it overkill?',
        answer:
          "In-school AP Biology classes at the strong international schools are typically solid for concept coverage. External tutoring is high-leverage for three things the school class doesn't have bandwidth to do at depth: (1) FRQ rubric mastery with weekly written feedback against the College Board rubric, (2) timed full-length mock exams in the 6 weeks before the May AP, and (3) personalised remediation when a student hits a specific topic wall (typically biochem energetics, signal transduction, or population genetics). If your child is comfortably running AP-4 on internal school assessments, school is enough. If they're targeting AP-5 specifically or struggling on a topic, external 1:1 is high-leverage.",
      },
      {
        question:
          'My child is at DPS Noida Sector 30 doing CBSE 12, preparing for NEET, AND wants US college options. Can AP Biology realistically fit?',
        answer:
          'This dual-application profile is common in our Noida roster. The honest assessment: it is hard but doable if you start early (Class 11 summer). CBSE 12 + NEET prep is itself a 60-hour-per-week load; layering AP Biology adds another 4–6 hours per week of focused work. The conceptual overlap with NEET helps — cell biology, genetics, physiology, ecology cover much of the AP syllabus — but FRQ format and US-style data interpretation require dedicated practice. We typically run two 90-minute IST evening sessions for these students, calibrated to keep NEET prep as the primary track and AP as the secondary US-application layer. Be honest with your child about which track is primary.',
      },
      {
        question:
          'Noida to South Extension is a 60+ minute drive in peak hours — does that affect tutoring at all?',
        answer:
          'Not for online classes — which is the entire delivery model. Your child opens a laptop in Sector 44 / 50 / 62 / 132 / Greater Noida at 6 PM, finishes at 7:30, and the Noida-to-Delhi DND Flyway traffic at that hour is irrelevant. The only time commute matters is for the optional in-person consultations at South Extension; those we schedule on weekends or off-peak windows by appointment. Noida families consistently tell us removing the commute is half the benefit — your child gets an extra 90 minutes per session compared to in-person tutoring at any Delhi-side coaching centre.',
      },
      {
        question:
          'Will AP Biology give my child credit toward an Indian MBBS, BDS, or BSc programme?',
        answer:
          'No. The NEET admissions framework, the National Medical Commission (NMC), and Indian universities all operate independently of the College Board AP system. AP Biology is a US-curriculum credential — useful for US university applications (4 or 5 typically earns 6 to 8 credit hours toward general biology) and entirely separate from Indian medical school admissions. For Noida IT-corridor families running the dual abroad-and-India application track, NEET remains the only relevant credential for MBBS, BDS, or BSc seats in India; AP Biology functions purely as a US-side enhancer.',
      },
      {
        question:
          'How do we pay — INR transfer or USD card? GST invoice for IT-employer reimbursement available?',
        answer:
          'Both currencies and yes on the invoice. INR transfer to HDFC / ICICI / SBI / Axis is the most common (no FX charged to you), UPI works for smaller installments, international Visa / Mastercard / Amex in USD, and Wise transfers. Several Noida IT-employer families split the $1,800 senior-faculty package across two or three INR transfers at no extra charge. GST-compliant invoices are issued for corporate-reimbursement claims — common for Adobe, HCL, Wipro, TCS, Infosys, and other Noida-based MNC employees.',
      },
      {
        question:
          'My child is at Amity International or Cambridge School Noida doing Cambridge IGCSE — when should we start AP Biology prep?',
        answer:
          "For students continuing on Cambridge A-Levels at senior school, AP Biology as a parallel layer typically starts in Year 12 (the year the AP exam is taken in May). For students transitioning from Cambridge IGCSE to IBDP or CBSE Class 11-12 at senior school, AP can layer onto either track. The earlier-start advantage (starting in Year 11) is most useful for students aiming at top-tier US universities where AP-5 + a strong school transcript together signal preparedness. We run an AP Biology prep diagnostic to recommend the right start point — book a free consultation and we'll calibrate to your child's specific trajectory.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 22. GURUGRAM (sub-metro of Delhi NCR — distinct AP Bio demand corridor)
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'gurugram',
    cityName: 'Gurugram',
    region: 'Gurugram + DLF + Sushant Lok + Aravali + Cyber City',
    timezone: 'IST (India)',
    timezoneIana: 'Asia/Kolkata',
    addressRegion: 'Haryana',
    heroBlurb:
      'Gurugram has the densest concentration of US-admissions families in India. The Aravali corridor (Pathways Aravali, Shri Ram Aravali, Heritage Xperiential, GD Goenka World, Suncity, KR Mangalam, Lancers, Pathways Gurgaon) runs the IBDP + AP overlay; the DLF / Sushant Lok / Cyber City families on the Golf Course Road axis send children to Pathways Gurgaon, DPS International Sector 45, Scottish High, Vega, Amity, and Bal Bharati. AP Biology coaching here is structurally an "applied to US college admissions" decision — not a curriculum-credit decision — and our Gurugram roster reflects that.',
    positioningBlurb:
      'Gurugram is the highest-CPC AP tutoring market in India — generalist agencies (Jamboree, The Princeton Review Cyber City, Karan Gupta, Manya, Edu-Mentor MG Road, ALevel and IGCSE Tutors Sector 49) bundle AP Biology into SAT / Common-App stacks tutored by rotating non-specialist staff at ₹3,000–6,000 per hour. Cerebrum is structurally different: biology-only AIIMS-trained biology faculty as your dedicated year-long tutor, written FRQ feedback against the College Board rubric every week, IST evening live classes (so your child finishes by 7:30 PM and the Gurgaon-Delhi commute is irrelevant), and an optional in-person consultation at our South Extension hub (40 min via Yellow Line from MG Road) for families who want a face-to-face progress review. 1:1 senior-faculty coaching from $1,800 (12-hour package) ($150/hr) — well below US-based tutors’ $150–400/hr Zoom rates and the local Gurgaon agencies’ generalist-tutor rates.',
    schools: [
      'Pathways World School Aravali',
      'Pathways School Gurgaon',
      'Shri Ram School Aravali',
      'Shri Ram School Moulsari',
      'Heritage Xperiential Learning School',
      'GD Goenka World School',
      'Lancers International School',
      'DPS International Sector 45 Gurgaon',
      'Suncity School',
      'Scottish High International School',
      'Vega Schools',
      'KR Mangalam World School',
      'Amity International School Sector 46',
      'Bal Bharati Public School Pinnacle',
      'Presidium Sector 57',
      'Apeejay School Sector 15',
      'Hillwoods Academy',
      'Paras World School',
    ],
    faqs: [
      {
        question:
          'My child is at Pathways Aravali doing IBDP HL — is layering AP Biology on top worth the extra workload?',
        answer:
          'For US-targeted applicants, yes — AP Biology added to IB Biology HL is a meaningful application signal. US admissions officers read thousands of IB transcripts but parse AP scores as the canonical US-curriculum benchmark, so a Pathways IBDP-HL student who also scores AP-5 reads as both globally rigorous and US-curriculum literate. The honest trade-off is workload during IA / EE crunch (November–February in Year 12). For pure UK / Europe / Australia / Canada applicants, IB alone is sufficient — AP adds little. Decide based on the application target, not reflexively.',
      },
      {
        question:
          'Heritage Xperiential and Shri Ram Aravali are inquiry-driven schools — does AP Biology’s rubric-heavy testing clash with that philosophy?',
        answer:
          'Less than parents fear. The College Board AP Biology FRQ rubric is genuinely conceptual — it rewards mechanism-level explanation, not memorisation. Inquiry-school students often produce strong FRQs once they internalise the rubric language ("explain how X causes Y", "predict Z and justify"), because that vocabulary is closer to their classroom voice than rote MCQ work. The bottleneck is usually MCQ pace (60 questions in 90 minutes), not the FRQ. We calibrate practice toward MCQ speed-drills for this cohort, with FRQ work serving as the strength they already have.',
      },
      {
        question:
          'My child commutes from DLF Phase 1 or Sushant Lok to school — does AP Biology tutoring add another physical commute on top?',
        answer:
          'No. Coaching delivery is 100% online live video — that is structurally the right model for the depth and pace AP Biology requires. Your child opens a laptop at home in Aravali, Sushant Lok, DLF, or Cyber City at 6 PM, finishes by 7:30, and the Gurgaon-internal traffic at that hour is irrelevant. Optional in-person consultations at our South Extension hub (40 min via Yellow Line from MG Road; 50 min off-peak by car via NH-48) are by appointment for families who want a face-to-face progress review — most Gurugram families never use these and are fully satisfied with online delivery.',
      },
      {
        question:
          'Pathways Gurgaon and Pathways Aravali have in-school AP Biology classes — when is external tutoring useful, and when is it overkill?',
        answer:
          'Pathways’ in-school AP Bio class is solid for concept coverage. External tutoring is typically useful for three things the school class doesn’t have bandwidth to do at depth: (1) FRQ rubric mastery with weekly written feedback against the College Board rubric, (2) timed full-length mock exams in the 6 weeks before the May AP, and (3) personalised remediation when a student hits a specific topic wall (typically biochem energetics, signal transduction, or population genetics). If your child is comfortably running AP-4 on internal Pathways assessments, school is enough. If they’re targeting AP-5 specifically or struggling on a topic, external 1:1 is high-leverage.',
      },
      {
        question:
          'My child at DPS International Sector 45 is doing CBSE 12, preparing for NEET, AND wants US college options. Can AP Biology realistically fit?',
        answer:
          'This dual-application profile is the most common pattern in our Gurugram roster. The honest assessment: it is hard but doable if you start early (Class 11 summer). CBSE 12 + NEET prep is itself a 60-hour-per-week load; layering AP Biology adds another 4–6 hours per week of focused work. The conceptual overlap with NEET helps — cell biology, genetics, physiology, ecology cover much of the AP syllabus — but FRQ format and US-style data interpretation require dedicated practice. We typically run two 90-minute IST evening sessions for these students, calibrated to keep NEET prep as the primary track and AP as the secondary US-application layer. Be honest with your child about which track is primary.',
      },
      {
        question:
          'Will an AP-5 in Biology give my child credit toward an Indian MBBS, BDS, or BSc programme?',
        answer:
          'No. AP Biology sits entirely outside the Indian medical-college admission system — the NMC, Indian universities, and NEET do not recognise AP scores or grant credit for them. A 4 or 5 typically earns 6 to 8 credit hours of general biology at US universities, but it carries no weight at AIIMS, state medical colleges, or any Indian medical-stream BSc programme. For Gurugram families where some confuse the two pathways: AP Biology supports the US application portfolio; NEET is the sole route to MBBS / BDS / BSc admission in India.',
      },
      {
        question:
          'How do we pay — INR transfer or USD card? GST invoice for corporate reimbursement available?',
        answer:
          'Both currencies and yes on the invoice. INR transfer to HDFC / ICICI / SBI / Axis is the most common (no FX charged to you), UPI works for smaller installments, international Visa / Mastercard / Amex in USD, and Wise transfers. Several Gurugram corporate-family parents split the $1,800 senior-faculty package across two or three INR transfers at no extra charge, and GST-compliant invoices are issued for corporate-reimbursement claims (common for IT executive and MNC-employee families).',
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────────────────
  // PHASE 3 — US GAP-FILL METROS
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'miami',
    pricingTier: 'standard',
    cityName: 'Miami',
    region: 'Miami-Dade + Broward + Palm Beach',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    addressRegion: 'FL',
    heroBlurb:
      "Miami is South Florida's AP Biology hub — Design and Architecture Senior High (DASH), Miami Palmetto Senior, Coral Gables Senior, MAST Academy, Ransom Everglades, Gulliver Prep, and Palmer Trinity drive consistent AP-5 volume. The growing Indian-American community in Weston, Davie, and Coral Springs adds pre-med-track AP demand.",
    positioningBlurb:
      'South Florida students balance AP loads with competitive extracurriculars (marine biology research at UM Rosenstiel School, clinical volunteering at Jackson Memorial). Our ET evening sessions fit the after-school window, and we overlay FRQ rubric mastery — the key score lever for Miami students who already have strong science foundations.',
    schools: [
      'Design and Architecture Senior High (DASH)',
      'Miami Palmetto Senior High School',
      'Coral Gables Senior High School',
      'MAST Academy',
      'Ransom Everglades School',
      'Gulliver Preparatory School',
      'Palmer Trinity School',
      'Coral Reef Senior High School',
      'Miami Country Day School',
      'Pine Crest School (Fort Lauderdale)',
      'American Heritage School (Plantation)',
      'NSU University School (Davie)',
    ],
    faqs: [
      {
        question: 'Can Miami students do marine biology IAs alongside AP Biology prep?',
        answer:
          'Yes — several Miami students combine AP Biology with marine-bio research at UM Rosenstiel School of Marine, Atmospheric, and Earth Science. We help students connect their AP Biology knowledge to marine-ecology research contexts, which strengthens both the AP exam performance and the college application narrative.',
      },
      {
        question: 'My family is in Weston / Coral Springs — what is the planning conversation?',
        answer:
          'The Weston/Coral Springs South Asian corridor has strong pre-med culture. We discuss: (a) target AP score (5 for college credit at UM, UF, FSU), (b) USABO bridge (for students targeting semifinal), (c) timeline (start sophomore summer for junior-year AP Bio). Most Weston families book the $1,800 senior-faculty package.',
      },
      {
        question: 'Ransom Everglades or Gulliver Prep — does AP Bio differ?',
        answer:
          "Both schools run rigorous AP Biology programmes. Ransom Everglades emphasises marine ecology (given its Key Biscayne proximity); Gulliver leans more toward molecular biology. We calibrate session content to whichever school's unit ordering your student follows.",
      },
      {
        question: 'How does Cerebrum compare to South Florida AP tutors?',
        answer:
          'Miami-area AP Biology tutors typically charge $80–$150/hour. Cerebrum offers senior-faculty 1:1 at $120–$150/hour with FRQ rubric mastery — the specific exam-technique layer that generic science tutors lack. Our Small-Batch at $40/hour is more accessible for families wanting group instruction.',
      },
      {
        question: 'ET evening sessions for Miami students?',
        answer:
          'Standard small-batch: 7:00–9:00 PM ET weekday evenings. Weekend: 9:00–11:00 AM ET. 1:1 available at any ET slot. The 7 PM ET start works for students finishing after-school sports or research commitments by 5:30–6:00 PM.',
      },
    ],
  },
  {
    slug: 'phoenix',
    pricingTier: 'standard',
    cityName: 'Phoenix',
    region: 'Phoenix Metro + Scottsdale + Chandler + Gilbert',
    timezone: 'MST (Arizona)',
    timezoneIana: 'America/Phoenix',
    addressRegion: 'AZ',
    heroBlurb:
      "Phoenix is the fastest-growing AP Biology market in the Southwest. Basis Schools (Scottsdale, Chandler, Peoria — consistently ranked #1–#3 nationally), Hamilton High School (Chandler), Desert Mountain High (Scottsdale), Brophy College Prep, and Xavier College Prep anchor the metro's AP-5 pipeline. The Chandler / Gilbert Indian-American tech corridor (Intel, Microchip, Avnet) drives growing pre-med AP demand.",
    positioningBlurb:
      "Arizona students have a unique scheduling advantage: no daylight saving time (MST year-round). Our sessions lock to MST, so there's no clock-change disruption twice a year. We coach Campbell Biology end-to-end with FRQ rubric overlay — the Basis Schools model emphasises content breadth but sometimes underserves exam technique.",
    schools: [
      'Basis Scottsdale',
      'Basis Chandler',
      'Basis Peoria',
      'Hamilton High School (Chandler)',
      'Desert Mountain High School (Scottsdale)',
      'Brophy College Preparatory',
      'Xavier College Preparatory',
      'Chaparral High School (Scottsdale)',
      'Mountain View High School (Mesa)',
      'Perry High School (Gilbert)',
      'Great Hearts Academies (multiple campuses)',
    ],
    faqs: [
      {
        question:
          "Basis Schools students — does Cerebrum add value on top of Basis's AP programme?",
        answer:
          'Basis runs the most rigorous AP programme in the US — students often take 10+ APs. Our value-add is FRQ rubric precision: Basis teaches content comprehensively but moves fast, and students sometimes lose marks on FRQ technique rather than knowledge gaps. We drill the specific FRQ patterns that earn full marks.',
      },
      {
        question: 'My family is in Chandler / Gilbert — what is the planning conversation?',
        answer:
          'The Chandler/Gilbert corridor (Intel, Microchip, Avnet families) has strong pre-med culture. We discuss: (a) target score (AP-5 for ASU Barrett Honors or out-of-state credit), (b) USABO bridge, (c) whether the student is at Basis (accelerated timeline) or a traditional school (standard junior-year AP Bio). Most Chandler families book the senior-faculty 1:1 package.',
      },
      {
        question: 'Arizona has no daylight saving time — does that affect scheduling?',
        answer:
          "It simplifies it. MST is fixed year-round (GMT-7). Our sessions lock to MST, so there's no spring/fall clock-change disruption. During the school year, Arizona is the same as Pacific Time in winter and Mountain Time in summer relative to other US zones.",
      },
      {
        question: 'How does Cerebrum compare to Phoenix-area AP tutors?',
        answer:
          'Phoenix-area AP Biology tutors charge $60–$120/hour. Cerebrum offers senior-faculty 1:1 at $120–$150/hour with FRQ rubric mastery. Small-Batch at $40/hour. The FRQ technique layer is our differentiator — generic tutors teach content but rarely drill the rubric systematically.',
      },
      {
        question: 'MST evening sessions for Phoenix students?',
        answer:
          'Standard small-batch: 6:30–8:30 PM MST weekday evenings. Weekend: 9:00–11:00 AM MST. 1:1 available at any MST slot.',
      },
    ],
  },
  {
    slug: 'san-diego',
    pricingTier: 'standard',
    cityName: 'San Diego',
    region: 'San Diego County + North County',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Los_Angeles',
    addressRegion: 'CA',
    heroBlurb:
      "San Diego is a biotech-powered AP Biology market. Torrey Pines High School (ranked #1 STEM public in SD County), Canyon Crest Academy, La Jolla High, The Bishop's School, and Francis Parker drive AP-5 volume. The Sorrento Valley / Torrey Pines biotech corridor (Illumina, Thermo Fisher, Pfizer, Dexcom) creates a parent community where AP Biology HL-equivalent depth is the cultural norm.",
    positioningBlurb:
      'San Diego students benefit from proximity to UCSD, Salk Institute, and Scripps Research — access to real research environments that enrich AP Biology understanding. Our PT evening sessions fit the laid-back SD schedule, and we overlay FRQ rubric mastery on top of the strong science foundations these schools provide.',
    schools: [
      'Torrey Pines High School',
      'Canyon Crest Academy',
      'La Jolla High School',
      "The Bishop's School",
      'Francis Parker School',
      'Del Norte High School',
      'Westview High School',
      'San Dieguito Academy',
      'Scripps Ranch High School',
      'Cathedral Catholic High School',
    ],
    faqs: [
      {
        question: 'Torrey Pines or Canyon Crest students — does Cerebrum add value?',
        answer:
          'Both schools run excellent AP Biology programmes. Our value-add is targeted FRQ rubric drilling and USABO bridge coaching. Torrey Pines students with Salk/Scripps research connections often want to connect AP content to their research context — we support that integration.',
      },
      {
        question: 'My family is in the Sorrento Valley biotech corridor — planning conversation?',
        answer:
          'Biotech-corridor families (Illumina, Thermo Fisher, Pfizer) understand biology depth intuitively. We discuss: (a) AP-5 target + USABO semifinal bridge, (b) UCSD bio-research access for extracurriculars, (c) whether the student targets UC system or East Coast schools. Most SD biotech families book the senior-faculty 1:1 package.',
      },
      {
        question: 'How does Cerebrum compare to San Diego AP tutors?',
        answer:
          'SD-area AP Biology tutors charge $70–$130/hour. Cerebrum offers senior-faculty 1:1 at $120–$150/hour with FRQ rubric mastery. Small-Batch at $40/hour. The biotech-informed pedagogy is our differentiator for the Sorrento Valley cohort.',
      },
      {
        question: 'UCSD pre-med pipeline — does AP Biology help?',
        answer:
          "AP Biology score of 5 earns credit at UCSD for BILD 1 (The Cell). More importantly, strong AP Bio performance demonstrates readiness for UCSD's rigorous biology major — a signal for pre-med advising and research-lab placement. We coach with the UCSD pipeline in mind.",
      },
      {
        question: 'PT evening sessions for San Diego students?',
        answer:
          'Standard small-batch: 7:00–9:00 PM PT weekday evenings. Weekend: 9:00–11:00 AM PT. 1:1 available at any PT slot.',
      },
    ],
  },
  {
    slug: 'denver',
    pricingTier: 'standard',
    cityName: 'Denver',
    region: 'Denver Metro + Boulder + Colorado Springs',
    timezone: 'MT (Mountain)',
    timezoneIana: 'America/Denver',
    addressRegion: 'CO',
    heroBlurb:
      "Denver is the Mountain West's strongest AP Biology market. Cherry Creek High School, ThunderRidge High School, Fairview High (Boulder), Kent Denver School, Colorado Academy, and Regis Jesuit anchor the AP-5 pipeline. The growing South Asian tech community in Centennial, Lone Tree, and Highlands Ranch drives pre-med AP demand.",
    positioningBlurb:
      'Colorado students in the Mountain Time zone have a scheduling advantage: MT evening sessions fit cleanly between the typical 3 PM school dismissal and a 9 PM bedtime. We coach Campbell Biology with FRQ rubric overlay and bridge to USABO for students targeting the semifinal.',
    schools: [
      'Cherry Creek High School',
      'ThunderRidge High School',
      'Fairview High School (Boulder)',
      'Kent Denver School',
      'Colorado Academy',
      'Regis Jesuit High School',
      'Grandview High School',
      'Rock Canyon High School',
      'Monarch High School (Louisville)',
      'Peak to Peak Charter School (Lafayette)',
    ],
    faqs: [
      {
        question: 'Cherry Creek or ThunderRidge students — what does Cerebrum add?',
        answer:
          'Both schools have strong AP Biology programmes in the Cherry Creek School District. Our value-add is FRQ rubric precision and USABO bridge coaching. Cherry Creek district students often compete in Colorado State Science Olympiad — our coaching complements that STEM trajectory.',
      },
      {
        question: 'My family is in Centennial / Lone Tree — planning conversation?',
        answer:
          'The Centennial/Lone Tree/Highlands Ranch corridor has growing South Asian pre-med culture. We discuss: (a) AP-5 target + CU Boulder or out-of-state pre-med, (b) USABO bridge, (c) Mountain Time scheduling. Most families in this corridor book the senior-faculty 1:1 package.',
      },
      {
        question: 'Mountain Time scheduling for Denver students?',
        answer:
          'Standard small-batch: 6:30–8:30 PM MT weekday evenings. Weekend: 9:00–11:00 AM MT. 1:1 available at any MT slot. MT fits well for students with after-school outdoor activities (skiing, hiking) in winter months.',
      },
      {
        question: 'How does Cerebrum compare to Denver-area AP tutors?',
        answer:
          'Denver-area AP Biology tutors charge $60–$120/hour. Cerebrum offers senior-faculty 1:1 at $120–$150/hour with FRQ rubric mastery. Small-Batch at $40/hour.',
      },
      {
        question: 'CU Boulder pre-med pipeline — does AP Biology help?',
        answer:
          "AP Biology score of 5 earns credit at CU Boulder for EBIO 1210. Strong AP Bio performance signals readiness for CU's competitive Molecular, Cellular, and Developmental Biology (MCDB) programme — a key pre-med major. We coach with the CU pipeline in mind for Colorado-focused families.",
      },
    ],
  },
  {
    slug: 'austin',
    pricingTier: 'standard',
    cityName: 'Austin',
    region: 'Austin Metro + Round Rock + Cedar Park',
    timezone: 'CT (Central)',
    timezoneIana: 'America/Chicago',
    addressRegion: 'TX',
    heroBlurb:
      "Austin is Texas's fastest-growing AP Biology market. LASA (Liberal Arts and Science Academy), Westlake High School, Westwood High School (Round Rock), McNeil High School, and St. Stephen's Episcopal anchor the AP-5 pipeline. The tech-corridor Indian-American community in Round Rock, Cedar Park, and Pflugerville (Apple, Samsung, Tesla, Oracle) drives strong pre-med AP demand.",
    positioningBlurb:
      "Austin students benefit from UT Austin's proximity — the College of Natural Sciences pre-med track is a major local target. Our CT evening sessions fit the typical Texas school schedule, and we overlay FRQ rubric mastery on strong LASA/Westlake science foundations.",
    schools: [
      'Liberal Arts and Science Academy (LASA)',
      'Westlake High School',
      'Westwood High School (Round Rock)',
      'McNeil High School (Round Rock)',
      'Vandegrift High School (Leander)',
      "St. Stephen's Episcopal School",
      "St. Andrew's Episcopal School",
      'Cedar Park High School',
      'Lake Travis High School',
      'Anderson High School',
    ],
    faqs: [
      {
        question: 'LASA or Westlake students — what does Cerebrum add?',
        answer:
          "LASA is Austin's top STEM magnet; Westlake is the dominant comprehensive-school AP programme. Both have excellent AP Biology teachers. Our value-add is FRQ rubric drilling (the exam-technique layer) and USABO bridge coaching for students targeting the semifinal.",
      },
      {
        question: 'My family is in Round Rock / Cedar Park — planning conversation?',
        answer:
          "The Round Rock/Cedar Park tech corridor (Apple, Samsung, Dell) has one of Texas's highest South Asian household densities. We discuss: (a) AP-5 target + UT Austin CNS pre-med or out-of-state, (b) USABO bridge, (c) Central Time scheduling. Most Round Rock families book the senior-faculty 1:1 package.",
      },
      {
        question: 'UT Austin pre-med pipeline — does AP Biology help?',
        answer:
          "AP Biology score of 5 earns credit at UT Austin for BIO 311C. Strong AP Bio performance signals readiness for UT's competitive Biology or Biochemistry pre-med majors — a meaningful admissions signal for the College of Natural Sciences. We coach with the UT pipeline in mind for Texas-focused families.",
      },
      {
        question: 'How does Cerebrum compare to Austin-area AP tutors?',
        answer:
          'Austin-area AP Biology tutors charge $60–$120/hour. Cerebrum offers senior-faculty 1:1 at $120–$150/hour with FRQ rubric mastery. Small-Batch at $40/hour.',
      },
      {
        question: 'CT evening sessions for Austin students?',
        answer:
          'Standard small-batch: 7:00–9:00 PM CT weekday evenings. Weekend: 9:00–11:00 AM CT. 1:1 available at any CT slot.',
      },
    ],
  },
  {
    slug: 'portland',
    pricingTier: 'standard',
    cityName: 'Portland',
    region: 'Portland Metro + Lake Oswego + Beaverton',
    timezone: 'PT (Pacific)',
    timezoneIana: 'America/Los_Angeles',
    addressRegion: 'OR',
    heroBlurb:
      "Portland is the Pacific Northwest's secondary AP Biology market after Seattle. Lincoln High School, Catlin Gabel, Oregon Episcopal School, Lake Oswego High School, and Sunset High School (Beaverton) drive AP-5 volume. The growing Indian-American tech community in Beaverton and Hillsboro (Intel, Nike) drives pre-med AP demand.",
    positioningBlurb:
      'Portland students share the PT timezone with Seattle and the Bay Area, making multi-city small-batch sessions viable. We coach Campbell Biology with FRQ rubric overlay and bridge to USABO for students targeting the semifinal. OHSU (Oregon Health & Science University) is the dominant local medical-school target.',
    schools: [
      'Lincoln High School',
      'Catlin Gabel School',
      'Oregon Episcopal School',
      'Lake Oswego High School',
      'Sunset High School (Beaverton)',
      'Westview High School (Beaverton)',
      'Jesuit High School',
      'Grant High School',
      'Riverdale High School',
      'Wilson High School',
    ],
    faqs: [
      {
        question: 'Lincoln or Catlin Gabel students — what does Cerebrum add?',
        answer:
          "Lincoln is Portland's top public IB/AP programme; Catlin Gabel is the leading independent school. Our value-add is FRQ rubric drilling and USABO bridge coaching. Portland's smaller AP Biology cohort means students benefit from the broader perspective our multi-city small batches provide.",
      },
      {
        question: 'My family is in Beaverton / Hillsboro — planning conversation?',
        answer:
          'The Beaverton/Hillsboro corridor (Intel, Nike) has growing South Asian pre-med culture. We discuss: (a) AP-5 target + OHSU pipeline or out-of-state pre-med, (b) USABO bridge, (c) PT scheduling. Most Beaverton families book the senior-faculty 1:1 package.',
      },
      {
        question: 'OHSU pre-med pipeline — does AP Biology help?',
        answer:
          "OHSU is Oregon's only medical school and extremely competitive for in-state applicants. AP Biology score of 5 earns credit at UO and OSU for introductory biology. Strong AP Bio performance signals science readiness for the OHSU pipeline — a meaningful signal in Oregon's small pre-med ecosystem.",
      },
      {
        question: 'How does Cerebrum compare to Portland-area AP tutors?',
        answer:
          'Portland-area AP Biology tutors charge $55–$110/hour. Cerebrum offers senior-faculty 1:1 at $120–$150/hour with FRQ rubric mastery. Small-Batch at $40/hour.',
      },
      {
        question: 'PT evening sessions for Portland students?',
        answer:
          'Standard small-batch: 7:00–9:00 PM PT weekday evenings. Weekend: 9:00–11:00 AM PT. 1:1 available at any PT slot. Portland PT sessions can merge with Seattle and Bay Area small batches for a richer peer group.',
      },
    ],
  },
  {
    slug: 'twin-cities',
    pricingTier: 'standard',
    cityName: 'Minneapolis–St. Paul (Twin Cities)',
    region: 'Minnesota (Twin Cities metro)',
    timezone: 'CT (Central)',
    timezoneIana: 'America/Chicago',
    addressRegion: 'MN',
    heroBlurb:
      'The Twin Cities have a deep bench of academically competitive suburban high schools — Wayzata, Edina, Eden Prairie, Minnetonka, Mounds View — and a strong medical-research base in the University of Minnesota and Mayo Clinic. We coach AP Biology to score-5 depth for any student in the metro, live in Central Time.',
    positioningBlurb:
      'We teach Campbell Biology with an FRQ-rubric overlay and bridge strong students to USABO. Central-Time evening sessions fit cleanly around the school day. Open to any student of any nationality in the Twin Cities and across Minnesota.',
    schools: [
      'Wayzata High School',
      'Edina High School',
      'Eden Prairie High School',
      'Minnetonka High School',
      'Mounds View High School',
      'Maple Grove Senior High',
      'Eastview High School',
      'Wayzata / Orono / Chanhassen feeders',
    ],
    faqs: [
      {
        question: 'Which Twin Cities schools do your students come from?',
        answer:
          'Students across Minneapolis–St. Paul and the suburbs — Wayzata, Edina, Eden Prairie, Minnetonka, Mounds View, Maple Grove and Eastview among them — and from any other school in Minnesota. We coach students of any nationality.',
      },
      {
        question: 'Central Time scheduling for Twin Cities students?',
        answer:
          'Standard small-batch: 6:30–8:30 PM CT weekday evenings; weekends 9:00–11:00 AM CT. 1:1 available at any CT slot, scheduled around the school day.',
      },
      {
        question: 'University of Minnesota pre-med — does AP Biology help?',
        answer:
          'A score of 5 earns biology credit at the University of Minnesota and signals readiness for its competitive pre-health pathways. We coach with the U of M and Mayo pipelines in mind for Minnesota-focused families.',
      },
      {
        question: 'Can you bridge from AP Biology to USABO?',
        answer:
          'Yes — AP-5 covers roughly 60–70% of the USABO Open Exam. We bridge the remaining olympiad-only topics (ethology, biosystematics, histology, biostatistics) for students who want to compete.',
      },
    ],
  },
  {
    slug: 'research-triangle',
    pricingTier: 'standard',
    cityName: 'Research Triangle (Raleigh–Durham)',
    region: 'North Carolina (Research Triangle)',
    timezone: 'ET (Eastern)',
    timezoneIana: 'America/New_York',
    addressRegion: 'NC',
    heroBlurb:
      'The Research Triangle is one of the densest research regions in the US, anchored by Duke, UNC Chapel Hill and NC State — and home to the renowned NC School of Science & Mathematics. With strong magnet and suburban schools (Enloe, Green Hope, Panther Creek), it is a deep AP Biology market. We coach to score-5 depth for any student, live in Eastern Time.',
    positioningBlurb:
      'We teach Campbell Biology with an FRQ-rubric overlay and bridge strong students to USABO. Eastern-Time evening sessions fit around the school day. Open to any student of any nationality across Raleigh, Durham, Chapel Hill and Cary.',
    schools: [
      'NC School of Science & Mathematics (NCSSM)',
      'Enloe Magnet High School',
      'Green Hope High School',
      'Panther Creek High School',
      'Cary High School',
      'Green Level High School',
      'Apex Friendship High School',
      'Raleigh Charter High School',
    ],
    faqs: [
      {
        question: 'Which Triangle schools do your students come from?',
        answer:
          'Students across Raleigh, Durham, Chapel Hill and Cary — including NCSSM, Enloe, Green Hope, Panther Creek, Cary, Green Level and Apex Friendship — and from any other school in North Carolina. We coach students of any nationality.',
      },
      {
        question: 'Eastern Time scheduling for Triangle students?',
        answer:
          'Standard small-batch: 7:00–9:00 PM ET weekday evenings; weekends 9:00–11:00 AM ET. 1:1 available at any ET slot, scheduled around the school day.',
      },
      {
        question: 'Duke / UNC pre-med — does AP Biology help?',
        answer:
          'A score of 5 earns biology credit at many universities and signals readiness for the competitive pre-health tracks at Duke, UNC Chapel Hill and NC State. We coach with those pipelines in mind for Triangle families.',
      },
      {
        question: 'Can you bridge from AP Biology to USABO?',
        answer:
          'Yes — AP-5 covers roughly 60–70% of the USABO Open Exam. We bridge the remaining olympiad-only topics for students who want to compete, and the Triangle (with NCSSM) is a strong USABO market.',
      },
    ],
  },
]

/** Helper: lookup metro by slug. */
export function getMetroBySlug(slug: string): APBiologyMetro | undefined {
  return apBiologyMetros.find((m) => m.slug === slug)
}

/** Helper: list of all slugs for generateStaticParams. */
export const apBiologyMetroSlugs = apBiologyMetros.map((m) => m.slug)
