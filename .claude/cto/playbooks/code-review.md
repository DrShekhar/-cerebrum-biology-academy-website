# Code Review Playbook

Standard process for reviewing code changes in Cerebrum Biology Academy.

---

## 🎯 Review Goals

1. **Correctness** - Does the code do what it's supposed to?
2. **Security** - Are there any vulnerabilities?
3. **Performance** - Will this scale?
4. **Maintainability** - Can others understand this?
5. **Consistency** - Does it follow our patterns?

---

## ✅ Review Checklist

### 1. Security Review (CRITICAL)

```
□ No exposed secrets/API keys
□ No SQL injection risks (use Prisma parameterized queries)
□ Input validation on all user inputs
□ Authentication on protected routes
□ Authorization checks (role-based access)
□ CSRF protection on forms
□ XSS prevention (no dangerouslySetInnerHTML with user data)
□ Rate limiting on public endpoints
```

### 2. Code Quality

```
□ No TypeScript errors (npx tsc --noEmit)
□ Follows existing patterns in codebase
□ Functions are < 50 lines
□ Files are < 500 lines
□ No duplicated code
□ Proper error handling with try/catch
□ Meaningful variable/function names
□ Comments for non-obvious logic
```

### 3. Performance

```
□ No N+1 database queries
□ Uses database indexes for common queries
□ Proper caching strategy
□ Images optimized (next/image)
□ No blocking operations on main thread
□ Lazy loading for heavy components
□ Bundle size not significantly increased
```

### 4. Testing

```
□ Unit tests for new functions
□ Integration tests for API routes
□ Edge cases handled
□ Error paths tested
□ No console.log left in code
```

### 5. Documentation

```
□ JSDoc comments for exported functions
□ README updated if needed
□ API documentation for new endpoints
□ Changelog entry for significant changes
```

---

## 🚨 Automatic Rejections

Immediately reject PR if:

1. **Exposed secrets** - API keys, passwords in code
2. **SQL injection** - Raw SQL with user input
3. **No auth on protected route** - Missing authentication
4. **Production console.log** - Logging sensitive data
5. **Breaking changes** - Without migration path

---

## 💬 Review Comments Format

### For Issues

```
🚨 **Critical**: [Must fix before merge]
Description of the issue and why it's critical.

**Suggested fix:**
\`\`\`typescript
// Better approach
\`\`\`
```

```
🔧 **Improve**: [Should fix, not blocking]
Description of what could be better.
```

```
💡 **Suggestion**: [Nice to have]
Optional improvement for consideration.
```

### For Positives

```
✅ **Good**: [What's done well]
Nice use of X pattern here!
```

---

## 📝 Review Template

```markdown
## Code Review: [PR Title]

### Summary
[1-2 sentence summary of the changes]

### Security
- [ ] Passed security checklist
- ⚠️ [Any concerns]

### Quality
- ✅ [What's good]
- 🔧 [What needs improvement]

### Performance
- [ ] No performance concerns
- ⚠️ [Any concerns]

### Testing
- [ ] Tests included and passing

### Overall
- [ ] **Approved** - Ready to merge
- [ ] **Approved with suggestions** - Can merge, consider feedback
- [ ] **Changes requested** - Must address before merge
- [ ] **Rejected** - Significant issues, needs rework
```

---

## 🔄 Review Process

### Before Review
1. Read the PR description
2. Understand the context/ticket
3. Check if tests pass
4. Note the scope of changes

### During Review
1. Start with the main file (understand the feature)
2. Review tests to understand expected behavior
3. Check each file methodically
4. Look for patterns, not just bugs
5. Consider edge cases

### After Review
1. Summarize your feedback
2. Be specific and constructive
3. Offer alternatives when requesting changes
4. Respond promptly to follow-up questions

---

## ⏱️ Review SLA

| PR Size | Target Review Time |
|---------|-------------------|
| Small (<100 lines) | Same day |
| Medium (100-500 lines) | 1 day |
| Large (500+ lines) | 2 days |

---

## 🏷️ PR Labels

| Label | Meaning |
|-------|---------|
| `needs-review` | Ready for review |
| `changes-requested` | Author needs to address feedback |
| `approved` | Ready to merge |
| `blocked` | Waiting on something else |
| `wip` | Work in progress, not ready |
