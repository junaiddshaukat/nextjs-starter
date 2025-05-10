'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UserAvatar } from './user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Button } from './button';
import { notify } from '@/lib/notify';

interface UserProfileDropdownProps {
  user: {
    name: string;
    email: string;
  };
  setIsLoggingOut?: (v: boolean) => void;
}

export function UserProfileDropdown({ user, setIsLoggingOut }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setLocalIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLocalIsLoggingOut(true);
    setIsLoggingOut?.(true);
    try {
      await signOut({ redirect: false });
      notify.success('Logged out successfully!');
      setTimeout(() => {
        router.push('/');
        setIsLoggingOut?.(false);
      }, 1500);
    } catch (e) {
      notify.error('Logout failed.');
      setLocalIsLoggingOut(false);
      setIsLoggingOut?.(false);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full border border-green-200 bg-white hover:bg-green-50"
        >
          <UserAvatar name={user.name} className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border border-green-200 text-gray-900" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-green-700">{user.name}</p>
            <p className="text-xs leading-none text-gray-500">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isLoggingOut} className={isLoggingOut ? 'opacity-50 pointer-events-none' : ''}>
          {isLoggingOut ? 'Logging out...' : 'Log out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 