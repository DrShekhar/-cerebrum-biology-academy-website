/**
 * Enhanced AI Integration Example
 * Demonstrates the complete AI system with all advanced features
 */

import { aiClient, AIRequest } from './aiClient'

/**
 * Example: Basic request with all enhancements enabled
 */
export async function basicEnhancedRequest() {
  const request: AIRequest = {
    prompt: "Explain the process of photosynthesis in detail, including the light and dark reactions.",
    context: {
      subject: "biology",
      studentLevel: "class-11",
      language: "english",
      userId: "student_123",
      sessionId: "session_456"
    },
    options: {
      // Enable all advanced features
      intelligentRouting: true,
      qualityAssurance: true,
      autoRetryOnLowQuality: true,
      enhancedFallback: true,
      useCache: true,

      // Quality and cost controls
      qualityThreshold: 0.8,
      maxCost: 0.05, // $0.05 maximum
      maxLatency: 10000, // 10 seconds maximum

      // Provider selection preferences
      selectionCriteria: {
        costWeight: 0.3,
        qualityWeight: 0.5,
        speedWeight: 0.2
      },

      // Fallback strategy
      fallbackStrategy: "biology" // Use biology-optimized fallback
    }
  }

  try {
    console.log("🚀 Making enhanced AI request...")
    const response = await aiClient.generateResponse(request)

    if (response.success) {
      console.log("✅ Request successful!")
      console.log("📝 Content:", response.content?.substring(0, 200) + "...")
      console.log("🔧 Provider:", response.metadata.provider)
      console.log("🧠 Model:", response.metadata.model)
      console.log("💰 Cost:", `$${response.metadata.cost.toFixed(4)}`)
      console.log("⚡ Response Time:", `${response.metadata.responseTime}ms`)
      console.log("🎯 Quality Score:", response.metadata.qualityReport?.overallScore?.toFixed(2))
      console.log("📊 Provider Score:", response.metadata.providerScore?.toFixed(2))
      console.log("🔄 Cached:", response.metadata.cached)

      if (response.metadata.enhancedFallbackUsed) {
        console.log("🛡️ Fallback attempts:", response.metadata.fallbackAttempts?.length)
        console.log("🎯 Final provider:", response.metadata.finalProvider)
      }

      return response
    } else {
      console.error("❌ Request failed:", response.error)
      return response
    }
  } catch (error) {
    console.error("💥 Error:", error)
    throw error
  }
}

/**
 * Example: Critical request with maximum quality requirements
 */
export async function criticalQualityRequest() {
  const request: AIRequest = {
    prompt: "A student is struggling with understanding DNA replication. Create a comprehensive explanation with analogies, step-by-step process, and memory techniques specifically for NEET preparation.",
    context: {
      subject: "biology",
      studentLevel: "neet-dropper",
      language: "english",
      important: true,
      urgent: false
    },
    options: {
      intelligentRouting: true,
      qualityAssurance: true,
      autoRetryOnLowQuality: true,
      enhancedFallback: true,

      // Maximum quality requirements
      qualityThreshold: 0.9,
      minQuality: 0.85,

      // Prefer premium models
      model: "premium",

      // Cost is secondary to quality for critical requests
      selectionCriteria: {
        costWeight: 0.1,
        qualityWeight: 0.8,
        speedWeight: 0.1
      },

      fallbackStrategy: "critical"
    }
  }

  const response = await aiClient.generateResponse(request)

  if (response.success && response.metadata.qualityReport) {
    console.log("📊 Quality Analysis:")
    console.log("  Overall Score:", response.metadata.qualityReport.overallScore.toFixed(2))
    console.log("  Accuracy:", response.metadata.qualityReport.metrics.accuracy.toFixed(2))
    console.log("  Educational Value:", response.metadata.qualityReport.metrics.educationalValue.toFixed(2))
    console.log("  NEET Alignment:", response.metadata.qualityReport.metrics.neetAlignment.toFixed(2))
    console.log("  Flags:", response.metadata.qualityReport.flags.length)

    if (response.metadata.qualityReport.recommendations.length > 0) {
      console.log("💡 Recommendations:")
      response.metadata.qualityReport.recommendations.forEach((rec, i) => {
        console.log(`  ${i + 1}. ${rec}`)
      })
    }
  }

  return response
}

/**
 * Example: Cost-optimized request for practice questions
 */
export async function costOptimizedRequest() {
  const request: AIRequest = {
    prompt: "Generate 5 quick practice questions on cellular respiration for class 11 students.",
    context: {
      subject: "biology",
      studentLevel: "class-11",
      language: "english",
      practice: true // This is a practice session
    },
    options: {
      intelligentRouting: true,
      qualityAssurance: true,
      enhancedFallback: true,

      // Cost optimization
      maxCost: 0.01, // Very low cost limit
      model: "fast", // Use fast models

      // Prioritize cost over other factors
      selectionCriteria: {
        costWeight: 0.7,
        qualityWeight: 0.2,
        speedWeight: 0.1
      },

      fallbackStrategy: "fast"
    }
  }

  const response = await aiClient.generateResponse(request)
  console.log(`💰 Cost-optimized request completed for $${response.metadata.cost.toFixed(4)}`)

  return response
}

/**
 * Example: Speed-optimized request for real-time chat
 */
export async function speedOptimizedRequest() {
  const request: AIRequest = {
    prompt: "What is the function of ribosomes?",
    context: {
      subject: "biology",
      studentLevel: "class-10",
      language: "english"
    },
    options: {
      intelligentRouting: true,
      enhancedFallback: true,

      // Speed optimization
      maxLatency: 3000, // 3 seconds maximum
      model: "ultrafast",

      // Prioritize speed
      selectionCriteria: {
        costWeight: 0.2,
        qualityWeight: 0.3,
        speedWeight: 0.5
      },

      fallbackStrategy: "fast"
    }
  }

  const startTime = Date.now()
  const response = await aiClient.generateResponse(request)
  const totalTime = Date.now() - startTime

  console.log(`⚡ Speed-optimized request completed in ${totalTime}ms`)
  return response
}

/**
 * Example: Comprehensive system status check
 */
export async function systemStatusCheck() {
  console.log("🔍 Checking AI system status...")

  // Get overall system status
  const status = aiClient.getStatus()

  console.log("📊 System Overview:")
  console.log("  Available Providers:", status.availableProviders)
  console.log("  Default Provider:", status.defaultProvider)
  console.log("  Cache Hit Rate:", `${(status.cache.advanced.hitRate * 100).toFixed(1)}%`)
  console.log("  Total Requests:", status.performance.totalRequests)
  console.log("  Cost Trend:", status.costOptimization.metrics.costTrend)
  console.log("  Active Alerts:", status.costOptimization.alerts)

  // Get cost dashboard
  const costDashboard = aiClient.getCostDashboard()

  console.log("💰 Cost Analysis:")
  console.log("  Monthly Spent:", `$${costDashboard.budget.monthly.spent.toFixed(2)}`)
  console.log("  Monthly Budget:", `$${costDashboard.budget.monthly.budget.toFixed(2)}`)
  console.log("  Budget Used:", `${costDashboard.budget.monthly.percentage.toFixed(1)}%`)
  console.log("  Potential Savings:", `$${costDashboard.optimization.potentialSavings.toFixed(2)}`)
  console.log("  Efficiency Score:", `${(costDashboard.optimization.efficiencyScore * 100).toFixed(1)}%`)

  // Get fallback system status
  const fallbackStatus = aiClient.getFallbackStatus()

  console.log("🛡️ Fallback System:")
  console.log("  Overall Health:", fallbackStatus.overallHealth)

  Object.entries(fallbackStatus.providers).forEach(([provider, info]) => {
    console.log(`  ${provider}:`, {\n      health: info.health.status,\n      successRate: `${(info.health.successRate * 100).toFixed(1)}%`,\n      circuitBreaker: info.circuitBreaker.state,\n      responseTime: `${info.health.responseTime.toFixed(0)}ms`\n    })\n  })\n  \n  // Get quality analytics\n  const qualityAnalytics = aiClient.getQualityAnalytics()\n  \n  console.log("🎯 Quality Metrics:")\n  console.log("  Quality Threshold:", qualityAnalytics.pipeline.threshold)\n  console.log("  Avg Processing Time:", `${qualityAnalytics.pipeline.averageProcessingTime}ms`)\n  \n  return {\n    status,\n    costDashboard,\n    fallbackStatus,\n    qualityAnalytics\n  }\n}\n\n/**\n * Example: Budget management\n */\nexport async function budgetManagementExample() {\n  console.log("💰 Budget Management Example")\n  \n  // Update budget settings\n  aiClient.updateBudget({\n    monthly: 2000, // $2000/month\n    daily: 100,    // $100/day\n    alertThresholds: {\n      warning: 75,  // 75%\n      critical: 90  // 90%\n    },\n    autoStop: false\n  })\n  \n  console.log("✅ Budget settings updated")\n  \n  // Set quality threshold\n  aiClient.setQualityThreshold(0.85)\n  console.log("🎯 Quality threshold set to 85%")\n  \n  // Export cost data for analysis\n  const costDataJSON = aiClient.exportCostData('json')\n  console.log("📊 Cost data exported (JSON length):", costDataJSON.length)\n  \n  const costDataCSV = aiClient.exportCostData('csv')\n  console.log("📈 Cost data exported (CSV length):", costDataCSV.length)\n}\n\n/**\n * Example: Circuit breaker testing\n */\nexport async function circuitBreakerExample() {\n  console.log("🔌 Circuit Breaker Testing")\n  \n  // Force a circuit breaker open for testing\n  aiClient.forceCircuitBreakerState('openai', 'open')\n  console.log("🔴 Forced OpenAI circuit breaker to OPEN")\n  \n  // Make a request - should fallback to other providers\n  const request: AIRequest = {\n    prompt: "What is mitosis?",\n    context: {\n      subject: "biology",\n      studentLevel: "class-10",\n      language: "english"\n    },\n    options: {\n      enhancedFallback: true,\n      fallbackStrategy: "default"\n    }\n  }\n  \n  const response = await aiClient.generateResponse(request)\n  \n  if (response.success) {\n    console.log("✅ Request succeeded despite circuit breaker")\n    console.log("🎯 Used provider:", response.metadata.finalProvider || response.metadata.provider)\n    \n    if (response.metadata.fallbackAttempts) {\n      console.log("🔄 Fallback attempts:", response.metadata.fallbackAttempts.length)\n      response.metadata.fallbackAttempts.forEach((attempt, i) => {\n        console.log(`  ${i + 1}. ${attempt.provider}: ${attempt.success ? '✅' : '❌'} (${attempt.responseTime}ms)`)\n      })\n    }\n  }\n  \n  // Reset circuit breaker\n  aiClient.forceCircuitBreakerState('openai', 'closed')\n  console.log("🟢 Reset OpenAI circuit breaker to CLOSED")\n}\n\n/**\n * Run all examples\n */\nexport async function runAllExamples() {\n  console.log("🚀 Running Enhanced AI Integration Examples\\n")\n  \n  try {\n    console.log("=== Basic Enhanced Request ===")\n    await basicEnhancedRequest()\n    console.log("\\n")\n    \n    console.log("=== Critical Quality Request ===")\n    await criticalQualityRequest()\n    console.log("\\n")\n    \n    console.log("=== Cost Optimized Request ===")\n    await costOptimizedRequest()\n    console.log("\\n")\n    \n    console.log("=== Speed Optimized Request ===")\n    await speedOptimizedRequest()\n    console.log("\\n")\n    \n    console.log("=== System Status Check ===")\n    await systemStatusCheck()\n    console.log("\\n")\n    \n    console.log("=== Budget Management ===")\n    await budgetManagementExample()\n    console.log("\\n")\n    \n    console.log("=== Circuit Breaker Testing ===")\n    await circuitBreakerExample()\n    console.log("\\n")\n    \n    console.log("🎉 All examples completed successfully!")\n    \n  } catch (error) {\n    console.error("💥 Example failed:", error)\n  }\n}\n\n// Example of how to use in a real application\nexport const EnhancedAIService = {\n  // Standard educational query\n  async askBiologyQuestion(question: string, studentLevel: string) {\n    return aiClient.generateResponse({\n      prompt: question,\n      context: {\n        subject: "biology",\n        studentLevel: studentLevel as any,\n        language: "english"\n      },\n      options: {\n        intelligentRouting: true,\n        qualityAssurance: true,\n        enhancedFallback: true,\n        fallbackStrategy: "biology"\n      }\n    })\n  },\n  \n  // Fast chat response\n  async quickAnswer(question: string) {\n    return aiClient.generateResponse({\n      prompt: question,\n      context: {\n        subject: "biology",\n        studentLevel: "class-12",\n        language: "english"\n      },\n      options: {\n        intelligentRouting: true,\n        enhancedFallback: true,\n        model: "fast",\n        maxLatency: 5000,\n        fallbackStrategy: "fast"\n      }\n    })\n  },\n  \n  // High-quality NEET preparation\n  async neetPreparation(topic: string, studentLevel: string) {\n    return aiClient.generateResponse({\n      prompt: `Provide a comprehensive NEET-focused explanation of ${topic} with practice questions and memory techniques.`,\n      context: {\n        subject: "biology",\n        studentLevel: studentLevel as any,\n        language: "english",\n        important: true\n      },\n      options: {\n        intelligentRouting: true,\n        qualityAssurance: true,\n        autoRetryOnLowQuality: true,\n        enhancedFallback: true,\n        model: "premium",\n        qualityThreshold: 0.9,\n        fallbackStrategy: "critical"\n      }\n    })\n  },\n  \n  // Get system health\n  getSystemHealth() {\n    return aiClient.getStatus()\n  },\n  \n  // Get cost analytics\n  getCostAnalytics() {\n    return aiClient.getCostDashboard()\n  }\n}"