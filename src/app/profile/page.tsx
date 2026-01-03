"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();

  if (loading || !user || !profile)
    return <p className="pt-32 text-center text-white">Loading...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 flex justify-center"
      style={{ backgroundImage: "url('/images/bg-profile.jpeg')" }}
    >
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

        {/* USER INFO */}
        <div className="flex items-center gap-5 pb-6 border-b border-white/20">
          <div className="w-20 h-20 rounded-full bg-white/20 flex justify-center items-center text-3xl font-bold uppercase">
            {profile.name?.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-semibold">{profile.name}</h1>
            <p className="text-white/80">{profile.email}</p>
            <p className="text-white/80">📞 {profile.mobile}</p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-10 space-y-4 text-center">

          <Link href="/orders">
            <button className="w-full py-4 bg-green-600 hover:bg-green-700 rounded-xl font-semibold text-lg transition">
              📦 View Order History
            </button>
          </Link>

          <Link href="/payments">
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold text-lg transition">
              💳 View Payment History
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}
