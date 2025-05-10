'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';

export default function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleCodeVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success('Email verified successfully!');
      router.push('/auth/signin');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Verify Your Email
        </h1>

        {token ? (
          <div className="text-center text-gray-300 mb-6">
            <p>Click the button below to verify your email address.</p>
            <Button
              onClick={() => router.push(`/auth/verify?token=${token}`)}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Verify Email
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCodeVerification} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </form>
        )}

        <p className="text-gray-400 text-sm text-center mt-4">
          Didn't receive the code?{' '}
          <button
            onClick={() => router.push('/auth/resend-verification')}
            className="text-blue-400 hover:underline"
          >
            Resend verification code
          </button>
        </p>
      </div>
    </div>
  );
} 