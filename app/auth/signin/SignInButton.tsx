'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SignInButtonProps {
  provider: {
    id: string;
    name: string;
  };
}

export default function SignInButton({ provider }: SignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn(provider.id, { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      className="w-full bg-white text-gray-900 hover:bg-gray-100"
      disabled={isLoading}
    >
      {isLoading ? (
        'Signing in...'
      ) : (
        <>
          Continue with {provider.name}
        </>
      )}
    </Button>
  );
} 