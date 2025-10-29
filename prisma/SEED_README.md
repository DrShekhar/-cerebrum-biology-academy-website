# Database Seed Script Documentation

## Overview

This seed script populates the Cerebrum Biology Academy database with essential data for the purchase flow, test generator system, and course management.

## Prerequisites

1. PostgreSQL database must be running
2. Environment variables configured in `.env`:
   - `DATABASE_URL` - Connection string with pooling
   - `DIRECT_DATABASE_URL` - Direct connection for migrations

## Quick Start

### 1. Generate Prisma Client

```bash
npm run db:generate
# or
npx prisma generate
```

### 2. Run Database Migrations

```bash
npm run db:migrate
# or
npx prisma migrate deploy
```

### 3. Execute Seed Script

```bash
npm run db:seed
# or
npx tsx prisma/seed.ts
```

## What Gets Seeded

### Courses (3 courses)

1. **class-11** - Class 11th Biology - Complete NEET Foundation
   - Duration: 12 months
   - Full Year Price: ₹35,000
   - Monthly: ₹3,500
   - Quarterly: ₹9,999
   - Features: Video lectures, doubt solving, tests, study materials

2. **class-12** - Class 12th Biology - Intensive NEET Preparation
   - Duration: 12 months
   - Full Year Price: ₹50,000
   - Monthly: ₹5,000
   - Quarterly: ₹14,499
   - Features: Advanced preparation, crash courses, exam strategy

3. **neet-dropper** - NEET Dropper Year Program
   - Duration: 12 months
   - Full Year Price: ₹72,000
   - Pursuit tier pricing
   - Features: Intensive revision, rank improvement strategy, advanced problem-solving

### Question Banks (2 banks)

- NEET Biology Previous Year Questions (2020-2024)
- CBSE Biology Board Questions (Class 11 & 12)

### Questions

Multiple biology questions covering:

- Cell Biology
- Genetics & Molecular Biology
- Plant Physiology
- Human Physiology
- Ecology
- And more...

### Test Templates (3 templates)

1. NEET Biology Full Test - Cell Biology & Genetics
2. Plant Physiology Quick Test
3. Adaptive Biology Assessment

### Sample Data

- 3 Free Users with progress data
- 5 Test Sessions
- User Progress records for all topics

## Verification Queries

### Check Courses

```sql
-- View all courses
SELECT id, name, "totalFees" / 100 as price_inr, duration, "isActive"
FROM courses
ORDER BY "sortOrder";

-- Expected output:
-- id             | name                                          | price_inr | duration | isActive
-- class-11       | Class 11th Biology - Complete NEET Foundation | 35000     | 12       | true
-- class-12       | Class 12th Biology - Intensive NEET Prep      | 50000     | 12       | true
-- neet-dropper   | NEET Dropper Year Program                     | 72000     | 12       | true
```

### Check Course Details

```sql
-- Get detailed course information
SELECT
  id,
  name,
  description,
  type,
  class,
  duration,
  "totalFees" / 100 as price_inr,
  "isActive"
FROM courses
WHERE id = 'neet-dropper';
```

### Verify Purchase Flow Data

```sql
-- Check if all course IDs from purchase page exist
SELECT
  CASE
    WHEN EXISTS (SELECT 1 FROM courses WHERE id = 'class-11') THEN '✓'
    ELSE '✗'
  END as "class-11",
  CASE
    WHEN EXISTS (SELECT 1 FROM courses WHERE id = 'class-12') THEN '✓'
    ELSE '✗'
  END as "class-12",
  CASE
    WHEN EXISTS (SELECT 1 FROM courses WHERE id = 'neet-dropper') THEN '✓'
    ELSE '✗'
  END as "neet-dropper";
```

### Check Question Banks

```sql
-- View question bank summary
SELECT
  name,
  category,
  curriculum,
  grade,
  "totalQuestions",
  "activeQuestions",
  "isActive"
FROM question_banks;
```

### Check Questions

```sql
-- Count questions by topic
SELECT
  topic,
  difficulty,
  COUNT(*) as question_count
FROM questions
WHERE "isActive" = true
GROUP BY topic, difficulty
ORDER BY topic, difficulty;
```

### Check Test Templates

```sql
-- View test templates
SELECT
  title,
  type,
  difficulty,
  "totalQuestions",
  "totalMarks",
  "timeLimit",
  "isPublished"
FROM test_templates
WHERE "isActive" = true;
```

## Testing the Purchase Flow

### 1. Test Course Lookup

```sql
-- Verify course exists for purchase
SELECT id, name, "totalFees" / 100 as price
FROM courses
WHERE id = 'class-11' AND "isActive" = true;
```

### 2. Simulate Enrollment Creation

```sql
-- Check if course can be enrolled
SELECT
  c.id,
  c.name,
  c."totalFees",
  c.duration,
  c."isActive"
FROM courses c
WHERE c.id IN ('class-11', 'class-12', 'neet-dropper')
  AND c."isActive" = true;
```

## Database Reset (Development Only)

### Reset and Reseed Database

```bash
# WARNING: This will delete all data!
npm run db:migrate:reset
# or
npx prisma migrate reset
```

This will:

1. Drop the database
2. Recreate it
3. Run all migrations
4. Execute the seed script

### Clean Reseed Without Migration Reset

```bash
# Run seed script with NODE_ENV=development to clear existing data
NODE_ENV=development npm run db:seed
```

## Troubleshooting

### Error: Course ID already exists

If you see duplicate key errors:

```bash
# Option 1: Delete existing courses manually
npx prisma studio
# Navigate to courses table and delete records

# Option 2: Reset database completely
npm run db:migrate:reset
```

### Error: Prisma Client not generated

```bash
npm run db:generate
npm run db:seed
```

### Error: Cannot find module '@/generated/prisma'

The Prisma client is generated to `src/generated/prisma`. Ensure:

1. `prisma/schema.prisma` has the correct output path:

   ```prisma
   generator client {
     provider = "prisma-client-js"
     output   = "../src/generated/prisma"
   }
   ```

2. Run `npm run db:generate`

## Course Pricing Structure

All prices are stored in **paise** (₹1 = 100 paise) in the database.

| Course ID    | Full Year (₹) | Monthly (₹) | Quarterly (₹) |
| ------------ | ------------- | ----------- | ------------- |
| class-11     | 35,000        | 3,500       | 9,999         |
| class-12     | 50,000        | 5,000       | 14,499        |
| neet-dropper | 72,000        | -           | -             |

## Integration with Purchase Page

The purchase page at `/src/app/purchase/[courseId]/page.tsx` references these course IDs:

- `class-11` → Class 11th Biology course
- `class-12` → Class 12th Biology course
- `neet-dropper` → NEET Dropper Program (if implemented)

All pricing in the purchase page should match the `totalFees` in the database for consistency.

## Next Steps After Seeding

1. **Verify Data**: Run the verification queries above
2. **Test Purchase Flow**: Try purchasing a course through the UI
3. **Check Enrollments**: Verify enrollment creation works
4. **Test Payment Integration**: Ensure Razorpay integration works with seeded courses

## Support

For issues or questions:

- Check the main README.md
- Review the Prisma schema at `prisma/schema.prisma`
- Inspect the seed script at `prisma/seed.ts`
