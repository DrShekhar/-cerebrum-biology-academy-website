#!/bin/bash

# 🗄️ Supabase Database Setup Script for Cerebrum Biology Academy

echo "🚀 Setting up Supabase Database for Production..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if .env.local exists
if [ ! -f .env.local ]; then
    print_error ".env.local file not found!"
    exit 1
fi

print_warning "BEFORE RUNNING THIS SCRIPT:"
echo "1. Create your Supabase project at https://supabase.com"
echo "2. Go to Project Settings → Database"
echo "3. Copy the Connection String (URI format)"
echo "4. It should look like: postgresql://postgres:[password]@[host]:5432/postgres"
echo ""

# Prompt for database URL
read -p "📋 Paste your Supabase CONNECTION STRING here: " DATABASE_URL

if [ -z "$DATABASE_URL" ]; then
    print_error "Database URL cannot be empty!"
    exit 1
fi

# Validate the database URL format
if [[ ! $DATABASE_URL =~ ^postgresql:// ]]; then
    print_error "Invalid PostgreSQL connection string! Should start with 'postgresql://'"
    exit 1
fi

print_success "Valid PostgreSQL connection string detected"

# Update .env.local with new database URL
echo ""
echo "🔄 Updating .env.local with production database..."

# Backup existing .env.local
cp .env.local .env.local.backup
print_success "Backup created: .env.local.backup"

# Update the DATABASE_URL in .env.local
if grep -q "DATABASE_URL=" .env.local; then
    # Replace existing DATABASE_URL
    sed -i.tmp "s|DATABASE_URL=.*|DATABASE_URL=\"$DATABASE_URL\"|" .env.local
    rm .env.local.tmp
    print_success "Updated existing DATABASE_URL in .env.local"
else
    # Add DATABASE_URL if it doesn't exist
    echo "DATABASE_URL=\"$DATABASE_URL\"" >> .env.local
    print_success "Added DATABASE_URL to .env.local"
fi

echo ""
echo "🔄 Installing dependencies and generating Prisma client..."

# Install dependencies
npm install

# Generate Prisma client for PostgreSQL
npx prisma generate

print_success "Prisma client generated for PostgreSQL"

echo ""
echo "🗄️ Creating database schema..."

# Push schema to database (creates tables)
npx prisma db push

if [ $? -eq 0 ]; then
    print_success "Database schema created successfully!"
else
    print_error "Failed to create database schema"
    print_warning "Check your connection string and try again"
    exit 1
fi

echo ""
echo "🧪 Testing database connection..."

# Test database connection
node -e "
const { PrismaClient } = require('./src/generated/prisma');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.\$connect();
    console.log('✅ Database connection successful!');

    // Test a simple query
    const result = await prisma.\$queryRaw\`SELECT 1 as test\`;
    console.log('✅ Database query test passed!');

    await prisma.\$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();
"

if [ $? -eq 0 ]; then
    print_success "Database connection test passed!"
else
    print_error "Database connection test failed"
    exit 1
fi

echo ""
echo "🎉 SUPABASE SETUP COMPLETE!"
echo ""
echo "📊 Next Steps:"
echo "1. Your database is now ready for production"
echo "2. Schema has been created with all tables"
echo "3. Run 'npm run dev' to test locally"
echo "4. Deploy to Vercel with this DATABASE_URL"
echo ""
print_success "Your Cerebrum Biology Academy platform is database-ready!"
echo ""
echo "💰 Revenue Features Now Available:"
echo "   ✅ Student enrollment tracking"
echo "   ✅ Demo booking storage"
echo "   ✅ Lead capture system"
echo "   ✅ Payment transaction logs"
echo "   ✅ Course analytics"
echo ""
print_warning "Remember to add this DATABASE_URL to your Vercel environment variables!"