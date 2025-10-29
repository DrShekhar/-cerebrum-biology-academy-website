# Scripts Directory

This directory contains automation scripts and utilities for the Cerebrum Biology Academy website.

## Post-Deployment Verification

Automated scripts to verify deployment success and system health.

### Files

- **`verify-deployment.js`** - Main Node.js verification script with comprehensive checks
- **`verify-deployment.sh`** - Bash alternative for Unix environments
- **`notify-deployment.js`** - Notification system for Slack/Discord alerts
- **`VERIFICATION_QUICK_START.md`** - Quick reference guide

### Quick Start

```bash
# Basic verification
npm run verify:deployment

# With notifications
export SLACK_WEBHOOK_URL="your-webhook-url"
npm run verify:notify

# Verbose mode
npm run verify:verbose
```

### Documentation

- 📖 **Full Guide**: [`POST_DEPLOYMENT_VERIFICATION.md`](../POST_DEPLOYMENT_VERIFICATION.md) (root directory)
- 🚀 **Quick Start**: [`VERIFICATION_QUICK_START.md`](./VERIFICATION_QUICK_START.md)

## Other Scripts

### Deployment

- `deployment-monitor.js` - Monitor deployment status
- `deployment-verification.js` - Legacy verification system
- `pre-deploy-check.ts` - Pre-deployment validation
- `post-deploy-validate.ts` - Post-deployment validation

### Database

- `database-performance-benchmark.js` - Database performance testing
- `db-health-check.js` - Database health monitoring
- `setup-production-database.sh` - Database setup for production

### Testing

- `test-whatsapp-bot.ts` - WhatsApp bot testing
- `test-whatsapp-automation.js` - WhatsApp automation tests
- `generate-test-report.js` - Test report generation
- `pre-launch-test.cjs` - Pre-launch test suite

### Agent & AI

- `claude-prompt-agent.js` - Claude AI prompt management
- `agent-workflow.ts` - Agent workflow automation
- `agent-status.ts` - Agent status monitoring
- `agent-list.ts` - List available agents

### Utilities

- `backup-production.ts` - Production backup creation
- `setup-env-production.ts` - Environment setup for production
- `health-check.ts` - System health check
- `warm-cache.ts` - Cache warming utility
- `create-component.js` - Component scaffolding
- `security-check.js` - Security scanning (referenced in package.json)
- `performance-test.js` - Performance testing (referenced in package.json)

### Monitoring

- `monitoring-setup.js` - Monitoring system setup

## Usage Patterns

### Running Scripts Directly

```bash
# Node.js scripts
node scripts/verify-deployment.js --help

# TypeScript scripts (using tsx)
tsx scripts/health-check.ts

# Shell scripts
bash scripts/verify-deployment.sh
```

### Using npm Scripts

See `package.json` for all available npm scripts:

```bash
npm run verify:deployment
npm run health:check
npm run backup:create
npm run agent:status
```

## Development

### Adding New Scripts

1. **Create the script** in appropriate subdirectory or root
2. **Make it executable** (if needed): `chmod +x scripts/your-script.js`
3. **Add npm script** in `package.json`
4. **Add documentation** in this README
5. **Test the script** thoroughly

### Script Conventions

- Use descriptive names: `verb-noun.js` (e.g., `verify-deployment.js`)
- Include help text: `--help` or `-h` flag
- Return exit codes: `0` for success, `1` for failure
- Add header comments explaining purpose
- Use environment variables for configuration
- Include error handling

### File Naming

- **JavaScript**: `.js` (CommonJS modules)
- **TypeScript**: `.ts` (using tsx for execution)
- **Shell**: `.sh` (bash scripts)
- **Config**: `.json`, `.yml`, `.yaml`

## Environment Variables

Common environment variables used across scripts:

```bash
# Deployment
VERCEL_TOKEN=                 # Vercel authentication
VERCEL_ORG_ID=                # Vercel organization
VERCEL_PROJECT_ID=            # Vercel project

# Notifications
SLACK_WEBHOOK_URL=            # Slack webhook for alerts
DISCORD_WEBHOOK_URL=          # Discord webhook for alerts

# Database
DATABASE_URL=                 # PostgreSQL connection string

# APIs
ANTHROPIC_API_KEY=            # Claude API key
OPENAI_API_KEY=               # OpenAI API key
WHATSAPP_ACCESS_TOKEN=        # WhatsApp API token
```

## CI/CD Integration

These scripts are designed to work in CI/CD pipelines:

### GitHub Actions

```yaml
- name: Run verification
  run: npm run verify:deployment -- --json > report.json
```

### Vercel

```json
{
  "scripts": {
    "vercel-build": "next build",
    "postdeploy": "npm run verify:deployment"
  }
}
```

## Troubleshooting

### Permission Denied

```bash
chmod +x scripts/your-script.sh
```

### Module Not Found

```bash
npm install  # Install dependencies
```

### TypeScript Errors

```bash
npm run type-check  # Check TypeScript types
```

## Contributing

When adding or modifying scripts:

1. Follow existing patterns
2. Add comprehensive error handling
3. Include help text and documentation
4. Test in multiple environments
5. Update this README

## Support

- 📖 Check relevant `.md` files in this directory
- 🐛 Report issues on GitHub
- 💬 Contact development team

---

**Last Updated:** 2025-10-29
