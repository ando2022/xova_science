// Mock authentication system using localStorage
// This allows the app to work without Supabase

export interface CustomSmoothie {
  id: string;
  name: string;
  description: string;
  ingredients: { name: string; quantity: string }[];
  instructions: string;
  createdAt: string;
  nutritionEstimate?: {
    calories: number;
    protein: number;
    carbs: number;
    fiber: number;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  subscriptionTier: 'free' | 'premium' | 'delivery';
  profile?: UserProfile;
  favoriteSmoothies?: string[];
  customSmoothies?: CustomSmoothie[];
  deliveryHistory?: DeliveryOrder[];
  dailyCheckins?: DailyCheckin[];
}

export interface DailyCheckin {
  date: string;
  energy: number;
  mood: number;
  appetite: number;
  sleep: number;
}

export interface DeliveryOrder {
  id: string;
  orderDate: string;
  deliveryDate: string;
  smoothies: {
    smoothieId: string;
    smoothieName: string;
    dayOfWeek: string;
    timeOfDay: 'morning' | 'afternoon' | 'evening';
  }[];
  status: 'pending' | 'preparing' | 'shipped' | 'delivered';
  packagingBreakdown: {
    freshIngredients: string[];
    dryIngredients: string[];
  };
}

export interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  healthGoals: string[];
  dietaryRestrictions: string[];
  allergens: string[];
  flavorPreferences: string[];
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'very-active' | 'athlete';
  sleepQuality: 'poor' | 'fair' | 'good' | 'excellent';
  stressLevel: 'low' | 'moderate' | 'high';
  deliveryPreferences?: {
    baselinePreferences: string[];
    allowAIVariations: boolean;
    preferredDeliveryDay: string;
    specialInstructions: string;
  };
}

const STORAGE_KEYS = {
  CURRENT_USER: 'xova_current_user',
  USERS: 'xova_users',
};

// Get all users from storage
function getAllUsers(): Record<string, User> {
  const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
  return usersJson ? JSON.parse(usersJson) : {};
}

// Save all users to storage
function saveAllUsers(users: Record<string, User>): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

// Get current user from storage
function getCurrentUserFromStorage(): User | null {
  const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userJson ? JSON.parse(userJson) : null;
}

// Save current user to storage
function saveCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

// Sign up with email/password
export async function signup(
  email: string,
  password: string,
  name: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const users = getAllUsers();

    // Check if user already exists
    if (users[email]) {
      return { success: false, error: 'User already exists' };
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      createdAt: new Date().toISOString(),
      subscriptionTier: 'free',
    };

    // Save user
    users[email] = newUser;
    saveAllUsers(users);
    saveCurrentUser(newUser);

    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, error: 'Signup failed' };
  }
}

// Login with email/password
export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string; user?: User }> {
  try {
    const users = getAllUsers();
    const user = users[email];

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    saveCurrentUser(user);
    return { success: true, user };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
}

// Logout
export async function logout(): Promise<void> {
  saveCurrentUser(null);
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  return getCurrentUserFromStorage();
}

// Update user profile
export async function updateUserProfile(profile: UserProfile): Promise<void> {
  const currentUser = getCurrentUserFromStorage();
  if (!currentUser) {
    throw new Error('No user logged in');
  }

  currentUser.profile = profile;
  
  // Update in users list
  const users = getAllUsers();
  users[currentUser.email] = currentUser;
  saveAllUsers(users);
  
  // Update current user
  saveCurrentUser(currentUser);
}

// Get user profile
export async function getUserProfile(): Promise<UserProfile | null> {
  const user = getCurrentUserFromStorage();
  return user?.profile || null;
}

// Update user
export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  const currentUser = getCurrentUserFromStorage();
  if (!currentUser || currentUser.id !== userId) {
    throw new Error('Unauthorized');
  }

  Object.assign(currentUser, updates);
  
  // Update in users list
  const users = getAllUsers();
  users[currentUser.email] = currentUser;
  saveAllUsers(users);
  
  // Update current user
  saveCurrentUser(currentUser);
}

// Check if user is authenticated
export async function isAuthenticated(): Promise<boolean> {
  return getCurrentUserFromStorage() !== null;
}

// Auth state change listeners
const authListeners: Array<(user: User | null) => void> = [];

export function onAuthStateChange(callback: (user: User | null) => void) {
  authListeners.push(callback);
  
  // Return unsubscribe function
  return {
    data: {
      subscription: {
        unsubscribe: () => {
          const index = authListeners.indexOf(callback);
          if (index > -1) {
            authListeners.splice(index, 1);
          }
        },
      },
    },
  };
}

// Trigger auth state change
function triggerAuthStateChange(user: User | null): void {
  authListeners.forEach(callback => callback(user));
}

// Override logout to trigger listeners
const originalLogout = logout;
export const logoutWithNotify = async (): Promise<void> => {
  await originalLogout();
  triggerAuthStateChange(null);
};

// Analytics event tracking (mock)
export async function trackEvent(eventType: string, eventData?: any): Promise<void> {
  console.log('Analytics event:', eventType, eventData);
}

// Magic link (mock - just does regular signup/login)
export async function sendMagicLink(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const users = getAllUsers();
    
    // If user exists, consider it a login
    if (users[email]) {
      return { success: true };
    }
    
    // Otherwise, create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
      subscriptionTier: 'free',
    };

    users[email] = newUser;
    saveAllUsers(users);

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to send magic link' };
  }
}
