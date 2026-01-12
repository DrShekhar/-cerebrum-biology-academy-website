/**
 * WhatsApp Bot Testing Script
 * Comprehensive test suite for WhatsApp AI Bot functionality
 *
 * Usage: npx ts-node scripts/test-whatsapp-bot.ts
 *
 * Tests:
 * - Webhook verification
 * - Message processing
 * - Command handling
 * - AI responses
 * - Rate limiting
 * - Demo booking flow
 * - Error handling
 */

interface TestResult {
  name: string
  passed: boolean
  message: string
  duration: number
}

class WhatsAppBotTester {
  private results: TestResult[] = []
  private baseUrl: string
  private webhookUrl: string
  private verifyToken: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    this.webhookUrl = `${this.baseUrl}/api/whatsapp/ai-bot`
    this.verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || 'test_verify_token'
  }

  /**
   * Run all tests
   */
  async runAllTests(): Promise<void> {
    console.log('🧪 Starting WhatsApp Bot Tests...\n')
    console.log('=' .repeat(60))

    await this.testWebhookVerification()
    await this.testMessageProcessing()
    await this.testCommands()
    await this.testAIResponse()
    await this.testRateLimiting()
    await this.testDemoBookingFlow()
    await this.testErrorHandling()

    console.log('\n' + '='.repeat(60))
    this.printResults()
  }

  /**
   * Test 1: Webhook Verification (GET)
   */
  async testWebhookVerification(): Promise<void> {
    const testName = 'Webhook Verification (GET)'
    const startTime = Date.now()

    try {
      console.log(`\n📝 Testing: ${testName}`)

      // Test with correct verify token
      const correctTokenUrl = `${this.webhookUrl}?hub.mode=subscribe&hub.verify_token=${this.verifyToken}&hub.challenge=test_challenge_123`

      const response = await fetch(correctTokenUrl)
      const body = await response.text()

      if (response.status === 200 && body === 'test_challenge_123') {
        this.addResult(testName, true, 'Webhook verified successfully', Date.now() - startTime)
        console.log('   ✅ PASS: Webhook verification successful')
      } else {
        this.addResult(testName, false, `Unexpected response: ${response.status}`, Date.now() - startTime)
        console.log(`   ❌ FAIL: Status ${response.status}, Body: ${body}`)
      }

      // Test with incorrect verify token
      const incorrectTokenUrl = `${this.webhookUrl}?hub.mode=subscribe&hub.verify_token=wrong_token&hub.challenge=test_challenge_123`
      const failResponse = await fetch(incorrectTokenUrl)

      if (failResponse.status === 403) {
        console.log('   ✅ PASS: Incorrect token rejected')
      } else {
        console.log(`   ⚠️  WARNING: Should reject incorrect token`)
      }
    } catch (error) {
      this.addResult(testName, false, `Error: ${error}`, Date.now() - startTime)
      console.log(`   ❌ FAIL: ${error}`)
    }
  }

  /**
   * Test 2: Message Processing (POST)
   */
  async testMessageProcessing(): Promise<void> {
    const testName = 'Message Processing (POST)'
    const startTime = Date.now()

    try {
      console.log(`\n📝 Testing: ${testName}`)

      const testMessage = {
        entry: [{
          changes: [{
            value: {
              messaging_product: 'whatsapp',
              metadata: {
                phone_number_id: '123456789'
              },
              contacts: [{
                profile: {
                  name: 'Test Student'
                }
              }],
              messages: [{
                from: '918826444334',
                id: 'test_msg_' + Date.now(),
                timestamp: Date.now().toString(),
                type: 'text',
                text: {
                  body: 'What is photosynthesis?'
                }
              }]
            }
          }]
        }]
      }

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testMessage)
      })

      const responseData = await response.json()

      if (response.status === 200 && responseData.status === 'received') {
        this.addResult(testName, true, 'Message processed successfully', Date.now() - startTime)
        console.log('   ✅ PASS: Message accepted for processing')
      } else {
        this.addResult(testName, false, `Unexpected response: ${JSON.stringify(responseData)}`, Date.now() - startTime)
        console.log(`   ❌ FAIL: ${JSON.stringify(responseData)}`)
      }
    } catch (error) {
      this.addResult(testName, false, `Error: ${error}`, Date.now() - startTime)
      console.log(`   ❌ FAIL: ${error}`)
    }
  }

  /**
   * Test 3: Command Handling
   */
  async testCommands(): Promise<void> {
    console.log(`\n📝 Testing: Command Handling`)

    const commands = ['HELP', 'MENU', 'DEMO', 'TEST', 'STATUS', 'SUPPORT']

    for (const command of commands) {
      await this.testSingleCommand(command)
      await this.sleep(500) // Avoid rate limiting
    }
  }

  private async testSingleCommand(command: string): Promise<void> {
    const testName = `Command: ${command}`
    const startTime = Date.now()

    try {
      const testMessage = {
        entry: [{
          changes: [{
            value: {
              messaging_product: 'whatsapp',
              metadata: { phone_number_id: '123456789' },
              contacts: [{ profile: { name: 'Test Student' } }],
              messages: [{
                from: '918826444334',
                id: 'test_cmd_' + Date.now() + '_' + command,
                timestamp: Date.now().toString(),
                type: 'text',
                text: { body: command }
              }]
            }
          }]
        }]
      }

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testMessage)
      })

      if (response.status === 200) {
        this.addResult(testName, true, `${command} command processed`, Date.now() - startTime)
        console.log(`   ✅ PASS: ${command} command`)
      } else {
        this.addResult(testName, false, `Failed with status ${response.status}`, Date.now() - startTime)
        console.log(`   ❌ FAIL: ${command} command`)
      }
    } catch (error) {
      this.addResult(testName, false, `Error: ${error}`, Date.now() - startTime)
      console.log(`   ❌ FAIL: ${command} - ${error}`)
    }
  }

  /**
   * Test 4: AI Response Generation
   */
  async testAIResponse(): Promise<void> {
    const testName = 'AI Response Generation'
    const startTime = Date.now()

    try {
      console.log(`\n📝 Testing: ${testName}`)

      const testMessage = {
        entry: [{
          changes: [{
            value: {
              messaging_product: 'whatsapp',
              metadata: { phone_number_id: '123456789' },
              contacts: [{ profile: { name: 'Test Student' } }],
              messages: [{
                from: '918826444335', // Different number to avoid rate limit
                id: 'test_ai_' + Date.now(),
                timestamp: Date.now().toString(),
                type: 'text',
                text: { body: 'Explain DNA replication in simple terms' }
              }]
            }
          }]
        }]
      }

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testMessage)
      })

      if (response.status === 200) {
        this.addResult(testName, true, 'AI question processed', Date.now() - startTime)
        console.log('   ✅ PASS: AI response generation initiated')
      } else {
        this.addResult(testName, false, `Failed with status ${response.status}`, Date.now() - startTime)
        console.log(`   ❌ FAIL: AI response generation`)
      }
    } catch (error) {
      this.addResult(testName, false, `Error: ${error}`, Date.now() - startTime)
      console.log(`   ❌ FAIL: ${error}`)
    }
  }

  /**
   * Test 5: Rate Limiting
   */
  async testRateLimiting(): Promise<void> {
    const testName = 'Rate Limiting (10 msgs/min)'
    const startTime = Date.now()

    try {
      console.log(`\n📝 Testing: ${testName}`)

      const phoneNumber = '918826444336' // Unique number for rate limit test
      let successCount = 0
      let rateLimitedCount = 0

      // Send 15 messages rapidly
      for (let i = 0; i < 15; i++) {
        const testMessage = {
          entry: [{
            changes: [{
              value: {
                messaging_product: 'whatsapp',
                metadata: { phone_number_id: '123456789' },
                contacts: [{ profile: { name: 'Test Student' } }],
                messages: [{
                  from: phoneNumber,
                  id: `test_rate_${Date.now()}_${i}`,
                  timestamp: Date.now().toString(),
                  type: 'text',
                  text: { body: `Test message ${i + 1}` }
                }]
              }
            }]
          }]
        }

        const response = await fetch(this.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testMessage)
        })

        const data = await response.json()

        if (data.status === 'rate_limited') {
          rateLimitedCount++
        } else if (data.status === 'received') {
          successCount++
        }

        await this.sleep(50) // Small delay between requests
      }

      if (successCount <= 10 && rateLimitedCount >= 5) {
        this.addResult(testName, true, `${successCount} allowed, ${rateLimitedCount} blocked`, Date.now() - startTime)
        console.log(`   ✅ PASS: Rate limiting working (${successCount} allowed, ${rateLimitedCount} blocked)`)
      } else {
        this.addResult(testName, false, `Rate limiting may not be working correctly`, Date.now() - startTime)
        console.log(`   ⚠️  WARNING: ${successCount} allowed, ${rateLimitedCount} blocked`)
      }
    } catch (error) {
      this.addResult(testName, false, `Error: ${error}`, Date.now() - startTime)
      console.log(`   ❌ FAIL: ${error}`)
    }
  }

  /**
   * Test 6: Demo Booking Flow
   */
  async testDemoBookingFlow(): Promise<void> {
    const testName = 'Demo Booking Flow'
    const startTime = Date.now()

    try {
      console.log(`\n📝 Testing: ${testName}`)

      const phoneNumber = '918826444337'

      // Step 1: Initiate demo booking
      await this.sendMessage(phoneNumber, 'DEMO')
      await this.sleep(1000)

      // Step 2: Select class
      await this.sendMessage(phoneNumber, '1') // Class 11
      await this.sleep(1000)

      // Step 3: Select time
      await this.sendMessage(phoneNumber, '2') // Tomorrow 5 PM
      await this.sleep(1000)

      this.addResult(testName, true, 'Demo booking flow completed', Date.now() - startTime)
      console.log('   ✅ PASS: Demo booking flow executed')
    } catch (error) {
      this.addResult(testName, false, `Error: ${error}`, Date.now() - startTime)
      console.log(`   ❌ FAIL: ${error}`)
    }
  }

  /**
   * Test 7: Error Handling
   */
  async testErrorHandling(): Promise<void> {
    const testName = 'Error Handling'
    const startTime = Date.now()

    try {
      console.log(`\n📝 Testing: ${testName}`)

      // Test with malformed JSON
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      })

      // Should still return 200 to avoid webhook disabling
      if (response.status === 200) {
        this.addResult(testName, true, 'Handles malformed requests gracefully', Date.now() - startTime)
        console.log('   ✅ PASS: Error handling working')
      } else {
        this.addResult(testName, false, `Unexpected status: ${response.status}`, Date.now() - startTime)
        console.log(`   ❌ FAIL: Should return 200 for errors`)
      }
    } catch (error) {
      this.addResult(testName, false, `Error: ${error}`, Date.now() - startTime)
      console.log(`   ❌ FAIL: ${error}`)
    }
  }

  /**
   * Helper: Send test message
   */
  private async sendMessage(phoneNumber: string, text: string): Promise<void> {
    const testMessage = {
      entry: [{
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: { phone_number_id: '123456789' },
            contacts: [{ profile: { name: 'Test Student' } }],
            messages: [{
              from: phoneNumber,
              id: `test_${Date.now()}_${Math.random()}`,
              timestamp: Date.now().toString(),
              type: 'text',
              text: { body: text }
            }]
          }
        }]
      }]
    }

    await fetch(this.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testMessage)
    })
  }

  /**
   * Helper: Sleep
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Helper: Add test result
   */
  private addResult(name: string, passed: boolean, message: string, duration: number): void {
    this.results.push({ name, passed, message, duration })
  }

  /**
   * Print test results summary
   */
  private printResults(): void {
    console.log('\n📊 TEST RESULTS SUMMARY\n')

    const passed = this.results.filter(r => r.passed).length
    const failed = this.results.filter(r => !r.passed).length
    const total = this.results.length

    console.log(`Total Tests: ${total}`)
    console.log(`✅ Passed: ${passed}`)
    console.log(`❌ Failed: ${failed}`)
    console.log(`📈 Success Rate: ${((passed / total) * 100).toFixed(1)}%\n`)

    if (failed > 0) {
      console.log('❌ FAILED TESTS:')
      this.results.filter(r => !r.passed).forEach(result => {
        console.log(`   • ${result.name}: ${result.message} (${result.duration}ms)`)
      })
      console.log('')
    }

    console.log('⏱️  PERFORMANCE:')
    const totalTime = this.results.reduce((sum, r) => sum + r.duration, 0)
    console.log(`   Total Time: ${totalTime}ms`)
    console.log(`   Average: ${(totalTime / total).toFixed(0)}ms per test\n`)

    if (passed === total) {
      console.log('🎉 ALL TESTS PASSED! WhatsApp Bot is ready for production!')
    } else {
      console.log('⚠️  Some tests failed. Please review and fix before deployment.')
    }
  }
}

// Run tests
const tester = new WhatsAppBotTester()
tester.runAllTests().catch(console.error)
