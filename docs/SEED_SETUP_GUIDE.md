# Database Seed Setup Guide

## Quick Start

Follow these steps to set up your database with course data needed for the purchase flow.

### Step 1: Ensure Database is Running

Make sure your PostgreSQL database is running and accessible.

```bash
# Check if PostgreSQL is running
pg_isready

# Or start PostgreSQL (macOS with Homebrew)
brew services start postgresql
```

### Step 2: Verify Environment Variables

Ensure your `.env` file has the correct database connection strings:

```env
# Database URLs
DATABASE_URL="postgresql://username:password@localhost:5432/cerebrum_db?connection_limit=10&pool_timeout=20"
DIRECT_DATABASE_URL="postgresql://username:password@localhost:5432/cerebrum_db"
```

### Step 3: Generate Prisma Client

```bash
npm run db:generate
```

This generates the Prisma client to `/src/generated/prisma`.

### Step 4: Run Migrations

```bash
npm run db:migrate
```

This creates all database tables according to the schema.

### Step 5: Execute Seed Script

```bash
npm run db:seed
```

Expected output:

```
🌱 Starting database seeding...
📚 Creating courses...
   ✓ Created course: Class 11th Biology - Complete NEET Foundation
   ✓ Created course: Class 12th Biology - Intensive NEET Preparation
   ✓ Created course: NEET Dropper Year Program
📚 Creating question banks...
❓ Creating sample questions...
   ✓ Created question: ...
📝 Creating test templates...
   ✓ Created test template: NEET Biology Full Test - Cell Biology & Genetics
   ✓ Created test template: Plant Physiology Quick Test
   ✓ Created test template: Adaptive Biology Assessment
👥 Creating sample free users...
   ✓ Created free user: Aarav Sharma
   ✓ Created free user: Priya Patel
   ✓ Created free user: Rohit Kumar
📈 Creating user progress data...
🎯 Creating sample test sessions...
✅ Database seeding completed successfully!

📊 Seeding Summary:
   - Courses: 3 (class-11, class-12, neet-dropper)
   - Question Banks: 2
   - Questions: [count]
   - Test Templates: 3
   - Free Users: 3
   - User Progress Records: 18
   - Test Sessions: 5

💰 Course Pricing (Full Year):
   - Class 11: ₹35,000
   - Class 12: ₹50,000
   - NEET Dropper: ₹72,000
```

### Step 6: Verify Data

#### Option A: Using Prisma Studio (GUI)

```bash
npm run db:studio
```

Navigate to the `courses` table and verify:

- `class-11` exists
- `class-12` exists
- `neet-dropper` exists

#### Option B: Using SQL Queries

```bash
# Connect to database
psql -U username -d cerebrum_db

# Run verification query
SELECT id, name, "totalFees" / 100 as price_inr FROM courses;
```

Expected output:

```
     id      |                    name                           | price_inr
-------------+---------------------------------------------------+-----------
 class-11    | Class 11th Biology - Complete NEET Foundation    | 35000
 class-12    | Class 12th Biology - Intensive NEET Preparation  | 50000
 neet-dropper| NEET Dropper Year Program                         | 72000
```

#### Option C: Using Verification Script

```bash
# Copy the SQL from prisma/verify-seed.sql and run it
psql -U username -d cerebrum_db -f prisma/verify-seed.sql
```

## Common Issues & Solutions

### Issue 1: "Cannot find module '@/generated/prisma'"

**Solution:**

```bash
npm run db:generate
```

Make sure the Prisma schema has the correct output path.

### Issue 2: "Unique constraint failed on id"

This means courses already exist in the database.

**Solution A - Reset and Reseed:**

```bash
npm run db:migrate:reset
```

**Solution B - Manual Cleanup:**

```bash
# Connect to database
psql -U username -d cerebrum_db

# Delete existing courses
DELETE FROM enrollments;
DELETE FROM courses;

# Then run seed again
npm run db:seed
```

### Issue 3: Migration Files Out of Sync

**Solution:**

```bash
# Reset migrations (WARNING: Deletes all data)
npm run db:migrate:reset

# Or create a new migration
npm run db:migrate:dev
```

### Issue 4: Connection Timeout

**Solution:**

Check if PostgreSQL is running and connection string is correct.

```bash
# Test connection
psql "postgresql://username:password@localhost:5432/cerebrum_db"
```

## Testing the Purchase Flow

After seeding, test the purchase flow:

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Navigate to a course purchase page:
   - http://localhost:3000/purchase/class-11
   - http://localhost:3000/purchase/class-12
   - http://localhost:3000/purchase/neet-dropper

3. Verify:
   - Course details display correctly
   - Pricing plans show up
   - Purchase flow doesn't error on "Course not found"

## Development Workflow

### Daily Development

```bash
# Start with fresh data each day (optional)
NODE_ENV=development npm run db:seed

# This will clear and reseed data
```

### Production Deployment

```bash
# On production, only seed once
npm run db:migrate
npm run db:seed
```

**Important:** Never run seed in production after initial setup unless you want to reset data.

## Next Steps

1. ✅ Verify all 3 courses exist
2. ✅ Test purchase flow for each course
3. ✅ Create test enrollment
4. ✅ Verify payment integration
5. ✅ Test with real users

## Additional Resources

- Full seed documentation: `prisma/SEED_README.md`
- Verification queries: `prisma/verify-seed.sql`
- Schema reference: `prisma/schema.prisma`
- Purchase page: `src/app/purchase/[courseId]/page.tsx`

## Support

If you encounter issues:

1. Check the Prisma documentation: https://www.prisma.io/docs
2. Review the seed script: `prisma/seed.ts`
3. Check database logs for errors
4. Verify environment variables are set correctly
