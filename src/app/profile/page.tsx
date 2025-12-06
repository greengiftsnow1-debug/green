"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { Receipt, MapPin, Phone, PackageSearch } from "lucide-react";

export default function ProfilePage() {
  const { user, profile, loading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);

  // Fetch Orders
  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setOrders(data || []);
    };

    load();
  }, [user]);

  if (loading || !user || !profile)
    return <p className="pt-32 text-center text-white">Loading...</p>;

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8 flex justify-center"
      style={{ backgroundImage: "url('/images/bg-profile.jpeg')" }}
    >
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">

        {/* ⭐ USER HEADER */}
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

        {/* ⭐ ORDER HISTORY */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">Your Orders</h2>

        {orders.length === 0 ? (
          <p className="text-white/70">No orders yet.</p>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md"
              >
                <div className="flex justify-between">
                  <p className="text-xl font-semibold">
                    Order <span className="text-green-300">#{order.id}</span>
                  </p>
                  <span className="px-3 py-1 text-sm rounded-full bg-green-700/40 border border-green-500/30">
                    {order.status}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-white/80">
                  <p><strong>Amount: </strong>₹{order.total_amount}</p>
                  <p><strong>Delivery Charge:</strong> ₹{order.delivery_charge}</p>
                  <p><strong>Store:</strong> {order.store_pin}</p>
                  <p><strong>Address:</strong> {order.customer_address}</p>
                  <p><strong>Pincode:</strong> {order.customer_pincode}</p>
                  
                  <p className="text-sm text-white/60 mt-1">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                {/* View Order Button */}
                <Link
                  href={`/order/${order.id}`}
                  className="mt-3 inline-block text-green-300 font-semibold hover:underline"
                >
                  View Full Order →
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* ⭐ PAYMENT HISTORY */}
        <h2 className="text-2xl font-semibold mt-10 mb-3">Payment History</h2>

        {orders.length === 0 ? (
          <p className="text-white/70">No payments found.</p>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md"
              >
                <p className="text-lg font-semibold flex items-center gap-2">
                  <Receipt size={18} /> Payment ID:
                  <span className="text-green-300">{order.payment_id}</span>
                </p>

                <p className="text-white/80 mt-2">
                  <strong>Amount Paid:</strong> ₹{order.total_amount}
                </p>

                <p className="text-white/80">
                  <strong>Method:</strong> Razorpay
                </p>

                <p className="text-sm text-white/60 mt-1">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
