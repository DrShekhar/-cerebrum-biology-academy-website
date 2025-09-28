// Test script to demonstrate the enhanced PerformanceMonitor functionality
// Run this with: node test-performance.js

// Enhanced PerformanceMonitor with AI-specific metrics
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
  }

  async trackRequest(requestFunction, context = {}) {
    const metricId = `metric_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

    const start = {
      time: Date.now(),
      memory: this.getMemoryUsage()
    };

    try {
      const result = await requestFunction();

      const end = {
        time: Date.now(),
        memory: this.getMemoryUsage()
      };

      // Extract AI response metadata
      const aiResponse = result;
      const metric = {
        id: metricId,
        timestamp: new Date().toISOString(),
        duration: end.time - start.time,
        memoryDelta: end.memory - start.memory,
        success: true,
        provider: context.provider || aiResponse?.metadata?.provider,
        model: context.model || aiResponse?.metadata?.model,
        tokensUsed: aiResponse?.metadata?.tokensUsed,
        cost: aiResponse?.metadata?.cost,
        cached: aiResponse?.metadata?.cached,
        requestType: context.requestType,
        educationalContext: context.educationalContext
      };

      this.metrics.push(metric);

      console.log('📊 AI Performance Metric:', {
        id: metric.id.slice(-6),
        duration: `${metric.duration}ms`,
        provider: metric.provider,
        model: metric.model,
        cost: metric.cost ? `$${metric.cost.toFixed(4)}` : 'N/A',
        cached: metric.cached ? '🎯 Cached' : '🔄 Fresh',
        memoryDelta: `${metric.memoryDelta.toFixed(2)}MB`,
        subject: metric.educationalContext?.subject,
        level: metric.educationalContext?.studentLevel
      });

      return result;
    } catch (error) {
      const failedMetric = {
        id: metricId,
        timestamp: new Date().toISOString(),
        duration: Date.now() - start.time,
        memoryDelta: this.getMemoryUsage() - start.memory,
        success: false,
        error: error.message,
        provider: context.provider,
        requestType: context.requestType
      };

      this.metrics.push(failedMetric);

      console.error('❌ AI Performance Error:', {
        id: failedMetric.id.slice(-6),
        duration: `${failedMetric.duration}ms`,
        error: failedMetric.error,
        provider: failedMetric.provider
      });

      throw error;
    }
  }

  getStats() {
    if (this.metrics.length === 0) {
      console.log('No metrics available yet');
      return;
    }

    const successful = this.metrics.filter(m => m.success);
    const failed = this.metrics.filter(m => !m.success);

    // Calculate performance metrics
    const avgDuration = successful.length > 0
      ? successful.reduce((a, b) => a + b.duration, 0) / successful.length
      : 0;

    const totalCost = successful.reduce((sum, m) => sum + (m.cost || 0), 0);
    const avgCost = successful.length > 0 ? totalCost / successful.length : 0;

    const cachedRequests = successful.filter(m => m.cached).length;
    const cacheHitRate = successful.length > 0
      ? (cachedRequests / successful.length * 100).toFixed(2)
      : '0.00';

    // Provider breakdown
    const providerBreakdown = {};
    this.metrics.forEach(m => {
      if (m.provider) {
        providerBreakdown[m.provider] = (providerBreakdown[m.provider] || 0) + 1;
      }
    });

    // Memory efficiency
    const memoryDeltas = this.metrics.map(m => m.memoryDelta);
    const avgMemoryDelta = memoryDeltas.reduce((a, b) => a + b, 0) / memoryDeltas.length;

    console.log('\n📊 Enhanced AI Performance Statistics:');
    console.table([{
      'Total Requests': this.metrics.length,
      'Success Rate': `${(successful.length / this.metrics.length * 100).toFixed(2)}%`,
      'Avg Response Time': `${avgDuration.toFixed(2)}ms`,
      'Failures': failed.length,
      'Avg Cost': `$${avgCost.toFixed(4)}`,
      'Total Cost': `$${totalCost.toFixed(4)}`,
      'Cache Hit Rate': `${cacheHitRate}%`,
      'Memory Efficiency': `${avgMemoryDelta.toFixed(2)}MB avg`
    }]);

    if (Object.keys(providerBreakdown).length > 0) {
      console.log('\n🤖 Provider Usage Breakdown:');
      console.table(providerBreakdown);
    }

    // Educational metrics
    const educationalRequests = this.metrics.filter(m => m.educationalContext?.subject);
    if (educationalRequests.length > 0) {
      const subjects = {};
      const levels = {};

      educationalRequests.forEach(m => {
        if (m.educationalContext.subject) {
          subjects[m.educationalContext.subject] = (subjects[m.educationalContext.subject] || 0) + 1;
        }
        if (m.educationalContext.studentLevel) {
          levels[m.educationalContext.studentLevel] = (levels[m.educationalContext.studentLevel] || 0) + 1;
        }
      });

      console.log('\n🎓 Educational Context Breakdown:');
      console.table({ subjects, levels });
    }
  }

  getRealTimeMetrics() {
    const recent = this.metrics.slice(-5); // Last 5 requests
    const recentSuccessful = recent.filter(m => m.success);

    if (recentSuccessful.length === 0) {
      return { avgResponseTime: 0, successRate: 0, providers: [] };
    }

    const avgResponseTime = recentSuccessful.reduce((a, b) => a + b.duration, 0) / recentSuccessful.length;
    const successRate = (recentSuccessful.length / recent.length) * 100;
    const providers = [...new Set(recent.map(m => m.provider).filter(Boolean))];

    return {
      avgResponseTime: Math.round(avgResponseTime),
      successRate: Math.round(successRate),
      providers,
      lastUpdate: new Date().toISOString()
    };
  }

  getMemoryUsage() {
    try {
      return process.memoryUsage().heapUsed / 1024 / 1024; // MB
    } catch {
      return Math.random() * 50; // Simulated for demo
    }
  }
}

// Demo scenarios
async function runPerformanceDemo() {
  console.log('🚀 Testing Enhanced AI Performance Monitor\n');

  const monitor = new PerformanceMonitor();

  // Simulate AI requests with different scenarios
  const scenarios = [
    {
      name: 'Anthropic Biology Question',
      context: {
        provider: 'anthropic',
        model: 'claude-3-haiku-20240307',
        requestType: 'chat',
        educationalContext: {
          subject: 'Biology',
          studentLevel: 'class-11'
        }
      },
      responseTime: 1500,
      cost: 0.025,
      cached: false
    },
    {
      name: 'Google AI Quick Answer',
      context: {
        provider: 'google',
        model: 'gemini-2.0-flash',
        requestType: 'chat',
        educationalContext: {
          subject: 'Biology',
          studentLevel: 'class-12'
        }
      },
      responseTime: 800,
      cost: 0.0004,
      cached: true
    },
    {
      name: 'Failed OpenAI Request',
      context: {
        provider: 'openai',
        model: 'gpt-4',
        requestType: 'chat',
        educationalContext: {
          subject: 'Chemistry',
          studentLevel: 'class-11'
        }
      },
      shouldFail: true
    },
    {
      name: 'Cached Anthropic Response',
      context: {
        provider: 'anthropic',
        model: 'claude-3-5-sonnet-20241022',
        requestType: 'chat',
        educationalContext: {
          subject: 'Physics',
          studentLevel: 'class-12'
        }
      },
      responseTime: 200,
      cost: 0.0,
      cached: true
    },
    {
      name: 'Question Generation',
      context: {
        provider: 'google',
        model: 'gemini-2.5-flash',
        requestType: 'question-generation',
        educationalContext: {
          subject: 'Biology',
          studentLevel: 'neet-dropper'
        }
      },
      responseTime: 2100,
      cost: 0.008,
      cached: false
    }
  ];

  // Run all scenarios
  for (const scenario of scenarios) {
    console.log(`═══ Testing: ${scenario.name} ═══`);

    try {
      await monitor.trackRequest(
        async () => {
          // Simulate API request
          await new Promise(resolve => setTimeout(resolve, scenario.responseTime || 100));

          if (scenario.shouldFail) {
            throw new Error('Authentication failed - Invalid API key');
          }

          return {
            success: true,
            metadata: {
              provider: scenario.context.provider,
              model: scenario.context.model,
              tokensUsed: { input: 150, output: 300 },
              cost: scenario.cost,
              cached: scenario.cached,
              responseTime: scenario.responseTime
            }
          };
        },
        scenario.context
      );
    } catch (error) {
      // Expected for failed scenarios
    }

    console.log(''); // Add spacing
  }

  // Show comprehensive statistics
  monitor.getStats();

  // Show real-time metrics
  console.log('\n⚡ Real-time Metrics:');
  console.table([monitor.getRealTimeMetrics()]);

  console.log('\n✅ Performance monitoring demo completed!');
  console.log('\n🎯 Key Benefits:');
  console.log('  • Real-time performance tracking');
  console.log('  • Cost optimization insights');
  console.log('  • Provider comparison metrics');
  console.log('  • Educational context analysis');
  console.log('  • Memory usage monitoring');
  console.log('  • Cache efficiency tracking\n');
}

// Run the demo
runPerformanceDemo().catch(console.error);