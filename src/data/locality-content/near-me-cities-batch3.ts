/**
 * Batch 3: the remaining 32 cities (alphabetical: imphal through
 * visakhapatnam). Combined with batches 1 + 2 this gives full
 * coverage of all 48 /neet-coaching-near-me-* pages.
 */

import type { NearMeCityData } from './near-me-cities'

export const NEAR_ME_CITIES_BATCH3: NearMeCityData[] = [
  {
    slug: 'imphal',
    displayName: 'Imphal',
    state: 'Manipur',
    region: 'Northeast India',
    metroPopulationMn: 0.42,
    majorAreas: [
      'Imphal West',
      'Imphal East',
      'Singjamei',
      'Khurai',
      'Lamphelpat',
      'Thangal Bazaar',
    ],
    feederSchools: [
      'Don Bosco School Imphal',
      'Little Flower School',
      'Nirmalabas Higher Secondary School',
      'Tamphasana Higher Secondary School',
      'Manipur Public School',
      "St. Anthony's Higher Secondary School",
    ],
    localCoachingPresence:
      'Aakash Institute (limited presence), local Manipur coaching centers — NEET coaching depth is shallow compared to mainland India',
    stateQuotaCollege: 'Regional Institute of Medical Sciences Imphal',
    otherStateMedicalColleges: [
      'Jawaharlal Nehru Institute of Medical Sciences Imphal',
      'AIIMS Delhi (limited via all-India)',
      'Gauhati Medical College',
    ],
    cityContext:
      "Imphal is Manipur's primary NEET market, dominated by RIMS Imphal (Regional Institute of Medical Sciences) as the top local aspiration. The state has a unique coaching gap — most national chains are absent or have minimal presence, and serious aspirants traditionally travel to Guwahati or Delhi NCR for prep. Manipuri students often come from regional-medium schooling and need a strong NCERT-bridge for NEET's English-medium requirements. Online with Cerebrum bridges this without relocation.",
    whyOnlineHere:
      'Manipur is geographically distant from major coaching hubs (Guwahati 1.5 hr by air, Delhi 3 hr). Online live classes via Zoom work over JIO/Airtel 4G that now covers most of Imphal valley. Saves relocation cost + cultural distance.',
    typicalAspirant:
      'Class 11 or 12 student at Don Bosco or Little Flower, first-generation NEET aspirant, target RIMS Imphal (state quota) or JNIMS.',
    localFaqs: [
      {
        question: 'RIMS Imphal vs JNIMS — which is more achievable for a Manipur domicile student?',
        answer:
          'Both have substantial Manipur state quota. RIMS Imphal recent biology cut-off ~310-325/360 for general category. JNIMS slightly lower. We target 340+/360 to give families options.',
      },
      {
        question:
          'Manipuri-medium student switching to NEET English — is the transition manageable?',
        answer:
          'Yes. Our NCERT-line-by-line guide explicitly teaches terminology bridging. Most Manipuri-medium students adapt within 4-5 weeks of starting.',
      },
      {
        question: 'Time zone for Imphal?',
        answer: 'Imphal is IST — same as Delhi. Live classes 5:30 PM - 8 PM Mon/Wed/Fri.',
      },
      {
        question: 'Shipping to Imphal — reliable?',
        answer:
          'Yes, 7-9 days via tracked courier. Northeast logistics slower than mainland but reliable for all Imphal pincodes.',
      },
    ],
  },
  {
    slug: 'indore',
    displayName: 'Indore',
    state: 'Madhya Pradesh',
    region: 'Central India',
    metroPopulationMn: 2.4,
    majorAreas: [
      'Vijay Nagar',
      'Palasia',
      'Sapna Sangeeta',
      'AB Road',
      'Bhawarkua',
      'Khargone Road',
    ],
    feederSchools: [
      'Daly College',
      'The Emerald Heights International School',
      'Choithram School',
      'Carmel Convent School',
      'DPS Indore',
      'Shri Cloth Market School',
    ],
    localCoachingPresence:
      "Allen Career Institute (Vijay Nagar — large center), Aakash Institute, FIITJEE, Resonance — Indore is one of MP's biggest NEET coaching hubs alongside Bhopal",
    stateQuotaCollege: 'MGM Medical College Indore',
    otherStateMedicalColleges: [
      'Gandhi Medical College Bhopal',
      'Netaji Subhash Chandra Bose Medical College Jabalpur',
      'AIIMS Bhopal',
    ],
    cityContext:
      "Indore is Madhya Pradesh's commercial capital and one of central India's biggest NEET coaching catchments. Vijay Nagar is the coaching corridor — Allen runs a flagship center there, Aakash, FIITJEE, and Resonance all have substantial branches. MGM Medical College Indore is the local prized institution under MP state quota. The recurring pattern: Indore students attending Allen Vijay Nagar do well on physics-chemistry but biology stays at 280-300 because of mass-coaching format.",
    whyOnlineHere:
      'Indore is well-connected internally but coaching commute from Bhawarkua or Khargone Road to Vijay Nagar can hit 30-45 min in traffic. Online removes this. Daly College and Emerald Heights students with rigorous school schedules particularly benefit from no-commute biology.',
    typicalAspirant:
      'Class 11 or 12 student in Vijay Nagar / Palasia / AB Road area, at Daly College, Emerald Heights, or Choithram. Target: MGM Medical College Indore (MP state quota) or AIIMS Bhopal.',
    localFaqs: [
      {
        question: 'MGM Medical College Indore vs AIIMS Bhopal — which to target?',
        answer:
          'MGM Indore biology cut-off has been ~320-340/360 for MP state quota general category. AIIMS Bhopal needs 340-350+/360. Most Indore families target both.',
      },
      {
        question: 'Is Cerebrum better than Allen Vijay Nagar for biology?',
        answer:
          'For biology alone — yes, due to 10-40 vs 150-200 student batch sizes. Keep Allen for PCM, add Cerebrum biology.',
      },
      {
        question: 'Schedule for a Daly College or Emerald Heights student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri. Fits school dismissal cleanly.',
      },
      {
        question: 'Shipping to Vijay Nagar or Palasia?',
        answer: 'All Indore pincodes covered next-day to 2 days.',
      },
    ],
  },
  {
    slug: 'jaipur',
    displayName: 'Jaipur',
    state: 'Rajasthan',
    region: 'North India',
    metroPopulationMn: 3.2,
    majorAreas: [
      'C-Scheme',
      'Malviya Nagar',
      'Mansarovar',
      'Vaishali Nagar',
      'Jawahar Nagar',
      'Tonk Road',
    ],
    feederSchools: [
      'Mayo College Boys School (Ajmer, Jaipur boarders)',
      "Maharani Gayatri Devi Girls' School",
      'Subodh Public School',
      'Step by Step School',
      "St. Xavier's School",
      'DPS Jaipur',
    ],
    localCoachingPresence:
      "Allen Career Institute (Mansarovar — Allen's second-largest center after Kota), Aakash Institute, Resonance, Vibrant Academy — Rajasthan has extraordinary coaching density",
    stateQuotaCollege: 'Sawai Man Singh Medical College Jaipur',
    otherStateMedicalColleges: [
      'JLN Medical College Ajmer',
      'RNT Medical College Udaipur',
      'AIIMS Jodhpur',
      'SP Medical College Bikaner',
    ],
    cityContext:
      "Jaipur is Rajasthan's second-biggest NEET coaching center after Kota — and arguably has the highest density of premium coaching faculty per square km in India. Allen Mansarovar is the flagship center serving thousands of students; SMS Medical College is the top state-quota target with all-India recognition. The challenge for Jaipur students: with so many large-batch coaching options, individual attention is impossible. Cerebrum runs as the biology specialist add-on for families who want depth beyond the lecture format.",
    whyOnlineHere:
      "Jaipur's sprawl from C-Scheme to Vaishali Nagar to Mansarovar means coaching commute can exceed 45 min. Online removes that. Also: many Jaipur families are alternates to Kota — they want premium biology without sending child away.",
    typicalAspirant:
      'Class 11 or 12 student in C-Scheme / Malviya Nagar / Mansarovar, at MGD School, Subodh Public, or DPS Jaipur. Target: SMS Medical College Jaipur (top state-quota) or AIIMS Jodhpur.',
    localFaqs: [
      {
        question: 'SMS Medical College Jaipur cut-off?',
        answer:
          'Rajasthan state quota for SMS Jaipur has been ~330-345/360 biology general category in recent years. AIIMS Jodhpur similar. Our programme targets 340+/360.',
      },
      {
        question: 'Is Cerebrum biology better than Allen Mansarovar?',
        answer:
          'For biology specifically — yes, due to small batch + weekly review. Allen Mansarovar is world-class for PCM coaching infrastructure but biology depth limited by batch size.',
      },
      {
        question: 'My child is a Mayo College Ajmer boarder — can they attend?',
        answer:
          'If school permits weeknight online classes, yes. We can provide a parent-to-school formal letter for permission.',
      },
      {
        question: 'Shipping to Mansarovar or C-Scheme?',
        answer: 'All Jaipur sectors covered next-day.',
      },
    ],
  },
  {
    slug: 'jalandhar',
    displayName: 'Jalandhar',
    state: 'Punjab',
    region: 'North India',
    metroPopulationMn: 0.87,
    majorAreas: [
      'Model Town',
      'Civil Lines',
      'BMC Chowk Area',
      'Adampur',
      'Urban Estate Phase 1',
      'GT Road',
    ],
    feederSchools: [
      'Cambridge International School',
      'Police DAV Public School',
      "St. Joseph's Convent School",
      "Sant Mohan Singh Khalsa Labana Girls' School",
      'Innocent Hearts School',
      'Lyallpur Khalsa College',
    ],
    localCoachingPresence:
      'Allen Career Institute (Model Town), Aakash Institute, Akal Academy — Punjab has solid coaching infrastructure but biology depth is the gap',
    stateQuotaCollege: 'Government Medical College Patiala',
    otherStateMedicalColleges: [
      'Government Medical College Amritsar',
      'Guru Gobind Singh Medical College Faridkot',
      'AIIMS Bathinda',
    ],
    cityContext:
      "Jalandhar is one of Punjab's three NEET catchments along with Amritsar and Ludhiana. Strong NRI Punjabi diaspora connections — many families have relatives in Canada / UK who fund coaching. Local coaching is solid (Allen Model Town, Aakash, Akal Academy) but biology specialist depth limited. The aspirational targets are GMC Patiala, GMC Amritsar, AIIMS Bathinda for Punjab state quota; some families also target AIIMS Delhi via all-India quota.",
    whyOnlineHere:
      'Jalandhar geography spreads from Model Town to Adampur to Urban Estate — 20-40 min commutes. Online removes this. NRI continuity: families relocating to Canada / UK keep the same biology teacher seamlessly.',
    typicalAspirant:
      "Class 11 or 12 student at Cambridge International, Police DAV, or St. Joseph's Convent. Often Punjabi business family. Target: GMC Patiala or AIIMS Bathinda.",
    localFaqs: [
      {
        question: 'GMC Patiala biology cut-off via Punjab state quota?',
        answer:
          'Recent years: ~315-335/360 biology general category. AIIMS Bathinda usually 340+/360. We target 340+/360 minimum.',
      },
      {
        question: 'Family is moving to Canada/UK mid-Class-12 — coaching continuity?',
        answer:
          'Same online programme follows the student to Surrey BC, Brampton, Slough, etc. Time zone batch swap within 48 hours.',
      },
      {
        question: 'Schedule for Cambridge International School student?',
        answer:
          'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri. Fits Cambridge International dismissal.',
      },
      {
        question: 'Shipping to Model Town or Adampur?',
        answer: 'All Jalandhar pincodes covered in 3-4 days.',
      },
    ],
  },
  {
    slug: 'jammu',
    displayName: 'Jammu',
    state: 'Jammu and Kashmir',
    region: 'North India',
    metroPopulationMn: 0.65,
    majorAreas: [
      'Gandhi Nagar',
      'Trikuta Nagar',
      'Sainik Colony',
      'Bakshi Nagar',
      'Channi Himmat',
      'Talab Tillo',
    ],
    feederSchools: [
      'Heritage School Jammu',
      'Presentation Convent School',
      'KC Public School',
      'Delhi Public School Jammu',
      'Air Force Bal Bharati School',
      'Jammu Sanskriti School',
    ],
    localCoachingPresence:
      'Aakash Institute (Gandhi Nagar), FIITJEE, local J&K coaching — premium options limited; serious aspirants often relocate to Chandigarh or Delhi',
    stateQuotaCollege: 'Government Medical College Jammu',
    otherStateMedicalColleges: [
      'Government Medical College Srinagar',
      'AIIMS Vijaypur (new, Jammu)',
      'SKIMS Soura Srinagar',
    ],
    cityContext:
      'Jammu is one of the two NEET catchments in the J&K UT alongside Srinagar. The unique factor: J&K has its own state quota system + the new AIIMS Vijaypur opening in Jammu adds a top-tier local target. Local coaching market is moderate — Aakash Gandhi Nagar is the main premium option but biology depth limited. Many families have defence-services background (Sainik Colony) with structured study culture.',
    whyOnlineHere:
      'Jammu winters limit commute reliability. Online via Zoom from home is consistent. Also: AIIMS Vijaypur is local — biology depth from AIIMS-trained Cerebrum faculty aligns with the local target.',
    typicalAspirant:
      'Class 11 or 12 student at Heritage School, Presentation Convent, or DPS Jammu. Often from defence-services or admin-services family. Target: AIIMS Vijaypur (new) or GMC Jammu.',
    localFaqs: [
      {
        question: 'AIIMS Vijaypur (new) — is it a realistic target for Jammu students?',
        answer:
          'Yes — AIIMS Vijaypur opened recently with J&K UT quota advantage for residents. Biology cut-off projected 330-345/360 based on initial cohorts.',
      },
      {
        question: 'Should a Jammu Class 12 dropper move to Delhi or Chandigarh?',
        answer:
          'Less necessary now. Cerebrum biology online + local Aakash for PCM = same effective coaching without relocation cost or winter logistics.',
      },
      { question: 'Time zone — Jammu is IST?', answer: 'Yes. Live classes 5:30 PM - 8 PM IST.' },
      {
        question: 'Shipping in Jammu winters?',
        answer:
          'Yes — 4-6 days to Gandhi Nagar / Trikuta Nagar / Sainik Colony. Heavy snowfall periods may add 2-3 days.',
      },
    ],
  },
  {
    slug: 'kanpur',
    displayName: 'Kanpur',
    state: 'Uttar Pradesh',
    region: 'North India',
    metroPopulationMn: 2.8,
    majorAreas: [
      'Swaroop Nagar',
      'Civil Lines',
      'Kakadeo',
      'Govind Nagar',
      'Kalyanpur',
      'Mall Road',
    ],
    feederSchools: [
      'Methodist Higher Secondary School',
      "St. Mary's Convent School",
      'Dr. Virendra Swarup Education Centre',
      'Christ Church College School',
      'Mariampur School',
      'CKAB International School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Swaroop Nagar), Aakash Institute, Resonance — Kanpur has strong UP coaching presence',
    stateQuotaCollege: 'GSVM Medical College Kanpur',
    otherStateMedicalColleges: [
      'KGMU Lucknow',
      'IMS BHU Varanasi',
      'MLN Medical College Prayagraj',
    ],
    cityContext:
      "Kanpur is one of UP's biggest cities and a major NEET catchment with GSVM Medical College Kanpur as the local state-quota prize. Industrial / merchant family base with high education investment. Local Allen Swaroop Nagar is strong; Aakash and Resonance also present. The gap is consistent: physics-chemistry is well-served, biology depth limited by large batches.",
    whyOnlineHere:
      'Kanpur sprawl from Civil Lines to Kalyanpur means commute is real. Online removes this. Plus: GSVM Medical College is in town, so once admitted, students get to study locally — the goal is achievable.',
    typicalAspirant:
      "Class 11 or 12 student at Methodist, St. Mary's Convent, or Dr. Virendra Swarup. Target: GSVM Medical College Kanpur (UP state quota) or KGMU Lucknow.",
    localFaqs: [
      {
        question: 'GSVM Medical College Kanpur — biology cut-off?',
        answer:
          'UP state quota: ~315-335/360 biology general category recent years. KGMU Lucknow ~325-345. We target 340+/360.',
      },
      {
        question: 'Is Allen Swaroop Nagar better than Cerebrum for biology?',
        answer:
          'For PCM combined — Allen wins. For biology specifically — Cerebrum, due to 10-40 student batches.',
      },
      {
        question: 'Schedule for Methodist or Christ Church College School student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri. Fits.',
      },
      { question: 'Shipping to Swaroop Nagar?', answer: 'All Kanpur pincodes 3-4 days.' },
    ],
  },
  {
    slug: 'karnal',
    displayName: 'Karnal',
    state: 'Haryana',
    region: 'North India',
    metroPopulationMn: 0.34,
    majorAreas: [
      'Sector 6',
      'Sector 12',
      'Sector 13',
      'Mughal Canal Area',
      'GT Road',
      'Kunjpura Road',
    ],
    feederSchools: [
      'OPS Vidya Mandir',
      "St. Theresa's Convent School",
      'Cambridge International School',
      'KVM Senior Secondary School',
      'Dyal Singh Public School',
      'Singhania Education Centre',
    ],
    localCoachingPresence:
      'Allen Career Institute, Aakash Institute (Sector 12), Brilliant Tutorials — Karnal is between Chandigarh and Delhi, students often pick between local + relocation',
    stateQuotaCollege: 'Kalpana Chawla Government Medical College Karnal',
    otherStateMedicalColleges: ['PGIMS Rohtak', 'BPS Khanpur Kalan', 'GMC Faridabad'],
    cityContext:
      'Karnal is a unique Haryana market — the city is the home of Kalpana Chawla Government Medical College, which is the local state-quota prize. Plus, GT Road location puts it midway between Chandigarh and Delhi. Local coaching exists but is modest scale. Many serious aspirants commute to Delhi or Chandigarh for coaching, which makes online with Cerebrum a strong alternative.',
    whyOnlineHere:
      'Karnal local coaching depth is limited. Driving 1-1.5 hr to Delhi or Chandigarh daily is impractical. Online removes this entirely. Also: Kalpana Chawla GMC Karnal is the prize — local biology coaching focus aligns.',
    typicalAspirant:
      "Class 11 or 12 student at OPS Vidya Mandir, St. Theresa's, or Cambridge International. Target: Kalpana Chawla GMC Karnal (Haryana state quota) or BPS Khanpur Kalan.",
    localFaqs: [
      {
        question: 'Kalpana Chawla GMC Karnal cut-off?',
        answer:
          'Haryana state quota: ~315-330/360 biology general category. Target 340+/360 in our programme.',
      },
      {
        question: 'Is online better than commuting to Chandigarh Allen?',
        answer:
          'Yes — daily 2-3 hr commute to Chandigarh is impractical. Online gives same depth without commute.',
      },
      {
        question: 'Schedule for OPS Vidya Mandir student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri. Easy fit.',
      },
      { question: 'Shipping to Sector 6 or Sector 13?', answer: 'Karnal pincodes 3-4 days.' },
    ],
  },
  {
    slug: 'kochi',
    displayName: 'Kochi',
    altNames: ['Cochin', 'Ernakulam'],
    state: 'Kerala',
    region: 'South India',
    metroPopulationMn: 2.1,
    majorAreas: ['Kakkanad', 'Edappally', 'Vyttila', 'Kaloor', 'Panampilly Nagar', 'Tripunithura'],
    feederSchools: [
      'Choice School Tripunithura',
      "Bhavan's Adarsha Vidyalaya",
      'Toc-H Public School',
      'Naipunnya Vidyalaya',
      'Rajagiri Public School',
      "St. Theresa's School Ernakulam",
    ],
    localCoachingPresence:
      'Brilliant Tutorials (long-standing Kerala chain), Allen Career Institute, Aakash Institute — Kerala has a unique strong-coaching market driven by high medical-career aspiration',
    stateQuotaCollege: 'Government Medical College Ernakulam',
    otherStateMedicalColleges: [
      'Government Medical College Thiruvananthapuram',
      'Government Medical College Kozhikode',
      'AIIMS Thiruvananthapuram (new)',
    ],
    cityContext:
      "Kochi is one of Kerala's three major NEET catchments along with Thiruvananthapuram and Kozhikode. Kerala has unusually high NEET aspirant density per capita and intense competition — Kerala students consistently rank highly nationally. Brilliant Tutorials is the local heritage chain; Allen and Aakash have expanded. The challenge: extremely high local competition + Kerala State Board syllabus differs significantly from NCERT.",
    whyOnlineHere:
      "Kochi spread from Kakkanad to Tripunithura is 45+ min. Online removes this. Also: Kerala State Board students need NCERT bridge that local coaching often glosses over — Cerebrum's NCERT-line-by-line focus addresses this.",
    typicalAspirant:
      "Class 11 or 12 student at Choice School, Bhavan's, or Toc-H. Often from doctor / business family with high medical aspiration. Target: GMC Ernakulam (Kerala state quota) or AIIMS Trivandrum.",
    localFaqs: [
      {
        question: 'Will Cerebrum match Kerala State Board syllabus?',
        answer:
          "We teach NEET NCERT exclusively. If your child is on Kerala State Board (Plus One/Two), our first 4 weeks bridge from state-board to NCERT framing. CBSE/ICSE students from Choice School / Bhavan's already aligned.",
      },
      {
        question: 'GMC Ernakulam vs GMC Thiruvananthapuram?',
        answer:
          'Both via Kerala state quota: GMC Ernakulam ~330-340/360, GMC TVM higher ~340-350. We target 340+/360 minimum.',
      },
      {
        question: 'Live classes in Malayalam?',
        answer:
          'No — all in NCERT-aligned English (NEET medium of instruction). Most Kerala CBSE students adapt instantly.',
      },
      { question: 'Shipping to Kakkanad or Tripunithura?', answer: 'All Kochi pincodes 4-5 days.' },
    ],
  },
  {
    slug: 'kota',
    displayName: 'Kota',
    state: 'Rajasthan',
    region: 'North India',
    metroPopulationMn: 1.2,
    majorAreas: [
      'Talwandi',
      'Indra Vihar',
      'Vigyan Nagar',
      'Rajeev Gandhi Nagar',
      'Jawahar Nagar',
      'Koral Park',
    ],
    feederSchools: [
      'Career Point Higher Secondary School',
      'Resonance School',
      'Allen High School',
      'Modern Public School',
      'Maheshwari Public School',
      'Lawrence Higher Secondary School (Sanawar boarders)',
    ],
    localCoachingPresence:
      'Allen Career Institute (THE Kota flagship), Aakash, Resonance, Bansal Classes, Career Point, Vibrant — Kota is the NEET coaching capital of India',
    stateQuotaCollege: 'Government Medical College Kota',
    otherStateMedicalColleges: [
      'SMS Medical College Jaipur',
      'JLN Medical College Ajmer',
      'AIIMS Jodhpur',
      'RNT Medical College Udaipur',
    ],
    cityContext:
      "Kota is the NEET coaching capital of India — every national chain operates a flagship here. Most students reading this page are already in Kota, enrolled in Allen / Aakash / Resonance / Career Point / Bansal for the full PCM package. We don't compete with that — Kota's physics-chemistry is genuinely the best in India. But biology consistently emerges as the soft spot: students scoring 90+ on PC but stuck at 65-70 in biology because large-batch coaching can't give per-question discussion time that biology requires.",
    whyOnlineHere:
      'Kota integration: 6 hours/week of live online biology — early morning before Allen Talwandi classes start, or late-evening slots after Aakash hours. Specifically designed not to disrupt your existing Kota schedule.',
    typicalAspirant:
      'Class 12 or dropper student enrolled at Allen Kota / Aakash / Resonance, residing in Talwandi or Indra Vihar. PCM is solid; biology stagnating at 65-70 / 90. Target: AIIMS Delhi / Jodhpur via all-India quota or top state-quota colleges.',
    localFaqs: [
      {
        question: "I'm already at Allen Kota / Resonance / Career Point. Why add Cerebrum?",
        answer:
          "Because biology is where Kota droppers consistently underperform PCM. Kota's PCM teaching is world-class; biology depth is the weak spot. 6 hours/week of Cerebrum biology, early morning or late evening, fills the gap without disrupting your primary coaching.",
      },
      {
        question: "When do Cerebrum biology classes run that don't clash with Kota schedule?",
        answer:
          'Early-morning slot 6-7:30 AM (before Kota main batches start at 8 AM) or late-evening 8:30-10 PM (after Kota classes end). Recordings if you miss.',
      },
      {
        question: 'Will printed material reach Talwandi or Indra Vihar?',
        answer: 'Yes — Kota pincodes 2-3 days.',
      },
      {
        question: 'Is Cerebrum better than Allen Kota for biology specifically?',
        answer:
          'For biology only — yes. Allen Kota PCM is unmatched, but their biology batches are 150+ students. Cerebrum batches are 10-40 with per-MCQ review.',
      },
    ],
  },
  {
    slug: 'kozhikode',
    displayName: 'Kozhikode',
    altNames: ['Calicut'],
    state: 'Kerala',
    region: 'South India',
    metroPopulationMn: 2.0,
    majorAreas: [
      'Mananchira',
      'Wayanad Road',
      'Beach Road',
      'Vellayil',
      'Civil Station',
      'Medical College Road',
    ],
    feederSchools: [
      'Silver Hills Higher Secondary School',
      'Saraswathi Vidyalaya',
      'Markaz English Medium School',
      "St. Joseph's English Medium School",
      'Devagiri CMI Public School',
      'JDT Islam Higher Secondary School',
    ],
    localCoachingPresence:
      'Brilliant Tutorials, Allen Career Institute, Aakash Institute — Kerala-strong coaching presence with Brilliant the local heritage chain',
    stateQuotaCollege: 'Government Medical College Kozhikode',
    otherStateMedicalColleges: [
      'Government Medical College Thiruvananthapuram',
      'Government Medical College Ernakulam',
      'AIIMS Thiruvananthapuram (new)',
    ],
    cityContext:
      "Kozhikode is North Kerala's primary NEET coaching catchment with GMC Kozhikode as the local target. The Kerala medical aspiration culture is strong — many families have NRI Gulf connections that fund coaching. Local Brilliant Tutorials has heritage; Allen and Aakash have expanded. Same Kerala State Board → NCERT bridge challenge as Kochi.",
    whyOnlineHere:
      'Kozhikode geographic spread + traffic make commute real. Online removes this. NRI Gulf families increasingly prefer online so coaching continues if family moves between Kerala and UAE/Saudi.',
    typicalAspirant:
      'Class 11 or 12 student at Silver Hills, Devagiri CMI, or JDT Islam. Often Muslim or Christian family with Gulf NRI connections. Target: GMC Kozhikode (Kerala state quota) or AIIMS TVM.',
    localFaqs: [
      {
        question: 'GMC Kozhikode biology cut-off?',
        answer:
          "Kerala state quota: ~325-340/360 biology general category. Highly competitive due to Kerala's NEET density.",
      },
      {
        question: 'Family travels between Kozhikode and UAE — coaching continuity?',
        answer:
          'Yes — same programme follows student to Dubai / Abu Dhabi / Sharjah. Time zone batch swap.',
      },
      {
        question: 'Live classes in Malayalam?',
        answer: 'No — English (NCERT NEET medium). Most CBSE/ICSE students adapt instantly.',
      },
      {
        question: 'Shipping to Medical College Road or Beach Road?',
        answer: 'All Kozhikode pincodes 4-5 days.',
      },
    ],
  },
  {
    slug: 'lucknow',
    displayName: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North India',
    metroPopulationMn: 2.9,
    majorAreas: [
      'Gomti Nagar',
      'Hazratganj',
      'Indira Nagar',
      'Aliganj',
      'Mahanagar',
      'Vibhuti Khand',
    ],
    feederSchools: [
      'La Martiniere College',
      'City Montessori School (CMS)',
      'Loreto Convent',
      "St. Francis' College",
      'Bishop Johnson School',
      'DPS Eldeco',
    ],
    localCoachingPresence:
      "Allen Career Institute (Gomti Nagar — flagship UP center), Aakash Institute, Resonance, FIITJEE — Lucknow has UP's densest premium NEET coaching market",
    stateQuotaCollege: "King George's Medical University (KGMU) Lucknow",
    otherStateMedicalColleges: [
      'SGPGI Lucknow (PG focus)',
      'IMS BHU Varanasi',
      'GSVM Medical College Kanpur',
    ],
    cityContext:
      "Lucknow is UP's capital and the most aspirational NEET catchment in the state — KGMU Lucknow is the top UP state-quota college. The recurring student profile: La Martiniere or CMS student with strong fundamentals targeting KGMU directly. Allen Gomti Nagar is the flagship NEET coaching presence; Aakash and Resonance also strong. The standard issue: physics-chemistry depth is good, biology depth limited.",
    whyOnlineHere:
      'Lucknow sprawl from Gomti Nagar to Aliganj to Vibhuti Khand means coaching commute can hit 45-60 min. Online removes this. La Martiniere students with packed school schedules particularly benefit.',
    typicalAspirant:
      'Class 11 or 12 student in Gomti Nagar or Mahanagar, at La Martiniere, CMS, or Loreto Convent. Target: KGMU Lucknow (UP state quota — the prize).',
    localFaqs: [
      {
        question: 'KGMU Lucknow biology cut-off?',
        answer:
          'UP state quota: ~330-345/360 biology general category. Very competitive. Our programme targets 340+/360.',
      },
      {
        question: 'Is Cerebrum better than Allen Gomti Nagar for biology?',
        answer:
          'For biology alone — yes, due to small-batch model. Keep Allen Gomti Nagar for PCM, add Cerebrum for biology.',
      },
      {
        question: 'Schedule for La Martiniere College student?',
        answer:
          "Live online 5:30 PM - 8 PM IST Mon/Wed/Fri. Fits La Martiniere's rigorous schedule.",
      },
      {
        question: 'Shipping to Gomti Nagar or Hazratganj?',
        answer: 'All Lucknow pincodes 2-3 days.',
      },
    ],
  },
  {
    slug: 'ludhiana',
    displayName: 'Ludhiana',
    state: 'Punjab',
    region: 'North India',
    metroPopulationMn: 1.8,
    majorAreas: [
      'Sarabha Nagar',
      'BRS Nagar',
      'Civil Lines',
      'Pakhowal Road',
      'Sahnewal',
      'Model Town',
    ],
    feederSchools: [
      'Sacred Heart Convent School',
      'DAV Public School BRS Nagar',
      'Sat Paul Mittal School',
      'Bhartiya Vidya Mandir',
      'Spring Dale Public School',
      'Khalsa College for Women',
    ],
    localCoachingPresence:
      "Allen Career Institute (Sarabha Nagar), Aakash Institute, Brilliant Tutorials — Punjab's biggest NEET coaching market alongside Amritsar",
    stateQuotaCollege: 'Dayanand Medical College Ludhiana (private + Punjab pool)',
    otherStateMedicalColleges: [
      'Government Medical College Patiala',
      'Government Medical College Amritsar',
      'AIIMS Bathinda',
    ],
    cityContext:
      "Ludhiana is Punjab's industrial capital with strong business-family wealth funding intensive NEET prep. Dayanand Medical College (DMCH) Ludhiana is a major local target — private but excellent. Allen Sarabha Nagar is the flagship center; Aakash present. The pattern: Punjabi business families want quick conversion to MBBS, biology depth is the rate-limiting factor.",
    whyOnlineHere:
      'Ludhiana spread from BRS Nagar to Pakhowal Road is real. Online removes commute. NRI continuity: many Ludhiana families have Canada/UK relatives, online survives any relocation.',
    typicalAspirant:
      'Class 11 or 12 student at Sacred Heart Convent, DAV BRS Nagar, or Sat Paul Mittal. Punjabi business family target: GMC Patiala / DMCH Ludhiana or AIIMS Bathinda.',
    localFaqs: [
      {
        question: 'GMC Patiala biology cut-off?',
        answer: 'Punjab state quota: ~315-335/360. AIIMS Bathinda ~340+/360.',
      },
      {
        question: 'Family moving to Canada — continuity?',
        answer: 'Yes — same programme, time-zone batch swap.',
      },
      {
        question: 'Schedule for Sat Paul Mittal student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      { question: 'Shipping to Sarabha Nagar?', answer: 'All Ludhiana pincodes 3-4 days.' },
    ],
  },
  {
    slug: 'madurai',
    displayName: 'Madurai',
    state: 'Tamil Nadu',
    region: 'South India',
    metroPopulationMn: 1.6,
    majorAreas: [
      'Anna Nagar',
      'KK Nagar',
      'Bypass Road',
      'Tallakulam',
      'Goripalayam',
      'Madurai South',
    ],
    feederSchools: [
      'TVS Lakshmi School',
      'Velammal Vidhyashram',
      'Mahatma Higher Secondary School',
      'Lakshmi Mills HS',
      'Yadava College Higher Secondary',
      'CSI Bain HS School',
    ],
    localCoachingPresence:
      'Aakash Institute (Anna Nagar), Brilliant Tutorials, Pace Academy — Tamil Nadu has a unique state-board-dominated coaching market',
    stateQuotaCollege: 'Madurai Medical College',
    otherStateMedicalColleges: [
      'Madras Medical College Chennai',
      'Stanley Medical College Chennai',
      'Government Tirunelveli Medical College',
    ],
    cityContext:
      "Madurai is South Tamil Nadu's primary NEET catchment with Madurai Medical College as the local target. Tamil Nadu has unique NEET state policy (legal challenges, state-board-friendly framing) that affects student preparation. Local coaching exists (Aakash, Brilliant, Pace) but biology depth limited. Velammal and TVS schools are NEET-feeder strong.",
    whyOnlineHere:
      'Madurai geography + commute reality + the Tamil Nadu State Board → NCERT bridge challenge make online with Cerebrum particularly valuable.',
    typicalAspirant:
      'Class 11 or 12 student at TVS Lakshmi, Velammal, or Lakshmi Mills. Often middle-class Tamil family. Target: Madurai Medical College or Madras Medical College Chennai.',
    localFaqs: [
      {
        question: 'TN State Board student transitioning to NEET English?',
        answer:
          'Our first 4 weeks explicitly bridge from TN State Board framing to NCERT. Most students adapt within a month.',
      },
      {
        question: 'Madurai Medical College cut-off?',
        answer:
          'TN state quota: ~315-330/360 biology general. Recent years have seen TN policy shifts; we calibrate accordingly.',
      },
      {
        question: 'Classes in Tamil?',
        answer: 'No — English (NEET medium). CBSE/ICSE students adapt instantly.',
      },
      { question: 'Shipping to Anna Nagar or KK Nagar?', answer: 'All Madurai pincodes 5-6 days.' },
    ],
  },
  {
    slug: 'mangalore',
    displayName: 'Mangalore',
    altNames: ['Mangaluru'],
    state: 'Karnataka',
    region: 'South India',
    metroPopulationMn: 0.62,
    majorAreas: ['Kankanady', 'Bejai', 'Bunder', 'Kadri', 'Surathkal', 'Hampankatta'],
    feederSchools: [
      'St. Aloysius College',
      'Canara High School',
      'Padua Higher Secondary School',
      'Sharada Vidyalaya',
      'KPT High School',
      'Carmel Higher Secondary School',
    ],
    localCoachingPresence:
      "Allen Career Institute, Aakash Institute, Pinnacle, Expert PU College — Mangalore is Karnataka's second NEET catchment after Bangalore",
    stateQuotaCollege: 'Kasturba Medical College Mangalore (private + KEA pool)',
    otherStateMedicalColleges: [
      'Government Medical College Mysore',
      'Bangalore Medical College',
      'JJM Medical College Davangere',
    ],
    cityContext:
      "Mangalore is Coastal Karnataka's NEET catchment with Kasturba Medical College (KMC) Mangalore as a flagship medical institution (Manipal group, private but K-CET/NEET-counselling eligible). St. Aloysius is the heritage college and feeder school combined. Coastal Karnataka students have strong English-medium foundations from convent schools, which aligns well with NEET NCERT.",
    whyOnlineHere:
      'Mangalore is geographically constrained between hills and sea — coaching commute genuinely difficult. Online removes this. Plus: many Mangaluru families have Gulf NRI relatives — online continues if family moves.',
    typicalAspirant:
      'Class 11 or 12 student at St. Aloysius, Canara, or Padua. Coastal Karnataka Catholic or Hindu Bunt family. Target: KMC Mangalore or Bangalore Medical College.',
    localFaqs: [
      {
        question: 'Karnataka KEA NEET process for Mangalore students?',
        answer:
          'Karnataka has 85% state quota across govt + KEA-counselled private colleges. Biology cut-off varies: KMC Mangalore ~325-345/360 general.',
      },
      {
        question: 'St. Aloysius College student schedule?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      {
        question: 'Live classes in Kannada or Tulu?',
        answer: 'No — English. Coastal Karnataka convent students already English-strong.',
      },
      {
        question: 'Shipping to Kankanady or Surathkal?',
        answer: 'All Mangalore pincodes 5-6 days.',
      },
    ],
  },
  {
    slug: 'meerut',
    displayName: 'Meerut',
    state: 'Uttar Pradesh',
    region: 'North India',
    metroPopulationMn: 1.6,
    majorAreas: [
      'Shastri Nagar',
      'Begum Bagh',
      'Jagrati Vihar',
      'Sadar Bazaar',
      'Cantt Area',
      'Pallavpuram',
    ],
    feederSchools: [
      'Dewan Public School',
      "St. Mary's Academy",
      'Sophia Girls School',
      'Bhartiya Public School',
      'St. Francis Convent School',
      'Army Public School Meerut Cantt',
    ],
    localCoachingPresence:
      "Allen Career Institute (Shastri Nagar), Aakash Institute, Resonance — Meerut has UP's NCR-adjacent coaching scene",
    stateQuotaCollege: 'Lala Lajpat Rai Memorial Medical College Meerut',
    otherStateMedicalColleges: ['KGMU Lucknow', 'IMS BHU Varanasi', 'GSVM Medical College Kanpur'],
    cityContext:
      "Meerut is one of UP's biggest cities and NCR-adjacent — Allen Shastri Nagar is the main premium coaching presence. LLRM Meerut Medical College is the local state-quota target. Heavy Cantonment / defence-services family base in Cantt area gives a structured study culture. Standard issue: PCM well-served, biology depth limited.",
    whyOnlineHere:
      'Meerut to Delhi NCR coaching commute is 1.5-2 hr — impractical. Online removes this. Plus: Cantt families have transferable lifestyle, online survives relocations.',
    typicalAspirant:
      "Class 11 or 12 student at Dewan Public School, St. Mary's Academy, or Army Public School Meerut Cantt. Target: LLRM Meerut (UP state quota) or KGMU Lucknow.",
    localFaqs: [
      {
        question: 'LLRM Meerut biology cut-off?',
        answer: 'UP state quota: ~315-335/360 biology general category.',
      },
      {
        question: 'Is Allen Shastri Nagar Meerut enough?',
        answer:
          'For PCM — yes. For biology depth — no, due to large batches. Add Cerebrum biology specifically.',
      },
      {
        question: 'Schedule for Army Public School Meerut Cantt student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      {
        question: 'Shipping to Shastri Nagar or Cantt area?',
        answer: 'All Meerut pincodes 3-4 days.',
      },
    ],
  },
  {
    slug: 'mysore',
    displayName: 'Mysuru',
    altNames: ['Mysore'],
    state: 'Karnataka',
    region: 'South India',
    metroPopulationMn: 0.89,
    majorAreas: [
      'Vijayanagar',
      'Kuvempunagar',
      'Jayalakshmipuram',
      'Saraswathipuram',
      'Hebbal',
      'Bogadi',
    ],
    feederSchools: [
      'Demonstration Multipurpose School',
      'Marimallappa Higher Secondary School',
      "St. Joseph's Central School",
      'CFTRI Public School',
      'JSS High School',
      "St. Philomena's Composite College",
    ],
    localCoachingPresence:
      'Allen Career Institute, Aakash Institute, Expert PU College — Mysuru has solid coaching but smaller scale than Bangalore',
    stateQuotaCollege:
      'Government Medical College Mysuru (Mysore Medical College & Research Institute)',
    otherStateMedicalColleges: [
      'Bangalore Medical College',
      'JJM Medical College Davangere',
      'KMC Mangalore',
      'JSS Medical College Mysuru (private)',
    ],
    cityContext:
      "Mysuru is Karnataka's heritage city with MMC&RI as the local state-quota target plus JSS Medical College (private, K-CET pool). The city has a strong academic culture and Karnataka State Board / CBSE mix in feeder schools. Local coaching is solid (Allen, Aakash) but the same biology depth issue.",
    whyOnlineHere:
      'Mysuru is moderate-sized and coaching commute manageable but online still saves 30-45 min daily. JSS Medical College aspiration aligns with biology specialist focus.',
    typicalAspirant:
      "Class 11 or 12 student at Demonstration School, Marimallappa, or St. Joseph's. Target: MMC&RI Mysuru, JSS Medical College, or Bangalore Medical College.",
    localFaqs: [
      {
        question: 'MMC&RI Mysuru cut-off?',
        answer: 'Karnataka state quota: ~320-340/360 biology general category.',
      },
      {
        question: 'JSS Medical College Mysuru via K-CET pool?',
        answer:
          'Private college but accessed through KEA counselling — biology cut-off similar ~315-335/360.',
      },
      {
        question: 'Live classes in Kannada?',
        answer: 'No — English. CBSE/ICSE Mysuru students English-strong.',
      },
      {
        question: 'Shipping to Vijayanagar or Saraswathipuram?',
        answer: 'All Mysuru pincodes 5-6 days.',
      },
    ],
  },
  {
    slug: 'nashik',
    displayName: 'Nashik',
    state: 'Maharashtra',
    region: 'West India',
    metroPopulationMn: 1.8,
    majorAreas: [
      'Gangapur Road',
      'College Road',
      'Indira Nagar',
      'CIDCO Nashik',
      'Panchavati',
      'Nashik Road',
    ],
    feederSchools: [
      'Wisdom High School',
      'Fravashi International Academy',
      'Delhi Public School Nashik',
      'Eklavya Vidyalaya',
      'Heritage High School',
      'Saraswati Vidya Mandir',
    ],
    localCoachingPresence:
      'Allen Career Institute, Aakash Institute, FIITJEE — Maharashtra has strong NEET coaching market, biology depth the gap',
    stateQuotaCollege: 'Government Medical College Nashik',
    otherStateMedicalColleges: [
      'Grant Government Medical College Mumbai',
      'BJ Medical College Pune',
      'AIIMS Nagpur',
    ],
    cityContext:
      'Nashik is a major Maharashtra NEET catchment — viticulture + industrial business families with high education investment. GMC Nashik is the local state-quota target. Local Allen, Aakash, FIITJEE all present. Maharashtra State Board to NCERT bridge same as Aurangabad.',
    whyOnlineHere:
      'Nashik spread from Gangapur Road to CIDCO is real. Online removes commute. State Board → NCERT bridge needs explicit work.',
    typicalAspirant:
      'Class 11 or 12 student at Wisdom High, Fravashi International, or DPS Nashik. Target: GMC Nashik or BJ Medical College Pune.',
    localFaqs: [
      {
        question: 'GMC Nashik biology cut-off?',
        answer: 'Maharashtra state quota: ~325-340/360 biology general category.',
      },
      {
        question: 'Will biology match Maharashtra State Board syllabus?',
        answer: 'We teach NEET NCERT. First 4 weeks bridge from state-board framing.',
      },
      {
        question: 'Schedule for Wisdom High School student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      { question: 'Shipping to Gangapur Road or CIDCO?', answer: 'All Nashik pincodes 5-6 days.' },
    ],
  },
  {
    slug: 'noida',
    displayName: 'Noida',
    state: 'Uttar Pradesh',
    region: 'North India',
    metroPopulationMn: 1.1,
    majorAreas: [
      'Sector 18',
      'Sector 50',
      'Sector 62',
      'Sector 76',
      'Sector 137',
      'Greater Noida West (Bisrakh)',
    ],
    feederSchools: [
      'DPS Noida',
      'Amity International School',
      'Pathways World School',
      'GD Goenka Public School Noida',
      'Cambridge School',
      'Genesis Global School',
    ],
    localCoachingPresence:
      'Allen Career Institute (Sector 62 — large NCR center), Aakash Institute, FIITJEE — heavy NCR coaching density',
    stateQuotaCollege: 'KGMU Lucknow (UP state quota)',
    otherStateMedicalColleges: [
      'IMS BHU Varanasi',
      'MLN Medical College Prayagraj',
      'AIIMS Delhi (all-India quota)',
    ],
    cityContext:
      "Noida is NCR's tech-corridor with high-income professional families and intense NEET aspiration. Allen Sector 62 is one of NCR's biggest NEET coaching centers; Aakash and FIITJEE also strong. UP domicile gives state quota access to KGMU Lucknow etc. The pattern: students do well on physics-chemistry through Allen but biology stays at 280-300.",
    whyOnlineHere:
      'Noida sector spread + sector-62 commute from sector 137 or Greater Noida West is real. Online removes this. Many Noida tech-family kids prefer online for distraction-free home study.',
    typicalAspirant:
      'Class 11 or 12 student in Sectors 18 / 50 / 62 / 137, at DPS Noida, Amity, or Pathways. Tech-corridor family. Target: KGMU Lucknow or AIIMS Delhi (all-India quota).',
    localFaqs: [
      {
        question: 'KGMU Lucknow or AIIMS Delhi for a Noida student?',
        answer:
          'KGMU via UP state quota ~330-345/360. AIIMS Delhi via all-India quota 350+/360. Most Noida families target both.',
      },
      {
        question: 'Is Cerebrum better than Allen Sector 62 for biology?',
        answer: 'For biology only — yes, due to small-batch model.',
      },
      {
        question: 'Schedule for DPS Noida or Amity International student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      {
        question: 'Shipping to Sector 137 or Bisrakh?',
        answer: 'All Noida sectors same-day to next-day.',
      },
    ],
  },
  {
    slug: 'patna',
    displayName: 'Patna',
    state: 'Bihar',
    region: 'East India',
    metroPopulationMn: 2.5,
    majorAreas: [
      'Boring Road',
      'Kankarbagh',
      'Rajendra Nagar',
      'Patliputra Colony',
      'Bailey Road',
      'Patel Nagar',
    ],
    feederSchools: [
      "St. Michael's High School",
      'Don Bosco Academy',
      'DAV BSEB Patna',
      'Loyola High School',
      "St. Karen's Secondary School",
      'Notre Dame Academy',
    ],
    localCoachingPresence:
      'Allen Career Institute (Boring Road), Aakash Institute, Goal Institute (Patna heritage), Super 30 — Bihar has unique strong-coaching culture (Anand Kumar legacy)',
    stateQuotaCollege: 'Patna Medical College',
    otherStateMedicalColleges: [
      'Indira Gandhi Institute of Medical Sciences Patna',
      'AIIMS Patna',
      'Darbhanga Medical College',
    ],
    cityContext:
      "Patna is Bihar's capital with unique NEET coaching culture rooted in the Anand Kumar / Super 30 legacy — Bihar produces extraordinary NEET success rates per capita despite economic constraints. AIIMS Patna and PMCH are top local targets. Boring Road is the coaching corridor. Bihar students often come from rural/semi-urban backgrounds with strong NCERT focus.",
    whyOnlineHere:
      'Patna sprawl + commute traffic make online genuinely useful. Plus: Bihar students from outlying districts (Muzaffarpur, Darbhanga, Gaya) often relocate to Patna for coaching — online lets them stay home.',
    typicalAspirant:
      "Class 11 or 12 student at St. Michael's, Don Bosco Academy, or DAV BSEB. Target: AIIMS Patna or PMCH (Bihar state quota).",
    localFaqs: [
      {
        question: 'AIIMS Patna biology cut-off?',
        answer: 'Bihar state quota (15%) + all-India quota (85%). Biology cut-off ~335-350/360.',
      },
      {
        question: 'Is Cerebrum better than Goal Institute or Allen Boring Road?',
        answer: 'For biology specifically — yes, due to small-batch model.',
      },
      {
        question: 'Bihar student from outlying district — online works from village?',
        answer:
          'Yes — JIO/Airtel 4G covers most of Bihar now. Online removes the need to relocate to Patna.',
      },
      {
        question: 'Shipping to Boring Road or Kankarbagh?',
        answer: 'All Patna pincodes 4-5 days.',
      },
    ],
  },
  {
    slug: 'pondicherry',
    displayName: 'Puducherry',
    altNames: ['Pondicherry'],
    state: 'Puducherry (UT)',
    region: 'South India',
    metroPopulationMn: 0.66,
    majorAreas: [
      'White Town',
      'Lawspet',
      'Reddiarpalayam',
      'Muthialpet',
      'Heritage Town',
      'Auroville Area',
    ],
    feederSchools: [
      'Petit Seminaire Higher Secondary School',
      'Mahatma Higher Secondary School',
      'Lycée Français de Pondichéry',
      'Kendriya Vidyalaya Pondicherry',
      'Ashram School Auroville',
      'Sri Aurobindo International School',
    ],
    localCoachingPresence:
      'Allen Career Institute (limited), Aakash Institute — Puducherry coaching depth limited; many students travel to Chennai',
    stateQuotaCollege:
      'Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER) Puducherry',
    otherStateMedicalColleges: [
      'Indira Gandhi Medical College and Research Institute Puducherry',
      'Madras Medical College Chennai',
      'AIIMS Madurai (proposed)',
    ],
    cityContext:
      "Puducherry is unique — home to JIPMER Puducherry, one of India's most prestigious medical institutions. Puducherry UT residents get UT pool access (significant advantage). The city has French heritage academic culture (Lycée Français) plus traditional Tamil-medium schools. JIPMER is the local prize and aspiration.",
    whyOnlineHere:
      'Puducherry has limited local biology specialist depth. Students traditionally travel to Chennai. Online with Cerebrum gives Puducherry students same biology depth without commute.',
    typicalAspirant:
      'Class 11 or 12 student at Petit Seminaire, Lycée Français, or KV Pondicherry. Target: JIPMER Puducherry (UT pool advantage) or IGMCRI.',
    localFaqs: [
      {
        question: 'JIPMER Puducherry — realistic target?',
        answer:
          'Yes, with UT pool advantage (50% UT reservation). Biology cut-off ~340-355/360 historically.',
      },
      {
        question: 'Live classes in French (for Lycée Français students)?',
        answer: 'No — English (NEET medium). Lycée Français students typically English-strong.',
      },
      {
        question: 'Schedule for Petit Seminaire student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      { question: 'Shipping to White Town or Auroville?', answer: 'Puducherry pincodes 5-6 days.' },
    ],
  },
  {
    slug: 'raipur',
    displayName: 'Raipur',
    state: 'Chhattisgarh',
    region: 'Central India',
    metroPopulationMn: 1.1,
    majorAreas: [
      'Pandri',
      'Shankar Nagar',
      'Civil Lines',
      'New Rajendra Nagar',
      'Avanti Vihar',
      'Tatibandh',
    ],
    feederSchools: [
      'Delhi Public School Raipur',
      'Krishna Public School',
      'Salem English School',
      'Holy Cross Convent School',
      'Bharat Mata HS School',
      'St. Vincent Pallotti School',
    ],
    localCoachingPresence:
      "Allen Career Institute, Aakash Institute, Resonance — Chhattisgarh's newer NEET coaching market, depth growing but biology gap persists",
    stateQuotaCollege: 'Pandit Jawaharlal Nehru Memorial Medical College Raipur',
    otherStateMedicalColleges: [
      'Late Shri Lakhi Ram Agrawal Medical College Raigarh',
      'AIIMS Raipur',
      'Government Medical College Bilaspur',
    ],
    cityContext:
      "Raipur is Chhattisgarh's capital with AIIMS Raipur and PJNMMC as top local targets. The state's NEET coaching market is newer than UP/MP — many serious aspirants previously traveled to Indore or Delhi. Local Allen and Aakash branches have grown but biology depth limited. Chhattisgarh state quota gives substantial reservation advantage for state-domicile students.",
    whyOnlineHere:
      'Raipur growing coaching market still has depth gaps. Online with Cerebrum gives AIIMS-trained biology faculty access without relocation to Indore or Delhi.',
    typicalAspirant:
      'Class 11 or 12 student at DPS Raipur, Krishna Public School, or Holy Cross. Target: AIIMS Raipur (state advantage) or PJNMMC Raipur.',
    localFaqs: [
      {
        question: 'AIIMS Raipur biology cut-off?',
        answer:
          'Chhattisgarh state quota (15%) + all-India (85%). Biology ~335-350/360. State residents have real advantage.',
      },
      {
        question: 'Should a Raipur dropper move to Indore?',
        answer: 'Not necessary. Online Cerebrum biology + local Allen / Aakash for PCM works.',
      },
      {
        question: 'Schedule for DPS Raipur student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      { question: 'Shipping to Pandri or Civil Lines?', answer: 'All Raipur pincodes 4-5 days.' },
    ],
  },
  {
    slug: 'rajkot',
    displayName: 'Rajkot',
    state: 'Gujarat',
    region: 'West India',
    metroPopulationMn: 1.4,
    majorAreas: [
      'Race Course Ring Road',
      'Kalawad Road',
      'University Road',
      'Yagnik Road',
      'Nana Mauva',
      'Pradyumnanagar',
    ],
    feederSchools: [
      'JJ Academy',
      'Delhi Public School Rajkot',
      'Atmiya Vidya Mandir',
      'Mody School Lakshmangarh (Rajkot students travel)',
      'Sanskar Bharati School',
      "Saint Anne's School",
    ],
    localCoachingPresence:
      'Allen Career Institute, Aakash Institute, Resonance — Gujarat has growing NEET coaching market',
    stateQuotaCollege: 'PDU Government Medical College Rajkot',
    otherStateMedicalColleges: [
      'BJ Medical College Ahmedabad',
      'Government Medical College Surat',
      'AIIMS Rajkot (new)',
    ],
    cityContext:
      "Rajkot is Saurashtra's primary NEET catchment with PDU GMC Rajkot and the upcoming AIIMS Rajkot as top local targets. Gujarati business / industrial family base with strong investment in education. Local Allen and Aakash have grown. Gujarat State Board to NCERT bridge similar challenge as other state-board markets.",
    whyOnlineHere:
      'Rajkot sprawl from Race Course Ring Road to University Road is real. Online removes commute. AIIMS Rajkot (new) target makes biology depth particularly worthwhile.',
    typicalAspirant:
      'Class 11 or 12 student at JJ Academy, DPS Rajkot, or Atmiya Vidya Mandir. Gujarati business family. Target: AIIMS Rajkot (new) or PDU GMC Rajkot.',
    localFaqs: [
      {
        question: 'AIIMS Rajkot biology cut-off?',
        answer: 'New AIIMS — Gujarat state quota advantage. Projected ~330-345/360.',
      },
      {
        question: 'Will Cerebrum match Gujarat State Board?',
        answer: 'We teach NCERT. First 4 weeks bridge from state-board if needed.',
      },
      { question: 'Live classes in Gujarati?', answer: 'No — English (NEET medium).' },
      {
        question: 'Shipping to Race Course Ring Road or Yagnik Road?',
        answer: 'All Rajkot pincodes 4-5 days.',
      },
    ],
  },
  {
    slug: 'ranchi',
    displayName: 'Ranchi',
    state: 'Jharkhand',
    region: 'East India',
    metroPopulationMn: 1.1,
    majorAreas: ['Lalpur', 'Bariatu', 'Doranda', 'Kanke', 'Harmu', 'Hindpiri'],
    feederSchools: [
      'DAV Public School Bariatu',
      'Loyola School',
      "St. Anthony's School",
      'St. Thomas School Dhurwa',
      "St. Xavier's School Doranda",
      'Sacred Heart Convent School',
    ],
    localCoachingPresence:
      "Allen Career Institute, Aakash Institute, Resonance — Jharkhand's newer coaching market, depth growing",
    stateQuotaCollege: 'Rajendra Institute of Medical Sciences Ranchi',
    otherStateMedicalColleges: [
      'Mahatma Gandhi Memorial Medical College Jamshedpur',
      'Patliputra Medical College Dhanbad',
      'AIIMS Deoghar (new)',
    ],
    cityContext:
      "Ranchi is Jharkhand's capital with RIMS Ranchi as the top local state-quota target. Strong DAV / Loyola academic culture. The newer AIIMS Deoghar opening adds another local AIIMS aspiration. Allen, Aakash present but biology depth limited.",
    whyOnlineHere:
      'Ranchi coaching market is moderate scale. Online with Cerebrum gives AIIMS-trained biology faculty access. Plus: Jharkhand state quota access to RIMS and AIIMS Deoghar makes local target achievable.',
    typicalAspirant:
      "Class 11 or 12 student at DAV Bariatu, Loyola, or St. Anthony's. Target: RIMS Ranchi or AIIMS Deoghar.",
    localFaqs: [
      {
        question: 'RIMS Ranchi biology cut-off?',
        answer: 'Jharkhand state quota: ~310-330/360 biology general category.',
      },
      {
        question: 'AIIMS Deoghar — realistic target?',
        answer: 'Yes — Jharkhand state quota advantage. Projected ~330-345/360.',
      },
      {
        question: 'Schedule for DAV Bariatu student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      { question: 'Shipping to Lalpur or Doranda?', answer: 'All Ranchi pincodes 4-5 days.' },
    ],
  },
  {
    slug: 'shillong',
    displayName: 'Shillong',
    state: 'Meghalaya',
    region: 'Northeast India',
    metroPopulationMn: 0.35,
    majorAreas: ['Laitumkhrah', 'Police Bazaar', 'Lawsohtun', 'Nongthymmai', 'Mawlai', 'Rilbong'],
    feederSchools: [
      "St. Edmund's College",
      'Loreto Convent School',
      "St. Anthony's Higher Secondary School",
      'Pine Mount School',
      'Don Bosco School Shillong',
      'Auxilium Convent School',
    ],
    localCoachingPresence:
      'Aakash Institute (limited), local Northeast coaching — premium NEET coaching depth is shallow',
    stateQuotaCollege:
      'North Eastern Indira Gandhi Regional Institute of Health and Medical Sciences (NEIGRIHMS) Shillong',
    otherStateMedicalColleges: [
      'Gauhati Medical College',
      'AIIMS Guwahati (new)',
      'Assam Medical College Dibrugarh',
    ],
    cityContext:
      "Shillong is Meghalaya's capital and one of Northeast India's premier educational hubs (St. Edmund's, Loreto Convent are heritage institutions). NEIGRIHMS Shillong is the top regional medical aspiration alongside AIIMS Guwahati. Local NEET coaching is limited; most serious aspirants traditionally travel to Guwahati or Delhi.",
    whyOnlineHere:
      'Shillong is geographically isolated — limited local coaching, no nearby premium options. Online removes the relocation requirement that has historically been necessary.',
    typicalAspirant:
      "Class 11 or 12 student at St. Edmund's, Loreto Convent, or Pine Mount. Often Khasi or Northeast-tribal family. Target: NEIGRIHMS Shillong or AIIMS Guwahati.",
    localFaqs: [
      {
        question: 'NEIGRIHMS Shillong biology cut-off?',
        answer:
          'Northeast quota gives Meghalaya residents significant advantage. Biology ~325-345/360 general category.',
      },
      {
        question: 'Should a Shillong student relocate to Guwahati for prep?',
        answer: 'Not anymore — online Cerebrum biology + minimal local PCM coaching works.',
      },
      {
        question: 'Internet reliability in Shillong hills?',
        answer: 'JIO/Airtel 4G covers most of Shillong now. Recordings available for any session.',
      },
      {
        question: 'Shipping to Laitumkhrah or Police Bazaar?',
        answer: 'Shillong pincodes 7-9 days via tracked courier.',
      },
    ],
  },
  {
    slug: 'surat',
    displayName: 'Surat',
    state: 'Gujarat',
    region: 'West India',
    metroPopulationMn: 4.5,
    majorAreas: ['Athwa Lines', 'Vesu', 'Adajan', 'Piplod', 'Pal', 'Citylight'],
    feederSchools: [
      'JH Ambani School',
      'Lourdes Convent School',
      'Delhi Public School Surat',
      'Saraswati Public School',
      'Bhulka Bhavan School',
      'Tatva Global School',
    ],
    localCoachingPresence:
      "Allen Career Institute (Vesu), Aakash Institute, Resonance — Gujarat's biggest NEET coaching catchment after Ahmedabad",
    stateQuotaCollege: 'Government Medical College Surat',
    otherStateMedicalColleges: [
      'BJ Medical College Ahmedabad',
      'PDU GMC Rajkot',
      'AIIMS Rajkot (new)',
    ],
    cityContext:
      "Surat is Gujarat's commercial powerhouse — diamond / textile industry families with very high education investment. Vesu is the coaching corridor; Allen has a major presence. GMC Surat is the local state-quota target. The pattern: family wealth funds intensive coaching but biology depth still limited.",
    whyOnlineHere:
      'Surat sprawl from Athwa Lines to Vesu to Piplod means commute is real. Online removes this. Wealthy families increasingly prefer at-home premium tutoring over coaching-center experience.',
    typicalAspirant:
      'Class 11 or 12 student at JH Ambani, Lourdes Convent, or DPS Surat. Gujarati business family. Target: GMC Surat or BJ Medical College Ahmedabad.',
    localFaqs: [
      {
        question: 'GMC Surat biology cut-off?',
        answer: 'Gujarat state quota: ~320-340/360 biology general category.',
      },
      {
        question: 'Is Allen Vesu enough for biology?',
        answer: 'For PCM yes; for biology depth — pair with Cerebrum.',
      },
      {
        question: 'Schedule for JH Ambani School student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      { question: 'Shipping to Vesu or Athwa Lines?', answer: 'All Surat pincodes 3-4 days.' },
    ],
  },
  {
    slug: 'thiruvananthapuram',
    displayName: 'Thiruvananthapuram',
    altNames: ['Trivandrum', 'TVM'],
    state: 'Kerala',
    region: 'South India',
    metroPopulationMn: 1.7,
    majorAreas: ['Kowdiar', 'Vellayambalam', 'Pattom', 'Vazhuthacaud', 'Thycaud', 'Sasthamangalam'],
    feederSchools: [
      'Loyola School',
      'Christ Nagar Higher Secondary School',
      'St. Thomas Central School',
      'Saraswathy Vidyalaya',
      "Holy Angels' ISC School",
      'Kendriya Vidyalaya Pattom',
    ],
    localCoachingPresence:
      'Brilliant Tutorials, Allen Career Institute, Aakash Institute, Pace Academy — Kerala has unusually high NEET coaching density per capita',
    stateQuotaCollege: 'Government Medical College Thiruvananthapuram',
    otherStateMedicalColleges: [
      'Government Medical College Ernakulam',
      'Government Medical College Kozhikode',
      'AIIMS Thiruvananthapuram (new)',
    ],
    cityContext:
      "Thiruvananthapuram is Kerala's capital and one of India's most NEET-aspirant-dense cities per capita. GMC TVM is one of the most aspirational state-quota colleges nationally. AIIMS TVM (new) adds another top-tier local target. Loyola School and Christ Nagar are heritage NEET-feeder institutions. Brilliant Tutorials has decades of local heritage; Allen and Aakash compete.",
    whyOnlineHere:
      'TVM spread + heavy academic competition means coaching commute often clashes with school + private tutor schedules. Online removes commute. Plus: Kerala State Board → NCERT bridge needs explicit work.',
    typicalAspirant:
      'Class 11 or 12 student at Loyola, Christ Nagar, or St. Thomas Central. Often from doctor / academic family. Target: GMC TVM or AIIMS TVM.',
    localFaqs: [
      {
        question: 'GMC TVM cut-off?',
        answer:
          "Kerala state quota: ~340-355/360 biology — one of India's highest cut-offs due to Kerala competition density.",
      },
      {
        question: 'AIIMS TVM (new) — biology cut-off?',
        answer: 'New AIIMS, Kerala quota advantage. Projected ~340-350/360.',
      },
      { question: 'Live classes in Malayalam?', answer: 'No — English (NEET medium).' },
      { question: 'Shipping to Kowdiar or Vellayambalam?', answer: 'All TVM pincodes 5-6 days.' },
    ],
  },
  {
    slug: 'thrissur',
    displayName: 'Thrissur',
    state: 'Kerala',
    region: 'South India',
    metroPopulationMn: 1.2,
    majorAreas: ['Punkunnam', 'Ollukkara', 'East Fort', 'West Fort', 'Pottore', 'Ayyanthole'],
    feederSchools: [
      'Bharatiya Vidya Bhavan Kuriachira',
      'Don Bosco Senior Secondary School Mannuthy',
      "St. Joseph's Convent",
      'Devamatha CMI Public School',
      'Vidyodaya School',
      'Hari Sri Vidya Nidhi School',
    ],
    localCoachingPresence:
      "Brilliant Tutorials, Allen Career Institute, Aakash Institute — Kerala's strong NEET coaching market",
    stateQuotaCollege: 'Government Medical College Thrissur',
    otherStateMedicalColleges: [
      'Government Medical College Kozhikode',
      'Government Medical College Ernakulam',
      'AIIMS Thiruvananthapuram',
    ],
    cityContext:
      "Thrissur is central Kerala's cultural capital and a major NEET catchment with GMC Thrissur as the local state-quota target. The city has strong academic + arts culture. Brilliant Tutorials has long-standing local presence; Allen and Aakash present. Same Kerala State Board → NCERT bridge challenge.",
    whyOnlineHere:
      'Thrissur is moderate-sized — coaching commute manageable but online still saves 30 min daily. Helps with intense Kerala coaching competition + school workload combination.',
    typicalAspirant:
      "Class 11 or 12 student at Bhavan's Kuriachira, Devamatha CMI, or Hari Sri Vidya Nidhi. Target: GMC Thrissur or GMC Kozhikode.",
    localFaqs: [
      {
        question: 'GMC Thrissur biology cut-off?',
        answer: 'Kerala state quota: ~335-350/360 biology — high due to Kerala competition.',
      },
      {
        question: 'Is Cerebrum better than Brilliant Tutorials Thrissur?',
        answer: 'For biology specifically — yes, due to AIIMS-trained faculty + small batches.',
      },
      { question: 'Live classes in Malayalam?', answer: 'No — English.' },
      {
        question: 'Shipping to Punkunnam or East Fort?',
        answer: 'All Thrissur pincodes 5-6 days.',
      },
    ],
  },
  {
    slug: 'tiruchirappalli',
    displayName: 'Tiruchirappalli',
    altNames: ['Trichy', 'Tiruchi'],
    state: 'Tamil Nadu',
    region: 'South India',
    metroPopulationMn: 1.1,
    majorAreas: [
      'Thillai Nagar',
      'Cantonment',
      'Srirangam',
      'KK Nagar',
      'Tiruverumbur',
      'Crawford',
    ],
    feederSchools: [
      'SRM Public School',
      'Holy Cross Matriculation Higher Secondary School',
      'Bishop Heber Higher Secondary School',
      'Campion Anglo-Indian Higher Secondary School',
      'Sanskrit Mission School',
      'Cluny Convent School',
    ],
    localCoachingPresence:
      'Aakash Institute, Allen Career Institute, Brilliant Tutorials — Tamil Nadu NEET coaching market with state-board dominance',
    stateQuotaCollege: 'KAP Viswanatham Government Medical College Tiruchirappalli',
    otherStateMedicalColleges: [
      'Madras Medical College Chennai',
      'Madurai Medical College',
      'Government Tirunelveli Medical College',
    ],
    cityContext:
      "Trichy is central Tamil Nadu's NEET catchment with KAPV Government Medical College Tiruchirappalli as the local target. The city has unique mix of CBSE (Holy Cross, Campion) and Tamil Nadu State Board feeder schools. The TN State Board → NCERT bridge is the standard challenge.",
    whyOnlineHere:
      "Trichy moderate-sized + state-board bridge make online with Cerebrum genuinely useful — gives AIIMS-trained biology depth that local coaching can't match.",
    typicalAspirant:
      'Class 11 or 12 student at SRM Public School, Holy Cross Matriculation, or Bishop Heber. Target: KAPV GMC Tiruchirappalli or Madras Medical College.',
    localFaqs: [
      {
        question: 'KAPV GMC Tiruchirappalli biology cut-off?',
        answer:
          'Tamil Nadu state quota: ~315-335/360 biology general category. Variable due to TN policy.',
      },
      {
        question: 'TN State Board → NCERT bridge?',
        answer: 'First 4 weeks of our programme bridges explicitly.',
      },
      { question: 'Live classes in Tamil?', answer: 'No — English (NEET medium).' },
      {
        question: 'Shipping to Thillai Nagar or Srirangam?',
        answer: 'All Trichy pincodes 5-6 days.',
      },
    ],
  },
  {
    slug: 'vadodara',
    displayName: 'Vadodara',
    altNames: ['Baroda'],
    state: 'Gujarat',
    region: 'West India',
    metroPopulationMn: 2.1,
    majorAreas: ['Alkapuri', 'Karelibaug', 'Subhanpura', 'Sayajigunj', 'Manjalpur', 'Akota'],
    feederSchools: [
      'Navrachana Vidyani School',
      'Delhi Public School Vadodara',
      'Baroda High School',
      'Bright Day School',
      'Rosary High School',
      'Tejas Vidyalaya',
    ],
    localCoachingPresence:
      "Allen Career Institute (Alkapuri), Aakash Institute, Resonance — Gujarat's solid NEET coaching market alongside Ahmedabad and Surat",
    stateQuotaCollege: 'Medical College Baroda (Sir Sayajirao General Hospital)',
    otherStateMedicalColleges: [
      'BJ Medical College Ahmedabad',
      'Government Medical College Surat',
      'AIIMS Rajkot (new)',
    ],
    cityContext:
      "Vadodara is Gujarat's academic / cultural capital — Maharaja Sayajirao University, Navrachana Vidyani heritage. Medical College Baroda is the local state-quota target. Allen Alkapuri is the primary premium coaching presence. Gujarati business / academic family base with strong education focus.",
    whyOnlineHere:
      'Vadodara spread from Alkapuri to Karelibaug is real but moderate. Online still saves 30-45 min commute and lets Navrachana / DPS students focus more on revision.',
    typicalAspirant:
      'Class 11 or 12 student at Navrachana Vidyani, DPS Vadodara, or Baroda High School. Gujarati academic family. Target: Medical College Baroda or BJ Medical College Ahmedabad.',
    localFaqs: [
      {
        question: 'Medical College Baroda biology cut-off?',
        answer: 'Gujarat state quota: ~325-345/360 biology general category.',
      },
      {
        question: 'Is Cerebrum better than Allen Alkapuri for biology?',
        answer: 'For biology only — yes, due to small-batch model.',
      },
      { question: 'Live classes in Gujarati?', answer: 'No — English.' },
      {
        question: 'Shipping to Alkapuri or Karelibaug?',
        answer: 'All Vadodara pincodes 3-4 days.',
      },
    ],
  },
  {
    slug: 'varanasi',
    displayName: 'Varanasi',
    altNames: ['Banaras', 'Kashi'],
    state: 'Uttar Pradesh',
    region: 'North India',
    metroPopulationMn: 1.4,
    majorAreas: ['Lanka', 'BHU Area', 'Sigra', 'Mahmoorganj', 'Sundarpur', 'Cantonment'],
    feederSchools: [
      'Sunbeam School (multiple branches)',
      'Delhi Public School Varanasi',
      "St. John's School Marhauli",
      'Central Hindu School BHU',
      'Air Force School Varanasi',
      'Loyola School Hetampur',
    ],
    localCoachingPresence:
      "Allen Career Institute (Sigra), Aakash Institute, Resonance — Varanasi has UP's eastern NEET coaching hub",
    stateQuotaCollege: 'Institute of Medical Sciences BHU (IMS BHU) Varanasi',
    otherStateMedicalColleges: [
      'KGMU Lucknow',
      'MLN Medical College Prayagraj',
      'GSVM Medical College Kanpur',
    ],
    cityContext:
      "Varanasi has the unique advantage of IMS BHU — one of India's top medical institutions and the local state-quota / all-India quota target. The BHU ecosystem (Central Hindu School, university culture) creates strong academic foundations. Allen Sigra is the primary premium coaching. Eastern UP students from Mirzapur, Ghazipur, Azamgarh, Jaunpur often relocate to Varanasi for prep.",
    whyOnlineHere:
      'Varanasi BHU Area to Cantonment to Sigra commute is real. Online removes this. Plus: eastern UP students can stay home and use online for biology + local coaching for PCM, saving relocation cost.',
    typicalAspirant:
      'Class 11 or 12 student at Sunbeam, DPS Varanasi, or Central Hindu School BHU. Often academic / business family. Target: IMS BHU (the local prize) or AIIMS Delhi.',
    localFaqs: [
      {
        question: 'IMS BHU biology cut-off?',
        answer:
          "UP state quota + all-India: ~340-355/360 biology — IMS BHU is one of India's most competitive.",
      },
      {
        question: 'Is Allen Sigra enough?',
        answer: 'For PCM yes; for biology depth pair with Cerebrum.',
      },
      {
        question: 'Schedule for Sunbeam Lanka student?',
        answer: 'Live online 5:30 PM - 8 PM IST Mon/Wed/Fri.',
      },
      { question: 'Shipping to BHU Area or Cantt?', answer: 'All Varanasi pincodes 3-4 days.' },
    ],
  },
  {
    slug: 'vijayawada',
    displayName: 'Vijayawada',
    state: 'Andhra Pradesh',
    region: 'South India',
    metroPopulationMn: 1.5,
    majorAreas: [
      'Benz Circle',
      'Patamata',
      'Currency Nagar',
      'Auto Nagar',
      'Tadepalli',
      'Krishna Lanka',
    ],
    feederSchools: [
      'Sri Chaitanya Junior College Vijayawada',
      'Narayana Junior College Vijayawada',
      'Bhashyam Public School',
      'DAV Public School Auto Nagar',
      'Kakatiya Public School',
      'Kennedy High School',
    ],
    localCoachingPresence:
      "Sri Chaitanya (Andhra's flagship — multiple branches), Narayana, Allen, Aakash — Andhra has India's most aggressive coaching ecosystem",
    stateQuotaCollege: 'Siddhartha Medical College Vijayawada',
    otherStateMedicalColleges: [
      'Andhra Medical College Visakhapatnam',
      'Guntur Medical College',
      'Government Medical College Anantapur',
    ],
    cityContext:
      "Vijayawada is Andhra Pradesh's NEET coaching epicenter — Sri Chaitanya and Narayana are local heritage chains with extraordinary national success. Andhra has India's most aggressive coaching culture; students often start NEET prep in Class 9-10. Siddhartha Medical College is the local state-quota target. The challenge: Sri Chaitanya / Narayana mass-coaching format means biology depth limited despite intense pace.",
    whyOnlineHere:
      'Sri Chaitanya / Narayana students have packed schedules — Cerebrum biology as an add-on layer works only at carefully chosen times. Online flexibility (early morning or late evening) fits.',
    typicalAspirant:
      'Class 11 or 12 student at Sri Chaitanya Junior College or Narayana Junior College. Often middle-class Telugu family with extreme NEET focus. Target: Siddhartha Medical College or AIIMS Mangalagiri.',
    localFaqs: [
      {
        question: 'Already at Sri Chaitanya — why add Cerebrum?',
        answer:
          'Sri Chaitanya is unmatched on PCM intensity and integrated school+coaching. For biology specifically, batch size limits depth. Cerebrum biology adds the per-question discussion layer.',
      },
      {
        question: 'Schedule that fits Sri Chaitanya / Narayana intensive routine?',
        answer:
          'Early morning slot 6-7:30 AM or late evening 9-10:30 PM, on off-days. Recordings available.',
      },
      { question: 'Live classes in Telugu?', answer: 'No — English (NEET medium).' },
      {
        question: 'Shipping to Benz Circle or Patamata?',
        answer: 'All Vijayawada pincodes 5-6 days.',
      },
    ],
  },
  {
    slug: 'visakhapatnam',
    displayName: 'Visakhapatnam',
    altNames: ['Vizag'],
    state: 'Andhra Pradesh',
    region: 'South India',
    metroPopulationMn: 2.0,
    majorAreas: [
      'MVP Colony',
      'Dwaraka Nagar',
      'Beach Road',
      'Madhurawada',
      'Maddilapalem',
      'Pendurthi',
    ],
    feederSchools: [
      'Delhi Public School Visakhapatnam',
      'Timpany School',
      'Visakha Valley School',
      'Sri Chaitanya Junior College Vizag',
      'Kendriya Vidyalaya Naval Base',
      'Little Angels High School',
    ],
    localCoachingPresence:
      'Sri Chaitanya (multiple branches), Narayana, Allen Career Institute, FIITJEE — Andhra coaching density second to Vijayawada',
    stateQuotaCollege: 'Andhra Medical College Visakhapatnam',
    otherStateMedicalColleges: [
      'Siddhartha Medical College Vijayawada',
      'Guntur Medical College',
      'AIIMS Mangalagiri',
    ],
    cityContext:
      "Visakhapatnam (Vizag) is Andhra's second NEET coaching catchment with Andhra Medical College Visakhapatnam as the local state-quota prize. Strong naval base / industrial family base with structured study culture. Sri Chaitanya and Narayana branches present; Allen and FIITJEE compete. Same Andhra aggressive coaching pattern + biology depth gap.",
    whyOnlineHere:
      'Vizag spread from MVP Colony to Madhurawada is real. Online removes commute. Naval-base / industrial families increasingly prefer online for distraction-free home study.',
    typicalAspirant:
      'Class 11 or 12 student at DPS Vizag, Timpany School, or Sri Chaitanya. Naval / industrial / business family. Target: Andhra Medical College Visakhapatnam or AIIMS Mangalagiri.',
    localFaqs: [
      {
        question: 'Andhra Medical College Visakhapatnam biology cut-off?',
        answer:
          'Andhra state quota: ~325-345/360 biology general category. High due to Andhra competition density.',
      },
      {
        question: 'Already at Sri Chaitanya Vizag — Cerebrum addition?',
        answer:
          'Same model — early morning or late evening biology layer that fits around Sri Chaitanya intensive schedule.',
      },
      { question: 'Live classes in Telugu?', answer: 'No — English.' },
      { question: 'Shipping to MVP Colony or Beach Road?', answer: 'All Vizag pincodes 5-6 days.' },
    ],
  },
]
