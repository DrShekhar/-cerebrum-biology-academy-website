/**
 * Migration Script: Add Trial Data to Existing FreeUsers
 *
 * This script migrates existing FreeUser records that don't have trial data.
 * It sets up trial start/expiry dates based on their registration date.
 *
 * Usage:
 * npx ts-node scripts/migrate-existing-free-users.ts
 *
 * Or with dry-run mode:
 * npx ts-node scripts/migrate-existing-free-users.ts --dry-run
 */

import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

const TRIAL_DURATION_DAYS = 15
const isDryRun = process.argv.includes('--dry-run')

interface MigrationStats {
  totalUsers: number
  migratedUsers: number
  skippedUsers: number
  errorUsers: number
  errors: Array<{ userId: string; error: string }>
}

async function migrateExistingFreeUsers() {
  console.log('🚀 Starting FreeUser Trial Migration...\n')
  console.log(
    `Mode: ${isDryRun ? '🔍 DRY RUN (no changes will be made)' : '✍️  LIVE (changes will be applied)'}\n`
  )

  const stats: MigrationStats = {
    totalUsers: 0,
    migratedUsers: 0,
    skippedUsers: 0,
    errorUsers: 0,
    errors: [],
  }

  try {
    // Find all FreeUsers
    const allUsers = await prisma.freeUser.findMany({
      select: {
        id: true,
        email: true,
        registrationDate: true,
        trialStartDate: true,
        trialExpiryDate: true,
        testsTakenCount: true,
      },
    })

    stats.totalUsers = allUsers.length
    console.log(`📊 Found ${stats.totalUsers} total FreeUsers\n`)

    // Process each user
    for (const user of allUsers) {
      try {
        // Skip users who already have trial data
        if (user.trialStartDate && user.trialExpiryDate) {
          stats.skippedUsers++
          console.log(`⏭️  Skipping ${user.email} - already has trial data`)
          continue
        }

        // Calculate trial dates
        const startDate = user.registrationDate
        const expiryDate = new Date(startDate)
        expiryDate.setDate(expiryDate.getDate() + TRIAL_DURATION_DAYS)

        // Check if trial is expired
        const now = new Date()
        const isExpired = now > expiryDate
        const daysRemaining = Math.max(
          0,
          Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        )

        console.log(`\n👤 Processing ${user.email}:`)
        console.log(`   📅 Registration: ${startDate.toISOString()}`)
        console.log(`   📅 Trial Start: ${startDate.toISOString()}`)
        console.log(`   📅 Trial Expiry: ${expiryDate.toISOString()}`)
        console.log(`   ⏰ Days Remaining: ${daysRemaining}`)
        console.log(`   ${isExpired ? '❌ Expired' : '✅ Active'}`)

        if (!isDryRun) {
          // Update the user with trial data
          await prisma.freeUser.update({
            where: { id: user.id },
            data: {
              trialStartDate: startDate,
              trialExpiryDate: expiryDate,
              isTrialExpired: isExpired,
              lastTrialCheck: now,
              testsTakenCount: user.testsTakenCount || 0,
            },
          })

          console.log(`   ✅ Migrated successfully`)
        } else {
          console.log(`   🔍 Would migrate (dry-run mode)`)
        }

        stats.migratedUsers++
      } catch (error) {
        stats.errorUsers++
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        stats.errors.push({ userId: user.id, error: errorMessage })
        console.error(`   ❌ Error: ${errorMessage}`)
      }
    }

    // Print summary
    console.log('\n' + '='.repeat(60))
    console.log('📈 MIGRATION SUMMARY')
    console.log('='.repeat(60))
    console.log(`Total Users:        ${stats.totalUsers}`)
    console.log(`Migrated:           ${stats.migratedUsers} ✅`)
    console.log(`Skipped:            ${stats.skippedUsers} ⏭️`)
    console.log(`Errors:             ${stats.errorUsers} ❌`)

    if (stats.errors.length > 0) {
      console.log('\n⚠️  ERRORS:')
      stats.errors.forEach((err) => {
        console.log(`   User ID: ${err.userId}`)
        console.log(`   Error: ${err.error}\n`)
      })
    }

    if (isDryRun) {
      console.log('\n🔍 DRY RUN COMPLETE - No changes were made')
      console.log('Run without --dry-run flag to apply changes')
    } else {
      console.log('\n✅ MIGRATION COMPLETE')
    }
  } catch (error) {
    console.error('\n❌ Fatal error during migration:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Verify Prisma connection before starting
async function verifyConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connection established\n')
  } catch (error) {
    console.error('❌ Failed to connect to database:', error)
    process.exit(1)
  }
}

// Main execution
async function main() {
  await verifyConnection()
  await migrateExistingFreeUsers()
}

main()
  .catch((error) => {
    console.error('Migration failed:', error)
    process.exit(1)
  })
  .finally(() => {
    console.log('\n👋 Migration script finished')
  })
