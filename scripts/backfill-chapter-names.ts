/**
 * One-time script: Backfill ncertChapterName for ~4,015 questions
 * that only have a broad topic (e.g., "Human Physiology") but no chapter name.
 *
 * Strategy: keyword matching on question text → assign most likely chapter.
 * Run with: npx tsx scripts/backfill-chapter-names.ts
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

// Topic → Chapter keyword rules
// Each chapter has an array of regex patterns. First match wins within a topic.
const CHAPTER_RULES: Record<string, { chapter: string; patterns: RegExp[] }[]> = {
  'Human Physiology': [
    {
      chapter: 'Digestion and Absorption',
      patterns: [
        /digest/i, /alimentary/i, /peristalsis/i, /stomach/i, /intestin/i,
        /enzyme.*digest/i, /bile/i, /pancrea/i, /villus|villi/i, /duodenum/i,
        /chyme/i, /bolus/i, /salivary/i, /oesophagus/i, /colon/i, /rectum/i,
        /absorption.*nutrient/i, /malnutrition/i, /PEM|kwashiorkor|marasmus/i,
      ],
    },
    {
      chapter: 'Breathing and Exchange of Gases',
      patterns: [
        /breathing/i, /lung/i, /alveol/i, /trachea/i, /bronch/i,
        /respir.*organ/i, /exchange.*gas/i, /diaphragm/i, /pleura/i,
        /tidal.*volume/i, /vital.*capacity/i, /residual.*volume/i,
        /oxygen.*dissociation/i, /haemoglobin.*oxygen/i, /pO2|pCO2/i,
        /asthma/i, /emphysema/i, /inhalation|exhalation/i,
      ],
    },
    {
      chapter: 'Body Fluids and Circulation',
      patterns: [
        /blood/i, /circulat/i, /heart/i, /cardiac/i, /haemoglobin/i,
        /lymph/i, /plasma/i, /artery|vein|capillar/i, /erythrocyte|leucocyte/i,
        /RBC|WBC|platelet/i, /ECG|electrocardiogram/i, /systol|diastol/i,
        /double.*circulat/i, /sino.*atrial|SA.*node/i, /blood.*group/i,
        /coagulation|clotting/i, /pulse|blood.*pressure/i,
      ],
    },
    {
      chapter: 'Excretory Products and Their Elimination',
      patterns: [
        /excret/i, /kidney/i, /nephron/i, /urin/i, /osmoregulat/i,
        /Bowman.*capsule/i, /glomerul/i, /tubul.*reabsorpt/i,
        /counter.*current/i, /loop.*Henle/i, /ADH|antidiuretic/i,
        /dialysis/i, /urea|uric.*acid|ammonia.*excret/i, /micturition/i,
      ],
    },
    {
      chapter: 'Locomotion and Movement',
      patterns: [
        /locomot/i, /movement/i, /skeletal/i, /muscle/i, /bone/i,
        /joint/i, /tendon/i, /ligament/i, /cartilage/i, /actin|myosin/i,
        /sarcomere/i, /sliding.*filament/i, /contracti/i, /skeleton/i,
        /fracture/i, /osteoporosis/i, /arthritis/i, /gout/i,
      ],
    },
    {
      chapter: 'Neural Control and Coordination',
      patterns: [
        /neural/i, /neuron/i, /nerve/i, /brain/i, /synapse/i,
        /reflex/i, /spinal.*cord/i, /cerebr/i, /cerebellum/i,
        /medulla/i, /axon|dendrite/i, /action.*potential/i,
        /neurotransmit/i, /sensory.*organ/i, /eye|ear|retina|cochlea/i,
        /receptor.*neural/i, /CNS|PNS/i, /sympathetic|parasympathetic/i,
      ],
    },
    {
      chapter: 'Chemical Coordination and Integration',
      patterns: [
        /hormone/i, /endocrine/i, /pituitary/i, /thyroid/i, /adrenal/i,
        /insulin/i, /glucagon/i, /parathyroid/i, /hypothalamus/i,
        /feedback.*mechanism/i, /gonad.*hormone/i, /estrogen|progesterone|testosterone/i,
        /melatonin/i, /thyroxin/i, /cortisol/i, /aldosterone/i,
      ],
    },
  ],
  'Plant Physiology': [
    {
      chapter: 'Transport in Plants',
      patterns: [
        /transport.*plant/i, /xylem/i, /phloem/i, /transpir/i,
        /root.*pressure/i, /ascent.*sap/i, /transloc/i, /osmosis/i,
        /plasmolysis/i, /water.*potential/i, /turgor/i, /guttation/i,
        /absorption.*water/i, /mass.*flow/i, /sieve.*tube/i,
      ],
    },
    {
      chapter: 'Mineral Nutrition',
      patterns: [
        /mineral.*nutri/i, /macro.*nutrient/i, /micro.*nutrient/i,
        /deficiency.*symptom/i, /nitrogen.*fix/i, /nitrogenase/i,
        /hydroponics/i, /essential.*element/i, /toxicity.*mineral/i,
        /manganese|zinc|copper|boron|molybdenum/i, /chlorosis/i,
        /necrosis/i,
      ],
    },
    {
      chapter: 'Photosynthesis in Higher Plants',
      patterns: [
        /photosynthesis/i, /chloroplast/i, /chlorophyll/i, /Calvin/i,
        /light.*reaction/i, /dark.*reaction/i, /C3.*plant|C4.*plant/i,
        /photorespir/i, /CAM.*plant/i, /photosystem/i, /RUBISCO/i,
        /NADPH/i, /ATP.*synthase/i, /thylakoid/i, /stroma/i,
        /Hill.*reaction/i, /Emerson/i, /pigment/i,
      ],
    },
    {
      chapter: 'Respiration in Plants',
      patterns: [
        /respirat.*plant/i, /glycolysis/i, /Krebs|TCA|citric.*acid/i,
        /electron.*transport/i, /fermentat/i, /aerobic|anaerobic/i,
        /oxidative.*phosphorylat/i, /pyruvat/i, /mitochondri/i,
        /respiratory.*quotient|RQ/i, /amphibolic/i,
      ],
    },
    {
      chapter: 'Plant Growth and Development',
      patterns: [
        /plant.*growth/i, /auxin/i, /gibberellin/i, /cytokinin/i,
        /abscisic.*acid|ABA/i, /ethylene/i, /photoperiodism/i,
        /vernalis/i, /dormancy/i, /seed.*germinat/i, /apical.*dominance/i,
        /differentiat.*plant/i, /dedifferentiat/i, /phytochrome/i,
      ],
    },
  ],
  'Reproduction': [
    {
      chapter: 'Reproduction in Organisms',
      patterns: [
        /asexual.*reproduc/i, /vegetative.*propagat/i, /budding/i,
        /fragmentation/i, /regenerat/i, /binary.*fission/i,
        /spore.*formation/i, /clone/i,
      ],
    },
    {
      chapter: 'Sexual Reproduction in Flowering Plants',
      patterns: [
        /flower/i, /pollinat/i, /embryo.*sac/i, /endosperm/i,
        /double.*fertilis/i, /ovule/i, /anther/i, /pollen/i,
        /stamen|pistil|carpel/i, /megaspor/i, /microspor/i,
        /seed.*develop/i, /fruit.*develop/i, /apomixis/i,
        /polyembryony/i, /self.*incompatib/i,
      ],
    },
    {
      chapter: 'Human Reproduction',
      patterns: [
        /human.*reproduc/i, /spermato/i, /oogenesis/i, /menstrual/i,
        /fertilisation.*human|implantation/i, /placenta/i, /pregnancy/i,
        /parturition/i, /lactation/i, /testis|ovary/i,
        /seminal|epididymis|vas.*deferens/i, /uterus|fallopian/i,
        /embryo.*develop/i, /foetus/i, /gametogenesis/i,
      ],
    },
    {
      chapter: 'Reproductive Health',
      patterns: [
        /reproductive.*health/i, /contracept/i, /STD|STI/i,
        /infertility/i, /IVF|test.*tube/i, /amniocentesis/i,
        /MTP|medical.*terminat/i, /population.*explosion/i,
        /birth.*control/i, /family.*planning/i, /ART.*assisted/i,
      ],
    },
  ],
  'Genetics and Evolution': [
    {
      chapter: 'Principles of Inheritance and Variation',
      patterns: [
        /Mendel/i, /inherit/i, /monohybrid|dihybrid/i, /dominant|recessive/i,
        /genotype|phenotype/i, /Punnet/i, /linkage/i, /crossing.*over/i,
        /sex.*determin/i, /sex.*linked/i, /codominan/i, /incomplete.*dominan/i,
        /polygenic/i, /pleiotrop/i, /epistasis/i, /chromosom.*disorder/i,
        /Down.*syndrome|Turner|Klinefelter/i,
      ],
    },
    {
      chapter: 'Molecular Basis of Inheritance',
      patterns: [
        /DNA.*replic/i, /transcription/i, /translation/i, /genetic.*code/i,
        /operon/i, /lac.*operon/i, /RNA.*polymer/i, /ribosome/i,
        /codon|anticodon/i, /central.*dogma/i, /Hershey|Chase/i,
        /Griffith|Avery/i, /Meselson|Stahl/i, /Watson|Crick/i,
        /double.*helix/i, /nucleotide/i, /DNA.*finger/i,
        /Human.*Genome.*Project|HGP/i,
      ],
    },
    {
      chapter: 'Evolution',
      patterns: [
        /evolution/i, /natural.*select/i, /Darwin/i, /Lamarck/i,
        /speciation/i, /adaptive.*radiat/i, /homologous|analogous/i,
        /fossil/i, /Hardy.*Weinberg/i, /genetic.*drift/i,
        /founder.*effect/i, /bottleneck/i, /origin.*life/i,
        /Miller|Urey/i, /Oparin|Haldane/i,
      ],
    },
  ],
  'Ecology': [
    {
      chapter: 'Organisms and Populations',
      patterns: [
        /population.*ecol/i, /natalit|mortalit/i, /age.*pyramid/i,
        /growth.*curve.*population/i, /carrying.*capacity/i,
        /competition|predation|parasit|mutualism|commensalism/i,
        /niche/i, /habitat/i, /adaptat.*organism/i,
        /logistic.*growth/i, /exponential.*growth/i, /r.*K.*strategy/i,
      ],
    },
    {
      chapter: 'Ecosystem',
      patterns: [
        /ecosystem/i, /food.*chain|food.*web/i, /trophic.*level/i,
        /energy.*flow/i, /pyramid.*energy|biomass|number/i,
        /primary.*product/i, /secondary.*product/i, /decompos/i,
        /biogeochemical.*cycle/i, /carbon.*cycle|nitrogen.*cycle|phosphorus.*cycle/i,
        /ecological.*succession/i, /GPP|NPP/i,
      ],
    },
    {
      chapter: 'Biodiversity and Conservation',
      patterns: [
        /biodiversity/i, /conservat/i, /extinct/i, /endangered/i,
        /hotspot/i, /Red.*Data/i, /IUCN/i, /endemic/i,
        /in.*situ|ex.*situ/i, /national.*park|sanctuary|biosphere/i,
        /species.*richness/i, /alpha.*beta.*gamma.*diversity/i,
        /sacred.*grove/i,
      ],
    },
    {
      chapter: 'Environmental Issues',
      patterns: [
        /pollution/i, /ozone.*deplet/i, /global.*warm/i, /greenhouse/i,
        /eutrophicat/i, /biomagnificat/i, /deforestation/i,
        /solid.*waste/i, /radioactive.*waste/i, /sewage/i, /BOD/i,
        /electrostatic.*precipitat/i, /catalytic.*convert/i,
        /CFC/i, /acid.*rain/i, /smog/i,
      ],
    },
  ],
  'Diversity in Living World': [
    {
      chapter: 'The Living World',
      patterns: [
        /taxonom/i, /classification.*system/i, /binomial.*nomenclat/i,
        /Linnaeus/i, /herbarium/i, /botanical.*garden/i, /museum/i,
        /taxonomic.*hierarch/i, /species|genus|family|order|class|phylum|kingdom/i,
      ],
    },
    {
      chapter: 'Biological Classification',
      patterns: [
        /five.*kingdom/i, /Whittaker/i, /Monera/i, /Protist/i,
        /Fungi/i, /Plantae/i, /Animalia/i, /virus/i, /viroid/i,
        /lichen/i, /mycoplasma/i, /bacteria.*classif/i, /archaebacteria|eubacteria/i,
      ],
    },
    {
      chapter: 'Plant Kingdom',
      patterns: [
        /algae/i, /bryophyte/i, /pteridophyte/i, /gymnosperm/i, /angiosperm/i,
        /alternation.*generation/i, /monocot|dicot/i, /thallophyta/i,
        /liverwort|moss|fern/i, /Cycas|Pinus/i, /sporophyte|gametophyte/i,
      ],
    },
    {
      chapter: 'Animal Kingdom',
      patterns: [
        /Porifera|Coelenterat|Cnidaria|Ctenophora/i, /Platyhelminth/i,
        /Aschelminth|Nematod/i, /Annelid/i, /Arthropod/i, /Mollus/i,
        /Echinoderm/i, /Chordatai/i, /vertebrat.*classif/i,
        /Mammalia|Aves|Reptilia|Amphibia|Pisces/i, /notochord/i,
        /coelom/i, /diploblast|triploblast/i, /symmetry.*animal/i,
      ],
    },
  ],
  'Cell Structure and Function': [
    {
      chapter: 'Cell - The Unit of Life',
      patterns: [
        /cell.*organelle/i, /nucleus/i, /mitochondri/i, /endoplasmic.*reticul/i,
        /Golgi/i, /lysosome/i, /ribosome/i, /cell.*membrane/i,
        /prokaryot|eukaryot/i, /cell.*wall/i, /vacuole/i, /plastid/i,
        /centrosome|centriole/i, /cytoskeleton/i, /peroxisome/i,
        /fluid.*mosaic/i, /Robert.*Hooke/i, /cell.*theory/i,
      ],
    },
    {
      chapter: 'Biomolecules',
      patterns: [
        /biomolecul/i, /carbohydrat/i, /protein/i, /lipid/i,
        /nucleic.*acid/i, /amino.*acid/i, /enzyme/i, /substrate/i,
        /polysaccharid/i, /monosaccharid/i, /fatty.*acid/i,
        /primary.*secondary.*tertiary.*structure/i, /denaturat/i,
        /cofactor|coenzyme/i, /competitive.*inhibit/i,
      ],
    },
    {
      chapter: 'Cell Cycle and Cell Division',
      patterns: [
        /cell.*cycle/i, /mitosis/i, /meiosis/i, /cytokinesis/i,
        /prophase|metaphase|anaphase|telophase/i, /interphase/i,
        /spindle.*fibre/i, /chromat/i, /centromere/i, /cell.*division/i,
        /S.*phase|G1.*phase|G2.*phase|M.*phase/i, /crossing.*over/i,
      ],
    },
  ],
  'Structural Organisation': [
    {
      chapter: 'Morphology of Flowering Plants',
      patterns: [
        /morphology/i, /root.*system/i, /stem.*modif/i, /leaf.*modif/i,
        /inflorescence/i, /flower.*part/i, /fruit.*type/i, /seed.*struct/i,
        /tap.*root|fibrous.*root/i, /phyllotaxy/i, /venation/i,
        /aestivation/i, /placentation/i,
      ],
    },
    {
      chapter: 'Anatomy of Flowering Plants',
      patterns: [
        /anatomy/i, /tissue.*system/i, /meristem/i, /permanent.*tissue/i,
        /vascular.*bundle/i, /secondary.*growth/i, /cork.*cambium/i,
        /collenchyma|sclerenchyma|parenchyma/i, /epidermis/i, /stomata/i,
        /annual.*ring/i, /heartwood|sapwood/i,
      ],
    },
    {
      chapter: 'Structural Organisation in Animals',
      patterns: [
        /epithelial.*tissue/i, /connective.*tissue/i, /muscular.*tissue/i,
        /nervous.*tissue/i, /organ.*system.*animal/i, /cockroach|earthworm|frog/i,
        /morphology.*anatomy.*frog/i, /squamous|cuboidal|columnar/i,
      ],
    },
  ],
  'Biology and Human Welfare': [
    {
      chapter: 'Human Health and Diseases',
      patterns: [
        /disease/i, /pathogen/i, /immun/i, /antigen|antibod/i,
        /vaccine|vaccinat/i, /AIDS|HIV/i, /cancer/i, /malaria/i,
        /typhoid/i, /pneumonia/i, /allergy/i, /autoimmun/i,
        /T.*cell|B.*cell/i, /lymphocyte/i, /interferon/i,
      ],
    },
    {
      chapter: 'Strategies for Enhancement in Food Production',
      patterns: [
        /animal.*husbandry/i, /plant.*breed/i, /hybridis/i,
        /tissue.*culture/i, /biofortif/i, /single.*cell.*protein/i,
        /apiculture|pisciculture|sericulture/i, /dairy.*farm/i,
        /poultry/i, /IARI/i, /green.*revolution/i, /mutation.*breed/i,
        /somatic.*hybrid/i, /inbreed.*depress/i,
      ],
    },
    {
      chapter: 'Microbes in Human Welfare',
      patterns: [
        /microbe/i, /ferment/i, /antibiotic/i, /biogas/i,
        /sewage.*treatment/i, /biofertilis/i, /biopesticide/i,
        /Lactobacillus/i, /yeast/i, /Penicillium/i, /Streptococcus/i,
        /cyclosporin/i, /statin/i, /biocontrol/i, /Bt.*toxin/i,
      ],
    },
  ],
  'Biotechnology': [
    {
      chapter: 'Biotechnology - Principles and Processes',
      patterns: [
        /restriction.*enzyme/i, /plasmid/i, /cloning.*vector/i,
        /recombinant.*DNA/i, /PCR|polymerase.*chain/i, /gel.*electrophor/i,
        /ligase/i, /transformation/i, /competent.*cell/i, /bioreactor/i,
        /upstream|downstream.*process/i, /origin.*replicat/i,
        /selectable.*marker/i, /EcoRI|BamHI|HindIII/i,
      ],
    },
    {
      chapter: 'Biotechnology and Its Applications',
      patterns: [
        /transgenic/i, /GMO|genetically.*modified/i, /Bt.*cotton/i,
        /golden.*rice/i, /gene.*therapy/i, /ELISA/i, /biopiracy/i,
        /patent/i, /bioethic/i, /RNA.*interfer|RNAi/i,
        /Cry.*protein/i, /Flavr.*Savr/i, /insulin.*recombinant/i,
      ],
    },
  ],
}

async function main() {
  let totalUpdated = 0
  let totalSkipped = 0

  for (const [topic, rules] of Object.entries(CHAPTER_RULES)) {
    // Fetch questions with this topic and NULL ncertChapterName
    const questions = await prisma.questions.findMany({
      where: {
        isOlympiad: false,
        isActive: true,
        isVerified: true,
        ncertChapterName: null,
        topic,
      },
      select: { id: true, question: true },
    })

    if (questions.length === 0) continue
    console.log(`\n${topic}: ${questions.length} questions to process`)

    let matched = 0
    let unmatched = 0

    for (const q of questions) {
      let assignedChapter: string | null = null

      for (const rule of rules) {
        for (const pattern of rule.patterns) {
          if (pattern.test(q.question)) {
            assignedChapter = rule.chapter
            break
          }
        }
        if (assignedChapter) break
      }

      if (assignedChapter) {
        await prisma.questions.update({
          where: { id: q.id },
          data: { ncertChapterName: assignedChapter },
        })
        matched++
      } else {
        unmatched++
      }
    }

    console.log(`  Matched: ${matched}, Unmatched: ${unmatched}`)
    totalUpdated += matched
    totalSkipped += unmatched
  }

  console.log(`\n=== SUMMARY ===`)
  console.log(`Total updated: ${totalUpdated}`)
  console.log(`Total skipped (no keyword match): ${totalSkipped}`)

  // Final count of remaining NULL
  const remaining = await prisma.questions.count({
    where: {
      isOlympiad: false,
      isActive: true,
      isVerified: true,
      ncertChapterName: null,
    },
  })
  console.log(`Remaining NULL ncertChapterName: ${remaining}`)

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
