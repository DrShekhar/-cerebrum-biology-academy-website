-- Cerebrum Biology Academy - Scalable Database Schema
-- Optimized for millions of students with sub-second query performance
-- PostgreSQL with advanced indexing and partitioning strategies

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- ================================================================
-- CORE USER MANAGEMENT TABLES
-- ================================================================

-- Students table with horizontal partitioning by registration date
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    name VARCHAR(255) NOT NULL,
    grade INTEGER CHECK (grade BETWEEN 11 AND 12),
    registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium', 'unlimited')),
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    neet_target_year INTEGER,
    preferred_language VARCHAR(10) DEFAULT 'english' CHECK (preferred_language IN ('english', 'hindi', 'hinglish')),
    learning_style VARCHAR(20) DEFAULT 'mixed' CHECK (learning_style IN ('visual', 'auditory', 'kinesthetic', 'reading', 'mixed')),
    current_streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    total_study_time_minutes INTEGER DEFAULT 0,
    neet_mock_score INTEGER DEFAULT 0,
    weak_topics TEXT[], -- Array of topic slugs
    strong_topics TEXT[], -- Array of topic slugs
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    referral_code VARCHAR(10) UNIQUE,
    referred_by UUID REFERENCES students(id),
    total_referrals INTEGER DEFAULT 0
) PARTITION BY RANGE (registration_date);

-- Create partitions for students table (by year-month for optimal performance)
CREATE TABLE students_2024 PARTITION OF students
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE students_2025 PARTITION OF students
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- Indexes for students table
CREATE INDEX idx_students_email ON students USING hash (email);
CREATE INDEX idx_students_phone ON students USING hash (phone);
CREATE INDEX idx_students_tier_active ON students (subscription_tier, is_active) WHERE is_active = true;
CREATE INDEX idx_students_last_active ON students (last_active_at) WHERE is_active = true;
CREATE INDEX idx_students_referral ON students (referral_code) WHERE referral_code IS NOT NULL;
CREATE INDEX idx_students_neet_score ON students (neet_mock_score DESC) WHERE neet_mock_score > 0;
CREATE INDEX idx_students_topics_gin ON students USING gin (weak_topics, strong_topics);

-- ================================================================
-- CONTENT MANAGEMENT TABLES
-- ================================================================

-- Biology topics hierarchy
CREATE TABLE topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES topics(id),
    level INTEGER NOT NULL DEFAULT 1, -- 1=chapter, 2=subtopic, 3=concept
    difficulty VARCHAR(20) DEFAULT 'intermediate' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    neet_importance INTEGER DEFAULT 5 CHECK (neet_importance BETWEEN 1 AND 10),
    ncert_chapter VARCHAR(100),
    ncert_page_range VARCHAR(20),
    estimated_study_time_minutes INTEGER DEFAULT 30,
    prerequisite_topics UUID[],
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for topics
CREATE INDEX idx_topics_slug ON topics (slug);
CREATE INDEX idx_topics_parent ON topics (parent_id) WHERE parent_id IS NOT NULL;
CREATE INDEX idx_topics_level_active ON topics (level, is_active) WHERE is_active = true;
CREATE INDEX idx_topics_difficulty ON topics (difficulty, neet_importance DESC);
CREATE INDEX idx_topics_prerequisites_gin ON topics USING gin (prerequisite_topics);

-- Questions bank with partitioning by topic for better performance
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID NOT NULL REFERENCES topics(id),
    question_text TEXT NOT NULL,
    question_type VARCHAR(20) DEFAULT 'mcq' CHECK (question_type IN ('mcq', 'assertion', 'numerical', 'descriptive')),
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    options JSONB, -- For MCQ options
    correct_answer TEXT NOT NULL,
    explanation TEXT,
    solution_steps JSONB, -- Array of solution steps
    neet_year INTEGER, -- Which NEET year this appeared
    source VARCHAR(100), -- NCERT, Previous Year, Mock Test, etc.
    marks INTEGER DEFAULT 4,
    estimated_time_seconds INTEGER DEFAULT 60,
    image_url TEXT,
    tags TEXT[],
    created_by UUID REFERENCES students(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
) PARTITION BY HASH (topic_id);

-- Create hash partitions for questions (8 partitions for even distribution)
CREATE TABLE questions_0 PARTITION OF questions FOR VALUES WITH (MODULUS 8, REMAINDER 0);
CREATE TABLE questions_1 PARTITION OF questions FOR VALUES WITH (MODULUS 8, REMAINDER 1);
CREATE TABLE questions_2 PARTITION OF questions FOR VALUES WITH (MODULUS 8, REMAINDER 2);
CREATE TABLE questions_3 PARTITION OF questions FOR VALUES WITH (MODULUS 8, REMAINDER 3);
CREATE TABLE questions_4 PARTITION OF questions FOR VALUES WITH (MODULUS 8, REMAINDER 4);
CREATE TABLE questions_5 PARTITION OF questions FOR VALUES WITH (MODULUS 8, REMAINDER 5);
CREATE TABLE questions_6 PARTITION OF questions FOR VALUES WITH (MODULUS 8, REMAINDER 6);
CREATE TABLE questions_7 PARTITION OF questions FOR VALUES WITH (MODULUS 8, REMAINDER 7);

-- Indexes for questions
CREATE INDEX idx_questions_topic_difficulty ON questions (topic_id, difficulty, is_active) WHERE is_active = true;
CREATE INDEX idx_questions_neet_year ON questions (neet_year DESC) WHERE neet_year IS NOT NULL;
CREATE INDEX idx_questions_source ON questions (source) WHERE is_active = true;
CREATE INDEX idx_questions_tags_gin ON questions USING gin (tags);
CREATE INDEX idx_questions_fulltext ON questions USING gin (to_tsvector('english', question_text || ' ' || COALESCE(explanation, '')));

-- ================================================================
-- STUDENT ACTIVITY TRACKING
-- ================================================================

-- Student question attempts with time-series optimization
CREATE TABLE student_question_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL,
    question_id UUID NOT NULL,
    attempt_date DATE NOT NULL DEFAULT CURRENT_DATE,
    attempt_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    selected_answer TEXT,
    is_correct BOOLEAN NOT NULL,
    time_taken_seconds INTEGER,
    hints_used INTEGER DEFAULT 0,
    attempt_number INTEGER DEFAULT 1, -- For retry tracking
    source VARCHAR(50) DEFAULT 'practice', -- practice, test, quiz, daily_challenge
    session_id UUID, -- Group related attempts
    ip_address INET,
    user_agent TEXT,
    UNIQUE(student_id, question_id, attempt_number)
) PARTITION BY RANGE (attempt_date);

-- Create monthly partitions for attempts (hot data optimization)
CREATE TABLE student_question_attempts_2024_12 PARTITION OF student_question_attempts
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

CREATE TABLE student_question_attempts_2025_01 PARTITION OF student_question_attempts
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Indexes for attempts
CREATE INDEX idx_attempts_student_date ON student_question_attempts (student_id, attempt_date DESC);
CREATE INDEX idx_attempts_question_correct ON student_question_attempts (question_id, is_correct);
CREATE INDEX idx_attempts_session ON student_question_attempts (session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_attempts_timestamp ON student_question_attempts (attempt_timestamp DESC);

-- Study sessions tracking
CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id),
    session_date DATE NOT NULL DEFAULT CURRENT_DATE,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    duration_minutes INTEGER,
    topics_studied UUID[],
    questions_attempted INTEGER DEFAULT 0,
    questions_correct INTEGER DEFAULT 0,
    session_type VARCHAR(30) DEFAULT 'self_study' CHECK (session_type IN ('self_study', 'live_class', 'mock_test', 'revision', 'doubt_clearing')),
    platform VARCHAR(20) DEFAULT 'web' CHECK (platform IN ('web', 'mobile', 'whatsapp')),
    is_completed BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
) PARTITION BY RANGE (session_date);

-- Create monthly partitions for study sessions
CREATE TABLE study_sessions_2024_12 PARTITION OF study_sessions
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

CREATE TABLE study_sessions_2025_01 PARTITION OF study_sessions
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Indexes for study sessions
CREATE INDEX idx_sessions_student_date ON study_sessions (student_id, session_date DESC);
CREATE INDEX idx_sessions_type_completed ON study_sessions (session_type, is_completed);
CREATE INDEX idx_sessions_topics_gin ON study_sessions USING gin (topics_studied);

-- ================================================================
-- AI AND INTERACTION TRACKING
-- ================================================================

-- AI conversation history with efficient storage
CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL,
    conversation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    message_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    role VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'audio', 'file')),
    ai_provider VARCHAR(20) CHECK (ai_provider IN ('claude', 'gpt4', 'gpt3.5', 'dalle')),
    tokens_used INTEGER,
    cost_cents INTEGER, -- Store cost in cents for precision
    topic_id UUID REFERENCES topics(id),
    language VARCHAR(10) DEFAULT 'english',
    session_id UUID,
    context_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
) PARTITION BY RANGE (conversation_date);

-- Create monthly partitions for AI conversations
CREATE TABLE ai_conversations_2024_12 PARTITION OF ai_conversations
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

CREATE TABLE ai_conversations_2025_01 PARTITION OF ai_conversations
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Indexes for AI conversations
CREATE INDEX idx_conversations_student_date ON ai_conversations (student_id, conversation_date DESC);
CREATE INDEX idx_conversations_provider_cost ON ai_conversations (ai_provider, cost_cents DESC) WHERE ai_provider IS NOT NULL;
CREATE INDEX idx_conversations_topic ON ai_conversations (topic_id) WHERE topic_id IS NOT NULL;
CREATE INDEX idx_conversations_session ON ai_conversations (session_id) WHERE session_id IS NOT NULL;
CREATE INDEX idx_conversations_fulltext ON ai_conversations USING gin (to_tsvector('english', content));

-- Credit usage tracking
CREATE TABLE credit_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    transaction_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('usage', 'purchase', 'bonus', 'refund', 'adjustment')),
    credits_amount INTEGER NOT NULL, -- Positive for additions, negative for usage
    cost_cents INTEGER DEFAULT 0,
    description TEXT,
    ai_provider VARCHAR(20),
    tokens_used INTEGER,
    reference_id UUID, -- Reference to conversation, question attempt, etc.
    balance_after INTEGER, -- Running balance for audit
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
) PARTITION BY RANGE (transaction_date);

-- Create monthly partitions for credit transactions
CREATE TABLE credit_transactions_2024_12 PARTITION OF credit_transactions
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

CREATE TABLE credit_transactions_2025_01 PARTITION OF credit_transactions
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Indexes for credit transactions
CREATE INDEX idx_credits_student_date ON credit_transactions (student_id, transaction_date DESC);
CREATE INDEX idx_credits_type_amount ON credit_transactions (transaction_type, credits_amount);
CREATE INDEX idx_credits_provider ON credit_transactions (ai_provider) WHERE ai_provider IS NOT NULL;

-- ================================================================
-- COLLABORATION FEATURES
-- ================================================================

-- Study rooms for collaborative learning
CREATE TABLE study_rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    topic_id UUID REFERENCES topics(id),
    created_by UUID NOT NULL REFERENCES students(id),
    max_participants INTEGER DEFAULT 8,
    current_participants INTEGER DEFAULT 0,
    room_type VARCHAR(20) DEFAULT 'public' CHECK (room_type IN ('public', 'private', 'invite_only')),
    difficulty_level VARCHAR(20) DEFAULT 'mixed' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced', 'mixed')),
    language VARCHAR(10) DEFAULT 'english',
    is_active BOOLEAN DEFAULT true,
    scheduled_start TIMESTAMP WITH TIME ZONE,
    scheduled_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for study rooms
CREATE INDEX idx_rooms_active_topic ON study_rooms (is_active, topic_id) WHERE is_active = true;
CREATE INDEX idx_rooms_type_language ON study_rooms (room_type, language) WHERE is_active = true;
CREATE INDEX idx_rooms_created_by ON study_rooms (created_by);

-- Study room participants
CREATE TABLE study_room_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES study_rooms(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id),
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    left_at TIMESTAMP WITH TIME ZONE,
    role VARCHAR(20) DEFAULT 'participant' CHECK (role IN ('participant', 'moderator', 'creator')),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(room_id, student_id)
);

-- Indexes for study room participants
CREATE INDEX idx_room_participants_room ON study_room_participants (room_id, is_active) WHERE is_active = true;
CREATE INDEX idx_room_participants_student ON study_room_participants (student_id, is_active) WHERE is_active = true;

-- ================================================================
-- ANALYTICS AND AGGREGATION TABLES
-- ================================================================

-- Daily student statistics (pre-aggregated for performance)
CREATE TABLE daily_student_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL,
    stat_date DATE NOT NULL,
    questions_attempted INTEGER DEFAULT 0,
    questions_correct INTEGER DEFAULT 0,
    study_time_minutes INTEGER DEFAULT 0,
    topics_studied INTEGER DEFAULT 0,
    ai_queries_count INTEGER DEFAULT 0,
    ai_cost_cents INTEGER DEFAULT 0,
    streak_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, stat_date)
) PARTITION BY RANGE (stat_date);

-- Create monthly partitions for daily stats
CREATE TABLE daily_student_stats_2024_12 PARTITION OF daily_student_stats
    FOR VALUES FROM ('2024-12-01') TO ('2025-01-01');

CREATE TABLE daily_student_stats_2025_01 PARTITION OF daily_student_stats
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

-- Indexes for daily stats
CREATE INDEX idx_daily_stats_student_date ON daily_student_stats (student_id, stat_date DESC);
CREATE INDEX idx_daily_stats_date_performance ON daily_student_stats (stat_date, questions_correct DESC);

-- Topic performance aggregation
CREATE TABLE topic_performance_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID NOT NULL REFERENCES topics(id),
    student_id UUID NOT NULL REFERENCES students(id),
    total_attempts INTEGER DEFAULT 0,
    correct_attempts INTEGER DEFAULT 0,
    accuracy_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE WHEN total_attempts > 0
        THEN ROUND((correct_attempts::DECIMAL / total_attempts) * 100, 2)
        ELSE 0
        END
    ) STORED,
    average_time_seconds INTEGER,
    last_attempt_date DATE,
    mastery_level VARCHAR(20) DEFAULT 'beginner' CHECK (mastery_level IN ('beginner', 'developing', 'proficient', 'advanced')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(topic_id, student_id)
);

-- Indexes for topic performance
CREATE INDEX idx_topic_performance_student ON topic_performance_stats (student_id, accuracy_percentage DESC);
CREATE INDEX idx_topic_performance_topic ON topic_performance_stats (topic_id, accuracy_percentage DESC);
CREATE INDEX idx_topic_performance_mastery ON topic_performance_stats (mastery_level, updated_at DESC);

-- ================================================================
-- TRIGGERS FOR AUTOMATION
-- ================================================================

-- Update student updated_at timestamp
CREATE OR REPLACE FUNCTION update_student_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_student_timestamp();

-- Update topic performance stats when new attempt is made
CREATE OR REPLACE FUNCTION update_topic_performance()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO topic_performance_stats (topic_id, student_id, total_attempts, correct_attempts, average_time_seconds, last_attempt_date)
    SELECT
        q.topic_id,
        NEW.student_id,
        1,
        CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
        NEW.time_taken_seconds,
        NEW.attempt_date
    FROM questions q
    WHERE q.id = NEW.question_id
    ON CONFLICT (topic_id, student_id) DO UPDATE SET
        total_attempts = topic_performance_stats.total_attempts + 1,
        correct_attempts = topic_performance_stats.correct_attempts + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
        average_time_seconds = (topic_performance_stats.average_time_seconds * topic_performance_stats.total_attempts + NEW.time_taken_seconds) / (topic_performance_stats.total_attempts + 1),
        last_attempt_date = NEW.attempt_date,
        updated_at = NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_topic_performance
    AFTER INSERT ON student_question_attempts
    FOR EACH ROW
    EXECUTE FUNCTION update_topic_performance();

-- Update daily stats
CREATE OR REPLACE FUNCTION update_daily_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO daily_student_stats (student_id, stat_date, questions_attempted, questions_correct)
    VALUES (
        NEW.student_id,
        NEW.attempt_date,
        1,
        CASE WHEN NEW.is_correct THEN 1 ELSE 0 END
    )
    ON CONFLICT (student_id, stat_date) DO UPDATE SET
        questions_attempted = daily_student_stats.questions_attempted + 1,
        questions_correct = daily_student_stats.questions_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_daily_stats
    AFTER INSERT ON student_question_attempts
    FOR EACH ROW
    EXECUTE FUNCTION update_daily_stats();

-- ================================================================
-- PERFORMANCE OPTIMIZATION VIEWS
-- ================================================================

-- High-performance view for student dashboard
CREATE VIEW student_dashboard_view AS
SELECT
    s.id,
    s.name,
    s.email,
    s.subscription_tier,
    s.current_streak,
    s.max_streak,
    s.neet_mock_score,
    COALESCE(ds.questions_attempted, 0) as today_questions,
    COALESCE(ds.questions_correct, 0) as today_correct,
    COALESCE(ds.study_time_minutes, 0) as today_study_time,
    (
        SELECT COUNT(*)
        FROM topic_performance_stats tps
        WHERE tps.student_id = s.id AND tps.mastery_level = 'advanced'
    ) as mastered_topics,
    (
        SELECT COUNT(*)
        FROM topic_performance_stats tps
        WHERE tps.student_id = s.id AND tps.accuracy_percentage < 50
    ) as weak_topics_count
FROM students s
LEFT JOIN daily_student_stats ds ON s.id = ds.student_id AND ds.stat_date = CURRENT_DATE
WHERE s.is_active = true;

-- Topic difficulty analysis view
CREATE VIEW topic_difficulty_analysis AS
SELECT
    t.id,
    t.title,
    t.difficulty,
    COUNT(sqa.id) as total_attempts,
    COUNT(CASE WHEN sqa.is_correct THEN 1 END) as correct_attempts,
    ROUND(
        COUNT(CASE WHEN sqa.is_correct THEN 1 END)::DECIMAL /
        NULLIF(COUNT(sqa.id), 0) * 100, 2
    ) as success_rate,
    AVG(sqa.time_taken_seconds) as avg_time_seconds
FROM topics t
LEFT JOIN questions q ON t.id = q.topic_id
LEFT JOIN student_question_attempts sqa ON q.id = sqa.question_id
WHERE t.is_active = true
GROUP BY t.id, t.title, t.difficulty;

-- ================================================================
-- MAINTENANCE PROCEDURES
-- ================================================================

-- Procedure to create new monthly partitions
CREATE OR REPLACE FUNCTION create_monthly_partition(table_name TEXT, start_date DATE)
RETURNS VOID AS $$
DECLARE
    partition_name TEXT;
    end_date DATE;
BEGIN
    end_date := start_date + INTERVAL '1 month';
    partition_name := table_name || '_' || TO_CHAR(start_date, 'YYYY_MM');

    EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF %I FOR VALUES FROM (%L) TO (%L)',
                   partition_name, table_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;

-- Procedure to drop old partitions (data retention)
CREATE OR REPLACE FUNCTION drop_old_partitions(table_name TEXT, months_to_keep INTEGER)
RETURNS VOID AS $$
DECLARE
    cutoff_date DATE;
    partition_record RECORD;
BEGIN
    cutoff_date := CURRENT_DATE - INTERVAL '1 month' * months_to_keep;

    FOR partition_record IN
        SELECT schemaname, tablename
        FROM pg_tables
        WHERE tablename LIKE table_name || '_%'
        AND tablename < table_name || '_' || TO_CHAR(cutoff_date, 'YYYY_MM')
    LOOP
        EXECUTE format('DROP TABLE IF EXISTS %I.%I', partition_record.schemaname, partition_record.tablename);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- INITIAL DATA SETUP
-- ================================================================

-- Insert sample topics hierarchy
INSERT INTO topics (slug, title, description, level, difficulty, neet_importance, ncert_chapter) VALUES
('cell-biology', 'Cell Biology', 'Fundamental unit of life', 1, 'intermediate', 9, 'Chapter 8'),
('cell-structure', 'Cell Structure and Functions', 'Components and organelles of cell', 2, 'intermediate', 8, 'Chapter 8'),
('cell-membrane', 'Cell Membrane', 'Structure and function of cell membrane', 3, 'beginner', 7, 'Chapter 8'),
('photosynthesis', 'Photosynthesis', 'Process of food synthesis in plants', 1, 'advanced', 10, 'Chapter 13'),
('light-reactions', 'Light Reactions', 'Photo-chemical phase of photosynthesis', 2, 'advanced', 9, 'Chapter 13'),
('genetics', 'Genetics and Heredity', 'Principles of inheritance', 1, 'advanced', 10, 'Chapter 5'),
('mendel-laws', 'Mendels Laws', 'Laws of inheritance', 2, 'intermediate', 9, 'Chapter 5');

-- Create indexes on frequently queried columns for optimal performance
CREATE INDEX CONCURRENTLY idx_students_email_active ON students (email) WHERE is_active = true;
CREATE INDEX CONCURRENTLY idx_topics_neet_importance ON topics (neet_importance DESC, difficulty);
CREATE INDEX CONCURRENTLY idx_questions_topic_difficulty ON questions (topic_id, difficulty) WHERE is_active = true;

-- Enable row-level security (RLS) for data protection
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY student_own_data ON students FOR ALL TO app_user USING (id = current_setting('app.current_student_id')::UUID);
CREATE POLICY student_own_conversations ON ai_conversations FOR ALL TO app_user USING (student_id = current_setting('app.current_student_id')::UUID);
CREATE POLICY student_own_credits ON credit_transactions FOR ALL TO app_user USING (student_id = current_setting('app.current_student_id')::UUID);

-- ================================================================
-- PERFORMANCE MONITORING
-- ================================================================

-- Enable query performance tracking
SELECT pg_stat_statements_reset();

-- Create monitoring view for slow queries
CREATE VIEW slow_queries AS
SELECT
    query,
    calls,
    total_time,
    mean_time,
    stddev_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements
WHERE mean_time > 100  -- Queries taking more than 100ms on average
ORDER BY mean_time DESC;

COMMENT ON SCHEMA public IS 'Cerebrum Biology Academy - Scalable Database Schema optimized for millions of students with sub-second query performance';