export const metadata = {
  title: 'Dashboard | Premium Next.js Template',
  description: 'Your personal dashboard with modern UI and secure authentication.',
  openGraph: {
    title: 'Dashboard | Premium Next.js Template',
    description: 'Your personal dashboard with modern UI and secure authentication.',
    url: 'https://yourdomain.com/dashboard',
    siteName: 'Premium Next.js Dashboard',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Premium Next.js Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard | Premium Next.js Template',
    description: 'Your personal dashboard with modern UI and secure authentication.',
    images: ['/og-image.png'],
    creator: '@yourtwitter',
  },
};

import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <SignOutButton />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Welcome"
              description={`Hello, ${session.user?.name || "User"}!`}
              icon="👋"
            />
            <DashboardCard
              title="Email"
              description={session.user?.email || "No email provided"}
              icon="📧"
            />
            <DashboardCard
              title="Account Status"
              description="Active"
              icon="✅"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
} 