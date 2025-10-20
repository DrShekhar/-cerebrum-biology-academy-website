const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
})

// Integration test configuration for Cerebrum Biology Academy
const integrationConfig = {
  displayName: 'Integration Tests',
  setupFilesAfterEnv: ['<rootDir>/jest.integration.setup.js'],
  testEnvironment: 'node', // Use node environment for API testing

  // Test patterns for integration tests
  testMatch: [
    '<rootDir>/src/__tests__/integration/**/*.test.{js,ts}',
    '<rootDir>/src/__tests__/**/*.integration.test.{js,ts}',
    '<rootDir>/tests/integration/**/*.test.{js,ts}'
  ],

  // Module name mapping
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/api/(.*)$': '<rootDir>/src/app/api/$1',
  },

  // Coverage for integration tests
  collectCoverageFrom: [
    'src/app/api/**/*.{js,ts}',
    'src/lib/**/*.{js,ts}',
    'src/services/**/*.{js,ts}',
    '!src/**/*.d.ts',
    '!src/**/*.config.{js,ts}',
  ],

  coverageDirectory: 'coverage/integration',
  coverageReporters: ['text', 'lcov', 'html', 'json'],

  // Integration test specific settings
  testTimeout: 30000, // 30 seconds for API calls

  // Global setup for integration tests
  globalSetup: '<rootDir>/tests/integration-setup.js',
  globalTeardown: '<rootDir>/tests/integration-teardown.js',

  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,

  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
  ],

  // Enable verbose output
  verbose: true,

  // Setup files
  setupFiles: ['<rootDir>/jest.env.js'],

  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // For database testing
  maxWorkers: 1, // Run tests sequentially to avoid database conflicts

  // Environment variables for integration tests
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
}

module.exports = createJestConfig(integrationConfig)