#!/usr/bin/env node
/**
 * Anti-False Completion Detection System
 * Cerebrum Biology Academy - Phase 1.1 NextAuth.js Implementation
 * 
 * This script prevents agents from claiming task completion without genuine implementation
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const COLORS = {
  GREEN: '\x1b[32m',
  RED: '\x1b[31m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
  BOLD: '\x1b[1m'
};

class CompletionVerifier {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.passed = [];
    this.projectRoot = process.cwd();
  }

  log(message, color = COLORS.RESET) {
    console.log(`${color}${message}${COLORS.RESET}`);
  }

  logError(message) {
    this.errors.push(message);
    this.log(`❌ ${message}`, COLORS.RED);
  }

  logWarning(message) {
    this.warnings.push(message);
    this.log(`⚠️  ${message}`, COLORS.YELLOW);
  }

  logSuccess(message) {
    this.passed.push(message);
    this.log(`✅ ${message}`, COLORS.GREEN);
  }

  logInfo(message) {
    this.log(`ℹ️  ${message}`, COLORS.BLUE);
  }

  async runCommand(command, errorMessage = null, allowFailure = false) {
    try {
      const result = execSync(command, { 
        cwd: this.projectRoot, 
        encoding: 'utf8',
        stdio: 'pipe'
      });
      return { success: true, output: result };
    } catch (error) {
      if (!allowFailure) {
        this.logError(errorMessage || `Command failed: ${command}`);
        this.logError(`Error: ${error.message}`);
      }
      return { success: false, error: error.message, output: error.stdout };
    }
  }

  checkFileExists(filePath, description) {
    const fullPath = path.join(this.projectRoot, filePath);
    if (fs.existsSync(fullPath)) {
      this.logSuccess(`${description} exists: ${filePath}`);
      return true;
    } else {
      this.logError(`${description} missing: ${filePath}`);
      return false;
    }
  }

  checkFileContains(filePath, searchString, description) {
    const fullPath = path.join(this.projectRoot, filePath);
    if (!fs.existsSync(fullPath)) {
      this.logError(`File not found for content check: ${filePath}`);
      return false;
    }

    try {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(searchString)) {
        this.logSuccess(`${description} found in ${filePath}`);
        return true;
      } else {
        this.logError(`${description} missing in ${filePath}`);
        return false;
      }
    } catch (error) {
      this.logError(`Error reading file ${filePath}: ${error.message}`);
      return false;
    }
  }

  checkDirectoryExists(dirPath, description) {
    const fullPath = path.join(this.projectRoot, dirPath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
      this.logSuccess(`${description} directory exists: ${dirPath}`);
      return true;
    } else {
      this.logError(`${description} directory missing: ${dirPath}`);
      return false;
    }
  }

  async verifyGate1_BuildVerification() {
    this.log('\n' + COLORS.BOLD + '🚪 GATE 1: BUILD VERIFICATION' + COLORS.RESET);
    this.log('Checking if all code compiles without errors...\n');

    // Check TypeScript compilation
    const typeCheck = await this.runCommand(
      'npm run type-check',
      'TypeScript compilation failed'
    );

    // Check ESLint
    const lintCheck = await this.runCommand(
      'npm run lint',
      'ESLint checks failed',
      true // Allow warnings
    );

    // Check build process
    const buildCheck = await this.runCommand(
      'npm run build',
      'Production build failed'
    );

    return typeCheck.success && buildCheck.success;
  }

  async verifyGate2_SecurityValidation() {
    this.log('\n' + COLORS.BOLD + '🔒 GATE 2: SECURITY VALIDATION' + COLORS.RESET);
    this.log('Checking for security vulnerabilities...\n');

    // Check for security vulnerabilities
    const auditCheck = await this.runCommand(
      'npm audit --audit-level=high',
      'High/Critical security vulnerabilities found',
      true
    );

    // Check for sensitive data exposure
    this.checkSecurityImplementation();

    return auditCheck.success;
  }

  checkSecurityImplementation() {
    // Check for environment variables setup
    const envExample = this.checkFileExists('.env.example', 'Environment variables template');
    const envLocal = this.checkFileExists('.env.local', 'Local environment configuration');

    // Check for NextAuth.js configuration
    const nextAuthConfig = this.checkFileExists('src/app/api/auth/[...nextauth]/route.ts', 'NextAuth.js API route') ||
                          this.checkFileExists('src/pages/api/auth/[...nextauth].ts', 'NextAuth.js API route (Pages Router)');

    // Check for secure session configuration
    if (nextAuthConfig) {
      const hasSecureSession = this.checkFileContains(
        'src/app/api/auth/[...nextauth]/route.ts',
        'session',
        'Session configuration'
      ) || this.checkFileContains(
        'src/pages/api/auth/[...nextauth].ts',
        'session',
        'Session configuration'
      );
    }

    // Check for CSRF protection
    const hasCsrfProtection = this.checkFileContains(
      'next.config.ts',
      'csrf',
      'CSRF protection configuration'
    );

    return envExample && nextAuthConfig;
  }

  async verifyGate3_FunctionalTesting() {
    this.log('\n' + COLORS.BOLD + '🧪 GATE 3: FUNCTIONAL TESTING' + COLORS.RESET);
    this.log('Verifying authentication functionality...\n');

    // Check for test files
    const hasUnitTests = this.checkTestFiles();
    const hasIntegrationTests = this.checkIntegrationTests();

    // Run tests if they exist
    let testResults = { success: true };
    if (hasUnitTests || hasIntegrationTests) {
      testResults = await this.runCommand(
        'npm test -- --passWithNoTests',
        'Tests failed',
        true
      );
    }

    // Check authentication implementation
    const authImplementation = this.checkAuthenticationImplementation();

    return authImplementation && testResults.success;
  }

  checkTestFiles() {
    const testDirs = [
      'src/__tests__',
      'tests',
      '__tests__',
      'src/components/__tests__',
      'src/hooks/__tests__'
    ];

    let hasTests = false;
    testDirs.forEach(dir => {
      if (this.checkDirectoryExists(dir, 'Test directory')) {
        hasTests = true;
      }
    });

    // Check for specific auth test files
    const authTestFiles = [
      'src/__tests__/auth/useAuth.test.ts',
      'src/__tests__/components/auth/AuthModal.test.tsx',
      'tests/auth.test.ts'
    ];

    authTestFiles.forEach(file => {
      this.checkFileExists(file, 'Authentication test file');
    });

    return hasTests;
  }

  checkIntegrationTests() {
    const integrationTestFiles = [
      'src/__tests__/integration/auth.test.ts',
      'tests/integration/auth.test.ts',
      'e2e/auth.spec.ts'
    ];

    let hasIntegrationTests = false;
    integrationTestFiles.forEach(file => {
      if (this.checkFileExists(file, 'Integration test file')) {
        hasIntegrationTests = true;
      }
    });

    return hasIntegrationTests;
  }

  checkAuthenticationImplementation() {
    // Check for NextAuth.js implementation
    const hasNextAuth = this.checkFileContains(
      'package.json',
      'next-auth',
      'NextAuth.js dependency'
    );

    // Check for authentication hook
    const hasAuthHook = this.checkFileExists('src/hooks/useAuth.ts', 'Authentication hook');
    
    // Check for real authentication (not demo mode)
    const hasRealAuth = !this.checkFileContains(
      'src/hooks/useAuth.ts',
      'demo mode',
      'Demo mode implementation (should be removed)'
    );

    // Check for proper session management
    const hasSessionProvider = this.checkFileContains(
      'src/app/layout.tsx',
      'SessionProvider',
      'Session Provider configuration'
    ) || this.checkFileContains(
      'src/pages/_app.tsx',
      'SessionProvider',
      'Session Provider configuration'
    );

    return hasNextAuth && hasAuthHook && hasRealAuth;
  }

  async verifyGate4_PerformanceBenchmarks() {
    this.log('\n' + COLORS.BOLD + '⚡ GATE 4: PERFORMANCE BENCHMARKS' + COLORS.RESET);
    this.log('Checking performance requirements...\n');

    // Check for performance monitoring setup
    const hasPerformanceMonitoring = this.checkPerformanceSetup();

    // Check build performance
    const buildSize = this.checkBuildSize();

    return hasPerformanceMonitoring && buildSize;
  }

  checkPerformanceSetup() {
    // Check for performance monitoring tools
    const hasWebVitals = this.checkFileContains(
      'package.json',
      'web-vitals',
      'Web Vitals monitoring'
    );

    // Check for performance optimization
    const hasOptimization = this.checkFileContains(
      'next.config.ts',
      'experimental',
      'Next.js performance optimizations'
    );

    return hasWebVitals || hasOptimization;
  }

  checkBuildSize() {
    const buildPath = path.join(this.projectRoot, '.next');
    if (!fs.existsSync(buildPath)) {
      this.logError('Build directory not found. Run npm run build first.');
      return false;
    }

    this.logSuccess('Build artifacts found');
    return true;
  }

  async verifyGate5_ProductionReadiness() {
    this.log('\n' + COLORS.BOLD + '🚀 GATE 5: PRODUCTION READINESS' + COLORS.RESET);
    this.log('Checking production readiness...\n');

    // Check for monitoring setup
    const hasMonitoring = this.checkMonitoringSetup();

    // Check for error tracking
    const hasErrorTracking = this.checkErrorTracking();

    // Check for security headers
    const hasSecurityHeaders = this.checkSecurityHeaders();

    return hasMonitoring && hasErrorTracking && hasSecurityHeaders;
  }

  checkMonitoringSetup() {
    // Check for monitoring tools
    const monitoringTools = ['sentry', 'datadog', 'newrelic', '@vercel/analytics'];
    let hasMonitoring = false;

    const packageJson = path.join(this.projectRoot, 'package.json');
    if (fs.existsSync(packageJson)) {
      const content = fs.readFileSync(packageJson, 'utf8');
      const pkg = JSON.parse(content);
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };

      monitoringTools.forEach(tool => {
        if (allDeps[tool]) {
          this.logSuccess(`Monitoring tool found: ${tool}`);
          hasMonitoring = true;
        }
      });
    }

    if (!hasMonitoring) {
      this.logWarning('No monitoring tools detected');
    }

    return true; // Non-blocking for now
  }

  checkErrorTracking() {
    // Check for error boundary implementation
    const hasErrorBoundary = this.checkFileExists('src/components/ErrorBoundary.tsx', 'Error Boundary component');

    // Check for error tracking service
    const hasErrorService = this.checkFileContains(
      'package.json',
      'sentry',
      'Error tracking service'
    );

    if (!hasErrorBoundary && !hasErrorService) {
      this.logWarning('No error tracking mechanism found');
    }

    return true; // Non-blocking for now
  }

  checkSecurityHeaders() {
    // Check for security headers in Next.js config
    const hasSecurityHeaders = this.checkFileContains(
      'next.config.ts',
      'headers',
      'Security headers configuration'
    );

    if (!hasSecurityHeaders) {
      this.logWarning('Security headers not configured in next.config.ts');
    }

    return true; // Non-blocking for now
  }

  async verifySpecificRequirements() {
    this.log('\n' + COLORS.BOLD + '🎯 SPECIFIC REQUIREMENTS CHECK' + COLORS.RESET);
    this.log('Checking NextAuth.js specific implementation...\n');

    // Check for magic link provider
    const hasMagicLink = this.checkFileContains(
      'src/app/api/auth/[...nextauth]/route.ts',
      'Email',
      'Email provider for magic links'
    ) || this.checkFileContains(
      'src/pages/api/auth/[...nextauth].ts',
      'Email',
      'Email provider for magic links'
    );

    // Check for InstantDB integration
    const hasInstantDB = this.checkFileContains(
      'package.json',
      '@instantdb/react',
      'InstantDB integration'
    );

    // Check for role-based access
    const hasRoleAccess = this.checkFileContains(
      'src/hooks/useAuth.ts',
      'role',
      'Role-based access implementation'
    ) || this.checkFileContains(
      'src/types/index.ts',
      'role',
      'Role type definitions'
    );

    return hasMagicLink && hasInstantDB;
  }

  async run() {
    this.log(COLORS.BOLD + COLORS.BLUE + '🛡️  ANTI-FALSE COMPLETION DETECTION SYSTEM' + COLORS.RESET);
    this.log(COLORS.BLUE + '   Cerebrum Biology Academy - Phase 1.1 NextAuth.js Implementation\n' + COLORS.RESET);

    const gates = [
      { name: 'Build Verification', fn: () => this.verifyGate1_BuildVerification() },
      { name: 'Security Validation', fn: () => this.verifyGate2_SecurityValidation() },
      { name: 'Functional Testing', fn: () => this.verifyGate3_FunctionalTesting() },
      { name: 'Performance Benchmarks', fn: () => this.verifyGate4_PerformanceBenchmarks() },
      { name: 'Production Readiness', fn: () => this.verifyGate5_ProductionReadiness() },
      { name: 'Specific Requirements', fn: () => this.verifySpecificRequirements() }
    ];

    const results = [];
    
    for (const gate of gates) {
      try {
        const result = await gate.fn();
        results.push({ name: gate.name, passed: result });
      } catch (error) {
        this.logError(`Gate ${gate.name} failed with error: ${error.message}`);
        results.push({ name: gate.name, passed: false });
      }
    }

    // Summary
    this.log('\n' + COLORS.BOLD + '📊 VERIFICATION SUMMARY' + COLORS.RESET);
    this.log('='.repeat(50));

    const passedGates = results.filter(r => r.passed).length;
    const totalGates = results.length;

    results.forEach(result => {
      const status = result.passed ? '✅ PASS' : '❌ FAIL';
      const color = result.passed ? COLORS.GREEN : COLORS.RED;
      this.log(`${color}${status}${COLORS.RESET} - ${result.name}`);
    });

    this.log(`\n📈 Overall Score: ${passedGates}/${totalGates} gates passed`);
    this.log(`✅ Successful checks: ${this.passed.length}`);
    this.log(`⚠️  Warnings: ${this.warnings.length}`);
    this.log(`❌ Errors: ${this.errors.length}`);

    if (this.errors.length > 0) {
      this.log(COLORS.RED + COLORS.BOLD + '\n🚫 COMPLETION BLOCKED' + COLORS.RESET);
      this.log(COLORS.RED + 'The following issues must be resolved before claiming completion:' + COLORS.RESET);
      this.errors.forEach(error => this.log(`   • ${error}`, COLORS.RED));
    } else if (passedGates === totalGates) {
      this.log(COLORS.GREEN + COLORS.BOLD + '\n🎉 ALL GATES PASSED' + COLORS.RESET);
      this.log(COLORS.GREEN + 'Implementation meets completion criteria!' + COLORS.RESET);
    } else {
      this.log(COLORS.YELLOW + COLORS.BOLD + '\n⚠️  PARTIAL COMPLETION' + COLORS.RESET);
      this.log(COLORS.YELLOW + 'Some gates failed but may not be blocking. Review the results above.' + COLORS.RESET);
    }

    // Exit with appropriate code
    const criticalErrors = this.errors.filter(error => 
      error.includes('compilation failed') ||
      error.includes('build failed') ||
      error.includes('security vulnerabilities')
    );

    if (criticalErrors.length > 0) {
      process.exit(1); // Critical failure
    } else if (passedGates < totalGates * 0.8) {
      process.exit(1); // Less than 80% pass rate
    } else {
      process.exit(0); // Success or acceptable warnings
    }
  }
}

// Run the verification
const verifier = new CompletionVerifier();
verifier.run().catch(error => {
  console.error('Verification failed:', error);
  process.exit(1);
});