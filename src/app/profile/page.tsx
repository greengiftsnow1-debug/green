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

    // Fetch orders
    supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => setOrders(data ?? []));

    // Fetch payments
    supabase
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .then(({ data }) => setPayments(data ?? []));
  }, [user]);

  if (!user || !profile) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Hello, {profile.name}</h1>
      <p>Email: {profile.email}</p>
      <p>Mobile: {profile.mobile}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        {orders.length === 0 ? <p>No orders yet.</p> : (
          <ul className="space-y-2">
            {orders.map((o) => (
              <li key={o.id} className="border p-2 rounded">
                Order #{o.id} - ₹{o.total_amount} - {o.status}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Payments</h2>
        {payments.length === 0 ? <p>No payments yet.</p> : (
          <ul className="space-y-2">
            {payments.map((p) => (
              <li key={p.id} className="border p-2 rounded">
                Payment #{p.id} - ₹{p.amount} - {p.status} ({p.payment_method})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
