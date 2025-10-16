'use client';

import { useScrollFadeIn } from '@/hooks/useScrollFadeIn';

export default function ContactPage() {
  const ref = useScrollFadeIn();

  return (
    <section className="min-h-screen bg-[#E1EEBC] px-8 py-20">
      <div ref={ref} className="max-w-3xl mx-auto bg-white/60 backdrop-blur-md p-10 rounded-2xl shadow">
        <h1 className="text-4xl font-bold text-green-900 mb-6 text-center">Contact Us</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-3 border rounded" />
          <textarea rows={4} placeholder="Your Message" className="w-full p-3 border rounded" />
          <button className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-800">Send Message</button>
        </form>
      </div>
    </section>
  );
}
