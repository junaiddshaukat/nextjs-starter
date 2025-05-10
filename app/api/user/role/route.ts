import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function PUT(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const adminUser = await User.findOne({ email: session.user.email });
  if (!adminUser || adminUser.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  const { userId, role } = await req.json();
  if (!['user', 'admin'].includes(role)) {
    return NextResponse.json({ message: 'Invalid role' }, { status: 400 });
  }
  const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Role updated', user });
} 