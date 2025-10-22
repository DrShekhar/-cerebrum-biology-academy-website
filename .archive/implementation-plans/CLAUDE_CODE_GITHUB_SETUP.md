# Claude Code GitHub Action Setup Guide

## 🎯 Overview

This guide helps you set up Claude Code integration with GitHub, allowing you to mention `@claude` in issues and pull requests to get AI assistance directly in your repository.

## 📋 Prerequisites

- GitHub repository admin access
- Anthropic API key (Claude API access)
- GitHub Actions enabled in repository

## 🔧 Setup Steps

### 1. Add Anthropic API Key to GitHub Secrets

1. **Get your Anthropic API Key**
   - Go to https://console.anthropic.com/
   - Sign in to your account
   - Navigate to **API Keys** section
   - Create a new API key or copy existing one
   - Save it securely (you'll need it in the next step)

2. **Add secret to GitHub repository**
   - Go to your GitHub repository: https://github.com/drshekhar/cerebrum-biology-academy-website
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `ANTHROPIC_API_KEY`
   - Value: Paste your Anthropic API key
   - Click **Add secret**

### 2. Verify Workflow File

The workflow file has been created at `.github/workflows/claude-code.yml`

✅ **File created successfully!**

### 3. Commit and Push to GitHub

```bash
# Navigate to project directory
cd ~/cerebrum-biology-academy-website

# Add the new workflow file
git add .github/workflows/claude-code.yml

# Add this setup guide
git add CLAUDE_CODE_GITHUB_SETUP.md

# Commit the changes
git commit -m "feat: Add Claude Code GitHub Action for AI-assisted development

- Add claude-code.yml workflow for @claude mentions
- Workflow triggers on issues and PR comments
- Enables AI assistance directly in GitHub
- Add comprehensive setup guide

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin main
```

### 4. Verify GitHub Actions

1. Go to your repository on GitHub
2. Click **Actions** tab
3. You should see "Claude Code" in the workflows list
4. The workflow will run automatically when you mention `@claude`

## 🚀 How to Use

### In GitHub Issues

1. **Create a new issue** or comment on existing one
2. **Mention @claude** in the issue body or comment
3. **Describe your task**, for example:

```
@claude Please review the database connectivity code in /src/lib/db/instant.ts
and suggest improvements for production deployment.
```

4. **Claude will respond** with code analysis, suggestions, or implementations

### In Pull Requests

1. **Create a PR** or comment on existing one
2. **Mention @claude** in review comments or PR description
3. **Ask for code review**, for example:

```
@claude Can you review this API implementation and check for security issues?
```

4. **Claude will analyze** the PR and provide feedback

## 📝 Example Use Cases

### 1. Code Review Request

```
@claude Please review the changes in this PR for:
- Security vulnerabilities
- Performance issues
- Best practices compliance
- TypeScript type safety
```

### 2. Bug Investigation

```
@claude I'm getting a 500 error in /api/demo-booking.
Can you analyze the error logs and suggest a fix?
```

### 3. Feature Implementation

```
@claude Please implement real Zoom API integration replacing the simulation
in /src/lib/zoom/zoomService.ts following the TODO.md requirements.
```

### 4. Architecture Advice

```
@claude Should we use Supabase or InstantDB for production database?
Please analyze based on our NEET Biology Academy requirements.
```

### 5. Performance Optimization

```
@claude The test generator page is slow on 3G networks.
Can you suggest optimizations?
```

## ⚙️ Workflow Configuration

### Triggers

The workflow runs when:

- ✅ New issue is created with `@claude` in title or body
- ✅ Issue is assigned and contains `@claude`
- ✅ Comment on issue contains `@claude`
- ✅ PR review comment contains `@claude`
- ✅ PR review body contains `@claude`

### Permissions

- **Read**: Repository contents
- **Write**: Issues and pull requests (to post responses)

### Actions Used

- `actions/checkout@v4` - Checks out repository code
- `anthropics/claude-code-action@v1` - Runs Claude Code

## 🔒 Security Best Practices

1. **Never commit API keys** - Always use GitHub Secrets
2. **Review Claude's suggestions** - Always validate AI-generated code
3. **Test changes locally** - Don't merge untested code
4. **Monitor API usage** - Check Anthropic console for costs

## 💰 Cost Considerations

- **Claude API costs** apply based on usage
- **Approximate costs**:
  - Small code review: ~$0.05-0.20
  - Medium feature implementation: ~$0.50-1.00
  - Large refactoring: ~$1.00-3.00
- **Monitor usage** at https://console.anthropic.com/

## 🛠️ Troubleshooting

### Workflow not running?

1. Check GitHub Actions is enabled: **Settings** → **Actions** → **General**
2. Verify `ANTHROPIC_API_KEY` secret is set correctly
3. Check if `@claude` is spelled correctly in issue/PR

### Permission errors?

1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **Read and write permissions**
3. Click **Save**

### API errors?

1. Verify API key is valid at https://console.anthropic.com/
2. Check API usage limits and billing
3. Review workflow logs in **Actions** tab for detailed errors

## 📊 Workflow Logs

To view workflow execution:

1. Go to **Actions** tab
2. Click on **Claude Code** workflow
3. Select the specific run
4. View logs for each step

## 🎯 Best Practices

### ✅ Good @claude Mentions

```
@claude Review this authentication implementation for security vulnerabilities.

@claude Implement the Zoom integration as specified in TODO.md, section "CRITICAL: Activate Live Zoom Integration".

@claude Analyze the database connectivity error and provide a fix with proper error handling.
```

### ❌ Avoid Vague Mentions

```
@claude Fix this
@claude Help
@claude What do you think?
```

## 🚀 Advanced Usage

### Custom Workflow Modifications

You can customize the workflow by editing `.github/workflows/claude-code.yml`:

```yaml
# Example: Add custom environment variables
- name: Run Claude Code
  uses: anthropics/claude-code-action@v1
  with:
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
  env:
    NODE_ENV: production
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Integration with Other Actions

Combine with other workflows for advanced automation:

- Run tests after Claude's code changes
- Deploy to staging after AI-assisted fixes
- Notify team when Claude completes a task

## 📞 Support & Resources

- **Anthropic Docs**: https://docs.anthropic.com/
- **GitHub Actions**: https://docs.github.com/actions
- **Claude Code**: https://github.com/anthropics/claude-code-action
- **Project Support**: +91 88264 44334

## ✅ Setup Checklist

- [ ] Anthropic API key obtained
- [ ] `ANTHROPIC_API_KEY` secret added to GitHub
- [ ] Workflow file committed and pushed
- [ ] GitHub Actions enabled
- [ ] Workflow permissions set to read/write
- [ ] Test mention created in an issue
- [ ] Claude response received successfully

## 🎓 Next Steps

1. **Commit this workflow** to your repository
2. **Create a test issue** mentioning @claude
3. **Watch Claude Code** assist with your development tasks
4. **Use for real tasks** like the ones in TODO.md:
   - Zoom integration fixes
   - Database connectivity improvements
   - AI ClaudeChat implementation
   - 404 error handling

---

**🎯 Ready to revolutionize your development workflow with AI-powered GitHub assistance!**

---

_Last Updated: October 19, 2025_
_Project: Cerebrum Biology Academy_
_Version: 1.0_
