'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserAvatar } from '@/components/ui/user-avatar';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      await update(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false);
    const res = await fetch('/api/user/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: session?.user?.id }),
    });
    if (res.ok) {
      toast.success('Account deleted!');
      await signOut({ redirect: true, callbackUrl: '/' });
    } else {
      toast.error('Failed to delete account.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="flex items-center space-x-4 mb-6">
          <UserAvatar name={session?.user?.name || ''} className="h-16 w-16 text-xl" />
          <div>
            <h2 className="text-xl font-bold text-white">Profile</h2>
            <p className="text-gray-400">Update your profile information</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <Input
              {...register('name')}
              className="w-full bg-gray-700 border-gray-600 text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <Input
              {...register('email')}
              type="email"
              className="w-full bg-gray-700 border-gray-600 text-white"
              disabled
            />
            <p className="text-gray-400 text-sm mt-1">
              Email cannot be changed
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
          {session?.user?.role === 'admin' && (
            <Button
              type="button"
              variant="destructive"
              className="w-full mt-4"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete My Account
            </Button>
          )}
        </form>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">This action cannot be undone. Your account will be permanently deleted.</p>
            <div className="flex justify-center gap-4">
              <Button variant="destructive" onClick={handleDeleteAccount}>
                Yes, Delete
              </Button>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 