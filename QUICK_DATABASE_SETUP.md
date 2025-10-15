# 🚨 URGENT: Database Setup Required

## The Issue
The login/signup is failing because the database tables don't exist yet. You need to run the database schema in Supabase.

## Quick Fix (5 minutes)

### Step 1: Access Supabase
1. Go to [supabase.com](https://supabase.com) and sign in
2. Open your XOVA project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run the Schema
1. Open the file `supabase-setup.sql` 
2. Copy ALL the content
3. Paste into the SQL Editor
4. Click **Run**

### Step 3: Run the Ingredients Database
1. Open the file `ingredients-database.sql`
2. Copy ALL the content  
3. Paste into the SQL Editor
4. Click **Run**

### Step 4: Verify Success
You should see these success messages:
- ✅ "XOVA database setup completed successfully!"
- ✅ "Ingredients database created successfully!"

## What This Creates
- `user_profiles` table (stores user health data)
- `orders` table (stores purchases)
- `smoothie_recipes` table (stores AI-generated recipes)
- `user_events` table (analytics)
- `ingredients` table (30+ ingredients with costs)
- Security policies and triggers

## After Setup
Once the database is set up, the login/signup will work immediately. The app will automatically create user profiles when people sign up.

## Need Help?
If you get any errors, copy the error message and I'll help you fix it.

