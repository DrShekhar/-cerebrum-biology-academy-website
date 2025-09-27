# 🔧 Manual Supabase Setup Instructions

## Step 1: Update Your .env.local

1. Open your `.env.local` file
2. Find the line that says: `DATABASE_URL="file:./prisma/dev.db"`
3. Replace it with your Supabase connection string:

```bash
DATABASE_URL="postgresql://postgres:Tv6C*Vjtf7L@vcs@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
```

**Replace `[YOUR-PROJECT-REF]` with your actual Supabase project reference from your dashboard.**

## Step 2: Install Dependencies & Generate Client

```bash
npm install
npx prisma generate
```

## Step 3: Push Schema to Database

```bash
npx prisma db push
```

## Step 4: Verify Database

```bash
node verify-database.js
```

## Step 5: Test Your Application

```bash
npm run dev
```

Your application should now be connected to Supabase PostgreSQL database!

## 🔍 Troubleshooting

If you get connection errors:

1. Check your Supabase project is running
2. Verify the connection string is correct
3. Ensure your IP is allowed (Supabase allows all by default)
4. Check for typos in the password

## ✅ Success Indicators

When successful, you should see:

- ✅ Prisma client generated
- ✅ Database schema pushed
- ✅ All tables created
- ✅ Connection test passed
