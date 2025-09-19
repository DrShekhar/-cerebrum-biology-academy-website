#!/usr/bin/env node

// Database Health Check - Constitutional Performance Standards
// Silicon Valley level monitoring for educational excellence

import { PrismaClient } from '../src/generated/prisma/index.js'

const prisma = new PrismaClient()

async function healthCheck() {
  console.log('🏥 Database Health Check - Harvard Medical School Standards')
  console.log('='.repeat(60))

  try {
    // Connection test
    const startTime = Date.now()
    await prisma.$queryRaw`SELECT 1`
    const connectionTime = Date.now() - startTime

    console.log(`✅ Database Connection: ${connectionTime}ms`)

    // Performance checks
    const userCount = await prisma.user.count()
    const enrollmentCount = await prisma.enrollment.count()
    const testAttemptCount = await prisma.testAttempt.count()

    console.log(`📊 Platform Statistics:`)
    console.log(`   Users: ${userCount.toLocaleString()}`)
    console.log(`   Enrollments: ${enrollmentCount.toLocaleString()}`)
    console.log(`   Test Attempts: ${testAttemptCount.toLocaleString()}`)

    // Performance thresholds (Constitutional standards)
    if (connectionTime < 100) {
      console.log('🏆 Performance: Excellent (Harvard standard)')
    } else if (connectionTime < 500) {
      console.log('✅ Performance: Good')
    } else {
      console.log('⚠️  Performance: Needs optimization')
    }

    // Check recent activity
    const recentUsers = await prisma.user.count({
      where: {
        lastActiveAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
    })

    console.log(`👥 Active Users (24h): ${recentUsers}`)

    // Educational metrics
    const completedTests = await prisma.testAttempt.count({
      where: {
        status: 'COMPLETED',
      },
    })

    console.log(`🎯 Completed Tests: ${completedTests.toLocaleString()}`)
  } catch (error) {
    console.error('❌ Database Health Check Failed:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

healthCheck()
