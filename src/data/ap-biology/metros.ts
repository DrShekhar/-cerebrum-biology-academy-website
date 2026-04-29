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
  /** US time zone label for scheduling messaging */
  timezone: 'ET (Eastern)' | 'CT (Central)' | 'MT (Mountain)' | 'PT (Pacific)'
  /** ISO timezone string for schema.org CourseInstance */
  timezoneIana: string
  /** ISO-2 sub-region code for schema.org addressRegion */
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
          'Cerebrum offers 1:1 AP Biology tutoring in Eastern Time evenings and weekends with PhD-level faculty, College Board–aligned curriculum, and FRQ rubric mastery. Most NYC students who score 5 do so by drilling past FRQs against the rubric — that is the core of our method. Senior-faculty 1:1 starts at $1,800 for 12 hours.',
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
          'We coach 100% online via live video. This lets us match the best biology specialist to each student regardless of borough. New York families consistently tell us video-1:1 with a senior PhD beats in-person with a generalist.',
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
      'Boston AP Bio students often combine high school coursework with research at Harvard, MIT, Tufts, or BU labs. We schedule around lab hours, and our faculty are PhD-level so they can engage with technical research questions students bring back from the bench. Campbell + Lehninger emphasis for the strongest cohort.',
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
          'Cerebrum runs 1:1 AP Biology tutoring with PhD biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. We schedule live in Eastern Time evenings and weekends. Our roster includes students from Boston Latin, Lexington, Newton, Brookline, and the boarding cluster (Exeter, Andover).',
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
          'Yes. Many of our Boston students are running research with PIs at Harvard, MIT, Tufts, BU, or Mass General. Our PhD faculty engage with the technical content — gel-band reads, plasmid maps, qPCR results — and we adjust AP Bio session pacing around lab hours.',
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
          "Cerebrum coaches several TJ students each year. TJ's pace is faster than most public schools, so our pace plan starts earlier (August) and emphasizes USABO Semifinal-level depth alongside the May AP exam. Senior-faculty 1:1 with PhD biology specialists.",
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
          'Cerebrum offers 1:1 AP Biology tutoring with PhD biology faculty in Central Time, College Board–aligned curriculum, and FRQ rubric mastery. We coach students from Whitney Young, Walter Payton, Northside, IMSA, and the North Shore public schools.',
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
          'Cerebrum offers 1:1 AP Biology tutoring with PhD biology faculty in Pacific Time, College Board–aligned curriculum, and FRQ rubric mastery. Our LA roster includes students from Harvard-Westlake, Marlborough, Brentwood, and Canyon Crest Academy.',
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
          'Cerebrum offers 1:1 AP Biology tutoring with PhD biology faculty in Central Time, College Board–aligned curriculum, and FRQ rubric mastery. Our Houston roster includes students from Bellaire, DeBakey, Carnegie Vanguard, and the Sugar Land / Katy cluster.',
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
      "Lakeside School and Seattle's strong public AP cluster — Bellevue, International School, Mercer Island, Newport, Garfield — run rigorous AP Biology programmes. Many Seattle families also consider the BS/MD and biotech-research pipeline given the city\'s deep biotech industry (Fred Hutch, ISB, Allen Institute). Our Seattle programme runs in Pacific Time.",
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
          'Cerebrum offers 1:1 AP Biology tutoring in Pacific Time with PhD biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Our Seattle roster includes students from Lakeside, Seattle Prep, International School, and the Bellevue / Mercer Island public cluster.',
      },
      {
        question: 'Does AP Biology help with University of Washington biology admissions?',
        answer:
          'UW Biology is competitive at the college level — most Washington pre-meds and biotech students take college biology regardless of AP credit. AP-5 is foundational. The bigger value of strong AP Bio is research-readiness for Fred Hutch / ISB / Allen Institute internships during high school and college.',
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
          'Cerebrum offers 1:1 AP Biology tutoring in Eastern Time with PhD biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Our Atlanta roster includes students from Walton, Lambert, Northview, Pace Academy, and Westminster.',
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
          'Cerebrum offers 1:1 AP Biology tutoring in Eastern Time with PhD biology faculty, College Board–aligned curriculum, and FRQ rubric mastery. Our New Jersey roster includes students from Bergen County Academies, High Tech HS, Edison Academy Magnet, Lawrenceville, and the Princeton-area public schools.',
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
]

/** Helper: lookup metro by slug. */
export function getMetroBySlug(slug: string): APBiologyMetro | undefined {
  return apBiologyMetros.find((m) => m.slug === slug)
}

/** Helper: list of all slugs for generateStaticParams. */
export const apBiologyMetroSlugs = apBiologyMetros.map((m) => m.slug)
