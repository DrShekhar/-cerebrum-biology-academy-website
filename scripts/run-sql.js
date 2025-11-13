const { Client } = require('pg')
const fs = require('fs')

async function main() {
  const dbUrl = process.env.DIRECT_DATABASE_URL

  if (!dbUrl) {
    console.error('❌ DIRECT_DATABASE_URL not found')
    process.exit(1)
  }

  const client = new Client({ connectionString: dbUrl })

  try {
    await client.connect()
    console.log('✅ Connected to database')

    const sql = fs.readFileSync('./scripts/create-admin.sql', 'utf8')
    console.log('📄 Executing SQL...')

    const result = await client.query(sql)
    console.log('✅ Admin user created successfully!')
    console.log('\n📋 Login Credentials:')
    console.log('   Email: admin@cerebrumbiologyacademy.com')
    console.log('   Password: admin123')
    console.log('\n🔗 Login at: http://localhost:3000/auth/signin')
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await client.end()
  }
}

main()
