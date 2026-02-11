const fs = require('fs');
const path = require('path');

const blogDir = '/Users/drshekhar/cerebrum-biology-academy-website/content/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

const issues = [];
const perfect = [];

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract frontmatter
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    issues.push({ file, error: 'No frontmatter found' });
    return;
  }

  const frontmatter = match[1];

  // Extract seoTitle
  const seoTitleMatch = frontmatter.match(/seoTitle:\s*["'](.+?)["']/);
  const seoTitle = seoTitleMatch ? seoTitleMatch[1] : null;

  // Extract seoDescription
  const seoDescMatch = frontmatter.match(/seoDescription:\s*["'](.+?)["']/);
  const seoDesc = seoDescMatch ? seoDescMatch[1] : null;

  if (!seoTitle || !seoDesc) {
    issues.push({
      file,
      error: 'Missing SEO fields',
      seoTitle: seoTitle || 'MISSING',
      seoDesc: seoDesc || 'MISSING',
      titleLen: seoTitle ? seoTitle.length : 0,
      descLen: seoDesc ? seoDesc.length : 0
    });
    return;
  }

  const titleLen = seoTitle.length;
  const descLen = seoDesc.length;

  // Check if within perfect range
  const titlePerfect = titleLen >= 55 && titleLen <= 60;
  const descPerfect = descLen >= 155 && descLen <= 160;

  if (titlePerfect && descPerfect) {
    perfect.push(file);
  } else {
    issues.push({
      file,
      seoTitle,
      titleLen,
      titleStatus: titlePerfect ? 'OK' : (titleLen < 55 ? 'TOO SHORT' : 'TOO LONG'),
      seoDesc,
      descLen,
      descStatus: descPerfect ? 'OK' : (descLen < 155 ? 'TOO SHORT' : 'TOO LONG')
    });
  }
});

console.log('=== SEO AUDIT RESULTS ===\n');
console.log(`Total files scanned: ${files.length}`);
console.log(`Files with perfect SEO: ${perfect.length}`);
console.log(`Files needing fixes: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('=== FILES NEEDING SEO FIXES ===\n');

  issues.forEach((issue, idx) => {
    console.log(`${idx + 1}. ${issue.file}`);

    if (issue.error) {
      console.log(`   ERROR: ${issue.error}`);
    } else {
      // Title analysis
      if (issue.titleStatus !== 'OK') {
        console.log(`   Title [${issue.titleLen} chars - ${issue.titleStatus}]: "${issue.seoTitle}"`);

        if (issue.titleLen < 55) {
          const needed = 55 - issue.titleLen;
          console.log(`   → Need to ADD ${needed} characters to title`);
        } else if (issue.titleLen > 60) {
          const excess = issue.titleLen - 60;
          console.log(`   → Need to REMOVE ${excess} characters from title`);
        }
      }

      // Description analysis
      if (issue.descStatus !== 'OK') {
        console.log(`   Description [${issue.descLen} chars - ${issue.descStatus}]: "${issue.seoDesc}"`);

        if (issue.descLen < 155) {
          const needed = 155 - issue.descLen;
          console.log(`   → Need to ADD ${needed} characters to description`);
        } else if (issue.descLen > 160) {
          const excess = issue.descLen - 160;
          console.log(`   → Need to REMOVE ${excess} characters from description`);
        }
      }
    }
    console.log('');
  });
}

// Export as JSON for further processing
const output = {
  total: files.length,
  perfect: perfect.length,
  needsFixes: issues.length,
  issues: issues.map(i => ({
    file: i.file,
    titleLen: i.titleLen,
    titleStatus: i.titleStatus,
    descLen: i.descLen,
    descStatus: i.descStatus,
    seoTitle: i.seoTitle,
    seoDescription: i.seoDesc
  }))
};

fs.writeFileSync(
  '/Users/drshekhar/cerebrum-biology-academy-website/seo-audit-results.json',
  JSON.stringify(output, null, 2)
);

console.log('=== SUMMARY ===');
console.log(`Results saved to: seo-audit-results.json\n`);
