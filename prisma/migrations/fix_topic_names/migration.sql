-- Migration: Normalize topic names to match NCERT syllabus structure
-- Run this manually or via Prisma migrate

-- Merge Cell Biology into Cell Structure and Function
UPDATE questions SET topic = 'Cell Structure and Function' WHERE topic = 'Cell Biology';

-- Merge Evolution into Genetics and Evolution
UPDATE questions SET topic = 'Genetics and Evolution' WHERE topic = 'Evolution';

-- Merge Genetics into Genetics and Evolution
UPDATE questions SET topic = 'Genetics and Evolution' WHERE topic = 'Genetics';

-- Merge Human Health into Biology and Human Welfare
UPDATE questions SET topic = 'Biology and Human Welfare' WHERE topic = 'Human Health';

-- Merge Molecular Biology into Cell Structure and Function
UPDATE questions SET topic = 'Cell Structure and Function' WHERE topic = 'Molecular Biology';

-- Verify the changes
-- SELECT topic, COUNT(*) as count FROM questions WHERE "isActive" = true GROUP BY topic ORDER BY topic;
