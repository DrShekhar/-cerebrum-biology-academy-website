// Test script to demonstrate the enhanced AIDebugger functionality
// Run this with: node test-debugger.js

// Simulate your original AIDebugger class
class AIDebugger {
  static analyzeError(error) {
    const errorAnalysis = {
      timestamp: new Date().toISOString(),
      errorType: error.constructor.name,
      message: error.message,
      status: error.status || 'No status code',
      diagnosis: '',
      solution: '',
      retryable: false,
      severity: 'medium'
    };

    // Enhanced classification logic from our unified system
    if (error.status === 401) {
      errorAnalysis.diagnosis = 'Authentication failed - Invalid or expired API key';
      errorAnalysis.solution = 'Check API key validity, format, and permissions';
      errorAnalysis.severity = 'critical';
      errorAnalysis.retryable = false;
    } else if (error.status === 429) {
      errorAnalysis.diagnosis = 'Rate limit exceeded - Too many requests';
      errorAnalysis.solution = 'Implement retry logic with exponential backoff, check rate limits';
      errorAnalysis.severity = 'medium';
      errorAnalysis.retryable = true;
    } else if (error.status === 400) {
      errorAnalysis.diagnosis = 'Bad request - Invalid parameters or malformed request';
      errorAnalysis.solution = 'Check request format, parameters, and model compatibility';
      errorAnalysis.severity = 'high';
      errorAnalysis.retryable = false;
    } else if (error.message?.includes('ECONNREFUSED')) {
      errorAnalysis.diagnosis = 'Connection refused - Network connectivity issue';
      errorAnalysis.solution = 'Check network connectivity, firewall settings, and DNS resolution';
      errorAnalysis.severity = 'high';
      errorAnalysis.retryable = true;
    } else if (error.message?.includes('model not found')) {
      errorAnalysis.diagnosis = 'AI model not available or deprecated';
      errorAnalysis.solution = 'Use updated model names: claude-3-haiku-20240307, gemini-2.0-flash, gpt-4';
      errorAnalysis.severity = 'high';
      errorAnalysis.retryable = false;
    } else {
      errorAnalysis.diagnosis = 'Unknown error - Requires manual investigation';
      errorAnalysis.solution = 'Check logs, network connectivity, and API documentation';
      errorAnalysis.severity = 'medium';
      errorAnalysis.retryable = true;
    }

    console.log('\n🔍 Enhanced AI Error Analysis:');
    console.table([{
      'Timestamp': errorAnalysis.timestamp,
      'Error Type': errorAnalysis.errorType,
      'Status': errorAnalysis.status,
      'Severity': errorAnalysis.severity.toUpperCase(),
      'Retryable': errorAnalysis.retryable ? '✅ Yes' : '❌ No',
      'Diagnosis': errorAnalysis.diagnosis,
      'Solution': errorAnalysis.solution
    }]);

    return errorAnalysis;
  }
}

// Test scenarios
console.log('🚀 Testing Enhanced AI Debugger\n');

// Test 1: Authentication Error
console.log('═══ Test 1: Authentication Error ═══');
const authError = new Error('Incorrect API key provided');
authError.status = 401;
AIDebugger.analyzeError(authError);

// Test 2: Rate Limit Error
console.log('\n═══ Test 2: Rate Limit Error ═══');
const rateLimitError = new Error('Rate limit exceeded');
rateLimitError.status = 429;
AIDebugger.analyzeError(rateLimitError);

// Test 3: Network Error
console.log('\n═══ Test 3: Network Connection Error ═══');
const networkError = new Error('connect ECONNREFUSED 127.0.0.1:443');
AIDebugger.analyzeError(networkError);

// Test 4: Model Error
console.log('\n═══ Test 4: Model Not Found Error ═══');
const modelError = new Error('model gemini-pro not found for API version v1');
modelError.status = 404;
AIDebugger.analyzeError(modelError);

// Test 5: Bad Request
console.log('\n═══ Test 5: Bad Request Error ═══');
const badRequestError = new Error('Invalid parameter: max_tokens must be positive');
badRequestError.status = 400;
AIDebugger.analyzeError(badRequestError);

console.log('\n✅ All test scenarios completed!\n');
console.log('🎯 This enhanced debugger provides:');
console.log('  • Detailed error classification');
console.log('  • Specific solutions for each error type');
console.log('  • Retry recommendations');
console.log('  • Severity assessment');
console.log('  • Provider-specific guidance');
console.log('  • Production-ready error handling\n');