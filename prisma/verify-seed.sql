-- Database Seed Verification Queries
-- Run these queries after seeding to verify data integrity

-- ============================================
-- 1. VERIFY COURSES
-- ============================================

-- Check all courses exist with correct IDs and pricing
SELECT
  id,
  name,
  type,
  class,
  duration,
  "totalFees" / 100 as price_inr,
  "isActive",
  "sortOrder"
FROM courses
ORDER BY "sortOrder";

-- Expected output:
-- id            | name                                          | type      | class     | duration | price_inr | isActive | sortOrder
-- class-11      | Class 11th Biology - Complete NEET Foundation | CLASS_11  | CLASS_11  | 12       | 35000     | t        | 1
-- class-12      | Class 12th Biology - Intensive NEET Prep      | CLASS_12  | CLASS_12  | 12       | 50000     | t        | 2
-- neet-dropper  | NEET Dropper Year Program                     | DROPPER   | DROPPER   | 12       | 72000     | t        | 3


-- ============================================
-- 2. VERIFY PURCHASE PAGE COURSE IDS
-- ============================================

-- Check if all course IDs from purchase page exist
SELECT
  'class-11' as course_id,
  CASE WHEN EXISTS (SELECT 1 FROM courses WHERE id = 'class-11' AND "isActive" = true)
    THEN '✓ EXISTS' ELSE '✗ MISSING' END as status
UNION ALL
SELECT
  'class-12' as course_id,
  CASE WHEN EXISTS (SELECT 1 FROM courses WHERE id = 'class-12' AND "isActive" = true)
    THEN '✓ EXISTS' ELSE '✗ MISSING' END as status
UNION ALL
SELECT
  'neet-dropper' as course_id,
  CASE WHEN EXISTS (SELECT 1 FROM courses WHERE id = 'neet-dropper' AND "isActive" = true)
    THEN '✓ EXISTS' ELSE '✗ MISSING' END as status;


-- ============================================
-- 3. DETAILED COURSE INFORMATION
-- ============================================

-- View complete course details for neet-dropper
SELECT
  id,
  name,
  description,
  type,
  class,
  duration,
  "totalFees" / 100 as price_inr,
  "isActive",
  "createdAt"
FROM courses
WHERE id = 'neet-dropper';


-- ============================================
-- 4. VERIFY QUESTION BANKS
-- ============================================

SELECT
  name,
  category,
  curriculum,
  grade,
  "totalQuestions",
  "activeQuestions",
  "isActive",
  "isPublic"
FROM question_banks
ORDER BY name;


-- ============================================
-- 5. VERIFY QUESTIONS
-- ============================================

-- Count questions by topic and difficulty
SELECT
  topic,
  difficulty,
  COUNT(*) as question_count,
  COUNT(CASE WHEN "isActive" = true THEN 1 END) as active_count
FROM questions
GROUP BY topic, difficulty
ORDER BY topic, difficulty;

-- Total question counts
SELECT
  COUNT(*) as total_questions,
  COUNT(CASE WHEN "isActive" = true THEN 1 END) as active_questions,
  COUNT(CASE WHEN "isVerified" = true THEN 1 END) as verified_questions
FROM questions;


-- ============================================
-- 6. VERIFY TEST TEMPLATES
-- ============================================

SELECT
  title,
  slug,
  type,
  category,
  difficulty,
  "totalQuestions",
  "totalMarks",
  "timeLimit",
  "isPublished",
  "isActive"
FROM test_templates
ORDER BY title;


-- ============================================
-- 7. VERIFY FREE USERS
-- ============================================

SELECT
  name,
  email,
  grade,
  curriculum,
  "totalPoints",
  "studyStreak",
  "totalTestsTaken",
  "averageScore",
  "bestScore"
FROM free_users
ORDER BY name;


-- ============================================
-- 8. VERIFY USER PROGRESS
-- ============================================

-- Count progress records per user
SELECT
  fu.name,
  COUNT(up.id) as progress_records,
  AVG(up.accuracy)::NUMERIC(5,2) as avg_accuracy,
  SUM(up."totalQuestions") as total_questions_attempted
FROM user_progress up
JOIN free_users fu ON up."freeUserId" = fu.id
GROUP BY fu.name
ORDER BY fu.name;


-- ============================================
-- 9. VERIFY TEST SESSIONS
-- ============================================

SELECT
  ts.id,
  fu.name as student_name,
  tt.title as test_title,
  ts.status,
  ts."timeSpent",
  ts."questionsAnswered",
  ts.percentage,
  ts."createdAt"
FROM test_sessions ts
JOIN free_users fu ON ts."freeUserId" = fu.id
JOIN test_templates tt ON ts."testTemplateId" = tt.id
ORDER BY ts."createdAt" DESC;


-- ============================================
-- 10. COMPREHENSIVE VERIFICATION SUMMARY
-- ============================================

SELECT
  'Courses' as entity,
  COUNT(*)::TEXT as count,
  STRING_AGG(id, ', ' ORDER BY "sortOrder") as ids
FROM courses
UNION ALL
SELECT
  'Question Banks' as entity,
  COUNT(*)::TEXT as count,
  STRING_AGG(name, ', ') as names
FROM question_banks
UNION ALL
SELECT
  'Questions' as entity,
  COUNT(*)::TEXT as count,
  'Various topics' as details
FROM questions
UNION ALL
SELECT
  'Test Templates' as entity,
  COUNT(*)::TEXT as count,
  STRING_AGG(slug, ', ') as slugs
FROM test_templates
UNION ALL
SELECT
  'Free Users' as entity,
  COUNT(*)::TEXT as count,
  STRING_AGG(name, ', ') as names
FROM free_users
UNION ALL
SELECT
  'Test Sessions' as entity,
  COUNT(*)::TEXT as count,
  'Sample sessions' as details
FROM test_sessions;


-- ============================================
-- 11. PURCHASE FLOW VALIDATION
-- ============================================

-- Test query that would be used in purchase flow
SELECT
  c.id,
  c.name,
  c.description,
  c."totalFees" / 100 as full_year_price,
  c.duration,
  c."isActive"
FROM courses c
WHERE c.id IN ('class-11', 'class-12', 'neet-dropper')
  AND c."isActive" = true
ORDER BY c."sortOrder";


-- ============================================
-- 12. DATA INTEGRITY CHECKS
-- ============================================

-- Check for NULL values in critical fields
SELECT
  'Courses with NULL totalFees' as check_name,
  COUNT(*) as count
FROM courses
WHERE "totalFees" IS NULL
UNION ALL
SELECT
  'Courses with NULL name' as check_name,
  COUNT(*) as count
FROM courses
WHERE name IS NULL
UNION ALL
SELECT
  'Questions with NULL correctAnswer' as check_name,
  COUNT(*) as count
FROM questions
WHERE "correctAnswer" IS NULL
UNION ALL
SELECT
  'Test Templates with NULL totalQuestions' as check_name,
  COUNT(*) as count
FROM test_templates
WHERE "totalQuestions" IS NULL;

-- All counts should be 0
