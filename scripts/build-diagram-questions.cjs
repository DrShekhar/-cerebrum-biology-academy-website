/*
 * Build labelled-diagram NEET questions with inline SVG figures (base64
 * data-URIs — no external assets) and splice them into the authored section
 * files, replacing an equal number of trailing text questions so each section
 * stays at 45. Re-runnable: it strips any previously-inserted diagram questions
 * (marked _diagram:true) before re-inserting.
 *
 * Run:  node scripts/build-diagram-questions.cjs
 */
const fs = require('fs')
const path = require('path')

const DIR = path.join(__dirname, 'neet-mock')

// Shared SVG frame: 420x260, white ground, dark ink, sans-serif labels.
const svg = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 260" font-family="Arial,Helvetica,sans-serif">` +
  `<rect width="420" height="260" fill="#ffffff"/>` +
  body +
  `</svg>`
const dataUri = (s) => 'data:image/svg+xml;base64,' + Buffer.from(s).toString('base64')

// ── Figures ────────────────────────────────────────────────────────────────
const FIG = {}

// Physics — convex lens ray diagram, object beyond 2F
FIG.lens = svg(
  `<line x1="20" y1="150" x2="400" y2="150" stroke="#333" stroke-width="1"/>` +
    `<ellipse cx="210" cy="150" rx="14" ry="70" fill="#bfe3ff" stroke="#2563eb" stroke-width="2"/>` +
    // object arrow beyond 2F (left)
    `<line x1="70" y1="150" x2="70" y2="95" stroke="#c0392b" stroke-width="3"/>` +
    `<polygon points="70,88 65,100 75,100" fill="#c0392b"/>` +
    // focal / 2F markers
    `<circle cx="150" cy="150" r="3" fill="#333"/><text x="143" y="170" font-size="12">F</text>` +
    `<circle cx="90" cy="150" r="3" fill="#333"/><text x="80" y="170" font-size="12">2F</text>` +
    `<circle cx="270" cy="150" r="3" fill="#333"/><text x="263" y="170" font-size="12">F</text>` +
    `<circle cx="330" cy="150" r="3" fill="#333"/><text x="320" y="170" font-size="12">2F</text>` +
    `<text x="55" y="85" font-size="12" fill="#c0392b">Object</text>` +
    `<text x="200" y="235" font-size="12" fill="#2563eb">Convex lens</text>`
)

// Physics — circuit: two R in parallel, in series with one R
FIG.circuit = svg(
  `<text x="18" y="60" font-size="13">A</text>` +
    `<line x1="30" y1="70" x2="90" y2="70" stroke="#333" stroke-width="2"/>` +
    // parallel pair
    `<line x1="90" y1="70" x2="90" y2="40" stroke="#333" stroke-width="2"/>` +
    `<line x1="90" y1="70" x2="90" y2="110" stroke="#333" stroke-width="2"/>` +
    `<rect x="120" y="30" width="60" height="20" fill="#fff" stroke="#333" stroke-width="2"/><text x="132" y="24" font-size="12">R</text>` +
    `<rect x="120" y="100" width="60" height="20" fill="#fff" stroke="#333" stroke-width="2"/><text x="132" y="135" font-size="12">R</text>` +
    `<line x1="90" y1="40" x2="120" y2="40" stroke="#333" stroke-width="2"/>` +
    `<line x1="180" y1="40" x2="210" y2="40" stroke="#333" stroke-width="2"/>` +
    `<line x1="90" y1="110" x2="120" y2="110" stroke="#333" stroke-width="2"/>` +
    `<line x1="180" y1="110" x2="210" y2="110" stroke="#333" stroke-width="2"/>` +
    `<line x1="210" y1="40" x2="210" y2="110" stroke="#333" stroke-width="2"/>` +
    // series R
    `<line x1="210" y1="70" x2="260" y2="70" stroke="#333" stroke-width="2"/>` +
    `<rect x="260" y="60" width="60" height="20" fill="#fff" stroke="#333" stroke-width="2"/><text x="285" y="54" font-size="12">R</text>` +
    `<line x1="320" y1="70" x2="380" y2="70" stroke="#333" stroke-width="2"/>` +
    `<text x="384" y="60" font-size="13">B</text>` +
    `<text x="150" y="230" font-size="12" fill="#555">Each resistor = 6 Ω</text>`
)

// Physics — v-t graph, straight line from origin
FIG.vt = svg(
  `<line x1="60" y1="210" x2="380" y2="210" stroke="#333" stroke-width="1.5"/>` +
    `<line x1="60" y1="210" x2="60" y2="30" stroke="#333" stroke-width="1.5"/>` +
    `<line x1="60" y1="210" x2="340" y2="60" stroke="#c0392b" stroke-width="2.5"/>` +
    `<text x="350" y="225" font-size="12">t (s)</text>` +
    `<text x="20" y="40" font-size="12">v (m/s)</text>` +
    `<text x="335" y="55" font-size="11" fill="#c0392b">(4, 20)</text>` +
    `<line x1="340" y1="60" x2="340" y2="210" stroke="#999" stroke-dasharray="3" stroke-width="1"/>` +
    `<text x="330" y="225" font-size="11">4</text>`
)

// Physics — transverse wave snapshot with wavelength bracket
FIG.wave = svg(
  `<line x1="20" y1="130" x2="400" y2="130" stroke="#999" stroke-width="1"/>` +
    `<path d="M40 130 Q 80 50 120 130 T 200 130 T 280 130 T 360 130" fill="none" stroke="#2563eb" stroke-width="2.5"/>` +
    `<line x1="120" y1="130" x2="200" y2="130" stroke="#c0392b" stroke-width="1"/>` +
    `<line x1="120" y1="125" x2="120" y2="150" stroke="#c0392b"/><line x1="200" y1="125" x2="200" y2="150" stroke="#c0392b"/>` +
    `<text x="140" y="168" font-size="12" fill="#c0392b">λ = 0.5 m</text>` +
    `<text x="150" y="235" font-size="12" fill="#555">Wave speed = 2 m/s</text>`
)

// Chemistry — propan-2-ol structure
FIG.propanol = svg(
  `<text x="70" y="140" font-size="18">CH₃</text>` +
    `<line x1="120" y1="135" x2="160" y2="135" stroke="#333" stroke-width="2"/>` +
    `<text x="162" y="140" font-size="18">CH</text>` +
    `<line x1="185" y1="120" x2="185" y2="90" stroke="#333" stroke-width="2"/>` +
    `<text x="172" y="85" font-size="18">OH</text>` +
    `<line x1="205" y1="135" x2="245" y2="135" stroke="#333" stroke-width="2"/>` +
    `<text x="247" y="140" font-size="18">CH₃</text>` +
    `<text x="120" y="220" font-size="12" fill="#555">Name this compound</text>`
)

// Chemistry — exothermic energy profile
FIG.energy = svg(
  `<line x1="55" y1="215" x2="385" y2="215" stroke="#333" stroke-width="1.5"/>` +
    `<line x1="55" y1="215" x2="55" y2="30" stroke="#333" stroke-width="1.5"/>` +
    `<path d="M75 90 C 150 90 160 55 210 55 C 260 55 270 160 340 160" fill="none" stroke="#c0392b" stroke-width="2.5"/>` +
    `<line x1="75" y1="90" x2="120" y2="90" stroke="#2563eb" stroke-dasharray="3"/><text x="80" y="82" font-size="11" fill="#2563eb">Reactants</text>` +
    `<line x1="300" y1="160" x2="345" y2="160" stroke="#2563eb" stroke-dasharray="3"/><text x="300" y="178" font-size="11" fill="#2563eb">Products</text>` +
    `<text x="14" y="40" font-size="11">Energy</text>` +
    `<text x="150" y="235" font-size="12">Reaction coordinate</text>`
)

// Chemistry — aldehyde functional group
FIG.aldehyde = svg(
  `<text x="120" y="140" font-size="20">R</text>` +
    `<line x1="145" y1="133" x2="185" y2="133" stroke="#333" stroke-width="2"/>` +
    `<text x="188" y="140" font-size="20">C</text>` +
    `<line x1="205" y1="120" x2="230" y2="95" stroke="#333" stroke-width="2"/>` +
    `<line x1="210" y1="124" x2="235" y2="99" stroke="#333" stroke-width="2"/>` +
    `<text x="235" y="92" font-size="20">O</text>` +
    `<line x1="205" y1="140" x2="245" y2="140" stroke="#333" stroke-width="2"/>` +
    `<text x="248" y="147" font-size="20">H</text>` +
    `<text x="120" y="220" font-size="12" fill="#555">Identify the functional group</text>`
)

// Botany — stoma with two guard cells
FIG.stoma = svg(
  `<path d="M150 80 C 110 90 110 170 150 180 C 180 165 180 95 150 80 Z" fill="#cdeccd" stroke="#2e7d32" stroke-width="2"/>` +
    `<path d="M270 80 C 310 90 310 170 270 180 C 240 165 240 95 270 80 Z" fill="#cdeccd" stroke="#2e7d32" stroke-width="2"/>` +
    `<ellipse cx="210" cy="130" rx="24" ry="46" fill="#ffffff" stroke="#999" stroke-dasharray="3"/>` +
    `<text x="90" y="215" font-size="12" fill="#2e7d32">Guard cells</text>` +
    `<line x1="150" y1="205" x2="150" y2="185" stroke="#2e7d32"/><line x1="270" y1="205" x2="270" y2="185" stroke="#2e7d32"/>` +
    `<text x="185" y="130" font-size="11" fill="#666">pore</text>`
)

// Botany — plant cell with labelled chloroplast (X)
FIG.plantcell = svg(
  `<rect x="60" y="50" width="300" height="160" fill="#f4fbf4" stroke="#2e7d32" stroke-width="4"/>` +
    `<rect x="72" y="62" width="276" height="136" fill="#ffffff" stroke="#a5d6a5" stroke-width="1"/>` +
    `<circle cx="150" cy="130" r="26" fill="#e6d3f0" stroke="#7b3fa0" stroke-width="2"/><text x="132" y="175" font-size="11">nucleus</text>` +
    `<ellipse cx="260" cy="110" rx="30" ry="16" fill="#4caf50" stroke="#2e7d32" stroke-width="2"/>` +
    `<text x="250" y="114" font-size="13" fill="#fff">X</text>` +
    `<line x1="260" y1="126" x2="285" y2="160" stroke="#333"/><text x="270" y="175" font-size="11">X = ?</text>` +
    `<text x="120" y="235" font-size="12" fill="#555">X is green &amp; carries out photosynthesis</text>`
)

// Botany — photosynthesis rate vs light intensity, plateau at P
FIG.photosynthesis = svg(
  `<line x1="60" y1="210" x2="385" y2="210" stroke="#333" stroke-width="1.5"/>` +
    `<line x1="60" y1="210" x2="60" y2="30" stroke="#333" stroke-width="1.5"/>` +
    `<path d="M60 210 C 120 120 180 80 230 78 L 370 78" fill="none" stroke="#2e7d32" stroke-width="2.5"/>` +
    `<circle cx="230" cy="78" r="4" fill="#c0392b"/><text x="222" y="70" font-size="12" fill="#c0392b">P</text>` +
    `<text x="250" y="225" font-size="12">Light intensity →</text>` +
    `<text x="12" y="120" font-size="11" transform="rotate(-90 12 120)">Rate of photosynthesis</text>`
)

// Zoology — neuron schematic, X = axon
FIG.neuron = svg(
  `<circle cx="110" cy="130" r="34" fill="#ffe0b2" stroke="#e65100" stroke-width="2"/>` +
    `<circle cx="110" cy="130" r="12" fill="#e65100"/>` +
    // dendrites
    `<line x1="86" y1="106" x2="55" y2="80" stroke="#e65100" stroke-width="2"/>` +
    `<line x1="80" y1="130" x2="45" y2="130" stroke="#e65100" stroke-width="2"/>` +
    `<line x1="86" y1="154" x2="55" y2="180" stroke="#e65100" stroke-width="2"/>` +
    `<text x="40" y="70" font-size="11">dendrites</text>` +
    // axon
    `<line x1="144" y1="130" x2="360" y2="130" stroke="#e65100" stroke-width="4"/>` +
    `<rect x="180" y="122" width="30" height="16" fill="#fff3e0" stroke="#e65100"/>` +
    `<rect x="240" y="122" width="30" height="16" fill="#fff3e0" stroke="#e65100"/>` +
    `<rect x="300" y="122" width="30" height="16" fill="#fff3e0" stroke="#e65100"/>` +
    `<text x="250" y="112" font-size="13" fill="#c0392b">X</text>` +
    `<line x1="250" y1="140" x2="250" y2="170" stroke="#333"/><text x="235" y="185" font-size="11">X = ?</text>`
)

// Zoology — oxygen dissociation curve (sigmoid)
FIG.odc = svg(
  `<line x1="60" y1="210" x2="385" y2="210" stroke="#333" stroke-width="1.5"/>` +
    `<line x1="60" y1="210" x2="60" y2="30" stroke="#333" stroke-width="1.5"/>` +
    `<path d="M60 200 C 120 190 150 120 200 90 C 250 60 320 52 370 50" fill="none" stroke="#c0392b" stroke-width="2.5"/>` +
    `<text x="230" y="225" font-size="12">Partial pressure of O₂ →</text>` +
    `<text x="12" y="130" font-size="11" transform="rotate(-90 12 130)">% saturation of Hb</text>`
)

// Zoology — heart four-chamber schematic, X = left ventricle
FIG.heart = svg(
  `<rect x="120" y="50" width="80" height="70" fill="#cfe8ff" stroke="#2563eb" stroke-width="2"/><text x="130" y="90" font-size="12">RA</text>` +
    `<rect x="220" y="50" width="80" height="70" fill="#ffd6d6" stroke="#c0392b" stroke-width="2"/><text x="230" y="90" font-size="12">LA</text>` +
    `<rect x="120" y="120" width="80" height="90" fill="#cfe8ff" stroke="#2563eb" stroke-width="2"/><text x="130" y="170" font-size="12">RV</text>` +
    `<rect x="220" y="120" width="80" height="90" fill="#ffd6d6" stroke="#c0392b" stroke-width="4"/><text x="248" y="170" font-size="13" fill="#c0392b">X</text>` +
    `<text x="120" y="235" font-size="12" fill="#555">X: thick-walled, pumps blood into the aorta</text>`
)

// ── Diagram questions (svg key → figure) ────────────────────────────────────
const DIAGRAMS = {
  physics: [
    {
      topic: 'Ray Optics',
      subtopic: 'Convex lens image',
      question:
        'In the ray diagram shown, an object is placed beyond 2F of a convex lens. The image formed is:',
      options: [
        'real, inverted and diminished (between F and 2F)',
        'real, inverted and magnified (beyond 2F)',
        'virtual, erect and magnified',
        'real, inverted and of the same size',
      ],
      answer: 'A',
      explanation:
        'For a convex lens with the object beyond 2F, the image is real, inverted, diminished and lies between F and 2F on the other side.',
      difficulty: 'MEDIUM',
      ncertClass: 12,
      ncertChapter: 'Ray Optics and Optical Instruments',
      svg: 'lens',
    },
    {
      topic: 'Current Electricity',
      subtopic: 'Equivalent resistance',
      question:
        'In the circuit shown, each resistor has resistance R = 6 Ω. The equivalent resistance between A and B is:',
      options: ['9 Ω', '3 Ω', '18 Ω', '4 Ω'],
      answer: 'A',
      explanation:
        'The two 6 Ω resistors in parallel give 3 Ω; in series with the third 6 Ω gives 3 + 6 = 9 Ω.',
      difficulty: 'MEDIUM',
      ncertClass: 12,
      ncertChapter: 'Current Electricity',
      svg: 'circuit',
    },
    {
      topic: 'Motion in a Straight Line',
      subtopic: 'v-t graph',
      question:
        'The velocity-time graph shown is a straight line from the origin reaching 20 m/s at t = 4 s. The displacement in these 4 s is:',
      options: ['40 m', '80 m', '20 m', '10 m'],
      answer: 'A',
      explanation:
        'Displacement = area under the v-t graph = ½ × base × height = ½ × 4 × 20 = 40 m.',
      difficulty: 'EASY',
      ncertClass: 11,
      ncertChapter: 'Motion in a Straight Line',
      svg: 'vt',
    },
    {
      topic: 'Waves',
      subtopic: 'Wave equation',
      question:
        'The snapshot of a transverse wave shows a wavelength of 0.5 m, and the wave travels at 2 m/s. Its frequency is:',
      options: ['4 Hz', '2 Hz', '1 Hz', '8 Hz'],
      answer: 'A',
      explanation: 'f = v / λ = 2 / 0.5 = 4 Hz.',
      difficulty: 'EASY',
      ncertClass: 11,
      ncertChapter: 'Waves',
      svg: 'wave',
    },
  ],
  chemistry: [
    {
      topic: 'Alcohols, Phenols and Ethers',
      subtopic: 'IUPAC nomenclature',
      question: 'The IUPAC name of the compound shown is:',
      options: ['propan-2-ol', 'propan-1-ol', 'propanal', 'propan-2-one'],
      answer: 'A',
      explanation:
        'A three-carbon chain with –OH on the middle (2nd) carbon is propan-2-ol (isopropyl alcohol).',
      difficulty: 'EASY',
      ncertClass: 12,
      ncertChapter: 'Alcohols, Phenols and Ethers',
      svg: 'propanol',
    },
    {
      topic: 'Chemical Kinetics / Thermodynamics',
      subtopic: 'Energy profile',
      question:
        'In the energy profile shown, the products lie at lower energy than the reactants. The reaction is:',
      options: [
        'exothermic (ΔH negative)',
        'endothermic (ΔH positive)',
        'always spontaneous regardless of ΔH',
        'one with zero activation energy',
      ],
      answer: 'A',
      explanation:
        'Products at lower potential energy than reactants means energy is released, so the reaction is exothermic (ΔH is negative).',
      difficulty: 'MEDIUM',
      ncertClass: 11,
      ncertChapter: 'Thermodynamics',
      svg: 'energy',
    },
    {
      topic: 'Aldehydes, Ketones and Carboxylic Acids',
      subtopic: 'Functional group',
      question: 'The functional group shown (–CHO) is characteristic of:',
      options: ['aldehydes', 'ketones', 'carboxylic acids', 'esters'],
      answer: 'A',
      explanation:
        'A carbonyl carbon bonded to at least one hydrogen (–CHO) is the aldehyde group.',
      difficulty: 'EASY',
      ncertClass: 12,
      ncertChapter: 'Aldehydes, Ketones and Carboxylic Acids',
      svg: 'aldehyde',
    },
  ],
  botany: [
    {
      topic: 'Anatomy of Flowering Plants',
      subtopic: 'Stomata',
      question:
        'The structure shown, formed by two guard cells surrounding a pore, mainly regulates:',
      options: [
        'gaseous exchange and transpiration',
        'absorption of water from soil',
        'translocation of sugars',
        'secondary growth of the stem',
      ],
      answer: 'A',
      explanation:
        'Stomata, bounded by two guard cells, open and close to control gas exchange (CO₂/O₂) and loss of water vapour (transpiration).',
      difficulty: 'EASY',
      ncertClass: 11,
      ncertChapter: 'Anatomy of Flowering Plants',
      svg: 'stoma',
    },
    {
      topic: 'Cell: The Unit of Life',
      subtopic: 'Cell organelles',
      question:
        'In the plant cell shown, the green organelle labelled X carries out photosynthesis. X is the:',
      options: ['chloroplast', 'mitochondrion', 'nucleus', 'vacuole'],
      answer: 'A',
      explanation:
        'Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells.',
      difficulty: 'EASY',
      ncertClass: 11,
      ncertChapter: 'Cell: The Unit of Life',
      svg: 'plantcell',
    },
    {
      topic: 'Photosynthesis in Higher Plants',
      subtopic: 'Limiting factors',
      question:
        'In the graph of photosynthesis rate versus light intensity, beyond point P the rate no longer rises with light. This is because:',
      options: [
        'a factor other than light (e.g. CO₂ or temperature) has become limiting',
        'light has become the sole limiting factor',
        'chlorophyll is destroyed at high light',
        'photorespiration completely stops',
      ],
      answer: 'A',
      explanation:
        'At the plateau, light is no longer limiting; the rate is now capped by another factor such as CO₂ concentration or temperature (Blackman’s law of limiting factors).',
      difficulty: 'MEDIUM',
      ncertClass: 11,
      ncertChapter: 'Photosynthesis in Higher Plants',
      svg: 'photosynthesis',
    },
  ],
  zoology: [
    {
      topic: 'Neural Control and Coordination',
      subtopic: 'Neuron structure',
      question:
        'In the neuron shown, the long process labelled X carries impulses away from the cell body. X is the:',
      options: ['axon', 'dendrite', 'cell body (soma)', 'synapse'],
      answer: 'A',
      explanation:
        'The axon is the single long process that conducts nerve impulses away from the cell body toward the axon terminals.',
      difficulty: 'EASY',
      ncertClass: 11,
      ncertChapter: 'Neural Control and Coordination',
      svg: 'neuron',
    },
    {
      topic: 'Breathing and Exchange of Gases',
      subtopic: 'Oxygen dissociation curve',
      question:
        'The sigmoid oxygen-haemoglobin dissociation curve shown shifts to the RIGHT when:',
      options: [
        'pCO₂ rises / pH falls (Bohr effect)',
        'pCO₂ falls and pH rises',
        'temperature decreases',
        'pO₂ in the lungs increases',
      ],
      answer: 'A',
      explanation:
        'Higher CO₂, higher H⁺ (lower pH) and higher temperature shift the curve right, favouring O₂ unloading in tissues — the Bohr effect.',
      difficulty: 'MEDIUM',
      ncertClass: 11,
      ncertChapter: 'Breathing and Exchange of Gases',
      svg: 'odc',
    },
    {
      topic: 'Body Fluids and Circulation',
      subtopic: 'Heart chambers',
      question:
        'In the schematic of the human heart, chamber X is thick-walled and pumps blood into the aorta. X is the:',
      options: ['left ventricle', 'right ventricle', 'left atrium', 'right atrium'],
      answer: 'A',
      explanation:
        'The left ventricle has the thickest muscular wall as it pumps oxygenated blood into the aorta and around the whole body.',
      difficulty: 'EASY',
      ncertClass: 11,
      ncertChapter: 'Body Fluids and Circulation',
      svg: 'heart',
    },
  ],
}

// ── Splice into section files ───────────────────────────────────────────────
for (const [section, diagrams] of Object.entries(DIAGRAMS)) {
  const file = path.join(DIR, `${section}.json`)
  const qs = JSON.parse(fs.readFileSync(file, 'utf8'))
  // Must run on the text-only source (diagrams REPLACE text questions, so a
  // second pass can't restore the dropped ones). Re-run after:
  //   git checkout HEAD -- scripts/neet-mock/*.json
  if (qs.some((q) => q._diagram)) {
    console.error(`${section}: already has diagram questions — restore text-only files from git first.`)
    process.exit(1)
  }
  const LETTERS = ['A', 'B', 'C', 'D']
  const built = diagrams.map((d, i) => {
    const { svg: key, ...rest } = d
    // Spread the correct option across A–D so it isn't always the same letter.
    const correctIdx = LETTERS.indexOf(d.answer)
    const targetIdx = i % 4
    const opts = [...d.options]
    const correctOpt = opts.splice(correctIdx, 1)[0]
    opts.splice(targetIdx, 0, correctOpt)
    return {
      ...rest,
      options: opts,
      answer: LETTERS[targetIdx],
      type: 'MCQ',
      image: dataUri(FIG[key]),
      _diagram: true,
    }
  })
  // Replace an equal number of trailing text questions to stay at 45.
  const kept = qs.slice(0, qs.length - built.length)
  const out = [...kept, ...built]
  if (out.length !== 45) {
    console.error(`${section}: would be ${out.length}, expected 45 — aborting.`)
    process.exit(1)
  }
  fs.writeFileSync(file, JSON.stringify(out, null, 2))
  console.log(`${section}: +${built.length} diagram questions (total ${out.length})`)
}
console.log('Done.')
