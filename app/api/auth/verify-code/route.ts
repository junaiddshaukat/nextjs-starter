import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    // Connect to database
    await connectDB();

    // Find user with the verification code
    const user = await User.findOne({ verificationCode: code });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationCode = undefined;
    await user.save();

    return NextResponse.json(
      { message: 'Email verified successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 