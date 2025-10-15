-- 📊 Common Supabase Queries for XOVA Platform

-- ============================================
-- USER MANAGEMENT QUERIES
-- ============================================

-- Get total number of users
SELECT COUNT(*) as total_users 
FROM auth.users;

-- Get users who signed up today
SELECT email, created_at 
FROM auth.users 
WHERE created_at >= CURRENT_DATE 
ORDER BY created_at DESC;

-- Get users with completed profiles
SELECT 
  u.email,
  p.age,
  p.gender,
  p.activity_level,
  p.created_at as profile_created_at
FROM auth.users u
JOIN profiles p ON u.id = p.user_id
ORDER BY p.created_at DESC;

-- Get users without profiles (need to complete profile builder)
SELECT 
  u.id,
  u.email,
  u.created_at
FROM auth.users u
LEFT JOIN profiles p ON u.id = p.user_id
WHERE p.id IS NULL
ORDER BY u.created_at DESC;

-- ============================================
-- SMOOTHIE ANALYTICS
-- ============================================

-- Most popular smoothies (by generation count)
SELECT 
  name,
  COUNT(*) as generation_count,
  AVG(health_score) as avg_health_score
FROM smoothies
GROUP BY name
ORDER BY generation_count DESC
LIMIT 20;

-- Smoothies generated per day (last 30 days)
SELECT 
  DATE(created_at) as date,
  COUNT(*) as smoothies_generated
FROM smoothies
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- User's smoothie generation history
-- Replace 'user_email@example.com' with actual email
SELECT 
  s.name,
  s.health_score,
  s.created_at
FROM smoothies s
JOIN auth.users u ON s.user_id = u.id
WHERE u.email = 'user_email@example.com'
ORDER BY s.created_at DESC;

-- ============================================
-- FAVORITES ANALYTICS
-- ============================================

-- Most favorited smoothies
SELECT 
  s.name,
  COUNT(f.id) as favorite_count
FROM smoothies s
JOIN favorites f ON s.id = f.smoothie_id
GROUP BY s.id, s.name
ORDER BY favorite_count DESC
LIMIT 20;

-- Users with most favorites
SELECT 
  u.email,
  COUNT(f.id) as favorite_count
FROM auth.users u
JOIN favorites f ON u.id = f.user_id
GROUP BY u.id, u.email
ORDER BY favorite_count DESC
LIMIT 20;

-- ============================================
-- DELIVERY ANALYTICS
-- ============================================

-- Total delivery revenue by week
SELECT 
  DATE_TRUNC('week', order_date) as week,
  COUNT(*) as order_count,
  SUM(total_cost) as total_revenue,
  AVG(total_cost) as avg_order_value
FROM delivery_orders
GROUP BY DATE_TRUNC('week', order_date)
ORDER BY week DESC;

-- Delivery orders by status
SELECT 
  status,
  COUNT(*) as order_count,
  SUM(total_cost) as total_value
FROM delivery_orders
GROUP BY status
ORDER BY order_count DESC;

-- Average smoothies per delivery order
SELECT 
  AVG(jsonb_array_length(smoothies)) as avg_smoothies_per_order,
  MIN(jsonb_array_length(smoothies)) as min_smoothies,
  MAX(jsonb_array_length(smoothies)) as max_smoothies
FROM delivery_orders;

-- Pending deliveries (need attention)
SELECT 
  d.id,
  u.email,
  d.delivery_date,
  d.total_cost,
  jsonb_array_length(d.smoothies) as smoothie_count
FROM delivery_orders d
JOIN auth.users u ON d.user_id = u.id
WHERE d.status = 'pending'
  AND d.delivery_date >= CURRENT_DATE
ORDER BY d.delivery_date ASC;

-- ============================================
-- CHECK-IN ANALYTICS
-- ============================================

-- Average wellness scores by day of week
SELECT 
  TO_CHAR(date, 'Day') as day_of_week,
  AVG(energy_level) as avg_energy,
  AVG(stress_level) as avg_stress,
  AVG(sleep_quality) as avg_sleep,
  COUNT(*) as check_in_count
FROM check_ins
WHERE date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY TO_CHAR(date, 'Day'), EXTRACT(DOW FROM date)
ORDER BY EXTRACT(DOW FROM date);

-- User check-in streak (consecutive days)
WITH user_check_ins AS (
  SELECT 
    user_id,
    date,
    LAG(date) OVER (PARTITION BY user_id ORDER BY date) as prev_date
  FROM check_ins
)
SELECT 
  u.email,
  COUNT(*) as total_check_ins,
  MAX(uc.date) as last_check_in
FROM user_check_ins uc
JOIN auth.users u ON uc.user_id = u.id
GROUP BY u.email
ORDER BY total_check_ins DESC
LIMIT 20;

-- ============================================
-- ANALYTICS EVENTS
-- ============================================

-- Event types breakdown (last 7 days)
SELECT 
  event_type,
  COUNT(*) as event_count
FROM analytics_events
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY event_type
ORDER BY event_count DESC;

-- User activity timeline
-- Replace 'user_email@example.com' with actual email
SELECT 
  ae.event_type,
  ae.event_data,
  ae.created_at
FROM analytics_events ae
JOIN auth.users u ON ae.user_id = u.id
WHERE u.email = 'user_email@example.com'
ORDER BY ae.created_at DESC
LIMIT 50;

-- Daily active users (last 30 days)
SELECT 
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as active_users
FROM analytics_events
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- HEALTH PROFILE ANALYTICS
-- ============================================

-- Most common health goals
SELECT 
  unnest(health_goals) as goal,
  COUNT(*) as user_count
FROM profiles
GROUP BY goal
ORDER BY user_count DESC;

-- Most common dietary restrictions
SELECT 
  unnest(dietary_restrictions) as restriction,
  COUNT(*) as user_count
FROM profiles
GROUP BY restriction
ORDER BY user_count DESC;

-- Activity level distribution
SELECT 
  activity_level,
  COUNT(*) as user_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM profiles
GROUP BY activity_level
ORDER BY user_count DESC;

-- Age distribution
SELECT 
  CASE 
    WHEN age < 20 THEN '< 20'
    WHEN age < 30 THEN '20-29'
    WHEN age < 40 THEN '30-39'
    WHEN age < 50 THEN '40-49'
    WHEN age < 60 THEN '50-59'
    ELSE '60+'
  END as age_group,
  COUNT(*) as user_count
FROM profiles
GROUP BY age_group
ORDER BY age_group;

-- ============================================
-- REVENUE ANALYTICS
-- ============================================

-- Total revenue (delivery orders only)
SELECT 
  SUM(total_cost) as total_revenue,
  AVG(total_cost) as avg_order_value,
  COUNT(*) as total_orders
FROM delivery_orders;

-- Revenue by month
SELECT 
  TO_CHAR(order_date, 'YYYY-MM') as month,
  SUM(total_cost) as revenue,
  COUNT(*) as order_count
FROM delivery_orders
GROUP BY TO_CHAR(order_date, 'YYYY-MM')
ORDER BY month DESC;

-- Customer lifetime value (top 20)
SELECT 
  u.email,
  COUNT(d.id) as total_orders,
  SUM(d.total_cost) as lifetime_value,
  MIN(d.order_date) as first_order,
  MAX(d.order_date) as last_order
FROM auth.users u
JOIN delivery_orders d ON u.id = d.user_id
GROUP BY u.id, u.email
ORDER BY lifetime_value DESC
LIMIT 20;

-- ============================================
-- DATA CLEANUP (USE WITH CAUTION!)
-- ============================================

-- Delete test user data (CAREFUL!)
-- Uncomment and replace email to use
/*
DELETE FROM analytics_events 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'test@example.com'
);

DELETE FROM favorites 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'test@example.com'
);

DELETE FROM delivery_orders 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'test@example.com'
);

DELETE FROM check_ins 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'test@example.com'
);

DELETE FROM smoothies 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'test@example.com'
);

DELETE FROM profiles 
WHERE user_id IN (
  SELECT id FROM auth.users WHERE email = 'test@example.com'
);
*/

-- ============================================
-- PERFORMANCE OPTIMIZATION
-- ============================================

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check slow queries (if pg_stat_statements enabled)
-- SELECT * FROM pg_stat_statements 
-- ORDER BY mean_time DESC 
-- LIMIT 10;

-- Analyze table statistics (improves query performance)
ANALYZE profiles;
ANALYZE smoothies;
ANALYZE check_ins;
ANALYZE favorites;
ANALYZE delivery_orders;
ANALYZE analytics_events;
