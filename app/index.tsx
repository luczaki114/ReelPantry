/**
 * Index Route
 * 
 * Root index route that redirects users based on authentication state.
 * Redirects to login if not authenticated, or to home if authenticated.
 * 
 * Location: app/index.tsx
 * Flow: Entry point -> Redirects based on auth state
 */

import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: Check authentication state from Supabase or auth provider
    // For now, always show login screen
    setIsAuthenticated(false);
  }, []);

  // Show loading while checking auth state
  if (isAuthenticated === null) {
    return (
      <Box className="flex-1 justify-center items-center bg-background-0">
        <Spinner size="large" className="text-typography-0" />
        <Text className="mt-4 text-typography-0 opacity-70">Loading...</Text>
      </Box>
    );
  }

  // Redirect based on auth state
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

