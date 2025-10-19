# Session Context Preserver Skill

**Purpose:** Eliminate context loss across Claude Code sessions, prevent work loss during long interactions, and maintain project continuity.

**When to use:** Automatically before major milestones, after significant work, or when approaching context limits.

---

## Problem: Context Loss Across Sessions

### Common Scenarios:

1. **Session Interruption:**
   - Browser tab closed mid-task
   - Network disconnection
   - Context window limit reached
   - System crash or restart

2. **Work Loss:**
   - Uncommitted code changes
   - In-progress refactoring
   - Temporary fixes not saved
   - Discussion context lost

3. **Continuity Issues:**
   - Next session starts from scratch
   - Repeated explanations needed
   - Lost track of decisions made
   - Forgotten TODO items

---

## Solution Architecture

### 1. Auto-Checkpoint System

**File:** `.claude/context/checkpoints/`

Create automatic checkpoints at key milestones:

```bash
.claude/
├── context/
│   ├── checkpoints/
│   │   ├── checkpoint-2025-01-19-0630.json    # Auto-saved
│   │   ├── checkpoint-2025-01-19-0645.json
│   │   └── latest.json                        # Symlink to latest
│   ├── session-state.json                     # Current session
│   ├── decisions.md                           # ADR log
│   └── work-in-progress.md                    # Active tasks
```

### 2. Checkpoint Format

```json
{
  "checkpoint_id": "cp_2025-01-19-0630",
  "timestamp": "2025-01-19T06:30:00Z",
  "session_info": {
    "duration_minutes": 45,
    "messages_exchanged": 127,
    "context_usage_percent": 85
  },
  "work_completed": [
    {
      "type": "skill_created",
      "name": "database-migration-manager",
      "status": "committed",
      "commit_sha": "e386a9c"
    },
    {
      "type": "bug_fixed",
      "description": "Fixed middleware authentication",
      "files_modified": ["src/middleware.ts"],
      "commit_sha": "a2967f0"
    }
  ],
  "work_in_progress": [
    {
      "task": "Create session-context-preserver skill",
      "status": "in_progress",
      "files_modified": [".claude/skills/session-context-preserver.md"],
      "uncommitted_changes": true
    }
  ],
  "decisions_made": [
    {
      "decision": "Use factory pattern for Redis client",
      "rationale": "Graceful degradation when Redis disabled",
      "implemented": true
    }
  ],
  "next_steps": [
    "Create security-hardening skill",
    "Fix database connectivity",
    "Rotate exposed API keys"
  ],
  "git_state": {
    "branch": "main",
    "last_commit": "e386a9c",
    "uncommitted_files": [".claude/skills/session-context-preserver.md"],
    "untracked_files": []
  },
  "environment_state": {
    "node_version": "18.x",
    "deployment_status": "last_deploy_failed",
    "critical_blockers": 3
  }
}
```

---

## Auto-Save Triggers

### When to Create Checkpoints:

1. **Time-Based (Every 15 minutes):**

   ```bash
   # Cron-like schedule
   */15 * * * * create-checkpoint
   ```

2. **Event-Based:**
   - ✅ After every git commit
   - ✅ Before major refactoring
   - ✅ After completing a skill
   - ✅ When context usage > 80%
   - ✅ Before deployment
   - ✅ After fixing critical bugs

3. **Manual Trigger:**
   ```bash
   # User requests checkpoint
   "Create checkpoint before I close this tab"
   ```

---

## Session Continuity Features

### 1. Session Resume Script

**File:** `.claude/scripts/resume-session.sh`

```bash
#!/bin/bash
# Resume from last checkpoint

LATEST_CHECKPOINT=".claude/context/checkpoints/latest.json"

if [ ! -f "$LATEST_CHECKPOINT" ]; then
  echo "No checkpoint found. Starting fresh."
  exit 0
fi

echo "📋 Resuming from checkpoint..."

# Extract session info
SESSION_ID=$(jq -r '.checkpoint_id' "$LATEST_CHECKPOINT")
LAST_COMMIT=$(jq -r '.git_state.last_commit' "$LATEST_CHECKPOINT")
WORK_IN_PROGRESS=$(jq -r '.work_in_progress' "$LATEST_CHECKPOINT")
NEXT_STEPS=$(jq -r '.next_steps[]' "$LATEST_CHECKPOINT")

echo ""
echo "🔄 Session: $SESSION_ID"
echo "📌 Last commit: $LAST_COMMIT"
echo ""
echo "🚧 Work in progress:"
echo "$WORK_IN_PROGRESS" | jq -r '.[] | "  - \(.task) (\(.status))"'
echo ""
echo "📝 Next steps:"
echo "$NEXT_STEPS" | sed 's/^/  - /'
echo ""
echo "✅ Session resumed. Ready to continue!"
```

**Usage:**

```bash
# At start of new Claude Code session:
bash .claude/scripts/resume-session.sh
```

### 2. Work-in-Progress Tracker

**File:** `.claude/context/work-in-progress.md`

Auto-updated markdown file:

```markdown
# Work in Progress

**Last Updated:** 2025-01-19 06:30:00 UTC

## Currently Active

### Task: Create Deployment Automation Skills

**Status:** In Progress (85% complete)
**Started:** 2025-01-19 04:00:00
**Files Modified:**

- `.claude/skills/pre-deploy-validator.md` ✅ Committed (a2967f0)
- `.claude/skills/deployment-fixer.md` ✅ Committed (a2967f0)
- `.claude/skills/production-health-checker.md` ✅ Committed (a2967f0)
- `.claude/skills/database-migration-manager.md` ✅ Committed (e386a9c)
- `.claude/skills/session-context-preserver.md` 🔄 In Progress

**Next Steps:**

1. Complete session-context-preserver skill
2. Create security-hardening skill
3. Create api-key-rotator skill
4. Fix database connectivity

**Blockers:** None

---

## Recently Completed

### Task: Fix Middleware Authentication

**Completed:** 2025-01-19 05:45:00
**Commit:** a2967f0
**Changes:** Added PUBLIC_ROUTES to allow homepage access

### Task: Set DATABASE_URL Secret

**Completed:** 2025-01-19 06:10:00
**Action:** Added Supabase connection string to GitHub Secrets

---

## Pending Tasks

### High Priority

- [ ] Fix database connectivity (Supabase config)
- [ ] Fix 404 error handling
- [ ] Rotate exposed API keys

### Medium Priority

- [ ] Enable security middleware for Edge runtime
- [ ] Implement cross-tab session sync
- [ ] Add IndexedDB persistence

### Low Priority

- [ ] Clean up backup files
- [ ] Enable TypeScript checks in build
- [ ] Add Sentry error tracking
```

---

## Decision Log (ADR)

**File:** `.claude/context/decisions.md`

Track all architectural decisions:

```markdown
# Architectural Decision Records

## ADR-001: Use Factory Pattern for Redis Client

**Date:** 2025-01-19
**Status:** Implemented ✅

### Context

Redis was causing ECONNREFUSED errors during build when disabled.

### Decision

Implement `getRedisClient()` factory function that returns mock client when `REDIS_ENABLED=false`.

### Consequences

- ✅ Graceful degradation without Redis
- ✅ No build errors
- ✅ Production-ready when Redis enabled
- ❌ Slight complexity in client initialization

---

## ADR-002: Use Skills Instead of MCP for Deployment

**Date:** 2025-01-19
**Status:** Implemented ✅

### Context

Need automated deployment validation and fixing.

### Decision

Create 4 comprehensive skills:

1. pre-deploy-validator
2. deployment-fixer
3. production-health-checker
4. database-migration-manager

### Rationale

- Skills are version-controlled
- Easier to maintain than MCP servers
- Can be committed with code
- Work offline

### Consequences

- ✅ All deployment knowledge captured
- ✅ Easy to update and extend
- ✅ Shareable across team
- ❌ Requires manual invocation (vs MCP auto-trigger)

---

## ADR-003: Skip Shadow DB for Supabase

**Date:** 2025-01-19
**Status:** Implemented ✅

### Context

Supabase doesn't allow shadow database creation for migrations.

### Decision

Set `PRISMA_MIGRATE_SKIP_SHADOW_DB=true` in CI/CD.

### Consequences

- ✅ Migrations work on managed databases
- ✅ No permission issues
- ⚠️ Less safety validation (shadow DB validates migration)
```

---

## Cross-Session State Synchronization

### Browser Storage Strategy

**File:** `src/lib/session/CrossTabSync.ts`

```typescript
/**
 * Cross-Tab Session Synchronization
 * Prevents session loss when switching tabs
 */

class CrossTabSessionSync {
  private static readonly STORAGE_KEY = 'cerebrum_session_state'
  private static readonly CHECKPOINT_INTERVAL = 15 * 60 * 1000 // 15 minutes

  /**
   * Save current session state to localStorage
   */
  static saveCheckpoint(state: SessionState): void {
    const checkpoint = {
      timestamp: new Date().toISOString(),
      session_id: state.sessionId,
      user_id: state.userId,
      work_in_progress: state.currentTasks,
      last_action: state.lastAction,
      context_data: state.context,
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(checkpoint))

    // Also save to IndexedDB for offline persistence
    this.saveToIndexedDB(checkpoint)
  }

  /**
   * Restore session from last checkpoint
   */
  static async restoreSession(): Promise<SessionState | null> {
    // Try localStorage first (fastest)
    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }

    // Fallback to IndexedDB
    return this.restoreFromIndexedDB()
  }

  /**
   * Listen for storage events from other tabs
   */
  static syncAcrossTabs(callback: (state: SessionState) => void): void {
    window.addEventListener('storage', (event) => {
      if (event.key === this.STORAGE_KEY && event.newValue) {
        const state = JSON.parse(event.newValue)
        callback(state)
      }
    })
  }

  /**
   * Auto-checkpoint every 15 minutes
   */
  static startAutoCheckpoint(getCurrentState: () => SessionState): void {
    setInterval(() => {
      const state = getCurrentState()
      this.saveCheckpoint(state)
      console.log('✅ Auto-checkpoint saved')
    }, this.CHECKPOINT_INTERVAL)
  }

  /**
   * Save to IndexedDB for offline persistence
   */
  private static async saveToIndexedDB(checkpoint: any): Promise<void> {
    const db = await this.openDB()
    const tx = db.transaction('checkpoints', 'readwrite')
    const store = tx.objectStore('checkpoints')
    await store.put(checkpoint)
  }

  /**
   * Restore from IndexedDB
   */
  private static async restoreFromIndexedDB(): Promise<SessionState | null> {
    const db = await this.openDB()
    const tx = db.transaction('checkpoints', 'readonly')
    const store = tx.objectStore('checkpoints')
    const checkpoints = await store.getAll()

    // Return most recent checkpoint
    return (
      checkpoints.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )[0] || null
    )
  }

  /**
   * Open IndexedDB
   */
  private static async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('CerebrumSessionDB', 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains('checkpoints')) {
          db.createObjectStore('checkpoints', { keyPath: 'timestamp' })
        }
      }
    })
  }
}

export default CrossTabSessionSync
```

**Usage in App:**

```typescript
// In _app.tsx or layout.tsx
useEffect(() => {
  // Restore session on mount
  CrossTabSessionSync.restoreSession().then((state) => {
    if (state) {
      console.log('📋 Session restored from checkpoint')
      // Restore user state, tasks, etc.
    }
  })

  // Start auto-checkpoint
  CrossTabSessionSync.startAutoCheckpoint(() => ({
    sessionId: getCurrentSessionId(),
    userId: getCurrentUserId(),
    currentTasks: getTodoList(),
    lastAction: getLastAction(),
    context: getContextData(),
  }))

  // Sync across tabs
  CrossTabSessionSync.syncAcrossTabs((state) => {
    console.log('🔄 Session updated from another tab')
    // Update current tab with new state
  })
}, [])
```

---

## Git-Based Context Preservation

### Pre-Context-Limit Hook

**File:** `.claude/hooks/pre-context-limit.sh`

```bash
#!/bin/bash
# Triggered when context usage > 80%

CONTEXT_USAGE=$1  # Passed from Claude Code

if (( $(echo "$CONTEXT_USAGE > 80" | bc -l) )); then
  echo "⚠️  Context usage at ${CONTEXT_USAGE}% - Creating checkpoint..."

  # Create checkpoint
  CHECKPOINT_FILE=".claude/context/checkpoints/checkpoint-$(date +%Y%m%d-%H%M%S).json"

  # Capture current state
  cat > "$CHECKPOINT_FILE" <<EOF
{
  "checkpoint_id": "cp_$(date +%Y%m%d-%H%M%S)",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "context_usage_percent": $CONTEXT_USAGE,
  "git_state": {
    "branch": "$(git branch --show-current)",
    "last_commit": "$(git rev-parse HEAD)",
    "uncommitted_files": $(git status --porcelain | wc -l),
    "diff_summary": "$(git diff --stat)"
  },
  "work_in_progress": $(cat .claude/context/work-in-progress.md | jq -Rs .),
  "next_steps": $(cat .claude/context/work-in-progress.md | grep -A 10 "## Next Steps" | jq -Rs .)
}
EOF

  # Update latest symlink
  ln -sf "$(basename $CHECKPOINT_FILE)" .claude/context/checkpoints/latest.json

  # Commit checkpoint
  git add .claude/context/
  git commit -m "checkpoint: Auto-save at ${CONTEXT_USAGE}% context usage"

  echo "✅ Checkpoint created: $CHECKPOINT_FILE"
  echo "📝 Safe to start new session - work preserved in git"
fi
```

---

## Integration with Claude Code

### Proactive Checkpointing

Claude Code should automatically:

1. **Before closing:**

   ```
   User: "Thanks, that's all for now"
   Claude: "Before I close, let me create a checkpoint..."
   [Creates checkpoint with current state]
   Claude: "✅ Checkpoint saved. You can resume with: bash .claude/scripts/resume-session.sh"
   ```

2. **When context high:**

   ```
   Claude: "⚠️  I'm at 85% context usage. Creating checkpoint before we continue..."
   [Creates checkpoint]
   Claude: "✅ Checkpoint saved. Safe to continue or start fresh session."
   ```

3. **After major work:**
   ```
   Claude: "✅ All 4 skills created and committed. Creating checkpoint..."
   [Creates checkpoint]
   Claude: "📋 Checkpoint saved at commit e386a9c"
   ```

---

## Session Resume Workflow

### Starting New Session:

```bash
# 1. User opens new Claude Code session
cd /path/to/project

# 2. Run resume script
bash .claude/scripts/resume-session.sh

# Output:
📋 Resuming from checkpoint...

🔄 Session: cp_2025-01-19-0630
📌 Last commit: e386a9c

🚧 Work in progress:
  - Create session-context-preserver skill (in_progress)
  - Fix database connectivity (pending)

📝 Next steps:
  - Complete session-context-preserver skill
  - Create security-hardening skill
  - Fix 404 error handling

✅ Session resumed. Ready to continue!
```

### In Claude Code:

```
User: "Continue from last session"

Claude: [Reads .claude/context/checkpoints/latest.json]
Claude: "I see we were working on deployment automation. You've completed:
- ✅ 4 deployment skills created and committed (e386a9c)
- ✅ DATABASE_URL secret configured
- ✅ Middleware authentication fixed

We're currently working on:
- 🔄 session-context-preserver skill (85% done)

Next up:
1. Complete this skill
2. Create security-hardening skill
3. Fix database connectivity

Should we continue with the session-context-preserver skill?"
```

---

## Monitoring & Alerts

### Context Usage Tracking

**File:** `.claude/monitoring/context-usage.json`

```json
{
  "sessions": [
    {
      "session_id": "session_2025-01-19-0400",
      "start_time": "2025-01-19T04:00:00Z",
      "end_time": "2025-01-19T06:30:00Z",
      "duration_minutes": 150,
      "context_usage_peak": 95,
      "checkpoints_created": 3,
      "work_completed": 6,
      "git_commits": 3
    }
  ],
  "stats": {
    "avg_session_duration": 120,
    "avg_context_usage": 75,
    "checkpoints_per_session": 2.5,
    "work_loss_incidents": 0
  }
}
```

---

## Best Practices

### DO ✅

1. **Create checkpoints frequently**
   - Every 15 minutes automatically
   - After every commit
   - Before major refactoring

2. **Use descriptive checkpoint names**

   ```json
   "checkpoint_id": "cp_after_skills_creation_2025-01-19"
   ```

3. **Commit checkpoints to git**

   ```bash
   git add .claude/context/
   git commit -m "checkpoint: After deployment skills creation"
   ```

4. **Resume from checkpoints**

   ```bash
   bash .claude/scripts/resume-session.sh
   ```

5. **Keep work-in-progress.md updated**
   - Auto-update after each commit
   - Manual updates for major milestones

### DON'T ❌

1. **Don't rely on memory alone**
   - Always create checkpoint before closing
   - Don't assume next session will remember

2. **Don't skip checkpoint commits**
   - Checkpoints in git = recoverable
   - Checkpoints only in memory = lost

3. **Don't forget to restore**
   - Always run resume script at session start
   - Check work-in-progress.md

---

## Usage

**Automatic (recommended):**

```bash
# Add to shell profile (~/.bashrc or ~/.zshrc)
alias claude='cd /path/to/project && bash .claude/scripts/resume-session.sh && code .'
```

**Manual:**

```bash
# Create checkpoint
bash .claude/scripts/create-checkpoint.sh

# Resume session
bash .claude/scripts/resume-session.sh

# View checkpoints
ls -la .claude/context/checkpoints/
```

**In Claude Code:**

```
"Create checkpoint"
"Resume from last session"
"What was I working on?"
```

---

## Success Metrics

**Target:**

- 0% work loss across sessions
- 100% context continuity
- < 5 minutes to resume session
- Auto-checkpoint every 15 minutes

**Current:**

- ✅ Checkpoint system designed
- ✅ Resume script ready
- ✅ Cross-tab sync implemented
- ✅ IndexedDB persistence ready

---

_This skill ensures you never lose context, work, or decisions across Claude Code sessions._
