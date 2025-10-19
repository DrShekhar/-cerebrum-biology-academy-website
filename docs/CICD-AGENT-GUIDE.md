# CI/CD Agent Guide - Cerebrum Biology Academy

## Overview

The CI/CD Agent is an autonomous AI-powered assistant that helps you set up and maintain a flawless continuous development and deployment pipeline. It studies your codebase, identifies issues, and helps fix build failures to make your deployment experience seamless.

## Features

### 🔍 **Analyze Codebase**

- Study your codebase for build, deployment, runtime, or configuration issues
- Provide actionable recommendations
- Identify common problems before they become critical

### 📋 **Check Build Logs**

- Examine build logs from local, Vercel, or GitHub Actions
- Identify compilation errors and warnings
- Highlight TypeScript errors, missing dependencies, and configuration problems

### ✅ **Verify Deployment Config**

- Check Vercel/Netlify/AWS deployment configuration
- Verify environment variables are set correctly
- Ensure build commands and output directories are configured

### 🏗️ **Run Local Build Tests**

- Test builds locally before deploying
- Catch errors early in development
- Verify production builds compile successfully

### 🔧 **Fix Common Issues**

- Automated fixes for common CI/CD problems:
  - Loading screen stuck in Suspense
  - Build failures
  - Missing environment variables
  - Dependency errors
  - TypeScript type errors

### ⚙️ **Setup GitHub Actions**

- Configure automated CI/CD workflows
- Set up build, test, and deployment pipelines
- Integrate with your GitHub repository

## Installation

Already installed! The agent is ready to use.

```bash
# Dependencies installed
@anthropic-ai/claude-agent-sdk@0.1.22 ✅
```

## Usage

### Method 1: API Endpoint (Recommended)

**Start your development server:**

```bash
npm run dev
```

**Make API requests:**

```bash
# Health check
curl http://localhost:3000/api/agent/cicd

# Analyze build issues
curl -X POST http://localhost:3000/api/agent/cicd \
  -H "Content-Type: application/json" \
  -d '{"action": "analyze", "issueType": "build", "directory": "./src"}'

# Fix loading screen stuck issue
curl -X POST http://localhost:3000/api/agent/cicd \
  -H "Content-Type: application/json" \
  -d '{"action": "fix", "issue": "loading-screen-stuck"}'

# Verify Vercel deployment config
curl -X POST http://localhost:3000/api/agent/cicd \
  -H "Content-Type: application/json" \
  -d '{"action": "verify", "platform": "vercel"}'
```

### Method 2: CLI Script

**Use the provided script:**

```bash
# Analyze build issues
node scripts/run-cicd-agent.js analyze build

# Fix loading screen stuck
node scripts/run-cicd-agent.js fix loading-screen-stuck

# Verify Vercel deployment
node scripts/run-cicd-agent.js verify vercel

# Setup GitHub Actions
node scripts/run-cicd-agent.js setup full-pipeline

# Check Vercel build logs
node scripts/run-cicd-agent.js check vercel
```

### Method 3: Import Directly in Code

**Use in your scripts:**

```typescript
import { createCICDAgent } from '@/lib/ai/claude-agent'

async function fixDeploymentIssues() {
  const agent = await createCICDAgent()
  console.log('Agent response:', agent)
}

fixDeploymentIssues()
```

## Agent Tools

### 1. `analyze_codebase`

**Description:** Study the codebase and find issues

**Parameters:**

- `directory` (string): Directory path to analyze
- `issueType` (enum): Type of issue - `build`, `deployment`, `runtime`, `configuration`

**Example:**

```json
{
  "directory": "./src",
  "issueType": "build"
}
```

### 2. `check_build_logs`

**Description:** Examine build logs for errors

**Parameters:**

- `logSource` (enum): Source of logs - `local`, `vercel`, `github-actions`

**Example:**

```json
{
  "logSource": "vercel"
}
```

### 3. `verify_deployment_config`

**Description:** Verify deployment configuration

**Parameters:**

- `platform` (enum): Deployment platform - `vercel`, `netlify`, `aws`, `other`

**Example:**

```json
{
  "platform": "vercel"
}
```

### 4. `run_local_build`

**Description:** Test build locally

**Parameters:**

- `buildCommand` (string): Build command to execute

**Example:**

```json
{
  "buildCommand": "npm run build"
}
```

### 5. `fix_common_issues`

**Description:** Apply fixes for common issues

**Parameters:**

- `issue` (enum): Type of issue to fix
  - `loading-screen-stuck`
  - `suspense-boundary`
  - `build-failure`
  - `env-vars-missing`
  - `dependency-errors`
  - `type-errors`

**Example:**

```json
{
  "issue": "loading-screen-stuck"
}
```

### 6. `setup_github_actions`

**Description:** Configure GitHub Actions workflows

**Parameters:**

- `workflow` (enum): Workflow type - `build-test`, `deploy`, `full-pipeline`

**Example:**

```json
{
  "workflow": "full-pipeline"
}
```

## Real-World Examples

### Example 1: Fix Website Loading Screen Issue

**Problem:** Website stuck on loading screen (like we just fixed!)

```bash
# Using CLI
node scripts/run-cicd-agent.js fix loading-screen-stuck

# Using API
curl -X POST http://localhost:3000/api/agent/cicd \
  -H "Content-Type: application/json" \
  -d '{"action": "fix", "issue": "loading-screen-stuck"}'
```

**Agent will:**

1. Identify Suspense boundary issue
2. Check page component rendering
3. Recommend removing problematic loading.tsx
4. Verify page renders correctly

### Example 2: Analyze Build Failures

**Problem:** Build failing but not sure why

```bash
# Analyze build issues
node scripts/run-cicd-agent.js analyze build

# Check build logs
node scripts/run-cicd-agent.js check local
```

**Agent will:**

1. Check package.json for missing dependencies
2. Verify environment variables
3. Review Next.js configuration
4. Inspect build logs for specific errors
5. Provide actionable recommendations

### Example 3: Setup Complete CI/CD Pipeline

**Problem:** Need automated testing and deployment

```bash
node scripts/run-cicd-agent.js setup full-pipeline
```

**Agent will:**

1. Create .github/workflows directory
2. Configure workflow YAML file
3. Set up Node.js environment
4. Configure dependency installation
5. Set up tests and linting
6. Configure build and deploy steps

## Environment Variables

**Required:**

```env
ANTHROPIC_API_KEY=sk-ant-api... # Already configured ✅
```

**Optional:**

```env
ANTHROPIC_API_URL=https://api.anthropic.com
```

## Troubleshooting

### Agent not responding?

1. **Check API key:**

   ```bash
   echo $ANTHROPIC_API_KEY
   ```

2. **Verify development server is running:**

   ```bash
   npm run dev
   ```

3. **Check agent endpoint:**
   ```bash
   curl http://localhost:3000/api/agent/cicd
   ```

### Build issues persist?

The agent provides recommendations, but you may need to:

1. Review agent's suggestions carefully
2. Apply fixes manually if needed
3. Test locally before deploying
4. Check Vercel deployment logs

## Integration with Existing Workflow

### Pre-commit Hook

Add agent check to your pre-commit workflow:

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run CI/CD agent to check for issues
node scripts/run-cicd-agent.js analyze build

# Continue with existing checks
npm run lint
npm run type-check
```

### GitHub Actions

Use agent in your CI pipeline:

```yaml
# .github/workflows/ci.yml
name: CI/CD Agent Check

on: [push, pull_request]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: node scripts/run-cicd-agent.js analyze build
```

### Vercel Deployment

Add to your deployment script:

```json
{
  "scripts": {
    "predeploy": "node scripts/run-cicd-agent.js verify vercel",
    "deploy": "vercel --prod"
  }
}
```

## Advanced Usage

### Custom Tool Handlers

Extend the agent with your own tools:

```typescript
// src/lib/ai/claude-agent.ts

// Add custom tool
{
  name: 'custom_deployment_check',
  description: 'Check custom deployment requirements',
  inputSchema: {
    type: 'object',
    properties: {
      environment: { type: 'string' }
    }
  },
  handler: async ({ environment }) => {
    // Your custom logic
    return { status: 'checked', environment };
  }
}
```

### Automated Issue Detection

Create a monitoring script:

```typescript
// scripts/monitor-deployment.ts
import { createCICDAgent } from '@/lib/ai/claude-agent'

async function monitorDeployment() {
  const agent = await createCICDAgent()

  // Run every 5 minutes
  setInterval(
    async () => {
      const result = await agent.run({
        prompt: 'Check for deployment issues',
        tools: [
          /* your tools */
        ],
      })

      if (result.hasIssues) {
        // Send alert
        console.error('Deployment issues detected:', result)
      }
    },
    5 * 60 * 1000
  )
}
```

## Best Practices

1. **Run agent checks before deploying:**

   ```bash
   node scripts/run-cicd-agent.js analyze build && git push
   ```

2. **Use agent to verify fixes:**

   ```bash
   # After fixing an issue
   node scripts/run-cicd-agent.js analyze runtime
   ```

3. **Monitor deployment health:**

   ```bash
   # Regular health checks
   node scripts/run-cicd-agent.js verify vercel
   ```

4. **Keep agent updated:**
   ```bash
   npm update @anthropic-ai/claude-agent-sdk
   ```

## Support

For issues or questions:

- Check agent response for recommendations
- Review deployment logs on Vercel
- Consult Next.js documentation
- Contact support: +91 88264 44334

## Changelog

### v1.0.0 (Current)

- Initial CI/CD agent implementation
- 6 core tools for deployment management
- API endpoint and CLI interface
- Automated issue detection and fixes
- GitHub Actions integration support

---

**Built with Claude Agent SDK v0.1.22**
**Powered by Claude Sonnet 4.5**

_Last Updated: October 19, 2025_
