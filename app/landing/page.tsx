'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { UserProfileDropdown } from '@/components/ui/user-profile-dropdown';

export default function Landing() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-white">NextStarter</div>
          <div className="space-x-4 flex items-center">
            {session?.user ? (
              <UserProfileDropdown user={{ name: session.user.name || '', email: session.user.email || '' }} />
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-white hover:text-gray-300">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>

        <main className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Build Amazing Web Apps
            <br />
            <span className="text-blue-400">with Next.js</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A powerful starter template with authentication, database integration,
            and beautiful UI components to kickstart your next project.
          </p>
          <div className="space-x-4">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Building
              </Button>
            </Link>
            <Link href="https://github.com/junaiddshaukat/nextjs-starter" target="_blank">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                View on GitHub
              </Button>
            </Link>
          </div>
        </main>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Authentication"
            description="Secure authentication with NextAuth.js and Google OAuth integration"
            icon="🔐"
          />
          <FeatureCard
            title="Database"
            description="MongoDB integration with Mongoose for powerful data management"
            icon="💾"
          />
          <FeatureCard
            title="Modern UI"
            description="Beautiful UI components with Tailwind CSS and Shadcn"
            icon="🎨"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
} 