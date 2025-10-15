-- ✅ XOVA Database Verification Script
-- Run this in Supabase SQL Editor to verify your setup

-- Check 1: Verify all tables exist
SELECT 
  'Tables Check' as test,
  COUNT(*) as table_count,
  CASE 
    WHEN COUNT(*) = 6 THEN '✅ PASS: All 6 tables created'
    ELSE '❌ FAIL: Expected 6 tables, found ' || COUNT(*)
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public'
  AND table_name IN ('profiles', 'smoothies', 'check_ins', 'favorites', 'delivery_orders', 'analytics_events');

-- Check 2: Verify RLS is enabled
SELECT 
  'RLS Check' as test,
  COUNT(*) as rls_enabled_count,
  CASE 
    WHEN COUNT(*) = 6 THEN '✅ PASS: RLS enabled on all tables'
    ELSE '❌ FAIL: RLS not enabled on all tables'
  END as status
FROM pg_tables 
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'smoothies', 'check_ins', 'favorites', 'delivery_orders', 'analytics_events')
  AND rowsecurity = true;

-- Check 3: Verify indexes exist
SELECT 
  'Indexes Check' as test,
  COUNT(DISTINCT indexname) as index_count,
  CASE 
    WHEN COUNT(DISTINCT indexname) >= 10 THEN '✅ PASS: Performance indexes created'
    ELSE '⚠️  WARNING: Some indexes may be missing'
  END as status
FROM pg_indexes 
WHERE schemaname = 'public'
  AND tablename IN ('profiles', 'smoothies', 'check_ins', 'favorites', 'delivery_orders', 'analytics_events');

-- Check 4: Verify RLS policies exist
SELECT 
  'Policies Check' as test,
  COUNT(*) as policy_count,
  CASE 
    WHEN COUNT(*) >= 15 THEN '✅ PASS: RLS policies configured'
    ELSE '❌ FAIL: Missing RLS policies'
  END as status
FROM pg_policies 
WHERE schemaname = 'public';

-- Check 5: List all tables with their columns
SELECT 
  table_name,
  COUNT(column_name) as column_count,
  string_agg(column_name, ', ' ORDER BY ordinal_position) as columns
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('profiles', 'smoothies', 'check_ins', 'favorites', 'delivery_orders', 'analytics_events')
GROUP BY table_name
ORDER BY table_name;

-- Check 6: Verify triggers exist
SELECT 
  'Triggers Check' as test,
  COUNT(*) as trigger_count,
  CASE 
    WHEN COUNT(*) >= 2 THEN '✅ PASS: Timestamp triggers created'
    ELSE '⚠️  WARNING: Some triggers may be missing'
  END as status
FROM pg_trigger
WHERE tgname LIKE '%updated_at%';

-- Summary
SELECT 
  '🎉 Setup Verification Complete' as message,
  'Check the results above for any ❌ FAIL or ⚠️  WARNING status' as action;
