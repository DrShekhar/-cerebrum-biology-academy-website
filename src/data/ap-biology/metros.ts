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
      'Local Dubai tutoring agencies — TutorChase, ++tutors, GoStudent, MyTutor — typically charge AED 220–400 per hour ($60–$110/hr) and rely on a rotating freelance bench, often non-biology specialists from Russell Group universities. Cerebrum is structurally different: AIIMS-trained PhD biology faculty as your dedicated tutor for the full year, weekly written feedback on every FRQ attempt against the College Board rubric, and the Indian small-batch coaching tradition (max 12 per batch) built around retrieval practice and timed mocks. Senior-faculty 1:1 starts at $1,800 for 12 hours — substantially below local hourly rates once you compare like for like.',
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
          'Three structural differences. First, faculty: we use AIIMS-trained PhD biologists as your dedicated tutor for the year, not a rotating freelance bench of Russell Group graduates. Second, methodology: retrieval-heavy small-batch coaching (Indian tradition) with weekly written FRQ feedback against the College Board rubric, not generic platform tutoring. Third, price: senior-faculty 1:1 at $1,800 for 12 hours works out to $150/hr versus AED 220–400/hr ($60–$110/hr) at TutorChase or ++tutors, but with full PhD specialists rather than undergraduate or master’s-level tutors at the lower local price.',
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
      'Abu Dhabi families often face thinner AP tutoring supply than Dubai — fewer specialist agencies, shorter freelance benches. Local options (TutorChase, GoStudent, individual freelancers) charge AED 250–450 per hour ($70–$120/hr) for non-PhD generalists who often commute from Dubai. Cerebrum delivers AIIMS-trained PhD biology faculty as a dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and the Indian small-batch coaching tradition (max 12 per batch) calibrated to retrieval practice and timed mocks. Senior-faculty 1:1 from $1,800 for 12 hours, with no Dubai-commute premium or weekend-only constraint.',
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
          'For online live classes it doesn’t matter at all — and that’s precisely the point. A Saadiyat family at ACS Abu Dhabi or Cranleigh, and a Khalifa City family at GEMS American Academy or Canadian International, both sit at home for our sessions. The commute pain that AED 250–450/hr freelancers create — travel time charged, schedule rigidity, last-minute cancellations when the tutor is stuck in Dubai-AD traffic — disappears entirely. Same PhD faculty, same Zoom link, no driver-and-Sheikh-Zayed-Road overhead.',
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
          'Cranleigh and Brighton College have strong general academic support, but AP Biology is a niche specialism inside what’s primarily a British-curriculum school. In-house support typically caters to the small AP cohort with one or two teachers who may not have run the full College Board FRQ rubric calibration year on year. Our 1:1 layer adds PhD-level biology depth, dedicated FRQ feedback every week, and timed full-length mocks — the targeted scaffolding that converts school grades into AP-5 outcomes. We work alongside the school, not against it.',
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
      'Most India-based AP tutors are generalist test-prep agencies — Jamboree, Karan Gupta, Edu-Mentor, the Princeton Review franchise — that bundle AP Biology into broader SAT/ACT/Common-App packages. None specialise in biology. Cerebrum is the opposite: biology-only, AIIMS-trained PhD faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, and IST-evening live classes that respect Mumbai’s school-to-tuition rhythm. Senior-faculty 1:1 from $1,800 for 12 hours ($150/hr) — substantially below the $150–400/hr that US-based AP tutors charge Mumbai families over Zoom.',
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
          'Exactly. Most Mumbai AP tutoring options are either in-person in South Mumbai (driver, traffic, two-hour round trip from BKC or Powai) or in-person in Andheri/BKC (same problem reversed from Colaba or Bandra West). Our 100% online live model removes that entirely — your child opens a laptop at home at 6 PM, finishes at 7:30, and has dinner. The PhD specialist they’re working with is the same year-round regardless of where the faculty lives. No driver overhead, no two-hour commute, no Saturday-only-because-of-traffic constraint.',
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
      'Delhi NCR is the densest market in India for generalist test-prep agencies — Jamboree, Karan Gupta, The Princeton Review (Connaught Place + Gurgaon), Manya Education, Edu-Mentor — most of which bundle AP Biology into broader SAT / ACT / IELTS / Common-App packages tutored by non-specialist staff. Cerebrum is biology-only: AIIMS-trained PhD faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, IST evening live classes, and the option of in-person review at our South Extension hub for NCR-based families. Senior-faculty 1:1 from $1,800 for 12 hours — well below the $150–400/hr US-based tutors charge over Zoom.',
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
          'No. AP Biology is a US-curriculum exam administered by the College Board and is not recognised by Indian medical councils (NMC), Indian universities, or NEET admissions. AP credit transfers to many US universities (typically a 4 or 5 earns 6–8 credit hours toward general biology), but it has zero standing in Indian higher education. If your child is realistically going to study medicine in India, NEET is the only path that matters — AP Biology is purely a US college application enhancer. Don’t conflate the two; we’ll be straight with you about it.',
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
      'Bangalore parents are unusually price-sensitive and methodology-literate — tech-employee households scrutinise tutoring like they scrutinise vendor SLAs. The generalist test-prep agencies (Jamboree, Princeton Review Indiranagar, Manya, Karan Gupta) bundle AP Biology into SAT / Common-App stacks staffed by rotating non-specialist tutors. Cerebrum is structurally different: biology-only, AIIMS-trained PhD faculty as your dedicated year-long tutor, transparent weekly written FRQ feedback (the SLA you can actually measure), and IST evening or Saturday-morning live classes. Senior-faculty 1:1 from $1,800 for 12 hours ($150/hr) — well below US-based tutors’ $150–400/hr Zoom rates, with deeper subject specialism.',
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
          'It changes the integration pattern, not the coaching content. For Greenwood / Indus AP-track students, we mirror the school’s unit pacing and add the FRQ rubric layer most school cohorts under-drill. For Stonehill / Inventure / TISB IBDP students adding AP Biology as a US-application supplement, we run AP as a parallel external track — Campbell units 1–8 covered independently of the school’s IB Bio sequence — and align timing to the May AP exam regardless of IB internal deadlines. Same PhD faculty, same FRQ rubric standard; the calibration differs.',
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
      'Hyderabad has fewer specialist AP tutoring options than Mumbai, Delhi, or Bangalore — the local market is dominated by FIITJEE Punjagutta, Sri Chaitanya, Narayana and similar JEE / NEET coaching giants, none of which seriously coach AP Biology. The few US-curriculum options (Jamboree Banjara Hills, Princeton Review Madhapur) bundle AP into broader SAT / Common-App stacks staffed by generalist tutors. Cerebrum is biology-only: AIIMS-trained PhD faculty as your dedicated year-long tutor, weekly written FRQ feedback against the College Board rubric, IST evening live classes, and US-college-application context drawn from our actual Hyderabad → CMU / Purdue / UT Austin track record. Senior-faculty 1:1 from $1,800 for 12 hours.',
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
          'Many Hyderabad students do FIITJEE / Aakash / Sri Chaitanya for JEE or NEET — can AP Biology fit on top of that load?',
        answer:
          'Carefully. FIITJEE / Aakash / Sri Chaitanya integrated programmes are 30–40 hours a week of coaching on top of school. Layering AP Biology adds 4–6 hours of focused work. For a NEET-bound child specifically, there’s real conceptual overlap with AP Bio (cell biology, genetics, physiology, ecology) that makes the dual-track tractable. For a JEE-bound child, the overlap is near zero — AP Bio is pure additional load. We’ve seen NEET + AP Bio combinations produce both NEET selection and AP-5 with a strong student and an August start. JEE + AP Bio is a harder ask; we’ll be honest if we think it won’t work.',
      },
      {
        question:
          'HiTech City vs old Hyderabad — does the school cluster you live near affect tutoring?',
        answer:
          'For online live classes, no — your child opens a laptop in HiTech City (Oakridge / CHIREC / Indus catchment) or Banjara Hills / Jubilee Hills (HPS / Silver Oaks Banjara Hills / Glendale catchment) and joins the same Zoom room with the same PhD faculty. The only school-cluster difference is in our coaching calibration: HiTech City schools tend to run faster AP pacing (US-aligned, August–May), while older Hyderabad schools sometimes pair AP with state-board Class 12 prep at a slower pace. We adjust the unit timing accordingly. Same standard, different ramps.',
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
]

/** Helper: lookup metro by slug. */
export function getMetroBySlug(slug: string): APBiologyMetro | undefined {
  return apBiologyMetros.find((m) => m.slug === slug)
}

/** Helper: list of all slugs for generateStaticParams. */
export const apBiologyMetroSlugs = apBiologyMetros.map((m) => m.slug)
