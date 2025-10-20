# Claude Collaboration Framework for Cerebrum Biology Academy

## 🎯 PURPOSE

This framework ensures consistent, effective collaboration between you and Claude across multiple sessions without losing context or breaking functionality.

## 📋 GROUND RULES FOR CLAUDE

### 1. **NEVER ASSUME - ALWAYS VERIFY**

- Read relevant files before making changes
- Check current server status before modifications
- Verify dependencies exist before importing
- Test changes immediately after implementation

### 2. **CONTEXT PRESERVATION PROTOCOL**

- Always read `/CLAUDE_COLLABORATION_FRAMEWORK.md` at start of session
- Check `/CURRENT_SESSION_STATUS.md` for latest status
- Update session status after each major task
- Use TodoWrite tool for all task tracking

### 3. **INCREMENTAL DEVELOPMENT RULE**

- Break all tasks into max 3-step chunks
- Complete and verify each step before next
- Never make multiple file changes simultaneously
- Always provide rollback instructions

### 4. **ERROR HANDLING PROTOCOL**

- If any error occurs, immediately document in session status
- Provide exact error message and file location
- Always include fallback/rollback solution
- Never claim "fixed" without verification

## 🏗️ PROJECT STRUCTURE UNDERSTANDING

### Core Architecture

```
cerebrum-biology-academy-website/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # Reusable UI components
│   ├── lib/                    # Utility functions & services
│   ├── data/                   # Static data & content
│   └── types/                  # TypeScript definitions
├── CLAUDE_COLLABORATION_FRAMEWORK.md  # This file
├── CURRENT_SESSION_STATUS.md          # Live session tracking
└── TASK_AGENTS.md                     # Specialized agent definitions
```

### Key Dependencies

- Next.js 15.5.3 with Turbopack
- TypeScript with strict typing
- Tailwind CSS for styling
- Prisma for database (with Edge Runtime issues)
- Redis for caching (with client/server boundary issues)

## 🤖 SPECIALIZED AGENTS

### 1. **FILE_INVESTIGATOR_AGENT**

**Purpose**: Safely explore and understand file structure before changes
**Protocol**:

- Use Read tool to examine files
- Use Grep to search for dependencies
- Document findings before proceeding
- Never make assumptions about imports/exports

### 2. **ERROR_RESOLVER_AGENT**

**Purpose**: Diagnose and fix specific errors without breaking other parts
**Protocol**:

- Read error logs completely
- Identify root cause before attempting fix
- Test fix in isolation
- Provide rollback steps

### 3. **FEATURE_BUILDER_AGENT**

**Purpose**: Build new features incrementally
**Protocol**:

- Break feature into 3-step max chunks
- Build -> Test -> Document -> Next chunk
- Use existing patterns and components
- Never create files without reading similar examples

### 4. **INTEGRATION_AGENT**

**Purpose**: Handle complex integrations safely
**Protocol**:

- Map all dependencies first
- Create integration plan
- Test each integration point
- Document integration patterns

## 📊 SESSION TRACKING SYSTEM

### Current Session Status Format

```markdown
## CURRENT SESSION: [DATE]

### ACTIVE TASK

- [ ] Task description
- [ ] Current step
- [ ] Next step

### PROJECT STATUS

- Server Status: [Running/Error/Unknown]
- Last Working URL: [URL]
- Current Issues: [List]
- Files Modified: [List]

### CONTEXT SUMMARY

[Brief summary of what's working and what needs attention]

### NEXT SESSION PRIORITIES

1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
```

## 🛠️ MCP SERVER REQUIREMENTS

### 1. **CONTEXT_PERSISTENCE_SERVER**

**Purpose**: Maintain project context across sessions
**Functions**:

- Store file dependency maps
- Track working/broken states
- Maintain component relationships
- Store successful patterns

### 2. **ERROR_TRACKING_SERVER**

**Purpose**: Track and learn from errors
**Functions**:

- Log all errors with context
- Store successful fixes
- Pattern recognition for similar issues
- Error prevention suggestions

### 3. **FEATURE_PROGRESS_SERVER**

**Purpose**: Track feature development progress
**Functions**:

- Break down complex features
- Track completion status
- Store integration patterns
- Manage rollback points

## 🎯 TASK BREAKDOWN METHODOLOGY

### Phase 1: Investigation (Max 30 minutes)

1. **Read Current Status** - Check session files
2. **Assess Project State** - Verify server, files, errors
3. **Define Specific Task** - Break into 3-step max

### Phase 2: Implementation (Max 45 minutes)

1. **Step 1** - Single focused change
2. **Test & Verify** - Confirm step works
3. **Document** - Update session status
4. **Repeat** for steps 2-3

### Phase 3: Integration (Max 30 minutes)

1. **Integration Test** - Verify all parts work together
2. **Error Handling** - Fix any integration issues
3. **Documentation** - Update all relevant docs

## 🚨 EMERGENCY PROTOCOLS

### If Session Crashes/Errors

1. Immediately update `CURRENT_SESSION_STATUS.md`
2. Document exact error state
3. Provide rollback commands
4. List next session recovery steps

### If Context Lost

1. Read all framework files first
2. Check git status for recent changes
3. Verify server status
4. Review last session status
5. Plan recovery approach

## 📈 SUCCESS METRICS

### Session Success Indicators

- [ ] Task completed without breaking existing features
- [ ] All changes tested and verified
- [ ] Documentation updated
- [ ] Next session prep completed
- [ ] No unresolved errors

### Project Health Indicators

- [ ] Server runs without errors
- [ ] All main features accessible
- [ ] Build completes successfully
- [ ] No critical dependencies broken

## 🔄 WORKFLOW FOR EACH SESSION

### Start of Session Checklist

1. [ ] Read `CLAUDE_COLLABORATION_FRAMEWORK.md`
2. [ ] Check `CURRENT_SESSION_STATUS.md`
3. [ ] Verify server status with BashOutput
4. [ ] Read any error logs
5. [ ] Plan today's 3-step task

### End of Session Checklist

1. [ ] Update `CURRENT_SESSION_STATUS.md`
2. [ ] Test final state
3. [ ] Document any issues
4. [ ] Plan next session priorities
5. [ ] Commit changes (if requested)

## 🎮 COMMANDS FOR USER

### To Start Productive Session

"Claude, follow the collaboration framework and check current status"

### To Request Feature Work

"Claude, use FEATURE_BUILDER_AGENT to add [specific feature] in 3 steps"

### To Fix Errors

"Claude, use ERROR_RESOLVER_AGENT to fix [specific error] safely"

### To Investigate Issues

"Claude, use FILE_INVESTIGATOR_AGENT to understand [specific component/file]"

---

**Remember**: This framework is your guide. Follow it religiously to ensure we build your biology platform successfully without the frustrations of lost context and broken code.
