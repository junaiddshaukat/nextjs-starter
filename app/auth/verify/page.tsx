import { connectDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  if (!searchParams.token) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Invalid Verification Link</h1>
          <p className="text-gray-300 mb-6">
            The verification link is invalid or has expired.
          </p>
          <Link
            href="/auth/signin"
            className="text-blue-400 hover:underline"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  try {
    await connectDB();
    const user = await User.findOne({ verificationToken: searchParams.token });

    if (!user) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Invalid Verification Link</h1>
            <p className="text-gray-300 mb-6">
              The verification link is invalid or has expired.
            </p>
            <Link
              href="/auth/signin"
              className="text-blue-400 hover:underline"
            >
              Return to Sign In
            </Link>
          </div>
        </div>
      );
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Email Verified!</h1>
          <p className="text-gray-300 mb-6">
            Your email has been successfully verified. You can now sign in to your account.
          </p>
          <Link
            href="/auth/signin"
            className="text-blue-400 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Verification error:', error);
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Verification Failed</h1>
          <p className="text-gray-300 mb-6">
            An error occurred while verifying your email. Please try again later.
          </p>
          <Link
            href="/auth/signin"
            className="text-blue-400 hover:underline"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }
} 