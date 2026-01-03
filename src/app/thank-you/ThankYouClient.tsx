"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ThankYouClient() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const loadOrder = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (!error) setOrder(data);
      setLoading(false);
    };

    loadOrder();
  }, [orderId]);

  if (loading)
    return (
      <p className="text-center pt-32 text-white">
        Loading...
      </p>
    );

  if (!order)
    return (
      <p className="text-center pt-32 text-red-300">
        Order Not Found
      </p>
    );

  return (
    <div
      className="min-h-screen flex justify-center items-center p-6 text-white bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-profile.jpeg')" }}
    >
      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl max-w-xl w-full border border-white/20 shadow-2xl text-center">

        <h1 className="text-4xl font-bold text-green-300">
          🎉 Thank You!
        </h1>

        <p className="mt-2 text-white/80 text-lg">
          Your Order is Confirmed
        </p>

        <div className="mt-6 bg-white/10 p-5 rounded-xl border border-white/20 text-left">
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Amount Paid:</b> ₹{order.total_amount}</p>
          <p><b>Payment ID:</b> {order.payment_id}</p>
          <p><b>Status:</b> {order.status}</p>
          <p><b>Delivery Charge:</b> ₹{order.delivery_charge}</p>

          <div className="mt-3 text-sm text-white/70">
            {new Date(order.created_at).toLocaleString()}
          </div>
        </div>

        <Link href="/profile">
          <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">
            View My Orders 📦
          </button>
        </Link>

        <Link href="/" className="inline-block text-green-300 mt-4 underline">
          Continue Shopping →
        </Link>
      </div>
    </div>
  );
}
