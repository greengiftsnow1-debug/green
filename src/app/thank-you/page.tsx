'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
      } else {
        setOrder(data);
      }
      setLoading(false);
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p className="p-6 text-lg">Loading your order...</p>;
  }

  if (!order) {
    return <p className="p-6 text-lg text-red-600">Order not found!</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold text-green-600">🎉 Thank You!</h1>
      <p className="mt-2">Your order has been placed successfully.</p>

      <div className="mt-6 border p-4 rounded-lg shadow-md text-left">
        <h2 className="text-lg font-semibold">Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Name:</strong> {order.customer_name}</p>
        <p><strong>Phone:</strong> {order.customer_phone}</p>
        <p><strong>Address:</strong> {order.customer_address}</p>
        <p><strong>Total:</strong> ₹{order.total_amount}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<p className="p-6 text-lg">Loading your order...</p>}>
      <ThankYouContent />
    </Suspense>
  );
}
