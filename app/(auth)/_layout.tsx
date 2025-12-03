/**
 * Auth Layout
 * 
 * Layout wrapper for authentication screens (login, etc.).
 * Provides a simple stack navigator for auth-related screens.
 * 
 * Location: app/(auth)/_layout.tsx
 * Flow: Part of auth flow before main app
 */

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}

