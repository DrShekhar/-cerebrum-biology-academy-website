/**
 * Quick Authentication Test Script
 * Tests if admin and counselor credentials work
 * Run with: node test-auth.js
 */

const bcrypt = require('bcryptjs')

// Credentials from database
const accounts = [
  {
    email: 'admin@cerebrumbiologyacademy.com',
    name: 'Admin User',
    role: 'ADMIN',
    password: 'admin123',
    hash: '$2b$12$IbC2f2coL062v4I5VSG57Od7e3gmUpJkgC3i4jmwxfIGqGRdOafVC',
  },
  {
    email: 'counselor@cerebrumacademy.com',
    name: 'Demo Counselor',
    role: 'COUNSELOR',
    password: 'demo123456',
    hash: '$2b$10$owUwe40Tuk/SlpXkL1eZv.NFgza/zSy4dUzcOBOd1996IDWWQvj2y',
  },
]

console.log('🔐 Testing Authentication Credentials\n')
console.log('='.repeat(60))

accounts.forEach((account) => {
  bcrypt.compare(account.password, account.hash).then((isValid) => {
    if (isValid) {
      console.log(`\n✅ ${account.role} Account Valid:`)
      console.log(`   📧 Email: ${account.email}`)
      console.log(`   🔑 Password: ${account.password}`)
      console.log(`   👤 Name: ${account.name}`)
    } else {
      console.log(`\n❌ ${account.role} Account Failed`)
    }
  })
})

setTimeout(() => {
  console.log('\n' + '='.repeat(60))
  console.log('\n🌐 Access URLs:')
  console.log('   • Admin Login:     http://localhost:3000/admin/login')
  console.log('   • Counselor Login: http://localhost:3000/counselor/login')
  console.log('   • Admin Panel:     http://localhost:3000/admin')
  console.log('   • Counselor CRM:   http://localhost:3000/counselor')
  console.log('\n💡 Note: Both login pages redirect to WhatsApp auth')
  console.log('   You need to use NextAuth API directly or modify login pages\n')
}, 500)
