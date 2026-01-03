"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { distanceMap } from "@/utils/distanceData";

/* ================= CONSTANTS ================= */

const DELIVERY_RATE = 1; // ₹8/km
const DEFAULT_STORE_PIN = "462022";

/* ================= TYPES ================= */

type CartItem = {
  name: string;
  image: string;
  price: number;
  qty: number;
  category: string;
};

type CustomGift = {
  cart: CartItem[];
  message?: string;
  total?: number;
};

/* ================= HELPERS ================= */

function getDistance(storePin: string, customerPin: string): number | null {
  const storeDistances = distanceMap[storePin];
  if (storeDistances && storeDistances[customerPin]) {
    return storeDistances[customerPin];
  }

  // fallback for Bhopal
  if (storePin.startsWith("462") && customerPin.startsWith("462")) {
    const diff = Math.abs(Number(storePin) - Number(customerPin));
    if (diff <= 5) return 4;
    if (diff <= 20) return 8;
    if (diff <= 50) return 12;
    return 18;
  }
  return null;
}

/* ================= PAGE ================= */

export default function CheckoutPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  const [customGift, setCustomGift] = useState<CustomGift | null>(null);

  const [storePin, setStorePin] = useState(DEFAULT_STORE_PIN);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");

  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [couponCode, setCouponCode] = useState("");
const [discountPercent, setDiscountPercent] = useState(0);
const [couponApplied, setCouponApplied] = useState(false);

  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [paying, setPaying] = useState(false);
  const applyCoupon = () => {
  if (couponApplied) return;

  if (couponCode.trim().toUpperCase() === "NEWYEAR25") {
    setDiscountPercent(25);
    setCouponApplied(true);
  } else {
    alert("Invalid coupon code");
  }
};


  /* 🔐 Require login */
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  /* 🎁 Load cart from localStorage */
  useEffect(() => {
    const data =
      typeof window !== "undefined"
        ? localStorage.getItem("customGift")
        : null;

    if (!data) return;

    const parsed: CustomGift = JSON.parse(data);
    setCustomGift(parsed);
  }, []);

  /* 📦 Prefill user data */
  useEffect(() => {
    if (profile?.name) setName(profile.name);
    if (profile?.mobile) setPhone(profile.mobile);
    
  }, [profile]);

  /* 🚚 Delivery calculation */
  useEffect(() => {
    if (pincode.length === 6) {
      const km = getDistance(storePin, pincode);
      setDeliveryCharge(km ? Math.ceil(km * DELIVERY_RATE) : 0);
    } else {
      setDeliveryCharge(0);
    }
  }, [pincode, storePin]);

  /* ❌ Safety check */
  if (!customGift || !customGift.cart || customGift.cart.length === 0) {
    return (
      <p className="pt-32 text-center text-gray-600">
        No items found. Please build your gift first.
      </p>
    );
  }

  /* 💰 Totals */
  const subtotal = customGift.cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const discountAmount = Math.round(
  (subtotal * discountPercent) / 100
);



  const total = subtotal + deliveryCharge;
  const finalTotal = subtotal - discountAmount + deliveryCharge;

  /* 💳 PAYMENT */
  const handlePayment = async () => {
    if (!name || !phone || !pincode || !address) {
      alert("Please fill all shipping details");
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
        body: JSON.stringify({ amount: finalTotal }),
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
  email: user?.email, // ✅ ALWAYS USE AUTH EMAIL
  contact: phone,
},
        theme: { color: "#16a34a" },

        handler: async (response: any) => {
          const saveRes = await fetch("/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              phone,
             email: user?.email,
              address,
              pincode,
              store_pin: storePin,
              cart_items: customGift.cart,
              delivery_charge: deliveryCharge,
              total_amount: total,
              payment_id: response.razorpay_payment_id,
            }),
          });

          const saveJson = await saveRes.json();

          if (!saveJson.success) {
            alert("Payment done, but saving order failed.");
            return;
          }

          localStorage.removeItem("customGift");
          router.push(`/thank-you?orderId=${saveJson.order.id}`);
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong while processing payment.");
    } finally {
      setPaying(false);
    }
  };

  /* ================= UI ================= */

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className="min-h-screen bg-[#F6F8F5] pt-28 pb-16">
  <div className="max-w-6xl mx-auto px-4">
    <h1 className="text-3xl font-bold text-center mb-10 text-gray-900">
      Secure Checkout
    </h1>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* LEFT: ORDER SUMMARY */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Order Summary
        </h2>

        <div className="space-y-4">
          {customGift.cart.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-4 p-3 rounded-xl border bg-gray-50"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={70}
                height={70}
                className="rounded-lg object-cover bg-white"
              />

              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="text-sm text-gray-600">
                  ₹{item.price} × {item.qty}
                </p>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  {item.category}
                </span>
              </div>

              <div className="font-semibold text-gray-900">
                ₹{item.price * item.qty}
              </div>
            </div>
          ))}
        </div>
        

        {/* PRICE BREAKDOWN */}
        <div className="flex justify-between">
  <span>Subtotal</span>
  <span>₹{subtotal}</span>
</div>

{discountPercent > 0 && (
  <div className="flex justify-between text-green-700">
    <span>Discount (25%)</span>
    <span>- ₹{discountAmount}</span>
  </div>
)}
<div className="flex justify-between">
  <span>Delivery</span>
  <span>₹{deliveryCharge}</span>
</div>

<div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
  <span>Total</span>
  <span>₹{finalTotal}</span>
</div>

</div>


      {/* RIGHT: SHIPPING & PAYMENT */}
      
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          Shipping Details
        </h2>
        {user?.email && (
  <div className="rounded-lg border bg-gray-50 px-3 py-2 text-sm">
    <span className="text-gray-600">Email:</span>{" "}
    <span className="font-medium text-gray-900">
      {user.email}
    </span>
  </div>
)}

        {/* ℹ️ Delivery Info Strip */}
<div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
  <p className="text-sm font-semibold text-green-900">
    🚚 Premimum Gift Delivery
  </p>
  <p className="text-sm text-green-700">
    We can deliver Your Gift  from These Two  nursery — 
    <strong> Patel Nagar (462022)</strong> or 
    <strong> C21 Mall (462026)</strong> — 
    Choose Which One Nearest to You.
  </p>
</div>

        <div className="space-y-4">
          <select
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
            value={storePin}
            onChange={(e) => setStorePin(e.target.value)}
          >
            <option value="462022">Patel Nagar (462022)</option>
            <option value="462026">C21 Mall (462026)</option>
          </select>

          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
  className="w-full border rounded-lg px-3 py-2"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>


          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="PIN Code"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            maxLength={6}
          />

          <textarea
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Full Address"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* 🎁 COUPON SECTION */}
<div className="space-y-6">

  {/* 🎉 COUPON */}
  <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
    <h3 className="font-semibold text-green-800 mb-1 flex items-center gap-2">
      🎉 Exclusive New Year Offer
    </h3>
    <p className="text-sm text-green-700 mb-4">
      Get <strong>25% OFF</strong> on every order  
      <br />
      Coupon Code: <strong>NEWYEAR25</strong>
    </p>

    <div className="flex gap-2">
      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        disabled={couponApplied}
        placeholder="ENTER COUPON CODE"
        className="flex-1 border rounded-lg px-3 py-2 uppercase"
      />

      <button
        onClick={applyCoupon}
        disabled={couponApplied}
        className={`px-3 rounded-lg font-semibold text-white ${
          couponApplied
            ? "bg-gray-400"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {couponApplied ? "Applied" : "Apply"}
      </button>
    </div>

    {couponApplied && (
      <p className="text-xs text-green-700 mt-2">
        ✅ Coupon applied successfully
      </p>
    )}
  </div>

  {/* 🚚 SHIPPING (keep your existing shipping UI here) */}
</div>

          <button
            onClick={handlePayment}
            disabled={paying}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
          >
            {paying
              ? "Processing..."
              : `Pay ₹${finalTotal} & Place Order`}
          </button>

          <p className="text-xs text-center text-gray-500 mt-2">
            🔒 100% Secure Payments • Powered by Razorpay
          </p>
          


        </div>
      </div>
    </div>
  </div>
</section>
</>

);
}
