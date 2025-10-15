# Debug Profile Flow

## Issue: "Complete Profile" button shows blank page

## Steps to Debug:

### 1. Check Browser Console
Open browser dev tools (F12) and look for:
- Any JavaScript errors
- Console logs from UserDashboard component
- Network requests to Supabase

### 2. Test Database Connection
Run this SQL in Supabase to check if user profile exists:
```sql
SELECT * FROM user_profiles WHERE id = 'YOUR_USER_ID';
```

### 3. Check Environment Variables
Make sure these are set in Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 4. Test the Flow Step by Step

1. **Login** - Check if user authentication works
2. **Dashboard Load** - Check if userProfile loads correctly
3. **Click "Complete Profile"** - Check if showQuestionnaire becomes true
4. **Questionnaire** - Check if questionnaire renders
5. **Submit** - Check if profile saves to database
6. **Profile Display** - Check if NutritionalProfileDisplay renders

## Expected Console Logs:

```
Loading user data for user: [user-id]
Profile loaded: [profile-data] OR Profile does not exist yet...
UserDashboard render: { userProfile: ..., hasCompletedProfile: ..., ... }
```

## Common Issues:

1. **Database Table Name**: Should be `user_profiles` not `profiles`
2. **Missing Environment Variables**: Check Vercel dashboard
3. **RLS Policies**: User might not have access to their profile
4. **Component State**: showQuestionnaire might not be updating

## Quick Fix Test:

Try this in browser console after logging in:
```javascript
// Check if user is authenticated
console.log('User:', window.supabase?.auth?.getUser());

// Check if components are rendering
console.log('Dashboard mounted:', document.querySelector('[data-testid="user-dashboard"]'));
```

## Next Steps:

1. Check browser console for errors
2. Verify database connection
3. Test with a fresh user account
4. Check component state in React DevTools
