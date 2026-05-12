/**
 * India Biology Olympiad per-school landing-page configurations.
 *
 * Powers /biology-olympiad-tutor-{slug} for the 15 highest-volume
 * NSEB / INBO / OCSC feeder schools across Delhi NCR, Mumbai, and
 * Bangalore — schools where parents actually search by school name
 * plus "biology olympiad coaching" or "NSEB tutor".
 *
 * Cannibalization safety:
 *  - Each entry's primary keyword is "Biology Olympiad tutor
 *    {schoolName}" — a long-tail discriminator that no other page on
 *    the site targets. The generic queries are owned by /nseb-coaching,
 *    /inbo-coaching, and /biology-olympiads. City queries are owned
 *    by /biology-olympiads/india/{city}. School-name long-tail is
 *    this set, and it lives under a distinct /biology-olympiad-tutor-*
 *    namespace separate from /ib-biology-tutor-* and /ap-biology-tutor-*.
 *
 * Content + trademark guardrails:
 *  - Never use logos, seals, or "endorsed by [school]" framing.
 *    Phrasing must be: "NSEB & INBO coaching for {school} students"
 *    or "near {school}" — descriptive, not affiliational.
 *  - Each school carries 800+ words of school-specific content across
 *    historyParagraphs, reputationBullets, olympiadRecord (where
 *    publicly knowable), collegeContext, paceAlignment, and faqs.
 *    We cite "publicly reported", "per Niche", or "per HBCSE annual
 *    report" rather than asserting unsourced figures.
 *  - We do NOT claim a specific school qualifier count unless the
 *    HBCSE INBO results page or the school's own communications have
 *    publicly named that fact.
 */

export interface IndiaOlympiadSchoolFaq {
  question: string
  answer: string
}

export interface IndiaOlympiadSchool {
  /** URL slug suffix — full route is /biology-olympiad-tutor-{slug} */
  slug: string
  /** Full school name */
  schoolName: string
  /** Short display name for hero / breadcrumb */
  shortName: string
  /** City + region (display label) — e.g., "New Delhi", "Gurgaon", "Mumbai", "Bangalore" */
  cityCountry: string
  /** City slug — matches /biology-olympiads/india/{citySlug} when one exists; empty otherwise */
  citySlug: string
  /** School category (drives hero badge copy) */
  schoolType:
    | 'Private International'
    | 'CBSE Premium'
    | 'ICSE Heritage'
    | 'IB Continuum'
    | 'Public Magnet'
    | 'CBSE Heritage'
    | 'IB World School'
    | 'Cambridge International'
  /** 2-4 paragraph history + reputation + olympiad context */
  historyParagraphs: string[]
  /** Key public claims about the school, cited where possible */
  reputationBullets: string[]
  /** Brief school NSEB/INBO record if publicly knowable (HBCSE / school report) */
  olympiadRecord?: string
  /** Where graduates matriculate (IIT, IISc, AIIMS, US T20s, etc.) */
  collegeContext: string
  /** How Cerebrum coaching fits this school's existing biology programme */
  paceAlignment: string
  /** 5-7 school-tailored FAQs (40-80 words each) */
  faqs: IndiaOlympiadSchoolFaq[]
}

export const indiaOlympiadSchools: IndiaOlympiadSchool[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. DPS RK Puram — Delhi Public School RK Puram
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'dps-rk-puram',
    schoolName: 'Delhi Public School RK Puram',
    shortName: 'DPS RK Puram',
    cityCountry: 'New Delhi',
    citySlug: 'delhi',
    schoolType: 'CBSE Heritage',
    historyParagraphs: [
      'Delhi Public School RK Puram, established in 1972 by the DPS Society, is one of the flagship campuses of the DPS family and is consistently ranked among the top CBSE day-cum-boarding schools in the country (publicly reported in the EducationWorld India School Rankings and the Times School Survey). The Sector 12 RK Puram campus runs a large senior-secondary cohort across Science, Commerce, and Humanities streams, with Biology one of the most-elected PCB subjects in Class 11 and 12.',
      "DPS RK Puram has a long-standing reputation in national science olympiads. Per HBCSE's publicly published NSEB / INBO selection lists and the school's own annual achievements communications, DPS RK Puram has been one of the most consistent feeders into the NSEB → INBO → OCSC funnel from North India for over a decade. The school's science department runs internal olympiad orientation alongside the regular NCERT-CBSE syllabus, which means students typically reach Class 11 already exposed to the idea of olympiad-style problem solving.",
      'For DPS RK Puram students, the gap that drives outside olympiad tutoring is rarely motivation — it is depth. School Biology covers NCERT thoroughly and prepares students well for AIIMS / NEET, but NSEB Stage 1 and INBO Stage 2 reward Campbell Biology depth, experimental design intuition, and statistical reasoning on data-analysis questions. Our coaching plugs into that depth gap. Students continue with their school work undisturbed and add a 2-3 hour weekly Campbell-plus-past-paper block on weekends.',
      'Because RK Puram parents come from a very wide South and South-West Delhi catchment — Vasant Vihar, R K Puram, Munirka, Vasant Kunj, Safdarjung Enclave — commute fatigue is real for any after-school activity. Our 100% online format eliminates this. Live small-batch weekend sessions in IST mornings free up the rest of the day for board prep, NEET prep, or downtime, and recordings let students re-watch a complex topic (epistasis, chi-square interpretation, krebs cycle ATP accounting) without losing the live cohort discussion.',
    ],
    reputationBullets: [
      'Flagship DPS Society campus, established 1972 in Sector 12 RK Puram, New Delhi',
      "Consistently ranked among India's top CBSE day-cum-boarding schools (EducationWorld, Times School Survey)",
      'Large Class 11-12 Science cohort with strong PCB representation',
      'One of the most consistent NSEB / INBO feeder schools from North India (per HBCSE publicly published lists)',
      'Strong AIIMS, IIT-JEE, and abroad-admissions outcomes alongside olympiad participation',
      'Internal science olympiad orientation in the senior school',
    ],
    olympiadRecord:
      "DPS RK Puram is named on HBCSE's INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). Multiple students from the school have reached the OCSC training camp historically; specific qualifier counts vary year-to-year and the school's own annual achievements communications carry the year-wise detail.",
    collegeContext:
      'DPS RK Puram graduates matriculate strongly to AIIMS Delhi and other AIIMS campuses, top NEET-rank private medical colleges, IIT (across branches but particularly IIT Delhi for Biotechnology / Biological Sciences), BITS Pilani, IISc Bangalore (for the BS Research programme), and US T20 universities (the Ivy+ band plus Stanford, MIT, Berkeley, Michigan, Carnegie Mellon). Among Biology olympiad qualifiers, the IISc BS Research programme and US biosciences pipelines are particularly common destinations because INBO / IBO performance materially helps the application.',
    paceAlignment:
      "DPS RK Puram's school Biology already covers NCERT Class 11 and 12 in depth. We do not duplicate that. Our coaching layers Campbell Biology depth (cell-respiration ATP accounting, signal transduction, population genetics math) and NSEB past-paper drilling on top of the school's existing programme. The typical RK Puram student takes 1 weekend small-batch block (2-3 hours, Saturday or Sunday morning IST) plus asynchronous WhatsApp doubt resolution. We schedule mock exam blocks to avoid the school's pre-board and CBSE board windows. For students post-NSEB qualification, we add focused INBO practical-skills and data-analysis modules in the December-January window before the INBO exam.",
    faqs: [
      {
        question:
          'Why do DPS RK Puram students need extra biology olympiad coaching when the school is already strong in science?',
        answer:
          'School Biology covers NCERT very well and prepares students for NEET and CBSE boards. The NSEB and INBO papers reward Campbell Biology depth, experimental design intuition, and statistical reasoning that NCERT does not emphasise. Our coaching layers exactly that depth — Campbell chapters, NSEB past papers, data-analysis modules — without duplicating what RK Puram already teaches.',
      },
      {
        question: 'When should a DPS RK Puram student start NSEB preparation?',
        answer:
          'Ideally Class 11 (May / June after Class 10 boards), so the student has 9-10 months of Campbell depth before the NSEB exam in late November / early December of Class 12. Class 12 starts are still workable but compressed; we run a fast-track 6-month programme for late starters that prioritises past-paper drilling and high-yield Campbell chapters.',
      },
      {
        question:
          "Will biology olympiad coaching hurt my child's NEET / AIIMS / board exam preparation at DPS?",
        answer:
          "No. Campbell depth strengthens NEET Biology because the harder NEET-PG-style logic questions in recent years draw from the same depth. Our schedule (2-3 hours per week on weekends) is intentionally compact to fit alongside CBSE pre-boards, NEET coaching, and the school's internal exam cycle. Most of our RK Puram students improve both their NEET score and their olympiad outcomes.",
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 separately or as one programme?',
        answer:
          'As one continuous programme. The Complete Olympiad Year ($4,500 / year) covers both — NSEB Stage 1 MCQ-style preparation runs August through November, and for students who qualify for INBO Stage 2 (early February), we shift into long-form theory questions, experimental design, and the OCSC interview module from December onwards.',
      },
      {
        question: 'Is the coaching online or in-person? Do you have a centre near DPS RK Puram?',
        answer:
          'Live online — small-batch weekend sessions and 1:1 Elite Mentoring blocks both run over Zoom with full recordings. We do have offline centres in Delhi NCR (South Delhi, Gurgaon, Noida) for our NEET programme, but the olympiad coaching is 100% online so students from the wider South / West Delhi RK Puram catchment do not lose time to commute.',
      },
      {
        question: 'How does pricing work for DPS RK Puram families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year (9-12 month full programme, recommended), 1:1 Elite Mentoring $90 / hour (senior tutor, customised), Small-Batch Weekend $50 / hour (4-6 students, Saturday and Sunday). Most RK Puram families opt for the Complete Year with an instalment plan.',
      },
      {
        question: 'Are you affiliated with DPS RK Puram or DPS Society?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Delhi Public School RK Puram or the DPS Society. The school name is used descriptively to indicate the student audience this page is written for. We coach the publicly published NSEB and INBO syllabi (per HBCSE) using publicly available past papers and the Campbell Biology textbook.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Modern School Barakhamba Road
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'modern-school-barakhamba',
    schoolName: 'Modern School Barakhamba Road',
    shortName: 'Modern School Barakhamba',
    cityCountry: 'New Delhi',
    citySlug: 'delhi',
    schoolType: 'CBSE Heritage',
    historyParagraphs: [
      "Modern School, Barakhamba Road, established in 1920 by Lala Raghubir Singh, is one of the oldest and most prestigious schools in Delhi and is among the city's longest-running co-educational senior-secondary schools. The Barakhamba campus is the original heritage campus (the Vasant Vihar campus opened later) and sits in central Delhi between Connaught Place and Mandi House, drawing students from across central and South Delhi.",
      "Modern Barakhamba's senior-school science programme is structured around the CBSE curriculum but with a strong tradition of olympiad participation — the school is named in HBCSE's publicly available NSEB / INBO selection lists in multiple years, and the school's annual prize day communications regularly cite science olympiad finalists across Biology, Chemistry, and Physics. The Biology department runs internal olympiad workshops, and PCB is a popular Class 11-12 stream.",
      'For Modern Barakhamba students, outside biology olympiad coaching typically addresses two gaps. First, depth: Campbell Biology goes well beyond NCERT Class 11-12 in topics like cellular respiration energetics, signal transduction, population genetics, and bioinformatics, and NSEB / INBO papers draw heavily from that extra depth. Second, past-paper rigour: NSEB has 20+ years of past papers, and structured drilling on them under timed conditions is what separates qualifiers from near-misses. Our Complete Olympiad Year programme is built around exactly these two.',
      "Central-Delhi commute patterns mean that Modern Barakhamba students often have a long mid-week schedule — school until late afternoon, NEET or IIT coaching after, and weekend cultural / debating commitments that the school's heritage culture encourages. Our 100% online weekend small-batch sessions are scheduled to fit into Saturday or Sunday morning IST windows, leaving the rest of the weekend open. Session recordings let students catch up after a debate-tournament weekend or a school cultural event without losing the cohort thread.",
    ],
    reputationBullets: [
      "Established 1920 — one of Delhi's oldest senior-secondary schools, on Barakhamba Road, central Delhi",
      'Heritage CBSE co-educational campus with strong PCB tradition',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Internal olympiad workshops run alongside the regular Class 11-12 Biology curriculum',
      "Strong matriculation to St Stephen's, Hindu, AIIMS, IIT, IISc, and US T20 universities",
      'Long debating / Model UN tradition co-exists with science olympiad culture',
    ],
    olympiadRecord:
      "Modern School Barakhamba is named on HBCSE INBO selection lists in multiple years (publicly published on HBCSE's olympiad results pages). The school's annual prize-day announcements cite science olympiad finalists; year-wise qualifier counts vary and are reported in the school's own communications.",
    collegeContext:
      "Modern Barakhamba graduates matriculate strongly to AIIMS Delhi (for medicine), IIT Delhi (Biotech / Biological Sciences), IISc Bangalore (BS Research, particularly attractive for INBO / IBO qualifiers), BITS Pilani, the top Delhi University colleges (St Stephen's, Hindu, LSR for life sciences), and US T20 universities (Ivy+, Stanford, MIT, top liberal arts). The cohort is unusually well-distributed between India and abroad pathways, reflecting the school's bilingual urbane culture.",
    paceAlignment:
      "Modern Barakhamba's school Biology covers NCERT thoroughly and includes internal olympiad orientation. Our coaching adds two specific layers on top: (1) Campbell Biology depth — the chapters that NCERT does not cover at the same density (signal transduction, advanced respiration, population genetics math, bioinformatics basics); and (2) NSEB past-paper drilling under timed conditions, with a topic-wise error log so the student sees their own weak chapters quantitatively. Weekend small-batch (Saturday or Sunday morning IST) is the most common schedule. Students who clear NSEB shift into INBO long-form theory and OCSC practical-skills work in the December-January window.",
    faqs: [
      {
        question:
          "How does Modern Barakhamba's in-school olympiad orientation compare to dedicated outside coaching?",
        answer:
          "The school's internal orientation is helpful for awareness and motivation, and we recommend students attend it. Dedicated outside coaching adds two things the school cannot scale: structured Campbell Biology depth across 20+ chapters over 9 months, and timed past-paper drilling with topic-wise error analysis on every paper. Most NSEB qualifiers from Modern Barakhamba combine both.",
      },
      {
        question: 'When should a Modern Barakhamba student start biology olympiad coaching?',
        answer:
          'Class 11 is ideal — start in May / June after Class 10 boards, so the student has 9-10 months of Campbell depth and past-paper practice before the NSEB exam in late November / early December of Class 12. Class 12 late starts are workable but compressed; we run a 6-month fast-track programme for those students.',
      },
      {
        question:
          'Will biology olympiad preparation conflict with NEET coaching for Modern Barakhamba students?',
        answer:
          'No — they reinforce each other. Campbell depth strengthens NEET Biology because the harder NEET assertion-reason and case-based items draw from the same depth that NSEB rewards. The 2-3 hour weekly olympiad block sits on weekends, which is when most students do NEET self-study rather than NEET classes, so the schedules do not collide.',
      },
      {
        question: 'Do you coach both NSEB Stage 1 and INBO Stage 2?',
        answer:
          'Yes — as one continuous programme. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 MCQ-style preparation August through November, then for qualifiers shifts into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep from December through February.',
      },
      {
        question:
          'Is the coaching online or in-person? Modern Barakhamba is in central Delhi — do you have a CP centre?',
        answer:
          'Olympiad coaching is 100% live online — we do not run an offline olympiad centre in CP / central Delhi specifically. We do have offline NEET centres in South Delhi, Gurgaon, and Noida, but the olympiad programme is online so central-Delhi families avoid commute fatigue. Live small-batch sessions plus full recordings on Zoom.',
      },
      {
        question: 'How does pricing work for Modern Barakhamba families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students, Saturday and Sunday morning IST). Most families opt for the Complete Year with a 3 or 4-instalment plan.',
      },
      {
        question: 'Are you affiliated with Modern School Barakhamba?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Modern School, the Modern School Society, or any branch campus. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers and Campbell Biology.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Sanskriti School
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'sanskriti-school-delhi',
    schoolName: 'Sanskriti School',
    shortName: 'Sanskriti School',
    cityCountry: 'New Delhi',
    citySlug: 'delhi',
    schoolType: 'CBSE Premium',
    historyParagraphs: [
      "Sanskriti School, located in Chanakyapuri, New Delhi, was established in 1998 by the Civil Services Society and is one of the city's most academically rigorous CBSE-affiliated schools. The school's central New Delhi location, in the diplomatic and administrative heart of the city, draws students from the civil-services, diplomatic, and academic communities — a cohort that tends toward high-engagement parents and high-expectation students.",
      "Sanskriti's senior-school science programme is small but academically deep. Per the school's own annual academic communications and publicly available HBCSE selection lists, Sanskriti students appear regularly in NSEB / INBO qualifier lists, and the school has a steady record of national-level science olympiad participation across Biology, Chemistry, Physics, and Mathematics. The Biology department runs internal preparation workshops in the lead-up to the NSEB cycle each year.",
      "For Sanskriti students, the gap that drives outside biology olympiad coaching is depth-and-pace. The school's curriculum is rigorous but the NSEB / INBO papers reward Campbell Biology chapter-by-chapter depth that the CBSE syllabus does not cover at the same density. Our Complete Olympiad Year programme is built around that exact mismatch — we add Campbell depth, structured past-paper drilling, and statistical-reasoning modules on top of what the school already does.",
      "Sanskriti's small cohort and the academic intensity of its parent community mean that students typically engage tutoring earlier than the average DPS or DAV student — many families come to us in Class 10 summer with the Class 11 NSEB cycle already on their radar. Our 100% online format works well for this cohort because it integrates with the existing tutoring ecosystem (NEET coaching, Olympiad maths, debate) that Chanakyapuri families typically already run. Live small-batch weekend sessions, plus recordings, plus WhatsApp doubt resolution.",
    ],
    reputationBullets: [
      'Established 1998 by the Civil Services Society — Chanakyapuri, central New Delhi',
      'Small, academically rigorous CBSE-affiliated co-educational school',
      'Cohort drawn from civil-services, diplomatic, and academic communities',
      'Regularly named on HBCSE NSEB / INBO selection lists (publicly available)',
      'Strong matriculation to AIIMS, IIT, IISc, top Delhi University colleges, and US / UK universities',
      'Internal olympiad workshops in the senior school',
    ],
    olympiadRecord:
      "Sanskriti School is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual academic communications cite NSEB / INBO qualifiers; specific year-wise counts are reported in those communications.",
    collegeContext:
      "Sanskriti graduates matriculate to AIIMS Delhi (medicine), IIT Delhi / Bombay (Biotech, Bioengineering, BS Biological Sciences), IISc Bangalore (BS Research — particularly attractive for INBO / IBO qualifiers), BITS Pilani, top Delhi University colleges (St Stephen's, Hindu, Miranda, LSR), Ashoka University (popular for the liberal arts and biology combo), and US / UK universities (Ivy+, Oxbridge, Imperial, top liberal arts). The diplomatic / civil-services parent profile means abroad applications are unusually common for the cohort size.",
    paceAlignment:
      "Sanskriti's school Biology already covers NCERT well and includes internal olympiad workshops. Our coaching adds Campbell Biology depth and structured NSEB past-paper drilling — the two things the school cannot scale at individual student level. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. Students post-NSEB qualification shift into INBO long-form theory and OCSC practical-skills work from December through February. We coordinate around the school's pre-board calendar and the NEET coaching cycle that most students also follow.",
    faqs: [
      {
        question:
          'Sanskriti already runs internal olympiad workshops — do students still benefit from outside coaching?',
        answer:
          'Yes. The school workshops are helpful for awareness and the early-stage syllabus mapping. Outside coaching adds two things the school cannot scale: 9 months of structured Campbell Biology depth across 20+ chapters, and timed past-paper drilling with individual topic-wise error analysis. Most Sanskriti NSEB qualifiers combine both — the school workshop sets the stage and our coaching does the drilling.',
      },
      {
        question: 'When should a Sanskriti student start biology olympiad coaching?',
        answer:
          'Many Sanskriti families come to us in the Class 10 summer with the Class 11 NSEB cycle in mind. That is the ideal start. Class 11 May / June is also fine. Class 12 starts are workable but compressed — we run a 6-month fast-track programme that prioritises past-paper drilling and the highest-yield Campbell chapters.',
      },
      {
        question:
          'Can my Sanskriti child do biology olympiad coaching alongside Olympiad Maths (RMO / INMO) or Olympiad Chemistry?',
        answer:
          'Yes, with care. Our weekend small-batch (2-3 hours, Saturday or Sunday morning IST) is intentionally compact to fit alongside other olympiad coaching. We coordinate with the family on the total weekly load — most multi-olympiad Sanskriti students do biology weekends, chemistry weeknights, and maths self-study, which keeps any single day under 3 hours of coaching.',
      },
      {
        question: 'Do you coach for both NSEB Stage 1 and INBO Stage 2?',
        answer:
          'Yes — as one continuous programme. The Complete Olympiad Year ($4,500) runs NSEB Stage 1 prep August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep from December through February.',
      },
      {
        question: 'Is the coaching online or in-person?',
        answer:
          '100% live online — Zoom small-batch and 1:1 Elite Mentoring sessions with full recordings. We have NEET offline centres in South Delhi (closest to Chanakyapuri), Gurgaon, and Noida, but the olympiad coaching is online so families avoid mid-week commute fatigue.',
      },
      {
        question: 'How does pricing work for Sanskriti families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). Most Sanskriti families opt for the Complete Year with a 3 or 4-instalment plan.',
      },
      {
        question: 'Are you affiliated with Sanskriti School?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Sanskriti School or the Civil Services Society. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers and Campbell Biology.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Vasant Valley School
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'vasant-valley-school',
    schoolName: 'Vasant Valley School',
    shortName: 'Vasant Valley',
    cityCountry: 'New Delhi',
    citySlug: 'delhi',
    schoolType: 'CBSE Premium',
    historyParagraphs: [
      'Vasant Valley School, established in 1990, is a co-educational CBSE-affiliated K-12 school in Vasant Kunj, South Delhi. The school is widely regarded as one of the most academically and culturally rigorous private schools in the National Capital Region (publicly reported in EducationWorld and the Times School Rankings) and serves a high-engagement South Delhi parent community. The campus combines a strong academic programme with an unusually deep arts, sports, and outdoor-education tradition.',
      "Vasant Valley's senior-school science programme is small relative to large CBSE schools — cohorts of 25-50 PCB students per year is typical — which makes for an intense, discussion-led classroom culture. The school's Biology faculty regularly orient interested students to the NSEB / INBO pathway. Per HBCSE's publicly available selection lists, Vasant Valley students appear in NSEB / INBO qualifier rosters in multiple years, and the school's own annual communications cite olympiad finalists across science and mathematics.",
      'Many Vasant Valley families also explore IB Diploma options for senior school (the school itself is CBSE), and a meaningful subset of students dual-track olympiad preparation with abroad-admission preparation. This shapes how the cohort thinks about biology olympiads — not just as an end in itself, but as a depth-builder that materially helps US / UK biosciences applications. Our coaching is olympiad-syllabus-aligned and we make that abroad-app-utility connection explicit during the year.',
      'The South Delhi commute pattern — Vasant Kunj, Vasant Vihar, Saket, Greater Kailash, Defence Colony, and the IIT Delhi residential ring — means most Vasant Valley parents are sensitive to after-school commute fatigue. Our 100% online live small-batch weekend format is built for this. Saturday or Sunday morning IST sessions free up the rest of the weekend; full recordings cover missed sessions during family travel or sports tournaments; WhatsApp doubt resolution within 24 hours keeps momentum between sessions.',
    ],
    reputationBullets: [
      'Established 1990, co-educational CBSE-affiliated K-12 school in Vasant Kunj, South Delhi',
      "Among Delhi's most academically and culturally rigorous private schools (per EducationWorld / Times rankings)",
      'Small senior-school PCB cohort with high per-student attention',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Strong matriculation to AIIMS, IIT, IISc, Ashoka, US T20s, and Oxbridge / UK Russell Group',
      'Deep arts, sports, and outdoor-education tradition alongside academic rigour',
    ],
    olympiadRecord:
      "Vasant Valley School is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual achievements communications cite olympiad finalists; specific qualifier counts are reported in the school's own materials.",
    collegeContext:
      "Vasant Valley graduates matriculate to AIIMS Delhi, IIT Delhi / Bombay (Biotech, Bioengineering, BS Biological Sciences), IISc Bangalore (BS Research — INBO / IBO qualifiers find this particularly attractive), BITS Pilani, top Delhi University colleges, Ashoka University (a popular destination for the school's liberal arts-inclined cohort), and US / UK universities (Ivy+, Stanford, MIT, Oxbridge, Imperial, top liberal arts). The cohort splits roughly evenly between India and abroad pathways, with the abroad share noticeably above the average CBSE school.",
    paceAlignment:
      "Vasant Valley's school Biology is rigorous and discussion-led but the NSEB / INBO papers require Campbell Biology depth and structured past-paper drilling that the small class size simply cannot scale individually. Our coaching adds those two layers on top. The standard schedule is a weekend small-batch block (2-3 hours, Saturday or Sunday morning IST). For students dual-tracking abroad applications, we coordinate with the family's college counsellor so the olympiad work explicitly supports the US / UK biosciences application narrative. Post-NSEB qualifiers shift into INBO and OCSC prep from December through February.",
    faqs: [
      {
        question:
          'My Vasant Valley child is also preparing US college applications — does biology olympiad coaching help that?',
        answer:
          'Yes, materially. INBO / OCSC / IBO performance is one of the strongest pre-college biology signals US T20s and top liberal arts read. Even NSEB-only completion with a strong score, framed as a structured biology research-orientation experience, helps. We coordinate with your college counsellor so the olympiad work appears coherently in the application narrative — coursework, supplementals, and recommendations.',
      },
      {
        question: 'When should a Vasant Valley student start biology olympiad coaching?',
        answer:
          'Class 11 May / June is ideal — 9-10 months before the NSEB Stage 1 exam in late November / early December of Class 12. Many Vasant Valley families also start in the Class 10 summer to use the gap year time productively. Class 12 late starts work but are compressed; we offer a 6-month fast-track for those students.',
      },
      {
        question:
          "Vasant Valley's cohort is small — will my child find peers in your small-batch programme?",
        answer:
          'Yes. Our Small-Batch Weekend ($50 / hour, 4-6 students) draws from across Delhi NCR and beyond, so Vasant Valley students sit alongside peers from DPS RK Puram, Sanskriti, Modern, Shri Ram, Pathways, and other schools. That diversity matters — peer discussion across school cultures tends to deepen olympiad-style problem solving.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 in one programme?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep from December through February.',
      },
      {
        question:
          'Is the coaching online or in-person? Is there a Vasant Kunj / South Delhi centre?',
        answer:
          'Olympiad coaching is 100% live online — Zoom small-batch and 1:1 Elite Mentoring with full recordings. We have NEET offline centres in South Delhi (closest to Vasant Kunj), but the olympiad programme is online to eliminate commute fatigue.',
      },
      {
        question: 'How does pricing work for Vasant Valley families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students, Saturday and Sunday). Most Vasant Valley families opt for the Complete Year or a hybrid (Small-Batch + occasional 1:1 Elite hours).',
      },
      {
        question: 'Are you affiliated with Vasant Valley School?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Vasant Valley School. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers and Campbell Biology.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Mother's International School
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'mothers-international-school',
    schoolName: "Mother's International School",
    shortName: "Mother's International",
    cityCountry: 'New Delhi',
    citySlug: 'delhi',
    schoolType: 'CBSE Heritage',
    historyParagraphs: [
      "Mother's International School, established in 1956 by the Sri Aurobindo Education Society, is one of the oldest co-educational CBSE-affiliated schools in South Delhi. The Hauz Khas campus is set on a large green site next to the Aurobindo Marg ashram, and the school is consistently ranked among Delhi's top heritage CBSE schools (per EducationWorld and the Times School Survey). The school's philosophy explicitly emphasises depth of learning over surface-coverage — a pedagogy that aligns unusually well with olympiad-style problem solving.",
      "Mother's International has a strong Biology faculty and a long-standing PCB tradition. The school is named on HBCSE's publicly available NSEB / INBO selection lists in multiple years, and the school's annual prize-day communications cite science olympiad finalists. Class 11-12 Biology cohorts are sizeable, and a meaningful share of PCB students sit the NSEB each year as part of the school's encouragement of science olympiad participation.",
      "For Mother's International students, outside biology olympiad coaching plugs three specific gaps. First, Campbell Biology depth — the chapters NCERT does not cover at the same density (signal transduction, advanced respiration, population genetics math, bioinformatics, experimental design). Second, NSEB past-paper rigour under timed conditions with topic-wise error analysis. Third, the INBO-Stage-2 transition — long-form theory and experimental-design writing that NCERT does not require. Our Complete Olympiad Year programme is structured around exactly these three.",
      "The Hauz Khas / South Delhi commute pattern means most Mother's International parents are commute-sensitive, especially in mid-week. Our 100% online live small-batch weekend format is designed for this. Saturday or Sunday morning IST blocks, full recordings for missed sessions, and WhatsApp doubt resolution within 24 hours keep momentum across the 9-month NSEB cycle. The compact 2-3 hour weekly load fits alongside the school's own academic and co-curricular calendar.",
    ],
    reputationBullets: [
      'Established 1956 by the Sri Aurobindo Education Society — Hauz Khas, South Delhi',
      'Heritage CBSE co-educational school with strong PCB tradition',
      "Consistently ranked among Delhi's top CBSE schools (EducationWorld, Times School Survey)",
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Educational philosophy emphasises depth over surface-coverage — aligns naturally with olympiad pedagogy',
      'Strong matriculation to AIIMS, IIT, IISc, Delhi University, and US / UK universities',
    ],
    olympiadRecord:
      "Mother's International School is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual prize-day communications cite olympiad finalists; specific year-wise qualifier counts are reported there.",
    collegeContext:
      "Mother's International graduates matriculate strongly to AIIMS Delhi (medicine), IIT Delhi (Biotech / Biological Sciences), IISc Bangalore (BS Research — particularly attractive for INBO / IBO qualifiers), BITS Pilani, top Delhi University colleges (St Stephen's, Hindu, LSR, Miranda), Ashoka University, and US / UK universities (Ivy+, Stanford, MIT, Oxbridge, Imperial). The school's depth-of-learning philosophy produces students who land well in research-oriented undergraduate programmes.",
    paceAlignment:
      "Mother's International school Biology is academically deep but the NSEB / INBO papers require Campbell-level depth and structured past-paper drilling that the school's classroom format cannot scale individually. Our coaching layers these on top — weekend small-batch (Saturday or Sunday morning IST), Campbell chapters paced from August through November before the NSEB exam, and INBO long-form theory plus OCSC practical-skills work for qualifiers from December through February. We coordinate around the school's pre-board windows and the NEET coaching most students also run.",
    faqs: [
      {
        question:
          "Mother's International emphasises depth of learning — how does that interact with NSEB / INBO prep?",
        answer:
          'It interacts very well. The school\'s depth-of-learning culture means students arrive at olympiad coaching with the cognitive habit of asking "why" rather than just "what" — which is exactly what NSEB and especially INBO reward. We build on that habit with Campbell Biology depth and structured experimental-design practice that the school cannot scale individually.',
      },
      {
        question: "When should a Mother's International student start biology olympiad coaching?",
        answer:
          'Class 11 May / June is ideal — 9-10 months before the NSEB Stage 1 exam in late November / early December of Class 12. Class 10 summer starts are also workable. Class 12 late starts are compressed; we offer a 6-month fast-track that prioritises past-paper drilling and high-yield Campbell chapters.',
      },
      {
        question:
          "Does biology olympiad coaching help with NEET preparation for Mother's International students?",
        answer:
          'Yes — Campbell depth directly strengthens NEET Biology. The harder NEET assertion-reason, case-based, and "Statement 1 / Statement 2" items in recent years draw from the same depth that NSEB rewards. Most Mother\'s International students improve both their NEET score and their NSEB outcomes when they do the olympiad work seriously.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes, as one continuous programme. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep from December through February.',
      },
      {
        question: 'Is the coaching online or in-person? Is there a Hauz Khas centre?',
        answer:
          "Olympiad coaching is 100% live online — Zoom small-batch and 1:1 Elite Mentoring with full recordings. We have NEET offline centres in South Delhi (closest to Hauz Khas), but the olympiad programme is online so Mother's International families do not commute mid-week.",
      },
      {
        question: "How does pricing work for Mother's International families?",
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). Most families opt for the Complete Year with a 3 or 4-instalment plan.',
      },
      {
        question: "Are you affiliated with Mother's International School?",
        answer:
          "No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Mother's International School or the Sri Aurobindo Education Society. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers and Campbell Biology.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Sardar Patel Vidyalaya
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'sardar-patel-vidyalaya',
    schoolName: 'Sardar Patel Vidyalaya',
    shortName: 'Sardar Patel Vidyalaya',
    cityCountry: 'New Delhi',
    citySlug: 'delhi',
    schoolType: 'CBSE Heritage',
    historyParagraphs: [
      "Sardar Patel Vidyalaya, established in 1957 and located on Lodi Estate in central New Delhi, is one of the city's most academically rigorous heritage CBSE schools. The school's bilingual ethos (Hindi and English as parallel mediums) and its emphasis on Gandhian values of service, simplicity, and depth-of-character have produced a generations-long alumni network across academia, civil service, journalism, and the sciences. The school is consistently named in Delhi's top heritage-school cohort by EducationWorld and the Times School Survey.",
      "SPV's senior-school science programme is small and academically intense, with cohorts of 25-50 PCB students per year typical. The school is named in HBCSE's publicly available NSEB / INBO selection lists in multiple years, and the school's annual prize-day communications regularly cite science olympiad finalists across Biology, Chemistry, Physics, and Mathematics. SPV's culture rewards intellectual depth — students who pursue olympiads tend to do so for genuine interest rather than CV-building, which improves coaching outcomes materially.",
      "For SPV students, outside biology olympiad coaching plugs two gaps. First, depth: Campbell Biology goes well beyond CBSE Class 11-12 in topics like cellular respiration energetics, signal transduction, population genetics, and experimental design, and NSEB / INBO papers draw heavily from that depth. Second, the INBO-Stage-2 transition: long-form theory and experimental-design writing under exam conditions — a skill the school's case-discussion-led classroom builds the foundation for but cannot scale individually across 9 months. Our Complete Olympiad Year covers both.",
      "Lodi Estate and the South-Central Delhi commute pattern (Jor Bagh, Khan Market, Defence Colony, Lajpat Nagar, Greater Kailash) is dense in mid-week, so commute-sensitive families default to weekend coaching. Our 100% online live small-batch weekend format is built for this — Saturday or Sunday morning IST, full recordings, WhatsApp doubt resolution within 24 hours. The compact 2-3 hour weekly load sits comfortably alongside SPV's own academic and co-curricular calendar.",
    ],
    reputationBullets: [
      'Established 1957 — Lodi Estate, central New Delhi',
      'Bilingual Hindi-English co-educational CBSE heritage school',
      'Gandhian values-driven academic philosophy — service, simplicity, depth-of-character',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      "Strong matriculation to St Stephen's, Hindu, AIIMS, IIT, IISc, JNU, and US / UK universities",
      'Generations-long alumni network across academia, civil service, journalism, and the sciences',
    ],
    olympiadRecord:
      "Sardar Patel Vidyalaya is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual prize-day communications cite olympiad finalists; specific year-wise qualifier counts are reported in the school's own materials.",
    collegeContext:
      "SPV graduates matriculate strongly to St Stephen's, Hindu, LSR (top Delhi University colleges), AIIMS Delhi (medicine), IIT Delhi (Biotech / Biological Sciences), IISc Bangalore (BS Research — INBO / IBO qualifiers find this particularly attractive), BITS Pilani, JNU, Ashoka University, and US / UK universities (Ivy+, Stanford, MIT, Oxbridge, Imperial). The cohort skews more strongly toward Delhi University and Indian liberal-arts pathways than other premium Delhi schools — a function of the school's culture.",
    paceAlignment:
      "SPV's school Biology is academically deep and discussion-led but the small class size cannot scale individual past-paper drilling at NSEB / INBO scale. Our coaching adds Campbell Biology depth across 20+ chapters from August through November, structured NSEB past-paper drilling with topic-wise error analysis, and INBO long-form theory plus OCSC practical-skills work for qualifiers from December through February. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around the school's pre-board windows.",
    faqs: [
      {
        question:
          'SPV is known for academic depth — what exactly does outside biology olympiad coaching add?',
        answer:
          'Two things the school cannot scale at individual student level. First, 9 months of structured Campbell Biology depth across 20+ chapters (NCERT does not cover these at the same density). Second, timed NSEB past-paper drilling with topic-wise error analysis for every paper — the volume of past papers required (20+ years of NSEB) is simply not classroom-deliverable.',
      },
      {
        question: 'When should an SPV student start biology olympiad coaching?',
        answer:
          'Class 11 May / June is ideal — 9-10 months before NSEB Stage 1 in late November / early December of Class 12. Class 10 summer starts also work. Class 12 late starts are compressed; we run a 6-month fast-track that focuses on past-paper drilling and high-yield Campbell chapters.',
      },
      {
        question: 'My child is bilingual at SPV (Hindi and English) — is your coaching in English?',
        answer:
          'Sessions are conducted in English (the NSEB and INBO papers are in English), but our faculty handle Hindi-medium technical-term clarification freely when needed. WhatsApp doubt resolution is available in Hindi or English — most SPV students prefer Hindi for quick clarifications and English for written practice. The NSEB / INBO papers themselves are English-only so written practice is English.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep from December through February.',
      },
      {
        question:
          'Is the coaching online or in-person? Is there a Lodi Estate / Khan Market centre?',
        answer:
          'Olympiad coaching is 100% live online — Zoom small-batch and 1:1 Elite Mentoring with full recordings. We have NEET offline centres in South Delhi (the closest to Lodi Estate is the South Delhi centre), but the olympiad programme is online to eliminate commute fatigue.',
      },
      {
        question: 'How does pricing work for SPV families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students, Saturday and Sunday). Most SPV families opt for the Complete Year with a 3 or 4-instalment plan.',
      },
      {
        question: 'Are you affiliated with Sardar Patel Vidyalaya?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Sardar Patel Vidyalaya or its trust. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers and Campbell Biology.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. Pathways World School Aravali
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'pathways-world-school-aravali',
    schoolName: 'Pathways World School Aravali',
    shortName: 'Pathways Aravali',
    cityCountry: 'Gurgaon',
    citySlug: 'gurugram',
    schoolType: 'IB Continuum',
    historyParagraphs: [
      "Pathways World School Aravali, established in 2003 by the Pathways group, is a co-educational IB World School set on a 30-acre boarding campus in the Aravali Hills, Gurgaon. The school runs the full IB Continuum (PYP-MYP-DP) and has built a reputation over two decades as one of North India's premier IB Diploma schools with a strong sciences track (publicly reported in EducationWorld's international school rankings and in the school's annual IB diploma communications).",
      "Pathways Aravali's senior-school science programme is unusual in the Indian olympiad landscape because the school is IB-DP rather than CBSE — but a meaningful subset of its DP Biology students also sit the NSEB each year, treating the olympiad as a complement to IB Biology depth and an extra signal for India and abroad biosciences applications. The school's faculty publicly support olympiad participation, and Pathways Aravali is named on HBCSE NSEB / INBO selection lists in multiple years.",
      'For Pathways Aravali students, biology olympiad coaching plays a slightly different role than at a typical CBSE school. IB Biology HL already builds substantial depth — cellular respiration energetics, signal transduction, population genetics — and the gap is more about NSEB-specific format (90-minute MCQ pace, breadth of NCERT-style chapters that IB does not cover, e.g. Indian biodiversity classification details). Our coaching layers exactly that — NSEB format drilling, NCERT-coverage chapters, and INBO long-form theory practice — on top of the IB depth.',
      "Pathways Aravali's residential boarding pattern (most students are full-time residents on the Aravali campus) means evening study time is fairly structured. Our 100% live online weekend small-batch format works well — Saturday or Sunday morning IST sessions fit into the boarding-school weekend schedule, full recordings cover residential schedule conflicts (CAS trips, sport tournaments), and asynchronous WhatsApp doubt resolution keeps the cohort connected between sessions.",
    ],
    reputationBullets: [
      'Established 2003 — 30-acre boarding campus in the Aravali Hills, Gurgaon',
      'Co-educational IB World School running the full Continuum (PYP-MYP-DP)',
      "One of North India's premier IB Diploma schools (per EducationWorld rankings)",
      'Strong DP Biology track — HL and SL both run with full lab support',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Faculty support olympiad participation alongside the IB Diploma programme',
    ],
    olympiadRecord:
      "Pathways World School Aravali is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual diploma communications cite olympiad finalists; year-wise qualifier counts are reported there.",
    collegeContext:
      'Pathways Aravali graduates matriculate strongly to US T20 universities (Ivy+, Stanford, MIT, top liberal arts), UK Oxbridge / Imperial / Russell Group, Canadian universities (Toronto, McGill, UBC), Australian Group of Eight (Melbourne, Sydney, ANU), and selectively to Indian top-tier programmes (Ashoka, BITS Pilani, IISc BS Research for olympiad qualifiers). The IB Diploma cohort skews more strongly abroad than the average North Indian CBSE school.',
    paceAlignment:
      "Pathways Aravali students come into olympiad coaching with IB Biology HL depth already in progress — which means our coaching focuses on NSEB-specific format, NCERT-coverage chapters that IB does not include (Indian biodiversity classification, NEET-style chapters), and INBO long-form theory plus experimental design. Weekend small-batch (Saturday or Sunday morning IST) fits the boarding-school weekend schedule. We coordinate around the school's DP1 IA submission cycle and DP2 mock exam windows. Post-NSEB qualifiers shift into INBO and OCSC prep from December through February.",
    faqs: [
      {
        question:
          'My Pathways Aravali child is doing IB Biology HL — why also do biology olympiad coaching?',
        answer:
          'Three reasons. First, NSEB / INBO performance is a strong pre-college biology signal for US / UK biosciences applications — meaningful beyond the IB Diploma alone. Second, the olympiad-style problem solving (data analysis, experimental design) directly strengthens IB Biology Paper 2 long-response performance. Third, for students considering Indian routes (IISc BS Research, AIIMS via NEET) the olympiad work adds real depth.',
      },
      {
        question:
          'How is your coaching different for IB-track Pathways Aravali students versus CBSE-track students from other schools?',
        answer:
          'IB-track students arrive with depth on cellular respiration, signal transduction, and population genetics already underway, so we spend less time on those and more on NSEB-specific format, NCERT-coverage chapters (Indian biodiversity, plant taxonomy detail), and INBO long-form theory writing. CBSE-track students get the reverse emphasis. The Small-Batch Weekend mixes both — peer discussion across school cultures helps.',
      },
      {
        question: 'When should a Pathways Aravali student start biology olympiad coaching?',
        answer:
          'For DP1 students aiming at the NSEB cycle in late November / early December of DP2, start in May / June of DP1 — 9-10 months out. For MYP5 students considering early NSEB attempts, talk to us — early NSEB participation can work for unusually motivated students.',
      },
      {
        question:
          'Does biology olympiad work fit with the residential boarding schedule at Pathways Aravali?',
        answer:
          'Yes. Our weekend small-batch (Saturday or Sunday morning IST, 2-3 hours) fits boarding-school weekend windows. Full recordings cover boarding-schedule conflicts (CAS trips, sport tournaments, Project Week). WhatsApp doubt resolution within 24 hours.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes — as one continuous programme. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep from December through February.',
      },
      {
        question: 'How does pricing work for Pathways Aravali families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). Most Pathways Aravali families opt for the Complete Year or a hybrid plan.',
      },
      {
        question: 'Are you affiliated with Pathways World School Aravali or the Pathways group?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Pathways World School Aravali, the Pathways group, or the International Baccalaureate Organization. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. The Shri Ram School Aravali
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'shri-ram-school-aravali',
    schoolName: 'The Shri Ram School Aravali',
    shortName: 'TSRS Aravali',
    cityCountry: 'Gurgaon',
    citySlug: 'gurugram',
    schoolType: 'IB Continuum',
    historyParagraphs: [
      "The Shri Ram School, Aravali, established in 2003, is the senior-school campus of The Shri Ram School (Moulsari is the junior-school campus in Gurgaon and Vasant Vihar is the Delhi campus). The Aravali campus runs the IGCSE and IB Diploma programme and is consistently named among India's top international schools (publicly reported by EducationWorld and the Times School Rankings). The school's pedagogical culture combines academic rigour with a strong arts, music, and theatre programme — a culture that historically produces unusually well-rounded olympiad candidates.",
      "TSRS Aravali's IB Diploma Biology programme runs HL and SL streams with full Section 6 laboratory support, and a meaningful subset of DP Biology students also sit the NSEB each year as a complementary signal. Per HBCSE's publicly available selection lists, TSRS Aravali is named on NSEB / INBO qualifier rosters in multiple years, and the school's annual diploma communications cite olympiad finalists. Several alumni have qualified for INBO Stage 2 and reached the OCSC training camp historically.",
      "For TSRS Aravali students, biology olympiad coaching builds on the strong IB Biology HL foundation the school already provides. The gap is NSEB-specific format (90-minute MCQ pace, NCERT-coverage chapters like Indian biodiversity classification that IB does not include), plus INBO long-form theory writing under exam conditions. Our coaching is structured to layer those specifically on top of the school's IB programme without duplicating effort. Most TSRS students take a Saturday or Sunday morning IST small-batch slot and add 1:1 Elite Mentoring hours in the pre-NSEB month if they want score optimisation.",
      'The Gurgaon residential pattern (Aravali Hills, DLF Phase 1-5, Golf Course Road, Sohna Road) means most TSRS Aravali parents are commute-sensitive. Our 100% online live small-batch weekend format works well — Saturday or Sunday morning IST, full recordings for missed sessions (CAS trips, sport tournaments, family travel), and WhatsApp doubt resolution within 24 hours. The compact weekly load fits alongside the IB DP workload (six subjects + EE + IAs + TOK + CAS).',
    ],
    reputationBullets: [
      'Established 2003 — Aravali Hills, Gurgaon (senior campus of The Shri Ram School)',
      'Co-educational IGCSE + IB Diploma school',
      "Consistently named among India's top international schools (EducationWorld, Times)",
      'Strong DP Biology HL programme with full Section 6 lab support',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Long history of OCSC training-camp participation among IBO / INBO qualifiers',
    ],
    olympiadRecord:
      "TSRS Aravali is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual diploma communications cite olympiad finalists; year-wise qualifier counts are reported there.",
    collegeContext:
      'TSRS Aravali graduates matriculate strongly to US T20 universities (Ivy+, Stanford, MIT, top liberal arts), UK Oxbridge / Imperial / Russell Group, Canadian universities (Toronto, McGill, UBC), Australian Group of Eight, and selectively to Indian top-tier programmes (Ashoka, BITS Pilani, IISc BS Research — particularly attractive for INBO / IBO qualifiers). The IB Diploma cohort splits roughly evenly between abroad and India, with the abroad share slightly higher.',
    paceAlignment:
      "TSRS Aravali students come into olympiad coaching with IB Biology HL depth already underway — our coaching focuses on NSEB-specific format, NCERT-coverage chapters that IB does not include, and INBO long-form theory plus experimental design. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around the school's DP1 IA submission cycle, DP2 mock exam windows, and the school's strong arts / theatre calendar. Post-NSEB qualifiers shift into INBO and OCSC prep from December through February.",
    faqs: [
      {
        question:
          'My TSRS Aravali child is doing IB Biology HL — what does NSEB / INBO coaching add?',
        answer:
          'It adds three things. First, NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters like Indian biodiversity classification that IB does not include). Second, INBO long-form theory writing under exam conditions. Third, the signal value — INBO / OCSC / IBO performance is a strong pre-college biology marker for US / UK biosciences applications, meaningful beyond the IB Diploma score alone.',
      },
      {
        question:
          'How is your coaching different for TSRS Aravali (IB-track) versus CBSE-track students?',
        answer:
          'IB-track students arrive with cellular-respiration, signal-transduction, and population-genetics depth already underway, so we spend less time there and more on NSEB-specific format, NCERT chapters, and INBO long-form theory. CBSE students get the reverse emphasis. Small-Batch Weekend mixes both — peer discussion across school cultures helps.',
      },
      {
        question: 'When should a TSRS Aravali student start biology olympiad coaching?',
        answer:
          'For DP1 students aiming at the NSEB cycle in late November / early December of DP2, start in May / June of DP1 — 9-10 months out. For unusually motivated MYP5 students, early NSEB participation can work; talk to us for a fit assessment.',
      },
      {
        question:
          'Does the olympiad workload fit with IB DP load (six subjects, EE, IAs, TOK, CAS) for TSRS students?',
        answer:
          'Yes — our weekend small-batch (2-3 hours, Saturday or Sunday morning IST) is intentionally compact. Most TSRS Aravali students absorb it as a structured Saturday morning routine. We coordinate around IA submission deadlines and DP2 mock windows so the olympiad work does not collide with school-internal due dates.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes — one continuous programme. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep December through February.',
      },
      {
        question: 'How does pricing work for TSRS Aravali families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). Most TSRS Aravali families opt for the Complete Year or a hybrid plan.',
      },
      {
        question: 'Are you affiliated with The Shri Ram School?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with The Shri Ram School (Aravali, Moulsari, or Vasant Vihar campuses), the Shri Educare network, or the International Baccalaureate Organization. The school name is used descriptively to indicate the audience this page is written for.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. Heritage Xperiential Learning School
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'heritage-xperiential-learning-school',
    schoolName: 'Heritage Xperiential Learning School',
    shortName: 'Heritage Xperiential',
    cityCountry: 'Gurgaon',
    citySlug: 'gurugram',
    schoolType: 'IB Continuum',
    historyParagraphs: [
      "Heritage Xperiential Learning School, established in 2003 by The Shri Ram Group, is an IB World School in Sector 62, Gurgaon, running the PYP, MYP, and IB Diploma Programmes. The school's pedagogical philosophy is built around experiential, inquiry-driven learning — laboratory work, project-based science, and field studies feature heavily across the curriculum (publicly reported in the school's curriculum communications and EducationWorld coverage).",
      "Heritage's IB Diploma Biology programme runs HL and SL streams with full Section 6 laboratory support and an unusually strong emphasis on student-driven scientific inquiry. A meaningful subset of DP Biology students sit the NSEB each year as a complementary depth signal alongside their IB Diploma, and the school's faculty support olympiad participation. Per HBCSE's publicly available selection lists, Heritage Xperiential is named on NSEB / INBO qualifier rosters in multiple years.",
      "For Heritage Xperiential students, biology olympiad coaching builds naturally on the school's inquiry-driven culture. IB Biology HL provides depth, and the school's experiential laboratory programme builds practical-skills intuition that is unusually well-aligned with INBO's experimental-design questions and OCSC's practical-skills round. The gap our coaching plugs is NSEB-specific format (90-minute MCQ pace, NCERT-coverage chapters like Indian biodiversity classification), plus structured INBO long-form theory writing.",
      'Sector 62 Gurgaon and the broader Golf Course Extension / Sohna Road / DLF residential ring is commute-dense in mid-week, so weekend coaching dominates. Our 100% live online small-batch weekend format works well — Saturday or Sunday morning IST sessions, full recordings for missed sessions (field trips, CAS, family travel), WhatsApp doubt resolution within 24 hours. The compact 2-3 hour weekly load fits alongside the IB DP workload.',
    ],
    reputationBullets: [
      'Established 2003 by The Shri Ram Group — Sector 62, Gurgaon',
      'IB World School running PYP-MYP-DP continuum',
      'Experiential, inquiry-driven pedagogy — heavy lab and project-based science culture',
      'IB Biology HL and SL with full Section 6 laboratory support',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Faculty actively support olympiad participation alongside IB Diploma',
    ],
    olympiadRecord:
      "Heritage Xperiential is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual diploma communications cite olympiad finalists; year-wise qualifier counts are reported there.",
    collegeContext:
      "Heritage Xperiential graduates matriculate strongly to US T20 universities (Ivy+, Stanford, MIT, top liberal arts), UK Oxbridge / Imperial / Russell Group, Canadian universities (Toronto, McGill, UBC), Australian Group of Eight, and selectively to Indian top-tier programmes (Ashoka, BITS Pilani, IISc BS Research). The cohort's inquiry-driven background lands particularly well in US research-oriented undergraduate programmes.",
    paceAlignment:
      "Heritage Xperiential students come into olympiad coaching with IB Biology HL depth and unusually strong practical-skills intuition from the school's experiential laboratory programme — which is a natural fit for INBO's experimental-design questions and OCSC's practical round. Our coaching layers NSEB-specific format drilling, NCERT-coverage chapters, and INBO long-form theory writing on top. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around DP1 IA submission cycles and DP2 mock windows.",
    faqs: [
      {
        question:
          'Heritage Xperiential emphasises inquiry-driven learning — does that fit olympiad-style prep?',
        answer:
          "Yes, particularly well. INBO Stage 2 and the OCSC practical round reward experimental-design intuition and data-analysis fluency, both of which the school's experiential laboratory programme directly builds. Our coaching layers NSEB-specific format on top of that foundation — the inquiry-driven culture is an asset, not a friction.",
      },
      {
        question:
          'My Heritage Xperiential child is doing IB Biology HL — what does NSEB / INBO coaching add?',
        answer:
          'NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters that IB does not include like Indian biodiversity classification), INBO long-form theory writing, and the signal value — INBO / OCSC / IBO performance is a strong pre-college biology signal for US / UK biosciences applications beyond the IB Diploma alone.',
      },
      {
        question: 'When should a Heritage Xperiential student start biology olympiad coaching?',
        answer:
          'For DP1 students aiming at the NSEB cycle in late November / early December of DP2, start in May / June of DP1 — 9-10 months out. MYP5 students with unusual motivation can attempt the NSEB early; talk to us for a fit assessment.',
      },
      {
        question: 'Does the olympiad workload conflict with IB DP load at Heritage Xperiential?',
        answer:
          "No — our weekend small-batch is intentionally compact (2-3 hours, Saturday or Sunday morning IST). We coordinate around IA submission deadlines, DP2 mock windows, and the school's field-trip / experiential calendar so the olympiad work does not collide with school-internal due dates.",
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 in one programme?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep December through February.',
      },
      {
        question: 'How does pricing work for Heritage Xperiential families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). Most Heritage Xperiential families opt for the Complete Year or a hybrid plan.',
      },
      {
        question: 'Are you affiliated with Heritage Xperiential Learning School?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Heritage Xperiential Learning School, The Shri Ram Group, or the International Baccalaureate Organization. The school name is used descriptively to indicate the audience this page is written for.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. Dhirubhai Ambani International School — Mumbai
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'dais-mumbai-olympiad',
    schoolName: 'Dhirubhai Ambani International School',
    shortName: 'DAIS Mumbai',
    cityCountry: 'Mumbai',
    citySlug: 'mumbai',
    schoolType: 'IB World School',
    historyParagraphs: [
      "Dhirubhai Ambani International School (DAIS) in Bandra Kurla Complex, Mumbai, established in 2003, is one of India's most academically rigorous IB World Schools and is consistently ranked the top international school in the country (publicly reported in EducationWorld, the IB Diploma publicly available statistics, and the school's own annual diploma communications). The BKC campus runs the IGCSE programme through Grade 10 and the IB Diploma Programme in Grades 11-12, with publicly reported diploma averages well above the global mean.",
      "DAIS's IB Diploma Biology programme is one of the most rigorous in India — HL and SL streams with full Section 6 laboratory support, examiner-level teachers, and a culture of academic excellence that produces a steady stream of IB Diploma top scorers. A meaningful subset of DP Biology students also sit the NSEB each year, treating it as a depth signal that strengthens both their IB performance and their US / UK biosciences applications. DAIS is named on HBCSE NSEB / INBO selection lists in multiple years.",
      "For DAIS students, biology olympiad coaching plays a depth-and-format role. IB Biology HL at DAIS already builds substantial depth — what the olympiad adds is (1) NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters that IB does not include like Indian biodiversity classification), and (2) INBO long-form theory writing under exam conditions, which is a different skill from IB Paper 2 long-response writing. Our coaching layers exactly these two on top of DAIS's strong IB Biology programme.",
      'The Bandra / BKC / Juhu / Worli residential pattern means most DAIS parents are commute-sensitive on weekdays. Our 100% live online weekend small-batch format works well — Saturday or Sunday morning IST sessions, full recordings for missed sessions (family travel is common in the DAIS cohort), and WhatsApp doubt resolution within 24 hours. The compact 2-3 hour weekly load fits alongside the IB DP workload.',
    ],
    reputationBullets: [
      'Established 2003 — Bandra Kurla Complex, Mumbai',
      "Consistently ranked India's top international school (EducationWorld)",
      "IB Diploma cohort averages well above the global mean (per school's annual communications)",
      'Strong IB Biology HL programme with examiner-level faculty',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Strong matriculation to Ivy+, Oxbridge, MIT, Stanford, top US / UK universities',
    ],
    olympiadRecord:
      "DAIS Mumbai is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual diploma communications cite olympiad finalists; year-wise qualifier counts are reported there.",
    collegeContext:
      "DAIS graduates matriculate to the highest tier of US universities (Harvard, Yale, Princeton, MIT, Stanford, the Ivy+ band), UK (Oxbridge, Imperial, UCL, LSE), Canadian universities (Toronto, McGill, UBC), Australian Group of Eight, and selectively to Indian programmes (Ashoka, IISc BS Research). The school's matriculation record is the strongest in India (publicly reported); the cohort skews strongly abroad with biosciences pipelines through US pre-med and UK natural sciences.",
    paceAlignment:
      'DAIS students arrive at olympiad coaching with IB Biology HL depth at examiner-level standard already underway — our coaching focuses tightly on NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters), and INBO long-form theory writing. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around DP1 IA submission cycles and DP2 mock exam windows. The DAIS cohort is unusually self-directed, which lets us run a higher-pace small-batch with deeper homework.',
    faqs: [
      {
        question:
          'DAIS is already academically the strongest IB school in India — what does outside olympiad coaching add?',
        answer:
          "Three things DAIS's IB classroom cannot fully scale at individual student level. First, NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters that IB does not include). Second, structured INBO long-form theory writing under exam conditions. Third, the cohort effect — peer discussion with NSEB / INBO peers from other schools sharpens problem-solving in a way a single-school cohort cannot.",
      },
      {
        question: 'My DAIS child is targeting US Ivy+ pre-med — does NSEB / INBO performance help?',
        answer:
          'Yes, materially. INBO Stage 2 qualification or OCSC training-camp participation is a strong pre-college biology signal that US T20 admissions read clearly. Even strong NSEB performance, framed as structured biology research-orientation, adds depth to a pre-med application. The IB Diploma score is necessary; the olympiad work differentiates.',
      },
      {
        question: 'When should a DAIS student start biology olympiad coaching?',
        answer:
          'For Grade 11 (DP1) students aiming at the NSEB cycle in late November / early December of DP2, start in May / June of DP1 — 9-10 months out. Grade 10 IGCSE students with strong motivation can attempt the NSEB early in DP1; we run a fit-assessment call to decide.',
      },
      {
        question: "Does the olympiad workload fit with DAIS's rigorous IB DP load?",
        answer:
          "Yes — our weekend small-batch is intentionally compact (2-3 hours, Saturday or Sunday morning IST). The DAIS cohort's self-direction lets us run higher-pace small-batches with deeper homework, so per-hour yield is unusually strong. We coordinate around IA submission deadlines and DP2 mock windows.",
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep December through February.',
      },
      {
        question: 'How does pricing work for DAIS Mumbai families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). DAIS families often combine Complete Year with extra 1:1 Elite hours in the pre-NSEB month for score optimisation.',
      },
      {
        question: 'Are you affiliated with DAIS Mumbai or the Reliance Foundation?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Dhirubhai Ambani International School, the Reliance Foundation, or the International Baccalaureate Organization. The school name is used descriptively to indicate the audience this page is written for.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 11. The Cathedral and John Connon School — Mumbai
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'cathedral-school-mumbai-olympiad',
    schoolName: 'The Cathedral and John Connon School',
    shortName: 'Cathedral Mumbai',
    cityCountry: 'Mumbai',
    citySlug: 'mumbai',
    schoolType: 'ICSE Heritage',
    historyParagraphs: [
      "The Cathedral and John Connon School, established in 1860 in Fort, Mumbai, is one of India's oldest and most historically prestigious schools. The school runs the ICSE programme through Grade 10 and offers both ISC and the IB Diploma in Grades 11-12 (publicly reported in EducationWorld and the school's own communications). Cathedral's heritage status, Fort location, and dual ISC + IB senior school produce an unusual cohort — academically rigorous, internationally oriented, and deeply rooted in Mumbai's older professional community.",
      "Cathedral's senior-school Biology programme runs across both ISC and IB Diploma tracks. The ISC track follows the CISCE syllabus closely, and the IB track runs HL and SL with full Section 6 lab support. A meaningful subset of senior-school Biology students sit the NSEB each year — historically more from the ISC cohort than the IB cohort, because the ISC syllabus is closer to NSEB's NCERT-style breadth. Cathedral is named on HBCSE NSEB / INBO selection lists in multiple years.",
      "For Cathedral students, biology olympiad coaching plays slightly different roles depending on senior-school track. ISC-track students get Campbell Biology depth and structured NSEB past-paper drilling layered on top of their existing CISCE preparation — a strong fit because ISC's chapter breadth overlaps closely with NSEB's. IB-track students get NSEB-format drilling and INBO long-form theory writing on top of their IB HL depth. Our Small-Batch Weekend handles both well.",
      "The Fort / Colaba / Churchgate / Malabar Hill commute pattern is mid-week-dense, so Cathedral parents default to weekend coaching. Our 100% live online weekend small-batch format works well — Saturday or Sunday morning IST sessions, full recordings, WhatsApp doubt resolution within 24 hours. The compact 2-3 hour weekly load fits alongside Cathedral's senior-school programme and the school's strong arts / debating tradition.",
    ],
    reputationBullets: [
      "Established 1860 — Fort, Mumbai (one of India's oldest schools)",
      'Dual senior-school: ISC and IB Diploma both offered in Grades 11-12',
      'Heritage ICSE through Grade 10',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Strong matriculation to Mumbai medical (KEM, GS Medical, Grant Medical), IIT Bombay, Ashoka, US Ivy+, UK Oxbridge',
      "Generations-long alumni network across Mumbai's legal, medical, financial, and academic communities",
    ],
    olympiadRecord:
      "Cathedral and John Connon is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual prize-day communications cite olympiad finalists across science subjects; year-wise qualifier counts are reported in the school's own materials.",
    collegeContext:
      'Cathedral graduates matriculate to Mumbai medical colleges (KEM, GS Medical, Grant Medical, Seth GS Medical), AIIMS Delhi, IIT Bombay (for biotech / biosciences), IISc Bangalore, Ashoka University, US Ivy+ universities, UK Oxbridge / Imperial / Russell Group, and Canadian top universities. The cohort splits roughly evenly between India professional pathways (medicine, law, finance) and abroad biosciences / liberal-arts programmes.',
    paceAlignment:
      "Cathedral's senior school runs both ISC and IB Biology tracks. For ISC-track students, our coaching adds Campbell Biology depth and structured NSEB past-paper drilling on top of CISCE preparation (close overlap with NSEB's NCERT-style breadth). For IB-track students, our coaching focuses on NSEB-specific format and INBO long-form theory writing on top of IB HL depth. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around ISC pre-board windows and IB DP2 mock cycles.",
    faqs: [
      {
        question:
          'Does Cathedral Mumbai offer both ISC and IB in senior school? Which is better for NSEB?',
        answer:
          "Yes — Cathedral runs both ISC and IB in Grades 11-12. For NSEB Stage 1 specifically, ISC has an edge because the ISC Biology syllabus overlaps closely with NSEB's NCERT-style breadth (Indian biodiversity classification, plant taxonomy detail, ecology chapters). IB students need extra NCERT-format chapter exposure on top of their IB HL depth — which our coaching provides.",
      },
      {
        question: 'My Cathedral child is on the ISC track — how does your coaching fit?',
        answer:
          'Very directly. We add Campbell Biology depth (the chapters that ISC introduces but does not cover at olympiad depth — cellular respiration energetics, signal transduction, population genetics math) and structured NSEB past-paper drilling under timed conditions. The ISC syllabus is already a strong NSEB foundation; our coaching does the depth-and-format work.',
      },
      {
        question: 'My Cathedral child is on the IB track — how does your coaching fit?',
        answer:
          'IB Biology HL gives depth; what our coaching adds is NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters like Indian biodiversity classification that IB does not include), and INBO long-form theory writing under exam conditions. Weekend small-batch, plus optional 1:1 Elite hours pre-NSEB.',
      },
      {
        question: 'When should a Cathedral student start biology olympiad coaching?',
        answer:
          'Grade 11 May / June is ideal — 9-10 months before NSEB Stage 1 in late November / early December of Grade 12. Grade 10 summer starts also work, especially for students considering the dual ISC / IB senior-school decision.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep December through February.',
      },
      {
        question: 'Is the coaching online or in-person? Do you have a Fort / South Mumbai centre?',
        answer:
          'Olympiad coaching is 100% live online — Zoom small-batch and 1:1 Elite Mentoring with full recordings. We do not run an offline olympiad centre in Mumbai. The online format eliminates mid-week commute from South Mumbai entirely.',
      },
      {
        question: 'Are you affiliated with The Cathedral and John Connon School?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with The Cathedral and John Connon School. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers and Campbell Biology.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. American School of Bombay — Mumbai
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'asb-mumbai-olympiad',
    schoolName: 'American School of Bombay',
    shortName: 'ASB Mumbai',
    cityCountry: 'Mumbai',
    citySlug: 'mumbai',
    schoolType: 'IB World School',
    historyParagraphs: [
      'The American School of Bombay (ASB), established in 1981, is a US-accredited international school in Bandra Kurla Complex, Mumbai, dual-accredited by the IB Organization (for the Diploma Programme) and US accreditation bodies (NEASC / MSA). ASB serves a heavily expatriate and globally mobile community and offers students a choice between AP coursework with US diploma and the IB Diploma — a dual-pathway model similar to ASD Dubai.',
      "ASB's senior-school Biology runs across IB HL / SL and AP Biology streams in parallel, with full lab support for both. A meaningful subset of senior-school Biology students sit the NSEB each year — particularly Indian-passport-holding students for whom INBO / OCSC / IBO performance materially helps their US T20 biosciences applications. ASB is named on HBCSE NSEB / INBO selection lists in multiple years, and the school's annual communications cite olympiad finalists.",
      "For ASB students, biology olympiad coaching plays a depth-and-signal role. IB HL or AP Biology already build depth. What the NSEB / INBO adds is (a) a structured Indian-national-level credential that US T20 admissions read clearly as a biosciences signal, and (b) format-specific drilling (NSEB MCQ pace, NCERT-coverage chapters, INBO long-form theory) that neither IB nor AP directly teaches. Our coaching layers exactly that on top of the school's existing programme.",
      "ASB's BKC campus is centrally located, but the cohort's residential pattern (Bandra, Juhu, Worli, Powai, Lower Parel) means commute fatigue is real. Our 100% live online weekend small-batch format works well — Saturday or Sunday morning IST sessions, full recordings for missed sessions (a significant share of ASB students travel internationally during the year), WhatsApp doubt resolution within 24 hours. The compact weekly load fits alongside the IB DP or AP load.",
    ],
    reputationBullets: [
      'Established 1981 — Bandra Kurla Complex, Mumbai',
      'US-accredited international school (NEASC / MSA) + IB World School (DP)',
      'Dual-pathway senior school: IB Diploma + AP coursework in parallel',
      'IB Biology HL / SL and AP Biology both offered with full lab support',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Strong matriculation to US Ivy+, top liberal arts, UK Oxbridge / Russell Group',
    ],
    olympiadRecord:
      "American School of Bombay is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual communications cite olympiad finalists; year-wise qualifier counts are reported in the school's own materials.",
    collegeContext:
      'ASB graduates matriculate strongly to US T20 universities (Harvard, Yale, Princeton, MIT, Stanford, the Ivy+ band, top liberal arts), UK (Oxbridge, Imperial, UCL, LSE), Canadian top universities, and selectively to Indian programmes (Ashoka, IISc BS Research for INBO / IBO qualifiers). The expat-heavy cohort skews strongly abroad; for Indian-passport-holding students, INBO / OCSC performance is a particularly strong pre-college signal.',
    paceAlignment:
      'ASB students arrive at olympiad coaching with IB HL or AP Biology depth already underway — our coaching focuses on NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters), and INBO long-form theory writing. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around DP1 IA submission cycles, DP2 mock exam windows, and the AP May exam window. For Indian-passport-holding ASB students, we explicitly frame the olympiad work as a US T20 biosciences signal in the application narrative discussion.',
    faqs: [
      {
        question:
          'My ASB child is doing AP Biology, not IB — does your olympiad coaching still fit?',
        answer:
          'Yes. AP Biology depth maps reasonably well to NSEB MCQ-style depth, and our coaching adds (a) NCERT-coverage chapters that AP does not include (Indian biodiversity, plant taxonomy detail), (b) NSEB-specific format and timing, and (c) INBO long-form theory for qualifiers. We have AP-track ASB students reach INBO Stage 2 each year.',
      },
      {
        question:
          'My ASB child is targeting US Ivy+ pre-med — does NSEB / INBO performance help the application?',
        answer:
          'Materially, especially for Indian-passport-holding students. INBO Stage 2 qualification or OCSC training-camp participation reads clearly as a structured biology research-orientation signal in US T20 admissions. Even strong NSEB performance, framed in the application narrative, adds depth to a pre-med profile.',
      },
      {
        question: 'When should an ASB student start biology olympiad coaching?',
        answer:
          'For DP1 / Grade 11 students aiming at the NSEB cycle in late November / early December of Grade 12, start in May / June of Grade 11 — 9-10 months out. Grade 10 students considering early NSEB participation can talk to us for a fit assessment.',
      },
      {
        question: "How does your coaching adapt to ASB's travel-heavy cohort?",
        answer:
          'Full session recordings, WhatsApp doubt resolution within 24 hours, and asynchronous past-paper review let students travel internationally for 1-3 weeks at a time without losing the cohort thread. We have ASB students who attend live sessions from US summer or European holidays via Zoom.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep December through February.',
      },
      {
        question: 'How does pricing work for ASB Mumbai families?',
        answer:
          'USD-denominated (which is convenient for the expat-heavy ASB cohort): Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). INR equivalents shown on the pricing page for Indian-passport-holding families paying locally.',
      },
      {
        question: 'Are you affiliated with the American School of Bombay?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with the American School of Bombay, the NEASC / MSA accreditation bodies, or the International Baccalaureate Organization. The school name is used descriptively to indicate the audience this page is written for.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 13. Stonehill International School — Bangalore
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'stonehill-bangalore-olympiad',
    schoolName: 'Stonehill International School',
    shortName: 'Stonehill Bangalore',
    cityCountry: 'Bangalore',
    citySlug: 'bangalore',
    schoolType: 'IB Continuum',
    historyParagraphs: [
      "Stonehill International School, established in 2008, is an IB World School running the full PYP-MYP-DP Continuum on a 34-acre campus on Tumkur Road, north of Bangalore. The school is part of the Embassy Group of schools (alongside Indus International and others) and is consistently named among India's top IB Diploma schools (publicly reported in EducationWorld international school rankings and in the school's annual diploma communications).",
      "Stonehill's IB Diploma Biology programme runs HL and SL with full Section 6 laboratory support, and the school's culture combines academic rigour with a strong outdoor-education, arts, and service-learning tradition. A meaningful subset of DP Biology students sit the NSEB each year, treating it as a depth signal that complements the IB Diploma. Stonehill is named on HBCSE NSEB / INBO selection lists in multiple years.",
      "For Stonehill students, biology olympiad coaching builds on IB Biology HL depth. The gap our coaching plugs is NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters that IB does not include — Indian biodiversity classification, plant taxonomy detail), plus INBO long-form theory writing. We layer these specifically on top of the school's IB programme without duplicating effort. Most Stonehill students take a Saturday or Sunday morning IST small-batch slot.",
      "Stonehill's residential boarding component (a meaningful share of the cohort is full-time resident) shapes scheduling. Our 100% live online weekend small-batch format fits the boarding-school weekend windows. Full recordings cover schedule conflicts (CAS trips, sport tournaments, Project Week), and WhatsApp doubt resolution within 24 hours keeps the cohort connected between sessions. The compact 2-3 hour weekly load fits alongside the IB DP workload.",
    ],
    reputationBullets: [
      'Established 2008 — 34-acre campus on Tumkur Road, Bangalore',
      'IB World School running full PYP-MYP-DP Continuum',
      'Part of the Embassy Group of schools',
      "Consistently named among India's top IB Diploma schools (per EducationWorld)",
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Strong outdoor-education, arts, and service-learning culture alongside academic rigour',
    ],
    olympiadRecord:
      "Stonehill International School is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual diploma communications cite olympiad finalists; year-wise qualifier counts are reported there.",
    collegeContext:
      "Stonehill graduates matriculate strongly to US T20 universities (Ivy+, Stanford, MIT, top liberal arts), UK Oxbridge / Imperial / Russell Group, Canadian universities (Toronto, McGill, UBC), Australian Group of Eight, and selectively to Indian top-tier programmes (Ashoka, BITS Pilani, IISc BS Research — particularly attractive for INBO / IBO qualifiers given the school's Bangalore location). The cohort splits roughly evenly between abroad and India biosciences pathways.",
    paceAlignment:
      "Stonehill students arrive at olympiad coaching with IB Biology HL depth already underway — our coaching focuses on NSEB-specific format, NCERT-coverage chapters that IB does not include, and INBO long-form theory writing. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around DP1 IA submission cycles, DP2 mock exam windows, and the school's boarding / outdoor-education calendar.",
    faqs: [
      {
        question: 'My Stonehill child is doing IB Biology HL — what does NSEB / INBO coaching add?',
        answer:
          "Three things. First, NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters that IB does not include like Indian biodiversity classification). Second, INBO long-form theory writing under exam conditions. Third, the signal value — INBO / OCSC / IBO performance materially helps US / UK biosciences applications beyond the IB Diploma alone, and is particularly attractive for IISc BS Research applications given the school's Bangalore location.",
      },
      {
        question:
          'How is your coaching different for Stonehill (IB-track) versus CBSE-track students?',
        answer:
          'IB-track students arrive with cellular-respiration, signal-transduction, and population-genetics depth already underway, so we spend less time there and more on NSEB-specific format, NCERT chapters, and INBO long-form theory. CBSE students get the reverse emphasis. Small-Batch Weekend mixes both — peer discussion across school cultures helps.',
      },
      {
        question: 'When should a Stonehill student start biology olympiad coaching?',
        answer:
          'For DP1 students aiming at the NSEB cycle in late November / early December of DP2, start in May / June of DP1 — 9-10 months out. MYP5 students with strong motivation can attempt the NSEB early; talk to us for a fit assessment.',
      },
      {
        question:
          "Does the olympiad workload fit with Stonehill's boarding-school weekend schedule?",
        answer:
          'Yes. Our weekend small-batch (Saturday or Sunday morning IST, 2-3 hours) is built for boarding-school weekend windows. Full recordings cover schedule conflicts (CAS trips, sport tournaments, Project Week). WhatsApp doubt resolution within 24 hours keeps boarding-cohort students connected between sessions.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep December through February.',
      },
      {
        question: 'How does pricing work for Stonehill Bangalore families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). Most Stonehill families opt for the Complete Year or a hybrid plan.',
      },
      {
        question: 'Are you affiliated with Stonehill International School or the Embassy Group?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Stonehill International School, the Embassy Group, or the International Baccalaureate Organization. The school name is used descriptively to indicate the audience this page is written for.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 14. Inventure Academy — Bangalore
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'inventure-bangalore-olympiad',
    schoolName: 'Inventure Academy',
    shortName: 'Inventure Bangalore',
    cityCountry: 'Bangalore',
    citySlug: 'bangalore',
    schoolType: 'Cambridge International',
    historyParagraphs: [
      "Inventure Academy, established in 2005, is a co-educational K-12 school in Whitefield / Sarjapur, Bangalore, offering the IGCSE programme and IB Diploma in senior school. The school is consistently named among Bangalore's top international schools (publicly reported in EducationWorld international school rankings and in the school's annual diploma communications) and is set on a 12-acre campus with strong sports and outdoor-education facilities.",
      "Inventure's senior-school Biology runs IB HL / SL with full Section 6 laboratory support, and the school's culture combines academic rigour with an unusually strong sports programme. A meaningful subset of DP Biology students sit the NSEB each year, treating it as a depth signal alongside the IB Diploma. Per HBCSE's publicly available selection lists, Inventure is named on NSEB / INBO qualifier rosters in multiple years.",
      'For Inventure students, biology olympiad coaching plays the same role as for other IB-track schools — IB HL provides depth, and our coaching adds NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters that IB does not include), plus INBO long-form theory writing. The Bangalore location is particularly relevant because IISc BS Research applications value INBO / OCSC performance highly, and many Inventure students target IISc as a strong India option alongside US / UK universities.',
      "The Whitefield / Sarjapur / Outer Ring Road residential pattern is commute-dense in mid-week, so weekend coaching dominates. Our 100% live online weekend small-batch format works well — Saturday or Sunday morning IST sessions, full recordings for missed sessions (sport tournaments are common in the Inventure cohort), WhatsApp doubt resolution within 24 hours. The compact 2-3 hour weekly load fits alongside the IB DP workload and the school's strong sports calendar.",
    ],
    reputationBullets: [
      'Established 2005 — Whitefield / Sarjapur, Bangalore',
      'Co-educational K-12 with IGCSE through Grade 10 and IB Diploma in senior school',
      "Consistently named among Bangalore's top international schools (per EducationWorld)",
      'Strong IB Biology HL / SL programme with full Section 6 lab support',
      'Named on HBCSE NSEB / INBO selection lists in multiple years (publicly available)',
      'Unusually strong sports culture alongside academic programme',
    ],
    olympiadRecord:
      "Inventure Academy is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual diploma communications cite olympiad finalists; year-wise qualifier counts are reported in the school's own materials.",
    collegeContext:
      "Inventure graduates matriculate strongly to US T20 universities (Ivy+, Stanford, MIT, top liberal arts), UK Oxbridge / Imperial / Russell Group, Canadian universities (Toronto, McGill, UBC), and Indian top-tier programmes (Ashoka, BITS Pilani, IISc BS Research — INBO / IBO qualifiers find IISc particularly attractive given the school's Bangalore location). The cohort splits roughly evenly between abroad and India biosciences pathways.",
    paceAlignment:
      "Inventure students arrive at olympiad coaching with IB Biology HL depth already underway — our coaching focuses on NSEB-specific format, NCERT-coverage chapters that IB does not include, and INBO long-form theory writing. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around DP1 IA submission cycles, DP2 mock exam windows, and the school's strong sports tournament calendar.",
    faqs: [
      {
        question: 'My Inventure child is doing IB Biology HL — what does NSEB / INBO coaching add?',
        answer:
          "NSEB-specific format (90-min MCQ pace, NCERT-coverage chapters like Indian biodiversity classification that IB does not include), INBO long-form theory writing under exam conditions, and the signal value — INBO / OCSC / IBO performance materially helps both US / UK biosciences applications and Indian routes like IISc BS Research (particularly attractive given the school's Bangalore location).",
      },
      {
        question:
          'My Inventure child plays competitive sport at school level — does the olympiad schedule fit?',
        answer:
          'Yes. Our weekend small-batch (Saturday or Sunday morning IST, 2-3 hours) is intentionally compact. Full session recordings cover sport tournaments and travel. WhatsApp doubt resolution within 24 hours keeps the student connected between sessions. We have Inventure athletes who maintain national-level sport alongside the Complete Olympiad Year programme.',
      },
      {
        question: 'When should an Inventure student start biology olympiad coaching?',
        answer:
          'For DP1 students aiming at the NSEB cycle in late November / early December of DP2, start in May / June of DP1 — 9-10 months out. Grade 10 IGCSE students with strong motivation can attempt the NSEB early in DP1; we run a fit-assessment call to decide.',
      },
      {
        question:
          'My Inventure child is targeting IISc BS Research — how does NSEB / INBO performance help?',
        answer:
          'Materially. IISc BS Research admissions value INBO / OCSC / IBO performance highly as a structured biology research-orientation signal. Even strong NSEB performance, framed as part of a biology research-orientation narrative, helps. The IISc Bangalore location overlap makes this particularly relevant for Inventure students.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep December through February.',
      },
      {
        question: 'How does pricing work for Inventure Bangalore families?',
        answer:
          'USD-denominated, geo-converted to INR on the pricing page: Complete Olympiad Year $4,500 / year, 1:1 Elite Mentoring $90 / hour, Small-Batch Weekend $50 / hour (4-6 students). Most Inventure families opt for the Complete Year or a hybrid plan.',
      },
      {
        question: 'Are you affiliated with Inventure Academy?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with Inventure Academy or the International Baccalaureate Organization. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers.',
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 15. National Public School Bangalore — Indiranagar / Koramangala
  // ──────────────────────────────────────────────────────────────────────────
  {
    slug: 'nps-bangalore-olympiad',
    schoolName: 'National Public School Bangalore',
    shortName: 'NPS Bangalore',
    cityCountry: 'Bangalore',
    citySlug: 'bangalore',
    schoolType: 'CBSE Premium',
    historyParagraphs: [
      "National Public School (NPS), Bangalore, is the flagship CBSE school network in the city with multiple campuses (Indiranagar, Koramangala, Rajajinagar, Yeshwanthpur, HSR, and others). The Indiranagar campus, established in 1982, is the founding campus and is consistently named among Bangalore's top CBSE schools (publicly reported in EducationWorld India School Rankings and the Times School Survey). The NPS network is widely recognised for academic rigour and a strong PCB cohort across campuses.",
      "NPS Bangalore has one of the strongest NSEB participation records in South India. Per HBCSE's publicly available NSEB / INBO selection lists, NPS campuses are named in qualifier rosters in multiple years and across multiple campuses — Indiranagar and Koramangala particularly — and the school's annual achievements communications cite olympiad finalists. The Class 11-12 Biology cohorts across NPS campuses are large, and a meaningful share of PCB students sit the NSEB each year as part of the school culture.",
      'For NPS Bangalore students, outside biology olympiad coaching plugs three specific gaps. First, depth: Campbell Biology goes beyond NCERT Class 11-12 in topics like cellular respiration energetics, signal transduction, population genetics, and bioinformatics, and NSEB / INBO papers draw heavily from that depth. Second, NSEB past-paper rigour under timed conditions with topic-wise error analysis. Third, the INBO-Stage-2 transition: long-form theory and experimental-design writing that NCERT does not require. Our Complete Olympiad Year covers all three.',
      "Bangalore's commute pattern (Indiranagar, Koramangala, HSR, Whitefield, Sarjapur, Outer Ring Road, BTM, Jayanagar) is among the toughest in India in mid-week, so weekend coaching is the default. Our 100% live online weekend small-batch format works well — Saturday or Sunday morning IST sessions, full recordings for missed sessions, WhatsApp doubt resolution within 24 hours. The compact 2-3 hour weekly load fits alongside the school's Class 11-12 schedule and the NEET coaching most NPS students also run.",
    ],
    reputationBullets: [
      'Flagship Bangalore CBSE network — multiple campuses (Indiranagar, Koramangala, Rajajinagar, Yeshwanthpur, HSR, and others)',
      'Founding Indiranagar campus established 1982',
      "Consistently named among Bangalore's top CBSE schools (EducationWorld, Times School Survey)",
      'Large Class 11-12 PCB cohorts across campuses',
      'Named on HBCSE NSEB / INBO selection lists in multiple years across multiple campuses (publicly available)',
      'Strong matriculation to NEET-route medical colleges, IIT, IISc, BITS, and US / UK universities',
    ],
    olympiadRecord:
      "NPS Bangalore (multiple campuses) is named on HBCSE INBO selection lists in multiple years (publicly available on HBCSE's olympiad results pages). The school's annual achievements communications cite olympiad finalists across campuses; specific year-wise qualifier counts are reported in the school's own materials.",
    collegeContext:
      'NPS Bangalore graduates matriculate strongly to NEET-route medical colleges (AIIMS Delhi, AIIMS Bengaluru, KMC, JIPMER, Bangalore Medical College and other top state colleges), IIT Bombay / Delhi / Madras (for Biotech / Biological Sciences), IISc Bangalore (BS Research — INBO / IBO qualifiers find this particularly attractive given the location), BITS Pilani, top Bangalore engineering colleges, and US / UK universities (Ivy+, Stanford, MIT, Oxbridge, Imperial). The cohort skews more strongly NEET than the average international-school cohort.',
    paceAlignment:
      "NPS Bangalore's school Biology covers NCERT thoroughly and prepares students well for NEET and CBSE boards. Our coaching layers Campbell Biology depth (the chapters NCERT does not cover at the same density) and structured NSEB past-paper drilling on top of the school's existing programme. Weekend small-batch (Saturday or Sunday morning IST) is the standard schedule. We coordinate around the school's pre-board windows and the NEET coaching most NPS students run. Post-NSEB qualifiers shift into INBO long-form theory and OCSC practical-skills work from December through February.",
    faqs: [
      {
        question:
          'Which NPS Bangalore campus do you coach students from? Is your coaching campus-specific?',
        answer:
          'We coach NPS students from any campus — Indiranagar, Koramangala, Rajajinagar, Yeshwanthpur, HSR, and others. The coaching is 100% online so campus location does not affect logistics. Each NPS campus runs the same CBSE Class 11-12 Biology syllabus, so our Campbell-depth-plus-NSEB-drilling model applies uniformly.',
      },
      {
        question:
          'Will biology olympiad coaching conflict with NEET coaching for NPS Bangalore students?',
        answer:
          'No — they reinforce each other. Campbell depth directly strengthens NEET Biology because the harder NEET assertion-reason, case-based, and "Statement 1 / Statement 2" items draw from the same depth that NSEB rewards. Our 2-3 hour weekend small-batch sits on weekends, which is when most students do NEET self-study rather than NEET classes, so the schedules do not collide.',
      },
      {
        question: 'When should an NPS Bangalore student start biology olympiad coaching?',
        answer:
          'Class 11 May / June is ideal — 9-10 months before NSEB Stage 1 in late November / early December of Class 12. Class 10 summer starts also work well. Class 12 late starts are workable but compressed; we run a 6-month fast-track programme that prioritises past-paper drilling and high-yield Campbell chapters.',
      },
      {
        question: 'My NPS Bangalore child is targeting IISc BS Research — does NSEB / INBO help?',
        answer:
          'Materially. IISc BS Research admissions value INBO / OCSC / IBO performance as a structured biology research-orientation signal. Even strong NSEB performance, framed as part of a biology research-orientation narrative, helps. The IISc Bangalore overlap is particularly relevant for NPS students given the geographic match.',
      },
      {
        question: 'Do you coach NSEB Stage 1 and INBO Stage 2 together?',
        answer:
          'Yes. The Complete Olympiad Year ($4,500) covers NSEB Stage 1 August-November, then for qualifiers transitions into INBO Stage 2 long-form theory, experimental design, and OCSC interview prep December through February.',
      },
      {
        question: 'Is the coaching online or in-person? Do you have a Bangalore centre?',
        answer:
          'Olympiad coaching is 100% live online — Zoom small-batch and 1:1 Elite Mentoring with full recordings. We do not run an offline olympiad centre in Bangalore. The online format eliminates Bangalore mid-week commute fatigue entirely.',
      },
      {
        question: 'Are you affiliated with NPS Bangalore or the NPS Education Society?',
        answer:
          'No. Cerebrum Biology Academy is an independent tutoring provider — we are not affiliated with National Public School Bangalore, the NPS Education Society, or any specific NPS campus. The school name is used descriptively to indicate the audience this page is written for. We coach the publicly published NSEB / INBO syllabi (per HBCSE) using publicly available past papers and Campbell Biology.',
      },
    ],
  },
]

/** Helper: lookup school by slug. */
export function getSchoolBySlug(slug: string): IndiaOlympiadSchool | undefined {
  return indiaOlympiadSchools.find((s) => s.slug === slug)
}

/** Helper: list of all slugs for generateStaticParams. */
export const indiaOlympiadSchoolSlugs = indiaOlympiadSchools.map((s) => s.slug)
