-- XOVA DATABASE STATUS CHECK
-- Run this first to see what's currently in your database

-- ==============================================
-- 1. CHECK EXISTING TABLES
-- ==============================================

SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- ==============================================
-- 2. CHECK USER_PROFILES TABLE STRUCTURE
-- ==============================================

SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- ==============================================
-- 3. CHECK IF SUBSCRIPTION_STATUS COLUMN EXISTS
-- ==============================================

SELECT 
  column_name,
  data_type
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
  AND column_name = 'subscription_status'
  AND table_schema = 'public';

-- ==============================================
-- 4. CHECK ALL COLUMNS IN USER_PROFILES
-- ==============================================

SELECT column_name
FROM information_schema.columns 
WHERE table_name = 'user_profiles' 
  AND table_schema = 'public'
ORDER BY ordinal_position;

-- ==============================================
-- 5. CHECK IF ANY POLICIES EXIST
-- ==============================================

SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ==============================================
-- 6. CHECK IF RLS IS ENABLED
-- ==============================================

SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- ==============================================
-- 7. CHECK IF FUNCTIONS EXIST
-- ==============================================

SELECT 
  routine_name,
  routine_type,
  data_type
FROM information_schema.routines 
WHERE routine_schema = 'public'
ORDER BY routine_name;

-- ==============================================
-- 8. CHECK IF TRIGGERS EXIST
-- ==============================================

SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_timing,
  action_statement
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;
