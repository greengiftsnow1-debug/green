'use client';

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";


import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      alert(error.message);
      return;
    }
    alert("Password updated successfully");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E1EEBC]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>

        <input
          type="password"
          placeholder="New password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          className="w-full bg-green-600 text-white py-3 rounded"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
