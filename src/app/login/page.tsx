'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[url('/images/ag-leaves.jpeg')] bg-cover bg-center relative font-poppins overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col md:flex-row w-[90%] max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-white/20"
      >
        {/* Left Section */}
        <div className="flex-1 bg-black/40 backdrop-blur-md text-white flex flex-col justify-center p-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome Back into GREEN GIFTS NOW🌿
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Log in to continue your green journey — sustainable, fresh, and full of life gifts.
          </p>
          <p className="text-sm text-white/60">
            New here?{' '}
            <a
              href="/signup"
              className="text-green-400 font-medium hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1 bg-white/10 backdrop-blur-xl p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-white mb-6 text-center">
            Login
          </h2>

          {error && (
            <p className="text-red-200 bg-red-800/30 text-center py-2 rounded mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-green-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-green-400 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-white/70 mt-4 text-sm">
            Forgot your password?{' '}
            <a href="#" className="text-green-300 hover:underline">
              Reset here
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
