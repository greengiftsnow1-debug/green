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
      router.push('/profile'); // redirect after signup
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="pt-32 p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile Number"
          className="w-full border p-2 rounded"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
}
