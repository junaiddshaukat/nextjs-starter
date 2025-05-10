import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function DELETE(
  req: Request,
  { params }: { params: { sessionToken: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    // Only allow deleting sessions for the current user
    const result = await mongoose.connection
      .collection('sessions')
      .deleteOne({ sessionToken: params.sessionToken, userId: session.user.id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Session not found or not authorized' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Session revoked' });
  } catch (error) {
    return NextResponse.json({ message: 'Error revoking session', error }, { status: 500 });
  }
} 