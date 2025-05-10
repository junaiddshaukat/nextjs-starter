import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { sendPasswordResetEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // Rate limit by IP
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { success } = rateLimit({ key: `forgotpw_${ip}`, limit: 5, windowMs: 10 * 60 * 1000 });
    if (!success) {
      return NextResponse.json({ message: 'Too many password reset attempts. Please try again later.' }, { status: 429 });
    }

    const { email } = await req.json();

    // Connect to database
    await connectDB();

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'No user found with this email' },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomUUID();
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    // Update user with reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // Send reset email
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json(
      { message: 'Password reset instructions sent to your email' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 