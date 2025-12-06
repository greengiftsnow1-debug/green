"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { distanceMap } from "@/utils/distanceData";

const DELIVERY_RATE = 8; // ₹8/km

function getDistance(storePin: string, customerPin: string): number | null {
  const storeDistances = distanceMap[storePin];
  if (storeDistances && storeDistances[customerPin]) {
    return storeDistances[customerPin];
  }

  // Fallback approx if both are Bhopal 462xxx
  if (storePin.startsWith("462") && customerPin.startsWith("462")) {
    const diff = Math.abs(Number(storePin) - Number(customerPin));
    if (diff <= 5) return 4;
    if (diff <= 20) return 8;
    if (diff <= 50) return 12;
    return 18;
  }
  return null;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [customGift, setCustomGift] = useState<any>(null);

  const [storePin, setStorePin] = useState("462022");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [paying, setPaying] = useState(false);

  // 🔐 Require login
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // 🎁 Load custom gift
  useEffect(() => {
    const gift = typeof window !== "undefined"
      ? localStorage.getItem("customGift")
      : null;
    if (!gift) return;
    setCustomGift(JSON.parse(gift));
  }, []);

  // 📦 Prefill name/email if profile present
  useEffect(() => {
    if (profile?.name) setName(profile.name);
    if (profile?.mobile) setPhone(profile.mobile);
  }, [profile]);

  // 🚚 Auto-calc delivery whenever pincode / store changes
  useEffect(() => {
    if (pincode.length === 6) {
      const km = getDistance(storePin, pincode);
      if (km) {
        setDeliveryCharge(Math.ceil(km * DELIVERY_RATE));
      } else {
        setDeliveryCharge(0);
      }
    } else {
      setDeliveryCharge(0);
    }
  }, [pincode, storePin]);

  if (!customGift) {
    return (
      <p className="pt-32 text-center text-gray-600">
        No custom gift found. Please build your gift first.
      </p>
    );
  }

  const subtotal =
    customGift.plant.price +
    customGift.pot.price +
    customGift.packaging.price +
    customGift.card.price;

  const total = subtotal + deliveryCharge;

  const handlePayment = async () => {
    if (!name || !phone || !pincode || !address) {
      alert("Please fill all shipping details");
      return;
    }
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!deliveryCharge) {
      alert("Delivery not available for this PIN yet.");
      return;
    }

    setPaying(true);

    try {
      // 1️⃣ Create Razorpay order
      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const orderData = await orderRes.json();

      if (!orderData.orderId) {
        throw new Error("Failed to create Razorpay order");
      }

      const options = {
  key: "rzp_live_RlUUv8gSNgd5tR",
  amount: total * 100,
  currency: "INR",
  name: "Green Gift",
  description: "Custom Plant Gift",
  order_id: orderData.orderId,
  prefill: {
    name,
    email: profile?.email,
    contact: phone,
  },
  theme: { color: "#16a34a" },
        handler: async (response: any) => {
          // 3️⃣ Save order in Supabase through API
         const saveRes = await fetch("/api/order", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name,                   // changed
    phone,                  // changed
    email: profile?.email,  // changed
    address,
    pincode,
    store_pin: storePin,
    cart_items: customGift,
    delivery_charge: deliveryCharge,
    total_amount: total,
    payment_id: response.razorpay_payment_id,
  }),
});


          const saveJson = await saveRes.json();
          if (!saveJson.success) {
            alert("Payment done, but saving order failed.");
            console.error(saveJson.error);
            return;
          }

          // Clear custom gift
          if (typeof window !== "undefined") {
            localStorage.removeItem("customGift");
          }

          router.push(`/thank-you?orderId=${saveJson.order.id}`);
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      alert("Something went wrong while processing payment.");
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <h1 className="text-3xl font-semibold text-center mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: Order Summary */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Order Summary
              </h2>

              <div className="flex gap-4 mb-4">
                <Image
                  src={customGift.plant.image}
                  alt={customGift.plant.name}
                  width={90}
                  height={90}
                  className="rounded-xl object-cover"
                />
                <div className="text-gray-800 text-sm space-y-1">
                  <p className="font-semibold">{customGift.plant.name}</p>
                  <p>Plant: ₹{customGift.plant.price}</p>
                  <p>Pot: ₹{customGift.pot.price}</p>
                  <p>Packaging: ₹{customGift.packaging.price}</p>
                  <p>Card: ₹{customGift.card.price}</p>
                </div>
              </div>

              <div className="mt-4 border-t pt-3 text-sm text-gray-800 space-y-1">
                <p>Subtotal: ₹{subtotal}</p>
                <p>Delivery: ₹{deliveryCharge}</p>
                <p className="text-lg font-bold mt-2">
                  Total: ₹{total}
                </p>
              </div>
            </div>

            {/* RIGHT: Shipping Info */}
            <div className="border border-gray-200 rounded-2xl p-5 bg-gray-50">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Shipping Info
              </h2>

              <select
                className="w-full border border-green-600 rounded-lg px-3 py-2 mb-3"
                value={storePin}
                onChange={(e) => setStorePin(e.target.value)}
              >
                <option value="462022">Patel Nagar (462022)</option>
                <option value="462026">C21 Mall (462026)</option>
              </select>

              <input
                className="w-full border border-green-600 rounded-lg px-3 py-2 mb-3 bg-blue-50"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full border border-green-600 rounded-lg px-3 py-2 mb-3"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                className="w-full border border-green-600 rounded-lg px-3 py-2 mb-3"
                placeholder="PIN Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
              />

              <textarea
                className="w-full border border-green-600 rounded-lg px-3 py-2 mb-4 bg-blue-50"
                placeholder="Full Address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button
                onClick={handlePayment}
                disabled={paying}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
              >
                {paying ? "Processing..." : `Pay ₹${total} & Complete Order`}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
