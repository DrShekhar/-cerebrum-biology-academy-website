/**
 * Rich data for thin international NRI NEET coaching pages.
 * Each entry powers a /neet-coaching-{city-country} page with
 * NRI-specific context (Indian community size, school landscape,
 * time zone, currency, target colleges via NRI quota).
 */

export interface NRIInternationalCity {
  slug: string
  city: string
  country: string
  region: 'Gulf' | 'Africa' | 'Southeast Asia' | 'East Asia'
  timezone: string
  /** Hours offset from IST (negative = behind IST) */
  istOffset: number
  /** Indian diaspora estimate */
  indianCommunitySize: string
  /** Top Indian / international curriculum schools serving NEET aspirants */
  indianSchools: string[]
  /** What batch slot fits this city's local evening */
  localBatchSlot: string
  /** Approximate annual ticket for NRI families paying in foreign currency */
  pricingNote: string
  /** Local context paragraph (100-150 words) */
  cityContext: string
  /** Custom FAQ set */
  faqs: { question: string; answer: string }[]
}

export const NRI_INTERNATIONAL_CITIES: Record<string, NRIInternationalCity> = {
  'accra-ghana': {
    slug: 'accra-ghana',
    city: 'Accra',
    country: 'Ghana',
    region: 'Africa',
    timezone: 'GMT (UTC+0)',
    istOffset: -5.5,
    indianCommunitySize: '~15,000 Indian-origin residents (long-standing business community)',
    indianSchools: ['DPS International Ghana', 'Lincoln Community School Accra', 'Ghana International School', 'Cambridge International School', 'Tema International School', 'Galaxy International School'],
    localBatchSlot: 'GMT 12:00 PM – 2:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year depending on tier. Sibling discounts available.',
    cityContext:
      'Accra hosts one of West Africa\'s most established Indian business communities — generations of Gujarati and Sindhi families have built trading houses serving Ghana since the 1950s. Indian-origin teenagers preparing for NEET typically attend DPS International Ghana, Lincoln Community School, or Ghana International School, all of which use Cambridge IGCSE / A-Level frameworks. Direct NEET-aligned NCERT coaching is non-existent locally, making online live coaching from Cerebrum the only viable path to Indian medical college admissions. NRI quota at AIIMS, JIPMER, and select state colleges gives Accra-based Indian aspirants substantial competitive advantage.',
    faqs: [
      { question: 'What NEET options does an Indian-origin Class 12 student in Accra have?', answer: 'Two paths: (1) NRI quota at AIIMS Delhi / JIPMER Puducherry / select state colleges (15% of seats reserved for NRIs at most colleges), (2) all-India NEET quota competing as any other Indian aspirant. We coach both — biology cut-off targets calibrated to which path you\'re aiming for.' },
      { question: 'My child attends DPS International Ghana / Lincoln. Is there an IGCSE/A-Level + NEET clash?', answer: 'No — we run a parallel track. IGCSE / A-Level Biology is broader; NEET is NCERT-deep. Our Class 11-12 programme bridges from IGCSE / A-Level framing to NCERT line-by-line in the first 4-6 weeks. Students typically manage both syllabi.' },
      { question: 'What\'s the time-zone schedule from Accra (GMT)?', answer: 'GMT 12:00 PM – 2:30 PM matches IST 5:30 PM – 8:00 PM (our India evening batch). 3 days a week + weekend tests. Recordings available for any session.' },
      { question: 'How is study material shipped to Accra?', answer: 'DHL / FedEx tracked courier to Accra address. 10-14 days delivery. Customs duty (if any) is buyer-side per Ghana import regulations.' },
      { question: 'How do we pay from Ghana — INR or USD?', answer: 'USD via international wire / TransferWise / SWIFT. We provide invoice in USD. EMI available 3/6/12 months.' },
    ],
  },
  'nairobi-kenya': {
    slug: 'nairobi-kenya',
    city: 'Nairobi',
    country: 'Kenya',
    region: 'Africa',
    timezone: 'EAT (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~80,000 Indian-origin residents (East Africa\'s largest Indian diaspora)',
    indianSchools: ['Oshwal Academy Nairobi', 'Visa Oshwal Education', 'Premier Academy', 'Brookhouse School', 'Aga Khan Academy Nairobi', 'Hillcrest International School', 'Braeburn International School'],
    localBatchSlot: 'EAT 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year. Kenya-based families benefit from substantial sibling discounts.',
    cityContext:
      'Nairobi has East Africa\'s largest Indian-origin community — generations of Gujarati Patidar, Punjabi, Goan, and Sindhi families have lived in Kenya since pre-independence. Oshwal Academy, Visa Oshwal Education, and Premier Academy are the dominant feeders for Indian medical aspirants. Many Nairobi NEET students target NRI quota seats at AIIMS Delhi, JIPMER Puducherry, and Karnataka private colleges (Manipal, KMC) where their Kenyan-Indian background opens specific reservation pools. Local coaching options are limited; online live from Cerebrum is the established path.',
    faqs: [
      { question: 'What medical college pathways are open to Indian-origin Nairobi students?', answer: 'Three: (1) NRI quota at AIIMS Delhi / JIPMER / Manipal / KMC Mangalore (15% reservation), (2) all-India quota competing with Indian aspirants, (3) Kenyan domicile path at Kenya medical colleges if OCI status allows. We focus on (1) and (2) — biology cut-off ~330-345/360 for NRI quota at premium colleges.' },
      { question: 'My child is at Oshwal Academy / Premier Academy. Schedule fit?', answer: 'EAT 3:00 PM – 5:30 PM batch slot. School dismissal at Oshwal is typically 3 PM, so 30-min buffer. Premier Academy similar. Works cleanly.' },
      { question: 'How does the time difference work for live classes?', answer: 'EAT is IST minus 2.5 hours. Our India evening batch (5:30-8 PM IST) is 3:00-5:30 PM Nairobi time. Perfect after-school window.' },
      { question: 'Will study material shipping to Nairobi work?', answer: 'Yes — DHL / FedEx tracked courier, 10-12 days. Many current Cerebrum students in Nairobi receive material reliably.' },
      { question: 'NRI quota for Karnataka private medical colleges?', answer: 'KMC Mangalore, Manipal MMMC, JSS Mysuru all reserve NRI seats. Biology cut-off ~325-345/360. Cerebrum biology programme targets 340+/360 to give families options.' },
    ],
  },
  'kampala-uganda': {
    slug: 'kampala-uganda',
    city: 'Kampala',
    country: 'Uganda',
    region: 'Africa',
    timezone: 'EAT (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~15,000 Indian-origin residents (rebuilding community post-1972 expulsion)',
    indianSchools: ['International School of Uganda', 'Aga Khan Academy Kampala', 'Galaxy International School', 'GEMS Cambridge International School', 'Kabira International School'],
    localBatchSlot: 'EAT 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Uganda\'s Indian community is rebuilding after the 1972 expulsion under Idi Amin. The post-2000 wave of Indian business families in Kampala has grown to ~15,000, concentrated around the Kampala business district, Bugolobi, and Naguru. Children typically attend International School of Uganda, Aga Khan Academy, or Galaxy International. NEET aspirants from Kampala target NRI quota seats and increasingly use online specialist coaching to compensate for local options being limited.',
    faqs: [
      { question: 'Indian community medical-college pathway from Kampala?', answer: 'NRI quota at AIIMS Delhi, JIPMER, Manipal, KMC, plus all-India quota. Biology cut-off ~330-345 for NRI quota premium colleges.' },
      { question: 'Aga Khan Academy / ISU schedule fit with Cerebrum?', answer: 'EAT 3-5:30 PM batch works after Kampala school dismissals.' },
      { question: 'Will printed material reach Kampala?', answer: 'Yes — DHL 10-14 days.' },
      { question: 'How do we handle payment in Uganda?', answer: 'USD wire or TransferWise.' },
    ],
  },
  'dar-es-salaam-tanzania': {
    slug: 'dar-es-salaam-tanzania',
    city: 'Dar es Salaam',
    country: 'Tanzania',
    region: 'Africa',
    timezone: 'EAT (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~50,000 Indian-origin residents (long-standing community)',
    indianSchools: ['HH The Aga Khan Mzizima Secondary School', 'International School of Tanganyika', 'Hindu Mandal Academy', 'Loyola High School', 'Feza Boys Secondary School'],
    localBatchSlot: 'EAT 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Dar es Salaam has one of East Africa\'s largest Indian-origin communities — primarily Gujarati and Goan families with roots going back to British East Africa era. Hindu Mandal Academy and Aga Khan Mzizima are the dominant feeders for Indian medical aspirants. Tanzania-based Indian students often target NRI quota seats at AIIMS, JIPMER, and Mangalore / Manipal colleges.',
    faqs: [
      { question: 'Pathway from Dar es Salaam to Indian medical college?', answer: 'NRI quota (15% reservation) at AIIMS / JIPMER / private deemed universities; all-India quota; OCI-based Tanzania medical college pathway.' },
      { question: 'Hindu Mandal / Aga Khan Mzizima schedule fit?', answer: 'EAT afternoon batch (3-5:30 PM) fits after-school cleanly.' },
      { question: 'Will material reach Dar es Salaam?', answer: 'Yes via DHL, 10-12 days.' },
      { question: 'Pricing in Tanzanian shilling?', answer: 'We invoice in USD; pay via international wire.' },
    ],
  },
  'al-wakrah-qatar': {
    slug: 'al-wakrah-qatar',
    city: 'Al Wakrah',
    country: 'Qatar',
    region: 'Gulf',
    timezone: 'AST (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~700,000 Indian-origin residents in Qatar (largest expat community)',
    indianSchools: ['Birla Public School', 'DPS Modern Indian School', 'Ideal Indian School', 'MES Indian School', 'Bhavan\'s Public School', 'Olive International School'],
    localBatchSlot: 'AST 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year. Most Qatari Indian families have substantial coaching budget.',
    cityContext:
      'Al Wakrah is Qatar\'s third-largest city and growing rapidly as Doha satellite. Indian community in Al Wakrah has grown alongside Qatar\'s 700,000+ Indian expat population — concentrated families work in oil + construction + services. Birla Public School, DPS Modern Indian School, MES Indian School, and Bhavan\'s are the dominant CBSE feeders. NEET aspirants from Al Wakrah typically target NRI quota seats at AIIMS / JIPMER / private deemed universities, with substantial coaching investment expected.',
    faqs: [
      { question: 'Birla Public School Al Wakrah student NEET pathway?', answer: 'CBSE / NCERT-aligned schools make NEET transition smooth. NRI quota at AIIMS Delhi / JIPMER / private colleges; all-India quota.' },
      { question: 'AST time zone — class schedule?', answer: 'AST 3-5:30 PM batch matches IST 5:30-8 PM. Excellent after-school fit.' },
      { question: 'Material shipping to Al Wakrah?', answer: 'DHL Qatar 5-7 days delivery.' },
      { question: 'Currency for payment?', answer: 'USD via wire, or QAR equivalent. Sibling discounts available.' },
    ],
  },
  'al-khobar-saudi-arabia': {
    slug: 'al-khobar-saudi-arabia',
    city: 'Al Khobar',
    country: 'Saudi Arabia',
    region: 'Gulf',
    timezone: 'AST (UTC+3)',
    istOffset: -2.5,
    indianCommunitySize: '~2.5 million Indian-origin residents in Saudi Arabia',
    indianSchools: ['International Indian School Dammam', 'Bharatiya Vidya Bhavan', 'Yara International School', 'DPS Modern Indian School Dammam', 'MES Indian School Saudi'],
    localBatchSlot: 'AST 3:00 PM – 5:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Al Khobar is Saudi Arabia\'s Eastern Province hub with substantial Indian community linked to oil + IT + medical services. International Indian School Dammam (which serves Al Khobar families) and Bhavan\'s are the dominant CBSE feeders. Saudi Indian families historically have very high medical-career aspiration; many target NRI quota at AIIMS Delhi and JIPMER Puducherry.',
    faqs: [
      { question: 'Pathway from Al Khobar to AIIMS Delhi?', answer: 'NRI quota at AIIMS Delhi requires NEET biology ~340-355/360. Available to children of Saudi-based Indians with documented OCI / NRI status. Cerebrum biology programme calibrates to this.' },
      { question: 'Schedule for International Indian School Dammam student?', answer: 'AST 3-5:30 PM batch (IST 5:30-8 PM). After school dismissal at 2 PM typical. Excellent fit.' },
      { question: 'Material delivery to Al Khobar?', answer: 'DHL / Saudi Post 5-7 days.' },
      { question: 'Ramadan schedule adjustment?', answer: 'Yes — Ramadan months we shift to 1.5 hour earlier slot accommodating fasting + Iftar.' },
    ],
  },
  'ho-chi-minh-vietnam': {
    slug: 'ho-chi-minh-vietnam',
    city: 'Ho Chi Minh City',
    country: 'Vietnam',
    region: 'Southeast Asia',
    timezone: 'ICT (UTC+7)',
    istOffset: 1.5,
    indianCommunitySize: '~10,000 Indian-origin residents (growing IT + business expat community)',
    indianSchools: ['British International School HCMC', 'International School Ho Chi Minh City', 'European International School', 'Saigon South International School'],
    localBatchSlot: 'ICT 7:00 PM – 9:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Ho Chi Minh City\'s Indian community has grown significantly post-2010 as Indian IT companies and import-export businesses expanded into Vietnam. Children typically attend British International School HCMC or International School Ho Chi Minh City. NEET aspirants from HCMC pursue both NRI quota and all-India quota — Cerebrum live online via Zoom is the established path.',
    faqs: [
      { question: 'NRI quota access from Vietnam?', answer: 'Yes — Indian-origin Vietnam-resident families qualify for 15% NRI quota at AIIMS / JIPMER / private deemed universities, plus all-India quota.' },
      { question: 'British International School / ISHCMC schedule fit?', answer: 'ICT 7-9:30 PM batch matches IST 5:30-8 PM. Fits after school activity end.' },
      { question: 'Material delivery to HCMC?', answer: 'DHL Vietnam 7-9 days.' },
      { question: 'Currency for payment?', answer: 'USD via wire transfer.' },
    ],
  },
  'jakarta-indonesia': {
    slug: 'jakarta-indonesia',
    city: 'Jakarta',
    country: 'Indonesia',
    region: 'Southeast Asia',
    timezone: 'WIB (UTC+7)',
    istOffset: 1.5,
    indianCommunitySize: '~25,000 Indian-origin residents',
    indianSchools: ['Gandhi Memorial International School Jakarta', 'British International School Jakarta', 'Australian International School', 'Singapore Intercultural School', 'Jakarta Intercultural School'],
    localBatchSlot: 'WIB 7:00 PM – 9:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Jakarta has a substantial Indian community with strong Sindhi business roots dating back generations + a newer wave of Indian IT and corporate expats. Gandhi Memorial International School is the legacy Indian-curriculum school; British and Australian International Schools serve the more recent expat wave. NEET aspirants pursue NRI quota at AIIMS, JIPMER, Manipal, and KMC.',
    faqs: [
      { question: 'Pathway from Jakarta to Indian medical college?', answer: 'NRI quota at AIIMS / JIPMER / private deemed universities; all-India quota. Biology cut-off ~330-345/360 for NRI quota.' },
      { question: 'Gandhi Memorial / BIS Jakarta schedule fit?', answer: 'WIB evening (7-9:30 PM) matches IST evening batch.' },
      { question: 'Material shipping?', answer: 'DHL 7-9 days to Jakarta.' },
      { question: 'Time zone for tests?', answer: 'All exams in WIB (Jakarta) time; recordings available.' },
    ],
  },
  'manila-philippines': {
    slug: 'manila-philippines',
    city: 'Manila',
    country: 'Philippines',
    region: 'Southeast Asia',
    timezone: 'PHT (UTC+8)',
    istOffset: 2.5,
    indianCommunitySize: '~20,000 Indian-origin residents',
    indianSchools: ['Brent International School Manila', 'International School Manila', 'Faith Academy', 'Beacon School'],
    localBatchSlot: 'PHT 8:00 PM – 10:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Manila\'s Indian community is concentrated in Makati and Bonifacio Global City, primarily IT and finance professionals. Children attend International School Manila, Brent International, or Faith Academy. Some Manila Indian families also consider direct admission to Philippines medical colleges (which accept international applicants), but for those returning to India for MBBS, Cerebrum NEET coaching with NRI quota access is the path.',
    faqs: [
      { question: 'NEET vs Philippines MBBS direct admission?', answer: 'Both valid paths. Philippines medical colleges accept international applicants; NEET path opens AIIMS / JIPMER / Indian state colleges. We coach for NEET specifically — families assess both based on their preference for India vs Philippines medical practice.' },
      { question: 'Manila evening schedule clash?', answer: 'PHT 8-10:30 PM batch matches IST 5:30-8 PM. After-dinner slot.' },
      { question: 'Material to Makati / BGC?', answer: 'DHL Philippines 7-9 days.' },
      { question: 'How is the all-India NEET attempt managed from Manila?', answer: 'Family typically travels to nearest NEET center in India during exam (May). We coordinate exam-week logistics.' },
    ],
  },
  'kathmandu-nepal': {
    slug: 'kathmandu-nepal',
    city: 'Kathmandu',
    country: 'Nepal',
    region: 'Southeast Asia',
    timezone: 'NPT (UTC+5:45)',
    istOffset: 0.25,
    indianCommunitySize: '~600,000 Nepalese students target Indian medical colleges annually under foreign-national + open-quota seats',
    indianSchools: ['Rato Bangala School', 'Lincoln School Kathmandu', 'British School Kathmandu', 'Ullens School', 'Premier International School', 'Modern Indian School Kathmandu'],
    localBatchSlot: 'NPT 5:45 PM – 8:15 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year. Nepalese students also have foreign-national category seats at AIIMS / JIPMER.',
    cityContext:
      'Kathmandu is the largest source of Nepalese students applying for MBBS in India — both NRI quota (for Indian-origin Kathmandu residents) and the foreign-national + Open Merit quota (for Nepalese citizens). Rato Bangala, Lincoln School, Premier International, and Modern Indian School Kathmandu are the dominant feeders. Nepalese students typically target KMC Mangalore (which has a large Nepalese alumni network), MMMC Manipal, BLDE Vijayapura, AIIMS Delhi, JIPMER Puducherry, and other deemed universities.',
    faqs: [
      { question: 'Pathway from Kathmandu to MBBS in India?', answer: 'Three: (1) Nepalese citizens via foreign-national / SAARC quota at AIIMS, JIPMER, Maulana Azad; (2) Indian-origin Kathmandu residents via 15% NRI quota at deemed universities; (3) all-India quota via NEET. Cerebrum biology coaching prepares all three pathways.' },
      { question: 'NPT time zone — batch schedule?', answer: 'NPT is IST + 15 minutes. Our India evening batch (5:30-8 PM IST) is 5:45-8:15 PM Nepal time — essentially identical.' },
      { question: 'KMC Mangalore preference among Nepalese students?', answer: 'KMC Mangalore has the largest Nepalese alumni network and is the most aspirational destination. NEET biology cut-off ~330-345/360 for Nepalese applicants.' },
      { question: 'Material delivery to Kathmandu?', answer: 'DHL Nepal 7-10 days. Customs duty as per Nepal import regulations.' },
    ],
  },
  'kuala-lumpur-malaysia': {
    slug: 'kuala-lumpur-malaysia',
    city: 'Kuala Lumpur',
    country: 'Malaysia',
    region: 'Southeast Asia',
    timezone: 'MYT (UTC+8)',
    istOffset: 2.5,
    indianCommunitySize: '~2 million Indian-origin Malaysians (significant Tamil + Malayali + Telugu + Punjabi population)',
    indianSchools: ['Global Indian International School KL', 'International Indian School Malaysia', 'Garden International School', 'IGB International School', 'British International School Kuala Lumpur', 'Sayfol International School'],
    localBatchSlot: 'MYT 8:00 PM – 10:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year. Large Malaysian-Indian community has long-established medical-career tradition.',
    cityContext:
      'Kuala Lumpur is home to one of Southeast Asia\'s largest Indian-origin communities — primarily Tamil but also Malayali, Telugu, and Punjabi. Global Indian International School KL and International Indian School Malaysia run the dominant CBSE / NCERT feeders for NEET aspirants; Garden International, IGB, BISKL serve those on IB / Cambridge tracks. Malaysian-Indian families have a strong medical-career tradition with many targeting MMMC Manipal, KMC Mangalore, Karpaga Vinayaga, BLDE Vijayapura, plus NRI quota at premium colleges.',
    faqs: [
      { question: 'Pathway from KL to MBBS in India?', answer: 'NRI quota at AIIMS / JIPMER / Manipal / KMC / private deemed; all-India quota via NEET. Malaysian-Indian families also consider Manipal Melaka campus (which feeds into Manipal University clinical years).' },
      { question: 'GIIS KL / IISM schedule fit?', answer: 'MYT 8-10:30 PM evening batch matches IST evening. After-dinner slot.' },
      { question: 'Tamil-medium school background — NCERT bridge?', answer: 'We run a 4-6 week NCERT terminology bridge module for students from regional-language / Tamil-medium backgrounds before mainstream NEET coaching starts.' },
      { question: 'Material delivery to KL?', answer: 'DHL Malaysia 5-7 days.' },
    ],
  },
  'singapore-city-singapore': {
    slug: 'singapore-city-singapore',
    city: 'Singapore City',
    country: 'Singapore',
    region: 'Southeast Asia',
    timezone: 'SGT (UTC+8)',
    istOffset: 2.5,
    indianCommunitySize: '~700,000 Indian-origin residents (~9% of population, largest non-Chinese minority)',
    indianSchools: ['UWCSEA Dover + East', 'Global Indian International School Singapore', 'NPS International School', 'Singapore Indian Education Trust schools', 'Stamford American International School', 'Tanglin Trust School', 'Dulwich College Singapore'],
    localBatchSlot: 'SGT 8:00 PM – 10:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$2,500-4,500/year. Singapore-Indian families typically pay premium tier.',
    cityContext:
      'Singapore has one of Asia\'s wealthiest and most education-focused Indian diaspora communities — concentrated in finance, IT, and biomedical sectors. UWCSEA, GIIS Singapore, NPS International, Stamford American, and Tanglin Trust are the dominant feeders. Most Singapore-Indian students target either US premed pathway (with AP Biology and SAT II) OR Indian medical colleges via NRI quota at AIIMS Delhi, JIPMER, MMMC Manipal, KMC Mangalore, deemed universities. Some also target Australian / UK medical pathways.',
    faqs: [
      { question: 'Pathway from Singapore to MBBS — India vs US vs Australia?', answer: 'Three competing pathways: (1) Indian medical college via NRI quota + NEET (we coach), (2) US premed → MD via MCAT (we offer separate MCAT Biology track), (3) Australian / UK undergraduate medicine. Family chooses based on long-term residence intent.' },
      { question: 'UWCSEA / GIIS Singapore IB student NCERT bridge?', answer: 'IB Biology HL / SL is broader but less NCERT-line-by-line than NEET requires. We run a 4-6 week IB-to-NCERT bridge module in first month.' },
      { question: 'SGT schedule fit?', answer: 'SGT 8-10:30 PM matches IST 5:30-8 PM evening batch. After-school + dinner-time slot.' },
      { question: 'Material delivery to Singapore?', answer: 'DHL Singapore 3-5 days — fastest in our network.' },
    ],
  },
  'sydney-australia': {
    slug: 'sydney-australia',
    city: 'Sydney',
    country: 'Australia',
    region: 'East Asia',
    timezone: 'AEDT (UTC+11) / AEST (UTC+10)',
    istOffset: 4.5,
    indianCommunitySize: '~700,000 Indian-origin Australians, fastest-growing demographic (Sydney has largest concentration)',
    indianSchools: ['The Scots College', 'Sydney Grammar School', 'St Andrew\'s Cathedral School', 'Cranbrook School', 'Reddam House', 'Wenona School', 'Knox Grammar', 'Sydney Boys/Girls High'],
    localBatchSlot: 'AEDT 10:30 PM – 1:00 AM next day (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$2,500-4,500/year. Australia-Indian families pay premium tier.',
    cityContext:
      'Sydney has Australia\'s largest Indian-origin community — concentrated in Parramatta, Strathfield, Westmead, Pennant Hills, North Shore, Hornsby. Many Australian-Indian Class 12 students consider both Australian undergraduate medicine (UNSW Medicine, USyd MD, Macquarie) AND Indian medical college via NRI quota + NEET. Cerebrum coaches NEET specifically — families assess based on long-term residence intent. UMAT / UCAT separate; NEET is for the India pathway.',
    faqs: [
      { question: 'Sydney medical pathway — Australia vs India MBBS?', answer: 'Two competing pathways: (1) Australian undergraduate medicine via UCAT + ATAR (we don\'t coach this), (2) Indian medical college via NRI quota at AIIMS / JIPMER / Manipal / KMC + NEET (we coach biology). Many Sydney-Indian families pursue both as parallel options.' },
      { question: 'AEDT time zone — class schedule clash?', answer: 'AEDT is IST + 4.5 hours. Our India evening batch (5:30-8 PM IST) is 10:30 PM – 1 AM AEDT. Most students prefer recorded sessions + live weekend doubt batches. Saturday morning weekend batch available at 9-11:30 AM AEDT.' },
      { question: 'NEET vs UCAT — which subject overlaps?', answer: 'NEET tests Class 11 + 12 NCERT biology depth. UCAT is aptitude (no biology content). Australian Year 11-12 Biology IS aligned with NEET biology but lighter on NCERT line-by-line — we bridge that gap.' },
      { question: 'Material delivery to Sydney?', answer: 'Australia Post Express 7-10 days. Customs duty applies to physical books over AUD 1,000 cumulative.' },
    ],
  },
  'melbourne-australia': {
    slug: 'melbourne-australia',
    city: 'Melbourne',
    country: 'Australia',
    region: 'East Asia',
    timezone: 'AEDT (UTC+11) / AEST (UTC+10)',
    istOffset: 4.5,
    indianCommunitySize: '~250,000 Indian-origin residents (second-largest in Australia after Sydney)',
    indianSchools: ['Scotch College Melbourne', 'Geelong Grammar School', 'Melbourne Grammar School', 'Caulfield Grammar', 'Wesley College', 'Methodist Ladies\' College', 'Carey Baptist Grammar'],
    localBatchSlot: 'AEDT 10:30 PM – 1:00 AM next day (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$2,500-4,500/year.',
    cityContext:
      'Melbourne hosts Australia\'s second-largest Indian community — concentrated in Wyndham, Casey, Hume, Whittlesea, Dandenong. Many Melbourne-Indian Class 12 students target University of Melbourne MD (postgraduate medicine), Monash MBBS, or Indian medical college via NRI quota at AIIMS / JIPMER / Manipal. Saturday weekend batch (9-11:30 AM AEDT) available for time-zone-friendly live classes.',
    faqs: [
      { question: 'Melbourne medical pathway options?', answer: 'Australian MD pathway (postgrad medicine after BSc) via Melbourne / Monash + GAMSAT, OR Indian MBBS via NRI quota + NEET. We coach NEET biology + GAMSAT Section 3 Biology (separate track).' },
      { question: 'AEDT class schedule?', answer: 'Weekday evening batch is 10:30 PM – 1 AM AEDT (IST 5:30-8 PM). Weekend Saturday 9-11:30 AM AEDT batch is local-time friendly.' },
      { question: 'Material delivery to Melbourne?', answer: 'Australia Post Express 7-10 days.' },
      { question: 'Currency for payment?', answer: 'USD via international wire, or AUD equivalent via direct deposit.' },
    ],
  },
  'toronto-canada': {
    slug: 'toronto-canada',
    city: 'Toronto',
    country: 'Canada',
    region: 'East Asia',
    timezone: 'EST (UTC-5) / EDT (UTC-4)',
    istOffset: -10.5,
    indianCommunitySize: '~1 million Indian-origin Canadians in Greater Toronto Area (GTA)',
    indianSchools: ['Upper Canada College', 'Branksome Hall', 'Havergal College', 'Toronto French School', 'St. Michael\'s College School', 'Royal St. George\'s', 'Crescent School', 'Bayview Glen'],
    localBatchSlot: 'EST 7:00 AM – 9:30 AM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$2,500-4,500/year. Canadian-Indian families pay premium.',
    cityContext:
      'Greater Toronto Area (GTA) — including Mississauga, Brampton, Markham, Scarborough — has Canada\'s largest Indian-origin community (~1M strong). Many Toronto-Indian Class 12 students target Canadian undergraduate medicine (McMaster, U of T, Queen\'s, Western) which requires undergrad first + MCAT, OR Indian MBBS via NRI quota at AIIMS / JIPMER / Manipal. We coach NEET biology + MCAT B/B section (separate track).',
    faqs: [
      { question: 'Toronto medical pathway — Canada MD vs India MBBS?', answer: 'Canadian MD is postgraduate (BSc + MCAT + MD), so Indian MBBS via NRI quota + NEET is faster (5.5 yrs vs 8+ yrs). We coach NEET specifically; families weigh based on long-term residence.' },
      { question: 'EST time zone — early morning batch?', answer: 'EST is IST – 10.5 hours. Our India evening batch (5:30-8 PM IST) is 7:00-9:30 AM Toronto time. Saturday morning weekend batch also available.' },
      { question: 'GTA neighbourhood support?', answer: 'Online live works from Mississauga, Brampton, Markham, Vaughan, Oakville, Scarborough. Most Cerebrum-GTA students are from Brampton + Mississauga.' },
      { question: 'Material delivery to Toronto?', answer: 'Canada Post Expedited 5-8 days.' },
    ],
  },
  'vancouver-canada': {
    slug: 'vancouver-canada',
    city: 'Vancouver',
    country: 'Canada',
    region: 'East Asia',
    timezone: 'PST (UTC-8) / PDT (UTC-7)',
    istOffset: -13.5,
    indianCommunitySize: '~300,000 Indian-origin residents in Greater Vancouver Area',
    indianSchools: ['York House School', 'Crofton House School', 'St. George\'s School', 'Vancouver College', 'West Point Grey Academy', 'Mulgrave School', 'Stratford Hall'],
    localBatchSlot: 'PST 4:00 AM – 6:30 AM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$2,500-4,500/year.',
    cityContext:
      'Greater Vancouver — including Surrey, Burnaby, Richmond, Coquitlam — has Canada\'s second-largest Indian community (~300K), heavily concentrated in Surrey (largest Indian-origin city in North America by per-capita). Vancouver-Indian Class 12 students consider Canadian MD pathway (UBC) OR Indian MBBS via NRI quota at AIIMS / JIPMER / Manipal + NEET. Cerebrum coaches NEET biology — PST evening recordings + Saturday morning weekend live preferred over IST early-morning batch.',
    faqs: [
      { question: 'Vancouver medical pathway?', answer: 'UBC Medicine is postgraduate (BSc + MCAT + MD). Indian MBBS via NRI quota + NEET is alternative + faster (5.5 yrs). Many Vancouver-Indian families pursue both options in parallel.' },
      { question: 'PST 13.5 hour offset — class schedule?', answer: 'PST is IST – 13.5 hours. Our India evening batch (5:30-8 PM IST) is 4:00-6:30 AM Vancouver. Most students prefer recorded weekday sessions + Saturday morning live weekend batch at 9-11:30 AM PST.' },
      { question: 'Surrey / Burnaby / Richmond / Coquitlam support?', answer: 'Yes — online live works equally well from any Greater Vancouver neighbourhood. Surrey has the largest concentration of Cerebrum-Vancouver students.' },
      { question: 'Material delivery to Vancouver?', answer: 'Canada Post Expedited 5-8 days.' },
    ],
  },
  'chicago-usa': {
    slug: 'chicago-usa',
    city: 'Chicago',
    country: 'USA',
    region: 'East Asia',
    timezone: 'CST (UTC-6) / CDT (UTC-5)',
    istOffset: -11.5,
    indianCommunitySize: '~300,000 Indian-origin in Greater Chicago (Naperville, Schaumburg, Aurora, Bartlett, Hoffman Estates)',
    indianSchools: ['Naperville North High', 'Neuqua Valley HS', 'Stevenson HS', 'New Trier HS', 'Glenbrook North HS', 'Hinsdale Central HS', 'Lake Forest HS', 'Maine South HS'],
    localBatchSlot: 'CST 6:00 AM – 8:30 AM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$2,500-4,500/year. US-Indian families pay premium tier.',
    cityContext:
      'Greater Chicago hosts one of America\'s largest Indian-origin communities — heavily concentrated in DuPage County (Naperville, Aurora, Bartlett, Hoffman Estates) and northern suburbs (Schaumburg, Glenview, Northbrook). Many Chicago-Indian Class 12 students pursue US premed (AP Biology + MCAT B/B + 4-year BSc + MD), but a substantial minority targets Indian medical college via NRI quota at AIIMS Delhi / JIPMER / MMMC Manipal + NEET. Cerebrum offers both NEET and MCAT B/B tracks.',
    faqs: [
      { question: 'Chicago medical pathway — US premed vs India MBBS?', answer: 'Two paths: (1) US premed (4-year BSc → MCAT → 4-year MD = 8+ yrs), (2) Indian MBBS via NRI quota + NEET (5.5 yrs). Indian-origin Chicago families weighing economics + practice intent. We coach NEET biology + MCAT B/B Section (separate track).' },
      { question: 'CST 11.5-hour offset — class schedule?', answer: 'Our India evening batch (5:30-8 PM IST) is 6:00-8:30 AM Chicago time. Most students prefer recorded weekday + Saturday morning live (9-11:30 AM CST).' },
      { question: 'AP Biology + NEET — same prep?', answer: 'AP Biology covers more cellular + molecular depth, less NCERT line-by-line. We run a 4-6 week NCERT bridge for AP-track students transitioning to NEET prep.' },
      { question: 'Material delivery to Chicago?', answer: 'USPS Priority 5-7 days. Customs duty waived for educational books under $200.' },
    ],
  },
  'dallas-usa': {
    slug: 'dallas-usa',
    city: 'Dallas',
    country: 'USA',
    region: 'East Asia',
    timezone: 'CST (UTC-6) / CDT (UTC-5)',
    istOffset: -11.5,
    indianCommunitySize: '~250,000 Indian-origin in Dallas-Fort Worth metroplex (Plano, Frisco, Irving, Carrollton)',
    indianSchools: ['Plano West Senior HS', 'Plano East Senior HS', 'Frisco HS', 'Liberty HS Frisco', 'Hebron HS Carrollton', 'Coppell HS', 'Highland Park HS', 'Allen HS', 'Jasper HS Plano'],
    localBatchSlot: 'CST 6:00 AM – 8:30 AM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$2,500-4,500/year.',
    cityContext:
      'Dallas-Fort Worth has one of America\'s fastest-growing Indian-origin communities — concentrated in Plano, Frisco, Irving, Carrollton, Coppell, Allen. Many DFW-Indian Class 12 students target US premed via UT Austin / UT Dallas / UTSW / Baylor pathway, but a substantial group considers Indian MBBS via NRI quota at AIIMS / JIPMER / MMMC Manipal + NEET. Cerebrum offers parallel NEET + MCAT B/B coaching.',
    faqs: [
      { question: 'DFW medical pathway?', answer: 'US premed (4-year BSc → MCAT → 4-year MD = 8+ yrs) OR Indian MBBS via NRI quota + NEET (5.5 yrs). Many families pursue both as parallel options.' },
      { question: 'CST class schedule?', answer: 'Our India evening batch (5:30-8 PM IST) is 6:00-8:30 AM Dallas. Most prefer recorded + Saturday morning live (9-11:30 AM CST).' },
      { question: 'Plano / Frisco / Coppell community support?', answer: 'Online live works equally well from any DFW neighbourhood. Most Cerebrum-Dallas students are from Plano + Frisco + Coppell.' },
      { question: 'Material delivery to DFW?', answer: 'USPS Priority 4-6 days.' },
    ],
  },
  'san-jose-usa': {
    slug: 'san-jose-usa',
    city: 'San Jose',
    country: 'USA',
    region: 'East Asia',
    timezone: 'PST (UTC-8) / PDT (UTC-7)',
    istOffset: -13.5,
    indianCommunitySize: '~200,000 Indian-origin in Greater Bay Area / Silicon Valley',
    indianSchools: ['Lynbrook HS', 'Monta Vista HS Cupertino', 'Mission San Jose HS Fremont', 'Saratoga HS', 'Gunn HS Palo Alto', 'Henry M. Gunn HS', 'Harker School San Jose', 'Bellarmine College Prep'],
    localBatchSlot: 'PST 4:00 AM – 6:30 AM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$3,000-5,000/year. Bay Area Indian-origin families pay top-tier.',
    cityContext:
      'San Jose + Greater Bay Area (Cupertino, Fremont, Sunnyvale, Mountain View, Palo Alto, Milpitas) has Silicon Valley\'s densest Indian-origin community — heavily IT and biomedical workforce. Bay Area-Indian Class 12 students compete for top-30 US premed (Stanford, UC Berkeley, UCLA, UCSD) + MCAT pathway, with a minority targeting Indian medical college via NRI quota + NEET. Cerebrum runs Saturday morning weekend live batch (PST 9-11:30 AM) as the time-zone-friendly option.',
    faqs: [
      { question: 'Bay Area medical pathway?', answer: 'Most Bay Area-Indian students pursue Stanford / UC system premed → MCAT → MD. A subset pursues Indian MBBS via NRI quota + NEET (5.5 yrs vs 8+ yrs). We coach both NEET and MCAT B/B Section.' },
      { question: 'PST 13.5-hour offset — class schedule?', answer: 'Our India evening batch (5:30-8 PM IST) is 4:00-6:30 AM Bay Area. Most students prefer recorded weekday + Saturday morning live (9-11:30 AM PST).' },
      { question: 'Lynbrook / Monta Vista / Mission San Jose schedule fit?', answer: 'These are competitive Bay Area schools with high homework load. Most students use recorded sessions + once-weekend live + chat doubt-clearing.' },
      { question: 'Material delivery to Bay Area?', answer: 'USPS Priority 4-6 days.' },
    ],
  },
  'brampton-canada': {
    slug: 'brampton-canada',
    city: 'Brampton',
    country: 'Canada',
    region: 'East Asia',
    timezone: 'EST (UTC-5) / EDT (UTC-4)',
    istOffset: -10.5,
    indianCommunitySize: '~600,000 Indian-origin in Brampton (~52% of city population, largest concentration in North America)',
    indianSchools: ['Turner Fenton Secondary School', 'Mayfield Secondary School', 'Heart Lake Secondary', 'Bramalea Secondary', 'Central Peel Secondary', 'Chinguacousy Secondary', 'David Suzuki Secondary'],
    localBatchSlot: 'EST 7:00 AM – 9:30 AM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$2,500-4,500/year.',
    cityContext:
      'Brampton is North America\'s most Indian city — 52% of the population is Indian-origin (~600K), predominantly Sikh and Punjabi families with strong Indian medical-career tradition. Many Brampton-Indian Class 12 students target Indian MBBS via NRI quota + NEET (5.5 yrs to physician) as a faster alternative to Canadian MD pathway (8+ yrs via BSc + MCAT + MD). Cerebrum has its largest GTA student concentration in Brampton.',
    faqs: [
      { question: 'Brampton Indian community — NEET vs Canadian MD?', answer: 'NEET via NRI quota is the dominant choice — 5.5 yrs to physician + India residency option + faster economics vs Canadian MD\'s 8+ years. Many Brampton families also explore Manipal Melaka (Malaysia campus that feeds Manipal University clinicals).' },
      { question: 'EST 7-9:30 AM batch fit for Brampton students?', answer: 'Yes — clean before-school slot. Saturday morning live also at 9-11:30 AM EST.' },
      { question: 'Turner Fenton / Mayfield / Heart Lake Secondary school support?', answer: 'Yes — most Cerebrum-Brampton students attend these or Chinguacousy / Central Peel. NCERT-aligned coaching alongside Ontario Grade 11-12 Biology.' },
      { question: 'Material delivery to Brampton?', answer: 'Canada Post Expedited 5-7 days.' },
    ],
  },
  'lagos-nigeria': {
    slug: 'lagos-nigeria',
    city: 'Lagos',
    country: 'Nigeria',
    region: 'Africa',
    timezone: 'WAT (UTC+1)',
    istOffset: -4.5,
    indianCommunitySize: '~50,000 Indian-origin residents in Nigeria',
    indianSchools: ['Indian Language School Ikoyi', 'Lekki British International School', 'Greensprings School', 'Day Waterman College'],
    localBatchSlot: 'WAT 1:00 PM – 3:30 PM (IST 5:30 PM – 8:00 PM)',
    pricingNote: 'NRI fees in USD: ~$1,800-3,600/year.',
    cityContext:
      'Lagos has one of West Africa\'s largest Indian communities — generations of Gujarati, Sindhi, and Punjabi families have built businesses across textiles, pharmaceuticals, and steel. Indian Language School Ikoyi is the legacy Indian-curriculum school; Lekki British International serves both Indian and other expat families. NEET aspirants pursue NRI quota at AIIMS, JIPMER, Manipal, KMC, and private deemed universities.',
    faqs: [
      { question: 'Pathway from Lagos to Indian medical college?', answer: 'NRI quota at AIIMS / JIPMER / private deemed universities; all-India quota. Biology cut-off ~330-345/360 for NRI premium colleges.' },
      { question: 'Indian Language School Ikoyi / Lekki British schedule fit?', answer: 'WAT 1-3:30 PM batch (IST 5:30-8 PM) fits after-school cleanly.' },
      { question: 'Material delivery to Lagos?', answer: 'DHL / FedEx 12-14 days to Lagos. Customs duty paid by recipient.' },
      { question: 'Travel for NEET exam day?', answer: 'NEET India test centers; we coordinate timing 4-6 weeks in advance.' },
    ],
  },
}
