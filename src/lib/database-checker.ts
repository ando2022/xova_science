import { supabase } from './supabase';

/**
 * Check if the database is properly set up
 * This helps diagnose issues with Supabase connection and tables
 */
export async function checkDatabaseSetup(): Promise<{
  isConnected: boolean;
  tablesExist: {
    profiles: boolean;
    smoothies: boolean;
    check_ins: boolean;
    favorites: boolean;
    delivery_orders: boolean;
    analytics_events: boolean;
  };
  userAuthenticated: boolean;
  errors: string[];
}> {
  const result = {
    isConnected: false,
    tablesExist: {
      profiles: false,
      smoothies: false,
      check_ins: false,
      favorites: false,
      delivery_orders: false,
      analytics_events: false,
    },
    userAuthenticated: false,
    errors: [] as string[],
  };

  try {
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      result.errors.push(`Auth error: ${authError.message}`);
    } else if (user) {
      result.userAuthenticated = true;
    }

    // Check connection by trying to query a table
    const { error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profilesError) {
      if (profilesError.code === 'PGRST116') {
        result.errors.push('Table "profiles" does not exist. Please run database migrations.');
      } else if (profilesError.code === '42P01') {
        result.errors.push('Database connection failed or table missing.');
      } else {
        result.errors.push(`Profiles table error: ${profilesError.message}`);
      }
    } else {
      result.tablesExist.profiles = true;
      result.isConnected = true;
    }

    // Check other tables
    const tables = [
      'smoothies',
      'check_ins',
      'favorites',
      'delivery_orders',
      'analytics_events',
    ] as const;

    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);

      if (!error) {
        result.tablesExist[table] = true;
      } else if (error.code === 'PGRST116' || error.code === '42P01') {
        result.errors.push(`Table "${table}" does not exist.`);
      }
    }

    return result;
  } catch (error: any) {
    result.errors.push(`Unexpected error: ${error.message}`);
    return result;
  }
}

/**
 * Log database status to console for debugging
 */
export async function logDatabaseStatus(): Promise<void> {
  console.log('🔍 Checking XOVA Database Setup...');
  const status = await checkDatabaseSetup();

  console.log('\n📊 Database Status:');
  console.log('  Connected:', status.isConnected ? '✅' : '❌');
  console.log('  User Authenticated:', status.userAuthenticated ? '✅' : '❌');

  console.log('\n📋 Tables:');
  Object.entries(status.tablesExist).forEach(([table, exists]) => {
    console.log(`  ${table}:`, exists ? '✅' : '❌');
  });

  if (status.errors.length > 0) {
    console.log('\n⚠️ Errors:');
    status.errors.forEach((error) => {
      console.log(`  - ${error}`);
    });

    console.log('\n💡 Solution:');
    console.log('  1. Go to your Supabase dashboard');
    console.log('  2. Navigate to SQL Editor');
    console.log('  3. Copy and run the contents of supabase-migrations.sql');
    console.log('  4. Refresh this page');
    console.log('\n  See SUPABASE_SETUP.md for detailed instructions.');
  } else {
    console.log('\n✅ All checks passed!');
  }
}
