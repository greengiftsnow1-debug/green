'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('Order fetch error:', error);
        else setOrders(data ?? []);
      });

    supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('Payment fetch error:', error);
        else setPayments(data ?? []);
      });
  }, [user]);

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[url('/images/ng-leaves.jpeg')] bg-cover bg-center">
        <p className="text-white text-lg backdrop-blur-md bg-black/40 p-4 rounded-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[url('/images/bg-leaves.jpg')] bg-cover bg-center flex items-center justify-center font-poppins relative"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-[90%] max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 md:p-12 text-white"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mb-10">
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-green-500/30 backdrop-blur-md flex items-center justify-center border-2 border-white/40 shadow-md">
            <User className="w-14 h-14 text-white/90" />
          </div>

          {/* Profile Info */}
          <div>
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <p className="text-white/80">{profile.email}</p>
            <p className="text-white/80">📱 {profile.mobile}</p>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-green-300">Your Orders</h2>
          {orders.length === 0 ? (
            <p className="text-white/70 bg-white/10 p-4 rounded-lg">No orders yet.</p>
          ) : (
            <ul className="space-y-3">
              {orders.map((o) => (
                <li
                  key={o.id}
                  className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/20 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-white/90">Order #{o.id}</p>
                    <p className="text-sm text-white/70">{o.status}</p>
                  </div>
                  <p className="text-green-300 font-semibold">₹{o.total_amount}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payments Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-green-300">Payment History</h2>
          {payments.length === 0 ? (
            <p className="text-white/70 bg-white/10 p-4 rounded-lg">No payments yet.</p>
          ) : (
            <ul className="space-y-3">
              {payments.map((p) => (
                <li
                  key={p.id}
                  className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition border border-white/20 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-white/90">
                      Payment #{p.id}
                    </p>
                    <p className="text-sm text-white/70">
                      {p.status} — {p.payment_method}
                    </p>
                  </div>
                  <p className="text-green-300 font-semibold">₹{p.amount}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}
