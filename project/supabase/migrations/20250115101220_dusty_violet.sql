/*
  # Initial Schema for Virtual Sports Coaching Platform

  1. New Tables
    - users_profile
      - Extended user profile information
      - Stores fitness goals, experience level, and preferences
    - sessions
      - Coaching session records
      - Tracks session details, type, and performance metrics
    - performance_metrics
      - Detailed performance data for each session
      - Stores AI-generated insights and measurements

  2. Security
    - RLS enabled on all tables
    - Policies for user data protection
*/

-- Users Profile Table
CREATE TABLE users_profile (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT,
  fitness_level TEXT CHECK (fitness_level IN ('beginner', 'intermediate', 'advanced')),
  goals TEXT[],
  preferred_sports TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users_profile
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users_profile
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Sessions Table
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  sport_type TEXT NOT NULL,
  session_date TIMESTAMPTZ DEFAULT now(),
  duration INTEGER, -- in minutes
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  ai_feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own sessions"
  ON sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own sessions"
  ON sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Performance Metrics Table
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  metric_type TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT now(),
  ai_analysis TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own performance metrics"
  ON performance_metrics
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM sessions 
      WHERE sessions.id = performance_metrics.session_id 
      AND sessions.user_id = auth.uid()
    )
  );

-- Indexes for better query performance
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_performance_metrics_session_id ON performance_metrics(session_id);