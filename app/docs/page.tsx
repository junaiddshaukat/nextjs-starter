'use client';

export default function DocsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-white">
      <h1 className="text-4xl font-bold mb-6">Documentation</h1>
      <Section title="Introduction">
        <p>
          This template is a modern Next.js starter kit for SaaS, dashboards, and internal tools. It includes authentication, database, email, beautiful UI, analytics, and more. Designed for rapid development and easy customization.
        </p>
      </Section>
      <Section title="Getting Started">
        <ol className="list-decimal list-inside space-y-2">
          <li>Clone the repo or accept your GitHub invite after purchase.</li>
          <li>Install dependencies: <code className="bg-gray-700 px-2 py-1 rounded">npm install</code></li>
          <li>Copy <code>.env.example</code> to <code>.env.local</code> and fill in your secrets.</li>
          <li>Run <code className="bg-gray-700 px-2 py-1 rounded">npm run dev</code> and open <code>http://localhost:3000</code></li>
        </ol>
      </Section>
      <Section title="Configuration">
        <ul className="list-disc list-inside space-y-2">
          <li><b>MongoDB:</b> Set <code>MONGODB_URI</code> in <code>.env.local</code></li>
          <li><b>NextAuth:</b> Set <code>NEXTAUTH_URL</code> and <code>NEXTAUTH_SECRET</code></li>
          <li><b>Google OAuth:</b> Set <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code></li>
          <li><b>Email:</b> Set <code>EMAIL_SERVER_USER</code>, <code>EMAIL_SERVER_PASSWORD</code>, <code>EMAIL_FROM</code></li>
          <li><b>Analytics:</b> Set <code>NEXT_PUBLIC_GA_ID</code> for Google Analytics</li>
        </ul>
      </Section>
      <Section title="Customization & Theming">
        <ul className="list-disc list-inside space-y-2">
          <li>Edit <code>app/page.tsx</code> for your main marketing site.</li>
          <li>Edit <code>app/dashboard</code> for your app's main UI.</li>
          <li>Change theme/colors in <code>tailwind.config.js</code> and <code>globals.css</code>.</li>
          <li>Use <code>components/ui/</code> for reusable UI elements.</li>
          <li>Add or remove features as needed (see <code>components/</code> and <code>lib/</code>).</li>
        </ul>
      </Section>
      <Section title="Multi-Tenancy (SaaS)">
        <ul className="list-disc list-inside space-y-2">
          <li>To support multiple organizations, add a <code>tenantId</code> or <code>organizationId</code> to your user and data models.</li>
          <li>Scope all queries and API routes to the current tenant.</li>
          <li>Show/hide data in the UI based on the tenant context.</li>
        </ul>
      </Section>
      <Section title="Demo Data & Onboarding">
        <ul className="list-disc list-inside space-y-2">
          <li>Seed demo data by adding a script in <code>scripts/seed.ts</code> and running it with <code>ts-node</code> or <code>node</code>.</li>
          <li>Add onboarding screens in <code>app/onboarding</code> to guide new users after signup.</li>
        </ul>
      </Section>
      <Section title="Deployment">
        <ol className="list-decimal list-inside space-y-2">
          <li>Push your code to GitHub.</li>
          <li>Deploy to Vercel (recommended), Netlify, or your own server.</li>
          <li>Set all environment variables in your hosting provider's dashboard.</li>
        </ol>
      </Section>
      <Section title="Troubleshooting">
        <ul className="list-disc list-inside space-y-2">
          <li><b>MongoDB connection errors:</b> Check your <code>MONGODB_URI</code> and network/firewall settings.</li>
          <li><b>OAuth errors:</b> Ensure your Google credentials and redirect URIs are correct.</li>
          <li><b>Email not sending:</b> Check your email credentials and allow less secure apps if using Gmail.</li>
          <li><b>Analytics not loading:</b> Make sure you accepted cookies and set <code>NEXT_PUBLIC_GA_ID</code>.</li>
        </ul>
      </Section>
      <Section title="Licensing">
        <ul className="list-disc list-inside space-y-2">
          <li>Your purchase includes a license for unlimited personal and client projects.</li>
          <li>Resale or redistribution of the template itself is not allowed.</li>
        </ul>
      </Section>
      <Section title="FAQ">
        <ul className="list-disc list-inside space-y-2">
          <li><b>How do I get updates?</b> You'll get repo access and notifications for new releases.</li>
          <li><b>Can I use this for clients?</b> Yes, your license allows unlimited use for personal and client projects.</li>
          <li><b>How do I get support?</b> Email us or open an issue in the repo.</li>
        </ul>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-2 text-blue-400">{title}</h2>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </section>
  );
} 