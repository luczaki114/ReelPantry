/**
 * Login Screen
 * 
 * Authentication screen that provides OAuth sign-in options (Google, Apple, GitHub).
 * This is the entry point for unauthenticated users and sits before the home screen.
 * Built entirely with Gluestack UI components styled with NativeWind and Gluestack tokens.
 * 
 * Location: app/(auth)/login.tsx
 * Flow: Entry point -> Authentication -> Home screen
 */

import { Box } from '@/components/ui/box';
import {
    Button,
    ButtonSpinner,
    ButtonText,
} from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import React, { useState } from 'react';
import { Platform } from 'react-native';

export default function LoginScreen() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: 'google' | 'apple' | 'github') => {
    try {
      setLoadingProvider(provider);
      // TODO: Implement OAuth sign-in logic
      console.log(`Signing in with ${provider}...`);
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingProvider(null);
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error);
      setLoadingProvider(null);
    }
  };

  const isLoading = loadingProvider !== null;

  return (
    <Box className="flex-1 justify-center items-center bg-background-0">
      <VStack className="w-full max-w-[400px] p-6 items-center gap-6">
        <VStack className="items-center gap-2 mb-12">
          <Heading className="text-[32px] font-bold text-typography-0 text-center mb-2">
            Welcome to ReelPantry
          </Heading>
          <Text className="text-base text-typography-0 opacity-70 text-center">
            Sign in to continue
          </Text>
        </VStack>

        <VStack className="w-full gap-3">
          {/* Google Sign In */}
          <Button
            onPress={() => handleOAuthSignIn('google')}
            isDisabled={isLoading}
            className="w-full bg-[#4285F4] rounded-lg py-3.5 px-6 items-center justify-center min-h-[50px] active:opacity-80"
          >
            {loadingProvider === 'google' ? (
              <ButtonSpinner color="#fff" />
            ) : (
              <ButtonText className="text-base font-semibold text-white">
                Continue with Google
              </ButtonText>
            )}
          </Button>

          {/* Apple Sign In - iOS only */}
          {Platform.OS === 'ios' && (
            <Button
              onPress={() => handleOAuthSignIn('apple')}
              isDisabled={isLoading}
              className="w-full bg-black rounded-lg py-3.5 px-6 items-center justify-center min-h-[50px] border border-outline-800 active:opacity-80"
            >
              {loadingProvider === 'apple' ? (
                <ButtonSpinner color="#fff" />
              ) : (
                <ButtonText className="text-base font-semibold text-white">
                  Continue with Apple
                </ButtonText>
              )}
            </Button>
          )}

          {/* GitHub Sign In */}
          <Button
            onPress={() => handleOAuthSignIn('github')}
            isDisabled={isLoading}
            className="w-full bg-transparent rounded-lg py-3.5 px-6 items-center justify-center min-h-[50px] border border-outline-800 active:opacity-80"
          >
            {loadingProvider === 'github' ? (
              <ButtonSpinner className="text-typography-0" />
            ) : (
              <ButtonText className="text-base font-semibold text-white">
                Continue with GitHub
              </ButtonText>
            )}
          </Button>
        </VStack>

        {isLoading && loadingProvider === null && (
          <HStack className="flex-row items-center gap-2 mt-4">
            <Spinner size="small" className="text-typography-0" />
            <Text className="text-sm text-typography-0 opacity-70">
              Loading...
            </Text>
          </HStack>
        )}
      </VStack>
    </Box>
  );
}

