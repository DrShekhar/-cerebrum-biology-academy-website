#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script to replace all console.log/warn/error statements with structured logger
 * This is part of Phase 2, Task 1: Console.log Cleanup & Structured Logging
 */

console.log('🔍 Finding all TypeScript files with console statements...\n');

// Get all TypeScript files in src directory
const findFilesWithConsole = () => {
  try {
    const output = execSync(
      'grep -rl "console\\." src --include="*.ts" --include="*.tsx" 2>/dev/null || true',
      { encoding: 'utf8', cwd: '/Users/drshekhar/cerebrum-biology-academy-website' }
    );

    return output
      .trim()
      .split('\n')
      .filter(f => f && !f.includes('node_modules') && !f.includes('.next'))
      .filter(f => !f.endsWith('.js')); // Only TS files
  } catch (error) {
    console.error('Error finding files:', error.message);
    return [];
  }
};

const processFile = (filePath) => {
  const fullPath = path.join('/Users/drshekhar/cerebrum-biology-academy-website', filePath);

  try {
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = false;
    const originalContent = content;

    // Check if file already imports logger
    const hasLoggerImport = content.includes("from '@/lib/utils/logger'") ||
                           content.includes('from "@/lib/utils/logger"');

    // Check if file has console statements
    const hasConsole = /console\.(log|warn|error|info|debug)/.test(content);

    if (!hasConsole) {
      return { modified: false, file: filePath };
    }

    // Add logger import if not present
    if (!hasLoggerImport) {
      // Find the last import statement
      const importRegex = /^import\s+.*?from\s+['"].*?['"]$/gm;
      const imports = content.match(importRegex);

      if (imports && imports.length > 0) {
        const lastImport = imports[imports.length - 1];
        const lastImportIndex = content.lastIndexOf(lastImport);
        const afterLastImport = lastImportIndex + lastImport.length;

        content =
          content.slice(0, afterLastImport) +
          "\nimport { logger } from '@/lib/utils/logger'" +
          content.slice(afterLastImport);

        modified = true;
      }
    }

    // Replace console.error with logger.error
    content = content.replace(
      /console\.error\((.*?)\)/gs,
      (match, args) => {
        // Simple string message
        if (args.trim().startsWith("'") || args.trim().startsWith('"') || args.trim().startsWith('`')) {
          const parts = args.split(',').map(s => s.trim());
          if (parts.length === 1) {
            return `logger.error(${parts[0]})`;
          } else {
            const message = parts[0];
            const data = parts.slice(1).join(', ');
            return `logger.error(${message}, { data: ${data} })`;
          }
        }
        // Keep as is but wrap in logger
        return `logger.error('Error occurred', { error: ${args} })`;
      }
    );

    // Replace console.warn with logger.warn
    content = content.replace(
      /console\.warn\((.*?)\)/gs,
      (match, args) => {
        if (args.trim().startsWith("'") || args.trim().startsWith('"') || args.trim().startsWith('`')) {
          const parts = args.split(',').map(s => s.trim());
          if (parts.length === 1) {
            return `logger.warn(${parts[0]})`;
          } else {
            const message = parts[0];
            const data = parts.slice(1).join(', ');
            return `logger.warn(${message}, { data: ${data} })`;
          }
        }
        return `logger.warn('Warning', { data: ${args} })`;
      }
    );

    // Replace console.log with logger.info or logger.debug
    // Use logger.debug for verbose/debug logs, logger.info for important events
    content = content.replace(
      /console\.log\((.*?)\)/gs,
      (match, args) => {
        // Check if it's a debug/verbose log (contains "DEBUG", "VERBOSE", or technical details)
        const lowerArgs = args.toLowerCase();
        const isDebug = lowerArgs.includes('debug') ||
                       lowerArgs.includes('verbose') ||
                       lowerArgs.includes('trace') ||
                       match.length > 200; // Long logs are usually debug

        const logMethod = isDebug ? 'debug' : 'info';

        if (args.trim().startsWith("'") || args.trim().startsWith('"') || args.trim().startsWith('`')) {
          const parts = args.split(',').map(s => s.trim());
          if (parts.length === 1) {
            return `logger.${logMethod}(${parts[0]})`;
          } else {
            const message = parts[0];
            const data = parts.slice(1).join(', ');
            return `logger.${logMethod}(${message}, { data: ${data} })`;
          }
        }
        return `logger.${logMethod}('Log message', { data: ${args} })`;
      }
    );

    modified = modified || (content !== originalContent);

    if (modified) {
      fs.writeFileSync(fullPath, content, 'utf8');
      return { modified: true, file: filePath };
    }

    return { modified: false, file: filePath };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { modified: false, file: filePath, error: error.message };
  }
};

// Main execution
const files = findFilesWithConsole();
console.log(`Found ${files.length} files with console statements\n`);

let modifiedCount = 0;
let errorCount = 0;
const modifiedFiles = [];
const errors = [];

files.forEach((file, index) => {
  process.stdout.write(`\rProcessing (${index + 1}/${files.length}): ${file.padEnd(80).substring(0, 80)}`);

  const result = processFile(file);
  if (result.modified) {
    modifiedCount++;
    modifiedFiles.push(file);
  }
  if (result.error) {
    errorCount++;
    errors.push({ file, error: result.error });
  }
});

console.log('\n\n✅ Console.log replacement completed!\n');
console.log(`📊 Summary:`);
console.log(`   - Files scanned: ${files.length}`);
console.log(`   - Files modified: ${modifiedCount}`);
console.log(`   - Errors: ${errorCount}\n`);

if (modifiedFiles.length > 0) {
  console.log('📝 Modified files (first 20):');
  modifiedFiles.slice(0, 20).forEach(f => console.log(`   - ${f}`));
  if (modifiedFiles.length > 20) {
    console.log(`   ... and ${modifiedFiles.length - 20} more`);
  }
  console.log('');
}

if (errors.length > 0) {
  console.log('❌ Errors encountered:');
  errors.forEach(({ file, error }) => console.log(`   - ${file}: ${error}`));
  console.log('');
}

console.log('Next steps:');
console.log('1. Run: npm run type-check');
console.log('2. Run: npm run format');
console.log('3. Review changes: git diff');
console.log('4. Test the application');
