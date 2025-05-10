'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { notify } from '@/lib/notify';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBanned?: boolean;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user?.role !== 'admin') {
      notify.error('You are not authorized to view this page.');
      router.push('/');
      return;
    }
    fetchUsers();
    // eslint-disable-next-line
  }, [status]);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch('/api/user/all');
    const data = await res.json();
    setUsers(data.users || []);
    setLoading(false);
  }

  async function handleDeleteUser(userId: string) {
    setDeleteUserId(null);
    const res = await fetch(`/api/user/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      notify.success('User deleted!');
      fetchUsers();
    } else {
      notify.error('Failed to delete user.');
    }
  }

  async function handleBanUser(userId: string, ban: boolean) {
    const res = await fetch(`/api/user/ban`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, isBanned: ban }),
    });
    if (res.ok) {
      notify.success(ban ? 'User banned!' : 'User unbanned!');
      fetchUsers();
    } else {
      notify.error('Failed to update user status.');
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <table className="w-full bg-gray-800 rounded-lg shadow-xl">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4">
                  {user.isBanned ? (
                    <span className="text-red-400 font-semibold">Banned</span>
                  ) : (
                    <span className="text-green-400 font-semibold">Active</span>
                  )}
                </td>
                <td className="p-4 flex gap-2">
                  <Button size="sm" variant={user.isBanned ? 'default' : 'destructive'} onClick={() => handleBanUser(user._id, !user.isBanned)}>
                    {user.isBanned ? 'Unban' : 'Ban'}
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => setDeleteUserId(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-gray-800 rounded-lg p-8 shadow-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">This action cannot be undone. The user will be permanently deleted.</p>
            <div className="flex justify-center gap-4">
              <Button variant="destructive" onClick={() => handleDeleteUser(deleteUserId!)}>
                Yes, Delete
              </Button>
              <Button variant="outline" onClick={() => setDeleteUserId(null)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 