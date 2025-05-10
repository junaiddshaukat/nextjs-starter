import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import SignUpForm from "./SignUpForm";

export default async function SignUp() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create your account
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
} 