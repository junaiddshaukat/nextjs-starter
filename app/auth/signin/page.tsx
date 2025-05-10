import { getProviders } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import SignInButton from "./SignInButton";
import SignInForm from "./SignInForm";
import Link from "next/link";

export default async function SignIn() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  const providers = await getProviders();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Sign in to your account
        </h1>
        
        <SignInForm />
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="space-y-4">
          {providers &&
            Object.values(providers)
              .filter((provider) => provider.name !== "Credentials")
              .map((provider) => (
                <div key={provider.name} className="w-full">
                  <SignInButton provider={provider} />
                </div>
              ))}
        </div>

        <Link href="/auth/forgot-password" className="text-blue-400 hover:underline">
          Forgot password?
        </Link>
      </div>
    </div>
  );
} 