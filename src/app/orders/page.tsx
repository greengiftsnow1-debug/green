"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setOrders(data || []));
  }, [user]);

  if (loading) return <p className="pt-32 text-center text-white">Loading...</p>;

  return (
    <div className="min-h-screen p-10 text-black">
      <h1 className="text-3xl font-bold mb-6">📦 Order History</h1>

      {orders.length === 0 && <p>No orders yet.</p>}

      <div className="space-y-5">
        {orders.map((o) => (
          <div key={o.id} className="p-5 bg-white/10 rounded-2xl border border-white/20">
            <p className="text-lg font-bold">Order #{o.id}</p>
            <p>Amount: ₹{o.total_amount}</p>
            <p>Status: {o.status}</p>
            <p className="text-sm opacity-70">{new Date(o.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
