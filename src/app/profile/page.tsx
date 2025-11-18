'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

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
  }, [user]);

  if (!user || !profile) return <p>Loading...</p>;

  return (
    <div
      className="
        min-h-screen 
        bg-cover bg-center 
        flex items-center justify-center 
        p-8
      "
      style={{
        backgroundImage: "url('/images/bg-profile.jpeg')",
      }}
    >
      {/* Glass Card */}
      <div className="
        w-full max-w-3xl 
        bg-white/10 
        backdrop-blur-xl 
        border border-white/20 
        shadow-2xl 
        rounded-3xl 
        p-8
        text-white
      ">
        
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold">
            {profile.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{profile.name}</h1>
            <p className="text-white/80">{profile.email}</p>
            <p className="text-white/80">Mobile: {profile.mobile}</p>
          </div>
        </div>

        {/* Orders Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Orders</h2>
          <div className="space-y-3">
            {orders.length === 0 ? (
              <p className="text-white/70">No orders yet.</p>
            ) : (
              orders.map((o) => (
                <div
                  key={o.id}
                  className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <p>Order #{o.id}</p>
                  <p>₹{o.total_amount}</p>
                  <p>Status: {o.status}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Payments Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Payments</h2>
          <div className="space-y-3">
            {payments.length === 0 ? (
              <p className="text-white/70">No payments yet.</p>
            ) : (
              payments.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <p>Payment #{p.id}</p>
                  <p>₹{p.amount}</p>
                  <p>{p.status} ({p.payment_method})</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
