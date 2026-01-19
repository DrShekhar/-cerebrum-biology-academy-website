/**
 * Tech Debt Tracker Tool
 *
 * Reads and updates the tech debt register in the CTO memory.
 */
import fs from 'fs/promises';
import path from 'path';
const TECH_DEBT_FILE = '.claude/cto/memory/tech-debt.md';
export async function listTechDebt(params) {
    const { priority = 'all', status = 'all' } = params;
    const projectRoot = process.env.CEREBRUM_PROJECT_ROOT || process.cwd();
    const filePath = path.join(projectRoot, TECH_DEBT_FILE);
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        // Parse the markdown to extract debt items
        const items = [];
        const sections = content.split(/###\s+TD-(\d+):/g);
        for (let i = 1; i < sections.length; i += 2) {
            const id = `TD-${sections[i].padStart(3, '0')}`;
            const sectionContent = sections[i + 1];
            // Extract title (first line after the ID)
            const titleMatch = sectionContent.match(/^([^\n]+)/);
            const title = titleMatch ? titleMatch[1].trim() : 'Unknown';
            // Extract priority from **Priority** or section header emoji
            let itemPriority = 'medium';
            if (sectionContent.includes('🔴') || sectionContent.toLowerCase().includes('critical')) {
                itemPriority = 'critical';
            }
            else if (sectionContent.includes('🟠') || sectionContent.toLowerCase().includes('high')) {
                itemPriority = 'high';
            }
            else if (sectionContent.includes('🟡') || sectionContent.toLowerCase().includes('medium')) {
                itemPriority = 'medium';
            }
            else if (sectionContent.includes('🟢') || sectionContent.toLowerCase().includes('low')) {
                itemPriority = 'low';
            }
            // Extract status
            let itemStatus = 'open';
            if (sectionContent.toLowerCase().includes('in progress')) {
                itemStatus = 'in_progress';
            }
            else if (sectionContent.toLowerCase().includes('done') || sectionContent.toLowerCase().includes('completed')) {
                itemStatus = 'done';
            }
            // Extract effort
            const effortMatch = sectionContent.match(/\*\*Effort\*\*:\s*([^\n]+)/i);
            const effort = effortMatch ? effortMatch[1].trim() : undefined;
            // Extract impact
            const impactMatch = sectionContent.match(/\*\*Impact\*\*:\s*([^\n]+)/i);
            const impact = impactMatch ? impactMatch[1].trim() : undefined;
            items.push({
                id,
                title,
                priority: itemPriority,
                status: itemStatus,
                effort,
                impact,
            });
        }
        // Filter items
        let filteredItems = items;
        if (priority !== 'all') {
            filteredItems = filteredItems.filter((item) => item.priority === priority);
        }
        if (status !== 'all') {
            filteredItems = filteredItems.filter((item) => item.status === status);
        }
        // Format output
        let output = `## Technical Debt Summary\n\n`;
        output += `**Total Items**: ${items.length}\n`;
        output += `**Filtered**: ${filteredItems.length}\n\n`;
        // Group by priority
        const byPriority = {
            critical: filteredItems.filter((i) => i.priority === 'critical'),
            high: filteredItems.filter((i) => i.priority === 'high'),
            medium: filteredItems.filter((i) => i.priority === 'medium'),
            low: filteredItems.filter((i) => i.priority === 'low'),
        };
        for (const [prio, prioItems] of Object.entries(byPriority)) {
            if (prioItems.length === 0)
                continue;
            const emoji = { critical: '🔴', high: '🟠', medium: '🟡', low: '🟢' }[prio];
            output += `### ${emoji} ${prio.charAt(0).toUpperCase() + prio.slice(1)} Priority (${prioItems.length})\n\n`;
            for (const item of prioItems) {
                const statusIcon = { open: '⬜', in_progress: '🔄', done: '✅' }[item.status];
                output += `- ${statusIcon} **${item.id}**: ${item.title}`;
                if (item.effort)
                    output += ` (${item.effort})`;
                output += '\n';
            }
            output += '\n';
        }
        return {
            content: [{ type: 'text', text: output }],
        };
    }
    catch (error) {
        if (error instanceof Error && error.message.includes('ENOENT')) {
            return {
                content: [
                    {
                        type: 'text',
                        text: 'Tech debt file not found. Create it at .claude/cto/memory/tech-debt.md',
                    },
                ],
            };
        }
        throw error;
    }
}
export async function addTechDebt(params) {
    const { title, description, priority, effort, impact } = params;
    const projectRoot = process.env.CEREBRUM_PROJECT_ROOT || process.cwd();
    const filePath = path.join(projectRoot, TECH_DEBT_FILE);
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        // Find the highest existing ID
        const idMatches = content.match(/TD-(\d+)/g) || [];
        const maxId = idMatches.reduce((max, id) => {
            const num = parseInt(id.replace('TD-', ''), 10);
            return num > max ? num : max;
        }, 0);
        const newId = `TD-${String(maxId + 1).padStart(3, '0')}`;
        const date = new Date().toISOString().split('T')[0];
        // Build new entry
        let newEntry = `\n### ${newId}: ${title}\n`;
        newEntry += `**Introduced**: ${date}\n`;
        newEntry += `**Impact**: ${impact || 'TBD'}\n`;
        newEntry += `**Effort**: ${effort || 'TBD'}\n`;
        newEntry += `**Status**: Not Started\n\n`;
        if (description) {
            newEntry += `**Details**:\n${description}\n\n`;
        }
        newEntry += `**Fix Plan**:\n1. TBD\n\n---\n`;
        // Find the right section to insert based on priority
        const prioritySections = {
            critical: '## 🔴 Critical',
            high: '## 🟠 High Priority',
            medium: '## 🟡 Medium Priority',
            low: '## 🟢 Low Priority',
        };
        const prioritySection = prioritySections[priority] || '## 🟡 Medium Priority';
        const sectionIndex = content.indexOf(prioritySection);
        if (sectionIndex !== -1) {
            // Find the end of the section header line
            const insertIndex = content.indexOf('\n', sectionIndex) + 1;
            const updatedContent = content.slice(0, insertIndex) + newEntry + content.slice(insertIndex);
            await fs.writeFile(filePath, updatedContent);
        }
        else {
            // Append to end if section not found
            await fs.appendFile(filePath, newEntry);
        }
        return {
            content: [
                {
                    type: 'text',
                    text: `✅ Added tech debt item: ${newId}\n\n**Title**: ${title}\n**Priority**: ${priority}\n**Effort**: ${effort || 'TBD'}`,
                },
            ],
        };
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=tech-debt-tracker.js.map