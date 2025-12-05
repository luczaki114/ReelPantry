/**
 * Supabase client configuration
 * 
 * This file initializes and exports the Supabase client for authentication and database operations.
 * Uses environment variables for the Supabase URL and anon key, which should be set in your
 * Expo environment configuration.
 * 
 * Location: lib/supabase.ts
 * Used by: useSupabase hook and useAuth hook
 */

import { Database } from '@/types/database.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
// These should be set in your .env file or Expo environment config
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is missing. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your environment variables.'
  );
}

// Create Supabase client with AsyncStorage for session persistence
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});