#!/usr/bin/env tsx

import { TestService, QuestionService } from '@/lib/database'
import { TestTemplateCacheService, QuestionCacheService } from '@/lib/cache/redis'

async function warmCache() {
  console.log('🔥 Starting Cache Warming Process...\n')

  try {
    let cachedItems = 0

    // Warm popular test templates
    console.log('📝 Warming test templates cache...')
    const popularTests = await TestService.getPopularTests(20)
    for (const test of popularTests) {
      await TestTemplateCacheService.cacheTestTemplate(test)
      cachedItems++
    }
    console.log(`   ✅ Cached ${popularTests.length} popular test templates`)

    // Warm frequently accessed questions
    console.log('\n❓ Warming questions cache...')
    const topics = [
      'Cell Biology',
      'Molecular Biology',
      'Genetics',
      'Plant Physiology',
      'Human Physiology',
      'Ecology',
    ]

    for (const topic of topics) {
      const questions = await QuestionService.getQuestionsByTopic(
        topic,
        undefined,
        'NEET',
        'CLASS_12',
        1,
        10
      )
      for (const question of questions) {
        await QuestionCacheService.cacheQuestion(question)
        cachedItems++
      }
    }
    console.log(`   ✅ Cached questions for ${topics.length} topics`)

    // Warm test templates by category
    console.log('\n📚 Warming test templates by category...')
    const categories = ['TOPIC_WISE', 'FULL_SYLLABUS', 'PREVIOUS_YEAR']

    for (const category of categories) {
      const { templates } = await TestService.getTestTemplates({ category }, 1, 5)
      for (const template of templates) {
        await TestTemplateCacheService.cacheTestTemplate(template)
        cachedItems++
      }
    }
    console.log(`   ✅ Cached test templates for ${categories.length} categories`)

    // Warm random questions for common configurations
    console.log('\n🎲 Warming random questions cache...')
    const commonConfigs = [
      {
        count: 20,
        topics: ['Cell Biology'],
        difficulty: ['EASY'],
        curriculum: 'NEET',
        grade: 'CLASS_12',
      },
      {
        count: 20,
        topics: ['Genetics'],
        difficulty: ['MEDIUM'],
        curriculum: 'NEET',
        grade: 'CLASS_12',
      },
      {
        count: 20,
        topics: ['Human Physiology'],
        difficulty: ['HARD'],
        curriculum: 'NEET',
        grade: 'CLASS_12',
      },
    ]

    for (const config of commonConfigs) {
      const questions = await QuestionService.getRandomQuestions(config)
      await QuestionCacheService.cacheRandomQuestions(questions, config)
      cachedItems += questions.length
    }
    console.log(`   ✅ Cached random questions for ${commonConfigs.length} common configurations`)

    console.log(`\n🎉 Cache warming completed successfully!`)
    console.log(`   📊 Total items cached: ${cachedItems}`)
    console.log(`   ⚡ Cache is now ready for high-performance access`)
  } catch (error) {
    console.error('❌ Cache warming failed:', error)
    console.log('\n🔧 Please check:')
    console.log('   - Database connection')
    console.log('   - Redis server status')
    console.log('   - Data availability (run seed script if needed)')
    process.exit(1)
  }
}

// Run cache warming
warmCache().catch((error) => {
  console.error('Failed to warm cache:', error)
  process.exit(1)
})
