/**
 * NCERT Biology Seed Data for Class 9 & 10
 * Foundation chapters for early NEET preparation
 */

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const ncertChaptersClass9And10 = [
  // ============= CLASS 9 =============
  {
    id: 'ncert-9-1',
    class: 9,
    unitNo: 1,
    unitName: 'Organisation in the Living World',
    chapterNo: 1,
    chapterName: 'The Fundamental Unit of Life',
    topics: ['Cell Theory', 'Plasma Membrane', 'Cell Organelles', 'Nucleus', 'Prokaryotic vs Eukaryotic'],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-9-2',
    class: 9,
    unitNo: 1,
    unitName: 'Organisation in the Living World',
    chapterNo: 2,
    chapterName: 'Tissues',
    topics: ['Plant Tissues', 'Animal Tissues', 'Meristematic Tissue', 'Permanent Tissue', 'Epithelial Tissue', 'Connective Tissue'],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-9-3',
    class: 9,
    unitNo: 2,
    unitName: 'Diversity of Living Organisms',
    chapterNo: 3,
    chapterName: 'Diversity in Living Organisms',
    topics: ['Classification', 'Five Kingdom', 'Monera', 'Protista', 'Fungi', 'Plantae', 'Animalia'],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-9-4',
    class: 9,
    unitNo: 3,
    unitName: 'Health and Diseases',
    chapterNo: 4,
    chapterName: 'Why Do We Fall Ill',
    topics: ['Health', 'Disease', 'Infectious Diseases', 'Immunity', 'Prevention'],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.3,
  },
  {
    id: 'ncert-9-5',
    class: 9,
    unitNo: 4,
    unitName: 'Natural Resources',
    chapterNo: 5,
    chapterName: 'Natural Resources',
    topics: ['Air', 'Water', 'Soil', 'Biogeochemical Cycles', 'Ozone Layer'],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.3,
  },
  {
    id: 'ncert-9-6',
    class: 9,
    unitNo: 5,
    unitName: 'Food Production',
    chapterNo: 6,
    chapterName: 'Improvement in Food Resources',
    topics: ['Crop Improvement', 'Animal Husbandry', 'Bee Keeping', 'Fishery', 'Green Revolution'],
    neetWeightage: 1,
    avgQuestionsPerYear: 0.3,
  },
  // ============= CLASS 10 =============
  {
    id: 'ncert-10-1',
    class: 10,
    unitNo: 1,
    unitName: 'Life Processes',
    chapterNo: 1,
    chapterName: 'Life Processes',
    topics: ['Nutrition', 'Respiration', 'Transportation', 'Excretion', 'Photosynthesis', 'Human Digestive System'],
    neetWeightage: 3,
    avgQuestionsPerYear: 1.0,
  },
  {
    id: 'ncert-10-2',
    class: 10,
    unitNo: 2,
    unitName: 'Control and Coordination',
    chapterNo: 2,
    chapterName: 'Control and Coordination',
    topics: ['Nervous System', 'Reflex Action', 'Brain', 'Hormones', 'Plant Hormones', 'Tropic Movements'],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-10-3',
    class: 10,
    unitNo: 3,
    unitName: 'Reproduction',
    chapterNo: 3,
    chapterName: 'How Do Organisms Reproduce',
    topics: ['Asexual Reproduction', 'Sexual Reproduction', 'Reproductive System', 'Pollination', 'Fertilisation'],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-10-4',
    class: 10,
    unitNo: 4,
    unitName: 'Heredity and Evolution',
    chapterNo: 4,
    chapterName: 'Heredity and Evolution',
    topics: ['Mendel Laws', 'Heredity', 'Evolution', 'Speciation', 'Homologous Organs', 'Analogous Organs'],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-10-5',
    class: 10,
    unitNo: 5,
    unitName: 'Environment',
    chapterNo: 5,
    chapterName: 'Our Environment',
    topics: ['Ecosystem', 'Food Chain', 'Food Web', 'Ozone Depletion', 'Biodegradable', 'Non-biodegradable'],
    neetWeightage: 2,
    avgQuestionsPerYear: 0.5,
  },
  {
    id: 'ncert-10-6',
    class: 10,
    unitNo: 5,
    unitName: 'Environment',
    chapterNo: 6,
    chapterName: 'Sustainable Management of Natural Resources',
    topics: ['Conservation', 'Forests', 'Wildlife', 'Water Harvesting', 'Coal', 'Petroleum'],
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
