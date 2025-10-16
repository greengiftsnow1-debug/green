'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { QRCodeCanvas } from 'qrcode.react';

export default function CheckoutPage() {
  const [customGift, setCustomGift] = useState<any>(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const upiId = '9630820926@axl';

  useEffect(() => {
    const gift = localStorage.getItem('customGift');
    if (gift) setCustomGift(JSON.parse(gift));
  }, []);

  useEffect(() => {
    if (pincode.length === 6) {
      fetch('/api/distance/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinationPincode: pincode }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.distanceKm) {
            const delivery = parseFloat((data.distanceKm * 5).toFixed(2));
            setDeliveryCharge(delivery);
          } else {
            setDeliveryCharge(0);
            alert('Delivery charge not calculated. Please check your pin code.');
          }
        })
        .catch(err => {
          setDeliveryCharge(0);
          console.error('Distance fetch error:', err);
        });
    }
  }, [pincode]);

  const total = customGift ? customGift.total + deliveryCharge : 0;

  const handlePaymentConfirm = async () => {
    if (!name || !email || !phone || !address || !pincode) {
      alert('Please fill all shipping details');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_email: email,
    user_name: name,
    phone,
    address,
    pincode,
    cart_items: [customGift],
    delivery_charge: deliveryCharge,
    total_amount: total
  })
});

const json = await res.json();

if (!res.ok || !json.success) {
  alert('Failed to place order: ' + (json.error || 'Unknown error'));
} else {
  const orderId = json.order.id; // ✅ consistent
  router.push(`/thank-you?orderId=${orderId}`);
}

    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong while placing the order.');
    } finally {
      setLoading(false);
    }
  };

  if (!customGift)
    return (
      <p className="pt-32 text-center text-gray-600">
        No custom gift found.
      </p>
    );

  return (
    <section className="pt-32 px-6 min-h-screen bg-[#E1EEBC]">
      <h1 className="text-3xl font-bold text-green-900 mb-10 text-center">
        Checkout & Payment
      </h1>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/40 backdrop-blur-lg p-8 rounded-xl shadow">
        {/* Left column: Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="flex items-center gap-4 mb-4">
            <Image
              src={customGift.plant.image}
              alt={customGift.plant.name}
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div>
              <p className="font-semibold text-green-900">
                {customGift.plant.name}
              </p>
              <p>₹{customGift.plant.price}</p>
            </div>
          </div>
          <ul className="text-green-900 space-y-2">
            <li>
              <strong>Pot:</strong> {customGift.pot.name} (₹
              {customGift.pot.price})
            </li>
            <li>
              <strong>Packaging:</strong> {customGift.packaging.name} (₹
              {customGift.packaging.price})
            </li>
            <li>
              <strong>Card:</strong> {customGift.card.name} (₹
              {customGift.card.price})
            </li>
            <li>
              <strong>Message:</strong> {customGift.message || 'None'}
            </li>
            <li className="pt-2">Delivery Charge: ₹{deliveryCharge}</li>
            <li className="text-xl font-bold">Total: ₹{total}</li>
          </ul>
        </div>

        {/* Right column: Shipping + Payment */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              handlePaymentConfirm();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number (91XXXXXXXXXX)"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="PIN Code"
              value={pincode}
              onChange={e => setPincode(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full p-2 border rounded"
              rows={3}
              required
            />

            <h3 className="mt-6 mb-2 font-semibold text-green-900">
              Pay with UPI
            </h3>
            <p className="mb-4">Scan this QR code or pay using UPI ID:</p>
            <div className="mb-4 flex justify-center">
              <QRCodeCanvas
                value={`upi://pay?pa=${upiId}&pn=GreenGift&am=${total.toFixed(
                  2
                )}`}
                size={180}
              />
            </div>
            <p className="text-center font-mono bg-green-100 p-2 rounded">
              {upiId}
            </p>

            <button
              type="submit"
              className="mt-6 w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Payment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
