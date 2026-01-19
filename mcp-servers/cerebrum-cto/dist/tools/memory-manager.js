/**
 * Memory Manager Tool
 *
 * Reads and updates the CTO memory files.
 */
import fs from 'fs/promises';
import path from 'path';
const MEMORY_FILES = {
    decisions: '.claude/cto/memory/decisions.md',
    learnings: '.claude/cto/memory/learnings.md',
    roadmap: '.claude/cto/memory/roadmap.md',
    'tech-debt': '.claude/cto/memory/tech-debt.md',
};
export async function readMemory(params) {
    const { file } = params;
    const projectRoot = process.env.CEREBRUM_PROJECT_ROOT || process.cwd();
    let output = '## CTO Memory\n\n';
    if (file === 'all') {
        // Read all memory files
        for (const [name, filePath] of Object.entries(MEMORY_FILES)) {
            const fullPath = path.join(projectRoot, filePath);
            try {
                const content = await fs.readFile(fullPath, 'utf-8');
                output += `### 📁 ${name}.md\n\n`;
                output += content.slice(0, 2000); // Limit to 2000 chars per file
                if (content.length > 2000) {
                    output += '\n\n*[truncated - file is longer]*\n';
                }
                output += '\n---\n\n';
            }
            catch (error) {
                output += `### 📁 ${name}.md\n\n⚠️ File not found\n\n---\n\n`;
            }
        }
    }
    else {
        // Read specific file
        const filePath = MEMORY_FILES[file];
        if (!filePath) {
            return {
                content: [{ type: 'text', text: `Unknown memory file: ${file}` }],
                isError: true,
            };
        }
        const fullPath = path.join(projectRoot, filePath);
        try {
            const content = await fs.readFile(fullPath, 'utf-8');
            output = content;
        }
        catch (error) {
            return {
                content: [{ type: 'text', text: `Memory file not found: ${filePath}` }],
                isError: true,
            };
        }
    }
    return {
        content: [{ type: 'text', text: output }],
    };
}
export async function updateMemory(params) {
    const { file, content } = params;
    const projectRoot = process.env.CEREBRUM_PROJECT_ROOT || process.cwd();
    const filePath = MEMORY_FILES[file];
    if (!filePath) {
        return {
            content: [{ type: 'text', text: `Unknown memory file: ${file}` }],
            isError: true,
        };
    }
    const fullPath = path.join(projectRoot, filePath);
    const timestamp = new Date().toISOString().split('T')[0];
    try {
        // Read existing content
        let existingContent = '';
        try {
            existingContent = await fs.readFile(fullPath, 'utf-8');
        }
        catch {
            // File doesn't exist, start fresh
        }
        // Format the update based on file type
        let formattedContent = '';
        switch (file) {
            case 'decisions':
                formattedContent = `\n\n## ADR-NEW: ${content.split('\n')[0]}\n**Date**: ${timestamp}\n**Status**: Active\n\n${content}\n`;
                break;
            case 'learnings':
                formattedContent = `\n\n### Update - ${timestamp}\n\n${content}\n`;
                break;
            case 'roadmap':
                formattedContent = `\n\n### Update - ${timestamp}\n\n${content}\n`;
                break;
            case 'tech-debt':
                // Tech debt has its own format, just append
                formattedContent = `\n\n${content}\n`;
                break;
            default:
                formattedContent = `\n\n${content}\n`;
        }
        // Append to file
        const updatedContent = existingContent + formattedContent;
        await fs.writeFile(fullPath, updatedContent);
        return {
            content: [
                {
                    type: 'text',
                    text: `✅ Updated memory file: ${file}\n\n**Added:**\n${content.slice(0, 200)}${content.length > 200 ? '...' : ''}`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: 'text',
                    text: `Failed to update memory file: ${error instanceof Error ? error.message : 'Unknown error'}`,
                },
            ],
            isError: true,
        };
    }
}
//# sourceMappingURL=memory-manager.js.map