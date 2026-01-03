"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export default function PaymentsPage() {
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
      <h1 className="text-3xl font-bold mb-6">💳 Payment History</h1>

      {orders.length === 0 && <p>No payments found.</p>}

      <div className="space-y-5">
        {orders.map((o) => (
          <div key={o.id} className="p-5 bg-white/10 rounded-2xl border border-white/20">
            <p className="text-lg font-bold">Payment ID: {o.payment_id || "N/A"}</p>
            <p>Paid Amount: ₹{o.total_amount}</p>
            <p>Method: Razorpay</p>
            <p>Status: {o.payment_status}</p>
            <p className="text-sm opacity-70">{new Date(o.created_at).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
