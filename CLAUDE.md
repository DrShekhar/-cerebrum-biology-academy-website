# Claude Code Instructions

## Overview

Claude Code is an AI assistant that helps with software engineering tasks including file analysis, editing, bash commands, and git operations.

## Best Practices

### Communication

- Be specific and detailed in your requests, like you would with another engineer
- Provide context about your project structure and goals
- Mention any specific frameworks, libraries, or tools you're using

### File Operations

- Claude can read, edit, and create files
- Prefers editing existing files over creating new ones
- Can handle multiple file formats including code, markdown, JSON, etc.

### Code Tasks

- Claude follows existing code conventions and patterns
- Always checks for existing libraries before suggesting new ones
- Maintains security best practices
- Does not add comments unless requested
- **CRITICAL RULE**: Never use literal `\n` characters in code - always use proper newlines or template literals
- **FORMATTING RULE**: Always run `npx prettier --write <file>` before committing if files contain complex strings
- **VALIDATION RULE**: Test syntax with `npx tsc --noEmit` for TypeScript files before committing

### Git Operations

- Can help with commits, branches, and repository management
- Will not push to remote unless explicitly asked
- Follows conventional commit message formats
- **CRITICAL RULE**: Always save progress to git when context window approaches limit or major development milestones are reached
- Create commits with detailed messages for all agent deployments and feature implementations
- Include comprehensive documentation and implementation files in commits

### Testing & Quality

- Run linting and type checking after code changes
- Verify solutions with tests when possible
- Check existing test patterns before writing new tests
- **PRE-COMMIT RULE**: If prettier fails on commit, identify problematic files and fix formatting issues
- **BYPASS RULE**: Use `git commit --no-verify` only when prettier issues are identified and will be fixed in follow-up commit
- **CLEANUP RULE**: Always create follow-up commits to fix any formatting or syntax issues that were bypassed

## Common Commands

- Analysis: "Analyze the structure of this codebase"
- Debugging: "Find and fix the bug in [file/function]"
- Features: "Add [feature] following existing patterns"
- Refactoring: "Refactor [component] to improve [aspect]"
- Git: "Create a commit with these changes"

## Terminal Integration

Run `/terminal-setup` to enable terminal integration for enhanced workflow.
