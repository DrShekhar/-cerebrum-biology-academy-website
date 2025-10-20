#!/usr/bin/env tsx

import { healthCheck } from '@/lib/database'
import { CacheHealthService } from '@/lib/cache/redis'

async function runHealthCheck() {
  console.log('🏥 Starting Cerebrum Biology Academy Health Check...\n')

  try {
    // Check database and services
    const dbHealth = await healthCheck()

    // Check Redis cache
    const cacheHealth = await CacheHealthService.checkHealth()

    // Check cache statistics
    const cacheStats = await CacheHealthService.getCacheStats()

    console.log('📊 Health Check Results:')
    console.log('========================\n')

    // Database Health
    console.log('🗄️  Database Status:', dbHealth.database ? '✅ Healthy' : '❌ Unhealthy')
    console.log('   - User Service:', dbHealth.services.userService ? '✅' : '❌')
    console.log('   - Test Service:', dbHealth.services.testService ? '✅' : '❌')
    console.log('   - Question Service:', dbHealth.services.questionService ? '✅' : '❌')
    console.log('   - Analytics Service:', dbHealth.services.analyticsService ? '✅' : '❌')

    // Cache Health
    console.log('\n💾 Cache Status:', cacheHealth.status === 'healthy' ? '✅ Healthy' : '❌ Unhealthy')
    console.log(`   - Latency: ${cacheHealth.latency}ms`)
    if (cacheHealth.memory) {
      console.log(`   - Memory Usage: Available`)
    }

    // Overall Status
    const overallHealthy = dbHealth.database &&
                          cacheHealth.status === 'healthy' &&
                          Object.values(dbHealth.services).every(status => status)

    console.log('\n🎯 Overall System Status:', overallHealthy ? '✅ All Systems Operational' : '⚠️  Issues Detected')

    if (!overallHealthy) {
      console.log('\n🔧 Troubleshooting:')

      if (!dbHealth.database) {
        console.log('   - Check PostgreSQL connection and credentials')
        console.log('   - Verify DATABASE_URL environment variable')
      }

      if (cacheHealth.status !== 'healthy') {
        console.log('   - Check Redis server status')
        console.log('   - Verify REDIS_HOST and REDIS_PORT environment variables')
      }

      if (!dbHealth.services.userService) {
        console.log('   - User service may have configuration issues')
      }

      if (!dbHealth.services.testService) {
        console.log('   - Test service may have dependency issues')
      }
    }

    console.log('\n📈 Performance Metrics:')
    console.log('=======================')

    if (cacheHealth.latency < 10) {
      console.log('   Cache Latency: 🟢 Excellent (<10ms)')
    } else if (cacheHealth.latency < 50) {
      console.log('   Cache Latency: 🟡 Good (<50ms)')
    } else {
      console.log('   Cache Latency: 🔴 Poor (>50ms)')
    }

    process.exit(overallHealthy ? 0 : 1)

  } catch (error) {
    console.error('❌ Health check failed:', error)
    console.log('\n🔧 Please check:')
    console.log('   - Database connection settings')
    console.log('   - Redis server status')
    console.log('   - Environment variables configuration')
    process.exit(1)
  }
}

// Run the health check
runHealthCheck().catch(error => {
  console.error('Failed to run health check:', error)
  process.exit(1)
})