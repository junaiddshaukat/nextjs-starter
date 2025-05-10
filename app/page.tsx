'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { UserProfileDropdown } from '@/components/ui/user-profile-dropdown';
import { motion } from 'framer-motion';

const features = [
  { icon: '🔐', title: 'Authentication', desc: 'NextAuth.js with Google OAuth and credentials' },
  { icon: '💾', title: 'Database', desc: 'MongoDB & Mongoose integration' },
  { icon: '🎨', title: 'Modern UI', desc: 'Tailwind CSS & Shadcn UI components' },
  { icon: '📧', title: 'Email', desc: 'Nodemailer for email verification & reset' },
  { icon: '🛡️', title: 'Security', desc: 'Rate limiting, roles, protected routes' },
  { icon: '⚡', title: 'TypeScript', desc: 'Full type safety throughout the stack' },
];

const testimonials = [
  {
    name: 'Jane Doe',
    company: 'Acme Inc.',
    quote: 'This template saved us weeks of development and looks amazing out of the box!'
  },
  {
    name: 'John Smith',
    company: 'StartupX',
    quote: 'The best Next.js starter I have ever used. Super easy to customize.'
  },
];

export default function LandingPage() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <nav className="w-full px-4 py-4 flex justify-between items-center bg-gray-900/80 border-b border-gray-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">NextStarter</span>
          <span className="ml-2 px-2 py-0.5 rounded bg-green-700 text-xs text-white font-semibold">Open Source & Free</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="text-gray-300 hover:text-white transition">Docs</Link>
          <Link href="https://github.com/junaiddshaukat/nextjs-starter" target="_blank" className="text-gray-300 hover:text-white transition">GitHub</Link>
          {session?.user ? (
            <UserProfileDropdown user={{ name: session.user.name || '', email: session.user.email || '' }} />
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-white hover:text-gray-300">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <header className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center text-center">
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl md:text-6xl font-bold text-white mb-4">
          Build SaaS Faster
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-xl text-gray-300 mb-8 max-w-2xl">
          A modern Next.js starter template with authentication, database, beautiful UI, and everything you need to launch your next SaaS or internal tool.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/sig"><Button size="lg" className="bg-blue-600 hover:bg-blue-700">Get Started</Button></Link>
          <Link href="/docs"><Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">View Docs</Button></Link>
        </motion.div>
      </header>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Features</h2>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={f.title} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
              <FeatureCard icon={f.icon} title={f.title} desc={f.desc} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">What People Are Saying</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.6 }} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 shadow">
              <div className="text-lg text-gray-200 mb-4">“{t.quote}”</div>
              <div className="text-gray-400 font-semibold">- {t.name}, {t.company}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="pricing" className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Pricing</h2>
        <p className="text-gray-300 mb-8">Free and open source. No payment required.</p>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-gray-800 rounded-lg shadow-xl p-8 inline-block">
          <div className="text-5xl font-bold text-white mb-2">$0</div>
          <div className="text-gray-400 mb-6">Get the full template, docs, and community support.</div>
          <Link href="https://github.com/junaiddshaukat/nextjs-starter" target="_blank">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full">Star on GitHub</Button>
          </Link>
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">FAQ</h2>
        <div className="space-y-6">
          <FAQ q="Is this really free?" a="Yes! This template is open source and free for personal and commercial use." />
          <FAQ q="What do I get after download?" a="You get access to the full template, docs, and updates." />
          <FAQ q="Can I use this for client projects?" a="Yes! Your license allows unlimited use for personal and client projects." />
          <FAQ q="Is there support?" a="Yes, you get community support and free updates." />
        </div>
      </section>

      <footer className="text-center text-gray-500 py-8">&copy; {new Date().getFullYear()} NextStarter. Open source under the MIT License.</footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="p-6 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500 transition-colors text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="font-semibold text-white mb-2">{q}</div>
      <div className="text-gray-400">{a}</div>
    </div>
  );
}
