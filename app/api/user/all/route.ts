import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  await connectDB();
  const adminUser = await User.findOne({ email: session.user.email });
  if (!adminUser || adminUser.role !== 'admin') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
  const users = await User.find({}, '-password -verificationToken -verificationCode -resetPasswordToken -resetPasswordExpires');
  return NextResponse.json({ users });
} 