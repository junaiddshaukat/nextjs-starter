import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { sendVerificationEmail } from '@/lib/email';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  // Rate limit by IP
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const { success } = rateLimit({ key: `signup_${ip}`, limit: 5, windowMs: 10 * 60 * 1000 });
  if (!success) {
    return NextResponse.json({ message: 'Too many signup attempts. Please try again later.' }, { status: 429 });
  }

  try {
    const { name, email, password } = await req.json();

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Generate verification token and code
    const verificationToken = crypto.randomUUID();
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationCode,
      isVerified: false,
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken, verificationCode);

    return NextResponse.json(
      { message: 'User created successfully. Please check your email to verify your account.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
} 