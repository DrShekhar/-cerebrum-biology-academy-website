// Enhanced Token Analysis Test Script
// Run this with: node test-token-analysis.js

// Import the enhanced PerformanceMonitor with token analysis
const { PerformanceMonitor } = require('./src/lib/ai/performanceMonitor.ts')

async function testEnhancedTokenAnalysis() {
  console.log('🚀 Testing Enhanced Token Analysis System\n')

  const monitor = new PerformanceMonitor()

  // Test scenarios with different token patterns
  const testScenarios = [
    {
      name: 'Anthropic - Efficient Short Response',
      provider: 'anthropic',
      tokensUsed: { input: 150, output: 200 },
      duration: 1500,
      context: {
        subject: 'Biology',
        studentLevel: 'class-11',
      },
    },
    {
      name: 'OpenAI - Long Detailed Explanation',
      provider: 'openai',
      tokensUsed: { input: 300, output: 800 },
      duration: 3200,
      context: {
        subject: 'Biology',
        studentLevel: 'class-12',
      },
    },
    {
      name: 'Google AI - Quick Answer',
      provider: 'google',
      tokensUsed: { input: 100, output: 150 },
      duration: 800,
      context: {
        subject: 'Chemistry',
        studentLevel: 'neet-dropper',
      },
    },
    {
      name: 'Anthropic - Complex Analysis (High Cost)',
      provider: 'anthropic',
      tokensUsed: { input: 500, output: 1200 },
      duration: 5000,
      context: {
        subject: 'Biology',
        studentLevel: 'class-12',
      },
    },
    {
      name: 'Google AI - Cached Response',
      provider: 'google',
      tokensUsed: { input: 0, output: 0 }, // Cached responses have 0 tokens
      duration: 200,
      cached: true,
      context: {
        subject: 'Physics',
        studentLevel: 'class-11',
      },
    },
  ]

  // Run all test scenarios
  for (const scenario of testScenarios) {
    console.log(`═══ ${scenario.name} ═══`)

    try {
      await monitor.trackRequest(
        async () => {
          // Simulate API request delay
          await new Promise((resolve) => setTimeout(resolve, scenario.duration))

          // Return mock AI response
          return {
            success: true,
            content: `Mock response for ${scenario.name}`,
            metadata: {
              provider: scenario.provider,
              model:
                scenario.provider === 'anthropic'
                  ? 'claude-3-haiku-20240307'
                  : scenario.provider === 'openai'
                    ? 'gpt-4'
                    : 'gemini-2.0-flash',
              tokensUsed: scenario.tokensUsed,
              cost: scenario.tokensUsed.input === 0 ? 0 : undefined, // Will be calculated
              cached: scenario.cached || false,
              responseTime: scenario.duration,
            },
          }
        },
        {
          provider: scenario.provider,
          requestType: 'chat',
          educationalContext: scenario.context,
        }
      )
    } catch (error) {
      console.error(`Error in scenario ${scenario.name}:`, error.message)
    }

    console.log('') // Add spacing between tests
  }

  // Display comprehensive token statistics
  console.log('═'.repeat(80))
  console.log('📊 COMPREHENSIVE TOKEN ANALYSIS REPORT')
  console.log('═'.repeat(80))

  // Get detailed token statistics
  monitor.getTokenStats()

  // Show overall performance stats
  console.log('\n📈 Overall Performance Summary:')
  const stats = monitor.getStats()

  // Show real-time metrics
  console.log('\n⚡ Real-time Metrics:')
  const realTimeMetrics = monitor.getRealTimeMetrics()
  console.table([realTimeMetrics])

  console.log('\n✅ Enhanced Token Analysis Test Completed!')
  console.log('\n🎯 New Features Demonstrated:')
  console.log('  • Provider-specific token pricing')
  console.log('  • Tokens per second efficiency tracking')
  console.log('  • Cost per token analysis')
  console.log('  • Input/Output ratio optimization insights')
  console.log('  • Automated cost and performance alerts')
  console.log('  • Comprehensive token usage statistics')
  console.log('  • Multi-provider cost comparison')
  console.log('  • Educational context-aware analysis\n')
}

// Run the enhanced token analysis test
testEnhancedTokenAnalysis().catch(console.error)
