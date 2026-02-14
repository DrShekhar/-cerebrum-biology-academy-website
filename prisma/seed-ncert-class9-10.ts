/**
 * NCERT Biology Seed Data for Class 9 & 10
 * Foundation chapters for early NEET preparation
 * Chapter numbers match actual NCERT Science textbook numbering
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const ncertChaptersClass9And10 = [
  // ============= CLASS 9 =============
  {
    id: 'ncert-9-5',
    class: 9,
    unitNo: 1,
    unitName: 'Organisation in the Living World',
    chapterNo: 5,
    chapterName: 'The Fundamental Unit of Life',
    topics: [
      'Cell theory',
      'Cell structure',
      'Plasma membrane',
      'Cell wall',
      'Nucleus',
      'Cytoplasm',
      'Cell organelles',
    ],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-9-6',
    class: 9,
    unitNo: 1,
    unitName: 'Organisation in the Living World',
    chapterNo: 6,
    chapterName: 'Tissues',
    topics: [
      'Plant tissues',
      'Meristematic tissue',
      'Permanent tissue',
      'Animal tissues',
      'Epithelial',
      'Connective',
      'Muscular',
      'Nervous',
    ],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-9-7',
    class: 9,
    unitNo: 2,
    unitName: 'Diversity of Living Organisms',
    chapterNo: 7,
    chapterName: 'Diversity in Living Organisms',
    topics: [
      'Classification',
      'Five kingdom',
      'Monera',
      'Protista',
      'Fungi',
      'Plantae',
      'Animalia',
      'Nomenclature',
    ],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-9-13',
    class: 9,
    unitNo: 3,
    unitName: 'Health and Disease',
    chapterNo: 13,
    chapterName: 'Why Do We Fall Ill',
    topics: [
      'Health',
      'Disease',
      'Infectious diseases',
      'Immunity',
      'Vaccination',
      'Antibiotics',
    ],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.3,
  },
  {
    id: 'ncert-9-14',
    class: 9,
    unitNo: 4,
    unitName: 'Environment',
    chapterNo: 14,
    chapterName: 'Natural Resources',
    topics: [
      'Biogeochemical cycles',
      'Water cycle',
      'Carbon cycle',
      'Nitrogen cycle',
      'Oxygen cycle',
    ],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.3,
  },
  {
    id: 'ncert-9-15',
    class: 9,
    unitNo: 5,
    unitName: 'Food Production',
    chapterNo: 15,
    chapterName: 'Improvement in Food Resources',
    topics: [
      'Crop improvement',
      'Crop protection',
      'Animal husbandry',
      'Cattle farming',
      'Poultry farming',
      'Fish production',
      'Bee keeping',
    ],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.3,
  },
  // ============= CLASS 10 =============
  {
    id: 'ncert-10-6',
    class: 10,
    unitNo: 1,
    unitName: 'Life Processes',
    chapterNo: 6,
    chapterName: 'Life Processes',
    topics: [
      'Nutrition',
      'Autotrophic nutrition',
      'Heterotrophic nutrition',
      'Respiration',
      'Transportation',
      'Excretion',
    ],
    neetWeightage: 2,
    avgQuestionsPerYear: 1.0,
  },
  {
    id: 'ncert-10-7',
    class: 10,
    unitNo: 2,
    unitName: 'Control and Coordination',
    chapterNo: 7,
    chapterName: 'Control and Coordination',
    topics: [
      'Nervous system',
      'Reflex action',
      'Brain',
      'Spinal cord',
      'Hormones',
      'Plant hormones',
      'Endocrine glands',
    ],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-10-8',
    class: 10,
    unitNo: 3,
    unitName: 'Reproduction',
    chapterNo: 8,
    chapterName: 'How Do Organisms Reproduce',
    topics: [
      'Asexual reproduction',
      'Sexual reproduction',
      'Reproductive health',
      'Fission',
      'Budding',
      'Fragmentation',
      'Pollination',
    ],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-10-9',
    class: 10,
    unitNo: 4,
    unitName: 'Genetics and Evolution',
    chapterNo: 9,
    chapterName: 'Heredity and Evolution',
    topics: [
      'Mendel experiments',
      'Heredity',
      'Dominant',
      'Recessive',
      'Sex determination',
      'Evolution',
      'Speciation',
      'Fossils',
    ],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-10-15',
    class: 10,
    unitNo: 5,
    unitName: 'Environment',
    chapterNo: 15,
    chapterName: 'Our Environment',
    topics: [
      'Ecosystem',
      'Food chains',
      'Food webs',
      'Ozone layer',
      'Biodegradable',
      'Non-biodegradable',
    ],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.3,
  },
  {
    id: 'ncert-10-16',
    class: 10,
    unitNo: 5,
    unitName: 'Environment',
    chapterNo: 16,
    chapterName: 'Sustainable Management of Natural Resources',
    topics: [
      'Conservation',
      'Three Rs',
      'Forests',
      'Water harvesting',
      'Coal',
      'Petroleum',
      'Natural gas',
    ],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.3,
  },
]

async function main() {
  console.log('Seeding NCERT Class 9 & 10 chapters...')

  for (const chapter of ncertChaptersClass9And10) {
    await prisma.ncert_chapters.upsert({
      where: {
        class_chapterNo: {
          class: chapter.class,
          chapterNo: chapter.chapterNo,
        },
      },
      update: {
        unitNo: chapter.unitNo,
        unitName: chapter.unitName,
        chapterName: chapter.chapterName,
        topics: chapter.topics,
        neetWeightage: chapter.neetWeightage,
        avgQuestionsPerYear: chapter.avgQuestionsPerYear,
      },
      create: {
        id: chapter.id,
        class: chapter.class,
        unitNo: chapter.unitNo,
        unitName: chapter.unitName,
        chapterNo: chapter.chapterNo,
        chapterName: chapter.chapterName,
        topics: chapter.topics,
        neetWeightage: chapter.neetWeightage,
        avgQuestionsPerYear: chapter.avgQuestionsPerYear,
      },
    })
    console.log(`  Seeded: Class ${chapter.class} - Ch${chapter.chapterNo}: ${chapter.chapterName}`)
  }

  console.log(`Done! Seeded ${ncertChaptersClass9And10.length} chapters.`)
}

main()
  .catch((e) => {
    console.error('Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
