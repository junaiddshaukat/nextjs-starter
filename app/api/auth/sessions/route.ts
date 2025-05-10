import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';
import { connectDB } from '@/lib/mongodb';
import { Session } from 'next-auth';
import mongoose from 'mongoose';

export async function GET() {
  try {
    const session: Session | null = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    // The sessions collection is named 'sessions' by NextAuth MongoDB adapter
    const sessions = await mongoose.connection
      .collection('sessions')
      .find({ userId: session.user.id })
      .toArray();
    return NextResponse.json({ sessions });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching sessions', error }, { status: 500 });
  }
} 