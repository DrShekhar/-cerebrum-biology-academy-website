const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const audit = require('./COMPREHENSIVE_BLOG_AUDIT.json');

// Find specific fixable issues
const fixes = {
  missingMetadata: [],
  aiSignatures: [],
  seoTitleLength: [],
  seoDescLength: [],
  wrongDates: []
};

audit.issues.critical.forEach(issue => {
  const [file, problem] = issue.split(': ');
  if (problem.includes('Missing')) {
    const field = problem.match(/'([^']+)'/)?.[1];
    fixes.missingMetadata.push({ file, field });
  } else if (problem.includes('AI signature')) {
    fixes.aiSignatures.push({ file, signature: problem.match(/"([^"]+)"/)?.[1] });
  }
});

audit.issues.high.forEach(issue => {
  const [file, problem] = issue.split(': ');
  if (problem.includes('SEO title')) {
    const chars = parseInt(problem.match(/(\d+) chars/)?.[1]);
    fixes.seoTitleLength.push({ file, currentLength: chars });
  } else if (problem.includes('SEO desc')) {
    const chars = parseInt(problem.match(/(\d+) chars/)?.[1]);
    fixes.seoDescLength.push({ file, currentLength: chars });
  } else if (problem.includes('Date')) {
    fixes.wrongDates.push({ file, date: problem.split(' ')[1] });
  }
});

console.log('\n📋 FIXABLE ISSUES BREAKDOWN:\n');
console.log(`Missing Metadata: ${fixes.missingMetadata.length} instances`);
console.log(`  - ${fixes.missingMetadata.filter(f => f.field === 'publishedAt').length} missing publishedAt`);
console.log(`  - ${fixes.missingMetadata.filter(f => f.field === 'featuredImage').length} missing featuredImage`);
console.log(`  - ${fixes.missingMetadata.filter(f => f.field === 'readTime').length} missing readTime`);
console.log(`\nAI Signatures: ${fixes.aiSignatures.length} blogs`);
console.log(`SEO Title Length: ${fixes.seoTitleLength.length} blogs`);
console.log(`SEO Description Length: ${fixes.seoDescLength.length} blogs`);
console.log(`Wrong Dates: ${fixes.wrongDates.length} blogs\n`);

// Save fix list
fs.writeFileSync('BLOGS_TO_FIX.json', JSON.stringify(fixes, null, 2));
console.log('✅ Saved detailed fix list to BLOGS_TO_FIX.json\n');
