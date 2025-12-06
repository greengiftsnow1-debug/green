"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ArrowLeft } from "lucide-react";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.log("Error fetching order:", error);
      else setOrder(data);

      setLoading(false);
    };

    load();
  }, [id]);

  if (loading)
    return <p className="pt-40 text-center text-white">Loading Order...</p>;

  if (!order)
    return (
      <p className="pt-40 text-center text-white text-lg">
        ❌ Order not found.
      </p>
    );

  return (
    <div
      className="min-h-screen p-8 flex justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-profile.jpeg')" }}
    >
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 text-white">

        <button onClick={() => router.back()} className="flex items-center gap-2 mb-5 hover:opacity-80">
          <ArrowLeft size={22} /> Back
        </button>

        <h1 className="text-3xl font-semibold mb-2">Order Details</h1>
        <p className="text-white/70">Order ID: {order.id}</p>

        <div className="mt-6 space-y-4">

          {/* Order Summary */}
          <div className="p-5 rounded-xl bg-white/10 border border-white/20">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <p><strong>Amount Paid:</strong> ₹{order.total_amount}</p>
            <p><strong>Delivery Charge:</strong> ₹{order.delivery_charge}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.payment_method} ({order.payment_status})</p>
            <p className="text-sm text-white/60 mt-2">
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          {/* Shipping Details */}
          <div className="p-5 rounded-xl bg-white/10 border border-white/20">
            <h2 className="text-xl font-semibold mb-2">Shipping Details</h2>
            <p><strong>Name:</strong> {order.customer_name}</p>
            <p><strong>Phone:</strong> {order.customer_phone}</p>
            <p><strong>Address:</strong> {order.customer_address}</p>
            <p><strong>Pincode:</strong> {order.customer_pincode}</p>
            <p><strong>Store:</strong> {order.store_pin}</p>
          </div>

          {/* Custom Gift Breakdown */}
          {order.items && (
            <div className="p-5 rounded-xl bg-white/10 border border-white/20">
              <h2 className="text-xl font-semibold mb-3">Gift Details</h2>
              <p><strong>Plant:</strong> {order.items.plant?.name} - ₹{order.items.plant?.price}</p>
              <p><strong>Pot:</strong> {order.items.pot?.name} - ₹{order.items.pot?.price}</p>
              <p><strong>Packaging:</strong> {order.items.packaging?.name} - ₹{order.items.packaging?.price}</p>
              <p><strong>Card:</strong> {order.items.card?.name} - ₹{order.items.card?.price}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
