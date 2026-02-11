const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(process.cwd(), 'content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

const issues = {
  critical: [],
  high: [],
  medium: [],
  low: [],
  yamlErrors: []
};

let totalScore = 0;
const blogScores = [];
let processedCount = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  let frontmatter, body;
  try {
    const parsed = matter(content);
    frontmatter = parsed.data;
    body = parsed.content;
  } catch (err) {
    issues.yamlErrors.push(`${file}: ${err.message.split('\n')[0]}`);
    issues.critical.push(`${file}: YAML parsing error - needs manual fix`);
    blogScores.push({ file, score: 0, issues: ['CRITICAL: YAML syntax error'] });
    return;
  }
  
  let score = 100;
  const blogIssues = [];
  
  // 1. METADATA COMPLETENESS
  const requiredFields = ['title', 'excerpt', 'author', 'category', 'tags', 'featuredImage', 'publishedAt', 'readTime', 'seoTitle', 'seoDescription'];
  requiredFields.forEach(field => {
    if (!frontmatter[field]) {
      score -= 1;
      blogIssues.push(`Missing ${field}`);
      issues.critical.push(`${file}: Missing '${field}'`);
    }
  });
  
  // 2. SEO OPTIMIZATION
  if (frontmatter.seoTitle) {
    const titleLen = frontmatter.seoTitle.length;
    if (titleLen < 55 || titleLen > 60) {
      score -= 2;
      issues.high.push(`${file}: SEO title ${titleLen} chars`);
    }
  }
  
  if (frontmatter.seoDescription) {
    const descLen = frontmatter.seoDescription.length;
    if (descLen < 155 || descLen > 160) {
      score -= 2;
      issues.high.push(`${file}: SEO desc ${descLen} chars`);
    }
  }
  
  // 3. AUTHOR
  if (frontmatter.author?.name !== 'Dr. Shekhar') {
    score -= 2;
    issues.medium.push(`${file}: Author name`);
  }
  
  // 4. DATE
  if (frontmatter.publishedAt && !frontmatter.publishedAt.startsWith('2026')) {
    score -= 5;
    issues.high.push(`${file}: Date ${frontmatter.publishedAt}`);
  }
  
  // 5. AI SIGNATURES
  const aiSigs = ['As an AI', 'language model', 'ChatGPT', 'Claude'];
  aiSigs.forEach(sig => {
    if (body.includes(sig)) {
      score -= 10;
      issues.critical.push(`${file}: AI signature "${sig}"`);
    }
  });
  
  // 6. PLACEHOLDERS
  if (body.match(/TODO|XXXX|\[Insert/i)) {
    score -= 5;
    issues.high.push(`${file}: Placeholder content`);
  }
  
  // 7. WORD COUNT
  const wordCount = body.split(/\s+/).length;
  if (wordCount < 1000) {
    score -= 5;
    issues.high.push(`${file}: Only ${wordCount} words`);
  }
  
  // 8. STRUCTURE
  if (!body.includes('## ')) {
    score -= 2;
    issues.medium.push(`${file}: No H2 headings`);
  }
  
  // 9. IMAGE
  if (frontmatter.featuredImage === '/blog/placeholder.webp') {
    score -= 10;
    issues.critical.push(`${file}: Placeholder image`);
  }
  
  blogScores.push({ file, score: Math.max(0, score), issues: blogIssues });
  totalScore += Math.max(0, score);
  processedCount++;
});

const avgScore = processedCount > 0 ? (totalScore / processedCount).toFixed(1) : 0;

console.log('\n========================================');
console.log('   COMPREHENSIVE BLOG AUDIT REPORT');
console.log('========================================\n');
console.log(`Total Blogs: ${files.length}`);
console.log(`Processed: ${processedCount}`);
console.log(`YAML Errors: ${issues.yamlErrors.length}`);
console.log(`Average Score: ${avgScore}/100\n`);

console.log('ISSUES SUMMARY:');
console.log(`  🔴 Critical: ${issues.critical.length}`);
console.log(`  🟠 High: ${issues.high.length}`);
console.log(`  🟡 Medium: ${issues.medium.length}`);
console.log(`  ⚪ Low: ${issues.low.length}\n`);

const excellent = blogScores.filter(b => b.score >= 90).length;
const good = blogScores.filter(b => b.score >= 80 && b.score < 90).length;
const needsWork = blogScores.filter(b => b.score >= 70 && b.score < 80).length;
const poor = blogScores.filter(b => b.score < 70).length;

console.log('SCORE DISTRIBUTION:');
console.log(`  🟢 90-100 (Excellent): ${excellent}`);
console.log(`  🔵 80-89 (Good): ${good}`);
console.log(`  🟡 70-79 (Needs Work): ${needsWork}`);
console.log(`  🔴 <70 (Poor): ${poor}\n`);

if (issues.yamlErrors.length > 0) {
  console.log('🔴 YAML SYNTAX ERRORS (Must Fix First):');
  issues.yamlErrors.forEach((err, i) => console.log(`  ${i+1}. ${err}`));
  console.log('');
}

console.log('TOP 10 CRITICAL ISSUES:');
issues.critical.slice(0, 10).forEach((issue, i) => {
  console.log(`  ${i+1}. ${issue}`);
});

console.log('\n✅ Full report: COMPREHENSIVE_BLOG_AUDIT.json\n');

fs.writeFileSync('COMPREHENSIVE_BLOG_AUDIT.json', JSON.stringify({
  summary: {
    totalBlogs: files.length,
    processed: processedCount,
    averageScore: avgScore,
    distribution: { excellent, good, needsWork, poor }
  },
  issues,
  blogScores: blogScores.sort((a, b) => a.score - b.score)
}, null, 2));
