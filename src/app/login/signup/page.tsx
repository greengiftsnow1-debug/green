'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signup(email, password, name, mobile);
      router.push('/profile');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/bg-leaves.jpeg')] bg-cover bg-center">
      <div className="backdrop-blur-lg bg-white/20 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md border border-white/30">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 drop-shadow-lg">
          Create Your Account
        </h1>

        {error && (
          <p className="text-red-200 bg-red-800/30 text-center py-2 rounded mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:ring-2 focus:ring-green-400 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:ring-2 focus:ring-green-400 outline-none"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:ring-2 focus:ring-green-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white focus:ring-2 focus:ring-green-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-4 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-white/80 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-green-300 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
