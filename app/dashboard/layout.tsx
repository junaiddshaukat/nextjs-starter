'use client';

import { useSession } from 'next-auth/react';
import { UserProfileDropdown } from '@/components/ui/user-profile-dropdown';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (status === 'loading' || isLoggingOut) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-green-600 text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-green-600 text-xl font-bold hover:text-green-700 transition-colors">
                Dashboard
              </Link>
              <nav className="hidden md:flex space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors">
                  Overview
                </Link>
                <Link href="/dashboard/profile" className="text-gray-700 hover:text-green-600 transition-colors">
                  Profile
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <UserProfileDropdown
                user={{
                  name: session?.user?.name || '',
                  email: session?.user?.email || '',
                  setIsLoggingOut,
                }}
              />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
} 